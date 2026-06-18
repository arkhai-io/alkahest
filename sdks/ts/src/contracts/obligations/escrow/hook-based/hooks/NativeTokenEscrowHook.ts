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
          "type": "address",
          "internalType": "address"
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
          "type": "address",
          "internalType": "address"
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
    "object": "0x608080604052346015576103c7908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c80631a6a5893146101485780631dc8160b1461014d5780638b9d453914610148578063a533219c146100ef578063f73085df1461009a5763fc7e286d1461005b575f80fd5b34610096576020366003190112610096576004356001600160a01b03811690819003610096575f525f602052602060405f2054604051908152f35b5f80fd5b346100965760203660031901126100965760043567ffffffffffffffff8111610096576100e66100d060209236906004016101b2565b5f6040516100dd81610335565b52810190610373565b60405190518152f35b34610096576020366003190112610096576040516040602082019160043583526020815261011d8282610351565b8151928391602083525180918160208501528484015e5f828201840152601f01601f19168101030190f35b610237565b610163610159366101e0565b5050810190610373565b805180340361019c575051335f525f60205260405f2080549182018092116101885755005b634e487b7160e01b5f52601160045260245ffd5b630d35e92160e01b5f526004523460245260445ffd5b9181601f840112156100965782359167ffffffffffffffff8311610096576020838186019501011161009657565b6060600319820112610096576004359067ffffffffffffffff82116100965761020b916004016101b2565b90916024356001600160a01b038116810361009657906044356001600160a01b03811681036100965790565b3461009657610254610248366101e0565b50929190810190610373565b90335f525f60205260405f2054801561032257825180821061030957508251810390811161018857335f525f60205260405f205560018060a01b0316905f8080808451865af13d15610304573d67ffffffffffffffff81116102f057604051906102c8601f8201601f191660200183610351565b81525f60203d92013e5b156102d957005b51906338f0620160e21b5f5260045260245260445ffd5b634e487b7160e01b5f52604160045260245ffd5b6102d2565b632fc28c5360e01b5f523360045260245260445260645ffd5b6325ed2d4960e11b5f523360045260245ffd5b6020810190811067ffffffffffffffff8211176102f057604052565b90601f8019910116810190811067ffffffffffffffff8211176102f057604052565b90816020910312610096576040519061038b82610335565b3581529056fea26469706673582212200d4229192690e81f126eabc7b6701174b007c98484b223b6480af99ba57ba38664736f6c634300081b0033",
    "sourceMap": "340:2791:90:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80631a6a5893146101485780631dc8160b1461014d5780638b9d453914610148578063a533219c146100ef578063f73085df1461009a5763fc7e286d1461005b575f80fd5b34610096576020366003190112610096576004356001600160a01b03811690819003610096575f525f602052602060405f2054604051908152f35b5f80fd5b346100965760203660031901126100965760043567ffffffffffffffff8111610096576100e66100d060209236906004016101b2565b5f6040516100dd81610335565b52810190610373565b60405190518152f35b34610096576020366003190112610096576040516040602082019160043583526020815261011d8282610351565b8151928391602083525180918160208501528484015e5f828201840152601f01601f19168101030190f35b610237565b610163610159366101e0565b5050810190610373565b805180340361019c575051335f525f60205260405f2080549182018092116101885755005b634e487b7160e01b5f52601160045260245ffd5b630d35e92160e01b5f526004523460245260445ffd5b9181601f840112156100965782359167ffffffffffffffff8311610096576020838186019501011161009657565b6060600319820112610096576004359067ffffffffffffffff82116100965761020b916004016101b2565b90916024356001600160a01b038116810361009657906044356001600160a01b03811681036100965790565b3461009657610254610248366101e0565b50929190810190610373565b90335f525f60205260405f2054801561032257825180821061030957508251810390811161018857335f525f60205260405f205560018060a01b0316905f8080808451865af13d15610304573d67ffffffffffffffff81116102f057604051906102c8601f8201601f191660200183610351565b81525f60203d92013e5b156102d957005b51906338f0620160e21b5f5260045260245260445ffd5b634e487b7160e01b5f52604160045260245ffd5b6102d2565b632fc28c5360e01b5f523360045260245260445260645ffd5b6325ed2d4960e11b5f523360045260245ffd5b6020810190811067ffffffffffffffff8211176102f057604052565b90601f8019910116810190811067ffffffffffffffff8211176102f057604052565b90816020910312610096576040519061038b82610335565b3581529056fea26469706673582212200d4229192690e81f126eabc7b6701174b007c98484b223b6480af99ba57ba38664736f6c634300081b0033",
    "sourceMap": "340:2791:90:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;340:2791:90;;;;;;-1:-1:-1;;;;;340:2791:90;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;340:2791:90;;;;;;;;;;;3094:28;340:2791;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;3094:28;;;;:::i;:::-;340:2791;;;;;;;;;;;;;-1:-1:-1;;340:2791:90;;;;;;;;2959:20;;340:2791;;;;;;2959:20;;;;;;:::i;:::-;340:2791;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;340:2791:90;;;;;;;;;:::i;:::-;1171:28;340:2791;;;:::i;:::-;1171:28;;;;;;:::i;:::-;340:2791;;1214:9;;:27;1210:108;;340:2791;;1337:10;340:2791;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1210:108;1264:43;;;340:2791;1264:43;340:2791;;1214:9;340:2791;;;;1264:43;340:2791;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;340:2791:90;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;340:2791:90;;;;;;;;;-1:-1:-1;;;;;340:2791:90;;;;;;;:::o;:::-;;;;1999:28;340:2791;;;:::i;:::-;1999:28;;;;;;;;:::i;:::-;2067:10;;2058:8;340:2791;2058:8;340:2791;;;2058:8;340:2791;;2092:14;;2088:73;;340:2791;;2174:26;;;2170:122;;340:2791;;;;;;;;;;2067:10;2058:8;340:2791;2058:8;340:2791;;;2058:8;340:2791;;;;;;;;;2058:8;340:2791;;;;;2380:43;;;340:2791;;;;;;;;;;;;;;2959:20;340:2791;;-1:-1:-1;;340:2791:90;;;;;:::i;:::-;;;2058:8;340:2791;;;;;;2437:8;2433:91;;340:2791;2433:91;340:2791;2468:45;;;;2058:8;2468:45;340:2791;;;;;2058:8;2468:45;340:2791;;;;2058:8;340:2791;;;;;2058:8;340:2791;;;;2170:122;2223:58;;;2058:8;2223:58;2067:10;340:2791;;;;;;;2058:8;2223:58;2088:73;2129:21;;;2058:8;2129:21;2067:10;340:2791;;;2058:8;2129:21;340:2791;;;;;;;;;;;;;;;:::o;:::-;;;2959:20;;340:2791;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "decodeHookData(bytes)": "f73085df",
    "deposits(address)": "fc7e286d",
    "encodeHookData((uint256))": "a533219c",
    "onLock(bytes,address,address)": "1dc8160b",
    "onRelease(bytes,address,address)": "1a6a5893",
    "onReturn(bytes,address,address)": "8b9d4539"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\"}],\"name\":\"IncorrectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"requested\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"available\",\"type\":\"uint256\"}],\"name\":\"InsufficientDeposit\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"}],\"name\":\"NoDeposit\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnexpectedNativeValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeHookData\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct NativeTokenEscrowHook.HookData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"deposits\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"struct NativeTokenEscrowHook.HookData\",\"name\":\"hookData\",\"type\":\"tuple\"}],\"name\":\"encodeHookData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onLock\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onReturn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"hookData is abi.encode(HookData).      ETH is forwarded via msg.value through onLock.      Deposits are tracked per-caller.\",\"kind\":\"dev\",\"methods\":{},\"title\":\"NativeTokenEscrowHook\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"deposits(address)\":{\"notice\":\"Tracks deposits: caller (obligation) \\u2192 amount held.\"}},\"notice\":\"An IEscrowHook that escrows native ETH.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/hooks/NativeTokenEscrowHook.sol\":\"NativeTokenEscrowHook\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x9937854ef875b24d7a2b961f8188bb380bfc385796a2dece839856a515eeeca0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d12dc1ef365e83189196d3d026b71ed899d8c8758dfabb33b5d9b4305898f606\",\"dweb:/ipfs/QmW8QpxkbXY9U3VVkrKx17cci5pAnWePehEfp8Zr6Ya4rM\"]},\"src/obligations/escrow/hook-based/hooks/NativeTokenEscrowHook.sol\":{\"keccak256\":\"0x5550aeceb49fea93c994f6068cf836432f49d892b1af96636eab84bf7ec6e012\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://787d35393e22f64f55b4951eade342e507b701944d58595e7cc5a667bf16b01d\",\"dweb:/ipfs/QmPGjiywx9VUWQbvqmXTSYGJoeAvvgKeifc8WC1yKCUaCS\"]}},\"version\":1}",
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
              "internalType": "address",
              "name": "",
              "type": "address"
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
              "internalType": "address",
              "name": "",
              "type": "address"
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
      "src/obligations/escrow/hook-based/IEscrowHook.sol": {
        "keccak256": "0x9937854ef875b24d7a2b961f8188bb380bfc385796a2dece839856a515eeeca0",
        "urls": [
          "bzz-raw://d12dc1ef365e83189196d3d026b71ed899d8c8758dfabb33b5d9b4305898f606",
          "dweb:/ipfs/QmW8QpxkbXY9U3VVkrKx17cci5pAnWePehEfp8Zr6Ya4rM"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/hook-based/hooks/NativeTokenEscrowHook.sol": {
        "keccak256": "0x5550aeceb49fea93c994f6068cf836432f49d892b1af96636eab84bf7ec6e012",
        "urls": [
          "bzz-raw://787d35393e22f64f55b4951eade342e507b701944d58595e7cc5a667bf16b01d",
          "dweb:/ipfs/QmPGjiywx9VUWQbvqmXTSYGJoeAvvgKeifc8WC1yKCUaCS"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 90
} as const;
