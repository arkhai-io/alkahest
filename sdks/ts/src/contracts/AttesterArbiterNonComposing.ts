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
          "internalType": "struct AttesterArbiter.DemandData",
          "components": [
            {
              "name": "attester",
              "type": "address",
              "internalType": "address"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "AttesterMismatched",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610338908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101c15763e6c9714d1461002f575f80fd5b346101a95760603660031901126101a95760043567ffffffffffffffff81116101a95761014060031982360301126101a957604051610140810181811067ffffffffffffffff8211176101ad57604052816004013581526024820135602082015261009c60448301610271565b60408201526100ad60648301610271565b60608201526100be60848301610271565b608082015260a482013560a08201526100d960c48301610286565b60c08201526100ea60e48301610286565b9160e0820192835261010481013580151581036101a95761010083015261012481013567ffffffffffffffff81116101a95761012091600461012f923692010161029a565b91015260243567ffffffffffffffff81116101a95761015290369060040161029a565b906020828051810103126101a957602061016a610251565b9201516001600160a01b038116928382036101a95752516001600160a01b03160361019a57602060405160018152f35b63c77ead7160e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101a95760203660031901126101a95760043567ffffffffffffffff81116101a957366023820112156101a957806004013567ffffffffffffffff81116101a95781013660248201116101a9576020905f61021b610251565b52829003126101a95760209061023b6024610234610251565b9201610286565b908190526040516001600160a01b039091168152f35b604051906020820182811067ffffffffffffffff8211176101ad57604052565b359067ffffffffffffffff821682036101a957565b35906001600160a01b03821682036101a957565b81601f820112156101a95780359067ffffffffffffffff82116101ad5760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101ad57604052828452602083830101116101a957815f92602080930183860137830101529056fea26469706673582212209440f59b2ca5300dfaf48a75af00b7503ae56e458b3ca8c7ecc6516552516ef064736f6c634300081b0033",
    "sourceMap": "215:687:81:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101c15763e6c9714d1461002f575f80fd5b346101a95760603660031901126101a95760043567ffffffffffffffff81116101a95761014060031982360301126101a957604051610140810181811067ffffffffffffffff8211176101ad57604052816004013581526024820135602082015261009c60448301610271565b60408201526100ad60648301610271565b60608201526100be60848301610271565b608082015260a482013560a08201526100d960c48301610286565b60c08201526100ea60e48301610286565b9160e0820192835261010481013580151581036101a95761010083015261012481013567ffffffffffffffff81116101a95761012091600461012f923692010161029a565b91015260243567ffffffffffffffff81116101a95761015290369060040161029a565b906020828051810103126101a957602061016a610251565b9201516001600160a01b038116928382036101a95752516001600160a01b03160361019a57602060405160018152f35b63c77ead7160e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101a95760203660031901126101a95760043567ffffffffffffffff81116101a957366023820112156101a957806004013567ffffffffffffffff81116101a95781013660248201116101a9576020905f61021b610251565b52829003126101a95760209061023b6024610234610251565b9201610286565b908190526040516001600160a01b039091168152f35b604051906020820182811067ffffffffffffffff8211176101ad57604052565b359067ffffffffffffffff821682036101a957565b35906001600160a01b03821682036101a957565b81601f820112156101a95780359067ffffffffffffffff82116101ad5760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101ad57604052828452602083830101116101a957815f92602080930183860137830101529056fea26469706673582212209440f59b2ca5300dfaf48a75af00b7503ae56e458b3ca8c7ecc6516552516ef064736f6c634300081b0033",
    "sourceMap": "215:687:81:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:687:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;596:32;;215:687;;;;;;;:::i;:::-;596:32;;215:687;-1:-1:-1;;;;;215:687:81;;;;;;;;;;-1:-1:-1;;;;;215:687:81;642:39;638:72;;215:687;;;;;;;638:72;690:20;;;215:687;690:20;215:687;;690:20;215:687;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:687:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;215:687:81;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;215:687:81;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;215:687:81;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;215:687:81;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"AttesterMismatched\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"}],\"internalType\":\"struct AttesterArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/attestation-properties/non-composing/AttesterArbiter.sol\":\"AttesterArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12\",\"dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038\",\"dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff\"]},\"src/arbiters/attestation-properties/non-composing/AttesterArbiter.sol\":{\"keccak256\":\"0xc2b77b13d10e17b21f4baae212184b368bd64b39c882585a27d5b168ee5f7db1\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://c241076679af5ae7b4fd6356398ddb0ef947553c5e5d075c729e42d19502c22d\",\"dweb:/ipfs/QmdxfZCt5Gv3H6mHWw9aPMJJtSGCqi4CvfN7bMgFNjmt23\"]}},\"version\":1}",
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
          "name": "AttesterMismatched"
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
              "internalType": "struct AttesterArbiter.DemandData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "attester",
                  "type": "address"
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
        "src/arbiters/attestation-properties/non-composing/AttesterArbiter.sol": "AttesterArbiter"
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
      "src/arbiters/attestation-properties/non-composing/AttesterArbiter.sol": {
        "keccak256": "0xc2b77b13d10e17b21f4baae212184b368bd64b39c882585a27d5b168ee5f7db1",
        "urls": [
          "bzz-raw://c241076679af5ae7b4fd6356398ddb0ef947553c5e5d075c729e42d19502c22d",
          "dweb:/ipfs/QmdxfZCt5Gv3H6mHWw9aPMJJtSGCqi4CvfN7bMgFNjmt23"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 81
} as const;