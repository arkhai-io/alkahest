import { decodeAbiParameters, encodeAbiParameters, getAbiItem, type Address } from "viem";
import { abi as AllArbiterAbi } from "../../../contracts/arbiters/logical/AllArbiter";
import type { ChainAddresses, Demand } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const allArbiterDecodeDemandFunction = getAbiItem({
  abi: AllArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const allDemandDataType = allArbiterDecodeDemandFunction.outputs[0];

/**
 * AllArbiter DemandData type
 */
export type AllArbiterDemandData = {
  arbiters: readonly Address[];
  demands: readonly `0x${string}`[];
};

/**
 * Decoded demand with children for recursive parsing
 */
export type DecodedDemandWithChildren = {
  children: Demand[];
};

/**
 * Decoder function type for recursive demand parsing
 */
export type DemandDecoder = (data: `0x${string}`) => DecodedDemandWithChildren | Record<string, unknown>;

/**
 * Decoders record type mapping arbiter addresses to their decoders
 */
export type DecodersRecord = Record<Address, DemandDecoder>;

/**
 * Recursively decoded demand result
 */
export type RecursivelyDecodedDemand = {
  arbiter: Address;
  decoded: Record<string, unknown>;
  children?: RecursivelyDecodedDemand[];
};

/**
 * Encodes AllArbiter.DemandData to bytes.
 * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: { arbiters: Address[]; demands: `0x${string}`[] }): `0x${string}` => {
  return encodeAbiParameters([allDemandDataType], [demand]);
};

/**
 * Decodes AllArbiter.DemandData from bytes (single layer only).
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object with children array
 */
export const decodeDemand = (demandData: `0x${string}`): DecodedDemandWithChildren & AllArbiterDemandData => {
  const decoded = decodeAbiParameters([allDemandDataType], demandData)[0] as AllArbiterDemandData;
  return {
    ...decoded,
    children: decoded.arbiters.map((arbiter, i) => ({
      arbiter,
      demand: decoded.demands[i]!,
    })),
  };
};

/**
 * Recursively decodes AllArbiter.DemandData and all nested demands.
 * @param demandData - DemandData as abi encoded bytes
 * @param decoders - Record mapping arbiter addresses to their decoder functions
 * @returns recursively decoded demand tree
 */
export const decodeDemandRecursive = (
  demandData: `0x${string}`,
  decoders: DecodersRecord,
): RecursivelyDecodedDemand[] => {
  const decoded = decodeDemand(demandData);

  return decoded.children.map((child) => {
    const decoder = decoders[child.arbiter.toLowerCase() as Address];

    if (!decoder) {
      return {
        arbiter: child.arbiter,
        decoded: { raw: child.demand },
      };
    }

    const childDecoded = decoder(child.demand);

    // Check if this decoder returns children (i.e., it's a composing arbiter)
    if ("children" in childDecoded && Array.isArray(childDecoded.children)) {
      // Recursively decode the children
      const childDecoders = decoders;
      const recursiveChildren = childDecoded.children.map((grandchild) => {
        const grandchildDecoder = childDecoders[grandchild.arbiter.toLowerCase() as Address];
        if (!grandchildDecoder) {
          return {
            arbiter: grandchild.arbiter,
            decoded: { raw: grandchild.demand },
          };
        }
        const grandchildDecoded = grandchildDecoder(grandchild.demand);
        if ("children" in grandchildDecoded && Array.isArray(grandchildDecoded.children)) {
          // Continue recursion
          return {
            arbiter: grandchild.arbiter,
            decoded: grandchildDecoded,
            children: decodeDemandRecursiveFromDemand(grandchild, decoders),
          };
        }
        return {
          arbiter: grandchild.arbiter,
          decoded: grandchildDecoded,
        };
      });

      return {
        arbiter: child.arbiter,
        decoded: childDecoded,
        children: recursiveChildren,
      };
    }

    return {
      arbiter: child.arbiter,
      decoded: childDecoded,
    };
  });
};

/**
 * Helper to recursively decode a single demand
 */
const decodeDemandRecursiveFromDemand = (
  demand: Demand,
  decoders: DecodersRecord,
): RecursivelyDecodedDemand[] | undefined => {
  const decoder = decoders[demand.arbiter.toLowerCase() as Address];
  if (!decoder) return undefined;

  const decoded = decoder(demand.demand);
  if (!("children" in decoded) || !Array.isArray(decoded.children)) {
    return undefined;
  }

  return decoded.children.map((child) => {
    const childDecoder = decoders[child.arbiter.toLowerCase() as Address];
    if (!childDecoder) {
      return {
        arbiter: child.arbiter,
        decoded: { raw: child.demand },
      };
    }
    const childDecoded = childDecoder(child.demand);
    if ("children" in childDecoded && Array.isArray(childDecoded.children)) {
      return {
        arbiter: child.arbiter,
        decoded: childDecoded,
        children: decodeDemandRecursiveFromDemand(child, decoders),
      };
    }
    return {
      arbiter: child.arbiter,
      decoded: childDecoded,
    };
  });
};

/**
 * AllArbiter Client
 *
 * Handles logical AND operations for combining multiple arbiters.
 * Returns true if ALL of the provided arbiters return true.
 * This allows for strict validation where every condition must be met.
 */
export const makeAllArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
    decodeDemandRecursive,
  };
};
