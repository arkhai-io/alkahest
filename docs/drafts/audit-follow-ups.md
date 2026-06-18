# Audit Follow-Ups

Tracking larger compatibility-aware follow-ups from audit triage.

## Default Escrow Checks

### Context

The current escrow variants split on whether a fulfillment must reference the
escrow being collected. The non-tierable base checks `fulfillment.refUID ==
escrow.uid`; the tierable base does not, allowing one fulfillment to satisfy
multiple escrows.

Fulfillment intrinsic checks are currently mostly provided by the configured
arbiter. That creates two problems:

- Safe default escrow flows can require every semantic arbiter to duplicate
  validity checks.
- If escrow itself adds fulfillment intrinsic checks, bundled arbiters that also
  call `_checkIntrinsic` perform the same check twice.

### Proposed Direction

Keep the unprefixed escrow contracts as the safe default:

- Check the escrow attestation schema and intrinsics.
- Check the fulfillment attestation intrinsics.
- Check that `fulfillment.refUID == escrow.uid`.
- Delegate semantic fulfillment matching to the configured arbiter.

Add or rename the escape-hatch escrow variants to make their behavior explicit:

- `Unconditional*EscrowObligation` should check only the escrow attestation
  itself and then delegate fulfillment policy to the configured arbiter.
- It should not check fulfillment intrinsics.
- It should not check `fulfillment.refUID`.

Manual composition can then restore individual default checks when needed:

- `IntrinsicsArbiter` for fulfillment intrinsic validity.
- `ReferencesEscrowArbiter` for `fulfillment.refUID == escrow.uid`.
- `AllArbiter` for combining those checks with a semantic arbiter.

### Scope

This touches contract names, generated docs, and SDK surfaces, so it should be
handled as a separate compatibility-aware change after the remaining audit items
are triaged.

## UID-Aware Hook Lifecycle

Hook-based escrows currently call `onLock` from `_beforeAttest`, before EAS
creates the escrow attestation UID. Nothing returned or mutated by `_beforeAttest`
is passed into EAS; the attestation data is the original obligation data supplied
by the caller.

Longer term, it may be cleaner for hook-based escrows to expose the escrow UID to
hooks. Two possible approaches:

- Move lock execution to `_afterAttest` so `_lockEscrow` can receive the UID.
- Keep lock execution before EAS, but add UID-aware release/return hook calls and
  an optional post-attest hook for hook types that truly need the UID after
  attestation creation.

This should be handled as a separate lifecycle/API change because it affects the
meaning of `_beforeAttest`/`_afterAttest`, hook interfaces, docs, and SDKs.

## Per-Demand Commit-Reveal Bonds

`CommitRevealObligation` currently uses a contract-level bond amount for the
hash-only `commit(bytes32)` flow. The audit fix snapshots contract-level bond
amounts by block epoch so historical commitments refund or slash the amount that
was active when they were committed.

A future variant could make bond policy part of the escrow demand instead. That
would let each escrow specify the required commit bond rather than relying on a
global contract setting. This is a larger API change because `commit(bytes32)`
does not reveal the escrow UID, recipient, data hash, or demand terms at commit
time. A per-demand version should add typed commit context or otherwise bind the
committed bond terms into the commitment and verify them during reveal.

## Splitter Arbitration Requests in SDKs

Splitter `requestArbitration` events include caller-supplied oracle and demand
payloads. Those payloads are useful as hints, but they are not canonical when a
splitter is nested inside logical arbiters such as `AllArbiter` or `AnyArbiter`.

SDK and indexer code should re-read the escrow attestation from EAS, interpret
the configured arbiter/demand tree, and decide whether the request is relevant
before prompting or submitting oracle decisions. They should not treat the event
payload alone as authorization or as the canonical splitter demand.

## Base Splitter Refactor

The splitter contracts now share enough generic orchestration logic that a
narrow `BaseSplitter` may be worthwhile as a follow-up refactor. It should cover
common fulfillment creation, created-fulfillment validation, executor-sentinel
resolution, arbitration request authorization helpers, decision-key helpers,
native refund proxying, and shared errors/events.

It should not try to abstract asset-specific arbitration, escrow collection,
receipt verification, or distribution loops. Those differ across native, ERC20,
ERC1155, and token-bundle splitters, and keeping them local makes each asset
path easier to audit.
