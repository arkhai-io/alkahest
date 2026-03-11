// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {TokenBundleSplitterBase} from "./TokenBundleSplitterBase.sol";

/// @notice Token bundle splitter without validation of split totals.
///         Cheaper oracle calls, but incorrect splits will only surface
///         as reverts during collectAndDistribute (over-allocation) or
///         stranded tokens in the splitter (under-allocation).
contract TokenBundleSplitterUnvalidated is TokenBundleSplitterBase {
    constructor(IEAS _eas) TokenBundleSplitterBase(_eas) {}

    /// @notice Oracle submits a split decision without validation.
    ///         Only checks for empty splits and zero-address recipients.
    function arbitrate(
        bytes32 obligation,
        BundleSplit[] calldata splits
    ) external override {
        Attestation memory escrow = eas.getAttestation(obligation);
        EscrowObligationData memory escrowData = abi.decode(
            escrow.data,
            (EscrowObligationData)
        );

        bytes32 decisionKey = keccak256(
            abi.encodePacked(obligation, escrowData.demand)
        );

        _storeDecision(msg.sender, decisionKey, splits);

        emit ArbitrationMade(decisionKey, obligation, msg.sender);
    }
}
