// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {BaseArbiter} from "../../BaseArbiter.sol";
import {ArbiterUtils} from "../../libraries/ArbiterUtils.sol";

/// @title RevocableArbiter
/// @notice Accepts fulfillments whose revocability matches demand data.
contract RevocableArbiter is BaseArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required EAS revocability flag.
    struct DemandData {
        bool revocable;
    }

    error RevocabilityMismatched();

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
        if (fulfillment.revocable != demand_.revocable) {
            revert RevocabilityMismatched();
        }

        return true;
    }

    /// @notice Decodes ABI-encoded revocability demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
