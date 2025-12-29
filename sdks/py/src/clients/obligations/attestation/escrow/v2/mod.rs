//! Attestation V2 escrow obligation clients
//!
//! V2 references the attestation by UID instead of storing the full data.

pub mod non_tierable;

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
    /// Access non-tierable escrow operations (1:1 escrow:fulfillment)
    #[getter]
    pub fn non_tierable(&self) -> non_tierable::NonTierable {
        non_tierable::NonTierable::new(self.inner.clone())
    }
}
