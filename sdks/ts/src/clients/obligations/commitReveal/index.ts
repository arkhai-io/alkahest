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

export type CommitRevealObligationData = {
  payload: `0x${string}`;
  salt: `0x${string}`;
  schema: `0x${string}`;
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

  const getSchema = async () =>
    await viemClient.readContract({
      address: contractAddress,
      abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  const getBondAmount = async () =>
    await viemClient.readContract({
      address: contractAddress,
      abi,
      functionName: "bondAmount",
    });

  return {
    address: contractAddress,

    encode: (data: CommitRevealObligationData) => {
      return encodeAbiParameters([commitRevealDataType], [data]);
    },
    decode,

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

    commit: async (commitment: `0x${string}`) => {
      const bondAmount = await getBondAmount();

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

    reclaimBond: async (obligationUid: `0x${string}`) => {
      const { request } = await viemClient.simulateContract({
        address: contractAddress,
        abi,
        functionName: "reclaimBond",
        args: [obligationUid],
      });

      const hash = await viemClient.writeContract(request);
      return { hash };
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

    getBondAmount,

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
