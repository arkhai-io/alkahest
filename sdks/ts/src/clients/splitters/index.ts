import { decodeAbiParameters, encodeAbiParameters, encodePacked, getAbiItem, keccak256 } from "viem";
import { abi as erc20SplitterAbi } from "../../contracts/utils/splitters/ERC20Splitter";
import { abi as erc1155SplitterAbi } from "../../contracts/utils/splitters/ERC1155Splitter";
import { abi as nativeTokenSplitterAbi } from "../../contracts/utils/splitters/NativeTokenSplitter";
import { abi as tokenBundleSplitterAbi } from "../../contracts/utils/splitters/TokenBundleSplitter";
import { abi as tokenBundleSplitterUnvalidatedAbi } from "../../contracts/utils/splitters/TokenBundleSplitterUnvalidated";
import type { Attestation, ChainAddresses } from "../../types";
import { readContract, type ViemClient, writeContract } from "../../utils";

export type SplitterAddresses = {
  erc20Splitter: `0x${string}`;
  erc1155Splitter: `0x${string}`;
  nativeTokenSplitter: `0x${string}`;
  tokenBundleSplitter: `0x${string}`;
  tokenBundleSplitterUnvalidated: `0x${string}`;
};

export const pickSplitterAddresses = (addresses: ChainAddresses): SplitterAddresses => ({
  erc20Splitter: addresses.erc20Splitter,
  erc1155Splitter: addresses.erc1155Splitter,
  nativeTokenSplitter: addresses.nativeTokenSplitter,
  tokenBundleSplitter: addresses.tokenBundleSplitter,
  tokenBundleSplitterUnvalidated: addresses.tokenBundleSplitterUnvalidated,
});

export type SplitterDemandData = {
  oracle: `0x${string}`;
  data: `0x${string}`;
};

export type AmountSplit = {
  recipient: `0x${string}`;
  amount: bigint;
};

export type BundleSplit = {
  recipient: `0x${string}`;
  nativeAmount: bigint;
  erc20Amounts: bigint[];
  erc721Indices: bigint[];
  erc1155Amounts: bigint[];
};

const demandDataType = getAbiItem({ abi: erc20SplitterAbi.abi, name: "decodeDemandData" }).outputs[0];
const amountSplitType = getAbiItem({ abi: erc20SplitterAbi.abi, name: "arbitrate" }).inputs[2];
const bundleSplitType = getAbiItem({ abi: tokenBundleSplitterAbi.abi, name: "arbitrate" }).inputs[2];

export const encodeSplitterDemand = (data: SplitterDemandData): `0x${string}` =>
  encodeAbiParameters([demandDataType], [data]);

export const decodeSplitterDemand = (data: `0x${string}`): SplitterDemandData =>
  decodeAbiParameters([demandDataType], data)[0] as SplitterDemandData;

export const encodeAmountSplits = (splits: AmountSplit[]): `0x${string}` =>
  encodeAbiParameters([amountSplitType], [splits]);

export const decodeAmountSplits = (data: `0x${string}`): AmountSplit[] =>
  decodeAbiParameters([amountSplitType], data)[0] as AmountSplit[];

export const encodeBundleSplits = (splits: BundleSplit[]): `0x${string}` =>
  encodeAbiParameters([bundleSplitType], [splits]);

export const decodeBundleSplits = (data: `0x${string}`): BundleSplit[] =>
  decodeAbiParameters([bundleSplitType], data)[0] as BundleSplit[];

export const splitterDecisionKey = (fulfillment: `0x${string}`, escrow: `0x${string}`): `0x${string}` =>
  keccak256(encodePacked(["bytes32", "bytes32"], [fulfillment, escrow]));

