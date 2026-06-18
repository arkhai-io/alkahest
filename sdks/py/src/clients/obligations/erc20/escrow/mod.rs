//! ERC20 escrow obligations module
//!
//! This module contains escrow obligation clients for ERC20 tokens.
//!
//! - `default`: 1:1 escrow to fulfillment relationship
//! - `unconditional`: no default fulfillment checks

pub mod default_escrow;
pub mod unconditional;

use alkahest_rs::extensions::Erc20Module;
use pyo3::{pyclass, pymethods};

/// Escrow API for ERC20 tokens
#[pyclass]
#[derive(Clone)]
pub struct Escrow {
    inner: Erc20Module,
}

impl Escrow {
    pub fn new(inner: Erc20Module) -> Self {
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
