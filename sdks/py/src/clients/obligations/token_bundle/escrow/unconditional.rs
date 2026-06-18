//! TokenBundle unconditional escrow obligation client
//!
//! Unconditional escrows support multiple fulfillments per escrow (1:many relationship).

use alkahest_rs::extensions::TokenBundleModule;
use alloy::primitives::FixedBytes;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    clients::obligations::token_bundle::PyTokenBundleEscrowObligationData,
    contract::PyDecodedAttestation,
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{ArbiterData, AttestedLog, LogWithHash, TokenBundleData},
};

/// Unconditional escrow API for TokenBundle (no default fulfillment checks)
#[pyclass]
#[derive(Clone)]
pub struct Unconditional {
    inner: TokenBundleModule,
}

impl Unconditional {
    pub fn new(inner: TokenBundleModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Unconditional {
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
                .unconditional()
                .get_obligation(uid)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(PyDecodedAttestation::<PyTokenBundleEscrowObligationData>::from(obligation))
        })
    }

    /// Creates an escrow arrangement with a token bundle.
    pub fn create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: TokenBundleData,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .unconditional()
                .create(
                    &price.try_into().map_err(map_eyre_to_pyerr)?,
                    &item.try_into().map_err(map_eyre_to_pyerr)?,
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

    /// Creates an escrow arrangement with token bundles after approving all tokens,
    /// then revokes ERC1155 approvals.
    ///
    /// Returns:
    ///     Tuple of (approval_tx_hashes, LogWithHash, revoke_tx_hashes)
    pub fn approve_and_create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: TokenBundleData,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let (approval_receipts, escrow_receipt, revoke_receipts) = inner
                .escrow()
                .unconditional()
                .approve_and_create(
                    &price.try_into().map_err(map_eyre_to_pyerr)?,
                    &item.try_into().map_err(map_eyre_to_pyerr)?,
                    expiration,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok((
                approval_receipts
                    .iter()
                    .map(|r| r.transaction_hash.to_string())
                    .collect::<Vec<_>>(),
                LogWithHash::<AttestedLog> {
                    log: get_attested_event(escrow_receipt.clone())
                        .map_err(map_eyre_to_pyerr)?
                        .data
                        .into(),
                    transaction_hash: escrow_receipt.transaction_hash.to_string(),
                },
                revoke_receipts
                    .iter()
                    .map(|r| r.transaction_hash.to_string())
                    .collect::<Vec<_>>(),
            ))
        })
    }

    /// Collects payment from a fulfilled escrow.
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
                .unconditional()
                .collect(
                    buy_attestation.parse().map_err(map_parse_to_pyerr)?,
                    fulfillment.parse().map_err(map_parse_to_pyerr)?,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }

    /// Reclaims expired escrow funds.
    pub fn reclaim_expired<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .unconditional()
                .reclaim_expired(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }
}
