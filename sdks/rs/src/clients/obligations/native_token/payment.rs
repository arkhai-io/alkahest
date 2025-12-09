//! Native Token payment obligation client
//!
//! Provides functionality for making direct native token payments.

use alloy::primitives::{Address, Bytes, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{DecodedAttestation, NativeTokenData};

use super::NativeTokenModule;

/// Payment API for native tokens
pub struct Payment<'a> {
    module: &'a NativeTokenModule,
}

impl<'a> Payment<'a> {
    pub fn new(module: &'a NativeTokenModule) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        self.module.addresses.payment_obligation
    }

    /// Decodes NativeTokenPaymentObligation.ObligationData from bytes.
    ///
    /// # Arguments
    /// * `obligation_data` - The obligation data
    ///
    /// # Returns
    /// * `Result<contracts::obligations::NativeTokenPaymentObligation::ObligationData>` - The decoded obligation data
    pub fn decode_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::obligations::NativeTokenPaymentObligation::ObligationData> {
        let obligation_data =
            contracts::obligations::NativeTokenPaymentObligation::ObligationData::abi_decode(
                obligation_data,
            )?;
        Ok(obligation_data)
    }

    /// Gets a payment obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::obligations::NativeTokenPaymentObligation::ObligationData>>
    {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::NativeTokenPaymentObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Makes a direct payment with native tokens.
    ///
    /// # Arguments
    /// * `price` - The native token data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay(
        &self,
        price: &NativeTokenData,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract = contracts::obligations::NativeTokenPaymentObligation::new(
            self.module.addresses.payment_obligation,
            &self.module.wallet_provider,
        );

        let receipt = payment_obligation_contract
            .doObligation(
                contracts::obligations::NativeTokenPaymentObligation::ObligationData {
                    amount: price.value,
                    payee,
                },
                FixedBytes::<32>::ZERO, // refUID - no reference for standalone payments
            )
            .value(price.value)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
