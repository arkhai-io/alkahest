//! Token Bundle utility functions for approvals

use alloy::primitives::Address;
use alloy::rpc::types::TransactionReceipt;
use std::collections::HashSet;

use crate::contracts::{IERC20, IERC721, IERC1155};
use crate::types::{ApprovalPurpose, SharedWalletProvider, TokenBundleData};

use super::TokenBundleAddresses;

/// Approves all tokens in a bundle for trading.
///
/// # Arguments
/// * `wallet_provider` - The wallet provider
/// * `addresses` - The token bundle contract addresses
/// * `bundle` - The token bundle data containing tokens to approve
/// * `purpose` - Purpose of approval (escrow or payment)
///
/// # Returns
/// * `Result<Vec<TransactionReceipt>>` - A vector of transaction receipts for all approval transactions
///
/// # Example
/// * let approvals = client.token_bundle().approve(&token_bundle, ApprovalPurpose::Escrow).await?;
pub async fn approve(
    wallet_provider: &SharedWalletProvider,
    addresses: &TokenBundleAddresses,
    bundle: &TokenBundleData,
    purpose: ApprovalPurpose,
) -> eyre::Result<Vec<TransactionReceipt>> {
    // Get the appropriate contract address based on purpose
    let target = match purpose {
        ApprovalPurpose::Escrow => addresses.escrow_obligation,
        ApprovalPurpose::Payment => addresses.payment_obligation,
        ApprovalPurpose::BarterUtils => addresses.barter_utils,
    };

    let mut results = Vec::new();

    // Process ERC20 tokens
    for token in &bundle.erc20s {
        let erc20_contract = IERC20::new(token.address, wallet_provider);

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
        let erc721_contract = IERC721::new(address, wallet_provider);

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
        let erc1155_contract = IERC1155::new(address, wallet_provider);

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
