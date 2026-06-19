// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {SplitterVerification} from "./SplitterVerification.sol";
import {BaseSplitter} from "./BaseSplitter.sol";
import {IEscrow} from "../../IEscrow.sol";

contract ERC1155Splitter is BaseSplitter, ERC1155Holder {
    using SplitterVerification for Attestation;

    struct Split {
        address recipient;
        uint256 amount;
    }

    struct DemandData {
        address oracle;
        bytes data;
    }

    struct EscrowObligationData {
        address arbiter;
        bytes demand;
        address token;
        uint256 tokenId;
        uint256 amount;
    }

    event ArbitrationMade(
        bytes32 indexed decisionKey, bytes32 indexed fulfillmentUid, address indexed oracle, Split[] splits
    );
    event EscrowCollectedAndDistributed(
        bytes32 indexed escrow,
        bytes32 indexed fulfillment,
        address indexed fulfiller,
        address token,
        uint256 tokenId,
        Split[] splits
    );
    event ERC1155TransferFailedOnDistribute(
        address indexed recipient, address indexed token, uint256 tokenId, uint256 amount
    );

    error InvalidSplits(uint256 totalExpected, uint256 totalProvided);
    error ERC1155TransferFailed(address token, address to, uint256 tokenId, uint256 amount);

    mapping(address => mapping(bytes32 => Split[])) internal decisions;

    constructor(IEAS _eas) BaseSplitter(_eas) {}

    function arbitrate(bytes32 fulfillment, bytes32 escrow, Split[] calldata splits) external {
        if (fulfillment == bytes32(0)) revert InvalidFulfillmentUid();

        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        EscrowObligationData memory escrowData = abi.decode(escrowAttestation.data, (EscrowObligationData));
        _validateSplitsTotal(splits, escrowData.amount);

        bytes32 decisionKey = _decisionKey(fulfillment, escrow);
        _storeDecision(msg.sender, decisionKey, splits);

        emit ArbitrationMade(decisionKey, escrow, msg.sender, splits);
    }

    /// @notice Collects an ERC1155 escrow and distributes tokens. Reverts if any transfer fails.
    function collectAndDistribute(address escrowContract, bytes32 escrow, bytes32 fulfillment) external nonReentrant {
        (Split[] memory splits, address token, uint256 tokenId) = _collectAndDecode(escrowContract, escrow, fulfillment);
        address fulfiller = _recordedFulfiller(fulfillment);
        for (uint256 i; i < splits.length; ++i) {
            address recipient = _resolveSentinel(splits[i].recipient, fulfillment, fulfiller);
            try IERC1155(token).safeTransferFrom(address(this), recipient, tokenId, splits[i].amount, "") {}
            catch {
                revert ERC1155TransferFailed(token, recipient, tokenId, splits[i].amount);
            }
        }
        emit EscrowCollectedAndDistributed(escrow, fulfillment, fulfiller, token, tokenId, splits);
    }

    /// @notice Unsafe partial distribution -- continues on individual transfer failures.
    function unsafePartiallyCollectAndDistribute(address escrowContract, bytes32 escrow, bytes32 fulfillment)
        external
        nonReentrant
    {
        (Split[] memory splits, address token, uint256 tokenId) = _collectAndDecode(escrowContract, escrow, fulfillment);
        address fulfiller = _recordedFulfiller(fulfillment);
        for (uint256 i; i < splits.length; ++i) {
            address recipient = _resolveSentinel(splits[i].recipient, fulfillment, fulfiller);
            try IERC1155(token).safeTransferFrom(address(this), recipient, tokenId, splits[i].amount, "") {}
            catch {
                emit ERC1155TransferFailedOnDistribute(recipient, token, tokenId, splits[i].amount);
            }
        }
        emit EscrowCollectedAndDistributed(escrow, fulfillment, fulfiller, token, tokenId, splits);
    }

    function _collectAndDecode(address escrowContract, bytes32 escrow, bytes32 fulfillment)
        internal
        returns (Split[] memory splits, address token, uint256 tokenId)
    {
        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        escrowAttestation.verifyEscrowAttestation(escrowContract);
        Attestation memory fulfillmentAttestation = eas.getAttestation(fulfillment);
        fulfillmentAttestation.verifyFulfillmentRecipient();

        EscrowObligationData memory escrowData = abi.decode(escrowAttestation.data, (EscrowObligationData));
        DemandData memory demandData = abi.decode(escrowData.demand, (DemandData));
        splits = decisions[demandData.oracle][_decisionKey(fulfillment, escrow)];
        token = escrowData.token;
        tokenId = escrowData.tokenId;
        uint256 balanceBefore = IERC1155(token).balanceOf(address(this), tokenId);
        IEscrow(escrowContract).collect(escrow, fulfillment);
        SplitterVerification.verifyDelta(
            balanceBefore, IERC1155(token).balanceOf(address(this), tokenId), escrowData.amount
        );
    }

    function getSplits(address oracle, bytes32 fulfillment, bytes32 escrow) external view returns (Split[] memory) {
        return decisions[oracle][_decisionKey(fulfillment, escrow)];
    }

    function decodeDemandData(bytes calldata data) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    function _validateSplitsTotal(Split[] calldata splits, uint256 expected) internal pure {
        _validateSplitCount(splits.length);

        uint256 total;
        for (uint256 i; i < splits.length; ++i) {
            total += splits[i].amount;
        }
        if (total != expected) revert InvalidSplits(expected, total);
    }

    function _storeDecision(address oracle, bytes32 decisionKey, Split[] calldata splits) internal {
        delete decisions[oracle][decisionKey];
        for (uint256 i; i < splits.length; ++i) {
            decisions[oracle][decisionKey].push(splits[i]);
        }
        _setDecisionRecorded(oracle, decisionKey);
    }
}
