// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {ArbiterUtils} from "@src/ArbiterUtils.sol";
import {InternetCourtArbiter} from "@src/arbiters/internet-court/InternetCourtArbiter.sol";
import {IInternetCourtAgreement} from "@src/arbiters/internet-court/IInternetCourtAgreement.sol";

/// @notice Mock Internet Court agreement for unit testing.
contract MockInternetCourtAgreement is IInternetCourtAgreement {
    uint8 public status;
    uint8 public verdict;
    address public partyA;
    address public partyB;

    function setStatus(uint8 _status) external {
        status = _status;
    }

    function setVerdict(uint8 _verdict) external {
        verdict = _verdict;
    }

    function setParties(address _a, address _b) external {
        partyA = _a;
        partyB = _b;
    }
}

contract InternetCourtArbiterTest is Test {
    InternetCourtArbiter arbiter;
    MockInternetCourtAgreement mockAgreement;

    function setUp() public {
        arbiter = new InternetCourtArbiter();
        mockAgreement = new MockInternetCourtAgreement();
    }

    function _makeAttestation() internal view returns (Attestation memory) {
        return Attestation({
            uid: bytes32(uint256(1)),
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
    }

    function _encodeDemand(
        address agreement,
        uint8 requiredVerdict
    ) internal pure returns (bytes memory) {
        return abi.encode(
            InternetCourtArbiter.DemandData({
                agreement: agreement,
                requiredVerdict: requiredVerdict
            })
        );
    }

    // ─── Happy path: RESOLVED + matching verdict ───

    function testResolvedPartyAWins() public {
        mockAgreement.setStatus(4); // RESOLVED
        mockAgreement.setVerdict(1); // PARTY_A

        bool result = arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        );
        assertTrue(result);
    }

    function testResolvedPartyBWins() public {
        mockAgreement.setStatus(4); // RESOLVED
        mockAgreement.setVerdict(2); // PARTY_B

        bool result = arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 2),
            bytes32(0)
        );
        assertTrue(result);
    }

    // ─── Verdict mismatch ───

    function testVerdictMismatchReturnsfalse() public {
        mockAgreement.setStatus(4); // RESOLVED
        mockAgreement.setVerdict(1); // PARTY_A wins

        // But we require PARTY_B
        bool result = arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 2),
            bytes32(0)
        );
        assertFalse(result);
    }

    // ─── Not yet resolved ───

    function testNotResolvedReturnsFalse() public {
        // Status: CREATED (0)
        mockAgreement.setStatus(0);
        mockAgreement.setVerdict(1);

        assertFalse(arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        ));
    }

    function testActiveReturnsFalse() public {
        mockAgreement.setStatus(1); // ACTIVE
        mockAgreement.setVerdict(1);

        assertFalse(arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        ));
    }

    function testDisputedReturnsFalse() public {
        mockAgreement.setStatus(2); // DISPUTED
        mockAgreement.setVerdict(0);

        assertFalse(arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        ));
    }

    function testResolvingReturnsFalse() public {
        mockAgreement.setStatus(3); // RESOLVING
        mockAgreement.setVerdict(0);

        assertFalse(arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        ));
    }

    function testCancelledReturnsFalse() public {
        mockAgreement.setStatus(5); // CANCELLED
        mockAgreement.setVerdict(0);

        assertFalse(arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        ));
    }

    // ─── Undetermined verdict (0) with resolved status ───

    function testUndeterminedVerdictReturnsFalse() public {
        mockAgreement.setStatus(4); // RESOLVED
        mockAgreement.setVerdict(0); // UNDETERMINED

        // Requesting PARTY_A — doesn't match UNDETERMINED
        assertFalse(arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        ));

        // Requesting PARTY_B — doesn't match UNDETERMINED
        assertFalse(arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 2),
            bytes32(0)
        ));
    }

    // ─── Invalid required verdict ───

    function testInvalidRequiredVerdictZeroReverts() public {
        mockAgreement.setStatus(4);
        mockAgreement.setVerdict(0);

        vm.expectRevert(InternetCourtArbiter.InvalidRequiredVerdict.selector);
        arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 0),
            bytes32(0)
        );
    }

    function testInvalidRequiredVerdict3Reverts() public {
        mockAgreement.setStatus(4);
        mockAgreement.setVerdict(1);

        vm.expectRevert(InternetCourtArbiter.InvalidRequiredVerdict.selector);
        arbiter.checkObligation(
            _makeAttestation(),
            _encodeDemand(address(mockAgreement), 3),
            bytes32(0)
        );
    }

    // ─── Intrinsic checks ───

    function testExpiredObligationReverts() public {
        vm.warp(1000); // ensure block.timestamp > 1
        mockAgreement.setStatus(4);
        mockAgreement.setVerdict(1);

        Attestation memory att = _makeAttestation();
        att.expirationTime = uint64(block.timestamp - 1); // already expired

        vm.expectRevert(ArbiterUtils.DeadlineExpired.selector);
        arbiter.checkObligation(
            att,
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        );
    }

    function testRevokedObligationReverts() public {
        vm.warp(1000);
        mockAgreement.setStatus(4);
        mockAgreement.setVerdict(1);

        Attestation memory att = _makeAttestation();
        att.revocationTime = uint64(block.timestamp - 1); // revoked

        vm.expectRevert(ArbiterUtils.AttestationRevoked.selector);
        arbiter.checkObligation(
            att,
            _encodeDemand(address(mockAgreement), 1),
            bytes32(0)
        );
    }

    // ─── decodeDemandData ───

    function testDecodeDemandData() public view {
        bytes memory encoded = _encodeDemand(address(mockAgreement), 2);
        InternetCourtArbiter.DemandData memory decoded = arbiter.decodeDemandData(encoded);

        assertEq(decoded.agreement, address(mockAgreement));
        assertEq(decoded.requiredVerdict, 2);
    }

    // ─── Constants ───

    function testConstants() public view {
        assertEq(arbiter.STATUS_RESOLVED(), 4);
        assertEq(arbiter.VERDICT_PARTY_A(), 1);
        assertEq(arbiter.VERDICT_PARTY_B(), 2);
    }
}
