import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RecipientArbiterAbi } from "../../../contracts/arbiters/attestation-properties/RecipientArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const recipientArbiterDecodeDemandFunction = getAbiItem({
  abi: RecipientArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const recipientArbiterDemandDataType = recipientArbiterDecodeDemandFunction.outputs[0];

/**
 * RecipientArbiter Client
 *
 * Validates the recipient address of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeRecipientArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes RecipientArbiter.DemandData to bytes.
     * @param demand - struct DemandData {address recipient}
     * @returns abi encoded bytes
     */
    encode: (demand: { recipient: `0x${string}` }) => {
      return encodeAbiParameters([recipientArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes RecipientArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decode: (demandData: `0x${string}`) => {
      return decodeAbiParameters([recipientArbiterDemandDataType], demandData)[0];
    },
  };
};
