//! TokenBundle obligations module

pub mod escrow;
pub mod payment;
pub mod util;

use alkahest_rs::extensions::TokenBundleModule;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::map_parse_to_pyerr;

/// Client for interacting with TokenBundle operations.
#[pyclass]
#[derive(Clone)]
pub struct TokenBundleClient {
    inner: TokenBundleModule,
}

impl TokenBundleClient {
    pub fn new(inner: TokenBundleModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl TokenBundleClient {
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

    /// Access utility API (approvals)
    #[getter]
    pub fn util(&self) -> util::Util {
        util::Util::new(self.inner.clone())
    }
}

// --- Obligation Data Types ---

/// Represents the on-chain TokenBundle escrow obligation data.
///
/// uint256 fields are represented as decimal strings since the values can
/// exceed u64/u128 limits (matches the convention used by ERC1155 escrow).
#[pyclass]
#[derive(Clone)]
pub struct PyTokenBundleEscrowObligationData {
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
    #[pyo3(get)]
    pub native_amount: String,
    #[pyo3(get)]
    pub erc20_tokens: Vec<String>,
    #[pyo3(get)]
    pub erc20_amounts: Vec<String>,
    #[pyo3(get)]
    pub erc721_tokens: Vec<String>,
    #[pyo3(get)]
    pub erc721_token_ids: Vec<String>,
    #[pyo3(get)]
    pub erc1155_tokens: Vec<String>,
    #[pyo3(get)]
    pub erc1155_token_ids: Vec<String>,
    #[pyo3(get)]
    pub erc1155_amounts: Vec<String>,
}

#[pyclass]
#[derive(Clone)]
pub struct PyTokenBundlePaymentObligationData {
    #[pyo3(get)]
    pub native_amount: String,
    #[pyo3(get)]
    pub erc20_tokens: Vec<String>,
    #[pyo3(get)]
    pub erc20_amounts: Vec<String>,
    #[pyo3(get)]
    pub erc721_tokens: Vec<String>,
    #[pyo3(get)]
    pub erc721_token_ids: Vec<String>,
    #[pyo3(get)]
    pub erc1155_tokens: Vec<String>,
    #[pyo3(get)]
    pub erc1155_token_ids: Vec<String>,
    #[pyo3(get)]
    pub erc1155_amounts: Vec<String>,
    #[pyo3(get)]
    pub payee: String,
}

#[pymethods]
impl PyTokenBundlePaymentObligationData {
    #[new]
    pub fn new(
        native_amount: String,
        erc20_tokens: Vec<String>,
        erc20_amounts: Vec<String>,
        erc721_tokens: Vec<String>,
        erc721_token_ids: Vec<String>,
        erc1155_tokens: Vec<String>,
        erc1155_token_ids: Vec<String>,
        erc1155_amounts: Vec<String>,
        payee: String,
    ) -> Self {
        Self {
            native_amount,
            erc20_tokens,
            erc20_amounts,
            erc721_tokens,
            erc721_token_ids,
            erc1155_tokens,
            erc1155_token_ids,
            erc1155_amounts,
            payee,
        }
    }

    #[staticmethod]
    pub fn encode(obligation: &PyTokenBundlePaymentObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::obligations::TokenBundlePaymentObligation;
        use alloy::{
            primitives::{Address, U256},
            sol_types::SolValue,
        };

        fn parse_addresses(values: &[String]) -> PyResult<Vec<Address>> {
            values
                .iter()
                .map(|value| value.parse().map_err(map_parse_to_pyerr))
                .collect()
        }

        fn parse_u256s(values: &[String]) -> PyResult<Vec<U256>> {
            values
                .iter()
                .map(|value| value.parse().map_err(map_parse_to_pyerr))
                .collect()
        }

        Ok(TokenBundlePaymentObligation::ObligationData {
            nativeAmount: obligation
                .native_amount
                .parse()
                .map_err(map_parse_to_pyerr)?,
            erc20Tokens: parse_addresses(&obligation.erc20_tokens)?,
            erc20Amounts: parse_u256s(&obligation.erc20_amounts)?,
            erc721Tokens: parse_addresses(&obligation.erc721_tokens)?,
            erc721TokenIds: parse_u256s(&obligation.erc721_token_ids)?,
            erc1155Tokens: parse_addresses(&obligation.erc1155_tokens)?,
            erc1155TokenIds: parse_u256s(&obligation.erc1155_token_ids)?,
            erc1155Amounts: parse_u256s(&obligation.erc1155_amounts)?,
            payee: obligation.payee.parse().map_err(map_parse_to_pyerr)?,
        }
        .abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyTokenBundlePaymentObligationData::encode(self)
    }
}

#[pymethods]
impl PyTokenBundleEscrowObligationData {
    #[new]
    pub fn new(
        arbiter: String,
        demand: Vec<u8>,
        native_amount: String,
        erc20_tokens: Vec<String>,
        erc20_amounts: Vec<String>,
        erc721_tokens: Vec<String>,
        erc721_token_ids: Vec<String>,
        erc1155_tokens: Vec<String>,
        erc1155_token_ids: Vec<String>,
        erc1155_amounts: Vec<String>,
    ) -> Self {
        Self {
            arbiter,
            demand,
            native_amount,
            erc20_tokens,
            erc20_amounts,
            erc721_tokens,
            erc721_token_ids,
            erc1155_tokens,
            erc1155_token_ids,
            erc1155_amounts,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyTokenBundleEscrowObligationData(arbiter='{}', native_amount='{}', erc20s={}, erc721s={}, erc1155s={})",
            self.arbiter,
            self.native_amount,
            self.erc20_tokens.len(),
            self.erc721_tokens.len(),
            self.erc1155_tokens.len()
        )
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyTokenBundleEscrowObligationData> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::TokenBundleEscrowObligation;
        use alloy::sol_types::SolValue;
        let decoded = TokenBundleEscrowObligation::ObligationData::abi_decode(&obligation_data)
            .map_err(|e| pyo3::exceptions::PyValueError::new_err(e.to_string()))?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(obligation: &PyTokenBundleEscrowObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::obligations::escrow::default_escrow::TokenBundleEscrowObligation;
        use alloy::{
            primitives::{Address, Bytes, U256},
            sol_types::SolValue,
        };

        let arbiter: Address = obligation.arbiter.parse().map_err(map_parse_to_pyerr)?;
        let demand = Bytes::from(obligation.demand.clone());
        let native_amount: U256 = obligation
            .native_amount
            .parse()
            .map_err(map_parse_to_pyerr)?;

        let erc20_tokens: Vec<Address> = obligation
            .erc20_tokens
            .iter()
            .map(|s| s.parse())
            .collect::<Result<_, _>>()
            .map_err(map_parse_to_pyerr)?;
        let erc20_amounts: Vec<U256> = obligation
            .erc20_amounts
            .iter()
            .map(|s| s.parse())
            .collect::<Result<_, _>>()
            .map_err(map_parse_to_pyerr)?;
        let erc721_tokens: Vec<Address> = obligation
            .erc721_tokens
            .iter()
            .map(|s| s.parse())
            .collect::<Result<_, _>>()
            .map_err(map_parse_to_pyerr)?;
        let erc721_token_ids: Vec<U256> = obligation
            .erc721_token_ids
            .iter()
            .map(|s| s.parse())
            .collect::<Result<_, _>>()
            .map_err(map_parse_to_pyerr)?;
        let erc1155_tokens: Vec<Address> = obligation
            .erc1155_tokens
            .iter()
            .map(|s| s.parse())
            .collect::<Result<_, _>>()
            .map_err(map_parse_to_pyerr)?;
        let erc1155_token_ids: Vec<U256> = obligation
            .erc1155_token_ids
            .iter()
            .map(|s| s.parse())
            .collect::<Result<_, _>>()
            .map_err(map_parse_to_pyerr)?;
        let erc1155_amounts: Vec<U256> = obligation
            .erc1155_amounts
            .iter()
            .map(|s| s.parse())
            .collect::<Result<_, _>>()
            .map_err(map_parse_to_pyerr)?;

        let obligation_data = TokenBundleEscrowObligation::ObligationData {
            arbiter,
            demand,
            nativeAmount: native_amount,
            erc20Tokens: erc20_tokens,
            erc20Amounts: erc20_amounts,
            erc721Tokens: erc721_tokens,
            erc721TokenIds: erc721_token_ids,
            erc1155Tokens: erc1155_tokens,
            erc1155TokenIds: erc1155_token_ids,
            erc1155Amounts: erc1155_amounts,
        };

        Ok(obligation_data.abi_encode())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyTokenBundleEscrowObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::default_escrow::TokenBundleEscrowObligation::ObligationData>
    for PyTokenBundleEscrowObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::default_escrow::TokenBundleEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            native_amount: data.nativeAmount.to_string(),
            erc20_tokens: data.erc20Tokens.iter().map(|a| format!("{:?}", a)).collect(),
            erc20_amounts: data.erc20Amounts.iter().map(|x| x.to_string()).collect(),
            erc721_tokens: data.erc721Tokens.iter().map(|a| format!("{:?}", a)).collect(),
            erc721_token_ids: data.erc721TokenIds.iter().map(|x| x.to_string()).collect(),
            erc1155_tokens: data.erc1155Tokens.iter().map(|a| format!("{:?}", a)).collect(),
            erc1155_token_ids: data.erc1155TokenIds.iter().map(|x| x.to_string()).collect(),
            erc1155_amounts: data.erc1155Amounts.iter().map(|x| x.to_string()).collect(),
        }
    }
}

impl From<alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalTokenBundleEscrowObligation::ObligationData>
    for PyTokenBundleEscrowObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::escrow::unconditional::UnconditionalTokenBundleEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: format!("{:?}", data.arbiter),
            demand: data.demand.to_vec(),
            native_amount: data.nativeAmount.to_string(),
            erc20_tokens: data.erc20Tokens.iter().map(|a| format!("{:?}", a)).collect(),
            erc20_amounts: data.erc20Amounts.iter().map(|x| x.to_string()).collect(),
            erc721_tokens: data.erc721Tokens.iter().map(|a| format!("{:?}", a)).collect(),
            erc721_token_ids: data.erc721TokenIds.iter().map(|x| x.to_string()).collect(),
            erc1155_tokens: data.erc1155Tokens.iter().map(|a| format!("{:?}", a)).collect(),
            erc1155_token_ids: data.erc1155TokenIds.iter().map(|x| x.to_string()).collect(),
            erc1155_amounts: data.erc1155Amounts.iter().map(|x| x.to_string()).collect(),
        }
    }
}
