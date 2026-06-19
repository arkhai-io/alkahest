// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

contract AllArbiter is IArbiter {
    // validates all base arbiters arbitrate true
    struct DemandData {
        address[] arbiters;
        bytes[] demands;
    }

    error MismatchedArrayLengths();
    error TooManyArbiters(uint256 provided, uint256 max);

    uint256 public constant MAX_ARBITERS = 50;

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

    function decodeDemandData(bytes calldata data) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
