// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEscrowHook} from "../IEscrowHook.sol";
import {ApprovedEscrowHook} from "./ApprovedEscrowHook.sol";
import {Attestation} from "@eas/Common.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title ERC721EscrowHook
/// @notice An IEscrowHook that escrows a single ERC721 token.
/// @dev hookData is abi.encode(HookData).
///      Deposits are tracked per-caller per-token per-tokenId.
///      Users must approve this hook contract (or setApprovalForAll) and
///      approve the escrow obligation contract in this hook before the
///      obligation calls onLock.
///
///      Security note: This contract has not been included in professional manual audits and
///      has only been reviewed by automated audit tooling so far.
contract ERC721EscrowHook is IEscrowHook, ApprovedEscrowHook {
    struct HookData {
        address token;
        uint256 tokenId;
    }

    /// @notice Tracks deposits: caller → token → tokenId → held.
    mapping(address => mapping(address => mapping(uint256 => bool))) public deposits;

    error ERC721TransferFailed(address token, address from, address to, uint256 tokenId);
    error NoDeposit(address caller, address token, uint256 tokenId);

    // ──────────────────────────────────────────────

    function onLock(bytes calldata data, address from, address escrow) external payable override {
        _checkLockCaller(from, escrow);
        if (msg.value != 0) revert IEscrowHook.UnexpectedNativeValue();

        HookData memory decoded = abi.decode(data, (HookData));

        // Verify ownership
        if (IERC721(decoded.token).ownerOf(decoded.tokenId) != from) {
            revert ERC721TransferFailed(decoded.token, from, address(this), decoded.tokenId);
        }

        try IERC721(decoded.token).transferFrom(from, address(this), decoded.tokenId) {}
        catch {
            revert ERC721TransferFailed(decoded.token, from, address(this), decoded.tokenId);
        }

        // Verify transfer succeeded
        if (IERC721(decoded.token).ownerOf(decoded.tokenId) != address(this)) {
            revert ERC721TransferFailed(decoded.token, from, address(this), decoded.tokenId);
        }

        deposits[msg.sender][decoded.token][decoded.tokenId] = true;
    }

    function onAttest(bytes calldata, Attestation calldata) external override {}

    function onRelease(
        bytes calldata data,
        address to,
        Attestation calldata escrow,
        bytes32 /* fulfillmentUid */
    )
        external
        override
    {
        _checkAttestationCaller(escrow);
        _transferOut(data, to);
    }

    function onReturn(bytes calldata data, address to, Attestation calldata escrow) external override {
        _checkAttestationCaller(escrow);
        _transferOut(data, to);
    }

    // ──────────────────────────────────────────────

    function _transferOut(bytes calldata data, address to) internal {
        HookData memory decoded = abi.decode(data, (HookData));

        if (!deposits[msg.sender][decoded.token][decoded.tokenId]) {
            revert NoDeposit(msg.sender, decoded.token, decoded.tokenId);
        }

        deposits[msg.sender][decoded.token][decoded.tokenId] = false;

        try IERC721(decoded.token).transferFrom(address(this), to, decoded.tokenId) {}
        catch {
            revert ERC721TransferFailed(decoded.token, address(this), to, decoded.tokenId);
        }

        // Verify transfer succeeded
        if (IERC721(decoded.token).ownerOf(decoded.tokenId) != to) {
            revert ERC721TransferFailed(decoded.token, address(this), to, decoded.tokenId);
        }
    }

    // ──────────────────────────────────────────────
    // Encoding helpers
    // ──────────────────────────────────────────────

    function encodeHookData(HookData calldata hookData) external pure returns (bytes memory) {
        return abi.encode(hookData);
    }

    function decodeHookData(bytes calldata data) external pure returns (HookData memory) {
        return abi.decode(data, (HookData));
    }
}
