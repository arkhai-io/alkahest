//! Attestation V1 escrow obligation clients
//!
//! V1 stores the full attestation data in the escrow obligation.

pub mod non_tierable;

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
    /// Access non-tierable escrow operations (1:1 escrow:fulfillment)
    #[getter]
    pub fn non_tierable(&self) -> non_tierable::NonTierable {
        non_tierable::NonTierable::new(self.inner.clone())
    }
}
