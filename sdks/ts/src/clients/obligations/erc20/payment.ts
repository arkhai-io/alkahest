import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc20PaymentAbi } from "../../../contracts/obligations/payment/ERC20PaymentObligation";
import { abi as erc20BarterUtilsAbi } from "../../../contracts/utils/ERC20BarterUtils";
import type { Erc20 } from "../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../utils";
import type { Erc20Addresses } from "./index";
import { makeErc20UtilClient } from "./util";

const erc20PaymentDoObligationFunction = getAbiItem({
  abi: erc20PaymentAbi.abi,
  name: "doObligation",
});

const erc20PaymentObligationDataType = erc20PaymentDoObligationFunction.inputs[0];

/**
 * ERC20 Payment ObligationData type
 */
export type Erc20PaymentObligationData = {
  token: `0x${string}`;
  amount: bigint;
  payee: `0x${string}`;
};

/**
 * Encodes ERC20PaymentObligation.ObligationData to bytes.
 * @param data - struct ObligationData {address token, uint256 amount, address payee}
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: Erc20PaymentObligationData): `0x${string}` => {
  return encodeAbiParameters([erc20PaymentObligationDataType], [data]);
};

/**
 * Decodes ERC20PaymentObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): Erc20PaymentObligationData => {
  return decodeAbiParameters([erc20PaymentObligationDataType], obligationData)[0] as Erc20PaymentObligationData;
};

export type Erc20PaymentClient = ReturnType<typeof makeErc20PaymentClient>;

export const makeErc20PaymentClient = (
  viemClient: ViemClient,
  addresses: Erc20Addresses,
) => {
  const util = makeErc20UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.paymentObligation,
      abi: erc20PaymentAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.paymentObligation,
    getSchema,

    encodeObligationRaw: (data: { token: `0x${string}`; amount: bigint; payee: `0x${string}` }) => {
      return encodeAbiParameters([erc20PaymentObligationDataType], [data]);
    },

    encodeObligation: (token: Erc20, payee: `0x${string}`) => {
      return encodeAbiParameters([erc20PaymentObligationDataType], [{
        token: token.address,
        amount: token.value,
        payee,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc20PaymentObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc20PaymentObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    pay: async (price: Erc20, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: erc20PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            amount: price.value,
            payee,
          },
          refUID,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    approveAndPay: async (price: Erc20, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      await util.approve(price, "payment");
      const hash = await writeContract(viemClient, {
        address: addresses.paymentObligation,
        abi: erc20PaymentAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            amount: price.value,
            payee,
          },
          refUID,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndPay: async (price: Erc20, payee: `0x${string}`, refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000") => {
      const deadline = util.getPermitDeadline();
      const permit = await util.getPermitSignature(addresses.barterUtils, price, deadline);

      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: erc20BarterUtilsAbi.abi,
        functionName: "permitAndPayWithErc20",
        args: [price.address, price.value, payee, refUID, deadline, permit.v, permit.r, permit.s],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
