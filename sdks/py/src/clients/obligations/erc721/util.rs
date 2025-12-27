//! ERC721 utility functions for approvals

use alkahest_rs::extensions::Erc721Module;
use alloy::primitives::Address;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr};
use crate::types::Erc721Data;

/// Utility API for ERC721 tokens (approvals)
#[pyclass]
#[derive(Clone)]
pub struct Util {
    inner: Erc721Module,
}

impl Util {
    pub fn new(inner: Erc721Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Util {
    /// Approves a specific token for transfer.
    pub fn approve<'py>(
        &self,
        py: pyo3::Python<'py>,
        token: Erc721Data,
        purpose: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let purpose = match purpose.as_str() {
                "payment" => alkahest_rs::types::ApprovalPurpose::Payment,
                "escrow" => alkahest_rs::types::ApprovalPurpose::Escrow,
                "barter" => alkahest_rs::types::ApprovalPurpose::BarterUtils,
                _ => return Err(map_eyre_to_pyerr(eyre::eyre!("Invalid purpose"))),
            };
            let receipt = inner
                .util()
                .approve(&token.try_into().map_err(map_eyre_to_pyerr)?, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(receipt.transaction_hash.to_string())
        })
    }

    /// Approves all tokens from a contract for transfer.
    pub fn approve_all<'py>(
        &self,
        py: pyo3::Python<'py>,
        token_contract: String,
        purpose: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let token_contract: Address = token_contract.parse().map_err(map_parse_to_pyerr)?;
            let purpose = match purpose.as_str() {
                "payment" => alkahest_rs::types::ApprovalPurpose::Payment,
                "escrow" => alkahest_rs::types::ApprovalPurpose::Escrow,
                "barter" => alkahest_rs::types::ApprovalPurpose::BarterUtils,
                _ => return Err(map_eyre_to_pyerr(eyre::eyre!("Invalid purpose"))),
            };
            let receipt = inner
                .util()
                .approve_all(token_contract, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(receipt.transaction_hash.to_string())
        })
    }

    /// Revokes approval for all tokens from a contract.
    pub fn revoke_all<'py>(
        &self,
        py: pyo3::Python<'py>,
        token_contract: String,
        purpose: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let token_contract: Address = token_contract.parse().map_err(map_parse_to_pyerr)?;
            let purpose = match purpose.as_str() {
                "payment" => alkahest_rs::types::ApprovalPurpose::Payment,
                "escrow" => alkahest_rs::types::ApprovalPurpose::Escrow,
                "barter" => alkahest_rs::types::ApprovalPurpose::BarterUtils,
                _ => return Err(map_eyre_to_pyerr(eyre::eyre!("Invalid purpose"))),
            };
            let receipt = inner
                .util()
                .revoke_all(token_contract, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(receipt.transaction_hash.to_string())
        })
    }
}
