import type { Command } from "commander";

export type TokenType = "erc20" | "erc721" | "erc1155" | "native" | "bundle";

export function addTokenTypeFlags(cmd: Command): Command {
  return cmd
    .option("--erc20", "ERC20 token")
    .option("--erc721", "ERC721 token")
    .option("--erc1155", "ERC1155 token")
    .option("--native", "Native token (ETH)")
    .option("--bundle", "Token bundle");
}

export function resolveTokenType(opts: Record<string, unknown>): TokenType {
  const flags: TokenType[] = [];
  if (opts.erc20) flags.push("erc20");
  if (opts.erc721) flags.push("erc721");
  if (opts.erc1155) flags.push("erc1155");
  if (opts.native) flags.push("native");
  if (opts.bundle) flags.push("bundle");

  if (flags.length === 0) {
    throw new Error("Specify a token type: --erc20, --erc721, --erc1155, --native, or --bundle");
  }
  if (flags.length > 1) {
    throw new Error("Specify exactly one token type");
  }
  return flags[0]!;
}
