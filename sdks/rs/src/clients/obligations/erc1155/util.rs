//! ERC1155 utility functions for approvals

use alloy::primitives::Address;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;
use crate::types::ApprovalPurpose;

use super::Erc1155Module;

/// Utility API for ERC1155 tokens (approvals)
pub struct Util<'a> {
    module: &'a Erc1155Module,
}

impl<'a> Util<'a> {
    pub fn new(module: &'a Erc1155Module) -> Self {
        Self { module }
    }

    /// Approves all tokens from a contract for trading.
    ///
    /// # Arguments
    /// * `token_contract` - The ERC1155 contract address
    /// * `purpose` - Whether the approval is for payment, escrow, or barter utils
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn approve_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc1155_contract =
            contracts::IERC1155::new(token_contract, &self.module.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation_nontierable,
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let receipt = erc1155_contract
            .setApprovalForAll(to, true)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Revokes approval for all tokens from a contract.
    ///
    /// # Arguments
    /// * `token_contract` - The ERC1155 contract address
    /// * `purpose` - Whether to revoke payment, escrow, or barter utils approval
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn revoke_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc1155_contract =
            contracts::IERC1155::new(token_contract, &self.module.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation_nontierable,
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let receipt = erc1155_contract
            .setApprovalForAll(to, false)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
