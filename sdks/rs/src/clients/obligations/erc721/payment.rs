//! ERC721 payment obligation client

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{DecodedAttestation, Erc721Data};

use super::Erc721Module;

/// Payment API for ERC721 tokens
pub struct Payment<'a> {
    module: &'a Erc721Module,
}

impl<'a> Payment<'a> {
    pub fn new(module: &'a Erc721Module) -> Self {
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
    ) -> eyre::Result<DecodedAttestation<contracts::obligations::ERC721PaymentObligation::ObligationData>>
    {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::ERC721PaymentObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Makes a direct payment with ERC721 tokens.
    pub async fn pay(
        &self,
        price: &Erc721Data,
        payee: Address,
    ) -> eyre::Result<TransactionReceipt> {
        let payment_obligation_contract = contracts::obligations::ERC721PaymentObligation::new(
            self.module.addresses.payment_obligation,
            &self.module.wallet_provider,
        );

        let receipt = payment_obligation_contract
            .doObligation(
                contracts::obligations::ERC721PaymentObligation::ObligationData {
                    token: price.address,
                    tokenId: price.id,
                    payee,
                },
                FixedBytes::<32>::ZERO,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
