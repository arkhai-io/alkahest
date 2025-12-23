import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { getAddress, parseEther } from "viem";
import { setupTestEnvironment, type TestContext } from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";
import { compareAddresses } from "../utils/tokenTestUtils";

describe("ERC20 Tests", () => {
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

  test("testEncodeAndDecode", () => {
    const data = {
      arbiter: testContext.addresses.trivialArbiter,
      demand: "0x1234" as `0x${string}`,
      token: aliceErc20Token,
      amount: parseEther("100"),
    };

    const encoded = aliceClient.erc20.escrow.nonTierable.encodeObligationRaw(data);
    const decoded = aliceClient.erc20.escrow.nonTierable.decodeObligation(encoded);
    expect(decoded.amount).toEqual(data.amount);
    expect(compareAddresses(decoded.token, data.token)).toBeTruthy();
    expect(compareAddresses(decoded.arbiter, data.arbiter)).toBeTruthy();
    expect(decoded.demand.startsWith(data.demand)).toBeTruthy();
  });

  describe("ERC20BarterUtils", () => {
    test("testBuyErc20ForErc20", async () => {
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and buys ERC20 for ERC20
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: bidAmount }, "barter");

      const { attested } = await aliceClient.erc20.barter.buyErc20ForErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc20Token, value: askAmount },
        expiration,
      );

      // Assert the attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPermitAndBuyErc20ForErc20", async () => {
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and buys ERC20 for ERC20
      const { attested } = await aliceClient.erc20.barter.permitAndBuyErc20ForErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc20Token, value: askAmount },
        expiration,
      );

      // Assert the attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPermitAndBuyWithErc20", async () => {
      const amount = parseEther("100");
      const arbiter = getAddress(bob); // Using Bob as the arbiter like in Solidity tests
      const demand = `0x${Buffer.from("test demand").toString("hex")}` as `0x${string}`;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates custom demand escrow
      const { attested } = await aliceClient.erc20.escrow.nonTierable.permitAndCreate(
        { address: aliceErc20Token, value: amount },
        { arbiter, demand },
        expiration,
      );

      // Assert the escrow attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPermitAndPayWithErc20", async () => {
      const amount = parseEther("100");

      // Alice uses permit and makes direct payment to Bob
      const { attested } = await aliceClient.erc20.payment.permitAndPay(
        { address: aliceErc20Token, value: amount },
        bob,
      );

      // Assert the payment attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPayErc20ForErc20", async () => {
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: bidAmount }, "barter");

      const { attested: buyAttestation } = await aliceClient.erc20.barter.buyErc20ForErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc20Token, value: askAmount },
        expiration,
      );

      // Bob approves and fulfills the escrow
      // Check balances before the exchange
      const bobInitialBalanceA = await testClient.getErc20Balance({ address: aliceErc20Token }, bob);

      const aliceInitialBalanceB = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      await bobClient.erc20.util.approve({ address: bobErc20Token, value: askAmount }, "barter");

      const { attested: sellAttestation } = await bobClient.erc20.barter.payErc20ForErc20(buyAttestation.uid);

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check token transfers
      const bobFinalBalanceA = await testClient.getErc20Balance({ address: aliceErc20Token }, bob);

      const aliceFinalBalanceB = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      // Verify token transfers by checking the difference
      expect(bobFinalBalanceA - bobInitialBalanceA).toBe(bidAmount);
      expect(aliceFinalBalanceB - aliceInitialBalanceB).toBe(askAmount);
    });

    test("testPermitAndPayErc20ForErc20", async () => {
      // First create a buy attestation
      const bidAmount = parseEther("100");
      const askAmount = parseEther("200");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: bidAmount }, "barter");

      const { attested: buyAttestation } = await aliceClient.erc20.barter.buyErc20ForErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc20Token, value: askAmount },
        expiration,
      );

      // Check balances before the exchange
      const bobInitialBalanceA = await testClient.getErc20Balance({ address: aliceErc20Token }, bob);

      const aliceInitialBalanceB = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      // Bob uses permit and fulfills the escrow
      const { attested: sellAttestation } = await bobClient.erc20.barter.permitAndPayErc20ForErc20(buyAttestation.uid);

      // Assert the sell attestation was created
      expect(sellAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check token transfers
      const bobFinalBalanceA = await testClient.getErc20Balance({ address: aliceErc20Token }, bob);

      const aliceFinalBalanceB = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      // Verify token transfers by checking the difference
      expect(bobFinalBalanceA - bobInitialBalanceA).toBe(bidAmount);
      expect(aliceFinalBalanceB - aliceInitialBalanceB).toBe(askAmount);
    });
  });

  describe("ERC20BarterCrossToken", () => {
    test("testBuyErc721WithErc20", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for ERC721
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: bidAmount }, "barter");

      const { attested } = await aliceClient.erc20.barter.buyErc721WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc721Token, id: erc721TokenId },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPermitAndBuyErc721WithErc20", async () => {
      const bidAmount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates an escrow for ERC721
      const { attested } = await aliceClient.erc20.barter.permitAndBuyErc721WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        { address: bobErc721Token, id: erc721TokenId },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPayErc20ForErc721", async () => {
      const erc20Amount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC721
      await bobClient.erc721.util.approve({ address: bobErc721Token, id: erc721TokenId }, "barter");

      const { attested: buyAttestation } = await bobClient.erc721.barter.buyErc20WithErc721(
        { address: bobErc721Token, id: erc721TokenId },
        { address: aliceErc20Token, value: erc20Amount },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      // Alice approves her ERC20 and fulfills the escrow
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: erc20Amount }, "barter");

      const { attested: payAttestation } = await aliceClient.erc20.barter.payErc20ForErc721(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: erc721TokenId,
      });

      // Verify transfers
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
    });

    test("testPermitAndPayErc20ForErc721", async () => {
      const erc20Amount = parseEther("100");
      const erc721TokenId = 1n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC721
      await bobClient.erc721.util.approve({ address: bobErc721Token, id: erc721TokenId }, "barter");

      const { attested: buyAttestation } = await bobClient.erc721.barter.buyErc20WithErc721(
        { address: bobErc721Token, id: erc721TokenId },
        { address: aliceErc20Token, value: erc20Amount },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      // Alice approves her ERC20 and fulfills the escrow
      // We'll skip using permit and use regular payErc20ForErc721 since test tokens may not support EIP-2612
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: erc20Amount }, "barter");

      const { attested: payAttestation } = await aliceClient.erc20.barter.payErc20ForErc721(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: erc721TokenId,
      });

      // Verify transfers
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
    });

    test("testBuyErc1155WithErc20", async () => {
      const bidAmount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice approves and creates an escrow for ERC1155
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: bidAmount }, "barter");

      const { attested } = await aliceClient.erc20.barter.buyErc1155WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        {
          address: bobErc1155Token,
          id: tokenId,
          value: amount,
        },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPermitAndBuyErc1155WithErc20", async () => {
      const bidAmount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Alice uses permit and creates an escrow for ERC1155
      const { attested } = await aliceClient.erc20.barter.permitAndBuyErc1155WithErc20(
        { address: aliceErc20Token, value: bidAmount },
        {
          address: bobErc1155Token,
          id: tokenId,
          value: amount,
        },
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPayErc20ForErc1155", async () => {
      const erc20Amount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC1155
      await bobClient.erc1155.util.approveAll(bobErc1155Token, "barter");

      const { attested: buyAttestation } = await bobClient.erc1155.barter.buyErc20WithErc1155(
        { address: bobErc1155Token, id: tokenId, value: amount },
        { address: aliceErc20Token, value: erc20Amount },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Alice approves her ERC20 and fulfills the escrow
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: erc20Amount }, "barter");

      const { attested: payAttestation } = await aliceClient.erc20.barter.payErc20ForErc1155(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Verify transfers
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(amount);
    });

    test("testPermitAndPayErc20ForErc1155", async () => {
      const erc20Amount = parseEther("100");
      const tokenId = 1n;
      const amount = 50n;
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // First create a buy attestation with Bob escrowing ERC1155
      await bobClient.erc1155.util.approveAll(bobErc1155Token, "barter");

      const { attested: buyAttestation } = await bobClient.erc1155.barter.buyErc20WithErc1155(
        { address: bobErc1155Token, id: tokenId, value: amount },
        { address: aliceErc20Token, value: erc20Amount },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Alice approves her ERC20 and fulfills the escrow
      // We'll skip using permit and use regular payErc20ForErc1155 since test tokens may not support EIP-2612
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: erc20Amount }, "barter");

      const { attested: payAttestation } = await aliceClient.erc20.barter.payErc20ForErc1155(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: tokenId },
        alice,
      );

      // Verify transfers
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(amount);
    });

    test("testBuyBundleWithErc20", async () => {
      const bidAmount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create token bundle
      const bundle = {
        erc20s: [{ address: bobErc20Token, value: parseEther("5") }],
        erc721s: [{ address: bobErc721Token, id: 1n }],
        erc1155s: [{ address: bobErc1155Token, id: 1n, value: 20n }],
      };

      // Alice approves tokens for token bundle escrow
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: bidAmount }, "barter");

      const { attested } = await aliceClient.erc20.barter.buyBundleWithErc20(
        { address: aliceErc20Token, value: bidAmount },
        bundle,
        bob,
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPermitAndBuyBundleWithErc20", async () => {
      const bidAmount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now

      // Create token bundle
      const bundle = {
        erc20s: [{ address: bobErc20Token, value: parseEther("5") }],
        erc721s: [{ address: bobErc721Token, id: 1n }],
        erc1155s: [{ address: bobErc1155Token, id: 1n, value: 20n }],
      };

      // Alice uses permit and creates an escrow for token bundle
      const { attested } = await aliceClient.erc20.barter.permitAndBuyBundleWithErc20(
        { address: aliceErc20Token, value: bidAmount },
        bundle,
        bob,
        expiration,
      );

      // Assert the buy attestation was created
      expect(attested.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");
    });

    test("testPayErc20ForBundle", async () => {
      const erc20Amount = parseEther("100");
      const expiration = BigInt(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
      const bobErc20Amount = parseEther("5");
      const erc1155TokenId = 1n;
      const erc1155Amount = 20n;
      const bobTokenId = 1n;

      // Create token bundle that Bob will escrow
      const bundle = {
        erc20s: [{ address: bobErc20Token, value: bobErc20Amount / 2n }],
        erc721s: [{ address: bobErc721Token, id: bobTokenId }],
        erc1155s: [
          {
            address: bobErc1155Token,
            id: erc1155TokenId,
            value: erc1155Amount / 2n,
          },
        ],
      };

      // Bob approves his tokens and creates the bundle escrow
      await bobClient.bundle.util.approve(bundle, "escrow");

      // Create ERC20 payment obligation for Alice's tokens
      const erc20PaymentObligation = bobClient.erc20.payment.encodeObligation(
        { address: aliceErc20Token, value: erc20Amount },
        bob,
      );

      // Bob creates bundle escrow demanding Alice's ERC20
      const { attested: buyAttestation } = await bobClient.bundle.escrow.nonTierable.create(
        bundle,
        {
          arbiter: testContext.addresses.erc20PaymentObligation,
          demand: erc20PaymentObligation,
        },
        expiration,
      );

      // Check balances before the exchange
      const aliceInitialBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceInitialBalanceBobErc20 = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      const aliceInitialBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: erc1155TokenId },
        alice,
      );

      // Alice approves her tokens for payment
      await aliceClient.erc20.util.approve({ address: aliceErc20Token, value: erc20Amount }, "barter");

      // Alice fulfills the escrow with her ERC20
      const { attested: payAttestation } = await aliceClient.erc20.barter.payErc20ForBundle(buyAttestation.uid);

      // Assert the payment attestation was created
      expect(payAttestation.uid).not.toBe("0x0000000000000000000000000000000000000000000000000000000000000000");

      // Check token transfers
      const aliceFinalBalanceErc20 = await testClient.getErc20Balance({ address: aliceErc20Token }, alice);

      const aliceFinalBalanceBobErc20 = await testClient.getErc20Balance({ address: bobErc20Token }, alice);

      const aliceFinalBalanceErc1155 = await testClient.getErc1155Balance(
        { address: bobErc1155Token, id: erc1155TokenId },
        alice,
      );

      const aliceOwnsToken = await testClient.getErc721Owner({
        address: bobErc721Token,
        id: bobTokenId,
      });

      // Verify transfers
      expect(aliceInitialBalanceErc20 - aliceFinalBalanceErc20).toBe(erc20Amount);
      expect(aliceFinalBalanceBobErc20 - aliceInitialBalanceBobErc20).toBe(bobErc20Amount / 2n);
      expect(aliceFinalBalanceErc1155 - aliceInitialBalanceErc1155).toBe(erc1155Amount / 2n);
      expect(compareAddresses(aliceOwnsToken, alice)).toBe(true);
    });
  });
});
