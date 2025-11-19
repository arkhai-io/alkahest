import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { AllArbiterCodec, makeAllArbiterClient } from "./AllArbiter";
import { AnyArbiterCodec, makeAnyArbiterClient } from "./AnyArbiter";

/**
 * Logical Arbiters Client
 * 
 * Provides access to logical composition arbiters for combining multiple arbiters:
 * - AnyArbiter: Returns true if ANY of the provided arbiters returns true (logical OR)
 * - AllArbiter: Returns true if ALL of the provided arbiters return true (logical AND)
 * 
 * These arbiters take arrays of arbiter addresses and their corresponding demand data,
 * allowing for complex logical compositions of arbitration rules.
 */
export const makeLogicalArbitersClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  const any = makeAnyArbiterClient(viemClient, addresses);
  const all = makeAllArbiterClient(viemClient, addresses);

  return {
    any,
    all,

    // Backward compatibility - flat methods
    encodeAnyArbiterDemand: any.encode,
    decodeAnyArbiterDemand: any.decode,
    encodeAllArbiterDemand: all.encode,
    decodeAllArbiterDemand: all.decode,
  };
};

// Export static codecs for use without client instantiation
export { AnyArbiterCodec, AllArbiterCodec };