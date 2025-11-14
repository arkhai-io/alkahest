// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {TrustedOracleArbiter} from "@src/arbiters/TrustedOracleArbiter.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract TrustedOracleArbiterTest is Test {
    TrustedOracleArbiter arbiter;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    address oracle = address(0x123);
    bytes32 obligationUid = bytes32(uint256(1));

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();
        arbiter = new TrustedOracleArbiter(eas);
    }

    function testConstructor() public {
        // Create a new arbiter to test constructor
        TrustedOracleArbiter newArbiter = new TrustedOracleArbiter(eas);

        // Verify that the EAS address is set correctly
        // This is an indirect test since the eas variable is private
        // We'll test it through functionality
        Attestation memory attestation = Attestation({
            uid: obligationUid,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        TrustedOracleArbiter.DemandData memory demandData = TrustedOracleArbiter
            .DemandData({oracle: oracle, data: bytes("")});
        bytes memory demand = abi.encode(demandData);

        // Should return false initially since no decision has been made
        assertFalse(newArbiter.checkObligation(attestation, demand, bytes32(0)));
    }

    function testArbitrate() public {
        // Test that arbitrate function updates the decision
        vm.startPrank(oracle);

        bytes memory demandData = bytes("");

        // Initially the decision should be false (default value)
        assertFalse(
            arbiter.checkObligation(
                Attestation({
                    uid: obligationUid,
                    schema: bytes32(0),
                    time: uint64(block.timestamp),
                    expirationTime: uint64(0),
                    revocationTime: uint64(0),
                    refUID: bytes32(0),
                    recipient: address(0),
                    attester: address(0),
                    revocable: true,
                    data: bytes("")
                }),
                abi.encode(
                    TrustedOracleArbiter.DemandData({
                        oracle: oracle,
                        data: demandData
                    })
                ),
                bytes32(0)
            )
        );

        // Expect the ArbitrationMade event to be emitted
        bytes32 expectedKey = keccak256(abi.encodePacked(obligationUid, demandData));
        vm.expectEmit(true, true, true, true);
        emit TrustedOracleArbiter.ArbitrationMade(expectedKey, obligationUid, oracle, true);

        // Make a positive arbitration decision
        arbiter.arbitrate(obligationUid, demandData, true);

        // Now the decision should be true
        assertTrue(
            arbiter.checkObligation(
                Attestation({
                    uid: obligationUid,
                    schema: bytes32(0),
                    time: uint64(block.timestamp),
                    expirationTime: uint64(0),
                    revocationTime: uint64(0),
                    refUID: bytes32(0),
                    recipient: address(0),
                    attester: address(0),
                    revocable: true,
                    data: bytes("")
                }),
                abi.encode(
                    TrustedOracleArbiter.DemandData({
                        oracle: oracle,
                        data: demandData
                    })
                ),
                bytes32(0)
            )
        );

        vm.stopPrank();
    }

    function testCheckObligationWithDifferentOracles() public {
        // Set up two different oracles with different decisions
        address oracle1 = address(0x123);
        address oracle2 = address(0x456);
        // Use the class-level obligationUid

        bytes memory demandData = bytes("");

        // Oracle 1 makes a positive decision
        vm.prank(oracle1);
        arbiter.arbitrate(obligationUid, demandData, true);

        // Oracle 2 makes a negative decision
        vm.prank(oracle2);
        arbiter.arbitrate(obligationUid, demandData, false);

        // Create the attestation
        Attestation memory attestation = Attestation({
            uid: obligationUid,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        // Check with oracle1 - should be true
        assertTrue(
            arbiter.checkObligation(
                attestation,
                abi.encode(
                    TrustedOracleArbiter.DemandData({
                        oracle: oracle1,
                        data: demandData
                    })
                ),
                bytes32(0)
            )
        );

        // Check with oracle2 - should be false
        assertFalse(
            arbiter.checkObligation(
                attestation,
                abi.encode(
                    TrustedOracleArbiter.DemandData({
                        oracle: oracle2,
                        data: demandData
                    })
                ),
                bytes32(0)
            )
        );
    }

    function testCheckObligationWithNoDecision() public {
        // Test with an oracle that hasn't made a decision
        address newOracle = address(0x789);
        // Use the class-level obligationUid

        // Create the attestation
        Attestation memory attestation = Attestation({
            uid: obligationUid,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        // Check with the new oracle - should be false (default value)
        assertFalse(
            arbiter.checkObligation(
                attestation,
                abi.encode(
                    TrustedOracleArbiter.DemandData({
                        oracle: newOracle,
                        data: bytes("")
                    })
                ),
                bytes32(0)
            )
        );
    }

    function testArbitrateWithDifferentDemands() public {
        // Test that decisions are scoped by demand data
        vm.startPrank(oracle);

        bytes memory demandData1 = bytes("demand1");
        bytes memory demandData2 = bytes("demand2");

        // Make a positive decision for demand1
        arbiter.arbitrate(obligationUid, demandData1, true);

        // Make a negative decision for demand2
        arbiter.arbitrate(obligationUid, demandData2, false);

        Attestation memory attestation = Attestation({
            uid: obligationUid,
            schema: bytes32(0),
            time: uint64(block.timestamp),
            expirationTime: uint64(0),
            revocationTime: uint64(0),
            refUID: bytes32(0),
            recipient: address(0),
            attester: address(0),
            revocable: true,
            data: bytes("")
        });

        // Check with demand1 - should be true
        assertTrue(
            arbiter.checkObligation(
                attestation,
                abi.encode(
                    TrustedOracleArbiter.DemandData({
                        oracle: oracle,
                        data: demandData1
                    })
                ),
                bytes32(0)
            )
        );

        // Check with demand2 - should be false
        assertFalse(
            arbiter.checkObligation(
                attestation,
                abi.encode(
                    TrustedOracleArbiter.DemandData({
                        oracle: oracle,
                        data: demandData2
                    })
                ),
                bytes32(0)
            )
        );

        vm.stopPrank();
    }
}
