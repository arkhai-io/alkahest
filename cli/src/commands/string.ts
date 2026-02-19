import { Command } from "commander";
import { createAlkahestClient, loadAddresses } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";

const ZERO_UID = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

export function makeStringCommand() {
  const string = new Command("string").description("String obligation operations");

  const create = new Command("create")
    .description("Create a string obligation attestation")
    .requiredOption("--item <string>", "String content")
    .option("--schema <uid>", "Schema UID")
    .option("--ref-uid <uid>", "Reference attestation UID");

  create.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const schema = (opts.schema as `0x${string}`) || ZERO_UID;
      const refUID = (opts.refUid as `0x${string}`) || ZERO_UID;

      const result = await client.stringObligation.doObligation(opts.item, schema, refUID);

      outputSuccess(
        {
          hash: result.hash,
          uid: result.attested.uid,
          recipient: result.attested.recipient,
          attester: result.attested.attester,
        },
        human,
      );
    } catch (e: any) {
      outputError("STRING_CREATE_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const get = new Command("get")
    .description("Get a string obligation by UID")
    .requiredOption("--uid <uid>", "Attestation UID");

  get.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const obligation = await client.stringObligation.getObligation(opts.uid as `0x${string}`);
      outputSuccess(obligation, human);
    } catch (e: any) {
      outputError("STRING_GET_FAILED", e.message, human);
      process.exit(1);
    }
  });

  string.addCommand(create);
  string.addCommand(get);

  return string;
}
