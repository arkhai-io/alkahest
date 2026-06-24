// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {EAS} from "@eas/EAS.sol";
import {SchemaRegistry} from "@eas/SchemaRegistry.sol";

contract DeployEAS is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envOr("DEPLOYMENT_KEY", uint256(0));

        if (deployerPrivateKey != 0) {
            vm.startBroadcast(deployerPrivateKey);
        } else {
            vm.startBroadcast();
        }

        SchemaRegistry schemaRegistry = new SchemaRegistry();
        EAS eas = new EAS(schemaRegistry);

        vm.stopBroadcast();

        console.log("EAS:", address(eas));
        console.log("Schema Registry:", address(schemaRegistry));
    }
}
