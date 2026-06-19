import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as erc1155EscrowAbi } from "../../../contracts/obligations/escrow/default/ERC1155EscrowObligation";
import { abi as erc1155BarterUtilsAbi } from "../../../contracts/utils/ERC1155BarterUtils";
import { abi as nativeTokenBarterUtilsAbi } from "../../../contracts/utils/NativeTokenBarterUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { Erc1155Addresses } from "./index";

const erc1155EscrowDecodeFunction = getAbiItem({
  abi: erc1155EscrowAbi.abi,
  name: "decodeObligationData",
});

const erc1155EscrowObligationDataType = erc1155EscrowDecodeFunction.outputs[0];

export type Erc1155BarterUtilsClient = ReturnType<typeof makeErc1155BarterUtilsClient>;

export const makeErc1155BarterUtilsClient = (viemClient: ViemClient, addresses: Erc1155Addresses) => {
  return {
    address: addresses.barterUtils,

    // =========================================================================
    // ERC1155 for ERC1155
    // =========================================================================

    payErc1155ForErc1155: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForErc1155",
        args: [buyAttestation],
      });

      return { hash };
    },

    // =========================================================================
    // ERC1155 for ERC20
    // =========================================================================

    payErc1155ForErc20: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForErc20",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC1155 for ERC721
    // =========================================================================

    payErc1155ForErc721: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForErc721",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // ERC1155 for Token Bundle
    // =========================================================================

    payErc1155ForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // Native Token Functions
    // =========================================================================

    payNativeForErc1155: async (buyAttestation: `0x${string}`) => {
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });

      const escrowData = decodeAbiParameters([erc1155EscrowObligationDataType], buyAttestationData.data)[0];

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
        functionName: "payEthForErc1155",
        args: [buyAttestation],
        value: demandData.amount,
        chain: viemClient.chain,
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    payErc1155ForNative: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc1155BarterUtilsAbi.abi,
        functionName: "payErc1155ForEth",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
