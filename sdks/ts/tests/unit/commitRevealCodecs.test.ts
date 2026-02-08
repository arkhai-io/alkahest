import { describe, expect, test } from "bun:test";
import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import { abi as commitRevealObligationAbi } from "../../src/contracts/obligations/CommitRevealObligation";
import type { CommitRevealObligationData } from "../../src/clients/obligations/commitReveal";

const decodeFunction = getAbiItem({
  abi: commitRevealObligationAbi.abi,
  name: "decodeObligationData",
});
const dataType = decodeFunction.outputs[0];

const encode = (data: CommitRevealObligationData): `0x${string}` =>
  encodeAbiParameters([dataType], [data]);

const decode = (encoded: `0x${string}`): CommitRevealObligationData =>
  decodeAbiParameters([dataType], encoded)[0] as CommitRevealObligationData;

const mockPayload = "0xdeadbeef" as `0x${string}`;
const mockSalt = "0x1111111111111111111111111111111111111111111111111111111111111111" as `0x${string}`;
const mockSchema = "0x4444444444444444444444444444444444444444444444444444444444444444" as `0x${string}`;
const zeroBytes32 = "0x0000000000000000000000000000000000000000000000000000000000000000" as `0x${string}`;

describe("CommitRevealObligation Codec", () => {
  test("should encode and decode CommitReveal obligation data", () => {
    const data: CommitRevealObligationData = {
      payload: mockPayload,
      salt: mockSalt,
      schema: mockSchema,
    };

    const encoded = encode(data);
    expect(encoded).toMatch(/^0x[0-9a-fA-F]+$/);

    const decoded = decode(encoded);
    expect(decoded.payload).toBe(data.payload);
    expect(decoded.salt).toBe(data.salt);
    expect(decoded.schema).toBe(data.schema);
  });

  test("should handle empty payload", () => {
    const data: CommitRevealObligationData = {
      payload: "0x",
      salt: mockSalt,
      schema: zeroBytes32,
    };

    const encoded = encode(data);
    const decoded = decode(encoded);
    expect(decoded.payload).toBe("0x");
    expect(decoded.salt).toBe(mockSalt);
    expect(decoded.schema).toBe(zeroBytes32);
  });

  test("should handle large payload", () => {
    const largePayload = ("0x" + "ab".repeat(1000)) as `0x${string}`;
    const data: CommitRevealObligationData = {
      payload: largePayload,
      salt: mockSalt,
      schema: mockSchema,
    };

    const encoded = encode(data);
    const decoded = decode(encoded);
    expect(decoded.payload).toBe(largePayload);
  });

  test("should produce deterministic encoding", () => {
    const data: CommitRevealObligationData = {
      payload: mockPayload,
      salt: mockSalt,
      schema: mockSchema,
    };

    const encoded1 = encode(data);
    const encoded2 = encode(data);
    expect(encoded1).toBe(encoded2);
  });

  test("should round-trip encode-decode-encode", () => {
    const data: CommitRevealObligationData = {
      payload: mockPayload,
      salt: mockSalt,
      schema: mockSchema,
    };

    const encoded1 = encode(data);
    const decoded = decode(encoded1);
    const encoded2 = encode(decoded);
    expect(encoded1).toBe(encoded2);
  });
});
