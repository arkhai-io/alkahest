// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;
import {Attestation} from "@eas/Common.sol";

interface IArbiter {
    function check(Attestation memory fulfillment, bytes memory demand, bytes32 escrowUid)
        external
        view
        returns (bool);
}
