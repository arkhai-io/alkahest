// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";

import {ERC8004Arbiter} from "@src/arbiters/ERC8004Arbiter.sol";

contract DeployERC8004Arbiter is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYMENT_KEY");

        vm.startBroadcast(deployerPrivateKey);

        ERC8004Arbiter erc8004Arbiter = new ERC8004Arbiter();

        vm.stopBroadcast();

        console.log("ERC8004Arbiter:", address(erc8004Arbiter));
    }
}
