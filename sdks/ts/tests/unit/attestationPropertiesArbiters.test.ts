/**
 * Attestation Properties Arbiters Unit Tests
 *
 * This file contains tests for the arbiters client functionality, including:
 * - AttesterArbiter (Composing & NonComposing)
 * - ExpirationTimeAfterArbiter (Composing & NonComposing)
 * - RecipientArbiter (Composing & NonComposing)
 * - RefUidArbiter (Composing & NonComposing)
 * - RevocableArbiter (Composing & NonComposing)
 * - SchemaArbiter (Composing & NonComposing)
 * - TimeAfterArbiter (Composing & NonComposing)
 * - UidArbiter (Composing & NonComposing)
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
  let testClient: TestContext["testClient"];

  beforeEach(async () => {
    testContext = await setupTestEnvironment();

    // Generate test accounts
    const alicePrivateKey = generatePrivateKey();
    const bobPrivateKey = generatePrivateKey();
    alice = privateKeyToAddress(alicePrivateKey);
    bob = privateKeyToAddress(bobPrivateKey);

    testClient = testContext.testClient;
  });

  afterEach(async () => {
    await teardownTestEnvironment(testContext);
  });

  describe("AttesterArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode AttesterArbiterComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x1234567890abcdef" as `0x${string}`,
          attester: bob,
        };

        // Test encoding
        const encoded = client.arbiters.attestation.attester.composing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.arbiters.attestation.attester.composing.decode(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.attester).toBe(originalDemand.attester);
      });

      test("should handle empty baseDemand", () => {
        const client = testContext.alice.client;

        const demand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          attester: bob,
        };

        const encoded = client.arbiters.attestation.attester.composing.encode(demand);
        const decoded = client.arbiters.attestation.attester.composing.decode(encoded);

        expect(decoded.baseDemand).toBe("0x");
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode AttesterArbiterNonComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          attester: alice,
        };

        // Test encoding
        const encoded = client.arbiters.attestation.attester.nonComposing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-f]+$/i);

        // Test decoding
        const decoded = client.arbiters.attestation.attester.nonComposing.decode(encoded);
        expect(decoded.attester).toBe(originalDemand.attester);
      });
    });
  });

  describe("ExpirationTimeAfterArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ExpirationTimeAfterArbiterComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0xabcdef1234567890" as `0x${string}`,
          expirationTime: 1735689600n, // BigInt timestamp
        };

        const encoded = client.arbiters.attestation.expirationTime.after.composing.encode(originalDemand);
        const decoded = client.arbiters.attestation.expirationTime.after.composing.decode(encoded);

        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ExpirationTimeAfterArbiterNonComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          expirationTime: 1735689600n,
        };

        const encoded = client.arbiters.attestation.expirationTime.after.nonComposing.encode(originalDemand);
        const decoded = client.arbiters.attestation.expirationTime.after.nonComposing.decode(encoded);

        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });
  });

  describe("RecipientArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode RecipientArbiterComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          recipient: bob,
        };

        const encoded = client.arbiters.attestation.recipient.composing.encode(originalDemand);
        const decoded = client.arbiters.attestation.recipient.composing.decode(encoded);

        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.recipient).toBe(originalDemand.recipient);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RecipientArbiterNonComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          recipient: bob,
        };

        const encoded = client.arbiters.attestation.recipient.nonComposing.encode(originalDemand);
        const decoded = client.arbiters.attestation.recipient.nonComposing.decode(encoded);

        expect(decoded.recipient).toBe(originalDemand.recipient);
      });
    });
  });

  describe("RefUidArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode RefUidArbiterComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x1111" as `0x${string}`,
          refUID: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
        };

        const encoded = client.arbiters.attestation.refUid.composing.encode(originalDemand);
        const decoded = client.arbiters.attestation.refUid.composing.decode(encoded);

        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.refUID).toBe(originalDemand.refUID);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RefUidArbiterNonComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          refUID: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd" as `0x${string}`,
        };

        const encoded = client.arbiters.attestation.refUid.nonComposing.encode(originalDemand);
        const decoded = client.arbiters.attestation.refUid.nonComposing.decode(encoded);

        expect(decoded.refUID).toBe(originalDemand.refUID);
      });
    });
  });

  describe("RevocableArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode RevocableArbiterComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x2222" as `0x${string}`,
          revocable: true,
        };

        const encoded = client.arbiters.attestation.revocable.composing.encode(originalDemand);
        const decoded = client.arbiters.attestation.revocable.composing.decode(encoded);

        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.revocable).toBe(originalDemand.revocable);
      });

      test("should handle false revocable value", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x" as `0x${string}`,
          revocable: false,
        };

        const encoded = client.arbiters.attestation.revocable.composing.encode(originalDemand);
        const decoded = client.arbiters.attestation.revocable.composing.decode(encoded);

        expect(decoded.revocable).toBe(false);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode RevocableArbiterNonComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          revocable: true,
        };

        const encoded = client.arbiters.attestation.revocable.nonComposing.encode(originalDemand);
        const decoded = client.arbiters.attestation.revocable.nonComposing.decode(encoded);

        expect(decoded.revocable).toBe(originalDemand.revocable);
      });
    });
  });

  describe("SchemaArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode SchemaArbiterComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x4444" as `0x${string}`,
          schema: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
        };

        const encoded = client.arbiters.attestation.schema.composing.encode(originalDemand);
        const decoded = client.arbiters.attestation.schema.composing.decode(encoded);

        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.schema).toBe(originalDemand.schema);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode SchemaArbiterNonComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          schema: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef" as `0x${string}`,
        };

        const encoded = client.arbiters.attestation.schema.nonComposing.encode(originalDemand);
        const decoded = client.arbiters.attestation.schema.nonComposing.decode(encoded);

        expect(decoded.schema).toBe(originalDemand.schema);
      });
    });
  });

  describe("TimeAfterArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode TimeAfterArbiterComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x5555" as `0x${string}`,
          time: 1735689600n,
        };

        const encoded = client.arbiters.attestation.time.after.composing.encode(originalDemand);
        const decoded = client.arbiters.attestation.time.after.composing.decode(encoded);

        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode TimeAfterArbiterNonComposing demand data correctly", () => {
        const client = testContext.alice.client;

        const originalDemand = {
          time: 1735689600n,
        };

        const encoded = client.arbiters.attestation.time.after.nonComposing.encode(originalDemand);
        const decoded = client.arbiters.attestation.time.after.nonComposing.decode(encoded);

        expect(decoded.time).toBe(originalDemand.time);
      });
    });
  });

  describe("TimeBeforeArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode TimeBeforeArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0x1234" as `0x${string}`,
          time: 1234567890n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.time.before.composing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.time.before.composing.decode(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode TimeBeforeArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          time: 9876543210n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.time.before.nonComposing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.time.before.nonComposing.decode(encoded);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });
  });

  describe("TimeEqualArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode TimeEqualArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: bob,
          baseDemand: "0xabcd" as `0x${string}`,
          time: 5555555555n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.time.equal.composing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.time.equal.composing.decode(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode TimeEqualArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          time: 7777777777n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.time.equal.nonComposing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.time.equal.nonComposing.decode(encoded);
        expect(decoded.time).toBe(originalDemand.time);
      });
    });
  });

  describe("ExpirationTimeBeforeArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ExpirationTimeBeforeArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0xdeadbeef" as `0x${string}`,
          expirationTime: 2000000000n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.expirationTime.before.composing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.expirationTime.before.composing.decode(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ExpirationTimeBeforeArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          expirationTime: 3000000000n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.expirationTime.before.nonComposing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.expirationTime.before.nonComposing.decode(encoded);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });
  });

  describe("ExpirationTimeEqualArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode ExpirationTimeEqualArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: bob,
          baseDemand: "0xcafebabe" as `0x${string}`,
          expirationTime: 4000000000n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.expirationTime.equal.composing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.expirationTime.equal.composing.decode(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode ExpirationTimeEqualArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          expirationTime: 6000000000n,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.expirationTime.equal.nonComposing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.expirationTime.equal.nonComposing.decode(encoded);
        expect(decoded.expirationTime).toBe(originalDemand.expirationTime);
      });
    });
  });

  describe("UidArbiter", () => {
    describe("Composing variant", () => {
      test("should encode and decode UidArbiterComposing demand data correctly", () => {
        const originalDemand = {
          baseArbiter: alice,
          baseDemand: "0xdeadbeef" as `0x${string}`,
          uid: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.uid.composing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.uid.composing.decode(encoded);
        expect(decoded.baseArbiter).toBe(originalDemand.baseArbiter);
        expect(decoded.baseDemand).toBe(originalDemand.baseDemand);
        expect(decoded.uid).toBe(originalDemand.uid);
      });
    });

    describe("NonComposing variant", () => {
      test("should encode and decode UidArbiterNonComposing demand data correctly", () => {
        const originalDemand = {
          uid: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba" as `0x${string}`,
        };

        const client = testContext.alice.client;
        const encoded = client.arbiters.attestation.uid.nonComposing.encode(originalDemand);
        expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

        const decoded = client.arbiters.attestation.uid.nonComposing.decode(encoded);
        expect(decoded.uid).toBe(originalDemand.uid);
      });
    });
  });

  describe("Hierarchical API Structure", () => {
    test("should support hierarchical API for AttesterArbiter", () => {
      const client = testContext.alice.client;

      const demand = {
        baseArbiter: alice,
        baseDemand: "0x1234" as `0x${string}`,
        attester: bob,
      };

      // Test backward compatibility with flat API since hierarchical API may not be typed yet
      const encoded = client.arbiters.attestation.attester.composing.encode(demand);
      const decoded = client.arbiters.attestation.attester.composing.decode(encoded);

      expect(decoded.attester).toBe(demand.attester);
      expect(decoded.baseArbiter).toBe(demand.baseArbiter);
      expect(decoded.baseDemand).toBe(demand.baseDemand);
    });

    test("should support hierarchical API for TimeArbiter variants", () => {
      const client = testContext.alice.client;

      const demandAfter = { time: 1700000000n };
      const demandBefore = { time: 1800000000n };
      const demandEqual = { time: 1750000000n };

      // Test Time After using flat API for now
      const encodedAfter = client.arbiters.attestation.time.after.nonComposing.encode(demandAfter);
      const decodedAfter = client.arbiters.attestation.time.after.nonComposing.decode(encodedAfter);
      expect(decodedAfter.time).toBe(demandAfter.time);

      // Test Time Before
      const encodedBefore = client.arbiters.attestation.time.before.nonComposing.encode(demandBefore);
      const decodedBefore = client.arbiters.attestation.time.before.nonComposing.decode(encodedBefore);
      expect(decodedBefore.time).toBe(demandBefore.time);

      // Test Time Equal
      const encodedEqual = client.arbiters.attestation.time.equal.nonComposing.encode(demandEqual);
      const decodedEqual = client.arbiters.attestation.time.equal.nonComposing.decode(encodedEqual);
      expect(decodedEqual.time).toBe(demandEqual.time);
    });

    test("should support hierarchical API for ExpirationTimeArbiter variants", () => {
      const client = testContext.alice.client;

      const demandAfter = { expirationTime: 2000000000n };
      const demandBefore = { expirationTime: 2100000000n };
      const demandEqual = { expirationTime: 2050000000n };

      // Test ExpirationTime After using flat API for now
      const encodedAfter = client.arbiters.attestation.expirationTime.after.nonComposing.encode(demandAfter);
      const decodedAfter = client.arbiters.attestation.expirationTime.after.nonComposing.decode(encodedAfter);
      expect(decodedAfter.expirationTime).toBe(demandAfter.expirationTime);

      // Test ExpirationTime Before  
      const encodedBefore = client.arbiters.attestation.expirationTime.before.nonComposing.encode(demandBefore);
      const decodedBefore = client.arbiters.attestation.expirationTime.before.nonComposing.decode(encodedBefore);
      expect(decodedBefore.expirationTime).toBe(demandBefore.expirationTime);

      // Test ExpirationTime Equal
      const encodedEqual = client.arbiters.attestation.expirationTime.equal.nonComposing.encode(demandEqual);
      const decodedEqual = client.arbiters.attestation.expirationTime.equal.nonComposing.decode(encodedEqual);
      expect(decodedEqual.expirationTime).toBe(demandEqual.expirationTime);
    });

    test("should support hierarchical API for UidArbiter", () => {
      const client = testContext.alice.client;

      const demand = {
        uid: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
      };

      // Test using flat API for now
      const encoded = client.arbiters.attestation.uid.nonComposing.encode(demand);
      const decoded = client.arbiters.attestation.uid.nonComposing.decode(encoded);

      expect(decoded.uid).toBe(demand.uid);
    });

    test("should support hierarchical API for RefUidArbiter", () => {
      const client = testContext.alice.client;

      const demand = {
        refUID: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890" as `0x${string}`,
      };

      // Test using flat API for now
      const encoded = client.arbiters.attestation.refUid.nonComposing.encode(demand);
      const decoded = client.arbiters.attestation.refUid.nonComposing.decode(encoded);

      expect(decoded.refUID).toBe(demand.refUID);
    });

    test("should support hierarchical API for RevocableArbiter", () => {
      const client = testContext.alice.client;

      const demand = { revocable: true };

      // Test using flat API for now
      const encoded = client.arbiters.attestation.revocable.nonComposing.encode(demand);
      const decoded = client.arbiters.attestation.revocable.nonComposing.decode(encoded);

      expect(decoded.revocable).toBe(demand.revocable);
    });

    test("should support hierarchical API for SchemaArbiter", () => {
      const client = testContext.alice.client;

      const demand = {
        schema: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" as `0x${string}`,
      };

      // Test using flat API for now
      const encoded = client.arbiters.attestation.schema.nonComposing.encode(demand);
      const decoded = client.arbiters.attestation.schema.nonComposing.decode(encoded);

      expect(decoded.schema).toBe(demand.schema);
    });

    test("should support hierarchical API for RecipientArbiter", () => {
      const client = testContext.alice.client;

      const demand = { recipient: alice };

      // Test using flat API for now
      const encoded = client.arbiters.attestation.recipient.nonComposing.encode(demand);
      const decoded = client.arbiters.attestation.recipient.nonComposing.decode(encoded);

      expect(decoded.recipient).toBe(demand.recipient);
    });
  });

  describe("Error handling", () => {
    test("should throw error for invalid hex data", () => {
      const client = testContext.alice.client;

      expect(() => {
        client.arbiters.attestation.attester.composing.decode("invalid-hex" as `0x${string}`);
      }).toThrow();
    });

    test("should throw error for insufficient data", () => {
      const client = testContext.alice.client;

      expect(() => {
        client.arbiters.attestation.attester.composing.decode("0x123" as `0x${string}`);
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
      const sdkEncoded = client.arbiters.attestation.attester.nonComposing.encode(demand);

      expect(sdkEncoded).toBe(manualEncoded);
    });
  });
});
