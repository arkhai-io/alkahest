import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as nativeTokenBarterUtilsAbi } from "../../../contracts/utils/NativeTokenBarterUtils";
import { abi as nativeTokenEscrowAbi } from "../../../contracts/obligations/escrow/non-tierable/NativeTokenEscrowObligation";
import { abi as easAbi } from "../../../contracts/IEAS";
import type { Erc20, Erc721, Erc1155, TokenBundle } from "../../../types";
import { flattenTokenBundle, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../utils";
import type { NativeTokenAddresses } from "./index";

const nativeEscrowDecodeFunction = getAbiItem({
  abi: nativeTokenEscrowAbi.abi,
  name: "decodeObligationData",
});

const nativeEscrowObligationDataType = nativeEscrowDecodeFunction.outputs[0];

export type NativeTokenBarterUtilsClient = ReturnType<typeof makeNativeTokenBarterUtilsClient>;

export const makeNativeTokenBarterUtilsClient = (
  viemClient: ViemClient,
  addresses: NativeTokenAddresses,
) => {
  return {
    address: addresses.barterUtils,

    // =========================================================================
    // Native Token for ERC20
    // =========================================================================

    buyErc20WithNative: async (bidAmount: bigint, ask: Erc20, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "buyErc20WithEth",
        args: [bidAmount, ask.address, ask.value, expiration],
        value: bidAmount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payNativeForErc20: async (buyAttestation: `0x${string}`) => {
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });

      const escrowData = decodeAbiParameters([nativeEscrowObligationDataType], buyAttestationData.data)[0];

      const demandData = decodeAbiParameters(
        [{ type: "tuple", components: [
          { type: "uint256", name: "amount" },
          { type: "address", name: "payee" }
        ]}],
        escrowData.demand,
      )[0];

      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "payEthForErc20",
        args: [buyAttestation],
        value: demandData.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // Native Token for ERC721
    // =========================================================================

    buyErc721WithNative: async (bidAmount: bigint, ask: Erc721, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
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

      const escrowData = decodeAbiParameters([nativeEscrowObligationDataType], buyAttestationData.data)[0];

      const demandData = decodeAbiParameters(
        [{ type: "tuple", components: [
          { type: "uint256", name: "amount" },
          { type: "address", name: "payee" }
        ]}],
        escrowData.demand,
      )[0];

      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "payEthForErc721",
        args: [buyAttestation],
        value: demandData.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // Native Token for ERC1155
    // =========================================================================

    buyErc1155WithNative: async (bidAmount: bigint, ask: Erc1155, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "buyErc1155WithEth",
        args: [bidAmount, ask.address, ask.id, ask.value, expiration],
        value: bidAmount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payNativeForErc1155: async (buyAttestation: `0x${string}`) => {
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });

      const escrowData = decodeAbiParameters([nativeEscrowObligationDataType], buyAttestationData.data)[0];

      const demandData = decodeAbiParameters(
        [{ type: "tuple", components: [
          { type: "uint256", name: "amount" },
          { type: "address", name: "payee" }
        ]}],
        escrowData.demand,
      )[0];

      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "payEthForErc1155",
        args: [buyAttestation],
        value: demandData.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // Native Token for Token Bundle
    // =========================================================================

    buyBundleWithNative: async (bidAmount: bigint, ask: TokenBundle, payee: `0x${string}`, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "buyBundleWithEth",
        args: [bidAmount, { ...flattenTokenBundle(ask), payee }, expiration],
        value: bidAmount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payNativeForBundle: async (buyAttestation: `0x${string}`) => {
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });

      const escrowData = decodeAbiParameters([nativeEscrowObligationDataType], buyAttestationData.data)[0];

      const demandData = decodeAbiParameters(
        [{ type: "tuple", components: [
          { type: "uint256", name: "amount" },
          { type: "address", name: "payee" }
        ]}],
        escrowData.demand,
      )[0];

      const hash = await viemClient.writeContract({
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "payEthForBundle",
        args: [buyAttestation],
        value: demandData.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
