//! ERC721 atomic payment utilities.

use alloy::primitives::FixedBytes;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;

use super::Erc721Module;

pub struct BarterUtils<'a> {
    module: &'a Erc721Module,
}

impl<'a> BarterUtils<'a> {
    pub fn new(module: &'a Erc721Module) -> Self {
        Self { module }
    }

    pub async fn pay_erc721_and_collect(
        &self,
        escrow_uid: FixedBytes<32>,
    ) -> eyre::Result<TransactionReceipt> {
        let utility = contracts::utils::AtomicPaymentUtils::new(
            self.module.addresses.barter_utils,
            &self.module.wallet_provider,
        );

        Ok(utility
            .payErc721AndCollect(escrow_uid)
            .send()
            .await?
            .get_receipt()
            .await?)
    }
}
