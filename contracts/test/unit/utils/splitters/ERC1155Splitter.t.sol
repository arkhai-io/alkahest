// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {ERC1155Splitter} from "@src/utils/splitters/ERC1155Splitter.sol";
import {ERC1155EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC1155EscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {BaseEscrowObligation} from "@src/BaseEscrowObligation.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockERC1155 is ERC1155 {
    constructor() ERC1155("https://example.com/token/{id}.json") {}

    function mint(address to, uint256 id, uint256 amount) public {
        _mint(to, id, amount, "");
    }
}

contract ERC1155SplitterTest is Test {
    ERC1155Splitter public splitter;
    ERC1155EscrowObligation public escrowObligation;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC1155 public token;

    address buyer = makeAddr("buyer");
    address oracle = makeAddr("oracle");
    address executor = makeAddr("executor");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address carol = makeAddr("carol");

    uint256 constant TOKEN_ID = 1;
    uint256 constant AMOUNT = 100;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        splitter = new ERC1155Splitter(eas);
        escrowObligation = new ERC1155EscrowObligation(eas, schemaRegistry);
        stringObligation = new StringObligation(eas, schemaRegistry);
        token = new MockERC1155();

        token.mint(buyer, TOKEN_ID, 1000);

        vm.prank(buyer);
        token.setApprovalForAll(address(escrowObligation), true);
    }

    // -----------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------

    function _createEscrow(
        address _buyer,
        uint256 tokenId,
        uint256 amount,
        uint64 expiration
    ) internal returns (bytes32) {
        bytes memory demand = abi.encode(
            ERC1155Splitter.DemandData({oracle: oracle, data: bytes("")})
        );

        ERC1155EscrowObligation.ObligationData
            memory data = ERC1155EscrowObligation.ObligationData({
                token: address(token),
                tokenId: tokenId,
                amount: amount,
                arbiter: address(splitter),
                demand: demand
            });

        vm.prank(_buyer);
        bytes32 uid = escrowObligation.doObligation(data, expiration);

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
        ERC1155Splitter.EscrowObligationData memory escrowData = abi.decode(
            escrow.data,
            (ERC1155Splitter.EscrowObligationData)
        );
        return keccak256(abi.encodePacked(escrowUid, escrowData.demand));
    }

    // -----------------------------------------------------------------
    // arbitrate
    // -----------------------------------------------------------------

    function testArbitrate() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](2);
        splits[0] = ERC1155Splitter.Split({recipient: alice, amount: 60});
        splits[1] = ERC1155Splitter.Split({recipient: bob, amount: 40});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        assertTrue(
            splitter.hasDecision(oracle, _decisionKey(escrowUid)),
            "Decision should be recorded"
        );
    }

    function testArbitrateWithExecutorSentinel() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](2);
        splits[0] = ERC1155Splitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 70
        });
        splits[1] = ERC1155Splitter.Split({recipient: bob, amount: 30});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        assertTrue(
            splitter.hasDecision(oracle, _decisionKey(escrowUid)),
            "Decision with sentinel should be recorded"
        );
    }

    function testArbitrateRevertsEmptySplits() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](0);

        vm.prank(oracle);
        vm.expectRevert(ERC1155Splitter.EmptySplits.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateRevertsZeroRecipient() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](1);
        splits[0] = ERC1155Splitter.Split({
            recipient: address(0),
            amount: AMOUNT
        });

        vm.prank(oracle);
        vm.expectRevert(ERC1155Splitter.ZeroRecipient.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateRevertsInvalidTotal() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](1);
        splits[0] = ERC1155Splitter.Split({recipient: alice, amount: 50});

        vm.prank(oracle);
        vm.expectRevert(
            abi.encodeWithSelector(
                ERC1155Splitter.InvalidSplits.selector,
                AMOUNT,
                50
            )
        );
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateOverwritesPreviousDecision() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits1 = new ERC1155Splitter.Split[](1);
        splits1[0] = ERC1155Splitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits1);

        ERC1155Splitter.Split[]
            memory splits2 = new ERC1155Splitter.Split[](1);
        splits2[0] = ERC1155Splitter.Split({
            recipient: bob,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits2);

        ERC1155Splitter.Split[] memory stored = splitter.getSplits(
            oracle,
            escrowUid
        );
        assertEq(stored.length, 1);
        assertEq(stored[0].recipient, bob);
        assertEq(stored[0].amount, AMOUNT);
    }

    // -----------------------------------------------------------------
    // checkObligation
    // -----------------------------------------------------------------

    function testCheckObligationReturnsTrueWhenDecisionExists() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](1);
        splits[0] = ERC1155Splitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        bytes memory demand = abi.encode(
            ERC1155Splitter.DemandData({oracle: oracle, data: bytes("")})
        );

        Attestation memory dummyAttestation;
        assertTrue(
            splitter.checkObligation(dummyAttestation, demand, escrowUid)
        );
    }

    function testCheckObligationReturnsFalseWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes memory demand = abi.encode(
            ERC1155Splitter.DemandData({oracle: oracle, data: bytes("")})
        );

        Attestation memory dummyAttestation;
        assertFalse(
            splitter.checkObligation(dummyAttestation, demand, escrowUid)
        );
    }

    function testCheckObligationScopedByOracle() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](1);
        splits[0] = ERC1155Splitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        bytes memory demandWithDifferentOracle = abi.encode(
            ERC1155Splitter.DemandData({oracle: alice, data: bytes("")})
        );

        Attestation memory dummyAttestation;
        assertFalse(
            splitter.checkObligation(
                dummyAttestation,
                demandWithDifferentOracle,
                escrowUid
            )
        );
    }

    // -----------------------------------------------------------------
    // execute
    // -----------------------------------------------------------------

    function testExecuteProxiesCalls() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        assertEq(
            fulfillment.recipient,
            address(splitter),
            "Splitter should be the fulfillment recipient"
        );
        assertEq(
            fulfillment.refUID,
            escrowUid,
            "Fulfillment should reference the escrow"
        );
    }

    function testExecuteRevertsOnFailedCall() public {
        bytes memory badData = abi.encodeWithSignature("nonExistent()");

        vm.prank(executor);
        vm.expectRevert(
            abi.encodeWithSelector(
                ERC1155Splitter.ExecuteFailed.selector,
                address(splitter),
                badData
            )
        );
        splitter.execute(address(splitter), badData);
    }

    // -----------------------------------------------------------------
    // collectAndDistribute
    // -----------------------------------------------------------------

    function testCollectAndDistribute() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](2);
        splits[0] = ERC1155Splitter.Split({recipient: alice, amount: 60});
        splits[1] = ERC1155Splitter.Split({recipient: bob, amount: 40});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        assertEq(
            token.balanceOf(alice, TOKEN_ID),
            60,
            "Alice should receive 60 tokens"
        );
        assertEq(
            token.balanceOf(bob, TOKEN_ID),
            40,
            "Bob should receive 40 tokens"
        );
        assertEq(
            token.balanceOf(address(splitter), TOKEN_ID),
            0,
            "Splitter should have no remaining tokens"
        );
        assertEq(
            token.balanceOf(address(escrowObligation), TOKEN_ID),
            0,
            "Escrow should have no remaining tokens"
        );
    }

    function testCollectAndDistributeWithSentinel() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](3);
        splits[0] = ERC1155Splitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 50
        });
        splits[1] = ERC1155Splitter.Split({recipient: alice, amount: 30});
        splits[2] = ERC1155Splitter.Split({recipient: bob, amount: 20});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        assertEq(
            token.balanceOf(executor, TOKEN_ID),
            50,
            "Executor should receive sentinel share"
        );
        assertEq(
            token.balanceOf(alice, TOKEN_ID),
            30,
            "Alice should receive 30 tokens"
        );
        assertEq(
            token.balanceOf(bob, TOKEN_ID),
            20,
            "Bob should receive 20 tokens"
        );
    }

    function testCollectAndDistributeSingleRecipient() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](1);
        splits[0] = ERC1155Splitter.Split({
            recipient: carol,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        assertEq(
            token.balanceOf(carol, TOKEN_ID),
            AMOUNT,
            "Carol should receive all tokens"
        );
    }

    function testCollectAndDistributeEmitsEvent() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](1);
        splits[0] = ERC1155Splitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.expectEmit(true, true, true, true);
        emit ERC1155Splitter.EscrowCollectedAndDistributed(
            escrowUid,
            fulfillmentUid,
            executor,
            address(token),
            TOKEN_ID,
            splits
        );

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );
    }

    // -----------------------------------------------------------------
    // requestArbitration
    // -----------------------------------------------------------------

    function testRequestArbitrationAsRecipient() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes memory demand = bytes("some demand");

        vm.prank(buyer);
        vm.expectEmit(true, true, false, true);
        emit ERC1155Splitter.ArbitrationRequested(escrowUid, oracle, demand);
        splitter.requestArbitration(escrowUid, oracle, demand);
    }

    function testRequestArbitrationUnauthorized() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        vm.prank(carol);
        vm.expectRevert(
            ERC1155Splitter.UnauthorizedArbitrationRequest.selector
        );
        splitter.requestArbitration(escrowUid, oracle, bytes("demand"));
    }

    // -----------------------------------------------------------------
    // getSplits view helper
    // -----------------------------------------------------------------

    function testGetSplits() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[]
            memory splits = new ERC1155Splitter.Split[](3);
        splits[0] = ERC1155Splitter.Split({recipient: alice, amount: 50});
        splits[1] = ERC1155Splitter.Split({recipient: bob, amount: 30});
        splits[2] = ERC1155Splitter.Split({recipient: carol, amount: 20});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        ERC1155Splitter.Split[] memory stored = splitter.getSplits(
            oracle,
            escrowUid
        );

        assertEq(stored.length, 3);
        assertEq(stored[0].recipient, alice);
        assertEq(stored[0].amount, 50);
        assertEq(stored[1].recipient, bob);
        assertEq(stored[1].amount, 30);
        assertEq(stored[2].recipient, carol);
        assertEq(stored[2].amount, 20);
    }

    function testGetSplitsReturnsEmptyWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            TOKEN_ID,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC1155Splitter.Split[] memory stored = splitter.getSplits(
            oracle,
            escrowUid
        );

        assertEq(stored.length, 0);
    }
}
