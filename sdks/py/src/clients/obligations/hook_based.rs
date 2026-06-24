//! Hook-based escrow helper client.
//!
//! Mirrors the Rust SDK hook-based escrow helpers for address access and
//! ABI codecs.
//!
//! Security note: the underlying hook-based escrow contracts and hooks have not
//! been included in professional manual audits and have only been reviewed by
//! automated audit tooling so far.

use alkahest_rs::{contracts, extensions::HookBasedModule};
use alloy::{
    primitives::{Address, Bytes, U256},
    sol_types::SolValue,
};
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::{map_parse_to_pyerr, map_sol_decode_to_pyerr};

#[pyclass]
#[derive(Clone)]
pub struct HookBasedClient {
    inner: HookBasedModule,
}

impl HookBasedClient {
    pub fn new(inner: HookBasedModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl HookBasedClient {
    /// Return a hook-based escrow contract or hook address by name.
    pub fn address(&self, contract: String) -> PyResult<String> {
        let address = match contract.as_str() {
            "hook_escrow_obligation" => self.inner.addresses.hook_escrow_obligation,
            "hooks_escrow_obligation" => self.inner.addresses.hooks_escrow_obligation,
            "erc20_escrow_hook" => self.inner.addresses.erc20_escrow_hook,
            "erc721_escrow_hook" => self.inner.addresses.erc721_escrow_hook,
            "erc1155_escrow_hook" => self.inner.addresses.erc1155_escrow_hook,
            "native_token_escrow_hook" => self.inner.addresses.native_token_escrow_hook,
            "attestation_escrow_hook" => self.inner.addresses.attestation_escrow_hook,
            "attestation_reference_escrow_hook" => {
                self.inner.addresses.attestation_reference_escrow_hook
            }
            _ => {
                return Err(pyo3::exceptions::PyValueError::new_err(
                    "unknown hook-based contract",
                ))
            }
        };
        Ok(address.to_string())
    }

    pub fn encode_hook_escrow(&self, data: &PyHookEscrowObligationData) -> PyResult<Vec<u8>> {
        PyHookEscrowObligationData::encode(data)
    }

    pub fn decode_hook_escrow(&self, data: Vec<u8>) -> PyResult<PyHookEscrowObligationData> {
        PyHookEscrowObligationData::decode(data)
    }

    pub fn encode_hooks_escrow(&self, data: &PyHooksEscrowObligationData) -> PyResult<Vec<u8>> {
        PyHooksEscrowObligationData::encode(data)
    }

    pub fn decode_hooks_escrow(&self, data: Vec<u8>) -> PyResult<PyHooksEscrowObligationData> {
        PyHooksEscrowObligationData::decode(data)
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyHookEscrowObligationData {
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
    #[pyo3(get)]
    pub hook: String,
    #[pyo3(get)]
    pub hook_data: Vec<u8>,
}

#[pymethods]
impl PyHookEscrowObligationData {
    #[new]
    pub fn new(arbiter: String, demand: Vec<u8>, hook: String, hook_data: Vec<u8>) -> Self {
        Self {
            arbiter,
            demand,
            hook,
            hook_data,
        }
    }

    #[staticmethod]
    pub fn encode(data: &PyHookEscrowObligationData) -> PyResult<Vec<u8>> {
        let arbiter: Address = data.arbiter.parse().map_err(map_parse_to_pyerr)?;
        let hook: Address = data.hook.parse().map_err(map_parse_to_pyerr)?;
        Ok(
            contracts::obligations::escrow::hook_based::HookEscrowObligation::ObligationData {
                arbiter,
                demand: Bytes::from(data.demand.clone()),
                hook,
                hookData: Bytes::from(data.hook_data.clone()),
            }
            .abi_encode(),
        )
    }

    #[staticmethod]
    pub fn decode(data: Vec<u8>) -> PyResult<PyHookEscrowObligationData> {
        let decoded =
            contracts::obligations::escrow::hook_based::HookEscrowObligation::ObligationData::abi_decode(
                &data,
            )
            .map_err(map_sol_decode_to_pyerr)?;
        Ok(decoded.into())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyHookEscrowObligationData::encode(self)
    }
}

impl From<contracts::obligations::escrow::hook_based::HookEscrowObligation::ObligationData>
    for PyHookEscrowObligationData
{
    fn from(
        data: contracts::obligations::escrow::hook_based::HookEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: data.arbiter.to_string(),
            demand: data.demand.to_vec(),
            hook: data.hook.to_string(),
            hook_data: data.hookData.to_vec(),
        }
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyHooksEscrowObligationData {
    #[pyo3(get)]
    pub arbiter: String,
    #[pyo3(get)]
    pub demand: Vec<u8>,
    #[pyo3(get)]
    pub hooks: Vec<String>,
    #[pyo3(get)]
    pub hook_datas: Vec<Vec<u8>>,
    #[pyo3(get)]
    pub values: Vec<String>,
}

#[pymethods]
impl PyHooksEscrowObligationData {
    #[new]
    pub fn new(
        arbiter: String,
        demand: Vec<u8>,
        hooks: Vec<String>,
        hook_datas: Vec<Vec<u8>>,
        values: Vec<String>,
    ) -> Self {
        Self {
            arbiter,
            demand,
            hooks,
            hook_datas,
            values,
        }
    }

    #[staticmethod]
    pub fn encode(data: &PyHooksEscrowObligationData) -> PyResult<Vec<u8>> {
        let arbiter: Address = data.arbiter.parse().map_err(map_parse_to_pyerr)?;
        let hooks = parse_address_vec(&data.hooks)?;
        let hook_datas = data
            .hook_datas
            .iter()
            .cloned()
            .map(Bytes::from)
            .collect::<Vec<_>>();
        let values = parse_u256_vec(&data.values)?;

        Ok(
            contracts::obligations::escrow::hook_based::HooksEscrowObligation::ObligationData {
                arbiter,
                demand: Bytes::from(data.demand.clone()),
                hooks,
                hookDatas: hook_datas,
                values,
            }
            .abi_encode(),
        )
    }

    #[staticmethod]
    pub fn decode(data: Vec<u8>) -> PyResult<PyHooksEscrowObligationData> {
        let decoded =
            contracts::obligations::escrow::hook_based::HooksEscrowObligation::ObligationData::abi_decode(
                &data,
            )
            .map_err(map_sol_decode_to_pyerr)?;
        Ok(decoded.into())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyHooksEscrowObligationData::encode(self)
    }
}

impl From<contracts::obligations::escrow::hook_based::HooksEscrowObligation::ObligationData>
    for PyHooksEscrowObligationData
{
    fn from(
        data: contracts::obligations::escrow::hook_based::HooksEscrowObligation::ObligationData,
    ) -> Self {
        Self {
            arbiter: data.arbiter.to_string(),
            demand: data.demand.to_vec(),
            hooks: data
                .hooks
                .into_iter()
                .map(|address| address.to_string())
                .collect(),
            hook_datas: data
                .hookDatas
                .into_iter()
                .map(|hook_data| hook_data.to_vec())
                .collect(),
            values: data
                .values
                .into_iter()
                .map(|value| value.to_string())
                .collect(),
        }
    }
}

fn parse_address_vec(values: &[String]) -> PyResult<Vec<Address>> {
    values
        .iter()
        .map(|value| value.parse().map_err(map_parse_to_pyerr))
        .collect()
}

fn parse_u256_vec(values: &[String]) -> PyResult<Vec<U256>> {
    values
        .iter()
        .map(|value| value.parse().map_err(map_parse_to_pyerr))
        .collect()
}
