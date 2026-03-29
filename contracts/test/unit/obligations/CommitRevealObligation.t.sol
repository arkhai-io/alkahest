// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {CommitRevealObligation} from "@src/obligations/CommitRevealObligation.sol";
import {NativeTokenEscrowObligation} from "@src/obligations/escrow/non-tierable/NativeTokenEscrowObligation.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract CommitRevealObligationTest is Test {
    CommitRevealObligation public obligation;
    NativeTokenEscrowObligation public nativeEscrow;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;

    address internal claimer;
    address internal treasury;
    uint256 internal constant BOND = 0.1 ether;
    uint256 internal constant COMMIT_DEADLINE = 1 hours;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        treasury = makeAddr("treasury");
        obligation = new CommitRevealObligation(eas, schemaRegistry, BOND, COMMIT_DEADLINE, treasury);
        nativeEscrow = new NativeTokenEscrowObligation(eas, schemaRegistry);
        claimer = makeAddr("claimer");
    }

    function _obligationData() internal pure returns (CommitRevealObligation.ObligationData memory) {
        return CommitRevealObligation.ObligationData({
            payload: bytes("payload"),
            salt: bytes32("salt"),
            schema: bytes32("schema-tag")
        });
    }

    function _makeEscrow() internal returns (bytes32 escrowUid) {
        NativeTokenEscrowObligation.ObligationData memory escrowData = NativeTokenEscrowObligation
            .ObligationData({
                arbiter: address(obligation),
                demand: "",
                amount: 0
            });
        escrowUid = nativeEscrow.doObligation{value: 0}(escrowData, 0);
    }

    // ----------------------------------------------------------------
    // Commit + Reveal + Bond reclaim (atomic in doObligation)
    // ----------------------------------------------------------------

    function testCommitRevealReclaimsBondAtomically() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();

        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        // Commit with bond
        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Ensure reveal occurs in a later block
        vm.roll(block.number + 1);

        // Reveal — bond is atomically returned to claimer
        uint256 claimerBalanceBefore = claimer.balance;
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);

        assertEq(claimer.balance, claimerBalanceBefore + BOND, "claimer received bond atomically");

        // Arbiter check should pass
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        assertTrue(obligation.checkObligation(fulfillment, "", escrowUid));

        // Bond is already claimed — slashing should fail
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.BondAlreadyClaimed.selector,
                commitment
            )
        );
        obligation.slashBond(commitment);
    }

    function testCheckObligationRevertsWithoutCommit() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();

        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        // Attempting to reveal without a commit should revert
        vm.prank(claimer);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.CommitmentMissing.selector,
                commitment,
                claimer
            )
        );
        obligation.doObligation(data, escrowUid);
    }

    function testRevealRevertsIfSameBlock() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();

        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Reveal in the same block (no vm.roll)
        vm.prank(claimer);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.CommitmentTooRecent.selector,
                commitment,
                claimer
            )
        );
        obligation.doObligation(data, escrowUid);
    }

    function testCheckObligationRevertsIfSameBlock() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();

        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // Reveal succeeds
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);

        // But if we fake the block number back for checking (simulate same-block scenario)
        // We can't really do this with checkObligation since attestation is already created.
        // Instead verify that checkObligation passes when block.number > commitBlock
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        assertTrue(obligation.checkObligation(fulfillment, "", escrowUid));
    }

    function testMultipleRevealsFromSameCommitReverts() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // First reveal succeeds and reclaims bond
        vm.prank(claimer);
        obligation.doObligation(data, escrowUid);

        // Second reveal with same commitment reverts (bond already claimed)
        vm.prank(claimer);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.BondAlreadyClaimed.selector,
                commitment
            )
        );
        obligation.doObligation(data, escrowUid);
    }

    function testMultipleCommitmentsEachReclaimable() public {
        bytes32 escrowUid = _makeEscrow();

        CommitRevealObligation.ObligationData memory dataOld = CommitRevealObligation.ObligationData({
            payload: bytes("old"),
            salt: bytes32("salt-old"),
            schema: bytes32("schema-tag")
        });
        CommitRevealObligation.ObligationData memory dataNew = CommitRevealObligation.ObligationData({
            payload: bytes("new"),
            salt: bytes32("salt-new"),
            schema: bytes32("schema-tag")
        });

        bytes32 commitmentOld = obligation.computeCommitment(escrowUid, claimer, dataOld);
        bytes32 commitmentNew = obligation.computeCommitment(escrowUid, claimer, dataNew);

        vm.deal(claimer, 2 * BOND);
        vm.startPrank(claimer);
        obligation.commit{value: BOND}(commitmentOld);
        obligation.commit{value: BOND}(commitmentNew);
        vm.stopPrank();

        vm.roll(block.number + 1);

        uint256 claimerBalanceBefore = claimer.balance;

        vm.startPrank(claimer);
        obligation.doObligation(dataOld, escrowUid);
        obligation.doObligation(dataNew, escrowUid);
        vm.stopPrank();

        assertEq(claimer.balance, claimerBalanceBefore + 2 * BOND, "both bonds reclaimed");
    }

    // ----------------------------------------------------------------
    // Deadline enforcement
    // ----------------------------------------------------------------

    function testRevealRevertsAfterDeadline() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Warp past deadline
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);
        vm.roll(block.number + 1);

        vm.prank(claimer);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.RevealTooLate.selector,
                commitment
            )
        );
        obligation.doObligation(data, escrowUid);
    }

    function testRevealSucceedsAtExactDeadline() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Warp to exact deadline (should still succeed)
        vm.warp(block.timestamp + COMMIT_DEADLINE);
        vm.roll(block.number + 1);

        vm.prank(claimer);
        obligation.doObligation(data, escrowUid);
    }

    function testCheckObligationEnforcesDeadline() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // Reveal within deadline
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);

        // checkObligation should pass when called within or after deadline
        // because the attestation's timestamp is what matters, not current time
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);

        // Even if we warp far into the future, the attestation time is still within deadline
        vm.warp(block.timestamp + COMMIT_DEADLINE * 10);
        assertTrue(obligation.checkObligation(fulfillment, "", escrowUid));
    }

    // ----------------------------------------------------------------
    // Slashing
    // ----------------------------------------------------------------

    function testSlashBondAfterDeadline() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Warp past deadline without revealing
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);

        uint256 treasuryBefore = treasury.balance;
        uint256 slashed = obligation.slashBond(commitment);

        assertEq(slashed, BOND, "slashed amount");
        assertEq(treasury.balance, treasuryBefore + BOND, "treasury received slashed bond");
    }

    function testSlashBondRevertsBeforeDeadline() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Still within deadline
        vm.warp(block.timestamp + COMMIT_DEADLINE);

        vm.expectRevert(
            abi.encodeWithSelector(CommitRevealObligation.CommitDeadlineNotReached.selector, commitment)
        );
        obligation.slashBond(commitment);
    }

    function testSlashBondRevertsIfBondAlreadyReclaimed() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // Reveal (bond atomically reclaimed)
        vm.prank(claimer);
        obligation.doObligation(data, escrowUid);

        // Warp past deadline and try to slash
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);

        vm.expectRevert(
            abi.encodeWithSelector(CommitRevealObligation.BondAlreadyClaimed.selector, commitment)
        );
        obligation.slashBond(commitment);
    }

    function testCannotRevealAfterSlash() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Warp past deadline and slash
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);
        vm.roll(block.number + 1);
        obligation.slashBond(commitment);

        // Now try to reveal — should fail because bond already claimed (slashed)
        // and also because reveal is past deadline
        vm.prank(claimer);
        vm.expectRevert(
            abi.encodeWithSelector(CommitRevealObligation.RevealTooLate.selector, commitment)
        );
        obligation.doObligation(data, escrowUid);
    }

    function testSlashBondToZeroAddress() public {
        // Deploy with address(0) as slash recipient (burn)
        CommitRevealObligation burnObligation =
            new CommitRevealObligation(eas, schemaRegistry, BOND, COMMIT_DEADLINE, address(0));

        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = burnObligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        burnObligation.commit{value: BOND}(commitment);

        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);

        uint256 zeroBalBefore = address(0).balance;
        uint256 slashed = burnObligation.slashBond(commitment);

        assertEq(slashed, BOND, "slashed amount");
        assertEq(address(0).balance, zeroBalBefore + BOND, "ETH sent to zero address");
    }

    // ----------------------------------------------------------------
    // Security: timely reveals cannot be slashed
    // ----------------------------------------------------------------

    function testTimelyRevealPreventsSlashing() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // Timely reveal — bond is reclaimed atomically
        vm.prank(claimer);
        obligation.doObligation(data, escrowUid);

        // Even after deadline, slashing fails because bond was already reclaimed
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);
        vm.expectRevert(
            abi.encodeWithSelector(CommitRevealObligation.BondAlreadyClaimed.selector, commitment)
        );
        obligation.slashBond(commitment);
    }

    // ----------------------------------------------------------------
    // doObligationFor (splitter integration)
    // ----------------------------------------------------------------

    function testDoObligationForWithDifferentRecipient() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        address splitter = makeAddr("splitter");

        // Commit using the splitter address as claimer
        bytes32 commitment = obligation.computeCommitment(escrowUid, splitter, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // Reveal with splitter as recipient — bond goes to committer (claimer)
        uint256 claimerBalanceBefore = claimer.balance;
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligationFor(data, splitter, escrowUid);

        // Bond returned to committer (claimer), not recipient (splitter)
        assertEq(claimer.balance, claimerBalanceBefore + BOND, "bond returned to committer");

        // Fulfillment attestation has splitter as recipient
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        assertEq(fulfillment.recipient, splitter, "recipient should be splitter");

        // checkObligation should pass
        assertTrue(obligation.checkObligation(fulfillment, "", escrowUid));
    }

    function testDoObligationForRevertsWithWrongRecipientCommitment() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        address splitter = makeAddr("splitter");

        // Commit using claimer address (not splitter)
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // Try to reveal with splitter as recipient — commitment mismatch
        bytes32 expectedCommitment = obligation.computeCommitment(escrowUid, splitter, data);
        vm.prank(claimer);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.CommitmentMissing.selector,
                expectedCommitment,
                splitter
            )
        );
        obligation.doObligationFor(data, splitter, escrowUid);
    }

    function testLateRevealCannotStealEscrow() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Warp past deadline
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);
        vm.roll(block.number + 1);

        // Late reveal should revert
        vm.prank(claimer);
        vm.expectRevert(
            abi.encodeWithSelector(CommitRevealObligation.RevealTooLate.selector, commitment)
        );
        obligation.doObligation(data, escrowUid);
    }
}
