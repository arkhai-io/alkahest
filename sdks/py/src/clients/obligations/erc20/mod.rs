//! ERC20 obligations module
//!
//! This module provides functionality for ERC20 token operations including:
//! - Escrow obligations (non-tierable)
//! - Payment obligations
//! - Barter utilities for cross-token trading
//! - Utility functions for permits and approvals

pub mod barter_utils;
pub mod escrow;
pub mod payment;
pub mod util;

use alkahest_rs::extensions::Erc20Module;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr};

/// Client for interacting with ERC20 token operations.
///
/// Provides access to escrow, payment, barter, and utility APIs via properties:
/// - `client.erc20.escrow.non_tierable.create(...)`
/// - `client.erc20.payment.pay(...)`
/// - `client.erc20.barter.buy_erc20_for_erc20(...)`
/// - `client.erc20.util.approve(...)`
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

    /// Access utility API (permits and approvals)
    #[getter]
    pub fn util(&self) -> util::Util {
        util::Util::new(self.inner.clone())
    }
}

// --- Obligation Data Types ---

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
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyERC20EscrowObligationData> {
        use alkahest_rs::contracts::obligations::escrow::non_tierable::ERC20EscrowObligation;
        use alloy::sol_types::SolValue;
        let decoded = ERC20EscrowObligation::ObligationData::abi_decode(&obligation_data)
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyERC20EscrowObligationData) -> eyre::Result<Vec<u8>> {
        use alkahest_rs::contracts::obligations::escrow::non_tierable::ERC20EscrowObligation;
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

impl From<alkahest_rs::contracts::obligations::escrow::non_tierable::ERC20EscrowObligation::ObligationData>
    for PyERC20EscrowObligationData
{
    fn from(data: alkahest_rs::contracts::obligations::escrow::non_tierable::ERC20EscrowObligation::ObligationData) -> Self {
        Self {
            token: format!("{:?}", data.token),
            amount: data.amount.try_into().unwrap_or(0),
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
        use alkahest_rs::contracts::obligations::ERC20PaymentObligation;
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
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyERC20PaymentObligationData> {
        use alkahest_rs::contracts::obligations::ERC20PaymentObligation;
        use alloy::sol_types::SolValue;
        let decoded = ERC20PaymentObligation::ObligationData::abi_decode(&obligation_data)
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    pub fn encode_self(&self) -> eyre::Result<Vec<u8>> {
        PyERC20PaymentObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::ERC20PaymentObligation::ObligationData>
    for PyERC20PaymentObligationData
{
    fn from(data: alkahest_rs::contracts::obligations::ERC20PaymentObligation::ObligationData) -> Self {
        Self {
            token: format!("{:?}", data.token),
            amount: data.amount.try_into().unwrap_or(0),
            payee: format!("{:?}", data.payee),
        }
    }
}
