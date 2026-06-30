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
          "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
              "name": "attestation",
              "type": "tuple",
              "internalType": "struct AttestationRequest",
              "components": [
                {
                  "name": "schema",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "data",
                  "type": "tuple",
                  "internalType": "struct AttestationRequestData",
                  "components": [
                    {
                      "name": "recipient",
                      "type": "address",
                      "internalType": "address"
                    },
                    {
                      "name": "expirationTime",
                      "type": "uint64",
                      "internalType": "uint64"
                    },
                    {
                      "name": "revocable",
                      "type": "bool",
                      "internalType": "bool"
                    },
                    {
                      "name": "refUID",
                      "type": "bytes32",
                      "internalType": "bytes32"
                    },
                    {
                      "name": "data",
                      "type": "bytes",
                      "internalType": "bytes"
                    },
                    {
                      "name": "value",
                      "type": "uint256",
                      "internalType": "uint256"
                    }
                  ]
                }
              ]
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
          "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
              "name": "attestation",
              "type": "tuple",
              "internalType": "struct AttestationRequest",
              "components": [
                {
                  "name": "schema",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "data",
                  "type": "tuple",
                  "internalType": "struct AttestationRequestData",
                  "components": [
                    {
                      "name": "recipient",
                      "type": "address",
                      "internalType": "address"
                    },
                    {
                      "name": "expirationTime",
                      "type": "uint64",
                      "internalType": "uint64"
                    },
                    {
                      "name": "revocable",
                      "type": "bool",
                      "internalType": "bool"
                    },
                    {
                      "name": "refUID",
                      "type": "bytes32",
                      "internalType": "bytes32"
                    },
                    {
                      "name": "data",
                      "type": "bytes",
                      "internalType": "bytes"
                    },
                    {
                      "name": "value",
                      "type": "uint256",
                      "internalType": "uint256"
                    }
                  ]
                }
              ]
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
          "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
              "name": "attestation",
              "type": "tuple",
              "internalType": "struct AttestationRequest",
              "components": [
                {
                  "name": "schema",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "data",
                  "type": "tuple",
                  "internalType": "struct AttestationRequestData",
                  "components": [
                    {
                      "name": "recipient",
                      "type": "address",
                      "internalType": "address"
                    },
                    {
                      "name": "expirationTime",
                      "type": "uint64",
                      "internalType": "uint64"
                    },
                    {
                      "name": "revocable",
                      "type": "bool",
                      "internalType": "bool"
                    },
                    {
                      "name": "refUID",
                      "type": "bytes32",
                      "internalType": "bytes32"
                    },
                    {
                      "name": "data",
                      "type": "bytes",
                      "internalType": "bytes"
                    },
                    {
                      "name": "value",
                      "type": "uint256",
                      "internalType": "uint256"
                    }
                  ]
                }
              ]
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
          "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
              "name": "attestation",
              "type": "tuple",
              "internalType": "struct AttestationRequest",
              "components": [
                {
                  "name": "schema",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "data",
                  "type": "tuple",
                  "internalType": "struct AttestationRequestData",
                  "components": [
                    {
                      "name": "recipient",
                      "type": "address",
                      "internalType": "address"
                    },
                    {
                      "name": "expirationTime",
                      "type": "uint64",
                      "internalType": "uint64"
                    },
                    {
                      "name": "revocable",
                      "type": "bool",
                      "internalType": "bool"
                    },
                    {
                      "name": "refUID",
                      "type": "bytes32",
                      "internalType": "bytes32"
                    },
                    {
                      "name": "data",
                      "type": "bytes",
                      "internalType": "bytes"
                    },
                    {
                      "name": "value",
                      "type": "uint256",
                      "internalType": "uint256"
                    }
                  ]
                }
              ]
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
      "name": "AttestationCreationFailed",
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
      "name": "UnauthorizedCall",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x61018080604052346102655760408161266a80380380916100208285610269565b833981010312610265578051906001600160a01b0382169081830361026557602001516001600160a01b0381169190828103610265576040519161006560e084610269565b60b183527f6164647265737320617262697465722c2062797465732064656d616e642c207460208401527f75706c65286279746573333220736368656d612c207475706c6528616464726560408401527f737320726563697069656e742c2075696e7436342065787069726174696f6e5460608401527f696d652c20626f6f6c207265766f6361626c652c20627974657333322072656660808401527f5549442c20627974657320646174612c2075696e743235362076616c7565292060a0840152703230ba30949030ba3a32b9ba30ba34b7b760791b60c08401526001608052600360a0525f60c0521561025657836101719460e05261012052610100526001610160523091610384565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f005560405161210a9081610560823960805181611151015260a0518161117c015260c051816111a7015260e05181611c6d01526101005181610fc80152610120518181816102ae015281816107b7015281816109f001528181610c1101528181611e480152611fa001526101405181818161013d015281816107f70152818161093901528181610bc201528181610f960152818161110f0152818161186f0152611f0801526101605181818161089a0152818161097c0152611f540152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b0382119082101761028c57604052565b634e487b7160e01b5f52604160045260245ffd5b602081830312610265578051906001600160401b0382116102655701906080828203126102655760405191608083016001600160401b0381118482101761028c576040528051835260208101516001600160a01b0381168103610265576020840152604081015180151581036102655760408401526060810151906001600160401b038211610265570181601f82011215610265578051906001600160401b03821161028c576040519261035e601f8401601f191660200185610269565b8284526020838301011161026557815f9260208093018386015e83010152606082015290565b929160405190602082018351926103ce6015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a19810184520182610269565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156104df5787915f91610545575b50511461053f579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f918161050b575b506104ea57505f602491604051928380926351753e3760e11b82528760048301525afa80156104df5783915f916104bd575b5051146104bb5750639e6113d560e01b5f5260045260245ffd5b565b6104d991503d805f833e6104d18183610269565b8101906102a0565b5f6104a1565b6040513d5f823e3d90fd5b919280915082036104f9575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d602011610537575b8161052760209383610269565b810103126102655751905f61046f565b3d915061051a565b50505050565b61055991503d805f833e6104d18183610269565b5f61040956fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a7146112345750806354fd4d50146111325780635bf2f20d146110f85780636b122fe014610f57578063760bd11814610ef957806388e5b2d914610dc45780638da3721a14610de357806391db0b7e14610dc457806396afb36514610b935780639c13d80e14610b16578063b3b902d4146108bf578063b587a5eb14610882578063c6ec507014610776578063c93844be146105ed578063cce1f5611461057d578063ce46e04614610561578063e49617e11461053c578063e60c35051461053c5763ea6ec49c0361000f57346105395760403660031901126105395760243590600435610122611cc5565b61012b81611e22565b9261013581611e22565b9360208101517f00000000000000000000000000000000000000000000000000000000000000008091036104815781511561052a576001600160401b03606083015116801515908161051f575b50610510576001600160401b036080830151166105015761012082019182516101aa9061179b565b9151604080516346d1b90d60e11b81526060600482018190528b51606483015260208c01516084830152918b01516001600160401b0390811660a4830152918b0151821660c482015260808b015190911660e482015260a08a015161010482015260c08a0180516001600160a01b0390811661012484015260e08c0151166101448301526101008b01511515610164830152610120909a0151610140610184830152909384928392909190610264906101a48501906112b2565b838103600319016024850152610279916112b2565b60448301919091526001600160a01b039093169203815a93602094fa9081156104f65786916104b8575b50156104a9576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692906102e181611321565b858152866020820152604051906102f782611321565b8382526020820152833b156104a557604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015286808260648183895af19182610490575b505061035b5763614cf93960e01b86526004859052602486fd5b6103716040915160208082518301019101611669565b019081515114610481576103af602091519260a08385015101519360405194858094819363f17325e760e01b835287600484015260248301906114fa565b03925af1849181610449575b506103cf57638d7100d760e01b8452600484fd5b917ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09491610445939260405193602085015260208452610410604085611372565b516040519687966001600160a01b03909216939180a460015f5160206120b55f395f51905f52556020835260208301906112b2565b0390f35b9091506020813d602011610479575b8161046560209383611372565b810103126104755751905f6103bb565b5f80fd5b3d9150610458565b63629cd40b60e11b8552600485fd5b8161049a91611372565b6104a557865f610341565b8680fd5b630ebe58ef60e11b8552600485fd5b90506020813d6020116104ee575b816104d360209383611372565b810103126104ea576104e4906115e4565b5f6102a3565b8580fd5b3d91506104c6565b6040513d88823e3d90fd5b637b6227e960e11b8552600485fd5b631ab7da6b60e01b8552600485fd5b90504210155f610182565b635c2c7f8960e01b8552600485fd5b80fd5b602061055761054a366115b0565b610552611c6b565b611cac565b6040519015158152f35b5034610539578060031936011261053957602090604051908152f35b50604036600319011261053957600435906001600160401b03821161053957606060031983360301126105395760206105e56105d0846105de6105be611482565b916040519384916004018783016119a6565b03601f198101845283611372565b3391611ed0565b604051908152f35b5034610539576020366003190112610539576004356001600160401b03811161076e5761061e9036906004016114cd565b610629929192611aa0565b5082019160208184031261076e578035906001600160401b03821161077257019060608284031261053957604051916106618361133c565b61066a816114ac565b835260208101356001600160401b038111610772578461068b9183016113e4565b60208401526040810135906001600160401b03821161077257019060408285031261053957604051916106bd83611321565b803583526020810135906001600160401b03821161077257019360c08582031261076e57604051916106ee83611357565b6106f7866114ac565b835261070560208701611498565b6020840152610716604087016114c0565b6040840152606086013560608401526080860135906001600160401b03821161053957509461074c60a0926104459783016113e4565b6080840152013560a08201526020820152604082015260405191829182611569565b5080fd5b8280fd5b503461053957602036600319011261053957610790611aa0565b50610799611cfd565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610875578192610851575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036108425761044561083661012084015160208082518301019101611669565b60405191829182611569565b635527981560e11b8152600490fd5b61086e9192503d8084833e6108668183611372565b810190611d47565b905f6107ef565b50604051903d90823e3d90fd5b503461053957806003193601126105395760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b506060366003190112610539576004356001600160401b03811161076e576108eb9036906004016114cd565b90916109046108f8611482565b936044359336916113ae565b61090c611cc5565b60a060206040610923828551860101838601611669565b01510151015193843403610afe576109eb9394507f0000000000000000000000000000000000000000000000000000000000000000906001600160401b036040519161096e83611357565b3383521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201528860608201528560808201528660a0820152604051906109c382611321565b858252828201526040518098819263f17325e760e01b835284600484015260248301906114fa565b0381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610af3578596610ab8575b5090602096610120939260405193610a3f85611305565b888552898501526001600160401b0342166040850152606084015285608084015260a08301523360c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206120b55f395f51905f5255604051908152f35b92919095506020833d602011610aeb575b81610ad660209383611372565b81010312610475579151949091906020610a28565b3d9150610ac9565b6040513d87823e3d90fd5b630d35e92160e01b8352600485905234602452604483fd5b506060366003190112610539576004356001600160401b03811161076e576060600319823603011261076e57610b4a611482565b604435929091906001600160a01b03841684036105395760206105e58585610b80610b8e876040519283916004018883016119a6565b03601f198101835282611372565b611ed0565b50346104755760203660031901126104755760043590610bb1611cc5565b610bba82611e22565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610db557606084016001600160401b0381511615610da657516001600160401b03164210610da6576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610c4381611321565b8381525f602082015260405192610c5984611321565b83526020830152803b1561047557604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610d91575b50610cbd5763614cf93960e01b825260045260249150fd5b60c0830160a060206040610ce7610120600180861b03865116980151838082518301019101611669565b01510151015180610d41575b506020935060018060a01b03905116907f655ef333d5efcbf5aa343f02bcd9e3539f9c9f9ee8b9cfa7d8910b1bd7e0a8326040519380a360015f5160206120b55f395f51905f525560018152f35b8380808084895af13d15610d8c573d610d5981611393565b90610d676040519283611372565b81528560203d92013e5b610cf3576338f0620160e21b84526004859052602452604483fd5b610d71565b610d9e9193505f90611372565b5f915f610ca5565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b6020610557610dd236611432565b92610dde929192611c6b565b6117c4565b34610475576060366003190112610475576004356001600160401b0381116104755761014060031982360301126104755760405190610e2182611305565b8060040135825260248101356020830152610e3e60448201611498565b6040830152610e4f60648201611498565b6060830152610e6060848201611498565b608083015260a481013560a0830152610e7b60c482016114ac565b60c0830152610e8c60e482016114ac565b60e0830152610e9e61010482016114c0565b610100830152610124810135906001600160401b038211610475576004610ec892369201016113e4565b6101208201526024356001600160401b03811161047557602091610ef36105579236906004016113e4565b90611868565b34610475576020366003190112610475576004356001600160401b03811161047557610f2c610f319136906004016113e4565b61179b565b604080516001600160a01b039093168352602083018190528291610445918301906112b2565b34610475575f36600319011261047557606080604051610f76816112d6565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa80156110ed575f9061103d575b606090610445604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906112b2565b503d805f833e61104d8183611372565b810190602081830312610475578051906001600160401b03821161047557016080818303126104755760405190611083826112d6565b8051825260208101516001600160a01b03811681036104755760208301526110ad604082016115e4565b60408301526060810151906001600160401b038211610475570182601f82011215610475576060928160206110e4935191016115f1565b82820152610ff7565b6040513d5f823e3d90fd5b34610475575f3660031901126104755760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610475575f36600319011261047557610445602061122060016111757f0000000000000000000000000000000000000000000000000000000000000000611afe565b81846111a07f0000000000000000000000000000000000000000000000000000000000000000611afe565b81806111cb7f0000000000000000000000000000000000000000000000000000000000000000611afe565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282611372565b6040519182916020835260208301906112b2565b34610475576020366003190112610475576004359063ffffffff60e01b8216809203610475576020916346d1b90d60e11b81149081159081611279575b505015158152f35b90611287575b508380611271565b630acaa6e160e01b8114915081156112a1575b508361127f565b6301ffc9a760e01b1490508361129a565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b038211176112f157604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b038211176112f157604052565b604081019081106001600160401b038211176112f157604052565b606081019081106001600160401b038211176112f157604052565b60c081019081106001600160401b038211176112f157604052565b90601f801991011681019081106001600160401b038211176112f157604052565b6001600160401b0381116112f157601f01601f191660200190565b9291926113ba82611393565b916113c86040519384611372565b829481845281830111610475578281602093845f960137010152565b9080601f83011215610475578160206113ff933591016113ae565b90565b9181601f84011215610475578235916001600160401b038311610475576020808501948460051b01011161047557565b6040600319820112610475576004356001600160401b038111610475578161145c91600401611402565b92909291602435906001600160401b0382116104755761147e91600401611402565b9091565b602435906001600160401b038216820361047557565b35906001600160401b038216820361047557565b35906001600160a01b038216820361047557565b3590811515820361047557565b9181601f84011215610475578235916001600160401b038311610475576020838186019501011161047557565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a0611560608085015160c0808601526101008501906112b2565b93015191015290565b906113ff916020815260018060a01b038251166020820152604061159b602084015160608385015260808401906112b2565b920151906060601f19828503019101526114fa565b602060031982011261047557600435906001600160401b038211610475576101409082900360031901126104755760040190565b5190811515820361047557565b9291926115fd82611393565b9161160b6040519384611372565b829481845281830111610475578281602093845f96015e010152565b51906001600160a01b038216820361047557565b9080601f830112156104755781516113ff926020016115f1565b51906001600160401b038216820361047557565b602081830312610475578051906001600160401b038211610475570190606082820312610475576040519161169d8361133c565b6116a681611627565b835260208101516001600160401b03811161047557826116c791830161163b565b60208401526040810151906001600160401b03821161047557019060408282031261047557604051916116f983611321565b805183526020810151906001600160401b03821161047557019060c082820312610475576040519161172a83611357565b61173381611627565b835261174160208201611655565b6020840152611752604082016115e4565b60408401526060810151606084015260808101516001600160401b0381116104755760a09261178291830161163b565b6080840152015160a08201526020820152604082015290565b6117ae9060208082518301019101611669565b80516020909101516001600160a01b0390911691565b929092818403611859575f91345b8584101561184e578184101561183a578360051b808601359082821161182b5784013561013e19853603018112156104755761180f908501611cac565b1561182057600191039301926117d2565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f00000000000000000000000000000000000000000000000000000000000000000361194f576118ae6101206118be92015160208082518301019101611669565b9160208082518301019101611669565b60408201516040516118e081610b8060208201946020865260408301906114fa565b519020604082015160405161190581610b8060208201946020865260408301906114fa565b519020149182611936575b8261191a57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611910565b50505f90565b9035601e19823603018112156104755701602081359101916001600160401b03821161047557813603831361047557565b908060209392818452848401375f828201840152601f01601f1916010190565b602081526001600160a01b036119bb836114ac565b1660208201526119e26119d16020840184611955565b606060408501526080840191611986565b916040810135603e19823603018112156104755701906060601f198285030191015280358252602081013560be1982360301811215610475576040602084015201906001600160a01b03611a35836114ac565b1660408201526001600160401b03611a4f60208401611498565b166060820152611a61604083016114c0565b15156080820152606082013560a082015260e060a0611a97611a866080860186611955565b60c080870152610100860191611986565b93013591015290565b60405190611aad8261133c565b815f8152606060208201526040805191611ac683611321565b5f83528151611ad481611357565b5f81525f60208201525f838201525f6060820152606060808201525f60a082015260208401520152565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611c48575b806d04ee2d6d415b85acef8100000000600a921015611c2d575b662386f26fc10000811015611c19575b6305f5e100811015611c08575b612710811015611bf9575b6064811015611beb575b1015611be0575b600a60216001840193611b8585611393565b94611b936040519687611372565b808652611ba2601f1991611393565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611bdb57600a9091611bad565b505090565b600190910190611b73565b606460029104930192611b6c565b61271060049104930192611b62565b6305f5e10060089104930192611b57565b662386f26fc1000060109104930192611b4a565b6d04ee2d6d415b85acef810000000060209104930192611b3a565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611b20565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611c9d57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361047557301490565b60025f5160206120b55f395f51905f525414611cee5760025f5160206120b55f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611d0a82611305565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b602081830312610475578051906001600160401b0382116104755701610140818303126104755760405191611d7b83611305565b8151835260208201516020840152611d9560408301611655565b6040840152611da660608301611655565b6060840152611db760808301611655565b608084015260a082015160a0840152611dd260c08301611627565b60c0840152611de360e08301611627565b60e0840152611df561010083016115e4565b6101008401526101208201516001600160401b03811161047557611e19920161163b565b61012082015290565b90611e2b611cfd565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9283156110ed575f93611eb4575b508251818115918215611ea9575b5050611e975750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611e8e565b611ec99193503d805f833e6108668183611372565b915f611e80565b929192611edb611cc5565b60a060206040611ef2828551860101838601611669565b0151015101519384340361209d57611f9b9394507f0000000000000000000000000000000000000000000000000000000000000000906001600160401b0360405191611f3d83611357565b60018060a01b0316948583521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201525f60608201528560808201525f60a0820152604051906109c382611321565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19586156110ed575f96612061575b5090610120929160405192611fec84611305565b87845260208401526001600160401b034216604084015260608301525f60808301525f60a08301528460c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206120b55f395f51905f5255565b92919095506020833d602011612095575b8161207f60209383611372565b8101031261047557610120925195909192611fd8565b3d9150612072565b84630d35e92160e01b5f526004523460245260445ffdfe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220e9a3b22b05f71bfde00561b8b6a6f6c5e136d8bb0ecff53ee5c2ab30219ef1cf64736f6c634300081b0033",
    "sourceMap": "772:5084:65:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;772:5084:65;;;;1638:4;772:5084;759:14:6;688:1:9;772:5084:65;783:14:6;-1:-1:-1;772:5084:65;807:14:6;708:26:9;704:76;;790:10;2065:81:55;790:10:9;772:5084:65;790:10:9;1932::55;;1952:32;;1638:4:65;1994:40:55;;2128:4;2065:81;;:::i;:::-;2044:102;;1638:4:65;1505:66:41;2365:1;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1952:32:55;772:5084:65;;;;;1932:10:55;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2044:102:55;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1994:40:55;772:5084:65;;;;;;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;772:5084:65;-1:-1:-1;772:5084:65;;;;;;;-1:-1:-1;;772:5084:65;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;772:5084:65;;;;;-1:-1:-1;772:5084:65;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;;;;;;;;;;;;;:::o;597:755:62:-;;;772:5084:65;;1602:45:62;;;;772:5084:65;;;1602:45:62;772:5084:65;1602:45:62;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1602:45:62;;;;;;;;;;;:::i;:::-;772:5084:65;1592:56:62;;772:5084:65;;-1:-1:-1;;;880:29:62;;;;;772:5084:65;;;1592:56:62;;-1:-1:-1;;;;;772:5084:65;;;-1:-1:-1;772:5084:65;880:29:62;772:5084:65;;880:29:62;;;;;;;;-1:-1:-1;880:29:62;;;597:755;772:5084:65;;923:19:62;919:35;;772:5084:65;;1602:45:62;772:5084:65;;;;;;;;;;;969:52:62;;772:5084:65;880:29:62;969:52;;772:5084:65;;;;;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;;;;;;;880:29:62;772:5084:65;;;1638:4;772:5084;;;;;;;;;;;;969:52:62;;;-1:-1:-1;969:52:62;;;-1:-1:-1;;969:52:62;;;597:755;-1:-1:-1;965:381:62;;772:5084:65;-1:-1:-1;880:29:62;772:5084:65;;;;;;;;;;1207:29:62;;;880;1207;;772:5084:65;1207:29:62;;;;;;;;-1:-1:-1;1207:29:62;;;965:381;772:5084:65;;1254:19:62;1250:35;;1101:29;;;;-1:-1:-1;1306:29:62;880;772:5084:65;880:29:62;-1:-1:-1;1306:29:62;1250:35;1275:10::o;1207:29::-;;;;;;-1:-1:-1;1207:29:62;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;772:5084:65;;;-1:-1:-1;772:5084:65;;;;;965:381:62;1072:20;;;;;;;1068:62;;1144:20;;:::o;1068:62::-;1101:29;;;-1:-1:-1;1101:29:62;880;772:5084:65;880:29:62;-1:-1:-1;1101:29:62;969:52;;;;1602:45;969:52;;1602:45;969:52;;;;;;1602:45;969:52;;;:::i;:::-;;;772:5084:65;;;;;969:52:62;;;;;;;-1:-1:-1;969:52:62;;919:35;944:10;;;;:::o;880:29::-;;;;;;-1:-1:-1;880:29:62;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a7146112345750806354fd4d50146111325780635bf2f20d146110f85780636b122fe014610f57578063760bd11814610ef957806388e5b2d914610dc45780638da3721a14610de357806391db0b7e14610dc457806396afb36514610b935780639c13d80e14610b16578063b3b902d4146108bf578063b587a5eb14610882578063c6ec507014610776578063c93844be146105ed578063cce1f5611461057d578063ce46e04614610561578063e49617e11461053c578063e60c35051461053c5763ea6ec49c0361000f57346105395760403660031901126105395760243590600435610122611cc5565b61012b81611e22565b9261013581611e22565b9360208101517f00000000000000000000000000000000000000000000000000000000000000008091036104815781511561052a576001600160401b03606083015116801515908161051f575b50610510576001600160401b036080830151166105015761012082019182516101aa9061179b565b9151604080516346d1b90d60e11b81526060600482018190528b51606483015260208c01516084830152918b01516001600160401b0390811660a4830152918b0151821660c482015260808b015190911660e482015260a08a015161010482015260c08a0180516001600160a01b0390811661012484015260e08c0151166101448301526101008b01511515610164830152610120909a0151610140610184830152909384928392909190610264906101a48501906112b2565b838103600319016024850152610279916112b2565b60448301919091526001600160a01b039093169203815a93602094fa9081156104f65786916104b8575b50156104a9576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692906102e181611321565b858152866020820152604051906102f782611321565b8382526020820152833b156104a557604051634692626760e01b8152815160048201526020918201518051602483015290910151604482015286808260648183895af19182610490575b505061035b5763614cf93960e01b86526004859052602486fd5b6103716040915160208082518301019101611669565b019081515114610481576103af602091519260a08385015101519360405194858094819363f17325e760e01b835287600484015260248301906114fa565b03925af1849181610449575b506103cf57638d7100d760e01b8452600484fd5b917ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c09491610445939260405193602085015260208452610410604085611372565b516040519687966001600160a01b03909216939180a460015f5160206120b55f395f51905f52556020835260208301906112b2565b0390f35b9091506020813d602011610479575b8161046560209383611372565b810103126104755751905f6103bb565b5f80fd5b3d9150610458565b63629cd40b60e11b8552600485fd5b8161049a91611372565b6104a557865f610341565b8680fd5b630ebe58ef60e11b8552600485fd5b90506020813d6020116104ee575b816104d360209383611372565b810103126104ea576104e4906115e4565b5f6102a3565b8580fd5b3d91506104c6565b6040513d88823e3d90fd5b637b6227e960e11b8552600485fd5b631ab7da6b60e01b8552600485fd5b90504210155f610182565b635c2c7f8960e01b8552600485fd5b80fd5b602061055761054a366115b0565b610552611c6b565b611cac565b6040519015158152f35b5034610539578060031936011261053957602090604051908152f35b50604036600319011261053957600435906001600160401b03821161053957606060031983360301126105395760206105e56105d0846105de6105be611482565b916040519384916004018783016119a6565b03601f198101845283611372565b3391611ed0565b604051908152f35b5034610539576020366003190112610539576004356001600160401b03811161076e5761061e9036906004016114cd565b610629929192611aa0565b5082019160208184031261076e578035906001600160401b03821161077257019060608284031261053957604051916106618361133c565b61066a816114ac565b835260208101356001600160401b038111610772578461068b9183016113e4565b60208401526040810135906001600160401b03821161077257019060408285031261053957604051916106bd83611321565b803583526020810135906001600160401b03821161077257019360c08582031261076e57604051916106ee83611357565b6106f7866114ac565b835261070560208701611498565b6020840152610716604087016114c0565b6040840152606086013560608401526080860135906001600160401b03821161053957509461074c60a0926104459783016113e4565b6080840152013560a08201526020820152604082015260405191829182611569565b5080fd5b8280fd5b503461053957602036600319011261053957610790611aa0565b50610799611cfd565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610875578192610851575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036108425761044561083661012084015160208082518301019101611669565b60405191829182611569565b635527981560e11b8152600490fd5b61086e9192503d8084833e6108668183611372565b810190611d47565b905f6107ef565b50604051903d90823e3d90fd5b503461053957806003193601126105395760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b506060366003190112610539576004356001600160401b03811161076e576108eb9036906004016114cd565b90916109046108f8611482565b936044359336916113ae565b61090c611cc5565b60a060206040610923828551860101838601611669565b01510151015193843403610afe576109eb9394507f0000000000000000000000000000000000000000000000000000000000000000906001600160401b036040519161096e83611357565b3383521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201528860608201528560808201528660a0820152604051906109c382611321565b858252828201526040518098819263f17325e760e01b835284600484015260248301906114fa565b0381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610af3578596610ab8575b5090602096610120939260405193610a3f85611305565b888552898501526001600160401b0342166040850152606084015285608084015260a08301523360c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206120b55f395f51905f5255604051908152f35b92919095506020833d602011610aeb575b81610ad660209383611372565b81010312610475579151949091906020610a28565b3d9150610ac9565b6040513d87823e3d90fd5b630d35e92160e01b8352600485905234602452604483fd5b506060366003190112610539576004356001600160401b03811161076e576060600319823603011261076e57610b4a611482565b604435929091906001600160a01b03841684036105395760206105e58585610b80610b8e876040519283916004018883016119a6565b03601f198101835282611372565b611ed0565b50346104755760203660031901126104755760043590610bb1611cc5565b610bba82611e22565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610db557606084016001600160401b0381511615610da657516001600160401b03164210610da6576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610c4381611321565b8381525f602082015260405192610c5984611321565b83526020830152803b1561047557604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610d91575b50610cbd5763614cf93960e01b825260045260249150fd5b60c0830160a060206040610ce7610120600180861b03865116980151838082518301019101611669565b01510151015180610d41575b506020935060018060a01b03905116907f655ef333d5efcbf5aa343f02bcd9e3539f9c9f9ee8b9cfa7d8910b1bd7e0a8326040519380a360015f5160206120b55f395f51905f525560018152f35b8380808084895af13d15610d8c573d610d5981611393565b90610d676040519283611372565b81528560203d92013e5b610cf3576338f0620160e21b84526004859052602452604483fd5b610d71565b610d9e9193505f90611372565b5f915f610ca5565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b6020610557610dd236611432565b92610dde929192611c6b565b6117c4565b34610475576060366003190112610475576004356001600160401b0381116104755761014060031982360301126104755760405190610e2182611305565b8060040135825260248101356020830152610e3e60448201611498565b6040830152610e4f60648201611498565b6060830152610e6060848201611498565b608083015260a481013560a0830152610e7b60c482016114ac565b60c0830152610e8c60e482016114ac565b60e0830152610e9e61010482016114c0565b610100830152610124810135906001600160401b038211610475576004610ec892369201016113e4565b6101208201526024356001600160401b03811161047557602091610ef36105579236906004016113e4565b90611868565b34610475576020366003190112610475576004356001600160401b03811161047557610f2c610f319136906004016113e4565b61179b565b604080516001600160a01b039093168352602083018190528291610445918301906112b2565b34610475575f36600319011261047557606080604051610f76816112d6565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa80156110ed575f9061103d575b606090610445604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906112b2565b503d805f833e61104d8183611372565b810190602081830312610475578051906001600160401b03821161047557016080818303126104755760405190611083826112d6565b8051825260208101516001600160a01b03811681036104755760208301526110ad604082016115e4565b60408301526060810151906001600160401b038211610475570182601f82011215610475576060928160206110e4935191016115f1565b82820152610ff7565b6040513d5f823e3d90fd5b34610475575f3660031901126104755760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610475575f36600319011261047557610445602061122060016111757f0000000000000000000000000000000000000000000000000000000000000000611afe565b81846111a07f0000000000000000000000000000000000000000000000000000000000000000611afe565b81806111cb7f0000000000000000000000000000000000000000000000000000000000000000611afe565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282611372565b6040519182916020835260208301906112b2565b34610475576020366003190112610475576004359063ffffffff60e01b8216809203610475576020916346d1b90d60e11b81149081159081611279575b505015158152f35b90611287575b508380611271565b630acaa6e160e01b8114915081156112a1575b508361127f565b6301ffc9a760e01b1490508361129a565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b038211176112f157604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b038211176112f157604052565b604081019081106001600160401b038211176112f157604052565b606081019081106001600160401b038211176112f157604052565b60c081019081106001600160401b038211176112f157604052565b90601f801991011681019081106001600160401b038211176112f157604052565b6001600160401b0381116112f157601f01601f191660200190565b9291926113ba82611393565b916113c86040519384611372565b829481845281830111610475578281602093845f960137010152565b9080601f83011215610475578160206113ff933591016113ae565b90565b9181601f84011215610475578235916001600160401b038311610475576020808501948460051b01011161047557565b6040600319820112610475576004356001600160401b038111610475578161145c91600401611402565b92909291602435906001600160401b0382116104755761147e91600401611402565b9091565b602435906001600160401b038216820361047557565b35906001600160401b038216820361047557565b35906001600160a01b038216820361047557565b3590811515820361047557565b9181601f84011215610475578235916001600160401b038311610475576020838186019501011161047557565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a0611560608085015160c0808601526101008501906112b2565b93015191015290565b906113ff916020815260018060a01b038251166020820152604061159b602084015160608385015260808401906112b2565b920151906060601f19828503019101526114fa565b602060031982011261047557600435906001600160401b038211610475576101409082900360031901126104755760040190565b5190811515820361047557565b9291926115fd82611393565b9161160b6040519384611372565b829481845281830111610475578281602093845f96015e010152565b51906001600160a01b038216820361047557565b9080601f830112156104755781516113ff926020016115f1565b51906001600160401b038216820361047557565b602081830312610475578051906001600160401b038211610475570190606082820312610475576040519161169d8361133c565b6116a681611627565b835260208101516001600160401b03811161047557826116c791830161163b565b60208401526040810151906001600160401b03821161047557019060408282031261047557604051916116f983611321565b805183526020810151906001600160401b03821161047557019060c082820312610475576040519161172a83611357565b61173381611627565b835261174160208201611655565b6020840152611752604082016115e4565b60408401526060810151606084015260808101516001600160401b0381116104755760a09261178291830161163b565b6080840152015160a08201526020820152604082015290565b6117ae9060208082518301019101611669565b80516020909101516001600160a01b0390911691565b929092818403611859575f91345b8584101561184e578184101561183a578360051b808601359082821161182b5784013561013e19853603018112156104755761180f908501611cac565b1561182057600191039301926117d2565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f00000000000000000000000000000000000000000000000000000000000000000361194f576118ae6101206118be92015160208082518301019101611669565b9160208082518301019101611669565b60408201516040516118e081610b8060208201946020865260408301906114fa565b519020604082015160405161190581610b8060208201946020865260408301906114fa565b519020149182611936575b8261191a57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611910565b50505f90565b9035601e19823603018112156104755701602081359101916001600160401b03821161047557813603831361047557565b908060209392818452848401375f828201840152601f01601f1916010190565b602081526001600160a01b036119bb836114ac565b1660208201526119e26119d16020840184611955565b606060408501526080840191611986565b916040810135603e19823603018112156104755701906060601f198285030191015280358252602081013560be1982360301811215610475576040602084015201906001600160a01b03611a35836114ac565b1660408201526001600160401b03611a4f60208401611498565b166060820152611a61604083016114c0565b15156080820152606082013560a082015260e060a0611a97611a866080860186611955565b60c080870152610100860191611986565b93013591015290565b60405190611aad8261133c565b815f8152606060208201526040805191611ac683611321565b5f83528151611ad481611357565b5f81525f60208201525f838201525f6060820152606060808201525f60a082015260208401520152565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611c48575b806d04ee2d6d415b85acef8100000000600a921015611c2d575b662386f26fc10000811015611c19575b6305f5e100811015611c08575b612710811015611bf9575b6064811015611beb575b1015611be0575b600a60216001840193611b8585611393565b94611b936040519687611372565b808652611ba2601f1991611393565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611bdb57600a9091611bad565b505090565b600190910190611b73565b606460029104930192611b6c565b61271060049104930192611b62565b6305f5e10060089104930192611b57565b662386f26fc1000060109104930192611b4a565b6d04ee2d6d415b85acef810000000060209104930192611b3a565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611b20565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611c9d57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361047557301490565b60025f5160206120b55f395f51905f525414611cee5760025f5160206120b55f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611d0a82611305565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b602081830312610475578051906001600160401b0382116104755701610140818303126104755760405191611d7b83611305565b8151835260208201516020840152611d9560408301611655565b6040840152611da660608301611655565b6060840152611db760808301611655565b608084015260a082015160a0840152611dd260c08301611627565b60c0840152611de360e08301611627565b60e0840152611df561010083016115e4565b6101008401526101208201516001600160401b03811161047557611e19920161163b565b61012082015290565b90611e2b611cfd565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9283156110ed575f93611eb4575b508251818115918215611ea9575b5050611e975750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611e8e565b611ec99193503d805f833e6108668183611372565b915f611e80565b929192611edb611cc5565b60a060206040611ef2828551860101838601611669565b0151015101519384340361209d57611f9b9394507f0000000000000000000000000000000000000000000000000000000000000000906001600160401b0360405191611f3d83611357565b60018060a01b0316948583521680602083015260207f00000000000000000000000000000000000000000000000000000000000000001515928360408201525f60608201528560808201525f60a0820152604051906109c382611321565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19586156110ed575f96612061575b5090610120929160405192611fec84611305565b87845260208401526001600160401b034216604084015260608301525f60808301525f60a08301528460c08301523060e08301526101008201520152817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206120b55f395f51905f5255565b92919095506020833d602011612095575b8161207f60209383611372565b8101031261047557610120925195909192611fd8565b3d9150612072565b84630d35e92160e01b5f526004523460245260445ffdfe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220e9a3b22b05f71bfde00561b8b6a6f6c5e136d8bb0ecff53ee5c2ab30219ef1cf64736f6c634300081b0033",
    "sourceMap": "772:5084:65:-:0;;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;;;;1183:12:9;;;1054:5;1183:12;772:5084:65;1054:5:9;1183:12;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;;;;;2989:103:41;;:::i;:::-;4123:32:57;;;:::i;:::-;4198:37;;;;:::i;:::-;4297:13;772:5084:65;4297:13:57;;772:5084:65;4314:18:57;4297:35;;;4293:99;;772:5084:65;;1284:28:61;1280:64;;-1:-1:-1;;;;;772:5084:65;801:25:61;;772:5084:65;;801:30:61;;;:78;;;;772:5084:65;1354:55:61;;;-1:-1:-1;;;;;1057:25:61;;;772:5084:65;;1419:58:61;;4589:11:57;;;;;;4573:28;;;:::i;:::-;772:5084:65;;;;;-1:-1:-1;;;4815:56:57;;772:5084:65;;4815:56:57;;772:5084:65;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;1057:25:61;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;4589:11:57;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;772:5084:65;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;4815:56:57;;;;772:5084:65;4815:56:57;;;;;;;;;;;772:5084:65;4814:57:57;;4810:115;;772:5084:65;;4969:3:57;-1:-1:-1;;;;;772:5084:65;;;;;;:::i;:::-;;;;5046:47:57;772:5084:65;5046:47:57;;772:5084:65;;;;;;;:::i;:::-;;;;;4993:102:57;;772:5084:65;4969:136:57;;;;;772:5084:65;;-1:-1:-1;;;4969:136:57;;772:5084:65;;;4969:136:57;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;4969:136:57;;;;;;;772:5084:65;-1:-1:-1;;4965:215:57;;-1:-1:-1;;;5144:25:57;;772:5084:65;;;;;6283:21:57;5144:25;4965:215;2945:41:65;772:5084;4965:215:57;2956:11:65;772:5084;;;;2945:41;;;;;;:::i;:::-;3000:19;;;;772:5084;3000:48;2996:87;;772:5084;;3094:22;3148:19;:24;772:5084;3148:24;;;;:30;772:5084;;;;;;;;;;;;;3130:70;;;772:5084;3130:70;;772:5084;;;;;;:::i;:::-;3130:70;;;;;;;;;4965:215:57;-1:-1:-1;3126:208:65;;-1:-1:-1;;;3296:27:65;;772:5084;3296:27;;3126:208;3237:20;5325:61:57;3237:20:65;;772:5084;3237:20;3126:208;772:5084;;3351:26;772:5084;3351:26;;772:5084;;3351:26;;;772:5084;3351:26;;:::i;:::-;772:5084;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;5325:61:57;772:5084:65;-1:-1:-1;;;;;;;;;;;2407:1:41;772:5084:65;;;;;;;;:::i;:::-;;;;3130:70;;;;772:5084;3130:70;;772:5084;3130:70;;;;;;772:5084;3130:70;;;:::i;:::-;;;772:5084;;;;;3130:70;;;;772:5084;-1:-1:-1;772:5084:65;;3130:70;;;-1:-1:-1;3130:70:65;;2996:87;-1:-1:-1;;;3057:26:65;;772:5084;5733:26:57;3057::65;4969:136:57;;;;;:::i;:::-;772:5084:65;;4969:136:57;;;;772:5084:65;;;;4810:115:57;-1:-1:-1;;;4894:20:57;;772:5084:65;4894:20:57;;4815:56;;;772:5084:65;4815:56:57;;772:5084:65;4815:56:57;;;;;;772:5084:65;4815:56:57;;;:::i;:::-;;;772:5084:65;;;;;;;:::i;:::-;4815:56:57;;;772:5084:65;;;;4815:56:57;;;-1:-1:-1;4815:56:57;;;772:5084:65;;;;;;;;;1419:58:61;-1:-1:-1;;;1457:20:61;;772:5084:65;1457:20:61;;1354:55;-1:-1:-1;;;1392:17:61;;772:5084:65;1392:17:61;;801:78;864:15;;;-1:-1:-1;835:44:61;801:78;;;1280:64;-1:-1:-1;;;1321:23:61;;772:5084:65;1321:23:61;;772:5084:65;;;;;3045:39:9;772:5084:65;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;:::-;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;772:5084:65;;-1:-1:-1;;772:5084:65;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;2176:12:58;4893:16:65;772:5084;4893:16;772:5084;;:::i;:::-;;;;;;;;;4893:16;;;;:::i;:::-;;1055:104:6;;4893:16:65;;;;;;:::i;:::-;4927:10;2176:12:58;;:::i;:::-;772:5084:65;;;;;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;5813:34;;772:5084;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;772:5084:65;;-1:-1:-1;;;4191:23:55;;772:5084:65;;;4191:23:55;;;772:5084:65;;;;4191:23:55;772:5084:65;4191:3:55;-1:-1:-1;;;;;772:5084:65;4191:23:55;;;;;;;;;;;772:5084:65;4228:19:55;772:5084:65;4228:19:55;;772:5084:65;4251:18:55;4228:41;4224:100;;772:5084:65;5581:46;5592:16;;;;772:5084;;;;5581:46;;;;;;:::i;:::-;772:5084;;;;;;;:::i;4224:100:55:-;-1:-1:-1;;;4292:21:55;;772:5084:65;;4292:21:55;4191:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;1332:50:55;772:5084:65;;;;;;-1:-1:-1;772:5084:65;;-1:-1:-1;;772:5084:65;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;:::i;:::-;2989:103:41;;:::i;:::-;2596:30:65;772:5084;;2528:34;772:5084;;;2528:34;;;;;;;:::i;:::-;2596:19;;:24;;:30;772:5084;2640:9;;;:26;2636:106;;772:5084;3559:18:55;;;;772:5084:65;-1:-1:-1;;;;;772:5084:65;;;;;;:::i;:::-;1625:10:58;772:5084:65;;;3601:295:55;772:5084:65;3601:295:55;;772:5084:65;;3751:28:55;772:5084:65;;3601:295:55;;772:5084:65;3601:295:55;;772:5084:65;3601:295:55;772:5084:65;3601:295:55;;772:5084:65;3601:295:55;;;;772:5084:65;3601:295:55;2596:30:65;3601:295:55;;772:5084:65;;;;;;;:::i;:::-;;;;3514:397:55;;;772:5084:65;;;;;;;;;;3490:431:55;;;772:5084:65;3490:431:55;;772:5084:65;;;;;;:::i;:::-;3490:431:55;772:5084:65;;3490:3:55;-1:-1:-1;;;;;772:5084:65;3490:431:55;;;;;;;;;;;772:5084:65;;;;;2347:424:58;772:5084:65;;;;;;;;:::i;:::-;;;;2347:424:58;;;772:5084:65;-1:-1:-1;;;;;2461:15:58;772:5084:65;;2347:424:58;;772:5084:65;;2347:424:58;;772:5084:65;2347:424:58;3601:295:55;2347:424:58;;772:5084:65;2596:30;2347:424:58;;772:5084:65;1625:10:58;772:5084:65;2347:424:58;;772:5084:65;2666:4:58;772:5084:65;2347:424:58;;772:5084:65;2347:424:58;;;772:5084:65;2347:424:58;772:5084:65;1625:10:58;7343:50:57;1625:10:58;7343:50:57;;;2365:1:41;-1:-1:-1;;;;;;;;;;;2407:1:41;772:5084:65;;;;;;3490:431:55;;;;;;772:5084:65;3490:431:55;;772:5084:65;3490:431:55;;;;;;772:5084:65;3490:431:55;;;:::i;:::-;;;772:5084:65;;;;;;;3490:431:55;;;772:5084:65;3490:431:55;;;;;-1:-1:-1;3490:431:55;;;772:5084:65;;;;;;;;;2636:106;-1:-1:-1;;;2689:42:65;;772:5084;;;;2640:9;772:5084;;;2689:42;;772:5084;-1:-1:-1;772:5084:65;;-1:-1:-1;;772:5084:65;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;2176:12:58;772:5084:65;;5256:16;;772:5084;;;;;;;;5256:16;;;;:::i;:::-;;1055:104:6;;5256:16:65;;;;;;:::i;:::-;2176:12:58;:::i;772:5084:65:-;;;;;;;-1:-1:-1;;772:5084:65;;;;;;2989:103:41;;;:::i;:::-;5575:28:57;;;:::i;:::-;5670:18;772:5084:65;5670:18:57;;772:5084:65;5692:18:57;5670:40;;;5666:104;;5879:26;;;-1:-1:-1;;;;;772:5084:65;;;5879:31:57;5875:62;;772:5084:65;-1:-1:-1;;;;;772:5084:65;5952:15:57;:44;5948:100;;772:5084:65;;6112:3:57;-1:-1:-1;;;;;772:5084:65;;;;;:::i;:::-;;;;;;6189:43:57;;772:5084:65;;;;;;;:::i;:::-;;;;6136:98:57;;772:5084:65;6112:132:57;;;;;772:5084:65;;-1:-1:-1;;;6112:132:57;;772:5084:65;;;6112:132:57;;772:5084:65;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;;-1:-1:-1;;6112:132:57;;;;;;772:5084:65;-1:-1:-1;6108:207:57;;-1:-1:-1;;;6283:21:57;;772:5084:65;;;;-1:-1:-1;6283:21:57;6108:207;6407:21;;;3638:30:65;772:5084;;3563:41;3574:11;772:5084;;;;;;;;3574:11;;;772:5084;;;;3563:41;;;;;;:::i;:::-;3638:19;;:24;;:30;772:5084;3682:18;3678:220;;6108:207:57;772:5084:65;;;;;;;;;;;;;6445:43:57;772:5084:65;;6445:43:57;;;772:5084:65;-1:-1:-1;;;;;;;;;;;2407:1:41;772:5084:65;;;;3678:220;3734:42;;;;;;;;772:5084;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;3678:220;3790:98;-1:-1:-1;;;3829:44:65;;772:5084;;;;;;;3829:44;;772:5084;;;6112:132:57;;;;;772:5084:65;6112:132:57;;:::i;:::-;772:5084:65;6112:132:57;;;;5948:100;5919:18;;;772:5084:65;6019:18:57;772:5084:65;;6019:18:57;5666:104;5733:26;;;772:5084:65;5733:26:57;772:5084:65;;5733:26:57;772:5084:65;;1442:1461:9;772:5084:65;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;772:5084:65:-;;;;;;-1:-1:-1;;772:5084:65;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;772:5084:65;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;772:5084:65;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;2937:44:55;;2962:18;772:5084:65;2937:44:55;;772:5084:65;;;2937:44:55;772:5084:65;;;;;;2937:14:55;772:5084:65;2937:44:55;;;;;;772:5084:65;2937:44:55;;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;2937:44:55:-;;;;772:5084:65;2937:44:55;;;;;;:::i;:::-;;;772:5084:65;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;2937:44:55;;;772:5084:65;;;;;;;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;;;1204:43:55;772:5084:65;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;1055:104:6;;772:5084:65;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;772:5084:65;;;;;;;;;;;;1055:104:6;;;772:5084:65;;;;-1:-1:-1;;;772:5084:65;;;;;;;;;;;;;;;;;-1:-1:-1;;;772:5084:65;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;:::-;772:5084:65;;;;;1055:104:6;772:5084:65;;1055:104:6;772:5084:65;;;;:::i;:::-;;;;;;-1:-1:-1;;772:5084:65;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;1919:41:65;;;:81;;;;;;772:5084;;;;;;;;1919:81;573::54;;;1919::65;;;;;;573::54;-1:-1:-1;;;2431:40:57;;;-1:-1:-1;2431:80:57;;;;573:81:54;;;;;2431:80:57;-1:-1:-1;;;829:40:49;;-1:-1:-1;2431:80:57;;;772:5084:65;;;;;;;;;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;;;-1:-1:-1;;772:5084:65;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;:::o;:::-;;;;-1:-1:-1;772:5084:65;;;;;-1:-1:-1;772:5084:65;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;:::o;:::-;;;1055:104:6;;772:5084:65;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;:::o;:::-;-1:-1:-1;;;;;772:5084:65;;;;;;-1:-1:-1;;772:5084:65;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;772:5084:65;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;-1:-1:-1;;;;;772:5084:65;;;;;;:::o;:::-;;;-1:-1:-1;;;;;772:5084:65;;;;;;:::o;:::-;;;-1:-1:-1;;;;;772:5084:65;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1055:104:6;772:5084:65;1055:104:6;;772:5084:65;;;;;;;;:::i;:::-;;-1:-1:-1;;772:5084:65;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;-1:-1:-1;;772:5084:65;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;:::o;:::-;;;-1:-1:-1;;;;;772:5084:65;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;772:5084:65;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::o;2119:245::-;2273:34;2119:245;2273:34;772:5084;;;2273:34;;;;;;:::i;:::-;772:5084;;2273:34;2342:14;;;;-1:-1:-1;;;;;772:5084:65;;;;2119:245::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;772:5084:65;;;;;;;;;;;;;4064:22:9;;;;4060:87;;772:5084:65;;;;;;;;;;;;;;4274:33:9;772:5084:65;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;772:5084:65;;3896:19:9;772:5084:65;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;772:5084:65;;;;3881:1:9;772:5084:65;;;;;3881:1:9;772:5084:65;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;3965:657:65;4174:17;;;772:5084;4195:18;4174:39;4170:57;;4269:45;4280:15;4359:36;4280:15;;;4174:17;772:5084;;;4269:45;;;;;;:::i;:::-;772:5084;4174:17;772:5084;;;4359:36;;;;;;:::i;:::-;4434:18;;;;;772:5084;4423:30;;772:5084;4174:17;4423:30;;772:5084;4174:17;772:5084;;4434:18;772:5084;;;;:::i;4423:30::-;772:5084;4413:41;;4434:18;4479:22;;;4434:18;772:5084;4468:34;;772:5084;4174:17;4468:34;;772:5084;4174:17;772:5084;;4434:18;772:5084;;;;:::i;4468:34::-;772:5084;4458:45;;4413:90;:142;;;;3965:657;4413:202;;;4406:209;;3965:657;:::o;4413:202::-;4174:17;4569:13;;;;;;772:5084;;;;;4559:24;4597:17;;;4174;772:5084;;;;4587:28;4559:56;3965:657;:::o;4413:142::-;772:5084;;;;-1:-1:-1;;;;;772:5084:65;;;;;4519:36;;-1:-1:-1;4413:142:65;;4170:57;4215:12;;772:5084;4215:12;:::o;772:5084::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;;;-1:-1:-1;;772:5084:65;;;;:::o;:::-;;;;-1:-1:-1;;;;;772:5084:65;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;1055:104:6;772:5084:65;1055:104:6;;772:5084:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;:::i;:::-;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;-1:-1:-1;772:5084:65;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;772:5084:65;;;;;;;:::i;:::-;-1:-1:-1;772:5084:65;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;;;;;;-1:-1:-1;772:5084:65;;;;;;;;;;:::o;1343:634:44:-;1465:17;-1:-1:-1;29298:17:51;-1:-1:-1;;;29298:17:51;;;29294:103;;1343:634:44;29414:17:51;29423:8;29994:7;29414:17;;;29410:103;;1343:634:44;29539:8:51;29530:17;;;29526:103;;1343:634:44;29655:7:51;29646:16;;;29642:100;;1343:634:44;29768:7:51;29759:16;;;29755:100;;1343:634:44;29881:7:51;29872:16;;;29868:100;;1343:634:44;29985:16:51;;29981:66;;1343:634:44;29994:7:51;1580:94:44;1485:1;772:5084:65;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;772:5084:65;;:::i;:::-;;;;;;;1580:94:44;;;1687:247;-1:-1:-1;;772:5084:65;;-1:-1:-1;;;1741:111:44;;;;772:5084:65;1741:111:44;772:5084:65;1902:10:44;;1898:21;;29994:7:51;1687:247:44;;;;1898:21;1914:5;;1343:634;:::o;29981:66:51:-;30031:1;772:5084:65;;;;29981:66:51;;29868:100;29881:7;29952:1;772:5084:65;;;;29868:100:51;;;29755;29768:7;29839:1;772:5084:65;;;;29755:100:51;;;29642;29655:7;29726:1;772:5084:65;;;;29642:100:51;;;29526:103;29539:8;29612:2;772:5084:65;;;;29526:103:51;;;29410;29423:8;29496:2;772:5084:65;;;;29410:103:51;;;29294;-1:-1:-1;29380:2:51;;-1:-1:-1;;;;772:5084:65;;29294:103:51;;6040:128:9;6109:4;-1:-1:-1;;;;;772:5084:65;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;2506:271:55;2733:20;;772:5084:65;;;;;;;;;;;;;2765:4:55;2733:37;2506:271;:::o;3749:292:41:-;2407:1;-1:-1:-1;;;;;;;;;;;772:5084:65;4560:63:41;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:41;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:41;;-1:-1:-1;3696:30:41;772:5084:65;;;;;;;:::i;:::-;;;;-1:-1:-1;772:5084:65;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;-1:-1:-1;772:5084:65;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;772:5084:65;;;;;;;;:::i;:::-;;;;;;:::o;6671:257:57:-;;772:5084:65;;:::i;:::-;-1:-1:-1;772:5084:65;;-1:-1:-1;;;6796:23:57;;;;;772:5084:65;;;;-1:-1:-1;772:5084:65;6796:23:57;772:5084:65;6796:3:57;-1:-1:-1;;;;;772:5084:65;6796:23:57;;;;;;;-1:-1:-1;6796:23:57;;;6671:257;6782:37;;772:5084:65;6833:29:57;;;:55;;;;;6671:257;6829:92;;;;6671:257;:::o;6829:92::-;6897:24;;;-1:-1:-1;6897:24:57;6796:23;772:5084:65;6796:23:57;-1:-1:-1;6897:24:57;6833:55;6866:22;;;-1:-1:-1;6833:55:57;;;;6796:23;;;;;;;-1:-1:-1;6796:23:57;;;;;;:::i;:::-;;;;;2989:103:41;;;;;;:::i;:::-;2596:30:65;2528:34;2596:19;2528:34;772:5084;;;2528:34;;;;;;;:::i;:::-;2596:19;;:24;;:30;772:5084;2640:9;;;:26;2636:106;;772:5084;3559:18:55;;;;772:5084:65;-1:-1:-1;;;;;2596:19:65;772:5084;;;;;:::i;:::-;;;;;;;;;;;;3601:295:55;2528:34:65;3601:295:55;;772:5084:65;2528:34;3751:28:55;772:5084:65;;3601:295:55;;2596:19:65;3601:295:55;;772:5084:65;;3601:295:55;;;772:5084:65;3601:295:55;;;;772:5084:65;;2596:30;3601:295:55;;772:5084:65;2596:19;772:5084;;;;;:::i;:::-;3490:431:55;772:5084:65;;3490:3:55;-1:-1:-1;;;;;772:5084:65;3490:431:55;;;;;;;772:5084:65;3490:431:55;;;2989:103:41;772:5084:65;;2347:424:58;772:5084:65;;2596:19;772:5084;;;;;:::i;:::-;;;;2528:34;2347:424:58;;772:5084:65;-1:-1:-1;;;;;2461:15:58;772:5084:65;2596:19;2347:424:58;;772:5084:65;3601:295:55;2347:424:58;;772:5084:65;;3601:295:55;2347:424:58;;772:5084:65;;2596:30;2347:424:58;;772:5084:65;2347:424:58;772:5084:65;2347:424:58;;772:5084:65;2666:4:58;772:5084:65;2347:424:58;;772:5084:65;2347:424:58;;;772:5084:65;2347:424:58;772:5084:65;7343:50:57;;772:5084:65;7343:50:57;;2407:1:41;2365;-1:-1:-1;;;;;;;;;;;2407:1:41;2989:103::o;3490:431:55:-;;;;;;2528:34:65;3490:431:55;;2528:34:65;3490:431:55;;;;;;772:5084:65;3490:431:55;;;:::i;:::-;;;772:5084:65;;;;2347:424:58;772:5084:65;;3490:431:55;;;;;;;;;-1:-1:-1;3490:431:55;;2636:106:65;2689:42;;;;772:5084;2689:42;;772:5084;2640:9;772:5084;;;;2689:42",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 4433,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 4476,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 4519,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 7277,
          "length": 32
        }
      ],
      "50371": [
        {
          "start": 4040,
          "length": 32
        }
      ],
      "50375": [
        {
          "start": 686,
          "length": 32
        },
        {
          "start": 1975,
          "length": 32
        },
        {
          "start": 2544,
          "length": 32
        },
        {
          "start": 3089,
          "length": 32
        },
        {
          "start": 7752,
          "length": 32
        },
        {
          "start": 8096,
          "length": 32
        }
      ],
      "50378": [
        {
          "start": 317,
          "length": 32
        },
        {
          "start": 2039,
          "length": 32
        },
        {
          "start": 2361,
          "length": 32
        },
        {
          "start": 3010,
          "length": 32
        },
        {
          "start": 3990,
          "length": 32
        },
        {
          "start": 4367,
          "length": 32
        },
        {
          "start": 6255,
          "length": 32
        },
        {
          "start": 7944,
          "length": 32
        }
      ],
      "50381": [
        {
          "start": 2202,
          "length": 32
        },
        {
          "start": 2428,
          "length": 32
        },
        {
          "start": 8020,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "ATTESTATION_SCHEMA_REVOCABLE()": "b587a5eb",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "8da3721a",
    "collect(bytes32,bytes32)": "ea6ec49c",
    "decodeCondition(bytes)": "760bd118",
    "decodeObligationData(bytes)": "c93844be",
    "doObligation((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64)": "cce1f561",
    "doObligationFor((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64,address)": "9c13d80e",
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
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationCreationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\"}],\"name\":\"IncorrectPayment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillmentUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"escrower\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"escrower\",\"type\":\"address\"}],\"name\":\"EscrowReclaimed\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA_REVOCABLE\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"check\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collect\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeCondition\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct UnconditionalAttestationEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct UnconditionalAttestationEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct UnconditionalAttestationEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct UnconditionalAttestationEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaim\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"details\":\"Does not apply the default fulfillment refUID or intrinsic checks; use arbiters to add any required checks.\",\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"params\":{\"demand\":\"Arbiter-specific demand data encoded by the escrow creator.\",\"escrowUid\":\"The UID of the escrow attestation being fulfilled.\",\"fulfillment\":\"The EAS attestation being used as fulfillment.\"}},\"collect(bytes32,bytes32)\":{\"params\":{\"escrowUid\":\"UID of the escrow attestation.\",\"fulfillmentUid\":\"UID of the fulfillment attestation.\"},\"returns\":{\"_0\":\"Escrow-specific return data from the underlying release logic.\"}},\"decodeCondition(bytes)\":{\"params\":{\"escrowData\":\"ABI-encoded escrow obligation data.\"},\"returns\":{\"arbiter\":\"Address of the arbiter that validates fulfillment.\",\"demand\":\"Arbiter-specific demand bytes.\"}},\"doObligationRaw(bytes,uint64,bytes32)\":{\"params\":{\"data\":\"ABI-encoded obligation data.\",\"expirationTime\":\"EAS expiration timestamp, or zero for no expiration.\",\"refUID\":\"Reference UID stored on the EAS attestation.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"reclaim(bytes32)\":{\"params\":{\"escrowUid\":\"UID of the escrow attestation.\"},\"returns\":{\"_0\":\"True if the reclaim succeeds.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"title\":\"UnconditionalAttestationEscrowObligation\",\"version\":1},\"userdoc\":{\"errors\":{\"AttestationNotFound(bytes32)\":[{\"notice\":\"Raised when EAS has no attestation for the requested UID.\"}],\"AttestationRevoked()\":[{\"notice\":\"Raised when an attestation has been revoked.\"}],\"DeadlineExpired()\":[{\"notice\":\"Raised when an attestation has expired.\"}],\"InvalidAttestationUid()\":[{\"notice\":\"Raised when an attestation UID is zero.\"}],\"InvalidEscrowAttestation()\":[{\"notice\":\"Raised when the escrow attestation is missing, invalid, expired, revoked, or has the wrong schema.\"}],\"InvalidFulfillment()\":[{\"notice\":\"Raised when the fulfillment does not satisfy the escrow's configured arbiter.\"}],\"NotFromThisAttester()\":[{\"notice\":\"Raised when an attestation does not belong to this contract's schema.\"}],\"RevocationFailed(bytes32)\":[{\"notice\":\"Raised when revoking the escrow attestation fails during collect or reclaim.\"}],\"SchemaRegistrationFailed(bytes32)\":[{\"notice\":\"Raised when a schema cannot be registered or found at its deterministic UID.\"}],\"UnauthorizedCall()\":[{\"notice\":\"Raised when a caller attempts an action that is not currently permitted.\"}]},\"events\":{\"EscrowCollected(bytes32,bytes32,address)\":{\"notice\":\"Emitted when an escrow is successfully collected by a fulfillment recipient.\"},\"EscrowMade(bytes32,address)\":{\"notice\":\"Emitted when escrow assets are locked and the escrow attestation is created.\"},\"EscrowReclaimed(bytes32,address)\":{\"notice\":\"Emitted when an expired escrow is reclaimed by its original escrower.\"}},\"kind\":\"user\",\"methods\":{\"ATTESTATION_SCHEMA()\":{\"notice\":\"UID of the schema used by attestations created by this contract.\"},\"ATTESTATION_SCHEMA_REVOCABLE()\":{\"notice\":\"Whether attestations under `ATTESTATION_SCHEMA` are revocable.\"},\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"notice\":\"Returns true when `fulfillment` satisfies `demand` for `escrowUid`.\"},\"collect(bytes32,bytes32)\":{\"notice\":\"Collects an escrow using a fulfillment attestation.\"},\"decodeCondition(bytes)\":{\"notice\":\"Decodes an escrow attestation's condition into arbiter and demand data.\"},\"decodeObligationData(bytes)\":{\"notice\":\"Decodes ABI-encoded attestation escrow data.\"},\"doObligation((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64)\":{\"notice\":\"Locks native token and creates an attestation escrow for the caller.\"},\"doObligationFor((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64,address)\":{\"notice\":\"Locks native token and creates an attestation escrow for an explicit recipient.\"},\"doObligationRaw(bytes,uint64,bytes32)\":{\"notice\":\"Creates an obligation attestation from pre-encoded data.\"},\"getObligationData(bytes32)\":{\"notice\":\"Loads and decodes attestation escrow data from this contract's attestation.\"},\"getSchema()\":{\"notice\":\"Returns the schema record registered for this attester.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"reclaim(bytes32)\":{\"notice\":\"Reclaims an expired escrow and returns locked assets to the escrower.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"notice\":\"Escrows native token and releases it with the fulfillment attestation data.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/unconditional/UnconditionalAttestationEscrowObligation.sol\":\"UnconditionalAttestationEscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377\",\"dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/BaseArbiter.sol\":{\"keccak256\":\"0x27fa97834bcd6e592f3b534e64859b208c688363d33fb9b62436d009ffff3ed1\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b61ac6195ae644325adf77fdb301651cddfca4b63d9db5123ee075869f3784aa\",\"dweb:/ipfs/QmYRu5hER8gaMjqyY5bDV9EAwVN12CbS3Z2bW8dLp7sPSE\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0x12339a862aa0571244f4a0c2dae1a7bcc1734717474dbf0d69b63886987d1f99\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d40e983dece581ecb49a1a01bc87c66e86f8c954cc442a02151ec427d680682d\",\"dweb:/ipfs/QmVA7Tqk1KaYhrZpxWx3cdsjUoxsRaoBjJX8k6nCSEk8En\"]},\"src/BaseEscrowObligationUnconditional.sol\":{\"keccak256\":\"0x4b5953fe02bf51931db76577be2688e2193b0fbc387a077e52ab57c01d981d6b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f83218c7d1dba95fe81ef42108978a8e67c93cd84991213e36693817b7e2aa3a\",\"dweb:/ipfs/QmSjVxWETZJC58XxyhVbwZ6iU77a6oXATvwjH7aJG7DofW\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xf00b1317dd9203ea59e8da6c0bb23267b50ecb2751cd11b26a6330d1e596eb7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5b9762a2ba2251c6ae9d23aa3ba49a8124f3348ac13c9271b8b9ada438dff475\",\"dweb:/ipfs/QmeBZUvNjNyC7W1hb1PKQq8CawC5ULWX9KXgJjH37wvPGH\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x00f3f5d8460c738eff4a776cf309efe38342fcc951abfe97d1c2e285acb1e330\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://7201a176f3d5c3d01ca13bbcd9ef5587effe8fabf20e0b8f81f2d6ee362269b9\",\"dweb:/ipfs/QmXn9aSvoGPQuNTxe3mM47RNQ1bfYCEczQCYsDDM9ohc8M\"]},\"src/IEscrow.sol\":{\"keccak256\":\"0x8803bb72e285722a5e90f08046cfee7d37acc6cf83c13a5074cfb0740e316a45\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://965024e29be08418fd9acef578b5253af5fb0d39227c291298d83dae5d7ffd01\",\"dweb:/ipfs/QmPh2h21EC6L4aWauvk5cFzc4x3Xf4f1brxyrgxeKUuWEs\"]},\"src/libraries/ArbiterUtils.sol\":{\"keccak256\":\"0xb87e2bfb9c7292daf6426fbedc09c8683b92841d1b92e7359c0ff94d42be632f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3acf498c3c59891d76db768ea57d8f7f6b4010dcbaf44a5f93d95d72f0b12441\",\"dweb:/ipfs/QmVbkioM8dWwYxqatm1dyo9PRFNZ6c7Kbang7pozbnyS7j\"]},\"src/libraries/SchemaRegistryUtils.sol\":{\"keccak256\":\"0x81e4728ad79515866f28175a00a512afd2f7010bd109ae221defb29a87430cd0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://4edac7284c764f1236b5875ed00f357f0e30aecc5006c88afe220bef60b541d3\",\"dweb:/ipfs/QmXj8oLa1RXMgHCXtgdbriVqQFgX6rjnPNbmQpwpK2YXsK\"]},\"src/obligations/escrow/unconditional/UnconditionalAttestationEscrowObligation.sol\":{\"keccak256\":\"0xd77bcd98c173d1a1bb449a3c0b5edd0b56b98cbfe9864ead053b15ca34f7813d\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://95bafb98c88a85d411ab2a6ac049305b026fd0a5c4c97ddffb1a196fb7cfeeb3\",\"dweb:/ipfs/QmX3QJJW4KLv1UYCnam8k7AqAF9nHnddZn5xQhNd4wfdXR\"]}},\"version\":1}",
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
          "name": "AttestationCreationFailed"
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
              "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
                  "internalType": "struct AttestationRequest",
                  "name": "attestation",
                  "type": "tuple",
                  "components": [
                    {
                      "internalType": "bytes32",
                      "name": "schema",
                      "type": "bytes32"
                    },
                    {
                      "internalType": "struct AttestationRequestData",
                      "name": "data",
                      "type": "tuple",
                      "components": [
                        {
                          "internalType": "address",
                          "name": "recipient",
                          "type": "address"
                        },
                        {
                          "internalType": "uint64",
                          "name": "expirationTime",
                          "type": "uint64"
                        },
                        {
                          "internalType": "bool",
                          "name": "revocable",
                          "type": "bool"
                        },
                        {
                          "internalType": "bytes32",
                          "name": "refUID",
                          "type": "bytes32"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
                  "internalType": "struct AttestationRequest",
                  "name": "attestation",
                  "type": "tuple",
                  "components": [
                    {
                      "internalType": "bytes32",
                      "name": "schema",
                      "type": "bytes32"
                    },
                    {
                      "internalType": "struct AttestationRequestData",
                      "name": "data",
                      "type": "tuple",
                      "components": [
                        {
                          "internalType": "address",
                          "name": "recipient",
                          "type": "address"
                        },
                        {
                          "internalType": "uint64",
                          "name": "expirationTime",
                          "type": "uint64"
                        },
                        {
                          "internalType": "bool",
                          "name": "revocable",
                          "type": "bool"
                        },
                        {
                          "internalType": "bytes32",
                          "name": "refUID",
                          "type": "bytes32"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ]
                    }
                  ]
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
              "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
                  "internalType": "struct AttestationRequest",
                  "name": "attestation",
                  "type": "tuple",
                  "components": [
                    {
                      "internalType": "bytes32",
                      "name": "schema",
                      "type": "bytes32"
                    },
                    {
                      "internalType": "struct AttestationRequestData",
                      "name": "data",
                      "type": "tuple",
                      "components": [
                        {
                          "internalType": "address",
                          "name": "recipient",
                          "type": "address"
                        },
                        {
                          "internalType": "uint64",
                          "name": "expirationTime",
                          "type": "uint64"
                        },
                        {
                          "internalType": "bool",
                          "name": "revocable",
                          "type": "bool"
                        },
                        {
                          "internalType": "bytes32",
                          "name": "refUID",
                          "type": "bytes32"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ]
                    }
                  ]
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
              "internalType": "struct UnconditionalAttestationEscrowObligation.ObligationData",
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
                  "internalType": "struct AttestationRequest",
                  "name": "attestation",
                  "type": "tuple",
                  "components": [
                    {
                      "internalType": "bytes32",
                      "name": "schema",
                      "type": "bytes32"
                    },
                    {
                      "internalType": "struct AttestationRequestData",
                      "name": "data",
                      "type": "tuple",
                      "components": [
                        {
                          "internalType": "address",
                          "name": "recipient",
                          "type": "address"
                        },
                        {
                          "internalType": "uint64",
                          "name": "expirationTime",
                          "type": "uint64"
                        },
                        {
                          "internalType": "bool",
                          "name": "revocable",
                          "type": "bool"
                        },
                        {
                          "internalType": "bytes32",
                          "name": "refUID",
                          "type": "bytes32"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ]
                    }
                  ]
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
            "notice": "Decodes ABI-encoded attestation escrow data."
          },
          "doObligation((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64)": {
            "notice": "Locks native token and creates an attestation escrow for the caller."
          },
          "doObligationFor((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64,address)": {
            "notice": "Locks native token and creates an attestation escrow for an explicit recipient."
          },
          "doObligationRaw(bytes,uint64,bytes32)": {
            "notice": "Creates an obligation attestation from pre-encoded data."
          },
          "getObligationData(bytes32)": {
            "notice": "Loads and decodes attestation escrow data from this contract's attestation."
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
        "src/obligations/escrow/unconditional/UnconditionalAttestationEscrowObligation.sol": "UnconditionalAttestationEscrowObligation"
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
      "src/BaseEscrowObligationUnconditional.sol": {
        "keccak256": "0x4b5953fe02bf51931db76577be2688e2193b0fbc387a077e52ab57c01d981d6b",
        "urls": [
          "bzz-raw://f83218c7d1dba95fe81ef42108978a8e67c93cd84991213e36693817b7e2aa3a",
          "dweb:/ipfs/QmSjVxWETZJC58XxyhVbwZ6iU77a6oXATvwjH7aJG7DofW"
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
      "src/obligations/escrow/unconditional/UnconditionalAttestationEscrowObligation.sol": {
        "keccak256": "0xd77bcd98c173d1a1bb449a3c0b5edd0b56b98cbfe9864ead053b15ca34f7813d",
        "urls": [
          "bzz-raw://95bafb98c88a85d411ab2a6ac049305b026fd0a5c4c97ddffb1a196fb7cfeeb3",
          "dweb:/ipfs/QmX3QJJW4KLv1UYCnam8k7AqAF9nHnddZn5xQhNd4wfdXR"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 65
} as const;
