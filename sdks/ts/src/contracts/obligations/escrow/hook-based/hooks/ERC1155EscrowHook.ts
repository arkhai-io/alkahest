export const abi = {
  "abi": [
    {
      "type": "function",
      "name": "decodeHookData",
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
          "internalType": "struct ERC1155EscrowHook.HookData",
          "components": [
            {
              "name": "token",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
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
      "name": "deposits",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
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
      "name": "encodeHookData",
      "inputs": [
        {
          "name": "hookData",
          "type": "tuple",
          "internalType": "struct ERC1155EscrowHook.HookData",
          "components": [
            {
              "name": "token",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "onAttest",
      "inputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "",
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
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "onERC1155BatchReceived",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "onERC1155Received",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "onLock",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "onRelease",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
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
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "onReturn",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
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
      "outputs": [],
      "stateMutability": "nonpayable"
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
      "type": "error",
      "name": "ERC1155TransferFailed",
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
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
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
      "name": "InsufficientDeposit",
      "inputs": [
        {
          "name": "caller",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "requested",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "available",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "NoDeposit",
      "inputs": [
        {
          "name": "caller",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "UnexpectedNativeValue",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610af5908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f905f3560e01c90816301ffc9a7146106a9575080630fa37a1f146106445780631dc8160b1461038c578063561ca5251461031d5780635d93a3fc146102c6578063bc197c8114610230578063be1e753b146101d9578063e765fef514610164578063f23a6e611461010e5763f73085df1461008c575f80fd5b3461010b57602036600319011261010b576004356001600160401b038111610109576060916100c26100e49236906004016106fc565b9091604080516100d18161076b565b8281528260208201520152810190610877565b6040805182516001600160a01b03168152602080840151908201529181015190820152f35b505b80fd5b503461010b5760a036600319011261010b57610128610755565b50610131610729565b506084356001600160401b03811161010957610151903690600401610822565b5060405163f23a6e6160e01b8152602090f35b503461010b57606036600319011261010b5760408051602081016001600160a01b0361018e610755565b168152602435838301526044356060830152606082526101af60808361079a565b8251938492602084525180928160208601528585015e828201840152601f01601f19168101030190f35b503461010b57604036600319011261010b576004356001600160401b0381116101095761020a9036906004016106fc565b50506024356001600160401b0381116101095761014090600319903603011261010b5780f35b503461010b5760a036600319011261010b5761024a610755565b50610253610729565b506044356001600160401b038111610109576102739036906004016107bb565b506064356001600160401b038111610109576102939036906004016107bb565b506084356001600160401b038111610109576102b3903690600401610822565b5060405163bc197c8160e01b8152602090f35b503461010b57606036600319011261010b5760406020916102e5610755565b6102ed610729565b6001600160a01b03918216835282855283832091165f908152908452829020604435825283522054604051908152f35b503461010b57606036600319011261010b576004356001600160401b0381116101095761034e9036906004016106fc565b610356610729565b906044356001600160401b03811161038857610140906003199036030112610384576103819261090f565b80f35b8380fd5b8480fd5b5060603660031901126105ca576004356001600160401b0381116105ca576103b89036906004016106fc565b6103c0610729565b916103c961073f565b5034610635576103db91810190610877565b805160208083018051604051627eeac760e11b815230600482015260248101919091529094939092909190839060449082906001600160a01b03165afa91821561062a575f926105f6575b50805184516040830180519094926001600160a01b03169190823b156105ca57604051637921219560e11b81526001600160a01b03881660048201523060248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af190816105e1575b506104d15750519251905160405163334a7d1b60e21b81529384936104cd93913091906001600160a01b0316600487016108bb565b0390fd5b81518551604051627eeac760e11b81523060048201526024810191909152929594929190602090839060449082906001600160a01b03165afa9182156105d657879261059c575b508351610524916108ee565b1161056b5750513384526020848152604080862094516001600160a01b03165f90815294825293849020925185529190915290822080549091610566916108ee565b905580f35b83519251915160405163334a7d1b60e21b81529384936104cd9390913091906001600160a01b0316600487016108bb565b9091506020813d6020116105ce575b816105b86020938361079a565b810103126105ca575190610524610518565b5f80fd5b3d91506105ab565b6040513d89823e3d90fd5b6105ee9197505f9061079a565b5f955f610498565b9091506020813d602011610622575b816106126020938361079a565b810103126105ca5751905f610426565b3d9150610605565b6040513d5f823e3d90fd5b63e0aeda7d60e01b5f5260045ffd5b346105ca5760803660031901126105ca576004356001600160401b0381116105ca576106749036906004016106fc565b61067c610729565b906044356001600160401b0381116105ca576101409060031990360301126105ca576106a79261090f565b005b346105ca5760203660031901126105ca576004359063ffffffff60e01b82168092036105ca57602091630271189760e51b81149081156106eb575b5015158152f35b6301ffc9a760e01b149050836106e4565b9181601f840112156105ca578235916001600160401b0383116105ca57602083818601950101116105ca57565b602435906001600160a01b03821682036105ca57565b604435906001600160a01b03821682036105ca57565b600435906001600160a01b03821682036105ca57565b606081019081106001600160401b0382111761078657604052565b634e487b7160e01b5f52604160045260245ffd5b90601f801991011681019081106001600160401b0382111761078657604052565b9080601f830112156105ca578135916001600160401b038311610786578260051b90604051936107ee602084018661079a565b84526020808501928201019283116105ca57602001905b8282106108125750505090565b8135815260209182019101610805565b81601f820112156105ca578035906001600160401b0382116107865760405192610856601f8401601f19166020018561079a565b828452602083830101116105ca57815f926020809301838601378301015290565b908160609103126105ca576040519061088f8261076b565b8035906001600160a01b03821682036105ca576040918352602081013560208401520135604082015290565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b919082018092116108fb57565b634e487b7160e01b5f52601160045260245ffd5b61091e91939293810190610877565b335f9081526020818152604080832084516001600160a01b0316845282528083208285018051855292529091205490929091908215610a955760408201928351808210610a565750835181039081116108fb57335f525f60205260405f2060018060a01b0384511660018060a01b03165f5260205260405f2085515f5260205260405f205560018060a01b0382511684518451823b156105ca57604051637921219560e11b81523060048201526001600160a01b03891660248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af19081610a46575b50610a3f5750519151905160405163334a7d1b60e21b81529384936104cd93919030906001600160a01b0316600487016108bb565b9350505050565b5f610a509161079a565b5f610a0a565b92518551604051637b5793f360e11b81523360048201526001600160a01b0390921660248301526044820152606481019390935260848301525060a490fd5b81518451637bbf8f6560e11b5f908152336004526001600160a01b03909216602452604452606490fdfea2646970667358221220dbfa0fb702281a92b3ca2b6d63ace1b3290938ac84581bf173c525947a6a877e64736f6c634300081b0033",
    "sourceMap": "668:3898:116:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f905f3560e01c90816301ffc9a7146106a9575080630fa37a1f146106445780631dc8160b1461038c578063561ca5251461031d5780635d93a3fc146102c6578063bc197c8114610230578063be1e753b146101d9578063e765fef514610164578063f23a6e611461010e5763f73085df1461008c575f80fd5b3461010b57602036600319011261010b576004356001600160401b038111610109576060916100c26100e49236906004016106fc565b9091604080516100d18161076b565b8281528260208201520152810190610877565b6040805182516001600160a01b03168152602080840151908201529181015190820152f35b505b80fd5b503461010b5760a036600319011261010b57610128610755565b50610131610729565b506084356001600160401b03811161010957610151903690600401610822565b5060405163f23a6e6160e01b8152602090f35b503461010b57606036600319011261010b5760408051602081016001600160a01b0361018e610755565b168152602435838301526044356060830152606082526101af60808361079a565b8251938492602084525180928160208601528585015e828201840152601f01601f19168101030190f35b503461010b57604036600319011261010b576004356001600160401b0381116101095761020a9036906004016106fc565b50506024356001600160401b0381116101095761014090600319903603011261010b5780f35b503461010b5760a036600319011261010b5761024a610755565b50610253610729565b506044356001600160401b038111610109576102739036906004016107bb565b506064356001600160401b038111610109576102939036906004016107bb565b506084356001600160401b038111610109576102b3903690600401610822565b5060405163bc197c8160e01b8152602090f35b503461010b57606036600319011261010b5760406020916102e5610755565b6102ed610729565b6001600160a01b03918216835282855283832091165f908152908452829020604435825283522054604051908152f35b503461010b57606036600319011261010b576004356001600160401b0381116101095761034e9036906004016106fc565b610356610729565b906044356001600160401b03811161038857610140906003199036030112610384576103819261090f565b80f35b8380fd5b8480fd5b5060603660031901126105ca576004356001600160401b0381116105ca576103b89036906004016106fc565b6103c0610729565b916103c961073f565b5034610635576103db91810190610877565b805160208083018051604051627eeac760e11b815230600482015260248101919091529094939092909190839060449082906001600160a01b03165afa91821561062a575f926105f6575b50805184516040830180519094926001600160a01b03169190823b156105ca57604051637921219560e11b81526001600160a01b03881660048201523060248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af190816105e1575b506104d15750519251905160405163334a7d1b60e21b81529384936104cd93913091906001600160a01b0316600487016108bb565b0390fd5b81518551604051627eeac760e11b81523060048201526024810191909152929594929190602090839060449082906001600160a01b03165afa9182156105d657879261059c575b508351610524916108ee565b1161056b5750513384526020848152604080862094516001600160a01b03165f90815294825293849020925185529190915290822080549091610566916108ee565b905580f35b83519251915160405163334a7d1b60e21b81529384936104cd9390913091906001600160a01b0316600487016108bb565b9091506020813d6020116105ce575b816105b86020938361079a565b810103126105ca575190610524610518565b5f80fd5b3d91506105ab565b6040513d89823e3d90fd5b6105ee9197505f9061079a565b5f955f610498565b9091506020813d602011610622575b816106126020938361079a565b810103126105ca5751905f610426565b3d9150610605565b6040513d5f823e3d90fd5b63e0aeda7d60e01b5f5260045ffd5b346105ca5760803660031901126105ca576004356001600160401b0381116105ca576106749036906004016106fc565b61067c610729565b906044356001600160401b0381116105ca576101409060031990360301126105ca576106a79261090f565b005b346105ca5760203660031901126105ca576004359063ffffffff60e01b82168092036105ca57602091630271189760e51b81149081156106eb575b5015158152f35b6301ffc9a760e01b149050836106e4565b9181601f840112156105ca578235916001600160401b0383116105ca57602083818601950101116105ca57565b602435906001600160a01b03821682036105ca57565b604435906001600160a01b03821682036105ca57565b600435906001600160a01b03821682036105ca57565b606081019081106001600160401b0382111761078657604052565b634e487b7160e01b5f52604160045260245ffd5b90601f801991011681019081106001600160401b0382111761078657604052565b9080601f830112156105ca578135916001600160401b038311610786578260051b90604051936107ee602084018661079a565b84526020808501928201019283116105ca57602001905b8282106108125750505090565b8135815260209182019101610805565b81601f820112156105ca578035906001600160401b0382116107865760405192610856601f8401601f19166020018561079a565b828452602083830101116105ca57815f926020809301838601378301015290565b908160609103126105ca576040519061088f8261076b565b8035906001600160a01b03821682036105ca576040918352602081013560208401520135604082015290565b6001600160a01b039182168152918116602083015290911660408201526060810191909152608081019190915260a00190565b919082018092116108fb57565b634e487b7160e01b5f52601160045260245ffd5b61091e91939293810190610877565b335f9081526020818152604080832084516001600160a01b0316845282528083208285018051855292529091205490929091908215610a955760408201928351808210610a565750835181039081116108fb57335f525f60205260405f2060018060a01b0384511660018060a01b03165f5260205260405f2085515f5260205260405f205560018060a01b0382511684518451823b156105ca57604051637921219560e11b81523060048201526001600160a01b03891660248201526044810192909252606482015260a060848201525f60a482018190529091829060c490829084905af19081610a46575b50610a3f5750519151905160405163334a7d1b60e21b81529384936104cd93919030906001600160a01b0316600487016108bb565b9350505050565b5f610a509161079a565b5f610a0a565b92518551604051637b5793f360e11b81523360048201526001600160a01b0390921660248301526044820152606481019390935260848301525060a490fd5b81518451637bbf8f6560e11b5f908152336004526001600160a01b03909216602452604452606490fdfea2646970667358221220dbfa0fb702281a92b3ca2b6d63ace1b3290938ac84581bf173c525947a6a877e64736f6c634300081b0033",
    "sourceMap": "668:3898:116:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;4529:28;668:3898;;;;;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;;;;;;4529:28;;;;:::i;:::-;668:3898;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;-1:-1:-1;668:3898:116;;-1:-1:-1;;;668:3898:116;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;;4394:20;;;-1:-1:-1;;;;;668:3898:116;;:::i;:::-;;;;;;;;;;;;;;;;;4394:20;;;;;;:::i;:::-;668:3898;;;;;4394:20;668:3898;;;;;;4394:20;668:3898;;;;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;-1:-1:-1;668:3898:116;;-1:-1:-1;;;668:3898:116;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;;;;:::i;:::-;;;:::i;:::-;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;-1:-1:-1;668:3898:116;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;668:3898:116;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;2967:2;;;:::i;:::-;668:3898;;;;;;;;;;;-1:-1:-1;668:3898:116;;-1:-1:-1;;668:3898:116;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;1613:9;1609:62;;1708:28;;;;;;:::i;:::-;668:3898;;;1820:15;;;668:3898;;;;-1:-1:-1;;;1771:65:116;;1813:4;668:3898;1771:65;;668:3898;;;;;;;;1820:15;;;668:3898;;;;;;;;;;;-1:-1:-1;;;;;668:3898:116;1771:65;;;;;;;668:3898;1771:65;;;668:3898;-1:-1:-1;668:3898:116;;;;;1930:14;;668:3898;;1930:14;;668:3898;-1:-1:-1;;;;;668:3898:116;;;1851:98;;;;;668:3898;;-1:-1:-1;;;1851:98:116;;-1:-1:-1;;;;;668:3898:116;;;1851:98;;668:3898;1813:4;668:3898;;;;;;;;;;;;;;;;;;;;-1:-1:-1;668:3898:116;;;;;;;;;;;;;;-1:-1:-1;;1851:98:116;;;;;;668:3898;-1:-1:-1;1847:242:116;;-1:-1:-1;668:3898:116;;;;;;;-1:-1:-1;;;1988:90:116;;668:3898;;;1988:90;;668:3898;1813:4;;1988:90;-1:-1:-1;;;;;668:3898:116;;1988:90;;;:::i;:::-;;;;1847:242;668:3898;;;;;;-1:-1:-1;;;2122:65:116;;1813:4;668:3898;2122:65;;668:3898;;;;;;;;;;;1847:242;668:3898;;;;;;;;;;-1:-1:-1;;;;;668:3898:116;2122:65;;;;;;;;;;;1847:242;-1:-1:-1;668:3898:116;;2217:30;;;:::i;:::-;-1:-1:-1;2198:173:116;;-1:-1:-1;668:3898:116;2390:10;668:3898;;;;;;;;;;;;-1:-1:-1;;;;;668:3898:116;-1:-1:-1;668:3898:116;;;;;;;;;;;;;;;;;;;;;;;;;2381:70;;;:::i;:::-;668:3898;;;;2198:173;668:3898;;;;;;;;-1:-1:-1;;;2270:90:116;;668:3898;;;2270:90;;668:3898;;1813:4;;668:3898;-1:-1:-1;;;;;668:3898:116;;2270:90;;;:::i;2122:65::-;;;;668:3898;2122:65;;668:3898;2122:65;;;;;;668:3898;2122:65;;;:::i;:::-;;;668:3898;;;;;;2217:30;2122:65;;668:3898;-1:-1:-1;668:3898:116;;2122:65;;;-1:-1:-1;2122:65:116;;;668:3898;;;;;;;;;1851:98;;;;;668:3898;1851:98;;:::i;:::-;668:3898;1851:98;;;;1771:65;;;;668:3898;1771:65;;668:3898;1771:65;;;;;;668:3898;1771:65;;;:::i;:::-;;;668:3898;;;;;1771:65;;;;;;;-1:-1:-1;1771:65:116;;;668:3898;;;;;;;;;1609:62;1636:35;;;668:3898;1636:35;668:3898;;1636:35;668:3898;;;;;;-1:-1:-1;;668:3898:116;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;2768:2;;;:::i;:::-;668:3898;;;;;;;-1:-1:-1;;668:3898:116;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;766:49:42;;;:89;;;;668:3898:116;;;;;;;766:89:42;-1:-1:-1;;;829:40:61;;-1:-1:-1;766:89:42;;;668:3898:116;;;;;;;;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;:::o;:::-;;;;-1:-1:-1;668:3898:116;;;;;-1:-1:-1;668:3898:116;;;;4394:20;;668:3898;;;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;4394:20;668:3898;;-1:-1:-1;;668:3898:116;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;668:3898:116;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;3130:835;3230:28;3130:835;;;;3230:28;;;;:::i;:::-;3298:10;3289:8;668:3898;;;;;;;;;;;;;-1:-1:-1;;;;;668:3898:116;;;;;;;;3325:15;;;668:3898;;;;;;;;;;3325:15;;668:3898;;3289:8;3355:14;;3351:105;;668:3898;3481:14;;668:3898;;;3469:26;;;3465:154;;668:3898;;;;;;;;;;3298:10;3289:8;668:3898;3289:8;668:3898;;;3289:8;668:3898;;;;;;;;;;;;;;;3289:8;668:3898;;;;3289:8;668:3898;;;3289:8;668:3898;;;;3289:8;668:3898;;;;;;;;;;;;;;3725:96;;;;;668:3898;;-1:-1:-1;;;3725:96:116;;3774:4;3725:96;;;668:3898;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;668:3898:116;;;;;;;;;;;;;;-1:-1:-1;;3725:96:116;;;;;;3130:835;-1:-1:-1;3721:238:116;;-1:-1:-1;668:3898:116;;;;;;;-1:-1:-1;;;3860:88:116;;668:3898;;;3860:88;;668:3898;1988:90;3774:4;;-1:-1:-1;;;;;668:3898:116;3725:96;3860:88;;;:::i;3721:238::-;;;;;;3130:835::o;3725:96::-;3289:8;3725:96;;;:::i;:::-;3289:8;3725:96;;3465:154;668:3898;;;;;;-1:-1:-1;;;3518:90:116;;3298:10;3518:90;;;668:3898;-1:-1:-1;;;;;668:3898:116;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3518:90:116;;;3351:105;668:3898;;;;-1:-1:-1;;;3289:8:116;3392:53;;;3298:10;3392:53;668:3898;-1:-1:-1;;;;;668:3898:116;;;;;;;;;3392:53",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "decodeHookData(bytes)": "f73085df",
    "deposits(address,address,uint256)": "5d93a3fc",
    "encodeHookData((address,uint256,uint256))": "e765fef5",
    "onAttest(bytes,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "be1e753b",
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": "bc197c81",
    "onERC1155Received(address,address,uint256,uint256,bytes)": "f23a6e61",
    "onLock(bytes,address,address)": "1dc8160b",
    "onRelease(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes32)": "0fa37a1f",
    "onReturn(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "561ca525",
    "supportsInterface(bytes4)": "01ffc9a7"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC1155TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"requested\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"available\",\"type\":\"uint256\"}],\"name\":\"InsufficientDeposit\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"NoDeposit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnexpectedNativeValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeHookData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowHook.HookData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"deposits\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC1155EscrowHook.HookData\",\"name\":\"hookData\",\"type\":\"tuple\"}],\"name\":\"encodeHookData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onAttest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onLock\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"onRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onReturn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"hookData is abi.encode(HookData).      Deposits are tracked per-caller per-token per-tokenId.      Users must call setApprovalForAll on the ERC1155 contract      for this hook before the obligation calls onLock.\",\"kind\":\"dev\",\"methods\":{\"supportsInterface(bytes4)\":{\"details\":\"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas.\"}},\"title\":\"ERC1155EscrowHook\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"deposits(address,address,uint256)\":{\"notice\":\"Tracks deposits: caller \\u2192 token \\u2192 tokenId \\u2192 amount held.\"}},\"notice\":\"An IEscrowHook that escrows ERC1155 tokens (single id + amount).\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/hooks/ERC1155EscrowHook.sol\":\"ERC1155EscrowHook\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol\":{\"keccak256\":\"0xf189f9b417fe1931e1ab706838aff1128528694a9fcdb5ff7665197f2ca57d09\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2ff0143c836c8c9f85d13708733c09e21251395847fccfb518bf3b556726a840\",\"dweb:/ipfs/QmP69sjjrQrhYAsvCSSB69Bx66SiUPdQUqdzMYnf4wANHm\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol\":{\"keccak256\":\"0x6ec6d7fce29668ede560c7d2e10f9d10de3473f5298e431e70a5767db42fa620\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ac0139e51874aeec0730d040e57993187541777eb01d5939c06d5d2b986a54e8\",\"dweb:/ipfs/QmZbMbdPzusXuX9FGkyArV8hgzKLBZaL5RzMtCdCawtwPF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol\":{\"keccak256\":\"0x8727aacfc1f069266528eef6380f351d4d4d907b56715e799e0a6bc2d1362db7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://aa0dcc5e88b91ae16e4d08c3e43af2e9cacfc98bdd9b4eb015f8b022a8efca5c\",\"dweb:/ipfs/QmS5NxwRNqCsc6Te4a18nKU51tCh8RjkF4ATJvZms48Y4X\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377\",\"dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7\",\"dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc\"]},\"src/obligations/escrow/hook-based/hooks/ERC1155EscrowHook.sol\":{\"keccak256\":\"0x5384f05838299eca384b64c37ee9b1a4d2074b90cd90c2af1ac2388e0488b3be\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://aa88fcd5a582d48fdbcce9d9e404c1c530886a72e28b33b1ff24f9f82c4dad19\",\"dweb:/ipfs/QmUXLqBUTAwXNWLBk826AVqwqzJavxfck4AazhVw6Euzy6\"]}},\"version\":1}",
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
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC1155TransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "requested",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "available",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "InsufficientDeposit"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "NoDeposit"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnexpectedNativeValue"
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
          "name": "decodeHookData",
          "outputs": [
            {
              "internalType": "struct ERC1155EscrowHook.HookData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
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
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "deposits",
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
              "internalType": "struct ERC1155EscrowHook.HookData",
              "name": "hookData",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "token",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ]
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "encodeHookData",
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
              "name": "",
              "type": "bytes"
            },
            {
              "internalType": "struct Attestation",
              "name": "",
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
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onAttest"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onERC1155BatchReceived",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onERC1155Received",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
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
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "onLock"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "struct Attestation",
              "name": "",
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
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onRelease"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "struct Attestation",
              "name": "",
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
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onReturn"
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
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "supportsInterface(bytes4)": {
            "details": "Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section] to learn more about how these ids are created. This function call must use less than 30 000 gas."
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "deposits(address,address,uint256)": {
            "notice": "Tracks deposits: caller → token → tokenId → amount held."
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
        "src/obligations/escrow/hook-based/hooks/ERC1155EscrowHook.sol": "ERC1155EscrowHook"
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
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155.sol": {
        "keccak256": "0xf189f9b417fe1931e1ab706838aff1128528694a9fcdb5ff7665197f2ca57d09",
        "urls": [
          "bzz-raw://2ff0143c836c8c9f85d13708733c09e21251395847fccfb518bf3b556726a840",
          "dweb:/ipfs/QmP69sjjrQrhYAsvCSSB69Bx66SiUPdQUqdzMYnf4wANHm"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol": {
        "keccak256": "0x6ec6d7fce29668ede560c7d2e10f9d10de3473f5298e431e70a5767db42fa620",
        "urls": [
          "bzz-raw://ac0139e51874aeec0730d040e57993187541777eb01d5939c06d5d2b986a54e8",
          "dweb:/ipfs/QmZbMbdPzusXuX9FGkyArV8hgzKLBZaL5RzMtCdCawtwPF"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol": {
        "keccak256": "0x8727aacfc1f069266528eef6380f351d4d4d907b56715e799e0a6bc2d1362db7",
        "urls": [
          "bzz-raw://aa0dcc5e88b91ae16e4d08c3e43af2e9cacfc98bdd9b4eb015f8b022a8efca5c",
          "dweb:/ipfs/QmS5NxwRNqCsc6Te4a18nKU51tCh8RjkF4ATJvZms48Y4X"
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
      "src/obligations/escrow/hook-based/IEscrowHook.sol": {
        "keccak256": "0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b",
        "urls": [
          "bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7",
          "dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/hook-based/hooks/ERC1155EscrowHook.sol": {
        "keccak256": "0x5384f05838299eca384b64c37ee9b1a4d2074b90cd90c2af1ac2388e0488b3be",
        "urls": [
          "bzz-raw://aa88fcd5a582d48fdbcce9d9e404c1c530886a72e28b33b1ff24f9f82c4dad19",
          "dweb:/ipfs/QmUXLqBUTAwXNWLBk826AVqwqzJavxfck4AazhVw6Euzy6"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 116
} as const;
