// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

interface IERC1155EscrowObligation {
    function collectEscrow(
        bytes32 escrow,
        bytes32 fulfillment
    ) external returns (bool);
}

contract ERC1155Splitter is IArbiter, ReentrancyGuard, ERC1155Holder {
    using ArbiterUtils for Attestation;

    /// @notice Sentinel address meaning "the executor who triggered the action".
    address public constant EXECUTOR_SENTINEL = address(0xEEEE);

    struct Split {
        address recipient;
        uint256 amount;
    }

    /// @notice Demand data embedded in the escrow obligation.
    ///         Token, tokenId, and amount are read from the escrow's ObligationData directly.
    struct DemandData {
        address oracle;
        bytes data;
    }

    /// @dev Layout of ERC1155EscrowObligation.ObligationData for decoding.
    struct EscrowObligationData {
        address arbiter;
        bytes demand;
        address token;
        uint256 tokenId;
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
        address indexed executor,
        address token,
        uint256 tokenId,
        Split[] splits
    );

    error UnauthorizedArbitrationRequest();
    error InvalidSplits(uint256 totalExpected, uint256 totalProvided);
    error EmptySplits();
    error ZeroRecipient();
    error ExecuteFailed(address target, bytes data);

    IEAS public eas;

    /// @notice decisions[oracle][decisionKey] => splits array.
    mapping(address => mapping(bytes32 => Split[])) internal decisions;
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
    /// @param fulfillment The fulfillment attestation UID that the oracle is approving.
    /// @param escrow The escrow attestation UID.
    /// @param splits Array of (recipient, amount) tuples. Use EXECUTOR_SENTINEL for the executor.
    function arbitrate(
        bytes32 fulfillment,
        bytes32 escrow,
        Split[] calldata splits
    ) external {
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
    // Execute (proxy calls through the splitter)
    // -----------------------------------------------------------------

    /// @notice Execute an arbitrary call as the splitter contract.
    ///         Stores msg.sender as the executor so oracle splits can
    ///         reference them via EXECUTOR_SENTINEL.
    function execute(
        address target,
        bytes calldata data
    ) external returns (bytes memory) {
        _currentExecutor = msg.sender;
        (bool success, bytes memory result) = target.call(data);
        if (!success) revert ExecuteFailed(target, data);
        _currentExecutor = address(0);
        return result;
    }

    // -----------------------------------------------------------------
    // Atomic collect + distribute
    // -----------------------------------------------------------------

    /// @notice Collects an ERC1155 escrow and distributes tokens per oracle splits.
    /// @param escrowContract The ERC1155EscrowObligation contract address.
    /// @param escrow The escrow attestation UID.
    /// @param fulfillment The fulfillment attestation UID.
    function collectAndDistribute(
        address escrowContract,
        bytes32 escrow,
        bytes32 fulfillment
    ) external nonReentrant {
        // Preserve _currentExecutor if already set (e.g. called via execute())
        bool setExecutor = _currentExecutor == address(0);
        if (setExecutor) _currentExecutor = msg.sender;

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
        IERC1155EscrowObligation(escrowContract).collectEscrow(
            escrow,
            fulfillment
        );

        // Distribute tokens according to splits
        for (uint256 i; i < splits.length; ++i) {
            address recipient = splits[i].recipient;
            if (recipient == EXECUTOR_SENTINEL) {
                recipient = _currentExecutor;
            }
            IERC1155(escrowData.token).safeTransferFrom(
                address(this),
                recipient,
                escrowData.tokenId,
                splits[i].amount,
                ""
            );
        }

        emit EscrowCollectedAndDistributed(
            escrow,
            fulfillment,
            _currentExecutor,
            escrowData.token,
            escrowData.tokenId,
            splits
        );

        if (setExecutor) _currentExecutor = address(0);
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
