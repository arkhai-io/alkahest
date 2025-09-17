// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IVotingContract} from "../../src/obligations/example/VoteEscrowObligation.sol";

/// @title MockVotingContract
/// @notice Mock implementation of a voting contract for testing VoteEscrowObligation
/// @dev Simulates a governance contract with delegation and voting capabilities
contract MockVotingContract is IVotingContract {
    // Delegation tracking
    mapping(address => address) private _delegates;

    // Voting power (simplified - just a fixed amount per address)
    mapping(address => uint256) private _votingPower;

    // Track who has delegated to each address (for calculating total voting power)
    mapping(address => address[]) private _delegators;

    // Track votes on proposals
    mapping(uint256 => mapping(address => bool)) private _hasVoted;
    mapping(uint256 => mapping(uint8 => uint256)) public voteCounts;
    mapping(uint256 => mapping(address => uint8)) public voteChoice;

    // Track proposal existence
    mapping(uint256 => bool) public proposalExists;

    // Events
    event DelegateChanged(
        address indexed delegator,
        address indexed fromDelegate,
        address indexed toDelegate
    );
    event VoteCast(
        address indexed voter,
        uint256 proposalId,
        uint8 support,
        uint256 weight,
        string reason
    );

    constructor() {
        // Initialize some voting power for testing
    }

    /// @notice Set voting power for an address (for testing)
    function setVotingPower(address account, uint256 power) external {
        _votingPower[account] = power;
    }

    /// @notice Create a proposal (for testing)
    function createProposal(uint256 proposalId) external {
        proposalExists[proposalId] = true;
    }

    /// @notice Delegate voting power to another address
    function delegate(address delegatee) external override {
        address currentDelegate = _delegates[msg.sender];

        // Remove from old delegate's delegators list
        if (currentDelegate != address(0) && currentDelegate != msg.sender) {
            _removeDelegator(currentDelegate, msg.sender);
        }

        // Add to new delegate's delegators list
        if (delegatee != address(0) && delegatee != msg.sender) {
            _delegators[delegatee].push(msg.sender);
        }

        _delegates[msg.sender] = delegatee;

        emit DelegateChanged(msg.sender, currentDelegate, delegatee);
    }

    /// @notice Remove a delegator from the list
    function _removeDelegator(address delegatee, address delegator) private {
        address[] storage delegatorsList = _delegators[delegatee];
        for (uint256 i = 0; i < delegatorsList.length; i++) {
            if (delegatorsList[i] == delegator) {
                // Move last element to this position and pop
                delegatorsList[i] = delegatorsList[delegatorsList.length - 1];
                delegatorsList.pop();
                break;
            }
        }
    }

    /// @notice Get the current delegate for an account
    function delegates(
        address account
    ) external view override returns (address) {
        address current = _delegates[account];
        // If no delegation set, they delegate to themselves by default
        return current == address(0) ? account : current;
    }

    /// @notice Get voting power of an account
    function getVotes(
        address account
    ) external view override returns (uint256) {
        // In a real implementation, this would calculate based on delegations
        // For testing, we'll use direct voting power
        uint256 directPower = _votingPower[account];

        // Add delegated power (simplified)
        uint256 delegatedPower = 0;
        // In reality, would iterate through all delegators
        // For this mock, we'll keep it simple

        return directPower + delegatedPower;
    }

    /// @notice Cast a vote on a proposal
    function castVote(uint256 proposalId, uint8 support) external override {
        _castVoteInternal(proposalId, support, "");
    }

    /// @notice Cast a vote with a reason
    function castVoteWithReason(
        uint256 proposalId,
        uint8 support,
        string calldata reason
    ) external override {
        _castVoteInternal(proposalId, support, reason);
    }

    /// @notice Internal function to handle vote casting
    function _castVoteInternal(
        uint256 proposalId,
        uint8 support,
        string memory reason
    ) internal {
        require(proposalExists[proposalId], "Proposal does not exist");
        require(!_hasVoted[proposalId][msg.sender], "Already voted");
        require(support <= 2, "Invalid vote type");

        // Get the aggregated voting power (including delegated power)
        address voter = msg.sender;
        uint256 weight = _getAggregatedVotingPower(voter);
        require(weight > 0, "No voting power");

        // Record the vote
        _hasVoted[proposalId][voter] = true;
        voteChoice[proposalId][voter] = support;
        voteCounts[proposalId][support] += weight;

        emit VoteCast(voter, proposalId, support, weight, reason);
    }

    /// @notice Check if an account has voted on a proposal
    function hasVoted(
        uint256 proposalId,
        address account
    ) external view override returns (bool) {
        return _hasVoted[proposalId][account];
    }

    /// @notice Get effective voting power (helper for testing)
    function _getVotingPower(address account) internal view returns (uint256) {
        // Return the account's direct voting power
        uint256 totalPower = _votingPower[account];
        return totalPower > 0 ? totalPower : 1; // Default to 1 for testing
    }

    /// @notice Get aggregated voting power including delegations
    function _getAggregatedVotingPower(
        address account
    ) internal view returns (uint256) {
        uint256 totalPower = 0;

        // Add power from all accounts that delegated to this account
        address[] storage delegatorsList = _delegators[account];
        for (uint256 i = 0; i < delegatorsList.length; i++) {
            address delegator = delegatorsList[i];
            // Only count if they still delegate to us
            if (_delegates[delegator] == account) {
                totalPower += _votingPower[delegator];
            }
        }

        // Also add own power if not delegated elsewhere
        address currentDelegate = _delegates[account];
        if (currentDelegate == address(0) || currentDelegate == account) {
            totalPower += _votingPower[account];
        }

        return totalPower > 0 ? totalPower : 1; // Default to 1 for testing
    }

    /// @notice Get vote results for a proposal (for testing)
    function getProposalVotes(
        uint256 proposalId
    ) external view returns (uint256 against, uint256 for_, uint256 abstain) {
        return (
            voteCounts[proposalId][0], // Against
            voteCounts[proposalId][1], // For
            voteCounts[proposalId][2] // Abstain
        );
    }

    /// @notice Reset a proposal's votes (for testing)
    function resetProposal(uint256 proposalId, address voter) external {
        _hasVoted[proposalId][voter] = false;
        uint8 previousVote = voteChoice[proposalId][voter];
        if (_hasVoted[proposalId][voter]) {
            voteCounts[proposalId][previousVote] -= _getAggregatedVotingPower(
                voter
            );
        }
        delete voteChoice[proposalId][voter];
    }
}
