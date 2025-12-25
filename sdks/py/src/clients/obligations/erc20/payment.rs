//! ERC20 payment obligation client
//!
//! Provides functionality for making direct ERC20 token payments.

use alkahest_rs::extensions::Erc20Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{AttestedLog, Erc20Data, LogWithHash},
};

/// Payment API for ERC20 tokens
#[pyclass]
#[derive(Clone)]
pub struct Payment {
    inner: Erc20Module,
}

impl Payment {
    pub fn new(inner: Erc20Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Payment {
    /// Makes a direct payment with ERC20 tokens.
    ///
    /// Args:
    ///     price: The ERC20 token data for payment
    ///     payee: The address of the payment recipient
    ///
    /// Returns:
    ///     LogWithHash containing the attested event and transaction hash
    pub fn pay<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
        payee: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .payment()
                .pay(
                    &price.try_into().map_err(map_eyre_to_pyerr)?,
                    payee.parse().map_err(map_parse_to_pyerr)?,
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

    /// Makes a direct payment with ERC20 tokens using permit signature.
    ///
    /// Args:
    ///     price: The ERC20 token data for payment
    ///     payee: The address of the payment recipient
    ///
    /// Returns:
    ///     LogWithHash containing the attested event and transaction hash
    pub fn permit_and_pay<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
        payee: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .payment()
                .permit_and_pay(
                    &price.try_into().map_err(map_eyre_to_pyerr)?,
                    payee.parse().map_err(map_parse_to_pyerr)?,
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
