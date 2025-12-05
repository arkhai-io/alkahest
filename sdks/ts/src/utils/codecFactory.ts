import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import type { Abi } from "viem";

/**
 * Standard interface for composing arbiter demand data
 * Most composing arbiters follow the pattern: { baseArbiter: address, baseDemand: bytes, ...specificFields }
 */
export interface BaseComposingDemandData {
  baseArbiter: `0x${string}`;
  baseDemand: `0x${string}`;
}

/**
 * Generic codec factory for composing arbiters
 * Automatically extracts ABI structure and creates encode/decode functions
 */
export function createComposingArbiterCodec<T extends BaseComposingDemandData>(contractAbi: { abi: Abi }) {
  // Extract DemandData struct ABI from contract ABI
  const decodeDemandFunction = getAbiItem({
    abi: contractAbi.abi,
    name: "decodeDemandData",
  });

  if (!decodeDemandFunction || decodeDemandFunction.type !== 'function') {
    throw new Error('decodeDemandData function not found in contract ABI');
  }

  const demandDataType = decodeDemandFunction.outputs[0];
  
  if (!demandDataType) {
    throw new Error('DemandData output type not found in decodeDemandData function');
  }

  return {
    /**
     * Encodes composing arbiter demand data to bytes
     */
    encode: (demand: T): `0x${string}` => {
      return encodeAbiParameters([demandDataType], [demand as any]);
    },

    /**
     * Decodes composing arbiter demand data from bytes
     */
    decode: (demandData: `0x${string}`): T => {
      return decodeAbiParameters([demandDataType], demandData)[0] as T;
    },
  };
}

/**
 * Generic codec factory for non-composing arbiters
 * Similar pattern but without baseArbiter/baseDemand fields
 */
export function createNonComposingArbiterCodec<T>(contractAbi: { abi: Abi }) {
  // Extract DemandData struct ABI from contract ABI
  const decodeDemandFunction = getAbiItem({
    abi: contractAbi.abi,
    name: "decodeDemandData",
  });

  if (!decodeDemandFunction || decodeDemandFunction.type !== 'function') {
    throw new Error('decodeDemandData function not found in contract ABI');
  }

  const demandDataType = decodeDemandFunction.outputs[0];
  
  if (!demandDataType) {
    throw new Error('DemandData output type not found in decodeDemandData function');
  }

  return {
    /**
     * Encodes non-composing arbiter demand data to bytes
     */
    encode: (demand: T): `0x${string}` => {
      return encodeAbiParameters([demandDataType], [demand as any]);
    },

    /**
     * Decodes non-composing arbiter demand data from bytes
     */
    decode: (demandData: `0x${string}`): T => {
      return decodeAbiParameters([demandDataType], demandData)[0] as T;
    },
  };
}