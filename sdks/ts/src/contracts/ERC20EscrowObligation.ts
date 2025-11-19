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
          type: "bool",
          internalType: "bool",
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
          internalType: "struct ERC20EscrowObligation.ObligationData",
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
              name: "token",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
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
          internalType: "struct ERC20EscrowObligation.ObligationData",
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
              name: "token",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
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
          internalType: "struct ERC20EscrowObligation.ObligationData",
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
              name: "token",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
          ],
        },
        {
          name: "expirationTime",
          type: "uint64",
          internalType: "uint64",
        },
        {
          name: "payer",
          type: "address",
          internalType: "address",
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
      name: "doObligationForRaw",
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
          name: "payer",
          type: "address",
          internalType: "address",
        },
        {
          name: "recipient",
          type: "address",
          internalType: "address",
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
      stateMutability: "nonpayable",
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
          internalType: "struct ERC20EscrowObligation.ObligationData",
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
              name: "token",
              type: "address",
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
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
      name: "ERC20TransferFailed",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address",
        },
        {
          name: "from",
          type: "address",
          internalType: "address",
        },
        {
          name: "to",
          type: "address",
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
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
      "0x61016080604052346101f857604081611ec680380380916100208285610232565b8339810103126101f85780516001600160a01b038116918282036101f85760200151916001600160a01b0383168084036101f857604051606081016001600160401b0381118282101761021e57604052603c815260208101927f6164647265737320617262697465722c2062797465732064656d616e642c206184527f64647265737320746f6b656e2c2075696e7432353620616d6f756e740000000060408301526001608052600360a0525f60c0521561020f576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af1908115610204575f916101ce575b5061014052604051611c709081610256823960805181610a0c015260a05181610a37015260c05181610a62015260e05181611b870152610100518161088e0152610120518181816103c30152818161068c0152818161124801526119070152610140518181816104030152818161085c015281816109ca015281816114270152818161167c015261185a0152f35b90506020813d6020116101fc575b816101e960209383610232565b810103126101f857515f610140565b5f80fd5b3d91506101dc565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b0382119082101761021e5760405256fe60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c80632c713cd914610b6a5780633ce55d0214610adb57806354fd4d50146109ed5780635bf2f20d146109b35780636b122fe01461081d5780637d2c2931146106545780638371ef59146105f657806388e5b2d9146105a9578063891d9ea8146105c857806391db0b7e146105a9578063a4f0d517146104d5578063b3b902d41461048a578063c6ec507014610384578063c93844be146102b7578063ce46e0461461029d578063e49617e114610282578063e60c350514610282578063e6c9714d146101605763f0ffa1850361000e573461015c5760a036600319011261015c576004356001600160401b03811161015c576101546101316020923690600401610da1565b610139610b9d565b610141610bc7565b9061014a610bdd565b926084359461176b565b604051908152f35b5f80fd5b3461015c57606036600319011261015c576004356001600160401b03811161015c57610140600319823603011261015c576040519061019e82610c5a565b80600401358252602481013560208301526101bb60448201610bb3565b60408301526101cc60648201610bb3565b60608301526101dd60848201610bb3565b608083015260a481013560a08301526101f860c48201610bf3565b60c083015261020960e48201610bf3565b60e0830152610104810135801515810361015c57610100830152610124810135906001600160401b03821161015c5760046102479236920101610d03565b6101208201526024356001600160401b03811161015c57602091610272610278923690600401610d03565b9061167a565b6040519015158152f35b602061027861029036610e18565b610298611b85565b611bc6565b3461015c575f36600319011261015c5760206040515f8152f35b3461015c57602036600319011261015c576004356001600160401b03811161015c576102e7903690600401610da1565b6102ef611656565b5081019060208183031261015c578035906001600160401b03821161015c57019060808282031261015c576040519061032782610c2b565b61033083610bf3565b82526020830135926001600160401b03841161015c57610357606092610380958301610d03565b602084015261036860408201610bf3565b60408401520135606082015260405191829182610dce565b0390f35b3461015c57602036600319011261015c5761039d611656565b506103a6610f6a565b506040516328c44a9960e21b815260048035908201525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa90811561047f575f9161045d575b5060208101517f00000000000000000000000000000000000000000000000000000000000000000361044e57610442610120610380920151602080825183010191016110d1565b60405191829182610dce565b635527981560e11b5f5260045ffd5b61047991503d805f833e6104718183610c91565b810190610ff6565b816103fb565b6040513d5f823e3d90fd5b3461015c57606036600319011261015c576004356001600160401b03811161015c576101546104bf6020923690600401610da1565b6104c7610b9d565b91604435923392339261176b565b3461015c57604036600319011261015c576004356001600160401b03811161015c576080600319823603011261015c5760206105589161052b610539610519610b9d565b92604051928391600401868301610e4c565b03601f198101835282610c91565b60405163f0ffa18560e01b815293849283923391829160048601610ee4565b03815f305af1801561047f575f90610576575b602090604051908152f35b506020813d6020116105a1575b8161059060209383610c91565b8101031261015c576020905161056b565b3d9150610583565b60206102786105b736610d51565b926105c3929192611b85565b61117a565b3461015c576103806105e26105dc36610b87565b9061121e565b604051918291602083526020830190610c07565b3461015c57602036600319011261015c576004356001600160401b03811161015c5761062961062e913690600401610d03565b611151565b604080516001600160a01b03909316835260208301819052829161038091830190610c07565b3461015c57602036600319011261015c57600435610670610f6a565b506040516328c44a9960e21b8152600481018290525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa5f9181610801575b506106d657506301fb6dd160e01b5f5260045260245ffd5b6001600160401b0360608201511642106107f2576107116101208201519160c060018060a01b039101511691602080825183010191016110d1565b6040818101805160609093018051925163a9059cbb60e01b81526001600160a01b0386811660048301526024820194909452909391929091602091839160449183915f91165af15f91816107b6575b506107b157505f5b1561077857602060405160018152f35b519051604051634a73404560e11b81526001600160a01b0392831660048201523060248201529290911660448301526064820152608490fd5b610768565b9091506020813d6020116107ea575b816107d260209383610c91565b8101031261015c576107e390610f27565b9085610760565b3d91506107c5565b637bf6a16f60e01b5f5260045ffd5b6108169192503d805f833e6104718183610c91565b90836106be565b3461015c575f36600319011261015c5760608060405161083c81610c2b565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561047f575f90610903575b606090610380604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610c07565b503d805f833e6109138183610c91565b81019060208183031261015c578051906001600160401b03821161015c570160808183031261015c576040519061094982610c2b565b8051825260208101516001600160a01b038116810361015c57602083015261097360408201610f27565b60408301526060810151906001600160401b03821161015c570182601f8201121561015c576060928160206109aa93519101610f34565b828201526108bd565b3461015c575f36600319011261015c5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461015c575f36600319011261015c5761038060206105e26001610a307f0000000000000000000000000000000000000000000000000000000000000000611a18565b8184610a5b7f0000000000000000000000000000000000000000000000000000000000000000611a18565b8180610a867f0000000000000000000000000000000000000000000000000000000000000000611a18565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610c91565b3461015c57608036600319011261015c576004356001600160401b03811161015c576080600319823603011261015c576020610b15610b9d565b610b41610558610b23610bc7565b94610b4f610b2f610bdd565b91604051948591600401888301610e4c565b03601f198101855284610c91565b60405163f0ffa18560e01b8152958694859460048601610ee4565b3461015c57610b7b6105dc36610b87565b50602060405160018152f35b604090600319011261015c576004359060243590565b602435906001600160401b038216820361015c57565b35906001600160401b038216820361015c57565b604435906001600160a01b038216820361015c57565b606435906001600160a01b038216820361015c57565b35906001600160a01b038216820361015c57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610c4657604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b03821117610c4657604052565b604081019081106001600160401b03821117610c4657604052565b90601f801991011681019081106001600160401b03821117610c4657604052565b6001600160401b038111610c4657601f01601f191660200190565b929192610cd982610cb2565b91610ce76040519384610c91565b82948184528183011161015c578281602093845f960137010152565b9080601f8301121561015c57816020610d1e93359101610ccd565b90565b9181601f8401121561015c578235916001600160401b03831161015c576020808501948460051b01011161015c57565b604060031982011261015c576004356001600160401b03811161015c5781610d7b91600401610d21565b92909291602435906001600160401b03821161015c57610d9d91600401610d21565b9091565b9181601f8401121561015c578235916001600160401b03831161015c576020838186019501011161015c57565b6020815260018060a01b03825116602082015260806060610dfd602085015183604086015260a0850190610c07565b60408501516001600160a01b03168483015293015191015290565b602060031982011261015c57600435906001600160401b03821161015c5761014090829003600319011261015c5760040190565b602081526001600160a01b03610e6183610bf3565b1660208201526020820135601e198336030181121561015c5782016020813591016001600160401b03821161015c57813603811361015c5760c09382606092608060408701528160a0870152868601375f8484018601526001600160a01b03610ecc60408301610bf3565b168483015201356080830152601f01601f1916010190565b90935f936001600160401b03610f06608095989760a0865260a0860190610c07565b971660208401526001600160a01b0390811660408401521660608201520152565b5190811515820361015c57565b929192610f4082610cb2565b91610f4e6040519384610c91565b82948184528183011161015c578281602093845f96015e010152565b60405190610f7782610c5a565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361015c57565b51906001600160a01b038216820361015c57565b9080601f8301121561015c578151610d1e92602001610f34565b60208183031261015c578051906001600160401b03821161015c57016101408183031261015c576040519161102a83610c5a565b815183526020820151602084015261104460408301610fb4565b604084015261105560608301610fb4565b606084015261106660808301610fb4565b608084015260a082015160a084015261108160c08301610fc8565b60c084015261109260e08301610fc8565b60e08401526110a46101008301610f27565b6101008401526101208201516001600160401b03811161015c576110c89201610fdc565b61012082015290565b60208183031261015c578051906001600160401b03821161015c57019060808282031261015c576040519161110583610c2b565b61110e81610fc8565b835260208101516001600160401b03811161015c57606092611131918301610fdc565b602084015261114260408201610fc8565b60408401520151606082015290565b61116490602080825183010191016110d1565b80516020909101516001600160a01b0390911691565b92909281840361120f575f91345b8584101561120457818410156111f0578360051b80860135908282116111e15784013561013e198536030181121561015c576111c5908501611bc6565b156111d65760019103930192611188565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f611228610f6a565b50611231610f6a565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f918161163a575b5061129957856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481865afa5f918161161e575b506112d957866301fb6dd160e01b5f5260045260245ffd5b959192939495926112e982611bdf565b1561160f576113c860206101208085019460c0886113da61130a8951611151565b91909451916040519889978896879663e6c9714d60e01b885260606004890152805160648901528b81015160848901526001600160401b0360408201511660a48901526001600160401b0360608201511660c48901526001600160401b0360808201511660e489015260a0810151610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610c07565b84810360031901602486015290610c07565b604483019190915203916001600160a01b03165afa90811561047f575f916115d5575b50156115c65760405161140f81610c76565b8581525f60208201526040519061142582610c76565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b1561015c5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af190816115b1575b506114a75763614cf93960e01b85526004849052602485fd5b9392909193516114ca60018060a01b0386511691602080825183010191016110d1565b6040818101805160609093018051925163a9059cbb60e01b81526001600160a01b0386811660048301526024820194909452909391929091602091839160449183918c91165af1879181611571575b5061156c5750855b15610778575050507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c060405194611559602087610c91565b848652516001600160a01b03169380a490565b611521565b9091506020813d6020116115a9575b8161158d60209383610c91565b810103126115a55761159e90610f27565b905f611519565b8780fd5b3d9150611580565b6115be9196505f90610c91565b5f945f61148e565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611607575b816115f060209383610c91565b8101031261015c5761160190610f27565b5f6113fd565b3d91506115e3565b63629cd40b60e11b5f5260045ffd5b6116339192503d805f833e6104718183610c91565b905f6112c1565b61164f9192503d805f833e6104718183610c91565b905f611281565b6040519061166382610c2b565b5f6060838281528160208201528260408201520152565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361175c576116ae81611bdf565b15611756576116ce6101206116de920151602080825183010191016110d1565b91602080825183010191016110d1565b604082810151908201516001600160a01b039081169116149182611742575b82611729575b8261170d57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611703565b9150606082015160608201511115916116fd565b50505f90565b635f9bd90760e11b5f5260045ffd5b919395949261178d61177e368486610ccd565b602080825183010191016110d1565b90604082015f6020606060018060a01b038451169501946064865160405194859384926323b872dd60e01b845260018060a01b038a16600485015230602485015260448401525af15f91816119dc575b506119d757505f5b1561199b57505050906117f9913691610ccd565b906040519460c08601908682106001600160401b03831117610c46576001600160401b039160405260018060a01b03169384875216602086015260016040860152606085015260808401525f60a0840152602060405161185881610c76565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06118f9608083015160c060e4860152610124850190610c07565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af192831561047f575f93611967575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011611993575b8161198360209383610c91565b8101031261015c5751915f61193f565b3d9150611976565b519151604051634a73404560e11b81526001600160a01b0393841660048201529190921660248201523060448201526064810191909152608490fd5b6117e5565b9091506020813d602011611a10575b816119f860209383610c91565b8101031261015c57611a0990610f27565b905f6117dd565b3d91506119eb565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b62575b806d04ee2d6d415b85acef8100000000600a921015611b47575b662386f26fc10000811015611b33575b6305f5e100811015611b22575b612710811015611b13575b6064811015611b05575b1015611afa575b600a60216001840193611a9f85610cb2565b94611aad6040519687610c91565b808652611abc601f1991610cb2565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611af557600a9091611ac7565b505090565b600190910190611a8d565b606460029104930192611a86565b61271060049104930192611a7c565b6305f5e10060089104930192611a71565b662386f26fc1000060109104930192611a64565b6d04ee2d6d415b85acef810000000060209104930192611a54565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611a3a565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611bb757565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361015c57301490565b6001600160401b036060820151168015159081611c30575b50611c2157608001516001600160401b0316611c1257600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611bf756fea2646970667358221220f111f7554ec315dc59cc304cd3548236a59795c7f878b7d9f04ad5239483939964736f6c634300081b0033",
    sourceMap:
      "434:5212:123:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;;;;;;;1045:4;759:14:6;;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;434:5212:123;790:10:9;;434:5212:123;790:10:9;;;789::77;;809:32;;-1:-1:-1;434:5212:123;;;;;;;;;;;872:48:77;;434:5212:123;872:48:77;;;434:5212:123;;;;;;;;;;;;;;;;;;;;;904:4:77;434:5212:123;;;;1045:4;434:5212;;;;;;-1:-1:-1;;434:5212:123;;;872:48:77;;;;;;;;;;-1:-1:-1;872:48:77;;;-1:-1:-1;851:69:77;;;434:5212:123;;;;;;;;759:14:6;434:5212:123;;;;;783:14:6;434:5212:123;;;;;807:14:6;434:5212:123;;;;;790:10:9;434:5212:123;;;;;809:32:77;434:5212:123;;;;;789:10:77;434:5212:123;;;;;;;;;;;;;;;;;;;;851:69:77;434:5212:123;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;872:48:77;;;434:5212:123;872:48:77;;434:5212:123;872:48:77;;;;;;434:5212:123;872:48:77;;;:::i;:::-;;;434:5212:123;;;;;872:48:77;;;434:5212:123;-1:-1:-1;434:5212:123;;872:48:77;;;-1:-1:-1;872:48:77;;;434:5212:123;;;-1:-1:-1;434:5212:123;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;;-1:-1:-1;434:5212:123;;;;;;-1:-1:-1;;434:5212:123;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;:::o",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x60806040526004361015610027575b3615610018575f80fd5b631574f9f360e01b5f5260045ffd5b5f3560e01c80632c713cd914610b6a5780633ce55d0214610adb57806354fd4d50146109ed5780635bf2f20d146109b35780636b122fe01461081d5780637d2c2931146106545780638371ef59146105f657806388e5b2d9146105a9578063891d9ea8146105c857806391db0b7e146105a9578063a4f0d517146104d5578063b3b902d41461048a578063c6ec507014610384578063c93844be146102b7578063ce46e0461461029d578063e49617e114610282578063e60c350514610282578063e6c9714d146101605763f0ffa1850361000e573461015c5760a036600319011261015c576004356001600160401b03811161015c576101546101316020923690600401610da1565b610139610b9d565b610141610bc7565b9061014a610bdd565b926084359461176b565b604051908152f35b5f80fd5b3461015c57606036600319011261015c576004356001600160401b03811161015c57610140600319823603011261015c576040519061019e82610c5a565b80600401358252602481013560208301526101bb60448201610bb3565b60408301526101cc60648201610bb3565b60608301526101dd60848201610bb3565b608083015260a481013560a08301526101f860c48201610bf3565b60c083015261020960e48201610bf3565b60e0830152610104810135801515810361015c57610100830152610124810135906001600160401b03821161015c5760046102479236920101610d03565b6101208201526024356001600160401b03811161015c57602091610272610278923690600401610d03565b9061167a565b6040519015158152f35b602061027861029036610e18565b610298611b85565b611bc6565b3461015c575f36600319011261015c5760206040515f8152f35b3461015c57602036600319011261015c576004356001600160401b03811161015c576102e7903690600401610da1565b6102ef611656565b5081019060208183031261015c578035906001600160401b03821161015c57019060808282031261015c576040519061032782610c2b565b61033083610bf3565b82526020830135926001600160401b03841161015c57610357606092610380958301610d03565b602084015261036860408201610bf3565b60408401520135606082015260405191829182610dce565b0390f35b3461015c57602036600319011261015c5761039d611656565b506103a6610f6a565b506040516328c44a9960e21b815260048035908201525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa90811561047f575f9161045d575b5060208101517f00000000000000000000000000000000000000000000000000000000000000000361044e57610442610120610380920151602080825183010191016110d1565b60405191829182610dce565b635527981560e11b5f5260045ffd5b61047991503d805f833e6104718183610c91565b810190610ff6565b816103fb565b6040513d5f823e3d90fd5b3461015c57606036600319011261015c576004356001600160401b03811161015c576101546104bf6020923690600401610da1565b6104c7610b9d565b91604435923392339261176b565b3461015c57604036600319011261015c576004356001600160401b03811161015c576080600319823603011261015c5760206105589161052b610539610519610b9d565b92604051928391600401868301610e4c565b03601f198101835282610c91565b60405163f0ffa18560e01b815293849283923391829160048601610ee4565b03815f305af1801561047f575f90610576575b602090604051908152f35b506020813d6020116105a1575b8161059060209383610c91565b8101031261015c576020905161056b565b3d9150610583565b60206102786105b736610d51565b926105c3929192611b85565b61117a565b3461015c576103806105e26105dc36610b87565b9061121e565b604051918291602083526020830190610c07565b3461015c57602036600319011261015c576004356001600160401b03811161015c5761062961062e913690600401610d03565b611151565b604080516001600160a01b03909316835260208301819052829161038091830190610c07565b3461015c57602036600319011261015c57600435610670610f6a565b506040516328c44a9960e21b8152600481018290525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa5f9181610801575b506106d657506301fb6dd160e01b5f5260045260245ffd5b6001600160401b0360608201511642106107f2576107116101208201519160c060018060a01b039101511691602080825183010191016110d1565b6040818101805160609093018051925163a9059cbb60e01b81526001600160a01b0386811660048301526024820194909452909391929091602091839160449183915f91165af15f91816107b6575b506107b157505f5b1561077857602060405160018152f35b519051604051634a73404560e11b81526001600160a01b0392831660048201523060248201529290911660448301526064820152608490fd5b610768565b9091506020813d6020116107ea575b816107d260209383610c91565b8101031261015c576107e390610f27565b9085610760565b3d91506107c5565b637bf6a16f60e01b5f5260045ffd5b6108169192503d805f833e6104718183610c91565b90836106be565b3461015c575f36600319011261015c5760608060405161083c81610c2b565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa801561047f575f90610903575b606090610380604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610c07565b503d805f833e6109138183610c91565b81019060208183031261015c578051906001600160401b03821161015c570160808183031261015c576040519061094982610c2b565b8051825260208101516001600160a01b038116810361015c57602083015261097360408201610f27565b60408301526060810151906001600160401b03821161015c570182601f8201121561015c576060928160206109aa93519101610f34565b828201526108bd565b3461015c575f36600319011261015c5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b3461015c575f36600319011261015c5761038060206105e26001610a307f0000000000000000000000000000000000000000000000000000000000000000611a18565b8184610a5b7f0000000000000000000000000000000000000000000000000000000000000000611a18565b8180610a867f0000000000000000000000000000000000000000000000000000000000000000611a18565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610c91565b3461015c57608036600319011261015c576004356001600160401b03811161015c576080600319823603011261015c576020610b15610b9d565b610b41610558610b23610bc7565b94610b4f610b2f610bdd565b91604051948591600401888301610e4c565b03601f198101855284610c91565b60405163f0ffa18560e01b8152958694859460048601610ee4565b3461015c57610b7b6105dc36610b87565b50602060405160018152f35b604090600319011261015c576004359060243590565b602435906001600160401b038216820361015c57565b35906001600160401b038216820361015c57565b604435906001600160a01b038216820361015c57565b606435906001600160a01b038216820361015c57565b35906001600160a01b038216820361015c57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610c4657604052565b634e487b7160e01b5f52604160045260245ffd5b61014081019081106001600160401b03821117610c4657604052565b604081019081106001600160401b03821117610c4657604052565b90601f801991011681019081106001600160401b03821117610c4657604052565b6001600160401b038111610c4657601f01601f191660200190565b929192610cd982610cb2565b91610ce76040519384610c91565b82948184528183011161015c578281602093845f960137010152565b9080601f8301121561015c57816020610d1e93359101610ccd565b90565b9181601f8401121561015c578235916001600160401b03831161015c576020808501948460051b01011161015c57565b604060031982011261015c576004356001600160401b03811161015c5781610d7b91600401610d21565b92909291602435906001600160401b03821161015c57610d9d91600401610d21565b9091565b9181601f8401121561015c578235916001600160401b03831161015c576020838186019501011161015c57565b6020815260018060a01b03825116602082015260806060610dfd602085015183604086015260a0850190610c07565b60408501516001600160a01b03168483015293015191015290565b602060031982011261015c57600435906001600160401b03821161015c5761014090829003600319011261015c5760040190565b602081526001600160a01b03610e6183610bf3565b1660208201526020820135601e198336030181121561015c5782016020813591016001600160401b03821161015c57813603811361015c5760c09382606092608060408701528160a0870152868601375f8484018601526001600160a01b03610ecc60408301610bf3565b168483015201356080830152601f01601f1916010190565b90935f936001600160401b03610f06608095989760a0865260a0860190610c07565b971660208401526001600160a01b0390811660408401521660608201520152565b5190811515820361015c57565b929192610f4082610cb2565b91610f4e6040519384610c91565b82948184528183011161015c578281602093845f96015e010152565b60405190610f7782610c5a565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b038216820361015c57565b51906001600160a01b038216820361015c57565b9080601f8301121561015c578151610d1e92602001610f34565b60208183031261015c578051906001600160401b03821161015c57016101408183031261015c576040519161102a83610c5a565b815183526020820151602084015261104460408301610fb4565b604084015261105560608301610fb4565b606084015261106660808301610fb4565b608084015260a082015160a084015261108160c08301610fc8565b60c084015261109260e08301610fc8565b60e08401526110a46101008301610f27565b6101008401526101208201516001600160401b03811161015c576110c89201610fdc565b61012082015290565b60208183031261015c578051906001600160401b03821161015c57019060808282031261015c576040519161110583610c2b565b61110e81610fc8565b835260208101516001600160401b03811161015c57606092611131918301610fdc565b602084015261114260408201610fc8565b60408401520151606082015290565b61116490602080825183010191016110d1565b80516020909101516001600160a01b0390911691565b92909281840361120f575f91345b8584101561120457818410156111f0578360051b80860135908282116111e15784013561013e198536030181121561015c576111c5908501611bc6565b156111d65760019103930192611188565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f611228610f6a565b50611231610f6a565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa5f918161163a575b5061129957856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481865afa5f918161161e575b506112d957866301fb6dd160e01b5f5260045260245ffd5b959192939495926112e982611bdf565b1561160f576113c860206101208085019460c0886113da61130a8951611151565b91909451916040519889978896879663e6c9714d60e01b885260606004890152805160648901528b81015160848901526001600160401b0360408201511660a48901526001600160401b0360608201511660c48901526001600160401b0360808201511660e489015260a0810151610104890152019e8f60018060a01b0390511661012488015260018060a01b0360e082015116610144880152610100810151151561016488015201516101406101848701526101a4860190610c07565b84810360031901602486015290610c07565b604483019190915203916001600160a01b03165afa90811561047f575f916115d5575b50156115c65760405161140f81610c76565b8581525f60208201526040519061142582610c76565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b1561015c5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af190816115b1575b506114a75763614cf93960e01b85526004849052602485fd5b9392909193516114ca60018060a01b0386511691602080825183010191016110d1565b6040818101805160609093018051925163a9059cbb60e01b81526001600160a01b0386811660048301526024820194909452909391929091602091839160449183918c91165af1879181611571575b5061156c5750855b15610778575050507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c060405194611559602087610c91565b848652516001600160a01b03169380a490565b611521565b9091506020813d6020116115a9575b8161158d60209383610c91565b810103126115a55761159e90610f27565b905f611519565b8780fd5b3d9150611580565b6115be9196505f90610c91565b5f945f61148e565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611607575b816115f060209383610c91565b8101031261015c5761160190610f27565b5f6113fd565b3d91506115e3565b63629cd40b60e11b5f5260045ffd5b6116339192503d805f833e6104718183610c91565b905f6112c1565b61164f9192503d805f833e6104718183610c91565b905f611281565b6040519061166382610c2b565b5f6060838281528160208201528260408201520152565b7f000000000000000000000000000000000000000000000000000000000000000060208201510361175c576116ae81611bdf565b15611756576116ce6101206116de920151602080825183010191016110d1565b91602080825183010191016110d1565b604082810151908201516001600160a01b039081169116149182611742575b82611729575b8261170d57505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b039081169116149250611703565b9150606082015160608201511115916116fd565b50505f90565b635f9bd90760e11b5f5260045ffd5b919395949261178d61177e368486610ccd565b602080825183010191016110d1565b90604082015f6020606060018060a01b038451169501946064865160405194859384926323b872dd60e01b845260018060a01b038a16600485015230602485015260448401525af15f91816119dc575b506119d757505f5b1561199b57505050906117f9913691610ccd565b906040519460c08601908682106001600160401b03831117610c46576001600160401b039160405260018060a01b03169384875216602086015260016040860152606085015260808401525f60a0840152602060405161185881610c76565b7f000000000000000000000000000000000000000000000000000000000000000081528181019485526040518095819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a06118f9608083015160c060e4860152610124850190610c07565b91015161010483015203815f7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af192831561047f575f93611967575b50827f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d065f80a3565b9092506020813d602011611993575b8161198360209383610c91565b8101031261015c5751915f61193f565b3d9150611976565b519151604051634a73404560e11b81526001600160a01b0393841660048201529190921660248201523060448201526064810191909152608490fd5b6117e5565b9091506020813d602011611a10575b816119f860209383610c91565b8101031261015c57611a0990610f27565b905f6117dd565b3d91506119eb565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611b62575b806d04ee2d6d415b85acef8100000000600a921015611b47575b662386f26fc10000811015611b33575b6305f5e100811015611b22575b612710811015611b13575b6064811015611b05575b1015611afa575b600a60216001840193611a9f85610cb2565b94611aad6040519687610c91565b808652611abc601f1991610cb2565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611af557600a9091611ac7565b505090565b600190910190611a8d565b606460029104930192611a86565b61271060049104930192611a7c565b6305f5e10060089104930192611a71565b662386f26fc1000060109104930192611a64565b6d04ee2d6d415b85acef810000000060209104930192611a54565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611a3a565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611bb757565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b03811680910361015c57301490565b6001600160401b036060820151168015159081611c30575b50611c2157608001516001600160401b0316611c1257600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611bf756fea2646970667358221220f111f7554ec315dc59cc304cd3548236a59795c7f878b7d9f04ad5239483939964736f6c634300081b0033",
    sourceMap:
      "434:5212:123:-:0;;;;;;;;;-1:-1:-1;434:5212:123;;;;;;;;1183:12:9;;;1054:5;1183:12;434:5212:123;1054:5:9;1183:12;434:5212:123;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;434:5212:123;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;434:5212:123;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;3045:39:9;434:5212:123;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;434:5212:123:-;;;;;;-1:-1:-1;;434:5212:123;;;;;;;;;;;;;;;;;-1:-1:-1;;434:5212:123;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;5603:34;;434:5212;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;434:5212:123;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;434:5212:123;;-1:-1:-1;;;2392:23:77;;434:5212:123;;;2392:23:77;;;434:5212:123;-1:-1:-1;434:5212:123;2392:23:77;434:5212:123;2392:3:77;-1:-1:-1;;;;;434:5212:123;2392:23:77;;;;;;;434:5212:123;2392:23:77;;;434:5212:123;2429:19:77;434:5212:123;2429:19:77;;434:5212:123;2452:18:77;2429:41;2425:87;;5418:46:123;5429:16;434:5212;5429:16;;;434:5212;;;;5418:46;;;;;;:::i;:::-;434:5212;;;;;;;:::i;2425:87:77:-;2491:21;;;434:5212:123;2491:21:77;434:5212:123;;2491:21:77;2392:23;;;;;;434:5212:123;2392:23:77;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;434:5212:123;;;;;;;;;;;;;;;-1:-1:-1;;434:5212:123;;;;;;-1:-1:-1;;;;;434:5212:123;;;;716:142:80;434:5212:123;;;;;;;;:::i;:::-;;;:::i;:::-;;;;794:10:80;;;;716:142;;:::i;434:5212:123:-;;;;;;-1:-1:-1;;434:5212:123;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;4453:187;434:5212;4494:16;;434:5212;;:::i;:::-;;;;;;;;;4494:16;;;;:::i;:::-;;4900;;4494;;;;;;:::i;:::-;434:5212;;-1:-1:-1;;;4453:187:123;;434:5212;;;;;4560:10;;;;434:5212;4453:187;;;:::i;:::-;;:4;434:5212;4453:4;:187;;;;;;434:5212;4453:187;;;434:5212;;;;;;;;;4453:187;;434:5212;4453:187;;434:5212;4453:187;;;;;;434:5212;4453:187;;;:::i;:::-;;;434:5212;;;;;;;4453:187;;;;;-1:-1:-1;4453:187:123;;434:5212;;1442:1461:9;434:5212:123;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;434:5212:123:-;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;434:5212:123;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;434:5212:123;;;;;;;;:::i;:::-;-1:-1:-1;434:5212:123;;-1:-1:-1;;;3989:23:78;;434:5212:123;3989:23:78;;434:5212:123;;;-1:-1:-1;434:5212:123;3989:23:78;434:5212:123;3989:3:78;-1:-1:-1;;;;;434:5212:123;3989:23:78;;434:5212:123;;3989:23:78;;;434:5212:123;-1:-1:-1;3985:172:78;;4122:24;;;;434:5212:123;4122:24:78;434:5212:123;;3989:23:78;434:5212:123;4122:24:78;3985:172;-1:-1:-1;;;;;4189:26:78;;;434:5212:123;;4171:15:78;:44;4167:87;;3070:34:123;4334:16:78;;;;434:5212:123;4352:21:78;434:5212:123;;;;;4352:21:78;;434:5212:123;;;;;;;3070:34;;;;;;:::i;:::-;434:5212;3148:13;;;434:5212;;4189:26:78;3176:14:123;;;434:5212;;;;-1:-1:-1;;;3141:50:123;;-1:-1:-1;;;;;434:5212:123;;;;3141:50;;434:5212;;;;;;;;3176:14;;3148:13;;434:5212;;;;;;;;;;-1:-1:-1;;434:5212:123;3141:50;;434:5212;;3141:50;;;3985:172:78;-1:-1:-1;3137:187:123;;3298:15;434:5212;3137:187;3338:8;3334:193;;434:5212;;;;;;;3334:193;434:5212;;;;;-1:-1:-1;;;3369:147:123;;-1:-1:-1;;;;;434:5212:123;;;;3369:147;;434:5212;3445:4;434:5212;;;;;;;;;;;;;;;;;;3369:147;3137:187;;;3141:50;;;;434:5212;3141:50;;434:5212;3141:50;;;;;;434:5212;3141:50;;;:::i;:::-;;;434:5212;;;;;;;:::i;:::-;3141:50;;;;;;;-1:-1:-1;3141:50:123;;4167:87:78;4236:18;;;434:5212:123;4236:18:78;434:5212:123;;4236:18:78;3989:23;;;;;;;434:5212:123;3989:23:78;;;;;;:::i;:::-;;;;;434:5212:123;;;;;;-1:-1:-1;;434:5212:123;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1497:44:77;;1522:18;434:5212:123;1497:44:77;;434:5212:123;;;1497:44:77;434:5212:123;;;;;;1497:14:77;434:5212:123;1497:44:77;;;;;;434:5212:123;1497:44:77;;;434:5212:123;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1497:44:77:-;;;;434:5212:123;1497:44:77;;;;;;:::i;:::-;;;434:5212:123;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1497:44:77;;434:5212:123;;;;;;-1:-1:-1;;434:5212:123;;;;;;;542:43:77;434:5212:123;;;;;;;;;-1:-1:-1;;434:5212:123;;;;;1055:104:6;;434:5212:123;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;434:5212:123;;;;;;;;;;;;1055:104:6;;;434:5212:123;;;;-1:-1:-1;;;434:5212:123;;;;;;;;;;;;;;;;;-1:-1:-1;;;434:5212:123;;;;;;;;;;;;;;;;;;;;;1055:104:6;;4900:16:123;;1055:104:6;;;;;;:::i;434:5212:123:-;;;;;;-1:-1:-1;;434:5212:123;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;:::i;:::-;4900:16;4859:181;434:5212;;:::i;:::-;;4900:16;434:5212;;:::i;:::-;;;;;;;;;4900:16;;;;:::i;:::-;;;;;;;;;;:::i;:::-;434:5212;;-1:-1:-1;;;4859:181:123;;434:5212;;;;;;4859:181;;;:::i;434:5212::-;;;;5169:37;434:5212;;;:::i;5169:37::-;;434:5212;;;5223:4;434:5212;;;;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;434:5212:123;;;;;;:::o;:::-;;;-1:-1:-1;;;;;434:5212:123;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;434:5212:123;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;434:5212:123;;;;;;:::o;:::-;;;-1:-1:-1;;;;;434:5212:123;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;434:5212:123;;;;;;;;-1:-1:-1;;434:5212:123;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;:::o;:::-;;;;-1:-1:-1;434:5212:123;;;;;-1:-1:-1;434:5212:123;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;:::o;:::-;;;4900:16;;434:5212;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;:::o;:::-;-1:-1:-1;;;;;434:5212:123;;;;;;-1:-1:-1;;434:5212:123;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;434:5212:123;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;434:5212:123;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;434:5212:123;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;-1:-1:-1;;434:5212:123;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;434:5212:123;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;;434:5212:123;;;;:::o;:::-;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;434:5212:123;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;434:5212:123;;-1:-1:-1;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;-1:-1:-1;434:5212:123;;;;;;:::o;:::-;;;-1:-1:-1;;;;;434:5212:123;;;;;;:::o;:::-;;;-1:-1:-1;;;;;434:5212:123;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;:::o;1125:267::-;1301:34;1125:267;1301:34;434:5212;;;1301:34;;;;;;:::i;:::-;434:5212;;1301:34;1370:14;;;;-1:-1:-1;;;;;434:5212:123;;;;1125:267::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;434:5212:123;;;;;;;;;;;;;4064:22:9;;;;4060:87;;434:5212:123;;;;;;;;;;;;;;4274:33:9;434:5212:123;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;434:5212:123;;3896:19:9;434:5212:123;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;434:5212:123;;;;3881:1:9;434:5212:123;;;;;3881:1:9;434:5212:123;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2054:1760:78;;-1:-1:-1;434:5212:123;;:::i;:::-;2224:30:78;434:5212:123;;:::i;:::-;-1:-1:-1;434:5212:123;;-1:-1:-1;;;2317:27:78;;;;;434:5212:123;;;2317:3:78;-1:-1:-1;;;;;434:5212:123;;-1:-1:-1;434:5212:123;2317:27:78;434:5212:123;;2317:27:78;;-1:-1:-1;;2317:27:78;;;2054:1760;-1:-1:-1;2313:219:78;;4122:24;;;;-1:-1:-1;2493:28:78;2317:27;434:5212:123;2317:27:78;-1:-1:-1;2493:28:78;2313:219;2428:26;;;;;434:5212:123;;;;;2546:32:78;;;2317:27;2546:32;;434:5212:123;-1:-1:-1;2546:32:78;2317:27;2546:32;;;;-1:-1:-1;;2546:32:78;;;2313:219;-1:-1:-1;2542:234:78;;4122:24;;;;-1:-1:-1;2732:33:78;2317:27;434:5212:123;2317:27:78;-1:-1:-1;2732:33:78;2542:234;2662:31;;;;;;2542:234;2791:24;;;:::i;:::-;2790:25;2786:64;;434:5212:123;;2994:11:78;;;;;434:5212:123;2994:11:78;434:5212:123;2957:58:78;2994:11;;2957:58;:::i;:::-;434:5212:123;;;;;;;;;;;;;;;;;3086:66:78;;434:5212:123;2317:27:78;3086:66;;434:5212:123;;;;;;;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;434:5212:123;2317:27:78;434:5212:123;;;;;:::i;:::-;;;;;;;;3086:66:78;;-1:-1:-1;;;;;434:5212:123;3086:66:78;;;;;;;-1:-1:-1;3086:66:78;;;2542:234;3085:67;;3081:112;;434:5212:123;;;;;:::i;:::-;;;;-1:-1:-1;434:5212:123;3372:47:78;;434:5212:123;;;;;;;:::i;:::-;3326:18:78;434:5212:123;;;3278:160:78;;434:5212:123;;;3250:202:78;;;;;434:5212:123;-1:-1:-1;434:5212:123;;;;;;;;;;;;;;3250:202:78;;434:5212:123;2317:27:78;3250:202;;434:5212:123;;;;2317:27:78;434:5212:123;;;;;;;;;3250:202:78;;;;;;2542:234;-1:-1:-1;3234:293:78;;-1:-1:-1;;;3491:25:78;;2317:27;434:5212:123;;;2317:27:78;3491:25;;3234:293;;;;;;3625:11;2339:74:123;434:5212;;;;;;;;;;;;;2339:74;;;;;;:::i;:::-;434:5212;2457:13;;;434:5212;;;2485:14;;;434:5212;;;;-1:-1:-1;;;2450:50:123;;-1:-1:-1;;;;;434:5212:123;;;2317:27:78;2450:50:123;;434:5212;;;;;;;;2485:14;;2457:13;;434:5212;;;;;;;;;;;;;2450:50;;;;;;;3234:293:78;-1:-1:-1;2446:187:123;;2607:15;;2446:187;2647:8;2643:193;;434:5212;;;3723:61:78;434:5212:123;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;434:5212:123;;;3723:61:78;2054:1760;:::o;2446:187:123:-;;;2450:50;;;;434:5212;2450:50;;434:5212;2450:50;;;;;;434:5212;2450:50;;;:::i;:::-;;;434:5212;;;;;;;:::i;:::-;2450:50;;;;434:5212;;;;2450:50;;;-1:-1:-1;2450:50:123;;3250:202:78;;;;;-1:-1:-1;3250:202:78;;:::i;:::-;-1:-1:-1;3250:202:78;;;;3081:112;3173:20;;;-1:-1:-1;3173:20:78;2317:27;-1:-1:-1;3173:20:78;3086:66;;;434:5212:123;3086:66:78;;434:5212:123;3086:66:78;;;;;;434:5212:123;3086:66:78;;;:::i;:::-;;;434:5212:123;;;;;;;:::i;:::-;3086:66:78;;;;;;-1:-1:-1;3086:66:78;;2786:64;2824:26;;;-1:-1:-1;2824:26:78;2317:27;-1:-1:-1;2824:26:78;2546:32;;;;;;;-1:-1:-1;2546:32:78;;;;;;:::i;:::-;;;;;2317:27;;;;;;;-1:-1:-1;2317:27:78;;;;;;:::i;:::-;;;;;434:5212:123;;;;;;;:::i;:::-;-1:-1:-1;434:5212:123;;;;;;;;;;;;;;;;;:::o;3565:696::-;3778:18;1016:17:76;;;434:5212:123;1016:27:76;1012:55;;1084:27;;;:::i;:::-;3750:47:123;3746:65;;3854:79;3878:15;3978:36;3878:15;;;1016:17:76;434:5212:123;;;3854:79;;;;;;:::i;:::-;434:5212;1016:17:76;434:5212:123;;;3978:36;;;;;;:::i;:::-;4044:13;;;;434:5212;4061:16;;;434:5212;-1:-1:-1;;;;;434:5212:123;;;;;4044:33;;;:84;;3565:696;4044:137;;;3565:696;4044:210;;;4025:229;;3565:696;:::o;4044:210::-;1016:17:76;4207:14:123;;;;;;434:5212;;;;;4197:25;4236:17;;;1016::76;434:5212:123;;;;4226:28;4197:57;3565:696;:::o;4044:137::-;434:5212;;;;-1:-1:-1;;;;;434:5212:123;;;;;4144:37;;-1:-1:-1;4044:137:123;;:84;4093:14;;;;;434:5212;4093:14;4111:17;;434:5212;-1:-1:-1;4093:35:123;4044:84;;;3746:65;3799:12;;434:5212;3799:12;:::o;1012:55:76:-;1052:15;;;434:5212:123;1052:15:76;;434:5212:123;1052:15:76;871:377:80;;;;;;1547:34:123;434:5212;;;;;:::i;:::-;1547:34;434:5212;;;1547:34;;;;;;:::i;:::-;1592:12;1637:13;;;-1:-1:-1;1547:34:123;1735:14;434:5212;;;;;;;;1735:14;;434:5212;1630:133;434:5212;;1637:13;434:5212;;;;;;;;;1630:133;;434:5212;;;;;;;1630:133;;;434:5212;1712:4;434:5212;;;;;;;;1630:133;;-1:-1:-1;;1630:133:123;;;871:377:80;-1:-1:-1;1614:268:123;;1856:15;-1:-1:-1;1614:268:123;1896:8;1892:195;;434:5212;;;;;;;;;:::i;:::-;;1637:13;434:5212;;;;;;;;;-1:-1:-1;;;;;434:5212:123;;;;;-1:-1:-1;;;;;434:5212:123;1637:13;434:5212;;;;;;;;;;;;1547:34;1914:299:77;;434:5212:123;2076:4:77;1637:13:123;1914:299:77;;434:5212:123;1735:14;1914:299:77;;434:5212:123;1914:299:77;;;434:5212:123;-1:-1:-1;1914:299:77;;;434:5212:123;1547:34;1637:13;434:5212;;;;:::i;:::-;1868:18:77;434:5212:123;;1819:413:77;;;434:5212:123;;;1637:13;434:5212;;;;;;;;1791:455:77;;;1630:133:123;1791:455:77;;434:5212:123;;;;;;;1637:13;434:5212;;;;;;;;;;;;1630:133;434:5212;;;-1:-1:-1;;;;;434:5212:123;;;;;;;;;1637:13;434:5212;;;;;;;;;1735:14;434:5212;;;;;;;1914:299:77;434:5212:123;1914:299:77;434:5212:123;;;;;;;;;;;;;:::i;:::-;;;;;;;;1791:455:77;434:5212:123;-1:-1:-1;1791:3:77;-1:-1:-1;;;;;434:5212:123;1791:455:77;;;;;;;-1:-1:-1;1791:455:77;;;1614:268:123;1134:55:80;;4820:26:78;-1:-1:-1;4820:26:78;;871:377:80:o;1791:455:77:-;;;;1547:34:123;1791:455:77;;1547:34:123;1791:455:77;;;;;;434:5212:123;1791:455:77;;;:::i;:::-;;;434:5212:123;;;;;1791:455:77;;;;;;;-1:-1:-1;1791:455:77;;1892:195:123;434:5212;;;1637:13;434:5212;-1:-1:-1;;;1927:149:123;;-1:-1:-1;;;;;434:5212:123;;;1630:133;1927:149;;434:5212;;;;;;;;;1712:4;434:5212;;;;;;;;;;;;;3369:147;1614:268;;;1630:133;;;;1547:34;1630:133;;1547:34;1630:133;;;;;;1547:34;1630:133;;;:::i;:::-;;;434:5212;;;;;;;:::i;:::-;1630:133;;;;;;;-1:-1:-1;1630:133:123;;637:632:63;759:17;-1:-1:-1;25444:17:70;-1:-1:-1;;;25444:17:70;;;25440:103;;637:632:63;25560:17:70;25569:8;26140:7;25560:17;;;25556:103;;637:632:63;25685:8:70;25676:17;;;25672:103;;637:632:63;25801:7:70;25792:16;;;25788:100;;637:632:63;25914:7:70;25905:16;;;25901:100;;637:632:63;26027:7:70;26018:16;;;26014:100;;637:632:63;26131:16:70;;26127:66;;637:632:63;26140:7:70;874:92:63;779:1;434:5212:123;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;4900:16;;434:5212;;:::i;:::-;;;;;;;874:92:63;;;979:247;-1:-1:-1;;434:5212:123;;-1:-1:-1;;;1033:111:63;;;;434:5212:123;1033:111:63;434:5212:123;1194:10:63;;1190:21;;26140:7:70;979:247:63;;;;1190:21;1206:5;;637:632;:::o;26127:66:70:-;26177:1;434:5212:123;;;;26127:66:70;;26014:100;26027:7;26098:1;434:5212:123;;;;26014:100:70;;;25901;25914:7;25985:1;434:5212:123;;;;25901:100:70;;;25788;25801:7;25872:1;434:5212:123;;;;25788:100:70;;;25672:103;25685:8;25758:2;434:5212:123;;;;25672:103:70;;;25556;25569:8;25642:2;434:5212:123;;;;25556:103:70;;;25440;-1:-1:-1;25526:2:70;;-1:-1:-1;;;;434:5212:123;;25440:103:70;;6040:128:9;6109:4;-1:-1:-1;;;;;434:5212:123;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1174:235:77;1365:20;;434:5212:123;;;;;;;;;;;;;1397:4:77;1365:37;1174:235;:::o;612:261:76:-;-1:-1:-1;;;;;353:25:76;;;434:5212:123;;353:30:76;;;:89;;;;612:261;721:55;;;569:25;;434:5212:123;-1:-1:-1;;;;;434:5212:123;786:58:76;;862:4;612:261;:::o;786:58::-;824:20;;;-1:-1:-1;824:20:76;;-1:-1:-1;824:20:76;721:55;759:17;;;-1:-1:-1;759:17:76;;-1:-1:-1;759:17:76;353:89;427:15;;;-1:-1:-1;353:89:76;;",
    linkReferences: {},
    immutableReferences: {
      "2532": [
        {
          start: 2572,
          length: 32,
        },
      ],
      "2534": [
        {
          start: 2615,
          length: 32,
        },
      ],
      "2536": [
        {
          start: 2658,
          length: 32,
        },
      ],
      "3008": [
        {
          start: 7047,
          length: 32,
        },
      ],
      "54658": [
        {
          start: 2190,
          length: 32,
        },
      ],
      "54661": [
        {
          start: 963,
          length: 32,
        },
        {
          start: 1676,
          length: 32,
        },
        {
          start: 4680,
          length: 32,
        },
        {
          start: 6407,
          length: 32,
        },
      ],
      "54663": [
        {
          start: 1027,
          length: 32,
        },
        {
          start: 2140,
          length: 32,
        },
        {
          start: 2506,
          length: 32,
        },
        {
          start: 5159,
          length: 32,
        },
        {
          start: 5756,
          length: 32,
        },
        {
          start: 6234,
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
    "doObligation((address,bytes,address,uint256),uint64)": "a4f0d517",
    "doObligationFor((address,bytes,address,uint256),uint64,address,address)": "3ce55d02",
    "doObligationForRaw(bytes,uint64,address,address,bytes32)": "f0ffa185",
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
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IEAS","name":"_eas","type":"address"},{"internalType":"contract ISchemaRegistry","name":"_schemaRegistry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"AttestationNotFound","type":"error"},{"inputs":[],"name":"AttestationRevoked","type":"error"},{"inputs":[],"name":"DeadlineExpired","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC20TransferFailed","type":"error"},{"inputs":[],"name":"InsufficientValue","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"InvalidEscrowAttestation","type":"error"},{"inputs":[],"name":"InvalidFulfillment","type":"error"},{"inputs":[],"name":"InvalidLength","type":"error"},{"inputs":[],"name":"InvalidSchema","type":"error"},{"inputs":[],"name":"NotFromThisAttester","type":"error"},{"inputs":[],"name":"NotPayable","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"RevocationFailed","type":"error"},{"inputs":[],"name":"UnauthorizedCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"fulfillment","type":"bytes32"},{"indexed":true,"internalType":"address","name":"fulfiller","type":"address"}],"name":"EscrowCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"EscrowMade","type":"event"},{"inputs":[],"name":"ATTESTATION_SCHEMA","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"attest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"escrow","type":"bytes32"},{"internalType":"bytes32","name":"fulfillment","type":"bytes32"}],"name":"collectEscrow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_escrow","type":"bytes32"},{"internalType":"bytes32","name":"_fulfillment","type":"bytes32"}],"name":"collectEscrowRaw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC20EscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC20EscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"}],"name":"doObligation","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC20EscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"recipient","type":"address"}],"name":"doObligationFor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationForRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"extractArbiterAndDemand","outputs":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC20EscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSchema","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"internalType":"struct SchemaRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiAttest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiRevoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"reclaimExpired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"revoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}],"devdoc":{"kind":"dev","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The new attestation."},"returns":{"_0":"Whether the attestation is valid."}},"isPayable()":{"returns":{"_0":"Whether the resolver supports ETH transfers."}},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The new attestations.","values":"Explicit ETH amounts which were sent with each attestation."},"returns":{"_0":"Whether all the attestations are valid."}},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The existing attestations to be revoked.","values":"Explicit ETH amounts which were sent with each revocation."},"returns":{"_0":"Whether the attestations can be revoked."}},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The existing attestation to be revoked."},"returns":{"_0":"Whether the attestation can be revoked."}},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"version":1},"userdoc":{"kind":"user","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation and verifies whether it\'s valid."},"isPayable()":{"notice":"Checks if the resolver can be sent ETH."},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes multiple attestations and verifies whether they are valid."},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes revocation of multiple attestation and verifies they can be revoked."},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation revocation and verifies if it can be revoked."},"version()":{"notice":"Returns the full semver contract version."}},"version":1}},"settings":{"compilationTarget":{"src/obligations/ERC20EscrowObligation.sol":"ERC20EscrowObligation"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4","license":"MIT","urls":["bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009","dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab","license":"UNLICENSED","urls":["bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12","dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit"]},"src/BaseAttester.sol":{"keccak256":"0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa","license":"UNLICENSED","urls":["bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084","dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa"]},"src/BaseEscrowObligation.sol":{"keccak256":"0x79f2b634467f60d2599566052d187ab570b5a5abb7d9ad4fb9608b10f1feb09c","license":"UNLICENSED","urls":["bzz-raw://c95fd69af07d9a26edf7c59fa8269bdd8958a41f2dd9de7e5ad2985198a69724","dweb:/ipfs/QmSWC22iabz1xHqsqqfm6exuk5VghGGrco4A1wGTSnsdBb"]},"src/BaseObligationNew.sol":{"keccak256":"0xb6f62aaa01bbb8c7d87a4437b466e5e95e9d6086626b780f367d3071ee20e8be","license":"UNLICENSED","urls":["bzz-raw://9216c00ddf06a890e591fc21969211be2b7a98aba8615021dd26352af5f472bc","dweb:/ipfs/Qmbc2MAT1DaT2e5Ue3PzjJmQRKb2CMNcB7YCPdjHS2Fjtc"]},"src/IArbiter.sol":{"keccak256":"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab","license":"UNLICENSED","urls":["bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038","dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff"]},"src/obligations/ERC20EscrowObligation.sol":{"keccak256":"0xea0a753d1408265a0a25414afb20c82681d4bb9d34238471af4c30c555dbaf67","license":"UNLICENSED","urls":["bzz-raw://7a259ee4dbb03d35de1190c6e7d8ea5cd20e3941490c398eee8a98dcfac9f169","dweb:/ipfs/Qmc5BtgKF8cL5xwytyombbadyTM5X7Rq3xZ1fC2rQsvX2m"]}},"version":1}',
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
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          type: "error",
          name: "ERC20TransferFailed",
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
              internalType: "struct ERC20EscrowObligation.ObligationData",
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
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "struct ERC20EscrowObligation.ObligationData",
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
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
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
              internalType: "struct ERC20EscrowObligation.ObligationData",
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
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
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
              name: "payer",
              type: "address",
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
              internalType: "address",
              name: "payer",
              type: "address",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "refUID",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "doObligationForRaw",
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
          stateMutability: "nonpayable",
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
              internalType: "struct ERC20EscrowObligation.ObligationData",
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
                  internalType: "address",
                  name: "token",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
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
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
      ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: "ipfs",
      },
      compilationTarget: {
        "src/obligations/ERC20EscrowObligation.sol": "ERC20EscrowObligation",
      },
      evmVersion: "cancun",
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
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        keccak256: "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        urls: [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN",
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
        keccak256: "0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab",
        urls: [
          "bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12",
          "dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit",
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
      "src/BaseEscrowObligation.sol": {
        keccak256: "0x79f2b634467f60d2599566052d187ab570b5a5abb7d9ad4fb9608b10f1feb09c",
        urls: [
          "bzz-raw://c95fd69af07d9a26edf7c59fa8269bdd8958a41f2dd9de7e5ad2985198a69724",
          "dweb:/ipfs/QmSWC22iabz1xHqsqqfm6exuk5VghGGrco4A1wGTSnsdBb",
        ],
        license: "UNLICENSED",
      },
      "src/BaseObligationNew.sol": {
        keccak256: "0xb6f62aaa01bbb8c7d87a4437b466e5e95e9d6086626b780f367d3071ee20e8be",
        urls: [
          "bzz-raw://9216c00ddf06a890e591fc21969211be2b7a98aba8615021dd26352af5f472bc",
          "dweb:/ipfs/Qmbc2MAT1DaT2e5Ue3PzjJmQRKb2CMNcB7YCPdjHS2Fjtc",
        ],
        license: "UNLICENSED",
      },
      "src/IArbiter.sol": {
        keccak256: "0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab",
        urls: [
          "bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038",
          "dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff",
        ],
        license: "UNLICENSED",
      },
      "src/obligations/ERC20EscrowObligation.sol": {
        keccak256: "0xea0a753d1408265a0a25414afb20c82681d4bb9d34238471af4c30c555dbaf67",
        urls: [
          "bzz-raw://7a259ee4dbb03d35de1190c6e7d8ea5cd20e3941490c398eee8a98dcfac9f169",
          "dweb:/ipfs/Qmc5BtgKF8cL5xwytyombbadyTM5X7Rq3xZ1fC2rQsvX2m",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 123,
} as const;
