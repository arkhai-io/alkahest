import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as SchemaArbiterAbi } from "../../../contracts/arbiters/attestation-properties/SchemaArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const schemaArbiterDecodeDemandFunction = getAbiItem({
  abi: SchemaArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const schemaArbiterDemandDataType = schemaArbiterDecodeDemandFunction.outputs[0];

/**
 * SchemaArbiter Client
 *
 * Validates the schema hash of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeSchemaArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Encodes SchemaArbiter.DemandData to bytes.
     * @param demand - struct DemandData {bytes32 schema}
     * @returns abi encoded bytes
     */
    encode: (demand: { schema: `0x${string}` }) => {
      return encodeAbiParameters([schemaArbiterDemandDataType], [demand]);
    },

    /**
     * Decodes SchemaArbiter.DemandData from bytes.
     * @param demandData - DemandData as abi encoded bytes
     * @returns the decoded DemandData object
     */
    decode: (demandData: `0x${string}`) => {
      return decodeAbiParameters([schemaArbiterDemandDataType], demandData)[0];
    },
  };
};
