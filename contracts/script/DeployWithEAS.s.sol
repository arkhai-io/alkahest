// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {EAS} from "@eas/EAS.sol";
import {SchemaRegistry} from "@eas/SchemaRegistry.sol";
import {Deploy} from "./Deploy.s.sol";

contract DeployWithEAS is Deploy {
    function run() external override {
        uint256 deployerPrivateKey = vm.envOr("DEPLOYMENT_KEY", uint256(0));
        bool compatibilitySchemaRegistration = vm.envOr("COMPATIBILITY_SCHEMA_REGISTRATION", false);

        if (deployerPrivateKey != 0) {
            vm.startBroadcast(deployerPrivateKey);
        } else {
            vm.startBroadcast();
        }

        SchemaRegistry schemaRegistry = new SchemaRegistry();
        EAS eas = new EAS(schemaRegistry);

        _deploy(address(eas), address(schemaRegistry), compatibilitySchemaRegistration);
    }
}
