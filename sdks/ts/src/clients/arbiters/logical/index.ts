import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import {
  decodeDemand as allDecodeDemand,
  decodeDemandRecursive as allDecodeDemandRecursive,
  encodeDemand as allEncodeDemand,
  makeAllArbiterClient,
} from "./allArbiter";
import {
  decodeDemand as anyDecodeDemand,
  decodeDemandRecursive as anyDecodeDemandRecursive,
  encodeDemand as anyEncodeDemand,
  makeAnyArbiterClient,
} from "./anyArbiter";

// Re-export types from allArbiter (shared types)
export type {
  AllArbiterDemandData,
  DecodedDemandWithChildren,
  DecodersRecord,
  DemandDecoder,
  RecursivelyDecodedDemand,
} from "./allArbiter";

export type { AnyArbiterDemandData } from "./anyArbiter";

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
  };
};

// Export static functions for AllArbiter
export const AllArbiter = {
  encodeDemand: allEncodeDemand,
  decodeDemand: allDecodeDemand,
  decodeDemandRecursive: allDecodeDemandRecursive,
} as const;

// Export static functions for AnyArbiter
export const AnyArbiter = {
  encodeDemand: anyEncodeDemand,
  decodeDemand: anyDecodeDemand,
  decodeDemandRecursive: anyDecodeDemandRecursive,
} as const;
