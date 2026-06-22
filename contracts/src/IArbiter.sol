// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;
import {Attestation} from "@eas/Common.sol";

/// @title IArbiter
/// @notice Validates whether a fulfillment attestation satisfies an escrow's demand.
interface IArbiter {
    /// @notice Returns true when `fulfillment` satisfies `demand` for `escrowUid`.
    /// @param fulfillment The EAS attestation being used as fulfillment.
    /// @param demand Arbiter-specific demand data encoded by the escrow creator.
    /// @param escrowUid The UID of the escrow attestation being fulfilled.
    function check(Attestation memory fulfillment, bytes memory demand, bytes32 escrowUid) external view returns (bool);
}
