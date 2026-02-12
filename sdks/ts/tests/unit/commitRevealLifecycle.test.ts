import { afterAll, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { parseEther, toHex } from "viem";
import { setupTestEnvironment, type TestContext } from "../utils/setup";
import { teardownTestEnvironment } from "../utils/teardownTestEnvironment";

describe("CommitReveal Lifecycle Tests", () => {
  let testContext: TestContext;
  let alice: `0x${string}`;
  let bob: `0x${string}`;
  let aliceClient: TestContext["alice"]["client"];
  let bobClient: TestContext["bob"]["client"];
  let testClient: TestContext["testClient"];

  beforeAll(async () => {
    testContext = await setupTestEnvironment();
    alice = testContext.alice.address;
    bob = testContext.bob.address;
    aliceClient = testContext.alice.client;
    bobClient = testContext.bob.client;
    testClient = testContext.testClient;
  });

  beforeEach(async () => {
    if (testContext.anvilInitState) {
      await testContext.testClient.loadState({
        state: testContext.anvilInitState,
      });
    }
  });

  afterAll(async () => {
    await teardownTestEnvironment(testContext);
  });

  test("full lifecycle: escrow → commit → reveal → collect → reclaim bond", async () => {
    const escrowAmount = parseEther("2.0");
    const payload = toHex("hello from bob");
    const salt = ("0x" + "aa".repeat(32)) as `0x${string}`;
    const schema = ("0x" + "00".repeat(32)) as `0x${string}`;

    // ── 1. Alice creates native-token escrow with CommitReveal as arbiter ──
    const { attested: escrowAttested } =
      await aliceClient.nativeToken.escrow.nonTierable.create(
        escrowAmount,
        {
          arbiter: testContext.addresses.commitRevealObligation,
          demand: "0x", // demand is unused by CommitRevealObligation.checkObligation
        },
      );
    const escrowUid = escrowAttested.uid;
    expect(escrowUid).not.toBe("0x" + "00".repeat(32));

    // ── 2. Bob computes commitment and commits (locks bond) ──
    const obligationData = { payload, salt, schema };

    const commitment = await bobClient.commitReveal.computeCommitment(
      escrowUid,
      bob,
      obligationData,
    );
    expect(commitment).toMatch(/^0x[0-9a-f]{64}$/);

    const { hash: commitHash } = await bobClient.commitReveal.commit(commitment);
    await testClient.waitForTransactionReceipt({ hash: commitHash });

    // Verify commitment is stored
    // commitments() returns [commitBlock, commitTimestamp, committer]
    const [commitBlock, _commitTimestamp, committer] = await bobClient.commitReveal.getCommitment(commitment);
    expect(commitBlock).toBeGreaterThan(0n);
    expect((committer as string).toLowerCase()).toBe(bob.toLowerCase());

    // ── 3. Bob reveals (creates fulfillment attestation referencing escrow) ──
    // Anvil automining: each tx gets its own block, so commit and reveal are in different blocks.
    const { attested: revealAttested } = await bobClient.commitReveal.doObligation(
      obligationData,
      escrowUid,
    );
    const fulfillmentUid = revealAttested.uid;
    expect(fulfillmentUid).not.toBe("0x" + "00".repeat(32));

    // ── 4. Bob collects the escrowed native tokens ──
    const bobBalanceBefore = await testClient.getBalance({ address: bob });

    const collectHash = await bobClient.nativeToken.escrow.nonTierable.collect(
      escrowUid,
      fulfillmentUid,
    );
    await testClient.waitForTransactionReceipt({ hash: collectHash });

    const bobBalanceAfter = await testClient.getBalance({ address: bob });
    // Bob's balance should increase (escrow amount minus gas)
    // We can't check exact amount due to gas, but net should be positive
    expect(bobBalanceAfter).toBeGreaterThan(bobBalanceBefore);

    // ── 5. Bob reclaims bond ──
    const { hash: reclaimHash } = await bobClient.commitReveal.reclaimBond(fulfillmentUid);
    await testClient.waitForTransactionReceipt({ hash: reclaimHash });

    // Verify commitment is now claimed
    const claimed = await bobClient.commitReveal.isCommitmentClaimed(commitment);
    expect(claimed).toBe(true);
  });

  test("bond slashing: commit without reveal → slash after deadline", async () => {
    const escrowAmount = parseEther("2.0");
    const payload = toHex("will not reveal");
    const salt = ("0x" + "bb".repeat(32)) as `0x${string}`;
    const schema = ("0x" + "00".repeat(32)) as `0x${string}`;

    // ── 1. Alice creates native-token escrow ──
    const { attested: escrowAttested } =
      await aliceClient.nativeToken.escrow.nonTierable.create(
        escrowAmount,
        {
          arbiter: testContext.addresses.commitRevealObligation,
          demand: "0x",
        },
      );
    const escrowUid = escrowAttested.uid;

    // ── 2. Bob commits ──
    const obligationData = { payload, salt, schema };
    const commitment = await bobClient.commitReveal.computeCommitment(
      escrowUid,
      bob,
      obligationData,
    );

    const { hash: commitHash } = await bobClient.commitReveal.commit(commitment);
    await testClient.waitForTransactionReceipt({ hash: commitHash });

    // ── 3. Advance time past the commit deadline without revealing ──
    const deadline = await aliceClient.commitReveal.getCommitDeadline();
    await testClient.increaseTime({ seconds: Number(deadline) + 1 });

    // Mine a block to apply the time change
    await testClient.mine({ blocks: 1 });

    // ── 4. Anyone slashes the bond ──
    const { hash: slashHash } = await aliceClient.commitReveal.slashBond(commitment);
    await testClient.waitForTransactionReceipt({ hash: slashHash });

    // Verify commitment is now marked as claimed (slashed)
    const claimed = await aliceClient.commitReveal.isCommitmentClaimed(commitment);
    expect(claimed).toBe(true);
  });
});
