import { Command } from "commander";
import { createAlkahestClient, loadAddresses } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";

type ConfirmationType =
  | "exclusive-revocable"
  | "exclusive-unrevocable"
  | "nonexclusive-revocable"
  | "nonexclusive-unrevocable";

function getConfirmationClient(client: any, type: ConfirmationType) {
  switch (type) {
    case "exclusive-revocable":
      return client.arbiters.confirmation.exclusiveRevocable;
    case "exclusive-unrevocable":
      return client.arbiters.confirmation.exclusiveUnrevocable;
    case "nonexclusive-revocable":
      return client.arbiters.confirmation.nonexclusiveRevocable;
    case "nonexclusive-unrevocable":
      return client.arbiters.confirmation.nonexclusiveUnrevocable;
    default:
      throw new Error(
        `Unknown confirmation type: ${type}. ` +
          "Use: exclusive-revocable, exclusive-unrevocable, nonexclusive-revocable, nonexclusive-unrevocable",
      );
  }
}

export function makeArbiterCommand() {
  const arbiter = new Command("arbiter").description("Arbiter operations");

  const arbitrate = new Command("arbitrate")
    .description("Arbitrate an obligation (trusted oracle)")
    .requiredOption("--obligation <uid>", "Obligation attestation UID")
    .requiredOption("--demand <hex>", "Demand data (hex)")
    .requiredOption("--decision <bool>", "Decision (true/false)");

  arbitrate.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const decision = opts.decision === "true";
      const hash = await client.arbiters.general.trustedOracle.arbitrate(
        opts.obligation as `0x${string}`,
        opts.demand as `0x${string}`,
        decision,
      );

      outputSuccess({ hash }, human);
    } catch (e: any) {
      outputError("ARBITRATE_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const confirm = new Command("confirm")
    .description("Confirm a fulfillment for an escrow")
    .requiredOption("--fulfillment <uid>", "Fulfillment attestation UID")
    .requiredOption("--escrow <uid>", "Escrow attestation UID")
    .requiredOption(
      "--type <variant>",
      "Confirmation type (exclusive-revocable, exclusive-unrevocable, nonexclusive-revocable, nonexclusive-unrevocable)",
    );

  confirm.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const confirmClient = getConfirmationClient(client, opts.type as ConfirmationType);
      const hash = await confirmClient.confirm(
        opts.fulfillment as `0x${string}`,
        opts.escrow as `0x${string}`,
      );

      outputSuccess({ hash }, human);
    } catch (e: any) {
      outputError("CONFIRM_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const revoke = new Command("revoke")
    .description("Revoke a confirmation")
    .requiredOption("--fulfillment <uid>", "Fulfillment attestation UID")
    .requiredOption("--escrow <uid>", "Escrow attestation UID")
    .requiredOption("--type <variant>", "Confirmation type (exclusive-revocable, nonexclusive-revocable)");

  revoke.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const confirmClient = getConfirmationClient(client, opts.type as ConfirmationType);
      const hash = await confirmClient.revoke(
        opts.fulfillment as `0x${string}`,
        opts.escrow as `0x${string}`,
      );

      outputSuccess({ hash }, human);
    } catch (e: any) {
      outputError("REVOKE_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const encodeDemand = new Command("encode-demand")
    .description("Encode demand data for an arbiter")
    .requiredOption("--type <arbiter-type>", "Arbiter type (trusted-oracle, intrinsics2, all, any, recipient, attester, schema, uid, ref-uid, revocable, time-after, time-before, time-equal, expiration-time-after, expiration-time-before, expiration-time-equal)")
    .option("--oracle <address>", "Oracle address (for trusted-oracle)")
    .option("--data <hex>", "Inner demand data hex (for trusted-oracle)")
    .option("--schema <uid>", "Schema UID (for intrinsics2, schema)")
    .option("--demands <json>", "JSON array of {arbiter, demand} objects (for all, any)")
    .option("--recipient <address>", "Recipient address (for recipient)")
    .option("--attester <address>", "Attester address (for attester)")
    .option("--uid <uid>", "UID (for uid)")
    .option("--ref-uid <uid>", "Reference UID (for ref-uid)")
    .option("--revocable <bool>", "Revocable flag (for revocable)")
    .option("--time <unix>", "Timestamp (for time-after, time-before, time-equal, expiration-time-*)")
    .option("--raw-demand <hex>", "Raw sub-demand hex (for arbiter types that wrap an inner demand)");

  encodeDemand.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      let encoded: `0x${string}`;

      switch (opts.type) {
        case "trusted-oracle":
          encoded = client.arbiters.general.trustedOracle.encodeDemand({
            oracle: opts.oracle as `0x${string}`,
            data: opts.data as `0x${string}`,
          });
          break;
        case "intrinsics2":
          encoded = client.arbiters.general.intrinsics2.encodeDemand({
            schema: opts.schema as `0x${string}`,
          });
          break;
        case "all": {
          const allParsed = JSON.parse(opts.demands) as { arbiter: string; demand: string }[];
          encoded = client.arbiters.logical.all.encodeDemand({
            arbiters: allParsed.map((d) => d.arbiter as `0x${string}`),
            demands: allParsed.map((d) => d.demand as `0x${string}`),
          });
          break;
        }
        case "any": {
          const anyParsed = JSON.parse(opts.demands) as { arbiter: string; demand: string }[];
          encoded = client.arbiters.logical.any.encodeDemand({
            arbiters: anyParsed.map((d) => d.arbiter as `0x${string}`),
            demands: anyParsed.map((d) => d.demand as `0x${string}`),
          });
          break;
        }
        case "recipient":
          encoded = client.arbiters.attestationProperties.recipient.encodeDemand({
            recipient: opts.recipient as `0x${string}`,
          });
          break;
        case "attester":
          encoded = client.arbiters.attestationProperties.attester.encodeDemand({
            attester: opts.attester as `0x${string}`,
          });
          break;
        case "schema":
          encoded = client.arbiters.attestationProperties.schema.encodeDemand({
            schema: opts.schema as `0x${string}`,
          });
          break;
        case "uid":
          encoded = client.arbiters.attestationProperties.uid.encodeDemand({
            uid: opts.uid as `0x${string}`,
          });
          break;
        case "ref-uid":
          encoded = client.arbiters.attestationProperties.refUid.encodeDemand({
            refUID: opts.refUid as `0x${string}`,
          });
          break;
        case "revocable":
          encoded = client.arbiters.attestationProperties.revocable.encodeDemand({
            revocable: opts.revocable === "true",
          });
          break;
        case "time-after":
          encoded = client.arbiters.attestationProperties.timeAfter.encodeDemand({
            time: BigInt(opts.time),
          });
          break;
        case "time-before":
          encoded = client.arbiters.attestationProperties.timeBefore.encodeDemand({
            time: BigInt(opts.time),
          });
          break;
        case "time-equal":
          encoded = client.arbiters.attestationProperties.timeEqual.encodeDemand({
            time: BigInt(opts.time),
          });
          break;
        case "expiration-time-after":
          encoded = client.arbiters.attestationProperties.expirationTimeAfter.encodeDemand({
            expirationTime: BigInt(opts.time),
          });
          break;
        case "expiration-time-before":
          encoded = client.arbiters.attestationProperties.expirationTimeBefore.encodeDemand({
            expirationTime: BigInt(opts.time),
          });
          break;
        case "expiration-time-equal":
          encoded = client.arbiters.attestationProperties.expirationTimeEqual.encodeDemand({
            expirationTime: BigInt(opts.time),
          });
          break;
        default:
          throw new Error(`Unknown arbiter type: ${opts.type}`);
      }

      outputSuccess({ encoded }, human);
    } catch (e: any) {
      outputError("ENCODE_DEMAND_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const decodeDemand = new Command("decode-demand")
    .description("Decode a demand using the client's address registry")
    .requiredOption("--arbiter <address>", "Arbiter contract address")
    .requiredOption("--demand <hex>", "Encoded demand data (hex)");

  decodeDemand.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const decoded = client.decodeDemand({
        arbiter: opts.arbiter as `0x${string}`,
        demand: opts.demand as `0x${string}`,
      });

      outputSuccess(decoded, human);
    } catch (e: any) {
      outputError("DECODE_DEMAND_FAILED", e.message, human);
      process.exit(1);
    }
  });

  arbiter.addCommand(arbitrate);
  arbiter.addCommand(confirm);
  arbiter.addCommand(revoke);
  arbiter.addCommand(encodeDemand);
  arbiter.addCommand(decodeDemand);

  return arbiter;
}
