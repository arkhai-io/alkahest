//! Attestation V2 escrow obligation clients
//!
//! V2 references the attestation by UID instead of storing the full data.
//!
//! - `non_tierable`: 1:1 escrow to fulfillment relationship
//! - `tierable`: 1:many escrow to fulfillment relationship

pub mod non_tierable;
pub mod tierable;

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

    /// Access tierable escrow operations (1:many escrow:fulfillment)
    #[getter]
    pub fn tierable(&self) -> tierable::Tierable {
        tierable::Tierable::new(self.inner.clone())
    }
}
