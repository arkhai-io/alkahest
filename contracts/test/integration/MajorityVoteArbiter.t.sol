// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test, console2} from "forge-std/Test.sol";
import {MajorityVoteArbiter} from "../../src/arbiters/example/MajorityVoteArbiter.sol";
import {IArbiter} from "../../src/IArbiter.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData, RevocationRequest, RevocationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry, SchemaRecord} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {EASDeployer} from "../utils/EASDeployer.sol";

contract MajorityVoteArbiterTest is Test {
    MajorityVoteArbiter public arbiter;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    address public attester;
    address public recipient;
    address public voter1;
    address public voter2;
    address public voter3;
    address public voter4;
    address public voter5;
    address public unauthorizedVoter;

    bytes32 public testSchema;
    bytes32 public testObligationUID;

    event VoteCast(
        bytes32 indexed obligation,
        address indexed voter,
        bool vote,
        uint256 yesVotes,
        uint256 noVotes
    );

    event ArbitrationRequested(
        bytes32 indexed obligation,
        address[] voters,
        uint256 quorum
    );

    event ArbitrationComplete(
        bytes32 indexed obligation,
        bool decision,
        uint256 yesVotes,
        uint256 noVotes
    );

    function setUp() public {
        // Deploy EAS infrastructure locally
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        // Setup test accounts
        attester = makeAddr("attester");
        recipient = makeAddr("recipient");
        voter1 = makeAddr("voter1");
        voter2 = makeAddr("voter2");
        voter3 = makeAddr("voter3");
        voter4 = makeAddr("voter4");
        voter5 = makeAddr("voter5");
        unauthorizedVoter = makeAddr("unauthorizedVoter");

        // Fund accounts
        vm.deal(attester, 10 ether);
        vm.deal(recipient, 10 ether);

        // Deploy MajorityVoteArbiter
        arbiter = new MajorityVoteArbiter(eas);

        // Register a test schema
        vm.prank(attester);
        testSchema = schemaRegistry.register(
            "string item, bytes32 schema",
            ISchemaResolver(address(0)),
            true // revocable
        );

        // Create a test attestation
        vm.prank(attester);
        AttestationRequestData memory attestationData = AttestationRequestData({
            recipient: recipient,
            expirationTime: 0,
            revocable: true,
            refUID: bytes32(0),
            data: abi.encode("test obligation"),
            value: 0
        });

        AttestationRequest memory request = AttestationRequest({
            schema: testSchema,
            data: attestationData
        });

        testObligationUID = eas.attest(request);
    }

    function testBasicVoting() public {
        // Setup demand data with 3 voters and quorum of 2
        address[] memory voters = new address[](3);
        voters[0] = voter1;
        voters[1] = voter2;
        voters[2] = voter3;
        uint256 quorum = 2;
        bytes memory additionalData = abi.encode("voting on test obligation");

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: quorum, data: additionalData});
        bytes memory encodedDemand = abi.encode(demandData);

        // Request arbitration
        vm.prank(attester);
        vm.expectEmit(true, false, false, true);
        emit ArbitrationRequested(testObligationUID, voters, quorum);
        arbiter.requestArbitration(testObligationUID, voters, quorum);

        // Initially, obligation should not pass
        Attestation memory obligation = eas.getAttestation(testObligationUID);
        assertFalse(
            arbiter.checkObligation(obligation, encodedDemand, bytes32(0))
        );

        // First vote (yes)
        vm.prank(voter1);
        vm.expectEmit(true, true, false, true);
        emit VoteCast(testObligationUID, voter1, true, 1, 0);
        arbiter.castVote(testObligationUID, true, encodedDemand);

        // Check vote was recorded
        (uint256 yesVotes, uint256 noVotes) = arbiter.getVoteCount(
            testObligationUID
        );
        assertEq(yesVotes, 1);
        assertEq(noVotes, 0);

        // Still not enough votes to pass
        assertFalse(
            arbiter.checkObligation(obligation, encodedDemand, bytes32(0))
        );

        // Second vote (yes) - should reach quorum
        vm.prank(voter2);
        vm.expectEmit(true, true, false, true);
        emit VoteCast(testObligationUID, voter2, true, 2, 0);
        vm.expectEmit(true, false, false, true);
        emit ArbitrationComplete(testObligationUID, true, 2, 0);
        arbiter.castVote(testObligationUID, true, encodedDemand);

        // Now should pass
        assertTrue(
            arbiter.checkObligation(obligation, encodedDemand, bytes32(0))
        );

        // Check final vote count
        (yesVotes, noVotes) = arbiter.getVoteCount(testObligationUID);
        assertEq(yesVotes, 2);
        assertEq(noVotes, 0);
    }

    function testVotingRejection() public {
        // Setup demand data with 5 voters and quorum of 3
        address[] memory voters = new address[](5);
        voters[0] = voter1;
        voters[1] = voter2;
        voters[2] = voter3;
        voters[3] = voter4;
        voters[4] = voter5;
        uint256 quorum = 3;

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: quorum, data: ""});
        bytes memory encodedDemand = abi.encode(demandData);

        // Vote no with enough votes to prevent quorum (3 no votes means quorum can't be reached)
        vm.prank(voter1);
        arbiter.castVote(testObligationUID, false, encodedDemand);

        vm.prank(voter2);
        arbiter.castVote(testObligationUID, false, encodedDemand);

        // Third no vote should trigger completion with rejection
        vm.prank(voter3);
        vm.expectEmit(true, false, false, true);
        emit ArbitrationComplete(testObligationUID, false, 0, 3);
        arbiter.castVote(testObligationUID, false, encodedDemand);

        // Should not pass
        Attestation memory obligation = eas.getAttestation(testObligationUID);
        assertFalse(
            arbiter.checkObligation(obligation, encodedDemand, bytes32(0))
        );

        // Check voting is complete
        (bool complete, bool approved) = arbiter.isVotingComplete(
            testObligationUID,
            encodedDemand
        );
        assertTrue(complete);
        assertFalse(approved);
    }

    function testUnauthorizedVoter() public {
        address[] memory voters = new address[](2);
        voters[0] = voter1;
        voters[1] = voter2;

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: 2, data: ""});
        bytes memory encodedDemand = abi.encode(demandData);

        // Unauthorized voter should be rejected
        vm.prank(unauthorizedVoter);
        vm.expectRevert(MajorityVoteArbiter.UnauthorizedVoter.selector);
        arbiter.castVote(testObligationUID, true, encodedDemand);
    }

    function testAlreadyVoted() public {
        address[] memory voters = new address[](2);
        voters[0] = voter1;
        voters[1] = voter2;

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: 2, data: ""});
        bytes memory encodedDemand = abi.encode(demandData);

        // First vote should succeed
        vm.prank(voter1);
        arbiter.castVote(testObligationUID, true, encodedDemand);

        // Second vote from same voter should fail
        vm.prank(voter1);
        vm.expectRevert(MajorityVoteArbiter.AlreadyVoted.selector);
        arbiter.castVote(testObligationUID, false, encodedDemand);
    }

    function testUnauthorizedArbitrationRequest() public {
        address[] memory voters = new address[](1);
        voters[0] = voter1;

        // Random address should not be able to request arbitration
        vm.prank(unauthorizedVoter);
        vm.expectRevert(
            MajorityVoteArbiter.UnauthorizedArbitrationRequest.selector
        );
        arbiter.requestArbitration(testObligationUID, voters, 1);

        // Attester should be able to request
        vm.prank(attester);
        arbiter.requestArbitration(testObligationUID, voters, 1);

        // Recipient should be able to request
        vm.prank(recipient);
        arbiter.requestArbitration(testObligationUID, voters, 1);
    }

    function testInvalidQuorum() public {
        address[] memory voters = new address[](3);
        voters[0] = voter1;
        voters[1] = voter2;
        voters[2] = voter3;

        // Quorum of 0 should fail
        vm.prank(attester);
        vm.expectRevert(MajorityVoteArbiter.InvalidQuorum.selector);
        arbiter.requestArbitration(testObligationUID, voters, 0);

        // Quorum greater than number of voters should fail
        vm.prank(attester);
        vm.expectRevert(MajorityVoteArbiter.InvalidQuorum.selector);
        arbiter.requestArbitration(testObligationUID, voters, 4);
    }

    function testNoVoters() public {
        address[] memory voters = new address[](0);

        // Empty voter list should fail
        vm.prank(attester);
        vm.expectRevert(MajorityVoteArbiter.NoVoters.selector);
        arbiter.requestArbitration(testObligationUID, voters, 1);
    }

    function testGetVoterStatus() public {
        address[] memory voters = new address[](2);
        voters[0] = voter1;
        voters[1] = voter2;

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: 1, data: ""});
        bytes memory encodedDemand = abi.encode(demandData);

        // Check initial status
        (bool hasVoted, bool vote) = arbiter.getVoterStatus(
            testObligationUID,
            voter1
        );
        assertFalse(hasVoted);
        assertFalse(vote); // Default value

        // Vote yes
        vm.prank(voter1);
        arbiter.castVote(testObligationUID, true, encodedDemand);

        // Check status after voting
        (hasVoted, vote) = arbiter.getVoterStatus(testObligationUID, voter1);
        assertTrue(hasVoted);
        assertTrue(vote);

        // Vote no with voter2
        vm.prank(voter2);
        arbiter.castVote(testObligationUID, false, encodedDemand);

        (hasVoted, vote) = arbiter.getVoterStatus(testObligationUID, voter2);
        assertTrue(hasVoted);
        assertFalse(vote);
    }

    function testDecodeDemandData() public {
        address[] memory voters = new address[](2);
        voters[0] = voter1;
        voters[1] = voter2;
        bytes memory additionalData = abi.encode("test data");

        MajorityVoteArbiter.DemandData memory originalData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: 2, data: additionalData});

        bytes memory encoded = abi.encode(originalData);
        MajorityVoteArbiter.DemandData memory decoded = arbiter
            .decodeDemandData(encoded);

        assertEq(decoded.voters.length, 2);
        assertEq(decoded.voters[0], voter1);
        assertEq(decoded.voters[1], voter2);
        assertEq(decoded.quorum, 2);
        assertEq(decoded.data, additionalData);
    }

    function testMixedVoting() public {
        // Test a scenario with mixed yes/no votes
        address[] memory voters = new address[](5);
        voters[0] = voter1;
        voters[1] = voter2;
        voters[2] = voter3;
        voters[3] = voter4;
        voters[4] = voter5;
        uint256 quorum = 3;

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: quorum, data: ""});
        bytes memory encodedDemand = abi.encode(demandData);

        // Cast votes: 3 yes, 2 no
        vm.prank(voter1);
        arbiter.castVote(testObligationUID, true, encodedDemand);

        vm.prank(voter2);
        arbiter.castVote(testObligationUID, false, encodedDemand);

        vm.prank(voter3);
        arbiter.castVote(testObligationUID, true, encodedDemand);

        vm.prank(voter4);
        arbiter.castVote(testObligationUID, false, encodedDemand);

        // Final yes vote should reach quorum
        vm.prank(voter5);
        vm.expectEmit(true, false, false, true);
        emit ArbitrationComplete(testObligationUID, true, 3, 2);
        arbiter.castVote(testObligationUID, true, encodedDemand);

        // Should pass
        Attestation memory obligation = eas.getAttestation(testObligationUID);
        assertTrue(
            arbiter.checkObligation(obligation, encodedDemand, bytes32(0))
        );

        // Verify final counts
        (uint256 yesVotes, uint256 noVotes) = arbiter.getVoteCount(
            testObligationUID
        );
        assertEq(yesVotes, 3);
        assertEq(noVotes, 2);
    }

    function testExpiredAttestation() public {
        // Create an attestation with expiration time
        vm.prank(attester);
        AttestationRequestData memory attestationData = AttestationRequestData({
            recipient: recipient,
            expirationTime: uint64(block.timestamp + 1 hours),
            revocable: true,
            refUID: bytes32(0),
            data: abi.encode("expiring obligation"),
            value: 0
        });

        AttestationRequest memory request = AttestationRequest({
            schema: testSchema,
            data: attestationData
        });

        bytes32 expiringUID = eas.attest(request);

        // Setup voting
        address[] memory voters = new address[](2);
        voters[0] = voter1;
        voters[1] = voter2;

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: 2, data: ""});
        bytes memory encodedDemand = abi.encode(demandData);

        // Vote to reach quorum
        vm.prank(voter1);
        arbiter.castVote(expiringUID, true, encodedDemand);
        vm.prank(voter2);
        arbiter.castVote(expiringUID, true, encodedDemand);

        // Should pass before expiration
        Attestation memory obligation = eas.getAttestation(expiringUID);
        assertTrue(
            arbiter.checkObligation(obligation, encodedDemand, bytes32(0))
        );

        // Fast forward past expiration
        vm.warp(block.timestamp + 2 hours);

        // Should fail after expiration due to intrinsic check
        obligation = eas.getAttestation(expiringUID);
        vm.expectRevert(); // Expecting DeadlineExpired error from ArbiterUtils
        arbiter.checkObligation(obligation, encodedDemand, bytes32(0));
    }

    function testRevokedAttestation() public {
        // Create a revocable attestation
        vm.prank(attester);
        AttestationRequestData memory attestationData = AttestationRequestData({
            recipient: recipient,
            expirationTime: 0,
            revocable: true,
            refUID: bytes32(0),
            data: abi.encode("revocable obligation"),
            value: 0
        });

        AttestationRequest memory request = AttestationRequest({
            schema: testSchema,
            data: attestationData
        });

        bytes32 revocableUID = eas.attest(request);

        // Setup voting
        address[] memory voters = new address[](1);
        voters[0] = voter1;

        MajorityVoteArbiter.DemandData memory demandData = MajorityVoteArbiter
            .DemandData({voters: voters, quorum: 1, data: ""});
        bytes memory encodedDemand = abi.encode(demandData);

        // Vote to reach quorum
        vm.prank(voter1);
        arbiter.castVote(revocableUID, true, encodedDemand);

        // Should pass before revocation
        Attestation memory obligation = eas.getAttestation(revocableUID);
        assertTrue(
            arbiter.checkObligation(obligation, encodedDemand, bytes32(0))
        );

        // Revoke the attestation
        vm.prank(attester);
        eas.revoke(
            RevocationRequest({
                schema: testSchema,
                data: RevocationRequestData({uid: revocableUID, value: 0})
            })
        );

        // Should fail after revocation due to intrinsic check
        obligation = eas.getAttestation(revocableUID);
        vm.expectRevert(); // Expecting AttestationRevoked error from ArbiterUtils
        arbiter.checkObligation(obligation, encodedDemand, bytes32(0));
    }
}
