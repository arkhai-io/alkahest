// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title TimeAfterArbiter
/// @notice Accepts fulfillments whose creation time is at or after a demanded timestamp.
contract TimeAfterArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the minimum allowed creation timestamp.
    struct DemandData {
        uint64 time;
    }

    error TimeNotAfter();

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
        // 0 is a sentinel value meaning "after anything" (no constraint)
        if (demand_.time != 0 && fulfillment.time < demand_.time) {
            revert TimeNotAfter();
        }

        return true;
    }

    /// @notice Decodes ABI-encoded creation-time demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
