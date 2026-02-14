// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";

interface IUpgradeable {
    function upgradeToAndCall(
        address newImplementation,
        bytes memory data
    ) external payable;
}

contract ERC8004Deployer is Test {
    string constant ARTIFACTS_DIR =
        "lib/erc-8004-contracts/artifacts/contracts/";

    /// @notice Deploy an upgradeable ERC-8004 contract behind an ERC1967 proxy
    /// @dev Uses the two-step pattern: MinimalUUPS (v1 initializer) -> upgrade to real impl (v2 reinitializer)
    /// @param contractName The contract file name (e.g., "IdentityRegistryUpgradeable")
    /// @param v2InitData The encoded reinitializer(2) call data for the real implementation
    /// @return proxy The deployed proxy address
    function deployUpgradeable(
        string memory contractName,
        bytes memory v2InitData
    ) public returns (address proxy) {
        // Step 1: Deploy the MinimalUUPS implementation (v1)
        bytes memory minimalBytecode = _readBytecode(
            "HardhatMinimalUUPS",
            "HardhatMinimalUUPS"
        );
        address minimalImpl;
        assembly {
            minimalImpl := create(
                0,
                add(minimalBytecode, 0x20),
                mload(minimalBytecode)
            )
        }
        require(minimalImpl != address(0), "MinimalUUPS deployment failed");

        // Step 2: Deploy proxy with MinimalUUPS.initialize(address(0)) as v1 init
        // This sets msg.sender as owner and initializes the proxy at version 1
        bytes memory proxyBytecode = _readBytecode(
            "ERC1967Proxy",
            "ERC1967Proxy"
        );
        bytes memory v1InitData = abi.encodeWithSignature(
            "initialize(address)",
            address(0)
        );
        bytes memory proxyCreationCode = abi.encodePacked(
            proxyBytecode,
            abi.encode(minimalImpl, v1InitData)
        );
        assembly {
            proxy := create(
                0,
                add(proxyCreationCode, 0x20),
                mload(proxyCreationCode)
            )
        }
        require(proxy != address(0), "Proxy deployment failed");

        // Step 3: Deploy the real implementation
        bytes memory realBytecode = _readBytecode(contractName, contractName);
        address realImpl;
        assembly {
            realImpl := create(
                0,
                add(realBytecode, 0x20),
                mload(realBytecode)
            )
        }
        require(realImpl != address(0), "Real implementation deployment failed");

        // Step 4: Upgrade proxy to real implementation with v2 reinitializer
        IUpgradeable(proxy).upgradeToAndCall(realImpl, v2InitData);
    }

    function _readBytecode(
        string memory fileName,
        string memory contractName
    ) internal view returns (bytes memory) {
        string memory path = string.concat(
            ARTIFACTS_DIR,
            fileName,
            ".sol/",
            contractName,
            ".json"
        );
        string memory artifact = vm.readFile(path);
        return vm.parseJsonBytes(artifact, ".bytecode");
    }
}
