// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ERC20EscrowObligation} from "../../obligations/escrow/default/ERC20EscrowObligation.sol";
import {ERC20PaymentObligation} from "../../obligations/payment/ERC20PaymentObligation.sol";
import {ERC721EscrowObligation} from "../../obligations/escrow/default/ERC721EscrowObligation.sol";
import {ERC721PaymentObligation} from "../../obligations/payment/ERC721PaymentObligation.sol";
import {ERC1155EscrowObligation} from "../../obligations/escrow/default/ERC1155EscrowObligation.sol";
import {ERC1155PaymentObligation} from "../../obligations/payment/ERC1155PaymentObligation.sol";
import {TokenBundleEscrowObligation} from "../../obligations/escrow/default/TokenBundleEscrowObligation.sol";
import {TokenBundlePaymentObligation} from "../../obligations/payment/TokenBundlePaymentObligation.sol";
import {NativeTokenEscrowObligation} from "../../obligations/escrow/default/NativeTokenEscrowObligation.sol";
import {NativeTokenPaymentObligation} from "../../obligations/payment/NativeTokenPaymentObligation.sol";

contract NativeTokenBarterUtils {
    IEAS internal eas;
    ERC20EscrowObligation internal erc20Escrow;
    ERC20PaymentObligation internal erc20Payment;
    ERC721EscrowObligation internal erc721Escrow;
    ERC721PaymentObligation internal erc721Payment;
    ERC1155EscrowObligation internal erc1155Escrow;
    ERC1155PaymentObligation internal erc1155Payment;
    TokenBundleEscrowObligation internal bundleEscrow;
    TokenBundlePaymentObligation internal bundlePayment;
    NativeTokenEscrowObligation internal nativeEscrow;
    NativeTokenPaymentObligation internal nativePayment;

    error CouldntCollectEscrow();
    error AttestationNotFound(bytes32 attestationId);
    error MsgValueMismatch();

    constructor(
        IEAS _eas,
        ERC20EscrowObligation _erc20Escrow,
        ERC20PaymentObligation _erc20Payment,
        ERC721EscrowObligation _erc721Escrow,
        ERC721PaymentObligation _erc721Payment,
        ERC1155EscrowObligation _erc1155Escrow,
        ERC1155PaymentObligation _erc1155Payment,
        TokenBundleEscrowObligation _bundleEscrow,
        TokenBundlePaymentObligation _bundlePayment,
        NativeTokenEscrowObligation _nativeEscrow,
        NativeTokenPaymentObligation _nativePayment
    ) {
        eas = _eas;
        erc20Escrow = _erc20Escrow;
        erc20Payment = _erc20Payment;
        erc721Escrow = _erc721Escrow;
        erc721Payment = _erc721Payment;
        erc1155Escrow = _erc1155Escrow;
        erc1155Payment = _erc1155Payment;
        bundleEscrow = _bundleEscrow;
        bundlePayment = _bundlePayment;
        nativeEscrow = _nativeEscrow;
        nativePayment = _nativePayment;
    }

    // ============ Native Token to Native Token Functions ============

    function _payEthForEth(bytes32 buyAttestation, NativeTokenPaymentObligation.ObligationData memory demand)
        internal
        returns (bytes32)
    {
        bytes32 sellAttestation = nativePayment.doObligationFor{value: demand.amount}(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        nativeEscrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    function payEthForEth(bytes32 buyAttestation) external payable returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        NativeTokenEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (NativeTokenEscrowObligation.ObligationData));
        NativeTokenPaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (NativeTokenPaymentObligation.ObligationData));

        return _payEthForEth(buyAttestation, demand);
    }

    // ============ Cross-Token Functions ============

    // ============ Native Token to ERC20 Functions ============

    function payEthForErc20(bytes32 buyAttestation) external payable returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        if (bid.uid == bytes32(0)) {
            revert AttestationNotFound(buyAttestation);
        }
        ERC20EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC20EscrowObligation.ObligationData));
        NativeTokenPaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (NativeTokenPaymentObligation.ObligationData));

        bytes32 sellAttestation = nativePayment.doObligationFor{value: demand.amount}(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        erc20Escrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    // ============ Native Token to ERC721 Functions ============

    function payEthForErc721(bytes32 buyAttestation) external payable returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        if (bid.uid == bytes32(0)) {
            revert AttestationNotFound(buyAttestation);
        }
        ERC721EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC721EscrowObligation.ObligationData));
        NativeTokenPaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (NativeTokenPaymentObligation.ObligationData));

        bytes32 sellAttestation = nativePayment.doObligationFor{value: demand.amount}(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        erc721Escrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    // ============ Native Token to ERC1155 Functions ============

    function payEthForErc1155(bytes32 buyAttestation) external payable returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        if (bid.uid == bytes32(0)) {
            revert AttestationNotFound(buyAttestation);
        }
        ERC1155EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC1155EscrowObligation.ObligationData));
        NativeTokenPaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (NativeTokenPaymentObligation.ObligationData));

        bytes32 sellAttestation = nativePayment.doObligationFor{value: demand.amount}(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        erc1155Escrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    // ============ Native Token to Token Bundle Functions ============

    function payEthForBundle(bytes32 buyAttestation) external payable returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        TokenBundleEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (TokenBundleEscrowObligation.ObligationData));
        NativeTokenPaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (NativeTokenPaymentObligation.ObligationData));

        bytes32 sellAttestation = nativePayment.doObligationFor{value: demand.amount}(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        bundleEscrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }
}
