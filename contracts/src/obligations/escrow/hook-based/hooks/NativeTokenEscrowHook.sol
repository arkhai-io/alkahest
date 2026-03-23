// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEscrowHook} from "../IEscrowHook.sol";

/// @title NativeTokenEscrowHook
/// @notice An IEscrowHook that escrows native ETH.
/// @dev hookData is abi.encode(HookData).
///      ETH is forwarded via msg.value through onLock.
///      Deposits are tracked per-caller.
contract NativeTokenEscrowHook is IEscrowHook {
    struct HookData {
        uint256 amount;
    }

    /// @notice Tracks deposits: caller (obligation) → amount held.
    mapping(address => uint256) public deposits;

    error IncorrectPayment(uint256 expected, uint256 received);
    error NoDeposit(address caller);
    error InsufficientDeposit(
        address caller,
        uint256 requested,
        uint256 available
    );
    error NativeTokenTransferFailed(address to, uint256 amount);

    // ──────────────────────────────────────────────

    function onLock(
        bytes calldata data,
        address /* from */,
        address /* escrow */
    ) external payable override {
        HookData memory decoded = abi.decode(data, (HookData));

        if (msg.value != decoded.amount) {
            revert IncorrectPayment(decoded.amount, msg.value);
        }

        deposits[msg.sender] += decoded.amount;
    }

    function onRelease(
        bytes calldata data,
        address to,
        address /* escrow */
    ) external override {
        _transferOut(data, to);
    }

    function onReturn(
        bytes calldata data,
        address to,
        address /* escrow */
    ) external override {
        _transferOut(data, to);
    }

    // ──────────────────────────────────────────────

    function _transferOut(bytes calldata data, address to) internal {
        HookData memory decoded = abi.decode(data, (HookData));

        uint256 available = deposits[msg.sender];
        if (available == 0) {
            revert NoDeposit(msg.sender);
        }
        if (available < decoded.amount) {
            revert InsufficientDeposit(
                msg.sender,
                decoded.amount,
                available
            );
        }

        deposits[msg.sender] = available - decoded.amount;

        (bool success, ) = payable(to).call{value: decoded.amount}("");
        if (!success) {
            revert NativeTokenTransferFailed(to, decoded.amount);
        }
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

    receive() external payable {}
}
