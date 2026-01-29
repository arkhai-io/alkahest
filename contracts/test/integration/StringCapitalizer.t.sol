// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {StringCapitalizer} from "@src/arbiters/example/StringCapitalizer.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {Attestation} from "@eas/Common.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract StringCapitalizerTest is Test {
    StringCapitalizer public capitalizer;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    uint256 internal constant ALICE_PRIVATE_KEY = 0xa11ce;
    uint256 internal constant BOB_PRIVATE_KEY = 0xb0b;

    address public alice;
    address public bob;

    function setUp() public {
        // Deploy EAS infrastructure
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        alice = vm.addr(ALICE_PRIVATE_KEY);
        bob = vm.addr(BOB_PRIVATE_KEY);

        // Deploy contracts
        stringObligation = new StringObligation(eas, schemaRegistry);
        capitalizer = new StringCapitalizer();

        // Fund test accounts
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
    }

    function testCheckObligationWithValidCapitalization() public {
        // Create a demand for capitalizing "hello world"
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "hello world"});

        // Create an obligation with the capitalized result
        StringObligation.ObligationData memory obligationData = StringObligation.ObligationData({item: "HELLO WORLD", schema: bytes32(0)});

        // Create the attestation as bob
        vm.prank(bob);
        bytes32 obligationUID = stringObligation.doObligation(
            obligationData,
            bytes32(0)
        );

        // Get the attestation
        Attestation memory obligation = eas.getAttestation(obligationUID);

        // Check if the arbiter validates the capitalization
        bool result = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            bytes32(0)
        );

        assertTrue(result, "Should validate correct capitalization");
    }

    function testCheckObligationWithInvalidCapitalization() public {
        // Create a demand for capitalizing "hello world"
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "hello world"});

        // Create an obligation with incorrectly capitalized result
        StringObligation.ObligationData memory obligationData = StringObligation.ObligationData({item: "Hello World", schema: bytes32(0)}); // Only first letters capitalized

        // Create the attestation as bob
        vm.prank(bob);
        bytes32 obligationUID = stringObligation.doObligation(
            obligationData,
            bytes32(0)
        );

        // Get the attestation
        Attestation memory obligation = eas.getAttestation(obligationUID);

        // Check if the arbiter rejects the incorrect capitalization
        bool result = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            bytes32(0)
        );

        assertFalse(result, "Should reject incorrect capitalization");
    }

    function testCheckObligationWithMixedCase() public {
        // Create a demand with mixed case input
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "HeLLo WoRLd 123!"});

        // Create an obligation with correctly capitalized result
        StringObligation.ObligationData memory obligationData = StringObligation.ObligationData({item: "HELLO WORLD 123!", schema: bytes32(0)}); // All letters uppercase, others unchanged

        // Create the attestation as bob
        vm.prank(bob);
        bytes32 obligationUID = stringObligation.doObligation(
            obligationData,
            bytes32(0)
        );

        // Get the attestation
        Attestation memory obligation = eas.getAttestation(obligationUID);

        // Check if the arbiter validates the capitalization
        bool result = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            bytes32(0)
        );

        assertTrue(
            result,
            "Should validate correct capitalization of mixed case"
        );
    }

    function testCheckObligationWithNumbers() public {
        // Create a demand with numbers and special characters
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "test123@email.com"});

        // Create an obligation with correctly capitalized result
        StringObligation.ObligationData memory obligationData = StringObligation.ObligationData({item: "TEST123@EMAIL.COM", schema: bytes32(0)});

        // Create the attestation as bob
        vm.prank(bob);
        bytes32 obligationUID = stringObligation.doObligation(
            obligationData,
            bytes32(0)
        );

        // Get the attestation
        Attestation memory obligation = eas.getAttestation(obligationUID);

        // Check if the arbiter validates the capitalization
        bool result = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            bytes32(0)
        );

        assertTrue(
            result,
            "Should handle numbers and special characters correctly"
        );
    }

    function testCheckObligationWithWrongLength() public {
        // Create a demand
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "hello"});

        // Create an obligation with different length string
        StringObligation.ObligationData memory obligationData = StringObligation.ObligationData({item: "HELLO WORLD", schema: bytes32(0)}); // Different length

        // Create the attestation as bob
        vm.prank(bob);
        bytes32 obligationUID = stringObligation.doObligation(
            obligationData,
            bytes32(0)
        );

        // Get the attestation
        Attestation memory obligation = eas.getAttestation(obligationUID);

        // Check if the arbiter rejects different length strings
        bool result = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            bytes32(0)
        );

        assertFalse(result, "Should reject different length strings");
    }

    function testCheckObligationWithFulfilling() public {
        // First create an escrow attestation to reference
        vm.prank(alice);
        bytes32 escrowUID = stringObligation.doObligation(
            StringObligation.ObligationData({item: "request", schema: bytes32(0)}),
            bytes32(0)
        );

        // Create a demand
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "hello"});

        // Create an obligation with correct capitalization and reference
        StringObligation.ObligationData memory obligationData = StringObligation.ObligationData({item: "HELLO", schema: bytes32(0)});

        // Create the attestation with reference UID
        vm.prank(bob);
        bytes32 obligationUID = stringObligation.doObligation(
            obligationData,
            escrowUID
        );

        // Get the attestation
        Attestation memory obligation = eas.getAttestation(obligationUID);

        // Check with matching fulfilling
        bool resultMatching = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            escrowUID
        );

        assertTrue(resultMatching, "Should validate when fulfilling matches");

        // Check with non-matching fulfilling
        bytes32 wrongFulfilling = bytes32(uint256(999999));
        bool resultNonMatching = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            wrongFulfilling
        );

        assertFalse(
            resultNonMatching,
            "Should reject when fulfilling doesn't match"
        );
    }

    function testCheckObligationWithRevokedAttestation() public {
        // Create a demand
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "hello"});

        // Create a mock revoked attestation
        Attestation memory revokedObligation = Attestation({
            uid: bytes32(uint256(1)),
            schema: stringObligation.ATTESTATION_SCHEMA(),
            time: uint64(block.timestamp),
            expirationTime: 0,
            revocationTime: uint64(block.timestamp), // Revoked
            refUID: bytes32(0),
            recipient: bob,
            attester: alice,
            revocable: true,
            data: abi.encode(StringObligation.ObligationData({item: "HELLO", schema: bytes32(0)}))
        });

        // The arbiter should revert when checking revoked attestations
        // due to the ArbiterUtils._checkIntrinsic() function
        vm.expectRevert(abi.encodeWithSignature("AttestationRevoked()"));
        capitalizer.checkObligation(
            revokedObligation,
            abi.encode(demand),
            bytes32(0)
        );
    }

    function testCheckObligationWithExpiredAttestation() public {
        // Warp to a future time so we can create expired attestations
        vm.warp(3 days);

        // Create a demand
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: "hello"});

        // Create a mock expired attestation
        Attestation memory expiredObligation = Attestation({
            uid: bytes32(uint256(1)),
            schema: stringObligation.ATTESTATION_SCHEMA(),
            time: uint64(block.timestamp - 2 days),
            expirationTime: uint64(block.timestamp - 1 days), // Expired
            revocationTime: 0,
            refUID: bytes32(0),
            recipient: bob,
            attester: alice,
            revocable: true,
            data: abi.encode(StringObligation.ObligationData({item: "HELLO", schema: bytes32(0)}))
        });

        // The arbiter should revert when checking expired attestations
        // due to the ArbiterUtils._checkIntrinsic() function
        vm.expectRevert(abi.encodeWithSignature("DeadlineExpired()"));
        capitalizer.checkObligation(
            expiredObligation,
            abi.encode(demand),
            bytes32(0)
        );
    }

    function testFuzzCapitalization(
        string memory input,
        string memory output
    ) public {
        // Limit string length for gas efficiency
        vm.assume(bytes(input).length <= 100);
        vm.assume(bytes(input).length == bytes(output).length);

        // Create demand and obligation
        StringCapitalizer.DemandData memory demand = StringCapitalizer
            .DemandData({query: input});

        StringObligation.ObligationData memory obligationData = StringObligation.ObligationData({item: output, schema: bytes32(0)});

        // Create the attestation
        vm.prank(bob);
        bytes32 obligationUID = stringObligation.doObligation(
            obligationData,
            bytes32(0)
        );

        Attestation memory obligation = eas.getAttestation(obligationUID);

        // Check the result
        bool result = capitalizer.checkObligation(
            obligation,
            abi.encode(demand),
            bytes32(0)
        );

        // Manually check if output is correctly capitalized version of input
        bool expectedResult = isProperlyCapitalized(input, output);

        assertEq(
            result,
            expectedResult,
            "Arbiter result should match expected capitalization check"
        );
    }

    function isProperlyCapitalized(
        string memory input,
        string memory output
    ) internal pure returns (bool) {
        bytes memory inputBytes = bytes(input);
        bytes memory outputBytes = bytes(output);

        if (inputBytes.length != outputBytes.length) return false;

        for (uint256 i = 0; i < inputBytes.length; i++) {
            uint8 inputChar = uint8(inputBytes[i]);
            uint8 outputChar = uint8(outputBytes[i]);

            if (inputChar >= 0x61 && inputChar <= 0x7A) {
                // Lowercase letter should be capitalized
                if (outputChar != inputChar - 32) return false;
            } else {
                // Non-lowercase should remain unchanged
                if (outputChar != inputChar) return false;
            }
        }

        return true;
    }
}
