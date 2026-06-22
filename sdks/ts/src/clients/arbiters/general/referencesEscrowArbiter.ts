import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

/**
 * ReferencesEscrowArbiter Client
 *
 * Checks that a fulfillment attestation's refUID is the escrow UID.
 * This arbiter has no DemandData; pass "0x" as demand bytes.
 */
export const encodeDemand = (): "0x" => "0x";

export const decodeDemand = (_demand: `0x${string}`): Record<string, never> => ({});

export const makeReferencesEscrowArbiterClient = (_viemClient: ViemClient, addresses: ChainAddresses) => ({
  address: addresses.referencesEscrowArbiter,
  encodeDemand,
  decodeDemand,
});
