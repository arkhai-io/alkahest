//! Attestation V1 escrow obligation clients
//!
//! V1 stores the full attestation data in the escrow obligation.
//!
//! - `non_tierable`: 1:1 escrow to fulfillment relationship
//! - `tierable`: 1:many escrow to fulfillment relationship

pub mod non_tierable;
pub mod tierable;

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

    /// Access tierable escrow operations (1:many escrow:fulfillment)
    #[getter]
    pub fn tierable(&self) -> tierable::Tierable {
        tierable::Tierable::new(self.inner.clone())
    }
}
