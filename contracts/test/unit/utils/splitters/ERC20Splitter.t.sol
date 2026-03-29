// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {ERC20Splitter} from "@src/utils/splitters/ERC20Splitter.sol";
import {ERC20EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC20EscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {BaseEscrowObligation} from "@src/BaseEscrowObligation.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MCK") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract ERC20SplitterTest is Test {
    ERC20Splitter public splitter;
    ERC20EscrowObligation public escrowObligation;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public token;

    address buyer = makeAddr("buyer");
    address oracle = makeAddr("oracle");
    address executor = makeAddr("executor");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address carol = makeAddr("carol");

    uint256 constant AMOUNT = 100 * 10 ** 18;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        splitter = new ERC20Splitter(eas);
        escrowObligation = new ERC20EscrowObligation(eas, schemaRegistry);
        stringObligation = new StringObligation(eas, schemaRegistry);
        token = new MockERC20();

        token.transfer(buyer, 1000 * 10 ** 18);
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
            ERC20Splitter.DemandData({oracle: oracle, data: bytes("")})
        );

        ERC20EscrowObligation.ObligationData
            memory data = ERC20EscrowObligation.ObligationData({
                token: address(token),
                amount: amount,
                arbiter: address(splitter),
                demand: demand
            });

        vm.startPrank(_buyer);
        token.approve(address(escrowObligation), amount);
        bytes32 uid = escrowObligation.doObligation(data, expiration);
        vm.stopPrank();

        return uid;
    }

    function _createFulfillmentViaSplitter(
        address _executor,
        bytes32 escrowUid
    ) internal returns (bytes32) {
        bytes memory obligationData = abi.encode(
            StringObligation.ObligationData({
                item: "fulfillment",
                schema: bytes32(0)
            })
        );

        vm.prank(_executor);
        return splitter.createFulfillment(
            address(stringObligation),
            obligationData,
            0,
            escrowUid
        );
    }

    // -----------------------------------------------------------------
    // arbitrate
    // -----------------------------------------------------------------

    function testArbitrate() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](2);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 60 * 10 ** 18});
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 40 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillmentUid, escrowUid));
        assertTrue(splitter.hasDecision(oracle, decisionKey));
    }

    function testArbitrateWithExecutorSentinel() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](2);
        splits[0] = ERC20Splitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 70 * 10 ** 18
        });
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 30 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        bytes32 decisionKey = keccak256(abi.encodePacked(fulfillmentUid, escrowUid));
        assertTrue(splitter.hasDecision(oracle, decisionKey));
    }

    function testArbitrateRevertsEmptySplits() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](0);

        vm.prank(oracle);
        vm.expectRevert(ERC20Splitter.EmptySplits.selector);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);
    }

    function testArbitrateRevertsZeroRecipient() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: address(0), amount: AMOUNT});

        vm.prank(oracle);
        vm.expectRevert(ERC20Splitter.ZeroRecipient.selector);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);
    }

    function testArbitrateRevertsInvalidTotal() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 50 * 10 ** 18});

        vm.prank(oracle);
        vm.expectRevert(abi.encodeWithSelector(ERC20Splitter.InvalidSplits.selector, AMOUNT, 50 * 10 ** 18));
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);
    }

    function testArbitrateOverwritesPreviousDecision() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits1 = new ERC20Splitter.Split[](1);
        splits1[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});
        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits1);

        ERC20Splitter.Split[] memory splits2 = new ERC20Splitter.Split[](1);
        splits2[0] = ERC20Splitter.Split({recipient: bob, amount: AMOUNT});
        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits2);

        ERC20Splitter.Split[] memory stored = splitter.getSplits(oracle, fulfillmentUid, escrowUid);
        assertEq(stored.length, 1);
        assertEq(stored[0].recipient, bob);
        assertEq(stored[0].amount, AMOUNT);
    }

    // -----------------------------------------------------------------
    // checkObligation
    // -----------------------------------------------------------------

    function testCheckObligationReturnsTrueWhenDecisionExists() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});
        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        bytes memory demand = abi.encode(ERC20Splitter.DemandData({oracle: oracle, data: bytes("")}));
        Attestation memory fulfillmentAttestation = eas.getAttestation(fulfillmentUid);
        assertTrue(splitter.checkObligation(fulfillmentAttestation, demand, escrowUid));
    }

    function testCheckObligationReturnsFalseWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        bytes memory demand = abi.encode(ERC20Splitter.DemandData({oracle: oracle, data: bytes("")}));
        Attestation memory fulfillmentAttestation = eas.getAttestation(fulfillmentUid);
        assertFalse(splitter.checkObligation(fulfillmentAttestation, demand, escrowUid));
    }

    function testCheckObligationRejectsDifferentFulfillment() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});
        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        bytes32 attackerFulfillmentUid = _createFulfillmentViaSplitter(alice, escrowUid);

        bytes memory demand = abi.encode(ERC20Splitter.DemandData({oracle: oracle, data: bytes("")}));
        Attestation memory attackerFulfillment = eas.getAttestation(attackerFulfillmentUid);
        assertFalse(splitter.checkObligation(attackerFulfillment, demand, escrowUid));
    }

    // -----------------------------------------------------------------
    // createFulfillment
    // -----------------------------------------------------------------

    function testCreateFulfillmentRecordsFulfiller() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        assertEq(splitter.fulfillers(fulfillmentUid), executor, "Fulfiller should be recorded");

        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        assertEq(fulfillment.recipient, address(splitter), "Splitter should be recipient");
        assertEq(fulfillment.refUID, escrowUid, "Should reference escrow");
    }

    // -----------------------------------------------------------------
    // collectAndDistribute
    // -----------------------------------------------------------------

    function testCollectAndDistribute() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](2);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 60 * 10 ** 18});
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 40 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        // Anyone can call collectAndDistribute
        vm.prank(carol);
        splitter.collectAndDistribute(address(escrowObligation), escrowUid, fulfillmentUid);

        assertEq(token.balanceOf(alice), 60 * 10 ** 18);
        assertEq(token.balanceOf(bob), 40 * 10 ** 18);
        assertEq(token.balanceOf(address(splitter)), 0);
    }

    function testCollectAndDistributeWithSentinel() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](3);
        splits[0] = ERC20Splitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 50 * 10 ** 18
        });
        splits[1] = ERC20Splitter.Split({recipient: alice, amount: 30 * 10 ** 18});
        splits[2] = ERC20Splitter.Split({recipient: bob, amount: 20 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        // A DIFFERENT address calls collectAndDistribute — sentinel still resolves to executor
        vm.prank(carol);
        splitter.collectAndDistribute(address(escrowObligation), escrowUid, fulfillmentUid);

        assertEq(token.balanceOf(executor), 50 * 10 ** 18, "Executor should receive sentinel share");
        assertEq(token.balanceOf(carol), 0, "Caller should NOT receive sentinel share");
        assertEq(token.balanceOf(alice), 30 * 10 ** 18);
        assertEq(token.balanceOf(bob), 20 * 10 ** 18);
    }

    function testCollectAndDistributeSentinelRevertsWithoutFulfiller() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));

        // Create fulfillment directly (NOT through splitter) — no fulfiller recorded.
        // Use doObligationRaw which sets recipient = msg.sender. We prank as splitter
        // so the fulfillment has the right recipient for escrow collection.
        bytes memory obligationData = abi.encode(
            StringObligation.ObligationData({item: "fulfillment", schema: bytes32(0)})
        );
        vm.prank(address(splitter));
        bytes32 fulfillmentUid = stringObligation.doObligationRaw(obligationData, 0, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: AMOUNT
        });

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        vm.expectRevert(abi.encodeWithSelector(ERC20Splitter.NoFulfillerRecorded.selector, fulfillmentUid));
        splitter.collectAndDistribute(address(escrowObligation), escrowUid, fulfillmentUid);
    }

    function testCollectAndDistributeSingleRecipient() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: carol, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        splitter.collectAndDistribute(address(escrowObligation), escrowUid, fulfillmentUid);
        assertEq(token.balanceOf(carol), AMOUNT);
    }

    function testCollectAndDistributeEmitsEvent() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        vm.expectEmit(true, true, true, true);
        emit ERC20Splitter.EscrowCollectedAndDistributed(
            escrowUid, fulfillmentUid, executor, address(token), splits
        );
        splitter.collectAndDistribute(address(escrowObligation), escrowUid, fulfillmentUid);
    }

    // -----------------------------------------------------------------
    // requestArbitration
    // -----------------------------------------------------------------

    function testRequestArbitrationAsRecipient() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        bytes memory demand = bytes("some demand");
        vm.prank(buyer);
        vm.expectEmit(true, true, true, true);
        emit ERC20Splitter.ArbitrationRequested(fulfillmentUid, escrowUid, oracle, demand);
        splitter.requestArbitration(fulfillmentUid, escrowUid, oracle, demand);
    }

    function testRequestArbitrationUnauthorized() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        vm.prank(carol);
        vm.expectRevert(ERC20Splitter.UnauthorizedArbitrationRequest.selector);
        splitter.requestArbitration(fulfillmentUid, escrowUid, oracle, bytes("demand"));
    }

    // -----------------------------------------------------------------
    // getSplits
    // -----------------------------------------------------------------

    function testGetSplits() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](3);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 50 * 10 ** 18});
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 30 * 10 ** 18});
        splits[2] = ERC20Splitter.Split({recipient: carol, amount: 20 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(fulfillmentUid, escrowUid, splits);

        ERC20Splitter.Split[] memory stored = splitter.getSplits(oracle, fulfillmentUid, escrowUid);
        assertEq(stored.length, 3);
        assertEq(stored[0].recipient, alice);
        assertEq(stored[0].amount, 50 * 10 ** 18);
    }

    function testGetSplitsReturnsEmptyWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow(buyer, AMOUNT, uint64(block.timestamp + EXPIRATION));
        bytes32 fulfillmentUid = _createFulfillmentViaSplitter(executor, escrowUid);

        ERC20Splitter.Split[] memory stored = splitter.getSplits(oracle, fulfillmentUid, escrowUid);
        assertEq(stored.length, 0);
    }
}
