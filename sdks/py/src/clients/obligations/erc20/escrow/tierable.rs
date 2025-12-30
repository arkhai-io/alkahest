//! ERC20 tierable escrow obligation client
//!
//! Tierable escrows support multiple fulfillments per escrow (1:many relationship).

use alkahest_rs::extensions::Erc20Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{ArbiterData, AttestedLog, Erc20Data, LogWithHash},
};

/// Tierable escrow API for ERC20 tokens (1:many escrow:fulfillment)
#[pyclass]
#[derive(Clone)]
pub struct Tierable {
    inner: Erc20Module,
}

impl Tierable {
    pub fn new(inner: Erc20Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Tierable {
    /// Creates an escrow arrangement with ERC20 tokens for a custom demand.
    ///
    /// Args:
    ///     price: The ERC20 token data for the escrow
    ///     item: The arbiter data specifying fulfillment requirements
    ///     expiration: Unix timestamp for escrow expiration
    ///
    /// Returns:
    ///     LogWithHash containing the attested event and transaction hash
    pub fn create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
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

    /// Creates an escrow arrangement with ERC20 tokens after approving the token transfer.
    ///
    /// Args:
    ///     price: The ERC20 token data for the escrow
    ///     item: The arbiter data specifying fulfillment requirements
    ///     expiration: Unix timestamp for escrow expiration
    ///
    /// Returns:
    ///     Tuple of (approval_tx_hash, LogWithHash) containing approval hash and attested event
    pub fn approve_and_create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
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

    /// Creates an escrow with permit signature (no pre-approval needed).
    ///
    /// Args:
    ///     price: The ERC20 token data for the escrow
    ///     item: The arbiter data specifying fulfillment requirements
    ///     expiration: Unix timestamp for escrow expiration
    ///
    /// Returns:
    ///     LogWithHash containing the attested event and transaction hash
    pub fn permit_and_create<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let price: alkahest_rs::types::Erc20Data =
                price.try_into().map_err(map_eyre_to_pyerr)?;
            let item: alkahest_rs::types::ArbiterData =
                item.try_into().map_err(map_eyre_to_pyerr)?;

            match inner
                .escrow()
                .tierable()
                .permit_and_create(&price, &item, expiration)
                .await
            {
                Ok(receipt) => Ok(LogWithHash::<AttestedLog> {
                    log: get_attested_event(receipt.clone())
                        .map_err(map_eyre_to_pyerr)?
                        .data
                        .into(),
                    transaction_hash: receipt.transaction_hash.to_string(),
                }),
                Err(e) => Err(map_eyre_to_pyerr(e)),
            }
        })
    }

    /// Collects payment from a fulfilled escrow.
    ///
    /// Args:
    ///     buy_attestation: The UID of the escrow attestation
    ///     fulfillment: The UID of the fulfillment attestation
    ///
    /// Returns:
    ///     Transaction hash as string
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

    /// Reclaims expired escrow funds after expiration time has passed.
    ///
    /// Args:
    ///     buy_attestation: The UID of the escrow attestation
    ///
    /// Returns:
    ///     Transaction hash as string
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
