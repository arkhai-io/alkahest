// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";

/// @title ArbiterUtils
/// @notice Shared helpers for checking EAS attestation intrinsic validity.
library ArbiterUtils {
    /// @notice Raised when an attestation has expired.
    error DeadlineExpired();
    /// @notice Raised when an attestation has been revoked.
    error AttestationRevoked();
    /// @notice Raised when an attestation does not use the expected schema.
    error InvalidSchema();
    /// @notice Raised when an attestation UID is zero.
    error InvalidAttestationUid();

    /// @notice Returns whether an attestation has a nonzero expiration that has passed.
    function _checkExpired(Attestation memory obligation) internal view returns (bool) {
        return obligation.expirationTime != 0 && obligation.expirationTime <= block.timestamp;
    }

    /// @notice Returns whether an attestation has been revoked.
    function _checkRevoked(Attestation memory obligation) internal pure returns (bool) {
        return obligation.revocationTime != 0;
    }

    /// @notice Reverts if an attestation has a zero UID, is expired, or is revoked.
    function _checkIntrinsic(Attestation memory obligation) internal view returns (bool) {
        if (obligation.uid == bytes32(0)) revert InvalidAttestationUid();
        if (_checkExpired(obligation)) revert DeadlineExpired();
        if (_checkRevoked(obligation)) revert AttestationRevoked();

        return true;
    }

    /// @notice Reverts if an attestation has the wrong schema or fails intrinsic checks.
    /// @param obligation Attestation to validate.
    /// @param schema Required schema UID.
    function _checkIntrinsic(Attestation memory obligation, bytes32 schema) internal view returns (bool) {
        if (obligation.schema != schema) revert InvalidSchema();
        return _checkIntrinsic(obligation);
    }
}
