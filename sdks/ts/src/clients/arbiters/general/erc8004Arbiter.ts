import { decodeAbiParameters, encodeAbiParameters, getAbiItem, keccak256 } from "viem";
import { abi as erc8004ArbiterAbi } from "../../../contracts/arbiters/ERC8004Arbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

const erc8004ArbiterDecodeDemandFunction = getAbiItem({
  abi: erc8004ArbiterAbi.abi,
  name: "decodeDemandData",
});

const erc8004ArbiterDemandDataType = erc8004ArbiterDecodeDemandFunction.outputs[0];

/** ERC-8004 validation demand used by the ERC8004 arbiter. */
export type ERC8004ArbiterDemandData = {
  /** ERC-8004 ValidationRegistry contract to query. */
  validationRegistry: `0x${string}`;
  /** Validator address that must have produced the validation response. */
  validatorAddress: `0x${string}`;
  /** Minimum accepted response, from 1 through 100. */
  minResponse: number;
  /** Opaque binding data included in the validation request hash. */
  data: `0x${string}`;
};

/** ABI-encode ERC8004 arbiter demand data. */
export const encodeDemand = (demand: ERC8004ArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([erc8004ArbiterDemandDataType], [demand]);
};

/** Decode ABI-encoded ERC8004 arbiter demand data. */
export const decodeDemand = (demandData: `0x${string}`): ERC8004ArbiterDemandData => {
  return decodeAbiParameters([erc8004ArbiterDemandDataType], demandData)[0] as ERC8004ArbiterDemandData;
};

/** Compute the validation request hash used by the Solidity ERC8004Arbiter. */
export const requestHashFor = (uid: `0x${string}`, data: `0x${string}`): `0x${string}` => {
  return keccak256(encodeAbiParameters([{ type: "bytes32" }, { type: "bytes" }], [uid, data]));
};

/** Create a lightweight ERC8004 arbiter helper client. */
export const makeERC8004ArbiterClient = (_viemClient: ViemClient, addresses: ChainAddresses) => ({
  address: addresses.erc8004Arbiter,
  encodeDemand,
  decodeDemand,
  requestHashFor,
});
