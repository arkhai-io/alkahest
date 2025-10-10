// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {ValidationRegistryArbiter} from "@src/arbiters/ValidationRegistryArbiter.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

// Interfaces for the ERC-8004 reference contracts
interface IIdentityRegistry {
    function register(string calldata tokenURI_) external returns (uint256 agentId);
    function ownerOf(uint256 agentId) external view returns (address);
    function agentExists(uint256 agentId) external view returns (bool);
}

interface IValidationRegistry {
    function validationRequest(
        address validatorAddress,
        uint256 agentId,
        string calldata requestUri,
        bytes32 requestHash
    ) external;

    function validationResponse(
        bytes32 requestHash,
        uint8 response,
        string calldata responseUri,
        bytes32 responseHash,
        bytes32 tag
    ) external;

    function getValidationStatus(bytes32 requestHash) external view returns (
        address validatorAddress,
        uint256 agentId,
        uint8 response,
        bytes32 tag,
        uint256 lastUpdate
    );
}

contract ValidationRegistryArbiterTest is Test {
    ValidationRegistryArbiter arbiter;
    IValidationRegistry validationRegistry;
    IIdentityRegistry identityRegistry;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    address agentOwner = address(0x456);
    address validator = address(0x123);
    uint256 agentId;
    bytes32 requestHash;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();
        arbiter = new ValidationRegistryArbiter();

        // Deploy IdentityRegistry using precompiled bytecode from the ERC-8004 submodule
        address identityAddr = deployCode("lib/trustless-agents-erc-ri/out/IdentityRegistry.sol/IdentityRegistry.json");
        identityRegistry = IIdentityRegistry(identityAddr);

        // Deploy ValidationRegistry using precompiled bytecode
        address validationAddr = deployCode(
            "lib/trustless-agents-erc-ri/out/ValidationRegistry.sol/ValidationRegistry.json",
            abi.encode(identityAddr)
        );
        validationRegistry = IValidationRegistry(validationAddr);

        // Register an agent as the agentOwner
        vm.prank(agentOwner);
        agentId = identityRegistry.register("ipfs://test-agent");

        // Compute requestHash for tests to use
        requestHash = keccak256(abi.encodePacked(
            validator,
            agentId,
            "ipfs://validation-request",
            block.timestamp,
            agentOwner
        ));
    }

    function testConstructor() public {
        // Create a new arbiter to test constructor
        ValidationRegistryArbiter newArbiter = new ValidationRegistryArbiter();

        // Create a temporary validation request
        bytes32 tempRequestHash = keccak256(abi.encodePacked("temp"));

        // Verify basic functionality works
        Attestation memory attestation = Attestation({
            uid: tempRequestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should revert with ValidationNotFound since no validation response exists
        vm.expectRevert(ValidationRegistryArbiter.ValidationNotFound.selector);
        newArbiter.checkObligation(attestation, demand, bytes32(0));
    }

    function testCheckObligationSuccess() public {
        // Create validation request
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request",
            requestHash
        );

        // Validator provides response that meets minimum requirement
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash,
            75, // response >= minResponse (50)
            "",
            bytes32(0),
            bytes32(0)
        );

        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should return true since response (75) >= minResponse (50)
        assertTrue(arbiter.checkObligation(attestation, demand, bytes32(0)));
    }

    function testCheckObligationExactMinimum() public {
        // Create validation request
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request",
            requestHash
        );

        // Validator provides response that exactly meets minimum requirement
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash,
            50, // response == minResponse
            "",
            bytes32(0),
            bytes32(0)
        );

        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should return true since response (50) == minResponse (50)
        assertTrue(arbiter.checkObligation(attestation, demand, bytes32(0)));
    }

    function testCheckObligationBelowMinimum() public {
        // Create validation request
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request",
            requestHash
        );

        // Validator provides response below minimum requirement
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash,
            30, // response < minResponse (50)
            "",
            bytes32(0),
            bytes32(0)
        );

        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should revert since response (30) < minResponse (50)
        vm.expectRevert(ValidationRegistryArbiter.ResponseBelowMinimum.selector);
        arbiter.checkObligation(attestation, demand, bytes32(0));
    }

    function testCheckObligationValidationNotFound() public {
        // Don't create any validation request or response
        bytes32 nonExistentRequestHash = bytes32(uint256(999));

        Attestation memory attestation = Attestation({
            uid: nonExistentRequestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should revert since no validation response exists
        vm.expectRevert(ValidationRegistryArbiter.ValidationNotFound.selector);
        arbiter.checkObligation(attestation, demand, bytes32(0));
    }

    function testCheckObligationInvalidMinResponse() public {
        // Create validation request
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request",
            requestHash
        );

        // Validator provides response
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash,
            75,
            "",
            bytes32(0),
            bytes32(0)
        );

        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        // Create demand with invalid minResponse > 100
        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 101
            });
        bytes memory demand = abi.encode(demandData);

        // Should revert since minResponse > 100
        vm.expectRevert(ValidationRegistryArbiter.InvalidMinResponse.selector);
        arbiter.checkObligation(attestation, demand, bytes32(0));
    }

    function testCheckObligationWithZeroMinResponse() public {
        // Create validation request
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request",
            requestHash
        );

        // Validator provides response with 0
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash,
            0, // response == 0
            "",
            bytes32(0),
            bytes32(0)
        );

        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 0
            });
        bytes memory demand = abi.encode(demandData);

        // Should return true since response (0) >= minResponse (0)
        assertTrue(arbiter.checkObligation(attestation, demand, bytes32(0)));
    }

    function testCheckObligationWithMaxResponse() public {
        // Create validation request
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request",
            requestHash
        );

        // Validator provides response with 100 (max)
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash,
            100, // response == 100 (max)
            "",
            bytes32(0),
            bytes32(0)
        );

        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 100
            });
        bytes memory demand = abi.encode(demandData);

        // Should return true since response (100) == minResponse (100)
        assertTrue(arbiter.checkObligation(attestation, demand, bytes32(0)));
    }

    function testDecodeDemandData() public {
        // Test the helper function
        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 75
            });
        bytes memory encoded = abi.encode(demandData);

        ValidationRegistryArbiter.DemandData memory decoded = arbiter.decodeDemandData(encoded);

        assertEq(decoded.validationRegistry, address(validationRegistry));
        assertEq(decoded.minResponse, 75);
    }

    function testWithDifferentRequestHashes() public {
        // Create multiple validation requests with different request hashes
        bytes32 requestHash1 = keccak256(abi.encodePacked(
            validator,
            agentId,
            "ipfs://validation-request-1",
            block.timestamp,
            agentOwner
        ));
        bytes32 requestHash2 = keccak256(abi.encodePacked(
            validator,
            agentId,
            "ipfs://validation-request-2",
            block.timestamp + 1,
            agentOwner
        ));

        // Create first validation request
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request-1",
            requestHash1
        );

        // Create second validation request (advance time to ensure different hash)
        vm.warp(block.timestamp + 1);
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request-2",
            requestHash2
        );

        // Validator responds to first request with high score
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash1,
            80,
            "",
            bytes32(0),
            bytes32(0)
        );

        // Validator responds to second request with low score
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash2,
            40,
            "",
            bytes32(0),
            bytes32(0)
        );

        ValidationRegistryArbiter.DemandData memory demandData = ValidationRegistryArbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // First attestation should succeed (80 >= 50)
        Attestation memory attestation1 = Attestation({
            uid: requestHash1,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });
        assertTrue(arbiter.checkObligation(attestation1, demand, bytes32(0)));

        // Second attestation should fail (40 < 50)
        Attestation memory attestation2 = Attestation({
            uid: requestHash2,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });
        vm.expectRevert(ValidationRegistryArbiter.ResponseBelowMinimum.selector);
        arbiter.checkObligation(attestation2, demand, bytes32(0));
    }
}
