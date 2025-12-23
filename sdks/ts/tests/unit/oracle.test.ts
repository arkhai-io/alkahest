import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { setupTestEnvironment, type TestContext } from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";

let testContext: TestContext;

beforeAll(async () => {
  testContext = await setupTestEnvironment();
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

test("trivial arbitratePast", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);

  // Wait for arbitration request to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  const obligationAbi = parseAbiParameters("(string item)");
  const decisions = await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
    return true;
  });

  decisions.forEach(($) => expect($.decision).toBe(true));

  const collectionHash = await testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();
});

test("conditional arbitratePast", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment1 } = await testContext.bob.client.stringObligation.doObligation("good", escrow.uid);

  const { attested: fulfillment2 } = await testContext.bob.client.stringObligation.doObligation("bad", escrow.uid);

  // Request arbitration for both
  const requestHash1 = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment1.uid, testContext.bob.address, demand);
  const requestHash2 = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment2.uid, testContext.bob.address, demand);

  // Wait for arbitration requests to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash1,
  });
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash2,
  });

  const obligationAbi = parseAbiParameters("(string item)");
  const decisions = await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
    return obligation[0].item === "good";
  });

  expect(decisions.length).toBe(2);
  expect(decisions.filter((d) => d.decision).length).toBe(1);

  const failedCollection = testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment2.uid);
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment1.uid);

  expect(collectionHash).toBeTruthy();
});

test("arbitratePast with skipAlreadyArbitrated", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);

  // Wait for arbitration request to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  const obligationAbi = parseAbiParameters("(string item)");

  // First arbitration
  const firstDecisions = await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
    return obligation[0].item === "foo";
  });

  expect(firstDecisions.length).toBe(1);

  // Wait for transaction confirmation
  const firstDecision = firstDecisions[0];
  if (!firstDecision) throw new Error("No first decision found");
  await testContext.testClient.waitForTransactionReceipt({
    hash: firstDecision.hash,
  });

  // Second arbitration with skipAlreadyArbitrated should find nothing
  const secondDecisions = await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(
    async (attestation) => {
      const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo";
    },
    { mode: "unarbitrated" },
  );

  expect(secondDecisions.length).toBe(0);
});

test("listenAndArbitrate", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const obligationAbi = parseAbiParameters("(string item)");
  const { decisions, unwatch } = await testContext.bob.client.arbiters.general.trustedOracle.listenAndArbitrate(
    async (attestation) => {
      const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
      return true;
    },
    {
      onAfterArbitrate: async (decision) => {
        const obligation = testContext.bob.client.extractObligationData(obligationAbi, decision.attestation);
        expect(decision.attestation.uid).toEqual(fulfillment.uid);
        expect(obligation[0].item).toEqual("foo");
        expect(decision.decision).toBe(true);
      },
      pollingInterval: 50,
    },
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);

  await Bun.sleep(150);

  const collectionHash = await testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("listenAndArbitrate with mode: 'new'", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const obligationAbi = parseAbiParameters("(string item)");

  // Start listening with onlyNew: true
  const { decisions, unwatch } = await testContext.bob.client.arbiters.general.trustedOracle.listenAndArbitrate(
    async (attestation) => {
      const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "good";
    },
    {
      mode: "new",
      pollingInterval: 50,
    },
  );

  expect(decisions.length).toBe(0); // Should not arbitrate past

  // Create new fulfillment
  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("good", escrow.uid);

  // Request arbitration
  await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);

  await Bun.sleep(150);

  const collectionHash = await testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();

  unwatch();
});

test("arbitratePast with escrow demand extraction", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment1 } = await testContext.bob.client.stringObligation.doObligation("foo", escrow.uid);

  const { attested: fulfillment2 } = await testContext.bob.client.stringObligation.doObligation("bar", escrow.uid);

  // Request arbitration for both
  const requestHash1 = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment1.uid, testContext.bob.address, demand);
  const requestHash2 = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment2.uid, testContext.bob.address, demand);

  // Wait for arbitration requests to be confirmed
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash1,
  });
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash2,
  });

  const obligationAbi = parseAbiParameters("(string item)");
  const demandAbi = parseAbiParameters("(string mockDemand)");

  const decisions = await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
    const [, demandData] = await testContext.bob.client.getEscrowAndDemand(demandAbi, attestation);
    return obligation[0].item === demandData[0].mockDemand;
  });

  expect(decisions.length).toBe(2);
  expect(decisions.filter((d) => d.decision).length).toBe(1);

  const failedCollection = testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment2.uid);
  expect(async () => await failedCollection).toThrow();

  const collectionHash = await testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment1.uid);

  expect(collectionHash).toBeTruthy();
});

