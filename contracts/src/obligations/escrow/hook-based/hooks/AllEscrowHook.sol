// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEscrowHook} from "../IEscrowHook.sol";

/// @title AllEscrowHook
/// @notice Composes multiple IEscrowHooks into a single hook, analogous to
///         how AllArbiter composes multiple IArbiter checks.
/// @dev    hookData is abi.encode(HookData), where HookData contains parallel
///         arrays of sub-hook addresses, their respective data blobs, and
///         ETH values to forward on lock.
///
///         Example: escrow 100 USDC + 1 ETH in a single HookEscrowObligation
///         by composing an ERC20EscrowHook and a NativeTokenEscrowHook.
///
///         On lock:    calls onLock  on each sub-hook in order, forwarding values[i] ETH.
///         On release: calls onRelease on each sub-hook in order.
///         On return:  calls onReturn  on each sub-hook in order.
///
///         If any sub-hook reverts, the entire call reverts (atomic).
///
///         This contract is fully stateless — it holds no assets and needs no
///         authorization. Each leaf hook does its own per-caller accounting,
///         keyed by msg.sender (= this contract when called through AllEscrowHook).
///
///         Note: because leaf hooks see msg.sender = AllEscrowHook (not the
///         original obligation), deposits are tracked under AllEscrowHook's
///         address. This is correct — the AllEscrowHook is the direct caller
///         and the only one that can release those deposits.
contract AllEscrowHook is IEscrowHook {
    struct HookData {
        address[] hooks;
        bytes[] hookDatas;
        uint256[] values; // ETH to forward to each sub-hook on lock (0 for non-ETH hooks)
    }

    error ArrayLengthMismatch();
    error ValueMismatch(uint256 expected, uint256 received);

    // ──────────────────────────────────────────────

    function onLock(
        bytes calldata data,
        address from,
        address escrow
    ) external payable override {
        HookData memory decoded = abi.decode(data, (HookData));
        _validateLengths(decoded);

        uint256 totalValue;
        for (uint256 i = 0; i < decoded.values.length; i++) {
            totalValue += decoded.values[i];
        }
        if (msg.value != totalValue) {
            revert ValueMismatch(totalValue, msg.value);
        }

        for (uint256 i = 0; i < decoded.hooks.length; i++) {
            IEscrowHook(decoded.hooks[i]).onLock{value: decoded.values[i]}(
                decoded.hookDatas[i],
                from,
                escrow
            );
        }
    }

    function onRelease(
        bytes calldata data,
        address to,
        address escrow
    ) external override {
        HookData memory decoded = abi.decode(data, (HookData));
        _validateLengths(decoded);

        for (uint256 i = 0; i < decoded.hooks.length; i++) {
            IEscrowHook(decoded.hooks[i]).onRelease(
                decoded.hookDatas[i],
                to,
                escrow
            );
        }
    }

    function onReturn(
        bytes calldata data,
        address to,
        address escrow
    ) external override {
        HookData memory decoded = abi.decode(data, (HookData));
        _validateLengths(decoded);

        for (uint256 i = 0; i < decoded.hooks.length; i++) {
            IEscrowHook(decoded.hooks[i]).onReturn(
                decoded.hookDatas[i],
                to,
                escrow
            );
        }
    }

    // ──────────────────────────────────────────────

    function _validateLengths(HookData memory decoded) internal pure {
        if (
            decoded.hooks.length != decoded.hookDatas.length ||
            decoded.hooks.length != decoded.values.length
        ) revert ArrayLengthMismatch();
    }

    // ──────────────────────────────────────────────
    // Encoding helpers
    // ──────────────────────────────────────────────

    function encodeHookData(
        HookData calldata hookData
    ) external pure returns (bytes memory) {
        return abi.encode(hookData);
    }

    function decodeHookData(
        bytes calldata data
    ) external pure returns (HookData memory) {
        return abi.decode(data, (HookData));
    }
}
