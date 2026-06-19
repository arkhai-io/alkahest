// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEAS, AttestationRequest} from "@eas/IEAS.sol";
import {
    AttestationReferenceEscrowObligation
} from "../../obligations/escrow/default/AttestationReferenceEscrowObligation.sol";
import {
    UnconditionalAttestationReferenceEscrowObligation
} from "../../obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol";

contract AtomicAttestationUtils {
    IEAS public immutable eas;

    error IncorrectAttestationValue(uint256 expected, uint256 actual);

    struct ReferenceEscrowData {
        address arbiter;
        bytes demand;
        uint64 validationExpirationTime;
        bool validationRevocable;
    }

    constructor(IEAS _eas) {
        eas = _eas;
    }

    function attestAndCreateReferenceEscrow(
        AttestationReferenceEscrowObligation escrow,
        AttestationRequest calldata request,
        ReferenceEscrowData calldata escrowData,
        uint64 escrowExpirationTime
    ) external payable returns (bytes32 attestationUid, bytes32 escrowUid) {
        attestationUid = _attest(request);
        escrowUid = escrow.doObligationFor(
            AttestationReferenceEscrowObligation.ObligationData({
                arbiter: escrowData.arbiter,
                demand: escrowData.demand,
                attestationUid: attestationUid,
                validationExpirationTime: escrowData.validationExpirationTime,
                validationRevocable: escrowData.validationRevocable
            }),
            escrowExpirationTime,
            msg.sender
        );
    }

    function attestAndCreateUnconditionalReferenceEscrow(
        UnconditionalAttestationReferenceEscrowObligation escrow,
        AttestationRequest calldata request,
        ReferenceEscrowData calldata escrowData,
        uint64 escrowExpirationTime
    ) external payable returns (bytes32 attestationUid, bytes32 escrowUid) {
        attestationUid = _attest(request);
        escrowUid = escrow.doObligationFor(
            UnconditionalAttestationReferenceEscrowObligation.ObligationData({
                arbiter: escrowData.arbiter,
                demand: escrowData.demand,
                attestationUid: attestationUid,
                validationExpirationTime: escrowData.validationExpirationTime,
                validationRevocable: escrowData.validationRevocable
            }),
            escrowExpirationTime,
            msg.sender
        );
    }

    function _attest(AttestationRequest calldata request) internal returns (bytes32) {
        uint256 value = request.data.value;
        if (msg.value != value) revert IncorrectAttestationValue(value, msg.value);
        return eas.attest{value: value}(request);
    }
}
