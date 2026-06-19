# Audit Follow-Ups

Tracking larger compatibility-aware follow-ups from audit triage. Keep completed
items in this document, marked as done, until the whole follow-up set is
finished.

## Remaining

### [ ] ERC Conditional Escrow Alignment

Use `erc-conditional-escrow.md` as the major-version API target. The
`erc-conditional-escrow-core.md` split was experimental and should not drive the
repository refactor.

The cleanup should align contract names and public interfaces with the ERC
draft terminology:

- `IArbiter.checkObligation(...)` -> `IArbiter.check(...)`.
- `collectEscrow(...)` / `collectEscrowRaw(...)` -> `collect(...)`.
- `reclaimExpired(...)` -> `reclaim(...)`.
- `extractArbiterAndDemand(...)` -> `decodeCondition(...)`.
- Use `escrowUid`, `fulfillmentUid`, `escrower`, and `fulfiller`
  consistently in events, arguments, docs, and SDKs.
- Avoid describing fulfillment attestations as obligations except where naming
  refers to the concrete contract family.

This is a major-version compatibility break. Update Solidity contracts,
generated ABI artifacts, SDK typed clients, docs, deploy/config surfaces, and
examples together.

Solidity contracts, Solidity tests, scripts, and tracked docs were aligned in
`59f8f628d9099c1dbbef67c3de21fdb17032fa1f`, with formatting-only cleanup in
`9d32a984e7988e37909f7a478e14ebea8de741f8`. Generated ABI artifacts, SDK typed
clients, SDK docs, and deploy/config surfaces remain to be updated.

### [ ] BarterUtils Surface Area

The current BarterUtils contracts are useful as EOA atomic settlement routers:
their `pay*` methods create the payment fulfillment and collect the matching
escrow in the same transaction, which a plain client cannot replicate without a
smart account or a router.

The `buy*` methods are mostly typed escrow-creation conveniences over the core
escrow contracts. Consider deprecating or removing those listing helpers and
moving typed listing construction into the SDKs, while retaining only the
atomic settlement helpers that cannot be reproduced client-side for EOAs.

If this cleanup is done, update contract docs, SDK deploy/config surfaces, and
examples together so BarterUtils are presented as optional atomic settlement
routers rather than core protocol primitives.

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

### [x] Splitter Arbitration Requests

Triaged as no contract change in `docs/drafts/audit-triage.md`.

Splitter arbitration request events are hints. The on-chain authorization path
uses the escrow's local demand to select the oracle and requires that oracle to
have recorded a decision for the fulfillment and escrow pair.

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
