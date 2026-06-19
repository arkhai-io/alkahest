// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

interface IEscrow {
    function collect(bytes32 escrow, bytes32 fulfillment) external returns (bytes memory);
}
