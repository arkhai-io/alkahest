use alloy::{
    dyn_abi::SolType,
    primitives::{Address, FixedBytes, Log},
    providers::Provider,
    rpc::types::{Filter, TransactionReceipt},
    signers::local::PrivateKeySigner,
    sol_types::SolEvent,
};
use extensions::{
    AlkahestExtension, BaseExtensions, HasArbiters, HasAttestation, HasErc20, HasErc721,
    HasErc1155, HasStringObligation, HasTokenBundle,
};
use futures_util::StreamExt;
use serde::{Deserialize, Serialize};
use sol_types::EscrowClaimed;
use std::sync::Arc;
use types::{SharedPublicProvider, SharedWalletProvider};

use crate::clients::{
    arbiters::ArbitersAddresses, attestation::AttestationAddresses, erc20::Erc20Addresses,
    erc721::Erc721Addresses, erc1155::Erc1155Addresses, native_token::NativeTokenAddresses,
    string_obligation::StringObligationAddresses, token_bundle::TokenBundleAddresses,
};

/// Type alias for the default AlkahestClient with BaseExtensions
pub type DefaultAlkahestClient = AlkahestClient<BaseExtensions>;

pub mod addresses;
pub mod clients;
pub mod contracts;
pub mod extensions;
pub mod fixtures;

pub mod sol_types;
pub mod types;
pub mod utils;

// Re-export contract types from client modules
pub use clients::arbiters::ArbitersContract;
pub use clients::attestation::AttestationContract;
pub use clients::erc20::Erc20Contract;
pub use clients::erc721::Erc721Contract;
pub use clients::erc1155::Erc1155Contract;
pub use clients::native_token::NativeTokenContract;
pub use clients::string_obligation::StringObligationContract;
pub use clients::token_bundle::TokenBundleContract;
pub use extensions::ContractModule;

/// Configuration struct containing all contract addresses for Alkahest protocol extensions.
///
/// This struct holds the addresses for all the smart contracts used by different
/// protocol modules. Each field represents a different module's addresses.
///
/// # Default Behavior
///
/// When using `Default::default()` or passing `None` to client constructors,
/// the Base Sepolia network addresses are used by default.
///
/// # Example
///
/// ```rust,ignore
/// use alkahest_rs::{DefaultExtensionConfig, addresses::BASE_SEPOLIA_ADDRESSES};
///
/// // Use default (Base Sepolia) configuration
/// let default_config = DefaultExtensionConfig::default();
///
/// // Use a predefined configuration
/// let base_config = BASE_SEPOLIA_ADDRESSES;
///
/// // Create a custom configuration
/// let custom_config = DefaultExtensionConfig {
///     arbiters_addresses: my_custom_arbiters,
///     erc20_addresses: my_custom_erc20,
///     // ... other fields
///     ..BASE_SEPOLIA_ADDRESSES
/// };
/// ```
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DefaultExtensionConfig {
    /// Addresses for arbiter contracts that handle obligation verification
    pub arbiters_addresses: ArbitersAddresses,
    /// Addresses for ERC20-related contracts
    pub erc20_addresses: Erc20Addresses,
    /// Addresses for ERC721-related contracts
    pub erc721_addresses: Erc721Addresses,
    /// Addresses for ERC1155-related contracts
    pub erc1155_addresses: Erc1155Addresses,
    /// Addresses for native token contracts
    pub native_token_addresses: NativeTokenAddresses,
    /// Addresses for token bundle contracts that handle multiple token types
    pub token_bundle_addresses: TokenBundleAddresses,
    /// Addresses for attestation-related contracts
    pub attestation_addresses: AttestationAddresses,
    /// Addresses for string obligation contracts
    pub string_obligation_addresses: StringObligationAddresses,
}

impl Default for DefaultExtensionConfig {
    /// Returns the default configuration using Base Sepolia network addresses.
    ///
    /// This is equivalent to using `BASE_SEPOLIA_ADDRESSES` directly.
    fn default() -> Self {
        // Use Base Sepolia as the default network
        crate::addresses::BASE_SEPOLIA_ADDRESSES
    }
}

