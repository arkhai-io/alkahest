import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RefUidArbiterAbi } from "../../../contracts/arbiters/attestation-properties/RefUidArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const refUidArbiterDecodeDemandFunction = getAbiItem({
  abi: RefUidArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const refUidArbiterDemandDataType = refUidArbiterDecodeDemandFunction.outputs[0];

/**
 * RefUidArbiter DemandData type
 */
export type RefUidArbiterDemandData = {
  refUID: `0x${string}`;
};

/**
 * Encodes RefUidArbiter.DemandData to bytes.
 * @param demand - struct DemandData {bytes32 refUID}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: RefUidArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([refUidArbiterDemandDataType], [demand]);
};

/**
 * Decodes RefUidArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): RefUidArbiterDemandData => {
  return decodeAbiParameters([refUidArbiterDemandDataType], demandData)[0] as RefUidArbiterDemandData;
};

/**
 * RefUid Arbiter Client
 *
 * Validates the reference UID of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeRefUidArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
