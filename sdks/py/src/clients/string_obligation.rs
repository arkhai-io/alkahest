use alkahest_rs::extensions::StringObligationModule;
use alloy::primitives::FixedBytes;
use pyo3::prelude::PyAnyMethods;
use pyo3::{pyclass, pymethods, types::PyAny, Bound, PyResult};

use crate::{
    contract::PyDecodedAttestation,
    error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr, map_serde_to_pyerr},
};

// Helper function to convert Python object to JSON string
fn python_to_json_string(py_obj: &Bound<'_, PyAny>) -> eyre::Result<String> {
    // Use Python's json.dumps to serialize the object
    let json_module = py_obj.py().import("json")?;
    let json_string = json_module.call_method1("dumps", (py_obj,))?;
    Ok(json_string.extract::<String>()?)
}

#[pyclass]
#[derive(Clone)]
pub struct StringObligationClient {
    inner: StringObligationModule,
}

impl StringObligationClient {
    pub fn new(inner: StringObligationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl StringObligationClient {
    pub fn get_obligation<'py>(
        &self,
        py: pyo3::Python<'py>,
        uid: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let uid: FixedBytes<32> = uid.parse().map_err(map_parse_to_pyerr)?;
            let obligation = inner.get_obligation(uid).await.map_err(map_eyre_to_pyerr)?;
            Ok(PyDecodedAttestation::<PyStringObligationData>::from(
                obligation,
            ))
        })
    }

    pub fn do_obligation<'py>(
        &self,
        py: pyo3::Python<'py>,
        item: String,
        ref_uid: Option<String>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let ref_uid = if let Some(ref_uid_str) = ref_uid {
                Some(ref_uid_str.parse().map_err(map_parse_to_pyerr)?)
            } else {
                None
            };

            let receipt = inner
                .do_obligation(item, ref_uid)
                .await
                .map_err(map_eyre_to_pyerr)?;

            // Extract the attestation UID from the receipt instead of returning transaction hash
            use alkahest_rs::DefaultAlkahestClient;
            let attested_event =
                DefaultAlkahestClient::get_attested_event(receipt).map_err(map_eyre_to_pyerr)?;
            Ok(format!(
                "0x{}",
                alloy::hex::encode(attested_event.uid.as_slice())
            ))
        })
    }

    pub fn do_obligation_json<'py>(
        &self,
        py: pyo3::Python<'py>,
        json_data: &Bound<'_, PyAny>,
        ref_uid: Option<String>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let json_string = python_to_json_string(json_data).map_err(map_eyre_to_pyerr)?;
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let json_value: serde_json::Value =
                serde_json::from_str(&json_string).map_err(map_serde_to_pyerr)?;

            let ref_uid = if let Some(ref_uid_str) = ref_uid {
                Some(ref_uid_str.parse().map_err(map_parse_to_pyerr)?)
            } else {
                None
            };

            let receipt = inner
                .do_obligation_json(json_value, ref_uid)
                .await
                .map_err(map_eyre_to_pyerr)?;

            // Extract the attestation UID from the receipt instead of returning transaction hash
            use alkahest_rs::DefaultAlkahestClient;
            let attested_event =
                DefaultAlkahestClient::get_attested_event(receipt).map_err(map_eyre_to_pyerr)?;
            Ok(format!(
                "0x{}",
                alloy::hex::encode(attested_event.uid.as_slice())
            ))
        })
    }
}

#[pyclass]
#[derive(Clone, Debug)]
pub struct PyStringObligationData {
    #[pyo3(get)]
    pub item: String,
}

#[pymethods]
impl PyStringObligationData {
    #[new]
    pub fn new(item: String) -> Self {
        Self { item }
    }

    fn __repr__(&self) -> String {
        format!("PyStringObligationData(item='{}')", self.item)
    }

    #[staticmethod]
    pub fn encode(obligation: &PyStringObligationData) -> PyResult<Vec<u8>> {
        use alkahest_rs::contracts::StringObligation;
        use alloy::sol_types::SolValue;

        let obligation_data = StringObligation::ObligationData {
            item: obligation.item.clone(),
        };

        Ok(obligation_data.abi_encode())
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyStringObligationData> {
        use alloy::primitives::Bytes;
        let bytes = Bytes::from(obligation_data);
        let decoded =
            alkahest_rs::extensions::StringObligationModule::decode(&bytes)
                .map_err(map_eyre_to_pyerr)?;
        Ok(decoded.into())
    }

    #[staticmethod]
    pub fn decode_json(obligation_data: Vec<u8>) -> PyResult<String> {
        use alloy::primitives::Bytes;
        let bytes = Bytes::from(obligation_data);
        let decoded: serde_json::Value =
            StringObligationModule::decode_json(&bytes)
                .map_err(map_eyre_to_pyerr)?;
        Ok(serde_json::to_string(&decoded).map_err(map_serde_to_pyerr)?)
    }

    #[staticmethod]
    pub fn encode_json(json_data: String) -> PyResult<Vec<u8>> {
        let json_value: serde_json::Value =
            serde_json::from_str(&json_data).map_err(map_serde_to_pyerr)?;
        let encoded = StringObligationModule::encode_json(json_value)
            .map_err(map_eyre_to_pyerr)?;
        Ok(encoded.to_vec())
    }

    #[staticmethod]
    pub fn encode_json_object(json_data: &Bound<'_, PyAny>) -> PyResult<Vec<u8>> {
        let json_string = python_to_json_string(json_data).map_err(map_eyre_to_pyerr)?;
        let json_value: serde_json::Value =
            serde_json::from_str(&json_string).map_err(map_serde_to_pyerr)?;
        let encoded = StringObligationModule::encode_json(json_value)
            .map_err(map_eyre_to_pyerr)?;
        Ok(encoded.to_vec())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyStringObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::StringObligation::ObligationData> for PyStringObligationData {
    fn from(data: alkahest_rs::contracts::StringObligation::ObligationData) -> Self {
        Self { item: data.item }
    }
}
