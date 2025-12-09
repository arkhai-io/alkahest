//! ERC721 utility functions for approvals

use alloy::primitives::Address;
use alloy::rpc::types::TransactionReceipt;

use crate::contracts;
use crate::types::{ApprovalPurpose, Erc721Data, SharedWalletProvider};

use super::Erc721Addresses;

/// Approves a specific token for trading.
pub async fn approve(
    wallet_provider: &SharedWalletProvider,
    addresses: &Erc721Addresses,
    token: &Erc721Data,
    purpose: ApprovalPurpose,
) -> eyre::Result<TransactionReceipt> {
    let erc721_contract = contracts::IERC721::new(token.address, wallet_provider);

    let to = match purpose {
        ApprovalPurpose::Escrow => addresses.escrow_obligation,
        ApprovalPurpose::Payment => addresses.payment_obligation,
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
pub async fn approve_all(
    wallet_provider: &SharedWalletProvider,
    addresses: &Erc721Addresses,
    token_contract: Address,
    purpose: ApprovalPurpose,
) -> eyre::Result<TransactionReceipt> {
    let erc721_contract = contracts::IERC721::new(token_contract, wallet_provider);

    let to = match purpose {
        ApprovalPurpose::Escrow => addresses.escrow_obligation,
        ApprovalPurpose::Payment => addresses.payment_obligation,
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
pub async fn revoke_all(
    wallet_provider: &SharedWalletProvider,
    addresses: &Erc721Addresses,
    token_contract: Address,
    purpose: ApprovalPurpose,
) -> eyre::Result<TransactionReceipt> {
    let erc721_contract = contracts::IERC721::new(token_contract, wallet_provider);

    let to = match purpose {
        ApprovalPurpose::Escrow => addresses.escrow_obligation,
        ApprovalPurpose::Payment => addresses.payment_obligation,
    };

    let receipt = erc721_contract
        .setApprovalForAll(to, false)
        .send()
        .await?
        .get_receipt()
        .await?;

    Ok(receipt)
}
