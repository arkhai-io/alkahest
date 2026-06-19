// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {ReferencesEscrowArbiter} from "@src/arbiters/ReferencesEscrowArbiter.sol";

contract ReferencesEscrowArbiterTest is Test {
    ReferencesEscrowArbiter arbiter;
    bytes32 escrowUid = bytes32(uint256(123));

    function setUp() public {
        arbiter = new ReferencesEscrowArbiter();
    }

    function testCheckObligationWithMatchingEscrowReference() public view {
        Attestation memory attestation = _attestationWithRefUID(escrowUid);

        bool result = arbiter.check(attestation, bytes(""), escrowUid);

        assertTrue(result, "Should accept fulfillment that references the escrow");
    }

    function testCheckObligationWithDifferentEscrowReferenceReverts() public {
        Attestation memory attestation = _attestationWithRefUID(bytes32(uint256(456)));

        vm.expectRevert(ReferencesEscrowArbiter.EscrowReferenceMismatch.selector);
        arbiter.check(attestation, bytes(""), escrowUid);
    }

    function testCheckObligationWithZeroFulfillingRevertsForRealFulfillment() public {
        Attestation memory attestation = _attestationWithRefUID(escrowUid);

        vm.expectRevert(ReferencesEscrowArbiter.EscrowReferenceMismatch.selector);
        arbiter.check(attestation, bytes(""), bytes32(0));
    }

    function _attestationWithRefUID(bytes32 refUID) internal view returns (Attestation memory) {
        return Attestation({
            uid: bytes32(uint256(1)),
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: refUID,
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });
    }
}
