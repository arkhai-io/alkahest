// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {BaseArbiter} from "../../BaseArbiter.sol";
import {ArbiterUtils} from "../../libraries/ArbiterUtils.sol";
import {StringObligation} from "../../obligations/StringObligation.sol";

/**
 * @title StringCapitalizer
 * @notice Single-transaction arbiter that validates if a string has been properly capitalized
 * @dev Works with StringObligation attestations where the demand is a query for a string to capitalize,
 *      and check verifies if the fulfillment is the capitalized version of the string
 */
contract StringCapitalizer is BaseArbiter {
    using ArbiterUtils for Attestation;

    /**
     * @notice Struct for demand data containing the string to be capitalized
     * @param query The string that needs to be capitalized
     */
    struct DemandData {
        string query;
    }

    /**
     * @notice Checks if an fulfillment fulfills the capitalization requirement
     * @param fulfillment The attestation containing the capitalized string
     * @param demand The encoded demand data containing the original string
     * @param escrowUid Optional reference UID for what this fulfillment is escrowUid
     * @return bool True if the fulfillment contains the properly capitalized version of the demand string
     */
    function check(Attestation memory fulfillment, bytes memory demand, bytes32 escrowUid)
        external
        view
        override
        returns (bool)
    {
        // Check basic attestation validity

        // Check if the fulfillment references what it's escrowUid (if provided)
        if (escrowUid != bytes32(0) && fulfillment.refUID != escrowUid) {
            return false;
        }

        // Decode the fulfillment data to get the potentially capitalized string
        StringObligation.ObligationData memory obligationData =
            abi.decode(fulfillment.data, (StringObligation.ObligationData));

        // Decode the demand data to get the original query string
        DemandData memory demandData = abi.decode(demand, (DemandData));

        // Check if the fulfillment item is the capitalized version of the query
        return _isCapitalized(demandData.query, obligationData.item);
    }

    /**
     * @notice Internal function to check if result is the capitalized version of query
     * @param query The original string
     * @param result The potentially capitalized string
     * @return bool True if result is the properly capitalized version of query
     */
    function _isCapitalized(string memory query, string memory result) internal pure returns (bool) {
        bytes memory queryBytes = bytes(query);
        bytes memory resultBytes = bytes(result);

        // Strings must be the same length
        if (queryBytes.length != resultBytes.length) return false;

        // Check each character
        for (uint256 i = 0; i < queryBytes.length; i++) {
            uint8 queryChar = uint8(queryBytes[i]);
            uint8 resultChar = uint8(resultBytes[i]);

            // Check if query character is lowercase letter (a-z)
            if (queryChar >= 0x61 && queryChar <= 0x7A) {
                // Result should be the uppercase version (A-Z)
                if (resultChar != queryChar - 32) {
                    return false;
                }
            } else {
                // Non-lowercase characters should remain unchanged
                if (resultChar != queryChar) {
                    return false;
                }
            }
        }

        return true;
    }
}
