//! Native Token obligations module
//!
//! This module provides functionality for native token (ETH) operations including:
//! - Escrow obligations (tierable and non-tierable)
//! - Payment obligations
//! - Barter utilities for cross-token trading

pub mod barter_utils;
pub mod escrow;
pub mod payment;

use alkahest_rs::extensions::NativeTokenModule;
use pyo3::{pyclass, pymethods};

/// Client for interacting with native token (ETH) operations.
///
/// Provides access to escrow, payment, and barter APIs via properties:
/// - `client.native_token.escrow.non_tierable.create(...)`
/// - `client.native_token.payment.pay(...)`
/// - `client.native_token.barter.buy_erc20_for_native(...)`
#[pyclass]
#[derive(Clone)]
pub struct NativeTokenClient {
    inner: NativeTokenModule,
}

impl NativeTokenClient {
    pub fn new(inner: NativeTokenModule) -> Self {
        Self { inner }
    }
}

#[pymethods]
impl NativeTokenClient {
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
}
