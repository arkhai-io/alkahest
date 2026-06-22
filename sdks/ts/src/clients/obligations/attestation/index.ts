import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { type AttestationEscrowClient, makeAttestationEscrowClient } from "./escrow";
import { type AttestationUtilClient, makeAttestationUtilClient } from "./util";

export { type AttestationEscrowClient, makeAttestationEscrowClient } from "./escrow";
export { type AttestationEscrowV1Client, makeAttestationEscrowV1Client } from "./escrow/v1";
export { type AttestationEscrowV2Client, makeAttestationEscrowV2Client } from "./escrow/v2";
export { type AttestationUtilClient, makeAttestationUtilClient } from "./util";

export type AttestationAddresses = {
  eas: `0x${string}`;
  atomicUtils: `0x${string}`;
  escrowObligation: `0x${string}`;
  escrowObligationUnconditional: `0x${string}`;
  escrowObligation2: `0x${string}`;
  escrowObligation2Unconditional: `0x${string}`;
};

export const pickAttestationAddresses = (addresses: ChainAddresses): AttestationAddresses => ({
  eas: addresses.eas,
  atomicUtils: addresses.atomicAttestationUtils,
  escrowObligation: addresses.attestationEscrowObligation,
  escrowObligationUnconditional: addresses.attestationUnconditionalEscrowObligation,
  escrowObligation2: addresses.attestationReferenceEscrowObligation,
  escrowObligation2Unconditional: addresses.attestationReferenceUnconditionalEscrowObligation,
});

export type AttestationClient = {
  util: AttestationUtilClient;
  escrow: AttestationEscrowClient;
};

export const makeAttestationClient = (viemClient: ViemClient, addresses: AttestationAddresses): AttestationClient => {
  return {
    util: makeAttestationUtilClient(viemClient, addresses),
    escrow: makeAttestationEscrowClient(viemClient, addresses),
  };
};
