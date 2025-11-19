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
      stateMutability: "nonpayable",
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
          name: "payer",
          type: "address",
          internalType: "address",
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
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "doObligationForRaw",
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
          name: "payer",
          type: "address",
          internalType: "address",
        },
        {
          name: "recipient",
          type: "address",
          internalType: "address",
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
      stateMutability: "nonpayable",
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
      stateMutability: "nonpayable",
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
      "0x61016080604052346102a657604081612da1803803809161002082856102e0565b8339810103126102a65780516001600160a01b038116918282036102a65760200151916001600160a01b0383168084036102a65760405161010081016001600160401b038111828210176102cc5760405260cc815260208101927f6164647265737320617262697465722c2062797465732064656d616e642c206184527f6464726573735b5d206572633230546f6b656e732c2075696e743235365b5d2060408301527f6572633230416d6f756e74732c20616464726573735b5d20657263373231546f60608301527f6b656e732c2075696e743235365b5d20657263373231546f6b656e4964732c2060808301527f616464726573735b5d2065726331313535546f6b656e732c2075696e7432353660a08301527f5b5d2065726331313535546f6b656e4964732c2075696e743235365b5d20657260c08301526b6331313535416d6f756e747360a01b60e08301526001608052600360a0525f60c052156102bd576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af19081156102b2575f9161027c575b5061014052604051612a9d9081610304823960805181610bc8015260a05181610bf3015260c05181610c1e015260e0518161245c01526101005181610a4a0152610120518181816106060152818161091501528181611653015261223901526101405181818161064601528181610a1801528181610b860152818161183201528181611cb9015261218c0152f35b90506020813d6020116102aa575b81610297602093836102e0565b810103126102a657515f6101ee565b5f80fd5b3d915061028a565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102cc5760405256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c90816301ffc9a714610cb4575080632c713cd914610c9757806354fd4d5014610ba95780635bf2f20d14610b6f5780636b122fe0146109d95780637d2c2931146108dd5780638371ef591461087f57806388e5b2d914610832578063891d9ea81461085157806391db0b7e14610832578063b3b902d4146107e7578063bc197c8114610752578063bca73d64146106c2578063c6ec5070146105c7578063c93844be14610417578063cd181c4914610337578063ce46e0461461031d578063e49617e114610302578063e60c350514610302578063e6c9714d146101e0578063f0ffa185146101805763f23a6e6114610127575f61000f565b3461017c5760a036600319011261017c57610140610f2a565b50610149610f40565b506084356001600160401b03811161017c57610169903690600401610e35565b5060405163f23a6e6160e01b8152602090f35b5f80fd5b3461017c5760a036600319011261017c576004356001600160401b03811161017c576101d86101b56020923690600401610ed3565b6101bd610f00565b6101c5610f56565b906101ce610f6c565b9260843594611d80565b604051908152f35b3461017c57606036600319011261017c576004356001600160401b03811161017c57610140600319823603011261017c576040519061021e82610d8c565b806004013582526024810135602083015261023b60448201610f16565b604083015261024c60648201610f16565b606083015261025d60848201610f16565b608083015260a481013560a083015261027860c48201610f82565b60c083015261028960e48201610f82565b60e0830152610104810135801515810361017c57610100830152610124810135906001600160401b03821161017c5760046102c79236920101610e35565b6101208201526024356001600160401b03811161017c576020916102f26102f8923690600401610e35565b90611cb7565b6040519015158152f35b60206102f86103103661115a565b61031861245a565b61249b565b3461017c575f36600319011261017c5760206040515f8152f35b3461017c57604036600319011261017c576004356001600160401b03811161017c57610120600319823603011261017c5760206103bb9161038e61039c61037c610f00565b92604051928391600401868301611a58565b03601f198101835282610dc3565b60405163f0ffa18560e01b815293849283923391829160048601611bcc565b03815f305af1801561040c575f906103d9575b602090604051908152f35b506020813d602011610404575b816103f360209383610dc3565b8101031261017c57602090516103ce565b3d91506103e6565b6040513d5f823e3d90fd5b3461017c57602036600319011261017c576004356001600160401b03811161017c57610447903690600401610ed3565b61044f611c0f565b5081019060208183031261017c578035906001600160401b03821161017c57016101208183031261017c576040519061048782610d70565b61049081610f82565b825260208101356001600160401b03811161017c57836104b1918301610e35565b602083015260408101356001600160401b03811161017c57836104d5918301611c52565b604083015260608101356001600160401b03811161017c57836104f9918301610fad565b606083015260808101356001600160401b03811161017c578361051d918301611c52565b608083015260a08101356001600160401b03811161017c5783610541918301610fad565b60a083015260c08101356001600160401b03811161017c5783610565918301611c52565b60c083015260e08101356001600160401b03811161017c5783610589918301610fad565b60e0830152610100810135926001600160401b03841161017c576105c3936105b19201610fad565b61010082015260405191829182611079565b0390f35b3461017c57602036600319011261017c576105e0611c0f565b506105e96111d1565b506040516328c44a9960e21b815260048035908201525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa90811561040c575f916106a0575b5060208101517f000000000000000000000000000000000000000000000000000000000000000003610691576106856101206105c3920151602080825183010191016113fa565b60405191829182611079565b635527981560e11b5f5260045ffd5b6106bc91503d805f833e6106b48183610dc3565b81019061125d565b8161063e565b3461017c57608036600319011261017c576004356001600160401b03811161017c57610120600319823603011261017c5760206106fd610f00565b6107296103bb61070b610f56565b94610737610717610f6c565b91604051948591600401888301611a58565b03601f198101855284610dc3565b60405163f0ffa18560e01b8152958694859460048601611bcc565b3461017c5760a036600319011261017c5761076b610f2a565b50610774610f40565b506044356001600160401b03811161017c57610794903690600401610fad565b506064356001600160401b03811161017c576107b4903690600401610fad565b506084356001600160401b03811161017c576107d4903690600401610e35565b5060405163bc197c8160e01b8152602090f35b3461017c57606036600319011261017c576004356001600160401b03811161017c576101d861081c6020923690600401610ed3565b610824610f00565b916044359233923392611d80565b60206102f861084036610e83565b9261084c92919261245a565b611585565b3461017c576105c361086b61086536610d07565b90611629565b604051918291602083526020830190610d1d565b3461017c57602036600319011261017c576004356001600160401b03811161017c576108b26108b7913690600401610e35565b61155c565b604080516001600160a01b0390931683526020830181905282916105c391830190610d1d565b3461017c57602036600319011261017c576004356108f96111d1565b506040516328c44a9960e21b8152600481018290525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa5f91816109bd575b5061095f57506301fb6dd160e01b5f5260045260245ffd5b6001600160401b0360608201511642106109ae578061099e6101206109a39301519160c060018060a01b039101511691602080825183010191016113fa565b612737565b602060405160018152f35b637bf6a16f60e01b5f5260045ffd5b6109d29192503d805f833e6106b48183610dc3565b9083610947565b3461017c575f36600319011261017c576060806040516109f881610d41565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561040c575f90610abf575b6060906105c3604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610d1d565b503d805f833e610acf8183610dc3565b81019060208183031261017c578051906001600160401b03821161017c570160808183031261017c5760405190610b0582610d41565b8051825260208101516001600160a01b038116810361017c576020830152610b2f6040820161118e565b60408301526060810151906001600160401b03821161017c570182601f8201121561017c57606092816020610b669351910161119b565b82820152610a79565b3461017c575f36600319011261017c5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461017c575f36600319011261017c576105c3602061086b6001610bec7f00000000000000000000000000000000000000000000000000000000000000006122ed565b8184610c177f00000000000000000000000000000000000000000000000000000000000000006122ed565b8180610c427f00000000000000000000000000000000000000000000000000000000000000006122ed565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610dc3565b3461017c57610ca861086536610d07565b50602060405160018152f35b3461017c57602036600319011261017c576004359063ffffffff60e01b821680920361017c57602091630271189760e51b8114908115610cf6575b5015158152f35b6301ffc9a760e01b14905083610cef565b604090600319011261017c576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610d5c57604052565b634e487b7160e01b5f52604160045260245ffd5b61012081019081106001600160401b03821117610d5c57604052565b61014081019081106001600160401b03821117610d5c57604052565b604081019081106001600160401b03821117610d5c57604052565b90601f801991011681019081106001600160401b03821117610d5c57604052565b6001600160401b038111610d5c57601f01601f191660200190565b929192610e0b82610de4565b91610e196040519384610dc3565b82948184528183011161017c578281602093845f960137010152565b9080601f8301121561017c57816020610e5093359101610dff565b90565b9181601f8401121561017c578235916001600160401b03831161017c576020808501948460051b01011161017c57565b604060031982011261017c576004356001600160401b03811161017c5781610ead91600401610e53565b92909291602435906001600160401b03821161017c57610ecf91600401610e53565b9091565b9181601f8401121561017c578235916001600160401b03831161017c576020838186019501011161017c57565b602435906001600160401b038216820361017c57565b35906001600160401b038216820361017c57565b600435906001600160a01b038216820361017c57565b602435906001600160a01b038216820361017c57565b604435906001600160a01b038216820361017c57565b606435906001600160a01b038216820361017c57565b35906001600160a01b038216820361017c57565b6001600160401b038111610d5c5760051b60200190565b9080601f8301121561017c578135610fc481610f96565b92610fd26040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b828210610ffa5750505090565b8135815260209182019101610fed565b90602080835192838152019201905f5b8181106110275750505090565b82516001600160a01b031684526020938401939092019160010161101a565b90602080835192838152019201905f5b8181106110635750505090565b8251845260209384019390920191600101611056565b90610e50916020815260018060a01b03825116602082015261010061114461112f6111196111036110ed6110d76110c160208a015161012060408b01526101408a0190610d1d565b60408a0151898203601f190160608b015261100a565b6060890151888203601f190160808a0152611046565b6080880151878203601f190160a089015261100a565b60a0870151868203601f190160c0880152611046565b60c0860151858203601f190160e087015261100a565b60e0850151848203601f190184860152611046565b92015190610120601f1982850301910152611046565b602060031982011261017c57600435906001600160401b03821161017c5761014090829003600319011261017c5760040190565b5190811515820361017c57565b9291926111a782610de4565b916111b56040519384610dc3565b82948184528183011161017c578281602093845f96015e010152565b604051906111de82610d8c565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361017c57565b51906001600160a01b038216820361017c57565b9080601f8301121561017c578151610e509260200161119b565b60208183031261017c578051906001600160401b03821161017c57016101408183031261017c576040519161129183610d8c565b81518352602082015160208401526112ab6040830161121b565b60408401526112bc6060830161121b565b60608401526112cd6080830161121b565b608084015260a082015160a08401526112e860c0830161122f565b60c08401526112f960e0830161122f565b60e084015261130b610100830161118e565b6101008401526101208201516001600160401b03811161017c5761132f9201611243565b61012082015290565b9080601f8301121561017c57815161134f81610f96565b9261135d6040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b8282106113855750505090565b602080916113928461122f565b815201910190611378565b9080601f8301121561017c5781516113b481610f96565b926113c26040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b8282106113ea5750505090565b81518152602091820191016113dd565b60208183031261017c578051906001600160401b03821161017c57016101208183031261017c576040519161142e83610d70565b6114378261122f565b835260208201516001600160401b03811161017c5781611458918401611243565b602084015260408201516001600160401b03811161017c578161147c918401611338565b604084015260608201516001600160401b03811161017c57816114a091840161139d565b606084015260808201516001600160401b03811161017c57816114c4918401611338565b608084015260a08201516001600160401b03811161017c57816114e891840161139d565b60a084015260c08201516001600160401b03811161017c578161150c918401611338565b60c084015260e08201516001600160401b03811161017c578161153091840161139d565b60e08401526101008201516001600160401b03811161017c57611553920161139d565b61010082015290565b61156f90602080825183010191016113fa565b80516020909101516001600160a01b0390911691565b92909281840361161a575f91345b8584101561160f57818410156115fb578360051b80860135908282116115ec5784013561013e198536030181121561017c576115d090850161249b565b156115e15760019103930192611593565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f6116336111d1565b5061163c6111d1565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f91816119a5575b506116a457856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481865afa5f9181611989575b506116e457866301fb6dd160e01b5f5260045260245ffd5b959192939495926116f4826124b4565b1561197a576117d360206101208085019460c0886117e5611715895161155c565b91909451916040519889978896879663e6c9714d60e01b885260606004890152805160648901528b81015160848901526001600160401b0360408201511660a48901526001600160401b0360608201511660c48901526001600160401b0360808201511660e489015260a0810151610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610d1d565b84810360031901602486015290610d1d565b604483019190915203916001600160a01b03165afa90811561040c575f91611940575b50156119315760405161181a81610da8565b8581525f60208201526040519061183082610da8565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b1561017c5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af1908161191c575b506118b25763614cf93960e01b85526004849052602485fd5b6118d99094939192945161099e60018060a01b0387511691602080825183010191016113fa565b7ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c060405194611909602087610dc3565b848652516001600160a01b03169380a490565b6119299196505f90610dc3565b5f945f611899565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611972575b8161195b60209383610dc3565b8101031261017c5761196c9061118e565b5f611808565b3d915061194e565b63629cd40b60e11b5f5260045ffd5b61199e9192503d805f833e6106b48183610dc3565b905f6116cc565b6119ba9192503d805f833e6106b48183610dc3565b905f61168c565b9035601e198236030181121561017c5701602081359101916001600160401b03821161017c578160051b3603831361017c57565b916020908281520191905f5b818110611a0e5750505090565b909192602080600192838060a01b03611a2688610f82565b168152019401929101611a01565b81835290916001600160fb1b03831161017c5760209260051b809284830137010190565b60208152906001600160a01b03611a6e82610f82565b1660208301526020810135601e198236030181121561017c578101916020833593016001600160401b03841161017c57833603811361017c57611bad611b8d611b6e611b4f611b30611b1189610e509a611bb99861012060408c0152816101408c01526101608b01375f610160828b010152601f80199101168801610160611af960408c018c6119c1565b919092601f19828d8303010160608d015201916119f5565b611b1e60608a018a6119c1565b898303601f190160808b015290611a34565b611b3d60808901896119c1565b888303601f190160a08a0152906119f5565b611b5c60a08801886119c1565b878303601f190160c089015290611a34565b611b7b60c08701876119c1565b868303601f190160e0880152906119f5565b611b9a60e08601866119c1565b858303601f190161010087015290611a34565b926101008101906119c1565b91610120601f1982860301910152611a34565b90935f936001600160401b03611bee608095989760a0865260a0860190610d1d565b971660208401526001600160a01b0390811660408401521660608201520152565b60405190611c1c82610d70565b6060610100835f815282602082015282604082015282808201528260808201528260a08201528260c08201528260e08201520152565b9080601f8301121561017c578135611c6981610f96565b92611c776040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b828210611c9f5750505090565b60208091611cac84610f82565b815201910190611c92565b7f0000000000000000000000000000000000000000000000000000000000000000602082015103611d7157611ceb816124b4565b15611d6b57611d0b610120611d1b920151602080825183010191016113fa565b91602080825183010191016113fa565b611d258183612523565b9182611d52575b82611d3657505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611d2c565b50505f90565b635f9bd90760e11b5f5260045ffd5b90959194929394611da4611d95368985610dff565b602080825183010191016113fa565b9160408301948551519860608501998a5151036122cd5760808501928351519560a0810196875151036122cd5760c081018051519360e08301948551518114908115916122dc575b506122cd575f5b8b518051821015611f07578f8e602091611e2585611e6095611e1c8260018060a01b039261250f565b5116925161250f565b516040516323b872dd60e01b81526001600160a01b0390931660048401523060248401526044830152909283919082905f9082906064820190565b03925af15f9181611ecc575b50611ec757505f5b15611e8157600101611df3565b8c8f91611ea7818f611e9e611ec39460018060a01b03925161250f565b5116945161250f565b51604051634a73404560e11b815293849330916004860161270c565b0390fd5b611e74565b9091506020813d8211611eff575b81611ee760209383610dc3565b8101031261017c57611ef89061118e565b905f611e6c565b3d9150611eda565b505092959950929597999a9093969b505f995b895180518c1015611fdb57611f3c8c8f92611e1c8260018060a01b039261250f565b5190803b1561017c576040516323b872dd60e01b81526001600160a01b038f16600482015230602482015260448101929092525f908290606490829084905af19081611fcb575b50611fc0578c8c611ec3611fa48e8e611e9e8260018060a01b03925161250f565b5160405163045b391760e01b815293849330916004860161270c565b6001909a0199611f1a565b5f611fd591610dc3565b5f611f83565b5093985093959850939950946101005f9701975b86518051891015612116576001600160a01b039061200e908a9061250f565b511661201b898d5161250f565b516120278a8c5161250f565b51823b1561017c57604051637921219560e11b81526001600160a01b038e1660048201523060248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af19081612106575b506120fb578a8a611ec38b6120b88c6120b0818e6120a78260018060a01b03925161250f565b5116975161250f565b51925161250f565b5160405163334a7d1b60e21b81526001600160a01b03958616600482015294909316602485015230604485015260648401526084830191909152819060a4820190565b600190970196611fef565b5f61211091610dc3565b5f612081565b50965096509650965061212b92503691610dff565b906040519460c08601908682106001600160401b03831117610d5c576001600160401b039160405260018060a01b03169384875216602086015260016040860152606085015260808401525f60a0840152602060405161218a81610da8565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a061222b608083015160c060e4860152610124850190610d1d565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af192831561040c575f93612299575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d6020116122c5575b816122b560209383610dc3565b8101031261017c5751915f612271565b3d91506122a8565b63512509d360e11b5f5260045ffd5b90506101008401515114155f611dec565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015612437575b806d04ee2d6d415b85acef8100000000600a92101561241c575b662386f26fc10000811015612408575b6305f5e1008110156123f7575b6127108110156123e8575b60648110156123da575b10156123cf575b600a6021600184019361237485610de4565b946123826040519687610dc3565b808652612391601f1991610de4565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156123ca57600a909161239c565b505090565b600190910190612362565b60646002910493019261235b565b61271060049104930192612351565b6305f5e10060089104930192612346565b662386f26fc1000060109104930192612339565b6d04ee2d6d415b85acef810000000060209104930192612329565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461230f565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361248c57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361017c57301490565b6001600160401b036060820151168015159081612505575b506124f657608001516001600160401b03166124e757600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f6124cc565b80518210156115fb5760209160051b010190565b6040810191825151604082019081515111612704575f5b8151518110156125b35784516001600160a01b039061255a90839061250f565b511660018060a01b0361256e83855161250f565b51161480159061258e575b6125855760010161253a565b50505050505f90565b5061259d81606086015161250f565b516125ac82606086015161250f565b5111612579565b505091506080810191825151608082019081515111612704575f5b81515181101561263f5784516001600160a01b03906125ee90839061250f565b511660018060a01b0361260283855161250f565b511614801590612619575b612585576001016125ce565b506126288160a086015161250f565b516126378260a086015161250f565b51141561260d565b5050915060c08101918251519260c082019384515111612704575f5b8451518110156126fa5781516001600160a01b039061267b90839061250f565b511660018060a01b0361268f83885161250f565b5116148015906126d4575b80156126ad575b6125855760010161265b565b506126bd8161010086015161250f565b516126cd8261010086015161250f565b51116126a1565b506126e38160e086015161250f565b516126f28260e086015161250f565b51141561269a565b5050505050600190565b505050505f90565b6001600160a01b03918216815291811660208301529091166040820152606081019190915260800190565b9190915f5b6040820180518051831015612843576001600160a01b039061275f90849061250f565b5116905f60206060860193604461277787875161250f565b5160405163a9059cbb60e01b81526001600160a01b038c16600482015260248101919091529384928391905af15f9181612808575b5061280357505f5b156127c357505060010161273c565b6127e783611ec3926127de899660018060a01b03925161250f565b5116935161250f565b51604051634a73404560e11b815293849330906004860161270c565b6127b4565b9091506020813d821161283b575b8161282360209383610dc3565b8101031261017c576128349061118e565b905f6127ac565b3d9150612816565b5050505f905b608081019081518051841015612926576001600160a01b039061286d90859061250f565b51169360a082019461288085875161250f565b5190803b1561017c576040516323b872dd60e01b81523060048201526001600160a01b038916602482015260448101929092525f908290606490829084905af19081612916575b5061290757505051611ec3916128eb916001600160a01b03906127de90839061250f565b5160405163045b391760e01b815293849330906004860161270c565b93506001909201919050612849565b5f61292091610dc3565b5f6128c7565b50929150505f5b60c0830180518051831015612a5f576001600160a01b039061295090849061250f565b51169260e085019461296384875161250f565b519461010082019561297686885161250f565b51823b1561017c57604051637921219560e11b81523060048201526001600160a01b038b1660248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af19081612a4f575b50612a42575050816120b0816129ff936129f6611ec3979660018060a01b03925161250f565b5116965161250f565b5160405163334a7d1b60e21b81526001600160a01b03948516600482015230602482015294909316604485015260648401526084830191909152819060a4820190565b945092505060010161292d565b5f612a5991610dc3565b5f6129d0565b50505091505056fea2646970667358221220dad5ba5509956939580615329f947d1b0553c7edb9f7446e6e1a6393d4f0724f64736f6c634300081b0033",
    sourceMap:
      "678:10768:128:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;678:10768:128;;;;2018:4;678:10768;759:14:6;688:1:9;678:10768:128;783:14:6;-1:-1:-1;678:10768:128;807:14:6;708:26:9;704:76;;678:10768:128;790:10:9;;678:10768:128;790:10:9;678:10768:128;790:10:9;789::77;;678:10768:128;809:32:77;-1:-1:-1;678:10768:128;;;;;;;;;;;872:48:77;;678:10768:128;872:48:77;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;904:4:77;678:10768:128;;;;2018:4;678:10768;;;;;;-1:-1:-1;;678:10768:128;;;872:48:77;;;;;;;;;;-1:-1:-1;872:48:77;;;-1:-1:-1;851:69:77;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;789:10:77;678:10768:128;;;;;;;;;;;;;;;;;;;;851:69:77;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;872:48:77;;;678:10768:128;872:48:77;;678:10768:128;872:48:77;;;;;;678:10768:128;872:48:77;;;:::i;:::-;;;678:10768:128;;;;;872:48:77;;;678:10768:128;-1:-1:-1;678:10768:128;;872:48:77;;;-1:-1:-1;872:48:77;;;678:10768:128;;;-1:-1:-1;678:10768:128;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;;-1:-1:-1;678:10768:128;;;;;;-1:-1:-1;;678:10768:128;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::o",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c90816301ffc9a714610cb4575080632c713cd914610c9757806354fd4d5014610ba95780635bf2f20d14610b6f5780636b122fe0146109d95780637d2c2931146108dd5780638371ef591461087f57806388e5b2d914610832578063891d9ea81461085157806391db0b7e14610832578063b3b902d4146107e7578063bc197c8114610752578063bca73d64146106c2578063c6ec5070146105c7578063c93844be14610417578063cd181c4914610337578063ce46e0461461031d578063e49617e114610302578063e60c350514610302578063e6c9714d146101e0578063f0ffa185146101805763f23a6e6114610127575f61000f565b3461017c5760a036600319011261017c57610140610f2a565b50610149610f40565b506084356001600160401b03811161017c57610169903690600401610e35565b5060405163f23a6e6160e01b8152602090f35b5f80fd5b3461017c5760a036600319011261017c576004356001600160401b03811161017c576101d86101b56020923690600401610ed3565b6101bd610f00565b6101c5610f56565b906101ce610f6c565b9260843594611d80565b604051908152f35b3461017c57606036600319011261017c576004356001600160401b03811161017c57610140600319823603011261017c576040519061021e82610d8c565b806004013582526024810135602083015261023b60448201610f16565b604083015261024c60648201610f16565b606083015261025d60848201610f16565b608083015260a481013560a083015261027860c48201610f82565b60c083015261028960e48201610f82565b60e0830152610104810135801515810361017c57610100830152610124810135906001600160401b03821161017c5760046102c79236920101610e35565b6101208201526024356001600160401b03811161017c576020916102f26102f8923690600401610e35565b90611cb7565b6040519015158152f35b60206102f86103103661115a565b61031861245a565b61249b565b3461017c575f36600319011261017c5760206040515f8152f35b3461017c57604036600319011261017c576004356001600160401b03811161017c57610120600319823603011261017c5760206103bb9161038e61039c61037c610f00565b92604051928391600401868301611a58565b03601f198101835282610dc3565b60405163f0ffa18560e01b815293849283923391829160048601611bcc565b03815f305af1801561040c575f906103d9575b602090604051908152f35b506020813d602011610404575b816103f360209383610dc3565b8101031261017c57602090516103ce565b3d91506103e6565b6040513d5f823e3d90fd5b3461017c57602036600319011261017c576004356001600160401b03811161017c57610447903690600401610ed3565b61044f611c0f565b5081019060208183031261017c578035906001600160401b03821161017c57016101208183031261017c576040519061048782610d70565b61049081610f82565b825260208101356001600160401b03811161017c57836104b1918301610e35565b602083015260408101356001600160401b03811161017c57836104d5918301611c52565b604083015260608101356001600160401b03811161017c57836104f9918301610fad565b606083015260808101356001600160401b03811161017c578361051d918301611c52565b608083015260a08101356001600160401b03811161017c5783610541918301610fad565b60a083015260c08101356001600160401b03811161017c5783610565918301611c52565b60c083015260e08101356001600160401b03811161017c5783610589918301610fad565b60e0830152610100810135926001600160401b03841161017c576105c3936105b19201610fad565b61010082015260405191829182611079565b0390f35b3461017c57602036600319011261017c576105e0611c0f565b506105e96111d1565b506040516328c44a9960e21b815260048035908201525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa90811561040c575f916106a0575b5060208101517f000000000000000000000000000000000000000000000000000000000000000003610691576106856101206105c3920151602080825183010191016113fa565b60405191829182611079565b635527981560e11b5f5260045ffd5b6106bc91503d805f833e6106b48183610dc3565b81019061125d565b8161063e565b3461017c57608036600319011261017c576004356001600160401b03811161017c57610120600319823603011261017c5760206106fd610f00565b6107296103bb61070b610f56565b94610737610717610f6c565b91604051948591600401888301611a58565b03601f198101855284610dc3565b60405163f0ffa18560e01b8152958694859460048601611bcc565b3461017c5760a036600319011261017c5761076b610f2a565b50610774610f40565b506044356001600160401b03811161017c57610794903690600401610fad565b506064356001600160401b03811161017c576107b4903690600401610fad565b506084356001600160401b03811161017c576107d4903690600401610e35565b5060405163bc197c8160e01b8152602090f35b3461017c57606036600319011261017c576004356001600160401b03811161017c576101d861081c6020923690600401610ed3565b610824610f00565b916044359233923392611d80565b60206102f861084036610e83565b9261084c92919261245a565b611585565b3461017c576105c361086b61086536610d07565b90611629565b604051918291602083526020830190610d1d565b3461017c57602036600319011261017c576004356001600160401b03811161017c576108b26108b7913690600401610e35565b61155c565b604080516001600160a01b0390931683526020830181905282916105c391830190610d1d565b3461017c57602036600319011261017c576004356108f96111d1565b506040516328c44a9960e21b8152600481018290525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa5f91816109bd575b5061095f57506301fb6dd160e01b5f5260045260245ffd5b6001600160401b0360608201511642106109ae578061099e6101206109a39301519160c060018060a01b039101511691602080825183010191016113fa565b612737565b602060405160018152f35b637bf6a16f60e01b5f5260045ffd5b6109d29192503d805f833e6106b48183610dc3565b9083610947565b3461017c575f36600319011261017c576060806040516109f881610d41565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561040c575f90610abf575b6060906105c3604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610d1d565b503d805f833e610acf8183610dc3565b81019060208183031261017c578051906001600160401b03821161017c570160808183031261017c5760405190610b0582610d41565b8051825260208101516001600160a01b038116810361017c576020830152610b2f6040820161118e565b60408301526060810151906001600160401b03821161017c570182601f8201121561017c57606092816020610b669351910161119b565b82820152610a79565b3461017c575f36600319011261017c5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461017c575f36600319011261017c576105c3602061086b6001610bec7f00000000000000000000000000000000000000000000000000000000000000006122ed565b8184610c177f00000000000000000000000000000000000000000000000000000000000000006122ed565b8180610c427f00000000000000000000000000000000000000000000000000000000000000006122ed565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610dc3565b3461017c57610ca861086536610d07565b50602060405160018152f35b3461017c57602036600319011261017c576004359063ffffffff60e01b821680920361017c57602091630271189760e51b8114908115610cf6575b5015158152f35b6301ffc9a760e01b14905083610cef565b604090600319011261017c576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610d5c57604052565b634e487b7160e01b5f52604160045260245ffd5b61012081019081106001600160401b03821117610d5c57604052565b61014081019081106001600160401b03821117610d5c57604052565b604081019081106001600160401b03821117610d5c57604052565b90601f801991011681019081106001600160401b03821117610d5c57604052565b6001600160401b038111610d5c57601f01601f191660200190565b929192610e0b82610de4565b91610e196040519384610dc3565b82948184528183011161017c578281602093845f960137010152565b9080601f8301121561017c57816020610e5093359101610dff565b90565b9181601f8401121561017c578235916001600160401b03831161017c576020808501948460051b01011161017c57565b604060031982011261017c576004356001600160401b03811161017c5781610ead91600401610e53565b92909291602435906001600160401b03821161017c57610ecf91600401610e53565b9091565b9181601f8401121561017c578235916001600160401b03831161017c576020838186019501011161017c57565b602435906001600160401b038216820361017c57565b35906001600160401b038216820361017c57565b600435906001600160a01b038216820361017c57565b602435906001600160a01b038216820361017c57565b604435906001600160a01b038216820361017c57565b606435906001600160a01b038216820361017c57565b35906001600160a01b038216820361017c57565b6001600160401b038111610d5c5760051b60200190565b9080601f8301121561017c578135610fc481610f96565b92610fd26040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b828210610ffa5750505090565b8135815260209182019101610fed565b90602080835192838152019201905f5b8181106110275750505090565b82516001600160a01b031684526020938401939092019160010161101a565b90602080835192838152019201905f5b8181106110635750505090565b8251845260209384019390920191600101611056565b90610e50916020815260018060a01b03825116602082015261010061114461112f6111196111036110ed6110d76110c160208a015161012060408b01526101408a0190610d1d565b60408a0151898203601f190160608b015261100a565b6060890151888203601f190160808a0152611046565b6080880151878203601f190160a089015261100a565b60a0870151868203601f190160c0880152611046565b60c0860151858203601f190160e087015261100a565b60e0850151848203601f190184860152611046565b92015190610120601f1982850301910152611046565b602060031982011261017c57600435906001600160401b03821161017c5761014090829003600319011261017c5760040190565b5190811515820361017c57565b9291926111a782610de4565b916111b56040519384610dc3565b82948184528183011161017c578281602093845f96015e010152565b604051906111de82610d8c565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361017c57565b51906001600160a01b038216820361017c57565b9080601f8301121561017c578151610e509260200161119b565b60208183031261017c578051906001600160401b03821161017c57016101408183031261017c576040519161129183610d8c565b81518352602082015160208401526112ab6040830161121b565b60408401526112bc6060830161121b565b60608401526112cd6080830161121b565b608084015260a082015160a08401526112e860c0830161122f565b60c08401526112f960e0830161122f565b60e084015261130b610100830161118e565b6101008401526101208201516001600160401b03811161017c5761132f9201611243565b61012082015290565b9080601f8301121561017c57815161134f81610f96565b9261135d6040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b8282106113855750505090565b602080916113928461122f565b815201910190611378565b9080601f8301121561017c5781516113b481610f96565b926113c26040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b8282106113ea5750505090565b81518152602091820191016113dd565b60208183031261017c578051906001600160401b03821161017c57016101208183031261017c576040519161142e83610d70565b6114378261122f565b835260208201516001600160401b03811161017c5781611458918401611243565b602084015260408201516001600160401b03811161017c578161147c918401611338565b604084015260608201516001600160401b03811161017c57816114a091840161139d565b606084015260808201516001600160401b03811161017c57816114c4918401611338565b608084015260a08201516001600160401b03811161017c57816114e891840161139d565b60a084015260c08201516001600160401b03811161017c578161150c918401611338565b60c084015260e08201516001600160401b03811161017c578161153091840161139d565b60e08401526101008201516001600160401b03811161017c57611553920161139d565b61010082015290565b61156f90602080825183010191016113fa565b80516020909101516001600160a01b0390911691565b92909281840361161a575f91345b8584101561160f57818410156115fb578360051b80860135908282116115ec5784013561013e198536030181121561017c576115d090850161249b565b156115e15760019103930192611593565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f6116336111d1565b5061163c6111d1565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f91816119a5575b506116a457856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481865afa5f9181611989575b506116e457866301fb6dd160e01b5f5260045260245ffd5b959192939495926116f4826124b4565b1561197a576117d360206101208085019460c0886117e5611715895161155c565b91909451916040519889978896879663e6c9714d60e01b885260606004890152805160648901528b81015160848901526001600160401b0360408201511660a48901526001600160401b0360608201511660c48901526001600160401b0360808201511660e489015260a0810151610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610d1d565b84810360031901602486015290610d1d565b604483019190915203916001600160a01b03165afa90811561040c575f91611940575b50156119315760405161181a81610da8565b8581525f60208201526040519061183082610da8565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b1561017c5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af1908161191c575b506118b25763614cf93960e01b85526004849052602485fd5b6118d99094939192945161099e60018060a01b0387511691602080825183010191016113fa565b7ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c060405194611909602087610dc3565b848652516001600160a01b03169380a490565b6119299196505f90610dc3565b5f945f611899565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611972575b8161195b60209383610dc3565b8101031261017c5761196c9061118e565b5f611808565b3d915061194e565b63629cd40b60e11b5f5260045ffd5b61199e9192503d805f833e6106b48183610dc3565b905f6116cc565b6119ba9192503d805f833e6106b48183610dc3565b905f61168c565b9035601e198236030181121561017c5701602081359101916001600160401b03821161017c578160051b3603831361017c57565b916020908281520191905f5b818110611a0e5750505090565b909192602080600192838060a01b03611a2688610f82565b168152019401929101611a01565b81835290916001600160fb1b03831161017c5760209260051b809284830137010190565b60208152906001600160a01b03611a6e82610f82565b1660208301526020810135601e198236030181121561017c578101916020833593016001600160401b03841161017c57833603811361017c57611bad611b8d611b6e611b4f611b30611b1189610e509a611bb99861012060408c0152816101408c01526101608b01375f610160828b010152601f80199101168801610160611af960408c018c6119c1565b919092601f19828d8303010160608d015201916119f5565b611b1e60608a018a6119c1565b898303601f190160808b015290611a34565b611b3d60808901896119c1565b888303601f190160a08a0152906119f5565b611b5c60a08801886119c1565b878303601f190160c089015290611a34565b611b7b60c08701876119c1565b868303601f190160e0880152906119f5565b611b9a60e08601866119c1565b858303601f190161010087015290611a34565b926101008101906119c1565b91610120601f1982860301910152611a34565b90935f936001600160401b03611bee608095989760a0865260a0860190610d1d565b971660208401526001600160a01b0390811660408401521660608201520152565b60405190611c1c82610d70565b6060610100835f815282602082015282604082015282808201528260808201528260a08201528260c08201528260e08201520152565b9080601f8301121561017c578135611c6981610f96565b92611c776040519485610dc3565b81845260208085019260051b82010192831161017c57602001905b828210611c9f5750505090565b60208091611cac84610f82565b815201910190611c92565b7f0000000000000000000000000000000000000000000000000000000000000000602082015103611d7157611ceb816124b4565b15611d6b57611d0b610120611d1b920151602080825183010191016113fa565b91602080825183010191016113fa565b611d258183612523565b9182611d52575b82611d3657505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611d2c565b50505f90565b635f9bd90760e11b5f5260045ffd5b90959194929394611da4611d95368985610dff565b602080825183010191016113fa565b9160408301948551519860608501998a5151036122cd5760808501928351519560a0810196875151036122cd5760c081018051519360e08301948551518114908115916122dc575b506122cd575f5b8b518051821015611f07578f8e602091611e2585611e6095611e1c8260018060a01b039261250f565b5116925161250f565b516040516323b872dd60e01b81526001600160a01b0390931660048401523060248401526044830152909283919082905f9082906064820190565b03925af15f9181611ecc575b50611ec757505f5b15611e8157600101611df3565b8c8f91611ea7818f611e9e611ec39460018060a01b03925161250f565b5116945161250f565b51604051634a73404560e11b815293849330916004860161270c565b0390fd5b611e74565b9091506020813d8211611eff575b81611ee760209383610dc3565b8101031261017c57611ef89061118e565b905f611e6c565b3d9150611eda565b505092959950929597999a9093969b505f995b895180518c1015611fdb57611f3c8c8f92611e1c8260018060a01b039261250f565b5190803b1561017c576040516323b872dd60e01b81526001600160a01b038f16600482015230602482015260448101929092525f908290606490829084905af19081611fcb575b50611fc0578c8c611ec3611fa48e8e611e9e8260018060a01b03925161250f565b5160405163045b391760e01b815293849330916004860161270c565b6001909a0199611f1a565b5f611fd591610dc3565b5f611f83565b5093985093959850939950946101005f9701975b86518051891015612116576001600160a01b039061200e908a9061250f565b511661201b898d5161250f565b516120278a8c5161250f565b51823b1561017c57604051637921219560e11b81526001600160a01b038e1660048201523060248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af19081612106575b506120fb578a8a611ec38b6120b88c6120b0818e6120a78260018060a01b03925161250f565b5116975161250f565b51925161250f565b5160405163334a7d1b60e21b81526001600160a01b03958616600482015294909316602485015230604485015260648401526084830191909152819060a4820190565b600190970196611fef565b5f61211091610dc3565b5f612081565b50965096509650965061212b92503691610dff565b906040519460c08601908682106001600160401b03831117610d5c576001600160401b039160405260018060a01b03169384875216602086015260016040860152606085015260808401525f60a0840152602060405161218a81610da8565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a061222b608083015160c060e4860152610124850190610d1d565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af192831561040c575f93612299575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d6020116122c5575b816122b560209383610dc3565b8101031261017c5751915f612271565b3d91506122a8565b63512509d360e11b5f5260045ffd5b90506101008401515114155f611dec565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015612437575b806d04ee2d6d415b85acef8100000000600a92101561241c575b662386f26fc10000811015612408575b6305f5e1008110156123f7575b6127108110156123e8575b60648110156123da575b10156123cf575b600a6021600184019361237485610de4565b946123826040519687610dc3565b808652612391601f1991610de4565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156123ca57600a909161239c565b505090565b600190910190612362565b60646002910493019261235b565b61271060049104930192612351565b6305f5e10060089104930192612346565b662386f26fc1000060109104930192612339565b6d04ee2d6d415b85acef810000000060209104930192612329565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461230f565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361248c57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361017c57301490565b6001600160401b036060820151168015159081612505575b506124f657608001516001600160401b03166124e757600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f6124cc565b80518210156115fb5760209160051b010190565b6040810191825151604082019081515111612704575f5b8151518110156125b35784516001600160a01b039061255a90839061250f565b511660018060a01b0361256e83855161250f565b51161480159061258e575b6125855760010161253a565b50505050505f90565b5061259d81606086015161250f565b516125ac82606086015161250f565b5111612579565b505091506080810191825151608082019081515111612704575f5b81515181101561263f5784516001600160a01b03906125ee90839061250f565b511660018060a01b0361260283855161250f565b511614801590612619575b612585576001016125ce565b506126288160a086015161250f565b516126378260a086015161250f565b51141561260d565b5050915060c08101918251519260c082019384515111612704575f5b8451518110156126fa5781516001600160a01b039061267b90839061250f565b511660018060a01b0361268f83885161250f565b5116148015906126d4575b80156126ad575b6125855760010161265b565b506126bd8161010086015161250f565b516126cd8261010086015161250f565b51116126a1565b506126e38160e086015161250f565b516126f28260e086015161250f565b51141561269a565b5050505050600190565b505050505f90565b6001600160a01b03918216815291811660208301529091166040820152606081019190915260800190565b9190915f5b6040820180518051831015612843576001600160a01b039061275f90849061250f565b5116905f60206060860193604461277787875161250f565b5160405163a9059cbb60e01b81526001600160a01b038c16600482015260248101919091529384928391905af15f9181612808575b5061280357505f5b156127c357505060010161273c565b6127e783611ec3926127de899660018060a01b03925161250f565b5116935161250f565b51604051634a73404560e11b815293849330906004860161270c565b6127b4565b9091506020813d821161283b575b8161282360209383610dc3565b8101031261017c576128349061118e565b905f6127ac565b3d9150612816565b5050505f905b608081019081518051841015612926576001600160a01b039061286d90859061250f565b51169360a082019461288085875161250f565b5190803b1561017c576040516323b872dd60e01b81523060048201526001600160a01b038916602482015260448101929092525f908290606490829084905af19081612916575b5061290757505051611ec3916128eb916001600160a01b03906127de90839061250f565b5160405163045b391760e01b815293849330906004860161270c565b93506001909201919050612849565b5f61292091610dc3565b5f6128c7565b50929150505f5b60c0830180518051831015612a5f576001600160a01b039061295090849061250f565b51169260e085019461296384875161250f565b519461010082019561297686885161250f565b51823b1561017c57604051637921219560e11b81523060048201526001600160a01b038b1660248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af19081612a4f575b50612a42575050816120b0816129ff936129f6611ec3979660018060a01b03925161250f565b5116965161250f565b5160405163334a7d1b60e21b81526001600160a01b03948516600482015230602482015294909316604485015260648401526084830191909152819060a4820190565b945092505060010161292d565b5f612a5991610dc3565b5f6129d0565b50505091505056fea2646970667358221220dad5ba5509956939580615329f947d1b0553c7edb9f7446e6e1a6393d4f0724f64736f6c634300081b0033",
    sourceMap:
      "678:10768:128:-:0;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;;;;1183:12:9;;;1054:5;1183:12;678:10768:128;1054:5:9;1183:12;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;:::i;:::-;-1:-1:-1;678:10768:128;;-1:-1:-1;;;678:10768:128;;;;;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;3045:39:9;678:10768:128;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;678:10768:128:-;;;;;;-1:-1:-1;;678:10768:128;;;;;;;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;10253:187;678:10768;10294:16;;678:10768;;:::i;:::-;;;;;;;;;10294:16;;;;:::i;:::-;;1055:104:6;;10294:16:128;;;;;;:::i;:::-;678:10768;;-1:-1:-1;;;10253:187:128;;678:10768;;;;;10360:10;;;;678:10768;10253:187;;;:::i;:::-;;:4;678:10768;10253:4;:187;;;;;;678:10768;10253:187;;;678:10768;;;;;;;;;10253:187;;678:10768;10253:187;;678:10768;10253:187;;;;;;678:10768;10253:187;;;:::i;:::-;;;678:10768;;;;;;;10253:187;;;;;-1:-1:-1;10253:187:128;;;678:10768;;;;;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;11403:34;;678:10768;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;678:10768:128;;-1:-1:-1;;;2392:23:77;;678:10768:128;;;2392:23:77;;;678:10768:128;-1:-1:-1;678:10768:128;2392:23:77;678:10768:128;2392:3:77;-1:-1:-1;;;;;678:10768:128;2392:23:77;;;;;;;678:10768:128;2392:23:77;;;678:10768:128;2429:19:77;678:10768:128;2429:19:77;;678:10768:128;2452:18:77;2429:41;2425:87;;11218:46:128;11229:16;678:10768;11229:16;;;678:10768;;;;11218:46;;;;;;:::i;:::-;678:10768;;;;;;;:::i;2425:87:77:-;2491:21;;;678:10768:128;2491:21:77;678:10768:128;;2491:21:77;2392:23;;;;;;678:10768:128;2392:23:77;;;;;;:::i;:::-;;;;;:::i;:::-;;;;678:10768:128;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;:::i;:::-;10700:16;10659:181;678:10768;;:::i;:::-;;10700:16;678:10768;;:::i;:::-;;;;;;;;;10700:16;;;;:::i;:::-;;1055:104:6;;10700:16:128;;;;;;:::i;:::-;678:10768;;-1:-1:-1;;;10659:181:128;;678:10768;;;;;;10659:181;;;:::i;678:10768::-;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;:::i;:::-;-1:-1:-1;678:10768:128;;-1:-1:-1;;;678:10768:128;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;;;;678:10768:128;;;;716:142:80;678:10768:128;;;;;;;;:::i;:::-;;;:::i;:::-;;;;794:10:80;;;;716:142;;:::i;678:10768:128:-;;1442:1461:9;678:10768:128;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;678:10768:128:-;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;678:10768:128;;;;;;;;:::i;:::-;-1:-1:-1;678:10768:128;;-1:-1:-1;;;3989:23:78;;678:10768:128;3989:23:78;;678:10768:128;;;-1:-1:-1;678:10768:128;3989:23:78;678:10768:128;3989:3:78;-1:-1:-1;;;;;678:10768:128;3989:23:78;;678:10768:128;;3989:23:78;;;678:10768:128;-1:-1:-1;3985:172:78;;4122:24;;;;678:10768:128;4122:24:78;678:10768:128;;3989:23:78;678:10768:128;4122:24:78;3985:172;-1:-1:-1;;;;;4189:26:78;;;678:10768:128;;4171:15:78;:44;4167:87;;4334:16;3739:34:128;4334:16:78;3815:2:128;4334:16:78;;;678:10768:128;4352:21:78;678:10768:128;;;;;4352:21:78;;678:10768:128;;;;;;;3739:34;;;;;;:::i;:::-;3815:2;:::i;:::-;678:10768;;;;;;;4167:87:78;4236:18;;;678:10768:128;4236:18:78;678:10768:128;;4236:18:78;3989:23;;;;;;;678:10768:128;3989:23:78;;;;;;:::i;:::-;;;;;678:10768:128;;;;;;-1:-1:-1;;678:10768:128;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1497:44:77;;1522:18;678:10768:128;1497:44:77;;678:10768:128;;;1497:44:77;678:10768:128;;;;;;1497:14:77;678:10768:128;1497:44:77;;;;;;678:10768:128;1497:44:77;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1497:44:77:-;;;;678:10768:128;1497:44:77;;;;;;:::i;:::-;;;678:10768:128;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1497:44:77;;678:10768:128;;;;;;-1:-1:-1;;678:10768:128;;;;;;;542:43:77;678:10768:128;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;1055:104:6;;678:10768:128;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;678:10768:128;;;;;;;;;;;;1055:104:6;;;678:10768:128;;;;-1:-1:-1;;;678:10768:128;;;;;;;;;;;;;;;;;-1:-1:-1;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;678:10768:128:-;;;;10969:37;678:10768;;;:::i;10969:37::-;;678:10768;;;11023:4;678:10768;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;775:49:41;;;:89;;;;678:10768:128;;;;;;;775:89:41;-1:-1:-1;;;862:40:68;;-1:-1:-1;775:89:41;;;678:10768:128;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;;;-1:-1:-1;;678:10768:128;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;:::o;:::-;;;;-1:-1:-1;678:10768:128;;;;;-1:-1:-1;678:10768:128;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;:::o;:::-;;;1055:104:6;;678:10768:128;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;:::o;:::-;-1:-1:-1;;;;;678:10768:128;;;;;;-1:-1:-1;;678:10768:128;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;678:10768:128;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;-1:-1:-1;;;;;678:10768:128;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;:::i;:::-;;;;1055:104:6;678:10768:128;1055:104:6;;678:10768:128;;;;;;;;:::i;:::-;;-1:-1:-1;;678:10768:128;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;678:10768:128;;-1:-1:-1;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;-1:-1:-1;678:10768:128;;;;;;:::o;:::-;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;-1:-1:-1;;;;;678:10768:128;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;:::i;:::-;;;;;;:::o;2592:267::-;2768:34;2592:267;2768:34;678:10768;;;2768:34;;;;;;:::i;:::-;678:10768;;2768:34;2837:14;;;;-1:-1:-1;;;;;678:10768:128;;;;2592:267::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;678:10768:128;;;;;;;;;;;;;4064:22:9;;;;4060:87;;678:10768:128;;;;;;;;;;;;;;4274:33:9;678:10768:128;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;678:10768:128;;3896:19:9;678:10768:128;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;678:10768:128;;;;3881:1:9;678:10768:128;;;;;3881:1:9;678:10768:128;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2054:1760:78;;-1:-1:-1;678:10768:128;;:::i;:::-;2224:30:78;678:10768:128;;:::i;:::-;-1:-1:-1;678:10768:128;;-1:-1:-1;;;2317:27:78;;;;;678:10768:128;;;2317:3:78;-1:-1:-1;;;;;678:10768:128;;-1:-1:-1;678:10768:128;2317:27:78;678:10768:128;;2317:27:78;;-1:-1:-1;;2317:27:78;;;2054:1760;-1:-1:-1;2313:219:78;;4122:24;;;;-1:-1:-1;2493:28:78;2317:27;678:10768:128;2317:27:78;-1:-1:-1;2493:28:78;2313:219;2428:26;;;;;678:10768:128;;;;;2546:32:78;;;2317:27;2546:32;;678:10768:128;-1:-1:-1;2546:32:78;2317:27;2546:32;;;;-1:-1:-1;;2546:32:78;;;2313:219;-1:-1:-1;2542:234:78;;4122:24;;;;-1:-1:-1;2732:33:78;2317:27;678:10768:128;2317:27:78;-1:-1:-1;2732:33:78;2542:234;2662:31;;;;;;2542:234;2791:24;;;:::i;:::-;2790:25;2786:64;;678:10768:128;;2994:11:78;;;;;678:10768:128;2994:11:78;678:10768:128;2957:58:78;2994:11;;2957:58;:::i;:::-;678:10768:128;;;;;;;;;;;;;;;;;3086:66:78;;678:10768:128;2317:27:78;3086:66;;678:10768:128;;;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;678:10768:128;2317:27:78;678:10768:128;;;;;:::i;:::-;;;;;;;;3086:66:78;;-1:-1:-1;;;;;678:10768:128;3086:66:78;;;;;;;-1:-1:-1;3086:66:78;;;2542:234;3085:67;;3081:112;;678:10768:128;;;;;:::i;:::-;;;;-1:-1:-1;678:10768:128;3372:47:78;;678:10768:128;;;;;;;:::i;:::-;3326:18:78;678:10768:128;;;3278:160:78;;678:10768:128;;;3250:202:78;;;;;678:10768:128;-1:-1:-1;678:10768:128;;;;;;;;;;;;;;3250:202:78;;678:10768:128;2317:27:78;3250:202;;678:10768:128;;;;2317:27:78;678:10768:128;;;;;;;;;3250:202:78;;;;;;2542:234;-1:-1:-1;3234:293:78;;-1:-1:-1;;;3491:25:78;;2317:27;678:10768:128;;;2317:27:78;3491:25;;3234:293;3502:2:128;3234:293:78;;;;;;3625:11;3386:74:128;678:10768;;;;;;;;;;;;;3386:74;;;;;;:::i;3502:2::-;3723:61:78;678:10768:128;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;678:10768:128;;;3723:61:78;2054:1760;:::o;3250:202::-;;;;;-1:-1:-1;3250:202:78;;:::i;:::-;-1:-1:-1;3250:202:78;;;;3081:112;3173:20;;;-1:-1:-1;3173:20:78;2317:27;-1:-1:-1;3173:20:78;3086:66;;;678:10768:128;3086:66:78;;678:10768:128;3086:66:78;;;;;;678:10768:128;3086:66:78;;;:::i;:::-;;;678:10768:128;;;;;;;:::i;:::-;3086:66:78;;;;;;-1:-1:-1;3086:66:78;;2786:64;2824:26;;;-1:-1:-1;2824:26:78;2317:27;-1:-1:-1;2824:26:78;2546:32;;;;;;;-1:-1:-1;2546:32:78;;;;;;:::i;:::-;;;;;2317:27;;;;;;;-1:-1:-1;2317:27:78;;;;;;:::i;:::-;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;:::o;:::-;;;;;-1:-1:-1;;;;;678:10768:128;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1055:104:6;;678:10768:128;;;;;;;;;;;;:::i;:::-;1055:104:6;;;;;678:10768:128;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;678:10768:128;;;;;1055:104:6;678:10768:128;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;678:10768:128;;;;;1055:104:6;678:10768:128;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;678:10768:128;;;;;1055:104:6;678:10768:128;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;678:10768:128;;;;;1055:104:6;678:10768:128;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;678:10768:128;;;;;1055:104:6;678:10768:128;:::i;:::-;;;;;;;:::i;:::-;1055:104:6;678:10768:128;1055:104:6;;678:10768:128;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;8029:650;8242:18;1016:17:76;;;678:10768:128;1016:27:76;1012:55;;1084:27;;;:::i;:::-;8214:47:128;8210:65;;8318:79;8342:15;8442:36;8342:15;;;1016:17:76;678:10768:128;;;8318:79;;;;;;:::i;:::-;678:10768;1016:17:76;678:10768:128;;;8442:36;;;;;;:::i;:::-;8508:38;;;;:::i;:::-;:91;;;;8029:650;8508:164;;;8489:183;;8029:650;:::o;8508:164::-;1016:17:76;8625:14:128;;;;;;678:10768;;;;;8615:25;8654:17;;;1016::76;678:10768:128;;;;8644:28;8615:57;8029:650;:::o;8508:91::-;678:10768;;;;-1:-1:-1;;;;;678:10768:128;;;;;8562:37;;-1:-1:-1;8508:91:128;;8210:65;8263:12;;678:10768;8263:12;:::o;1012:55:76:-;1052:15;;;678:10768:128;1052:15:76;;678:10768:128;1052:15:76;871:377:80;;;;;;;;3014:34:128;678:10768;;;;;:::i;:::-;3014:34;678:10768;;;3014:34;;;;;;:::i;:::-;2131:16;;;;;;;678:10768;2158:17;;;;;;;678:10768;2131:51;2127:97;;2238:17;;;;;;678:10768;2266:19;;;;;;;678:10768;2238:54;2234:100;;2361:18;;;;;678:10768;2390:20;;;;;;;678:10768;2361:56;;;;;:127;;;871:377:80;2344:183:128;;;-1:-1:-1;4018:3:128;3993:16;;678:10768;;3989:27;;;;;4037:12;;3014:34;4037:12;4206:20;4037:12;4083:161;4037:12;4090:19;678:10768;;;;;;4090:19;;:::i;:::-;678:10768;;4206:17;;:20;:::i;:::-;678:10768;2131:16;678:10768;-1:-1:-1;;;4083:161:128;;-1:-1:-1;;;;;678:10768:128;;;4083:161;;;678:10768;4179:4;678:10768;;;;;;;;;;;;-1:-1:-1;678:10768:128;;-1:-1:-1;;678:10768:128;;;;;;;4083:161;;;;;-1:-1:-1;;4083:161:128;;;4018:3;-1:-1:-1;4063:320:128;;4353:15;-1:-1:-1;4063:320:128;4401:8;4397:235;;678:10768;;3977:10;;4397:235;678:10768;;;4579:20;678:10768;;4477:19;4436:181;678:10768;;;;;;4477:16;;:19;:::i;:::-;678:10768;;4579:17;;:20;:::i;:::-;678:10768;2131:16;678:10768;-1:-1:-1;;;4436:181:128;;678:10768;;;4179:4;;4083:161;4436:181;;;:::i;:::-;;;;4063:320;;;4083:161;;;;3014:34;4083:161;;;;;;;;;3014:34;4083:161;;;:::i;:::-;;;678:10768;;;;;;;:::i;:::-;4083:161;;;;;;;-1:-1:-1;4083:161:128;;3989:27;;;;;;;;;;;;;;;;;-1:-1:-1;4680:559:128;4727:3;4701:17;;678:10768;;4697:28;;;;;4891:22;678:10768;;;4774:20;678:10768;;;;;;4774:20;;:::i;4891:22::-;678:10768;4766:165;;;;;;2131:16;678:10768;-1:-1:-1;;;4766:165:128;;-1:-1:-1;;;;;678:10768:128;;4083:161;4766:165;;678:10768;4179:4;678:10768;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;4766:165:128;;;;;;4727:3;-1:-1:-1;4746:483:128;;678:10768;;5029:185;5174:22;678:10768;;5071:20;678:10768;;;;;;5071:17;;:20;:::i;5174:22::-;678:10768;2131:16;678:10768;-1:-1:-1;;;5029:185:128;;678:10768;;;4179:4;;4083:161;5029:185;;;:::i;4746:483::-;678:10768;;;;;4685:10;;4766:165;-1:-1:-1;4766:165:128;;;:::i;:::-;;;;4697:28;;;;;;;;;;;;;5541:19;-1:-1:-1;5541:19:128;;5278:682;5326:3;5299:18;;678:10768;;5295:29;;;;;-1:-1:-1;;;;;678:10768:128;5374:21;;678:10768;;5374:21;:::i;:::-;678:10768;;5496:23;:20;;;:23;:::i;:::-;678:10768;5541:22;:19;;;:22;:::i;:::-;678:10768;5365:240;;;;;2131:16;678:10768;-1:-1:-1;;;5365:240:128;;-1:-1:-1;;;;;678:10768:128;;4083:161;5365:240;;678:10768;4179:4;678:10768;;;;;;;;;;;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;;;;;;;;;-1:-1:-1;;5365:240:128;;;;;;5326:3;-1:-1:-1;5345:605:128;;678:10768;;5703:232;678:10768;5895:22;678:10768;5850:23;678:10768;;5746:21;678:10768;;;;;;5746:18;;:21;:::i;:::-;678:10768;;5850:20;;:23;:::i;:::-;678:10768;5895:19;;:22;:::i;:::-;678:10768;2131:16;678:10768;-1:-1:-1;;;5703:232:128;;-1:-1:-1;;;;;678:10768:128;;;4083:161;5703:232;;678:10768;;;;;;;;;4179:4;678:10768;;;;;;;;;;;;;;;;;;;;;;5345:605;678:10768;;;;;5283:10;;5365:240;-1:-1:-1;5365:240:128;;;:::i;:::-;;;;5295:29;;;;;;;;;;678:10768;5295:29;;678:10768;;;:::i;:::-;;2131:16;678:10768;;2361:18;678:10768;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;-1:-1:-1;;;;;678:10768:128;2131:16;678:10768;;;;;;;;;;;;3014:34;1914:299:77;;678:10768:128;;2131:16;1914:299:77;;678:10768:128;2158:17;1914:299:77;;678:10768:128;2238:17;1914:299:77;;678:10768:128;-1:-1:-1;2266:19:128;1914:299:77;;678:10768:128;3014:34;2131:16;678:10768;;;;:::i;:::-;1868:18:77;678:10768:128;;1819:413:77;;;678:10768:128;;;2131:16;678:10768;;;;;;;;1791:455:77;;;4083:161:128;1791:455:77;;678:10768:128;;;;;;;2131:16;678:10768;;;;;;;;;;;;;;;;-1:-1:-1;;;;;678:10768:128;;;;;;;;;2131:16;678:10768;;;;;;;;;2158:17;678:10768;;;;;;;2266:19;678:10768;2238:17;678:10768;;;2361:18;678:10768;;;;;;;;;:::i;:::-;;;;;;;;1791:455:77;678:10768:128;-1:-1:-1;1791:3:77;-1:-1:-1;;;;;678:10768:128;1791:455:77;;;;;;;-1:-1:-1;1791:455:77;;;5278:682:128;1134:55:80;;4820:26:78;-1:-1:-1;4820:26:78;;871:377:80:o;1791:455:77:-;;;;3014:34:128;1791:455:77;;3014:34:128;1791:455:77;;;;;;678:10768:128;1791:455:77;;;:::i;:::-;;;678:10768:128;;;;;1791:455:77;;;;;;;-1:-1:-1;1791:455:77;;2344:183:128;2203:21;;;-1:-1:-1;2506:21:128;;-1:-1:-1;2506:21:128;2361:127;2462:19;;;;;;678:10768;2433:55;;2361:127;;;637:632:63;759:17;-1:-1:-1;25444:17:70;-1:-1:-1;;;25444:17:70;;;25440:103;;637:632:63;25560:17:70;25569:8;26140:7;25560:17;;;25556:103;;637:632:63;25685:8:70;25676:17;;;25672:103;;637:632:63;25801:7:70;25792:16;;;25788:100;;637:632:63;25914:7:70;25905:16;;;25901:100;;637:632:63;26027:7:70;26018:16;;;26014:100;;637:632:63;26131:16:70;;26127:66;;637:632:63;26140:7:70;874:92:63;779:1;678:10768:128;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;678:10768:128;;:::i;:::-;;;;;;;874:92:63;;;979:247;-1:-1:-1;;678:10768:128;;-1:-1:-1;;;1033:111:63;;;;678:10768:128;1033:111:63;678:10768:128;1194:10:63;;1190:21;;26140:7:70;979:247:63;;;;1190:21;1206:5;;637:632;:::o;26127:66:70:-;26177:1;678:10768:128;;;;26127:66:70;;26014:100;26027:7;26098:1;678:10768:128;;;;26014:100:70;;;25901;25914:7;25985:1;678:10768:128;;;;25901:100:70;;;25788;25801:7;25872:1;678:10768:128;;;;25788:100:70;;;25672:103;25685:8;25758:2;678:10768:128;;;;25672:103:70;;;25556;25569:8;25642:2;678:10768:128;;;;25556:103:70;;;25440;-1:-1:-1;25526:2:70;;-1:-1:-1;;;;678:10768:128;;25440:103:70;;6040:128:9;6109:4;-1:-1:-1;;;;;678:10768:128;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1174:235:77;1365:20;;678:10768:128;;;;;;;;;;;;;1397:4:77;1365:37;1174:235;:::o;612:261:76:-;-1:-1:-1;;;;;353:25:76;;;678:10768:128;;353:30:76;;;:89;;;;612:261;721:55;;;569:25;;678:10768:128;-1:-1:-1;;;;;678:10768:128;786:58:76;;862:4;612:261;:::o;786:58::-;824:20;;;-1:-1:-1;824:20:76;;-1:-1:-1;824:20:76;721:55;759:17;;;-1:-1:-1;759:17:76;;-1:-1:-1;759:17:76;353:89;427:15;;;-1:-1:-1;353:89:76;;;678:10768:128;;;;;;;;;;;;;;;:::o;8685:1376::-;8862:19;;;;;;678:10768;8862:19;8891:18;;;;;678:10768;-1:-1:-1;8858:84:128;;678:10768;9000:3;8973:18;;678:10768;8969:29;;;;;9040:19;;-1:-1:-1;;;;;678:10768:128;9040:22;;:19;;:22;:::i;:::-;678:10768;;;;;;;9066:21;:18;;;:21;:::i;:::-;678:10768;;9040:47;;;:115;;;9000:3;9019:163;;678:10768;;8957:10;;9019:163;9170:12;;;;;678:10768;9170:12;:::o;9040:115::-;9107:20;:23;:20;;;;;:23;:::i;:::-;678:10768;9133:22;:19;9107:20;9133:19;;;:22;:::i;:::-;678:10768;-1:-1:-1;9040:115:128;;8969:29;;;;;9232:20;;;;;;678:10768;9232:20;9262:19;;;;;678:10768;-1:-1:-1;9228:86:128;;678:10768;9373:3;9345:19;;678:10768;9341:30;;;;;9413:20;;-1:-1:-1;;;;;678:10768:128;9413:23;;:20;;:23;:::i;:::-;678:10768;;;;;;;9440:22;:19;;;:22;:::i;:::-;678:10768;;9413:49;;;:122;;;9373:3;9392:170;;678:10768;;9329:10;;9413:122;9482:22;:25;:22;;;;;:25;:::i;:::-;678:10768;9511:24;:21;9482:22;9511:21;;;:24;:::i;:::-;678:10768;9482:53;;9413:122;;9341:30;;;;;9613:21;;;;;;678:10768;9644:20;9613:21;9644:20;;;;;678:10768;-1:-1:-1;9609:88:128;;678:10768;9757:3;9728:20;;678:10768;9724:31;;;;;9797:21;;-1:-1:-1;;;;;678:10768:128;9797:24;;:21;;:24;:::i;:::-;678:10768;;;;;;;9825:23;:20;;;:23;:::i;:::-;678:10768;;9797:51;;;:126;;;9757:3;9797:198;;;;9757:3;9776:246;;678:10768;;9712:10;;9797:198;9943:22;:25;:22;;;;;:25;:::i;:::-;678:10768;9971:24;:21;9943:22;9971:21;;;:24;:::i;:::-;678:10768;-1:-1:-1;9797:198:128;;:126;9868:23;:26;:23;;;;;:26;:::i;:::-;678:10768;9898:25;:22;9868:23;9898:22;;;:25;:::i;:::-;678:10768;9868:55;;9797:126;;9724:31;;;;;;678:10768;8685:1376;:::o;9609:88::-;9685:12;;;;678:10768;9685:12;:::o;678:10768::-;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;5972:2025::-;;;;6126:1;6158:3;6133:16;;;;;678:10768;;6129:27;;;;;-1:-1:-1;;;;;678:10768:128;6230:19;;678:10768;;6230:19;:::i;:::-;678:10768;;6264:17;6126:1;6223:62;6264:17;;;;6223:62;6264:20;:17;;;:20;:::i;:::-;678:10768;6133:16;678:10768;-1:-1:-1;;;6223:62:128;;-1:-1:-1;;;;;678:10768:128;;6223:62;;;678:10768;;;;;;;;;;;;;;6223:62;;6126:1;;6223:62;;;6158:3;-1:-1:-1;6203:221:128;;6394:15;6126:1;6203:221;6442:8;6438:233;;6158:3;;678:10768;;6117:10;;6438:233;6618:20;678:10768;6477:179;678:10768;6518:19;678:10768;;;;;;;6518:16;;:19;:::i;:::-;678:10768;;6618:17;;:20;:::i;:::-;678:10768;6133:16;678:10768;-1:-1:-1;;;6477:179:128;;678:10768;;;6567:4;;6223:62;6477:179;;;:::i;6203:221::-;;;6223:62;;;;;;;;;;;;;;;;;;:::i;:::-;;;678:10768;;;;;;;:::i;:::-;6223:62;;;;;;;-1:-1:-1;6223:62:128;;6129:27;;;;6126:1;6719:555;6766:3;6740:17;;;;;;678:10768;;6736:28;;;;;-1:-1:-1;;;;;678:10768:128;6813:20;;678:10768;;6813:20;:::i;:::-;678:10768;;6928:19;;;;;:22;:19;;;:22;:::i;:::-;678:10768;6805:163;;;;;;6133:16;678:10768;-1:-1:-1;;;6805:163:128;;6877:4;6223:62;6805:163;;678:10768;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;-1:-1:-1;;678:10768:128;;;;;;-1:-1:-1;;6805:163:128;;;;;;6766:3;-1:-1:-1;6785:479:128;;-1:-1:-1;;7108:17:128;7066:183;;7209:22;;-1:-1:-1;;;;;678:10768:128;7108:20;;678:10768;;7108:20;:::i;7209:22::-;678:10768;6133:16;678:10768;-1:-1:-1;;;7066:183:128;;678:10768;;;6877:4;;6223:62;7066:183;;;:::i;6785:479::-;;-1:-1:-1;678:10768:128;;;;;6785:479;-1:-1:-1;6724:10:128;;6805:163;6126:1;6805:163;;;:::i;:::-;;;;6736:28;;;;;;6126:1;7361:3;7334:18;;;;;678:10768;;7330:29;;;;;-1:-1:-1;;;;;678:10768:128;7409:21;;678:10768;;7409:21;:::i;:::-;678:10768;;7529:20;678:10768;7529:20;;;:23;:20;;;:23;:::i;:::-;678:10768;7574:19;;;;;:22;:19;;;:22;:::i;:::-;678:10768;7400:238;;;;;6133:16;678:10768;-1:-1:-1;;;7400:238:128;;6877:4;6223:62;7400:238;;678:10768;-1:-1:-1;;;;;678:10768:128;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;678:10768:128;;;;;;;;;;;;;;-1:-1:-1;;7400:238:128;;;;;;7361:3;-1:-1:-1;7380:601:128;;678:10768;;;7881:23;678:10768;7926:22;678:10768;7779:21;7736:230;678:10768;;;;;;;7779:18;;:21;:::i;:::-;678:10768;;7881:20;;:23;:::i;7926:22::-;678:10768;6133:16;678:10768;-1:-1:-1;;;7736:230:128;;-1:-1:-1;;;;;678:10768:128;;;6223:62;7736:230;;678:10768;6877:4;678:10768;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7380:601;;-1:-1:-1;7380:601:128;-1:-1:-1;;678:10768:128;;7318:10;;7400:238;6126:1;7400:238;;;:::i;:::-;;;;7330:29;;;;;;;5972:2025::o",
    linkReferences: {},
    immutableReferences: {
      "2532": [
        {
          start: 3016,
          length: 32,
        },
      ],
      "2534": [
        {
          start: 3059,
          length: 32,
        },
      ],
      "2536": [
        {
          start: 3102,
          length: 32,
        },
      ],
      "3008": [
        {
          start: 9308,
          length: 32,
        },
      ],
      "54658": [
        {
          start: 2634,
          length: 32,
        },
      ],
      "54661": [
        {
          start: 1542,
          length: 32,
        },
        {
          start: 2325,
          length: 32,
        },
        {
          start: 5715,
          length: 32,
        },
        {
          start: 8761,
          length: 32,
        },
      ],
      "54663": [
        {
          start: 1606,
          length: 32,
        },
        {
          start: 2584,
          length: 32,
        },
        {
          start: 2950,
          length: 32,
        },
        {
          start: 6194,
          length: 32,
        },
        {
          start: 7353,
          length: 32,
        },
        {
          start: 8588,
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
    "doObligation((address,bytes,address[],uint256[],address[],uint256[],address[],uint256[],uint256[]),uint64)":
      "cd181c49",
    "doObligationFor((address,bytes,address[],uint256[],address[],uint256[],address[],uint256[],uint256[]),uint64,address,address)":
      "bca73d64",
    "doObligationForRaw(bytes,uint64,address,address,bytes32)": "f0ffa185",
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
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IEAS","name":"_eas","type":"address"},{"internalType":"contract ISchemaRegistry","name":"_schemaRegistry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"ArrayLengthMismatch","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"AttestationNotFound","type":"error"},{"inputs":[],"name":"AttestationRevoked","type":"error"},{"inputs":[],"name":"DeadlineExpired","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC1155TransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC20TransferFailed","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721TransferFailed","type":"error"},{"inputs":[],"name":"InsufficientValue","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"InvalidEscrowAttestation","type":"error"},{"inputs":[],"name":"InvalidFulfillment","type":"error"},{"inputs":[],"name":"InvalidLength","type":"error"},{"inputs":[],"name":"InvalidSchema","type":"error"},{"inputs":[],"name":"NotFromThisAttester","type":"error"},{"inputs":[],"name":"NotPayable","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"RevocationFailed","type":"error"},{"inputs":[],"name":"UnauthorizedCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"fulfillment","type":"bytes32"},{"indexed":true,"internalType":"address","name":"fulfiller","type":"address"}],"name":"EscrowCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"EscrowMade","type":"event"},{"inputs":[],"name":"ATTESTATION_SCHEMA","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"attest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"escrow","type":"bytes32"},{"internalType":"bytes32","name":"fulfillment","type":"bytes32"}],"name":"collectEscrow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_escrow","type":"bytes32"},{"internalType":"bytes32","name":"_fulfillment","type":"bytes32"}],"name":"collectEscrowRaw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"}],"name":"doObligation","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"recipient","type":"address"}],"name":"doObligationFor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationForRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"extractArbiterAndDemand","outputs":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address[]","name":"erc20Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc20Amounts","type":"uint256[]"},{"internalType":"address[]","name":"erc721Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc721TokenIds","type":"uint256[]"},{"internalType":"address[]","name":"erc1155Tokens","type":"address[]"},{"internalType":"uint256[]","name":"erc1155TokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"erc1155Amounts","type":"uint256[]"}],"internalType":"struct TokenBundleEscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSchema","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"internalType":"struct SchemaRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiAttest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiRevoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"reclaimExpired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"revoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}],"devdoc":{"kind":"dev","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The new attestation."},"returns":{"_0":"Whether the attestation is valid."}},"isPayable()":{"returns":{"_0":"Whether the resolver supports ETH transfers."}},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The new attestations.","values":"Explicit ETH amounts which were sent with each attestation."},"returns":{"_0":"Whether all the attestations are valid."}},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The existing attestations to be revoked.","values":"Explicit ETH amounts which were sent with each revocation."},"returns":{"_0":"Whether the attestations can be revoked."}},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The existing attestation to be revoked."},"returns":{"_0":"Whether the attestation can be revoked."}},"supportsInterface(bytes4)":{"details":"See {IERC165-supportsInterface}."},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"version":1},"userdoc":{"kind":"user","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation and verifies whether it\'s valid."},"isPayable()":{"notice":"Checks if the resolver can be sent ETH."},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes multiple attestations and verifies whether they are valid."},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes revocation of multiple attestation and verifies they can be revoked."},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation revocation and verifies if it can be revoked."},"version()":{"notice":"Returns the full semver contract version."}},"version":1}},"settings":{"compilationTarget":{"src/obligations/TokenBundleEscrowObligation.sol":"TokenBundleEscrowObligation"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol":{"keccak256":"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7","license":"MIT","urls":["bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746","dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol":{"keccak256":"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7","license":"MIT","urls":["bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce","dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol":{"keccak256":"0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50","license":"MIT","urls":["bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd","dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4","license":"MIT","urls":["bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009","dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"]},"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol":{"keccak256":"0xe0e3a2099f2e2ce3579dd35548f613928739642058dfec95b1745f93364ce3de","license":"MIT","urls":["bzz-raw://36a3930518e5c4a3c83839aaa136b863af513e6eeee6a3654e8f910f8007f827","dweb:/ipfs/QmcU1b6SYYUMiXJ6jd5HY6sgYjJLdBu4smak1X1FDgkoaA"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol":{"keccak256":"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e","license":"MIT","urls":["bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9","dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf"]},"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol":{"keccak256":"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c","license":"MIT","urls":["bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e","dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab","license":"UNLICENSED","urls":["bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12","dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit"]},"src/BaseAttester.sol":{"keccak256":"0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa","license":"UNLICENSED","urls":["bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084","dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa"]},"src/BaseEscrowObligation.sol":{"keccak256":"0x79f2b634467f60d2599566052d187ab570b5a5abb7d9ad4fb9608b10f1feb09c","license":"UNLICENSED","urls":["bzz-raw://c95fd69af07d9a26edf7c59fa8269bdd8958a41f2dd9de7e5ad2985198a69724","dweb:/ipfs/QmSWC22iabz1xHqsqqfm6exuk5VghGGrco4A1wGTSnsdBb"]},"src/BaseObligationNew.sol":{"keccak256":"0xb6f62aaa01bbb8c7d87a4437b466e5e95e9d6086626b780f367d3071ee20e8be","license":"UNLICENSED","urls":["bzz-raw://9216c00ddf06a890e591fc21969211be2b7a98aba8615021dd26352af5f472bc","dweb:/ipfs/Qmbc2MAT1DaT2e5Ue3PzjJmQRKb2CMNcB7YCPdjHS2Fjtc"]},"src/IArbiter.sol":{"keccak256":"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab","license":"UNLICENSED","urls":["bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038","dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff"]},"src/obligations/TokenBundleEscrowObligation.sol":{"keccak256":"0xd2079b67055a91767f04e42cc89265ca238454fb4ea4bedb49c73ef3bdff925f","license":"UNLICENSED","urls":["bzz-raw://a4542a4268e2720db043bb6523dfcdf7213beb37e6c358351e2a09d9dedf8e0d","dweb:/ipfs/QmTY3VvoUGrB8HauME4GFt6QksBp8SzpEmFnFviUqUkcFm"]}},"version":1}',
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
          stateMutability: "nonpayable",
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
              name: "payer",
              type: "address",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
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
              internalType: "address",
              name: "payer",
              type: "address",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "refUID",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "doObligationForRaw",
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
          stateMutability: "nonpayable",
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
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
      ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: "ipfs",
      },
      compilationTarget: {
        "src/obligations/TokenBundleEscrowObligation.sol": "TokenBundleEscrowObligation",
      },
      evmVersion: "cancun",
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
        keccak256: "0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab",
        urls: [
          "bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12",
          "dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit",
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
        keccak256: "0x79f2b634467f60d2599566052d187ab570b5a5abb7d9ad4fb9608b10f1feb09c",
        urls: [
          "bzz-raw://c95fd69af07d9a26edf7c59fa8269bdd8958a41f2dd9de7e5ad2985198a69724",
          "dweb:/ipfs/QmSWC22iabz1xHqsqqfm6exuk5VghGGrco4A1wGTSnsdBb",
        ],
        license: "UNLICENSED",
      },
      "src/BaseObligationNew.sol": {
        keccak256: "0xb6f62aaa01bbb8c7d87a4437b466e5e95e9d6086626b780f367d3071ee20e8be",
        urls: [
          "bzz-raw://9216c00ddf06a890e591fc21969211be2b7a98aba8615021dd26352af5f472bc",
          "dweb:/ipfs/Qmbc2MAT1DaT2e5Ue3PzjJmQRKb2CMNcB7YCPdjHS2Fjtc",
        ],
        license: "UNLICENSED",
      },
      "src/IArbiter.sol": {
        keccak256: "0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab",
        urls: [
          "bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038",
          "dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff",
        ],
        license: "UNLICENSED",
      },
      "src/obligations/TokenBundleEscrowObligation.sol": {
        keccak256: "0xd2079b67055a91767f04e42cc89265ca238454fb4ea4bedb49c73ef3bdff925f",
        urls: [
          "bzz-raw://a4542a4268e2720db043bb6523dfcdf7213beb37e6c358351e2a09d9dedf8e0d",
          "dweb:/ipfs/QmTY3VvoUGrB8HauME4GFt6QksBp8SzpEmFnFviUqUkcFm",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 128,
} as const;
