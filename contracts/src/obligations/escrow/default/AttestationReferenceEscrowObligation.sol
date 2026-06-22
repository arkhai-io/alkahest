// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {BaseEscrowObligation} from "../../../BaseEscrowObligation.sol";
import {IArbiter} from "../../../IArbiter.sol";
import {ArbiterUtils} from "../../../ArbiterUtils.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {SchemaRegistryUtils} from "../../../SchemaRegistryUtils.sol";

/// @title AttestationReferenceEscrowObligation
/// @notice Escrows a reference to an existing attestation behind an arbiter-defined fulfillment condition.
/// @dev Uses the default escrow checks: fulfillment must reference the escrow UID and pass intrinsic attestation validation.
contract AttestationReferenceEscrowObligation is BaseEscrowObligation, IArbiter {
    using ArbiterUtils for Attestation;
    using SchemaRegistryUtils for ISchemaRegistry;

    bytes32 public immutable VALIDATION_SCHEMA;

    /// @notice Attestation-reference escrow terms encoded in each escrow attestation.
    struct ObligationData {
        address arbiter;
        bytes demand;
        bytes32 attestationUid; // Reference to the pre-made attestation
        uint64 validationExpirationTime;
        bool validationRevocable;
    }

    constructor(IEAS _eas, ISchemaRegistry _schemaRegistry)
        BaseEscrowObligation(
            _eas,
            _schemaRegistry,
            "address arbiter, bytes demand, bytes32 attestationUid, uint64 validationExpirationTime, bool validationRevocable",
            true
        )
    {
        // Register the validation schema
        VALIDATION_SCHEMA =
            _schemaRegistry.registerOrReuse("bytes32 validatedAttestationUid", ISchemaResolver(address(this)), true);
    }

    // Extract arbiter and demand from encoded data
    /// @inheritdoc BaseEscrowObligation
    function decodeCondition(bytes memory data) public pure override returns (address arbiter, bytes memory demand) {
        ObligationData memory decoded = abi.decode(data, (ObligationData));
        return (decoded.arbiter, decoded.demand);
    }

    // No assets to lock for attestation escrows
    function _lockEscrow(bytes memory, address) internal override {
        // No-op: attestations don't require locking assets
    }

    // Create validation attestation
    function _releaseEscrow(Attestation memory escrow, address to, bytes32) internal override returns (bytes memory) {
        ObligationData memory decoded = abi.decode(escrow.data, (ObligationData));

        // Create validation attestation
        bytes32 validationUid = eas.attest(
            AttestationRequest({
                schema: VALIDATION_SCHEMA,
                data: AttestationRequestData({
                    recipient: to,
                    expirationTime: decoded.validationExpirationTime,
                    revocable: decoded.validationRevocable,
                    refUID: decoded.attestationUid,
                    data: abi.encode(decoded.attestationUid),
                    value: 0
                })
            })
        );

        return abi.encode(validationUid);
    }

    // No assets to return for attestation escrows
    function _returnEscrow(Attestation memory, address) internal override {
        // No-op: attestations don't require returning assets
    }

    // Implement IArbiter
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

        ObligationData memory escrow = abi.decode(obligation.data, (ObligationData));
        ObligationData memory demandData = abi.decode(demand, (ObligationData));

        return escrow.attestationUid == demandData.attestationUid
            && escrow.validationExpirationTime == demandData.validationExpirationTime
            && escrow.validationRevocable == demandData.validationRevocable && escrow.arbiter == demandData.arbiter
            && keccak256(escrow.demand) == keccak256(demandData.demand);
    }

    // Typed convenience methods
    /// @notice Creates an escrow attestation that certifies an existing attestation reference.
    function doObligation(ObligationData calldata data, uint64 expirationTime) external returns (bytes32) {
        return _doObligationForRaw(abi.encode(data), expirationTime, msg.sender, bytes32(0));
    }

    /// @notice Creates an attestation-reference escrow for an explicit recipient.
    function doObligationFor(ObligationData calldata data, uint64 expirationTime, address recipient)
        external
        returns (bytes32)
    {
        return _doObligationForRaw(abi.encode(data), expirationTime, recipient, bytes32(0));
    }

    /// @notice Loads and decodes attestation-reference escrow data from this contract's attestation.
    function getObligationData(bytes32 uid) public view returns (ObligationData memory) {
        Attestation memory attestation = _getAttestation(uid);
        return abi.decode(attestation.data, (ObligationData));
    }

    /// @notice Decodes ABI-encoded attestation-reference escrow data.
    function decodeObligationData(bytes calldata data) public pure returns (ObligationData memory) {
        return abi.decode(data, (ObligationData));
    }
}
