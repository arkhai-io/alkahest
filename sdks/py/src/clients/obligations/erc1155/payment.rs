//! ERC1155 payment obligation client

use alkahest_rs::extensions::Erc1155Module;
use alloy::primitives::Address;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{AttestedLog, Erc1155Data, LogWithHash},
};

/// Payment API for ERC1155 tokens
#[pyclass]
#[derive(Clone)]
pub struct Payment {
    inner: Erc1155Module,
}

impl Payment {
    pub fn new(inner: Erc1155Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Payment {
    /// Makes a direct payment with ERC1155 tokens.
    pub fn pay<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc1155Data,
        payee: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let payee: Address = payee.parse().map_err(map_parse_to_pyerr)?;
            let receipt = inner
                .payment()
                .pay(&price.try_into().map_err(map_eyre_to_pyerr)?, payee)
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
