//! Attestation reference escrow obligation clients
//!
//! Reference escrows reference the attestation by UID instead of storing the full data.
//!
//! - `default`: 1:1 escrow to fulfillment relationship
//! - `unconditional`: no default fulfillment checks

pub mod default_escrow;
pub mod unconditional;

use alkahest_rs::extensions::AttestationModule;
use pyo3::{pyclass, pymethods};

/// Attestation-reference escrow API accessor
#[pyclass]
#[derive(Clone)]
pub struct ReferenceEscrow {
    inner: AttestationModule,
}

impl ReferenceEscrow {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl ReferenceEscrow {
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
