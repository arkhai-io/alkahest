import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { makeAttestationEscrowClient, type AttestationEscrowClient } from "./escrow";
import { makeAttestationUtilClient, type AttestationUtilClient } from "./util";

export { makeAttestationEscrowClient, type AttestationEscrowClient } from "./escrow";
export { makeAttestationEscrowV1Client, type AttestationEscrowV1Client } from "./escrow/v1";
export { makeAttestationEscrowV2Client, type AttestationEscrowV2Client } from "./escrow/v2";
export { makeAttestationUtilClient, type AttestationUtilClient } from "./util";

export type AttestationAddresses = {
  eas: `0x${string}`;
  barterUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligation2: `0x${string}`;
};

export const pickAttestationAddresses = (addresses: ChainAddresses): AttestationAddresses => ({
  eas: addresses.eas,
  barterUtils: addresses.attestationBarterUtils,
  escrowObligation: addresses.attestationEscrowObligation,
  escrowObligation2: addresses.attestationEscrowObligation2,
});

export type AttestationClient = {
  util: AttestationUtilClient;
  escrow: AttestationEscrowClient;
};

export const makeAttestationClient = (
  viemClient: ViemClient,
  addresses: AttestationAddresses,
): AttestationClient => {
  return {
    util: makeAttestationUtilClient(viemClient, addresses),
    escrow: makeAttestationEscrowClient(viemClient, addresses),
  };
};
