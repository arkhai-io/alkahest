//! ERC20 escrow obligations module
//!
//! This module contains escrow obligation clients for ERC20 tokens.
//!
//! - `non_tierable`: 1:1 escrow to fulfillment relationship

pub mod non_tierable;

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
    /// Access non-tierable escrow API (1:1 escrow:fulfillment)
    #[getter]
    pub fn non_tierable(&self) -> non_tierable::NonTierable {
        non_tierable::NonTierable::new(self.inner.clone())
    }
}
