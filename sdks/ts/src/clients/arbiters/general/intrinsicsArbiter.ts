import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";

/**
 * IntrinsicsArbiter Client (v1)
 *
 * A basic intrinsics arbiter that validates attestation intrinsics (not expired, not revoked).
 * This arbiter does not use DemandData - it's a simple pass-through validator.
 *
 * Use IntrinsicsArbiter2 if you need schema validation.
 */
export const makeIntrinsicsArbiterClient = (viemClient: ViemClient, addresses: ChainAddresses) => {
  return {
    /**
     * Get the arbiter address
     */
    address: addresses.intrinsicsArbiter,
  };
};
