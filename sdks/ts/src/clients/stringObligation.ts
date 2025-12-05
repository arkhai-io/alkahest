import type { Type } from "arktype";
import { decodeAbiParameters, encodeAbiParameters, getAbiItem } from "viem";
import type { SafeParseReturnType, ZodTypeDef, z } from "zod";

import { abi as stringObligationAbi } from "../contracts/StringObligation";
import type { ChainAddresses } from "../types";
import type { ViemClient } from "../utils";
import { getAttestation, getAttestedEventFromTxHash } from "../utils";

// Extract ABI type at module initialization with fail-fast error handling
const stringObligationDecodeFunction = getAbiItem({
  abi: stringObligationAbi.abi,
  name: "decodeObligationData",
});

// Extract the ObligationData struct type from the function output
const stringObligationDataType = stringObligationDecodeFunction.outputs[0];

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

export const makeStringObligationClient = (
  viemClient: ViemClient,
  addresses: Pick<ChainAddresses, "stringObligation" | "eas">,
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
    /**
     * Gets a complete obligation from its attestation UID, combining attestation metadata with decoded obligation data
     * @param uid - UID of the attestation
     * @returns The complete obligation including attestation metadata and decoded obligation data
     */
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
