// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {SchemaResolver} from "@eas/resolver/SchemaResolver.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";

contract PayableResolver is SchemaResolver {
    uint256 public attestValue;
    uint256 public revokeValue;

    constructor(IEAS _eas) SchemaResolver(_eas) {}

    function isPayable() public pure override returns (bool) {
        return true;
    }

    function onAttest(Attestation calldata, uint256 value) internal override returns (bool) {
        attestValue += value;
        return true;
    }

    function onRevoke(Attestation calldata, uint256 value) internal override returns (bool) {
        revokeValue += value;
        return true;
    }
}
