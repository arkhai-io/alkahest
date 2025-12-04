//! NonexclusiveUnrevocableConfirmationArbiter client
//!
//! Multiple fulfillments per escrow, confirmations cannot be revoked.

use alloy::{
    primitives::{FixedBytes, Log},
    providers::Provider as _,
    rpc::types::{Filter, TransactionReceipt},
    sol_types::SolEvent as _,
};
use futures_util::StreamExt as _;

use crate::{clients::arbiters::ArbitersModule, contracts};

impl ArbitersModule {
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

    /// Wait for a confirmation event from NonexclusiveUnrevocableConfirmationArbiter
    pub async fn wait_for_confirmation_nonexclusive_unrevocable(
        &self,
        fulfillment: FixedBytes<32>,
        escrow: FixedBytes<32>,
        from_block: Option<u64>,
    ) -> eyre::Result<
        Log<contracts::arbiters::confirmation::NonexclusiveUnrevocableConfirmationArbiter::ConfirmationMade>,
    > {
        let filter = Filter::new()
            .from_block(from_block.unwrap_or(0))
            .address(self.addresses.nonexclusive_unrevocable_confirmation_arbiter)
            .event_signature(
                contracts::arbiters::confirmation::NonexclusiveUnrevocableConfirmationArbiter::ConfirmationMade::SIGNATURE_HASH,
            )
            .topic1(fulfillment)
            .topic2(escrow);

        let logs = self.public_provider.get_logs(&filter).await?;
        if let Some(log) = logs.iter().collect::<Vec<_>>().first().map(|log| {
            log.log_decode::<contracts::arbiters::confirmation::NonexclusiveUnrevocableConfirmationArbiter::ConfirmationMade>()
        }) {
            return Ok(log?.inner);
        }

        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let mut stream = sub.into_stream();

        if let Some(log) = stream.next().await {
            let log = log.log_decode::<contracts::arbiters::confirmation::NonexclusiveUnrevocableConfirmationArbiter::ConfirmationMade>()?;
            return Ok(log.inner);
        }

        Err(eyre::eyre!("No ConfirmationMade event found"))
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
