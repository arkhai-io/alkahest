use alkahest_rs::{
    extensions::OracleModule as InnerOracleClient,
    contracts::obligations::StringObligation,
    contracts::arbiters::TrustedOracleArbiter,
};
use alloy::primitives::FixedBytes;
use pyo3::{pyclass, pymethods, types::PyAnyMethods, PyAny, PyObject, PyResult, Python};
use pyo3_async_runtimes::tokio::{future_into_py, into_future};
use std::future::Future;
use std::pin::Pin;
use std::sync::Arc;

use crate::{
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr},
};

#[pyclass]
#[derive(Clone)]
pub struct OracleClient {
    inner: InnerOracleClient,
}

impl OracleClient {
    pub fn new(inner: InnerOracleClient) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl OracleClient {
    pub fn get_eas_address(&self) -> String {
        format!("{:?}", self.inner.addresses.eas)
    }

    pub fn get_trusted_oracle_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.trusted_oracle_arbiter)
    }

    pub fn request_arbitration<'py>(
        &self,
        py: Python<'py>,
        obligation_uid: String,
        oracle: String,
        demand: Vec<u8>,
    ) -> PyResult<pyo3::Bound<'py, PyAny>> {
        let inner = self.inner.clone();
        future_into_py(py, async move {
            let uid: FixedBytes<32> = obligation_uid.parse().map_err(map_parse_to_pyerr)?;
            let oracle_addr = oracle.parse().map_err(map_parse_to_pyerr)?;
            let demand_bytes = alloy::primitives::Bytes::from(demand);

            let receipt = inner
                .request_arbitration(uid, oracle_addr, demand_bytes)
                .await
                .map_err(map_eyre_to_pyerr)?;

            Ok(format!("0x{}", alloy::hex::encode(receipt.transaction_hash.as_slice())))
        })
    }

    pub fn extract_obligation_data(&self, attestation: &PyOracleAttestation) -> PyResult<String> {
        use alloy::hex;
        use alloy::sol_types::SolType;

        let data_bytes = hex::decode(attestation.data.strip_prefix("0x").unwrap_or(&attestation.data))
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode data hex: {}", e)))?;

        let obligation_data = StringObligation::ObligationData::abi_decode(&data_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode obligation data: {}", e)))?;

        Ok(obligation_data.item)
    }

    pub fn extract_demand_data(&self, escrow_attestation: &PyOracleAttestation) -> PyResult<PyTrustedOracleArbiterDemandData> {
        use alloy::{hex, sol, sol_types::SolType};

        sol! {
            struct ArbiterDemand {
                address oracle;
                bytes demand;
            }
        }

        let data_bytes = hex::decode(escrow_attestation.data.strip_prefix("0x").unwrap_or(&escrow_attestation.data))
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode data hex: {}", e)))?;

        let arbiter_demand = ArbiterDemand::abi_decode(&data_bytes)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode arbiter demand: {}", e)))?;

        let demand_data = TrustedOracleArbiter::DemandData::abi_decode(&arbiter_demand.demand)
            .map_err(|e| map_eyre_to_pyerr(eyre::eyre!("Failed to decode demand data: {}", e)))?;

        Ok(PyTrustedOracleArbiterDemandData::from(demand_data))
    }

    pub fn unsubscribe<'py>(
        &self,
        py: Python<'py>,
        local_id: String,
    ) -> PyResult<pyo3::Bound<'py, PyAny>> {
        let inner = self.inner.clone();
        future_into_py(py, async move {
            let local_id: FixedBytes<32> = local_id.parse().map_err(map_parse_to_pyerr)?;
            inner
                .unsubscribe(local_id)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(())
        })
    }

    pub fn arbitrate_past_sync<'py>(
        &self,
        py: Python<'py>,
        decision_func: PyObject,
        options: Option<PyArbitrateOptions>,
    ) -> PyResult<pyo3::Bound<'py, PyAny>> {
        let inner = self.inner.clone();
        future_into_py(py, async move {
            let opts = options.unwrap_or_default();

            let arbitrate_options = alkahest_rs::clients::oracle::ArbitrateOptions {
                skip_arbitrated: opts.skip_arbitrated,
                only_new: opts.only_new,
            };

            let arbitrate_func = |attestation: &alkahest_rs::contracts::IEAS::Attestation| -> Option<bool> {
                Python::with_gil(|py| {
                    let py_attestation = PyOracleAttestation::from(attestation);

                    // Call the Python function
                    let result = decision_func.call1(py, (py_attestation,)).ok()?;

                    // Check if it's a coroutine using inspect.iscoroutine()
                    let inspect = py.import("inspect").ok()?;
                    let is_coroutine = inspect
                        .getattr("iscoroutine").ok()?
                        .call1((result.clone_ref(py),)).ok()?
                        .extract::<bool>().ok()?;

                    if is_coroutine {
                        // It's a coroutine - convert to Rust future and block on it
                        let future = into_future(result.into_bound(py)).ok()?;

                        // Use futures::executor::block_on which works even inside tokio runtime
                        let awaited_result = futures::executor::block_on(future).ok()?;

                        awaited_result
                            .extract::<bool>(py)
                            .or_else(|_| awaited_result.is_truthy(py))
                            .ok()
                    } else {
                        // It's a regular return value
                        result
                            .extract::<bool>(py)
                            .or_else(|_| result.is_truthy(py))
                            .ok()
                    }
                })
            };

            let decisions = inner
                .arbitrate_past_sync(arbitrate_func, &arbitrate_options)
                .await
                .map_err(map_eyre_to_pyerr)?;

            let py_decisions: Vec<PyDecision> = decisions
                .into_iter()
                .map(|decision| {
                    let attestation = PyOracleAttestation::from(&decision.attestation);
                    PyDecision::__new__(
                        attestation,
                        decision.decision,
                        format!(
                            "0x{}",
                            alloy::hex::encode(decision.receipt.transaction_hash.as_slice())
                        ),
                    )
                })
                .collect();

            Ok(py_decisions)
        })
    }

    pub fn listen_and_arbitrate_no_spawn<'py>(
        &self,
        py: Python<'py>,
        decision_func: PyObject,
        callback_func: Option<PyObject>,
        options: Option<PyArbitrateOptions>,
        timeout_seconds: Option<f64>,
    ) -> PyResult<pyo3::Bound<'py, PyAny>> {
        // Check if decision_func is async
        let is_async = Python::with_gil(|py| {
            let inspect = py.import("inspect").ok()?;
            inspect
                .getattr("iscoroutinefunction").ok()?
                .call1((decision_func.clone_ref(py),)).ok()?
                .extract::<bool>().ok()
        }).unwrap_or(false);

        if is_async {
            // Use async implementation with pyo3-asyncio
            return self.listen_and_arbitrate_async_impl(py, decision_func, callback_func, options, timeout_seconds);
        }

        // Sync implementation
        let inner = self.inner.clone();
        future_into_py(py, async move {
            let opts = options.unwrap_or_default();
            let timeout = timeout_seconds.map(|secs| std::time::Duration::from_secs_f64(secs));

            let arbitrate_options = alkahest_rs::clients::oracle::ArbitrateOptions {
                skip_arbitrated: opts.skip_arbitrated,
                only_new: opts.only_new,
            };

            let arbitrate_func = |attestation: &alkahest_rs::contracts::IEAS::Attestation| -> Option<bool> {
                Python::with_gil(|py| {
                    let py_attestation = PyOracleAttestation::from(attestation);
                    let result = decision_func.call1(py, (py_attestation,)).ok()?;
                    result
                        .extract::<bool>(py)
                        .or_else(|_| result.is_truthy(py))
                        .ok()
                })
            };

            let callback = |decision: &alkahest_rs::clients::oracle::Decision| {
                if let Some(ref py_callback) = callback_func {
                    Python::with_gil(|py| {
                        let py_attestation = PyOracleAttestation::from(&decision.attestation);
                        let py_decision = PyDecision::__new__(
                            py_attestation,
                            decision.decision,
                            format!("0x{}", alloy::hex::encode(decision.receipt.transaction_hash.as_slice())),
                        );

                        if let Err(e) = py_callback.call1(py, (py_decision,)) {
                            panic!("Python callback failed: {}", e);
                        }
                    });
                }

                Box::pin(async {})
            };

            let listen_result = inner
                .listen_and_arbitrate_no_spawn(
                    arbitrate_func,
                    callback,
                    &arbitrate_options,
                    timeout,
                )
                .await
                .map_err(map_eyre_to_pyerr)?;

            let py_decisions: Vec<PyDecision> = listen_result
                .decisions
                .into_iter()
                .map(|decision| {
                    let attestation = PyOracleAttestation::from(&decision.attestation);
                    PyDecision::__new__(
                        attestation,
                        decision.decision,
                        format!(
                            "0x{}",
                            alloy::hex::encode(decision.receipt.transaction_hash.as_slice())
                        ),
                    )
                })
                .collect();

            Ok(PyListenResult::__new__(
                py_decisions,
                format!("0x{}", alloy::hex::encode(listen_result.subscription_id.as_slice())),
            ))
        })
    }

    fn listen_and_arbitrate_async_impl<'py>(
        &self,
        py: Python<'py>,
        decision_func: PyObject,
        callback_func: Option<PyObject>,
        options: Option<PyArbitrateOptions>,
        timeout_seconds: Option<f64>,
    ) -> PyResult<pyo3::Bound<'py, PyAny>> {
        let inner = self.inner.clone();

        future_into_py(py, async move {
            use alkahest_rs::extensions::HasOracle;

            let opts = options.unwrap_or_default();
            let timeout = timeout_seconds.map(|secs| std::time::Duration::from_secs_f64(secs));

            let arbitrate_options = alkahest_rs::clients::oracle::ArbitrateOptions {
                skip_arbitrated: opts.skip_arbitrated,
                only_new: opts.only_new,
            };

            // Wrap PyObjects in Arc so they can be cloned in Fn closure
            let decision_func = Arc::new(decision_func);
            let callback_func = Arc::new(callback_func);

            // Create async arbitration function that converts Python coroutines to Rust futures
            let arbitrate = move |attestation: &alkahest_rs::contracts::IEAS::Attestation| -> Pin<Box<dyn Future<Output = Option<bool>> + Send + 'static>> {
                let attestation = attestation.clone();
                let decision_func = Arc::clone(&decision_func);

                Box::pin(async move {
                    // Call Python function and get coroutine
                    let coro_result = Python::with_gil(|py| {
                        let py_attestation = PyOracleAttestation::from(&attestation);
                        decision_func.clone_ref(py).call1(py, (py_attestation,))
                    });

                    let coro = match coro_result {
                        Ok(c) => c,
                        Err(_) => return None,
                    };

                    // Convert Python coroutine to Rust future
                    let future_result = Python::with_gil(|py| {
                        into_future(coro.into_bound(py))
                    });

                    let future = match future_result {
                        Ok(f) => f,
                        Err(_) => return None,
                    };

                    // Await the future
                    let result = match future.await {
                        Ok(r) => r,
                        Err(_) => return None,
                    };

                    // Extract boolean
                    Python::with_gil(|py| {
                        result.extract::<bool>(py)
                            .or_else(|_| result.is_truthy(py))
                            .ok()
                    })
                })
            };

            // Create callback
            let callback = move |decision: &alkahest_rs::clients::oracle::Decision| {
                let decision_attestation = decision.attestation.clone();
                let decision_bool = decision.decision;
                let tx_hash = decision.receipt.transaction_hash.clone();
                let callback_func = Arc::clone(&callback_func);

                Box::pin(async move {
                    if let Some(ref py_callback) = callback_func.as_ref() {
                        Python::with_gil(|py| {
                            let py_attestation = PyOracleAttestation::from(&decision_attestation);
                            let py_decision = PyDecision::__new__(
                                py_attestation,
                                decision_bool,
                                format!("0x{}", alloy::hex::encode(tx_hash.as_slice())),
                            );

                            let _ = py_callback.clone_ref(py).call1(py, (py_decision,));
                        });
                    }
                }) as Pin<Box<dyn Future<Output = ()> + Send + 'static>>
            };

            // Call the async version
            let listen_result = inner
                .oracle()
                .listen_and_arbitrate_async(arbitrate, callback, &arbitrate_options)
                .await
                .map_err(map_eyre_to_pyerr)?;

            let py_decisions: Vec<PyDecision> = listen_result
                .decisions
                .into_iter()
                .map(|decision| {
                    let attestation = PyOracleAttestation::from(&decision.attestation);
                    PyDecision::__new__(
                        attestation,
                        decision.decision,
                        format!(
                            "0x{}",
                            alloy::hex::encode(decision.receipt.transaction_hash.as_slice())
                        ),
                    )
                })
                .collect();

            Ok(PyListenResult::__new__(
                py_decisions,
                format!("0x{}", alloy::hex::encode(listen_result.subscription_id.as_slice())),
            ))
        })
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyOracleAddresses {
    #[pyo3(get)]
    pub eas: String,
    #[pyo3(get)]
    pub trusted_oracle_arbiter: String,
}

