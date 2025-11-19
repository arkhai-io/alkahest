import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RevocableArbiterComposingAbi } from "../../../contracts/RevocableArbiterComposing";
import { abi as RevocableArbiterNonComposingAbi } from "../../../contracts/RevocableArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const revocableArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: RevocableArbiterComposingAbi,
  name: "decodeDemandData",
});
const revocableArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: RevocableArbiterNonComposingAbi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const revocableArbiterComposingDemandDataType = revocableArbiterComposingDecodeDemandFunction.outputs[0];
const revocableArbiterNonComposingDemandDataType = revocableArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * Revocable Arbiter Client
 * 
 * Validates the revocable flag of attestations.
 * Available in both composing and non-composing variants.
 */
export const makeRevocableArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    composing: {
      /**
       * Encodes RevocableArbiterComposing.DemandData to bytes.
       * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bool revocable}
       * @returns abi encoded bytes
       */
      encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; revocable: boolean }) => {
        return encodeAbiParameters([revocableArbiterComposingDemandDataType], [demand]);
      },

      /**
       * Decodes bytes to RevocableArbiterComposing.DemandData.
       * @param data - abi encoded bytes
       * @returns decoded DemandData struct
       */
      decode: (data: `0x${string}`) => {
        return decodeAbiParameters([revocableArbiterComposingDemandDataType], data)[0];
      },
    },

    nonComposing: {
      /**
       * Encodes RevocableArbiterNonComposing.DemandData to bytes.
       * @param demand - struct DemandData {bool revocable}
       * @returns abi encoded bytes
       */
      encode: (demand: { revocable: boolean }) => {
        return encodeAbiParameters([revocableArbiterNonComposingDemandDataType], [demand]);
      },

      /**
       * Decodes bytes to RevocableArbiterNonComposing.DemandData.
       * @param data - abi encoded bytes
       * @returns decoded DemandData struct
       */
      decode: (data: `0x${string}`) => {
        return decodeAbiParameters([revocableArbiterNonComposingDemandDataType], data)[0];
      },
    },
  };
};