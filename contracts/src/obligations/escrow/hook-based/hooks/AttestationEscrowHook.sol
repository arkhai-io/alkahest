// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEscrowHook} from "../IEscrowHook.sol";
import {IEAS, AttestationRequest} from "@eas/IEAS.sol";

/// @title AttestationEscrowHook
/// @notice An IEscrowHook that creates an EAS attestation on release.
/// @dev hookData is abi.encode(HookData).
///      No assets are locked or returned — the "escrow" is a promise to
///      create an attestation upon fulfillment.
///
///      On lock:    no-op (nothing to escrow).
///      On release: creates the attestation via EAS. The attester is this
///                  hook contract.
///      On return:  no-op (nothing to return).
///
///      No per-caller deposit tracking needed since there are no assets.
///      However, we track a nonce per-caller to prevent replay of release
///      calls for the same escrow.
contract AttestationEscrowHook is IEscrowHook {
    struct HookData {
        AttestationRequest attestation;
    }

    IEAS public immutable eas;

    /// @notice Tracks pending releases: caller → hookDataHash → pending.
    mapping(address => mapping(bytes32 => bool)) public pending;

    error AttestationCreationFailed();
    error NoPendingAttestation(address caller, bytes32 hookDataHash);

    constructor(IEAS _eas) {
        eas = _eas;
    }

    // ──────────────────────────────────────────────

    function onLock(
        bytes calldata data,
        address /* from */,
        address /* escrow */
    ) external payable override {
        // Mark as pending so onRelease can verify it was locked via a
        // legitimate obligation flow.
        bytes32 dataHash = keccak256(data);
        pending[msg.sender][dataHash] = true;
    }

    function onRelease(
        bytes calldata data,
        address /* to */,
        address /* escrow */
    ) external override {
        bytes32 dataHash = keccak256(data);
        if (!pending[msg.sender][dataHash]) {
            revert NoPendingAttestation(msg.sender, dataHash);
        }

        pending[msg.sender][dataHash] = false;

        HookData memory decoded = abi.decode(data, (HookData));
        try eas.attest(decoded.attestation) {} catch {
            revert AttestationCreationFailed();
        }
    }

    function onReturn(
        bytes calldata data,
        address /* to */,
        address /* escrow */
    ) external override {
        // Clear the pending state — the attestation won't be created.
        bytes32 dataHash = keccak256(data);
        if (pending[msg.sender][dataHash]) {
            pending[msg.sender][dataHash] = false;
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
