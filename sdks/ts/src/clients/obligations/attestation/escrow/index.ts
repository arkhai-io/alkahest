import type { ViemClient } from "../../../../utils";
import type { AttestationAddresses } from "../index";
import { type AttestationEscrowV1Client, makeAttestationEscrowV1Client } from "./v1";
import { type AttestationEscrowV2Client, makeAttestationEscrowV2Client } from "./v2";

export { type AttestationEscrowV1Client, makeAttestationEscrowV1Client } from "./v1";
export { type AttestationEscrowV2Client, makeAttestationEscrowV2Client } from "./v2";

/** Attestation escrow client namespace. */
export type AttestationEscrowClient = {
  default: AttestationEscrowV1Client;
  reference: AttestationEscrowV2Client;
  v1: AttestationEscrowV1Client;
  v2: AttestationEscrowV2Client;
};

/** Create attestation-value and attestation-reference escrow clients. */
export const makeAttestationEscrowClient = (
  viemClient: ViemClient,
  addresses: AttestationAddresses,
): AttestationEscrowClient => {
  const defaultEscrow = makeAttestationEscrowV1Client(viemClient, addresses);
  const referenceEscrow = makeAttestationEscrowV2Client(viemClient, addresses);

  return {
    default: defaultEscrow,
    reference: referenceEscrow,
    v1: defaultEscrow,
    v2: referenceEscrow,
  };
};
