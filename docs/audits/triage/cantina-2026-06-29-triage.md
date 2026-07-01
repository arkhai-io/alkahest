# Cantina Scan #1 Triage

Tracking items from `../reports/cantina-2026-06-29.md`.

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
Additional regression coverage in
`8da780b90919ee8728fed5921b9acff554cf6d8e`.

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

Status: fixed.

Completed by `27436721ed908f9ff35776d814796b81660284ba`.
Additional proxy-substitution regression coverage in
`8da780b90919ee8728fed5921b9acff554cf6d8e`.

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

Status: fixed.

Completed by `e3c8885196d2e4639b045b419ce2a92b5b38dab2`.

Severity in report: Critical.

Report title: `AttestationEscrowObligation can mint unbacked escrows under its
own schema`.

Current assessment: valid.

`AttestationEscrowObligation` and
`UnconditionalAttestationEscrowObligation` allowed `_releaseEscrow()` to call
`eas.attest()` for their own `ATTESTATION_SCHEMA`. That minted escrow-shaped
attestations through the release path rather than the lock path, so embedded
native value accounting could be forged against pooled contract balance.

Local fix:

- Both attestation escrow variants reject release requests where the promised
  attestation schema equals their own `ATTESTATION_SCHEMA`.
- Added a regression test proving a self-schema release attempt reverts before
  minting an inner escrow attestation.

### ALKA-25: createFulfillment Refunds Unrelated ETH Inflows

Status: fixed.

Completed by `774f2e39c0c76da257142683dc66daf53aac2f5c`.

Severity in report: Critical.

Report title: `createFulfillment refunds unrelated ETH inflows and lets a
malicious obligation steal collectible native escrows`.

Current assessment: duplicate of ALKA-8.

This report describes the same balance-delta refund proxy as ALKA-8. The fix
removed blanket native balance refunding from `BaseSplitter.createFulfillment()`.
Regression coverage was added in `8da780b90919ee8728fed5921b9acff554cf6d8e`.

### ALKA-17: Proxy Collect Fulfillment Substitution

Status: fixed.

Completed by `27436721ed908f9ff35776d814796b81660284ba`.

Severity in report: Critical.

Report title: `Proxy collect can substitute a different fulfillment and redirect
EXECUTOR_SENTINEL payouts to an attacker-recorded fulfiller`.

Current assessment: duplicate of ALKA-16 with `EXECUTOR_SENTINEL` as the payout
consequence.

The reported path relies on a malicious caller-supplied escrow contract whose
`collect()` ignores the fake `(escrow, fulfillment)` and proxies collection of a
different real escrow/fulfillment pair. The splitter would then resolve
`EXECUTOR_SENTINEL` using the fake fulfillment's recorded fulfiller rather than
the real consumed fulfillment.

The ALKA-16 fix removes the caller-supplied escrow contract from splitter
settlement. Packaged splitters now verify and call only their immutable packaged
escrow obligation, so a proxy escrow cannot substitute a different consumed
fulfillment. Regression coverage for the proxy substitution path was added in
`8da780b90919ee8728fed5921b9acff554cf6d8e`.

Report title: `Proxy collect can substitute a different fulfillment and redirect
EXECUTOR_SENTINEL payouts to an attacker-recorded fulfiller`.

### ALKA-5: CommitReveal Fulfillment Replay

Status: fixed in `a30b80b3823f0b6790ffd22d8ea79db65036a0b7`.

Severity in report: Critical.

Resolution: `CommitRevealObligation` now commits to the controllable fields of
the produced EAS attestation: recipient, expiration time, reference UID, and
data hash. It intentionally does not compare the fulfillment `refUID` to the
escrow UID in `checkObligation`; escrow binding is composed from the escrow side
with `ReferencesEscrowArbiter`, usually via `AllArbiter`. Regression coverage
verifies that a fulfillment may satisfy another compatible escrow that accepts
the same attestation, while the reveal must still match the committed refUID and
expiration time.

Report title: `CommitRevealObligation replays one revealed fulfillment across
later unconditional escrows`.

### ALKA-31: Direct Escrow Collection Bricks Splitter Settlement

