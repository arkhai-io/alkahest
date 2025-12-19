import { describe, test, expect } from "bun:test";
import {
  createDecodersFromAddresses,
  decodeDemand,
  decodeDemandWithAddresses,
  AllArbiter,
  AnyArbiter,
} from "../../src";
import { encodeDemand as encodeTrustedOracleDemand } from "../../src/clients/arbiters/general/trustedOracle";
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

  describe("Static Codec Functions", () => {
    test("should encode and decode AnyArbiter demands using static codec", () => {
      const demand = {
        arbiters: [
          "0x1111111111111111111111111111111111111111",
          "0x2222222222222222222222222222222222222222",
        ] as `0x${string}`[],
        demands: ["0x", "0x"] as `0x${string}`[],
      };

      const encoded = AnyArbiter.encodeDemand(demand);
      const decoded = AnyArbiter.decodeDemand(encoded);

      expect(decoded.arbiters).toEqual(demand.arbiters);
      expect(decoded.demands).toEqual(demand.demands);
    });

    test("should encode and decode AllArbiter demands using static codec", () => {
      const demand = {
        arbiters: [
          "0x1111111111111111111111111111111111111111",
          "0x2222222222222222222222222222222222222222",
        ] as `0x${string}`[],
        demands: ["0x", "0x"] as `0x${string}`[],
      };

      const encoded = AllArbiter.encodeDemand(demand);
      const decoded = AllArbiter.decodeDemand(encoded);

      expect(decoded.arbiters).toEqual(demand.arbiters);
      expect(decoded.demands).toEqual(demand.demands);
    });

    test("AnyArbiter decoded result should include children array", () => {
      const demand = {
        arbiters: [
          "0x1111111111111111111111111111111111111111",
          "0x2222222222222222222222222222222222222222",
        ] as `0x${string}`[],
        demands: ["0xabcd", "0x1234"] as `0x${string}`[],
      };

      const encoded = AnyArbiter.encodeDemand(demand);
      const decoded = AnyArbiter.decodeDemand(encoded);

      expect(decoded.children).toBeDefined();
      expect(decoded.children).toHaveLength(2);
      expect(decoded.children[0].arbiter).toBe(demand.arbiters[0]);
      expect(decoded.children[0].demand).toBe(demand.demands[0]);
      expect(decoded.children[1].arbiter).toBe(demand.arbiters[1]);
      expect(decoded.children[1].demand).toBe(demand.demands[1]);
    });
  });

  describe("Decoders Record Creation", () => {
    test("should create decoders record from addresses", () => {
      const decoders = createDecodersFromAddresses(mockAddresses);

      // Logical arbiters should be registered
      expect(decoders[mockAddresses.anyArbiter.toLowerCase() as `0x${string}`]).toBeDefined();
      expect(decoders[mockAddresses.allArbiter.toLowerCase() as `0x${string}`]).toBeDefined();

      // TrustedOracleArbiter should be registered
      expect(decoders[mockAddresses.trustedOracleArbiter.toLowerCase() as `0x${string}`]).toBeDefined();
    });

    test("should return empty result for unknown arbiter", () => {
      const decoders = createDecodersFromAddresses(mockAddresses);

      const unknownDemand: Demand = {
        arbiter: "0x9999999999999999999999999999999999999999",
        demand: "0x",
      };

      const result = decodeDemand(unknownDemand, decoders);

      expect(result.isUnknown).toBe(true);
      expect(result.arbiter).toBe(unknownDemand.arbiter);
      expect(result.decoded).toEqual({ raw: "0x" });
    });
  });

  describe("Demand Decoding", () => {
    test("should decode simple TrustedOracleArbiter demand", () => {
      const trustedOracleDemandData = {
        oracle: "0x1111111111111111111111111111111111111111" as `0x${string}`,
        data: "0x1234" as `0x${string}`,
      };

      const encodedDemand = encodeTrustedOracleDemand(trustedOracleDemandData);

      const demand: Demand = {
        arbiter: mockAddresses.trustedOracleArbiter,
        demand: encodedDemand,
      };

      const result = decodeDemandWithAddresses(demand, mockAddresses);

      expect(result.arbiter).toBe(mockAddresses.trustedOracleArbiter);
      expect(result.isUnknown).toBeUndefined();
      expect((result.decoded as any).oracle.toLowerCase()).toBe(trustedOracleDemandData.oracle.toLowerCase());
      expect(result.decoded).toHaveProperty("data");
    });

    test("should decode composed demand with nested arbiters", () => {
      // Create TrustedOracle demand for nested arbiter
      const trustedOracleDemand = encodeTrustedOracleDemand({
        oracle: "0x1111111111111111111111111111111111111111",
        data: "0x1234",
      });

      // Create a nested demand structure with AnyArbiter
      const nestedDemandData = {
        arbiters: [mockAddresses.trustedOracleArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
        demands: [trustedOracleDemand, "0x"] as `0x${string}`[],
      };

      const composedDemand: Demand = {
        arbiter: mockAddresses.anyArbiter,
        demand: AnyArbiter.encodeDemand(nestedDemandData),
      };

      const result = decodeDemandWithAddresses(composedDemand, mockAddresses);

      expect(result.arbiter).toBe(mockAddresses.anyArbiter);
      expect(result.children).toBeDefined();
      expect(result.children).toHaveLength(2);
      expect(result.children![0].arbiter).toBe(mockAddresses.trustedOracleArbiter);
      expect(result.children![1].arbiter).toBe(mockAddresses.trivialArbiter);
    });

    test("should handle deeply nested demands with AllArbiter", () => {
      // Create TrustedOracle demand
      const trustedOracleDemand = encodeTrustedOracleDemand({
        oracle: "0x3333333333333333333333333333333333333333",
        data: "0x9abc",
      });

      // Create inner AnyArbiter demand
      const innerAnyDemand = AnyArbiter.encodeDemand({
        arbiters: [mockAddresses.trustedOracleArbiter] as `0x${string}`[],
        demands: [trustedOracleDemand] as `0x${string}`[],
      });

      // Create outer AllArbiter demand containing the AnyArbiter
      const outerDemand: Demand = {
        arbiter: mockAddresses.allArbiter,
        demand: AllArbiter.encodeDemand({
          arbiters: [mockAddresses.anyArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
          demands: [innerAnyDemand, "0x"] as `0x${string}`[],
        }),
      };

      const result = decodeDemandWithAddresses(outerDemand, mockAddresses);

      expect(result.arbiter).toBe(mockAddresses.allArbiter);
      expect(result.children).toHaveLength(2);
      expect(result.children![0].arbiter).toBe(mockAddresses.anyArbiter);
      // The nested AnyArbiter should have its own children
      expect(result.children![0].children).toBeDefined();
    });
  });

  describe("Helper Functions", () => {
    test("should collect all arbiters from a decoded demand tree", () => {
      const trustedOracleDemand = encodeTrustedOracleDemand({
        oracle: "0x4444444444444444444444444444444444444444",
        data: "0xdef0",
      });

      const nestedDemandData = {
        arbiters: [mockAddresses.trustedOracleArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
        demands: [trustedOracleDemand, "0x"] as `0x${string}`[],
      };

      const composedDemand: Demand = {
        arbiter: mockAddresses.anyArbiter,
        demand: AnyArbiter.encodeDemand(nestedDemandData),
      };

      const result = decodeDemandWithAddresses(composedDemand, mockAddresses);

      // Helper function to collect all arbiters recursively
      const collectArbiters = (decoded: typeof result): `0x${string}`[] => {
        const arbiters: `0x${string}`[] = [decoded.arbiter];
        if (decoded.children) {
          for (const child of decoded.children) {
            arbiters.push(...collectArbiters(child));
          }
        }
        return arbiters;
      };

      const allArbiters = collectArbiters(result);

      expect(allArbiters).toHaveLength(3);
      expect(allArbiters).toContain(mockAddresses.anyArbiter);
      expect(allArbiters).toContain(mockAddresses.trustedOracleArbiter);
      expect(allArbiters).toContain(mockAddresses.trivialArbiter);
    });

    test("should identify unknown arbiters in the tree", () => {
      const unknownArbiter = "0x9999999999999999999999999999999999999999" as `0x${string}`;

      const nestedDemandData = {
        arbiters: [unknownArbiter, mockAddresses.trivialArbiter] as `0x${string}`[],
        demands: ["0xdeadbeef", "0x"] as `0x${string}`[],
      };

      const composedDemand: Demand = {
        arbiter: mockAddresses.anyArbiter,
        demand: AnyArbiter.encodeDemand(nestedDemandData),
      };

      const result = decodeDemandWithAddresses(composedDemand, mockAddresses);

      // The AnyArbiter itself should be decoded
      expect(result.isUnknown).toBeUndefined();

      // Check children - one should be unknown
      expect(result.children).toHaveLength(2);
      expect(result.children![0].isUnknown).toBe(true);
      expect(result.children![0].decoded).toEqual({ raw: "0xdeadbeef" });
    });

    test("should check if entire demand tree is fully parseable", () => {
      // All known arbiters
      const trustedOracleDemand = encodeTrustedOracleDemand({
        oracle: "0x5555555555555555555555555555555555555555",
        data: "0x",
      });

      const fullyParseableDemand: Demand = {
        arbiter: mockAddresses.anyArbiter,
        demand: AnyArbiter.encodeDemand({
          arbiters: [mockAddresses.trustedOracleArbiter] as `0x${string}`[],
          demands: [trustedOracleDemand] as `0x${string}`[],
        }),
      };

      const result = decodeDemandWithAddresses(fullyParseableDemand, mockAddresses);

      // Helper to check if fully parseable
      const isFullyParseable = (decoded: typeof result): boolean => {
        if (decoded.isUnknown) return false;
        if (decoded.children) {
          return decoded.children.every((child) => isFullyParseable(child));
        }
        return true;
      };

      expect(isFullyParseable(result)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty demands array in composing arbiter", () => {
      const emptyDemand: Demand = {
        arbiter: mockAddresses.anyArbiter,
        demand: AnyArbiter.encodeDemand({
          arbiters: [] as `0x${string}`[],
          demands: [] as `0x${string}`[],
        }),
      };

      const result = decodeDemandWithAddresses(emptyDemand, mockAddresses);

      expect(result.arbiter).toBe(mockAddresses.anyArbiter);
      expect(result.children).toBeDefined();
      expect(result.children).toHaveLength(0);
    });

    test("should handle single arbiter in composing demand", () => {
      const singleDemand: Demand = {
        arbiter: mockAddresses.allArbiter,
        demand: AllArbiter.encodeDemand({
          arbiters: [mockAddresses.trivialArbiter] as `0x${string}`[],
          demands: ["0x"] as `0x${string}`[],
        }),
      };

      const result = decodeDemandWithAddresses(singleDemand, mockAddresses);

      expect(result.children).toHaveLength(1);
      expect(result.children![0].arbiter).toBe(mockAddresses.trivialArbiter);
    });
  });
});
