import { Command } from "commander";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";
import { createWalletClient, http, publicActions } from "viem";
import { deployAlkahest, type DeployFn } from "../../../sdks/ts/src/deploy.ts";

export function makeDeployCommand() {
  const deploy = new Command("deploy")
    .description("Deploy Alkahest contracts")
    .argument("[scope]", "What to deploy: all, arbiters, obligations, utils", "all")
    .option("--eas", "Also deploy EAS and SchemaRegistry")
    .option("--eas-address <address>", "Existing EAS address")
    .option("--eas-sr-address <address>", "Existing EAS SchemaRegistry address");

  deploy.action(async (scope, opts, cmd) => {
    const globalOpts = cmd.parent.opts();
    const human = !!globalOpts.human;
    try {
      const account = await resolveAccount(globalOpts);
      const chain = resolveChain(globalOpts.chain || "base-sepolia");

      const client = createWalletClient({
        account,
        chain,
        transport: http(globalOpts.rpcUrl),
      }).extend(publicActions);

      const deployFn: DeployFn = async (abi, bytecode, args) => {
        const hash = await client.deployContract({ abi, bytecode, args });
        const receipt = await client.waitForTransactionReceipt({ hash });
        return receipt.contractAddress!;
      };

      const deployed = await deployAlkahest(deployFn, {
        scope,
        eas: opts.eas,
        easAddress: opts.easAddress as `0x${string}` | undefined,
        easSrAddress: opts.easSrAddress as `0x${string}` | undefined,
      });

      outputSuccess(deployed, human);
    } catch (e: any) {
      outputError("DEPLOY_FAILED", e.message, human);
      process.exit(1);
    }
  });

  return deploy;
}
