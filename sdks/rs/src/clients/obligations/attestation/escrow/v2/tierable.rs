//! Attestation V2 tierable escrow obligation client
//!
//! Tierable escrows support multiple fulfillments per escrow (1:many relationship).
//! V2 references the attestation by UID instead of storing the full data.

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{ArbiterData, DecodedAttestation};

use super::super::super::AttestationModule;

/// Tierable escrow API for attestations (V2)
pub struct Tierable<'a> {
    module: &'a AttestationModule,
}

impl<'a> Tierable<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        // TODO: Add tierable V2 escrow address when deployed
        self.module.addresses.escrow_obligation_2
    }

    /// Gets an escrow obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<
            contracts::obligations::escrow::tierable::AttestationEscrowObligation2::ObligationData,
        >,
    > {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::escrow::tierable::AttestationEscrowObligation2::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Creates a tierable escrow using an attestation UID as reference.
    pub async fn create(
        &self,
        attestation_uid: FixedBytes<32>,
        demand: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::tierable::AttestationEscrowObligation2::new(
                self.module.addresses.escrow_obligation_2, // TODO: use tierable V2 address
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .doObligation(
                contracts::obligations::escrow::tierable::AttestationEscrowObligation2::ObligationData {
                    attestationUid: attestation_uid,
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

    /// Collects payment from a tierable attestation escrow.
    pub async fn collect(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::tierable::AttestationEscrowObligation2::new(
                self.module.addresses.escrow_obligation_2, // TODO: use tierable V2 address
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
