//! ERC1155 obligations module

pub mod barter_utils;
pub mod escrow;
pub mod payment;
pub mod util;

use alkahest_rs::extensions::Erc1155Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::map_parse_to_pyerr;

/// Client for interacting with ERC1155 token operations.
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
    /// Access escrow API
    #[getter]
    pub fn escrow(&self) -> escrow::Escrow {
        escrow::Escrow::new(self.inner.clone())
    }

    /// Access payment API
    #[getter]
    pub fn payment(&self) -> payment::Payment {
        payment::Payment::new(self.inner.clone())
    }

    /// Access barter utilities API
    #[getter]
    pub fn barter(&self) -> barter_utils::BarterUtils {
        barter_utils::BarterUtils::new(self.inner.clone())
    }

    /// Access utility API (approvals)
    #[getter]
    pub fn util(&self) -> util::Util {
        util::Util::new(self.inner.clone())
    }
}

// --- Obligation Data Types ---

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
