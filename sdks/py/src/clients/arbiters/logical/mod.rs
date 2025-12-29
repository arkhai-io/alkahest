//! Logical arbiters module
//!
//! This module contains logical arbiters that combine multiple arbiters
//! using logical operations (ANY, ALL).

use alkahest_rs::{
    clients::arbiters::{DecodedAllArbiterDemandData, DecodedAnyArbiterDemandData, DecodedDemand},
    contracts::arbiters::logical::{AllArbiter as AllArbiterContract, AnyArbiter as AnyArbiterContract},
    extensions::ArbitersModule,
};
use alloy::sol_types::SolValue;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::map_eyre_to_pyerr;

/// Logical arbiters API accessor
#[pyclass]
#[derive(Clone)]
pub struct Logical {
    inner: ArbitersModule,
}

impl Logical {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Logical {
    /// Access AllArbiter-specific API
    #[getter]
    pub fn all(&self) -> AllArbiter {
        AllArbiter::new(self.inner.clone())
    }

    /// Access AnyArbiter-specific API
    #[getter]
    pub fn any(&self) -> AnyArbiter {
        AnyArbiter::new(self.inner.clone())
    }

    /// Get the AllArbiter address
    pub fn all_address(&self) -> String {
        format!("{:?}", self.inner.addresses.all_arbiter)
    }

    /// Get the AnyArbiter address
    pub fn any_address(&self) -> String {
        format!("{:?}", self.inner.addresses.any_arbiter)
    }
}

/// AllArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct AllArbiter {
    inner: ArbitersModule,
}

impl AllArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl AllArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.all_arbiter)
    }

    /// Decode AllArbiter demand data from raw bytes into structured format
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<PyDecodedAllArbiterDemandData> {
        let demand: AllArbiterContract::DemandData =
            AllArbiterContract::DemandData::abi_decode(&demand_bytes)
                .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode AllArbiter demand: {}", e)))?;
        let decoded = self
            .inner
            .decode_all_arbiter_demands(demand)
            .map_err(map_eyre_to_pyerr)?;
        Ok(PyDecodedAllArbiterDemandData::from(decoded))
    }

    /// Encode AllArbiter demand data from Python to raw bytes
    #[staticmethod]
    pub fn encode(arbiters: Vec<String>, demands: Vec<Vec<u8>>) -> PyResult<Vec<u8>> {
        let arbiter_addresses: Vec<alloy::primitives::Address> = arbiters
            .iter()
            .map(|s| s.parse().map_err(|e| {
                pyo3::PyErr::new::<pyo3::exceptions::PyValueError, _>(format!("Invalid address: {}", e))
            }))
            .collect::<PyResult<Vec<_>>>()?;

        let demand_bytes: Vec<alloy::primitives::Bytes> = demands
            .into_iter()
            .map(|d| d.into())
            .collect();

        let demand_data = AllArbiterContract::DemandData {
            arbiters: arbiter_addresses,
            demands: demand_bytes,
        };

        Ok(demand_data.abi_encode())
    }
}

/// AnyArbiter-specific API
#[pyclass]
#[derive(Clone)]
pub struct AnyArbiter {
    inner: ArbitersModule,
}

impl AnyArbiter {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl AnyArbiter {
    /// Get the contract address
    pub fn address(&self) -> String {
        format!("{:?}", self.inner.addresses.any_arbiter)
    }

    /// Decode AnyArbiter demand data from raw bytes into structured format
    pub fn decode(&self, demand_bytes: Vec<u8>) -> PyResult<PyDecodedAnyArbiterDemandData> {
        let demand: AnyArbiterContract::DemandData =
            AnyArbiterContract::DemandData::abi_decode(&demand_bytes)
                .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode AnyArbiter demand: {}", e)))?;
        let decoded = self
            .inner
            .decode_any_arbiter_demands(demand)
            .map_err(map_eyre_to_pyerr)?;
        Ok(PyDecodedAnyArbiterDemandData::from(decoded))
    }

