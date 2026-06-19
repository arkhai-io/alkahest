//! Token bundle barter utilities.
//!
//! These helpers settle existing escrows atomically by paying with token
//! bundles. Create escrows through the token bundle escrow client.

use alloy::primitives::FixedBytes;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;

use super::TokenBundleModule;

/// Barter utilities API for token bundle payments.
pub struct BarterUtils<'a> {
    module: &'a TokenBundleModule,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a TokenBundleModule) -> Self {
        Self { module }
    }

    pub async fn pay_bundle_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::TokenBundleBarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payBundleForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
