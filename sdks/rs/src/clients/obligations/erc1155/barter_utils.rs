//! ERC1155 atomic payment utilities.

use alloy::primitives::FixedBytes;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;

use super::Erc1155Module;

pub struct BarterUtils<'a> {
    module: &'a Erc1155Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc1155Module) -> Self {
        Self { module }
    }

    pub async fn pay_erc1155_and_collect(
        &self,
        escrow_uid: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let utility = contracts::utils::AtomicPaymentUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        Ok(utility
            .payErc1155AndCollect(escrow_uid)
            .send()
            .await?
            .get_receipt()
            .await?)
    }
}
