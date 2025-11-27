// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {ExclusiveUnrevocableConfirmationArbiter} from "@src/arbiters/confirmation/ExclusiveUnrevocableConfirmationArbiter.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract ExclusiveUnrevocableConfirmationArbiterTest is Test {
    ExclusiveUnrevocableConfirmationArbiter arbiter;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    bytes32 public testSchema;

    address confirmer = makeAddr("confirmer");
    address fulfiller = makeAddr("fulfiller");
    address otherUser = makeAddr("otherUser");

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();
        arbiter = new ExclusiveUnrevocableConfirmationArbiter(eas);

        // Register a test schema
        testSchema = schemaRegistry.register(
            "string item",
            ISchemaResolver(address(0)),
            true
        );
    }

    function _createAttestation(address attester, address recipient, bytes32 refUID) internal returns (bytes32) {
        vm.prank(attester);
        return eas.attest(AttestationRequest({
            schema: testSchema,
            data: AttestationRequestData({
                recipient: recipient,
                expirationTime: 0,
                revocable: true,
                refUID: refUID,
                data: abi.encode("test"),
                value: 0
            })
        }));
    }

    function testConfirm() public {
        // Create escrow attestation with confirmer as recipient
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        // Create fulfillment attestation
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Initially not confirmed
        assertFalse(arbiter.confirmations(fulfillmentUid, escrowUid));
        assertFalse(arbiter.escrowConfirmed(escrowUid));

        // Confirm as the escrow recipient
        vm.prank(confirmer);
        vm.expectEmit(true, true, false, true);
        emit ExclusiveUnrevocableConfirmationArbiter.ConfirmationMade(fulfillmentUid, escrowUid);
        arbiter.confirm(fulfillmentUid, escrowUid);

        // Now confirmed
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid));
        assertTrue(arbiter.escrowConfirmed(escrowUid));
    }

    function testConfirmUnauthorized() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Try to confirm as non-recipient
        vm.prank(otherUser);
        vm.expectRevert(ExclusiveUnrevocableConfirmationArbiter.UnauthorizedConfirmation.selector);
        arbiter.confirm(fulfillmentUid, escrowUid);
    }

    function testConfirmSecondFulfillmentForSameEscrowReverts() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid1 = _createAttestation(fulfiller, address(0), bytes32(0));
        bytes32 fulfillmentUid2 = _createAttestation(fulfiller, address(0), bytes32(0));

        vm.startPrank(confirmer);

        // Confirm first fulfillment
        arbiter.confirm(fulfillmentUid1, escrowUid);

        // Try to confirm second fulfillment for same escrow (exclusive should reject)
        vm.expectRevert(ExclusiveUnrevocableConfirmationArbiter.EscrowAlreadyConfirmed.selector);
        arbiter.confirm(fulfillmentUid2, escrowUid);

        vm.stopPrank();
    }

    function testConfirmSameFulfillmentForDifferentEscrows() public {
        bytes32 escrowUid1 = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 escrowUid2 = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        vm.startPrank(confirmer);

        // Confirm fulfillment for first escrow
        arbiter.confirm(fulfillmentUid, escrowUid1);

        // Confirm same fulfillment for second escrow (should work - different escrows)
        arbiter.confirm(fulfillmentUid, escrowUid2);

        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid1));
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid2));

        vm.stopPrank();
    }

    function testReconfirmSameFulfillmentForSameEscrow() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        vm.startPrank(confirmer);

        // Confirm
        arbiter.confirm(fulfillmentUid, escrowUid);

        // Confirming same fulfillment again should revert because escrowConfirmed is true
        vm.expectRevert(ExclusiveUnrevocableConfirmationArbiter.EscrowAlreadyConfirmed.selector);
        arbiter.confirm(fulfillmentUid, escrowUid);

        vm.stopPrank();
    }

    function testRequestConfirmation() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Request as attester of fulfillment
        vm.prank(fulfiller);
        vm.expectEmit(true, true, true, true);
        emit ExclusiveUnrevocableConfirmationArbiter.ConfirmationRequested(fulfillmentUid, confirmer, escrowUid);
        arbiter.requestConfirmation(fulfillmentUid, escrowUid);
    }

    function testRequestConfirmationUnauthorized() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Try to request as neither attester nor recipient of fulfillment
        vm.prank(otherUser);
        vm.expectRevert(ExclusiveUnrevocableConfirmationArbiter.UnauthorizedConfirmationRequest.selector);
        arbiter.requestConfirmation(fulfillmentUid, escrowUid);
    }

    function testCheckObligation() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 escrowUid2 = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);

        // Not confirmed yet
        assertFalse(arbiter.checkObligation(fulfillment, bytes(""), escrowUid));

        // Confirm
        vm.prank(confirmer);
        arbiter.confirm(fulfillmentUid, escrowUid);

        // Now confirmed
        assertTrue(arbiter.checkObligation(fulfillment, bytes(""), escrowUid));

        // Different escrow should still be false
        assertFalse(arbiter.checkObligation(fulfillment, bytes(""), escrowUid2));
    }

    function testCheckObligationForUnconfirmedFulfillment() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid1 = _createAttestation(fulfiller, address(0), bytes32(0));
        bytes32 fulfillmentUid2 = _createAttestation(fulfiller, address(0), bytes32(0));

        // Confirm fulfillmentUid1
        vm.prank(confirmer);
        arbiter.confirm(fulfillmentUid1, escrowUid);

        // Check fulfillmentUid2 which was not confirmed
        Attestation memory fulfillment2 = eas.getAttestation(fulfillmentUid2);

        assertFalse(arbiter.checkObligation(fulfillment2, bytes(""), escrowUid));
    }
}
