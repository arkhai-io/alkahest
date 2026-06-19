//! Attestation utility functions
//!
//! Core EAS operations: getting attestations, registering schemas, creating attestations.

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;
use crate::contracts::IEAS::{Attestation, AttestationRequest};

use super::AttestationModule;

/// Utility API for attestation operations
pub struct Util<'a> {
    module: &'a AttestationModule,
}

impl<'a> Util<'a> {
    pub fn new(module: &'a AttestationModule) -> Self {
        Self { module }
    }

    /// Retrieves an attestation by its UID.
    pub async fn get_attestation(&self, uid: FixedBytes<32>) -> eyre::Result<Attestation> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        Ok(attestation)
    }

    /// Registers a new schema in the EAS Schema Registry.
    ///
    /// # Arguments
    /// * `schema` - The schema string defining the attestation structure
    /// * `resolver` - The address of the resolver contract
    /// * `revocable` - Whether attestations using this schema can be revoked
    pub async fn register_schema(
        &self,
        schema: String,
        resolver: Address,
        revocable: bool,
    ) -> eyre::Result<TransactionReceipt> {
        let schema_registry_contract = contracts::ISchemaRegistry::new(
            self.module.addresses.eas_schema_registry,
            &self.module.wallet_provider,
        );

        let receipt = schema_registry_contract
            .register(schema, resolver, revocable)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates a new attestation using the EAS contract.
    pub async fn attest(
        &self,
        attestation: AttestationRequest,
    ) -> eyre::Result<TransactionReceipt> {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let receipt = eas_contract
            .attest(attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
