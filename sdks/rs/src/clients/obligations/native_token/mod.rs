//! Native Token obligations module
//!
//! This module provides functionality for native token (ETH) operations including:
//! - Escrow obligations (unconditional and default)
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
use crate::types::{ProviderContext, SharedWalletProvider};

// --- ABI conversions for NativeToken obligation types ---
impl_abi_conversions!(contracts::obligations::NativeTokenPaymentObligation::ObligationData);
impl_abi_conversions!(
    contracts::obligations::escrow::default_escrow::NativeTokenEscrowObligation::ObligationData
);
impl_abi_conversions!(contracts::obligations::escrow::unconditional::UnconditionalNativeTokenEscrowObligation::ObligationData);

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NativeTokenAddresses {
    pub eas: Address,
    pub barter_utils: Address,
    pub escrow_obligation_default: Address,
    pub escrow_obligation_unconditional: Address,
    pub payment_obligation: Address,
}

impl Default for NativeTokenAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.native_token_addresses
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
            NativeTokenContract::EscrowObligation => self.addresses.escrow_obligation_default,
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
    /// // Non-unconditional escrow (1:1 escrow:fulfillment)
    /// client.native_token().escrow().default().create(&price, &item, expiration).await?;
    ///
    /// // Unconditional escrow (1:many escrow:fulfillment)
    /// client.native_token().escrow().unconditional().create(&price, &item, expiration).await?;
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
    /// let escrow = client.native_token().escrow().default().create(&bid, &demand, expiration).await?;
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
