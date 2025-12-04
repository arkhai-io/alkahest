//! Confirmation arbiters module
//!
//! This module contains arbiters that handle confirmation-based logic
//! for attestation validation.
//!
//! The confirmation arbiters have been restructured with new naming:
//! - ExclusiveRevocableConfirmationArbiter: Single fulfillment per escrow, can revoke
//! - ExclusiveUnrevocableConfirmationArbiter: Single fulfillment per escrow, cannot revoke
//! - NonexclusiveRevocableConfirmationArbiter: Multiple fulfillments per escrow, can revoke
//! - NonexclusiveUnrevocableConfirmationArbiter: Multiple fulfillments per escrow, cannot revoke
//!
//! Note: These arbiters do not use DemandData - they use confirmations mapping.

use alloy::{
    primitives::{Address, FixedBytes, Log},
    providers::Provider as _,
    rpc::types::{Filter, TransactionReceipt},
    sol_types::SolEvent as _,
};
use futures_util::StreamExt as _;

use crate::{clients::arbiters::ArbitersModule, contracts};

/// Confirmation arbiter type
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ConfirmationArbiterType {
    /// Only one fulfillment can be confirmed per escrow, confirmation can be revoked
    ExclusiveRevocable,
    /// Only one fulfillment can be confirmed per escrow, confirmation cannot be revoked
    ExclusiveUnrevocable,
    /// Multiple fulfillments can be confirmed per escrow, confirmations can be revoked
    NonexclusiveRevocable,
    /// Multiple fulfillments can be confirmed per escrow, confirmations cannot be revoked
    NonexclusiveUnrevocable,
}

impl ArbitersModule {
    /// Get the address of a confirmation arbiter by type
    pub fn confirmation_arbiter_address(&self, arbiter_type: ConfirmationArbiterType) -> Address {
        match arbiter_type {
            ConfirmationArbiterType::ExclusiveRevocable => {
                self.addresses.exclusive_revocable_confirmation_arbiter
            }
            ConfirmationArbiterType::ExclusiveUnrevocable => {
                self.addresses.exclusive_unrevocable_confirmation_arbiter
            }
            ConfirmationArbiterType::NonexclusiveRevocable => {
                self.addresses.nonexclusive_revocable_confirmation_arbiter
            }
            ConfirmationArbiterType::NonexclusiveUnrevocable => {
                self.addresses.nonexclusive_unrevocable_confirmation_arbiter
            }
        }
    }

    /// Confirm a fulfillment for an escrow using ExclusiveRevocableConfirmationArbiter
    ///
    /// Only the escrow recipient can confirm.
    pub async fn confirm_exclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter = contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::new(
            self.addresses.exclusive_revocable_confirmation_arbiter,
            &*self.wallet_provider,
        );

