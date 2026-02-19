import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as nativeTokenEscrowAbi } from "../../../../contracts/obligations/escrow/tierable/NativeTokenEscrowObligation";
import type { Demand } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../../utils";
import type { NativeTokenAddresses } from "../index";

const nativeEscrowDoObligationFunction = getAbiItem({
  abi: nativeTokenEscrowAbi.abi,
  name: "doObligation",
});

const nativeEscrowObligationDataType = nativeEscrowDoObligationFunction.inputs[0];

/**
 * NativeToken Tierable Escrow ObligationData type
 */
export type NativeTokenTierableEscrowObligationData = {
  arbiter: Address;
  demand: `0x${string}`;
  amount: bigint;
};

/**
 * Encodes NativeTokenTierableEscrowObligation.ObligationData to bytes.
 * @param data - struct ObligationData {address arbiter, bytes demand, uint256 amount}
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: NativeTokenTierableEscrowObligationData): `0x${string}` => {
  return encodeAbiParameters([nativeEscrowObligationDataType], [data]);
};

/**
 * Decodes NativeTokenTierableEscrowObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): NativeTokenTierableEscrowObligationData => {
  return decodeAbiParameters(
    [nativeEscrowObligationDataType],
    obligationData,
  )[0] as NativeTokenTierableEscrowObligationData;
};

export type NativeTokenTierableEscrowClient = ReturnType<typeof makeNativeTokenTierableEscrowClient>;

export const makeNativeTokenTierableEscrowClient = (viemClient: ViemClient, addresses: NativeTokenAddresses) => {
  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligationTierable,
      abi: nativeTokenEscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligationTierable,
    getSchema,

    encodeObligationRaw: (data: { arbiter: `0x${string}`; demand: `0x${string}`; amount: bigint }) => {
      return encodeAbiParameters([nativeEscrowObligationDataType], [data]);
    },

    encodeObligation: (amount: bigint, demand: Demand) => {
      return encodeAbiParameters(
        [nativeEscrowObligationDataType],
        [
          {
            arbiter: demand.arbiter,
            demand: demand.demand,
            amount,
          },
        ],
      );
    },

    decodeObligation: (obligationData: `0x${string}`): NativeTokenTierableEscrowObligationData => {
      return decodeAbiParameters(
        [nativeEscrowObligationDataType],
        obligationData,
      )[0] as NativeTokenTierableEscrowObligationData;
    },

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid, addresses), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters(
        [nativeEscrowObligationDataType],
        attestation.data,
      )[0] as NativeTokenTierableEscrowObligationData;

      return {
        ...attestation,
        data,
      };
    },

    create: async (amount: bigint, item: Demand, expiration: bigint = 0n) => {
      const { request } = await viemClient.simulateContract({
        address: addresses.escrowObligationTierable,
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
        address: addresses.escrowObligationTierable,
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
        address: addresses.escrowObligationTierable,
        abi: nativeTokenEscrowAbi.abi,
        functionName: "collectEscrow",
        args: [buyAttestation, fulfillment],
      });
      return hash;
    },

    reclaimExpired: async (buyAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligationTierable,
        abi: nativeTokenEscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [buyAttestation],
      });
      return hash;
    },
  };
};
