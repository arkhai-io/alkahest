import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as attestationEscrowAbi } from "../../../../contracts/obligations/escrow/non-tierable/AttestationEscrowObligation";
import type { Demand } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../../utils";
import type { AttestationAddresses } from "../index";

const escrowObligationDecodeFunction = getAbiItem({
  abi: attestationEscrowAbi.abi,
  name: "decodeObligationData",
});

const escrowObligationDataType = escrowObligationDecodeFunction.outputs[0];

export type AttestationEscrowV1Client = ReturnType<typeof makeAttestationEscrowV1Client>;

export const makeAttestationEscrowV1Client = (
  viemClient: ViemClient,
  addresses: AttestationAddresses,
) => {
  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligation,
      abi: attestationEscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligation,
    getSchema,

    /**
     * Encodes AttestationEscrowObligation.ObligationData to bytes.
     * @param data - ObligationData object to encode
     * @returns the abi encoded ObligationData as bytes
     */
    encodeObligation: (data: {
      attestation: {
        schema: `0x${string}`;
        data: {
          recipient: `0x${string}`;
          expirationTime: bigint;
          revocable: boolean;
          refUID: `0x${string}`;
          data: `0x${string}`;
          value: bigint;
        };
      };
      arbiter: `0x${string}`;
      demand: `0x${string}`;
    }) => {
      return encodeAbiParameters([escrowObligationDataType], [data]);
    },

    /**
     * Decodes AttestationEscrowObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([escrowObligationDataType], obligationData)[0];
    },

    /**
     * Gets a complete obligation from its attestation UID, combining attestation metadata with decoded obligation data
     * @param uid - UID of the attestation
     * @returns The complete obligation including attestation metadata and decoded obligation data
     */
    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([escrowObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    /**
     * Creates an escrow using an attestation as the escrowed item.
     * This function uses the original AttestationEscrowObligation contract where the full attestation
     * data is stored in the escrow obligation. When collecting payment, this contract creates a new
     * attestation as the collection event, requiring the contract to have attestation rights.
     *
     * @param attestation - The attestation data to be escrowed
     * @param item - The arbiter and demand data for the escrow
     * @param expiration - Optional expiration time for the escrow (default: 0 = no expiration)
     * @returns The transaction hash and attested escrow data
     */
    create: async (
      attestation: {
        schema: `0x${string}`;
        data: {
          recipient: `0x${string}`;
          expirationTime: bigint;
          revocable: boolean;
          refUID: `0x${string}`;
          data: `0x${string}`;
          value: bigint;
        };
      },
      item: Demand,
      expiration: bigint = 0n,
    ) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: attestationEscrowAbi.abi,
        functionName: "doObligation",
        args: [
          {
            attestation,
            arbiter: item.arbiter,
            demand: item.demand,
          },
          expiration,
        ],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Collects payment from an attestation escrow by providing a fulfillment attestation.
     * This function is used with the original AttestationEscrowObligation contract.
     *
     * @param escrowAttestation - The UID of the escrow attestation
     * @param fulfillmentAttestation - The UID of the fulfillment attestation
     * @returns The transaction hash and validation attestation data
     */
    collect: async (escrowAttestation: `0x${string}`, fulfillmentAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: attestationEscrowAbi.abi,
        functionName: "collectEscrow",
        args: [escrowAttestation, fulfillmentAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Reclaims an expired escrow obligation.
     *
     * @param escrowAttestation - The UID of the escrow attestation
     * @returns The transaction hash
     */
    reclaimExpired: async (escrowAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation,
        abi: attestationEscrowAbi.abi,
        functionName: "reclaimExpired",
        args: [escrowAttestation],
      });
      return hash;
    },
  };
};
