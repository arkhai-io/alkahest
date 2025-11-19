export const abi = [
  {
    type: "function",
    name: "checkStatement",
    inputs: [
      {
        name: "statement",
        type: "tuple",
        internalType: "struct Attestation",
        components: [
          {
            name: "uid",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "schema",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "time",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expirationTime",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "revocationTime",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "refUID",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "recipient",
            type: "address",
            internalType: "address",
          },
          {
            name: "attester",
            type: "address",
            internalType: "address",
          },
          {
            name: "revocable",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "demand",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "decodeDemandData",
    inputs: [
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct UidArbiter.DemandData",
        components: [
          {
            name: "uid",
            type: "bytes32",
            internalType: "bytes32",
          },
        ],
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "error",
    name: "UidMismatched",
    inputs: [],
  },
] as const;
