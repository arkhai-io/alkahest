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
          "internalType": "struct ERC721EscrowHook.HookData",
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
          "type": "bool",
          "internalType": "bool"
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
          "internalType": "struct ERC721EscrowHook.HookData",
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
      "name": "ERC721TransferFailed",
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
    "object": "0x608080604052346015576108c2908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f5f3560e01c80630fa37a1f146105025780631dc8160b1461026b578063488a6ebe146101ff578063561ca5251461018e5780635d93a3fc14610132578063be1e753b146100d95763f73085df14610067575f80fd5b346100d65760203660031901126100d65760043567ffffffffffffffff81116100d45760409161009e6100ba923690600401610569565b9091602085516100ad816105d9565b828152015281019061062b565b602082519160018060a01b03815116835201516020820152f35b505b80fd5b50346100d65760403660031901126100d65760043567ffffffffffffffff81116100d45761010b903690600401610569565b505060243567ffffffffffffffff81116100d4576101409060031990360301126100d65780f35b50346100d65760603660031901126100d65760ff60406020926101536105c3565b61015b610597565b6001600160a01b03918216835282865283832091165f908152908552829020604435825284522054604051911615158152f35b50346100d65760603660031901126100d65760043567ffffffffffffffff81116100d4576101c0903690600401610569565b6101c8610597565b9060443567ffffffffffffffff81116101fb576101409060031990360301126101f7576101f4926106af565b80f35b8380fd5b8480fd5b50346100d65760403660031901126100d65760408051602081016001600160a01b036102296105c3565b16815260243583830152828252610241606083610609565b8251938492602084525180928160208601528585015e828201840152601f01601f19168101030190f35b5060603660031901126104975760043567ffffffffffffffff811161049757610298903690600401610569565b6102a0610597565b916102a96105ad565b50346104f3576102bb9181019061062b565b60018060a01b03815116926020820193602085516024604051809481936331a9108f60e11b835260048301525afa9081156104e8575f916104c9575b506001600160a01b0384811691160361049b5781518451906001600160a01b0316803b15610497576040516323b872dd60e01b81526001600160a01b038616600482015230602482015260448101929092525f908290606490829084905af19081610482575b50610394575051915160405163045b391760e01b815292839261039092913091906001600160a01b031660048601610684565b0390fd5b929160018060a01b03825116602084516024604051809481936331a9108f60e11b835260048301525afa908115610477578591610448575b50306001600160a01b039091160361041a57503383526020838152604080852092516001600160a01b03165f9081529282529182902092518452919091528120805460ff1916600117905580f35b9051915160405163045b391760e01b815292839261039092913091906001600160a01b031660048601610684565b61046a915060203d602011610470575b6104628183610609565b810190610665565b5f6103cc565b503d610458565b6040513d87823e3d90fd5b61048f9192505f90610609565b5f905f61035d565b5f80fd5b5051915160405163045b391760e01b815292839261039092913091906001600160a01b031660048601610684565b6104e2915060203d602011610470576104628183610609565b5f6102f7565b6040513d5f823e3d90fd5b63e0aeda7d60e01b5f5260045ffd5b346104975760803660031901126104975760043567ffffffffffffffff811161049757610533903690600401610569565b61053b610597565b9060443567ffffffffffffffff81116104975761014090600319903603011261049757610567926106af565b005b9181601f840112156104975782359167ffffffffffffffff8311610497576020838186019501011161049757565b602435906001600160a01b038216820361049757565b604435906001600160a01b038216820361049757565b600435906001600160a01b038216820361049757565b6040810190811067ffffffffffffffff8211176105f557604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff8211176105f557604052565b908160409103126104975760405190610643826105d9565b8035906001600160a01b03821682036104975760209183520135602082015290565b9081602091031261049757516001600160a01b03811681036104975790565b6001600160a01b03918216815291811660208301529091166040820152606081019190915260800190565b6106bb9181019061062b565b335f9081526020818152604080832084516001600160a01b0316845282528083208285018051855292528220549092919060ff161561086257335f9081526020818152604080832085516001600160a01b03908116855290835281842087518552909252909120805460ff19169055825184519116803b15610497576040516323b872dd60e01b81523060048201526001600160a01b038716602482015260448101929092525f908290606490829084905af1908161084d575b506107a8575051905160405163045b391760e01b815292839261039092919030906001600160a01b031660048601610684565b60018060a01b03825116602084516024604051809481936331a9108f60e11b835260048301525afa9182156108415791610822575b506001600160a01b038481169116036107f557505050565b51905160405163045b391760e01b815292839261039092919030906001600160a01b031660048601610684565b61083b915060203d602011610470576104628183610609565b5f6107dd565b604051903d90823e3d90fd5b61085a9192505f90610609565b5f905f610775565b50519051637bbf8f6560e11b5f908152336004526001600160a01b03909216602452604452606490fdfea264697066735822122055f4e2570b348de0ca2a4ca796fe8f5aad22925879609a89dd9db58d14889cc364736f6c634300081b0033",
    "sourceMap": "546:3645:118:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f5f3560e01c80630fa37a1f146105025780631dc8160b1461026b578063488a6ebe146101ff578063561ca5251461018e5780635d93a3fc14610132578063be1e753b146100d95763f73085df14610067575f80fd5b346100d65760203660031901126100d65760043567ffffffffffffffff81116100d45760409161009e6100ba923690600401610569565b9091602085516100ad816105d9565b828152015281019061062b565b602082519160018060a01b03815116835201516020820152f35b505b80fd5b50346100d65760403660031901126100d65760043567ffffffffffffffff81116100d45761010b903690600401610569565b505060243567ffffffffffffffff81116100d4576101409060031990360301126100d65780f35b50346100d65760603660031901126100d65760ff60406020926101536105c3565b61015b610597565b6001600160a01b03918216835282865283832091165f908152908552829020604435825284522054604051911615158152f35b50346100d65760603660031901126100d65760043567ffffffffffffffff81116100d4576101c0903690600401610569565b6101c8610597565b9060443567ffffffffffffffff81116101fb576101409060031990360301126101f7576101f4926106af565b80f35b8380fd5b8480fd5b50346100d65760403660031901126100d65760408051602081016001600160a01b036102296105c3565b16815260243583830152828252610241606083610609565b8251938492602084525180928160208601528585015e828201840152601f01601f19168101030190f35b5060603660031901126104975760043567ffffffffffffffff811161049757610298903690600401610569565b6102a0610597565b916102a96105ad565b50346104f3576102bb9181019061062b565b60018060a01b03815116926020820193602085516024604051809481936331a9108f60e11b835260048301525afa9081156104e8575f916104c9575b506001600160a01b0384811691160361049b5781518451906001600160a01b0316803b15610497576040516323b872dd60e01b81526001600160a01b038616600482015230602482015260448101929092525f908290606490829084905af19081610482575b50610394575051915160405163045b391760e01b815292839261039092913091906001600160a01b031660048601610684565b0390fd5b929160018060a01b03825116602084516024604051809481936331a9108f60e11b835260048301525afa908115610477578591610448575b50306001600160a01b039091160361041a57503383526020838152604080852092516001600160a01b03165f9081529282529182902092518452919091528120805460ff1916600117905580f35b9051915160405163045b391760e01b815292839261039092913091906001600160a01b031660048601610684565b61046a915060203d602011610470575b6104628183610609565b810190610665565b5f6103cc565b503d610458565b6040513d87823e3d90fd5b61048f9192505f90610609565b5f905f61035d565b5f80fd5b5051915160405163045b391760e01b815292839261039092913091906001600160a01b031660048601610684565b6104e2915060203d602011610470576104628183610609565b5f6102f7565b6040513d5f823e3d90fd5b63e0aeda7d60e01b5f5260045ffd5b346104975760803660031901126104975760043567ffffffffffffffff811161049757610533903690600401610569565b61053b610597565b9060443567ffffffffffffffff81116104975761014090600319903603011261049757610567926106af565b005b9181601f840112156104975782359167ffffffffffffffff8311610497576020838186019501011161049757565b602435906001600160a01b038216820361049757565b604435906001600160a01b038216820361049757565b600435906001600160a01b038216820361049757565b6040810190811067ffffffffffffffff8211176105f557604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff8211176105f557604052565b908160409103126104975760405190610643826105d9565b8035906001600160a01b03821682036104975760209183520135602082015290565b9081602091031261049757516001600160a01b03811681036104975790565b6001600160a01b03918216815291811660208301529091166040820152606081019190915260800190565b6106bb9181019061062b565b335f9081526020818152604080832084516001600160a01b0316845282528083208285018051855292528220549092919060ff161561086257335f9081526020818152604080832085516001600160a01b03908116855290835281842087518552909252909120805460ff19169055825184519116803b15610497576040516323b872dd60e01b81523060048201526001600160a01b038716602482015260448101929092525f908290606490829084905af1908161084d575b506107a8575051905160405163045b391760e01b815292839261039092919030906001600160a01b031660048601610684565b60018060a01b03825116602084516024604051809481936331a9108f60e11b835260048301525afa9182156108415791610822575b506001600160a01b038481169116036107f557505050565b51905160405163045b391760e01b815292839261039092919030906001600160a01b031660048601610684565b61083b915060203d602011610470576104628183610609565b5f6107dd565b604051903d90823e3d90fd5b61085a9192505f90610609565b5f905f610775565b50519051637bbf8f6560e11b5f908152336004526001600160a01b03909216602452604452606490fdfea264697066735822122055f4e2570b348de0ca2a4ca796fe8f5aad22925879609a89dd9db58d14889cc364736f6c634300081b0033",
    "sourceMap": "546:3645:118:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;;;;;;;;4154:28;546:3645;;;;;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;4154:28;;;;:::i;:::-;546:3645;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;;;;:::i;:::-;;;:::i;:::-;-1:-1:-1;;;;;546:3645:118;;;;;;;;;;;;;-1:-1:-1;546:3645:118;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;2652:2;;;:::i;:::-;546:3645;;;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;4019:20;;;-1:-1:-1;;;;;546:3645:118;;:::i;:::-;;;;;;;;;;4019:20;;;;;;;:::i;:::-;546:3645;;;;;4019:20;546:3645;;;;;;4019:20;546:3645;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;;-1:-1:-1;546:3645:118;;-1:-1:-1;;546:3645:118;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;1307:9;1303:62;;1402:28;;;;;;:::i;:::-;546:3645;;;;;;;;1504:15;546:3645;1504:15;;546:3645;;;;;;;;;;;;;;1473:47;;546:3645;1473:47;;546:3645;1473:47;;;;;;;546:3645;1473:47;;;546:3645;-1:-1:-1;;;;;;546:3645:118;;;;;1473:55;1469:166;;546:3645;;;;;-1:-1:-1;;;;;546:3645:118;1649:73;;;;;546:3645;;-1:-1:-1;;;1649:73:118;;-1:-1:-1;;;;;546:3645:118;;;1649:73;;546:3645;1699:4;546:3645;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;-1:-1:-1;;1649:73:118;;;;;;546:3645;-1:-1:-1;1645:200:118;;-1:-1:-1;546:3645:118;;;;;-1:-1:-1;;;1761:73:118;;546:3645;;;1761:73;;546:3645;1699:4;;1551:73;-1:-1:-1;;;;;546:3645:118;;1761:73;;;:::i;:::-;;;;1645:200;;;546:3645;;;;;;;;;;;;;;;;;;;;;1896:47;;546:3645;1896:47;;546:3645;1896:47;;;;;;;;;;;1645:200;-1:-1:-1;1699:4:118;-1:-1:-1;;;;;546:3645:118;;;1896:64;1892:175;;-1:-1:-1;2086:10:118;546:3645;;;;;;;;;;;;-1:-1:-1;;;;;546:3645:118;-1:-1:-1;546:3645:118;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;1892:175;546:3645;;;;;;-1:-1:-1;;;1983:73:118;;546:3645;;;1983:73;;546:3645;1699:4;;546:3645;-1:-1:-1;;;;;546:3645:118;;1983:73;;;:::i;1896:47::-;;;;546:3645;1896:47;546:3645;1896:47;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;;;;;546:3645;;;;;;;;;1649:73;;;;;546:3645;1649:73;;:::i;:::-;546:3645;1649:73;;;;;546:3645;;;1469:166;-1:-1:-1;546:3645:118;;;;;-1:-1:-1;;;1551:73:118;;546:3645;;;1551:73;;546:3645;1601:4;;1551:73;-1:-1:-1;;;;;546:3645:118;;1551:73;;;:::i;1473:47::-;;;;546:3645;1473:47;546:3645;1473:47;;;;;;;:::i;:::-;;;;;546:3645;;;;;;;;;1303:62;1330:35;;;546:3645;1330:35;546:3645;;1330:35;546:3645;;;;;;-1:-1:-1;;546:3645:118;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;2453:2;;;:::i;:::-;546:3645;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;546:3645:118;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;546:3645:118;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;546:3645:118;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;546:3645:118;;;;;-1:-1:-1;546:3645:118;;;;4019:20;;546:3645;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;546:3645:118;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;-1:-1:-1;;;;;546:3645:118;;;;;;;:::o;:::-;-1:-1:-1;;;;;546:3645:118;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2815:775::-;2915:28;2815:775;2915:28;;;;:::i;:::-;2968:10;2959:8;546:3645;;;;;;;;;;;;;-1:-1:-1;;;;;546:3645:118;;;;;;;;2995:15;;;546:3645;;;;;;;;;2995:15;;2968:10;2959:8;546:3645;;2958:53;2954:144;;2968:10;2959:8;546:3645;;;;;;;;;;;;;-1:-1:-1;;;;;546:3645:118;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;;;;3183:71;;;;;546:3645;;-1:-1:-1;;;3183:71:118;;3227:4;3183:71;;;546:3645;-1:-1:-1;;;;;546:3645:118;;;;;;;;;;;;;-1:-1:-1;;546:3645:118;;;;;;-1:-1:-1;;3183:71:118;;;;;;2815:775;-1:-1:-1;3179:196:118;;-1:-1:-1;546:3645:118;;;;;-1:-1:-1;;;3293:71:118;;546:3645;;;3293:71;;546:3645;1551:73;3227:4;;-1:-1:-1;;;;;546:3645:118;3183:71;3293;;;:::i;3179:196::-;546:3645;;;;;;;;;;;3426:47;546:3645;;;;;;;;;3426:47;;3183:71;3426:47;;546:3645;3426:47;;;;;;;;;;3179:196;-1:-1:-1;;;;;;546:3645:118;;;;;3426:53;3422:162;;2815:775;;;:::o;3422:162::-;546:3645;;;;;-1:-1:-1;;;3502:71:118;;546:3645;;;3502:71;;546:3645;1551:73;3227:4;;-1:-1:-1;;;;;546:3645:118;3183:71;3502;;;:::i;3426:47::-;;;;546:3645;3426:47;546:3645;3426:47;;;;;;;:::i;:::-;;;;;546:3645;;;;;;;;;;3183:71;;;;;2959:8;3183:71;;:::i;:::-;2959:8;3183:71;;;;2954:144;-1:-1:-1;546:3645:118;;;-1:-1:-1;;;2959:8:118;3034:53;;;2968:10;3034:53;546:3645;-1:-1:-1;;;;;546:3645:118;;;;;;;;;3034:53",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "decodeHookData(bytes)": "f73085df",
    "deposits(address,address,uint256)": "5d93a3fc",
    "encodeHookData((address,uint256))": "488a6ebe",
    "onAttest(bytes,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "be1e753b",
    "onLock(bytes,address,address)": "1dc8160b",
    "onRelease(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes32)": "0fa37a1f",
    "onReturn(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "561ca525"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC721TransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"NoDeposit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnexpectedNativeValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeHookData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC721EscrowHook.HookData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"deposits\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"internalType\":\"struct ERC721EscrowHook.HookData\",\"name\":\"hookData\",\"type\":\"tuple\"}],\"name\":\"encodeHookData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onAttest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onLock\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"onRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onReturn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"hookData is abi.encode(HookData).      Deposits are tracked per-caller per-token per-tokenId.      Users must approve this hook contract (or setApprovalForAll)      before the obligation calls onLock.\",\"kind\":\"dev\",\"methods\":{},\"title\":\"ERC721EscrowHook\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"deposits(address,address,uint256)\":{\"notice\":\"Tracks deposits: caller \\u2192 token \\u2192 tokenId \\u2192 held.\"}},\"notice\":\"An IEscrowHook that escrows a single ERC721 token.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/hooks/ERC721EscrowHook.sol\":\"ERC721EscrowHook\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol\":{\"keccak256\":\"0xf78f05f3b8c9f75570e85300d7b4600d7f6f6a198449273f31d44c1641adb46f\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://e28b872613b45e0e801d4995aa4380be2531147bfe2d85c1d6275f1de514fba3\",\"dweb:/ipfs/QmeeFcfShHYaS3BdgVj78nxR28ZaVUwbvr66ud8bT6kzw9\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7\",\"dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc\"]},\"src/obligations/escrow/hook-based/hooks/ERC721EscrowHook.sol\":{\"keccak256\":\"0x063ba3f6c008fd4c4bf43954189afdc10fe694fc876dd970c92c7e177aa6b5f2\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d74ff2d58497adaeb0caf3635fba0585fc0340678692798589750126022814f8\",\"dweb:/ipfs/QmPuraZKVxwbVtRZk8hyNuoyE28a2uG4yENzVhXDXdCGZX\"]}},\"version\":1}",
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
            }
          ],
          "type": "error",
          "name": "ERC721TransferFailed"
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
              "internalType": "struct ERC721EscrowHook.HookData",
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
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "struct ERC721EscrowHook.HookData",
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
          "deposits(address,address,uint256)": {
            "notice": "Tracks deposits: caller → token → tokenId → held."
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
        "src/obligations/escrow/hook-based/hooks/ERC721EscrowHook.sol": "ERC721EscrowHook"
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
      "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol": {
        "keccak256": "0xf78f05f3b8c9f75570e85300d7b4600d7f6f6a198449273f31d44c1641adb46f",
        "urls": [
          "bzz-raw://e28b872613b45e0e801d4995aa4380be2531147bfe2d85c1d6275f1de514fba3",
          "dweb:/ipfs/QmeeFcfShHYaS3BdgVj78nxR28ZaVUwbvr66ud8bT6kzw9"
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
      "src/obligations/escrow/hook-based/hooks/ERC721EscrowHook.sol": {
        "keccak256": "0x063ba3f6c008fd4c4bf43954189afdc10fe694fc876dd970c92c7e177aa6b5f2",
        "urls": [
          "bzz-raw://d74ff2d58497adaeb0caf3635fba0585fc0340678692798589750126022814f8",
          "dweb:/ipfs/QmPuraZKVxwbVtRZk8hyNuoyE28a2uG4yENzVhXDXdCGZX"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 118
} as const;
