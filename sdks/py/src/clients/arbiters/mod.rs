//! Arbiters module
//!
//! This module contains clients for interacting with arbiter contracts:
//! - `trusted_oracle`: Trusted oracle arbiter for oracle-based arbitration

pub mod trusted_oracle;

// Re-export main types for backwards compatibility
pub use trusted_oracle::{
    OracleClient, PyArbitrateOptions, PyDecision, PyListenResult, PyOracleAddresses,
    PyOracleAttestation, PyTrustedOracleArbiterDemandData,
};
