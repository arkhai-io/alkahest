//! Attestation V2 default escrow obligation client
//!
//! Non-unconditional escrows have a 1:1 relationship between escrow and fulfillment.
//! V2 references the attestation by UID instead of storing the full data.

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{ArbiterData, DecodedAttestation};

use super::super::super::AttestationModule;

/// Non-unconditional escrow API for attestations (V2)
pub struct Default<'a> {
    module: &'a AttestationModule,
}

impl<'a> Default<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        self.module.addresses.escrow_obligation_2_default
    }

    /// Gets an escrow obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<
            contracts::obligations::escrow::default_escrow::AttestationReferenceEscrowObligation::ObligationData,
        >,
    > {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::escrow::default_escrow::AttestationReferenceEscrowObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Creates an escrow using an attestation UID as reference.
    /// This function uses AttestationReferenceEscrowObligation which references the attestation by UID
    /// instead of storing the full attestation data, making it more gas efficient.
    pub async fn create(
        &self,
        attestation_uid: FixedBytes<32>,
        demand: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::default_escrow::AttestationReferenceEscrowObligation::new(
                self.module.addresses.escrow_obligation_2_default,
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .doObligation(
                contracts::obligations::escrow::default_escrow::AttestationReferenceEscrowObligation::ObligationData {
                    attestationUid: attestation_uid,
                    arbiter: demand.arbiter,
                    demand: demand.demand.clone(),
                    validationExpirationTime: 0,
                    validationRevocable: true,
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
    /// This creates a validation attestation that references the original attestation.
    pub async fn collect(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::default_escrow::AttestationReferenceEscrowObligation::new(
                self.module.addresses.escrow_obligation_2_default,
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
