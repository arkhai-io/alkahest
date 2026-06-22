// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title ExclusiveUnrevocableConfirmationArbiter
/// @notice Accepts the first confirmed fulfillment for an escrow, with no revocation path.
/// @dev The escrow attestation recipient is the confirmer; only one fulfillment may ever be confirmed per escrow.
contract ExclusiveUnrevocableConfirmationArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Emitted when an escrow recipient confirms a fulfillment.
    event ConfirmationMade(bytes32 indexed fulfillment, bytes32 indexed escrow);
    /// @notice Emitted by a fulfillment participant to request recipient confirmation.
    event ConfirmationRequested(bytes32 indexed fulfillment, address indexed confirmer, bytes32 indexed escrow);

    error UnauthorizedConfirmationRequest();
    error UnauthorizedConfirmation();
    error EscrowAlreadyConfirmed();
    error InvalidFulfillment();

    /// @notice EAS contract used to load escrow and fulfillment attestations.
    IEAS public immutable eas;
    /// @notice Whether a fulfillment is confirmed for an escrow.
    mapping(bytes32 => mapping(bytes32 => bool)) public confirmations;
    /// @notice Whether an escrow already has a confirmed fulfillment.
    mapping(bytes32 => bool) public escrowConfirmed;

    /// @param _eas EAS contract used to load attestations.
    constructor(IEAS _eas) {
        eas = _eas;
    }

    /// @notice Confirms a fulfillment for an escrow as the escrow recipient.
    function confirm(bytes32 _fulfillment, bytes32 _escrow) public {
        Attestation memory escrow = eas.getAttestation(_escrow);
        Attestation memory fulfillment = eas.getAttestation(_fulfillment);

        if (escrow.recipient != msg.sender) {
            revert UnauthorizedConfirmation();
        }

        if (fulfillment.uid == bytes32(0) || fulfillment.uid != _fulfillment) {
            revert InvalidFulfillment();
        }

        if (escrowConfirmed[_escrow]) {
            revert EscrowAlreadyConfirmed();
        }

        confirmations[_fulfillment][_escrow] = true;
        escrowConfirmed[_escrow] = true;

        emit ConfirmationMade(_fulfillment, _escrow);
    }

    /// @notice Requests confirmation from the escrow recipient.
    function requestConfirmation(bytes32 _fulfillment, bytes32 _escrow) public {
        Attestation memory fulfillment = eas.getAttestation(_fulfillment);
        if (fulfillment.attester != msg.sender && fulfillment.recipient != msg.sender) {
            revert UnauthorizedConfirmationRequest();
        }

        Attestation memory escrow = eas.getAttestation(_escrow);

        emit ConfirmationRequested(_fulfillment, escrow.recipient, _escrow);
    }

    /// @inheritdoc IArbiter
    function check(
        Attestation memory fulfillment,
        bytes memory,
        /*demand*/
        bytes32 escrowUid
    )
        public
        view
        override
        returns (bool)
    {
        return confirmations[fulfillment.uid][escrowUid];
    }
}
