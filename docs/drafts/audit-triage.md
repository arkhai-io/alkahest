# Audit Triage

Tracking notes for `arkhai-io-alkahest-2026-04-13-analysis.md`.

## Addressed

- #2 AllEscrowHook authorization / multi-hook pattern: addressed by removing `AllEscrowHook` and adding `HooksEscrowObligation`.
  Commit: `d8c76d4 fix(hooks): replace AllEscrowHook with multi-hook obligation`
- #3 Splitter fulfiller mapping / sentinel overwrite: addressed by set-once fulfiller recording and create-fulfillment validation.
  Commit: `0bb2586 fix(splitters): harden fulfillment tracking`
- #4 Splitter zero-UID / fulfillment validation: addressed with zero-UID guards, intrinsic checks, and created-fulfillment validation.
  Commits: `268404c Add fulfillment reference arbiter`, `0bb2586 fix(splitters): harden fulfillment tracking`
- #5 Shared pending-bit keying in attestation hooks: addressed by replacing boolean pending state with counters.
  Commit: `583efac fix(hooks): count pending attestations`
- #5 related: open validation schema and ignored recipient in `AttestationEscrowHook2`: addressed by resolver-gating validation attestations to `attester == address(this)` and using encoded hook recipient.
  Commit: `06cf7a9 fix(hooks): bind validation attestations`
- #5 related: non-ETH hooks accepting native value: addressed by rejecting nonzero `msg.value` in ERC20/ERC721/ERC1155/attestation hooks.
  Commit: `dbee7c1 fix(hooks): reject native value in non-native hooks`
- #6 EAS schema registration squatting: addressed by verified register-or-reuse behavior for constructor-registered schemas.
  Commit: `9391891 fix(schema): reuse existing EAS schemas`
- #8 Splitter `collectAndDistribute` attestation/receipt binding: addressed by verifying escrow attester/schema, requiring fulfillment recipient to be the splitter, and checking asset receipt deltas before distribution.
  Commit: `41ba79c fix(splitters): verify escrow collection receipts`
- #9 Missing ETH forwarding for paid attestations in `AttestationEscrowHook.onRelease`: addressed by escrowing exact EAS resolver payments on lock/create, forwarding them on release/collection, and refunding them on return/expiry across the hook and standalone attestation escrow obligations.
  Commit: `f7f55ee fix(attestations): support paid escrow attestations`
- #12 CommitReveal prior-block / front-running: addressed with a generic `revealAndCollect` helper on `CommitRevealObligation` so integrations can reveal and collect in one transaction without exposing a standalone public reveal window.
  Commit: `a0eddcc feat(commit-reveal): add atomic reveal and collect`
- Default escrow checks follow-up: documented proposed default/unconditional escrow split before implementation.
  Doc: `docs/drafts/escrow-default-checks-plan.md`

## False Positives / Expected Behavior

- #1 CommitReveal demand ignored: report already marks false positive / acknowledged.
- #5 related: unrestricted `AttestationEscrowHook` / `AttestationEscrowHook2` calls are not considered protocol authority. Hook-issued attestations are not proof of escrow provenance unless the attestation content/schema or consumer checks establish that.
- #7 HookEscrowObligation self-recipient sink: not treated as a special-case vulnerability. A claimant choosing the wrong recipient, including the obligation itself, is equivalent to choosing any other unrecoverable/wrong recipient.
- #7 related: recipient binding in `HookEscrowObligation.checkObligation`: not addressed by default because open-claim semantics are intentional. If an escrow creator wants only a specific recipient to claim, compose a recipient/identity arbiter such as `RecipientArbiter`.
- #11 `TokenBundleSplitterUnvalidated` split-total / output-bounds issues: accepted behavior for the explicitly unvalidated splitter. The over-allocation path can only drain balances already stranded in the splitter, not assets still held by other escrow contracts, and there is no recovery mechanism for those stranded balances.

## Deferred

- #10 Missing fulfillment validation in tierable escrow collect paths: deferred to the default/unconditional escrow split. Tierable escrows intentionally do not require `fulfillment.refUID == escrow.uid`; default fulfillment intrinsic checks should be added as part of the broader default-checks API change rather than patched ad hoc here.
  Doc: `docs/drafts/escrow-default-checks-plan.md`

## Remaining Untriaged

- #13 Unbounded distribution loops in splitters.
- #14 AllEscrowHook unbounded iteration: likely superseded by removal of `AllEscrowHook`, but confirm related multi-hook DoS expectations for `HooksEscrowObligation`.
- #15 Splitter unconditional collection after third-party pre-collection.
- #16 ERC1155EscrowHook post-transfer balance check.
- #17 TokenBundleSplitter nested array clearing / bounds issues.
- #18 CommitReveal bond accounting.
- #19 NativeTokenSplitter payer misdirection during `createFulfillment`.
- #20 Not-found handling / error classification.
- Second report section #1 NativeTokenEscrowHook empty `receive`.
- Second report section #2 Splitter self-recipient splits / missing withdrawal.
- Second report section #4 TokenBundleSplitter ERC721 index bounds.
- Second report section #5 Splitter `requestArbitration` event payload.
- Second report section #6 Splitter missing payable receive for refunding fulfillments.
- Second report section #7 BaseObligation payable raw entrypoint footgun.
