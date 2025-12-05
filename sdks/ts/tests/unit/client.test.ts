import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { parseEther } from "viem";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";
import { compareAddresses } from "../utils/tokenTestUtils";

describe("Client Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["alice"]["client"];
  let bobClient: TestContext["bob"]["client"];
  let testClient: TestContext["testClient"];

  // Additional test token
  let erc20Token: `0x${string}`;

  beforeEach(async () => {
    // Setup fresh test environment for each test
    testContext = await setupTestEnvironment();

    // Extract the values we need for tests
    alice = testContext.alice.address;
    bob = testContext.bob.address;
    aliceClient = testContext.alice.client;
    bobClient = testContext.bob.client;
    testClient = testContext.testClient;

    // Use one of the mock tokens
    erc20Token = testContext.mockAddresses.erc20A;
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

  // Register a test schema for testing creating attestations
  async function registerTestSchema() {
    // Generate a unique schema name to avoid AlreadyExists errors
    const uniqueSchemaName = `string testData${Date.now()}`;

    // Register schema using the SDK function
    const hash = await aliceClient.attestation.registerSchema(
      uniqueSchemaName,
      testContext.addresses.attestationBarterUtils,
      true,
    );

    const receipt = await testClient.waitForTransactionReceipt({ hash });

    // Get the schema ID from the event
    const log = receipt.logs[0];
    if (!log) throw new Error("No log found in receipt");
    return log.topics[1] as `0x${string}`; // Force type to be 0x-prefixed string
  }

  describe("Client Initialization", () => {
    test("should properly initialize client with required addresses", () => {
      // Check that client was created with the correct addresses
      expect(aliceClient).toBeDefined();
      expect(aliceClient.address).toBe(alice);
      expect(aliceClient.contractAddresses.eas).toBe(testContext.addresses.eas);
      expect(aliceClient.contractAddresses.easSchemaRegistry).toBe(testContext.addresses.easSchemaRegistry);

      // Verify client has all expected components
      expect(aliceClient.arbiters).toBeDefined();
      expect(aliceClient.erc20).toBeDefined();
      expect(aliceClient.erc721).toBeDefined();
      expect(aliceClient.erc1155).toBeDefined();
      expect(aliceClient.bundle).toBeDefined();
      expect(aliceClient.attestation).toBeDefined();
      expect(aliceClient.stringObligation).toBeDefined();
      expect(aliceClient.viemClient).toBeDefined();
      expect(aliceClient.getAttestation).toBeDefined();
      expect(aliceClient.getAttestedEventFromTxHash).toBeDefined();
      expect(aliceClient.waitForFulfillment).toBeDefined();
    });
  });

  describe("getAttestation", () => {
    test("should retrieve an attestation by UID", async () => {
      const testSchemaId = await registerTestSchema();

      // Create a test attestation to retrieve
      const { attested: attestationData } = await aliceClient.attestation.createAttestation(
        testSchemaId,
        bob,
        BigInt(Math.floor(Date.now() / 1000) + 86400), // 1 day expiration
        true, // revocable
        "0x0000000000000000000000000000000000000000000000000000000000000000", // no ref
        ("0x" + Buffer.from("test data").toString("hex")) as `0x${string}`, // data
      );

      // Use the getAttestation function to retrieve it
      const attestation = await aliceClient.getAttestation(attestationData.uid);

      // Verify retrieved data is correct
      expect(attestation.uid).toBe(attestationData.uid);
      expect(attestation.schema).toBe(testSchemaId);
      expect(attestation.recipient).toBe(bob);
      expect(compareAddresses(attestation.attester, testContext.addresses.attestationBarterUtils)).toBe(true);
    });
  });

  describe("getAttestedEventFromTxHash", () => {
    test("should retrieve attestation event from transaction hash", async () => {
      const testSchemaId = await registerTestSchema();

      // Create a test attestation to retrieve the event for
      const { hash: txHash } = await aliceClient.attestation.createAttestation(
        testSchemaId,
        bob,
        BigInt(Math.floor(Date.now() / 1000) + 86400), // 1 day expiration
        true, // revocable
        "0x0000000000000000000000000000000000000000000000000000000000000000", // no ref
        ("0x" + Buffer.from("event test").toString("hex")) as `0x${string}`, // data
      );

      // Get the attestation event using the transaction hash
      const attestEvent = await aliceClient.getAttestedEventFromTxHash(txHash);

      // Verify the event data is non-empty
      expect(compareAddresses(attestEvent.attester, testContext.addresses.attestationBarterUtils)).toBe(true);
      expect(attestEvent.schemaUID).toBe(testSchemaId);
      expect(attestEvent.uid).toBeDefined();
      expect(attestEvent.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });
  });

  describe("waitForFulfillment", () => {
    test("should wait for an escrow fulfillment", async () => {
      // First create a string attestation by Bob to use for fulfillment
      const { attested: fulfillmentEvent } = await bobClient.stringObligation.doObligation("fulfillment data");
      const fulfillmentUid = fulfillmentEvent.uid as `0x${string}`;

      await aliceClient.erc20.approve({ address: erc20Token, value: 10n }, "escrow");
      // Alice creates an escrow attestation that requires a fulfillment
      const { attested: escrowData } = await aliceClient.erc20.buyWithErc20(
        { address: erc20Token, value: 10n },
        { arbiter: testContext.addresses.trivialArbiter, demand: "0x" },
        0n,
      );

      // Start a promise that waits for fulfillment in the background
      const fulfillmentPromise = aliceClient.waitForFulfillment(
        testContext.addresses.erc20EscrowObligation,
        escrowData.uid,
      );

      // Bob collects the escrow by providing the fulfillment
      await bobClient.erc20.collectEscrow(escrowData.uid, fulfillmentUid);

      // Wait for the fulfillment promise to resolve
      const fulfillment = await fulfillmentPromise;

      // Verify we got a valid fulfillment
      expect(fulfillment.payment).toBe(escrowData.uid);
      expect(fulfillment.fulfillment).toBe(fulfillmentUid);
      expect(fulfillment.fulfiller).toBe(bob);
    });
  });
});
