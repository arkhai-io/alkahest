use crate::{
    addresses::BASE_SEPOLIA_ADDRESSES,
    contracts,
    extensions::{AlkahestExtension, ContractModule},
    impl_abi_conversions,
    types::{DecodedAttestation, ProviderContext, SharedWalletProvider},
};

// --- ABI conversions for String obligation types ---
impl_abi_conversions!(contracts::obligations::StringObligation::ObligationData);
use alloy::{
    primitives::{Address, Bytes, FixedBytes, B256},
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
    wallet_provider: SharedWalletProvider,

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
        wallet_provider: SharedWalletProvider,
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
    ) -> eyre::Result<DecodedAttestation<contracts::obligations::StringObligation::ObligationData>> {
        let eas_contract = contracts::IEAS::new(self.addresses.eas, &*self.wallet_provider);

        let attestation = eas_contract.getAttestation(uid).call().await?;
        let obligation_data =
            contracts::obligations::StringObligation::ObligationData::abi_decode(&attestation.data)?;

        Ok(DecodedAttestation {
            attestation,
            data: obligation_data,
        })
    }

    pub fn decode(
        obligation_data: &Bytes,
    ) -> eyre::Result<contracts::obligations::StringObligation::ObligationData> {
        let obligationdata =
            contracts::obligations::StringObligation::ObligationData::abi_decode(obligation_data.as_ref())?;
        Ok(obligationdata)
    }

    pub fn decode_json<T: DeserializeOwned>(obligation_data: &Bytes) -> eyre::Result<T> {
        let decoded: T = serde_json::from_str(&Self::decode(obligation_data)?.item)?;
        Ok(decoded)
    }

    pub fn encode(obligation_data: &contracts::obligations::StringObligation::ObligationData) -> Bytes {
        return contracts::obligations::StringObligation::ObligationData::abi_encode(&obligation_data).into();
    }

    pub fn encode_json<T: serde::Serialize>(obligation_data: T, schema: Option<B256>) -> eyre::Result<Bytes> {
        let encoded = Self::encode(&contracts::obligations::StringObligation::ObligationData {
            item: serde_json::to_string(&obligation_data)?,
            schema: schema.unwrap_or_default(),
        });
        Ok(encoded)
    }

    pub async fn do_obligation(
        &self,
        item: String,
        schema: Option<B256>,
        ref_uid: Option<FixedBytes<32>>,
    ) -> eyre::Result<TransactionReceipt> {
        let contract =
            contracts::obligations::StringObligation::new(self.addresses.obligation, &*self.wallet_provider);

        let obligation_data = contracts::obligations::StringObligation::ObligationData {
            item,
            schema: schema.unwrap_or_default(),
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

    pub async fn do_obligation_json<T: serde::Serialize>(
        &self,
        obligation_data: T,
        schema: Option<B256>,
        ref_uid: Option<FixedBytes<32>>,
    ) -> eyre::Result<TransactionReceipt> {
        let contract =
            contracts::obligations::StringObligation::new(self.addresses.obligation, &*self.wallet_provider);

        let obligation_data = contracts::obligations::StringObligation::ObligationData {
            item: serde_json::to_string(&obligation_data)?,
            schema: schema.unwrap_or_default(),
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

#[cfg(test)]
mod tests {
    use super::*;
    use alloy::primitives::{Bytes, FixedBytes};
    use alloy::sol_types::SolValue as _;

    #[test]
    fn test_encode_decode_roundtrip() {
        let data = contracts::obligations::StringObligation::ObligationData {
            item: "hello world".to_string(),
            schema: FixedBytes::<32>::from([0x44; 32]),
        };

        let encoded = StringObligationModule::encode(&data);
        let decoded = StringObligationModule::decode(&encoded).unwrap();

        assert_eq!(decoded.item, data.item);
        assert_eq!(decoded.schema, data.schema);
    }

    #[test]
    fn test_encode_decode_zero_schema() {
        let data = contracts::obligations::StringObligation::ObligationData {
            item: "test".to_string(),
            schema: FixedBytes::<32>::default(),
        };

        let encoded = StringObligationModule::encode(&data);
        let decoded = StringObligationModule::decode(&encoded).unwrap();

        assert_eq!(decoded.item, "test");
        assert_eq!(decoded.schema, FixedBytes::<32>::default());
    }

    #[test]
    fn test_encode_json_roundtrip() {
        #[derive(serde::Serialize, serde::Deserialize, PartialEq, Debug)]
        struct TestData {
            value: u32,
            name: String,
        }

        let test_data = TestData {
            value: 42,
            name: "test".to_string(),
        };

        let schema = B256::from([0x44; 32]);
        let encoded = StringObligationModule::encode_json(&test_data, Some(schema)).unwrap();
        let decoded: TestData = StringObligationModule::decode_json(&encoded).unwrap();

        assert_eq!(decoded, test_data);
    }

    #[test]
    fn test_deterministic_encoding() {
        let data = contracts::obligations::StringObligation::ObligationData {
            item: "hello".to_string(),
            schema: FixedBytes::<32>::from([0x44; 32]),
        };

        let encoded1 = StringObligationModule::encode(&data);
        let encoded2 = StringObligationModule::encode(&data);
        assert_eq!(encoded1, encoded2);
    }

    #[test]
    fn test_roundtrip_encode_decode_encode() {
        let data = contracts::obligations::StringObligation::ObligationData {
            item: "roundtrip".to_string(),
            schema: FixedBytes::<32>::from([0x44; 32]),
        };

        let encoded1 = StringObligationModule::encode(&data);
        let decoded = StringObligationModule::decode(&encoded1).unwrap();
        let encoded2 = StringObligationModule::encode(&decoded);
        assert_eq!(encoded1, encoded2);
    }
}

impl AlkahestExtension for StringObligationModule {
    type Config = StringObligationAddresses;

    async fn init(
        signer: PrivateKeySigner,
        providers: ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(signer, providers.wallet.clone(), config)
    }
}
