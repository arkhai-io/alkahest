import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as erc20EscrowAbi } from "../../../../contracts/obligations/escrow/default/ERC20EscrowObligation";
import type { Demand, Erc20 } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../../utils";
import type { Erc20Addresses } from "../index";
import { makeErc20UtilClient } from "../util";

const erc20EscrowDoObligationFunction = getAbiItem({
  abi: erc20EscrowAbi.abi,
  name: "doObligation",
});

const erc20EscrowObligationDataType = erc20EscrowDoObligationFunction.inputs[0];

/**
 * ERC20 Default Escrow ObligationData type
 */
export type Erc20DefaultEscrowObligationData = {
  token: `0x${string}`;
  amount: bigint;
  arbiter: `0x${string}`;
  demand: `0x${string}`;
};

/**
 * Encodes ERC20DefaultEscrowObligation.ObligationData to bytes.
 * @param data - struct ObligationData {address token, uint256 amount, address arbiter, bytes demand}
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: Erc20DefaultEscrowObligationData): `0x${string}` => {
  return encodeAbiParameters([erc20EscrowObligationDataType], [data]);
};

/**
 * Decodes ERC20DefaultEscrowObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): Erc20DefaultEscrowObligationData => {
  return decodeAbiParameters(
    [erc20EscrowObligationDataType],
    obligationData,
  )[0] as Erc20DefaultEscrowObligationData;
};

export type Erc20DefaultEscrowClient = ReturnType<typeof makeErc20DefaultEscrowClient>;

export const makeErc20DefaultEscrowClient = (viemClient: ViemClient, addresses: Erc20Addresses) => {
  const util = makeErc20UtilClient(viemClient, addresses);

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligation,
      abi: erc20EscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligation,
    getSchema,

    encodeObligationRaw: (data: {
      arbiter: `0x${string}`;
      demand: `0x${string}`;
      token: `0x${string}`;
      amount: bigint;
    }) => {
      return encodeAbiParameters([erc20EscrowObligationDataType], [data]);
    },

    encodeObligation: (token: Erc20, demand: Demand) => {
      return encodeAbiParameters(
        [erc20EscrowObligationDataType],
        [
          {
            arbiter: demand.arbiter,
            demand: demand.demand,
            token: token.address,
            amount: token.value,
          },
        ],
      );
    },

    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([erc20EscrowObligationDataType], obligationData)[0];
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid, addresses), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([erc20EscrowObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    create: async (price: Erc20, item: Demand, expiration: bigint) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            amount: price.value,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    approveAndCreate: async (price: Erc20, item: Demand, expiration: bigint) => {
      await util.approve(price, "escrow");
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            amount: price.value,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    permitAndCreate: async (price: Erc20, item: Demand, expiration: bigint) => {
      await util.approve(price, "escrow");
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            token: price.address,
            amount: price.value,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    collect: async (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => {
      let hash: `0x${string}`;
      try {
        const { request } = await viemClient.simulateContract({
          address: addresses.escrowObligation,
          abi: erc20EscrowAbi.abi,
          functionName: "collect",
          args: [buyAttestation, fulfillment],
        });
        hash = await viemClient.writeContract(request);
      } catch (error) {
        throw new Error(`Failed to collect payment for ${buyAttestation} with fulfillment ${fulfillment}: ${error}`);
      }
      return hash;
    },

    reclaim: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: erc20EscrowAbi.abi,
        functionName: "reclaim",
        args: [buyAttestation],
      });
      return hash;
    },
  };
};
