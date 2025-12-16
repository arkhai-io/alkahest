//! Confirmation arbiters module
//!
//! This module contains arbiters that handle confirmation-based logic
//! for attestation validation.
//!
//! The confirmation arbiters have been restructured with new naming:
//! - ExclusiveRevocableConfirmationArbiter: Single fulfillment per escrow, can revoke
//! - ExclusiveUnrevocableConfirmationArbiter: Single fulfillment per escrow, cannot revoke
//! - NonexclusiveRevocableConfirmationArbiter: Multiple fulfillments per escrow, can revoke
//! - NonexclusiveUnrevocableConfirmationArbiter: Multiple fulfillments per escrow, cannot revoke
//!
//! Note: These arbiters do not use DemandData - they use confirmations mapping.

pub mod exclusive_revocable;
pub mod exclusive_unrevocable;
pub mod nonexclusive_revocable;
pub mod nonexclusive_unrevocable;

use alloy::primitives::Address;

use crate::clients::arbiters::ArbitersModule;

/// Confirmation arbiter type
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ConfirmationArbiterType {
    /// Only one fulfillment can be confirmed per escrow, confirmation can be revoked
    ExclusiveRevocable,
    /// Only one fulfillment can be confirmed per escrow, confirmation cannot be revoked
    ExclusiveUnrevocable,
    /// Multiple fulfillments can be confirmed per escrow, confirmations can be revoked
    NonexclusiveRevocable,
    /// Multiple fulfillments can be confirmed per escrow, confirmations cannot be revoked
    NonexclusiveUnrevocable,
}

/// Confirmation arbiters API
pub struct Confirmation<'a> {
    module: &'a ArbitersModule,
}

impl<'a> Confirmation<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { module }
    }

    /// Access ExclusiveRevocableConfirmationArbiter
    pub fn exclusive_revocable(&self) -> exclusive_revocable::ExclusiveRevocable<'_> {
        exclusive_revocable::ExclusiveRevocable::new(self.module)
    }

    /// Access ExclusiveUnrevocableConfirmationArbiter
    pub fn exclusive_unrevocable(&self) -> exclusive_unrevocable::ExclusiveUnrevocable<'_> {
        exclusive_unrevocable::ExclusiveUnrevocable::new(self.module)
    }

    /// Access NonexclusiveRevocableConfirmationArbiter
    pub fn nonexclusive_revocable(&self) -> nonexclusive_revocable::NonexclusiveRevocable<'_> {
        nonexclusive_revocable::NonexclusiveRevocable::new(self.module)
    }

    /// Access NonexclusiveUnrevocableConfirmationArbiter
    pub fn nonexclusive_unrevocable(&self) -> nonexclusive_unrevocable::NonexclusiveUnrevocable<'_> {
        nonexclusive_unrevocable::NonexclusiveUnrevocable::new(self.module)
    }
}

impl ArbitersModule {
    /// Get the address of a confirmation arbiter by type
    pub fn confirmation_arbiter_address(&self, arbiter_type: ConfirmationArbiterType) -> Address {
        match arbiter_type {
            ConfirmationArbiterType::ExclusiveRevocable => {
                self.addresses.exclusive_revocable_confirmation_arbiter
            }
            ConfirmationArbiterType::ExclusiveUnrevocable => {
                self.addresses.exclusive_unrevocable_confirmation_arbiter
            }
            ConfirmationArbiterType::NonexclusiveRevocable => {
                self.addresses.nonexclusive_revocable_confirmation_arbiter
            }
            ConfirmationArbiterType::NonexclusiveUnrevocable => {
                self.addresses.nonexclusive_unrevocable_confirmation_arbiter
            }
        }
    }

    /// Access confirmation arbiters API
    ///
    /// # Example
    /// ```rust,ignore
    /// arbiters.confirmation().exclusive_revocable().confirm(fulfillment, escrow).await?;
    /// arbiters.confirmation().nonexclusive_revocable().revoke(fulfillment, escrow).await?;
    /// ```
    pub fn confirmation(&self) -> Confirmation<'_> {
        Confirmation::new(self)
    }
}
