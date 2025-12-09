//! Token Bundle barter utilities
//!
//! Provides functionality for trading token bundles for other token bundles.

use alloy::primitives::{Address, Bytes, FixedBytes};
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;
use crate::types::{ArbiterData, TokenBundleData};

use super::TokenBundleModule;

/// Barter utilities API for token bundles
pub struct BarterUtils<'a> {
    module: &'a TokenBundleModule,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a TokenBundleModule) -> Self {
        Self { module }
    }

    // =========================================================================
    // Bundle for Bundle
    // =========================================================================

    /// Creates an escrow to trade token bundles for other token bundles.
    ///
    /// # Arguments
    /// * `bid` - The token bundle data being offered
    /// * `ask` - The token bundle data being requested
    /// * `expiration` - The expiration timestamp
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn buy_bundle_for_bundle(
        &self,
        bid: &TokenBundleData,
        ask: &TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::TokenBundleBarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let zero_arbiter = ArbiterData {
            arbiter: Address::ZERO,
            demand: Bytes::new(),
        };

        let receipt = barter_utils_contract
            .buyBundleForBundle(
                (bid, &zero_arbiter).into(),
                (ask, self.module.signer.address()).into(),
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing bundle-for-bundle trade escrow.
    ///
    /// # Arguments
    /// * `buy_attestation` - The attestation UID of the buy order
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
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
