import { decodeAbiParameters, encodeAbiParameters, getAbiItem, keccak256 } from "viem";
import { abi as erc8004ArbiterAbi } from "../../../contracts/arbiters/ERC8004Arbiter";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

const erc8004ArbiterDecodeDemandFunction = getAbiItem({
  abi: erc8004ArbiterAbi.abi,
  name: "decodeDemandData",
});

const erc8004ArbiterDemandDataType = erc8004ArbiterDecodeDemandFunction.outputs[0];

export type ERC8004ArbiterDemandData = {
  validationRegistry: `0x${string}`;
  validatorAddress: `0x${string}`;
  minResponse: number;
  data: `0x${string}`;
};

export const encodeDemand = (demand: ERC8004ArbiterDemandData): `0x${string}` => {
  return encodeAbiParameters([erc8004ArbiterDemandDataType], [demand]);
};

export const decodeDemand = (demandData: `0x${string}`): ERC8004ArbiterDemandData => {
  return decodeAbiParameters([erc8004ArbiterDemandDataType], demandData)[0] as ERC8004ArbiterDemandData;
};

export const requestHashFor = (uid: `0x${string}`, data: `0x${string}`): `0x${string}` => {
  return keccak256(encodeAbiParameters([{ type: "bytes32" }, { type: "bytes" }], [uid, data]));
};

export const makeERC8004ArbiterClient = (_viemClient: ViemClient, addresses: ChainAddresses) => ({
  address: addresses.erc8004Arbiter,
  encodeDemand,
  decodeDemand,
  requestHashFor,
});