#[derive(Clone)]
pub struct AlkahestClient<Extensions: AlkahestExtension = extensions::NoExtension> {
    pub wallet_provider: SharedWalletProvider,
    pub public_provider: SharedPublicProvider,
    pub address: Address,
    pub extensions: Extensions,
    private_key: PrivateKeySigner,
    rpc_url: String,
}

impl AlkahestClient<extensions::NoExtension> {
    /// Create a new client with no extensions
    pub async fn new(
        private_key: PrivateKeySigner,
        rpc_url: impl ToString + Clone + Send,
    ) -> eyre::Result<Self> {
        let wallet_provider =
            Arc::new(utils::get_wallet_provider(private_key.clone(), rpc_url.clone()).await?);
        let public_provider = Arc::new(utils::get_public_provider(rpc_url.clone()).await?);

        Ok(AlkahestClient {
            wallet_provider,
            public_provider,
            address: private_key.address(),
            extensions: extensions::NoExtension,
            private_key,
            rpc_url: rpc_url.to_string(),
        })
    }
}

impl AlkahestClient<BaseExtensions> {
    /// Create a client with all base extensions using DefaultExtensionConfig
    /// This is a convenience method for the common case
    pub async fn with_base_extensions(
        private_key: PrivateKeySigner,
        rpc_url: impl ToString + Clone + Send,
        config: Option<DefaultExtensionConfig>,
    ) -> eyre::Result<Self> {
        let wallet_provider =
            Arc::new(utils::get_wallet_provider(private_key.clone(), rpc_url.clone()).await?);
        let public_provider = Arc::new(utils::get_public_provider(rpc_url.clone()).await?);

        let providers = crate::types::ProviderContext {
            wallet: wallet_provider.clone(),
            public: public_provider.clone(),
            signer: private_key.clone(),
        };
        let extensions = BaseExtensions::init(private_key.clone(), providers, config).await?;

        Ok(AlkahestClient {
            wallet_provider,
            public_provider,
            address: private_key.address(),
            extensions,
            private_key,
            rpc_url: rpc_url.to_string(),
        })
    }
}

impl<Extensions: AlkahestExtension> AlkahestClient<Extensions> {
    /// Add an extension with a specific configuration
    pub async fn extend<NewExt: AlkahestExtension>(
        self,
        config: Option<NewExt::Config>,
    ) -> eyre::Result<AlkahestClient<extensions::JoinExtension<Extensions, NewExt>>> {
        let providers = crate::types::ProviderContext {
            wallet: self.wallet_provider.clone(),
            public: self.public_provider.clone(),
            signer: self.private_key.clone(),
        };
        let new_extension = NewExt::init(self.private_key.clone(), providers, config).await?;

        let joined_extensions = extensions::JoinExtension {
            left: self.extensions,
            right: new_extension,
        };

        Ok(AlkahestClient {
            wallet_provider: self.wallet_provider,
            public_provider: self.public_provider,
            address: self.address,
            extensions: joined_extensions,
            private_key: self.private_key,
            rpc_url: self.rpc_url,
        })
    }

    /// Add an extension using its default configuration
    pub async fn extend_default<NewExt: AlkahestExtension>(
        self,
    ) -> eyre::Result<AlkahestClient<extensions::JoinExtension<Extensions, NewExt>>>
    where
        NewExt::Config: Default,
    {
        self.extend::<NewExt>(Some(NewExt::Config::default())).await
    }

    /// Get the address of a specific ERC20 contract
    ///
    /// # Example
    /// ```rust,ignore
    /// use alkahest_rs::Erc20Contract;
    ///
    /// let escrow_addr = client.erc20_address(Erc20Contract::EscrowObligation);
    /// ```
    pub fn erc20_address(&self, contract: Erc20Contract) -> Address
    where
        Extensions: extensions::HasErc20,
    {
        match contract {
            Erc20Contract::Eas => self.erc20().addresses.eas,
            Erc20Contract::BarterUtils => self.erc20().addresses.barter_utils,
            Erc20Contract::EscrowObligation => self.erc20().addresses.escrow_obligation,
            Erc20Contract::PaymentObligation => self.erc20().addresses.payment_obligation,
        }
    }

