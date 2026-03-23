// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title IEscrowHook
/// @notice Interface for composable escrow actions.
/// @dev Each hook encapsulates a single escrow concern (e.g. "hold 100 USDC").
///      The HookEscrowObligation calls these during the escrow lifecycle.
///      `data` is opaque, hook-specific configuration (e.g. token + amount).
///
///      Security model: hooks hold assets and track deposits per-caller
///      (msg.sender). No authorization mapping is needed — the caller's
///      deposit balance is the implicit permission to release.
interface IEscrowHook {
    /// @notice Lock assets into escrow on behalf of `from`.
    /// @param data   Hook-specific parameters (e.g. token address, amount).
    /// @param from   The address providing the assets.
    /// @param escrow The escrow obligation contract that initiated the lock.
    function onLock(bytes calldata data, address from, address escrow) external payable;

    /// @notice Release escrowed assets to the fulfiller.
    /// @param data   The same hook data that was passed to onLock.
    /// @param to     The address receiving the assets.
    /// @param escrow The escrow obligation contract that initiated the release.
    function onRelease(bytes calldata data, address to, address escrow) external;

    /// @notice Return escrowed assets to the original owner on expiry.
    /// @param data   The same hook data that was passed to onLock.
    /// @param to     The address to return assets to (original creator).
    /// @param escrow The escrow obligation contract that initiated the return.
    function onReturn(bytes calldata data, address to, address escrow) external;
}
