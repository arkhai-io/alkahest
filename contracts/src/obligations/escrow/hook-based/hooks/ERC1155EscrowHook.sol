// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEscrowHook} from "../IEscrowHook.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

/// @title ERC1155EscrowHook
/// @notice An IEscrowHook that escrows ERC1155 tokens (single id + amount).
/// @dev hookData is abi.encode(HookData).
///      Deposits are tracked per-caller per-token per-tokenId.
///      Users must call setApprovalForAll on the ERC1155 contract
///      for this hook before the obligation calls onLock.
contract ERC1155EscrowHook is IEscrowHook, ERC1155Holder {
    struct HookData {
        address token;
        uint256 tokenId;
        uint256 amount;
    }

    /// @notice Tracks deposits: caller → token → tokenId → amount held.
    mapping(address => mapping(address => mapping(uint256 => uint256)))
        public deposits;

    error ERC1155TransferFailed(
        address token,
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    );
    error NoDeposit(address caller, address token, uint256 tokenId);
    error InsufficientDeposit(
        address caller,
        address token,
        uint256 tokenId,
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

        uint256 balanceBefore = IERC1155(decoded.token).balanceOf(
            address(this),
            decoded.tokenId
        );

        try
            IERC1155(decoded.token).safeTransferFrom(
                from,
                address(this),
                decoded.tokenId,
                decoded.amount,
                ""
            )
        {} catch {
            revert ERC1155TransferFailed(
                decoded.token,
                from,
                address(this),
                decoded.tokenId,
                decoded.amount
            );
        }

        uint256 balanceAfter = IERC1155(decoded.token).balanceOf(
            address(this),
            decoded.tokenId
        );

        if (balanceAfter < balanceBefore + decoded.amount) {
            revert ERC1155TransferFailed(
                decoded.token,
                from,
                address(this),
                decoded.tokenId,
                decoded.amount
            );
        }

        deposits[msg.sender][decoded.token][decoded.tokenId] += decoded.amount;
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

        uint256 available = deposits[msg.sender][decoded.token][
            decoded.tokenId
        ];
        if (available == 0) {
            revert NoDeposit(msg.sender, decoded.token, decoded.tokenId);
        }
        if (available < decoded.amount) {
            revert InsufficientDeposit(
                msg.sender,
                decoded.token,
                decoded.tokenId,
                decoded.amount,
                available
            );
        }

        deposits[msg.sender][decoded.token][decoded.tokenId] =
            available -
            decoded.amount;

        uint256 balanceBefore = IERC1155(decoded.token).balanceOf(
            to,
            decoded.tokenId
        );

        try
            IERC1155(decoded.token).safeTransferFrom(
                address(this),
                to,
                decoded.tokenId,
                decoded.amount,
                ""
            )
        {} catch {
            revert ERC1155TransferFailed(
                decoded.token,
                address(this),
                to,
                decoded.tokenId,
                decoded.amount
            );
        }

        uint256 balanceAfter = IERC1155(decoded.token).balanceOf(
            to,
            decoded.tokenId
        );

        if (balanceAfter < balanceBefore + decoded.amount) {
            revert ERC1155TransferFailed(
                decoded.token,
                address(this),
                to,
                decoded.tokenId,
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
