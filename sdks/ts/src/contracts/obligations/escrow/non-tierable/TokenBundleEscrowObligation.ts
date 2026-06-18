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
      "name": "InvalidSchema",
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
    "object": "0x610160806040523461029e576040816146d2803803809161002082856102a2565b83398101031261029e5780516001600160a01b0381169182820361029e5760200151916001600160a01b0383169081840361029e57610120936040519161006786846102a2565b60e283527f6164647265737320617262697465722c2062797465732064656d616e642c207560208401527f696e74323536206e6174697665416d6f756e742c20616464726573735b5d206560408401527f72633230546f6b656e732c2075696e743235365b5d206572633230416d6f756e60608401527f74732c20616464726573735b5d20657263373231546f6b656e732c2075696e7460808401527f3235365b5d20657263373231546f6b656e4964732c20616464726573735b5d2060a08401527f65726331313535546f6b656e732c2075696e743235365b5d206572633131353560c08401527f546f6b656e4964732c2075696e743235365b5d2065726331313535416d6f756e60e084015261747360f01b6101008401526001608052600360a0525f60c0521561028f57836101a99460e05285526101005230916103bd565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055604051614139918261059983396080518261170c015260a05182611738015260c05182611763015260e0518261390c0152610100518261151001525181818161057b01528181610fb30152818161115c015281816113b7015281816118e90152818161263d01528181612abb01526138100152610140518181816105bb01528181610f060152818161110d01528181611368015281816114de0152818161165f015281816118490152818161259d0152818161284c01526137630152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b038211908210176102c557604052565b634e487b7160e01b5f52604160045260245ffd5b60208183031261029e578051906001600160401b03821161029e57019060808282031261029e5760405191608083016001600160401b038111848210176102c5576040528051835260208101516001600160a01b038116810361029e5760208401526040810151801515810361029e5760408401526060810151906001600160401b03821161029e570181601f8201121561029e578051906001600160401b0382116102c55760405192610397601f8401601f1916602001856102a2565b8284526020838301011161029e57815f9260208093018386015e83010152606082015290565b929160405190602082018351926104076015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a198101845201826102a2565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156105185787915f9161057e575b505114610578579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610544575b5061052357505f602491604051928380926351753e3760e11b82528760048301525afa80156105185783915f916104f6575b5051146104f45750639e6113d560e01b5f5260045260245ffd5b565b61051291503d805f833e61050a81836102a2565b8101906102d9565b5f6104da565b6040513d5f823e3d90fd5b91928091508203610532575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d602011610570575b81610560602093836102a2565b8101031261029e5751905f6104a8565b3d9150610553565b50505050565b61059291503d805f833e61050a81836102a2565b5f61044256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714611a77575080630fcec5b11461181657806311453bb7146117fa5780632c713cd9146117dc57806354fd4d50146116eb57806355b0769b146116825780635bf2f20d146116475780636b122fe01461149d5780637d2c2931146113395780638371ef59146112da57806388e5b2d91461128c578063891d9ea8146112ab57806391db0b7e1461128c57806397524016146110de578063b3b902d4146106dc578063bc197c8114610646578063c6ec50701461053a578063c93844be14610377578063ce46e0461461035b578063cf84e82c146102d5578063e49617e1146102ba578063e60c3505146102ba578063e6c9714d146101935763f23a6e610361000f57346101905760a036600319011261019057610152611cec565b5061015b611d02565b506084356001600160401b03811161018e5761017b903690600401611c21565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461019057606036600319011261019057600435906001600160401b03821161019057610140600319833603011261019057604051916101d383611b78565b80600401358352602481013560208401526101f060448201611b1a565b604084015261020160648201611b1a565b606084015261021260848201611b1a565b608084015260a481013560a084015261022d60c48201611d18565b60c084015261023e60e48201611d18565b60e084015261010481013580151581036102b6576101008401526101248101356001600160401b0381116102b65761027b91369101600401611c21565b610120830152602435906001600160401b0382116101905760206102ac846102a63660048701611c21565b9061284a565b6040519015158152f35b8280fd5b60206102ac6102c836611efc565b6102d061390a565b61394b565b506060366003190112610190576004356001600160401b03811161018e57610140600319823603011261018e5761030a611b04565b604435929091906001600160a01b0384168403610190576020610353858561034061034e87604051928391600401888301612097565b03601f198101835282611baf565b6130c0565b604051908152f35b5034610190578060031936011261019057602090604051908152f35b5034610190576020366003190112610190576004356001600160401b03811161018e576103a8903690600401611cbf565b6103b392919261279b565b5082019160208184031261018e578035906001600160401b0382116102b65701906101408284031261019057604051916103ec83611b78565b6103f581611d18565b835260208101356001600160401b0381116102b65784610416918301611c21565b60208401526040810135604084015260608101356001600160401b0381116102b657846104449183016127e5565b606084015260808101356001600160401b0381116102b65784610468918301611d43565b608084015260a08101356001600160401b0381116102b6578461048c9183016127e5565b60a084015260c08101356001600160401b0381116102b657846104b0918301611d43565b60c084015260e08101356001600160401b0381116102b657846104d49183016127e5565b60e08401526101008101356001600160401b0381116102b657846104f9918301611d43565b610100840152610120810135916001600160401b038311610190575092610524916105369401611d43565b61012082015260405191829182611e0f565b0390f35b50346101905760203660031901126101905761055461279b565b5061055d612965565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610639578192610615575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610606576105366105fa6101208401516020808251830101910161233d565b60405191829182611e0f565b635527981560e11b8152600490fd5b6106329192503d8084833e61062a8183611baf565b8101906129c3565b905f6105b3565b50604051903d90823e3d90fd5b50346101905760a036600319011261019057610660611cec565b50610669611d02565b506044356001600160401b03811161018e57610689903690600401611d43565b506064356001600160401b03811161018e576106a9903690600401611d43565b506084356001600160401b03811161018e576106c9903690600401611c21565b5060405163bc197c8160e01b8152602090f35b506060366003190112610190576004356001600160401b03811161018e579061070c61071e923690600401611cbf565b9290610716611b04565b933691611beb565b9161072761292d565b61073a602084518501016020850161233d565b916060830191825151946080850195865151036110cf5760a08501908151519160c0870192835151036110c05760e0870191825151946101008901958651518114908115916110af575b506110a0576107a461079b89515185515190614097565b85515190614097565b60328111611089575060408901518061106c575b50865b885180518210156109bb576024906020906001600160a01b03906107e0908590613e60565b5116604051928380926370a0823160e01b82523060048301525afa80156109b057899061097e575b602491508c61082d848d6108248260018060a01b039251613e60565b51169251613e60565b5190604051916323b872dd60e01b8d523360045230855260445260208c60648180855af19060018d5114821615610971575b50906040528a60605260208c61087d8660018060a01b039251613e60565b5116604051948580926370a0823160e01b82523060048301525afa928315610966578e93929185918d9461092a575b5015938415610908575b505050506108c6576001016107bb565b88518b916108e2916001600160a01b0390610824908390613e60565b51604051634a73404560e11b81529182916109049130903390600486016140b8565b0390fd5b610920939450906109199151613e60565b5190614097565b115f80838e6108b6565b94509250506020833d821161095e575b8161094760209383611baf565b8101031261095a57838e9351925f6108ac565b5f80fd5b3d915061093a565b6040513d8d823e3d90fd5b3b15153d1516165f61085f565b506020813d82116109a8575b8161099760209383611baf565b8101031261095a5760249051610808565b3d915061098a565b6040513d8b823e3d90fd5b505085929187918a83955b85518051881015610c1b576001600160a01b03906109e5908990613e60565b511660206109f4898c51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115610c10578691610bd7575b50336001600160a01b0390911603610bbf5785516001600160a01b0390610a45908990613e60565b5116610a52888b51613e60565b51813b15610b8f576040516323b872dd60e01b8152336004820152306024820152604481019190915290869081908390606490829084905af19182610ba6575b5050610ad25788610ab088886108248260018060a01b039251613e60565b5160405163045b391760e01b81529182916109049130903390600486016140b8565b90919293949560018060a01b03610aea828951613e60565b51166020610af9838c51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115610b9b578791610b5e575b50306001600160a01b0390911603610b42576001019594939291906109c6565b86518991610ab0916001600160a01b0390610824908390613e60565b90506020813d8211610b93575b81610b7860209383611baf565b81010312610b8f57610b899061224d565b8a610b22565b8680fd5b3d9150610b6b565b6040513d89823e3d90fd5b81610bb091611baf565b610bbb57858b610a92565b8580fd5b88610ab088886108248260018060a01b039251613e60565b90506020813d8211610c08575b81610bf160209383611baf565b81010312610bbb57610c029061224d565b8a610a1d565b3d9150610be4565b6040513d88823e3d90fd5b509087849386610120819401955b83518051861015610ebc57610c86906020906001600160a01b0390610c4f908990613e60565b5116610c5c888a51613e60565b51604051627eeac760e11b8152306004820152602481019190915292839190829081906044820190565b03915afa908115610eb1578391610e80575b5084516001600160a01b0390610caf908890613e60565b5116610cbc878951613e60565b5190610cc9888b51613e60565b5191813b15610bbb57610cf9928692839283604051809781958294637921219560e11b845230336004860161405f565b03925af19182610e67575b5050610d7f578787610904610d3b89610d33818b610d2a8260018060a01b039251613e60565b51169551613e60565b519451613e60565b5160405163334a7d1b60e21b81526001600160a01b0390931660048401523360248401523060448401526064830193909352608482019290925290819060a4820190565b610dd490969591929396602060018060a01b03610d9d858951613e60565b5116610daa858a51613e60565b51604051627eeac760e11b8152306004820152602481019190915293849190829081906044820190565b03915afa918215610e5c578592610e27575b50610df690610919848b51613e60565b11610e075760010193949190610c29565b84610904610d3b83610d338189610d2a8e9860018060a01b039251613e60565b9091506020813d8211610e54575b81610e4260209383611baf565b8101031261095a575190610df6610de6565b3d9150610e35565b6040513d87823e3d90fd5b81610e7191611baf565b610e7c57838a610d04565b8380fd5b90506020813d8211610ea9575b81610e9a60209383611baf565b8101031261095a575188610c98565b3d9150610e8d565b6040513d85823e3d90fd5b50604051906001600160401b0384610ed384611b94565b33845216602083015260016040830152604435606083015260808201528160a08201526020604051610f0481611b2e565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610fa5608083015160c060e4860152610124850190611ae0565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190811561106157829161102e575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206140e45f395f51905f5255604051908152f35b90506020813d602011611059575b8161104960209383611baf565b8101031261018e57516020610feb565b3d915061103c565b6040513d84823e3d90fd5b3481146107b857630d35e92160e01b885260045234602452604487fd5b6325b198a560e21b88526004526032602452604487fd5b63512509d360e11b8752600487fd5b90506101208a01515114155f610784565b63512509d360e11b8552600485fd5b63512509d360e11b8352600483fd5b503461019057602036600319011261019057600435906110fc61292d565b61110582612a95565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316919061118f81611b2e565b838152846020820152604051916111a583611b2e565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af1918261124a575b505061120d5763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690612be4565b5060015f5160206140e45f395f51905f5255602060405160018152f35b8161125491611baf565b6102b657825f6111f4565b637bf6a16f60e01b8352600483fd5b637bf6a16f60e01b8452600484fd5b63629cd40b60e11b8352600483fd5b60206102ac61129a36611c6f565b926112a692919261390a565b6124d4565b5034610190576105366112c66112c036611aca565b90612578565b604051918291602083526020830190611ae0565b503461019057602036600319011261019057600435906001600160401b0382116101905761131361130e3660048501611c21565b6124ab565b604080516001600160a01b03909316835260208301819052829161053691830190611ae0565b5034610190576020366003190112610190576004359061135761292d565b61136082612a95565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691906113ea81611b2e565b8381528460208201526040519161140083611b2e565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af19182611488575b50506114685763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690613964565b8161149291611baf565b6102b657825f61144f565b50346101905780600319360112610190576060806040516114bd81611b5d565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561163b578091611586575b606082610536604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190611ae0565b90503d8082843e6115978184611baf565b82019160208184031261018e578051906001600160401b0382116102b657019060808284031261019057604051916115ce83611b5d565b8051835260208101516001600160a01b03811681036102b65760208401526115f860408201611f30565b60408401526060810151906001600160401b0382116102b657019083601f83011215610190575060609281602061163193519101612217565b828201525f611540565b604051903d90823e3d90fd5b503461019057806003193601126101905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50604036600319011261019057600435906001600160401b0382116101905761014060031983360301126101905760206103536116d6846116e46116c4611b04565b91604051938491600401878301612097565b03601f198101845283611baf565b33916130c0565b503461019057806003193601126101905760206112c66001610536936117307f0000000000000000000000000000000000000000000000000000000000000000612f53565b90828561175c7f0000000000000000000000000000000000000000000000000000000000000000612f53565b81806117877f0000000000000000000000000000000000000000000000000000000000000000612f53565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282611baf565b5034610190576117ee6112c036611aca565b50602060405160018152f35b5034610190578060031936011261019057602060405160328152f35b503461095a5761182536611aca565b919061182f61292d565b61183881612a95565b9261184281612a95565b60208501517f0000000000000000000000000000000000000000000000000000000000000000809103611a685761187886612b43565b15611a685761012086019561188d87516124ab565b60a0859392930151825103611a1457905160405163e6c9714d60e01b8152926020928492839182916118c3918a60048501611f3d565b03916001600160a01b03165afa908115611a5d575f91611a23575b5015611a14576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061191b81611b2e565b8581525f60208201526040519261193184611b2e565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816119ff575b506119965763614cf93960e01b84526004839052602484fd5b935160c090940180516020956119b5916001600160a01b031690612be4565b5060018060a01b03905116917ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c06040519480a460015f5160206140e45f395f51905f525560018152f35b611a0c9195505f90611baf565b5f935f61197d565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611a55575b81611a3e60209383611baf565b8101031261095a57611a4f90611f30565b5f6118de565b3d9150611a31565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b3461095a57602036600319011261095a576004359063ffffffff60e01b821680920361095a57602091630271189760e51b8114908115611ab9575b5015158152f35b6301ffc9a760e01b14905083611ab2565b604090600319011261095a576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602435906001600160401b038216820361095a57565b35906001600160401b038216820361095a57565b604081019081106001600160401b03821117611b4957604052565b634e487b7160e01b5f52604160045260245ffd5b608081019081106001600160401b03821117611b4957604052565b61014081019081106001600160401b03821117611b4957604052565b60c081019081106001600160401b03821117611b4957604052565b90601f801991011681019081106001600160401b03821117611b4957604052565b6001600160401b038111611b4957601f01601f191660200190565b929192611bf782611bd0565b91611c056040519384611baf565b82948184528183011161095a578281602093845f960137010152565b9080601f8301121561095a57816020611c3c93359101611beb565b90565b9181601f8401121561095a578235916001600160401b03831161095a576020808501948460051b01011161095a57565b604060031982011261095a576004356001600160401b03811161095a5781611c9991600401611c3f565b92909291602435906001600160401b03821161095a57611cbb91600401611c3f565b9091565b9181601f8401121561095a578235916001600160401b03831161095a576020838186019501011161095a57565b600435906001600160a01b038216820361095a57565b602435906001600160a01b038216820361095a57565b35906001600160a01b038216820361095a57565b6001600160401b038111611b495760051b60200190565b9080601f8301121561095a578135611d5a81611d2c565b92611d686040519485611baf565b81845260208085019260051b82010192831161095a57602001905b828210611d905750505090565b8135815260209182019101611d83565b90602080835192838152019201905f5b818110611dbd5750505090565b82516001600160a01b0316845260209384019390920191600101611db0565b90602080835192838152019201905f5b818110611df95750505090565b8251845260209384019390920191600101611dec565b90611c3c916020815260018060a01b038251166020820152610120611ee6611ed0611eb9611ea3611e8d611e77611e5760208a015161014060408b01526101608a0190611ae0565b60408a015160608a015260608a0151601f198a83030160808b0152611da0565b6080890151888203601f190160a08a0152611ddc565b60a0880151878203601f190160c0890152611da0565b60c0870151868203601f190160e0880152611ddc565b60e0860151858203601f1901610100870152611da0565b610100850151848203601f190184860152611ddc565b92015190610140601f1982850301910152611ddc565b602060031982011261095a57600435906001600160401b03821161095a5761014090829003600319011261095a5760040190565b5190811515820361095a57565b939291611ffb90611fed61012060409460608952805160608a0152602081015160808a01526001600160401b03868201511660a08a01526001600160401b0360608201511660c08a01526001600160401b0360808201511660e08a015260a08101516101008a015260018060a01b0360c082015116828a015260018060a01b0360e0820151166101408a015261010081015115156101608a015201516101406101808901526101a0880190611ae0565b908682036020880152611ae0565b930152565b9035601e198236030181121561095a5701602081359101916001600160401b03821161095a578160051b3603831361095a57565b916020908281520191905f5b81811061204d5750505090565b909192602080600192838060a01b0361206588611d18565b168152019401929101612040565b81835290916001600160fb1b03831161095a5760209260051b809284830137010190565b60208152906001600160a01b036120ad82611d18565b1660208301526020810135601e198236030181121561095a578101916020833593016001600160401b03841161095a57833603811361095a576121f86121d76121b761219861217961215a89611c3c9a6122049861014060408c0152816101608c01526101808b01375f610180828b010152601f8019910116880160408a013560608a015261018061214260608c018c612000565b919092601f19828d8303010160808d01520191612034565b61216760808a018a612000565b898303601f190160a08b015290612073565b61218660a0890189612000565b888303601f190160c08a015290612034565b6121a560c0880188612000565b878303601f190160e089015290612073565b6121c460e0870187612000565b868303601f190161010088015290612034565b6121e5610100860186612000565b858303601f190161012087015290612073565b92610120810190612000565b91610140601f1982860301910152612073565b92919261222382611bd0565b916122316040519384611baf565b82948184528183011161095a578281602093845f96015e010152565b51906001600160a01b038216820361095a57565b9080601f8301121561095a578151611c3c92602001612217565b9080601f8301121561095a57815161229281611d2c565b926122a06040519485611baf565b81845260208085019260051b82010192831161095a57602001905b8282106122c85750505090565b602080916122d58461224d565b8152019101906122bb565b9080601f8301121561095a5781516122f781611d2c565b926123056040519485611baf565b81845260208085019260051b82010192831161095a57602001905b82821061232d5750505090565b8151815260209182019101612320565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a576040519161237183611b78565b61237a8261224d565b835260208201516001600160401b03811161095a578161239b918401612261565b60208401526040820151604084015260608201516001600160401b03811161095a57816123c991840161227b565b606084015260808201516001600160401b03811161095a57816123ed9184016122e0565b608084015260a08201516001600160401b03811161095a578161241191840161227b565b60a084015260c08201516001600160401b03811161095a57816124359184016122e0565b60c084015260e08201516001600160401b03811161095a578161245991840161227b565b60e08401526101008201516001600160401b03811161095a578161247e9184016122e0565b6101008401526101208201516001600160401b03811161095a576124a292016122e0565b61012082015290565b6124be906020808251830101910161233d565b80516020909101516001600160a01b0390911691565b929092818403612569575f91345b8584101561255e578184101561254a578360051b808601359082821161253b5784013561013e198536030181121561095a5761251f90850161394b565b1561253057600191039301926124e2565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b61258061292d565b5f9161258b82612a95565b9061259581612a95565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103611a68576125cc82612b43565b15611a68576101208201916125e183516124ab565b60a0879392930151825103611a1457905160405163e6c9714d60e01b815292602092849283918291612617918c60048501611f3d565b03916001600160a01b03165afa908115611a5d575f91612761575b5015611a14576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061266f81611b2e565b8681525f60208201526040519261268584611b2e565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161274c575b506126ea5763614cf93960e01b85526004849052602485fd5b61272a60c07ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09296959394965196019560018060a01b0387511690613964565b94516001600160a01b03169380a49060015f5160206140e45f395f51905f5255565b6127599196505f90611baf565b5f945f6126d1565b90506020813d602011612793575b8161277c60209383611baf565b8101031261095a5761278d90611f30565b5f612632565b3d915061276f565b604051906127a882611b78565b6060610120835f81528260208201525f604082015282808201528260808201528260a08201528260c08201528260e0820152826101008201520152565b9080601f8301121561095a5781356127fc81611d2c565b9261280a6040519485611baf565b81845260208085019260051b82010192831161095a57602001905b8282106128325750505090565b6020809161283f84611d18565b815201910190612825565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361291e5761287e81612b43565b156129185761289e6101206128ae9201516020808251830101910161233d565b916020808251830101910161233d565b6040820151604082015111159182612906575b826128ed575b826128d157505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506128c7565b91506129128183613e74565b916128c1565b50505f90565b635f9bd90760e11b5f5260045ffd5b60025f5160206140e45f395f51905f5254146129565760025f5160206140e45f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b6040519061297282611b78565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361095a57565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a57604051916129f783611b78565b8151835260208201516020840152612a11604083016129af565b6040840152612a22606083016129af565b6060840152612a33608083016129af565b608084015260a082015160a0840152612a4e60c0830161224d565b60c0840152612a5f60e0830161224d565b60e0840152612a716101008301611f30565b6101008401526101208201516001600160401b03811161095a576124a29201612261565b90612a9e612965565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315611a5d575f93612b27575b508251818115918215612b1c575b5050612b0a5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f612b01565b612b3c9193503d805f833e61062a8183611baf565b915f612af3565b805115612ba6576001600160401b036060820151168015159081612b9b575b50612b8c57608001516001600160401b0316612b7d57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f612b62565b635c2c7f8960e01b5f5260045ffd5b3d15612bdf573d90612bc682611bd0565b91612bd46040519384611baf565b82523d5f602084013e565b606090565b612bf7906020808251830101910161233d565b6040810180519081612f02575b5090916001600160a01b0381169150608083019060608401905f5b82518051821015612cea57600191906001600160a01b0390612c42908390613e60565b5116612c4f828751613e60565b51906040519163a9059cbb60e01b5f528860045260245260205f60448180855af190845f5114821615612cdd575b509060405215612c8e575b01612c1f565b85828060a01b03612ca0838751613e60565b51167f6a0720b70d5a8914c9378c90e36e760e11a1c79840d56909d7562c7c79654e0b6020612cd0858a51613e60565b51604051908152a3612c88565b3b15153d1516165f612c7d565b505094939150505f9060a081019060c08101925b82518051821015612ddf576001600160a01b0390612d1d908390613e60565b511690612d2b818651613e60565b51823b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101919091526001925f908290606490829084905af19081612dcf575b50612dca5785828060a01b03612d8b838751613e60565b51167f0863b761d932722655fba74d8a2c2b32a37c3d52195357bf7b4610ebfc6944e06020612dbb858a51613e60565b51604051908152a35b01612cfe565b612dc4565b5f612dd991611baf565b5f612d74565b50506101008101925060e081019150610120015f5b82518051821015612ee6576001600160a01b0390612e13908390613e60565b511690612e21818651613e60565b5191612e2e828551613e60565b5192813b1561095a57600193612e60925f92838d60405196879586948593637921219560e11b8552306004860161405f565b03925af19081612ed6575b50612ed15785828060a01b03612e82838751613e60565b51167f15fffc8b1069bee41edd748e645887f613b87a2d861ab91a772fc4a11ebe53026040612eb2858a51613e60565b51612ebe868951613e60565b5182519182526020820152a35b01612df4565b612ecb565b5f612ee091611baf565b5f612e6b565b5050505050509050604051612efc602082611baf565b5f815290565b5f80808060018060a01b03881695865af1612f1b612bb5565b50612c045760207ff7c9ce661c79b7ec4fedd33edef0ee43991ab10fc7464e4764925d33e3dfd0bc9151604051908152a25f80612c04565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b82101561309d575b806d04ee2d6d415b85acef8100000000600a921015613082575b662386f26fc1000081101561306e575b6305f5e10081101561305d575b61271081101561304e575b6064811015613040575b1015613035575b600a60216001840193612fda85611bd0565b94612fe86040519687611baf565b808652612ff7601f1991611bd0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561303057600a9091613002565b505090565b600190910190612fc8565b606460029104930192612fc1565b61271060049104930192612fb7565b6305f5e10060089104930192612fac565b662386f26fc1000060109104930192612f9f565b6d04ee2d6d415b85acef810000000060209104930192612f8f565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612f75565b929091926130cc61292d565b6130df602082518301016020830161233d565b926060840192835151956080860196875151036138ea5760a08601908151519360c0880194855151036138ea5760e08801978851516101008201908151518114908115916138f9575b506138ea5761314861313f8a515187515190614097565b8b515190614097565b603281116138d357506040820151806138b6575b505f5b89518051821015613312576024906020906001600160a01b0390613184908590613e60565b5116604051928380926370a0823160e01b82523060048301525afa908115611a5d575f916132e1575b508c6131c6838d6108248260018060a01b039251613e60565b5191604051926323b872dd60e01b5f52336004523060245260445260205f60648180865af19160015f51148316156132d0575b50602491926040525f60605260208d61321a8660018060a01b039251613e60565b5116604051938480926370a0823160e01b82523060048301525afa918215611a5d578f9385915f94613298575b501593841561327d575b505050506132615760010161315f565b89518c916108e2916001600160a01b0390610824908390613e60565b61328e939450906109199151613e60565b115f80838f613251565b94509250506020833d82116132c8575b816132b560209383611baf565b8101031261095a57838f9351925f613247565b3d91506132a8565b916024923b15153d151616916131f9565b90506020813d821161330a575b816132fb60209383611baf565b8101031261095a57515f6131ad565b3d91506132ee565b5050929599509295965092965f965b86518051891015613530576001600160a01b0390613340908a90613e60565b5116602061334f8a8d51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115611a5d575f916134f7575b50336001600160a01b03909116036134df5786516001600160a01b03906133a0908a90613e60565b51166133ad898c51613e60565b5190803b1561095a576040516323b872dd60e01b815233600482015230602482015260448101929092525f908290606490829084905af190816134cf575b506134085789610ab089896108248260018060a01b039251613e60565b9091929394959660018060a01b03613421828a51613e60565b51166020613430838d51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115611a5d575f91613496575b50306001600160a01b039091160361347a5760010196959493929190613321565b87518a91610ab0916001600160a01b0390610824908390613e60565b90506020813d82116134c7575b816134b060209383611baf565b8101031261095a576134c19061224d565b5f613459565b3d91506134a3565b5f6134d991611baf565b5f6133eb565b89610ab089896108248260018060a01b039251613e60565b90506020813d8211613528575b8161351160209383611baf565b8101031261095a576135229061224d565b5f613378565b3d9150613504565b50939498509450959094506101205f9501965b8451805187101561370b57613576906020906001600160a01b0390613569908a90613e60565b5116610c5c898b51613e60565b03915afa908115611a5d575f916136da575b5085516001600160a01b039061359f908990613e60565b51166135ac888a51613e60565b516135b8898c51613e60565b51823b1561095a576135e5925f9283604051809681958294637921219560e11b845230336004860161405f565b03925af190816136ca575b50613615578888610904610d3b8a610d33818c610d2a8260018060a01b039251613e60565b6136419097969192939497602060018060a01b03613634858a51613e60565b5116610daa858b51613e60565b03915afa918215611a5d575f92613695575b5061366390610919848c51613e60565b11613675576001019495929190613543565b85610904610d3b83610d33818a610d2a8f9860018060a01b039251613e60565b9091506020813d82116136c2575b816136b060209383611baf565b8101031261095a575190613663613653565b3d91506136a3565b5f6136d491611baf565b5f6135f0565b90506020813d8211613703575b816136f460209383611baf565b8101031261095a57515f613588565b3d91506136e7565b5095509550915091506001600160401b036040519361372985611b94565b60018060a01b031692838552166020840152600160408401525f606084015260808301525f60a0830152602060405161376181611b2e565b7f000000000000000000000000000000000000000000000000000000000000000081528181019384526040518094819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0613802608083015160c060e4860152610124850190611ae0565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1918215611a5d575f92613882575b50817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206140e45f395f51905f5255565b9091506020813d6020116138ae575b8161389e60209383611baf565b8101031261095a5751905f613848565b3d9150613891565b34811461315c57630d35e92160e01b5f526004523460245260445ffd5b6325b198a560e21b5f52600452603260245260445ffd5b63512509d360e11b5f5260045ffd5b90506101208301515114155f613128565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361393c57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361095a57301490565b61397a909291926020808251830101910161233d565b6040810180519081613e2b575b50909160808301915060608301906001600160a01b038516905f5b83518051821015613b65576024906020906001600160a01b03906139c7908590613e60565b5116604051928380926370a0823160e01b82528860048301525afa908115611a5d575f91613b34575b50602460018060a01b03613a05848851613e60565b5116613a12848951613e60565b51906040519163a9059cbb60e01b5f5287600452835260205f60448180855af19060015f5114821615613b27575b5090604052602060018060a01b03613a59868a51613e60565b5116604051938480926370a0823160e01b82528a60048301525afa918215611a5d575f92613af4575b5015918215613adb575b5050613a9a576001016139a2565b84610904613abf8387613ab68c9660018060a01b039251613e60565b51169351613e60565b51604051634a73404560e11b81529384933090600486016140b8565b613aec919250610919848951613e60565b115f80613a8c565b9091506020813d8211613b1f575b81613b0f60209383611baf565b8101031261095a5751905f613a82565b3d9150613b02565b3b15153d1516165f613a40565b90506020813d8211613b5d575b81613b4e60209383611baf565b8101031261095a57515f6139f0565b3d9150613b41565b505060c08501945f945060a08101935091905b83518051861015613cfa576001600160a01b0390613b97908790613e60565b5116613ba4868851613e60565b5190803b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101929092525f908290606490829084905af19081613cea575b50613c295750505081613c0d91613ab66109049460018060a01b039251613e60565b5160405163045b391760e01b81529384933090600486016140b8565b9091949360018060a01b03613c3f828651613e60565b51166020613c4e838851613e60565b516024604051809481936331a9108f60e11b835260048301525afa8015611a5d5784915f91613caf575b506001600160a01b031603613c935760010193949190613b78565b84610904613c0d8387613ab68c9660018060a01b039251613e60565b9150506020813d8211613ce2575b81613cca60209383611baf565b8101031261095a57613cdc849161224d565b5f613c78565b3d9150613cbd565b5f613cf491611baf565b5f613beb565b509350509250505f60e0830161012061010085019401925b81518051841015613e16576001600160a01b0390613d31908590613e60565b5116613d3e848751613e60565b51613d4a858751613e60565b51823b1561095a57613d78925f92838b60405196879586948593637921219560e11b8552306004860161405f565b03925af19081613e06575b50613dfc575081613db181613db993613da8610904979660018060a01b039251613e60565b51169651613e60565b519251613e60565b5160405163334a7d1b60e21b81526001600160a01b03948516600482015230602482015294909316604485015260648401526084830191909152819060a4820190565b9160010191613d12565b5f613e1091611baf565b5f613d83565b50945050505050604051612efc602082611baf565b5f80808060018060a01b03891695865af1613e44612bb5565b506139875751906338f0620160e21b5f5260045260245260445ffd5b805182101561254a5760209160051b010190565b6060810191825151606082019081515111614057575f5b815151811015613f045784516001600160a01b0390613eab908390613e60565b511660018060a01b03613ebf838551613e60565b511614801590613edf575b613ed657600101613e8b565b50505050505f90565b50613eee816080860151613e60565b51613efd826080860151613e60565b5111613eca565b5050915060a081019182515160a082019081515111614057575f5b815151811015613f905784516001600160a01b0390613f3f908390613e60565b511660018060a01b03613f53838551613e60565b511614801590613f6a575b613ed657600101613f1f565b50613f798160c0860151613e60565b51613f888260c0860151613e60565b511415613f5e565b5050915060e08101918251519260e082019384515111614057575f5b84515181101561404d5781516001600160a01b0390613fcc908390613e60565b511660018060a01b03613fe0838851613e60565b511614801590614025575b8015613ffe575b613ed657600101613fac565b5061400e81610120860151613e60565b5161401e82610120860151613e60565b5111613ff2565b5061403581610100860151613e60565b5161404582610100860151613e60565b511415613feb565b5050505050600190565b505050505f90565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b919082018092116140a457565b634e487b7160e01b5f52601160045260245ffd5b6001600160a01b0391821681529181166020830152909116604082015260608101919091526080019056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220fd3e8b60434ce42ffcec75be2b87d76a1abfe777794aff473463087dbb9ee1e164736f6c634300081b0033",
    "sourceMap": "821:18412:92:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;821:18412:92;;;;2828:4;821:18412;759:14:6;688:1:9;821:18412:92;783:14:6;-1:-1:-1;821:18412:92;807:14:6;708:26:9;704:76;;790:10;1066:81:81;790:10:9;821:18412:92;790:10:9;971::81;;821:18412:92;991:32:81;1129:4;1066:81;;:::i;:::-;1033:114;;2828:4:92;1505:66:66;2365:1;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1033:114:81;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;821:18412:92;-1:-1:-1;821:18412:92;;;;;;;-1:-1:-1;;821:18412:92;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;821:18412:92;;;;;-1:-1:-1;821:18412:92;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;;;;;;;;;;;:::o;289:755:86:-;;;821:18412:92;;1189:45:86;;;;821:18412:92;;;1189:45:86;821:18412:92;1189:45:86;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:86;;;;;;;;;;;:::i;:::-;821:18412:92;1179:56:86;;821:18412:92;;-1:-1:-1;;;572:29:86;;;;;821:18412:92;;;1179:56:86;;-1:-1:-1;;;;;821:18412:92;;;-1:-1:-1;821:18412:92;572:29:86;821:18412:92;;572:29:86;;;;;;;;-1:-1:-1;572:29:86;;;289:755;821:18412:92;;615:19:86;611:35;;821:18412:92;;1189:45:86;821:18412:92;;;;;;;;;;;661:52:86;;821:18412:92;572:29:86;661:52;;821:18412:92;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;;;;;572:29:86;821:18412:92;;;2828:4;821:18412;;;;;;;;;;;;661:52:86;;;-1:-1:-1;661:52:86;;;-1:-1:-1;;661:52:86;;;289:755;-1:-1:-1;657:381:86;;821:18412:92;-1:-1:-1;572:29:86;821:18412:92;;;;;;;;;;899:29:86;;;572;899;;821:18412:92;899:29:86;;;;;;;;-1:-1:-1;899:29:86;;;657:381;821:18412:92;;946:19:86;942:35;;793:29;;;;-1:-1:-1;998:29:86;572;821:18412:92;572:29:86;-1:-1:-1;998:29:86;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:86;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;821:18412:92;;;-1:-1:-1;821:18412:92;;;;;657:381:86;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:86;572;821:18412:92;572:29:86;-1:-1:-1;793:29:86;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;821:18412:92;;;;;661:52:86;;;;;;;-1:-1:-1;661:52:86;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:86;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714611a77575080630fcec5b11461181657806311453bb7146117fa5780632c713cd9146117dc57806354fd4d50146116eb57806355b0769b146116825780635bf2f20d146116475780636b122fe01461149d5780637d2c2931146113395780638371ef59146112da57806388e5b2d91461128c578063891d9ea8146112ab57806391db0b7e1461128c57806397524016146110de578063b3b902d4146106dc578063bc197c8114610646578063c6ec50701461053a578063c93844be14610377578063ce46e0461461035b578063cf84e82c146102d5578063e49617e1146102ba578063e60c3505146102ba578063e6c9714d146101935763f23a6e610361000f57346101905760a036600319011261019057610152611cec565b5061015b611d02565b506084356001600160401b03811161018e5761017b903690600401611c21565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461019057606036600319011261019057600435906001600160401b03821161019057610140600319833603011261019057604051916101d383611b78565b80600401358352602481013560208401526101f060448201611b1a565b604084015261020160648201611b1a565b606084015261021260848201611b1a565b608084015260a481013560a084015261022d60c48201611d18565b60c084015261023e60e48201611d18565b60e084015261010481013580151581036102b6576101008401526101248101356001600160401b0381116102b65761027b91369101600401611c21565b610120830152602435906001600160401b0382116101905760206102ac846102a63660048701611c21565b9061284a565b6040519015158152f35b8280fd5b60206102ac6102c836611efc565b6102d061390a565b61394b565b506060366003190112610190576004356001600160401b03811161018e57610140600319823603011261018e5761030a611b04565b604435929091906001600160a01b0384168403610190576020610353858561034061034e87604051928391600401888301612097565b03601f198101835282611baf565b6130c0565b604051908152f35b5034610190578060031936011261019057602090604051908152f35b5034610190576020366003190112610190576004356001600160401b03811161018e576103a8903690600401611cbf565b6103b392919261279b565b5082019160208184031261018e578035906001600160401b0382116102b65701906101408284031261019057604051916103ec83611b78565b6103f581611d18565b835260208101356001600160401b0381116102b65784610416918301611c21565b60208401526040810135604084015260608101356001600160401b0381116102b657846104449183016127e5565b606084015260808101356001600160401b0381116102b65784610468918301611d43565b608084015260a08101356001600160401b0381116102b6578461048c9183016127e5565b60a084015260c08101356001600160401b0381116102b657846104b0918301611d43565b60c084015260e08101356001600160401b0381116102b657846104d49183016127e5565b60e08401526101008101356001600160401b0381116102b657846104f9918301611d43565b610100840152610120810135916001600160401b038311610190575092610524916105369401611d43565b61012082015260405191829182611e0f565b0390f35b50346101905760203660031901126101905761055461279b565b5061055d612965565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610639578192610615575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610606576105366105fa6101208401516020808251830101910161233d565b60405191829182611e0f565b635527981560e11b8152600490fd5b6106329192503d8084833e61062a8183611baf565b8101906129c3565b905f6105b3565b50604051903d90823e3d90fd5b50346101905760a036600319011261019057610660611cec565b50610669611d02565b506044356001600160401b03811161018e57610689903690600401611d43565b506064356001600160401b03811161018e576106a9903690600401611d43565b506084356001600160401b03811161018e576106c9903690600401611c21565b5060405163bc197c8160e01b8152602090f35b506060366003190112610190576004356001600160401b03811161018e579061070c61071e923690600401611cbf565b9290610716611b04565b933691611beb565b9161072761292d565b61073a602084518501016020850161233d565b916060830191825151946080850195865151036110cf5760a08501908151519160c0870192835151036110c05760e0870191825151946101008901958651518114908115916110af575b506110a0576107a461079b89515185515190614097565b85515190614097565b60328111611089575060408901518061106c575b50865b885180518210156109bb576024906020906001600160a01b03906107e0908590613e60565b5116604051928380926370a0823160e01b82523060048301525afa80156109b057899061097e575b602491508c61082d848d6108248260018060a01b039251613e60565b51169251613e60565b5190604051916323b872dd60e01b8d523360045230855260445260208c60648180855af19060018d5114821615610971575b50906040528a60605260208c61087d8660018060a01b039251613e60565b5116604051948580926370a0823160e01b82523060048301525afa928315610966578e93929185918d9461092a575b5015938415610908575b505050506108c6576001016107bb565b88518b916108e2916001600160a01b0390610824908390613e60565b51604051634a73404560e11b81529182916109049130903390600486016140b8565b0390fd5b610920939450906109199151613e60565b5190614097565b115f80838e6108b6565b94509250506020833d821161095e575b8161094760209383611baf565b8101031261095a57838e9351925f6108ac565b5f80fd5b3d915061093a565b6040513d8d823e3d90fd5b3b15153d1516165f61085f565b506020813d82116109a8575b8161099760209383611baf565b8101031261095a5760249051610808565b3d915061098a565b6040513d8b823e3d90fd5b505085929187918a83955b85518051881015610c1b576001600160a01b03906109e5908990613e60565b511660206109f4898c51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115610c10578691610bd7575b50336001600160a01b0390911603610bbf5785516001600160a01b0390610a45908990613e60565b5116610a52888b51613e60565b51813b15610b8f576040516323b872dd60e01b8152336004820152306024820152604481019190915290869081908390606490829084905af19182610ba6575b5050610ad25788610ab088886108248260018060a01b039251613e60565b5160405163045b391760e01b81529182916109049130903390600486016140b8565b90919293949560018060a01b03610aea828951613e60565b51166020610af9838c51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115610b9b578791610b5e575b50306001600160a01b0390911603610b42576001019594939291906109c6565b86518991610ab0916001600160a01b0390610824908390613e60565b90506020813d8211610b93575b81610b7860209383611baf565b81010312610b8f57610b899061224d565b8a610b22565b8680fd5b3d9150610b6b565b6040513d89823e3d90fd5b81610bb091611baf565b610bbb57858b610a92565b8580fd5b88610ab088886108248260018060a01b039251613e60565b90506020813d8211610c08575b81610bf160209383611baf565b81010312610bbb57610c029061224d565b8a610a1d565b3d9150610be4565b6040513d88823e3d90fd5b509087849386610120819401955b83518051861015610ebc57610c86906020906001600160a01b0390610c4f908990613e60565b5116610c5c888a51613e60565b51604051627eeac760e11b8152306004820152602481019190915292839190829081906044820190565b03915afa908115610eb1578391610e80575b5084516001600160a01b0390610caf908890613e60565b5116610cbc878951613e60565b5190610cc9888b51613e60565b5191813b15610bbb57610cf9928692839283604051809781958294637921219560e11b845230336004860161405f565b03925af19182610e67575b5050610d7f578787610904610d3b89610d33818b610d2a8260018060a01b039251613e60565b51169551613e60565b519451613e60565b5160405163334a7d1b60e21b81526001600160a01b0390931660048401523360248401523060448401526064830193909352608482019290925290819060a4820190565b610dd490969591929396602060018060a01b03610d9d858951613e60565b5116610daa858a51613e60565b51604051627eeac760e11b8152306004820152602481019190915293849190829081906044820190565b03915afa918215610e5c578592610e27575b50610df690610919848b51613e60565b11610e075760010193949190610c29565b84610904610d3b83610d338189610d2a8e9860018060a01b039251613e60565b9091506020813d8211610e54575b81610e4260209383611baf565b8101031261095a575190610df6610de6565b3d9150610e35565b6040513d87823e3d90fd5b81610e7191611baf565b610e7c57838a610d04565b8380fd5b90506020813d8211610ea9575b81610e9a60209383611baf565b8101031261095a575188610c98565b3d9150610e8d565b6040513d85823e3d90fd5b50604051906001600160401b0384610ed384611b94565b33845216602083015260016040830152604435606083015260808201528160a08201526020604051610f0481611b2e565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0610fa5608083015160c060e4860152610124850190611ae0565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190811561106157829161102e575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206140e45f395f51905f5255604051908152f35b90506020813d602011611059575b8161104960209383611baf565b8101031261018e57516020610feb565b3d915061103c565b6040513d84823e3d90fd5b3481146107b857630d35e92160e01b885260045234602452604487fd5b6325b198a560e21b88526004526032602452604487fd5b63512509d360e11b8752600487fd5b90506101208a01515114155f610784565b63512509d360e11b8552600485fd5b63512509d360e11b8352600483fd5b503461019057602036600319011261019057600435906110fc61292d565b61110582612a95565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316919061118f81611b2e565b838152846020820152604051916111a583611b2e565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af1918261124a575b505061120d5763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690612be4565b5060015f5160206140e45f395f51905f5255602060405160018152f35b8161125491611baf565b6102b657825f6111f4565b637bf6a16f60e01b8352600483fd5b637bf6a16f60e01b8452600484fd5b63629cd40b60e11b8352600483fd5b60206102ac61129a36611c6f565b926112a692919261390a565b6124d4565b5034610190576105366112c66112c036611aca565b90612578565b604051918291602083526020830190611ae0565b503461019057602036600319011261019057600435906001600160401b0382116101905761131361130e3660048501611c21565b6124ab565b604080516001600160a01b03909316835260208301819052829161053691830190611ae0565b5034610190576020366003190112610190576004359061135761292d565b61136082612a95565b9160208301517f000000000000000000000000000000000000000000000000000000000000000080910361127d57606084016001600160401b038151161561126e57516001600160401b0316421061125f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691906113ea81611b2e565b8381528460208201526040519161140083611b2e565b82526020820152813b15610e7c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015290839081908390606490829084905af19182611488575b50506114685763614cf93960e01b825260045260249150fd5b61012083015160c084015161122d916001600160a01b0390911690613964565b8161149291611baf565b6102b657825f61144f565b50346101905780600319360112610190576060806040516114bd81611b5d565b8381528360208201528360408201520152604051906351753e3760e11b82527f00000000000000000000000000000000000000000000000000000000000000006004830152808260248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa90811561163b578091611586575b606082610536604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190611ae0565b90503d8082843e6115978184611baf565b82019160208184031261018e578051906001600160401b0382116102b657019060808284031261019057604051916115ce83611b5d565b8051835260208101516001600160a01b03811681036102b65760208401526115f860408201611f30565b60408401526060810151906001600160401b0382116102b657019083601f83011215610190575060609281602061163193519101612217565b828201525f611540565b604051903d90823e3d90fd5b503461019057806003193601126101905760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50604036600319011261019057600435906001600160401b0382116101905761014060031983360301126101905760206103536116d6846116e46116c4611b04565b91604051938491600401878301612097565b03601f198101845283611baf565b33916130c0565b503461019057806003193601126101905760206112c66001610536936117307f0000000000000000000000000000000000000000000000000000000000000000612f53565b90828561175c7f0000000000000000000000000000000000000000000000000000000000000000612f53565b81806117877f0000000000000000000000000000000000000000000000000000000000000000612f53565b926040519a888c995191829101848b015e880190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e010190838201520301601f198101835282611baf565b5034610190576117ee6112c036611aca565b50602060405160018152f35b5034610190578060031936011261019057602060405160328152f35b503461095a5761182536611aca565b919061182f61292d565b61183881612a95565b9261184281612a95565b60208501517f0000000000000000000000000000000000000000000000000000000000000000809103611a685761187886612b43565b15611a685761012086019561188d87516124ab565b60a0859392930151825103611a1457905160405163e6c9714d60e01b8152926020928492839182916118c3918a60048501611f3d565b03916001600160a01b03165afa908115611a5d575f91611a23575b5015611a14576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061191b81611b2e565b8581525f60208201526040519261193184611b2e565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816119ff575b506119965763614cf93960e01b84526004839052602484fd5b935160c090940180516020956119b5916001600160a01b031690612be4565b5060018060a01b03905116917ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c06040519480a460015f5160206140e45f395f51905f525560018152f35b611a0c9195505f90611baf565b5f935f61197d565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611a55575b81611a3e60209383611baf565b8101031261095a57611a4f90611f30565b5f6118de565b3d9150611a31565b6040513d5f823e3d90fd5b63629cd40b60e11b5f5260045ffd5b3461095a57602036600319011261095a576004359063ffffffff60e01b821680920361095a57602091630271189760e51b8114908115611ab9575b5015158152f35b6301ffc9a760e01b14905083611ab2565b604090600319011261095a576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602435906001600160401b038216820361095a57565b35906001600160401b038216820361095a57565b604081019081106001600160401b03821117611b4957604052565b634e487b7160e01b5f52604160045260245ffd5b608081019081106001600160401b03821117611b4957604052565b61014081019081106001600160401b03821117611b4957604052565b60c081019081106001600160401b03821117611b4957604052565b90601f801991011681019081106001600160401b03821117611b4957604052565b6001600160401b038111611b4957601f01601f191660200190565b929192611bf782611bd0565b91611c056040519384611baf565b82948184528183011161095a578281602093845f960137010152565b9080601f8301121561095a57816020611c3c93359101611beb565b90565b9181601f8401121561095a578235916001600160401b03831161095a576020808501948460051b01011161095a57565b604060031982011261095a576004356001600160401b03811161095a5781611c9991600401611c3f565b92909291602435906001600160401b03821161095a57611cbb91600401611c3f565b9091565b9181601f8401121561095a578235916001600160401b03831161095a576020838186019501011161095a57565b600435906001600160a01b038216820361095a57565b602435906001600160a01b038216820361095a57565b35906001600160a01b038216820361095a57565b6001600160401b038111611b495760051b60200190565b9080601f8301121561095a578135611d5a81611d2c565b92611d686040519485611baf565b81845260208085019260051b82010192831161095a57602001905b828210611d905750505090565b8135815260209182019101611d83565b90602080835192838152019201905f5b818110611dbd5750505090565b82516001600160a01b0316845260209384019390920191600101611db0565b90602080835192838152019201905f5b818110611df95750505090565b8251845260209384019390920191600101611dec565b90611c3c916020815260018060a01b038251166020820152610120611ee6611ed0611eb9611ea3611e8d611e77611e5760208a015161014060408b01526101608a0190611ae0565b60408a015160608a015260608a0151601f198a83030160808b0152611da0565b6080890151888203601f190160a08a0152611ddc565b60a0880151878203601f190160c0890152611da0565b60c0870151868203601f190160e0880152611ddc565b60e0860151858203601f1901610100870152611da0565b610100850151848203601f190184860152611ddc565b92015190610140601f1982850301910152611ddc565b602060031982011261095a57600435906001600160401b03821161095a5761014090829003600319011261095a5760040190565b5190811515820361095a57565b939291611ffb90611fed61012060409460608952805160608a0152602081015160808a01526001600160401b03868201511660a08a01526001600160401b0360608201511660c08a01526001600160401b0360808201511660e08a015260a08101516101008a015260018060a01b0360c082015116828a015260018060a01b0360e0820151166101408a015261010081015115156101608a015201516101406101808901526101a0880190611ae0565b908682036020880152611ae0565b930152565b9035601e198236030181121561095a5701602081359101916001600160401b03821161095a578160051b3603831361095a57565b916020908281520191905f5b81811061204d5750505090565b909192602080600192838060a01b0361206588611d18565b168152019401929101612040565b81835290916001600160fb1b03831161095a5760209260051b809284830137010190565b60208152906001600160a01b036120ad82611d18565b1660208301526020810135601e198236030181121561095a578101916020833593016001600160401b03841161095a57833603811361095a576121f86121d76121b761219861217961215a89611c3c9a6122049861014060408c0152816101608c01526101808b01375f610180828b010152601f8019910116880160408a013560608a015261018061214260608c018c612000565b919092601f19828d8303010160808d01520191612034565b61216760808a018a612000565b898303601f190160a08b015290612073565b61218660a0890189612000565b888303601f190160c08a015290612034565b6121a560c0880188612000565b878303601f190160e089015290612073565b6121c460e0870187612000565b868303601f190161010088015290612034565b6121e5610100860186612000565b858303601f190161012087015290612073565b92610120810190612000565b91610140601f1982860301910152612073565b92919261222382611bd0565b916122316040519384611baf565b82948184528183011161095a578281602093845f96015e010152565b51906001600160a01b038216820361095a57565b9080601f8301121561095a578151611c3c92602001612217565b9080601f8301121561095a57815161229281611d2c565b926122a06040519485611baf565b81845260208085019260051b82010192831161095a57602001905b8282106122c85750505090565b602080916122d58461224d565b8152019101906122bb565b9080601f8301121561095a5781516122f781611d2c565b926123056040519485611baf565b81845260208085019260051b82010192831161095a57602001905b82821061232d5750505090565b8151815260209182019101612320565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a576040519161237183611b78565b61237a8261224d565b835260208201516001600160401b03811161095a578161239b918401612261565b60208401526040820151604084015260608201516001600160401b03811161095a57816123c991840161227b565b606084015260808201516001600160401b03811161095a57816123ed9184016122e0565b608084015260a08201516001600160401b03811161095a578161241191840161227b565b60a084015260c08201516001600160401b03811161095a57816124359184016122e0565b60c084015260e08201516001600160401b03811161095a578161245991840161227b565b60e08401526101008201516001600160401b03811161095a578161247e9184016122e0565b6101008401526101208201516001600160401b03811161095a576124a292016122e0565b61012082015290565b6124be906020808251830101910161233d565b80516020909101516001600160a01b0390911691565b929092818403612569575f91345b8584101561255e578184101561254a578360051b808601359082821161253b5784013561013e198536030181121561095a5761251f90850161394b565b1561253057600191039301926124e2565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b61258061292d565b5f9161258b82612a95565b9061259581612a95565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103611a68576125cc82612b43565b15611a68576101208201916125e183516124ab565b60a0879392930151825103611a1457905160405163e6c9714d60e01b815292602092849283918291612617918c60048501611f3d565b03916001600160a01b03165afa908115611a5d575f91612761575b5015611a14576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061266f81611b2e565b8681525f60208201526040519261268584611b2e565b83526020830152803b1561095a57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161274c575b506126ea5763614cf93960e01b85526004849052602485fd5b61272a60c07ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09296959394965196019560018060a01b0387511690613964565b94516001600160a01b03169380a49060015f5160206140e45f395f51905f5255565b6127599196505f90611baf565b5f945f6126d1565b90506020813d602011612793575b8161277c60209383611baf565b8101031261095a5761278d90611f30565b5f612632565b3d915061276f565b604051906127a882611b78565b6060610120835f81528260208201525f604082015282808201528260808201528260a08201528260c08201528260e0820152826101008201520152565b9080601f8301121561095a5781356127fc81611d2c565b9261280a6040519485611baf565b81845260208085019260051b82010192831161095a57602001905b8282106128325750505090565b6020809161283f84611d18565b815201910190612825565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361291e5761287e81612b43565b156129185761289e6101206128ae9201516020808251830101910161233d565b916020808251830101910161233d565b6040820151604082015111159182612906575b826128ed575b826128d157505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506128c7565b91506129128183613e74565b916128c1565b50505f90565b635f9bd90760e11b5f5260045ffd5b60025f5160206140e45f395f51905f5254146129565760025f5160206140e45f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b6040519061297282611b78565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361095a57565b60208183031261095a578051906001600160401b03821161095a57016101408183031261095a57604051916129f783611b78565b8151835260208201516020840152612a11604083016129af565b6040840152612a22606083016129af565b6060840152612a33608083016129af565b608084015260a082015160a0840152612a4e60c0830161224d565b60c0840152612a5f60e0830161224d565b60e0840152612a716101008301611f30565b6101008401526101208201516001600160401b03811161095a576124a29201612261565b90612a9e612965565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315611a5d575f93612b27575b508251818115918215612b1c575b5050612b0a5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f612b01565b612b3c9193503d805f833e61062a8183611baf565b915f612af3565b805115612ba6576001600160401b036060820151168015159081612b9b575b50612b8c57608001516001600160401b0316612b7d57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f612b62565b635c2c7f8960e01b5f5260045ffd5b3d15612bdf573d90612bc682611bd0565b91612bd46040519384611baf565b82523d5f602084013e565b606090565b612bf7906020808251830101910161233d565b6040810180519081612f02575b5090916001600160a01b0381169150608083019060608401905f5b82518051821015612cea57600191906001600160a01b0390612c42908390613e60565b5116612c4f828751613e60565b51906040519163a9059cbb60e01b5f528860045260245260205f60448180855af190845f5114821615612cdd575b509060405215612c8e575b01612c1f565b85828060a01b03612ca0838751613e60565b51167f6a0720b70d5a8914c9378c90e36e760e11a1c79840d56909d7562c7c79654e0b6020612cd0858a51613e60565b51604051908152a3612c88565b3b15153d1516165f612c7d565b505094939150505f9060a081019060c08101925b82518051821015612ddf576001600160a01b0390612d1d908390613e60565b511690612d2b818651613e60565b51823b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101919091526001925f908290606490829084905af19081612dcf575b50612dca5785828060a01b03612d8b838751613e60565b51167f0863b761d932722655fba74d8a2c2b32a37c3d52195357bf7b4610ebfc6944e06020612dbb858a51613e60565b51604051908152a35b01612cfe565b612dc4565b5f612dd991611baf565b5f612d74565b50506101008101925060e081019150610120015f5b82518051821015612ee6576001600160a01b0390612e13908390613e60565b511690612e21818651613e60565b5191612e2e828551613e60565b5192813b1561095a57600193612e60925f92838d60405196879586948593637921219560e11b8552306004860161405f565b03925af19081612ed6575b50612ed15785828060a01b03612e82838751613e60565b51167f15fffc8b1069bee41edd748e645887f613b87a2d861ab91a772fc4a11ebe53026040612eb2858a51613e60565b51612ebe868951613e60565b5182519182526020820152a35b01612df4565b612ecb565b5f612ee091611baf565b5f612e6b565b5050505050509050604051612efc602082611baf565b5f815290565b5f80808060018060a01b03881695865af1612f1b612bb5565b50612c045760207ff7c9ce661c79b7ec4fedd33edef0ee43991ab10fc7464e4764925d33e3dfd0bc9151604051908152a25f80612c04565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b82101561309d575b806d04ee2d6d415b85acef8100000000600a921015613082575b662386f26fc1000081101561306e575b6305f5e10081101561305d575b61271081101561304e575b6064811015613040575b1015613035575b600a60216001840193612fda85611bd0565b94612fe86040519687611baf565b808652612ff7601f1991611bd0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561303057600a9091613002565b505090565b600190910190612fc8565b606460029104930192612fc1565b61271060049104930192612fb7565b6305f5e10060089104930192612fac565b662386f26fc1000060109104930192612f9f565b6d04ee2d6d415b85acef810000000060209104930192612f8f565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104612f75565b929091926130cc61292d565b6130df602082518301016020830161233d565b926060840192835151956080860196875151036138ea5760a08601908151519360c0880194855151036138ea5760e08801978851516101008201908151518114908115916138f9575b506138ea5761314861313f8a515187515190614097565b8b515190614097565b603281116138d357506040820151806138b6575b505f5b89518051821015613312576024906020906001600160a01b0390613184908590613e60565b5116604051928380926370a0823160e01b82523060048301525afa908115611a5d575f916132e1575b508c6131c6838d6108248260018060a01b039251613e60565b5191604051926323b872dd60e01b5f52336004523060245260445260205f60648180865af19160015f51148316156132d0575b50602491926040525f60605260208d61321a8660018060a01b039251613e60565b5116604051938480926370a0823160e01b82523060048301525afa918215611a5d578f9385915f94613298575b501593841561327d575b505050506132615760010161315f565b89518c916108e2916001600160a01b0390610824908390613e60565b61328e939450906109199151613e60565b115f80838f613251565b94509250506020833d82116132c8575b816132b560209383611baf565b8101031261095a57838f9351925f613247565b3d91506132a8565b916024923b15153d151616916131f9565b90506020813d821161330a575b816132fb60209383611baf565b8101031261095a57515f6131ad565b3d91506132ee565b5050929599509295965092965f965b86518051891015613530576001600160a01b0390613340908a90613e60565b5116602061334f8a8d51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115611a5d575f916134f7575b50336001600160a01b03909116036134df5786516001600160a01b03906133a0908a90613e60565b51166133ad898c51613e60565b5190803b1561095a576040516323b872dd60e01b815233600482015230602482015260448101929092525f908290606490829084905af190816134cf575b506134085789610ab089896108248260018060a01b039251613e60565b9091929394959660018060a01b03613421828a51613e60565b51166020613430838d51613e60565b516024604051809481936331a9108f60e11b835260048301525afa908115611a5d575f91613496575b50306001600160a01b039091160361347a5760010196959493929190613321565b87518a91610ab0916001600160a01b0390610824908390613e60565b90506020813d82116134c7575b816134b060209383611baf565b8101031261095a576134c19061224d565b5f613459565b3d91506134a3565b5f6134d991611baf565b5f6133eb565b89610ab089896108248260018060a01b039251613e60565b90506020813d8211613528575b8161351160209383611baf565b8101031261095a576135229061224d565b5f613378565b3d9150613504565b50939498509450959094506101205f9501965b8451805187101561370b57613576906020906001600160a01b0390613569908a90613e60565b5116610c5c898b51613e60565b03915afa908115611a5d575f916136da575b5085516001600160a01b039061359f908990613e60565b51166135ac888a51613e60565b516135b8898c51613e60565b51823b1561095a576135e5925f9283604051809681958294637921219560e11b845230336004860161405f565b03925af190816136ca575b50613615578888610904610d3b8a610d33818c610d2a8260018060a01b039251613e60565b6136419097969192939497602060018060a01b03613634858a51613e60565b5116610daa858b51613e60565b03915afa918215611a5d575f92613695575b5061366390610919848c51613e60565b11613675576001019495929190613543565b85610904610d3b83610d33818a610d2a8f9860018060a01b039251613e60565b9091506020813d82116136c2575b816136b060209383611baf565b8101031261095a575190613663613653565b3d91506136a3565b5f6136d491611baf565b5f6135f0565b90506020813d8211613703575b816136f460209383611baf565b8101031261095a57515f613588565b3d91506136e7565b5095509550915091506001600160401b036040519361372985611b94565b60018060a01b031692838552166020840152600160408401525f606084015260808301525f60a0830152602060405161376181611b2e565b7f000000000000000000000000000000000000000000000000000000000000000081528181019384526040518094819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0613802608083015160c060e4860152610124850190611ae0565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1918215611a5d575f92613882575b50817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206140e45f395f51905f5255565b9091506020813d6020116138ae575b8161389e60209383611baf565b8101031261095a5751905f613848565b3d9150613891565b34811461315c57630d35e92160e01b5f526004523460245260445ffd5b6325b198a560e21b5f52600452603260245260445ffd5b63512509d360e11b5f5260045ffd5b90506101208301515114155f613128565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361393c57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361095a57301490565b61397a909291926020808251830101910161233d565b6040810180519081613e2b575b50909160808301915060608301906001600160a01b038516905f5b83518051821015613b65576024906020906001600160a01b03906139c7908590613e60565b5116604051928380926370a0823160e01b82528860048301525afa908115611a5d575f91613b34575b50602460018060a01b03613a05848851613e60565b5116613a12848951613e60565b51906040519163a9059cbb60e01b5f5287600452835260205f60448180855af19060015f5114821615613b27575b5090604052602060018060a01b03613a59868a51613e60565b5116604051938480926370a0823160e01b82528a60048301525afa918215611a5d575f92613af4575b5015918215613adb575b5050613a9a576001016139a2565b84610904613abf8387613ab68c9660018060a01b039251613e60565b51169351613e60565b51604051634a73404560e11b81529384933090600486016140b8565b613aec919250610919848951613e60565b115f80613a8c565b9091506020813d8211613b1f575b81613b0f60209383611baf565b8101031261095a5751905f613a82565b3d9150613b02565b3b15153d1516165f613a40565b90506020813d8211613b5d575b81613b4e60209383611baf565b8101031261095a57515f6139f0565b3d9150613b41565b505060c08501945f945060a08101935091905b83518051861015613cfa576001600160a01b0390613b97908790613e60565b5116613ba4868851613e60565b5190803b1561095a576040516323b872dd60e01b81523060048201526001600160a01b038a16602482015260448101929092525f908290606490829084905af19081613cea575b50613c295750505081613c0d91613ab66109049460018060a01b039251613e60565b5160405163045b391760e01b81529384933090600486016140b8565b9091949360018060a01b03613c3f828651613e60565b51166020613c4e838851613e60565b516024604051809481936331a9108f60e11b835260048301525afa8015611a5d5784915f91613caf575b506001600160a01b031603613c935760010193949190613b78565b84610904613c0d8387613ab68c9660018060a01b039251613e60565b9150506020813d8211613ce2575b81613cca60209383611baf565b8101031261095a57613cdc849161224d565b5f613c78565b3d9150613cbd565b5f613cf491611baf565b5f613beb565b509350509250505f60e0830161012061010085019401925b81518051841015613e16576001600160a01b0390613d31908590613e60565b5116613d3e848751613e60565b51613d4a858751613e60565b51823b1561095a57613d78925f92838b60405196879586948593637921219560e11b8552306004860161405f565b03925af19081613e06575b50613dfc575081613db181613db993613da8610904979660018060a01b039251613e60565b51169651613e60565b519251613e60565b5160405163334a7d1b60e21b81526001600160a01b03948516600482015230602482015294909316604485015260648401526084830191909152819060a4820190565b9160010191613d12565b5f613e1091611baf565b5f613d83565b50945050505050604051612efc602082611baf565b5f80808060018060a01b03891695865af1613e44612bb5565b506139875751906338f0620160e21b5f5260045260245260445ffd5b805182101561254a5760209160051b010190565b6060810191825151606082019081515111614057575f5b815151811015613f045784516001600160a01b0390613eab908390613e60565b511660018060a01b03613ebf838551613e60565b511614801590613edf575b613ed657600101613e8b565b50505050505f90565b50613eee816080860151613e60565b51613efd826080860151613e60565b5111613eca565b5050915060a081019182515160a082019081515111614057575f5b815151811015613f905784516001600160a01b0390613f3f908390613e60565b511660018060a01b03613f53838551613e60565b511614801590613f6a575b613ed657600101613f1f565b50613f798160c0860151613e60565b51613f888260c0860151613e60565b511415613f5e565b5050915060e08101918251519260e082019384515111614057575f5b84515181101561404d5781516001600160a01b0390613fcc908390613e60565b511660018060a01b03613fe0838851613e60565b511614801590614025575b8015613ffe575b613ed657600101613fac565b5061400e81610120860151613e60565b5161401e82610120860151613e60565b5111613ff2565b5061403581610100860151613e60565b5161404582610100860151613e60565b511415613feb565b5050505050600190565b505050505f90565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b919082018092116140a457565b634e487b7160e01b5f52601160045260245ffd5b6001600160a01b0391821681529181166020830152909116604082015260608101919091526080019056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220fd3e8b60434ce42ffcec75be2b87d76a1abfe777794aff473463087dbb9ee1e164736f6c634300081b0033",
    "sourceMap": "821:18412:92:-:0;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;;1183:12:9;;;1054:5;1183:12;821:18412:92;1054:5:9;1183:12;821:18412:92;;;;;;;;;;;;;;;;;;;16284:13;821:18412;16284:13;;;821:18412;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;:::i;:::-;-1:-1:-1;821:18412:92;;-1:-1:-1;;;821:18412:92;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;3045:39:9;821:18412:92;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;821:18412:92:-;-1:-1:-1;821:18412:92;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;1139:12:84;821:18412:92;;15352:16;;821:18412;;;;;;;;15352:16;;;;:::i;:::-;;1055:104:6;;15352:16:92;;;;;;:::i;:::-;1139:12:84;:::i;:::-;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;19190:34;;821:18412;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;821:18412:92;;-1:-1:-1;;;2619:23:81;;821:18412:92;;;2619:23:81;;;821:18412:92;;;;2619:23:81;821:18412:92;2619:3:81;-1:-1:-1;;;;;821:18412:92;2619:23:81;;;;;;;;;;;821:18412:92;2656:19:81;821:18412:92;2656:19:81;;821:18412:92;2679:18:81;2656:41;2652:87;;821:18412:92;19019:46;19030:16;;;;821:18412;;;;19019:46;;;;;;:::i;:::-;821:18412;;;;;;;:::i;2652:87:81:-;-1:-1:-1;;;2718:21:81;;821:18412:92;;2718:21:81;2619:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;821:18412:92;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;:::i;:::-;-1:-1:-1;821:18412:92;;-1:-1:-1;;;821:18412:92;;;;;;-1:-1:-1;821:18412:92;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;:::i;:::-;1139:12:84;2989:103:66;;:::i;:::-;4111:34:92;821:18412;;;4111:34;;;821:18412;4111:34;;;:::i;:::-;2941:16;821:18412;2941:16;;;;;821:18412;2968:17;;;;;;;821:18412;2941:51;2937:110;;3060:17;;;;;;821:18412;3088:19;;;;;;;821:18412;3060:54;3056:113;;821:18412;3195:18;;;;;821:18412;3224:20;;;;;;;821:18412;3195:56;;;;;:131;;;821:18412;3178:187;;;3398:78;:50;:16;;821:18412;3424:17;;821:18412;3398:50;;:::i;:::-;3451:18;;821:18412;3398:78;;:::i;:::-;2432:2;3490:30;;3486:117;;4231:20;821:18412;4231:20;;821:18412;4231:24;4227:182;;821:18412;6400:13;;6444:3;6419:16;;821:18412;;6415:27;;;;;10404:1148:51;;821:18412:92;;-1:-1:-1;;;;;821:18412:92;6539:19;;821:18412;;6539:19;:::i;:::-;821:18412;;;;;;;;;;;6532:52;;6578:4;821:18412;6532:52;;821:18412;6532:52;;;;;;;;;;6444:3;10404:1148:51;821:18412:92;;;6683:20;821:18412;;6621:19;821:18412;;;;;;6621:16;;:19;:::i;:::-;821:18412;;6683:17;;:20;:::i;:::-;821:18412;2449:48:51;821:18412:92;10404:1148:51;10365:28;;;;10404:1148;;903:10:84;821:18412:92;10404:1148:51;6578:4:92;10404:1148:51;;821:18412:92;10404:1148:51;821:18412:92;10404:1148:51;;;;;;;;821:18412:92;10404:1148:51;;;;;;;;6444:3:92;10404:1148:51;;821:18412:92;10404:1148:51;;821:18412:92;10404:1148:51;821:18412:92;;6793:19;821:18412;;;;;;6793:16;;:19;:::i;:::-;821:18412;;;;;;;;;;;6786:52;;6578:4;821:18412;6786:52;;821:18412;6786:52;;;;;;;;;;;;;;;;;6444:3;6909:8;;821:18412;;;6909:63;;6444:3;6905:192;;;;;;821:18412;;6400:13;;6905:192;7019:16;;821:18412;;7061:20;;-1:-1:-1;;;;;821:18412:92;7019:19;;821:18412;;7019:19;:::i;7061:20::-;821:18412;;;-1:-1:-1;;;6999:83:92;;821:18412;;;6999:83;;6578:4;;903:10:84;;821:18412:92;6999:83;;;:::i;:::-;;;;6909:63;6936:36;6952:17;;;;:20;:17;;:20;:::i;:::-;821:18412;6936:36;;:::i;:::-;-1:-1:-1;6909:63:92;;;;;;6786:52;;;;;;821:18412;6786:52;;;;;;;;;821:18412;6786:52;;;:::i;:::-;;;821:18412;;;;;;;;6786:52;;;;821:18412;-1:-1:-1;821:18412:92;;6786:52;;;-1:-1:-1;6786:52:92;;;821:18412;;;;;;;;;10404:1148:51;;;;;;;;;;;6532:52:92;;821:18412;6532:52;;;;;;;;;821:18412;6532:52;;;:::i;:::-;;;821:18412;;;;10404:1148:51;821:18412:92;;6532:52;;;;;-1:-1:-1;6532:52:92;;;821:18412;;;;;;;;;6415:27;;;;;;;;;7150:13;7145:992;7195:3;7169:17;;821:18412;;7165:28;;;;;-1:-1:-1;;;;;821:18412:92;7291:20;;821:18412;;7291:20;:::i;:::-;821:18412;;;7321:22;:19;;;:22;:::i;:::-;821:18412;10404:1148:51;821:18412:92;;;;;;;;;7283:61;;821:18412;7283:61;;821:18412;7283:61;;;;;;;;;;;7195:3;-1:-1:-1;903:10:84;-1:-1:-1;;;;;821:18412:92;;;7362:19;7358:152;;7536:17;;-1:-1:-1;;;;;821:18412:92;7536:20;;:17;;:20;:::i;:::-;821:18412;;7592:22;:19;;;:22;:::i;:::-;821:18412;7528:87;;;;;821:18412;;-1:-1:-1;;;7528:87:92;;903:10:84;821:18412:92;7528:87;;821:18412;6578:4;821:18412;;;;;;;;;;;;;;;;;;;;;;;;7528:87;;;;;;7195:3;-1:-1:-1;;7524:287:92;;821:18412;7773:22;821:18412;;7730:20;821:18412;;;;;;7730:17;;:20;:::i;7773:22::-;821:18412;;;-1:-1:-1;;;7709:87:92;;821:18412;;;7709:87;;6578:4;;903:10:84;;821:18412:92;7709:87;;;:::i;7524:287::-;;;;;;;821:18412;;;;;7900:20;:17;;;:20;:::i;:::-;821:18412;;;7930:22;:19;;;:22;:::i;:::-;821:18412;10404:1148:51;821:18412:92;;;;;;;;;7892:61;;821:18412;7892:61;;821:18412;7892:61;;;;;;;;;;;7524:287;-1:-1:-1;6578:4:92;-1:-1:-1;;;;;821:18412:92;;;7971:27;7967:160;;821:18412;;7150:13;;;;;;;;7967:160;8046:17;;821:18412;;8089:22;;-1:-1:-1;;;;;821:18412:92;8046:20;;821:18412;;8046:20;:::i;7892:61::-;;;821:18412;7892:61;;;;;;;;;821:18412;7892:61;;;:::i;:::-;;;821:18412;;;;;;;:::i;:::-;7892:61;;;821:18412;;;;7892:61;;;-1:-1:-1;7892:61:92;;;821:18412;;;;;;;;;7528:87;;;;;:::i;:::-;821:18412;;7528:87;;;;821:18412;;;;7358:152;821:18412;7472:22;821:18412;;7429:20;821:18412;;;;;;7429:17;;:20;:::i;7283:61::-;;;821:18412;7283:61;;;;;;;;;821:18412;7283:61;;;:::i;:::-;;;821:18412;;;;;;;:::i;:::-;7283:61;;;;;;-1:-1:-1;7283:61:92;;;821:18412;;;;;;;;;7165:28;;;;;;;8527:19;8181:13;8527:19;;8176:1129;8227:3;8200:18;;821:18412;;8196:29;;;;;8315:81;;821:18412;;-1:-1:-1;;;;;821:18412:92;8324:21;;821:18412;;8324:21;:::i;:::-;821:18412;;8372:23;:20;;;:23;:::i;:::-;821:18412;;;-1:-1:-1;;;8315:81:92;;6578:4;821:18412;8315:81;;821:18412;;;;;;;;;;;;;;;;;;;;;8315:81;;;;;;;;;;;;;;8227:3;-1:-1:-1;8424:18:92;;-1:-1:-1;;;;;821:18412:92;8424:21;;:18;;:21;:::i;:::-;821:18412;;8502:23;:20;;;:23;:::i;:::-;821:18412;8527:19;:22;:19;;;:22;:::i;:::-;821:18412;8415:139;;;;;;;821:18412;;;;;;;;;;;;;;;;;8415:139;;6578:4;903:10:84;821:18412:92;8415:139;;;:::i;:::-;;;;;;;;;8227:3;-1:-1:-1;;8411:404:92;;821:18412;;8648:152;8760:22;821:18412;8735:23;821:18412;;8691:21;821:18412;;;;;;8691:18;;:21;:::i;:::-;821:18412;;8735:20;;:23;:::i;:::-;821:18412;8760:19;;:22;:::i;:::-;821:18412;;;-1:-1:-1;;;8648:152:92;;-1:-1:-1;;;;;821:18412:92;;;;8648:152;;821:18412;903:10:84;821:18412:92;;;;6578:4;821:18412;;;;;;;;;;;;;;;;;;;;;;;;;;8411:404;8896:81;8411:404;;;;;;;821:18412;;;;;;8905:21;:18;;;:21;:::i;:::-;821:18412;;8953:23;:20;;;:23;:::i;:::-;821:18412;;;-1:-1:-1;;;8896:81:92;;6578:4;821:18412;8896:81;;821:18412;;;;;;;;;;;;;;;;;;;;;8896:81;;;;;;;;;;;;;;8411:404;9079:19;9063:38;9079:19;:22;:19;;;:22;:::i;9063:38::-;-1:-1:-1;9044:251:92;;821:18412;;8181:13;;;;;;9044:251;821:18412;9128:152;9240:22;821:18412;9215:23;821:18412;;9171:21;821:18412;;;;;;;9171:18;;:21;:::i;8896:81::-;;;;821:18412;8896:81;;;;;;;;;821:18412;8896:81;;;:::i;:::-;;;821:18412;;;;;;9063:38;8896:81;;;;;-1:-1:-1;8896:81:92;;;821:18412;;;;;;;;;8415:139;;;;;:::i;:::-;821:18412;;8415:139;;;;821:18412;;;;8315:81;;;821:18412;8315:81;;;;;;;;;821:18412;8315:81;;;:::i;:::-;;;821:18412;;;;;8315:81;;;;;;-1:-1:-1;8315:81:92;;;821:18412;;;;;;;;;8196:29;-1:-1:-1;821:18412:92;;;-1:-1:-1;;;;;8196:29:92;821:18412;;;:::i;:::-;903:10:84;821:18412:92;;;;2141:299:81;;821:18412:92;;;2141:299:81;;821:18412:92;;;;2141:299:81;;821:18412:92;2968:17;2141:299:81;;821:18412:92;2141:299:81;3060:17:92;2141:299:81;;821:18412:92;;;;;;;:::i;:::-;2095:18:81;821:18412:92;;2046:413:81;;;821:18412:92;;;;;;;;;;;;2018:455:81;;;821:18412:92;2018:455:81;;821:18412:92;;10404:1148:51;821:18412:92;;;;;;;;;;;;;;;;;10404:1148:51;821:18412:92;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;3060:17;821:18412;2968:17;821:18412;;;3088:19;821:18412;;;;;;;;;:::i;:::-;;;;;;;;2018:455:81;821:18412:92;;2018:3:81;-1:-1:-1;;;;;821:18412:92;2018:455:81;;;;;;;;;;;8176:1129:92;903:10:84;821:18412:92;903:10:84;;5274:26:82;903:10:84;5274:26:82;;;821:18412:92;-1:-1:-1;;;;;;;;;;;2407:1:66;821:18412:92;;;;;;2018:455:81;;;821:18412:92;2018:455:81;;821:18412:92;2018:455:81;;;;;;821:18412:92;2018:455:81;;;:::i;:::-;;;821:18412:92;;;;;;2018:455:81;;;;;-1:-1:-1;2018:455:81;;;821:18412:92;;;;;;;;;4227:182;4275:9;4271:128;;4227:182;4271:128;-1:-1:-1;;;4335:49:92;;821:18412;;4275:9;821:18412;;;4335:49;;3486:117;-1:-1:-1;;;3543:49:92;;821:18412;;2432:2;821:18412;;;3543:49;;3178:187;-1:-1:-1;;;3344:21:92;;821:18412;3015:21;3344;3195:131;3300:19;;;;;;821:18412;3271:55;;3195:131;;;3056:113;-1:-1:-1;;;3137:21:92;;821:18412;3015:21;3137;2937:110;-1:-1:-1;;;3015:21:92;;821:18412;3015:21;;821:18412;;;;;;;-1:-1:-1;;821:18412:92;;;;;;2989:103:66;;;:::i;:::-;17930:28:92;;;:::i;:::-;18025:18;821:18412;18025:18;;821:18412;18047:18;18025:40;;;18021:104;;18234:26;;;-1:-1:-1;;;;;821:18412:92;;;18234:31;18230:62;;821:18412;-1:-1:-1;;;;;821:18412:92;18307:15;:44;18303:100;;821:18412;;18467:3;-1:-1:-1;;;;;821:18412:92;;;;;;:::i;:::-;;;;18544:43;821:18412;18544:43;;821:18412;;;;;;;:::i;:::-;;;;18491:98;;821:18412;18467:132;;;;;821:18412;;-1:-1:-1;;;18467:132:92;;821:18412;;;18467:132;;821:18412;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;18467:132;;;;;;821:18412;-1:-1:-1;;18463:207:92;;-1:-1:-1;;;18638:21:92;;821:18412;;;;-1:-1:-1;18638:21:92;18463:207;18780:16;;;;18798:21;;;821:18412;18758:62;;-1:-1:-1;;;;;821:18412:92;;;;18758:62;:::i;:::-;;821:18412;-1:-1:-1;;;;;;;;;;;2407:1:66;821:18412:92;;;;;;;18467:132;;;;;:::i;:::-;821:18412;;18467:132;;;;18303:100;-1:-1:-1;;;18374:18:92;;821:18412;3990:18:82;18374::92;18230:62;-1:-1:-1;;;18274:18:92;;821:18412;3990:18:82;18274::92;18021:104;-1:-1:-1;;;18088:26:92;;821:18412;16342:26;18088;821:18412;;1442:1461:9;821:18412:92;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;821:18412:92:-;;;;;;2141:12:82;821:18412:92;;;:::i;:::-;2141:12:82;;:::i;:::-;821:18412:92;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;821:18412:92;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;821:18412:92;;;;;;2989:103:66;;;:::i;:::-;3646:28:82;;;:::i;:::-;3741:18;821:18412:92;3741:18:82;;821:18412:92;3763:18:82;3741:40;;;3737:104;;3950:26;;;-1:-1:-1;;;;;821:18412:92;;;3950:31:82;3946:62;;821:18412:92;-1:-1:-1;;;;;821:18412:92;4023:15:82;:44;4019:100;;821:18412:92;;4183:3:82;-1:-1:-1;;;;;821:18412:92;;;;;;:::i;:::-;;;;4260:43:82;821:18412:92;4260:43:82;;821:18412:92;;;;;;;:::i;:::-;;;;4207:98:82;;821:18412:92;4183:132:82;;;;;821:18412:92;;-1:-1:-1;;;4183:132:82;;821:18412:92;;;4183:132:82;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4183:132:82;;;;;;821:18412:92;-1:-1:-1;;4179:207:82;;-1:-1:-1;;;4354:21:82;;821:18412:92;;;;-1:-1:-1;4354:21:82;4179:207;4465:16;;;;4483:21;;;821:18412:92;4465:16:82;;-1:-1:-1;;;;;821:18412:92;;;;4465:16:82;:::i;4183:132::-;;;;;:::i;:::-;821:18412:92;;4183:132:82;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;1724:44:81;;1749:18;821:18412:92;1724:44:81;;821:18412:92;;;1724:44:81;821:18412:92;;;;;;1724:14:81;821:18412:92;1724:44:81;;;;;;;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1724:44:81:-;;;;;;;;;;;;:::i;:::-;;;821:18412:92;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1724:44:81;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;724:43:81;821:18412:92;;;;-1:-1:-1;821:18412:92;;-1:-1:-1;;821:18412:92;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;1139:12:84;15085:16:92;821:18412;15085:16;821:18412;;:::i;:::-;;;;;;;;;15085:16;;;;:::i;:::-;;1055:104:6;;15085:16:92;;;;;;:::i;:::-;15119:10;1139:12:84;;:::i;821:18412:92:-;;;;;;;;;;;;;1055:104:6;;821:18412:92;;1089:6:6;1072:24;1089:6;1072:24;:::i;:::-;1120:6;;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;821:18412:92;;;;;;;;;;;;1055:104:6;;;821:18412:92;;;;-1:-1:-1;;;821:18412:92;;;;;;;;;;;;;;;;;-1:-1:-1;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;821:18412:92:-;;;;;2141:12:82;821:18412:92;;;:::i;2141:12:82:-;;821:18412:92;;;15569:4;821:18412;;;;;;;;;;;;;;;;;;;2432:2;821:18412;;;;;;;;;;;:::i;:::-;2989:103:66;;;;:::i;:::-;16110:32:92;;;:::i;:::-;16185:37;;;;:::i;:::-;16284:13;;;821:18412;16301:18;16284:35;;;16280:99;;16394:24;;;:::i;:::-;16393:25;16389:64;;16584:11;;;;16560:36;16584:11;;16560:36;:::i;:::-;16682:18;;;;;;821:18412;;;16682:32;16678:65;;821:18412;;;;-1:-1:-1;;;16814:66:92;;821:18412;16284:13;;821:18412;;;;;;16814:66;;;821:18412;16814:66;;;:::i;:::-;;;-1:-1:-1;;;;;821:18412:92;16814:66;;;;;;;821:18412;16814:66;;;821:18412;16813:67;;16809:125;;821:18412;;16978:3;-1:-1:-1;;;;;821:18412:92;;;;;:::i;:::-;;;;;16284:13;17055:47;;821:18412;;;;;;;:::i;:::-;;;16284:13;17002:102;;821:18412;16978:136;;;;;821:18412;;-1:-1:-1;;;16978:136:92;;821:18412;;;16978:136;;821:18412;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;16978:136:92;;;;;;821:18412;-1:-1:-1;16974:215:92;;-1:-1:-1;;;17153:25:92;;821:18412;;;;;17153:25;;16974:215;17290:11;;17303:21;;;;821:18412;;16284:13;;17268:57;;-1:-1:-1;;;;;821:18412:92;;17268:57;:::i;:::-;;821:18412;;;;;;;;;17341:61;821:18412;;17341:61;;;17419:4;-1:-1:-1;;;;;;;;;;;2407:1:66;17419:4:92;821:18412;;;16978:136;;;;;821:18412;16978:136;;:::i;:::-;821:18412;16978:136;;;;16809:125;16723:20;;;821:18412;16903:20;821:18412;;16903:20;16814:66;;;16284:13;16814:66;;16284:13;16814:66;;;;;;16284:13;16814:66;;;:::i;:::-;;;821:18412;;;;;;;:::i;:::-;16814:66;;;;;;-1:-1:-1;16814:66:92;;;821:18412;;;;;;;;;16389:64;16342:26;;;821:18412;16427:26;821:18412;;16427:26;821:18412;;;;;;-1:-1:-1;;821:18412:92;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;766:49:44;;;:89;;;;821:18412:92;;;;;;;766:89:44;-1:-1:-1;;;829:40:75;;-1:-1:-1;766:89:44;;;821:18412:92;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;-1:-1:-1;;821:18412:92;;;;:::o;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18412:92;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;:::o;:::-;;;;-1:-1:-1;821:18412:92;;;;;-1:-1:-1;821:18412:92;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;:::o;:::-;3088:19;821:18412;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;:::o;:::-;;;1055:104:6;;821:18412:92;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;:::o;:::-;-1:-1:-1;;;;;821:18412:92;;;;;;-1:-1:-1;;821:18412:92;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;821:18412:92;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;821:18412:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18412:92;;;;;;:::o;:::-;-1:-1:-1;;;;;821:18412:92;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;1055:104:6;;821:18412:92;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;:::i;:::-;;;;1055:104:6;821:18412:92;1055:104:6;;821:18412:92;;;;;;;;:::i;:::-;;-1:-1:-1;;821:18412:92;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;:::o;:::-;;;;;-1:-1:-1;;;;;821:18412:92;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1055:104:6;;821:18412:92;;;;;;;;;;;;;;;;;;;;:::i;:::-;1055:104:6;;;;;821:18412:92;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18412:92;;;;;1055:104:6;821:18412:92;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18412:92;;;;;1055:104:6;821:18412:92;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18412:92;;;;;1055:104:6;821:18412:92;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18412:92;;;;;1055:104:6;821:18412:92;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;;821:18412:92;;;;;1055:104:6;821:18412:92;:::i;:::-;;;;;;;:::i;:::-;1055:104:6;821:18412:92;1055:104:6;;821:18412:92;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18412:92;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;:::i;:::-;;;;;;:::o;3667:289::-;3865:34;3667:289;3865:34;821:18412;;;3865:34;;;;;;:::i;:::-;821:18412;;3865:34;3934:14;;;;-1:-1:-1;;;;;821:18412:92;;;;3667:289::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;821:18412:92;;;;;;;;;;;;;4064:22:9;;;;4060:87;;821:18412:92;;;;;;;;;;;;;;4274:33:9;821:18412:92;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;821:18412:92;;3896:19:9;821:18412:92;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;821:18412:92;;;;3881:1:9;821:18412:92;;;;;3881:1:9;821:18412:92;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2989:103:66;;;:::i;:::-;-1:-1:-1;2197:32:82;;;;:::i;:::-;2272:37;;;;:::i;:::-;2371:13;;;;821:18412:92;2388:18:82;2371:35;;;2367:99;;2481:24;;;:::i;:::-;2480:25;2476:64;;2671:11;;;;2647:36;2671:11;;2647:36;:::i;:::-;2769:18;;;;;;821:18412:92;;;2769:32:82;2765:65;;821:18412:92;;;;-1:-1:-1;;;2901:66:82;;821:18412:92;2371:13:82;;821:18412:92;;;;;;2901:66:82;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;821:18412:92;2901:66:82;;;;;;;-1:-1:-1;2901:66:82;;;2989:103:66;2900:67:82;;2896:125;;821:18412:92;;3065:3:82;-1:-1:-1;;;;;821:18412:92;;;;;:::i;:::-;;;;-1:-1:-1;2371:13:82;3142:47;;821:18412:92;;;;;;;:::i;:::-;;;2371:13:82;3089:102;;821:18412:92;3065:136:82;;;;;821:18412:92;;-1:-1:-1;;;3065:136:82;;821:18412:92;;2901:66:82;3065:136;;821:18412:92;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;3065:136:82;;;;;;2989:103:66;-1:-1:-1;3061:215:82;;-1:-1:-1;;;3240:25:82;;2901:66;821:18412:92;;;;17153:25;3240::82;3061:215;4569:751:92;3374:21:82;3426:61;3061:215;;;;;;3361:11;3374:21;;821:18412:92;;;;;;;;;4569:751;;:::i;:::-;821:18412;;-1:-1:-1;;;;;821:18412:92;;3426:61:82;;2407:1:66;2365;-1:-1:-1;;;;;;;;;;;2407:1:66;2989:103::o;3065:136:82:-;;;;;-1:-1:-1;3065:136:82;;:::i;:::-;-1:-1:-1;3065:136:82;;;;2901:66;;;2371:13;2901:66;;2371:13;2901:66;;;;;;2371:13;2901:66;;;:::i;:::-;;;821:18412:92;;;;;;;:::i;:::-;2901:66:82;;;;;;-1:-1:-1;2901:66:82;;821:18412:92;;;;;;;:::i;:::-;;;;-1:-1:-1;821:18412:92;;;;;;;-1:-1:-1;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;;12791:677;13038:18;1038:17:80;;;821:18412:92;1038:27:80;1034:55;;1106:27;;;:::i;:::-;13010:47:92;13006:65;;13114:45;13125:15;13204:36;13125:15;;;1038:17:80;821:18412:92;;;13114:45;;;;;;:::i;:::-;821:18412;1038:17:80;821:18412:92;;;13204:36;;;;;;:::i;:::-;13258:20;;;821:18412;13258:20;13282:23;;821:18412;-1:-1:-1;13258:47:92;:89;;;;12791:677;13258:142;;;12791:677;13258:203;;;13251:210;;12791:677;:::o;13258:203::-;1038:17:80;13414:14:92;;;;;;821:18412;;;;;13404:25;13443:17;;;1038::80;821:18412:92;;;;13433:28;13404:57;12791:677;:::o;13258:142::-;821:18412;;;;-1:-1:-1;;;;;821:18412:92;;;;;13363:37;;-1:-1:-1;13258:142:92;;:89;13309:38;;;;;;:::i;:::-;13258:89;;;13006:65;13059:12;;821:18412;13059:12;:::o;1034:55:80:-;1074:15;;;821:18412:92;1074:15:80;;821:18412:92;1074:15:80;3749:292:66;2407:1;-1:-1:-1;;;;;;;;;;;821:18412:92;4560:63:66;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:66;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:66;;-1:-1:-1;3696:30:66;821:18412:92;;;;;;;:::i;:::-;;;;-1:-1:-1;821:18412:92;;-1:-1:-1;821:18412:92;;;;-1:-1:-1;821:18412:92;;;;-1:-1:-1;821:18412:92;;;;-1:-1:-1;821:18412:92;;;;-1:-1:-1;821:18412:92;;;;-1:-1:-1;821:18412:92;;;;-1:-1:-1;821:18412:92;;;;-1:-1:-1;821:18412:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;821:18412:92;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;:::i;4540:257:82:-;;821:18412:92;;:::i;:::-;-1:-1:-1;821:18412:92;;-1:-1:-1;;;4665:23:82;;;;;821:18412:92;;;;-1:-1:-1;821:18412:92;4665:23:82;821:18412:92;4665:3:82;-1:-1:-1;;;;;821:18412:92;4665:23:82;;;;;;;-1:-1:-1;4665:23:82;;;4540:257;4651:37;;821:18412:92;4702:29:82;;;:55;;;;;4540:257;4698:92;;;;4540:257;:::o;4698:92::-;4766:24;;;-1:-1:-1;4766:24:82;4665:23;821:18412:92;4665:23:82;-1:-1:-1;4766:24:82;4702:55;4735:22;;;-1:-1:-1;4702:55:82;;;;4665:23;;;;;;;-1:-1:-1;4665:23:82;;;;;;:::i;:::-;;;;;596:321:80;821:18412:92;;695:28:80;691:64;;-1:-1:-1;;;;;362:25:80;;;821:18412:92;;362:30:80;;;:78;;;;596:321;765:55;;;553:25;;821:18412:92;-1:-1:-1;;;;;821:18412:92;830:58:80;;906:4;596:321;:::o;830:58::-;868:20;;;-1:-1:-1;868:20:80;;-1:-1:-1;868:20:80;765:55;803:17;;;-1:-1:-1;803:17:80;;-1:-1:-1;803:17:80;362:78;425:15;;;-1:-1:-1;396:44:80;362:78;;;691:64;732:23;;;-1:-1:-1;732:23:80;;-1:-1:-1;732:23:80;821:18412:92;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;-1:-1:-1;821:18412:92;;;;:::o;:::-;;;:::o;5409:681::-;5551:40;5409:681;5551:40;821:18412;;;5551:40;;;;;;:::i;:::-;5662:20;;;821:18412;;5662:24;;5658:247;;5409:681;-1:-1:-1;11507:13:92;;-1:-1:-1;;;;;8544:1067:51;;;-1:-1:-1;11633:17:92;;;;11526:16;;;;-1:-1:-1;11551:3:92;11526:16;;821:18412;;11522:27;;;;;821:18412;;;-1:-1:-1;;;;;821:18412:92;11592:19;;821:18412;;11592:19;:::i;:::-;821:18412;;11633:20;:17;;;:20;:::i;:::-;821:18412;2138:38:51;5662:20:92;8544:1067:51;8509:24;;;;-1:-1:-1;8544:1067:51;;;;;;5551:40:92;-1:-1:-1;8544:1067:51;;;;;;;;-1:-1:-1;8544:1067:51;;;;;;;11551:3:92;8544:1067:51;;5662:20:92;8544:1067:51;11673:8:92;11669:127;;11551:3;821:18412;11507:13;;11669:127;821:18412;;;;;;11735:19;:16;;;:19;:::i;:::-;821:18412;;11706:75;5551:40;11760:20;:17;;;:20;:::i;:::-;821:18412;5662:20;821:18412;;;;11706:75;11669:127;;8544:1067:51;;;;;;;;;;;11522:27:92;;;;;;;;-1:-1:-1;11890:17:92;;;;12001:19;;;;11866:354;11916:3;11890:17;;821:18412;;11886:28;;;;;-1:-1:-1;;;;;821:18412:92;11947:20;;821:18412;;11947:20;:::i;:::-;821:18412;;12001:19;:22;:19;;;:22;:::i;:::-;821:18412;11939:85;;;;;5662:20;821:18412;-1:-1:-1;;;11939:85:92;;11990:4;8544:1067:51;11939:85:92;;821:18412;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;11939:85:92;;;;;;11916:3;-1:-1:-1;11935:275:92;;821:18412;;;;;;12146:20;:17;;;:20;:::i;:::-;821:18412;;12116:79;5551:40;12172:22;:19;;;:22;:::i;:::-;821:18412;5662:20;821:18412;;;;12116:79;11935:275;821:18412;11871:13;;11935:275;;;11939:85;-1:-1:-1;11939:85:92;;;:::i;:::-;;;;11886:28;-1:-1:-1;;12440:20:92;;;;-1:-1:-1;821:18412:92;12305:18;;;-1:-1:-1;12465:19:92;;-1:-1:-1;12332:3:92;12305:18;;821:18412;;12301:29;;;;;-1:-1:-1;;;;;821:18412:92;12364:21;;821:18412;;12364:21;:::i;:::-;821:18412;;12440:20;:23;:20;;;:23;:::i;:::-;821:18412;12465:19;:22;:19;;;:22;:::i;:::-;821:18412;12355:137;;;;;;821:18412;;12355:137;821:18412;-1:-1:-1;821:18412:92;;;5662:20;821:18412;;;;;;;;;;;12355:137;;11990:4;8544:1067:51;12355:137:92;;;:::i;:::-;;;;;;;;;12332:3;-1:-1:-1;12351:392:92;;821:18412;;;;;;12636:21;:18;;;:21;:::i;:::-;821:18412;;12584:144;5662:20;12663:23;:20;;;:23;:::i;:::-;821:18412;12688:22;:19;;;:22;:::i;:::-;821:18412;;;;;;5551:40;821:18412;;;12584:144;12351:392;821:18412;12286:13;;12351:392;;;12355:137;-1:-1:-1;12355:137:92;;;:::i;:::-;;;;12301:29;;;;;;;;;5662:20;821:18412;;;;;:::i;:::-;-1:-1:-1;821:18412:92;;5409:681;:::o;5658:247::-;-1:-1:-1;821:18412:92;;;;;;;;;;5720:49;;;;;;:::i;:::-;;5658:247;5783:112;5551:40;5820:60;821:18412;;5662:20;821:18412;;;;5820:60;5783:112;;5658:247;;1343:634:70;1465:17;-1:-1:-1;29298:17:77;-1:-1:-1;;;29298:17:77;;;29294:103;;1343:634:70;29414:17:77;29423:8;29994:7;29414:17;;;29410:103;;1343:634:70;29539:8:77;29530:17;;;29526:103;;1343:634:70;29655:7:77;29646:16;;;29642:100;;1343:634:70;29768:7:77;29759:16;;;29755:100;;1343:634:70;29881:7:77;29872:16;;;29868:100;;1343:634:70;29985:16:77;;29981:66;;1343:634:70;29994:7:77;1580:94:70;1485:1;821:18412:92;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;821:18412:92;;:::i;:::-;;;;;;;1580:94:70;;;1687:247;-1:-1:-1;;821:18412:92;;-1:-1:-1;;;1741:111:70;;;;821:18412:92;1741:111:70;821:18412:92;1902:10:70;;1898:21;;29994:7:77;1687:247:70;;;;1898:21;1914:5;;1343:634;:::o;29981:66:77:-;30031:1;821:18412:92;;;;29981:66:77;;29868:100;29881:7;29952:1;821:18412:92;;;;29868:100:77;;;29755;29768:7;29839:1;821:18412:92;;;;29755:100:77;;;29642;29655:7;29726:1;821:18412:92;;;;29642:100:77;;;29526:103;29539:8;29612:2;821:18412:92;;;;29526:103:77;;;29410;29423:8;29496:2;821:18412:92;;;;29410:103:77;;;29294;-1:-1:-1;29380:2:77;;-1:-1:-1;;;;821:18412:92;;29294:103:77;;2989::66;;;;;;;:::i;:::-;4111:34:92;;821:18412;;4111:34;;;;;;;:::i;:::-;2941:16;;;;;;;821:18412;2968:17;;;;;;;821:18412;2941:51;2937:110;;3060:17;;;;;;821:18412;3088:19;;;;;;;821:18412;3060:54;3056:113;;3195:18;;;;;;821:18412;3224:20;;;;;;821:18412;3195:56;;;;;:131;;;2989:103:66;3178:187:92;;;3398:78;:50;:16;;821:18412;3424:17;;821:18412;3398:50;;:::i;:::-;3451:18;;821:18412;3398:78;;:::i;:::-;2432:2;3490:30;;3486:117;;4231:20;;;;821:18412;4231:24;4227:182;;2989:103:66;6400:13:92;821:18412;6444:3;6419:16;;821:18412;;6415:27;;;;;10404:1148:51;;4111:34:92;;-1:-1:-1;;;;;821:18412:92;6539:19;;821:18412;;6539:19;:::i;:::-;821:18412;;4231:20;821:18412;;;;;;;;6532:52;;6578:4;6532:52;;;821:18412;6532:52;;;;;;;821:18412;6532:52;;;6444:3;821:18412;;6683:20;821:18412;;6621:19;821:18412;;;;;;6621:16;;:19;:::i;6683:20::-;821:18412;2449:48:51;4231:20:92;10404:1148:51;10365:28;;;;821:18412:92;10404:1148:51;1183:10:84;6532:52:92;10404:1148:51;6578:4:92;10404:1148:51;;;;4111:34:92;821:18412;10404:1148:51;;;;;;;821:18412:92;;10404:1148:51;;;;;;;6444:3:92;10404:1148:51;;;;4231:20:92;10404:1148:51;821:18412:92;2941:16;10404:1148:51;4111:34:92;821:18412;6793:19;821:18412;;;;;;6793:16;;:19;:::i;:::-;821:18412;;4231:20;821:18412;;;;;;;;6786:52;;6578:4;6532:52;6786;;821:18412;6786:52;;;;;;;;;;;821:18412;6786:52;;;6444:3;6909:8;;821:18412;;;6909:63;;6444:3;6905:192;;;;;;821:18412;;6400:13;;6905:192;7019:16;;821:18412;;7061:20;;-1:-1:-1;;;;;821:18412:92;7019:19;;821:18412;;7019:19;:::i;6909:63::-;6936:36;6952:17;;;;:20;:17;;:20;:::i;6936:36::-;-1:-1:-1;6909:63:92;;;;;;6786:52;;;;;;4111:34;6786:52;;;;;;;;;821:18412;6786:52;;;:::i;:::-;;;821:18412;;;;;;;;6786:52;;;;;;;-1:-1:-1;6786:52:92;;10404:1148:51;;;;;;;;;;;;;;6532:52:92;;;4111:34;6532:52;;;;;;;;;821:18412;6532:52;;;:::i;:::-;;;821:18412;;;;;6532:52;;;;;;-1:-1:-1;6532:52:92;;6415:27;;;;;;;;;;;;;821:18412;7145:992;7195:3;7169:17;;821:18412;;7165:28;;;;;-1:-1:-1;;;;;821:18412:92;7291:20;;821:18412;;7291:20;:::i;:::-;821:18412;;4111:34;7321:22;:19;;;:22;:::i;:::-;821:18412;10404:1148:51;4231:20:92;821:18412;;;;;;;;7283:61;;6532:52;7283:61;;821:18412;7283:61;;;;;;;821:18412;7283:61;;;7195:3;-1:-1:-1;1183:10:84;-1:-1:-1;;;;;821:18412:92;;;7362:19;7358:152;;7536:17;;-1:-1:-1;;;;;821:18412:92;7536:20;;:17;;:20;:::i;:::-;821:18412;;7592:22;:19;;;:22;:::i;:::-;821:18412;7528:87;;;;;;4231:20;821:18412;-1:-1:-1;;;7528:87:92;;1183:10:84;6532:52:92;7528:87;;821:18412;6578:4;821:18412;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;7528:87:92;;;;;;7195:3;-1:-1:-1;7524:287:92;;821:18412;7773:22;821:18412;;7730:20;821:18412;;;;;;7730:17;;:20;:::i;7524:287::-;;;;;;;;821:18412;;;;;7900:20;:17;;;:20;:::i;:::-;821:18412;;4111:34;7930:22;:19;;;:22;:::i;:::-;821:18412;10404:1148:51;4231:20:92;821:18412;;;;;;;;7892:61;;6532:52;7892:61;;821:18412;7892:61;;;;;;;821:18412;7892:61;;;7524:287;-1:-1:-1;6578:4:92;-1:-1:-1;;;;;821:18412:92;;;7971:27;7967:160;;821:18412;;7150:13;;;;;;;;;7967:160;8046:17;;821:18412;;8089:22;;-1:-1:-1;;;;;821:18412:92;8046:20;;821:18412;;8046:20;:::i;7892:61::-;;;4111:34;7892:61;;;;;;;;;4111:34;7892:61;;;:::i;:::-;;;821:18412;;;;;;;:::i;:::-;7892:61;;;;;;-1:-1:-1;7892:61:92;;7528:87;821:18412;7528:87;;;:::i;:::-;;;;7358:152;821:18412;7472:22;821:18412;;7429:20;821:18412;;;;;;7429:17;;:20;:::i;7283:61::-;;;4111:34;7283:61;;;;;;;;;4111:34;7283:61;;;:::i;:::-;;;821:18412;;;;;;;:::i;:::-;7283:61;;;;;;-1:-1:-1;7283:61:92;;7165:28;;;;;;;;;;;;8527:19;821:18412;8527:19;;8176:1129;8227:3;8200:18;;821:18412;;8196:29;;;;;8315:81;;4111:34;;-1:-1:-1;;;;;821:18412:92;8324:21;;821:18412;;8324:21;:::i;:::-;821:18412;;8372:23;:20;;;:23;:::i;8315:81::-;;;;;;;;;;821:18412;8315:81;;;8227:3;-1:-1:-1;8424:18:92;;-1:-1:-1;;;;;821:18412:92;8424:21;;:18;;:21;:::i;:::-;821:18412;;8502:23;:20;;;:23;:::i;:::-;821:18412;8527:22;:19;;;:22;:::i;:::-;821:18412;8415:139;;;;;;821:18412;;;;4231:20;821:18412;;;;;;;;;;8415:139;;6578:4;1183:10:84;6532:52:92;8415:139;;;:::i;:::-;;;;;;;;;8227:3;-1:-1:-1;8411:404:92;;821:18412;;8648:152;8760:22;821:18412;8735:23;821:18412;;8691:21;821:18412;;;;;;8691:18;;:21;:::i;8411:404::-;8896:81;8411:404;;;;;;;;4111:34;821:18412;;;;;8905:21;:18;;;:21;:::i;:::-;821:18412;;8953:23;:20;;;:23;:::i;8896:81::-;;;;;;;;;;821:18412;8896:81;;;8411:404;9079:19;9063:38;9079:19;:22;:19;;;:22;:::i;9063:38::-;-1:-1:-1;9044:251:92;;821:18412;;8181:13;;;;;;;9044:251;821:18412;9128:152;9240:22;821:18412;9215:23;821:18412;;9171:21;821:18412;;;;;;;9171:18;;:21;:::i;8896:81::-;;;;4111:34;8896:81;;;;;;;;;821:18412;8896:81;;;:::i;:::-;;;821:18412;;;;;;9063:38;8896:81;;;;;-1:-1:-1;8896:81:92;;8415:139;821:18412;8415:139;;;:::i;:::-;;;;8315:81;;;4111:34;8315:81;;;;;;;;;821:18412;8315:81;;;:::i;:::-;;;821:18412;;;;;8315:81;;;;;;-1:-1:-1;8315:81:92;;8196:29;;;;;;;;;;-1:-1:-1;;;;;4231:20:92;821:18412;;;;;:::i;:::-;;;;;;;;;;;;4111:34;2141:299:81;;821:18412:92;;4231:20;2141:299:81;;821:18412:92;;2941:16;2141:299:81;;821:18412:92;2968:17;2141:299:81;;821:18412:92;;3060:17;2141:299:81;;821:18412:92;4111:34;4231:20;821:18412;;;;:::i;:::-;2095:18:81;821:18412:92;;2046:413:81;;;821:18412:92;;;4231:20;821:18412;;;;;;;;2018:455:81;;;6532:52:92;2018:455:81;;821:18412:92;;10404:1148:51;821:18412:92;;;;4231:20;10404:1148:51;821:18412:92;;;;;;;;;;;10404:1148:51;821:18412:92;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;4231:20;821:18412;;;;;;;;;2941:16;821:18412;;;;;;;3060:17;821:18412;2968:17;821:18412;;;3088:19;821:18412;;;;;;;;;:::i;:::-;;;;;;;;2018:455:81;821:18412:92;;2018:3:81;-1:-1:-1;;;;;821:18412:92;2018:455:81;;;;;;;821:18412:92;2018:455:81;;;8176:1129:92;5274:26:82;;;821:18412:92;5274:26:82;;2407:1:66;821:18412:92;-1:-1:-1;;;;;;;;;;;2407:1:66;2989:103::o;2018:455:81:-;;;;4111:34:92;2018:455:81;;4111:34:92;2018:455:81;;;;;;4111:34:92;2018:455:81;;;:::i;:::-;;;821:18412:92;;;;;2018:455:81;;;;;;;-1:-1:-1;2018:455:81;;4227:182:92;4275:9;4271:128;;4227:182;4271:128;4335:49;;;821:18412;4335:49;;821:18412;4275:9;821:18412;;;;4335:49;3486:117;3543:49;;;821:18412;3543:49;;821:18412;2432:2;821:18412;;;;3543:49;3178:187;3015:21;;;821:18412;3344:21;;821:18412;3344:21;3195:131;3300:19;;;;;;821:18412;3271:55;;3195:131;;;6040:128:9;6109:4;-1:-1:-1;;;;;821:18412:92;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1401:235:81;1592:20;;821:18412:92;;;;;;;;;;;;;1624:4:81;1592:37;1401:235;:::o;4569:751:92:-;4801:40;4569:751;;;;4801:40;821:18412;;;4801:40;;;;;;:::i;:::-;4910:20;;;821:18412;;4910:24;;4906:240;;4569:751;-1:-1:-1;9466:13:92;;9717:17;;;;-1:-1:-1;9485:16:92;;;;-1:-1:-1;;;;;821:18412:92;;;-1:-1:-1;9510:3:92;9485:16;;821:18412;;9481:27;;;;;8544:1067:51;;4801:40:92;;-1:-1:-1;;;;;821:18412:92;9605:19;;821:18412;;9605:19;:::i;:::-;821:18412;;4910:20;821:18412;;;;;;;;9598:41;;;;;;821:18412;9598:41;;;;;;;-1:-1:-1;9598:41:92;;;9510:3;821:18412;8544:1067:51;821:18412:92;;;;;9676:19;:16;;;:19;:::i;:::-;821:18412;;9717:20;:17;;;:20;:::i;:::-;821:18412;2138:38:51;4910:20:92;8544:1067:51;8509:24;;;;-1:-1:-1;8544:1067:51;;9598:41:92;8544:1067:51;;;4801:40:92;-1:-1:-1;8544:1067:51;;;;;;;821:18412:92;-1:-1:-1;8544:1067:51;;;;;;;9510:3:92;8544:1067:51;;4910:20:92;8544:1067:51;4801:40:92;821:18412;;;;;9827:19;:16;;;:19;:::i;:::-;821:18412;;4910:20;821:18412;;;;;;;;9820:41;;;9598;9820;;821:18412;9820:41;;;;;;;-1:-1:-1;9820:41:92;;;9510:3;9932:8;;821:18412;;;9932:63;;9510:3;9928:190;;;;821:18412;;9466:13;;9928:190;821:18412;10022:81;10082:20;821:18412;;10042:19;821:18412;;;;;;;10042:16;;:19;:::i;:::-;821:18412;;10082:17;;:20;:::i;:::-;821:18412;4910:20;821:18412;-1:-1:-1;;;10022:81:92;;821:18412;;;10071:4;;9598:41;10022:81;;;:::i;9932:63::-;9959:36;9975:17;;;:20;:17;;;:20;:::i;9959:36::-;-1:-1:-1;9932:63:92;;;;9820:41;;;;4801:40;9820:41;;;;;;;;;821:18412;9820:41;;;:::i;:::-;;;821:18412;;;;;9820:41;;;;;;;-1:-1:-1;9820:41:92;;8544:1067:51;;;;;;;;;;;9598:41:92;;;4801:40;9598:41;;;;;;;;;821:18412;9598:41;;;:::i;:::-;;;821:18412;;;;;9598:41;;;;;;-1:-1:-1;9598:41:92;;9481:27;-1:-1:-1;;10321:19:92;;;;-1:-1:-1;;;10210:17:92;;;;-1:-1:-1;9481:27:92;;10236:3;10210:17;;821:18412;;10206:28;;;;;-1:-1:-1;;;;;821:18412:92;10267:20;;821:18412;;10267:20;:::i;:::-;821:18412;;10321:22;:19;;;:22;:::i;:::-;821:18412;10259:85;;;;;;4910:20;821:18412;-1:-1:-1;;;10259:85:92;;10310:4;9598:41;10259:85;;821:18412;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;-1:-1:-1;;821:18412:92;;;;;;-1:-1:-1;;10259:85:92;;;;;;10236:3;-1:-1:-1;10255:283:92;;821:18412;;;;10500:22;821:18412;10459:20;10438:85;821:18412;;;;;;10459:17;;:20;:::i;10500:22::-;821:18412;4910:20;821:18412;-1:-1:-1;;;10438:85:92;;821:18412;;;10310:4;;9598:41;10438:85;;;:::i;10255:283::-;;;;;821:18412;;;;;10608:20;:17;;;:20;:::i;:::-;821:18412;;4801:40;10638:22;:19;;;:22;:::i;:::-;821:18412;8544:1067:51;4910:20:92;821:18412;;;;;;;;10600:61;;9598:41;10600:61;;821:18412;10600:61;;;;;;;;-1:-1:-1;10600:61:92;;;10255:283;-1:-1:-1;;;;;;821:18412:92;10600:67;10596:198;;821:18412;;10191:13;;;;;;10596:198;821:18412;10694:85;10756:22;821:18412;;10715:20;821:18412;;;;;;;10715:17;;:20;:::i;10600:61::-;;;;4801:40;10600:61;;;;;;;;;4801:40;10600:61;;;:::i;:::-;;;821:18412;;;;;;;;:::i;:::-;10600:61;;;;;;-1:-1:-1;10600:61:92;;10259:85;-1:-1:-1;10259:85:92;;;:::i;:::-;;;;10206:28;;;;;;;;-1:-1:-1;821:18412:92;10887:18;;11047:19;11022:20;;;11047:19;;10863:480;10914:3;10887:18;;821:18412;;10883:29;;;;;-1:-1:-1;;;;;821:18412:92;10946:21;;821:18412;;10946:21;:::i;:::-;821:18412;;11022:23;:20;;;:23;:::i;:::-;821:18412;11047:22;:19;;;:22;:::i;:::-;821:18412;10937:137;;;;;;821:18412;-1:-1:-1;821:18412:92;;;4910:20;821:18412;;;;;;;;;;;10937:137;;10310:4;9598:41;10937:137;;;:::i;:::-;;;;;;;;;10914:3;-1:-1:-1;10933:400:92;;821:18412;;11253:23;821:18412;11278:22;821:18412;11211:21;11168:150;821:18412;;;;;;;11211:18;;:21;:::i;:::-;821:18412;;11253:20;;:23;:::i;:::-;821:18412;11278:19;;:22;:::i;:::-;821:18412;4910:20;821:18412;-1:-1:-1;;;11168:150:92;;-1:-1:-1;;;;;821:18412:92;;;9598:41;11168:150;;821:18412;10310:4;821:18412;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;10933:400;;821:18412;;10868:13;;;10937:137;-1:-1:-1;10937:137:92;;;:::i;:::-;;;;10883:29;;;;;;;;4910:20;821:18412;;;;;:::i;4906:240::-;-1:-1:-1;821:18412:92;;;;;;;;;;4968:49;;;;;;:::i;:::-;;4906:240;5031:105;821:18412;5070:51;;;;-1:-1:-1;5070:51:92;;821:18412;;;;-1:-1:-1;5070:51:92;821:18412;;;;;;;;;;;;;;;:::o;13474:1425::-;13657:19;;;;;;821:18412;13657:19;13686:18;;;;;821:18412;-1:-1:-1;13653:97:92;;821:18412;13810:3;13783:18;;821:18412;13779:29;;;;;13833:19;;-1:-1:-1;;;;;821:18412:92;13833:22;;:19;;:22;:::i;:::-;821:18412;;;;;;;13859:21;:18;;;:21;:::i;:::-;821:18412;;13833:47;;;:99;;;13810:3;13829:150;;821:18412;;13764:13;;13829:150;13952:12;;;;;821:18412;13952:12;:::o;13833:99::-;13884:20;:23;:20;;;;;:23;:::i;:::-;821:18412;13910:22;:19;13884:20;13910:19;;;:22;:::i;:::-;821:18412;-1:-1:-1;13833:99:92;;13779:29;;;;;14028:20;;;;;;821:18412;14028:20;14058:19;;;;;821:18412;-1:-1:-1;14024:99:92;;821:18412;14184:3;14156:19;;821:18412;14152:30;;;;;14224:20;;-1:-1:-1;;;;;821:18412:92;14224:23;;:20;;:23;:::i;:::-;821:18412;;;;;;;14251:22;:19;;;:22;:::i;:::-;821:18412;;14224:49;;;:126;;;14184:3;14203:174;;821:18412;;14137:13;;14224:126;14297:22;:25;:22;;;;;:25;:::i;:::-;821:18412;14326:24;:21;14297:22;14326:21;;;:24;:::i;:::-;821:18412;14297:53;;14224:126;;14152:30;;;;;14428:21;;;;;;821:18412;14459:20;14428:21;14459:20;;;;;821:18412;-1:-1:-1;14424:101:92;;821:18412;14587:3;14558:20;;821:18412;14554:31;;;;;14627:21;;-1:-1:-1;;;;;821:18412:92;14627:24;;:21;;:24;:::i;:::-;821:18412;;;;;;;14655:23;:20;;;:23;:::i;:::-;821:18412;;14627:51;;;:130;;;14587:3;14627:206;;;;14587:3;14606:254;;821:18412;;14539:13;;14627:206;14781:22;:25;:22;;;;;:25;:::i;:::-;821:18412;14809:24;:21;14781:22;14809:21;;;:24;:::i;:::-;821:18412;-1:-1:-1;14627:206:92;;:130;14702:23;:26;:23;;;;;:26;:::i;:::-;821:18412;14732:25;:22;14702:23;14732:22;;;:25;:::i;:::-;821:18412;14702:55;;14627:130;;14554:31;;;;;;821:18412;13474:1425;:::o;14424:101::-;14502:12;;;;821:18412;14502:12;:::o;821:18412::-;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;821:18412:92;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;821:18412:92;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
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
          "start": 14604,
          "length": 32
        }
      ],
      "56065": [
        {
          "start": 5392,
          "length": 32
        }
      ],
      "56068": [
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
          "start": 6377,
          "length": 32
        },
        {
          "start": 9789,
          "length": 32
        },
        {
          "start": 10939,
          "length": 32
        },
        {
          "start": 14352,
          "length": 32
        }
      ],
      "56070": [
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
          "start": 9629,
          "length": 32
        },
        {
          "start": 10316,
          "length": 32
        },
        {
          "start": 14179,
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
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ArrayLengthMismatch\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC20TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC721TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\"}],\"name\":\"IncorrectPayment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidSchema\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"provided\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"max\",\"type\":\"uint256\"}],\"name\":\"TooManyBundleItems\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailedOnRelease\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC20TransferFailedOnRelease\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC721TransferFailedOnRelease\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailedOnRelease\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"MAX_BUNDLE_ITEMS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrowRaw\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"extractArbiterAndDemand\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"nativeAmount\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"erc20Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc20Amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc721Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc721TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"address[]\",\"name\":\"erc1155Tokens\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155TokenIds\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"erc1155Amounts\",\"type\":\"uint256[]\"}],\"internalType\":\"struct TokenBundleEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"unsafePartiallyCollectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"unsafePartiallyReclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"},\"unsafePartiallyCollectEscrow(bytes32,bytes32)\":{\"details\":\"Use only as a last resort when some tokens in the bundle cannot be collected. Failed transfers emit events but do not revert. The escrow will be marked as collected even if some tokens remain stuck. This can result in permanent loss of stuck tokens.\"},\"unsafePartiallyReclaimExpired(bytes32)\":{\"details\":\"Use only as a last resort when some tokens in the bundle cannot be reclaimed. Failed transfers emit events but do not revert. The escrow will be marked as reclaimed even if some tokens remain stuck. This can result in permanent loss of stuck tokens.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"unsafePartiallyCollectEscrow(bytes32,bytes32)\":{\"notice\":\"Unsafe partial escrow collection - continues on individual transfer failures\"},\"unsafePartiallyReclaimExpired(bytes32)\":{\"notice\":\"Unsafe partial reclaim - continues on individual transfer failures\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol\":\"TokenBundleEscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0xd5ea07362ab630a6a3dee4285a74cf2377044ca2e4be472755ad64d7c5d4b69d\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da5e832b40fc5c3145d3781e2e5fa60ac2052c9d08af7e300dc8ab80c4343100\",\"dweb:/ipfs/QmTzf7N5ZUdh5raqtzbM11yexiUoLC9z3Ws632MCuycq1d\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0x0afcb7e740d1537b252cb2676f600465ce6938398569f09ba1b9ca240dde2dfc\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1c299900ac4ec268d4570ecef0d697a3013cd11a6eb74e295ee3fbc945056037\",\"dweb:/ipfs/Qmab9owJoxcA7vJT5XNayCMaUR1qxqj1NDzzisduwaJMcZ\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0x1a6221315ce0307746c2c4827c125d821ee796c74a676787762f4778671d4f44\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1bb2332a7ee26dd0b0de9b7fe266749f54820c99ab6a3bcb6f7e6b751d47ee2d\",\"dweb:/ipfs/QmcRWpaBeCYkhy68PR3B4AgD7asuQk7PwkWxrvJbZcikLF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xf189f9b417fe1931e1ab706838aff1128528694a9fcdb5ff7665197f2ca57d09\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2ff0143c836c8c9f85d13708733c09e21251395847fccfb518bf3b556726a840\",\"dweb:/ipfs/QmP69sjjrQrhYAsvCSSB69Bx66SiUPdQUqdzMYnf4wANHm\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x6ec6d7fce29668ede560c7d2e10f9d10de3473f5298e431e70a5767db42fa620\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ac0139e51874aeec0730d040e57993187541777eb01d5939c06d5d2b986a54e8\",\"dweb:/ipfs/QmZbMbdPzusXuX9FGkyArV8hgzKLBZaL5RzMtCdCawtwPF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol\":{\"keccak256\":\"0x8727aacfc1f069266528eef6380f351d4d4d907b56715e799e0a6bc2d1362db7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://aa0dcc5e88b91ae16e4d08c3e43af2e9cacfc98bdd9b4eb015f8b022a8efca5c\",\"dweb:/ipfs/QmS5NxwRNqCsc6Te4a18nKU51tCh8RjkF4ATJvZms48Y4X\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0x74ed01eb66b923d0d0cfe3be84604ac04b76482a55f9dd655e1ef4d367f95bc2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5282825a626cfe924e504274b864a652b0023591fa66f06a067b25b51ba9b303\",\"dweb:/ipfs/QmeCfPykghhMc81VJTrHTC7sF6CRvaA1FXVq2pJhwYp1dV\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x304d732678032a9781ae85c8f204c8fba3d3a5e31c02616964e75cfdc5049098\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://299ced486011781dc98f638059678323c03079fefae1482abaa2135b22fa92d0\",\"dweb:/ipfs/QmbZNbcPTBxNvwChavN2kkZZs7xHhYL7mv51KrxMhsMs3j\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xf78f05f3b8c9f75570e85300d7b4600d7f6f6a198449273f31d44c1641adb46f\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://e28b872613b45e0e801d4995aa4380be2531147bfe2d85c1d6275f1de514fba3\",\"dweb:/ipfs/QmeeFcfShHYaS3BdgVj78nxR28ZaVUwbvr66ud8bT6kzw9\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377\",\"dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0xb600ec42b766fee45645fd148a2154d63cb964859545cf973277721db472edab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://98dd51bad2ef82faf14593c8d5cb8c2834fba287dea5c5bbb6e6107640e29e7f\",\"dweb:/ipfs/QmaCk9ghcsnzpHKVPdbuj83VC92YXGkRrV7xjHWya4r6Qo\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0x3e40df04ff74ee8bcd3c54d002d72a89c4427951a9eb15c3f5264e09ff1a77dd\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f0b8baf77418d0f7f63817f9207a4e596d947cddb9c48b28ae4a3f9a4b4f3e0e\",\"dweb:/ipfs/QmQNe2y4KWAYVhGoreS5Ke4z8joHYKxfE2iV6njeKeCmxL\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xe27fdb0826bbaf3ba2b553859e500bc065a3ce4d5ad32cfa3fdc8878b6dfcae9\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://437e871a4477e0c9b0d4300f52e45c4f3f9c72a8c30cebee983c6fa6ab570727\",\"dweb:/ipfs/QmXFx9BnkRjiMvSSRc9CqQZzR5fMjzyq2ze7fQXitBecT5\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol\":{\"keccak256\":\"0xba8e8a24d2501439a4ecc7f22e5ea04bba435a8e29d07de57db28b74692917c8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://03d23fb8804d977c2b28c4539647049fe471cbfaab420d32a165f9eea030ece1\",\"dweb:/ipfs/QmWGJwGeogNw1Wxc9Q4ooTgU472mghFVhZbLKnX7PDXqw4\"]}},\"version\":1}",
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
          "inputs": [],
          "type": "error",
          "name": "InvalidSchema"
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
        "src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol": "TokenBundleEscrowObligation"
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
        "keccak256": "0x3e40df04ff74ee8bcd3c54d002d72a89c4427951a9eb15c3f5264e09ff1a77dd",
        "urls": [
          "bzz-raw://f0b8baf77418d0f7f63817f9207a4e596d947cddb9c48b28ae4a3f9a4b4f3e0e",
          "dweb:/ipfs/QmQNe2y4KWAYVhGoreS5Ke4z8joHYKxfE2iV6njeKeCmxL"
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
      "src/obligations/escrow/non-tierable/TokenBundleEscrowObligation.sol": {
        "keccak256": "0xba8e8a24d2501439a4ecc7f22e5ea04bba435a8e29d07de57db28b74692917c8",
        "urls": [
          "bzz-raw://03d23fb8804d977c2b28c4539647049fe471cbfaab420d32a165f9eea030ece1",
          "dweb:/ipfs/QmWGJwGeogNw1Wxc9Q4ooTgU472mghFVhZbLKnX7PDXqw4"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 92
} as const;
