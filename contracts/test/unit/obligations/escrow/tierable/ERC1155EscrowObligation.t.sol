// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {ERC1155EscrowObligation} from "@src/obligations/escrow/tierable/ERC1155EscrowObligation.sol";
import {BaseEscrowObligationTierable} from "@src/BaseEscrowObligationTierable.sol";
import {StringObligation} from "@src/obligations/payment/StringObligation.sol";
import {MockArbiter} from "../../fixtures/MockArbiter.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockERC1155 is ERC1155 {
    constructor() ERC1155("https://token.uri/{id}") {}
    function mint(address to, uint256 id, uint256 amount) public {
        _mint(to, id, amount, "");
    }
}

contract ERC1155EscrowObligationTierableTest is Test {
    ERC1155EscrowObligation public escrowObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC1155 public token;
    MockArbiter public mockArbiter;

    address internal buyer1;
    address internal buyer2;
    address internal seller;
    uint256 constant TOKEN_ID = 1;
    uint256 constant AMOUNT = 100;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrowObligation = new ERC1155EscrowObligation(eas, schemaRegistry);
        token = new MockERC1155();
        mockArbiter = new MockArbiter(true);

        buyer1 = makeAddr("buyer1");
        buyer2 = makeAddr("buyer2");
        seller = makeAddr("seller");

        token.mint(buyer1, TOKEN_ID, 1000);
        token.mint(buyer2, TOKEN_ID, 1000);
    }

    function testDoObligation() public {
        vm.startPrank(buyer1);
        token.setApprovalForAll(address(escrowObligation), true);

        bytes32 uid = escrowObligation.doObligation(
            ERC1155EscrowObligation.ObligationData({
                token: address(token),
                tokenId: TOKEN_ID,
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );
        vm.stopPrank();

        assertNotEq(uid, bytes32(0), "Attestation should be created");
        assertEq(token.balanceOf(address(escrowObligation), TOKEN_ID), AMOUNT, "Escrow should hold tokens");
    }

    function testTierableMultipleEscrowsOneFulfillment() public {
        // Create two escrows
        vm.startPrank(buyer1);
        token.setApprovalForAll(address(escrowObligation), true);
        bytes32 escrow1Uid = escrowObligation.doObligation(
            ERC1155EscrowObligation.ObligationData({
                token: address(token),
                tokenId: TOKEN_ID,
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );
        vm.stopPrank();

        vm.startPrank(buyer2);
        token.setApprovalForAll(address(escrowObligation), true);
        bytes32 escrow2Uid = escrowObligation.doObligation(
            ERC1155EscrowObligation.ObligationData({
                token: address(token),
                tokenId: TOKEN_ID,
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );
        vm.stopPrank();

        // Create single fulfillment
        StringObligation stringObligation = new StringObligation(eas, schemaRegistry);
        vm.prank(seller);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "fulfillment"}),
            bytes32(0)
        );

        // Collect both with same fulfillment
        vm.startPrank(seller);
        escrowObligation.collectEscrow(escrow1Uid, fulfillmentUid);
        escrowObligation.collectEscrow(escrow2Uid, fulfillmentUid);
        vm.stopPrank();

        assertEq(token.balanceOf(seller, TOKEN_ID), AMOUNT * 2, "Seller should have both payments");
        assertEq(token.balanceOf(address(escrowObligation), TOKEN_ID), 0, "Escrow should be empty");
    }

    function testReclaimExpired() public {
        vm.startPrank(buyer1);
        token.setApprovalForAll(address(escrowObligation), true);
        bytes32 uid = escrowObligation.doObligation(
            ERC1155EscrowObligation.ObligationData({
                token: address(token),
                tokenId: TOKEN_ID,
                amount: AMOUNT,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + 100)
        );
        vm.stopPrank();

        vm.warp(block.timestamp + 200);

        vm.prank(buyer1);
        escrowObligation.reclaimExpired(uid);

        assertEq(token.balanceOf(buyer1, TOKEN_ID), 1000, "Buyer should have tokens back");
    }
}
