use crate::{
    addresses::BASE_SEPOLIA_ADDRESSES,
    contracts,
    extensions::{AlkahestExtension, ContractModule},
    types::{DecodedAttestation, ProviderContext, WalletProvider},
};
use alloy::providers::Provider;
use alloy::{
    primitives::{Address, Bytes, FixedBytes},
    rpc::types::TransactionReceipt,
    signers::local::PrivateKeySigner,
    sol_types::SolValue as _,
};
use serde::{Deserialize, Serialize, de::DeserializeOwned};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StringObligationAddresses {
    pub eas: Address,
    pub obligation: Address,
}

#[derive(Clone)]
pub struct StringObligationModule {
    _signer: PrivateKeySigner,
    wallet_provider: WalletProvider,

    pub addresses: StringObligationAddresses,
}

impl Default for StringObligationAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.string_obligation_addresses
    }
}

/// Available contracts in the StringObligation module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum StringObligationContract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// String obligation contract
    Obligation,
}

impl ContractModule for StringObligationModule {
    type Contract = StringObligationContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            StringObligationContract::Eas => self.addresses.eas,
            StringObligationContract::Obligation => self.addresses.obligation,
        }
    }
}

impl StringObligationModule {
    /// Creates a new StringObligationModule instance.
    ///
    /// # Arguments
    /// * `private_key` - The private key for signing transactions
    /// * `wallet_provider` - The shared wallet provider to use for sending transactions
    /// * `addresses` - Optional custom contract addresses, uses defaults if None
    ///
    /// # Returns
    /// * `Result<Self>` - The initialized client instance with all sub-clients configured
    pub fn new(
        signer: PrivateKeySigner,
        wallet_provider: WalletProvider,
        addresses: Option<StringObligationAddresses>,
    ) -> eyre::Result<Self> {
        Ok(StringObligationModule {
            _signer: signer,
            wallet_provider,

            addresses: addresses.unwrap_or_default(),
        })
    }

    pub async fn get_obligation(
        &self,
        uid: FixedBytes<32>,
    ) -> eyre::Result<DecodedAttestation<contracts::StringObligation::ObligationData>> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::StringObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub fn decode(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::StringObligation::ObligationData> {
        let obligationdata =
            contracts::StringObligation::ObligationData::abi_decode(obligation_data.as_ref())?;
        Ok(obligationdata)
    }

    pub fn decode_json<T: DeserializeOwned>(obligation_data: &Bytes) -> eyre::Result<T> {
        let decoded: T = serde_json::from_str(&Self::decode(obligation_data)?.item)?;
        Ok(decoded)
    }

    pub fn encode(obligation_data: &contracts::StringObligation::ObligationData) -> Bytes {
        return contracts::StringObligation::ObligationData::abi_encode(&obligation_data).into();
    }

    pub fn encode_json<T: serde::Serialize>(obligation_data: T) -> eyre::Result<Bytes> {
        let encoded = Self::encode(&contracts::StringObligation::ObligationData {
            item: serde_json::to_string(&obligation_data)?,
        });
        Ok(encoded)
    }

    pub async fn do_obligation(
        &self,
        item: String,
        ref_uid: Option<FixedBytes<32>>,
    ) -> eyre::Result<TransactionReceipt> {
        let contract =
            contracts::StringObligation::new(self.addresses.obligation, &self.wallet_provider);

        let obligation_data = contracts::StringObligation::ObligationData { item };

        let address = self._signer.address();
        let nonce = self.wallet_provider.get_transaction_count(address).await?;

        let receipt = contract
            .doObligation(
                obligation_data,
                ref_uid.unwrap_or(FixedBytes::<32>::default()),
            )
            .nonce(nonce)
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }

    pub async fn do_obligation_json<T: serde::Serialize>(
        &self,
        obligation_data: T,
        ref_uid: Option<FixedBytes<32>>,
    ) -> eyre::Result<TransactionReceipt> {
        let contract =
            contracts::StringObligation::new(self.addresses.obligation, &self.wallet_provider);

        let obligation_data = contracts::StringObligation::ObligationData {
            item: serde_json::to_string(&obligation_data)?,
        };
        let receipt = contract
            .doObligation(
                obligation_data,
                ref_uid.unwrap_or(FixedBytes::<32>::default()),
            )
            .send()
            .await?
            .get_receipt()
            .await?;

        Ok(receipt)
    }
}

impl AlkahestExtension for StringObligationModule {
    type Config = StringObligationAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, (*providers.wallet).clone(), config)
    }
}
