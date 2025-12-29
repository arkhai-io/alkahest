import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as ExpirationTimeEqualArbiterAbi } from "../../../contracts/arbiters/attestation-properties/ExpirationTimeEqualArbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

// Extract DemandData struct ABI from contract ABI at module initialization
const expirationTimeEqualArbiterDecodeDemandFunction = getAbiItem({
  abi: ExpirationTimeEqualArbiterAbi.abi,
  name: "decodeDemandData",
});

// Extract the DemandData struct type from the function output
const expirationTimeEqualArbiterDemandDataType = expirationTimeEqualArbiterDecodeDemandFunction.outputs[0];

/**
 * ExpirationTimeEqualArbiter DemandData type
 */
export type ExpirationTimeEqualArbiterDemandData = {
  expirationTime: bigint;
};

/**
 * Encodes ExpirationTimeEqualArbiter.DemandData to bytes.
 * @param demand - struct DemandData {uint64 expirationTime}
 * @returns abi encoded bytes
 */
export const encodeDemand = (demand: ExpirationTimeEqualArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([expirationTimeEqualArbiterDemandDataType], [demand]);
};

/**
 * Decodes ExpirationTimeEqualArbiter.DemandData from bytes.
 * @param demandData - DemandData as abi encoded bytes
 * @returns the decoded DemandData object
 */
export const decodeDemand = (demandData: `0x${string}`): ExpirationTimeEqualArbiterDemandData => {
  return decodeAbiParameters(
    [expirationTimeEqualArbiterDemandDataType],
    demandData,
  )[0] as ExpirationTimeEqualArbiterDemandData;
};

/**
 * ExpirationTimeEqualArbiter Client
 *
 * Validates that the attestation expiration time equals a specified time.
 * Use with AllArbiter for composable validation.
 */
export const makeExpirationTimeEqualArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    encodeDemand,
    decodeDemand,
  };
};
