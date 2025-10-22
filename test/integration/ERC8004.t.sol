// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC8004Arbiter} from "@src/arbiters/ERC8004Arbiter.sol";
import {ERC20EscrowObligation} from "@src/obligations/ERC20EscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mock ERC20 token for testing
contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MCK") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

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

/**
 * @title ERC8004IntegrationTest
 * @notice Integration test demonstrating the full flow of ERC8004Arbiter with ERC20EscrowObligation
 *
 * This test showcases how obligations compose naturally:
 * - One obligation (ERC20EscrowObligation) depends on another (StringObligation)
 * - The fulfillment is validated through an arbiter (ERC8004Arbiter)
 * - All obligations are thin wrappers over EAS attestations
 *
 * Flow:
 * 1. Alice deposits tokens into escrow, demanding ERC8004Arbiter validation by Charlie
 * 2. Bob creates a fulfillment obligation using StringObligation
 * 3. Bob requests validation for the fulfillment via ERC8004 ValidationRegistry
 * 4. Charlie provides validation response (score 0-100)
 * 5. Bob claims Alice's escrow (if validation meets minimum threshold)
 */
contract ERC8004IntegrationTest is Test {
    ERC8004Arbiter public arbiter;
    ERC20EscrowObligation public escrowObligation;
    StringObligation public fulfillmentObligation;
    IValidationRegistry public validationRegistry;
    IIdentityRegistry public identityRegistry;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public token;

    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address charlie = makeAddr("charlie"); // validator

    uint256 bobAgentId;
    uint256 constant ESCROW_AMOUNT = 100 * 10 ** 18;
    uint8 constant MIN_RESPONSE = 50;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        // Deploy EAS infrastructure
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        // Deploy our contracts
        arbiter = new ERC8004Arbiter();
        escrowObligation = new ERC20EscrowObligation(eas, schemaRegistry);
        fulfillmentObligation = new StringObligation(eas, schemaRegistry);
        token = new MockERC20();

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

        // Register Bob as an agent
        vm.prank(bob);
        bobAgentId = identityRegistry.register("ipfs://bob-agent");

        // Fund Alice with tokens
        token.mint(alice, 1000 * 10 ** 18);
    }

    function testSuccessfulValidationFlow() public {
        // === Step 1: Alice deposits tokens into escrow ===
        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);

        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: charlie,
                minResponse: MIN_RESPONSE
            });

        ERC20EscrowObligation.ObligationData
            memory obligationData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demandData),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 escrowUid = escrowObligation.doObligation(
            obligationData,
            expiration
        );
        vm.stopPrank();

        // Verify escrow was created
        assertEq(
            token.balanceOf(address(escrowObligation)),
            ESCROW_AMOUNT,
            "Escrow should hold tokens"
        );
        assertEq(
            token.balanceOf(alice),
            900 * 10 ** 18,
            "Alice should have sent tokens"
        );

        // === Step 2: Bob creates a fulfillment obligation ===
        vm.prank(bob);
        bytes32 fulfillmentUid = fulfillmentObligation.doObligation(
            StringObligation.ObligationData({item: "<fullfillment data>"}),
            escrowUid // Reference the escrow
        );

        // Verify fulfillment obligation was created
        Attestation memory fulfillmentAttestation = eas.getAttestation(
            fulfillmentUid
        );
        assertEq(
            fulfillmentAttestation.attester,
            address(fulfillmentObligation),
            "Fulfillment should be attested by StringObligation contract"
        );
        assertEq(
            fulfillmentAttestation.recipient,
            bob,
            "Bob should be the recipient"
        );
        assertEq(
            fulfillmentAttestation.refUID,
            escrowUid,
            "Fulfillment should reference escrow"
        );

        // === Step 3: Bob requests validation for the fulfillment ===
        vm.prank(bob);
        bytes32 requestHash = fulfillmentUid; // Use fulfillment UID as request hash
        validationRegistry.validationRequest(
            charlie,
            bobAgentId,
            "ipfs://validation-request",
            requestHash
        );

        // === Step 4: Charlie validates with a passing score ===
        vm.prank(charlie);
        validationRegistry.validationResponse(
            requestHash,
            75, // response >= minResponse (50)
            "ipfs://validation-response",
            bytes32(0),
            bytes32(0)
        );

        // Verify validation was recorded
        (
            address validatorAddress,
            uint256 agentId,
            uint8 response,
            ,

        ) = validationRegistry.getValidationStatus(requestHash);
        assertEq(validatorAddress, charlie, "Validator should be Charlie");
        assertEq(agentId, bobAgentId, "Agent should be Bob");
        assertEq(response, 75, "Response should be 75");

        // === Step 5: Bob claims Alice's escrow ===
        uint256 bobBalanceBefore = token.balanceOf(bob);

        vm.prank(bob);
        bool success = escrowObligation.collectEscrow(
            escrowUid,
            fulfillmentUid
        );

        assertTrue(success, "Escrow collection should succeed");

        // Verify tokens were transferred to Bob
        assertEq(
            token.balanceOf(bob),
            bobBalanceBefore + ESCROW_AMOUNT,
            "Bob should have received tokens"
        );
        assertEq(
            token.balanceOf(address(escrowObligation)),
            0,
            "Escrow should be empty"
        );
    }

    function testRevertWhen_ValidationBelowMinimum() public {
        // === Step 1: Alice deposits tokens into escrow ===
        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);

        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: charlie,
                minResponse: MIN_RESPONSE
            });

        ERC20EscrowObligation.ObligationData
            memory obligationData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demandData),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 escrowUid = escrowObligation.doObligation(
            obligationData,
            expiration
        );
        vm.stopPrank();

        // === Step 2: Bob creates a fulfillment obligation ===
        vm.prank(bob);
        bytes32 fulfillmentUid = fulfillmentObligation.doObligation(
            StringObligation.ObligationData({item: "<fulfillment data>"}),
            escrowUid
        );

        // === Step 3: Bob requests validation for the fulfillment ===
        vm.prank(bob);
        bytes32 requestHash = fulfillmentUid;
        validationRegistry.validationRequest(
            charlie,
            bobAgentId,
            "ipfs://validation-request",
            requestHash
        );

        // === Step 4: Charlie validates with a FAILING score ===
        vm.prank(charlie);
        validationRegistry.validationResponse(
            requestHash,
            30, // response < minResponse (50)
            "ipfs://validation-response-failed",
            bytes32(0),
            bytes32(0)
        );

        // Verify validation was recorded with low score
        (, , uint8 response, , ) = validationRegistry.getValidationStatus(
            requestHash
        );
        assertEq(response, 30, "Response should be 30");

        // === Step 5: Bob attempts to claim Alice's escrow (should fail) ===
        vm.prank(bob);
        vm.expectRevert(); // Should revert because validation score is too low
        escrowObligation.collectEscrow(escrowUid, fulfillmentUid);

        // Verify tokens remain in escrow
        assertEq(
            token.balanceOf(address(escrowObligation)),
            ESCROW_AMOUNT,
            "Escrow should still hold tokens"
        );
        assertEq(token.balanceOf(bob), 0, "Bob should not have received tokens");
    }

    function testExactMinimumValidationPasses() public {
        // === Step 1: Alice deposits tokens into escrow ===
        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);

        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: charlie,
                minResponse: MIN_RESPONSE
            });

        ERC20EscrowObligation.ObligationData
            memory obligationData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demandData),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 escrowUid = escrowObligation.doObligation(
            obligationData,
            expiration
        );
        vm.stopPrank();

        // === Step 2: Bob creates a fulfillment obligation ===
        vm.prank(bob);
        bytes32 fulfillmentUid = fulfillmentObligation.doObligation(
            StringObligation.ObligationData({item: "<fulfillment data>"}),
            escrowUid
        );

        // === Step 3: Bob requests validation ===
        vm.prank(bob);
        bytes32 requestHash = fulfillmentUid;
        validationRegistry.validationRequest(
            charlie,
            bobAgentId,
            "ipfs://validation-request",
            requestHash
        );

        // === Step 4: Charlie validates with EXACT minimum score ===
        vm.prank(charlie);
        validationRegistry.validationResponse(
            requestHash,
            MIN_RESPONSE, // response == minResponse (50)
            "ipfs://validation-response",
            bytes32(0),
            bytes32(0)
        );

        // === Step 5: Bob claims escrow (should succeed) ===
        uint256 bobBalanceBefore = token.balanceOf(bob);

        vm.prank(bob);
        bool success = escrowObligation.collectEscrow(
            escrowUid,
            fulfillmentUid
        );

        assertTrue(success, "Escrow collection should succeed");
        assertEq(
            token.balanceOf(bob),
            bobBalanceBefore + ESCROW_AMOUNT,
            "Bob should have received tokens"
        );
    }

    function testJustBelowMinimumValidationFails() public {
        // === Step 1: Alice deposits tokens into escrow ===
        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);

        ERC8004Arbiter.DemandData memory demandData = ERC8004Arbiter
            .DemandData({
                validationRegistry: address(validationRegistry),
                validatorAddress: charlie,
                minResponse: MIN_RESPONSE
            });

        ERC20EscrowObligation.ObligationData
            memory obligationData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demandData),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 escrowUid = escrowObligation.doObligation(
            obligationData,
            expiration
        );
        vm.stopPrank();

        // === Step 2: Bob creates a fulfillment obligation ===
        vm.prank(bob);
        bytes32 fulfillmentUid = fulfillmentObligation.doObligation(
            StringObligation.ObligationData({item: "<fulfillment data>"}),
            escrowUid
        );

        // === Step 3: Bob requests validation ===
        vm.prank(bob);
        bytes32 requestHash = fulfillmentUid;
        validationRegistry.validationRequest(
            charlie,
            bobAgentId,
            "ipfs://validation-request",
            requestHash
        );

        // === Step 4: Charlie validates with score just below minimum ===
        vm.prank(charlie);
        validationRegistry.validationResponse(
            requestHash,
            MIN_RESPONSE - 1, // response = 49, just below minResponse (50)
            "ipfs://validation-response-failed",
            bytes32(0),
            bytes32(0)
        );

        // === Step 5: Bob attempts to claim escrow (should fail) ===
        vm.prank(bob);
        vm.expectRevert(); // Should revert because validation score is below minimum
        escrowObligation.collectEscrow(escrowUid, fulfillmentUid);

        // Verify tokens remain in escrow
        assertEq(
            token.balanceOf(address(escrowObligation)),
            ESCROW_AMOUNT,
            "Escrow should still hold tokens"
        );
    }
}
