// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {NativeTokenEscrowObligation} from "@src/obligations/escrow/tierable/NativeTokenEscrowObligation.sol";
import {BaseEscrowObligationTierable} from "@src/BaseEscrowObligationTierable.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {MockArbiter} from "../../fixtures/MockArbiter.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract NativeTokenEscrowObligationTierableTest is Test {
    NativeTokenEscrowObligation public escrowObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockArbiter public mockArbiter;

    address internal buyer1;
    address internal buyer2;
    address internal seller;
    uint256 constant AMOUNT = 1 ether;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrowObligation = new NativeTokenEscrowObligation(eas, schemaRegistry);
        mockArbiter = new MockArbiter(true);

        buyer1 = makeAddr("buyer1");
        buyer2 = makeAddr("buyer2");
        seller = makeAddr("seller");

        vm.deal(buyer1, 100 ether);
        vm.deal(buyer2, 100 ether);
    }

    function testDoObligation() public {
        bytes memory demand = abi.encode("test demand");
        NativeTokenEscrowObligation.ObligationData memory data = NativeTokenEscrowObligation
            .ObligationData({
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            });

        vm.prank(buyer1);
        bytes32 uid = escrowObligation.doObligation{value: AMOUNT}(data, uint64(block.timestamp + EXPIRATION_TIME));

        assertNotEq(uid, bytes32(0), "Attestation should be created");
        assertEq(address(escrowObligation).balance, AMOUNT, "Escrow should hold native tokens");
    }

    function testTierableMultipleEscrowsOneFulfillment() public {
        bytes memory demand = abi.encode("test demand");
        
        // Create two escrows
        vm.prank(buyer1);
        bytes32 payment1Uid = escrowObligation.doObligation{value: AMOUNT}(
            NativeTokenEscrowObligation.ObligationData({
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        vm.prank(buyer2);
        bytes32 payment2Uid = escrowObligation.doObligation{value: AMOUNT}(
            NativeTokenEscrowObligation.ObligationData({
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: demand
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        // Create single fulfillment
        StringObligation stringObligation = new StringObligation(eas, schemaRegistry);
        vm.prank(seller);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "fulfillment"}),
            bytes32(0)
        );

        uint256 sellerBalanceBefore = seller.balance;

        // Collect both with same fulfillment
        vm.startPrank(seller);
        escrowObligation.collectEscrow(payment1Uid, fulfillmentUid);
        escrowObligation.collectEscrow(payment2Uid, fulfillmentUid);
        vm.stopPrank();

        assertEq(seller.balance, sellerBalanceBefore + (AMOUNT * 2), "Seller should have received both payments");
        assertEq(address(escrowObligation).balance, 0, "Escrow should be empty");
    }

    function testReclaimExpired() public {
        vm.prank(buyer1);
        bytes32 uid = escrowObligation.doObligation{value: AMOUNT}(
            NativeTokenEscrowObligation.ObligationData({
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + 100)
        );

        vm.warp(block.timestamp + 200);

        uint256 buyerBalanceBefore = buyer1.balance;
        vm.prank(buyer1);
        escrowObligation.reclaimExpired(uid);

        assertEq(buyer1.balance, buyerBalanceBefore + AMOUNT, "Buyer should have received refund");
    }
}
