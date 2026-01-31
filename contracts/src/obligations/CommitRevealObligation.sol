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

    /// @dev Commitment details for a commitment hash.
    struct CommitInfo {
        uint64 commitBlock;
        address committer;
    }

    /// @notice commitments[commitment] => commit information.
    mapping(bytes32 => CommitInfo) public commitments;
    /// @notice commitmentClaimed[commitment] => bond already returned.
    mapping(bytes32 => bool) public commitmentClaimed;

    event Committed(bytes32 indexed commitment, address indexed claimer);
    event BondReclaimed(bytes32 indexed obligationUid, address indexed claimer, uint256 amount);

    error CommitmentMissing(bytes32 commitment, address claimer);
    error CommitmentTooRecent(bytes32 commitment, address claimer);
    error CommitmentAlreadyExists(bytes32 commitment);
    error BondAlreadyClaimed(bytes32 commitment);
    error BondTransferFailed(address claimer, uint256 amount);
    error EmptyCommitment();
    error IncorrectBondAmount(uint256 provided, uint256 required);

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

    /// @notice Records a commitment hash, locking the fixed bond.
    /// @param commitment keccak256(abi.encode(claimer, keccak256(abi.encode(data)))).
    /// @dev msg.value must equal `bondAmount` and is held as a bond reclaimable after a valid reveal.
    function commit(bytes32 commitment) external payable {
        if (commitment == bytes32(0)) revert EmptyCommitment();
        if (msg.value != bondAmount) revert IncorrectBondAmount(msg.value, bondAmount);

        if (commitments[commitment].committer != address(0)) {
            revert CommitmentAlreadyExists(commitment);
        }

        commitments[commitment] = CommitInfo({commitBlock: uint64(block.number), committer: msg.sender});

        emit Committed(commitment, msg.sender);
    }

    /// @notice Pure helper to compute the commitment expected by this contract.
    function computeCommitment(address claimer, ObligationData calldata data)
        external
        pure
        returns (bytes32)
    {
        return keccak256(abi.encode(claimer, keccak256(abi.encode(data))));
    }

    // ---------------------------------------------------------------------
    // Arbiter logic (called from escrow contracts)
    // ---------------------------------------------------------------------

    /// @inheritdoc IArbiter
    function checkObligation(
        Attestation memory obligation,
        bytes memory /* demand (unused) */,
        bytes32 /* fulfilling (unused) */
    ) public view override returns (bool) {
        // Basic attestation sanity checks (schema + expiry + revocation)
        obligation._checkIntrinsic(ATTESTATION_SCHEMA);

        // Lookup the prior commitment for the fulfiller
        bytes32 revealedCommitment = keccak256(
            abi.encode(obligation.recipient, keccak256(obligation.data))
        );
        CommitInfo memory info = commitments[revealedCommitment];
        if (info.committer == address(0)) {
            revert CommitmentMissing(revealedCommitment, obligation.recipient);
        }

        // Enforce commitment age to block same-block frontruns
        if (info.commitBlock >= block.number) {
            revert CommitmentTooRecent(revealedCommitment, obligation.recipient);
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
        bytes32 revealedCommitment = keccak256(
            abi.encode(claimer, keccak256(obligation.data))
        );
        CommitInfo memory info = commitments[revealedCommitment];
        if (info.committer == address(0)) revert CommitmentMissing(revealedCommitment, claimer);
        if (info.commitBlock >= block.number) {
            revert CommitmentTooRecent(revealedCommitment, claimer);
        }
        if (commitmentClaimed[revealedCommitment]) revert BondAlreadyClaimed(revealedCommitment);

        amount = bondAmount;

        commitmentClaimed[revealedCommitment] = true;

        (bool success, ) = claimer.call{value: amount}("");
        if (!success) revert BondTransferFailed(claimer, amount);

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
