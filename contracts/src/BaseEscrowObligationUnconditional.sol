// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {BaseObligation} from "./BaseObligation.sol";
import {IArbiter} from "./IArbiter.sol";
import {ArbiterUtils} from "./ArbiterUtils.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS, RevocationRequest, RevocationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";

// Note: Does NOT implement IArbiter - that's left to specific implementations
abstract contract BaseEscrowObligationUnconditional is BaseObligation {
    using ArbiterUtils for Attestation;

    // Common events for all escrow types
    event EscrowMade(bytes32 indexed escrowUid, address indexed escrower);
    event EscrowCollected(bytes32 indexed escrowUid, bytes32 indexed fulfillmentUid, address indexed fulfiller);

    // Common errors
    error InvalidEscrowAttestation();
    error InvalidFulfillment();
    error UnauthorizedCall();
    error AttestationNotFound(bytes32 attestationId);
    error RevocationFailed(bytes32 attestationId);

    constructor(IEAS _eas, ISchemaRegistry _schemaRegistry, string memory schema, bool revocable)
        BaseObligation(_eas, _schemaRegistry, schema, revocable)
    {}

    // Abstract methods that escrow types must implement

    // Called when escrow is created (in _beforeObligation)
    function _lockEscrow(bytes memory data, address from) internal virtual;

    // Called when escrow is collected (after successful fulfillment check)
    function _releaseEscrow(Attestation memory escrow, address to, bytes32 fulfillmentUid)
        internal
        virtual
        returns (bytes memory result);

    // Called when escrow expires and is reclaimed
    function _returnEscrow(Attestation memory escrow, address to) internal virtual;

    // Called after EAS creates the escrow attestation and before EscrowMade is emitted
    function _afterEscrowAttest(Attestation memory attestation) internal virtual {}

    // Extract arbiter and demand from encoded data
    function decodeCondition(bytes memory data)
        public
        pure
        virtual
        returns (address arbiter, bytes memory demand);

    // Common escrow collection implementation (unconditional version - no fulfillment intrinsic or refUID check)
    function collect(bytes32 _escrow, bytes32 _fulfillment)
        public
        virtual
        nonReentrant
        returns (bytes memory)
    {
        Attestation memory escrow = _getExistingAttestation(_escrow);
        Attestation memory fulfillment = _getExistingAttestation(_fulfillment);

        // Validate escrow uses correct schema
        if (escrow.schema != ATTESTATION_SCHEMA) {
            revert InvalidEscrowAttestation();
        }

        if (!escrow._checkIntrinsic()) revert InvalidEscrowAttestation();

        // Extract arbiter and demand from escrow data
        (address arbiter, bytes memory demand) = decodeCondition(escrow.data);

        // UNCONDITIONAL: No fulfillment intrinsic or refUID check
        // Use this when fulfillment policy is fully delegated to arbiters

        // Check fulfillment via the specified arbiter
        if (!IArbiter(arbiter).check(fulfillment, demand, escrow.uid)) {
            revert InvalidFulfillment();
        }

        // Revoke attestation
        try eas.revoke(
            RevocationRequest({schema: ATTESTATION_SCHEMA, data: RevocationRequestData({uid: _escrow, value: 0})})
        ) {}
        catch {
            revert RevocationFailed(_escrow);
        }

        // Execute the escrow release
        bytes memory result = _releaseEscrow(escrow, fulfillment.recipient, _fulfillment);

        emit EscrowCollected(_escrow, _fulfillment, fulfillment.recipient);
        return result;
    }

    function reclaim(bytes32 uid) public virtual nonReentrant returns (bool) {
        Attestation memory attestation = _getExistingAttestation(uid);

        // Validate attestation uses correct schema
        if (attestation.schema != ATTESTATION_SCHEMA) {
            revert InvalidEscrowAttestation();
        }

        // Prevent reclaiming non-expiring attestations (expirationTime 0 means never expires)
        if (attestation.expirationTime == 0) revert UnauthorizedCall();

        if (block.timestamp < attestation.expirationTime) {
            revert UnauthorizedCall();
        }

        // Revoke attestation to prevent re-entry
        try eas.revoke(
            RevocationRequest({schema: ATTESTATION_SCHEMA, data: RevocationRequestData({uid: uid, value: 0})})
        ) {}
        catch {
            revert RevocationFailed(uid);
        }

        // Return escrowed value to original recipient
        _returnEscrow(attestation, attestation.recipient);

        return true;
    }

    function _getExistingAttestation(bytes32 uid) internal view returns (Attestation memory attestation) {
        attestation = eas.getAttestation(uid);
        if (attestation.uid == bytes32(0) || attestation.uid != uid) revert AttestationNotFound(uid);
    }

    // Hook implementations
    function _beforeAttest(
        bytes memory data,
        address payer,
        address /*recipient*/
    )
        internal
        virtual
        override
    {
        _lockEscrow(data, payer);
    }

    // Hook implementations

    function _afterAttest(Attestation memory attestation) internal override {
        _afterEscrowAttest(attestation);
        emit EscrowMade(attestation.uid, attestation.recipient);
    }
}
