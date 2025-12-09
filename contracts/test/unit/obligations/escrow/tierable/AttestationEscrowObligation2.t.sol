// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {AttestationEscrowObligation2} from "@src/obligations/escrow/tierable/AttestationEscrowObligation2.sol";
import {BaseEscrowObligationTierable} from "@src/BaseEscrowObligationTierable.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {MockArbiter} from "../../fixtures/MockArbiter.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract AttestationEscrowObligation2TierableTest is Test {
    AttestationEscrowObligation2 public escrowObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockArbiter public mockArbiter;

    address internal requester1;
    address internal requester2;
    address internal attester;
    bytes32 private preExistingAttestationId;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrowObligation = new AttestationEscrowObligation2(eas, schemaRegistry);
        mockArbiter = new MockArbiter(true);

        requester1 = makeAddr("requester1");
        requester2 = makeAddr("requester2");
        attester = makeAddr("attester");

        bytes32 testSchema = schemaRegistry.register("string data", ISchemaResolver(address(0)), true);

        vm.prank(attester);
        preExistingAttestationId = eas.attest(
            AttestationRequest({
                schema: testSchema,
                data: AttestationRequestData({
                    recipient: attester,
                    expirationTime: 0,
                    revocable: true,
                    refUID: bytes32(0),
                    data: abi.encode("pre-existing"),
                    value: 0
                })
            })
        );
    }

    function testDoObligation() public {
        vm.prank(requester1);
        bytes32 uid = escrowObligation.doObligation(
            AttestationEscrowObligation2.ObligationData({
                attestationUid: preExistingAttestationId,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        assertNotEq(uid, bytes32(0), "Attestation should be created");
    }

    function testTierableMultipleEscrowsOneFulfillment() public {
        // Create two escrows referencing same pre-existing attestation
        vm.prank(requester1);
        bytes32 escrow1Uid = escrowObligation.doObligation(
            AttestationEscrowObligation2.ObligationData({
                attestationUid: preExistingAttestationId,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        vm.prank(requester2);
        bytes32 escrow2Uid = escrowObligation.doObligation(
            AttestationEscrowObligation2.ObligationData({
                attestationUid: preExistingAttestationId,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        // Create single fulfillment
        StringObligation stringObligation = new StringObligation(eas, schemaRegistry);
        vm.prank(attester);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "fulfillment"}),
            bytes32(0)
        );

        // Collect both with same fulfillment - creates validation attestations
        vm.startPrank(attester);
        bytes32 validation1 = escrowObligation.collectEscrow(escrow1Uid, fulfillmentUid);
        bytes32 validation2 = escrowObligation.collectEscrow(escrow2Uid, fulfillmentUid);
        vm.stopPrank();

        // Verify both validation attestations were created
        assertNotEq(validation1, bytes32(0), "First validation should be created");
        assertNotEq(validation2, bytes32(0), "Second validation should be created");

        Attestation memory val1 = eas.getAttestation(validation1);
        Attestation memory val2 = eas.getAttestation(validation2);

        assertEq(val1.schema, escrowObligation.VALIDATION_SCHEMA(), "First validation has correct schema");
        assertEq(val2.schema, escrowObligation.VALIDATION_SCHEMA(), "Second validation has correct schema");
    }
}
