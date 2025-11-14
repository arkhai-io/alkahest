// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IArbiter} from "../IArbiter.sol";
import {ArbiterUtils} from "../ArbiterUtils.sol";

contract TrustedOracleArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    struct DemandData {
        address oracle;
        bytes data;
    }

    event ArbitrationMade(
        bytes32 indexed decisionKey,
        bytes32 indexed obligation,
        address indexed oracle,
        bool decision
    );
    event ArbitrationRequested(
        bytes32 indexed obligation,
        address indexed oracle,
        bytes demand
    );

    error UnauthorizedArbitrationRequest();

    IEAS eas;
    mapping(address => mapping(bytes32 => bool)) decisions;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    function arbitrate(bytes32 obligation, bytes memory demand, bool decision) public {
        bytes32 decisionKey = keccak256(abi.encodePacked(obligation, demand));
        decisions[msg.sender][decisionKey] = decision;
        emit ArbitrationMade(decisionKey, obligation, msg.sender, decision);
    }

    function requestArbitration(bytes32 _obligation, address oracle, bytes memory demand) public {
        Attestation memory obligation = eas.getAttestation(_obligation);
        if (
            obligation.attester != msg.sender &&
            obligation.recipient != msg.sender
        ) revert UnauthorizedArbitrationRequest();

        emit ArbitrationRequested(_obligation, oracle, demand);
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 /*counteroffer*/
    ) public view override returns (bool) {
        DemandData memory demand_ = abi.decode(demand, (DemandData));
        bytes32 decisionKey = keccak256(abi.encodePacked(obligation.uid, demand_.data));
        return decisions[demand_.oracle][decisionKey];
    }

    function decodeDemandData(
        bytes calldata data
    ) public pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
