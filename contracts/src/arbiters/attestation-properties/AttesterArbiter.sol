// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title AttesterArbiter
/// @notice Accepts fulfillments with a specific EAS attester.
contract AttesterArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required fulfillment attester.
    struct DemandData {
        address attester;
    }

    error AttesterMismatched();

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
        if (fulfillment.attester != demand_.attester) revert AttesterMismatched();

        return true;
    }

    /// @notice Decodes ABI-encoded attester demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
