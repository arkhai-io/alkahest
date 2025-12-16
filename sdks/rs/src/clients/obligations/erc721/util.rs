//! ERC721 utility functions for approvals

use alloy::primitives::Address;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;
use crate::types::{ApprovalPurpose, Erc721Data};

use super::Erc721Module;

/// Utility API for ERC721 tokens (approvals)
pub struct Util<'a> {
    module: &'a Erc721Module,
}

impl<'a> Util<'a> {
    pub fn new(module: &'a Erc721Module) -> Self {
        Self { module }
    }

    /// Approves a specific token for trading.
    ///
    /// # Arguments
    /// * `token` - The ERC721 token data (address and id)
    /// * `purpose` - Whether the approval is for payment, escrow, or barter utils
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn approve(
        &self,
        token: &Erc721Data,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc721_contract = contracts::IERC721::new(token.address, &self.module.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation_nontierable,
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let receipt = erc721_contract
            .approve(to, token.id)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    /// Approves all tokens from a contract for trading.
    ///
    /// # Arguments
    /// * `token_contract` - The ERC721 contract address
    /// * `purpose` - Whether the approval is for payment, escrow, or barter utils
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn approve_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc721_contract =
            contracts::IERC721::new(token_contract, &self.module.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation_nontierable,
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let receipt = erc721_contract
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
    /// * `token_contract` - The ERC721 contract address
    /// * `purpose` - Whether the approval is for payment, escrow, or barter utils
    ///
    /// # Returns
    /// * `Result<TransactionReceipt>` - The transaction receipt
    pub async fn revoke_all(
        &self,
        token_contract: Address,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<TransactionReceipt> {
        let erc721_contract =
            contracts::IERC721::new(token_contract, &self.module.wallet_provider);

        let to = match purpose {
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation_nontierable,
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let receipt = erc721_contract
            .setApprovalForAll(to, false)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}
