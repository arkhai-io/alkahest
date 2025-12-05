import { afterEach, beforeEach, expect, test } from "bun:test";
import { encodeAbiParameters, hexToBytes, parseAbiParameters, parseEther, stringToHex } from "viem";
import { setupTestEnvironment, type TestContext, teardownTestEnvironment } from "../utils/setup";

const stringObligationAbi = parseAbiParameters("(string item)");
const uptimeDemandAbi = parseAbiParameters("(bytes payload)");
const textDecoder = new TextDecoder();

let testContext: TestContext;

type UptimeDemand = {
  service_url: string;
  min_uptime: number;
  start: number;
  end: number;
  check_interval_secs: number;
};

type PingEvent = {
  delayMs: number;
  success: boolean;
};

type UptimeJob = {
  minUptime: number;
  schedule: PingEvent[];
};

type SchedulerContext = {
  jobDb: Map<`0x${string}`, UptimeJob>;
  urlIndex: Map<string, `0x${string}`>;
  waiters: Array<() => void>;
};

let schedulerContext: SchedulerContext | undefined;

type ArbiterModule = TestContext["charlie"]["client"]["arbiters"];

function setScheduler(ctx?: SchedulerContext) {
  schedulerContext = ctx;
}

function getScheduler() {
  return schedulerContext;
}

function notifyScheduler(ctx: SchedulerContext) {
  const waiter = ctx.waiters.shift();
  waiter?.();
}

function removeWaiter(ctx: SchedulerContext, waiter: () => void) {
  const idx = ctx.waiters.indexOf(waiter);
  if (idx !== -1) ctx.waiters.splice(idx, 1);
}

async function waitForJob(ctx: SchedulerContext, timeoutMs: number) {
  if (ctx.jobDb.size > 0) return true;
  return await new Promise<boolean>((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    const waiter = () => {
      clearTimeout(timer);
      removeWaiter(ctx, waiter);
      resolve(true);
    };
    timer = setTimeout(() => {
      removeWaiter(ctx, waiter);
      resolve(false);
    }, timeoutMs);
    ctx.waiters.push(waiter);
  });
}

function dequeueJob(ctx: SchedulerContext) {
  const next = ctx.jobDb.entries().next();
  if (next.done) return undefined;
  const [uid, job] = next.value;
  ctx.jobDb.delete(uid);
  return { uid, job };
}

function startSchedulerWorker(ctx: SchedulerContext, arbiters: ArbiterModule) {
  let active = true;

  const promise = (async () => {
    while (active) {
      let entry = dequeueJob(ctx);
      if (!entry) {
        const hasJob = await waitForJob(ctx, 2000);
        if (!hasJob) {
          if (ctx.jobDb.size === 0) break;
          continue;
        }
        entry = dequeueJob(ctx);
        if (!entry) continue;
      }

      const { uid, job } = entry;
      let successes = 0;
      const totalChecks = Math.max(job.schedule.length, 1);

      for (const ping of job.schedule) {
        await Bun.sleep(ping.delayMs);
        if (ping.success) successes += 1;
      }

      const uptime = successes / totalChecks;
      const decision = uptime >= job.minUptime;
      await arbiters.general.trustedOracle.arbitrate(uid, decision);
    }
  })();

  return {
    stop: () => {
      active = false;
      notifyScheduler(ctx);
    },
    promise,
  };
}

beforeEach(async () => {
  testContext = await setupTestEnvironment();
});

afterEach(async () => {
  setScheduler(undefined);
  await teardownTestEnvironment(testContext);
});

test("asynchronous offchain oracle uptime flow", async () => {
  const now = Math.floor(Date.now() / 1000);
  const demandPayload: UptimeDemand = {
    service_url: "https://uptime.hyperspace",
    min_uptime: 0.75,
    start: now,
    end: now + 10,
    check_interval_secs: 2,
  };

  const demandBytes = encodeAbiParameters(uptimeDemandAbi, [{ payload: stringToHex(JSON.stringify(demandPayload)) }]);

  const demand = testContext.alice.client.arbiters.general.trustedOracle.encode({
    oracle: testContext.charlie.address,
    data: demandBytes,
  });

  const { attested: escrow } = await testContext.alice.client.erc20.permitAndBuyWithErc20(
    {
      address: testContext.mockAddresses.erc20A,
      value: parseEther("100"),
    },
    {
      arbiter: testContext.addresses.trustedOracleArbiter,
      demand,
    },
    BigInt(now + 3600),
  );

  const serviceUrl = demandPayload.service_url;
  const { attested: fulfillment } = await testContext.bob.client.stringObligation.doObligation(serviceUrl, escrow.uid);

  const scheduler: SchedulerContext = {
    jobDb: new Map(),
    urlIndex: new Map(),
    waiters: [],
  };
  scheduler.urlIndex.set(serviceUrl, fulfillment.uid);
  setScheduler(scheduler);

  const worker = startSchedulerWorker(scheduler, testContext.charlie.client.arbiters);

  const listener = await testContext.charlie.client.oracle.listenAndArbitrate(
    async (attestation) => {
      const ctx = getScheduler();
      if (!ctx) return null;

      // Extract obligation data
      const obligation = testContext.charlie.client.extractObligationData(stringObligationAbi, attestation);

      const statement = obligation[0];
      if (!statement?.item) return null;

      const fulfillmentUid = ctx.urlIndex.get(statement.item);
      if (!fulfillmentUid || ctx.jobDb.has(fulfillmentUid)) return null;

      // Get escrow and extract demand data
      const [, demandData] = await testContext.charlie.client.getEscrowAndDemand(uptimeDemandAbi, attestation);

      const payloadHex = demandData[0]?.payload;
      if (!payloadHex) return null;

      let parsed: UptimeDemand;
      try {
        const json = textDecoder.decode(hexToBytes(payloadHex));
        parsed = JSON.parse(json) as UptimeDemand;
      } catch {
        return null;
      }

      const totalSpan = Math.max(parsed.end - parsed.start, 1);
      const interval = Math.max(parsed.check_interval_secs, 1);
      const checks = Math.max(Math.floor(totalSpan / interval), 1);
      const schedule: PingEvent[] = [];
      for (let i = 0; i < checks; i++) {
        schedule.push({ delayMs: 100 + i * 25, success: i !== 1 });
      }

      ctx.jobDb.set(fulfillmentUid, {
        minUptime: parsed.min_uptime,
        schedule,
      });
      notifyScheduler(ctx);
      return null;
    },
    { skipAlreadyArbitrated: true },
  );

  await testContext.bob.client.oracle.requestArbitration(fulfillment.uid, testContext.charlie.address);

  const arbitration = await testContext.charlie.client.arbiters.general.trustedOracle.waitForArbitration(
    fulfillment.uid,
    testContext.charlie.address,
  );

  expect(arbitration?.decision).toBe(true);

  let collectionHash: `0x${string}` | undefined;
  for (let attempts = 0; attempts < 50; attempts++) {
    try {
      collectionHash = await testContext.bob.client.erc20.collectEscrow(escrow.uid, fulfillment.uid);
      break;
    } catch {
      await Bun.sleep(100);
    }
  }

  expect(collectionHash).toBeTruthy();

  listener.unwatch();
  worker.stop();
  await worker.promise;
  setScheduler(undefined);
});
