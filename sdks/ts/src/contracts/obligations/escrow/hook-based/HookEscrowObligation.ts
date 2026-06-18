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
    "object": "0x61016080604052346101bb57604081612547803803809161002082856101bf565b8339810103126101bb578051906001600160a01b038216908183036101bb57602001516001600160a01b03811691908281036101bb57604051916100656060846101bf565b603b83527f6164647265737320617262697465722c2062797465732064656d616e642c206160208401527f64647265737320686f6f6b2c20627974657320686f6f6b44617461000000000060408401526001608052600360a0525f60c052156101ac57836100df9460e052610120526101005230916102da565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f005560405161209190816104b6823960805181610db3015260a05181610dde015260c05181610e09015260e05181611c3301526101005181610c2a01526101205181818161038a0152818161070001528181610a050152818161143201528181611ba90152611e7f0152610140518181816103ca0152818161060b015281816109b601528181610bf801528181610d7101528181611363015281816117cb0152611d810152f35b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b038211908210176101e257604052565b634e487b7160e01b5f52604160045260245ffd5b6020818303126101bb578051906001600160401b0382116101bb5701906080828203126101bb5760405191608083016001600160401b038111848210176101e2576040528051835260208101516001600160a01b03811681036101bb576020840152604081015180151581036101bb5760408401526060810151906001600160401b0382116101bb570181601f820112156101bb578051906001600160401b0382116101e257604051926102b4601f8401601f1916602001856101bf565b828452602083830101116101bb57815f9260208093018386015e83010152606082015290565b929160405190602082018351926103246015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a198101845201826101bf565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156104355787915f9161049b575b505114610495579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f9181610461575b5061044057505f602491604051928380926351753e3760e11b82528760048301525afa80156104355783915f91610413575b5051146104115750639e6113d560e01b5f5260045260245ffd5b565b61042f91503d805f833e61042781836101bf565b8101906101f6565b5f6103f7565b6040513d5f823e3d90fd5b9192809150820361044f575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d60201161048d575b8161047d602093836101bf565b810103126101bb5751905f6103c5565b3d9150610470565b50505050565b6104af91503d805f833e61042781836101bf565b5f61035f56fe60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610e8257806354fd4d5014610d945780635bf2f20d14610d5a5780636b122fe014610bb95780637d2c2931146109875780638371ef591461092857806388e5b2d9146108da578063891d9ea8146108f957806391db0b7e146108da578063b3b902d414610542578063b911e52e146104da578063c26bee3f14610455578063c6ec507014610349578063c93844be14610258578063ce46e0461461023c578063e49617e114610221578063e60c3505146102215763e6c9714d146100f8575061000e565b3461021a57606036600319011261021a57600435906001600160401b03821161021a57610140600319833603011261021a576040519161013783610f23565b8060040135835260248101356020840152610154604482016110ad565b6040840152610165606482016110ad565b6060840152610176608482016110ad565b608084015260a481013560a084015261019160c482016110c1565b60c08401526101a260e482016110c1565b60e0840152610104810135801515810361021d576101008401526101248101356001600160401b03811161021d576101df91369101600401610fcc565b610120830152602435906001600160401b03821161021a5760206102108461020a3660048701610fcc565b906117c4565b6040519015158152f35b80fd5b8280fd5b602061021061022f36611134565b610237611c31565b611c72565b503461021a578060031936011261021a57602090604051908152f35b503461021a57602036600319011261021a576004356001600160401b0381116103455761028990369060040161106a565b6102949291926117a0565b50820191602081840312610345578035906001600160401b03821161021d57019060808284031261021a57604051916102cc83610ed9565b6102d5816110c1565b835260208101356001600160401b03811161021d57846102f6918301610fcc565b6020840152610307604082016110c1565b60408401526060810135916001600160401b03831161021a575092610330916103419401610fcc565b6060820152604051918291826110d5565b0390f35b5080fd5b503461021a57602036600319011261021a576103636117a0565b5061036c611a4a565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610448578192610424575b5060208201517f00000000000000000000000000000000000000000000000000000000000000000361041557610341610409610120840151602080825183010191016111d9565b604051918291826110d5565b635527981560e11b8152600490fd5b6104419192503d8084833e6104398183610f5a565b810190611aa8565b905f6103c2565b50604051903d90823e3d90fd5b50606036600319011261021a576004356001600160401b038111610345576080600319823603011261034557610489611097565b604435929091906001600160a01b038416840361021a5760206104d285856104bf6104cd87604051928391600401888301611725565b03601f198101835282610f5a565b611cfd565b604051908152f35b50604036600319011261021a57600435906001600160401b03821161021a576080600319833603011261021a5760206104d261052d8461053b61051b611097565b91604051938491600401878301611725565b03601f198101845283610f5a565b3391611cfd565b50606036600319011261021a576004356001600160401b0381116103455761056e90369060040161106a565b9161058661057a611097565b92604435943691610f96565b61058e611a12565b80516105a2602080840192840101826111d9565b6040810151606090910151906001600160a01b0316803b156108a3576105e79185916040518080958194631dc8160b60e01b8352606060048401526064830190610eb5565b336024830152306044830152039134905af180156108cf579084916108ba575b50507f0000000000000000000000000000000000000000000000000000000000000000946001600160401b036040519561064087610f3f565b33875216806020870152600160408701528160608701528360808701528460a0870152602060405161067181610f08565b8881528181019788526040518098819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06106f2608083015160c060e4860152610124850190610eb5565b9101516101048301520381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19586156108af578596610875575b509061079c92916040519761074c89610f23565b87895260208901526001600160401b0342166040890152606088015284608088015260a0870152602060c08701933385523060e089015260016101008901528061012089015280510101906111d9565b606060018060a01b03604083015116910151813b15610871576107e36107f59285928360405180968195829463be1e753b60e01b8452604060048501526044840190610eb5565b8281036003190160248401528c611635565b03925af1801561086657610851575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06602094519160018060a01b039051169280a360015f51602061203c5f395f51905f5255604051908152f35b61085c838092610f5a565b610345575f610804565b6040513d85823e3d90fd5b8380fd5b9095506020813d6020116108a7575b8161089160209383610f5a565b810103126108a357519461079c610738565b8480fd5b3d9150610884565b6040513d87823e3d90fd5b816108c491610f5a565b61021d57825f610607565b6040513d86823e3d90fd5b60206102106108e83661101a565b926108f4929192611c31565b61129a565b503461021a5761034161091461090e36610e9f565b9061133e565b604051918291602083526020830190610eb5565b503461021a57602036600319011261021a57600435906001600160401b03821161021a5761096161095c3660048501610fcc565b611271565b604080516001600160a01b03909316835260208301819052829161034191830190610eb5565b5034610b97576020366003190112610b9757600435906109a5611a12565b6109ae82611b83565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610baa57606084016001600160401b0381511615610b9b57516001600160401b03164210610b9b576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610a3781610f08565b8381525f602082015260405192610a4d84610f08565b83526020830152803b15610b9757604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610b82575b50610ab15763614cf93960e01b825260045260249150fd5b50908160018060a01b0360c08301511691610ada610120820151602080825183010191016111d9565b606060018060a01b03604083015116910151813b156108715783610b2091610b376040519788968795869463561ca52560e01b8652606060048701526064860190610eb5565b916024850152600319848303016044850152611635565b03925af18015610b7757610b62575b60015f51602061203c5f395f51905f5255602060405160018152f35b610b6d828092610f5a565b61021a5780610b46565b6040513d84823e3d90fd5b610b8f9193505f90610f5a565b5f915f610a99565b5f80fd5b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b34610b97575f366003190112610b9757606080604051610bd881610ed9565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610d4f575f90610c9f575b606090610341604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610eb5565b503d805f833e610caf8183610f5a565b810190602081830312610b97578051906001600160401b038211610b975701608081830312610b975760405190610ce582610ed9565b8051825260208101516001600160a01b0381168103610b97576020830152610d0f60408201611168565b60408301526060810151906001600160401b038211610b97570182601f82011215610b9757606092816020610d4693519101611175565b82820152610c59565b6040513d5f823e3d90fd5b34610b97575f366003190112610b975760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610b97575f366003190112610b975761034160206109146001610dd77f00000000000000000000000000000000000000000000000000000000000000006118a5565b8184610e027f00000000000000000000000000000000000000000000000000000000000000006118a5565b8180610e2d7f00000000000000000000000000000000000000000000000000000000000000006118a5565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610f5a565b34610b9757610e9361090e36610e9f565b50602060405160018152f35b6040906003190112610b97576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610ef457604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610ef457604052565b61014081019081106001600160401b03821117610ef457604052565b60c081019081106001600160401b03821117610ef457604052565b90601f801991011681019081106001600160401b03821117610ef457604052565b6001600160401b038111610ef457601f01601f191660200190565b929192610fa282610f7b565b91610fb06040519384610f5a565b829481845281830111610b97578281602093845f960137010152565b9080601f83011215610b9757816020610fe793359101610f96565b90565b9181601f84011215610b97578235916001600160401b038311610b97576020808501948460051b010111610b9757565b6040600319820112610b97576004356001600160401b038111610b97578161104491600401610fea565b92909291602435906001600160401b038211610b975761106691600401610fea565b9091565b9181601f84011215610b97578235916001600160401b038311610b975760208381860195010111610b9757565b602435906001600160401b0382168203610b9757565b35906001600160401b0382168203610b9757565b35906001600160a01b0382168203610b9757565b602080825282516001600160a01b03168183015282015160806040830152610fe792919060609061110a9060a0840190610eb5565b60408401516001600160a01b031683830152920151818303601f1901608090920191909152610eb5565b6020600319820112610b9757600435906001600160401b038211610b9757610140908290036003190112610b975760040190565b51908115158203610b9757565b92919261118182610f7b565b9161118f6040519384610f5a565b829481845281830111610b97578281602093845f96015e010152565b51906001600160a01b0382168203610b9757565b9080601f83011215610b97578151610fe792602001611175565b602081830312610b97578051906001600160401b038211610b975701608081830312610b97576040519161120c83610ed9565b611215826111ab565b835260208201516001600160401b038111610b9757816112369184016111bf565b6020840152611247604083016111ab565b604084015260608201516001600160401b038111610b975761126992016111bf565b606082015290565b61128490602080825183010191016111d9565b80516020909101516001600160a01b0390911691565b92909281840361132f575f91345b858410156113245781841015611310578360051b80860135908282116113015784013561013e1985360301811215610b97576112e5908501611c72565b156112f657600191039301926112a8565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b611346611a12565b5f9161135182611b83565b9061135b81611b83565b6020830151907f0000000000000000000000000000000000000000000000000000000000000000809203610baa5761139284611c8b565b15610baa576101208401916113a78351611271565b9060a08401518751036115ec576113bd84611c8b565b156115ec5761140460209188519360405180958194829363e6c9714d60e01b8452606060048501526113f2606485018c611635565b84810360031901602486015290610eb5565b604483019190915203916001600160a01b03165afa908115610d4f575f916115fb575b50156115ec576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061146481610f08565b8781525f60208201526040519261147a84610f08565b83526020830152803b15610b9757604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816115d7575b506114df5763614cf93960e01b86526004859052602486fd5b60c0909594929395019461150760018060a01b038751169251602080825183010191016111d9565b606060018060a01b03604083015116910151813b156115d35790610b208780949361155060405197889687958694630fa37a1f60e01b8652608060048701526084860190610eb5565b89606483015203925af180156108cf579084916115be575b50507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c06040519461159a602087610f5a565b848652516001600160a01b03169380a49060015f51602061203c5f395f51905f5255565b816115c891610f5a565b61021d57825f611568565b8680fd5b6115e49197505f90610f5a565b5f955f6114c6565b630ebe58ef60e11b5f5260045ffd5b90506020813d60201161162d575b8161161660209383610f5a565b81010312610b975761162790611168565b5f611427565b3d9150611609565b90610140610120610fe79380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610eb5565b9035601e1982360301811215610b975701602081359101916001600160401b038211610b97578136038313610b9757565b908060209392818452848401375f828201840152601f01601f1916010190565b60208152610fe791906001600160a01b0361173f836110c1565b16602082015261178e61176961175860208501856116d4565b6080604086015260a0850191611705565b926001600160a01b0361177e604083016110c1565b16606084015260608101906116d4565b916080601f1982860301910152611705565b604051906117ad82610ed9565b606080835f81528160208201525f60408201520152565b60208101517f00000000000000000000000000000000000000000000000000000000000000000361189f5761180a61012061181a920151602080825183010191016111d9565b91602080825183010191016111d9565b604082810151908201516001600160a01b03908116911614918261187e575b82611865575b8261184957505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061183f565b91506060820151602081519101206060820151602081519101201491611839565b50505f90565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156119ef575b806d04ee2d6d415b85acef8100000000600a9210156119d4575b662386f26fc100008110156119c0575b6305f5e1008110156119af575b6127108110156119a0575b6064811015611992575b1015611987575b600a6021600184019361192c85610f7b565b9461193a6040519687610f5a565b808652611949601f1991610f7b565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561198257600a9091611954565b505090565b60019091019061191a565b606460029104930192611913565b61271060049104930192611909565b6305f5e100600891049301926118fe565b662386f26fc10000601091049301926118f1565b6d04ee2d6d415b85acef8100000000602091049301926118e1565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046118c7565b60025f51602061203c5f395f51905f525414611a3b5760025f51602061203c5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611a5782610f23565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610b9757565b602081830312610b97578051906001600160401b038211610b97570161014081830312610b975760405191611adc83610f23565b8151835260208201516020840152611af660408301611a94565b6040840152611b0760608301611a94565b6060840152611b1860808301611a94565b608084015260a082015160a0840152611b3360c083016111ab565b60c0840152611b4460e083016111ab565b60e0840152611b566101008301611168565b6101008401526101208201516001600160401b038111610b9757611b7a92016111bf565b61012082015290565b90611b8c611a4a565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610d4f575f93611c15575b508251818115918215611c0a575b5050611bf85750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611bef565b611c2a9193503d805f833e6104398183610f5a565b915f611be1565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611c6357565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b038116809103610b9757301490565b805115611cee576001600160401b036060820151168015159081611ce3575b50611cd457608001516001600160401b0316611cc557600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611caa565b635c2c7f8960e01b5f5260045ffd5b905f91611d08611a12565b8051611d1c602080840192840101826111d9565b6040810151606090910151906001600160a01b0316803b15610b9757611d61915f916040518080958194631dc8160b60e01b8352606060048401526064830190610eb5565b336024830152306044830152039134905af18015610d4f57612026575b507f0000000000000000000000000000000000000000000000000000000000000000916001600160401b0360405196611db688610f3f565b60018060a01b03169485885216806020880152600160408801528560608801528160808801528560a08801526020604051611df081610f08565b8581528181019889526040518099819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611e71608083015160c060e4860152610124850190610eb5565b9101516101048301520381897f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af196871561201b578697611fe1575b50611f1a929160209160405195611ecd87610f23565b898752838701526001600160401b034216604087015260608601528660808601528660a086015260c085019586523060e086015260016101008601528061012086015280510101906111d9565b606060018060a01b03604083015116910151813b156108a357611f61611f739286928360405180968195829463be1e753b60e01b8452604060048501526044840190610eb5565b82810360031901602484015289611635565b03925af180156108cf57908491611fcc575b50505190516001600160a01b0316917f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d069080a39060015f51602061203c5f395f51905f5255565b81611fd691610f5a565b61021d57825f611f85565b9096506020813d602011612013575b81611ffd60209383610f5a565b8101031261200f575195611f1a611eb7565b8580fd5b3d9150611ff0565b6040513d88823e3d90fd5b6120339194505f90610f5a565b5f925f611d7e56fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220f68ff2c742d92c8b735bdb043ed7e0764cc7c095a7736d2117fe07839e561adc64736f6c634300081b0033",
    "sourceMap": "999:4797:120:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;1670:4;759:14:6;;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;790:10;1016:81:82;790:10:9;;;933::82;;953:32;;1079:4;1016:81;;:::i;:::-;995:102;;1670:4:120;1505:66:66;2365:1;999:4797:120;;;;;;;;759:14:6;999:4797:120;;;;;783:14:6;999:4797:120;;;;;807:14:6;999:4797:120;;;;;790:10:9;999:4797:120;;;;;953:32:82;999:4797:120;;;;;933:10:82;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;995:102:82;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;999:4797:120;-1:-1:-1;999:4797:120;;;;;;;-1:-1:-1;;999:4797:120;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;999:4797:120;;;;;-1:-1:-1;999:4797:120;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;999:4797:120;;;;;;;;;;;;;;;;;;:::o;289:755:87:-;;;999:4797:120;;1189:45:87;;;;999:4797:120;;;1189:45:87;999:4797:120;1189:45:87;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:87;;;;;;;;;;;:::i;:::-;999:4797:120;1179:56:87;;999:4797:120;;-1:-1:-1;;;572:29:87;;;;;999:4797:120;;;1179:56:87;;-1:-1:-1;;;;;999:4797:120;;;-1:-1:-1;999:4797:120;572:29:87;999:4797:120;;572:29:87;;;;;;;;-1:-1:-1;572:29:87;;;289:755;999:4797:120;;615:19:87;611:35;;999:4797:120;;1189:45:87;999:4797:120;;;;;;;;;;;661:52:87;;999:4797:120;572:29:87;661:52;;999:4797:120;;;;;;;;;;;;;-1:-1:-1;999:4797:120;;;;;;;;;;;;572:29:87;999:4797:120;;;1670:4;999:4797;;;;;;;;;;;;661:52:87;;;-1:-1:-1;661:52:87;;;-1:-1:-1;;661:52:87;;;289:755;-1:-1:-1;657:381:87;;999:4797:120;-1:-1:-1;572:29:87;999:4797:120;;;;;;;;;;899:29:87;;;572;899;;999:4797:120;899:29:87;;;;;;;;-1:-1:-1;899:29:87;;;657:381;999:4797:120;;946:19:87;942:35;;793:29;;;;-1:-1:-1;998:29:87;572;999:4797:120;572:29:87;-1:-1:-1;998:29:87;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:87;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;999:4797:120;;;-1:-1:-1;999:4797:120;;;;;657:381:87;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:87;572;999:4797:120;572:29:87;-1:-1:-1;793:29:87;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;999:4797:120;;;;;661:52:87;;;;;;;-1:-1:-1;661:52:87;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:87;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610e8257806354fd4d5014610d945780635bf2f20d14610d5a5780636b122fe014610bb95780637d2c2931146109875780638371ef591461092857806388e5b2d9146108da578063891d9ea8146108f957806391db0b7e146108da578063b3b902d414610542578063b911e52e146104da578063c26bee3f14610455578063c6ec507014610349578063c93844be14610258578063ce46e0461461023c578063e49617e114610221578063e60c3505146102215763e6c9714d146100f8575061000e565b3461021a57606036600319011261021a57600435906001600160401b03821161021a57610140600319833603011261021a576040519161013783610f23565b8060040135835260248101356020840152610154604482016110ad565b6040840152610165606482016110ad565b6060840152610176608482016110ad565b608084015260a481013560a084015261019160c482016110c1565b60c08401526101a260e482016110c1565b60e0840152610104810135801515810361021d576101008401526101248101356001600160401b03811161021d576101df91369101600401610fcc565b610120830152602435906001600160401b03821161021a5760206102108461020a3660048701610fcc565b906117c4565b6040519015158152f35b80fd5b8280fd5b602061021061022f36611134565b610237611c31565b611c72565b503461021a578060031936011261021a57602090604051908152f35b503461021a57602036600319011261021a576004356001600160401b0381116103455761028990369060040161106a565b6102949291926117a0565b50820191602081840312610345578035906001600160401b03821161021d57019060808284031261021a57604051916102cc83610ed9565b6102d5816110c1565b835260208101356001600160401b03811161021d57846102f6918301610fcc565b6020840152610307604082016110c1565b60408401526060810135916001600160401b03831161021a575092610330916103419401610fcc565b6060820152604051918291826110d5565b0390f35b5080fd5b503461021a57602036600319011261021a576103636117a0565b5061036c611a4a565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610448578192610424575b5060208201517f00000000000000000000000000000000000000000000000000000000000000000361041557610341610409610120840151602080825183010191016111d9565b604051918291826110d5565b635527981560e11b8152600490fd5b6104419192503d8084833e6104398183610f5a565b810190611aa8565b905f6103c2565b50604051903d90823e3d90fd5b50606036600319011261021a576004356001600160401b038111610345576080600319823603011261034557610489611097565b604435929091906001600160a01b038416840361021a5760206104d285856104bf6104cd87604051928391600401888301611725565b03601f198101835282610f5a565b611cfd565b604051908152f35b50604036600319011261021a57600435906001600160401b03821161021a576080600319833603011261021a5760206104d261052d8461053b61051b611097565b91604051938491600401878301611725565b03601f198101845283610f5a565b3391611cfd565b50606036600319011261021a576004356001600160401b0381116103455761056e90369060040161106a565b9161058661057a611097565b92604435943691610f96565b61058e611a12565b80516105a2602080840192840101826111d9565b6040810151606090910151906001600160a01b0316803b156108a3576105e79185916040518080958194631dc8160b60e01b8352606060048401526064830190610eb5565b336024830152306044830152039134905af180156108cf579084916108ba575b50507f0000000000000000000000000000000000000000000000000000000000000000946001600160401b036040519561064087610f3f565b33875216806020870152600160408701528160608701528360808701528460a0870152602060405161067181610f08565b8881528181019788526040518098819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06106f2608083015160c060e4860152610124850190610eb5565b9101516101048301520381887f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19586156108af578596610875575b509061079c92916040519761074c89610f23565b87895260208901526001600160401b0342166040890152606088015284608088015260a0870152602060c08701933385523060e089015260016101008901528061012089015280510101906111d9565b606060018060a01b03604083015116910151813b15610871576107e36107f59285928360405180968195829463be1e753b60e01b8452604060048501526044840190610eb5565b8281036003190160248401528c611635565b03925af1801561086657610851575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06602094519160018060a01b039051169280a360015f51602061203c5f395f51905f5255604051908152f35b61085c838092610f5a565b610345575f610804565b6040513d85823e3d90fd5b8380fd5b9095506020813d6020116108a7575b8161089160209383610f5a565b810103126108a357519461079c610738565b8480fd5b3d9150610884565b6040513d87823e3d90fd5b816108c491610f5a565b61021d57825f610607565b6040513d86823e3d90fd5b60206102106108e83661101a565b926108f4929192611c31565b61129a565b503461021a5761034161091461090e36610e9f565b9061133e565b604051918291602083526020830190610eb5565b503461021a57602036600319011261021a57600435906001600160401b03821161021a5761096161095c3660048501610fcc565b611271565b604080516001600160a01b03909316835260208301819052829161034191830190610eb5565b5034610b97576020366003190112610b9757600435906109a5611a12565b6109ae82611b83565b9160208301517f0000000000000000000000000000000000000000000000000000000000000000809103610baa57606084016001600160401b0381511615610b9b57516001600160401b03164210610b9b576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690610a3781610f08565b8381525f602082015260405192610a4d84610f08565b83526020830152803b15610b9757604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af19081610b82575b50610ab15763614cf93960e01b825260045260249150fd5b50908160018060a01b0360c08301511691610ada610120820151602080825183010191016111d9565b606060018060a01b03604083015116910151813b156108715783610b2091610b376040519788968795869463561ca52560e01b8652606060048701526064860190610eb5565b916024850152600319848303016044850152611635565b03925af18015610b7757610b62575b60015f51602061203c5f395f51905f5255602060405160018152f35b610b6d828092610f5a565b61021a5780610b46565b6040513d84823e3d90fd5b610b8f9193505f90610f5a565b5f915f610a99565b5f80fd5b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b34610b97575f366003190112610b9757606080604051610bd881610ed9565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610d4f575f90610c9f575b606090610341604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610eb5565b503d805f833e610caf8183610f5a565b810190602081830312610b97578051906001600160401b038211610b975701608081830312610b975760405190610ce582610ed9565b8051825260208101516001600160a01b0381168103610b97576020830152610d0f60408201611168565b60408301526060810151906001600160401b038211610b97570182601f82011215610b9757606092816020610d4693519101611175565b82820152610c59565b6040513d5f823e3d90fd5b34610b97575f366003190112610b975760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b34610b97575f366003190112610b975761034160206109146001610dd77f00000000000000000000000000000000000000000000000000000000000000006118a5565b8184610e027f00000000000000000000000000000000000000000000000000000000000000006118a5565b8180610e2d7f00000000000000000000000000000000000000000000000000000000000000006118a5565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610f5a565b34610b9757610e9361090e36610e9f565b50602060405160018152f35b6040906003190112610b97576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610ef457604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610ef457604052565b61014081019081106001600160401b03821117610ef457604052565b60c081019081106001600160401b03821117610ef457604052565b90601f801991011681019081106001600160401b03821117610ef457604052565b6001600160401b038111610ef457601f01601f191660200190565b929192610fa282610f7b565b91610fb06040519384610f5a565b829481845281830111610b97578281602093845f960137010152565b9080601f83011215610b9757816020610fe793359101610f96565b90565b9181601f84011215610b97578235916001600160401b038311610b97576020808501948460051b010111610b9757565b6040600319820112610b97576004356001600160401b038111610b97578161104491600401610fea565b92909291602435906001600160401b038211610b975761106691600401610fea565b9091565b9181601f84011215610b97578235916001600160401b038311610b975760208381860195010111610b9757565b602435906001600160401b0382168203610b9757565b35906001600160401b0382168203610b9757565b35906001600160a01b0382168203610b9757565b602080825282516001600160a01b03168183015282015160806040830152610fe792919060609061110a9060a0840190610eb5565b60408401516001600160a01b031683830152920151818303601f1901608090920191909152610eb5565b6020600319820112610b9757600435906001600160401b038211610b9757610140908290036003190112610b975760040190565b51908115158203610b9757565b92919261118182610f7b565b9161118f6040519384610f5a565b829481845281830111610b97578281602093845f96015e010152565b51906001600160a01b0382168203610b9757565b9080601f83011215610b97578151610fe792602001611175565b602081830312610b97578051906001600160401b038211610b975701608081830312610b97576040519161120c83610ed9565b611215826111ab565b835260208201516001600160401b038111610b9757816112369184016111bf565b6020840152611247604083016111ab565b604084015260608201516001600160401b038111610b975761126992016111bf565b606082015290565b61128490602080825183010191016111d9565b80516020909101516001600160a01b0390911691565b92909281840361132f575f91345b858410156113245781841015611310578360051b80860135908282116113015784013561013e1985360301811215610b97576112e5908501611c72565b156112f657600191039301926112a8565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b611346611a12565b5f9161135182611b83565b9061135b81611b83565b6020830151907f0000000000000000000000000000000000000000000000000000000000000000809203610baa5761139284611c8b565b15610baa576101208401916113a78351611271565b9060a08401518751036115ec576113bd84611c8b565b156115ec5761140460209188519360405180958194829363e6c9714d60e01b8452606060048501526113f2606485018c611635565b84810360031901602486015290610eb5565b604483019190915203916001600160a01b03165afa908115610d4f575f916115fb575b50156115ec576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169061146481610f08565b8781525f60208201526040519261147a84610f08565b83526020830152803b15610b9757604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af190816115d7575b506114df5763614cf93960e01b86526004859052602486fd5b60c0909594929395019461150760018060a01b038751169251602080825183010191016111d9565b606060018060a01b03604083015116910151813b156115d35790610b208780949361155060405197889687958694630fa37a1f60e01b8652608060048701526084860190610eb5565b89606483015203925af180156108cf579084916115be575b50507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c06040519461159a602087610f5a565b848652516001600160a01b03169380a49060015f51602061203c5f395f51905f5255565b816115c891610f5a565b61021d57825f611568565b8680fd5b6115e49197505f90610f5a565b5f955f6114c6565b630ebe58ef60e11b5f5260045ffd5b90506020813d60201161162d575b8161161660209383610f5a565b81010312610b975761162790611168565b5f611427565b3d9150611609565b90610140610120610fe79380518452602081015160208501526001600160401b0360408201511660408501526001600160401b0360608201511660608501526001600160401b03608082015116608085015260a081015160a085015260018060a01b0360c08201511660c085015260018060a01b0360e08201511660e08501526101008101511515610100850152015191816101208201520190610eb5565b9035601e1982360301811215610b975701602081359101916001600160401b038211610b97578136038313610b9757565b908060209392818452848401375f828201840152601f01601f1916010190565b60208152610fe791906001600160a01b0361173f836110c1565b16602082015261178e61176961175860208501856116d4565b6080604086015260a0850191611705565b926001600160a01b0361177e604083016110c1565b16606084015260608101906116d4565b916080601f1982860301910152611705565b604051906117ad82610ed9565b606080835f81528160208201525f60408201520152565b60208101517f00000000000000000000000000000000000000000000000000000000000000000361189f5761180a61012061181a920151602080825183010191016111d9565b91602080825183010191016111d9565b604082810151908201516001600160a01b03908116911614918261187e575b82611865575b8261184957505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061183f565b91506060820151602081519101206060820151602081519101201491611839565b50505f90565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156119ef575b806d04ee2d6d415b85acef8100000000600a9210156119d4575b662386f26fc100008110156119c0575b6305f5e1008110156119af575b6127108110156119a0575b6064811015611992575b1015611987575b600a6021600184019361192c85610f7b565b9461193a6040519687610f5a565b808652611949601f1991610f7b565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561198257600a9091611954565b505090565b60019091019061191a565b606460029104930192611913565b61271060049104930192611909565b6305f5e100600891049301926118fe565b662386f26fc10000601091049301926118f1565b6d04ee2d6d415b85acef8100000000602091049301926118e1565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046118c7565b60025f51602061203c5f395f51905f525414611a3b5760025f51602061203c5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b60405190611a5782610f23565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b0382168203610b9757565b602081830312610b97578051906001600160401b038211610b97570161014081830312610b975760405191611adc83610f23565b8151835260208201516020840152611af660408301611a94565b6040840152611b0760608301611a94565b6060840152611b1860808301611a94565b608084015260a082015160a0840152611b3360c083016111ab565b60c0840152611b4460e083016111ab565b60e0840152611b566101008301611168565b6101008401526101208201516001600160401b038111610b9757611b7a92016111bf565b61012082015290565b90611b8c611a4a565b506040516328c44a9960e21b815260048101839052915f836024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa928315610d4f575f93611c15575b508251818115918215611c0a575b5050611bf85750565b6301fb6dd160e01b5f5260045260245ffd5b14159050815f611bef565b611c2a9193503d805f833e6104398183610f5a565b915f611be1565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611c6357565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b038116809103610b9757301490565b805115611cee576001600160401b036060820151168015159081611ce3575b50611cd457608001516001600160401b0316611cc557600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611caa565b635c2c7f8960e01b5f5260045ffd5b905f91611d08611a12565b8051611d1c602080840192840101826111d9565b6040810151606090910151906001600160a01b0316803b15610b9757611d61915f916040518080958194631dc8160b60e01b8352606060048401526064830190610eb5565b336024830152306044830152039134905af18015610d4f57612026575b507f0000000000000000000000000000000000000000000000000000000000000000916001600160401b0360405196611db688610f3f565b60018060a01b03169485885216806020880152600160408801528560608801528160808801528560a08801526020604051611df081610f08565b8581528181019889526040518099819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611e71608083015160c060e4860152610124850190610eb5565b9101516101048301520381897f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af196871561201b578697611fe1575b50611f1a929160209160405195611ecd87610f23565b898752838701526001600160401b034216604087015260608601528660808601528660a086015260c085019586523060e086015260016101008601528061012086015280510101906111d9565b606060018060a01b03604083015116910151813b156108a357611f61611f739286928360405180968195829463be1e753b60e01b8452604060048501526044840190610eb5565b82810360031901602484015289611635565b03925af180156108cf57908491611fcc575b50505190516001600160a01b0316917f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d069080a39060015f51602061203c5f395f51905f5255565b81611fd691610f5a565b61021d57825f611f85565b9096506020813d602011612013575b81611ffd60209383610f5a565b8101031261200f575195611f1a611eb7565b8580fd5b3d9150611ff0565b6040513d88823e3d90fd5b6120339194505f90610f5a565b5f925f611d7e56fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220f68ff2c742d92c8b735bdb043ed7e0764cc7c095a7736d2117fe07839e561adc64736f6c634300081b0033",
    "sourceMap": "999:4797:120:-:0;;;;;;;;;-1:-1:-1;999:4797:120;;;;;;;;1183:12:9;;;1054:5;1183:12;999:4797:120;1054:5:9;1183:12;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;3045:39:9;999:4797:120;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;999:4797:120:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;5753:34;;999:4797;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;999:4797:120;;-1:-1:-1;;;2549:23:82;;999:4797:120;;;2549:23:82;;;999:4797:120;;;;2549:23:82;999:4797:120;2549:3:82;-1:-1:-1;;;;;999:4797:120;2549:23:82;;;;;;;;;;;999:4797:120;2586:19:82;999:4797:120;2586:19:82;;999:4797:120;2609:18:82;2586:41;2582:100;;999:4797:120;5582:46;5593:16;;;;999:4797;;;;5582:46;;;;;;:::i;:::-;999:4797;;;;;;;:::i;2582:100:82:-;-1:-1:-1;;;2650:21:82;;999:4797:120;;2650:21:82;2549:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;999:4797:120;;;;;;;;;;;;-1:-1:-1;999:4797:120;;-1:-1:-1;;999:4797:120;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;1055:12:85;999:4797:120;;5184:16;;999:4797;;;;;;;;5184:16;;;;:::i;:::-;;1055:104:6;;5184:16:120;;;;;;:::i;:::-;1055:12:85;:::i;:::-;999:4797:120;;;;;;;-1:-1:-1;999:4797:120;;-1:-1:-1;;999:4797:120;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;1055:12:85;4917:16:120;999:4797;4917:16;999:4797;;:::i;:::-;;;;;;;;;4917:16;;;;:::i;:::-;;1055:104:6;;4917:16:120;;;;;;:::i;:::-;4951:10;1055:12:85;;:::i;999:4797:120:-;-1:-1:-1;999:4797:120;;-1:-1:-1;;999:4797:120;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;;;:::i;:::-;2989:103:66;;:::i;:::-;999:4797:120;;2428:34;999:4797;2428:34;;;;;;;;;:::i;:::-;999:4797;2484:12;;999:4797;;2523:16;;;;;-1:-1:-1;;;;;999:4797:120;2472:89;;;;;999:4797;;;;;;;;;;;;;;2472:89;;999:4797;;2472:89;;999:4797;;;;;;:::i;:::-;846:10:85;999:4797:120;;;;2555:4;999:4797;;;;2472:89;2512:9;;2472:89;;;;;;;;;;;;999:4797;2079:18:82;;;999:4797:120;-1:-1:-1;;;;;999:4797:120;;;;;;:::i;:::-;846:10:85;999:4797:120;;;2121:271:82;999:4797:120;2121:271:82;;999:4797:120;2271:4:82;999:4797:120;2121:271:82;;999:4797:120;2121:271:82;999:4797:120;2121:271:82;;999:4797:120;2121:271:82;;;;999:4797:120;2121:271:82;;;;999:4797:120;;;;;;;:::i;:::-;;;;2034:373:82;;;999:4797:120;;;;;;;;;;;;2010:407:82;;;999:4797:120;2010:407:82;;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;2121:271:82;999:4797:120;2121:271:82;999:4797:120;;;;;;;;;;;;;:::i;:::-;;;;;;;;2010:407:82;999:4797:120;;2010:3:82;-1:-1:-1;;;;;999:4797:120;2010:407:82;;;;;;;;;;;999:4797:120;;;2689:41;999:4797;;;;;;;;:::i;:::-;;;;;1226:400:85;;999:4797:120;-1:-1:-1;;;;;1340:15:85;999:4797:120;;1226:400:85;;999:4797:120;;1226:400:85;;999:4797:120;1226:400:85;2121:271:82;1226:400:85;;999:4797:120;2121:271:82;1226:400:85;;999:4797:120;;;1226:400:85;;846:10;;999:4797:120;;2555:4;999:4797;1226:400:85;;999:4797:120;2271:4:82;1226:400:85;;;999:4797:120;1226:400:85;;;;999:4797:120;;;2689:41;;;;:::i;:::-;999:4797;;;;;;;2752:12;;999:4797;;2775:16;;;2740:60;;;;;999:4797;;;;;;;;;;;;;;;;;2740:60;;999:4797;;2740:60;;999:4797;;;;;;:::i;:::-;;;;-1:-1:-1;;999:4797:120;;;;;;;:::i;:::-;2740:60;;;;;;;;;;999:4797;;5441:50:83;999:4797:120;;;;;;;;;;;;5441:50:83;;;2271:4:82;-1:-1:-1;;;;;;;;;;;2407:1:66;999:4797:120;;;;;;2740:60;;;;;;:::i;:::-;999:4797;;2740:60;;;;999:4797;;;;;;;;;2740:60;999:4797;;;2010:407:82;;;;999:4797:120;2010:407:82;;999:4797:120;2010:407:82;;;;;;999:4797:120;2010:407:82;;;:::i;:::-;;;999:4797:120;;;;;;2689:41;2010:407:82;;999:4797:120;;;;2010:407:82;;;-1:-1:-1;2010:407:82;;;999:4797:120;;;;;;;;;2472:89;;;;;:::i;:::-;999:4797;;2472:89;;;;;999:4797;;;;;;;;;;;1442:1461:9;999:4797:120;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;999:4797:120:-;;;;;;2324:12:83;999:4797:120;;;:::i;:::-;2324:12:83;;:::i;:::-;999:4797:120;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;999:4797:120;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;999:4797:120;;;;;;2989:103:66;;;:::i;:::-;3893:28:83;;;:::i;:::-;3988:18;999:4797:120;3988:18:83;;999:4797:120;4010:18:83;3988:40;;;3984:104;;4197:26;;;-1:-1:-1;;;;;999:4797:120;;;4197:31:83;4193:62;;999:4797:120;-1:-1:-1;;;;;999:4797:120;4270:15:83;:44;4266:100;;999:4797:120;;4430:3:83;-1:-1:-1;;;;;999:4797:120;;;;;:::i;:::-;;;;;;4507:43:83;;999:4797:120;;;;;;;:::i;:::-;;;;4454:98:83;;999:4797:120;4430:132:83;;;;;999:4797:120;;-1:-1:-1;;;4430:132:83;;999:4797:120;;;4430:132:83;;999:4797:120;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;-1:-1:-1;;4430:132:83;;;;;;999:4797:120;-1:-1:-1;4426:207:83;;-1:-1:-1;;;4601:21:83;;999:4797:120;;;;-1:-1:-1;4601:21:83;4426:207;;;999:4797:120;;;;;;4725:21:83;;;999:4797:120;;3308:11;3297:41;3308:11;;;;999:4797;;;;3297:41;;;;;;:::i;:::-;4197:26:83;999:4797:120;;;;;;3360:12;;999:4797;;3383:16;;;3348:64;;;;;999:4797;;;;;;;;;;;;;;;;3348:64;;4197:26:83;999:4797:120;3348:64;;999:4797;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;:::i;:::-;3348:64;;;;;;;;;;4426:207:83;999:4797:120;-1:-1:-1;;;;;;;;;;;2407:1:66;999:4797:120;;;;;;;3348:64;;;;;;:::i;:::-;999:4797;;3348:64;;;;999:4797;;;;;;;;;4430:132:83;;;;;999:4797:120;4430:132:83;;:::i;:::-;999:4797:120;4430:132:83;;;;;999:4797:120;;;4266:100:83;4237:18;;;999:4797:120;4337:18:83;999:4797:120;;4337:18:83;3984:104;4051:26;;;999:4797:120;4051:26:83;999:4797:120;;4051:26:83;999:4797:120;;;;;;-1:-1:-1;;999:4797:120;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1746:44:82;;1771:18;999:4797:120;1746:44:82;;999:4797:120;;;1746:44:82;999:4797:120;;;;;;1746:14:82;999:4797:120;1746:44:82;;;;;;999:4797:120;1746:44:82;;;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1746:44:82:-;;;;999:4797:120;1746:44:82;;;;;;:::i;:::-;;;999:4797:120;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1746:44:82;;;999:4797:120;;;;;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;;724:43:82;999:4797:120;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;1055:104:6;;999:4797:120;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;999:4797:120;;;;;;;;;;;;1055:104:6;;;999:4797:120;;;;-1:-1:-1;;;999:4797:120;;;;;;;;;;;;;;;;;-1:-1:-1;;;999:4797:120;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;999:4797:120:-;;;;2324:12:83;999:4797:120;;;:::i;2324:12:83:-;;999:4797:120;;;5401:4;999:4797;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;999:4797:120;;;;;;;;-1:-1:-1;;999:4797:120;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;:::o;:::-;;;;-1:-1:-1;999:4797:120;;;;;-1:-1:-1;999:4797:120;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;:::o;:::-;;;1055:104:6;;999:4797:120;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;:::o;:::-;-1:-1:-1;;;;;999:4797:120;;;;;;-1:-1:-1;;999:4797:120;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;999:4797:120;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;999:4797:120;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;999:4797:120;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4797:120;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4797:120;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;;;;;:::i;:::-;;-1:-1:-1;;999:4797:120;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;999:4797:120;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4797:120;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;:::i;:::-;;;;;;:::o;2019:289::-;2217:34;2019:289;2217:34;999:4797;;;2217:34;;;;;;:::i;:::-;999:4797;;2217:34;2286:14;;;;-1:-1:-1;;;;;999:4797:120;;;;2019:289::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;999:4797:120;;;;;;;;;;;;;4064:22:9;;;;4060:87;;999:4797:120;;;;;;;;;;;;;;4274:33:9;999:4797:120;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;999:4797:120;;3896:19:9;999:4797:120;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;999:4797:120;;;;3881:1:9;999:4797:120;;;;;3881:1:9;999:4797:120;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2989:103:66;;;:::i;:::-;-1:-1:-1;2380:32:83;;;;:::i;:::-;2455:37;;;;:::i;:::-;2554:13;;;999:4797:120;2571:18:83;;2554:35;;;2550:99;;2664:24;;;:::i;:::-;2663:25;2659:64;;2854:11;;;;2830:36;2854:11;;2830:36;:::i;:::-;2947:18;;;;999:4797:120;;;2947:32:83;2943:65;;3024:29;;;:::i;:::-;3023:30;3019:63;;999:4797:120;2554:13:83;999:4797:120;;;;;;;;;;;;;;;3153:66:83;;999:4797:120;3153:66:83;;;999:4797:120;;;;;;;:::i;:::-;;;;-1:-1:-1;;999:4797:120;;;;;;;:::i;:::-;;;;;;;;3153:66:83;;-1:-1:-1;;;;;999:4797:120;3153:66:83;;;;;;;-1:-1:-1;3153:66:83;;;2989:103:66;3152:67:83;;3148:125;;999:4797:120;;3317:3:83;-1:-1:-1;;;;;999:4797:120;;;;;:::i;:::-;;;;-1:-1:-1;2554:13:83;3394:47;;999:4797:120;;;;;;;:::i;:::-;;;2554:13:83;3341:102;;999:4797:120;3317:136:83;;;;;999:4797:120;;-1:-1:-1;;;3317:136:83;;999:4797:120;;3153:66:83;3317:136;;999:4797:120;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;999:4797:120;;;;;;-1:-1:-1;;3317:136:83;;;;;;2989:103:66;-1:-1:-1;3313:215:83;;-1:-1:-1;;;3492:25:83;;3153:66;999:4797:120;;;;4601:21:83;3492:25;3313:215;3621:21;3313:215;;;;;;3621:21;999:4797:120;3011:41;999:4797;;;;;;;;3022:11;;2554:13:83;999:4797:120;;;3011:41;;;;;;:::i;:::-;999:4797;;;;;;;3074:12;;999:4797;;3098:16;;;3062:81;;;;;999:4797;;;;;;;;;;;;;;;;;;;3062:81;;999:4797;3153:66:83;3062:81:120;;999:4797;;;;;;:::i;:::-;;;;;;3062:81;;;;;;;;;;;;;3313:215:83;999:4797:120;;3673:61:83;999:4797:120;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;999:4797:120;;;3673:61:83;2407:1:66;2365;-1:-1:-1;;;;;;;;;;;2407:1:66;2989:103::o;3062:81:120:-;;;;;:::i;:::-;999:4797;;3062:81;;;;;999:4797;;;3317:136:83;;;;;-1:-1:-1;3317:136:83;;:::i;:::-;-1:-1:-1;3317:136:83;;;;3148:125;2988:20;;;-1:-1:-1;3242:20:83;3153:66;-1:-1:-1;3242:20:83;3153:66;;;2554:13;3153:66;;2554:13;3153:66;;;;;;2554:13;3153:66;;;:::i;:::-;;;999:4797:120;;;;;;;:::i;:::-;3153:66:83;;;;;;-1:-1:-1;3153:66:83;;999:4797:120;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;999:4797:120;;;;;;;;-1:-1:-1;;999:4797:120;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;999:4797:120;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;-1:-1:-1;;;;;999:4797:120;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;1055:104:6;999:4797:120;1055:104:6;;999:4797:120;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;999:4797:120;;;;;;;-1:-1:-1;999:4797:120;;;;;;:::o;3768:676::-;3987:17;;;999:4797;4008:18;3987:39;3983:57;;4083:45;4094:15;4173:36;4094:15;;;3987:17;999:4797;;;4083:45;;;;;;:::i;:::-;999:4797;3987:17;999:4797;;;4173:36;;;;;;:::i;:::-;4227:12;;;;999:4797;4243:15;;;999:4797;-1:-1:-1;;;;;999:4797:120;;;;;4227:31;;;:96;;3768:676;4227:149;;;3768:676;4227:210;;;4220:217;;3768:676;:::o;4227:210::-;3987:17;4390:14;;;;;;999:4797;;;;;4380:25;4419:17;;;3987;999:4797;;;;4409:28;4380:57;3768:676;:::o;4227:149::-;999:4797;;;;-1:-1:-1;;;;;999:4797:120;;;;;4339:37;;-1:-1:-1;4227:149:120;;:96;4272:16;;;;;;3987:17;999:4797;;;;4262:27;4272:16;4303:19;;;3987:17;999:4797;;;;4293:30;4262:61;4227:96;;;3983:57;4028:12;;999:4797;4028:12;:::o;1343:634:70:-;1465:17;-1:-1:-1;29298:17:77;-1:-1:-1;;;29298:17:77;;;29294:103;;1343:634:70;29414:17:77;29423:8;29994:7;29414:17;;;29410:103;;1343:634:70;29539:8:77;29530:17;;;29526:103;;1343:634:70;29655:7:77;29646:16;;;29642:100;;1343:634:70;29768:7:77;29759:16;;;29755:100;;1343:634:70;29881:7:77;29872:16;;;29868:100;;1343:634:70;29985:16:77;;29981:66;;1343:634:70;29994:7:77;1580:94:70;1485:1;999:4797:120;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;999:4797:120;;:::i;:::-;;;;;;;1580:94:70;;;1687:247;-1:-1:-1;;999:4797:120;;-1:-1:-1;;;1741:111:70;;;;999:4797:120;1741:111:70;999:4797:120;1902:10:70;;1898:21;;29994:7:77;1687:247:70;;;;1898:21;1914:5;;1343:634;:::o;29981:66:77:-;30031:1;999:4797:120;;;;29981:66:77;;29868:100;29881:7;29952:1;999:4797:120;;;;29868:100:77;;;29755;29768:7;29839:1;999:4797:120;;;;29755:100:77;;;29642;29655:7;29726:1;999:4797:120;;;;29642:100:77;;;29526:103;29539:8;29612:2;999:4797:120;;;;29526:103:77;;;29410;29423:8;29496:2;999:4797:120;;;;29410:103:77;;;29294;-1:-1:-1;29380:2:77;;-1:-1:-1;;;;999:4797:120;;29294:103:77;;3749:292:66;2407:1;-1:-1:-1;;;;;;;;;;;999:4797:120;4560:63:66;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;2407:1:66;3749:292::o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:66;;-1:-1:-1;3696:30:66;999:4797:120;;;;;;;:::i;:::-;;;;-1:-1:-1;999:4797:120;;-1:-1:-1;999:4797:120;;;;-1:-1:-1;999:4797:120;;;;-1:-1:-1;999:4797:120;;;;-1:-1:-1;999:4797:120;;;;-1:-1:-1;999:4797:120;;;;-1:-1:-1;999:4797:120;;;;-1:-1:-1;999:4797:120;;;;-1:-1:-1;999:4797:120;;;;;;:::o;:::-;;;-1:-1:-1;;;;;999:4797:120;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;:::i;:::-;;;;;;:::o;4782:257:83:-;;999:4797:120;;:::i;:::-;-1:-1:-1;999:4797:120;;-1:-1:-1;;;4907:23:83;;;;;999:4797:120;;;;-1:-1:-1;999:4797:120;4907:23:83;999:4797:120;4907:3:83;-1:-1:-1;;;;;999:4797:120;4907:23:83;;;;;;;-1:-1:-1;4907:23:83;;;4782:257;4893:37;;999:4797:120;4944:29:83;;;:55;;;;;4782:257;4940:92;;;;4782:257;:::o;4940:92::-;5008:24;;;-1:-1:-1;5008:24:83;4907:23;999:4797:120;4907:23:83;-1:-1:-1;5008:24:83;4944:55;4977:22;;;-1:-1:-1;4944:55:83;;;;4907:23;;;;;;;-1:-1:-1;4907:23:83;;;;;;:::i;:::-;;;;;6040:128:9;6109:4;-1:-1:-1;;;;;999:4797:120;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1387:271:82;1614:20;;999:4797:120;;;;;;;;;;;;;1646:4:82;1614:37;1387:271;:::o;596:321:81:-;999:4797:120;;695:28:81;691:64;;-1:-1:-1;;;;;362:25:81;;;999:4797:120;;362:30:81;;;:78;;;;596:321;765:55;;;553:25;;999:4797:120;-1:-1:-1;;;;;999:4797:120;830:58:81;;906:4;596:321;:::o;830:58::-;868:20;;;-1:-1:-1;868:20:81;;-1:-1:-1;868:20:81;765:55;803:17;;;-1:-1:-1;803:17:81;;-1:-1:-1;803:17:81;362:78;425:15;;;-1:-1:-1;396:44:81;362:78;;;691:64;732:23;;;-1:-1:-1;732:23:81;;-1:-1:-1;732:23:81;2989:103:66;;999:4797:120;2989:103:66;;;:::i;:::-;999:4797:120;;2428:34;;;;;;;;;;;:::i;:::-;2484:12;;;999:4797;2523:16;;;;;;-1:-1:-1;;;;;999:4797:120;2472:89;;;;;999:4797;;;;2484:12;999:4797;;;;;;;;;2472:89;;2523:16;2472:89;;;999:4797;;;;;;:::i;:::-;1103:10:85;999:4797:120;;;;2555:4;999:4797;;;;2472:89;2512:9;;2472:89;;;;;;;;;2989:103:66;2079:18:82;;999:4797:120;-1:-1:-1;;;;;2484:12:120;999:4797;;;;;:::i;:::-;;;;;;;;;;;;2121:271:82;2428:34:120;2121:271:82;;999:4797:120;2271:4:82;2484:12:120;2121:271:82;;999:4797:120;2121:271:82;2523:16:120;2121:271:82;;999:4797:120;2121:271:82;;;;999:4797:120;2121:271:82;;;;999:4797:120;2428:34;2484:12;999:4797;;;;:::i;:::-;;;;2034:373:82;;;999:4797:120;;;2484:12;999:4797;;;;;;;;2010:407:82;;;2472:89:120;2010:407:82;;999:4797:120;;;;;;;2484:12;999:4797;;;;;;;;;;;;;;;;-1:-1:-1;;;;;999:4797:120;;;;;;;;;2484:12;999:4797;;;;;;;;;2523:16;999:4797;;;;;;;2121:271:82;999:4797:120;2121:271:82;999:4797:120;;;;;;;;;;;;;:::i;:::-;;;;;;;;2010:407:82;999:4797:120;;2010:3:82;-1:-1:-1;;;;;999:4797:120;2010:407:82;;;;;;;;;;;2989:103:66;999:4797:120;2689:41;999:4797;;2428:34;999:4797;2484:12;999:4797;;;;;:::i;:::-;;;;1226:400:85;;;999:4797:120;-1:-1:-1;;;;;1340:15:85;999:4797:120;2484:12;1226:400:85;;999:4797:120;2523:16;1226:400:85;;999:4797:120;1226:400:85;2121:271:82;1226:400:85;;999:4797:120;1226:400:85;2121:271:82;1226:400:85;;999:4797:120;;1226:400:85;;999:4797:120;;;2555:4;999:4797;1226:400:85;;999:4797:120;2271:4:82;1226:400:85;;;999:4797:120;1226:400:85;;;;999:4797:120;;;2689:41;;;;:::i;:::-;2523:16;999:4797;;;;;2484:12;2752;;999:4797;;2775:16;;;2740:60;;;;;999:4797;;;;;;2484:12;999:4797;;;;;;;;;;2740:60;;2484:12;2472:89;2740:60;;999:4797;;;;;;:::i;:::-;;;;-1:-1:-1;;999:4797:120;;;;;;;:::i;:::-;2740:60;;;;;;;;;;;;;2989:103:66;-1:-1:-1;;999:4797:120;;;-1:-1:-1;;;;;999:4797:120;;5441:50:83;;;;2407:1:66;2271:4:82;-1:-1:-1;;;;;;;;;;;2407:1:66;2989:103::o;2740:60:120:-;;;;;:::i;:::-;999:4797;;2740:60;;;;2010:407:82;;;;2428:34:120;2010:407:82;;2428:34:120;2010:407:82;;;;;;2428:34:120;2010:407:82;;;:::i;:::-;;;999:4797:120;;;;;;2689:41;2010:407:82;;999:4797:120;;;;2010:407:82;;;-1:-1:-1;2010:407:82;;;2484:12:120;999:4797;;;;;;;;2472:89;;;;;999:4797;2472:89;;:::i;:::-;999:4797;2472:89;;;",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 3507,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 3550,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 3593,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 7219,
          "length": 32
        }
      ],
      "57840": [
        {
          "start": 3114,
          "length": 32
        }
      ],
      "57843": [
        {
          "start": 906,
          "length": 32
        },
        {
          "start": 1792,
          "length": 32
        },
        {
          "start": 2565,
          "length": 32
        },
        {
          "start": 5170,
          "length": 32
        },
        {
          "start": 7081,
          "length": 32
        },
        {
          "start": 7807,
          "length": 32
        }
      ],
      "57845": [
        {
          "start": 970,
          "length": 32
        },
        {
          "start": 1547,
          "length": 32
        },
        {
          "start": 2486,
          "length": 32
        },
        {
          "start": 3064,
          "length": 32
        },
        {
          "start": 3441,
          "length": 32
        },
        {
          "start": 4963,
          "length": 32
        },
        {
          "start": 6091,
          "length": 32
        },
        {
          "start": 7553,
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
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"AttestationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEscrowAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationId\",\"type\":\"bytes32\"}],\"name\":\"RevocationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"fulfiller\",\"type\":\"address\"}],\"name\":\"EscrowCollected\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"buyer\",\"type\":\"address\"}],\"name\":\"EscrowMade\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrow\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"}],\"name\":\"collectEscrowRaw\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"extractArbiterAndDemand\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"hook\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"hookData\",\"type\":\"bytes\"}],\"internalType\":\"struct HookEscrowObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"reclaimExpired\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"title\":\"HookEscrowObligation\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"notice\":\"A generic escrow obligation that delegates lock/release/return to         an IEscrowHook contract. The hook is specified per-escrow, so         different escrow instances can use different hooks (ERC20, ERC721,         or entirely custom logic). Use HooksEscrowObligation for multi-hook         escrows.         Assets are held by the hook contracts, not by this obligation.         Hooks track deposits per-caller (msg.sender = this contract), so         no explicit authorization is required.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/HookEscrowObligation.sol\":\"HookEscrowObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0xf5948e8ec59cdc9e1fd9d447e48ffc9a4691aa7bd9f1a0e3bafabb599aea60ce\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://07bebd0b5595354fcb55d0e77ee17123ad10612c24186ff34fb83fc4e2e1500b\",\"dweb:/ipfs/QmWLxhn1C1Pgy2ZMtBJPjP3rLqizgpjAeJJBysp5PWptAL\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0xb29e7d9b0e28cf7577f92ab19bbf601663e563ca80ecdd96ea260562cc38a488\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://78e09bf664abb7da71ca22d8769b065d9a328b4b48e6d82b58d15728efc0b53c\",\"dweb:/ipfs/QmahKcnWPj5knuupwbzSVXMLPddMNuX6zkLCUaf1pJrEUk\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xa6881b5b28bda43ad28b3020b97e2e762463d7f3f7301a427d14c70daa8577e6\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f84a7c3a6c78b498e0cc901da3e11ee424b1b27a4fd3f49f86ca7055ee17ea04\",\"dweb:/ipfs/QmTQafxhXoA5cYVqjRnwyTFJm4h1ZAjjg1HQkLjuHUDLFc\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x09a273ddcd48501f0afe2397b02bfbeadd88ea28d2fb1b31a3b39fa2e458fb45\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ffcd85fb3da477c7c88d4aaa19fcf0d1f075d87caecde3a42913c799ff8fa9a1\",\"dweb:/ipfs/QmUboCB32tNjn61hVnFYRrckPGnqm3UzmmEkgJmiKSUxJM\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/escrow/hook-based/HookEscrowObligation.sol\":{\"keccak256\":\"0x5eee4e674ef21eaadd865ef0ac2c686aee7260e1ba3aa1f669e2357e474436c5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c15b8f72a083fc9424de89fb85f48973ed5b77846f059590f65261f13eb8b00d\",\"dweb:/ipfs/Qma23wBNChj26P6B2FV9r3Lz73LJHwnWTdQyoE38vuTxV4\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7\",\"dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc\"]}},\"version\":1}",
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
        "keccak256": "0xf5948e8ec59cdc9e1fd9d447e48ffc9a4691aa7bd9f1a0e3bafabb599aea60ce",
        "urls": [
          "bzz-raw://07bebd0b5595354fcb55d0e77ee17123ad10612c24186ff34fb83fc4e2e1500b",
          "dweb:/ipfs/QmWLxhn1C1Pgy2ZMtBJPjP3rLqizgpjAeJJBysp5PWptAL"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseEscrowObligation.sol": {
        "keccak256": "0xb29e7d9b0e28cf7577f92ab19bbf601663e563ca80ecdd96ea260562cc38a488",
        "urls": [
          "bzz-raw://78e09bf664abb7da71ca22d8769b065d9a328b4b48e6d82b58d15728efc0b53c",
          "dweb:/ipfs/QmahKcnWPj5knuupwbzSVXMLPddMNuX6zkLCUaf1pJrEUk"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseObligation.sol": {
        "keccak256": "0xa6881b5b28bda43ad28b3020b97e2e762463d7f3f7301a427d14c70daa8577e6",
        "urls": [
          "bzz-raw://f84a7c3a6c78b498e0cc901da3e11ee424b1b27a4fd3f49f86ca7055ee17ea04",
          "dweb:/ipfs/QmTQafxhXoA5cYVqjRnwyTFJm4h1ZAjjg1HQkLjuHUDLFc"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x09a273ddcd48501f0afe2397b02bfbeadd88ea28d2fb1b31a3b39fa2e458fb45",
        "urls": [
          "bzz-raw://ffcd85fb3da477c7c88d4aaa19fcf0d1f075d87caecde3a42913c799ff8fa9a1",
          "dweb:/ipfs/QmUboCB32tNjn61hVnFYRrckPGnqm3UzmmEkgJmiKSUxJM"
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
        "keccak256": "0x5eee4e674ef21eaadd865ef0ac2c686aee7260e1ba3aa1f669e2357e474436c5",
        "urls": [
          "bzz-raw://c15b8f72a083fc9424de89fb85f48973ed5b77846f059590f65261f13eb8b00d",
          "dweb:/ipfs/Qma23wBNChj26P6B2FV9r3Lz73LJHwnWTdQyoE38vuTxV4"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/hook-based/IEscrowHook.sol": {
        "keccak256": "0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b",
        "urls": [
          "bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7",
          "dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 120
} as const;
