// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {TokenBundleEscrowObligation} from "../../obligations/escrow/default/TokenBundleEscrowObligation.sol";
import {TokenBundlePaymentObligation} from "../../obligations/payment/TokenBundlePaymentObligation.sol";
import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";

contract TokenBundleBarterUtils is IERC1155Receiver {
    IEAS internal eas;
    TokenBundleEscrowObligation internal bundleEscrow;
    TokenBundlePaymentObligation internal bundlePayment;

    error CouldntCollectEscrow();
    error InvalidSignatureLength();

    struct ERC20PermitSignature {
        uint8 v;
        bytes32 r;
        bytes32 s;
        uint256 deadline;
    }

    constructor(IEAS _eas, TokenBundleEscrowObligation _bundleEscrow, TokenBundlePaymentObligation _bundlePayment) {
        eas = _eas;
        bundleEscrow = _bundleEscrow;
        bundlePayment = _bundlePayment;
    }

    function permitAndPayBundle(
        TokenBundlePaymentObligation.ObligationData calldata data,
        bytes32 refUID,
        ERC20PermitSignature[] calldata permits
    ) external payable returns (bytes32) {
        if (permits.length != data.erc20Tokens.length) {
            revert InvalidSignatureLength();
        }

        // Handle ERC20 permits - approve BarterUtils
        for (uint256 i = 0; i < data.erc20Tokens.length; i++) {
            IERC20Permit(data.erc20Tokens[i])
                .permit(
                    msg.sender,
                    address(this),
                    data.erc20Amounts[i],
                    permits[i].deadline,
                    permits[i].v,
                    permits[i].r,
                    permits[i].s
                );
        }

        // Pull all tokens from user to BarterUtils
        _pullPaymentBundleTokens(data);

        // Approve obligation contract to spend BarterUtils' tokens
        _approvePaymentBundleTokens(data, address(bundlePayment));

        return bundlePayment.doObligationFor{value: data.nativeAmount}(data, msg.sender, refUID);
    }

    function _payBundleForBundle(bytes32 buyAttestation, TokenBundlePaymentObligation.ObligationData memory demand)
        internal
        returns (bytes32)
    {
        // Pull all tokens from user to BarterUtils
        _pullPaymentBundleTokens(demand);

        // Approve obligation contract to spend BarterUtils' tokens
        _approvePaymentBundleTokens(demand, address(bundlePayment));

        bytes32 sellAttestation =
            bundlePayment.doObligationFor{value: demand.nativeAmount}(demand, msg.sender, buyAttestation);
        bundleEscrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    function permitAndPayBundleForBundle(bytes32 buyAttestation, ERC20PermitSignature[] calldata permits)
        external
        payable
        returns (bytes32)
    {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        TokenBundleEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (TokenBundleEscrowObligation.ObligationData));
        TokenBundlePaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (TokenBundlePaymentObligation.ObligationData));

        if (permits.length != demand.erc20Tokens.length) {
            revert InvalidSignatureLength();
        }

        // Handle ERC20 permits - approve BarterUtils
        for (uint256 i = 0; i < demand.erc20Tokens.length; i++) {
            IERC20Permit(demand.erc20Tokens[i])
                .permit(
                    msg.sender,
                    address(this),
                    demand.erc20Amounts[i],
                    permits[i].deadline,
                    permits[i].v,
                    permits[i].r,
                    permits[i].s
                );
        }

        return _payBundleForBundle(buyAttestation, demand);
    }

    function payBundleForBundle(bytes32 buyAttestation) external payable returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        TokenBundleEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (TokenBundleEscrowObligation.ObligationData));
        TokenBundlePaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (TokenBundlePaymentObligation.ObligationData));

        return _payBundleForBundle(buyAttestation, demand);
    }

    // Helper function to pull all tokens in a payment bundle from user to BarterUtils
    function _pullPaymentBundleTokens(TokenBundlePaymentObligation.ObligationData memory data) internal {
        // Pull ERC20 tokens
        for (uint256 i = 0; i < data.erc20Tokens.length; i++) {
            IERC20(data.erc20Tokens[i]).transferFrom(msg.sender, address(this), data.erc20Amounts[i]);
        }

        // Pull ERC721 tokens
        for (uint256 i = 0; i < data.erc721Tokens.length; i++) {
            IERC721(data.erc721Tokens[i]).transferFrom(msg.sender, address(this), data.erc721TokenIds[i]);
        }

        // Pull ERC1155 tokens
        for (uint256 i = 0; i < data.erc1155Tokens.length; i++) {
            IERC1155(data.erc1155Tokens[i])
                .safeTransferFrom(msg.sender, address(this), data.erc1155TokenIds[i], data.erc1155Amounts[i], "");
        }
    }

    // Helper function to approve obligation contract to spend all tokens in a payment bundle
    function _approvePaymentBundleTokens(TokenBundlePaymentObligation.ObligationData memory data, address spender)
        internal
    {
        // Approve ERC20 tokens
        for (uint256 i = 0; i < data.erc20Tokens.length; i++) {
            IERC20(data.erc20Tokens[i]).approve(spender, data.erc20Amounts[i]);
        }

        // Approve ERC721 tokens
        for (uint256 i = 0; i < data.erc721Tokens.length; i++) {
            IERC721(data.erc721Tokens[i]).approve(spender, data.erc721TokenIds[i]);
        }

        // Approve ERC1155 tokens
        for (uint256 i = 0; i < data.erc1155Tokens.length; i++) {
            IERC1155(data.erc1155Tokens[i]).setApprovalForAll(spender, true);
        }
    }

    // ERC1155 Receiver Implementation
    function onERC1155Received(address, address, uint256, uint256, bytes calldata)
        external
        pure
        override
        returns (bytes4)
    {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address, address, uint256[] calldata, uint256[] calldata, bytes calldata)
        external
        pure
        override
        returns (bytes4)
    {
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return interfaceId == type(IERC1155Receiver).interfaceId;
    }
}
