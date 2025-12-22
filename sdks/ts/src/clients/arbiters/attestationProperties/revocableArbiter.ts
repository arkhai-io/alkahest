import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as RevocableArbiterAbi } from "../../../contracts/arbiters/attestation-properties/RevocableArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const revocableArbiterDecodeDemandFunction = getAbiItem({
  abi: RevocableArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const revocableArbiterDemandDataType = revocableArbiterDecodeDemandFunction.outputs[0];

/**
 * RevocableArbiter DemandData type
 */
export type RevocableArbiterDemandData = {
  revocable: boolean;
};

/**
 * Encodes RevocableArbiter.DemandData to bytes.
 * @param demand - struct DemandData {bool revocable}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: RevocableArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([revocableArbiterDemandDataType], [demand]);
};

/**
 * Decodes RevocableArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): RevocableArbiterDemandData => {
  return decodeAbiParameters([revocableArbiterDemandDataType], demandData)[0] as RevocableArbiterDemandData;
};

/**
 * Revocable Arbiter Client
 *
 * Validates the revocable flag of attestations.
 * Use with AllArbiter for composable validation.
 */
export const makeRevocableArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
