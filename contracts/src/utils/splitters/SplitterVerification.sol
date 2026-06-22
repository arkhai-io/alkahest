// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @notice Minimal escrow metadata interface used by splitter verification helpers.
interface ISplitterEscrowObligation {
    function ATTESTATION_SCHEMA() external view returns (bytes32);
}

/// @title SplitterVerification
/// @notice Shared attestation and balance-delta checks used by splitter contracts.
library SplitterVerification {
    using ArbiterUtils for Attestation;

    error InvalidEscrowAttestation();
    error InvalidFulfillmentRecipient();
    error InvalidCollectedAmount(uint256 expected, uint256 actual);
    error InvalidERC721Receipt(address token, uint256 tokenId);

    /// @notice Reverts unless the attestation is from `escrowContract` and passes intrinsic checks.
    function verifyEscrowAttestation(Attestation memory escrowAttestation, address escrowContract) internal view {
        if (
            escrowAttestation.attester != escrowContract
                || escrowAttestation.schema != ISplitterEscrowObligation(escrowContract).ATTESTATION_SCHEMA()
        ) {
            revert InvalidEscrowAttestation();
        }
        escrowAttestation._checkIntrinsic();
    }

    /// @notice Reverts unless the fulfillment is addressed to the calling splitter contract.
    function verifyFulfillmentRecipient(Attestation memory fulfillment) internal view {
        if (fulfillment.recipient != address(this)) revert InvalidFulfillmentRecipient();
    }

    /// @notice Reverts unless a balance increased by exactly `expected`.
    function verifyDelta(uint256 beforeBalance, uint256 afterBalance, uint256 expected) internal pure {
        if (afterBalance < beforeBalance) revert InvalidCollectedAmount(expected, 0);
        uint256 actual = afterBalance - beforeBalance;
        if (actual != expected) revert InvalidCollectedAmount(expected, actual);
    }
}
