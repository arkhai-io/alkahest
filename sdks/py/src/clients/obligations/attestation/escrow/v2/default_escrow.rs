//! Attestation V2 default escrow obligation client
//!
//! Default escrows have a 1:1 relationship between escrow and fulfillment.
//! V2 references the attestation by UID instead of storing the full data.

use alkahest_rs::extensions::AttestationModule;
use alloy::primitives::FixedBytes;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    clients::obligations::attestation::PyAttestationEscrowV2ObligationData,
    contract::PyDecodedAttestation,
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{ArbiterData, AttestedLog, LogWithHash},
};

/// Default escrow API for attestations (V2)
#[pyclass]
#[derive(Clone)]
pub struct Default {
    inner: AttestationModule,
}

impl Default {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Default {
    /// Gets an escrow obligation by its attestation UID.
    pub fn get_obligation<'py>(
        &self,
        py: pyo3::Python<'py>,
        uid: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let uid: FixedBytes<32> = uid.parse().map_err(map_parse_to_pyerr)?;
            let obligation = inner
                .escrow()
                .v2()
                .default()
                .get_obligation(uid)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(PyDecodedAttestation::<PyAttestationEscrowV2ObligationData>::from(obligation))
        })
    }

    /// Creates an escrow using an attestation UID as reference.
    /// This function uses AttestationReferenceEscrowObligation which references the attestation by UID
    /// instead of storing the full attestation data, making it more gas efficient.
    pub fn create<'py>(
        &self,
        py: pyo3::Python<'py>,
        attestation: String,
        demand: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .v2()
                .default()
                .create(
                    attestation.parse().map_err(map_parse_to_pyerr)?,
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

    /// Collects payment from an attestation escrow by providing a fulfillment attestation.
    /// This creates a validation attestation that references the original attestation.
    pub fn collect<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
        fulfillment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .v2()
                .default()
                .collect(
                    buy_attestation.parse().map_err(map_parse_to_pyerr)?,
                    fulfillment.parse().map_err(map_parse_to_pyerr)?,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }
}
