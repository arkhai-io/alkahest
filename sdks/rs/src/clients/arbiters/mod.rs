use crate::{
    addresses::BASE_SEPOLIA_ADDRESSES,
    contracts,
    extensions::{AlkahestExtension, ContractModule},
    impl_abi_conversions,
    impl_from_attestation,
    types::{SharedPublicProvider, SharedWalletProvider},
};

// Implement ABI conversions for core arbiter DemandData types
impl_abi_conversions!(contracts::arbiters::TrustedOracleArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::IntrinsicsArbiter2::DemandData);
impl_abi_conversions!(contracts::arbiters::ERC8004Arbiter::DemandData);

// Implement From<IEAS::Attestation> for core arbiter Attestation types
impl_from_attestation!(contracts::arbiters::TrivialArbiter::Attestation);
impl_from_attestation!(contracts::arbiters::TrustedOracleArbiter::Attestation);
impl_from_attestation!(contracts::arbiters::IntrinsicsArbiter::Attestation);
impl_from_attestation!(contracts::arbiters::IntrinsicsArbiter2::Attestation);
use alloy::{
    primitives::Address,
    signers::local::PrivateKeySigner,
};
use serde::{Deserialize, Serialize};

mod attestation_properties;
mod confirmation;
mod logical;
mod trusted_oracle;

// Re-export confirmation types
pub use confirmation::ConfirmationArbiterType;

// Re-export logical APIs
pub use logical::{
    AllArbiter, AnyArbiter, DecodedAllArbiterDemandData, DecodedAnyArbiterDemandData, Logical,
};

// Re-export trusted oracle module (with backwards-compatible aliases)
pub use trusted_oracle::{
    ArbitrateManyResult, ArbitrationMode, AttestationWithDemand, Decision, OracleAddresses,
    OracleModule, TrustedOracle, TrustedOracleAddresses, TrustedOracleModule,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ArbitersAddresses {
    pub eas: Address,
    pub trivial_arbiter: Address,
    pub trusted_oracle_arbiter: Address,
    pub intrinsics_arbiter: Address,
    pub intrinsics_arbiter_2: Address,
    pub erc8004_arbiter: Address,
    // Logical arbiters
    pub any_arbiter: Address,
    pub all_arbiter: Address,
    // Attestation property arbiters (non-composing only - composing arbiters removed)
    pub attester_arbiter: Address,
    pub expiration_time_after_arbiter: Address,
    pub expiration_time_before_arbiter: Address,
    pub expiration_time_equal_arbiter: Address,
    pub recipient_arbiter: Address,
    pub ref_uid_arbiter: Address,
    pub revocable_arbiter: Address,
    pub schema_arbiter: Address,
    pub time_after_arbiter: Address,
    pub time_before_arbiter: Address,
    pub time_equal_arbiter: Address,
    pub uid_arbiter: Address,
    // Confirmation arbiters (new naming convention)
    pub exclusive_revocable_confirmation_arbiter: Address,
    pub exclusive_unrevocable_confirmation_arbiter: Address,
    pub nonexclusive_revocable_confirmation_arbiter: Address,
    pub nonexclusive_unrevocable_confirmation_arbiter: Address,
}

#[derive(Clone)]
pub struct ArbitersModule {
    signer: PrivateKeySigner,
    pub(crate) public_provider: SharedPublicProvider,
    pub(crate) wallet_provider: SharedWalletProvider,

    pub addresses: ArbitersAddresses,
}

impl Default for ArbitersAddresses {
    fn default() -> Self {
        BASE_SEPOLIA_ADDRESSES.arbiters_addresses
    }
}

/// Available contracts in the Arbiters module
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ArbitersContract {
    /// EAS (Ethereum Attestation Service) contract
    Eas,
    /// Trivial arbiter (always accepts)
    TrivialArbiter,
    /// Trusted oracle arbiter
    TrustedOracleArbiter,
    /// Intrinsics arbiter
    IntrinsicsArbiter,
    /// Intrinsics arbiter v2
    IntrinsicsArbiter2,
    /// ERC8004 arbiter
    ERC8004Arbiter,
    /// Any arbiter (logical OR)
    AnyArbiter,
    /// All arbiter (logical AND)
    AllArbiter,
    /// Recipient arbiter (checks recipient address)
    RecipientArbiter,
    /// UID arbiter (checks specific attestation UID)
    UidArbiter,
}

impl ContractModule for ArbitersModule {
    type Contract = ArbitersContract;

    fn address(&self, contract: Self::Contract) -> Address {
        match contract {
            ArbitersContract::Eas => self.addresses.eas,
            ArbitersContract::TrivialArbiter => self.addresses.trivial_arbiter,
            ArbitersContract::TrustedOracleArbiter => self.addresses.trusted_oracle_arbiter,
            ArbitersContract::IntrinsicsArbiter => self.addresses.intrinsics_arbiter,
            ArbitersContract::IntrinsicsArbiter2 => self.addresses.intrinsics_arbiter_2,
            ArbitersContract::ERC8004Arbiter => self.addresses.erc8004_arbiter,
            ArbitersContract::AnyArbiter => self.addresses.any_arbiter,
            ArbitersContract::AllArbiter => self.addresses.all_arbiter,
            ArbitersContract::RecipientArbiter => self.addresses.recipient_arbiter,
            ArbitersContract::UidArbiter => self.addresses.uid_arbiter,
        }
    }
}

impl AlkahestExtension for ArbitersModule {
    type Config = ArbitersAddresses;

    async fn init(
        _signer: alloy::signers::local::PrivateKeySigner,
        providers: crate::types::ProviderContext,
        config: Option<Self::Config>,
    ) -> eyre::Result<Self> {
        Self::new(
            _signer,
            providers.public.clone(),
            providers.wallet.clone(),
            config,
        )
    }
}

impl ArbitersModule {
    pub fn new(
        signer: PrivateKeySigner,
        public_provider: SharedPublicProvider,
        wallet_provider: SharedWalletProvider,
        addresses: Option<ArbitersAddresses>,
    ) -> eyre::Result<Self> {
        Ok(ArbitersModule {
            signer,
            public_provider,
            wallet_provider,
            addresses: addresses.unwrap_or_default(),
        })
    }

    /// Access trusted oracle arbiter API for arbitration functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let receipt = arbiters_module.trusted_oracle().arbitrate(obligation, demand, true).await?;
    /// let event = arbiters_module.trusted_oracle().wait_for_arbitration(oracle, obligation, None).await?;
    /// ```
    pub fn trusted_oracle(&self) -> trusted_oracle::TrustedOracle<'_> {
        trusted_oracle::TrustedOracle::new(self)
    }
}

