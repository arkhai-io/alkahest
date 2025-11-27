// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";
import {ArbiterUtils} from "../ArbiterUtils.sol";

interface IValidationRegistry {
    function getValidationStatus(
        bytes32 requestHash
    )
        external
        view
        returns (
            address validatorAddress,
            uint256 agentId,
            uint8 response,
            bytes32 tag,
            uint256 lastUpdate
        );
}

/**
 * @title ValidationRegistryArbiter
 * @notice Arbiter that wraps ERC-8004's ValidationRegistry
 * @dev The DemandData specifies a minimum response uint8 (0-100)
 *      The fulfillment attestation's UID is used as the requestHash
 *      in the ValidationRegistry's getValidationStatus call
 */
contract ERC8004Arbiter is IArbiter {
    using ArbiterUtils for Attestation;

    struct DemandData {
        address validationRegistry;
        address validatorAddress;
        uint8 minResponse;
    }

    error InvalidMinResponse();
    error ValidationNotFound();
    error ResponseBelowMinimum();
    error ValidatorMismatch();
    error FulfillmentMustReferenceEscrow();

    /**
     * @notice Check if the validation response meets the minimum requirement
     * @param obligation The attestation representing the obligation
     * @param demand ABI-encoded DemandData containing registry address and min response
     * @param fulfilling The escrow UID that this obligation must reference
     * @return bool True if the validation response >= minResponse
     */
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 fulfilling
    ) public view override returns (bool) {
        DemandData memory demand_ = abi.decode(demand, (DemandData));

        // Ensure obligation references what it's fulfilling
        if (obligation.refUID != fulfilling)
            revert FulfillmentMustReferenceEscrow();

        // Validate minResponse is in valid range
        if (demand_.minResponse > 100) revert InvalidMinResponse();

        // Use the obligation UID as the requestHash
        bytes32 requestHash = obligation.uid;

        // Query the ValidationRegistry
        IValidationRegistry registry = IValidationRegistry(
            demand_.validationRegistry
        );
        (
            address validatorAddress, // agentId (unused)
            ,
            uint8 response, // tag (unused)
            ,

        ) = // lastUpdate (unused)
            registry.getValidationStatus(requestHash);

        // Check if validation exists (validatorAddress != address(0))
        if (validatorAddress == address(0)) revert ValidationNotFound();

        // Check if validator matches expected validator
        if (validatorAddress != demand_.validatorAddress)
            revert ValidatorMismatch();

        // Check if response meets minimum requirement
        if (response < demand_.minResponse) revert ResponseBelowMinimum();

        return true;
    }

    /**
     * @notice Helper function to decode DemandData
     * @param data ABI-encoded DemandData
     * @return DemandData struct
     */
    function decodeDemandData(
        bytes calldata data
    ) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