test("waitForArbitration with existing decision", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Make arbitration decision
  const obligationAbi = parseAbiParameters("(string item)");
  const decisions = await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
    const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
    return obligation[0].item === "foo";
  });

  // Wait for arbitration transaction to be confirmed
  if (decisions[0]) {
    await testContext.testClient.waitForTransactionReceipt({
      hash: decisions[0].hash,
    });
  }

  // waitForArbitration should immediately return the existing decision
  const result = await testContext.bob.client.arbiters.general.trustedOracle.waitForArbitration(fulfillment.uid, testContext.bob.address);

  expect(result.obligation).toBe(fulfillment.uid);
  expect(result.oracle).toBe(testContext.bob.address);
  expect(result.decision).toBe(true);
});

test("waitForArbitration with new decision", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Start waiting for arbitration (this should wait for a new decision)
  const waitPromise = testContext.bob.client.arbiters.general.trustedOracle.waitForArbitration(fulfillment.uid, testContext.bob.address);

  // Make arbitration decision after a short delay
  setTimeout(async () => {
    const obligationAbi = parseAbiParameters("(string item)");
    await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
      const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo";
    });
  }, 100);

  // Wait for the arbitration result
  const result = await waitPromise;

  expect(result.obligation).toBe(fulfillment.uid);
  expect(result.oracle).toBe(testContext.bob.address);
  expect(result.decision).toBe(true);
});

test("waitForArbitration with false decision", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("bad", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Start waiting for arbitration
  const waitPromise = testContext.bob.client.arbiters.general.trustedOracle.waitForArbitration(fulfillment.uid, testContext.bob.address);

  // Make arbitration decision with false result
  setTimeout(async () => {
    const obligationAbi = parseAbiParameters("(string item)");
    await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
      const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo"; // This will be false for "bad"
    });
  }, 100);

  // Wait for the arbitration result
  const result = await waitPromise;

  expect(result.obligation).toBe(fulfillment.uid);
  expect(result.oracle).toBe(testContext.bob.address);
  expect(result.decision).toBe(false);
});

test("waitForArbitration integration with escrow collection", async () => {
  const arbiter = testContext.addresses.trustedOracleArbiter;
  const demand = testContext.alice.client.arbiters.general.trustedOracle.encodeDemand({
    oracle: testContext.bob.address,
    data: encodeAbiParameters(parseAbiParameters("(string mockDemand)"), [{ mockDemand: "foo" }]),
  });

  const { attested: escrow } = await testContext.alice.client.erc20.escrow.nonTierable.permitAndCreate(
    {
      address: testContext.mockAddresses.erc20A,
      value: 10n,
    },
    { arbiter, demand },
    0n,
  );

  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation("foo", escrow.uid);

  // Request arbitration
  const requestHash = await testContext.bob.client.arbiters.general.trustedOracle.requestArbitration(fulfillment.uid, testContext.bob.address, demand);
  await testContext.testClient.waitForTransactionReceipt({
    hash: requestHash,
  });

  // Wait for arbitration and then collect escrow
  const waitPromise = testContext.bob.client.arbiters.general.trustedOracle.waitForArbitration(fulfillment.uid, testContext.bob.address);

  // Make arbitration decision
  setTimeout(async () => {
    const obligationAbi = parseAbiParameters("(string item)");
    await testContext.bob.client.arbiters.general.trustedOracle.arbitratePast(async (attestation) => {
      const obligation = testContext.bob.client.extractObligationData(obligationAbi, attestation);
      return obligation[0].item === "foo";
    });
  }, 100);

  // Wait for the arbitration result
  const result = await waitPromise;

  expect(result.decision).toBe(true);

  // Now collect escrow using the arbitration result
  const collectionHash = await testContext.bob.client.erc20.escrow.nonTierable.collect(escrow.uid, fulfillment.uid);

  expect(collectionHash).toBeTruthy();
});
