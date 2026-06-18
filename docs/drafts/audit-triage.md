# Audit Triage

Tracking notes for `arkhai-io-alkahest-2026-04-13-analysis.md`.

## Addressed

- #2 AllEscrowHook authorization / multi-hook pattern: addressed by removing `AllEscrowHook` and adding `HooksEscrowObligation`.
  Commit: `592f9d5505e4a3bed27416857d8954ace531e84a fix(hooks): replace AllEscrowHook with multi-hook obligation`
- #3 Splitter fulfiller mapping / sentinel overwrite: addressed by set-once fulfiller recording and create-fulfillment validation.
  Commit: `e8527db30850b95b5f9b9a62f11b30b4e1bdbfe8 fix(splitters): harden fulfillment tracking`
- #4 Splitter zero-UID / fulfillment validation: addressed with zero-UID guards, intrinsic checks, and created-fulfillment validation.
  Commits: `afe03c465d2f73aa94e63dcb37720c971e3f1250 Add fulfillment reference arbiter`, `e8527db30850b95b5f9b9a62f11b30b4e1bdbfe8 fix(splitters): harden fulfillment tracking`
- #5 Shared pending-bit keying in attestation hooks: addressed by replacing boolean pending state with counters.
  Commit: `2a1d31233104839760a8501232e9479f3daad678 fix(hooks): count pending attestations`
- #5 related: open validation schema and ignored recipient in `AttestationEscrowHook2`: addressed by resolver-gating validation attestations to `attester == address(this)` and using encoded hook recipient.
  Commit: `ced931cd74d3a5fd35d82a1b40cd75c6f3ef3e28 fix(hooks): bind validation attestations`
- #5 related: non-ETH hooks accepting native value: addressed by rejecting nonzero `msg.value` in ERC20/ERC721/ERC1155/attestation hooks.
  Commit: `836b39b52e6f78b77fdfe837a18ae84a674668cc fix(hooks): reject native value in non-native hooks`
- #6 EAS schema registration squatting: addressed by verified register-or-reuse behavior for constructor-registered schemas.
  Commit: `ebe3abcf1b7ada0910ca61da8b641fd939d8757f fix(schema): reuse existing EAS schemas`
- #8 Splitter `collectAndDistribute` attestation/receipt binding: addressed by verifying escrow attester/schema, requiring fulfillment recipient to be the splitter, and checking asset receipt deltas before distribution.
  Commit: `ef5c192410a134c2315251e838da1035df3fa5d1 fix(splitters): verify escrow collection receipts`
- #9 Missing ETH forwarding for paid attestations in `AttestationEscrowHook.onRelease`: addressed by escrowing exact EAS resolver payments on lock/create, forwarding them on release/collection, and refunding them on return/expiry across the hook and standalone attestation escrow obligations.
  Commit: `a8439519c5a4b6083776e3b1e8cc73e44c5434ec fix(attestations): support paid escrow attestations`
- #12 CommitReveal prior-block / front-running: addressed with a generic `revealAndCollect` helper on `CommitRevealObligation` so integrations can reveal and collect in one transaction without exposing a standalone public reveal window.
  Commit: `a11f8b568b48bfa80d0aae5da99aa514d7e47c87 feat(commit-reveal): add atomic reveal and collect`
- #13 Unbounded distribution / validation loops in splitters and related stored-array paths: addressed by adding caps to total token-bundle escrow assets, multi-hook escrow hooks, and logical-arbiter operand arrays. Existing splitter recipient caps remain in place.
  Commit: `b723c646a9baa88c7131d88f3d62b06eab100de4 fix(escrow): bound stored settlement arrays`
- #14 AllEscrowHook unbounded iteration: superseded by removal of `AllEscrowHook`; the replacement `HooksEscrowObligation` now caps the stored hook array.
  Commits: `592f9d5505e4a3bed27416857d8954ace531e84a fix(hooks): replace AllEscrowHook with multi-hook obligation`, `b723c646a9baa88c7131d88f3d62b06eab100de4 fix(escrow): bound stored settlement arrays`
