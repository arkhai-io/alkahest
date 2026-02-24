import { Command } from "commander";
import { contractAddresses, supportedChains } from "../../../sdks/ts/src/config.ts";
import { resolveChain, supportedChainNames, chainNameToCliName } from "../chains.ts";
import { loadAddresses } from "../client.ts";
import { outputSuccess, outputError } from "../output.ts";

export function makeConfigCommand() {
  const config = new Command("config").description("Configuration and chain info");

  const show = new Command("show")
    .description("Show contract addresses for a chain");

  show.action(async (_opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;
    try {
      const chainName = globalOpts.chain || "base-sepolia";
      const chain = resolveChain(chainName);

      // If --addresses-file is provided, show those addresses
      const customAddresses = loadAddresses(globalOpts.addressesFile);
      if (customAddresses) {
        outputSuccess({ chain: chain.name, addresses: customAddresses }, human);
        return;
      }

      const addresses = contractAddresses[chain.name as keyof typeof contractAddresses];
      if (!addresses) {
        throw new Error(`No addresses configured for chain: ${chain.name}. Use --addresses-file for custom deployments.`);
      }

      outputSuccess({ chain: chain.name, addresses }, human);
    } catch (e: any) {
      outputError("CONFIG_SHOW_FAILED", e.message, human);
      process.exit(1);
    }
  });

  const chains = new Command("chains")
    .description("List supported chains");

  chains.action(async (_opts, cmd) => {
    const globalOpts = cmd.parent.parent.opts();
    const human = !!globalOpts.human;

    const chainList = supportedChains.map((name) => ({
      name,
      cliName: chainNameToCliName[name] || name,
    }));

    outputSuccess({ chains: chainList }, human);
  });

  config.addCommand(show);
  config.addCommand(chains);

  return config;
}
