import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as erc721EscrowAbi } from "../../../contracts/obligations/escrow/non-tierable/ERC721EscrowObligation";
import { abi as erc721BarterUtilsAbi } from "../../../contracts/utils/ERC721BarterUtils";
import { abi as nativeTokenBarterUtilsAbi } from "../../../contracts/utils/NativeTokenBarterUtils";
import type { Erc20, Erc721, Erc1155, TokenBundle } from "../../../types";
import { flattenTokenBundle, getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { Erc721Addresses } from "./index";
import { makeErc721UtilClient } from "./util";

const erc721EscrowDecodeFunction = getAbiItem({
  abi: erc721EscrowAbi.abi,
  name: "decodeObligationData",
});

const erc721EscrowObligationDataType = erc721EscrowDecodeFunction.outputs[0];

export type Erc721BarterUtilsClient = ReturnType<typeof makeErc721BarterUtilsClient>;

export const makeErc721BarterUtilsClient = (viemClient: ViemClient, addresses: Erc721Addresses) => {
  const util = makeErc721UtilClient(viemClient, addresses);

  return {
    address: addresses.barterUtils,

    // =========================================================================
    // ERC721 for ERC721
    // =========================================================================

    buyErc721ForErc721: async (bid: Erc721, ask: Erc721, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyErc721ForErc721",
        args: [bid.address, bid.id, ask.address, ask.id, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payErc721ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForErc721",
        args: [buyAttestation],
      });

      return { hash };
    },

    // =========================================================================
    // ERC721 for ERC20
    // =========================================================================

    buyErc20WithErc721: async (bid: Erc721, ask: Erc20, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyErc20WithErc721",
        args: [bid.address, bid.id, ask.address, ask.value, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payErc721ForErc20: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForErc20",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC721 for ERC1155
    // =========================================================================

    buyErc1155WithErc721: async (bid: Erc721, ask: Erc1155, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyErc1155WithErc721",
        args: [bid.address, bid.id, ask.address, ask.id, ask.value, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payErc721ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForErc1155",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC721 for Token Bundle
    // =========================================================================

    buyBundleWithErc721: async (bid: Erc721, bundle: TokenBundle, payee: `0x${string}`, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "buyBundleWithErc721",
        args: [bid.address, bid.id, { ...flattenTokenBundle(bundle), payee }, expiration],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payErc721ForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // Native Token Functions
    // =========================================================================

    buyErc721WithNative: async (bidAmount: bigint, ask: Erc721, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.nativeTokenBarterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "buyErc721WithEth",
        args: [bidAmount, ask.address, ask.id, expiration],
        value: bidAmount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payNativeForErc721: async (buyAttestation: `0x${string}`) => {
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });

      const escrowData = decodeAbiParameters([erc721EscrowObligationDataType], buyAttestationData.data)[0];

      const demandData = decodeAbiParameters(
        [
          {
            type: "tuple",
            components: [
              { type: "uint256", name: "amount" },
              { type: "address", name: "payee" },
            ],
          },
        ],
        escrowData.demand,
      )[0];

      const hash = await viemClient.writeContract({
        address: addresses.nativeTokenBarterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "payEthForErc721",
        args: [buyAttestation],
        value: demandData.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payErc721ForNative: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc721BarterUtilsAbi.abi,
        functionName: "payErc721ForEth",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
