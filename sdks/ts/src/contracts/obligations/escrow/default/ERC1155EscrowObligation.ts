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
          "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
              "name": "token",
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
          "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
              "name": "token",
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
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "doObligationFor",
      "inputs": [
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
              "name": "token",
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
      "stateMutability": "nonpayable"
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
          "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
              "name": "token",
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
      "type": "error",
      "name": "AccessDenied",
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
      "name": "UnauthorizedCall",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x61016080604052346101d15760408161282c803803809161002082856101d5565b8339810103126101d1578051906001600160a01b038216908183036101d157602001516001600160a01b03811691908281036101d157604051916100656080846101d5565b604d83527f6164647265737320617262697465722c2062797465732064656d616e642c206160208401527f64647265737320746f6b656e2c2075696e7432353620746f6b656e49642c207560408401526c1a5b9d0c8d4d88185b5bdd5b9d609a1b60608401526001608052600360a0525f60c052156101c257836100f59460e052610120526101005230916102f0565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f005560405161236090816104cc823960805181610ea8015260a05181610ed3015260c05181610efe015260e05181611d5801526101005181610d1f0152610120518181816104e7015281816108d201528181610b92015281816116a601528181611cce01526121b10152610140518181816105270152818161082501528181610b4301528181610ced01528181610e660152818161153e015281816118e401526121040152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b038211908210176101f857604052565b634e487b7160e01b5f52604160045260245ffd5b6020818303126101d1578051906001600160401b0382116101d15701906080828203126101d15760405191608083016001600160401b038111848210176101f8576040528051835260208101516001600160a01b03811681036101d1576020840152604081015180151581036101d15760408401526060810151906001600160401b0382116101d1570181601f820112156101d1578051906001600160401b0382116101f857604051926102ca601f8401601f1916602001856101d5565b828452602083830101116101d157815f9260208093018386015e83010152606082015290565b9291604051906020820183519261033a6015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a198101845201826101d5565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa801561044b5787915f916104b1575b5051146104ab579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610477575b5061045657505f602491604051928380926351753e3760e11b82528760048301525afa801561044b5783915f91610429575b5051146104275750639e6113d560e01b5f5260045260245ffd5b565b61044591503d805f833e61043d81836101d5565b81019061020c565b5f61040d565b6040513d5f823e3d90fd5b91928091508203610465575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d6020116104a3575b81610493602093836101d5565b810103126101d15751905f6103db565b3d9150610486565b50505050565b6104c591503d805f833e61043d81836101d5565b5f61037556fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610f94575080632c713cd914610f7757806354fd4d5014610e895780635bf2f20d14610e4f5780636b122fe014610cae5780637d2c293114610b145780638371ef5914610ab557806388e5b2d914610a67578063891d9ea814610a8657806391db0b7e14610a67578063b3b902d414610648578063bc197c81146105b2578063c6ec5070146104a6578063c93844be146103c9578063ce46e046146103ad578063cecf1aff14610340578063e49617e114610325578063e60c350514610325578063e6c9714d146101fe578063f23a6e61146101a85763f23be17b0361000f57346101a15760603660031901126101a1576004356001600160401b0381116101a45760a060031982360301126101a4576101506111fa565b604435929091906001600160a01b03841684036101a157602061019985856101866101948760405192839160040188830161183b565b03601f1981018352826110bd565b611f60565b604051908152f35b80fd5b5080fd5b50346101a15760a03660031901126101a1576101c2611224565b506101cb61123a565b506084356001600160401b0381116101a4576101eb90369060040161112f565b5060405163f23a6e6160e01b8152602090f35b50346101a15760603660031901126101a157600435906001600160401b0382116101a15761014060031983360301126101a1576040519161023e83611086565b806004013583526024810135602084015261025b60448201611210565b604084015261026c60648201611210565b606084015261027d60848201611210565b608084015260a481013560a084015261029860c48201611250565b60c08401526102a960e48201611250565b60e08401526101048101358015158103610321576101008401526101248101356001600160401b038111610321576102e69136910160040161112f565b610120830152602435906001600160401b0382116101a157602061031784610311366004870161112f565b906118dd565b6040519015158152f35b8280fd5b60206103176103333661131d565b61033b611d56565b611d97565b50346101a15760403660031901126101a157600435906001600160401b0382116101a15760a060031983360301126101a1576020610199610398846103a66103866111fa565b9160405193849160040187830161183b565b03601f1981018452836110bd565b3391611f60565b50346101a157806003193601126101a157602090604051908152f35b50346101a15760203660031901126101a1576004356001600160401b0381116101a4576103fa9036906004016111cd565b610405929192611810565b508201916020818403126101a4578035906001600160401b03821161032157019160a0838203126101a4576040519161043d8361106b565b61044684611250565b83526020840135906001600160401b0382116101a157509261046f6080926104a295830161112f565b602084015261048060408201611250565b60408401526060810135606084015201356080820152604051918291826112cb565b0390f35b50346101a15760203660031901126101a1576104c0611810565b506104c9611b6f565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156105a5578192610581575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610572576104a2610566610120840151602080825183010191016113c2565b604051918291826112cb565b635527981560e11b8152600490fd5b61059e9192503d8084833e61059681836110bd565b810190611bcd565b905f61051f565b50604051903d90823e3d90fd5b50346101a15760a03660031901126101a1576105cc611224565b506105d561123a565b506044356001600160401b0381116101a4576105f5903690600401611264565b506064356001600160401b0381116101a457610615903690600401611264565b506084356001600160401b0381116101a45761063590369060040161112f565b5060405163bc197c8160e01b8152602090f35b5060603660031901126101a1576004356001600160401b0381116101a4576106776106899136906004016111cd565b91906106816111fa565b9236916110f9565b610691611b37565b6106a460208251830101602083016113c2565b604081810180516060840180519351627eeac760e11b815230600482015260248101949094529395939491939290602090829060449082906001600160a01b03165afa908115610a5c578791610a2a575b5060018060a01b0384511687608087519801978851833b156103215761073693839283604051809781958294637921219560e11b8452303360048601611e22565b03925af19182610a11575b505061077e57505090519151925160405163334a7d1b60e21b815293849361077a9350309033906001600160a01b031660048701611e5a565b0390fd5b83518551604051627eeac760e11b8152306004820152602481019190915288958893889391929091602090829060449082906001600160a01b03165afa908115610a065788916109d0575b50845182018092116109bc571061098b575050506001600160401b03604051926107f2846110a2565b33845216602083015260016040830152604435606083015260808201528160a0820152602060405161082381611050565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06108c4608083015160c060e4860152610124850190610ffd565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190811561098057829161094d575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f51602061230b5f395f51905f5255604051908152f35b90506020813d602011610978575b81610968602093836110bd565b810103126101a45751602061090a565b3d915061095b565b6040513d84823e3d90fd5b519051915160405163334a7d1b60e21b815292839261077a929190309033906001600160a01b031660048701611e5a565b634e487b7160e01b88526011600452602488fd5b90506020813d6020116109fe575b816109eb602093836110bd565b810103126109fa5751886107c9565b5f80fd5b3d91506109de565b6040513d8a823e3d90fd5b81610a1b916110bd565b610a2657875f610741565b8780fd5b90506020813d602011610a54575b81610a45602093836110bd565b810103126109fa57515f6106f5565b3d9150610a38565b6040513d89823e3d90fd5b6020610317610a753661117d565b92610a81929192611d56565b611475565b50346101a1576104a2610aa1610a9b36610fe7565b90611519565b604051918291602083526020830190610ffd565b50346101a15760203660031901126101a157600435906001600160401b0382116101a157610aee610ae9366004850161112f565b61144c565b604080516001600160a01b0390931683526020830181905282916104a291830190610ffd565b50346109fa5760203660031901126109fa5760043590610b32611b37565b610b3b82611ca8565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610c9f57606084016001600160401b0381511615610c9057516001600160401b03164210610c90576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610bc481611050565b8381525f602082015260405192610bda84611050565b83526020830152803b156109fa57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610c7b575b50610c3e5763614cf93960e01b825260045260249150fd5b61012083015160c0840151610c5e916001600160a01b0390911690611e8d565b5060015f51602061230b5f395f51905f5255602060405160018152f35b610c889193505f906110bd565b5f915f610c26565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b346109fa575f3660031901126109fa57606080604051610ccd81611021565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610e44575f90610d94575b6060906104a2604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610ffd565b503d805f833e610da481836110bd565b8101906020818303126109fa578051906001600160401b0382116109fa57016080818303126109fa5760405190610dda82611021565b8051825260208101516001600160a01b03811681036109fa576020830152610e0460408201611351565b60408301526060810151906001600160401b0382116109fa570182601f820112156109fa57606092816020610e3b9351910161135e565b82820152610d4e565b6040513d5f823e3d90fd5b346109fa575f3660031901126109fa5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346109fa575f3660031901126109fa576104a26020610aa16001610ecc7f00000000000000000000000000000000000000000000000000000000000000006119ca565b8184610ef77f00000000000000000000000000000000000000000000000000000000000000006119ca565b8180610f227f00000000000000000000000000000000000000000000000000000000000000006119ca565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f1981018352826110bd565b346109fa57610f88610a9b36610fe7565b50602060405160018152f35b346109fa5760203660031901126109fa576004359063ffffffff60e01b82168092036109fa57602091630271189760e51b8114908115610fd6575b5015158152f35b6301ffc9a760e01b14905083610fcf565b60409060031901126109fa576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b0382111761103c57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761103c57604052565b60a081019081106001600160401b0382111761103c57604052565b61014081019081106001600160401b0382111761103c57604052565b60c081019081106001600160401b0382111761103c57604052565b90601f801991011681019081106001600160401b0382111761103c57604052565b6001600160401b03811161103c57601f01601f191660200190565b929192611105826110de565b9161111360405193846110bd565b8294818452818301116109fa578281602093845f960137010152565b9080601f830112156109fa5781602061114a933591016110f9565b90565b9181601f840112156109fa578235916001600160401b0383116109fa576020808501948460051b0101116109fa57565b60406003198201126109fa576004356001600160401b0381116109fa57816111a79160040161114d565b92909291602435906001600160401b0382116109fa576111c99160040161114d565b9091565b9181601f840112156109fa578235916001600160401b0383116109fa57602083818601950101116109fa57565b602435906001600160401b03821682036109fa57565b35906001600160401b03821682036109fa57565b600435906001600160a01b03821682036109fa57565b602435906001600160a01b03821682036109fa57565b35906001600160a01b03821682036109fa57565b9080601f830112156109fa578135916001600160401b03831161103c578260051b906040519361129760208401866110bd565b84526020808501928201019283116109fa57602001905b8282106112bb5750505090565b81358152602091820191016112ae565b6020815260018060a01b03825116602082015260a060806112fa602085015183604086015260c0850190610ffd565b93600180841b036040820151166060850152606081015182850152015191015290565b60206003198201126109fa57600435906001600160401b0382116109fa576101409082900360031901126109fa5760040190565b519081151582036109fa57565b92919261136a826110de565b9161137860405193846110bd565b8294818452818301116109fa578281602093845f96015e010152565b51906001600160a01b03821682036109fa57565b9080601f830112156109fa57815161114a9260200161135e565b6020818303126109fa578051906001600160401b0382116109fa57019060a0828203126109fa57604051916113f68361106b565b6113ff81611394565b835260208101516001600160401b0381116109fa576080926114229183016113a8565b602084015261143360408201611394565b6040840152606081015160608401520151608082015290565b61145f90602080825183010191016113c2565b80516020909101516001600160a01b0390911691565b92909281840361150a575f91345b858410156114ff57818410156114eb578360051b80860135908282116114dc5784013561013e19853603018112156109fa576114c0908501611d97565b156114d15760019103930192611483565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b611521611b37565b5f9161152c82611ca8565b9061153681611ca8565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103610c9f5761156d82611db0565b15610c9f57610120820191611582835161144c565b60a087019182518451036117c75761159988611db0565b156117c7578760209360c093611678610120975191611666604051998a988997889763e6c9714d60e01b8952606060048a0152815160648a01528c82015160848a01526001600160401b0360408301511660a48a01526001600160401b0360608301511660c48a01526001600160401b0360808301511660e48a015251610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610ffd565b84810360031901602486015290610ffd565b604483019190915203916001600160a01b03165afa908115610e44575f916117d6575b50156117c7576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906116d881611050565b8681525f6020820152604051926116ee84611050565b83526020830152803b156109fa57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816117b2575b506117535763614cf93960e01b85526004849052602485fd5b51825192949391927ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c091611790916001600160a01b031690611e8d565b94516001600160a01b03169380a49060015f51602061230b5f395f51905f5255565b6117bf9196505f906110bd565b5f945f61173a565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611808575b816117f1602093836110bd565b810103126109fa5761180290611351565b5f61169b565b3d91506117e4565b6040519061181d8261106b565b5f608083828152606060208201528260408201528260608201520152565b602081526001600160a01b0361185083611250565b1660208201526020820135601e19833603018112156109fa5782016020813591016001600160401b0382116109fa5781360381136109fa5760e0938260809260a060408701528160c0870152868601375f8484018601526001600160a01b036118bb60408301611250565b166060850152606081013582850152013560a0830152601f8019910116010190565b60208101517f0000000000000000000000000000000000000000000000000000000000000000036119c457611923610120611933920151602080825183010191016113c2565b91602080825183010191016113c2565b604082810151908201516001600160a01b0390811691161491826119b1575b8261199d575b82611984575b8261196857505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061195e565b915060808201516080820151111591611958565b9150606082015160608201511491611952565b50505f90565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b14575b806d04ee2d6d415b85acef8100000000600a921015611af9575b662386f26fc10000811015611ae5575b6305f5e100811015611ad4575b612710811015611ac5575b6064811015611ab7575b1015611aac575b600a60216001840193611a51856110de565b94611a5f60405196876110bd565b808652611a6e601f19916110de565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611aa757600a9091611a79565b505090565b600190910190611a3f565b606460029104930192611a38565b61271060049104930192611a2e565b6305f5e10060089104930192611a23565b662386f26fc1000060109104930192611a16565b6d04ee2d6d415b85acef810000000060209104930192611a06565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046119ec565b60025f51602061230b5f395f51905f525414611b605760025f51602061230b5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611b7c82611086565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b03821682036109fa57565b6020818303126109fa578051906001600160401b0382116109fa5701610140818303126109fa5760405191611c0183611086565b8151835260208201516020840152611c1b60408301611bb9565b6040840152611c2c60608301611bb9565b6060840152611c3d60808301611bb9565b608084015260a082015160a0840152611c5860c08301611394565b60c0840152611c6960e08301611394565b60e0840152611c7b6101008301611351565b6101008401526101208201516001600160401b0381116109fa57611c9f92016113a8565b61012082015290565b90611cb1611b6f565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610e44575f93611d3a575b508251818115918215611d2f575b5050611d1d5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611d14565b611d4f9193503d805f833e61059681836110bd565b915f611d06565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611d8857565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036109fa57301490565b805115611e13576001600160401b036060820151168015159081611e08575b50611df957608001516001600160401b0316611dea57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611dcf565b635c2c7f8960e01b5f5260045ffd5b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b611ea390929192602080825183010191016113c2565b604081018051925f9360018060a01b0316936060840194608086519501948551823b156109fa57611ef0925f92838b60405196879586948593637921219560e11b85523060048601611e22565b03925af19081611f4b575b50611f31575050519151905160405163334a7d1b60e21b815293849361077a93919030906001600160a01b031660048701611e5a565b93509350505060405190611f466020836110bd565b815290565b611f589192505f906110bd565b5f905f611efb565b9190925f91611f6d611b37565b611f8060208551860101602086016113c2565b604081810180516060840180519351627eeac760e11b815230600482015260248101949094529398939791969290602090829060449082906001600160a01b03165afa908115610e44575f916122d8575b5060018060a01b03875116608089519a01998a51823b156109fa57612011925f9283604051809681958294637921219560e11b8452303360048601611e22565b03925af190816122c3575b5061205257865188518a5160405163334a7d1b60e21b815292839261077a9291309033906001600160a01b031660048701611e5a565b86518851604051627eeac760e11b815230600482015260248101919091529699959894979396929594939290602090829060449082906001600160a01b03165afa908115610a5c578791612291575b508451820180921161227d571061098b575050506001600160401b03604051946120ca866110a2565b60018060a01b0316938486521660208501526001604085015281606085015260808401528060a0840152602060405161210281611050565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06121a3608083015160c060e4860152610124850190610ffd565b9101516101048301520381847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19283156105a5578193612223575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06818492a39060015f51602061230b5f395f51905f5255565b909392506020813d602011612275575b81612240602093836110bd565b81010312612271575191927f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d066121e9565b8380fd5b3d9150612233565b634e487b7160e01b87526011600452602487fd5b90506020813d6020116122bb575b816122ac602093836110bd565b810103126109fa57515f6120a1565b3d915061229f565b6122d09194505f906110bd565b5f925f61201c565b90506020813d602011612302575b816122f3602093836110bd565b810103126109fa57515f611fd1565b3d91506122e656fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220817db5740919d6552589758dbcbd9bde7083726fc6c0424fd036e8d565cf87f864736f6c634300081b0033",
    "sourceMap": "551:4584:95:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;;;551:4584:95;;;;1144:4;551:4584;759:14:6;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;790:10;1066:81:82;790:10:9;;;971::82;;991:32;;1129:4;1066:81;;:::i;:::-;1033:114;;1144:4:95;1505:66:67;2365:1;551:4584:95;;;;;;;;;;;;;;783:14:6;551:4584:95;;;;;807:14:6;551:4584:95;;;;;790:10:9;551:4584:95;;;;;991:32:82;551:4584:95;;;;;971:10:82;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1033:114:82;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;551:4584:95;-1:-1:-1;551:4584:95;;;;;;;-1:-1:-1;;551:4584:95;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;551:4584:95;;;;;-1:-1:-1;551:4584:95;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;551:4584:95;;;;;;;;;;;;;;;;;;:::o;289:755:86:-;;;551:4584:95;;1189:45:86;;;;551:4584:95;;;1189:45:86;551:4584:95;1189:45:86;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:86;;;;;;;;;;;:::i;:::-;551:4584:95;1179:56:86;;551:4584:95;;-1:-1:-1;;;572:29:86;;;;;551:4584:95;;;1179:56:86;;-1:-1:-1;;;;;551:4584:95;;;-1:-1:-1;551:4584:95;572:29:86;551:4584:95;;572:29:86;;;;;;;;-1:-1:-1;572:29:86;;;289:755;551:4584:95;;615:19:86;611:35;;551:4584:95;;1189:45:86;551:4584:95;;;;;;;;;;;661:52:86;;551:4584:95;572:29:86;661:52;;551:4584:95;;;;;;;;;;;;;-1:-1:-1;551:4584:95;;;;;;;;;;;;572:29:86;551:4584:95;;;1144:4;551:4584;;;;;;;;;;;;661:52:86;;;-1:-1:-1;661:52:86;;;-1:-1:-1;;661:52:86;;;289:755;-1:-1:-1;657:381:86;;551:4584:95;-1:-1:-1;572:29:86;551:4584:95;;;;;;;;;;899:29:86;;;572;899;;551:4584:95;899:29:86;;;;;;;;-1:-1:-1;899:29:86;;;657:381;551:4584:95;;946:19:86;942:35;;793:29;;;;-1:-1:-1;998:29:86;572;551:4584:95;572:29:86;-1:-1:-1;998:29:86;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:86;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;551:4584:95;;;-1:-1:-1;551:4584:95;;;;;657:381:86;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:86;572;551:4584:95;572:29:86;-1:-1:-1;793:29:86;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;551:4584:95;;;;;661:52:86;;;;;;;-1:-1:-1;661:52:86;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:86;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610f94575080632c713cd914610f7757806354fd4d5014610e895780635bf2f20d14610e4f5780636b122fe014610cae5780637d2c293114610b145780638371ef5914610ab557806388e5b2d914610a67578063891d9ea814610a8657806391db0b7e14610a67578063b3b902d414610648578063bc197c81146105b2578063c6ec5070146104a6578063c93844be146103c9578063ce46e046146103ad578063cecf1aff14610340578063e49617e114610325578063e60c350514610325578063e6c9714d146101fe578063f23a6e61146101a85763f23be17b0361000f57346101a15760603660031901126101a1576004356001600160401b0381116101a45760a060031982360301126101a4576101506111fa565b604435929091906001600160a01b03841684036101a157602061019985856101866101948760405192839160040188830161183b565b03601f1981018352826110bd565b611f60565b604051908152f35b80fd5b5080fd5b50346101a15760a03660031901126101a1576101c2611224565b506101cb61123a565b506084356001600160401b0381116101a4576101eb90369060040161112f565b5060405163f23a6e6160e01b8152602090f35b50346101a15760603660031901126101a157600435906001600160401b0382116101a15761014060031983360301126101a1576040519161023e83611086565b806004013583526024810135602084015261025b60448201611210565b604084015261026c60648201611210565b606084015261027d60848201611210565b608084015260a481013560a084015261029860c48201611250565b60c08401526102a960e48201611250565b60e08401526101048101358015158103610321576101008401526101248101356001600160401b038111610321576102e69136910160040161112f565b610120830152602435906001600160401b0382116101a157602061031784610311366004870161112f565b906118dd565b6040519015158152f35b8280fd5b60206103176103333661131d565b61033b611d56565b611d97565b50346101a15760403660031901126101a157600435906001600160401b0382116101a15760a060031983360301126101a1576020610199610398846103a66103866111fa565b9160405193849160040187830161183b565b03601f1981018452836110bd565b3391611f60565b50346101a157806003193601126101a157602090604051908152f35b50346101a15760203660031901126101a1576004356001600160401b0381116101a4576103fa9036906004016111cd565b610405929192611810565b508201916020818403126101a4578035906001600160401b03821161032157019160a0838203126101a4576040519161043d8361106b565b61044684611250565b83526020840135906001600160401b0382116101a157509261046f6080926104a295830161112f565b602084015261048060408201611250565b60408401526060810135606084015201356080820152604051918291826112cb565b0390f35b50346101a15760203660031901126101a1576104c0611810565b506104c9611b6f565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156105a5578192610581575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610572576104a2610566610120840151602080825183010191016113c2565b604051918291826112cb565b635527981560e11b8152600490fd5b61059e9192503d8084833e61059681836110bd565b810190611bcd565b905f61051f565b50604051903d90823e3d90fd5b50346101a15760a03660031901126101a1576105cc611224565b506105d561123a565b506044356001600160401b0381116101a4576105f5903690600401611264565b506064356001600160401b0381116101a457610615903690600401611264565b506084356001600160401b0381116101a45761063590369060040161112f565b5060405163bc197c8160e01b8152602090f35b5060603660031901126101a1576004356001600160401b0381116101a4576106776106899136906004016111cd565b91906106816111fa565b9236916110f9565b610691611b37565b6106a460208251830101602083016113c2565b604081810180516060840180519351627eeac760e11b815230600482015260248101949094529395939491939290602090829060449082906001600160a01b03165afa908115610a5c578791610a2a575b5060018060a01b0384511687608087519801978851833b156103215761073693839283604051809781958294637921219560e11b8452303360048601611e22565b03925af19182610a11575b505061077e57505090519151925160405163334a7d1b60e21b815293849361077a9350309033906001600160a01b031660048701611e5a565b0390fd5b83518551604051627eeac760e11b8152306004820152602481019190915288958893889391929091602090829060449082906001600160a01b03165afa908115610a065788916109d0575b50845182018092116109bc571061098b575050506001600160401b03604051926107f2846110a2565b33845216602083015260016040830152604435606083015260808201528160a0820152602060405161082381611050565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06108c4608083015160c060e4860152610124850190610ffd565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190811561098057829161094d575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f51602061230b5f395f51905f5255604051908152f35b90506020813d602011610978575b81610968602093836110bd565b810103126101a45751602061090a565b3d915061095b565b6040513d84823e3d90fd5b519051915160405163334a7d1b60e21b815292839261077a929190309033906001600160a01b031660048701611e5a565b634e487b7160e01b88526011600452602488fd5b90506020813d6020116109fe575b816109eb602093836110bd565b810103126109fa5751886107c9565b5f80fd5b3d91506109de565b6040513d8a823e3d90fd5b81610a1b916110bd565b610a2657875f610741565b8780fd5b90506020813d602011610a54575b81610a45602093836110bd565b810103126109fa57515f6106f5565b3d9150610a38565b6040513d89823e3d90fd5b6020610317610a753661117d565b92610a81929192611d56565b611475565b50346101a1576104a2610aa1610a9b36610fe7565b90611519565b604051918291602083526020830190610ffd565b50346101a15760203660031901126101a157600435906001600160401b0382116101a157610aee610ae9366004850161112f565b61144c565b604080516001600160a01b0390931683526020830181905282916104a291830190610ffd565b50346109fa5760203660031901126109fa5760043590610b32611b37565b610b3b82611ca8565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610c9f57606084016001600160401b0381511615610c9057516001600160401b03164210610c90576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610bc481611050565b8381525f602082015260405192610bda84611050565b83526020830152803b156109fa57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610c7b575b50610c3e5763614cf93960e01b825260045260249150fd5b61012083015160c0840151610c5e916001600160a01b0390911690611e8d565b5060015f51602061230b5f395f51905f5255602060405160018152f35b610c889193505f906110bd565b5f915f610c26565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b346109fa575f3660031901126109fa57606080604051610ccd81611021565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610e44575f90610d94575b6060906104a2604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610ffd565b503d805f833e610da481836110bd565b8101906020818303126109fa578051906001600160401b0382116109fa57016080818303126109fa5760405190610dda82611021565b8051825260208101516001600160a01b03811681036109fa576020830152610e0460408201611351565b60408301526060810151906001600160401b0382116109fa570182601f820112156109fa57606092816020610e3b9351910161135e565b82820152610d4e565b6040513d5f823e3d90fd5b346109fa575f3660031901126109fa5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346109fa575f3660031901126109fa576104a26020610aa16001610ecc7f00000000000000000000000000000000000000000000000000000000000000006119ca565b8184610ef77f00000000000000000000000000000000000000000000000000000000000000006119ca565b8180610f227f00000000000000000000000000000000000000000000000000000000000000006119ca565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f1981018352826110bd565b346109fa57610f88610a9b36610fe7565b50602060405160018152f35b346109fa5760203660031901126109fa576004359063ffffffff60e01b82168092036109fa57602091630271189760e51b8114908115610fd6575b5015158152f35b6301ffc9a760e01b14905083610fcf565b60409060031901126109fa576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b0382111761103c57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761103c57604052565b60a081019081106001600160401b0382111761103c57604052565b61014081019081106001600160401b0382111761103c57604052565b60c081019081106001600160401b0382111761103c57604052565b90601f801991011681019081106001600160401b0382111761103c57604052565b6001600160401b03811161103c57601f01601f191660200190565b929192611105826110de565b9161111360405193846110bd565b8294818452818301116109fa578281602093845f960137010152565b9080601f830112156109fa5781602061114a933591016110f9565b90565b9181601f840112156109fa578235916001600160401b0383116109fa576020808501948460051b0101116109fa57565b60406003198201126109fa576004356001600160401b0381116109fa57816111a79160040161114d565b92909291602435906001600160401b0382116109fa576111c99160040161114d565b9091565b9181601f840112156109fa578235916001600160401b0383116109fa57602083818601950101116109fa57565b602435906001600160401b03821682036109fa57565b35906001600160401b03821682036109fa57565b600435906001600160a01b03821682036109fa57565b602435906001600160a01b03821682036109fa57565b35906001600160a01b03821682036109fa57565b9080601f830112156109fa578135916001600160401b03831161103c578260051b906040519361129760208401866110bd565b84526020808501928201019283116109fa57602001905b8282106112bb5750505090565b81358152602091820191016112ae565b6020815260018060a01b03825116602082015260a060806112fa602085015183604086015260c0850190610ffd565b93600180841b036040820151166060850152606081015182850152015191015290565b60206003198201126109fa57600435906001600160401b0382116109fa576101409082900360031901126109fa5760040190565b519081151582036109fa57565b92919261136a826110de565b9161137860405193846110bd565b8294818452818301116109fa578281602093845f96015e010152565b51906001600160a01b03821682036109fa57565b9080601f830112156109fa57815161114a9260200161135e565b6020818303126109fa578051906001600160401b0382116109fa57019060a0828203126109fa57604051916113f68361106b565b6113ff81611394565b835260208101516001600160401b0381116109fa576080926114229183016113a8565b602084015261143360408201611394565b6040840152606081015160608401520151608082015290565b61145f90602080825183010191016113c2565b80516020909101516001600160a01b0390911691565b92909281840361150a575f91345b858410156114ff57818410156114eb578360051b80860135908282116114dc5784013561013e19853603018112156109fa576114c0908501611d97565b156114d15760019103930192611483565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b611521611b37565b5f9161152c82611ca8565b9061153681611ca8565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103610c9f5761156d82611db0565b15610c9f57610120820191611582835161144c565b60a087019182518451036117c75761159988611db0565b156117c7578760209360c093611678610120975191611666604051998a988997889763e6c9714d60e01b8952606060048a0152815160648a01528c82015160848a01526001600160401b0360408301511660a48a01526001600160401b0360608301511660c48a01526001600160401b0360808301511660e48a015251610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610ffd565b84810360031901602486015290610ffd565b604483019190915203916001600160a01b03165afa908115610e44575f916117d6575b50156117c7576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906116d881611050565b8681525f6020820152604051926116ee84611050565b83526020830152803b156109fa57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816117b2575b506117535763614cf93960e01b85526004849052602485fd5b51825192949391927ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c091611790916001600160a01b031690611e8d565b94516001600160a01b03169380a49060015f51602061230b5f395f51905f5255565b6117bf9196505f906110bd565b5f945f61173a565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611808575b816117f1602093836110bd565b810103126109fa5761180290611351565b5f61169b565b3d91506117e4565b6040519061181d8261106b565b5f608083828152606060208201528260408201528260608201520152565b602081526001600160a01b0361185083611250565b1660208201526020820135601e19833603018112156109fa5782016020813591016001600160401b0382116109fa5781360381136109fa5760e0938260809260a060408701528160c0870152868601375f8484018601526001600160a01b036118bb60408301611250565b166060850152606081013582850152013560a0830152601f8019910116010190565b60208101517f0000000000000000000000000000000000000000000000000000000000000000036119c457611923610120611933920151602080825183010191016113c2565b91602080825183010191016113c2565b604082810151908201516001600160a01b0390811691161491826119b1575b8261199d575b82611984575b8261196857505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061195e565b915060808201516080820151111591611958565b9150606082015160608201511491611952565b50505f90565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b14575b806d04ee2d6d415b85acef8100000000600a921015611af9575b662386f26fc10000811015611ae5575b6305f5e100811015611ad4575b612710811015611ac5575b6064811015611ab7575b1015611aac575b600a60216001840193611a51856110de565b94611a5f60405196876110bd565b808652611a6e601f19916110de565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611aa757600a9091611a79565b505090565b600190910190611a3f565b606460029104930192611a38565b61271060049104930192611a2e565b6305f5e10060089104930192611a23565b662386f26fc1000060109104930192611a16565b6d04ee2d6d415b85acef810000000060209104930192611a06565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046119ec565b60025f51602061230b5f395f51905f525414611b605760025f51602061230b5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611b7c82611086565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b03821682036109fa57565b6020818303126109fa578051906001600160401b0382116109fa5701610140818303126109fa5760405191611c0183611086565b8151835260208201516020840152611c1b60408301611bb9565b6040840152611c2c60608301611bb9565b6060840152611c3d60808301611bb9565b608084015260a082015160a0840152611c5860c08301611394565b60c0840152611c6960e08301611394565b60e0840152611c7b6101008301611351565b6101008401526101208201516001600160401b0381116109fa57611c9f92016113a8565b61012082015290565b90611cb1611b6f565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610e44575f93611d3a575b508251818115918215611d2f575b5050611d1d5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611d14565b611d4f9193503d805f833e61059681836110bd565b915f611d06565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611d8857565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036109fa57301490565b805115611e13576001600160401b036060820151168015159081611e08575b50611df957608001516001600160401b0316611dea57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611dcf565b635c2c7f8960e01b5f5260045ffd5b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b611ea390929192602080825183010191016113c2565b604081018051925f9360018060a01b0316936060840194608086519501948551823b156109fa57611ef0925f92838b60405196879586948593637921219560e11b85523060048601611e22565b03925af19081611f4b575b50611f31575050519151905160405163334a7d1b60e21b815293849361077a93919030906001600160a01b031660048701611e5a565b93509350505060405190611f466020836110bd565b815290565b611f589192505f906110bd565b5f905f611efb565b9190925f91611f6d611b37565b611f8060208551860101602086016113c2565b604081810180516060840180519351627eeac760e11b815230600482015260248101949094529398939791969290602090829060449082906001600160a01b03165afa908115610e44575f916122d8575b5060018060a01b03875116608089519a01998a51823b156109fa57612011925f9283604051809681958294637921219560e11b8452303360048601611e22565b03925af190816122c3575b5061205257865188518a5160405163334a7d1b60e21b815292839261077a9291309033906001600160a01b031660048701611e5a565b86518851604051627eeac760e11b815230600482015260248101919091529699959894979396929594939290602090829060449082906001600160a01b03165afa908115610a5c578791612291575b508451820180921161227d571061098b575050506001600160401b03604051946120ca866110a2565b60018060a01b0316938486521660208501526001604085015281606085015260808401528060a0840152602060405161210281611050565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06121a3608083015160c060e4860152610124850190610ffd565b9101516101048301520381847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19283156105a5578193612223575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06818492a39060015f51602061230b5f395f51905f5255565b909392506020813d602011612275575b81612240602093836110bd565b81010312612271575191927f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d066121e9565b8380fd5b3d9150612233565b634e487b7160e01b87526011600452602487fd5b90506020813d6020116122bb575b816122ac602093836110bd565b810103126109fa57515f6120a1565b3d915061229f565b6122d09194505f906110bd565b5f925f61201c565b90506020813d602011612302575b816122f3602093836110bd565b810103126109fa57515f611fd1565b3d91506122e656fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220817db5740919d6552589758dbcbd9bde7083726fc6c0424fd036e8d565cf87f864736f6c634300081b0033",
    "sourceMap": "551:4584:95:-:0;;;;;;;;;;-1:-1:-1;551:4584:95;;;;;;;;;1183:12:9;;;1054:5;1183:12;551:4584:95;1054:5:9;1183:12;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;1139:12:84;551:4584:95;;4523:16;;551:4584;;;;;;;;4523:16;;;;:::i;:::-;;1055:104:6;;4523:16:95;;;;;;:::i;:::-;1139:12:84;:::i;:::-;551:4584:95;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;:::i;:::-;-1:-1:-1;551:4584:95;;-1:-1:-1;;;551:4584:95;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;3045:39:9;551:4584:95;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;551:4584:95:-;;;;;;;-1:-1:-1;;551:4584:95;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;1139:12:84;4272:16:95;551:4584;4272:16;551:4584;;:::i;:::-;;;;;;;;;4272:16;;;;:::i;:::-;;1055:104:6;;4272:16:95;;;;;;:::i;:::-;4306:10;1139:12:84;;:::i;551:4584:95:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;5092:34;;551:4584;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;551:4584:95;;-1:-1:-1;;;2619:23:82;;551:4584:95;;;2619:23:82;;;551:4584:95;;;;2619:23:82;551:4584:95;2619:3:82;-1:-1:-1;;;;;551:4584:95;2619:23:82;;;;;;;;;;;551:4584:95;2656:19:82;551:4584:95;2656:19:82;;551:4584:95;2679:18:82;2656:41;2652:87;;551:4584:95;4921:46;4932:16;;;;551:4584;;;;4921:46;;;;;;:::i;:::-;551:4584;;;;;;;:::i;2652:87:82:-;-1:-1:-1;;;2718:21:82;;551:4584:95;;2718:21:82;2619:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;551:4584:95;;;;;;;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;:::i;:::-;-1:-1:-1;551:4584:95;;-1:-1:-1;;;551:4584:95;;;;;;-1:-1:-1;551:4584:95;;-1:-1:-1;;551:4584:95;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;:::i;:::-;2989:103:67;;:::i;:::-;1667:34:95;551:4584;;;1667:34;;;551:4584;1667:34;;;:::i;:::-;551:4584;1786:13;;;551:4584;;;1826:15;;551:4584;;;;-1:-1:-1;;;1777:65:95;;1819:4;551:4584;1777:65;;551:4584;;;;;;;;1786:13;;1826:15;;1786:13;;;551:4584;;;;;;;;;-1:-1:-1;;;;;551:4584:95;1777:65;;;;;;;;;;;551:4584;;;;;;;;;;;1936:14;551:4584;;1936:14;;551:4584;;;1857:98;;;;;;551:4584;;;;;;;;;;;;;;;1857:98;;1819:4;903:10:84;551:4584:95;1857:98;;;:::i;:::-;;;;;;;;;551:4584;-1:-1:-1;;1853:281:95;;-1:-1:-1;;551:4584:95;;;;;;;;-1:-1:-1;;;2033:90:95;;551:4584;;;2033:90;;-1:-1:-1;1819:4:95;;903:10:84;;-1:-1:-1;;;;;551:4584:95;;2033:90;;;:::i;:::-;;;;1853:281;551:4584;;;;;;-1:-1:-1;;;2207:65:95;;1819:4;551:4584;2207:65;;551:4584;;;;;;;;1853:281;;;;551:4584;;;;1853:281;;551:4584;;;;;;;;-1:-1:-1;;;;;551:4584:95;2207:65;;;;;;;;;;;1853:281;551:4584;;;;;;;;;;2335:45;2331:173;;551:4584;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::i;:::-;903:10:84;551:4584:95;;;;2141:299:82;;551:4584:95;2303:4:82;551:4584:95;2141:299:82;;551:4584:95;;;;2141:299:82;;551:4584:95;1936:14;2141:299:82;;551:4584:95;2141:299:82;;;;551:4584:95;;;;;;;:::i;:::-;2095:18:82;551:4584:95;;2046:413:82;;;551:4584:95;;;;;;;;;;;;2018:455:82;;;551:4584:95;2018:455:82;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;2141:299:82;551:4584:95;1936:14;551:4584;;;;;;;;;;;;;:::i;:::-;;;;;;;;2018:455:82;551:4584:95;;2018:3:82;-1:-1:-1;;;;;551:4584:95;2018:455:82;;;;;;;;;;;1853:281:95;903:10:84;551:4584:95;903:10:84;;5343:26:83;903:10:84;5343:26:83;;;2303:4:82;-1:-1:-1;;;;;;;;;;;2407:1:67;551:4584:95;;;;;;2018:455:82;;;551:4584:95;2018:455:82;;551:4584:95;2018:455:82;;;;;;551:4584:95;2018:455:82;;;:::i;:::-;;;551:4584:95;;;;;;2018:455:82;;;;;-1:-1:-1;2018:455:82;;;551:4584:95;;;;;;;;;2331:173;551:4584;;;;;;;-1:-1:-1;;;2403:90:95;;551:4584;;;2403:90;;551:4584;;1819:4;;903:10:84;;-1:-1:-1;;;;;551:4584:95;;2403:90;;;:::i;551:4584::-;-1:-1:-1;;;551:4584:95;;;;;;;;2207:65;;;551:4584;2207:65;;551:4584;2207:65;;;;;;551:4584;2207:65;;;:::i;:::-;;;551:4584;;;;;2207:65;;;551:4584;-1:-1:-1;551:4584:95;;2207:65;;;-1:-1:-1;2207:65:95;;;551:4584;;;;;;;;;1857:98;;;;;:::i;:::-;551:4584;;1857:98;;;;551:4584;;;;1777:65;;;551:4584;1777:65;;551:4584;1777:65;;;;;;551:4584;1777:65;;;:::i;:::-;;;551:4584;;;;;1777:65;;;;;;-1:-1:-1;1777:65:95;;;551:4584;;;;;;;;;;;1442:1461:9;551:4584:95;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;551:4584:95:-;;;;;;2141:12:83;551:4584:95;;;:::i;:::-;2141:12:83;;:::i;:::-;551:4584:95;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;551:4584:95;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;551:4584:95;;;;;;2989:103:67;;;:::i;:::-;3715:28:83;;;:::i;:::-;3810:18;551:4584:95;3810:18:83;;551:4584:95;3832:18:83;3810:40;;;3806:104;;4019:26;;;-1:-1:-1;;;;;551:4584:95;;;4019:31:83;4015:62;;551:4584:95;-1:-1:-1;;;;;551:4584:95;4092:15:83;:44;4088:100;;551:4584:95;;4252:3:83;-1:-1:-1;;;;;551:4584:95;;;;;:::i;:::-;;;;;;4329:43:83;;551:4584:95;;;;;;;:::i;:::-;;;;4276:98:83;;551:4584:95;4252:132:83;;;;;551:4584:95;;-1:-1:-1;;;4252:132:83;;551:4584:95;;;4252:132:83;;551:4584:95;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;-1:-1:-1;;4252:132:83;;;;;;551:4584:95;-1:-1:-1;4248:207:83;;-1:-1:-1;;;4423:21:83;;551:4584:95;;;;-1:-1:-1;4423:21:83;4248:207;4534:16;;;;4552:21;;;551:4584:95;4534:16:83;;-1:-1:-1;;;;;551:4584:95;;;;4534:16:83;:::i;:::-;;551:4584:95;-1:-1:-1;;;;;;;;;;;2407:1:67;551:4584:95;;;;;;;4252:132:83;;;;;551:4584:95;4252:132:83;;:::i;:::-;551:4584:95;4252:132:83;;;;4088:100;4059:18;;;551:4584:95;4159:18:83;551:4584:95;;4159:18:83;3806:104;3873:26;;;551:4584:95;3873:26:83;551:4584:95;;3873:26:83;551:4584:95;;;;;;-1:-1:-1;;551:4584:95;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1724:44:82;;1749:18;551:4584:95;1724:44:82;;551:4584:95;;;1724:44:82;551:4584:95;;;;;;1724:14:82;551:4584:95;1724:44:82;;;;;;551:4584:95;1724:44:82;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1724:44:82:-;;;;551:4584:95;1724:44:82;;;;;;:::i;:::-;;;551:4584:95;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1724:44:82;;;551:4584:95;;;;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;;724:43:82;551:4584:95;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;1055:104:6;;551:4584:95;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;551:4584:95;;;;;;;;;;;;1055:104:6;;;551:4584:95;;;;-1:-1:-1;;;551:4584:95;;;;;;;;;;;;;;;;;-1:-1:-1;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;551:4584:95:-;;;;2141:12:83;551:4584:95;;;:::i;2141:12:83:-;;551:4584:95;;;4740:4;551:4584;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;766:49:45;;;:89;;;;551:4584:95;;;;;;;766:89:45;-1:-1:-1;;;829:40:76;;-1:-1:-1;766:89:45;;;551:4584:95;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;551:4584:95;;;;;;;;-1:-1:-1;;551:4584:95;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;:::o;:::-;;;;-1:-1:-1;551:4584:95;;;;;-1:-1:-1;551:4584:95;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;:::o;:::-;;;1055:104:6;;551:4584:95;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;:::o;:::-;-1:-1:-1;;;;;551:4584:95;;;;;;-1:-1:-1;;551:4584:95;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;551:4584:95;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;551:4584:95;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::o;:::-;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::o;:::-;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;551:4584:95;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;551:4584:95;;;;;;:::o;:::-;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::o;1223:289::-;1421:34;1223:289;1421:34;551:4584;;;1421:34;;;;;;:::i;:::-;551:4584;;1421:34;1490:14;;;;-1:-1:-1;;;;;551:4584:95;;;;1223:289::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;551:4584:95;;;;;;;;;;;;;4064:22:9;;;;4060:87;;551:4584:95;;;;;;;;;;;;;;4274:33:9;551:4584:95;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;551:4584:95;;3896:19:9;551:4584:95;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;551:4584:95;;;;3881:1:9;551:4584:95;;;;;3881:1:9;551:4584:95;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2989:103:67;;;:::i;:::-;-1:-1:-1;2197:32:83;;;;:::i;:::-;2272:37;;;;:::i;:::-;2371:13;;;;551:4584:95;2388:18:83;2371:35;;;2367:99;;2481:24;;;:::i;:::-;2480:25;2476:64;;2671:11;;;;2647:36;2671:11;;2647:36;:::i;:::-;2764:18;;;551:4584:95;;;;;2764:32:83;2760:65;;2841:29;;;:::i;:::-;2840:30;2836:63;;551:4584:95;2371:13:83;551:4584:95;;;;2671:11:83;551:4584:95;;;;;;;;;;;;;;;;2970:66:83;;551:4584:95;2970:66:83;;;551:4584:95;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;551:4584:95;;;;;;;:::i;:::-;;;;;;;;2970:66:83;;-1:-1:-1;;;;;551:4584:95;2970:66:83;;;;;;;-1:-1:-1;2970:66:83;;;2989:103:67;2969:67:83;;2965:125;;551:4584:95;;3134:3:83;-1:-1:-1;;;;;551:4584:95;;;;;:::i;:::-;;;;-1:-1:-1;2371:13:83;3211:47;;551:4584:95;;;;;;;:::i;:::-;;;2371:13:83;3158:102;;551:4584:95;3134:136:83;;;;;551:4584:95;;-1:-1:-1;;;3134:136:83;;551:4584:95;;2970:66:83;3134:136;;551:4584:95;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;551:4584:95;;;;;;-1:-1:-1;;3134:136:83;;;;;;2989:103:67;-1:-1:-1;3130:215:83;;-1:-1:-1;;;3309:25:83;;2970:66;551:4584:95;;;;4423:21:83;3309:25;3130:215;3430:11;551:4584:95;;3130:215:83;;;;;3495:61;;2552:625:95;;-1:-1:-1;;;;;551:4584:95;;2552:625;:::i;:::-;551:4584;;-1:-1:-1;;;;;551:4584:95;;3495:61:83;;2407:1:67;2365;-1:-1:-1;;;;;;;;;;;2407:1:67;2989:103::o;3134:136:83:-;;;;;-1:-1:-1;3134:136:83;;:::i;:::-;-1:-1:-1;3134:136:83;;;;2965:125;2805:20;;;-1:-1:-1;3059:20:83;2970:66;-1:-1:-1;3059:20:83;2970:66;;;2371:13;2970:66;;2371:13;2970:66;;;;;;2371:13;2970:66;;;:::i;:::-;;;551:4584:95;;;;;;;:::i;:::-;2970:66:83;;;;;;-1:-1:-1;2970:66:83;;551:4584:95;;;;;;;:::i;:::-;-1:-1:-1;551:4584:95;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;551:4584:95;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1055:104:6;;551:4584:95;;;;;;:::o;3389:705::-;3608:17;;;551:4584;3629:18;3608:39;3604:57;;3704:45;3715:15;3794:36;3715:15;;;3608:17;551:4584;;;3704:45;;;;;;:::i;:::-;551:4584;3608:17;551:4584;;;3794:36;;;;;;:::i;:::-;3848:13;;;;551:4584;3865:16;;;551:4584;-1:-1:-1;;;;;551:4584:95;;;;;3848:33;;;:74;;3389:705;3848:125;;;3389:705;3848:166;;;3389:705;3848:239;;;3841:246;;3389:705;:::o;3848:239::-;3608:17;4040:14;;;;;;551:4584;;;;;4030:25;4069:17;;;3608;551:4584;;;;4059:28;4030:57;3389:705;:::o;3848:166::-;551:4584;;;;-1:-1:-1;;;;;551:4584:95;;;;;3977:37;;-1:-1:-1;3848:166:95;;:125;3938:14;;;;;551:4584;3938:14;3956:17;;551:4584;-1:-1:-1;3938:35:95;3848:125;;;:74;3885:15;;;;;551:4584;3885:15;3904:18;;551:4584;3885:37;3848:74;;;3604:57;3649:12;;551:4584;3649:12;:::o;1343:634:71:-;1465:17;-1:-1:-1;29298:17:78;-1:-1:-1;;;29298:17:78;;;29294:103;;1343:634:71;29414:17:78;29423:8;29994:7;29414:17;;;29410:103;;1343:634:71;29539:8:78;29530:17;;;29526:103;;1343:634:71;29655:7:78;29646:16;;;29642:100;;1343:634:71;29768:7:78;29759:16;;;29755:100;;1343:634:71;29881:7:78;29872:16;;;29868:100;;1343:634:71;29985:16:78;;29981:66;;1343:634:71;29994:7:78;1580:94:71;1485:1;551:4584:95;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;551:4584:95;;:::i;:::-;;;;;;;1580:94:71;;;1687:247;-1:-1:-1;;551:4584:95;;-1:-1:-1;;;1741:111:71;;;;551:4584:95;1741:111:71;551:4584:95;1902:10:71;;1898:21;;29994:7:78;1687:247:71;;;;1898:21;1914:5;;1343:634;:::o;29981:66:78:-;30031:1;551:4584:95;;;;29981:66:78;;29868:100;29881:7;29952:1;551:4584:95;;;;29868:100:78;;;29755;29768:7;29839:1;551:4584:95;;;;29755:100:78;;;29642;29655:7;29726:1;551:4584:95;;;;29642:100:78;;;29526:103;29539:8;29612:2;551:4584:95;;;;29526:103:78;;;29410;29423:8;29496:2;551:4584:95;;;;29410:103:78;;;29294;-1:-1:-1;29380:2:78;;-1:-1:-1;;;;551:4584:95;;29294:103:78;;3749:292:67;2407:1;-1:-1:-1;;;;;;;;;;;551:4584:95;4560:63:67;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:67;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:67;;-1:-1:-1;3696:30:67;551:4584:95;;;;;;;:::i;:::-;;;;-1:-1:-1;551:4584:95;;-1:-1:-1;551:4584:95;;;;-1:-1:-1;551:4584:95;;;;-1:-1:-1;551:4584:95;;;;-1:-1:-1;551:4584:95;;;;-1:-1:-1;551:4584:95;;;;-1:-1:-1;551:4584:95;;;;-1:-1:-1;551:4584:95;;;;-1:-1:-1;551:4584:95;;;;;;:::o;:::-;;;-1:-1:-1;;;;;551:4584:95;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;:::i;:::-;;;;;;:::o;4609:257:83:-;;551:4584:95;;:::i;:::-;-1:-1:-1;551:4584:95;;-1:-1:-1;;;4734:23:83;;;;;551:4584:95;;;;-1:-1:-1;551:4584:95;4734:23:83;551:4584:95;4734:3:83;-1:-1:-1;;;;;551:4584:95;4734:23:83;;;;;;;-1:-1:-1;4734:23:83;;;4609:257;4720:37;;551:4584:95;4771:29:83;;;:55;;;;;4609:257;4767:92;;;;4609:257;:::o;4767:92::-;4835:24;;;-1:-1:-1;4835:24:83;4734:23;551:4584:95;4734:23:83;-1:-1:-1;4835:24:83;4771:55;4804:22;;;-1:-1:-1;4771:55:83;;;;4734:23;;;;;;;-1:-1:-1;4734:23:83;;;;;;:::i;:::-;;;;;6040:128:9;6109:4;-1:-1:-1;;;;;551:4584:95;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1401:235:82;1592:20;;551:4584:95;;;;;;;;;;;;;1624:4:82;1592:37;1401:235;:::o;596:321:81:-;551:4584:95;;695:28:81;691:64;;-1:-1:-1;;;;;362:25:81;;;551:4584:95;;362:30:81;;;:78;;;;596:321;765:55;;;553:25;;551:4584:95;-1:-1:-1;;;;;551:4584:95;830:58:81;;906:4;596:321;:::o;830:58::-;868:20;;;-1:-1:-1;868:20:81;;-1:-1:-1;868:20:81;765:55;803:17;;;-1:-1:-1;803:17:81;;-1:-1:-1;803:17:81;362:78;425:15;;;-1:-1:-1;396:44:81;362:78;;;691:64;732:23;;;-1:-1:-1;732:23:81;;-1:-1:-1;732:23:81;551:4584:95;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;551:4584:95;;;;;;;:::o;:::-;-1:-1:-1;;;;;551:4584:95;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2552:625::-;2784:40;2552:625;;;;2784:40;551:4584;;;2784:40;;;;;;:::i;:::-;2848:13;;;551:4584;;;-1:-1:-1;551:4584:95;;;;;;;2899:15;;;;551:4584;2916:14;551:4584;;2916:14;;551:4584;;;2839:96;;;;;;551:4584;-1:-1:-1;551:4584:95;;;2848:13;551:4584;;;;;;;;;;;2839:96;;2888:4;2839:96;;;;:::i;:::-;;;;;;;;;2552:625;-1:-1:-1;2835:277:95;;-1:-1:-1;;551:4584:95;;;;;2848:13;551:4584;-1:-1:-1;;;3013:88:95;;551:4584;;;3013:88;;551:4584;2033:90;2888:4;;-1:-1:-1;;;;;551:4584:95;2839:96;3013:88;;;:::i;2835:277::-;;;;;;;2848:13;551:4584;;;2784:40;551:4584;;:::i;:::-;;;2552:625;:::o;2839:96::-;;;;;-1:-1:-1;2839:96:95;;:::i;:::-;-1:-1:-1;2839:96:95;;;;2989:103:67;;;;551:4584:95;2989:103:67;;;:::i;:::-;1667:34:95;;551:4584;;1667:34;;;;;;;:::i;:::-;1786:13;;;;551:4584;;1826:15;;;551:4584;;;;-1:-1:-1;;;1777:65:95;;1819:4;1777:65;;;551:4584;;;;;;;;1786:13;;1826:15;;1786:13;;;551:4584;1667:34;;551:4584;;;;;;-1:-1:-1;;;;;551:4584:95;1777:65;;;;;;;551:4584;1777:65;;;2989:103:67;551:4584:95;;;;;;;;;1936:14;551:4584;;1936:14;;551:4584;;;1857:98;;;;;;551:4584;;;;1786:13;551:4584;;;;;;;;;;1857:98;;1819:4;1183:10:84;1777:65:95;1857:98;;;:::i;:::-;;;;;;;;;2989:103:67;-1:-1:-1;1853:281:95;;551:4584;;;;;;1786:13;551:4584;-1:-1:-1;;;2033:90:95;;551:4584;;;2033:90;;551:4584;1819:4;;1183:10:84;;-1:-1:-1;;;;;551:4584:95;1777:65;2033:90;;;:::i;1853:281::-;551:4584;;;;1786:13;551:4584;-1:-1:-1;;;2207:65:95;;1819:4;1777:65;2207;;551:4584;;;;;;;;1853:281;;;;;;;;;;;551:4584;;;1667:34;;551:4584;;;;;;-1:-1:-1;;;;;551:4584:95;2207:65;;;;;;;;;;;1853:281;551:4584;;;;;;;;;;2335:45;2331:173;;551:4584;;;-1:-1:-1;;;;;1786:13:95;551:4584;;;;;:::i;:::-;;;;;;;;;;;;1667:34;2141:299:82;;551:4584:95;2303:4:82;1786:13:95;2141:299:82;;551:4584:95;2141:299:82;1826:15:95;2141:299:82;;551:4584:95;1936:14;2141:299:82;;551:4584:95;2141:299:82;;;;551:4584:95;1667:34;1786:13;551:4584;;;;:::i;:::-;2095:18:82;551:4584:95;;2046:413:82;;;551:4584:95;;;1786:13;551:4584;;;;;;;;2018:455:82;;;1777:65:95;2018:455:82;;551:4584:95;;;;;;;1786:13;551:4584;;;;;;;;;;;;;;;;-1:-1:-1;;;;;551:4584:95;;;;;;;;;1786:13;551:4584;;;;;;;;;1826:15;551:4584;;;;;;;2141:299:82;551:4584:95;1936:14;551:4584;;;;;;;;;;;;;:::i;:::-;;;;;;;;2018:455:82;551:4584:95;;2018:3:82;-1:-1:-1;;;;;551:4584:95;2018:455:82;;;;;;;;;;;1853:281:95;5343:26:83;;;;;;2407:1:67;2303:4:82;-1:-1:-1;;;;;;;;;;;2407:1:67;2989:103::o;2018:455:82:-;;;;;1667:34:95;2018:455:82;;1667:34:95;2018:455:82;;;;;;1667:34:95;2018:455:82;;;:::i;:::-;;;551:4584:95;;;;;;;5343:26:83;2018:455:82;;551:4584:95;;;;2018:455:82;;;-1:-1:-1;2018:455:82;;551:4584:95;-1:-1:-1;;;551:4584:95;;;1777:65;551:4584;;;;2207:65;;;1667:34;2207:65;;1667:34;2207:65;;;;;;551:4584;2207:65;;;:::i;:::-;;;551:4584;;;;;2207:65;;;;;;-1:-1:-1;2207:65:95;;1857:98;;;;;551:4584;1857:98;;:::i;:::-;551:4584;1857:98;;;;1777:65;;;1667:34;1777:65;;1667:34;1777:65;;;;;;551:4584;1777:65;;;:::i;:::-;;;551:4584;;;;;1777:65;;;;;;-1:-1:-1;1777:65:95;",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 3752,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 3795,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 3838,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 7512,
          "length": 32
        }
      ],
      "56213": [
        {
          "start": 3359,
          "length": 32
        }
      ],
      "56216": [
        {
          "start": 1255,
          "length": 32
        },
        {
          "start": 2258,
          "length": 32
        },
        {
          "start": 2962,
          "length": 32
        },
        {
          "start": 5798,
          "length": 32
        },
        {
          "start": 7374,
          "length": 32
        },
        {
          "start": 8625,
          "length": 32
        }
      ],
      "56218": [
        {
          "start": 1319,
          "length": 32
        },
        {
          "start": 2085,
          "length": 32
        },
        {
          "start": 2883,
          "length": 32
        },
        {
          "start": 3309,
          "length": 32
        },
        {
          "start": 3686,
          "length": 32
        },
        {
          "start": 5438,
          "length": 32
        },
        {
          "start": 6372,
          "length": 32
        },
        {
          "start": 8452,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "collectEscrow(bytes32,bytes32)": "2c713cd9",
    "collectEscrowRaw(bytes32,bytes32)": "891d9ea8",
    "decodeObligationData(bytes)": "c93844be",
    "doObligation((address,bytes,address,uint256,uint256),uint64)": "cecf1aff",
    "doObligationFor((address,bytes,address,uint256,uint256),uint64,address)": "f23be17b",
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
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrowRaw\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"extractArbiterAndDemand\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/default/ERC1155EscrowObligation.sol\":\"ERC1155EscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xf189f9b417fe1931e1ab706838aff1128528694a9fcdb5ff7665197f2ca57d09\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2ff0143c836c8c9f85d13708733c09e21251395847fccfb518bf3b556726a840\",\"dweb:/ipfs/QmP69sjjrQrhYAsvCSSB69Bx66SiUPdQUqdzMYnf4wANHm\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x6ec6d7fce29668ede560c7d2e10f9d10de3473f5298e431e70a5767db42fa620\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ac0139e51874aeec0730d040e57993187541777eb01d5939c06d5d2b986a54e8\",\"dweb:/ipfs/QmZbMbdPzusXuX9FGkyArV8hgzKLBZaL5RzMtCdCawtwPF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol\":{\"keccak256\":\"0x8727aacfc1f069266528eef6380f351d4d4d907b56715e799e0a6bc2d1362db7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://aa0dcc5e88b91ae16e4d08c3e43af2e9cacfc98bdd9b4eb015f8b022a8efca5c\",\"dweb:/ipfs/QmS5NxwRNqCsc6Te4a18nKU51tCh8RjkF4ATJvZms48Y4X\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377\",\"dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0xb600ec42b766fee45645fd148a2154d63cb964859545cf973277721db472edab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://98dd51bad2ef82faf14593c8d5cb8c2834fba287dea5c5bbb6e6107640e29e7f\",\"dweb:/ipfs/QmaCk9ghcsnzpHKVPdbuj83VC92YXGkRrV7xjHWya4r6Qo\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0x2938018e0e6ab1e92a62cd70479fa28250235836aabd5a1a4603da7e4fc13846\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://86cf4437d22fb38e298a17c9e5a5177bef28e6ab28a5748626df3501f0d114f4\",\"dweb:/ipfs/QmRuSzs2cUZjycTzVvD3e3m8jA7cUu1M2s4KmB172Z6N8D\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xe27fdb0826bbaf3ba2b553859e500bc065a3ce4d5ad32cfa3fdc8878b6dfcae9\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://437e871a4477e0c9b0d4300f52e45c4f3f9c72a8c30cebee983c6fa6ab570727\",\"dweb:/ipfs/QmXFx9BnkRjiMvSSRc9CqQZzR5fMjzyq2ze7fQXitBecT5\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/escrow/default/ERC1155EscrowObligation.sol\":{\"keccak256\":\"0x6aefb95bc23695122576a44335e6e6dcbb5f1011e8c0802aa68ad2fd5037deba\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f5fa17325128e027e324e6d39019abf2e68db2ee0c5e0d53d39ff7f9c27ea495\",\"dweb:/ipfs/QmQXr2NQyK88f8ogGxajSTB5CxrPD2zpfmnqutyFv4pGoQ\"]}},\"version\":1}",
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
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedCall"
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
              "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
                  "internalType": "address",
                  "name": "token",
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
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
                  "internalType": "address",
                  "name": "token",
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
              ]
            },
            {
              "internalType": "uint64",
              "name": "expirationTime",
              "type": "uint64"
            }
          ],
          "stateMutability": "nonpayable",
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
              "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
                  "internalType": "address",
                  "name": "token",
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
          "stateMutability": "nonpayable",
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
              "internalType": "struct ERC1155EscrowObligation.ObligationData",
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
                  "internalType": "address",
                  "name": "token",
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
        "src/obligations/escrow/default/ERC1155EscrowObligation.sol": "ERC1155EscrowObligation"
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
      "src/obligations/escrow/default/ERC1155EscrowObligation.sol": {
        "keccak256": "0x6aefb95bc23695122576a44335e6e6dcbb5f1011e8c0802aa68ad2fd5037deba",
        "urls": [
          "bzz-raw://f5fa17325128e027e324e6d39019abf2e68db2ee0c5e0d53d39ff7f9c27ea495",
          "dweb:/ipfs/QmQXr2NQyK88f8ogGxajSTB5CxrPD2zpfmnqutyFv4pGoQ"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 95
} as const;
