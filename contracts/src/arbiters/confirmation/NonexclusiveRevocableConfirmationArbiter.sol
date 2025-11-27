// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

contract NonexclusiveRevocableConfirmationArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    event ConfirmationMade(
        bytes32 indexed fulfillment,
        bytes32 indexed escrow
    );
    event ConfirmationRequested(
        bytes32 indexed fulfillment,
        address indexed confirmer,
        bytes32 indexed escrow
    );
    event ConfirmationRevoked(
        bytes32 indexed fulfillment,
        bytes32 indexed escrow
    );

    error UnauthorizedConfirmationRequest();
    error UnauthorizedConfirmation();
    error UnauthorizedRevocation();
    error NoConfirmationToRevoke();

    IEAS public immutable eas;
    // fulfillment => escrow => confirmed
    mapping(bytes32 => mapping(bytes32 => bool)) public confirmations;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    function confirm(bytes32 _fulfillment, bytes32 _escrow) public {
        Attestation memory escrow = eas.getAttestation(_escrow);

        if (escrow.recipient != msg.sender) {
            revert UnauthorizedConfirmation();
        }

        confirmations[_fulfillment][_escrow] = true;

        emit ConfirmationMade(_fulfillment, _escrow);
    }

    function revoke(bytes32 _fulfillment, bytes32 _escrow) public {
        Attestation memory escrow = eas.getAttestation(_escrow);

        if (escrow.recipient != msg.sender) {
            revert UnauthorizedRevocation();
        }

        if (!confirmations[_fulfillment][_escrow]) {
            revert NoConfirmationToRevoke();
        }

        confirmations[_fulfillment][_escrow] = false;

        emit ConfirmationRevoked(_fulfillment, _escrow);
    }

    function requestConfirmation(bytes32 _fulfillment, bytes32 _escrow) public {
        Attestation memory fulfillment = eas.getAttestation(_fulfillment);
        if (
            fulfillment.attester != msg.sender &&
            fulfillment.recipient != msg.sender
        ) revert UnauthorizedConfirmationRequest();

        Attestation memory escrow = eas.getAttestation(_escrow);

        emit ConfirmationRequested(
            _fulfillment,
            escrow.recipient,
            _escrow
        );
    }

    function checkObligation(
        Attestation memory fulfillment,
        bytes memory /*demand*/,
        bytes32 fulfilling
    ) public view override returns (bool) {
        return confirmations[fulfillment.uid][fulfilling];
    }
}
