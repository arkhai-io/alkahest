import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

/**
 * ReferencesEscrowArbiter Client
 *
 * Checks that a fulfillment attestation's refUID is the escrow UID.
 * This arbiter has no DemandData; pass "0x" as demand bytes.
 */
export const makeReferencesEscrowArbiterClient = (_viemClient: ViemClient, addresses: ChainAddresses) => ({
  address: addresses.referencesEscrowArbiter,
  encodeDemand: (): "0x" => "0x",
  decodeDemand: (_demand: `0x${string}`): Record<string, never> => ({}),
});
