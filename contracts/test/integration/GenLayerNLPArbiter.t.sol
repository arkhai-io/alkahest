// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {GenLayerNLPArbiter} from "@src/arbiters/genlayer/GenLayerNLPArbiter.sol";
import {ERC20EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC20EscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {Attestation} from "@eas/Common.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock", "MCK") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

/// @title GenLayerNLPArbiter Integration Test
/// @notice Tests the full escrow flow:
///   1. Alice deposits ERC20 escrow with a natural language demand
///   2. Bob submits a StringObligation fulfillment
///   3. GenLayer coprocessor evaluates and calls arbitrate()
///   4. Bob collects the escrow
contract GenLayerNLPArbiterTest is Test {
    GenLayerNLPArbiter public arbiter;
    ERC20EscrowObligation public escrowObligation;
    StringObligation public stringObligation;
    MockToken public token;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    address public alice;
    address public bob;
    address public coprocessor;

    uint256 constant ESCROW_AMOUNT = 100 ether;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        // Deploy EAS infrastructure
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        // Deploy contracts
        arbiter = new GenLayerNLPArbiter(eas);
        escrowObligation = new ERC20EscrowObligation(eas, schemaRegistry);
        stringObligation = new StringObligation(eas, schemaRegistry);
        token = new MockToken();

        // Setup accounts
        alice = makeAddr("alice");
        bob = makeAddr("bob");
        coprocessor = makeAddr("coprocessor");

        // Fund alice with tokens
        token.mint(alice, ESCROW_AMOUNT);
    }

    /// @notice Full happy-path flow:
    ///   Alice escrows 100 tokens demanding "write a haiku about solidity"
    ///   Bob submits a haiku as StringObligation
    ///   Coprocessor approves via arbitrate()
    ///   Bob collects the escrow
    function testFullNLPEscrowFlow() public {
        string memory query = "The content must be a valid haiku (three lines of 5, 7, 5 syllables) about Solidity";

        // ── Step 1: Alice creates escrow with NLP demand ──
        GenLayerNLPArbiter.DemandData memory demand = GenLayerNLPArbiter
            .DemandData({coprocessor: coprocessor, query: query});

        ERC20EscrowObligation.ObligationData
            memory escrowData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demand),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);
        bytes32 escrowUid = escrowObligation.doObligation(
            escrowData,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();

        // Verify escrow: alice's tokens are locked
        assertEq(token.balanceOf(alice), 0);
        assertEq(token.balanceOf(address(escrowObligation)), ESCROW_AMOUNT);

        // ── Step 2: Bob submits a StringObligation fulfillment ──
        string memory haiku = "Smart contracts compile\n"
            "Immutable logic runs\n"
            "Blockchain never sleeps";

        vm.prank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: haiku,
                schema: bytes32(0)
            }),
            escrowUid // references the escrow
        );

        // ── Step 3: Coprocessor evaluates and approves ──
        // In production, the GenLayer intelligent contract would:
        //   1. Read the StringObligation data from EAS
        //   2. Evaluate via LLM whether the haiku satisfies the demand
        //   3. Call arbitrate() with the fulfillment UID
        // Note: arbitrate() uses the fulfillment UID because checkObligation()
        // receives the fulfillment attestation (obligation.uid = fulfillmentUid)
        vm.prank(coprocessor);
        arbiter.arbitrate(fulfillmentUid, query, true);

        // Verify the decision is stored
        bytes32 decisionKey = keccak256(
            abi.encodePacked(fulfillmentUid, query)
        );
        assertTrue(arbiter.decisions(coprocessor, decisionKey));

        // ── Step 4: Bob collects the escrow ──
        vm.prank(bob);
        bool success = escrowObligation.collectEscrow(
            escrowUid,
            fulfillmentUid
        );

        assertTrue(success);
        assertEq(token.balanceOf(bob), ESCROW_AMOUNT);
        assertEq(token.balanceOf(address(escrowObligation)), 0);
    }

    /// @notice Coprocessor rejects the fulfillment — Bob cannot collect
    function testRejectInvalidFulfillment() public {
        string memory query = "The content must be a limerick";

        GenLayerNLPArbiter.DemandData memory demand = GenLayerNLPArbiter
            .DemandData({coprocessor: coprocessor, query: query});

        ERC20EscrowObligation.ObligationData
            memory escrowData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demand),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);
        bytes32 escrowUid = escrowObligation.doObligation(
            escrowData,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();

        // Bob submits something that's NOT a limerick
        vm.prank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: "This is just a regular sentence, not a limerick.",
                schema: bytes32(0)
            }),
            escrowUid
        );

        // Coprocessor rejects (arbitrate with fulfillment UID)
        vm.prank(coprocessor);
        arbiter.arbitrate(fulfillmentUid, query, false);

        // Bob's collection attempt should fail
        vm.prank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(
                BaseEscrowObligation.InvalidFulfillment.selector
            )
        );
        escrowObligation.collectEscrow(escrowUid, fulfillmentUid);

        // Alice's tokens remain in escrow
        assertEq(token.balanceOf(address(escrowObligation)), ESCROW_AMOUNT);
    }

    /// @notice Bob cannot collect before coprocessor has made a decision
    function testCannotCollectWithoutArbitration() public {
        string memory query = "Write something creative";

        GenLayerNLPArbiter.DemandData memory demand = GenLayerNLPArbiter
            .DemandData({coprocessor: coprocessor, query: query});

        ERC20EscrowObligation.ObligationData
            memory escrowData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demand),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);
        bytes32 escrowUid = escrowObligation.doObligation(
            escrowData,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();

        vm.prank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: "My creative content",
                schema: bytes32(0)
            }),
            escrowUid
        );

        // No arbitration yet — default mapping value is false
        vm.prank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(
                BaseEscrowObligation.InvalidFulfillment.selector
            )
        );
        escrowObligation.collectEscrow(escrowUid, fulfillmentUid);
    }

    /// @notice requestArbitration emits the right event with obligation data
    function testRequestArbitrationEmitsEvent() public {
        string memory query = "Translate to French";

        GenLayerNLPArbiter.DemandData memory demand = GenLayerNLPArbiter
            .DemandData({coprocessor: coprocessor, query: query});

        ERC20EscrowObligation.ObligationData
            memory escrowData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demand),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);
        bytes32 escrowUid = escrowObligation.doObligation(
            escrowData,
            uint64(block.timestamp + EXPIRATION)
        );

        // Alice requests arbitration — event should contain obligation data
        // for the coprocessor to read
        vm.expectEmit(true, true, false, true);
        Attestation memory escrowAttestation = eas.getAttestation(escrowUid);
        emit GenLayerNLPArbiter.ArbitrationRequested(
            escrowUid,
            coprocessor,
            query,
            escrowAttestation.data
        );

        arbiter.requestArbitration(escrowUid, coprocessor, query);
        vm.stopPrank();
    }

    /// @notice Wrong coprocessor address — decision from another address is ignored
    function testWrongCoprocessorCannotApprove() public {
        string memory query = "Some demand";
        address wrongCoprocessor = makeAddr("imposter");

        GenLayerNLPArbiter.DemandData memory demand = GenLayerNLPArbiter
            .DemandData({coprocessor: coprocessor, query: query});

        ERC20EscrowObligation.ObligationData
            memory escrowData = ERC20EscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demand),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);
        bytes32 escrowUid = escrowObligation.doObligation(
            escrowData,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();

        vm.prank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: "content",
                schema: bytes32(0)
            }),
            escrowUid
        );

        // Wrong coprocessor approves — but demand specifies the real one
        vm.prank(wrongCoprocessor);
        arbiter.arbitrate(fulfillmentUid, query, true);

        // Bob still can't collect because the demand expects `coprocessor`, not `wrongCoprocessor`
        vm.prank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(
                BaseEscrowObligation.InvalidFulfillment.selector
            )
        );
        escrowObligation.collectEscrow(escrowUid, fulfillmentUid);
    }
}

import {BaseEscrowObligation} from "@src/BaseEscrowObligation.sol";
