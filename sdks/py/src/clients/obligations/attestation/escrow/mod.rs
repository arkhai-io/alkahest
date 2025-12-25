//! Attestation escrow obligation clients

pub mod v1;
pub mod v2;

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
    /// Access V1 escrow operations (stores full attestation data)
    #[getter]
    pub fn v1(&self) -> v1::V1 {
        v1::V1::new(self.inner.clone())
    }

    /// Access V2 escrow operations (references attestation by UID)
    #[getter]
    pub fn v2(&self) -> v2::V2 {
        v2::V2::new(self.inner.clone())
    }
}
