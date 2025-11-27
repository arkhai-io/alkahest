// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {NonexclusiveRevocableConfirmationArbiter} from "@src/arbiters/confirmation/NonexclusiveRevocableConfirmationArbiter.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract NonexclusiveRevocableConfirmationArbiterTest is Test {
    NonexclusiveRevocableConfirmationArbiter arbiter;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    bytes32 public testSchema;

    address confirmer = makeAddr("confirmer");
    address fulfiller = makeAddr("fulfiller");
    address otherUser = makeAddr("otherUser");

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();
        arbiter = new NonexclusiveRevocableConfirmationArbiter(eas);

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

        // Confirm as the escrow recipient
        vm.prank(confirmer);
        vm.expectEmit(true, true, false, true);
        emit NonexclusiveRevocableConfirmationArbiter.ConfirmationMade(fulfillmentUid, escrowUid);
        arbiter.confirm(fulfillmentUid, escrowUid);

        // Now confirmed
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid));
    }

    function testConfirmUnauthorized() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Try to confirm as non-recipient
        vm.prank(otherUser);
        vm.expectRevert(NonexclusiveRevocableConfirmationArbiter.UnauthorizedConfirmation.selector);
        arbiter.confirm(fulfillmentUid, escrowUid);
    }

    function testRevoke() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        vm.startPrank(confirmer);

        // Confirm first
        arbiter.confirm(fulfillmentUid, escrowUid);
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid));

        // Revoke
        vm.expectEmit(true, true, false, true);
        emit NonexclusiveRevocableConfirmationArbiter.ConfirmationRevoked(fulfillmentUid, escrowUid);
        arbiter.revoke(fulfillmentUid, escrowUid);

        assertFalse(arbiter.confirmations(fulfillmentUid, escrowUid));

        vm.stopPrank();
    }

    function testRevokeUnauthorized() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Confirm as confirmer
        vm.prank(confirmer);
        arbiter.confirm(fulfillmentUid, escrowUid);

        // Try to revoke as non-recipient
        vm.prank(otherUser);
        vm.expectRevert(NonexclusiveRevocableConfirmationArbiter.UnauthorizedRevocation.selector);
        arbiter.revoke(fulfillmentUid, escrowUid);
    }

    function testRevokeNoConfirmation() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Try to revoke without confirming first
        vm.prank(confirmer);
        vm.expectRevert(NonexclusiveRevocableConfirmationArbiter.NoConfirmationToRevoke.selector);
        arbiter.revoke(fulfillmentUid, escrowUid);
    }

    function testConfirmAfterRevoke() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        vm.startPrank(confirmer);

        // Confirm, revoke, then confirm again
        arbiter.confirm(fulfillmentUid, escrowUid);
        arbiter.revoke(fulfillmentUid, escrowUid);
        arbiter.confirm(fulfillmentUid, escrowUid);

        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid));

        vm.stopPrank();
    }

    function testConfirmMultipleFulfillmentsForSameEscrow() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid1 = _createAttestation(fulfiller, address(0), bytes32(0));
        bytes32 fulfillmentUid2 = _createAttestation(fulfiller, address(0), bytes32(0));

        vm.startPrank(confirmer);

        // Confirm first fulfillment
        arbiter.confirm(fulfillmentUid1, escrowUid);
        assertTrue(arbiter.confirmations(fulfillmentUid1, escrowUid));

        // Confirm second fulfillment for same escrow (nonexclusive allows this)
        arbiter.confirm(fulfillmentUid2, escrowUid);
        assertTrue(arbiter.confirmations(fulfillmentUid2, escrowUid));

        vm.stopPrank();
    }

    function testConfirmSameFulfillmentForMultipleEscrows() public {
        bytes32 escrowUid1 = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 escrowUid2 = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        vm.startPrank(confirmer);

        // Confirm fulfillment for first escrow
        arbiter.confirm(fulfillmentUid, escrowUid1);
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid1));
        assertFalse(arbiter.confirmations(fulfillmentUid, escrowUid2));

        // Confirm same fulfillment for second escrow
        arbiter.confirm(fulfillmentUid, escrowUid2);
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid1));
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid2));

        vm.stopPrank();
    }

    function testRequestConfirmation() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Request as attester of fulfillment
        vm.prank(fulfiller);
        vm.expectEmit(true, true, true, true);
        emit NonexclusiveRevocableConfirmationArbiter.ConfirmationRequested(fulfillmentUid, confirmer, escrowUid);
        arbiter.requestConfirmation(fulfillmentUid, escrowUid);
    }

    function testRequestConfirmationUnauthorized() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Try to request as neither attester nor recipient of fulfillment
        vm.prank(otherUser);
        vm.expectRevert(NonexclusiveRevocableConfirmationArbiter.UnauthorizedConfirmationRequest.selector);
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

        // Revoke
        vm.prank(confirmer);
        arbiter.revoke(fulfillmentUid, escrowUid);

        // After revoke, should be false again
        assertFalse(arbiter.checkObligation(fulfillment, bytes(""), escrowUid));
    }
}
