// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEscrowHook} from "../IEscrowHook.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title ERC20EscrowHook
/// @notice An IEscrowHook that escrows a single ERC20 token + amount.
/// @dev hookData is abi.encode(HookData).
///
///      Security model: deposits are tracked per-caller (msg.sender) per-token.
///      Any contract can deposit via onLock and only withdraw what it deposited
///      via onRelease/onReturn. No owner, no authorization mapping.
///
///      Users must approve this hook contract for the token before the
///      obligation calls onLock.
contract ERC20EscrowHook is IEscrowHook {
    using SafeERC20 for IERC20;

    struct HookData {
        address token;
        uint256 amount;
    }

    /// @notice Tracks deposits: caller (obligation) → token → amount held.
    mapping(address => mapping(address => uint256)) public deposits;

    error ERC20TransferFailed(
        address token,
        address from,
        address to,
        uint256 amount
    );
    error NoDeposit(address caller, address token);
    error InsufficientDeposit(
        address caller,
        address token,
        uint256 requested,
        uint256 available
    );

    // ──────────────────────────────────────────────

    function onLock(
        bytes calldata data,
        address from,
        address /* escrow */
    ) external payable override {
        HookData memory decoded = abi.decode(data, (HookData));

        uint256 balanceBefore = IERC20(decoded.token).balanceOf(address(this));

        bool success = IERC20(decoded.token).trySafeTransferFrom(
            from,
            address(this),
            decoded.amount
        );

        uint256 balanceAfter = IERC20(decoded.token).balanceOf(address(this));

        if (!success || balanceAfter < balanceBefore + decoded.amount) {
            revert ERC20TransferFailed(
                decoded.token,
                from,
                address(this),
                decoded.amount
            );
        }

        deposits[msg.sender][decoded.token] += decoded.amount;
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

        uint256 available = deposits[msg.sender][decoded.token];
        if (available == 0) {
            revert NoDeposit(msg.sender, decoded.token);
        }
        if (available < decoded.amount) {
            revert InsufficientDeposit(
                msg.sender,
                decoded.token,
                decoded.amount,
                available
            );
        }

        deposits[msg.sender][decoded.token] = available - decoded.amount;

        uint256 balanceBefore = IERC20(decoded.token).balanceOf(to);

        bool success = IERC20(decoded.token).trySafeTransfer(
            to,
            decoded.amount
        );

        uint256 balanceAfter = IERC20(decoded.token).balanceOf(to);

        if (!success || balanceAfter < balanceBefore + decoded.amount) {
            revert ERC20TransferFailed(
                decoded.token,
                address(this),
                to,
                decoded.amount
            );
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
}
