import type { ViemClient } from "../../../../utils";
import type { AttestationAddresses } from "../index";
import { makeAttestationEscrowV1Client, type AttestationEscrowV1Client } from "./v1";
import { makeAttestationEscrowV2Client, type AttestationEscrowV2Client } from "./v2";

export { makeAttestationEscrowV1Client, type AttestationEscrowV1Client } from "./v1";
export { makeAttestationEscrowV2Client, type AttestationEscrowV2Client } from "./v2";

export type AttestationEscrowClient = {
  v1: AttestationEscrowV1Client;
  v2: AttestationEscrowV2Client;
};

export const makeAttestationEscrowClient = (
  viemClient: ViemClient,
  addresses: AttestationAddresses,
): AttestationEscrowClient => {
  return {
    v1: makeAttestationEscrowV1Client(viemClient, addresses),
    v2: makeAttestationEscrowV2Client(viemClient, addresses),
  };
};
