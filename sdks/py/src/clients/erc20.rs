use alkahest_rs::extensions::Erc20Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
    get_attested_event,
    types::{
        ArbiterData, AttestedLog, Erc1155Data, Erc20Data, Erc721Data, LogWithHash, TokenBundleData,
    },
};

#[pyclass]
#[derive(Clone)]
pub struct Erc20Client {
    inner: Erc20Module,
}

impl Erc20Client {
    pub fn new(inner: Erc20Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Erc20Client {
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
                _ => return Err(pyo3::exceptions::PyValueError::new_err("Invalid purpose")),
            };
            let receipt = inner
                .approve(&token.try_into().map_err(map_eyre_to_pyerr)?, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(receipt.transaction_hash.to_string())
        })
    }

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
                _ => return Err(pyo3::exceptions::PyValueError::new_err("Invalid purpose")),
            };
            let receipt = inner
                .approve_if_less(&token.try_into().map_err(map_eyre_to_pyerr)?, purpose)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(receipt.map(|x| x.transaction_hash.to_string()))
        })
    }

    pub fn collect_escrow<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
        fulfillment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .collect_escrow(
                    buy_attestation.parse().map_err(map_parse_to_pyerr)?,
                    fulfillment.parse().map_err(map_parse_to_pyerr)?,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }

    pub fn reclaim_expired<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .reclaim_expired(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }

    pub fn buy_with_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .buy_with_erc20(
                    &price.try_into().map_err(map_eyre_to_pyerr)?,
                    &item.try_into().map_err(map_eyre_to_pyerr)?,
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

    pub fn permit_and_buy_with_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let price: alkahest_rs::types::Erc20Data =
                price.try_into().map_err(map_eyre_to_pyerr)?;
            let item: alkahest_rs::types::ArbiterData =
                item.try_into().map_err(map_eyre_to_pyerr)?;

            match inner
                .permit_and_buy_with_erc20(&price, &item, expiration)
                .await
            {
                Ok(receipt) => Ok(LogWithHash::<AttestedLog> {
                    log: get_attested_event(receipt.clone())
                        .map_err(map_eyre_to_pyerr)?
                        .data
                        .into(),
                    transaction_hash: receipt.transaction_hash.to_string(),
                }),
                Err(e) => {
                    Err(map_eyre_to_pyerr(e))
                }
            }
        })
    }

    pub fn pay_with_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
        payee: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .pay_with_erc20(
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

    pub fn permit_and_pay_with_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc20Data,
        payee: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .permit_and_pay_with_erc20(
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

#[pyclass]
#[derive(Clone)]
pub struct PyERC20EscrowObligationData {
    #[pyo3(get)]
    pub token: String,
    #[pyo3(get)]
    pub amount: u64,
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
}

#[pymethods]
impl PyERC20EscrowObligationData {
    #[new]
    pub fn new(token: String, amount: u64, arbiter: String, demand: Vec<u8>) -> Self {
        Self {
            token,
            amount,
            arbiter,
            demand,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyERC20EscrowObligationData(token='{}', amount={}, arbiter='{}', demand={:?})",
            self.token, self.amount, self.arbiter, self.demand
        )
    }
    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> eyre::Result<PyERC20EscrowObligationData> {
        use alloy::primitives::Bytes;
        let bytes = Bytes::from(obligation_data);
        let decoded = alkahest_rs::extensions::Erc20Module::decode_escrow_obligation(&bytes)?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyERC20EscrowObligationData) -> eyre::Result<Vec<u8>> {
        use alkahest_rs::contracts::ERC20EscrowObligation;
        use alloy::{
            primitives::{Address, Bytes, U256},
            sol_types::SolValue,
        };

        let token: Address = obligation.token.parse()?;
        let amount: U256 = U256::from(obligation.amount);
        let arbiter: Address = obligation.arbiter.parse()?;
        let demand = Bytes::from(obligation.demand.clone());

        let obligation_data = ERC20EscrowObligation::ObligationData {
            token,
            amount,
            arbiter,
            demand,
        };

        Ok(obligation_data.abi_encode())
    }

    pub fn encode_self(&self) -> eyre::Result<Vec<u8>> {
        PyERC20EscrowObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::ERC20EscrowObligation::ObligationData>
    for PyERC20EscrowObligationData
{
    fn from(data: alkahest_rs::contracts::ERC20EscrowObligation::ObligationData) -> Self {
        Self {
            token: format!("{:?}", data.token),
            amount: data.amount.try_into().unwrap_or(0), // Handle potential overflow
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
        }
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyERC20PaymentObligationData {
    #[pyo3(get)]
    pub token: String,
    #[pyo3(get)]
    pub amount: u64,
    #[pyo3(get)]
    pub payee: String,
}

#[pymethods]
impl PyERC20PaymentObligationData {
    #[new]
    pub fn new(token: String, amount: u64, payee: String) -> Self {
        Self {
            token,
            amount,
            payee,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyERC20PaymentObligationData(token='{}', amount={}, payee='{}')",
            self.token, self.amount, self.payee
        )
    }

    #[staticmethod]
    pub fn encode(obligation: &PyERC20PaymentObligationData) -> eyre::Result<Vec<u8>> {
        use alkahest_rs::contracts::ERC20PaymentObligation;
        use alloy::{
            primitives::{Address, U256},
            sol_types::SolValue,
        };

        let token: Address = obligation.token.parse()?;
        let amount: U256 = U256::from(obligation.amount);
        let payee: Address = obligation.payee.parse().map_err(map_parse_to_pyerr)?;

        let obligation_data = ERC20PaymentObligation::ObligationData {
            token,
            amount,
            payee,
        };

        Ok(obligation_data.abi_encode())
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> eyre::Result<PyERC20PaymentObligationData> {
        use alloy::primitives::Bytes;
        let bytes = Bytes::from(obligation_data);
        let decoded = alkahest_rs::extensions::Erc20Module::decode_payment_obligation(&bytes)?;
        Ok(decoded.into())
    }

    pub fn encode_self(&self) -> eyre::Result<Vec<u8>> {
        PyERC20PaymentObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::ERC20PaymentObligation::ObligationData>
    for PyERC20PaymentObligationData
{
    fn from(data: alkahest_rs::contracts::ERC20PaymentObligation::ObligationData) -> Self {
        Self {
            token: format!("{:?}", data.token),
            amount: data.amount.try_into().unwrap_or(0), // Handle potential overflow
            payee: format!("{:?}", data.payee),
        }
    }
}
