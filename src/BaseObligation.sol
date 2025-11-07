// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {BaseAttester} from "./BaseAttester.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {Attestation} from "@eas/Common.sol";

abstract contract BaseObligation is BaseAttester {
    constructor(
        IEAS _eas,
        ISchemaRegistry _schemaRegistry,
        string memory schema,
        bool revocable
    ) BaseAttester(_eas, _schemaRegistry, schema, revocable) {}

    // Base implementation with raw bytes
    function doObligationRaw(
        bytes calldata data,
        uint64 expirationTime,
        bytes32 refUID
    ) public payable virtual returns (bytes32 uid_) {
        uid_ = _doObligationForRaw(
            data,
            expirationTime,
            msg.sender,
            refUID
        );
    }

    function _doObligationForRaw(
        bytes memory data,
        uint64 expirationTime,
        address recipient,
        bytes32 refUID
    ) internal virtual returns (bytes32 uid_) {
        _beforeAttest(data, msg.sender, recipient);
        uid_ = _attest(data, recipient, expirationTime, refUID);
        _afterAttest(uid_, data, msg.sender, recipient);
    }

    // Hooks for obligations to implement
    function _beforeAttest(
        bytes memory data,
        address payer,
        address recipient
    ) internal virtual {}

    function _afterAttest(
        bytes32 uid,
        bytes memory data,
        address payer,
        address recipient
    ) internal virtual {}
}
