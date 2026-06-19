import { decodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as tokenBundleEscrowAbi } from "../../../contracts/obligations/escrow/default/TokenBundleEscrowObligation";
import { abi as nativeTokenBarterUtilsAbi } from "../../../contracts/utils/NativeTokenBarterUtils";
import { abi as tokenBundleBarterUtilsAbi } from "../../../contracts/utils/TokenBundleBarterUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { TokenBundleAddresses } from "./index";

const tokenBundleEscrowDecodeFunction = getAbiItem({
  abi: tokenBundleEscrowAbi.abi,
  name: "decodeObligationData",
});

const tokenBundleEscrowObligationDataType = tokenBundleEscrowDecodeFunction.outputs[0];

export type TokenBundleBarterUtilsClient = ReturnType<typeof makeTokenBundleBarterUtilsClient>;

export const makeTokenBundleBarterUtilsClient = (viemClient: ViemClient, addresses: TokenBundleAddresses) => {
  return {
    address: addresses.barterUtils,

    // =========================================================================
    // Bundle for Bundle
    // =========================================================================

    payBundleForBundle: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: tokenBundleBarterUtilsAbi.abi,
        functionName: "payBundleForBundle",
        args: [buyAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    // =========================================================================
    // Native Token Functions
    // =========================================================================

    payNativeForBundle: async (buyAttestation: `0x${string}`) => {
      const buyAttestationData = await viemClient.readContract({
        address: addresses.eas,
        abi: easAbi.abi,
        functionName: "getAttestation",
        args: [buyAttestation],
        authorizationList: undefined,
      });

      const escrowData = decodeAbiParameters([tokenBundleEscrowObligationDataType], buyAttestationData.data)[0];

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
