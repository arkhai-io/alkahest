//! Attestation V2 escrow obligation clients
//!
//! V2 references the attestation by UID instead of storing the full data.
//!
//! - `default`: 1:1 escrow to fulfillment relationship
//! - `unconditional`: no default fulfillment checks

pub mod default_escrow;
pub mod unconditional;

use alkahest_rs::extensions::AttestationModule;
use pyo3::{pyclass, pymethods};

/// V2 escrow API accessor
#[pyclass]
#[derive(Clone)]
pub struct V2 {
    inner: AttestationModule,
}

impl V2 {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl V2 {
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
