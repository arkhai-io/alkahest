import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { createWalletClient, http, nonceManager, parseAbiParameters, parseEther, webSocket } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { contractAddresses, makeClient } from "../../src";
import { getOptimalPollingInterval, isWebSocketTransport } from "../../src/utils";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";

// Mock environment for unit testing
const mockEnv = {
  RPC_URL: "https://sepolia.base.org",
  WS_RPC_URL: "wss://sepolia.base.org",
  PRIVKEY_ALICE: "0x" + "a".repeat(64), // Mock private key
};

describe("WebSocket Transport Support", () => {
  describe("Unit Tests - Transport Type Detection", () => {
    let httpClient: ReturnType<typeof makeClient>;
    let wsClient: ReturnType<typeof makeClient>;

    beforeEach(() => {
      // Create HTTP client
      httpClient = makeClient(
        createWalletClient({
          account: privateKeyToAccount(mockEnv.PRIVKEY_ALICE as `0x${string}`, {
            nonceManager,
          }),
          chain: baseSepolia,
          transport: http(mockEnv.RPC_URL),
        }),
      );

      // Create WebSocket client
      wsClient = makeClient(
        createWalletClient({
          account: privateKeyToAccount(mockEnv.PRIVKEY_ALICE as `0x${string}`, {
            nonceManager,
          }),
          chain: baseSepolia,
          transport: webSocket(mockEnv.WS_RPC_URL),
        }),
      );
    });

    test("should detect HTTP transport correctly", () => {
      const isWs = isWebSocketTransport(httpClient.viemClient);
      expect(isWs).toBe(false);
    });

    test("should detect WebSocket transport correctly", () => {
      const isWs = isWebSocketTransport(wsClient.viemClient);
      expect(isWs).toBe(true);
    });

    test("should return polling interval for HTTP transport", () => {
      const interval = getOptimalPollingInterval(httpClient.viemClient, 1000);
      expect(interval).toBe(1000);
    });

    test("should return undefined for WebSocket transport (subscription-based)", () => {
      const interval = getOptimalPollingInterval(wsClient.viemClient, 1000);
      expect(interval).toBeUndefined();
    });

    test("should have same API regardless of transport", () => {
      // Both clients should have the same methods
      expect(typeof httpClient.waitForFulfillment).toBe("function");
      expect(typeof wsClient.waitForFulfillment).toBe("function");

      expect(typeof httpClient.oracle.listenAndArbitrate).toBe("function");
      expect(typeof wsClient.oracle.listenAndArbitrate).toBe("function");
    });

    test("transport types should be correctly identified", () => {
      expect(httpClient.viemClient.transport.type).toBe("http");
      expect(wsClient.viemClient.transport.type).toBe("webSocket");
    });

    test("should handle mixed transport pattern", () => {
      // This is a pattern test - using HTTP for transactions and WebSocket for events
      // In real usage, you'd use httpClient for writes and wsClient for event watching

      const httpTransportType = httpClient.viemClient.transport.type;
      const wsTransportType = wsClient.viemClient.transport.type;
      // Both should have the same account
      expect(httpClient.address).toBe(wsClient.address);

      expect(httpTransportType).toBe("http");
      expect(wsTransportType).toBe("webSocket");
    });
  });

  describe("With Anvil Setup", () => {
    let testContext: TestContext;
    let alice: `0x${string}`;
    let bob: `0x${string}`;
    let aliceClient: TestContext["alice"]["client"];
    let bobClient: TestContext["bob"]["client"];
    let aliceClientWs: TestContext["alice"]["clientWs"];
    let bobClientWs: TestContext["bob"]["clientWs"];
    let testClient: TestContext["testClient"];

    // Token addresses
    let erc20TokenA: `0x${string}`;
    let erc20TokenB: `0x${string}`;

    beforeEach(async () => {
      // Setup test environment with both HTTP and WebSocket clients
      testContext = await setupTestEnvironment();

      // Extract values for tests
      alice = testContext.alice.address;
      bob = testContext.bob.address;
      aliceClient = testContext.alice.client;
      bobClient = testContext.bob.client;
      aliceClientWs = testContext.alice.clientWs;
      bobClientWs = testContext.bob.clientWs;
      testClient = testContext.testClient;

      // Use mock tokens
      erc20TokenA = testContext.mockAddresses.erc20A;
      erc20TokenB = testContext.mockAddresses.erc20B;
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
      // Clean up test environment
      await teardownTestEnvironment(testContext);
    });

    describe("Transport Detection in Test Environment", () => {
      test("should detect HTTP transport correctly", () => {
        const isWs = isWebSocketTransport(aliceClient.viemClient);
        expect(isWs).toBe(false);
      });

      test("should detect WebSocket transport correctly", () => {
        const isWs = isWebSocketTransport(aliceClientWs.viemClient);
        expect(isWs).toBe(true);
      });

      test("should return correct polling intervals", () => {
        // HTTP client should return polling interval
        const httpInterval = getOptimalPollingInterval(aliceClient.viemClient, 1000);
        expect(httpInterval).toBe(1000);

        // WebSocket client should return undefined (subscription-based)
        const wsInterval = getOptimalPollingInterval(aliceClientWs.viemClient, 1000);
        expect(wsInterval).toBeUndefined();
      });
    });

    describe("Real-time Event Watching", () => {
      test("should do speed test WS & HTTP Waiting for fulfillment", async () => {
        const bidAmount = parseEther("100");
        const askAmount = parseEther("200");
        const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

        // Alice approves tokens for escrow (using HTTP client for transactions)
        await aliceClient.erc20.approve({ address: erc20TokenA, value: bidAmount }, "escrow");

        // Alice creates an escrow (using HTTP client for transactions)
        const { attested: escrowData } = await aliceClient.erc20.buyErc20ForErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: erc20TokenB, value: askAmount },
          expiration,
        );

        console.log("Escrow created:", escrowData.uid);

        // Start timing for WebSocket fulfillment watching
        const wsFulfillmentPromise = aliceClientWs.waitForFulfillment(
          testContext.addresses.erc20EscrowObligation,
          escrowData.uid,
        );

        // Start timing for HTTP fulfillment watching
        const httpFulfillmentPromise = aliceClient.waitForFulfillment(
          testContext.addresses.erc20EscrowObligation,
          escrowData.uid,
        );

        // Bob approves and fulfills the escrow (using HTTP client for transactions)
        await bobClient.erc20.approve({ address: erc20TokenB, value: askAmount }, "payment");

        const fulfillmentStartTime = Date.now();
        await bobClient.erc20.payErc20ForErc20(escrowData.uid);

        // Wait for both fulfillment promises
        const wsFulfillment = await wsFulfillmentPromise;
        const wsEndTime = Date.now();

        const httpFulfillment = await httpFulfillmentPromise;
        const httpEndTime = Date.now();

        // Calculate detection times
        const wsDetectionTime = wsEndTime - fulfillmentStartTime;
        const httpDetectionTime = httpEndTime - fulfillmentStartTime;

        console.log(`WebSocket detection time: ${wsDetectionTime}ms`);
        console.log(`HTTP detection time: ${httpDetectionTime}ms`);
        // Verify WebSocket detected fulfillment faster or within a reasonable margin
        expect(wsDetectionTime).toBeLessThanOrEqual(httpDetectionTime + 100); // Allow some delay

        // Verify both detected the same fulfillment
        expect(wsFulfillment.payment).toBe(escrowData.uid);
        expect(httpFulfillment.payment).toBe(escrowData.uid);
        expect(wsFulfillment.fulfillment).toBeDefined();
        expect(httpFulfillment.fulfillment).toBeDefined();

        // Both should have detected the same fulfillment UID
        if (wsFulfillment.fulfillment && httpFulfillment.fulfillment) {
          expect(wsFulfillment.fulfillment).toBe(httpFulfillment.fulfillment);
        }

        // WebSocket should generally be faster (though in local testing the difference may be minimal)
        // This is more about demonstrating the pattern than strict performance testing
        expect(wsDetectionTime).toBeLessThanOrEqual(httpDetectionTime + 100); // Allow some variance
      });

      test("should handle mixed transport usage pattern", async () => {
        // Demonstrate the recommended pattern: HTTP for transactions, WebSocket for events
        const bidAmount = parseEther("25");
        const askAmount = parseEther("30");
        const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400);

        // Use HTTP clients for all transactions (more reliable)
        await aliceClient.erc20.approve({ address: erc20TokenA, value: bidAmount }, "escrow");

        const { attested: escrowData } = await aliceClient.erc20.buyErc20ForErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: erc20TokenB, value: askAmount },
          expiration,
        );

        // Use WebSocket client for event watching (faster)
        const fulfillmentPromise = aliceClientWs.waitForFulfillment(
          testContext.addresses.erc20EscrowObligation,
          escrowData.uid,
        );

        // Use HTTP client for fulfillment transaction
        await bobClient.erc20.approve({ address: erc20TokenB, value: askAmount }, "payment");

        await bobClient.erc20.payErc20ForErc20(escrowData.uid);

        // WebSocket client should detect the fulfillment quickly
        const fulfillment = await fulfillmentPromise;

        expect(fulfillment.payment).toBe(escrowData.uid);
        expect(fulfillment.fulfiller).toBe(bob);
        expect(fulfillment.fulfillment).toBeDefined();

        // Verify the transport types are as expected
        expect(isWebSocketTransport(aliceClientWs.viemClient)).toBe(true);
        expect(isWebSocketTransport(aliceClient.viemClient)).toBe(false);
      });
    });

    describe("WebSocket Error Handling", () => {
      test("should handle WebSocket client operations gracefully", async () => {
        // Test that WebSocket clients can perform all the same operations as HTTP clients
        const bidAmount = parseEther("10");

        // Approve using WebSocket client
        const approvalHash = await aliceClientWs.erc20.approve({ address: erc20TokenA, value: bidAmount }, "escrow");

        expect(approvalHash).toBeDefined();
        expect(typeof approvalHash).toBe("string");
        expect(approvalHash.startsWith("0x")).toBe(true);

        // Create escrow using WebSocket client
        const { attested } = await aliceClientWs.erc20.buyErc20ForErc20(
          { address: erc20TokenA, value: bidAmount },
          { address: erc20TokenB, value: bidAmount },
          BigInt(Math.floor(Date.now() / 1000) + 86400),
        );

        expect(attested.uid).toBeDefined();
        expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
      });
    });
  });

  describe("Network Integration (requires live connection)", () => {
    test.skip("should listen for events with WebSocket", async () => {
      // This test would require actual network connection and deployed contracts
      // Skip by default, but could be enabled for integration testing
      if (!process.env.WS_RPC_URL || !process.env.PRIVKEY_ALICE) {
        return; // Skip if env vars not set
      }

      const client = makeClient(
        createWalletClient({
          account: privateKeyToAccount(process.env.PRIVKEY_ALICE as `0x${string}`, {
            nonceManager,
          }),
          chain: baseSepolia,
          transport: webSocket(process.env.WS_RPC_URL),
        }),
      );

      const obligationAbi = parseAbiParameters("(string item)");

      // Test real WebSocket event listening
      const { unwatch } = await client.oracle.listenAndArbitrate(
        async (attestation) => {
          const obligation = client.extractObligationData(obligationAbi, attestation);
          return obligation[0].item === "test";
        },
        {
          onAfterArbitrate: async (decision) => {
            console.log("WebSocket arbitration:", decision);
          },
        },
      );

      // Clean up after each test
      setTimeout(() => unwatch(), 1000);
    });
  });
});
