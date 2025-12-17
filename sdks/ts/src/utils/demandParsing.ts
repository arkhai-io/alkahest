import { type Address } from "viem";
import type { ChainAddresses, Demand } from "../types";
import type { DecodersRecord, RecursivelyDecodedDemand, DemandDecoder } from "../clients/arbiters/logical";
import { AllArbiter, AnyArbiter } from "../clients/arbiters/logical";

// Import static decode functions from attestation properties arbiters
import { decodeDemand as decodeAttesterDemand } from "../clients/arbiters/attestationProperties/AttesterArbiter";
import { decodeDemand as decodeRecipientDemand } from "../clients/arbiters/attestationProperties/RecipientArbiter";
import { decodeDemand as decodeRefUidDemand } from "../clients/arbiters/attestationProperties/RefUidArbiter";
import { decodeDemand as decodeRevocableDemand } from "../clients/arbiters/attestationProperties/RevocableArbiter";
import { decodeDemand as decodeSchemaDemand } from "../clients/arbiters/attestationProperties/SchemaArbiter";
import { decodeDemand as decodeUidDemand } from "../clients/arbiters/attestationProperties/UidArbiter";
import { decodeDemand as decodeTimeAfterDemand } from "../clients/arbiters/attestationProperties/TimeAfterArbiter";
import { decodeDemand as decodeTimeBeforeDemand } from "../clients/arbiters/attestationProperties/TimeBeforeArbiter";
import { decodeDemand as decodeTimeEqualDemand } from "../clients/arbiters/attestationProperties/TimeEqualArbiter";
import { decodeDemand as decodeExpirationTimeAfterDemand } from "../clients/arbiters/attestationProperties/ExpirationTimeAfterArbiter";
import { decodeDemand as decodeExpirationTimeBeforeDemand } from "../clients/arbiters/attestationProperties/ExpirationTimeBeforeArbiter";
import { decodeDemand as decodeExpirationTimeEqualDemand } from "../clients/arbiters/attestationProperties/ExpirationTimeEqualArbiter";

// Import static decode functions from general arbiters
import { decodeDemand as decodeTrustedOracleDemand } from "../clients/arbiters/general/trustedOracle";

/**
 * Result of decoding an unknown demand
 */
export type DecodedDemandResult = {
  arbiter: Address;
  decoded: Record<string, unknown>;
  children?: DecodedDemandResult[];
  isUnknown?: boolean;
};

/**
 * Creates a decoders record from ChainAddresses
 * This maps arbiter addresses to their decode functions for recursive demand parsing
 *
 * @param addresses - ChainAddresses containing all arbiter addresses
 * @returns DecodersRecord mapping addresses to decoder functions
 */