        let receipt = arbiter
            .confirm(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Revoke a confirmation using ExclusiveRevocableConfirmationArbiter
    ///
    /// Only the escrow recipient can revoke.
    pub async fn revoke_exclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter = contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::new(
            self.addresses.exclusive_revocable_confirmation_arbiter,
            &*self.wallet_provider,
        );

        let receipt = arbiter
            .revoke(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Request confirmation for a fulfillment using ExclusiveRevocableConfirmationArbiter
    ///
    /// The fulfillment attester or recipient can request confirmation.
    pub async fn request_confirmation_exclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter = contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::new(
            self.addresses.exclusive_revocable_confirmation_arbiter,
            &*self.wallet_provider,
        );

        let receipt = arbiter
            .requestConfirmation(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Confirm a fulfillment for an escrow using ExclusiveUnrevocableConfirmationArbiter
    ///
    /// Only the escrow recipient can confirm.
    pub async fn confirm_exclusive_unrevocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter =
            contracts::arbiters::confirmation::ExclusiveUnrevocableConfirmationArbiter::new(
                self.addresses.exclusive_unrevocable_confirmation_arbiter,
                &*self.wallet_provider,
            );

        let receipt = arbiter
            .confirm(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Request confirmation for a fulfillment using ExclusiveUnrevocableConfirmationArbiter
    ///
    /// The fulfillment attester or recipient can request confirmation.
    pub async fn request_confirmation_exclusive_unrevocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter =
            contracts::arbiters::confirmation::ExclusiveUnrevocableConfirmationArbiter::new(
                self.addresses.exclusive_unrevocable_confirmation_arbiter,
                &*self.wallet_provider,
            );

        let receipt = arbiter
            .requestConfirmation(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Confirm a fulfillment for an escrow using NonexclusiveRevocableConfirmationArbiter
    ///
    /// Only the escrow recipient can confirm.
    pub async fn confirm_nonexclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter =
            contracts::arbiters::confirmation::NonexclusiveRevocableConfirmationArbiter::new(
                self.addresses.nonexclusive_revocable_confirmation_arbiter,
                &*self.wallet_provider,
            );

        let receipt = arbiter
            .confirm(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Revoke a confirmation using NonexclusiveRevocableConfirmationArbiter
    ///
    /// Only the escrow recipient can revoke.
    pub async fn revoke_nonexclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter =
            contracts::arbiters::confirmation::NonexclusiveRevocableConfirmationArbiter::new(
                self.addresses.nonexclusive_revocable_confirmation_arbiter,
                &*self.wallet_provider,
            );

        let receipt = arbiter
            .revoke(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Request confirmation for a fulfillment using NonexclusiveRevocableConfirmationArbiter
    ///
    /// The fulfillment attester or recipient can request confirmation.
    pub async fn request_confirmation_nonexclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter =
            contracts::arbiters::confirmation::NonexclusiveRevocableConfirmationArbiter::new(
                self.addresses.nonexclusive_revocable_confirmation_arbiter,
                &*self.wallet_provider,
            );

        let receipt = arbiter
            .requestConfirmation(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Confirm a fulfillment for an escrow using NonexclusiveUnrevocableConfirmationArbiter
    ///
    /// Only the escrow recipient can confirm.
    pub async fn confirm_nonexclusive_unrevocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter =
            contracts::arbiters::confirmation::NonexclusiveUnrevocableConfirmationArbiter::new(
                self.addresses.nonexclusive_unrevocable_confirmation_arbiter,
                &*self.wallet_provider,
            );

        let receipt = arbiter
            .confirm(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Request confirmation for a fulfillment using NonexclusiveUnrevocableConfirmationArbiter
    ///
    /// The fulfillment attester or recipient can request confirmation.
    pub async fn request_confirmation_nonexclusive_unrevocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let arbiter =
            contracts::arbiters::confirmation::NonexclusiveUnrevocableConfirmationArbiter::new(
                self.addresses.nonexclusive_unrevocable_confirmation_arbiter,
                &*self.wallet_provider,
            );

        let receipt = arbiter
            .requestConfirmation(fulfillment, escrow)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Wait for a confirmation event from ExclusiveRevocableConfirmationArbiter
    pub async fn wait_for_confirmation_exclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
        from_block: Option<u64>,
    ) -> eyre::Result<Log<contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationMade>>
    {
        let filter = Filter::new()
            .from_block(from_block.unwrap_or(0))
            .address(self.addresses.exclusive_revocable_confirmation_arbiter)
            .event_signature(
                contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationMade::SIGNATURE_HASH,
            )
            .topic1(fulfillment)
            .topic2(escrow);

        let logs = self.public_provider.get_logs(&filter).await?;
        if let Some(log) = logs.iter().collect::<Vec<_>>().first().map(|log| {
            log.log_decode::<contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationMade>()
        }) {
            return Ok(log?.inner);
        }

        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let mut stream = sub.into_stream();

        if let Some(log) = stream.next().await {
            let log = log.log_decode::<contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationMade>()?;
            return Ok(log.inner);
        }

        Err(eyre::eyre!("No ConfirmationMade event found"))
    }

    /// Wait for a confirmation request event from ExclusiveRevocableConfirmationArbiter
    pub async fn wait_for_confirmation_request_exclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        confirmer: Address,
        from_block: Option<u64>,
    ) -> eyre::Result<Log<contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationRequested>>
    {
        let filter = Filter::new()
            .from_block(from_block.unwrap_or(0))
            .address(self.addresses.exclusive_revocable_confirmation_arbiter)
            .event_signature(
                contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationRequested::SIGNATURE_HASH,
            )
            .topic1(fulfillment)
            .topic2(confirmer.into_word());

        let logs = self.public_provider.get_logs(&filter).await?;
        if let Some(log) = logs.iter().collect::<Vec<_>>().first().map(|log| {
            log.log_decode::<contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationRequested>()
        }) {
            return Ok(log?.inner);
        }

        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let mut stream = sub.into_stream();

        if let Some(log) = stream.next().await {
            let log = log.log_decode::<contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::ConfirmationRequested>()?;
            return Ok(log.inner);
        }

        Err(eyre::eyre!("No ConfirmationRequested event found"))
    }

    /// Check if a fulfillment is confirmed for an escrow using ExclusiveRevocableConfirmationArbiter
    pub async fn is_confirmed_exclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<bool> {
        let arbiter = contracts::arbiters::confirmation::ExclusiveRevocableConfirmationArbiter::new(
            self.addresses.exclusive_revocable_confirmation_arbiter,
            &*self.public_provider,
        );

        let confirmed = arbiter.confirmations(fulfillment, escrow).call().await?;
        Ok(confirmed)
    }

    /// Check if a fulfillment is confirmed for an escrow using ExclusiveUnrevocableConfirmationArbiter
    pub async fn is_confirmed_exclusive_unrevocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<bool> {
        let arbiter =
            contracts::arbiters::confirmation::ExclusiveUnrevocableConfirmationArbiter::new(
                self.addresses.exclusive_unrevocable_confirmation_arbiter,
                &*self.public_provider,
            );

        let confirmed = arbiter.confirmations(fulfillment, escrow).call().await?;
        Ok(confirmed)
    }

    /// Check if a fulfillment is confirmed for an escrow using NonexclusiveRevocableConfirmationArbiter
    pub async fn is_confirmed_nonexclusive_revocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<bool> {
        let arbiter =
            contracts::arbiters::confirmation::NonexclusiveRevocableConfirmationArbiter::new(
                self.addresses.nonexclusive_revocable_confirmation_arbiter,
                &*self.public_provider,
            );

        let confirmed = arbiter.confirmations(fulfillment, escrow).call().await?;
        Ok(confirmed)
    }

    /// Check if a fulfillment is confirmed for an escrow using NonexclusiveUnrevocableConfirmationArbiter
    pub async fn is_confirmed_nonexclusive_unrevocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
    ) -> eyre::Result<bool> {
        let arbiter =
            contracts::arbiters::confirmation::NonexclusiveUnrevocableConfirmationArbiter::new(
                self.addresses.nonexclusive_unrevocable_confirmation_arbiter,
                &*self.public_provider,
            );

        let confirmed = arbiter.confirmations(fulfillment, escrow).call().await?;
        Ok(confirmed)
    }
}
