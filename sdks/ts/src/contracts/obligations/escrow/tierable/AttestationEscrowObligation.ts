export const abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_eas",
          type: "address",
          internalType: "contract IEAS",
        },
        {
          name: "_schemaRegistry",
          type: "address",
          internalType: "contract ISchemaRegistry",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "receive",
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "ATTESTATION_SCHEMA",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "view",
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
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
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
      stateMutability: "view",
    },
    {
      type: "function",
      name: "collectEscrow",
      inputs: [
        {
          name: "escrow",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "fulfillment",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "collectEscrowRaw",
      inputs: [
        {
          name: "_escrow",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "_fulfillment",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "decodeObligationData",
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
          internalType: "struct AttestationEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "attestation",
              type: "tuple",
              internalType: "struct AttestationRequest",
              components: [
                {
                  name: "schema",
                  type: "bytes32",
                  internalType: "bytes32",
                },
                {
                  name: "data",
                  type: "tuple",
                  internalType: "struct AttestationRequestData",
                  components: [
                    {
                      name: "recipient",
                      type: "address",
                      internalType: "address",
                    },
                    {
                      name: "expirationTime",
                      type: "uint64",
                      internalType: "uint64",
                    },
                    {
                      name: "revocable",
                      type: "bool",
                      internalType: "bool",
                    },
                    {
                      name: "refUID",
                      type: "bytes32",
                      internalType: "bytes32",
                    },
                    {
                      name: "data",
                      type: "bytes",
                      internalType: "bytes",
                    },
                    {
                      name: "value",
                      type: "uint256",
                      internalType: "uint256",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "doObligation",
      inputs: [
        {
          name: "data",
          type: "tuple",
          internalType: "struct AttestationEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "attestation",
              type: "tuple",
              internalType: "struct AttestationRequest",
              components: [
                {
                  name: "schema",
                  type: "bytes32",
                  internalType: "bytes32",
                },
                {
                  name: "data",
                  type: "tuple",
                  internalType: "struct AttestationRequestData",
                  components: [
                    {
                      name: "recipient",
                      type: "address",
                      internalType: "address",
                    },
                    {
                      name: "expirationTime",
                      type: "uint64",
                      internalType: "uint64",
                    },
                    {
                      name: "revocable",
                      type: "bool",
                      internalType: "bool",
                    },
                    {
                      name: "refUID",
                      type: "bytes32",
                      internalType: "bytes32",
                    },
                    {
                      name: "data",
                      type: "bytes",
                      internalType: "bytes",
                    },
                    {
                      name: "value",
                      type: "uint256",
                      internalType: "uint256",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "doObligationFor",
      inputs: [
        {
          name: "data",
          type: "tuple",
          internalType: "struct AttestationEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "attestation",
              type: "tuple",
              internalType: "struct AttestationRequest",
              components: [
                {
                  name: "schema",
                  type: "bytes32",
                  internalType: "bytes32",
                },
                {
                  name: "data",
                  type: "tuple",
                  internalType: "struct AttestationRequestData",
                  components: [
                    {
                      name: "recipient",
                      type: "address",
                      internalType: "address",
                    },
                    {
                      name: "expirationTime",
                      type: "uint64",
                      internalType: "uint64",
                    },
                    {
                      name: "revocable",
                      type: "bool",
                      internalType: "bool",
                    },
                    {
                      name: "refUID",
                      type: "bytes32",
                      internalType: "bytes32",
                    },
                    {
                      name: "data",
                      type: "bytes",
                      internalType: "bytes",
                    },
                    {
                      name: "value",
                      type: "uint256",
                      internalType: "uint256",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64",
        },
        {
          name: "recipient",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "doObligationRaw",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64",
        },
        {
          name: "refUID",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "uid_",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "extractArbiterAndDemand",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "arbiter",
          type: "address",
          internalType: "address",
        },
        {
          name: "demand",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "getObligationData",
      inputs: [
        {
          name: "uid",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct AttestationEscrowObligation.ObligationData",
          components: [
            {
              name: "arbiter",
              type: "address",
              internalType: "address",
            },
            {
              name: "demand",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "attestation",
              type: "tuple",
              internalType: "struct AttestationRequest",
              components: [
                {
                  name: "schema",
                  type: "bytes32",
                  internalType: "bytes32",
                },
                {
                  name: "data",
                  type: "tuple",
                  internalType: "struct AttestationRequestData",
                  components: [
                    {
                      name: "recipient",
                      type: "address",
                      internalType: "address",
                    },
                    {
                      name: "expirationTime",
                      type: "uint64",
                      internalType: "uint64",
                    },
                    {
                      name: "revocable",
                      type: "bool",
                      internalType: "bool",
                    },
                    {
                      name: "refUID",
                      type: "bytes32",
                      internalType: "bytes32",
                    },
                    {
                      name: "data",
                      type: "bytes",
                      internalType: "bytes",
                    },
                    {
                      name: "value",
                      type: "uint256",
                      internalType: "uint256",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      stateMutability: "view",
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
              internalType: "bytes32",
            },
            {
              name: "resolver",
              type: "address",
              internalType: "contract ISchemaResolver",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "schema",
              type: "string",
              internalType: "string",
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "isPayable",
      inputs: [],
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
          name: "values",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
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
          name: "values",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "reclaimExpired",
      inputs: [
        {
          name: "uid",
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
      stateMutability: "nonpayable",
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
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "version",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "event",
      name: "EscrowCollected",
      inputs: [
        {
          name: "escrow",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "fulfillment",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "fulfiller",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "EscrowMade",
      inputs: [
        {
          name: "escrow",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "buyer",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AccessDenied",
      inputs: [],
    },
    {
      type: "error",
      name: "AttestationCreationFailed",
      inputs: [],
    },
    {
      type: "error",
      name: "AttestationNotFound",
      inputs: [
        {
          name: "attestationId",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
    },
    {
      type: "error",
      name: "AttestationRevoked",
      inputs: [],
    },
    {
      type: "error",
      name: "DeadlineExpired",
      inputs: [],
    },
    {
      type: "error",
      name: "InsufficientValue",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidEAS",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidEscrowAttestation",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidFulfillment",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidLength",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidSchema",
      inputs: [],
    },
    {
      type: "error",
      name: "NotFromThisAttester",
      inputs: [],
    },
    {
      type: "error",
      name: "NotPayable",
      inputs: [],
    },
    {
      type: "error",
      name: "RevocationFailed",
      inputs: [
        {
          name: "attestationId",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
    },
    {
      type: "error",
      name: "UnauthorizedCall",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x6101608060405234610299576040816120fb803803809161002082856102d3565b8339810103126102995780516001600160a01b038116918282036102995760200151916001600160a01b0383168084036102995760405160e081016001600160401b038111828210176102bf5760405260b1815260208101927f6164647265737320617262697465722c2062797465732064656d616e642c207484527f75706c65286279746573333220736368656d612c207475706c6528616464726560408301527f737320726563697069656e742c2075696e7436342065787069726174696f6e5460608301527f696d652c20626f6f6c207265766f6361626c652c20627974657333322072656660808301527f5549442c20627974657320646174612c2075696e743235362076616c7565292060a0830152703230ba30949030ba3a32b9ba30ba34b7b760791b60c08301526001608052600360a0525f60c052156102b0576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af19081156102a5575f9161026f575b5061014052604051611e0490816102f7823960805181610bc7015260a05181610bf2015260c05181610c1d015260e05181611be601526101005181610a3e015261012051818181610495015281816106380152818161084b015281816113e20152611d3a0152610140518181816104d5015281816105ed015281816108a501528181610a0c01528181610b85015281816114820152818161196f0152611cef0152f35b90506020813d60201161029d575b8161028a602093836102d3565b8101031261029957515f6101cc565b5f80fd5b3d915061027d565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102bf5760405256fe60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610c9657806354fd4d5014610ba85780635bf2f20d14610b6e5780636b122fe0146109cd5780637d2c2931146108165780638371ef59146107b757806388e5b2d914610769578063891d9ea81461078857806391db0b7e146107695780639c13d80e146106e7578063b3b902d414610560578063c6ec507014610454578063c93844be146102cb578063cce1f56114610256578063ce46e0461461023a578063e49617e11461021f578063e60c35051461021f5763e6c9714d146100f8575061000e565b3461021857606036600319011261021857600435906001600160401b038211610218576101406003198336030112610218576040519161013783610d81565b806004013583526024810135602084015261015460448201610ec3565b604084015261016560648201610ec3565b606084015261017660848201610ec3565b608084015260a481013560a084015261019160c48201610ed7565b60c08401526101a260e48201610ed7565b60e08401526101b46101048201611002565b6101008401526101248101356001600160401b03811161021b576101dd91369101600401610e0f565b610120830152602435906001600160401b03821161021857602061020e846102083660048701610e0f565b9061196d565b6040519015158152f35b80fd5b8280fd5b602061020e61022d36610fce565b610235611be4565b611c25565b5034610218578060031936011261021857602090604051908152f35b503461021857604036600319011261021857600435906001600160401b03821161021857606060031983360301126102185760206102c36102ae846102bc61029c610ead565b91604051938491600401878301611815565b03601f198101845283610d9d565b3391611c9a565b604051908152f35b5034610218576020366003190112610218576004356001600160401b038111610450576102fc903690600401610eeb565b61030792919261190f565b50820191602081840312610450578035906001600160401b03821161021b570190606082840312610218576040519161033f83610d4b565b61034881610ed7565b835260208101356001600160401b03811161021b5784610369918301610e0f565b60208401526040810135906001600160401b03821161021b570190604082850312610218576040519161039b83610d30565b803583526020810135906001600160401b03821161021b57019360c08582031261045057604051916103cc83610d66565b6103d586610ed7565b83526103e360208701610ec3565b60208401526103f460408701611002565b6040840152606086013560608401526080860135906001600160401b03821161021857509461042a60a09261044c978301610e0f565b6080840152013560a08201526020820152604082015260405191829182610f87565b0390f35b5080fd5b50346102185760203660031901126102185761046e61190f565b50610477611052565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561055357819261052f575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105205761044c610514610120840151602080825183010191016111b9565b60405191829182610f87565b635527981560e11b8152600490fd5b61054c9192503d8084833e6105448183610d9d565b8101906110de565b905f6104cd565b50604051903d90823e3d90fd5b506060366003190112610218576004356001600160401b038111610450579060206105a7610595610633943690600401610eeb565b919061059f610ead565b923691610dd9565b6001600160401b03604051926105bc84610d66565b338452168383015260016040830152604435606083015260808201528260a0820152604051906105eb82610d30565b7f00000000000000000000000000000000000000000000000000000000000000008252828201526040518094819263f17325e760e01b83528460048401526024830190610f18565b0381847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19081156106db5780916106a2575b60209250817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a3604051908152f35b90506020823d6020116106d3575b816106bd60209383610d9d565b810103126106cf576020915190610670565b5f80fd5b3d91506106b0565b604051903d90823e3d90fd5b5034610218576060366003190112610218576004356001600160401b038111610450576060600319823603011261045057610720610ead565b604435929091906001600160a01b03841684036102185760206102c3858561075661076487604051928391600401888301611815565b03601f198101835282610d9d565b611c9a565b602061020e61077736610e5d565b92610783929192611be4565b611314565b50346102185761044c6107a361079d36610cc7565b906113b8565b604051918291602083526020830190610cdd565b503461021857602036600319011261021857600435906001600160401b038211610218576107f06107eb3660048501610e0f565b6112eb565b604080516001600160a01b03909316835260208301819052829161044c91830190610cdd565b50346106cf5760203660031901126106cf5760043590610834611052565b506040516328c44a9960e21b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f91816109b1575b5061089c57836301fb6dd160e01b5f5260045260245ffd5b906020820151917f00000000000000000000000000000000000000000000000000000000000000008093036109a2576060016001600160401b038151161561099357516001600160401b03164210610993576040516108fa81610d30565b8481525f60208201526040519261091084610d30565b83526020830152803b156106cf57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161097e575b506109735760249163614cf93960e01b8252600452fd5b602060405160018152f35b61098b9192505f90610d9d565b5f905f61095c565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b6109c69192503d805f833e6105448183610d9d565b905f610884565b346106cf575f3660031901126106cf576060806040516109ec81610d01565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610b63575f90610ab3575b60609061044c604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610cdd565b503d805f833e610ac38183610d9d565b8101906020818303126106cf578051906001600160401b0382116106cf57016080818303126106cf5760405190610af982610d01565b8051825260208101516001600160a01b03811681036106cf576020830152610b236040820161100f565b60408301526060810151906001600160401b0382116106cf570182601f820112156106cf57606092816020610b5a9351910161101c565b82820152610a6d565b6040513d5f823e3d90fd5b346106cf575f3660031901126106cf5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346106cf575f3660031901126106cf5761044c60206107a36001610beb7f0000000000000000000000000000000000000000000000000000000000000000611a77565b8184610c167f0000000000000000000000000000000000000000000000000000000000000000611a77565b8180610c417f0000000000000000000000000000000000000000000000000000000000000000611a77565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610d9d565b346106cf57610ca761079d36610cc7565b602081519181808201938492010103126106cf5760209051604051908152f35b60409060031901126106cf576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610d1c57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610d1c57604052565b606081019081106001600160401b03821117610d1c57604052565b60c081019081106001600160401b03821117610d1c57604052565b61014081019081106001600160401b03821117610d1c57604052565b90601f801991011681019081106001600160401b03821117610d1c57604052565b6001600160401b038111610d1c57601f01601f191660200190565b929192610de582610dbe565b91610df36040519384610d9d565b8294818452818301116106cf578281602093845f960137010152565b9080601f830112156106cf57816020610e2a93359101610dd9565b90565b9181601f840112156106cf578235916001600160401b0383116106cf576020808501948460051b0101116106cf57565b60406003198201126106cf576004356001600160401b0381116106cf5781610e8791600401610e2d565b92909291602435906001600160401b0382116106cf57610ea991600401610e2d565b9091565b602435906001600160401b03821682036106cf57565b35906001600160401b03821682036106cf57565b35906001600160a01b03821682036106cf57565b9181601f840112156106cf578235916001600160401b0383116106cf57602083818601950101116106cf57565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a0610f7e608085015160c080860152610100850190610cdd565b93015191015290565b90610e2a916020815260018060a01b0382511660208201526040610fb960208401516060838501526080840190610cdd565b920151906060601f1982850301910152610f18565b60206003198201126106cf57600435906001600160401b0382116106cf576101409082900360031901126106cf5760040190565b359081151582036106cf57565b519081151582036106cf57565b92919261102882610dbe565b916110366040519384610d9d565b8294818452818301116106cf578281602093845f96015e010152565b6040519061105f82610d81565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b03821682036106cf57565b51906001600160a01b03821682036106cf57565b9080601f830112156106cf578151610e2a9260200161101c565b6020818303126106cf578051906001600160401b0382116106cf5701610140818303126106cf576040519161111283610d81565b815183526020820151602084015261112c6040830161109c565b604084015261113d6060830161109c565b606084015261114e6080830161109c565b608084015260a082015160a084015261116960c083016110b0565b60c084015261117a60e083016110b0565b60e084015261118c610100830161100f565b6101008401526101208201516001600160401b0381116106cf576111b092016110c4565b61012082015290565b6020818303126106cf578051906001600160401b0382116106cf5701906060828203126106cf57604051916111ed83610d4b565b6111f6816110b0565b835260208101516001600160401b0381116106cf57826112179183016110c4565b60208401526040810151906001600160401b0382116106cf5701906040828203126106cf576040519161124983610d30565b805183526020810151906001600160401b0382116106cf57019060c0828203126106cf576040519161127a83610d66565b611283816110b0565b83526112916020820161109c565b60208401526112a26040820161100f565b60408401526060810151606084015260808101516001600160401b0381116106cf5760a0926112d29183016110c4565b6080840152015160a08201526020820152604082015290565b6112fe90602080825183010191016111b9565b80516020909101516001600160a01b0390911691565b9290928184036113a9575f91345b8584101561139e578184101561138a578360051b808601359082821161137b5784013561013e19853603018112156106cf5761135f908501611c25565b156113705760019103930192611322565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f6113c2611052565b506113cb611052565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f91816117a8575b5061143357856301fb6dd160e01b5f5260045260245ffd5b9491929394906040516328c44a9960e21b81528660048201525f81602481855afa5f918161178c575b5061147457866301fb6dd160e01b5f5260045260245ffd5b9591929394959260208101517f00000000000000000000000000000000000000000000000000000000000000008091036109a2576114b182611c3e565b156109a25761012082019182516114c7906112eb565b91516040805163e6c9714d60e01b81526060600482018190528a51606483015260208b01516084830152918a01516001600160401b0390811660a4830152918a0151821660c482015260808a015190911660e482015260a089015161010482015260c0890180516001600160a01b0390811661012484015260e08b0151166101448301526101008a0151151561016483015261012090990151610140610184830152909384928392909190611581906101a4850190610cdd565b83810360031901602485015261159691610cdd565b60448301919091526001600160a01b039093169203815a93602094fa908115610b63575f91611752575b5015611743576040516115d281610d30565b8681525f6020820152604051916115e883610d30565b82526020820152823b156106cf57604051634692626760e01b815281516004820152602091820151805160248301529091015160448201525f8160648183875af1908161172e575b506116495763614cf93960e01b86526004859052602486fd5b61168e8692604061166960209498969798518580825183010191016111b9565b015160405194858094819363f17325e760e01b83528760048401526024830190610f18565b03925af18591816116fa575b506116ae57638d7100d760e01b8552600485fd5b7ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0909493604051956020870152602086526116ea604087610d9d565b516001600160a01b03169380a490565b9091506020813d602011611726575b8161171660209383610d9d565b810103126106cf5751905f61169a565b3d9150611709565b61173b9197505f90610d9d565b5f955f611630565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611784575b8161176d60209383610d9d565b810103126106cf5761177e9061100f565b5f6115c0565b3d9150611760565b6117a19192503d805f833e6105448183610d9d565b905f61145c565b6117bd9192503d805f833e6105448183610d9d565b905f61141b565b9035601e19823603018112156106cf5701602081359101916001600160401b0382116106cf5781360383136106cf57565b908060209392818452848401375f828201840152601f01601f1916010190565b602081526001600160a01b0361182a83610ed7565b16602082015261185161184060208401846117c4565b6060604085015260808401916117f5565b916040810135603e19823603018112156106cf5701906060601f198285030191015280358252602081013560be19823603018112156106cf576040602084015201906001600160a01b036118a483610ed7565b1660408201526001600160401b036118be60208401610ec3565b1660608201526118d060408301611002565b15156080820152606082013560a082015260e060a06119066118f560808601866117c4565b60c0808701526101008601916117f5565b93013591015290565b6040519061191c82610d4b565b815f815260606020820152604080519161193583610d30565b5f8352815161194381610d66565b5f81525f60208201525f838201525f6060820152606060808201525f60a082015260208401520152565b7f0000000000000000000000000000000000000000000000000000000000000000602082015103611a68576119a181611c3e565b15611a62576119c16101206119d1920151602080825183010191016111b9565b91602080825183010191016111b9565b60408201516040516119f3816107566020820194602086526040830190610f18565b5190206040820151604051611a18816107566020820194602086526040830190610f18565b519020149182611a49575b82611a2d57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611a23565b50505f90565b635f9bd90760e11b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611bc1575b806d04ee2d6d415b85acef8100000000600a921015611ba6575b662386f26fc10000811015611b92575b6305f5e100811015611b81575b612710811015611b72575b6064811015611b64575b1015611b59575b600a60216001840193611afe85610dbe565b94611b0c6040519687610d9d565b808652611b1b601f1991610dbe565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611b5457600a9091611b26565b505090565b600190910190611aec565b606460029104930192611ae5565b61271060049104930192611adb565b6305f5e10060089104930192611ad0565b662386f26fc1000060109104930192611ac3565b6d04ee2d6d415b85acef810000000060209104930192611ab3565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611a99565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611c1657565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036106cf57301490565b6001600160401b036060820151168015159081611c8f575b50611c8057608001516001600160401b0316611c7157600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611c56565b611d3593926020916001600160401b0360405192611cb784610d66565b60018060a01b0316948584521683830152600160408301525f606083015260808201525f60a082015260405190611ced82610d30565b7f00000000000000000000000000000000000000000000000000000000000000008252828201526040518095819263f17325e760e01b83528460048401526024830190610f18565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610b63575f93611d9a575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011611dc6575b81611db660209383610d9d565b810103126106cf5751915f611d72565b3d9150611da956fea26469706673582212206bfbbdb14bd4cbd5afb278a60fe25c249c6d864eecfe3224f56fdfd792d519dd64736f6c634300081b0033",
    sourceMap:
      "441:4033:119:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;441:4033:119;;;;1097:4;441:4033;759:14:6;688:1:9;441:4033:119;783:14:6;-1:-1:-1;441:4033:119;807:14:6;708:26:9;704:76;;441:4033:119;790:10:9;;441:4033:119;790:10:9;441:4033:119;790:10:9;789::73;;809:32;;-1:-1:-1;441:4033:119;;;;;;;;;;;872:48:73;;441:4033:119;872:48:73;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;904:4:73;441:4033:119;;;;1097:4;441:4033;;;;;;-1:-1:-1;;441:4033:119;;;872:48:73;;;;;;;;;;-1:-1:-1;872:48:73;;;-1:-1:-1;851:69:73;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;809:32:73;441:4033:119;;;;;789:10:73;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;851:69:73;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;872:48:73;;;441:4033:119;872:48:73;;441:4033:119;872:48:73;;;;;;441:4033:119;872:48:73;;;:::i;:::-;;;441:4033:119;;;;;872:48:73;;;441:4033:119;-1:-1:-1;441:4033:119;;872:48:73;;;-1:-1:-1;872:48:73;;;441:4033:119;;;-1:-1:-1;441:4033:119;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;;-1:-1:-1;441:4033:119;;;;;;-1:-1:-1;;441:4033:119;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;:::o",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f5f3560e01c80632c713cd914610c9657806354fd4d5014610ba85780635bf2f20d14610b6e5780636b122fe0146109cd5780637d2c2931146108165780638371ef59146107b757806388e5b2d914610769578063891d9ea81461078857806391db0b7e146107695780639c13d80e146106e7578063b3b902d414610560578063c6ec507014610454578063c93844be146102cb578063cce1f56114610256578063ce46e0461461023a578063e49617e11461021f578063e60c35051461021f5763e6c9714d146100f8575061000e565b3461021857606036600319011261021857600435906001600160401b038211610218576101406003198336030112610218576040519161013783610d81565b806004013583526024810135602084015261015460448201610ec3565b604084015261016560648201610ec3565b606084015261017660848201610ec3565b608084015260a481013560a084015261019160c48201610ed7565b60c08401526101a260e48201610ed7565b60e08401526101b46101048201611002565b6101008401526101248101356001600160401b03811161021b576101dd91369101600401610e0f565b610120830152602435906001600160401b03821161021857602061020e846102083660048701610e0f565b9061196d565b6040519015158152f35b80fd5b8280fd5b602061020e61022d36610fce565b610235611be4565b611c25565b5034610218578060031936011261021857602090604051908152f35b503461021857604036600319011261021857600435906001600160401b03821161021857606060031983360301126102185760206102c36102ae846102bc61029c610ead565b91604051938491600401878301611815565b03601f198101845283610d9d565b3391611c9a565b604051908152f35b5034610218576020366003190112610218576004356001600160401b038111610450576102fc903690600401610eeb565b61030792919261190f565b50820191602081840312610450578035906001600160401b03821161021b570190606082840312610218576040519161033f83610d4b565b61034881610ed7565b835260208101356001600160401b03811161021b5784610369918301610e0f565b60208401526040810135906001600160401b03821161021b570190604082850312610218576040519161039b83610d30565b803583526020810135906001600160401b03821161021b57019360c08582031261045057604051916103cc83610d66565b6103d586610ed7565b83526103e360208701610ec3565b60208401526103f460408701611002565b6040840152606086013560608401526080860135906001600160401b03821161021857509461042a60a09261044c978301610e0f565b6080840152013560a08201526020820152604082015260405191829182610f87565b0390f35b5080fd5b50346102185760203660031901126102185761046e61190f565b50610477611052565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa91821561055357819261052f575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105205761044c610514610120840151602080825183010191016111b9565b60405191829182610f87565b635527981560e11b8152600490fd5b61054c9192503d8084833e6105448183610d9d565b8101906110de565b905f6104cd565b50604051903d90823e3d90fd5b506060366003190112610218576004356001600160401b038111610450579060206105a7610595610633943690600401610eeb565b919061059f610ead565b923691610dd9565b6001600160401b03604051926105bc84610d66565b338452168383015260016040830152604435606083015260808201528260a0820152604051906105eb82610d30565b7f00000000000000000000000000000000000000000000000000000000000000008252828201526040518094819263f17325e760e01b83528460048401526024830190610f18565b0381847f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19081156106db5780916106a2575b60209250817f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06339280a3604051908152f35b90506020823d6020116106d3575b816106bd60209383610d9d565b810103126106cf576020915190610670565b5f80fd5b3d91506106b0565b604051903d90823e3d90fd5b5034610218576060366003190112610218576004356001600160401b038111610450576060600319823603011261045057610720610ead565b604435929091906001600160a01b03841684036102185760206102c3858561075661076487604051928391600401888301611815565b03601f198101835282610d9d565b611c9a565b602061020e61077736610e5d565b92610783929192611be4565b611314565b50346102185761044c6107a361079d36610cc7565b906113b8565b604051918291602083526020830190610cdd565b503461021857602036600319011261021857600435906001600160401b038211610218576107f06107eb3660048501610e0f565b6112eb565b604080516001600160a01b03909316835260208301819052829161044c91830190610cdd565b50346106cf5760203660031901126106cf5760043590610834611052565b506040516328c44a9960e21b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f91816109b1575b5061089c57836301fb6dd160e01b5f5260045260245ffd5b906020820151917f00000000000000000000000000000000000000000000000000000000000000008093036109a2576060016001600160401b038151161561099357516001600160401b03164210610993576040516108fa81610d30565b8481525f60208201526040519261091084610d30565b83526020830152803b156106cf57604051634692626760e01b815282516004820152602092830151805160248301529092015160448301525f908290606490829084905af1908161097e575b506109735760249163614cf93960e01b8252600452fd5b602060405160018152f35b61098b9192505f90610d9d565b5f905f61095c565b637bf6a16f60e01b5f5260045ffd5b63629cd40b60e11b5f5260045ffd5b6109c69192503d805f833e6105448183610d9d565b905f610884565b346106cf575f3660031901126106cf576060806040516109ec81610d01565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610b63575f90610ab3575b60609061044c604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610cdd565b503d805f833e610ac38183610d9d565b8101906020818303126106cf578051906001600160401b0382116106cf57016080818303126106cf5760405190610af982610d01565b8051825260208101516001600160a01b03811681036106cf576020830152610b236040820161100f565b60408301526060810151906001600160401b0382116106cf570182601f820112156106cf57606092816020610b5a9351910161101c565b82820152610a6d565b6040513d5f823e3d90fd5b346106cf575f3660031901126106cf5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346106cf575f3660031901126106cf5761044c60206107a36001610beb7f0000000000000000000000000000000000000000000000000000000000000000611a77565b8184610c167f0000000000000000000000000000000000000000000000000000000000000000611a77565b8180610c417f0000000000000000000000000000000000000000000000000000000000000000611a77565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610d9d565b346106cf57610ca761079d36610cc7565b602081519181808201938492010103126106cf5760209051604051908152f35b60409060031901126106cf576004359060243590565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610d1c57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b03821117610d1c57604052565b606081019081106001600160401b03821117610d1c57604052565b60c081019081106001600160401b03821117610d1c57604052565b61014081019081106001600160401b03821117610d1c57604052565b90601f801991011681019081106001600160401b03821117610d1c57604052565b6001600160401b038111610d1c57601f01601f191660200190565b929192610de582610dbe565b91610df36040519384610d9d565b8294818452818301116106cf578281602093845f960137010152565b9080601f830112156106cf57816020610e2a93359101610dd9565b90565b9181601f840112156106cf578235916001600160401b0383116106cf576020808501948460051b0101116106cf57565b60406003198201126106cf576004356001600160401b0381116106cf5781610e8791600401610e2d565b92909291602435906001600160401b0382116106cf57610ea991600401610e2d565b9091565b602435906001600160401b03821682036106cf57565b35906001600160401b03821682036106cf57565b35906001600160a01b03821682036106cf57565b9181601f840112156106cf578235916001600160401b0383116106cf57602083818601950101116106cf57565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a0610f7e608085015160c080860152610100850190610cdd565b93015191015290565b90610e2a916020815260018060a01b0382511660208201526040610fb960208401516060838501526080840190610cdd565b920151906060601f1982850301910152610f18565b60206003198201126106cf57600435906001600160401b0382116106cf576101409082900360031901126106cf5760040190565b359081151582036106cf57565b519081151582036106cf57565b92919261102882610dbe565b916110366040519384610d9d565b8294818452818301116106cf578281602093845f96015e010152565b6040519061105f82610d81565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b03821682036106cf57565b51906001600160a01b03821682036106cf57565b9080601f830112156106cf578151610e2a9260200161101c565b6020818303126106cf578051906001600160401b0382116106cf5701610140818303126106cf576040519161111283610d81565b815183526020820151602084015261112c6040830161109c565b604084015261113d6060830161109c565b606084015261114e6080830161109c565b608084015260a082015160a084015261116960c083016110b0565b60c084015261117a60e083016110b0565b60e084015261118c610100830161100f565b6101008401526101208201516001600160401b0381116106cf576111b092016110c4565b61012082015290565b6020818303126106cf578051906001600160401b0382116106cf5701906060828203126106cf57604051916111ed83610d4b565b6111f6816110b0565b835260208101516001600160401b0381116106cf57826112179183016110c4565b60208401526040810151906001600160401b0382116106cf5701906040828203126106cf576040519161124983610d30565b805183526020810151906001600160401b0382116106cf57019060c0828203126106cf576040519161127a83610d66565b611283816110b0565b83526112916020820161109c565b60208401526112a26040820161100f565b60408401526060810151606084015260808101516001600160401b0381116106cf5760a0926112d29183016110c4565b6080840152015160a08201526020820152604082015290565b6112fe90602080825183010191016111b9565b80516020909101516001600160a01b0390911691565b9290928184036113a9575f91345b8584101561139e578184101561138a578360051b808601359082821161137b5784013561013e19853603018112156106cf5761135f908501611c25565b156113705760019103930192611322565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f6113c2611052565b506113cb611052565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f91816117a8575b5061143357856301fb6dd160e01b5f5260045260245ffd5b9491929394906040516328c44a9960e21b81528660048201525f81602481855afa5f918161178c575b5061147457866301fb6dd160e01b5f5260045260245ffd5b9591929394959260208101517f00000000000000000000000000000000000000000000000000000000000000008091036109a2576114b182611c3e565b156109a25761012082019182516114c7906112eb565b91516040805163e6c9714d60e01b81526060600482018190528a51606483015260208b01516084830152918a01516001600160401b0390811660a4830152918a0151821660c482015260808a015190911660e482015260a089015161010482015260c0890180516001600160a01b0390811661012484015260e08b0151166101448301526101008a0151151561016483015261012090990151610140610184830152909384928392909190611581906101a4850190610cdd565b83810360031901602485015261159691610cdd565b60448301919091526001600160a01b039093169203815a93602094fa908115610b63575f91611752575b5015611743576040516115d281610d30565b8681525f6020820152604051916115e883610d30565b82526020820152823b156106cf57604051634692626760e01b815281516004820152602091820151805160248301529091015160448201525f8160648183875af1908161172e575b506116495763614cf93960e01b86526004859052602486fd5b61168e8692604061166960209498969798518580825183010191016111b9565b015160405194858094819363f17325e760e01b83528760048401526024830190610f18565b03925af18591816116fa575b506116ae57638d7100d760e01b8552600485fd5b7ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0909493604051956020870152602086526116ea604087610d9d565b516001600160a01b03169380a490565b9091506020813d602011611726575b8161171660209383610d9d565b810103126106cf5751905f61169a565b3d9150611709565b61173b9197505f90610d9d565b5f955f611630565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611784575b8161176d60209383610d9d565b810103126106cf5761177e9061100f565b5f6115c0565b3d9150611760565b6117a19192503d805f833e6105448183610d9d565b905f61145c565b6117bd9192503d805f833e6105448183610d9d565b905f61141b565b9035601e19823603018112156106cf5701602081359101916001600160401b0382116106cf5781360383136106cf57565b908060209392818452848401375f828201840152601f01601f1916010190565b602081526001600160a01b0361182a83610ed7565b16602082015261185161184060208401846117c4565b6060604085015260808401916117f5565b916040810135603e19823603018112156106cf5701906060601f198285030191015280358252602081013560be19823603018112156106cf576040602084015201906001600160a01b036118a483610ed7565b1660408201526001600160401b036118be60208401610ec3565b1660608201526118d060408301611002565b15156080820152606082013560a082015260e060a06119066118f560808601866117c4565b60c0808701526101008601916117f5565b93013591015290565b6040519061191c82610d4b565b815f815260606020820152604080519161193583610d30565b5f8352815161194381610d66565b5f81525f60208201525f838201525f6060820152606060808201525f60a082015260208401520152565b7f0000000000000000000000000000000000000000000000000000000000000000602082015103611a68576119a181611c3e565b15611a62576119c16101206119d1920151602080825183010191016111b9565b91602080825183010191016111b9565b60408201516040516119f3816107566020820194602086526040830190610f18565b5190206040820151604051611a18816107566020820194602086526040830190610f18565b519020149182611a49575b82611a2d57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611a23565b50505f90565b635f9bd90760e11b5f5260045ffd5b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611bc1575b806d04ee2d6d415b85acef8100000000600a921015611ba6575b662386f26fc10000811015611b92575b6305f5e100811015611b81575b612710811015611b72575b6064811015611b64575b1015611b59575b600a60216001840193611afe85610dbe565b94611b0c6040519687610d9d565b808652611b1b601f1991610dbe565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611b5457600a9091611b26565b505090565b600190910190611aec565b606460029104930192611ae5565b61271060049104930192611adb565b6305f5e10060089104930192611ad0565b662386f26fc1000060109104930192611ac3565b6d04ee2d6d415b85acef810000000060209104930192611ab3565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611a99565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611c1657565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036106cf57301490565b6001600160401b036060820151168015159081611c8f575b50611c8057608001516001600160401b0316611c7157600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f611c56565b611d3593926020916001600160401b0360405192611cb784610d66565b60018060a01b0316948584521683830152600160408301525f606083015260808201525f60a082015260405190611ced82610d30565b7f00000000000000000000000000000000000000000000000000000000000000008252828201526040518095819263f17325e760e01b83528460048401526024830190610f18565b03815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1928315610b63575f93611d9a575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011611dc6575b81611db660209383610d9d565b810103126106cf5751915f611d72565b3d9150611da956fea26469706673582212206bfbbdb14bd4cbd5afb278a60fe25c249c6d864eecfe3224f56fdfd792d519dd64736f6c634300081b0033",
    sourceMap:
      "441:4033:119:-:0;;;;;;;;;-1:-1:-1;441:4033:119;;;;;;;;1183:12:9;;;1054:5;1183:12;441:4033:119;1054:5:9;1183:12;441:4033:119;;;;;;;;;;;4026:29;441:4033;4026:29;;;441:4033;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;3045:39:9;441:4033:119;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;441:4033:119:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;3311:156;3348:16;441:4033;3348:16;441:4033;;:::i;:::-;;;;;;;;;3348:16;;;;:::i;:::-;;1055:104:6;;3348:16:119;;;;;;:::i;:::-;3415:10;3311:156;;:::i;:::-;441:4033;;;;;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;4431:34;;441:4033;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;441:4033:119;;-1:-1:-1;;;2392:23:73;;441:4033:119;;;2392:23:73;;;441:4033:119;;;;2392:23:73;441:4033:119;2392:3:73;-1:-1:-1;;;;;441:4033:119;2392:23:73;;;;;;;;;;;441:4033:119;2429:19:73;441:4033:119;2429:19:73;;441:4033:119;2452:18:73;2429:41;2425:87;;441:4033:119;4246:46;4257:16;;;;441:4033;;;;4246:46;;;;;;:::i;:::-;441:4033;;;;;;;:::i;2425:87:73:-;-1:-1:-1;;;2491:21:73;;441:4033:119;;2491:21:73;2392:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;441:4033:119;;;;;;;;;;;;-1:-1:-1;441:4033:119;;-1:-1:-1;;441:4033:119;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;:::i;:::-;-1:-1:-1;;;;;441:4033:119;;;;;;:::i;:::-;803:10:76;441:4033:119;;;1914:299:73;;;441:4033:119;2076:4:73;441:4033:119;1914:299:73;;441:4033:119;;;;1914:299:73;;441:4033:119;1914:299:73;;;441:4033:119;1914:299:73;;;;441:4033:119;;;;;;;:::i;:::-;1868:18:73;441:4033:119;;1819:413:73;;;441:4033:119;;;;;;;;;;1791:455:73;;;441:4033:119;1791:455:73;;441:4033:119;;;;;;:::i;:::-;1791:455:73;441:4033:119;;1791:3:73;-1:-1:-1;;;;;441:4033:119;1791:455:73;;;;;;;;;;;441:4033:119;;1102:55:76;;803:10;5816:26:75;803:10:76;5816:26:75;;;441:4033:119;;;;;;1791:455:73;;;441:4033:119;1791:455:73;;441:4033:119;1791:455:73;;;;;;441:4033:119;1791:455:73;;;:::i;:::-;;;441:4033:119;;;;;;;1791:455:73;;;441:4033:119;-1:-1:-1;441:4033:119;;1791:455:73;;;-1:-1:-1;1791:455:73;;;441:4033:119;;;;;;;;;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;3663:155;441:4033;;3700:16;;441:4033;;;;;;;;3700:16;;;;:::i;:::-;;1055:104:6;;3700:16:119;;;;;;:::i;:::-;3663:155;:::i;441:4033::-;;1442:1461:9;441:4033:119;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;441:4033:119:-;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;441:4033:119;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;441:4033:119;;;;;;4230:30:75;441:4033:119;;:::i;:::-;-1:-1:-1;441:4033:119;;-1:-1:-1;;;4322:23:75;;441:4033:119;4322:23:75;;441:4033:119;;;4322:3:75;-1:-1:-1;;;;;441:4033:119;;-1:-1:-1;441:4033:119;4322:23:75;441:4033:119;;4322:23:75;;441:4033:119;;4322:23:75;;;441:4033:119;-1:-1:-1;4318:172:75;;4455:24;;;;441:4033:119;4455:24:75;441:4033:119;;4322:23:75;441:4033:119;4455:24:75;4318:172;;441:4033:119;4556:18:75;;441:4033:119;4578:18:75;;4556:40;;;4552:91;;4753:26;;-1:-1:-1;;;;;441:4033:119;;;4753:31:75;4749:62;;441:4033:119;-1:-1:-1;;;;;441:4033:119;4826:15:75;:44;4822:87;;441:4033:119;;;;;:::i;:::-;;;;;;5108:43:75;;441:4033:119;;;;;;;:::i;:::-;;;;5014:156:75;;441:4033:119;4986:198:75;;;;;441:4033:119;;-1:-1:-1;;;4986:198:75;;441:4033:119;;;4986:198:75;;441:4033:119;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;-1:-1:-1;;4986:198:75;;;;;;4318:172;-1:-1:-1;4970:285:75;;4322:23;5223:21;;;;;;441:4033:119;;5223:21:75;4970:285;441:4033:119;;;;;;;4986:198:75;;;;;441:4033:119;4986:198:75;;:::i;:::-;441:4033:119;4986:198:75;;;;4822:87;4793:18;;;441:4033:119;4891:18:75;441:4033:119;;4891:18:75;4552:91;4617:26;;;441:4033:119;4617:26:75;441:4033:119;;4617:26:75;4322:23;;;;;;;441:4033:119;4322:23:75;;;;;;:::i;:::-;;;;;441:4033:119;;;;;;-1:-1:-1;;441:4033:119;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1497:44:73;;1522:18;441:4033:119;1497:44:73;;441:4033:119;;;1497:44:73;441:4033:119;;;;;;1497:14:73;441:4033:119;1497:44:73;;;;;;441:4033:119;1497:44:73;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1497:44:73:-;;;;441:4033:119;1497:44:73;;;;;;:::i;:::-;;;441:4033:119;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1497:44:73;;;441:4033:119;;;;;;;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;;542:43:73;441:4033:119;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;1055:104:6;;441:4033:119;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;441:4033:119;;;;;;;;;;;;1055:104:6;;;441:4033:119;;;;-1:-1:-1;;;441:4033:119;;;;;;;;;;;;;;;;;-1:-1:-1;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;1055:104:6;;;;;;;;;;:::i;441:4033:119:-;;;;3972:37;441:4033;;;:::i;3972:37::-;441:4033;;;4026:29;;;;;;;;;;441:4033;;;;4026:29;441:4033;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;441:4033:119;;;;;;;;-1:-1:-1;;441:4033:119;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;:::o;:::-;;;;-1:-1:-1;441:4033:119;;;;;-1:-1:-1;441:4033:119;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;:::o;:::-;;;1055:104:6;;441:4033:119;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;:::o;:::-;-1:-1:-1;;;;;441:4033:119;;;;;;-1:-1:-1;;441:4033:119;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;441:4033:119;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;441:4033:119;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;-1:-1:-1;;;;;441:4033:119;;;;;;:::o;:::-;;;-1:-1:-1;;;;;441:4033:119;;;;;;:::o;:::-;;;-1:-1:-1;;;;;441:4033:119;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;1055:104:6;441:4033:119;1055:104:6;;441:4033:119;;;;;;;;:::i;:::-;;-1:-1:-1;;441:4033:119;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;-1:-1:-1;;441:4033:119;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;441:4033:119;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;441:4033:119;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;;;:::o;:::-;;;-1:-1:-1;;;;;441:4033:119;;;;;;:::o;:::-;;;-1:-1:-1;;;;;441:4033:119;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::o;1176:267::-;1352:34;1176:267;1352:34;441:4033;;;1352:34;;;;;;:::i;:::-;441:4033;;1352:34;1421:14;;;;-1:-1:-1;;;;;441:4033:119;;;;1176:267::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;441:4033:119;;;;;;;;;;;;;4064:22:9;;;;4060:87;;441:4033:119;;;;;;;;;;;;;;4274:33:9;441:4033:119;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;441:4033:119;;3896:19:9;441:4033:119;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;441:4033:119;;;;3881:1:9;441:4033:119;;;;;3881:1:9;441:4033:119;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2096:2051:75;;-1:-1:-1;441:4033:119;;:::i;:::-;2266:30:75;441:4033:119;;:::i;:::-;-1:-1:-1;441:4033:119;;-1:-1:-1;;;2359:27:75;;;;;441:4033:119;;;2359:3:75;-1:-1:-1;;;;;441:4033:119;;-1:-1:-1;441:4033:119;2359:27:75;441:4033:119;;2359:27:75;;-1:-1:-1;;2359:27:75;;;2096:2051;-1:-1:-1;2355:219:75;;4455:24;;;;-1:-1:-1;2535:28:75;2359:27;441:4033:119;2359:27:75;-1:-1:-1;2535:28:75;2355:219;2470:26;;;;;2355:219;441:4033:119;;;;;2588:32:75;;;2359:27;2588:32;;441:4033:119;-1:-1:-1;2588:32:75;2359:27;2588:32;;;;-1:-1:-1;;2588:32:75;;;2355:219;-1:-1:-1;2584:234:75;;4455:24;;;;-1:-1:-1;2774:33:75;2359:27;441:4033:119;2359:27:75;-1:-1:-1;2774:33:75;2584:234;2704:31;;;;;;2584:234;441:4033:119;2879:13:75;;441:4033:119;2896:18:75;2879:35;;;2875:86;;2977:24;;;:::i;:::-;2976:25;2972:64;;3180:11;;;;;;3143:58;;;:::i;:::-;441:4033:119;;;;;-1:-1:-1;;;3419:66:75;;441:4033:119;2359:27:75;3419:66;;441:4033:119;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;3180:11:75;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;441:4033:119;2359:27:75;441:4033:119;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;3419:66:75;;;;441:4033:119;3419:66:75;;;;;;;-1:-1:-1;3419:66:75;;;2584:234;3418:67;;3414:112;;441:4033:119;;;;;:::i;:::-;;;;-1:-1:-1;441:4033:119;3705:47:75;;441:4033:119;;;;;;;:::i;:::-;;;;3611:160:75;;441:4033:119;3583:202:75;;;;;441:4033:119;;-1:-1:-1;;;3583:202:75;;441:4033:119;;2359:27:75;3583:202;;441:4033:119;;;;;;;;;;;;;;;;;;;;-1:-1:-1;441:4033:119;;;-1:-1:-1;3583:202:75;;;;;;;2584:234;-1:-1:-1;3567:293:75;;-1:-1:-1;;;3824:25:75;;2359:27;441:4033:119;;;2359:27:75;5223:21;3824:25;3567:293;441:4033:119;3567:293:75;;441:4033:119;1852:74;441:4033;3567:293:75;;;;;3958:11;441:4033:119;;;;1852:74;;;;;;:::i;:::-;1984:19;;441:4033;;;;;;;;;;;1973:31;;;2359:27:75;1973:31:119;;441:4033;2359:27:75;441:4033:119;;;;:::i;:::-;1973:31;;;;;;;;;3567:293:75;-1:-1:-1;1969:169:119;;-1:-1:-1;;;2100:27:119;;2359::75;2100::119;;1969:169;4056:61:75;2041:20:119;;;441:4033;;2155:26;441:4033;2155:26;;441:4033;;2155:26;;;441:4033;2155:26;;:::i;:::-;441:4033;-1:-1:-1;;;;;441:4033:119;;4056:61:75;;2096:2051;:::o;1973:31:119:-;;;;441:4033;1973:31;;441:4033;1973:31;;;;;;441:4033;1973:31;;;:::i;:::-;;;441:4033;;;;;1973:31;;;;;;;-1:-1:-1;1973:31:119;;3583:202:75;;;;;-1:-1:-1;3583:202:75;;:::i;:::-;-1:-1:-1;3583:202:75;;;;3414:112;3506:20;;;-1:-1:-1;3506:20:75;2359:27;-1:-1:-1;3506:20:75;3419:66;;;441:4033:119;3419:66:75;;441:4033:119;3419:66:75;;;;;;441:4033:119;3419:66:75;;;:::i;:::-;;;441:4033:119;;;;;;;:::i;:::-;3419:66:75;;;;;;-1:-1:-1;3419:66:75;;2588:32;;;;;;;-1:-1:-1;2588:32:75;;;;;;:::i;:::-;;;;;2359:27;;;;;;;-1:-1:-1;2359:27:75;;;;;;:::i;:::-;;;;;441:4033:119;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;441:4033:119;;;;;;;;-1:-1:-1;;441:4033:119;;;;:::o;:::-;;;;-1:-1:-1;;;;;441:4033:119;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;1055:104:6;441:4033:119;1055:104:6;;441:4033:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;441:4033:119;;;:::i;:::-;;;;;;-1:-1:-1;;;;;441:4033:119;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;-1:-1:-1;441:4033:119;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;441:4033:119;;;;;;;:::i;:::-;-1:-1:-1;441:4033:119;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;-1:-1:-1;441:4033:119;;;;;;;;;-1:-1:-1;441:4033:119;;;;;;;;;;:::o;2410:709::-;2621:18;1017:17:72;;;441:4033:119;1017:27:72;1013:55;;1085:27;;;:::i;:::-;2593:47:119;2589:65;;2696:79;2720:15;2820:36;2720:15;;;1017:17:72;441:4033:119;;;2696:79;;;;;;:::i;:::-;441:4033;1017:17:72;441:4033:119;;;2820:36;;;;;;:::i;:::-;2907:18;;;;;441:4033;2896:30;;441:4033;1017:17:72;2896:30:119;;441:4033;1017:17:72;441:4033:119;;2907:18;441:4033;;;;:::i;2896:30::-;441:4033;2886:41;;2907:18;2964:22;;;2907:18;441:4033;2953:34;;441:4033;1017:17:72;2953:34:119;;441:4033;1017:17:72;441:4033:119;;2907:18;441:4033;;;;:::i;2953:34::-;441:4033;2943:45;;2886:102;:154;;;;2410:709;2886:226;;;2867:245;;2410:709;:::o;2886:226::-;1017:17:72;3066:13:119;;;;;;441:4033;;;;;3056:24;3094:17;;;1017::72;441:4033:119;;;;3084:28;3056:56;2410:709;:::o;2886:154::-;441:4033;;;;-1:-1:-1;;;;;441:4033:119;;;;;3004:36;;-1:-1:-1;2886:154:119;;2589:65;2642:12;;441:4033;2642:12;:::o;1013:55:72:-;1053:15;;;441:4033:119;1053:15:72;;441:4033:119;1053:15:72;637:632:62;759:17;-1:-1:-1;25444:17:69;-1:-1:-1;;;25444:17:69;;;25440:103;;637:632:62;25560:17:69;25569:8;26140:7;25560:17;;;25556:103;;637:632:62;25685:8:69;25676:17;;;25672:103;;637:632:62;25801:7:69;25792:16;;;25788:100;;637:632:62;25914:7:69;25905:16;;;25901:100;;637:632:62;26027:7:69;26018:16;;;26014:100;;637:632:62;26131:16:69;;26127:66;;637:632:62;26140:7:69;874:92:62;779:1;441:4033:119;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;1055:104:6;;441:4033:119;;:::i;:::-;;;;;;;874:92:62;;;979:247;-1:-1:-1;;441:4033:119;;-1:-1:-1;;;1033:111:62;;;;441:4033:119;1033:111:62;441:4033:119;1194:10:62;;1190:21;;26140:7:69;979:247:62;;;;1190:21;1206:5;;637:632;:::o;26127:66:69:-;26177:1;441:4033:119;;;;26127:66:69;;26014:100;26027:7;26098:1;441:4033:119;;;;26014:100:69;;;25901;25914:7;25985:1;441:4033:119;;;;25901:100:69;;;25788;25801:7;25872:1;441:4033:119;;;;25788:100:69;;;25672:103;25685:8;25758:2;441:4033:119;;;;25672:103:69;;;25556;25569:8;25642:2;441:4033:119;;;;25556:103:69;;;25440;-1:-1:-1;25526:2:69;;-1:-1:-1;;;;441:4033:119;;25440:103:69;;6040:128:9;6109:4;-1:-1:-1;;;;;441:4033:119;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1174:235:73;1365:20;;441:4033:119;;;;;;;;;;;;;1397:4:73;1365:37;1174:235;:::o;613:261:72:-;-1:-1:-1;;;;;353:25:72;;;441:4033:119;;353:30:72;;;:90;;;;613:261;722:55;;;570:25;;441:4033:119;-1:-1:-1;;;;;441:4033:119;787:58:72;;863:4;613:261;:::o;787:58::-;825:20;;;-1:-1:-1;825:20:72;;-1:-1:-1;825:20:72;722:55;760:17;;;-1:-1:-1;760:17:72;;-1:-1:-1;760:17:72;353:90;428:15;;;-1:-1:-1;399:44:72;353:90;;;856:365:76;441:4033:119;856:365:76;;1914:299:73;856:365:76;-1:-1:-1;;;;;441:4033:119;;;;;;:::i;:::-;;;;;;;;;;;;1914:299:73;;;441:4033:119;2076:4:73;441:4033:119;1914:299:73;;441:4033:119;;1914:299:73;;;441:4033:119;1914:299:73;;;441:4033:119;;1914:299:73;;;441:4033:119;;;;;;;:::i;:::-;1868:18:73;441:4033:119;;1819:413:73;;;441:4033:119;;;;;;;;;;1791:455:73;;;;;;441:4033:119;;;;;;:::i;:::-;1791:455:73;441:4033:119;;1791:3:73;-1:-1:-1;;;;;441:4033:119;1791:455:73;;;;;;;441:4033:119;1791:455:73;;;856:365:76;1102:55;;5816:26:75;441:4033:119;5816:26:75;;856:365:76:o;1791:455:73:-;;;;1914:299;1791:455;;1914:299;1791:455;;;;;;441:4033:119;1791:455:73;;;:::i;:::-;;;441:4033:119;;;;;1791:455:73;;;;;;;-1:-1:-1;1791:455:73;",
    linkReferences: {},
    immutableReferences: {
      "2532": [
        {
          start: 3015,
          length: 32,
        },
      ],
      "2534": [
        {
          start: 3058,
          length: 32,
        },
      ],
      "2536": [
        {
          start: 3101,
          length: 32,
        },
      ],
      "3008": [
        {
          start: 7142,
          length: 32,
        },
      ],
      "52557": [
        {
          start: 2622,
          length: 32,
        },
      ],
      "52560": [
        {
          start: 1173,
          length: 32,
        },
        {
          start: 1592,
          length: 32,
        },
        {
          start: 2123,
          length: 32,
        },
        {
          start: 5090,
          length: 32,
        },
        {
          start: 7482,
          length: 32,
        },
      ],
      "52562": [
        {
          start: 1237,
          length: 32,
        },
        {
          start: 1517,
          length: 32,
        },
        {
          start: 2213,
          length: 32,
        },
        {
          start: 2572,
          length: 32,
        },
        {
          start: 2949,
          length: 32,
        },
        {
          start: 5250,
          length: 32,
        },
        {
          start: 6511,
          length: 32,
        },
        {
          start: 7407,
          length: 32,
        },
      ],
    },
  },
  methodIdentifiers: {
    "ATTESTATION_SCHEMA()": "5bf2f20d",
    "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e60c3505",
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "collectEscrow(bytes32,bytes32)": "2c713cd9",
    "collectEscrowRaw(bytes32,bytes32)": "891d9ea8",
    "decodeObligationData(bytes)": "c93844be",
    "doObligation((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64)": "cce1f561",
    "doObligationFor((address,bytes,(bytes32,(address,uint64,bool,bytes32,bytes,uint256))),uint64,address)": "9c13d80e",
    "doObligationRaw(bytes,uint64,bytes32)": "b3b902d4",
    "extractArbiterAndDemand(bytes)": "8371ef59",
    "getObligationData(bytes32)": "c6ec5070",
    "getSchema()": "6b122fe0",
    "isPayable()": "ce46e046",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "reclaimExpired(bytes32)": "7d2c2931",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "version()": "54fd4d50",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IEAS","name":"_eas","type":"address"},{"internalType":"contract ISchemaRegistry","name":"_schemaRegistry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[],"name":"AttestationCreationFailed","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"AttestationNotFound","type":"error"},{"inputs":[],"name":"AttestationRevoked","type":"error"},{"inputs":[],"name":"DeadlineExpired","type":"error"},{"inputs":[],"name":"InsufficientValue","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"InvalidEscrowAttestation","type":"error"},{"inputs":[],"name":"InvalidFulfillment","type":"error"},{"inputs":[],"name":"InvalidLength","type":"error"},{"inputs":[],"name":"InvalidSchema","type":"error"},{"inputs":[],"name":"NotFromThisAttester","type":"error"},{"inputs":[],"name":"NotPayable","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"RevocationFailed","type":"error"},{"inputs":[],"name":"UnauthorizedCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"fulfillment","type":"bytes32"},{"indexed":true,"internalType":"address","name":"fulfiller","type":"address"}],"name":"EscrowCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"EscrowMade","type":"event"},{"inputs":[],"name":"ATTESTATION_SCHEMA","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"attest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"escrow","type":"bytes32"},{"internalType":"bytes32","name":"fulfillment","type":"bytes32"}],"name":"collectEscrow","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_escrow","type":"bytes32"},{"internalType":"bytes32","name":"_fulfillment","type":"bytes32"}],"name":"collectEscrowRaw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData","name":"data","type":"tuple"}],"internalType":"struct AttestationRequest","name":"attestation","type":"tuple"}],"internalType":"struct AttestationEscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData","name":"data","type":"tuple"}],"internalType":"struct AttestationRequest","name":"attestation","type":"tuple"}],"internalType":"struct AttestationEscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"}],"name":"doObligation","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData","name":"data","type":"tuple"}],"internalType":"struct AttestationRequest","name":"attestation","type":"tuple"}],"internalType":"struct AttestationEscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"recipient","type":"address"}],"name":"doObligationFor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"extractArbiterAndDemand","outputs":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AttestationRequestData","name":"data","type":"tuple"}],"internalType":"struct AttestationRequest","name":"attestation","type":"tuple"}],"internalType":"struct AttestationEscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSchema","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"internalType":"struct SchemaRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiAttest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiRevoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"reclaimExpired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"revoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}],"devdoc":{"kind":"dev","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The new attestation."},"returns":{"_0":"Whether the attestation is valid."}},"isPayable()":{"returns":{"_0":"Whether the resolver supports ETH transfers."}},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The new attestations.","values":"Explicit ETH amounts which were sent with each attestation."},"returns":{"_0":"Whether all the attestations are valid."}},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The existing attestations to be revoked.","values":"Explicit ETH amounts which were sent with each revocation."},"returns":{"_0":"Whether the attestations can be revoked."}},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The existing attestation to be revoked."},"returns":{"_0":"Whether the attestation can be revoked."}},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"version":1},"userdoc":{"kind":"user","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation and verifies whether it\'s valid."},"isPayable()":{"notice":"Checks if the resolver can be sent ETH."},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes multiple attestations and verifies whether they are valid."},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes revocation of multiple attestation and verifies they can be revoked."},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation revocation and verifies if it can be revoked."},"version()":{"notice":"Returns the full semver contract version."}},"version":1}},"settings":{"compilationTarget":{"src/obligations/escrow/tierable/AttestationEscrowObligation.sol":"AttestationEscrowObligation"},"evmVersion":"prague","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",":@erc8004/=lib/trustless-agents-erc-ri/src/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/",":reference/=lib/trustless-agents-erc-ri/lib/reference/",":trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd","license":"UNLICENSED","urls":["bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61","dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV"]},"src/BaseAttester.sol":{"keccak256":"0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa","license":"UNLICENSED","urls":["bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084","dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa"]},"src/BaseEscrowObligationTierable.sol":{"keccak256":"0x26037abaf9daa46bba57b27b6dd2747dd87ff95e0620de36ec53fa4d1eb2ee27","license":"UNLICENSED","urls":["bzz-raw://88da4a010af7d818749a2a12ed19236a9024d65fedba4c38b7c21038c2306856","dweb:/ipfs/QmTecNhxu6SVCPixzMZQ4dQNvfQvzbWniM6p5pecpNca6j"]},"src/BaseObligation.sol":{"keccak256":"0x480fa485da7ad129249d0f90c29fd54aa9f0c4b572b235ba98a4e05a307e14ea","license":"UNLICENSED","urls":["bzz-raw://03c7daf95a8c62b0d2d31215491144348a677ab2a9c150d7b485f49b55582b98","dweb:/ipfs/QmZPPDF64rZZhUqG7HCrCrYvs5VDXon9ofwRFhXdB9gJCn"]},"src/IArbiter.sol":{"keccak256":"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629","license":"UNLICENSED","urls":["bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9","dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"]},"src/obligations/escrow/tierable/AttestationEscrowObligation.sol":{"keccak256":"0x983862531390eefbdf134ac4060b6321978a00df295efad40955883715e95d7d","license":"UNLICENSED","urls":["bzz-raw://c3bae11873a98b253479c68264b288dcbe3ec88b5cf7f0020feafb7155128d81","dweb:/ipfs/QmXpL6qmnAkwhPaBkPpXQbzj9Ma3ptHZ8SttGVq1mP4Pr1"]}},"version":1}',
  metadata: {
    compiler: {
      version: "0.8.27+commit.40a35a09",
    },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [
            {
              internalType: "contract IEAS",
              name: "_eas",
              type: "address",
            },
            {
              internalType: "contract ISchemaRegistry",
              name: "_schemaRegistry",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          type: "error",
          name: "AccessDenied",
        },
        {
          inputs: [],
          type: "error",
          name: "AttestationCreationFailed",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "attestationId",
              type: "bytes32",
            },
          ],
          type: "error",
          name: "AttestationNotFound",
        },
        {
          inputs: [],
          type: "error",
          name: "AttestationRevoked",
        },
        {
          inputs: [],
          type: "error",
          name: "DeadlineExpired",
        },
        {
          inputs: [],
          type: "error",
          name: "InsufficientValue",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidEAS",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidEscrowAttestation",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidFulfillment",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidLength",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidSchema",
        },
        {
          inputs: [],
          type: "error",
          name: "NotFromThisAttester",
        },
        {
          inputs: [],
          type: "error",
          name: "NotPayable",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "attestationId",
              type: "bytes32",
            },
          ],
          type: "error",
          name: "RevocationFailed",
        },
        {
          inputs: [],
          type: "error",
          name: "UnauthorizedCall",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "escrow",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "bytes32",
              name: "fulfillment",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "address",
              name: "fulfiller",
              type: "address",
              indexed: true,
            },
          ],
          type: "event",
          name: "EscrowCollected",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "escrow",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "address",
              name: "buyer",
              type: "address",
              indexed: true,
            },
          ],
          type: "event",
          name: "EscrowMade",
          anonymous: false,
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "ATTESTATION_SCHEMA",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "attest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "obligation",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "checkObligation",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "escrow",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "fulfillment",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "collectEscrow",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_escrow",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "_fulfillment",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "collectEscrowRaw",
          outputs: [
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          stateMutability: "pure",
          type: "function",
          name: "decodeObligationData",
          outputs: [
            {
              internalType: "struct AttestationEscrowObligation.ObligationData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "struct AttestationRequest",
                  name: "attestation",
                  type: "tuple",
                  components: [
                    {
                      internalType: "bytes32",
                      name: "schema",
                      type: "bytes32",
                    },
                    {
                      internalType: "struct AttestationRequestData",
                      name: "data",
                      type: "tuple",
                      components: [
                        {
                          internalType: "address",
                          name: "recipient",
                          type: "address",
                        },
                        {
                          internalType: "uint64",
                          name: "expirationTime",
                          type: "uint64",
                        },
                        {
                          internalType: "bool",
                          name: "revocable",
                          type: "bool",
                        },
                        {
                          internalType: "bytes32",
                          name: "refUID",
                          type: "bytes32",
                        },
                        {
                          internalType: "bytes",
                          name: "data",
                          type: "bytes",
                        },
                        {
                          internalType: "uint256",
                          name: "value",
                          type: "uint256",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct AttestationEscrowObligation.ObligationData",
              name: "data",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "struct AttestationRequest",
                  name: "attestation",
                  type: "tuple",
                  components: [
                    {
                      internalType: "bytes32",
                      name: "schema",
                      type: "bytes32",
                    },
                    {
                      internalType: "struct AttestationRequestData",
                      name: "data",
                      type: "tuple",
                      components: [
                        {
                          internalType: "address",
                          name: "recipient",
                          type: "address",
                        },
                        {
                          internalType: "uint64",
                          name: "expirationTime",
                          type: "uint64",
                        },
                        {
                          internalType: "bool",
                          name: "revocable",
                          type: "bool",
                        },
                        {
                          internalType: "bytes32",
                          name: "refUID",
                          type: "bytes32",
                        },
                        {
                          internalType: "bytes",
                          name: "data",
                          type: "bytes",
                        },
                        {
                          internalType: "uint256",
                          name: "value",
                          type: "uint256",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              internalType: "uint64",
              name: "expirationTime",
              type: "uint64",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "doObligation",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct AttestationEscrowObligation.ObligationData",
              name: "data",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "struct AttestationRequest",
                  name: "attestation",
                  type: "tuple",
                  components: [
                    {
                      internalType: "bytes32",
                      name: "schema",
                      type: "bytes32",
                    },
                    {
                      internalType: "struct AttestationRequestData",
                      name: "data",
                      type: "tuple",
                      components: [
                        {
                          internalType: "address",
                          name: "recipient",
                          type: "address",
                        },
                        {
                          internalType: "uint64",
                          name: "expirationTime",
                          type: "uint64",
                        },
                        {
                          internalType: "bool",
                          name: "revocable",
                          type: "bool",
                        },
                        {
                          internalType: "bytes32",
                          name: "refUID",
                          type: "bytes32",
                        },
                        {
                          internalType: "bytes",
                          name: "data",
                          type: "bytes",
                        },
                        {
                          internalType: "uint256",
                          name: "value",
                          type: "uint256",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              internalType: "uint64",
              name: "expirationTime",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "doObligationFor",
          outputs: [
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              internalType: "uint64",
              name: "expirationTime",
              type: "uint64",
            },
            {
              internalType: "bytes32",
              name: "refUID",
              type: "bytes32",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "doObligationRaw",
          outputs: [
            {
              internalType: "bytes32",
              name: "uid_",
              type: "bytes32",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          stateMutability: "pure",
          type: "function",
          name: "extractArbiterAndDemand",
          outputs: [
            {
              internalType: "address",
              name: "arbiter",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "getObligationData",
          outputs: [
            {
              internalType: "struct AttestationEscrowObligation.ObligationData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "arbiter",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "demand",
                  type: "bytes",
                },
                {
                  internalType: "struct AttestationRequest",
                  name: "attestation",
                  type: "tuple",
                  components: [
                    {
                      internalType: "bytes32",
                      name: "schema",
                      type: "bytes32",
                    },
                    {
                      internalType: "struct AttestationRequestData",
                      name: "data",
                      type: "tuple",
                      components: [
                        {
                          internalType: "address",
                          name: "recipient",
                          type: "address",
                        },
                        {
                          internalType: "uint64",
                          name: "expirationTime",
                          type: "uint64",
                        },
                        {
                          internalType: "bool",
                          name: "revocable",
                          type: "bool",
                        },
                        {
                          internalType: "bytes32",
                          name: "refUID",
                          type: "bytes32",
                        },
                        {
                          internalType: "bytes",
                          name: "data",
                          type: "bytes",
                        },
                        {
                          internalType: "uint256",
                          name: "value",
                          type: "uint256",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "getSchema",
          outputs: [
            {
              internalType: "struct SchemaRecord",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "contract ISchemaResolver",
                  name: "resolver",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "string",
                  name: "schema",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "pure",
          type: "function",
          name: "isPayable",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiAttest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation[]",
              name: "attestations",
              type: "tuple[]",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "multiRevoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "uid",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "reclaimExpired",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "attestation",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
          ],
          stateMutability: "payable",
          type: "function",
          name: "revoke",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "version",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "payable",
          type: "receive",
        },
      ],
      devdoc: {
        kind: "dev",
        methods: {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            params: {
              attestation: "The new attestation.",
            },
            returns: {
              _0: "Whether the attestation is valid.",
            },
          },
          "isPayable()": {
            returns: {
              _0: "Whether the resolver supports ETH transfers.",
            },
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            params: {
              attestations: "The new attestations.",
              values: "Explicit ETH amounts which were sent with each attestation.",
            },
            returns: {
              _0: "Whether all the attestations are valid.",
            },
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            params: {
              attestations: "The existing attestations to be revoked.",
              values: "Explicit ETH amounts which were sent with each revocation.",
            },
            returns: {
              _0: "Whether the attestations can be revoked.",
            },
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            params: {
              attestation: "The existing attestation to be revoked.",
            },
            returns: {
              _0: "Whether the attestation can be revoked.",
            },
          },
          "version()": {
            returns: {
              _0: "Semver contract version as a string.",
            },
          },
        },
        version: 1,
      },
      userdoc: {
        kind: "user",
        methods: {
          "attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            notice: "Processes an attestation and verifies whether it's valid.",
          },
          "isPayable()": {
            notice: "Checks if the resolver can be sent ETH.",
          },
          "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            notice: "Processes multiple attestations and verifies whether they are valid.",
          },
          "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": {
            notice: "Processes revocation of multiple attestation and verifies they can be revoked.",
          },
          "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": {
            notice: "Processes an attestation revocation and verifies if it can be revoked.",
          },
          "version()": {
            notice: "Returns the full semver contract version.",
          },
        },
        version: 1,
      },
    },
    settings: {
      remappings: [
        "@eas/=lib/eas-contracts/contracts/",
        "@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",
        "@erc8004/=lib/trustless-agents-erc-ri/src/",
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
        "reference/=lib/trustless-agents-erc-ri/lib/reference/",
        "trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/",
      ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: "ipfs",
      },
      compilationTarget: {
        "src/obligations/escrow/tierable/AttestationEscrowObligation.sol": "AttestationEscrowObligation",
      },
      evmVersion: "prague",
      libraries: {},
      viaIR: true,
    },
    sources: {
      "lib/eas-contracts/contracts/Common.sol": {
        keccak256: "0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685",
        urls: [
          "bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d",
          "dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/IEAS.sol": {
        keccak256: "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        urls: [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        keccak256: "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        urls: [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        keccak256: "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        urls: [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/Semver.sol": {
        keccak256: "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        urls: [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        keccak256: "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        urls: [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        keccak256: "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        urls: [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        keccak256: "0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c",
        urls: [
          "bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4",
          "dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        keccak256: "0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2",
        urls: [
          "bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440",
          "dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        keccak256: "0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c",
        urls: [
          "bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966",
          "dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        keccak256: "0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481",
        urls: [
          "bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb",
          "dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        keccak256: "0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0",
        urls: [
          "bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426",
          "dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY",
        ],
        license: "MIT",
      },
      "src/ArbiterUtils.sol": {
        keccak256: "0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd",
        urls: [
          "bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61",
          "dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV",
        ],
        license: "UNLICENSED",
      },
      "src/BaseAttester.sol": {
        keccak256: "0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa",
        urls: [
          "bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084",
          "dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa",
        ],
        license: "UNLICENSED",
      },
      "src/BaseEscrowObligationTierable.sol": {
        keccak256: "0x26037abaf9daa46bba57b27b6dd2747dd87ff95e0620de36ec53fa4d1eb2ee27",
        urls: [
          "bzz-raw://88da4a010af7d818749a2a12ed19236a9024d65fedba4c38b7c21038c2306856",
          "dweb:/ipfs/QmTecNhxu6SVCPixzMZQ4dQNvfQvzbWniM6p5pecpNca6j",
        ],
        license: "UNLICENSED",
      },
      "src/BaseObligation.sol": {
        keccak256: "0x480fa485da7ad129249d0f90c29fd54aa9f0c4b572b235ba98a4e05a307e14ea",
        urls: [
          "bzz-raw://03c7daf95a8c62b0d2d31215491144348a677ab2a9c150d7b485f49b55582b98",
          "dweb:/ipfs/QmZPPDF64rZZhUqG7HCrCrYvs5VDXon9ofwRFhXdB9gJCn",
        ],
        license: "UNLICENSED",
      },
      "src/IArbiter.sol": {
        keccak256: "0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629",
        urls: [
          "bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9",
          "dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv",
        ],
        license: "UNLICENSED",
      },
      "src/obligations/escrow/tierable/AttestationEscrowObligation.sol": {
        keccak256: "0x983862531390eefbdf134ac4060b6321978a00df295efad40955883715e95d7d",
        urls: [
          "bzz-raw://c3bae11873a98b253479c68264b288dcbe3ec88b5cf7f0020feafb7155128d81",
          "dweb:/ipfs/QmXpL6qmnAkwhPaBkPpXQbzj9Ma3ptHZ8SttGVq1mP4Pr1",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 119,
} as const;
