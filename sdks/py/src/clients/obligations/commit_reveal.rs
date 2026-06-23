use alkahest_rs::extensions::CommitRevealObligationModule;
use alloy::primitives::{FixedBytes, U256};
use pyo3::{pyclass, pymethods, PyResult};

use crate::error_handling::{map_eyre_to_pyerr, map_parse_to_pyerr};

use crate::contract::PyDecodedAttestation;

/// Python client wrapper for `CommitRevealObligation`.
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
    /// Load a fulfillment attestation and decode its commit-reveal data.
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

    /// Reveal committed data and create a fulfillment attestation.
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

    /// Submit a commitment hash, lock `bond_amount`, and record the demand reveal deadline.
    pub fn commit<'py>(
        &self,
        py: pyo3::Python<'py>,
        commitment: String,
        bond_amount: u128,
        commit_deadline: u128,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let commitment: FixedBytes<32> = commitment.parse().map_err(map_parse_to_pyerr)?;
            let receipt = inner
                .commit(
                    commitment,
                    U256::from(bond_amount),
                    U256::from(commit_deadline),
                )
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok(format!(
                "0x{}",
                alloy::hex::encode(receipt.transaction_hash.as_slice())
            ))
        })
    }

    /// Compute the commitment hash expected by the Solidity contract.
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

    /// Slash an unrevealed commitment after its reveal deadline has passed.
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

    /// Read the configured recipient of slashed commitment bonds.
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

    /// Read raw commitment metadata for a commitment hash.
    pub fn get_commitment<'py>(
        &self,
        py: pyo3::Python<'py>,
        commitment: String,
    ) -> PyResult<pyo3::Bound<'py, pyo3::PyAny>> {
        let inner = self.inner.clone();
        pyo3_async_runtimes::tokio::future_into_py(py, async move {
            let commitment: FixedBytes<32> = commitment.parse().map_err(map_parse_to_pyerr)?;
            let (commit_block, commit_timestamp, committer, bond_amount, commit_deadline) = inner
                .get_commitment(commitment)
                .await
                .map_err(map_eyre_to_pyerr)?;
            Ok((
                commit_block,
                commit_timestamp,
                format!("{:?}", committer),
                bond_amount.to_string(),
                commit_deadline.to_string(),
            ))
        })
    }

    /// Return whether a commitment bond has already been returned or slashed.
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

/// Python representation of commit-reveal obligation data.
#[pyclass]
#[derive(Clone, Debug)]
pub struct PyCommitRevealObligationData {
    /// Arbitrary self-contained payload being revealed.
    #[pyo3(get)]
    pub payload: Vec<u8>,
    /// Fulfiller-chosen salt included in the commitment.
    #[pyo3(get)]
    pub salt: String,
    /// Application-level schema or tag describing the payload format.
    #[pyo3(get)]
    pub schema: String,
}

#[pymethods]
impl PyCommitRevealObligationData {
    #[new]
    /// Create commit-reveal obligation data.
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
    /// ABI-encode commit-reveal obligation data.
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
    /// Decode ABI-encoded commit-reveal obligation data.
    pub fn decode(obligation_data: Vec<u8>) -> PyResult<PyCommitRevealObligationData> {
        use alloy::primitives::Bytes;
        let bytes = Bytes::from(obligation_data);
        let decoded = CommitRevealObligationModule::decode(&bytes).map_err(map_eyre_to_pyerr)?;
        Ok(decoded.into())
    }

    /// ABI-encode this commit-reveal obligation data.
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

/// Python representation of commit-reveal arbiter demand data.
#[pyclass]
#[derive(Clone, Debug)]
pub struct PyCommitRevealDemandData {
    /// Exact native-token bond amount required, encoded as a base-10 string.
    #[pyo3(get)]
    pub bond_amount: String,
    /// Relative reveal deadline in seconds after commit, encoded as a base-10 string.
    #[pyo3(get)]
    pub commit_deadline: String,
}

#[pymethods]
impl PyCommitRevealDemandData {
    #[new]
    /// Create commit-reveal demand data.
    pub fn new(bond_amount: String, commit_deadline: String) -> Self {
        Self {
            bond_amount,
            commit_deadline,
        }
    }

    fn __repr__(&self) -> String {
        format!(
            "PyCommitRevealDemandData(bond_amount='{}', commit_deadline='{}')",
            self.bond_amount, self.commit_deadline
        )
    }

    #[staticmethod]
    /// ABI-encode commit-reveal demand data.
    pub fn encode(demand: &PyCommitRevealDemandData) -> PyResult<Vec<u8>> {
        use alloy::sol_types::SolValue;

        let demand_data = alkahest_rs::contracts::obligations::CommitRevealObligation::DemandData {
            bondAmount: U256::from_str_radix(&demand.bond_amount, 10)
                .map_err(map_parse_to_pyerr)?,
            commitDeadline: U256::from_str_radix(&demand.commit_deadline, 10)
                .map_err(map_parse_to_pyerr)?,
        };

        Ok(demand_data.abi_encode())
    }

    #[staticmethod]
    /// Decode ABI-encoded commit-reveal demand data.
    pub fn decode(demand_data: Vec<u8>) -> PyResult<PyCommitRevealDemandData> {
        use alloy::primitives::Bytes;
        let bytes = Bytes::from(demand_data);
        let decoded =
            CommitRevealObligationModule::decode_demand(&bytes).map_err(map_eyre_to_pyerr)?;
        Ok(decoded.into())
    }

    /// ABI-encode this commit-reveal demand data.
    pub fn encode_self(&self) -> PyResult<Vec<u8>> {
        PyCommitRevealDemandData::encode(self)
    }
}

impl From<alkahest_rs::contracts::obligations::CommitRevealObligation::DemandData>
    for PyCommitRevealDemandData
{
    fn from(data: alkahest_rs::contracts::obligations::CommitRevealObligation::DemandData) -> Self {
        Self {
            bond_amount: data.bondAmount.to_string(),
            commit_deadline: data.commitDeadline.to_string(),
        }
    }
}
