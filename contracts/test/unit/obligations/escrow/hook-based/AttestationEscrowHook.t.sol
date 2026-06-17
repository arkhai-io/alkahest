// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {AttestationEscrowHook} from "@src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol";
import {AttestationEscrowHook2} from "@src/obligations/escrow/hook-based/hooks/AttestationEscrowHook2.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ISchemaResolver} from "@eas/resolver/ISchemaResolver.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract AttestationEscrowHookTest is Test {
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    AttestationEscrowHook public hook;
    AttestationEscrowHook2 public hook2;

    address internal caller = makeAddr("caller");
    address internal recipient = makeAddr("recipient");
    bytes32 internal testSchema;
    bytes32 internal existingAttestation;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        hook = new AttestationEscrowHook(eas);
        hook2 = new AttestationEscrowHook2(eas, schemaRegistry);

        testSchema = schemaRegistry.register("string testData", ISchemaResolver(address(0)), true);
        existingAttestation = eas.attest(
            AttestationRequest({
                schema: testSchema,
                data: AttestationRequestData({
                    recipient: recipient,
                    expirationTime: 0,
                    revocable: true,
                    refUID: bytes32(0),
                    data: abi.encode("existing"),
                    value: 0
                })
            })
        );
    }

    function testAttestationHookCountsIdenticalPendingLocks() public {
        bytes memory data = abi.encode(
            AttestationEscrowHook.HookData({
                attestation: AttestationRequest({
                    schema: testSchema,
                    data: AttestationRequestData({
                        recipient: recipient,
                        expirationTime: 0,
                        revocable: true,
                        refUID: bytes32(0),
                        data: abi.encode("release"),
                        value: 0
                    })
                })
            })
        );
        bytes32 dataHash = keccak256(data);

        vm.startPrank(caller);
        hook.onLock(data, caller, address(this));
        hook.onLock(data, caller, address(this));
        assertEq(hook.pending(caller, dataHash), 2);

        hook.onRelease(data, recipient, address(this));
        assertEq(hook.pending(caller, dataHash), 1);

        hook.onRelease(data, recipient, address(this));
        assertEq(hook.pending(caller, dataHash), 0);

        vm.expectRevert(abi.encodeWithSelector(AttestationEscrowHook.NoPendingAttestation.selector, caller, dataHash));
        hook.onRelease(data, recipient, address(this));
        vm.stopPrank();
    }

    function testAttestationHookReturnDecrementsOnePendingLock() public {
        bytes memory data = abi.encode(
            AttestationEscrowHook.HookData({
                attestation: AttestationRequest({
                    schema: testSchema,
                    data: AttestationRequestData({
                        recipient: recipient,
                        expirationTime: 0,
                        revocable: true,
                        refUID: bytes32(0),
                        data: abi.encode("return"),
                        value: 0
                    })
                })
            })
        );
        bytes32 dataHash = keccak256(data);

        vm.startPrank(caller);
        hook.onLock(data, caller, address(this));
        hook.onLock(data, caller, address(this));
        hook.onReturn(data, caller, address(this));
        assertEq(hook.pending(caller, dataHash), 1);
        hook.onRelease(data, recipient, address(this));
        assertEq(hook.pending(caller, dataHash), 0);
        vm.stopPrank();
    }

    function testAttestationHook2CountsIdenticalPendingLocks() public {
        bytes memory data =
            abi.encode(AttestationEscrowHook2.HookData({attestationUid: existingAttestation, recipient: recipient}));
        bytes32 dataHash = keccak256(data);

        vm.startPrank(caller);
        hook2.onLock(data, caller, address(this));
        hook2.onLock(data, caller, address(this));
        assertEq(hook2.pending(caller, dataHash), 2);

        hook2.onRelease(data, recipient, address(this));
        assertEq(hook2.pending(caller, dataHash), 1);

        hook2.onRelease(data, recipient, address(this));
        assertEq(hook2.pending(caller, dataHash), 0);

        vm.expectRevert(abi.encodeWithSelector(AttestationEscrowHook2.NoPendingValidation.selector, caller, dataHash));
        hook2.onRelease(data, recipient, address(this));
        vm.stopPrank();
    }

    function testAttestationHook2ReturnDecrementsOnePendingLock() public {
        bytes memory data =
            abi.encode(AttestationEscrowHook2.HookData({attestationUid: existingAttestation, recipient: recipient}));
        bytes32 dataHash = keccak256(data);

        vm.startPrank(caller);
        hook2.onLock(data, caller, address(this));
        hook2.onLock(data, caller, address(this));
        hook2.onReturn(data, caller, address(this));
        assertEq(hook2.pending(caller, dataHash), 1);
        hook2.onRelease(data, recipient, address(this));
        assertEq(hook2.pending(caller, dataHash), 0);
        vm.stopPrank();
    }
}
