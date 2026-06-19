// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {AttestationBarterUtils} from "@src/utils/barter/AttestationBarterUtils.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract AttestationBarterUtilsIntegrationTest is Test {
    AttestationBarterUtils public barterUtils;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    uint256 internal constant ALICE_PRIVATE_KEY = 0xa11ce;
    uint256 internal constant BOB_PRIVATE_KEY = 0xb0b;

    address public alice;
    address public bob;

    bytes32 public testSchema;
    string constant TEST_SCHEMA = "bool value";

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        alice = vm.addr(ALICE_PRIVATE_KEY);
        bob = vm.addr(BOB_PRIVATE_KEY);

        // Deploy contracts
        barterUtils = new AttestationBarterUtils(eas, schemaRegistry);

        // Register test schema
        testSchema = barterUtils.registerSchema(TEST_SCHEMA, barterUtils, true);
    }

    function testAttest() public {
        vm.prank(alice);
        bytes32 attestationUid =
            barterUtils.attest(testSchema, bob, uint64(block.timestamp + 1 days), true, bytes32(0), abi.encode(true));

        assertNotEq(attestationUid, bytes32(0), "Attestation should be created");
        assertEq(eas.getAttestation(attestationUid).recipient, bob, "Recipient should match");
    }
}