const makeAmountSplitterClient = (
  viemClient: ViemClient,
  address: `0x${string}`,
  abi: any,
) => ({
  address,
  encodeDemand: encodeSplitterDemand,
  decodeDemand: decodeSplitterDemand,
  decisionKey: splitterDecisionKey,
  arbitrate: async (fulfillment: `0x${string}`, escrow: `0x${string}`, splits: AmountSplit[]) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "arbitrate",
      args: [fulfillment, escrow, splits],
    }),
  requestArbitration: async (
    fulfillment: `0x${string}`,
    escrow: `0x${string}`,
    oracle: `0x${string}`,
    demand: `0x${string}`,
  ) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "requestArbitration",
      args: [fulfillment, escrow, oracle, demand],
    }),
  createFulfillment: async (
    obligationContract: `0x${string}`,
    data: `0x${string}`,
    expirationTime: bigint,
    refUID: `0x${string}`,
    value = 0n,
  ) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "createFulfillment",
      args: [obligationContract, data, expirationTime, refUID],
      value,
    } as unknown as Parameters<typeof writeContract>[1]),
  collectAndDistribute: async (escrowContract: `0x${string}`, escrow: `0x${string}`, fulfillment: `0x${string}`) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "collectAndDistribute",
      args: [escrowContract, escrow, fulfillment],
    }),
  unsafePartiallyCollectAndDistribute: async (
    escrowContract: `0x${string}`,
    escrow: `0x${string}`,
    fulfillment: `0x${string}`,
  ) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "unsafePartiallyCollectAndDistribute",
      args: [escrowContract, escrow, fulfillment],
    }),
  getSplits: async (oracle: `0x${string}`, fulfillment: `0x${string}`, escrow: `0x${string}`) =>
    await readContract<AmountSplit[]>(viemClient, {
      address,
      abi,
      functionName: "getSplits",
      args: [oracle, fulfillment, escrow],
    }),
  hasDecision: async (oracle: `0x${string}`, fulfillment: `0x${string}`, escrow: `0x${string}`) =>
    await readContract<boolean>(viemClient, {
      address,
      abi,
      functionName: "hasDecision",
      args: [oracle, splitterDecisionKey(fulfillment, escrow)],
    }),
  check: async (fulfillment: Attestation, demand: `0x${string}`, escrow: `0x${string}`) =>
    await readContract<boolean>(viemClient, {
      address,
      abi,
      functionName: "check",
      args: [fulfillment, demand, escrow],
    }),
});

const makeBundleSplitterClient = (
  viemClient: ViemClient,
  address: `0x${string}`,
  abi: any,
) => ({
  address,
  encodeDemand: encodeSplitterDemand,
  decodeDemand: decodeSplitterDemand,
  decisionKey: splitterDecisionKey,
  arbitrate: async (fulfillment: `0x${string}`, escrow: `0x${string}`, splits: BundleSplit[]) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "arbitrate",
      args: [fulfillment, escrow, splits],
    }),
  requestArbitration: async (
    fulfillment: `0x${string}`,
    escrow: `0x${string}`,
    oracle: `0x${string}`,
    demand: `0x${string}`,
  ) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "requestArbitration",
      args: [fulfillment, escrow, oracle, demand],
    }),
  createFulfillment: async (
    obligationContract: `0x${string}`,
    data: `0x${string}`,
    expirationTime: bigint,
    refUID: `0x${string}`,
    value = 0n,
  ) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "createFulfillment",
      args: [obligationContract, data, expirationTime, refUID],
      value,
    } as unknown as Parameters<typeof writeContract>[1]),
  collectAndDistribute: async (escrowContract: `0x${string}`, escrow: `0x${string}`, fulfillment: `0x${string}`) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "collectAndDistribute",
      args: [escrowContract, escrow, fulfillment],
    }),
  unsafePartiallyCollectAndDistribute: async (
    escrowContract: `0x${string}`,
    escrow: `0x${string}`,
    fulfillment: `0x${string}`,
  ) =>
    await writeContract(viemClient, {
      address,
      abi,
      functionName: "unsafePartiallyCollectAndDistribute",
      args: [escrowContract, escrow, fulfillment],
    }),
  getSplits: async (oracle: `0x${string}`, fulfillment: `0x${string}`, escrow: `0x${string}`) =>
    await readContract<BundleSplit[]>(viemClient, {
      address,
      abi,
      functionName: "getSplits",
      args: [oracle, fulfillment, escrow],
    }),
  hasDecision: async (oracle: `0x${string}`, fulfillment: `0x${string}`, escrow: `0x${string}`) =>
    await readContract<boolean>(viemClient, {
      address,
      abi,
      functionName: "hasDecision",
      args: [oracle, splitterDecisionKey(fulfillment, escrow)],
    }),
  check: async (fulfillment: Attestation, demand: `0x${string}`, escrow: `0x${string}`) =>
    await readContract<boolean>(viemClient, {
      address,
      abi,
      functionName: "check",
      args: [fulfillment, demand, escrow],
    }),
});

export const makeSplittersClient = (viemClient: ViemClient, addresses: SplitterAddresses) => ({
  encodeDemand: encodeSplitterDemand,
  decodeDemand: decodeSplitterDemand,
  decisionKey: splitterDecisionKey,
  erc20: makeAmountSplitterClient(viemClient, addresses.erc20Splitter, erc20SplitterAbi.abi),
  erc1155: makeAmountSplitterClient(viemClient, addresses.erc1155Splitter, erc1155SplitterAbi.abi),
  nativeToken: makeAmountSplitterClient(viemClient, addresses.nativeTokenSplitter, nativeTokenSplitterAbi.abi),
  tokenBundle: makeBundleSplitterClient(viemClient, addresses.tokenBundleSplitter, tokenBundleSplitterAbi.abi),
  tokenBundleUnvalidated: makeBundleSplitterClient(
    viemClient,
    addresses.tokenBundleSplitterUnvalidated,
    tokenBundleSplitterUnvalidatedAbi.abi,
  ),
});

export type SplittersClient = ReturnType<typeof makeSplittersClient>;
