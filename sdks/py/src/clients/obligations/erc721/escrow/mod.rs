//! ERC721 escrow obligations module

pub mod non_tierable;

use alkahest_rs::extensions::Erc721Module;
use pyo3::{pyclass, pymethods};

/// Escrow API for ERC721 tokens
#[pyclass]
#[derive(Clone)]
pub struct Escrow {
    inner: Erc721Module,
}

impl Escrow {
    pub fn new(inner: Erc721Module) -> Self {
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
