import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc721PaymentAbi } from "../../../contracts/obligations/payment/ERC721PaymentObligation";
import type { Erc721 } from "../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../utils";
import type { Erc721Addresses } from "./index";
import { makeErc721UtilClient } from "./util";

const erc721PaymentDecodeFunction = getAbiItem({
  abi: erc721PaymentAbi.abi,
  name: "decodeObligationData",
});

const erc721PaymentObligationDataType = erc721PaymentDecodeFunction.outputs[0];

export type Erc721PaymentClient = ReturnType<typeof makeErc721PaymentClient>;

export const makeErc721PaymentClient = (
  viemClient: ViemClient,
  addresses: Erc721Addresses,
) => {
  const util = makeErc721UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.paymentObligation,
      abi: erc721PaymentAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.paymentObligation,
    getSchema,

    encodeObligationRaw: (data: { token: `0x${string}`; tokenId: bigint; payee: `0x${string}` }) => {
      return encodeAbiParameters([erc721PaymentObligationDataType], [data]);
    },

    encodeObligation: (token: Erc721, payee: `0x${string}`) => {
      return encodeAbiParameters([erc721PaymentObligationDataType], [{
        token: token.address,
        tokenId: token.id,
        payee,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc721PaymentObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc721PaymentObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    pay: async (price: Erc721, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: erc721PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            payee,
          },
          refUID,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    approveAndPay: async (price: Erc721, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      await util.approve(price, "payment");
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: erc721PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
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
