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
          "internalType": "struct RevocableArbiter.DemandData",
          "components": [
            {
              "name": "revocable",
              "type": "bool",
              "internalType": "bool"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "RevocabilityMismatched",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x6080806040523460155761032c908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101b15763e6c9714d1461002f575f80fd5b346101995760603660031901126101995760043567ffffffffffffffff811161019957610140600319823603011261019957604051610140810181811067ffffffffffffffff82111761019d57604052816004013581526024820135602082015261009c60448301610258565b60408201526100ad60648301610258565b60608201526100be60848301610258565b608082015260a482013560a08201526100d960c4830161026d565b60c08201526100ea60e4830161026d565b60e08201526100fc6101048301610281565b91610100820192835261012481013567ffffffffffffffff81116101995761012091600461012d923692010161028e565b91015260243567ffffffffffffffff81116101995761015090369060040161028e565b90602082805181010312610199576020610168610238565b9201518015159283820361019957525115150361018a57602060405160018152f35b6320ee3a7d60e11b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101995760203660031901126101995760043567ffffffffffffffff8111610199573660238201121561019957806004013567ffffffffffffffff8111610199578101366024820111610199576020905f61020b610238565b52829003126101995760209061022b6024610224610238565b9201610281565b8091526040519015158152f35b604051906020820182811067ffffffffffffffff82111761019d57604052565b359067ffffffffffffffff8216820361019957565b35906001600160a01b038216820361019957565b3590811515820361019957565b81601f820112156101995780359067ffffffffffffffff821161019d5760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761019d576040528284526020838301011161019957815f92602080930183860137830101529056fea2646970667358221220d029fc4e0078791b5639db92b4c7e48f0395366463d4cadea703a54acec9b7a264736f6c634300081b0033",
    "sourceMap": "209:706:69:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101b15763e6c9714d1461002f575f80fd5b346101995760603660031901126101995760043567ffffffffffffffff811161019957610140600319823603011261019957604051610140810181811067ffffffffffffffff82111761019d57604052816004013581526024820135602082015261009c60448301610258565b60408201526100ad60648301610258565b60608201526100be60848301610258565b608082015260a482013560a08201526100d960c4830161026d565b60c08201526100ea60e4830161026d565b60e08201526100fc6101048301610281565b91610100820192835261012481013567ffffffffffffffff81116101995761012091600461012d923692010161028e565b91015260243567ffffffffffffffff81116101995761015090369060040161028e565b90602082805181010312610199576020610168610238565b9201518015159283820361019957525115150361018a57602060405160018152f35b6320ee3a7d60e11b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101995760203660031901126101995760043567ffffffffffffffff8111610199573660238201121561019957806004013567ffffffffffffffff8111610199578101366024820111610199576020905f61020b610238565b52829003126101995760209061022b6024610224610238565b9201610281565b8091526040519015158152f35b604051906020820182811067ffffffffffffffff82111761019d57604052565b359067ffffffffffffffff8216820361019957565b35906001600160a01b038216820361019957565b3590811515820361019957565b81601f820112156101995780359067ffffffffffffffff821161019d5760405192601f8301601f19908116603f0116840167ffffffffffffffff81118582101761019d576040528284526020838301011161019957815f92602080930183860137830101529056fea2646970667358221220d029fc4e0078791b5639db92b4c7e48f0395366463d4cadea703a54acec9b7a264736f6c634300081b0033",
    "sourceMap": "209:706:69:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:706:69;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;591:32;;209:706;;;;;;;:::i;:::-;591:32;;209:706;;;;;;;;;;;;;;637:41;633:90;;209:706;;;;;;;633:90;699:24;;;209:706;699:24;209:706;;699:24;209:706;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:706:69;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:706:69;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:706:69;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;209:706:69;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"RevocabilityMismatched\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"}],\"internalType\":\"struct RevocableArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/attestation-properties/RevocableArbiter.sol\":\"RevocableArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/arbiters/attestation-properties/RevocableArbiter.sol\":{\"keccak256\":\"0xbff5880286d0b8d70dcb098bfe0fc65c0a306bc29a73e5191e20b9ff81c5e144\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://793fedf6e37c588d01efa27b69729e2c8652a038a90f95a8a3b556a65dd51c02\",\"dweb:/ipfs/Qme5eaJ7QvJoKe8hhsyd1WJePK9XU9MHnYqwu7m2kMv2sb\"]}},\"version\":1}",
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
          "name": "RevocabilityMismatched"
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
              "internalType": "struct RevocableArbiter.DemandData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
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
        "src/arbiters/attestation-properties/RevocableArbiter.sol": "RevocableArbiter"
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
        "keccak256": "0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f",
        "urls": [
          "bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2",
          "dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629",
        "urls": [
          "bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9",
          "dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"
        ],
        "license": "UNLICENSED"
      },
      "src/arbiters/attestation-properties/RevocableArbiter.sol": {
        "keccak256": "0xbff5880286d0b8d70dcb098bfe0fc65c0a306bc29a73e5191e20b9ff81c5e144",
        "urls": [
          "bzz-raw://793fedf6e37c588d01efa27b69729e2c8652a038a90f95a8a3b556a65dd51c02",
          "dweb:/ipfs/Qme5eaJ7QvJoKe8hhsyd1WJePK9XU9MHnYqwu7m2kMv2sb"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 69
} as const;
