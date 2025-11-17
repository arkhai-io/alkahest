// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {CryptoSignatureObligation} from "@src/arbiters/example/CryptoSignatureObligation.sol";
import {ERC20EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC20EscrowObligation.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {Attestation} from "@eas/Common.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract CryptoSignatureObligationTest is Test {
    CryptoSignatureObligation public cryptoSigObligation;
    ERC20EscrowObligation public erc20Escrow;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public paymentToken;

    uint256 internal constant ALICE_PRIVATE_KEY = 0xa11ce;
    uint256 internal constant BOB_PRIVATE_KEY = 0xb0b;
    uint256 internal constant CHARLIE_PRIVATE_KEY = 0xc0c;

    address public alice;
    address public bob;
    address public charlie;

    bytes32 public testChallenge;

    function setUp() public {
        // Deploy EAS infrastructure
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        alice = vm.addr(ALICE_PRIVATE_KEY);
        bob = vm.addr(BOB_PRIVATE_KEY);
        charlie = vm.addr(CHARLIE_PRIVATE_KEY);

        // Deploy contracts
        cryptoSigObligation = new CryptoSignatureObligation(
            eas,
            schemaRegistry
        );
        erc20Escrow = new ERC20EscrowObligation(eas, schemaRegistry);

        // Deploy mock token
        paymentToken = new MockERC20("Test Token", "TEST");

        // Setup test challenge
        testChallenge = keccak256("Prove you control this key");

        // Fund test accounts
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
        vm.deal(charlie, 10 ether);

        // Give Alice tokens for escrow
        paymentToken.mint(alice, 1000 ether);
    }

    function testCompleteSignatureEscrowFlow() public {
        // Step 1: Alice creates an escrow requiring Bob's signature
        uint256 escrowAmount = 100 ether;

        // Create the demand for Bob's signature
        bytes memory demand = cryptoSigObligation.encodeDemand(
            bob, // Bob must sign
            testChallenge, // The challenge to sign
            "" // No domain (simple signature)
        );

        // Alice approves and creates escrow
        vm.startPrank(alice);
        paymentToken.approve(address(erc20Escrow), escrowAmount);

        bytes32 escrowUid = erc20Escrow.doObligation(
            ERC20EscrowObligation.ObligationData({
                token: address(paymentToken),
                amount: escrowAmount,
                arbiter: address(cryptoSigObligation), // Self-validating arbiter
                demand: demand
            }),
            0 // No expiration
        );
        vm.stopPrank();

        // Step 2: Bob creates the signature fulfillment
        vm.startPrank(bob);

        // Bob signs the challenge
        bytes32 messageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", testChallenge)
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(BOB_PRIVATE_KEY, messageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Bob creates the fulfillment attestation
        bytes32 fulfillmentUid = cryptoSigObligation.doObligation(
            CryptoSignatureObligation.ObligationData({
                signature: signature,
                signerAddress: bob,
                timestamp: block.timestamp,
                metadata: "Bob's signature proof"
            }),
            escrowUid // Reference to the escrow
        );
        vm.stopPrank();

        // Step 3: Bob claims the escrow with his valid signature
        vm.prank(bob);
        erc20Escrow.collectEscrowRaw(escrowUid, fulfillmentUid);

        // Verify Bob received the tokens
        assertEq(paymentToken.balanceOf(bob), escrowAmount);
        assertEq(paymentToken.balanceOf(alice), 900 ether);
    }

    function testInvalidSignatureFails() public {
        // Create demand for Bob's signature
        bytes memory demand = cryptoSigObligation.encodeDemand(
            bob,
            testChallenge,
            ""
        );

        // Create escrow
        vm.startPrank(alice);
        paymentToken.approve(address(erc20Escrow), 100 ether);

        bytes32 escrowUid = erc20Escrow.doObligation(
            ERC20EscrowObligation.ObligationData({
                token: address(paymentToken),
                amount: 100 ether,
                arbiter: address(cryptoSigObligation),
                demand: demand
            }),
            0
        );
        vm.stopPrank();

        // Charlie tries to claim with his signature (wrong signer)
        vm.startPrank(charlie);

        bytes32 messageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", testChallenge)
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            CHARLIE_PRIVATE_KEY,
            messageHash
        );
        bytes memory wrongSignature = abi.encodePacked(r, s, v);

        bytes32 fulfillmentUid = cryptoSigObligation.doObligation(
            CryptoSignatureObligation.ObligationData({
                signature: wrongSignature,
                signerAddress: charlie, // Wrong signer!
                timestamp: block.timestamp,
                metadata: "Charlie's invalid attempt"
            }),
            escrowUid
        );

        // This should revert because Charlie's signature doesn't match Bob's pubkey
        vm.expectRevert();
        erc20Escrow.collectEscrowRaw(escrowUid, fulfillmentUid);
        vm.stopPrank();

        // Verify no tokens were transferred (Alice's 100 ether is still in escrow)
        assertEq(paymentToken.balanceOf(charlie), 0);
        assertEq(paymentToken.balanceOf(alice), 900 ether);
    }

    function testSignatureVerificationHelpers() public {
        // Test the standalone signature verification helper
        bytes32 messageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", testChallenge)
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(BOB_PRIVATE_KEY, messageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Should verify correctly with Bob's address
        bool isValid = cryptoSigObligation.verifySignatureHelper(
            bob,
            testChallenge,
            signature
        );
        assertTrue(isValid, "Should verify Bob's signature");

        // Should fail with wrong address
        isValid = cryptoSigObligation.verifySignatureHelper(
            alice,
            testChallenge,
            signature
        );
        assertFalse(isValid, "Should not verify with wrong address");

        // Should fail with wrong challenge
        isValid = cryptoSigObligation.verifySignatureHelper(
            bob,
            keccak256("Wrong challenge"),
            signature
        );
        assertFalse(isValid, "Should not verify with wrong challenge");
    }

    function testChallengeGeneration() public {
        // Test deterministic challenge generation
        bytes memory context = abi.encode("User authentication for service X");
        uint256 nonce = 12345;

        bytes32 challenge1 = cryptoSigObligation.generateChallenge(
            context,
            nonce
        );
        bytes32 challenge2 = cryptoSigObligation.generateChallenge(
            context,
            nonce
        );

        // Same inputs should generate same challenge
        assertEq(challenge1, challenge2, "Challenges should be deterministic");

        // Different nonce should generate different challenge
        bytes32 challenge3 = cryptoSigObligation.generateChallenge(
            context,
            nonce + 1
        );
        assertTrue(
            challenge1 != challenge3,
            "Different nonce should create different challenge"
        );
    }

    function testMultiSignatureRequirement() public {
        // This test demonstrates how to compose multiple signature requirements
        // using the self-validating pattern

        // Create two separate signature demands
        bytes32 challenge1 = keccak256("First signature required");
        bytes32 challenge2 = keccak256("Second signature required");

        // Bob needs to provide both signatures
        // In practice, you would use a logical arbiter to combine these demands:
        // bytes memory demand1 = cryptoSigObligation.encodeDemand(bob, challenge1, "");
        // bytes memory demand2 = cryptoSigObligation.encodeDemand(bob, challenge2, "");
        // For this test, we'll just verify both signatures work independently

        // Sign both challenges
        vm.startPrank(bob);

        bytes32 messageHash1 = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", challenge1)
        );
        (uint8 v1, bytes32 r1, bytes32 s1) = vm.sign(
            BOB_PRIVATE_KEY,
            messageHash1
        );
        bytes memory signature1 = abi.encodePacked(r1, s1, v1);

        bytes32 messageHash2 = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", challenge2)
        );
        (uint8 v2, bytes32 r2, bytes32 s2) = vm.sign(
            BOB_PRIVATE_KEY,
            messageHash2
        );
        bytes memory signature2 = abi.encodePacked(r2, s2, v2);

        // Verify both signatures
        bool valid1 = cryptoSigObligation.verifySignatureHelper(
            bob,
            challenge1,
            signature1
        );
        bool valid2 = cryptoSigObligation.verifySignatureHelper(
            bob,
            challenge2,
            signature2
        );

        assertTrue(valid1 && valid2, "Both signatures should be valid");
        vm.stopPrank();
    }

    function testTimestampedSignatures() public {
        // Test that signatures include timestamps for audit trails
        vm.warp(1000); // Set block timestamp

        vm.startPrank(bob);
        bytes32 messageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", testChallenge)
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(BOB_PRIVATE_KEY, messageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        bytes32 fulfillmentUid = cryptoSigObligation.doObligation(
            CryptoSignatureObligation.ObligationData({
                signature: signature,
                signerAddress: bob,
                timestamp: block.timestamp,
                metadata: "Timestamped signature"
            }),
            bytes32(0)
        );

        // Retrieve and verify timestamp
        CryptoSignatureObligation.ObligationData
            memory data = cryptoSigObligation.getObligationData(fulfillmentUid);

        assertEq(data.timestamp, 1000, "Timestamp should match block time");
        assertEq(
            data.metadata,
            "Timestamped signature",
            "Metadata should be stored"
        );
        vm.stopPrank();
    }

    function testEIP712DomainSignatures() public {
        // Test support for domain-separated signatures
        string memory domain = "MyApp v1.0";

        bytes memory demand = cryptoSigObligation.encodeDemand(
            bob,
            testChallenge,
            domain // Using domain separation
        );

        // Create EIP-712 style signature
        vm.startPrank(bob);
        bytes32 domainHash = keccak256(bytes(domain));
        bytes32 messageHash = keccak256(
            abi.encodePacked("\x19\x01", domainHash, testChallenge)
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(BOB_PRIVATE_KEY, messageHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        // Create fulfillment
        bytes32 fulfillmentUid = cryptoSigObligation.doObligation(
            CryptoSignatureObligation.ObligationData({
                signature: signature,
                signerAddress: bob,
                timestamp: block.timestamp,
                metadata: "Domain-separated signature"
            }),
            bytes32(0)
        );

        // Get attestation and verify it passes the check
        Attestation memory obligation = eas.getAttestation(fulfillmentUid);
        bool isValid = cryptoSigObligation.checkObligation(
            obligation,
            demand,
            bytes32(0)
        );

        assertTrue(isValid, "Domain-separated signature should be valid");
        vm.stopPrank();
    }
}
