// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";
import {BaseArbiter} from "../BaseArbiter.sol";

/// @title ReferencesEscrowArbiter
/// @notice Accepts fulfillments whose `refUID` is the escrow UID being collected.
/// @dev Security note: This contract has not been included in professional manual audits and
///      has only been reviewed by automated audit tooling so far.
contract ReferencesEscrowArbiter is BaseArbiter {
    /// @notice Raised when the fulfillment does not reference the escrow UID supplied by the escrow contract.
    error EscrowReferenceMismatch();

    /// @inheritdoc IArbiter
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
