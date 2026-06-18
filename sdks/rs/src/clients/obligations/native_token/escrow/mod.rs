//! Native Token escrow obligations module
//!
//! This module contains escrow obligation clients for native tokens.
//!
//! - `default`: 1:1 escrow to fulfillment relationship
//! - `unconditional`: no default fulfillment checks

pub mod default_escrow;
pub mod unconditional;

use super::NativeTokenModule;

/// Escrow API for native tokens
pub struct Escrow<'a> {
    module: &'a NativeTokenModule,
}

impl<'a> Escrow<'a> {
    pub fn new(module: &'a NativeTokenModule) -> Self {
        Self { module }
    }

    /// Access default escrow API (1:1 escrow:fulfillment)
    pub fn default(&self) -> default_escrow::Default<'_> {
        default_escrow::Default::new(self.module)
    }

    /// Access unconditional escrow API (no default fulfillment checks)
    pub fn unconditional(&self) -> unconditional::Unconditional<'_> {
        unconditional::Unconditional::new(self.module)
    }
}
