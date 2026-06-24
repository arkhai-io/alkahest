// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {BaseArbiter} from "../../BaseArbiter.sol";
import {ArbiterUtils} from "../../libraries/ArbiterUtils.sol";

/// @title RefUidArbiter
/// @notice Accepts fulfillments with a specific EAS `refUID`.
contract RefUidArbiter is BaseArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required referenced attestation UID.
    struct DemandData {
        bytes32 refUID;
    }

    error RefUidMismatched();

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
        if (fulfillment.refUID != demand_.refUID) revert RefUidMismatched();

        return true;
    }

    /// @notice Decodes ABI-encoded refUID demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
