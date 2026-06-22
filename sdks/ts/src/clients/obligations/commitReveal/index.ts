import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";

import { abi as commitRevealObligationAbi } from "../../../contracts/obligations/CommitRevealObligation";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { getAttestation, getAttestedEventFromTxHash } from "../../../utils";

const commitRevealDecodeFunction = getAbiItem({
  abi: commitRevealObligationAbi.abi,
  name: "decodeObligationData",
});

const commitRevealDataType = commitRevealDecodeFunction.outputs[0];

const commitRevealDemandDecodeFunction = getAbiItem({
  abi: commitRevealObligationAbi.abi,
  name: "decodeDemandData",
});

const commitRevealDemandType = commitRevealDemandDecodeFunction.outputs[0];

export type CommitRevealObligationData = {
  payload: `0x${string}`;
  salt: `0x${string}`;
  schema: `0x${string}`;
};

export type CommitRevealDemandData = {
  bondAmount: bigint;
};

export type CommitRevealAddresses = {
  eas: `0x${string}`;
  commitRevealObligation: `0x${string}`;
};

export const pickCommitRevealAddresses = (addresses: ChainAddresses): CommitRevealAddresses => ({
  eas: addresses.eas,
  commitRevealObligation: addresses.commitRevealObligation,
});

export type CommitRevealObligationClient = ReturnType<typeof makeCommitRevealObligationClient>;

export const makeCommitRevealObligationClient = (viemClient: ViemClient, addresses: CommitRevealAddresses) => {
  const contractAddress = addresses.commitRevealObligation;
  const abi = commitRevealObligationAbi.abi;

  const decode = (obligationData: `0x${string}`) => {
    return decodeAbiParameters([commitRevealDataType], obligationData)[0];
  };

  const decodeDemand = (demandData: `0x${string}`) => {
    return decodeAbiParameters([commitRevealDemandType], demandData)[0];
  };

  const getSchema = async () =>
    await viemClient.readContract({
      address: contractAddress,
      abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  return {
    address: contractAddress,

    encode: (data: CommitRevealObligationData) => {
      return encodeAbiParameters([commitRevealDataType], [data]);
    },
    decode,

    encodeDemand: (data: CommitRevealDemandData) => {
      return encodeAbiParameters([commitRevealDemandType], [data]);
    },
    decodeDemand,

    doObligation: async (
      data: CommitRevealObligationData,
      refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000",
    ) => {
      const { request } = await viemClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "doObligation",
        args: [data, refUID],
      });

      const hash = await viemClient.writeContract(request);
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    doObligationFor: async (
      data: CommitRevealObligationData,
      recipient: `0x${string}`,
      refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000",
    ) => {
      const { request } = await viemClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "doObligationFor",
        args: [data, recipient, refUID],
      });

      const hash = await viemClient.writeContract(request);
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    doObligationRaw: async (
      data: `0x${string}`,
      expirationTime: bigint = 0n,
      refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000",
      value: bigint = 0n,
    ) => {
      const { request } = await viemClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "doObligationRaw",
        args: [data, expirationTime, refUID],
        value,
      });

      const hash = await viemClient.writeContract(request);
      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    revealAndCollect: async (
      data: CommitRevealObligationData,
      recipient: `0x${string}`,
      escrowContract: `0x${string}`,
      escrowUid: `0x${string}`,
    ) => {
      const { request, result } = await viemClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "revealAndCollect",
        args: [data, recipient, escrowContract, escrowUid],
      });

      const hash = await viemClient.writeContract(request);
      return { hash, result };
    },

    commit: async (commitment: `0x${string}`, bondAmount: bigint) => {
      const { request } = await viemClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "commit",
        args: [commitment],
        value: bondAmount,
      });

      const hash = await viemClient.writeContract(request);
      return { hash };
    },

    computeCommitment: async (
      refUID: `0x${string}`,
      claimer: `0x${string}`,
      data: CommitRevealObligationData,
    ) => {
      return await viemClient.readContract({
        address: contractAddress,
        abi,
        functionName: "computeCommitment",
        args: [refUID, claimer, data],
      });
    },

    slashBond: async (commitment: `0x${string}`) => {
      const { request } = await viemClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "slashBond",
        args: [commitment],
      });

      const hash = await viemClient.writeContract(request);
      return { hash };
    },

    getCommitDeadline: async () =>
      await viemClient.readContract({
        address: contractAddress,
        abi,
        functionName: "commitDeadline",
      }),

    getSlashedBondRecipient: async () =>
      await viemClient.readContract({
        address: contractAddress,
        abi,
        functionName: "slashedBondRecipient",
      }),

    getCommitment: async (commitment: `0x${string}`) =>
      await viemClient.readContract({
        address: contractAddress,
        abi,
        functionName: "commitments",
        args: [commitment],
      }),

    isCommitmentClaimed: async (commitment: `0x${string}`) =>
      await viemClient.readContract({
        address: contractAddress,
        abi,
        functionName: "commitmentClaimed",
        args: [commitment],
      }),

    getSchema,

    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid, addresses), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([commitRevealDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },
  };
};