- #16 ERC1155 post-transfer recipient balance checks: addressed by removing recipient-side post-transfer balance assertions after ERC1155 `safeTransferFrom` in hook, standalone escrow, and token-bundle atomic release paths. Custody-side lock checks remain.
  Commit: `5c03d3a3f00fe9dbcd06175806de80bf726c3b3e fix(escrow): allow ERC1155 receiver forwarding`
- #17 TokenBundleSplitter nested dynamic array clearing: addressed by clearing nested split arrays before rewriting a decision slot for the same oracle and `(fulfillment, escrow)` key.
  Commit: `eae63e650bf424fd2b98b2876959a2e57b992bfb fix(splitters): clear bundle decision arrays`
- #18 CommitReveal bond accounting: addressed by replacing current-global bond refunds/slashes with block-based bond amount epochs. Bond amount changes take effect on the next block, and each commitment refunds or slashes the amount active at its commit block.
  Commit: `b38ac88a97ec3f68a5f506175100fec6aba10978 fix(commit-reveal): snapshot bond amount epochs`
- #19 NativeTokenSplitter payer misdirection during `createFulfillment`: addressed by refunding native balance increases during payable splitter fulfillment creation back to the external fulfiller in `NativeTokenSplitter` and `TokenBundleSplitterBase`.
  Commit: `4263e23155a59acd58dae497f7a982b6e5d89fa1 fix(splitters): refund fulfillment native rebates`
- Default escrow checks follow-up: documented proposed default/unconditional escrow split before implementation.
  Doc: `docs/drafts/escrow-default-checks-plan.md`

## False Positives / Expected Behavior

- #1 CommitReveal demand ignored: report already marks false positive / acknowledged.
- #5 related: unrestricted `AttestationEscrowHook` / `AttestationEscrowHook2` calls are not considered protocol authority. Hook-issued attestations are not proof of escrow provenance unless the attestation content/schema or consumer checks establish that.
- #7 HookEscrowObligation self-recipient sink: not treated as a special-case vulnerability. A claimant choosing the wrong recipient, including the obligation itself, is equivalent to choosing any other unrecoverable/wrong recipient.
- #7 related: recipient binding in `HookEscrowObligation.checkObligation`: not addressed by default because open-claim semantics are intentional. If an escrow creator wants only a specific recipient to claim, compose a recipient/identity arbiter such as `RecipientArbiter`.
- #11 `TokenBundleSplitterUnvalidated` split-total / output-bounds issues: accepted behavior for the explicitly unvalidated splitter. The over-allocation path can only drain balances already stranded in the splitter, not assets still held by other escrow contracts, and there is no recovery mechanism for those stranded balances.
- #15 Splitter unconditional collection after third-party pre-collection: accepted as a low-incentive liveness edge case rather than a security issue. A third party needs an already-valid splitter-recipient fulfillment and posted oracle decision, and can only race the intended flow to move funds to the splitter, not to themselves. Adding distribute-only fallback semantics would require custody/accounting complexity or risk paying from commingled balances.

## Deferred

- #10 Missing fulfillment validation in tierable escrow collect paths: deferred to the default/unconditional escrow split. Tierable escrows intentionally do not require `fulfillment.refUID == escrow.uid`; default fulfillment intrinsic checks should be added as part of the broader default-checks API change rather than patched ad hoc here.
  Doc: `docs/drafts/escrow-default-checks-plan.md`

## Remaining Untriaged

- #20 Not-found handling / error classification.
- Second report section #1 NativeTokenEscrowHook empty `receive`.
- Second report section #2 Splitter self-recipient splits / missing withdrawal.
- Second report section #4 TokenBundleSplitter ERC721 index bounds.
- Second report section #5 Splitter `requestArbitration` event payload.
- Second report section #6 Splitter missing payable receive for refunding fulfillments.
- Second report section #7 BaseObligation payable raw entrypoint footgun.
