// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {ERC8004Arbiter} from "@src/arbiters/ERC8004Arbiter.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

// Interfaces for the ERC-8004 reference contracts
interface IIdentityRegistry {
    function register(
        string calldata tokenURI_
    ) external returns (uint256 agentId);

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

    function getValidationStatus(
        bytes32 requestHash
    )
        external
        view
        returns (
            address validatorAddress,
            uint256 agentId,
            uint8 response,
            bytes32 tag,
            uint256 lastUpdate
        );
}

contract ERC8004ArbiterTest is Test {
    ERC8004Arbiter arbiter;
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
        arbiter = new ERC8004Arbiter();

        // Deploy IdentityRegistry using precompiled bytecode from the ERC-8004 submodule
        address identityAddr = deployCode(
            "lib/trustless-agents-erc-ri/out/IdentityRegistry.sol/IdentityRegistry.json"
        );
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
        requestHash = keccak256(
            abi.encodePacked(
                validator,
                agentId,
                "ipfs://validation-request",
                block.timestamp,
                agentOwner
            )
        );
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

        bytes32 escrowUid = bytes32(uint256(54321));
        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: escrowUid,
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: validator,
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should return true since response (75) >= minResponse (50) and refUID matches
        assertTrue(arbiter.checkObligation(attestation, demand, escrowUid));
    }

    function testCheckObligationWrongRefUID() public {
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

        bytes32 wrongRefUID = bytes32(uint256(12345));
        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: wrongRefUID, // Wrong refUID
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: validator,
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        bytes32 expectedRefUID = bytes32(uint256(99999));

        // Should revert since refUID doesn't match the escrow
        vm.expectRevert(ERC8004Arbiter.FulfillmentMustReferenceEscrow.selector);
        arbiter.checkObligation(attestation, demand, expectedRefUID);
    }

    function testCheckObligationInsufficientResponse() public {
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

        bytes32 escrowUid = bytes32(uint256(54321));
        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: escrowUid,
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: validator,
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should revert since response (30) < minResponse (50)
        vm.expectRevert(ERC8004Arbiter.ResponseBelowMinimum.selector);
        arbiter.checkObligation(attestation, demand, escrowUid);
    }

    function testCheckObligationWrongValidator() public {
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

        bytes32 escrowUid = bytes32(uint256(54321));
        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: escrowUid,
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        // Create demand with different validator address
        address wrongValidator = address(0x999);
        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: wrongValidator,
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should revert since validator addresses don't match
        vm.expectRevert(ERC8004Arbiter.ValidatorMismatch.selector);
        arbiter.checkObligation(attestation, demand, escrowUid);
    }

    function testCheckObligationWrongRegistry() public {
        // Deploy a second ValidationRegistry
        address identityAddr = deployCode(
            "lib/trustless-agents-erc-ri/out/IdentityRegistry.sol/IdentityRegistry.json"
        );
        address wrongRegistry = deployCode(
            "lib/trustless-agents-erc-ri/out/ValidationRegistry.sol/ValidationRegistry.json",
            abi.encode(identityAddr)
        );

        // Create validation request in the REAL registry
        vm.prank(agentOwner);
        validationRegistry.validationRequest(
            validator,
            agentId,
            "ipfs://validation-request",
            requestHash
        );

        // Validator provides response in REAL registry
        vm.prank(validator);
        validationRegistry.validationResponse(
            requestHash,
            75,
            "",
            bytes32(0),
            bytes32(0)
        );

        bytes32 escrowUid = bytes32(uint256(54321));
        Attestation memory attestation = Attestation({
            uid: requestHash,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: escrowUid,
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        // Create demand with WRONG registry address (validation doesn't exist there)
        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: wrongRegistry,
                validatorAddress: validator,
                minResponse: 50
            });
        bytes memory demand = abi.encode(demandData);

        // Should revert since the wrong registry won't have the validation
        vm.expectRevert(ERC8004Arbiter.ValidationNotFound.selector);
        arbiter.checkObligation(attestation, demand, escrowUid);
    }
}
