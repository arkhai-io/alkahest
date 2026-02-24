import { Command } from "commander";
import { createAlkahestClient, loadAddresses } from "../client.ts";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";

const ZERO_UID = "0x0000000000000000000000000000000000000000000000000000000000000000" as const;

export function makeCommitRevealCommand() {
  const cr = new Command("commit-reveal").description("Commit-reveal obligation operations");

  const commit = new Command("commit")
    .description("Submit a commitment hash (requires bond)")
    .requiredOption("--commitment <hex>", "Commitment hash (bytes32)");

  commit.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const result = await client.commitReveal.commit(opts.commitment as `0x${string}`);
      outputSuccess({ hash: result.hash }, human);
    } catch (e: any) {
      outputError("COMMIT_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const reveal = new Command("reveal")
    .description("Reveal a committed value (creates attestation)")
    .requiredOption("--payload <hex>", "Payload bytes")
    .requiredOption("--salt <hex>", "Salt bytes32")
    .requiredOption("--schema <uid>", "Schema UID")
    .option("--ref-uid <uid>", "Reference attestation UID");

  reveal.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const refUID = (opts.refUid as `0x${string}`) || ZERO_UID;
      const data = {
        payload: opts.payload as `0x${string}`,
        salt: opts.salt as `0x${string}`,
        schema: opts.schema as `0x${string}`,
      };

      const result = await client.commitReveal.doObligation(data, refUID);

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
      outputError("REVEAL_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const computeCommitment = new Command("compute-commitment")
    .description("Compute a commitment hash for a given payload")
    .requiredOption("--ref-uid <uid>", "Reference attestation UID")
    .requiredOption("--claimer <address>", "Claimer address")
    .requiredOption("--payload <hex>", "Payload bytes")
    .requiredOption("--salt <hex>", "Salt bytes32")
    .requiredOption("--schema <uid>", "Schema UID");

  computeCommitment.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const commitment = await client.commitReveal.computeCommitment(
        opts.refUid as `0x${string}`,
        opts.claimer as `0x${string}`,
        {
          payload: opts.payload as `0x${string}`,
          salt: opts.salt as `0x${string}`,
          schema: opts.schema as `0x${string}`,
        },
      );

      outputSuccess({ commitment }, human);
    } catch (e: any) {
      outputError("COMPUTE_COMMITMENT_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const reclaimBond = new Command("reclaim-bond")
    .description("Reclaim bond from a revealed obligation")
    .requiredOption("--uid <uid>", "Obligation attestation UID");

  reclaimBond.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const result = await client.commitReveal.reclaimBond(opts.uid as `0x${string}`);
      outputSuccess({ hash: result.hash }, human);
    } catch (e: any) {
      outputError("RECLAIM_BOND_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const slashBond = new Command("slash-bond")
    .description("Slash an unrevealed commitment's bond")
    .requiredOption("--commitment <hex>", "Commitment hash");

  slashBond.action(async (opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const result = await client.commitReveal.slashBond(opts.commitment as `0x${string}`);
      outputSuccess({ hash: result.hash }, human);
    } catch (e: any) {
      outputError("SLASH_BOND_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const info = new Command("info")
    .description("Show commit-reveal contract info (bond amount, deadline, recipient)");

  info.action(async (_opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");
      const client = createAlkahestClient(account, chain, globalOpts.rpcUrl, loadAddresses(globalOpts.addressesFile));

      const [bondAmount, commitDeadline, slashedBondRecipient] = await Promise.all([
        client.commitReveal.getBondAmount(),
        client.commitReveal.getCommitDeadline(),
        client.commitReveal.getSlashedBondRecipient(),
      ]);

      outputSuccess({ bondAmount, commitDeadline, slashedBondRecipient }, human);
    } catch (e: any) {
      outputError("COMMIT_REVEAL_INFO_FAILED", e.message, human);
      process.exit(1);
    }
  });

  cr.addCommand(commit);
  cr.addCommand(reveal);
  cr.addCommand(computeCommitment);
  cr.addCommand(reclaimBond);
  cr.addCommand(slashBond);
  cr.addCommand(info);

  return cr;
}
