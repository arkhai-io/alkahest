import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as ExpirationTimeAfterArbiterComposingAbi } from "../../../contracts/ExpirationTimeAfterArbiterComposing";
import { abi as ExpirationTimeAfterArbiterNonComposingAbi } from "../../../contracts/ExpirationTimeAfterArbiterNonComposing";
import { abi as ExpirationTimeBeforeArbiterComposingAbi } from "../../../contracts/ExpirationTimeBeforeArbiterComposing";
import { abi as ExpirationTimeBeforeArbiterNonComposingAbi } from "../../../contracts/ExpirationTimeBeforeArbiterNonComposing";
import { abi as ExpirationTimeEqualArbiterComposingAbi } from "../../../contracts/ExpirationTimeEqualArbiterComposing";
import { abi as ExpirationTimeEqualArbiterNonComposingAbi } from "../../../contracts/ExpirationTimeEqualArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const expirationTimeAfterArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeAfterArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const expirationTimeAfterArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeAfterArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});
const expirationTimeBeforeArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeBeforeArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const expirationTimeBeforeArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeBeforeArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});
const expirationTimeEqualArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeEqualArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const expirationTimeEqualArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeEqualArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const expirationTimeAfterArbiterComposingDemandDataType = expirationTimeAfterArbiterComposingDecodeDemandFunction.outputs[0];
const expirationTimeAfterArbiterNonComposingDemandDataType = expirationTimeAfterArbiterNonComposingDecodeDemandFunction.outputs[0];
const expirationTimeBeforeArbiterComposingDemandDataType = expirationTimeBeforeArbiterComposingDecodeDemandFunction.outputs[0];
const expirationTimeBeforeArbiterNonComposingDemandDataType = expirationTimeBeforeArbiterNonComposingDecodeDemandFunction.outputs[0];
const expirationTimeEqualArbiterComposingDemandDataType = expirationTimeEqualArbiterComposingDecodeDemandFunction.outputs[0];
const expirationTimeEqualArbiterNonComposingDemandDataType = expirationTimeEqualArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * ExpirationTime Arbiter Client
 * 
 * Validates the expiration time of attestations.
 * Available in both composing and non-composing variants.
 * Supports After, Before, and Equal comparison operations.
 */
export const makeExpirationTimeArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    after: {
      composing: {
        /**
         * Encodes ExpirationTimeAfterArbiterComposing.DemandData to bytes.
         * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 expirationTime}
         * @returns abi encoded bytes
         */
        encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; expirationTime: bigint }) => {
          return encodeAbiParameters([expirationTimeAfterArbiterComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to ExpirationTimeAfterArbiterComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([expirationTimeAfterArbiterComposingDemandDataType], data)[0];
        },
      },

      nonComposing: {
        /**
         * Encodes ExpirationTimeAfterArbiterNonComposing.DemandData to bytes.
         * @param demand - struct DemandData {uint64 expirationTime}
         * @returns abi encoded bytes
         */
        encode: (demand: { expirationTime: bigint }) => {
          return encodeAbiParameters([expirationTimeAfterArbiterNonComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to ExpirationTimeAfterArbiterNonComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([expirationTimeAfterArbiterNonComposingDemandDataType], data)[0];
        },
      },
    },

    before: {
      composing: {
        /**
         * Encodes ExpirationTimeBeforeArbiterComposing.DemandData to bytes.
         * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 expirationTime}
         * @returns abi encoded bytes
         */
        encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; expirationTime: bigint }) => {
          return encodeAbiParameters([expirationTimeBeforeArbiterComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to ExpirationTimeBeforeArbiterComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([expirationTimeBeforeArbiterComposingDemandDataType], data)[0];
        },
      },

      nonComposing: {
        /**
         * Encodes ExpirationTimeBeforeArbiterNonComposing.DemandData to bytes.
         * @param demand - struct DemandData {uint64 expirationTime}
         * @returns abi encoded bytes
         */
        encode: (demand: { expirationTime: bigint }) => {
          return encodeAbiParameters([expirationTimeBeforeArbiterNonComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to ExpirationTimeBeforeArbiterNonComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([expirationTimeBeforeArbiterNonComposingDemandDataType], data)[0];
        },
      },
    },

    equal: {
      composing: {
        /**
         * Encodes ExpirationTimeEqualArbiterComposing.DemandData to bytes.
         * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 expirationTime}
         * @returns abi encoded bytes
         */
        encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; expirationTime: bigint }) => {
          return encodeAbiParameters([expirationTimeEqualArbiterComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to ExpirationTimeEqualArbiterComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([expirationTimeEqualArbiterComposingDemandDataType], data)[0];
        },
      },

      nonComposing: {
        /**
         * Encodes ExpirationTimeEqualArbiterNonComposing.DemandData to bytes.
         * @param demand - struct DemandData {uint64 expirationTime}
         * @returns abi encoded bytes
         */
        encode: (demand: { expirationTime: bigint }) => {
          return encodeAbiParameters([expirationTimeEqualArbiterNonComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to ExpirationTimeEqualArbiterNonComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([expirationTimeEqualArbiterNonComposingDemandDataType], data)[0];
        },
      },
    },
  };
};