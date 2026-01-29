// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {AttestationEscrowObligation} from "@src/obligations/escrow/tierable/AttestationEscrowObligation.sol";
import {BaseEscrowObligationTierable} from "@src/BaseEscrowObligationTierable.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {MockArbiter} from "../../fixtures/MockArbiter.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry, SchemaRecord} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract AttestationEscrowObligationTierableTest is Test {
    AttestationEscrowObligation public escrowObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockArbiter public mockArbiter;

    address internal requester1;
    address internal requester2;
    address internal attester;
    bytes32 private testSchemaId;
    uint64 constant EXPIRATION_TIME = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrowObligation = new AttestationEscrowObligation(eas, schemaRegistry);
        mockArbiter = new MockArbiter(true);

        requester1 = makeAddr("requester1");
        requester2 = makeAddr("requester2");
        attester = makeAddr("attester");

        testSchemaId = schemaRegistry.register("string testData", ISchemaResolver(address(0)), true);
    }

    function createTestAttestationRequest() internal view returns (AttestationRequest memory) {
        return AttestationRequest({
            schema: testSchemaId,
            data: AttestationRequestData({
                recipient: attester,
                expirationTime: 0,
                revocable: true,
                refUID: bytes32(0),
                data: abi.encode("test data"),
                value: 0
            })
        });
    }

    function testDoObligation() public {
        vm.prank(requester1);
        bytes32 uid = escrowObligation.doObligation(
            AttestationEscrowObligation.ObligationData({
                attestation: createTestAttestationRequest(),
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        assertNotEq(uid, bytes32(0), "Attestation should be created");
    }

    function testTierableMultipleEscrowsOneFulfillment() public {
        // Create two escrows with same attestation request
        AttestationRequest memory req = createTestAttestationRequest();

        vm.prank(requester1);
        bytes32 escrow1Uid = escrowObligation.doObligation(
            AttestationEscrowObligation.ObligationData({
                attestation: req,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        vm.prank(requester2);
        bytes32 escrow2Uid = escrowObligation.doObligation(
            AttestationEscrowObligation.ObligationData({
                attestation: req,
                arbiter: address(mockArbiter),
                demand: abi.encode("test")
            }),
            uint64(block.timestamp + EXPIRATION_TIME)
        );

        // Create single fulfillment
        StringObligation stringObligation = new StringObligation(eas, schemaRegistry);
        vm.prank(attester);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({item: "fulfillment", schema: bytes32(0)}),
            bytes32(0)
        );

        // Collect both with same fulfillment - this creates the escrowed attestations
        vm.startPrank(attester);
        bytes32 result1 = escrowObligation.collectEscrow(escrow1Uid, fulfillmentUid);
        bytes32 result2 = escrowObligation.collectEscrow(escrow2Uid, fulfillmentUid);
        vm.stopPrank();

        // Verify both attestations were created
        assertNotEq(result1, bytes32(0), "First attestation should be created");
        assertNotEq(result2, bytes32(0), "Second attestation should be created");

        Attestation memory att1 = eas.getAttestation(result1);
        Attestation memory att2 = eas.getAttestation(result2);

        assertTrue(att1.uid != bytes32(0), "First attestation should exist");
        assertTrue(att2.uid != bytes32(0), "Second attestation should exist");
    }
}
