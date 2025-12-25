//! TokenBundle escrow obligations module

pub mod non_tierable;

use alkahest_rs::extensions::TokenBundleModule;
use pyo3::{pyclass, pymethods};

/// Escrow API for TokenBundle
#[pyclass]
#[derive(Clone)]
pub struct Escrow {
    inner: TokenBundleModule,
}

impl Escrow {
    pub fn new(inner: TokenBundleModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl Escrow {
    /// Access non-tierable escrow API (1:1 escrow:fulfillment)
    #[getter]
    pub fn non_tierable(&self) -> non_tierable::NonTierable {
        non_tierable::NonTierable::new(self.inner.clone())
    }
}
