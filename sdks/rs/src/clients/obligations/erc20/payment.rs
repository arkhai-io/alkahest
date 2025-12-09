//! ERC20 payment obligation client
//!
//! Provides functionality for making direct ERC20 token payments.

use alloy::primitives::{Address, Bytes, FixedBytes, U256};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{DecodedAttestation, Erc20Data};

use super::util;
use super::Erc20Module;

/// Payment API for ERC20 tokens
pub struct Payment<'a> {
    module: &'a Erc20Module,
}

impl<'a> Payment<'a> {
    pub fn new(module: &'a Erc20Module) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        self.module.addresses.payment_obligation
    }

    /// Decodes ERC20PaymentObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::obligations::ERC20PaymentObligation::ObligationData>` - The decoded obligation data
    pub fn decode_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::obligations::ERC20PaymentObligation::ObligationData> {
        let obligation_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(
                obligation_data,
            )?;
        Ok(obligation_data)
    }

    /// Gets a payment obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::obligations::ERC20PaymentObligation::ObligationData>>
    {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::ERC20PaymentObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Makes a direct payment with ERC20 tokens.
    ///
    /// # Arguments
    /// * `price` - The ERC20 token data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay(
        &self,
        price: &Erc20Data,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract = contracts::obligations::ERC20PaymentObligation::new(
            self.module.addresses.payment_obligation,
            &self.module.wallet_provider,
        );

        let receipt = payment_obligation_contract
            .doObligation(
                contracts::obligations::ERC20PaymentObligation::ObligationData {
                    token: price.address,
                    amount: price.value,
                    payee,
                },
                FixedBytes::<32>::ZERO, // refUID - no reference for standalone payments
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Makes a direct payment with ERC20 tokens using permit signature.
    ///
    /// # Arguments
    /// * `price` - The ERC20 token data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn permit_and_pay(
        &self,
        price: &Erc20Data,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let deadline = util::get_permit_deadline()?;
        let permit = util::get_permit_signature(
            &self.module.signer,
            &self.module.wallet_provider,
            self.module.addresses.payment_obligation,
            price,
            U256::from(deadline),
        )
        .await?;

        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .permitAndPayWithErc20(
                price.address,
                price.value,
                payee,
                FixedBytes::<32>::ZERO, // refUID - no reference for standalone payments
                U256::from(deadline),
                27 + permit.v() as u8,
                FixedBytes::<32>::from(permit.r()),
                FixedBytes::<32>::from(permit.s()),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
