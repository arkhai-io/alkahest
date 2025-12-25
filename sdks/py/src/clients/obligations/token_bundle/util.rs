//! TokenBundle utility functions for approvals

use alkahest_rs::extensions::TokenBundleModule;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::map_eyre_to_pyerr;
use crate::types::TokenBundleData;

/// Utility API for TokenBundle (approvals)
#[pyclass]
#[derive(Clone)]
pub struct Util {
    inner: TokenBundleModule,
}

impl Util {
    pub fn new(inner: TokenBundleModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Util {
    /// Approves all tokens in the bundle for transfer.
    pub fn approve<'py>(
        &self,
        py: pyo3::Python<'py>,
        token: TokenBundleData,
        purpose: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let purpose = match purpose.as_str() {
                "payment" => alkahest_rs::types::ApprovalPurpose::Payment,
                "escrow" => alkahest_rs::types::ApprovalPurpose::Escrow,
                _ => return Err(map_eyre_to_pyerr(eyre::eyre!("Invalid purpose"))),
            };
            let receipts = inner
                .util()
                .approve(&token.try_into().map_err(map_eyre_to_pyerr)?, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            // Return the transaction hash of the last receipt, or empty string if no receipts
            match receipts.last() {
                Some(receipt) => Ok(receipt.transaction_hash.to_string()),
                None => Ok("".to_string()),
            }
        })
    }
}
