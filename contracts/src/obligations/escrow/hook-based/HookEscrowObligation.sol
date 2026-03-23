// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {BaseEscrowObligation} from "../../../BaseEscrowObligation.sol";
import {IArbiter} from "../../../IArbiter.sol";
import {ArbiterUtils} from "../../../ArbiterUtils.sol";
import {IEscrowHook} from "./IEscrowHook.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";

/// @title HookEscrowObligation
/// @notice A generic escrow obligation that delegates lock/release/return to
///         an IEscrowHook contract. The hook is specified per-escrow, so
///         different escrow instances can use different hooks (ERC20, ERC721,
///         composed bundles via AllEscrowHook, or entirely custom logic).
///
///         Assets are held by the hook contracts, not by this obligation.
///         Hooks track deposits per-caller (msg.sender = this contract), so
///         no explicit authorization is required.
contract HookEscrowObligation is BaseEscrowObligation, IArbiter {
    using ArbiterUtils for Attestation;

    /// @param arbiter  The arbiter that judges fulfillment.
    /// @param demand   Arbiter-specific demand data.
    /// @param hook     The IEscrowHook implementation to call.
    /// @param hookData Opaque data forwarded to the hook on lock/release/return.
    struct ObligationData {
        address arbiter;
        bytes demand;
        address hook;
        bytes hookData;
    }

    constructor(
        IEAS _eas,
        ISchemaRegistry _schemaRegistry
    )
        BaseEscrowObligation(
            _eas,
            _schemaRegistry,
            "address arbiter, bytes demand, address hook, bytes hookData",
            true
        )
    {}

    // ──────────────────────────────────────────────
    // BaseEscrowObligation overrides
    // ──────────────────────────────────────────────

    function extractArbiterAndDemand(
        bytes memory data
    ) public pure override returns (address arbiter, bytes memory demand) {
        ObligationData memory decoded = abi.decode(data, (ObligationData));
        return (decoded.arbiter, decoded.demand);
    }

    function _lockEscrow(bytes memory data, address from) internal override {
        ObligationData memory decoded = abi.decode(data, (ObligationData));
        IEscrowHook(decoded.hook).onLock{value: msg.value}(
            decoded.hookData,
            from,
            address(this)
        );
    }

    function _releaseEscrow(
        bytes memory escrowData,
        address to,
        bytes32 /* fulfillmentUid */
    ) internal override returns (bytes memory) {
        ObligationData memory decoded = abi.decode(
            escrowData,
            (ObligationData)
        );
        IEscrowHook(decoded.hook).onRelease(
            decoded.hookData,
            to,
            address(this)
        );
        return "";
    }

    function _returnEscrow(bytes memory data, address to) internal override {
        ObligationData memory decoded = abi.decode(data, (ObligationData));
        IEscrowHook(decoded.hook).onReturn(
            decoded.hookData,
            to,
            address(this)
        );
    }

    // ──────────────────────────────────────────────
    // IArbiter – allows demanding a HookEscrow
    // ──────────────────────────────────────────────

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 /* fulfilling */
    ) public view override returns (bool) {
        if (!obligation._checkIntrinsic(ATTESTATION_SCHEMA)) return false;

        ObligationData memory payment = abi.decode(
            obligation.data,
            (ObligationData)
        );
        ObligationData memory demandData = abi.decode(demand, (ObligationData));

        return
            payment.hook == demandData.hook &&
            keccak256(payment.hookData) == keccak256(demandData.hookData) &&
            payment.arbiter == demandData.arbiter &&
            keccak256(payment.demand) == keccak256(demandData.demand);
    }

    // ──────────────────────────────────────────────
    // Convenience methods
    // ──────────────────────────────────────────────

    function doObligation(
        ObligationData calldata data,
        uint64 expirationTime
    ) external payable returns (bytes32) {
        return
            _doObligationForRaw(
                abi.encode(data),
                expirationTime,
                msg.sender,
                bytes32(0)
            );
    }

    function doObligationFor(
        ObligationData calldata data,
        uint64 expirationTime,
        address recipient
    ) external payable returns (bytes32) {
        return
            _doObligationForRaw(
                abi.encode(data),
                expirationTime,
                recipient,
                bytes32(0)
            );
    }

    function collectEscrow(
        bytes32 escrow,
        bytes32 fulfillment
    ) external returns (bool) {
        collectEscrowRaw(escrow, fulfillment);
        return true;
    }

    function getObligationData(
        bytes32 uid
    ) public view returns (ObligationData memory) {
        Attestation memory attestation = _getAttestation(uid);
        return abi.decode(attestation.data, (ObligationData));
    }

    function decodeObligationData(
        bytes calldata data
    ) public pure returns (ObligationData memory) {
        return abi.decode(data, (ObligationData));
    }

    // Allow contract to receive native tokens (for hooks that deal with ETH)
    receive() external payable override {}
}
