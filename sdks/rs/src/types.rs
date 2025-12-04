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
};

use alloy::signers::local::PrivateKeySigner;
use std::sync::Arc;

use crate::contracts::IEAS::Attestation;

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
}

pub struct DecodedAttestation<T> {
    pub attestation: Attestation,
    pub data: T,
}
