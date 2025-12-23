import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as ExpirationTimeBeforeArbiterAbi } from "../../../contracts/arbiters/attestation-properties/ExpirationTimeBeforeArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const expirationTimeBeforeArbiterDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeBeforeArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const expirationTimeBeforeArbiterDemandDataType = expirationTimeBeforeArbiterDecodeDemandFunction.outputs[0];

/**
 * ExpirationTimeBeforeArbiter DemandData type
 */
export type ExpirationTimeBeforeArbiterDemandData = {
  expirationTime: bigint;
};

/**
 * Encodes ExpirationTimeBeforeArbiter.DemandData to bytes.
 * @param demand - struct DemandData {uint64 expirationTime}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: ExpirationTimeBeforeArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([expirationTimeBeforeArbiterDemandDataType], [demand]);
};

/**
 * Decodes ExpirationTimeBeforeArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): ExpirationTimeBeforeArbiterDemandData => {
  return decodeAbiParameters([expirationTimeBeforeArbiterDemandDataType], demandData)[0] as ExpirationTimeBeforeArbiterDemandData;
};

/**
 * ExpirationTimeBeforeArbiter Client
 *
 * Validates that the attestation expiration time is before a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeExpirationTimeBeforeArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
