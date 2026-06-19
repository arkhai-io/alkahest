import { abi as atomicAttestationUtilsAbi } from "../../../contracts/utils/AtomicAttestationUtils";
import { getAttestedEventsFromTxHash, type ViemClient } from "../../../utils";
import type { AttestationAddresses } from "./index";

export type AttestationUtilClient = ReturnType<typeof makeAttestationUtilClient>;

export type AttestationRequest = {
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

export type ReferenceEscrowData = {
  arbiter: `0x${string}`;
  demand: `0x${string}`;
  validationExpirationTime: bigint;
  validationRevocable: boolean;
};

export const makeAttestationUtilClient = (viemClient: ViemClient, addresses: AttestationAddresses) => {
  return {
    address: addresses.atomicUtils,

    attestAndCreateReferenceEscrow: async (
      request: AttestationRequest,
      escrowData: ReferenceEscrowData,
      escrowExpirationTime: bigint,
    ) => {
      const hash = await viemClient.writeContract({
        address: addresses.atomicUtils,
        abi: atomicAttestationUtilsAbi.abi,
        functionName: "attestAndCreateReferenceEscrow",
        args: [addresses.escrowObligation2, request, escrowData, escrowExpirationTime],
        value: request.data.value,
        chain: viemClient.chain,
      });

      const events = await getAttestedEventsFromTxHash(viemClient, hash);
      return { hash, attestation: events[0]?.args, escrow: events[1]?.args };
    },
  };
};
