import { type Address, decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as AnyArbiterAbi } from "../../../contracts/arbiters/logical/AnyArbiter";
import type { ChainAddresses, Demand } from "../../../types";
import type { ViemClient } from "../../../utils";
import type { DecodedDemandWithChildren, DecodersRecord, RecursivelyDecodedDemand } from "./allArbiter";

// Extract DemandData struct ABI from contract ABI at module initialization
const anyArbiterDecodeDemandFunction = getAbiItem({
  abi: AnyArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const anyDemandDataType = anyArbiterDecodeDemandFunction.outputs[0];

/**
 * AnyArbiter DemandData type
 */
export type AnyArbiterDemandData = {
  arbiters: readonly Address[];
  demands: readonly `0x${string}`[];
};

/**
 * Encodes AnyArbiter.DemandData to bytes.
 * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: { arbiters: Address[]; demands: `0x${string}`[] }): `0x${string}` => {
  return encodeAbiParameters([anyDemandDataType], [demand]);
};

/**
 * Decodes AnyArbiter.DemandData from bytes (single layer only).
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object with children array
 */
export const decodeDemand = (demandData: `0x${string}`): DecodedDemandWithChildren & AnyArbiterDemandData => {
  const decoded = decodeAbiParameters([anyDemandDataType], demandData)[0] as AnyArbiterDemandData;
  return {
    ...decoded,
    children: decoded.arbiters.map((arbiter, i) => ({
      arbiter,
      demand: decoded.demands[i]!,
    })),
  };
};

/**
 * Recursively decodes AnyArbiter.DemandData and all nested demands.
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
      const recursiveChildren = childDecoded.children.map((grandchild) => {
        const grandchildDecoder = decoders[grandchild.arbiter.toLowerCase() as Address];
        if (!grandchildDecoder) {
          return {
            arbiter: grandchild.arbiter,
            decoded: { raw: grandchild.demand },
          };
        }
        const grandchildDecoded = grandchildDecoder(grandchild.demand);
        if ("children" in grandchildDecoded && Array.isArray(grandchildDecoded.children)) {
          return {
            arbiter: grandchild.arbiter,
            decoded: grandchildDecoded,
            children: decodeDemandRecursiveHelper(grandchild, decoders),
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
const decodeDemandRecursiveHelper = (
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
        children: decodeDemandRecursiveHelper(child, decoders),
      };
    }
    return {
      arbiter: child.arbiter,
      decoded: childDecoded,
    };
  });
};

/**
 * AnyArbiter Client
 *
 * Handles logical OR operations for combining multiple arbiters.
 * Returns true if ANY of the provided arbiters returns true.
 * This allows for flexible validation where only one condition needs to be met.
 */
export const makeAnyArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
    decodeDemandRecursive,
  };
};
