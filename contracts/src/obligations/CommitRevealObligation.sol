// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {BaseObligation} from "../BaseObligation.sol";
import {IArbiter} from "../IArbiter.sol";
import {ArbiterUtils} from "../ArbiterUtils.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title CommitRevealObligation
/// @notice Obligation with built-in commit–reveal anti-front‑running checks.
/// The attestation data is self contained (payload + salt), and the arbiter
/// verifies that a matching commit exists and was made in an earlier block.
contract CommitRevealObligation is BaseObligation, IArbiter, ReentrancyGuard {
    using ArbiterUtils for Attestation;

    /// @dev Data stored inside the fulfillment attestation.
    struct ObligationData {
        bytes payload; // arbitrary self-contained data the fulfiller reveals
        bytes32 salt;  // fulfiller-chosen salt to harden the commitment
        bytes32 schema; // arbitrary tag describing the payload format
    }

    /// @dev Per-escrow commitment details for a fulfiller.
    struct CommitInfo {
        bytes32 commitment;
        uint64 commitBlock;
    }

    /// @notice commitments[escrowUid][claimer] => commit information.
    mapping(bytes32 => mapping(address => CommitInfo)) public commitments;
    /// @notice bondClaimed[obligationUid] => bond already returned.
    mapping(bytes32 => bool) public bondClaimed;

    event Committed(bytes32 indexed escrowUid, address indexed claimer, bytes32 commitment);
    event BondReclaimed(bytes32 indexed obligationUid, address indexed claimer, uint256 amount);

    error CommitmentMissing(bytes32 escrowUid, address claimer);
    error CommitmentTooRecent(bytes32 escrowUid, address claimer);
    error CommitmentMismatch(bytes32 escrowUid, address claimer);
    error BondAlreadyClaimed(bytes32 obligationUid);
    error NoBondToReclaim(bytes32 escrowUid, address claimer);

    /// @notice Fixed bond amount required for each commit.
    uint256 public immutable bondAmount;

    constructor(IEAS _eas, ISchemaRegistry _schemaRegistry, uint256 _bondAmount)
        BaseObligation(_eas, _schemaRegistry, "bytes payload, bytes32 salt, bytes32 schema", true)
    {
        bondAmount = _bondAmount;
    }

    // ---------------------------------------------------------------------
    // Attestation (reveal) path
    // ---------------------------------------------------------------------

    /// @notice Creates a fulfillment attestation containing the payload and salt.
    /// @param data Revealed data (must match a prior commit) and salt.
    /// @param refUID Escrow attestation UID being fulfilled.
    function doObligation(ObligationData calldata data, bytes32 refUID) external returns (bytes32 uid_) {
        bytes memory encodedData = abi.encode(data);
        uid_ = _doObligationForRaw(encodedData, 0, msg.sender, refUID);
    }

    // ---------------------------------------------------------------------
    // Commit phase helpers
    // ---------------------------------------------------------------------

    /// @notice Records a commitment for a given escrow UID and claimer, locking the fixed bond.
    /// @param escrowUid UID of the escrow attestation this commitment targets.
    /// @param commitment keccak256(abi.encode(escrowUid, claimer, keccak256(abi.encode(data)))).
    /// @dev msg.value must equal `bondAmount` and is held as a bond reclaimable after a valid reveal.
    function commit(bytes32 escrowUid, bytes32 commitment) external payable {
        require(commitment != bytes32(0), "empty commitment");
        require(msg.value == bondAmount, "incorrect bond");

        commitments[escrowUid][msg.sender] = CommitInfo({
            commitment: commitment,
            commitBlock: uint64(block.number)
        });

        emit Committed(escrowUid, msg.sender, commitment);
    }

    /// @notice Pure helper to compute the commitment expected by this contract.
    function computeCommitment(bytes32 escrowUid, address claimer, ObligationData calldata data)
        external
        pure
        returns (bytes32)
    {
        return keccak256(abi.encode(escrowUid, claimer, keccak256(abi.encode(data))));
    }

    // ---------------------------------------------------------------------
    // Arbiter logic (called from escrow contracts)
    // ---------------------------------------------------------------------

    /// @inheritdoc IArbiter
    function checkObligation(
        Attestation memory obligation,
        bytes memory /* demand (unused) */,
        bytes32 fulfilling
    ) public view override returns (bool) {
        // Basic attestation sanity checks (schema + expiry + revocation)
        obligation._checkIntrinsic(ATTESTATION_SCHEMA);

        // Lookup the prior commitment made by the fulfiller for this escrow
        CommitInfo memory info = commitments[fulfilling][obligation.recipient];
        if (info.commitment == bytes32(0)) {
            revert CommitmentMissing(fulfilling, obligation.recipient);
        }

        // Enforce commit happened in an earlier block to block same-block frontruns
        if (info.commitBlock >= block.number) {
            revert CommitmentTooRecent(fulfilling, obligation.recipient);
        }

        // Recompute commitment from the revealed data and compare
        bytes32 revealedCommitment = keccak256(
            abi.encode(fulfilling, obligation.recipient, keccak256(obligation.data))
        );

        if (revealedCommitment != info.commitment) {
            revert CommitmentMismatch(fulfilling, obligation.recipient);
        }

        return true;
    }

    // ---------------------------------------------------------------------
    // Bond reclaim
    // ---------------------------------------------------------------------

    /// @notice Returns the bond associated with a fulfilled attestation to its claimer.
    /// @param obligationUid UID of the fulfillment attestation (reveal).
    function reclaimBond(bytes32 obligationUid) external nonReentrant returns (uint256 amount) {
        Attestation memory obligation = _getAttestation(obligationUid);

        address claimer = obligation.recipient;
        if (bondClaimed[obligationUid]) revert BondAlreadyClaimed(obligationUid);

        bytes32 escrowUid = obligation.refUID;
        CommitInfo memory info = commitments[escrowUid][claimer];
        if (info.commitment == bytes32(0)) revert CommitmentMissing(escrowUid, claimer);

        // Ensure commitment matches the revealed data
        bytes32 revealedCommitment = keccak256(
            abi.encode(escrowUid, claimer, keccak256(obligation.data))
        );
        if (revealedCommitment != info.commitment) revert CommitmentMismatch(escrowUid, claimer);

        amount = bondAmount;
        if (amount == 0) revert NoBondToReclaim(escrowUid, claimer);

        bondClaimed[obligationUid] = true;

        (bool success, ) = claimer.call{value: amount}("");
        require(success, "bond transfer failed");

        emit BondReclaimed(obligationUid, claimer, amount);
    }

    // ---------------------------------------------------------------------
    // Convenience getters
    // ---------------------------------------------------------------------

    function getObligationData(bytes32 uid) external view returns (ObligationData memory) {
        Attestation memory attestation = _getAttestation(uid);
        return abi.decode(attestation.data, (ObligationData));
    }

    function decodeObligationData(bytes calldata data) external pure returns (ObligationData memory) {
        return abi.decode(data, (ObligationData));
    }
}
