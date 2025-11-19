import { describe, test, expect } from "bun:test";
import { createDefaultArbiterRegistry, DemandParsingUtils, AnyArbiterCodec, AllArbiterCodec, TrustedOracleArbiterCodec } from "../../src";
import type { ChainAddresses, Demand } from "../../src/types";

describe("Demand Parsing and Static Codecs", () => {
  // Mock addresses for testing
  const mockAddresses: ChainAddresses = {
    eas: "0x1234567890123456789012345678901234567890",
    easSchemaRegistry: "0x1234567890123456789012345678901234567891",
    trustedOracleArbiter: "0x1234567890123456789012345678901234567892",
    trustedPartyArbiter: "0x1234567890123456789012345678901234567893",
    trivialArbiter: "0x1234567890123456789012345678901234567894",
    specificAttestationArbiter: "0x1234567890123456789012345678901234567895",
    anyArbiter: "0x1234567890123456789012345678901234567896",
    allArbiter: "0x1234567890123456789012345678901234567897",
    intrinsicsArbiter: "0x1234567890123456789012345678901234567898",
    intrinsicsArbiter2: "0x1234567890123456789012345678901234567899",
    erc20EscrowObligation: "0x123456789012345678901234567890123456789A",
    erc20PaymentObligation: "0x123456789012345678901234567890123456789B",
    erc20BarterUtils: "0x123456789012345678901234567890123456789C",
    nativeTokenPaymentObligation: "0x123456789012345678901234567890123456789D",
    nativeTokenEscrowObligation: "0x123456789012345678901234567890123456789E",
    nativeTokenBarterUtils: "0x123456789012345678901234567890123456789F",
    erc721EscrowObligation: "0x12345678901234567890123456789012345678A0",
    erc721PaymentObligation: "0x12345678901234567890123456789012345678A1",
    erc721BarterUtils: "0x12345678901234567890123456789012345678A2",
    erc1155EscrowObligation: "0x12345678901234567890123456789012345678A3",
    erc1155PaymentObligation: "0x12345678901234567890123456789012345678A4",
    erc1155BarterUtils: "0x12345678901234567890123456789012345678A5",
    tokenBundleEscrowObligation: "0x12345678901234567890123456789012345678A6",
    tokenBundlePaymentObligation: "0x12345678901234567890123456789012345678A7",
    tokenBundleBarterUtils: "0x12345678901234567890123456789012345678A8",
    attestationEscrowObligation: "0x12345678901234567890123456789012345678A9",
    attestationEscrowObligation2: "0x12345678901234567890123456789012345678AA",
    attestationBarterUtils: "0x12345678901234567890123456789012345678AB",
    stringObligation: "0x12345678901234567890123456789012345678AC",
  };

  test("should encode and decode AnyArbiter demands using static codec", () => {
    const demand = {
      arbiters: ["0x1111111111111111111111111111111111111111", "0x2222222222222222222222222222222222222222"] as `0x${string}`[],
      demands: ["0x", "0x"] as `0x${string}`[],
    };

    const encoded = AnyArbiterCodec.encode(demand);
    const decoded = AnyArbiterCodec.decode(encoded);

    expect(decoded.arbiters).toEqual(demand.arbiters);
    expect(decoded.demands).toEqual(demand.demands);
  });

  test("should encode and decode AllArbiter demands using static codec", () => {
    const demand = {
      arbiters: ["0x1111111111111111111111111111111111111111", "0x2222222222222222222222222222222222222222"] as `0x${string}`[],
      demands: ["0x", "0x"] as `0x${string}`[],
    };

    const encoded = AllArbiterCodec.encode(demand);
    const decoded = AllArbiterCodec.decode(encoded);

    expect(decoded.arbiters).toEqual(demand.arbiters);
    expect(decoded.demands).toEqual(demand.demands);
  });

  test("should create default arbiter registry", () => {
    const registry = createDefaultArbiterRegistry(mockAddresses);

    // Test that registry recognizes known arbiters
    expect(registry.getParser(mockAddresses.anyArbiter)).toBeDefined();
    expect(registry.getParser(mockAddresses.allArbiter)).toBeDefined();
    expect(registry.getParser(mockAddresses.trustedOracleArbiter)).toBeDefined();
    expect(registry.getParser(mockAddresses.trivialArbiter)).toBeDefined();

    // Test composing vs non-composing
    expect(registry.getParser(mockAddresses.anyArbiter)?.isComposing).toBe(true);
    expect(registry.getParser(mockAddresses.allArbiter)?.isComposing).toBe(true);
    expect(registry.getParser(mockAddresses.trustedOracleArbiter)?.isComposing).toBe(false);
    expect(registry.getParser(mockAddresses.trivialArbiter)?.isComposing).toBe(false);
  });

  test("should parse simple demand", () => {
    const registry = createDefaultArbiterRegistry(mockAddresses);
    
    const simpleDemand: Demand = {
      arbiter: mockAddresses.trivialArbiter,
      demand: "0x",
    };

    const parsed = DemandParsingUtils.parseComposedDemand(simpleDemand, registry);

    expect(parsed.type).toBe("simple");
    expect(parsed.arbiter).toBe(mockAddresses.trivialArbiter);
    expect(parsed.nested).toBeUndefined();
  });

  test("should parse composed demand with nested arbiters", () => {
    const registry = createDefaultArbiterRegistry(mockAddresses);
    
    // Create actual encoded demands for nested arbiters
    const trustedOracledemand = TrustedOracleArbiterCodec.encode({
      oracle: "0x1111111111111111111111111111111111111111",
      data: "0x1234",
    });
    
    // Create a nested demand structure with real encoded data
    const nestedDemandData = {
      arbiters: [mockAddresses.trustedOracleArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
      demands: [trustedOracledemand, "0x"] as `0x${string}`[],
    };

    const composedDemand: Demand = {
      arbiter: mockAddresses.anyArbiter,
      demand: AnyArbiterCodec.encode(nestedDemandData),
    };

    const parsed = DemandParsingUtils.parseComposedDemand(composedDemand, registry);

    expect(parsed.type).toBe("composing");
    expect(parsed.arbiter).toBe(mockAddresses.anyArbiter);
    expect(parsed.nested).toHaveLength(2);
    expect(parsed.nested?.[0].arbiter).toBe(mockAddresses.trustedOracleArbiter);
    expect(parsed.nested?.[1].arbiter).toBe(mockAddresses.trivialArbiter);
  });

  test("should get all arbiters from composed demand", () => {
    const registry = createDefaultArbiterRegistry(mockAddresses);
    
    // Create actual encoded demands instead of empty "0x"
    const trustedOracleDemand = TrustedOracleArbiterCodec.encode({
      oracle: "0x3333333333333333333333333333333333333333",
      data: "0x9abc",
    });
    
    const nestedDemandData = {
      arbiters: [mockAddresses.trustedOracleArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
      demands: [trustedOracleDemand, "0x"] as `0x${string}`[],
    };

    const composedDemand: Demand = {
      arbiter: mockAddresses.anyArbiter,
      demand: AnyArbiterCodec.encode(nestedDemandData),
    };

    const parsed = DemandParsingUtils.parseComposedDemand(composedDemand, registry);
    const allArbiters = DemandParsingUtils.getAllArbiters(parsed);

    expect(allArbiters).toHaveLength(3);
    expect(allArbiters).toContain(mockAddresses.anyArbiter);
    expect(allArbiters).toContain(mockAddresses.trustedOracleArbiter);
    expect(allArbiters).toContain(mockAddresses.trivialArbiter);
  });

  test("should check if demand is fully parseable", () => {
    const registry = createDefaultArbiterRegistry(mockAddresses);
    
    // Parseable demand
    const parseableDemand: Demand = {
      arbiter: mockAddresses.trivialArbiter,
      demand: "0x",
    };

    const parsedParseable = DemandParsingUtils.parseComposedDemand(parseableDemand, registry);
    expect(DemandParsingUtils.isFullyParseable(parsedParseable)).toBe(true);

    // Unknown demand
    const unknownDemand: Demand = {
      arbiter: "0x9999999999999999999999999999999999999999",
      demand: "0x",
    };

    const parsedUnknown = DemandParsingUtils.parseComposedDemand(unknownDemand, registry);
    expect(DemandParsingUtils.isFullyParseable(parsedUnknown)).toBe(false);
  });

  test("should generate structure description", () => {
    const registry = createDefaultArbiterRegistry(mockAddresses);
    
    // Create actual encoded demands instead of empty "0x"
    const trustedOracleDemand = TrustedOracleArbiterCodec.encode({
      oracle: "0x4444444444444444444444444444444444444444",
      data: "0xdef0",
    });
    
    const nestedDemandData = {
      arbiters: [mockAddresses.trustedOracleArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
      demands: [trustedOracleDemand, "0x"] as `0x${string}`[],
    };

    const composedDemand: Demand = {
      arbiter: mockAddresses.anyArbiter,
      demand: AnyArbiterCodec.encode(nestedDemandData),
    };

    const parsed = DemandParsingUtils.parseComposedDemand(composedDemand, registry);
    const description = DemandParsingUtils.getStructureDescription(parsed);

    expect(description).toContain(mockAddresses.anyArbiter);
    expect(description).toContain(mockAddresses.trustedOracleArbiter);
    expect(description).toContain(mockAddresses.trivialArbiter);
  });
});