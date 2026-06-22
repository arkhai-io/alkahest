import { describe, expect, test } from "bun:test";
import {
  decodeHookEscrowObligation,
  decodeHooksEscrowObligation,
  decodeSplitterDemand,
  encodeHookEscrowObligation,
  encodeHooksEscrowObligation,
  encodeSplitterDemand,
  splitterDecisionKey,
} from "../../src";

const addr = "0x1111111111111111111111111111111111111111" as const;
const addr2 = "0x2222222222222222222222222222222222222222" as const;
const uid = `0x${"11".repeat(32)}` as const;
const escrow = `0x${"22".repeat(32)}` as const;

describe("Hook-based escrow and splitter codecs", () => {
  test("encodes and decodes HookEscrowObligation data", () => {
    const encoded = encodeHookEscrowObligation({
      arbiter: addr,
      demand: "0x1234",
      hook: addr2,
      hookData: "0xabcd",
    });

    expect(decodeHookEscrowObligation(encoded)).toEqual({
      arbiter: addr,
      demand: "0x1234",
      hook: addr2,
      hookData: "0xabcd",
    });
  });

  test("encodes and decodes HooksEscrowObligation data", () => {
    const encoded = encodeHooksEscrowObligation({
      arbiter: addr,
      demand: "0x1234",
      hooks: [addr2],
      hookDatas: ["0xabcd"],
      values: [7n],
    });

    expect(decodeHooksEscrowObligation(encoded)).toEqual({
      arbiter: addr,
      demand: "0x1234",
      hooks: [addr2],
      hookDatas: ["0xabcd"],
      values: [7n],
    });
  });

  test("encodes splitter demand and computes decision keys", () => {
    const encoded = encodeSplitterDemand({ oracle: addr, data: "0x1234" });

    expect(decodeSplitterDemand(encoded)).toEqual({ oracle: addr, data: "0x1234" });
    expect(splitterDecisionKey(uid, escrow)).toMatch(/^0x[0-9a-f]{64}$/);
  });
});
