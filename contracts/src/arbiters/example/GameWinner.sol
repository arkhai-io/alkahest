// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IArbiter} from "../../IArbiter.sol";
import {BaseArbiter} from "../../BaseArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/**
 * @title GameWinner
 * @notice Single-transaction arbiter that validates EAS attestations for game winners
 * @dev Allows game winners with valid attestations to claim rewards from escrow.
 *      Assumes an existing game system where winners receive EAS attestations.
 */
contract GameWinner is BaseArbiter {
    using ArbiterUtils for Attestation;

    /**
     * @notice The EAS contract for fetching attestations
     */
    IEAS public immutable eas;

    /**
     * @notice The schema UID that game winner attestations must use
     */
    bytes32 public immutable GAME_WINNER_SCHEMA;

    /**
     * @notice The trusted game contract that can attest winners
     */
    address public immutable trustedGameContract;

    /**
     * @notice Struct for game winner attestation data
     * @param gameId The unique identifier of the game
     * @param winner The address of the winner
     * @param timestamp When the game was won
     * @param score The winning score (optional)
     */
    struct GameWinnerData {
        bytes32 gameId;
        address winner;
        uint256 timestamp;
        uint256 score;
    }

    /**
     * @notice Struct for demand data specifying claim requirements
     * @param gameId The game ID that must match the attestation
     * @param minScore Optional minimum score required to claim
     * @param validAfter Optional timestamp after which the win is valid
     */
    struct ClaimDemand {
        bytes32 gameId;
        uint256 minScore;
        uint256 validAfter;
    }

    /**
     * @notice Constructor
     * @param _eas The EAS contract address
     * @param _gameWinnerSchema The schema UID for game winner attestations
     * @param _trustedGameContract The address of the trusted game contract that issues winner attestations
     */
    constructor(IEAS _eas, bytes32 _gameWinnerSchema, address _trustedGameContract) {
        require(address(_eas) != address(0), "Invalid EAS address");
        require(_gameWinnerSchema != bytes32(0), "Invalid schema");
        require(_trustedGameContract != address(0), "Invalid game contract");

        eas = _eas;
        GAME_WINNER_SCHEMA = _gameWinnerSchema;
        trustedGameContract = _trustedGameContract;
    }

    /**
     * @notice Checks if a game winner attestation satisfies the reward claim requirements
     * @param fulfillment The attestation proving game winner status
     * @param demand The encoded demand specifying claim requirements
     * @param escrowUid Optional reference to what this fulfillment is escrowUid
     * @return bool True if the attestation proves valid winner status for the claim
     */
    function check(Attestation memory fulfillment, bytes memory demand, bytes32 escrowUid)
        external
        view
        override
        returns (bool)
    {
        // Check basic attestation validity

        // Verify the attestation uses the correct schema
        if (fulfillment.schema != GAME_WINNER_SCHEMA) return false;

        // Verify the attestation was made by the trusted game contract
        if (fulfillment.attester != trustedGameContract) return false;

        // Check if the fulfillment references what it's escrowUid (if provided)
        if (escrowUid != bytes32(0) && fulfillment.refUID != escrowUid) {
            return false;
        }

        // Decode the attestation data
        GameWinnerData memory winnerData = abi.decode(fulfillment.data, (GameWinnerData));

        // Decode the demand requirements
        ClaimDemand memory claimDemand = abi.decode(demand, (ClaimDemand));

        // Verify the game ID matches
        if (winnerData.gameId != claimDemand.gameId) return false;

        // Check minimum score requirement if specified
        if (claimDemand.minScore > 0 && winnerData.score < claimDemand.minScore) {
            return false;
        }

        // Check validity timestamp if specified
        if (claimDemand.validAfter > 0 && winnerData.timestamp < claimDemand.validAfter) {
            return false;
        }

        // Verify the attestation recipient matches the winner
        // This ensures only the actual winner can use this attestation
        if (fulfillment.recipient != winnerData.winner) return false;

        // All checks passed - the winner can claim their reward
        return true;
    }

    /**
     * @notice Helper function to validate a winner attestation UID directly
     * @param attestationUID The UID of the winner attestation to validate
     * @param claimDemand The claim requirements to check against
     * @return bool True if the attestation is valid for the claim
     */
    function validateWinnerAttestation(bytes32 attestationUID, ClaimDemand memory claimDemand)
        external
        view
        returns (bool)
    {
        Attestation memory attestation = eas.getAttestation(attestationUID);
        return this.check(attestation, abi.encode(claimDemand), bytes32(0));
    }
}