Status: fixed in `21e0a69d1772b0e07e99f174b498cab9e83b9944`.
Follow-up simplification and security-model documentation in
`057d593005c28c22dddc0f19f83a497ef3f6aee0`.

Severity in report: High.

Resolution: splitters now require an active splitter-initiated settlement for
their arbiter `check` to accept an oracle decision. `collectAndDistribute` and
`unsafePartiallyCollectAndDistribute` open this transient gate only around the
canonical escrow `collect` call for the matching `(fulfillment, escrow)` pair.
Direct calls to the underlying escrow therefore fail before revocation and leave
the escrow assets locked for the intended splitter settlement path. Regression
coverage verifies that direct ERC20 escrow collection cannot strand funds in the
splitter, while permissionless splitter collection still succeeds.

Report title: `Any caller can permanently brick splitter settlements by calling
the underlying escrow directly`.

### ALKA-34: Unsafe Partial Splitter Settlement

Status: fixed in `9c157b984bc4e654029de8184c8a630a2cf2b151`.

Severity in report: High.

Resolution: splitter partial settlement is now authorized. Each
`unsafePartiallyCollectAndDistribute` path requires the caller to be either the
recorded fulfiller for a splitter-created fulfillment or the EAS attester of the
fulfillment. This preserves partial recovery for the executor and for direct
splitter-recipient fulfillments, while preventing unrelated outsiders from
forcing escrow revocation and partial distribution. Token-bundle escrow partial
collection already had recipient-side authorization; this fix covers the
splitter-specific case where the fulfillment recipient is the splitter contract.

Report title: `Public unsafe partial splitter settlement lets outsiders finalize
only attacker-favorable transfers`.

### ALKA-33: AtomicPaymentUtils Arbitrary Attesters

Status: fixed in `860e314154abefd28f0a48be09d3a875c7d3f29b`.

Severity in report: High.

Report title: `AtomicPaymentUtils accepts arbitrary attesters and can pay
attacker-defined demands without any real escrow`.

Current assessment: valid SDK/integration hardening item, not a contract-level
authorization break.

`AtomicPaymentUtils` is a convenience contract that pays the demand decoded from
the supplied escrow attestation and then calls `collect()` on that attestation's
attester. A malicious attester cannot independently steal from unrelated
lifecycles; the caller or integration must choose to settle that malicious UID.
However, SDK pay-and-collect helpers are an ergonomic path where users may rely
on the SDK to interpret the UID safely before spending funds.

Local fix:

- TypeScript payment clients now fetch the escrow attestation before calling
  `AtomicPaymentUtils` and require its attester to be one of the configured
  packaged escrow obligations for the same chain.
- Rust payment clients now do the same for the default safe methods; explicit
  `_unchecked` variants are available for integrations that have independently
  validated a custom escrow contract.
- Python wrappers call the Rust safe methods, so they inherit the same default
  behavior, and expose matching `_unchecked` variants for integrations that
  intentionally settle custom escrow contracts.

### ALKA-32: TokenBundleSplitterUnvalidated Stranded Balance Drain

Status: not an issue.

Severity in report: High.

Report title: `TokenBundleSplitterUnvalidated can steal previously stranded
native, ERC20, and ERC1155 balances through later over-allocation`.

Current assessment: expected consequence of stranded splitter balances.

`TokenBundleSplitterUnvalidated` intentionally skips split-total validation.
Over-allocation can only distribute assets already held by the splitter plus
assets collected in the current settlement. The current settlement is still
verified by balance deltas, so this does not let an attacker collect or redirect
an unrelated active escrow. It only affects balances that were previously
stranded in the splitter, for example because an intended flow was bypassed or a
partial/failed settlement left residual assets.

The protocol does not assign an authorized collector to stranded splitter
balances, and intended splitter flows should not leave persistent balances in
the contract. Treating those balances as recoverable by later valid splitter
execution is acceptable; adding accounting to protect them would undermine the
purpose of the unvalidated cheaper splitter variant and add complexity for an
out-of-model state.

### ALKA-28: SDK Configs Send Payable Calls To Zero Address

Status: fixed.

Severity in report: High.

Report title: `Supported Ethereum and GenLayer SDK configs send payable helper
calls to 0x0`.

Current assessment: valid SDK configuration-safety issue.

