// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title RecipientArbiter
/// @notice Accepts fulfillments with a specific EAS recipient.
contract RecipientArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand specifying the required fulfillment recipient.
    struct DemandData {
        address recipient;
    }

    error RecipientMismatched();

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
        if (fulfillment.recipient != demand_.recipient) {
            revert RecipientMismatched();
        }

        return true;
    }

    /// @notice Decodes ABI-encoded recipient demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
