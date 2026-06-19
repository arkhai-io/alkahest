// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";
import {ArbiterUtils} from "../ArbiterUtils.sol";

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
 * @title ValidationRegistryArbiter
 * @notice Arbiter that wraps ERC-8004's ValidationRegistry
 * @dev The DemandData specifies a minimum response uint8 (1-100)
 *      The validation requestHash is derived from the fulfillment attestation
 *      UID and caller-supplied binding data.
 */
contract ERC8004Arbiter is IArbiter {
    using ArbiterUtils for Attestation;

    struct DemandData {
        address validationRegistry;
        address validatorAddress;
        uint8 minResponse;
        bytes data;
    }

    error InvalidMinResponse();
    error ValidationNotFound();
    error ResponseBelowMinimum();
    error ValidatorMismatch();
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

    function requestHashFor(bytes32 uid, bytes memory data) public pure returns (bytes32) {
        return keccak256(abi.encode(uid, data));
    }
}
