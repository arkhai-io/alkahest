// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {TokenBundleEscrowObligation} from "@src/obligations/escrow/tierable/TokenBundleEscrowObligation.sol";
import {BaseEscrowObligationTierable} from "@src/BaseEscrowObligationTierable.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {MockArbiter} from "../../fixtures/MockArbiter.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock", "MCK") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }
}

contract MockERC721 is ERC721 {
    uint256 private _nextTokenId;
    constructor() ERC721("Mock721", "M721") {}
    function mint(address to) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        return tokenId;
    }
}

contract MockERC1155 is ERC1155 {
    constructor() ERC1155("") {}
    function mint(address to, uint256 id, uint256 amount) public {
        _mint(to, id, amount, "");
    }
}

contract TokenBundleEscrowObligationTierableTest is Test {
    TokenBundleEscrowObligation public escrowObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public erc20;
    MockERC721 public erc721;
    MockERC1155 public erc1155;
    MockArbiter public mockArbiter;

    address internal buyer1;
    address internal buyer2;
    address internal seller;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrowObligation = new TokenBundleEscrowObligation(eas, schemaRegistry);
        erc20 = new MockERC20();
        erc721 = new MockERC721();
        erc1155 = new MockERC1155();
        mockArbiter = new MockArbiter(true);

        buyer1 = makeAddr("buyer1");
        buyer2 = makeAddr("buyer2");
        seller = makeAddr("seller");

        vm.deal(buyer1, 100 ether);
        vm.deal(buyer2, 100 ether);
        erc20.transfer(buyer1, 1000 * 10 ** 18);
        erc20.transfer(buyer2, 1000 * 10 ** 18);
    }

    function testTierableMultipleEscrowsOneFulfillment() public {
        // Buyer1 creates bundle escrow
        vm.startPrank(buyer1);
        uint256 nft1 = erc721.mint(buyer1);
        erc1155.mint(buyer1, 1, 100);

        erc20.approve(address(escrowObligation), 100 * 10 ** 18);
        erc721.approve(address(escrowObligation), nft1);
        erc1155.setApprovalForAll(address(escrowObligation), true);

        address[] memory erc20Tokens = new address[](1);
        erc20Tokens[0] = address(erc20);
        uint256[] memory erc20Amounts = new uint256[](1);
        erc20Amounts[0] = 100 * 10 ** 18;

        address[] memory erc721Tokens = new address[](1);
        erc721Tokens[0] = address(erc721);
        uint256[] memory erc721TokenIds = new uint256[](1);
        erc721TokenIds[0] = nft1;

        address[] memory erc1155Tokens = new address[](1);
        erc1155Tokens[0] = address(erc1155);
        uint256[] memory erc1155TokenIds = new uint256[](1);
        erc1155TokenIds[0] = 1;
        uint256[] memory erc1155Amounts = new uint256[](1);
        erc1155Amounts[0] = 50;

        bytes32 escrow1Uid = escrowObligation.doObligation{value: 1 ether}(
            TokenBundleEscrowObligation.ObligationData({
                arbiter: address(mockArbiter),
                demand: abi.encode("test"),
                nativeAmount: 1 ether,
                erc20Tokens: erc20Tokens,
                erc20Amounts: erc20Amounts,
                erc721Tokens: erc721Tokens,
                erc721TokenIds: erc721TokenIds,
                erc1155Tokens: erc1155Tokens,
                erc1155TokenIds: erc1155TokenIds,
                erc1155Amounts: erc1155Amounts
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );
        vm.stopPrank();

        // Buyer2 creates similar bundle escrow
        vm.startPrank(buyer2);
        uint256 nft2 = erc721.mint(buyer2);
        erc1155.mint(buyer2, 1, 100);

        erc20.approve(address(escrowObligation), 100 * 10 ** 18);
        erc721.approve(address(escrowObligation), nft2);
        erc1155.setApprovalForAll(address(escrowObligation), true);

        erc721TokenIds[0] = nft2;

        bytes32 escrow2Uid = escrowObligation.doObligation{value: 1 ether}(
            TokenBundleEscrowObligation.ObligationData({
                arbiter: address(mockArbiter),
                demand: abi.encode("test"),
                nativeAmount: 1 ether,
                erc20Tokens: erc20Tokens,
                erc20Amounts: erc20Amounts,
                erc721Tokens: erc721Tokens,
                erc721TokenIds: erc721TokenIds,
                erc1155Tokens: erc1155Tokens,
                erc1155TokenIds: erc1155TokenIds,
                erc1155Amounts: erc1155Amounts
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

        uint256 sellerEthBefore = seller.balance;

        // Collect both with same fulfillment
        vm.startPrank(seller);
        escrowObligation.collectEscrow(escrow1Uid, fulfillmentUid);
        escrowObligation.collectEscrow(escrow2Uid, fulfillmentUid);
        vm.stopPrank();

        // Verify all assets transferred
        assertEq(seller.balance, sellerEthBefore + 2 ether, "Seller should have native tokens");
        assertEq(erc20.balanceOf(seller), 200 * 10 ** 18, "Seller should have ERC20");
        assertEq(erc721.ownerOf(nft1), seller, "Seller should own first NFT");
        assertEq(erc721.ownerOf(nft2), seller, "Seller should own second NFT");
        assertEq(erc1155.balanceOf(seller, 1), 100, "Seller should have ERC1155");
    }
}
