// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

interface ITokenBundleEscrowObligation {
    function collectEscrow(bytes32 escrow, bytes32 fulfillment) external returns (bool);
}

interface IObligation {
    function doObligationRaw(bytes calldata data, uint64 expirationTime, bytes32 refUID) external payable returns (bytes32);
}

abstract contract TokenBundleSplitterBase is IArbiter, ReentrancyGuard, ERC1155Holder {
    using ArbiterUtils for Attestation;
    using SafeERC20 for IERC20;

    address public constant EXECUTOR_SENTINEL = address(0xEEEE);

    struct BundleSplit {
        address recipient;
        uint256 nativeAmount;
        uint256[] erc20Amounts;
        uint256[] erc721Indices;
        uint256[] erc1155Amounts;
    }

    struct DemandData { address oracle; bytes data; }

    struct EscrowObligationData {
        address arbiter;
        bytes demand;
        uint256 nativeAmount;
        address[] erc20Tokens;
        uint256[] erc20Amounts;
        address[] erc721Tokens;
        uint256[] erc721TokenIds;
        address[] erc1155Tokens;
        uint256[] erc1155TokenIds;
        uint256[] erc1155Amounts;
    }

    event ArbitrationMade(bytes32 indexed decisionKey, bytes32 indexed obligation, address indexed oracle);
    event ArbitrationRequested(bytes32 indexed fulfillment, bytes32 indexed escrow, address indexed oracle, bytes demand);
    event EscrowCollectedAndDistributed(bytes32 indexed escrow, bytes32 indexed fulfillment, address indexed fulfiller);
    event FulfillmentCreated(bytes32 indexed fulfillmentUid, address indexed fulfiller, address indexed obligationContract);
    event NativeTransferFailedOnDistribute(address indexed recipient, uint256 amount);
    event ERC20TransferFailedOnDistribute(address indexed recipient, address indexed token, uint256 amount);
    event ERC721TransferFailedOnDistribute(address indexed recipient, address indexed token, uint256 tokenId);
    event ERC1155TransferFailedOnDistribute(address indexed recipient, address indexed token, uint256 tokenId, uint256 amount);

    error UnauthorizedArbitrationRequest();
    error EmptySplits();
    error ZeroRecipient();
    error NativeTokenTransferFailed(address to, uint256 amount);
    error ERC20TransferFailed(address token, address to, uint256 amount);
    error ERC721TransferFailed(address token, address to, uint256 tokenId);
    error ERC1155TransferFailed(address token, address to, uint256 tokenId, uint256 amount);
    error NoFulfillerRecorded(bytes32 fulfillment);

    IEAS public eas;
    mapping(address => mapping(bytes32 => BundleSplit[])) internal decisions;
    mapping(address => mapping(bytes32 => bool)) public hasDecision;
    mapping(bytes32 => address) public fulfillers;

    constructor(IEAS _eas) { eas = _eas; }

    // -----------------------------------------------------------------
    // Oracle arbitration
    // -----------------------------------------------------------------

    function arbitrate(bytes32 fulfillment, bytes32 escrow, BundleSplit[] calldata splits) external virtual;

    function _storeDecision(address oracle, bytes32 decisionKey, BundleSplit[] calldata splits) internal {
        if (splits.length == 0) revert EmptySplits();
        delete decisions[oracle][decisionKey];
        for (uint256 i; i < splits.length; ++i) {
            if (splits[i].recipient == address(0)) revert ZeroRecipient();
            decisions[oracle][decisionKey].push();
            BundleSplit storage stored = decisions[oracle][decisionKey][i];
            stored.recipient = splits[i].recipient;
            stored.nativeAmount = splits[i].nativeAmount;
            for (uint256 j; j < splits[i].erc20Amounts.length; ++j) stored.erc20Amounts.push(splits[i].erc20Amounts[j]);
            for (uint256 j; j < splits[i].erc721Indices.length; ++j) stored.erc721Indices.push(splits[i].erc721Indices[j]);
            for (uint256 j; j < splits[i].erc1155Amounts.length; ++j) stored.erc1155Amounts.push(splits[i].erc1155Amounts[j]);
        }
        hasDecision[oracle][decisionKey] = true;
    }

    function requestArbitration(bytes32 _fulfillment, bytes32 _escrow, address oracle, bytes memory demand) external {
        Attestation memory escrowAttestation = eas.getAttestation(_escrow);
        if (escrowAttestation.attester != msg.sender && escrowAttestation.recipient != msg.sender)
            revert UnauthorizedArbitrationRequest();
        emit ArbitrationRequested(_fulfillment, _escrow, oracle, demand);
    }

    function checkObligation(Attestation memory fulfillment, bytes memory demand, bytes32 escrow) public view override returns (bool) {
        DemandData memory demandData = abi.decode(demand, (DemandData));
        return hasDecision[demandData.oracle][keccak256(abi.encodePacked(fulfillment.uid, escrow))];
    }

    function createFulfillment(address obligationContract, bytes calldata data, uint64 expirationTime, bytes32 refUID) external payable returns (bytes32 fulfillmentUid) {
        fulfillmentUid = IObligation(obligationContract).doObligationRaw{value: msg.value}(data, expirationTime, refUID);
        fulfillers[fulfillmentUid] = msg.sender;
        emit FulfillmentCreated(fulfillmentUid, msg.sender, obligationContract);
    }

    // -----------------------------------------------------------------
    // Collect + distribute
    // -----------------------------------------------------------------

    /// @notice Collects a token bundle escrow and distributes assets. Reverts if any transfer fails.
    function collectAndDistribute(address escrowContract, bytes32 escrow, bytes32 fulfillment) external nonReentrant {
        (BundleSplit[] memory splits, EscrowObligationData memory escrowData) = _collectAndDecode(escrowContract, escrow, fulfillment);
        for (uint256 s; s < splits.length; ++s) {
            address recipient = _resolveSentinel(splits[s].recipient, fulfillment);
            _distributeAtomic(splits[s], escrowData, recipient);
        }
        emit EscrowCollectedAndDistributed(escrow, fulfillment, fulfillers[fulfillment]);
    }

    /// @notice Unsafe partial distribution — continues on individual transfer failures.
    /// @dev Use only as a last resort when collectAndDistribute is permanently blocked.
    ///      Failed transfers emit events but do not revert. Stuck tokens remain in the splitter.
    function unsafePartiallyCollectAndDistribute(address escrowContract, bytes32 escrow, bytes32 fulfillment) external nonReentrant {
        (BundleSplit[] memory splits, EscrowObligationData memory escrowData) = _collectAndDecode(escrowContract, escrow, fulfillment);
        for (uint256 s; s < splits.length; ++s) {
            address recipient = _resolveSentinel(splits[s].recipient, fulfillment);
            _distributePartial(splits[s], escrowData, recipient);
        }
        emit EscrowCollectedAndDistributed(escrow, fulfillment, fulfillers[fulfillment]);
    }

    // -----------------------------------------------------------------
    // Internal helpers
    // -----------------------------------------------------------------

    function _collectAndDecode(address escrowContract, bytes32 escrow, bytes32 fulfillment)
        internal returns (BundleSplit[] memory splits, EscrowObligationData memory escrowData)
    {
        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        escrowData = abi.decode(escrowAttestation.data, (EscrowObligationData));
        DemandData memory demandData = abi.decode(escrowData.demand, (DemandData));
        splits = decisions[demandData.oracle][keccak256(abi.encodePacked(fulfillment, escrow))];
        ITokenBundleEscrowObligation(escrowContract).collectEscrow(escrow, fulfillment);
    }

    function _resolveSentinel(address recipient, bytes32 fulfillment) internal view returns (address) {
        if (recipient == EXECUTOR_SENTINEL) {
            recipient = fulfillers[fulfillment];
            if (recipient == address(0)) revert NoFulfillerRecorded(fulfillment);
        }
        return recipient;
    }

    function _distributeAtomic(BundleSplit memory split, EscrowObligationData memory escrowData, address recipient) internal {
        if (split.nativeAmount > 0) {
            (bool success, ) = payable(recipient).call{value: split.nativeAmount}("");
            if (!success) revert NativeTokenTransferFailed(recipient, split.nativeAmount);
        }
        for (uint256 i; i < split.erc20Amounts.length; ++i) {
            if (split.erc20Amounts[i] > 0) {
                bool success = IERC20(escrowData.erc20Tokens[i]).trySafeTransfer(recipient, split.erc20Amounts[i]);
                if (!success) revert ERC20TransferFailed(escrowData.erc20Tokens[i], recipient, split.erc20Amounts[i]);
            }
        }
        for (uint256 i; i < split.erc721Indices.length; ++i) {
            uint256 idx = split.erc721Indices[i];
            try IERC721(escrowData.erc721Tokens[idx]).safeTransferFrom(address(this), recipient, escrowData.erc721TokenIds[idx]) {} catch {
                revert ERC721TransferFailed(escrowData.erc721Tokens[idx], recipient, escrowData.erc721TokenIds[idx]);
            }
        }
        for (uint256 i; i < split.erc1155Amounts.length; ++i) {
            if (split.erc1155Amounts[i] > 0) {
                try IERC1155(escrowData.erc1155Tokens[i]).safeTransferFrom(address(this), recipient, escrowData.erc1155TokenIds[i], split.erc1155Amounts[i], "") {} catch {
                    revert ERC1155TransferFailed(escrowData.erc1155Tokens[i], recipient, escrowData.erc1155TokenIds[i], split.erc1155Amounts[i]);
                }
            }
        }
    }

    function _distributePartial(BundleSplit memory split, EscrowObligationData memory escrowData, address recipient) internal {
        if (split.nativeAmount > 0) {
            (bool success, ) = payable(recipient).call{value: split.nativeAmount}("");
            if (!success) emit NativeTransferFailedOnDistribute(recipient, split.nativeAmount);
        }
        for (uint256 i; i < split.erc20Amounts.length; ++i) {
            if (split.erc20Amounts[i] > 0) {
                bool success = IERC20(escrowData.erc20Tokens[i]).trySafeTransfer(recipient, split.erc20Amounts[i]);
                if (!success) emit ERC20TransferFailedOnDistribute(recipient, escrowData.erc20Tokens[i], split.erc20Amounts[i]);
            }
        }
        for (uint256 i; i < split.erc721Indices.length; ++i) {
            uint256 idx = split.erc721Indices[i];
            try IERC721(escrowData.erc721Tokens[idx]).safeTransferFrom(address(this), recipient, escrowData.erc721TokenIds[idx]) {} catch {
                emit ERC721TransferFailedOnDistribute(recipient, escrowData.erc721Tokens[idx], escrowData.erc721TokenIds[idx]);
            }
        }
        for (uint256 i; i < split.erc1155Amounts.length; ++i) {
            if (split.erc1155Amounts[i] > 0) {
                try IERC1155(escrowData.erc1155Tokens[i]).safeTransferFrom(address(this), recipient, escrowData.erc1155TokenIds[i], split.erc1155Amounts[i], "") {} catch {
                    emit ERC1155TransferFailedOnDistribute(recipient, escrowData.erc1155Tokens[i], escrowData.erc1155TokenIds[i], split.erc1155Amounts[i]);
                }
            }
        }
    }

    // -----------------------------------------------------------------
    // View helpers
    // -----------------------------------------------------------------

    function getSplits(address oracle, bytes32 fulfillment, bytes32 escrow) external view returns (BundleSplit[] memory) {
        return decisions[oracle][keccak256(abi.encodePacked(fulfillment, escrow))];
    }

    function decodeDemandData(bytes calldata data) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    receive() external payable {}
}
