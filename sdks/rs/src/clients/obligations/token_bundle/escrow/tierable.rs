//! Token Bundle tierable escrow obligation client
//!
//! Tierable escrows support multiple fulfillments per escrow (1:many relationship).

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{ArbiterData, DecodedAttestation, TokenBundleData};

use super::super::TokenBundleModule;

/// Tierable escrow API for token bundles
pub struct Tierable<'a> {
    module: &'a TokenBundleModule,
}

impl<'a> Tierable<'a> {
    pub fn new(module: &'a TokenBundleModule) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        // TODO: Add tierable escrow address to TokenBundleAddresses when deployed
        self.module.addresses.escrow_obligation
    }

    /// Gets an escrow obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<
            contracts::obligations::escrow::tierable::TokenBundleEscrowObligation::ObligationData,
        >,
    > {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::escrow::tierable::TokenBundleEscrowObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Creates an escrow arrangement with token bundles for a custom demand.
    pub async fn create(
        &self,
        price: &TokenBundleData,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_obligation_contract =
            contracts::obligations::escrow::tierable::TokenBundleEscrowObligation::new(
                self.module.addresses.escrow_obligation, // TODO: use tierable address
                &self.module.wallet_provider,
            );

        let receipt = escrow_obligation_contract
            .doObligation((price, item).into(), expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Collects payment from a fulfilled trade.
    pub async fn collect(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::tierable::TokenBundleEscrowObligation::new(
                self.module.addresses.escrow_obligation, // TODO: use tierable address
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .collectEscrow(buy_attestation, fulfillment)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Collects expired escrow funds after expiration time has passed.
    pub async fn reclaim_expired(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::tierable::TokenBundleEscrowObligation::new(
                self.module.addresses.escrow_obligation, // TODO: use tierable address
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .reclaimExpired(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
