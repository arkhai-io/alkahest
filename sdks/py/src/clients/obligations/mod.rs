//! Obligation clients module
//!
//! This module contains clients for interacting with various obligation contracts:
//! - `erc20`: ERC20 token obligations (escrow, payment, barter)
//! - `erc721`: ERC721 token obligations (escrow, payment, barter)
//! - `erc1155`: ERC1155 token obligations (escrow, payment, barter)
//! - `native_token`: Native token (ETH) obligations (escrow, payment, barter)
//! - `token_bundle`: Token bundle obligations (escrow, payment, barter)
//! - `attestation`: Attestation obligations
//! - `string`: String-based obligations

pub mod attestation;
pub mod erc1155;
pub mod erc20;
pub mod erc721;
pub mod native_token;
pub mod string;
pub mod token_bundle;

// Re-export main client types
pub use attestation::AttestationClient;
pub use erc1155::Erc1155Client;
pub use erc20::Erc20Client;
pub use erc721::Erc721Client;
pub use native_token::NativeTokenClient;
pub use string::StringObligationClient;
pub use token_bundle::TokenBundleClient;

// Re-export obligation data types
pub use erc1155::{PyERC1155EscrowObligationData, PyERC1155PaymentObligationData};
pub use erc20::{PyERC20EscrowObligationData, PyERC20PaymentObligationData};
pub use erc721::{PyERC721EscrowObligationData, PyERC721PaymentObligationData};
pub use string::PyStringObligationData;
