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
          "internalType": "struct NativeTokenEscrowHook.HookData",
          "components": [
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
          "internalType": "struct NativeTokenEscrowHook.HookData",
          "components": [
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
      "name": "IncorrectPayment",
      "inputs": [
        {
          "name": "expected",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "received",
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
      "name": "NativeTokenTransferFailed",
      "inputs": [
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
      "name": "NoDeposit",
      "inputs": [
        {
          "name": "caller",
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
    "object": "0x608080604052346015576104b1908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c80630fa37a1f146102a95780631dc8160b14610211578063561ca525146101aa578063a533219c14610151578063be1e753b146100fa578063f73085df146100a55763fc7e286d14610066575f80fd5b346100a15760203660031901126100a1576004356001600160a01b038116908190036100a1575f525f602052602060405f2054604051908152f35b5f80fd5b346100a15760203660031901126100a15760043567ffffffffffffffff81116100a1576100f16100db60209236906004016102d6565b5f6040516100e881610330565b52810190610382565b60405190518152f35b346100a15760403660031901126100a15760043567ffffffffffffffff81116100a15761012b9036906004016102d6565b505060243567ffffffffffffffff81116100a1576101409060031990360301126100a157005b346100a15760203660031901126100a1576040516040602082019160043583526020815261017f8282610360565b8151928391602083525180918160208501528484015e5f828201840152601f01601f19168101030190f35b346100a15760603660031901126100a15760043567ffffffffffffffff81116100a1576101db9036906004016102d6565b6101e3610304565b9060443567ffffffffffffffff81116100a1576101409060031990360301126100a15761020f926103a0565b005b60603660031901126100a15760043567ffffffffffffffff81116100a15761024061025a9136906004016102d6565b610248610304565b5061025161031a565b50810190610382565b8051803403610293575051335f525f60205260405f20805491820180921161027f5755005b634e487b7160e01b5f52601160045260245ffd5b630d35e92160e01b5f526004523460245260445ffd5b346100a15760803660031901126100a15760043567ffffffffffffffff81116100a1576101db9036906004015b9181601f840112156100a15782359167ffffffffffffffff83116100a157602083818601950101116100a157565b602435906001600160a01b03821682036100a157565b604435906001600160a01b03821682036100a157565b6020810190811067ffffffffffffffff82111761034c57604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761034c57604052565b908160209103126100a1576040519061039a82610330565b35815290565b6103ac91810190610382565b90335f525f60205260405f2054801561046857825180821061044f57508251810390811161027f57335f525f60205260405f205560018060a01b0316905f8080808451865af13d1561044a573d67ffffffffffffffff811161034c5760405190610420601f8201601f191660200183610360565b81525f60203d92013e5b15610433575050565b51906338f0620160e21b5f5260045260245260445ffd5b61042a565b632fc28c5360e01b5f523360045260245260445260645ffd5b6325ed2d4960e11b5f523360045260245ffdfea2646970667358221220c776f4b185cb446a9f2b4ff7469df922c6a82d8a0352824e9becadd34e549d5e64736f6c634300081b0033",
    "sourceMap": "385:2937:119:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80630fa37a1f146102a95780631dc8160b14610211578063561ca525146101aa578063a533219c14610151578063be1e753b146100fa578063f73085df146100a55763fc7e286d14610066575f80fd5b346100a15760203660031901126100a1576004356001600160a01b038116908190036100a1575f525f602052602060405f2054604051908152f35b5f80fd5b346100a15760203660031901126100a15760043567ffffffffffffffff81116100a1576100f16100db60209236906004016102d6565b5f6040516100e881610330565b52810190610382565b60405190518152f35b346100a15760403660031901126100a15760043567ffffffffffffffff81116100a15761012b9036906004016102d6565b505060243567ffffffffffffffff81116100a1576101409060031990360301126100a157005b346100a15760203660031901126100a1576040516040602082019160043583526020815261017f8282610360565b8151928391602083525180918160208501528484015e5f828201840152601f01601f19168101030190f35b346100a15760603660031901126100a15760043567ffffffffffffffff81116100a1576101db9036906004016102d6565b6101e3610304565b9060443567ffffffffffffffff81116100a1576101409060031990360301126100a15761020f926103a0565b005b60603660031901126100a15760043567ffffffffffffffff81116100a15761024061025a9136906004016102d6565b610248610304565b5061025161031a565b50810190610382565b8051803403610293575051335f525f60205260405f20805491820180921161027f5755005b634e487b7160e01b5f52601160045260245ffd5b630d35e92160e01b5f526004523460245260445ffd5b346100a15760803660031901126100a15760043567ffffffffffffffff81116100a1576101db9036906004015b9181601f840112156100a15782359167ffffffffffffffff83116100a157602083818601950101116100a157565b602435906001600160a01b03821682036100a157565b604435906001600160a01b03821682036100a157565b6020810190811067ffffffffffffffff82111761034c57604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761034c57604052565b908160209103126100a1576040519061039a82610330565b35815290565b6103ac91810190610382565b90335f525f60205260405f2054801561046857825180821061044f57508251810390811161027f57335f525f60205260405f205560018060a01b0316905f8080808451865af13d1561044a573d67ffffffffffffffff811161034c5760405190610420601f8201601f191660200183610360565b81525f60203d92013e5b15610433575050565b51906338f0620160e21b5f5260045260245260445ffd5b61042a565b632fc28c5360e01b5f523360045260245260445260645ffd5b6325ed2d4960e11b5f523360045260245ffdfea2646970667358221220c776f4b185cb446a9f2b4ff7469df922c6a82d8a0352824e9becadd34e549d5e64736f6c634300081b0033",
    "sourceMap": "385:2937:119:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;385:2937:119;;;;;;-1:-1:-1;;;;;385:2937:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;385:2937:119;;;;;;;;;;;3285:28;385:2937;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;3285:28;;;;:::i;:::-;385:2937;;;;;;;;;;;;;-1:-1:-1;;385:2937:119;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;385:2937:119;;;;;;;;3150:20;;385:2937;;;;;;3150:20;;;;;;:::i;:::-;385:2937;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;385:2937:119;;;;;;;;;;;;;-1:-1:-1;;385:2937:119;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;1927:2;;;:::i;:::-;385:2937;;;;-1:-1:-1;;385:2937:119;;;;;;;;;;;;1216:28;385:2937;;;;;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;1216:28;;;;:::i;:::-;385:2937;;1259:9;;:27;1255:108;;385:2937;;1382:10;385:2937;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1255:108;1309:43;;;385:2937;1309:43;385:2937;;1259:9;385:2937;;;;1309:43;385:2937;;;;;;-1:-1:-1;;385:2937:119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;385:2937:119;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;385:2937:119;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;385:2937:119;;;;;-1:-1:-1;385:2937:119;;;;3150:20;;385:2937;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;:::o;2090:631::-;2190:28;2090:631;2190:28;;;;:::i;:::-;2258:10;;2249:8;385:2937;2249:8;385:2937;;;2249:8;385:2937;;2283:14;;2279:73;;385:2937;;2365:26;;;2361:122;;385:2937;;;;;;;;;;2258:10;2249:8;385:2937;2249:8;385:2937;;;2249:8;385:2937;;;;;;;;;2249:8;385:2937;;;;;2571:43;;;385:2937;;;;;;;;;;;;;;3150:20;385:2937;;-1:-1:-1;;385:2937:119;;;;;:::i;:::-;;;2249:8;385:2937;;;;;;2628:8;2624:91;;2090:631;;:::o;2624:91::-;385:2937;2659:45;;;;2249:8;2659:45;;385:2937;;;;2249:8;2659:45;385:2937;;;2361:122;2414:58;;;2249:8;2414:58;2258:10;2414:58;385:2937;;;;;;2249:8;2414:58;2279:73;2320:21;;;2249:8;2320:21;2258:10;2320:21;385:2937;;2249:8;2320:21",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "decodeHookData(bytes)": "f73085df",
    "deposits(address)": "fc7e286d",
    "encodeHookData((uint256))": "a533219c",
    "onAttest(bytes,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "be1e753b",
    "onLock(bytes,address,address)": "1dc8160b",
    "onRelease(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes32)": "0fa37a1f",
    "onReturn(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "561ca525"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\"}],\"name\":\"IncorrectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"requested\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"available\",\"type\":\"uint256\"}],\"name\":\"InsufficientDeposit\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"}],\"name\":\"NoDeposit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnexpectedNativeValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeHookData\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct NativeTokenEscrowHook.HookData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"deposits\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct NativeTokenEscrowHook.HookData\",\"name\":\"hookData\",\"type\":\"tuple\"}],\"name\":\"encodeHookData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onAttest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onLock\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"onRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onReturn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"hookData is abi.encode(HookData).      ETH is forwarded via msg.value through onLock.      Deposits are tracked per-caller.\",\"kind\":\"dev\",\"methods\":{},\"title\":\"NativeTokenEscrowHook\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"deposits(address)\":{\"notice\":\"Tracks deposits: caller (obligation) \\u2192 amount held.\"}},\"notice\":\"An IEscrowHook that escrows native ETH.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/hooks/NativeTokenEscrowHook.sol\":\"NativeTokenEscrowHook\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7\",\"dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc\"]},\"src/obligations/escrow/hook-based/hooks/NativeTokenEscrowHook.sol\":{\"keccak256\":\"0x8c681be63a0efd7cd06fb62dbfc492ca6d6f41a8d6096326e9c52cdec831c74e\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d5d9b099885c421b5543be0d1438d1cb0afcde0f7d6a738cebbed7d5b420250e\",\"dweb:/ipfs/QmaVoT394n8bvsHVsYSkZva4dJZLVfP5qfXMyzDX9rikJk\"]}},\"version\":1}",
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
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "received",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "IncorrectPayment"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "caller",
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
          "name": "NativeTokenTransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "caller",
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
              "internalType": "struct NativeTokenEscrowHook.HookData",
              "name": "",
              "type": "tuple",
              "components": [
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
              "internalType": "struct NativeTokenEscrowHook.HookData",
              "name": "hookData",
              "type": "tuple",
              "components": [
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
              "name": "",
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
          "deposits(address)": {
            "notice": "Tracks deposits: caller (obligation) → amount held."
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
        "src/obligations/escrow/hook-based/hooks/NativeTokenEscrowHook.sol": "NativeTokenEscrowHook"
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
      "src/obligations/escrow/hook-based/IEscrowHook.sol": {
        "keccak256": "0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b",
        "urls": [
          "bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7",
          "dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/hook-based/hooks/NativeTokenEscrowHook.sol": {
        "keccak256": "0x8c681be63a0efd7cd06fb62dbfc492ca6d6f41a8d6096326e9c52cdec831c74e",
        "urls": [
          "bzz-raw://d5d9b099885c421b5543be0d1438d1cb0afcde0f7d6a738cebbed7d5b420250e",
          "dweb:/ipfs/QmaVoT394n8bvsHVsYSkZva4dJZLVfP5qfXMyzDX9rikJk"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 119
} as const;
