// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {BaseObligation} from "../BaseObligation.sol";
import {BaseArbiter} from "../BaseArbiter.sol";
import {IArbiter} from "../IArbiter.sol";
import {IEscrow} from "../IEscrow.sol";
import {ArbiterUtils} from "../libraries/ArbiterUtils.sol";

/// @title CommitRevealObligation
/// @notice Obligation with built-in commit-reveal anti-front-running checks.
///         Each commitment locks the native-token bond supplied as msg.value.
///         Arbiter demand data specifies the exact bond amount and relative
///         reveal deadline required for a particular escrow, so this contract
///         composes cleanly under logical arbiters that pass nested demands to
///         check.
contract CommitRevealObligation is BaseObligation, BaseArbiter, Ownable {
    using ArbiterUtils for Attestation;

    /// @dev Data stored inside the fulfillment attestation.
    struct ObligationData {
        bytes payload; // arbitrary self-contained data the fulfiller reveals
        bytes32 salt; // fulfiller-chosen salt to harden the commitment
        bytes32 schema; // arbitrary tag describing the payload format
    }

    /// @dev Data supplied as this arbiter's demand.
    struct DemandData {
        uint256 bondAmount;
        uint256 commitDeadline;
    }

    /// @dev Commitment details for a commitment hash.
    struct CommitInfo {
        uint64 commitBlock;
        uint64 commitTimestamp;
        address committer;
        uint256 bondAmount;
        uint256 commitDeadline;
    }

    /// @notice commitments[commitment] => commit information.
    mapping(bytes32 => CommitInfo) public commitments;
    /// @notice commitmentClaimed[commitment] => bond already returned/slashed.
    mapping(bytes32 => bool) public commitmentClaimed;

    event Committed(bytes32 indexed commitment, address indexed claimer, uint256 amount, uint256 commitDeadline);
    event BondReclaimed(bytes32 indexed fulfillmentUid, address indexed claimer, uint256 amount);
    event BondSlashed(bytes32 indexed commitment, address indexed recipient, uint256 amount);

    error CommitmentMissing(bytes32 commitment, address claimer);
    error CommitmentTooRecent(bytes32 commitment, address claimer);
    error CommitmentAlreadyExists(bytes32 commitment);
    error BondAlreadyClaimed(bytes32 commitment);
    error BondTransferFailed(address claimer, uint256 amount);
    error SlashTransferFailed(address recipient, uint256 amount);
    error EmptyCommitment();
    error ZeroBondAmount();
    error CommitDeadlineNotReached(bytes32 commitment);
    error RevealTooLate(bytes32 commitment);
    error UnauthorizedReveal(address caller, address committer, address recipient);
    error EscrowCollectionFailed(address escrowContract, bytes32 escrowUid, bytes32 fulfillmentUid, bytes result);

    /// @notice Recipient of slashed bonds (address(0) = burn).
    address public slashedBondRecipient;

    constructor(IEAS _eas, ISchemaRegistry _schemaRegistry, address _slashedBondRecipient)
        BaseObligation(_eas, _schemaRegistry, "bytes payload, bytes32 salt, bytes32 schema", true)
        Ownable(msg.sender)
    {
        slashedBondRecipient = _slashedBondRecipient;
    }

    // ---------------------------------------------------------------------
    // Owner-only setters
    // ---------------------------------------------------------------------

    /// @notice Updates the recipient for slashed commitment bonds.
    /// @param _slashedBondRecipient New recipient for slashed bonds; address(0) burns the native token.
    function setSlashedBondRecipient(address _slashedBondRecipient) external onlyOwner {
        slashedBondRecipient = _slashedBondRecipient;
    }

    // ---------------------------------------------------------------------
    // Attestation (reveal) path
    // ---------------------------------------------------------------------

    /// @notice Creates a fulfillment attestation containing the payload and salt.
    ///         Validates the commitment, enforces the reveal deadline, and
    ///         atomically returns the committed bond to the committer.
    /// @param data Revealed data (must match a prior commit) and salt.
    /// @param refUID Escrow attestation UID being fulfilled.
    function doObligation(ObligationData calldata data, bytes32 refUID) external returns (bytes32 uid_) {
        bytes memory encodedData = abi.encode(data);
        uid_ = _doObligationForRaw(encodedData, 0, msg.sender, refUID);
    }

    /// @notice Creates a fulfillment attestation with an explicit recipient.
    ///         The reveal caller, original committer, and attestation recipient
    ///         must all be the same address.
    /// @param data Revealed data (must match a prior commit) and salt.
    /// @param recipient The address to set as the attestation recipient.
    /// @param refUID Escrow attestation UID being fulfilled.
    function doObligationFor(ObligationData calldata data, address recipient, bytes32 refUID)
        external
        returns (bytes32 uid_)
    {
        bytes memory encodedData = abi.encode(data);
        uid_ = _doObligationForRaw(encodedData, 0, recipient, refUID);
    }

    /// @notice Reveals a fulfillment and immediately collects the target escrow.
    /// @param data Revealed data and salt.
    /// @param recipient Recipient to set on the fulfillment attestation; must
    ///        equal the original committer and reveal caller.
    /// @param escrowContract Escrow contract to collect after reveal.
    /// @param escrowUid UID of the escrow attestation being fulfilled.
    /// @return fulfillmentUid UID of the created fulfillment attestation.
    /// @return collectResult Return data from the escrow contract's `collect` call.
    function revealAndCollect(
        ObligationData calldata data,
        address recipient,
        IEscrow escrowContract,
        bytes32 escrowUid
    ) external returns (bytes32 fulfillmentUid, bytes memory collectResult) {
        bytes memory encodedData = abi.encode(data);
        fulfillmentUid = _doObligationForRaw(encodedData, 0, recipient, escrowUid);

        try escrowContract.collect(escrowUid, fulfillmentUid) returns (bytes memory result) {
            collectResult = result;
        } catch (bytes memory reason) {
            revert EscrowCollectionFailed(address(escrowContract), escrowUid, fulfillmentUid, reason);
        }
    }

    /// @dev After the attestation is created, validate the commitment and
    ///      reclaim the committed bond atomically. Deadline policy is enforced
    ///      by `check` against the escrow's demand.
    function _afterAttest(Attestation memory attestation) internal override {
        bytes32 revealedCommitment =
            keccak256(abi.encode(attestation.refUID, attestation.recipient, keccak256(attestation.data)));

        CommitInfo memory info = commitments[revealedCommitment];

        if (info.committer == address(0)) {
            revert CommitmentMissing(revealedCommitment, attestation.recipient);
        }

        if (info.committer != msg.sender || info.committer != attestation.recipient) {
            revert UnauthorizedReveal(msg.sender, info.committer, attestation.recipient);
        }

        if (info.commitBlock >= block.number) {
            revert CommitmentTooRecent(revealedCommitment, attestation.recipient);
        }

        if (block.timestamp > uint256(info.commitTimestamp) + info.commitDeadline) {
            revert RevealTooLate(revealedCommitment);
        }

        if (commitmentClaimed[revealedCommitment]) {
            revert BondAlreadyClaimed(revealedCommitment);
        }

        uint256 amount = info.bondAmount;
        commitmentClaimed[revealedCommitment] = true;

        (bool success,) = info.committer.call{value: amount}("");
        if (!success) revert BondTransferFailed(info.committer, amount);

        emit BondReclaimed(attestation.uid, info.committer, amount);
    }

    // ---------------------------------------------------------------------
    // Commit phase helpers
    // ---------------------------------------------------------------------

    /// @notice Records a commitment hash, locking msg.value as its bond.
    /// @param commitment keccak256(abi.encode(refUID, claimer, keccak256(abi.encode(data)))).
    /// @param commitDeadline Relative reveal deadline, in seconds after commit, from the escrow demand.
    function commit(bytes32 commitment, uint256 commitDeadline) external payable {
        if (commitment == bytes32(0)) revert EmptyCommitment();
        if (msg.value == 0) revert ZeroBondAmount();

        if (commitments[commitment].committer != address(0)) {
            revert CommitmentAlreadyExists(commitment);
        }

        commitments[commitment] = CommitInfo({
            commitBlock: uint64(block.number),
            commitTimestamp: uint64(block.timestamp),
            committer: msg.sender,
            bondAmount: msg.value,
            commitDeadline: commitDeadline
        });

        emit Committed(commitment, msg.sender, msg.value, commitDeadline);
    }

    /// @notice Pure helper to compute the commitment expected by this contract.
    /// @param refUID Reference UID that will be stored on the fulfillment attestation.
    /// @param claimer Recipient that will be stored on the fulfillment attestation.
    /// @param data Obligation data that will be revealed.
    /// @return Commitment hash to submit in `commit`.
    function computeCommitment(bytes32 refUID, address claimer, ObligationData calldata data)
        external
        pure
        returns (bytes32)
    {
        return keccak256(abi.encode(refUID, claimer, keccak256(abi.encode(data))));
    }

    // ---------------------------------------------------------------------
    // Arbiter logic (called from escrow contracts)
    // ---------------------------------------------------------------------

    /// @inheritdoc IArbiter
    function check(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 /* fulfilling */
    )
        public
        view
        override
        returns (bool)
    {
        if (obligation.schema != ATTESTATION_SCHEMA) return false;

        bytes32 revealedCommitment =
            keccak256(abi.encode(obligation.refUID, obligation.recipient, keccak256(obligation.data)));
        CommitInfo memory info = commitments[revealedCommitment];
        if (info.committer == address(0)) {
            revert CommitmentMissing(revealedCommitment, obligation.recipient);
        }

        if (info.commitBlock >= block.number) {
            revert CommitmentTooRecent(revealedCommitment, obligation.recipient);
        }

        DemandData memory demandData = abi.decode(demand, (DemandData));
        if (info.commitDeadline != demandData.commitDeadline) return false;

        if (obligation.time > info.commitTimestamp + info.commitDeadline) {
            revert RevealTooLate(revealedCommitment);
        }

        return info.bondAmount == demandData.bondAmount;
    }

    // ---------------------------------------------------------------------
    // Bond slashing
    // ---------------------------------------------------------------------

    /// @notice Slashes the bond for a commitment whose deadline has passed without a valid reveal.
    /// @param commitment The commitment hash whose bond is being slashed.
    function slashBond(bytes32 commitment) external nonReentrant returns (uint256 amount) {
        CommitInfo memory info = commitments[commitment];
        if (info.committer == address(0)) revert CommitmentMissing(commitment, address(0));
        if (block.timestamp <= info.commitTimestamp + info.commitDeadline) {
            revert CommitDeadlineNotReached(commitment);
        }
        if (commitmentClaimed[commitment]) revert BondAlreadyClaimed(commitment);

        amount = info.bondAmount;
        commitmentClaimed[commitment] = true;

        (bool success,) = slashedBondRecipient.call{value: amount}("");
        if (!success) revert SlashTransferFailed(slashedBondRecipient, amount);

        emit BondSlashed(commitment, slashedBondRecipient, amount);
    }

    // ---------------------------------------------------------------------
    // Convenience getters
    // ---------------------------------------------------------------------

    /// @notice Loads and decodes this contract's obligation data from an attestation UID.
    /// @param uid UID of the fulfillment attestation.
    function getObligationData(bytes32 uid) external view returns (ObligationData memory) {
        Attestation memory attestation = _getAttestation(uid);
        return abi.decode(attestation.data, (ObligationData));
    }

    /// @notice Decodes ABI-encoded obligation data.
    function decodeObligationData(bytes calldata data) external pure returns (ObligationData memory) {
        return abi.decode(data, (ObligationData));
    }

    /// @notice Decodes ABI-encoded arbiter demand data.
    function decodeDemandData(bytes calldata data) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
