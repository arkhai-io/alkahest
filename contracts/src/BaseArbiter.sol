// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IArbiter} from "./IArbiter.sol";

/// @title BaseArbiter
/// @notice Shared ERC165 support for contracts that implement `IArbiter`.
abstract contract BaseArbiter is IArbiter, ERC165 {
    /// @inheritdoc ERC165
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return interfaceId == type(IArbiter).interfaceId || super.supportsInterface(interfaceId);
    }
}
