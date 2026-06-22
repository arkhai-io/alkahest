// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title TimeEqualArbiter
/// @notice Accepts fulfillments with an exact EAS creation timestamp.
contract TimeEqualArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required creation timestamp.
    struct DemandData {
        uint64 time;
    }

    error TimeNotEqual();

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
        if (fulfillment.time != demand_.time) revert TimeNotEqual();

        return true;
    }

    /// @notice Decodes ABI-encoded creation-time demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
