// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {BaseArbiter} from "../../BaseArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title ExpirationTimeEqualArbiter
/// @notice Accepts fulfillments with an exact expiration timestamp.
contract ExpirationTimeEqualArbiter is BaseArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required expiration timestamp.
    struct DemandData {
        uint64 expirationTime;
    }

    error ExpirationTimeNotEqual();

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
        if (fulfillment.expirationTime != demand_.expirationTime) {
            revert ExpirationTimeNotEqual();
        }

        return true;
    }

    /// @notice Decodes ABI-encoded expiration-time demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
