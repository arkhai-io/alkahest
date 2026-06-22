// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IArbiter} from "./IArbiter.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry, SchemaRecord} from "@eas/ISchemaRegistry.sol";
import {SchemaResolver} from "@eas/resolver/SchemaResolver.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {Attestation} from "@eas/Common.sol";
import {AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {SchemaRegistryUtils} from "./SchemaRegistryUtils.sol";

/// @title BaseAttester
/// @notice Shared resolver and schema-registration base for contracts that create their own EAS attestations.
/// @dev The resolver accepts attestations and revocations only when this contract is the attester.
abstract contract BaseAttester is SchemaResolver {
    using SchemaRegistryUtils for ISchemaRegistry;

    /// @notice EAS schema registry used to register or reuse the attestation schema.
    ISchemaRegistry internal immutable schemaRegistry;
    /// @notice EAS instance used for attestation reads and writes.
    IEAS internal immutable eas;
    /// @notice UID of the schema used by attestations created by this contract.
    bytes32 public immutable ATTESTATION_SCHEMA;
    /// @notice Whether attestations under `ATTESTATION_SCHEMA` are revocable.
    bool public immutable ATTESTATION_SCHEMA_REVOCABLE;

    /// @notice Raised when an attestation does not belong to this contract's schema.
    error NotFromThisAttester();

    /// @param _eas EAS contract used to create and read attestations.
    /// @param _schemaRegistry EAS schema registry used to register or reuse `schema`.
    /// @param schema Human-readable EAS schema string.
    /// @param revocable Whether attestations created under `schema` are revocable.
    constructor(IEAS _eas, ISchemaRegistry _schemaRegistry, string memory schema, bool revocable) SchemaResolver(_eas) {
        eas = _eas;
        schemaRegistry = _schemaRegistry;
        ATTESTATION_SCHEMA_REVOCABLE = revocable;
        ATTESTATION_SCHEMA = schemaRegistry.registerOrReuse(schema, ISchemaResolver(address(this)), revocable);
    }

    /// @inheritdoc SchemaResolver
    function onAttest(
        Attestation calldata attestation,
        uint256 /* value */
    )
        internal
        view
        override
        returns (bool)
    {
        // only this contract can attest
        return attestation.attester == address(this);
    }

    /// @inheritdoc SchemaResolver
    function onRevoke(
        Attestation calldata attestation,
        uint256 /* value */
    )
        internal
        view
        override
        returns (bool)
    {
        // only this contract can revoke
        return attestation.attester == address(this);
    }

    /// @notice Returns the schema record registered for this attester.
    function getSchema() external view returns (SchemaRecord memory) {
        return schemaRegistry.getSchema(ATTESTATION_SCHEMA);
    }

    /// @notice Creates an EAS attestation under this contract's schema.
    /// @param data ABI-encoded obligation data.
    /// @param recipient Recipient stored on the EAS attestation.
    /// @param expirationTime EAS expiration timestamp, or zero for no expiration.
    /// @param refUID Reference UID stored on the EAS attestation.
    function _attest(bytes memory data, address recipient, uint64 expirationTime, bytes32 refUID)
        internal
        returns (bytes32)
    {
        return eas.attest(
            AttestationRequest({
                schema: ATTESTATION_SCHEMA,
                data: AttestationRequestData({
                    recipient: recipient,
                    expirationTime: expirationTime,
                    revocable: ATTESTATION_SCHEMA_REVOCABLE,
                    refUID: refUID,
                    data: data,
                    value: 0
                })
            })
        );
    }

    /// @notice Loads an attestation and verifies that it uses this contract's schema.
    /// @param uid UID of the attestation to load.
    function _getAttestation(bytes32 uid) internal view returns (Attestation memory attestation_) {
        attestation_ = eas.getAttestation(uid);
        if (attestation_.schema != ATTESTATION_SCHEMA) {
            revert NotFromThisAttester();
        }
    }
}
