//! Attestation obligation module
//!
//! Provides escrow and utility operations for attestation-based obligations.

pub mod escrow;
pub mod util;

use alkahest_rs::extensions::AttestationModule;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    contract::{PyAttestationRequest, PyAttestationRequestData},
    error_handling::map_parse_to_pyerr,
};

#[pyclass]
#[derive(Clone)]
pub struct AttestationClient {
    pub(crate) inner: AttestationModule,
}

impl AttestationClient {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl AttestationClient {
    /// Access escrow operations (V1 and V2)
    #[getter]
    pub fn escrow(&self) -> escrow::Escrow {
        escrow::Escrow::new(self.inner.clone())
    }

    /// Access utility operations (get_attestation, register_schema, attest)
    #[getter]
    pub fn util(&self) -> util::Util {
        util::Util::new(self.inner.clone())
    }
}

// --- Obligation Data Types ---

/// AttestationEscrow V1: stores the full attestation request inline.
#[pyclass]
#[derive(Clone)]
pub struct PyAttestationEscrowV1ObligationData {
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
    #[pyo3(get)]
    pub attestation: PyAttestationRequest,
}

#[pymethods]
impl PyAttestationEscrowV1ObligationData {
    #[new]
    pub fn new(arbiter: String, demand: Vec<u8>, attestation: PyAttestationRequest) -> Self {
        Self {
            arbiter,
            demand,
            attestation,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyAttestationEscrowV1ObligationData(arbiter='{}', demand_len={}, attestation={:?})",
            self.arbiter,
            self.demand.len(),
            self.attestation
        )
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyAttestationEscrowV1ObligationData> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation;
        use alloy::sol_types::SolValue;
        let decoded =
            AttestationEscrowObligation::ObligationData::abi_decode(&obligation_data)
                .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyAttestationEscrowV1ObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation;
        use alloy::{
            primitives::{Address, Bytes, FixedBytes},
            sol_types::SolValue,
        };

        let arbiter: Address = obligation.arbiter.parse().map_err(map_parse_to_pyerr)?;
        let demand = Bytes::from(obligation.demand.clone());

        // The sol! macro emits a per-contract `AttestationRequest` struct that
        // is structurally identical to `IEAS::AttestationRequest` but a distinct
        // type, so we construct it directly using the escrow contract's namespace.
        let schema: FixedBytes<32> = obligation
            .attestation
            .schema
            .parse()
            .map_err(map_parse_to_pyerr)?;
        let recipient: Address = obligation
            .attestation
            .data
            .recipient
            .parse()
            .map_err(map_parse_to_pyerr)?;
        let ref_uid: FixedBytes<32> = obligation
            .attestation
            .data
            .ref_uid
            .parse()
            .map_err(map_parse_to_pyerr)?;
        let value = alloy::primitives::U256::from(obligation.attestation.data.value);
        let attestation = AttestationEscrowObligation::AttestationRequest {
            schema,
            data: AttestationEscrowObligation::AttestationRequestData {
                recipient,
                expirationTime: obligation.attestation.data.expiration_time,
                revocable: obligation.attestation.data.revocable,
                refUID: ref_uid,
                data: Bytes::from(obligation.attestation.data.data.clone()),
                value,
            },
        };

        let obligation_data = AttestationEscrowObligation::ObligationData {
            arbiter,
            demand,
            attestation,
        };

        Ok(obligation_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyAttestationEscrowV1ObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation::ObligationData>
    for PyAttestationEscrowV1ObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            attestation: PyAttestationRequest {
                schema: data.attestation.schema.to_string(),
                data: PyAttestationRequestData {
                    recipient: format!("{:?}", data.attestation.data.recipient),
                    expiration_time: data.attestation.data.expirationTime,
                    revocable: data.attestation.data.revocable,
                    ref_uid: data.attestation.data.refUID.to_string(),
                    data: data.attestation.data.data.to_vec(),
                    value: data.attestation.data.value.try_into().unwrap_or(0),
                },
            },
        }
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation::ObligationData>
    for PyAttestationEscrowV1ObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            attestation: PyAttestationRequest {
                schema: data.attestation.schema.to_string(),
                data: PyAttestationRequestData {
                    recipient: format!("{:?}", data.attestation.data.recipient),
                    expiration_time: data.attestation.data.expirationTime,
                    revocable: data.attestation.data.revocable,
                    ref_uid: data.attestation.data.refUID.to_string(),
                    data: data.attestation.data.data.to_vec(),
                    value: data.attestation.data.value.try_into().unwrap_or(0),
                },
            },
        }
    }
}

/// AttestationEscrow V2: references an attestation by UID instead of inlining.
///
/// `attestation_uid` is a 0x-prefixed hex string for a bytes32 (matches the
/// `schema`/`uid` convention used elsewhere in the SDK).
#[pyclass]
#[derive(Clone)]
pub struct PyAttestationEscrowV2ObligationData {
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
    #[pyo3(get)]
    pub attestation_uid: String,
}

#[pymethods]
impl PyAttestationEscrowV2ObligationData {
    #[new]
    pub fn new(arbiter: String, demand: Vec<u8>, attestation_uid: String) -> Self {
        Self {
            arbiter,
            demand,
            attestation_uid,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyAttestationEscrowV2ObligationData(arbiter='{}', attestation_uid='{}', demand_len={})",
            self.arbiter, self.attestation_uid, self.demand.len()
        )
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyAttestationEscrowV2ObligationData> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation2;
        use alloy::sol_types::SolValue;
        let decoded =
            AttestationEscrowObligation2::ObligationData::abi_decode(&obligation_data)
                .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyAttestationEscrowV2ObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation2;
        use alloy::{
            primitives::{Address, Bytes, FixedBytes},
            sol_types::SolValue,
        };

        let arbiter: Address = obligation.arbiter.parse().map_err(map_parse_to_pyerr)?;
        let demand = Bytes::from(obligation.demand.clone());
        let attestation_uid: FixedBytes<32> = obligation
            .attestation_uid
            .parse()
            .map_err(map_parse_to_pyerr)?;

        let obligation_data = AttestationEscrowObligation2::ObligationData {
            arbiter,
            demand,
            attestationUid: attestation_uid,
        };

        Ok(obligation_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyAttestationEscrowV2ObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation2::ObligationData>
    for PyAttestationEscrowV2ObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::default_escrow::AttestationEscrowObligation2::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            attestation_uid: data.attestationUid.to_string(),
        }
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation2::ObligationData>
    for PyAttestationEscrowV2ObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalAttestationEscrowObligation2::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            attestation_uid: data.attestationUid.to_string(),
        }
    }
}
