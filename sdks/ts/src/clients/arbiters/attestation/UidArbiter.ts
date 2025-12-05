import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as UidArbiterComposingAbi } from "../../../contracts/UidArbiterComposing";
import { abi as UidArbiterNonComposingAbi } from "../../../contracts/UidArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const uidArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: UidArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const uidArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: UidArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const uidArbiterComposingDemandDataType = uidArbiterComposingDecodeDemandFunction.outputs[0];
const uidArbiterNonComposingDemandDataType = uidArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * Uid Arbiter Client
 * 
 * Validates the UID of attestations.
 * Available in both composing and non-composing variants.
 */
export const makeUidArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    composing: {
      /**
       * Encodes UidArbiterComposing.DemandData to bytes.
       * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 uid}
       * @returns abi encoded bytes
       */
      encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; uid: `0x${string}` }) => {
        return encodeAbiParameters([uidArbiterComposingDemandDataType], [demand]);
      },

      /**
       * Decodes bytes to UidArbiterComposing.DemandData.
       * @param data - abi encoded bytes
       * @returns decoded DemandData struct
       */
      decode: (data: `0x${string}`) => {
        return decodeAbiParameters([uidArbiterComposingDemandDataType], data)[0];
      },
    },

    nonComposing: {
      /**
       * Encodes UidArbiterNonComposing.DemandData to bytes.
       * @param demand - struct DemandData {bytes32 uid}
       * @returns abi encoded bytes
       */
      encode: (demand: { uid: `0x${string}` }) => {
        return encodeAbiParameters([uidArbiterNonComposingDemandDataType], [demand]);
      },

      /**
       * Decodes bytes to UidArbiterNonComposing.DemandData.
       * @param data - abi encoded bytes
       * @returns decoded DemandData struct
       */
      decode: (data: `0x${string}`) => {
        return decodeAbiParameters([uidArbiterNonComposingDemandDataType], data)[0];
      },
    },
  };
};