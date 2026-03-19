// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

/// @title GenLayerNLPArbiter
/// @notice An arbiter that checks StringObligation fulfillments against
///         natural language demands via a GenLayer intelligent contract.
///         The GenLayer coprocessor evaluates whether the obligation's
///         string content satisfies the demand and posts its decision
///         on-chain by calling `arbitrate()`.
contract GenLayerNLPArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    struct DemandData {
        address coprocessor; // GenLayer intelligent contract address
        string query;        // Natural language condition to evaluate
    }

    event ArbitrationMade(
        bytes32 indexed decisionKey,
        bytes32 indexed obligation,
        address indexed coprocessor,
        bool decision
    );
    event ArbitrationRequested(
        bytes32 indexed obligation,
        address indexed coprocessor,
        string query,
        bytes obligationData
    );

    error UnauthorizedArbitrationRequest();

    IEAS public eas;

    // coprocessor => decisionKey => decision
    mapping(address => mapping(bytes32 => bool)) public decisions;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    /// @notice Called by the GenLayer intelligent contract to record its
    ///         evaluation of whether an obligation satisfies a demand.
    /// @param obligation The UID of the StringObligation attestation
    /// @param query The natural language condition that was evaluated
    /// @param decision Whether the obligation satisfies the demand
    function arbitrate(
        bytes32 obligation,
        string calldata query,
        bool decision
    ) external {
        bytes32 decisionKey = keccak256(abi.encodePacked(obligation, query));
        decisions[msg.sender][decisionKey] = decision;
        emit ArbitrationMade(decisionKey, obligation, msg.sender, decision);
    }

    /// @notice Request the GenLayer coprocessor to evaluate an obligation.
    ///         Emits an event that the intelligent contract watches for.
    /// @param _obligation The UID of the StringObligation attestation
    /// @param coprocessor The GenLayer intelligent contract address
    /// @param query The natural language condition to evaluate
    function requestArbitration(
        bytes32 _obligation,
        address coprocessor,
        string calldata query
    ) external {
        Attestation memory obligation = eas.getAttestation(_obligation);
        if (
            obligation.attester != msg.sender &&
            obligation.recipient != msg.sender
        ) revert UnauthorizedArbitrationRequest();

        emit ArbitrationRequested(
            _obligation,
            coprocessor,
            query,
            obligation.data
        );
    }

    /// @notice Check whether a GenLayer coprocessor has approved this
    ///         obligation as satisfying the natural language demand.
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 /*fulfilling*/
    ) external view override returns (bool) {
        DemandData memory demand_ = abi.decode(demand, (DemandData));
        bytes32 decisionKey = keccak256(
            abi.encodePacked(obligation.uid, demand_.query)
        );
        return decisions[demand_.coprocessor][decisionKey];
    }

    function decodeDemandData(
        bytes calldata data
    ) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
