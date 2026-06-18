// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";
import {SplitterVerification} from "./SplitterVerification.sol";

interface IERC20EscrowObligation {
    function collectEscrow(bytes32 escrow, bytes32 fulfillment) external returns (bool);
}

interface IObligation {
    function doObligationRaw(bytes calldata data, uint64 expirationTime, bytes32 refUID)
        external
        payable
        returns (bytes32);
}

contract ERC20Splitter is IArbiter, ReentrancyGuard {
    using ArbiterUtils for Attestation;
    using SplitterVerification for Attestation;
    using SafeERC20 for IERC20;

    /// @notice Sentinel address meaning "the fulfiller who created the fulfillment".
    address public constant EXECUTOR_SENTINEL = address(0xEEEE);

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
        bytes32 indexed decisionKey, bytes32 indexed obligation, address indexed oracle, Split[] splits
    );
    event ArbitrationRequested(
        bytes32 indexed fulfillment, bytes32 indexed escrow, address indexed oracle, bytes demand
    );
    event EscrowCollectedAndDistributed(
        bytes32 indexed escrow, bytes32 indexed fulfillment, address indexed fulfiller, address token, Split[] splits
    );
    event FulfillmentCreated(
        bytes32 indexed fulfillmentUid, address indexed fulfiller, address indexed obligationContract
    );
    event ERC20TransferFailedOnDistribute(address indexed recipient, address indexed token, uint256 amount);

    error UnauthorizedArbitrationRequest();
    error InvalidSplits(uint256 totalExpected, uint256 totalProvided);
    error EmptySplits();
    error TooManySplits(uint256 provided, uint256 max);
    error ERC20TransferFailed(address token, address to, uint256 amount);
    error NoFulfillerRecorded(bytes32 fulfillment);
    error InvalidFulfillmentUid();
    error FulfillerAlreadyRecorded(bytes32 fulfillment);
    error InvalidCreatedFulfillment(bytes32 fulfillment);
    error NativeTokenRefundFailed(address recipient, uint256 amount);

    IEAS public eas;

    mapping(address => mapping(bytes32 => Split[])) internal decisions;
    mapping(address => mapping(bytes32 => bool)) public hasDecision;
    mapping(bytes32 => address) public fulfillers;

    /// @notice Maximum number of splits allowed per decision.
    uint256 public constant MAX_SPLITS = 50;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    // -----------------------------------------------------------------
    // Oracle arbitration
    // -----------------------------------------------------------------

    function arbitrate(bytes32 fulfillment, bytes32 escrow, Split[] calldata splits) external {
        if (fulfillment == bytes32(0)) revert InvalidFulfillmentUid();
        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        EscrowObligationData memory escrowData = abi.decode(escrowAttestation.data, (EscrowObligationData));
        if (splits.length == 0) revert EmptySplits();
        if (splits.length > MAX_SPLITS) revert TooManySplits(splits.length, MAX_SPLITS);
        uint256 total;
        for (uint256 i; i < splits.length; ++i) {
            total += splits[i].amount;
        }
        if (total != escrowData.amount) revert InvalidSplits(escrowData.amount, total);
        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillment, escrow));
        delete decisions[msg.sender][decisionKey];
        for (uint256 i; i < splits.length; ++i) {
            decisions[msg.sender][decisionKey].push(splits[i]);
        }
        hasDecision[msg.sender][decisionKey] = true;
        emit ArbitrationMade(decisionKey, escrow, msg.sender, splits);
    }

    function requestArbitration(bytes32 _fulfillment, bytes32 _escrow, address oracle, bytes memory demand) external {
        Attestation memory escrowAttestation = eas.getAttestation(_escrow);
        if (escrowAttestation.attester != msg.sender && escrowAttestation.recipient != msg.sender) {
            revert UnauthorizedArbitrationRequest();
        }
        emit ArbitrationRequested(_fulfillment, _escrow, oracle, demand);
    }

    // -----------------------------------------------------------------
    // IArbiter
    // -----------------------------------------------------------------

    function checkObligation(Attestation memory fulfillment, bytes memory demand, bytes32 escrow)
        public
        view
        override
        returns (bool)
    {
        fulfillment._checkIntrinsic();
        fulfillment.verifyFulfillmentRecipient();
        DemandData memory demandData = abi.decode(demand, (DemandData));
        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillment.uid, escrow));
        return hasDecision[demandData.oracle][decisionKey];
    }

    // -----------------------------------------------------------------
    // Fulfillment creation
    // -----------------------------------------------------------------

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

    // -----------------------------------------------------------------
    // Collect + distribute
    // -----------------------------------------------------------------

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

    /// @notice Unsafe partial distribution — continues on individual transfer failures.
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
        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillment, escrow));
        splits = decisions[demandData.oracle][decisionKey];
        token = escrowData.token;
        uint256 balanceBefore = IERC20(token).balanceOf(address(this));
        IERC20EscrowObligation(escrowContract).collectEscrow(escrow, fulfillment);
        SplitterVerification.verifyDelta(balanceBefore, IERC20(token).balanceOf(address(this)), escrowData.amount);
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

    // -----------------------------------------------------------------
    // View helpers
    // -----------------------------------------------------------------

    function getSplits(address oracle, bytes32 fulfillment, bytes32 escrow) external view returns (Split[] memory) {
        return decisions[oracle][keccak256(abi.encodePacked(fulfillment, escrow))];
    }

    function decodeDemandData(bytes calldata data) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    receive() external payable {}
}
