#!/usr/bin/env node
import { Command } from "commander";
import { makeEscrowCommand } from "./commands/escrow.ts";
import { makePaymentCommand } from "./commands/payment.ts";
import { makeBarterCommand } from "./commands/barter.ts";
import { makeStringCommand } from "./commands/string.ts";
import { makeCommitRevealCommand } from "./commands/commit-reveal.ts";
import { makeArbiterCommand } from "./commands/arbiter.ts";
import { makeAttestationCommand } from "./commands/attestation.ts";
import { makeDeployCommand } from "./commands/deploy.ts";
import { makeConfigCommand } from "./commands/config.ts";
import { supportedChainNames } from "./chains.ts";

const program = new Command();

program
  .name("alkahest")
  .description("CLI for the Alkahest escrow protocol")
  .version("0.1.0")
  .option("--chain <name>", `Chain name (${supportedChainNames.join(", ")})`, "base-sepolia")
  .option("--private-key <key>", "0x-prefixed private key")
  .option("--mnemonic <phrase>", "BIP39 mnemonic")
  .option("--ledger", "Use Ledger hardware wallet (USB)")
  .option("--ledger-path <path>", "Ledger HD derivation path (default: m/44'/60'/0'/0/0)")
  .option("--rpc-url <url>", "Custom RPC URL (overrides chain default)")
  .option("--addresses-file <path>", "JSON file with custom contract addresses (for local/custom deployments)")
  .option("--human", "Human-readable output (default: JSON)");

program.addCommand(makeEscrowCommand());
program.addCommand(makePaymentCommand());
program.addCommand(makeBarterCommand());
program.addCommand(makeStringCommand());
program.addCommand(makeCommitRevealCommand());
program.addCommand(makeArbiterCommand());
program.addCommand(makeAttestationCommand());
program.addCommand(makeDeployCommand());
program.addCommand(makeConfigCommand());

program.parse();
