// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

interface IERC20EscrowObligation {
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

contract ERC20Splitter is IArbiter, ReentrancyGuard {
    using ArbiterUtils for Attestation;
    using SafeERC20 for IERC20;

    /// @notice Sentinel address meaning "the fulfiller who created the fulfillment".
    ///         Only valid when the fulfillment was created via createFulfillment().
    address public constant EXECUTOR_SENTINEL = address(0xEEEE);

    struct Split {
        address recipient;
        uint256 amount;
    }

    /// @notice Demand data embedded in the escrow obligation.
    ///         Token and amount are read from the escrow's ObligationData directly.
    struct DemandData {
        address oracle;
        bytes data;
    }

    /// @dev Layout of ERC20EscrowObligation.ObligationData for decoding.
    struct EscrowObligationData {
        address arbiter;
        bytes demand;
        address token;
        uint256 amount;
    }

    event ArbitrationMade(
        bytes32 indexed decisionKey,
        bytes32 indexed obligation,
        address indexed oracle,
        Split[] splits
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
        address indexed fulfiller,
        address token,
        Split[] splits
    );
    event FulfillmentCreated(
        bytes32 indexed fulfillmentUid,
        address indexed fulfiller,
        address indexed obligationContract
    );

    error UnauthorizedArbitrationRequest();
    error InvalidSplits(uint256 totalExpected, uint256 totalProvided);
    error EmptySplits();
    error ZeroRecipient();
    error FulfillmentFailed(address obligationContract);
    error NoFulfillerRecorded(bytes32 fulfillment);

    IEAS public eas;

    /// @notice decisions[oracle][decisionKey] => splits array.
    mapping(address => mapping(bytes32 => Split[])) internal decisions;
    /// @notice Whether a decision has been made (distinguishes empty from nonexistent).
    mapping(address => mapping(bytes32 => bool)) public hasDecision;
    /// @notice fulfillers[fulfillmentUid] => address of the actual fulfiller.
    mapping(bytes32 => address) public fulfillers;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    // -----------------------------------------------------------------
    // Oracle arbitration
    // -----------------------------------------------------------------

    /// @notice Oracle submits a split decision for a fulfillment to an escrow.
    /// @param fulfillment The fulfillment attestation UID that the oracle is approving.
    /// @param escrow The escrow attestation UID.
    /// @param splits Array of (recipient, amount) tuples. Use EXECUTOR_SENTINEL for the fulfiller.
    function arbitrate(
        bytes32 fulfillment,
        bytes32 escrow,
        Split[] calldata splits
    ) external {
        // Read escrow attestation to get token and total amount
        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        EscrowObligationData memory escrowData = abi.decode(
            escrowAttestation.data,
            (EscrowObligationData)
        );

        if (splits.length == 0) revert EmptySplits();

        uint256 total;
        for (uint256 i; i < splits.length; ++i) {
            if (splits[i].recipient == address(0)) revert ZeroRecipient();
            total += splits[i].amount;
        }
        if (total != escrowData.amount)
            revert InvalidSplits(escrowData.amount, total);

        bytes32 decisionKey = keccak256(
            abi.encodePacked(fulfillment, escrow)
        );

        delete decisions[msg.sender][decisionKey];
        for (uint256 i; i < splits.length; ++i) {
            decisions[msg.sender][decisionKey].push(splits[i]);
        }
        hasDecision[msg.sender][decisionKey] = true;

        emit ArbitrationMade(decisionKey, escrow, msg.sender, splits);
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
    // Fulfillment creation
    // -----------------------------------------------------------------

    /// @notice Creates a fulfillment attestation via the splitter, recording msg.sender
    ///         as the fulfiller. The splitter becomes the attestation recipient (needed
    ///         for escrow collection). Calls doObligationRaw on the obligation contract.
    /// @param obligationContract The obligation contract to create the fulfillment on.
    /// @param data Obligation-specific data (passed to doObligationRaw).
    /// @param expirationTime Attestation expiration (0 = none).
    /// @param refUID The escrow attestation UID being fulfilled.
    function createFulfillment(
        address obligationContract,
        bytes calldata data,
        uint64 expirationTime,
        bytes32 refUID
    ) external payable returns (bytes32 fulfillmentUid) {
        fulfillmentUid = IObligation(obligationContract).doObligationRaw{value: msg.value}(
            data, expirationTime, refUID
        );
        fulfillers[fulfillmentUid] = msg.sender;

        emit FulfillmentCreated(fulfillmentUid, msg.sender, obligationContract);
    }

    // -----------------------------------------------------------------
    // Atomic collect + distribute
    // -----------------------------------------------------------------

    /// @notice Collects an ERC20 escrow and distributes tokens per oracle splits.
    /// @param escrowContract The ERC20EscrowObligation contract address.
    /// @param escrow The escrow attestation UID.
    /// @param fulfillment The fulfillment attestation UID.
    function collectAndDistribute(
        address escrowContract,
        bytes32 escrow,
        bytes32 fulfillment
    ) external nonReentrant {
        // Read escrow attestation to get demand, token, and amount
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

        Split[] memory splits = decisions[demandData.oracle][decisionKey];

        // Collect escrow — tokens transfer to this contract
        IERC20EscrowObligation(escrowContract).collectEscrow(
            escrow,
            fulfillment
        );

        // Distribute tokens according to splits
        for (uint256 i; i < splits.length; ++i) {
            address recipient = splits[i].recipient;
            if (recipient == EXECUTOR_SENTINEL) {
                recipient = fulfillers[fulfillment];
                if (recipient == address(0)) revert NoFulfillerRecorded(fulfillment);
            }
            IERC20(escrowData.token).safeTransfer(
                recipient,
                splits[i].amount
            );
        }

        emit EscrowCollectedAndDistributed(
            escrow,
            fulfillment,
            fulfillers[fulfillment],
            escrowData.token,
            splits
        );
    }

    // -----------------------------------------------------------------
    // View helpers
    // -----------------------------------------------------------------

    function getSplits(
        address oracle,
        bytes32 fulfillment,
        bytes32 escrow
    ) external view returns (Split[] memory) {
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
}
