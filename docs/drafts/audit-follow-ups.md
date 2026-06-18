# Audit Follow-Ups

Tracking larger compatibility-aware follow-ups from audit triage.

## Splitter Arbitration Requests in SDKs

Splitter `requestArbitration` events include caller-supplied oracle and demand
payloads. Those payloads are useful as hints, but they are not canonical when a
splitter is nested inside logical arbiters such as `AllArbiter` or `AnyArbiter`.

SDK and indexer code should re-read the escrow attestation from EAS, interpret
the configured arbiter/demand tree, and decide whether the request is relevant
before prompting or submitting oracle decisions. They should not treat the event
payload alone as authorization or as the canonical splitter demand.

## SDK Contract Coverage

Generated raw bindings cover the deployable non-example contract surface, but
the ergonomic SDK clients and address maps still need explicit coverage for
newer hook-based escrow and splitter contracts.

`SchemaRegistryUtils` is not part of that missing external surface. It is an
internal Solidity library used by escrow contracts to register or reuse schemas.
The SDKs do not need a deployed-address entry or contract client for it. If
useful, its pure UID derivation can be mirrored later as an SDK helper rather
than as a contract binding.
