import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as attestationBarterUtilsAbi } from "../contracts/AttestationBarterUtils";
import { abi as attestationEscrowAbi } from "../contracts/AttestationEscrowObligation";
import { abi as attestationEscrow2Abi } from "../contracts/AttestationEscrowObligation2";
import type { ChainAddresses } from "../types";
import { getAttestation, getAttestedEventFromTxHash, type ViemClient } from "../utils";

export const makeAttestationClient = (
  viemClient: ViemClient,
  addresses: Pick<
    ChainAddresses,
    "attestationEscrowObligation" | "attestationEscrowObligation2" | "attestationBarterUtils"
  >,
) => {
  // Extract ABI types for encoding/decoding from contract ABIs
  const escrowObligationDataType = getAbiItem({
    abi: attestationEscrowAbi.abi,
    name: "decodeObligationData",
  }).outputs[0];

  const escrow2ObligationDataType = getAbiItem({
    abi: attestationEscrow2Abi.abi,
    name: "decodeObligationData",
  }).outputs[0];

  // Use contract ABIs directly
  const attestationAbi = [escrowObligationDataType];
  const attestation2Abi = [escrow2ObligationDataType];

  const getEscrowSchema = async () =>
    await viemClient.readContract({
      address: addresses.attestationEscrowObligation,
      abi: attestationEscrowAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  const getEscrow2Schema = async () =>
    await viemClient.readContract({
      address: addresses.attestationEscrowObligation2,
      abi: attestationEscrow2Abi.abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  return {
    /**
     * Encodes AttestationEscrowObligation.ObligationData to bytes.
     * @param data - ObligationData object to encode
     * @returns the abi encoded ObligationData as bytes
     */
    encodeEscrowObligation: (data: {
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
      return encodeAbiParameters(attestationAbi, [data]);
    },
    /**
     * Encodes AttestationEscrowObligation2.ObligationData to bytes.
     * @param data - ObligationData object to encode
     * @returns the abi encoded ObligationData as bytes
     */
    encodeEscrow2Obligation: (data: {
      attestationUid: `0x${string}`;
      arbiter: `0x${string}`;
      demand: `0x${string}`;
    }) => {
      return encodeAbiParameters(attestation2Abi, [data]);
    },
    /**
     * Decodes AttestationEscrowObligation.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeEscrowObligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters(attestationAbi, obligationData)[0];
    },
    /**
     * Decodes AttestationEscrowObligation2.ObligationData from bytes.
     * @param obligationData - ObligationData as abi encoded bytes
     * @returns the decoded ObligationData object
     */
    decodeEscrow2Obligation: (obligationData: `0x${string}`) => {
      return decodeAbiParameters(attestation2Abi, obligationData)[0];
    },
    getEscrowSchema,
    getEscrow2Schema,
    /**
     * Gets a complete obligation from its attestation UID, combining attestation metadata with decoded obligation data
     * @param uid - UID of the attestation
     * @returns The complete obligation including attestation metadata and decoded obligation data
     */
    getEscrowObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getEscrowSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters(attestationAbi, attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },
    getEscrow2Obligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid), getEscrow2Schema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters(attestation2Abi, attestation.data)[0];

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
    buyWithAttestation: async (
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
      item: {
        arbiter: `0x${string}`;
        demand: `0x${string}`;
      },
      expiration: bigint = 0n,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.attestationEscrowObligation,
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
    collectEscrow: async (escrowAttestation: `0x${string}`, fulfillmentAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.attestationEscrowObligation,
        abi: attestationEscrowAbi.abi,
        functionName: "collectEscrow",
        args: [escrowAttestation, fulfillmentAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
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
    buyWithAttestation2: async (
      attestationUid: `0x${string}`,
      item: {
        arbiter: `0x${string}`;
        demand: `0x${string}`;
      },
      expiration: bigint = 0n,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.attestationEscrowObligation2,
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
    collectEscrow2: async (escrowAttestation: `0x${string}`, fulfillmentAttestation: `0x${string}`) => {
      const hash = await viemClient.writeContract({
        address: addresses.attestationEscrowObligation2,
        abi: attestationEscrow2Abi.abi,
        functionName: "collectEscrow",
        args: [escrowAttestation, fulfillmentAttestation],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Registers a new schema in the EAS Schema Registry.
     *
     * @param schema - The schema string defining the attestation structure
     * @param resolver - The address of the resolver contract
     * @param revocable - Whether attestations using this schema can be revoked
     * @returns The transaction hash
     */
    registerSchema: async (schema: string, resolver: `0x${string}`, revocable: boolean) => {
      const hash = await viemClient.writeContract({
        address: addresses.attestationBarterUtils,
        abi: attestationBarterUtilsAbi.abi,
        functionName: "registerSchema",
        args: [schema, resolver, revocable],
      });

      return hash;
    },

    /**
     * Creates a new attestation using the AttestationBarterUtils contract.
     *
     * @param schema - The schema UID for the attestation
     * @param recipient - The recipient address of the attestation
     * @param expirationTime - The expiration time for the attestation
     * @param revocable - Whether the attestation can be revoked
     * @param refUID - Reference to another attestation UID (if any)
     * @param data - The encoded attestation data
     * @returns The transaction hash and attested data
     */
    createAttestation: async (
      schema: `0x${string}`,
      recipient: `0x${string}`,
      expirationTime: bigint,
      revocable: boolean,
      refUID: `0x${string}`,
      data: `0x${string}`,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.attestationBarterUtils,
        abi: attestationBarterUtilsAbi.abi,
        functionName: "attest",
        args: [schema, recipient, expirationTime, revocable, refUID, data],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },

    /**
     * Creates an attestation and immediately escrows it in a single transaction.
     * This is a convenience function that combines createAttestation and createEscrow.
     *
     * @param attestation - The attestation data to create and escrow
     * @param escrow - The escrow parameters including arbiter, demand, and expiration
     * @returns The transaction hash and attested data
     */
    attestAndCreateEscrow: async (
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
      escrow: {
        arbiter: `0x${string}`;
        demand: `0x${string}`;
        expirationTime: bigint;
      },
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.attestationBarterUtils,
        abi: attestationBarterUtilsAbi.abi,
        functionName: "attestAndCreateEscrow",
        args: [attestation, escrow.arbiter, escrow.demand, escrow.expirationTime],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
