//! ERC721 barter utilities.
//!
//! These helpers settle existing escrows atomically by paying with ERC721
//! tokens. Create escrows through the ERC721 escrow client.

use alloy::primitives::FixedBytes;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;

use super::Erc721Module;

/// Barter utilities API for ERC721 token payments.
pub struct BarterUtils<'a> {
    module: &'a Erc721Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc721Module) -> Self {
        Self { module }
    }

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

    pub async fn pay_erc721_for_native(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC721BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc721ForEth(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
