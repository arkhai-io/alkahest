// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {SplitterVerification} from "./SplitterVerification.sol";
import {BaseSplitter} from "./BaseSplitter.sol";

interface IERC20EscrowObligation {
    function collect(bytes32 escrow, bytes32 fulfillment) external returns (bytes memory);
}

contract ERC20Splitter is BaseSplitter {
    using SplitterVerification for Attestation;
    using SafeERC20 for IERC20;

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
        uint256 amount;
    }

    event ArbitrationMade(
        bytes32 indexed decisionKey, bytes32 indexed fulfillmentUid, address indexed oracle, Split[] splits
    );
    event EscrowCollectedAndDistributed(
        bytes32 indexed escrowUid,
        bytes32 indexed fulfillmentUid,
        address indexed fulfiller,
        address token,
        Split[] splits
    );
    event ERC20TransferFailedOnDistribute(address indexed recipient, address indexed token, uint256 amount);

    error InvalidSplits(uint256 totalExpected, uint256 totalProvided);
    error ERC20TransferFailed(address token, address to, uint256 amount);

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

    /// @notice Collects an ERC20 escrow and distributes tokens per oracle splits.
    ///         Reverts if any transfer fails.
    function collectAndDistribute(address escrowContract, bytes32 escrow, bytes32 fulfillment) external nonReentrant {
        (Split[] memory splits, address token) = _collectAndDecode(escrowContract, escrow, fulfillment);
        address fulfiller = _recordedFulfiller(fulfillment);
        for (uint256 i; i < splits.length; ++i) {
            address recipient = _resolveSentinel(splits[i].recipient, fulfillment, fulfiller);
            bool success = IERC20(token).trySafeTransfer(recipient, splits[i].amount);
            if (!success) revert ERC20TransferFailed(token, recipient, splits[i].amount);
        }
        emit EscrowCollectedAndDistributed(escrow, fulfillment, fulfiller, token, splits);
    }

    /// @notice Unsafe partial distribution -- continues on individual transfer failures.
    /// @dev Use only as a last resort when collectAndDistribute is permanently blocked.
    ///      Failed transfers emit events but do not revert. Stuck tokens remain in the splitter.
    function unsafePartiallyCollectAndDistribute(address escrowContract, bytes32 escrow, bytes32 fulfillment)
        external
        nonReentrant
    {
        (Split[] memory splits, address token) = _collectAndDecode(escrowContract, escrow, fulfillment);
        address fulfiller = _recordedFulfiller(fulfillment);
        for (uint256 i; i < splits.length; ++i) {
            address recipient = _resolveSentinel(splits[i].recipient, fulfillment, fulfiller);
            bool success = IERC20(token).trySafeTransfer(recipient, splits[i].amount);
            if (!success) {
                emit ERC20TransferFailedOnDistribute(recipient, token, splits[i].amount);
            }
        }
        emit EscrowCollectedAndDistributed(escrow, fulfillment, fulfiller, token, splits);
    }

    function _collectAndDecode(address escrowContract, bytes32 escrow, bytes32 fulfillment)
        internal
        returns (Split[] memory splits, address token)
    {
        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        escrowAttestation.verifyEscrowAttestation(escrowContract);
        Attestation memory fulfillmentAttestation = eas.getAttestation(fulfillment);
        fulfillmentAttestation.verifyFulfillmentRecipient();

        EscrowObligationData memory escrowData = abi.decode(escrowAttestation.data, (EscrowObligationData));
        DemandData memory demandData = abi.decode(escrowData.demand, (DemandData));
        splits = decisions[demandData.oracle][_decisionKey(fulfillment, escrow)];
        token = escrowData.token;
        uint256 balanceBefore = IERC20(token).balanceOf(address(this));
        IERC20EscrowObligation(escrowContract).collect(escrow, fulfillment);
        SplitterVerification.verifyDelta(balanceBefore, IERC20(token).balanceOf(address(this)), escrowData.amount);
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
