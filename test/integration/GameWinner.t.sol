// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {GameWinner} from "@src/arbiters/example/GameWinner.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry, SchemaRecord, ISchemaResolver} from "@eas/ISchemaRegistry.sol";
import {Attestation} from "@eas/Common.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

/**
 * @notice Mock game contract that issues winner attestations
 */
contract MockGame {
    IEAS public immutable eas;
    bytes32 public immutable schemaUID;

    event GameWon(
        bytes32 indexed gameId,
        address indexed winner,
        uint256 score,
        bytes32 attestationUID
    );

    constructor(IEAS _eas, bytes32 _schemaUID) {
        eas = _eas;
        schemaUID = _schemaUID;
    }

    /**
     * @notice Issues a winner attestation for a game
     */
    function attestWinner(
        bytes32 gameId,
        address winner,
        uint256 score
    ) external returns (bytes32) {
        GameWinner.GameWinnerData memory winnerData = GameWinner
            .GameWinnerData({
                gameId: gameId,
                winner: winner,
                timestamp: block.timestamp,
                score: score
            });

        AttestationRequest memory request = AttestationRequest({
            schema: schemaUID,
            data: AttestationRequestData({
                recipient: winner,
                expirationTime: 0, // No expiration
                revocable: true,
                refUID: bytes32(0),
                data: abi.encode(winnerData),
                value: 0
            })
        });

        bytes32 attestationUID = eas.attest(request);
        emit GameWon(gameId, winner, score, attestationUID);
        return attestationUID;
    }
}

