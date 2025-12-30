//! ERC1155 escrow obligations module
//!
//! - `non_tierable`: 1:1 escrow to fulfillment relationship
//! - `tierable`: 1:many escrow to fulfillment relationship

pub mod non_tierable;
pub mod tierable;

use alkahest_rs::extensions::Erc1155Module;
use pyo3::{pyclass, pymethods};

/// Escrow API for ERC1155 tokens
#[pyclass]
#[derive(Clone)]
pub struct Escrow {
    inner: Erc1155Module,
}

impl Escrow {
    pub fn new(inner: Erc1155Module) -> Self {
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

    /// Access tierable escrow API (1:many escrow:fulfillment)
    #[getter]
    pub fn tierable(&self) -> tierable::Tierable {
        tierable::Tierable::new(self.inner.clone())
    }
}
