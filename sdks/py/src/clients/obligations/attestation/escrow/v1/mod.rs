//! Attestation V1 escrow obligation clients
//!
//! V1 stores the full attestation data in the escrow obligation.
//!
//! - `default`: 1:1 escrow to fulfillment relationship
//! - `unconditional`: no default fulfillment checks

pub mod default_escrow;
pub mod unconditional;

use alkahest_rs::extensions::AttestationModule;
use pyo3::{pyclass, pymethods};

/// V1 escrow API accessor
#[pyclass]
#[derive(Clone)]
pub struct V1 {
    inner: AttestationModule,
}

impl V1 {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl V1 {
    /// Access default escrow operations (1:1 escrow:fulfillment)
    #[getter]
    pub fn default(&self) -> default_escrow::Default {
        default_escrow::Default::new(self.inner.clone())
    }

    /// Access unconditional escrow operations (no default fulfillment checks)
    #[getter]
    pub fn unconditional(&self) -> unconditional::Unconditional {
        unconditional::Unconditional::new(self.inner.clone())
    }
}
