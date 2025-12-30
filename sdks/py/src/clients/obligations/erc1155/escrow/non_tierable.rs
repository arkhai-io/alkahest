//! ERC1155 non-tierable escrow obligation client

use alkahest_rs::extensions::Erc1155Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{ArbiterData, AttestedLog, Erc1155Data, LogWithHash},
};

/// Non-tierable escrow API for ERC1155 tokens (1:1 escrow:fulfillment)
#[pyclass]
#[derive(Clone)]
pub struct NonTierable {
    inner: Erc1155Module,
}

impl NonTierable {
    pub fn new(inner: Erc1155Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl NonTierable {
    /// Creates an escrow arrangement with ERC1155 tokens.
    pub fn create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc1155Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .non_tierable()
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

    /// Creates an escrow arrangement with ERC1155 tokens after approving, then revokes approval.
    ///
    /// Returns:
    ///     Tuple of (approval_tx_hash, LogWithHash, revoke_tx_hash)
    pub fn approve_and_create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc1155Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let (approval_receipt, escrow_receipt, revoke_receipt) = inner
                .escrow()
                .non_tierable()
                .approve_and_create(
                    &price.try_into().map_err(map_eyre_to_pyerr)?,
                    &item.try_into().map_err(map_eyre_to_pyerr)?,
                    expiration,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok((
                approval_receipt.transaction_hash.to_string(),
                LogWithHash::<AttestedLog> {
                    log: get_attested_event(escrow_receipt.clone())
                        .map_err(map_eyre_to_pyerr)?
                        .data
                        .into(),
                    transaction_hash: escrow_receipt.transaction_hash.to_string(),
                },
                revoke_receipt.transaction_hash.to_string(),
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
                .non_tierable()
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
                .non_tierable()
                .reclaim_expired(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }
}
