// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

interface IEscrow {
    event EscrowMade(bytes32 indexed escrowUid, address indexed escrower);
    event EscrowCollected(bytes32 indexed escrowUid, bytes32 indexed fulfillmentUid, address indexed fulfiller);
    event EscrowReclaimed(bytes32 indexed escrowUid, address indexed escrower);

    function collect(bytes32 escrowUid, bytes32 fulfillmentUid) external returns (bytes memory result);
    function reclaim(bytes32 escrowUid) external returns (bool);
    function decodeCondition(bytes calldata escrowData) external pure returns (address arbiter, bytes memory demand);
}
