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
                arbiter: address(obligation), // not used in these tests but consistent with flow
                demand: "",
                amount: 0
            });
        escrowUid = nativeEscrow.doObligation{value: 0}(escrowData, 0);
    }

    function testCommitRevealAndReclaimBond() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();

        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        // Commit with bond
        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Ensure reveal occurs in a later block
        vm.roll(block.number + 1);

        // Reveal (fulfillment attestation)
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);

        // Arbiter check should pass
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);
        assertTrue(obligation.checkObligation(fulfillment, "", escrowUid));

        // Reclaim bond (any caller can trigger; funds to claimer)
        address caller = makeAddr("anyone");
        uint256 claimerBalanceBefore = claimer.balance;
        vm.prank(caller);
        uint256 returned = obligation.reclaimBond(fulfillmentUid);

        assertEq(returned, BOND, "returned bond amount");
        assertEq(claimer.balance, claimerBalanceBefore + BOND, "claimer received bond");

        // Second reclaim should revert
        vm.prank(caller);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.BondAlreadyClaimed.selector,
                commitment
            )
        );
        obligation.reclaimBond(fulfillmentUid);
    }

    function testCheckObligationRevertsWithoutCommit() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();

        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);

        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);
        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.CommitmentMissing.selector,
                commitment,
                claimer
            )
        );
        obligation.checkObligation(fulfillment, "", escrowUid);
    }

    function testCheckObligationRevertsIfSameBlock() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();

        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        // Reveal in the same block (no vm.roll)
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);

        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.CommitmentTooRecent.selector,
                commitment,
                claimer
            )
        );
        obligation.checkObligation(fulfillment, "", escrowUid);
    }

    function testPoc_MultipleReclaimsSameCommitmentReverts() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        vm.startPrank(claimer);
        bytes32 obligationUid1 = obligation.doObligation(data, escrowUid);
        bytes32 obligationUid2 = obligation.doObligation(data, escrowUid);
        vm.stopPrank();

        uint256 claimerBalanceBefore = claimer.balance;
        obligation.reclaimBond(obligationUid1);
        assertEq(claimer.balance, claimerBalanceBefore + BOND, "first reclaim succeeds");

        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.BondAlreadyClaimed.selector,
                commitment
            )
        );
        obligation.reclaimBond(obligationUid2);
    }

    function testPoc_CommitOverwriteDoesNotLockBond() public {
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
        bytes32 obligationUidOld = obligation.doObligation(dataOld, escrowUid);
        bytes32 obligationUidNew = obligation.doObligation(dataNew, escrowUid);
        obligation.reclaimBond(obligationUidOld);
        obligation.reclaimBond(obligationUidNew);
        vm.stopPrank();

        assertEq(claimer.balance, claimerBalanceBefore + 2 * BOND, "both bonds reclaimed");
    }

    // ----------------------------------------------------------------
    // Deadline & slashing tests
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

    function testSlashBondRevertsIfAlreadyClaimed() public {
        bytes32 escrowUid = _makeEscrow();
        CommitRevealObligation.ObligationData memory data = _obligationData();
        bytes32 commitment = obligation.computeCommitment(escrowUid, claimer, data);

        vm.deal(claimer, BOND);
        vm.prank(claimer);
        obligation.commit{value: BOND}(commitment);

        vm.roll(block.number + 1);

        // Reveal and reclaim
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);
        obligation.reclaimBond(fulfillmentUid);

        // Warp past deadline and try to slash
        vm.warp(block.timestamp + COMMIT_DEADLINE + 1);

        vm.expectRevert(
            abi.encodeWithSelector(CommitRevealObligation.BondAlreadyClaimed.selector, commitment)
        );
        obligation.slashBond(commitment);
    }

    function testReclaimBondRevertsAfterSlash() public {
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

        // Now try to reveal and reclaim — reclaim should fail
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);

        vm.expectRevert(
            abi.encodeWithSelector(CommitRevealObligation.BondAlreadyClaimed.selector, commitment)
        );
        obligation.reclaimBond(fulfillmentUid);
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
}
