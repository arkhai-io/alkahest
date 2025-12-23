import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";
import { parseEther } from "viem";
import {
  setupTestEnvironment,
  type TestContext,
} from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";
describe("Native Token Tests", () => {
  // Test context and variables
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let charlie: `0x${string}`;
  let aliceClient: TestContext["alice"]["client"];
  let bobClient: TestContext["bob"]["client"];
  let testClient: TestContext["testClient"];

  beforeAll(async () => {
    // Setup test environment
    testContext = await setupTestEnvironment();

    // Extract the values we need for tests
    alice = testContext.alice.address;
    bob = testContext.bob.address;
    charlie = testContext.charlie.address;
    aliceClient = testContext.alice.client;
    bobClient = testContext.bob.client;
    testClient = testContext.testClient;
  });

  beforeEach(async () => {
    // Reset to initial state before each test
    if (testContext.anvilInitState) {
      await testContext.testClient.loadState({
        state: testContext.anvilInitState,
      });
    }
  });

  afterAll(async () => {
    // Clean up
    await teardownTestEnvironment(testContext);
  });

  test("testEncodeAndDecode", () => {
    const data = {
      amount: parseEther("100"),
      payee: bob,
    };

    const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(data);
    const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);
    expect(decoded.amount).toEqual(data.amount);
    expect(decoded.payee.toLowerCase()).toBe(data.payee.toLowerCase());
  });

  describe("Native Token Payment Tests", () => {
    test("testDirectNativeTokenPayment", async () => {
      const paymentAmount = parseEther("1.0");

      // Check initial balance
      const initialBalance = await testClient.getBalance({
        address: bob,
      });

      // Alice makes a direct payment to Bob
      const { hash } = await aliceClient.nativeToken.payment.pay({
        amount: paymentAmount,
        payee: bob,
      });

      expect(hash).not.toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );

      // Wait for transaction to be mined
      await testClient.waitForTransactionReceipt({ hash });

      // Check that Bob's balance increased
      const finalBalance = await testClient.getBalance({
        address: bob,
      });
      expect(finalBalance).toBe(initialBalance + paymentAmount);
    });

    test("testSmallNativeTokenPayment", async () => {
      const paymentAmount = parseEther("0.001"); // Small payment

      const initialBalance = await testClient.getBalance({
        address: bob,
      });

      const { hash } = await aliceClient.nativeToken.payment.pay({
        amount: paymentAmount,
        payee: bob,
      });

      await testClient.waitForTransactionReceipt({ hash });

      const finalBalance = await testClient.getBalance({
        address: bob,
      });
      expect(finalBalance).toBe(initialBalance + paymentAmount);
    });

    test("testLargeNativeTokenPayment", async () => {
      const paymentAmount = parseEther("5.0"); // Large payment (reduced from 10 ETH to fit within 10 ETH balance)

      const initialBalance = await testClient.getBalance({
        address: bob,
      });

      const { hash } = await aliceClient.nativeToken.payment.pay({
        amount: paymentAmount,
        payee: bob,
      });

      await testClient.waitForTransactionReceipt({ hash });

      const finalBalance = await testClient.getBalance({
        address: bob,
      });
      expect(finalBalance).toBe(initialBalance + paymentAmount);
    });

    test("testPaymentToMultipleRecipients", async () => {
      const paymentAmount = parseEther("0.5");
      const recipients = [bob, charlie];

      for (const recipient of recipients) {
        const initialBalance = await testClient.getBalance({
          address: recipient,
        });

        const { hash } = await aliceClient.nativeToken.payment.pay({
          amount: paymentAmount,
          payee: recipient,
        });

        await testClient.waitForTransactionReceipt({ hash });

        const finalBalance = await testClient.getBalance({
          address: recipient,
        });
        expect(finalBalance).toBe(initialBalance + paymentAmount);
      }
    });

    test("testWeiLevelPrecision", async () => {
      const weiAmount = BigInt(1); // 1 wei

      const initialBalance = await testClient.getBalance({
        address: bob,
      });

      const { hash } = await aliceClient.nativeToken.payment.pay({
        amount: weiAmount,
        payee: bob,
      });

      await testClient.waitForTransactionReceipt({ hash });

      const finalBalance = await testClient.getBalance({
        address: bob,
      });
      expect(finalBalance).toBe(initialBalance + weiAmount);
    });
  });

  describe("Native Token Obligation Data Tests", () => {
    test("testVariousAmounts", () => {
      const testCases = [
        { amount: BigInt(0), description: "zero Native Token" },
        { amount: parseEther("0.001"), description: "small amount" },
        { amount: parseEther("1.0"), description: "one Native Token" },
        { amount: parseEther("5.0"), description: "large amount" },
        { amount: BigInt(1), description: "1 wei" },
      ];

      testCases.forEach(({ amount, description }) => {
        const obligationData = {
          amount,
          payee: alice,
        };

        const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(obligationData);
        const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);

        expect(decoded.amount).toBe(amount);
        expect(decoded.payee.toLowerCase()).toBe(alice.toLowerCase());
      });
    });

    test("testDifferentPayeeAddresses", () => {
      const testAddresses = [alice, bob, charlie];

      testAddresses.forEach((payee) => {
        const obligationData = {
          amount: parseEther("1.0"),
          payee,
        };

        const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(obligationData);
        const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);

        expect(decoded.amount).toBe(parseEther("1.0"));
        expect(decoded.payee.toLowerCase()).toBe(payee.toLowerCase());
      });
    });
  });

  describe("Native Token Demand Creation Tests", () => {
    test("testCreatePaymentDemand", () => {
      const obligationData = {
        amount: parseEther("2.0"),
        payee: bob,
      };

      const demand = aliceClient.nativeToken.payment.createDemand(obligationData.amount, obligationData.payee);

      // Verify the demand structure
      expect(demand.arbiter).toBe(testContext.addresses.nativeTokenPaymentObligation);
      expect(demand.demand).toBeDefined();
      expect(typeof demand.demand).toBe("string");
      expect(demand.demand.startsWith("0x")).toBe(true);

      // Verify we can decode the demand data
      const decoded = aliceClient.nativeToken.payment.decodeObligation(demand.demand);
      expect(decoded.amount).toBe(obligationData.amount);
      expect(decoded.payee.toLowerCase()).toBe(obligationData.payee.toLowerCase());
    });

    test("testCreateEscrowDemand", () => {
      const escrowData = {
        arbiter: testContext.addresses.trivialArbiter,
        demand: "0x" as `0x${string}`,
        amount: parseEther("2.0"),
      };

      // Manually construct escrow demand using the new nested API
      const demand = {
        arbiter: testContext.addresses.nativeTokenEscrowObligation,
        demand: aliceClient.nativeToken.escrow.nonTierable.encodeObligationRaw(escrowData),
      };

      expect(demand.arbiter).toBe(testContext.addresses.nativeTokenEscrowObligation);
      expect(demand.demand).toBeDefined();
      expect(typeof demand.demand).toBe("string");
      expect(demand.demand.startsWith("0x")).toBe(true);
    });
  });

  describe("Native Token Contract Integration Tests", () => {
    test("testPaymentContractAddress", () => {
      expect(testContext.addresses.nativeTokenPaymentObligation).toBeDefined();
      expect(testContext.addresses.nativeTokenPaymentObligation.startsWith("0x")).toBe(true);
      expect(testContext.addresses.nativeTokenPaymentObligation.length).toBe(42);
    });

    test("testEscrowContractAddress", () => {
      expect(testContext.addresses.nativeTokenEscrowObligation).toBeDefined();
      expect(testContext.addresses.nativeTokenEscrowObligation.startsWith("0x")).toBe(true);
      expect(testContext.addresses.nativeTokenEscrowObligation.length).toBe(42);
    });

    test("testPaymentContractInteraction", async () => {
      const paymentData = {
        amount: parseEther("0.1"),
        payee: bob,
      };

      // Test that the payment contract can be called successfully
      const { hash } = await aliceClient.nativeToken.payment.pay(paymentData);

      expect(hash).toBeDefined();
      expect(hash.startsWith("0x")).toBe(true);
      expect(hash.length).toBe(66); // 0x + 64 hex characters

      // Verify the transaction was successful
      const receipt = await testClient.waitForTransactionReceipt({ hash });
      expect(receipt.status).toBe("success");
    });

    test("testEncodingRoundTrip", () => {
      const validData = {
        amount: parseEther("1.0"),
        payee: alice,
      };

      // Verify round-trip encoding/decoding works correctly
      const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(validData);
      const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);
      expect(decoded.amount).toBe(validData.amount);
      expect(decoded.payee.toLowerCase()).toBe(validData.payee.toLowerCase());
    });
  });

  describe("Native Token Escrow Tests", () => {
    test("testEscrowObligation", async () => {
      const escrowData = {
        arbiter: testContext.addresses.trivialArbiter,
        demand: "0x" as `0x${string}`,
        amount: parseEther("2.0"),
      };

      // Create escrow using the new nested API
      const { hash } = await aliceClient.nativeToken.escrow.nonTierable.create(
        escrowData.amount,
        { arbiter: escrowData.arbiter, demand: escrowData.demand },
        BigInt(Math.floor(Date.now() / 1000) + 86400) // 1 day expiration
      );

      expect(hash).toBeDefined();
      expect(hash.startsWith("0x")).toBe(true);

      const receipt = await testClient.waitForTransactionReceipt({ hash });
      expect(receipt.status).toBe("success");
    });
  });

  describe("Native Token Edge Cases", () => {
    test("testZeroAmountHandling", () => {
      const paymentData = {
        amount: BigInt(0),
        payee: bob,
      };

      // Zero amount should be encoded/decoded correctly
      const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(paymentData);
      const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);

      expect(decoded.amount).toBe(BigInt(0));
      expect(decoded.payee.toLowerCase()).toBe(bob.toLowerCase());
    });

    test("testMaxAmountHandling", () => {
      const maxAmount = BigInt("0xffffffffffffffffffffffffffffffff"); // Large amount
      const paymentData = {
        amount: maxAmount,
        payee: bob,
      };

      const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(paymentData);
      const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);

      expect(decoded.amount).toBe(maxAmount);
      expect(decoded.payee.toLowerCase()).toBe(bob.toLowerCase());
    });

    test("testSelfPayment", async () => {
      const paymentAmount = parseEther("0.1");

      const initialBalance = await testClient.getBalance({
        address: alice,
      });

      // Alice pays herself
      const { hash } = await aliceClient.nativeToken.payment.pay({
        amount: paymentAmount,
        payee: alice,
      });

      await testClient.waitForTransactionReceipt({ hash });

      // Balance should be same amount + paymentAmount - gas fees
      const finalBalance = await testClient.getBalance({
        address: alice,
      });

      // Since Alice pays gas but receives the payment, the net should be roughly the same
      // but slightly less due to gas costs. We just verify the transaction succeeded.
      expect(finalBalance).toBeLessThan(initialBalance + paymentAmount);
      expect(finalBalance).toBeGreaterThan(initialBalance - parseEther("0.01")); // Account for gas
    });
  });

  describe("Native Token Payment Encoding Validation", () => {
    test("testPaymentAmountEncoding", () => {
      const testCases = [
        { amount: parseEther("0.001"), description: "small amount" },
        { amount: parseEther("1.0"), description: "one ETH" },
        { amount: parseEther("5.0"), description: "large amount" },
        { amount: BigInt(1), description: "1 wei" },
        { amount: BigInt(0), description: "zero amount" },
      ];

      testCases.forEach(({ amount }) => {
        const obligationData = {
          amount,
          payee: bob,
        };

        // Verify encoding/decoding round-trip works for all amounts
        const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(obligationData);
        const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);
        expect(decoded.amount).toBe(amount);
        expect(decoded.payee.toLowerCase()).toBe(bob.toLowerCase());
      });
    });

    test("testPayeeAddressEncoding", () => {
      const validAddresses = [alice, bob, charlie];

      validAddresses.forEach(payee => {
        const obligationData = {
          amount: parseEther("1.0"),
          payee,
        };

        // Verify encoding/decoding round-trip works for all addresses
        const encoded = aliceClient.nativeToken.payment.encodeObligationRaw(obligationData);
        const decoded = aliceClient.nativeToken.payment.decodeObligation(encoded);
        expect(decoded.amount).toBe(parseEther("1.0"));
        expect(decoded.payee.toLowerCase()).toBe(payee.toLowerCase());
      });
    });
  });
});