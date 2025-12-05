import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as AttesterArbiterComposingAbi } from "../../../contracts/AttesterArbiterComposing";
import { abi as AttesterArbiterNonComposingAbi } from "../../../contracts/AttesterArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const attesterArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: AttesterArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const attesterArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: AttesterArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const attesterArbiterComposingDemandDataType = attesterArbiterComposingDecodeDemandFunction.outputs[0];
const attesterArbiterNonComposingDemandDataType = attesterArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * AttesterArbiter Client
 * 
 * Validates the attester address of attestations.
 * Available in both composing and non-composing variants.
 */
export const makeAttesterArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    composing: {
      /**
       * Encodes AttesterArbiterComposing.DemandData to bytes.
       * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address attester}
       * @returns abi encoded bytes
       */
      encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; attester: `0x${string}` }) => {
        return encodeAbiParameters([attesterArbiterComposingDemandDataType], [demand]);
      },

      /**
       * Decodes AttesterArbiterComposing.DemandData from bytes.
       * @param demandData - DemandData as abi encoded bytes
       * @returns the decoded DemandData object
       */
      decode: (demandData: `0x${string}`) => {
        return decodeAbiParameters([attesterArbiterComposingDemandDataType], demandData)[0];
      },
    },

    nonComposing: {
      /**
       * Encodes AttesterArbiterNonComposing.DemandData to bytes.
       * @param demand - struct DemandData {address attester}
       * @returns abi encoded bytes
       */
      encode: (demand: { attester: `0x${string}` }) => {
        return encodeAbiParameters([attesterArbiterNonComposingDemandDataType], [demand]);
      },

      /**
       * Decodes AttesterArbiterNonComposing.DemandData from bytes.
       * @param demandData - DemandData as abi encoded bytes
       * @returns the decoded DemandData object
       */
      decode: (demandData: `0x${string}`) => {
        return decodeAbiParameters([attesterArbiterNonComposingDemandDataType], demandData)[0];
      },
    },
  };
};