import { Command } from "commander";
import { resolveAccount } from "../auth.ts";
import { resolveChain } from "../chains.ts";
import { outputSuccess, outputError } from "../output.ts";
import { createWalletClient, http, publicActions } from "viem";

export function makeDeployCommand() {
  const deploy = new Command("deploy")
    .description("Deploy Alkahest contracts")
    .argument("[scope]", "What to deploy: all, arbiters, obligations, utils, or a specific contract name", "all")
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

      // Check that contract artifacts exist
      const artifactCheck = async (name: string) => {
        try {
          const path = `../../contracts/out/${name}.sol/${name}.json`;
          return await import(path);
        } catch {
          throw new Error(
            `Contract artifact not found for ${name}. ` +
              "Run 'forge build' in the contracts/ directory first.",
          );
        }
      };

      let easAddress = opts.easAddress as `0x${string}` | undefined;
      let easSrAddress = opts.easSrAddress as `0x${string}` | undefined;

      if (opts.eas) {
        const SchemaRegistry = await artifactCheck("SchemaRegistry");
        const srHash = await client.deployContract({
          abi: SchemaRegistry.default.abi,
          bytecode: SchemaRegistry.default.bytecode.object as `0x${string}`,
          args: [],
        });
        const srReceipt = await client.waitForTransactionReceipt({ hash: srHash });
        easSrAddress = srReceipt.contractAddress!;

        const EAS = await artifactCheck("EAS");
        const easHash = await client.deployContract({
          abi: EAS.default.abi,
          bytecode: EAS.default.bytecode.object as `0x${string}`,
          args: [easSrAddress],
        });
        const easReceipt = await client.waitForTransactionReceipt({ hash: easHash });
        easAddress = easReceipt.contractAddress!;
      }

      if (!easAddress || !easSrAddress) {
        throw new Error(
          "EAS and SchemaRegistry addresses are required. Either use --eas to deploy, " +
            "or provide --eas-address and --eas-sr-address.",
        );
      }

      const deployed: Record<string, `0x${string}`> = {
        eas: easAddress,
        easSchemaRegistry: easSrAddress,
      };

      const deployContract = async (
        name: string,
        solName: string,
        args: any[],
      ) => {
        const artifact = await artifactCheck(solName);
        const hash = await client.deployContract({
          abi: artifact.default.abi,
          bytecode: artifact.default.bytecode.object as `0x${string}`,
          args,
        });
        const receipt = await client.waitForTransactionReceipt({ hash });
        return receipt.contractAddress!;
      };

      if (scope === "all" || scope === "arbiters") {
        deployed.trivialArbiter = await deployContract("trivialArbiter", "TrivialArbiter", []);
        deployed.trustedOracleArbiter = await deployContract("trustedOracleArbiter", "TrustedOracleArbiter", []);
        deployed.intrinsicsArbiter = await deployContract("intrinsicsArbiter", "IntrinsicsArbiter", []);
        deployed.intrinsicsArbiter2 = await deployContract("intrinsicsArbiter2", "IntrinsicsArbiter2", []);
        deployed.allArbiter = await deployContract("allArbiter", "AllArbiter", []);
        deployed.anyArbiter = await deployContract("anyArbiter", "AnyArbiter", []);
      }

      if (scope === "all" || scope === "obligations") {
        const easArgs = [easAddress, easSrAddress];

        deployed.erc20EscrowObligation = await deployContract("erc20EscrowObligation", "ERC20EscrowObligation", easArgs);
        deployed.erc20PaymentObligation = await deployContract("erc20PaymentObligation", "ERC20PaymentObligation", easArgs);
        deployed.erc721EscrowObligation = await deployContract("erc721EscrowObligation", "ERC721EscrowObligation", easArgs);
        deployed.erc721PaymentObligation = await deployContract("erc721PaymentObligation", "ERC721PaymentObligation", easArgs);
        deployed.erc1155EscrowObligation = await deployContract("erc1155EscrowObligation", "ERC1155EscrowObligation", easArgs);
        deployed.erc1155PaymentObligation = await deployContract("erc1155PaymentObligation", "ERC1155PaymentObligation", easArgs);
        deployed.tokenBundleEscrowObligation = await deployContract("tokenBundleEscrowObligation", "TokenBundleEscrowObligation", easArgs);
        deployed.tokenBundlePaymentObligation = await deployContract("tokenBundlePaymentObligation", "TokenBundlePaymentObligation", easArgs);
        deployed.nativeTokenEscrowObligation = await deployContract("nativeTokenEscrowObligation", "NativeTokenEscrowObligation", easArgs);
        deployed.nativeTokenPaymentObligation = await deployContract("nativeTokenPaymentObligation", "NativeTokenPaymentObligation", easArgs);
        deployed.stringObligation = await deployContract("stringObligation", "StringObligation", easArgs);
        deployed.commitRevealObligation = await deployContract("commitRevealObligation", "CommitRevealObligation", easArgs);
        deployed.attestationEscrowObligation = await deployContract("attestationEscrowObligation", "AttestationEscrowObligation", easArgs);
        deployed.attestationEscrowObligation2 = await deployContract("attestationEscrowObligation2", "AttestationEscrowObligation2", easArgs);
      }

      if (scope === "all" || scope === "utils") {
        // Barter utils need the obligation addresses
        const erc20Escrow = deployed.erc20EscrowObligation;
        const erc20Payment = deployed.erc20PaymentObligation;
        const erc721Escrow = deployed.erc721EscrowObligation;
        const erc721Payment = deployed.erc721PaymentObligation;
        const erc1155Escrow = deployed.erc1155EscrowObligation;
        const erc1155Payment = deployed.erc1155PaymentObligation;
        const bundleEscrow = deployed.tokenBundleEscrowObligation;
        const bundlePayment = deployed.tokenBundlePaymentObligation;

        if (!erc20Escrow || !erc20Payment) {
          throw new Error("Cannot deploy utils without obligation addresses. Deploy obligations first or use scope 'all'.");
        }

        deployed.erc20BarterUtils = await deployContract("erc20BarterUtils", "ERC20BarterCrossToken", [
          easAddress, erc20Escrow, erc20Payment, erc721Escrow, erc721Payment,
          erc1155Escrow, erc1155Payment, bundleEscrow, bundlePayment,
        ]);
        deployed.erc721BarterUtils = await deployContract("erc721BarterUtils", "ERC721BarterCrossToken", [
          easAddress, erc20Escrow, erc20Payment, erc721Escrow, erc721Payment,
          erc1155Escrow, erc1155Payment, bundleEscrow, bundlePayment,
        ]);
        deployed.erc1155BarterUtils = await deployContract("erc1155BarterUtils", "ERC1155BarterCrossToken", [
          easAddress, erc20Escrow, erc20Payment, erc721Escrow, erc721Payment,
          erc1155Escrow, erc1155Payment, bundleEscrow, bundlePayment,
        ]);
        deployed.tokenBundleBarterUtils = await deployContract("tokenBundleBarterUtils", "TokenBundleBarterUtils", [
          easAddress, bundleEscrow, bundlePayment,
        ]);
        deployed.attestationBarterUtils = await deployContract("attestationBarterUtils", "AttestationBarterUtils", [
          easAddress, easSrAddress, deployed.attestationEscrowObligation2,
        ]);
      }

      outputSuccess(deployed, human);
    } catch (e: any) {
      outputError("DEPLOY_FAILED", e.message, human);
      process.exit(1);
    }
  });

  return deploy;
}
