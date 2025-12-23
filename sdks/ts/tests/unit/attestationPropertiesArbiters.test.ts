/**
 * Attestation Properties Arbiters Unit Tests
 *
 * This file contains tests for the arbiters client functionality, including:
 * - AttesterArbiter
 * - ExpirationTimeAfterArbiter / ExpirationTimeBeforeArbiter / ExpirationTimeEqualArbiter
 * - RecipientArbiter
 * - RefUidArbiter
 * - RevocableArbiter
 * - SchemaArbiter
 * - TimeAfterArbiter / TimeBeforeArbiter / TimeEqualArbiter
 * - UidArbiter
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { setupTestEnvironment, type TestContext } from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";

describe("Attestation Properties Arbiters Tests", () => {
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;

  beforeEach(async () => {
    testContext = await setupTestEnvironment();

    // Generate test accounts
    const alicePrivateKey = generatePrivateKey();
    const bobPrivateKey = generatePrivateKey();
    alice = privateKeyToAddress(alicePrivateKey);
    bob = privateKeyToAddress(bobPrivateKey);
  });

  afterEach(async () => {
    await teardownTestEnvironment(testContext);
  });

  describe("AttesterArbiter", () => {
    test("should encode and decode AttesterArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        attester: bob,
      };

      // Test encoding
      const encoded = client.arbiters.attestationProperties.attester.encodeDemand(originalDemand);
      expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

      // Test decoding
      const decoded = client.arbiters.attestationProperties.attester.decodeDemand(encoded);
      expect(decoded.attester).toBe(originalDemand.attester);
    });
  });

  describe("ExpirationTimeAfterArbiter", () => {
    test("should encode and decode ExpirationTimeAfterArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        expirationTime: 1735689600n, // BigInt timestamp
      };

      const encoded = client.arbiters.attestationProperties.expirationTimeAfter.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.expirationTimeAfter.decodeDemand(encoded);

      expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
    });
  });

  describe("ExpirationTimeBeforeArbiter", () => {
    test("should encode and decode ExpirationTimeBeforeArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        expirationTime: 2000000000n,
      };

      const encoded = client.arbiters.attestationProperties.expirationTimeBefore.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.expirationTimeBefore.decodeDemand(encoded);

      expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
    });
  });

  describe("ExpirationTimeEqualArbiter", () => {
    test("should encode and decode ExpirationTimeEqualArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        expirationTime: 4000000000n,
      };

      const encoded = client.arbiters.attestationProperties.expirationTimeEqual.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.expirationTimeEqual.decodeDemand(encoded);

      expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
    });
  });

  describe("RecipientArbiter", () => {
    test("should encode and decode RecipientArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        recipient: bob,
      };

      const encoded = client.arbiters.attestationProperties.recipient.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.recipient.decodeDemand(encoded);

      expect(decoded.recipient).toBe(originalDemand.recipient);
    });
  });

  describe("RefUidArbiter", () => {
    test("should encode and decode RefUidArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        refUID: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd" as `0x${string}`,
      };

      const encoded = client.arbiters.attestationProperties.refUid.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.refUid.decodeDemand(encoded);

      expect(decoded.refUID).toBe(originalDemand.refUID);
    });
  });

  describe("RevocableArbiter", () => {
    test("should encode and decode RevocableArbiter demand data with true", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        revocable: true,
      };

      const encoded = client.arbiters.attestationProperties.revocable.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.revocable.decodeDemand(encoded);

      expect(decoded.revocable).toBe(originalDemand.revocable);
    });

    test("should handle false revocable value", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        revocable: false,
      };

      const encoded = client.arbiters.attestationProperties.revocable.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.revocable.decodeDemand(encoded);

      expect(decoded.revocable).toBe(false);
    });
  });

  describe("SchemaArbiter", () => {
    test("should encode and decode SchemaArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        schema: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef" as `0x${string}`,
      };

      const encoded = client.arbiters.attestationProperties.schema.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.schema.decodeDemand(encoded);

      expect(decoded.schema).toBe(originalDemand.schema);
    });
  });

  describe("TimeAfterArbiter", () => {
    test("should encode and decode TimeAfterArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        time: 1735689600n,
      };

      const encoded = client.arbiters.attestationProperties.timeAfter.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.timeAfter.decodeDemand(encoded);

      expect(decoded.time).toBe(originalDemand.time);
    });
  });

  describe("TimeBeforeArbiter", () => {
    test("should encode and decode TimeBeforeArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        time: 1234567890n,
      };

      const encoded = client.arbiters.attestationProperties.timeBefore.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.timeBefore.decodeDemand(encoded);

      expect(decoded.time).toBe(originalDemand.time);
    });
  });

  describe("TimeEqualArbiter", () => {
    test("should encode and decode TimeEqualArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        time: 5555555555n,
      };

      const encoded = client.arbiters.attestationProperties.timeEqual.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.timeEqual.decodeDemand(encoded);

      expect(decoded.time).toBe(originalDemand.time);
    });
  });

  describe("UidArbiter", () => {
    test("should encode and decode UidArbiter demand data correctly", () => {
      const client = testContext.alice.client;

      const originalDemand = {
        uid: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba" as `0x${string}`,
      };

      const encoded = client.arbiters.attestationProperties.uid.encodeDemand(originalDemand);
      const decoded = client.arbiters.attestationProperties.uid.decodeDemand(encoded);

      expect(decoded.uid).toBe(originalDemand.uid);
    });
  });

  describe("Error handling", () => {
    test("should throw error for invalid hex data", () => {
      const client = testContext.alice.client;

      expect(() => {
        client.arbiters.attestationProperties.attester.decodeDemand("invalid-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for insufficient data", () => {
      const client = testContext.alice.client;

      expect(() => {
        client.arbiters.attestationProperties.attester.decodeDemand("0x123" as `0x${string}`);
      }).toThrow();
    });
  });

  describe("Integration with manual encoding", () => {
    test("should produce same result as manual ABI encoding", () => {
      const client = testContext.alice.client;

      const demand = {
        attester: alice,
      };

      // Manual encoding using viem directly
      const manualEncoded = encodeAbiParameters(parseAbiParameters("(address attester)"), [demand]);

      // SDK encoding
      const sdkEncoded = client.arbiters.attestationProperties.attester.encodeDemand(demand);

      expect(sdkEncoded).toBe(manualEncoded);
    });
  });
});
