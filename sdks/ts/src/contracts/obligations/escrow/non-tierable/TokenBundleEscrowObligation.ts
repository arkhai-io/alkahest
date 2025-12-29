export const abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_eas",
          type: "address",
          internalType: "contract IEAS",
        },
        {
          name: "_schemaRegistry",
          type: "address",
          internalType: "contract ISchemaRegistry",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "receive",
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "ATTESTATION_SCHEMA",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "attest",
      inputs: [
        {
          name: "attestation",
          type: "tuple",
          internalType: "struct Attestation",
          components: [
            {
              name: "uid",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "attester",
              type: "address",
              internalType: "address",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "checkObligation",
      inputs: [
        {
          name: "obligation",
          type: "tuple",
          internalType: "struct Attestation",
          components: [
            {
              name: "uid",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "attester",
              type: "address",
              internalType: "address",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
        {
          name: "demand",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "collectEscrow",
      inputs: [
        {
          name: "escrow",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "fulfillment",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "collectEscrowRaw",
      inputs: [
        {
          name: "_escrow",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "_fulfillment",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "decodeObligationData",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct TokenBundleEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "nativeAmount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "erc20Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc20Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc721Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc721TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc1155TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "doObligation",
      inputs: [
        {
          name: "data",
          type: "tuple",
          internalType: "struct TokenBundleEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "nativeAmount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "erc20Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc20Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc721Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc721TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc1155TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "doObligationFor",
      inputs: [
        {
          name: "data",
          type: "tuple",
          internalType: "struct TokenBundleEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "nativeAmount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "erc20Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc20Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc721Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc721TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc1155TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64",
        },
        {
          name: "recipient",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "doObligationRaw",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64",
        },
        {
          name: "refUID",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "uid_",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "extractArbiterAndDemand",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "arbiter",
          type: "address",
          internalType: "address",
        },
        {
          name: "demand",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "getObligationData",
      inputs: [
        {
          name: "uid",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct TokenBundleEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "nativeAmount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "erc20Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc20Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc721Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc721TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Tokens",
              type: "address[]",
              internalType: "address[]",
            },
            {
              name: "erc1155TokenIds",
              type: "uint256[]",
              internalType: "uint256[]",
            },
            {
              name: "erc1155Amounts",
              type: "uint256[]",
              internalType: "uint256[]",
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getSchema",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct SchemaRecord",
          components: [
            {
              name: "uid",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "resolver",
              type: "address",
              internalType: "contract ISchemaResolver",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "schema",
              type: "string",
              internalType: "string",
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isPayable",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "multiAttest",
      inputs: [
        {
          name: "attestations",
          type: "tuple[]",
          internalType: "struct Attestation[]",
          components: [
            {
              name: "uid",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "attester",
              type: "address",
              internalType: "address",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
        {
          name: "values",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "multiRevoke",
      inputs: [
        {
          name: "attestations",
          type: "tuple[]",
          internalType: "struct Attestation[]",
          components: [
            {
              name: "uid",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "attester",
              type: "address",
              internalType: "address",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
        {
          name: "values",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "onERC1155BatchReceived",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "onERC1155Received",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "reclaimExpired",
      inputs: [
        {
          name: "uid",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "revoke",
      inputs: [
        {
          name: "attestation",
          type: "tuple",
          internalType: "struct Attestation",
          components: [
            {
              name: "uid",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "attester",
              type: "address",
              internalType: "address",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "supportsInterface",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "version",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "event",
      name: "ERC1155TransferFailedOnRelease",
      inputs: [
        {
          name: "token",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ERC20TransferFailedOnRelease",
      inputs: [
        {
          name: "token",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ERC721TransferFailedOnRelease",
      inputs: [
        {
          name: "token",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "EscrowCollected",
      inputs: [
        {
          name: "escrow",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "fulfillment",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "fulfiller",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "EscrowMade",
      inputs: [
        {
          name: "escrow",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "buyer",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "NativeTokenTransferFailed",
      inputs: [
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AccessDenied",
      inputs: [],
    },
    {
      type: "error",
      name: "ArrayLengthMismatch",
      inputs: [],
    },
    {
      type: "error",
      name: "AttestationNotFound",
      inputs: [
        {
          name: "attestationId",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
    },
    {
      type: "error",
      name: "AttestationRevoked",
      inputs: [],
    },
    {
      type: "error",
      name: "DeadlineExpired",
      inputs: [],
    },
    {
      type: "error",
      name: "ERC1155TransferFailed",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address",
        },
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "ERC20TransferFailed",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address",
        },
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721TransferFailed",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address",
        },
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "InsufficientPayment",
      inputs: [
        {
          name: "expected",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "received",
          type: "uint256",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "InsufficientValue",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidEAS",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidEscrowAttestation",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidFulfillment",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidLength",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidSchema",
      inputs: [],
    },
    {
      type: "error",
      name: "NotFromThisAttester",
      inputs: [],
    },
    {
      type: "error",
      name: "NotPayable",
      inputs: [],
    },
    {
      type: "error",
      name: "RevocationFailed",
      inputs: [
        {
          name: "attestationId",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
    },
    {
      type: "error",
      name: "UnauthorizedCall",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x61016080604052346102d85760408161387580380380916100208285610312565b8339810103126102d85780516001600160a01b038116918282036102d85760200151916001600160a01b0383168084036102d85760405161012081016001600160401b038111828210176102fe5760405260e2815260208101927f6164647265737320617262697465722c2062797465732064656d616e642c207584527f696e74323536206e6174697665416d6f756e742c20616464726573735b5d206560408301527f72633230546f6b656e732c2075696e743235365b5d206572633230416d6f756e60608301527f74732c20616464726573735b5d20657263373231546f6b656e732c2075696e7460808301527f3235365b5d20657263373231546f6b656e4964732c20616464726573735b5d2060a08301527f65726331313535546f6b656e732c2075696e743235365b5d206572633131353560c08301527f546f6b656e4964732c2075696e743235365b5d2065726331313535416d6f756e60e083015261747360f01b6101008301526001608052600360a0525f60c052156102ef576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af19081156102e4575f916102ae575b506101405260405161353f9081610336823960805181611466015260a05181611491015260c051816114bc015260e05181612e2f0152610100518161127601526101205181818161054d01528181610e770152818161105d015281816120de0152612d5b01526101405181818161058d01528181610dca015281816110ba01528181611244015281816113bd0152818161217e015281816124e30152612cae0152f35b90506020813d6020116102dc575b816102c960209383610312565b810103126102d857515f61020b565b5f80fd5b3d91506102bc565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102fe5760405256fe608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c90816301ffc9a714611546575080632c713cd91461153557806354fd4d501461144757806355b0769b146113e05780635bf2f20d146113a65780636b122fe0146112055780637d2c2931146110285780638371ef5914610fc957806388e5b2d914610f7b578063891d9ea814610f9a57806391db0b7e14610f7b578063b3b902d4146106ae578063bc197c8114610618578063c6ec50701461050c578063c93844be14610349578063ce46e0461461032d578063cf84e82c146102a7578063e49617e11461028c578063e60c35051461028c578063e6c9714d146101655763f23a6e610361000f57346101625760a0366003190112610162576101246117bb565b5061012d6117d1565b506084356001600160401b0381116101605761014d9036906004016116f0565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461016257606036600319011261016257600435906001600160401b03821161016257610140600319833603011261016257604051916101a583611647565b80600401358352602481013560208401526101c2604482016115e9565b60408401526101d3606482016115e9565b60608401526101e4608482016115e9565b608084015260a481013560a08401526101ff60c482016117e7565b60c084015261021060e482016117e7565b60e08401526101048101358015158103610288576101008401526101248101356001600160401b0381116102885761024d913691016004016116f0565b610120830152602435906001600160401b03821161016257602061027e8461027836600487016116f0565b906124e1565b6040519015158152f35b8280fd5b602061027e61029a366119cb565b6102a2612e2d565b612e6e565b506060366003190112610162576004356001600160401b038111610160576101406003198236030112610160576102dc6115d3565b604435929091906001600160a01b0384168403610162576020610325858561031261032087604051928391600401888301611a96565b03601f19810183528261167e565b612731565b604051908152f35b5034610162578060031936011261016257602090604051908152f35b5034610162576020366003190112610162576004356001600160401b0381116101605761037a90369060040161178e565b610385929192612432565b50820191602081840312610160578035906001600160401b0382116102885701906101408284031261016257604051916103be83611647565b6103c7816117e7565b835260208101356001600160401b03811161028857846103e89183016116f0565b60208401526040810135604084015260608101356001600160401b038111610288578461041691830161247c565b606084015260808101356001600160401b038111610288578461043a918301611812565b608084015260a08101356001600160401b038111610288578461045e91830161247c565b60a084015260c08101356001600160401b0381116102885784610482918301611812565b60c084015260e08101356001600160401b03811161028857846104a691830161247c565b60e08401526101008101356001600160401b03811161028857846104cb918301611812565b610100840152610120810135916001600160401b0383116101625750926104f6916105089401611812565b610120820152604051918291826118de565b0390f35b503461016257602036600319011261016257610526612432565b5061052f611c59565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561060b5781926105e7575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105d8576105086105cc61012084015160208082518301019101611e82565b604051918291826118de565b635527981560e11b8152600490fd5b6106049192503d8084833e6105fc818361167e565b810190611ce5565b905f610585565b50604051903d90823e3d90fd5b50346101625760a0366003190112610162576106326117bb565b5061063b6117d1565b506044356001600160401b0381116101605761065b903690600401611812565b506064356001600160401b0381116101605761067b903690600401611812565b506084356001600160401b0381116101605761069b9036906004016116f0565b5060405163bc197c8160e01b8152602090f35b506060366003190112610162576004356001600160401b03811161016057906106de6106f092369060040161178e565b92906106e86115d3565b9336916116ba565b916107046020845185010160208501611e82565b91606083019182515194608085019586515103610f6c5760a08501908151519160c087019283515103610f5d5760e087019182515194610100890195865151811490811591610f4c575b50610f3d57604089015180610f1f575b50865b8851805182101561087d5760206107c38d610792858d956107898260018060a01b03926132d2565b511692516132d2565b516040516323b872dd60e01b8152336004820152306024820152604481019190915293849283919082906064820190565b03925af189918161083e575b506108395750875b156107e457600101610761565b88518b91610800916001600160a01b03906107899083906132d2565b51604051634a73404560e11b81526001600160a01b039092166004830152336024830152306044830152606482015280608481015b0390fd5b6107d7565b9091506020813d8211610875575b816108596020938361167e565b810103126108715761086a90611c16565b905f6107cf565b8980fd5b3d915061084c565b505085929187918a83955b85518051881015610af0576001600160a01b03906108a79089906132d2565b511660206108b6898c516132d2565b516024604051809481936331a9108f60e11b835260048301525afa908115610ae5578691610aac575b50336001600160a01b0390911603610a945785516001600160a01b03906109079089906132d2565b5116610914888b516132d2565b51813b15610a64576040516323b872dd60e01b8152336004820152306024820152604481019190915290869081908390606490829084905af19182610a7b575b50506109a7578861097288886107898260018060a01b0392516132d2565b5160405163045b391760e01b81526001600160a01b039290921660048301523360248301523060448301526064820152608490fd5b90919293949560018060a01b036109bf8289516132d2565b511660206109ce838c516132d2565b516024604051809481936331a9108f60e11b835260048301525afa908115610a70578791610a33575b50306001600160a01b0390911603610a1757600101959493929190610888565b86518991610972916001600160a01b03906107899083906132d2565b90506020813d8211610a68575b81610a4d6020938361167e565b81010312610a6457610a5e90611cb7565b8a6109f7565b8680fd5b3d9150610a40565b6040513d89823e3d90fd5b81610a859161167e565b610a9057858b610954565b8580fd5b8861097288886107898260018060a01b0392516132d2565b90506020813d8211610add575b81610ac66020938361167e565b81010312610a9057610ad790611cb7565b8a6108df565b3d9150610ab9565b6040513d88823e3d90fd5b509087849386610120819401955b83518051861015610d8057610b5b906020906001600160a01b0390610b249089906132d2565b5116610b31888a516132d2565b51604051627eeac760e11b8152306004820152602481019190915292839190829081906044820190565b03915afa908115610d75578391610d44575b5084516001600160a01b0390610b849088906132d2565b5116610b918789516132d2565b5190610b9e888b516132d2565b5191813b15610a9057610bce928692839283604051809781958294637921219560e11b84523033600486016134d1565b03925af19182610d2b575b5050610c54578787610835610c1089610c08818b610bff8260018060a01b0392516132d2565b511695516132d2565b5194516132d2565b5160405163334a7d1b60e21b81526001600160a01b0390931660048401523360248401523060448401526064830193909352608482019290925290819060a4820190565b959490919295610c7e602060018060a01b03610c718589516132d2565b5116610b31858a516132d2565b03915afa908115610d20578591610ceb575b50610c9c838a516132d2565b518201809211610cd75710610cb75760010193949190610afe565b84610835610c1083610c088189610bff8e9860018060a01b0392516132d2565b634e487b7160e01b85526011600452602485fd5b90506020813d8211610d18575b81610d056020938361167e565b81010312610d14575189610c90565b5f80fd5b3d9150610cf8565b6040513d87823e3d90fd5b81610d359161167e565b610d4057838a610bd9565b8380fd5b90506020813d8211610d6d575b81610d5e6020938361167e565b81010312610d14575188610b6d565b3d9150610d51565b6040513d85823e3d90fd5b50604051906001600160401b0384610d9784611663565b33845216602083015260016040830152604435606083015260808201528160a08201526020604051610dc88161162c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610e69608083015160c060e48601526101248501906115af565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115610f14578291610ee1575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a3604051908152f35b90506020813d602011610f0c575b81610efc6020938361167e565b8101031261016057516020610eaf565b3d9150610eef565b6040513d84823e3d90fd5b8034101561075e5763b99e2ab760e01b885260045234602452604487fd5b63512509d360e11b8752600487fd5b90506101208a01515114155f61074e565b63512509d360e11b8552600485fd5b63512509d360e11b8352600483fd5b602061027e610f893661173e565b92610f95929192612e2d565b612010565b503461016257610508610fb5610faf36611599565b906120b4565b6040519182916020835260208301906115af565b503461016257602036600319011261016257600435906001600160401b03821161016257611002610ffd36600485016116f0565b611fe7565b604080516001600160a01b039093168352602083018190528291610508918301906115af565b5034610d14576020366003190112610d145760043590611046611c59565b506040516328c44a9960e21b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f91816111e9575b506110af57836301fb6dd160e01b5f5260045260245ffd5b8390926020840151907f00000000000000000000000000000000000000000000000000000000000000008092036111da57606085016001600160401b03815116156111cb57516001600160401b031642106111cb576040516111108161162c565b8381525f6020820152604051926111268461162c565b83526020830152803b15610d1457604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816111b6575b5061118a5763614cf93960e01b825260045260249150fd5b61012083015160c08401516111aa916001600160a01b0390911690612ee3565b50602060405160018152f35b6111c39193505f9061167e565b5f9184611172565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b6111fe9192503d805f833e6105fc818361167e565b905f611097565b34610d14575f366003190112610d1457606080604051611224816115fd565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561139b575f906112eb575b606090610508604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906115af565b503d805f833e6112fb818361167e565b810190602081830312610d14578051906001600160401b038211610d145701608081830312610d145760405190611331826115fd565b8051825260208101516001600160a01b0381168103610d1457602083015261135b60408201611c16565b60408301526060810151906001600160401b038211610d14570182601f82011215610d145760609281602061139293519101611c23565b828201526112a5565b6040513d5f823e3d90fd5b34610d14575f366003190112610d145760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b6040366003190112610d14576004356001600160401b038111610d14576101406003198236030112610d14576103256114326020926114406114206115d3565b91604051938491600401878301611a96565b03601f19810184528361167e565b3391612731565b34610d14575f366003190112610d14576105086020610fb5600161148a7f00000000000000000000000000000000000000000000000000000000000000006125c4565b81846114b57f00000000000000000000000000000000000000000000000000000000000000006125c4565b81806114e07f00000000000000000000000000000000000000000000000000000000000000006125c4565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f19810183528261167e565b34610d14576111aa610faf36611599565b34610d14576020366003190112610d14576004359063ffffffff60e01b8216809203610d1457602091630271189760e51b8114908115611588575b5015158152f35b6301ffc9a760e01b14905083611581565b6040906003190112610d14576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602435906001600160401b0382168203610d1457565b35906001600160401b0382168203610d1457565b608081019081106001600160401b0382111761161857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761161857604052565b61014081019081106001600160401b0382111761161857604052565b60c081019081106001600160401b0382111761161857604052565b90601f801991011681019081106001600160401b0382111761161857604052565b6001600160401b03811161161857601f01601f191660200190565b9291926116c68261169f565b916116d4604051938461167e565b829481845281830111610d14578281602093845f960137010152565b9080601f83011215610d145781602061170b933591016116ba565b90565b9181601f84011215610d14578235916001600160401b038311610d14576020808501948460051b010111610d1457565b6040600319820112610d14576004356001600160401b038111610d1457816117689160040161170e565b92909291602435906001600160401b038211610d145761178a9160040161170e565b9091565b9181601f84011215610d14578235916001600160401b038311610d145760208381860195010111610d1457565b600435906001600160a01b0382168203610d1457565b602435906001600160a01b0382168203610d1457565b35906001600160a01b0382168203610d1457565b6001600160401b0381116116185760051b60200190565b9080601f83011215610d14578135611829816117fb565b92611837604051948561167e565b81845260208085019260051b820101928311610d1457602001905b82821061185f5750505090565b8135815260209182019101611852565b90602080835192838152019201905f5b81811061188c5750505090565b82516001600160a01b031684526020938401939092019160010161187f565b90602080835192838152019201905f5b8181106118c85750505090565b82518452602093840193909201916001016118bb565b9061170b916020815260018060a01b0382511660208201526101206119b561199f61198861197261195c61194661192660208a015161014060408b01526101608a01906115af565b60408a015160608a015260608a0151601f198a83030160808b015261186f565b6080890151888203601f190160a08a01526118ab565b60a0880151878203601f190160c089015261186f565b60c0870151868203601f190160e08801526118ab565b60e0860151858203601f190161010087015261186f565b610100850151848203601f1901848601526118ab565b92015190610140601f19828503019101526118ab565b6020600319820112610d1457600435906001600160401b038211610d1457610140908290036003190112610d145760040190565b9035601e1982360301811215610d145701602081359101916001600160401b038211610d14578160051b36038313610d1457565b916020908281520191905f5b818110611a4c5750505090565b909192602080600192838060a01b03611a64886117e7565b168152019401929101611a3f565b81835290916001600160fb1b038311610d145760209260051b809284830137010190565b60208152906001600160a01b03611aac826117e7565b1660208301526020810135601e1982360301811215610d14578101916020833593016001600160401b038411610d14578336038113610d1457611bf7611bd6611bb6611b97611b78611b598961170b9a611c039861014060408c0152816101608c01526101808b01375f610180828b010152601f8019910116880160408a013560608a0152610180611b4160608c018c6119ff565b919092601f19828d8303010160808d01520191611a33565b611b6660808a018a6119ff565b898303601f190160a08b015290611a72565b611b8560a08901896119ff565b888303601f190160c08a015290611a33565b611ba460c08801886119ff565b878303601f190160e089015290611a72565b611bc360e08701876119ff565b868303601f190161010088015290611a33565b611be46101008601866119ff565b858303601f190161012087015290611a72565b926101208101906119ff565b91610140601f1982860301910152611a72565b51908115158203610d1457565b929192611c2f8261169f565b91611c3d604051938461167e565b829481845281830111610d14578281602093845f96015e010152565b60405190611c6682611647565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610d1457565b51906001600160a01b0382168203610d1457565b9080601f83011215610d1457815161170b92602001611c23565b602081830312610d14578051906001600160401b038211610d14570161014081830312610d145760405191611d1983611647565b8151835260208201516020840152611d3360408301611ca3565b6040840152611d4460608301611ca3565b6060840152611d5560808301611ca3565b608084015260a082015160a0840152611d7060c08301611cb7565b60c0840152611d8160e08301611cb7565b60e0840152611d936101008301611c16565b6101008401526101208201516001600160401b038111610d1457611db79201611ccb565b61012082015290565b9080601f83011215610d14578151611dd7816117fb565b92611de5604051948561167e565b81845260208085019260051b820101928311610d1457602001905b828210611e0d5750505090565b60208091611e1a84611cb7565b815201910190611e00565b9080601f83011215610d14578151611e3c816117fb565b92611e4a604051948561167e565b81845260208085019260051b820101928311610d1457602001905b828210611e725750505090565b8151815260209182019101611e65565b602081830312610d14578051906001600160401b038211610d14570161014081830312610d145760405191611eb683611647565b611ebf82611cb7565b835260208201516001600160401b038111610d145781611ee0918401611ccb565b60208401526040820151604084015260608201516001600160401b038111610d145781611f0e918401611dc0565b606084015260808201516001600160401b038111610d145781611f32918401611e25565b608084015260a08201516001600160401b038111610d145781611f56918401611dc0565b60a084015260c08201516001600160401b038111610d145781611f7a918401611e25565b60c084015260e08201516001600160401b038111610d145781611f9e918401611dc0565b60e08401526101008201516001600160401b038111610d145781611fc3918401611e25565b6101008401526101208201516001600160401b038111610d1457611db79201611e25565b611ffa9060208082518301019101611e82565b80516020909101516001600160a01b0390911691565b9290928184036120a5575f91345b8584101561209a5781841015612086578360051b80860135908282116120775784013561013e1985360301811215610d145761205b908501612e6e565b1561206c576001910393019261201e565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f6120be611c59565b506120c7611c59565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f9181612416575b5061212f57856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481865afa5f91816123fa575b5061216f57866301fb6dd160e01b5f5260045260245ffd5b959192939495926020820151907f00000000000000000000000000000000000000000000000000000000000000008092036111da576121ad83612e87565b156111da576101208301926121c28451611fe7565b60a088019283518151036123b157516040805163e6c9714d60e01b81526060600482018190528b51606483015260208c01516084830152918b01516001600160401b0390811660a4830152918b0151821660c482015260808b015190911660e4820152935161010485015260c0890180516001600160a01b0390811661012487015260e08b0151166101448601526101008a01511515610164860152610120909901516101406101848601528492839291612282906101a48501906115af565b838103600319016024850152612297916115af565b60448301919091526001600160a01b039093169203815a93602094fa90811561139b575f916123c0575b50156123b1576040516122d38161162c565b8681525f6020820152604051926122e98461162c565b83526020830152803b15610d1457604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161239c575b5061234e5763614cf93960e01b85526004849052602485fd5b51825192949391927ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09161238b916001600160a01b031690612ee3565b94516001600160a01b03169380a490565b6123a99196505f9061167e565b5f945f612335565b630ebe58ef60e11b5f5260045ffd5b90506020813d6020116123f2575b816123db6020938361167e565b81010312610d14576123ec90611c16565b5f6122c1565b3d91506123ce565b61240f9192503d805f833e6105fc818361167e565b905f612157565b61242b9192503d805f833e6105fc818361167e565b905f612117565b6040519061243f82611647565b6060610120835f81528260208201525f604082015282808201528260808201528260a08201528260c08201528260e0820152826101008201520152565b9080601f83011215610d14578135612493816117fb565b926124a1604051948561167e565b81845260208085019260051b820101928311610d1457602001905b8282106124c95750505090565b602080916124d6846117e7565b8152019101906124bc565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036125b55761251581612e87565b156125af5761253561012061254592015160208082518301019101611e82565b9160208082518301019101611e82565b604082015160408201511115918261259d575b82612584575b8261256857505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061255e565b91506125a981836132e6565b91612558565b50505f90565b635f9bd90760e11b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b82101561270e575b806d04ee2d6d415b85acef8100000000600a9210156126f3575b662386f26fc100008110156126df575b6305f5e1008110156126ce575b6127108110156126bf575b60648110156126b1575b10156126a6575b600a6021600184019361264b8561169f565b94612659604051968761167e565b808652612668601f199161169f565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156126a157600a9091612673565b505090565b600190910190612639565b606460029104930192612632565b61271060049104930192612628565b6305f5e1006008910493019261261d565b662386f26fc1000060109104930192612610565b6d04ee2d6d415b85acef810000000060209104930192612600565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046125e6565b9190916127476020825183010160208301611e82565b92606084019283515195608086019687515103612e0d5760a08601908151519360c088019485515103612e0d5760e0880197885151610100820190815151811490811591612e1c575b50612e0d57604082015180612def575b505f5b895180518210156128485760206127cb8e610792855f956107898260018060a01b03926132d2565b03925af15f918161280d575b5061280857505f5b156127ec576001016127a3565b89518c91610800916001600160a01b03906107899083906132d2565b6127df565b9091506020813d8211612840575b816128286020938361167e565b81010312610d145761283990611c16565b905f6127d7565b3d915061281b565b5050929599509295965092965f965b86518051891015612a66576001600160a01b0390612876908a906132d2565b511660206128858a8d516132d2565b516024604051809481936331a9108f60e11b835260048301525afa90811561139b575f91612a2d575b50336001600160a01b0390911603612a155786516001600160a01b03906128d6908a906132d2565b51166128e3898c516132d2565b5190803b15610d14576040516323b872dd60e01b815233600482015230602482015260448101929092525f908290606490829084905af19081612a05575b5061293e578961097289896107898260018060a01b0392516132d2565b9091929394959660018060a01b03612957828a516132d2565b51166020612966838d516132d2565b516024604051809481936331a9108f60e11b835260048301525afa90811561139b575f916129cc575b50306001600160a01b03909116036129b05760010196959493929190612857565b87518a91610972916001600160a01b03906107899083906132d2565b90506020813d82116129fd575b816129e66020938361167e565b81010312610d14576129f790611cb7565b5f61298f565b3d91506129d9565b5f612a0f9161167e565b5f612921565b8961097289896107898260018060a01b0392516132d2565b90506020813d8211612a5e575b81612a476020938361167e565b81010312610d1457612a5890611cb7565b5f6128ae565b3d9150612a3a565b50939498509450959094506101205f9501965b84518051871015612c5657612aac906020906001600160a01b0390612a9f908a906132d2565b5116610b31898b516132d2565b03915afa90811561139b575f91612c25575b5085516001600160a01b0390612ad59089906132d2565b5116612ae2888a516132d2565b51612aee898c516132d2565b51823b15610d1457612b1b925f9283604051809681958294637921219560e11b84523033600486016134d1565b03925af19081612c15575b50612b4b578888610835610c108a610c08818c610bff8260018060a01b0392516132d2565b96959091929396612b76602060018060a01b03612b69858a516132d2565b5116610b31858b516132d2565b03915afa90811561139b575f91612be4575b50612b94838b516132d2565b518201809211612bd05710612bb0576001019495929190612a79565b85610835610c1083610c08818a610bff8f9860018060a01b0392516132d2565b634e487b7160e01b5f52601160045260245ffd5b90506020813d8211612c0d575b81612bfe6020938361167e565b81010312610d1457515f612b88565b3d9150612bf1565b5f612c1f9161167e565b5f612b26565b90506020813d8211612c4e575b81612c3f6020938361167e565b81010312610d1457515f612abe565b3d9150612c32565b5095509550915091506001600160401b0360405194612c7486611663565b60018060a01b031692838652166020850152600160408501525f606085015260808401525f60a08401526020604051612cac8161162c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0612d4d608083015160c060e48601526101248501906115af565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af192831561139b575f93612dbb575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011612de7575b81612dd76020938361167e565b81010312610d145751915f612d93565b3d9150612dca565b803410156127a05763b99e2ab760e01b5f526004523460245260445ffd5b63512509d360e11b5f5260045ffd5b90506101208301515114155f612790565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303612e5f57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b038116809103610d1457301490565b6001600160401b036060820151168015159081612ed8575b50612ec957608001516001600160401b0316612eba57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f612e9f565b612ef99092919260208082518301019101611e82565b91604083018051908161325d575b505060808301606084015f5b8151805182101561303357906020612f785f93612f378460018060a01b03926132d2565b5116612f448488516132d2565b5160405163a9059cbb60e01b81526001600160a01b038a166004820152602481019190915294859283919082906044820190565b03925af1805f91612ff8575b60019350612ff357505f5b15612f9b575b01612f13565b818060a01b03612fac8285516132d2565b5116612fb98286516132d2565b51906040519182527f6a0720b70d5a8914c9378c90e36e760e11a1c79840d56909d7562c7c79654e0b6020858060a01b03891693a3612f95565b612f8f565b90506020833d821161302b575b816130126020938361167e565b81010312610d1457613025600193611c16565b90612f84565b3d9150613005565b50505060a08401939260c0840191505f5b8551805182101561312e576001600160a01b03906130639083906132d2565b5116906130718185516132d2565b51823b15610d14576040516323b872dd60e01b81523060048201526001600160a01b038716602482015260448101919091526001925f908290606490829084905af1908161311e575b5061311957818060a01b036130d08289516132d2565b51166130dd8286516132d2565b51906040519182527f0863b761d932722655fba74d8a2c2b32a37c3d52195357bf7b4610ebfc6944e06020858060a01b03891693a35b01613044565b613113565b5f6131289161167e565b5f6130ba565b5092945092610120810192506101008101915060e0015f5b81518051821015613242576001600160a01b03906131659083906132d2565b5116906131738185516132d2565b51916131808287516132d2565b5192813b15610d14576001936131b2925f92838c60405196879586948593637921219560e11b855230600486016134d1565b03925af19081613232575b5061322d57818060a01b036131d38285516132d2565b51166131e08286516132d2565b51906131ed8388516132d2565b5160405192835260208301527f15fffc8b1069bee41edd748e645887f613b87a2d861ab91a772fc4a11ebe53026040858060a01b038b1693a35b01613146565b613227565b5f61323c9161167e565b5f6131bd565b5050505050905060405161325760208261167e565b5f815290565b5f80808060018060a01b03871695865af13d156132cd573d61327e8161169f565b9061328c604051928361167e565b81525f60203d92013e5b612f075760207fe3c18804896f0b200e4820c86cb36fe61cddd1654ca6627eb546a1bea97c2e7d9151604051908152a25f80612f07565b613296565b80518210156120865760209160051b010190565b60608101918251516060820190815151116134c9575f5b8151518110156133765784516001600160a01b039061331d9083906132d2565b511660018060a01b036133318385516132d2565b511614801590613351575b613348576001016132fd565b50505050505f90565b506133608160808601516132d2565b5161336f8260808601516132d2565b511161333c565b5050915060a081019182515160a0820190815151116134c9575f5b8151518110156134025784516001600160a01b03906133b19083906132d2565b511660018060a01b036133c58385516132d2565b5116148015906133dc575b61334857600101613391565b506133eb8160c08601516132d2565b516133fa8260c08601516132d2565b5114156133d0565b5050915060e08101918251519260e0820193845151116134c9575f5b8451518110156134bf5781516001600160a01b039061343e9083906132d2565b511660018060a01b036134528388516132d2565b511614801590613497575b8015613470575b6133485760010161341e565b50613480816101208601516132d2565b51613490826101208601516132d2565b5111613464565b506134a7816101008601516132d2565b516134b7826101008601516132d2565b51141561345d565b5050505050600190565b505050505f90565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c0019056fea26469706673582212207118a0424aab79086b69ab77386ca0e9015feade98f2b65a218ae59cbf3b4fbf64736f6c634300081b0033",
    sourceMap:
      "696:13850:88:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;696:13850:88;;;;2762:4;696:13850;759:14:6;688:1:9;696:13850:88;783:14:6;-1:-1:-1;696:13850:88;807:14:6;708:26:9;704:76;;696:13850:88;790:10:9;;696:13850:88;790:10:9;696:13850:88;790:10:9;696:13850:88;789:10:73;696:13850:88;809:32:73;-1:-1:-1;696:13850:88;;;;;;;;;;;872:48:73;;696:13850:88;872:48:73;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;904:4:73;696:13850:88;;;;2762:4;696:13850;;;;;;-1:-1:-1;;696:13850:88;;;872:48:73;;;;;;;;;;-1:-1:-1;872:48:73;;;-1:-1:-1;851:69:73;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;851:69:73;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;872:48:73;;;696:13850:88;872:48:73;;696:13850:88;872:48:73;;;;;;696:13850:88;872:48:73;;;:::i;:::-;;;696:13850:88;;;;;872:48:73;;;696:13850:88;-1:-1:-1;696:13850:88;;872:48:73;;;-1:-1:-1;872:48:73;;;696:13850:88;;;-1:-1:-1;696:13850:88;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;;-1:-1:-1;696:13850:88;;;;;;-1:-1:-1;;696:13850:88;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::o",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x608080604052600436101561001c575b50361561001a575f80fd5b005b5f905f3560e01c90816301ffc9a714611546575080632c713cd91461153557806354fd4d501461144757806355b0769b146113e05780635bf2f20d146113a65780636b122fe0146112055780637d2c2931146110285780638371ef5914610fc957806388e5b2d914610f7b578063891d9ea814610f9a57806391db0b7e14610f7b578063b3b902d4146106ae578063bc197c8114610618578063c6ec50701461050c578063c93844be14610349578063ce46e0461461032d578063cf84e82c146102a7578063e49617e11461028c578063e60c35051461028c578063e6c9714d146101655763f23a6e610361000f57346101625760a0366003190112610162576101246117bb565b5061012d6117d1565b506084356001600160401b0381116101605761014d9036906004016116f0565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461016257606036600319011261016257600435906001600160401b03821161016257610140600319833603011261016257604051916101a583611647565b80600401358352602481013560208401526101c2604482016115e9565b60408401526101d3606482016115e9565b60608401526101e4608482016115e9565b608084015260a481013560a08401526101ff60c482016117e7565b60c084015261021060e482016117e7565b60e08401526101048101358015158103610288576101008401526101248101356001600160401b0381116102885761024d913691016004016116f0565b610120830152602435906001600160401b03821161016257602061027e8461027836600487016116f0565b906124e1565b6040519015158152f35b8280fd5b602061027e61029a366119cb565b6102a2612e2d565b612e6e565b506060366003190112610162576004356001600160401b038111610160576101406003198236030112610160576102dc6115d3565b604435929091906001600160a01b0384168403610162576020610325858561031261032087604051928391600401888301611a96565b03601f19810183528261167e565b612731565b604051908152f35b5034610162578060031936011261016257602090604051908152f35b5034610162576020366003190112610162576004356001600160401b0381116101605761037a90369060040161178e565b610385929192612432565b50820191602081840312610160578035906001600160401b0382116102885701906101408284031261016257604051916103be83611647565b6103c7816117e7565b835260208101356001600160401b03811161028857846103e89183016116f0565b60208401526040810135604084015260608101356001600160401b038111610288578461041691830161247c565b606084015260808101356001600160401b038111610288578461043a918301611812565b608084015260a08101356001600160401b038111610288578461045e91830161247c565b60a084015260c08101356001600160401b0381116102885784610482918301611812565b60c084015260e08101356001600160401b03811161028857846104a691830161247c565b60e08401526101008101356001600160401b03811161028857846104cb918301611812565b610100840152610120810135916001600160401b0383116101625750926104f6916105089401611812565b610120820152604051918291826118de565b0390f35b503461016257602036600319011261016257610526612432565b5061052f611c59565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561060b5781926105e7575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105d8576105086105cc61012084015160208082518301019101611e82565b604051918291826118de565b635527981560e11b8152600490fd5b6106049192503d8084833e6105fc818361167e565b810190611ce5565b905f610585565b50604051903d90823e3d90fd5b50346101625760a0366003190112610162576106326117bb565b5061063b6117d1565b506044356001600160401b0381116101605761065b903690600401611812565b506064356001600160401b0381116101605761067b903690600401611812565b506084356001600160401b0381116101605761069b9036906004016116f0565b5060405163bc197c8160e01b8152602090f35b506060366003190112610162576004356001600160401b03811161016057906106de6106f092369060040161178e565b92906106e86115d3565b9336916116ba565b916107046020845185010160208501611e82565b91606083019182515194608085019586515103610f6c5760a08501908151519160c087019283515103610f5d5760e087019182515194610100890195865151811490811591610f4c575b50610f3d57604089015180610f1f575b50865b8851805182101561087d5760206107c38d610792858d956107898260018060a01b03926132d2565b511692516132d2565b516040516323b872dd60e01b8152336004820152306024820152604481019190915293849283919082906064820190565b03925af189918161083e575b506108395750875b156107e457600101610761565b88518b91610800916001600160a01b03906107899083906132d2565b51604051634a73404560e11b81526001600160a01b039092166004830152336024830152306044830152606482015280608481015b0390fd5b6107d7565b9091506020813d8211610875575b816108596020938361167e565b810103126108715761086a90611c16565b905f6107cf565b8980fd5b3d915061084c565b505085929187918a83955b85518051881015610af0576001600160a01b03906108a79089906132d2565b511660206108b6898c516132d2565b516024604051809481936331a9108f60e11b835260048301525afa908115610ae5578691610aac575b50336001600160a01b0390911603610a945785516001600160a01b03906109079089906132d2565b5116610914888b516132d2565b51813b15610a64576040516323b872dd60e01b8152336004820152306024820152604481019190915290869081908390606490829084905af19182610a7b575b50506109a7578861097288886107898260018060a01b0392516132d2565b5160405163045b391760e01b81526001600160a01b039290921660048301523360248301523060448301526064820152608490fd5b90919293949560018060a01b036109bf8289516132d2565b511660206109ce838c516132d2565b516024604051809481936331a9108f60e11b835260048301525afa908115610a70578791610a33575b50306001600160a01b0390911603610a1757600101959493929190610888565b86518991610972916001600160a01b03906107899083906132d2565b90506020813d8211610a68575b81610a4d6020938361167e565b81010312610a6457610a5e90611cb7565b8a6109f7565b8680fd5b3d9150610a40565b6040513d89823e3d90fd5b81610a859161167e565b610a9057858b610954565b8580fd5b8861097288886107898260018060a01b0392516132d2565b90506020813d8211610add575b81610ac66020938361167e565b81010312610a9057610ad790611cb7565b8a6108df565b3d9150610ab9565b6040513d88823e3d90fd5b509087849386610120819401955b83518051861015610d8057610b5b906020906001600160a01b0390610b249089906132d2565b5116610b31888a516132d2565b51604051627eeac760e11b8152306004820152602481019190915292839190829081906044820190565b03915afa908115610d75578391610d44575b5084516001600160a01b0390610b849088906132d2565b5116610b918789516132d2565b5190610b9e888b516132d2565b5191813b15610a9057610bce928692839283604051809781958294637921219560e11b84523033600486016134d1565b03925af19182610d2b575b5050610c54578787610835610c1089610c08818b610bff8260018060a01b0392516132d2565b511695516132d2565b5194516132d2565b5160405163334a7d1b60e21b81526001600160a01b0390931660048401523360248401523060448401526064830193909352608482019290925290819060a4820190565b959490919295610c7e602060018060a01b03610c718589516132d2565b5116610b31858a516132d2565b03915afa908115610d20578591610ceb575b50610c9c838a516132d2565b518201809211610cd75710610cb75760010193949190610afe565b84610835610c1083610c088189610bff8e9860018060a01b0392516132d2565b634e487b7160e01b85526011600452602485fd5b90506020813d8211610d18575b81610d056020938361167e565b81010312610d14575189610c90565b5f80fd5b3d9150610cf8565b6040513d87823e3d90fd5b81610d359161167e565b610d4057838a610bd9565b8380fd5b90506020813d8211610d6d575b81610d5e6020938361167e565b81010312610d14575188610b6d565b3d9150610d51565b6040513d85823e3d90fd5b50604051906001600160401b0384610d9784611663565b33845216602083015260016040830152604435606083015260808201528160a08201526020604051610dc88161162c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610e69608083015160c060e48601526101248501906115af565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115610f14578291610ee1575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a3604051908152f35b90506020813d602011610f0c575b81610efc6020938361167e565b8101031261016057516020610eaf565b3d9150610eef565b6040513d84823e3d90fd5b8034101561075e5763b99e2ab760e01b885260045234602452604487fd5b63512509d360e11b8752600487fd5b90506101208a01515114155f61074e565b63512509d360e11b8552600485fd5b63512509d360e11b8352600483fd5b602061027e610f893661173e565b92610f95929192612e2d565b612010565b503461016257610508610fb5610faf36611599565b906120b4565b6040519182916020835260208301906115af565b503461016257602036600319011261016257600435906001600160401b03821161016257611002610ffd36600485016116f0565b611fe7565b604080516001600160a01b039093168352602083018190528291610508918301906115af565b5034610d14576020366003190112610d145760043590611046611c59565b506040516328c44a9960e21b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691905f81602481865afa5f91816111e9575b506110af57836301fb6dd160e01b5f5260045260245ffd5b8390926020840151907f00000000000000000000000000000000000000000000000000000000000000008092036111da57606085016001600160401b03815116156111cb57516001600160401b031642106111cb576040516111108161162c565b8381525f6020820152604051926111268461162c565b83526020830152803b15610d1457604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816111b6575b5061118a5763614cf93960e01b825260045260249150fd5b61012083015160c08401516111aa916001600160a01b0390911690612ee3565b50602060405160018152f35b6111c39193505f9061167e565b5f9184611172565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b6111fe9192503d805f833e6105fc818361167e565b905f611097565b34610d14575f366003190112610d1457606080604051611224816115fd565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561139b575f906112eb575b606090610508604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906115af565b503d805f833e6112fb818361167e565b810190602081830312610d14578051906001600160401b038211610d145701608081830312610d145760405190611331826115fd565b8051825260208101516001600160a01b0381168103610d1457602083015261135b60408201611c16565b60408301526060810151906001600160401b038211610d14570182601f82011215610d145760609281602061139293519101611c23565b828201526112a5565b6040513d5f823e3d90fd5b34610d14575f366003190112610d145760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b6040366003190112610d14576004356001600160401b038111610d14576101406003198236030112610d14576103256114326020926114406114206115d3565b91604051938491600401878301611a96565b03601f19810184528361167e565b3391612731565b34610d14575f366003190112610d14576105086020610fb5600161148a7f00000000000000000000000000000000000000000000000000000000000000006125c4565b81846114b57f00000000000000000000000000000000000000000000000000000000000000006125c4565b81806114e07f00000000000000000000000000000000000000000000000000000000000000006125c4565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f19810183528261167e565b34610d14576111aa610faf36611599565b34610d14576020366003190112610d14576004359063ffffffff60e01b8216809203610d1457602091630271189760e51b8114908115611588575b5015158152f35b6301ffc9a760e01b14905083611581565b6040906003190112610d14576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602435906001600160401b0382168203610d1457565b35906001600160401b0382168203610d1457565b608081019081106001600160401b0382111761161857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761161857604052565b61014081019081106001600160401b0382111761161857604052565b60c081019081106001600160401b0382111761161857604052565b90601f801991011681019081106001600160401b0382111761161857604052565b6001600160401b03811161161857601f01601f191660200190565b9291926116c68261169f565b916116d4604051938461167e565b829481845281830111610d14578281602093845f960137010152565b9080601f83011215610d145781602061170b933591016116ba565b90565b9181601f84011215610d14578235916001600160401b038311610d14576020808501948460051b010111610d1457565b6040600319820112610d14576004356001600160401b038111610d1457816117689160040161170e565b92909291602435906001600160401b038211610d145761178a9160040161170e565b9091565b9181601f84011215610d14578235916001600160401b038311610d145760208381860195010111610d1457565b600435906001600160a01b0382168203610d1457565b602435906001600160a01b0382168203610d1457565b35906001600160a01b0382168203610d1457565b6001600160401b0381116116185760051b60200190565b9080601f83011215610d14578135611829816117fb565b92611837604051948561167e565b81845260208085019260051b820101928311610d1457602001905b82821061185f5750505090565b8135815260209182019101611852565b90602080835192838152019201905f5b81811061188c5750505090565b82516001600160a01b031684526020938401939092019160010161187f565b90602080835192838152019201905f5b8181106118c85750505090565b82518452602093840193909201916001016118bb565b9061170b916020815260018060a01b0382511660208201526101206119b561199f61198861197261195c61194661192660208a015161014060408b01526101608a01906115af565b60408a015160608a015260608a0151601f198a83030160808b015261186f565b6080890151888203601f190160a08a01526118ab565b60a0880151878203601f190160c089015261186f565b60c0870151868203601f190160e08801526118ab565b60e0860151858203601f190161010087015261186f565b610100850151848203601f1901848601526118ab565b92015190610140601f19828503019101526118ab565b6020600319820112610d1457600435906001600160401b038211610d1457610140908290036003190112610d145760040190565b9035601e1982360301811215610d145701602081359101916001600160401b038211610d14578160051b36038313610d1457565b916020908281520191905f5b818110611a4c5750505090565b909192602080600192838060a01b03611a64886117e7565b168152019401929101611a3f565b81835290916001600160fb1b038311610d145760209260051b809284830137010190565b60208152906001600160a01b03611aac826117e7565b1660208301526020810135601e1982360301811215610d14578101916020833593016001600160401b038411610d14578336038113610d1457611bf7611bd6611bb6611b97611b78611b598961170b9a611c039861014060408c0152816101608c01526101808b01375f610180828b010152601f8019910116880160408a013560608a0152610180611b4160608c018c6119ff565b919092601f19828d8303010160808d01520191611a33565b611b6660808a018a6119ff565b898303601f190160a08b015290611a72565b611b8560a08901896119ff565b888303601f190160c08a015290611a33565b611ba460c08801886119ff565b878303601f190160e089015290611a72565b611bc360e08701876119ff565b868303601f190161010088015290611a33565b611be46101008601866119ff565b858303601f190161012087015290611a72565b926101208101906119ff565b91610140601f1982860301910152611a72565b51908115158203610d1457565b929192611c2f8261169f565b91611c3d604051938461167e565b829481845281830111610d14578281602093845f96015e010152565b60405190611c6682611647565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610d1457565b51906001600160a01b0382168203610d1457565b9080601f83011215610d1457815161170b92602001611c23565b602081830312610d14578051906001600160401b038211610d14570161014081830312610d145760405191611d1983611647565b8151835260208201516020840152611d3360408301611ca3565b6040840152611d4460608301611ca3565b6060840152611d5560808301611ca3565b608084015260a082015160a0840152611d7060c08301611cb7565b60c0840152611d8160e08301611cb7565b60e0840152611d936101008301611c16565b6101008401526101208201516001600160401b038111610d1457611db79201611ccb565b61012082015290565b9080601f83011215610d14578151611dd7816117fb565b92611de5604051948561167e565b81845260208085019260051b820101928311610d1457602001905b828210611e0d5750505090565b60208091611e1a84611cb7565b815201910190611e00565b9080601f83011215610d14578151611e3c816117fb565b92611e4a604051948561167e565b81845260208085019260051b820101928311610d1457602001905b828210611e725750505090565b8151815260209182019101611e65565b602081830312610d14578051906001600160401b038211610d14570161014081830312610d145760405191611eb683611647565b611ebf82611cb7565b835260208201516001600160401b038111610d145781611ee0918401611ccb565b60208401526040820151604084015260608201516001600160401b038111610d145781611f0e918401611dc0565b606084015260808201516001600160401b038111610d145781611f32918401611e25565b608084015260a08201516001600160401b038111610d145781611f56918401611dc0565b60a084015260c08201516001600160401b038111610d145781611f7a918401611e25565b60c084015260e08201516001600160401b038111610d145781611f9e918401611dc0565b60e08401526101008201516001600160401b038111610d145781611fc3918401611e25565b6101008401526101208201516001600160401b038111610d1457611db79201611e25565b611ffa9060208082518301019101611e82565b80516020909101516001600160a01b0390911691565b9290928184036120a5575f91345b8584101561209a5781841015612086578360051b80860135908282116120775784013561013e1985360301811215610d145761205b908501612e6e565b1561206c576001910393019261201e565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f6120be611c59565b506120c7611c59565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f9181612416575b5061212f57856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481865afa5f91816123fa575b5061216f57866301fb6dd160e01b5f5260045260245ffd5b959192939495926020820151907f00000000000000000000000000000000000000000000000000000000000000008092036111da576121ad83612e87565b156111da576101208301926121c28451611fe7565b60a088019283518151036123b157516040805163e6c9714d60e01b81526060600482018190528b51606483015260208c01516084830152918b01516001600160401b0390811660a4830152918b0151821660c482015260808b015190911660e4820152935161010485015260c0890180516001600160a01b0390811661012487015260e08b0151166101448601526101008a01511515610164860152610120909901516101406101848601528492839291612282906101a48501906115af565b838103600319016024850152612297916115af565b60448301919091526001600160a01b039093169203815a93602094fa90811561139b575f916123c0575b50156123b1576040516122d38161162c565b8681525f6020820152604051926122e98461162c565b83526020830152803b15610d1457604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161239c575b5061234e5763614cf93960e01b85526004849052602485fd5b51825192949391927ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09161238b916001600160a01b031690612ee3565b94516001600160a01b03169380a490565b6123a99196505f9061167e565b5f945f612335565b630ebe58ef60e11b5f5260045ffd5b90506020813d6020116123f2575b816123db6020938361167e565b81010312610d14576123ec90611c16565b5f6122c1565b3d91506123ce565b61240f9192503d805f833e6105fc818361167e565b905f612157565b61242b9192503d805f833e6105fc818361167e565b905f612117565b6040519061243f82611647565b6060610120835f81528260208201525f604082015282808201528260808201528260a08201528260c08201528260e0820152826101008201520152565b9080601f83011215610d14578135612493816117fb565b926124a1604051948561167e565b81845260208085019260051b820101928311610d1457602001905b8282106124c95750505090565b602080916124d6846117e7565b8152019101906124bc565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036125b55761251581612e87565b156125af5761253561012061254592015160208082518301019101611e82565b9160208082518301019101611e82565b604082015160408201511115918261259d575b82612584575b8261256857505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061255e565b91506125a981836132e6565b91612558565b50505f90565b635f9bd90760e11b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b82101561270e575b806d04ee2d6d415b85acef8100000000600a9210156126f3575b662386f26fc100008110156126df575b6305f5e1008110156126ce575b6127108110156126bf575b60648110156126b1575b10156126a6575b600a6021600184019361264b8561169f565b94612659604051968761167e565b808652612668601f199161169f565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156126a157600a9091612673565b505090565b600190910190612639565b606460029104930192612632565b61271060049104930192612628565b6305f5e1006008910493019261261d565b662386f26fc1000060109104930192612610565b6d04ee2d6d415b85acef810000000060209104930192612600565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046125e6565b9190916127476020825183010160208301611e82565b92606084019283515195608086019687515103612e0d5760a08601908151519360c088019485515103612e0d5760e0880197885151610100820190815151811490811591612e1c575b50612e0d57604082015180612def575b505f5b895180518210156128485760206127cb8e610792855f956107898260018060a01b03926132d2565b03925af15f918161280d575b5061280857505f5b156127ec576001016127a3565b89518c91610800916001600160a01b03906107899083906132d2565b6127df565b9091506020813d8211612840575b816128286020938361167e565b81010312610d145761283990611c16565b905f6127d7565b3d915061281b565b5050929599509295965092965f965b86518051891015612a66576001600160a01b0390612876908a906132d2565b511660206128858a8d516132d2565b516024604051809481936331a9108f60e11b835260048301525afa90811561139b575f91612a2d575b50336001600160a01b0390911603612a155786516001600160a01b03906128d6908a906132d2565b51166128e3898c516132d2565b5190803b15610d14576040516323b872dd60e01b815233600482015230602482015260448101929092525f908290606490829084905af19081612a05575b5061293e578961097289896107898260018060a01b0392516132d2565b9091929394959660018060a01b03612957828a516132d2565b51166020612966838d516132d2565b516024604051809481936331a9108f60e11b835260048301525afa90811561139b575f916129cc575b50306001600160a01b03909116036129b05760010196959493929190612857565b87518a91610972916001600160a01b03906107899083906132d2565b90506020813d82116129fd575b816129e66020938361167e565b81010312610d14576129f790611cb7565b5f61298f565b3d91506129d9565b5f612a0f9161167e565b5f612921565b8961097289896107898260018060a01b0392516132d2565b90506020813d8211612a5e575b81612a476020938361167e565b81010312610d1457612a5890611cb7565b5f6128ae565b3d9150612a3a565b50939498509450959094506101205f9501965b84518051871015612c5657612aac906020906001600160a01b0390612a9f908a906132d2565b5116610b31898b516132d2565b03915afa90811561139b575f91612c25575b5085516001600160a01b0390612ad59089906132d2565b5116612ae2888a516132d2565b51612aee898c516132d2565b51823b15610d1457612b1b925f9283604051809681958294637921219560e11b84523033600486016134d1565b03925af19081612c15575b50612b4b578888610835610c108a610c08818c610bff8260018060a01b0392516132d2565b96959091929396612b76602060018060a01b03612b69858a516132d2565b5116610b31858b516132d2565b03915afa90811561139b575f91612be4575b50612b94838b516132d2565b518201809211612bd05710612bb0576001019495929190612a79565b85610835610c1083610c08818a610bff8f9860018060a01b0392516132d2565b634e487b7160e01b5f52601160045260245ffd5b90506020813d8211612c0d575b81612bfe6020938361167e565b81010312610d1457515f612b88565b3d9150612bf1565b5f612c1f9161167e565b5f612b26565b90506020813d8211612c4e575b81612c3f6020938361167e565b81010312610d1457515f612abe565b3d9150612c32565b5095509550915091506001600160401b0360405194612c7486611663565b60018060a01b031692838652166020850152600160408501525f606085015260808401525f60a08401526020604051612cac8161162c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0612d4d608083015160c060e48601526101248501906115af565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af192831561139b575f93612dbb575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011612de7575b81612dd76020938361167e565b81010312610d145751915f612d93565b3d9150612dca565b803410156127a05763b99e2ab760e01b5f526004523460245260445ffd5b63512509d360e11b5f5260045ffd5b90506101208301515114155f612790565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303612e5f57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b038116809103610d1457301490565b6001600160401b036060820151168015159081612ed8575b50612ec957608001516001600160401b0316612eba57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f612e9f565b612ef99092919260208082518301019101611e82565b91604083018051908161325d575b505060808301606084015f5b8151805182101561303357906020612f785f93612f378460018060a01b03926132d2565b5116612f448488516132d2565b5160405163a9059cbb60e01b81526001600160a01b038a166004820152602481019190915294859283919082906044820190565b03925af1805f91612ff8575b60019350612ff357505f5b15612f9b575b01612f13565b818060a01b03612fac8285516132d2565b5116612fb98286516132d2565b51906040519182527f6a0720b70d5a8914c9378c90e36e760e11a1c79840d56909d7562c7c79654e0b6020858060a01b03891693a3612f95565b612f8f565b90506020833d821161302b575b816130126020938361167e565b81010312610d1457613025600193611c16565b90612f84565b3d9150613005565b50505060a08401939260c0840191505f5b8551805182101561312e576001600160a01b03906130639083906132d2565b5116906130718185516132d2565b51823b15610d14576040516323b872dd60e01b81523060048201526001600160a01b038716602482015260448101919091526001925f908290606490829084905af1908161311e575b5061311957818060a01b036130d08289516132d2565b51166130dd8286516132d2565b51906040519182527f0863b761d932722655fba74d8a2c2b32a37c3d52195357bf7b4610ebfc6944e06020858060a01b03891693a35b01613044565b613113565b5f6131289161167e565b5f6130ba565b5092945092610120810192506101008101915060e0015f5b81518051821015613242576001600160a01b03906131659083906132d2565b5116906131738185516132d2565b51916131808287516132d2565b5192813b15610d14576001936131b2925f92838c60405196879586948593637921219560e11b855230600486016134d1565b03925af19081613232575b5061322d57818060a01b036131d38285516132d2565b51166131e08286516132d2565b51906131ed8388516132d2565b5160405192835260208301527f15fffc8b1069bee41edd748e645887f613b87a2d861ab91a772fc4a11ebe53026040858060a01b038b1693a35b01613146565b613227565b5f61323c9161167e565b5f6131bd565b5050505050905060405161325760208261167e565b5f815290565b5f80808060018060a01b03871695865af13d156132cd573d61327e8161169f565b9061328c604051928361167e565b81525f60203d92013e5b612f075760207fe3c18804896f0b200e4820c86cb36fe61cddd1654ca6627eb546a1bea97c2e7d9151604051908152a25f80612f07565b613296565b80518210156120865760209160051b010190565b60608101918251516060820190815151116134c9575f5b8151518110156133765784516001600160a01b039061331d9083906132d2565b511660018060a01b036133318385516132d2565b511614801590613351575b613348576001016132fd565b50505050505f90565b506133608160808601516132d2565b5161336f8260808601516132d2565b511161333c565b5050915060a081019182515160a0820190815151116134c9575f5b8151518110156134025784516001600160a01b03906133b19083906132d2565b511660018060a01b036133c58385516132d2565b5116148015906133dc575b61334857600101613391565b506133eb8160c08601516132d2565b516133fa8260c08601516132d2565b5114156133d0565b5050915060e08101918251519260e0820193845151116134c9575f5b8451518110156134bf5781516001600160a01b039061343e9083906132d2565b511660018060a01b036134528388516132d2565b511614801590613497575b8015613470575b6133485760010161341e565b50613480816101208601516132d2565b51613490826101208601516132d2565b5111613464565b506134a7816101008601516132d2565b516134b7826101008601516132d2565b51141561345d565b5050505050600190565b505050505f90565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c0019056fea26469706673582212207118a0424aab79086b69ab77386ca0e9015feade98f2b65a218ae59cbf3b4fbf64736f6c634300081b0033",
    sourceMap:
      "696:13850:88:-:0;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;:::i;:::-;-1:-1:-1;696:13850:88;;-1:-1:-1;;;696:13850:88;;;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;3045:39:9;696:13850:88;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;696:13850:88:-;-1:-1:-1;696:13850:88;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;13694:155;696:13850;;13731:16;;696:13850;;;;;;;;13731:16;;;;:::i;:::-;;1055:104:6;;13731:16:88;;;;;;:::i;:::-;13694:155;:::i;:::-;696:13850;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;14412:34;;696:13850;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;696:13850:88;;-1:-1:-1;;;2392:23:73;;696:13850:88;;;2392:23:73;;;696:13850:88;;;;2392:23:73;696:13850:88;2392:3:73;-1:-1:-1;;;;;696:13850:88;2392:23:73;;;;;;;;;;;696:13850:88;2429:19:73;696:13850:88;2429:19:73;;696:13850:88;2452:18:73;2429:41;2425:87;;696:13850:88;14227:46;14238:16;;;;696:13850;;;;14227:46;;;;;;:::i;:::-;696:13850;;;;;;;:::i;2425:87:73:-;-1:-1:-1;;;2491:21:73;;696:13850:88;;2491:21:73;2392:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;696:13850:88;;;;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;:::i;:::-;-1:-1:-1;696:13850:88;;-1:-1:-1;;;696:13850:88;;;;;;-1:-1:-1;696:13850:88;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;:::i;:::-;724:119:76;3758:34:88;696:13850;;;3758:34;;;696:13850;3758:34;;;:::i;:::-;2875:16;696:13850;2875:16;;;;;696:13850;2902:17;;;;;;;696:13850;2875:51;2871:97;;2982:17;;;;;;696:13850;3010:19;;;;;;;696:13850;2982:54;2978:100;;696:13850;3105:18;;;;;696:13850;3134:20;;;;;;;696:13850;3105:56;;;;;:127;;;696:13850;3088:183;;;696:13850;3878:20;;696:13850;3878:24;3874:184;;696:13850;5308:10;;5349:3;5324:16;;696:13850;;5320:27;;;;;696:13850;5414:161;5368:12;5537:20;5368:12;;;5421:19;696:13850;;;;;;5421:19;;:::i;:::-;696:13850;;5537:17;;:20;:::i;:::-;696:13850;;;-1:-1:-1;;;5414:161:88;;803:10:76;696:13850:88;5414:161;;696:13850;5510:4;696:13850;;;;;;;;;;;;;;;;;;;;;;;;5414:161;;;;;;;;;;5349:3;-1:-1:-1;5394:320:88;;5684:15;;5394:320;5732:8;5728:235;;696:13850;;5308:10;;5728:235;5808:16;;696:13850;;5910:20;;-1:-1:-1;;;;;696:13850:88;5808:19;;696:13850;;5808:19;:::i;5910:20::-;696:13850;;;-1:-1:-1;;;5767:181:88;;-1:-1:-1;;;;;696:13850:88;;;;5767:181;;696:13850;803:10:76;696:13850:88;;;;5510:4;696:13850;;;;;;;;;;;;5767:181;;;;5394:320;;;5414:161;;;;696:13850;5414:161;;;;;;;;;696:13850;5414:161;;;:::i;:::-;;;696:13850;;;;;;;:::i;:::-;5414:161;;;;696:13850;;;;5414:161;;;-1:-1:-1;5414:161:88;;5320:27;;;;;;;;;6016:10;6011:1441;6058:3;6032:17;;696:13850;;6028:28;;;;;-1:-1:-1;;;;;696:13850:88;6154:20;;696:13850;;6154:20;:::i;:::-;696:13850;;;6201:22;:19;;;:22;:::i;:::-;696:13850;6146:91;696:13850;;;;;;;;;6146:91;;696:13850;6146:91;;696:13850;6146:91;;;;;;;;;;;6058:3;-1:-1:-1;803:10:76;-1:-1:-1;;;;;696:13850:88;;;6255:19;6251:250;;6543:17;;-1:-1:-1;;;;;696:13850:88;6543:20;;:17;;:20;:::i;:::-;696:13850;;6660:22;:19;;;:22;:::i;:::-;696:13850;6535:165;;;;;696:13850;;-1:-1:-1;;;6535:165:88;;803:10:76;696:13850:88;6535:165;;696:13850;5510:4;696:13850;;;;;;;;;;;;;;;;;;;;;;;;6535:165;;;;;;6058:3;-1:-1:-1;;6515:483:88;;696:13850;6943:22;696:13850;;6840:20;696:13850;;;;;;6840:17;;:20;:::i;6943:22::-;696:13850;;;-1:-1:-1;;;6798:185:88;;-1:-1:-1;;;;;696:13850:88;;;;;6798:185;;696:13850;803:10:76;696:13850:88;;;;5510:4;696:13850;;;;;;;;;;5767:181;6515:483;;;;;;;696:13850;;;;;7087:20;:17;;;:20;:::i;:::-;696:13850;;;7134:22;:19;;;:22;:::i;:::-;696:13850;6146:91;696:13850;;;;;;;;;7079:91;;696:13850;7079:91;;696:13850;7079:91;;;;;;;;;;;6515:483;-1:-1:-1;5510:4:88;-1:-1:-1;;;;;696:13850:88;;;7188:27;7184:258;;696:13850;;6016:10;;;;;;;;7184:258;7284:17;;696:13850;;7387:22;;-1:-1:-1;;;;;696:13850:88;7284:20;;696:13850;;7284:20;:::i;7079:91::-;;;696:13850;7079:91;;;;;;;;;696:13850;7079:91;;;:::i;:::-;;;696:13850;;;;;;;:::i;:::-;7079:91;;;696:13850;;;;7079:91;;;-1:-1:-1;7079:91:88;;;696:13850;;;;;;;;;6535:165;;;;;:::i;:::-;696:13850;;6535:165;;;;696:13850;;;;6251:250;696:13850;6446:22;696:13850;;6343:20;696:13850;;;;;;6343:17;;:20;:::i;6146:91::-;;;696:13850;6146:91;;;;;;;;;696:13850;6146:91;;;:::i;:::-;;;696:13850;;;;;;;:::i;:::-;6146:91;;;;;;-1:-1:-1;6146:91:88;;;696:13850;;;;;;;;;6028:28;;;;;;;7965:19;7496:10;7965:19;;7491:1499;7539:3;7512:18;;696:13850;;7508:29;;;;;7627:127;;696:13850;;-1:-1:-1;;;;;696:13850:88;7636:21;;696:13850;;7636:21;:::i;:::-;696:13850;;7717:23;:20;;;:23;:::i;:::-;696:13850;;;-1:-1:-1;;;7627:127:88;;5510:4;696:13850;7627:127;;696:13850;;;;;;;;;;;;;;;;;;;;;7627:127;;;;;;;;;;;;;;7539:3;-1:-1:-1;7798:18:88;;-1:-1:-1;;;;;696:13850:88;7798:21;;:18;;:21;:::i;:::-;696:13850;;7920:23;:20;;;:23;:::i;:::-;696:13850;7965:19;:22;:19;;;:22;:::i;:::-;696:13850;7789:240;;;;;;;696:13850;;;;;;;;;;;;;;;;;7789:240;;5510:4;803:10:76;696:13850:88;7789:240;;;:::i;:::-;;;;;;;;;7539:3;-1:-1:-1;;7769:605:88;;696:13850;;8127:232;8319:22;696:13850;8274:23;696:13850;;8170:21;696:13850;;;;;;8170:18;;:21;:::i;:::-;696:13850;;8274:20;;:23;:::i;:::-;696:13850;8319:19;;:22;:::i;:::-;696:13850;;;-1:-1:-1;;;8127:232:88;;-1:-1:-1;;;;;696:13850:88;;;;8127:232;;696:13850;803:10:76;696:13850:88;;;;5510:4;696:13850;;;;;;;;;;;;;;;;;;;;;;;;;;7769:605;;;;;;;8455:127;696:13850;;;;;;8464:21;:18;;;:21;:::i;:::-;696:13850;;8545:23;:20;;;:23;:::i;8455:127::-;;;;;;;;;;;;;;7769:605;8684:19;:22;:19;;;:22;:::i;:::-;696:13850;;;;;;;;8653:53;8649:331;;696:13850;;7496:10;;;;;;8649:331;696:13850;8733:232;8925:22;696:13850;8880:23;696:13850;;8776:21;696:13850;;;;;;;8776:18;;:21;:::i;696:13850::-;-1:-1:-1;;;696:13850:88;;;;;6146:91;696:13850;;8455:127;;;696:13850;8455:127;;;;;;;;;696:13850;8455:127;;;:::i;:::-;;;696:13850;;;;;8455:127;;;696:13850;-1:-1:-1;696:13850:88;;8455:127;;;-1:-1:-1;8455:127:88;;;696:13850;;;;;;;;;7789:240;;;;;:::i;:::-;696:13850;;7789:240;;;;696:13850;;;;7627:127;;;696:13850;7627:127;;;;;;;;;696:13850;7627:127;;;:::i;:::-;;;696:13850;;;;;7627:127;;;;;;-1:-1:-1;7627:127:88;;;696:13850;;;;;;;;;7508:29;-1:-1:-1;696:13850:88;;;-1:-1:-1;;;;;7508:29:88;696:13850;;;:::i;:::-;803:10:76;696:13850:88;;;;1914:299:73;;696:13850:88;;;1914:299:73;;696:13850:88;;;;1914:299:73;;696:13850:88;2902:17;1914:299:73;;696:13850:88;1914:299:73;2982:17:88;1914:299:73;;696:13850:88;;;;;;;:::i;:::-;1868:18:73;696:13850:88;;1819:413:73;;;696:13850:88;;;;;;;;;;;;1791:455:73;;;696:13850:88;1791:455:73;;696:13850:88;;6146:91;696:13850;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;2982:17;696:13850;2902:17;696:13850;;;3010:19;696:13850;;;;;;;;;:::i;:::-;;;;;;;;1791:455:73;696:13850:88;;1791:3:73;-1:-1:-1;;;;;696:13850:88;1791:455:73;;;;;;;;;;;7491:1499:88;1102:55:76;696:13850:88;1102:55:76;803:10;5771:26:74;803:10:76;5771:26:74;;;696:13850:88;;;;;;1791:455:73;;;696:13850:88;1791:455:73;;696:13850:88;1791:455:73;;;;;;696:13850:88;1791:455:73;;;:::i;:::-;;;696:13850:88;;;;;;1791:455:73;;;;;-1:-1:-1;1791:455:73;;;696:13850:88;;;;;;;;;3874:184;3922:9;;:32;3918:130;3874:184;3918:130;-1:-1:-1;;;3981:52:88;;696:13850;;3922:9;696:13850;;;3981:52;;3088:183;-1:-1:-1;;;3250:21:88;;696:13850;2947:21;3250;3105:127;3206:19;;;;;;696:13850;3177:55;;3105:127;;;2978:100;-1:-1:-1;;;3057:21:88;;696:13850;2947:21;3057;2871:97;-1:-1:-1;;;2947:21:88;;696:13850;2947:21;;696:13850;;1442:1461:9;696:13850:88;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;696:13850:88:-;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;696:13850:88;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;696:13850:88;;;;;;4185:30:74;696:13850:88;;:::i;:::-;-1:-1:-1;696:13850:88;;-1:-1:-1;;;4277:23:74;;696:13850:88;4277:23:74;;696:13850:88;;;4277:3:74;-1:-1:-1;;;;;696:13850:88;;;-1:-1:-1;696:13850:88;4277:23:74;696:13850:88;;4277:23:74;;696:13850:88;;4277:23:74;;;696:13850:88;-1:-1:-1;4273:172:74;;4410:24;;;;696:13850:88;4410:24:74;696:13850:88;;4277:23:74;696:13850:88;4410:24:74;4273:172;4351:20;;4273:172;696:13850:88;4511:18:74;;696:13850:88;4533:18:74;;4511:40;;;4507:91;;4708:26;;;-1:-1:-1;;;;;696:13850:88;;;4708:31:74;4704:62;;696:13850:88;-1:-1:-1;;;;;696:13850:88;4781:15:74;:44;4777:87;;696:13850:88;;;;;:::i;:::-;;;;;;5063:43:74;;696:13850:88;;;;;;;:::i;:::-;;;;4969:156:74;;696:13850:88;4941:198:74;;;;;696:13850:88;;-1:-1:-1;;;4941:198:74;;696:13850:88;;;4941:198:74;;696:13850:88;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;4941:198:74;;;;;;4273:172;-1:-1:-1;4925:285:74;;-1:-1:-1;;;5178:21:74;;696:13850:88;;4277:23:74;;-1:-1:-1;5178:21:74;4925:285;5289:16;;;;5307:21;;;696:13850:88;5289:16:74;;-1:-1:-1;;;;;696:13850:88;;;;5289:16:74;:::i;:::-;;696:13850:88;;;;;;;4941:198:74;;;;;696:13850:88;4941:198:74;;:::i;:::-;696:13850:88;4941:198:74;;;;4777:87;4748:18;;;696:13850:88;4846:18:74;696:13850:88;;4846:18:74;4507:91;4572:26;;;696:13850:88;4572:26:74;696:13850:88;;4572:26:74;4277:23;;;;;;;696:13850:88;4277:23:74;;;;;;:::i;:::-;;;;;696:13850:88;;;;;;-1:-1:-1;;696:13850:88;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1497:44:73;;1522:18;696:13850:88;1497:44:73;;696:13850:88;;;1497:44:73;696:13850:88;;;;;;1497:14:73;696:13850:88;1497:44:73;;;;;;696:13850:88;1497:44:73;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1497:44:73:-;;;;696:13850:88;1497:44:73;;;;;;:::i;:::-;;;696:13850:88;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1497:44:73;;;696:13850:88;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;;542:43:73;696:13850:88;;;;;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;13334:156;13371:16;696:13850;;13371:16;696:13850;;:::i;:::-;;;;;;;;;13371:16;;;;:::i;:::-;;1055:104:6;;13371:16:88;;;;;;:::i;:::-;13438:10;13334:156;;:::i;696:13850::-;;;;;;-1:-1:-1;;696:13850:88;;;;;1055:104:6;;696:13850:88;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;696:13850:88;;;;;;;;;;;;1055:104:6;;;696:13850:88;;;;-1:-1:-1;;;696:13850:88;;;;;;;;;;;;;;;;;-1:-1:-1;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;696:13850:88:-;;;;13978:37;696:13850;;;:::i;:::-;;;;;;-1:-1:-1;;696:13850:88;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;775:49:40;;;:89;;;;696:13850:88;;;;;;;775:89:40;-1:-1:-1;;;862:40:67;;-1:-1:-1;775:89:40;;;696:13850:88;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;;;-1:-1:-1;;696:13850:88;;;;:::o;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;696:13850:88;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;:::o;:::-;;;;-1:-1:-1;696:13850:88;;;;;-1:-1:-1;696:13850:88;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;:::o;:::-;3010:19;696:13850;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;:::o;:::-;;;1055:104:6;;696:13850:88;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;:::o;:::-;-1:-1:-1;;;;;696:13850:88;;;;;;-1:-1:-1;;696:13850:88;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;696:13850:88;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;696:13850:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;696:13850:88;;;;;;:::o;:::-;-1:-1:-1;;;;;696:13850:88;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1055:104:6;;696:13850:88;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;:::i;:::-;;;;1055:104:6;696:13850:88;1055:104:6;;696:13850:88;;;;;;;;:::i;:::-;;-1:-1:-1;;696:13850:88;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;:::o;:::-;;;;;-1:-1:-1;;;;;696:13850:88;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1055:104:6;;696:13850:88;;;;;;;;;;;;;;;;;;;;:::i;:::-;1055:104:6;;;;;696:13850:88;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;696:13850:88;;;;;1055:104:6;696:13850:88;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;696:13850:88;;;;;1055:104:6;696:13850:88;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;696:13850:88;;;;;1055:104:6;696:13850:88;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;696:13850:88;;;;;1055:104:6;696:13850:88;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;696:13850:88;;;;;1055:104:6;696:13850:88;:::i;:::-;;;;;;;:::i;:::-;1055:104:6;696:13850:88;1055:104:6;;696:13850:88;;;;;;;;:::i;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;696:13850:88;;-1:-1:-1;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;-1:-1:-1;696:13850:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;696:13850:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;696:13850:88;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;:::i;3336:267::-;3512:34;3336:267;3512:34;696:13850;;;3512:34;;;;;;:::i;:::-;696:13850;;3512:34;3581:14;;;;-1:-1:-1;;;;;696:13850:88;;;;3336:267::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;696:13850:88;;;;;;;;;;;;;4064:22:9;;;;4060:87;;696:13850:88;;;;;;;;;;;;;;4274:33:9;696:13850:88;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;696:13850:88;;3896:19:9;696:13850:88;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;696:13850:88;;;;3881:1:9;696:13850:88;;;;;3881:1:9;696:13850:88;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2051:2051:74;;-1:-1:-1;696:13850:88;;:::i;:::-;2221:30:74;696:13850:88;;:::i;:::-;-1:-1:-1;696:13850:88;;-1:-1:-1;;;2314:27:74;;;;;696:13850:88;;;2314:3:74;-1:-1:-1;;;;;696:13850:88;;-1:-1:-1;696:13850:88;2314:27:74;696:13850:88;;2314:27:74;;-1:-1:-1;;2314:27:74;;;2051:2051;-1:-1:-1;2310:219:74;;4410:24;;;;-1:-1:-1;2490:28:74;2314:27;696:13850:88;2314:27:74;-1:-1:-1;2490:28:74;2310:219;2425:26;;;;;696:13850:88;;;;;2543:32:74;;;2314:27;2543:32;;696:13850:88;-1:-1:-1;2543:32:74;2314:27;2543:32;;;;-1:-1:-1;;2543:32:74;;;2310:219;-1:-1:-1;2539:234:74;;4410:24;;;;-1:-1:-1;2729:33:74;2314:27;696:13850:88;2314:27:74;-1:-1:-1;2729:33:74;2539:234;2659:31;;;;;;2539:234;696:13850:88;2834:13:74;;696:13850:88;2851:18:74;;2834:35;;;2830:86;;2932:24;;;:::i;:::-;2931:25;2927:64;;3135:11;;;;3098:58;3135:11;;3098:58;:::i;:::-;3242:18;;;696:13850:88;;;;;3242:32:74;3238:65;;696:13850:88;;;;-1:-1:-1;;;3374:66:74;;696:13850:88;2314:27:74;3374:66;;696:13850:88;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;3135:11:74;696:13850:88;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;696:13850:88;2314:27:74;696:13850:88;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;3374:66:74;;;;696:13850:88;3374:66:74;;;;;;;-1:-1:-1;3374:66:74;;;2539:234;3373:67;;3369:112;;696:13850:88;;;;;:::i;:::-;;;;-1:-1:-1;696:13850:88;3660:47:74;;696:13850:88;;;;;;;:::i;:::-;;;;3566:160:74;;696:13850:88;3538:202:74;;;;;696:13850:88;;-1:-1:-1;;;3538:202:74;;696:13850:88;;2314:27:74;3538:202;;696:13850:88;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;3538:202:74;;;;;;2539:234;-1:-1:-1;3522:293:74;;-1:-1:-1;;;3779:25:74;;2314:27;696:13850:88;;;2314:27:74;5178:21;3779:25;3522:293;3913:11;696:13850:88;;3522:293:74;;;;;4011:61;;4184:792:88;;-1:-1:-1;;;;;696:13850:88;;4184:792;:::i;:::-;696:13850;;-1:-1:-1;;;;;696:13850:88;;4011:61:74;;2051:2051;:::o;3538:202::-;;;;;-1:-1:-1;3538:202:74;;:::i;:::-;-1:-1:-1;3538:202:74;;;;3369:112;3283:20;;;-1:-1:-1;3461:20:74;2314:27;-1:-1:-1;3461:20:74;3374:66;;;696:13850:88;3374:66:74;;696:13850:88;3374:66:74;;;;;;696:13850:88;3374:66:74;;;:::i;:::-;;;696:13850:88;;;;;;;:::i;:::-;3374:66:74;;;;;;-1:-1:-1;3374:66:74;;2543:32;;;;;;;-1:-1:-1;2543:32:74;;;;;;:::i;:::-;;;;;2314:27;;;;;;;-1:-1:-1;2314:27:74;;;;;;:::i;:::-;;;;;696:13850:88;;;;;;;:::i;:::-;;;;-1:-1:-1;696:13850:88;;;;;;;-1:-1:-1;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;11041:711;11252:18;1017:17:72;;;696:13850:88;1017:27:72;1013:55;;1085:27;;;:::i;:::-;11224:47:88;11220:65;;11328:79;11352:15;11452:36;11352:15;;;1017:17:72;696:13850:88;;;11328:79;;;;;;:::i;:::-;696:13850;1017:17:72;696:13850:88;;;11452:36;;;;;;:::i;:::-;11518:20;;;696:13850;11518:20;11542:23;;696:13850;-1:-1:-1;11518:47:88;:101;;;;11041:711;11518:154;;;11041:711;11518:227;;;11499:246;;11041:711;:::o;11518:227::-;1017:17:72;11698:14:88;;;;;;696:13850;;;;;11688:25;11727:17;;;1017::72;696:13850:88;;;;11717:28;11688:57;11041:711;:::o;11518:154::-;696:13850;;;;-1:-1:-1;;;;;696:13850:88;;;;;11635:37;;-1:-1:-1;11518:154:88;;:101;11581:38;;;;;;:::i;:::-;11518:101;;;11220:65;11273:12;;696:13850;11273:12;:::o;1013:55:72:-;1053:15;;;696:13850:88;1053:15:72;;696:13850:88;1053:15:72;637:632:62;759:17;-1:-1:-1;25444:17:69;-1:-1:-1;;;25444:17:69;;;25440:103;;637:632:62;25560:17:69;25569:8;26140:7;25560:17;;;25556:103;;637:632:62;25685:8:69;25676:17;;;25672:103;;637:632:62;25801:7:69;25792:16;;;25788:100;;637:632:62;25914:7:69;25905:16;;;25901:100;;637:632:62;26027:7:69;26018:16;;;26014:100;;637:632:62;26131:16:69;;26127:66;;637:632:62;26140:7:69;874:92:62;779:1;696:13850:88;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;696:13850:88;;:::i;:::-;;;;;;;874:92:62;;;979:247;-1:-1:-1;;696:13850:88;;-1:-1:-1;;;1033:111:62;;;;696:13850:88;1033:111:62;696:13850:88;1194:10:62;;1190:21;;26140:7:69;979:247:62;;;;1190:21;1206:5;;637:632;:::o;26127:66:69:-;26177:1;696:13850:88;;;;26127:66:69;;26014:100;26027:7;26098:1;696:13850:88;;;;26014:100:69;;;25901;25914:7;25985:1;696:13850:88;;;;25901:100:69;;;25788;25801:7;25872:1;696:13850:88;;;;25788:100:69;;;25672:103;25685:8;25758:2;696:13850:88;;;;25672:103:69;;;25556;25569:8;25642:2;696:13850:88;;;;25556:103:69;;;25440;-1:-1:-1;25526:2:69;;-1:-1:-1;;;;696:13850:88;;25440:103:69;;856:365:76;;;;3758:34:88;;696:13850;;3758:34;;;;;;;:::i;:::-;2875:16;;;;;;;696:13850;2902:17;;;;;;;696:13850;2875:51;2871:97;;2982:17;;;;;;696:13850;3010:19;;;;;;;696:13850;2982:54;2978:100;;3105:18;;;;;;696:13850;3134:20;;;;;;696:13850;3105:56;;;;;:127;;;856:365:76;3088:183:88;;;3878:20;;;696:13850;3878:24;3874:184;;856:365:76;5308:10:88;696:13850;5349:3;5324:16;;696:13850;;5320:27;;;;;3758:34;5414:161;5368:12;5537:20;5368:12;696:13850;5368:12;5421:19;696:13850;;;;;;5421:19;;:::i;5414:161::-;;;;;696:13850;;5414:161;;;5349:3;-1:-1:-1;5394:320:88;;5684:15;696:13850;5394:320;5732:8;5728:235;;696:13850;;5308:10;;5728:235;5808:16;;696:13850;;5910:20;;-1:-1:-1;;;;;696:13850:88;5808:19;;696:13850;;5808:19;:::i;5394:320::-;;;5414:161;;;;3758:34;5414:161;;;;;;;;;3758:34;5414:161;;;:::i;:::-;;;696:13850;;;;;;;:::i;:::-;5414:161;;;;;;;-1:-1:-1;5414:161:88;;5320:27;;;;;;;;;;;;;696:13850;6011:1441;6058:3;6032:17;;696:13850;;6028:28;;;;;-1:-1:-1;;;;;696:13850:88;6154:20;;696:13850;;6154:20;:::i;:::-;696:13850;;3758:34;6201:22;:19;;;:22;:::i;:::-;696:13850;6146:91;3878:20;696:13850;;;;;;;;6146:91;;5414:161;6146:91;;696:13850;6146:91;;;;;;;696:13850;6146:91;;;6058:3;-1:-1:-1;1070:10:76;-1:-1:-1;;;;;696:13850:88;;;6255:19;6251:250;;6543:17;;-1:-1:-1;;;;;696:13850:88;6543:20;;:17;;:20;:::i;:::-;696:13850;;6660:22;:19;;;:22;:::i;:::-;696:13850;6535:165;;;;;;3878:20;696:13850;-1:-1:-1;;;6535:165:88;;1070:10:76;5414:161:88;6535:165;;696:13850;5510:4;696:13850;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;6535:165:88;;;;;;6058:3;-1:-1:-1;6515:483:88;;696:13850;6943:22;696:13850;;6840:20;696:13850;;;;;;6840:17;;:20;:::i;6515:483::-;;;;;;;;696:13850;;;;;7087:20;:17;;;:20;:::i;:::-;696:13850;;3758:34;7134:22;:19;;;:22;:::i;:::-;696:13850;6146:91;3878:20;696:13850;;;;;;;;7079:91;;5414:161;7079:91;;696:13850;7079:91;;;;;;;696:13850;7079:91;;;6515:483;-1:-1:-1;5510:4:88;-1:-1:-1;;;;;696:13850:88;;;7188:27;7184:258;;696:13850;;6016:10;;;;;;;;;7184:258;7284:17;;696:13850;;7387:22;;-1:-1:-1;;;;;696:13850:88;7284:20;;696:13850;;7284:20;:::i;7079:91::-;;;3758:34;7079:91;;;;;;;;;3758:34;7079:91;;;:::i;:::-;;;696:13850;;;;;;;:::i;:::-;7079:91;;;;;;-1:-1:-1;7079:91:88;;6535:165;696:13850;6535:165;;;:::i;:::-;;;;6251:250;696:13850;6446:22;696:13850;;6343:20;696:13850;;;;;;6343:17;;:20;:::i;6146:91::-;;;3758:34;6146:91;;;;;;;;;3758:34;6146:91;;;:::i;:::-;;;696:13850;;;;;;;:::i;:::-;6146:91;;;;;;-1:-1:-1;6146:91:88;;6028:28;;;;;;;;;;;;7965:19;696:13850;7965:19;;7491:1499;7539:3;7512:18;;696:13850;;7508:29;;;;;7627:127;;3758:34;;-1:-1:-1;;;;;696:13850:88;7636:21;;696:13850;;7636:21;:::i;:::-;696:13850;;7717:23;:20;;;:23;:::i;7627:127::-;;;;;;;;;;696:13850;7627:127;;;7539:3;-1:-1:-1;7798:18:88;;-1:-1:-1;;;;;696:13850:88;7798:21;;:18;;:21;:::i;:::-;696:13850;;7920:23;:20;;;:23;:::i;:::-;696:13850;7965:22;:19;;;:22;:::i;:::-;696:13850;7789:240;;;;;;696:13850;;;;3878:20;696:13850;;;;;;;;;;7789:240;;5510:4;1070:10:76;5414:161:88;7789:240;;;:::i;:::-;;;;;;;;;7539:3;-1:-1:-1;7769:605:88;;696:13850;;8127:232;8319:22;696:13850;8274:23;696:13850;;8170:21;696:13850;;;;;;8170:18;;:21;:::i;7769:605::-;;;;;;;;8455:127;3758:34;696:13850;;;;;8464:21;:18;;;:21;:::i;:::-;696:13850;;8545:23;:20;;;:23;:::i;8455:127::-;;;;;;;;;;696:13850;8455:127;;;7769:605;8684:19;:22;:19;;;:22;:::i;:::-;696:13850;;;;;;;;8653:53;8649:331;;696:13850;;7496:10;;;;;;;8649:331;696:13850;8733:232;8925:22;696:13850;8880:23;696:13850;;8776:21;696:13850;;;;;;;8776:18;;:21;:::i;696:13850::-;;;;;;;5414:161;696:13850;6146:91;696:13850;;8455:127;;;3758:34;8455:127;;;;;;;;;696:13850;8455:127;;;:::i;:::-;;;696:13850;;;;;8455:127;;;;;;-1:-1:-1;8455:127:88;;7789:240;696:13850;7789:240;;;:::i;:::-;;;;7627:127;;;3758:34;7627:127;;;;;;;;;696:13850;7627:127;;;:::i;:::-;;;696:13850;;;;;7627:127;;;;;;-1:-1:-1;7627:127:88;;7508:29;;;;;;;;;;-1:-1:-1;;;;;3878:20:88;696:13850;;;;;:::i;:::-;;;;;;;;;;;;3758:34;1914:299:73;;696:13850:88;;3878:20;1914:299:73;;696:13850:88;;2875:16;1914:299:73;;696:13850:88;2902:17;1914:299:73;;696:13850:88;;2982:17;1914:299:73;;696:13850:88;3758:34;3878:20;696:13850;;;;:::i;:::-;1868:18:73;696:13850:88;;1819:413:73;;;696:13850:88;;;3878:20;696:13850;;;;;;;;1791:455:73;;;5414:161:88;1791:455:73;;696:13850:88;;6146:91;696:13850;;;;3878:20;696:13850;;;;;;;;;;;;;;;;-1:-1:-1;;;;;696:13850:88;;;;;;;;;3878:20;696:13850;;;;;;;;;2875:16;696:13850;;;;;;;2982:17;696:13850;2902:17;696:13850;;;3010:19;696:13850;;;;;;;;;:::i;:::-;;;;;;;;1791:455:73;696:13850:88;;1791:3:73;-1:-1:-1;;;;;696:13850:88;1791:455:73;;;;;;;696:13850:88;1791:455:73;;;7491:1499:88;1102:55:76;;5771:26:74;696:13850:88;5771:26:74;;856:365:76:o;1791:455:73:-;;;;3758:34:88;1791:455:73;;3758:34:88;1791:455:73;;;;;;3758:34:88;1791:455:73;;;:::i;:::-;;;696:13850:88;;;;;1791:455:73;;;;;;;-1:-1:-1;1791:455:73;;3874:184:88;3922:9;;:32;3918:130;3874:184;3918:130;3981:52;;;696:13850;3981:52;;696:13850;3922:9;696:13850;;;;3981:52;3088:183;2947:21;;;696:13850;3250:21;;696:13850;3250:21;3105:127;3206:19;;;;;;696:13850;3177:55;;3105:127;;;6040:128:9;6109:4;-1:-1:-1;;;;;696:13850:88;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1174:235:73;1365:20;;696:13850:88;;;;;;;;;;;;;1397:4:73;1365:37;1174:235;:::o;613:261:72:-;-1:-1:-1;;;;;353:25:72;;;696:13850:88;;353:30:72;;;:90;;;;613:261;722:55;;;570:25;;696:13850:88;-1:-1:-1;;;;;696:13850:88;787:58:72;;863:4;613:261;:::o;787:58::-;825:20;;;-1:-1:-1;825:20:72;;-1:-1:-1;825:20:72;722:55;760:17;;;-1:-1:-1;760:17:72;;-1:-1:-1;760:17:72;353:90;428:15;;;-1:-1:-1;399:44:72;353:90;;;4184:792:88;4388:74;4184:792;;;;4388:74;696:13850;;;4388:74;;;;;;:::i;:::-;4533:20;;;;696:13850;;4533:24;;4529:269;;4184:792;-1:-1:-1;;9316:17:88;;;9185:16;;;-1:-1:-1;9210:3:88;9185:16;;696:13850;;9181:27;;;;;9229:12;4388:74;9275:62;-1:-1:-1;9229:12:88;9282:19;696:13850;;;;;;9282:19;;:::i;:::-;696:13850;;9316:20;:17;;;:20;:::i;:::-;696:13850;4533:20;696:13850;-1:-1:-1;;;9275:62:88;;-1:-1:-1;;;;;696:13850:88;;9275:62;;;696:13850;;;;;;;;;;;;;;;;;;;;;9275:62;;;;;;-1:-1:-1;9275:62:88;;;9210:3;696:13850;;-1:-1:-1;9255:221:88;;9446:15;-1:-1:-1;9255:221:88;9494:8;9490:205;;9255:221;696:13850;9169:10;;9490:205;696:13850;;;;;9577:19;:16;;;:19;:::i;:::-;696:13850;;9642:20;:17;;;:20;:::i;:::-;696:13850;;4533:20;696:13850;;;;9527:153;4388:74;696:13850;;;;;;;9527:153;;9490:205;;9255:221;;;9275:62;;;4388:74;9275:62;;;;;;;;;4388:74;9275:62;;;:::i;:::-;;;696:13850;;;;;;;;:::i;:::-;9275:62;;;;;;-1:-1:-1;9275:62:88;;9181:27;-1:-1:-1;;;9786:17:88;;;;;9974:19;;;;-1:-1:-1;;9812:3:88;9786:17;;696:13850;;9782:28;;;;;-1:-1:-1;;;;;696:13850:88;9859:20;;696:13850;;9859:20;:::i;:::-;696:13850;;9974:19;:22;:19;;;:22;:::i;:::-;696:13850;9851:163;;;;;4533:20;696:13850;-1:-1:-1;;;9851:163:88;;9923:4;9275:62;9851:163;;696:13850;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;-1:-1:-1;;696:13850:88;;;;;;-1:-1:-1;;9851:163:88;;;;;;9812:3;-1:-1:-1;9831:451:88;;696:13850;;;;;10161:20;:17;;;:20;:::i;:::-;696:13850;;10227:22;:19;;;:22;:::i;:::-;696:13850;;4533:20;696:13850;;;;10110:157;4388:74;696:13850;;;;;;;10110:157;;9831:451;696:13850;9770:10;;9831:451;;;9851:163;-1:-1:-1;9851:163:88;;;:::i;:::-;;;;9782:28;-1:-1:-1;9782:28:88;;-1:-1:-1;9782:28:88;10614:19;;;;-1:-1:-1;10569:20:88;;;;-1:-1:-1;696:13850:88;10374:18;-1:-1:-1;10401:3:88;10374:18;;696:13850;;10370:29;;;;;-1:-1:-1;;;;;696:13850:88;10449:21;;696:13850;;10449:21;:::i;:::-;696:13850;;10569:20;:23;:20;;;:23;:::i;:::-;696:13850;10614:19;:22;:19;;;:22;:::i;:::-;696:13850;10440:238;;;;;;696:13850;;10440:238;696:13850;-1:-1:-1;696:13850:88;;;4533:20;696:13850;;;;;;;;;;;10440:238;;9923:4;9275:62;10440:238;;;:::i;:::-;;;;;;;;;10401:3;-1:-1:-1;10420:573:88;;696:13850;;;;;10826:21;:18;;;:21;:::i;:::-;696:13850;;10893:23;:20;;;:23;:::i;:::-;696:13850;10938:19;:22;:19;;;:22;:::i;:::-;696:13850;4533:20;696:13850;;;;4388:74;696:13850;;;10774:204;4533:20;696:13850;;;;;;;10774:204;;10420:573;696:13850;10358:10;;10420:573;;;10440:238;-1:-1:-1;10440:238:88;;;:::i;:::-;;;;10370:29;;;;;;;;4533:20;696:13850;;4388:74;696:13850;;:::i;:::-;-1:-1:-1;696:13850:88;;4184:792;:::o;4529:269::-;-1:-1:-1;696:13850:88;;;;;;;;;;4592:79;;;;696:13850;;;;;;;;:::i;:::-;;;4533:20;696:13850;;;;:::i;:::-;;;-1:-1:-1;4388:74:88;696:13850;;;;;4529:269;4685:103;4388:74;4722:51;696:13850;;4533:20;696:13850;;;;4722:51;4685:103;;4529:269;;696:13850;;;;;;;;;;;;;;;;;;:::o;11758:1376::-;11935:19;;;;;;696:13850;11935:19;11964:18;;;;;696:13850;-1:-1:-1;11931:84:88;;696:13850;12073:3;12046:18;;696:13850;12042:29;;;;;12113:19;;-1:-1:-1;;;;;696:13850:88;12113:22;;:19;;:22;:::i;:::-;696:13850;;;;;;;12139:21;:18;;;:21;:::i;:::-;696:13850;;12113:47;;;:115;;;12073:3;12092:163;;696:13850;;12030:10;;12092:163;12243:12;;;;;696:13850;12243:12;:::o;12113:115::-;12180:20;:23;:20;;;;;:23;:::i;:::-;696:13850;12206:22;:19;12180:20;12206:19;;;:22;:::i;:::-;696:13850;-1:-1:-1;12113:115:88;;12042:29;;;;;12305:20;;;;;;696:13850;12305:20;12335:19;;;;;696:13850;-1:-1:-1;12301:86:88;;696:13850;12446:3;12418:19;;696:13850;12414:30;;;;;12486:20;;-1:-1:-1;;;;;696:13850:88;12486:23;;:20;;:23;:::i;:::-;696:13850;;;;;;;12513:22;:19;;;:22;:::i;:::-;696:13850;;12486:49;;;:122;;;12446:3;12465:170;;696:13850;;12402:10;;12486:122;12555:22;:25;:22;;;;;:25;:::i;:::-;696:13850;12584:24;:21;12555:22;12584:21;;;:24;:::i;:::-;696:13850;12555:53;;12486:122;;12414:30;;;;;12686:21;;;;;;696:13850;12717:20;12686:21;12717:20;;;;;696:13850;-1:-1:-1;12682:88:88;;696:13850;12830:3;12801:20;;696:13850;12797:31;;;;;12870:21;;-1:-1:-1;;;;;696:13850:88;12870:24;;:21;;:24;:::i;:::-;696:13850;;;;;;;12898:23;:20;;;:23;:::i;:::-;696:13850;;12870:51;;;:126;;;12830:3;12870:198;;;;12830:3;12849:246;;696:13850;;12785:10;;12870:198;13016:22;:25;:22;;;;;:25;:::i;:::-;696:13850;13044:24;:21;13016:22;13044:21;;;:24;:::i;:::-;696:13850;-1:-1:-1;12870:198:88;;:126;12941:23;:26;:23;;;;;:26;:::i;:::-;696:13850;12971:25;:22;12941:23;12971:22;;;:25;:::i;:::-;696:13850;12941:55;;12870:126;;12797:31;;;;;;696:13850;11758:1376;:::o;12682:88::-;12758:12;;;;696:13850;12758:12;:::o;696:13850::-;-1:-1:-1;;;;;696:13850:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;696:13850:88;;;;;;;:::o",
    linkReferences: {},
    immutableReferences: {
      "2532": [
        {
          start: 5222,
          length: 32,
        },
      ],
      "2534": [
        {
          start: 5265,
          length: 32,
        },
      ],
      "2536": [
        {
          start: 5308,
          length: 32,
        },
      ],
      "3008": [
        {
          start: 11823,
          length: 32,
        },
      ],
      "52557": [
        {
          start: 4726,
          length: 32,
        },
      ],
      "52560": [
        {
          start: 1357,
          length: 32,
        },
        {
          start: 3703,
          length: 32,
        },
        {
          start: 4189,
          length: 32,
        },
        {
          start: 8414,
          length: 32,
        },
        {
          start: 11611,
          length: 32,
        },
      ],
      "52562": [
        {
          start: 1421,
          length: 32,
        },
        {
          start: 3530,
          length: 32,
        },
        {
          start: 4282,
          length: 32,
        },
        {
          start: 4676,
          length: 32,
        },
        {
          start: 5053,
          length: 32,
        },
        {
          start: 8574,
          length: 32,
        },
        {
          start: 9443,
          length: 32,
        },
        {
          start: 11438,
          length: 32,
        },
      ],
    },
  },
  methodIdentifiers: {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "collectEscrow(bytes32,bytes32)": "2c713cd9",
    "collectEscrowRaw(bytes32,bytes32)": "891d9ea8",
    "decodeObligationData(bytes)": "c93844be",
    "doObligation((address,bytes,uint256,address[],uint256[],address[],uint256[],address[],uint256[],uint256[]),uint64)":
      "55b0769b",
    "doObligationFor((address,bytes,uint256,address[],uint256[],address[],uint256[],address[],uint256[],uint256[]),uint64,address)":
      "cf84e82c",
    "doObligationRaw(bytes,uint64,bytes32)": "b3b902d4",
    "extractArbiterAndDemand(bytes)": "8371ef59",
    "getObligationData(bytes32)": "c6ec5070",
    "getSchema()": "6b122fe0",
    "isPayable()": "ce46e046",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": "bc197c81",
    "onERC1155Received(address,address,uint256,uint256,bytes)": "f23a6e61",
    "reclaimExpired(bytes32)": "7d2c2931",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "supportsInterface(bytes4)": "01ffc9a7",
    "version()": "54fd4d50",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IEAS","name":"_eas","type":"address"},{"internalType":"contract ISchemaRegistry","name":"_schemaRegistry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"ArrayLengthMismatch","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"AttestationNotFound","type":"error"},{"inputs":[],"name":"AttestationRevoked","type":"error"},{"inputs":[],"name":"DeadlineExpired","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC1155TransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC20TransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721TransferFailed","type":"error"},{"inputs":[{"internalType":"uint256","name":"expected","type":"uint256"},{"internalType":"uint256","name":"received","type":"uint256"}],"name":"InsufficientPayment","type":"error"},{"inputs":[],"name":"InsufficientValue","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"InvalidEscrowAttestation","type":"error"},{"inputs":[],"name":"InvalidFulfillment","type":"error"},{"inputs":[],"name":"InvalidLength","type":"error"},{"inputs":[],"name":"InvalidSchema","type":"error"},{"inputs":[],"name":"NotFromThisAttester","type":"error"},{"inputs":[],"name":"NotPayable","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"RevocationFailed","type":"error"},{"inputs":[],"name":"UnauthorizedCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC1155TransferFailedOnRelease","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC20TransferFailedOnRelease","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721TransferFailedOnRelease","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"fulfillment","type":"bytes32"},{"indexed":true,"internalType":"address","name":"fulfiller","type":"address"}],"name":"EscrowCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"EscrowMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NativeTokenTransferFailed","type":"event"},{"inputs":[],"name":"ATTESTATION_SCHEMA","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"attest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"escrow","type":"bytes32"},{"internalType":"bytes32","name":"fulfillment","type":"bytes32"}],"name":"collectEscrow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_escrow","type":"bytes32"},{"internalType":"bytes32","name":"_fulfillment","type":"bytes32"}],"name":"collectEscrowRaw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"uint256","name":"nativeAmount","type":"uint256"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"uint256","name":"nativeAmount","type":"uint256"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"}],"name":"doObligation","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"uint256","name":"nativeAmount","type":"uint256"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"recipient","type":"address"}],"name":"doObligationFor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"extractArbiterAndDemand","outputs":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"uint256","name":"nativeAmount","type":"uint256"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSchema","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"internalType":"struct SchemaRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiAttest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiRevoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"reclaimExpired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"revoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}],"devdoc":{"kind":"dev","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The new attestation."},"returns":{"_0":"Whether the attestation is valid."}},"isPayable()":{"returns":{"_0":"Whether the resolver supports ETH transfers."}},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The new attestations.","values":"Explicit ETH amounts which were sent with each attestation."},"returns":{"_0":"Whether all the attestations are valid."}},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The existing attestations to be revoked.","values":"Explicit ETH amounts which were sent with each revocation."},"returns":{"_0":"Whether the attestations can be revoked."}},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The existing attestation to be revoked."},"returns":{"_0":"Whether the attestation can be revoked."}},"supportsInterface(bytes4)":{"details":"See {IERC165-supportsInterface}."},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"version":1},"userdoc":{"kind":"user","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation and verifies whether it\'s valid."},"isPayable()":{"notice":"Checks if the resolver can be sent ETH."},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes multiple attestations and verifies whether they are valid."},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes revocation of multiple attestation and verifies they can be revoked."},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation revocation and verifies if it can be revoked."},"version()":{"notice":"Returns the full semver contract version."}},"version":1}},"settings":{"compilationTarget":{"src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol":"TokenBundleEscrowObligation"},"evmVersion":"prague","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",":@erc8004/=lib/trustless-agents-erc-ri/src/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/",":reference/=lib/trustless-agents-erc-ri/lib/reference/",":trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol":{"keccak256":"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7","license":"MIT","urls":["bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746","dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol":{"keccak256":"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7","license":"MIT","urls":["bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce","dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol":{"keccak256":"0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50","license":"MIT","urls":["bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd","dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4","license":"MIT","urls":["bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009","dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"]},"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol":{"keccak256":"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de","license":"MIT","urls":["bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827","dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol":{"keccak256":"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e","license":"MIT","urls":["bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9","dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf"]},"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol":{"keccak256":"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c","license":"MIT","urls":["bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e","dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd","license":"UNLICENSED","urls":["bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61","dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV"]},"src/BaseAttester.sol":{"keccak256":"0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa","license":"UNLICENSED","urls":["bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084","dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa"]},"src/BaseEscrowObligation.sol":{"keccak256":"0x1078f885a4f746bb53d552d04921c623069ed9bf91aaa822d3560fe1c5fce08f","license":"UNLICENSED","urls":["bzz-raw://fcbced687a208e363e3fea2699172e64fcca07fa19f59c175ca697b7d8cba911","dweb:/ipfs/QmYfzMxsLXN4QAsnGDtN5oeV5oDfAnEm2xF8fwB92heUAn"]},"src/BaseObligation.sol":{"keccak256":"0x480fa485da7ad129249d0f90c29fd54aa9f0c4b572b235ba98a4e05a307e14ea","license":"UNLICENSED","urls":["bzz-raw://03c7daf95a8c62b0d2d31215491144348a677ab2a9c150d7b485f49b55582b98","dweb:/ipfs/QmZPPDF64rZZhUqG7HCrCrYvs5VDXon9ofwRFhXdB9gJCn"]},"src/IArbiter.sol":{"keccak256":"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629","license":"UNLICENSED","urls":["bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9","dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"]},"src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol":{"keccak256":"0x30bb3d99a4fe41803bfcc9a728c677c3d57ef73a784c44f867ae32fc9c89d396","license":"UNLICENSED","urls":["bzz-raw://f3b4a899e45e1131af48230242150b58a740eae8e80dd004acc7a1dfb45f1da8","dweb:/ipfs/QmX3ji9e4E3LfR6MUtvMoLswn6TPvFoK3FCsH5Kwpw2SZg"]}},"version":1}',
  metadata: {
    compiler: {
      version: "0.8.27+commit.40a35a09",
    },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [
            {
              internalType: "contract IEAS",
              name: "_eas",
              type: "address",
            },
            {
              internalType: "contract ISchemaRegistry",
              name: "_schemaRegistry",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          type: "error",
          name: "AccessDenied",
        },
        {
          inputs: [],
          type: "error",
          name: "ArrayLengthMismatch",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "attestationId",
              type: "bytes32",
            },
          ],
          type: "error",
          name: "AttestationNotFound",
        },
        {
          inputs: [],
          type: "error",
          name: "AttestationRevoked",
        },
        {
          inputs: [],
          type: "error",
          name: "DeadlineExpired",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          type: "error",
          name: "ERC1155TransferFailed",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          type: "error",
          name: "ERC20TransferFailed",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
          ],
          type: "error",
          name: "ERC721TransferFailed",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "expected",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "received",
              type: "uint256",
            },
          ],
          type: "error",
          name: "InsufficientPayment",
        },
        {
          inputs: [],
          type: "error",
          name: "InsufficientValue",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidEAS",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidEscrowAttestation",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidFulfillment",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidLength",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidSchema",
        },
        {
          inputs: [],
          type: "error",
          name: "NotFromThisAttester",
        },
        {
          inputs: [],
          type: "error",
          name: "NotPayable",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "attestationId",
              type: "bytes32",
            },
          ],
          type: "error",
          name: "RevocationFailed",
        },
        {
          inputs: [],
          type: "error",
          name: "UnauthorizedCall",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
              indexed: true,
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
              indexed: false,
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
              indexed: false,
            },
          ],
          type: "event",
          name: "ERC1155TransferFailedOnRelease",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
              indexed: true,
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
              indexed: false,
            },
          ],
          type: "event",
          name: "ERC20TransferFailedOnRelease",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
              indexed: true,
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
              indexed: true,
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
              indexed: false,
            },
          ],
          type: "event",
          name: "ERC721TransferFailedOnRelease",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "escrow",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "bytes32",
              name: "fulfillment",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "address",
              name: "fulfiller",
              type: "address",
              indexed: true,
            },
          ],
          type: "event",
          name: "EscrowCollected",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "escrow",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "address",
              name: "buyer",
              type: "address",
              indexed: true,
            },
          ],
          type: "event",
          name: "EscrowMade",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
              indexed: true,
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
              indexed: false,
            },
          ],
          type: "event",
          name: "NativeTokenTransferFailed",
          anonymous: false,
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "ATTESTATION_SCHEMA",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "attest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "obligation",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "checkObligation",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "escrow",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "fulfillment",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "collectEscrow",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_escrow",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "_fulfillment",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "collectEscrowRaw",
          outputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          stateMutability: "pure",
          type: "function",
          name: "decodeObligationData",
          outputs: [
            {
              internalType: "struct TokenBundleEscrowObligation.ObligationData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "nativeAmount",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "erc20Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc20Amounts",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc721Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc721TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc1155Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155Amounts",
                  type: "uint256[]",
                },
              ],
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct TokenBundleEscrowObligation.ObligationData",
              name: "data",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "nativeAmount",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "erc20Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc20Amounts",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc721Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc721TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc1155Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155Amounts",
                  type: "uint256[]",
                },
              ],
            },
            {
              internalType: "uint64",
              name: "expirationTime",
              type: "uint64",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "doObligation",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct TokenBundleEscrowObligation.ObligationData",
              name: "data",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "nativeAmount",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "erc20Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc20Amounts",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc721Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc721TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc1155Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155Amounts",
                  type: "uint256[]",
                },
              ],
            },
            {
              internalType: "uint64",
              name: "expirationTime",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "doObligationFor",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              internalType: "uint64",
              name: "expirationTime",
              type: "uint64",
            },
            {
              internalType: "bytes32",
              name: "refUID",
              type: "bytes32",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "doObligationRaw",
          outputs: [
            {
              internalType: "bytes32",
              name: "uid_",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          stateMutability: "pure",
          type: "function",
          name: "extractArbiterAndDemand",
          outputs: [
            {
              internalType: "address",
              name: "arbiter",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "getObligationData",
          outputs: [
            {
              internalType: "struct TokenBundleEscrowObligation.ObligationData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "nativeAmount",
                  type: "uint256",
                },
                {
                  internalType: "address[]",
                  name: "erc20Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc20Amounts",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc721Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc721TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "address[]",
                  name: "erc1155Tokens",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155TokenIds",
                  type: "uint256[]",
                },
                {
                  internalType: "uint256[]",
                  name: "erc1155Amounts",
                  type: "uint256[]",
                },
              ],
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "getSchema",
          outputs: [
            {
              internalType: "struct SchemaRecord",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "contract ISchemaResolver",
                  name: "resolver",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "schema",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "pure",
          type: "function",
          name: "isPayable",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiAttest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiRevoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "onERC1155BatchReceived",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "onERC1155Received",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "reclaimExpired",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "revoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "version",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "payable",
          type: "receive",
        },
      ],
      devdoc: {
        kind: "dev",
        methods: {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            params: {
              attestation: "The new attestation.",
            },
            returns: {
              _0: "Whether the attestation is valid.",
            },
          },
          "isPayable()": {
            returns: {
              _0: "Whether the resolver supports ETH transfers.",
            },
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            params: {
              attestations: "The new attestations.",
              values: "Explicit ETH amounts which were sent with each attestation.",
            },
            returns: {
              _0: "Whether all the attestations are valid.",
            },
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            params: {
              attestations: "The existing attestations to be revoked.",
              values: "Explicit ETH amounts which were sent with each revocation.",
            },
            returns: {
              _0: "Whether the attestations can be revoked.",
            },
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            params: {
              attestation: "The existing attestation to be revoked.",
            },
            returns: {
              _0: "Whether the attestation can be revoked.",
            },
          },
          "supportsInterface(bytes4)": {
            details: "See {IERC165-supportsInterface}.",
          },
          "version()": {
            returns: {
              _0: "Semver contract version as a string.",
            },
          },
        },
        version: 1,
      },
      userdoc: {
        kind: "user",
        methods: {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            notice: "Processes an attestation and verifies whether it's valid.",
          },
          "isPayable()": {
            notice: "Checks if the resolver can be sent ETH.",
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            notice: "Processes multiple attestations and verifies whether they are valid.",
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            notice: "Processes revocation of multiple attestation and verifies they can be revoked.",
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            notice: "Processes an attestation revocation and verifies if it can be revoked.",
          },
          "version()": {
            notice: "Returns the full semver contract version.",
          },
        },
        version: 1,
      },
    },
    settings: {
      remappings: [
        "@eas/=lib/eas-contracts/contracts/",
        "@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",
        "@erc8004/=lib/trustless-agents-erc-ri/src/",
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
        "reference/=lib/trustless-agents-erc-ri/lib/reference/",
        "trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/",
      ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: "ipfs",
      },
      compilationTarget: {
        "src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol": "TokenBundleEscrowObligation",
      },
      evmVersion: "prague",
      libraries: {},
      viaIR: true,
    },
    sources: {
      "lib/eas-contracts/contracts/Common.sol": {
        keccak256: "0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685",
        urls: [
          "bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d",
          "dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/IEAS.sol": {
        keccak256: "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        urls: [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        keccak256: "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        urls: [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        keccak256: "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        urls: [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/Semver.sol": {
        keccak256: "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        urls: [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        keccak256: "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        urls: [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        keccak256: "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        urls: [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol": {
        keccak256: "0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7",
        urls: [
          "bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746",
          "dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol": {
        keccak256: "0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7",
        urls: [
          "bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce",
          "dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol": {
        keccak256: "0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50",
        urls: [
          "bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd",
          "dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        keccak256: "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        urls: [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol": {
        keccak256: "0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de",
        urls: [
          "bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827",
          "dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        keccak256: "0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c",
        urls: [
          "bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4",
          "dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        keccak256: "0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2",
        urls: [
          "bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440",
          "dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol": {
        keccak256: "0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e",
        urls: [
          "bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9",
          "dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
        keccak256: "0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c",
        urls: [
          "bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e",
          "dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        keccak256: "0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c",
        urls: [
          "bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966",
          "dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        keccak256: "0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481",
        urls: [
          "bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb",
          "dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        keccak256: "0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0",
        urls: [
          "bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426",
          "dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY",
        ],
        license: "MIT",
      },
      "src/ArbiterUtils.sol": {
        keccak256: "0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd",
        urls: [
          "bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61",
          "dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV",
        ],
        license: "UNLICENSED",
      },
      "src/BaseAttester.sol": {
        keccak256: "0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa",
        urls: [
          "bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084",
          "dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa",
        ],
        license: "UNLICENSED",
      },
      "src/BaseEscrowObligation.sol": {
        keccak256: "0x1078f885a4f746bb53d552d04921c623069ed9bf91aaa822d3560fe1c5fce08f",
        urls: [
          "bzz-raw://fcbced687a208e363e3fea2699172e64fcca07fa19f59c175ca697b7d8cba911",
          "dweb:/ipfs/QmYfzMxsLXN4QAsnGDtN5oeV5oDfAnEm2xF8fwB92heUAn",
        ],
        license: "UNLICENSED",
      },
      "src/BaseObligation.sol": {
        keccak256: "0x480fa485da7ad129249d0f90c29fd54aa9f0c4b572b235ba98a4e05a307e14ea",
        urls: [
          "bzz-raw://03c7daf95a8c62b0d2d31215491144348a677ab2a9c150d7b485f49b55582b98",
          "dweb:/ipfs/QmZPPDF64rZZhUqG7HCrCrYvs5VDXon9ofwRFhXdB9gJCn",
        ],
        license: "UNLICENSED",
      },
      "src/IArbiter.sol": {
        keccak256: "0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629",
        urls: [
          "bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9",
          "dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv",
        ],
        license: "UNLICENSED",
      },
      "src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol": {
        keccak256: "0x30bb3d99a4fe41803bfcc9a728c677c3d57ef73a784c44f867ae32fc9c89d396",
        urls: [
          "bzz-raw://f3b4a899e45e1131af48230242150b58a740eae8e80dd004acc7a1dfb45f1da8",
          "dweb:/ipfs/QmX3ji9e4E3LfR6MUtvMoLswn6TPvFoK3FCsH5Kwpw2SZg",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 88,
} as const;