/// Decoded demand data from AllArbiter sub-demands
#[derive(Debug, Clone)]
pub enum DecodedDemand {
    // Core arbiters (no demand data)
    TrivialArbiter,
    IntrinsicsArbiter,

    // Core arbiters (with demand data)
    TrustedOracle(contracts::arbiters::TrustedOracleArbiter::DemandData),
    IntrinsicsArbiter2(contracts::arbiters::IntrinsicsArbiter2::DemandData),
    ERC8004Arbiter(contracts::arbiters::ERC8004Arbiter::DemandData),

    // Logical arbiters
    AnyArbiter(DecodedAnyArbiterDemandData),
    AllArbiter(DecodedAllArbiterDemandData),

    // Attestation property arbiters (non-composing only)
    AttesterArbiter(contracts::arbiters::attestation_properties::AttesterArbiter::DemandData),
    ExpirationTimeAfterArbiter(contracts::arbiters::attestation_properties::ExpirationTimeAfterArbiter::DemandData),
    ExpirationTimeBeforeArbiter(contracts::arbiters::attestation_properties::ExpirationTimeBeforeArbiter::DemandData),
    ExpirationTimeEqualArbiter(contracts::arbiters::attestation_properties::ExpirationTimeEqualArbiter::DemandData),
    RecipientArbiter(contracts::arbiters::attestation_properties::RecipientArbiter::DemandData),
    RefUidArbiter(contracts::arbiters::attestation_properties::RefUidArbiter::DemandData),
    RevocableArbiter(contracts::arbiters::attestation_properties::RevocableArbiter::DemandData),
    SchemaArbiter(contracts::arbiters::attestation_properties::SchemaArbiter::DemandData),
    TimeAfterArbiter(contracts::arbiters::attestation_properties::TimeAfterArbiter::DemandData),
    TimeBeforeArbiter(contracts::arbiters::attestation_properties::TimeBeforeArbiter::DemandData),
    TimeEqualArbiter(contracts::arbiters::attestation_properties::TimeEqualArbiter::DemandData),
    UidArbiter(contracts::arbiters::attestation_properties::UidArbiter::DemandData),

    // Unknown arbiter
    Unknown {
        arbiter: Address,
        raw_data: alloy::primitives::Bytes,
    },
}

