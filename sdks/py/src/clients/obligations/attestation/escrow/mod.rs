//! Attestation escrow obligation clients

pub mod default;
pub mod reference;

use alkahest_rs::extensions::AttestationModule;
use pyo3::{pyclass, pymethods};

/// Escrow API accessor for attestation obligations
#[pyclass]
#[derive(Clone)]
pub struct Escrow {
    inner: AttestationModule,
}

impl Escrow {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Escrow {
    /// Access default escrow operations (stores full attestation data)
    #[getter]
    pub fn default(&self) -> default::DefaultEscrow {
        default::DefaultEscrow::new(self.inner.clone())
    }

    /// Access attestation-reference escrow operations
    #[getter]
    pub fn reference(&self) -> reference::ReferenceEscrow {
        reference::ReferenceEscrow::new(self.inner.clone())
    }
}
