import { baseSepolia, sepolia, filecoinCalibration, mainnet, type Chain } from "viem/chains";

export const chainMap: Record<string, Chain> = {
  "base-sepolia": baseSepolia,
  sepolia: sepolia,
  "filecoin-calibration": filecoinCalibration,
  ethereum: mainnet,
};

// Maps viem chain.name -> our CLI chain name
export const chainNameToCliName: Record<string, string> = {
  "Base Sepolia": "base-sepolia",
  Sepolia: "sepolia",
  "Filecoin Calibration": "filecoin-calibration",
  Ethereum: "ethereum",
};

export const supportedChainNames = Object.keys(chainMap);

export function resolveChain(name: string): Chain {
  const chain = chainMap[name];
  if (!chain) {
    throw new Error(
      `Unsupported chain "${name}". Supported: ${supportedChainNames.join(", ")}`,
    );
  }
  return chain;
}