export const createDecodersFromAddresses = (addresses: ChainAddresses): DecodersRecord => {
  const decoders: DecodersRecord = {};

  // Logical arbiters (composing - return children)
  if (addresses.allArbiter) {
    decoders[addresses.allArbiter.toLowerCase() as Address] = AllArbiter.decodeDemand as DemandDecoder;
  }
  if (addresses.anyArbiter) {
    decoders[addresses.anyArbiter.toLowerCase() as Address] = AnyArbiter.decodeDemand as DemandDecoder;
  }

  // Attestation properties arbiters (non-composing)
  if (addresses.attesterArbiter) {
    decoders[addresses.attesterArbiter.toLowerCase() as Address] = decodeAttesterDemand as DemandDecoder;
  }
  if (addresses.recipientArbiter) {
    decoders[addresses.recipientArbiter.toLowerCase() as Address] = decodeRecipientDemand as DemandDecoder;
  }
  if (addresses.refUidArbiter) {
    decoders[addresses.refUidArbiter.toLowerCase() as Address] = decodeRefUidDemand as DemandDecoder;
  }
  if (addresses.revocableArbiter) {
    decoders[addresses.revocableArbiter.toLowerCase() as Address] = decodeRevocableDemand as DemandDecoder;
  }
  if (addresses.schemaArbiter) {
    decoders[addresses.schemaArbiter.toLowerCase() as Address] = decodeSchemaDemand as DemandDecoder;
  }
  if (addresses.uidArbiter) {
    decoders[addresses.uidArbiter.toLowerCase() as Address] = decodeUidDemand as DemandDecoder;
  }
  if (addresses.timeAfterArbiter) {
    decoders[addresses.timeAfterArbiter.toLowerCase() as Address] = decodeTimeAfterDemand as DemandDecoder;
  }
  if (addresses.timeBeforeArbiter) {
    decoders[addresses.timeBeforeArbiter.toLowerCase() as Address] = decodeTimeBeforeDemand as DemandDecoder;
  }
  if (addresses.timeEqualArbiter) {
    decoders[addresses.timeEqualArbiter.toLowerCase() as Address] = decodeTimeEqualDemand as DemandDecoder;
  }
  if (addresses.expirationTimeAfterArbiter) {
    decoders[addresses.expirationTimeAfterArbiter.toLowerCase() as Address] =
      decodeExpirationTimeAfterDemand as DemandDecoder;
  }
  if (addresses.expirationTimeBeforeArbiter) {
    decoders[addresses.expirationTimeBeforeArbiter.toLowerCase() as Address] =
      decodeExpirationTimeBeforeDemand as DemandDecoder;
  }
  if (addresses.expirationTimeEqualArbiter) {
    decoders[addresses.expirationTimeEqualArbiter.toLowerCase() as Address] =
      decodeExpirationTimeEqualDemand as DemandDecoder;
  }

  // General arbiters
  if (addresses.trustedOracleArbiter) {
    decoders[addresses.trustedOracleArbiter.toLowerCase() as Address] = decodeTrustedOracleDemand as DemandDecoder;
  }

  // Note: Confirmation arbiters don't have DemandData - they are action-based (confirm/revoke)
  // TrivialArbiter, IntrinsicsArbiter, IntrinsicsArbiter2 don't have DemandData either

  return decoders;
};

/**
 * Decodes a demand of unknown type using the provided decoders record
 * If the arbiter is a composing arbiter (All/Any), recursively decodes children
 *
 * @param demand - The demand to decode {arbiter: Address, demand: Bytes}
 * @param decoders - DecodersRecord mapping addresses to decoder functions
 * @returns Decoded demand with optional children for composing arbiters
 */
export const decodeDemand = (demand: Demand, decoders: DecodersRecord): DecodedDemandResult => {
  const decoder = decoders[demand.arbiter.toLowerCase() as Address];

  if (!decoder) {
    return {
      arbiter: demand.arbiter,
      decoded: { raw: demand.demand },
      isUnknown: true,
    };
  }

  const decoded = decoder(demand.demand);

  // Check if this is a composing arbiter (has children)
  if ("children" in decoded && Array.isArray(decoded.children)) {
    const children = decoded.children.map((child) => decodeDemand(child, decoders));

    return {
      arbiter: demand.arbiter,
      decoded: decoded as Record<string, unknown>,
      children,
    };
  }

  return {
    arbiter: demand.arbiter,
    decoded: decoded as Record<string, unknown>,
  };
};

/**
 * Decodes a demand of unknown type using ChainAddresses
 * Convenience function that creates decoders from addresses and decodes the demand
 *
 * @param demand - The demand to decode {arbiter: Address, demand: Bytes}
 * @param addresses - ChainAddresses containing all arbiter addresses
 * @returns Decoded demand with optional children for composing arbiters
 */
export const decodeDemandWithAddresses = (demand: Demand, addresses: ChainAddresses): DecodedDemandResult => {
  const decoders = createDecodersFromAddresses(addresses);
  return decodeDemand(demand, decoders);
};

// Re-export types
export type { DecodersRecord, RecursivelyDecodedDemand, DemandDecoder };
