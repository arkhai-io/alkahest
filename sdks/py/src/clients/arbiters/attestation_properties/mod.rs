//! Attestation property arbiters module
//!
//! This module contains arbiters that validate specific properties of attestations.
//! All composing variants have been removed - use AllArbiter with non-composing arbiters instead.

use alkahest_rs::{
    contracts::arbiters::attestation_properties::{
        AttesterArbiter as AttesterArbiterContract,
        ExpirationTimeAfterArbiter as ExpirationTimeAfterArbiterContract,
        ExpirationTimeBeforeArbiter as ExpirationTimeBeforeArbiterContract,
        ExpirationTimeEqualArbiter as ExpirationTimeEqualArbiterContract,
        RecipientArbiter as RecipientArbiterContract,
        RefUidArbiter as RefUidArbiterContract,
        RevocableArbiter as RevocableArbiterContract,
        SchemaArbiter as SchemaArbiterContract,
        TimeAfterArbiter as TimeAfterArbiterContract,
        TimeBeforeArbiter as TimeBeforeArbiterContract,
        TimeEqualArbiter as TimeEqualArbiterContract,
        UidArbiter as UidArbiterContract,
    },
    extensions::ArbitersModule,
};
use alloy::sol_types::SolValue;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::map_eyre_to_pyerr;

/// Attestation properties arbiters API accessor
#[pyclass]
#[derive(Clone)]
pub struct AttestationProperties {
    inner: ArbitersModule,
}

impl AttestationProperties {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl AttestationProperties {
    /// Access AttesterArbiter-specific API
    #[getter]
    pub fn attester(&self) -> AttesterArbiter {
        AttesterArbiter::new(self.inner.clone())
    }

    /// Access ExpirationTimeAfterArbiter-specific API
    #[getter]
    pub fn expiration_time_after(&self) -> ExpirationTimeAfterArbiter {
        ExpirationTimeAfterArbiter::new(self.inner.clone())
    }

    /// Access ExpirationTimeBeforeArbiter-specific API
    #[getter]
    pub fn expiration_time_before(&self) -> ExpirationTimeBeforeArbiter {
        ExpirationTimeBeforeArbiter::new(self.inner.clone())
    }

    /// Access ExpirationTimeEqualArbiter-specific API
    #[getter]
    pub fn expiration_time_equal(&self) -> ExpirationTimeEqualArbiter {
        ExpirationTimeEqualArbiter::new(self.inner.clone())
    }

    /// Access RecipientArbiter-specific API
    #[getter]
    pub fn recipient(&self) -> RecipientArbiter {
        RecipientArbiter::new(self.inner.clone())
    }

    /// Access RefUidArbiter-specific API
    #[getter]
    pub fn ref_uid(&self) -> RefUidArbiter {
        RefUidArbiter::new(self.inner.clone())
    }

    /// Access RevocableArbiter-specific API
    #[getter]
    pub fn revocable(&self) -> RevocableArbiter {
        RevocableArbiter::new(self.inner.clone())
    }

    /// Access SchemaArbiter-specific API
    #[getter]
    pub fn schema(&self) -> SchemaArbiter {
        SchemaArbiter::new(self.inner.clone())
    }

    /// Access TimeAfterArbiter-specific API
    #[getter]
    pub fn time_after(&self) -> TimeAfterArbiter {
        TimeAfterArbiter::new(self.inner.clone())
    }

    /// Access TimeBeforeArbiter-specific API
    #[getter]
    pub fn time_before(&self) -> TimeBeforeArbiter {
        TimeBeforeArbiter::new(self.inner.clone())
    }

    /// Access TimeEqualArbiter-specific API
    #[getter]
    pub fn time_equal(&self) -> TimeEqualArbiter {
        TimeEqualArbiter::new(self.inner.clone())
    }

    /// Access UidArbiter-specific API
    #[getter]
    pub fn uid(&self) -> UidArbiter {
        UidArbiter::new(self.inner.clone())
    }

    // ===== Address getters =====

    /// Get the AttesterArbiter address
    pub fn attester_address(&self) -> String {
        format!("{:?}", self.inner.addresses.attester_arbiter)
    }

    /// Get the ExpirationTimeAfterArbiter address
    pub fn expiration_time_after_address(&self) -> String {
        format!("{:?}", self.inner.addresses.expiration_time_after_arbiter)
    }

    /// Get the ExpirationTimeBeforeArbiter address
    pub fn expiration_time_before_address(&self) -> String {
        format!("{:?}", self.inner.addresses.expiration_time_before_arbiter)
    }

