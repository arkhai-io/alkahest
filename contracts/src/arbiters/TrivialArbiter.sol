// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../IArbiter.sol";
import {ArbiterUtils} from "../ArbiterUtils.sol";

/// @title TrivialArbiter
/// @notice Arbiter that accepts every fulfillment.
/// @dev Intended for development, tests, or deliberately unconditional escrow demands.
contract TrivialArbiter is IArbiter {
    /// @inheritdoc IArbiter
    function check(
        Attestation memory,
        /*obligation*/
        bytes memory,
        /*demand*/
        bytes32 /*escrowUid*/
    )
        public
        pure
        override
        returns (bool)
    {
        return true;
    }
}