Address fields remain non-optional because configured contracts are expected to
exist for a fully supported chain. Zero addresses in partial deployment presets
therefore represent configuration errors, not normal optional state. SDK helper
methods must fail before submitting a transaction to a missing configured
contract, especially for value-bearing calls.

Local fix:

- TypeScript added `assertDeployedContract()` and applies it in the shared
  `writeContract()` helper.
- TypeScript direct simulate/write paths that bypass the shared helper now
  preflight `AtomicAttestationUtils`, attestation-reference escrow, native-token
  escrow, native-token unconditional escrow, native-token payment, and native
  atomic payment utility addresses before value-bearing calls.
- Rust added `ensure_deployed_contract()` and applies it before native-token
  default/unconditional escrow creation, native-token payment, and native-token
  atomic payment collection. Python inherits these checks through its Rust
  wrappers.

### ALKA-2: Commit-Reveal Post-Reveal Settlement Theft

Status: addressed with optional commitment-oracle primitive.

Severity in report: High.

Implementation commit:
`301e0c0197443211d7c683368946cd443971c422`.

Commitment splitter variant implementation:
`4758c6bd374e2b94a298edcd0498388af494e57b`.

Report title: `Oracle-gated commit-reveal still allows post-reveal settlement
theft before collect`.

Current assessment: the reported behavior is real for an unsafe oracle flow, but
it is outside what `CommitRevealObligation` promises to enforce by itself.

`CommitRevealObligation` provides secrecy only until the public reveal. Once the
fulfillment attestation exists, its data, salt, recipient, reference UID, and
expiration time are public EAS fields. A later committer can copy that public
payload into their own commitment/reveal lifecycle if another arbiter or oracle
is willing to approve the copied fulfillment.

The contract intentionally does not reserve an escrow for the first revealer.
The current commit-reveal design is globally reusable: one fulfillment
attestation can satisfy multiple escrows that intentionally accept the same EAS
attestation, and escrow binding is composed separately with arbiters such as
`ReferencesEscrowArbiter`. Adding per-escrow reservation to
`CommitRevealObligation` would reintroduce escrow-specific settlement semantics
into a general EAS obligation.

For synchronous flows, the provided mitigation is atomic reveal-and-collect. For
async oracle-gated flows, the intended model is that the fulfiller reveals the
payload privately to the oracle before the public EAS reveal, or that the oracle
binds approval to the intended fulfillment UID, recipient, and demand context.
An oracle that approves copied public reveal payloads for new recipients is
making a policy decision outside the secrecy guarantee commit-reveal provides.

Local fix:

- Added `CommitmentTrustedOracleArbiter`, which lets a trusted oracle approve a
  future attestation intent before the fulfillment UID exists.
- The approved intent binds the eventual attester, schema, recipient,
  expiration time, revocability, refUID, and data hash. A copied reveal with a
  different recipient therefore has a different intent hash and does not satisfy
  the original oracle approval.
- Added commitment splitter variants under
  `contracts/src/utils/splitters/commitment/` so splitter-oracle decisions can
  use the same pre-fulfillment intent model. These variants let the oracle
  approve the future splitter-owned fulfillment intent, then allow the executor
  to create the fulfillment and collect/distribute atomically.
- Added focused contract tests covering pre-fulfillment approval, copied reveal
  rejection, demand-context scoping, and intent-hash field binding.

Documentation update:

- `docs/security-model.md` now documents the commit-reveal/oracle integration
  model.

### ALKA-19: SDK Presets Wire Unreleased Surfaces To Zero Address

Status: fixed.

Severity in report: High.

Report title: `Supported-chain presets silently wire unreleased hook and
splitter surfaces to address(0), allowing ETH burns`.

Runtime zero-address guards:
`d25f00b921f4f183e000f0d1adfc09134a0f9356`.

Commit-reveal value-send follow-up:
`71a724063524447ac02cda887ca2dab4d85b71b2`.

Current assessment: addressed by the SDK zero-address guard work from ALKA-28,
with one additional direct value-bearing commit-reveal path fixed during review.

The report's concrete burn path depended on TypeScript SDK helpers sending
native value to configured zero addresses for unreleased hook/splitter surfaces.
Those helpers now use the shared SDK `writeContract()` wrapper, which rejects
`address(0)` before broadcasting. Splitter helper writes also route through that
same wrapper.

