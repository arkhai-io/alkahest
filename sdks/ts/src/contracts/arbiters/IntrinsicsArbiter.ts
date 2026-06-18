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
          "name": "",
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
      "stateMutability": "view"
    },
    {
      "type": "error",
      "name": "AttestationRevoked",
      "inputs": []
    },
    {
      "type": "error",
      "name": "DeadlineExpired",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidAttestationUid",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x6080806040523460155761029c908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c63e6c9714d14610024575f80fd5b346101bd5760603660031901126101bd5760043567ffffffffffffffff81116101bd5761014060031982360301126101bd57604051610140810181811067ffffffffffffffff8211176101c1576040528160040135815260248201356020820152610091604483016101d5565b60408201526100a2606483016101d5565b90606081019182526100b6608484016101d5565b926080820193845260a481013560a08301526100d460c482016101ea565b60c08301526100e560e482016101ea565b60e083015261010481013580151581036101bd576101008301526101248101359067ffffffffffffffff82116101bd57600461012492369201016101fe565b61012082015260243567ffffffffffffffff81116101bd5761014a9036906004016101fe565b5051156101ae575167ffffffffffffffff1680151590816101a3575b50610194575167ffffffffffffffff1661018557602060405160018152f35b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f610166565b635c2c7f8960e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b359067ffffffffffffffff821682036101bd57565b35906001600160a01b03821682036101bd57565b81601f820112156101bd5780359067ffffffffffffffff82116101c15760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101c157604052828452602083830101116101bd57815f92602080930183860137830101529056fea2646970667358221220e19903887f69da38c161fdf2292a51dcd0ede88f302ea55e7611b4b4fd98f8a164736f6c634300081b0033",
    "sourceMap": "203:371:59:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c63e6c9714d14610024575f80fd5b346101bd5760603660031901126101bd5760043567ffffffffffffffff81116101bd5761014060031982360301126101bd57604051610140810181811067ffffffffffffffff8211176101c1576040528160040135815260248201356020820152610091604483016101d5565b60408201526100a2606483016101d5565b90606081019182526100b6608484016101d5565b926080820193845260a481013560a08301526100d460c482016101ea565b60c08301526100e560e482016101ea565b60e083015261010481013580151581036101bd576101008301526101248101359067ffffffffffffffff82116101bd57600461012492369201016101fe565b61012082015260243567ffffffffffffffff81116101bd5761014a9036906004016101fe565b5051156101ae575167ffffffffffffffff1680151590816101a3575b50610194575167ffffffffffffffff1661018557602060405160018152f35b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b90504210155f610166565b635c2c7f8960e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b359067ffffffffffffffff821682036101bd57565b35906001600160a01b03821682036101bd57565b81601f820112156101bd5780359067ffffffffffffffff82116101c15760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101c157604052828452602083830101116101bd57815f92602080930183860137830101529056fea2646970667358221220e19903887f69da38c161fdf2292a51dcd0ede88f302ea55e7611b4b4fd98f8a164736f6c634300081b0033",
    "sourceMap": "203:371:59:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:371:59;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;695:28:52;691:64;;203:371:59;;;362:30:52;;;;;:78;;203:371:59;765:55:52;;;203:371:59;;;830:58:52;;203:371:59;;;;;;;830:58:52;868:20;;;203:371:59;868:20:52;203:371:59;;868:20:52;765:55;803:17;;;203:371:59;803:17:52;203:371:59;;803:17:52;362:78;425:15;;;-1:-1:-1;396:44:52;362:78;;;691:64;732:23;;;203:371:59;732:23:52;203:371:59;;732:23:52;203:371:59;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:371:59;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:371:59;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;203:371:59;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"AttestationRevoked\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"DeadlineExpired\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidAttestationUid\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/IntrinsicsArbiter.sol\":\"IntrinsicsArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/arbiters/IntrinsicsArbiter.sol\":{\"keccak256\":\"0x91d29bb659ec2388a99228433a96a77aeb068231b5c7f14453b4a8d01a872ed8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c9f5ceba0b928aa70c61b449048914b30502c2754f8f0938b06f0ec4517a14c2\",\"dweb:/ipfs/QmZ95AFmYY1XBWQgXg9JrKM5CfeuafM8QSSTqtE4s6JYr5\"]}},\"version\":1}",
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
          "name": "AttestationRevoked"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "DeadlineExpired"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidAttestationUid"
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
              "name": "",
              "type": "bytes"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "checkObligation",
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
        "src/arbiters/IntrinsicsArbiter.sol": "IntrinsicsArbiter"
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
      "src/arbiters/IntrinsicsArbiter.sol": {
        "keccak256": "0x91d29bb659ec2388a99228433a96a77aeb068231b5c7f14453b4a8d01a872ed8",
        "urls": [
          "bzz-raw://c9f5ceba0b928aa70c61b449048914b30502c2754f8f0938b06f0ec4517a14c2",
          "dweb:/ipfs/QmZ95AFmYY1XBWQgXg9JrKM5CfeuafM8QSSTqtE4s6JYr5"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 59
} as const;
