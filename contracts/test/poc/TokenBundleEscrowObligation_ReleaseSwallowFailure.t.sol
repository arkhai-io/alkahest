// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";

import {EAS} from "@eas/EAS.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
import {SchemaRegistry} from "@eas/SchemaRegistry.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import {IArbiter} from "@src/IArbiter.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {TokenBundleEscrowObligation} from "@src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol";

contract MockERC1155 is ERC1155 {
    constructor() ERC1155("") {}

    function mint(address to, uint256 id, uint256 amount) external {
        _mint(to, id, amount, "");
    }
}

contract TrueArbiter is IArbiter {
    function checkObligation(Attestation memory, bytes memory, bytes32) external pure returns (bool) {
        return true;
    }
}

// Rejects ETH and does not implement ERC1155Receiver.
contract RejectingRecipient {
    receive() external payable {
        revert("NO_ETH");
    }
}

contract TokenBundleEscrowObligation_ReleaseSwallowFailure_POC is Test {
    function _deployEAS() internal returns (IEAS eas, ISchemaRegistry registry) {
        SchemaRegistry schemaRegistry = new SchemaRegistry();
        EAS easImpl = new EAS(schemaRegistry);
        return (IEAS(address(easImpl)), ISchemaRegistry(address(schemaRegistry)));
    }

    // Test that the original POC now reverts (fix is working)
    function testPOC_TokenBundle_NowReverts() public {
        (IEAS eas, ISchemaRegistry schemaRegistry) = _deployEAS();

        TokenBundleEscrowObligation escrow = new TokenBundleEscrowObligation(eas, schemaRegistry);
        StringObligation stringObligation = new StringObligation(eas, schemaRegistry);
        TrueArbiter arbiter = new TrueArbiter();

        MockERC1155 token = new MockERC1155();

        address alice = makeAddr("alice");
        address bob = makeAddr("bob");
        RejectingRecipient badRecipient = new RejectingRecipient();

        uint256 tokenId = 100;
        uint256 amount = 10;
        uint256 nativeAmount = 1 ether;

        vm.deal(alice, 10 ether);
        token.mint(alice, tokenId, amount);

        TokenBundleEscrowObligation.ObligationData memory data;
        data.arbiter = address(arbiter);
        data.demand = abi.encode("demand");
        data.nativeAmount = nativeAmount;
        data.erc20Tokens = new address[](0);
        data.erc20Amounts = new uint256[](0);
        data.erc721Tokens = new address[](0);
        data.erc721TokenIds = new uint256[](0);
        data.erc1155Tokens = new address[](1);
        data.erc1155TokenIds = new uint256[](1);
        data.erc1155Amounts = new uint256[](1);
        data.erc1155Tokens[0] = address(token);
        data.erc1155TokenIds[0] = tokenId;
        data.erc1155Amounts[0] = amount;

        // Alice creates escrow, locking native + ERC1155 into the escrow contract.
        vm.startPrank(alice);
        token.setApprovalForAll(address(escrow), true);
        bytes32 escrowUid = escrow.doObligation{value: nativeAmount}(data, uint64(block.timestamp + 1 days));
        vm.stopPrank();

        assertEq(address(escrow).balance, nativeAmount, "native locked");
        assertEq(token.balanceOf(address(escrow), tokenId), amount, "erc1155 locked");

        // Create fulfillment whose recipient is a contract that rejects ETH and is not an ERC1155Receiver.
        // Non-tierable requires fulfillment.refUID == escrowUid.
        vm.prank(address(badRecipient));
        bytes32 fulfillmentUid =
            stringObligation.doObligation(StringObligation.ObligationData({item: "fulfillment"}), escrowUid);

        // NOW: Collect should REVERT because native token transfer fails
        vm.startPrank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(
                TokenBundleEscrowObligation.NativeTokenTransferFailed.selector,
                address(badRecipient),
                nativeAmount
            )
        );
        escrow.collectEscrow(escrowUid, fulfillmentUid);
        vm.stopPrank();

        // Verify escrow is NOT revoked (attestation still valid) because tx reverted
        Attestation memory escrowAtt = eas.getAttestation(escrowUid);
        assertEq(escrowAtt.revocationTime, 0, "escrow should NOT be revoked");

        // Assets are safe, not stuck
        assertEq(address(escrow).balance, nativeAmount, "native still safe in escrow");
        assertEq(token.balanceOf(address(escrow), tokenId), amount, "erc1155 still safe in escrow");
    }

    // Test that unsafePartiallyCollectEscrow still allows partial collection (for last resort)
    function testPOC_TokenBundle_UnsafePartialAllowed() public {
        (IEAS eas, ISchemaRegistry schemaRegistry) = _deployEAS();

        TokenBundleEscrowObligation escrow = new TokenBundleEscrowObligation(eas, schemaRegistry);
        StringObligation stringObligation = new StringObligation(eas, schemaRegistry);
        TrueArbiter arbiter = new TrueArbiter();

        MockERC1155 token = new MockERC1155();

        address alice = makeAddr("alice");
        address bob = makeAddr("bob");
        RejectingRecipient badRecipient = new RejectingRecipient();

        uint256 tokenId = 100;
        uint256 amount = 10;
        uint256 nativeAmount = 1 ether;

        vm.deal(alice, 10 ether);
        token.mint(alice, tokenId, amount);

        TokenBundleEscrowObligation.ObligationData memory data;
        data.arbiter = address(arbiter);
        data.demand = abi.encode("demand");
        data.nativeAmount = nativeAmount;
        data.erc20Tokens = new address[](0);
        data.erc20Amounts = new uint256[](0);
        data.erc721Tokens = new address[](0);
        data.erc721TokenIds = new uint256[](0);
        data.erc1155Tokens = new address[](1);
        data.erc1155TokenIds = new uint256[](1);
        data.erc1155Amounts = new uint256[](1);
        data.erc1155Tokens[0] = address(token);
        data.erc1155TokenIds[0] = tokenId;
        data.erc1155Amounts[0] = amount;

        // Alice creates escrow, locking native + ERC1155 into the escrow contract.
        vm.startPrank(alice);
        token.setApprovalForAll(address(escrow), true);
        bytes32 escrowUid = escrow.doObligation{value: nativeAmount}(data, uint64(block.timestamp + 1 days));
        vm.stopPrank();

        assertEq(address(escrow).balance, nativeAmount, "native locked");
        assertEq(token.balanceOf(address(escrow), tokenId), amount, "erc1155 locked");

        // Create fulfillment whose recipient is a contract that rejects ETH and is not an ERC1155Receiver.
        vm.prank(address(badRecipient));
        bytes32 fulfillmentUid =
            stringObligation.doObligation(StringObligation.ObligationData({item: "fulfillment"}), escrowUid);

        // unsafePartiallyCollectEscrow allows partial collection (user's last resort choice)
        vm.startPrank(bob);

        // Expect events for failed transfers
        vm.expectEmit(true, false, false, true);
        emit TokenBundleEscrowObligation.NativeTokenTransferFailedOnRelease(
            address(badRecipient),
            nativeAmount
        );
        vm.expectEmit(true, false, false, true);
        emit TokenBundleEscrowObligation.ERC1155TransferFailedOnRelease(
            address(token),
            address(badRecipient),
            tokenId,
            amount
        );

        bool ok = escrow.unsafePartiallyCollectEscrow(escrowUid, fulfillmentUid);
        assertTrue(ok, "unsafe partial collect ok");
        vm.stopPrank();

        // Escrow IS revoked when using unsafe partial
        Attestation memory escrowAtt = eas.getAttestation(escrowUid);
        assertTrue(escrowAtt.revocationTime != 0, "escrow revoked when using unsafe");

        // Assets ARE stuck (this is the known trade-off with unsafe partial)
        assertEq(address(escrow).balance, nativeAmount, "native stuck (known unsafe behavior)");
        assertEq(token.balanceOf(address(escrow), tokenId), amount, "erc1155 stuck (known unsafe behavior)");
    }
}
