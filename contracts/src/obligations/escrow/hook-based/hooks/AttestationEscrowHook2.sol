// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {IEscrowHook} from "../IEscrowHook.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {SchemaResolver} from "@eas/resolver/SchemaResolver.sol";
import {Attestation} from "@eas/Common.sol";

/// @title AttestationEscrowHook2
/// @notice An IEscrowHook that creates a validation attestation referencing
///         a pre-existing attestation on release.
/// @dev hookData is abi.encode(HookData).
///      Like AttestationEscrowHook, no assets are locked. On release, a
///      validation attestation is created that references the original
///      attestation UID, serving as a "stamp of approval."
///
///      The validation schema is registered at deploy time. The attester
///      of the validation attestation is this hook contract.
contract AttestationEscrowHook2 is IEscrowHook, SchemaResolver {
    struct HookData {
        bytes32 attestationUid;
        address recipient; // recipient of the validation attestation
    }

    IEAS public immutable eas;
    bytes32 public immutable VALIDATION_SCHEMA;

    /// @notice Tracks pending: caller → hookDataHash → count.
    mapping(address => mapping(bytes32 => uint256)) public pending;

    error AttestationCreationFailed();
    error NoPendingValidation(address caller, bytes32 hookDataHash);

    constructor(IEAS _eas, ISchemaRegistry _schemaRegistry) SchemaResolver(_eas) {
        eas = _eas;
        VALIDATION_SCHEMA =
            _schemaRegistry.register("bytes32 validatedAttestationUid", ISchemaResolver(address(this)), true);
    }

    // ──────────────────────────────────────────────

    function onLock(
        bytes calldata data,
        address,
        /* from */
        address /* escrow */
    )
        external
        payable
        override
    {
        if (msg.value != 0) revert IEscrowHook.UnexpectedNativeValue();

        bytes32 dataHash = keccak256(data);
        pending[msg.sender][dataHash]++;
    }

    function onRelease(
        bytes calldata data,
        address,
        /* to */
        address /* escrow */
    )
        external
        override
    {
        bytes32 dataHash = keccak256(data);
        if (pending[msg.sender][dataHash] == 0) {
            revert NoPendingValidation(msg.sender, dataHash);
        }

        pending[msg.sender][dataHash]--;

        HookData memory decoded = abi.decode(data, (HookData));
        bytes memory validationData = abi.encode(decoded.attestationUid);

        try eas.attest(
            AttestationRequest({
                schema: VALIDATION_SCHEMA,
                data: AttestationRequestData({
                    recipient: decoded.recipient,
                    expirationTime: 0,
                    revocable: false,
                    refUID: decoded.attestationUid,
                    data: validationData,
                    value: 0
                })
            })
        ) {}
        catch {
            revert AttestationCreationFailed();
        }
    }

    function onReturn(
        bytes calldata data,
        address,
        /* to */
        address /* escrow */
    )
        external
        override
    {
        bytes32 dataHash = keccak256(data);
        if (pending[msg.sender][dataHash] > 0) {
            pending[msg.sender][dataHash]--;
        }
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /* value */
    )
        internal
        view
        override
        returns (bool)
    {
        return attestation.attester == address(this);
    }

    function onRevoke(
        Attestation calldata attestation,
        uint256 /* value */
    )
        internal
        view
        override
        returns (bool)
    {
        return attestation.attester == address(this);
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
