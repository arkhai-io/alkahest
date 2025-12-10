//! Native Token obligations module
//!
//! This module provides functionality for native token (ETH) operations including:
//! - Escrow obligations (tierable and non-tierable)
//! - Payment obligations
//! - Barter utilities for cross-token trading

pub mod barter_utils;
pub mod escrow;
pub mod payment;
pub mod util;

use alloy::primitives::Address;
use alloy::signers::local::PrivateKeySigner;
use serde::{Deserialize, Serialize};

use crate::addresses::BASE_SEPOLIA_ADDRESSES;
use crate::contracts;
use crate::extensions::{AlkahestExtension, ContractModule};
use crate::impl_abi_conversions;
use crate::impl_token_bundle_payment_obligation;
use crate::types::{ProviderContext, SharedWalletProvider};

// --- ABI conversions for NativeToken obligation types ---
impl_abi_conversions!(contracts::obligations::NativeTokenPaymentObligation::ObligationData);
impl_abi_conversions!(contracts::obligations::escrow::non_tierable::NativeTokenEscrowObligation::ObligationData);
impl_abi_conversions!(contracts::obligations::escrow::tierable::NativeTokenEscrowObligation::ObligationData);

// --- TokenBundle conversions for NativeToken barter utils ---
impl_token_bundle_payment_obligation!(contracts::utils::native_token::TokenBundlePaymentObligation::ObligationData);

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NativeTokenAddresses {
    pub eas: Address,
    pub barter_utils: Address,
    pub escrow_obligation: Address,
    pub payment_obligation: Address,
}

impl Default for NativeTokenAddresses {
    fn default() -> Self {
        NativeTokenAddresses {
            eas: BASE_SEPOLIA_ADDRESSES.erc20_addresses.eas,
            barter_utils: Address::ZERO, // TODO: Add actual address when deployed
            escrow_obligation: Address::ZERO, // TODO: Add actual address when deployed
            payment_obligation: Address::ZERO, // TODO: Add actual address when deployed
        }
    }
}

/// Available contracts in the Native Token module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum NativeTokenContract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// Barter utilities contract for native tokens
    BarterUtils,
    /// Escrow obligation contract for native tokens
    EscrowObligation,
    /// Payment obligation contract for native tokens
    PaymentObligation,
}

/// Client for interacting with native token (ETH) trading and escrow functionality.
///
/// This client provides methods for:
/// - Trading native tokens for other tokens (ERC20, ERC721, ERC1155)
/// - Creating escrow arrangements with custom demands
/// - Managing direct native token payments
/// - Collecting payments from fulfilled trades
#[derive(Clone)]
pub struct NativeTokenModule {
    pub(crate) signer: PrivateKeySigner,
    pub(crate) wallet_provider: SharedWalletProvider,
    pub addresses: NativeTokenAddresses,
}

impl ContractModule for NativeTokenModule {
    type Contract = NativeTokenContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            NativeTokenContract::Eas => self.addresses.eas,
            NativeTokenContract::BarterUtils => self.addresses.barter_utils,
            NativeTokenContract::EscrowObligation => self.addresses.escrow_obligation,
            NativeTokenContract::PaymentObligation => self.addresses.payment_obligation,
        }
    }
}

impl NativeTokenModule {
    /// Creates a new NativeTokenModule instance.
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: SharedWalletProvider,
        addresses: Option<NativeTokenAddresses>,
    ) -> eyre::Result<Self> {
        Ok(NativeTokenModule {
            signer,
            wallet_provider,
            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Access escrow API
    ///
    /// # Example
    /// ```rust,ignore
    /// // Non-tierable escrow (1:1 escrow:fulfillment)
    /// client.native_token().escrow().non_tierable().create(&price, &item, expiration).await?;
    ///
    /// // Tierable escrow (1:many escrow:fulfillment)
    /// client.native_token().escrow().tierable().create(&price, &item, expiration).await?;
    /// ```
    pub fn escrow(&self) -> escrow::Escrow<'_> {
        escrow::Escrow::new(self)
    }

    /// Access payment API
    ///
    /// # Example
    /// ```rust,ignore
    /// client.native_token().payment().pay(&price, payee).await?;
    /// ```
    pub fn payment(&self) -> payment::Payment<'_> {
        payment::Payment::new(self)
    }

    /// Access barter utilities API
    ///
    /// # Example
    /// ```rust,ignore
    /// client.native_token().barter().buy_erc20_for_native(&bid, &ask, expiration).await?;
    /// client.native_token().barter().pay_native_for_erc20(buy_attestation).await?;
    /// ```
    pub fn barter(&self) -> barter_utils::BarterUtils<'_> {
        barter_utils::BarterUtils::new(self)
    }
}

impl AlkahestExtension for NativeTokenModule {
    type Config = NativeTokenAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, providers.wallet.clone(), config)
    }
}
