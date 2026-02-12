use alkahest_rs::extensions::CommitRevealObligationModule;
use alloy::primitives::FixedBytes;
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr};

use crate::contract::PyDecodedAttestation;

#[pyclass]
#[derive(Clone)]
pub struct CommitRevealObligationClient {
    inner: CommitRevealObligationModule,
}

impl CommitRevealObligationClient {
    pub fn new(inner: CommitRevealObligationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl CommitRevealObligationClient {
    pub fn get_obligation<'py>(
        &self,
        py: pyo3::Python<'py>,
        uid: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let uid: FixedBytes<32> = uid.parse().map_err(map_parse_to_pyerr)?;
            let obligation = inner.get_obligation(uid).await.map_err(map_eyre_to_pyerr)?;
            Ok(PyDecodedAttestation::<PyCommitRevealObligationData>::from(
                obligation,
            ))
        })
    }

    #[pyo3(signature = (payload, salt, schema, ref_uid=None))]
    pub fn do_obligation<'py>(
        &self,
        py: pyo3::Python<'py>,
        payload: Vec<u8>,
        salt: String,
        schema: String,
        ref_uid: Option<String>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let salt: FixedBytes<32> = salt.parse().map_err(map_parse_to_pyerr)?;
            let schema: FixedBytes<32> = schema.parse().map_err(map_parse_to_pyerr)?;
            let ref_uid = if let Some(ref_uid_str) = ref_uid {
                Some(ref_uid_str.parse().map_err(map_parse_to_pyerr)?)
            } else {
                None
            };

            let data =
                alkahest_rs::contracts::obligations::CommitRevealObligation::ObligationData {
                    payload: payload.into(),
                    salt,
                    schema,
                };

            let receipt = inner
                .do_obligation(data, ref_uid)
                .await
                .map_err(map_eyre_to_pyerr)?;

            use alkahest_rs::DefaultAlkahestClient;
            let attested_event =
                DefaultAlkahestClient::get_attested_event(receipt).map_err(map_eyre_to_pyerr)?;
            Ok(format!(
                "0x{}",
                alloy::hex::encode(attested_event.uid.as_slice())
            ))
        })
    }

    pub fn commit<'py>(
        &self,
        py: pyo3::Python<'py>,
        commitment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let commitment: FixedBytes<32> = commitment.parse().map_err(map_parse_to_pyerr)?;
            let receipt = inner.commit(commitment).await.map_err(map_eyre_to_pyerr)?;
            Ok(format!(
                "0x{}",
                alloy::hex::encode(receipt.transaction_hash.as_slice())
            ))
        })
    }

    pub fn compute_commitment<'py>(
        &self,
        py: pyo3::Python<'py>,
        ref_uid: String,
        claimer: String,
        payload: Vec<u8>,
        salt: String,
        schema: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let ref_uid: FixedBytes<32> = ref_uid.parse().map_err(map_parse_to_pyerr)?;
            let claimer = claimer.parse().map_err(map_parse_to_pyerr)?;
            let salt: FixedBytes<32> = salt.parse().map_err(map_parse_to_pyerr)?;
            let schema: FixedBytes<32> = schema.parse().map_err(map_parse_to_pyerr)?;

            let data =
                alkahest_rs::contracts::obligations::CommitRevealObligation::ObligationData {
                    payload: payload.into(),
                    salt,
                    schema,
                };

            let result = inner
                .compute_commitment(ref_uid, claimer, data)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(format!("0x{}", alloy::hex::encode(result.as_slice())))
        })
    }

    pub fn reclaim_bond<'py>(
        &self,
        py: pyo3::Python<'py>,
        obligation_uid: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let obligation_uid: FixedBytes<32> =
                obligation_uid.parse().map_err(map_parse_to_pyerr)?;
            let receipt = inner
                .reclaim_bond(obligation_uid)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(format!(
                "0x{}",
                alloy::hex::encode(receipt.transaction_hash.as_slice())
            ))
        })
    }

    pub fn slash_bond<'py>(
        &self,
        py: pyo3::Python<'py>,
        commitment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let commitment: FixedBytes<32> = commitment.parse().map_err(map_parse_to_pyerr)?;
            let receipt = inner
                .slash_bond(commitment)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(format!(
                "0x{}",
                alloy::hex::encode(receipt.transaction_hash.as_slice())
            ))
        })
    }

    pub fn bond_amount<'py>(
        &self,
        py: pyo3::Python<'py>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let result = inner.bond_amount().await.map_err(map_eyre_to_pyerr)?;
            Ok(result.to_string())
        })
    }

    pub fn commit_deadline<'py>(
        &self,
        py: pyo3::Python<'py>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let result = inner.commit_deadline().await.map_err(map_eyre_to_pyerr)?;
            Ok(result.to_string())
        })
    }

    pub fn slashed_bond_recipient<'py>(
        &self,
        py: pyo3::Python<'py>,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let result = inner
                .slashed_bond_recipient()
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(format!("{:?}", result))
        })
    }

    pub fn get_commitment<'py>(
        &self,
        py: pyo3::Python<'py>,
        commitment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let commitment: FixedBytes<32> = commitment.parse().map_err(map_parse_to_pyerr)?;
            let (commit_block, commit_timestamp, committer) = inner
                .get_commitment(commitment)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok((commit_block, commit_timestamp, format!("{:?}", committer)))
        })
    }

    pub fn is_commitment_claimed<'py>(
        &self,
        py: pyo3::Python<'py>,
        commitment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let commitment: FixedBytes<32> = commitment.parse().map_err(map_parse_to_pyerr)?;
            let result = inner
                .is_commitment_claimed(commitment)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(result)
        })
    }
}

