import { Command } from "commander";
import { createAlkahestClient } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";

export function makeAttestationCommand() {
  const attestation = new Command("attestation").description("Attestation operations");

  const get = new Command("get")
    .description("Get an attestation by UID")
    .requiredOption("--uid <uid>", "Attestation UID");

  get.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl);

      const att = await client.getAttestation(opts.uid as `0x${string}`);
      outputSuccess(att, human);
    } catch (e: any) {
      outputError("ATTESTATION_GET_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const decode = new Command("decode")
    .description("Decode an attestation by UID and obligation type")
    .requiredOption("--uid <uid>", "Attestation UID")
    .requiredOption(
      "--type <obligation-type>",
      "Obligation type (erc20-escrow, erc20-payment, erc721-escrow, etc.)",
    );

  decode.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl);

      const att = await client.getAttestation(opts.uid as `0x${string}`);

      // Decode based on obligation type — delegate to the right client
      let decoded: any;
      switch (opts.type) {
        case "erc20-escrow":
          decoded = client.erc20.escrow.nonTierable.decodeObligation(att.data);
          break;
        case "erc721-escrow":
          decoded = client.erc721.escrow.nonTierable.decodeObligation(att.data);
          break;
        case "erc1155-escrow":
          decoded = client.erc1155.escrow.nonTierable.decodeObligation(att.data);
          break;
        case "native-escrow":
          decoded = client.nativeToken.escrow.nonTierable.decodeObligation(att.data);
          break;
        case "bundle-escrow":
          decoded = client.bundle.escrow.nonTierable.decodeObligation(att.data);
          break;
        default:
          throw new Error(
            `Unknown obligation type: ${opts.type}. ` +
              "Use: erc20-escrow, erc721-escrow, erc1155-escrow, native-escrow, bundle-escrow",
          );
      }

      outputSuccess({ attestation: att, decoded }, human);
    } catch (e: any) {
      outputError("ATTESTATION_DECODE_FAILED", e.message, human);
      process.exit(1);
    }
  });

  attestation.addCommand(get);
  attestation.addCommand(decode);

  return attestation;
}
