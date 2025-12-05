export const abi = {
  "abi": [
    {
      "type": "function",
      "name": "checkObligation",
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
          "name": "demand",
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
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "decodeDemandData",
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
          "internalType": "struct TimeEqualArbiter.DemandData",
          "components": [
            {
              "name": "time",
              "type": "uint64",
              "internalType": "uint64"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "TimeNotEqual",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x6080806040523460155761032d908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101be5763e6c9714d1461002f575f80fd5b346101a65760603660031901126101a6576004356001600160401b0381116101a65761014060031982360301126101a65760405161014081018181106001600160401b038211176101aa57604052816004013581526024820135602082015261009a60448301610269565b91604082019283526100ae60648201610269565b60608301526100bf60848201610269565b608083015260a481013560a08301526100da60c4820161027d565b60c08301526100eb60e4820161027d565b60e083015261010481013580151581036101a6576101008301526101248101356001600160401b0381116101a65761012091600461012c9236920101610291565b9101526024356001600160401b0381116101a65761014e903690600401610291565b6020818051810103126101a657602061016561024a565b910151916001600160401b038316928381036101a6576001600160401b03925251160361019757602060405160018152f35b6308b5d45360e11b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101a65760203660031901126101a6576004356001600160401b0381116101a657366023820112156101a65780600401356001600160401b0381116101a65781013660248201116101a6576020905f61021661024a565b52829003126101a657602090610236602461022f61024a565b9201610269565b8091526001600160401b0360405191168152f35b60405190602082018281106001600160401b038211176101aa57604052565b35906001600160401b03821682036101a657565b35906001600160a01b03821682036101a657565b81601f820112156101a6578035906001600160401b0382116101aa5760405192601f8301601f19908116603f011684016001600160401b038111858210176101aa57604052828452602083830101116101a657815f92602080930183860137830101529056fea2646970667358221220ef55b383521a4d28220d134fcefce5bf424e45132d1ce1e8c57459bdca6055da64736f6c634300081b0033",
    "sourceMap": "215:663:91:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101be5763e6c9714d1461002f575f80fd5b346101a65760603660031901126101a6576004356001600160401b0381116101a65761014060031982360301126101a65760405161014081018181106001600160401b038211176101aa57604052816004013581526024820135602082015261009a60448301610269565b91604082019283526100ae60648201610269565b60608301526100bf60848201610269565b608083015260a481013560a08301526100da60c4820161027d565b60c08301526100eb60e4820161027d565b60e083015261010481013580151581036101a6576101008301526101248101356001600160401b0381116101a65761012091600461012c9236920101610291565b9101526024356001600160401b0381116101a65761014e903690600401610291565b6020818051810103126101a657602061016561024a565b910151916001600160401b038316928381036101a6576001600160401b03925251160361019757602060405160018152f35b6308b5d45360e11b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101a65760203660031901126101a6576004356001600160401b0381116101a657366023820112156101a65780600401356001600160401b0381116101a65781013660248201116101a6576020905f61021661024a565b52829003126101a657602090610236602461022f61024a565b9201610269565b8091526001600160401b0360405191168152f35b60405190602082018281106001600160401b038211176101aa57604052565b35906001600160401b03821682036101a657565b35906001600160a01b03821682036101a657565b81601f820112156101a6578035906001600160401b0382116101aa5760405192601f8301601f19908116603f011684016001600160401b038111858210176101aa57604052828452602083830101116101a657815f92602080930183860137830101529056fea2646970667358221220ef55b383521a4d28220d134fcefce5bf424e45132d1ce1e8c57459bdca6055da64736f6c634300081b0033",
    "sourceMap": "215:663:91:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:663:91;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;:::i;:::-;;;;;586:32;;215:663;;;;;;;:::i;:::-;586:32;;215:663;;-1:-1:-1;;;;;215:663:91;;;;;;;;-1:-1:-1;;;;;215:663:91;;;;632:31;628:58;;215:663;;;;;;;628:58;672:14;;;215:663;672:14;215:663;;672:14;215:663;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:663:91;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:663:91;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:663:91;;;;;;:::o;:::-;;;;;;;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;-1:-1:-1;;215:663:91;;;;;;;;-1:-1:-1;;;;;215:663:91;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;215:663:91;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"TimeNotEqual\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"}],\"internalType\":\"struct TimeEqualArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/attestation-properties/non-composing/TimeEqualArbiter.sol\":\"TimeEqualArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12\",\"dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038\",\"dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff\"]},\"src/arbiters/attestation-properties/non-composing/TimeEqualArbiter.sol\":{\"keccak256\":\"0xa458d736ded63de6d3d7984998d0e1788b19856f32fd6dff4807251d5ddeed21\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://9e870601de20f0a24c48b82ec0570610492110c9c4dee1a072ee62d9b70db1c8\",\"dweb:/ipfs/Qmc4xaFK3YyrRqdauKLJfNnEAq43kUMGiPdPpMmQ2pUKHL\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.27+commit.40a35a09"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [],
          "type": "error",
          "name": "TimeNotEqual"
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
              "name": "demand",
              "type": "bytes"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "checkObligation",
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
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "decodeDemandData",
          "outputs": [
            {
              "internalType": "struct TimeEqualArbiter.DemandData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "uint64",
                  "name": "time",
                  "type": "uint64"
                }
              ]
            }
          ]
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {},
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {},
        "version": 1
      }
    },
    "settings": {
      "remappings": [
        "@eas/=lib/eas-contracts/contracts/",
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
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
        "src/arbiters/attestation-properties/non-composing/TimeEqualArbiter.sol": "TimeEqualArbiter"
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
      "src/ArbiterUtils.sol": {
        "keccak256": "0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab",
        "urls": [
          "bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12",
          "dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab",
        "urls": [
          "bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038",
          "dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff"
        ],
        "license": "UNLICENSED"
      },
      "src/arbiters/attestation-properties/non-composing/TimeEqualArbiter.sol": {
        "keccak256": "0xa458d736ded63de6d3d7984998d0e1788b19856f32fd6dff4807251d5ddeed21",
        "urls": [
          "bzz-raw://9e870601de20f0a24c48b82ec0570610492110c9c4dee1a072ee62d9b70db1c8",
          "dweb:/ipfs/Qmc4xaFK3YyrRqdauKLJfNnEAq43kUMGiPdPpMmQ2pUKHL"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 91
} as const;