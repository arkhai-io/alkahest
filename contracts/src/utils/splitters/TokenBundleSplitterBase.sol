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
    function collectEscrow(
        bytes32 escrow,
        bytes32 fulfillment
    ) external returns (bool);
}

abstract contract TokenBundleSplitterBase is IArbiter, ReentrancyGuard, ERC1155Holder {
    using ArbiterUtils for Attestation;
    using SafeERC20 for IERC20;

    /// @notice Sentinel address meaning "the executor who triggered the action".
    address public constant EXECUTOR_SENTINEL = address(0xEEEE);

    /// @notice A per-recipient portion of the bundle.
    ///         erc20Amounts and erc1155Amounts are parallel to the escrow's
    ///         token arrays (same length, same order).
    ///         erc721Indices lists which of the escrow's ERC721s go to this recipient
    ///         (by index into the escrow's erc721Tokens/erc721TokenIds arrays).
    struct BundleSplit {
        address recipient;
        uint256 nativeAmount;
        uint256[] erc20Amounts;
        uint256[] erc721Indices;
        uint256[] erc1155Amounts;
    }

    /// @notice Demand data embedded in the escrow obligation.
    struct DemandData {
        address oracle;
        bytes data;
    }

    /// @dev Layout of TokenBundleEscrowObligation.ObligationData for decoding.
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

    event ArbitrationMade(
        bytes32 indexed decisionKey,
        bytes32 indexed obligation,
        address indexed oracle
    );
    event ArbitrationRequested(
        bytes32 indexed fulfillment,
        bytes32 indexed escrow,
        address indexed oracle,
        bytes demand
    );
    event EscrowCollectedAndDistributed(
        bytes32 indexed escrow,
        bytes32 indexed fulfillment,
        address indexed executor
    );

    error UnauthorizedArbitrationRequest();
    error EmptySplits();
    error ZeroRecipient();
    error ExecuteFailed(address target, bytes data);
    error NativeTokenTransferFailed(address to, uint256 amount);

    IEAS public eas;

    /// @notice decisions[oracle][decisionKey] => splits array.
    mapping(address => mapping(bytes32 => BundleSplit[])) internal decisions;
    /// @notice Whether a decision has been made (distinguishes empty from nonexistent).
    mapping(address => mapping(bytes32 => bool)) public hasDecision;

    /// @notice Transient storage for the current executor during execute/collectAndDistribute.
    address private _currentExecutor;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    // -----------------------------------------------------------------
    // Oracle arbitration
    // -----------------------------------------------------------------

    /// @notice Oracle submits a split decision for a fulfillment to an escrow.
    function arbitrate(
        bytes32 fulfillment,
        bytes32 escrow,
        BundleSplit[] calldata splits
    ) external virtual;

    /// @notice Stores a decision in storage.
    function _storeDecision(
        address oracle,
        bytes32 decisionKey,
        BundleSplit[] calldata splits
    ) internal {
        if (splits.length == 0) revert EmptySplits();

        delete decisions[oracle][decisionKey];
        for (uint256 i; i < splits.length; ++i) {
            if (splits[i].recipient == address(0)) revert ZeroRecipient();

            decisions[oracle][decisionKey].push();
            BundleSplit storage stored = decisions[oracle][decisionKey][i];
            stored.recipient = splits[i].recipient;
            stored.nativeAmount = splits[i].nativeAmount;

            for (uint256 j; j < splits[i].erc20Amounts.length; ++j) {
                stored.erc20Amounts.push(splits[i].erc20Amounts[j]);
            }
            for (uint256 j; j < splits[i].erc721Indices.length; ++j) {
                stored.erc721Indices.push(splits[i].erc721Indices[j]);
            }
            for (uint256 j; j < splits[i].erc1155Amounts.length; ++j) {
                stored.erc1155Amounts.push(splits[i].erc1155Amounts[j]);
            }
        }

        hasDecision[oracle][decisionKey] = true;
    }

    /// @notice Emits an event requesting the oracle to arbitrate.
    function requestArbitration(
        bytes32 _fulfillment,
        bytes32 _escrow,
        address oracle,
        bytes memory demand
    ) external {
        Attestation memory escrowAttestation = eas.getAttestation(_escrow);
        if (
            escrowAttestation.attester != msg.sender &&
            escrowAttestation.recipient != msg.sender
        ) revert UnauthorizedArbitrationRequest();

        emit ArbitrationRequested(_fulfillment, _escrow, oracle, demand);
    }

    // -----------------------------------------------------------------
    // IArbiter
    // -----------------------------------------------------------------

    /// @inheritdoc IArbiter
    function checkObligation(
        Attestation memory fulfillment,
        bytes memory demand,
        bytes32 escrow
    ) public view override returns (bool) {
        DemandData memory demandData = abi.decode(demand, (DemandData));
        bytes32 decisionKey = keccak256(
            abi.encodePacked(fulfillment.uid, escrow)
        );
        return hasDecision[demandData.oracle][decisionKey];
    }

    // -----------------------------------------------------------------
    // Execute (proxy calls through the splitter)
    // -----------------------------------------------------------------

    /// @notice Execute an arbitrary call as the splitter contract.
    ///         Payable to allow forwarding ETH for native token operations.
    function execute(
        address target,
        bytes calldata data
    ) external payable returns (bytes memory) {
        _currentExecutor = msg.sender;
        (bool success, bytes memory result) = target.call{value: msg.value}(
            data
        );
        if (!success) revert ExecuteFailed(target, data);
        _currentExecutor = address(0);
        return result;
    }

    // -----------------------------------------------------------------
    // Atomic collect + distribute
    // -----------------------------------------------------------------

    /// @notice Collects a token bundle escrow and distributes assets per oracle splits.
    function collectAndDistribute(
        address escrowContract,
        bytes32 escrow,
        bytes32 fulfillment
    ) external nonReentrant {
        _currentExecutor = msg.sender;

        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        EscrowObligationData memory escrowData = abi.decode(
            escrowAttestation.data,
            (EscrowObligationData)
        );
        DemandData memory demandData = abi.decode(
            escrowData.demand,
            (DemandData)
        );

        bytes32 decisionKey = keccak256(
            abi.encodePacked(fulfillment, escrow)
        );

        BundleSplit[] memory splits = decisions[demandData.oracle][decisionKey];

        // Collect escrow — all assets transfer to this contract
        ITokenBundleEscrowObligation(escrowContract).collectEscrow(
            escrow,
            fulfillment
        );

        // Distribute according to splits
        for (uint256 s; s < splits.length; ++s) {
            address recipient = splits[s].recipient;
            if (recipient == EXECUTOR_SENTINEL) {
                recipient = msg.sender;
            }

            // Native tokens
            if (splits[s].nativeAmount > 0) {
                (bool success, ) = payable(recipient).call{
                    value: splits[s].nativeAmount
                }("");
                if (!success)
                    revert NativeTokenTransferFailed(
                        recipient,
                        splits[s].nativeAmount
                    );
            }

            // ERC20s
            for (uint256 i; i < splits[s].erc20Amounts.length; ++i) {
                if (splits[s].erc20Amounts[i] > 0) {
                    IERC20(escrowData.erc20Tokens[i]).safeTransfer(
                        recipient,
                        splits[s].erc20Amounts[i]
                    );
                }
            }

            // ERC721s
            for (uint256 i; i < splits[s].erc721Indices.length; ++i) {
                uint256 idx = splits[s].erc721Indices[i];
                IERC721(escrowData.erc721Tokens[idx]).transferFrom(
                    address(this),
                    recipient,
                    escrowData.erc721TokenIds[idx]
                );
            }

            // ERC1155s
            for (uint256 i; i < splits[s].erc1155Amounts.length; ++i) {
                if (splits[s].erc1155Amounts[i] > 0) {
                    IERC1155(escrowData.erc1155Tokens[i]).safeTransferFrom(
                        address(this),
                        recipient,
                        escrowData.erc1155TokenIds[i],
                        splits[s].erc1155Amounts[i],
                        ""
                    );
                }
            }
        }

        emit EscrowCollectedAndDistributed(escrow, fulfillment, msg.sender);

        _currentExecutor = address(0);
    }

    // -----------------------------------------------------------------
    // View helpers
    // -----------------------------------------------------------------

    function getSplits(
        address oracle,
        bytes32 fulfillment,
        bytes32 escrow
    ) external view returns (BundleSplit[] memory) {
        bytes32 decisionKey = keccak256(
            abi.encodePacked(fulfillment, escrow)
        );
        return decisions[oracle][decisionKey];
    }

    function decodeDemandData(
        bytes calldata data
    ) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    /// @notice Allow contract to receive ETH from escrow collection.
    receive() external payable {}
}
