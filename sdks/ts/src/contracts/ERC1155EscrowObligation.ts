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
          internalType: "struct ERC1155EscrowObligation.ObligationData",
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
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
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
          internalType: "struct ERC1155EscrowObligation.ObligationData",
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
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
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
          internalType: "struct ERC1155EscrowObligation.ObligationData",
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
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
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
          internalType: "struct ERC1155EscrowObligation.ObligationData",
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
              name: "tokenId",
              type: "uint256",
              internalType: "uint256",
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
      name: "onERC1155BatchReceived",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "onERC1155Received",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bytes4",
          internalType: "bytes4",
        },
      ],
      stateMutability: "nonpayable",
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
      name: "supportsInterface",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4",
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
      name: "ERC1155TransferFailed",
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
          name: "tokenId",
          type: "uint256",
          internalType: "uint256",
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
      "0x610160806040523461020e576040816121b780380380916100208285610248565b83398101031261020e5780516001600160a01b0381169182820361020e5760200151916001600160a01b03831680840361020e57604051608081016001600160401b0381118282101761023457604052604d815260208101927f6164647265737320617262697465722c2062797465732064656d616e642c206184527f64647265737320746f6b656e2c2075696e7432353620746f6b656e49642c207560408301526c1a5b9d0c8d4d88185b5bdd5b9d609a1b60608301526001608052600360a0525f60c05215610225576084948460209560e05261012052610100525f604051958680958194630c1af44f60e31b8352606060048401525180918160648501528484015e818101830184905230602483015260016044830152601f01601f191681010301925af190811561021a575f916101e4575b5061014052604051611f4b908161026c823960805181610b28015260a05181610b53015260c05181610b7e015260e05181611e620152610100518161099f015261012051818181610540015281816107d20152818161149e0152611bc20152610140518181816105800152818161096d01528181610ae601528181611676015281816118e10152611b150152f35b90506020813d602011610212575b816101ff60209383610248565b8101031261020e57515f610156565b5f80fd5b3d91506101f2565b6040513d5f823e3d90fd5b6341bc07ff60e11b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176102345760405256fe6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610cc0575080632c713cd914610ca35780633dc9f35014610bf757806354fd4d5014610b095780635bf2f20d14610acf5780636b122fe01461092e5780637d2c29311461079a5780638371ef591461073b57806388e5b2d9146106ed578063891d9ea81461070c57806391db0b7e146106ed578063b3b902d4146106a1578063bc197c811461060b578063c6ec5070146104ff578063c93844be14610422578063ce46e04614610406578063cecf1aff14610320578063e49617e114610305578063e60c350514610305578063e6c9714d146101de578063f0ffa1851461017d5763f23a6e610361000f573461017a5760a036600319011261017a5761013c610d7f565b50610145610d95565b506084356001600160401b03811161017857610165903690600401610ed6565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461017a5760a036600319011261017a57600435906001600160401b03821161017a5760206101d66101b33660048601610f74565b6101bb610d29565b6101c3610d53565b906101cc610d69565b92608435946119e9565b604051908152f35b503461017a57606036600319011261017a57600435906001600160401b03821161017a57610140600319833603011261017a576040519161021e83610e2d565b806004013583526024810135602084015261023b60448201610d3f565b604084015261024c60648201610d3f565b606084015261025d60848201610d3f565b608084015260a481013560a084015261027860c48201610dab565b60c084015261028960e48201610dab565b60e08401526101048101358015158103610301576101008401526101248101356001600160401b038111610301576102c691369101600401610ed6565b610120830152602435906001600160401b03821161017a5760206102f7846102f13660048701610ed6565b906118df565b6040519015158152f35b8280fd5b60206102f76103133661105a565b61031b611e60565b611ea1565b503461017a57604036600319011261017a576004356001600160401b0381116101785760a06003198236030112610178579060206103a592610378610386610366610d29565b9260405192839160040186830161108e565b03601f198101835282610e64565b60405163f0ffa18560e01b815294859283923391829160048601611130565b038184305af19081156103fa57906103c3575b602090604051908152f35b506020813d6020116103f2575b816103dd60209383610e64565b810103126103ee57602090516103b8565b5f80fd5b3d91506103d0565b604051903d90823e3d90fd5b503461017a578060031936011261017a57602090604051908152f35b503461017a57602036600319011261017a576004356001600160401b03811161017857610453903690600401610f74565b61045e9291926118b4565b50820191602081840312610178578035906001600160401b03821161030157019160a083820312610178576040519161049683610e12565b61049f84610dab565b83526020840135906001600160401b03821161017a5750926104c86080926104fb958301610ed6565b60208401526104d960408201610dab565b6040840152606081013560608401520135608082015260405191829182611008565b0390f35b503461017a57602036600319011261017a576105196118b4565b506105226111b6565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156105fe5781926105da575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105cb576104fb6105bf6101208401516020808251830101910161131d565b60405191829182611008565b635527981560e11b8152600490fd5b6105f79192503d8084833e6105ef8183610e64565b810190611242565b905f610578565b50604051903d90823e3d90fd5b503461017a5760a036600319011261017a57610625610d7f565b5061062e610d95565b506044356001600160401b0381116101785761064e903690600401610fa1565b506064356001600160401b0381116101785761066e903690600401610fa1565b506084356001600160401b0381116101785761068e903690600401610ed6565b5060405163bc197c8160e01b8152602090f35b503461017a57606036600319011261017a57600435906001600160401b03821161017a5760206101d66106d73660048601610f74565b6106df610d29565b9160443592339233926119e9565b60206102f76106fb36610f24565b92610707929192611e60565b6113d0565b503461017a576104fb61072761072136610d13565b90611474565b604051918291602083526020830190610dbf565b503461017a57602036600319011261017a57600435906001600160401b03821161017a5761077461076f3660048501610ed6565b6113a7565b604080516001600160a01b0390931683526020830181905282916104fb91830190610dbf565b346103ee5760203660031901126103ee576004356107b66111b6565b506040516328c44a9960e21b8152600481018290525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa5f9181610912575b5061081c57506301fb6dd160e01b5f5260045260245ffd5b6001600160401b036060820151164210610903576108576101208201519160c060018060a01b0391015116916020808251830101910161131d565b60408101805160608301805160809094018051919490926001600160a01b031691823b156103ee576108a4925f9283604051809681958294637921219560e11b84528d3060048601611df5565b03925af190816108f3575b506108e85790519151905160405163334a7d1b60e21b81529384936108e493919030906001600160a01b031660048701611e2d565b0390fd5b602060405160018152f35b5f6108fd91610e64565b5f6108af565b637bf6a16f60e01b5f5260045ffd5b6109279192503d805f833e6105ef8183610e64565b9083610804565b346103ee575f3660031901126103ee5760608060405161094d81610de3565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610ac4575f90610a14575b6060906104fb604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610dbf565b503d805f833e610a248183610e64565b8101906020818303126103ee578051906001600160401b0382116103ee57016080818303126103ee5760405190610a5a82610de3565b8051825260208101516001600160a01b03811681036103ee576020830152610a8460408201611173565b60408301526060810151906001600160401b0382116103ee570182601f820112156103ee57606092816020610abb93519101611180565b828201526109ce565b6040513d5f823e3d90fd5b346103ee575f3660031901126103ee5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346103ee575f3660031901126103ee576104fb60206107276001610b4c7f0000000000000000000000000000000000000000000000000000000000000000611c88565b8184610b777f0000000000000000000000000000000000000000000000000000000000000000611c88565b8180610ba27f0000000000000000000000000000000000000000000000000000000000000000611c88565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610e64565b346103ee5760803660031901126103ee576004356001600160401b0381116103ee5760a060031982360301126103ee576020610c31610d29565b610c5d610c86610c3f610d53565b94610c6b610c4b610d69565b9160405194859160040188830161108e565b03601f198101855284610e64565b60405163f0ffa18560e01b8152958694859460048601611130565b03815f305af18015610ac4575f906103c357602090604051908152f35b346103ee57610cb461072136610d13565b50602060405160018152f35b346103ee5760203660031901126103ee576004359063ffffffff60e01b82168092036103ee57602091630271189760e51b8114908115610d02575b5015158152f35b6301ffc9a760e01b14905083610cfb565b60409060031901126103ee576004359060243590565b602435906001600160401b03821682036103ee57565b35906001600160401b03821682036103ee57565b604435906001600160a01b03821682036103ee57565b606435906001600160a01b03821682036103ee57565b600435906001600160a01b03821682036103ee57565b602435906001600160a01b03821682036103ee57565b35906001600160a01b03821682036103ee57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610dfe57604052565b634e487b7160e01b5f52604160045260245ffd5b60a081019081106001600160401b03821117610dfe57604052565b61014081019081106001600160401b03821117610dfe57604052565b604081019081106001600160401b03821117610dfe57604052565b90601f801991011681019081106001600160401b03821117610dfe57604052565b6001600160401b038111610dfe57601f01601f191660200190565b929192610eac82610e85565b91610eba6040519384610e64565b8294818452818301116103ee578281602093845f960137010152565b9080601f830112156103ee57816020610ef193359101610ea0565b90565b9181601f840112156103ee578235916001600160401b0383116103ee576020808501948460051b0101116103ee57565b60406003198201126103ee576004356001600160401b0381116103ee5781610f4e91600401610ef4565b92909291602435906001600160401b0382116103ee57610f7091600401610ef4565b9091565b9181601f840112156103ee578235916001600160401b0383116103ee57602083818601950101116103ee57565b9080601f830112156103ee578135916001600160401b038311610dfe578260051b9060405193610fd46020840186610e64565b84526020808501928201019283116103ee57602001905b828210610ff85750505090565b8135815260209182019101610feb565b6020815260018060a01b03825116602082015260a06080611037602085015183604086015260c0850190610dbf565b93600180841b036040820151166060850152606081015182850152015191015290565b60206003198201126103ee57600435906001600160401b0382116103ee576101409082900360031901126103ee5760040190565b602081526001600160a01b036110a383610dab565b1660208201526020820135601e19833603018112156103ee5782016020813591016001600160401b0382116103ee5781360381136103ee5760e0938260809260a060408701528160c0870152868601375f8484018601526001600160a01b0361110e60408301610dab565b166060850152606081013582850152013560a0830152601f8019910116010190565b90935f936001600160401b03611152608095989760a0865260a0860190610dbf565b971660208401526001600160a01b0390811660408401521660608201520152565b519081151582036103ee57565b92919261118c82610e85565b9161119a6040519384610e64565b8294818452818301116103ee578281602093845f96015e010152565b604051906111c382610e2d565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b03821682036103ee57565b51906001600160a01b03821682036103ee57565b9080601f830112156103ee578151610ef192602001611180565b6020818303126103ee578051906001600160401b0382116103ee5701610140818303126103ee576040519161127683610e2d565b815183526020820151602084015261129060408301611200565b60408401526112a160608301611200565b60608401526112b260808301611200565b608084015260a082015160a08401526112cd60c08301611214565b60c08401526112de60e08301611214565b60e08401526112f06101008301611173565b6101008401526101208201516001600160401b0381116103ee576113149201611228565b61012082015290565b6020818303126103ee578051906001600160401b0382116103ee57019060a0828203126103ee576040519161135183610e12565b61135a81611214565b835260208101516001600160401b0381116103ee5760809261137d918301611228565b602084015261138e60408201611214565b6040840152606081015160608401520151608082015290565b6113ba906020808251830101910161131d565b80516020909101516001600160a01b0390911691565b929092818403611465575f91345b8584101561145a5781841015611446578360051b80860135908282116114375784013561013e19853603018112156103ee5761141b908501611ea1565b1561142c57600191039301926113de565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f61147e6111b6565b506114876111b6565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692905f81602481875afa5f9181611898575b506114f057856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481895afa5f918161187c575b5061153057866301fb6dd160e01b5f5260045260245ffd5b9592939461153d82611eba565b1561186d576101208201918251611553906113a7565b91516040805163e6c9714d60e01b81526060600482018190528c51606483015260208d01516084830152918c01516001600160401b0390811660a4830152918c0151821660c482015260808c015190911660e482015260a08b015161010482015260c08b0180516001600160a01b0390811661012484015260e08d0151166101448301526101008c01511515610164830152610120909b015161014061018483015290938492839290919061160d906101a4850190610dbf565b83810360031901602485015261162291610dbf565b60448301919091526001600160a01b039093169203815a93602094fa908115610ac4575f91611833575b50156118245760405161165e81610e49565b8581525f60208201526040519061167482610e49565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b156103ee5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af1908161180f575b506116f65763614cf93960e01b85526004849052602485fd5b519461171560018060a01b03825116966020808251830101910161131d565b94604086019360018060a01b0385511695606088019760808951910197885191813b1561180b576117649286928392838f60405197889586948593637921219560e11b85523060048601611df5565b03925af191826117f2575b50506117a65785518851885160405163334a7d1b60e21b81529283926108e492918e9030906001600160a01b031660048701611e2d565b9397509350935093507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0604051946117df602087610e64565b848652516001600160a01b03169380a490565b816117fc91610e64565b61180757835f61176f565b8380fd5b8580fd5b61181c9196505f90610e64565b5f945f6116dd565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611865575b8161184e60209383610e64565b810103126103ee5761185f90611173565b5f61164c565b3d9150611841565b63629cd40b60e11b5f5260045ffd5b6118919192503d805f833e6105ef8183610e64565b905f611518565b6118ad9192503d805f833e6105ef8183610e64565b905f6114d8565b604051906118c182610e12565b5f608083828152606060208201528260408201528260608201520152565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036119da5761191381611eba565b156119d4576119336101206119439201516020808251830101910161131d565b916020808251830101910161131d565b604082810151908201516001600160a01b0390811691161491826119c1575b826119ad575b82611994575b8261197857505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061196e565b915060808201516080820151111591611968565b9150606082015160608201511491611962565b50505f90565b635f9bd90760e11b5f5260045ffd5b91959095949294611a0d6119fe368986610ea0565b6020808251830101910161131d565b9460408601948551945f9560018060a01b031699606089019a60808c519a01998a51823b156103ee57611a5d925f92838f60405196879586948593637921219560e11b8552309060048601611df5565b03925af19081611c73575b50611a9e578a8a6108e48b8b60018060a01b03905116935190519060405194859463334a7d1b60e21b8652309160048701611e2d565b929650929650939750611ab49296503691610ea0565b906040519260c084018481106001600160401b03821117611c5f57906001600160401b039160405260018060a01b03169485855216602084015260016040840152606083015260808201528360a08201526020604051611b1381610e49565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611bb4608083015160c060e4860152610124850190610dbf565b9101516101048301520381877f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115611c54578491611c22575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06819480a3565b90506020813d602011611c4c575b81611c3d60209383610e64565b810103126103ee57515f611bfa565b3d9150611c30565b6040513d86823e3d90fd5b634e487b7160e01b88526041600452602488fd5b611c809198505f90610e64565b5f965f611a68565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611dd2575b806d04ee2d6d415b85acef8100000000600a921015611db7575b662386f26fc10000811015611da3575b6305f5e100811015611d92575b612710811015611d83575b6064811015611d75575b1015611d6a575b600a60216001840193611d0f85610e85565b94611d1d6040519687610e64565b808652611d2c601f1991610e85565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611d6557600a9091611d37565b505090565b600190910190611cfd565b606460029104930192611cf6565b61271060049104930192611cec565b6305f5e10060089104930192611ce1565b662386f26fc1000060109104930192611cd4565b6d04ee2d6d415b85acef810000000060209104930192611cc4565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611caa565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611e9257565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036103ee57301490565b6001600160401b036060820151168015159081611f0b575b50611efc57608001516001600160401b0316611eed57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611ed256fea264697066735822122089bbea21e8a61b0b0825590f99e098be95d20a8703cb78454fe538e9ca0edb5664736f6c634300081b0033",
    sourceMap:
      "533:5490:121:-:0;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;533:5490:121;;;;1242:4;533:5490;759:14:6;688:1:9;783:14:6;;-1:-1:-1;807:14:6;;708:26:9;704:76;;533:5490:121;790:10:9;;533:5490:121;790:10:9;;;789::77;;809:32;;-1:-1:-1;533:5490:121;;;;;;;;;;;872:48:77;;533:5490:121;872:48:77;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;904:4:77;533:5490:121;;;;1242:4;533:5490;;;;;;-1:-1:-1;;533:5490:121;;;872:48:77;;;;;;;;;;-1:-1:-1;872:48:77;;;-1:-1:-1;851:69:77;;;533:5490:121;;;;;;;;;;;;;;783:14:6;533:5490:121;;;;;807:14:6;533:5490:121;;;;;790:10:9;533:5490:121;;;;;809:32:77;533:5490:121;;;;;789:10:77;533:5490:121;;;;;;;;;;;;;;;;;;;;851:69:77;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;872:48:77;;;533:5490:121;872:48:77;;533:5490:121;872:48:77;;;;;;533:5490:121;872:48:77;;;:::i;:::-;;;533:5490:121;;;;;872:48:77;;;533:5490:121;-1:-1:-1;533:5490:121;;872:48:77;;;-1:-1:-1;872:48:77;;;533:5490:121;;;-1:-1:-1;533:5490:121;;;;;704:76:9;757:12;;;-1:-1:-1;757:12:9;;-1:-1:-1;757:12:9;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;;-1:-1:-1;533:5490:121;;;;;;-1:-1:-1;;533:5490:121;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;:::o",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x6080806040526004361015610029575b50361561001a575f80fd5b631574f9f360e01b5f5260045ffd5b5f905f3560e01c90816301ffc9a714610cc0575080632c713cd914610ca35780633dc9f35014610bf757806354fd4d5014610b095780635bf2f20d14610acf5780636b122fe01461092e5780637d2c29311461079a5780638371ef591461073b57806388e5b2d9146106ed578063891d9ea81461070c57806391db0b7e146106ed578063b3b902d4146106a1578063bc197c811461060b578063c6ec5070146104ff578063c93844be14610422578063ce46e04614610406578063cecf1aff14610320578063e49617e114610305578063e60c350514610305578063e6c9714d146101de578063f0ffa1851461017d5763f23a6e610361000f573461017a5760a036600319011261017a5761013c610d7f565b50610145610d95565b506084356001600160401b03811161017857610165903690600401610ed6565b5060405163f23a6e6160e01b8152602090f35b505b80fd5b503461017a5760a036600319011261017a57600435906001600160401b03821161017a5760206101d66101b33660048601610f74565b6101bb610d29565b6101c3610d53565b906101cc610d69565b92608435946119e9565b604051908152f35b503461017a57606036600319011261017a57600435906001600160401b03821161017a57610140600319833603011261017a576040519161021e83610e2d565b806004013583526024810135602084015261023b60448201610d3f565b604084015261024c60648201610d3f565b606084015261025d60848201610d3f565b608084015260a481013560a084015261027860c48201610dab565b60c084015261028960e48201610dab565b60e08401526101048101358015158103610301576101008401526101248101356001600160401b038111610301576102c691369101600401610ed6565b610120830152602435906001600160401b03821161017a5760206102f7846102f13660048701610ed6565b906118df565b6040519015158152f35b8280fd5b60206102f76103133661105a565b61031b611e60565b611ea1565b503461017a57604036600319011261017a576004356001600160401b0381116101785760a06003198236030112610178579060206103a592610378610386610366610d29565b9260405192839160040186830161108e565b03601f198101835282610e64565b60405163f0ffa18560e01b815294859283923391829160048601611130565b038184305af19081156103fa57906103c3575b602090604051908152f35b506020813d6020116103f2575b816103dd60209383610e64565b810103126103ee57602090516103b8565b5f80fd5b3d91506103d0565b604051903d90823e3d90fd5b503461017a578060031936011261017a57602090604051908152f35b503461017a57602036600319011261017a576004356001600160401b03811161017857610453903690600401610f74565b61045e9291926118b4565b50820191602081840312610178578035906001600160401b03821161030157019160a083820312610178576040519161049683610e12565b61049f84610dab565b83526020840135906001600160401b03821161017a5750926104c86080926104fb958301610ed6565b60208401526104d960408201610dab565b6040840152606081013560608401520135608082015260405191829182611008565b0390f35b503461017a57602036600319011261017a576105196118b4565b506105226111b6565b506040516328c44a9960e21b815260048035908201529080826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156105fe5781926105da575b5060208201517f0000000000000000000000000000000000000000000000000000000000000000036105cb576104fb6105bf6101208401516020808251830101910161131d565b60405191829182611008565b635527981560e11b8152600490fd5b6105f79192503d8084833e6105ef8183610e64565b810190611242565b905f610578565b50604051903d90823e3d90fd5b503461017a5760a036600319011261017a57610625610d7f565b5061062e610d95565b506044356001600160401b0381116101785761064e903690600401610fa1565b506064356001600160401b0381116101785761066e903690600401610fa1565b506084356001600160401b0381116101785761068e903690600401610ed6565b5060405163bc197c8160e01b8152602090f35b503461017a57606036600319011261017a57600435906001600160401b03821161017a5760206101d66106d73660048601610f74565b6106df610d29565b9160443592339233926119e9565b60206102f76106fb36610f24565b92610707929192611e60565b6113d0565b503461017a576104fb61072761072136610d13565b90611474565b604051918291602083526020830190610dbf565b503461017a57602036600319011261017a57600435906001600160401b03821161017a5761077461076f3660048501610ed6565b6113a7565b604080516001600160a01b0390931683526020830181905282916104fb91830190610dbf565b346103ee5760203660031901126103ee576004356107b66111b6565b506040516328c44a9960e21b8152600481018290525f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa5f9181610912575b5061081c57506301fb6dd160e01b5f5260045260245ffd5b6001600160401b036060820151164210610903576108576101208201519160c060018060a01b0391015116916020808251830101910161131d565b60408101805160608301805160809094018051919490926001600160a01b031691823b156103ee576108a4925f9283604051809681958294637921219560e11b84528d3060048601611df5565b03925af190816108f3575b506108e85790519151905160405163334a7d1b60e21b81529384936108e493919030906001600160a01b031660048701611e2d565b0390fd5b602060405160018152f35b5f6108fd91610e64565b5f6108af565b637bf6a16f60e01b5f5260045ffd5b6109279192503d805f833e6105ef8183610e64565b9083610804565b346103ee575f3660031901126103ee5760608060405161094d81610de3565b5f81525f60208201525f604082015201526040516351753e3760e11b81527f000000000000000000000000000000000000000000000000000000000000000060048201525f8160248160018060a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa8015610ac4575f90610a14575b6060906104fb604051928392602084528051602085015260018060a01b0360208201511660408501526040810151151582850152015160808084015260a0830190610dbf565b503d805f833e610a248183610e64565b8101906020818303126103ee578051906001600160401b0382116103ee57016080818303126103ee5760405190610a5a82610de3565b8051825260208101516001600160a01b03811681036103ee576020830152610a8460408201611173565b60408301526060810151906001600160401b0382116103ee570182601f820112156103ee57606092816020610abb93519101611180565b828201526109ce565b6040513d5f823e3d90fd5b346103ee575f3660031901126103ee5760206040517f00000000000000000000000000000000000000000000000000000000000000008152f35b346103ee575f3660031901126103ee576104fb60206107276001610b4c7f0000000000000000000000000000000000000000000000000000000000000000611c88565b8184610b777f0000000000000000000000000000000000000000000000000000000000000000611c88565b8180610ba27f0000000000000000000000000000000000000000000000000000000000000000611c88565b9260405199878b985191829101848a015e870190601760f91b83830152805192839101602183015e010190601760f91b84830152805192839101600283015e01015f838201520301601f198101835282610e64565b346103ee5760803660031901126103ee576004356001600160401b0381116103ee5760a060031982360301126103ee576020610c31610d29565b610c5d610c86610c3f610d53565b94610c6b610c4b610d69565b9160405194859160040188830161108e565b03601f198101855284610e64565b60405163f0ffa18560e01b8152958694859460048601611130565b03815f305af18015610ac4575f906103c357602090604051908152f35b346103ee57610cb461072136610d13565b50602060405160018152f35b346103ee5760203660031901126103ee576004359063ffffffff60e01b82168092036103ee57602091630271189760e51b8114908115610d02575b5015158152f35b6301ffc9a760e01b14905083610cfb565b60409060031901126103ee576004359060243590565b602435906001600160401b03821682036103ee57565b35906001600160401b03821682036103ee57565b604435906001600160a01b03821682036103ee57565b606435906001600160a01b03821682036103ee57565b600435906001600160a01b03821682036103ee57565b602435906001600160a01b03821682036103ee57565b35906001600160a01b03821682036103ee57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b608081019081106001600160401b03821117610dfe57604052565b634e487b7160e01b5f52604160045260245ffd5b60a081019081106001600160401b03821117610dfe57604052565b61014081019081106001600160401b03821117610dfe57604052565b604081019081106001600160401b03821117610dfe57604052565b90601f801991011681019081106001600160401b03821117610dfe57604052565b6001600160401b038111610dfe57601f01601f191660200190565b929192610eac82610e85565b91610eba6040519384610e64565b8294818452818301116103ee578281602093845f960137010152565b9080601f830112156103ee57816020610ef193359101610ea0565b90565b9181601f840112156103ee578235916001600160401b0383116103ee576020808501948460051b0101116103ee57565b60406003198201126103ee576004356001600160401b0381116103ee5781610f4e91600401610ef4565b92909291602435906001600160401b0382116103ee57610f7091600401610ef4565b9091565b9181601f840112156103ee578235916001600160401b0383116103ee57602083818601950101116103ee57565b9080601f830112156103ee578135916001600160401b038311610dfe578260051b9060405193610fd46020840186610e64565b84526020808501928201019283116103ee57602001905b828210610ff85750505090565b8135815260209182019101610feb565b6020815260018060a01b03825116602082015260a06080611037602085015183604086015260c0850190610dbf565b93600180841b036040820151166060850152606081015182850152015191015290565b60206003198201126103ee57600435906001600160401b0382116103ee576101409082900360031901126103ee5760040190565b602081526001600160a01b036110a383610dab565b1660208201526020820135601e19833603018112156103ee5782016020813591016001600160401b0382116103ee5781360381136103ee5760e0938260809260a060408701528160c0870152868601375f8484018601526001600160a01b0361110e60408301610dab565b166060850152606081013582850152013560a0830152601f8019910116010190565b90935f936001600160401b03611152608095989760a0865260a0860190610dbf565b971660208401526001600160a01b0390811660408401521660608201520152565b519081151582036103ee57565b92919261118c82610e85565b9161119a6040519384610e64565b8294818452818301116103ee578281602093845f96015e010152565b604051906111c382610e2d565b6060610120835f81525f60208201525f60408201525f838201525f60808201525f60a08201525f60c08201525f60e08201525f6101008201520152565b51906001600160401b03821682036103ee57565b51906001600160a01b03821682036103ee57565b9080601f830112156103ee578151610ef192602001611180565b6020818303126103ee578051906001600160401b0382116103ee5701610140818303126103ee576040519161127683610e2d565b815183526020820151602084015261129060408301611200565b60408401526112a160608301611200565b60608401526112b260808301611200565b608084015260a082015160a08401526112cd60c08301611214565b60c08401526112de60e08301611214565b60e08401526112f06101008301611173565b6101008401526101208201516001600160401b0381116103ee576113149201611228565b61012082015290565b6020818303126103ee578051906001600160401b0382116103ee57019060a0828203126103ee576040519161135183610e12565b61135a81611214565b835260208101516001600160401b0381116103ee5760809261137d918301611228565b602084015261138e60408201611214565b6040840152606081015160608401520151608082015290565b6113ba906020808251830101910161131d565b80516020909101516001600160a01b0390911691565b929092818403611465575f91345b8584101561145a5781841015611446578360051b80860135908282116114375784013561013e19853603018112156103ee5761141b908501611ea1565b1561142c57600191039301926113de565b505050505050505f90565b63044044a560e21b5f5260045ffd5b634e487b7160e01b5f52603260045260245ffd5b505050505050600190565b63251f56a160e21b5f5260045ffd5b915f61147e6111b6565b506114876111b6565b506040516328c44a9960e21b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692905f81602481875afa5f9181611898575b506114f057856301fb6dd160e01b5f5260045260245ffd5b94919293946040516328c44a9960e21b81528660048201525f81602481895afa5f918161187c575b5061153057866301fb6dd160e01b5f5260045260245ffd5b9592939461153d82611eba565b1561186d576101208201918251611553906113a7565b91516040805163e6c9714d60e01b81526060600482018190528c51606483015260208d01516084830152918c01516001600160401b0390811660a4830152918c0151821660c482015260808c015190911660e482015260a08b015161010482015260c08b0180516001600160a01b0390811661012484015260e08d0151166101448301526101008c01511515610164830152610120909b015161014061018483015290938492839290919061160d906101a4850190610dbf565b83810360031901602485015261162291610dbf565b60448301919091526001600160a01b039093169203815a93602094fa908115610ac4575f91611833575b50156118245760405161165e81610e49565b8581525f60208201526040519061167482610e49565b7f0000000000000000000000000000000000000000000000000000000000000000825260208201908152823b156103ee5760645f92836020956040519687958694634692626760e01b86525160048601525180516024860152015160448401525af1908161180f575b506116f65763614cf93960e01b85526004849052602485fd5b519461171560018060a01b03825116966020808251830101910161131d565b94604086019360018060a01b0385511695606088019760808951910197885191813b1561180b576117649286928392838f60405197889586948593637921219560e11b85523060048601611df5565b03925af191826117f2575b50506117a65785518851885160405163334a7d1b60e21b81529283926108e492918e9030906001600160a01b031660048701611e2d565b9397509350935093507ff96e77bc177ae8e2ff25185e7c6d85f8ba97c8bdd9d46933aac70a7a33edf6c0604051946117df602087610e64565b848652516001600160a01b03169380a490565b816117fc91610e64565b61180757835f61176f565b8380fd5b8580fd5b61181c9196505f90610e64565b5f945f6116dd565b630ebe58ef60e11b5f5260045ffd5b90506020813d602011611865575b8161184e60209383610e64565b810103126103ee5761185f90611173565b5f61164c565b3d9150611841565b63629cd40b60e11b5f5260045ffd5b6118919192503d805f833e6105ef8183610e64565b905f611518565b6118ad9192503d805f833e6105ef8183610e64565b905f6114d8565b604051906118c182610e12565b5f608083828152606060208201528260408201528260608201520152565b7f00000000000000000000000000000000000000000000000000000000000000006020820151036119da5761191381611eba565b156119d4576119336101206119439201516020808251830101910161131d565b916020808251830101910161131d565b604082810151908201516001600160a01b0390811691161491826119c1575b826119ad575b82611994575b8261197857505090565b6020919250810151818151910120910151602081519101201490565b805182516001600160a01b03908116911614925061196e565b915060808201516080820151111591611968565b9150606082015160608201511491611962565b50505f90565b635f9bd90760e11b5f5260045ffd5b91959095949294611a0d6119fe368986610ea0565b6020808251830101910161131d565b9460408601948551945f9560018060a01b031699606089019a60808c519a01998a51823b156103ee57611a5d925f92838f60405196879586948593637921219560e11b8552309060048601611df5565b03925af19081611c73575b50611a9e578a8a6108e48b8b60018060a01b03905116935190519060405194859463334a7d1b60e21b8652309160048701611e2d565b929650929650939750611ab49296503691610ea0565b906040519260c084018481106001600160401b03821117611c5f57906001600160401b039160405260018060a01b03169485855216602084015260016040840152606083015260808201528360a08201526020604051611b1381610e49565b7f000000000000000000000000000000000000000000000000000000000000000081528181019283526040518093819263f17325e760e01b8352846004840152516024830152516040604483015260018060a01b0381511660648301526001600160401b03848201511660848301526040810151151560a4830152606081015160c483015260a0611bb4608083015160c060e4860152610124850190610dbf565b9101516101048301520381877f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1908115611c54578491611c22575b507f8f7f2dbafd79125e808bf16a53d7fa4e17b8b6374ced76d946a45f94b7bf4d06819480a3565b90506020813d602011611c4c575b81611c3d60209383610e64565b810103126103ee57515f611bfa565b3d9150611c30565b6040513d86823e3d90fd5b634e487b7160e01b88526041600452602488fd5b611c809198505f90610e64565b5f965f611a68565b805f9172184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b821015611dd2575b806d04ee2d6d415b85acef8100000000600a921015611db7575b662386f26fc10000811015611da3575b6305f5e100811015611d92575b612710811015611d83575b6064811015611d75575b1015611d6a575b600a60216001840193611d0f85610e85565b94611d1d6040519687610e64565b808652611d2c601f1991610e85565b013660208701378401015b5f1901916f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353048015611d6557600a9091611d37565b505090565b600190910190611cfd565b606460029104930192611cf6565b61271060049104930192611cec565b6305f5e10060089104930192611ce1565b662386f26fc1000060109104930192611cd4565b6d04ee2d6d415b85acef810000000060209104930192611cc4565b506040915072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b8104611caa565b6001600160a01b039182168152911660208201526040810191909152606081019190915260a0608082018190525f9082015260c00190565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03163303611e9257565b634ca8886760e01b5f5260045ffd5b60e0013560018060a01b0381168091036103ee57301490565b6001600160401b036060820151168015159081611f0b575b50611efc57608001516001600160401b0316611eed57600190565b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f611ed256fea264697066735822122089bbea21e8a61b0b0825590f99e098be95d20a8703cb78454fe538e9ca0edb5664736f6c634300081b0033",
    sourceMap:
      "533:5490:121:-:0;;;;;;;;;;-1:-1:-1;533:5490:121;;;;;;;;;1183:12:9;;;1054:5;1183:12;533:5490:121;1054:5:9;1183:12;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;:::i;:::-;-1:-1:-1;533:5490:121;;-1:-1:-1;;;533:5490:121;;;;;;;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;3045:39:9;533:5490:121;;;:::i;:::-;881:58:9;;:::i;:::-;3045:39;:::i;533:5490:121:-;;;;;;;-1:-1:-1;;533:5490:121;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;4830:187;533:5490;4871:16;;533:5490;;:::i;:::-;;;;;;;;;4871:16;;;;:::i;:::-;;5277;;4871;;;;;;:::i;:::-;533:5490;;-1:-1:-1;;;4830:187:121;;533:5490;;;;;4937:10;;;;533:5490;4830:187;;;:::i;:::-;;:4;;;:187;;;;;;;;;;533:5490;;;;;;;;;4830:187;;533:5490;4830:187;;533:5490;4830:187;;;;;;533:5490;4830:187;;;:::i;:::-;;;533:5490;;;;;;;4830:187;;533:5490;-1:-1:-1;533:5490:121;;4830:187;;;-1:-1:-1;4830:187:121;;;533:5490;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;5980:34;;533:5490;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;:::i;:::-;;;;:::i;:::-;-1:-1:-1;533:5490:121;;-1:-1:-1;;;2392:23:77;;533:5490:121;;;2392:23:77;;;533:5490:121;;;;2392:23:77;533:5490:121;2392:3:77;-1:-1:-1;;;;;533:5490:121;2392:23:77;;;;;;;;;;;533:5490:121;2429:19:77;533:5490:121;2429:19:77;;533:5490:121;2452:18:77;2429:41;2425:87;;533:5490:121;5795:46;5806:16;;;;533:5490;;;;5795:46;;;;;;:::i;:::-;533:5490;;;;;;;:::i;2425:87:77:-;-1:-1:-1;;;2491:21:77;;533:5490:121;;2491:21:77;2392:23;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;533:5490:121;;;;;;;;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;:::i;:::-;-1:-1:-1;533:5490:121;;-1:-1:-1;;;533:5490:121;;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;716:142:80;533:5490:121;;;;;;:::i;:::-;;;:::i;:::-;;;;794:10:80;;;;716:142;;:::i;533:5490:121:-;;1442:1461:9;533:5490:121;;;:::i;:::-;881:58:9;;;;;;:::i;:::-;1442:1461;:::i;533:5490:121:-;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;533:5490:121;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;533:5490:121;;;;;;;;:::i;:::-;-1:-1:-1;533:5490:121;;-1:-1:-1;;;3989:23:78;;533:5490:121;3989:23:78;;533:5490:121;;;-1:-1:-1;533:5490:121;3989:23:78;533:5490:121;3989:3:78;-1:-1:-1;;;;;533:5490:121;3989:23:78;;533:5490:121;;3989:23:78;;;533:5490:121;-1:-1:-1;3985:172:78;;4122:24;;;;533:5490:121;4122:24:78;533:5490:121;;3989:23:78;533:5490:121;4122:24:78;3985:172;-1:-1:-1;;;;;4189:26:78;;;533:5490:121;;4171:15:78;:44;4167:87;;3325:34:121;4334:16:78;;;;533:5490:121;4352:21:78;533:5490:121;;;;;4352:21:78;;533:5490:121;;;;;;;3325:34;;;;;;:::i;:::-;533:5490;3395:13;;533:5490;;4189:26:78;3495:15:121;;533:5490;;3528:14;;;;533:5490;;3495:15;;3528:14;;-1:-1:-1;;;;;533:5490:121;;3386:190;;;;;;533:5490;;;;;;;;;;;;;;;3386:190;;3452:4;;533:5490;3386:190;;;:::i;:::-;;;;;;;;;3985:172:78;-1:-1:-1;3370:481:121;;533:5490;;;;;;;;-1:-1:-1;;;3658:182:121;;533:5490;;;3658:182;;533:5490;3658:182;3452:4;;-1:-1:-1;;;;;533:5490:121;;3658:182;;;:::i;:::-;;;;3370:481;533:5490;;;;;;;3386:190;533:5490;3386:190;;;:::i;:::-;533:5490;3386:190;;4167:87:78;4236:18;;;533:5490:121;4236:18:78;533:5490:121;;4236:18:78;3989:23;;;;;;;533:5490:121;3989:23:78;;;;;;:::i;:::-;;;;;533:5490:121;;;;;;-1:-1:-1;;533:5490:121;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;1497:44:77;;1522:18;533:5490:121;1497:44:77;;533:5490:121;;;1497:44:77;533:5490:121;;;;;;1497:14:77;533:5490:121;1497:44:77;;;;;;533:5490:121;1497:44:77;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;1497:44:77:-;;;;533:5490:121;1497:44:77;;;;;;:::i;:::-;;;533:5490:121;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1497:44:77;;;533:5490:121;;;;;;;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;;542:43:77;533:5490:121;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;1055:104:6;;533:5490:121;1072:24:6;1089:6;1072:24;:::i;:::-;1120:6;;1103:24;1120:6;1103:24;:::i;:::-;1151:6;;1134:24;1151:6;1134:24;:::i;:::-;533:5490:121;;;;;;;;;;;;1055:104:6;;;533:5490:121;;;;-1:-1:-1;;;533:5490:121;;;;;;;;;;;;;;;;;-1:-1:-1;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;1055:104:6;;5277:16:121;;1055:104:6;;;;;;:::i;533:5490:121:-;;;;;;-1:-1:-1;;533:5490:121;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;:::i;:::-;5277:16;5236:181;533:5490;;:::i;:::-;;5277:16;533:5490;;:::i;:::-;;;;;;;;;5277:16;;;;:::i;:::-;;;;;;;;;;:::i;:::-;533:5490;;-1:-1:-1;;;5236:181:121;;533:5490;;;;;;5236:181;;;:::i;:::-;;:4;533:5490;5236:4;:181;;;;;;533:5490;5236:181;;;533:5490;;;;;;;;;;;;5546:37;533:5490;;;:::i;5546:37::-;;533:5490;;;5600:4;533:5490;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;775:49:41;;;:89;;;;533:5490:121;;;;;;;775:89:41;-1:-1:-1;;;862:40:68;;-1:-1:-1;775:89:41;;;533:5490:121;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;533:5490:121;;;;;;;;-1:-1:-1;;533:5490:121;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;:::o;:::-;;;;-1:-1:-1;533:5490:121;;;;;-1:-1:-1;533:5490:121;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;:::o;:::-;;;5277:16;;533:5490;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;:::o;:::-;-1:-1:-1;;;;;533:5490:121;;;;;;-1:-1:-1;;533:5490:121;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;533:5490:121;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;533:5490:121;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;533:5490:121;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;-1:-1:-1;;533:5490:121;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;533:5490:121;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;5277:16;;533:5490;;;;;;:::o;:::-;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;533:5490:121;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;-1:-1:-1;533:5490:121;;-1:-1:-1;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;-1:-1:-1;533:5490:121;;;;;;:::o;:::-;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;-1:-1:-1;;;;;533:5490:121;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;:::i;:::-;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::o;1321:267::-;1497:34;1321:267;1497:34;533:5490;;;1497:34;;;;;;:::i;:::-;533:5490;;1497:34;1566:14;;;;-1:-1:-1;;;;;533:5490:121;;;;1321:267::o;3133:1460:9:-;;;;3340:23;;;3336:76;;3881:1;;3844:9;3896:19;3884:10;;;;;;533:5490:121;;;;;;;;;;;;;4064:22:9;;;;4060:87;;533:5490:121;;;;;;;;;;;;;;4274:33:9;533:5490:121;;;4274:33:9;:::i;:::-;;4270:84;;1489:1:0;533:5490:121;;3896:19:9;533:5490:121;3869:13:9;;;4270:84;4327:12;;;;;;;3881:1;4327:12;:::o;4060:87::-;4113:19;;;3881:1;4113:19;;3881:1;4113:19;533:5490:121;;;;3881:1:9;533:5490:121;;;;;3881:1:9;533:5490:121;3884:10:9;;;;;;;1489:1:0;3133:1460:9;:::o;3336:76::-;3386:15;;;;;;;;2054:1760:78;;-1:-1:-1;533:5490:121;;:::i;:::-;2224:30:78;533:5490:121;;:::i;:::-;-1:-1:-1;533:5490:121;;-1:-1:-1;;;2317:27:78;;;;;533:5490:121;;;2317:3:78;-1:-1:-1;;;;;533:5490:121;;;-1:-1:-1;533:5490:121;2317:27:78;533:5490:121;;2317:27:78;;-1:-1:-1;;2317:27:78;;;2054:1760;-1:-1:-1;2313:219:78;;4122:24;;;;-1:-1:-1;2493:28:78;2317:27;533:5490:121;2317:27:78;-1:-1:-1;2493:28:78;2313:219;2428:26;;;;;533:5490:121;;;;;2546:32:78;;;2317:27;2546:32;;533:5490:121;-1:-1:-1;2546:32:78;2317:27;2546:32;;;;-1:-1:-1;;2546:32:78;;;2313:219;-1:-1:-1;2542:234:78;;4122:24;;;;-1:-1:-1;2732:33:78;2317:27;533:5490:121;2317:27:78;-1:-1:-1;2732:33:78;2542:234;2662:31;;;;2791:24;;;:::i;:::-;2790:25;2786:64;;2994:11;;;;;;2957:58;;;:::i;:::-;533:5490:121;;;;;-1:-1:-1;;;3086:66:78;;533:5490:121;2317:27:78;3086:66;;533:5490:121;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;2994:11:78;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;533:5490:121;2317:27:78;533:5490:121;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;3086:66:78;;;;533:5490:121;3086:66:78;;;;;;;-1:-1:-1;3086:66:78;;;2542:234;3085:67;;3081:112;;533:5490:121;;;;;:::i;:::-;;;;-1:-1:-1;533:5490:121;3372:47:78;;533:5490:121;;;;;;;:::i;:::-;3326:18:78;533:5490:121;;;3278:160:78;;533:5490:121;;;3250:202:78;;;;;533:5490:121;-1:-1:-1;533:5490:121;;;;;;;;;;;;;;3250:202:78;;533:5490:121;2317:27:78;3250:202;;533:5490:121;;;;2317:27:78;533:5490:121;;;;;;;;;3250:202:78;;;;;;2542:234;-1:-1:-1;3234:293:78;;-1:-1:-1;;;3491:25:78;;2317:27;533:5490:121;;;2317:27:78;3491:25;;3234:293;3625:11;533:5490:121;2525:74;533:5490;;;;;;;;;;;;;2525:74;;;;;;:::i;:::-;2635:13;533:5490;2635:13;;533:5490;;;;;;;;;2735:15;533:5490;2735:15;;533:5490;;;;2768:14;;533:5490;;;2626:190;;;;;;;533:5490;;;;;;;;;;;;;;;;;;;2626:190;;2692:4;2317:27:78;2626:190:121;;;:::i;:::-;;;;;;;;;3234:293:78;-1:-1:-1;;2610:481:121;;533:5490;;;;;;;;-1:-1:-1;;;2898:182:121;;533:5490;;;2898:182;;533:5490;;;2692:4;;-1:-1:-1;;;;;533:5490:121;2317:27:78;2898:182:121;;;:::i;2610:481::-;;;;;;;;;;3723:61:78;533:5490:121;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;533:5490:121;;;3723:61:78;2054:1760;:::o;2626:190:121:-;;;;;:::i;:::-;533:5490;;2626:190;;;;533:5490;;;;2626:190;533:5490;;;3250:202:78;;;;;-1:-1:-1;3250:202:78;;:::i;:::-;-1:-1:-1;3250:202:78;;;;3081:112;3173:20;;;-1:-1:-1;3173:20:78;2317:27;-1:-1:-1;3173:20:78;3086:66;;;533:5490:121;3086:66:78;;533:5490:121;3086:66:78;;;;;;533:5490:121;3086:66:78;;;:::i;:::-;;;533:5490:121;;;;;;;:::i;:::-;3086:66:78;;;;;;-1:-1:-1;3086:66:78;;2786:64;2824:26;;;-1:-1:-1;2824:26:78;2317:27;-1:-1:-1;2824:26:78;2546:32;;;;;;;-1:-1:-1;2546:32:78;;;;;;:::i;:::-;;;;;2317:27;;;;;;;-1:-1:-1;2317:27:78;;;;;;:::i;:::-;;;;;533:5490:121;;;;;;;:::i;:::-;-1:-1:-1;533:5490:121;;;;;;;;;;;;;;;;;;;;;;:::o;3889:749::-;4102:18;1016:17:76;;;533:5490:121;1016:27:76;1012:55;;1084:27;;;:::i;:::-;4074:47:121;4070:65;;4178:79;4202:15;4302:36;4202:15;;;1016:17:76;533:5490:121;;;4178:79;;;;;;:::i;:::-;533:5490;1016:17:76;533:5490:121;;;4302:36;;;;;;:::i;:::-;4368:13;;;;533:5490;4385:16;;;533:5490;-1:-1:-1;;;;;533:5490:121;;;;;4368:33;;;:86;;3889:749;4368:137;;;3889:749;4368:190;;;3889:749;4368:263;;;4349:282;;3889:749;:::o;4368:263::-;1016:17:76;4584:14:121;;;;;;533:5490;;;;;4574:25;4613:17;;;1016::76;533:5490:121;;;;4603:28;4574:57;3889:749;:::o;4368:190::-;533:5490;;;;-1:-1:-1;;;;;533:5490:121;;;;;4521:37;;-1:-1:-1;4368:190:121;;:137;4470:14;;;;;533:5490;4470:14;4488:17;;533:5490;-1:-1:-1;4470:35:121;4368:137;;;:86;4417:15;;;;;533:5490;4417:15;4436:18;;533:5490;4417:37;4368:86;;;4070:65;4123:12;;533:5490;4123:12;:::o;1012:55:76:-;1052:15;;;533:5490:121;1052:15:76;;533:5490:121;1052:15:76;871:377:80;;;;;;;;1743:34:121;533:5490;;;;;:::i;:::-;1743:34;533:5490;;;1743:34;;;;;;:::i;:::-;1813:13;;;;533:5490;;;;-1:-1:-1;533:5490:121;;;;;;;1915:15;;;;533:5490;1948:14;533:5490;;1948:14;;533:5490;;;1804:192;;;;;;533:5490;-1:-1:-1;533:5490:121;;;1813:13;533:5490;;;;;;;;;;;1804:192;;1892:4;1804:192;;;;;:::i;:::-;;;;;;;;;871:377:80;-1:-1:-1;1788:485:121;;533:5490;;2078:184;533:5490;;;;;;;;;;;;;;;1813:13;533:5490;3658:182;;;;;;2078:184;;1892:4;2078:184;1804:192;2078:184;;;:::i;1788:485::-;;;;;;;;;;533:5490;1788:485;;;533:5490;;;:::i;:::-;;1813:13;533:5490;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;-1:-1:-1;;;;;533:5490:121;1813:13;533:5490;;;;;;;;;;;;1743:34;1914:299:77;;533:5490:121;2076:4:77;1813:13:121;1914:299:77;;533:5490:121;1915:15;1914:299:77;;533:5490:121;1948:14;1914:299:77;;533:5490:121;1914:299:77;;;;533:5490:121;1743:34;1813:13;533:5490;;;;:::i;:::-;1868:18:77;533:5490:121;;1819:413:77;;;533:5490:121;;;1813:13;533:5490;;;;;;;;1791:455:77;;;1804:192:121;1791:455:77;;533:5490:121;;;;;;;1813:13;533:5490;;;;;;;;;;;;;;;;-1:-1:-1;;;;;533:5490:121;;;;;;;;;1813:13;533:5490;;;;;;;;;1915:15;533:5490;;;;;;;1914:299:77;533:5490:121;1948:14;533:5490;;;;;;;;;;;;;:::i;:::-;;;;;;;;1791:455:77;533:5490:121;;1791:3:77;-1:-1:-1;;;;;533:5490:121;1791:455:77;;;;;;;;;;;1788:485:121;1134:55:80;4820:26:78;1134:55:80;4820:26:78;;;871:377:80:o;1791:455:77:-;;;1743:34:121;1791:455:77;;1743:34:121;1791:455:77;;;;;;533:5490:121;1791:455:77;;;:::i;:::-;;;533:5490:121;;;;;1791:455:77;;;;;;-1:-1:-1;1791:455:77;;;1813:13:121;533:5490;;;;;;;;;-1:-1:-1;;;533:5490:121;;;1804:192;533:5490;;;;1804:192;;;;;-1:-1:-1;1804:192:121;;:::i;:::-;-1:-1:-1;1804:192:121;;;;637:632:63;759:17;-1:-1:-1;25444:17:70;-1:-1:-1;;;25444:17:70;;;25440:103;;637:632:63;25560:17:70;25569:8;26140:7;25560:17;;;25556:103;;637:632:63;25685:8:70;25676:17;;;25672:103;;637:632:63;25801:7:70;25792:16;;;25788:100;;637:632:63;25914:7:70;25905:16;;;25901:100;;637:632:63;26027:7:70;26018:16;;;26014:100;;637:632:63;26131:16:70;;26127:66;;637:632:63;26140:7:70;874:92:63;779:1;533:5490:121;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;5277:16;;533:5490;;:::i;:::-;;;;;;;874:92:63;;;979:247;-1:-1:-1;;533:5490:121;;-1:-1:-1;;;1033:111:63;;;;533:5490:121;1033:111:63;533:5490:121;1194:10:63;;1190:21;;26140:7:70;979:247:63;;;;1190:21;1206:5;;637:632;:::o;26127:66:70:-;26177:1;533:5490:121;;;;26127:66:70;;26014:100;26027:7;26098:1;533:5490:121;;;;26014:100:70;;;25901;25914:7;25985:1;533:5490:121;;;;25901:100:70;;;25788;25801:7;25872:1;533:5490:121;;;;25788:100:70;;;25672:103;25685:8;25758:2;533:5490:121;;;;25672:103:70;;;25556;25569:8;25642:2;533:5490:121;;;;25556:103:70;;;25440;-1:-1:-1;25526:2:70;;-1:-1:-1;;;;533:5490:121;;25440:103:70;;533:5490:121;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;533:5490:121;;;;;;;:::o;:::-;-1:-1:-1;;;;;533:5490:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;6040:128:9:-;6109:4;-1:-1:-1;;;;;533:5490:121;6087:10:9;:27;6083:79;;6040:128::o;6083:79::-;6137:14;;;;;;;;1174:235:77;1365:20;;533:5490:121;;;;;;;;;;;;;1397:4:77;1365:37;1174:235;:::o;612:261:76:-;-1:-1:-1;;;;;353:25:76;;;533:5490:121;;353:30:76;;;:89;;;;612:261;721:55;;;569:25;;533:5490:121;-1:-1:-1;;;;;533:5490:121;786:58:76;;862:4;612:261;:::o;786:58::-;824:20;;;-1:-1:-1;824:20:76;;-1:-1:-1;824:20:76;721:55;759:17;;;-1:-1:-1;759:17:76;;-1:-1:-1;759:17:76;353:89;427:15;;;-1:-1:-1;353:89:76;;",
    linkReferences: {},
    immutableReferences: {
      "2532": [
        {
          start: 2856,
          length: 32,
        },
      ],
      "2534": [
        {
          start: 2899,
          length: 32,
        },
      ],
      "2536": [
        {
          start: 2942,
          length: 32,
        },
      ],
      "3008": [
        {
          start: 7778,
          length: 32,
        },
      ],
      "54658": [
        {
          start: 2463,
          length: 32,
        },
      ],
      "54661": [
        {
          start: 1344,
          length: 32,
        },
        {
          start: 2002,
          length: 32,
        },
        {
          start: 5278,
          length: 32,
        },
        {
          start: 7106,
          length: 32,
        },
      ],
      "54663": [
        {
          start: 1408,
          length: 32,
        },
        {
          start: 2413,
          length: 32,
        },
        {
          start: 2790,
          length: 32,
        },
        {
          start: 5750,
          length: 32,
        },
        {
          start: 6369,
          length: 32,
        },
        {
          start: 6933,
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
    "doObligation((address,bytes,address,uint256,uint256),uint64)": "cecf1aff",
    "doObligationFor((address,bytes,address,uint256,uint256),uint64,address,address)": "3dc9f350",
    "doObligationForRaw(bytes,uint64,address,address,bytes32)": "f0ffa185",
    "doObligationRaw(bytes,uint64,bytes32)": "b3b902d4",
    "extractArbiterAndDemand(bytes)": "8371ef59",
    "getObligationData(bytes32)": "c6ec5070",
    "getSchema()": "6b122fe0",
    "isPayable()": "ce46e046",
    "multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "91db0b7e",
    "multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])": "88e5b2d9",
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": "bc197c81",
    "onERC1155Received(address,address,uint256,uint256,bytes)": "f23a6e61",
    "reclaimExpired(bytes32)": "7d2c2931",
    "revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "e49617e1",
    "supportsInterface(bytes4)": "01ffc9a7",
    "version()": "54fd4d50",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IEAS","name":"_eas","type":"address"},{"internalType":"contract ISchemaRegistry","name":"_schemaRegistry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AccessDenied","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"AttestationNotFound","type":"error"},{"inputs":[],"name":"AttestationRevoked","type":"error"},{"inputs":[],"name":"DeadlineExpired","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ERC1155TransferFailed","type":"error"},{"inputs":[],"name":"InsufficientValue","type":"error"},{"inputs":[],"name":"InvalidEAS","type":"error"},{"inputs":[],"name":"InvalidEscrowAttestation","type":"error"},{"inputs":[],"name":"InvalidFulfillment","type":"error"},{"inputs":[],"name":"InvalidLength","type":"error"},{"inputs":[],"name":"InvalidSchema","type":"error"},{"inputs":[],"name":"NotFromThisAttester","type":"error"},{"inputs":[],"name":"NotPayable","type":"error"},{"inputs":[{"internalType":"bytes32","name":"attestationId","type":"bytes32"}],"name":"RevocationFailed","type":"error"},{"inputs":[],"name":"UnauthorizedCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"fulfillment","type":"bytes32"},{"indexed":true,"internalType":"address","name":"fulfiller","type":"address"}],"name":"EscrowCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrow","type":"bytes32"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"EscrowMade","type":"event"},{"inputs":[],"name":"ATTESTATION_SCHEMA","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"attest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"escrow","type":"bytes32"},{"internalType":"bytes32","name":"fulfillment","type":"bytes32"}],"name":"collectEscrow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_escrow","type":"bytes32"},{"internalType":"bytes32","name":"_fulfillment","type":"bytes32"}],"name":"collectEscrowRaw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC1155EscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC1155EscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"}],"name":"doObligation","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC1155EscrowObligation.ObligationData","name":"data","type":"tuple"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"recipient","type":"address"}],"name":"doObligationFor","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"address","name":"payer","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationForRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"}],"name":"doObligationRaw","outputs":[{"internalType":"bytes32","name":"uid_","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"extractArbiterAndDemand","outputs":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"getObligationData","outputs":[{"components":[{"internalType":"address","name":"arbiter","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct ERC1155EscrowObligation.ObligationData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSchema","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"contract ISchemaResolver","name":"resolver","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"string","name":"schema","type":"string"}],"internalType":"struct SchemaRecord","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiAttest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation[]","name":"attestations","type":"tuple[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"multiRevoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155BatchReceived","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC1155Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uid","type":"bytes32"}],"name":"reclaimExpired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"attestation","type":"tuple"}],"name":"revoke","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}],"devdoc":{"kind":"dev","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The new attestation."},"returns":{"_0":"Whether the attestation is valid."}},"isPayable()":{"returns":{"_0":"Whether the resolver supports ETH transfers."}},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The new attestations.","values":"Explicit ETH amounts which were sent with each attestation."},"returns":{"_0":"Whether all the attestations are valid."}},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"params":{"attestations":"The existing attestations to be revoked.","values":"Explicit ETH amounts which were sent with each revocation."},"returns":{"_0":"Whether the attestations can be revoked."}},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"params":{"attestation":"The existing attestation to be revoked."},"returns":{"_0":"Whether the attestation can be revoked."}},"supportsInterface(bytes4)":{"details":"See {IERC165-supportsInterface}."},"version()":{"returns":{"_0":"Semver contract version as a string."}}},"version":1},"userdoc":{"kind":"user","methods":{"attest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation and verifies whether it\'s valid."},"isPayable()":{"notice":"Checks if the resolver can be sent ETH."},"multiAttest((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes multiple attestations and verifies whether they are valid."},"multiRevoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes)[],uint256[])":{"notice":"Processes revocation of multiple attestation and verifies they can be revoked."},"revoke((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))":{"notice":"Processes an attestation revocation and verifies if it can be revoked."},"version()":{"notice":"Returns the full semver contract version."}},"version":1}},"settings":{"compilationTarget":{"src/obligations/ERC1155EscrowObligation.sol":"ERC1155EscrowObligation"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol":{"keccak256":"0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7","license":"MIT","urls":["bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746","dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol":{"keccak256":"0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7","license":"MIT","urls":["bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce","dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv"]},"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol":{"keccak256":"0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50","license":"MIT","urls":["bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd","dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol":{"keccak256":"0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e","license":"MIT","urls":["bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9","dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf"]},"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol":{"keccak256":"0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c","license":"MIT","urls":["bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e","dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab","license":"UNLICENSED","urls":["bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12","dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit"]},"src/BaseAttester.sol":{"keccak256":"0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa","license":"UNLICENSED","urls":["bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084","dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa"]},"src/BaseEscrowObligation.sol":{"keccak256":"0x79f2b634467f60d2599566052d187ab570b5a5abb7d9ad4fb9608b10f1feb09c","license":"UNLICENSED","urls":["bzz-raw://c95fd69af07d9a26edf7c59fa8269bdd8958a41f2dd9de7e5ad2985198a69724","dweb:/ipfs/QmSWC22iabz1xHqsqqfm6exuk5VghGGrco4A1wGTSnsdBb"]},"src/BaseObligationNew.sol":{"keccak256":"0xb6f62aaa01bbb8c7d87a4437b466e5e95e9d6086626b780f367d3071ee20e8be","license":"UNLICENSED","urls":["bzz-raw://9216c00ddf06a890e591fc21969211be2b7a98aba8615021dd26352af5f472bc","dweb:/ipfs/Qmbc2MAT1DaT2e5Ue3PzjJmQRKb2CMNcB7YCPdjHS2Fjtc"]},"src/IArbiter.sol":{"keccak256":"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab","license":"UNLICENSED","urls":["bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038","dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff"]},"src/obligations/ERC1155EscrowObligation.sol":{"keccak256":"0xf165b0949da505bde9cd545aa33efa2db13c675e5a29f45c9ea66a2a6835c57d","license":"UNLICENSED","urls":["bzz-raw://447cfe616af420b5cb10f82e24357a17ddf45c486f4a54a3732387e289a9783a","dweb:/ipfs/QmZsB7w1YXScya3L97WqMFNijzBkAEDxsnudB7hdLV5sRd"]}},"version":1}',
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
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          type: "error",
          name: "ERC1155TransferFailed",
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
              internalType: "struct ERC1155EscrowObligation.ObligationData",
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
                  name: "tokenId",
                  type: "uint256",
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
              internalType: "struct ERC1155EscrowObligation.ObligationData",
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
                  name: "tokenId",
                  type: "uint256",
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
              internalType: "struct ERC1155EscrowObligation.ObligationData",
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
                  name: "tokenId",
                  type: "uint256",
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
              internalType: "struct ERC1155EscrowObligation.ObligationData",
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
                  name: "tokenId",
                  type: "uint256",
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
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "onERC1155BatchReceived",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "",
              type: "bytes",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "onERC1155Received",
          outputs: [
            {
              internalType: "bytes4",
              name: "",
              type: "bytes4",
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
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "supportsInterface",
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
          "supportsInterface(bytes4)": {
            details: "See {IERC165-supportsInterface}.",
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
        "src/obligations/ERC1155EscrowObligation.sol": "ERC1155EscrowObligation",
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
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol": {
        keccak256: "0xb6503f663515b6713adb63eb2acf19401d8f73af39c7194f7dc3d8249c8643c7",
        urls: [
          "bzz-raw://abdedc1b84ae26c1a151825e9f785fa8187ead91be438671fd18c7a41958b746",
          "dweb:/ipfs/QmdYFTdzQbrWJsJgH8mX1rPTt8V7DZFAXxjxNTaY6LEa6b",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol": {
        keccak256: "0x0f8b8696348d5a57b13d44f5cc63894f0368038c06f6d00bdeda6f9aa13127e7",
        urls: [
          "bzz-raw://718159abc22da25c2de7e70f6b7bbbf6b6e20c3db6681893f8049b57f4ee65ce",
          "dweb:/ipfs/QmPJeQ7Qj7mrAwfR69sLjyjUSb44B7yAJXvMG1NFtoTJKv",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol": {
        keccak256: "0xf4852d52ec991c38fb7875f3573e42509c8414a8c1e3106e7c12ef8c8a568b50",
        urls: [
          "bzz-raw://b0e4b3479f7c4c56beb0116700862f5595fa00af74739fafd6ba39cdcc7e13fd",
          "dweb:/ipfs/QmS6sMpcUqXQQR1LTS7gCyXi3D2bafoS2PsfVKqFFywmLw",
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
      "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol": {
        keccak256: "0x6fac27fb1885a1d9fd2ce3f8fac4e44a6596ca4d44207c9ef2541ba8c941291e",
        urls: [
          "bzz-raw://2079378abdb36baec15c23bc2353b73a3d28d1d0610b436b0c1c4e6fa61d65c9",
          "dweb:/ipfs/QmVZkRFMzKW7sLaugKSTbMNnUBKWF3QDsoMi5uoQFyVMjf",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
        keccak256: "0xc859863e3bda7ec3cddf6dafe2ffe91bcbe648d1395b856b839c32ee9617c44c",
        urls: [
          "bzz-raw://a9d5417888b873cf2225ed5d50b2a67be97c1504134a2a580512168d587ad82e",
          "dweb:/ipfs/QmNr5fTb2heFW658NZn7dDnofZgFvQTnNxKRJ3wdnR1skX",
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
      "src/obligations/ERC1155EscrowObligation.sol": {
        keccak256: "0xf165b0949da505bde9cd545aa33efa2db13c675e5a29f45c9ea66a2a6835c57d",
        urls: [
          "bzz-raw://447cfe616af420b5cb10f82e24357a17ddf45c486f4a54a3732387e289a9783a",
          "dweb:/ipfs/QmZsB7w1YXScya3L97WqMFNijzBkAEDxsnudB7hdLV5sRd",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 121,
} as const;
