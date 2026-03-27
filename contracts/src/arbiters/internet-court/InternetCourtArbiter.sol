// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";
import {IInternetCourtAgreement} from "./IInternetCourtAgreement.sol";

/// @title InternetCourtArbiter
/// @notice An arbiter that checks whether an Internet Court agreement
///         (https://internetcourt.org) has resolved with a specific verdict.
///         This allows Internet Court dispute outcomes to serve as escrow
///         release conditions in Alkahest.
///
///         The arbiter is fully stateless — it reads `status()` and `verdict()`
///         directly from the Internet Court agreement contract on-chain.
///
/// @dev    Usage:
///         1. Create an Internet Court agreement via the IC factory.
///         2. Create an Alkahest escrow obligation with this arbiter and a
///            demand encoding the agreement address + required verdict.
///         3. Once the IC agreement resolves, call collectEscrow — this
///            arbiter verifies the verdict matches.
contract InternetCourtArbiter is IArbiter {
    using ArbiterUtils for Attestation;

    /// @notice Demand parameters for this arbiter.
    /// @param agreement  The Internet Court agreement contract address.
    /// @param requiredVerdict The verdict value that counts as fulfillment.
    ///        1 = PARTY_A wins, 2 = PARTY_B wins.
    ///        Set this to the verdict that should release the escrow.
    struct DemandData {
        address agreement;
        uint8 requiredVerdict;
    }

    uint8 public constant STATUS_RESOLVED = 4;
    uint8 public constant VERDICT_PARTY_A = 1;
    uint8 public constant VERDICT_PARTY_B = 2;

    error InvalidRequiredVerdict();

    /// @notice Check whether the Internet Court agreement has resolved
    ///         with the required verdict.
    /// @param obligation  The escrow obligation attestation (unused beyond
    ///                    intrinsic checks).
    /// @param demand      ABI-encoded DemandData specifying agreement + verdict.
    /// @return True if the agreement is RESOLVED and its verdict matches.
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 /*fulfilling*/
    ) external view override returns (bool) {
        obligation._checkIntrinsic();

        DemandData memory d = abi.decode(demand, (DemandData));

        if (d.requiredVerdict != VERDICT_PARTY_A && d.requiredVerdict != VERDICT_PARTY_B) {
            revert InvalidRequiredVerdict();
        }

        IInternetCourtAgreement agreement = IInternetCourtAgreement(d.agreement);

        if (agreement.status() != STATUS_RESOLVED) {
            return false;
        }

        return agreement.verdict() == d.requiredVerdict;
    }

    /// @notice ABI-decode helper for off-chain tooling.
    function decodeDemandData(
        bytes calldata data
    ) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }
}
