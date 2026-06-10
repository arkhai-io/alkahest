// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {ArbiterUtils} from "@src/ArbiterUtils.sol";
import {ERC8004Arbiter} from "@src/arbiters/ERC8004Arbiter.sol";

contract MockERC8004ValidationRegistry {
    address internal validator;
    uint8 internal response;

    function setValidationStatus(address _validator, uint8 _response) external {
        validator = _validator;
        response = _response;
    }

    function getValidationStatus(
        bytes32
    )
        external
        view
        returns (
            address validatorAddress,
            uint256 agentId,
            uint8 validationResponse,
            bytes32 responseHash,
            string memory tag,
            uint256 lastUpdate
        )
    {
        return (validator, 0, response, bytes32(0), "", block.timestamp);
    }
}

contract ERC8004ArbiterIntrinsicTest is Test {
    ERC8004Arbiter internal arbiter;
    MockERC8004ValidationRegistry internal registry;

    address internal validator = address(0x123);
    bytes32 internal requestHash = bytes32(uint256(12345));
    bytes32 internal escrowUid = bytes32(uint256(54321));

    function setUp() public {
        arbiter = new ERC8004Arbiter();
        registry = new MockERC8004ValidationRegistry();
        registry.setValidationStatus(validator, 75);
    }

    function _demand() internal view returns (bytes memory) {
        return
            abi.encode(
                ERC8004Arbiter.DemandData({
                    validationRegistry: address(registry),
                    validatorAddress: validator,
                    minResponse: 50
                })
            );
    }

    function _attestation() internal view returns (Attestation memory) {
        return
            Attestation({
                uid: requestHash,
                schema: bytes32(0),
                time: uint64(block.timestamp),
                expirationTime: uint64(0),
                revocationTime: uint64(0),
                refUID: escrowUid,
                recipient: address(0),
                attester: address(0),
                revocable: true,
                data: bytes("")
            });
    }

    function testRejectsExpiredApprovedValidation() public {
        vm.warp(1 days);
        Attestation memory attestation = _attestation();
        attestation.expirationTime = uint64(block.timestamp - 1);

        vm.expectRevert(ArbiterUtils.DeadlineExpired.selector);
        arbiter.checkObligation(attestation, _demand(), escrowUid);
    }

    function testRejectsRevokedApprovedValidation() public {
        Attestation memory attestation = _attestation();
        attestation.revocationTime = uint64(block.timestamp);

        vm.expectRevert(ArbiterUtils.AttestationRevoked.selector);
        arbiter.checkObligation(attestation, _demand(), escrowUid);
    }
}
