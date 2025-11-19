import { type Address } from "viem";
import { AnyArbiterCodec, AllArbiterCodec, TrustedOracleArbiterCodec } from "../clients/arbiters";
import type { ChainAddresses, Demand } from "../types";

/**
 * Interface for arbiter demand parsers
 */
export interface ArbiterDemandParser {
  /**
   * Parse the demand data for this arbiter type
   */
  parse: (demandData: `0x${string}`) => any;
  
  /**
   * Check if this arbiter supports composing (nesting other arbiters)
   */
  isComposing: boolean;
}

/**
 * Registry for mapping arbiter addresses to their demand data formats
 */
export class ArbiterRegistry {
  private parsers = new Map<string, ArbiterDemandParser>();
  
  /**
   * Register a parser for an arbiter address
   */
  register(arbiterAddress: Address, parser: ArbiterDemandParser): void {
    this.parsers.set(arbiterAddress.toLowerCase(), parser);
  }
  
  /**
   * Get parser for an arbiter address
   */
  getParser(arbiterAddress: Address): ArbiterDemandParser | undefined {
    return this.parsers.get(arbiterAddress.toLowerCase());
  }
  
  /**
   * Parse a demand recursively, handling composed arbiters
   */
  parseDemand(demand: Demand): ParsedDemand {
    const parser = this.getParser(demand.arbiter);
    
    if (!parser) {
      return {
        arbiter: demand.arbiter,
        demandData: demand.demand,
        parsed: null,
        type: "unknown",
      };
    }
    
    const parsed = parser.parse(demand.demand);
    
    // If this is a composing arbiter, recursively parse nested demands
    if (parser.isComposing && parsed.arbiters && parsed.demands) {
      const nestedDemands = parsed.arbiters.map((arbiter: Address, index: number) => ({
        arbiter,
        demand: parsed.demands[index],
      }));
      
      return {
        arbiter: demand.arbiter,
        demandData: demand.demand,
        parsed,
        type: "composing",
        nested: nestedDemands.map((nested: Demand) => this.parseDemand(nested)),
      };
    }
    
    return {
      arbiter: demand.arbiter,
      demandData: demand.demand,
      parsed,
      type: "simple",
    };
  }
}

/**
 * Result of parsing a demand
 */
export interface ParsedDemand {
  arbiter: Address;
  demandData: `0x${string}`;
  parsed: any;
  type: "simple" | "composing" | "unknown";
  nested?: ParsedDemand[];
}

/**
 * Create a default registry with known arbiters
 */
export function createDefaultArbiterRegistry(addresses: ChainAddresses): ArbiterRegistry {
  const registry = new ArbiterRegistry();
  
  // Register logical arbiters (composing)
  registry.register(addresses.anyArbiter, {
    parse: AnyArbiterCodec.decode,
    isComposing: true,
  });
  
  registry.register(addresses.allArbiter, {
    parse: AllArbiterCodec.decode,
    isComposing: true,
  });
  
  // Register simple arbiters (non-composing)
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
  
  // Add more arbiters as needed...
  
  return registry;
}

/**
 * Utility functions for working with composed demands
 */
export const DemandParsingUtils = {
  /**
   * Parse a demand and all its nested demands recursively
   */
  parseComposedDemand: (demand: Demand, registry: ArbiterRegistry): ParsedDemand => {
    return registry.parseDemand(demand);
  },
  
  /**
   * Find all arbiters used in a composed demand (flattened list)
   */
  getAllArbiters: (parsedDemand: ParsedDemand): Address[] => {
    const arbiters = [parsedDemand.arbiter];
    
    if (parsedDemand.nested) {
      for (const nested of parsedDemand.nested) {
        arbiters.push(...DemandParsingUtils.getAllArbiters(nested));
      }
    }
    
    return arbiters;
  },
  
  /**
   * Check if a demand is fully parseable (all arbiters are known)
   */
  isFullyParseable: (parsedDemand: ParsedDemand): boolean => {
    if (parsedDemand.type === "unknown") {
      return false;
    }
    
    if (parsedDemand.nested) {
      return parsedDemand.nested.every(DemandParsingUtils.isFullyParseable);
    }
    
    return true;
  },
  
  /**
   * Get a human-readable representation of the demand structure
   */
  getStructureDescription: (parsedDemand: ParsedDemand): string => {
    if (parsedDemand.type === "unknown") {
      return `Unknown arbiter ${parsedDemand.arbiter}`;
    }
    
    if (parsedDemand.type === "simple") {
      return `${parsedDemand.arbiter}`;
    }
    
    if (parsedDemand.nested) {
      const nestedDescriptions = parsedDemand.nested.map(DemandParsingUtils.getStructureDescription);
      const arbiterType = parsedDemand.arbiter.startsWith("0x") ? parsedDemand.arbiter : "Composed";
      return `${arbiterType}(${nestedDescriptions.join(", ")})`;
    }
    
    return `${parsedDemand.arbiter}`;
  },
};