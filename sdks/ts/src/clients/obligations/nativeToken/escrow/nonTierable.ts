import { decodeAbiParameters, encodeAbiParameters, getAbiItem, parseAbiParameters, type Address } from "viem";
import { abi as nativeTokenEscrowAbi } from "../../../../contracts/obligations/escrow/non-tierable/NativeTokenEscrowObligation";
import type { Demand } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../../utils";
import type { NativeTokenAddresses } from "../index";

const nativeEscrowDoObligationFunction = getAbiItem({
  abi: nativeTokenEscrowAbi.abi,
  name: "doObligation",
});

const nativeEscrowObligationDataType = nativeEscrowDoObligationFunction.inputs[0];

/**
 * NativeToken Non-Tierable Escrow ObligationData type
 */
export type NativeTokenNonTierableEscrowObligationData = {
  arbiter: Address;
  demand: `0x${string}`;
  amount: bigint;
};

/**
 * Encodes NativeTokenNonTierableEscrowObligation.ObligationData to bytes.
 * @param data - struct ObligationData {address arbiter, bytes demand, uint256 amount}
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: NativeTokenNonTierableEscrowObligationData): `0x${string}` => {
  return encodeAbiParameters([nativeEscrowObligationDataType], [data]);
};

/**
 * Decodes NativeTokenNonTierableEscrowObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): NativeTokenNonTierableEscrowObligationData => {
  const [arbiter, demand, amount] = decodeAbiParameters(
    parseAbiParameters("address, bytes, uint256"),
    obligationData
  );
  return {
    arbiter: arbiter as Address,
    demand: demand as `0x${string}`,
    amount: amount as bigint,
  };
};

export type NativeTokenNonTierableEscrowClient = ReturnType<typeof makeNativeTokenNonTierableEscrowClient>;

export const makeNativeTokenNonTierableEscrowClient = (
  viemClient: ViemClient,
  addresses: NativeTokenAddresses,
) => {
  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligation,
      abi: nativeTokenEscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligation,
    getSchema,

    encodeObligationRaw: (data: { arbiter: `0x${string}`; demand: `0x${string}`; amount: bigint }) => {
      return encodeAbiParameters([nativeEscrowObligationDataType], [data]);
    },

    encodeObligation: (amount: bigint, demand: Demand) => {
      return encodeAbiParameters([nativeEscrowObligationDataType], [{
        arbiter: demand.arbiter,
        demand: demand.demand,
        amount,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`): NativeTokenNonTierableEscrowObligationData => {
      const [arbiter, demand, amount] = decodeAbiParameters(
        parseAbiParameters("address, bytes, uint256"),
        obligationData
      );
      return {
        arbiter: arbiter as Address,
        demand: demand as `0x${string}`,
        amount: amount as bigint,
      };
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const [arbiter, demand, amount] = decodeAbiParameters(
        parseAbiParameters("address, bytes, uint256"),
        attestation.data
      );
      const data: NativeTokenNonTierableEscrowObligationData = {
        arbiter: arbiter as Address,
        demand: demand as `0x${string}`,
        amount: amount as bigint,
      };

      return {
        ...attestation,
        data,
      };
    },

    create: async (amount: bigint, item: Demand, expiration: bigint = 0n) => {
      const { request } = await viemClient.simulateContract({
        address: addresses.escrowObligation,
        abi: nativeTokenEscrowAbi.abi,
        functionName: "doObligation",
        args: [{ arbiter: item.arbiter, demand: item.demand, amount }, expiration],
        value: amount,
      });

      const hash = await viemClient.writeContract(request);
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    createFor: async (amount: bigint, item: Demand, recipient: `0x${string}`, expiration: bigint = 0n) => {
      const { request } = await viemClient.simulateContract({
        address: addresses.escrowObligation,
        abi: nativeTokenEscrowAbi.abi,
        functionName: "doObligationFor",
        args: [{ arbiter: item.arbiter, demand: item.demand, amount }, expiration, recipient],
        value: amount,
      });

      const hash = await viemClient.writeContract(request);
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    collect: async (buyAttestation: `0x${string}`, fulfillment: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: nativeTokenEscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: nativeTokenEscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },
  };
};
