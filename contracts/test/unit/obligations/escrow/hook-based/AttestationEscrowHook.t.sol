// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import {IEscrowHook} from "@src/obligations/escrow/hook-based/IEscrowHook.sol";
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
    address internal otherRecipient = makeAddr("otherRecipient");
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

    function testAttestationHookRejectsNativeValueOnLock() public {
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

        vm.deal(caller, 1 ether);
        vm.prank(caller);
        vm.expectRevert(IEscrowHook.UnexpectedNativeValue.selector);
        hook.onLock{value: 1 wei}(data, caller, address(this));

        assertEq(address(hook).balance, 0);
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

    function testAttestationHook2RejectsNativeValueOnLock() public {
        bytes memory data =
            abi.encode(AttestationEscrowHook2.HookData({attestationUid: existingAttestation, recipient: recipient}));

        vm.deal(caller, 1 ether);
        vm.prank(caller);
        vm.expectRevert(IEscrowHook.UnexpectedNativeValue.selector);
        hook2.onLock{value: 1 wei}(data, caller, address(this));

        assertEq(address(hook2).balance, 0);
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

    function testAttestationHook2RejectsForgedValidationAttestation() public {
        bytes32 validationSchema = hook2.VALIDATION_SCHEMA();

        vm.expectRevert();
        vm.prank(caller);
        eas.attest(
            AttestationRequest({
                schema: validationSchema,
                data: AttestationRequestData({
                    recipient: recipient,
                    expirationTime: 0,
                    revocable: false,
                    refUID: existingAttestation,
                    data: abi.encode(existingAttestation),
                    value: 0
                })
            })
        );
    }

    function testAttestationHook2UsesEncodedRecipient() public {
        bytes memory data =
            abi.encode(AttestationEscrowHook2.HookData({attestationUid: existingAttestation, recipient: recipient}));

        vm.startPrank(caller);
        hook2.onLock(data, caller, address(this));

        vm.recordLogs();
        hook2.onRelease(data, otherRecipient, address(this));
        Vm.Log[] memory logs = vm.getRecordedLogs();
        vm.stopPrank();

        bytes32 uid = _findValidationUid(logs);
        assertNotEq(uid, bytes32(0));

        (, address attester, bytes32 schema) = _readAttestedTopics(logs, uid);
        assertEq(attester, address(hook2));
        assertEq(schema, hook2.VALIDATION_SCHEMA());

        assertEq(eas.getAttestation(uid).recipient, recipient);
        assertEq(eas.getAttestation(uid).refUID, existingAttestation);
    }

    function _findValidationUid(Vm.Log[] memory logs) internal view returns (bytes32 uid) {
        for (uint256 i; i < logs.length; ++i) {
            if (
                logs[i].topics.length == 4
                    && logs[i].topics[0] == keccak256("Attested(address,address,bytes32,bytes32)")
                    && logs[i].topics[3] == hook2.VALIDATION_SCHEMA()
            ) {
                return abi.decode(logs[i].data, (bytes32));
            }
        }
    }

    function _readAttestedTopics(Vm.Log[] memory logs, bytes32 uid)
        internal
        pure
        returns (address recipient_, address attester, bytes32 schema)
    {
        for (uint256 i; i < logs.length; ++i) {
            if (
                logs[i].topics.length == 4
                    && logs[i].topics[0] == keccak256("Attested(address,address,bytes32,bytes32)")
                    && abi.decode(logs[i].data, (bytes32)) == uid
            ) {
                recipient_ = address(uint160(uint256(logs[i].topics[1])));
                attester = address(uint160(uint256(logs[i].topics[2])));
                schema = logs[i].topics[3];
                return (recipient_, attester, schema);
            }
        }
    }
}
