//! Token Bundle utility functions for approvals

use alloy::primitives::Address;
use alloy::rpc::types::TransactionReceipt;
use std::collections::HashSet;

use crate::contracts::{IERC1155, IERC20, IERC721};
use crate::types::{ApprovalPurpose, TokenBundleData};

use super::TokenBundleModule;

/// Utility API for token bundles (approvals)
pub struct Util<'a> {
    module: &'a TokenBundleModule,
}

impl<'a> Util<'a> {
    pub fn new(module: &'a TokenBundleModule) -> Self {
        Self { module }
    }

    /// Approves all tokens in a bundle for trading.
    ///
    /// # Arguments
    /// * `bundle` - The token bundle data containing tokens to approve
    /// * `purpose` - Purpose of approval (escrow, payment, or barter utils)
    ///
    /// # Returns
    /// * `Result<Vec<TransactionReceipt>>` - A vector of transaction receipts for all approval transactions
    ///
    /// # Example
    /// ```rust,ignore
    /// let approvals = client.token_bundle().util().approve(&token_bundle, ApprovalPurpose::Escrow).await?;
    /// ```
    pub async fn approve(
        &self,
        bundle: &TokenBundleData,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<Vec<TransactionReceipt>> {
        // Get the appropriate contract address based on purpose
        let target = match purpose {
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation_nontierable,
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let mut results = Vec::new();

        // Process ERC20 tokens
        for token in &bundle.erc20s {
            let erc20_contract = IERC20::new(token.address, &self.module.wallet_provider);

            // Use map_err for more concise error handling
            let receipt = erc20_contract
                .approve(target, token.value)
                .send()
                .await
                .map_err(|e| eyre::eyre!("Failed to send ERC20 approval: {}", e))?
                .get_receipt()
                .await
                .map_err(|e| eyre::eyre!("Failed to get ERC20 approval receipt: {}", e))?;

            results.push(receipt);
        }

        // Process ERC721 tokens - group by token contract to use setApprovalForAll when possible
        let erc721_addresses: HashSet<Address> =
            bundle.erc721s.iter().map(|token| token.address).collect();

        // For contracts with multiple tokens, use setApprovalForAll
        for address in erc721_addresses {
            let erc721_contract = IERC721::new(address, &self.module.wallet_provider);

            let receipt = erc721_contract
                .setApprovalForAll(target, true)
                .send()
                .await
                .map_err(|e| eyre::eyre!("Failed to send ERC721 approval: {}", e))?
                .get_receipt()
                .await
                .map_err(|e| eyre::eyre!("Failed to get ERC721 approval receipt: {}", e))?;

            results.push(receipt);
        }

        // Process ERC1155 tokens - group by token contract to use setApprovalForAll
        let erc1155_addresses: HashSet<Address> =
            bundle.erc1155s.iter().map(|token| token.address).collect();

        // For ERC1155, always use setApprovalForAll
        for address in erc1155_addresses {
            let erc1155_contract = IERC1155::new(address, &self.module.wallet_provider);

            let receipt = erc1155_contract
                .setApprovalForAll(target, true)
                .send()
                .await
                .map_err(|e| eyre::eyre!("Failed to send ERC1155 approval: {}", e))?
                .get_receipt()
                .await
                .map_err(|e| eyre::eyre!("Failed to get ERC1155 approval receipt: {}", e))?;

            results.push(receipt);
        }

        Ok(results)
    }

    /// Revokes approval for all ERC1155 tokens in a bundle.
    ///
    /// # Arguments
    /// * `bundle` - The token bundle data containing ERC1155 tokens to revoke
    /// * `purpose` - Purpose of revocation (escrow, payment, or barter utils)
    ///
    /// # Returns
    /// * `Result<Vec<TransactionReceipt>>` - A vector of transaction receipts for all revoke transactions
    pub async fn revoke_erc1155s(
        &self,
        bundle: &TokenBundleData,
        purpose: ApprovalPurpose,
    ) -> eyre::Result<Vec<TransactionReceipt>> {
        let target = match purpose {
            ApprovalPurpose::Escrow => self.module.addresses.escrow_obligation_nontierable,
            ApprovalPurpose::Payment => self.module.addresses.payment_obligation,
            ApprovalPurpose::BarterUtils => self.module.addresses.barter_utils,
        };

        let mut results = Vec::new();

        let erc1155_addresses: HashSet<Address> =
            bundle.erc1155s.iter().map(|token| token.address).collect();

        for address in erc1155_addresses {
            let erc1155_contract = IERC1155::new(address, &self.module.wallet_provider);

            let receipt = erc1155_contract
                .setApprovalForAll(target, false)
                .send()
                .await
                .map_err(|e| eyre::eyre!("Failed to send ERC1155 revoke: {}", e))?
                .get_receipt()
                .await
                .map_err(|e| eyre::eyre!("Failed to get ERC1155 revoke receipt: {}", e))?;

            results.push(receipt);
        }

        Ok(results)
    }
}
