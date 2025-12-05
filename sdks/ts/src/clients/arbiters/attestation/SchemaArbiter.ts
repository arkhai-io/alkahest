import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as SchemaArbiterComposingAbi } from "../../../contracts/SchemaArbiterComposing";
import { abi as SchemaArbiterNonComposingAbi } from "../../../contracts/SchemaArbiterNonComposing";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABIs from contract ABIs at module initialization
const schemaArbiterComposingDecodeDemandFunction = getAbiItem({
  abi: SchemaArbiterComposingAbi.abi,
  name: "decodeDemandData",
});
const schemaArbiterNonComposingDecodeDemandFunction = getAbiItem({
  abi: SchemaArbiterNonComposingAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct types from the function outputs
const schemaArbiterComposingDemandDataType = schemaArbiterComposingDecodeDemandFunction.outputs[0];
const schemaArbiterNonComposingDemandDataType = schemaArbiterNonComposingDecodeDemandFunction.outputs[0];

/**
 * SchemaArbiter Client
 * 
 * Validates the schema hash of attestations.
 * Available in both composing and non-composing variants.
 */
export const makeSchemaArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    composing: {
      /**
       * Encodes SchemaArbiterComposing.DemandData to bytes.
       * @param demand - struct DemandData {address baseArbiter, bytes baseDemand, bytes32 schema}
       * @returns abi encoded bytes
       */
      encode: (demand: { baseArbiter: `0x${string}`; baseDemand: `0x${string}`; schema: `0x${string}` }) => {
        return encodeAbiParameters([schemaArbiterComposingDemandDataType], [demand]);
      },

      /**
       * Decodes SchemaArbiterComposing.DemandData from bytes.
       * @param demandData - DemandData as abi encoded bytes
       * @returns the decoded DemandData object
       */
      decode: (demandData: `0x${string}`) => {
        return decodeAbiParameters([schemaArbiterComposingDemandDataType], demandData)[0];
      },
    },

    nonComposing: {
      /**
       * Encodes SchemaArbiterNonComposing.DemandData to bytes.
       * @param demand - struct DemandData {bytes32 schema}
       * @returns abi encoded bytes
       */
      encode: (demand: { schema: `0x${string}` }) => {
        return encodeAbiParameters([schemaArbiterNonComposingDemandDataType], [demand]);
      },

      /**
       * Decodes SchemaArbiterNonComposing.DemandData from bytes.
       * @param demandData - DemandData as abi encoded bytes
       * @returns the decoded DemandData object
       */
      decode: (demandData: `0x${string}`) => {
        return decodeAbiParameters([schemaArbiterNonComposingDemandDataType], demandData)[0];
      },
    },
  };
};