import { abi as attestationBarterUtilsAbi } from "../../../contracts/utils/AttestationBarterUtils";
import { getAttestedEventFromTxHash, type ViemClient, writeContract } from "../../../utils";
import type { AttestationAddresses } from "./index";

export type AttestationUtilClient = ReturnType<typeof makeAttestationUtilClient>;

export const makeAttestationUtilClient = (viemClient: ViemClient, addresses: AttestationAddresses) => {
  return {
    address: addresses.barterUtils,

    /**
     * Registers a new schema in the EAS Schema Registry.
     *
     * @param schema - The schema string defining the attestation structure
     * @param resolver - The address of the resolver contract
     * @param revocable - Whether attestations using this schema can be revoked
     * @returns The transaction hash
     */
    registerSchema: async (schema: string, resolver: `0x${string}`, revocable: boolean) => {
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
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
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
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
      const hash = await writeContract(viemClient, {
        address: addresses.barterUtils,
        abi: attestationBarterUtilsAbi.abi,
        functionName: "attestAndCreateEscrow",
        args: [attestation, escrow.arbiter, escrow.demand, escrow.expirationTime],
      });

      const attested = await getAttestedEventFromTxHash(viemClient, hash);
      return { hash, attested };
    },
  };
};