contract GameWinnerTest is Test {
    GameWinner public gameWinnerArbiter;
    MockGame public mockGame;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    bytes32 public gameWinnerSchemaUID;

    uint256 internal constant ALICE_PRIVATE_KEY = 0xa11ce;
    uint256 internal constant BOB_PRIVATE_KEY = 0xb0b;
    uint256 internal constant CHARLIE_PRIVATE_KEY = 0xc44;

    address public alice;
    address public bob;
    address public charlie;

    bytes32 constant GAME_ID_1 = keccak256("GAME_1");
    bytes32 constant GAME_ID_2 = keccak256("GAME_2");

    function setUp() public {
        // Deploy EAS infrastructure
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        alice = vm.addr(ALICE_PRIVATE_KEY);
        bob = vm.addr(BOB_PRIVATE_KEY);
        charlie = vm.addr(CHARLIE_PRIVATE_KEY);

        // Register game winner schema
        string
            memory schema = "bytes32 gameId,address winner,uint256 timestamp,uint256 score";
        gameWinnerSchemaUID = schemaRegistry.register(
            schema,
            ISchemaResolver(address(0)), // no resolver
            true // revocable
        );

        // Deploy mock game contract
        mockGame = new MockGame(eas, gameWinnerSchemaUID);

        // Deploy GameWinner arbiter
        gameWinnerArbiter = new GameWinner(
            eas,
            gameWinnerSchemaUID,
            address(mockGame)
        );

        // Fund test accounts
        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
        vm.deal(charlie, 10 ether);
    }

    function testValidWinnerClaim() public {
        // Alice wins game 1 with score 1000
        vm.prank(address(mockGame));
        bytes32 attestationUID = mockGame.attestWinner(GAME_ID_1, alice, 1000);

        // Get the attestation
        Attestation memory winnerAttestation = eas.getAttestation(
            attestationUID
        );

        // Create claim demand
        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 500, // Alice's score exceeds this
            validAfter: 0
        });

        // Check if arbiter validates the winner
        bool result = gameWinnerArbiter.checkObligation(
            winnerAttestation,
            abi.encode(demand),
            bytes32(0)
        );

        assertTrue(result, "Valid winner should be able to claim");
    }

    function testInvalidGameId() public {
        // Alice wins game 1
        vm.prank(address(mockGame));
        bytes32 attestationUID = mockGame.attestWinner(GAME_ID_1, alice, 1000);

        Attestation memory winnerAttestation = eas.getAttestation(
            attestationUID
        );

        // Try to claim for game 2 (wrong game)
        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_2, // Wrong game ID
            minScore: 0,
            validAfter: 0
        });

        bool result = gameWinnerArbiter.checkObligation(
            winnerAttestation,
            abi.encode(demand),
            bytes32(0)
        );

        assertFalse(result, "Should reject claim for wrong game ID");
    }

    function testInsufficientScore() public {
        // Bob wins with score 300
        vm.prank(address(mockGame));
        bytes32 attestationUID = mockGame.attestWinner(GAME_ID_1, bob, 300);

        Attestation memory winnerAttestation = eas.getAttestation(
            attestationUID
        );

        // Demand requires minimum score of 500
        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 500, // Bob's score is only 300
            validAfter: 0
        });

        bool result = gameWinnerArbiter.checkObligation(
            winnerAttestation,
            abi.encode(demand),
            bytes32(0)
        );

        assertFalse(result, "Should reject claim with insufficient score");
    }

    function testValidAfterTimestamp() public {
        // Warp forward to ensure we have enough time for the test
        vm.warp(2 hours);

        // Set initial timestamp
        uint256 initialTime = block.timestamp;

        // Charlie wins game at current time
        vm.prank(address(mockGame));
        bytes32 attestationUID = mockGame.attestWinner(
            GAME_ID_1,
            charlie,
            1500
        );

        Attestation memory winnerAttestation = eas.getAttestation(
            attestationUID
        );

        // Demand requires win to be after a past timestamp (should pass)
        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: initialTime - 1 hours // Past timestamp - should pass
        });

        bool result = gameWinnerArbiter.checkObligation(
            winnerAttestation,
            abi.encode(demand),
            bytes32(0)
        );

        assertTrue(
            result,
            "Should accept claim when win timestamp is after validAfter"
        );

        // Now test with future validAfter requirement
        GameWinner.ClaimDemand memory futureDemand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: block.timestamp + 1 hours // Future timestamp - should fail
        });

        bool futureResult = gameWinnerArbiter.checkObligation(
            winnerAttestation,
            abi.encode(futureDemand),
            bytes32(0)
        );

        assertFalse(
            futureResult,
            "Should reject claim when win timestamp is before validAfter"
        );
    }

    function testUntrustedAttester() public {
        // Create attestation from untrusted source (not the game contract)
        GameWinner.GameWinnerData memory winnerData = GameWinner
            .GameWinnerData({
                gameId: GAME_ID_1,
                winner: alice,
                timestamp: block.timestamp,
                score: 2000
            });

        // Alice tries to attest herself as winner (not through game contract)
        vm.prank(alice);
        AttestationRequest memory request = AttestationRequest({
            schema: gameWinnerSchemaUID,
            data: AttestationRequestData({
                recipient: alice,
                expirationTime: 0,
                revocable: true,
                refUID: bytes32(0),
                data: abi.encode(winnerData),
                value: 0
            })
        });

        bytes32 fakeAttestationUID = eas.attest(request);
        Attestation memory fakeAttestation = eas.getAttestation(
            fakeAttestationUID
        );

        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: 0
        });

        bool result = gameWinnerArbiter.checkObligation(
            fakeAttestation,
            abi.encode(demand),
            bytes32(0)
        );

        assertFalse(result, "Should reject attestation from untrusted source");
    }

    function testWrongSchema() public {
        // Register a different schema
        string memory wrongSchema = "string data";
        bytes32 wrongSchemaUID = schemaRegistry.register(
            wrongSchema,
            ISchemaResolver(address(0)),
            true
        );

        // Create attestation with wrong schema
        vm.prank(alice);
        AttestationRequest memory request = AttestationRequest({
            schema: wrongSchemaUID,
            data: AttestationRequestData({
                recipient: alice,
                expirationTime: 0,
                revocable: true,
                refUID: bytes32(0),
                data: abi.encode("some data"),
                value: 0
            })
        });

        bytes32 wrongAttestationUID = eas.attest(request);
        Attestation memory wrongAttestation = eas.getAttestation(
            wrongAttestationUID
        );

        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: 0
        });

        bool result = gameWinnerArbiter.checkObligation(
            wrongAttestation,
            abi.encode(demand),
            bytes32(0)
        );

        assertFalse(result, "Should reject attestation with wrong schema");
    }

    function testRecipientMismatch() public {
        // Game attests Bob as winner
        vm.prank(address(mockGame));
        bytes32 attestationUID = mockGame.attestWinner(GAME_ID_1, bob, 1000);

        // Manually create attestation with mismatched recipient
        // (This simulates tampering with attestation data)
        Attestation memory tamperedAttestation = Attestation({
            uid: attestationUID,
            schema: gameWinnerSchemaUID,
            time: uint64(block.timestamp),
            expirationTime: 0,
            revocationTime: 0,
            refUID: bytes32(0),
            recipient: alice, // Alice is recipient but Bob is winner in data
            attester: address(mockGame),
            revocable: true,
            data: abi.encode(
                GameWinner.GameWinnerData({
                    gameId: GAME_ID_1,
                    winner: bob,
                    timestamp: block.timestamp,
                    score: 1000
                })
            )
        });

        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: 0
        });

        bool result = gameWinnerArbiter.checkObligation(
            tamperedAttestation,
            abi.encode(demand),
            bytes32(0)
        );

        assertFalse(
            result,
            "Should reject when recipient doesn't match winner"
        );
    }

    function testCounterOfferValidation() public {
        // First create a counteroffer attestation
        vm.prank(bob);
        AttestationRequest memory counterofferRequest = AttestationRequest({
            schema: gameWinnerSchemaUID,
            data: AttestationRequestData({
                recipient: bob,
                expirationTime: 0,
                revocable: true,
                refUID: bytes32(0),
                data: abi.encode(
                    GameWinner.GameWinnerData({
                        gameId: GAME_ID_1,
                        winner: bob,
                        timestamp: block.timestamp,
                        score: 500
                    })
                ),
                value: 0
            })
        });
        bytes32 counterofferUID = eas.attest(counterofferRequest);

        // Alice wins game
        GameWinner.GameWinnerData memory winnerData = GameWinner
            .GameWinnerData({
                gameId: GAME_ID_1,
                winner: alice,
                timestamp: block.timestamp,
                score: 1500
            });

        // Create attestation with reference to counteroffer
        AttestationRequest memory request = AttestationRequest({
            schema: gameWinnerSchemaUID,
            data: AttestationRequestData({
                recipient: alice,
                expirationTime: 0,
                revocable: true,
                refUID: counterofferUID, // Reference specific counteroffer
                data: abi.encode(winnerData),
                value: 0
            })
        });

        vm.prank(address(mockGame));
        bytes32 attestationUID = eas.attest(request);
        Attestation memory winnerAttestation = eas.getAttestation(
            attestationUID
        );

        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: 0
        });

        // Check with matching counteroffer
        bool resultMatching = gameWinnerArbiter.checkObligation(
            winnerAttestation,
            abi.encode(demand),
            counterofferUID
        );
        assertTrue(
            resultMatching,
            "Should validate with matching counteroffer"
        );

        // Check with different counteroffer
        bytes32 wrongCounteroffer = bytes32(uint256(123));
        bool resultWrong = gameWinnerArbiter.checkObligation(
            winnerAttestation,
            abi.encode(demand),
            wrongCounteroffer
        );
        assertFalse(resultWrong, "Should reject with wrong counteroffer");
    }

    function testValidateWinnerAttestationHelper() public {
        // Alice wins game
        vm.prank(address(mockGame));
        bytes32 attestationUID = mockGame.attestWinner(GAME_ID_1, alice, 2000);

        GameWinner.ClaimDemand memory validDemand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 1000,
            validAfter: 0
        });

        // Test helper function with valid demand
        bool validResult = gameWinnerArbiter.validateWinnerAttestation(
            attestationUID,
            validDemand
        );
        assertTrue(validResult, "Helper should validate correct attestation");

        GameWinner.ClaimDemand memory invalidDemand = GameWinner.ClaimDemand({
            gameId: GAME_ID_2, // Wrong game
            minScore: 1000,
            validAfter: 0
        });

        // Test helper function with invalid demand
        bool invalidResult = gameWinnerArbiter.validateWinnerAttestation(
            attestationUID,
            invalidDemand
        );
        assertFalse(invalidResult, "Helper should reject incorrect demand");
    }

    function testMultipleWinnersForSameGame() public {
        // Both Alice and Bob win the same game (e.g., team game)
        vm.prank(address(mockGame));
        bytes32 aliceAttestationUID = mockGame.attestWinner(
            GAME_ID_1,
            alice,
            1500
        );

        vm.prank(address(mockGame));
        bytes32 bobAttestationUID = mockGame.attestWinner(GAME_ID_1, bob, 1400);

        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 1000,
            validAfter: 0
        });

        // Both should be able to claim
        Attestation memory aliceAttestation = eas.getAttestation(
            aliceAttestationUID
        );
        bool aliceResult = gameWinnerArbiter.checkObligation(
            aliceAttestation,
            abi.encode(demand),
            bytes32(0)
        );
        assertTrue(aliceResult, "Alice should be able to claim");

        Attestation memory bobAttestation = eas.getAttestation(
            bobAttestationUID
        );
        bool bobResult = gameWinnerArbiter.checkObligation(
            bobAttestation,
            abi.encode(demand),
            bytes32(0)
        );
        assertTrue(bobResult, "Bob should be able to claim");
    }

    function testExpiredAttestation() public {
        // Warp to a future time so we can create expired attestations
        vm.warp(3 days);

        // Create expired attestation
        Attestation memory expiredAttestation = Attestation({
            uid: bytes32(uint256(1)),
            schema: gameWinnerSchemaUID,
            time: uint64(block.timestamp - 2 days),
            expirationTime: uint64(block.timestamp - 1 days), // Expired
            revocationTime: 0,
            refUID: bytes32(0),
            recipient: alice,
            attester: address(mockGame),
            revocable: true,
            data: abi.encode(
                GameWinner.GameWinnerData({
                    gameId: GAME_ID_1,
                    winner: alice,
                    timestamp: block.timestamp - 2 days,
                    score: 1000
                })
            )
        });

        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: 0
        });

        // The arbiter should revert when checking expired attestations
        // due to the ArbiterUtils._checkIntrinsic() function
        vm.expectRevert(abi.encodeWithSignature("DeadlineExpired()"));
        gameWinnerArbiter.checkObligation(
            expiredAttestation,
            abi.encode(demand),
            bytes32(0)
        );
    }

    function testRevokedAttestation() public {
        // Create revoked attestation
        Attestation memory revokedAttestation = Attestation({
            uid: bytes32(uint256(1)),
            schema: gameWinnerSchemaUID,
            time: uint64(block.timestamp),
            expirationTime: 0,
            revocationTime: uint64(block.timestamp), // Revoked
            refUID: bytes32(0),
            recipient: alice,
            attester: address(mockGame),
            revocable: true,
            data: abi.encode(
                GameWinner.GameWinnerData({
                    gameId: GAME_ID_1,
                    winner: alice,
                    timestamp: block.timestamp,
                    score: 1000
                })
            )
        });

        GameWinner.ClaimDemand memory demand = GameWinner.ClaimDemand({
            gameId: GAME_ID_1,
            minScore: 0,
            validAfter: 0
        });

        // The arbiter should revert when checking revoked attestations
        // due to the ArbiterUtils._checkIntrinsic() function
        vm.expectRevert(abi.encodeWithSignature("AttestationRevoked()"));
        gameWinnerArbiter.checkObligation(
            revokedAttestation,
            abi.encode(demand),
            bytes32(0)
        );
    }
}
