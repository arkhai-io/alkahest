//! Native Token obligations module
//!
//! This module provides functionality for native token (ETH) operations including:
//! - Escrow obligations (unconditional and default)
//! - Payment obligations
//! - Barter utilities for cross-token trading

pub mod barter_utils;
pub mod escrow;
pub mod payment;

use alkahest_rs::extensions::NativeTokenModule;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::map_parse_to_pyerr;

/// Client for interacting with native token (ETH) operations.
///
/// Provides access to escrow, payment, and barter APIs via properties:
/// - `client.native_token.escrow.default.create(...)`
/// - `client.native_token.payment.pay(...)`
/// - `client.native_token.barter.buy_erc20_for_native(...)`
#[pyclass]
#[derive(Clone)]
pub struct NativeTokenClient {
    inner: NativeTokenModule,
}

impl NativeTokenClient {
    pub fn new(inner: NativeTokenModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl NativeTokenClient {
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
}

// --- Obligation Data Types ---

#[pyclass]
#[derive(Clone)]
pub struct PyNativeTokenEscrowObligationData {
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
    /// uint256 amount represented as a decimal string to avoid loss of precision.
    #[pyo3(get)]
    pub amount: String,
}

#[pymethods]
impl PyNativeTokenEscrowObligationData {
    #[new]
    pub fn new(arbiter: String, demand: Vec<u8>, amount: String) -> Self {
        Self {
            arbiter,
            demand,
            amount,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyNativeTokenEscrowObligationData(arbiter='{}', amount='{}', demand={:?})",
            self.arbiter, self.amount, self.demand
        )
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyNativeTokenEscrowObligationData> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::NativeTokenEscrowObligation;
        use alloy::sol_types::SolValue;
        let decoded = NativeTokenEscrowObligation::ObligationData::abi_decode(&obligation_data)
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyNativeTokenEscrowObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::NativeTokenEscrowObligation;
        use alloy::{
            primitives::{Address, Bytes, U256},
            sol_types::SolValue,
        };

        let arbiter: Address = obligation.arbiter.parse().map_err(map_parse_to_pyerr)?;
        let amount: U256 = obligation.amount.parse().map_err(map_parse_to_pyerr)?;
        let demand = Bytes::from(obligation.demand.clone());

        let obligation_data = NativeTokenEscrowObligation::ObligationData {
            arbiter,
            demand,
            amount,
        };

        Ok(obligation_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyNativeTokenEscrowObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::default_escrow::NativeTokenEscrowObligation::ObligationData>
    for PyNativeTokenEscrowObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::default_escrow::NativeTokenEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            amount: data.amount.to_string(),
        }
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalNativeTokenEscrowObligation::ObligationData>
    for PyNativeTokenEscrowObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalNativeTokenEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            amount: data.amount.to_string(),
        }
    }
}
