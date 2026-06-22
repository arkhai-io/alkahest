// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IArbiter} from "../../IArbiter.sol";
import {SplitterVerification} from "./SplitterVerification.sol";

/// @notice Minimal obligation interface used to create splitter-owned fulfillments.
interface IObligation {
    function doObligationRaw(bytes calldata data, uint64 expirationTime, bytes32 refUID)
        external
        payable
        returns (bytes32);
}

/// @notice Common splitter arbiter demand data.
struct SplitterDemandData {
    /// @notice Oracle address whose split decision is trusted.
    address oracle;
    /// @notice Opaque demand context for the oracle.
    bytes data;
}

/// @title BaseSplitter
/// @notice Shared arbiter and fulfillment-recording base for splitter contracts.
/// @dev Splitter decisions are keyed by `(fulfillment, escrow)` and associated with an oracle address.
abstract contract BaseSplitter is IArbiter, ReentrancyGuard {
    using SplitterVerification for Attestation;

    /// @notice Sentinel address meaning "the fulfiller who created the fulfillment".
    address public constant EXECUTOR_SENTINEL = address(0xEEEE);

    /// @notice Maximum number of splits allowed per decision.
    uint256 public constant MAX_SPLITS = 50;

    /// @notice Emitted by an escrow participant to request a split decision.
    event ArbitrationRequested(
        bytes32 indexed fulfillment, bytes32 indexed escrow, address indexed oracle, bytes demand
    );
    /// @notice Emitted when the splitter creates a fulfillment and records the external fulfiller.
    event FulfillmentCreated(
        bytes32 indexed fulfillmentUid, address indexed fulfiller, address indexed obligationContract
    );

    error UnauthorizedArbitrationRequest();
    error EmptySplits();
    error TooManySplits(uint256 provided, uint256 max);
    error NoFulfillerRecorded(bytes32 fulfillment);
    error InvalidFulfillmentUid();
    error FulfillerAlreadyRecorded(bytes32 fulfillment);
    error InvalidCreatedFulfillment(bytes32 fulfillment);
    error NativeTokenRefundFailed(address recipient, uint256 amount);

    /// @notice EAS contract used to load escrow and fulfillment attestations.
    IEAS public eas;

    /// @notice Whether an oracle has recorded a decision for a decision key.
    mapping(address => mapping(bytes32 => bool)) public hasDecision;
    /// @notice External fulfiller recorded for splitter-owned fulfillments.
    mapping(bytes32 => address) public fulfillers;

    /// @param _eas EAS contract used to load attestations.
    constructor(IEAS _eas) {
        eas = _eas;
    }

    /// @notice Emits an arbitration request when called by the escrow attester or recipient.
    function requestArbitration(bytes32 _fulfillment, bytes32 _escrow, address oracle, bytes memory demand) external {
        Attestation memory escrowAttestation = eas.getAttestation(_escrow);
        if (escrowAttestation.attester != msg.sender && escrowAttestation.recipient != msg.sender) {
            revert UnauthorizedArbitrationRequest();
        }
        emit ArbitrationRequested(_fulfillment, _escrow, oracle, demand);
    }

    /// @inheritdoc IArbiter
    function check(Attestation memory fulfillment, bytes memory demand, bytes32 escrow)
        public
        view
        virtual
        override
        returns (bool)
    {
        fulfillment.verifyFulfillmentRecipient();
        SplitterDemandData memory demandData = abi.decode(demand, (SplitterDemandData));
        return hasDecision[demandData.oracle][_decisionKey(fulfillment.uid, escrow)];
    }

    /// @notice Creates a fulfillment attestation addressed to this splitter and records the caller as fulfiller.
    function createFulfillment(address obligationContract, bytes calldata data, uint64 expirationTime, bytes32 refUID)
        external
        payable
        nonReentrant
        returns (bytes32 fulfillmentUid)
    {
        uint256 retainedBalance = address(this).balance - msg.value;
        fulfillmentUid = IObligation(obligationContract).doObligationRaw{value: msg.value}(data, expirationTime, refUID);
        _validateCreatedFulfillment(fulfillmentUid, obligationContract, data, expirationTime, refUID);
        if (fulfillers[fulfillmentUid] != address(0)) revert FulfillerAlreadyRecorded(fulfillmentUid);
        fulfillers[fulfillmentUid] = msg.sender;
        _refundNativeBalanceIncrease(retainedBalance, msg.sender);
        emit FulfillmentCreated(fulfillmentUid, msg.sender, obligationContract);
    }

    function _decisionKey(bytes32 fulfillment, bytes32 escrow) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(fulfillment, escrow));
    }

    function _validateSplitCount(uint256 splitCount) internal pure {
        if (splitCount == 0) revert EmptySplits();
        if (splitCount > MAX_SPLITS) revert TooManySplits(splitCount, MAX_SPLITS);
    }

    function _setDecisionRecorded(address oracle, bytes32 decisionKey) internal {
        hasDecision[oracle][decisionKey] = true;
    }

    function _recordedFulfiller(bytes32 fulfillment) internal view returns (address fulfiller) {
        fulfiller = fulfillers[fulfillment];
    }

    function _resolveSentinel(address recipient, bytes32 fulfillment, address fulfiller)
        internal
        pure
        returns (address)
    {
        if (recipient == EXECUTOR_SENTINEL) {
            if (fulfiller == address(0)) revert NoFulfillerRecorded(fulfillment);
            recipient = fulfiller;
        }
        return recipient;
    }

    function _validateCreatedFulfillment(
        bytes32 fulfillmentUid,
        address obligationContract,
        bytes calldata data,
        uint64 expirationTime,
        bytes32 refUID
    ) internal view {
        if (fulfillmentUid == bytes32(0)) revert InvalidFulfillmentUid();

        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        if (
            fulfillment.uid != fulfillmentUid || fulfillment.attester != obligationContract
                || fulfillment.recipient != address(this) || fulfillment.expirationTime != expirationTime
                || fulfillment.refUID != refUID || keccak256(fulfillment.data) != keccak256(data)
        ) {
            revert InvalidCreatedFulfillment(fulfillmentUid);
        }
    }

    function _refundNativeBalanceIncrease(uint256 retainedBalance, address recipient) internal {
        uint256 currentBalance = address(this).balance;
        if (currentBalance <= retainedBalance) return;

        uint256 refundAmount = currentBalance - retainedBalance;
        (bool success,) = payable(recipient).call{value: refundAmount}("");
        if (!success) revert NativeTokenRefundFailed(recipient, refundAmount);
    }

    receive() external payable virtual {}
}