#[pyclass]
#[derive(Clone, Debug)]
pub struct PyCommitRevealObligationData {
    #[pyo3(get)]
    pub payload: Vec<u8>,
    #[pyo3(get)]
    pub salt: String,
    #[pyo3(get)]
    pub schema: String,
}

#[pymethods]
impl PyCommitRevealObligationData {
    #[new]
    pub fn new(payload: Vec<u8>, salt: String, schema: String) -> Self {
        Self {
            payload,
            salt,
            schema,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyCommitRevealObligationData(payload=<{} bytes>, salt='{}', schema='{}')",
            self.payload.len(),
            self.salt,
            self.schema
        )
    }

    #[staticmethod]
    pub fn encode(obligation: &PyCommitRevealObligationData) -> PyResult<Vec<u8>> {
        use alloy::sol_types::SolValue;

        let salt: FixedBytes<32> = obligation.salt.parse().map_err(map_parse_to_pyerr)?;
        let schema: FixedBytes<32> = obligation.schema.parse().map_err(map_parse_to_pyerr)?;

        let obligation_data =
            alkahest_rs::contracts::obligations::CommitRevealObligation::ObligationData {
                payload: obligation.payload.clone().into(),
                salt,
                schema,
            };

        Ok(obligation_data.abi_encode())
    }

    #[staticmethod]
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyCommitRevealObligationData> {
        use alloy::primitives::Bytes;
        let bytes = Bytes::from(obligation_data);
        let decoded =
            CommitRevealObligationModule::decode(&bytes).map_err(map_eyre_to_pyerr)?;
        Ok(decoded.into())
    }

    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyCommitRevealObligationData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::CommitRevealObligation::ObligationData>
    for PyCommitRevealObligationData
{
    fn from(
        data: alkahest_rs::contracts::obligations::CommitRevealObligation::ObligationData,
    ) -> Self {
        Self {
            payload: data.payload.to_vec(),
            salt: format!("0x{}", alloy::hex::encode(data.salt.as_slice())),
            schema: format!("0x{}", alloy::hex::encode(data.schema.as_slice())),
        }
    }
}
