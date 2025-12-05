import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as TimeAfterArbiterComposingAbi } from "../../../contracts/TimeAfterArbiterComposing";
import { abi as TimeAfterArbiterNonComposingAbi } from "../../../contracts/TimeAfterArbiterNonComposing";
import { abi as TimeBeforeArbiterComposingAbi } from "../../../contracts/TimeBeforeArbiterComposing";
import { abi as TimeBeforeArbiterNonComposingAbi } from "../../../contracts/TimeBeforeArbiterNonComposing";
import { abi as TimeEqualArbiterComposingAbi } from "../../../contracts/TimeEqualArbiterComposing";
import { abi as TimeEqualArbiterNonComposingAbi } from "../../../contracts/TimeEqualArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const timeAfterArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: TimeAfterArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const timeAfterArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: TimeAfterArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});
const timeBeforeArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: TimeBeforeArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const timeBeforeArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: TimeBeforeArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});
const timeEqualArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: TimeEqualArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const timeEqualArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: TimeEqualArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const timeAfterArbiterComposingDemandDataType = timeAfterArbiterComposingDecodeDemandFunction.outputs[0];
const timeAfterArbiterNonComposingDemandDataType = timeAfterArbiterNonComposingDecodeDemandFunction.outputs[0];
const timeBeforeArbiterComposingDemandDataType = timeBeforeArbiterComposingDecodeDemandFunction.outputs[0];
const timeBeforeArbiterNonComposingDemandDataType = timeBeforeArbiterNonComposingDecodeDemandFunction.outputs[0];
const timeEqualArbiterComposingDemandDataType = timeEqualArbiterComposingDecodeDemandFunction.outputs[0];
const timeEqualArbiterNonComposingDemandDataType = timeEqualArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * Time Arbiter Client
 * 
 * Validates the timestamp of attestations.
 * Available in both composing and non-composing variants.
 * Supports After, Before, and Equal comparison operations.
 */
export const makeTimeArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    after: {
      composing: {
        /**
         * Encodes TimeAfterArbiterComposing.DemandData to bytes.
         * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 time}
         * @returns abi encoded bytes
         */
        encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; time: bigint }) => {
          return encodeAbiParameters([timeAfterArbiterComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to TimeAfterArbiterComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([timeAfterArbiterComposingDemandDataType], data)[0];
        },
      },

      nonComposing: {
        /**
         * Encodes TimeAfterArbiterNonComposing.DemandData to bytes.
         * @param demand - struct DemandData {uint64 time}
         * @returns abi encoded bytes
         */
        encode: (demand: { time: bigint }) => {
          return encodeAbiParameters([timeAfterArbiterNonComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to TimeAfterArbiterNonComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([timeAfterArbiterNonComposingDemandDataType], data)[0];
        },
      },
    },

    before: {
      composing: {
        /**
         * Encodes TimeBeforeArbiterComposing.DemandData to bytes.
         * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 time}
         * @returns abi encoded bytes
         */
        encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; time: bigint }) => {
          return encodeAbiParameters([timeBeforeArbiterComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to TimeBeforeArbiterComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([timeBeforeArbiterComposingDemandDataType], data)[0];
        },
      },

      nonComposing: {
        /**
         * Encodes TimeBeforeArbiterNonComposing.DemandData to bytes.
         * @param demand - struct DemandData {uint64 time}
         * @returns abi encoded bytes
         */
        encode: (demand: { time: bigint }) => {
          return encodeAbiParameters([timeBeforeArbiterNonComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to TimeBeforeArbiterNonComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([timeBeforeArbiterNonComposingDemandDataType], data)[0];
        },
      },
    },

    equal: {
      composing: {
        /**
         * Encodes TimeEqualArbiterComposing.DemandData to bytes.
         * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, uint64 time}
         * @returns abi encoded bytes
         */
        encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; time: bigint }) => {
          return encodeAbiParameters([timeEqualArbiterComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to TimeEqualArbiterComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([timeEqualArbiterComposingDemandDataType], data)[0];
        },
      },

      nonComposing: {
        /**
         * Encodes TimeEqualArbiterNonComposing.DemandData to bytes.
         * @param demand - struct DemandData {uint64 time}
         * @returns abi encoded bytes
         */
        encode: (demand: { time: bigint }) => {
          return encodeAbiParameters([timeEqualArbiterNonComposingDemandDataType], [demand]);
        },

        /**
         * Decodes bytes to TimeEqualArbiterNonComposing.DemandData.
         * @param data - abi encoded bytes
         * @returns decoded DemandData struct
         */
        decode: (data: `0x${string}`) => {
          return decodeAbiParameters([timeEqualArbiterNonComposingDemandDataType], data)[0];
        },
      },
    },
  };
};