//! Token bundle atomic payment utilities.

use alloy::primitives::FixedBytes;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;

use super::TokenBundleModule;

pub struct BarterUtils<'a> {
    module: &'a TokenBundleModule,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a TokenBundleModule) -> Self {
        Self { module }
    }

    pub async fn pay_bundle_and_collect(
        &self,
        escrow_uid: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let utility = contracts::utils::AtomicPaymentUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        Ok(utility
            .payBundleAndCollect(escrow_uid)
            .send()
            .await?
            .get_receipt()
            .await?)
    }
}
