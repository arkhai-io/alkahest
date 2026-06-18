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
          "internalType": "struct HookEscrowObligation.ObligationData",
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
              "name": "hook",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "hookData",
              "type": "bytes",
              "internalType": "bytes"
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
          "internalType": "struct HookEscrowObligation.ObligationData",
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
              "name": "hook",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "hookData",
              "type": "bytes",
              "internalType": "bytes"
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
          "internalType": "struct HookEscrowObligation.ObligationData",
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
              "name": "hook",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "hookData",
              "type": "bytes",
              "internalType": "bytes"
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
          "internalType": "struct HookEscrowObligation.ObligationData",
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
              "name": "hook",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "hookData",
              "type": "bytes",
              "internalType": "bytes"
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
    "object": "0x61016080604052346101bb57604081612338803803809161002082856101bf565b8339810103126101bb578051906001600160a01b038216908183036101bb57602001516001600160a01b03811691908281036101bb57604051916100656060846101bf565b603b83527f6164647265737320617262697465722c2062797465732064656d616e642c206160208401527f64647265737320686f6f6b2c20627974657320686f6f6b44617461000000000060408401526001608052600360a0525f60c052156101ac57836100df9460e052610120526101005230916102da565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055604051611e8290816104b6823960805181610c67015260a05181610c92015260c05181610cbd015260e05181611b1501526101005181610ade01526101205181818161038a015281816106e8015281816108e10152818161137101528181611a5d0152611d4b0152610140518181816103ca0152818161063b0152818161089201528181610aac01528181610c25015281816112170152818161165d0152611c9e0152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b038211908210176101e257604052565b634e487b7160e01b5f52604160045260245ffd5b6020818303126101bb578051906001600160401b0382116101bb5701906080828203126101bb5760405191608083016001600160401b038111848210176101e2576040528051835260208101516001600160a01b03811681036101bb576020840152604081015180151581036101bb5760408401526060810151906001600160401b0382116101bb570181601f820112156101bb578051906001600160401b0382116101e257604051926102b4601f8401601f1916602001856101bf565b828452602083830101116101bb57815f9260208093018386015e83010152606082015290565b929160405190602082018351926103246015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a198101845201826101bf565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156104355787915f9161049b575b505114610495579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610461575b5061044057505f602491604051928380926351753e3760e11b82528760048301525afa80156104355783915f91610413575b5051146104115750639e6113d560e01b5f5260045260245ffd5b565b61042f91503d805f833e61042781836101bf565b8101906101f6565b5f6103f7565b6040513d5f823e3d90fd5b9192809150820361044f575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d60201161048d575b8161047d602093836101bf565b810103126101bb5751905f6103c5565b3d9150610470565b50505050565b6104af91503d805f833e61042781836101bf565b5f61035f56fe60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610d3657806354fd4d5014610c485780635bf2f20d14610c0e5780636b122fe014610a6d5780637d2c2931146108635780638371ef591461080457806388e5b2d9146107b6578063891d9ea8146107d557806391db0b7e146107b6578063b3b902d414610542578063b911e52e146104da578063c26bee3f14610455578063c6ec507014610349578063c93844be14610258578063ce46e0461461023c578063e49617e114610221578063e60c3505146102215763e6c9714d146100f8575061000e565b3461021a57606036600319011261021a57600435906001600160401b03821161021a57610140600319833603011261021a576040519161013783610dd7565b806004013583526024810135602084015261015460448201610f61565b604084015261016560648201610f61565b606084015261017660848201610f61565b608084015260a481013560a084015261019160c48201610f75565b60c08401526101a260e48201610f75565b60e0840152610104810135801515810361021d576101008401526101248101356001600160401b03811161021d576101df91369101600401610e80565b610120830152602435906001600160401b03821161021a5760206102108461020a3660048701610e80565b9061165b565b6040519015158152f35b80fd5b8280fd5b602061021061022f36610fe8565b610237611b13565b611b54565b503461021a578060031936011261021a57602090604051908152f35b503461021a57602036600319011261021a576004356001600160401b03811161034557610289903690600401610f1e565b610294929192611637565b50820191602081840312610345578035906001600160401b03821161021d57019060808284031261021a57604051916102cc83610d8d565b6102d581610f75565b835260208101356001600160401b03811161021d57846102f6918301610e80565b602084015261030760408201610f75565b60408401526060810135916001600160401b03831161021a575092610330916103419401610e80565b606082015260405191829182610f89565b0390f35b5080fd5b503461021a57602036600319011261021a57610363611637565b5061036c6118fe565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610448578192610424575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610415576103416104096101208401516020808251830101910161108d565b60405191829182610f89565b635527981560e11b8152600490fd5b6104419192503d8084833e6104398183610e0e565b81019061195c565b905f6103c2565b50604051903d90823e3d90fd5b50606036600319011261021a576004356001600160401b038111610345576080600319823603011261034557610489610f4b565b604435929091906001600160a01b038416840361021a5760206104d285856104bf6104cd876040519283916004018883016115bc565b03601f198101835282610e0e565b611bdf565b604051908152f35b50604036600319011261021a57600435906001600160401b03821161021a576080600319833603011261021a5760206104d261052d8461053b61051b610f4b565b916040519384916004018783016115bc565b03601f198101845283610e0e565b3391611bdf565b50606036600319011261021a576004356001600160401b03811161034557610571610583913690600401610f1e565b919061057b610f4b565b923691610e4a565b61058b6118c6565b8261059f602083518401016020840161108d565b6040810151606090910151906001600160a01b0316803b1561021d576105e09183916040518080958194631dc8160b60e01b83523090339060048501611ae5565b039134905af18015610796576107a1575b50506001600160401b036040519261060884610df3565b33845216602083015260016040830152604435606083015260808201528160a0820152602060405161063981610dbc565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06106da608083015160c060e4860152610124850190610d69565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115610796578291610763575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f516020611e2d5f395f51905f5255604051908152f35b90506020813d60201161078e575b8161077e60209383610e0e565b8101031261034557516020610720565b3d9150610771565b6040513d84823e3d90fd5b816107ab91610e0e565b61021d57825f6105f1565b60206102106107c436610ece565b926107d0929192611b13565b61114e565b503461021a576103416107f06107ea36610d53565b906111f2565b604051918291602083526020830190610d69565b503461021a57602036600319011261021a57600435906001600160401b03821161021a5761083d6108383660048501610e80565b611125565b604080516001600160a01b03909316835260208301819052829161034191830190610d69565b5034610a4b576020366003190112610a4b57600435906108816118c6565b61088a82611a37565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610a5e57606084016001600160401b0381511615610a4f57516001600160401b03164210610a4f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061091381610dbc565b8381525f60208201526040519261092984610dbc565b83526020830152803b15610a4b57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610a36575b5061098d5763614cf93960e01b825260045260249150fd5b5090816109b76101208301519260c060018060a01b0391015116926020808251830101910161108d565b6040810151606090910151906001600160a01b0316803b1561021d576109f69383604051809681958294638b9d453960e01b8452309160048501611ae5565b03925af1801561079657610a21575b60015f516020611e2d5f395f51905f5255602060405160018152f35b610a2c828092610e0e565b61021a5780610a05565b610a439193505f90610e0e565b5f915f610975565b5f80fd5b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b34610a4b575f366003190112610a4b57606080604051610a8c81610d8d565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610c03575f90610b53575b606090610341604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610d69565b503d805f833e610b638183610e0e565b810190602081830312610a4b578051906001600160401b038211610a4b5701608081830312610a4b5760405190610b9982610d8d565b8051825260208101516001600160a01b0381168103610a4b576020830152610bc36040820161101c565b60408301526060810151906001600160401b038211610a4b570182601f82011215610a4b57606092816020610bfa93519101611029565b82820152610b0d565b6040513d5f823e3d90fd5b34610a4b575f366003190112610a4b5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610a4b575f366003190112610a4b5761034160206107f06001610c8b7f0000000000000000000000000000000000000000000000000000000000000000611759565b8184610cb67f0000000000000000000000000000000000000000000000000000000000000000611759565b8180610ce17f0000000000000000000000000000000000000000000000000000000000000000611759565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610e0e565b34610a4b57610d476107ea36610d53565b50602060405160018152f35b6040906003190112610a4b576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610da857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610da857604052565b61014081019081106001600160401b03821117610da857604052565b60c081019081106001600160401b03821117610da857604052565b90601f801991011681019081106001600160401b03821117610da857604052565b6001600160401b038111610da857601f01601f191660200190565b929192610e5682610e2f565b91610e646040519384610e0e565b829481845281830111610a4b578281602093845f960137010152565b9080601f83011215610a4b57816020610e9b93359101610e4a565b90565b9181601f84011215610a4b578235916001600160401b038311610a4b576020808501948460051b010111610a4b57565b6040600319820112610a4b576004356001600160401b038111610a4b5781610ef891600401610e9e565b92909291602435906001600160401b038211610a4b57610f1a91600401610e9e565b9091565b9181601f84011215610a4b578235916001600160401b038311610a4b5760208381860195010111610a4b57565b602435906001600160401b0382168203610a4b57565b35906001600160401b0382168203610a4b57565b35906001600160a01b0382168203610a4b57565b602080825282516001600160a01b03168183015282015160806040830152610e9b929190606090610fbe9060a0840190610d69565b60408401516001600160a01b031683830152920151818303601f1901608090920191909152610d69565b6020600319820112610a4b57600435906001600160401b038211610a4b57610140908290036003190112610a4b5760040190565b51908115158203610a4b57565b92919261103582610e2f565b916110436040519384610e0e565b829481845281830111610a4b578281602093845f96015e010152565b51906001600160a01b0382168203610a4b57565b9080601f83011215610a4b578151610e9b92602001611029565b602081830312610a4b578051906001600160401b038211610a4b5701608081830312610a4b57604051916110c083610d8d565b6110c98261105f565b835260208201516001600160401b038111610a4b57816110ea918401611073565b60208401526110fb6040830161105f565b604084015260608201516001600160401b038111610a4b5761111d9201611073565b606082015290565b611138906020808251830101910161108d565b80516020909101516001600160a01b0390911691565b9290928184036111e3575f91345b858410156111d857818410156111c4578360051b80860135908282116111b55784013561013e1985360301811215610a4b57611199908501611b54565b156111aa576001910393019261115c565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b6111fa6118c6565b5f9161120582611a37565b9061120f81611a37565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103610a5e5761124682611b6d565b15610a5e5761012082019161125b8351611125565b60a08701918251845103611522578760209360c093611343610120975191611331604051998a988997889763e6c9714d60e01b8952606060048a0152815160648a01528c82015160848a01526001600160401b0360408301511660a48a01526001600160401b0360608301511660c48a01526001600160401b0360808301511660e48a015251610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610d69565b84810360031901602486015290610d69565b604483019190915203916001600160a01b03165afa908115610c03575f91611531575b5015611522576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906113a381610dbc565b8681525f6020820152604051926113b984610dbc565b83526020830152803b15610a4b57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161150d575b5061141e5763614cf93960e01b85526004849052602485fd5b93929091935161144160018060a01b03865116916020808251830101910161108d565b606060018060a01b0360408301511691015191813b15611509579185916114819383604051809681958294631a6a589360e01b8452309160048501611ae5565b03925af180156114fe579084916114e9575b50507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0604051946114c5602087610e0e565b848652516001600160a01b03169380a49060015f516020611e2d5f395f51905f5255565b816114f391610e0e565b61021d57825f611493565b6040513d86823e3d90fd5b8580fd5b61151a9196505f90610e0e565b5f945f611405565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611563575b8161154c60209383610e0e565b81010312610a4b5761155d9061101c565b5f611366565b3d915061153f565b9035601e1982360301811215610a4b5701602081359101916001600160401b038211610a4b578136038313610a4b57565b908060209392818452848401375f828201840152601f01601f1916010190565b60208152610e9b91906001600160a01b036115d683610f75565b1660208201526116256116006115ef602085018561156b565b6080604086015260a085019161159c565b926001600160a01b0361161560408301610f75565b166060840152606081019061156b565b916080601f198286030191015261159c565b6040519061164482610d8d565b606080835f81528160208201525f60408201520152565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361174a5761168f81611b6d565b15611744576116af6101206116bf9201516020808251830101910161108d565b916020808251830101910161108d565b604082810151908201516001600160a01b039081169116149182611723575b8261170a575b826116ee57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506116e4565b915060608201516020815191012060608201516020815191012014916116de565b50505f90565b635f9bd90760e11b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156118a3575b806d04ee2d6d415b85acef8100000000600a921015611888575b662386f26fc10000811015611874575b6305f5e100811015611863575b612710811015611854575b6064811015611846575b101561183b575b600a602160018401936117e085610e2f565b946117ee6040519687610e0e565b8086526117fd601f1991610e2f565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561183657600a9091611808565b505090565b6001909101906117ce565b6064600291049301926117c7565b612710600491049301926117bd565b6305f5e100600891049301926117b2565b662386f26fc10000601091049301926117a5565b6d04ee2d6d415b85acef810000000060209104930192611795565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461177b565b60025f516020611e2d5f395f51905f5254146118ef5760025f516020611e2d5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b6040519061190b82610dd7565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610a4b57565b602081830312610a4b578051906001600160401b038211610a4b570161014081830312610a4b576040519161199083610dd7565b81518352602082015160208401526119aa60408301611948565b60408401526119bb60608301611948565b60608401526119cc60808301611948565b608084015260a082015160a08401526119e760c0830161105f565b60c08401526119f860e0830161105f565b60e0840152611a0a610100830161101c565b6101008401526101208201516001600160401b038111610a4b57611a2e9201611073565b61012082015290565b90611a406118fe565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610c03575f93611ac9575b508251818115918215611abe575b5050611aac5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611aa3565b611ade9193503d805f833e6104398183610e0e565b915f611a95565b919392611afc604092606085526060850190610d69565b6001600160a01b0395861660208501529416910152565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611b4557565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b038116809103610a4b57301490565b805115611bd0576001600160401b036060820151168015159081611bc5575b50611bb657608001516001600160401b0316611ba757600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611b8c565b635c2c7f8960e01b5f5260045ffd5b5f90611be96118c6565b611bfc602082518301016020830161108d565b6040810151606090910151906001600160a01b0316803b15610a4b57611c3d915f916040518080958194631dc8160b60e01b83523090339060048501611ae5565b039134905af18015610c0357611e17575b506001600160401b0360405194611c6486610df3565b60018060a01b0316938486521660208501526001604085015281606085015260808401528060a08401526020604051611c9c81610dbc565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611d3d608083015160c060e4860152610124850190610d69565b9101516101048301520381847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610448578193611dbd575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06818492a39060015f516020611e2d5f395f51905f5255565b909392506020813d602011611e0f575b81611dda60209383610e0e565b81010312611e0b575191927f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06611d83565b8380fd5b3d9150611dcd565b611e249192505f90610e0e565b5f905f611c4e56fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a264697066735822122022c7527d998d5b2d4d387c03c437016db1e7541ea0976e21346017658ee1a5fb64736f6c634300081b0033",
    "sourceMap": "999:4582:84:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;1670:4;759:14:6;;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;790:10;1066:81:78;790:10:9;;;971::78;;991:32;;1129:4;1066:81;;:::i;:::-;1033:114;;1670:4:84;1505:66:63;2365:1;999:4582:84;;;;;;;;759:14:6;999:4582:84;;;;;783:14:6;999:4582:84;;;;;807:14:6;999:4582:84;;;;;790:10:9;999:4582:84;;;;;991:32:78;999:4582:84;;;;;971:10:78;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1033:114:78;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;999:4582:84;-1:-1:-1;999:4582:84;;;;;;;-1:-1:-1;;999:4582:84;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;999:4582:84;;;;;-1:-1:-1;999:4582:84;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;999:4582:84;;;;;;;;;;;;;;;;;;:::o;289:755:82:-;;;999:4582:84;;1189:45:82;;;;999:4582:84;;;1189:45:82;999:4582:84;1189:45:82;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:82;;;;;;;;;;;:::i;:::-;999:4582:84;1179:56:82;;999:4582:84;;-1:-1:-1;;;572:29:82;;;;;999:4582:84;;;1179:56:82;;-1:-1:-1;;;;;999:4582:84;;;-1:-1:-1;999:4582:84;572:29:82;999:4582:84;;572:29:82;;;;;;;;-1:-1:-1;572:29:82;;;289:755;999:4582:84;;615:19:82;611:35;;999:4582:84;;1189:45:82;999:4582:84;;;;;;;;;;;661:52:82;;999:4582:84;572:29:82;661:52;;999:4582:84;;;;;;;;;;;;;-1:-1:-1;999:4582:84;;;;;;;;;;;;572:29:82;999:4582:84;;;1670:4;999:4582;;;;;;;;;;;;661:52:82;;;-1:-1:-1;661:52:82;;;-1:-1:-1;;661:52:82;;;289:755;-1:-1:-1;657:381:82;;999:4582:84;-1:-1:-1;572:29:82;999:4582:84;;;;;;;;;;899:29:82;;;572;899;;999:4582:84;899:29:82;;;;;;;;-1:-1:-1;899:29:82;;;657:381;999:4582:84;;946:19:82;942:35;;793:29;;;;-1:-1:-1;998:29:82;572;999:4582:84;572:29:82;-1:-1:-1;998:29:82;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:82;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;999:4582:84;;;-1:-1:-1;999:4582:84;;;;;657:381:82;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:82;572;999:4582:84;572:29:82;-1:-1:-1;793:29:82;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;999:4582:84;;;;;661:52:82;;;;;;;-1:-1:-1;661:52:82;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:82;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610d3657806354fd4d5014610c485780635bf2f20d14610c0e5780636b122fe014610a6d5780637d2c2931146108635780638371ef591461080457806388e5b2d9146107b6578063891d9ea8146107d557806391db0b7e146107b6578063b3b902d414610542578063b911e52e146104da578063c26bee3f14610455578063c6ec507014610349578063c93844be14610258578063ce46e0461461023c578063e49617e114610221578063e60c3505146102215763e6c9714d146100f8575061000e565b3461021a57606036600319011261021a57600435906001600160401b03821161021a57610140600319833603011261021a576040519161013783610dd7565b806004013583526024810135602084015261015460448201610f61565b604084015261016560648201610f61565b606084015261017660848201610f61565b608084015260a481013560a084015261019160c48201610f75565b60c08401526101a260e48201610f75565b60e0840152610104810135801515810361021d576101008401526101248101356001600160401b03811161021d576101df91369101600401610e80565b610120830152602435906001600160401b03821161021a5760206102108461020a3660048701610e80565b9061165b565b6040519015158152f35b80fd5b8280fd5b602061021061022f36610fe8565b610237611b13565b611b54565b503461021a578060031936011261021a57602090604051908152f35b503461021a57602036600319011261021a576004356001600160401b03811161034557610289903690600401610f1e565b610294929192611637565b50820191602081840312610345578035906001600160401b03821161021d57019060808284031261021a57604051916102cc83610d8d565b6102d581610f75565b835260208101356001600160401b03811161021d57846102f6918301610e80565b602084015261030760408201610f75565b60408401526060810135916001600160401b03831161021a575092610330916103419401610e80565b606082015260405191829182610f89565b0390f35b5080fd5b503461021a57602036600319011261021a57610363611637565b5061036c6118fe565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610448578192610424575b5060208201517f000000000000000000000000000000000000000000000000000000000000000003610415576103416104096101208401516020808251830101910161108d565b60405191829182610f89565b635527981560e11b8152600490fd5b6104419192503d8084833e6104398183610e0e565b81019061195c565b905f6103c2565b50604051903d90823e3d90fd5b50606036600319011261021a576004356001600160401b038111610345576080600319823603011261034557610489610f4b565b604435929091906001600160a01b038416840361021a5760206104d285856104bf6104cd876040519283916004018883016115bc565b03601f198101835282610e0e565b611bdf565b604051908152f35b50604036600319011261021a57600435906001600160401b03821161021a576080600319833603011261021a5760206104d261052d8461053b61051b610f4b565b916040519384916004018783016115bc565b03601f198101845283610e0e565b3391611bdf565b50606036600319011261021a576004356001600160401b03811161034557610571610583913690600401610f1e565b919061057b610f4b565b923691610e4a565b61058b6118c6565b8261059f602083518401016020840161108d565b6040810151606090910151906001600160a01b0316803b1561021d576105e09183916040518080958194631dc8160b60e01b83523090339060048501611ae5565b039134905af18015610796576107a1575b50506001600160401b036040519261060884610df3565b33845216602083015260016040830152604435606083015260808201528160a0820152602060405161063981610dbc565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06106da608083015160c060e4860152610124850190610d69565b9101516101048301520381857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115610796578291610763575b50602091817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a360015f516020611e2d5f395f51905f5255604051908152f35b90506020813d60201161078e575b8161077e60209383610e0e565b8101031261034557516020610720565b3d9150610771565b6040513d84823e3d90fd5b816107ab91610e0e565b61021d57825f6105f1565b60206102106107c436610ece565b926107d0929192611b13565b61114e565b503461021a576103416107f06107ea36610d53565b906111f2565b604051918291602083526020830190610d69565b503461021a57602036600319011261021a57600435906001600160401b03821161021a5761083d6108383660048501610e80565b611125565b604080516001600160a01b03909316835260208301819052829161034191830190610d69565b5034610a4b576020366003190112610a4b57600435906108816118c6565b61088a82611a37565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610a5e57606084016001600160401b0381511615610a4f57516001600160401b03164210610a4f576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061091381610dbc565b8381525f60208201526040519261092984610dbc565b83526020830152803b15610a4b57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610a36575b5061098d5763614cf93960e01b825260045260249150fd5b5090816109b76101208301519260c060018060a01b0391015116926020808251830101910161108d565b6040810151606090910151906001600160a01b0316803b1561021d576109f69383604051809681958294638b9d453960e01b8452309160048501611ae5565b03925af1801561079657610a21575b60015f516020611e2d5f395f51905f5255602060405160018152f35b610a2c828092610e0e565b61021a5780610a05565b610a439193505f90610e0e565b5f915f610975565b5f80fd5b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b34610a4b575f366003190112610a4b57606080604051610a8c81610d8d565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610c03575f90610b53575b606090610341604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610d69565b503d805f833e610b638183610e0e565b810190602081830312610a4b578051906001600160401b038211610a4b5701608081830312610a4b5760405190610b9982610d8d565b8051825260208101516001600160a01b0381168103610a4b576020830152610bc36040820161101c565b60408301526060810151906001600160401b038211610a4b570182601f82011215610a4b57606092816020610bfa93519101611029565b82820152610b0d565b6040513d5f823e3d90fd5b34610a4b575f366003190112610a4b5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610a4b575f366003190112610a4b5761034160206107f06001610c8b7f0000000000000000000000000000000000000000000000000000000000000000611759565b8184610cb67f0000000000000000000000000000000000000000000000000000000000000000611759565b8180610ce17f0000000000000000000000000000000000000000000000000000000000000000611759565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610e0e565b34610a4b57610d476107ea36610d53565b50602060405160018152f35b6040906003190112610a4b576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610da857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610da857604052565b61014081019081106001600160401b03821117610da857604052565b60c081019081106001600160401b03821117610da857604052565b90601f801991011681019081106001600160401b03821117610da857604052565b6001600160401b038111610da857601f01601f191660200190565b929192610e5682610e2f565b91610e646040519384610e0e565b829481845281830111610a4b578281602093845f960137010152565b9080601f83011215610a4b57816020610e9b93359101610e4a565b90565b9181601f84011215610a4b578235916001600160401b038311610a4b576020808501948460051b010111610a4b57565b6040600319820112610a4b576004356001600160401b038111610a4b5781610ef891600401610e9e565b92909291602435906001600160401b038211610a4b57610f1a91600401610e9e565b9091565b9181601f84011215610a4b578235916001600160401b038311610a4b5760208381860195010111610a4b57565b602435906001600160401b0382168203610a4b57565b35906001600160401b0382168203610a4b57565b35906001600160a01b0382168203610a4b57565b602080825282516001600160a01b03168183015282015160806040830152610e9b929190606090610fbe9060a0840190610d69565b60408401516001600160a01b031683830152920151818303601f1901608090920191909152610d69565b6020600319820112610a4b57600435906001600160401b038211610a4b57610140908290036003190112610a4b5760040190565b51908115158203610a4b57565b92919261103582610e2f565b916110436040519384610e0e565b829481845281830111610a4b578281602093845f96015e010152565b51906001600160a01b0382168203610a4b57565b9080601f83011215610a4b578151610e9b92602001611029565b602081830312610a4b578051906001600160401b038211610a4b5701608081830312610a4b57604051916110c083610d8d565b6110c98261105f565b835260208201516001600160401b038111610a4b57816110ea918401611073565b60208401526110fb6040830161105f565b604084015260608201516001600160401b038111610a4b5761111d9201611073565b606082015290565b611138906020808251830101910161108d565b80516020909101516001600160a01b0390911691565b9290928184036111e3575f91345b858410156111d857818410156111c4578360051b80860135908282116111b55784013561013e1985360301811215610a4b57611199908501611b54565b156111aa576001910393019261115c565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b6111fa6118c6565b5f9161120582611a37565b9061120f81611a37565b9160208101517f0000000000000000000000000000000000000000000000000000000000000000809103610a5e5761124682611b6d565b15610a5e5761012082019161125b8351611125565b60a08701918251845103611522578760209360c093611343610120975191611331604051998a988997889763e6c9714d60e01b8952606060048a0152815160648a01528c82015160848a01526001600160401b0360408301511660a48a01526001600160401b0360608301511660c48a01526001600160401b0360808301511660e48a015251610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610d69565b84810360031901602486015290610d69565b604483019190915203916001600160a01b03165afa908115610c03575f91611531575b5015611522576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906113a381610dbc565b8681525f6020820152604051926113b984610dbc565b83526020830152803b15610a4b57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161150d575b5061141e5763614cf93960e01b85526004849052602485fd5b93929091935161144160018060a01b03865116916020808251830101910161108d565b606060018060a01b0360408301511691015191813b15611509579185916114819383604051809681958294631a6a589360e01b8452309160048501611ae5565b03925af180156114fe579084916114e9575b50507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0604051946114c5602087610e0e565b848652516001600160a01b03169380a49060015f516020611e2d5f395f51905f5255565b816114f391610e0e565b61021d57825f611493565b6040513d86823e3d90fd5b8580fd5b61151a9196505f90610e0e565b5f945f611405565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611563575b8161154c60209383610e0e565b81010312610a4b5761155d9061101c565b5f611366565b3d915061153f565b9035601e1982360301811215610a4b5701602081359101916001600160401b038211610a4b578136038313610a4b57565b908060209392818452848401375f828201840152601f01601f1916010190565b60208152610e9b91906001600160a01b036115d683610f75565b1660208201526116256116006115ef602085018561156b565b6080604086015260a085019161159c565b926001600160a01b0361161560408301610f75565b166060840152606081019061156b565b916080601f198286030191015261159c565b6040519061164482610d8d565b606080835f81528160208201525f60408201520152565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361174a5761168f81611b6d565b15611744576116af6101206116bf9201516020808251830101910161108d565b916020808251830101910161108d565b604082810151908201516001600160a01b039081169116149182611723575b8261170a575b826116ee57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b0390811691161492506116e4565b915060608201516020815191012060608201516020815191012014916116de565b50505f90565b635f9bd90760e11b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156118a3575b806d04ee2d6d415b85acef8100000000600a921015611888575b662386f26fc10000811015611874575b6305f5e100811015611863575b612710811015611854575b6064811015611846575b101561183b575b600a602160018401936117e085610e2f565b946117ee6040519687610e0e565b8086526117fd601f1991610e2f565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561183657600a9091611808565b505090565b6001909101906117ce565b6064600291049301926117c7565b612710600491049301926117bd565b6305f5e100600891049301926117b2565b662386f26fc10000601091049301926117a5565b6d04ee2d6d415b85acef810000000060209104930192611795565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b810461177b565b60025f516020611e2d5f395f51905f5254146118ef5760025f516020611e2d5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b6040519061190b82610dd7565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610a4b57565b602081830312610a4b578051906001600160401b038211610a4b570161014081830312610a4b576040519161199083610dd7565b81518352602082015160208401526119aa60408301611948565b60408401526119bb60608301611948565b60608401526119cc60808301611948565b608084015260a082015160a08401526119e760c0830161105f565b60c08401526119f860e0830161105f565b60e0840152611a0a610100830161101c565b6101008401526101208201516001600160401b038111610a4b57611a2e9201611073565b61012082015290565b90611a406118fe565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610c03575f93611ac9575b508251818115918215611abe575b5050611aac5750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611aa3565b611ade9193503d805f833e6104398183610e0e565b915f611a95565b919392611afc604092606085526060850190610d69565b6001600160a01b0395861660208501529416910152565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611b4557565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b038116809103610a4b57301490565b805115611bd0576001600160401b036060820151168015159081611bc5575b50611bb657608001516001600160401b0316611ba757600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611b8c565b635c2c7f8960e01b5f5260045ffd5b5f90611be96118c6565b611bfc602082518301016020830161108d565b6040810151606090910151906001600160a01b0316803b15610a4b57611c3d915f916040518080958194631dc8160b60e01b83523090339060048501611ae5565b039134905af18015610c0357611e17575b506001600160401b0360405194611c6486610df3565b60018060a01b0316938486521660208501526001604085015281606085015260808401528060a08401526020604051611c9c81610dbc565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611d3d608083015160c060e4860152610124850190610d69565b9101516101048301520381847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610448578193611dbd575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06818492a39060015f516020611e2d5f395f51905f5255565b909392506020813d602011611e0f575b81611dda60209383610e0e565b81010312611e0b575191927f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06611d83565b8380fd5b3d9150611dcd565b611e249192505f90610e0e565b5f905f611c4e56fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a264697066735822122022c7527d998d5b2d4d387c03c437016db1e7541ea0976e21346017658ee1a5fb64736f6c634300081b0033",
    "sourceMap": "999:4582:84:-:0;;;;;;;;;-1:-1:-1;999:4582:84;;;;;;;;1183:12:9;;;1054:5;1183:12;999:4582:84;1054:5:9;1183:12;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;3045:39:9;999:4582:84;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;999:4582:84:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;5538:34;;999:4582;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;999:4582:84;;-1:-1:-1;;;2619:23:78;;999:4582:84;;;2619:23:78;;;999:4582:84;;;;2619:23:78;999:4582:84;2619:3:78;-1:-1:-1;;;;;999:4582:84;2619:23:78;;;;;;;;;;;999:4582:84;2656:19:78;999:4582:84;2656:19:78;;999:4582:84;2679:18:78;2656:41;2652:87;;999:4582:84;5367:46;5378:16;;;;999:4582;;;;5367:46;;;;;;:::i;:::-;999:4582;;;;;;;:::i;2652:87:78:-;-1:-1:-1;;;2718:21:78;;999:4582:84;;2718:21:78;2619:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;999:4582:84;;;;;;;;;;;;-1:-1:-1;999:4582:84;;-1:-1:-1;;999:4582:84;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;1139:12:80;999:4582:84;;4969:16;;999:4582;;;;;;;;4969:16;;;;:::i;:::-;;1055:104:6;;4969:16:84;;;;;;:::i;:::-;1139:12:80;:::i;:::-;999:4582:84;;;;;;;-1:-1:-1;999:4582:84;;-1:-1:-1;;999:4582:84;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;1139:12:80;4702:16:84;999:4582;4702:16;999:4582;;:::i;:::-;;;;;;;;;4702:16;;;;:::i;:::-;;1055:104:6;;4702:16:84;;;;;;:::i;:::-;4736:10;1139:12:80;;:::i;999:4582:84:-;-1:-1:-1;999:4582:84;;-1:-1:-1;;999:4582:84;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;:::i;:::-;2989:103:63;;:::i;:::-;999:4582:84;2428:34;999:4582;;;2428:34;;;999:4582;2428:34;;;:::i;:::-;999:4582;2484:12;;999:4582;;2523:16;;;;;-1:-1:-1;;;;;999:4582:84;2472:89;;;;;;999:4582;;;;;;;;;;;;;2472:89;;2555:4;903:10:80;;2472:89:84;999:4582;2472:89;;;:::i;:::-;;2512:9;;2472:89;;;;;;;;;999:4582;;;-1:-1:-1;;;;;999:4582:84;;;;;;:::i;:::-;903:10:80;999:4582:84;;;;2141:299:78;;999:4582:84;2303:4:78;999:4582:84;2141:299:78;;999:4582:84;;;;2141:299:78;;999:4582:84;2141:299:78;;;999:4582:84;2141:299:78;;;;999:4582:84;;;;;;;:::i;:::-;2095:18:78;999:4582:84;;2046:413:78;;;999:4582:84;;;;;;;;;;;;2018:455:78;;;999:4582:84;2018:455:78;;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;2141:299:78;999:4582:84;2141:299:78;999:4582:84;;;;;;;;;;;;;:::i;:::-;;;;;;;;2018:455:78;999:4582:84;;2018:3:78;-1:-1:-1;;;;;999:4582:84;2018:455:78;;;;;;;;;;;999:4582:84;903:10:80;999:4582:84;903:10:80;;5274:26:79;903:10:80;5274:26:79;;;2303:4:78;-1:-1:-1;;;;;;;;;;;2407:1:63;999:4582:84;;;;;;2018:455:78;;;999:4582:84;2018:455:78;;999:4582:84;2018:455:78;;;;;;999:4582:84;2018:455:78;;;:::i;:::-;;;999:4582:84;;;;;;2018:455:78;;;;;-1:-1:-1;2018:455:78;;;999:4582:84;;;;;;;;;2472:89;;;;;:::i;:::-;999:4582;;2472:89;;;;999:4582;;1442:1461:9;999:4582:84;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;999:4582:84:-;;;;;;2141:12:79;999:4582:84;;;:::i;:::-;2141:12:79;;:::i;:::-;999:4582:84;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;999:4582:84;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;999:4582:84;;;;;;2989:103:63;;;:::i;:::-;3646:28:79;;;:::i;:::-;3741:18;999:4582:84;3741:18:79;;999:4582:84;3763:18:79;3741:40;;;3737:104;;3950:26;;;-1:-1:-1;;;;;999:4582:84;;;3950:31:79;3946:62;;999:4582:84;-1:-1:-1;;;;;999:4582:84;4023:15:79;:44;4019:100;;999:4582:84;;4183:3:79;-1:-1:-1;;;;;999:4582:84;;;;;:::i;:::-;;;;;;4260:43:79;;999:4582:84;;;;;;;:::i;:::-;;;;4207:98:79;;999:4582:84;4183:132:79;;;;;999:4582:84;;-1:-1:-1;;;4183:132:79;;999:4582:84;;;4183:132:79;;999:4582:84;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;-1:-1:-1;;4183:132:79;;;;;;999:4582:84;-1:-1:-1;4179:207:79;;-1:-1:-1;;;4354:21:79;;999:4582:84;;;;-1:-1:-1;4354:21:79;4179:207;;;4465:16;3074:34:84;4465:16:79;;;;999:4582:84;4483:21:79;999:4582:84;;;;;4483:21:79;;999:4582:84;;;;;;;3074:34;;;;;;:::i;:::-;999:4582;3130:12;;999:4582;3950:26:79;3153:16:84;;;;;-1:-1:-1;;;;;999:4582:84;3118:71;;;;;;999:4582;;;;;;;;;;;;;3118:71;;3183:4;3118:71;999:4582;3118:71;;;:::i;:::-;;;;;;;;;;;4179:207:79;999:4582:84;-1:-1:-1;;;;;;;;;;;2407:1:63;999:4582:84;;;;;;;3118:71;;;;;;:::i;:::-;999:4582;;3118:71;;;4183:132:79;;;;;999:4582:84;4183:132:79;;:::i;:::-;999:4582:84;4183:132:79;;;;;999:4582:84;;;4019:100:79;3990:18;;;999:4582:84;4090:18:79;999:4582:84;;4090:18:79;3737:104;3804:26;;;999:4582:84;3804:26:79;999:4582:84;;3804:26:79;999:4582:84;;;;;;-1:-1:-1;;999:4582:84;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1724:44:78;;1749:18;999:4582:84;1724:44:78;;999:4582:84;;;1724:44:78;999:4582:84;;;;;;1724:14:78;999:4582:84;1724:44:78;;;;;;999:4582:84;1724:44:78;;;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1724:44:78:-;;;;999:4582:84;1724:44:78;;;;;;:::i;:::-;;;999:4582:84;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1724:44:78;;;999:4582:84;;;;;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;;724:43:78;999:4582:84;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;1055:104:6;;999:4582:84;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;999:4582:84;;;;;;;;;;;;1055:104:6;;;999:4582:84;;;;-1:-1:-1;;;999:4582:84;;;;;;;;;;;;;;;;;-1:-1:-1;;;999:4582:84;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;999:4582:84:-;;;;2141:12:79;999:4582:84;;;:::i;2141:12:79:-;;999:4582:84;;;5186:4;999:4582;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;999:4582:84;;;;;;;;-1:-1:-1;;999:4582:84;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;:::o;:::-;;;;-1:-1:-1;999:4582:84;;;;;-1:-1:-1;999:4582:84;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;:::o;:::-;;;1055:104:6;;999:4582:84;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;:::o;:::-;-1:-1:-1;;;;;999:4582:84;;;;;;-1:-1:-1;;999:4582:84;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;999:4582:84;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;999:4582:84;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;999:4582:84;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4582:84;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4582:84;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;;;;;:::i;:::-;;-1:-1:-1;;999:4582:84;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;999:4582:84;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4582:84;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;:::i;:::-;;;;;;:::o;2019:289::-;2217:34;2019:289;2217:34;999:4582;;;2217:34;;;;;;:::i;:::-;999:4582;;2217:34;2286:14;;;;-1:-1:-1;;;;;999:4582:84;;;;2019:289::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;999:4582:84;;;;;;;;;;;;;4064:22:9;;;;4060:87;;999:4582:84;;;;;;;;;;;;;;4274:33:9;999:4582:84;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;999:4582:84;;3896:19:9;999:4582:84;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;999:4582:84;;;;3881:1:9;999:4582:84;;;;;3881:1:9;999:4582:84;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2989:103:63;;;:::i;:::-;-1:-1:-1;2197:32:79;;;;:::i;:::-;2272:37;;;;:::i;:::-;2371:13;;;;999:4582:84;2388:18:79;2371:35;;;2367:99;;2481:24;;;:::i;:::-;2480:25;2476:64;;2671:11;;;;2647:36;2671:11;;2647:36;:::i;:::-;2769:18;;;999:4582:84;;;;;2769:32:79;2765:65;;999:4582:84;2371:13:79;999:4582:84;;;;2671:11:79;999:4582:84;;;;;;;;;;;;;;;;2901:66:79;;999:4582:84;2901:66:79;;;999:4582:84;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;999:4582:84;;;;;;;:::i;:::-;;;;;;;;2901:66:79;;-1:-1:-1;;;;;999:4582:84;2901:66:79;;;;;;;-1:-1:-1;2901:66:79;;;2989:103:63;2900:67:79;;2896:125;;999:4582:84;;3065:3:79;-1:-1:-1;;;;;999:4582:84;;;;;:::i;:::-;;;;-1:-1:-1;2371:13:79;3142:47;;999:4582:84;;;;;;;:::i;:::-;;;2371:13:79;3089:102;;999:4582:84;3065:136:79;;;;;999:4582:84;;-1:-1:-1;;;3065:136:79;;999:4582:84;;2901:66:79;3065:136;;999:4582:84;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4582:84;;;;;;-1:-1:-1;;3065:136:79;;;;;;2989:103:63;-1:-1:-1;3061:215:79;;-1:-1:-1;;;3240:25:79;;2901:66;999:4582:84;;;;4354:21:79;3240:25;3061:215;;;;;;3361:11;2806:40:84;999:4582;;;;;;;;;2371:13:79;999:4582:84;;;2806:40;;;;;;:::i;:::-;999:4582;;;;;;;2868:12;;999:4582;;2892:16;;;2856:72;;;;;;999:4582;;;2856:72;999:4582;;;;;;;;;;;;;2856:72;;2922:4;2856:72;2901:66:79;2856:72:84;;;:::i;:::-;;;;;;;;;;;;;;3061:215:79;999:4582:84;;3426:61:79;999:4582:84;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;999:4582:84;;;3426:61:79;2407:1:63;2365;-1:-1:-1;;;;;;;;;;;2407:1:63;2989:103::o;2856:72:84:-;;;;;:::i;:::-;999:4582;;2856:72;;;;;999:4582;;;;;;;;;2856:72;999:4582;;;3065:136:79;;;;;-1:-1:-1;3065:136:79;;:::i;:::-;-1:-1:-1;3065:136:79;;;;2896:125;2810:20;;;-1:-1:-1;2990:20:79;2901:66;-1:-1:-1;2990:20:79;2901:66;;;2371:13;2901:66;;2371:13;2901:66;;;;;;2371:13;2901:66;;;:::i;:::-;;;999:4582:84;;;;;;;:::i;:::-;2901:66:79;;;;;;-1:-1:-1;2901:66:79;;999:4582:84;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;999:4582:84;;;;;;;;-1:-1:-1;;999:4582:84;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4582:84;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;-1:-1:-1;;;;;999:4582:84;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;1055:104:6;999:4582:84;1055:104:6;;999:4582:84;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;999:4582:84;;;;;;;-1:-1:-1;999:4582:84;;;;;;:::o;3545:684::-;3792:18;1038:17:77;;;999:4582:84;1038:27:77;1034:55;;1106:27;;;:::i;:::-;3764:47:84;3760:65;;3868:45;3879:15;3958:36;3879:15;;;1038:17:77;999:4582:84;;;3868:45;;;;;;:::i;:::-;999:4582;1038:17:77;999:4582:84;;;3958:36;;;;;;:::i;:::-;4012:12;;;;999:4582;4028:15;;;999:4582;-1:-1:-1;;;;;999:4582:84;;;;;4012:31;;;:96;;3545:684;4012:149;;;3545:684;4012:210;;;4005:217;;3545:684;:::o;4012:210::-;1038:17:77;4175:14:84;;;;;;999:4582;;;;;4165:25;4204:17;;;1038::77;999:4582:84;;;;4194:28;4165:57;3545:684;:::o;4012:149::-;999:4582;;;;-1:-1:-1;;;;;999:4582:84;;;;;4124:37;;-1:-1:-1;4012:149:84;;:96;4057:16;;;;;;1038:17:77;999:4582:84;;;;4047:27;4057:16;4088:19;;;1038:17:77;999:4582:84;;;;4078:30;4047:61;4012:96;;;3760:65;3813:12;;999:4582;3813:12;:::o;1034:55:77:-;1074:15;;;999:4582:84;1074:15:77;;999:4582:84;1074:15:77;1343:634:67;1465:17;-1:-1:-1;29298:17:74;-1:-1:-1;;;29298:17:74;;;29294:103;;1343:634:67;29414:17:74;29423:8;29994:7;29414:17;;;29410:103;;1343:634:67;29539:8:74;29530:17;;;29526:103;;1343:634:67;29655:7:74;29646:16;;;29642:100;;1343:634:67;29768:7:74;29759:16;;;29755:100;;1343:634:67;29881:7:74;29872:16;;;29868:100;;1343:634:67;29985:16:74;;29981:66;;1343:634:67;29994:7:74;1580:94:67;1485:1;999:4582:84;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;999:4582:84;;:::i;:::-;;;;;;;1580:94:67;;;1687:247;-1:-1:-1;;999:4582:84;;-1:-1:-1;;;1741:111:67;;;;999:4582:84;1741:111:67;999:4582:84;1902:10:67;;1898:21;;29994:7:74;1687:247:67;;;;1898:21;1914:5;;1343:634;:::o;29981:66:74:-;30031:1;999:4582:84;;;;29981:66:74;;29868:100;29881:7;29952:1;999:4582:84;;;;29868:100:74;;;29755;29768:7;29839:1;999:4582:84;;;;29755:100:74;;;29642;29655:7;29726:1;999:4582:84;;;;29642:100:74;;;29526:103;29539:8;29612:2;999:4582:84;;;;29526:103:74;;;29410;29423:8;29496:2;999:4582:84;;;;29410:103:74;;;29294;-1:-1:-1;29380:2:74;;-1:-1:-1;;;;999:4582:84;;29294:103:74;;3749:292:63;2407:1;-1:-1:-1;;;;;;;;;;;999:4582:84;4560:63:63;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:63;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:63;;-1:-1:-1;3696:30:63;999:4582:84;;;;;;;:::i;:::-;;;;-1:-1:-1;999:4582:84;;-1:-1:-1;999:4582:84;;;;-1:-1:-1;999:4582:84;;;;-1:-1:-1;999:4582:84;;;;-1:-1:-1;999:4582:84;;;;-1:-1:-1;999:4582:84;;;;-1:-1:-1;999:4582:84;;;;-1:-1:-1;999:4582:84;;;;-1:-1:-1;999:4582:84;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4582:84;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;:::i;:::-;;;;;;:::o;4540:257:79:-;;999:4582:84;;:::i;:::-;-1:-1:-1;999:4582:84;;-1:-1:-1;;;4665:23:79;;;;;999:4582:84;;;;-1:-1:-1;999:4582:84;4665:23:79;999:4582:84;4665:3:79;-1:-1:-1;;;;;999:4582:84;4665:23:79;;;;;;;-1:-1:-1;4665:23:79;;;4540:257;4651:37;;999:4582:84;4702:29:79;;;:55;;;;;4540:257;4698:92;;;;4540:257;:::o;4698:92::-;4766:24;;;-1:-1:-1;4766:24:79;4665:23;999:4582:84;4665:23:79;-1:-1:-1;4766:24:79;4702:55;4735:22;;;-1:-1:-1;4702:55:79;;;;4665:23;;;;;;;-1:-1:-1;4665:23:79;;;;;;:::i;:::-;;;;;999:4582:84;;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;;;;;999:4582:84;;;;;;;;;;;;:::o;6040:128:9:-;6109:4;-1:-1:-1;;;;;999:4582:84;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1401:235:78;1592:20;;999:4582:84;;;;;;;;;;;;;1624:4:78;1592:37;1401:235;:::o;596:321:77:-;999:4582:84;;695:28:77;691:64;;-1:-1:-1;;;;;362:25:77;;;999:4582:84;;362:30:77;;;:78;;;;596:321;765:55;;;553:25;;999:4582:84;-1:-1:-1;;;;;999:4582:84;830:58:77;;906:4;596:321;:::o;830:58::-;868:20;;;-1:-1:-1;868:20:77;;-1:-1:-1;868:20:77;765:55;803:17;;;-1:-1:-1;803:17:77;;-1:-1:-1;803:17:77;362:78;425:15;;;-1:-1:-1;396:44:77;362:78;;;691:64;732:23;;;-1:-1:-1;732:23:77;;-1:-1:-1;732:23:77;2989:103:63;999:4582:84;2989:103:63;;;:::i;:::-;2428:34:84;;999:4582;;2428:34;;;;;;;:::i;:::-;2484:12;;;999:4582;2523:16;;;;;;-1:-1:-1;;;;;999:4582:84;2472:89;;;;;;999:4582;;;2484:12;999:4582;;;;;;;;;2472:89;;2555:4;1183:10:80;;2472:89:84;;;;;:::i;:::-;;2512:9;;2472:89;;;;;;;;;2989:103:63;999:4582:84;-1:-1:-1;;;;;2484:12:84;999:4582;;;;;:::i;:::-;;;;;;;;;;;;2428:34;2141:299:78;;999:4582:84;2303:4:78;2484:12:84;2141:299:78;;999:4582:84;2141:299:78;2523:16:84;2141:299:78;;999:4582:84;2141:299:78;;;999:4582:84;2141:299:78;;;;999:4582:84;2428:34;2484:12;999:4582;;;;:::i;:::-;2095:18:78;999:4582:84;;2046:413:78;;;999:4582:84;;;2484:12;999:4582;;;;;;;;2018:455:78;;;2472:89:84;2018:455:78;;999:4582:84;;;;;;;2484:12;999:4582;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4582:84;;;;;;;;;2484:12;999:4582;;;;;;;;;2523:16;999:4582;;;;;;;2141:299:78;999:4582:84;2141:299:78;999:4582:84;;;;;;;;;;;;;:::i;:::-;;;;;;;;2018:455:78;999:4582:84;;2018:3:78;-1:-1:-1;;;;;999:4582:84;2018:455:78;;;;;;;;;;;2989:103:63;5274:26:79;;;;;;2407:1:63;2303:4:78;-1:-1:-1;;;;;;;;;;;2407:1:63;2989:103::o;2018:455:78:-;;;;;2428:34:84;2018:455:78;;2428:34:84;2018:455:78;;;;;;2428:34:84;2018:455:78;;;:::i;:::-;;;999:4582:84;;;;;;;5274:26:79;2018:455:78;;999:4582:84;;;;2018:455:78;;;-1:-1:-1;2018:455:78;;2472:89:84;;;;;999:4582;2472:89;;:::i;:::-;999:4582;2472:89;;;",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 3175,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 3218,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 3261,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 6933,
          "length": 32
        }
      ],
      "55807": [
        {
          "start": 2782,
          "length": 32
        }
      ],
      "55810": [
        {
          "start": 906,
          "length": 32
        },
        {
          "start": 1768,
          "length": 32
        },
        {
          "start": 2273,
          "length": 32
        },
        {
          "start": 4977,
          "length": 32
        },
        {
          "start": 6749,
          "length": 32
        },
        {
          "start": 7499,
          "length": 32
        }
      ],
      "55812": [
        {
          "start": 970,
          "length": 32
        },
        {
          "start": 1595,
          "length": 32
        },
        {
          "start": 2194,
          "length": 32
        },
        {
          "start": 2732,
          "length": 32
        },
        {
          "start": 3109,
          "length": 32
        },
        {
          "start": 4631,
          "length": 32
        },
        {
          "start": 5725,
          "length": 32
        },
        {
          "start": 7326,
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
    "doObligation((address,bytes,address,bytes),uint64)": "b911e52e",
    "doObligationFor((address,bytes,address,bytes),uint64,address)": "c26bee3f",
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
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidSchema\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrowRaw\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"extractArbiterAndDemand\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"title\":\"HookEscrowObligation\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"notice\":\"A generic escrow obligation that delegates lock/release/return to         an IEscrowHook contract. The hook is specified per-escrow, so         different escrow instances can use different hooks (ERC20, ERC721,         or entirely custom logic). Use HooksEscrowObligation for multi-hook         escrows.         Assets are held by the hook contracts, not by this obligation.         Hooks track deposits per-caller (msg.sender = this contract), so         no explicit authorization is required.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/HookEscrowObligation.sol\":\"HookEscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0xb600ec42b766fee45645fd148a2154d63cb964859545cf973277721db472edab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://98dd51bad2ef82faf14593c8d5cb8c2834fba287dea5c5bbb6e6107640e29e7f\",\"dweb:/ipfs/QmaCk9ghcsnzpHKVPdbuj83VC92YXGkRrV7xjHWya4r6Qo\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0x3e40df04ff74ee8bcd3c54d002d72a89c4427951a9eb15c3f5264e09ff1a77dd\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f0b8baf77418d0f7f63817f9207a4e596d947cddb9c48b28ae4a3f9a4b4f3e0e\",\"dweb:/ipfs/QmQNe2y4KWAYVhGoreS5Ke4z8joHYKxfE2iV6njeKeCmxL\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xe27fdb0826bbaf3ba2b553859e500bc065a3ce4d5ad32cfa3fdc8878b6dfcae9\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://437e871a4477e0c9b0d4300f52e45c4f3f9c72a8c30cebee983c6fa6ab570727\",\"dweb:/ipfs/QmXFx9BnkRjiMvSSRc9CqQZzR5fMjzyq2ze7fQXitBecT5\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/escrow/hook-based/HookEscrowObligation.sol\":{\"keccak256\":\"0x5e83b8e4445e6b05092620a8b2374d1d40ef49ce65c3ddbe85a69a334dce6aec\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://49e28e24e04ffdc14760c48634d4d31cab9efa772bd7eabf078b2ffc2b99cb16\",\"dweb:/ipfs/QmaAoDUDu4moMHSpH5uaBxtmonrBBCnXhK2VQJY85CsJgo\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x9937854ef875b24d7a2b961f8188bb380bfc385796a2dece839856a515eeeca0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d12dc1ef365e83189196d3d026b71ed899d8c8758dfabb33b5d9b4305898f606\",\"dweb:/ipfs/QmW8QpxkbXY9U3VVkrKx17cci5pAnWePehEfp8Zr6Ya4rM\"]}},\"version\":1}",
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
          "name": "InvalidSchema"
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
              "internalType": "struct HookEscrowObligation.ObligationData",
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
                  "name": "hook",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "hookData",
                  "type": "bytes"
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct HookEscrowObligation.ObligationData",
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
                  "name": "hook",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "hookData",
                  "type": "bytes"
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
              "internalType": "struct HookEscrowObligation.ObligationData",
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
                  "name": "hook",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "hookData",
                  "type": "bytes"
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
              "internalType": "struct HookEscrowObligation.ObligationData",
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
                  "name": "hook",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "hookData",
                  "type": "bytes"
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
        "src/obligations/escrow/hook-based/HookEscrowObligation.sol": "HookEscrowObligation"
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
      "src/obligations/escrow/hook-based/HookEscrowObligation.sol": {
        "keccak256": "0x5e83b8e4445e6b05092620a8b2374d1d40ef49ce65c3ddbe85a69a334dce6aec",
        "urls": [
          "bzz-raw://49e28e24e04ffdc14760c48634d4d31cab9efa772bd7eabf078b2ffc2b99cb16",
          "dweb:/ipfs/QmaAoDUDu4moMHSpH5uaBxtmonrBBCnXhK2VQJY85CsJgo"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/hook-based/IEscrowHook.sol": {
        "keccak256": "0x9937854ef875b24d7a2b961f8188bb380bfc385796a2dece839856a515eeeca0",
        "urls": [
          "bzz-raw://d12dc1ef365e83189196d3d026b71ed899d8c8758dfabb33b5d9b4305898f606",
          "dweb:/ipfs/QmW8QpxkbXY9U3VVkrKx17cci5pAnWePehEfp8Zr6Ya4rM"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 84
} as const;
