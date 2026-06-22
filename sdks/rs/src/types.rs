use alloy::{
    network::EthereumWallet,
    primitives::{Address, Bytes, U256},
    providers::{
        RootProvider,
        fillers::{
            BlobGasFiller, ChainIdFiller, FillProvider, GasFiller, JoinFill, NonceFiller,
            SimpleNonceManager, WalletFiller,
        },
    },
    sol,
};

use alloy::signers::local::PrivateKeySigner;
use std::sync::Arc;

use crate::contracts::IEAS::Attestation;

// Event emitted when escrow is claimed.
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

/// Wallet-capable Alloy provider stack used for transactions.
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

/// Read-only Alloy provider stack used for chain queries.
pub type PublicProvider = FillProvider<
    JoinFill<
        alloy::providers::Identity,
        JoinFill<GasFiller, JoinFill<BlobGasFiller, JoinFill<NonceFiller, ChainIdFiller>>>,
    >,
    RootProvider,
>;

/// Shared wallet provider handle used by extension modules.
pub type SharedWalletProvider = Arc<WalletProvider>;
/// Shared public provider handle used by extension modules.
pub type SharedPublicProvider = Arc<PublicProvider>;

/// Provider and signer context passed to SDK extension modules.
#[derive(Clone)]
pub struct ProviderContext {
    /// Provider used for sending transactions.
    pub wallet: SharedWalletProvider,
    /// Provider used for read-only calls and event queries.
    pub public: SharedPublicProvider,
    /// Local signer backing the wallet provider.
    pub signer: PrivateKeySigner,
    /// Polling interval used by event-watching helpers when the transport
    /// is HTTP. Inherited from the parent ``AlkahestClient`` and threaded
    /// through to every extension module so per-test or per-deployment
    /// overrides actually reach the call sites that use ``watch_logs``.
    pub poll_interval: std::time::Duration,
}

/// Arbiter address plus ABI-encoded demand bytes.
#[derive(Debug, Clone)]
pub struct ArbiterData {
    /// Arbiter contract address.
    pub arbiter: Address,
    /// Arbiter-specific ABI-encoded demand data.
    pub demand: Bytes,
}

/// ERC20 token amount used by payment and escrow helpers.
#[derive(Debug, Clone)]
pub struct Erc20Data {
    /// ERC20 token contract address.
    pub address: Address,
    /// Token amount in the ERC20's smallest unit.
    pub value: U256,
}

/// ERC721 token used by payment and escrow helpers.
#[derive(Debug, Clone)]
pub struct Erc721Data {
    /// ERC721 token contract address.
    pub address: Address,
    /// ERC721 token ID.
    pub id: U256,
}

/// ERC1155 token amount used by payment and escrow helpers.
#[derive(Debug, Clone)]
pub struct Erc1155Data {
    /// ERC1155 token contract address.
    pub address: Address,
    /// ERC1155 token ID.
    pub id: U256,
    /// Token amount.
    pub value: U256,
}

/// Mixed token bundle data used by bundle payment and escrow helpers.
#[derive(Debug, Clone)]
pub struct TokenBundleData {
    /// Native-token amount included in the bundle.
    pub native_amount: U256,
    /// ERC20 items included in the bundle.
    pub erc20s: Vec<Erc20Data>,
    /// ERC721 items included in the bundle.
    pub erc721s: Vec<Erc721Data>,
    /// ERC1155 items included in the bundle.
    pub erc1155s: Vec<Erc1155Data>,
}

/// Native-token amount used by payment and escrow helpers.
#[derive(Debug, Clone)]
pub struct NativeTokenData {
    /// Native-token amount in wei.
    pub value: U256,
}

/// Approval target category understood by SDK token utility modules.
pub enum ApprovalPurpose {
    /// Approve the escrow obligation contract.
    Escrow,
    /// Approve the payment obligation contract.
    Payment,
    /// Approve the atomic payment utility contract.
    AtomicPayment,
}

/// EAS attestation plus decoded obligation data.
pub struct DecodedAttestation<T> {
    /// Raw EAS attestation returned by EAS.
    pub attestation: Attestation,
    /// ABI-decoded obligation data.
    pub data: T,
}
