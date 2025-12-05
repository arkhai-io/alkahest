import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { parseEther } from "viem";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";
import { compareAddresses } from "../utils/tokenTestUtils";

describe("TokenBundle Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["alice"]["client"];
  let bobClient: TestContext["bob"]["client"];
  let testClient: TestContext["testClient"];

  // Token addresses
  let aliceErc20Token: `0x${string}`;
  let bobErc20Token: `0x${string}`;
  let aliceErc721Token: `0x${string}`;
  let bobErc721Token: `0x${string}`;
  let aliceErc1155Token: `0x${string}`;
  let bobErc1155Token: `0x${string}`;

  // Token IDs and amounts
  let aliceErc721Id: bigint;
  let bobErc721Id: bigint;
  const erc1155TokenIdA: bigint = 1n;
  const erc1155TokenAmountA: bigint = 100n;
  const erc1155TokenIdB: bigint = 1n;
  const erc1155TokenAmountB: bigint = 100n;
  const erc20AmountA = parseEther("1000");
  const erc20AmountB = parseEther("1000");

  beforeEach(async () => {
    // Setup fresh test environment for each test
    testContext = await setupTestEnvironment();

    // Extract the values we need for tests
    alice = testContext.alice.address;
    bob = testContext.bob.address;
    aliceClient = testContext.alice.client;
    bobClient = testContext.bob.client;
    testClient = testContext.testClient;

    // Set token addresses from mock addresses
    aliceErc20Token = testContext.mockAddresses.erc20A;
    bobErc20Token = testContext.mockAddresses.erc20B;
    aliceErc721Token = testContext.mockAddresses.erc721A;
    bobErc721Token = testContext.mockAddresses.erc721B;
    aliceErc1155Token = testContext.mockAddresses.erc1155A;
    bobErc1155Token = testContext.mockAddresses.erc1155B;

    // First token minted is ID 1
    aliceErc721Id = 1n;
    bobErc721Id = 1n;
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

  describe("TokenBundleBarterUtils", () => {
    // Helper function to create Alice's bundle
    function createAliceBundle() {
      return {
        erc20s: [{ address: aliceErc20Token, value: erc20AmountA / 2n }],
        erc721s: [{ address: aliceErc721Token, id: aliceErc721Id }],
        erc1155s: [
          {
            address: aliceErc1155Token,
            id: erc1155TokenIdA,
            value: erc1155TokenAmountA / 2n,
          },
        ],
      };
    }

    // Helper function to create Bob's bundle
    function createBobBundle() {
      return {
        erc20s: [{ address: bobErc20Token, value: erc20AmountB / 2n }],
        erc721s: [{ address: bobErc721Token, id: bobErc721Id }],
        erc1155s: [
          {
            address: bobErc1155Token,
            id: erc1155TokenIdB,
            value: erc1155TokenAmountB / 2n,
          },
        ],
      };
    }

    test("testBuyBundleForBundle", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Check initial balances
      const initialErc20ABalanceEscrow = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        testContext.addresses.tokenBundleEscrowObligation,
      );

      const initialErc721AOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceErc721Id,
      });

      const initialErc1155ABalanceEscrow = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: erc1155TokenIdA },
        testContext.addresses.tokenBundleEscrowObligation,
      );

      // Alice approves tokens using bundle.approve
      await aliceClient.bundle.approve(aliceBundle, "escrow");

      // Alice creates buy attestation
      const { attested: buyAttestation } = await aliceClient.bundle.buyBundleForBundle(
        aliceBundle,
        bobBundle,
        expiration,
      );

      // Assert the attestation was created
      expect(buyAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Verify Alice's tokens are now in escrow
      const finalErc20ABalanceEscrow = await testClient.getErc20Balance(
        { address: aliceErc20Token },
        testContext.addresses.tokenBundleEscrowObligation,
      );

      const finalErc721AOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceErc721Id,
      });

      const finalErc1155ABalanceEscrow = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: erc1155TokenIdA },
        testContext.addresses.tokenBundleEscrowObligation,
      );

      // Verify tokens were escrowed
      const firstErc20 = aliceBundle.erc20s[0];
      const firstErc1155 = aliceBundle.erc1155s[0];
      if (!firstErc20 || !firstErc1155) throw new Error("Missing bundle tokens");
      expect(finalErc20ABalanceEscrow - initialErc20ABalanceEscrow).toBe(firstErc20.value);
      expect(compareAddresses(finalErc721AOwner, testContext.addresses.tokenBundleEscrowObligation)).toBe(true);
      expect(finalErc1155ABalanceEscrow - initialErc1155ABalanceEscrow).toBe(firstErc1155.value);
    });

    test("testPayBundleForBundle", async () => {
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Bob approves and creates escrow for his bundle
      await bobClient.bundle.approve(bobBundle, "escrow");

      // Create bundle payment statement for Alice's bundle
      const bundlePaymentStatement = bobClient.bundle.encodePaymentObligation(aliceBundle, bob);

      // Bob creates bundle escrow demanding Alice's bundle
      const { attested: buyAttestation } = await bobClient.bundle.buyWithBundle(
        bobBundle,
        {
          arbiter: testContext.addresses.tokenBundlePaymentObligation,
          demand: bundlePaymentStatement,
        },
        expiration,
      );

      // Check balances before fulfillment
      const aliceInitialErc20BBalance = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      const bobInitialErc20ABalance = await testClient.getErc20Balance({ address: aliceErc20Token }, bob);

      const aliceInitialErc1155BBalance = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: erc1155TokenIdB },
        alice,
      );

      const bobInitialErc1155ABalance = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: erc1155TokenIdA },
        bob,
      );

      // Alice approves her tokens for payment
      await aliceClient.bundle.approve(aliceBundle, "payment");

      // Alice fulfills Bob's order
      const { attested: payAttestation } = await aliceClient.bundle.payBundleForBundle(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check balances after fulfillment
      const aliceFinalErc20BBalance = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      const bobFinalErc20ABalance = await testClient.getErc20Balance({ address: aliceErc20Token }, bob);

      const aliceFinalErc1155BBalance = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: erc1155TokenIdB },
        alice,
      );

      const bobFinalErc1155ABalance = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: erc1155TokenIdA },
        bob,
      );

      const aliceErc721BOwner = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: bobErc721Id,
      });

      const bobErc721AOwner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceErc721Id,
      });

      // Verify token transfers
      const bobFirstErc20 = bobBundle.erc20s[0];
      const bobFirstErc1155 = bobBundle.erc1155s[0];
      const aliceFirstErc20 = aliceBundle.erc20s[0];
      const aliceFirstErc1155 = aliceBundle.erc1155s[0];
      if (!bobFirstErc20 || !bobFirstErc1155 || !aliceFirstErc20 || !aliceFirstErc1155) {
        throw new Error("Missing bundle tokens");
      }
      // Alice receives Bob's tokens
      expect(aliceFinalErc20BBalance - aliceInitialErc20BBalance).toBe(bobFirstErc20.value);
      expect(compareAddresses(aliceErc721BOwner, alice)).toBe(true);
      expect(aliceFinalErc1155BBalance - aliceInitialErc1155BBalance).toBe(bobFirstErc1155.value);

      // Bob receives Alice's tokens
      expect(bobFinalErc20ABalance - bobInitialErc20ABalance).toBe(aliceFirstErc20.value);
      expect(compareAddresses(bobErc721AOwner, bob)).toBe(true);
      expect(bobFinalErc1155ABalance - bobInitialErc1155ABalance).toBe(aliceFirstErc1155.value);
    });

    test("testReclaimExpired", async () => {
      const shortExpiration = BigInt(Math.floor(Date.now() / 1000) + 60); // 60 seconds from now

      // Create bundles
      const aliceBundle = createAliceBundle();
      const bobBundle = createBobBundle();

      // Alice approves and creates escrow
      await aliceClient.bundle.approve(aliceBundle, "escrow");

      const { attested: buyAttestation } = await aliceClient.bundle.buyBundleForBundle(
        aliceBundle,
        bobBundle,
        shortExpiration,
      );

      // Advance blockchain time to after expiration
      await testClient.increaseTime({ seconds: 120 }); // Advance 120 seconds

      // Check balances before collecting
      const escrowErc721Owner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceErc721Id,
      });

      const initialErc20Balance = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const initialErc1155Balance = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: erc1155TokenIdA },
        alice,
      );

      expect(compareAddresses(escrowErc721Owner, testContext.addresses.tokenBundleEscrowObligation)).toBe(true);

      // Alice collects her expired escrow
      await aliceClient.bundle.reclaimExpired(buyAttestation.uid);

      // Verify Alice got her tokens back
      const finalErc20Balance = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const finalErc721Owner = await testClient.getErc721Owner({
        address: aliceErc721Token,
        id: aliceErc721Id,
      });

      const finalErc1155Balance = await testClient.getErc1155Balance(
        { address: aliceErc1155Token, id: erc1155TokenIdA },
        alice,
      );

      const firstErc20Reclaim = aliceBundle.erc20s[0];
      const firstErc1155Reclaim = aliceBundle.erc1155s[0];
      console.log({ firstErc1155Reclaim, firstErc20Reclaim });
      if (!firstErc20Reclaim || !firstErc1155Reclaim) throw new Error("Missing bundle tokens");
      expect(compareAddresses(finalErc721Owner, alice)).toBe(true);
      expect(finalErc1155Balance - initialErc1155Balance).toBe(firstErc1155Reclaim.value);
      expect(finalErc20Balance - initialErc20Balance).toBe(firstErc20Reclaim.value);
    });
  });
});
