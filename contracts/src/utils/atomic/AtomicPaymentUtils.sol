// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {ERC20PaymentObligation} from "../../obligations/payment/ERC20PaymentObligation.sol";
import {ERC721PaymentObligation} from "../../obligations/payment/ERC721PaymentObligation.sol";
import {ERC1155PaymentObligation} from "../../obligations/payment/ERC1155PaymentObligation.sol";
import {NativeTokenPaymentObligation} from "../../obligations/payment/NativeTokenPaymentObligation.sol";
import {TokenBundlePaymentObligation} from "../../obligations/payment/TokenBundlePaymentObligation.sol";
import {IEscrow} from "../../IEscrow.sol";

interface IEscrowConditionDecoder {
    function decodeCondition(bytes memory data) external pure returns (address arbiter, bytes memory demand);
}

contract AtomicPaymentUtils is IERC1155Receiver {
    using SafeERC20 for IERC20;

    IEAS internal immutable eas;
    ERC20PaymentObligation internal immutable erc20Payment;
    ERC721PaymentObligation internal immutable erc721Payment;
    ERC1155PaymentObligation internal immutable erc1155Payment;
    NativeTokenPaymentObligation internal immutable nativePayment;
    TokenBundlePaymentObligation internal immutable bundlePayment;

    error AttestationNotFound(bytes32 attestationId);
    error CouldntCollectEscrow();
    error IncorrectNativeAmount(uint256 expected, uint256 actual);
    error InvalidSignatureLength();
    error PermitFailed(address token, string reason);

    struct ERC20PermitSignature {
        uint8 v;
        bytes32 r;
        bytes32 s;
        uint256 deadline;
    }

    constructor(
        IEAS _eas,
        ERC20PaymentObligation _erc20Payment,
        ERC721PaymentObligation _erc721Payment,
        ERC1155PaymentObligation _erc1155Payment,
        NativeTokenPaymentObligation _nativePayment,
        TokenBundlePaymentObligation _bundlePayment
    ) {
        eas = _eas;
        erc20Payment = _erc20Payment;
        erc721Payment = _erc721Payment;
        erc1155Payment = _erc1155Payment;
        nativePayment = _nativePayment;
        bundlePayment = _bundlePayment;
    }

    function permitAndPayWithErc20(
        address token,
        uint256 amount,
        address payee,
        bytes32 refUID,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (bytes32) {
        _permitErc20(token, amount, deadline, v, r, s);

        ERC20PaymentObligation.ObligationData memory data =
            ERC20PaymentObligation.ObligationData({token: token, amount: amount, payee: payee});

        return _payErc20(data, refUID);
    }

    function payErc20AndCollect(bytes32 escrowUid) external returns (bytes32) {
        (Attestation memory escrow, bytes memory demand) = _getEscrowAndDemand(escrowUid);
        bytes32 fulfillmentUid = _payErc20(abi.decode(demand, (ERC20PaymentObligation.ObligationData)), escrowUid);
        _collect(escrow.attester, escrowUid, fulfillmentUid);
        return fulfillmentUid;
    }

    function permitAndPayErc20AndCollect(bytes32 escrowUid, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        returns (bytes32)
    {
        (Attestation memory escrow, bytes memory demand) = _getEscrowAndDemand(escrowUid);
        ERC20PaymentObligation.ObligationData memory data = abi.decode(demand, (ERC20PaymentObligation.ObligationData));
        _permitErc20(data.token, data.amount, deadline, v, r, s);
        bytes32 fulfillmentUid = _payErc20(data, escrowUid);
        _collect(escrow.attester, escrowUid, fulfillmentUid);
        return fulfillmentUid;
    }

    function payErc721AndCollect(bytes32 escrowUid) external returns (bytes32) {
        (Attestation memory escrow, bytes memory demand) = _getEscrowAndDemand(escrowUid);
        ERC721PaymentObligation.ObligationData memory data =
            abi.decode(demand, (ERC721PaymentObligation.ObligationData));

        IERC721(data.token).transferFrom(msg.sender, address(this), data.tokenId);
        IERC721(data.token).approve(address(erc721Payment), data.tokenId);

        bytes32 fulfillmentUid = erc721Payment.doObligationFor(data, msg.sender, escrowUid);
        _collect(escrow.attester, escrowUid, fulfillmentUid);
        return fulfillmentUid;
    }

    function payErc1155AndCollect(bytes32 escrowUid) external returns (bytes32) {
        (Attestation memory escrow, bytes memory demand) = _getEscrowAndDemand(escrowUid);
        ERC1155PaymentObligation.ObligationData memory data =
            abi.decode(demand, (ERC1155PaymentObligation.ObligationData));

        IERC1155(data.token).safeTransferFrom(msg.sender, address(this), data.tokenId, data.amount, "");
        IERC1155(data.token).setApprovalForAll(address(erc1155Payment), true);

        bytes32 fulfillmentUid = erc1155Payment.doObligationFor(data, msg.sender, escrowUid);
        _collect(escrow.attester, escrowUid, fulfillmentUid);
        return fulfillmentUid;
    }

    function payNativeAndCollect(bytes32 escrowUid) external payable returns (bytes32) {
        (Attestation memory escrow, bytes memory demand) = _getEscrowAndDemand(escrowUid);
        NativeTokenPaymentObligation.ObligationData memory data =
            abi.decode(demand, (NativeTokenPaymentObligation.ObligationData));

        if (msg.value != data.amount) revert IncorrectNativeAmount(data.amount, msg.value);
        bytes32 fulfillmentUid = nativePayment.doObligationFor{value: data.amount}(data, msg.sender, escrowUid);
        _collect(escrow.attester, escrowUid, fulfillmentUid);
        return fulfillmentUid;
    }

    function payBundleAndCollect(bytes32 escrowUid) external payable returns (bytes32) {
        (Attestation memory escrow, bytes memory demand) = _getEscrowAndDemand(escrowUid);
        bytes32 fulfillmentUid =
            _payBundle(abi.decode(demand, (TokenBundlePaymentObligation.ObligationData)), escrowUid);
        _collect(escrow.attester, escrowUid, fulfillmentUid);
        return fulfillmentUid;
    }

    function permitAndPayBundleAndCollect(bytes32 escrowUid, ERC20PermitSignature[] calldata permits)
        external
        payable
        returns (bytes32)
    {
        (Attestation memory escrow, bytes memory demand) = _getEscrowAndDemand(escrowUid);
        TokenBundlePaymentObligation.ObligationData memory data =
            abi.decode(demand, (TokenBundlePaymentObligation.ObligationData));

        _permitBundle(data, permits);
        bytes32 fulfillmentUid = _payBundle(data, escrowUid);
        _collect(escrow.attester, escrowUid, fulfillmentUid);
        return fulfillmentUid;
    }

    function _payErc20(ERC20PaymentObligation.ObligationData memory data, bytes32 refUID) internal returns (bytes32) {
        IERC20(data.token).safeTransferFrom(msg.sender, address(this), data.amount);
        IERC20(data.token).forceApprove(address(erc20Payment), data.amount);
        return erc20Payment.doObligationFor(data, msg.sender, refUID);
    }

    function _payBundle(TokenBundlePaymentObligation.ObligationData memory data, bytes32 refUID)
        internal
        returns (bytes32)
    {
        if (msg.value != data.nativeAmount) revert IncorrectNativeAmount(data.nativeAmount, msg.value);
        _pullPaymentBundleTokens(data);
        _approvePaymentBundleTokens(data, address(bundlePayment));
        return bundlePayment.doObligationFor{value: data.nativeAmount}(data, msg.sender, refUID);
    }

    function _getEscrowAndDemand(bytes32 escrowUid)
        internal
        view
        returns (Attestation memory escrow, bytes memory demand)
    {
        escrow = eas.getAttestation(escrowUid);
        if (escrow.uid == bytes32(0) || escrow.uid != escrowUid) revert AttestationNotFound(escrowUid);
        (, demand) = IEscrowConditionDecoder(escrow.attester).decodeCondition(escrow.data);
    }

    function _collect(address escrowContract, bytes32 escrowUid, bytes32 fulfillmentUid) internal {
        try IEscrow(escrowContract).collect(escrowUid, fulfillmentUid) {}
        catch {
            revert CouldntCollectEscrow();
        }
    }

    function _permitErc20(address token, uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s) internal {
        try IERC20Permit(token).permit(msg.sender, address(this), amount, deadline, v, r, s) {}
        catch Error(string memory reason) {
            revert PermitFailed(token, reason);
        } catch {
            revert PermitFailed(token, "Unknown error");
        }
    }

    function _permitBundle(
        TokenBundlePaymentObligation.ObligationData memory data,
        ERC20PermitSignature[] calldata permits
    ) internal {
        if (permits.length != data.erc20Tokens.length) {
            revert InvalidSignatureLength();
        }

        for (uint256 i = 0; i < data.erc20Tokens.length; i++) {
            _permitErc20(
                data.erc20Tokens[i], data.erc20Amounts[i], permits[i].deadline, permits[i].v, permits[i].r, permits[i].s
            );
        }
    }

    function _pullPaymentBundleTokens(TokenBundlePaymentObligation.ObligationData memory data) internal {
        for (uint256 i = 0; i < data.erc20Tokens.length; i++) {
            IERC20(data.erc20Tokens[i]).safeTransferFrom(msg.sender, address(this), data.erc20Amounts[i]);
        }

        for (uint256 i = 0; i < data.erc721Tokens.length; i++) {
            IERC721(data.erc721Tokens[i]).transferFrom(msg.sender, address(this), data.erc721TokenIds[i]);
        }

        for (uint256 i = 0; i < data.erc1155Tokens.length; i++) {
            IERC1155(data.erc1155Tokens[i])
                .safeTransferFrom(msg.sender, address(this), data.erc1155TokenIds[i], data.erc1155Amounts[i], "");
        }
    }

    function _approvePaymentBundleTokens(TokenBundlePaymentObligation.ObligationData memory data, address spender)
        internal
    {
        for (uint256 i = 0; i < data.erc20Tokens.length; i++) {
            IERC20(data.erc20Tokens[i]).forceApprove(spender, data.erc20Amounts[i]);
        }

        for (uint256 i = 0; i < data.erc721Tokens.length; i++) {
            IERC721(data.erc721Tokens[i]).approve(spender, data.erc721TokenIds[i]);
        }

        for (uint256 i = 0; i < data.erc1155Tokens.length; i++) {
            IERC1155(data.erc1155Tokens[i]).setApprovalForAll(spender, true);
        }
    }

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
