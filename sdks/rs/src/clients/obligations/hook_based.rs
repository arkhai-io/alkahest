use alloy::{
    primitives::{Address, Bytes},
    signers::local::PrivateKeySigner,
    sol_types::SolValue as _,
};
use serde::{Deserialize, Serialize};

use crate::{
    addresses::BASE_SEPOLIA_ADDRESSES,
    contracts,
    extensions::{AlkahestExtension, ContractModule},
    impl_abi_conversions,
    types::{ProviderContext, SharedWalletProvider},
};

/// Obligation data for a hook-based escrow with one hook.
type HookEscrowData =
    contracts::obligations::escrow::hook_based::HookEscrowObligation::ObligationData;
/// Obligation data for a hook-based escrow with multiple hooks.
type HooksEscrowData =
    contracts::obligations::escrow::hook_based::HooksEscrowObligation::ObligationData;

impl_abi_conversions!(HookEscrowData);
impl_abi_conversions!(HooksEscrowData);
impl_abi_conversions!(contracts::obligations::escrow::hook_based::hooks::ERC20EscrowHook::HookData);
impl_abi_conversions!(
    contracts::obligations::escrow::hook_based::hooks::ERC721EscrowHook::HookData
);
impl_abi_conversions!(
    contracts::obligations::escrow::hook_based::hooks::ERC1155EscrowHook::HookData
);
impl_abi_conversions!(
    contracts::obligations::escrow::hook_based::hooks::NativeTokenEscrowHook::HookData
);
impl_abi_conversions!(
    contracts::obligations::escrow::hook_based::hooks::AttestationEscrowHook::HookData
);
impl_abi_conversions!(
    contracts::obligations::escrow::hook_based::hooks::AttestationReferenceEscrowHook::HookData
);

/// Contract addresses used by the hook-based escrow module.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HookBasedAddresses {
    /// EAS contract address.
    pub eas: Address,
    /// HookEscrowObligation contract address.
    pub hook_escrow_obligation: Address,
    /// HooksEscrowObligation contract address.
    pub hooks_escrow_obligation: Address,
    /// ERC20EscrowHook contract address.
    pub erc20_escrow_hook: Address,
    /// ERC721EscrowHook contract address.
    pub erc721_escrow_hook: Address,
    /// ERC1155EscrowHook contract address.
    pub erc1155_escrow_hook: Address,
    /// NativeTokenEscrowHook contract address.
    pub native_token_escrow_hook: Address,
    /// AttestationEscrowHook contract address.
    pub attestation_escrow_hook: Address,
    /// AttestationReferenceEscrowHook contract address.
    pub attestation_reference_escrow_hook: Address,
}

impl Default for HookBasedAddresses {
    /// Returns Base Sepolia hook-based escrow addresses.
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.hook_based_addresses
    }
}

/// Contracts addressable through the hook-based escrow module.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum HookBasedContract {
    /// EAS contract.
    Eas,
    /// HookEscrowObligation contract.
    HookEscrowObligation,
    /// HooksEscrowObligation contract.
    HooksEscrowObligation,
    /// ERC20EscrowHook contract.
    Erc20EscrowHook,
    /// ERC721EscrowHook contract.
    Erc721EscrowHook,
    /// ERC1155EscrowHook contract.
    Erc1155EscrowHook,
    /// NativeTokenEscrowHook contract.
    NativeTokenEscrowHook,
    /// AttestationEscrowHook contract.
    AttestationEscrowHook,
    /// AttestationReferenceEscrowHook contract.
    AttestationReferenceEscrowHook,
}

/// Rust client module for hook-based escrow helpers.
#[derive(Clone)]
pub struct HookBasedModule {
    _signer: PrivateKeySigner,
    _wallet_provider: SharedWalletProvider,
    pub addresses: HookBasedAddresses,
}

impl ContractModule for HookBasedModule {
    type Contract = HookBasedContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            HookBasedContract::Eas => self.addresses.eas,
            HookBasedContract::HookEscrowObligation => self.addresses.hook_escrow_obligation,
            HookBasedContract::HooksEscrowObligation => self.addresses.hooks_escrow_obligation,
            HookBasedContract::Erc20EscrowHook => self.addresses.erc20_escrow_hook,
            HookBasedContract::Erc721EscrowHook => self.addresses.erc721_escrow_hook,
            HookBasedContract::Erc1155EscrowHook => self.addresses.erc1155_escrow_hook,
            HookBasedContract::NativeTokenEscrowHook => self.addresses.native_token_escrow_hook,
            HookBasedContract::AttestationEscrowHook => self.addresses.attestation_escrow_hook,
            HookBasedContract::AttestationReferenceEscrowHook => {
                self.addresses.attestation_reference_escrow_hook
            }
        }
    }
}

impl HookBasedModule {
    /// Creates a hook-based escrow module with optional custom addresses.
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: SharedWalletProvider,
        addresses: Option<HookBasedAddresses>,
    ) -> eyre::Result<Self> {
        Ok(Self {
            _signer: signer,
            _wallet_provider: wallet_provider,
            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Encodes single-hook escrow obligation data.
    pub fn encode_hook_escrow(data: &HookEscrowData) -> Bytes {
        data.abi_encode().into()
    }

    /// Decodes ABI-encoded single-hook escrow obligation data.
    pub fn decode_hook_escrow(data: &Bytes) -> eyre::Result<HookEscrowData> {
        Ok(HookEscrowData::abi_decode(data.as_ref())?)
    }

    /// Encodes multi-hook escrow obligation data.
    pub fn encode_hooks_escrow(data: &HooksEscrowData) -> Bytes {
        data.abi_encode().into()
    }

    /// Decodes ABI-encoded multi-hook escrow obligation data.
    pub fn decode_hooks_escrow(data: &Bytes) -> eyre::Result<HooksEscrowData> {
        Ok(HooksEscrowData::abi_decode(data.as_ref())?)
    }
}

impl AlkahestExtension for HookBasedModule {
    type Config = HookBasedAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, providers.wallet.clone(), config)
    }
}

#[cfg(test)]
mod tests {
    use alloy::primitives::{Address, Bytes};

    use super::*;

    #[test]
    fn hook_escrow_encode_decode_roundtrip() {
        let data = HookEscrowData {
            arbiter: Address::repeat_byte(0x11),
            demand: Bytes::from_static(&[0x12, 0x34]),
            hook: Address::repeat_byte(0x22),
            hookData: Bytes::from_static(&[0xab, 0xcd]),
        };

        let encoded = HookBasedModule::encode_hook_escrow(&data);
        let decoded = HookBasedModule::decode_hook_escrow(&encoded).unwrap();

        assert_eq!(decoded.arbiter, data.arbiter);
        assert_eq!(decoded.demand, data.demand);
        assert_eq!(decoded.hook, data.hook);
        assert_eq!(decoded.hookData, data.hookData);
    }
}
