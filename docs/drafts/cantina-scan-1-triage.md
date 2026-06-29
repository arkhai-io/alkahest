# Cantina Scan #1 Triage

Tracking items from `alkahest - Scan #1 - findings.md`.

Use absolute commit hashes for completed fixes so this record remains stable
after branches move. Status values:

- `open`: believed valid or still under review.
- `fixed`: addressed by a committed change.
- `deferred`: valid, but intentionally scheduled for later work.
- `not an issue`: false positive, expected protocol behavior, or out of scope.

## Open

### ALKA-8: BaseSplitter Refund Proxy

Status: fixed.

Completed by `774f2e39c0c76da257142683dc66daf53aac2f5c`.

Severity in report: Critical.

Report title: `BaseSplitter refund proxy can steal any native escrow collected
into the splitter during fulfillment creation`.

Current assessment: valid.

`BaseSplitter.createFulfillment()` records the splitter's retained native
balance, calls an arbitrary `obligationContract`, validates only the attestation
that was created, then refunds every net native balance increase to the caller.
Because the called obligation can execute arbitrary post-attestation logic, it
can collect an unrelated native escrow whose fulfillment recipient is the
splitter. The escrowed value enters the splitter during `createFulfillment()`
and is then treated as refundable surplus for the attacker.

This is meaningfully different from ordinary malicious-obligation misuse because
the splitter gives the malicious obligation a refund proxy over native value
that arrived from a separate valid escrow collection.

Local fix:

- Removed blanket native balance refunding from `createFulfillment()`.
- Removed tests that treated splitter balance increases as supported refunds.
- Documented in `docs/security-model.md` that splitter fulfillment helpers may
  forward native value to obligation creation, but do not infer or proxy refunds
  from splitter balance changes. Paid fulfillment flows should pass exact value
  or handle refunds in the called obligation's own API.

Related items to review together: ALKA-25.

## Pending Review

### ALKA-16: Proxy Escrow Substitution

Status: fixed locally, pending commit.

Severity in report: Critical.

Report title: `Proxy escrows can collect a different escrow and redistribute the
victim assets under attacker-controlled splits`.

Current assessment: valid.

The splitter collection functions accept `escrowContract` as a caller-supplied
argument. They verify that the supplied escrow attestation was authored by that
contract and verify the expected asset balance delta after `collect()`, but they
do not prove that the external call consumed the same escrow/fulfillment pair.
A malicious escrow-like contract can attest a fake escrow with attacker-chosen
splitter demand, proxy `collect()` into a real already-collectible escrow whose
fulfillment recipient is the splitter, and satisfy the splitter's balance-delta
check with the victim assets.

Checking that the expected escrow was revoked after the call is insufficient by
itself because the malicious escrow-like contract can also revoke the fake
attestation it authored. The robust fix is to bind splitter settlement to known
escrow implementations instead of accepting arbitrary `escrowContract` values
from the caller.

Local fix:

- Each packaged splitter now takes its corresponding packaged escrow obligation
  as a constructor dependency and stores it immutably.
- `collectAndDistribute()` and `unsafePartiallyCollectAndDistribute()` no
  longer accept caller-supplied escrow contract addresses.
- Splitter collection verifies and calls only the stored canonical escrow
  obligation, preventing fake escrow contracts from proxying collection of an
  unrelated real escrow into the splitter.

### ALKA-30: AttestationEscrowObligation Self-Schema Mint

Status: open.

Severity in report: Critical.

Report title: `AttestationEscrowObligation can mint unbacked escrows under its
own schema`.

### ALKA-25: createFulfillment Refunds Unrelated ETH Inflows

Status: open.

Severity in report: Critical.

Report title: `createFulfillment refunds unrelated ETH inflows and lets a
malicious obligation steal collectible native escrows`.

### ALKA-17: Proxy Collect Fulfillment Substitution

Status: open.

Severity in report: Critical.

Report title: `Proxy collect can substitute a different fulfillment and redirect
EXECUTOR_SENTINEL payouts to an attacker-recorded fulfiller`.

### ALKA-5: CommitReveal Fulfillment Replay

Status: open.

Severity in report: Critical.

Report title: `CommitRevealObligation replays one revealed fulfillment across
later unconditional escrows`.

### ALKA-31: Direct Escrow Collection Bricks Splitter Settlement

Status: open.

Severity in report: High.

Report title: `Any caller can permanently brick splitter settlements by calling
the underlying escrow directly`.

### ALKA-34: Unsafe Partial Splitter Settlement

Status: open.

Severity in report: High.

Report title: `Public unsafe partial splitter settlement lets outsiders finalize
only attacker-favorable transfers`.

### ALKA-33: AtomicPaymentUtils Arbitrary Attesters

Status: open.

Severity in report: High.

Report title: `AtomicPaymentUtils accepts arbitrary attesters and can pay
attacker-defined demands without any real escrow`.

### ALKA-32: TokenBundleSplitterUnvalidated Stranded Balance Drain

Status: open.

Severity in report: High.

Report title: `TokenBundleSplitterUnvalidated can steal previously stranded
native, ERC20, and ERC1155 balances through later over-allocation`.

### ALKA-28: SDK Configs Send Payable Calls To Zero Address

Status: open.

Severity in report: High.

Report title: `Supported Ethereum and GenLayer SDK configs send payable helper
calls to 0x0`.

