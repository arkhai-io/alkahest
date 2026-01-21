// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {BaseObligation} from "../../BaseObligation.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

contract TokenBundlePaymentObligation is BaseObligation, IArbiter {
    using ArbiterUtils for Attestation;
    using SafeERC20 for IERC20;

    struct ObligationData {
        // Native tokens
        uint256 nativeAmount;
        // ERC20
        address[] erc20Tokens;
        uint256[] erc20Amounts;
        // ERC721
        address[] erc721Tokens;
        uint256[] erc721TokenIds;
        // ERC1155
        address[] erc1155Tokens;
        uint256[] erc1155TokenIds;
        uint256[] erc1155Amounts;
        address payee;
    }

    event BundleTransferred(
        bytes32 indexed payment,
        address indexed from,
        address indexed to
    );

    error ArrayLengthMismatch();
    error InsufficientPayment(uint256 expected, uint256 received);
    error NativeTokenTransferFailed(address to, uint256 amount);
    error ERC20TransferFailed(
        address token,
        address from,
        address to,
        uint256 amount
    );

    constructor(
        IEAS _eas,
        ISchemaRegistry _schemaRegistry
    )
        BaseObligation(
            _eas,
            _schemaRegistry,
            "uint256 nativeAmount, address[] erc20Tokens, uint256[] erc20Amounts, address[] erc721Tokens, uint256[] erc721TokenIds, address[] erc1155Tokens, uint256[] erc1155TokenIds, uint256[] erc1155Amounts, address payee",
            true
        )
    {}

    function doObligation(
        ObligationData calldata data,
        bytes32 refUID
    ) public payable returns (bytes32 uid_) {
        bytes memory encodedData = abi.encode(data);
        uid_ = _doObligationForRaw(
            encodedData,
            0,
            msg.sender,
            refUID
        );
    }

    function doObligationFor(
        ObligationData calldata data,
        address recipient,
        bytes32 refUID
    ) public payable returns (bytes32 uid_) {
        bytes memory encodedData = abi.encode(data);
        uid_ = _doObligationForRaw(
            encodedData,
            0,
            recipient,
            refUID
        );
    }

    function _beforeAttest(
        bytes memory data,
        address payer,
        address /* recipient */
    ) internal override {
        ObligationData memory obligationData = abi.decode(
            data,
            (ObligationData)
        );

        validateArrayLengths(obligationData);

        // Handle native tokens
        if (obligationData.nativeAmount > 0) {
            // Verify sufficient payment was sent
            if (msg.value < obligationData.nativeAmount) {
                revert InsufficientPayment(
                    obligationData.nativeAmount,
                    msg.value
                );
            }

            // Transfer native tokens to payee
            (bool success, ) = payable(obligationData.payee).call{
                value: obligationData.nativeAmount
            }("");

            if (!success) {
                revert NativeTokenTransferFailed(
                    obligationData.payee,
                    obligationData.nativeAmount
                );
            }
        }

        // Handle token bundle
        transferBundle(obligationData, payer);

        // Return excess native token payment if any
        if (msg.value > obligationData.nativeAmount) {
            uint256 excess = msg.value - obligationData.nativeAmount;
            (bool refundSuccess, ) = payable(payer).call{value: excess}("");
            if (!refundSuccess) {
                revert NativeTokenTransferFailed(payer, excess);
            }
        }
    }

    function _afterAttest(
        bytes32 uid,
        bytes memory data,
        address payer,
        address /* recipient */
    ) internal override {
        ObligationData memory obligationData = abi.decode(
            data,
            (ObligationData)
        );
        emit BundleTransferred(uid, payer, obligationData.payee);
    }

    function validateArrayLengths(ObligationData memory data) internal pure {
        if (data.erc20Tokens.length != data.erc20Amounts.length)
            revert ArrayLengthMismatch();
        if (data.erc721Tokens.length != data.erc721TokenIds.length)
            revert ArrayLengthMismatch();
        if (
            data.erc1155Tokens.length != data.erc1155TokenIds.length ||
            data.erc1155Tokens.length != data.erc1155Amounts.length
        ) revert ArrayLengthMismatch();
    }

    function transferBundle(ObligationData memory data, address from) internal {
        // Transfer ERC20s
        for (uint i = 0; i < data.erc20Tokens.length; i++) {
            // Check balance before transfer
            uint256 balanceBefore = IERC20(data.erc20Tokens[i]).balanceOf(
                data.payee
            );

            bool success = IERC20(data.erc20Tokens[i]).trySafeTransferFrom(
                from,
                data.payee,
                data.erc20Amounts[i]
            );

            // Check balance after transfer
            uint256 balanceAfter = IERC20(data.erc20Tokens[i]).balanceOf(
                data.payee
            );

            // Verify the actual amount transferred
            if (!success || balanceAfter < balanceBefore + data.erc20Amounts[i]) {
                revert ERC20TransferFailed(
                    data.erc20Tokens[i],
                    from,
                    data.payee,
                    data.erc20Amounts[i]
                );
            }
        }

        // Transfer ERC721s
        for (uint i = 0; i < data.erc721Tokens.length; i++) {
            IERC721(data.erc721Tokens[i]).transferFrom(
                from,
                data.payee,
                data.erc721TokenIds[i]
            );
        }

        // Transfer ERC1155s
        for (uint i = 0; i < data.erc1155Tokens.length; i++) {
            IERC1155(data.erc1155Tokens[i]).safeTransferFrom(
                from,
                data.payee,
                data.erc1155TokenIds[i],
                data.erc1155Amounts[i],
                ""
            );
        }
    }

    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 fulfilling
    ) public view override returns (bool) {
        if (!obligation._checkIntrinsic(ATTESTATION_SCHEMA)) return false;

        // Check that the payment references the correct escrow
        if (obligation.refUID != fulfilling) return false;

        ObligationData memory payment = abi.decode(
            obligation.data,
            (ObligationData)
        );
        ObligationData memory demandData = abi.decode(demand, (ObligationData));

        return
            payment.nativeAmount >= demandData.nativeAmount &&
            _checkTokenArrays(payment, demandData) &&
            payment.payee == demandData.payee;
    }

    function _checkTokenArrays(
        ObligationData memory payment,
        ObligationData memory demand
    ) internal pure returns (bool) {
        // Check ERC20s
        if (payment.erc20Tokens.length < demand.erc20Tokens.length)
            return false;
        for (uint i = 0; i < demand.erc20Tokens.length; i++) {
            if (
                payment.erc20Tokens[i] != demand.erc20Tokens[i] ||
                payment.erc20Amounts[i] < demand.erc20Amounts[i]
            ) return false;
        }

        // Check ERC721s
        if (payment.erc721Tokens.length < demand.erc721Tokens.length)
            return false;
        for (uint i = 0; i < demand.erc721Tokens.length; i++) {
            if (
                payment.erc721Tokens[i] != demand.erc721Tokens[i] ||
                payment.erc721TokenIds[i] != demand.erc721TokenIds[i]
            ) return false;
        }

        // Check ERC1155s
        if (payment.erc1155Tokens.length < demand.erc1155Tokens.length)
            return false;
        for (uint i = 0; i < demand.erc1155Tokens.length; i++) {
            if (
                payment.erc1155Tokens[i] != demand.erc1155Tokens[i] ||
                payment.erc1155TokenIds[i] != demand.erc1155TokenIds[i] ||
                payment.erc1155Amounts[i] < demand.erc1155Amounts[i]
            ) return false;
        }

        return true;
    }

    function getObligationData(
        bytes32 uid
    ) public view returns (ObligationData memory) {
        Attestation memory attestation = _getAttestation(uid);
        return abi.decode(attestation.data, (ObligationData));
    }

    function decodeObligationData(
        bytes calldata data
    ) public pure returns (ObligationData memory) {
        return abi.decode(data, (ObligationData));
    }

    // Allow contract to receive native tokens (for refunds)
    receive() external payable override {}
}
