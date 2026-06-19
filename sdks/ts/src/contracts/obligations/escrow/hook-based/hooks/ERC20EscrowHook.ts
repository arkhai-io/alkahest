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
          "internalType": "struct ERC20EscrowHook.HookData",
          "components": [
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
          "internalType": "struct ERC20EscrowHook.HookData",
          "components": [
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
    "object": "0x60808060405234601557610869908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c80630fa37a1f146104915780631dc8160b1461024f578063488a6ebe146101e1578063561ca5251461017a5780638f601f661461012c578063be1e753b146100d55763f73085df14610066575f80fd5b346100d15760203660031901126100d15760043567ffffffffffffffff81116100d1576100b761009c60409236906004016104be565b5f602085516100aa8161052e565b8281520152810190610580565b602082519160018060a01b03815116835201516020820152f35b5f80fd5b346100d15760403660031901126100d15760043567ffffffffffffffff81116100d1576101069036906004016104be565b505060243567ffffffffffffffff81116100d1576101409060031990360301126100d157005b346100d15760403660031901126100d157610145610518565b61014d6104ec565b6001600160a01b039182165f90815260208181526040808320949093168252928352819020549051908152f35b346100d15760603660031901126100d15760043567ffffffffffffffff81116100d1576101ab9036906004016104be565b6101b36104ec565b9060443567ffffffffffffffff81116100d1576101409060031990360301126100d1576101df926105db565b005b346100d15760403660031901126100d157604080516020810191906001600160a01b0361020c610518565b1683526024358282015281815261022460608261055e565b8151928391602083525180918160208501528484015e5f828201840152601f01601f19168101030190f35b60603660031901126100d15760043567ffffffffffffffff81116100d15761027b9036906004016104be565b906102846104ec565b9161028d610502565b503461048257816102a2916024930190610580565b80516040516370a0823160e01b81523060048201529193919260209184919082906001600160a01b03165afa918215610436575f9261044e575b508251602080850180516040516323b872dd60e01b5f9081526001600160a01b0387811660045230602452604493909352929694909391169160648180855af19060015f5114821615610441575b5060408290525f60605285516370a0823160e01b8352306004840152602090839060249082906001600160a01b03165afa918215610436575f92610402575b50159182156103ec575b50506103af575051335f9081526020818152604080832094516001600160a01b0316835293905291909120805490916103ab916105ba565b9055005b82519151604051634a73404560e11b81526001600160a01b0393841660048201529190921660248201523060448201526064810191909152608490fd5b6103fa9192508451906105ba565b118480610373565b9091506020813d60201161042e575b8161041e6020938361055e565b810103126100d157519086610369565b3d9150610411565b6040513d5f823e3d90fd5b3b15153d1516168661032a565b9091506020813d60201161047a575b8161046a6020938361055e565b810103126100d1575190836102dc565b3d915061045d565b63e0aeda7d60e01b5f5260045ffd5b346100d15760803660031901126100d15760043567ffffffffffffffff81116100d1576101ab9036906004015b9181601f840112156100d15782359167ffffffffffffffff83116100d157602083818601950101116100d157565b602435906001600160a01b03821682036100d157565b604435906001600160a01b03821682036100d157565b600435906001600160a01b03821682036100d157565b6040810190811067ffffffffffffffff82111761054a57604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761054a57604052565b908160409103126100d157604051906105988261052e565b8035906001600160a01b03821682036100d15760209183520135602082015290565b919082018092116105c757565b634e487b7160e01b5f52601160045260245ffd5b6105e791810190610580565b335f9081526020818152604080832084516001600160a01b0316845290915290205490811561080f57602081019182518082106107d85750825181039081116105c757335f9081526020818152604080832085516001600160a01b0390811685529083529281902093909355835192516370a0823160e01b8152868316600482018190529093909284916024918391165afa918215610436575f926107a4575b5060018060a01b03835116908451916040519263a9059cbb60e01b5f52826004526024528260205f60448180865af19160015f5114831615610792575b50602481602093948160405260018060a01b03895116906370a0823160e01b835260048301525afa918215610436575f9261075e575b5015918215610748575b505061070f57505050565b519051604051634a73404560e11b81526001600160a01b0392831660048201523060248201529290911660448301526064820152608490fd5b6107569192508451906105ba565b115f80610704565b9091506020813d60201161078a575b8161077a6020938361055e565b810103126100d15751905f6106fa565b3d915061076d565b3d15903b1515169091169060246106c4565b9091506020813d6020116107d0575b816107c06020938361055e565b810103126100d15751905f610687565b3d91506107b3565b915160405163b90e11b560e01b81523360048201526001600160a01b03909116602482015260448101929092526064820152608490fd5b51631f5f09af60e21b5f908152336004526001600160a01b03909116602452604490fdfea26469706673582212204d8f1285b80662779fe9fb921719889ee686b2c33f5e065e70a12567ce3ff6dd64736f6c634300081b0033",
    "sourceMap": "799:3687:117:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80630fa37a1f146104915780631dc8160b1461024f578063488a6ebe146101e1578063561ca5251461017a5780638f601f661461012c578063be1e753b146100d55763f73085df14610066575f80fd5b346100d15760203660031901126100d15760043567ffffffffffffffff81116100d1576100b761009c60409236906004016104be565b5f602085516100aa8161052e565b8281520152810190610580565b602082519160018060a01b03815116835201516020820152f35b5f80fd5b346100d15760403660031901126100d15760043567ffffffffffffffff81116100d1576101069036906004016104be565b505060243567ffffffffffffffff81116100d1576101409060031990360301126100d157005b346100d15760403660031901126100d157610145610518565b61014d6104ec565b6001600160a01b039182165f90815260208181526040808320949093168252928352819020549051908152f35b346100d15760603660031901126100d15760043567ffffffffffffffff81116100d1576101ab9036906004016104be565b6101b36104ec565b9060443567ffffffffffffffff81116100d1576101409060031990360301126100d1576101df926105db565b005b346100d15760403660031901126100d157604080516020810191906001600160a01b0361020c610518565b1683526024358282015281815261022460608261055e565b8151928391602083525180918160208501528484015e5f828201840152601f01601f19168101030190f35b60603660031901126100d15760043567ffffffffffffffff81116100d15761027b9036906004016104be565b906102846104ec565b9161028d610502565b503461048257816102a2916024930190610580565b80516040516370a0823160e01b81523060048201529193919260209184919082906001600160a01b03165afa918215610436575f9261044e575b508251602080850180516040516323b872dd60e01b5f9081526001600160a01b0387811660045230602452604493909352929694909391169160648180855af19060015f5114821615610441575b5060408290525f60605285516370a0823160e01b8352306004840152602090839060249082906001600160a01b03165afa918215610436575f92610402575b50159182156103ec575b50506103af575051335f9081526020818152604080832094516001600160a01b0316835293905291909120805490916103ab916105ba565b9055005b82519151604051634a73404560e11b81526001600160a01b0393841660048201529190921660248201523060448201526064810191909152608490fd5b6103fa9192508451906105ba565b118480610373565b9091506020813d60201161042e575b8161041e6020938361055e565b810103126100d157519086610369565b3d9150610411565b6040513d5f823e3d90fd5b3b15153d1516168661032a565b9091506020813d60201161047a575b8161046a6020938361055e565b810103126100d1575190836102dc565b3d915061045d565b63e0aeda7d60e01b5f5260045ffd5b346100d15760803660031901126100d15760043567ffffffffffffffff81116100d1576101ab9036906004015b9181601f840112156100d15782359167ffffffffffffffff83116100d157602083818601950101116100d157565b602435906001600160a01b03821682036100d157565b604435906001600160a01b03821682036100d157565b600435906001600160a01b03821682036100d157565b6040810190811067ffffffffffffffff82111761054a57604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761054a57604052565b908160409103126100d157604051906105988261052e565b8035906001600160a01b03821682036100d15760209183520135602082015290565b919082018092116105c757565b634e487b7160e01b5f52601160045260245ffd5b6105e791810190610580565b335f9081526020818152604080832084516001600160a01b0316845290915290205490811561080f57602081019182518082106107d85750825181039081116105c757335f9081526020818152604080832085516001600160a01b0390811685529083529281902093909355835192516370a0823160e01b8152868316600482018190529093909284916024918391165afa918215610436575f926107a4575b5060018060a01b03835116908451916040519263a9059cbb60e01b5f52826004526024528260205f60448180865af19160015f5114831615610792575b50602481602093948160405260018060a01b03895116906370a0823160e01b835260048301525afa918215610436575f9261075e575b5015918215610748575b505061070f57505050565b519051604051634a73404560e11b81526001600160a01b0392831660048201523060248201529290911660448301526064820152608490fd5b6107569192508451906105ba565b115f80610704565b9091506020813d60201161078a575b8161077a6020938361055e565b810103126100d15751905f6106fa565b3d915061076d565b3d15903b1515169091169060246106c4565b9091506020813d6020116107d0575b816107c06020938361055e565b810103126100d15751905f610687565b3d91506107b3565b915160405163b90e11b560e01b81523360048201526001600160a01b03909116602482015260448101929092526064820152608490fd5b51631f5f09af60e21b5f908152336004526001600160a01b03909116602452604490fdfea26469706673582212204d8f1285b80662779fe9fb921719889ee686b2c33f5e065e70a12567ce3ff6dd64736f6c634300081b0033",
    "sourceMap": "799:3687:117:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;799:3687:117;;;;;;;;;;;4449:28;799:3687;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;4449:28;;;;:::i;:::-;799:3687;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;799:3687:117;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;799:3687:117;;;;;;:::i;:::-;;;:::i;:::-;-1:-1:-1;;;;;799:3687:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;799:3687:117;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;2807:2;;;:::i;:::-;799:3687;;;;;;;-1:-1:-1;;799:3687:117;;;;;;;4314:20;;;;799:3687;-1:-1:-1;;;;;799:3687:117;;:::i;:::-;;;;;;;;;;4314:20;;;;;;;:::i;:::-;799:3687;;;;;4314:20;799:3687;;;;;;4314:20;799:3687;;;;;;;;;;;;;;;;-1:-1:-1;;799:3687:117;;;;;;;;;;-1:-1:-1;;799:3687:117;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;:::i;:::-;;1663:9;1659:62;;1758:28;;;799:3687;1758:28;;;;:::i;:::-;799:3687;;;;-1:-1:-1;;;1821:46:117;;1861:4;799:3687;1821:46;;799:3687;;;;;;;;;;;;-1:-1:-1;;;;;799:3687:117;1821:46;;;;;;;799:3687;1821:46;;;799:3687;-1:-1:-1;799:3687:117;;;1956:14;;;799:3687;;;10404:1148:45;-1:-1:-1;;;799:3687:117;10404:1148:45;;;-1:-1:-1;;;;;10404:1148:45;;;799:3687:117;10404:1148:45;1861:4:117;799:3687;10404:1148:45;799:3687:117;10404:1148:45;;;;1956:14:117;;;10404:1148:45;;799:3687:117;;;10404:1148:45;799:3687:117;;;10404:1148:45;;;;799:3687:117;10404:1148:45;;;;;;;799:3687:117;-1:-1:-1;799:3687:117;10404:1148:45;;;799:3687:117;;10404:1148:45;799:3687:117;;-1:-1:-1;;;2005:46:117;;1861:4;799:3687;2005:46;;799:3687;;;10404:1148:45;;799:3687:117;;10404:1148:45;;-1:-1:-1;;;;;799:3687:117;2005:46;;;;;;;799:3687;2005:46;;;799:3687;2066:8;;799:3687;;;2066:57;;799:3687;2062:166;;;;-1:-1:-1;799:3687:117;2247:10;799:3687;;;;;;;;;;;;;;-1:-1:-1;;;;;799:3687:117;;;;;;;;;;;;;;2238:53;;;:::i;:::-;799:3687;;;2062:166;799:3687;;;;;;-1:-1:-1;;;2146:71:117;;-1:-1:-1;;;;;799:3687:117;;;;2146:71;;799:3687;;;;;;;;;1861:4;799:3687;;;;;;;;;;;;;2146:71;2066:57;2093:30;799:3687;;;;;2093:30;;:::i;:::-;-1:-1:-1;2066:57:117;;;;2005:46;;;;799:3687;2005:46;;799:3687;2005:46;;;;;;799:3687;2005:46;;;:::i;:::-;;;799:3687;;;;;2005:46;;;;;;;-1:-1:-1;2005:46:117;;;799:3687;;;;;;;;;10404:1148:45;;;;;;;;;;;1821:46:117;;;;799:3687;1821:46;;799:3687;1821:46;;;;;;799:3687;1821:46;;;:::i;:::-;;;799:3687;;;;;1821:46;;;;;;;-1:-1:-1;1821:46:117;;1659:62;1686:35;;;799:3687;1686:35;799:3687;;1686:35;799:3687;;;;;;-1:-1:-1;;799:3687:117;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;799:3687:117;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;799:3687:117;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;799:3687:117;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;799:3687:117;;;;;-1:-1:-1;799:3687:117;;;;4314:20;;799:3687;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;799:3687:117;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;2970:915;3070:28;2970:915;3070:28;;;;:::i;:::-;3138:10;3129:8;799:3687;;;;;;;;;;;;;-1:-1:-1;;;;;799:3687:117;;;;;;;;;;3178:14;;3174:88;;799:3687;3287:14;;799:3687;;;3275:26;;;3271:137;;799:3687;;;;;;;;;;3138:10;3129:8;799:3687;;;;;;;;;;;;;-1:-1:-1;;;;;799:3687:117;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;3517:35:117;;799:3687;;;3517:35;;;799:3687;;;;;;;;;3517:35;;799:3687;;;3517:35;;;;;;;3129:8;3517:35;;;2970:915;799:3687;;;;;;;;;;;;2138:38:45;799:3687:117;8544:1067:45;8509:24;;;;3129:8:117;8544:1067:45;;3517:35:117;8544:1067:45;3517:35:117;8544:1067:45;;799:3687:117;3129:8;8544:1067:45;;;;;;;;3129:8:117;8544:1067:45;;;;;;;2970:915:117;8544:1067:45;3517:35:117;8544:1067:45;799:3687:117;8544:1067:45;;;799:3687:117;8544:1067:45;799:3687:117;;;;;;;;;;;;3669:35;;3517;3669;;799:3687;3669:35;;;;;;;3129:8;3669:35;;;2970:915;3719:8;;799:3687;;;3719:57;;2970:915;3715:164;;;;2970:915;;;:::o;3715:164::-;799:3687;;;;;-1:-1:-1;;;3799:69:117;;-1:-1:-1;;;;;799:3687:117;;;3517:35;3799:69;;799:3687;3842:4;799:3687;;;;;;;;;;;;;;;;;;2146:71;3719:57;3746:30;799:3687;;;;;3746:30;;:::i;:::-;-1:-1:-1;3719:57:117;;;;3669:35;;;;799:3687;3669:35;;799:3687;3669:35;;;;;;799:3687;3669:35;;;:::i;:::-;;;799:3687;;;;;3669:35;;;;;;;-1:-1:-1;3669:35:117;;8544:1067:45;;;;;;;;;;;;3517:35:117;8544:1067:45;;3517:35:117;;;;799:3687;3517:35;;799:3687;3517:35;;;;;;799:3687;3517:35;;;:::i;:::-;;;799:3687;;;;;3517:35;;;;;;;-1:-1:-1;3517:35:117;;3271:137;799:3687;;;;-1:-1:-1;;;3324:73:117;;3138:10;3324:73;;;799:3687;-1:-1:-1;;;;;799:3687:117;;;;;;;;;;;;;;;;;;3324:73;;;3174:88;799:3687;-1:-1:-1;;;3129:8:117;3215:36;;;3138:10;3215:36;799:3687;-1:-1:-1;;;;;799:3687:117;;;;;;;3215:36",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "decodeHookData(bytes)": "f73085df",
    "deposits(address,address)": "8f601f66",
    "encodeHookData((address,uint256))": "488a6ebe",
    "onAttest(bytes,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "be1e753b",
    "onLock(bytes,address,address)": "1dc8160b",
    "onRelease(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes32)": "0fa37a1f",
    "onReturn(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "561ca525"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"ERC20TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"requested\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"available\",\"type\":\"uint256\"}],\"name\":\"InsufficientDeposit\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"NoDeposit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnexpectedNativeValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeHookData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowHook.HookData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"deposits\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC20EscrowHook.HookData\",\"name\":\"hookData\",\"type\":\"tuple\"}],\"name\":\"encodeHookData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onAttest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onLock\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"onRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onReturn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"hookData is abi.encode(HookData).      Security model: deposits are tracked per-caller (msg.sender) per-token.      Any contract can deposit via onLock and only withdraw what it deposited      via onRelease/onReturn. No owner, no authorization mapping.      Users must approve this hook contract for the token before the      obligation calls onLock.\",\"kind\":\"dev\",\"methods\":{},\"title\":\"ERC20EscrowHook\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"deposits(address,address)\":{\"notice\":\"Tracks deposits: caller (obligation) \\u2192 token \\u2192 amount held.\"}},\"notice\":\"An IEscrowHook that escrows a single ERC20 token + amount.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/hooks/ERC20EscrowHook.sol\":\"ERC20EscrowHook\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0xd5ea07362ab630a6a3dee4285a74cf2377044ca2e4be472755ad64d7c5d4b69d\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da5e832b40fc5c3145d3781e2e5fa60ac2052c9d08af7e300dc8ab80c4343100\",\"dweb:/ipfs/QmTzf7N5ZUdh5raqtzbM11yexiUoLC9z3Ws632MCuycq1d\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0x0afcb7e740d1537b252cb2676f600465ce6938398569f09ba1b9ca240dde2dfc\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1c299900ac4ec268d4570ecef0d697a3013cd11a6eb74e295ee3fbc945056037\",\"dweb:/ipfs/Qmab9owJoxcA7vJT5XNayCMaUR1qxqj1NDzzisduwaJMcZ\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0x1a6221315ce0307746c2c4827c125d821ee796c74a676787762f4778671d4f44\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1bb2332a7ee26dd0b0de9b7fe266749f54820c99ab6a3bcb6f7e6b751d47ee2d\",\"dweb:/ipfs/QmcRWpaBeCYkhy68PR3B4AgD7asuQk7PwkWxrvJbZcikLF\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0x74ed01eb66b923d0d0cfe3be84604ac04b76482a55f9dd655e1ef4d367f95bc2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5282825a626cfe924e504274b864a652b0023591fa66f06a067b25b51ba9b303\",\"dweb:/ipfs/QmeCfPykghhMc81VJTrHTC7sF6CRvaA1FXVq2pJhwYp1dV\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x304d732678032a9781ae85c8f204c8fba3d3a5e31c02616964e75cfdc5049098\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://299ced486011781dc98f638059678323c03079fefae1482abaa2135b22fa92d0\",\"dweb:/ipfs/QmbZNbcPTBxNvwChavN2kkZZs7xHhYL7mv51KrxMhsMs3j\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7\",\"dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc\"]},\"src/obligations/escrow/hook-based/hooks/ERC20EscrowHook.sol\":{\"keccak256\":\"0x6e9c01476512dd0972fde2811f9116c701d55ead89a3be3292ead576e15e5a3b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e3f60dc0d1ee719550d826d91ac93e15f5e89ec921d5be80a4157bcf90102dad\",\"dweb:/ipfs/QmTo2NuKSYfZUfeybZTm4T3iteUBdsSMXdCLXxSN3ouV9n\"]}},\"version\":1}",
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
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "ERC20TransferFailed"
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
              "internalType": "struct ERC20EscrowHook.HookData",
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
              "internalType": "struct ERC20EscrowHook.HookData",
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
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {},
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "deposits(address,address)": {
            "notice": "Tracks deposits: caller (obligation) → token → amount held."
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
        "src/obligations/escrow/hook-based/hooks/ERC20EscrowHook.sol": "ERC20EscrowHook"
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
      "src/obligations/escrow/hook-based/hooks/ERC20EscrowHook.sol": {
        "keccak256": "0x6e9c01476512dd0972fde2811f9116c701d55ead89a3be3292ead576e15e5a3b",
        "urls": [
          "bzz-raw://e3f60dc0d1ee719550d826d91ac93e15f5e89ec921d5be80a4157bcf90102dad",
          "dweb:/ipfs/QmTo2NuKSYfZUfeybZTm4T3iteUBdsSMXdCLXxSN3ouV9n"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 117
} as const;
