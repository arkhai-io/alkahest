// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {IEAS} from "@eas/IEAS.sol";
import {GenLayerNLPArbiter} from "@src/arbiters/genlayer/GenLayerNLPArbiter.sol";

contract DeployGenLayerNLPArbiter is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envOr("DEPLOYMENT_KEY", uint256(0));
        address easAddress = vm.envAddress("EAS_ADDRESS");

        if (deployerPrivateKey != 0) {
            vm.startBroadcast(deployerPrivateKey);
        } else {
            vm.startBroadcast();
        }

        GenLayerNLPArbiter arbiter = new GenLayerNLPArbiter(IEAS(easAddress));

        vm.stopBroadcast();

        console.log("GenLayerNLPArbiter:", address(arbiter));
    }
}
