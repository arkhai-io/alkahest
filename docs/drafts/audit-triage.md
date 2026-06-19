# Audit Triage

Tracking audit items that were reviewed and classified as fixed, accepted,
deferred, or not issues. Use absolute commit hashes for completed changes so the
record remains stable over time.

## Fixed

### ERC-8004 Validation Binding

Status: fixed.

Completed by `49825afc14c68869934f24f74acfbccaf749e158`.

`ERC8004Arbiter.DemandData` now includes caller-supplied `bytes data`, and the
ERC-8004 validation request hash is derived from the fulfillment UID and that
data with `keccak256(abi.encode(uid, data))`.

## Not Issues

### Splitter Arbitration Request Payloads

Status: no contract change.

Splitter `requestArbitration` events are non-authoritative hints, matching the
general oracle-request pattern used by `TrustedOracleArbiter`. A caller-chosen
event payload does not authorize settlement.

The splitter decision model intentionally differs from `TrustedOracleArbiter`.
`TrustedOracleArbiter` keys decisions by `(obligation uid, demand data)` because
the arbiter has no escrow-specific asset context. Splitters key decisions by
`(fulfillment uid, escrow uid)` because each split decision is a distribution of
one specific escrow's locked assets. The escrow's local demand selects the
expected oracle during `checkObligation`, so spoofed request events cannot make a
splitter check pass.
