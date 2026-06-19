//! ERC1155 barter utilities.
//!
//! These helpers settle existing escrows atomically by paying with ERC1155
//! tokens. Create escrows through the ERC1155 escrow client.

use alloy::primitives::FixedBytes;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;

use super::Erc1155Module;

/// Barter utilities API for ERC1155 token payments.
pub struct BarterUtils<'a> {
    module: &'a Erc1155Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc1155Module) -> Self {
        Self { module }
    }

    pub async fn pay_erc1155_for_erc1155(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC1155BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc1155ForErc1155(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn pay_erc1155_for_erc20(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC1155BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc1155ForErc20(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn pay_erc1155_for_erc721(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC1155BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc1155ForErc721(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn pay_erc1155_for_bundle(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC1155BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc1155ForBundle(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn pay_erc1155_for_native(
        &self,
        buy_attestation: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let barter_utils_contract = contracts::utils::ERC1155BarterUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        let receipt = barter_utils_contract
            .payErc1155ForEth(buy_attestation)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
