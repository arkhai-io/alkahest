// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";

/// @notice Checks that the fulfillment attestation references the escrow being fulfilled.
contract ReferencesEscrowArbiter is IArbiter {
    error EscrowReferenceMismatch();

    function checkObligation(
        Attestation memory obligation,
        bytes memory,
        /* demand */
        bytes32 fulfilling
    )
        public
        pure
        override
        returns (bool)
    {
        if (obligation.refUID != fulfilling) revert EscrowReferenceMismatch();
        return true;
    }
}
