//! ERC20 tierable escrow obligation client
//!
//! Tierable escrows support multiple fulfillments per escrow (1:many relationship).

use alloy::primitives::{Address, FixedBytes, U256};
use alloy::rpc::types::TransactionReceipt;
use alloy::sol_types::SolValue;

use crate::contracts;
use crate::types::{ApprovalPurpose, ArbiterData, DecodedAttestation, Erc20Data};

use super::super::Erc20Module;

/// Tierable escrow API for ERC20 tokens
pub struct Tierable<'a> {
    module: &'a Erc20Module,
}

impl<'a> Tierable<'a> {
    pub fn new(module: &'a Erc20Module) -> Self {
        Self { module }
    }

    /// Get the contract address
    pub fn address(&self) -> Address {
        // TODO: Add tierable escrow address to Erc20Addresses when deployed
        self.module.addresses.escrow_obligation_nontierable
    }

    /// Gets an escrow obligation by its attestation UID.
    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<
        DecodedAttestation<
            contracts::obligations::escrow::tierable::ERC20EscrowObligation::ObligationData,
        >,
    > {
        let eas_contract =
            contracts::IEAS::new(self.module.addresses.eas, &self.module.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::escrow::tierable::ERC20EscrowObligation::ObligationData::abi_decode(
                &attestation.data,
            )?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    /// Creates an escrow arrangement with ERC20 tokens for a custom demand.
    pub async fn create(
        &self,
        price: &Erc20Data,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let escrow_obligation_contract =
            contracts::obligations::escrow::tierable::ERC20EscrowObligation::new(
                self.module.addresses.escrow_obligation_tierable,
                &self.module.wallet_provider,
            );

        let receipt = escrow_obligation_contract
            .doObligation(
                contracts::obligations::escrow::tierable::ERC20EscrowObligation::ObligationData {
                    token: price.address,
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

    /// Creates an escrow arrangement with ERC20 tokens after approving the token transfer.
    pub async fn approve_and_create(
        &self,
        price: &Erc20Data,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<(TransactionReceipt, TransactionReceipt)> {
        let util = self.module.util();
        let approval_receipt = util.approve(price, ApprovalPurpose::Escrow).await?;
        let escrow_receipt = self.create(price, item, expiration).await?;
        Ok((approval_receipt, escrow_receipt))
    }

    /// Creates an escrow arrangement with ERC20 tokens using permit signature.
    pub async fn permit_and_create(
        &self,
        price: &Erc20Data,
        item: &ArbiterData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let util = self.module.util();
        let deadline = super::super::util::Util::get_permit_deadline()?;

        let permit = util
            .get_permit_signature(
                self.module.addresses.escrow_obligation_tierable,
                price,
                U256::from(deadline),
            )
            .await?;

        let barter_utils_contract = contracts::utils::ERC20BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );
        let receipt = barter_utils_contract
            .permitAndBuyWithErc20(
                price.address,
                price.value,
                item.arbiter,
                item.demand.clone(),
                expiration,
                U256::from(deadline),
                27 + permit.v() as u8,
                permit.r().into(),
                permit.s().into(),
            )
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
            contracts::obligations::escrow::tierable::ERC20EscrowObligation::new(
                self.module.addresses.escrow_obligation_tierable,
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
            contracts::obligations::escrow::tierable::ERC20EscrowObligation::new(
                self.module.addresses.escrow_obligation_tierable,
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
