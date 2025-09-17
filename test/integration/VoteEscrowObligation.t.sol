// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {VoteEscrowObligation} from "../../src/obligations/example/VoteEscrowObligation.sol";
import {MockVotingContract} from "../utils/MockVotingContract.sol";
import {StringObligation} from "../../src/obligations/StringObligation.sol";
import {TrivialArbiter} from "../../src/arbiters/TrivialArbiter.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {Attestation} from "@eas/Common.sol";
import {EAS} from "@eas/EAS.sol";
import {SchemaRegistry} from "@eas/SchemaRegistry.sol";

contract VoteEscrowObligationTest is Test {
    // Contracts
    VoteEscrowObligation public voteEscrow;
    MockVotingContract public votingContract;
    StringObligation public stringObligation;
    TrivialArbiter public trivialArbiter;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    // Test addresses
    address public alice = address(0x1);
    address public bob = address(0x2);
    address public charlie = address(0x3);

    // Test data
    uint256 public constant PROPOSAL_ID = 42;
    uint8 public constant VOTE_FOR = 1;
    uint8 public constant VOTE_AGAINST = 0;
    uint8 public constant VOTE_ABSTAIN = 2;

    // Events to test
    event EscrowMade(bytes32 indexed escrow, address indexed buyer);
    event EscrowCollected(
        bytes32 indexed escrow,
        bytes32 indexed fulfillment,
        address indexed fulfiller
    );
    event VoteDelegated(
        bytes32 indexed escrowId,
        address indexed voter,
        address indexed votingContract
    );
    event VoteCast(bytes32 indexed escrowId, uint256 proposalId, uint8 support);
    event VoteReturned(bytes32 indexed escrowId, address indexed voter);

    function setUp() public {
        // Deploy EAS infrastructure
        schemaRegistry = new SchemaRegistry();
        eas = new EAS(schemaRegistry);

        // Deploy voting contract
        votingContract = new MockVotingContract();

        // Deploy VoteEscrowObligation
        voteEscrow = new VoteEscrowObligation(eas, schemaRegistry);

        // Deploy StringObligation for creating fulfillment attestations
        stringObligation = new StringObligation(eas, schemaRegistry);

        // Deploy TrivialArbiter (simple arbiter for testing that always returns true)
        trivialArbiter = new TrivialArbiter();

        // Setup voting power
        votingContract.setVotingPower(alice, 100);
        votingContract.setVotingPower(bob, 50);
        votingContract.setVotingPower(charlie, 25);

        // Create a proposal
        votingContract.createProposal(PROPOSAL_ID);

        // Fund test accounts
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
        vm.deal(charlie, 10 ether);
    }

    function testFullVoteEscrowFlow() public {
        // Step 1: Alice creates a vote escrow
        vm.startPrank(alice);

        // Prepare escrow data
        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_FOR,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Vote for proposal 42")
            });

        bytes memory encodedData = voteEscrow.encodeObligationData(
            obligationData
        );

        // Alice delegates to the escrow contract before creating escrow
        votingContract.delegate(address(voteEscrow));

        // Create the escrow with no expiration
        bytes32 escrowUid = voteEscrow.doObligation(encodedData, 0);
        assertNotEq(escrowUid, bytes32(0), "Escrow UID should not be zero");

        // Verify delegation happened
        assertEq(
            votingContract.delegates(alice),
            address(voteEscrow),
            "Alice should have delegated to escrow contract"
        );

        // Verify alice has active escrow
        (bool hasEscrow, bytes32 activeEscrowId) = voteEscrow.hasActiveEscrow(
            alice
        );
        assertTrue(hasEscrow, "Alice should have active escrow");
        assertNotEq(
            activeEscrowId,
            bytes32(0),
            "Active escrow ID should not be zero"
        );

        vm.stopPrank();

        // Step 2: Bob fulfills the demand by creating any attestation (TrivialArbiter accepts anything)
        vm.startPrank(bob);

        // Create fulfillment attestation via StringObligation
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "Vote for proposal 42"}),
            bytes32(0)
        );
        assertNotEq(
            fulfillmentUid,
            bytes32(0),
            "Fulfillment UID should not be zero"
        );

        // Step 3: Bob collects the escrow using the fulfillment
        bytes memory result = voteEscrow.collectEscrowRaw(
            escrowUid,
            fulfillmentUid
        );

        // Decode the result to verify vote was cast
        (
            uint256 proposalId,
            uint8 support,
            address fulfiller,
            address voter
        ) = abi.decode(result, (uint256, uint8, address, address));

        assertEq(proposalId, PROPOSAL_ID, "Proposal ID should match");
        assertEq(support, VOTE_FOR, "Vote should be FOR");
        assertEq(fulfiller, bob, "Fulfiller should be Bob");
        assertEq(voter, alice, "Voter should be Alice");

        // Verify vote was actually cast
        assertTrue(
            votingContract.hasVoted(PROPOSAL_ID, address(voteEscrow)),
            "VoteEscrow contract should have voted"
        );

        // Check vote counts
        (uint256 against, uint256 for_, uint256 abstain) = votingContract
            .getProposalVotes(PROPOSAL_ID);
        assertEq(for_, 100, "For votes should be 100 (Alice's voting power)");
        assertEq(against, 0, "Against votes should be 0");
        assertEq(abstain, 0, "Abstain votes should be 0");

        vm.stopPrank();

        // Step 4: Verify alice no longer has active escrow
        (hasEscrow, ) = voteEscrow.hasActiveEscrow(alice);
        assertFalse(hasEscrow, "Alice should no longer have active escrow");
    }

    function testVoteEscrowWithExpiration() public {
        vm.startPrank(alice);

        // Create escrow with 1 hour expiration
        uint64 expirationTime = uint64(block.timestamp + 1 hours);

        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_AGAINST,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Vote against proposal")
            });

        bytes memory encodedData = voteEscrow.encodeObligationData(
            obligationData
        );

        // Delegate and create escrow
        votingContract.delegate(address(voteEscrow));
        bytes32 escrowUid = voteEscrow.doObligation(
            encodedData,
            expirationTime
        );

        // Verify escrow created
        Attestation memory attestation = eas.getAttestation(escrowUid);
        assertEq(
            attestation.expirationTime,
            expirationTime,
            "Expiration should be set"
        );

        vm.stopPrank();

        // Time passes and escrow expires
        vm.warp(block.timestamp + 2 hours);

        // Alice reclaims expired escrow
        vm.startPrank(alice);
        bool success = voteEscrow.reclaimExpired(escrowUid);
        assertTrue(success, "Reclaim should succeed");

        // After reclaim, alice must manually re-delegate (contract can't do it automatically)
        // Verify she still delegates to the escrow contract
        assertEq(
            votingContract.delegates(alice),
            address(voteEscrow),
            "Alice should still delegate to escrow after reclaim"
        );

        // Alice manually delegates back to herself
        votingContract.delegate(alice);

        // Now verify delegation returned to alice (self-delegation)
        assertEq(
            votingContract.delegates(alice),
            alice,
            "Alice should have self-delegation after manual re-delegation"
        );

        // Verify vote was never cast
        assertFalse(
            votingContract.hasVoted(PROPOSAL_ID, address(voteEscrow)),
            "Vote should not have been cast"
        );

        vm.stopPrank();
    }

    function testCannotCreateMultipleActiveEscrows() public {
        vm.startPrank(alice);

        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_FOR,
                arbiter: address(trivialArbiter),
                demand: abi.encode("First escrow")
            });

        bytes memory encodedData = voteEscrow.encodeObligationData(
            obligationData
        );

        // Create first escrow
        votingContract.delegate(address(voteEscrow));
        bytes32 firstEscrow = voteEscrow.doObligation(encodedData, 0);
        assertNotEq(firstEscrow, bytes32(0), "First escrow should be created");

        // Get the actual active escrow ID (which is the data hash, not the attestation UID)
        (, bytes32 activeEscrowId) = voteEscrow.hasActiveEscrow(alice);

        // Try to create second escrow - should fail
        obligationData.demand = abi.encode("Second escrow");
        encodedData = voteEscrow.encodeObligationData(obligationData);

        vm.expectRevert(
            abi.encodeWithSelector(
                VoteEscrowObligation.VoterHasActiveEscrow.selector,
                alice,
                activeEscrowId
            )
        );
        voteEscrow.doObligation(encodedData, 0);

        vm.stopPrank();
    }

    function testDelegationReturnsToSelf() public {
        // Alice delegates to Bob first (but this won't be tracked)
        vm.startPrank(alice);
        votingContract.delegate(bob);
        assertEq(
            votingContract.delegates(alice),
            bob,
            "Alice should delegate to Bob"
        );

        // Create vote escrow
        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_ABSTAIN,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Abstain vote")
            });

        bytes memory encodedData = voteEscrow.encodeObligationData(
            obligationData
        );

        // Delegate to escrow before creating escrow
        votingContract.delegate(address(voteEscrow));

        // This will store alice as previous delegate (since we can't track Bob)
        bytes32 escrowUid = voteEscrow.doObligation(
            encodedData,
            uint64(block.timestamp + 1 hours)
        );

        assertEq(
            votingContract.delegates(alice),
            address(voteEscrow),
            "Should delegate to escrow"
        );

        vm.stopPrank();

        // Expire and reclaim
        vm.warp(block.timestamp + 2 hours);

        vm.startPrank(alice);
        voteEscrow.reclaimExpired(escrowUid);

        // After reclaim, alice still delegates to escrow (contract can't change it)
        assertEq(
            votingContract.delegates(alice),
            address(voteEscrow),
            "Alice should still delegate to escrow after reclaim"
        );

        // Alice must manually delegate back to herself
        votingContract.delegate(alice);

        // Now verify delegation returned to self
        assertEq(
            votingContract.delegates(alice),
            alice,
            "Delegation should return to self after manual re-delegation"
        );

        vm.stopPrank();
    }

    function testVoteWithReasonIncludesMetadata() public {
        vm.startPrank(alice);

        // Create and execute escrow
        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_FOR,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Test vote")
            });

        bytes memory encodedData = voteEscrow.encodeObligationData(
            obligationData
        );
        votingContract.delegate(address(voteEscrow));
        bytes32 escrowUid = voteEscrow.doObligation(encodedData, 0);

        // Get the actual escrow data hash (not the attestation UID)
        (, bytes32 escrowDataHash) = voteEscrow.hasActiveEscrow(alice);

        vm.stopPrank();

        // Fulfill and collect
        vm.startPrank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "Test vote"}),
            bytes32(0)
        );

        // The vote cast event should include metadata about the escrow data hash
        vm.expectEmit(true, false, false, true);
        emit VoteCast(escrowDataHash, PROPOSAL_ID, VOTE_FOR);

        voteEscrow.collectEscrowRaw(escrowUid, fulfillmentUid);

        vm.stopPrank();
    }

    function testCannotCastVoteTwice() public {
        vm.startPrank(alice);

        // Setup escrow
        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_FOR,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Vote once")
            });

        bytes memory encodedData = voteEscrow.encodeObligationData(
            obligationData
        );
        votingContract.delegate(address(voteEscrow));
        bytes32 escrowUid = voteEscrow.doObligation(encodedData, 0);

        vm.stopPrank();

        // First collection should work
        vm.startPrank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "Vote once"}),
            bytes32(0)
        );
        voteEscrow.collectEscrowRaw(escrowUid, fulfillmentUid);
        vm.stopPrank();

        // Create another escrow for the same proposal
        vm.startPrank(charlie);
        votingContract.delegate(address(voteEscrow));
        bytes32 secondEscrowUid = voteEscrow.doObligation(encodedData, 0);
        vm.stopPrank();

        // Second collection should fail because vote was already cast
        vm.startPrank(bob);
        bytes32 secondFulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "Vote once"}),
            bytes32(0)
        );

        vm.expectRevert(
            abi.encodeWithSelector(
                VoteEscrowObligation.VoteAlreadyCast.selector,
                PROPOSAL_ID
            )
        );
        voteEscrow.collectEscrowRaw(secondEscrowUid, secondFulfillmentUid);

        vm.stopPrank();
    }

    function testEncodeDecodeObligationData() public {
        VoteEscrowObligation.ObligationData
            memory original = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: 999,
                support: VOTE_ABSTAIN,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Complex demand", 123, true)
            });

        bytes memory encoded = voteEscrow.encodeObligationData(original);
        VoteEscrowObligation.ObligationData memory decoded = voteEscrow
            .decodeObligationData(encoded);

        assertEq(
            decoded.votingContract,
            original.votingContract,
            "Voting contract should match"
        );
        assertEq(
            decoded.proposalId,
            original.proposalId,
            "Proposal ID should match"
        );
        assertEq(decoded.support, original.support, "Support should match");
        assertEq(decoded.arbiter, original.arbiter, "Arbiter should match");
        assertEq(decoded.demand, original.demand, "Demand should match");
    }

    function testExtractArbiterAndDemand() public {
        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_FOR,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Extract test")
            });

        bytes memory encoded = voteEscrow.encodeObligationData(obligationData);
        (address arbiter, bytes memory demand) = voteEscrow
            .extractArbiterAndDemand(encoded);

        assertEq(arbiter, address(trivialArbiter), "Arbiter should match");
        assertEq(demand, abi.encode("Extract test"), "Demand should match");
    }

    function testGetEscrowDetails() public {
        vm.startPrank(alice);

        // Create escrow
        VoteEscrowObligation.ObligationData
            memory obligationData = VoteEscrowObligation.ObligationData({
                votingContract: address(votingContract),
                proposalId: PROPOSAL_ID,
                support: VOTE_FOR,
                arbiter: address(trivialArbiter),
                demand: abi.encode("Details test")
            });

        bytes memory encodedData = voteEscrow.encodeObligationData(
            obligationData
        );
        votingContract.delegate(address(voteEscrow));
        voteEscrow.doObligation(encodedData, 0);

        // Get active escrow ID
        (, bytes32 escrowId) = voteEscrow.hasActiveEscrow(alice);

        // Get escrow details
        (
            address voter,
            VoteEscrowObligation.ObligationData memory data,
            address prevDelegate
        ) = voteEscrow.getEscrowDetails(escrowId);

        assertEq(voter, alice, "Voter should be Alice");
        assertEq(
            data.votingContract,
            obligationData.votingContract,
            "Voting contract should match"
        );
        assertEq(
            data.proposalId,
            obligationData.proposalId,
            "Proposal ID should match"
        );
        assertEq(data.support, obligationData.support, "Support should match");
        assertEq(data.arbiter, obligationData.arbiter, "Arbiter should match");
        assertEq(data.demand, obligationData.demand, "Demand should match");
        assertEq(
            prevDelegate,
            alice,
            "Previous delegate should be Alice (self)"
        );

        vm.stopPrank();
    }
}
