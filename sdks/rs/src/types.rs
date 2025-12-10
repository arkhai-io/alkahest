use alloy::{
    network::EthereumWallet,
    primitives::{Address, Bytes, U256},
    providers::{
        RootProvider,
        fillers::{
            BlobGasFiller, ChainIdFiller, FillProvider, GasFiller, JoinFill,
            NonceFiller, SimpleNonceManager, WalletFiller,
        },
    },
    sol,
};

use alloy::signers::local::PrivateKeySigner;
use std::sync::Arc;

use crate::contracts::IEAS::Attestation;

// Event emitted when escrow is claimed
sol! (
    event EscrowClaimed(
        bytes32 indexed payment,
        bytes32 indexed fulfillment,
        address indexed fulfiller
    );
);

/// Macro to generate From/TryFrom implementations for ABI-encoded types.
///
/// This provides:
/// - `From<T>` for `Bytes` (encoding)
/// - `TryFrom<&Bytes>` for `T` (decoding)
/// - `TryFrom<Bytes>` for `T` (decoding)
///
/// Works with any type that implements `SolValue` (DemandData, ObligationData, etc.)
#[macro_export]
macro_rules! impl_abi_conversions {
    ($type:ty) => {
        impl From<$type> for alloy::primitives::Bytes {
            fn from(value: $type) -> Self {
                use alloy::sol_types::SolValue as _;
                value.abi_encode().into()
            }
        }

        impl TryFrom<&alloy::primitives::Bytes> for $type {
            type Error = eyre::Error;

            fn try_from(data: &alloy::primitives::Bytes) -> Result<Self, Self::Error> {
                use alloy::sol_types::SolValue as _;
                Ok(Self::abi_decode(data)?)
            }
        }

        impl TryFrom<alloy::primitives::Bytes> for $type {
            type Error = eyre::Error;

            fn try_from(data: alloy::primitives::Bytes) -> Result<Self, Self::Error> {
                use alloy::sol_types::SolValue as _;
                Ok(Self::abi_decode(&data)?)
            }
        }
    };
}

pub type WalletProvider = FillProvider<
    JoinFill<
        JoinFill<
            JoinFill<
                alloy::providers::Identity,
                JoinFill<GasFiller, JoinFill<BlobGasFiller, JoinFill<NonceFiller, ChainIdFiller>>>,
            >,
            NonceFiller<SimpleNonceManager>,
        >,
        WalletFiller<EthereumWallet>,
    >,
    RootProvider,
>;

pub type PublicProvider = FillProvider<
    JoinFill<
        alloy::providers::Identity,
        JoinFill<GasFiller, JoinFill<BlobGasFiller, JoinFill<NonceFiller, ChainIdFiller>>>,
    >,
    RootProvider,
>;

pub type SharedWalletProvider = Arc<WalletProvider>;
pub type SharedPublicProvider = Arc<PublicProvider>;

#[derive(Clone)]
pub struct ProviderContext {
    pub wallet: SharedWalletProvider,
    pub public: SharedPublicProvider,
    pub signer: PrivateKeySigner,
}

#[derive(Debug, Clone)]
pub struct ArbiterData {
    pub arbiter: Address,
    pub demand: Bytes,
}

#[derive(Debug, Clone)]
pub struct Erc20Data {
    pub address: Address,
    pub value: U256,
}

#[derive(Debug, Clone)]
pub struct Erc721Data {
    pub address: Address,
    pub id: U256,
}

#[derive(Debug, Clone)]
pub struct Erc1155Data {
    pub address: Address,
    pub id: U256,
    pub value: U256,
}

#[derive(Debug, Clone)]
pub struct TokenBundleData {
    pub native_amount: U256,
    pub erc20s: Vec<Erc20Data>,
    pub erc721s: Vec<Erc721Data>,
    pub erc1155s: Vec<Erc1155Data>,
}

#[derive(Debug, Clone)]
pub struct NativeTokenData {
    pub value: U256,
}

pub enum ApprovalPurpose {
    Escrow,
    Payment,
    BarterUtils,
}

pub struct DecodedAttestation<T> {
    pub attestation: Attestation,
    pub data: T,
}
