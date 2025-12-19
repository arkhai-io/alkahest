import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc1155PaymentAbi } from "../../../contracts/obligations/payment/ERC1155PaymentObligation";
import type { Erc1155 } from "../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../utils";
import type { Erc1155Addresses } from "./index";
import { makeErc1155UtilClient } from "./util";

const erc1155PaymentDecodeFunction = getAbiItem({
  abi: erc1155PaymentAbi.abi,
  name: "decodeObligationData",
});

const erc1155PaymentObligationDataType = erc1155PaymentDecodeFunction.outputs[0];

export type Erc1155PaymentClient = ReturnType<typeof makeErc1155PaymentClient>;

export const makeErc1155PaymentClient = (
  viemClient: ViemClient,
  addresses: Erc1155Addresses,
) => {
  const util = makeErc1155UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.paymentObligation,
      abi: erc1155PaymentAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.paymentObligation,
    getSchema,

    encodeObligationRaw: (data: { token: `0x${string}`; tokenId: bigint; amount: bigint; payee: `0x${string}` }) => {
      return encodeAbiParameters([erc1155PaymentObligationDataType], [data]);
    },

    encodeObligation: (token: Erc1155, payee: `0x${string}`) => {
      return encodeAbiParameters([erc1155PaymentObligationDataType], [{
        token: token.address,
        tokenId: token.id,
        amount: token.value,
        payee,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc1155PaymentObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc1155PaymentObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    pay: async (price: Erc1155, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: erc1155PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            amount: price.value,
            payee,
          },
          refUID,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    approveAndPay: async (price: Erc1155, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      await util.approveAll(price.address, "payment");
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: erc1155PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            tokenId: price.id,
            amount: price.value,
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
