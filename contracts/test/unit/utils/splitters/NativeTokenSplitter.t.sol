// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {NativeTokenSplitter} from "@src/utils/splitters/NativeTokenSplitter.sol";
import {NativeTokenEscrowObligation} from "@src/obligations/escrow/non-tierable/NativeTokenEscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
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

    function _createEscrow(address _buyer, uint256 amount, uint64 expiration) internal returns (bytes32) {
        bytes memory demand = abi.encode(NativeTokenSplitter.DemandData({oracle: oracle, data: bytes("")}));
        NativeTokenEscrowObligation.ObligationData memory data = NativeTokenEscrowObligation.ObligationData({
            amount: amount, arbiter: address(splitter), demand: demand
        });
        vm.prank(_buyer);
        return escrowObligation.doObligation{value: amount}(data, expiration);
    }

    function _createFulfillmentViaSplitter(address _executor, bytes32 escrowUid) internal returns (bytes32) {
        bytes memory obligationData = abi.encode(
            StringObligation.ObligationData({item: "fulfillment", schema: bytes32(0)})
        );
        vm.prank(_executor);
        return splitter.createFulfillment(address(stringObligation), obligationData, 0, escrowUid);
    }

    function testCreateFulfillmentRecordsFulfiller() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);
        assertEq(splitter.fulfillers(fulfillmentUid), executor);
        Attestation memory f = eas.getAttestation(fulfillmentUid);
        assertEq(f.recipient, address(splitter));
    }

    function testCollectAndDistribute() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        NativeTokenSplitter.Split[] memory splits = new NativeTokenSplitter.Split[](2);
        splits[0] = NativeTokenSplitter.Split({recipient: alice, amount: 0.6 ether});
        splits[1] = NativeTokenSplitter.Split({recipient: bob, amount: 0.4 ether});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        vm.prank(carol);
        splitter.collectAndDistribute(address(escrowObligation), escrowUid, fulfillmentUid);

        assertEq(alice.balance, 0.6 ether);
        assertEq(bob.balance, 0.4 ether);
        assertEq(address(splitter).balance, 0);
    }

    function testCollectAndDistributeWithSentinel() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        uint256 executorBalBefore = executor.balance;

        NativeTokenSplitter.Split[] memory splits = new NativeTokenSplitter.Split[](2);
        splits[0] = NativeTokenSplitter.Split({recipient: splitter.EXECUTOR_SENTINEL(), amount: 0.6 ether});
        splits[1] = NativeTokenSplitter.Split({recipient: bob, amount: 0.4 ether});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        // Different caller — sentinel resolves to executor
        vm.prank(carol);
        splitter.collectAndDistribute(address(escrowObligation), escrowUid, fulfillmentUid);

        assertEq(executor.balance, executorBalBefore + 0.6 ether, "Executor gets sentinel share");
        assertEq(bob.balance, 0.4 ether);
    }

    function testCheckObligationRejectsDifferentFulfillment() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        NativeTokenSplitter.Split[] memory splits = new NativeTokenSplitter.Split[](1);
        splits[0] = NativeTokenSplitter.Split({recipient: alice, amount: AMOUNT});
        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        bytes32 attackerFulfillmentUid = _createFulfillmentViaSplitter(alice, escrowUid);
        bytes memory demand = abi.encode(NativeTokenSplitter.DemandData({oracle: oracle, data: bytes("")}));

        Attestation memory attackerF = eas.getAttestation(attackerFulfillmentUid);
        assertFalse(splitter.checkObligation(attackerF, demand, escrowUid));
    }

    function testRequestArbitrationAsRecipient() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        vm.prank(buyer);
        vm.expectEmit(true, true, true, true);
        emit NativeTokenSplitter.ArbitrationRequested(fulfillmentUid, escrowUid, oracle, bytes("demand"));
        splitter.requestArbitration(fulfillmentUid, escrowUid, oracle, bytes("demand"));
    }

    function testRequestArbitrationUnauthorized() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        vm.prank(carol);
        vm.expectRevert(NativeTokenSplitter.UnauthorizedArbitrationRequest.selector);
        splitter.requestArbitration(fulfillmentUid, escrowUid, oracle, bytes("demand"));
    }

    function testReceiveETH() public {
        vm.deal(address(this), 1 ether);
        (bool success, ) = address(splitter).call{value: 0.5 ether}("");
        assertTrue(success);
        assertEq(address(splitter).balance, 0.5 ether);
    }
}
