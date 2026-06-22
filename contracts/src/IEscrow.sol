// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

/// @title IEscrow
/// @notice Common interface implemented by escrow obligation contracts.
interface IEscrow {
    /// @notice Emitted when escrow assets are locked and the escrow attestation is created.
    event EscrowMade(bytes32 indexed escrowUid, address indexed escrower);
    /// @notice Emitted when an escrow is successfully collected by a fulfillment recipient.
    event EscrowCollected(bytes32 indexed escrowUid, bytes32 indexed fulfillmentUid, address indexed fulfiller);
    /// @notice Emitted when an expired escrow is reclaimed by its original escrower.
    event EscrowReclaimed(bytes32 indexed escrowUid, address indexed escrower);

    /// @notice Collects an escrow using a fulfillment attestation.
    /// @param escrowUid UID of the escrow attestation.
    /// @param fulfillmentUid UID of the fulfillment attestation.
    /// @return result Escrow-specific return data from the underlying release logic.
    function collect(bytes32 escrowUid, bytes32 fulfillmentUid) external returns (bytes memory result);

    /// @notice Reclaims an expired escrow and returns locked assets to the escrower.
    /// @param escrowUid UID of the escrow attestation.
    /// @return True if the reclaim succeeds.
    function reclaim(bytes32 escrowUid) external returns (bool);

    /// @notice Decodes an escrow attestation's condition into arbiter and demand data.
    /// @param escrowData ABI-encoded escrow obligation data.
    /// @return arbiter Address of the arbiter that validates fulfillment.
    /// @return demand Arbiter-specific demand bytes.
    function decodeCondition(bytes calldata escrowData) external pure returns (address arbiter, bytes memory demand);
}
