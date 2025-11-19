import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as AllArbiterAbi } from "../../../contracts/AllArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const allArbiterDecodeDemandFunction = getAbiItem({
  abi: AllArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const allDemandDataType = allArbiterDecodeDemandFunction.outputs[0];

/**
 * Static encoding/decoding utilities for AllArbiter demands
 * These functions don't require client instantiation since they only handle data transformation
 */
export const AllArbiterCodec = {
  /**
   * Encodes AllArbiter.DemandData to bytes.
   * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
   * @returns abi encoded bytes
   */
  encode: (demand: { arbiters: `0x${string}`[]; demands: `0x${string}`[] }) => {
    return encodeAbiParameters([allDemandDataType], [demand]);
  },

  /**
   * Decodes AllArbiter.DemandData from bytes.
   * @param demandData - DemandData as abi encoded bytes
   * @returns the decoded DemandData object
   */
  decode: (demandData: `0x${string}`) => {
    return decodeAbiParameters([allDemandDataType], demandData)[0];
  },
} as const;

/**
 * AllArbiter Client
 * 
 * Handles logical AND operations for combining multiple arbiters.
 * Returns true if ALL of the provided arbiters return true.
 * This allows for strict validation where every condition must be met.
 */
export const makeAllArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes AllArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address[] arbiters, bytes[] demands}
     * @returns abi encoded bytes
     */
    encode: AllArbiterCodec.encode,

    /**
     * Decodes AllArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decode: AllArbiterCodec.decode,
  };
};