    /// Get the address of a specific ERC721 contract
    pub fn erc721_address(&self, contract: Erc721Contract) -> Address
    where
        Extensions: extensions::HasErc721,
    {
        match contract {
            Erc721Contract::Eas => self.erc721().addresses.eas,
            Erc721Contract::BarterUtils => self.erc721().addresses.barter_utils,
            Erc721Contract::EscrowObligation => self.erc721().addresses.escrow_obligation,
            Erc721Contract::PaymentObligation => self.erc721().addresses.payment_obligation,
        }
    }

    /// Get the address of a specific ERC1155 contract
    pub fn erc1155_address(&self, contract: Erc1155Contract) -> Address
    where
        Extensions: extensions::HasErc1155,
    {
        match contract {
            Erc1155Contract::Eas => self.erc1155().addresses.eas,
            Erc1155Contract::BarterUtils => self.erc1155().addresses.barter_utils,
            Erc1155Contract::EscrowObligation => self.erc1155().addresses.escrow_obligation,
            Erc1155Contract::PaymentObligation => self.erc1155().addresses.payment_obligation,
        }
    }

    /// Get the address of a specific TokenBundle contract
    pub fn token_bundle_address(&self, contract: TokenBundleContract) -> Address
    where
        Extensions: extensions::HasTokenBundle,
    {
        match contract {
            TokenBundleContract::Eas => self.token_bundle().addresses.eas,
            TokenBundleContract::BarterUtils => self.token_bundle().addresses.barter_utils,
            TokenBundleContract::EscrowObligation => {
                self.token_bundle().addresses.escrow_obligation
            }
            TokenBundleContract::PaymentObligation => {
                self.token_bundle().addresses.payment_obligation
            }
        }
    }

    /// Get the address of a specific Attestation contract
    pub fn attestation_address(&self, contract: AttestationContract) -> Address
    where
        Extensions: extensions::HasAttestation,
    {
        match contract {
            AttestationContract::Eas => self.attestation().addresses.eas,
            AttestationContract::EasSchemaRegistry => {
                self.attestation().addresses.eas_schema_registry
            }
            AttestationContract::BarterUtils => self.attestation().addresses.barter_utils,
            AttestationContract::EscrowObligation => self.attestation().addresses.escrow_obligation,
            AttestationContract::EscrowObligation2 => {
                self.attestation().addresses.escrow_obligation_2
            }
        }
    }

    /// Get the address of a specific StringObligation contract
    pub fn string_obligation_address(&self, contract: StringObligationContract) -> Address
    where
        Extensions: extensions::HasStringObligation,
    {
        match contract {
            StringObligationContract::Eas => self.string_obligation().addresses.eas,
            StringObligationContract::Obligation => self.string_obligation().addresses.obligation,
        }
    }

    /// Get the address of a specific Arbiters contract
    pub fn arbiters_address(&self, contract: ArbitersContract) -> Address
    where
        Extensions: extensions::HasArbiters,
    {
        match contract {
            ArbitersContract::Eas => self.arbiters().addresses.eas,
            ArbitersContract::SpecificAttestationArbiter => {
                self.arbiters().addresses.specific_attestation_arbiter
            }
            ArbitersContract::TrustedPartyArbiter => {
                self.arbiters().addresses.trusted_party_arbiter
            }
            ArbitersContract::TrivialArbiter => self.arbiters().addresses.trivial_arbiter,
            ArbitersContract::TrustedOracleArbiter => {
                self.arbiters().addresses.trusted_oracle_arbiter
            }
        }
    }

    /// Extracts an Attested event from a transaction receipt.
    ///
    /// # Arguments
    /// * `receipt` - The transaction receipt to extract the event from
    ///
    /// # Returns
    /// * `Result<Log<Attested>>` - The decoded Attested event log
    pub fn get_attested_event(
        receipt: TransactionReceipt,
    ) -> eyre::Result<Log<contracts::IEAS::Attested>> {
        let attested_event = receipt
            .inner
            .logs()
            .iter()
            .filter(|log| log.topic0() == Some(&contracts::IEAS::Attested::SIGNATURE_HASH))
            .collect::<Vec<_>>()
            .first()
            .map(|log| log.log_decode::<contracts::IEAS::Attested>())
            .ok_or_else(|| eyre::eyre!("No Attested event found"))??;

        Ok(attested_event.inner)
    }

