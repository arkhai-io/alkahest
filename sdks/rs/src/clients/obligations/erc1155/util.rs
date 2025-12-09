//! ERC1155 utility functions for approvals

use alloy::primitives::Address;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;
use crate::types::{ApprovalPurpose, SharedWalletProvider};

use super::Erc1155Addresses;

/// Approves all tokens from a contract for trading.
///
/// # Arguments
/// * `wallet_provider` - The wallet provider
/// * `addresses` - The ERC1155 contract addresses
/// * `token_contract` - The ERC1155 contract address
/// * `purpose` - Whether the approval is for payment or escrow
///
/// # Returns
/// * `Result<TransactionReceipt>` - The transaction receipt
pub async fn approve_all(
    wallet_provider: &SharedWalletProvider,
    addresses: &Erc1155Addresses,
    token_contract: Address,
    purpose: ApprovalPurpose,
) -> eyre::Result<TransactionReceipt> {
    let erc1155_contract = contracts::IERC1155::new(token_contract, wallet_provider);

    let to = match purpose {
        ApprovalPurpose::Escrow => addresses.escrow_obligation,
        ApprovalPurpose::Payment => addresses.payment_obligation,
        ApprovalPurpose::BarterUtils => addresses.barter_utils,
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
/// * `wallet_provider` - The wallet provider
/// * `addresses` - The ERC1155 contract addresses
/// * `token_contract` - The ERC1155 contract address
/// * `purpose` - Whether to revoke payment or escrow approval
///
/// # Returns
/// * `Result<TransactionReceipt>` - The transaction receipt
pub async fn revoke_all(
    wallet_provider: &SharedWalletProvider,
    addresses: &Erc1155Addresses,
    token_contract: Address,
    purpose: ApprovalPurpose,
) -> eyre::Result<TransactionReceipt> {
    let erc1155_contract = contracts::IERC1155::new(token_contract, wallet_provider);

    let to = match purpose {
        ApprovalPurpose::Escrow => addresses.escrow_obligation,
        ApprovalPurpose::Payment => addresses.payment_obligation,
        ApprovalPurpose::BarterUtils => addresses.barter_utils,
    };

    let receipt = erc1155_contract
        .setApprovalForAll(to, false)
        .send()
        .await?
        .get_receipt()
        .await?;

    Ok(receipt)
}
