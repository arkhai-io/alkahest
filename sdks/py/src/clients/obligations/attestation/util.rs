//! Attestation utility functions
//!
//! Core EAS operations: getting attestations, registering schemas, creating attestations.

use alkahest_rs::extensions::AttestationModule;
use alloy::primitives::{Address, FixedBytes};
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{ArbiterData, AttestationRequest, AttestedLog, LogWithHash},
};

#[pyclass]
#[derive(Clone)]
pub struct Util {
    inner: AttestationModule,
}

impl Util {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Util {
    pub fn register_schema<'py>(
        &self,
        py: pyo3::Python<'py>,
        schema: String,
        resolver: String,
        revocable: bool,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let schema: FixedBytes<32> = schema.parse().map_err(map_parse_to_pyerr)?;
            let resolver: Address = resolver.parse().map_err(map_parse_to_pyerr)?;
            let receipt = inner
                .util()
                .register_schema(schema.to_string(), resolver, revocable)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }

    pub fn attest<'py>(
        &self,
        py: pyo3::Python<'py>,
        attestation: AttestationRequest,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .util()
                .attest(attestation.try_into().map_err(map_eyre_to_pyerr)?)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(LogWithHash::<AttestedLog> {
                log: get_attested_event(receipt.clone())
                    .map_err(map_eyre_to_pyerr)?
                    .data
                    .into(),
                transaction_hash: receipt.transaction_hash.to_string(),
            })
        })
    }

    pub fn attest_and_create_escrow<'py>(
        &self,
        py: pyo3::Python<'py>,
        attestation: AttestationRequest,
        demand: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .util()
                .attest_and_create_escrow(
                    attestation.try_into().map_err(map_eyre_to_pyerr)?,
                    &demand.try_into().map_err(map_eyre_to_pyerr)?,
                    expiration,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(LogWithHash::<AttestedLog> {
                log: get_attested_event(receipt.clone())
                    .map_err(map_eyre_to_pyerr)?
                    .data
                    .into(),
                transaction_hash: receipt.transaction_hash.to_string(),
            })
        })
    }

    /// Get an attestation by its UID
    pub fn get_attestation<'py>(
        &self,
        py: pyo3::Python<'py>,
        uid: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let uid: FixedBytes<32> = uid.parse().map_err(map_parse_to_pyerr)?;
            let attestation = inner
                .util()
                .get_attestation(uid)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(crate::contract::PyAttestation::from(attestation))
        })
    }
}
