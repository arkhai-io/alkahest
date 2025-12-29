//! ERC20 utility functions for approvals

use alkahest_rs::extensions::Erc20Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{error_handling::map_eyre_to_pyerr, types::Erc20Data};

/// Utility API for ERC20 tokens (approvals)
#[pyclass]
#[derive(Clone)]
pub struct Util {
    inner: Erc20Module,
}

impl Util {
    pub fn new(inner: Erc20Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Util {
    /// Approves token spending for payment or escrow purposes.
    ///
    /// Args:
    ///     token: The token data including address and amount
    ///     purpose: Either "payment" or "escrow"
    ///
    /// Returns:
    ///     Transaction hash as string
    pub fn approve<'py>(
        &self,
        py: pyo3::Python<'py>,
        token: Erc20Data,
        purpose: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let purpose = match purpose.as_str() {
                "payment" => alkahest_rs::types::ApprovalPurpose::Payment,
                "escrow" => alkahest_rs::types::ApprovalPurpose::Escrow,
                "barter" => alkahest_rs::types::ApprovalPurpose::BarterUtils,
                _ => return Err(pyo3::exceptions::PyValueError::new_err("Invalid purpose")),
            };
            let receipt = inner
                .util()
                .approve(&token.try_into().map_err(map_eyre_to_pyerr)?, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(receipt.transaction_hash.to_string())
        })
    }

    /// Approves token spending if current allowance is less than required amount.
    ///
    /// Args:
    ///     token: The token data including address and amount
    ///     purpose: Either "payment" or "escrow"
    ///
    /// Returns:
    ///     Transaction hash as string if approval was needed, None otherwise
    pub fn approve_if_less<'py>(
        &self,
        py: pyo3::Python<'py>,
        token: Erc20Data,
        purpose: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let purpose = match purpose.as_str() {
                "payment" => alkahest_rs::types::ApprovalPurpose::Payment,
                "escrow" => alkahest_rs::types::ApprovalPurpose::Escrow,
                "barter" => alkahest_rs::types::ApprovalPurpose::BarterUtils,
                _ => return Err(pyo3::exceptions::PyValueError::new_err("Invalid purpose")),
            };
            let receipt = inner
                .util()
                .approve_if_less(&token.try_into().map_err(map_eyre_to_pyerr)?, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(receipt.map(|x| x.transaction_hash.to_string()))
        })
    }
}
