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

type HookEscrowData =
    contracts::obligations::escrow::hook_based::HookEscrowObligation::ObligationData;
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

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HookBasedAddresses {
    pub eas: Address,
    pub hook_escrow_obligation: Address,
    pub hooks_escrow_obligation: Address,
    pub erc20_escrow_hook: Address,
    pub erc721_escrow_hook: Address,
    pub erc1155_escrow_hook: Address,
    pub native_token_escrow_hook: Address,
    pub attestation_escrow_hook: Address,
    pub attestation_reference_escrow_hook: Address,
}

impl Default for HookBasedAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.hook_based_addresses
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum HookBasedContract {
    Eas,
    HookEscrowObligation,
    HooksEscrowObligation,
    Erc20EscrowHook,
    Erc721EscrowHook,
    Erc1155EscrowHook,
    NativeTokenEscrowHook,
    AttestationEscrowHook,
    AttestationReferenceEscrowHook,
}

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

    pub fn encode_hook_escrow(data: &HookEscrowData) -> Bytes {
        data.abi_encode().into()
    }

    pub fn decode_hook_escrow(data: &Bytes) -> eyre::Result<HookEscrowData> {
        Ok(HookEscrowData::abi_decode(data.as_ref())?)
    }

    pub fn encode_hooks_escrow(data: &HooksEscrowData) -> Bytes {
        data.abi_encode().into()
    }

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
