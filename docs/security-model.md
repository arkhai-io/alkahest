# Security Model

This document records protocol-level assumptions that are easy to misread when
reviewing Alkahest contracts. It is not an audit log. Issue-by-issue audit
classification lives in `docs/drafts/audit-triage.md`.

## Core Model

Alkahest is a conditional escrow protocol built around EAS attestations.
Escrows lock assets, fulfillment attestations claim satisfaction of a condition,
and arbiters decide whether a fulfillment satisfies the escrow's encoded demand.

The protocol deliberately leaves many policy choices to the escrow creator,
arbiter, oracle, splitter oracle, SDK, or application. A configuration can be
bad, permissive, or economically irrational without being a protocol bug.

## Attester Authority

An EAS attestation is not automatically authoritative because it was emitted by
a contract. Consumers must understand what paths can cause that contract to
attest and what facts the contract enforces before attesting.

An obligation-style attestation is trustworthy for a fact only when the
contract's implementation atomically performs or verifies that fact before
creating the attestation, and there is no alternate path for producing an
equivalent attestation. For example, a payment obligation attestation is a proof
that the payment obligation contract executed the encoded token transfer call
atomically with attestation creation. The token address and call parameters are
part of the attested fact. Consumers should not reinterpret that fact as
normalized cross-token semantics such as "the payee's balance increased by
exactly this amount" unless the relevant obligation contract explicitly enforces
that property for that token class.

By contrast, hooks, attestation escrows, reference attestations, and other
contracts that mint user-specified attestation data do not give that data
independent legitimacy merely by acting as the EAS attester. Their attestations
are only meaningful under the policy a downstream consumer applies: schema,
content, referenced UID, escrow provenance, lifecycle context, or other explicit
checks. The attester address can prove which contract emitted an attestation,
but consumers still need to verify that the contract's attestation path enforces
the lifecycle or proof semantics they intend to rely on.

## Arbiters Are Policy

Escrow creators choose the arbiter and demand. The contracts support arbitrary
arbiter policy rather than maintaining a protocol allowlist.

An arbiter that always returns true, an external registry that reverts, or an
oracle that uses an inappropriate demand can make an escrow unsafe or
uncollectable. That is caller-selected policy. SDKs and applications may provide
safer defaults and warnings, but the core protocol does not centralize those
choices.

Default escrow contracts include baseline fulfillment checks. The unconditional
escrow variants are the explicit escape hatch when callers want to delegate all
fulfillment policy to arbiters.

## Escrow Contracts As Arbiters

Escrow obligation contracts may also implement `IArbiter`. In that role they
answer whether an attestation represents an escrow with the demanded parameters.
They do not assert that the escrow has already been collected or that the
underlying deliverable has already been completed.

This is consistent across escrow families. Delivery semantics should be encoded
by the chosen fulfillment attestation, arbiter composition, or application flow,
not by changing the meaning of an escrow contract's arbiter implementation.

## Recipient Policy

Recipient selection is part of the configured flow:

- ordinary escrow release pays the fulfillment attestation recipient;
- recipient-constrained flows should use an arbiter such as `RecipientArbiter`;
- splitter recipients are chosen by the splitter oracle's decision.

The core contracts do not blacklist `address(0)`, `address(this)`, repository
contracts, contracts that may reject token callbacks, or addresses that are
otherwise bad destinations. Burning, self-payment, wrong recipients, and
receiver incompatibility are policy or integration concerns unless a specific
contract explicitly promises recipient capability checks.

## Request Events Are Hints

Arbitration request events are non-authoritative hints for off-chain services.
They do not authorize settlement and should not be treated as the source of
truth for oracle identity or request payload semantics.

Consumers should decode and verify the escrow demand before acting on a request
event. On-chain settlement uses the escrow's local demand and the arbiter's
stored decision model, not the trustworthiness of a request event.

## Logical Arbiter Semantics

Logical arbiters use standard empty-set behavior:

- `AllArbiter([])` is true;
- `AnyArbiter([])` is false.

This matches common logical and programming-language precedent. Child arbiter
reverts are part of the configured composition behavior.

## Attestation References

Attestation reference escrows certify an attestation UID by minting a validation
attestation when the escrow is collected. The certification attestation can have
its own expiration and revocability, configured by the escrow data.

The reference escrow does not itself prove that the referenced attestation is
currently live, unreverted, has a particular schema, or has a particular
provenance. Consumers that require those properties must check the referenced
EAS attestation directly or compose explicit arbiters that enforce them.

## Example Contracts

Contracts under example namespaces are not production protocol components and
are not intended to be secure building blocks. They may demonstrate patterns,
tests, or educational flows without carrying the same security commitments as
the core protocol contracts.

## Atomicity And Helper Contracts

Some helper contracts exist to bundle sequential actions that EOAs cannot make
atomic by themselves, such as creating a fulfillment and collecting an escrow in
one transaction. Helpers are optional protocol utilities, not a replacement for
understanding the underlying escrow, payment, and arbiter policy.

Constructor-initialized helper contracts are intended for direct deployment
unless they explicitly include proxy or clone initialization support.

## Splitter Fulfillment Helpers

Splitter fulfillment helpers create attestations whose recipient is the splitter
contract, then use the splitter's oracle decision to distribute the collected
escrow assets. The splitter being the attestation recipient is distinct from the
splitter being a payment payee.

Payment obligations attest that the payment obligation contract executed the
encoded payment action atomically with attestation creation. The attester is the
payment obligation contract. The EAS recipient is the party that should hold the
proof of payment, which is normally the payer but may be another contract in an
atomic helper flow. The `payee` encoded in the obligation data is the target of
the payment action.

When a splitter helper creates a payment fulfillment, the EAS recipient may be
the splitter so the splitter can later collect and distribute escrow assets. The
payment's `payee` remains separate from that proof-recipient role.

Splitter fulfillment helpers may forward native value to the obligation contract
they call, but they do not proxy refunds by inspecting splitter balance changes.
That behavior was intentionally removed because a balance increase during helper
execution can come from unrelated escrow collection or other external transfers,
not only from unused value returned by the called obligation. Paid fulfillment
flows should pass the exact native value required by the called obligation or
handle refunds inside that obligation's own API.
