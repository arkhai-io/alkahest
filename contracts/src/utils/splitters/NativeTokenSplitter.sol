// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

interface INativeTokenEscrowObligation {
    function collectEscrow(
        bytes32 escrow,
        bytes32 fulfillment
    ) external returns (bool);
}

interface IObligation {
    function doObligationRaw(
        bytes calldata data,
        uint64 expirationTime,
        bytes32 refUID
    ) external payable returns (bytes32);
}

contract NativeTokenSplitter is IArbiter, ReentrancyGuard {
    using ArbiterUtils for Attestation;

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
        uint256 amount;
    }

    event ArbitrationMade(bytes32 indexed decisionKey, bytes32 indexed obligation, address indexed oracle, Split[] splits);
    event ArbitrationRequested(bytes32 indexed fulfillment, bytes32 indexed escrow, address indexed oracle, bytes demand);
    event EscrowCollectedAndDistributed(bytes32 indexed escrow, bytes32 indexed fulfillment, address indexed fulfiller, Split[] splits);
    event FulfillmentCreated(bytes32 indexed fulfillmentUid, address indexed fulfiller, address indexed obligationContract);
    event DistributionFailed(address indexed recipient, uint256 amount);

    error UnauthorizedArbitrationRequest();
    error InvalidSplits(uint256 totalExpected, uint256 totalProvided);
    error EmptySplits();
    error ZeroRecipient();
    error FulfillmentFailed(address obligationContract);
    error NativeTokenTransferFailed(address to, uint256 amount);
    error NoFulfillerRecorded(bytes32 fulfillment);
    error NothingToClaim();

    IEAS public eas;

    mapping(address => mapping(bytes32 => Split[])) internal decisions;
    mapping(address => mapping(bytes32 => bool)) public hasDecision;
    mapping(bytes32 => address) public fulfillers;
    /// @notice Unclaimed native token balances: recipient => amount.
    mapping(address => uint256) public unclaimedETH;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    function arbitrate(bytes32 fulfillment, bytes32 escrow, Split[] calldata splits) external {
        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        EscrowObligationData memory escrowData = abi.decode(escrowAttestation.data, (EscrowObligationData));
        if (splits.length == 0) revert EmptySplits();
        uint256 total;
        for (uint256 i; i < splits.length; ++i) {
            if (splits[i].recipient == address(0)) revert ZeroRecipient();
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
        if (escrowAttestation.attester != msg.sender && escrowAttestation.recipient != msg.sender)
            revert UnauthorizedArbitrationRequest();
        emit ArbitrationRequested(_fulfillment, _escrow, oracle, demand);
    }

    function checkObligation(Attestation memory fulfillment, bytes memory demand, bytes32 escrow) public view override returns (bool) {
        DemandData memory demandData = abi.decode(demand, (DemandData));
        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillment.uid, escrow));
        return hasDecision[demandData.oracle][decisionKey];
    }

    function createFulfillment(address obligationContract, bytes calldata data, uint64 expirationTime, bytes32 refUID) external payable returns (bytes32 fulfillmentUid) {
        fulfillmentUid = IObligation(obligationContract).doObligationRaw{value: msg.value}(data, expirationTime, refUID);
        fulfillers[fulfillmentUid] = msg.sender;
        emit FulfillmentCreated(fulfillmentUid, msg.sender, obligationContract);
    }

    function collectAndDistribute(
        address escrowContract,
        bytes32 escrow,
        bytes32 fulfillment
    ) external nonReentrant {
        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        EscrowObligationData memory escrowData = abi.decode(escrowAttestation.data, (EscrowObligationData));
        DemandData memory demandData = abi.decode(escrowData.demand, (DemandData));
        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillment, escrow));
        Split[] memory splits = decisions[demandData.oracle][decisionKey];

        INativeTokenEscrowObligation(escrowContract).collectEscrow(escrow, fulfillment);

        for (uint256 i; i < splits.length; ++i) {
            address recipient = splits[i].recipient;
            if (recipient == EXECUTOR_SENTINEL) {
                recipient = fulfillers[fulfillment];
                if (recipient == address(0)) revert NoFulfillerRecorded(fulfillment);
            }
            (bool success, ) = payable(recipient).call{value: splits[i].amount}("");
            if (!success) {
                unclaimedETH[recipient] += splits[i].amount;
                emit DistributionFailed(recipient, splits[i].amount);
            }
        }

        emit EscrowCollectedAndDistributed(escrow, fulfillment, fulfillers[fulfillment], splits);
    }

    /// @notice Claim native tokens that failed to transfer during distribution.
    function claimETH() external nonReentrant {
        uint256 amount = unclaimedETH[msg.sender];
        if (amount == 0) revert NothingToClaim();
        unclaimedETH[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert NativeTokenTransferFailed(msg.sender, amount);
    }

    function getSplits(address oracle, bytes32 fulfillment, bytes32 escrow) external view returns (Split[] memory) {
        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillment, escrow));
        return decisions[oracle][decisionKey];
    }

    function decodeDemandData(bytes calldata data) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    receive() external payable {}
}
