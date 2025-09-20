// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/**
 * @title GameWinner
 * @notice Single-transaction arbiter that validates EAS attestations for game winners
 * @dev Allows game winners with valid attestations to claim rewards from escrow.
 *      Assumes an existing game system where winners receive EAS attestations.
 */
contract GameWinner is IArbiter {
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
    constructor(
        IEAS _eas,
        bytes32 _gameWinnerSchema,
        address _trustedGameContract
    ) {
        require(address(_eas) != address(0), "Invalid EAS address");
        require(_gameWinnerSchema != bytes32(0), "Invalid schema");
        require(_trustedGameContract != address(0), "Invalid game contract");

        eas = _eas;
        GAME_WINNER_SCHEMA = _gameWinnerSchema;
        trustedGameContract = _trustedGameContract;
    }

    /**
     * @notice Checks if a game winner attestation satisfies the reward claim requirements
     * @param obligation The attestation proving game winner status
     * @param demand The encoded demand specifying claim requirements
     * @param counteroffer Optional reference to a specific claim request
     * @return bool True if the attestation proves valid winner status for the claim
     */
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 counteroffer
    ) external view override returns (bool) {
        // Check basic attestation validity
        if (!obligation._checkIntrinsic()) return false;

        // Verify the attestation uses the correct schema
        if (obligation.schema != GAME_WINNER_SCHEMA) return false;

        // Verify the attestation was made by the trusted game contract
        if (obligation.attester != trustedGameContract) return false;

        // Check if the obligation references the specific counteroffer (if provided)
        if (counteroffer != bytes32(0) && obligation.refUID != counteroffer) {
            return false;
        }

        // Decode the attestation data
        GameWinnerData memory winnerData = abi.decode(
            obligation.data,
            (GameWinnerData)
        );

        // Decode the demand requirements
        ClaimDemand memory claimDemand = abi.decode(demand, (ClaimDemand));

        // Verify the game ID matches
        if (winnerData.gameId != claimDemand.gameId) return false;

        // Check minimum score requirement if specified
        if (
            claimDemand.minScore > 0 && winnerData.score < claimDemand.minScore
        ) {
            return false;
        }

        // Check validity timestamp if specified
        if (
            claimDemand.validAfter > 0 &&
            winnerData.timestamp < claimDemand.validAfter
        ) {
            return false;
        }

        // Verify the attestation recipient matches the winner
        // This ensures only the actual winner can use this attestation
        if (obligation.recipient != winnerData.winner) return false;

        // All checks passed - the winner can claim their reward
        return true;
    }

    /**
     * @notice Helper function to validate a winner attestation UID directly
     * @param attestationUID The UID of the winner attestation to validate
     * @param claimDemand The claim requirements to check against
     * @return bool True if the attestation is valid for the claim
     */
    function validateWinnerAttestation(
        bytes32 attestationUID,
        ClaimDemand memory claimDemand
    ) external view returns (bool) {
        Attestation memory attestation = eas.getAttestation(attestationUID);
        return
            this.checkObligation(
                attestation,
                abi.encode(claimDemand),
                bytes32(0)
            );
    }
}
