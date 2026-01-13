//! Arbiters module
//!
//! This module contains clients for interacting with arbiter contracts:
//! - `trusted_oracle`: Trusted oracle arbiter for oracle-based arbitration
//! - `confirmation`: Confirmation-based arbiters (exclusive/nonexclusive, revocable/unrevocable)
//! - `logical`: Logical arbiters (AllArbiter, AnyArbiter)
//! - `attestation_properties`: Attestation property arbiters (AttesterArbiter, RecipientArbiter, etc.)

pub mod attestation_properties;
pub mod confirmation;
pub mod logical;
pub mod trusted_oracle;

use alkahest_rs::{
    contracts::arbiters::{
        ERC8004Arbiter as ERC8004ArbiterContract,
        IntrinsicsArbiter2 as IntrinsicsArbiter2Contract,
    },
    extensions::ArbitersModule,
};
use alloy::sol_types::SolValue;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::map_eyre_to_pyerr;

// Re-export main types for backwards compatibility
pub use trusted_oracle::{
    OracleClient, PyArbitrationMode, PyAttestationWithDemand, PyDecision,
    PyOracleAddresses, PyOracleAttestation, PyTrustedOracleArbiterDemandData,
    TrustedOracle,
};

// Re-export confirmation types
pub use confirmation::{
    exclusive_revocable::{ExclusiveRevocable, PyConfirmationMadeLog, PyConfirmationRequestedLog},
    exclusive_unrevocable::ExclusiveUnrevocable,
    nonexclusive_revocable::NonexclusiveRevocable,
    nonexclusive_unrevocable::NonexclusiveUnrevocable,
    Confirmation, PyConfirmationArbiterType,
};

// Re-export logical types
pub use logical::{
    AllArbiter, AnyArbiter, Logical, PyDecodedAllArbiterDemandData, PyDecodedAnyArbiterDemandData,
    PyDecodedDemand,
};

// Re-export attestation properties types
pub use attestation_properties::{
    AttestationProperties, AttesterArbiter, ExpirationTimeAfterArbiter,
    ExpirationTimeBeforeArbiter, ExpirationTimeEqualArbiter, RecipientArbiter, RefUidArbiter,
    RevocableArbiter, SchemaArbiter, TimeAfterArbiter, TimeBeforeArbiter, TimeEqualArbiter,
    UidArbiter,
    // DemandData types
    AttesterArbiterDemandData, ExpirationTimeAfterArbiterDemandData,
    ExpirationTimeBeforeArbiterDemandData, ExpirationTimeEqualArbiterDemandData,
    RecipientArbiterDemandData, RefUidArbiterDemandData, RevocableArbiterDemandData,
    SchemaArbiterDemandData, TimeAfterArbiterDemandData, TimeBeforeArbiterDemandData,
    TimeEqualArbiterDemandData, UidArbiterDemandData,
};

/// Python representation of ArbitrationMade event
#[pyclass]
#[derive(Clone, Debug)]
pub struct PyArbitrationMadeLog {
    #[pyo3(get)]
    pub decision_key: String,
    #[pyo3(get)]
    pub obligation: String,
    #[pyo3(get)]
    pub oracle: String,
    #[pyo3(get)]
    pub decision: bool,
}

#[pymethods]
impl PyArbitrationMadeLog {
    fn __repr__(&self) -> String {
        format!(
            "PyArbitrationMadeLog(obligation='{}', oracle='{}', decision={})",
            self.obligation, self.oracle, self.decision
        )
    }
}

/// Client for interacting with Alkahest arbiters
///
/// This client provides access to all arbiter functionality including:
/// - Confirmation arbiters (exclusive/nonexclusive, revocable/unrevocable)
/// - Logical arbiters (AllArbiter, AnyArbiter)
/// - Trusted oracle arbitration
#[pyclass]
#[derive(Clone)]
pub struct ArbitersClient {
    inner: ArbitersModule,
}

impl ArbitersClient {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl ArbitersClient {
    /// Access confirmation arbiters API
    #[getter]
    pub fn confirmation(&self) -> Confirmation {
        Confirmation::new(self.inner.clone())
    }

    /// Access logical arbiters API
    #[getter]
    pub fn logical(&self) -> Logical {
        Logical::new(self.inner.clone())
    }

    /// Access trusted oracle arbiter API
    #[getter]
    pub fn trusted_oracle(&self) -> TrustedOracle {
        TrustedOracle::new(self.inner.clone())
    }

