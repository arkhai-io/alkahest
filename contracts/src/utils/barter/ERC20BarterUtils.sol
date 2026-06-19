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
import {IERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC20BarterUtils {
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
    error PermitFailed(address token, string reason);
    error AttestationNotFound(bytes32 attestationId);

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

    // ============ ERC20 to ERC20 Functions ============

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
        IERC20Permit tokenC = IERC20Permit(token);
        tokenC.permit(msg.sender, address(this), amount, deadline, v, r, s);

        // Pull tokens from user to BarterUtils
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve obligation contract to spend BarterUtils' tokens
        IERC20(token).approve(address(erc20Payment), amount);

        return erc20Payment.doObligationFor(
            ERC20PaymentObligation.ObligationData({token: token, amount: amount, payee: payee}), msg.sender, refUID
        );
    }

    function _payErc20ForErc20(bytes32 buyAttestation, ERC20PaymentObligation.ObligationData memory demand)
        internal
        returns (bytes32)
    {
        // Pull tokens from user to BarterUtils
        IERC20(demand.token).transferFrom(msg.sender, address(this), demand.amount);

        // Approve obligation contract to spend BarterUtils' tokens
        IERC20(demand.token).approve(address(erc20Payment), demand.amount);

        bytes32 sellAttestation = erc20Payment.doObligationFor(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        erc20Escrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    function permitAndPayErc20ForErc20(bytes32 buyAttestation, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        returns (bytes32)
    {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        ERC20EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC20EscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        IERC20Permit askTokenC = IERC20Permit(demand.token);
        askTokenC.permit(msg.sender, address(this), demand.amount, deadline, v, r, s);

        return _payErc20ForErc20(buyAttestation, demand);
    }

    function payErc20ForErc20(bytes32 buyAttestation) external returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        ERC20EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC20EscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        return _payErc20ForErc20(buyAttestation, demand);
    }

    // ============ Cross-Token Functions ============

    // Internal helper for permit
    function _permitPayment(
        ERC20PaymentObligation.ObligationData memory demand,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal {
        IERC20Permit askTokenC = IERC20Permit(demand.token);

        try askTokenC.permit(msg.sender, address(this), demand.amount, deadline, v, r, s) {}
        catch Error(string memory reason) {
            revert PermitFailed(demand.token, reason);
        } catch {
            revert PermitFailed(demand.token, "Unknown error");
        }
    }

    // ============ ERC20 to ERC721 Functions ============

    function _payErc20ForErc721(bytes32 buyAttestation, ERC20PaymentObligation.ObligationData memory demand)
        internal
        returns (bytes32)
    {
        // Pull tokens from user to BarterUtils
        IERC20(demand.token).transferFrom(msg.sender, address(this), demand.amount);

        // Approve obligation contract to spend BarterUtils' tokens
        IERC20(demand.token).approve(address(erc20Payment), demand.amount);

        bytes32 sellAttestation = erc20Payment.doObligationFor(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        erc721Escrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    function payErc20ForErc721(bytes32 buyAttestation) external returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        if (bid.uid == bytes32(0)) {
            revert AttestationNotFound(buyAttestation);
        }

        ERC721EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC721EscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        return _payErc20ForErc721(buyAttestation, demand);
    }

    function permitAndPayErc20ForErc721(bytes32 buyAttestation, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        returns (bytes32)
    {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        ERC721EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC721EscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        _permitPayment(demand, deadline, v, r, s);
        return _payErc20ForErc721(buyAttestation, demand);
    }

    // ============ ERC20 to ERC1155 Functions ============

    function _payErc20ForErc1155(bytes32 buyAttestation, ERC20PaymentObligation.ObligationData memory demand)
        internal
        returns (bytes32)
    {
        // Pull tokens from user to BarterUtils
        IERC20(demand.token).transferFrom(msg.sender, address(this), demand.amount);

        // Approve obligation contract to spend BarterUtils' tokens
        IERC20(demand.token).approve(address(erc20Payment), demand.amount);

        bytes32 sellAttestation = erc20Payment.doObligationFor(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        erc1155Escrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    function payErc20ForErc1155(bytes32 buyAttestation) external returns (bytes32) {
        Attestation memory bid;
        try eas.getAttestation(buyAttestation) returns (Attestation memory _bid) {
            bid = _bid;
        } catch {
            revert AttestationNotFound(buyAttestation);
        }

        ERC1155EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC1155EscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        return _payErc20ForErc1155(buyAttestation, demand);
    }

    function permitAndPayErc20ForErc1155(bytes32 buyAttestation, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        returns (bytes32)
    {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        ERC1155EscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (ERC1155EscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        _permitPayment(demand, deadline, v, r, s);
        return _payErc20ForErc1155(buyAttestation, demand);
    }

    // ============ ERC20 to Token Bundle Functions ============

    function _payErc20ForBundle(bytes32 buyAttestation, ERC20PaymentObligation.ObligationData memory demand)
        internal
        returns (bytes32)
    {
        // Pull tokens from user to BarterUtils
        IERC20(demand.token).transferFrom(msg.sender, address(this), demand.amount);

        // Approve obligation contract to spend BarterUtils' tokens
        IERC20(demand.token).approve(address(erc20Payment), demand.amount);

        bytes32 sellAttestation = erc20Payment.doObligationFor(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        bundleEscrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    function payErc20ForBundle(bytes32 buyAttestation) external returns (bytes32) {
        Attestation memory bid;
        try eas.getAttestation(buyAttestation) returns (Attestation memory _bid) {
            bid = _bid;
        } catch {
            revert AttestationNotFound(buyAttestation);
        }

        TokenBundleEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (TokenBundleEscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        return _payErc20ForBundle(buyAttestation, demand);
    }

    function permitAndPayErc20ForBundle(bytes32 buyAttestation, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        returns (bytes32)
    {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        TokenBundleEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (TokenBundleEscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        _permitPayment(demand, deadline, v, r, s);
        return _payErc20ForBundle(buyAttestation, demand);
    }

    // ============ ERC20 to Native Token Functions ============

    function _payErc20ForEth(bytes32 buyAttestation, ERC20PaymentObligation.ObligationData memory demand)
        internal
        returns (bytes32)
    {
        // Pull tokens from user to BarterUtils
        IERC20(demand.token).transferFrom(msg.sender, address(this), demand.amount);

        // Approve obligation contract to spend BarterUtils' tokens
        IERC20(demand.token).approve(address(erc20Payment), demand.amount);

        bytes32 sellAttestation = erc20Payment.doObligationFor(
            demand,
            msg.sender,
            buyAttestation // Reference the escrow this payment is for
        );
        nativeEscrow.collect(buyAttestation, sellAttestation);

        return sellAttestation;
    }

    function payErc20ForEth(bytes32 buyAttestation) external returns (bytes32) {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        if (bid.uid == bytes32(0)) {
            revert AttestationNotFound(buyAttestation);
        }
        NativeTokenEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (NativeTokenEscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        return _payErc20ForEth(buyAttestation, demand);
    }

    function permitAndPayErc20ForEth(bytes32 buyAttestation, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        returns (bytes32)
    {
        Attestation memory bid = eas.getAttestation(buyAttestation);
        NativeTokenEscrowObligation.ObligationData memory escrowData =
            abi.decode(bid.data, (NativeTokenEscrowObligation.ObligationData));
        ERC20PaymentObligation.ObligationData memory demand =
            abi.decode(escrowData.demand, (ERC20PaymentObligation.ObligationData));

        _permitPayment(demand, deadline, v, r, s);
        return _payErc20ForEth(buyAttestation, demand);
    }
}
