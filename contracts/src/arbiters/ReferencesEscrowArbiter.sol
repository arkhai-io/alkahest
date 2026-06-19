// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";

/// @notice Checks that the fulfillment attestation references the escrow being fulfilled.
contract ReferencesEscrowArbiter is IArbiter {
    error EscrowReferenceMismatch();

    function check(
        Attestation memory fulfillment,
        bytes memory,
        /* demand */
        bytes32 escrowUid
    )
        public
        pure
        override
        returns (bool)
    {
        if (fulfillment.refUID != escrowUid) revert EscrowReferenceMismatch();
        return true;
    }
}
