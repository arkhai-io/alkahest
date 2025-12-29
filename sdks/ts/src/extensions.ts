import { makeArbitersClient } from "./clients/arbiters";
import {
  makeAttestationClient,
  makeErc20Client,
  makeErc721Client,
  makeErc1155Client,
  makeNativeTokenClient,
  makeStringObligationClient,
  makeTokenBundleClient,
  pickAttestationAddresses,
  pickErc20Addresses,
  pickErc721Addresses,
  pickErc1155Addresses,
  pickNativeTokenAddresses,
  pickStringAddresses,
  pickTokenBundleAddresses,
} from "./clients/obligations";

/**
 * Creates the default extension for the Alkahest client with all standard functionality
 * @param client - The base client to extend
 * @returns Extension object with all standard client functionality
 */
export const makeDefaultExtension = (client: any) => ({
  /** Unified client for all arbiter functionality */
  arbiters: makeArbitersClient(client.viemClient, client.contractAddresses),

  /** Methods for interacting with ERC20 tokens */
  erc20: makeErc20Client(client.viemClient, pickErc20Addresses(client.contractAddresses)),

  /** Methods for interacting with native tokens */
  nativeToken: makeNativeTokenClient(client.viemClient, pickNativeTokenAddresses(client.contractAddresses)),

  /** Methods for interacting with ERC721 tokens */
  erc721: makeErc721Client(client.viemClient, pickErc721Addresses(client.contractAddresses)),

  /** Methods for interacting with ERC1155 tokens */
  erc1155: makeErc1155Client(client.viemClient, pickErc1155Addresses(client.contractAddresses)),

  /** Methods for interacting with token bundles */
  bundle: makeTokenBundleClient(client.viemClient, pickTokenBundleAddresses(client.contractAddresses)),

  /** Methods for interacting with attestations */
  attestation: makeAttestationClient(client.viemClient, pickAttestationAddresses(client.contractAddresses)),

  /** Utilities for StringObligation */
  stringObligation: makeStringObligationClient(client.viemClient, pickStringAddresses(client.contractAddresses)),
});
