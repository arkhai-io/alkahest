//! Arbiters module
//!
//! This module contains clients for interacting with arbiter contracts:
//! - `trusted_oracle`: Trusted oracle arbiter for oracle-based arbitration
//! - `confirmation`: Confirmation-based arbiters (exclusive/nonexclusive, revocable/unrevocable)
//! - `logical`: Logical arbiters (AllArbiter, AnyArbiter)

pub mod confirmation;
pub mod logical;
pub mod trusted_oracle;

use alkahest_rs::extensions::ArbitersModule;
use pyo3::{pyclass, pymethods};

// Re-export main types for backwards compatibility
pub use trusted_oracle::{
    OracleClient, PyArbitrateOptions, PyArbitrationMode, PyAttestationWithDemand, PyDecision,
    PyListenResult, PyOracleAddresses, PyOracleAttestation, PyTrustedOracleArbiterDemandData,
    TrustedOracle,
};

// Re-export confirmation types
pub use confirmation::{
    exclusive_revocable::{ExclusiveRevocable, PyConfirmationMadeLog, PyConfirmationRequestedLog},
    exclusive_unrevocable::ExclusiveUnrevocable,
    nonexclusive_revocable::NonexclusiveRevocable,
    nonexclusive_unrevocable::NonexclusiveUnrevocable,
    Confirmation, PyConfirmationArbiterType,
};

// Re-export logical types
pub use logical::{
    AllArbiter, AnyArbiter, Logical, PyDecodedAllArbiterDemandData, PyDecodedAnyArbiterDemandData,
    PyDecodedDemand,
};

/// Python representation of ArbitrationMade event
#[pyclass]
#[derive(Clone, Debug)]
pub struct PyArbitrationMadeLog {
    #[pyo3(get)]
    pub decision_key: String,
    #[pyo3(get)]
    pub obligation: String,
    #[pyo3(get)]
    pub oracle: String,
    #[pyo3(get)]
    pub decision: bool,
}

#[pymethods]
impl PyArbitrationMadeLog {
    fn __repr__(&self) -> String {
        format!(
            "PyArbitrationMadeLog(obligation='{}', oracle='{}', decision={})",
            self.obligation, self.oracle, self.decision
        )
    }
}

/// Client for interacting with Alkahest arbiters
///
/// This client provides access to all arbiter functionality including:
/// - Confirmation arbiters (exclusive/nonexclusive, revocable/unrevocable)
/// - Logical arbiters (AllArbiter, AnyArbiter)
/// - Trusted oracle arbitration
#[pyclass]
#[derive(Clone)]
pub struct ArbitersClient {
    inner: ArbitersModule,
}

impl ArbitersClient {
    pub fn new(inner: ArbitersModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl ArbitersClient {
    /// Access confirmation arbiters API
    #[getter]
    pub fn confirmation(&self) -> Confirmation {
        Confirmation::new(self.inner.clone())
    }

    /// Access logical arbiters API
    #[getter]
    pub fn logical(&self) -> Logical {
        Logical::new(self.inner.clone())
    }

    /// Access trusted oracle arbiter API
    #[getter]
    pub fn trusted_oracle(&self) -> TrustedOracle {
        TrustedOracle::new(self.inner.clone())
    }

    // ===== Address getters =====

    /// Get the EAS address
    pub fn eas_address(&self) -> String {
        format!("{:?}", self.inner.addresses.eas)
    }

    /// Get the TrivialArbiter address
    pub fn trivial_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.trivial_arbiter)
    }

    /// Get the TrustedOracleArbiter address
    pub fn trusted_oracle_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.trusted_oracle_arbiter)
    }

    /// Get the IntrinsicsArbiter address
    pub fn intrinsics_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.intrinsics_arbiter)
    }

    /// Get the IntrinsicsArbiter2 address
    pub fn intrinsics_arbiter_2_address(&self) -> String {
        format!("{:?}", self.inner.addresses.intrinsics_arbiter_2)
    }

    /// Get the ERC8004Arbiter address
    pub fn erc8004_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.erc8004_arbiter)
    }

    /// Get the AnyArbiter address
    pub fn any_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.any_arbiter)
    }

    /// Get the AllArbiter address
    pub fn all_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.all_arbiter)
    }

    /// Get the RecipientArbiter address
    pub fn recipient_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.recipient_arbiter)
    }

    /// Get the UidArbiter address
    pub fn uid_arbiter_address(&self) -> String {
        format!("{:?}", self.inner.addresses.uid_arbiter)
    }

    /// Get the address of a confirmation arbiter by type
    pub fn confirmation_arbiter_address(&self, arbiter_type: PyConfirmationArbiterType) -> String {
        self.confirmation().address(arbiter_type)
    }
}
