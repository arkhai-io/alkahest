// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEAS, AttestationRequest} from "@eas/IEAS.sol";
import {
    AttestationReferenceEscrowObligation
} from "../../obligations/escrow/default/AttestationReferenceEscrowObligation.sol";
import {
    UnconditionalAttestationReferenceEscrowObligation
} from "../../obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol";

/// @title AtomicAttestationUtils
/// @notice Helpers that create an EAS attestation and an attestation-reference escrow in one transaction.
contract AtomicAttestationUtils {
    /// @notice EAS contract used to create attestations.
    IEAS public immutable eas;

    /// @notice Raised when `msg.value` does not exactly match the EAS attestation value.
    error IncorrectAttestationValue(uint256 expected, uint256 actual);

    /// @notice Escrow parameters shared by default and unconditional attestation-reference escrows.
    struct ReferenceEscrowData {
        /// @notice Arbiter contract that will validate the fulfillment.
        address arbiter;
        /// @notice ABI-encoded demand for the arbiter.
        bytes demand;
        /// @notice Expiration timestamp required of the referenced attestation.
        uint64 validationExpirationTime;
        /// @notice Revocability required of the referenced attestation.
        bool validationRevocable;
    }

    /// @param _eas EAS contract used to create attestations.
    constructor(IEAS _eas) {
        eas = _eas;
    }

    /// @notice Creates an EAS attestation and then creates a default attestation-reference escrow for it.
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

    /// @notice Creates an EAS attestation and then creates an unconditional attestation-reference escrow for it.
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

    /// @notice Creates the EAS attestation after validating the supplied ETH value.
    function _attest(AttestationRequest calldata request) internal returns (bytes32) {
        uint256 value = request.data.value;
        if (msg.value != value) revert IncorrectAttestationValue(value, msg.value);
        return eas.attest{value: value}(request);
    }
}
