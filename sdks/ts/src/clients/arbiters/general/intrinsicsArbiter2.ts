import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as IntrinsicsArbiter2Abi } from "../../../contracts/arbiters/IntrinsicsArbiter2";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const intrinsicsArbiter2DecodeDemandFunction = getAbiItem({
  abi: IntrinsicsArbiter2Abi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const intrinsicsArbiter2DemandDataType = intrinsicsArbiter2DecodeDemandFunction.outputs[0];

/**
 * IntrinsicsArbiter2 Client
 *
 * Handles schema-based validation for attestations.
 * This arbiter validates that an attestation conforms to a specific schema.
 */
/**
 * IntrinsicsArbiter2 DemandData type
 */
export type IntrinsicsArbiter2DemandData = {
  schema: `0x${string}`;
};

/**
 * Encodes IntrinsicsArbiter2.DemandData to bytes.
 * @param demand - struct DemandData {bytes32 schema}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: IntrinsicsArbiter2DemandData): `0x${string}` => {
  return encodeAbiParameters([intrinsicsArbiter2DemandDataType], [demand]);
};

/**
 * Decodes IntrinsicsArbiter2.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): IntrinsicsArbiter2DemandData => {
  return decodeAbiParameters([intrinsicsArbiter2DemandDataType], demandData)[0] as IntrinsicsArbiter2DemandData;
};

export const makeIntrinsicsArbiter2Client = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