    /// Get the ExpirationTimeEqualArbiter address
    pub fn expiration_time_equal_address(&self) -> String {
        format!("{:?}", self.inner.addresses.expiration_time_equal_arbiter)
    }

    /// Get the RecipientArbiter address
    pub fn recipient_address(&self) -> String {
        format!("{:?}", self.inner.addresses.recipient_arbiter)
    }

    /// Get the RefUidArbiter address
    pub fn ref_uid_address(&self) -> String {
        format!("{:?}", self.inner.addresses.ref_uid_arbiter)
    }

    /// Get the RevocableArbiter address
    pub fn revocable_address(&self) -> String {
        format!("{:?}", self.inner.addresses.revocable_arbiter)
    }

    /// Get the SchemaArbiter address
    pub fn schema_address(&self) -> String {
        format!("{:?}", self.inner.addresses.schema_arbiter)
    }

    /// Get the TimeAfterArbiter address
    pub fn time_after_address(&self) -> String {
        format!("{:?}", self.inner.addresses.time_after_arbiter)
    }

    /// Get the TimeBeforeArbiter address
    pub fn time_before_address(&self) -> String {
        format!("{:?}", self.inner.addresses.time_before_arbiter)
    }

    /// Get the TimeEqualArbiter address
    pub fn time_equal_address(&self) -> String {
        format!("{:?}", self.inner.addresses.time_equal_arbiter)
    }

    /// Get the UidArbiter address
    pub fn uid_address(&self) -> String {
        format!("{:?}", self.inner.addresses.uid_arbiter)
    }
}

// =============================================================================
// DemandData Types
// =============================================================================

// ===== AttesterArbiterDemandData =====

/// Python representation of AttesterArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct AttesterArbiterDemandData {
    #[pyo3(get)]
    pub attester: String,
}

#[pymethods]
impl AttesterArbiterDemandData {
    #[new]
    pub fn new(attester: String) -> Self {
        Self { attester }
    }

