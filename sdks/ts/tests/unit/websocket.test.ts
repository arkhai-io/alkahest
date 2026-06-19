import { afterEach, describe, expect, test } from "bun:test";
import { createWalletClient, http, nonceManager, parseEther, webSocket } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { makeClient } from "../../src";
import { getOptimalPollingInterval, isWebSocketTransport } from "../../src/utils";
import { setupTestEnvironment, type TestContext } from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";

const mockEnv = {
  RPC_URL: "https://sepolia.base.org",
  WS_RPC_URL: "wss://sepolia.base.org",
  PRIVKEY_ALICE: `0x${"a".repeat(64)}` as `0x${string}`,
};

describe("WebSocket Transport Support", () => {
  test("detects HTTP and WebSocket transports", () => {
    const httpClient = makeClient(
      createWalletClient({
        account: privateKeyToAccount(mockEnv.PRIVKEY_ALICE, { nonceManager }),
        chain: baseSepolia,
        transport: http(mockEnv.RPC_URL),
      }),
    );

    const wsClient = makeClient(
      createWalletClient({
        account: privateKeyToAccount(mockEnv.PRIVKEY_ALICE, { nonceManager }),
        chain: baseSepolia,
        transport: webSocket(mockEnv.WS_RPC_URL),
      }),
    );

    expect(isWebSocketTransport(httpClient.viemClient)).toBe(false);
    expect(isWebSocketTransport(wsClient.viemClient)).toBe(true);
    expect(getOptimalPollingInterval(httpClient.viemClient, 1000)).toBe(1000);
    expect(getOptimalPollingInterval(wsClient.viemClient, 1000)).toBeUndefined();
    expect(typeof wsClient.waitForFulfillment).toBe("function");
  });

  describe("with Anvil", () => {
    let testContext: TestContext;

    afterEach(async () => {
      if (testContext) {
        await teardownTestEnvironment(testContext);
      }
    });

    test(
      "detects fulfillment through a WebSocket client",
      async () => {
        testContext = await setupTestEnvironment();

        const bidAmount = parseEther("10");
        const askAmount = parseEther("12");
        const escrowDemand = {
          arbiter: testContext.addresses.erc20PaymentObligation,
          demand: testContext.alice.client.erc20.payment.encodeObligation(
            { address: testContext.mockAddresses.erc20B, value: askAmount },
            testContext.alice.address,
          ),
        };

        await testContext.alice.client.erc20.util.approve(
          { address: testContext.mockAddresses.erc20A, value: bidAmount },
          "escrow",
        );
        const { attested: escrow } = await testContext.alice.client.erc20.escrow.default.create(
          { address: testContext.mockAddresses.erc20A, value: bidAmount },
          escrowDemand,
          0n,
        );

        const fulfillmentPromise = testContext.alice.clientWs.waitForFulfillment(
          testContext.addresses.erc20EscrowObligation,
          escrow.uid,
        );

        await testContext.bob.client.erc20.util.approve(
          { address: testContext.mockAddresses.erc20B, value: askAmount },
          "barter",
        );
        await testContext.bob.client.erc20.barter.payErc20AndCollect(escrow.uid);

        const fulfillment = await fulfillmentPromise;
        expect(fulfillment.payment).toBe(escrow.uid);
        expect(fulfillment.fulfillment).toBeDefined();
        expect(fulfillment.fulfiller).toBe(testContext.bob.address);
      },
      { timeout: 15_000 },
    );
  });
});
