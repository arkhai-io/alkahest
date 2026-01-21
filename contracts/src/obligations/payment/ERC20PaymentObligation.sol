// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS, AttestationRequest, AttestationRequestData, RevocationRequest, RevocationRequestData} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {BaseObligation} from "../../BaseObligation.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

contract ERC20PaymentObligation is BaseObligation, IArbiter {
    using ArbiterUtils for Attestation;
    using SafeERC20 for IERC20;

    struct ObligationData {
        address token;
        uint256 amount;
        address payee;
    }

    event PaymentMade(bytes32 indexed payment, address indexed buyer);

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
            "address token, uint256 amount, address payee",
            true
        )
    {}

    function doObligation(
        ObligationData calldata data,
        bytes32 refUID
    ) public returns (bytes32 uid_) {
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
    ) public returns (bytes32 uid_) {
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

        // Check balance before transfer
        uint256 balanceBefore = IERC20(obligationData.token).balanceOf(
            obligationData.payee
        );

        bool success = IERC20(obligationData.token).trySafeTransferFrom(
            payer,
            obligationData.payee,
            obligationData.amount
        );

        // Check balance after transfer
        uint256 balanceAfter = IERC20(obligationData.token).balanceOf(
            obligationData.payee
        );

        // Verify the actual amount transferred
        if (!success || balanceAfter < balanceBefore + obligationData.amount) {
            revert ERC20TransferFailed(
                obligationData.token,
                payer,
                obligationData.payee,
                obligationData.amount
            );
        }
    }

    function _afterAttest(
        bytes32 uid,
        bytes memory /* data */,
        address /* payer */,
        address recipient
    ) internal override {
        emit PaymentMade(uid, recipient);
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
            payment.token == demandData.token &&
            payment.amount >= demandData.amount &&
            payment.payee == demandData.payee;
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
}