#[pymethods]
impl PyOracleAddresses {
    #[new]
    pub fn __new__(eas: String, trusted_oracle_arbiter: String) -> Self {
        Self {
            eas,
            trusted_oracle_arbiter,
        }
    }

    pub fn __str__(&self) -> String {
        format!(
            "PyOracleAddresses(eas={}, trusted_oracle_arbiter={})",
            self.eas, self.trusted_oracle_arbiter
        )
    }

    pub fn __repr__(&self) -> String {
        self.__str__()
    }
}

impl TryFrom<PyOracleAddresses> for alkahest_rs::clients::oracle::OracleAddresses {
    type Error = eyre::Error;

    fn try_from(value: PyOracleAddresses) -> eyre::Result<Self> {
        Ok(Self {
            eas: value.eas.parse()?,
            trusted_oracle_arbiter: value.trusted_oracle_arbiter.parse()?,
        })
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyArbitrateOptions {
    #[pyo3(get, set)]
    pub skip_arbitrated: bool,
    #[pyo3(get, set)]
    pub only_new: bool,
}

#[pymethods]
impl PyArbitrateOptions {
    #[new]
    #[pyo3(signature = (skip_arbitrated=false, only_new=false))]
    pub fn __new__(skip_arbitrated: bool, only_new: bool) -> Self {
        Self {
            skip_arbitrated,
            only_new,
        }
    }

    pub fn __str__(&self) -> String {
        format!(
            "PyArbitrateOptions(skip_arbitrated={}, only_new={})",
            self.skip_arbitrated, self.only_new
        )
    }

    pub fn __repr__(&self) -> String {
        self.__str__()
    }
}

impl Default for PyArbitrateOptions {
    fn default() -> Self {
        Self {
            skip_arbitrated: false,
            only_new: false,
        }
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyOracleAttestation {
    #[pyo3(get)]
    pub uid: String,
    #[pyo3(get)]
    pub schema: String,
    #[pyo3(get)]
    pub ref_uid: String,
    #[pyo3(get)]
    pub time: u64,
    #[pyo3(get)]
    pub expiration_time: u64,
    #[pyo3(get)]
    pub revocation_time: u64,
    #[pyo3(get)]
    pub recipient: String,
    #[pyo3(get)]
    pub attester: String,
    #[pyo3(get)]
    pub revocable: bool,
    #[pyo3(get)]
    pub data: String,
}

#[pymethods]
impl PyOracleAttestation {
    #[new]
    pub fn __new__(
        uid: String,
        schema: String,
        ref_uid: String,
        time: u64,
        expiration_time: u64,
        revocation_time: u64,
        recipient: String,
        attester: String,
        revocable: bool,
        data: String,
    ) -> Self {
        Self {
            uid,
            schema,
            ref_uid,
            time,
            expiration_time,
            revocation_time,
            recipient,
            attester,
            revocable,
            data,
        }
    }

    pub fn __str__(&self) -> String {
        format!(
            "PyOracleAttestation(uid={}, schema={}, attester={}, recipient={})",
            self.uid, self.schema, self.attester, self.recipient
        )
    }

    pub fn __repr__(&self) -> String {
        self.__str__()
    }
}

impl From<&alkahest_rs::contracts::IEAS::Attestation> for PyOracleAttestation {
    fn from(att: &alkahest_rs::contracts::IEAS::Attestation) -> Self {
        Self::__new__(
            format!("0x{}", alloy::hex::encode(att.uid.as_slice())),
            format!("0x{}", alloy::hex::encode(att.schema.as_slice())),
            format!("0x{}", alloy::hex::encode(att.refUID.as_slice())),
            att.time,
            att.expirationTime,
            att.revocationTime,
            format!("0x{:x}", att.recipient),
            format!("0x{:x}", att.attester),
            att.revocable,
            format!("0x{}", alloy::hex::encode(&att.data)),
        )
    }
}

impl From<alkahest_rs::contracts::IEAS::Attestation> for PyOracleAttestation {
    fn from(att: alkahest_rs::contracts::IEAS::Attestation) -> Self {
        Self::from(&att)
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyDecision {
    #[pyo3(get)]
    pub attestation: PyOracleAttestation,
    #[pyo3(get)]
    pub decision: bool,
    #[pyo3(get)]
    pub transaction_hash: String,
}

#[pymethods]
impl PyDecision {
    #[new]
    pub fn __new__(
        attestation: PyOracleAttestation,
        decision: bool,
        transaction_hash: String,
    ) -> Self {
        Self {
            attestation,
            decision,
            transaction_hash,
        }
    }

    pub fn __str__(&self) -> String {
        format!(
            "PyDecision(decision={}, tx_hash={})",
            self.decision, self.transaction_hash
        )
    }

    pub fn __repr__(&self) -> String {
        self.__str__()
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyListenResult {
    #[pyo3(get)]
    pub decisions: Vec<PyDecision>,
    #[pyo3(get)]
    pub subscription_id: String,
}

#[pymethods]
impl PyListenResult {
    #[new]
    pub fn __new__(decisions: Vec<PyDecision>, subscription_id: String) -> Self {
        Self {
            decisions,
            subscription_id,
        }
    }

    pub fn __str__(&self) -> String {
        format!(
            "PyListenResult(decisions={}, subscription_id={})",
            self.decisions.len(),
            self.subscription_id
        )
    }

    pub fn __repr__(&self) -> String {
        self.__str__()
    }
}

#[pyclass]
#[derive(Clone)]
pub struct PyTrustedOracleArbiterDemandData {
    #[pyo3(get)]
    pub oracle: String,
    #[pyo3(get)]
    pub data: Vec<u8>,
}

#[pymethods]
impl PyTrustedOracleArbiterDemandData {
    #[new]
    pub fn new(oracle: String, data: Vec<u8>) -> Self {
        Self { oracle, data }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyTrustedOracleArbiterDemandData(oracle='{}', data={} bytes)",
            self.oracle,
            self.data.len()
        )
    }

    #[staticmethod]
    pub fn decode(demand_bytes: Vec<u8>) -> eyre::Result<PyTrustedOracleArbiterDemandData> {
        use alloy::primitives::Bytes;
        use alloy::sol_types::SolValue;

        let bytes = Bytes::from(demand_bytes);
        let decoded = TrustedOracleArbiter::DemandData::abi_decode(&bytes)?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn encode(demand_data: &PyTrustedOracleArbiterDemandData) -> eyre::Result<Vec<u8>> {
        use alloy::primitives::{Address, Bytes};
        use alloy::sol_types::SolValue;

        let oracle: Address = demand_data.oracle.parse()?;
        let data = Bytes::from(demand_data.data.clone());
        let rust_demand_data = TrustedOracleArbiter::DemandData { oracle, data };
        let encoded = rust_demand_data.abi_encode();
        Ok(encoded)
    }

    pub fn encode_self(&self) -> eyre::Result<Vec<u8>> {
        PyTrustedOracleArbiterDemandData::encode(self)
    }
}

impl From<TrustedOracleArbiter::DemandData>
    for PyTrustedOracleArbiterDemandData
{
    fn from(data: TrustedOracleArbiter::DemandData) -> Self {
        Self {
            oracle: format!("{:?}", data.oracle),
            data: data.data.to_vec(),
        }
    }
}

impl TryFrom<PyTrustedOracleArbiterDemandData>
    for TrustedOracleArbiter::DemandData
{
    type Error = eyre::Error;

    fn try_from(py_data: PyTrustedOracleArbiterDemandData) -> eyre::Result<Self> {
        use alloy::primitives::{Address, Bytes};

        let oracle: Address = py_data.oracle.parse()?;
        let data = Bytes::from(py_data.data);

        Ok(Self { oracle, data })
    }
}