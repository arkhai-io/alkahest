export const abi = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_eas",
          "type": "address",
          "internalType": "contract IEAS"
        },
        {
          "name": "_schemaRegistry",
          "type": "address",
          "internalType": "contract ISchemaRegistry"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "ATTESTATION_SCHEMA",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "MAX_BUNDLE_ITEMS",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "attest",
      "inputs": [
        {
          "name": "attestation",
          "type": "tuple",
          "internalType": "struct Attestation",
          "components": [
            {
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "time",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "expirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "revocationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "refUID",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "recipient",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "attester",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "checkObligation",
      "inputs": [
        {
          "name": "obligation",
          "type": "tuple",
          "internalType": "struct Attestation",
          "components": [
            {
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "time",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "expirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "revocationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "refUID",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "recipient",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "attester",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "demand",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "collectEscrow",
      "inputs": [
        {
          "name": "escrow",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "fulfillment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "collectEscrowRaw",
      "inputs": [
        {
          "name": "_escrow",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "_fulfillment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "decodeObligationData",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct TokenBundleEscrowObligation.ObligationData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "nativeAmount",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "erc20Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc20Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc721Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc721TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc1155TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "doObligation",
      "inputs": [
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct TokenBundleEscrowObligation.ObligationData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "nativeAmount",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "erc20Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc20Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc721Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc721TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc1155TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            }
          ]
        },
        {
          "name": "expirationTime",
          "type": "uint64",
          "internalType": "uint64"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "doObligationFor",
      "inputs": [
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct TokenBundleEscrowObligation.ObligationData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "nativeAmount",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "erc20Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc20Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc721Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc721TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc1155TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            }
          ]
        },
        {
          "name": "expirationTime",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "doObligationRaw",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "expirationTime",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "refUID",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "uid_",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "extractArbiterAndDemand",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "arbiter",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "demand",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "getObligationData",
      "inputs": [
        {
          "name": "uid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct TokenBundleEscrowObligation.ObligationData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "nativeAmount",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "erc20Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc20Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc721Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc721TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Tokens",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "erc1155TokenIds",
              "type": "uint256[]",
              "internalType": "uint256[]"
            },
            {
              "name": "erc1155Amounts",
              "type": "uint256[]",
              "internalType": "uint256[]"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getSchema",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct SchemaRecord",
          "components": [
            {
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "resolver",
              "type": "address",
              "internalType": "contract ISchemaResolver"
            },
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "schema",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isPayable",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "multiAttest",
      "inputs": [
        {
          "name": "attestations",
          "type": "tuple[]",
          "internalType": "struct Attestation[]",
          "components": [
            {
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "time",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "expirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "revocationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "refUID",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "recipient",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "attester",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "values",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "multiRevoke",
      "inputs": [
        {
          "name": "attestations",
          "type": "tuple[]",
          "internalType": "struct Attestation[]",
          "components": [
            {
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "time",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "expirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "revocationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "refUID",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "recipient",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "attester",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "values",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "onERC1155BatchReceived",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "onERC1155Received",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "reclaimExpired",
      "inputs": [
        {
          "name": "uid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revoke",
      "inputs": [
        {
          "name": "attestation",
          "type": "tuple",
          "internalType": "struct Attestation",
          "components": [
            {
              "name": "uid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "time",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "expirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "revocationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "refUID",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "recipient",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "attester",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "unsafePartiallyCollectEscrow",
      "inputs": [
        {
          "name": "_escrow",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "_fulfillment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "unsafePartiallyReclaimExpired",
      "inputs": [
        {
          "name": "uid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "version",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "ERC1155TransferFailedOnRelease",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ERC20TransferFailedOnRelease",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ERC721TransferFailedOnRelease",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "EscrowCollected",
      "inputs": [
        {
          "name": "escrow",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "fulfillment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "fulfiller",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "EscrowMade",
      "inputs": [
        {
          "name": "escrow",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "buyer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "NativeTokenTransferFailedOnRelease",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AccessDenied",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ArrayLengthMismatch",
      "inputs": []
    },
    {
      "type": "error",
      "name": "AttestationNotFound",
      "inputs": [
        {
          "name": "attestationId",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "AttestationRevoked",
      "inputs": []
    },
    {
      "type": "error",
      "name": "DeadlineExpired",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ERC1155TransferFailed",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC20TransferFailed",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721TransferFailed",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "IncorrectPayment",
      "inputs": [
        {
          "name": "expected",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "received",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "InsufficientValue",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidAttestationUid",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidEAS",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidEscrowAttestation",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidFulfillment",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidLength",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NativeTokenTransferFailed",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "NotFromThisAttester",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotPayable",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ReentrancyGuardReentrantCall",
      "inputs": []
    },
    {
      "type": "error",
      "name": "RevocationFailed",
      "inputs": [
        {
          "name": "attestationId",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "SchemaRegistrationFailed",
      "inputs": [
        {
          "name": "uid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "TooManyBundleItems",
      "inputs": [
        {
          "name": "provided",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "max",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "UnauthorizedCall",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x610160806040523461029e576040816146d1803803809161002082856102a2565b83398101031261029e5780516001600160a01b0381169182820361029e5760200151916001600160a01b0383169081840361029e57610120936040519161006786846102a2565b60e283527f6164647265737320617262697465722c2062797465732064656d616e642c207560208401527f696e74323536206e6174697665416d6f756e742c20616464726573735b5d206560408401527f72633230546f6b656e732c2075696e743235365b5d206572633230416d6f756e60608401527f74732c20616464726573735b5d20657263373231546f6b656e732c2075696e7460808401527f3235365b5d20657263373231546f6b656e4964732c20616464726573735b5d2060a08401527f65726331313535546f6b656e732c2075696e743235365b5d206572633131353560c08401527f546f6b656e4964732c2075696e743235365b5d2065726331313535416d6f756e60e084015261747360f01b6101008401526001608052600360a0525f60c0521561028f57836101a99460e05285526101005230916103bd565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055604051614138918261059983396080518261170c015260a05182611738015260c05182611763015260e0518261390b0152610100518261151001525181818161057b01528181610fb30152818161115c015281816113b7015281816118f70152818161265901528181612aba015261380f0152610140518181816105bb01528181610f060152818161110d01528181611368015281816114de0152818161165f01528181611849015281816125ab0152818161286d01526137620152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b038211908210176102c557604052565b634e487b7160e01b5f52604160045260245ffd5b60208183031261029e578051906001600160401b03821161029e57019060808282031261029e5760405191608083016001600160401b038111848210176102c5576040528051835260208101516001600160a01b038116810361029e5760208401526040810151801515810361029e5760408401526060810151906001600160401b03821161029e570181601f8201121561029e578051906001600160401b0382116102c55760405192610397601f8401601f1916602001856102a2565b8284526020838301011161029e57815f9260208093018386015e83010152606082015290565b929160405190602082018351926104076015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a198101845201826102a2565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156105185787915f9161057e575b505114610578579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610544575b5061052357505f602491604051928380926351753e3760e11b82528760048301525afa80156105185783915f916104f6575b5051146104f45750639e6113d560e01b5f5260045260245ffd5b565b61051291503d805f833e61050a81836102a2565b8101906102d9565b5f6104da565b6040513d5f823e3d90fd5b91928091508203610532575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d602011610570575b81610560602093836102a2565b8101031261029e5751905f6104a8565b3d9150610553565b50505050565b61059291503d805f833e61050a81836102a2565b5f61044256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714611a85575080630fcec5b11461181657806311453bb7146117fa5780632c713cd9146117dc57806354fd4d50146116eb57806355b0769b146116825780635bf2f20d146116475780636b122fe01461149d5780637d2c2931146113395780638371ef59146112da57806388e5b2d91461128c578063891d9ea8146112ab57806391db0b7e1461128c57806397524016146110de578063b3b902d4146106dc578063bc197c8114610646578063c6ec50701461053a578063c93844be14610377578063ce46e0461461035b578063cf84e82c146102d5578063e49617e1146102ba578063e60c3505146102ba578063e6c9714d146101935763f23a6e610361000f57346101905760a036600319011261019057610152611cfa565b5061015b611d10565b506084356001600160401b03811161018e5761017b903690600401611c2f565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461019057606036600319011261019057600435906001600160401b03821161019057610140600319833603011261019057604051916101d383611b86565b80600401358352602481013560208401526101f060448201611b28565b604084015261020160648201611b28565b606084015261021260848201611b28565b608084015260a481013560a084015261022d60c48201611d26565b60c084015261023e60e48201611d26565b60e084015261010481013580151581036102b6576101008401526101248101356001600160401b0381116102b65761027b91369101600401611c2f565b610120830152602435906001600160401b0382116101905760206102ac846102a63660048701611c2f565b90612866565b6040519015158152f35b8280fd5b60206102ac6102c836611f0a565b6102d0613909565b61394a565b506060366003190112610190576004356001600160401b03811161018e57610140600319823603011261018e5761030a611b12565b604435929091906001600160a01b0384168403610190576020610353858561034061034e876040519283916004018883016120a5565b03601f198101835282611bbd565b6130bf565b604051908152f35b5034610190578060031936011261019057602090604051908152f35b5034610190576020366003190112610190576004356001600160401b03811161018e576103a8903690600401611ccd565b6103b39291926127b7565b5082019160208184031261018e578035906001600160401b0382116102b65701906101408284031261019057604051916103ec83611b86565b6103f581611d26565b835260208101356001600160401b0381116102b65784610416918301611c2f565b60208401526040810135604084015260608101356001600160401b0381116102b65784610444918301612801565b606084015260808101356001600160401b0381116102b65784610468918301611d51565b608084015260a08101356001600160401b0381116102b6578461048c918301612801565b60a084015260c08101356001600160401b0381116102b657846104b0918301611d51565b60c084015260e08101356001600160401b0381116102b657846104d4918301612801565b60e08401526101008101356001600160401b0381116102b657846104f9918301611d51565b610100840152610120810135916001600160401b038311610190575092610524916105369401611d51565b61012082015260405191829182611e1d565b0390f35b5034610190576020366003190112610190576105546127b7565b5061055d612964565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610639578192610615575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610606576105366105fa6101208401516020808251830101910161234b565b60405191829182611e1d565b635527981560e11b8152600490fd5b6106329192503d8084833e61062a8183611bbd565b8101906129c2565b905f6105b3565b50604051903d90823e3d90fd5b50346101905760a036600319011261019057610660611cfa565b50610669611d10565b506044356001600160401b03811161018e57610689903690600401611d51565b506064356001600160401b03811161018e576106a9903690600401611d51565b506084356001600160401b03811161018e576106c9903690600401611c2f565b5060405163bc197c8160e01b8152602090f35b506060366003190112610190576004356001600160401b03811161018e579061070c61071e923690600401611ccd565b9290610716611b12565b933691611bf9565b9161072761292c565b61073a602084518501016020850161234b565b916060830191825151946080850195865151036110cf5760a08501908151519160c0870192835151036110c05760e0870191825151946101008901958651518114908115916110af575b506110a0576107a461079b89515185515190614096565b85515190614096565b60328111611089575060408901518061106c575b50865b885180518210156109bb576024906020906001600160a01b03906107e0908590613e5f565b5116604051928380926370a0823160e01b82523060048301525afa80156109b057899061097e575b602491508c61082d848d6108248260018060a01b039251613e5f565b51169251613e5f565b5190604051916323b872dd60e01b8d523360045230855260445260208c60648180855af19060018d5114821615610971575b50906040528a60605260208c61087d8660018060a01b039251613e5f565b5116604051948580926370a0823160e01b82523060048301525afa928315610966578e93929185918d9461092a575b5015938415610908575b505050506108c6576001016107bb565b88518b916108e2916001600160a01b0390610824908390613e5f565b51604051634a73404560e11b81529182916109049130903390600486016140b7565b0390fd5b610920939450906109199151613e5f565b5190614096565b115f80838e6108b6565b94509250506020833d821161095e575b8161094760209383611bbd565b8101031261095a57838e9351925f6108ac565b5f80fd5b3d915061093a565b6040513d8d823e3d90fd5b3b15153d1516165f61085f565b506020813d82116109a8575b8161099760209383611bbd565b8101031261095a5760249051610808565b3d915061098a565b6040513d8b823e3d90fd5b505085929187918a83955b85518051881015610c1b576001600160a01b03906109e5908990613e5f565b511660206109f4898c51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115610c10578691610bd7575b50336001600160a01b0390911603610bbf5785516001600160a01b0390610a45908990613e5f565b5116610a52888b51613e5f565b51813b15610b8f576040516323b872dd60e01b8152336004820152306024820152604481019190915290869081908390606490829084905af19182610ba6575b5050610ad25788610ab088886108248260018060a01b039251613e5f565b5160405163045b391760e01b81529182916109049130903390600486016140b7565b90919293949560018060a01b03610aea828951613e5f565b51166020610af9838c51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115610b9b578791610b5e575b50306001600160a01b0390911603610b42576001019594939291906109c6565b86518991610ab0916001600160a01b0390610824908390613e5f565b90506020813d8211610b93575b81610b7860209383611bbd565b81010312610b8f57610b899061225b565b8a610b22565b8680fd5b3d9150610b6b565b6040513d89823e3d90fd5b81610bb091611bbd565b610bbb57858b610a92565b8580fd5b88610ab088886108248260018060a01b039251613e5f565b90506020813d8211610c08575b81610bf160209383611bbd565b81010312610bbb57610c029061225b565b8a610a1d565b3d9150610be4565b6040513d88823e3d90fd5b509087849386610120819401955b83518051861015610ebc57610c86906020906001600160a01b0390610c4f908990613e5f565b5116610c5c888a51613e5f565b51604051627eeac760e11b8152306004820152602481019190915292839190829081906044820190565b03915afa908115610eb1578391610e80575b5084516001600160a01b0390610caf908890613e5f565b5116610cbc878951613e5f565b5190610cc9888b51613e5f565b5191813b15610bbb57610cf9928692839283604051809781958294637921219560e11b845230336004860161405e565b03925af19182610e67575b5050610d7f578787610904610d3b89610d33818b610d2a8260018060a01b039251613e5f565b51169551613e5f565b519451613e5f565b5160405163334a7d1b60e21b81526001600160a01b0390931660048401523360248401523060448401526064830193909352608482019290925290819060a4820190565b610dd490969591929396602060018060a01b03610d9d858951613e5f565b5116610daa858a51613e5f565b51604051627eeac760e11b8152306004820152602481019190915293849190829081906044820190565b03915afa918215610e5c578592610e27575b50610df690610919848b51613e5f565b11610e075760010193949190610c29565b84610904610d3b83610d338189610d2a8e9860018060a01b039251613e5f565b9091506020813d8211610e54575b81610e4260209383611bbd565b8101031261095a575190610df6610de6565b3d9150610e35565b6040513d87823e3d90fd5b81610e7191611bbd565b610e7c57838a610d04565b8380fd5b90506020813d8211610ea9575b81610e9a60209383611bbd565b8101031261095a575188610c98565b3d9150610e8d565b6040513d85823e3d90fd5b50604051906001600160401b0384610ed384611ba2565b33845216602083015260016040830152604435606083015260808201528160a08201526020604051610f0481611b3c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610fa5608083015160c060e4860152610124850190611aee565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190811561106157829161102e575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206140e35f395f51905f5255604051908152f35b90506020813d602011611059575b8161104960209383611bbd565b8101031261018e57516020610feb565b3d915061103c565b6040513d84823e3d90fd5b3481146107b857630d35e92160e01b885260045234602452604487fd5b6325b198a560e21b88526004526032602452604487fd5b63512509d360e11b8752600487fd5b90506101208a01515114155f610784565b63512509d360e11b8552600485fd5b63512509d360e11b8352600483fd5b503461019057602036600319011261019057600435906110fc61292c565b61110582612a94565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316919061118f81611b3c565b838152846020820152604051916111a583611b3c565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af1918261124a575b505061120d5763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690612be3565b5060015f5160206140e35f395f51905f5255602060405160018152f35b8161125491611bbd565b6102b657825f6111f4565b637bf6a16f60e01b8352600483fd5b637bf6a16f60e01b8452600484fd5b63629cd40b60e11b8352600483fd5b60206102ac61129a36611c7d565b926112a6929192613909565b6124e2565b5034610190576105366112c66112c036611ad8565b90612586565b604051918291602083526020830190611aee565b503461019057602036600319011261019057600435906001600160401b0382116101905761131361130e3660048501611c2f565b6124b9565b604080516001600160a01b03909316835260208301819052829161053691830190611aee565b5034610190576020366003190112610190576004359061135761292c565b61136082612a94565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691906113ea81611b3c565b8381528460208201526040519161140083611b3c565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af19182611488575b50506114685763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690613963565b8161149291611bbd565b6102b657825f61144f565b50346101905780600319360112610190576060806040516114bd81611b6b565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561163b578091611586575b606082610536604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190611aee565b90503d8082843e6115978184611bbd565b82019160208184031261018e578051906001600160401b0382116102b657019060808284031261019057604051916115ce83611b6b565b8051835260208101516001600160a01b03811681036102b65760208401526115f860408201611f3e565b60408401526060810151906001600160401b0382116102b657019083601f83011215610190575060609281602061163193519101612225565b828201525f611540565b604051903d90823e3d90fd5b503461019057806003193601126101905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50604036600319011261019057600435906001600160401b0382116101905761014060031983360301126101905760206103536116d6846116e46116c4611b12565b916040519384916004018783016120a5565b03601f198101845283611bbd565b33916130bf565b503461019057806003193601126101905760206112c66001610536936117307f0000000000000000000000000000000000000000000000000000000000000000612f52565b90828561175c7f0000000000000000000000000000000000000000000000000000000000000000612f52565b81806117877f0000000000000000000000000000000000000000000000000000000000000000612f52565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282611bbd565b5034610190576117ee6112c036611ad8565b50602060405160018152f35b5034610190578060031936011261019057602060405160328152f35b503461095a5761182536611ad8565b919061182f61292c565b61183881612a94565b9261184281612a94565b60208501517f0000000000000000000000000000000000000000000000000000000000000000809103611a765761187886612b42565b15611a765761012086019561188d87516124b9565b60a0859392930151825103611a22576118a585612b42565b15611a2257905160405163e6c9714d60e01b8152926020928492839182916118d1918a60048501611f4b565b03916001600160a01b03165afa908115611a6b575f91611a31575b5015611a22576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061192981611b3c565b8581525f60208201526040519261193f84611b3c565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081611a0d575b506119a45763614cf93960e01b84526004839052602484fd5b935160c090940180516020956119c3916001600160a01b031690612be3565b5060018060a01b03905116917ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c06040519480a460015f5160206140e35f395f51905f525560018152f35b611a1a9195505f90611bbd565b5f935f61198b565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611a63575b81611a4c60209383611bbd565b8101031261095a57611a5d90611f3e565b5f6118ec565b3d9150611a3f565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b3461095a57602036600319011261095a576004359063ffffffff60e01b821680920361095a57602091630271189760e51b8114908115611ac7575b5015158152f35b6301ffc9a760e01b14905083611ac0565b604090600319011261095a576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602435906001600160401b038216820361095a57565b35906001600160401b038216820361095a57565b604081019081106001600160401b03821117611b5757604052565b634e487b7160e01b5f52604160045260245ffd5b608081019081106001600160401b03821117611b5757604052565b61014081019081106001600160401b03821117611b5757604052565b60c081019081106001600160401b03821117611b5757604052565b90601f801991011681019081106001600160401b03821117611b5757604052565b6001600160401b038111611b5757601f01601f191660200190565b929192611c0582611bde565b91611c136040519384611bbd565b82948184528183011161095a578281602093845f960137010152565b9080601f8301121561095a57816020611c4a93359101611bf9565b90565b9181601f8401121561095a578235916001600160401b03831161095a576020808501948460051b01011161095a57565b604060031982011261095a576004356001600160401b03811161095a5781611ca791600401611c4d565b92909291602435906001600160401b03821161095a57611cc991600401611c4d565b9091565b9181601f8401121561095a578235916001600160401b03831161095a576020838186019501011161095a57565b600435906001600160a01b038216820361095a57565b602435906001600160a01b038216820361095a57565b35906001600160a01b038216820361095a57565b6001600160401b038111611b575760051b60200190565b9080601f8301121561095a578135611d6881611d3a565b92611d766040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b828210611d9e5750505090565b8135815260209182019101611d91565b90602080835192838152019201905f5b818110611dcb5750505090565b82516001600160a01b0316845260209384019390920191600101611dbe565b90602080835192838152019201905f5b818110611e075750505090565b8251845260209384019390920191600101611dfa565b90611c4a916020815260018060a01b038251166020820152610120611ef4611ede611ec7611eb1611e9b611e85611e6560208a015161014060408b01526101608a0190611aee565b60408a015160608a015260608a0151601f198a83030160808b0152611dae565b6080890151888203601f190160a08a0152611dea565b60a0880151878203601f190160c0890152611dae565b60c0870151868203601f190160e0880152611dea565b60e0860151858203601f1901610100870152611dae565b610100850151848203601f190184860152611dea565b92015190610140601f1982850301910152611dea565b602060031982011261095a57600435906001600160401b03821161095a5761014090829003600319011261095a5760040190565b5190811515820361095a57565b93929161200990611ffb61012060409460608952805160608a0152602081015160808a01526001600160401b03868201511660a08a01526001600160401b0360608201511660c08a01526001600160401b0360808201511660e08a015260a08101516101008a015260018060a01b0360c082015116828a015260018060a01b0360e0820151166101408a015261010081015115156101608a015201516101406101808901526101a0880190611aee565b908682036020880152611aee565b930152565b9035601e198236030181121561095a5701602081359101916001600160401b03821161095a578160051b3603831361095a57565b916020908281520191905f5b81811061205b5750505090565b909192602080600192838060a01b0361207388611d26565b16815201940192910161204e565b81835290916001600160fb1b03831161095a5760209260051b809284830137010190565b60208152906001600160a01b036120bb82611d26565b1660208301526020810135601e198236030181121561095a578101916020833593016001600160401b03841161095a57833603811361095a576122066121e56121c56121a661218761216889611c4a9a6122129861014060408c0152816101608c01526101808b01375f610180828b010152601f8019910116880160408a013560608a015261018061215060608c018c61200e565b919092601f19828d8303010160808d01520191612042565b61217560808a018a61200e565b898303601f190160a08b015290612081565b61219460a089018961200e565b888303601f190160c08a015290612042565b6121b360c088018861200e565b878303601f190160e089015290612081565b6121d260e087018761200e565b868303601f190161010088015290612042565b6121f361010086018661200e565b858303601f190161012087015290612081565b9261012081019061200e565b91610140601f1982860301910152612081565b92919261223182611bde565b9161223f6040519384611bbd565b82948184528183011161095a578281602093845f96015e010152565b51906001600160a01b038216820361095a57565b9080601f8301121561095a578151611c4a92602001612225565b9080601f8301121561095a5781516122a081611d3a565b926122ae6040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b8282106122d65750505090565b602080916122e38461225b565b8152019101906122c9565b9080601f8301121561095a57815161230581611d3a565b926123136040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b82821061233b5750505090565b815181526020918201910161232e565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a576040519161237f83611b86565b6123888261225b565b835260208201516001600160401b03811161095a57816123a991840161226f565b60208401526040820151604084015260608201516001600160401b03811161095a57816123d7918401612289565b606084015260808201516001600160401b03811161095a57816123fb9184016122ee565b608084015260a08201516001600160401b03811161095a578161241f918401612289565b60a084015260c08201516001600160401b03811161095a57816124439184016122ee565b60c084015260e08201516001600160401b03811161095a5781612467918401612289565b60e08401526101008201516001600160401b03811161095a578161248c9184016122ee565b6101008401526101208201516001600160401b03811161095a576124b092016122ee565b61012082015290565b6124cc906020808251830101910161234b565b80516020909101516001600160a01b0390911691565b929092818403612577575f91345b8584101561256c5781841015612558578360051b80860135908282116125495784013561013e198536030181121561095a5761252d90850161394a565b1561253e57600191039301926124f0565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b61258e61292c565b5f9161259982612a94565b906125a381612a94565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103611a76576125da82612b42565b15611a76576101208201916125ef83516124b9565b60a0879392930151825103611a225761260787612b42565b15611a2257905160405163e6c9714d60e01b815292602092849283918291612633918c60048501611f4b565b03916001600160a01b03165afa908115611a6b575f9161277d575b5015611a22576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061268b81611b3c565b8681525f6020820152604051926126a184611b3c565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081612768575b506127065763614cf93960e01b85526004849052602485fd5b61274660c07ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09296959394965196019560018060a01b0387511690613963565b94516001600160a01b03169380a49060015f5160206140e35f395f51905f5255565b6127759196505f90611bbd565b5f945f6126ed565b90506020813d6020116127af575b8161279860209383611bbd565b8101031261095a576127a990611f3e565b5f61264e565b3d915061278b565b604051906127c482611b86565b6060610120835f81528260208201525f604082015282808201528260808201528260a08201528260c08201528260e0820152826101008201520152565b9080601f8301121561095a57813561281881611d3a565b926128266040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b82821061284e5750505090565b6020809161285b84611d26565b815201910190612841565b60208101517f000000000000000000000000000000000000000000000000000000000000000003612926576128ac6101206128bc9201516020808251830101910161234b565b916020808251830101910161234b565b6040820151604082015111159182612914575b826128fb575b826128df57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506128d5565b91506129208183613e73565b916128cf565b50505f90565b60025f5160206140e35f395f51905f5254146129555760025f5160206140e35f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b6040519061297182611b86565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361095a57565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a57604051916129f683611b86565b8151835260208201516020840152612a10604083016129ae565b6040840152612a21606083016129ae565b6060840152612a32608083016129ae565b608084015260a082015160a0840152612a4d60c0830161225b565b60c0840152612a5e60e0830161225b565b60e0840152612a706101008301611f3e565b6101008401526101208201516001600160401b03811161095a576124b0920161226f565b90612a9d612964565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315611a6b575f93612b26575b508251818115918215612b1b575b5050612b095750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f612b00565b612b3b9193503d805f833e61062a8183611bbd565b915f612af2565b805115612ba5576001600160401b036060820151168015159081612b9a575b50612b8b57608001516001600160401b0316612b7c57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f612b61565b635c2c7f8960e01b5f5260045ffd5b3d15612bde573d90612bc582611bde565b91612bd36040519384611bbd565b82523d5f602084013e565b606090565b612bf6906020808251830101910161234b565b6040810180519081612f01575b5090916001600160a01b0381169150608083019060608401905f5b82518051821015612ce957600191906001600160a01b0390612c41908390613e5f565b5116612c4e828751613e5f565b51906040519163a9059cbb60e01b5f528860045260245260205f60448180855af190845f5114821615612cdc575b509060405215612c8d575b01612c1e565b85828060a01b03612c9f838751613e5f565b51167f6a0720b70d5a8914c9378c90e36e760e11a1c79840d56909d7562c7c79654e0b6020612ccf858a51613e5f565b51604051908152a3612c87565b3b15153d1516165f612c7c565b505094939150505f9060a081019060c08101925b82518051821015612dde576001600160a01b0390612d1c908390613e5f565b511690612d2a818651613e5f565b51823b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101919091526001925f908290606490829084905af19081612dce575b50612dc95785828060a01b03612d8a838751613e5f565b51167f0863b761d932722655fba74d8a2c2b32a37c3d52195357bf7b4610ebfc6944e06020612dba858a51613e5f565b51604051908152a35b01612cfd565b612dc3565b5f612dd891611bbd565b5f612d73565b50506101008101925060e081019150610120015f5b82518051821015612ee5576001600160a01b0390612e12908390613e5f565b511690612e20818651613e5f565b5191612e2d828551613e5f565b5192813b1561095a57600193612e5f925f92838d60405196879586948593637921219560e11b8552306004860161405e565b03925af19081612ed5575b50612ed05785828060a01b03612e81838751613e5f565b51167f15fffc8b1069bee41edd748e645887f613b87a2d861ab91a772fc4a11ebe53026040612eb1858a51613e5f565b51612ebd868951613e5f565b5182519182526020820152a35b01612df3565b612eca565b5f612edf91611bbd565b5f612e6a565b5050505050509050604051612efb602082611bbd565b5f815290565b5f80808060018060a01b03881695865af1612f1a612bb4565b50612c035760207ff7c9ce661c79b7ec4fedd33edef0ee43991ab10fc7464e4764925d33e3dfd0bc9151604051908152a25f80612c03565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b82101561309c575b806d04ee2d6d415b85acef8100000000600a921015613081575b662386f26fc1000081101561306d575b6305f5e10081101561305c575b61271081101561304d575b606481101561303f575b1015613034575b600a60216001840193612fd985611bde565b94612fe76040519687611bbd565b808652612ff6601f1991611bde565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561302f57600a9091613001565b505090565b600190910190612fc7565b606460029104930192612fc0565b61271060049104930192612fb6565b6305f5e10060089104930192612fab565b662386f26fc1000060109104930192612f9e565b6d04ee2d6d415b85acef810000000060209104930192612f8e565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612f74565b929091926130cb61292c565b6130de602082518301016020830161234b565b926060840192835151956080860196875151036138e95760a08601908151519360c0880194855151036138e95760e08801978851516101008201908151518114908115916138f8575b506138e95761314761313e8a515187515190614096565b8b515190614096565b603281116138d257506040820151806138b5575b505f5b89518051821015613311576024906020906001600160a01b0390613183908590613e5f565b5116604051928380926370a0823160e01b82523060048301525afa908115611a6b575f916132e0575b508c6131c5838d6108248260018060a01b039251613e5f565b5191604051926323b872dd60e01b5f52336004523060245260445260205f60648180865af19160015f51148316156132cf575b50602491926040525f60605260208d6132198660018060a01b039251613e5f565b5116604051938480926370a0823160e01b82523060048301525afa918215611a6b578f9385915f94613297575b501593841561327c575b505050506132605760010161315e565b89518c916108e2916001600160a01b0390610824908390613e5f565b61328d939450906109199151613e5f565b115f80838f613250565b94509250506020833d82116132c7575b816132b460209383611bbd565b8101031261095a57838f9351925f613246565b3d91506132a7565b916024923b15153d151616916131f8565b90506020813d8211613309575b816132fa60209383611bbd565b8101031261095a57515f6131ac565b3d91506132ed565b5050929599509295965092965f965b8651805189101561352f576001600160a01b039061333f908a90613e5f565b5116602061334e8a8d51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115611a6b575f916134f6575b50336001600160a01b03909116036134de5786516001600160a01b039061339f908a90613e5f565b51166133ac898c51613e5f565b5190803b1561095a576040516323b872dd60e01b815233600482015230602482015260448101929092525f908290606490829084905af190816134ce575b506134075789610ab089896108248260018060a01b039251613e5f565b9091929394959660018060a01b03613420828a51613e5f565b5116602061342f838d51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115611a6b575f91613495575b50306001600160a01b03909116036134795760010196959493929190613320565b87518a91610ab0916001600160a01b0390610824908390613e5f565b90506020813d82116134c6575b816134af60209383611bbd565b8101031261095a576134c09061225b565b5f613458565b3d91506134a2565b5f6134d891611bbd565b5f6133ea565b89610ab089896108248260018060a01b039251613e5f565b90506020813d8211613527575b8161351060209383611bbd565b8101031261095a576135219061225b565b5f613377565b3d9150613503565b50939498509450959094506101205f9501965b8451805187101561370a57613575906020906001600160a01b0390613568908a90613e5f565b5116610c5c898b51613e5f565b03915afa908115611a6b575f916136d9575b5085516001600160a01b039061359e908990613e5f565b51166135ab888a51613e5f565b516135b7898c51613e5f565b51823b1561095a576135e4925f9283604051809681958294637921219560e11b845230336004860161405e565b03925af190816136c9575b50613614578888610904610d3b8a610d33818c610d2a8260018060a01b039251613e5f565b6136409097969192939497602060018060a01b03613633858a51613e5f565b5116610daa858b51613e5f565b03915afa918215611a6b575f92613694575b5061366290610919848c51613e5f565b11613674576001019495929190613542565b85610904610d3b83610d33818a610d2a8f9860018060a01b039251613e5f565b9091506020813d82116136c1575b816136af60209383611bbd565b8101031261095a575190613662613652565b3d91506136a2565b5f6136d391611bbd565b5f6135ef565b90506020813d8211613702575b816136f360209383611bbd565b8101031261095a57515f613587565b3d91506136e6565b5095509550915091506001600160401b036040519361372885611ba2565b60018060a01b031692838552166020840152600160408401525f606084015260808301525f60a0830152602060405161376081611b3c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019384526040518094819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0613801608083015160c060e4860152610124850190611aee565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1918215611a6b575f92613881575b50817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206140e35f395f51905f5255565b9091506020813d6020116138ad575b8161389d60209383611bbd565b8101031261095a5751905f613847565b3d9150613890565b34811461315b57630d35e92160e01b5f526004523460245260445ffd5b6325b198a560e21b5f52600452603260245260445ffd5b63512509d360e11b5f5260045ffd5b90506101208301515114155f613127565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361393b57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361095a57301490565b613979909291926020808251830101910161234b565b6040810180519081613e2a575b50909160808301915060608301906001600160a01b038516905f5b83518051821015613b64576024906020906001600160a01b03906139c6908590613e5f565b5116604051928380926370a0823160e01b82528860048301525afa908115611a6b575f91613b33575b50602460018060a01b03613a04848851613e5f565b5116613a11848951613e5f565b51906040519163a9059cbb60e01b5f5287600452835260205f60448180855af19060015f5114821615613b26575b5090604052602060018060a01b03613a58868a51613e5f565b5116604051938480926370a0823160e01b82528a60048301525afa918215611a6b575f92613af3575b5015918215613ada575b5050613a99576001016139a1565b84610904613abe8387613ab58c9660018060a01b039251613e5f565b51169351613e5f565b51604051634a73404560e11b81529384933090600486016140b7565b613aeb919250610919848951613e5f565b115f80613a8b565b9091506020813d8211613b1e575b81613b0e60209383611bbd565b8101031261095a5751905f613a81565b3d9150613b01565b3b15153d1516165f613a3f565b90506020813d8211613b5c575b81613b4d60209383611bbd565b8101031261095a57515f6139ef565b3d9150613b40565b505060c08501945f945060a08101935091905b83518051861015613cf9576001600160a01b0390613b96908790613e5f565b5116613ba3868851613e5f565b5190803b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101929092525f908290606490829084905af19081613ce9575b50613c285750505081613c0c91613ab56109049460018060a01b039251613e5f565b5160405163045b391760e01b81529384933090600486016140b7565b9091949360018060a01b03613c3e828651613e5f565b51166020613c4d838851613e5f565b516024604051809481936331a9108f60e11b835260048301525afa8015611a6b5784915f91613cae575b506001600160a01b031603613c925760010193949190613b77565b84610904613c0c8387613ab58c9660018060a01b039251613e5f565b9150506020813d8211613ce1575b81613cc960209383611bbd565b8101031261095a57613cdb849161225b565b5f613c77565b3d9150613cbc565b5f613cf391611bbd565b5f613bea565b509350509250505f60e0830161012061010085019401925b81518051841015613e15576001600160a01b0390613d30908590613e5f565b5116613d3d848751613e5f565b51613d49858751613e5f565b51823b1561095a57613d77925f92838b60405196879586948593637921219560e11b8552306004860161405e565b03925af19081613e05575b50613dfb575081613db081613db893613da7610904979660018060a01b039251613e5f565b51169651613e5f565b519251613e5f565b5160405163334a7d1b60e21b81526001600160a01b03948516600482015230602482015294909316604485015260648401526084830191909152819060a4820190565b9160010191613d11565b5f613e0f91611bbd565b5f613d82565b50945050505050604051612efb602082611bbd565b5f80808060018060a01b03891695865af1613e43612bb4565b506139865751906338f0620160e21b5f5260045260245260445ffd5b80518210156125585760209160051b010190565b6060810191825151606082019081515111614056575f5b815151811015613f035784516001600160a01b0390613eaa908390613e5f565b511660018060a01b03613ebe838551613e5f565b511614801590613ede575b613ed557600101613e8a565b50505050505f90565b50613eed816080860151613e5f565b51613efc826080860151613e5f565b5111613ec9565b5050915060a081019182515160a082019081515111614056575f5b815151811015613f8f5784516001600160a01b0390613f3e908390613e5f565b511660018060a01b03613f52838551613e5f565b511614801590613f69575b613ed557600101613f1e565b50613f788160c0860151613e5f565b51613f878260c0860151613e5f565b511415613f5d565b5050915060e08101918251519260e082019384515111614056575f5b84515181101561404c5781516001600160a01b0390613fcb908390613e5f565b511660018060a01b03613fdf838851613e5f565b511614801590614024575b8015613ffd575b613ed557600101613fab565b5061400d81610120860151613e5f565b5161401d82610120860151613e5f565b5111613ff1565b5061403481610100860151613e5f565b5161404482610100860151613e5f565b511415613fea565b5050505050600190565b505050505f90565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b919082018092116140a357565b634e487b7160e01b5f52601160045260245ffd5b6001600160a01b0391821681529181166020830152909116604082015260608101919091526080019056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220d6f1802b50730db0c85a5bd636bc8224dbdfc2f06df40b258f511acb48e2baca64736f6c634300081b0033",
    "sourceMap": "821:18473:99:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;821:18473:99;;;;2828:4;821:18473;759:14:6;688:1:9;821:18473:99;783:14:6;-1:-1:-1;821:18473:99;807:14:6;708:26:9;704:76;;790:10;1066:81:82;790:10:9;821:18473:99;790:10:9;971::82;;821:18473:99;991:32:82;1129:4;1066:81;;:::i;:::-;1033:114;;2828:4:99;1505:66:67;2365:1;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1033:114:82;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;821:18473:99;-1:-1:-1;821:18473:99;;;;;;;-1:-1:-1;;821:18473:99;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;821:18473:99;;;;;-1:-1:-1;821:18473:99;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;;;;;;;;;;;:::o;289:755:86:-;;;821:18473:99;;1189:45:86;;;;821:18473:99;;;1189:45:86;821:18473:99;1189:45:86;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:86;;;;;;;;;;;:::i;:::-;821:18473:99;1179:56:86;;821:18473:99;;-1:-1:-1;;;572:29:86;;;;;821:18473:99;;;1179:56:86;;-1:-1:-1;;;;;821:18473:99;;;-1:-1:-1;821:18473:99;572:29:86;821:18473:99;;572:29:86;;;;;;;;-1:-1:-1;572:29:86;;;289:755;821:18473:99;;615:19:86;611:35;;821:18473:99;;1189:45:86;821:18473:99;;;;;;;;;;;661:52:86;;821:18473:99;572:29:86;661:52;;821:18473:99;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;;;;;572:29:86;821:18473:99;;;2828:4;821:18473;;;;;;;;;;;;661:52:86;;;-1:-1:-1;661:52:86;;;-1:-1:-1;;661:52:86;;;289:755;-1:-1:-1;657:381:86;;821:18473:99;-1:-1:-1;572:29:86;821:18473:99;;;;;;;;;;899:29:86;;;572;899;;821:18473:99;899:29:86;;;;;;;;-1:-1:-1;899:29:86;;;657:381;821:18473:99;;946:19:86;942:35;;793:29;;;;-1:-1:-1;998:29:86;572;821:18473:99;572:29:86;-1:-1:-1;998:29:86;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:86;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;821:18473:99;;;-1:-1:-1;821:18473:99;;;;;657:381:86;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:86;572;821:18473:99;572:29:86;-1:-1:-1;793:29:86;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;821:18473:99;;;;;661:52:86;;;;;;;-1:-1:-1;661:52:86;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:86;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714611a85575080630fcec5b11461181657806311453bb7146117fa5780632c713cd9146117dc57806354fd4d50146116eb57806355b0769b146116825780635bf2f20d146116475780636b122fe01461149d5780637d2c2931146113395780638371ef59146112da57806388e5b2d91461128c578063891d9ea8146112ab57806391db0b7e1461128c57806397524016146110de578063b3b902d4146106dc578063bc197c8114610646578063c6ec50701461053a578063c93844be14610377578063ce46e0461461035b578063cf84e82c146102d5578063e49617e1146102ba578063e60c3505146102ba578063e6c9714d146101935763f23a6e610361000f57346101905760a036600319011261019057610152611cfa565b5061015b611d10565b506084356001600160401b03811161018e5761017b903690600401611c2f565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461019057606036600319011261019057600435906001600160401b03821161019057610140600319833603011261019057604051916101d383611b86565b80600401358352602481013560208401526101f060448201611b28565b604084015261020160648201611b28565b606084015261021260848201611b28565b608084015260a481013560a084015261022d60c48201611d26565b60c084015261023e60e48201611d26565b60e084015261010481013580151581036102b6576101008401526101248101356001600160401b0381116102b65761027b91369101600401611c2f565b610120830152602435906001600160401b0382116101905760206102ac846102a63660048701611c2f565b90612866565b6040519015158152f35b8280fd5b60206102ac6102c836611f0a565b6102d0613909565b61394a565b506060366003190112610190576004356001600160401b03811161018e57610140600319823603011261018e5761030a611b12565b604435929091906001600160a01b0384168403610190576020610353858561034061034e876040519283916004018883016120a5565b03601f198101835282611bbd565b6130bf565b604051908152f35b5034610190578060031936011261019057602090604051908152f35b5034610190576020366003190112610190576004356001600160401b03811161018e576103a8903690600401611ccd565b6103b39291926127b7565b5082019160208184031261018e578035906001600160401b0382116102b65701906101408284031261019057604051916103ec83611b86565b6103f581611d26565b835260208101356001600160401b0381116102b65784610416918301611c2f565b60208401526040810135604084015260608101356001600160401b0381116102b65784610444918301612801565b606084015260808101356001600160401b0381116102b65784610468918301611d51565b608084015260a08101356001600160401b0381116102b6578461048c918301612801565b60a084015260c08101356001600160401b0381116102b657846104b0918301611d51565b60c084015260e08101356001600160401b0381116102b657846104d4918301612801565b60e08401526101008101356001600160401b0381116102b657846104f9918301611d51565b610100840152610120810135916001600160401b038311610190575092610524916105369401611d51565b61012082015260405191829182611e1d565b0390f35b5034610190576020366003190112610190576105546127b7565b5061055d612964565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610639578192610615575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610606576105366105fa6101208401516020808251830101910161234b565b60405191829182611e1d565b635527981560e11b8152600490fd5b6106329192503d8084833e61062a8183611bbd565b8101906129c2565b905f6105b3565b50604051903d90823e3d90fd5b50346101905760a036600319011261019057610660611cfa565b50610669611d10565b506044356001600160401b03811161018e57610689903690600401611d51565b506064356001600160401b03811161018e576106a9903690600401611d51565b506084356001600160401b03811161018e576106c9903690600401611c2f565b5060405163bc197c8160e01b8152602090f35b506060366003190112610190576004356001600160401b03811161018e579061070c61071e923690600401611ccd565b9290610716611b12565b933691611bf9565b9161072761292c565b61073a602084518501016020850161234b565b916060830191825151946080850195865151036110cf5760a08501908151519160c0870192835151036110c05760e0870191825151946101008901958651518114908115916110af575b506110a0576107a461079b89515185515190614096565b85515190614096565b60328111611089575060408901518061106c575b50865b885180518210156109bb576024906020906001600160a01b03906107e0908590613e5f565b5116604051928380926370a0823160e01b82523060048301525afa80156109b057899061097e575b602491508c61082d848d6108248260018060a01b039251613e5f565b51169251613e5f565b5190604051916323b872dd60e01b8d523360045230855260445260208c60648180855af19060018d5114821615610971575b50906040528a60605260208c61087d8660018060a01b039251613e5f565b5116604051948580926370a0823160e01b82523060048301525afa928315610966578e93929185918d9461092a575b5015938415610908575b505050506108c6576001016107bb565b88518b916108e2916001600160a01b0390610824908390613e5f565b51604051634a73404560e11b81529182916109049130903390600486016140b7565b0390fd5b610920939450906109199151613e5f565b5190614096565b115f80838e6108b6565b94509250506020833d821161095e575b8161094760209383611bbd565b8101031261095a57838e9351925f6108ac565b5f80fd5b3d915061093a565b6040513d8d823e3d90fd5b3b15153d1516165f61085f565b506020813d82116109a8575b8161099760209383611bbd565b8101031261095a5760249051610808565b3d915061098a565b6040513d8b823e3d90fd5b505085929187918a83955b85518051881015610c1b576001600160a01b03906109e5908990613e5f565b511660206109f4898c51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115610c10578691610bd7575b50336001600160a01b0390911603610bbf5785516001600160a01b0390610a45908990613e5f565b5116610a52888b51613e5f565b51813b15610b8f576040516323b872dd60e01b8152336004820152306024820152604481019190915290869081908390606490829084905af19182610ba6575b5050610ad25788610ab088886108248260018060a01b039251613e5f565b5160405163045b391760e01b81529182916109049130903390600486016140b7565b90919293949560018060a01b03610aea828951613e5f565b51166020610af9838c51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115610b9b578791610b5e575b50306001600160a01b0390911603610b42576001019594939291906109c6565b86518991610ab0916001600160a01b0390610824908390613e5f565b90506020813d8211610b93575b81610b7860209383611bbd565b81010312610b8f57610b899061225b565b8a610b22565b8680fd5b3d9150610b6b565b6040513d89823e3d90fd5b81610bb091611bbd565b610bbb57858b610a92565b8580fd5b88610ab088886108248260018060a01b039251613e5f565b90506020813d8211610c08575b81610bf160209383611bbd565b81010312610bbb57610c029061225b565b8a610a1d565b3d9150610be4565b6040513d88823e3d90fd5b509087849386610120819401955b83518051861015610ebc57610c86906020906001600160a01b0390610c4f908990613e5f565b5116610c5c888a51613e5f565b51604051627eeac760e11b8152306004820152602481019190915292839190829081906044820190565b03915afa908115610eb1578391610e80575b5084516001600160a01b0390610caf908890613e5f565b5116610cbc878951613e5f565b5190610cc9888b51613e5f565b5191813b15610bbb57610cf9928692839283604051809781958294637921219560e11b845230336004860161405e565b03925af19182610e67575b5050610d7f578787610904610d3b89610d33818b610d2a8260018060a01b039251613e5f565b51169551613e5f565b519451613e5f565b5160405163334a7d1b60e21b81526001600160a01b0390931660048401523360248401523060448401526064830193909352608482019290925290819060a4820190565b610dd490969591929396602060018060a01b03610d9d858951613e5f565b5116610daa858a51613e5f565b51604051627eeac760e11b8152306004820152602481019190915293849190829081906044820190565b03915afa918215610e5c578592610e27575b50610df690610919848b51613e5f565b11610e075760010193949190610c29565b84610904610d3b83610d338189610d2a8e9860018060a01b039251613e5f565b9091506020813d8211610e54575b81610e4260209383611bbd565b8101031261095a575190610df6610de6565b3d9150610e35565b6040513d87823e3d90fd5b81610e7191611bbd565b610e7c57838a610d04565b8380fd5b90506020813d8211610ea9575b81610e9a60209383611bbd565b8101031261095a575188610c98565b3d9150610e8d565b6040513d85823e3d90fd5b50604051906001600160401b0384610ed384611ba2565b33845216602083015260016040830152604435606083015260808201528160a08201526020604051610f0481611b3c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610fa5608083015160c060e4860152610124850190611aee565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190811561106157829161102e575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206140e35f395f51905f5255604051908152f35b90506020813d602011611059575b8161104960209383611bbd565b8101031261018e57516020610feb565b3d915061103c565b6040513d84823e3d90fd5b3481146107b857630d35e92160e01b885260045234602452604487fd5b6325b198a560e21b88526004526032602452604487fd5b63512509d360e11b8752600487fd5b90506101208a01515114155f610784565b63512509d360e11b8552600485fd5b63512509d360e11b8352600483fd5b503461019057602036600319011261019057600435906110fc61292c565b61110582612a94565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316919061118f81611b3c565b838152846020820152604051916111a583611b3c565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af1918261124a575b505061120d5763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690612be3565b5060015f5160206140e35f395f51905f5255602060405160018152f35b8161125491611bbd565b6102b657825f6111f4565b637bf6a16f60e01b8352600483fd5b637bf6a16f60e01b8452600484fd5b63629cd40b60e11b8352600483fd5b60206102ac61129a36611c7d565b926112a6929192613909565b6124e2565b5034610190576105366112c66112c036611ad8565b90612586565b604051918291602083526020830190611aee565b503461019057602036600319011261019057600435906001600160401b0382116101905761131361130e3660048501611c2f565b6124b9565b604080516001600160a01b03909316835260208301819052829161053691830190611aee565b5034610190576020366003190112610190576004359061135761292c565b61136082612a94565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691906113ea81611b3c565b8381528460208201526040519161140083611b3c565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af19182611488575b50506114685763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690613963565b8161149291611bbd565b6102b657825f61144f565b50346101905780600319360112610190576060806040516114bd81611b6b565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561163b578091611586575b606082610536604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190611aee565b90503d8082843e6115978184611bbd565b82019160208184031261018e578051906001600160401b0382116102b657019060808284031261019057604051916115ce83611b6b565b8051835260208101516001600160a01b03811681036102b65760208401526115f860408201611f3e565b60408401526060810151906001600160401b0382116102b657019083601f83011215610190575060609281602061163193519101612225565b828201525f611540565b604051903d90823e3d90fd5b503461019057806003193601126101905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50604036600319011261019057600435906001600160401b0382116101905761014060031983360301126101905760206103536116d6846116e46116c4611b12565b916040519384916004018783016120a5565b03601f198101845283611bbd565b33916130bf565b503461019057806003193601126101905760206112c66001610536936117307f0000000000000000000000000000000000000000000000000000000000000000612f52565b90828561175c7f0000000000000000000000000000000000000000000000000000000000000000612f52565b81806117877f0000000000000000000000000000000000000000000000000000000000000000612f52565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282611bbd565b5034610190576117ee6112c036611ad8565b50602060405160018152f35b5034610190578060031936011261019057602060405160328152f35b503461095a5761182536611ad8565b919061182f61292c565b61183881612a94565b9261184281612a94565b60208501517f0000000000000000000000000000000000000000000000000000000000000000809103611a765761187886612b42565b15611a765761012086019561188d87516124b9565b60a0859392930151825103611a22576118a585612b42565b15611a2257905160405163e6c9714d60e01b8152926020928492839182916118d1918a60048501611f4b565b03916001600160a01b03165afa908115611a6b575f91611a31575b5015611a22576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061192981611b3c565b8581525f60208201526040519261193f84611b3c565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081611a0d575b506119a45763614cf93960e01b84526004839052602484fd5b935160c090940180516020956119c3916001600160a01b031690612be3565b5060018060a01b03905116917ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c06040519480a460015f5160206140e35f395f51905f525560018152f35b611a1a9195505f90611bbd565b5f935f61198b565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611a63575b81611a4c60209383611bbd565b8101031261095a57611a5d90611f3e565b5f6118ec565b3d9150611a3f565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b3461095a57602036600319011261095a576004359063ffffffff60e01b821680920361095a57602091630271189760e51b8114908115611ac7575b5015158152f35b6301ffc9a760e01b14905083611ac0565b604090600319011261095a576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602435906001600160401b038216820361095a57565b35906001600160401b038216820361095a57565b604081019081106001600160401b03821117611b5757604052565b634e487b7160e01b5f52604160045260245ffd5b608081019081106001600160401b03821117611b5757604052565b61014081019081106001600160401b03821117611b5757604052565b60c081019081106001600160401b03821117611b5757604052565b90601f801991011681019081106001600160401b03821117611b5757604052565b6001600160401b038111611b5757601f01601f191660200190565b929192611c0582611bde565b91611c136040519384611bbd565b82948184528183011161095a578281602093845f960137010152565b9080601f8301121561095a57816020611c4a93359101611bf9565b90565b9181601f8401121561095a578235916001600160401b03831161095a576020808501948460051b01011161095a57565b604060031982011261095a576004356001600160401b03811161095a5781611ca791600401611c4d565b92909291602435906001600160401b03821161095a57611cc991600401611c4d565b9091565b9181601f8401121561095a578235916001600160401b03831161095a576020838186019501011161095a57565b600435906001600160a01b038216820361095a57565b602435906001600160a01b038216820361095a57565b35906001600160a01b038216820361095a57565b6001600160401b038111611b575760051b60200190565b9080601f8301121561095a578135611d6881611d3a565b92611d766040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b828210611d9e5750505090565b8135815260209182019101611d91565b90602080835192838152019201905f5b818110611dcb5750505090565b82516001600160a01b0316845260209384019390920191600101611dbe565b90602080835192838152019201905f5b818110611e075750505090565b8251845260209384019390920191600101611dfa565b90611c4a916020815260018060a01b038251166020820152610120611ef4611ede611ec7611eb1611e9b611e85611e6560208a015161014060408b01526101608a0190611aee565b60408a015160608a015260608a0151601f198a83030160808b0152611dae565b6080890151888203601f190160a08a0152611dea565b60a0880151878203601f190160c0890152611dae565b60c0870151868203601f190160e0880152611dea565b60e0860151858203601f1901610100870152611dae565b610100850151848203601f190184860152611dea565b92015190610140601f1982850301910152611dea565b602060031982011261095a57600435906001600160401b03821161095a5761014090829003600319011261095a5760040190565b5190811515820361095a57565b93929161200990611ffb61012060409460608952805160608a0152602081015160808a01526001600160401b03868201511660a08a01526001600160401b0360608201511660c08a01526001600160401b0360808201511660e08a015260a08101516101008a015260018060a01b0360c082015116828a015260018060a01b0360e0820151166101408a015261010081015115156101608a015201516101406101808901526101a0880190611aee565b908682036020880152611aee565b930152565b9035601e198236030181121561095a5701602081359101916001600160401b03821161095a578160051b3603831361095a57565b916020908281520191905f5b81811061205b5750505090565b909192602080600192838060a01b0361207388611d26565b16815201940192910161204e565b81835290916001600160fb1b03831161095a5760209260051b809284830137010190565b60208152906001600160a01b036120bb82611d26565b1660208301526020810135601e198236030181121561095a578101916020833593016001600160401b03841161095a57833603811361095a576122066121e56121c56121a661218761216889611c4a9a6122129861014060408c0152816101608c01526101808b01375f610180828b010152601f8019910116880160408a013560608a015261018061215060608c018c61200e565b919092601f19828d8303010160808d01520191612042565b61217560808a018a61200e565b898303601f190160a08b015290612081565b61219460a089018961200e565b888303601f190160c08a015290612042565b6121b360c088018861200e565b878303601f190160e089015290612081565b6121d260e087018761200e565b868303601f190161010088015290612042565b6121f361010086018661200e565b858303601f190161012087015290612081565b9261012081019061200e565b91610140601f1982860301910152612081565b92919261223182611bde565b9161223f6040519384611bbd565b82948184528183011161095a578281602093845f96015e010152565b51906001600160a01b038216820361095a57565b9080601f8301121561095a578151611c4a92602001612225565b9080601f8301121561095a5781516122a081611d3a565b926122ae6040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b8282106122d65750505090565b602080916122e38461225b565b8152019101906122c9565b9080601f8301121561095a57815161230581611d3a565b926123136040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b82821061233b5750505090565b815181526020918201910161232e565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a576040519161237f83611b86565b6123888261225b565b835260208201516001600160401b03811161095a57816123a991840161226f565b60208401526040820151604084015260608201516001600160401b03811161095a57816123d7918401612289565b606084015260808201516001600160401b03811161095a57816123fb9184016122ee565b608084015260a08201516001600160401b03811161095a578161241f918401612289565b60a084015260c08201516001600160401b03811161095a57816124439184016122ee565b60c084015260e08201516001600160401b03811161095a5781612467918401612289565b60e08401526101008201516001600160401b03811161095a578161248c9184016122ee565b6101008401526101208201516001600160401b03811161095a576124b092016122ee565b61012082015290565b6124cc906020808251830101910161234b565b80516020909101516001600160a01b0390911691565b929092818403612577575f91345b8584101561256c5781841015612558578360051b80860135908282116125495784013561013e198536030181121561095a5761252d90850161394a565b1561253e57600191039301926124f0565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b61258e61292c565b5f9161259982612a94565b906125a381612a94565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103611a76576125da82612b42565b15611a76576101208201916125ef83516124b9565b60a0879392930151825103611a225761260787612b42565b15611a2257905160405163e6c9714d60e01b815292602092849283918291612633918c60048501611f4b565b03916001600160a01b03165afa908115611a6b575f9161277d575b5015611a22576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061268b81611b3c565b8681525f6020820152604051926126a184611b3c565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081612768575b506127065763614cf93960e01b85526004849052602485fd5b61274660c07ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09296959394965196019560018060a01b0387511690613963565b94516001600160a01b03169380a49060015f5160206140e35f395f51905f5255565b6127759196505f90611bbd565b5f945f6126ed565b90506020813d6020116127af575b8161279860209383611bbd565b8101031261095a576127a990611f3e565b5f61264e565b3d915061278b565b604051906127c482611b86565b6060610120835f81528260208201525f604082015282808201528260808201528260a08201528260c08201528260e0820152826101008201520152565b9080601f8301121561095a57813561281881611d3a565b926128266040519485611bbd565b81845260208085019260051b82010192831161095a57602001905b82821061284e5750505090565b6020809161285b84611d26565b815201910190612841565b60208101517f000000000000000000000000000000000000000000000000000000000000000003612926576128ac6101206128bc9201516020808251830101910161234b565b916020808251830101910161234b565b6040820151604082015111159182612914575b826128fb575b826128df57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506128d5565b91506129208183613e73565b916128cf565b50505f90565b60025f5160206140e35f395f51905f5254146129555760025f5160206140e35f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b6040519061297182611b86565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361095a57565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a57604051916129f683611b86565b8151835260208201516020840152612a10604083016129ae565b6040840152612a21606083016129ae565b6060840152612a32608083016129ae565b608084015260a082015160a0840152612a4d60c0830161225b565b60c0840152612a5e60e0830161225b565b60e0840152612a706101008301611f3e565b6101008401526101208201516001600160401b03811161095a576124b0920161226f565b90612a9d612964565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315611a6b575f93612b26575b508251818115918215612b1b575b5050612b095750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f612b00565b612b3b9193503d805f833e61062a8183611bbd565b915f612af2565b805115612ba5576001600160401b036060820151168015159081612b9a575b50612b8b57608001516001600160401b0316612b7c57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f612b61565b635c2c7f8960e01b5f5260045ffd5b3d15612bde573d90612bc582611bde565b91612bd36040519384611bbd565b82523d5f602084013e565b606090565b612bf6906020808251830101910161234b565b6040810180519081612f01575b5090916001600160a01b0381169150608083019060608401905f5b82518051821015612ce957600191906001600160a01b0390612c41908390613e5f565b5116612c4e828751613e5f565b51906040519163a9059cbb60e01b5f528860045260245260205f60448180855af190845f5114821615612cdc575b509060405215612c8d575b01612c1e565b85828060a01b03612c9f838751613e5f565b51167f6a0720b70d5a8914c9378c90e36e760e11a1c79840d56909d7562c7c79654e0b6020612ccf858a51613e5f565b51604051908152a3612c87565b3b15153d1516165f612c7c565b505094939150505f9060a081019060c08101925b82518051821015612dde576001600160a01b0390612d1c908390613e5f565b511690612d2a818651613e5f565b51823b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101919091526001925f908290606490829084905af19081612dce575b50612dc95785828060a01b03612d8a838751613e5f565b51167f0863b761d932722655fba74d8a2c2b32a37c3d52195357bf7b4610ebfc6944e06020612dba858a51613e5f565b51604051908152a35b01612cfd565b612dc3565b5f612dd891611bbd565b5f612d73565b50506101008101925060e081019150610120015f5b82518051821015612ee5576001600160a01b0390612e12908390613e5f565b511690612e20818651613e5f565b5191612e2d828551613e5f565b5192813b1561095a57600193612e5f925f92838d60405196879586948593637921219560e11b8552306004860161405e565b03925af19081612ed5575b50612ed05785828060a01b03612e81838751613e5f565b51167f15fffc8b1069bee41edd748e645887f613b87a2d861ab91a772fc4a11ebe53026040612eb1858a51613e5f565b51612ebd868951613e5f565b5182519182526020820152a35b01612df3565b612eca565b5f612edf91611bbd565b5f612e6a565b5050505050509050604051612efb602082611bbd565b5f815290565b5f80808060018060a01b03881695865af1612f1a612bb4565b50612c035760207ff7c9ce661c79b7ec4fedd33edef0ee43991ab10fc7464e4764925d33e3dfd0bc9151604051908152a25f80612c03565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b82101561309c575b806d04ee2d6d415b85acef8100000000600a921015613081575b662386f26fc1000081101561306d575b6305f5e10081101561305c575b61271081101561304d575b606481101561303f575b1015613034575b600a60216001840193612fd985611bde565b94612fe76040519687611bbd565b808652612ff6601f1991611bde565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561302f57600a9091613001565b505090565b600190910190612fc7565b606460029104930192612fc0565b61271060049104930192612fb6565b6305f5e10060089104930192612fab565b662386f26fc1000060109104930192612f9e565b6d04ee2d6d415b85acef810000000060209104930192612f8e565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612f74565b929091926130cb61292c565b6130de602082518301016020830161234b565b926060840192835151956080860196875151036138e95760a08601908151519360c0880194855151036138e95760e08801978851516101008201908151518114908115916138f8575b506138e95761314761313e8a515187515190614096565b8b515190614096565b603281116138d257506040820151806138b5575b505f5b89518051821015613311576024906020906001600160a01b0390613183908590613e5f565b5116604051928380926370a0823160e01b82523060048301525afa908115611a6b575f916132e0575b508c6131c5838d6108248260018060a01b039251613e5f565b5191604051926323b872dd60e01b5f52336004523060245260445260205f60648180865af19160015f51148316156132cf575b50602491926040525f60605260208d6132198660018060a01b039251613e5f565b5116604051938480926370a0823160e01b82523060048301525afa918215611a6b578f9385915f94613297575b501593841561327c575b505050506132605760010161315e565b89518c916108e2916001600160a01b0390610824908390613e5f565b61328d939450906109199151613e5f565b115f80838f613250565b94509250506020833d82116132c7575b816132b460209383611bbd565b8101031261095a57838f9351925f613246565b3d91506132a7565b916024923b15153d151616916131f8565b90506020813d8211613309575b816132fa60209383611bbd565b8101031261095a57515f6131ac565b3d91506132ed565b5050929599509295965092965f965b8651805189101561352f576001600160a01b039061333f908a90613e5f565b5116602061334e8a8d51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115611a6b575f916134f6575b50336001600160a01b03909116036134de5786516001600160a01b039061339f908a90613e5f565b51166133ac898c51613e5f565b5190803b1561095a576040516323b872dd60e01b815233600482015230602482015260448101929092525f908290606490829084905af190816134ce575b506134075789610ab089896108248260018060a01b039251613e5f565b9091929394959660018060a01b03613420828a51613e5f565b5116602061342f838d51613e5f565b516024604051809481936331a9108f60e11b835260048301525afa908115611a6b575f91613495575b50306001600160a01b03909116036134795760010196959493929190613320565b87518a91610ab0916001600160a01b0390610824908390613e5f565b90506020813d82116134c6575b816134af60209383611bbd565b8101031261095a576134c09061225b565b5f613458565b3d91506134a2565b5f6134d891611bbd565b5f6133ea565b89610ab089896108248260018060a01b039251613e5f565b90506020813d8211613527575b8161351060209383611bbd565b8101031261095a576135219061225b565b5f613377565b3d9150613503565b50939498509450959094506101205f9501965b8451805187101561370a57613575906020906001600160a01b0390613568908a90613e5f565b5116610c5c898b51613e5f565b03915afa908115611a6b575f916136d9575b5085516001600160a01b039061359e908990613e5f565b51166135ab888a51613e5f565b516135b7898c51613e5f565b51823b1561095a576135e4925f9283604051809681958294637921219560e11b845230336004860161405e565b03925af190816136c9575b50613614578888610904610d3b8a610d33818c610d2a8260018060a01b039251613e5f565b6136409097969192939497602060018060a01b03613633858a51613e5f565b5116610daa858b51613e5f565b03915afa918215611a6b575f92613694575b5061366290610919848c51613e5f565b11613674576001019495929190613542565b85610904610d3b83610d33818a610d2a8f9860018060a01b039251613e5f565b9091506020813d82116136c1575b816136af60209383611bbd565b8101031261095a575190613662613652565b3d91506136a2565b5f6136d391611bbd565b5f6135ef565b90506020813d8211613702575b816136f360209383611bbd565b8101031261095a57515f613587565b3d91506136e6565b5095509550915091506001600160401b036040519361372885611ba2565b60018060a01b031692838552166020840152600160408401525f606084015260808301525f60a0830152602060405161376081611b3c565b7f000000000000000000000000000000000000000000000000000000000000000081528181019384526040518094819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0613801608083015160c060e4860152610124850190611aee565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1918215611a6b575f92613881575b50817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206140e35f395f51905f5255565b9091506020813d6020116138ad575b8161389d60209383611bbd565b8101031261095a5751905f613847565b3d9150613890565b34811461315b57630d35e92160e01b5f526004523460245260445ffd5b6325b198a560e21b5f52600452603260245260445ffd5b63512509d360e11b5f5260045ffd5b90506101208301515114155f613127565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361393b57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361095a57301490565b613979909291926020808251830101910161234b565b6040810180519081613e2a575b50909160808301915060608301906001600160a01b038516905f5b83518051821015613b64576024906020906001600160a01b03906139c6908590613e5f565b5116604051928380926370a0823160e01b82528860048301525afa908115611a6b575f91613b33575b50602460018060a01b03613a04848851613e5f565b5116613a11848951613e5f565b51906040519163a9059cbb60e01b5f5287600452835260205f60448180855af19060015f5114821615613b26575b5090604052602060018060a01b03613a58868a51613e5f565b5116604051938480926370a0823160e01b82528a60048301525afa918215611a6b575f92613af3575b5015918215613ada575b5050613a99576001016139a1565b84610904613abe8387613ab58c9660018060a01b039251613e5f565b51169351613e5f565b51604051634a73404560e11b81529384933090600486016140b7565b613aeb919250610919848951613e5f565b115f80613a8b565b9091506020813d8211613b1e575b81613b0e60209383611bbd565b8101031261095a5751905f613a81565b3d9150613b01565b3b15153d1516165f613a3f565b90506020813d8211613b5c575b81613b4d60209383611bbd565b8101031261095a57515f6139ef565b3d9150613b40565b505060c08501945f945060a08101935091905b83518051861015613cf9576001600160a01b0390613b96908790613e5f565b5116613ba3868851613e5f565b5190803b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101929092525f908290606490829084905af19081613ce9575b50613c285750505081613c0c91613ab56109049460018060a01b039251613e5f565b5160405163045b391760e01b81529384933090600486016140b7565b9091949360018060a01b03613c3e828651613e5f565b51166020613c4d838851613e5f565b516024604051809481936331a9108f60e11b835260048301525afa8015611a6b5784915f91613cae575b506001600160a01b031603613c925760010193949190613b77565b84610904613c0c8387613ab58c9660018060a01b039251613e5f565b9150506020813d8211613ce1575b81613cc960209383611bbd565b8101031261095a57613cdb849161225b565b5f613c77565b3d9150613cbc565b5f613cf391611bbd565b5f613bea565b509350509250505f60e0830161012061010085019401925b81518051841015613e15576001600160a01b0390613d30908590613e5f565b5116613d3d848751613e5f565b51613d49858751613e5f565b51823b1561095a57613d77925f92838b60405196879586948593637921219560e11b8552306004860161405e565b03925af19081613e05575b50613dfb575081613db081613db893613da7610904979660018060a01b039251613e5f565b51169651613e5f565b519251613e5f565b5160405163334a7d1b60e21b81526001600160a01b03948516600482015230602482015294909316604485015260648401526084830191909152819060a4820190565b9160010191613d11565b5f613e0f91611bbd565b5f613d82565b50945050505050604051612efb602082611bbd565b5f80808060018060a01b03891695865af1613e43612bb4565b506139865751906338f0620160e21b5f5260045260245260445ffd5b80518210156125585760209160051b010190565b6060810191825151606082019081515111614056575f5b815151811015613f035784516001600160a01b0390613eaa908390613e5f565b511660018060a01b03613ebe838551613e5f565b511614801590613ede575b613ed557600101613e8a565b50505050505f90565b50613eed816080860151613e5f565b51613efc826080860151613e5f565b5111613ec9565b5050915060a081019182515160a082019081515111614056575f5b815151811015613f8f5784516001600160a01b0390613f3e908390613e5f565b511660018060a01b03613f52838551613e5f565b511614801590613f69575b613ed557600101613f1e565b50613f788160c0860151613e5f565b51613f878260c0860151613e5f565b511415613f5d565b5050915060e08101918251519260e082019384515111614056575f5b84515181101561404c5781516001600160a01b0390613fcb908390613e5f565b511660018060a01b03613fdf838851613e5f565b511614801590614024575b8015613ffd575b613ed557600101613fab565b5061400d81610120860151613e5f565b5161401d82610120860151613e5f565b5111613ff1565b5061403481610100860151613e5f565b5161404482610100860151613e5f565b511415613fea565b5050505050600190565b505050505f90565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b919082018092116140a357565b634e487b7160e01b5f52601160045260245ffd5b6001600160a01b0391821681529181166020830152909116604082015260608101919091526080019056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220d6f1802b50730db0c85a5bd636bc8224dbdfc2f06df40b258f511acb48e2baca64736f6c634300081b0033",
    "sourceMap": "821:18473:99:-:0;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;;1183:12:9;;;1054:5;1183:12;821:18473:99;1054:5:9;1183:12;821:18473:99;;;;;;;;;;;;;;;;;;;16276:13;821:18473;16276:13;;;821:18473;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;:::i;:::-;-1:-1:-1;821:18473:99;;-1:-1:-1;;;821:18473:99;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;3045:39:9;821:18473:99;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;821:18473:99:-;-1:-1:-1;821:18473:99;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;1139:12:84;821:18473:99;;15344:16;;821:18473;;;;;;;;15344:16;;;;:::i;:::-;;1055:104:6;;15344:16:99;;;;;;:::i;:::-;1139:12:84;:::i;:::-;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;19251:34;;821:18473;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;821:18473:99;;-1:-1:-1;;;2619:23:82;;821:18473:99;;;2619:23:82;;;821:18473:99;;;;2619:23:82;821:18473:99;2619:3:82;-1:-1:-1;;;;;821:18473:99;2619:23:82;;;;;;;;;;;821:18473:99;2656:19:82;821:18473:99;2656:19:82;;821:18473:99;2679:18:82;2656:41;2652:87;;821:18473:99;19080:46;19091:16;;;;821:18473;;;;19080:46;;;;;;:::i;:::-;821:18473;;;;;;;:::i;2652:87:82:-;-1:-1:-1;;;2718:21:82;;821:18473:99;;2718:21:82;2619:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;821:18473:99;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;:::i;:::-;-1:-1:-1;821:18473:99;;-1:-1:-1;;;821:18473:99;;;;;;-1:-1:-1;821:18473:99;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;:::i;:::-;1139:12:84;2989:103:67;;:::i;:::-;4111:34:99;821:18473;;;4111:34;;;821:18473;4111:34;;;:::i;:::-;2941:16;821:18473;2941:16;;;;;821:18473;2968:17;;;;;;;821:18473;2941:51;2937:110;;3060:17;;;;;;821:18473;3088:19;;;;;;;821:18473;3060:54;3056:113;;821:18473;3195:18;;;;;821:18473;3224:20;;;;;;;821:18473;3195:56;;;;;:131;;;821:18473;3178:187;;;3398:78;:50;:16;;821:18473;3424:17;;821:18473;3398:50;;:::i;:::-;3451:18;;821:18473;3398:78;;:::i;:::-;2432:2;3490:30;;3486:117;;4231:20;821:18473;4231:20;;821:18473;4231:24;4227:182;;821:18473;6400:13;;6444:3;6419:16;;821:18473;;6415:27;;;;;10404:1148:52;;821:18473:99;;-1:-1:-1;;;;;821:18473:99;6539:19;;821:18473;;6539:19;:::i;:::-;821:18473;;;;;;;;;;;6532:52;;6578:4;821:18473;6532:52;;821:18473;6532:52;;;;;;;;;;6444:3;10404:1148:52;821:18473:99;;;6683:20;821:18473;;6621:19;821:18473;;;;;;6621:16;;:19;:::i;:::-;821:18473;;6683:17;;:20;:::i;:::-;821:18473;2449:48:52;821:18473:99;10404:1148:52;10365:28;;;;10404:1148;;903:10:84;821:18473:99;10404:1148:52;6578:4:99;10404:1148:52;;821:18473:99;10404:1148:52;821:18473:99;10404:1148:52;;;;;;;;821:18473:99;10404:1148:52;;;;;;;;6444:3:99;10404:1148:52;;821:18473:99;10404:1148:52;;821:18473:99;10404:1148:52;821:18473:99;;6793:19;821:18473;;;;;;6793:16;;:19;:::i;:::-;821:18473;;;;;;;;;;;6786:52;;6578:4;821:18473;6786:52;;821:18473;6786:52;;;;;;;;;;;;;;;;;6444:3;6909:8;;821:18473;;;6909:63;;6444:3;6905:192;;;;;;821:18473;;6400:13;;6905:192;7019:16;;821:18473;;7061:20;;-1:-1:-1;;;;;821:18473:99;7019:19;;821:18473;;7019:19;:::i;7061:20::-;821:18473;;;-1:-1:-1;;;6999:83:99;;821:18473;;;6999:83;;6578:4;;903:10:84;;821:18473:99;6999:83;;;:::i;:::-;;;;6909:63;6936:36;6952:17;;;;:20;:17;;:20;:::i;:::-;821:18473;6936:36;;:::i;:::-;-1:-1:-1;6909:63:99;;;;;;6786:52;;;;;;821:18473;6786:52;;;;;;;;;821:18473;6786:52;;;:::i;:::-;;;821:18473;;;;;;;;6786:52;;;;821:18473;-1:-1:-1;821:18473:99;;6786:52;;;-1:-1:-1;6786:52:99;;;821:18473;;;;;;;;;10404:1148:52;;;;;;;;;;;6532:52:99;;821:18473;6532:52;;;;;;;;;821:18473;6532:52;;;:::i;:::-;;;821:18473;;;;10404:1148:52;821:18473:99;;6532:52;;;;;-1:-1:-1;6532:52:99;;;821:18473;;;;;;;;;6415:27;;;;;;;;;7150:13;7145:992;7195:3;7169:17;;821:18473;;7165:28;;;;;-1:-1:-1;;;;;821:18473:99;7291:20;;821:18473;;7291:20;:::i;:::-;821:18473;;;7321:22;:19;;;:22;:::i;:::-;821:18473;10404:1148:52;821:18473:99;;;;;;;;;7283:61;;821:18473;7283:61;;821:18473;7283:61;;;;;;;;;;;7195:3;-1:-1:-1;903:10:84;-1:-1:-1;;;;;821:18473:99;;;7362:19;7358:152;;7536:17;;-1:-1:-1;;;;;821:18473:99;7536:20;;:17;;:20;:::i;:::-;821:18473;;7592:22;:19;;;:22;:::i;:::-;821:18473;7528:87;;;;;821:18473;;-1:-1:-1;;;7528:87:99;;903:10:84;821:18473:99;7528:87;;821:18473;6578:4;821:18473;;;;;;;;;;;;;;;;;;;;;;;;7528:87;;;;;;7195:3;-1:-1:-1;;7524:287:99;;821:18473;7773:22;821:18473;;7730:20;821:18473;;;;;;7730:17;;:20;:::i;7773:22::-;821:18473;;;-1:-1:-1;;;7709:87:99;;821:18473;;;7709:87;;6578:4;;903:10:84;;821:18473:99;7709:87;;;:::i;7524:287::-;;;;;;;821:18473;;;;;7900:20;:17;;;:20;:::i;:::-;821:18473;;;7930:22;:19;;;:22;:::i;:::-;821:18473;10404:1148:52;821:18473:99;;;;;;;;;7892:61;;821:18473;7892:61;;821:18473;7892:61;;;;;;;;;;;7524:287;-1:-1:-1;6578:4:99;-1:-1:-1;;;;;821:18473:99;;;7971:27;7967:160;;821:18473;;7150:13;;;;;;;;7967:160;8046:17;;821:18473;;8089:22;;-1:-1:-1;;;;;821:18473:99;8046:20;;821:18473;;8046:20;:::i;7892:61::-;;;821:18473;7892:61;;;;;;;;;821:18473;7892:61;;;:::i;:::-;;;821:18473;;;;;;;:::i;:::-;7892:61;;;821:18473;;;;7892:61;;;-1:-1:-1;7892:61:99;;;821:18473;;;;;;;;;7528:87;;;;;:::i;:::-;821:18473;;7528:87;;;;821:18473;;;;7358:152;821:18473;7472:22;821:18473;;7429:20;821:18473;;;;;;7429:17;;:20;:::i;7283:61::-;;;821:18473;7283:61;;;;;;;;;821:18473;7283:61;;;:::i;:::-;;;821:18473;;;;;;;:::i;:::-;7283:61;;;;;;-1:-1:-1;7283:61:99;;;821:18473;;;;;;;;;7165:28;;;;;;;8527:19;8181:13;8527:19;;8176:1129;8227:3;8200:18;;821:18473;;8196:29;;;;;8315:81;;821:18473;;-1:-1:-1;;;;;821:18473:99;8324:21;;821:18473;;8324:21;:::i;:::-;821:18473;;8372:23;:20;;;:23;:::i;:::-;821:18473;;;-1:-1:-1;;;8315:81:99;;6578:4;821:18473;8315:81;;821:18473;;;;;;;;;;;;;;;;;;;;;8315:81;;;;;;;;;;;;;;8227:3;-1:-1:-1;8424:18:99;;-1:-1:-1;;;;;821:18473:99;8424:21;;:18;;:21;:::i;:::-;821:18473;;8502:23;:20;;;:23;:::i;:::-;821:18473;8527:19;:22;:19;;;:22;:::i;:::-;821:18473;8415:139;;;;;;;821:18473;;;;;;;;;;;;;;;;;8415:139;;6578:4;903:10:84;821:18473:99;8415:139;;;:::i;:::-;;;;;;;;;8227:3;-1:-1:-1;;8411:404:99;;821:18473;;8648:152;8760:22;821:18473;8735:23;821:18473;;8691:21;821:18473;;;;;;8691:18;;:21;:::i;:::-;821:18473;;8735:20;;:23;:::i;:::-;821:18473;8760:19;;:22;:::i;:::-;821:18473;;;-1:-1:-1;;;8648:152:99;;-1:-1:-1;;;;;821:18473:99;;;;8648:152;;821:18473;903:10:84;821:18473:99;;;;6578:4;821:18473;;;;;;;;;;;;;;;;;;;;;;;;;;8411:404;8896:81;8411:404;;;;;;;821:18473;;;;;;8905:21;:18;;;:21;:::i;:::-;821:18473;;8953:23;:20;;;:23;:::i;:::-;821:18473;;;-1:-1:-1;;;8896:81:99;;6578:4;821:18473;8896:81;;821:18473;;;;;;;;;;;;;;;;;;;;;8896:81;;;;;;;;;;;;;;8411:404;9079:19;9063:38;9079:19;:22;:19;;;:22;:::i;9063:38::-;-1:-1:-1;9044:251:99;;821:18473;;8181:13;;;;;;9044:251;821:18473;9128:152;9240:22;821:18473;9215:23;821:18473;;9171:21;821:18473;;;;;;;9171:18;;:21;:::i;8896:81::-;;;;821:18473;8896:81;;;;;;;;;821:18473;8896:81;;;:::i;:::-;;;821:18473;;;;;;9063:38;8896:81;;;;;-1:-1:-1;8896:81:99;;;821:18473;;;;;;;;;8415:139;;;;;:::i;:::-;821:18473;;8415:139;;;;821:18473;;;;8315:81;;;821:18473;8315:81;;;;;;;;;821:18473;8315:81;;;:::i;:::-;;;821:18473;;;;;8315:81;;;;;;-1:-1:-1;8315:81:99;;;821:18473;;;;;;;;;8196:29;-1:-1:-1;821:18473:99;;;-1:-1:-1;;;;;8196:29:99;821:18473;;;:::i;:::-;903:10:84;821:18473:99;;;;2141:299:82;;821:18473:99;;;2141:299:82;;821:18473:99;;;;2141:299:82;;821:18473:99;2968:17;2141:299:82;;821:18473:99;2141:299:82;3060:17:99;2141:299:82;;821:18473:99;;;;;;;:::i;:::-;2095:18:82;821:18473:99;;2046:413:82;;;821:18473:99;;;;;;;;;;;;2018:455:82;;;821:18473:99;2018:455:82;;821:18473:99;;10404:1148:52;821:18473:99;;;;;;;;;;;;;;;;;10404:1148:52;821:18473:99;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;3060:17;821:18473;2968:17;821:18473;;;3088:19;821:18473;;;;;;;;;:::i;:::-;;;;;;;;2018:455:82;821:18473:99;;2018:3:82;-1:-1:-1;;;;;821:18473:99;2018:455:82;;;;;;;;;;;8176:1129:99;903:10:84;821:18473:99;903:10:84;;5343:26:83;903:10:84;5343:26:83;;;821:18473:99;-1:-1:-1;;;;;;;;;;;2407:1:67;821:18473:99;;;;;;2018:455:82;;;821:18473:99;2018:455:82;;821:18473:99;2018:455:82;;;;;;821:18473:99;2018:455:82;;;:::i;:::-;;;821:18473:99;;;;;;2018:455:82;;;;;-1:-1:-1;2018:455:82;;;821:18473:99;;;;;;;;;4227:182;4275:9;4271:128;;4227:182;4271:128;-1:-1:-1;;;4335:49:99;;821:18473;;4275:9;821:18473;;;4335:49;;3486:117;-1:-1:-1;;;3543:49:99;;821:18473;;2432:2;821:18473;;;3543:49;;3178:187;-1:-1:-1;;;3344:21:99;;821:18473;3015:21;3344;3195:131;3300:19;;;;;;821:18473;3271:55;;3195:131;;;3056:113;-1:-1:-1;;;3137:21:99;;821:18473;3015:21;3137;2937:110;-1:-1:-1;;;3015:21:99;;821:18473;3015:21;;821:18473;;;;;;;-1:-1:-1;;821:18473:99;;;;;;2989:103:67;;;:::i;:::-;17991:28:99;;;:::i;:::-;18086:18;821:18473;18086:18;;821:18473;18108:18;18086:40;;;18082:104;;18295:26;;;-1:-1:-1;;;;;821:18473:99;;;18295:31;18291:62;;821:18473;-1:-1:-1;;;;;821:18473:99;18368:15;:44;18364:100;;821:18473;;18528:3;-1:-1:-1;;;;;821:18473:99;;;;;;:::i;:::-;;;;18605:43;821:18473;18605:43;;821:18473;;;;;;;:::i;:::-;;;;18552:98;;821:18473;18528:132;;;;;821:18473;;-1:-1:-1;;;18528:132:99;;821:18473;;;18528:132;;821:18473;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;18528:132;;;;;;821:18473;-1:-1:-1;;18524:207:99;;-1:-1:-1;;;18699:21:99;;821:18473;;;;-1:-1:-1;18699:21:99;18524:207;18841:16;;;;18859:21;;;821:18473;18819:62;;-1:-1:-1;;;;;821:18473:99;;;;18819:62;:::i;:::-;;821:18473;-1:-1:-1;;;;;;;;;;;2407:1:67;821:18473:99;;;;;;;18528:132;;;;;:::i;:::-;821:18473;;18528:132;;;;18364:100;-1:-1:-1;;;18435:18:99;;821:18473;4059:18:83;18435::99;18291:62;-1:-1:-1;;;18335:18:99;;821:18473;4059:18:83;18335::99;18082:104;-1:-1:-1;;;18149:26:99;;821:18473;16334:26;18149;821:18473;;1442:1461:9;821:18473:99;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;821:18473:99:-;;;;;;2141:12:83;821:18473:99;;;:::i;:::-;2141:12:83;;:::i;:::-;821:18473:99;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;821:18473:99;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;821:18473:99;;;;;;2989:103:67;;;:::i;:::-;3715:28:83;;;:::i;:::-;3810:18;821:18473:99;3810:18:83;;821:18473:99;3832:18:83;3810:40;;;3806:104;;4019:26;;;-1:-1:-1;;;;;821:18473:99;;;4019:31:83;4015:62;;821:18473:99;-1:-1:-1;;;;;821:18473:99;4092:15:83;:44;4088:100;;821:18473:99;;4252:3:83;-1:-1:-1;;;;;821:18473:99;;;;;;:::i;:::-;;;;4329:43:83;821:18473:99;4329:43:83;;821:18473:99;;;;;;;:::i;:::-;;;;4276:98:83;;821:18473:99;4252:132:83;;;;;821:18473:99;;-1:-1:-1;;;4252:132:83;;821:18473:99;;;4252:132:83;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4252:132:83;;;;;;821:18473:99;-1:-1:-1;;4248:207:83;;-1:-1:-1;;;4423:21:83;;821:18473:99;;;;-1:-1:-1;4423:21:83;4248:207;4534:16;;;;4552:21;;;821:18473:99;4534:16:83;;-1:-1:-1;;;;;821:18473:99;;;;4534:16:83;:::i;4252:132::-;;;;;:::i;:::-;821:18473:99;;4252:132:83;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;1724:44:82;;1749:18;821:18473:99;1724:44:82;;821:18473:99;;;1724:44:82;821:18473:99;;;;;;1724:14:82;821:18473:99;1724:44:82;;;;;;;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1724:44:82:-;;;;;;;;;;;;:::i;:::-;;;821:18473:99;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1724:44:82;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;724:43:82;821:18473:99;;;;-1:-1:-1;821:18473:99;;-1:-1:-1;;821:18473:99;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;1139:12:84;15077:16:99;821:18473;15077:16;821:18473;;:::i;:::-;;;;;;;;;15077:16;;;;:::i;:::-;;1055:104:6;;15077:16:99;;;;;;:::i;:::-;15111:10;1139:12:84;;:::i;821:18473:99:-;;;;;;;;;;;;;1055:104:6;;821:18473:99;;1089:6:6;1072:24;1089:6;1072:24;:::i;:::-;1120:6;;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;821:18473:99;;;;;;;;;;;;1055:104:6;;;821:18473:99;;;;-1:-1:-1;;;821:18473:99;;;;;;;;;;;;;;;;;-1:-1:-1;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;821:18473:99:-;;;;;2141:12:83;821:18473:99;;;:::i;2141:12:83:-;;821:18473:99;;;15561:4;821:18473;;;;;;;;;;;;;;;;;;;2432:2;821:18473;;;;;;;;;;;:::i;:::-;2989:103:67;;;;:::i;:::-;16102:32:99;;;:::i;:::-;16177:37;;;;:::i;:::-;16276:13;;;821:18473;16293:18;16276:35;;;16272:99;;16386:24;;;:::i;:::-;16385:25;16381:64;;16576:11;;;;16552:36;16576:11;;16552:36;:::i;:::-;16669:18;;;;;;821:18473;;;16669:32;16665:65;;16746:29;;;:::i;:::-;16745:30;16741:63;;821:18473;;;;-1:-1:-1;;;16875:66:99;;821:18473;16276:13;;821:18473;;;;;;16875:66;;;821:18473;16875:66;;;:::i;:::-;;;-1:-1:-1;;;;;821:18473:99;16875:66;;;;;;;821:18473;16875:66;;;821:18473;16874:67;;16870:125;;821:18473;;17039:3;-1:-1:-1;;;;;821:18473:99;;;;;:::i;:::-;;;;;16276:13;17116:47;;821:18473;;;;;;;:::i;:::-;;;16276:13;17063:102;;821:18473;17039:136;;;;;821:18473;;-1:-1:-1;;;17039:136:99;;821:18473;;;17039:136;;821:18473;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;17039:136:99;;;;;;821:18473;-1:-1:-1;17035:215:99;;-1:-1:-1;;;17214:25:99;;821:18473;;;;;17214:25;;17035:215;17351:11;;17364:21;;;;821:18473;;16276:13;;17329:57;;-1:-1:-1;;;;;821:18473:99;;17329:57;:::i;:::-;;821:18473;;;;;;;;;17402:61;821:18473;;17402:61;;;17480:4;-1:-1:-1;;;;;;;;;;;2407:1:67;17480:4:99;821:18473;;;17039:136;;;;;821:18473;17039:136;;:::i;:::-;821:18473;17039:136;;;;16870:125;16710:20;;;821:18473;16964:20;821:18473;;16964:20;16875:66;;;16276:13;16875:66;;16276:13;16875:66;;;;;;16276:13;16875:66;;;:::i;:::-;;;821:18473;;;;;;;:::i;:::-;16875:66;;;;;;-1:-1:-1;16875:66:99;;;821:18473;;;;;;;;;16381:64;16334:26;;;821:18473;16419:26;821:18473;;16419:26;821:18473;;;;;;-1:-1:-1;;821:18473:99;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;766:49:45;;;:89;;;;821:18473:99;;;;;;;766:89:45;-1:-1:-1;;;829:40:76;;-1:-1:-1;766:89:45;;;821:18473:99;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;-1:-1:-1;;821:18473:99;;;;:::o;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18473:99;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;:::o;:::-;;;;-1:-1:-1;821:18473:99;;;;;-1:-1:-1;821:18473:99;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;:::o;:::-;3088:19;821:18473;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;:::o;:::-;;;1055:104:6;;821:18473:99;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;:::o;:::-;-1:-1:-1;;;;;821:18473:99;;;;;;-1:-1:-1;;821:18473:99;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;821:18473:99;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;821:18473:99;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18473:99;;;;;;:::o;:::-;-1:-1:-1;;;;;821:18473:99;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1055:104:6;;821:18473:99;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;:::i;:::-;;;;1055:104:6;821:18473:99;1055:104:6;;821:18473:99;;;;;;;;:::i;:::-;;-1:-1:-1;;821:18473:99;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;:::o;:::-;;;;;-1:-1:-1;;;;;821:18473:99;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1055:104:6;;821:18473:99;;;;;;;;;;;;;;;;;;;;:::i;:::-;1055:104:6;;;;;821:18473:99;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18473:99;;;;;1055:104:6;821:18473:99;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18473:99;;;;;1055:104:6;821:18473:99;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18473:99;;;;;1055:104:6;821:18473:99;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18473:99;;;;;1055:104:6;821:18473:99;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18473:99;;;;;1055:104:6;821:18473:99;:::i;:::-;;;;;;;:::i;:::-;1055:104:6;821:18473:99;1055:104:6;;821:18473:99;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18473:99;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;:::i;:::-;;;;;;:::o;3667:289::-;3865:34;3667:289;3865:34;821:18473;;;3865:34;;;;;;:::i;:::-;821:18473;;3865:34;3934:14;;;;-1:-1:-1;;;;;821:18473:99;;;;3667:289::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;821:18473:99;;;;;;;;;;;;;4064:22:9;;;;4060:87;;821:18473:99;;;;;;;;;;;;;;4274:33:9;821:18473:99;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;821:18473:99;;3896:19:9;821:18473:99;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;821:18473:99;;;;3881:1:9;821:18473:99;;;;;3881:1:9;821:18473:99;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2989:103:67;;;:::i;:::-;-1:-1:-1;2197:32:83;;;;:::i;:::-;2272:37;;;;:::i;:::-;2371:13;;;;821:18473:99;2388:18:83;2371:35;;;2367:99;;2481:24;;;:::i;:::-;2480:25;2476:64;;2671:11;;;;2647:36;2671:11;;2647:36;:::i;:::-;2764:18;;;;;;821:18473:99;;;2764:32:83;2760:65;;2841:29;;;:::i;:::-;2840:30;2836:63;;821:18473:99;;;;-1:-1:-1;;;2970:66:83;;821:18473:99;2371:13:83;;821:18473:99;;;;;;2970:66:83;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;821:18473:99;2970:66:83;;;;;;;-1:-1:-1;2970:66:83;;;2989:103:67;2969:67:83;;2965:125;;821:18473:99;;3134:3:83;-1:-1:-1;;;;;821:18473:99;;;;;:::i;:::-;;;;-1:-1:-1;2371:13:83;3211:47;;821:18473:99;;;;;;;:::i;:::-;;;2371:13:83;3158:102;;821:18473:99;3134:136:83;;;;;821:18473:99;;-1:-1:-1;;;3134:136:83;;821:18473:99;;2970:66:83;3134:136;;821:18473:99;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;3134:136:83;;;;;;2989:103:67;-1:-1:-1;3130:215:83;;-1:-1:-1;;;3309:25:83;;2970:66;821:18473:99;;;;17214:25;3309::83;3130:215;4569:751:99;3443:21:83;3495:61;3130:215;;;;;;3430:11;3443:21;;821:18473:99;;;;;;;;;4569:751;;:::i;:::-;821:18473;;-1:-1:-1;;;;;821:18473:99;;3495:61:83;;2407:1:67;2365;-1:-1:-1;;;;;;;;;;;2407:1:67;2989:103::o;3134:136:83:-;;;;;-1:-1:-1;3134:136:83;;:::i;:::-;-1:-1:-1;3134:136:83;;;;2970:66;;;2371:13;2970:66;;2371:13;2970:66;;;;;;2371:13;2970:66;;;:::i;:::-;;;821:18473:99;;;;;;;:::i;:::-;2970:66:83;;;;;;-1:-1:-1;2970:66:83;;821:18473:99;;;;;;;:::i;:::-;;;;-1:-1:-1;821:18473:99;;;;;;;-1:-1:-1;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;12791:669;13010:17;;;821:18473;13031:18;13010:39;13006:57;;13106:45;13117:15;13196:36;13117:15;;;13010:17;821:18473;;;13106:45;;;;;;:::i;:::-;821:18473;13010:17;821:18473;;;13196:36;;;;;;:::i;:::-;13250:20;;;821:18473;13250:20;13274:23;;821:18473;-1:-1:-1;13250:47:99;:89;;;;12791:669;13250:142;;;12791:669;13250:203;;;13243:210;;12791:669;:::o;13250:203::-;13010:17;13406:14;;;;;;821:18473;;;;;13396:25;13435:17;;;13010;821:18473;;;;13425:28;13396:57;12791:669;:::o;13250:142::-;821:18473;;;;-1:-1:-1;;;;;821:18473:99;;;;;13355:37;;-1:-1:-1;13250:142:99;;:89;13301:38;;;;;;:::i;:::-;13250:89;;;13006:57;13051:12;;821:18473;13051:12;:::o;3749:292:67:-;2407:1;-1:-1:-1;;;;;;;;;;;821:18473:99;4560:63:67;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:67;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:67;;-1:-1:-1;3696:30:67;821:18473:99;;;;;;;:::i;:::-;;;;-1:-1:-1;821:18473:99;;-1:-1:-1;821:18473:99;;;;-1:-1:-1;821:18473:99;;;;-1:-1:-1;821:18473:99;;;;-1:-1:-1;821:18473:99;;;;-1:-1:-1;821:18473:99;;;;-1:-1:-1;821:18473:99;;;;-1:-1:-1;821:18473:99;;;;-1:-1:-1;821:18473:99;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18473:99;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;:::i;4609:257:83:-;;821:18473:99;;:::i;:::-;-1:-1:-1;821:18473:99;;-1:-1:-1;;;4734:23:83;;;;;821:18473:99;;;;-1:-1:-1;821:18473:99;4734:23:83;821:18473:99;4734:3:83;-1:-1:-1;;;;;821:18473:99;4734:23:83;;;;;;;-1:-1:-1;4734:23:83;;;4609:257;4720:37;;821:18473:99;4771:29:83;;;:55;;;;;4609:257;4767:92;;;;4609:257;:::o;4767:92::-;4835:24;;;-1:-1:-1;4835:24:83;4734:23;821:18473:99;4734:23:83;-1:-1:-1;4835:24:83;4771:55;4804:22;;;-1:-1:-1;4771:55:83;;;;4734:23;;;;;;;-1:-1:-1;4734:23:83;;;;;;:::i;:::-;;;;;596:321:81;821:18473:99;;695:28:81;691:64;;-1:-1:-1;;;;;362:25:81;;;821:18473:99;;362:30:81;;;:78;;;;596:321;765:55;;;553:25;;821:18473:99;-1:-1:-1;;;;;821:18473:99;830:58:81;;906:4;596:321;:::o;830:58::-;868:20;;;-1:-1:-1;868:20:81;;-1:-1:-1;868:20:81;765:55;803:17;;;-1:-1:-1;803:17:81;;-1:-1:-1;803:17:81;362:78;425:15;;;-1:-1:-1;396:44:81;362:78;;;691:64;732:23;;;-1:-1:-1;732:23:81;;-1:-1:-1;732:23:81;821:18473:99;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;-1:-1:-1;821:18473:99;;;;:::o;:::-;;;:::o;5409:681::-;5551:40;5409:681;5551:40;821:18473;;;5551:40;;;;;;:::i;:::-;5662:20;;;821:18473;;5662:24;;5658:247;;5409:681;-1:-1:-1;11507:13:99;;-1:-1:-1;;;;;8544:1067:52;;;-1:-1:-1;11633:17:99;;;;11526:16;;;;-1:-1:-1;11551:3:99;11526:16;;821:18473;;11522:27;;;;;821:18473;;;-1:-1:-1;;;;;821:18473:99;11592:19;;821:18473;;11592:19;:::i;:::-;821:18473;;11633:20;:17;;;:20;:::i;:::-;821:18473;2138:38:52;5662:20:99;8544:1067:52;8509:24;;;;-1:-1:-1;8544:1067:52;;;;;;5551:40:99;-1:-1:-1;8544:1067:52;;;;;;;;-1:-1:-1;8544:1067:52;;;;;;;11551:3:99;8544:1067:52;;5662:20:99;8544:1067:52;11673:8:99;11669:127;;11551:3;821:18473;11507:13;;11669:127;821:18473;;;;;;11735:19;:16;;;:19;:::i;:::-;821:18473;;11706:75;5551:40;11760:20;:17;;;:20;:::i;:::-;821:18473;5662:20;821:18473;;;;11706:75;11669:127;;8544:1067:52;;;;;;;;;;;11522:27:99;;;;;;;;-1:-1:-1;11890:17:99;;;;12001:19;;;;11866:354;11916:3;11890:17;;821:18473;;11886:28;;;;;-1:-1:-1;;;;;821:18473:99;11947:20;;821:18473;;11947:20;:::i;:::-;821:18473;;12001:19;:22;:19;;;:22;:::i;:::-;821:18473;11939:85;;;;;5662:20;821:18473;-1:-1:-1;;;11939:85:99;;11990:4;8544:1067:52;11939:85:99;;821:18473;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;11939:85:99;;;;;;11916:3;-1:-1:-1;11935:275:99;;821:18473;;;;;;12146:20;:17;;;:20;:::i;:::-;821:18473;;12116:79;5551:40;12172:22;:19;;;:22;:::i;:::-;821:18473;5662:20;821:18473;;;;12116:79;11935:275;821:18473;11871:13;;11935:275;;;11939:85;-1:-1:-1;11939:85:99;;;:::i;:::-;;;;11886:28;-1:-1:-1;;12440:20:99;;;;-1:-1:-1;821:18473:99;12305:18;;;-1:-1:-1;12465:19:99;;-1:-1:-1;12332:3:99;12305:18;;821:18473;;12301:29;;;;;-1:-1:-1;;;;;821:18473:99;12364:21;;821:18473;;12364:21;:::i;:::-;821:18473;;12440:20;:23;:20;;;:23;:::i;:::-;821:18473;12465:19;:22;:19;;;:22;:::i;:::-;821:18473;12355:137;;;;;;821:18473;;12355:137;821:18473;-1:-1:-1;821:18473:99;;;5662:20;821:18473;;;;;;;;;;;12355:137;;11990:4;8544:1067:52;12355:137:99;;;:::i;:::-;;;;;;;;;12332:3;-1:-1:-1;12351:392:99;;821:18473;;;;;;12636:21;:18;;;:21;:::i;:::-;821:18473;;12584:144;5662:20;12663:23;:20;;;:23;:::i;:::-;821:18473;12688:22;:19;;;:22;:::i;:::-;821:18473;;;;;;5551:40;821:18473;;;12584:144;12351:392;821:18473;12286:13;;12351:392;;;12355:137;-1:-1:-1;12355:137:99;;;:::i;:::-;;;;12301:29;;;;;;;;;5662:20;821:18473;;;;;:::i;:::-;-1:-1:-1;821:18473:99;;5409:681;:::o;5658:247::-;-1:-1:-1;821:18473:99;;;;;;;;;;5720:49;;;;;;:::i;:::-;;5658:247;5783:112;5551:40;5820:60;821:18473;;5662:20;821:18473;;;;5820:60;5783:112;;5658:247;;1343:634:71;1465:17;-1:-1:-1;29298:17:78;-1:-1:-1;;;29298:17:78;;;29294:103;;1343:634:71;29414:17:78;29423:8;29994:7;29414:17;;;29410:103;;1343:634:71;29539:8:78;29530:17;;;29526:103;;1343:634:71;29655:7:78;29646:16;;;29642:100;;1343:634:71;29768:7:78;29759:16;;;29755:100;;1343:634:71;29881:7:78;29872:16;;;29868:100;;1343:634:71;29985:16:78;;29981:66;;1343:634:71;29994:7:78;1580:94:71;1485:1;821:18473:99;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;821:18473:99;;:::i;:::-;;;;;;;1580:94:71;;;1687:247;-1:-1:-1;;821:18473:99;;-1:-1:-1;;;1741:111:71;;;;821:18473:99;1741:111:71;821:18473:99;1902:10:71;;1898:21;;29994:7:78;1687:247:71;;;;1898:21;1914:5;;1343:634;:::o;29981:66:78:-;30031:1;821:18473:99;;;;29981:66:78;;29868:100;29881:7;29952:1;821:18473:99;;;;29868:100:78;;;29755;29768:7;29839:1;821:18473:99;;;;29755:100:78;;;29642;29655:7;29726:1;821:18473:99;;;;29642:100:78;;;29526:103;29539:8;29612:2;821:18473:99;;;;29526:103:78;;;29410;29423:8;29496:2;821:18473:99;;;;29410:103:78;;;29294;-1:-1:-1;29380:2:78;;-1:-1:-1;;;;821:18473:99;;29294:103:78;;2989::67;;;;;;;:::i;:::-;4111:34:99;;821:18473;;4111:34;;;;;;;:::i;:::-;2941:16;;;;;;;821:18473;2968:17;;;;;;;821:18473;2941:51;2937:110;;3060:17;;;;;;821:18473;3088:19;;;;;;;821:18473;3060:54;3056:113;;3195:18;;;;;;821:18473;3224:20;;;;;;821:18473;3195:56;;;;;:131;;;2989:103:67;3178:187:99;;;3398:78;:50;:16;;821:18473;3424:17;;821:18473;3398:50;;:::i;:::-;3451:18;;821:18473;3398:78;;:::i;:::-;2432:2;3490:30;;3486:117;;4231:20;;;;821:18473;4231:24;4227:182;;2989:103:67;6400:13:99;821:18473;6444:3;6419:16;;821:18473;;6415:27;;;;;10404:1148:52;;4111:34:99;;-1:-1:-1;;;;;821:18473:99;6539:19;;821:18473;;6539:19;:::i;:::-;821:18473;;4231:20;821:18473;;;;;;;;6532:52;;6578:4;6532:52;;;821:18473;6532:52;;;;;;;821:18473;6532:52;;;6444:3;821:18473;;6683:20;821:18473;;6621:19;821:18473;;;;;;6621:16;;:19;:::i;6683:20::-;821:18473;2449:48:52;4231:20:99;10404:1148:52;10365:28;;;;821:18473:99;10404:1148:52;1183:10:84;6532:52:99;10404:1148:52;6578:4:99;10404:1148:52;;;;4111:34:99;821:18473;10404:1148:52;;;;;;;821:18473:99;;10404:1148:52;;;;;;;6444:3:99;10404:1148:52;;;;4231:20:99;10404:1148:52;821:18473:99;2941:16;10404:1148:52;4111:34:99;821:18473;6793:19;821:18473;;;;;;6793:16;;:19;:::i;:::-;821:18473;;4231:20;821:18473;;;;;;;;6786:52;;6578:4;6532:52;6786;;821:18473;6786:52;;;;;;;;;;;821:18473;6786:52;;;6444:3;6909:8;;821:18473;;;6909:63;;6444:3;6905:192;;;;;;821:18473;;6400:13;;6905:192;7019:16;;821:18473;;7061:20;;-1:-1:-1;;;;;821:18473:99;7019:19;;821:18473;;7019:19;:::i;6909:63::-;6936:36;6952:17;;;;:20;:17;;:20;:::i;6936:36::-;-1:-1:-1;6909:63:99;;;;;;6786:52;;;;;;4111:34;6786:52;;;;;;;;;821:18473;6786:52;;;:::i;:::-;;;821:18473;;;;;;;;6786:52;;;;;;;-1:-1:-1;6786:52:99;;10404:1148:52;;;;;;;;;;;;;;6532:52:99;;;4111:34;6532:52;;;;;;;;;821:18473;6532:52;;;:::i;:::-;;;821:18473;;;;;6532:52;;;;;;-1:-1:-1;6532:52:99;;6415:27;;;;;;;;;;;;;821:18473;7145:992;7195:3;7169:17;;821:18473;;7165:28;;;;;-1:-1:-1;;;;;821:18473:99;7291:20;;821:18473;;7291:20;:::i;:::-;821:18473;;4111:34;7321:22;:19;;;:22;:::i;:::-;821:18473;10404:1148:52;4231:20:99;821:18473;;;;;;;;7283:61;;6532:52;7283:61;;821:18473;7283:61;;;;;;;821:18473;7283:61;;;7195:3;-1:-1:-1;1183:10:84;-1:-1:-1;;;;;821:18473:99;;;7362:19;7358:152;;7536:17;;-1:-1:-1;;;;;821:18473:99;7536:20;;:17;;:20;:::i;:::-;821:18473;;7592:22;:19;;;:22;:::i;:::-;821:18473;7528:87;;;;;;4231:20;821:18473;-1:-1:-1;;;7528:87:99;;1183:10:84;6532:52:99;7528:87;;821:18473;6578:4;821:18473;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;7528:87:99;;;;;;7195:3;-1:-1:-1;7524:287:99;;821:18473;7773:22;821:18473;;7730:20;821:18473;;;;;;7730:17;;:20;:::i;7524:287::-;;;;;;;;821:18473;;;;;7900:20;:17;;;:20;:::i;:::-;821:18473;;4111:34;7930:22;:19;;;:22;:::i;:::-;821:18473;10404:1148:52;4231:20:99;821:18473;;;;;;;;7892:61;;6532:52;7892:61;;821:18473;7892:61;;;;;;;821:18473;7892:61;;;7524:287;-1:-1:-1;6578:4:99;-1:-1:-1;;;;;821:18473:99;;;7971:27;7967:160;;821:18473;;7150:13;;;;;;;;;7967:160;8046:17;;821:18473;;8089:22;;-1:-1:-1;;;;;821:18473:99;8046:20;;821:18473;;8046:20;:::i;7892:61::-;;;4111:34;7892:61;;;;;;;;;4111:34;7892:61;;;:::i;:::-;;;821:18473;;;;;;;:::i;:::-;7892:61;;;;;;-1:-1:-1;7892:61:99;;7528:87;821:18473;7528:87;;;:::i;:::-;;;;7358:152;821:18473;7472:22;821:18473;;7429:20;821:18473;;;;;;7429:17;;:20;:::i;7283:61::-;;;4111:34;7283:61;;;;;;;;;4111:34;7283:61;;;:::i;:::-;;;821:18473;;;;;;;:::i;:::-;7283:61;;;;;;-1:-1:-1;7283:61:99;;7165:28;;;;;;;;;;;;8527:19;821:18473;8527:19;;8176:1129;8227:3;8200:18;;821:18473;;8196:29;;;;;8315:81;;4111:34;;-1:-1:-1;;;;;821:18473:99;8324:21;;821:18473;;8324:21;:::i;:::-;821:18473;;8372:23;:20;;;:23;:::i;8315:81::-;;;;;;;;;;821:18473;8315:81;;;8227:3;-1:-1:-1;8424:18:99;;-1:-1:-1;;;;;821:18473:99;8424:21;;:18;;:21;:::i;:::-;821:18473;;8502:23;:20;;;:23;:::i;:::-;821:18473;8527:22;:19;;;:22;:::i;:::-;821:18473;8415:139;;;;;;821:18473;;;;4231:20;821:18473;;;;;;;;;;8415:139;;6578:4;1183:10:84;6532:52:99;8415:139;;;:::i;:::-;;;;;;;;;8227:3;-1:-1:-1;8411:404:99;;821:18473;;8648:152;8760:22;821:18473;8735:23;821:18473;;8691:21;821:18473;;;;;;8691:18;;:21;:::i;8411:404::-;8896:81;8411:404;;;;;;;;4111:34;821:18473;;;;;8905:21;:18;;;:21;:::i;:::-;821:18473;;8953:23;:20;;;:23;:::i;8896:81::-;;;;;;;;;;821:18473;8896:81;;;8411:404;9079:19;9063:38;9079:19;:22;:19;;;:22;:::i;9063:38::-;-1:-1:-1;9044:251:99;;821:18473;;8181:13;;;;;;;9044:251;821:18473;9128:152;9240:22;821:18473;9215:23;821:18473;;9171:21;821:18473;;;;;;;9171:18;;:21;:::i;8896:81::-;;;;4111:34;8896:81;;;;;;;;;821:18473;8896:81;;;:::i;:::-;;;821:18473;;;;;;9063:38;8896:81;;;;;-1:-1:-1;8896:81:99;;8415:139;821:18473;8415:139;;;:::i;:::-;;;;8315:81;;;4111:34;8315:81;;;;;;;;;821:18473;8315:81;;;:::i;:::-;;;821:18473;;;;;8315:81;;;;;;-1:-1:-1;8315:81:99;;8196:29;;;;;;;;;;-1:-1:-1;;;;;4231:20:99;821:18473;;;;;:::i;:::-;;;;;;;;;;;;4111:34;2141:299:82;;821:18473:99;;4231:20;2141:299:82;;821:18473:99;;2941:16;2141:299:82;;821:18473:99;2968:17;2141:299:82;;821:18473:99;;3060:17;2141:299:82;;821:18473:99;4111:34;4231:20;821:18473;;;;:::i;:::-;2095:18:82;821:18473:99;;2046:413:82;;;821:18473:99;;;4231:20;821:18473;;;;;;;;2018:455:82;;;6532:52:99;2018:455:82;;821:18473:99;;10404:1148:52;821:18473:99;;;;4231:20;10404:1148:52;821:18473:99;;;;;;;;;;;10404:1148:52;821:18473:99;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;4231:20;821:18473;;;;;;;;;2941:16;821:18473;;;;;;;3060:17;821:18473;2968:17;821:18473;;;3088:19;821:18473;;;;;;;;;:::i;:::-;;;;;;;;2018:455:82;821:18473:99;;2018:3:82;-1:-1:-1;;;;;821:18473:99;2018:455:82;;;;;;;821:18473:99;2018:455:82;;;8176:1129:99;5343:26:83;;;821:18473:99;5343:26:83;;2407:1:67;821:18473:99;-1:-1:-1;;;;;;;;;;;2407:1:67;2989:103::o;2018:455:82:-;;;;4111:34:99;2018:455:82;;4111:34:99;2018:455:82;;;;;;4111:34:99;2018:455:82;;;:::i;:::-;;;821:18473:99;;;;;2018:455:82;;;;;;;-1:-1:-1;2018:455:82;;4227:182:99;4275:9;4271:128;;4227:182;4271:128;4335:49;;;821:18473;4335:49;;821:18473;4275:9;821:18473;;;;4335:49;3486:117;3543:49;;;821:18473;3543:49;;821:18473;2432:2;821:18473;;;;3543:49;3178:187;3015:21;;;821:18473;3344:21;;821:18473;3344:21;3195:131;3300:19;;;;;;821:18473;3271:55;;3195:131;;;6040:128:9;6109:4;-1:-1:-1;;;;;821:18473:99;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1401:235:82;1592:20;;821:18473:99;;;;;;;;;;;;;1624:4:82;1592:37;1401:235;:::o;4569:751:99:-;4801:40;4569:751;;;;4801:40;821:18473;;;4801:40;;;;;;:::i;:::-;4910:20;;;821:18473;;4910:24;;4906:240;;4569:751;-1:-1:-1;9466:13:99;;9717:17;;;;-1:-1:-1;9485:16:99;;;;-1:-1:-1;;;;;821:18473:99;;;-1:-1:-1;9510:3:99;9485:16;;821:18473;;9481:27;;;;;8544:1067:52;;4801:40:99;;-1:-1:-1;;;;;821:18473:99;9605:19;;821:18473;;9605:19;:::i;:::-;821:18473;;4910:20;821:18473;;;;;;;;9598:41;;;;;;821:18473;9598:41;;;;;;;-1:-1:-1;9598:41:99;;;9510:3;821:18473;8544:1067:52;821:18473:99;;;;;9676:19;:16;;;:19;:::i;:::-;821:18473;;9717:20;:17;;;:20;:::i;:::-;821:18473;2138:38:52;4910:20:99;8544:1067:52;8509:24;;;;-1:-1:-1;8544:1067:52;;9598:41:99;8544:1067:52;;;4801:40:99;-1:-1:-1;8544:1067:52;;;;;;;821:18473:99;-1:-1:-1;8544:1067:52;;;;;;;9510:3:99;8544:1067:52;;4910:20:99;8544:1067:52;4801:40:99;821:18473;;;;;9827:19;:16;;;:19;:::i;:::-;821:18473;;4910:20;821:18473;;;;;;;;9820:41;;;9598;9820;;821:18473;9820:41;;;;;;;-1:-1:-1;9820:41:99;;;9510:3;9932:8;;821:18473;;;9932:63;;9510:3;9928:190;;;;821:18473;;9466:13;;9928:190;821:18473;10022:81;10082:20;821:18473;;10042:19;821:18473;;;;;;;10042:16;;:19;:::i;:::-;821:18473;;10082:17;;:20;:::i;:::-;821:18473;4910:20;821:18473;-1:-1:-1;;;10022:81:99;;821:18473;;;10071:4;;9598:41;10022:81;;;:::i;9932:63::-;9959:36;9975:17;;;:20;:17;;;:20;:::i;9959:36::-;-1:-1:-1;9932:63:99;;;;9820:41;;;;4801:40;9820:41;;;;;;;;;821:18473;9820:41;;;:::i;:::-;;;821:18473;;;;;9820:41;;;;;;;-1:-1:-1;9820:41:99;;8544:1067:52;;;;;;;;;;;9598:41:99;;;4801:40;9598:41;;;;;;;;;821:18473;9598:41;;;:::i;:::-;;;821:18473;;;;;9598:41;;;;;;-1:-1:-1;9598:41:99;;9481:27;-1:-1:-1;;10321:19:99;;;;-1:-1:-1;;;10210:17:99;;;;-1:-1:-1;9481:27:99;;10236:3;10210:17;;821:18473;;10206:28;;;;;-1:-1:-1;;;;;821:18473:99;10267:20;;821:18473;;10267:20;:::i;:::-;821:18473;;10321:22;:19;;;:22;:::i;:::-;821:18473;10259:85;;;;;;4910:20;821:18473;-1:-1:-1;;;10259:85:99;;10310:4;9598:41;10259:85;;821:18473;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;-1:-1:-1;;821:18473:99;;;;;;-1:-1:-1;;10259:85:99;;;;;;10236:3;-1:-1:-1;10255:283:99;;821:18473;;;;10500:22;821:18473;10459:20;10438:85;821:18473;;;;;;10459:17;;:20;:::i;10500:22::-;821:18473;4910:20;821:18473;-1:-1:-1;;;10438:85:99;;821:18473;;;10310:4;;9598:41;10438:85;;;:::i;10255:283::-;;;;;821:18473;;;;;10608:20;:17;;;:20;:::i;:::-;821:18473;;4801:40;10638:22;:19;;;:22;:::i;:::-;821:18473;8544:1067:52;4910:20:99;821:18473;;;;;;;;10600:61;;9598:41;10600:61;;821:18473;10600:61;;;;;;;;-1:-1:-1;10600:61:99;;;10255:283;-1:-1:-1;;;;;;821:18473:99;10600:67;10596:198;;821:18473;;10191:13;;;;;;10596:198;821:18473;10694:85;10756:22;821:18473;;10715:20;821:18473;;;;;;;10715:17;;:20;:::i;10600:61::-;;;;4801:40;10600:61;;;;;;;;;4801:40;10600:61;;;:::i;:::-;;;821:18473;;;;;;;;:::i;:::-;10600:61;;;;;;-1:-1:-1;10600:61:99;;10259:85;-1:-1:-1;10259:85:99;;;:::i;:::-;;;;10206:28;;;;;;;;-1:-1:-1;821:18473:99;10887:18;;11047:19;11022:20;;;11047:19;;10863:480;10914:3;10887:18;;821:18473;;10883:29;;;;;-1:-1:-1;;;;;821:18473:99;10946:21;;821:18473;;10946:21;:::i;:::-;821:18473;;11022:23;:20;;;:23;:::i;:::-;821:18473;11047:22;:19;;;:22;:::i;:::-;821:18473;10937:137;;;;;;821:18473;-1:-1:-1;821:18473:99;;;4910:20;821:18473;;;;;;;;;;;10937:137;;10310:4;9598:41;10937:137;;;:::i;:::-;;;;;;;;;10914:3;-1:-1:-1;10933:400:99;;821:18473;;11253:23;821:18473;11278:22;821:18473;11211:21;11168:150;821:18473;;;;;;;11211:18;;:21;:::i;:::-;821:18473;;11253:20;;:23;:::i;:::-;821:18473;11278:19;;:22;:::i;:::-;821:18473;4910:20;821:18473;-1:-1:-1;;;11168:150:99;;-1:-1:-1;;;;;821:18473:99;;;9598:41;11168:150;;821:18473;10310:4;821:18473;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;10933:400;;821:18473;;10868:13;;;10937:137;-1:-1:-1;10937:137:99;;;:::i;:::-;;;;10883:29;;;;;;;;4910:20;821:18473;;;;;:::i;4906:240::-;-1:-1:-1;821:18473:99;;;;;;;;;;4968:49;;;;;;:::i;:::-;;4906:240;5031:105;821:18473;5070:51;;;;-1:-1:-1;5070:51:99;;821:18473;;;;-1:-1:-1;5070:51:99;821:18473;;;;;;;;;;;;;;;:::o;13466:1425::-;13649:19;;;;;;821:18473;13649:19;13678:18;;;;;821:18473;-1:-1:-1;13645:97:99;;821:18473;13802:3;13775:18;;821:18473;13771:29;;;;;13825:19;;-1:-1:-1;;;;;821:18473:99;13825:22;;:19;;:22;:::i;:::-;821:18473;;;;;;;13851:21;:18;;;:21;:::i;:::-;821:18473;;13825:47;;;:99;;;13802:3;13821:150;;821:18473;;13756:13;;13821:150;13944:12;;;;;821:18473;13944:12;:::o;13825:99::-;13876:20;:23;:20;;;;;:23;:::i;:::-;821:18473;13902:22;:19;13876:20;13902:19;;;:22;:::i;:::-;821:18473;-1:-1:-1;13825:99:99;;13771:29;;;;;14020:20;;;;;;821:18473;14020:20;14050:19;;;;;821:18473;-1:-1:-1;14016:99:99;;821:18473;14176:3;14148:19;;821:18473;14144:30;;;;;14216:20;;-1:-1:-1;;;;;821:18473:99;14216:23;;:20;;:23;:::i;:::-;821:18473;;;;;;;14243:22;:19;;;:22;:::i;:::-;821:18473;;14216:49;;;:126;;;14176:3;14195:174;;821:18473;;14129:13;;14216:126;14289:22;:25;:22;;;;;:25;:::i;:::-;821:18473;14318:24;:21;14289:22;14318:21;;;:24;:::i;:::-;821:18473;14289:53;;14216:126;;14144:30;;;;;14420:21;;;;;;821:18473;14451:20;14420:21;14451:20;;;;;821:18473;-1:-1:-1;14416:101:99;;821:18473;14579:3;14550:20;;821:18473;14546:31;;;;;14619:21;;-1:-1:-1;;;;;821:18473:99;14619:24;;:21;;:24;:::i;:::-;821:18473;;;;;;;14647:23;:20;;;:23;:::i;:::-;821:18473;;14619:51;;;:130;;;14579:3;14619:206;;;;14579:3;14598:254;;821:18473;;14531:13;;14619:206;14773:22;:25;:22;;;;;:25;:::i;:::-;821:18473;14801:24;:21;14773:22;14801:21;;;:24;:::i;:::-;821:18473;-1:-1:-1;14619:206:99;;:130;14694:23;:26;:23;;;;;:26;:::i;:::-;821:18473;14724:25;:22;14694:23;14724:22;;;:25;:::i;:::-;821:18473;14694:55;;14619:130;;14546:31;;;;;;821:18473;13466:1425;:::o;14416:101::-;14494:12;;;;821:18473;14494:12;:::o;821:18473::-;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;821:18473:99;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;821:18473:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 5900,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 5944,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 5987,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 14603,
          "length": 32
        }
      ],
      "56213": [
        {
          "start": 5392,
          "length": 32
        }
      ],
      "56216": [
        {
          "start": 1403,
          "length": 32
        },
        {
          "start": 4019,
          "length": 32
        },
        {
          "start": 4444,
          "length": 32
        },
        {
          "start": 5047,
          "length": 32
        },
        {
          "start": 6391,
          "length": 32
        },
        {
          "start": 9817,
          "length": 32
        },
        {
          "start": 10938,
          "length": 32
        },
        {
          "start": 14351,
          "length": 32
        }
      ],
      "56218": [
        {
          "start": 1467,
          "length": 32
        },
        {
          "start": 3846,
          "length": 32
        },
        {
          "start": 4365,
          "length": 32
        },
        {
          "start": 4968,
          "length": 32
        },
        {
          "start": 5342,
          "length": 32
        },
        {
          "start": 5727,
          "length": 32
        },
        {
          "start": 6217,
          "length": 32
        },
        {
          "start": 9643,
          "length": 32
        },
        {
          "start": 10349,
          "length": 32
        },
        {
          "start": 14178,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "MAX_BUNDLE_ITEMS()": "11453bb7",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "collectEscrow(bytes32,bytes32)": "2c713cd9",
    "collectEscrowRaw(bytes32,bytes32)": "891d9ea8",
    "decodeObligationData(bytes)": "c93844be",
    "doObligation((address,bytes,uint256,address[],uint256[],address[],uint256[],address[],uint256[],uint256[]),uint64)": "55b0769b",
    "doObligationFor((address,bytes,uint256,address[],uint256[],address[],uint256[],address[],uint256[],uint256[]),uint64,address)": "cf84e82c",
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
    "unsafePartiallyCollectEscrow(bytes32,bytes32)": "0fcec5b1",
    "unsafePartiallyReclaimExpired(bytes32)": "97524016",
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ArrayLengthMismatch\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC20TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC721TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\"}],\"name\":\"IncorrectPayment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"provided\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"max\",\"type\":\"uint256\"}],\"name\":\"TooManyBundleItems\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailedOnRelease\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC20TransferFailedOnRelease\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC721TransferFailedOnRelease\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailedOnRelease\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_BUNDLE_ITEMS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrowRaw\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"extractArbiterAndDemand\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"unsafePartiallyCollectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"unsafePartiallyReclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"},\"unsafePartiallyCollectEscrow(bytes32,bytes32)\":{\"details\":\"Use only as a last resort when some tokens in the bundle cannot be collected. Failed transfers emit events but do not revert. The escrow will be marked as collected even if some tokens remain stuck. This can result in permanent loss of stuck tokens.\"},\"unsafePartiallyReclaimExpired(bytes32)\":{\"details\":\"Use only as a last resort when some tokens in the bundle cannot be reclaimed. Failed transfers emit events but do not revert. The escrow will be marked as reclaimed even if some tokens remain stuck. This can result in permanent loss of stuck tokens.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"unsafePartiallyCollectEscrow(bytes32,bytes32)\":{\"notice\":\"Unsafe partial escrow collection - continues on individual transfer failures\"},\"unsafePartiallyReclaimExpired(bytes32)\":{\"notice\":\"Unsafe partial reclaim - continues on individual transfer failures\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/default/TokenBundleEscrowObligation.sol\":\"TokenBundleEscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0xd5ea07362ab630a6a3dee4285a74cf2377044ca2e4be472755ad64d7c5d4b69d\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da5e832b40fc5c3145d3781e2e5fa60ac2052c9d08af7e300dc8ab80c4343100\",\"dweb:/ipfs/QmTzf7N5ZUdh5raqtzbM11yexiUoLC9z3Ws632MCuycq1d\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0x0afcb7e740d1537b252cb2676f600465ce6938398569f09ba1b9ca240dde2dfc\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1c299900ac4ec268d4570ecef0d697a3013cd11a6eb74e295ee3fbc945056037\",\"dweb:/ipfs/Qmab9owJoxcA7vJT5XNayCMaUR1qxqj1NDzzisduwaJMcZ\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0x1a6221315ce0307746c2c4827c125d821ee796c74a676787762f4778671d4f44\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1bb2332a7ee26dd0b0de9b7fe266749f54820c99ab6a3bcb6f7e6b751d47ee2d\",\"dweb:/ipfs/QmcRWpaBeCYkhy68PR3B4AgD7asuQk7PwkWxrvJbZcikLF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xf189f9b417fe1931e1ab706838aff1128528694a9fcdb5ff7665197f2ca57d09\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2ff0143c836c8c9f85d13708733c09e21251395847fccfb518bf3b556726a840\",\"dweb:/ipfs/QmP69sjjrQrhYAsvCSSB69Bx66SiUPdQUqdzMYnf4wANHm\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x6ec6d7fce29668ede560c7d2e10f9d10de3473f5298e431e70a5767db42fa620\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ac0139e51874aeec0730d040e57993187541777eb01d5939c06d5d2b986a54e8\",\"dweb:/ipfs/QmZbMbdPzusXuX9FGkyArV8hgzKLBZaL5RzMtCdCawtwPF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol\":{\"keccak256\":\"0x8727aacfc1f069266528eef6380f351d4d4d907b56715e799e0a6bc2d1362db7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://aa0dcc5e88b91ae16e4d08c3e43af2e9cacfc98bdd9b4eb015f8b022a8efca5c\",\"dweb:/ipfs/QmS5NxwRNqCsc6Te4a18nKU51tCh8RjkF4ATJvZms48Y4X\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0x74ed01eb66b923d0d0cfe3be84604ac04b76482a55f9dd655e1ef4d367f95bc2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5282825a626cfe924e504274b864a652b0023591fa66f06a067b25b51ba9b303\",\"dweb:/ipfs/QmeCfPykghhMc81VJTrHTC7sF6CRvaA1FXVq2pJhwYp1dV\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x304d732678032a9781ae85c8f204c8fba3d3a5e31c02616964e75cfdc5049098\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://299ced486011781dc98f638059678323c03079fefae1482abaa2135b22fa92d0\",\"dweb:/ipfs/QmbZNbcPTBxNvwChavN2kkZZs7xHhYL7mv51KrxMhsMs3j\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xf78f05f3b8c9f75570e85300d7b4600d7f6f6a198449273f31d44c1641adb46f\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://e28b872613b45e0e801d4995aa4380be2531147bfe2d85c1d6275f1de514fba3\",\"dweb:/ipfs/QmeeFcfShHYaS3BdgVj78nxR28ZaVUwbvr66ud8bT6kzw9\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377\",\"dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0xb600ec42b766fee45645fd148a2154d63cb964859545cf973277721db472edab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://98dd51bad2ef82faf14593c8d5cb8c2834fba287dea5c5bbb6e6107640e29e7f\",\"dweb:/ipfs/QmaCk9ghcsnzpHKVPdbuj83VC92YXGkRrV7xjHWya4r6Qo\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0x2938018e0e6ab1e92a62cd70479fa28250235836aabd5a1a4603da7e4fc13846\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://86cf4437d22fb38e298a17c9e5a5177bef28e6ab28a5748626df3501f0d114f4\",\"dweb:/ipfs/QmRuSzs2cUZjycTzVvD3e3m8jA7cUu1M2s4KmB172Z6N8D\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xe27fdb0826bbaf3ba2b553859e500bc065a3ce4d5ad32cfa3fdc8878b6dfcae9\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://437e871a4477e0c9b0d4300f52e45c4f3f9c72a8c30cebee983c6fa6ab570727\",\"dweb:/ipfs/QmXFx9BnkRjiMvSSRc9CqQZzR5fMjzyq2ze7fQXitBecT5\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/escrow/default/TokenBundleEscrowObligation.sol\":{\"keccak256\":\"0xcc7918bcf648843d5f754e6d10f965ca25ae8a99fba6e363a244d9047e00bed8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://4018a2dc72d5a86c60912c3d74a8fb7705440f8bdd9d2868df22318bb63aaeaa\",\"dweb:/ipfs/QmYi1phHq3EWxpzrYXPB2LsY99kEZzCB6NscFEefxPr6m2\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.27+commit.40a35a09"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract IEAS",
              "name": "_eas",
              "type": "address"
            },
            {
              "internalType": "contract ISchemaRegistry",
              "name": "_schemaRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "AccessDenied"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "ArrayLengthMismatch"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "attestationId",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "AttestationNotFound"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "AttestationRevoked"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "DeadlineExpired"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC1155TransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC20TransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC721TransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "received",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "IncorrectPayment"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InsufficientValue"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidAttestationUid"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidEAS"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidEscrowAttestation"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidFulfillment"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidLength"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "NativeTokenTransferFailed"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotFromThisAttester"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotPayable"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "ReentrancyGuardReentrantCall"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "attestationId",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "RevocationFailed"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "SchemaRegistrationFailed"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "provided",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "max",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "TooManyBundleItems"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedCall"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256",
              "indexed": false
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "ERC1155TransferFailedOnRelease",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "ERC20TransferFailedOnRelease",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "ERC721TransferFailedOnRelease",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "escrow",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "fulfillment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "fulfiller",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "EscrowCollected",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "escrow",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "EscrowMade",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "NativeTokenTransferFailedOnRelease",
          "anonymous": false
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "ATTESTATION_SCHEMA",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "MAX_BUNDLE_ITEMS",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "attestation",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "attest",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "obligation",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            },
            {
              "internalType": "bytes",
              "name": "demand",
              "type": "bytes"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "checkObligation",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "escrow",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "fulfillment",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "collectEscrow",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_escrow",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_fulfillment",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "collectEscrowRaw",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "decodeObligationData",
          "outputs": [
            {
              "internalType": "struct TokenBundleEscrowObligation.ObligationData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "uint256",
                  "name": "nativeAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address[]",
                  "name": "erc20Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc20Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc721Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc721TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc1155Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155Amounts",
                  "type": "uint256[]"
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct TokenBundleEscrowObligation.ObligationData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "uint256",
                  "name": "nativeAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address[]",
                  "name": "erc20Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc20Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc721Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc721TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc1155Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155Amounts",
                  "type": "uint256[]"
                }
              ]
            },
            {
              "internalType": "uint64",
              "name": "expirationTime",
              "type": "uint64"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "doObligation",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct TokenBundleEscrowObligation.ObligationData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "uint256",
                  "name": "nativeAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address[]",
                  "name": "erc20Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc20Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc721Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc721TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc1155Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155Amounts",
                  "type": "uint256[]"
                }
              ]
            },
            {
              "internalType": "uint64",
              "name": "expirationTime",
              "type": "uint64"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "doObligationFor",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "expirationTime",
              "type": "uint64"
            },
            {
              "internalType": "bytes32",
              "name": "refUID",
              "type": "bytes32"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "doObligationRaw",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "uid_",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "extractArbiterAndDemand",
          "outputs": [
            {
              "internalType": "address",
              "name": "arbiter",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "demand",
              "type": "bytes"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "getObligationData",
          "outputs": [
            {
              "internalType": "struct TokenBundleEscrowObligation.ObligationData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "uint256",
                  "name": "nativeAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "address[]",
                  "name": "erc20Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc20Amounts",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc721Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc721TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "address[]",
                  "name": "erc1155Tokens",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155TokenIds",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "erc1155Amounts",
                  "type": "uint256[]"
                }
              ]
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "getSchema",
          "outputs": [
            {
              "internalType": "struct SchemaRecord",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "contract ISchemaResolver",
                  "name": "resolver",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "string",
                  "name": "schema",
                  "type": "string"
                }
              ]
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "pure",
          "type": "function",
          "name": "isPayable",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation[]",
              "name": "attestations",
              "type": "tuple[]",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            },
            {
              "internalType": "uint256[]",
              "name": "values",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "multiAttest",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation[]",
              "name": "attestations",
              "type": "tuple[]",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            },
            {
              "internalType": "uint256[]",
              "name": "values",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "multiRevoke",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onERC1155BatchReceived",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onERC1155Received",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "reclaimExpired",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct Attestation",
              "name": "attestation",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "uid",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "revocationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "revoke",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_escrow",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_fulfillment",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "unsafePartiallyCollectEscrow",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "unsafePartiallyReclaimExpired",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "version",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "payable",
          "type": "receive"
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "params": {
              "attestation": "The new attestation."
            },
            "returns": {
              "_0": "Whether the attestation is valid."
            }
          },
          "isPayable()": {
            "returns": {
              "_0": "Whether the resolver supports ETH transfers."
            }
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "params": {
              "attestations": "The new attestations.",
              "values": "Explicit ETH amounts which were sent with each attestation."
            },
            "returns": {
              "_0": "Whether all the attestations are valid."
            }
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "params": {
              "attestations": "The existing attestations to be revoked.",
              "values": "Explicit ETH amounts which were sent with each revocation."
            },
            "returns": {
              "_0": "Whether the attestations can be revoked."
            }
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "params": {
              "attestation": "The existing attestation to be revoked."
            },
            "returns": {
              "_0": "Whether the attestation can be revoked."
            }
          },
          "supportsInterface(bytes4)": {
            "details": "Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas."
          },
          "unsafePartiallyCollectEscrow(bytes32,bytes32)": {
            "details": "Use only as a last resort when some tokens in the bundle cannot be collected. Failed transfers emit events but do not revert. The escrow will be marked as collected even if some tokens remain stuck. This can result in permanent loss of stuck tokens."
          },
          "unsafePartiallyReclaimExpired(bytes32)": {
            "details": "Use only as a last resort when some tokens in the bundle cannot be reclaimed. Failed transfers emit events but do not revert. The escrow will be marked as reclaimed even if some tokens remain stuck. This can result in permanent loss of stuck tokens."
          },
          "version()": {
            "returns": {
              "_0": "Semver contract version as a string."
            }
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "notice": "Processes an attestation and verifies whether it's valid."
          },
          "isPayable()": {
            "notice": "Checks if the resolver can be sent ETH."
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "notice": "Processes multiple attestations and verifies whether they are valid."
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            "notice": "Processes revocation of multiple attestation and verifies they can be revoked."
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "notice": "Processes an attestation revocation and verifies if it can be revoked."
          },
          "unsafePartiallyCollectEscrow(bytes32,bytes32)": {
            "notice": "Unsafe partial escrow collection - continues on individual transfer failures"
          },
          "unsafePartiallyReclaimExpired(bytes32)": {
            "notice": "Unsafe partial reclaim - continues on individual transfer failures"
          },
          "version()": {
            "notice": "Returns the full semver contract version."
          }
        },
        "version": 1
      }
    },
    "settings": {
      "remappings": [
        "@eas/=lib/eas-contracts/contracts/",
        "@erc8004/=lib/erc-8004-contracts/contracts/",
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc-8004-contracts/=lib/erc-8004-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/",
        "hardhat/=lib/eas-contracts/node_modules/hardhat/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/"
      ],
      "optimizer": {
        "enabled": true,
        "runs": 200
      },
      "metadata": {
        "bytecodeHash": "ipfs"
      },
      "compilationTarget": {
        "src/obligations/escrow/default/TokenBundleEscrowObligation.sol": "TokenBundleEscrowObligation"
      },
      "evmVersion": "prague",
      "libraries": {},
      "viaIR": true
    },
    "sources": {
      "lib/eas-contracts/contracts/Common.sol": {
        "keccak256": "0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685",
        "urls": [
          "bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d",
          "dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/IEAS.sol": {
        "keccak256": "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        "urls": [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        "keccak256": "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        "urls": [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        "keccak256": "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        "urls": [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/Semver.sol": {
        "keccak256": "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        "urls": [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        "keccak256": "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        "urls": [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        "keccak256": "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        "urls": [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol": {
        "keccak256": "0xd5ea07362ab630a6a3dee4285a74cf2377044ca2e4be472755ad64d7c5d4b69d",
        "urls": [
          "bzz-raw://da5e832b40fc5c3145d3781e2e5fa60ac2052c9d08af7e300dc8ab80c4343100",
          "dweb:/ipfs/QmTzf7N5ZUdh5raqtzbM11yexiUoLC9z3Ws632MCuycq1d"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol": {
        "keccak256": "0x0afcb7e740d1537b252cb2676f600465ce6938398569f09ba1b9ca240dde2dfc",
        "urls": [
          "bzz-raw://1c299900ac4ec268d4570ecef0d697a3013cd11a6eb74e295ee3fbc945056037",
          "dweb:/ipfs/Qmab9owJoxcA7vJT5XNayCMaUR1qxqj1NDzzisduwaJMcZ"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol": {
        "keccak256": "0x1a6221315ce0307746c2c4827c125d821ee796c74a676787762f4778671d4f44",
        "urls": [
          "bzz-raw://1bb2332a7ee26dd0b0de9b7fe266749f54820c99ab6a3bcb6f7e6b751d47ee2d",
          "dweb:/ipfs/QmcRWpaBeCYkhy68PR3B4AgD7asuQk7PwkWxrvJbZcikLF"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol": {
        "keccak256": "0xf189f9b417fe1931e1ab706838aff1128528694a9fcdb5ff7665197f2ca57d09",
        "urls": [
          "bzz-raw://2ff0143c836c8c9f85d13708733c09e21251395847fccfb518bf3b556726a840",
          "dweb:/ipfs/QmP69sjjrQrhYAsvCSSB69Bx66SiUPdQUqdzMYnf4wANHm"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol": {
        "keccak256": "0x6ec6d7fce29668ede560c7d2e10f9d10de3473f5298e431e70a5767db42fa620",
        "urls": [
          "bzz-raw://ac0139e51874aeec0730d040e57993187541777eb01d5939c06d5d2b986a54e8",
          "dweb:/ipfs/QmZbMbdPzusXuX9FGkyArV8hgzKLBZaL5RzMtCdCawtwPF"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol": {
        "keccak256": "0x8727aacfc1f069266528eef6380f351d4d4d907b56715e799e0a6bc2d1362db7",
        "urls": [
          "bzz-raw://aa0dcc5e88b91ae16e4d08c3e43af2e9cacfc98bdd9b4eb015f8b022a8efca5c",
          "dweb:/ipfs/QmS5NxwRNqCsc6Te4a18nKU51tCh8RjkF4ATJvZms48Y4X"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        "keccak256": "0x74ed01eb66b923d0d0cfe3be84604ac04b76482a55f9dd655e1ef4d367f95bc2",
        "urls": [
          "bzz-raw://5282825a626cfe924e504274b864a652b0023591fa66f06a067b25b51ba9b303",
          "dweb:/ipfs/QmeCfPykghhMc81VJTrHTC7sF6CRvaA1FXVq2pJhwYp1dV"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol": {
        "keccak256": "0x304d732678032a9781ae85c8f204c8fba3d3a5e31c02616964e75cfdc5049098",
        "urls": [
          "bzz-raw://299ced486011781dc98f638059678323c03079fefae1482abaa2135b22fa92d0",
          "dweb:/ipfs/QmbZNbcPTBxNvwChavN2kkZZs7xHhYL7mv51KrxMhsMs3j"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol": {
        "keccak256": "0xf78f05f3b8c9f75570e85300d7b4600d7f6f6a198449273f31d44c1641adb46f",
        "urls": [
          "bzz-raw://e28b872613b45e0e801d4995aa4380be2531147bfe2d85c1d6275f1de514fba3",
          "dweb:/ipfs/QmeeFcfShHYaS3BdgVj78nxR28ZaVUwbvr66ud8bT6kzw9"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Bytes.sol": {
        "keccak256": "0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33",
        "urls": [
          "bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147",
          "dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        "keccak256": "0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a",
        "urls": [
          "bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a",
          "dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol": {
        "keccak256": "0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53",
        "urls": [
          "bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99",
          "dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol": {
        "keccak256": "0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97",
        "urls": [
          "bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b",
          "dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        "keccak256": "0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a",
        "urls": [
          "bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a",
          "dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol": {
        "keccak256": "0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e",
        "urls": [
          "bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377",
          "dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
        "keccak256": "0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c",
        "urls": [
          "bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617",
          "dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        "keccak256": "0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c",
        "urls": [
          "bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c",
          "dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        "keccak256": "0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54",
        "urls": [
          "bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8",
          "dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        "keccak256": "0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3",
        "urls": [
          "bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03",
          "dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ"
        ],
        "license": "MIT"
      },
      "src/ArbiterUtils.sol": {
        "keccak256": "0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f",
        "urls": [
          "bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2",
          "dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseAttester.sol": {
        "keccak256": "0xb600ec42b766fee45645fd148a2154d63cb964859545cf973277721db472edab",
        "urls": [
          "bzz-raw://98dd51bad2ef82faf14593c8d5cb8c2834fba287dea5c5bbb6e6107640e29e7f",
          "dweb:/ipfs/QmaCk9ghcsnzpHKVPdbuj83VC92YXGkRrV7xjHWya4r6Qo"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseEscrowObligation.sol": {
        "keccak256": "0x2938018e0e6ab1e92a62cd70479fa28250235836aabd5a1a4603da7e4fc13846",
        "urls": [
          "bzz-raw://86cf4437d22fb38e298a17c9e5a5177bef28e6ab28a5748626df3501f0d114f4",
          "dweb:/ipfs/QmRuSzs2cUZjycTzVvD3e3m8jA7cUu1M2s4KmB172Z6N8D"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseObligation.sol": {
        "keccak256": "0xe27fdb0826bbaf3ba2b553859e500bc065a3ce4d5ad32cfa3fdc8878b6dfcae9",
        "urls": [
          "bzz-raw://437e871a4477e0c9b0d4300f52e45c4f3f9c72a8c30cebee983c6fa6ab570727",
          "dweb:/ipfs/QmXFx9BnkRjiMvSSRc9CqQZzR5fMjzyq2ze7fQXitBecT5"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629",
        "urls": [
          "bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9",
          "dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"
        ],
        "license": "UNLICENSED"
      },
      "src/SchemaRegistryUtils.sol": {
        "keccak256": "0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63",
        "urls": [
          "bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600",
          "dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/default/TokenBundleEscrowObligation.sol": {
        "keccak256": "0xcc7918bcf648843d5f754e6d10f965ca25ae8a99fba6e363a244d9047e00bed8",
        "urls": [
          "bzz-raw://4018a2dc72d5a86c60912c3d74a8fb7705440f8bdd9d2868df22318bb63aaeaa",
          "dweb:/ipfs/QmYi1phHq3EWxpzrYXPB2LsY99kEZzCB6NscFEefxPr6m2"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 99
} as const;
