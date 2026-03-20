// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import {IEAS} from "@eas/IEAS.sol";

import {ERC20Splitter} from "@src/utils/splitters/ERC20Splitter.sol";
import {ERC1155Splitter} from "@src/utils/splitters/ERC1155Splitter.sol";
import {NativeTokenSplitter} from "@src/utils/splitters/NativeTokenSplitter.sol";
import {TokenBundleSplitter} from "@src/utils/splitters/TokenBundleSplitter.sol";
import {TokenBundleSplitterUnvalidated} from "@src/utils/splitters/TokenBundleSplitterUnvalidated.sol";

contract DeploySplitters is Script {
    function run() external {
        address easAddress = vm.envAddress("EAS_ADDRESS");
        uint256 deployerPrivateKey = vm.envOr("DEPLOYMENT_KEY", uint256(0));

        if (deployerPrivateKey != 0) {
            vm.startBroadcast(deployerPrivateKey);
        } else {
            vm.startBroadcast();
        }

        ERC20Splitter erc20Splitter = new ERC20Splitter(IEAS(easAddress));
        ERC1155Splitter erc1155Splitter = new ERC1155Splitter(IEAS(easAddress));
        NativeTokenSplitter nativeTokenSplitter = new NativeTokenSplitter(IEAS(easAddress));
        TokenBundleSplitter tokenBundleSplitter = new TokenBundleSplitter(IEAS(easAddress));
        TokenBundleSplitterUnvalidated tokenBundleSplitterUnvalidated = new TokenBundleSplitterUnvalidated(IEAS(easAddress));

        vm.stopBroadcast();

        console.log("\nSplitter Contracts:");
        console.log("ERC20Splitter:", address(erc20Splitter));
        console.log("ERC1155Splitter:", address(erc1155Splitter));
        console.log("NativeTokenSplitter:", address(nativeTokenSplitter));
        console.log("TokenBundleSplitter:", address(tokenBundleSplitter));
        console.log("TokenBundleSplitterUnvalidated:", address(tokenBundleSplitterUnvalidated));

        // Write JSON output
        string memory json = "splitterJson";
        vm.serializeAddress(json, "erc20Splitter", address(erc20Splitter));
        vm.serializeAddress(json, "erc1155Splitter", address(erc1155Splitter));
        vm.serializeAddress(json, "nativeTokenSplitter", address(nativeTokenSplitter));
        vm.serializeAddress(json, "tokenBundleSplitter", address(tokenBundleSplitter));
        string memory finalJson = vm.serializeAddress(json, "tokenBundleSplitterUnvalidated", address(tokenBundleSplitterUnvalidated));

        string memory filename = "./deployments/deployment_splitters_genlayer_bradbury.json";
        vm.writeJson(finalJson, filename);
        console.log("\nSaved to", filename);

        console.log("\nDeployment complete!");
    }
}