    /// Access attestation properties arbiters API
    #[getter]
    pub fn attestation_properties(&self) -> AttestationProperties {
        AttestationProperties::new(self.inner.clone())
    }

    // ===== Address getters =====

    /// Get the EAS address
    pub fn eas_address(&self) -> String {
        format!("{:?}", self.inner.addresses.eas)
    }

    /// Get the TrivialArbiter address
    pub fn trivial_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.trivial_arbiter)
    }

    /// Get the TrustedOracleArbiter address
    pub fn trusted_oracle_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.trusted_oracle_arbiter)
    }

    /// Get the IntrinsicsArbiter address
    pub fn intrinsics_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.intrinsics_arbiter)
    }

    /// Get the IntrinsicsArbiter2 address
    pub fn intrinsics_arbiter_2_address(&self) -> String {
        format!("{:?}", self.inner.addresses.intrinsics_arbiter_2)
    }

    /// Get the ERC8004Arbiter address
    pub fn erc8004_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.erc8004_arbiter)
    }

    /// Get the AnyArbiter address
    pub fn any_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.any_arbiter)
    }

    /// Get the AllArbiter address
    pub fn all_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.all_arbiter)
    }

    /// Get the address of a confirmation arbiter by type
    pub fn confirmation_arbiter_address(&self, arbiter_type: PyConfirmationArbiterType) -> String {
        self.confirmation().address(arbiter_type)
    }
}

// =============================================================================
// Core Arbiter DemandData Types
// =============================================================================

// ===== IntrinsicsArbiter2DemandData =====

/// Python representation of IntrinsicsArbiter2 DemandData
///
/// IntrinsicsArbiter2 validates that an attestation has a specific schema.
#[pyclass]
#[derive(Clone)]
pub struct IntrinsicsArbiter2DemandData {
    #[pyo3(get)]
    pub schema: String,
}

#[pymethods]
impl IntrinsicsArbiter2DemandData {
    #[new]
    pub fn new(schema: String) -> Self {
        Self { schema }
    }

    fn __repr__(&self) -> String {
        format!("IntrinsicsArbiter2DemandData(schema='{}')", self.schema)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<IntrinsicsArbiter2DemandData> {
        let decoded = IntrinsicsArbiter2Contract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(IntrinsicsArbiter2DemandData {
            schema: format!("{:?}", decoded.schema),
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &IntrinsicsArbiter2DemandData) -> PyResult<Vec<u8>> {
        let schema: alloy::primitives::FixedBytes<32> = demand_data.schema.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid bytes32: {}", e)))?;
        let rust_data = IntrinsicsArbiter2Contract::DemandData { schema };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        IntrinsicsArbiter2DemandData::encode(self)
    }
}

// ===== ERC8004ArbiterDemandData =====

/// Python representation of ERC8004Arbiter DemandData
///
/// ERC8004Arbiter wraps ERC-8004's ValidationRegistry to check validation responses.
#[pyclass]
#[derive(Clone)]
pub struct ERC8004ArbiterDemandData {
    /// The address of the ValidationRegistry contract
    #[pyo3(get)]
    pub validation_registry: String,
    /// The address of the validator
    #[pyo3(get)]
    pub validator_address: String,
    /// Minimum response value (0-100)
    #[pyo3(get)]
    pub min_response: u8,
}

#[pymethods]
impl ERC8004ArbiterDemandData {
    #[new]
    pub fn new(validation_registry: String, validator_address: String, min_response: u8) -> Self {
        Self {
            validation_registry,
            validator_address,
            min_response,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "ERC8004ArbiterDemandData(validation_registry='{}', validator_address='{}', min_response={})",
            self.validation_registry, self.validator_address, self.min_response
        )
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<ERC8004ArbiterDemandData> {
        let decoded = ERC8004ArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(ERC8004ArbiterDemandData {
            validation_registry: format!("{:?}", decoded.validationRegistry),
            validator_address: format!("{:?}", decoded.validatorAddress),
            min_response: decoded.minResponse,
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &ERC8004ArbiterDemandData) -> PyResult<Vec<u8>> {
        let validation_registry: alloy::primitives::Address = demand_data.validation_registry.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid address: {}", e)))?;
        let validator_address: alloy::primitives::Address = demand_data.validator_address.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid address: {}", e)))?;
        let rust_data = ERC8004ArbiterContract::DemandData {
            validationRegistry: validation_registry,
            validatorAddress: validator_address,
            minResponse: demand_data.min_response,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        ERC8004ArbiterDemandData::encode(self)
    }
}