The separate direct value-bearing SDK paths that bypass the shared wrapper have
explicit guards:

- TypeScript guards atomic attestation, attestation-reference escrow,
  native-token default/unconditional escrow, native-token payment, native atomic
  payment, and commit-reveal bond/raw-value calls.
- Rust guards native-token default/unconditional escrow, native-token payment,
  native atomic payment, and commit-reveal bond/raw-value calls. Python inherits
  the Rust wrapper behavior.

Supported-chain presets may still contain zero placeholders for unreleased or
not-yet-deployed surfaces, but packaged value-bearing SDK helpers now fail
closed before sending funds. Remaining zero-address presentation and decoder
ergonomics are tracked by the separate address-metadata items.

### ALKA-9: TrustedOracle Manual Arbitration Helper Key Mismatch

Status: fixed.

Severity in report: Medium.

Report title: `TrustedOracle manual arbitration helper records a decision key
that collect() never checks`.

Fixed by:
`25c6bd929fb52663a4564062d66f0a242afd0f7c`.

Current assessment: valid SDK API ambiguity, not a Solidity arbiter bug.

`TrustedOracleArbiter.check()` intentionally verifies decisions under
`keccak256(fulfillment.uid, DemandData.data)`, while the on-chain
`arbitrate()` entry point accepts that raw inner decision context. The previous
manual SDK helpers were named as if they accepted the escrow demand, but
forwarded the supplied bytes directly. Passing the full encoded
`TrustedOracleArbiter.DemandData` therefore recorded a decision under a key that
`check()` would never read.

Local fix:

- TypeScript now exposes `arbitrateForDemand()` for the encoded outer demand
  and `arbitrateRaw()` for the inner decision context.
- Rust/Python mirror this as `arbitrate_for_demand()` and `arbitrate_raw()`.
- The demand-based helpers decode `DemandData`, verify the demanded oracle is
  the calling client, and submit only `DemandData.data` to the contract.
- Rust automated arbitration paths now decode and verify event demand bytes
  before submitting decisions, matching the existing TypeScript behavior.
- Added TypeScript coverage proving that `arbitrateForDemand()` rejects the
  wrong oracle and records a decision accepted by `check()`.

### ALKA-23: Stale Commit-Reveal Docs

Status: fixed.

Severity in report: Medium.

Report title: `Commit-reveal docs still prescribe empty demand bytes and a stale
Base Sepolia deployment, enabling free-work traps`.

Fixed by: `35d1fa556bb1f87bfc9583de26af20dffab96676`.

Current assessment: valid documentation issue. The commit-reveal arbiter no
longer accepts empty demand bytes; it decodes `DemandData` and checks the
committed bond amount and reveal deadline against the escrow demand. The skill
docs also carried stale deployed addresses and obsolete `reclaimBond` /
`reclaim_bond` SDK references.

Local fix: updated the composed `AllArbiter` example to encode
`client.commitReveal.encodeDemand({ bondAmount, commitDeadline })`, refreshed
the commit-reveal address entries to match the SDK configurations, marked
unreleased mainnet commit-reveal as zero, and removed obsolete explicit bond
reclaim steps from the TypeScript, Rust, and Python skill references.

### ALKA-12: Stale ExpirationTimeBefore Address Metadata

Status: fixed.

Severity in report: Medium.

Report title: `Stale Base Sepolia address metadata still points default users to
an ExpirationTimeBefore arbiter that accepts non-expiring fulfillments`.

Fixed by: `229b2552c1c5b162446fc90ba8d458db0a5d8585`.

Current assessment: valid metadata drift issue. The current
`ExpirationTimeBeforeArbiter` implementation rejects the EAS non-expiring
sentinel (`expirationTime == 0`) for finite "before" demands, but several
published Base Sepolia discovery surfaces still pointed at the old deployed
arbiter.

Local fix: regenerated `deployment_base_sepolia.json`,
`deployment_sepolia.json`, and the user/developer contract-reference tables
from the SDK address maps for Base Sepolia and Sepolia. The MCP deployment
parser now recognizes `deployment_sepolia.json`, so MCP discovery also consumes
the current Sepolia manifest.

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
