// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/**
 * @title MajorityVoteArbiter
 * @notice An asynchronous arbiter that validates obligations through majority voting
 * @dev This implements a voting mechanism where multiple authorized voters can vote
 *      on whether an obligation satisfies the specified requirements.
 *
 *      Note: This functionality could alternatively be implemented as a separate
 *      voting contract that submits aggregated results to TrustedOracleArbiter,
 *      rather than as a standalone arbiter. That approach would allow reusing
 *      the existing TrustedOracleArbiter infrastructure while adding voting logic.
 */
contract MajorityVoteArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    struct DemandData {
        address[] voters; // List of authorized voters
        uint256 quorum; // Minimum number of votes required
        bytes data; // Additional data for voters to consider
    }

    struct VoteStatus {
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
        mapping(address => bool) vote;
    }

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

    error UnauthorizedVoter();
    error AlreadyVoted();
    error UnauthorizedArbitrationRequest();
    error InvalidQuorum();
    error NoVoters();

    IEAS public immutable eas;
    mapping(bytes32 => VoteStatus) public voteStatuses;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    /**
     * @notice Cast a vote for a specific obligation
     * @param obligation The UID of the obligation attestation
     * @param vote True if the voter believes the obligation satisfies requirements, false otherwise
     * @param demandData The encoded DemandData containing voters and quorum
     */
    function castVote(
        bytes32 obligation,
        bool vote,
        bytes calldata demandData
    ) external {
        DemandData memory demand = abi.decode(demandData, (DemandData));

        // Check if sender is an authorized voter
        bool isAuthorized = false;
        for (uint256 i = 0; i < demand.voters.length; i++) {
            if (demand.voters[i] == msg.sender) {
                isAuthorized = true;
                break;
            }
        }
        if (!isAuthorized) revert UnauthorizedVoter();

        VoteStatus storage status = voteStatuses[obligation];

        // Check if voter has already voted
        if (status.hasVoted[msg.sender]) revert AlreadyVoted();

        // Record the vote
        status.hasVoted[msg.sender] = true;
        status.vote[msg.sender] = vote;

        if (vote) {
            status.yesVotes++;
        } else {
            status.noVotes++;
        }

        emit VoteCast(
            obligation,
            msg.sender,
            vote,
            status.yesVotes,
            status.noVotes
        );

        // Check if voting is complete (quorum reached for either decision)
        if (status.yesVotes >= demand.quorum) {
            emit ArbitrationComplete(
                obligation,
                true,
                status.yesVotes,
                status.noVotes
            );
        } else if (status.noVotes > demand.voters.length - demand.quorum) {
            // If no votes exceed the number that would prevent reaching quorum
            emit ArbitrationComplete(
                obligation,
                false,
                status.yesVotes,
                status.noVotes
            );
        }
    }

    /**
     * @notice Request arbitration for an obligation
     * @param _obligation The UID of the obligation attestation
     * @param voters List of authorized voters
     * @param quorum Minimum number of votes required for approval
     */
    function requestArbitration(
        bytes32 _obligation,
        address[] calldata voters,
        uint256 quorum
    ) external {
        // Validate inputs
        if (voters.length == 0) revert NoVoters();
        if (quorum == 0 || quorum > voters.length) revert InvalidQuorum();

        // Only attester or recipient can request arbitration
        Attestation memory obligation = eas.getAttestation(_obligation);
        if (
            obligation.attester != msg.sender &&
            obligation.recipient != msg.sender
        ) revert UnauthorizedArbitrationRequest();

        emit ArbitrationRequested(_obligation, voters, quorum);
    }

    /**
     * @notice Check if an obligation meets the voting requirements
     * @param obligation The attestation to check
     * @param demand Encoded DemandData containing voters and quorum
     * @return bool True if the obligation has received enough yes votes
     */
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 /* fulfilling */
    ) public view override returns (bool) {
        // Validate attestation integrity
        if (!obligation._checkIntrinsic()) return false;

        DemandData memory demandData = abi.decode(demand, (DemandData));

        // Validate demand data
        if (demandData.voters.length == 0) return false;
        if (
            demandData.quorum == 0 ||
            demandData.quorum > demandData.voters.length
        ) {
            return false;
        }

        VoteStatus storage status = voteStatuses[obligation.uid];

        // Check if quorum has been reached with yes votes
        return status.yesVotes >= demandData.quorum;
    }

    /**
     * @notice Get the current vote count for an obligation
     * @param obligation The UID of the obligation
     * @return yesVotes Number of yes votes
     * @return noVotes Number of no votes
     */
    function getVoteCount(
        bytes32 obligation
    ) external view returns (uint256 yesVotes, uint256 noVotes) {
        VoteStatus storage status = voteStatuses[obligation];
        return (status.yesVotes, status.noVotes);
    }

    /**
     * @notice Check if a voter has voted for an obligation
     * @param obligation The UID of the obligation
     * @param voter The address to check
     * @return hasVoted True if the voter has cast a vote
     * @return vote The vote value (only valid if hasVoted is true)
     */
    function getVoterStatus(
        bytes32 obligation,
        address voter
    ) external view returns (bool hasVoted, bool vote) {
        VoteStatus storage status = voteStatuses[obligation];
        return (status.hasVoted[voter], status.vote[voter]);
    }

    /**
     * @notice Helper function to decode demand data
     * @param data Encoded demand data
     * @return Decoded DemandData struct
     */
    function decodeDemandData(
        bytes calldata data
    ) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    /**
     * @notice Check if voting is complete for an obligation
     * @param obligation The UID of the obligation
     * @param demandData Encoded DemandData
     * @return complete True if voting has reached a decisive outcome
     * @return approved True if the obligation was approved (only valid if complete is true)
     */
    function isVotingComplete(
        bytes32 obligation,
        bytes calldata demandData
    ) external view returns (bool complete, bool approved) {
        DemandData memory demand = abi.decode(demandData, (DemandData));
        VoteStatus storage status = voteStatuses[obligation];

        if (status.yesVotes >= demand.quorum) {
            return (true, true);
        }

        if (status.noVotes > demand.voters.length - demand.quorum) {
            return (true, false);
        }

        return (false, false);
    }
}
