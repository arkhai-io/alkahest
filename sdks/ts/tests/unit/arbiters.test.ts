/**
 * Arbiters Unit Tests
 *
 * This file contains tests for the arbiter client functionality, including:
 * - TrivialArbiter
 * - TrustedOracleArbiter
 * - IntrinsicsArbiter2
 * - AnyArbiter
 * - AllArbiter
 *
 * These tests mirror the solidity tests in test/unit/arbiters
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { abi as allArbiterAbi } from "../../src/contracts/arbiters/logical/AllArbiter";
import { abi as anyArbiterAbi } from "../../src/contracts/arbiters/logical/AnyArbiter";
import { abi as intrinsicsArbiter2Abi } from "../../src/contracts/arbiters/IntrinsicsArbiter2";
// Import contract artifacts needed for tests
import { abi as trivialArbiterAbi } from "../../src/contracts/arbiters/TrivialArbiter";
import { abi as trustedOracleArbiterAbi } from "../../src/contracts/arbiters/TrustedOracleArbiter";
import { setupTestEnvironment, type TestContext } from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";

describe("Arbiters Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["alice"]["client"];
  let bobClient: TestContext["bob"]["client"];
  let testClient: TestContext["testClient"];

  // Additional oracle account
  let oracle: `0x${string}`;
  let oracleClient: (typeof testContext)["alice"]["client"];

  beforeEach(async () => {
    // Setup fresh test environment for each test
    testContext = await setupTestEnvironment();

    // Extract the values we need for tests
    alice = testContext.alice.address;
    bob = testContext.bob.address;
    aliceClient = testContext.alice.client;
    bobClient = testContext.bob.client;
    testClient = testContext.testClient;

    // We'll use Bob as the oracle for simplicity
    oracle = bob;
    oracleClient = bobClient;
  });

  beforeEach(async () => {
    // Reset to initial state before each test
    if (testContext.anvilInitState) {
      await testContext.testClient.loadState({
        state: testContext.anvilInitState,
      });
    }
  });

  afterEach(async () => {
    // Clean up after each test
    await teardownTestEnvironment(testContext);
  });

  describe("TrivialArbiter", () => {
    // Mirrors test/unit/arbiters/TrivialArbiter.t.sol
    test("testCheckObligationAlwaysReturnsTrue", async () => {
      // Create mock data structures - from Solidity test lines 91-92
      const mockUid = "0x1234567890123456789012345678901234567890123456789012345678901234" as `0x${string}`;
      const mockSchema = "0x1234567890123456789012345678901234567890123456789012345678901234" as `0x${string}`;

      // Create a complete Attestation struct - matches line 93-94
      const attestation = {
        uid: mockUid,
        schema: mockSchema,
        time: 0n,
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient: testContext.alice.address,
        attester: testContext.bob.address,
        revocable: true,
        data: "0x1234" as `0x${string}`,
      };

      const demand = "0x1234" as `0x${string}`;
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

      // Call checkObligation and verify it returns true - line 95
      const result = await testContext.testClient.readContract({
        address: testContext.addresses.trivialArbiter,
        abi: trivialArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckObligationCanCallReadFunction", async () => {
      // Create mock data
      const mockAttestation = {
        uid: "0x1234567890123456789012345678901234567890123456789012345678901234" as `0x${string}`,
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as `0x${string}`,
        time: 0n,
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        recipient: testContext.alice.address,
        attester: testContext.bob.address,
        revocable: true,
        data: "0x1234" as `0x${string}`,
      };

      const result = await testContext.testClient.readContract({
        address: testContext.addresses.trivialArbiter,
        abi: trivialArbiterAbi.abi,
        functionName: "checkObligation",
        args: [
          mockAttestation,
          "0x1234" as `0x${string}`,
          "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`,
        ],
      });

      expect(result).toBe(true);
    });
  });

  describe("TrustedOracleArbiter", () => {
    // Mirrors test/unit/arbiters/TrustedOracleArbiter.t.sol
    const statementUid = "0x0000000000000000000000000000000000000000000000000000000000000001" as const;

    test("testConstructor", async () => {
      // Create an attestation with the statement UID
      const attestation = {
        uid: statementUid,
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
        data: "0x" as const,
      };

      // Encode demand data
      const demand = oracleClient.arbiters.general.trustedOracle.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement - should be false initially since no decision has been made
      const result = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      // Should be false initially
      expect(result).toBe(false);
    });

    test("testArbitrate", async () => {
      // Create an attestation with the statement UID
      const attestation = {
        uid: statementUid,
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data
      const demandData = {
        oracle: oracle,
        data: "0x" as const,
      };

      // Encode demand data
      const demand = oracleClient.arbiters.general.trustedOracle.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Initially the decision should be false (default value)
      const initialResult = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(initialResult).toBe(false);

      // Make a positive arbitration decision
      const arbitrateHash = await oracleClient.arbiters.general.trustedOracle.arbitrate(statementUid, demand, true);

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash,
      });

      // Now the decision should be true
      const finalResult = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(finalResult).toBe(true);
    });

    test("testCheckObligationWithDifferentOracles", async () => {
      // Set up two different oracles with different decisions
      const oracle1 = oracle;
      const oracle2 = alice;

      // Oracle 1 makes a positive decision (using demand1 which will be encoded below)
      const demandData1 = {
        oracle: oracle1,
        data: "0x" as const,
      };
      const demand1 = oracleClient.arbiters.general.trustedOracle.encodeDemand(demandData1);
      const arbitrateHash1 = await oracleClient.arbiters.general.trustedOracle.arbitrate(statementUid, demand1, true);

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash1,
      });

      // Oracle 2 makes a negative decision
      const demandData2 = {
        oracle: oracle2,
        data: "0x" as const,
      };
      const demand2 = aliceClient.arbiters.general.trustedOracle.encodeDemand(demandData2);
      const arbitrateHash2 = await aliceClient.arbiters.general.trustedOracle.arbitrate(statementUid, demand2, false);

      // Wait for transaction receipt
      await testClient.waitForTransactionReceipt({
        hash: arbitrateHash2,
      });

      // Create the attestation
      const attestation = {
        uid: statementUid,
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Check with oracle1 - should be true (demand1 was already encoded above)
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      const result1 = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand1, counteroffer],
      });

      expect(result1).toBe(true);

      // Check with oracle2 - should be false (demand2 was already encoded above)

      const result2 = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand2, counteroffer],
      });

      expect(result2).toBe(false);
    });

    test("testCheckObligationWithNoDecision", async () => {
      // Create a new oracle address that hasn't made a decision
      const newOracle = privateKeyToAddress(generatePrivateKey());

      // Create the attestation
      const attestation = {
        uid: statementUid,
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data
      const demandData = {
        oracle: newOracle,
        data: "0x" as const,
      };

      // Encode demand data
      const demand = aliceClient.arbiters.general.trustedOracle.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check with the new oracle - should be false (default value)
      const result = await testClient.readContract({
        address: testContext.addresses.trustedOracleArbiter,
        abi: trustedOracleArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(false);
    });
  });

  describe("IntrinsicsArbiter2", () => {
    // Test schema hash
    const schema = "0x1234567890123456789012345678901234567890123456789012345678901234" as const;

    test("testEncodeDecodeIntrinsics2Demand", () => {
      // Create demand data
      const demandData = { schema };

      // Encode the demand data
      const encodedDemand = aliceClient.arbiters.general.intrinsics2.encodeDemand(demandData);

      // Decode the encoded demand data
      const decodedDemand = aliceClient.arbiters.general.intrinsics2.decodeDemand(encodedDemand);

      // Verify the decoded data matches the original
      expect(decodedDemand.schema).toBe(schema);
    });

    test("testCheckObligationWithMatchingSchema", async () => {
      // Create a test attestation with matching schema
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand data with matching schema
      const demandData = { schema };
      const demand = aliceClient.arbiters.general.intrinsics2.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Check statement should return true for matching schema
      const result = await testClient.readContract({
        address: testContext.addresses.intrinsicsArbiter2,
        abi: intrinsicsArbiter2Abi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckObligationWithNonMatchingSchema", async () => {
      // Create a test attestation with different schema
      const differentSchema = "0x5555555555555555555555555555555555555555555555555555555555555555" as const;
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema: differentSchema,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Demand data with original schema
      const demandData = { schema };
      const demand = aliceClient.arbiters.general.intrinsics2.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should fail with "SchemaMismatch" error
      try {
        await testClient.readContract({
          address: testContext.addresses.intrinsicsArbiter2,
          abi: intrinsicsArbiter2Abi.abi,
          functionName: "checkObligation",
          args: [attestation, demand, counteroffer],
        });
        expect(false).toBe(true); // Should not reach here
      } catch (error) {
        expect((error as any).toString()).toContain("InvalidSchema");
      }
    });
  });

  describe("AnyArbiter", () => {
    test("testEncodeDecodeMultiArbiterDemand", () => {
      // Create multi arbiter demand data
      const demandData = {
        arbiters: [testContext.addresses.trivialArbiter, testContext.addresses.intrinsicsArbiter2],
        demands: ["0x1234" as const, "0x5678" as const],
      };

      // Encode the demand data
      const encodedDemand = aliceClient.arbiters.logical.any.encodeDemand(demandData);

      // Decode the encoded demand data
      const decodedDemand = aliceClient.arbiters.logical.any.decodeDemand(encodedDemand);

      // Verify decoded data matches original
      expect(decodedDemand.arbiters.map(($) => $.toLowerCase())).toEqual(
        demandData.arbiters.map(($) => $.toLowerCase()),
      );
      expect(decodedDemand.demands).toEqual(demandData.demands);
    });

    test("testCheckObligationWithAnyTrueArbiter", async () => {
      // Create attestation
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand with TrivialArbiter (always returns true) and IntrinsicsArbiter2 with wrong schema
      const intrinsics2Demand = aliceClient.arbiters.general.intrinsics2.encodeDemand({
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as const,
      });

      const demandData = {
        arbiters: [testContext.addresses.trivialArbiter, testContext.addresses.intrinsicsArbiter2],
        demands: [
          "0x" as const, // Empty demand for TrivialArbiter
          intrinsics2Demand, // Will fail since schema doesn't match
        ],
      };

      const demand = aliceClient.arbiters.logical.any.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should return true because at least one arbiter (TrivialArbiter) returns true
      const result = await testClient.readContract({
        address: testContext.addresses.anyArbiter,
        abi: anyArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckObligationWithAllFalseArbiters", async () => {
      // Prepare attestation
      const statementUid = "0x0000000000000000000000000000000000000000000000000000000000000001" as const;
      const attestation = {
        uid: statementUid,
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Set up TrustedOracleArbiter with no decision (returns false)
      const oracleDemand = aliceClient.arbiters.general.trustedOracle.encodeDemand({
        oracle: alice,
        data: "0x" as const,
      });

      // Set up IntrinsicsArbiter2 with wrong schema (will fail)
      const intrinsics2Demand = aliceClient.arbiters.general.intrinsics2.encodeDemand({
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as const,
      });

      // Create AnyArbiter demand with both failing arbiters
      const demandData = {
        arbiters: [testContext.addresses.trustedOracleArbiter, testContext.addresses.intrinsicsArbiter2],
        demands: [oracleDemand, intrinsics2Demand],
      };

      const demand = aliceClient.arbiters.logical.any.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should return false because all arbiters return false
      const result = await testClient.readContract({
        address: testContext.addresses.anyArbiter,
        abi: anyArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(false);
    });
  });

  describe("AllArbiter", () => {
    test("testEncodeDecodeMultiArbiterDemand", () => {
      // Same as AnyArbiter test, both use the same encoding
      const demandData = {
        arbiters: [testContext.addresses.trivialArbiter, testContext.addresses.intrinsicsArbiter2],
        demands: ["0x1234" as const, "0x5678" as const],
      };

      const encodedDemand = aliceClient.arbiters.logical.all.encodeDemand(demandData);
      const decodedDemand = aliceClient.arbiters.logical.all.decodeDemand(encodedDemand);

      expect(decodedDemand.arbiters.map(($) => $.toLowerCase())).toEqual(
        demandData.arbiters.map(($) => $.toLowerCase()),
      );

      expect(decodedDemand.demands).toEqual(demandData.demands);
    });

    test("testCheckObligationWithAllTrueArbiters", async () => {
      // Create attestation with a specific schema
      const schema = "0x1234567890123456789012345678901234567890123456789012345678901234" as const;
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000001" as const,
        schema,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Create demand with TrivialArbiter and IntrinsicsArbiter2 that both return true
      const intrinsics2Demand = aliceClient.arbiters.general.intrinsics2.encodeDemand({
        schema,
      });

      const demandData = {
        arbiters: [testContext.addresses.trivialArbiter, testContext.addresses.intrinsicsArbiter2],
        demands: [
          "0x" as const, // Empty demand for TrivialArbiter (always true)
          intrinsics2Demand, // Matching schema for IntrinsicsArbiter2 (true)
        ],
      };

      const demand = aliceClient.arbiters.logical.all.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should return true because all arbiters return true
      const result = await testClient.readContract({
        address: testContext.addresses.allArbiter,
        abi: allArbiterAbi.abi,
        functionName: "checkObligation",
        args: [attestation, demand, counteroffer],
      });

      expect(result).toBe(true);
    });

    test("testCheckObligationWithOneFalseArbiter", async () => {
      // Create attestation with one schema
      const attestation = {
        uid: "0x0000000000000000000000000000000000000000000000000000000000000001" as const,
        schema: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        time: BigInt(Math.floor(Date.now() / 1000)),
        expirationTime: 0n,
        revocationTime: 0n,
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000" as const,
        recipient: "0x0000000000000000000000000000000000000000" as const,
        attester: "0x0000000000000000000000000000000000000000" as const,
        revocable: true,
        data: "0x" as const,
      };

      // Set up intrinsics2 demand with wrong schema (will fail)
      const intrinsics2Demand = aliceClient.arbiters.general.intrinsics2.encodeDemand({
        schema: "0x1234567890123456789012345678901234567890123456789012345678901234" as const,
      });

      // Create AllArbiter demand with one true and one false arbiter
      const demandData = {
        arbiters: [
          testContext.addresses.trivialArbiter, // Always returns true
          testContext.addresses.intrinsicsArbiter2, // Will return false with wrong schema
        ],
        demands: ["0x" as const, intrinsics2Demand],
      };

      const demand = aliceClient.arbiters.logical.all.encodeDemand(demandData);
      const counteroffer = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

      // Should revert when any arbiter returns false
      try {
        await testClient.readContract({
          address: testContext.addresses.allArbiter,
          abi: allArbiterAbi.abi,
          functionName: "checkObligation",
          args: [attestation, demand, counteroffer],
        });
        expect(false).toBe(true); // Should not reach here
      } catch (error) {
        // underlying error is thrown but not decoded, since it's not on the ABI
        expect((error as any).toString()).toContain("0x");
      }
    });
  });
});
