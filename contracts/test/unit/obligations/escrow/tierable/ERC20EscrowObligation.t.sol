// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {ERC20EscrowObligation} from "@src/obligations/escrow/tierable/ERC20EscrowObligation.sol";
import {BaseEscrowObligationTierable} from "@src/BaseEscrowObligationTierable.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {MockArbiter} from "../../fixtures/MockArbiter.sol";
import {IEAS, Attestation, AttestationRequestData, AttestationRequest} from "@eas/IEAS.sol";
import {ISchemaRegistry, SchemaRecord} from "@eas/ISchemaRegistry.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {EASDeployer} from "@test/utils/EASDeployer.sol";

// Mock ERC20 token for testing
contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MCK") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract ERC20EscrowObligationTierableTest is Test {
    ERC20EscrowObligation public escrowObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public token;
    MockArbiter public mockArbiter;
    MockArbiter public rejectingArbiter;

    address internal buyer1;
    address internal buyer2;
    address internal seller;
    uint256 constant AMOUNT = 100 * 10 ** 18;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrowObligation = new ERC20EscrowObligation(eas, schemaRegistry);
        token = new MockERC20();
        mockArbiter = new MockArbiter(true);
        rejectingArbiter = new MockArbiter(false);

        buyer1 = makeAddr("buyer1");
        buyer2 = makeAddr("buyer2");
        seller = makeAddr("seller");

        // Fund the buyer accounts
        token.transfer(buyer1, 1000 * 10 ** 18);
        token.transfer(buyer2, 1000 * 10 ** 18);
    }

    function testConstructor() public view {
        // Verify contract was initialized correctly
        bytes32 schemaId = escrowObligation.ATTESTATION_SCHEMA();
        assertNotEq(schemaId, bytes32(0), "Schema should be registered");

        // Verify schema details
        SchemaRecord memory schema = escrowObligation.getSchema();
        assertEq(schema.uid, schemaId, "Schema UID should match");
        assertEq(
            schema.schema,
            "address arbiter, bytes demand, address token, uint256 amount",
            "Schema string should match"
        );
    }

    function testDoObligation() public {
        // Approve tokens first
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), AMOUNT);

        bytes memory demand = abi.encode("test demand");
        ERC20EscrowObligation.ObligationData memory data = ERC20EscrowObligation
            .ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 uid = escrowObligation.doObligation(data, expiration);
        vm.stopPrank();

        // Verify attestation exists
        assertNotEq(uid, bytes32(0), "Attestation should be created");

        // Verify attestation details
        Attestation memory attestation = eas.getAttestation(uid);
        assertEq(
            attestation.schema,
            escrowObligation.ATTESTATION_SCHEMA(),
            "Schema should match"
        );
        assertEq(attestation.recipient, buyer1, "Recipient should be the buyer");

        // Verify token transfer to escrow
        assertEq(
            token.balanceOf(address(escrowObligation)),
            AMOUNT,
            "Escrow should hold tokens"
        );
        assertEq(
            token.balanceOf(buyer1),
            900 * 10 ** 18,
            "Buyer should have sent tokens"
        );
    }

    function testCollectEscrow() public {
        // Setup: create an escrow
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), AMOUNT);

        bytes memory demand = abi.encode("test demand");
        ERC20EscrowObligation.ObligationData memory data = ERC20EscrowObligation
            .ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 paymentUid = escrowObligation.doObligation(data, expiration);
        vm.stopPrank();

        // Create a fulfillment attestation using a separate obligation
        StringObligation stringObligation = new StringObligation(
            eas,
            schemaRegistry
        );

        vm.prank(seller);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "fulfillment data"}),
            bytes32(0) // Note: NOT referencing paymentUid - this is the key difference for tierable
        );

        // Collect payment
        vm.prank(seller);
        bool success = escrowObligation.collectEscrow(
            paymentUid,
            fulfillmentUid
        );

        assertTrue(success, "Payment collection should succeed");

        // Verify token transfer to seller
        assertEq(
            token.balanceOf(seller),
            AMOUNT,
            "Seller should have received tokens"
        );
        assertEq(
            token.balanceOf(address(escrowObligation)),
            0,
            "Escrow should have zero tokens left"
        );
    }

    function testTierableMultipleEscrowsOneFulfillment() public {
        // This test demonstrates the key tierable feature:
        // Multiple escrows can be collected with a single fulfillment

        // Create two escrows from different buyers
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), AMOUNT);
        bytes memory demand = abi.encode("test demand");
        ERC20EscrowObligation.ObligationData memory data1 = ERC20EscrowObligation
            .ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            });
        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 payment1Uid = escrowObligation.doObligation(data1, expiration);
        vm.stopPrank();

        vm.startPrank(buyer2);
        token.approve(address(escrowObligation), AMOUNT);
        ERC20EscrowObligation.ObligationData memory data2 = ERC20EscrowObligation
            .ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            });
        bytes32 payment2Uid = escrowObligation.doObligation(data2, expiration);
        vm.stopPrank();

        // Create a single fulfillment attestation
        StringObligation stringObligation = new StringObligation(
            eas,
            schemaRegistry
        );

        vm.prank(seller);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "fulfillment data"}),
            bytes32(0) // Not referencing any specific payment
        );

        // Collect both payments with the same fulfillment
        vm.startPrank(seller);
        bool success1 = escrowObligation.collectEscrow(
            payment1Uid,
            fulfillmentUid
        );
        assertTrue(success1, "First payment collection should succeed");

        bool success2 = escrowObligation.collectEscrow(
            payment2Uid,
            fulfillmentUid
        );
        assertTrue(success2, "Second payment collection should succeed");
        vm.stopPrank();

        // Verify both payments were collected
        assertEq(
            token.balanceOf(seller),
            AMOUNT * 2,
            "Seller should have received tokens from both escrows"
        );
        assertEq(
            token.balanceOf(address(escrowObligation)),
            0,
            "Escrow should have zero tokens left"
        );
    }

    function testCollectEscrowWithRejectedFulfillment() public {
        // Setup: create an escrow with rejecting arbiter
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), AMOUNT);

        bytes memory demand = abi.encode("test demand");
        ERC20EscrowObligation.ObligationData memory data = ERC20EscrowObligation
            .ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(rejectingArbiter),
                demand: demand
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);
        bytes32 paymentUid = escrowObligation.doObligation(data, expiration);
        vm.stopPrank();

        // Create a fulfillment attestation
        StringObligation stringObligation = new StringObligation(
            eas,
            schemaRegistry
        );

        vm.prank(seller);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "fulfillment data"}),
            bytes32(0)
        );

        // Try to collect payment, should revert with InvalidFulfillment
        vm.prank(seller);
        vm.expectRevert(BaseEscrowObligationTierable.InvalidFulfillment.selector);
        escrowObligation.collectEscrow(paymentUid, fulfillmentUid);
    }

    function testReclaimExpired() public {
        // Setup: create an escrow
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), AMOUNT);

        bytes memory demand = abi.encode("test demand");
        ERC20EscrowObligation.ObligationData memory data = ERC20EscrowObligation
            .ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            });

        uint64 expiration = uint64(block.timestamp + 100);
        bytes32 paymentUid = escrowObligation.doObligation(data, expiration);
        vm.stopPrank();

        // Attempt to collect before expiration (should fail)
        vm.prank(buyer1);
        vm.expectRevert(BaseEscrowObligationTierable.UnauthorizedCall.selector);
        escrowObligation.reclaimExpired(paymentUid);

        // Fast forward past expiration time
        vm.warp(block.timestamp + 200);

        // Collect expired funds
        vm.prank(buyer1);
        bool success = escrowObligation.reclaimExpired(paymentUid);

        assertTrue(success, "Expired fund collection should succeed");

        // Verify token transfer back to buyer
        assertEq(
            token.balanceOf(buyer1),
            1000 * 10 ** 18,
            "Buyer should have received tokens back"
        );
        assertEq(
            token.balanceOf(address(escrowObligation)),
            0,
            "Escrow should have zero tokens left"
        );
    }

    function testCheckObligation() public {
        // Create obligation data
        ERC20EscrowObligation.ObligationData
            memory paymentData = ERC20EscrowObligation.ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: abi.encode("specific demand")
            });

        // Use the obligation contract to create a valid attestation
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), AMOUNT);
        bytes32 attestationId = escrowObligation.doObligation(
            paymentData,
            uint64(block.timestamp + EXPIRATION_TIME)
        );
        vm.stopPrank();

        Attestation memory attestation = eas.getAttestation(attestationId);

        // Test exact match
        ERC20EscrowObligation.ObligationData
            memory exactDemand = ERC20EscrowObligation.ObligationData({
                token: address(token),
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: abi.encode("specific demand")
            });

        bool exactMatch = escrowObligation.checkObligation(
            attestation,
            abi.encode(exactDemand),
            bytes32(0)
        );
        assertTrue(exactMatch, "Should match exact demand");

        // Test lower amount demand (should succeed)
        ERC20EscrowObligation.ObligationData
            memory lowerDemand = ERC20EscrowObligation.ObligationData({
                token: address(token),
                amount: AMOUNT - 50 * 10 ** 18,
                arbiter: address(mockArbiter),
                demand: abi.encode("specific demand")
            });

        bool lowerMatch = escrowObligation.checkObligation(
            attestation,
            abi.encode(lowerDemand),
            bytes32(0)
        );
        assertTrue(lowerMatch, "Should match lower amount demand");

        // Test higher amount demand (should fail)
        ERC20EscrowObligation.ObligationData
            memory higherDemand = ERC20EscrowObligation.ObligationData({
                token: address(token),
                amount: AMOUNT + 50 * 10 ** 18,
                arbiter: address(mockArbiter),
                demand: abi.encode("specific demand")
            });

        bool higherMatch = escrowObligation.checkObligation(
            attestation,
            abi.encode(higherDemand),
            bytes32(0)
        );
        assertFalse(higherMatch, "Should not match higher amount demand");
    }

    function testInvalidEscrowReverts() public {
        uint256 largeAmount = 2000 * 10 ** 18; // More than buyer has

        // Approve tokens first
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), largeAmount);

        // Try to create escrow with insufficient balance
        bytes memory demand = abi.encode("test demand");
        ERC20EscrowObligation.ObligationData memory data = ERC20EscrowObligation
            .ObligationData({
                token: address(token),
                amount: largeAmount,
                arbiter: address(mockArbiter),
                demand: demand
            });

        uint64 expiration = uint64(block.timestamp + EXPIRATION_TIME);

        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20EscrowObligation.ERC20TransferFailed.selector,
                address(token),
                buyer1,
                address(escrowObligation),
                largeAmount
            )
        );
        escrowObligation.doObligation(data, expiration);
        vm.stopPrank();
    }
}
