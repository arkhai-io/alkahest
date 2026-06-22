// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title UidArbiter
/// @notice Accepts only a specific fulfillment attestation UID.
contract UidArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required fulfillment UID.
    struct DemandData {
        bytes32 uid;
    }

    error UidMismatched();

    /// @inheritdoc IArbiter
    function check(
        Attestation memory fulfillment,
        bytes memory demand,
        bytes32 /*escrowUid*/
    )
        public
        pure
        override
        returns (bool)
    {
        DemandData memory demand_ = abi.decode(demand, (DemandData));
        if (fulfillment.uid != demand_.uid) revert UidMismatched();

        return true;
    }

    /// @notice Decodes ABI-encoded UID demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
