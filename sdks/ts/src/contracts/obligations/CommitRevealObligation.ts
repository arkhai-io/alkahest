export const abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_eas",
          type: "address",
          internalType: "contract IEAS"
        },
        {
          name: "_schemaRegistry",
          type: "address",
          internalType: "contract ISchemaRegistry"
        },
        {
          name: "_bondAmount",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "_commitDeadline",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "_slashedBondRecipient",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "receive",
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "ATTESTATION_SCHEMA",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      stateMutability: "view"
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
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "attester",
              type: "address",
              internalType: "address"
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            }
          ]
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "bondAmount",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
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
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "attester",
              type: "address",
              internalType: "address"
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            }
          ]
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes"
        },
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "commit",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "commitDeadline",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "commitmentClaimed",
      inputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "commitments",
      inputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "commitBlock",
          type: "uint64",
          internalType: "uint64"
        },
        {
          name: "commitTimestamp",
          type: "uint64",
          internalType: "uint64"
        },
        {
          name: "committer",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "computeCommitment",
      inputs: [
        {
          name: "refUID",
          type: "bytes32",
          internalType: "bytes32"
        },
        {
          name: "claimer",
          type: "address",
          internalType: "address"
        },
        {
          name: "data",
          type: "tuple",
          internalType: "struct CommitRevealObligation.ObligationData",
          components: [
            {
              name: "payload",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "salt",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        }
      ],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      stateMutability: "pure"
    },
    {
      type: "function",
      name: "decodeObligationData",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct CommitRevealObligation.ObligationData",
          components: [
            {
              name: "payload",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "salt",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        }
      ],
      stateMutability: "pure"
    },
    {
      type: "function",
      name: "doObligation",
      inputs: [
        {
          name: "data",
          type: "tuple",
          internalType: "struct CommitRevealObligation.ObligationData",
          components: [
            {
              name: "payload",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "salt",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        },
        {
          name: "refUID",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "uid_",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "doObligationRaw",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes"
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64"
        },
        {
          name: "refUID",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "uid_",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "getObligationData",
      inputs: [
        {
          name: "uid",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct CommitRevealObligation.ObligationData",
          components: [
            {
              name: "payload",
              type: "bytes",
              internalType: "bytes"
            },
            {
              name: "salt",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            }
          ]
        }
      ],
      stateMutability: "view"
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
              internalType: "bytes32"
            },
            {
              name: "resolver",
              type: "address",
              internalType: "contract ISchemaResolver"
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "schema",
              type: "string",
              internalType: "string"
            }
          ]
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "isPayable",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "pure"
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
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "attester",
              type: "address",
              internalType: "address"
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            }
          ]
        },
        {
          name: "values",
          type: "uint256[]",
          internalType: "uint256[]"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "payable"
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
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "attester",
              type: "address",
              internalType: "address"
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            }
          ]
        },
        {
          name: "values",
          type: "uint256[]",
          internalType: "uint256[]"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "reclaimBond",
      inputs: [
        {
          name: "obligationUid",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "nonpayable"
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
              internalType: "bytes32"
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64"
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32"
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address"
            },
            {
              name: "attester",
              type: "address",
              internalType: "address"
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes"
            }
          ]
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "payable"
    },
    {
      type: "function",
      name: "slashBond",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          internalType: "bytes32"
        }
      ],
      outputs: [
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      type: "function",
      name: "slashedBondRecipient",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "function",
      name: "version",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string"
        }
      ],
      stateMutability: "view"
    },
    {
      type: "event",
      name: "BondReclaimed",
      inputs: [
        {
          name: "obligationUid",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32"
        },
        {
          name: "claimer",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "BondSlashed",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32"
        },
        {
          name: "recipient",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      type: "event",
      name: "Committed",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32"
        },
        {
          name: "claimer",
          type: "address",
          indexed: true,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      type: "error",
      name: "AccessDenied",
      inputs: []
    },
    {
      type: "error",
      name: "AttestationRevoked",
      inputs: []
    },
    {
      type: "error",
      name: "BondAlreadyClaimed",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          internalType: "bytes32"
        }
      ]
    },
    {
      type: "error",
      name: "BondTransferFailed",
      inputs: [
        {
          name: "claimer",
          type: "address",
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        }
      ]
    },
    {
      type: "error",
      name: "CommitDeadlineNotReached",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          internalType: "bytes32"
        }
      ]
    },
    {
      type: "error",
      name: "CommitmentAlreadyExists",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          internalType: "bytes32"
        }
      ]
    },
    {
      type: "error",
      name: "CommitmentMissing",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          internalType: "bytes32"
        },
        {
          name: "claimer",
          type: "address",
          internalType: "address"
        }
      ]
    },
    {
      type: "error",
      name: "CommitmentTooRecent",
      inputs: [
        {
          name: "commitment",
          type: "bytes32",
          internalType: "bytes32"
        },
        {
          name: "claimer",
          type: "address",
          internalType: "address"
        }
      ]
    },
    {
      type: "error",
      name: "DeadlineExpired",
      inputs: []
    },
    {
      type: "error",
      name: "EmptyCommitment",
      inputs: []
    },
    {
      type: "error",
      name: "IncorrectBondAmount",
      inputs: [
        {
          name: "provided",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "required",
          type: "uint256",
          internalType: "uint256"
        }
      ]
    },
    {
      type: "error",
      name: "InsufficientValue",
      inputs: []
    },
    {
      type: "error",
      name: "InvalidEAS",
      inputs: []
    },
    {
      type: "error",
      name: "InvalidLength",
      inputs: []
    },
    {
      type: "error",
      name: "InvalidSchema",
      inputs: []
    },
    {
      type: "error",
      name: "NotFromThisAttester",
      inputs: []
    },
    {
      type: "error",
      name: "NotPayable",
      inputs: []
    },
    {
      type: "error",
      name: "ReentrancyGuardReentrantCall",
      inputs: []
    },
    {
      type: "error",
      name: "SlashTransferFailed",
      inputs: [
        {
          name: "recipient",
          type: "address",
          internalType: "address"
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256"
        }
      ]
    }
  ]
} as const;
