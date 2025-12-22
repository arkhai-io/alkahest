import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as attestationEscrow2Abi } from "../../../../contracts/obligations/escrow/non-tierable/AttestationEscrowObligation2";
import type { Demand } from "../../../../types";
import { getAttestation, getAttestedEventFromTxHash, writeContract, type ViemClient } from "../../../../utils";
import type { AttestationAddresses } from "../index";

const escrow2ObligationDecodeFunction = getAbiItem({
  abi: attestationEscrow2Abi.abi,
  name: "decodeObligationData",
});

const escrow2ObligationDataType = escrow2ObligationDecodeFunction.outputs[0];

/**
 * AttestationEscrowObligation2 (V2) ObligationData type
 */
export type AttestationEscrowV2ObligationData = {
  attestationUid: `0x${string}`;
  arbiter: `0x${string}`;
  demand: `0x${string}`;
};

/**
 * Encodes AttestationEscrowObligation2.ObligationData to bytes.
 * @param data - ObligationData struct
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: AttestationEscrowV2ObligationData): `0x${string}` => {
  return encodeAbiParameters([escrow2ObligationDataType], [data]);
};

/**
 * Decodes AttestationEscrowObligation2.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): AttestationEscrowV2ObligationData => {
  return decodeAbiParameters([escrow2ObligationDataType], obligationData)[0] as AttestationEscrowV2ObligationData;
};

export type AttestationEscrowV2Client = ReturnType<typeof makeAttestationEscrowV2Client>;

export const makeAttestationEscrowV2Client = (
  viemClient: ViemClient,
  addresses: AttestationAddresses,
) => {
  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.escrowObligation2,
      abi: attestationEscrow2Abi.abi,
      functionName: "ATTESTATION_SCHEMA",
      authorizationList: undefined,
    });

  return {
    address: addresses.escrowObligation2,
    getSchema,

    /**
     * Encodes AttestationEscrowObligation2.ObligationData to bytes.
     * @param data - ObligationData object to encode
     * @returns the abi encoded ObligationData as bytes
     */
    encodeObligation: (data: {
      attestationUid: `0x${string}`;
      arbiter: `0x${string}`;
      demand: `0x${string}`;
    }) => {
      return encodeAbiParameters([escrow2ObligationDataType], [data]);
    },

    /**
     * Decodes AttestationEscrowObligation2.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters([escrow2ObligationDataType], obligationData)[0];
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
      const data = decodeAbiParameters([escrow2ObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },

    /**
     * Creates an escrow using an attestation UID as reference.
     * This function uses AttestationEscrowObligation2 which references the attestation by UID
     * instead of storing the full attestation data, making it more gas efficient. When collecting
     * payment, this contract creates a validation attestation that references the original attestation,
     * allowing it to work with any schema implementation without requiring attestation rights.
     *
     * @param attestationUid - The UID of the attestation to be escrowed
     * @param item - The arbiter and demand data for the escrow
     * @param expiration - Optional expiration time for the escrow (default: 0 = no expiration)
     * @returns The transaction hash and attested escrow data
     */
    create: async (
      attestationUid: `0x${string}`,
      item: Demand,
      expiration: bigint = 0n,
    ) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation2,
        abi: attestationEscrow2Abi.abi,
        functionName: "doObligation",
        args: [
          {
            attestationUid,
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
     * This function is used with AttestationEscrowObligation2 and creates a validation
     * attestation referencing the original attestation.
     *
     * @param escrowAttestation - The UID of the escrow attestation
     * @param fulfillmentAttestation - The UID of the fulfillment attestation
     * @returns The transaction hash and validation attestation data
     */
    collect: async (escrowAttestation: `0x${string}`, fulfillmentAttestation: `0x${string}`) => {
      const hash = await writeContract(viemClient, {
        address: addresses.escrowObligation2,
        abi: attestationEscrow2Abi.abi,
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
        address: addresses.escrowObligation2,
        abi: attestationEscrow2Abi.abi,
        functionName: "reclaimExpired",
        args: [escrowAttestation],
      });
      return hash;
    },
  };
};
