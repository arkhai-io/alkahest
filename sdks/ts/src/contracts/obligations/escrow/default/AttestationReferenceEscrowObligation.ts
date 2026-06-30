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
      "name": "ATTESTATION_SCHEMA_REVOCABLE",
      "inputs": [],
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
      "name": "VALIDATION_SCHEMA",
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
      "name": "check",
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
      "name": "collect",
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
      "name": "decodeCondition",
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
          "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
              "name": "attestationUid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "validationExpirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "validationRevocable",
              "type": "bool",
              "internalType": "bool"
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
          "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
              "name": "attestationUid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "validationExpirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "validationRevocable",
              "type": "bool",
              "internalType": "bool"
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
          "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
              "name": "attestationUid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "validationExpirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "validationRevocable",
              "type": "bool",
              "internalType": "bool"
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
          "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
              "name": "attestationUid",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "validationExpirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "validationRevocable",
              "type": "bool",
              "internalType": "bool"
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
      "name": "reclaim",
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
          "name": "escrowUid",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "fulfillmentUid",
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
          "name": "escrowUid",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "escrower",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "EscrowReclaimed",
      "inputs": [
        {
          "name": "escrowUid",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "escrower",
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
    "object": "0x6101a0806040523461026f5760408161247a80380380916100208285610273565b83398101031261026f5780516001600160a01b0381169182820361026f5760200151906001600160a01b03821680830361026f576040519361006360a086610273565b607085527f6164647265737320617262697465722c2062797465732064656d616e642c206260208601527f797465733332206174746573746174696f6e5569642c2075696e74363420766160408601527f6c69646174696f6e45787069726174696f6e54696d652c20626f6f6c2076616c60608601526f69646174696f6e5265766f6361626c6560801b60808601526001608052600360a0525f60c052156102605761018e93826101279360e052610120528361010052600161016052309161038e565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f005560405161015d604082610273565b601f81527f627974657333322076616c6964617465644174746573746174696f6e556964006020820152309161038e565b61018052604051611f10908161056a823960805181610f9c015260a05181610fc7015260c05181610ff2015260e05181611b6f01526101005181610e130152610120518181816102a80152818161074a0152818161095501528181610ae1015281816119030152611d4a0152610140518181816101480152818161078a015281816108a501528181610a9201528181610de101528181610f5a01528181611744015261186b01526101605181818161082d015281816108e801526118b70152610180518181816103e501526105e20152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b0382119082101761029657604052565b634e487b7160e01b5f52604160045260245ffd5b60208183031261026f578051906001600160401b03821161026f57019060808282031261026f5760405191608083016001600160401b03811184821017610296576040528051835260208101516001600160a01b038116810361026f5760208401526040810151801515810361026f5760408401526060810151906001600160401b03821161026f570181601f8201121561026f578051906001600160401b0382116102965760405192610368601f8401601f191660200185610273565b8284526020838301011161026f57815f9260208093018386015e83010152606082015290565b929160405190602082018351926103d86015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a19810184520182610273565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156104e95787915f9161054f575b505114610549579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610515575b506104f457505f602491604051928380926351753e3760e11b82528760048301525afa80156104e95783915f916104c7575b5051146104c55750639e6113d560e01b5f5260045260245ffd5b565b6104e391503d805f833e6104db8183610273565b8101906102aa565b5f6104ab565b6040513d5f823e3d90fd5b91928091508203610503575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d602011610541575b8161053160209383610273565b8101031261026f5751905f610479565b3d9150610524565b50505050565b61056391503d805f833e6104db8183610273565b5f61041356fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a71461116f575080633ce645d5146111045780634e3fa9261461107f57806354fd4d5014610f7d5780635bf2f20d14610f435780636b122fe014610da2578063760bd11814610d4457806388e5b2d914610c0f5780638da3721a14610c2e57806391db0b7e14610c0f57806396afb36514610a63578063b3b902d414610852578063b587a5eb14610815578063c6ec507014610709578063c93844be14610621578063ce46e04614610605578063df61dd2c146105ca578063e49617e1146105a5578063e60c3505146105a55763ea6ec49c0361000f57346105a25760403660031901126105a2576024359060043561012d611bc7565b61013681611d24565b61013f84611d24565b906020810151907f00000000000000000000000000000000000000000000000000000000000000008092036105935761017781611dd2565b156105935761012081019061018c8251611670565b60a08693929301918251815103610584576101a687611dd2565b156105845751604080516346d1b90d60e11b8152606060048201819052895160648301526020808b01516084840152928a01516001600160401b0390811660a4840152908a0151811660c483015260808a01511660e4820152935161010485015260c0880180516001600160a01b0390811661012487015260e08a01511661014486015261010089015115156101648601526101209098015161014061018486015293949093859391928492839261027a9190610268906101a486019061121a565b8481036003190160248601529061121a565b604483019190915203916001600160a01b03165afa90811561057957869161053f575b5015610530576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692906102db81611289565b858152866020820152604051916102f183611289565b82526020820152823b1561052c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015285808260648183885af19182610517575b50506103545763614cf93960e01b85526004849052602485fd5b6104268594939260209261037b60018060a01b0386511691518580825183010191016115df565b6001600160401b0360608201511690604060808201511515910151906040519282888501528784526103ae6040856112da565b604051946103bb866112bf565b8552878501526040840152606083015260808201528660a0820152604051906103e382611289565b7f000000000000000000000000000000000000000000000000000000000000000082528482015260405196878094819363f17325e760e01b835260048301611e44565b03925af192831561050c5784936104b2575b50907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0946104ae9392604051936020850152602084526104796040856112da565b516040519687966001600160a01b03909216939180a460015f516020611ebb5f395f51905f525560208352602083019061121a565b0390f35b9250906020833d602011610504575b816104ce602093836112da565b8101031261050057915191907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0610438565b5f80fd5b3d91506104c1565b6040513d86823e3d90fd5b81610521916112da565b61052c57855f61033a565b8580fd5b630ebe58ef60e11b8552600485fd5b90506020813d602011610571575b8161055a602093836112da565b8101031261052c5761056b9061155a565b5f61029d565b3d915061054d565b6040513d88823e3d90fd5b630ebe58ef60e11b8952600489fd5b63629cd40b60e11b8552600485fd5b80fd5b60206105c06105b33661147a565b6105bb611b6d565b611bae565b6040519015158152f35b50346105a257806003193601126105a25760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346105a257806003193601126105a257602090604051908152f35b50346105a25760203660031901126105a2576004356001600160401b038111610701576106529036906004016113f7565b61065d929192611832565b50820191602081840312610701578035906001600160401b03821161070557019160a0838203126107015760405191610695836112a4565b61069e84611206565b83526020840135906001600160401b0382116105a25750836106ca6106f0936080936104ae970161134c565b6020850152604081013560408501526106e5606082016111f2565b6060850152016113ea565b608082015260405191829182611424565b5080fd5b8280fd5b50346105a25760203660031901126105a257610723611832565b5061072c611bff565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156108085781926107e4575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036107d5576104ae6107c9610120840151602080825183010191016115df565b60405191829182611424565b635527981560e11b8152600490fd5b6108019192503d8084833e6107f981836112da565b810190611c49565b905f610782565b50604051903d90823e3d90fd5b50346105a257806003193601126105a25760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b5060603660031901126105a2576004356001600160401b038111610701576108816109509136906004016113f7565b929061089a61088e6111dc565b91604435953691611316565b906108a3611bc7565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b03604051916108da836112bf565b3383521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201528860608201528560808201528660a08201526040519061092f82611289565b858252828201526040518098819263f17325e760e01b835260048301611e44565b0381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610a58578596610a1d575b50906020966101209392604051936109a48561126d565b888552898501526001600160401b0342166040850152606084015285608084015260a08301523360c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f516020611ebb5f395f51905f5255604051908152f35b92919095506020833d602011610a50575b81610a3b602093836112da565b8101031261050057915194909190602061098d565b3d9150610a2e565b6040513d87823e3d90fd5b50346105005760203660031901126105005760043590610a81611bc7565b610a8a82611d24565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610c0057606084016001600160401b0381511615610bf157516001600160401b03164210610bf1576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610b1381611289565b8381525f602082015260405192610b2984611289565b83526020830152803b1561050057604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610bdc575b50610b8d5763614cf93960e01b825260045260249150fd5b60209260c060018060a01b0391015116907f655ef333d5efcbf5aa343f02bcd9e3539f9c9f9ee8b9cfa7d8910b1bd7e0a8326040519380a360015f516020611ebb5f395f51905f525560018152f35b610be99193505f906112da565b5f915f610b75565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b60206105c0610c1d3661139a565b92610c29929192611b6d565b611699565b34610500576060366003190112610500576004356001600160401b0381116105005761014060031982360301126105005760405190610c6c8261126d565b8060040135825260248101356020830152610c89604482016111f2565b6040830152610c9a606482016111f2565b6060830152610cab608482016111f2565b608083015260a481013560a0830152610cc660c48201611206565b60c0830152610cd760e48201611206565b60e0830152610ce961010482016113ea565b610100830152610124810135906001600160401b038211610500576004610d13923692010161134c565b6101208201526024356001600160401b03811161050057602091610d3e6105c092369060040161134c565b9061173d565b34610500576020366003190112610500576004356001600160401b03811161050057610d77610d7c91369060040161134c565b611670565b604080516001600160a01b0390931683526020830181905282916104ae9183019061121a565b34610500575f36600319011261050057606080604051610dc18161123e565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610f38575f90610e88575b6060906104ae604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a083019061121a565b503d805f833e610e9881836112da565b810190602081830312610500578051906001600160401b03821161050057016080818303126105005760405190610ece8261123e565b8051825260208101516001600160a01b0381168103610500576020830152610ef86040820161155a565b60408301526060810151906001600160401b038211610500570182601f8201121561050057606092816020610f2f93519101611567565b82820152610e42565b6040513d5f823e3d90fd5b34610500575f3660031901126105005760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610500575f366003190112610500576104ae602061106b6001610fc07f0000000000000000000000000000000000000000000000000000000000000000611a00565b8184610feb7f0000000000000000000000000000000000000000000000000000000000000000611a00565b81806110167f0000000000000000000000000000000000000000000000000000000000000000611a00565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f1981018352826112da565b60405191829160208352602083019061121a565b34610500576060366003190112610500576004356001600160401b0381116105005760a06003198236030112610500576110b76111dc565b906044356001600160a01b0381168103610500576020926110e96110f76110fc946040519283916004018883016114ae565b03601f1981018352826112da565b61185d565b604051908152f35b34610500576040366003190112610500576004356001600160401b0381116105005760a06003198236030112610500576110fc61115a6020926111686111486111dc565b916040519384916004018783016114ae565b03601f1981018452836112da565b339161185d565b34610500576020366003190112610500576004359063ffffffff60e01b8216809203610500576020916346d1b90d60e11b81149081156111b1575b5015158152f35b630acaa6e160e01b8114915081156111cb575b50836111aa565b6301ffc9a760e01b149050836111c4565b602435906001600160401b038216820361050057565b35906001600160401b038216820361050057565b35906001600160a01b038216820361050057565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b0382111761125957604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b0382111761125957604052565b604081019081106001600160401b0382111761125957604052565b60a081019081106001600160401b0382111761125957604052565b60c081019081106001600160401b0382111761125957604052565b90601f801991011681019081106001600160401b0382111761125957604052565b6001600160401b03811161125957601f01601f191660200190565b929192611322826112fb565b9161133060405193846112da565b829481845281830111610500578281602093845f960137010152565b9080601f830112156105005781602061136793359101611316565b90565b9181601f84011215610500578235916001600160401b038311610500576020808501948460051b01011161050057565b6040600319820112610500576004356001600160401b03811161050057816113c49160040161136a565b92909291602435906001600160401b038211610500576113e69160040161136a565b9091565b3590811515820361050057565b9181601f84011215610500578235916001600160401b038311610500576020838186019501011161050057565b6020815260018060a01b03825116602082015260a06080611453602085015183604086015260c085019061121a565b93604081015160608501526001600160401b03606082015116828501520151151591015290565b602060031982011261050057600435906001600160401b038211610500576101409082900360031901126105005760040190565b602081526001600160a01b036114c383611206565b1660208201526020820135601e1983360301811215610500578201602081359101926001600160401b038211610500578136038413610500576080611547918360e09660a060408801528160c0880152878701375f868587010152604081013560608601526001600160401b0361153c606083016111f2565b1682860152016113ea565b151560a0830152601f01601f1916010190565b5190811515820361050057565b929192611573826112fb565b9161158160405193846112da565b829481845281830111610500578281602093845f96015e010152565b51906001600160a01b038216820361050057565b9080601f8301121561050057815161136792602001611567565b51906001600160401b038216820361050057565b602081830312610500578051906001600160401b038211610500570160a0818303126105005760405191611612836112a4565b61161b8261159d565b83526020820151916001600160401b038311610500576116426080926116689483016115b1565b60208501526040810151604085015261165d606082016115cb565b60608501520161155a565b608082015290565b61168390602080825183010191016115df565b80516020909101516001600160a01b0390911691565b92909281840361172e575f91345b85841015611723578184101561170f578360051b80860135908282116117005784013561013e1985360301811215610500576116e4908501611bae565b156116f557600191039301926116a7565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f00000000000000000000000000000000000000000000000000000000000000000361182c57611783610120611793920151602080825183010191016115df565b91602080825183010191016115df565b60408201516040820151149182611807575b826117f0575b826117d7575b826117bb57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506117b1565b9150608082015115156080820151151514916117ab565b91506001600160401b036060830151166001600160401b0360608301511614916117a5565b50505f90565b6040519061183f826112a4565b5f608083828152606060208201528260408201528260608201520152565b6118fe92611869611bc7565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b03604051916118a0836112bf565b60018060a01b0316948583521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201525f60608201528560808201525f60a08201526040519061092f82611289565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610f38575f966119c4575b509061012092916040519261194f8461126d565b87845260208401526001600160401b034216604084015260608301525f60808301525f60a08301528460c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f516020611ebb5f395f51905f5255565b92919095506020833d6020116119f8575b816119e2602093836112da565b810103126105005761012092519590919261193b565b3d91506119d5565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b4a575b806d04ee2d6d415b85acef8100000000600a921015611b2f575b662386f26fc10000811015611b1b575b6305f5e100811015611b0a575b612710811015611afb575b6064811015611aed575b1015611ae2575b600a60216001840193611a87856112fb565b94611a9560405196876112da565b808652611aa4601f19916112fb565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611add57600a9091611aaf565b505090565b600190910190611a75565b606460029104930192611a6e565b61271060049104930192611a64565b6305f5e10060089104930192611a59565b662386f26fc1000060109104930192611a4c565b6d04ee2d6d415b85acef810000000060209104930192611a3c565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611a22565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611b9f57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361050057301490565b60025f516020611ebb5f395f51905f525414611bf05760025f516020611ebb5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611c0c8261126d565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b602081830312610500578051906001600160401b0382116105005701610140818303126105005760405191611c7d8361126d565b8151835260208201516020840152611c97604083016115cb565b6040840152611ca8606083016115cb565b6060840152611cb9608083016115cb565b608084015260a082015160a0840152611cd460c0830161159d565b60c0840152611ce560e0830161159d565b60e0840152611cf7610100830161155a565b6101008401526101208201516001600160401b03811161050057611d1b92016115b1565b61012082015290565b90611d2d611bff565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610f38575f93611db6575b508251818115918215611dab575b5050611d995750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611d90565b611dcb9193503d805f833e6107f981836112da565b915f611d82565b805115611e35576001600160401b036060820151168015159081611e2a575b50611e1b57608001516001600160401b0316611e0c57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611df1565b635c2c7f8960e01b5f5260045ffd5b9060209081835280518284015201519060408082015260018060a01b0382511660608201526001600160401b0360208301511660808201526040820151151560a0820152606082015160c082015261010060a0611eb1608085015160c060e086015261012085019061121a565b9301519101529056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220347d768839ba4a4820aad2744b0be6eaffc7e9ebb0aab0240a251b49fd7e117f64736f6c634300081b0033",
    "sourceMap": "918:4954:127:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;918:4954:127;;;;1738:4;918:4954;759:14:6;688:1:9;918:4954:127;783:14:6;-1:-1:-1;807:14:6;;708:26:9;704:76;;1841:104:127;790:10:9;;2065:81:88;790:10:9;;;1932::88;;1952:32;;;1738:4:127;1994:40:88;;2128:4;2065:81;;:::i;:::-;2044:102;;1738:4:127;1505:66:68;2365:1;918:4954:127;;;;;;:::i;:::-;;;;;;;;;2128:4:88;1841:104:127;;:::i;:::-;1809:136;;918:4954;;;;;;;;;;;;;;;;;;;;807:14:6;918:4954:127;;;;;790:10:9;918:4954:127;;;;;1952:32:88;918:4954:127;;;;;1932:10:88;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2044:102:88;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1994:40:88;918:4954:127;;;;;;;;;;;;;;;1809:136;918:4954;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;918:4954:127;-1:-1:-1;918:4954:127;;;;;;;-1:-1:-1;;918:4954:127;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;918:4954:127;;;;;-1:-1:-1;918:4954:127;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;918:4954:127;;;;;;;;;;;;;;;;;;:::o;597:755:123:-;;;918:4954:127;;1602:45:123;;;;918:4954:127;;;1602:45:123;918:4954:127;1602:45:123;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1602:45:123;;;;;;;;;;;:::i;:::-;918:4954:127;1592:56:123;;918:4954:127;;-1:-1:-1;;;880:29:123;;;;;918:4954:127;;;1592:56:123;;-1:-1:-1;;;;;918:4954:127;;;-1:-1:-1;918:4954:127;880:29:123;918:4954:127;;880:29:123;;;;;;;;-1:-1:-1;880:29:123;;;597:755;918:4954:127;;923:19:123;919:35;;918:4954:127;;1602:45:123;918:4954:127;;;;;;;;;;;969:52:123;;918:4954:127;880:29:123;969:52;;918:4954:127;;;;;;;;;;;;;-1:-1:-1;918:4954:127;;;;;;;;;;;;880:29:123;918:4954:127;;;1738:4;918:4954;;;;;;;;;;;;969:52:123;;;-1:-1:-1;969:52:123;;;-1:-1:-1;;969:52:123;;;597:755;-1:-1:-1;965:381:123;;918:4954:127;-1:-1:-1;880:29:123;918:4954:127;;;;;;;;;;1207:29:123;;;880;1207;;918:4954:127;1207:29:123;;;;;;;;-1:-1:-1;1207:29:123;;;965:381;918:4954:127;;1254:19:123;1250:35;;1101:29;;;;-1:-1:-1;1306:29:123;880;918:4954:127;880:29:123;-1:-1:-1;1306:29:123;1250:35;1275:10::o;1207:29::-;;;;;;-1:-1:-1;1207:29:123;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;918:4954:127;;;-1:-1:-1;918:4954:127;;;;;965:381:123;1072:20;;;;;;;1068:62;;1144:20;;:::o;1068:62::-;1101:29;;;-1:-1:-1;1101:29:123;880;918:4954:127;880:29:123;-1:-1:-1;1101:29:123;969:52;;;;1602:45;969:52;;1602:45;969:52;;;;;;1602:45;969:52;;;:::i;:::-;;;918:4954:127;;;;;969:52:123;;;;;;;-1:-1:-1;969:52:123;;919:35;944:10;;;;:::o;880:29::-;;;;;;-1:-1:-1;880:29:123;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a71461116f575080633ce645d5146111045780634e3fa9261461107f57806354fd4d5014610f7d5780635bf2f20d14610f435780636b122fe014610da2578063760bd11814610d4457806388e5b2d914610c0f5780638da3721a14610c2e57806391db0b7e14610c0f57806396afb36514610a63578063b3b902d414610852578063b587a5eb14610815578063c6ec507014610709578063c93844be14610621578063ce46e04614610605578063df61dd2c146105ca578063e49617e1146105a5578063e60c3505146105a55763ea6ec49c0361000f57346105a25760403660031901126105a2576024359060043561012d611bc7565b61013681611d24565b61013f84611d24565b906020810151907f00000000000000000000000000000000000000000000000000000000000000008092036105935761017781611dd2565b156105935761012081019061018c8251611670565b60a08693929301918251815103610584576101a687611dd2565b156105845751604080516346d1b90d60e11b8152606060048201819052895160648301526020808b01516084840152928a01516001600160401b0390811660a4840152908a0151811660c483015260808a01511660e4820152935161010485015260c0880180516001600160a01b0390811661012487015260e08a01511661014486015261010089015115156101648601526101209098015161014061018486015293949093859391928492839261027a9190610268906101a486019061121a565b8481036003190160248601529061121a565b604483019190915203916001600160a01b03165afa90811561057957869161053f575b5015610530576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692906102db81611289565b858152866020820152604051916102f183611289565b82526020820152823b1561052c57604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015285808260648183885af19182610517575b50506103545763614cf93960e01b85526004849052602485fd5b6104268594939260209261037b60018060a01b0386511691518580825183010191016115df565b6001600160401b0360608201511690604060808201511515910151906040519282888501528784526103ae6040856112da565b604051946103bb866112bf565b8552878501526040840152606083015260808201528660a0820152604051906103e382611289565b7f000000000000000000000000000000000000000000000000000000000000000082528482015260405196878094819363f17325e760e01b835260048301611e44565b03925af192831561050c5784936104b2575b50907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0946104ae9392604051936020850152602084526104796040856112da565b516040519687966001600160a01b03909216939180a460015f516020611ebb5f395f51905f525560208352602083019061121a565b0390f35b9250906020833d602011610504575b816104ce602093836112da565b8101031261050057915191907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0610438565b5f80fd5b3d91506104c1565b6040513d86823e3d90fd5b81610521916112da565b61052c57855f61033a565b8580fd5b630ebe58ef60e11b8552600485fd5b90506020813d602011610571575b8161055a602093836112da565b8101031261052c5761056b9061155a565b5f61029d565b3d915061054d565b6040513d88823e3d90fd5b630ebe58ef60e11b8952600489fd5b63629cd40b60e11b8552600485fd5b80fd5b60206105c06105b33661147a565b6105bb611b6d565b611bae565b6040519015158152f35b50346105a257806003193601126105a25760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346105a257806003193601126105a257602090604051908152f35b50346105a25760203660031901126105a2576004356001600160401b038111610701576106529036906004016113f7565b61065d929192611832565b50820191602081840312610701578035906001600160401b03821161070557019160a0838203126107015760405191610695836112a4565b61069e84611206565b83526020840135906001600160401b0382116105a25750836106ca6106f0936080936104ae970161134c565b6020850152604081013560408501526106e5606082016111f2565b6060850152016113ea565b608082015260405191829182611424565b5080fd5b8280fd5b50346105a25760203660031901126105a257610723611832565b5061072c611bff565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156108085781926107e4575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036107d5576104ae6107c9610120840151602080825183010191016115df565b60405191829182611424565b635527981560e11b8152600490fd5b6108019192503d8084833e6107f981836112da565b810190611c49565b905f610782565b50604051903d90823e3d90fd5b50346105a257806003193601126105a25760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b5060603660031901126105a2576004356001600160401b038111610701576108816109509136906004016113f7565b929061089a61088e6111dc565b91604435953691611316565b906108a3611bc7565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b03604051916108da836112bf565b3383521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201528860608201528560808201528660a08201526040519061092f82611289565b858252828201526040518098819263f17325e760e01b835260048301611e44565b0381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610a58578596610a1d575b50906020966101209392604051936109a48561126d565b888552898501526001600160401b0342166040850152606084015285608084015260a08301523360c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f516020611ebb5f395f51905f5255604051908152f35b92919095506020833d602011610a50575b81610a3b602093836112da565b8101031261050057915194909190602061098d565b3d9150610a2e565b6040513d87823e3d90fd5b50346105005760203660031901126105005760043590610a81611bc7565b610a8a82611d24565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610c0057606084016001600160401b0381511615610bf157516001600160401b03164210610bf1576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610b1381611289565b8381525f602082015260405192610b2984611289565b83526020830152803b1561050057604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610bdc575b50610b8d5763614cf93960e01b825260045260249150fd5b60209260c060018060a01b0391015116907f655ef333d5efcbf5aa343f02bcd9e3539f9c9f9ee8b9cfa7d8910b1bd7e0a8326040519380a360015f516020611ebb5f395f51905f525560018152f35b610be99193505f906112da565b5f915f610b75565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b60206105c0610c1d3661139a565b92610c29929192611b6d565b611699565b34610500576060366003190112610500576004356001600160401b0381116105005761014060031982360301126105005760405190610c6c8261126d565b8060040135825260248101356020830152610c89604482016111f2565b6040830152610c9a606482016111f2565b6060830152610cab608482016111f2565b608083015260a481013560a0830152610cc660c48201611206565b60c0830152610cd760e48201611206565b60e0830152610ce961010482016113ea565b610100830152610124810135906001600160401b038211610500576004610d13923692010161134c565b6101208201526024356001600160401b03811161050057602091610d3e6105c092369060040161134c565b9061173d565b34610500576020366003190112610500576004356001600160401b03811161050057610d77610d7c91369060040161134c565b611670565b604080516001600160a01b0390931683526020830181905282916104ae9183019061121a565b34610500575f36600319011261050057606080604051610dc18161123e565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610f38575f90610e88575b6060906104ae604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a083019061121a565b503d805f833e610e9881836112da565b810190602081830312610500578051906001600160401b03821161050057016080818303126105005760405190610ece8261123e565b8051825260208101516001600160a01b0381168103610500576020830152610ef86040820161155a565b60408301526060810151906001600160401b038211610500570182601f8201121561050057606092816020610f2f93519101611567565b82820152610e42565b6040513d5f823e3d90fd5b34610500575f3660031901126105005760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610500575f366003190112610500576104ae602061106b6001610fc07f0000000000000000000000000000000000000000000000000000000000000000611a00565b8184610feb7f0000000000000000000000000000000000000000000000000000000000000000611a00565b81806110167f0000000000000000000000000000000000000000000000000000000000000000611a00565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f1981018352826112da565b60405191829160208352602083019061121a565b34610500576060366003190112610500576004356001600160401b0381116105005760a06003198236030112610500576110b76111dc565b906044356001600160a01b0381168103610500576020926110e96110f76110fc946040519283916004018883016114ae565b03601f1981018352826112da565b61185d565b604051908152f35b34610500576040366003190112610500576004356001600160401b0381116105005760a06003198236030112610500576110fc61115a6020926111686111486111dc565b916040519384916004018783016114ae565b03601f1981018452836112da565b339161185d565b34610500576020366003190112610500576004359063ffffffff60e01b8216809203610500576020916346d1b90d60e11b81149081156111b1575b5015158152f35b630acaa6e160e01b8114915081156111cb575b50836111aa565b6301ffc9a760e01b149050836111c4565b602435906001600160401b038216820361050057565b35906001600160401b038216820361050057565b35906001600160a01b038216820361050057565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b0382111761125957604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b0382111761125957604052565b604081019081106001600160401b0382111761125957604052565b60a081019081106001600160401b0382111761125957604052565b60c081019081106001600160401b0382111761125957604052565b90601f801991011681019081106001600160401b0382111761125957604052565b6001600160401b03811161125957601f01601f191660200190565b929192611322826112fb565b9161133060405193846112da565b829481845281830111610500578281602093845f960137010152565b9080601f830112156105005781602061136793359101611316565b90565b9181601f84011215610500578235916001600160401b038311610500576020808501948460051b01011161050057565b6040600319820112610500576004356001600160401b03811161050057816113c49160040161136a565b92909291602435906001600160401b038211610500576113e69160040161136a565b9091565b3590811515820361050057565b9181601f84011215610500578235916001600160401b038311610500576020838186019501011161050057565b6020815260018060a01b03825116602082015260a06080611453602085015183604086015260c085019061121a565b93604081015160608501526001600160401b03606082015116828501520151151591015290565b602060031982011261050057600435906001600160401b038211610500576101409082900360031901126105005760040190565b602081526001600160a01b036114c383611206565b1660208201526020820135601e1983360301811215610500578201602081359101926001600160401b038211610500578136038413610500576080611547918360e09660a060408801528160c0880152878701375f868587010152604081013560608601526001600160401b0361153c606083016111f2565b1682860152016113ea565b151560a0830152601f01601f1916010190565b5190811515820361050057565b929192611573826112fb565b9161158160405193846112da565b829481845281830111610500578281602093845f96015e010152565b51906001600160a01b038216820361050057565b9080601f8301121561050057815161136792602001611567565b51906001600160401b038216820361050057565b602081830312610500578051906001600160401b038211610500570160a0818303126105005760405191611612836112a4565b61161b8261159d565b83526020820151916001600160401b038311610500576116426080926116689483016115b1565b60208501526040810151604085015261165d606082016115cb565b60608501520161155a565b608082015290565b61168390602080825183010191016115df565b80516020909101516001600160a01b0390911691565b92909281840361172e575f91345b85841015611723578184101561170f578360051b80860135908282116117005784013561013e1985360301811215610500576116e4908501611bae565b156116f557600191039301926116a7565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f00000000000000000000000000000000000000000000000000000000000000000361182c57611783610120611793920151602080825183010191016115df565b91602080825183010191016115df565b60408201516040820151149182611807575b826117f0575b826117d7575b826117bb57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506117b1565b9150608082015115156080820151151514916117ab565b91506001600160401b036060830151166001600160401b0360608301511614916117a5565b50505f90565b6040519061183f826112a4565b5f608083828152606060208201528260408201528260608201520152565b6118fe92611869611bc7565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b03604051916118a0836112bf565b60018060a01b0316948583521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201525f60608201528560808201525f60a08201526040519061092f82611289565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610f38575f966119c4575b509061012092916040519261194f8461126d565b87845260208401526001600160401b034216604084015260608301525f60808301525f60a08301528460c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f516020611ebb5f395f51905f5255565b92919095506020833d6020116119f8575b816119e2602093836112da565b810103126105005761012092519590919261193b565b3d91506119d5565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b4a575b806d04ee2d6d415b85acef8100000000600a921015611b2f575b662386f26fc10000811015611b1b575b6305f5e100811015611b0a575b612710811015611afb575b6064811015611aed575b1015611ae2575b600a60216001840193611a87856112fb565b94611a9560405196876112da565b808652611aa4601f19916112fb565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611add57600a9091611aaf565b505090565b600190910190611a75565b606460029104930192611a6e565b61271060049104930192611a64565b6305f5e10060089104930192611a59565b662386f26fc1000060109104930192611a4c565b6d04ee2d6d415b85acef810000000060209104930192611a3c565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611a22565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611b9f57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361050057301490565b60025f516020611ebb5f395f51905f525414611bf05760025f516020611ebb5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611c0c8261126d565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b602081830312610500578051906001600160401b0382116105005701610140818303126105005760405191611c7d8361126d565b8151835260208201516020840152611c97604083016115cb565b6040840152611ca8606083016115cb565b6060840152611cb9608083016115cb565b608084015260a082015160a0840152611cd460c0830161159d565b60c0840152611ce560e0830161159d565b60e0840152611cf7610100830161155a565b6101008401526101208201516001600160401b03811161050057611d1b92016115b1565b61012082015290565b90611d2d611bff565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610f38575f93611db6575b508251818115918215611dab575b5050611d995750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611d90565b611dcb9193503d805f833e6107f981836112da565b915f611d82565b805115611e35576001600160401b036060820151168015159081611e2a575b50611e1b57608001516001600160401b0316611e0c57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611df1565b635c2c7f8960e01b5f5260045ffd5b9060209081835280518284015201519060408082015260018060a01b0382511660608201526001600160401b0360208301511660808201526040820151151560a0820152606082015160c082015261010060a0611eb1608085015160c060e086015261012085019061121a565b9301519101529056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220347d768839ba4a4820aad2744b0be6eaffc7e9ebb0aab0240a251b49fd7e117f64736f6c634300081b0033",
    "sourceMap": "918:4954:127:-:0;;;;;;;;;;-1:-1:-1;918:4954:127;;;;;;;;;1183:12:9;;;1054:5;1183:12;918:4954:127;1054:5:9;1183:12;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;;;;2989:103:68;;:::i;:::-;4062:32:89;;;:::i;:::-;4137:37;;;:::i;:::-;4236:13;918:4954:127;4236:13:89;;918:4954:127;4253:18:89;;4236:35;;;4232:99;;4346:24;;;:::i;:::-;4345:25;4341:64;;4528:11;;;;4512:28;4528:11;;4512:28;:::i;:::-;4621:18;;;;;;918:4954:127;;;;;4621:32:89;4617:65;;4698:29;;;:::i;:::-;4697:30;4693:63;;918:4954:127;;;;-1:-1:-1;;;4827:56:89;;918:4954:127;;4827:56:89;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;4528:11:89;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;918:4954:127;;;;;;;:::i;:::-;;;;;;;;4827:56:89;;-1:-1:-1;;;;;918:4954:127;4827:56:89;;;;;;;;;;;918:4954:127;4826:57:89;;4822:115;;918:4954:127;;4981:3:89;-1:-1:-1;;;;;918:4954:127;;;;;;:::i;:::-;;;;5058:47:89;918:4954:127;5058:47:89;;918:4954:127;;;;;;;:::i;:::-;;;;5005:102:89;;918:4954:127;4981:136:89;;;;;918:4954:127;;-1:-1:-1;;;4981:136:89;;918:4954:127;;;4981:136:89;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;4981:136:89;;;;;;;918:4954:127;-1:-1:-1;;4977:215:89;;-1:-1:-1;;;5156:25:89;;918:4954:127;;;;;6295:21:89;5156:25;4977:215;3072:486:127;4977:215:89;;;;918:4954:127;4977:215:89;2955:41:127;918:4954;;;;;;;;2966:11;;918:4954;;;;2955:41;;;;;;:::i;:::-;-1:-1:-1;;;;;918:4954:127;3278:32;;918:4954;;3343:27;918:4954;;3343:27;;918:4954;;;3400:22;;918:4954;;;;3450:34;;;;;918:4954;3450:34;;;;918:4954;3450:34;;:::i;:::-;918:4954;;;;;;:::i;:::-;;;3182:351;;;918:4954;;3182:351;;918:4954;;3182:351;;918:4954;;3182:351;;918:4954;3182:351;4621:18:89;3182:351:127;;918:4954;;;;;;;:::i;:::-;3141:17;918:4954;;3096:452;;;918:4954;;;;;;;;;;;;3072:486;;918:4954;3072:486;;;:::i;:::-;;;;;;;;;;;;;;4977:215:89;918:4954:127;;5337:61:89;918:4954:127;;;;;;3576:25;918:4954;3576:25;;918:4954;;3576:25;;;918:4954;3576:25;;:::i;:::-;918:4954;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;5337:61:89;918:4954:127;-1:-1:-1;;;;;;;;;;;2407:1:68;918:4954:127;;;;;;;;:::i;:::-;;;;3072:486;;;;918:4954;3072:486;;918:4954;3072:486;;;;;;918:4954;3072:486;;;:::i;:::-;;;918:4954;;;;;;;3072:486;5337:61:89;3072:486:127;;918:4954;-1:-1:-1;918:4954:127;;3072:486;;;-1:-1:-1;3072:486:127;;;918:4954;;;;;;;;;4981:136:89;;;;;:::i;:::-;918:4954:127;;4981:136:89;;;;918:4954:127;;;;4822:115:89;-1:-1:-1;;;4906:20:89;;918:4954:127;4662:20:89;4906;4827:56;;;918:4954:127;4827:56:89;;918:4954:127;4827:56:89;;;;;;918:4954:127;4827:56:89;;;:::i;:::-;;;918:4954:127;;;;;;;:::i;:::-;4827:56:89;;;;;;-1:-1:-1;4827:56:89;;;918:4954:127;;;;;;;;;4693:63:89;-1:-1:-1;;;4736:20:89;;918:4954:127;4662:20:89;4736;4341:64;-1:-1:-1;;;4379:26:89;;918:4954:127;5745:26:89;4379;918:4954:127;;;;;3045:39:9;918:4954:127;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;:::-;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;1099:42;918:4954;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;5829:34;;918:4954;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;918:4954:127;;-1:-1:-1;;;4191:23:88;;918:4954:127;;;4191:23:88;;;918:4954:127;;;;4191:23:88;918:4954:127;4191:3:88;-1:-1:-1;;;;;918:4954:127;4191:23:88;;;;;;;;;;;918:4954:127;4228:19:88;918:4954:127;4228:19:88;;918:4954:127;4251:18:88;4228:41;4224:100;;918:4954:127;5587:46;5598:16;;;;918:4954;;;;5587:46;;;;;;:::i;:::-;918:4954;;;;;;;:::i;4224:100:88:-;-1:-1:-1;;;4292:21:88;;918:4954:127;;4292:21:88;4191:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;1332:50:88;918:4954:127;;;;;;-1:-1:-1;918:4954:127;;-1:-1:-1;;918:4954:127;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;3490:431:88;918:4954:127;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;:::i;:::-;2176:12:91;2989:103:68;;:::i;:::-;3559:18:88;918:4954:127;-1:-1:-1;;;;;918:4954:127;;;;;;:::i;:::-;1625:10:91;918:4954:127;;;3601:295:88;918:4954:127;3601:295:88;;918:4954:127;;3751:28:88;918:4954:127;;3601:295:88;;918:4954:127;3601:295:88;;918:4954:127;3601:295:88;918:4954:127;3601:295:88;;918:4954:127;3601:295:88;;;;918:4954:127;3601:295:88;;;;918:4954:127;;;;;;;:::i;:::-;;;;3514:397:88;;;918:4954:127;;;;;;;;;;3490:431:88;;918:4954:127;3490:431:88;;;:::i;:::-;;918:4954:127;;3490:3:88;-1:-1:-1;;;;;918:4954:127;3490:431:88;;;;;;;;;;;918:4954:127;;;;;2347:424:91;918:4954:127;;;;;;;;:::i;:::-;;;;2347:424:91;;;918:4954:127;-1:-1:-1;;;;;2461:15:91;918:4954:127;;2347:424:91;;918:4954:127;;2347:424:91;;918:4954:127;2347:424:91;3601:295:88;2347:424:91;;918:4954:127;3601:295:88;2347:424:91;;918:4954:127;1625:10:91;918:4954:127;2347:424:91;;918:4954:127;2666:4:91;918:4954:127;2347:424:91;;918:4954:127;2347:424:91;;;918:4954:127;2347:424:91;918:4954:127;1625:10:91;7355:50:89;1625:10:91;7355:50:89;;;2365:1:68;-1:-1:-1;;;;;;;;;;;2407:1:68;918:4954:127;;;;;;3490:431:88;;;;;;918:4954:127;3490:431:88;;918:4954:127;3490:431:88;;;;;;918:4954:127;3490:431:88;;;:::i;:::-;;;918:4954:127;;;;;;;3490:431:88;;;918:4954:127;3490:431:88;;;;;-1:-1:-1;3490:431:88;;;918:4954:127;;;;;;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;2989:103:68;;;:::i;:::-;5587:28:89;;;:::i;:::-;5682:18;918:4954:127;5682:18:89;;918:4954:127;5704:18:89;5682:40;;;5678:104;;5891:26;;;-1:-1:-1;;;;;918:4954:127;;;5891:31:89;5887:62;;918:4954:127;-1:-1:-1;;;;;918:4954:127;5964:15:89;:44;5960:100;;918:4954:127;;6124:3:89;-1:-1:-1;;;;;918:4954:127;;;;;:::i;:::-;;;;;;6201:43:89;;918:4954:127;;;;;;;:::i;:::-;;;;6148:98:89;;918:4954:127;6124:132:89;;;;;918:4954:127;;-1:-1:-1;;;6124:132:89;;918:4954:127;;;6124:132:89;;918:4954:127;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;-1:-1:-1;;6124:132:89;;;;;;918:4954:127;-1:-1:-1;6120:207:89;;-1:-1:-1;;;6295:21:89;;918:4954:127;;;;-1:-1:-1;6295:21:89;6120:207;918:4954:127;6120:207:89;6478:21;918:4954:127;;;;;6478:21:89;;918:4954:127;;;6457:43:89;918:4954:127;;6457:43:89;;;918:4954:127;-1:-1:-1;;;;;;;;;;;2407:1:68;918:4954:127;;;;6124:132:89;;;;;918:4954:127;6124:132:89;;:::i;:::-;918:4954:127;6124:132:89;;;;5960:100;5931:18;;;918:4954:127;6031:18:89;918:4954:127;;6031:18:89;5678:104;5745:26;;;918:4954:127;5745:26:89;918:4954:127;;5745:26:89;918:4954:127;;1442:1461:9;918:4954:127;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;918:4954:127:-;;;;;;-1:-1:-1;;918:4954:127;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;918:4954:127;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;918:4954:127;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;2937:44:88;;2962:18;918:4954:127;2937:44:88;;918:4954:127;;;2937:44:88;918:4954:127;;;;;;2937:14:88;918:4954:127;2937:44:88;;;;;;918:4954:127;2937:44:88;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;2937:44:88:-;;;;918:4954:127;2937:44:88;;;;;;:::i;:::-;;;918:4954:127;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;2937:44:88;;;918:4954:127;;;;;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;;1204:43:88;918:4954:127;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;1055:104:6;;918:4954:127;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;918:4954:127;;;;;;;;;;;;1055:104:6;;;918:4954:127;;;;-1:-1:-1;;;918:4954:127;;;;;;;;;;;;;;;;;-1:-1:-1;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;1055:104:6;;4918:16:127;;1055:104:6;;;;;;:::i;:::-;918:4954:127;;;;;1055:104:6;918:4954:127;;1055:104:6;918:4954:127;;;;:::i;:::-;;;;;;-1:-1:-1;;918:4954:127;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;5252:16;;2176:12:91;918:4954:127;;;;;;;;5252:16;;;;:::i;:::-;;4918;;5252;;;;;;:::i;:::-;2176:12:91;:::i;:::-;918:4954:127;;;;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;2176:12:91;4918:16:127;918:4954;;4918:16;918:4954;;:::i;:::-;;;;;;;;;4918:16;;;;:::i;:::-;;;;;;;;;;:::i;:::-;4952:10;2176:12:91;;:::i;918:4954:127:-;;;;;;-1:-1:-1;;918:4954:127;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;573:41:87;;;:81;;;;918:4954:127;;;;;;;573:81:87;-1:-1:-1;;;2366:40:89;;;-1:-1:-1;2366:80:89;;;;573:81:87;;;;;2366:80:89;-1:-1:-1;;;829:40:77;;-1:-1:-1;2366:80:89;;;918:4954:127;;;;-1:-1:-1;;;;;918:4954:127;;;;;;:::o;:::-;;;-1:-1:-1;;;;;918:4954:127;;;;;;:::o;:::-;;;-1:-1:-1;;;;;918:4954:127;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;918:4954:127;;;;;;;;-1:-1:-1;;918:4954:127;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;:::o;:::-;;;;-1:-1:-1;918:4954:127;;;;;-1:-1:-1;918:4954:127;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;:::o;:::-;;;4918:16;;918:4954;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;:::o;:::-;-1:-1:-1;;;;;918:4954:127;;;;;;-1:-1:-1;;918:4954:127;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;918:4954:127;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;918:4954:127;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;918:4954:127;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;-1:-1:-1;;918:4954:127;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;918:4954:127;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;918:4954:127;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;918:4954:127;;;;;;:::o;:::-;;;-1:-1:-1;;;;;918:4954:127;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;918:4954:127;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;:::o;2328:245::-;2482:34;2328:245;2482:34;918:4954;;;2482:34;;;;;;:::i;:::-;918:4954;;2482:34;2551:14;;;;-1:-1:-1;;;;;918:4954:127;;;;2328:245::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;918:4954:127;;;;;;;;;;;;;4064:22:9;;;;4060:87;;918:4954:127;;;;;;;;;;;;;;4274:33:9;918:4954:127;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;918:4954:127;;3896:19:9;918:4954:127;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;918:4954:127;;;;3881:1:9;918:4954:127;;;;;3881:1:9;918:4954:127;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;3865:779:127;4074:17;;;918:4954;4095:18;4074:39;4070:57;;4169:45;4180:15;4259:36;4180:15;;;4074:17;918:4954;;;4169:45;;;;;;:::i;:::-;918:4954;4074:17;918:4954;;;4259:36;;;;;;:::i;:::-;4313:21;;;918:4954;4313:21;4338:25;;918:4954;4313:50;:136;;;;3865:779;4313:212;;;3865:779;4313:252;;;3865:779;4313:324;;;4306:331;;3865:779;:::o;4313:324::-;4074:17;4591:13;;;;;;918:4954;;;;;4581:24;4619:17;;;4074;918:4954;;;;4609:28;4581:56;3865:779;:::o;4313:252::-;918:4954;;;;-1:-1:-1;;;;;918:4954:127;;;;;4529:36;;-1:-1:-1;4313:252:127;;:212;4465:26;;;;;918:4954;;;4465:26;4495:30;;918:4954;;;4465:60;4313:212;;;:136;4379:31;;-1:-1:-1;;;;;4379:31:127;;;918:4954;;-1:-1:-1;;;;;4379:31:127;4414:35;;918:4954;;4379:70;4313:136;;;4070:57;4115:12;;918:4954;4115:12;:::o;918:4954::-;;;;;;;:::i;:::-;-1:-1:-1;918:4954:127;;;;;;;;;;;;;;;;;;;;;;:::o;2989:103:68:-;3490:431:88;2989:103:68;;;:::i;:::-;3559:18:88;918:4954:127;-1:-1:-1;;;;;918:4954:127;;;;;;:::i;:::-;;;;;;;;;;;;3601:295:88;;;;918:4954:127;3601:295:88;3751:28;918:4954:127;;3601:295:88;;918:4954:127;3601:295:88;;918:4954:127;;3601:295:88;;;918:4954:127;3601:295:88;;;;918:4954:127;;3601:295:88;;;918:4954:127;;;;;;;:::i;3490:431:88:-;;918:4954:127;;3490:3:88;-1:-1:-1;;;;;918:4954:127;3490:431:88;;;;;;;918:4954:127;3490:431:88;;;2989:103:68;918:4954:127;;2347:424:91;918:4954:127;;;;;;;;:::i;:::-;;;;3601:295:88;2347:424:91;;918:4954:127;-1:-1:-1;;;;;2461:15:91;918:4954:127;;2347:424:91;;918:4954:127;3601:295:88;2347:424:91;;918:4954:127;;3601:295:88;2347:424:91;;918:4954:127;;3601:295:88;2347:424:91;;918:4954:127;2347:424:91;918:4954:127;2347:424:91;;918:4954:127;2666:4:91;918:4954:127;2347:424:91;;918:4954:127;2347:424:91;;;918:4954:127;2347:424:91;918:4954:127;7355:50:89;;918:4954:127;7355:50:89;;2407:1:68;2365;-1:-1:-1;;;;;;;;;;;2407:1:68;2989:103::o;3490:431:88:-;;;;;;3601:295;3490:431;;3601:295;3490:431;;;;;;918:4954:127;3490:431:88;;;:::i;:::-;;;918:4954:127;;;;2347:424:91;918:4954:127;;3490:431:88;;;;;;;;;-1:-1:-1;3490:431:88;;1343:634:72;1465:17;-1:-1:-1;29298:17:79;-1:-1:-1;;;29298:17:79;;;29294:103;;1343:634:72;29414:17:79;29423:8;29994:7;29414:17;;;29410:103;;1343:634:72;29539:8:79;29530:17;;;29526:103;;1343:634:72;29655:7:79;29646:16;;;29642:100;;1343:634:72;29768:7:79;29759:16;;;29755:100;;1343:634:72;29881:7:79;29872:16;;;29868:100;;1343:634:72;29985:16:79;;29981:66;;1343:634:72;29994:7:79;1580:94:72;1485:1;918:4954:127;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;4918:16;;918:4954;;:::i;:::-;;;;;;;1580:94:72;;;1687:247;-1:-1:-1;;918:4954:127;;-1:-1:-1;;;1741:111:72;;;;918:4954:127;1741:111:72;918:4954:127;1902:10:72;;1898:21;;29994:7:79;1687:247:72;;;;1898:21;1914:5;;1343:634;:::o;29981:66:79:-;30031:1;918:4954:127;;;;29981:66:79;;29868:100;29881:7;29952:1;918:4954:127;;;;29868:100:79;;;29755;29768:7;29839:1;918:4954:127;;;;29755:100:79;;;29642;29655:7;29726:1;918:4954:127;;;;29642:100:79;;;29526:103;29539:8;29612:2;918:4954:127;;;;29526:103:79;;;29410;29423:8;29496:2;918:4954:127;;;;29410:103:79;;;29294;-1:-1:-1;29380:2:79;;-1:-1:-1;;;;918:4954:127;;29294:103:79;;6040:128:9;6109:4;-1:-1:-1;;;;;918:4954:127;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;2506:271:88;2733:20;;918:4954:127;;;;;;;;;;;;;2765:4:88;2733:37;2506:271;:::o;3749:292:68:-;2407:1;-1:-1:-1;;;;;;;;;;;918:4954:127;4560:63:68;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:68;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:68;;-1:-1:-1;3696:30:68;918:4954:127;;;;;;;:::i;:::-;;;;-1:-1:-1;918:4954:127;;-1:-1:-1;918:4954:127;;;;-1:-1:-1;918:4954:127;;;;-1:-1:-1;918:4954:127;;;;-1:-1:-1;918:4954:127;;;;-1:-1:-1;918:4954:127;;;;-1:-1:-1;918:4954:127;;;;-1:-1:-1;918:4954:127;;;;-1:-1:-1;918:4954:127;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;:::i;:::-;;;;;;:::o;6683:257:89:-;;918:4954:127;;:::i;:::-;-1:-1:-1;918:4954:127;;-1:-1:-1;;;6808:23:89;;;;;918:4954:127;;;;-1:-1:-1;918:4954:127;6808:23:89;918:4954:127;6808:3:89;-1:-1:-1;;;;;918:4954:127;6808:23:89;;;;;;;-1:-1:-1;6808:23:89;;;6683:257;6794:37;;918:4954:127;6845:29:89;;;:55;;;;;6683:257;6841:92;;;;6683:257;:::o;6841:92::-;6909:24;;;-1:-1:-1;6909:24:89;6808:23;918:4954:127;6808:23:89;-1:-1:-1;6909:24:89;6845:55;6878:22;;;-1:-1:-1;6845:55:89;;;;6808:23;;;;;;;-1:-1:-1;6808:23:89;;;;;;:::i;:::-;;;;;1185:321:122;918:4954:127;;1284:28:122;1280:64;;-1:-1:-1;;;;;801:25:122;;;918:4954:127;;801:30:122;;;:78;;;;1185:321;1354:55;;;1057:25;;918:4954:127;-1:-1:-1;;;;;918:4954:127;1419:58:122;;1495:4;1185:321;:::o;1419:58::-;1457:20;;;-1:-1:-1;1457:20:122;;-1:-1:-1;1457:20:122;1354:55;1392:17;;;-1:-1:-1;1392:17:122;;-1:-1:-1;1392:17:122;801:78;864:15;;;-1:-1:-1;835:44:122;801:78;;;1280:64;1321:23;;;-1:-1:-1;1321:23:122;;-1:-1:-1;1321:23:122;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;918:4954:127;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 3996,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 4039,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 4082,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 7023,
          "length": 32
        }
      ],
      "58751": [
        {
          "start": 3603,
          "length": 32
        }
      ],
      "58755": [
        {
          "start": 680,
          "length": 32
        },
        {
          "start": 1866,
          "length": 32
        },
        {
          "start": 2389,
          "length": 32
        },
        {
          "start": 2785,
          "length": 32
        },
        {
          "start": 6403,
          "length": 32
        },
        {
          "start": 7498,
          "length": 32
        }
      ],
      "58758": [
        {
          "start": 328,
          "length": 32
        },
        {
          "start": 1930,
          "length": 32
        },
        {
          "start": 2213,
          "length": 32
        },
        {
          "start": 2706,
          "length": 32
        },
        {
          "start": 3553,
          "length": 32
        },
        {
          "start": 3930,
          "length": 32
        },
        {
          "start": 5956,
          "length": 32
        },
        {
          "start": 6251,
          "length": 32
        }
      ],
      "58761": [
        {
          "start": 2093,
          "length": 32
        },
        {
          "start": 2280,
          "length": 32
        },
        {
          "start": 6327,
          "length": 32
        }
      ],
      "66200": [
        {
          "start": 997,
          "length": 32
        },
        {
          "start": 1506,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "ATTESTATION_SCHEMA_REVOCABLE()": "b587a5eb",
    "VALIDATION_SCHEMA()": "df61dd2c",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "8da3721a",
    "collect(bytes32,bytes32)": "ea6ec49c",
    "decodeCondition(bytes)": "760bd118",
    "decodeObligationData(bytes)": "c93844be",
    "doObligation((address,bytes,bytes32,uint64,bool),uint64)": "3ce645d5",
    "doObligationFor((address,bytes,bytes32,uint64,bool),uint64,address)": "4e3fa926",
    "doObligationRaw(bytes,uint64,bytes32)": "b3b902d4",
    "getObligationData(bytes32)": "c6ec5070",
    "getSchema()": "6b122fe0",
    "isPayable()": "ce46e046",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "reclaim(bytes32)": "96afb365",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "supportsInterface(bytes4)": "01ffc9a7",
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillmentUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"escrower\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"escrower\",\"type\":\"address\"}],\"name\":\"EscrowReclaimed\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA_REVOCABLE\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"VALIDATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"check\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collect\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeCondition\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct AttestationReferenceEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct AttestationReferenceEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct AttestationReferenceEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct AttestationReferenceEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaim\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"details\":\"Uses the default escrow checks: fulfillment must reference the escrow UID and pass intrinsic attestation validation.\",\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"params\":{\"demand\":\"Arbiter-specific demand data encoded by the escrow creator.\",\"escrowUid\":\"The UID of the escrow attestation being fulfilled.\",\"fulfillment\":\"The EAS attestation being used as fulfillment.\"}},\"collect(bytes32,bytes32)\":{\"params\":{\"escrowUid\":\"UID of the escrow attestation.\",\"fulfillmentUid\":\"UID of the fulfillment attestation.\"},\"returns\":{\"_0\":\"Escrow-specific return data from the underlying release logic.\"}},\"decodeCondition(bytes)\":{\"params\":{\"escrowData\":\"ABI-encoded escrow obligation data.\"},\"returns\":{\"arbiter\":\"Address of the arbiter that validates fulfillment.\",\"demand\":\"Arbiter-specific demand bytes.\"}},\"doObligationRaw(bytes,uint64,bytes32)\":{\"params\":{\"data\":\"ABI-encoded obligation data.\",\"expirationTime\":\"EAS expiration timestamp, or zero for no expiration.\",\"refUID\":\"Reference UID stored on the EAS attestation.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"reclaim(bytes32)\":{\"params\":{\"escrowUid\":\"UID of the escrow attestation.\"},\"returns\":{\"_0\":\"True if the reclaim succeeds.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"title\":\"AttestationReferenceEscrowObligation\",\"version\":1},\"userdoc\":{\"errors\":{\"AttestationNotFound(bytes32)\":[{\"notice\":\"Raised when EAS has no attestation for the requested UID.\"}],\"AttestationRevoked()\":[{\"notice\":\"Raised when an attestation has been revoked.\"}],\"DeadlineExpired()\":[{\"notice\":\"Raised when an attestation has expired.\"}],\"InvalidAttestationUid()\":[{\"notice\":\"Raised when an attestation UID is zero.\"}],\"InvalidEscrowAttestation()\":[{\"notice\":\"Raised when the escrow attestation is missing, invalid, expired, revoked, or has the wrong schema.\"}],\"InvalidFulfillment()\":[{\"notice\":\"Raised when the fulfillment does not satisfy the escrow's default checks or arbiter.\"}],\"NotFromThisAttester()\":[{\"notice\":\"Raised when an attestation does not belong to this contract's schema.\"}],\"RevocationFailed(bytes32)\":[{\"notice\":\"Raised when revoking the escrow attestation fails during collect or reclaim.\"}],\"SchemaRegistrationFailed(bytes32)\":[{\"notice\":\"Raised when a schema cannot be registered or found at its deterministic UID.\"}],\"UnauthorizedCall()\":[{\"notice\":\"Raised when a caller attempts an action that is not currently permitted.\"}]},\"events\":{\"EscrowCollected(bytes32,bytes32,address)\":{\"notice\":\"Emitted when an escrow is successfully collected by a fulfillment recipient.\"},\"EscrowMade(bytes32,address)\":{\"notice\":\"Emitted when escrow assets are locked and the escrow attestation is created.\"},\"EscrowReclaimed(bytes32,address)\":{\"notice\":\"Emitted when an expired escrow is reclaimed by its original escrower.\"}},\"kind\":\"user\",\"methods\":{\"ATTESTATION_SCHEMA()\":{\"notice\":\"UID of the schema used by attestations created by this contract.\"},\"ATTESTATION_SCHEMA_REVOCABLE()\":{\"notice\":\"Whether attestations under `ATTESTATION_SCHEMA` are revocable.\"},\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"notice\":\"Returns true when `fulfillment` satisfies `demand` for `escrowUid`.\"},\"collect(bytes32,bytes32)\":{\"notice\":\"Collects an escrow using a fulfillment attestation.\"},\"decodeCondition(bytes)\":{\"notice\":\"Decodes an escrow attestation's condition into arbiter and demand data.\"},\"decodeObligationData(bytes)\":{\"notice\":\"Decodes ABI-encoded attestation-reference escrow data.\"},\"doObligation((address,bytes,bytes32,uint64,bool),uint64)\":{\"notice\":\"Creates an escrow attestation that certifies an existing attestation reference.\"},\"doObligationFor((address,bytes,bytes32,uint64,bool),uint64,address)\":{\"notice\":\"Creates an attestation-reference escrow for an explicit recipient.\"},\"doObligationRaw(bytes,uint64,bytes32)\":{\"notice\":\"Creates an obligation attestation from pre-encoded data.\"},\"getObligationData(bytes32)\":{\"notice\":\"Loads and decodes attestation-reference escrow data from this contract's attestation.\"},\"getSchema()\":{\"notice\":\"Returns the schema record registered for this attester.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"reclaim(bytes32)\":{\"notice\":\"Reclaims an expired escrow and returns locked assets to the escrower.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"notice\":\"Escrows a reference to an existing attestation behind an arbiter-defined fulfillment condition.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/default/AttestationReferenceEscrowObligation.sol\":\"AttestationReferenceEscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377\",\"dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/BaseArbiter.sol\":{\"keccak256\":\"0x27fa97834bcd6e592f3b534e64859b208c688363d33fb9b62436d009ffff3ed1\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b61ac6195ae644325adf77fdb301651cddfca4b63d9db5123ee075869f3784aa\",\"dweb:/ipfs/QmYRu5hER8gaMjqyY5bDV9EAwVN12CbS3Z2bW8dLp7sPSE\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0x12339a862aa0571244f4a0c2dae1a7bcc1734717474dbf0d69b63886987d1f99\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d40e983dece581ecb49a1a01bc87c66e86f8c954cc442a02151ec427d680682d\",\"dweb:/ipfs/QmVA7Tqk1KaYhrZpxWx3cdsjUoxsRaoBjJX8k6nCSEk8En\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0x49717032f4edbbfd52bf160a99b7b39f726e8a2f968ed4b261ee31b1622a22ac\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://1aba86a5094f4be28de1c5782087aff65c6d0bbc8ab124501e0677b5cab843f2\",\"dweb:/ipfs/QmXfo8c532ALhAUC9iae2mrSWLmDTSABunMJP2iU7PpKek\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xf00b1317dd9203ea59e8da6c0bb23267b50ecb2751cd11b26a6330d1e596eb7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5b9762a2ba2251c6ae9d23aa3ba49a8124f3348ac13c9271b8b9ada438dff475\",\"dweb:/ipfs/QmeBZUvNjNyC7W1hb1PKQq8CawC5ULWX9KXgJjH37wvPGH\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x00f3f5d8460c738eff4a776cf309efe38342fcc951abfe97d1c2e285acb1e330\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://7201a176f3d5c3d01ca13bbcd9ef5587effe8fabf20e0b8f81f2d6ee362269b9\",\"dweb:/ipfs/QmXn9aSvoGPQuNTxe3mM47RNQ1bfYCEczQCYsDDM9ohc8M\"]},\"src/IEscrow.sol\":{\"keccak256\":\"0x8803bb72e285722a5e90f08046cfee7d37acc6cf83c13a5074cfb0740e316a45\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://965024e29be08418fd9acef578b5253af5fb0d39227c291298d83dae5d7ffd01\",\"dweb:/ipfs/QmPh2h21EC6L4aWauvk5cFzc4x3Xf4f1brxyrgxeKUuWEs\"]},\"src/libraries/ArbiterUtils.sol\":{\"keccak256\":\"0xb87e2bfb9c7292daf6426fbedc09c8683b92841d1b92e7359c0ff94d42be632f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3acf498c3c59891d76db768ea57d8f7f6b4010dcbaf44a5f93d95d72f0b12441\",\"dweb:/ipfs/QmVbkioM8dWwYxqatm1dyo9PRFNZ6c7Kbang7pozbnyS7j\"]},\"src/libraries/SchemaRegistryUtils.sol\":{\"keccak256\":\"0x81e4728ad79515866f28175a00a512afd2f7010bd109ae221defb29a87430cd0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://4edac7284c764f1236b5875ed00f357f0e30aecc5006c88afe220bef60b541d3\",\"dweb:/ipfs/QmXj8oLa1RXMgHCXtgdbriVqQFgX6rjnPNbmQpwpK2YXsK\"]},\"src/obligations/escrow/default/AttestationReferenceEscrowObligation.sol\":{\"keccak256\":\"0x7029fdaa296e284b9f30f4b77493ff768f63c3d4ce0ee78411dc5439c9bc96b3\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://1a618255ef4385c169c3ad68c3b694edebc9d455a15b1fb5a9768cf08906fd11\",\"dweb:/ipfs/QmTCbUyZFPTAmigtRHURJZxkys6ar9Up7n4SXga8Cddr1P\"]}},\"version\":1}",
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
              "name": "escrowUid",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "fulfillmentUid",
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
              "name": "escrowUid",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "escrower",
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
              "internalType": "bytes32",
              "name": "escrowUid",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "escrower",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "EscrowReclaimed",
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
          "name": "ATTESTATION_SCHEMA_REVOCABLE",
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
          "name": "VALIDATION_SCHEMA",
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
          "name": "check",
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
          "name": "collect",
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
          "name": "decodeCondition",
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
              "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
                  "internalType": "bytes32",
                  "name": "attestationUid",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "validationExpirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bool",
                  "name": "validationRevocable",
                  "type": "bool"
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
                  "internalType": "bytes32",
                  "name": "attestationUid",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "validationExpirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bool",
                  "name": "validationRevocable",
                  "type": "bool"
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
              "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
                  "internalType": "bytes32",
                  "name": "attestationUid",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "validationExpirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bool",
                  "name": "validationRevocable",
                  "type": "bool"
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
              "internalType": "struct AttestationReferenceEscrowObligation.ObligationData",
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
                  "internalType": "bytes32",
                  "name": "attestationUid",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint64",
                  "name": "validationExpirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bool",
                  "name": "validationRevocable",
                  "type": "bool"
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
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "reclaim",
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
          "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
            "params": {
              "demand": "Arbiter-specific demand data encoded by the escrow creator.",
              "escrowUid": "The UID of the escrow attestation being fulfilled.",
              "fulfillment": "The EAS attestation being used as fulfillment."
            }
          },
          "collect(bytes32,bytes32)": {
            "params": {
              "escrowUid": "UID of the escrow attestation.",
              "fulfillmentUid": "UID of the fulfillment attestation."
            },
            "returns": {
              "_0": "Escrow-specific return data from the underlying release logic."
            }
          },
          "decodeCondition(bytes)": {
            "params": {
              "escrowData": "ABI-encoded escrow obligation data."
            },
            "returns": {
              "arbiter": "Address of the arbiter that validates fulfillment.",
              "demand": "Arbiter-specific demand bytes."
            }
          },
          "doObligationRaw(bytes,uint64,bytes32)": {
            "params": {
              "data": "ABI-encoded obligation data.",
              "expirationTime": "EAS expiration timestamp, or zero for no expiration.",
              "refUID": "Reference UID stored on the EAS attestation."
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
          "reclaim(bytes32)": {
            "params": {
              "escrowUid": "UID of the escrow attestation."
            },
            "returns": {
              "_0": "True if the reclaim succeeds."
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
          "ATTESTATION_SCHEMA()": {
            "notice": "UID of the schema used by attestations created by this contract."
          },
          "ATTESTATION_SCHEMA_REVOCABLE()": {
            "notice": "Whether attestations under `ATTESTATION_SCHEMA` are revocable."
          },
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "notice": "Processes an attestation and verifies whether it's valid."
          },
          "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
            "notice": "Returns true when `fulfillment` satisfies `demand` for `escrowUid`."
          },
          "collect(bytes32,bytes32)": {
            "notice": "Collects an escrow using a fulfillment attestation."
          },
          "decodeCondition(bytes)": {
            "notice": "Decodes an escrow attestation's condition into arbiter and demand data."
          },
          "decodeObligationData(bytes)": {
            "notice": "Decodes ABI-encoded attestation-reference escrow data."
          },
          "doObligation((address,bytes,bytes32,uint64,bool),uint64)": {
            "notice": "Creates an escrow attestation that certifies an existing attestation reference."
          },
          "doObligationFor((address,bytes,bytes32,uint64,bool),uint64,address)": {
            "notice": "Creates an attestation-reference escrow for an explicit recipient."
          },
          "doObligationRaw(bytes,uint64,bytes32)": {
            "notice": "Creates an obligation attestation from pre-encoded data."
          },
          "getObligationData(bytes32)": {
            "notice": "Loads and decodes attestation-reference escrow data from this contract's attestation."
          },
          "getSchema()": {
            "notice": "Returns the schema record registered for this attester."
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
          "reclaim(bytes32)": {
            "notice": "Reclaims an expired escrow and returns locked assets to the escrower."
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
        "src/obligations/escrow/default/AttestationReferenceEscrowObligation.sol": "AttestationReferenceEscrowObligation"
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
      "src/BaseArbiter.sol": {
        "keccak256": "0x27fa97834bcd6e592f3b534e64859b208c688363d33fb9b62436d009ffff3ed1",
        "urls": [
          "bzz-raw://b61ac6195ae644325adf77fdb301651cddfca4b63d9db5123ee075869f3784aa",
          "dweb:/ipfs/QmYRu5hER8gaMjqyY5bDV9EAwVN12CbS3Z2bW8dLp7sPSE"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseAttester.sol": {
        "keccak256": "0x12339a862aa0571244f4a0c2dae1a7bcc1734717474dbf0d69b63886987d1f99",
        "urls": [
          "bzz-raw://d40e983dece581ecb49a1a01bc87c66e86f8c954cc442a02151ec427d680682d",
          "dweb:/ipfs/QmVA7Tqk1KaYhrZpxWx3cdsjUoxsRaoBjJX8k6nCSEk8En"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseEscrowObligation.sol": {
        "keccak256": "0x49717032f4edbbfd52bf160a99b7b39f726e8a2f968ed4b261ee31b1622a22ac",
        "urls": [
          "bzz-raw://1aba86a5094f4be28de1c5782087aff65c6d0bbc8ab124501e0677b5cab843f2",
          "dweb:/ipfs/QmXfo8c532ALhAUC9iae2mrSWLmDTSABunMJP2iU7PpKek"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseObligation.sol": {
        "keccak256": "0xf00b1317dd9203ea59e8da6c0bb23267b50ecb2751cd11b26a6330d1e596eb7b",
        "urls": [
          "bzz-raw://5b9762a2ba2251c6ae9d23aa3ba49a8124f3348ac13c9271b8b9ada438dff475",
          "dweb:/ipfs/QmeBZUvNjNyC7W1hb1PKQq8CawC5ULWX9KXgJjH37wvPGH"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x00f3f5d8460c738eff4a776cf309efe38342fcc951abfe97d1c2e285acb1e330",
        "urls": [
          "bzz-raw://7201a176f3d5c3d01ca13bbcd9ef5587effe8fabf20e0b8f81f2d6ee362269b9",
          "dweb:/ipfs/QmXn9aSvoGPQuNTxe3mM47RNQ1bfYCEczQCYsDDM9ohc8M"
        ],
        "license": "UNLICENSED"
      },
      "src/IEscrow.sol": {
        "keccak256": "0x8803bb72e285722a5e90f08046cfee7d37acc6cf83c13a5074cfb0740e316a45",
        "urls": [
          "bzz-raw://965024e29be08418fd9acef578b5253af5fb0d39227c291298d83dae5d7ffd01",
          "dweb:/ipfs/QmPh2h21EC6L4aWauvk5cFzc4x3Xf4f1brxyrgxeKUuWEs"
        ],
        "license": "UNLICENSED"
      },
      "src/libraries/ArbiterUtils.sol": {
        "keccak256": "0xb87e2bfb9c7292daf6426fbedc09c8683b92841d1b92e7359c0ff94d42be632f",
        "urls": [
          "bzz-raw://3acf498c3c59891d76db768ea57d8f7f6b4010dcbaf44a5f93d95d72f0b12441",
          "dweb:/ipfs/QmVbkioM8dWwYxqatm1dyo9PRFNZ6c7Kbang7pozbnyS7j"
        ],
        "license": "UNLICENSED"
      },
      "src/libraries/SchemaRegistryUtils.sol": {
        "keccak256": "0x81e4728ad79515866f28175a00a512afd2f7010bd109ae221defb29a87430cd0",
        "urls": [
          "bzz-raw://4edac7284c764f1236b5875ed00f357f0e30aecc5006c88afe220bef60b541d3",
          "dweb:/ipfs/QmXj8oLa1RXMgHCXtgdbriVqQFgX6rjnPNbmQpwpK2YXsK"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/default/AttestationReferenceEscrowObligation.sol": {
        "keccak256": "0x7029fdaa296e284b9f30f4b77493ff768f63c3d4ce0ee78411dc5439c9bc96b3",
        "urls": [
          "bzz-raw://1a618255ef4385c169c3ad68c3b694edebc9d455a15b1fb5a9768cf08906fd11",
          "dweb:/ipfs/QmTCbUyZFPTAmigtRHURJZxkys6ar9Up7n4SXga8Cddr1P"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 127
} as const;
