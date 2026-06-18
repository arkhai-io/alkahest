// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

interface ISplitterEscrowObligation {
    function ATTESTATION_SCHEMA() external view returns (bytes32);
}

library SplitterVerification {
    using ArbiterUtils for Attestation;

    error InvalidEscrowAttestation();
    error InvalidFulfillmentRecipient();
    error InvalidCollectedAmount(uint256 expected, uint256 actual);
    error InvalidERC721Receipt(address token, uint256 tokenId);

    function verifyEscrowAttestation(Attestation memory escrowAttestation, address escrowContract) internal view {
        if (
            escrowAttestation.attester != escrowContract
                || escrowAttestation.schema != ISplitterEscrowObligation(escrowContract).ATTESTATION_SCHEMA()
        ) {
            revert InvalidEscrowAttestation();
        }
        escrowAttestation._checkIntrinsic();
    }

    function verifyFulfillmentRecipient(Attestation memory fulfillment) internal view {
        if (fulfillment.recipient != address(this)) revert InvalidFulfillmentRecipient();
    }

    function verifyDelta(uint256 beforeBalance, uint256 afterBalance, uint256 expected) internal pure {
        if (afterBalance < beforeBalance) revert InvalidCollectedAmount(expected, 0);
        uint256 actual = afterBalance - beforeBalance;
        if (actual != expected) revert InvalidCollectedAmount(expected, actual);
    }
}
