// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {BaseArbiter} from "../../BaseArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title SchemaArbiter
/// @notice Accepts fulfillments with a specific EAS schema UID.
contract SchemaArbiter is BaseArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required schema UID.
    struct DemandData {
        bytes32 schema;
    }

    error SchemaMismatched();

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
        if (fulfillment.schema != demand_.schema) revert SchemaMismatched();

        return true;
    }

    /// @notice Decodes ABI-encoded schema demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
