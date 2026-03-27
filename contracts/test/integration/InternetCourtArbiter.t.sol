// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {InternetCourtArbiter} from "@src/arbiters/internet-court/InternetCourtArbiter.sol";
import {IInternetCourtAgreement} from "@src/arbiters/internet-court/IInternetCourtAgreement.sol";
import {ERC20EscrowObligation} from "@src/obligations/escrow/non-tierable/ERC20EscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {BaseEscrowObligation} from "@src/BaseEscrowObligation.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockToken is ERC20 {
    constructor() ERC20("Mock", "MCK") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

/// @title InternetCourtArbiter Integration Test (Fork)
/// @notice Tests InternetCourtArbiter against live Internet Court agreements
///         on Base Sepolia. Uses `--fork-url` to read real on-chain state.
///
///         Known resolved agreements on Base Sepolia (factory 0xd533...9Dda):
///         - Case 16 @ 0x4F0E52342241539F5B4d1cc25DC4c6531049e44c
///           status=4 (RESOLVED), verdict=1 (PARTY_A)
///
///         Run with:
///           forge test --match-contract InternetCourtArbiterForkTest \
///             --fork-url https://sepolia.base.org -vvv
contract InternetCourtArbiterForkTest is Test {
    // ── Internet Court contracts on Base Sepolia ──
    address constant IC_FACTORY = 0xd533cB0B52E85b3F506b6f0c28b8f6bc4E449Dda;

    InternetCourtArbiter public arbiter;
    ERC20EscrowObligation public escrowObligation;
    StringObligation public stringObligation;
    MockToken public token;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    address public alice;
    address public bob;

    uint256 constant ESCROW_AMOUNT = 100 ether;
    uint64 constant EXPIRATION = 365 days;

    /// @notice Resolve an agreement address from the IC factory by case ID.
    function _getAgreement(uint256 caseId) internal view returns (address) {
        (bool ok, bytes memory data) = IC_FACTORY.staticcall(
            abi.encodeWithSignature("agreements(uint256)", caseId)
        );
        require(ok, "factory call failed");
        return abi.decode(data, (address));
    }

    /// @notice Find a resolved agreement with a given verdict from the factory.
    ///         Scans cases from newest to oldest.
    function _findResolvedCase(uint8 targetVerdict)
        internal
        view
        returns (address agreementAddr, uint256 caseId)
    {
        (bool ok, bytes memory data) = IC_FACTORY.staticcall(
            abi.encodeWithSignature("nextAgreementId()")
        );
        require(ok, "nextAgreementId call failed");
        uint256 nextId = abi.decode(data, (uint256));

        for (uint256 i = nextId; i > 0; i--) {
            address addr = _getAgreement(i - 1);
            if (addr == address(0)) continue;

            IInternetCourtAgreement agreement = IInternetCourtAgreement(addr);
            try agreement.status() returns (uint8 s) {
                if (s == 4) { // RESOLVED
                    try agreement.verdict() returns (uint8 v) {
                        if (v == targetVerdict) {
                            return (addr, i - 1);
                        }
                    } catch {}
                }
            } catch {}
        }
        revert("No resolved case found with target verdict");
    }

    function setUp() public {
        // Deploy Alkahest infrastructure locally on the fork
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        arbiter = new InternetCourtArbiter();
        escrowObligation = new ERC20EscrowObligation(eas, schemaRegistry);
        stringObligation = new StringObligation(eas, schemaRegistry);
        token = new MockToken();

        alice = makeAddr("alice");
        bob = makeAddr("bob");

        token.mint(alice, ESCROW_AMOUNT);
    }

    /// @notice Verify we can read status and verdict from a live IC agreement.
    function testReadLiveAgreementState() public view {
        (address agreementAddr,) = _findResolvedCase(1);
        IInternetCourtAgreement agreement = IInternetCourtAgreement(agreementAddr);

        assertEq(agreement.status(), 4, "should be RESOLVED");
        assertEq(agreement.verdict(), 1, "should be PARTY_A");
        assertTrue(agreement.partyA() != address(0), "partyA should be set");
        assertTrue(agreement.partyB() != address(0), "partyB should be set");
    }

    /// @notice checkObligation returns true for a resolved live agreement
    ///         with matching verdict.
    function testCheckObligationWithLiveResolvedAgreement() public view {
        (address agreementAddr,) = _findResolvedCase(1);

        Attestation memory att = Attestation({
            uid: bytes32(uint256(42)),
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

        bytes memory demand = abi.encode(
            InternetCourtArbiter.DemandData({
                agreement: agreementAddr,
                requiredVerdict: 1 // PARTY_A
            })
        );

        assertTrue(arbiter.checkObligation(att, demand, bytes32(0)));
    }

    /// @notice checkObligation returns false when the verdict doesn't match.
    function testCheckObligationVerdictMismatchWithLive() public view {
        (address agreementAddr,) = _findResolvedCase(1); // verdict=PARTY_A

        Attestation memory att = Attestation({
            uid: bytes32(uint256(42)),
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

        // Demand PARTY_B but agreement resolved as PARTY_A
        bytes memory demand = abi.encode(
            InternetCourtArbiter.DemandData({
                agreement: agreementAddr,
                requiredVerdict: 2 // PARTY_B
            })
        );

        assertFalse(arbiter.checkObligation(att, demand, bytes32(0)));
    }

    /// @notice Full escrow flow using a live IC agreement as the release condition.
    ///         Alice escrows tokens conditioned on an IC verdict.
    ///         Since the agreement is already resolved with PARTY_A, Bob can
    ///         immediately collect by submitting a fulfillment referencing the escrow.
    function testFullEscrowFlowWithLiveAgreement() public {
        (address agreementAddr,) = _findResolvedCase(1);

        // ── Step 1: Alice creates escrow demanding IC verdict = PARTY_A ──
        InternetCourtArbiter.DemandData memory demand = InternetCourtArbiter
            .DemandData({
                agreement: agreementAddr,
                requiredVerdict: 1 // PARTY_A
            });

        ERC20EscrowObligation.ObligationData memory escrowData = ERC20EscrowObligation
            .ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demand),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);
        bytes32 escrowUid = escrowObligation.doObligation(
            escrowData,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();

        assertEq(token.balanceOf(alice), 0);
        assertEq(token.balanceOf(address(escrowObligation)), ESCROW_AMOUNT);

        // ── Step 2: Bob submits a fulfillment referencing the escrow ──
        vm.prank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: "IC agreement resolved in favor of Party A",
                schema: bytes32(0)
            }),
            escrowUid
        );

        // ── Step 3: Bob collects — arbiter reads live IC verdict ──
        vm.prank(bob);
        bool success = escrowObligation.collectEscrow(escrowUid, fulfillmentUid);

        assertTrue(success);
        assertEq(token.balanceOf(bob), ESCROW_AMOUNT);
        assertEq(token.balanceOf(address(escrowObligation)), 0);
    }

    /// @notice Escrow cannot be collected when demanding the wrong verdict.
    function testEscrowFailsWithWrongVerdict() public {
        (address agreementAddr,) = _findResolvedCase(1); // verdict=PARTY_A

        // Alice escrows demanding PARTY_B (wrong verdict)
        InternetCourtArbiter.DemandData memory demand = InternetCourtArbiter
            .DemandData({
                agreement: agreementAddr,
                requiredVerdict: 2 // PARTY_B — won't match
            });

        ERC20EscrowObligation.ObligationData memory escrowData = ERC20EscrowObligation
            .ObligationData({
                arbiter: address(arbiter),
                demand: abi.encode(demand),
                token: address(token),
                amount: ESCROW_AMOUNT
            });

        vm.startPrank(alice);
        token.approve(address(escrowObligation), ESCROW_AMOUNT);
        bytes32 escrowUid = escrowObligation.doObligation(
            escrowData,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();

        vm.prank(bob);
        bytes32 fulfillmentUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: "attempting collection",
                schema: bytes32(0)
            }),
            escrowUid
        );

        vm.prank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(
                BaseEscrowObligation.InvalidFulfillment.selector
            )
        );
        escrowObligation.collectEscrow(escrowUid, fulfillmentUid);

        // Funds remain locked
        assertEq(token.balanceOf(address(escrowObligation)), ESCROW_AMOUNT);
    }
}
