import { describe, expect, test } from "bun:test";
import {
  AnyArbiterCodec,
  AllArbiterCodec,
  TrustedOracleArbiterCodec,
} from "../../src/clients/arbiters";
import {
  ArbiterRegistry,
  DemandParsingUtils,
} from "../../src/utils/demandParsing";
import { createFullArbiterRegistry } from "../../src/utils/arbiterRegistry";
import type { Demand, ChainAddresses } from "../../src/types";

describe("Integration Tests for New Features", () => {
  const mockAddresses: ChainAddresses = {
    eas: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    easSchemaRegistry: "0x1234567890123456789012345678901234567891" as `0x${string}`,
    trustedOracleArbiter: "0x1234567890123456789012345678901234567892" as `0x${string}`,
    trustedPartyArbiter: "0x1234567890123456789012345678901234567893" as `0x${string}`,
    trivialArbiter: "0x1234567890123456789012345678901234567894" as `0x${string}`,
    specificAttestationArbiter: "0x1234567890123456789012345678901234567895" as `0x${string}`,
    anyArbiter: "0x1234567890123456789012345678901234567896" as `0x${string}`,
    allArbiter: "0x1234567890123456789012345678901234567897" as `0x${string}`,
    intrinsicsArbiter: "0x1234567890123456789012345678901234567898" as `0x${string}`,
    intrinsicsArbiter2: "0x1234567890123456789012345678901234567899" as `0x${string}`,
    erc20EscrowObligation: "0x123456789012345678901234567890123456789A" as `0x${string}`,
    erc20PaymentObligation: "0x123456789012345678901234567890123456789B" as `0x${string}`,
    erc20BarterUtils: "0x123456789012345678901234567890123456789C" as `0x${string}`,
    nativeTokenPaymentObligation: "0x123456789012345678901234567890123456789D" as `0x${string}`,
    nativeTokenEscrowObligation: "0x123456789012345678901234567890123456789E" as `0x${string}`,
    nativeTokenBarterUtils: "0x123456789012345678901234567890123456789F" as `0x${string}`,
    erc721EscrowObligation: "0x12345678901234567890123456789012345678A0" as `0x${string}`,
    erc721PaymentObligation: "0x12345678901234567890123456789012345678A1" as `0x${string}`,
    erc721BarterUtils: "0x12345678901234567890123456789012345678A2" as `0x${string}`,
    erc1155EscrowObligation: "0x12345678901234567890123456789012345678A3" as `0x${string}`,
    erc1155PaymentObligation: "0x12345678901234567890123456789012345678A4" as `0x${string}`,
    erc1155BarterUtils: "0x12345678901234567890123456789012345678A5" as `0x${string}`,
    tokenBundleBarterUtils: "0x12345678901234567890123456789012345678A6" as `0x${string}`,
    tokenBundleEscrowObligation: "0x12345678901234567890123456789012345678AD" as `0x${string}`,
    tokenBundlePaymentObligation: "0x12345678901234567890123456789012345678AE" as `0x${string}`,
    attestationEscrowObligation: "0x12345678901234567890123456789012345678A7" as `0x${string}`,
    attestationEscrowObligation2: "0x12345678901234567890123456789012345678A8" as `0x${string}`,
    attestationBarterUtils: "0x12345678901234567890123456789012345678AB" as `0x${string}`,
    stringObligation: "0x12345678901234567890123456789012345678AC" as `0x${string}`,
  };

  test("should have all new static codec functionality available", () => {
    // Static codecs should be available
    expect(AnyArbiterCodec).toBeDefined();
    expect(AnyArbiterCodec.encode).toBeDefined();
    expect(AnyArbiterCodec.decode).toBeDefined();
    
    expect(AllArbiterCodec).toBeDefined();
    expect(AllArbiterCodec.encode).toBeDefined();
    expect(AllArbiterCodec.decode).toBeDefined();
    
    expect(TrustedOracleArbiterCodec).toBeDefined();
    expect(TrustedOracleArbiterCodec.encode).toBeDefined();
    expect(TrustedOracleArbiterCodec.decode).toBeDefined();
    
    // Demand parsing utilities should be available
    expect(ArbiterRegistry).toBeDefined();
    expect(DemandParsingUtils).toBeDefined();
    expect(createFullArbiterRegistry).toBeDefined();
  });

  test("should create and parse complex demand using static codecs", () => {
    const registry = createFullArbiterRegistry(mockAddresses);

    // Create a complex nested demand using static codecs
    const trustedOracleDemand = TrustedOracleArbiterCodec.encode({
      oracle: "0x1111111111111111111111111111111111111111",
      data: "0x1234567890abcdef",
    });

    // Create an All arbiter demand
    const allArbiterDemandData = {
      arbiters: [mockAddresses.trustedOracleArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
      demands: [trustedOracleDemand, "0x"] as `0x${string}`[],
    };

    // Create an Any arbiter demand that contains the All arbiter
    const anyArbiterDemandData = {
      arbiters: [mockAddresses.allArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
      demands: [AllArbiterCodec.encode(allArbiterDemandData), "0x"] as `0x${string}`[],
    };

    const complexDemand: Demand = {
      arbiter: mockAddresses.anyArbiter,
      demand: AnyArbiterCodec.encode(anyArbiterDemandData),
    };

    // Parse the complex demand
    const parsed = DemandParsingUtils.parseComposedDemand(complexDemand, registry);

    // Verify the structure
    expect(parsed.type).toBe("composing");
    expect(parsed.arbiter).toBe(mockAddresses.anyArbiter);
    expect(parsed.nested).toHaveLength(2);

    // Check the first nested demand (AllArbiter)
    const firstNested = parsed.nested?.[0];
    expect(firstNested?.type).toBe("composing");
    expect(firstNested?.arbiter).toBe(mockAddresses.allArbiter);
    expect(firstNested?.nested).toHaveLength(2);
    expect(firstNested?.nested?.[0].arbiter).toBe(mockAddresses.trustedOracleArbiter);
    expect(firstNested?.nested?.[1].arbiter).toBe(mockAddresses.trivialArbiter);

    // Check the second nested demand (TrivialArbiter)
    const secondNested = parsed.nested?.[1];
    expect(secondNested?.type).toBe("simple");
    expect(secondNested?.arbiter).toBe(mockAddresses.trivialArbiter);

    // Verify utility functions work
    const allArbiters = DemandParsingUtils.getAllArbiters(parsed);
    // The trivial arbiter appears twice in the structure (once in AllArbiter, once directly in AnyArbiter)
    expect(allArbiters).toHaveLength(5);
    expect(allArbiters).toContain(mockAddresses.anyArbiter);
    expect(allArbiters).toContain(mockAddresses.allArbiter);
    expect(allArbiters).toContain(mockAddresses.trustedOracleArbiter);
    expect(allArbiters).toContain(mockAddresses.trivialArbiter);

    expect(DemandParsingUtils.isFullyParseable(parsed)).toBe(true);

    const description = DemandParsingUtils.getStructureDescription(parsed);
    // The description contains hex addresses, not human-readable names
    expect(description).toContain(mockAddresses.anyArbiter.slice(0, 10)); // Check first 10 chars of address
    expect(description).toContain(mockAddresses.allArbiter.slice(0, 10));
  });

  test("should demonstrate end-to-end workflow with static codecs and parsing", () => {
    const registry = createFullArbiterRegistry(mockAddresses);

    // 1. Create demands using static codecs
    const oracleDemand = TrustedOracleArbiterCodec.encode({
      oracle: "0x2222222222222222222222222222222222222222",
      data: "0xabcdef1234567890",
    });

    const logicalDemand: Demand = {
      arbiter: mockAddresses.allArbiter,
      demand: AllArbiterCodec.encode({
        arbiters: [mockAddresses.trustedOracleArbiter] as `0x${string}`[],
        demands: [oracleDemand] as `0x${string}`[],
      }),
    };

    // 2. Parse the demand structure
    const parsed = DemandParsingUtils.parseComposedDemand(logicalDemand, registry);

    // 3. Verify all components work together
    expect(parsed.type).toBe("composing");
    expect(DemandParsingUtils.isFullyParseable(parsed)).toBe(true);
    expect(DemandParsingUtils.getAllArbiters(parsed)).toHaveLength(2);
    
    // 4. Verify the parsed structure is correct
    expect(parsed.arbiter).toBe(mockAddresses.allArbiter);
    expect(parsed.nested?.[0].arbiter).toBe(mockAddresses.trustedOracleArbiter);
    expect(parsed.nested?.[0].type).toBe("simple");
    
    // The workflow is complete - static codecs create demands,
    // parsing utilities analyze them correctly
  });

  test("should correctly handle static codec roundtrip encoding/decoding", () => {
    // Test TrustedOracleArbiter codec
    const oracleData = {
      oracle: "0x1111111111111111111111111111111111111111" as `0x${string}`,
      data: "0x1234567890abcdef" as `0x${string}`,
    };

    const encoded = TrustedOracleArbiterCodec.encode(oracleData);
    const decoded = TrustedOracleArbiterCodec.decode(encoded);

    expect(decoded.oracle).toBe(oracleData.oracle);
    expect(decoded.data).toBe(oracleData.data);

    // Test AnyArbiter codec
    const anyData = {
      arbiters: ["0x1111111111111111111111111111111111111111", "0x2222222222222222222222222222222222222222"] as `0x${string}`[],
      demands: ["0x1234", "0x5678"] as `0x${string}`[],
    };

    const encodedAny = AnyArbiterCodec.encode(anyData);
    const decodedAny = AnyArbiterCodec.decode(encodedAny);

    expect(decodedAny.arbiters).toEqual(anyData.arbiters);
    expect(decodedAny.demands).toEqual(anyData.demands);

    // Test AllArbiter codec 
    const allData = {
      arbiters: ["0x3333333333333333333333333333333333333333"] as `0x${string}`[],
      demands: ["0x9999"] as `0x${string}`[],
    };

    const encodedAll = AllArbiterCodec.encode(allData);
    const decodedAll = AllArbiterCodec.decode(encodedAll);

    expect(decodedAll.arbiters).toEqual(allData.arbiters);
    expect(decodedAll.demands).toEqual(allData.demands);
  });
});