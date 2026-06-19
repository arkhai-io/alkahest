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
        },
        {
          "name": "_bondAmount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_commitDeadline",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_slashedBondRecipient",
          "type": "address",
          "internalType": "address"
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
      "name": "bondAmount",
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
      "name": "bondEpochCount",
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
      "name": "bondEpochs",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "startBlock",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
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
          "name": "",
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
      "name": "commit",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "commitDeadline",
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
      "name": "commitmentClaimed",
      "inputs": [
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
      "name": "commitments",
      "inputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "commitBlock",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "commitTimestamp",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "committer",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "computeCommitment",
      "inputs": [
        {
          "name": "refUID",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "claimer",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
          "components": [
            {
              "name": "payload",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "salt",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
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
          "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
          "components": [
            {
              "name": "payload",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "salt",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
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
          "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
          "components": [
            {
              "name": "payload",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "salt",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ]
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
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "doObligationFor",
      "inputs": [
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
          "components": [
            {
              "name": "payload",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "salt",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ]
        },
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
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
          "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
          "components": [
            {
              "name": "payload",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "salt",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
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
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revealAndCollect",
      "inputs": [
        {
          "name": "data",
          "type": "tuple",
          "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
          "components": [
            {
              "name": "payload",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "salt",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ]
        },
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "escrowContract",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "escrowUid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "fulfillmentUid",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "collectResult",
          "type": "bytes",
          "internalType": "bytes"
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
      "name": "setBondAmount",
      "inputs": [
        {
          "name": "_bondAmount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setCommitDeadline",
      "inputs": [
        {
          "name": "_commitDeadline",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setSlashedBondRecipient",
      "inputs": [
        {
          "name": "_slashedBondRecipient",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "slashBond",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "slashedBondRecipient",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        {
          "name": "newOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
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
      "name": "BondReclaimed",
      "inputs": [
        {
          "name": "obligationUid",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "claimer",
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
      "name": "BondSlashed",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "recipient",
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
      "name": "Committed",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "claimer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
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
      "name": "BondAlreadyClaimed",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "BondTransferFailed",
      "inputs": [
        {
          "name": "claimer",
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
      "name": "CommitDeadlineNotReached",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "CommitmentAlreadyExists",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "CommitmentMissing",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "claimer",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "CommitmentTooRecent",
      "inputs": [
        {
          "name": "commitment",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "claimer",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "EmptyCommitment",
      "inputs": []
    },
    {
      "type": "error",
      "name": "EscrowCollectionFailed",
      "inputs": [
        {
          "name": "escrowContract",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "escrowUid",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "fulfillmentUid",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "result",
          "type": "bytes",
          "internalType": "bytes"
        }
      ]
    },
    {
      "type": "error",
      "name": "IncorrectBondAmount",
      "inputs": [
        {
          "name": "provided",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "required",
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
      "name": "InvalidEAS",
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
      "name": "OwnableInvalidOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ReentrancyGuardReentrantCall",
      "inputs": []
    },
    {
      "type": "error",
      "name": "RevealTooLate",
      "inputs": [
        {
          "name": "commitment",
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
      "name": "SlashTransferFailed",
      "inputs": [
        {
          "name": "recipient",
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
  "bytecode": {
    "object": "0x61018080604052346103205760a08161298a80380380916100208285610324565b833981010312610320578051906001600160a01b038216808303610320576020820151926001600160a01b03841680850361032057604084015192608060608601519501519560018060a01b0387168097036103205760405191610085606084610324565b602b83527f6279746573207061796c6f61642c20627974657333322073616c742c2062797460208401526a6573333220736368656d6160a81b60408401526001608052600360a0525f60c0521561031157836100f39460e0526101205261010052600161016052309161042b565b6101405260017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f005533156102fe575f8054336001600160a01b0319821681178355604051939290916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a3604082016001600160401b038111838210176102ea576040525f82526020820190815260035490680100000000000000008210156102ea5760018201806003558210156102d65760035f52915160019190911b7fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b810180546001600160401b0319166001600160401b03939093169290921790915590517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c90910155600455600580546001600160a01b0319169190911790556040516123839081610607823960805181611316015260a05181611341015260c0518161136c015260e051816122ad01526101005181610fbb01526101205181818161062a015281816109c20152611dea015261014051818181610662015281816108b301528181610f890152818161113d01528181611b200152611cd3015261016051818181610833015281816108eb0152611d130152f35b634e487b7160e01b5f52603260045260245ffd5b634e487b7160e01b5f52604160045260245ffd5b631e4fbdf760e01b5f525f60045260245ffd5b6341bc07ff60e11b5f5260045ffd5b5f80fd5b601f909101601f19168101906001600160401b038211908210176102ea57604052565b602081830312610320578051906001600160401b0382116103205701906080828203126103205760405191608083016001600160401b038111848210176102ea576040528051835260208101516001600160a01b0381168103610320576020840152604081015180151581036103205760408401526060810151906001600160401b038211610320570181601f82011215610320578051906001600160401b0382116102ea5760405192610405601f8401601f191660200185610324565b8284526020838301011161032057815f9260208093018386015e83010152606082015290565b929160405190602082018351926104756015602083818901978089885e810160018060601b03198860601b1683820152600160f81b60348201520301600a19810184520182610324565b5190206040516351753e3760e11b81526004810182905290956001600160a01b031693905f81602481885afa80156105865787915f916105ec575b5051146105e6579060846020926040519485938492630c1af44f60e31b8452606060048501525180928160648601528585015e5f84838501015260018060a01b0316602483015260016044830152601f801991011681010301815f865af15f91816105b2575b5061059157505f602491604051928380926351753e3760e11b82528760048301525afa80156105865783915f91610564575b5051146105625750639e6113d560e01b5f5260045260245ffd5b565b61058091503d805f833e6105788183610324565b810190610347565b5f610548565b6040513d5f823e3d90fd5b919280915082036105a0575090565b639e6113d560e01b5f5260045260245ffd5b9091506020813d6020116105de575b816105ce60209383610324565b810103126103205751905f610516565b3d91506105c1565b50505050565b61060091503d805f833e6105788183610324565b5f6104b056fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c9081631f04b6b61461168f5750806328f9f3e6146115825780632cfea7ce1461143c5780633d447265146113f957806354fd4d50146112f7578063571573ce146111605780635bf2f20d146111265780636605239e146110e05780636b122fe014610f4a578063715018a614610ef35780637224760e14610ed257806380f323a714610eb7578063839df94514610e6657806388e5b2d914610d085780638da3721a14610d4e5780638da5cb5b14610d2757806391db0b7e14610d08578063a2ff020914610ceb578063a50a216214610c7e578063b3b902d414610858578063b587a5eb1461081c578063c6ec5070146105a7578063c93844be146104f2578063cd95b7b914610492578063ce46e04614610478578063d4e063dd14610449578063d825c0a01461042c578063da18dc7814610389578063e49617e114610364578063e60c350514610364578063f14fcbc81461021e5763f2fde38b14610195575f61000f565b3461021a57602036600319011261021a576101ae6116c8565b6101b6611ca0565b6001600160a01b03168015610207575f80546001600160a01b03198116831782556001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a3005b631e4fbdf760e01b5f525f60045260245ffd5b5f80fd5b602036600319011261021a5760043580156103555761023c43612246565b80340361033f57505f81815260016020819052604090912001546001600160a01b031661032d5760405161026f816117e1565b6001600160401b0343168152600160208201916001600160401b03421683526040810192338452845f52826020526001600160401b038060405f20935116166001600160401b03198354161782555167ffffffffffffffff60401b82549160401b169067ffffffffffffffff60401b1916178155019060018060a01b039051166bffffffffffffffffffffffff60a01b82541617905533907ffda886b5d38d5d61e432b3acc9f19640a2b8c83c87a9c584a780d3854b309b9c5f80a3005b63c5f89f0560e01b5f5260045260245ffd5b63058b312960e51b5f523460045260245260445ffd5b635560fe6360e11b5f5260045ffd5b602061037f6103723661194e565b61037a6122ab565b6122ec565b6040519015158152f35b3461021a57606036600319011261021a576103a26116b2565b604435906001600160401b03821161021a576060600319833603011261021a576103e26104216020936040516103f0816103e2888201946004018561198f565b03601f19810183528261184e565b519020604080516004358782019081526001600160a01b039096166020870152908501919091529182906060850190565b519020604051908152f35b3461021a575f36600319011261021a576020600354604051908152f35b3461021a57602036600319011261021a576004355f526002602052602060ff60405f2054166040519015158152f35b3461021a575f36600319011261021a5760206040515f8152f35b3461021a57604036600319011261021a576004356001600160401b03811161021a576060600319823603011261021a576104ea6103e26104df60209360405192839160040186830161198f565b602435903390611cc6565b604051908152f35b3461021a57602036600319011261021a576004356001600160401b03811161021a576105229036906004016118f2565b61052a611c81565b5081019060208183031261021a578035906001600160401b03821161021a57019060608282031261021a5760405190610562826117e1565b8235926001600160401b03841161021a576105846040926105a39583016118d4565b835260208101356020840152013560408201526040519182918261191f565b0390f35b3461021a57602036600319011261021a576105c0611c81565b5060606101206040516105d281611817565b5f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f61010082015201526040516328c44a9960e21b815260043560048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa908115610811575f9161071f575b5060208101517f000000000000000000000000000000000000000000000000000000000000000003610710576101200151805181019060208183031261021a576020810151906001600160401b03821161021a570160608183031261021a57604051906106c6826117e1565b6020810151906001600160401b03821161021a576106f16060926020806105a3970191840101611a62565b835260408101516020840152015160408201526040519182918261191f565b635527981560e11b5f5260045ffd5b90503d805f833e610730818361184e565b81019060208183031261021a578051906001600160401b03821161021a57016101408183031261021a576040519161076783611817565b815183526020820151602084015261078160408301612305565b604084015261079260608301612305565b60608401526107a360808301612305565b608084015260a082015160a08401526107be60c08301612319565b60c08401526107cf60e08301612319565b60e08401526107e16101008301611a7c565b6101008401526101208201516001600160401b03811161021a576108059201611a62565b6101208201528161065a565b6040513d5f823e3d90fd5b3461021a575f36600319011261021a5760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b606036600319011261021a576004356001600160401b03811161021a576108839036906004016118f2565b90602435906001600160401b03821680920361021a576108a89060443593369161189e565b906108b161220e565b7f000000000000000000000000000000000000000000000000000000000000000092604051926108e084611833565b3384528260208501527f00000000000000000000000000000000000000000000000000000000000000001515928360408601528260608601528160808601525f60a08601526020604051610933816117c6565b8781528181019687526040518097819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06109b4608083015160c060e48601526101248501906116f2565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1948515610811575f95610c48575b506103e291610a869160405197610a1089611817565b87895260208901526001600160401b034216604089015260608801525f60808801528360a088015260c08701943386523060e0890152610100880152806101208801526020815191012060405192839160208301953390876040919493926060820195825260018060a01b031660208201520152565b51902090815f52600160205260405f2060405190610aa3826117e1565b80546001600160401b038082168452604091821c16602084019081526001909201546001600160a01b0316908301818152939015610c23576001600160401b03835116431115610bfe575051600454610b04916001600160401b0316611982565b4211610beb57825f52600260205260ff60405f205416610bd8576001600160401b03610b31915116612246565b915f52600260205260405f20600160ff198254161790555f8080808560018060a01b038651165af1610b616119fd565b5015610bb9577fa9b8d1cb23fc6bfcae1f7ed8ec77868451af44dde191688baa93bb00b7ee491760208095519260018060a01b0390511693604051908152a360015f51602061232e5f395f51905f5255604051908152f35b60018060a01b03905116638fdb80a360e01b5f5260045260245260445ffd5b826327d117f760e01b5f5260045260245ffd5b8263b7c2dee760e01b5f5260045260245ffd5b516309e555e360e01b5f90815260048690526001600160a01b03909116602452604490fd5b51630fa254d360e21b5f90815260048690526001600160a01b03909116602452604490fd5b9094506020813d602011610c76575b81610c646020938361184e565b8101031261021a5751936103e26109fa565b3d9150610c57565b3461021a57606036600319011261021a576004356001600160401b03811161021a576060600319823603011261021a576104ea610cd4602092610ce2610cc26116b2565b9160405193849160040187830161198f565b03601f19810184528361184e565b60443591611cc6565b3461021a575f36600319011261021a576020600454604051908152f35b602061037f610d1636611776565b92610d229291926122ab565b611a89565b3461021a575f36600319011261021a575f546040516001600160a01b039091168152602090f35b3461021a57606036600319011261021a576004356001600160401b03811161021a57610140600319823603011261021a5760405190610d8c82611817565b8060040135825260248101356020830152610da96044820161186f565b6040830152610dba6064820161186f565b6060830152610dcb6084820161186f565b608083015260a481013560a0830152610de660c482016116de565b60c0830152610df760e482016116de565b60e0830152610104810135801515810361021a57610100830152610124810135906001600160401b03821161021a576004610e3592369201016118d4565b6101208201526024356001600160401b03811161021a57602091610e6061037f9236906004016118d4565b50611b19565b3461021a57602036600319011261021a576004355f526001602052606060405f208054906001808060a01b03910154166001600160401b0360405192818116845260401c1660208301526040820152f35b3461021a575f36600319011261021a5760206104ea43612246565b3461021a57602036600319011261021a57610eeb611ca0565b600480359055005b3461021a575f36600319011261021a57610f0b611ca0565b5f80546001600160a01b0319811682556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b3461021a575f36600319011261021a57606080604051610f69816117fc565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610811575f90611030575b6060906105a3604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906116f2565b503d805f833e611040818361184e565b81019060208183031261021a578051906001600160401b03821161021a570160808183031261021a5760405190611076826117fc565b8051825260208101516001600160a01b038116810361021a5760208301526110a060408201611a7c565b60408301526060810151906001600160401b03821161021a570182601f8201121561021a576060928160206110d793519101611a2c565b82820152610fea565b3461021a57602036600319011261021a5760043560035481101561021a57611109604091611716565b5060016001600160401b0382541691015482519182526020820152f35b3461021a575f36600319011261021a5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461021a57602036600319011261021a5760043561117c61220e565b805f52600160205260405f2060405190611195826117e1565b80546001600160401b038082168452604091821c16602084019081526001909201546001600160a01b0316908301819052156112e057516004546111e1916001600160401b0316611982565b4211156112cd57815f52600260205260ff60405f2054166112ba576001600160401b0361120f915116612246565b90805f52600260205260405f20600160ff198254161790555f8080808560018060a01b03600554165af16112416119fd565b5015611299579060209160018060a01b0360055416907f5fab42dd23447bf0a6cc6638a8217a7d477b5067842aedf24b881e132c1c133d84604051858152a360015f51602061232e5f395f51905f5255604051908152f35b5060018060a01b0360055416631f89846360e21b5f5260045260245260445ffd5b506327d117f760e01b5f5260045260245ffd5b50631439fe2d60e01b5f5260045260245ffd5b82630fa254d360e21b5f526004525f60245260445ffd5b3461021a575f36600319011261021a576105a360206113e5600161133a7f00000000000000000000000000000000000000000000000000000000000000006120a1565b81846113657f00000000000000000000000000000000000000000000000000000000000000006120a1565b81806113907f00000000000000000000000000000000000000000000000000000000000000006120a1565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f19810183528261184e565b6040519182916020835260208301906116f2565b3461021a57602036600319011261021a576114126116c8565b61141a611ca0565b600580546001600160a01b0319166001600160a01b0392909216919091179055005b3461021a57608036600319011261021a576004356001600160401b03811161021a576060600319823603011261021a576114746116b2565b604435916001600160a01b0383169182840361021a575f6114b46114af9382936103e26064359687936040519283916004016020830161198f565b611cc6565b94604051826020820191633a9bb12760e21b8352866024820152886044820152604481526114e360648261184e565b51925af1916114f06119fd565b9215611549575050805181019060208183031261021a576020810151916001600160401b03831161021a5761152c926020809201920101611a62565b906105a360405192839283526040602084015260408301906116f2565b61157e8385604051948594630b836fc760e31b86526004860152602485015260448401526080606484015260848301906116f2565b0390fd5b3461021a57602036600319011261021a5760043561159e611ca0565b6001430180431161167b576003545f198101916001600160401b03169080831161167b57816001600160401b036115d485611716565b505416036115ee5750506115e9600191611716565b500155005b6040519250906115fd836117c6565b82526020820192835268010000000000000000811015611667578060016116279201600355611716565b929092611654576001600160401b03806001935116166001600160401b0319845416178355519101555f80f35b634e487b7160e01b5f525f60045260245ffd5b634e487b7160e01b5f52604160045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b3461021a575f36600319011261021a576005546001600160a01b03168152602090f35b602435906001600160a01b038216820361021a57565b600435906001600160a01b038216820361021a57565b35906001600160a01b038216820361021a57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b6003548110156117325760035f5260205f209060011b01905f90565b634e487b7160e01b5f52603260045260245ffd5b9181601f8401121561021a578235916001600160401b03831161021a576020808501948460051b01011161021a57565b604060031982011261021a576004356001600160401b03811161021a57816117a091600401611746565b92909291602435906001600160401b03821161021a576117c291600401611746565b9091565b604081019081106001600160401b0382111761166757604052565b606081019081106001600160401b0382111761166757604052565b608081019081106001600160401b0382111761166757604052565b61014081019081106001600160401b0382111761166757604052565b60c081019081106001600160401b0382111761166757604052565b90601f801991011681019081106001600160401b0382111761166757604052565b35906001600160401b038216820361021a57565b6001600160401b03811161166757601f01601f191660200190565b9291926118aa82611883565b916118b8604051938461184e565b82948184528183011161021a578281602093845f960137010152565b9080601f8301121561021a578160206118ef9335910161189e565b90565b9181601f8401121561021a578235916001600160401b03831161021a576020838186019501011161021a57565b602081526060604061193c845183602086015260808501906116f2565b93602081015182850152015191015290565b602060031982011261021a57600435906001600160401b03821161021a5761014090829003600319011261021a5760040190565b9190820180921161167b57565b602081528135601e198336030181121561021a5782016020813591016001600160401b03821161021a57813603811361021a5760a0938260409260606020870152816080870152868601375f84840186015260208101358285015201356060830152601f01601f1916010190565b3d15611a27573d90611a0e82611883565b91611a1c604051938461184e565b82523d5f602084013e565b606090565b929192611a3882611883565b91611a46604051938461184e565b82948184528183011161021a578281602093845f96015e010152565b9080601f8301121561021a5781516118ef92602001611a2c565b5190811515820361021a57565b929092818403611b0a575f91345b85841015611aff5781841015611732578360051b8086013590828211611af05784013561013e198536030181121561021a57611ad49085016122ec565b15611ae55760019103930192611a97565b505050505050505f90565b63044044a560e21b5f5260045ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f000000000000000000000000000000000000000000000000000000000000000003611c7c5760a081015160c0820180516101208401518051602091820120604080519283019586526001600160a01b03909316928201929092526060810191909152909190611b9181608081016103e2565b51902091825f52600160205260405f2091604051611bae816117e1565b83546001600160401b038082168352604091821c16602083019081526001909501546001600160a01b031690820181905215611c5657516001600160401b0316431115611c3157506001600160401b03806040611c149301511692511660045490611982565b10611c1f5750600190565b63b7c2dee760e01b5f5260045260245ffd5b516309e555e360e01b5f90815260048590526001600160a01b03909116602452604490fd5b8151630fa254d360e21b5f90815260048790526001600160a01b03909116602452604490fd5b505f90565b60405190611c8e826117e1565b5f604083606081528260208201520152565b5f546001600160a01b03163303611cb357565b63118cdaa760e01b5f523360045260245ffd5b919091611cd161220e565b7f00000000000000000000000000000000000000000000000000000000000000009160405193611d0085611833565b60018060a01b03168085525f60208601527f00000000000000000000000000000000000000000000000000000000000000001515928360408701528260608701528060808701525f60a08701526020604051611d5b816117c6565b8681528181019788526040518098819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611ddc608083015160c060e48601526101248501906116f2565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610811575f9661206b575b50611ead9060405195611e3487611817565b87875260208701526001600160401b03421660408701525f60608701525f60808701528360a087015260c08601948386523060e08801526101008701528061012087015260208151910120916103e26040519384926020840196876040919493926060820195825260018060a01b031660208201520152565b51902091825f52600160205260405f2060405190611eca826117e1565b80546001600160401b038082168452604091821c16602084019081526001909201546001600160a01b0316908301818152949015612046576001600160401b03835116431115612021575051600454611f2b916001600160401b0316611982565b421161200e57835f52600260205260ff60405f205416611ffb576001600160401b03611f58915116612246565b925f52600260205260405f20600160ff198254161790555f8080808660018060a01b038751165af1611f886119fd565b5015611fdb575190516040519283526001600160a01b0316917fa9b8d1cb23fc6bfcae1f7ed8ec77868451af44dde191688baa93bb00b7ee491790602090a39060015f51602061232e5f395f51905f5255565b5060018060a01b03905116638fdb80a360e01b5f5260045260245260445ffd5b836327d117f760e01b5f5260045260245ffd5b8363b7c2dee760e01b5f5260045260245ffd5b516309e555e360e01b5f90815260048790526001600160a01b03909116602452604490fd5b51630fa254d360e21b5f90815260048790526001600160a01b03909116602452604490fd5b9095506020813d602011612099575b816120876020938361184e565b8101031261021a575194611ead611e22565b3d915061207a565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156121eb575b806d04ee2d6d415b85acef8100000000600a9210156121d0575b662386f26fc100008110156121bc575b6305f5e1008110156121ab575b61271081101561219c575b606481101561218e575b1015612183575b600a6021600184019361212885611883565b94612136604051968761184e565b808652612145601f1991611883565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561217e57600a9091612150565b505090565b600190910190612116565b60646002910493019261210f565b61271060049104930192612105565b6305f5e100600891049301926120fa565b662386f26fc10000601091049301926120ed565b6d04ee2d6d415b85acef8100000000602091049301926120dd565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046120c3565b60025f51602061232e5f395f51905f5254146122375760025f51602061232e5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b90600354805b612254575f80fd5b5f19810181811161167b5761226a602091611716565b50604051612277816117c6565b60016001600160401b0383541692838352015492839101528410156122a65750801561167b575f19018061224c565b925050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633036122dd57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361021a57301490565b51906001600160401b038216820361021a57565b51906001600160a01b038216820361021a5756fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220a2c6bd123204b3a9dd6615a71f2e80a0046404ae6fc3c04bdd3a28aaa7f1817564736f6c634300081b0033",
    "sourceMap": "1138:12853:117:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;1138:12853:117;;;;;;759:14:6;688:1:9;1138:12853:117;783:14:6;-1:-1:-1;807:14:6;;708:26:9;704:76;;790:10;1122:81:82;790:10:9;;;989::82;;1009:32;;1138:12853:117;1051:40:82;;1185:4;1122:81;;:::i;:::-;1101:102;;1138:12853:117;1505:66:67;1138:12853:117;3662:10;1273:26:33;1269:95;;-1:-1:-1;1138:12853:117;;3662:10;-1:-1:-1;;;;;;1138:12853:117;;;;;;;;;;3662:10;;-1:-1:-1;;;;;1138:12853:117;;3052:40:33;;-1:-1:-1;3052:40:33;1138:12853:117;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;-1:-1:-1;1138:12853:117;;;3700:47;;1138:12853;;;688:1:9;1138:12853:117;;;;;;;;;;;;688:1:9;1138:12853:117;;;;;;688:1:9;-1:-1:-1;1138:12853:117;;;;;;;;;;;;;-1:-1:-1;;;;;;1138:12853:117;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;3758:32;1138:12853;3800:44;1138:12853;;-1:-1:-1;;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;807:14:6;1138:12853:117;;;;;790:10:9;1138:12853:117;;;;;1009:32:82;1138:12853:117;;;;;989:10:82;1138:12853:117;;;;;;;;;;;;;;;1101:102:82;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1051:40:82;1138:12853:117;;;;;;;;;;;;;;;;;;;;-1:-1:-1;1138:12853:117;;;;;-1:-1:-1;1138:12853:117;;;;;-1:-1:-1;1138:12853:117;;;;;-1:-1:-1;1138:12853:117;1269:95:33;1322:31;;;-1:-1:-1;1322:31:33;-1:-1:-1;1322:31:33;1138:12853:117;;-1:-1:-1;1322:31:33;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;1138:12853:117;-1:-1:-1;1138:12853:117;;;;;;;-1:-1:-1;;1138:12853:117;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;1138:12853:117;;;;;;;;;;;;;;;;;;:::o;289:755:87:-;;;1138:12853:117;;1189:45:87;;;;1138:12853:117;;;1189:45:87;1138:12853:117;1189:45:87;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1189:45:87;;;;;;;;;;;:::i;:::-;1138:12853:117;1179:56:87;;1138:12853:117;;-1:-1:-1;;;572:29:87;;;;;1138:12853:117;;;1179:56:87;;-1:-1:-1;;;;;1138:12853:117;;;-1:-1:-1;1138:12853:117;572:29:87;1138:12853:117;;572:29:87;;;;;;;;-1:-1:-1;572:29:87;;;289:755;1138:12853:117;;615:19:87;611:35;;1138:12853:117;;1189:45:87;1138:12853:117;;;;;;;;;;;661:52:87;;1138:12853:117;572:29:87;661:52;;1138:12853:117;;;;;;;;;;;;;-1:-1:-1;1138:12853:117;;;;;;;;;;;;572:29:87;1138:12853:117;;;3648:4;1138:12853;;;;;;;;;;;;661:52:87;;;-1:-1:-1;661:52:87;;;-1:-1:-1;;661:52:87;;;289:755;-1:-1:-1;657:381:87;;1138:12853:117;-1:-1:-1;572:29:87;1138:12853:117;;;;;;;;;;899:29:87;;;572;899;;1138:12853:117;899:29:87;;;;;;;;-1:-1:-1;899:29:87;;;657:381;1138:12853:117;;946:19:87;942:35;;793:29;;;;-1:-1:-1;998:29:87;572;1138:12853:117;572:29:87;-1:-1:-1;998:29:87;942:35;967:10::o;899:29::-;;;;;;-1:-1:-1;899:29:87;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;1138:12853:117;;;-1:-1:-1;1138:12853:117;;;;;657:381:87;764:20;;;;;;;760:62;;836:20;;:::o;760:62::-;793:29;;;-1:-1:-1;793:29:87;572;1138:12853:117;572:29:87;-1:-1:-1;793:29:87;661:52;;;;1189:45;661:52;;1189:45;661:52;;;;;;1189:45;661:52;;;:::i;:::-;;;1138:12853:117;;;;;661:52:87;;;;;;;-1:-1:-1;661:52:87;;611:35;636:10;;;;:::o;572:29::-;;;;;;-1:-1:-1;572:29:87;;;;;;:::i;:::-;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c9081631f04b6b61461168f5750806328f9f3e6146115825780632cfea7ce1461143c5780633d447265146113f957806354fd4d50146112f7578063571573ce146111605780635bf2f20d146111265780636605239e146110e05780636b122fe014610f4a578063715018a614610ef35780637224760e14610ed257806380f323a714610eb7578063839df94514610e6657806388e5b2d914610d085780638da3721a14610d4e5780638da5cb5b14610d2757806391db0b7e14610d08578063a2ff020914610ceb578063a50a216214610c7e578063b3b902d414610858578063b587a5eb1461081c578063c6ec5070146105a7578063c93844be146104f2578063cd95b7b914610492578063ce46e04614610478578063d4e063dd14610449578063d825c0a01461042c578063da18dc7814610389578063e49617e114610364578063e60c350514610364578063f14fcbc81461021e5763f2fde38b14610195575f61000f565b3461021a57602036600319011261021a576101ae6116c8565b6101b6611ca0565b6001600160a01b03168015610207575f80546001600160a01b03198116831782556001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a3005b631e4fbdf760e01b5f525f60045260245ffd5b5f80fd5b602036600319011261021a5760043580156103555761023c43612246565b80340361033f57505f81815260016020819052604090912001546001600160a01b031661032d5760405161026f816117e1565b6001600160401b0343168152600160208201916001600160401b03421683526040810192338452845f52826020526001600160401b038060405f20935116166001600160401b03198354161782555167ffffffffffffffff60401b82549160401b169067ffffffffffffffff60401b1916178155019060018060a01b039051166bffffffffffffffffffffffff60a01b82541617905533907ffda886b5d38d5d61e432b3acc9f19640a2b8c83c87a9c584a780d3854b309b9c5f80a3005b63c5f89f0560e01b5f5260045260245ffd5b63058b312960e51b5f523460045260245260445ffd5b635560fe6360e11b5f5260045ffd5b602061037f6103723661194e565b61037a6122ab565b6122ec565b6040519015158152f35b3461021a57606036600319011261021a576103a26116b2565b604435906001600160401b03821161021a576060600319833603011261021a576103e26104216020936040516103f0816103e2888201946004018561198f565b03601f19810183528261184e565b519020604080516004358782019081526001600160a01b039096166020870152908501919091529182906060850190565b519020604051908152f35b3461021a575f36600319011261021a576020600354604051908152f35b3461021a57602036600319011261021a576004355f526002602052602060ff60405f2054166040519015158152f35b3461021a575f36600319011261021a5760206040515f8152f35b3461021a57604036600319011261021a576004356001600160401b03811161021a576060600319823603011261021a576104ea6103e26104df60209360405192839160040186830161198f565b602435903390611cc6565b604051908152f35b3461021a57602036600319011261021a576004356001600160401b03811161021a576105229036906004016118f2565b61052a611c81565b5081019060208183031261021a578035906001600160401b03821161021a57019060608282031261021a5760405190610562826117e1565b8235926001600160401b03841161021a576105846040926105a39583016118d4565b835260208101356020840152013560408201526040519182918261191f565b0390f35b3461021a57602036600319011261021a576105c0611c81565b5060606101206040516105d281611817565b5f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f61010082015201526040516328c44a9960e21b815260043560048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa908115610811575f9161071f575b5060208101517f000000000000000000000000000000000000000000000000000000000000000003610710576101200151805181019060208183031261021a576020810151906001600160401b03821161021a570160608183031261021a57604051906106c6826117e1565b6020810151906001600160401b03821161021a576106f16060926020806105a3970191840101611a62565b835260408101516020840152015160408201526040519182918261191f565b635527981560e11b5f5260045ffd5b90503d805f833e610730818361184e565b81019060208183031261021a578051906001600160401b03821161021a57016101408183031261021a576040519161076783611817565b815183526020820151602084015261078160408301612305565b604084015261079260608301612305565b60608401526107a360808301612305565b608084015260a082015160a08401526107be60c08301612319565b60c08401526107cf60e08301612319565b60e08401526107e16101008301611a7c565b6101008401526101208201516001600160401b03811161021a576108059201611a62565b6101208201528161065a565b6040513d5f823e3d90fd5b3461021a575f36600319011261021a5760206040517f000000000000000000000000000000000000000000000000000000000000000015158152f35b606036600319011261021a576004356001600160401b03811161021a576108839036906004016118f2565b90602435906001600160401b03821680920361021a576108a89060443593369161189e565b906108b161220e565b7f000000000000000000000000000000000000000000000000000000000000000092604051926108e084611833565b3384528260208501527f00000000000000000000000000000000000000000000000000000000000000001515928360408601528260608601528160808601525f60a08601526020604051610933816117c6565b8781528181019687526040518097819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06109b4608083015160c060e48601526101248501906116f2565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1948515610811575f95610c48575b506103e291610a869160405197610a1089611817565b87895260208901526001600160401b034216604089015260608801525f60808801528360a088015260c08701943386523060e0890152610100880152806101208801526020815191012060405192839160208301953390876040919493926060820195825260018060a01b031660208201520152565b51902090815f52600160205260405f2060405190610aa3826117e1565b80546001600160401b038082168452604091821c16602084019081526001909201546001600160a01b0316908301818152939015610c23576001600160401b03835116431115610bfe575051600454610b04916001600160401b0316611982565b4211610beb57825f52600260205260ff60405f205416610bd8576001600160401b03610b31915116612246565b915f52600260205260405f20600160ff198254161790555f8080808560018060a01b038651165af1610b616119fd565b5015610bb9577fa9b8d1cb23fc6bfcae1f7ed8ec77868451af44dde191688baa93bb00b7ee491760208095519260018060a01b0390511693604051908152a360015f51602061232e5f395f51905f5255604051908152f35b60018060a01b03905116638fdb80a360e01b5f5260045260245260445ffd5b826327d117f760e01b5f5260045260245ffd5b8263b7c2dee760e01b5f5260045260245ffd5b516309e555e360e01b5f90815260048690526001600160a01b03909116602452604490fd5b51630fa254d360e21b5f90815260048690526001600160a01b03909116602452604490fd5b9094506020813d602011610c76575b81610c646020938361184e565b8101031261021a5751936103e26109fa565b3d9150610c57565b3461021a57606036600319011261021a576004356001600160401b03811161021a576060600319823603011261021a576104ea610cd4602092610ce2610cc26116b2565b9160405193849160040187830161198f565b03601f19810184528361184e565b60443591611cc6565b3461021a575f36600319011261021a576020600454604051908152f35b602061037f610d1636611776565b92610d229291926122ab565b611a89565b3461021a575f36600319011261021a575f546040516001600160a01b039091168152602090f35b3461021a57606036600319011261021a576004356001600160401b03811161021a57610140600319823603011261021a5760405190610d8c82611817565b8060040135825260248101356020830152610da96044820161186f565b6040830152610dba6064820161186f565b6060830152610dcb6084820161186f565b608083015260a481013560a0830152610de660c482016116de565b60c0830152610df760e482016116de565b60e0830152610104810135801515810361021a57610100830152610124810135906001600160401b03821161021a576004610e3592369201016118d4565b6101208201526024356001600160401b03811161021a57602091610e6061037f9236906004016118d4565b50611b19565b3461021a57602036600319011261021a576004355f526001602052606060405f208054906001808060a01b03910154166001600160401b0360405192818116845260401c1660208301526040820152f35b3461021a575f36600319011261021a5760206104ea43612246565b3461021a57602036600319011261021a57610eeb611ca0565b600480359055005b3461021a575f36600319011261021a57610f0b611ca0565b5f80546001600160a01b0319811682556001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a3005b3461021a575f36600319011261021a57606080604051610f69816117fc565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610811575f90611030575b6060906105a3604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a08301906116f2565b503d805f833e611040818361184e565b81019060208183031261021a578051906001600160401b03821161021a570160808183031261021a5760405190611076826117fc565b8051825260208101516001600160a01b038116810361021a5760208301526110a060408201611a7c565b60408301526060810151906001600160401b03821161021a570182601f8201121561021a576060928160206110d793519101611a2c565b82820152610fea565b3461021a57602036600319011261021a5760043560035481101561021a57611109604091611716565b5060016001600160401b0382541691015482519182526020820152f35b3461021a575f36600319011261021a5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461021a57602036600319011261021a5760043561117c61220e565b805f52600160205260405f2060405190611195826117e1565b80546001600160401b038082168452604091821c16602084019081526001909201546001600160a01b0316908301819052156112e057516004546111e1916001600160401b0316611982565b4211156112cd57815f52600260205260ff60405f2054166112ba576001600160401b0361120f915116612246565b90805f52600260205260405f20600160ff198254161790555f8080808560018060a01b03600554165af16112416119fd565b5015611299579060209160018060a01b0360055416907f5fab42dd23447bf0a6cc6638a8217a7d477b5067842aedf24b881e132c1c133d84604051858152a360015f51602061232e5f395f51905f5255604051908152f35b5060018060a01b0360055416631f89846360e21b5f5260045260245260445ffd5b506327d117f760e01b5f5260045260245ffd5b50631439fe2d60e01b5f5260045260245ffd5b82630fa254d360e21b5f526004525f60245260445ffd5b3461021a575f36600319011261021a576105a360206113e5600161133a7f00000000000000000000000000000000000000000000000000000000000000006120a1565b81846113657f00000000000000000000000000000000000000000000000000000000000000006120a1565b81806113907f00000000000000000000000000000000000000000000000000000000000000006120a1565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f19810183528261184e565b6040519182916020835260208301906116f2565b3461021a57602036600319011261021a576114126116c8565b61141a611ca0565b600580546001600160a01b0319166001600160a01b0392909216919091179055005b3461021a57608036600319011261021a576004356001600160401b03811161021a576060600319823603011261021a576114746116b2565b604435916001600160a01b0383169182840361021a575f6114b46114af9382936103e26064359687936040519283916004016020830161198f565b611cc6565b94604051826020820191633a9bb12760e21b8352866024820152886044820152604481526114e360648261184e565b51925af1916114f06119fd565b9215611549575050805181019060208183031261021a576020810151916001600160401b03831161021a5761152c926020809201920101611a62565b906105a360405192839283526040602084015260408301906116f2565b61157e8385604051948594630b836fc760e31b86526004860152602485015260448401526080606484015260848301906116f2565b0390fd5b3461021a57602036600319011261021a5760043561159e611ca0565b6001430180431161167b576003545f198101916001600160401b03169080831161167b57816001600160401b036115d485611716565b505416036115ee5750506115e9600191611716565b500155005b6040519250906115fd836117c6565b82526020820192835268010000000000000000811015611667578060016116279201600355611716565b929092611654576001600160401b03806001935116166001600160401b0319845416178355519101555f80f35b634e487b7160e01b5f525f60045260245ffd5b634e487b7160e01b5f52604160045260245ffd5b634e487b7160e01b5f52601160045260245ffd5b3461021a575f36600319011261021a576005546001600160a01b03168152602090f35b602435906001600160a01b038216820361021a57565b600435906001600160a01b038216820361021a57565b35906001600160a01b038216820361021a57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b6003548110156117325760035f5260205f209060011b01905f90565b634e487b7160e01b5f52603260045260245ffd5b9181601f8401121561021a578235916001600160401b03831161021a576020808501948460051b01011161021a57565b604060031982011261021a576004356001600160401b03811161021a57816117a091600401611746565b92909291602435906001600160401b03821161021a576117c291600401611746565b9091565b604081019081106001600160401b0382111761166757604052565b606081019081106001600160401b0382111761166757604052565b608081019081106001600160401b0382111761166757604052565b61014081019081106001600160401b0382111761166757604052565b60c081019081106001600160401b0382111761166757604052565b90601f801991011681019081106001600160401b0382111761166757604052565b35906001600160401b038216820361021a57565b6001600160401b03811161166757601f01601f191660200190565b9291926118aa82611883565b916118b8604051938461184e565b82948184528183011161021a578281602093845f960137010152565b9080601f8301121561021a578160206118ef9335910161189e565b90565b9181601f8401121561021a578235916001600160401b03831161021a576020838186019501011161021a57565b602081526060604061193c845183602086015260808501906116f2565b93602081015182850152015191015290565b602060031982011261021a57600435906001600160401b03821161021a5761014090829003600319011261021a5760040190565b9190820180921161167b57565b602081528135601e198336030181121561021a5782016020813591016001600160401b03821161021a57813603811361021a5760a0938260409260606020870152816080870152868601375f84840186015260208101358285015201356060830152601f01601f1916010190565b3d15611a27573d90611a0e82611883565b91611a1c604051938461184e565b82523d5f602084013e565b606090565b929192611a3882611883565b91611a46604051938461184e565b82948184528183011161021a578281602093845f96015e010152565b9080601f8301121561021a5781516118ef92602001611a2c565b5190811515820361021a57565b929092818403611b0a575f91345b85841015611aff5781841015611732578360051b8086013590828211611af05784013561013e198536030181121561021a57611ad49085016122ec565b15611ae55760019103930192611a97565b505050505050505f90565b63044044a560e21b5f5260045ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b60208101517f000000000000000000000000000000000000000000000000000000000000000003611c7c5760a081015160c0820180516101208401518051602091820120604080519283019586526001600160a01b03909316928201929092526060810191909152909190611b9181608081016103e2565b51902091825f52600160205260405f2091604051611bae816117e1565b83546001600160401b038082168352604091821c16602083019081526001909501546001600160a01b031690820181905215611c5657516001600160401b0316431115611c3157506001600160401b03806040611c149301511692511660045490611982565b10611c1f5750600190565b63b7c2dee760e01b5f5260045260245ffd5b516309e555e360e01b5f90815260048590526001600160a01b03909116602452604490fd5b8151630fa254d360e21b5f90815260048790526001600160a01b03909116602452604490fd5b505f90565b60405190611c8e826117e1565b5f604083606081528260208201520152565b5f546001600160a01b03163303611cb357565b63118cdaa760e01b5f523360045260245ffd5b919091611cd161220e565b7f00000000000000000000000000000000000000000000000000000000000000009160405193611d0085611833565b60018060a01b03168085525f60208601527f00000000000000000000000000000000000000000000000000000000000000001515928360408701528260608701528060808701525f60a08701526020604051611d5b816117c6565b8681528181019788526040518098819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611ddc608083015160c060e48601526101248501906116f2565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1958615610811575f9661206b575b50611ead9060405195611e3487611817565b87875260208701526001600160401b03421660408701525f60608701525f60808701528360a087015260c08601948386523060e08801526101008701528061012087015260208151910120916103e26040519384926020840196876040919493926060820195825260018060a01b031660208201520152565b51902091825f52600160205260405f2060405190611eca826117e1565b80546001600160401b038082168452604091821c16602084019081526001909201546001600160a01b0316908301818152949015612046576001600160401b03835116431115612021575051600454611f2b916001600160401b0316611982565b421161200e57835f52600260205260ff60405f205416611ffb576001600160401b03611f58915116612246565b925f52600260205260405f20600160ff198254161790555f8080808660018060a01b038751165af1611f886119fd565b5015611fdb575190516040519283526001600160a01b0316917fa9b8d1cb23fc6bfcae1f7ed8ec77868451af44dde191688baa93bb00b7ee491790602090a39060015f51602061232e5f395f51905f5255565b5060018060a01b03905116638fdb80a360e01b5f5260045260245260445ffd5b836327d117f760e01b5f5260045260245ffd5b8363b7c2dee760e01b5f5260045260245ffd5b516309e555e360e01b5f90815260048790526001600160a01b03909116602452604490fd5b51630fa254d360e21b5f90815260048790526001600160a01b03909116602452604490fd5b9095506020813d602011612099575b816120876020938361184e565b8101031261021a575194611ead611e22565b3d915061207a565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8210156121eb575b806d04ee2d6d415b85acef8100000000600a9210156121d0575b662386f26fc100008110156121bc575b6305f5e1008110156121ab575b61271081101561219c575b606481101561218e575b1015612183575b600a6021600184019361212885611883565b94612136604051968761184e565b808652612145601f1991611883565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a835304801561217e57600a9091612150565b505090565b600190910190612116565b60646002910493019261210f565b61271060049104930192612105565b6305f5e100600891049301926120fa565b662386f26fc10000601091049301926120ed565b6d04ee2d6d415b85acef8100000000602091049301926120dd565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b81046120c3565b60025f51602061232e5f395f51905f5254146122375760025f51602061232e5f395f51905f5255565b633ee5aeb560e01b5f5260045ffd5b90600354805b612254575f80fd5b5f19810181811161167b5761226a602091611716565b50604051612277816117c6565b60016001600160401b0383541692838352015492839101528410156122a65750801561167b575f19018061224c565b925050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633036122dd57565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361021a57301490565b51906001600160401b038216820361021a57565b51906001600160a01b038216820361021a5756fe9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00a2646970667358221220a2c6bd123204b3a9dd6615a71f2e80a0046404ae6fc3c04bdd3a28aaa7f1817564736f6c634300081b0033",
    "sourceMap": "1138:12853:117:-:0;;;;;;;;;;-1:-1:-1;1138:12853:117;;;;;;;;;1183:12:9;;;1054:5;1183:12;1138:12853:117;1054:5:9;1183:12;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;:::i;:::-;1500:62:33;;:::i;:::-;-1:-1:-1;;;;;1138:12853:117;2627:22:33;;2623:91;;1138:12853:117;;;-1:-1:-1;;;;;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;3052:40:33;;1138:12853:117;3052:40:33;1138:12853:117;2623:91:33;2672:31;;;1138:12853:117;2672:31:33;1138:12853:117;;;;;2672:31:33;1138:12853:117;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;9336:24;;9332:54;;13507:32;13526:12;13507:32;:::i;:::-;9449:9;;:29;9445:90;;-1:-1:-1;1138:12853:117;;;;;;;;;;;;;9550:33;1138:12853;-1:-1:-1;;;;;1138:12853:117;9546:120;;1138:12853;;;;;:::i;:::-;-1:-1:-1;;;;;13526:12:117;1138:12853;;;;;9702:134;;9786:15;-1:-1:-1;;;;;9786:15:117;1138:12853;;;;9702:134;;9815:10;;1138:12853;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;-1:-1:-1;;;1138:12853:117;;;;;;;-1:-1:-1;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;9815:10;9852:33;;1138:12853;9852:33;;1138:12853;9546:120;9620:35;;;1138:12853;9620:35;1138:12853;;;;9620:35;9445:90;9487:48;;;1138:12853;9487:48;9449:9;1138:12853;;;;;;9487:48;9332:54;9369:17;;;1138:12853;9369:17;1138:12853;;9369:17;1138:12853;;3045:39:9;1138:12853:117;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;:::-;1138:12853:117;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;10156:56;;1138:12853;;;;10194:16;;;;;;1138:12853;;;10194:16;;:::i;:::-;;6829;;10194;;;;;;:::i;:::-;1138:12853;10184:27;;1138:12853;;;;;10156:56;;;1138:12853;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;10156:56;1138:12853;10146:67;;1138:12853;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;13627:10;1138:12853;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;;2033:49;1138:12853;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;1055:12:85;5407:16:117;;1138:12853;;;;;;;;;5407:16;;;;:::i;:::-;1138:12853;;5476:10;;1055:12:85;;:::i;:::-;1138:12853:117;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;13391:34;;1138:12853;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2679:23:82;;1138:12853:117;;;2679:23:82;;1138:12853:117;;;2679:23:82;1138:12853:117;;;;;;2679:3:82;1138:12853:117;2679:23:82;;;;;;;1138:12853:117;2679:23:82;;;1138:12853:117;2716:19:82;1138:12853:117;2716:19:82;;1138:12853:117;2739:18:82;2716:41;2712:100;;1138:12853:117;13229:16;;1138:12853;;13218:46;;1138:12853;;;;;;;;;13218:46;;1138:12853;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;13218:46;1138:12853;13218:46;1138:12853;13218:46;;1138:12853;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;2712:100:82:-;2780:21;;;1138:12853:117;2780:21:82;1138:12853:117;;2780:21:82;2679:23;;;;;1138:12853:117;2679:23:82;;;;;;:::i;:::-;;;1138:12853:117;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;:::i;:::-;;;;;2679:23:82;;;;1138:12853:117;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;773:50:82;1138:12853:117;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;:::i;:::-;1055:12:85;2989:103:67;;:::i;:::-;2185:18:82;1138:12853:117;;;;;;;:::i;:::-;846:10:85;1138:12853:117;;2227:295:82;1138:12853:117;2227:295:82;;1138:12853:117;2377:28:82;1138:12853:117;;2227:295:82;;1138:12853:117;2227:295:82;;1138:12853:117;2227:295:82;1138:12853:117;2227:295:82;;1138:12853:117;2227:295:82;;;;1138:12853:117;;2227:295:82;;;1138:12853:117;;;;;;;:::i;:::-;;;;2140:397:82;;;1138:12853:117;;;;;;;;;;;;2116:431:82;;;1138:12853:117;2116:431:82;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;2227:295:82;1138:12853:117;2227:295:82;1138:12853:117;;;;;;;;;;;;;:::i;:::-;;;;;;;;2116:431:82;1138:12853:117;;2116:3:82;-1:-1:-1;;;;;1138:12853:117;2116:431:82;;;;;;;1138:12853:117;2116:431:82;;;1138:12853:117;;7533:82;1138:12853;7533:82;1138:12853;;;;;;;:::i;:::-;;;;;1226:424:85;;1138:12853:117;-1:-1:-1;;;;;1340:15:85;1138:12853:117;;1226:424:85;;1138:12853:117;;1226:424:85;;1138:12853:117;;2227:295:82;1226:424:85;;1138:12853:117;1226:424:85;2227:295:82;1226:424:85;;1138:12853:117;;1226:424:85;;846:10;;1138:12853:117;;1545:4:85;1138:12853:117;1226:424:85;;1138:12853:117;1226:424:85;;;1138:12853:117;1226:424:85;;;;1138:12853:117;;;;;;7587:27;1138:12853;;7533:82;;;1138:12853;7533:82;;846:10:85;;7533:82:117;;1138:12853;;;;;;;;;;;;;;;;;;;;;;;;7533:82;1138:12853;7523:93;;1138:12853;;;;7652:11;1138:12853;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;7652:11;1138:12853;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;7731:28;7727:126;;-1:-1:-1;;;;;1138:12853:117;;;7952:12;-1:-1:-1;7932:32:117;7928:132;;-1:-1:-1;1138:12853:117;;;8138:46;;-1:-1:-1;;;;;1138:12853:117;8138:46;:::i;:::-;1340:15:85;8120:64:117;8116:135;;1138:12853;;;8324:17;1138:12853;;;;;;;;8320:113;;-1:-1:-1;;;;;8495:36:117;1138:12853;;;8495:36;:::i;:::-;1138:12853;;;8324:17;1138:12853;;;;;7652:11;1138:12853;;;;;;;;;;;;;;;;;;;;;8614:38;;;;:::i;:::-;;8666:8;8662:63;;8741:54;1138:12853;;;;;;;;;;;;;;;;;;;8741:54;7652:11;-1:-1:-1;;;;;;;;;;;1138:12853:117;;;;;;;8662:63;1138:12853;;;;;;;;8683:42;;;1138:12853;8683:42;1138:12853;;;;;;8683:42;8320:113;12503:30;;;;1138:12853;8384:38;1138:12853;;;;8384:38;8116:135;8207:33;;;;1138:12853;8207:33;1138:12853;;;;8207:33;7928:132;1138:12853;-1:-1:-1;;;1138:12853:117;7987:62;;;1138:12853;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;7987:62;7727:126;1138:12853;-1:-1:-1;;;1138:12853:117;7782:60;;;1138:12853;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;7782:60;2116:431:82;;;;1138:12853:117;2116:431:82;;1138:12853:117;2116:431:82;;;;;;1138:12853:117;2116:431:82;;;:::i;:::-;;;1138:12853:117;;;;;;7533:82;2116:431:82;;;;;-1:-1:-1;2116:431:82;;1138:12853:117;;;;;;-1:-1:-1;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;1055:12:85;6264:16:117;1138:12853;;6264:16;1138:12853;;:::i;:::-;;;;;;;;;6264:16;;;;:::i;:::-;;6829;;6264;;;;;;:::i;:::-;1138:12853;;1055:12:85;;:::i;1138:12853:117:-;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;;;;;;;;;1442:1461:9;1138:12853:117;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;1138:12853:117:-;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;1898:49;;1138:12853;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;13507:32;13526:12;13507:32;:::i;1138:12853::-;;;;;;-1:-1:-1;;1138:12853:117;;;;1500:62:33;;:::i;:::-;1138:12853:117;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;1500:62:33;;:::i;:::-;1138:12853:117;;;-1:-1:-1;;;;;;1138:12853:117;;;;-1:-1:-1;;;;;1138:12853:117;3052:40:33;1138:12853:117;;3052:40:33;1138:12853:117;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1852:44:82;;1877:18;1138:12853:117;1852:44:82;;1138:12853:117;;;1852:44:82;1138:12853:117;;;;;;1852:14:82;1138:12853:117;1852:44:82;;;;;;1138:12853:117;1852:44:82;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1852:44:82:-;;;;1138:12853:117;1852:44:82;;;;;;:::i;:::-;;;1138:12853:117;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1852:44:82;;1138:12853:117;;;;;;-1:-1:-1;;1138:12853:117;;;;;;3117:29;1138:12853;3117:29;;;;;;1138:12853;3117:29;;:::i;:::-;1138:12853;;-1:-1:-1;;;;;1138:12853:117;;;3117:29;;1138:12853;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;724:43:82;1138:12853:117;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;2989:103:67;;:::i;:::-;1138:12853:117;;;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;12234:28;12230:82;;1138:12853;;;12345:37;;-1:-1:-1;;;;;1138:12853:117;12345:37;:::i;:::-;12326:15;:56;;12322:130;;1138:12853;;;12465:17;1138:12853;;;;;;;;12461:72;;-1:-1:-1;;;;;12553:36:117;1138:12853;;;12553:36;:::i;:::-;1138:12853;;;;12465:17;1138:12853;;;;;;;;;;;;;;;;;;;;;;;;12664:20;1138:12853;;12664:44;;;;:::i;:::-;;12722:8;12718:70;;1138:12853;;;;;;;;12664:20;1138:12853;;;12804:53;1138:12853;;;;;;12804:53;1138:12853;-1:-1:-1;;;;;;;;;;;1138:12853:117;;;;;;;12718:70;1138:12853;;;;;;12664:20;1138:12853;;12739:49;;;1138:12853;12739:49;1138:12853;;;;;;12739:49;12461:72;12503:30;;;;1138:12853;12503:30;1138:12853;;;;12503:30;12322:130;12405:36;;;;1138:12853;12405:36;1138:12853;;;;12405:36;12230:82;12271:41;;;;1138:12853;12271:41;1138:12853;;;;;;;12271:41;1138:12853;;;;;;-1:-1:-1;;1138:12853:117;;;;;1055:104:6;;1138:12853:117;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;1138:12853:117;;;;;;;;;;;;1055:104:6;;;1138:12853:117;;;;-1:-1:-1;;;1138:12853:117;;;;;;;;;;;;;;;;;-1:-1:-1;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;1055:104:6;;6829:16:117;;1055:104:6;;;;;;:::i;:::-;1138:12853:117;;;;;1055:104:6;1138:12853:117;;1055:104:6;1138:12853:117;;;;:::i;:::-;;;;;;-1:-1:-1;;1138:12853:117;;;;;;:::i;:::-;1500:62:33;;:::i;:::-;4670:44:117;1138:12853;;-1:-1:-1;;;;;;1138:12853:117;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;1055:12:85;6829:16:117;1138:12853;;;6829:16;1138:12853;;;;;;;;;;;;;6829:16;;;:::i;:::-;1055:12:85;:::i;:::-;1138:12853:117;;;7010:78;1138:12853;7010:78;;;;;;;;;1138:12853;7010:78;;1138:12853;;;;;;;7010:78;;;1138:12853;7010:78;;:::i;:::-;6990:99;;;;;;;:::i;:::-;7103:8;;7099:94;;1138:12853;;;;7220:27;;1138:12853;;;;;;;;;7220:27;;1138:12853;;-1:-1:-1;;;;;1138:12853:117;;;;;7220:27;1138:12853;7220:27;;;1138:12853;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;7099:94::-;1138:12853;;;;;7120:73;;;;;;;;1138:12853;7120:73;;1138:12853;;;;;;;;;;;;;;;;;;;:::i;:::-;7120:73;;;1138:12853;;;;;;-1:-1:-1;;1138:12853:117;;;;;;1500:62:33;;:::i;:::-;1138:12853:117;4138:12;1138:12853;4138:12;;1138:12853;;;4185:10;1138:12853;-1:-1:-1;;1138:12853:117;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;4220:21;-1:-1:-1;;;;;4220:21:117;;;:::i;:::-;-1:-1:-1;1138:12853:117;;4220:46;1138:12853;;4282:21;;;1138:12853;4282:21;;:::i;:::-;-1:-1:-1;4282:28:117;1138:12853;;4216:223;1138:12853;;;-1:-1:-1;1138:12853:117;;;;:::i;:::-;;;;4371:56;;1138:12853;;;;;;;;;;;;;;4185:10;1138:12853;;:::i;:::-;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;3342:35;1138:12853;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;:::o;:::-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;1138:12853:117;;;;;;;;-1:-1:-1;;1138:12853:117;;;;:::o;:::-;4185:10;1138:12853;;;;;;4185:10;-1:-1:-1;1138:12853:117;;-1:-1:-1;1138:12853:117;;;;;;-1:-1:-1;1138:12853:117;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;1138:12853:117;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;:::o;:::-;;;6829:16;;1138:12853;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;:::o;:::-;-1:-1:-1;;;;;1138:12853:117;;;;;;-1:-1:-1;;1138:12853:117;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;1138:12853:117;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;1138:12853:117;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1138:12853:117;;;;:::o;:::-;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;-1:-1:-1;1138:12853:117;;;;:::o;:::-;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;1138:12853:117;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;1138:12853:117;;;;;;;;;;;;;4064:22:9;;;;4060:87;;1138:12853:117;;;;;;;;;;;;;;4274:33:9;1138:12853:117;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;1138:12853:117;;3896:19:9;1138:12853:117;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;3884:10;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;10462:1257:117;10777:17;;;1138:12853;10798:18;10777:39;10773:57;;10960:17;;;1138:12853;10979:20;;;1138:12853;;11011:15;;;;1138:12853;;10777:17;1138:12853;;;11001:26;1138:12853;;;10949:79;;;1138:12853;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;10979:20;;10949:79;;1138:12853;-1:-1:-1;1138:12853:117;;10949:79;1138:12853;10949:79;1138:12853;10939:90;;1138:12853;;;;11064:11;10777:17;1138:12853;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;10777:17;1138:12853;;;;;11064:11;1138:12853;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;11109:28;11105:125;;1138:12853;-1:-1:-1;;;;;1138:12853:117;11328:12;-1:-1:-1;11308:32:117;11304:131;;11569:15;-1:-1:-1;;;;;11569:15:117;1138:12853;11587:37;11569:15;;1138:12853;;;;;11610:14;1138:12853;11587:37;;:::i;:::-;-1:-1:-1;11565:126:117;;11701:11;11064;10462:1257;:::o;11565:126::-;8207:33;;;1138:12853;11647:33;11610:14;1138:12853;;;11647:33;11304:131;1138:12853;-1:-1:-1;;;1138:12853:117;11363:61;;;;1138:12853;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;11363:61;11105:125;1138:12853;;-1:-1:-1;;;1138:12853:117;11160:59;;;;1138:12853;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;11160:59;10773:57;10818:12;1138:12853;10818:12;:::o;1138:12853::-;;;;;;;:::i;:::-;-1:-1:-1;1138:12853:117;;;;;;;;;;;;:::o;1796:162:33:-;1710:6;1138:12853:117;-1:-1:-1;;;;;1138:12853:117;735:10:62;1855:23:33;1851:101;;1796:162::o;1851:101::-;1901:40;;;1710:6;1901:40;735:10:62;1901:40:33;1138:12853:117;;1710:6:33;1901:40;2989:103:67;;;;;;:::i;:::-;2185:18:82;1138:12853:117;;;;;;;:::i;:::-;;;;;;;;;;;2227:295:82;;;1138:12853:117;2377:28:82;1138:12853:117;;2227:295:82;;1138:12853:117;2227:295:82;;1138:12853:117;2227:295:82;;;;1138:12853:117;2227:295:82;;;;1138:12853:117;;2227:295:82;;;1138:12853:117;2227:295:82;1138:12853:117;;;;;:::i;:::-;;;;2140:397:82;;;1138:12853:117;;;;;;;;;;;;2116:431:82;;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;;;;;;2227:295:82;1138:12853:117;;;;;;;2227:295:82;1138:12853:117;2227:295:82;1138:12853:117;;;;;;;;;;;;;:::i;:::-;;;;;;;;2116:431:82;1138:12853:117;;2116:3:82;-1:-1:-1;;;;;1138:12853:117;2116:431:82;;;;;;;1138:12853:117;2116:431:82;;;2989:103:67;1138:12853:117;7533:82;1138:12853;;;;;;;:::i;:::-;;;;2227:295:82;1226:424:85;;1138:12853:117;-1:-1:-1;;;;;1340:15:85;1138:12853:117;;1226:424:85;;1138:12853:117;;2227:295:82;1226:424:85;;1138:12853:117;;2227:295:82;1226:424:85;;1138:12853:117;1226:424:85;2227:295:82;1226:424:85;;1138:12853:117;;1226:424:85;;1138:12853:117;;;;1545:4:85;1138:12853:117;1226:424:85;;1138:12853:117;1226:424:85;;;1138:12853:117;1226:424:85;;;;1138:12853:117;2227:295:82;1138:12853:117;;;;7587:27;1138:12853;7533:82;1138:12853;;7533:82;;;2227:295:82;7533:82:117;;;;1138:12853;;;;;;;;;;;;;;;;;;;;;;;;7533:82;1138:12853;7523:93;;1138:12853;;;;7652:11;2227:295:82;1138:12853:117;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;2227:295:82;1138:12853:117;;;;;7652:11;1138:12853;;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;7731:28;7727:126;;-1:-1:-1;;;;;1138:12853:117;;;7952:12;-1:-1:-1;7932:32:117;7928:132;;-1:-1:-1;1138:12853:117;2116:431:82;1138:12853:117;8138:46;;-1:-1:-1;;;;;1138:12853:117;8138:46;:::i;:::-;1340:15:85;8120:64:117;8116:135;;1138:12853;;;8324:17;2227:295:82;1138:12853:117;;;;;;;8320:113;;-1:-1:-1;;;;;8495:36:117;1138:12853;;;8495:36;:::i;:::-;1138:12853;;;8324:17;2227:295:82;1138:12853:117;;;;7652:11;1138:12853;;;;;;;;;;;;;;;;;;;;;8614:38;;;;:::i;:::-;;8666:8;8662:63;;1138:12853;;;;;;;;-1:-1:-1;;;;;1138:12853:117;;8741:54;;2227:295:82;;8741:54:117;1138:12853;7652:11;-1:-1:-1;;;;;;;;;;;1138:12853:117;2989:103:67:o;8662:63:117:-;1138:12853;;;;;;;;;8683:42;;;1138:12853;8683:42;2116:431:82;1138:12853:117;;;;;8683:42;8320:113;12503:30;;;;1138:12853;8384:38;2116:431:82;1138:12853:117;;;8384:38;8116:135;8207:33;;;;1138:12853;8207:33;2116:431:82;1138:12853:117;;;8207:33;7928:132;1138:12853;-1:-1:-1;;;1138:12853:117;7987:62;;;2116:431:82;1138:12853:117;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;7987:62;7727:126;1138:12853;-1:-1:-1;;;1138:12853:117;7782:60;;;2116:431:82;1138:12853:117;;;-1:-1:-1;;;;;1138:12853:117;;;;;;;7782:60;2116:431:82;;;;2227:295;2116:431;;2227:295;2116:431;;;;;;2227:295;2116:431;;;:::i;:::-;;;1138:12853:117;;;;;;7533:82;2116:431:82;;;;;-1:-1:-1;2116:431:82;;1343:634:71;1465:17;-1:-1:-1;29298:17:78;-1:-1:-1;;;29298:17:78;;;29294:103;;1343:634:71;29414:17:78;29423:8;29994:7;29414:17;;;29410:103;;1343:634:71;29539:8:78;29530:17;;;29526:103;;1343:634:71;29655:7:78;29646:16;;;29642:100;;1343:634:71;29768:7:78;29759:16;;;29755:100;;1343:634:71;29881:7:78;29872:16;;;29868:100;;1343:634:71;29985:16:78;;29981:66;;1343:634:71;29994:7:78;1580:94:71;1485:1;1138:12853:117;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;6829:16;;1138:12853;;:::i;:::-;;;;;;;1580:94:71;;;1687:247;-1:-1:-1;;1138:12853:117;;-1:-1:-1;;;1741:111:71;;;;1138:12853:117;1741:111:71;1138:12853:117;1902:10:71;;1898:21;;29994:7:78;1687:247:71;;;;1898:21;1914:5;;1343:634;:::o;29981:66:78:-;30031:1;1138:12853:117;;;;29981:66:78;;29868:100;29881:7;29952:1;1138:12853:117;;;;29868:100:78;;;29755;29768:7;29839:1;1138:12853:117;;;;29755:100:78;;;29642;29655:7;29726:1;1138:12853:117;;;;29642:100:78;;;29526:103;29539:8;29612:2;1138:12853:117;;;;29526:103:78;;;29410;29423:8;29496:2;1138:12853:117;;;;29410:103:78;;;29294;-1:-1:-1;29380:2:78;;-1:-1:-1;;;;1138:12853:117;;29294:103:78;;3749:292:67;2407:1;-1:-1:-1;;;;;;;;;;;1138:12853:117;4560:63:67;3644:93;;2407:1;-1:-1:-1;;;;;;;;;;;1138:12853:117;3749:292:67:o;3644:93::-;3696:30;;;-1:-1:-1;3696:30:67;;-1:-1:-1;3696:30:67;13657:332:117;;13765:10;1138:12853;13748:217;13784:5;;;1138:12853;13974:8;;13791:3;-1:-1:-1;;1138:12853:117;;;;;;;13835:17;1138:12853;13835:17;;:::i;:::-;1138:12853;;;;;;:::i;:::-;13850:1;-1:-1:-1;;;;;1138:12853:117;;;;;;;;;;;;;;13870:31;;;13866:89;;13791:3;1138:12853;;;;-1:-1:-1;;1138:12853:117;;13753:29;;13866:89;13921:19;-1:-1:-1;;13921:19:117:o;6040:128:9:-;6109:4;-1:-1:-1;;;;;1138:12853:117;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1493:271:82;1720:20;;1138:12853:117;;;;;;;;;;;;;1752:4:82;1720:37;1493:271;:::o;1138:12853:117:-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;:::o;:::-;;;-1:-1:-1;;;;;1138:12853:117;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "2532": [
        {
          "start": 4886,
          "length": 32
        }
      ],
      "2534": [
        {
          "start": 4929,
          "length": 32
        }
      ],
      "2536": [
        {
          "start": 4972,
          "length": 32
        }
      ],
      "3008": [
        {
          "start": 8877,
          "length": 32
        }
      ],
      "56213": [
        {
          "start": 4027,
          "length": 32
        }
      ],
      "56216": [
        {
          "start": 1578,
          "length": 32
        },
        {
          "start": 2498,
          "length": 32
        },
        {
          "start": 7658,
          "length": 32
        }
      ],
      "56218": [
        {
          "start": 1634,
          "length": 32
        },
        {
          "start": 2227,
          "length": 32
        },
        {
          "start": 3977,
          "length": 32
        },
        {
          "start": 4413,
          "length": 32
        },
        {
          "start": 6944,
          "length": 32
        },
        {
          "start": 7379,
          "length": 32
        }
      ],
      "56220": [
        {
          "start": 2099,
          "length": 32
        },
        {
          "start": 2283,
          "length": 32
        },
        {
          "start": 7443,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "ATTESTATION_SCHEMA_REVOCABLE()": "b587a5eb",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "bondAmount()": "80f323a7",
    "bondEpochCount()": "d825c0a0",
    "bondEpochs(uint256)": "6605239e",
    "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "8da3721a",
    "commit(bytes32)": "f14fcbc8",
    "commitDeadline()": "a2ff0209",
    "commitmentClaimed(bytes32)": "d4e063dd",
    "commitments(bytes32)": "839df945",
    "computeCommitment(bytes32,address,(bytes,bytes32,bytes32))": "da18dc78",
    "decodeObligationData(bytes)": "c93844be",
    "doObligation((bytes,bytes32,bytes32),bytes32)": "cd95b7b9",
    "doObligationFor((bytes,bytes32,bytes32),address,bytes32)": "a50a2162",
    "doObligationRaw(bytes,uint64,bytes32)": "b3b902d4",
    "getObligationData(bytes32)": "c6ec5070",
    "getSchema()": "6b122fe0",
    "isPayable()": "ce46e046",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "owner()": "8da5cb5b",
    "renounceOwnership()": "715018a6",
    "revealAndCollect((bytes,bytes32,bytes32),address,address,bytes32)": "2cfea7ce",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "setBondAmount(uint256)": "28f9f3e6",
    "setCommitDeadline(uint256)": "7224760e",
    "setSlashedBondRecipient(address)": "3d447265",
    "slashBond(bytes32)": "571573ce",
    "slashedBondRecipient()": "1f04b6b6",
    "transferOwnership(address)": "f2fde38b",
    "version()": "54fd4d50"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"},{\"internalType\":\"contract ISchemaRegistry\",\"name\":\"_schemaRegistry\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_bondAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_commitDeadline\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_slashedBondRecipient\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AccessDenied\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"}],\"name\":\"BondAlreadyClaimed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"BondTransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"}],\"name\":\"CommitDeadlineNotReached\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"}],\"name\":\"CommitmentAlreadyExists\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"}],\"name\":\"CommitmentMissing\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"}],\"name\":\"CommitmentTooRecent\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"EmptyCommitment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"escrowContract\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"fulfillmentUid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"result\",\"type\":\"bytes\"}],\"name\":\"EscrowCollectionFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"provided\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"required\",\"type\":\"uint256\"}],\"name\":\"IncorrectBondAmount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientValue\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidEAS\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidLength\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotFromThisAttester\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayable\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"}],\"name\":\"RevealTooLate\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"SchemaRegistrationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"SlashTransferFailed\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"obligationUid\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"BondReclaimed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"BondSlashed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"}],\"name\":\"Committed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"ATTESTATION_SCHEMA_REVOCABLE\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"attest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"bondAmount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"bondEpochCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"bondEpochs\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"startBlock\",\"type\":\"uint64\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"check\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"}],\"name\":\"commit\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"commitDeadline\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"commitmentClaimed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"commitments\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"commitBlock\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"commitTimestamp\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"committer\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"payload\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"salt\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"}],\"internalType\":\"struct GlobalBondCommitRevealObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"}],\"name\":\"computeCommitment\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"payload\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"salt\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"}],\"internalType\":\"struct GlobalBondCommitRevealObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"payload\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"salt\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"}],\"internalType\":\"struct GlobalBondCommitRevealObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligation\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"payload\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"salt\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"}],\"internalType\":\"struct GlobalBondCommitRevealObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"}],\"name\":\"doObligationRaw\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid_\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"}],\"name\":\"getObligationData\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"payload\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"salt\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"}],\"internalType\":\"struct GlobalBondCommitRevealObligation.ObligationData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getSchema\",\"outputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"contract ISchemaResolver\",\"name\":\"resolver\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"schema\",\"type\":\"string\"}],\"internalType\":\"struct SchemaRecord\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isPayable\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiAttest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation[]\",\"name\":\"attestations\",\"type\":\"tuple[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"multiRevoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"payload\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"salt\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"}],\"internalType\":\"struct GlobalBondCommitRevealObligation.ObligationData\",\"name\":\"data\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"escrowContract\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"}],\"name\":\"revealAndCollect\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"fulfillmentUid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"collectResult\",\"type\":\"bytes\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"name\":\"revoke\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_bondAmount\",\"type\":\"uint256\"}],\"name\":\"setBondAmount\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_commitDeadline\",\"type\":\"uint256\"}],\"name\":\"setCommitDeadline\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_slashedBondRecipient\",\"type\":\"address\"}],\"name\":\"setSlashedBondRecipient\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"commitment\",\"type\":\"bytes32\"}],\"name\":\"slashBond\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"slashedBondRecipient\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"OwnableInvalidOwner(address)\":[{\"details\":\"The owner is not a valid owner account. (eg. `address(0)`)\"}],\"OwnableUnauthorizedAccount(address)\":[{\"details\":\"The caller account is not authorized to perform an operation.\"}],\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The new attestation.\"},\"returns\":{\"_0\":\"Whether the attestation is valid.\"}},\"commit(bytes32)\":{\"details\":\"msg.value must equal the active `bondAmount()` and is held as a bond reclaimable after a valid reveal.\",\"params\":{\"commitment\":\"keccak256(abi.encode(refUID, claimer, keccak256(abi.encode(data)))).\"}},\"doObligation((bytes,bytes32,bytes32),bytes32)\":{\"params\":{\"data\":\"Revealed data (must match a prior commit) and salt.\",\"refUID\":\"Escrow attestation UID being fulfilled.\"}},\"doObligationFor((bytes,bytes32,bytes32),address,bytes32)\":{\"params\":{\"data\":\"Revealed data (must match a prior commit) and salt.\",\"recipient\":\"The address to set as the attestation recipient.\",\"refUID\":\"Escrow attestation UID being fulfilled.\"}},\"isPayable()\":{\"returns\":{\"_0\":\"Whether the resolver supports ETH transfers.\"}},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The new attestations.\",\"values\":\"Explicit ETH amounts which were sent with each attestation.\"},\"returns\":{\"_0\":\"Whether all the attestations are valid.\"}},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"params\":{\"attestations\":\"The existing attestations to be revoked.\",\"values\":\"Explicit ETH amounts which were sent with each revocation.\"},\"returns\":{\"_0\":\"Whether the attestations can be revoked.\"}},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.\"},\"revealAndCollect((bytes,bytes32,bytes32),address,address,bytes32)\":{\"details\":\"Uses a low-level call so it can support escrow contracts with      different collect return types.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"params\":{\"attestation\":\"The existing attestation to be revoked.\"},\"returns\":{\"_0\":\"Whether the attestation can be revoked.\"}},\"slashBond(bytes32)\":{\"params\":{\"commitment\":\"The commitment hash whose bond is being slashed.\"}},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"},\"version()\":{\"returns\":{\"_0\":\"Semver contract version as a string.\"}}},\"title\":\"GlobalBondCommitRevealObligation\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation and verifies whether it's valid.\"},\"bondEpochs(uint256)\":{\"notice\":\"Bond amount epochs. Updates take effect starting the next block.\"},\"commit(bytes32)\":{\"notice\":\"Records a commitment hash, locking the fixed bond.\"},\"commitDeadline()\":{\"notice\":\"Seconds after commit within which the reveal must occur to avoid slashing.\"},\"commitmentClaimed(bytes32)\":{\"notice\":\"commitmentClaimed[commitment] => bond already returned/slashed.\"},\"commitments(bytes32)\":{\"notice\":\"commitments[commitment] => commit information.\"},\"computeCommitment(bytes32,address,(bytes,bytes32,bytes32))\":{\"notice\":\"Pure helper to compute the commitment expected by this contract.\"},\"doObligation((bytes,bytes32,bytes32),bytes32)\":{\"notice\":\"Creates a fulfillment attestation containing the payload and salt.         Validates the commitment, enforces the reveal deadline, and         atomically returns the bond to the committer.\"},\"doObligationFor((bytes,bytes32,bytes32),address,bytes32)\":{\"notice\":\"Creates a fulfillment attestation with a specified recipient.         Use when the attestation recipient must differ from msg.sender,         e.g. when the recipient is a splitter contract that needs to         collect the escrow. The commitment must have been computed         with the recipient address as the claimer.\"},\"isPayable()\":{\"notice\":\"Checks if the resolver can be sent ETH.\"},\"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes multiple attestations and verifies whether they are valid.\"},\"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])\":{\"notice\":\"Processes revocation of multiple attestation and verifies they can be revoked.\"},\"revealAndCollect((bytes,bytes32,bytes32),address,address,bytes32)\":{\"notice\":\"Reveals a fulfillment and immediately collects the target escrow.\"},\"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))\":{\"notice\":\"Processes an attestation revocation and verifies if it can be revoked.\"},\"slashBond(bytes32)\":{\"notice\":\"Slashes the bond for a commitment whose deadline has passed without a valid reveal.\"},\"slashedBondRecipient()\":{\"notice\":\"Recipient of slashed bonds (address(0) = burn).\"},\"version()\":{\"notice\":\"Returns the full semver contract version.\"}},\"notice\":\"Obligation with built-in commit\\u2013reveal anti-front\\u2011running checks. The attestation data is self contained (payload + salt), and the arbiter verifies that a matching commit exists and was made in an earlier block. Bond lifecycle:   1. `commit()` \\u2014 locks a bond and records the commitment hash.   2. `doObligation()` (reveal) \\u2014 creates the fulfillment attestation,      validates the commitment, enforces the deadline, and atomically      returns the bond to the committer.   3. `slashBond()` \\u2014 after the deadline, anyone can slash the bond of      a commitment that was never revealed (bond not already reclaimed).\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/GlobalBondCommitRevealObligation.sol\":\"GlobalBondCommitRevealObligation\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/access/Ownable.sol\":{\"keccak256\":\"0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8ed324d3920bb545059d66ab97d43e43ee85fd3bd52e03e401f020afb0b120f6\",\"dweb:/ipfs/QmfEckWLmZkDDcoWrkEvMWhms66xwTLff9DDhegYpvHo1a\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Context.sol\":{\"keccak256\":\"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12\",\"dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0x6cfee8e96c8c2857b3ce8cabc516b3f3173edcff6d142501b9a7bbee18c2864d\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://33ebe7c68da275c7d60662e88b2bf83db98ed3ca792dee2d706397ad2e59a5ea\",\"dweb:/ipfs/QmUdkGtifdibK57dxKoqDYJj6Kmtn4D1opr7gi5EdEdj51\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0x468c5d4cd6c0c1251f5923a471d8ccfb5c1ca3cf2a0b173257d43c2510438c30\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b6733d3bc75b27e1ffab1c11f6dbe5713bd7cd26202f97f9835fc8754edde84e\",\"dweb:/ipfs/Qmeb9mcDXE1mNsbyL3WGhA1WcL3c1Rr2J99PiC4aGLuHif\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x60c3517336022ba2e637a7614c05c264c4a896a13eee19f28abd705d53cbfae5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d54682c0f79f53ea184a0b03ae8986ae53453194005d6db2508c4e7941c5757b\",\"dweb:/ipfs/QmaRFve7sohhfW1ZQBHEJEeBGC5C4N9BLGGEETpMpoUxBx\"]},\"src/SchemaRegistryUtils.sol\":{\"keccak256\":\"0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600\",\"dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B\"]},\"src/obligations/GlobalBondCommitRevealObligation.sol\":{\"keccak256\":\"0x968a4bec409cba3e322e39e7613d44084f8f258078e03db1ccc0ccbce9b0d2e7\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://cd464bb3f1f6a3f81cf89312caefe70f3ea4f756cc1f4e198e3e3c252d8b0fc8\",\"dweb:/ipfs/QmNSmC2SqiLMnCUWTBPbWt8LYP1AZZNAv61sXMFyRKpAGe\"]}},\"version\":1}",
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
            },
            {
              "internalType": "uint256",
              "name": "_bondAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_commitDeadline",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_slashedBondRecipient",
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
              "name": "commitment",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "BondAlreadyClaimed"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "claimer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "BondTransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "commitment",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "CommitDeadlineNotReached"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "commitment",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "CommitmentAlreadyExists"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "commitment",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "claimer",
              "type": "address"
            }
          ],
          "type": "error",
          "name": "CommitmentMissing"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "commitment",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "claimer",
              "type": "address"
            }
          ],
          "type": "error",
          "name": "CommitmentTooRecent"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "EmptyCommitment"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "escrowContract",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "escrowUid",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "fulfillmentUid",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "result",
              "type": "bytes"
            }
          ],
          "type": "error",
          "name": "EscrowCollectionFailed"
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
              "name": "required",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "IncorrectBondAmount"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InsufficientValue"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidEAS"
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
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "type": "error",
          "name": "OwnableInvalidOwner"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "type": "error",
          "name": "OwnableUnauthorizedAccount"
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
              "name": "commitment",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "RevealTooLate"
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
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "SlashTransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "obligationUid",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "claimer",
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
          "name": "BondReclaimed",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "commitment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "recipient",
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
          "name": "BondSlashed",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "commitment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "claimer",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "Committed",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "previousOwner",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "OwnershipTransferred",
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
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "bondAmount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "bondEpochCount",
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
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "bondEpochs",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "startBlock",
              "type": "uint64"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
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
              "name": "",
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
              "name": "commitment",
              "type": "bytes32"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "commit"
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "commitDeadline",
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
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "commitmentClaimed",
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
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "commitments",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "commitBlock",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "commitTimestamp",
              "type": "uint64"
            },
            {
              "internalType": "address",
              "name": "committer",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "refUID",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "claimer",
              "type": "address"
            },
            {
              "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes",
                  "name": "payload",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes32",
                  "name": "salt",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                }
              ]
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "computeCommitment",
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
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "decodeObligationData",
          "outputs": [
            {
              "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes",
                  "name": "payload",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes32",
                  "name": "salt",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes",
                  "name": "payload",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes32",
                  "name": "salt",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                }
              ]
            },
            {
              "internalType": "bytes32",
              "name": "refUID",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "doObligation",
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
              "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes",
                  "name": "payload",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes32",
                  "name": "salt",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                }
              ]
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "refUID",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "doObligationFor",
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
              "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes",
                  "name": "payload",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes32",
                  "name": "salt",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
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
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "renounceOwnership"
        },
        {
          "inputs": [
            {
              "internalType": "struct GlobalBondCommitRevealObligation.ObligationData",
              "name": "data",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes",
                  "name": "payload",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes32",
                  "name": "salt",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                }
              ]
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "escrowContract",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "escrowUid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "revealAndCollect",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "fulfillmentUid",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "collectResult",
              "type": "bytes"
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
              "internalType": "uint256",
              "name": "_bondAmount",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "setBondAmount"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_commitDeadline",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "setCommitDeadline"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_slashedBondRecipient",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "setSlashedBondRecipient"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "commitment",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "slashBond",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "slashedBondRecipient",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "transferOwnership"
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
          "commit(bytes32)": {
            "details": "msg.value must equal the active `bondAmount()` and is held as a bond reclaimable after a valid reveal.",
            "params": {
              "commitment": "keccak256(abi.encode(refUID, claimer, keccak256(abi.encode(data))))."
            }
          },
          "doObligation((bytes,bytes32,bytes32),bytes32)": {
            "params": {
              "data": "Revealed data (must match a prior commit) and salt.",
              "refUID": "Escrow attestation UID being fulfilled."
            }
          },
          "doObligationFor((bytes,bytes32,bytes32),address,bytes32)": {
            "params": {
              "data": "Revealed data (must match a prior commit) and salt.",
              "recipient": "The address to set as the attestation recipient.",
              "refUID": "Escrow attestation UID being fulfilled."
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
          "owner()": {
            "details": "Returns the address of the current owner."
          },
          "renounceOwnership()": {
            "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner."
          },
          "revealAndCollect((bytes,bytes32,bytes32),address,address,bytes32)": {
            "details": "Uses a low-level call so it can support escrow contracts with      different collect return types."
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "params": {
              "attestation": "The existing attestation to be revoked."
            },
            "returns": {
              "_0": "Whether the attestation can be revoked."
            }
          },
          "slashBond(bytes32)": {
            "params": {
              "commitment": "The commitment hash whose bond is being slashed."
            }
          },
          "transferOwnership(address)": {
            "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
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
          "bondEpochs(uint256)": {
            "notice": "Bond amount epochs. Updates take effect starting the next block."
          },
          "commit(bytes32)": {
            "notice": "Records a commitment hash, locking the fixed bond."
          },
          "commitDeadline()": {
            "notice": "Seconds after commit within which the reveal must occur to avoid slashing."
          },
          "commitmentClaimed(bytes32)": {
            "notice": "commitmentClaimed[commitment] => bond already returned/slashed."
          },
          "commitments(bytes32)": {
            "notice": "commitments[commitment] => commit information."
          },
          "computeCommitment(bytes32,address,(bytes,bytes32,bytes32))": {
            "notice": "Pure helper to compute the commitment expected by this contract."
          },
          "doObligation((bytes,bytes32,bytes32),bytes32)": {
            "notice": "Creates a fulfillment attestation containing the payload and salt.         Validates the commitment, enforces the reveal deadline, and         atomically returns the bond to the committer."
          },
          "doObligationFor((bytes,bytes32,bytes32),address,bytes32)": {
            "notice": "Creates a fulfillment attestation with a specified recipient.         Use when the attestation recipient must differ from msg.sender,         e.g. when the recipient is a splitter contract that needs to         collect the escrow. The commitment must have been computed         with the recipient address as the claimer."
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
          "revealAndCollect((bytes,bytes32,bytes32),address,address,bytes32)": {
            "notice": "Reveals a fulfillment and immediately collects the target escrow."
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            "notice": "Processes an attestation revocation and verifies if it can be revoked."
          },
          "slashBond(bytes32)": {
            "notice": "Slashes the bond for a commitment whose deadline has passed without a valid reveal."
          },
          "slashedBondRecipient()": {
            "notice": "Recipient of slashed bonds (address(0) = burn)."
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
        "src/obligations/GlobalBondCommitRevealObligation.sol": "GlobalBondCommitRevealObligation"
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
      "lib/openzeppelin-contracts/contracts/access/Ownable.sol": {
        "keccak256": "0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb",
        "urls": [
          "bzz-raw://8ed324d3920bb545059d66ab97d43e43ee85fd3bd52e03e401f020afb0b120f6",
          "dweb:/ipfs/QmfEckWLmZkDDcoWrkEvMWhms66xwTLff9DDhegYpvHo1a"
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
      "lib/openzeppelin-contracts/contracts/utils/Context.sol": {
        "keccak256": "0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2",
        "urls": [
          "bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12",
          "dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF"
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
      "src/SchemaRegistryUtils.sol": {
        "keccak256": "0xd2f4597e2d2375656fca35ccfd36bb4a41b7c420c9c59c97c13acd6479e2ef63",
        "urls": [
          "bzz-raw://6f072ecb478df6736ce40550306fb7368de4dc9925bef82bcaef18254a42d600",
          "dweb:/ipfs/QmYxPxRKgKoxrEW3R3t8FfR8yLfbtFBicy8cPvmGJdRq6B"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/GlobalBondCommitRevealObligation.sol": {
        "keccak256": "0x968a4bec409cba3e322e39e7613d44084f8f258078e03db1ccc0ccbce9b0d2e7",
        "urls": [
          "bzz-raw://cd464bb3f1f6a3f81cf89312caefe70f3ea4f756cc1f4e198e3e3c252d8b0fc8",
          "dweb:/ipfs/QmNSmC2SqiLMnCUWTBPbWt8LYP1AZZNAv61sXMFyRKpAGe"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 117
} as const;
