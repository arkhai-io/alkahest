# Audit Follow-Ups

Tracking larger compatibility-aware follow-ups from audit triage. Keep completed
items in this document, marked as done, until the whole follow-up set is
finished.

## Remaining

### [ ] Splitter Arbitration Requests in SDKs

Splitter `requestArbitration` events include caller-supplied oracle and demand
payloads. Those payloads are useful as hints, but they are not canonical when a
splitter is nested inside logical arbiters such as `AllArbiter` or `AnyArbiter`.

SDK and indexer code should re-read the escrow attestation from EAS, interpret
the configured arbiter/demand tree, and decide whether the request is relevant
before prompting or submitting oracle decisions. They should not treat the event
payload alone as authorization or as the canonical splitter demand.

### [ ] SDK Contract Coverage

Generated raw bindings cover the deployable non-example contract surface, but
the ergonomic SDK clients and address maps still need explicit coverage for
newer hook-based escrow and splitter contracts.

`SchemaRegistryUtils` is not part of that missing external surface. It is an
internal Solidity library used by escrow contracts to register or reuse schemas.
The SDKs do not need a deployed-address entry or contract client for it. If
useful, its pure UID derivation can be mirrored later as an SDK helper rather
than as a contract binding.

## Done

### [x] Default Escrow Checks

Completed by `b78de3a569dc4f37f5de0936af415281c84ed08ef`.

The escrow APIs now use the safe default/unconditional split rather than the old
non-tierable/tierable naming. The default escrow contracts perform the default
checks, while the unconditional variants are the explicit escape hatch for
callers that want to compose those checks manually.

Manual composition remains available through arbiters such as
`IntrinsicsArbiter`, `ReferencesEscrowArbiter`, and `AllArbiter`.

### [x] UID-Aware Hook Lifecycle

Completed across:

- `26226a81e6ffb50898269200f89016e6ef476291`
- `fe48ff942e5608813fbd546c498cc7bd63f1d2e6`
- `8f1cd403cd82f29b550cd53348d4c3e7df21a012`
- `69b9048091d3ac2ef571620877a30cc66c2d8432`

Hook-based escrows now have post-attest hook context built around the EAS
attestation, including the created UID. The native hook lifecycle was updated so
conceptual lock work and post-attest binding can be separated cleanly.

### [x] Per-Demand Commit-Reveal Bonds

Completed by `fd47376f37cf367e3ee1fd0fa82b31ac8f28dbf6`.

`CommitRevealObligation` is now the per-demand/per-commit bond variant. The
committer supplies the bond value with the commit, and `checkObligation`
validates the revealed commitment against the bond demanded by the escrow. The
previous global contract-level bond behavior was retained separately as
`GlobalBondCommitRevealObligation`.

### [x] Base Splitter Refactor

Completed by `173d34c8b87f237d4f0ac4770f5ee37c244473a3`.

The splitter contracts now share base orchestration for common fulfillment
creation, created-fulfillment validation, executor-sentinel resolution,
arbitration request helpers, decision-key helpers, and native refund proxying.
Asset-specific arbitration, escrow collection, receipt verification, and
distribution remain local to each splitter type.

### [x] Remove IntrinsicsArbiter2

Completed by `395a6ade1482f0e5c0d598fa504a43cc2d0c4ea1`.

`IntrinsicsArbiter2` was removed in favor of composing `IntrinsicsArbiter` and
`SchemaArbiter` through logical arbiters when both checks are needed. Contract
deployment outputs, SDK address maps, generated bindings, dist artifacts, tests,
and docs were updated accordingly.
