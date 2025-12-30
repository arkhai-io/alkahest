//! Attestation V1 tierable escrow obligation client
//!
//! Tierable escrows support multiple fulfillments per escrow (1:many relationship).
//! V1 stores the full attestation data in the escrow obligation.

use alkahest_rs::extensions::AttestationModule;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{ArbiterData, AttestationRequest, AttestedLog, LogWithHash},
};

/// Tierable escrow API for attestations (V1)
#[pyclass]
#[derive(Clone)]
pub struct Tierable {
    inner: AttestationModule,
}

impl Tierable {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Tierable {
    /// Creates a tierable escrow using an attestation as the escrowed item.
    /// This function uses the original AttestationEscrowObligation contract where the full attestation
    /// data is stored in the escrow obligation.
    pub fn create<'py>(
        &self,
        py: pyo3::Python<'py>,
        attestation: AttestationRequest,
        demand: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .v1()
                .tierable()
                .create(
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

    /// Collects payment from a tierable attestation escrow by providing a fulfillment attestation.
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
                .v1()
                .tierable()
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