    /// Encode AnyArbiter demand data from Python to raw bytes
    #[staticmethod]
    pub fn encode(arbiters: Vec<String>, demands: Vec<Vec<u8>>) -> PyResult<Vec<u8>> {
        let arbiter_addresses: Vec<alloy::primitives::Address> = arbiters
            .iter()
            .map(|s| s.parse().map_err(|e| {
                pyo3::PyErr::new::<pyo3::exceptions::PyValueError, _>(format!("Invalid address: {}", e))
            }))
            .collect::<PyResult<Vec<_>>>()?;

        let demand_bytes: Vec<alloy::primitives::Bytes> = demands
            .into_iter()
            .map(|d| d.into())
            .collect();

        let demand_data = AnyArbiterContract::DemandData {
            arbiters: arbiter_addresses,
            demands: demand_bytes,
        };

        Ok(demand_data.abi_encode())
    }
}

/// Python representation of decoded AllArbiter demand data
#[pyclass]
#[derive(Clone, Debug)]
pub struct PyDecodedAllArbiterDemandData {
    #[pyo3(get)]
    pub arbiters: Vec<String>,
    #[pyo3(get)]
    pub demands: Vec<PyDecodedDemand>,
}

#[pymethods]
impl PyDecodedAllArbiterDemandData {
    fn __repr__(&self) -> String {
        format!(
            "PyDecodedAllArbiterDemandData(arbiters={}, demands={})",
            self.arbiters.len(),
            self.demands.len()
        )
    }
}

impl From<DecodedAllArbiterDemandData> for PyDecodedAllArbiterDemandData {
    fn from(decoded: DecodedAllArbiterDemandData) -> Self {
        Self {
            arbiters: decoded.arbiters.iter().map(|a| format!("{:?}", a)).collect(),
            demands: decoded.demands.into_iter().map(PyDecodedDemand::from).collect(),
        }
    }
}

/// Python representation of decoded AnyArbiter demand data
#[pyclass]
#[derive(Clone, Debug)]
pub struct PyDecodedAnyArbiterDemandData {
    #[pyo3(get)]
    pub arbiters: Vec<String>,
    #[pyo3(get)]
    pub demands: Vec<PyDecodedDemand>,
}

#[pymethods]
impl PyDecodedAnyArbiterDemandData {
    fn __repr__(&self) -> String {
        format!(
            "PyDecodedAnyArbiterDemandData(arbiters={}, demands={})",
            self.arbiters.len(),
            self.demands.len()
        )
    }
}

impl From<DecodedAnyArbiterDemandData> for PyDecodedAnyArbiterDemandData {
    fn from(decoded: DecodedAnyArbiterDemandData) -> Self {
        Self {
            arbiters: decoded.arbiters.iter().map(|a| format!("{:?}", a)).collect(),
            demands: decoded.demands.into_iter().map(PyDecodedDemand::from).collect(),
        }
    }
}

/// Python representation of a decoded demand
#[pyclass]
#[derive(Clone, Debug)]
pub struct PyDecodedDemand {
    #[pyo3(get)]
    pub demand_type: String,
    #[pyo3(get)]
    pub raw_data: Option<Vec<u8>>,
}

#[pymethods]
impl PyDecodedDemand {
    fn __repr__(&self) -> String {
        format!("PyDecodedDemand(type='{}')", self.demand_type)
    }
}

impl From<DecodedDemand> for PyDecodedDemand {
    fn from(decoded: DecodedDemand) -> Self {
        match decoded {
            DecodedDemand::TrivialArbiter => Self {
                demand_type: "TrivialArbiter".to_string(),
                raw_data: None,
            },
            DecodedDemand::IntrinsicsArbiter => Self {
                demand_type: "IntrinsicsArbiter".to_string(),
                raw_data: None,
            },
            DecodedDemand::TrustedOracle(data) => Self {
                demand_type: "TrustedOracle".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::IntrinsicsArbiter2(data) => Self {
                demand_type: "IntrinsicsArbiter2".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::ERC8004Arbiter(data) => Self {
                demand_type: "ERC8004Arbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::AnyArbiter(_) => Self {
                demand_type: "AnyArbiter".to_string(),
                raw_data: None, // Nested logical arbiters not serialized
            },
            DecodedDemand::AllArbiter(_) => Self {
                demand_type: "AllArbiter".to_string(),
                raw_data: None, // Nested logical arbiters not serialized
            },
            DecodedDemand::AttesterArbiter(data) => Self {
                demand_type: "AttesterArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::ExpirationTimeAfterArbiter(data) => Self {
                demand_type: "ExpirationTimeAfterArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::ExpirationTimeBeforeArbiter(data) => Self {
                demand_type: "ExpirationTimeBeforeArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::ExpirationTimeEqualArbiter(data) => Self {
                demand_type: "ExpirationTimeEqualArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::RecipientArbiter(data) => Self {
                demand_type: "RecipientArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::RefUidArbiter(data) => Self {
                demand_type: "RefUidArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::RevocableArbiter(data) => Self {
                demand_type: "RevocableArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::SchemaArbiter(data) => Self {
                demand_type: "SchemaArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::TimeAfterArbiter(data) => Self {
                demand_type: "TimeAfterArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::TimeBeforeArbiter(data) => Self {
                demand_type: "TimeBeforeArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::TimeEqualArbiter(data) => Self {
                demand_type: "TimeEqualArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::UidArbiter(data) => Self {
                demand_type: "UidArbiter".to_string(),
                raw_data: Some(data.abi_encode()),
            },
            DecodedDemand::Unknown { arbiter, raw_data } => Self {
                demand_type: format!("Unknown({})", arbiter),
                raw_data: Some(raw_data.to_vec()),
            },
        }
    }
}
