//! ERC1155 escrow obligations module
//!
//! - `default`: 1:1 escrow to fulfillment relationship
//! - `unconditional`: no default fulfillment checks

pub mod default_escrow;
pub mod unconditional;

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
    /// Access default escrow API (1:1 escrow:fulfillment)
    #[getter]
    pub fn default(&self) -> default_escrow::Default {
        default_escrow::Default::new(self.inner.clone())
    }

    /// Access unconditional escrow API (no default fulfillment checks)
    #[getter]
    pub fn unconditional(&self) -> unconditional::Unconditional {
        unconditional::Unconditional::new(self.inner.clone())
    }
}
