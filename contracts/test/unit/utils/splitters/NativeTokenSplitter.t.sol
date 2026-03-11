// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {NativeTokenSplitter} from "@src/utils/splitters/NativeTokenSplitter.sol";
import {NativeTokenEscrowObligation} from "@src/obligations/escrow/non-tierable/NativeTokenEscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {BaseEscrowObligation} from "@src/BaseEscrowObligation.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";

import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract NativeTokenSplitterTest is Test {
    NativeTokenSplitter public splitter;
    NativeTokenEscrowObligation public escrowObligation;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    address buyer = makeAddr("buyer");
    address oracle = makeAddr("oracle");
    address executor = makeAddr("executor");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address carol = makeAddr("carol");

    uint256 constant AMOUNT = 1 ether;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        splitter = new NativeTokenSplitter(eas);
        escrowObligation = new NativeTokenEscrowObligation(eas, schemaRegistry);
        stringObligation = new StringObligation(eas, schemaRegistry);

        vm.deal(buyer, 10 ether);
        vm.deal(executor, 1 ether);
    }

    // -----------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------

    function _createEscrow(
        address _buyer,
        uint256 amount,
        uint64 expiration
    ) internal returns (bytes32) {
        bytes memory demand = abi.encode(
            NativeTokenSplitter.DemandData({oracle: oracle, data: bytes("")})
        );

        NativeTokenEscrowObligation.ObligationData
            memory data = NativeTokenEscrowObligation.ObligationData({
                amount: amount,
                arbiter: address(splitter),
                demand: demand
            });

        vm.prank(_buyer);
        bytes32 uid = escrowObligation.doObligation{value: amount}(
            data,
            expiration
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
        NativeTokenSplitter.EscrowObligationData memory escrowData = abi
            .decode(escrow.data, (NativeTokenSplitter.EscrowObligationData));
        return keccak256(abi.encodePacked(escrowUid, escrowData.demand));
    }

    // -----------------------------------------------------------------
    // arbitrate
    // -----------------------------------------------------------------

    function testArbitrate() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](2);
        splits[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: 0.6 ether
        });
        splits[1] = NativeTokenSplitter.Split({
            recipient: bob,
            amount: 0.4 ether
        });

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
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](2);
        splits[0] = NativeTokenSplitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 0.7 ether
        });
        splits[1] = NativeTokenSplitter.Split({
            recipient: bob,
            amount: 0.3 ether
        });

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
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](0);

        vm.prank(oracle);
        vm.expectRevert(NativeTokenSplitter.EmptySplits.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateRevertsZeroRecipient() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](1);
        splits[0] = NativeTokenSplitter.Split({
            recipient: address(0),
            amount: AMOUNT
        });

        vm.prank(oracle);
        vm.expectRevert(NativeTokenSplitter.ZeroRecipient.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateRevertsInvalidTotal() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](1);
        splits[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: 0.5 ether
        });

        vm.prank(oracle);
        vm.expectRevert(
            abi.encodeWithSelector(
                NativeTokenSplitter.InvalidSplits.selector,
                AMOUNT,
                0.5 ether
            )
        );
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateOverwritesPreviousDecision() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits1 = new NativeTokenSplitter.Split[](1);
        splits1[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits1);

        NativeTokenSplitter.Split[]
            memory splits2 = new NativeTokenSplitter.Split[](1);
        splits2[0] = NativeTokenSplitter.Split({
            recipient: bob,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits2);

        NativeTokenSplitter.Split[] memory stored = splitter.getSplits(
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
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](1);
        splits[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        bytes memory demand = abi.encode(
            NativeTokenSplitter.DemandData({oracle: oracle, data: bytes("")})
        );

        Attestation memory dummyAttestation;
        assertTrue(
            splitter.checkObligation(dummyAttestation, demand, escrowUid)
        );
    }

    function testCheckObligationReturnsFalseWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes memory demand = abi.encode(
            NativeTokenSplitter.DemandData({oracle: oracle, data: bytes("")})
        );

        Attestation memory dummyAttestation;
        assertFalse(
            splitter.checkObligation(dummyAttestation, demand, escrowUid)
        );
    }

    function testCheckObligationScopedByOracle() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](1);
        splits[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        bytes memory demandWithDifferentOracle = abi.encode(
            NativeTokenSplitter.DemandData({oracle: alice, data: bytes("")})
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
                NativeTokenSplitter.ExecuteFailed.selector,
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
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](2);
        splits[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: 0.6 ether
        });
        splits[1] = NativeTokenSplitter.Split({
            recipient: bob,
            amount: 0.4 ether
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        assertEq(alice.balance, 0.6 ether, "Alice should receive 0.6 ETH");
        assertEq(bob.balance, 0.4 ether, "Bob should receive 0.4 ETH");
        assertEq(
            address(splitter).balance,
            0,
            "Splitter should have no remaining ETH"
        );
        assertEq(
            address(escrowObligation).balance,
            0,
            "Escrow should have no remaining ETH"
        );
    }

    function testCollectAndDistributeWithSentinel() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        uint256 executorBalanceBefore = executor.balance;

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](3);
        splits[0] = NativeTokenSplitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 0.5 ether
        });
        splits[1] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: 0.3 ether
        });
        splits[2] = NativeTokenSplitter.Split({
            recipient: bob,
            amount: 0.2 ether
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
            executor.balance,
            executorBalanceBefore + 0.5 ether,
            "Executor should receive sentinel share"
        );
        assertEq(alice.balance, 0.3 ether, "Alice should receive 0.3 ETH");
        assertEq(bob.balance, 0.2 ether, "Bob should receive 0.2 ETH");
    }

    function testCollectAndDistributeSingleRecipient() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](1);
        splits[0] = NativeTokenSplitter.Split({
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

        assertEq(carol.balance, AMOUNT, "Carol should receive all ETH");
    }

    function testCollectAndDistributeEmitsEvent() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(
            executor,
            escrowUid
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](1);
        splits[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.expectEmit(true, true, true, true);
        emit NativeTokenSplitter.EscrowCollectedAndDistributed(
            escrowUid,
            fulfillmentUid,
            executor,
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
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes memory demand = bytes("some demand");

        vm.prank(buyer);
        vm.expectEmit(true, true, false, true);
        emit NativeTokenSplitter.ArbitrationRequested(
            escrowUid,
            oracle,
            demand
        );
        splitter.requestArbitration(escrowUid, oracle, demand);
    }

    function testRequestArbitrationUnauthorized() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        vm.prank(carol);
        vm.expectRevert(
            NativeTokenSplitter.UnauthorizedArbitrationRequest.selector
        );
        splitter.requestArbitration(escrowUid, oracle, bytes("demand"));
    }

    // -----------------------------------------------------------------
    // getSplits view helper
    // -----------------------------------------------------------------

    function testGetSplits() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[]
            memory splits = new NativeTokenSplitter.Split[](3);
        splits[0] = NativeTokenSplitter.Split({
            recipient: alice,
            amount: 0.5 ether
        });
        splits[1] = NativeTokenSplitter.Split({
            recipient: bob,
            amount: 0.3 ether
        });
        splits[2] = NativeTokenSplitter.Split({
            recipient: carol,
            amount: 0.2 ether
        });

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        NativeTokenSplitter.Split[] memory stored = splitter.getSplits(
            oracle,
            escrowUid
        );

        assertEq(stored.length, 3);
        assertEq(stored[0].recipient, alice);
        assertEq(stored[0].amount, 0.5 ether);
        assertEq(stored[1].recipient, bob);
        assertEq(stored[1].amount, 0.3 ether);
        assertEq(stored[2].recipient, carol);
        assertEq(stored[2].amount, 0.2 ether);
    }

    function testGetSplitsReturnsEmptyWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        NativeTokenSplitter.Split[] memory stored = splitter.getSplits(
            oracle,
            escrowUid
        );

        assertEq(stored.length, 0);
    }

    // -----------------------------------------------------------------
    // receive
    // -----------------------------------------------------------------

    function testReceiveETH() public {
        vm.deal(address(this), 1 ether);
        (bool success, ) = address(splitter).call{value: 0.5 ether}("");
        assertTrue(success, "Splitter should accept ETH");
        assertEq(address(splitter).balance, 0.5 ether);
    }
}
