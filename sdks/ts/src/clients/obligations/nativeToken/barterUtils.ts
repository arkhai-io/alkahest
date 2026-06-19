import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as nativeTokenEscrowAbi } from "../../../contracts/obligations/escrow/default/NativeTokenEscrowObligation";
import { abi as nativeTokenBarterUtilsAbi } from "../../../contracts/utils/NativeTokenBarterUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { NativeTokenAddresses } from "./index";

const nativeEscrowDecodeFunction = getAbiItem({
  abi: nativeTokenEscrowAbi.abi,
  name: "decodeObligationData",
});

const nativeEscrowObligationDataType = nativeEscrowDecodeFunction.outputs[0];

export type NativeTokenBarterUtilsClient = ReturnType<typeof makeNativeTokenBarterUtilsClient>;

export const makeNativeTokenBarterUtilsClient = (viemClient: ViemClient, addresses: NativeTokenAddresses) => {
  return {
    address: addresses.barterUtils,

    // =========================================================================
    // Native Token for Native Token
    // =========================================================================

    payNativeForNative: async (buyAttestation: `0x${string}`) => {
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });

      const escrowData = decodeAbiParameters([nativeEscrowObligationDataType], buyAttestationData.data)[0];

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
        address: addresses.barterUtils,
        abi: nativeTokenBarterUtilsAbi.abi,
        functionName: "payEthForEth",
        args: [buyAttestation],
        value: demandData.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // Native Token for ERC20
    // =========================================================================

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
