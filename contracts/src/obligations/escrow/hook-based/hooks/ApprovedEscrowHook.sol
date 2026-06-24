// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";

/// @title ApprovedEscrowHook
/// @notice Shared escrow-caller approval checks for hook implementations.
/// @dev Security note: Hook implementations have not been included in professional manual audits
///      and have only been reviewed by automated audit tooling so far.
abstract contract ApprovedEscrowHook {
    /// @notice owner -> escrow obligation contract -> approved.
    mapping(address => mapping(address => bool)) public approvedEscrows;

    event EscrowApproval(address indexed owner, address indexed escrow, bool approved);

    error EscrowCallerMismatch(address caller, address escrow);
    error UnauthorizedEscrowCaller(address owner, address caller);

    /// @notice Approves an escrow obligation contract to use this hook for the caller.
    function approveEscrow(address escrow) external {
        _setEscrowApproval(msg.sender, escrow, true);
    }

    /// @notice Revokes a previously approved escrow obligation contract for the caller.
    function unapproveEscrow(address escrow) external {
        _setEscrowApproval(msg.sender, escrow, false);
    }

    /// @notice Returns whether `owner` approved `escrow` to use this hook.
    function isEscrowApproved(address owner, address escrow) external view returns (bool) {
        return approvedEscrows[owner][escrow];
    }

    function _setEscrowApproval(address owner, address escrow, bool approved) internal {
        approvedEscrows[owner][escrow] = approved;
        emit EscrowApproval(owner, escrow, approved);
    }

    function _checkLockCaller(address owner, address escrow) internal view {
        if (msg.sender != escrow) revert EscrowCallerMismatch(msg.sender, escrow);
        if (!approvedEscrows[owner][msg.sender]) revert UnauthorizedEscrowCaller(owner, msg.sender);
    }

    function _checkAttestationCaller(Attestation calldata escrow) internal view {
        if (msg.sender != escrow.attester) revert EscrowCallerMismatch(msg.sender, escrow.attester);
    }
}
