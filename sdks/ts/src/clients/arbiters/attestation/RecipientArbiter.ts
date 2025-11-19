import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RecipientArbiterComposingAbi } from "../../../contracts/RecipientArbiterComposing";
import { abi as RecipientArbiterNonComposingAbi } from "../../../contracts/RecipientArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const recipientArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: RecipientArbiterComposingAbi,
  name: "decodeDemandData",
});
const recipientArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: RecipientArbiterNonComposingAbi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const recipientArbiterComposingDemandDataType = recipientArbiterComposingDecodeDemandFunction.outputs[0];
const recipientArbiterNonComposingDemandDataType = recipientArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * RecipientArbiter Client
 * 
 * Validates the recipient address of attestations.
 * Available in both composing and non-composing variants.
 */
export const makeRecipientArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    composing: {
      /**
       * Encodes RecipientArbiterComposing.DemandData to bytes.
       * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, address recipient}
       * @returns abi encoded bytes
       */
      encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; recipient: `0x${string}` }) => {
        return encodeAbiParameters([recipientArbiterComposingDemandDataType], [demand]);
      },

      /**
       * Decodes RecipientArbiterComposing.DemandData from bytes.
       * @param demandData - DemandData as abi encoded bytes
       * @returns the decoded DemandData object
       */
      decode: (demandData: `0x${string}`) => {
        return decodeAbiParameters([recipientArbiterComposingDemandDataType], demandData)[0];
      },
    },

    nonComposing: {
      /**
       * Encodes RecipientArbiterNonComposing.DemandData to bytes.
       * @param demand - struct DemandData {address recipient}
       * @returns abi encoded bytes
       */
      encode: (demand: { recipient: `0x${string}` }) => {
        return encodeAbiParameters([recipientArbiterNonComposingDemandDataType], [demand]);
      },

      /**
       * Decodes RecipientArbiterNonComposing.DemandData from bytes.
       * @param demandData - DemandData as abi encoded bytes
       * @returns the decoded DemandData object
       */
      decode: (demandData: `0x${string}`) => {
        return decodeAbiParameters([recipientArbiterNonComposingDemandDataType], demandData)[0];
      },
    },
  };
};