// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title IInternetCourtAgreement
/// @notice Minimal interface for reading Internet Court agreement state.
///         Internet Court (https://internetcourt.org) deploys agreement
///         contracts on Base Sepolia via its factory at
///         0xd533cB0B52E85b3F506b6f0c28b8f6bc4E449Dda.
///
///         Status values: 0=CREATED, 1=ACTIVE, 2=DISPUTED, 3=RESOLVING,
///                        4=RESOLVED, 5=CANCELLED
///         Verdict values: 0=UNDETERMINED, 1=PARTY_A, 2=PARTY_B
interface IInternetCourtAgreement {
    function status() external view returns (uint8);
    function verdict() external view returns (uint8);
    function partyA() external view returns (address);
    function partyB() external view returns (address);
}