    /// Waits for a fulfillment event for a specific escrow arrangement.
    ///
    /// This function will:
    /// 1. Check for existing fulfillment events from the specified block
    /// 2. If none found, subscribe to new events and wait for fulfillment
    ///
    /// # Arguments
    /// * `contract_address` - The address of the contract to monitor
    /// * `buy_attestation` - The attestation UID of the buy order
    /// * `from_block` - Optional block number to start searching from
    ///
    /// # Returns
    /// * `Result<Log<EscrowClaimed>>` - The fulfillment event log when found
    pub async fn wait_for_fulfillment(
        &self,
        contract_address: Address,
        buy_attestation: FixedBytes<32>,
        from_block: Option<u64>,
    ) -> eyre::Result<Log<EscrowClaimed>> {
        let filter = Filter::new()
            .from_block(from_block.unwrap_or(0))
            .address(contract_address)
            .event_signature(EscrowClaimed::SIGNATURE_HASH)
            .topic1(buy_attestation);

        let logs = self.public_provider.get_logs(&filter).await?;
        println!("initial logs: {:?}", logs);
        if let Some(log) = logs
            .iter()
            .collect::<Vec<_>>()
            .first()
            .map(|log| log.log_decode::<EscrowClaimed>())
        {
            return Ok(log?.inner);
        }

        let sub = self.public_provider.subscribe_logs(&filter).await?;
        let mut stream = sub.into_stream();

        if let Some(log) = stream.next().await {
            let log = log.log_decode::<EscrowClaimed>()?;
            return Ok(log.inner);
        }

        Err(eyre::eyre!("No EscrowClaimed event found"))
    }

    /// Extract obligation data from a fulfillment attestation
    ///
    /// # Example
    /// ```rust,ignore
    /// use alkahest_rs::contracts::StringObligation;
    ///
    /// let obligation = client.extract_obligation_data::<StringObligation::ObligationData>(&attestation)?;
    /// ```
    pub fn extract_obligation_data<ObligationData: SolType>(
        &self,
        attestation: &contracts::IEAS::Attestation,
    ) -> eyre::Result<ObligationData::RustType> {
        ObligationData::abi_decode(&attestation.data).map_err(Into::into)
    }

    /// Get the escrow attestation that this fulfillment references via refUID
    ///
    /// # Example
    /// ```rust,ignore
    /// let escrow_attestation = client.get_escrow_attestation(&fulfillment_attestation).await?;
    /// ```
    pub async fn get_escrow_attestation(
        &self,
        fulfillment: &contracts::IEAS::Attestation,
    ) -> eyre::Result<contracts::IEAS::Attestation>
    where
        Extensions: extensions::HasAttestation,
    {
        let eas = contracts::IEAS::new(self.attestation().addresses.eas, &self.wallet_provider);
        let escrow = eas.getAttestation(fulfillment.refUID).call().await?;
        Ok(escrow)
    }

    /// Extract demand data from an escrow attestation
    ///
    /// # Example
    /// ```rust,ignore
    /// use alkahest_rs::clients::arbiters::TrustedOracleArbiter;
    ///
    /// let demand = client.extract_demand_data::<TrustedOracleArbiter::DemandData>(&escrow_attestation)?;
    /// ```
    pub fn extract_demand_data<DemandData: SolType>(
        &self,
        escrow_attestation: &contracts::IEAS::Attestation,
    ) -> eyre::Result<DemandData::RustType> {
        use alloy::sol;
        sol! {
            struct ArbiterDemand {
                address oracle;
                bytes demand;
            }
        }
        let arbiter_demand = ArbiterDemand::abi_decode(&escrow_attestation.data)?;
        DemandData::abi_decode(&arbiter_demand.demand).map_err(Into::into)
    }

