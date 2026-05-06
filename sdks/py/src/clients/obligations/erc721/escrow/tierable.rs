//! ERC721 tierable escrow obligation client
//!
//! Tierable escrows support multiple fulfillments per escrow (1:many relationship).

use alkahest_rs::extensions::Erc721Module;
use alloy::primitives::FixedBytes;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    clients::obligations::erc721::PyERC721EscrowObligationData,
    contract::PyDecodedAttestation,
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{ArbiterData, AttestedLog, Erc721Data, LogWithHash},
};

/// Tierable escrow API for ERC721 tokens (1:many escrow:fulfillment)
#[pyclass]
#[derive(Clone)]
pub struct Tierable {
    inner: Erc721Module,
}

impl Tierable {
    pub fn new(inner: Erc721Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Tierable {
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
                .tierable()
                .get_obligation(uid)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(PyDecodedAttestation::<PyERC721EscrowObligationData>::from(
                obligation,
            ))
        })
    }

    /// Creates an escrow arrangement with an ERC721 token.
    pub fn create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc721Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .tierable()
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

    /// Creates an escrow arrangement with ERC721 tokens after approving the token transfer.
    ///
    /// Returns:
    ///     Tuple of (approval_tx_hash, LogWithHash) containing approval hash and attested event
    pub fn approve_and_create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc721Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let (approval_receipt, escrow_receipt) = inner
                .escrow()
                .tierable()
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
                .tierable()
                .reclaim_expired(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }
}
