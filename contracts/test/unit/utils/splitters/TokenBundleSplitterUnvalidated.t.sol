// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {TokenBundleSplitterUnvalidated} from "@src/utils/splitters/TokenBundleSplitterUnvalidated.sol";
import {TokenBundleSplitterBase} from "@src/utils/splitters/TokenBundleSplitterBase.sol";
import {TokenBundleEscrowObligation} from "@src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockERC20U is ERC20 {
    constructor() ERC20("Mock Token", "MCK") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract MockERC721U is ERC721 {
    constructor() ERC721("Mock NFT", "MNFT") {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}

contract MockERC1155U is ERC1155 {
    constructor() ERC1155("https://example.com/{id}.json") {}

    function mint(address to, uint256 id, uint256 amount) public {
        _mint(to, id, amount, "");
    }
}

contract TokenBundleSplitterUnvalidatedTest is Test {
    TokenBundleSplitterUnvalidated public splitter;
    TokenBundleEscrowObligation public escrowObligation;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    MockERC20U public token1;
    MockERC20U public token2;
    MockERC721U public nft;
    MockERC1155U public multiToken;

    address buyer = makeAddr("buyer");
    address oracle = makeAddr("oracle");
    address executor = makeAddr("executor");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address carol = makeAddr("carol");

    uint256 constant NATIVE_AMOUNT = 1 ether;
    uint256 constant TOKEN1_AMOUNT = 100e18;
    uint256 constant TOKEN2_AMOUNT = 50e18;
    uint256 constant NFT_ID_1 = 1;
    uint256 constant NFT_ID_2 = 2;
    uint256 constant MULTI_ID = 10;
    uint256 constant MULTI_AMOUNT = 100;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        splitter = new TokenBundleSplitterUnvalidated(eas);
        escrowObligation = new TokenBundleEscrowObligation(
            eas,
            schemaRegistry
        );
        stringObligation = new StringObligation(eas, schemaRegistry);

        token1 = new MockERC20U();
        token2 = new MockERC20U();
        nft = new MockERC721U();
        multiToken = new MockERC1155U();

        // Mint assets to buyer
        token1.mint(buyer, TOKEN1_AMOUNT * 10);
        token2.mint(buyer, TOKEN2_AMOUNT * 10);
        nft.mint(buyer, NFT_ID_1);
        nft.mint(buyer, NFT_ID_2);
        multiToken.mint(buyer, MULTI_ID, MULTI_AMOUNT * 10);
        vm.deal(buyer, 10 ether);
        vm.deal(executor, 1 ether);

        // Approve escrow for buyer
        vm.startPrank(buyer);
        token1.approve(address(escrowObligation), type(uint256).max);
        token2.approve(address(escrowObligation), type(uint256).max);
        nft.setApprovalForAll(address(escrowObligation), true);
        multiToken.setApprovalForAll(address(escrowObligation), true);
        vm.stopPrank();
    }

    // -----------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------

    function _bundleData()
        internal
        view
        returns (TokenBundleEscrowObligation.ObligationData memory)
    {
        bytes memory demand = abi.encode(
            TokenBundleSplitterBase.DemandData({
                oracle: oracle,
                data: bytes("")
            })
        );

        address[] memory erc20Tokens = new address[](2);
        erc20Tokens[0] = address(token1);
        erc20Tokens[1] = address(token2);
        uint256[] memory erc20Amounts = new uint256[](2);
        erc20Amounts[0] = TOKEN1_AMOUNT;
        erc20Amounts[1] = TOKEN2_AMOUNT;

        address[] memory erc721Tokens = new address[](2);
        erc721Tokens[0] = address(nft);
        erc721Tokens[1] = address(nft);
        uint256[] memory erc721TokenIds = new uint256[](2);
        erc721TokenIds[0] = NFT_ID_1;
        erc721TokenIds[1] = NFT_ID_2;

        address[] memory erc1155Tokens = new address[](1);
        erc1155Tokens[0] = address(multiToken);
        uint256[] memory erc1155TokenIds = new uint256[](1);
        erc1155TokenIds[0] = MULTI_ID;
        uint256[] memory erc1155Amounts = new uint256[](1);
        erc1155Amounts[0] = MULTI_AMOUNT;

        return
            TokenBundleEscrowObligation.ObligationData({
                arbiter: address(splitter),
                demand: demand,
                nativeAmount: NATIVE_AMOUNT,
                erc20Tokens: erc20Tokens,
                erc20Amounts: erc20Amounts,
                erc721Tokens: erc721Tokens,
                erc721TokenIds: erc721TokenIds,
                erc1155Tokens: erc1155Tokens,
                erc1155TokenIds: erc1155TokenIds,
                erc1155Amounts: erc1155Amounts
            });
    }

    function _createEscrow() internal returns (bytes32) {
        TokenBundleEscrowObligation.ObligationData memory data = _bundleData();

        vm.prank(buyer);
        bytes32 uid = escrowObligation.doObligation{value: NATIVE_AMOUNT}(
            data,
            uint64(block.timestamp + EXPIRATION)
        );
        return uid;
    }

    function _createFulfillmentViaSplitter(
        address _executor,
        bytes32 escrowUid
    ) internal returns (bytes32) {
        bytes memory callData = abi.encodeCall(
            stringObligation.doObligation,
            (
                StringObligation.ObligationData({
                    item: "fulfillment",
                    schema: bytes32(0)
                }),
                escrowUid
            )
        );

        vm.prank(_executor);
        bytes memory result = splitter.execute(
            address(stringObligation),
            callData
        );

        return abi.decode(result, (bytes32));
    }

    function _decisionKey(bytes32 escrowUid) internal view returns (bytes32) {
        Attestation memory escrow = eas.getAttestation(escrowUid);
        TokenBundleSplitterBase.EscrowObligationData memory escrowData = abi
            .decode(
                escrow.data,
                (TokenBundleSplitterBase.EscrowObligationData)
            );
        return keccak256(abi.encodePacked(escrowUid, escrowData.demand));
    }

    function _twoWaySplit()
        internal
        view
        returns (TokenBundleSplitterBase.BundleSplit[] memory)
    {
        TokenBundleSplitterBase.BundleSplit[]
            memory splits = new TokenBundleSplitterBase.BundleSplit[](2);

        uint256[] memory aliceErc20 = new uint256[](2);
        aliceErc20[0] = 60e18;
        aliceErc20[1] = 20e18;
        uint256[] memory aliceErc721 = new uint256[](1);
        aliceErc721[0] = 0;
        uint256[] memory aliceErc1155 = new uint256[](1);
        aliceErc1155[0] = 60;

        splits[0] = TokenBundleSplitterBase.BundleSplit({
            recipient: alice,
            nativeAmount: 0.6 ether,
            erc20Amounts: aliceErc20,
            erc721Indices: aliceErc721,
            erc1155Amounts: aliceErc1155
        });

        uint256[] memory bobErc20 = new uint256[](2);
        bobErc20[0] = 40e18;
        bobErc20[1] = 30e18;
        uint256[] memory bobErc721 = new uint256[](1);
        bobErc721[0] = 1;
        uint256[] memory bobErc1155 = new uint256[](1);
        bobErc1155[0] = 40;

        splits[1] = TokenBundleSplitterBase.BundleSplit({
            recipient: bob,
            nativeAmount: 0.4 ether,
            erc20Amounts: bobErc20,
            erc721Indices: bobErc721,
            erc1155Amounts: bobErc1155
        });

        return splits;
    }

    // -----------------------------------------------------------------
    // arbitrate — unvalidated accepts any splits
    // -----------------------------------------------------------------

    function testArbitrateValid() public {
        bytes32 escrowUid = _createEscrow();

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, _twoWaySplit());

        assertTrue(splitter.hasDecision(oracle, _decisionKey(escrowUid)));
    }

    function testArbitrateRevertsEmptySplits() public {
        bytes32 escrowUid = _createEscrow();

        TokenBundleSplitterBase.BundleSplit[]
            memory splits = new TokenBundleSplitterBase.BundleSplit[](0);

        vm.prank(oracle);
        vm.expectRevert(TokenBundleSplitterBase.EmptySplits.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateRevertsZeroRecipient() public {
        bytes32 escrowUid = _createEscrow();

        TokenBundleSplitterBase.BundleSplit[] memory splits = _twoWaySplit();
        splits[0].recipient = address(0);

        vm.prank(oracle);
        vm.expectRevert(TokenBundleSplitterBase.ZeroRecipient.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateAcceptsInvalidTotals() public {
        bytes32 escrowUid = _createEscrow();

        // Mismatched native total — unvalidated should accept
        TokenBundleSplitterBase.BundleSplit[] memory splits = _twoWaySplit();
        splits[0].nativeAmount = 0.5 ether; // total 0.9 ether != 1 ether

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits); // should NOT revert

        assertTrue(splitter.hasDecision(oracle, _decisionKey(escrowUid)));
    }

    function testArbitrateAcceptsMismatchedArrayLengths() public {
        bytes32 escrowUid = _createEscrow();

        TokenBundleSplitterBase.BundleSplit[] memory splits = _twoWaySplit();
        // Give alice 0 ERC20 amounts (mismatched with escrow's 2 tokens)
        splits[0].erc20Amounts = new uint256[](0);

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits); // should NOT revert

        assertTrue(splitter.hasDecision(oracle, _decisionKey(escrowUid)));
    }

    function testArbitrateOverwritesPreviousDecision() public {
        bytes32 escrowUid = _createEscrow();

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, _twoWaySplit());

        // Overwrite: single recipient
        TokenBundleSplitterBase.BundleSplit[]
            memory splits2 = new TokenBundleSplitterBase.BundleSplit[](1);
        uint256[] memory allErc20 = new uint256[](2);
        allErc20[0] = TOKEN1_AMOUNT;
        allErc20[1] = TOKEN2_AMOUNT;
        uint256[] memory allErc721 = new uint256[](2);
        allErc721[0] = 0;
        allErc721[1] = 1;
        uint256[] memory allErc1155 = new uint256[](1);
        allErc1155[0] = MULTI_AMOUNT;

        splits2[0] = TokenBundleSplitterBase.BundleSplit({
            recipient: carol,
            nativeAmount: NATIVE_AMOUNT,
            erc20Amounts: allErc20,
            erc721Indices: allErc721,
            erc1155Amounts: allErc1155
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits2);

        TokenBundleSplitterBase.BundleSplit[] memory stored = splitter
            .getSplits(oracle, escrowUid);
        assertEq(stored.length, 1);
        assertEq(stored[0].recipient, carol);
    }

    // -----------------------------------------------------------------
    // checkObligation
    // -----------------------------------------------------------------

    function testCheckObligationReturnsTrueWhenDecisionExists() public {
        bytes32 escrowUid = _createEscrow();

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, _twoWaySplit());

        bytes memory demand = abi.encode(
            TokenBundleSplitterBase.DemandData({
                oracle: oracle,
                data: bytes("")
            })
        );

        Attestation memory dummyAttestation;
        assertTrue(
            splitter.checkObligation(dummyAttestation, demand, escrowUid)
        );
    }

    function testCheckObligationReturnsFalseWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow();

        bytes memory demand = abi.encode(
            TokenBundleSplitterBase.DemandData({
                oracle: oracle,
                data: bytes("")
            })
        );

        Attestation memory dummyAttestation;
        assertFalse(
            splitter.checkObligation(dummyAttestation, demand, escrowUid)
        );
    }

    // -----------------------------------------------------------------
    // execute
    // -----------------------------------------------------------------

    function testExecuteProxiesCalls() public {
        bytes32 escrowUid = _createEscrow();

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        assertEq(fulfillment.recipient, address(splitter));
        assertEq(fulfillment.refUID, escrowUid);
    }

    // -----------------------------------------------------------------
    // collectAndDistribute
    // -----------------------------------------------------------------

    function testCollectAndDistribute() public {
        bytes32 escrowUid = _createEscrow();
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, _twoWaySplit());

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        // Native
        assertEq(alice.balance, 0.6 ether);
        assertEq(bob.balance, 0.4 ether);

        // ERC20
        assertEq(token1.balanceOf(alice), 60e18);
        assertEq(token1.balanceOf(bob), 40e18);
        assertEq(token2.balanceOf(alice), 20e18);
        assertEq(token2.balanceOf(bob), 30e18);

        // ERC721
        assertEq(nft.ownerOf(NFT_ID_1), alice);
        assertEq(nft.ownerOf(NFT_ID_2), bob);

        // ERC1155
        assertEq(multiToken.balanceOf(alice, MULTI_ID), 60);
        assertEq(multiToken.balanceOf(bob, MULTI_ID), 40);

        // Splitter empty
        assertEq(address(splitter).balance, 0);
        assertEq(token1.balanceOf(address(splitter)), 0);
    }

    function testCollectAndDistributeWithSentinel() public {
        bytes32 escrowUid = _createEscrow();
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        TokenBundleSplitterBase.BundleSplit[] memory splits = _twoWaySplit();
        splits[0].recipient = splitter.EXECUTOR_SENTINEL();

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        uint256 executorBalBefore = executor.balance;

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        assertEq(executor.balance, executorBalBefore + 0.6 ether);
        assertEq(token1.balanceOf(executor), 60e18);
        assertEq(nft.ownerOf(NFT_ID_1), executor);
        assertEq(multiToken.balanceOf(executor, MULTI_ID), 60);
    }

    // -----------------------------------------------------------------
    // requestArbitration
    // -----------------------------------------------------------------

    function testRequestArbitrationAsRecipient() public {
        bytes32 escrowUid = _createEscrow();

        vm.prank(buyer);
        vm.expectEmit(true, true, false, true);
        emit TokenBundleSplitterBase.ArbitrationRequested(
            escrowUid,
            oracle,
            bytes("demand")
        );
        splitter.requestArbitration(escrowUid, oracle, bytes("demand"));
    }

    function testRequestArbitrationUnauthorized() public {
        bytes32 escrowUid = _createEscrow();

        vm.prank(carol);
        vm.expectRevert(
            TokenBundleSplitterBase.UnauthorizedArbitrationRequest.selector
        );
        splitter.requestArbitration(escrowUid, oracle, bytes("demand"));
    }

    // -----------------------------------------------------------------
    // getSplits
    // -----------------------------------------------------------------

    function testGetSplits() public {
        bytes32 escrowUid = _createEscrow();

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, _twoWaySplit());

        TokenBundleSplitterBase.BundleSplit[] memory stored = splitter
            .getSplits(oracle, escrowUid);

        assertEq(stored.length, 2);
        assertEq(stored[0].recipient, alice);
        assertEq(stored[0].nativeAmount, 0.6 ether);
        assertEq(stored[1].recipient, bob);
        assertEq(stored[1].nativeAmount, 0.4 ether);
    }

    function testGetSplitsReturnsEmptyWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow();

        TokenBundleSplitterBase.BundleSplit[] memory stored = splitter
            .getSplits(oracle, escrowUid);

        assertEq(stored.length, 0);
    }
}
