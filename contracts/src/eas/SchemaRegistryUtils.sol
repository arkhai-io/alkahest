// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {ISchemaRegistry, SchemaRecord} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";

/// @title SchemaRegistryUtils
/// @notice Helpers for registering an EAS schema or reusing it when it already exists.
library SchemaRegistryUtils {
    /// @notice Raised when a schema cannot be registered or found at its deterministic UID.
    error SchemaRegistrationFailed(bytes32 uid);

    /// @notice Registers a schema unless the deterministic UID already exists in the registry.
    function registerOrReuse(
        ISchemaRegistry schemaRegistry,
        string memory schema,
        ISchemaResolver resolver,
        bool revocable
    ) internal returns (bytes32 uid) {
        uid = getUID(schema, resolver, revocable);

        SchemaRecord memory existing = schemaRegistry.getSchema(uid);
        if (existing.uid == uid) return uid;

        try schemaRegistry.register(schema, resolver, revocable) returns (bytes32 registeredUid) {
            if (registeredUid != uid) revert SchemaRegistrationFailed(uid);
            return registeredUid;
        } catch {
            existing = schemaRegistry.getSchema(uid);
            if (existing.uid == uid) return uid;
            revert SchemaRegistrationFailed(uid);
        }
    }

    /// @notice Computes the deterministic EAS schema UID for a schema, resolver, and revocability flag.
    function getUID(string memory schema, ISchemaResolver resolver, bool revocable) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(schema, resolver, revocable));
    }
}