    /// Get escrow attestation and extract demand data in one call
    ///
    /// # Example
    /// ```rust,ignore
    /// use alkahest_rs::clients::arbiters::TrustedOracleArbiter;
    ///
    /// let (escrow, demand) = client.get_escrow_and_demand::<TrustedOracleArbiter::DemandData>(&fulfillment).await?;
    /// ```
    pub async fn get_escrow_and_demand<DemandData: SolType>(
        &self,
        fulfillment: &contracts::IEAS::Attestation,
    ) -> eyre::Result<(contracts::IEAS::Attestation, DemandData::RustType)>
    where
        Extensions: extensions::HasAttestation,
    {
        let escrow = self.get_escrow_attestation(fulfillment).await?;
        let demand = self.extract_demand_data::<DemandData>(&escrow)?;
        Ok((escrow, demand))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::addresses::{BASE_SEPOLIA_ADDRESSES, FILECOIN_CALIBRATION_ADDRESSES};

    #[test]
    fn test_default_extension_config_uses_base_sepolia() {
        let default_config = DefaultExtensionConfig::default();

        // Verify that default configuration matches BASE_SEPOLIA_ADDRESSES
        assert_eq!(
            default_config.arbiters_addresses.eas,
            BASE_SEPOLIA_ADDRESSES.arbiters_addresses.eas
        );
        assert_eq!(
            default_config.erc20_addresses.barter_utils,
            BASE_SEPOLIA_ADDRESSES.erc20_addresses.barter_utils
        );
        assert_eq!(
            default_config.attestation_addresses.eas,
            BASE_SEPOLIA_ADDRESSES.attestation_addresses.eas
        );
    }

    #[test]
    fn test_config_clone() {
        let config = DefaultExtensionConfig::default();
        let cloned = config.clone();

        assert_eq!(config.arbiters_addresses.eas, cloned.arbiters_addresses.eas);
        assert_eq!(
            config.erc20_addresses.barter_utils,
            cloned.erc20_addresses.barter_utils
        );
    }

    #[test]
    fn test_custom_config_with_struct_update_syntax() {
        let custom_config = DefaultExtensionConfig {
            arbiters_addresses: FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses,
            ..BASE_SEPOLIA_ADDRESSES
        };

        // Verify arbiter addresses are from Filecoin
        assert_eq!(
            custom_config.arbiters_addresses.eas,
            FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.eas
        );

        // Verify other addresses are still from Base Sepolia
        assert_eq!(
            custom_config.erc20_addresses.eas,
            BASE_SEPOLIA_ADDRESSES.erc20_addresses.eas
        );
    }

    #[test]
    fn test_all_address_fields_populated() {
        let config = DefaultExtensionConfig::default();

        // Test that no address is zero (all fields should be populated)
        assert_ne!(config.arbiters_addresses.eas, Address::ZERO);
        assert_ne!(config.erc20_addresses.eas, Address::ZERO);
        assert_ne!(config.erc721_addresses.eas, Address::ZERO);
        assert_ne!(config.erc1155_addresses.eas, Address::ZERO);
        assert_ne!(config.token_bundle_addresses.eas, Address::ZERO);
        assert_ne!(config.attestation_addresses.eas, Address::ZERO);

        // Test specific contract addresses
        assert_ne!(config.erc20_addresses.barter_utils, Address::ZERO);
        assert_ne!(config.erc20_addresses.escrow_obligation, Address::ZERO);
        assert_ne!(config.erc20_addresses.payment_obligation, Address::ZERO);
    }

    #[test]
    fn test_serialize_deserialize_default_extension_config() {
        let original_config = DefaultExtensionConfig::default();

        // Serialize to JSON
        let json = serde_json::to_string(&original_config).expect("Failed to serialize");

        // Deserialize from JSON
        let deserialized_config: DefaultExtensionConfig =
            serde_json::from_str(&json).expect("Failed to deserialize");

        // Verify all fields match
        assert_eq!(
            original_config.arbiters_addresses.eas,
            deserialized_config.arbiters_addresses.eas
        );
        assert_eq!(
            original_config.arbiters_addresses.trusted_party_arbiter,
            deserialized_config.arbiters_addresses.trusted_party_arbiter
        );
        assert_eq!(
            original_config.erc20_addresses.eas,
            deserialized_config.erc20_addresses.eas
        );
        assert_eq!(
            original_config.erc20_addresses.barter_utils,
            deserialized_config.erc20_addresses.barter_utils
        );
        assert_eq!(
            original_config.erc721_addresses.eas,
            deserialized_config.erc721_addresses.eas
        );
        assert_eq!(
            original_config.erc1155_addresses.eas,
            deserialized_config.erc1155_addresses.eas
        );
        assert_eq!(
            original_config.token_bundle_addresses.eas,
            deserialized_config.token_bundle_addresses.eas
        );
        assert_eq!(
            original_config.attestation_addresses.eas,
            deserialized_config.attestation_addresses.eas
        );
        assert_eq!(
            original_config.string_obligation_addresses.eas,
            deserialized_config.string_obligation_addresses.eas
        );
    }

    #[test]
    fn test_serialize_custom_config() {
        // Create a custom config mixing addresses from different networks
        let custom_config = DefaultExtensionConfig {
            arbiters_addresses: FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses,
            erc20_addresses: BASE_SEPOLIA_ADDRESSES.erc20_addresses,
            ..FILECOIN_CALIBRATION_ADDRESSES
        };

        // Serialize to JSON
        let json = serde_json::to_string(&custom_config).expect("Failed to serialize");

        // Deserialize from JSON
        let deserialized_config: DefaultExtensionConfig =
            serde_json::from_str(&json).expect("Failed to deserialize");

        // Verify mixed addresses are preserved
        assert_eq!(
            custom_config.arbiters_addresses.eas,
            deserialized_config.arbiters_addresses.eas
        );
        assert_eq!(
            FILECOIN_CALIBRATION_ADDRESSES.arbiters_addresses.eas,
            deserialized_config.arbiters_addresses.eas
        );
        assert_eq!(
            custom_config.erc20_addresses.eas,
            deserialized_config.erc20_addresses.eas
        );
        assert_eq!(
            BASE_SEPOLIA_ADDRESSES.erc20_addresses.eas,
            deserialized_config.erc20_addresses.eas
        );
    }

    #[test]
    fn test_json_roundtrip_preserves_all_fields() {
        let config = BASE_SEPOLIA_ADDRESSES;

        // Convert to JSON and back
        let json = serde_json::to_value(&config).expect("Failed to serialize to value");
        let roundtrip_config: DefaultExtensionConfig =
            serde_json::from_value(json).expect("Failed to deserialize from value");

        // Comprehensive field checks
        // Arbiters addresses
        assert_eq!(
            config.arbiters_addresses.eas,
            roundtrip_config.arbiters_addresses.eas
        );
        assert_eq!(
            config.arbiters_addresses.trusted_party_arbiter,
            roundtrip_config.arbiters_addresses.trusted_party_arbiter
        );
        assert_eq!(
            config.arbiters_addresses.trivial_arbiter,
            roundtrip_config.arbiters_addresses.trivial_arbiter
        );

        // ERC20 addresses
        assert_eq!(
            config.erc20_addresses.eas,
            roundtrip_config.erc20_addresses.eas
        );
        assert_eq!(
            config.erc20_addresses.barter_utils,
            roundtrip_config.erc20_addresses.barter_utils
        );
        assert_eq!(
            config.erc20_addresses.escrow_obligation,
            roundtrip_config.erc20_addresses.escrow_obligation
        );
        assert_eq!(
            config.erc20_addresses.payment_obligation,
            roundtrip_config.erc20_addresses.payment_obligation
        );

        // ERC721 addresses
        assert_eq!(
            config.erc721_addresses.eas,
            roundtrip_config.erc721_addresses.eas
        );
        assert_eq!(
            config.erc721_addresses.barter_utils,
            roundtrip_config.erc721_addresses.barter_utils
        );

        // ERC1155 addresses
        assert_eq!(
            config.erc1155_addresses.eas,
            roundtrip_config.erc1155_addresses.eas
        );
        assert_eq!(
            config.erc1155_addresses.barter_utils,
            roundtrip_config.erc1155_addresses.barter_utils
        );

        // Token bundle addresses
        assert_eq!(
            config.token_bundle_addresses.eas,
            roundtrip_config.token_bundle_addresses.eas
        );
        assert_eq!(
            config.token_bundle_addresses.barter_utils,
            roundtrip_config.token_bundle_addresses.barter_utils
        );

        // Attestation addresses
        assert_eq!(
            config.attestation_addresses.eas,
            roundtrip_config.attestation_addresses.eas
        );
        assert_eq!(
            config.attestation_addresses.eas_schema_registry,
            roundtrip_config.attestation_addresses.eas_schema_registry
        );

        // String obligation addresses
        assert_eq!(
            config.string_obligation_addresses.eas,
            roundtrip_config.string_obligation_addresses.eas
        );
        assert_eq!(
            config.string_obligation_addresses.obligation,
            roundtrip_config.string_obligation_addresses.obligation
        );
    }
}
