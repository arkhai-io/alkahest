//! TokenBundle payment obligation client

use alkahest_rs::extensions::TokenBundleModule;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{AttestedLog, LogWithHash, TokenBundleData},
};

/// Payment API for TokenBundle
#[pyclass]
#[derive(Clone)]
pub struct Payment {
    inner: TokenBundleModule,
}

impl Payment {
    pub fn new(inner: TokenBundleModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Payment {
    /// Makes a direct payment with a token bundle.
    pub fn pay<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: TokenBundleData,
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

    /// Makes a direct payment with token bundles after approving all tokens,
    /// then revokes ERC1155 approvals.
    ///
    /// Returns:
    ///     Tuple of (approval_tx_hashes, LogWithHash, revoke_tx_hashes)
    pub fn approve_and_pay<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: TokenBundleData,
        payee: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let (approval_receipts, payment_receipt, revoke_receipts) = inner
                .payment()
                .approve_and_pay(
                    &price.try_into().map_err(map_eyre_to_pyerr)?,
                    payee.parse().map_err(map_parse_to_pyerr)?,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok((
                approval_receipts
                    .iter()
                    .map(|r| r.transaction_hash.to_string())
                    .collect::<Vec<_>>(),
                LogWithHash::<AttestedLog> {
                    log: get_attested_event(payment_receipt.clone())
                        .map_err(map_eyre_to_pyerr)?
                        .data
                        .into(),
                    transaction_hash: payment_receipt.transaction_hash.to_string(),
                },
                revoke_receipts
                    .iter()
                    .map(|r| r.transaction_hash.to_string())
                    .collect::<Vec<_>>(),
            ))
        })
    }
}
