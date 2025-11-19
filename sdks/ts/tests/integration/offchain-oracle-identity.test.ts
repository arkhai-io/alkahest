import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { parseAbiParameters, recoverMessageAddress } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";

const stringObligationAbi = parseAbiParameters("(string item)");

let testContext: TestContext;

const identityRegistry = new Map<`0x${string}`, number>();
const identityChallenge = "proof-of-identity";

type IdentityFulfillment = {
  pubkey: `0x${string}`;
  nonce: number;
  data: string;
  signature: `0x${string}`;
};

beforeAll(async () => {
  testContext = await setupTestEnvironment();
});

beforeEach(async () => {
  identityRegistry.clear();
  if (testContext.anvilInitState) {
    await testContext.testClient.loadState({
      state: testContext.anvilInitState,
    });
  }
});

afterAll(async () => {
  identityRegistry.clear();
  await teardownTestEnvironment(testContext);
});

function createIdentityPayloadFactory(address: `0x${string}`, signer: ReturnType<typeof privateKeyToAccount>) {
  return async (nonce: number) => {
    const message = `${identityChallenge}:${nonce}`;
    const signature = await signer.signMessage({ message });

    const payload: IdentityFulfillment = {
      pubkey: address,
      nonce,
      data: identityChallenge,
      signature,
    };

    return JSON.stringify(payload);
  };
}

test("contextless offchain identity oracle flow", async () => {
  const identityAccount = privateKeyToAccount(generatePrivateKey());
  identityRegistry.set(identityAccount.address, 0);

  const listener = await testContext.charlieClient.oracle.listenAndArbitrate(
    async (attestation) => {
      // Extract obligation data
      const obligation = testContext.charlieClient.extractObligationData(stringObligationAbi, attestation);

      const payload = obligation[0]?.item;
      if (!payload) return false;

      let parsed: IdentityFulfillment;
      try {
        parsed = JSON.parse(payload) as IdentityFulfillment;
      } catch {
        return false;
      }

      const currentNonce = identityRegistry.get(parsed.pubkey);
      if (currentNonce === undefined) return false;
      if (parsed.nonce <= currentNonce) return false;

      if (typeof parsed.signature !== "string" || parsed.signature.length !== 132) {
        return false;
      }

      const message = `${parsed.data}:${parsed.nonce}`;
      let recovered: `0x${string}`;
      try {
        recovered = await recoverMessageAddress({ message, signature: parsed.signature });
      } catch {
        return false;
      }

      if (recovered.toLowerCase() !== parsed.pubkey.toLowerCase()) {
        return false;
      }

      identityRegistry.set(parsed.pubkey, parsed.nonce);
      return true;
    },
    { skipAlreadyArbitrated: true },
  );

  const createPayload = createIdentityPayloadFactory(identityAccount.address, identityAccount);

  const goodPayload = await createPayload(1);
  const { attested: goodFulfillment } = await testContext.bobClient.stringObligation.doObligation(goodPayload);

  await testContext.bobClient.oracle.requestArbitration(goodFulfillment.uid, testContext.charlie);

  const goodDecision = await testContext.charlieClient.arbiters.waitForTrustedOracleArbitration(
    goodFulfillment.uid,
    testContext.charlie,
  );

  expect(goodDecision?.decision).toBe(true);
  expect(identityRegistry.get(identityAccount.address)).toBe(1);

  const badPayload = await createPayload(1);
  const { attested: badFulfillment } = await testContext.bobClient.stringObligation.doObligation(badPayload);

  await testContext.bobClient.oracle.requestArbitration(badFulfillment.uid, testContext.charlie);

  const badDecision = await testContext.charlieClient.arbiters.waitForTrustedOracleArbitration(
    badFulfillment.uid,
    testContext.charlie,
  );

  expect(badDecision?.decision).toBe(false);

  listener.unwatch();
  identityRegistry.clear();
});
