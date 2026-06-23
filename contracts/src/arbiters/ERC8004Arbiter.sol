// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";
import {BaseArbiter} from "../BaseArbiter.sol";
import {ArbiterUtils} from "../ArbiterUtils.sol";

/// @notice Minimal ERC-8004 ValidationRegistry interface used by `ERC8004Arbiter`.
interface IValidationRegistry {
    function getValidationStatus(bytes32 requestHash)
        external
        view
        returns (
            address validatorAddress,
            uint256 agentId,
            uint8 response,
            bytes32 responseHash,
            string memory tag,
            uint256 lastUpdate
        );
}

/**
 * @title ERC8004Arbiter
 * @notice Arbiter that wraps ERC-8004's ValidationRegistry.
 * @dev The DemandData specifies a minimum response uint8 (1-100).
 *      The validation requestHash is derived from the fulfillment attestation
 *      UID and caller-supplied binding data.
 */
contract ERC8004Arbiter is BaseArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand describing the registry lookup and minimum validation result.
    struct DemandData {
        /// @notice ERC-8004 ValidationRegistry contract to query.
        address validationRegistry;
        /// @notice Validator address that must have produced the response.
        address validatorAddress;
        /// @notice Minimum accepted response, from 1 through 100.
        uint8 minResponse;
        /// @notice Opaque caller-supplied bytes included in the validation request hash.
        bytes data;
    }

    /// @notice Raised when the minimum response is outside the supported 1-100 range.
    error InvalidMinResponse();
    /// @notice Raised when the registry has no validation for the derived request hash.
    error ValidationNotFound();
    /// @notice Raised when the registry response is below the requested minimum.
    error ResponseBelowMinimum();
    /// @notice Raised when the registry response came from a different validator.
    error ValidatorMismatch();
    /// @notice Raised when the fulfillment does not reference the escrow UID supplied by the escrow contract.
    error FulfillmentMustReferenceEscrow();

    /**
     * @notice Check if the validation response meets the minimum requirement
     * @param fulfillment The attestation representing the obligation
     * @param demand ABI-encoded DemandData containing registry address and min response
     * @param escrowUid The escrow UID that this fulfillment must reference
     * @return bool True if the validation response >= minResponse
     */
    function check(Attestation memory fulfillment, bytes memory demand, bytes32 escrowUid)
        public
        view
        override
        returns (bool)
    {
        DemandData memory demand_ = abi.decode(demand, (DemandData));

        // Ensure fulfillment references what it's escrowUid
        if (fulfillment.refUID != escrowUid) {
            revert FulfillmentMustReferenceEscrow();
        }

        // ValidationRegistry does not expose hasResponse, so response 0 is indistinguishable from pending.
        if (demand_.minResponse == 0 || demand_.minResponse > 100) revert InvalidMinResponse();

        bytes32 requestHash = requestHashFor(fulfillment.uid, demand_.data);

        // Query the ValidationRegistry
        IValidationRegistry registry = IValidationRegistry(demand_.validationRegistry);
        (
            address validatorAddress,, // agentId (unused)
            uint8 response,, // responseHash (unused)
            , // tag (unused)
            // lastUpdate (unused)
        ) = registry.getValidationStatus(requestHash);

        // Check if validation exists (validatorAddress != address(0))
        if (validatorAddress == address(0)) revert ValidationNotFound();

        // Check if validator matches expected validator
        if (validatorAddress != demand_.validatorAddress) {
            revert ValidatorMismatch();
        }

        // Check if response meets minimum requirement
        if (response < demand_.minResponse) revert ResponseBelowMinimum();

        return true;
    }

    /**
     * @notice Helper function to decode DemandData
     * @param data ABI-encoded DemandData
     * @return DemandData struct
     */
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    /// @notice Computes the ERC-8004 validation request hash used by this arbiter.
    /// @param uid Fulfillment attestation UID.
    /// @param data Opaque binding data from `DemandData`.
    function requestHashFor(bytes32 uid, bytes memory data) public pure returns (bytes32) {
        return keccak256(abi.encode(uid, data));
    }
}
