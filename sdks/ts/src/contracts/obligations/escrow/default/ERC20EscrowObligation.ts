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
          "internalType": "struct ERC20EscrowObligation.ObligationData",
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
          "internalType": "struct ERC20EscrowObligation.ObligationData",
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
          "internalType": "struct ERC20EscrowObligation.ObligationData",
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
          "internalType": "struct ERC20EscrowObligation.ObligationData",
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
    "object": "0x61016080604052346101bb5760408161256b803803809161002082856101bf565b8339810103126101bb578051906001600160a01b038216908183036101bb57602001516001600160a01b03811691908281036101bb57604051916100656060846101bf565b603c83527f6164647265737320617262697465722c2062797465732064656d616e642c206160208401527f64647265737320746f6b656e2c2075696e7432353620616d6f756e740000000060408401526001608052600360a0525f60c052156101ac57836100df9460e052610120526101005230916102da565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00556040516120b590816104b6823960805181610d28015260a05181610d53015260c05181610d7e015260e05181611a9b01526101005181610b9f015261012051818181610370015281816106e801528181610a120152818161141301528181611a110152611f300152610140518181816103b00152818161063b015281816109c301528181610b6d01528181610ce6015281816112ab015281816116400152611e830152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b038211908210176101e257604052565b634e487b7160e01b5f52604160045260245ffd5b6020818303126101bb578051906001600160401b0382116101bb5701906080828203126101bb5760405191608083016001600160401b038111848210176101e2576040528051835260208101516001600160a01b03811681036101bb576020840152604081015180151581036101bb5760408401526060810151906001600160401b0382116101bb570181601f820112156101bb578051906001600160401b0382116101e257604051926102b4601f8401601f1916602001856101bf565b828452602083830101116101bb57815f9260208093018386015e83010152606082015290565b929160405190602082018351926103246015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a198101845201826101bf565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156104355787915f9161049b575b505114610495579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610461575b5061044057505f602491604051928380926351753e3760e11b82528760048301525afa80156104355783915f91610413575b5051146104115750639e6113d560e01b5f5260045260245ffd5b565b61042f91503d805f833e61042781836101bf565b8101906101f6565b5f6103f7565b6040513d5f823e3d90fd5b9192809150820361044f575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d60201161048d575b8161047d602093836101bf565b810103126101bb5751905f6103c5565b3d9150610470565b50505050565b6104af91503d805f833e61042781836101bf565b5f61035f56fe60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610df757806354fd4d5014610d095780635bf2f20d14610ccf5780636b122fe014610b2e5780637d2c2931146109945780638371ef591461093557806388e5b2d9146108e7578063891d9ea81461090657806391db0b7e146108e7578063a4f0d5171461087a578063b3b902d4146104c5578063c1e4a7101461043b578063c6ec50701461032f578063c93844be14610258578063ce46e0461461023c578063e49617e114610221578063e60c3505146102215763e6c9714d146100f8575061000e565b3461021a57606036600319011261021a57600435906001600160401b03821161021a57610140600319833603011261021a576040519161013783610e98565b806004013583526024810135602084015261015460448201610ff5565b604084015261016560648201610ff5565b606084015261017660848201610ff5565b608084015260a481013560a084015261019160c48201611036565b60c08401526101a260e48201611036565b60e0840152610104810135801515810361021d576101008401526101248101356001600160401b03811161021d576101df91369101600401610f41565b610120830152602435906001600160401b03821161021a5760206102108461020a3660048701610f41565b90611639565b6040519015158152f35b80fd5b8280fd5b602061021061022f36611094565b610237611a99565b611ada565b503461021a578060031936011261021a57602090604051908152f35b503461021a57602036600319011261021a576004356001600160401b03811161032b57610289903690600401611009565b610294929192611615565b5082019160208184031261032b578035906001600160401b03821161021d57019160808382031261032b57604051916102cc83610e4e565b6102d584611036565b83526020840135906001600160401b03821161021a5750926102fe606092610327958301610f41565b602084015261030f60408201611036565b6040840152013560608201526040519182918261104a565b0390f35b5080fd5b503461021a57602036600319011261021a57610349611615565b506103526118b2565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561042e57819261040a575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036103fb576103276103ef61012084015160208082518301019101611139565b6040519182918261104a565b635527981560e11b8152600490fd5b6104279192503d8084833e61041f8183610ecf565b810190611910565b905f6103a8565b50604051903d90823e3d90fd5b503461021a57606036600319011261021a576004356001600160401b03811161032b576080600319823603011261032b57610474610fdf565b604435929091906001600160a01b038416840361021a5760206104bd85856104aa6104b88760405192839160040188830161157d565b03601f198101835282610ecf565b611d46565b604051908152f35b50606036600319011261021a576004356001600160401b03811161032b576104f4610506913690600401611009565b91906104fe610fdf565b923691610f0b565b61050e61187a565b6105216020825183010160208301611139565b6040818101805191516370a0823160e01b81523060048201529091602090829060249082906001600160a01b03165afa90811561086f57869161083d575b50815160609390930180516040516323b872dd60e01b8952336004523060245260449190915290936001600160a01b031660208860648180855af1906001895114821615610830575b50816040528760605260208260248160018060a01b038851166370a0823160e01b82523060048301525afa9182156108255788926107ed575b50159182156107d7575b50506107a15750506001600160401b036040519261060884610eb4565b33845216602083015260016040830152604435606083015260808201528160a0820152602060405161063981610e7d565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06106da608083015160c060e4860152610124850190610e2a565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115610796578291610763575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206120605f395f51905f5255604051908152f35b90506020813d60201161078e575b8161077e60209383610ecf565b8101031261032b57516020610720565b3d9150610771565b6040513d84823e3d90fd5b519051604051634a73404560e11b81526001600160a01b0390921660048301523360248301523060448301526064820152608490fd5b6107e5919250845190611b65565b115f806105eb565b9091506020813d60201161081d575b8161080960209383610ecf565b810103126108195751905f6105e1565b5f80fd5b3d91506107fc565b6040513d8a823e3d90fd5b3b15153d1516165f6105a8565b90506020813d602011610867575b8161085860209383610ecf565b8101031261081957515f61055f565b3d915061084b565b6040513d88823e3d90fd5b503461021a57604036600319011261021a57600435906001600160401b03821161021a576080600319833603011261021a5760206104bd6108d2846108e06108c0610fdf565b9160405193849160040187830161157d565b03601f198101845283610ecf565b3391611d46565b60206102106108f536610f8f565b92610901929192611a99565b6111e2565b503461021a5761032761092161091b36610e14565b90611286565b604051918291602083526020830190610e2a565b503461021a57602036600319011261021a57600435906001600160401b03821161021a5761096e6109693660048501610f41565b6111b9565b604080516001600160a01b03909316835260208301819052829161032791830190610e2a565b503461081957602036600319011261081957600435906109b261187a565b6109bb826119eb565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610b1f57606084016001600160401b0381511615610b1057516001600160401b03164210610b10576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610a4481610e7d565b8381525f602082015260405192610a5a84610e7d565b83526020830152803b1561081957604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610afb575b50610abe5763614cf93960e01b825260045260249150fd5b61012083015160c0840151610ade916001600160a01b0390911690611b86565b5060015f5160206120605f395f51905f5255602060405160018152f35b610b089193505f90610ecf565b5f915f610aa6565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b34610819575f36600319011261081957606080604051610b4d81610e4e565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610cc4575f90610c14575b606090610327604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610e2a565b503d805f833e610c248183610ecf565b810190602081830312610819578051906001600160401b03821161081957016080818303126108195760405190610c5a82610e4e565b8051825260208101516001600160a01b0381168103610819576020830152610c84604082016110c8565b60408301526060810151906001600160401b038211610819570182601f8201121561081957606092816020610cbb935191016110d5565b82820152610bce565b6040513d5f823e3d90fd5b34610819575f3660031901126108195760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610819575f3660031901126108195761032760206109216001610d4c7f000000000000000000000000000000000000000000000000000000000000000061170d565b8184610d777f000000000000000000000000000000000000000000000000000000000000000061170d565b8180610da27f000000000000000000000000000000000000000000000000000000000000000061170d565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610ecf565b3461081957610e0861091b36610e14565b50602060405160018152f35b6040906003190112610819576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610e6957604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610e6957604052565b61014081019081106001600160401b03821117610e6957604052565b60c081019081106001600160401b03821117610e6957604052565b90601f801991011681019081106001600160401b03821117610e6957604052565b6001600160401b038111610e6957601f01601f191660200190565b929192610f1782610ef0565b91610f256040519384610ecf565b829481845281830111610819578281602093845f960137010152565b9080601f8301121561081957816020610f5c93359101610f0b565b90565b9181601f84011215610819578235916001600160401b038311610819576020808501948460051b01011161081957565b6040600319820112610819576004356001600160401b0381116108195781610fb991600401610f5f565b92909291602435906001600160401b03821161081957610fdb91600401610f5f565b9091565b602435906001600160401b038216820361081957565b35906001600160401b038216820361081957565b9181601f84011215610819578235916001600160401b038311610819576020838186019501011161081957565b35906001600160a01b038216820361081957565b6020815260018060a01b03825116602082015260806060611079602085015183604086015260a0850190610e2a565b60408501516001600160a01b03168483015293015191015290565b602060031982011261081957600435906001600160401b038211610819576101409082900360031901126108195760040190565b5190811515820361081957565b9291926110e182610ef0565b916110ef6040519384610ecf565b829481845281830111610819578281602093845f96015e010152565b51906001600160a01b038216820361081957565b9080601f83011215610819578151610f5c926020016110d5565b602081830312610819578051906001600160401b038211610819570190608082820312610819576040519161116d83610e4e565b6111768161110b565b835260208101516001600160401b0381116108195760609261119991830161111f565b60208401526111aa6040820161110b565b60408401520151606082015290565b6111cc9060208082518301019101611139565b80516020909101516001600160a01b0390911691565b929092818403611277575f91345b8584101561126c5781841015611258578360051b80860135908282116112495784013561013e19853603018112156108195761122d908501611ada565b1561123e57600191039301926111f0565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b61128e61187a565b5f91611299826119eb565b906112a3816119eb565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103610b1f576112da82611af3565b15610b1f576101208201916112ef83516111b9565b60a087019182518451036115345761130688611af3565b15611534578760209360c0936113e56101209751916113d3604051998a988997889763e6c9714d60e01b8952606060048a0152815160648a01528c82015160848a01526001600160401b0360408301511660a48a01526001600160401b0360608301511660c48a01526001600160401b0360808301511660e48a015251610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610e2a565b84810360031901602486015290610e2a565b604483019190915203916001600160a01b03165afa908115610cc4575f91611543575b5015611534576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061144581610e7d565b8681525f60208201526040519261145b84610e7d565b83526020830152803b1561081957604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161151f575b506114c05763614cf93960e01b85526004849052602485fd5b51825192949391927ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0916114fd916001600160a01b031690611b86565b94516001600160a01b03169380a49060015f5160206120605f395f51905f5255565b61152c9196505f90610ecf565b5f945f6114a7565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611575575b8161155e60209383610ecf565b810103126108195761156f906110c8565b5f611408565b3d9150611551565b602081526001600160a01b0361159283611036565b1660208201526020820135601e19833603018112156108195782016020813591016001600160401b0382116108195781360381136108195760c09382606092608060408701528160a0870152868601375f8484018601526001600160a01b036115fd60408301611036565b168483015201356080830152601f01601f1916010190565b6040519061162282610e4e565b5f6060838281528160208201528260408201520152565b60208101517f0000000000000000000000000000000000000000000000000000000000000000036117075761167f61012061168f92015160208082518301019101611139565b9160208082518301019101611139565b604082810151908201516001600160a01b0390811691161491826116f3575b826116da575b826116be57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506116b4565b9150606082015160608201511115916116ae565b50505f90565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611857575b806d04ee2d6d415b85acef8100000000600a92101561183c575b662386f26fc10000811015611828575b6305f5e100811015611817575b612710811015611808575b60648110156117fa575b10156117ef575b600a6021600184019361179485610ef0565b946117a26040519687610ecf565b8086526117b1601f1991610ef0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156117ea57600a90916117bc565b505090565b600190910190611782565b60646002910493019261177b565b61271060049104930192611771565b6305f5e10060089104930192611766565b662386f26fc1000060109104930192611759565b6d04ee2d6d415b85acef810000000060209104930192611749565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461172f565b60025f5160206120605f395f51905f5254146118a35760025f5160206120605f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b604051906118bf82610e98565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361081957565b602081830312610819578051906001600160401b038211610819570161014081830312610819576040519161194483610e98565b815183526020820151602084015261195e604083016118fc565b604084015261196f606083016118fc565b6060840152611980608083016118fc565b608084015260a082015160a084015261199b60c0830161110b565b60c08401526119ac60e0830161110b565b60e08401526119be61010083016110c8565b6101008401526101208201516001600160401b038111610819576119e2920161111f565b61012082015290565b906119f46118b2565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610cc4575f93611a7d575b508251818115918215611a72575b5050611a605750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611a57565b611a929193503d805f833e61041f8183610ecf565b915f611a49565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611acb57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361081957301490565b805115611b56576001600160401b036060820151168015159081611b4b575b50611b3c57608001516001600160401b0316611b2d57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611b12565b635c2c7f8960e01b5f5260045ffd5b91908201809211611b7257565b634e487b7160e01b5f52601160045260245ffd5b611b999060208082518301019101611139565b6040818101805191516370a0823160e01b81526001600160a01b038581166004830181905294929391929160209184916024918391165afa918215610cc4575f92611d12575b50606060018060a01b038451169101938451916040519263a9059cbb60e01b5f52826004526024528260205f60448180865af19160015f5114831615611d00575b50602481602093948160405260018060a01b03895116906370a0823160e01b835260048301525afa918215610cc4575f92611ccc575b5015918215611cb6575b5050611c7d57505050604051611c77602082610ecf565b5f815290565b519051604051634a73404560e11b81526001600160a01b0392831660048201523060248201529290911660448301526064820152608490fd5b611cc4919250845190611b65565b115f80611c60565b9091506020813d602011611cf8575b81611ce860209383610ecf565b810103126108195751905f611c56565b3d9150611cdb565b3d15903b151516909116906024611c20565b9091506020813d602011611d3e575b81611d2e60209383610ecf565b810103126108195751905f611bdf565b3d9150611d21565b611d4e61187a565b611d616020825183010160208301611139565b6040818101805191516370a0823160e01b81523060048201529091602090829060249082906001600160a01b03165afa908115610cc4575f9161202d575b50606060018060a01b03835116930192835190604051916323b872dd60e01b5f52336004523060245260445260205f60648180855af19060015f5114821615612020575b5060408290525f60605283516370a0823160e01b8352306004840152602090839060249082906001600160a01b03165afa918215610cc4575f92611fec575b5015918215611fd6575b50506107a15750506001600160401b0360405193611e4985610eb4565b60018060a01b031692838552166020840152600160408401525f606084015260808301525f60a08301526020604051611e8181610e7d565b7f000000000000000000000000000000000000000000000000000000000000000081528181019384526040518094819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611f22608083015160c060e4860152610124850190610e2a565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1918215610cc4575f92611fa2575b50817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206120605f395f51905f5255565b9091506020813d602011611fce575b81611fbe60209383610ecf565b810103126108195751905f611f68565b3d9150611fb1565b611fe4919250845190611b65565b115f80611e2c565b9091506020813d602011612018575b8161200860209383610ecf565b810103126108195751905f611e22565b3d9150611ffb565b3b15153d1516165f611de3565b90506020813d602011612057575b8161204860209383610ecf565b8101031261081957515f611d9f565b3d915061203b56fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220c845dc9ebaab1cc3b34fd4dd6de988afa8e20617f68511d3288f8975d21b75a264736f6c634300081b0033",
    "sourceMap": "535:5072:96:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;1178:4;759:14:6;;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;790:10;1066:81:82;790:10:9;;;971::82;;991:32;;1129:4;1066:81;;:::i;:::-;1033:114;;1178:4:96;1505:66:67;2365:1;535:5072:96;;;;;;;;759:14:6;535:5072:96;;;;;783:14:6;535:5072:96;;;;;807:14:6;535:5072:96;;;;;790:10:9;535:5072:96;;;;;991:32:82;535:5072:96;;;;;971:10:82;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1033:114:82;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;535:5072:96;-1:-1:-1;535:5072:96;;;;;;;-1:-1:-1;;535:5072:96;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;535:5072:96;;;;;-1:-1:-1;535:5072:96;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;535:5072:96;;;;;;;;;;;;;;;;;;:::o;289:755:86:-;;;535:5072:96;;1189:45:86;;;;535:5072:96;;;1189:45:86;535:5072:96;1189:45:86;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:86;;;;;;;;;;;:::i;:::-;535:5072:96;1179:56:86;;535:5072:96;;-1:-1:-1;;;572:29:86;;;;;535:5072:96;;;1179:56:86;;-1:-1:-1;;;;;535:5072:96;;;-1:-1:-1;535:5072:96;572:29:86;535:5072:96;;572:29:86;;;;;;;;-1:-1:-1;572:29:86;;;289:755;535:5072:96;;615:19:86;611:35;;535:5072:96;;1189:45:86;535:5072:96;;;;;;;;;;;661:52:86;;535:5072:96;572:29:86;661:52;;535:5072:96;;;;;;;;;;;;;-1:-1:-1;535:5072:96;;;;;;;;;;;;572:29:86;535:5072:96;;;1178:4;535:5072;;;;;;;;;;;;661:52:86;;;-1:-1:-1;661:52:86;;;-1:-1:-1;;661:52:86;;;289:755;-1:-1:-1;657:381:86;;535:5072:96;-1:-1:-1;572:29:86;535:5072:96;;;;;;;;;;899:29:86;;;572;899;;535:5072:96;899:29:86;;;;;;;;-1:-1:-1;899:29:86;;;657:381;535:5072:96;;946:19:86;942:35;;793:29;;;;-1:-1:-1;998:29:86;572;535:5072:96;572:29:86;-1:-1:-1;998:29:86;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:86;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;535:5072:96;;;-1:-1:-1;535:5072:96;;;;;657:381:86;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:86;572;535:5072:96;572:29:86;-1:-1:-1;793:29:86;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;535:5072:96;;;;;661:52:86;;;;;;;-1:-1:-1;661:52:86;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:86;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610df757806354fd4d5014610d095780635bf2f20d14610ccf5780636b122fe014610b2e5780637d2c2931146109945780638371ef591461093557806388e5b2d9146108e7578063891d9ea81461090657806391db0b7e146108e7578063a4f0d5171461087a578063b3b902d4146104c5578063c1e4a7101461043b578063c6ec50701461032f578063c93844be14610258578063ce46e0461461023c578063e49617e114610221578063e60c3505146102215763e6c9714d146100f8575061000e565b3461021a57606036600319011261021a57600435906001600160401b03821161021a57610140600319833603011261021a576040519161013783610e98565b806004013583526024810135602084015261015460448201610ff5565b604084015261016560648201610ff5565b606084015261017660848201610ff5565b608084015260a481013560a084015261019160c48201611036565b60c08401526101a260e48201611036565b60e0840152610104810135801515810361021d576101008401526101248101356001600160401b03811161021d576101df91369101600401610f41565b610120830152602435906001600160401b03821161021a5760206102108461020a3660048701610f41565b90611639565b6040519015158152f35b80fd5b8280fd5b602061021061022f36611094565b610237611a99565b611ada565b503461021a578060031936011261021a57602090604051908152f35b503461021a57602036600319011261021a576004356001600160401b03811161032b57610289903690600401611009565b610294929192611615565b5082019160208184031261032b578035906001600160401b03821161021d57019160808382031261032b57604051916102cc83610e4e565b6102d584611036565b83526020840135906001600160401b03821161021a5750926102fe606092610327958301610f41565b602084015261030f60408201611036565b6040840152013560608201526040519182918261104a565b0390f35b5080fd5b503461021a57602036600319011261021a57610349611615565b506103526118b2565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561042e57819261040a575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036103fb576103276103ef61012084015160208082518301019101611139565b6040519182918261104a565b635527981560e11b8152600490fd5b6104279192503d8084833e61041f8183610ecf565b810190611910565b905f6103a8565b50604051903d90823e3d90fd5b503461021a57606036600319011261021a576004356001600160401b03811161032b576080600319823603011261032b57610474610fdf565b604435929091906001600160a01b038416840361021a5760206104bd85856104aa6104b88760405192839160040188830161157d565b03601f198101835282610ecf565b611d46565b604051908152f35b50606036600319011261021a576004356001600160401b03811161032b576104f4610506913690600401611009565b91906104fe610fdf565b923691610f0b565b61050e61187a565b6105216020825183010160208301611139565b6040818101805191516370a0823160e01b81523060048201529091602090829060249082906001600160a01b03165afa90811561086f57869161083d575b50815160609390930180516040516323b872dd60e01b8952336004523060245260449190915290936001600160a01b031660208860648180855af1906001895114821615610830575b50816040528760605260208260248160018060a01b038851166370a0823160e01b82523060048301525afa9182156108255788926107ed575b50159182156107d7575b50506107a15750506001600160401b036040519261060884610eb4565b33845216602083015260016040830152604435606083015260808201528160a0820152602060405161063981610e7d565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06106da608083015160c060e4860152610124850190610e2a565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115610796578291610763575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f5160206120605f395f51905f5255604051908152f35b90506020813d60201161078e575b8161077e60209383610ecf565b8101031261032b57516020610720565b3d9150610771565b6040513d84823e3d90fd5b519051604051634a73404560e11b81526001600160a01b0390921660048301523360248301523060448301526064820152608490fd5b6107e5919250845190611b65565b115f806105eb565b9091506020813d60201161081d575b8161080960209383610ecf565b810103126108195751905f6105e1565b5f80fd5b3d91506107fc565b6040513d8a823e3d90fd5b3b15153d1516165f6105a8565b90506020813d602011610867575b8161085860209383610ecf565b8101031261081957515f61055f565b3d915061084b565b6040513d88823e3d90fd5b503461021a57604036600319011261021a57600435906001600160401b03821161021a576080600319833603011261021a5760206104bd6108d2846108e06108c0610fdf565b9160405193849160040187830161157d565b03601f198101845283610ecf565b3391611d46565b60206102106108f536610f8f565b92610901929192611a99565b6111e2565b503461021a5761032761092161091b36610e14565b90611286565b604051918291602083526020830190610e2a565b503461021a57602036600319011261021a57600435906001600160401b03821161021a5761096e6109693660048501610f41565b6111b9565b604080516001600160a01b03909316835260208301819052829161032791830190610e2a565b503461081957602036600319011261081957600435906109b261187a565b6109bb826119eb565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610b1f57606084016001600160401b0381511615610b1057516001600160401b03164210610b10576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610a4481610e7d565b8381525f602082015260405192610a5a84610e7d565b83526020830152803b1561081957604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610afb575b50610abe5763614cf93960e01b825260045260249150fd5b61012083015160c0840151610ade916001600160a01b0390911690611b86565b5060015f5160206120605f395f51905f5255602060405160018152f35b610b089193505f90610ecf565b5f915f610aa6565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b34610819575f36600319011261081957606080604051610b4d81610e4e565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610cc4575f90610c14575b606090610327604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610e2a565b503d805f833e610c248183610ecf565b810190602081830312610819578051906001600160401b03821161081957016080818303126108195760405190610c5a82610e4e565b8051825260208101516001600160a01b0381168103610819576020830152610c84604082016110c8565b60408301526060810151906001600160401b038211610819570182601f8201121561081957606092816020610cbb935191016110d5565b82820152610bce565b6040513d5f823e3d90fd5b34610819575f3660031901126108195760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610819575f3660031901126108195761032760206109216001610d4c7f000000000000000000000000000000000000000000000000000000000000000061170d565b8184610d777f000000000000000000000000000000000000000000000000000000000000000061170d565b8180610da27f000000000000000000000000000000000000000000000000000000000000000061170d565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610ecf565b3461081957610e0861091b36610e14565b50602060405160018152f35b6040906003190112610819576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610e6957604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610e6957604052565b61014081019081106001600160401b03821117610e6957604052565b60c081019081106001600160401b03821117610e6957604052565b90601f801991011681019081106001600160401b03821117610e6957604052565b6001600160401b038111610e6957601f01601f191660200190565b929192610f1782610ef0565b91610f256040519384610ecf565b829481845281830111610819578281602093845f960137010152565b9080601f8301121561081957816020610f5c93359101610f0b565b90565b9181601f84011215610819578235916001600160401b038311610819576020808501948460051b01011161081957565b6040600319820112610819576004356001600160401b0381116108195781610fb991600401610f5f565b92909291602435906001600160401b03821161081957610fdb91600401610f5f565b9091565b602435906001600160401b038216820361081957565b35906001600160401b038216820361081957565b9181601f84011215610819578235916001600160401b038311610819576020838186019501011161081957565b35906001600160a01b038216820361081957565b6020815260018060a01b03825116602082015260806060611079602085015183604086015260a0850190610e2a565b60408501516001600160a01b03168483015293015191015290565b602060031982011261081957600435906001600160401b038211610819576101409082900360031901126108195760040190565b5190811515820361081957565b9291926110e182610ef0565b916110ef6040519384610ecf565b829481845281830111610819578281602093845f96015e010152565b51906001600160a01b038216820361081957565b9080601f83011215610819578151610f5c926020016110d5565b602081830312610819578051906001600160401b038211610819570190608082820312610819576040519161116d83610e4e565b6111768161110b565b835260208101516001600160401b0381116108195760609261119991830161111f565b60208401526111aa6040820161110b565b60408401520151606082015290565b6111cc9060208082518301019101611139565b80516020909101516001600160a01b0390911691565b929092818403611277575f91345b8584101561126c5781841015611258578360051b80860135908282116112495784013561013e19853603018112156108195761122d908501611ada565b1561123e57600191039301926111f0565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b61128e61187a565b5f91611299826119eb565b906112a3816119eb565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103610b1f576112da82611af3565b15610b1f576101208201916112ef83516111b9565b60a087019182518451036115345761130688611af3565b15611534578760209360c0936113e56101209751916113d3604051998a988997889763e6c9714d60e01b8952606060048a0152815160648a01528c82015160848a01526001600160401b0360408301511660a48a01526001600160401b0360608301511660c48a01526001600160401b0360808301511660e48a015251610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610e2a565b84810360031901602486015290610e2a565b604483019190915203916001600160a01b03165afa908115610cc4575f91611543575b5015611534576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061144581610e7d565b8681525f60208201526040519261145b84610e7d565b83526020830152803b1561081957604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161151f575b506114c05763614cf93960e01b85526004849052602485fd5b51825192949391927ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0916114fd916001600160a01b031690611b86565b94516001600160a01b03169380a49060015f5160206120605f395f51905f5255565b61152c9196505f90610ecf565b5f945f6114a7565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611575575b8161155e60209383610ecf565b810103126108195761156f906110c8565b5f611408565b3d9150611551565b602081526001600160a01b0361159283611036565b1660208201526020820135601e19833603018112156108195782016020813591016001600160401b0382116108195781360381136108195760c09382606092608060408701528160a0870152868601375f8484018601526001600160a01b036115fd60408301611036565b168483015201356080830152601f01601f1916010190565b6040519061162282610e4e565b5f6060838281528160208201528260408201520152565b60208101517f0000000000000000000000000000000000000000000000000000000000000000036117075761167f61012061168f92015160208082518301019101611139565b9160208082518301019101611139565b604082810151908201516001600160a01b0390811691161491826116f3575b826116da575b826116be57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506116b4565b9150606082015160608201511115916116ae565b50505f90565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611857575b806d04ee2d6d415b85acef8100000000600a92101561183c575b662386f26fc10000811015611828575b6305f5e100811015611817575b612710811015611808575b60648110156117fa575b10156117ef575b600a6021600184019361179485610ef0565b946117a26040519687610ecf565b8086526117b1601f1991610ef0565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a83530480156117ea57600a90916117bc565b505090565b600190910190611782565b60646002910493019261177b565b61271060049104930192611771565b6305f5e10060089104930192611766565b662386f26fc1000060109104930192611759565b6d04ee2d6d415b85acef810000000060209104930192611749565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461172f565b60025f5160206120605f395f51905f5254146118a35760025f5160206120605f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b604051906118bf82610e98565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361081957565b602081830312610819578051906001600160401b038211610819570161014081830312610819576040519161194483610e98565b815183526020820151602084015261195e604083016118fc565b604084015261196f606083016118fc565b6060840152611980608083016118fc565b608084015260a082015160a084015261199b60c0830161110b565b60c08401526119ac60e0830161110b565b60e08401526119be61010083016110c8565b6101008401526101208201516001600160401b038111610819576119e2920161111f565b61012082015290565b906119f46118b2565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610cc4575f93611a7d575b508251818115918215611a72575b5050611a605750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611a57565b611a929193503d805f833e61041f8183610ecf565b915f611a49565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611acb57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361081957301490565b805115611b56576001600160401b036060820151168015159081611b4b575b50611b3c57608001516001600160401b0316611b2d57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611b12565b635c2c7f8960e01b5f5260045ffd5b91908201809211611b7257565b634e487b7160e01b5f52601160045260245ffd5b611b999060208082518301019101611139565b6040818101805191516370a0823160e01b81526001600160a01b038581166004830181905294929391929160209184916024918391165afa918215610cc4575f92611d12575b50606060018060a01b038451169101938451916040519263a9059cbb60e01b5f52826004526024528260205f60448180865af19160015f5114831615611d00575b50602481602093948160405260018060a01b03895116906370a0823160e01b835260048301525afa918215610cc4575f92611ccc575b5015918215611cb6575b5050611c7d57505050604051611c77602082610ecf565b5f815290565b519051604051634a73404560e11b81526001600160a01b0392831660048201523060248201529290911660448301526064820152608490fd5b611cc4919250845190611b65565b115f80611c60565b9091506020813d602011611cf8575b81611ce860209383610ecf565b810103126108195751905f611c56565b3d9150611cdb565b3d15903b151516909116906024611c20565b9091506020813d602011611d3e575b81611d2e60209383610ecf565b810103126108195751905f611bdf565b3d9150611d21565b611d4e61187a565b611d616020825183010160208301611139565b6040818101805191516370a0823160e01b81523060048201529091602090829060249082906001600160a01b03165afa908115610cc4575f9161202d575b50606060018060a01b03835116930192835190604051916323b872dd60e01b5f52336004523060245260445260205f60648180855af19060015f5114821615612020575b5060408290525f60605283516370a0823160e01b8352306004840152602090839060249082906001600160a01b03165afa918215610cc4575f92611fec575b5015918215611fd6575b50506107a15750506001600160401b0360405193611e4985610eb4565b60018060a01b031692838552166020840152600160408401525f606084015260808301525f60a08301526020604051611e8181610e7d565b7f000000000000000000000000000000000000000000000000000000000000000081528181019384526040518094819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611f22608083015160c060e4860152610124850190610e2a565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1918215610cc4575f92611fa2575b50817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a39060015f5160206120605f395f51905f5255565b9091506020813d602011611fce575b81611fbe60209383610ecf565b810103126108195751905f611f68565b3d9150611fb1565b611fe4919250845190611b65565b115f80611e2c565b9091506020813d602011612018575b8161200860209383610ecf565b810103126108195751905f611e22565b3d9150611ffb565b3b15153d1516165f611de3565b90506020813d602011612057575b8161204860209383610ecf565b8101031261081957515f611d9f565b3d915061203b56fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220c845dc9ebaab1cc3b34fd4dd6de988afa8e20617f68511d3288f8975d21b75a264736f6c634300081b0033",
    "sourceMap": "535:5072:96:-:0;;;;;;;;;-1:-1:-1;535:5072:96;;;;;;;;1183:12:9;;;1054:5;1183:12;535:5072:96;1054:5:9;1183:12;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;3045:39:9;535:5072:96;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;535:5072:96:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;5564:34;;535:5072;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;535:5072:96;;-1:-1:-1;;;2619:23:82;;535:5072:96;;;2619:23:82;;;535:5072:96;;;;2619:23:82;535:5072:96;2619:3:82;-1:-1:-1;;;;;535:5072:96;2619:23:82;;;;;;;;;;;535:5072:96;2656:19:82;535:5072:96;2656:19:82;;535:5072:96;2679:18:82;2656:41;2652:87;;535:5072:96;5379:46;5390:16;;;;535:5072;;;;5379:46;;;;;;:::i;:::-;535:5072;;;;;;;:::i;2652:87:82:-;-1:-1:-1;;;2718:21:82;;535:5072:96;;2718:21:82;2619:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;535:5072:96;;;;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;1139:12:84;535:5072:96;;4883:16;;535:5072;;;;;;;;4883:16;;;;:::i;:::-;;1055:104:6;;4883:16:96;;;;;;:::i;:::-;1139:12:84;:::i;:::-;535:5072:96;;;;;;;-1:-1:-1;535:5072:96;;-1:-1:-1;;535:5072:96;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;:::i;:::-;2989:103:67;;:::i;:::-;1680:34:96;535:5072;;;1680:34;;;535:5072;1680:34;;;:::i;:::-;535:5072;1797:13;;;535:5072;;;;-1:-1:-1;;;1790:46:96;;1830:4;535:5072;1790:46;;535:5072;1797:13;;535:5072;;;;1790:46;;535:5072;;-1:-1:-1;;;;;535:5072:96;1790:46;;;;;;;;;;;535:5072;-1:-1:-1;535:5072:96;;;1962:14;;;;535:5072;;;10404:1148:52;-1:-1:-1;;;10404:1148:52;;903:10:84;535:5072:96;10404:1148:52;1830:4:96;1790:46;10404:1148:52;535:5072:96;10404:1148:52;;;;1962:14:96;;-1:-1:-1;;;;;535:5072:96;;10404:1148:52;;;;535:5072:96;10404:1148:52;;;;;;;;;;;;535:5072:96;10404:1148:52;;535:5072:96;10404:1148:52;;535:5072:96;10404:1148:52;535:5072:96;;1790:46;535:5072;;;;;;;;;;;;2060:46;;1830:4;535:5072;2060:46;;535:5072;2060:46;;;;;;;;;;;535:5072;2169:8;;535:5072;;;2169:57;;535:5072;2165:244;;;;535:5072;;-1:-1:-1;;;;;535:5072:96;;;;;;:::i;:::-;903:10:84;535:5072:96;;;;2141:299:82;;535:5072:96;10404:1148:52;535:5072:96;2141:299:82;;535:5072:96;;;;2141:299:82;;535:5072:96;2141:299:82;;;535:5072:96;2141:299:82;;;;535:5072:96;;;;;;;:::i;:::-;2095:18:82;535:5072:96;;2046:413:82;;;535:5072:96;;;;;;;;;;;;2018:455:82;;;535:5072:96;2018:455:82;;535:5072:96;;1790:46;535:5072;;;;;;;;;;;;;;;;;10404:1148:52;535:5072:96;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;2141:299:82;535:5072:96;2141:299:82;535:5072:96;;;;;;;;;;;;;:::i;:::-;;;;;;;;2018:455:82;535:5072:96;;2018:3:82;-1:-1:-1;;;;;535:5072:96;2018:455:82;;;;;;;;;;;535:5072:96;903:10:84;535:5072:96;903:10:84;;5343:26:83;903:10:84;5343:26:83;;;10404:1148:52;-1:-1:-1;;;;;;;;;;;2407:1:67;535:5072:96;;;;;;2018:455:82;;;535:5072:96;2018:455:82;;535:5072:96;2018:455:82;;;;;;535:5072:96;2018:455:82;;;:::i;:::-;;;535:5072:96;;;;;;2018:455:82;;;;;-1:-1:-1;2018:455:82;;;535:5072:96;;;;;;;;;2165:244;535:5072;;;;;-1:-1:-1;;;2249:149:96;;-1:-1:-1;;;;;535:5072:96;;;;2249:149;;535:5072;903:10:84;535:5072:96;;;;1830:4;535:5072;;;;;;;;;;2249:149;2169:57;2196:30;535:5072;;;;;2196:30;;:::i;:::-;-1:-1:-1;2169:57:96;;;;2060:46;;;;535:5072;2060:46;;535:5072;2060:46;;;;;;535:5072;2060:46;;;:::i;:::-;;;535:5072;;;;;2060:46;;;;535:5072;-1:-1:-1;535:5072:96;;2060:46;;;-1:-1:-1;2060:46:96;;;535:5072;;;;;;;;;10404:1148:52;;;;;;;;;;;1790:46:96;;;535:5072;1790:46;;535:5072;1790:46;;;;;;535:5072;1790:46;;;:::i;:::-;;;535:5072;;;;;1790:46;;;;;;-1:-1:-1;1790:46:96;;;535:5072;;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;1139:12:84;4531:16:96;535:5072;4531:16;535:5072;;:::i;:::-;;;;;;;;;4531:16;;;;:::i;:::-;;1055:104:6;;4531:16:96;;;;;;:::i;:::-;4598:10;1139:12:84;;:::i;535:5072:96:-;;1442:1461:9;535:5072:96;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;535:5072:96:-;;;;;;2141:12:83;535:5072:96;;;:::i;:::-;2141:12:83;;:::i;:::-;535:5072:96;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;535:5072:96;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;535:5072:96;;;;;;2989:103:67;;;:::i;:::-;3715:28:83;;;:::i;:::-;3810:18;535:5072:96;3810:18:83;;535:5072:96;3832:18:83;3810:40;;;3806:104;;4019:26;;;-1:-1:-1;;;;;535:5072:96;;;4019:31:83;4015:62;;535:5072:96;-1:-1:-1;;;;;535:5072:96;4092:15:83;:44;4088:100;;535:5072:96;;4252:3:83;-1:-1:-1;;;;;535:5072:96;;;;;:::i;:::-;;;;;;4329:43:83;;535:5072:96;;;;;;;:::i;:::-;;;;4276:98:83;;535:5072:96;4252:132:83;;;;;535:5072:96;;-1:-1:-1;;;4252:132:83;;535:5072:96;;;4252:132:83;;535:5072:96;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;-1:-1:-1;;4252:132:83;;;;;;535:5072:96;-1:-1:-1;4248:207:83;;-1:-1:-1;;;4423:21:83;;535:5072:96;;;;-1:-1:-1;4423:21:83;4248:207;4534:16;;;;4552:21;;;535:5072:96;4534:16:83;;-1:-1:-1;;;;;535:5072:96;;;;4534:16:83;:::i;:::-;;535:5072:96;-1:-1:-1;;;;;;;;;;;2407:1:67;535:5072:96;;;;;;;4252:132:83;;;;;535:5072:96;4252:132:83;;:::i;:::-;535:5072:96;4252:132:83;;;;4088:100;4059:18;;;535:5072:96;4159:18:83;535:5072:96;;4159:18:83;3806:104;3873:26;;;535:5072:96;3873:26:83;535:5072:96;;3873:26:83;535:5072:96;;;;;;-1:-1:-1;;535:5072:96;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1724:44:82;;1749:18;535:5072:96;1724:44:82;;535:5072:96;;;1724:44:82;535:5072:96;;;;;;1724:14:82;535:5072:96;1724:44:82;;;;;;535:5072:96;1724:44:82;;;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1724:44:82:-;;;;535:5072:96;1724:44:82;;;;;;:::i;:::-;;;535:5072:96;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1724:44:82;;;535:5072:96;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;;724:43:82;535:5072:96;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;1055:104:6;;535:5072:96;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;535:5072:96;;;;;;;;;;;;1055:104:6;;;535:5072:96;;;;-1:-1:-1;;;535:5072:96;;;;;;;;;;;;;;;;;-1:-1:-1;;;535:5072:96;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;535:5072:96:-;;;;2141:12:83;535:5072:96;;;:::i;2141:12:83:-;;535:5072:96;;;5184:4;535:5072;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;535:5072:96;;;;;;;;-1:-1:-1;;535:5072:96;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;:::o;:::-;;;;-1:-1:-1;535:5072:96;;;;;-1:-1:-1;535:5072:96;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;:::o;:::-;;;1055:104:6;;535:5072:96;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;:::o;:::-;-1:-1:-1;;;;;535:5072:96;;;;;;-1:-1:-1;;535:5072:96;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;535:5072:96;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;535:5072:96;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;-1:-1:-1;;;;;535:5072:96;;;;;;:::o;:::-;;;-1:-1:-1;;;;;535:5072:96;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;535:5072:96;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;535:5072:96;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;535:5072:96;;;;;;:::o;:::-;;;-1:-1:-1;;;;;535:5072:96;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::o;1258:267::-;1434:34;1258:267;1434:34;535:5072;;;1434:34;;;;;;:::i;:::-;535:5072;;1434:34;1503:14;;;;-1:-1:-1;;;;;535:5072:96;;;;1258:267::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;535:5072:96;;;;;;;;;;;;;4064:22:9;;;;4060:87;;535:5072:96;;;;;;;;;;;;;;4274:33:9;535:5072:96;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;535:5072:96;;3896:19:9;535:5072:96;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;535:5072:96;;;;3881:1:9;535:5072:96;;;;;3881:1:9;535:5072:96;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2989:103:67;;;:::i;:::-;-1:-1:-1;2197:32:83;;;;:::i;:::-;2272:37;;;;:::i;:::-;2371:13;;;;535:5072:96;2388:18:83;2371:35;;;2367:99;;2481:24;;;:::i;:::-;2480:25;2476:64;;2671:11;;;;2647:36;2671:11;;2647:36;:::i;:::-;2764:18;;;535:5072:96;;;;;2764:32:83;2760:65;;2841:29;;;:::i;:::-;2840:30;2836:63;;535:5072:96;2371:13:83;535:5072:96;;;;2671:11:83;535:5072:96;;;;;;;;;;;;;;;;2970:66:83;;535:5072:96;2970:66:83;;;535:5072:96;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;535:5072:96;;;;;;;:::i;:::-;;;;;;;;2970:66:83;;-1:-1:-1;;;;;535:5072:96;2970:66:83;;;;;;;-1:-1:-1;2970:66:83;;;2989:103:67;2969:67:83;;2965:125;;535:5072:96;;3134:3:83;-1:-1:-1;;;;;535:5072:96;;;;;:::i;:::-;;;;-1:-1:-1;2371:13:83;3211:47;;535:5072:96;;;;;;;:::i;:::-;;;2371:13:83;3158:102;;535:5072:96;3134:136:83;;;;;535:5072:96;;-1:-1:-1;;;3134:136:83;;535:5072:96;;2970:66:83;3134:136;;535:5072:96;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;;;-1:-1:-1;;3134:136:83;;;;;;2989:103:67;-1:-1:-1;3130:215:83;;-1:-1:-1;;;3309:25:83;;2970:66;535:5072:96;;;;4423:21:83;3309:25;3130:215;3430:11;535:5072:96;;3130:215:83;;;;;3495:61;;2457:947:96;;-1:-1:-1;;;;;535:5072:96;;2457:947;:::i;:::-;535:5072;;-1:-1:-1;;;;;535:5072:96;;3495:61:83;;2407:1:67;2365;-1:-1:-1;;;;;;;;;;;2407:1:67;2989:103::o;3134:136:83:-;;;;;-1:-1:-1;3134:136:83;;:::i;:::-;-1:-1:-1;3134:136:83;;;;2965:125;2805:20;;;-1:-1:-1;3059:20:83;2970:66;-1:-1:-1;3059:20:83;2970:66;;;2371:13;2970:66;;2371:13;2970:66;;;;;;2371:13;2970:66;;;:::i;:::-;;;535:5072:96;;;;;;;:::i;:::-;2970:66:83;;;;;;-1:-1:-1;2970:66:83;;535:5072:96;;;;-1:-1:-1;;;;;535:5072:96;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;;535:5072:96;;;;:::o;:::-;;;;;;;:::i;:::-;-1:-1:-1;535:5072:96;;;;;;;;;;;;;;;;;:::o;3616:686::-;3799:17;;;535:5072;3820:18;3799:39;3795:57;;3895:79;3919:15;4019:36;3919:15;;;3799:17;535:5072;;;3895:79;;;;;;:::i;:::-;535:5072;3799:17;535:5072;;;4019:36;;;;;;:::i;:::-;4085:13;;;;535:5072;4102:16;;;535:5072;-1:-1:-1;;;;;535:5072:96;;;;;4085:33;;;:84;;3616:686;4085:137;;;3616:686;4085:210;;;4066:229;;3616:686;:::o;4085:210::-;3799:17;4248:14;;;;;;535:5072;;;;;4238:25;4277:17;;;3799;535:5072;;;;4267:28;4238:57;3616:686;:::o;4085:137::-;535:5072;;;;-1:-1:-1;;;;;535:5072:96;;;;;4185:37;;-1:-1:-1;4085:137:96;;:84;4134:14;;;;;535:5072;4134:14;4152:17;;535:5072;-1:-1:-1;4134:35:96;4085:84;;;3795:57;3840:12;;535:5072;3840:12;:::o;1343:634:71:-;1465:17;-1:-1:-1;29298:17:78;-1:-1:-1;;;29298:17:78;;;29294:103;;1343:634:71;29414:17:78;29423:8;29994:7;29414:17;;;29410:103;;1343:634:71;29539:8:78;29530:17;;;29526:103;;1343:634:71;29655:7:78;29646:16;;;29642:100;;1343:634:71;29768:7:78;29759:16;;;29755:100;;1343:634:71;29881:7:78;29872:16;;;29868:100;;1343:634:71;29985:16:78;;29981:66;;1343:634:71;29994:7:78;1580:94:71;1485:1;535:5072:96;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;535:5072:96;;:::i;:::-;;;;;;;1580:94:71;;;1687:247;-1:-1:-1;;535:5072:96;;-1:-1:-1;;;1741:111:71;;;;535:5072:96;1741:111:71;535:5072:96;1902:10:71;;1898:21;;29994:7:78;1687:247:71;;;;1898:21;1914:5;;1343:634;:::o;29981:66:78:-;30031:1;535:5072:96;;;;29981:66:78;;29868:100;29881:7;29952:1;535:5072:96;;;;29868:100:78;;;29755;29768:7;29839:1;535:5072:96;;;;29755:100:78;;;29642;29655:7;29726:1;535:5072:96;;;;29642:100:78;;;29526:103;29539:8;29612:2;535:5072:96;;;;29526:103:78;;;29410;29423:8;29496:2;535:5072:96;;;;29410:103:78;;;29294;-1:-1:-1;29380:2:78;;-1:-1:-1;;;;535:5072:96;;29294:103:78;;3749:292:67;2407:1;-1:-1:-1;;;;;;;;;;;535:5072:96;4560:63:67;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:67;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:67;;-1:-1:-1;3696:30:67;535:5072:96;;;;;;;:::i;:::-;;;;-1:-1:-1;535:5072:96;;-1:-1:-1;535:5072:96;;;;-1:-1:-1;535:5072:96;;;;-1:-1:-1;535:5072:96;;;;-1:-1:-1;535:5072:96;;;;-1:-1:-1;535:5072:96;;;;-1:-1:-1;535:5072:96;;;;-1:-1:-1;535:5072:96;;;;-1:-1:-1;535:5072:96;;;;;;:::o;:::-;;;-1:-1:-1;;;;;535:5072:96;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;:::i;:::-;;;;;;:::o;4609:257:83:-;;535:5072:96;;:::i;:::-;-1:-1:-1;535:5072:96;;-1:-1:-1;;;4734:23:83;;;;;535:5072:96;;;;-1:-1:-1;535:5072:96;4734:23:83;535:5072:96;4734:3:83;-1:-1:-1;;;;;535:5072:96;4734:23:83;;;;;;;-1:-1:-1;4734:23:83;;;4609:257;4720:37;;535:5072:96;4771:29:83;;;:55;;;;;4609:257;4767:92;;;;4609:257;:::o;4767:92::-;4835:24;;;-1:-1:-1;4835:24:83;4734:23;535:5072:96;4734:23:83;-1:-1:-1;4835:24:83;4771:55;4804:22;;;-1:-1:-1;4771:55:83;;;;4734:23;;;;;;;-1:-1:-1;4734:23:83;;;;;;:::i;:::-;;;;;6040:128:9;6109:4;-1:-1:-1;;;;;535:5072:96;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1401:235:82;1592:20;;535:5072:96;;;;;;;;;;;;;1624:4:82;1592:37;1401:235;:::o;596:321:81:-;535:5072:96;;695:28:81;691:64;;-1:-1:-1;;;;;362:25:81;;;535:5072:96;;362:30:81;;;:78;;;;596:321;765:55;;;553:25;;535:5072:96;-1:-1:-1;;;;;535:5072:96;830:58:81;;906:4;596:321;:::o;830:58::-;868:20;;;-1:-1:-1;868:20:81;;-1:-1:-1;868:20:81;765:55;803:17;;;-1:-1:-1;803:17:81;;-1:-1:-1;803:17:81;362:78;425:15;;;-1:-1:-1;396:44:81;362:78;;;691:64;732:23;;;-1:-1:-1;732:23:81;;-1:-1:-1;732:23:81;535:5072:96;;;;;;;;;;:::o;:::-;;;;;;;;;;;;2457:947;2661:74;2457:947;2661:74;535:5072;;;2661:74;;;;;;:::i;:::-;2818:13;;;;535:5072;;;;-1:-1:-1;;;2811:35:96;;-1:-1:-1;;;;;535:5072:96;;;2811:35;;;535:5072;;;;2818:13;;535:5072;;2818:13;2661:74;;535:5072;;2811:35;;535:5072;;;2811:35;;;;;;;-1:-1:-1;2811:35:96;;;2457:947;535:5072;2914:14;535:5072;;;;;;;;2914:14;;535:5072;;;2138:38:52;2818:13:96;8544:1067:52;8509:24;;;;-1:-1:-1;8544:1067:52;;2811:35:96;8544:1067:52;2811:35:96;8544:1067:52;;2661:74:96;-1:-1:-1;8544:1067:52;;;;;;;;-1:-1:-1;8544:1067:52;;;;;;;2457:947:96;8544:1067:52;2811:35:96;8544:1067:52;2661:74:96;8544:1067:52;;;2818:13:96;8544:1067:52;535:5072:96;;;;;;;;;;;;3003:35;;2811;3003;;535:5072;3003:35;;;;;;;-1:-1:-1;3003:35:96;;;2457:947;3101:8;;535:5072;;;3101:57;;2457:947;3097:242;;;;535:5072;;;2818:13;535:5072;;2661:74;535:5072;;:::i;:::-;-1:-1:-1;535:5072:96;;2457:947;:::o;3097:242::-;535:5072;;;2818:13;535:5072;-1:-1:-1;;;3181:147:96;;-1:-1:-1;;;;;535:5072:96;;;2811:35;3181:147;;535:5072;3257:4;535:5072;;;;;;;;;;;;;;;;;;2249:149;3101:57;3128:30;535:5072;;;;;3128:30;;:::i;:::-;-1:-1:-1;3101:57:96;;;;3003:35;;;;2661:74;3003:35;;2661:74;3003:35;;;;;;535:5072;3003:35;;;:::i;:::-;;;535:5072;;;;;3003:35;;;;;;;-1:-1:-1;3003:35:96;;8544:1067:52;;;;;;;;;;;;2811:35:96;8544:1067:52;;2811:35:96;;;;2661:74;2811:35;;2661:74;2811:35;;;;;;535:5072;2811:35;;;:::i;:::-;;;535:5072;;;;;2811:35;;;;;;;-1:-1:-1;2811:35:96;;2989:103:67;;;:::i;:::-;1680:34:96;;535:5072;;1680:34;;;;;;;:::i;:::-;1797:13;;;;535:5072;;;;-1:-1:-1;;;1790:46:96;;1830:4;1790:46;;;535:5072;1797:13;;1680:34;;535:5072;;1790:46;;535:5072;;-1:-1:-1;;;;;535:5072:96;1790:46;;;;;;;535:5072;1790:46;;;2989:103:67;535:5072:96;1962:14;535:5072;;;;;;;;1962:14;;535:5072;;;2449:48:52;1797:13:96;10404:1148:52;10365:28;;;;535:5072:96;10404:1148:52;1183:10:84;1790:46:96;10404:1148:52;1830:4:96;1790:46;10404:1148:52;;;1680:34:96;535:5072;10404:1148:52;;;;;;;;535:5072:96;10404:1148:52;;;;;;;2989:103:67;-1:-1:-1;1797:13:96;10404:1148:52;;;535:5072:96;1962:14;10404:1148:52;535:5072:96;;-1:-1:-1;;;2060:46:96;;1830:4;1790:46;2060;;535:5072;1680:34;;10404:1148:52;;1790:46:96;;10404:1148:52;;-1:-1:-1;;;;;535:5072:96;2060:46;;;;;;;535:5072;2060:46;;;2989:103:67;2169:8:96;;535:5072;;;2169:57;;2989:103:67;2165:244:96;;;;535:5072;;-1:-1:-1;;;;;1797:13:96;535:5072;;;;;:::i;:::-;;;;;;;;;;;;1680:34;2141:299:82;;535:5072:96;10404:1148:52;1797:13:96;2141:299:82;;535:5072:96;;1962:14;2141:299:82;;535:5072:96;2141:299:82;;;535:5072:96;;2141:299:82;;;535:5072:96;1680:34;1797:13;535:5072;;;;:::i;:::-;2095:18:82;535:5072:96;;2046:413:82;;;535:5072:96;;;1797:13;535:5072;;;;;;;;2018:455:82;;;1790:46:96;2018:455:82;;535:5072:96;;1790:46;535:5072;;;;1797:13;10404:1148:52;535:5072:96;;;;;;;;;;;10404:1148:52;535:5072:96;;;-1:-1:-1;;;;;535:5072:96;;;;;;;;;1797:13;535:5072;;;;;;;;;1962:14;535:5072;;;;;;;2141:299:82;535:5072:96;2141:299:82;535:5072:96;;;;;;;;;;;;;:::i;:::-;;;;;;;;2018:455:82;535:5072:96;;2018:3:82;-1:-1:-1;;;;;535:5072:96;2018:455:82;;;;;;;535:5072:96;2018:455:82;;;2989:103:67;5343:26:83;;;535:5072:96;5343:26:83;;2407:1:67;10404:1148:52;-1:-1:-1;;;;;;;;;;;2407:1:67;2989:103::o;2018:455:82:-;;;;1680:34:96;2018:455:82;;1680:34:96;2018:455:82;;;;;;1680:34:96;2018:455:82;;;:::i;:::-;;;535:5072:96;;;;;2018:455:82;;;;;;;-1:-1:-1;2018:455:82;;2169:57:96;2196:30;535:5072;;;;;2196:30;;:::i;:::-;-1:-1:-1;2169:57:96;;;;2060:46;;;;1680:34;2060:46;;1680:34;2060:46;;;;;;535:5072;2060:46;;;:::i;:::-;;;535:5072;;;;;2060:46;;;;;;;-1:-1:-1;2060:46:96;;10404:1148:52;;;;;;;;;;;1790:46:96;;;1680:34;1790:46;;1680:34;1790:46;;;;;;535:5072;1790:46;;;:::i;:::-;;;535:5072;;;;;1790:46;;;;;;-1:-1:-1;1790:46:96;",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 3368,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 3411,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 3454,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 6811,
          "length": 32
        }
      ],
      "56213": [
        {
          "start": 2975,
          "length": 32
        }
      ],
      "56216": [
        {
          "start": 880,
          "length": 32
        },
        {
          "start": 1768,
          "length": 32
        },
        {
          "start": 2578,
          "length": 32
        },
        {
          "start": 5139,
          "length": 32
        },
        {
          "start": 6673,
          "length": 32
        },
        {
          "start": 7984,
          "length": 32
        }
      ],
      "56218": [
        {
          "start": 944,
          "length": 32
        },
        {
          "start": 1595,
          "length": 32
        },
        {
          "start": 2499,
          "length": 32
        },
        {
          "start": 2925,
          "length": 32
        },
        {
          "start": 3302,
          "length": 32
        },
        {
          "start": 4779,
          "length": 32
        },
        {
          "start": 5696,
          "length": 32
        },
        {
          "start": 7811,
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
    "doObligation((address,bytes,address,uint256),uint64)": "a4f0d517",
    "doObligationFor((address,bytes,address,uint256),uint64,address)": "c1e4a710",
    "doObligationRaw(bytes,uint64,bytes32)": "b3b902d4",
    "extractArbiterAndDemand(bytes)": "8371ef59",
    "getObligationData(bytes32)": "c6ec5070",
    "getSchema()": "6b122fe0",
    "isPayable()": "ce46e046",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "reclaimExpired(bytes32)": "7d2c2931",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC20TransferFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrowRaw\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"extractArbiterAndDemand\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/default/ERC20EscrowObligation.sol\":\"ERC20EscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0xd5ea07362ab630a6a3dee4285a74cf2377044ca2e4be472755ad64d7c5d4b69d\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da5e832b40fc5c3145d3781e2e5fa60ac2052c9d08af7e300dc8ab80c4343100\",\"dweb:/ipfs/QmTzf7N5ZUdh5raqtzbM11yexiUoLC9z3Ws632MCuycq1d\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0x0afcb7e740d1537b252cb2676f600465ce6938398569f09ba1b9ca240dde2dfc\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1c299900ac4ec268d4570ecef0d697a3013cd11a6eb74e295ee3fbc945056037\",\"dweb:/ipfs/Qmab9owJoxcA7vJT5XNayCMaUR1qxqj1NDzzisduwaJMcZ\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0x1a6221315ce0307746c2c4827c125d821ee796c74a676787762f4778671d4f44\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1bb2332a7ee26dd0b0de9b7fe266749f54820c99ab6a3bcb6f7e6b751d47ee2d\",\"dweb:/ipfs/QmcRWpaBeCYkhy68PR3B4AgD7asuQk7PwkWxrvJbZcikLF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0x74ed01eb66b923d0d0cfe3be84604ac04b76482a55f9dd655e1ef4d367f95bc2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5282825a626cfe924e504274b864a652b0023591fa66f06a067b25b51ba9b303\",\"dweb:/ipfs/QmeCfPykghhMc81VJTrHTC7sF6CRvaA1FXVq2pJhwYp1dV\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x304d732678032a9781ae85c8f204c8fba3d3a5e31c02616964e75cfdc5049098\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://299ced486011781dc98f638059678323c03079fefae1482abaa2135b22fa92d0\",\"dweb:/ipfs/QmbZNbcPTBxNvwChavN2kkZZs7xHhYL7mv51KrxMhsMs3j\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0xb600ec42b766fee45645fd148a2154d63cb964859545cf973277721db472edab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://98dd51bad2ef82faf14593c8d5cb8c2834fba287dea5c5bbb6e6107640e29e7f\",\"dweb:/ipfs/QmaCk9ghcsnzpHKVPdbuj83VC92YXGkRrV7xjHWya4r6Qo\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0x2938018e0e6ab1e92a62cd70479fa28250235836aabd5a1a4603da7e4fc13846\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://86cf4437d22fb38e298a17c9e5a5177bef28e6ab28a5748626df3501f0d114f4\",\"dweb:/ipfs/QmRuSzs2cUZjycTzVvD3e3m8jA7cUu1M2s4KmB172Z6N8D\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xe27fdb0826bbaf3ba2b553859e500bc065a3ce4d5ad32cfa3fdc8878b6dfcae9\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://437e871a4477e0c9b0d4300f52e45c4f3f9c72a8c30cebee983c6fa6ab570727\",\"dweb:/ipfs/QmXFx9BnkRjiMvSSRc9CqQZzR5fMjzyq2ze7fQXitBecT5\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/escrow/default/ERC20EscrowObligation.sol\":{\"keccak256\":\"0x5fb69d93b7aef8efa149aa33cf0b2a24f3fbe86e20babdaff3d869cbd3c395b1\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://9ae63a3fbff24742902ef023ce9152bc63da5c1c530892abe5ec511b8a0287cd\",\"dweb:/ipfs/QmfN9zLTyTt8UiuzQuJeYDkoZTTvggcjCPoEBf6FsSMGy3\"]}},\"version\":1}",
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
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC20TransferFailed"
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
              "internalType": "struct ERC20EscrowObligation.ObligationData",
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
              "internalType": "struct ERC20EscrowObligation.ObligationData",
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
              "internalType": "struct ERC20EscrowObligation.ObligationData",
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
              "internalType": "struct ERC20EscrowObligation.ObligationData",
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
        "src/obligations/escrow/default/ERC20EscrowObligation.sol": "ERC20EscrowObligation"
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
      "src/obligations/escrow/default/ERC20EscrowObligation.sol": {
        "keccak256": "0x5fb69d93b7aef8efa149aa33cf0b2a24f3fbe86e20babdaff3d869cbd3c395b1",
        "urls": [
          "bzz-raw://9ae63a3fbff24742902ef023ce9152bc63da5c1c530892abe5ec511b8a0287cd",
          "dweb:/ipfs/QmfN9zLTyTt8UiuzQuJeYDkoZTTvggcjCPoEBf6FsSMGy3"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 96
} as const;
