// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {AttestationRequest, AttestationRequestData, IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {TrivialArbiter} from "@src/arbiters/TrivialArbiter.sol";
import {
    AttestationReferenceEscrowObligation
} from "@src/obligations/escrow/default/AttestationReferenceEscrowObligation.sol";
import {AtomicAttestationUtils} from "@src/utils/atomic/AtomicAttestationUtils.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract AtomicAttestationUtilsTest is Test {
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    TrivialArbiter public trivialArbiter;
    AttestationReferenceEscrowObligation public referenceEscrow;
    AtomicAttestationUtils public atomicUtils;

    uint256 internal constant ALICE_PRIVATE_KEY = 0xa11ce;

    address public alice;
    bytes32 public testSchema;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        alice = vm.addr(ALICE_PRIVATE_KEY);
        trivialArbiter = new TrivialArbiter();
        referenceEscrow = new AttestationReferenceEscrowObligation(eas, schemaRegistry);
        atomicUtils = new AtomicAttestationUtils(eas);

        testSchema = schemaRegistry.register("bool value", ISchemaResolver(address(0)), true);
    }

    function testAttestAndCreateReferenceEscrow() public {
        AttestationRequest memory request = AttestationRequest({
            schema: testSchema,
            data: AttestationRequestData({
                recipient: alice,
                expirationTime: uint64(block.timestamp + 1 days),
                revocable: true,
                refUID: bytes32(0),
                data: abi.encode(true),
                value: 0
            })
        });

        AtomicAttestationUtils.ReferenceEscrowData memory escrowData = AtomicAttestationUtils.ReferenceEscrowData({
            arbiter: address(trivialArbiter),
            demand: "",
            validationExpirationTime: uint64(block.timestamp + 2 days),
            validationRevocable: true
        });

        vm.prank(alice);
        (bytes32 attestationUid, bytes32 escrowUid) = atomicUtils.attestAndCreateReferenceEscrow(
            referenceEscrow, request, escrowData, uint64(block.timestamp + 3 days)
        );

        assertNotEq(attestationUid, bytes32(0), "Attestation should be created");
        assertNotEq(escrowUid, bytes32(0), "Escrow should be created");
        assertEq(eas.getAttestation(attestationUid).attester, address(atomicUtils), "Utility should attest");
        assertEq(eas.getAttestation(escrowUid).recipient, alice, "Escrow should be credited to caller");

        AttestationReferenceEscrowObligation.ObligationData memory createdEscrow =
            referenceEscrow.getObligationData(escrowUid);
        assertEq(createdEscrow.attestationUid, attestationUid, "Escrow should reference created attestation");
        assertEq(createdEscrow.arbiter, address(trivialArbiter), "Arbiter should match");
        assertEq(createdEscrow.validationExpirationTime, escrowData.validationExpirationTime, "Validation expiration");
        assertEq(createdEscrow.validationRevocable, escrowData.validationRevocable, "Validation revocability");
    }
}
