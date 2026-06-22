//! Obligation clients module
//!
//! This module contains clients for interacting with various obligation contracts:
//! - `erc20`: ERC20 token obligations (escrow, payment)
//! - `erc721`: ERC721 token obligations (escrow, payment)
//! - `erc1155`: ERC1155 token obligations (escrow, payment)
//! - `native_token`: Native token (ETH) obligations (escrow, payment)
//! - `token_bundle`: Token bundle obligations (escrow, payment)
//! - `attestation`: Attestation obligations
//! - `hook_based`: Hook-based escrow obligation helpers
//! - `string`: String-based obligations

pub mod attestation;
pub mod commit_reveal;
pub mod erc1155;
pub mod erc20;
pub mod erc721;
pub mod hook_based;
pub mod native_token;
pub mod string;
pub mod token_bundle;

// Re-export main client types
pub use attestation::AttestationClient;
pub use commit_reveal::CommitRevealObligationClient;
pub use erc1155::Erc1155Client;
pub use erc20::Erc20Client;
pub use erc721::Erc721Client;
pub use hook_based::HookBasedClient;
pub use native_token::NativeTokenClient;
pub use string::StringObligationClient;
pub use token_bundle::TokenBundleClient;

// Re-export obligation data types
pub use commit_reveal::{PyCommitRevealDemandData, PyCommitRevealObligationData};
pub use erc1155::{PyERC1155EscrowObligationData, PyERC1155PaymentObligationData};
pub use erc20::{PyERC20EscrowObligationData, PyERC20PaymentObligationData};
pub use erc721::{PyERC721EscrowObligationData, PyERC721PaymentObligationData};
pub use hook_based::{PyHookEscrowObligationData, PyHooksEscrowObligationData};
pub use native_token::PyNativeTokenPaymentObligationData;
pub use string::PyStringObligationData;
pub use token_bundle::PyTokenBundlePaymentObligationData;
