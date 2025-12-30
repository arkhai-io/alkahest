//! ERC20 utility functions for permits and approvals

use alkahest_rs::extensions::Erc20Module;
use alloy::primitives::U256;
use pyo3::{pyclass, pymethods, PyResult};
use std::time::{SystemTime, UNIX_EPOCH};

use crate::{error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr}, types::Erc20Data};

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

    /// Get a permit signature for token approval.
    ///
    /// Args:
    ///     spender: The address being approved to spend tokens
    ///     token: The token data including address and amount
    ///     deadline: The timestamp until which the permit is valid
    ///
    /// Returns:
    ///     dict with v, r, s signature components
    pub fn get_permit_signature<'py>(
        &self,
        py: pyo3::Python<'py>,
        spender: String,
        token: Erc20Data,
        deadline: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let spender_addr = spender.parse().map_err(map_parse_to_pyerr)?;
            let deadline_u256 = U256::from(deadline);
            let signature = inner
                .util()
                .get_permit_signature(
                    spender_addr,
                    &token.try_into().map_err(map_eyre_to_pyerr)?,
                    deadline_u256,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;

            // Return signature components as a dict-compatible tuple
            // v() returns bool (y_parity), convert to EIP-2612 format (27 or 28)
            let v: u8 = if signature.v() { 28 } else { 27 };
            let r = format!("0x{:064x}", signature.r());
            let s = format!("0x{:064x}", signature.s());
            Ok((v, r, s))
        })
    }

    /// Helper to get permit deadline (current time + 1 hour)
    ///
    /// Returns:
    ///     Unix timestamp as int
    #[staticmethod]
    pub fn get_permit_deadline() -> PyResult<u64> {
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs() + 3600)
            .map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(e.to_string()))
    }
}