### ALKA-2: Commit-Reveal Post-Reveal Settlement Theft

Status: open.

Severity in report: High.

Report title: `Oracle-gated commit-reveal still allows post-reveal settlement
theft before collect`.

### ALKA-19: SDK Presets Wire Unreleased Surfaces To Zero Address

Status: open.

Severity in report: High.

Report title: `Supported-chain presets silently wire unreleased hook and
splitter surfaces to address(0), allowing ETH burns`.

### ALKA-9: TrustedOracle Manual Arbitration Helper Key Mismatch

Status: open.

Severity in report: Medium.

Report title: `TrustedOracle manual arbitration helper records a decision key
that collect() never checks`.

### ALKA-23: Stale Commit-Reveal Docs

Status: open.

Severity in report: Medium.

Report title: `Commit-reveal docs still prescribe empty demand bytes and a stale
Base Sepolia deployment, enabling free-work traps`.

### ALKA-12: Stale ExpirationTimeBefore Address Metadata

Status: open.

Severity in report: Medium.

Report title: `Stale Base Sepolia address metadata still points default users to
an ExpirationTimeBefore arbiter that accepts non-expiring fulfillments`.

### ALKA-21: TypeScript Bundle Clients Native Value

Status: open.

Severity in report: Medium.

Report title: `Shipped TypeScript bundle clients cannot represent or forward
native value, breaking every mixed-native bundle flow`.

### ALKA-3: TrustedOracle Authorizer Hidden By Demand Helpers

Status: open.

Severity in report: Medium.

Report title: `extractDemandData/getEscrowAndDemand hide the TrustedOracle
authorizer from counterparties`.

### ALKA-10: TrustedOracle Status Helper Context

Status: open.

Severity in report: Medium.

Report title: `TrustedOracle arbitration status helpers treat any
fulfillment-level event as the final decision`.

### ALKA-7: AttestationReferenceEscrowObligation Revocability

Status: open.

Severity in report: Medium.

Report title: `AttestationReferenceEscrowObligation can only deliver irrevocable
validation attestations even when validationRevocable is true`.

### ALKA-20: Generic Demand Helpers Masquerade TrustedOracle Payloads

Status: open.

Severity in report: Medium.

Report title: `Generic demand helpers let arbitrary arbiters masquerade as
benign TrustedOracle payloads`.

### ALKA-27: Zero Arbiter Decoded As ReferencesEscrowArbiter

Status: open.

Severity in report: Medium.

Report title: `Ethereum and GenLayer decoders classify the zero arbiter as
ReferencesEscrowArbiter instead of unknown`.

### ALKA-18: Top-Level Demand Extractors Hide Alternate Branches

Status: open.

Severity in report: Medium.

Report title: `Top-level demand extractors silently unwrap every escrow as
TrustedOracle and hide alternate arbiter branches`.

### ALKA-4: Atomic Attestation Helper Log Attribution

Status: open.

Severity in report: Medium.

Report title: `Atomic attestation helper misattributes nested Attested logs and
can hand out a malicious escrow UID`.

### ALKA-15: createFulfillment Replayed UID Fulfiller Assignment

Status: open.

Severity in report: Medium.

Report title: `createFulfillment accepts replayed same-contract UIDs and can
retroactively assign EXECUTOR_SENTINEL payouts`.

### ALKA-13: Stale Token-Bundle Escrow Address Metadata

Status: open.

Severity in report: Low.

Report title: `Stale Base Sepolia address metadata still points default users to
a token-bundle escrow with permissionless destructive partial settlement`.

### ALKA-14: Zero References Arbiter Surfaced As Known Policy

Status: open.

Severity in report: Low.

Report title: `Zero-address references arbiter is surfaced as a safe known
policy on supported chains`.

### ALKA-24: Hook Validation Certificate Revocability

Status: open.

Severity in report: Low.

Report title: `Hook-based validation certificates can be labeled revocable even
though no one can ever revoke them`.

### ALKA-6: TypeScript Demand Helpers Strip Trusted Oracle Address

Status: open.

Severity in report: Low.

Report title: `TypeScript demand helpers strip the trusted oracle address from
escrow inspection`.

### ALKA-11: AttestationEscrowObligation Revocability

Status: open.

Severity in report: Low.

Report title: `AttestationEscrowObligation can only deliver irrevocable
attestations even when the request says revocable`.

### ALKA-26: Stale Token-Bundle Address Docs

Status: open.

Severity in report: Low.

Report title: `Base Sepolia address docs still route token-bundle escrows to a
pre-fix partial-collection deployment`.

### ALKA-29: CommitReveal Low-Entropy Exhaustive Precommit

Status: open.

Severity in report: Low.

Report title: `CommitRevealObligation's bond model is exhaustively bypassable
for low-entropy fulfillments, so attackers can precommit every answer and steal
the escrow`.

### ALKA-1: TrustedOracle allUnarbitrated Demand Suppression

Status: open.

Severity in report: Low.

Report title: `Trusted-oracle allUnarbitrated mode suppresses demand-specific
decisions after any earlier decision on the same fulfillment`.

### ALKA-22: Confirmation Request Helper Escrow Binding

Status: open.

Severity in report: Low.

Report title: `Confirmation request helpers collapse the (fulfillment, escrow)
authority key and can route confirmations to the wrong escrow`.
