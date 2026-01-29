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
    uint256 internal constant BOND = 0.1 ether;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        obligation = new CommitRevealObligation(eas, schemaRegistry, BOND);
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
        obligation.commit{value: BOND}(escrowUid, commitment);

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
                fulfillmentUid
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

        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.CommitmentMissing.selector,
                escrowUid,
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
        obligation.commit{value: BOND}(escrowUid, commitment);

        // Reveal in the same block (no vm.roll)
        vm.prank(claimer);
        bytes32 fulfillmentUid = obligation.doObligation(data, escrowUid);
        Attestation memory fulfillment = eas.getAttestation(fulfillmentUid);

        vm.expectRevert(
            abi.encodeWithSelector(
                CommitRevealObligation.CommitmentTooRecent.selector,
                escrowUid,
                claimer
            )
        );
        obligation.checkObligation(fulfillment, "", escrowUid);
    }
}
