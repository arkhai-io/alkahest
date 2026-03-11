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
        // Executor calls stringObligation.doObligation via splitter.execute
        // so splitter is msg.sender and becomes the attestation recipient
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

    // -----------------------------------------------------------------
    // arbitrate
    // -----------------------------------------------------------------

    function testArbitrate() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](2);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 60 * 10 ** 18});
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 40 * 10 ** 18});

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

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](2);
        splits[0] = ERC20Splitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 70 * 10 ** 18
        });
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 30 * 10 ** 18});

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

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](0);

        vm.prank(oracle);
        vm.expectRevert(ERC20Splitter.EmptySplits.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateRevertsZeroRecipient() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: address(0), amount: AMOUNT});

        vm.prank(oracle);
        vm.expectRevert(ERC20Splitter.ZeroRecipient.selector);
        splitter.arbitrate(escrowUid, splits);
    }

    function testArbitrateRevertsInvalidTotal() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 50 * 10 ** 18});

        vm.prank(oracle);
        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20Splitter.InvalidSplits.selector,
                AMOUNT,
                50 * 10 ** 18
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

        // First split: all to alice
        ERC20Splitter.Split[] memory splits1 = new ERC20Splitter.Split[](1);
        splits1[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits1);

        // Second split: all to bob (overwrites)
        ERC20Splitter.Split[] memory splits2 = new ERC20Splitter.Split[](1);
        splits2[0] = ERC20Splitter.Split({recipient: bob, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits2);

        ERC20Splitter.Split[] memory stored = splitter.getSplits(
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

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        // Build the demand bytes as they'd appear in the escrow
        bytes memory demand = abi.encode(
            ERC20Splitter.DemandData({oracle: oracle, data: bytes("")})
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
            ERC20Splitter.DemandData({oracle: oracle, data: bytes("")})
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

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        bytes memory demandWithDifferentOracle = abi.encode(
            ERC20Splitter.DemandData({oracle: alice, data: bytes("")})
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

        // Verify the fulfillment attestation has the splitter as recipient
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
        // Call a non-existent function on the splitter itself
        bytes memory badData = abi.encodeWithSignature("nonExistent()");

        vm.prank(executor);
        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20Splitter.ExecuteFailed.selector,
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

        // Oracle arbitrates
        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](2);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 60 * 10 ** 18});
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 40 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        // Executor collects and distributes
        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        // Verify distribution
        assertEq(token.balanceOf(alice), 60 * 10 ** 18, "Alice should receive 60");
        assertEq(token.balanceOf(bob), 40 * 10 ** 18, "Bob should receive 40");
        assertEq(
            token.balanceOf(address(splitter)),
            0,
            "Splitter should have no remaining tokens"
        );
        assertEq(
            token.balanceOf(address(escrowObligation)),
            0,
            "Escrow should have no remaining tokens"
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

        // Oracle uses EXECUTOR_SENTINEL for the executor's share
        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](3);
        splits[0] = ERC20Splitter.Split({
            recipient: splitter.EXECUTOR_SENTINEL(),
            amount: 50 * 10 ** 18
        });
        splits[1] = ERC20Splitter.Split({recipient: alice, amount: 30 * 10 ** 18});
        splits[2] = ERC20Splitter.Split({recipient: bob, amount: 20 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        // Executor collects and distributes
        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        // EXECUTOR_SENTINEL should resolve to executor
        assertEq(
            token.balanceOf(executor),
            50 * 10 ** 18,
            "Executor should receive sentinel share"
        );
        assertEq(token.balanceOf(alice), 30 * 10 ** 18, "Alice should receive 30");
        assertEq(token.balanceOf(bob), 20 * 10 ** 18, "Bob should receive 20");
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

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: carol, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.prank(executor);
        splitter.collectAndDistribute(
            address(escrowObligation),
            escrowUid,
            fulfillmentUid
        );

        assertEq(token.balanceOf(carol), AMOUNT, "Carol should receive all");
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

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](1);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: AMOUNT});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        vm.expectEmit(true, true, true, true);
        emit ERC20Splitter.EscrowCollectedAndDistributed(
            escrowUid,
            fulfillmentUid,
            executor,
            address(token),
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

    function testRequestArbitrationAsAttester() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        bytes memory demand = bytes("some demand");

        // The escrow attester is the escrowObligation contract itself
        // but the recipient is the buyer. Request as buyer.
        vm.prank(buyer);
        vm.expectEmit(true, true, false, true);
        emit ERC20Splitter.ArbitrationRequested(escrowUid, oracle, demand);
        splitter.requestArbitration(escrowUid, oracle, demand);
    }

    function testRequestArbitrationUnauthorized() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        vm.prank(carol);
        vm.expectRevert(ERC20Splitter.UnauthorizedArbitrationRequest.selector);
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

        ERC20Splitter.Split[] memory splits = new ERC20Splitter.Split[](3);
        splits[0] = ERC20Splitter.Split({recipient: alice, amount: 50 * 10 ** 18});
        splits[1] = ERC20Splitter.Split({recipient: bob, amount: 30 * 10 ** 18});
        splits[2] = ERC20Splitter.Split({recipient: carol, amount: 20 * 10 ** 18});

        vm.prank(oracle);
        splitter.arbitrate(escrowUid, splits);

        ERC20Splitter.Split[] memory stored = splitter.getSplits(
            oracle,
            escrowUid
        );

        assertEq(stored.length, 3);
        assertEq(stored[0].recipient, alice);
        assertEq(stored[0].amount, 50 * 10 ** 18);
        assertEq(stored[1].recipient, bob);
        assertEq(stored[1].amount, 30 * 10 ** 18);
        assertEq(stored[2].recipient, carol);
        assertEq(stored[2].amount, 20 * 10 ** 18);
    }

    function testGetSplitsReturnsEmptyWhenNoDecision() public {
        bytes32 escrowUid = _createEscrow(
            buyer,
            AMOUNT,
            uint64(block.timestamp + EXPIRATION)
        );

        ERC20Splitter.Split[] memory stored = splitter.getSplits(
            oracle,
            escrowUid
        );

        assertEq(stored.length, 0);
    }

    // -----------------------------------------------------------------
    // Internal helpers
    // -----------------------------------------------------------------

    function _decisionKey(bytes32 escrowUid) internal view returns (bytes32) {
        Attestation memory escrow = eas.getAttestation(escrowUid);
        ERC20Splitter.EscrowObligationData memory escrowData = abi.decode(
            escrow.data,
            (ERC20Splitter.EscrowObligationData)
        );
        return
            keccak256(abi.encodePacked(escrowUid, escrowData.demand));
    }
}
