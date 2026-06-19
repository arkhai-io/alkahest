//! ERC721 atomic payment utilities.

use alkahest_rs::extensions::Erc721Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{AttestedLog, LogWithHash},
};

#[pyclass]
#[derive(Clone)]
pub struct BarterUtils {
    inner: Erc721Module,
}

impl BarterUtils {
    pub fn new(inner: Erc721Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl BarterUtils {
    pub fn pay_erc721_and_collect<'py>(
        &self,
        py: pyo3::Python<'py>,
        escrow_uid: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc721_and_collect(escrow_uid.parse().map_err(map_parse_to_pyerr)?)
                .await
                .map_err(map_eyre_to_pyerr)?;
            attested_with_hash(receipt)
        })
    }
}

fn attested_with_hash(
    receipt: alloy::rpc::types::TransactionReceipt,
) -> PyResult<LogWithHash<AttestedLog>> {
    Ok(LogWithHash::<AttestedLog> {
        log: get_attested_event(receipt.clone())
            .map_err(map_eyre_to_pyerr)?
            .data
            .into(),
        transaction_hash: receipt.transaction_hash.to_string(),
    })
}
