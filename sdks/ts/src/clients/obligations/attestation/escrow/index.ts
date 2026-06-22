import type { ViemClient } from "../../../../utils";
import type { AttestationAddresses } from "../index";
import { type AttestationEscrowDefaultClient, makeAttestationEscrowDefaultClient } from "./default";
import { type AttestationReferenceEscrowClient, makeAttestationReferenceEscrowClient } from "./reference";

export { type AttestationEscrowDefaultClient, makeAttestationEscrowDefaultClient } from "./default";
export { type AttestationReferenceEscrowClient, makeAttestationReferenceEscrowClient } from "./reference";

/** Attestation escrow client namespace. */
export type AttestationEscrowClient = {
  default: AttestationEscrowDefaultClient;
  reference: AttestationReferenceEscrowClient;
};

/** Create attestation-value and attestation-reference escrow clients. */
export const makeAttestationEscrowClient = (
  viemClient: ViemClient,
  addresses: AttestationAddresses,
): AttestationEscrowClient => {
  const defaultEscrow = makeAttestationEscrowDefaultClient(viemClient, addresses);
  const referenceEscrow = makeAttestationReferenceEscrowClient(viemClient, addresses);

  return {
    default: defaultEscrow,
    reference: referenceEscrow,
  };
};
