// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {ISchemaRegistry, SchemaRecord} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";

library SchemaRegistryUtils {
    error SchemaRegistrationFailed(bytes32 uid);

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

    function getUID(string memory schema, ISchemaResolver resolver, bool revocable) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(schema, resolver, revocable));
    }
}
