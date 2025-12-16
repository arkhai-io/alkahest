//! ERC721 barter utilities

use alloy::primitives::FixedBytes;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;
use crate::types::{Erc20Data, Erc721Data, Erc1155Data, TokenBundleData};

use super::Erc721Module;

/// Barter utilities API for ERC721 tokens
pub struct BarterUtils<'a> {
    module: &'a Erc721Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc721Module) -> Self {
        Self { module }
    }

    // =========================================================================
    // ERC721 for ERC721
    // =========================================================================

    /// Creates an escrow to trade ERC721 tokens for other ERC721 tokens.
    pub async fn buy_erc721_for_erc721(
        &self,
        bid: &Erc721Data,
        ask: &Erc721Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc721ForErc721(bid.address, bid.id, ask.address, ask.id, expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-ERC721 trade escrow.
    pub async fn pay_erc721_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc721ForErc721(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    // =========================================================================
    // ERC721 for ERC20
    // =========================================================================

    /// Creates an escrow to trade ERC721 tokens for ERC20 tokens.
    pub async fn buy_erc20_with_erc721(
        &self,
        bid: &Erc721Data,
        ask: &Erc20Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc20WithErc721(bid.address, bid.id, ask.address, ask.value, expiration)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-ERC20 trade escrow.
    pub async fn pay_erc721_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc721ForErc20(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    // =========================================================================
    // ERC721 for ERC1155
    // =========================================================================

    /// Creates an escrow to trade ERC721 tokens for ERC1155 tokens.
    pub async fn buy_erc1155_with_erc721(
        &self,
        bid: &Erc721Data,
        ask: &Erc1155Data,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyErc1155WithErc721(
                bid.address,
                bid.id,
                ask.address,
                ask.id,
                ask.value,
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-ERC1155 trade escrow.
    pub async fn pay_erc721_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc721ForErc1155(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    // =========================================================================
    // ERC721 for Token Bundle
    // =========================================================================

    /// Creates an escrow to trade ERC721 tokens for a bundle of tokens.
    pub async fn buy_bundle_with_erc721(
        &self,
        bid: &Erc721Data,
        ask: &TokenBundleData,
        expiration: u64,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .buyBundleWithErc721(
                bid.address,
                bid.id,
                (ask, self.module.signer.address()).into(),
                expiration,
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Fulfills an existing ERC721-for-bundle trade escrow.
    pub async fn pay_erc721_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc721ForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
