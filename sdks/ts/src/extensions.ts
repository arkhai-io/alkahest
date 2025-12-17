import { makeArbitersClient } from "./clients/arbiters";
import { makeAttestationClient } from "./clients/attestation";
import { makeErc1155Client } from "./clients/erc1155";
import { makeErc20Client } from "./clients/erc20";
import { makeErc721Client } from "./clients/erc721";
import { makeNativeTokenClient } from "./clients/nativeToken";
import { makeStringObligationClient } from "./clients/stringObligation";
import { makeTokenBundleClient } from "./clients/tokenBundle";

/**
 * Creates the default extension for the Alkahest client with all standard functionality
 * @param client - The base client to extend
 * @returns Extension object with all standard client functionality
 */
export const makeDefaultExtension = (client: any) => ({
    /** Unified client for all arbiter functionality */
    arbiters: makeArbitersClient(client.viemClient, client.contractAddresses),

    /** Methods for interacting with ERC20 tokens */
    erc20: makeErc20Client(client.viemClient, client.contractAddresses),

    /** Methods for interacting with native tokens */
    nativeToken: makeNativeTokenClient(client.viemClient, client.contractAddresses),

    /** Methods for interacting with ERC721 tokens */
    erc721: makeErc721Client(client.viemClient, client.contractAddresses),

    /** Methods for interacting with ERC1155 tokens */
    erc1155: makeErc1155Client(client.viemClient, client.contractAddresses),

    /** Methods for interacting with token bundles */
    bundle: makeTokenBundleClient(client.viemClient, client.contractAddresses),

    /** Methods for interacting with attestations */
    attestation: makeAttestationClient(client.viemClient, client.contractAddresses),

    /** Utilities for StringObligation */
    stringObligation: makeStringObligationClient(client.viemClient, client.contractAddresses),
});
