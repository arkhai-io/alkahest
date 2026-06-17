# Escrow Default Checks Plan

## Context

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

## Proposed Direction

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

## Follow-Up Work

This touches contract names, generated docs, and SDK surfaces, so it should be
handled as a separate compatibility-aware change after the remaining audit items
are triaged.
