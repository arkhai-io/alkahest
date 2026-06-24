// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";
import {BaseArbiter} from "../BaseArbiter.sol";
import {ArbiterUtils} from "../libraries/ArbiterUtils.sol";

/// @title IntrinsicsArbiter
/// @notice Accepts fulfillments that pass the shared intrinsic attestation checks.
/// @dev Reverts through `ArbiterUtils` if the fulfillment UID is zero, expired, or revoked.
contract IntrinsicsArbiter is BaseArbiter {
    using ArbiterUtils for Attestation;

    /// @inheritdoc IArbiter
    function check(
        Attestation memory fulfillment,
        bytes memory,
        /*demand*/
        bytes32 /*escrowUid*/
    )
        public
        view
        override
        returns (bool)
    {
        return fulfillment._checkIntrinsic();
    }
}
