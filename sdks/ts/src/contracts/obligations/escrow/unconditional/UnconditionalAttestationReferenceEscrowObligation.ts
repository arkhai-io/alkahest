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
          "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
          "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
          "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
          "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
    "object": "0x6101a0806040523461026f576040816123cb80380380916100208285610273565b83398101031261026f5780516001600160a01b0381169182820361026f5760200151906001600160a01b03821680830361026f576040519361006360a086610273565b607085527f6164647265737320617262697465722c2062797465732064656d616e642c206260208601527f797465733332206174746573746174696f6e5569642c2075696e74363420766160408601527f6c69646174696f6e45787069726174696f6e54696d652c20626f6f6c2076616c60608601526f69646174696f6e5265766f6361626c6560801b60808601526001608052600360a0525f60c052156102605761018e93826101279360e052610120528361010052600161016052309161038e565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f005560405161015d604082610273565b601f81527f627974657333322076616c6964617465644174746573746174696f6e556964006020820152309161038e565b61018052604051611e61908161056a823960805181610fd0015260a05181610ffb015260c05181611026015260e05181611b3201526101005181610e470152610120518181816102b30152818161077e0152818161098901528181610b15015281816118c60152611d0d01526101405181818161013d015281816107be015281816108d901528181610ac601528181610e1501528181610f8e01528181611707015261182e0152610160518181816108610152818161091c015261187a0152610180518181816103f001526106160152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b0382119082101761029657604052565b634e487b7160e01b5f52604160045260245ffd5b60208183031261026f578051906001600160401b03821161026f57019060808282031261026f5760405191608083016001600160401b03811184821017610296576040528051835260208101516001600160a01b038116810361026f5760208401526040810151801515810361026f5760408401526060810151906001600160401b03821161026f570181601f8201121561026f578051906001600160401b0382116102965760405192610368601f8401601f191660200185610273565b8284526020838301011161026f57815f9260208093018386015e83010152606082015290565b929160405190602082018351926103d86015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a19810184520182610273565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156104e95787915f9161054f575b505114610549579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610515575b506104f457505f602491604051928380926351753e3760e11b82528760048301525afa80156104e95783915f916104c7575b5051146104c55750639e6113d560e01b5f5260045260245ffd5b565b6104e391503d805f833e6104db8183610273565b8101906102aa565b5f6104ab565b6040513d5f823e3d90fd5b91928091508203610503575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d602011610541575b8161053160209383610273565b8101031261026f5751905f610479565b3d9150610524565b50505050565b61056391503d805f833e6104db8183610273565b5f61041356fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c9081633ce645d514611138575080634e3fa926146110b357806354fd4d5014610fb15780635bf2f20d14610f775780636b122fe014610dd6578063760bd11814610d7857806388e5b2d914610c435780638da3721a14610c6257806391db0b7e14610c4357806396afb36514610a97578063b3b902d414610886578063b587a5eb14610849578063c6ec50701461073d578063c93844be14610655578063ce46e04614610639578063df61dd2c146105fe578063e49617e1146105d9578063e60c3505146105d95763ea6ec49c0361000f57346105d65760403660031901126105d65760243590600435610122611b8a565b61012b81611ce7565b61013484611ce7565b906020810151907f00000000000000000000000000000000000000000000000000000000000000008092036105c7578051156105b8576001600160401b0360608201511680151590816105ad575b5061059e576001600160401b0360808201511661058f5761027360206101208084019360c0876102856101b58851611633565b9190945191604051988997889687966346d1b90d60e11b885260606004890152805160648901528b81015160848901526001600160401b0360408201511660a48901526001600160401b0360608201511660c48901526001600160401b0360808201511660e489015260a0810151610104890152019d8e60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a48601906111dd565b848103600319016024860152906111dd565b604483019190915203916001600160a01b03165afa90811561058457869161054a575b501561053b576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692906102e68161124c565b858152866020820152604051916102fc8361124c565b82526020820152823b1561053757604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015285808260648183885af19182610522575b505061035f5763614cf93960e01b85526004849052602485fd5b6104318594939260209261038660018060a01b0386511691518580825183010191016115a2565b6001600160401b0360608201511690604060808201511515910151906040519282888501528784526103b960408561129d565b604051946103c686611282565b8552878501526040840152606083015260808201528660a0820152604051906103ee8261124c565b7f000000000000000000000000000000000000000000000000000000000000000082528482015260405196878094819363f17325e760e01b835260048301611d95565b03925af19283156105175784936104bd575b50907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0946104b993926040519360208501526020845261048460408561129d565b516040519687966001600160a01b03909216939180a460015f516020611e0c5f395f51905f52556020835260208301906111dd565b0390f35b9250906020833d60201161050f575b816104d96020938361129d565b8101031261050b57915191907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0610443565b5f80fd5b3d91506104cc565b6040513d86823e3d90fd5b8161052c9161129d565b61053757855f610345565b8580fd5b630ebe58ef60e11b8552600485fd5b90506020813d60201161057c575b816105656020938361129d565b81010312610537576105769061151d565b5f6102a8565b3d9150610558565b6040513d88823e3d90fd5b637b6227e960e11b8552600485fd5b631ab7da6b60e01b8552600485fd5b90504210155f610182565b635c2c7f8960e01b8552600485fd5b63629cd40b60e11b8552600485fd5b80fd5b60206105f46105e73661143d565b6105ef611b30565b611b71565b6040519015158152f35b50346105d657806003193601126105d65760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346105d657806003193601126105d657602090604051908152f35b50346105d65760203660031901126105d6576004356001600160401b038111610735576106869036906004016113ba565b6106919291926117f5565b50820191602081840312610735578035906001600160401b03821161073957019160a08382031261073557604051916106c983611267565b6106d2846111c9565b83526020840135906001600160401b0382116105d65750836106fe610724936080936104b9970161130f565b602085015260408101356040850152610719606082016111b5565b6060850152016113ad565b6080820152604051918291826113e7565b5080fd5b8280fd5b50346105d65760203660031901126105d6576107576117f5565b50610760611bc2565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561083c578192610818575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610809576104b96107fd610120840151602080825183010191016115a2565b604051918291826113e7565b635527981560e11b8152600490fd5b6108359192503d8084833e61082d818361129d565b810190611c0c565b905f6107b6565b50604051903d90823e3d90fd5b50346105d657806003193601126105d65760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b5060603660031901126105d6576004356001600160401b038111610735576108b56109849136906004016113ba565b92906108ce6108c261119f565b916044359536916112d9565b906108d7611b8a565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b036040519161090e83611282565b3383521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201528860608201528560808201528660a0820152604051906109638261124c565b858252828201526040518098819263f17325e760e01b835260048301611d95565b0381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610a8c578596610a51575b50906020966101209392604051936109d885611230565b888552898501526001600160401b0342166040850152606084015285608084015260a08301523360c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f516020611e0c5f395f51905f5255604051908152f35b92919095506020833d602011610a84575b81610a6f6020938361129d565b8101031261050b5791519490919060206109c1565b3d9150610a62565b6040513d87823e3d90fd5b503461050b57602036600319011261050b5760043590610ab5611b8a565b610abe82611ce7565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610c3457606084016001600160401b0381511615610c2557516001600160401b03164210610c25576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610b478161124c565b8381525f602082015260405192610b5d8461124c565b83526020830152803b1561050b57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610c10575b50610bc15763614cf93960e01b825260045260249150fd5b60209260c060018060a01b0391015116907f655ef333d5efcbf5aa343f02bcd9e3539f9c9f9ee8b9cfa7d8910b1bd7e0a8326040519380a360015f516020611e0c5f395f51905f525560018152f35b610c1d9193505f9061129d565b5f915f610ba9565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b60206105f4610c513661135d565b92610c5d929192611b30565b61165c565b3461050b57606036600319011261050b576004356001600160401b03811161050b57610140600319823603011261050b5760405190610ca082611230565b8060040135825260248101356020830152610cbd604482016111b5565b6040830152610cce606482016111b5565b6060830152610cdf608482016111b5565b608083015260a481013560a0830152610cfa60c482016111c9565b60c0830152610d0b60e482016111c9565b60e0830152610d1d61010482016113ad565b610100830152610124810135906001600160401b03821161050b576004610d47923692010161130f565b6101208201526024356001600160401b03811161050b57602091610d726105f492369060040161130f565b90611700565b3461050b57602036600319011261050b576004356001600160401b03811161050b57610dab610db091369060040161130f565b611633565b604080516001600160a01b0390931683526020830181905282916104b9918301906111dd565b3461050b575f36600319011261050b57606080604051610df581611201565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610f6c575f90610ebc575b6060906104b9604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906111dd565b503d805f833e610ecc818361129d565b81019060208183031261050b578051906001600160401b03821161050b570160808183031261050b5760405190610f0282611201565b8051825260208101516001600160a01b038116810361050b576020830152610f2c6040820161151d565b60408301526060810151906001600160401b03821161050b570182601f8201121561050b57606092816020610f639351910161152a565b82820152610e76565b6040513d5f823e3d90fd5b3461050b575f36600319011261050b5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461050b575f36600319011261050b576104b9602061109f6001610ff47f00000000000000000000000000000000000000000000000000000000000000006119c3565b818461101f7f00000000000000000000000000000000000000000000000000000000000000006119c3565b818061104a7f00000000000000000000000000000000000000000000000000000000000000006119c3565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f19810183528261129d565b6040519182916020835260208301906111dd565b3461050b57606036600319011261050b576004356001600160401b03811161050b5760a0600319823603011261050b576110eb61119f565b906044356001600160a01b038116810361050b5760209261111d61112b61113094604051928391600401888301611471565b03601f19810183528261129d565b611820565b604051908152f35b3461050b57604036600319011261050b576004356001600160401b03811161050b5760a0600319823603011261050b57816111309161119860209461118a61117e61119f565b93600401878301611471565b03601f19810184528361129d565b3391611820565b602435906001600160401b038216820361050b57565b35906001600160401b038216820361050b57565b35906001600160a01b038216820361050b57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b0382111761121c57604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b0382111761121c57604052565b604081019081106001600160401b0382111761121c57604052565b60a081019081106001600160401b0382111761121c57604052565b60c081019081106001600160401b0382111761121c57604052565b90601f801991011681019081106001600160401b0382111761121c57604052565b6001600160401b03811161121c57601f01601f191660200190565b9291926112e5826112be565b916112f3604051938461129d565b82948184528183011161050b578281602093845f960137010152565b9080601f8301121561050b5781602061132a933591016112d9565b90565b9181601f8401121561050b578235916001600160401b03831161050b576020808501948460051b01011161050b57565b604060031982011261050b576004356001600160401b03811161050b57816113879160040161132d565b92909291602435906001600160401b03821161050b576113a99160040161132d565b9091565b3590811515820361050b57565b9181601f8401121561050b578235916001600160401b03831161050b576020838186019501011161050b57565b6020815260018060a01b03825116602082015260a06080611416602085015183604086015260c08501906111dd565b93604081015160608501526001600160401b03606082015116828501520151151591015290565b602060031982011261050b57600435906001600160401b03821161050b5761014090829003600319011261050b5760040190565b602081526001600160a01b03611486836111c9565b1660208201526020820135601e198336030181121561050b578201602081359101926001600160401b03821161050b57813603841361050b57608061150a918360e09660a060408801528160c0880152878701375f868587010152604081013560608601526001600160401b036114ff606083016111b5565b1682860152016113ad565b151560a0830152601f01601f1916010190565b5190811515820361050b57565b929192611536826112be565b91611544604051938461129d565b82948184528183011161050b578281602093845f96015e010152565b51906001600160a01b038216820361050b57565b9080601f8301121561050b57815161132a9260200161152a565b51906001600160401b038216820361050b57565b60208183031261050b578051906001600160401b03821161050b570160a08183031261050b57604051916115d583611267565b6115de82611560565b83526020820151916001600160401b03831161050b5761160560809261162b948301611574565b6020850152604081015160408501526116206060820161158e565b60608501520161151d565b608082015290565b61164690602080825183010191016115a2565b80516020909101516001600160a01b0390911691565b9290928184036116f1575f91345b858410156116e657818410156116d2578360051b80860135908282116116c35784013561013e198536030181121561050b576116a7908501611b71565b156116b8576001910393019261166a565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f0000000000000000000000000000000000000000000000000000000000000000036117ef57611746610120611756920151602080825183010191016115a2565b91602080825183010191016115a2565b604082015160408201511491826117ca575b826117b3575b8261179a575b8261177e57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611774565b91506080820151151560808201511515149161176e565b91506001600160401b036060830151166001600160401b036060830151161491611768565b50505f90565b6040519061180282611267565b5f608083828152606060208201528260408201528260608201520152565b6118c19261182c611b8a565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b036040519161186383611282565b60018060a01b0316948583521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201525f60608201528560808201525f60a0820152604051906109638261124c565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610f6c575f96611987575b509061012092916040519261191284611230565b87845260208401526001600160401b034216604084015260608301525f60808301525f60a08301528460c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f516020611e0c5f395f51905f5255565b92919095506020833d6020116119bb575b816119a56020938361129d565b8101031261050b576101209251959091926118fe565b3d9150611998565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b0d575b806d04ee2d6d415b85acef8100000000600a921015611af2575b662386f26fc10000811015611ade575b6305f5e100811015611acd575b612710811015611abe575b6064811015611ab0575b1015611aa5575b600a60216001840193611a4a856112be565b94611a58604051968761129d565b808652611a67601f19916112be565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611aa057600a9091611a72565b505090565b600190910190611a38565b606460029104930192611a31565b61271060049104930192611a27565b6305f5e10060089104930192611a1c565b662386f26fc1000060109104930192611a0f565b6d04ee2d6d415b85acef8100000000602091049301926119ff565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046119e5565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611b6257565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361050b57301490565b60025f516020611e0c5f395f51905f525414611bb35760025f516020611e0c5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611bcf82611230565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b60208183031261050b578051906001600160401b03821161050b57016101408183031261050b5760405191611c4083611230565b8151835260208201516020840152611c5a6040830161158e565b6040840152611c6b6060830161158e565b6060840152611c7c6080830161158e565b608084015260a082015160a0840152611c9760c08301611560565b60c0840152611ca860e08301611560565b60e0840152611cba610100830161151d565b6101008401526101208201516001600160401b03811161050b57611cde9201611574565b61012082015290565b90611cf0611bc2565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610f6c575f93611d79575b508251818115918215611d6e575b5050611d5c5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611d53565b611d8e9193503d805f833e61082d818361129d565b915f611d45565b9060209081835280518284015201519060408082015260018060a01b0382511660608201526001600160401b0360208301511660808201526040820151151560a0820152606082015160c082015261010060a0611e02608085015160c060e08601526101208501906111dd565b9301519101529056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a26469706673582212200d312e73596a68e33365e2491786193f570e49a9e1050d9383ba789d55e566ef64736f6c634300081b0033",
    "sourceMap": "588:4204:109:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;588:4204:109;;;;1357:4;588:4204;759:14:6;688:1:9;588:4204:109;783:14:6;-1:-1:-1;807:14:6;;708:26:9;704:76;;1460:104:109;790:10:9;;1122:81:80;790:10:9;;;989::80;;1009:32;;;1357:4:109;1051:40:80;;1185:4;1122:81;;:::i;:::-;1101:102;;1357:4:109;1505:66:65;2365:1;588:4204:109;;;;;;:::i;:::-;;;;;;;;;1185:4:80;1460:104:109;;:::i;:::-;1428:136;;588:4204;;;;;;;;;;;;;;;;;;;;807:14:6;588:4204:109;;;;;790:10:9;588:4204:109;;;;;1009:32:80;588:4204:109;;;;;989:10:80;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1101:102:80;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1051:40:80;588:4204:109;;;;;;;;;;;;;;;1428:136;588:4204;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;588:4204:109;-1:-1:-1;588:4204:109;;;;;;;-1:-1:-1;;588:4204:109;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;588:4204:109;;;;;-1:-1:-1;588:4204:109;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;588:4204:109;;;;;;;;;;;;;;;;;;:::o;289:755:86:-;;;588:4204:109;;1189:45:86;;;;588:4204:109;;;1189:45:86;588:4204:109;1189:45:86;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:86;;;;;;;;;;;:::i;:::-;588:4204:109;1179:56:86;;588:4204:109;;-1:-1:-1;;;572:29:86;;;;;588:4204:109;;;1179:56:86;;-1:-1:-1;;;;;588:4204:109;;;-1:-1:-1;588:4204:109;572:29:86;588:4204:109;;572:29:86;;;;;;;;-1:-1:-1;572:29:86;;;289:755;588:4204:109;;615:19:86;611:35;;588:4204:109;;1189:45:86;588:4204:109;;;;;;;;;;;661:52:86;;588:4204:109;572:29:86;661:52;;588:4204:109;;;;;;;;;;;;;-1:-1:-1;588:4204:109;;;;;;;;;;;;572:29:86;588:4204:109;;;1357:4;588:4204;;;;;;;;;;;;661:52:86;;;-1:-1:-1;661:52:86;;;-1:-1:-1;;661:52:86;;;289:755;-1:-1:-1;657:381:86;;588:4204:109;-1:-1:-1;572:29:86;588:4204:109;;;;;;;;;;899:29:86;;;572;899;;588:4204:109;899:29:86;;;;;;;;-1:-1:-1;899:29:86;;;657:381;588:4204:109;;946:19:86;942:35;;793:29;;;;-1:-1:-1;998:29:86;572;588:4204:109;572:29:86;-1:-1:-1;998:29:86;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:86;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;588:4204:109;;;-1:-1:-1;588:4204:109;;;;;657:381:86;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:86;572;588:4204:109;572:29:86;-1:-1:-1;793:29:86;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;588:4204:109;;;;;661:52:86;;;;;;;-1:-1:-1;661:52:86;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:86;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c9081633ce645d514611138575080634e3fa926146110b357806354fd4d5014610fb15780635bf2f20d14610f775780636b122fe014610dd6578063760bd11814610d7857806388e5b2d914610c435780638da3721a14610c6257806391db0b7e14610c4357806396afb36514610a97578063b3b902d414610886578063b587a5eb14610849578063c6ec50701461073d578063c93844be14610655578063ce46e04614610639578063df61dd2c146105fe578063e49617e1146105d9578063e60c3505146105d95763ea6ec49c0361000f57346105d65760403660031901126105d65760243590600435610122611b8a565b61012b81611ce7565b61013484611ce7565b906020810151907f00000000000000000000000000000000000000000000000000000000000000008092036105c7578051156105b8576001600160401b0360608201511680151590816105ad575b5061059e576001600160401b0360808201511661058f5761027360206101208084019360c0876102856101b58851611633565b9190945191604051988997889687966346d1b90d60e11b885260606004890152805160648901528b81015160848901526001600160401b0360408201511660a48901526001600160401b0360608201511660c48901526001600160401b0360808201511660e489015260a0810151610104890152019d8e60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a48601906111dd565b848103600319016024860152906111dd565b604483019190915203916001600160a01b03165afa90811561058457869161054a575b501561053b576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692906102e68161124c565b858152866020820152604051916102fc8361124c565b82526020820152823b1561053757604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015285808260648183885af19182610522575b505061035f5763614cf93960e01b85526004849052602485fd5b6104318594939260209261038660018060a01b0386511691518580825183010191016115a2565b6001600160401b0360608201511690604060808201511515910151906040519282888501528784526103b960408561129d565b604051946103c686611282565b8552878501526040840152606083015260808201528660a0820152604051906103ee8261124c565b7f000000000000000000000000000000000000000000000000000000000000000082528482015260405196878094819363f17325e760e01b835260048301611d95565b03925af19283156105175784936104bd575b50907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0946104b993926040519360208501526020845261048460408561129d565b516040519687966001600160a01b03909216939180a460015f516020611e0c5f395f51905f52556020835260208301906111dd565b0390f35b9250906020833d60201161050f575b816104d96020938361129d565b8101031261050b57915191907ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0610443565b5f80fd5b3d91506104cc565b6040513d86823e3d90fd5b8161052c9161129d565b61053757855f610345565b8580fd5b630ebe58ef60e11b8552600485fd5b90506020813d60201161057c575b816105656020938361129d565b81010312610537576105769061151d565b5f6102a8565b3d9150610558565b6040513d88823e3d90fd5b637b6227e960e11b8552600485fd5b631ab7da6b60e01b8552600485fd5b90504210155f610182565b635c2c7f8960e01b8552600485fd5b63629cd40b60e11b8552600485fd5b80fd5b60206105f46105e73661143d565b6105ef611b30565b611b71565b6040519015158152f35b50346105d657806003193601126105d65760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b50346105d657806003193601126105d657602090604051908152f35b50346105d65760203660031901126105d6576004356001600160401b038111610735576106869036906004016113ba565b6106919291926117f5565b50820191602081840312610735578035906001600160401b03821161073957019160a08382031261073557604051916106c983611267565b6106d2846111c9565b83526020840135906001600160401b0382116105d65750836106fe610724936080936104b9970161130f565b602085015260408101356040850152610719606082016111b5565b6060850152016113ad565b6080820152604051918291826113e7565b5080fd5b8280fd5b50346105d65760203660031901126105d6576107576117f5565b50610760611bc2565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561083c578192610818575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610809576104b96107fd610120840151602080825183010191016115a2565b604051918291826113e7565b635527981560e11b8152600490fd5b6108359192503d8084833e61082d818361129d565b810190611c0c565b905f6107b6565b50604051903d90823e3d90fd5b50346105d657806003193601126105d65760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b5060603660031901126105d6576004356001600160401b038111610735576108b56109849136906004016113ba565b92906108ce6108c261119f565b916044359536916112d9565b906108d7611b8a565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b036040519161090e83611282565b3383521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201528860608201528560808201528660a0820152604051906109638261124c565b858252828201526040518098819263f17325e760e01b835260048301611d95565b0381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610a8c578596610a51575b50906020966101209392604051936109d885611230565b888552898501526001600160401b0342166040850152606084015285608084015260a08301523360c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f516020611e0c5f395f51905f5255604051908152f35b92919095506020833d602011610a84575b81610a6f6020938361129d565b8101031261050b5791519490919060206109c1565b3d9150610a62565b6040513d87823e3d90fd5b503461050b57602036600319011261050b5760043590610ab5611b8a565b610abe82611ce7565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610c3457606084016001600160401b0381511615610c2557516001600160401b03164210610c25576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610b478161124c565b8381525f602082015260405192610b5d8461124c565b83526020830152803b1561050b57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610c10575b50610bc15763614cf93960e01b825260045260249150fd5b60209260c060018060a01b0391015116907f655ef333d5efcbf5aa343f02bcd9e3539f9c9f9ee8b9cfa7d8910b1bd7e0a8326040519380a360015f516020611e0c5f395f51905f525560018152f35b610c1d9193505f9061129d565b5f915f610ba9565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b60206105f4610c513661135d565b92610c5d929192611b30565b61165c565b3461050b57606036600319011261050b576004356001600160401b03811161050b57610140600319823603011261050b5760405190610ca082611230565b8060040135825260248101356020830152610cbd604482016111b5565b6040830152610cce606482016111b5565b6060830152610cdf608482016111b5565b608083015260a481013560a0830152610cfa60c482016111c9565b60c0830152610d0b60e482016111c9565b60e0830152610d1d61010482016113ad565b610100830152610124810135906001600160401b03821161050b576004610d47923692010161130f565b6101208201526024356001600160401b03811161050b57602091610d726105f492369060040161130f565b90611700565b3461050b57602036600319011261050b576004356001600160401b03811161050b57610dab610db091369060040161130f565b611633565b604080516001600160a01b0390931683526020830181905282916104b9918301906111dd565b3461050b575f36600319011261050b57606080604051610df581611201565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610f6c575f90610ebc575b6060906104b9604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906111dd565b503d805f833e610ecc818361129d565b81019060208183031261050b578051906001600160401b03821161050b570160808183031261050b5760405190610f0282611201565b8051825260208101516001600160a01b038116810361050b576020830152610f2c6040820161151d565b60408301526060810151906001600160401b03821161050b570182601f8201121561050b57606092816020610f639351910161152a565b82820152610e76565b6040513d5f823e3d90fd5b3461050b575f36600319011261050b5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461050b575f36600319011261050b576104b9602061109f6001610ff47f00000000000000000000000000000000000000000000000000000000000000006119c3565b818461101f7f00000000000000000000000000000000000000000000000000000000000000006119c3565b818061104a7f00000000000000000000000000000000000000000000000000000000000000006119c3565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f19810183528261129d565b6040519182916020835260208301906111dd565b3461050b57606036600319011261050b576004356001600160401b03811161050b5760a0600319823603011261050b576110eb61119f565b906044356001600160a01b038116810361050b5760209261111d61112b61113094604051928391600401888301611471565b03601f19810183528261129d565b611820565b604051908152f35b3461050b57604036600319011261050b576004356001600160401b03811161050b5760a0600319823603011261050b57816111309161119860209461118a61117e61119f565b93600401878301611471565b03601f19810184528361129d565b3391611820565b602435906001600160401b038216820361050b57565b35906001600160401b038216820361050b57565b35906001600160a01b038216820361050b57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b0382111761121c57604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b0382111761121c57604052565b604081019081106001600160401b0382111761121c57604052565b60a081019081106001600160401b0382111761121c57604052565b60c081019081106001600160401b0382111761121c57604052565b90601f801991011681019081106001600160401b0382111761121c57604052565b6001600160401b03811161121c57601f01601f191660200190565b9291926112e5826112be565b916112f3604051938461129d565b82948184528183011161050b578281602093845f960137010152565b9080601f8301121561050b5781602061132a933591016112d9565b90565b9181601f8401121561050b578235916001600160401b03831161050b576020808501948460051b01011161050b57565b604060031982011261050b576004356001600160401b03811161050b57816113879160040161132d565b92909291602435906001600160401b03821161050b576113a99160040161132d565b9091565b3590811515820361050b57565b9181601f8401121561050b578235916001600160401b03831161050b576020838186019501011161050b57565b6020815260018060a01b03825116602082015260a06080611416602085015183604086015260c08501906111dd565b93604081015160608501526001600160401b03606082015116828501520151151591015290565b602060031982011261050b57600435906001600160401b03821161050b5761014090829003600319011261050b5760040190565b602081526001600160a01b03611486836111c9565b1660208201526020820135601e198336030181121561050b578201602081359101926001600160401b03821161050b57813603841361050b57608061150a918360e09660a060408801528160c0880152878701375f868587010152604081013560608601526001600160401b036114ff606083016111b5565b1682860152016113ad565b151560a0830152601f01601f1916010190565b5190811515820361050b57565b929192611536826112be565b91611544604051938461129d565b82948184528183011161050b578281602093845f96015e010152565b51906001600160a01b038216820361050b57565b9080601f8301121561050b57815161132a9260200161152a565b51906001600160401b038216820361050b57565b60208183031261050b578051906001600160401b03821161050b570160a08183031261050b57604051916115d583611267565b6115de82611560565b83526020820151916001600160401b03831161050b5761160560809261162b948301611574565b6020850152604081015160408501526116206060820161158e565b60608501520161151d565b608082015290565b61164690602080825183010191016115a2565b80516020909101516001600160a01b0390911691565b9290928184036116f1575f91345b858410156116e657818410156116d2578360051b80860135908282116116c35784013561013e198536030181121561050b576116a7908501611b71565b156116b8576001910393019261166a565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f0000000000000000000000000000000000000000000000000000000000000000036117ef57611746610120611756920151602080825183010191016115a2565b91602080825183010191016115a2565b604082015160408201511491826117ca575b826117b3575b8261179a575b8261177e57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611774565b91506080820151151560808201511515149161176e565b91506001600160401b036060830151166001600160401b036060830151161491611768565b50505f90565b6040519061180282611267565b5f608083828152606060208201528260408201528260608201520152565b6118c19261182c611b8a565b7f0000000000000000000000000000000000000000000000000000000000000000906001600160401b036040519161186383611282565b60018060a01b0316948583521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201525f60608201528560808201525f60a0820152604051906109638261124c565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610f6c575f96611987575b509061012092916040519261191284611230565b87845260208401526001600160401b034216604084015260608301525f60808301525f60a08301528460c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f516020611e0c5f395f51905f5255565b92919095506020833d6020116119bb575b816119a56020938361129d565b8101031261050b576101209251959091926118fe565b3d9150611998565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b0d575b806d04ee2d6d415b85acef8100000000600a921015611af2575b662386f26fc10000811015611ade575b6305f5e100811015611acd575b612710811015611abe575b6064811015611ab0575b1015611aa5575b600a60216001840193611a4a856112be565b94611a58604051968761129d565b808652611a67601f19916112be565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611aa057600a9091611a72565b505090565b600190910190611a38565b606460029104930192611a31565b61271060049104930192611a27565b6305f5e10060089104930192611a1c565b662386f26fc1000060109104930192611a0f565b6d04ee2d6d415b85acef8100000000602091049301926119ff565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046119e5565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611b6257565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361050b57301490565b60025f516020611e0c5f395f51905f525414611bb35760025f516020611e0c5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611bcf82611230565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b60208183031261050b578051906001600160401b03821161050b57016101408183031261050b5760405191611c4083611230565b8151835260208201516020840152611c5a6040830161158e565b6040840152611c6b6060830161158e565b6060840152611c7c6080830161158e565b608084015260a082015160a0840152611c9760c08301611560565b60c0840152611ca860e08301611560565b60e0840152611cba610100830161151d565b6101008401526101208201516001600160401b03811161050b57611cde9201611574565b61012082015290565b90611cf0611bc2565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610f6c575f93611d79575b508251818115918215611d6e575b5050611d5c5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611d53565b611d8e9193503d805f833e61082d818361129d565b915f611d45565b9060209081835280518284015201519060408082015260018060a01b0382511660608201526001600160401b0360208301511660808201526040820151151560a0820152606082015160c082015261010060a0611e02608085015160c060e08601526101208501906111dd565b9301519101529056fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a26469706673582212200d312e73596a68e33365e2491786193f570e49a9e1050d9383ba789d55e566ef64736f6c634300081b0033",
    "sourceMap": "588:4204:109:-:0;;;;;;;;;;-1:-1:-1;588:4204:109;;;;;;;;;1183:12:9;;;1054:5;1183:12;588:4204:109;1054:5:9;1183:12;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;;;;2989:103:65;;:::i;:::-;2222:32:82;;;:::i;:::-;2297:37;;;:::i;:::-;2396:13;588:4204:109;2396:13:82;;588:4204:109;2413:18:82;;2396:35;;;2392:99;;588:4204:109;;695:28:79;691:64;;-1:-1:-1;;;;;588:4204:109;362:25:79;;588:4204:109;;362:30:79;;;:78;;;;588:4204:109;765:55:79;;;-1:-1:-1;;;;;553:25:79;;;588:4204:109;;830:58:79;;588:4204:109;;2688:11:82;;;;;588:4204:109;2688:11:82;588:4204:109;2672:28:82;2688:11;;2672:28;:::i;:::-;588:4204:109;;;;;;;;;;;;;;;;;2914:56:82;;588:4204:109;;2914:56:82;;588:4204:109;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;-1:-1:-1;;;;;553:25:79;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;588:4204:109;;;;;;;:::i;:::-;;;;;;;;2914:56:82;;-1:-1:-1;;;;;588:4204:109;2914:56:82;;;;;;;;;;;588:4204:109;2913:57:82;;2909:115;;588:4204:109;;3068:3:82;-1:-1:-1;;;;;588:4204:109;;;;;;:::i;:::-;;;;3145:47:82;588:4204:109;3145:47:82;;588:4204:109;;;;;;;:::i;:::-;;;;3092:102:82;;588:4204:109;3068:136:82;;;;;588:4204:109;;-1:-1:-1;;;3068:136:82;;588:4204:109;;;3068:136:82;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;3068:136:82;;;;;;;588:4204:109;-1:-1:-1;;3064:215:82;;-1:-1:-1;;;3243:25:82;;588:4204:109;;;;;4354:21:82;3243:25;3064:215;2373:486:109;3064:215:82;;;;588:4204:109;3064:215:82;2256:41:109;588:4204;;;;;;;;2267:11;;588:4204;;;;2256:41;;;;;;:::i;:::-;-1:-1:-1;;;;;588:4204:109;2579:32;;588:4204;;2644:27;588:4204;553:25:79;2644:27:109;;588:4204;;;2701:22;;588:4204;;;;2751:34;;;;;588:4204;2751:34;;;;588:4204;2751:34;;:::i;:::-;588:4204;;;;;;:::i;:::-;;;2483:351;;;588:4204;;2483:351;;588:4204;;2483:351;;588:4204;553:25:79;2483:351:109;;588:4204;2483:351;588:4204;2483:351;;588:4204;;;;;;;:::i;:::-;2442:17;588:4204;;2397:452;;;588:4204;;;;;;;;;;;;2373:486;;588:4204;2373:486;;;:::i;:::-;;;;;;;;;;;;;;3064:215:82;588:4204:109;;3424:61:82;588:4204:109;;;;;;2877:25;588:4204;2877:25;;588:4204;;2877:25;;;588:4204;2877:25;;:::i;:::-;588:4204;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;3424:61:82;588:4204:109;-1:-1:-1;;;;;;;;;;;2407:1:65;588:4204:109;;;;;;;;:::i;:::-;;;;2373:486;;;;588:4204;2373:486;;588:4204;2373:486;;;;;;588:4204;2373:486;;;:::i;:::-;;;588:4204;;;;;;;2373:486;3424:61:82;2373:486:109;;588:4204;-1:-1:-1;588:4204:109;;2373:486;;;-1:-1:-1;2373:486:109;;;588:4204;;;;;;;;;3068:136:82;;;;;:::i;:::-;588:4204:109;;3068:136:82;;;;588:4204:109;;;;2909:115:82;-1:-1:-1;;;2993:20:82;;588:4204:109;2993:20:82;;2914:56;;;588:4204:109;2914:56:82;;588:4204:109;2914:56:82;;;;;;588:4204:109;2914:56:82;;;:::i;:::-;;;588:4204:109;;;;;;;:::i;:::-;2914:56:82;;;;;;-1:-1:-1;2914:56:82;;;588:4204:109;;;;;;;;;830:58:79;-1:-1:-1;;;868:20:79;;588:4204:109;868:20:79;;765:55;-1:-1:-1;;;803:17:79;;588:4204:109;803:17:79;;362:78;425:15;;;-1:-1:-1;396:44:79;362:78;;;691:64;-1:-1:-1;;;732:23:79;;588:4204:109;732:23:79;;2392:99:82;-1:-1:-1;;;2454:26:82;;588:4204:109;3804:26:82;2454;588:4204:109;;;;;3045:39:9;588:4204:109;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;:::-;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;792:42;588:4204;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;4749:34;;588:4204;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;588:4204:109;;-1:-1:-1;;;2679:23:80;;588:4204:109;;;2679:23:80;;;588:4204:109;;;;2679:23:80;588:4204:109;2679:3:80;-1:-1:-1;;;;;588:4204:109;2679:23:80;;;;;;;;;;;588:4204:109;2716:19:80;588:4204:109;2716:19:80;;588:4204:109;2739:18:80;2716:41;2712:100;;588:4204:109;4578:46;4589:16;;;;588:4204;;;;4578:46;;;;;;:::i;:::-;588:4204;;;;;;;:::i;2712:100:80:-;-1:-1:-1;;;2780:21:80;;588:4204:109;;2780:21:80;2679:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;773:50:80;588:4204:109;;;;;;-1:-1:-1;588:4204:109;;-1:-1:-1;;588:4204:109;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;2116:431:80;588:4204:109;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;:::i;:::-;1055:12:83;2989:103:65;;:::i;:::-;2185:18:80;588:4204:109;-1:-1:-1;;;;;588:4204:109;;;;;;:::i;:::-;846:10:83;588:4204:109;;;2227:295:80;588:4204:109;2227:295:80;;588:4204:109;;2377:28:80;588:4204:109;;2227:295:80;;588:4204:109;2227:295:80;;588:4204:109;2227:295:80;588:4204:109;2227:295:80;;588:4204:109;2227:295:80;;;;588:4204:109;2227:295:80;;;;588:4204:109;;;;;;;:::i;:::-;;;;2140:397:80;;;588:4204:109;;;;;;;;;;2116:431:80;;588:4204:109;2116:431:80;;;:::i;:::-;;588:4204:109;;2116:3:80;-1:-1:-1;;;;;588:4204:109;2116:431:80;;;;;;;;;;;588:4204:109;;;;;1226:424:83;588:4204:109;;;;;;;;:::i;:::-;;;;1226:424:83;;;588:4204:109;-1:-1:-1;;;;;1340:15:83;588:4204:109;;1226:424:83;;588:4204:109;;1226:424:83;;588:4204:109;1226:424:83;2227:295:80;1226:424:83;;588:4204:109;2227:295:80;1226:424:83;;588:4204:109;846:10:83;588:4204:109;1226:424:83;;588:4204:109;1545:4:83;588:4204:109;1226:424:83;;588:4204:109;1226:424:83;;;588:4204:109;1226:424:83;588:4204:109;846:10:83;5252:50:82;846:10:83;5252:50:82;;;2365:1:65;-1:-1:-1;;;;;;;;;;;2407:1:65;588:4204:109;;;;;;2116:431:80;;;;;;588:4204:109;2116:431:80;;588:4204:109;2116:431:80;;;;;;588:4204:109;2116:431:80;;;:::i;:::-;;;588:4204:109;;;;;;;2116:431:80;;;588:4204:109;2116:431:80;;;;;-1:-1:-1;2116:431:80;;;588:4204:109;;;;;;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;2989:103:65;;;:::i;:::-;3646:28:82;;;:::i;:::-;3741:18;588:4204:109;3741:18:82;;588:4204:109;3763:18:82;3741:40;;;3737:104;;3950:26;;;-1:-1:-1;;;;;588:4204:109;;;3950:31:82;3946:62;;588:4204:109;-1:-1:-1;;;;;588:4204:109;4023:15:82;:44;4019:100;;588:4204:109;;4183:3:82;-1:-1:-1;;;;;588:4204:109;;;;;:::i;:::-;;;;;;4260:43:82;;588:4204:109;;;;;;;:::i;:::-;;;;4207:98:82;;588:4204:109;4183:132:82;;;;;588:4204:109;;-1:-1:-1;;;4183:132:82;;588:4204:109;;;4183:132:82;;588:4204:109;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;-1:-1:-1;;4183:132:82;;;;;;588:4204:109;-1:-1:-1;4179:207:82;;-1:-1:-1;;;4354:21:82;;588:4204:109;;;;-1:-1:-1;4354:21:82;4179:207;588:4204:109;4179:207:82;4537:21;588:4204:109;;;;;4537:21:82;;588:4204:109;;;4516:43:82;588:4204:109;;4516:43:82;;;588:4204:109;-1:-1:-1;;;;;;;;;;;2407:1:65;588:4204:109;;;;4183:132:82;;;;;588:4204:109;4183:132:82;;:::i;:::-;588:4204:109;4183:132:82;;;;4019:100;3990:18;;;588:4204:109;4090:18:82;588:4204:109;;4090:18:82;3737:104;3804:26;;;588:4204:109;3804:26:82;588:4204:109;;3804:26:82;588:4204:109;;1442:1461:9;588:4204:109;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;588:4204:109:-;;;;;;-1:-1:-1;;588:4204:109;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;588:4204:109;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;588:4204:109;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1852:44:80;;1877:18;588:4204:109;1852:44:80;;588:4204:109;;;1852:44:80;588:4204:109;;;;;;1852:14:80;588:4204:109;1852:44:80;;;;;;588:4204:109;1852:44:80;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1852:44:80:-;;;;588:4204:109;1852:44:80;;;;;;:::i;:::-;;;588:4204:109;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1852:44:80;;;588:4204:109;;;;;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;;724:43:80;588:4204:109;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;1055:104:6;;588:4204:109;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;588:4204:109;;;;;;;;;;;;1055:104:6;;;588:4204:109;;;;-1:-1:-1;;;588:4204:109;;;;;;;;;;;;;;;;;-1:-1:-1;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;1055:104:6;;4094:16:109;;1055:104:6;;;;;;:::i;:::-;588:4204:109;;;;;1055:104:6;588:4204:109;;1055:104:6;588:4204:109;;;;:::i;:::-;;;;;;-1:-1:-1;;588:4204:109;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;4345:16;;1055:12:83;588:4204:109;;;;;;;;4345:16;;;;:::i;:::-;;4094;;4345;;;;;;:::i;:::-;1055:12:83;:::i;:::-;588:4204:109;;;;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;1055:12:83;588:4204:109;4094:16;588:4204;;4094:16;588:4204;;:::i;:::-;;;;4094:16;;;;:::i;:::-;;;;;;;;;;:::i;:::-;4128:10;1055:12:83;;:::i;588:4204:109:-;;;;-1:-1:-1;;;;;588:4204:109;;;;;;:::o;:::-;;;-1:-1:-1;;;;;588:4204:109;;;;;;:::o;:::-;;;-1:-1:-1;;;;;588:4204:109;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;588:4204:109;;;;;;;;-1:-1:-1;;588:4204:109;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;:::o;:::-;;;;-1:-1:-1;588:4204:109;;;;;-1:-1:-1;588:4204:109;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;:::o;:::-;;;4094:16;;588:4204;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;:::o;:::-;-1:-1:-1;;;;;588:4204:109;;;;;;-1:-1:-1;;588:4204:109;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;588:4204:109;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;588:4204:109;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;588:4204:109;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;-1:-1:-1;;588:4204:109;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;588:4204:109;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;588:4204:109;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;588:4204:109;;;;;;:::o;:::-;;;-1:-1:-1;;;;;588:4204:109;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;588:4204:109;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;:::o;1629:245::-;1783:34;1629:245;1783:34;588:4204;;;1783:34;;;;;;:::i;:::-;588:4204;;1783:34;1852:14;;;;-1:-1:-1;;;;;588:4204:109;;;;1629:245::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;588:4204:109;;;;;;;;;;;;;4064:22:9;;;;4060:87;;588:4204:109;;;;;;;;;;;;;;4274:33:9;588:4204:109;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;588:4204:109;;3896:19:9;588:4204:109;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;588:4204:109;;;;3881:1:9;588:4204:109;;;;;3881:1:9;588:4204:109;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;3137:779:109;3346:17;;;588:4204;3367:18;3346:39;3342:57;;3441:45;3452:15;3531:36;3452:15;;;3346:17;588:4204;;;3441:45;;;;;;:::i;:::-;588:4204;3346:17;588:4204;;;3531:36;;;;;;:::i;:::-;3585:21;;;588:4204;3585:21;3610:25;;588:4204;3585:50;:136;;;;3137:779;3585:212;;;3137:779;3585:252;;;3137:779;3585:324;;;3578:331;;3137:779;:::o;3585:324::-;3346:17;3863:13;;;;;;588:4204;;;;;3853:24;3891:17;;;3346;588:4204;;;;3881:28;3853:56;3137:779;:::o;3585:252::-;588:4204;;;;-1:-1:-1;;;;;588:4204:109;;;;;3801:36;;-1:-1:-1;3585:252:109;;:212;3737:26;;;;;588:4204;;;3737:26;3767:30;;588:4204;;;3737:60;3585:212;;;:136;3651:31;;-1:-1:-1;;;;;3651:31:109;;;588:4204;;-1:-1:-1;;;;;3651:31:109;3686:35;;588:4204;;3651:70;3585:136;;;3342:57;3387:12;;588:4204;3387:12;:::o;588:4204::-;;;;;;;:::i;:::-;-1:-1:-1;588:4204:109;;;;;;;;;;;;;;;;;;;;;;:::o;2989:103:65:-;2116:431:80;2989:103:65;;;:::i;:::-;2185:18:80;588:4204:109;-1:-1:-1;;;;;588:4204:109;;;;;;:::i;:::-;;;;;;;;;;;;2227:295:80;;;;588:4204:109;2227:295:80;2377:28;588:4204:109;;2227:295:80;;588:4204:109;2227:295:80;;588:4204:109;;2227:295:80;;;588:4204:109;2227:295:80;;;;588:4204:109;;2227:295:80;;;588:4204:109;;;;;;;:::i;2116:431:80:-;;588:4204:109;;2116:3:80;-1:-1:-1;;;;;588:4204:109;2116:431:80;;;;;;;588:4204:109;2116:431:80;;;2989:103:65;588:4204:109;;1226:424:83;588:4204:109;;;;;;;;:::i;:::-;;;;2227:295:80;1226:424:83;;588:4204:109;-1:-1:-1;;;;;1340:15:83;588:4204:109;;1226:424:83;;588:4204:109;2227:295:80;1226:424:83;;588:4204:109;;2227:295:80;1226:424:83;;588:4204:109;;2227:295:80;1226:424:83;;588:4204:109;1226:424:83;588:4204:109;1226:424:83;;588:4204:109;1545:4:83;588:4204:109;1226:424:83;;588:4204:109;1226:424:83;;;588:4204:109;1226:424:83;588:4204:109;5252:50:82;;588:4204:109;5252:50:82;;2407:1:65;2365;-1:-1:-1;;;;;;;;;;;2407:1:65;2989:103::o;2116:431:80:-;;;;;;2227:295;2116:431;;2227:295;2116:431;;;;;;588:4204:109;2116:431:80;;;:::i;:::-;;;588:4204:109;;;;1226:424:83;588:4204:109;;2116:431:80;;;;;;;;;-1:-1:-1;2116:431:80;;1343:634:69;1465:17;-1:-1:-1;29298:17:76;-1:-1:-1;;;29298:17:76;;;29294:103;;1343:634:69;29414:17:76;29423:8;29994:7;29414:17;;;29410:103;;1343:634:69;29539:8:76;29530:17;;;29526:103;;1343:634:69;29655:7:76;29646:16;;;29642:100;;1343:634:69;29768:7:76;29759:16;;;29755:100;;1343:634:69;29881:7:76;29872:16;;;29868:100;;1343:634:69;29985:16:76;;29981:66;;1343:634:69;29994:7:76;1580:94:69;1485:1;588:4204:109;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;4094:16;;588:4204;;:::i;:::-;;;;;;;1580:94:69;;;1687:247;-1:-1:-1;;588:4204:109;;-1:-1:-1;;;1741:111:69;;;;588:4204:109;1741:111:69;588:4204:109;1902:10:69;;1898:21;;29994:7:76;1687:247:69;;;;1898:21;1914:5;;1343:634;:::o;29981:66:76:-;30031:1;588:4204:109;;;;29981:66:76;;29868:100;29881:7;29952:1;588:4204:109;;;;29868:100:76;;;29755;29768:7;29839:1;588:4204:109;;;;29755:100:76;;;29642;29655:7;29726:1;588:4204:109;;;;29642:100:76;;;29526:103;29539:8;29612:2;588:4204:109;;;;29526:103:76;;;29410;29423:8;29496:2;588:4204:109;;;;29410:103:76;;;29294;-1:-1:-1;29380:2:76;;-1:-1:-1;;;;588:4204:109;;29294:103:76;;6040:128:9;6109:4;-1:-1:-1;;;;;588:4204:109;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1493:271:80;1720:20;;588:4204:109;;;;;;;;;;;;;1752:4:80;1720:37;1493:271;:::o;3749:292:65:-;2407:1;-1:-1:-1;;;;;;;;;;;588:4204:109;4560:63:65;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:65;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:65;;-1:-1:-1;3696:30:65;588:4204:109;;;;;;;:::i;:::-;;;;-1:-1:-1;588:4204:109;;-1:-1:-1;588:4204:109;;;;-1:-1:-1;588:4204:109;;;;-1:-1:-1;588:4204:109;;;;-1:-1:-1;588:4204:109;;;;-1:-1:-1;588:4204:109;;;;-1:-1:-1;588:4204:109;;;;-1:-1:-1;588:4204:109;;;;-1:-1:-1;588:4204:109;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;:::i;:::-;;;;;;:::o;4593:257:82:-;;588:4204:109;;:::i;:::-;-1:-1:-1;588:4204:109;;-1:-1:-1;;;4718:23:82;;;;;588:4204:109;;;;-1:-1:-1;588:4204:109;4718:23:82;588:4204:109;4718:3:82;-1:-1:-1;;;;;588:4204:109;4718:23:82;;;;;;;-1:-1:-1;4718:23:82;;;4593:257;4704:37;;588:4204:109;4755:29:82;;;:55;;;;;4593:257;4751:92;;;;4593:257;:::o;4751:92::-;4819:24;;;-1:-1:-1;4819:24:82;4718:23;588:4204:109;4718:23:82;-1:-1:-1;4819:24:82;4755:55;4788:22;;;-1:-1:-1;4755:55:82;;;;4718:23;;;;;;;-1:-1:-1;4718:23:82;;;;;;:::i;:::-;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;588:4204:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 4048,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 4091,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 4134,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 6962,
          "length": 32
        }
      ],
      "55991": [
        {
          "start": 3655,
          "length": 32
        }
      ],
      "55994": [
        {
          "start": 691,
          "length": 32
        },
        {
          "start": 1918,
          "length": 32
        },
        {
          "start": 2441,
          "length": 32
        },
        {
          "start": 2837,
          "length": 32
        },
        {
          "start": 6342,
          "length": 32
        },
        {
          "start": 7437,
          "length": 32
        }
      ],
      "55996": [
        {
          "start": 317,
          "length": 32
        },
        {
          "start": 1982,
          "length": 32
        },
        {
          "start": 2265,
          "length": 32
        },
        {
          "start": 2758,
          "length": 32
        },
        {
          "start": 3605,
          "length": 32
        },
        {
          "start": 3982,
          "length": 32
        },
        {
          "start": 5895,
          "length": 32
        },
        {
          "start": 6190,
          "length": 32
        }
      ],
      "55998": [
        {
          "start": 2145,
          "length": 32
        },
        {
          "start": 2332,
          "length": 32
        },
        {
          "start": 6266,
          "length": 32
        }
      ],
      "66895": [
        {
          "start": 1008,
          "length": 32
        },
        {
          "start": 1558,
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
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillmentUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"escrower\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"escrower\",\"type\":\"address\"}],\"name\":\"EscrowReclaimed\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA_REVOCABLE\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"VALIDATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"check\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collect\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeCondition\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct UnconditionalAttestationReferenceEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct UnconditionalAttestationReferenceEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct UnconditionalAttestationReferenceEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct UnconditionalAttestationReferenceEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaim\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol\":\"UnconditionalAttestationReferenceEscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0x6cfee8e96c8c2857b3ce8cabc516b3f3173edcff6d142501b9a7bbee18c2864d\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://33ebe7c68da275c7d60662e88b2bf83db98ed3ca792dee2d706397ad2e59a5ea\",\"dweb:/ipfs/QmUdkGtifdibK57dxKoqDYJj6Kmtn4D1opr7gi5EdEdj51\"]},\"src/BaseEscrowObligationUnconditional.sol\":{\"keccak256\":\"0x014ea915448b106c785fcf25538de1b21e7985b9b0531b6c0c9bc371172df754\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://0dde97178d210c005b782b11c215ed8a1dae45100465d0137d6f1eec10b43eac\",\"dweb:/ipfs/QmPjumdjXa6QD8WJmasrSKzFcRcq79WGv4jJAnk9vQwRTn\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0x468c5d4cd6c0c1251f5923a471d8ccfb5c1ca3cf2a0b173257d43c2510438c30\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b6733d3bc75b27e1ffab1c11f6dbe5713bd7cd26202f97f9835fc8754edde84e\",\"dweb:/ipfs/Qmeb9mcDXE1mNsbyL3WGhA1WcL3c1Rr2J99PiC4aGLuHif\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x60c3517336022ba2e637a7614c05c264c4a896a13eee19f28abd705d53cbfae5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d54682c0f79f53ea184a0b03ae8986ae53453194005d6db2508c4e7941c5757b\",\"dweb:/ipfs/QmaRFve7sohhfW1ZQBHEJEeBGC5C4N9BLGGEETpMpoUxBx\"]},\"src/IEscrow.sol\":{\"keccak256\":\"0xe0a0a13eb804370a58282a305565c15594a04de4e4f650fca0fcfe8114eb3faf\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d2777dd14bcb3d1a56c32f90c017ac7cdd9d60021fb18680f714867b52d07ed5\",\"dweb:/ipfs/QmQhuHZLZgYsdQyxohGnfVFvAraQG8cBCtnohVC5MLjbhe\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol\":{\"keccak256\":\"0x026f5cb67730665200251e146b8de7f0c168f3ef985a1382b2d777ab0500c488\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f4069e2fc63201363bb691b264be23e67e7850d6a0f1412fc794b0cae9378fdf\",\"dweb:/ipfs/QmU3TMYV3Eb4B2Lo51bydy3ej2LEEKrrd6oVYEgDtHX267\"]}},\"version\":1}",
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
              "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
              "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
              "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
              "internalType": "struct UnconditionalAttestationReferenceEscrowObligation.ObligationData",
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
        "src/obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol": "UnconditionalAttestationReferenceEscrowObligation"
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
        "keccak256": "0x6cfee8e96c8c2857b3ce8cabc516b3f3173edcff6d142501b9a7bbee18c2864d",
        "urls": [
          "bzz-raw://33ebe7c68da275c7d60662e88b2bf83db98ed3ca792dee2d706397ad2e59a5ea",
          "dweb:/ipfs/QmUdkGtifdibK57dxKoqDYJj6Kmtn4D1opr7gi5EdEdj51"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseEscrowObligationUnconditional.sol": {
        "keccak256": "0x014ea915448b106c785fcf25538de1b21e7985b9b0531b6c0c9bc371172df754",
        "urls": [
          "bzz-raw://0dde97178d210c005b782b11c215ed8a1dae45100465d0137d6f1eec10b43eac",
          "dweb:/ipfs/QmPjumdjXa6QD8WJmasrSKzFcRcq79WGv4jJAnk9vQwRTn"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseObligation.sol": {
        "keccak256": "0x468c5d4cd6c0c1251f5923a471d8ccfb5c1ca3cf2a0b173257d43c2510438c30",
        "urls": [
          "bzz-raw://b6733d3bc75b27e1ffab1c11f6dbe5713bd7cd26202f97f9835fc8754edde84e",
          "dweb:/ipfs/Qmeb9mcDXE1mNsbyL3WGhA1WcL3c1Rr2J99PiC4aGLuHif"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x60c3517336022ba2e637a7614c05c264c4a896a13eee19f28abd705d53cbfae5",
        "urls": [
          "bzz-raw://d54682c0f79f53ea184a0b03ae8986ae53453194005d6db2508c4e7941c5757b",
          "dweb:/ipfs/QmaRFve7sohhfW1ZQBHEJEeBGC5C4N9BLGGEETpMpoUxBx"
        ],
        "license": "UNLICENSED"
      },
      "src/IEscrow.sol": {
        "keccak256": "0xe0a0a13eb804370a58282a305565c15594a04de4e4f650fca0fcfe8114eb3faf",
        "urls": [
          "bzz-raw://d2777dd14bcb3d1a56c32f90c017ac7cdd9d60021fb18680f714867b52d07ed5",
          "dweb:/ipfs/QmQhuHZLZgYsdQyxohGnfVFvAraQG8cBCtnohVC5MLjbhe"
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
      "src/obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol": {
        "keccak256": "0x026f5cb67730665200251e146b8de7f0c168f3ef985a1382b2d777ab0500c488",
        "urls": [
          "bzz-raw://f4069e2fc63201363bb691b264be23e67e7850d6a0f1412fc794b0cae9378fdf",
          "dweb:/ipfs/QmU3TMYV3Eb4B2Lo51bydy3ej2LEEKrrd6oVYEgDtHX267"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 109
} as const;
