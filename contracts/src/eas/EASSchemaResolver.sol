// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {AccessDenied, Attestation, InvalidEAS, InvalidLength, uncheckedInc} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";

/// @title EASSchemaResolver
/// @notice Minimal EAS-compatible schema resolver base.
/// @dev Preserves EAS resolver callback semantics while avoiding upstream dependencies that require newer EVM opcodes.
abstract contract EASSchemaResolver is ISchemaResolver {
    error InsufficientValue();
    error NotPayable();

    IEAS internal immutable _eas;

    constructor(IEAS eas) {
        if (address(eas) == address(0)) revert InvalidEAS();
        _eas = eas;
    }

    modifier onlyEAS() {
        if (msg.sender != address(_eas)) revert AccessDenied();
        _;
    }

    /// @notice Returns the EAS resolver API compatibility version.
    function version() external pure returns (string memory) {
        return "1.3.0";
    }

    /// @inheritdoc ISchemaResolver
    function isPayable() public pure virtual returns (bool) {
        return false;
    }

    receive() external payable virtual {
        if (!isPayable()) revert NotPayable();
    }

    /// @inheritdoc ISchemaResolver
    function attest(Attestation calldata attestation) external payable onlyEAS returns (bool) {
        return onAttest(attestation, msg.value);
    }

    /// @inheritdoc ISchemaResolver
    function multiAttest(Attestation[] calldata attestations, uint256[] calldata values)
        external
        payable
        onlyEAS
        returns (bool)
    {
        uint256 length = attestations.length;
        if (length != values.length) revert InvalidLength();

        uint256 remainingValue = msg.value;
        for (uint256 i = 0; i < length; i = uncheckedInc(i)) {
            uint256 value = values[i];
            if (value > remainingValue) revert InsufficientValue();
            if (!onAttest(attestations[i], value)) return false;

            unchecked {
                remainingValue -= value;
            }
        }

        return true;
    }

    /// @inheritdoc ISchemaResolver
    function revoke(Attestation calldata attestation) external payable onlyEAS returns (bool) {
        return onRevoke(attestation, msg.value);
    }

    /// @inheritdoc ISchemaResolver
    function multiRevoke(Attestation[] calldata attestations, uint256[] calldata values)
        external
        payable
        onlyEAS
        returns (bool)
    {
        uint256 length = attestations.length;
        if (length != values.length) revert InvalidLength();

        uint256 remainingValue = msg.value;
        for (uint256 i = 0; i < length; i = uncheckedInc(i)) {
            uint256 value = values[i];
            if (value > remainingValue) revert InsufficientValue();
            if (!onRevoke(attestations[i], value)) return false;

            unchecked {
                remainingValue -= value;
            }
        }

        return true;
    }

    function onAttest(Attestation calldata attestation, uint256 value) internal virtual returns (bool);

    function onRevoke(Attestation calldata attestation, uint256 value) internal virtual returns (bool);
}
