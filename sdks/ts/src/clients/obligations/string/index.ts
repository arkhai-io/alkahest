import type { Type } from "arktype";
import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import type { SafeParseReturnType, z } from "zod";

import { abi as stringObligationAbi } from "../../../contracts/obligations/StringObligation";
import type { ChainAddresses } from "../../../types";
import type { ViemClient } from "../../../utils";
import { getAttestation, getAttestedEventFromTxHash } from "../../../utils";

// Extract ABI type at module initialization with fail-fast error handling
const stringObligationDecodeFunction = getAbiItem({
  abi: stringObligationAbi.abi,
  name: "decodeObligationData",
});

// Extract the ObligationData struct type from the function output
const stringObligationDataType = stringObligationDecodeFunction.outputs[0];

/**
 * StringObligation ObligationData type
 */
export type StringObligationData = {
  item: string;
};

/**
 * Encodes StringObligation.ObligationData to bytes.
 * @param data - struct ObligationData {string item}
 * @returns abi encoded bytes
 */
export const encodeObligation = (data: StringObligationData): `0x${string}` => {
  return encodeAbiParameters([stringObligationDataType], [data]);
};

/**
 * Decodes StringObligation.ObligationData from bytes.
 * @param obligationData - ObligationData as abi encoded bytes
 * @returns the decoded ObligationData object
 */
export const decodeObligation = (obligationData: `0x${string}`): StringObligationData => {
  return decodeAbiParameters([stringObligationDataType], obligationData)[0] as StringObligationData;
};

// Type helper for Zod parse functions return types
type ZodParseReturnType<
  TSchema extends z.ZodSchema,
  TAsync extends boolean | undefined,
  TSafe extends boolean | undefined,
> = TSafe extends true
  ? TAsync extends true
    ? Promise<SafeParseReturnType<z.infer<TSchema>, z.infer<TSchema>>>
    : SafeParseReturnType<z.infer<TSchema>, z.infer<TSchema>>
  : TAsync extends true
    ? Promise<z.infer<TSchema>>
    : z.infer<TSchema>;

export type StringAddresses = {
  eas: `0x${string}`;
  stringObligation: `0x${string}`;
};

export const pickStringAddresses = (addresses: ChainAddresses): StringAddresses => ({
  eas: addresses.eas,
  stringObligation: addresses.stringObligation,
});

export type StringObligationClient = ReturnType<typeof makeStringObligationClient>;

export const makeStringObligationClient = (
  viemClient: ViemClient,
  addresses: StringAddresses,
) => {
  const decode = (obligationData: `0x${string}`) => {
    return decodeAbiParameters([stringObligationDataType], obligationData)[0];
  };

  const doObligation = async (
    item: string,
    refUID: `0x${string}` = "0x0000000000000000000000000000000000000000000000000000000000000000",
  ) => {
    const { request } = await viemClient.simulateContract({
      address: addresses.stringObligation,
      abi: stringObligationAbi.abi,
      functionName: "doObligation",
      args: [{ item }, refUID],
    });

    const hash = await viemClient.writeContract(request);
    const attested = await getAttestedEventFromTxHash(viemClient, hash);
    return { hash, attested };
  };

  const getZodParseFunc = (opts: { async: boolean; safe: boolean }) => {
    let command = opts.safe ? "safeParse" : "parse";
    if (opts.async) {
      command += "Async";
    }
    return command as "parse" | "parseAsync" | "safeParse" | "safeParseAsync";
  };

  const getSchema = async () =>
    await viemClient.readContract({
      address: addresses.stringObligation,
      abi: stringObligationAbi.abi,
      functionName: "ATTESTATION_SCHEMA",
    });

  return {
    address: addresses.stringObligation,

    encode: (data: { item: string }) => {
      return encodeAbiParameters([stringObligationDataType], [data]);
    },
    decode,
    decodeJson: <T>(obligationData: `0x${string}`) => {
      const decoded = decode(obligationData);
      return JSON.parse(decoded.item) as T;
    },
    decodeZod: <TSchema extends z.ZodSchema, TAsync extends boolean = false, TSafe extends boolean = false>(
      obligationData: `0x${string}`,
      schema: TSchema,
      schemaOptions?: Partial<z.ParseParams>,
      parseOptions: {
        async: TAsync;
        safe: TSafe;
      } = { async: false, safe: false } as any,
    ): ZodParseReturnType<TSchema, TAsync, TSafe> => {
      const parseFunc = getZodParseFunc(parseOptions);
      const decoded = decode(obligationData);

      // Type assertion needed because TypeScript can't infer the connection between parseFunc and return type
      return schema[parseFunc](JSON.parse(decoded.item), schemaOptions) as ZodParseReturnType<TSchema, TAsync, TSafe>;
    },
    decodeArkType: <Schema extends Type<any, any>>(
      obligationData: `0x${string}`,
      schema: Schema,
    ): Schema["inferOut"] => {
      const decoded = decode(obligationData);
      return schema(JSON.parse(decoded.item)) as Schema["inferOut"];
    },
    doObligation,
    doObligationJson: async <T>(item: T, refUid?: `0x${string}`) => {
      return await doObligation(JSON.stringify(item), refUid);
    },
    getSchema,
    getObligation: async (uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid, addresses), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([stringObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data,
      };
    },
    getJsonObligation: async <T>(uid: `0x${string}`) => {
      const [attestation, schema] = await Promise.all([getAttestation(viemClient, uid, addresses), getSchema()]);

      if (attestation.schema !== schema) {
        throw new Error(`Unsupported schema: ${attestation.schema}`);
      }
      const data = decodeAbiParameters([stringObligationDataType], attestation.data)[0];

      return {
        ...attestation,
        data: {
          item: JSON.parse(data.item) as T,
        },
      };
    },
  };
};
