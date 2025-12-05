import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RefUidArbiterComposingAbi } from "../../../contracts/RefUidArbiterComposing";
import { abi as RefUidArbiterNonComposingAbi } from "../../../contracts/RefUidArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const refUidArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: RefUidArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const refUidArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: RefUidArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const refUidArbiterComposingDemandDataType = refUidArbiterComposingDecodeDemandFunction.outputs[0];
const refUidArbiterNonComposingDemandDataType = refUidArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * RefUid Arbiter Client
 * 
 * Validates the reference UID of attestations.
 * Available in both composing and non-composing variants.
 */
export const makeRefUidArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    composing: {
      /**
       * Encodes RefUidArbiterComposing.DemandData to bytes.
       * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 refUID}
       * @returns abi encoded bytes
       */
      encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; refUID: `0x${string}` }) => {
        return encodeAbiParameters([refUidArbiterComposingDemandDataType], [demand]);
      },

      /**
       * Decodes bytes to RefUidArbiterComposing.DemandData.
       * @param data - abi encoded bytes
       * @returns decoded DemandData struct
       */
      decode: (data: `0x${string}`) => {
        return decodeAbiParameters([refUidArbiterComposingDemandDataType], data)[0];
      },
    },

    nonComposing: {
      /**
       * Encodes RefUidArbiterNonComposing.DemandData to bytes.
       * @param demand - struct DemandData {bytes32 refUID}
       * @returns abi encoded bytes
       */
      encode: (demand: { refUID: `0x${string}` }) => {
        return encodeAbiParameters([refUidArbiterNonComposingDemandDataType], [demand]);
      },

      /**
       * Decodes bytes to RefUidArbiterNonComposing.DemandData.
       * @param data - abi encoded bytes
       * @returns decoded DemandData struct
       */
      decode: (data: `0x${string}`) => {
        return decodeAbiParameters([refUidArbiterNonComposingDemandDataType], data)[0];
      },
    },
  };
};