import type { ViemClient } from "../../../../utils";
import type { AttestationAddresses } from "../index";
import { type AttestationEscrowV1Client, makeAttestationEscrowV1Client } from "./v1";
import { type AttestationEscrowV2Client, makeAttestationEscrowV2Client } from "./v2";

export { type AttestationEscrowV1Client, makeAttestationEscrowV1Client } from "./v1";
export { type AttestationEscrowV2Client, makeAttestationEscrowV2Client } from "./v2";

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
