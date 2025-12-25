use alkahest_rs::extensions::Erc1155Module;
use alloy::primitives::Address;
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
pub struct Erc1155Client {
    inner: Erc1155Module,
}

impl Erc1155Client {
    pub fn new(inner: Erc1155Module) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Erc1155Client {
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

    pub fn collect_escrow<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
        fulfillment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .non_tierable()
                .collect(
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
                .escrow()
                .non_tierable()
                .reclaim_expired(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(receipt.transaction_hash.to_string())
        })
    }

    pub fn buy_with_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        price: Erc1155Data,
        item: ArbiterData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .escrow()
                .non_tierable()
                .create(
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

    pub fn pay_with_erc_1155<'py>(
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

    pub fn buy_erc1155_for_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc1155Data,
        ask: Erc1155Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_erc1155_for_erc1155(
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

    pub fn pay_erc1155_for_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc1155_for_erc1155(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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

    pub fn buy_erc20_with_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc1155Data,
        ask: Erc20Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_erc20_with_erc1155(
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

    pub fn pay_erc1155_for_erc20<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc1155_for_erc20(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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

    pub fn buy_erc721_with_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc1155Data,
        ask: Erc721Data,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_erc721_with_erc1155(
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

    pub fn pay_erc1155_for_erc721<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc1155_for_erc721(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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

    pub fn buy_bundle_with_erc1155<'py>(
        &self,
        py: pyo3::Python<'py>,
        bid: Erc1155Data,
        ask: TokenBundleData,
        expiration: u64,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .buy_bundle_with_erc1155(
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

    pub fn pay_erc1155_for_bundle<'py>(
        &self,
        py: pyo3::Python<'py>,
        buy_attestation: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let receipt = inner
                .barter()
                .pay_erc1155_for_bundle(buy_attestation.parse().map_err(map_parse_to_pyerr)?)
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
pub struct PyERC1155EscrowObligationData {
    #[pyo3(get)]
    pub token: String,
    #[pyo3(get)]
    pub token_id: String,
    #[pyo3(get)]
    pub amount: String,
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
}

#[pymethods]
impl PyERC1155EscrowObligationData {
    #[new]
    pub fn new(
        token: String,
        token_id: String,
        amount: String,
        arbiter: String,
        demand: Vec<u8>,
    ) -> Self {
        Self {
            token,
            token_id,
            amount,
            arbiter,
            demand,
        }
    }

    pub fn __repr__(&self) -> String {
        format!(
            "PyERC1155EscrowObligationData(token='{}', token_id='{}', amount='{}', arbiter='{}', demand={:?})",
            self.token, self.token_id, self.amount, self.arbiter, self.demand
        )
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyERC1155EscrowObligationData> {
        use alkahest_rs::contracts::obligations::escrow::non_tierable::ERC1155EscrowObligation;
        use alloy::sol_types::SolValue;
        let decoded = ERC1155EscrowObligation::ObligationData::abi_decode(&obligation_data)
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyERC1155EscrowObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::obligations::escrow::non_tierable::ERC1155EscrowObligation;
        use alloy::{
            primitives::{Address, Bytes, U256},
            sol_types::SolValue,
        };

        let token: Address = obligation.token.parse().map_err(map_parse_to_pyerr)?;
        let token_id: U256 = obligation.token_id.parse().map_err(map_parse_to_pyerr)?;
        let amount: U256 = obligation.amount.parse().map_err(map_parse_to_pyerr)?;
        let arbiter: Address = obligation.arbiter.parse().map_err(map_parse_to_pyerr)?;
        let demand = Bytes::from(obligation.demand.clone());

        let obligation_data = ERC1155EscrowObligation::ObligationData {
            token,
            tokenId: token_id,
            amount,
            arbiter,
            demand,
        };

        Ok(obligation_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyERC1155EscrowObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::non_tierable::ERC1155EscrowObligation::ObligationData>
    for PyERC1155EscrowObligationData
{
    fn from(data: alkahest_rs::contracts::obligations::escrow::non_tierable::ERC1155EscrowObligation::ObligationData) -> Self {
        Self {
            token: format!("{:?}", data.token),
            token_id: data.tokenId.to_string(),
            amount: data.amount.to_string(),
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
        }
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyERC1155PaymentObligationData {
    #[pyo3(get)]
    pub token: String,
    #[pyo3(get)]
    pub token_id: String,
    #[pyo3(get)]
    pub amount: String,
    #[pyo3(get)]
    pub payee: String,
}

#[pymethods]
impl PyERC1155PaymentObligationData {
    #[new]
    pub fn new(token: String, token_id: String, amount: String, payee: String) -> Self {
        Self {
            token,
            token_id,
            amount,
            payee,
        }
    }

    pub fn __repr__(&self) -> String {
        format!(
            "PyERC1155PaymentObligationData(token='{}', token_id='{}', amount='{}', payee='{}')",
            self.token, self.token_id, self.amount, self.payee
        )
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyERC1155PaymentObligationData> {
        use alkahest_rs::contracts::obligations::ERC1155PaymentObligation;
        use alloy::sol_types::SolValue;
        let decoded = ERC1155PaymentObligation::ObligationData::abi_decode(&obligation_data)
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyERC1155PaymentObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::obligations::ERC1155PaymentObligation;
        use alloy::{
            primitives::{Address, U256},
            sol_types::SolValue,
        };

        let token: Address = obligation.token.parse().map_err(map_parse_to_pyerr)?;
        let token_id: U256 = obligation.token_id.parse().map_err(map_parse_to_pyerr)?;
        let amount: U256 = obligation.amount.parse().map_err(map_parse_to_pyerr)?;
        let payee: Address = obligation.payee.parse().map_err(map_parse_to_pyerr)?;

        let obligation_data = ERC1155PaymentObligation::ObligationData {
            token,
            tokenId: token_id,
            amount,
            payee,
        };

        Ok(obligation_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyERC1155PaymentObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::ERC1155PaymentObligation::ObligationData>
    for PyERC1155PaymentObligationData
{
    fn from(data: alkahest_rs::contracts::obligations::ERC1155PaymentObligation::ObligationData) -> Self {
        Self {
            token: format!("{:?}", data.token),
            token_id: data.tokenId.to_string(),
            amount: data.amount.to_string(),
            payee: format!("{:?}", data.payee),
        }
    }
}
