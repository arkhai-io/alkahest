// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {NonexclusiveUnrevocableConfirmationArbiter} from "@src/arbiters/confirmation/NonexclusiveUnrevocableConfirmationArbiter.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract NonexclusiveUnrevocableConfirmationArbiterTest is Test {
    NonexclusiveUnrevocableConfirmationArbiter arbiter;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    bytes32 public testSchema;

    address confirmer = makeAddr("confirmer");
    address fulfiller = makeAddr("fulfiller");
    address otherUser = makeAddr("otherUser");

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();
        arbiter = new NonexclusiveUnrevocableConfirmationArbiter(eas);

        // Register a test schema
        testSchema = schemaRegistry.register(
            "string item, bytes32 schema",
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
        emit NonexclusiveUnrevocableConfirmationArbiter.ConfirmationMade(fulfillmentUid, escrowUid);
        arbiter.confirm(fulfillmentUid, escrowUid);

        // Now confirmed
        assertTrue(arbiter.confirmations(fulfillmentUid, escrowUid));
    }

    function testConfirmUnauthorized() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Try to confirm as non-recipient
        vm.prank(otherUser);
        vm.expectRevert(NonexclusiveUnrevocableConfirmationArbiter.UnauthorizedConfirmation.selector);
        arbiter.confirm(fulfillmentUid, escrowUid);
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
        emit NonexclusiveUnrevocableConfirmationArbiter.ConfirmationRequested(fulfillmentUid, confirmer, escrowUid);
        arbiter.requestConfirmation(fulfillmentUid, escrowUid);
    }

    function testRequestConfirmationUnauthorized() public {
        bytes32 escrowUid = _createAttestation(address(this), confirmer, bytes32(0));
        bytes32 fulfillmentUid = _createAttestation(fulfiller, address(0), bytes32(0));

        // Try to request as neither attester nor recipient of fulfillment
        vm.prank(otherUser);
        vm.expectRevert(NonexclusiveUnrevocableConfirmationArbiter.UnauthorizedConfirmationRequest.selector);
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
}
