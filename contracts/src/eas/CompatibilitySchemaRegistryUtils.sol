// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";

/// @title CompatibilitySchemaRegistryUtils
/// @notice Schema-registration helpers for chains or tooling that cannot handle constructor-time schema lookups.
/// @dev This intentionally does not preflight `getSchema`; callers should only use it when duplicate schemas are
///      operationally impossible or handled outside the constructor path.
library CompatibilitySchemaRegistryUtils {
    /// @notice Raised when the registry returns an unexpected UID.
    error SchemaRegistrationFailed(bytes32 expected, bytes32 actual);

    /// @notice Registers a schema without a constructor-time lookup and verifies the deterministic UID returned by EAS.
    function registerWithoutLookup(
        ISchemaRegistry schemaRegistry,
        string memory schema,
        ISchemaResolver resolver,
        bool revocable
    ) internal returns (bytes32 uid) {
        uid = getUID(schema, resolver, revocable);
        bytes32 registeredUid = schemaRegistry.register(schema, resolver, revocable);
        if (registeredUid != uid) revert SchemaRegistrationFailed(uid, registeredUid);
    }

    /// @notice Computes the deterministic EAS schema UID for a schema, resolver, and revocability flag.
    function getUID(string memory schema, ISchemaResolver resolver, bool revocable) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(schema, resolver, revocable));
    }
}
