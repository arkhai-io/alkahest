// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {ERC721EscrowObligation} from "@src/obligations/escrow/tierable/ERC721EscrowObligation.sol";
import {BaseEscrowObligationTierable} from "@src/BaseEscrowObligationTierable.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {MockArbiter} from "../../fixtures/MockArbiter.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockERC721 is ERC721 {
    uint256 private _nextTokenId;
    constructor() ERC721("Mock ERC721", "MERC721") {}
    function mint(address to) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        return tokenId;
    }
}

contract ERC721EscrowObligationTierableTest is Test {
    ERC721EscrowObligation public escrowObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC721 public token;
    MockArbiter public mockArbiter;

    address internal buyer1;
    address internal buyer2;
    address internal seller;
    uint256 internal tokenId1;
    uint256 internal tokenId2;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrowObligation = new ERC721EscrowObligation(eas, schemaRegistry);
        token = new MockERC721();
        mockArbiter = new MockArbiter(true);

        buyer1 = makeAddr("buyer1");
        buyer2 = makeAddr("buyer2");
        seller = makeAddr("seller");

        tokenId1 = token.mint(buyer1);
        tokenId2 = token.mint(buyer2);
    }

    function testDoObligation() public {
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), tokenId1);

        bytes32 uid = escrowObligation.doObligation(
            ERC721EscrowObligation.ObligationData({
                token: address(token),
                tokenId: tokenId1,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );
        vm.stopPrank();

        assertNotEq(uid, bytes32(0), "Attestation should be created");
        assertEq(token.ownerOf(tokenId1), address(escrowObligation), "Escrow should hold token");
    }

    function testTierableMultipleEscrowsOneFulfillment() public {
        // Create two escrows with different NFTs
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), tokenId1);
        bytes32 escrow1Uid = escrowObligation.doObligation(
            ERC721EscrowObligation.ObligationData({
                token: address(token),
                tokenId: tokenId1,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );
        vm.stopPrank();

        vm.startPrank(buyer2);
        token.approve(address(escrowObligation), tokenId2);
        bytes32 escrow2Uid = escrowObligation.doObligation(
            ERC721EscrowObligation.ObligationData({
                token: address(token),
                tokenId: tokenId2,
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
            StringObligation.ObligationData({item: "fulfillment", schema: bytes32(0)}),
            bytes32(0)
        );

        // Collect both escrows with same fulfillment
        vm.startPrank(seller);
        escrowObligation.collectEscrow(escrow1Uid, fulfillmentUid);
        escrowObligation.collectEscrow(escrow2Uid, fulfillmentUid);
        vm.stopPrank();

        assertEq(token.ownerOf(tokenId1), seller, "Seller should own first token");
        assertEq(token.ownerOf(tokenId2), seller, "Seller should own second token");
    }

    function testReclaimExpired() public {
        vm.startPrank(buyer1);
        token.approve(address(escrowObligation), tokenId1);
        bytes32 uid = escrowObligation.doObligation(
            ERC721EscrowObligation.ObligationData({
                token: address(token),
                tokenId: tokenId1,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + 100)
        );
        vm.stopPrank();

        vm.warp(block.timestamp + 200);

        vm.prank(buyer1);
        escrowObligation.reclaimExpired(uid);

        assertEq(token.ownerOf(tokenId1), buyer1, "Buyer should have token back");
    }
}
