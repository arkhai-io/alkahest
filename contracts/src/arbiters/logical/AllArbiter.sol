// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {BaseArbiter} from "../../BaseArbiter.sol";
import {ArbiterUtils} from "../../libraries/ArbiterUtils.sol";

/// @title AllArbiter
/// @notice Accepts a fulfillment only when every child arbiter accepts it.
/// @dev Empty child arrays return true, matching standard all-of semantics.
contract AllArbiter is BaseArbiter {
    /// @notice Child arbiters and their positionally matching demand bytes.
    struct DemandData {
        /// @notice Child arbiter contracts to query.
        address[] arbiters;
        /// @notice ABI-encoded demand passed to each child arbiter by index.
        bytes[] demands;
    }

    /// @notice Raised when child arbiter and demand arrays are not the same length.
    error MismatchedArrayLengths();
    /// @notice Raised when the child arbiter list exceeds `MAX_ARBITERS`.
    error TooManyArbiters(uint256 provided, uint256 max);

    /// @notice Maximum number of child arbiters allowed in one demand.
    uint256 public constant MAX_ARBITERS = 50;

    /// @inheritdoc IArbiter
    function check(Attestation memory fulfillment, bytes memory demand, bytes32 escrowUid)
        public
        view
        override
        returns (bool)
    {
        DemandData memory demand_ = abi.decode(demand, (DemandData));
        if (demand_.arbiters.length != demand_.demands.length) {
            revert MismatchedArrayLengths();
        }
        if (demand_.arbiters.length > MAX_ARBITERS) {
            revert TooManyArbiters(demand_.arbiters.length, MAX_ARBITERS);
        }

        for (uint256 i = 0; i < demand_.arbiters.length; i++) {
            if (
                // can throw, since some arbiters throw with failure case instead of returning false
                // error must be checked against all base arbiters
                !IArbiter(demand_.arbiters[i]).check(fulfillment, demand_.demands[i], escrowUid)
            ) {
                return false;
            }
        }
        return true;
    }

    /// @notice Decodes ABI-encoded all-of demand data.
    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
