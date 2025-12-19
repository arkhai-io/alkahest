import { decodeAbiParameters, encodeAbiParameters, getAbiItem, parseAbiParameters, type Address } from "viem";
import { abi as nativeTokenEscrowAbi } from "../../../../contracts/obligations/escrow/tierable/NativeTokenEscrowObligation";
import type { Demand } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../../utils";
import type { NativeTokenAddresses } from "../index";

const nativeEscrowDoObligationFunction = getAbiItem({
  abi: nativeTokenEscrowAbi.abi,
  name: "doObligation",
});

const nativeEscrowObligationDataType = nativeEscrowDoObligationFunction.inputs[0];

export type NativeTokenEscrowObligationData = {
  arbiter: Address;
  demand: `0x${string}`;
  amount: bigint;
};

export type NativeTokenTierableEscrowClient = ReturnType<typeof makeNativeTokenTierableEscrowClient>;

export const makeNativeTokenTierableEscrowClient = (
  viemClient: ViemClient,
  addresses: NativeTokenAddresses,
) => {
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
      return encodeAbiParameters([nativeEscrowObligationDataType], [{
        arbiter: demand.arbiter,
        demand: demand.demand,
        amount,
      }]);
    },

    decodeObligation: (obligationData: `0x${string}`): NativeTokenEscrowObligationData => {
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
      const data: NativeTokenEscrowObligationData = {
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
