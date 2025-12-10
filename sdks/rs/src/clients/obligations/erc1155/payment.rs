//! ERC1155 payment obligation client
//!
//! Provides functionality for making direct ERC1155 token payments.

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{DecodedAttestation, Erc1155Data};

use super::Erc1155Module;

/// Payment API for ERC1155 tokens
pub struct Payment<'a> {
    module: &'a Erc1155Module,
}

impl<'a> Payment<'a> {
    pub fn new(module: &'a Erc1155Module) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        self.module.addresses.payment_obligation
    }

    /// Gets a payment obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::obligations::ERC1155PaymentObligation::ObligationData>>
    {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::ERC1155PaymentObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Makes a direct payment with ERC1155 tokens.
    ///
    /// # Arguments
    /// * `price` - The ERC1155 token data for payment
    /// * `payee` - The address of the payment recipient
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn pay(
        &self,
        price: &Erc1155Data,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract = contracts::obligations::ERC1155PaymentObligation::new(
            self.module.addresses.payment_obligation,
            &self.module.wallet_provider,
        );

        let receipt = payment_obligation_contract
            .doObligation(
                contracts::obligations::ERC1155PaymentObligation::ObligationData {
                    token: price.address,
                    tokenId: price.id,
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
}
