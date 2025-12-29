//! ERC20 barter utilities
//!
//! Provides methods for trading ERC20 tokens for other token types.

use alkahest_rs::extensions::Erc20Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{AttestedLog, Erc1155Data, Erc20Data, Erc721Data, LogWithHash, TokenBundleData},
};

/// Barter utilities API for ERC20 tokens
#[pyclass]
#[derive(Clone)]
pub struct BarterUtils {
    inner: Erc20Module,
}

impl BarterUtils {
    pub fn new(inner: Erc20Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl BarterUtils {
    // --- ERC20 for ERC20 ---

    pub fn buy_erc20_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: Erc20Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_erc20_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn permit_and_buy_erc20_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: Erc20Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_buy_erc20_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn pay_erc20_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc20_for_erc20(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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

    pub fn permit_and_pay_erc20_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_pay_erc20_for_erc20(
                    buy_attestation.parse().map_err(map_parse_to_pyerr)?,
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

    // --- ERC20 for ERC721 ---

    pub fn buy_erc721_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: Erc721Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_erc721_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn permit_and_buy_erc721_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: Erc721Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_buy_erc721_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn pay_erc20_for_erc721<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc20_for_erc721(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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

    pub fn permit_and_pay_erc20_for_erc721<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_pay_erc20_for_erc721(
                    buy_attestation.parse().map_err(map_parse_to_pyerr)?,
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

    // --- ERC20 for ERC1155 ---

    pub fn buy_erc1155_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: Erc1155Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_erc1155_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn permit_and_buy_erc1155_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: Erc1155Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_buy_erc1155_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn pay_erc20_for_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc20_for_erc1155(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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

    pub fn permit_and_pay_erc20_for_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_pay_erc20_for_erc1155(
                    buy_attestation.parse().map_err(map_parse_to_pyerr)?,
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

    // --- ERC20 for TokenBundle ---

    pub fn buy_bundle_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: TokenBundleData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_bundle_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn permit_and_buy_bundle_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc20Data,
        ask: TokenBundleData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_buy_bundle_for_erc20(
                    &bid.try_into().map_err(map_eyre_to_pyerr)?,
                    &ask.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn pay_erc20_for_bundle<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc20_for_bundle(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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

    pub fn permit_and_pay_erc20_for_bundle<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .permit_and_pay_erc20_for_bundle(
                    buy_attestation.parse().map_err(map_parse_to_pyerr)?,
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
}
