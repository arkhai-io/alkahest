import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as tokenBundlePaymentAbi } from "../../../contracts/obligations/payment/TokenBundlePaymentObligation";
import type { Demand, TokenBundle } from "../../../types";
import { flattenTokenBundle, getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../utils";
import type { TokenBundleAddresses } from "./index";
import { makeTokenBundleUtilClient } from "./util";

const tokenBundlePaymentDecodeFunction = getAbiItem({
  abi: tokenBundlePaymentAbi.abi,
  name: "decodeObligationData",
});

const tokenBundlePaymentObligationDataType = tokenBundlePaymentDecodeFunction.outputs[0];

/**
 * TokenBundle Payment ObligationData type
 */
export type TokenBundlePaymentObligationData = {
  nativeAmount: bigint;
  erc20Tokens: readonly `0x${string}`[];
  erc20Amounts: readonly bigint[];
  erc721Tokens: readonly `0x${string}`[];
  erc721TokenIds: readonly bigint[];
  erc1155Tokens: readonly `0x${string}`[];
  erc1155TokenIds: readonly bigint[];
  erc1155Amounts: readonly bigint[];
  payee: `0x${string}`;
};

/**
 * Encodes TokenBundlePaymentObligation.ObligationData to bytes.
 * @param data - ObligationData struct
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: TokenBundlePaymentObligationData): `0x${string}` => {
  return encodeAbiParameters([tokenBundlePaymentObligationDataType], [data]);
};

/**
 * Decodes TokenBundlePaymentObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): TokenBundlePaymentObligationData => {
  return decodeAbiParameters([tokenBundlePaymentObligationDataType], obligationData)[0] as TokenBundlePaymentObligationData;
};

export type TokenBundlePaymentClient = ReturnType<typeof makeTokenBundlePaymentClient>;

export const makeTokenBundlePaymentClient = (
  viemClient: ViemClient,
  addresses: TokenBundleAddresses,
) => {
  const util = makeTokenBundleUtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.paymentObligation,
      abi: tokenBundlePaymentAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.paymentObligation,
    getSchema,

    encodeObligationRaw: (data: {
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
    },

    encodeObligation: (bundle: TokenBundle, payee: `0x${string}`) => {
      const flatBundle = flattenTokenBundle(bundle);
      return encodeAbiParameters([tokenBundlePaymentObligationDataType], [{
        ...flatBundle,
        payee,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([tokenBundlePaymentObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([tokenBundlePaymentObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    pay: async (price: TokenBundle, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: tokenBundlePaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            ...flattenTokenBundle(price),
            payee,
          },
          refUID,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    approveAndPay: async (price: TokenBundle, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      await util.approve(price, "payment");
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: tokenBundlePaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            ...flattenTokenBundle(price),
            payee,
          },
          refUID,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