    fn __repr__(&self) -> String {
        format!("AttesterArbiterDemandData(attester='{}')", self.attester)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<AttesterArbiterDemandData> {
        let decoded = AttesterArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(AttesterArbiterDemandData {
            attester: format!("{:?}", decoded.attester),
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &AttesterArbiterDemandData) -> PyResult<Vec<u8>> {
        let attester: alloy::primitives::Address = demand_data.attester.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid address: {}", e)))?;
        let rust_data = AttesterArbiterContract::DemandData { attester };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        AttesterArbiterDemandData::encode(self)
    }
}

// ===== RecipientArbiterDemandData =====

/// Python representation of RecipientArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct RecipientArbiterDemandData {
    #[pyo3(get)]
    pub recipient: String,
}

#[pymethods]
impl RecipientArbiterDemandData {
    #[new]
    pub fn new(recipient: String) -> Self {
        Self { recipient }
    }

    fn __repr__(&self) -> String {
        format!("RecipientArbiterDemandData(recipient='{}')", self.recipient)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<RecipientArbiterDemandData> {
        let decoded = RecipientArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(RecipientArbiterDemandData {
            recipient: format!("{:?}", decoded.recipient),
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &RecipientArbiterDemandData) -> PyResult<Vec<u8>> {
        let recipient: alloy::primitives::Address = demand_data.recipient.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid address: {}", e)))?;
        let rust_data = RecipientArbiterContract::DemandData { recipient };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        RecipientArbiterDemandData::encode(self)
    }
}

// ===== SchemaArbiterDemandData =====

/// Python representation of SchemaArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct SchemaArbiterDemandData {
    #[pyo3(get)]
    pub schema: String,
}

#[pymethods]
impl SchemaArbiterDemandData {
    #[new]
    pub fn new(schema: String) -> Self {
        Self { schema }
    }

    fn __repr__(&self) -> String {
        format!("SchemaArbiterDemandData(schema='{}')", self.schema)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<SchemaArbiterDemandData> {
        let decoded = SchemaArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(SchemaArbiterDemandData {
            schema: format!("{:?}", decoded.schema),
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &SchemaArbiterDemandData) -> PyResult<Vec<u8>> {
        let schema: alloy::primitives::FixedBytes<32> = demand_data.schema.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid bytes32: {}", e)))?;
        let rust_data = SchemaArbiterContract::DemandData { schema };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        SchemaArbiterDemandData::encode(self)
    }
}

// ===== UidArbiterDemandData =====

/// Python representation of UidArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct UidArbiterDemandData {
    #[pyo3(get)]
    pub uid: String,
}

#[pymethods]
impl UidArbiterDemandData {
    #[new]
    pub fn new(uid: String) -> Self {
        Self { uid }
    }

    fn __repr__(&self) -> String {
        format!("UidArbiterDemandData(uid='{}')", self.uid)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<UidArbiterDemandData> {
        let decoded = UidArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(UidArbiterDemandData {
            uid: format!("{:?}", decoded.uid),
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &UidArbiterDemandData) -> PyResult<Vec<u8>> {
        let uid: alloy::primitives::FixedBytes<32> = demand_data.uid.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid bytes32: {}", e)))?;
        let rust_data = UidArbiterContract::DemandData { uid };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        UidArbiterDemandData::encode(self)
    }
}

// ===== RefUidArbiterDemandData =====

/// Python representation of RefUidArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct RefUidArbiterDemandData {
    #[pyo3(get)]
    pub ref_uid: String,
}

#[pymethods]
impl RefUidArbiterDemandData {
    #[new]
    pub fn new(ref_uid: String) -> Self {
        Self { ref_uid }
    }

    fn __repr__(&self) -> String {
        format!("RefUidArbiterDemandData(ref_uid='{}')", self.ref_uid)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<RefUidArbiterDemandData> {
        let decoded = RefUidArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(RefUidArbiterDemandData {
            ref_uid: format!("{:?}", decoded.refUID),
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &RefUidArbiterDemandData) -> PyResult<Vec<u8>> {
        let ref_uid: alloy::primitives::FixedBytes<32> = demand_data.ref_uid.parse()
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Invalid bytes32: {}", e)))?;
        let rust_data = RefUidArbiterContract::DemandData { refUID: ref_uid };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        RefUidArbiterDemandData::encode(self)
    }
}

// ===== RevocableArbiterDemandData =====

/// Python representation of RevocableArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct RevocableArbiterDemandData {
    #[pyo3(get)]
    pub revocable: bool,
}

#[pymethods]
impl RevocableArbiterDemandData {
    #[new]
    pub fn new(revocable: bool) -> Self {
        Self { revocable }
    }

    fn __repr__(&self) -> String {
        format!("RevocableArbiterDemandData(revocable={})", self.revocable)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<RevocableArbiterDemandData> {
        let decoded = RevocableArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(RevocableArbiterDemandData {
            revocable: decoded.revocable,
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &RevocableArbiterDemandData) -> PyResult<Vec<u8>> {
        let rust_data = RevocableArbiterContract::DemandData {
            revocable: demand_data.revocable,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        RevocableArbiterDemandData::encode(self)
    }
}

// ===== TimeAfterArbiterDemandData =====

/// Python representation of TimeAfterArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct TimeAfterArbiterDemandData {
    #[pyo3(get)]
    pub time: u64,
}

#[pymethods]
impl TimeAfterArbiterDemandData {
    #[new]
    pub fn new(time: u64) -> Self {
        Self { time }
    }

    fn __repr__(&self) -> String {
        format!("TimeAfterArbiterDemandData(time={})", self.time)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<TimeAfterArbiterDemandData> {
        let decoded = TimeAfterArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(TimeAfterArbiterDemandData { time: decoded.time })
    }

    #[staticmethod]
    pub fn encode(demand_data: &TimeAfterArbiterDemandData) -> PyResult<Vec<u8>> {
        let rust_data = TimeAfterArbiterContract::DemandData {
            time: demand_data.time,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        TimeAfterArbiterDemandData::encode(self)
    }
}

// ===== TimeBeforeArbiterDemandData =====

/// Python representation of TimeBeforeArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct TimeBeforeArbiterDemandData {
    #[pyo3(get)]
    pub time: u64,
}

#[pymethods]
impl TimeBeforeArbiterDemandData {
    #[new]
    pub fn new(time: u64) -> Self {
        Self { time }
    }

    fn __repr__(&self) -> String {
        format!("TimeBeforeArbiterDemandData(time={})", self.time)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<TimeBeforeArbiterDemandData> {
        let decoded = TimeBeforeArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(TimeBeforeArbiterDemandData { time: decoded.time })
    }

    #[staticmethod]
    pub fn encode(demand_data: &TimeBeforeArbiterDemandData) -> PyResult<Vec<u8>> {
        let rust_data = TimeBeforeArbiterContract::DemandData {
            time: demand_data.time,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        TimeBeforeArbiterDemandData::encode(self)
    }
}

// ===== TimeEqualArbiterDemandData =====

/// Python representation of TimeEqualArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct TimeEqualArbiterDemandData {
    #[pyo3(get)]
    pub time: u64,
}

#[pymethods]
impl TimeEqualArbiterDemandData {
    #[new]
    pub fn new(time: u64) -> Self {
        Self { time }
    }

    fn __repr__(&self) -> String {
        format!("TimeEqualArbiterDemandData(time={})", self.time)
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<TimeEqualArbiterDemandData> {
        let decoded = TimeEqualArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(TimeEqualArbiterDemandData { time: decoded.time })
    }

    #[staticmethod]
    pub fn encode(demand_data: &TimeEqualArbiterDemandData) -> PyResult<Vec<u8>> {
        let rust_data = TimeEqualArbiterContract::DemandData {
            time: demand_data.time,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        TimeEqualArbiterDemandData::encode(self)
    }
}

// ===== ExpirationTimeAfterArbiterDemandData =====

/// Python representation of ExpirationTimeAfterArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct ExpirationTimeAfterArbiterDemandData {
    #[pyo3(get)]
    pub expiration_time: u64,
}

#[pymethods]
impl ExpirationTimeAfterArbiterDemandData {
    #[new]
    pub fn new(expiration_time: u64) -> Self {
        Self { expiration_time }
    }

    fn __repr__(&self) -> String {
        format!(
            "ExpirationTimeAfterArbiterDemandData(expiration_time={})",
            self.expiration_time
        )
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<ExpirationTimeAfterArbiterDemandData> {
        let decoded = ExpirationTimeAfterArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(ExpirationTimeAfterArbiterDemandData {
            expiration_time: decoded.expirationTime,
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &ExpirationTimeAfterArbiterDemandData) -> PyResult<Vec<u8>> {
        let rust_data = ExpirationTimeAfterArbiterContract::DemandData {
            expirationTime: demand_data.expiration_time,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        ExpirationTimeAfterArbiterDemandData::encode(self)
    }
}

// ===== ExpirationTimeBeforeArbiterDemandData =====

/// Python representation of ExpirationTimeBeforeArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct ExpirationTimeBeforeArbiterDemandData {
    #[pyo3(get)]
    pub expiration_time: u64,
}

#[pymethods]
impl ExpirationTimeBeforeArbiterDemandData {
    #[new]
    pub fn new(expiration_time: u64) -> Self {
        Self { expiration_time }
    }

    fn __repr__(&self) -> String {
        format!(
            "ExpirationTimeBeforeArbiterDemandData(expiration_time={})",
            self.expiration_time
        )
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<ExpirationTimeBeforeArbiterDemandData> {
        let decoded = ExpirationTimeBeforeArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(ExpirationTimeBeforeArbiterDemandData {
            expiration_time: decoded.expirationTime,
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &ExpirationTimeBeforeArbiterDemandData) -> PyResult<Vec<u8>> {
        let rust_data = ExpirationTimeBeforeArbiterContract::DemandData {
            expirationTime: demand_data.expiration_time,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        ExpirationTimeBeforeArbiterDemandData::encode(self)
    }
}

// ===== ExpirationTimeEqualArbiterDemandData =====

/// Python representation of ExpirationTimeEqualArbiter DemandData
#[pyclass]
#[derive(Clone)]
pub struct ExpirationTimeEqualArbiterDemandData {
    #[pyo3(get)]
    pub expiration_time: u64,
}

#[pymethods]
impl ExpirationTimeEqualArbiterDemandData {
    #[new]
    pub fn new(expiration_time: u64) -> Self {
        Self { expiration_time }
    }

    fn __repr__(&self) -> String {
        format!(
            "ExpirationTimeEqualArbiterDemandData(expiration_time={})",
            self.expiration_time
        )
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> PyResult<ExpirationTimeEqualArbiterDemandData> {
        let decoded = ExpirationTimeEqualArbiterContract::DemandData::abi_decode(&demand_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode: {}", e)))?;
        Ok(ExpirationTimeEqualArbiterDemandData {
            expiration_time: decoded.expirationTime,
        })
    }

    #[staticmethod]
    pub fn encode(demand_data: &ExpirationTimeEqualArbiterDemandData) -> PyResult<Vec<u8>> {
        let rust_data = ExpirationTimeEqualArbiterContract::DemandData {
            expirationTime: demand_data.expiration_time,
        };
        Ok(rust_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        ExpirationTimeEqualArbiterDemandData::encode(self)
    }
}

// =============================================================================
// Arbiter API Types
// =============================================================================

// ===== AttesterArbiter =====

/// AttesterArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct AttesterArbiter {
    inner: ArbitersModule,
}

impl AttesterArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl AttesterArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.attester_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<AttesterArbiterDemandData> {
        AttesterArbiterDemandData::decode(demand_bytes)
    }
}

// ===== ExpirationTimeAfterArbiter =====

/// ExpirationTimeAfterArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct ExpirationTimeAfterArbiter {
    inner: ArbitersModule,
}

impl ExpirationTimeAfterArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl ExpirationTimeAfterArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.expiration_time_after_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<ExpirationTimeAfterArbiterDemandData> {
        ExpirationTimeAfterArbiterDemandData::decode(demand_bytes)
    }
}

// ===== ExpirationTimeBeforeArbiter =====

/// ExpirationTimeBeforeArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct ExpirationTimeBeforeArbiter {
    inner: ArbitersModule,
}

impl ExpirationTimeBeforeArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl ExpirationTimeBeforeArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.expiration_time_before_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<ExpirationTimeBeforeArbiterDemandData> {
        ExpirationTimeBeforeArbiterDemandData::decode(demand_bytes)
    }
}

// ===== ExpirationTimeEqualArbiter =====

/// ExpirationTimeEqualArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct ExpirationTimeEqualArbiter {
    inner: ArbitersModule,
}

impl ExpirationTimeEqualArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl ExpirationTimeEqualArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.expiration_time_equal_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<ExpirationTimeEqualArbiterDemandData> {
        ExpirationTimeEqualArbiterDemandData::decode(demand_bytes)
    }
}

// ===== RecipientArbiter =====

/// RecipientArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct RecipientArbiter {
    inner: ArbitersModule,
}

impl RecipientArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl RecipientArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.recipient_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<RecipientArbiterDemandData> {
        RecipientArbiterDemandData::decode(demand_bytes)
    }
}

// ===== RefUidArbiter =====

/// RefUidArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct RefUidArbiter {
    inner: ArbitersModule,
}

impl RefUidArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl RefUidArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.ref_uid_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<RefUidArbiterDemandData> {
        RefUidArbiterDemandData::decode(demand_bytes)
    }
}

// ===== RevocableArbiter =====

/// RevocableArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct RevocableArbiter {
    inner: ArbitersModule,
}

impl RevocableArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl RevocableArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.revocable_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<RevocableArbiterDemandData> {
        RevocableArbiterDemandData::decode(demand_bytes)
    }
}

// ===== SchemaArbiter =====

/// SchemaArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct SchemaArbiter {
    inner: ArbitersModule,
}

impl SchemaArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl SchemaArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.schema_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<SchemaArbiterDemandData> {
        SchemaArbiterDemandData::decode(demand_bytes)
    }
}

// ===== TimeAfterArbiter =====

/// TimeAfterArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct TimeAfterArbiter {
    inner: ArbitersModule,
}

impl TimeAfterArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl TimeAfterArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.time_after_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<TimeAfterArbiterDemandData> {
        TimeAfterArbiterDemandData::decode(demand_bytes)
    }
}

// ===== TimeBeforeArbiter =====

/// TimeBeforeArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct TimeBeforeArbiter {
    inner: ArbitersModule,
}

impl TimeBeforeArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl TimeBeforeArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.time_before_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<TimeBeforeArbiterDemandData> {
        TimeBeforeArbiterDemandData::decode(demand_bytes)
    }
}

// ===== TimeEqualArbiter =====

/// TimeEqualArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct TimeEqualArbiter {
    inner: ArbitersModule,
}

impl TimeEqualArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl TimeEqualArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.time_equal_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<TimeEqualArbiterDemandData> {
        TimeEqualArbiterDemandData::decode(demand_bytes)
    }
}

// ===== UidArbiter =====

/// UidArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct UidArbiter {
    inner: ArbitersModule,
}

impl UidArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl UidArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.uid_arbiter)
    }

    /// Decode demand data from raw bytes
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<UidArbiterDemandData> {
        UidArbiterDemandData::decode(demand_bytes)
    }
}
