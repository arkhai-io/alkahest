//! ERC1155 unconditional escrow obligation client
//!
//! Unconditional escrows support multiple fulfillments per escrow (1:many relationship).

use alloy::primitives::{Address, FixedBytes};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{ApprovalPurpose, ArbiterData, DecodedAttestation, Erc1155Data};

use super::super::Erc1155Module;

/// Unconditional escrow API for ERC1155 tokens
pub struct Unconditional<'a> {
    module: &'a Erc1155Module,
}

impl<'a> Unconditional<'a> {
    pub fn new(module: &'a Erc1155Module) -> Self {
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
            contracts::obligations::escrow::unconditional::UnconditionalERC1155EscrowObligation::ObligationData,
        >,
    >{
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::escrow::unconditional::UnconditionalERC1155EscrowObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Creates an escrow arrangement with ERC1155 tokens for a custom demand.
    pub async fn create(
        &self,
        price: &Erc1155Data,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_obligation_contract =
            contracts::obligations::escrow::unconditional::UnconditionalERC1155EscrowObligation::new(
                self.module.addresses.escrow_obligation_unconditional,
                &self.module.wallet_provider,
            );

        let receipt = escrow_obligation_contract
            .doObligation(
                contracts::obligations::escrow::unconditional::UnconditionalERC1155EscrowObligation::ObligationData {
                    token: price.address,
                    tokenId: price.id,
                    amount: price.value,
                    arbiter: item.arbiter,
                    demand: item.demand.clone(),
                },
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Creates an escrow arrangement with ERC1155 tokens after approving, then revokes approval.
    pub async fn approve_and_create(
        &self,
        price: &Erc1155Data,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<(TransactionReceipt, TransactionReceipt, TransactionReceipt)> {
        let util = self.module.util();
        let approval_receipt = util
            .approve_all(price.address, ApprovalPurpose::Escrow)
            .await?;
        let escrow_receipt = self.create(price, item, expiration).await?;
        let revoke_receipt = util
            .revoke_all(price.address, ApprovalPurpose::Escrow)
            .await?;
        Ok((approval_receipt, escrow_receipt, revoke_receipt))
    }

    /// Collects payment from a fulfilled trade.
    pub async fn collect(
        &self,
        buy_attestation: FixedBytes<32>,
        fulfillment: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::unconditional::UnconditionalERC1155EscrowObligation::new(
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

    /// Collects expired escrow funds after expiration time has passed.
    pub async fn reclaim_expired(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_contract =
            contracts::obligations::escrow::unconditional::UnconditionalERC1155EscrowObligation::new(
                self.module.addresses.escrow_obligation_unconditional,
                &self.module.wallet_provider,
            );

        let receipt = escrow_contract
            .reclaim(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
