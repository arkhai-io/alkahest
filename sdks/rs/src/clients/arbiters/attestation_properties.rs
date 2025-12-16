//! Attestation property arbiters
//!
//! This module contains arbiters that validate specific properties of attestations.
//! All composing variants have been removed - use AllArbiter with non-composing arbiters instead.

use crate::{clients::arbiters::ArbitersModule, contracts, impl_abi_conversions, impl_from_attestation};

// Implement ABI conversions for all attestation property arbiters
impl_abi_conversions!(contracts::arbiters::attestation_properties::AttesterArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::ExpirationTimeAfterArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::ExpirationTimeBeforeArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::ExpirationTimeEqualArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::RecipientArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::RefUidArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::RevocableArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::SchemaArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::TimeAfterArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::TimeBeforeArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::TimeEqualArbiter::DemandData);
impl_abi_conversions!(contracts::arbiters::attestation_properties::UidArbiter::DemandData);

// Implement From<IEAS::Attestation> for UidArbiter Attestation type
impl_from_attestation!(contracts::arbiters::attestation_properties::UidArbiter::Attestation);

/// Attestation properties arbiters API providing structured access to arbiter functionality
pub struct AttestationProperties<'a> {
    _module: &'a ArbitersModule,
}

impl<'a> AttestationProperties<'a> {
    pub fn new(module: &'a ArbitersModule) -> Self {
        Self { _module: module }
    }
}