impl ArbitersModule {
    /// Generic function to decode a single arbiter demand based on its address
    pub fn decode_arbiter_demand(
        &self,
        arbiter_addr: Address,
        demand_bytes: &alloy::primitives::Bytes,
    ) -> eyre::Result<DecodedDemand> {
        let addresses = &self.addresses;

        let decoded = if arbiter_addr == addresses.trivial_arbiter {
            DecodedDemand::TrivialArbiter
        } else if arbiter_addr == addresses.intrinsics_arbiter {
            DecodedDemand::IntrinsicsArbiter

        // Core arbiters with demand data
        } else if arbiter_addr == addresses.trusted_oracle_arbiter {
            let demand: contracts::arbiters::TrustedOracleArbiter::DemandData =
                demand_bytes.try_into()?;
            DecodedDemand::TrustedOracle(demand)
        } else if arbiter_addr == addresses.intrinsics_arbiter_2 {
            let demand: contracts::arbiters::IntrinsicsArbiter2::DemandData =
                demand_bytes.try_into()?;
            DecodedDemand::IntrinsicsArbiter2(demand)
        } else if arbiter_addr == addresses.erc8004_arbiter {
            let demand: contracts::arbiters::ERC8004Arbiter::DemandData =
                demand_bytes.try_into()?;
            DecodedDemand::ERC8004Arbiter(demand)

        // Logical arbiters
        } else if arbiter_addr == addresses.any_arbiter {
            let demand: contracts::arbiters::logical::AnyArbiter::DemandData =
                demand_bytes.try_into()?;
            DecodedDemand::AnyArbiter(self.decode_any_arbiter_demands(demand)?)
        } else if arbiter_addr == addresses.all_arbiter {
            let demand: contracts::arbiters::logical::AllArbiter::DemandData =
                demand_bytes.try_into()?;
            DecodedDemand::AllArbiter(self.decode_all_arbiter_demands(demand)?)

        // Attestation property arbiters (non-composing)
        } else if arbiter_addr == addresses.attester_arbiter {
            let demand: contracts::arbiters::attestation_properties::AttesterArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::AttesterArbiter(demand)
        } else if arbiter_addr == addresses.expiration_time_after_arbiter {
            let demand: contracts::arbiters::attestation_properties::ExpirationTimeAfterArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::ExpirationTimeAfterArbiter(demand)
        } else if arbiter_addr == addresses.expiration_time_before_arbiter {
            let demand: contracts::arbiters::attestation_properties::ExpirationTimeBeforeArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::ExpirationTimeBeforeArbiter(demand)
        } else if arbiter_addr == addresses.expiration_time_equal_arbiter {
            let demand: contracts::arbiters::attestation_properties::ExpirationTimeEqualArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::ExpirationTimeEqualArbiter(demand)
        } else if arbiter_addr == addresses.recipient_arbiter {
            let demand: contracts::arbiters::attestation_properties::RecipientArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::RecipientArbiter(demand)
        } else if arbiter_addr == addresses.ref_uid_arbiter {
            let demand: contracts::arbiters::attestation_properties::RefUidArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::RefUidArbiter(demand)
        } else if arbiter_addr == addresses.revocable_arbiter {
            let demand: contracts::arbiters::attestation_properties::RevocableArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::RevocableArbiter(demand)
        } else if arbiter_addr == addresses.schema_arbiter {
            let demand: contracts::arbiters::attestation_properties::SchemaArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::SchemaArbiter(demand)
        } else if arbiter_addr == addresses.time_after_arbiter {
            let demand: contracts::arbiters::attestation_properties::TimeAfterArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::TimeAfterArbiter(demand)
        } else if arbiter_addr == addresses.time_before_arbiter {
            let demand: contracts::arbiters::attestation_properties::TimeBeforeArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::TimeBeforeArbiter(demand)
        } else if arbiter_addr == addresses.time_equal_arbiter {
            let demand: contracts::arbiters::attestation_properties::TimeEqualArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::TimeEqualArbiter(demand)
        } else if arbiter_addr == addresses.uid_arbiter {
            let demand: contracts::arbiters::attestation_properties::UidArbiter::DemandData = demand_bytes.try_into()?;
            DecodedDemand::UidArbiter(demand)
        } else {
            DecodedDemand::Unknown {
                arbiter: arbiter_addr,
                raw_data: demand_bytes.clone(),
            }
        };

        Ok(decoded)
    }

    /// Access logical arbiters API for structured decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded_all = arbiters_module.logical().all().decode(all_demand_data)?;
    /// let decoded_any = arbiters_module.logical().any().decode(any_demand_data)?;
    /// ```
    pub fn logical(&self) -> logical::Logical<'_> {
        logical::Logical::new(self)
    }

    /// Access attestation properties arbiters API for structured decode functionality
    ///
    /// # Example
    /// ```rust,ignore
    /// let decoded_attester = arbiters_module.attestation_properties().attester().decode(attester_demand_data)?;
    /// let decoded_recipient = arbiters_module.attestation_properties().recipient().decode(recipient_demand_data)?;
    /// let decoded_schema = arbiters_module.attestation_properties().schema().decode(schema_demand_data)?;
    /// ```
    pub fn attestation_properties(&self) -> attestation_properties::AttestationProperties<'_> {
        attestation_properties::AttestationProperties::new(self)
    }
}
