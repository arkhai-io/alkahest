//! TokenBundle obligations module

pub mod barter_utils;
pub mod escrow;
pub mod payment;
pub mod util;

use alkahest_rs::extensions::TokenBundleModule;
use pyo3::{pyclass, pymethods};

/// Client for interacting with TokenBundle operations.
#[pyclass]
#[derive(Clone)]
pub struct TokenBundleClient {
    inner: TokenBundleModule,
}

impl TokenBundleClient {
    pub fn new(inner: TokenBundleModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl TokenBundleClient {
    /// Access escrow API
    #[getter]
    pub fn escrow(&self) -> escrow::Escrow {
        escrow::Escrow::new(self.inner.clone())
    }

    /// Access payment API
    #[getter]
    pub fn payment(&self) -> payment::Payment {
        payment::Payment::new(self.inner.clone())
    }

    /// Access barter utilities API
    #[getter]
    pub fn barter(&self) -> barter_utils::BarterUtils {
        barter_utils::BarterUtils::new(self.inner.clone())
    }

    /// Access utility API (approvals)
    #[getter]
    pub fn util(&self) -> util::Util {
        util::Util::new(self.inner.clone())
    }
}
