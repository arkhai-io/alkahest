//! Attestation V1 unconditional escrow obligation client
//!
//! Unconditional escrows support multiple fulfillments per escrow (1:many relationship).
//! V1 stores the full attestation data in the escrow obligation.

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::contracts::IEAS;
use crate::types::{ArbiterData, DecodedAttestation};

use super::super::super::AttestationModule;

/// Unconditional escrow API for attestations (V1)
pub struct Unconditional<'a> {
    module: &'a AttestationModule,
}

impl<'a> Unconditional<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        self.module.addresses.escrow_obligation_unconditional
    }

    /// Gets an escrow obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<
            contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation::ObligationData,
        >,
    >{
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Creates a unconditional escrow using an attestation as the escrowed item.
    pub async fn create(
        &self,
        attestation: IEAS::AttestationRequest,
        demand: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation::new(
                self.module.addresses.escrow_obligation_unconditional,
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .doObligation(
                contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation::ObligationData {
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

    /// Collects payment from a unconditional attestation escrow.
    pub async fn collect(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation::new(
                self.module.addresses.escrow_obligation_unconditional,
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .collect(buy_attestation, fulfillment)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
