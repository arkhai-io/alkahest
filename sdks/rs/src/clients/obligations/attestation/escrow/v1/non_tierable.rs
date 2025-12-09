//! Attestation V1 non-tierable escrow obligation client
//!
//! Non-tierable escrows have a 1:1 relationship between escrow and fulfillment.
//! V1 stores the full attestation data in the escrow obligation.

use alloy::primitives::{Address, Bytes, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::contracts::IEAS;
use crate::types::{ArbiterData, DecodedAttestation};

use super::super::super::AttestationModule;

/// Non-tierable escrow API for attestations (V1)
pub struct NonTierable<'a> {
    module: &'a AttestationModule,
}

impl<'a> NonTierable<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        self.module.addresses.escrow_obligation
    }

    /// Decodes AttestationEscrowObligation.ObligationData from bytes.
    pub fn decode_obligation(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::obligations::escrow::non_tierable::AttestationEscrowObligation::ObligationData>
    {
        let obligation_data =
            contracts::obligations::escrow::non_tierable::AttestationEscrowObligation::ObligationData::abi_decode(
                obligation_data,
            )?;
        Ok(obligation_data)
    }

    /// Gets an escrow obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<
            contracts::obligations::escrow::non_tierable::AttestationEscrowObligation::ObligationData,
        >,
    > {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::escrow::non_tierable::AttestationEscrowObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Creates an escrow using an attestation as the escrowed item.
    /// This function uses the original AttestationEscrowObligation contract where the full attestation
    /// data is stored in the escrow obligation. When collecting payment, this contract creates a new
    /// attestation as the collection event, requiring the contract to have attestation rights.
    pub async fn create(
        &self,
        attestation: IEAS::AttestationRequest,
        demand: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::non_tierable::AttestationEscrowObligation::new(
                self.module.addresses.escrow_obligation,
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .doObligation(
                contracts::obligations::escrow::non_tierable::AttestationEscrowObligation::ObligationData {
                    attestation: attestation.into(),
                    arbiter: demand.arbiter,
                    demand: demand.demand.clone(),
                },
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Collects payment from an attestation escrow by providing a fulfillment attestation.
    pub async fn collect(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::non_tierable::AttestationEscrowObligation::new(
                self.module.addresses.escrow_obligation,
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
}
