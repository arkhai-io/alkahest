import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

/**
 * TrivialArbiter Client
 *
 * Always accepts. Useful for development and unconstrained escrow flows.
 */
export const makeTrivialArbiterClient = (_viemClient: ViemClient, addresses: ChainAddresses) => ({
  address: addresses.trivialArbiter,
});
