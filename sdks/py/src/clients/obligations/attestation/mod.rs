//! Attestation obligation module
//!
//! Provides escrow and utility operations for attestation-based obligations.

pub mod escrow;
pub mod util;

use alkahest_rs::extensions::AttestationModule;
use pyo3::{pyclass, pymethods};

#[pyclass]
#[derive(Clone)]
pub struct AttestationClient {
    pub(crate) inner: AttestationModule,
}

impl AttestationClient {
    pub fn new(inner: AttestationModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl AttestationClient {
    /// Access escrow operations (V1 and V2)
    #[getter]
    pub fn escrow(&self) -> escrow::Escrow {
        escrow::Escrow::new(self.inner.clone())
    }

    /// Access utility operations (get_attestation, register_schema, attest)
    #[getter]
    pub fn util(&self) -> util::Util {
        util::Util::new(self.inner.clone())
    }
}
