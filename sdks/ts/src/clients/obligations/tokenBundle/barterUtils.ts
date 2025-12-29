import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as easAbi } from "../../../contracts/IEAS";
import { abi as tokenBundleEscrowAbi } from "../../../contracts/obligations/escrow/non-tierable/TokenBundleEscrowObligation";
import { abi as tokenBundlePaymentAbi } from "../../../contracts/obligations/payment/TokenBundlePaymentObligation";
import { abi as nativeTokenBarterUtilsAbi } from "../../../contracts/utils/NativeTokenBarterUtils";
import { abi as tokenBundleBarterUtilsAbi } from "../../../contracts/utils/TokenBundleBarterUtils";
import type { TokenBundle } from "../../../types";
import { flattenTokenBundle, getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { TokenBundleAddresses } from "./index";

const tokenBundleEscrowDecodeFunction = getAbiItem({
  abi: tokenBundleEscrowAbi.abi,
  name: "decodeObligationData",
});
const tokenBundlePaymentDecodeFunction = getAbiItem({
  abi: tokenBundlePaymentAbi.abi,
  name: "decodeObligationData",
});

const tokenBundleEscrowObligationDataType = tokenBundleEscrowDecodeFunction.outputs[0];
const tokenBundlePaymentObligationDataType = tokenBundlePaymentDecodeFunction.outputs[0];

export type TokenBundleBarterUtilsClient = ReturnType<typeof makeTokenBundleBarterUtilsClient>;

export const makeTokenBundleBarterUtilsClient = (viemClient: ViemClient, addresses: TokenBundleAddresses) => {
  const encodePaymentObligationRaw = (data: {
    nativeAmount: bigint;
    erc20Tokens: `0x${string}`[];
    erc20Amounts: bigint[];
    erc721Tokens: `0x${string}`[];
    erc721TokenIds: bigint[];
    erc1155Tokens: `0x${string}`[];
    erc1155TokenIds: bigint[];
    erc1155Amounts: bigint[];
    payee: `0x${string}`;
  }) => {
    return encodeAbiParameters([tokenBundlePaymentObligationDataType], [data]);
  };

  return {
    address: addresses.barterUtils,

    // =========================================================================
    // Bundle for Bundle
    // =========================================================================

    buyBundleForBundle: async (bid: TokenBundle, ask: TokenBundle, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: tokenBundleBarterUtilsAbi.abi,
        functionName: "buyBundleForBundle",
        args: [
          {
            ...flattenTokenBundle(bid),
            arbiter: addresses.paymentObligation,
            demand: encodePaymentObligationRaw({
              ...flattenTokenBundle(ask),
              payee: viemClient.account.address,
            }),
            nativeAmount: 0n,
          },
          { ...flattenTokenBundle(ask), payee: viemClient.account.address, nativeAmount: 0n },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

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

    buyBundleWithNative: async (bidAmount: bigint, ask: TokenBundle, payee: `0x${string}`, expiration: bigint) => {
      const hash = await viemClient.writeContract({
        address: addresses.nativeTokenBarterUtils,
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
