//! ERC721 payment obligation client

use alkahest_rs::extensions::Erc721Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{AttestedLog, Erc721Data, LogWithHash},
};

/// Payment API for ERC721 tokens
#[pyclass]
#[derive(Clone)]
pub struct Payment {
    inner: Erc721Module,
}

impl Payment {
    pub fn new(inner: Erc721Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Payment {
    /// Makes a direct payment with an ERC721 token.
    pub fn pay<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc721Data,
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
}
