import type { Address } from "viem";
import { ArbiterRegistry } from "./demandParsing";
import { AnyArbiterCodec, AllArbiterCodec, TrustedOracleArbiterCodec } from "../clients/arbiters";
import { createComposingArbiterCodec } from "./codecFactory";
import type { ChainAddresses } from "../types";

// Import all composing arbiter contracts
import { abi as AttesterArbiterComposingAbi } from "../contracts/AttesterArbiterComposing";
import { abi as RecipientArbiterComposingAbi } from "../contracts/RecipientArbiterComposing";
import { abi as SchemaArbiterComposingAbi } from "../contracts/SchemaArbiterComposing";
import { abi as TimeAfterArbiterComposingAbi } from "../contracts/TimeAfterArbiterComposing";
import { abi as TimeBeforeArbiterComposingAbi } from "../contracts/TimeBeforeArbiterComposing";
import { abi as TimeEqualArbiterComposingAbi } from "../contracts/TimeEqualArbiterComposing";
import { abi as UidArbiterComposingAbi } from "../contracts/UidArbiterComposing";
import { abi as RefUidArbiterComposingAbi } from "../contracts/RefUidArbiterComposing";
import { abi as RevocableArbiterComposingAbi } from "../contracts/RevocableArbiterComposing";
import { abi as ExpirationTimeAfterArbiterComposingAbi } from "../contracts/ExpirationTimeAfterArbiterComposing";
import { abi as ExpirationTimeBeforeArbiterComposingAbi } from "../contracts/ExpirationTimeBeforeArbiterComposing";
import { abi as ExpirationTimeEqualArbiterComposingAbi } from "../contracts/ExpirationTimeEqualArbiterComposing";

/**
 * Configuration for composing arbiters that follow the standard pattern
 */
interface ComposingArbiterConfig {
  /** Address property name in ChainAddresses */
  addressKey: keyof ChainAddresses;
  /** Contract ABI */
  abi: { abi: any };
  /** Human readable name for debugging */
  name: string;
}

/**
 * Registry of all standard composing arbiters that follow the {baseArbiter, baseDemand, ...} pattern
 */
const STANDARD_COMPOSING_ARBITERS: ComposingArbiterConfig[] = [
  {
    addressKey: "attesterArbiterComposing",
    abi: AttesterArbiterComposingAbi,
    name: "AttesterArbiterComposing"
  },
  {
    addressKey: "recipientArbiterComposing",
    abi: RecipientArbiterComposingAbi,
    name: "RecipientArbiterComposing"
  },
  {
    addressKey: "schemaArbiterComposing",
    abi: SchemaArbiterComposingAbi,
    name: "SchemaArbiterComposing"
  },
  {
    addressKey: "uidArbiterComposing",
    abi: UidArbiterComposingAbi,
    name: "UidArbiterComposing"
  },
  {
    addressKey: "refUidArbiterComposing",
    abi: RefUidArbiterComposingAbi,
    name: "RefUidArbiterComposing"
  },
  {
    addressKey: "revocableArbiterComposing",
    abi: RevocableArbiterComposingAbi,
    name: "RevocableArbiterComposing"
  },
  // Time arbiters
  {
    addressKey: "timestampArbiterComposing",
    abi: TimeAfterArbiterComposingAbi, // Using one as example - these need to be mapped correctly
    name: "TimeAfterArbiterComposing"
  },
  // Expiration time arbiters 
  {
    addressKey: "expirationTimeArbiterComposing",
    abi: ExpirationTimeAfterArbiterComposingAbi,
    name: "ExpirationTimeAfterArbiterComposing"
  }
];

/**
 * Automatically create and register all composing arbiters that follow the standard pattern
 */
export function createFullArbiterRegistry(addresses: ChainAddresses): ArbiterRegistry {
  const registry = new ArbiterRegistry();

  // 1. Register logical arbiters (these are special, not following the composing pattern)
  registry.register(addresses.anyArbiter, {
    parse: AnyArbiterCodec.decode,
    isComposing: true,
  });

  registry.register(addresses.allArbiter, {
    parse: AllArbiterCodec.decode,
    isComposing: true,
  });

  // 2. Register simple arbiters (non-composing, leaf nodes)
  registry.register(addresses.trivialArbiter, {
    parse: (demandData: `0x${string}`) => {
      // TrivialArbiter has no demand data
      return {};
    },
    isComposing: false,
  });

  registry.register(addresses.trustedOracleArbiter, {
    parse: TrustedOracleArbiterCodec.decode,
    isComposing: false,
  });

  // 3. Automatically register all standard composing arbiters using the factory
  for (const config of STANDARD_COMPOSING_ARBITERS) {
    const address = addresses[config.addressKey];
    if (address) {
      try {
        const codec = createComposingArbiterCodec(config.abi);
        registry.register(address, {
          parse: codec.decode,
          isComposing: true,
        });
      } catch (error) {
        console.warn(`Failed to register ${config.name}: ${error}`);
      }
    }
  }

  // 4. Register additional complex arbiters that don't follow the standard pattern
  // (Add specific registrations for arbiters with unique structures here)

  return registry;
}

/**
 * Create static codecs for all composing arbiters
 * This generates the codec objects that can be used for encoding/decoding without a client
 */
export function createComposingCodecs() {
  const codecs: Record<string, any> = {};

  for (const config of STANDARD_COMPOSING_ARBITERS) {
    try {
      const codec = createComposingArbiterCodec(config.abi);
      const codecName = config.name.replace("Arbiter", "").replace("Composing", "") + "Codec";
      codecs[codecName] = codec;
    } catch (error) {
      console.warn(`Failed to create codec for ${config.name}: ${error}`);
    }
  }

  return codecs;
}

/**
 * Demand parsing utilities with automatic codec generation
 */
export const DemandParsingRegistry = {
  /**
   * Create a fully populated registry with all known arbiters
   */
  createFullRegistry: createFullArbiterRegistry,

  /**
   * Get all available static codecs
   */
  getAllCodecs: createComposingCodecs,

  /**
   * Check if an arbiter address is a known composing arbiter
   */
  isKnownComposingArbiter: (address: Address, addresses: ChainAddresses): boolean => {
    return STANDARD_COMPOSING_ARBITERS.some(config => addresses[config.addressKey] === address);
  },

  /**
   * Get the configuration for a composing arbiter by address
   */
  getComposingArbiterConfig: (address: Address, addresses: ChainAddresses): ComposingArbiterConfig | undefined => {
    return STANDARD_COMPOSING_ARBITERS.find(config => addresses[config.addressKey] === address);
  }
};