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
          "internalType": "struct TimeBeforeArbiter.DemandData",
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
      "name": "TimeNotBefore",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610340908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101d15763e6c9714d1461002f575f80fd5b346101b95760603660031901126101b9576004356001600160401b0381116101b95761014060031982360301126101b95760405161014081018181106001600160401b038211176101bd57604052816004013581526024820135602082015261009a6044830161027c565b91604082019283526100ae6064820161027c565b60608301526100bf6084820161027c565b608083015260a481013560a08301526100da60c48201610290565b60c08301526100eb60e48201610290565b60e083015261010481013580151581036101b9576101008301526101248101356001600160401b0381116101b95761012091600461012c92369201016102a4565b9101526024356001600160401b0381116101b95761014e9036906004016102a4565b6020818051810103126101b957602061016561025d565b9101516001600160401b038116918282036101b9575280151591826101a5575b505061019657602060405160018152f35b63abcd2e9760e01b5f5260045ffd5b516001600160401b03161190505f80610185565b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101b95760203660031901126101b9576004356001600160401b0381116101b957366023820112156101b95780600401356001600160401b0381116101b95781013660248201116101b9576020905f61022961025d565b52829003126101b957602090610249602461024261025d565b920161027c565b8091526001600160401b0360405191168152f35b60405190602082018281106001600160401b038211176101bd57604052565b35906001600160401b03821682036101b957565b35906001600160a01b03821682036101b957565b81601f820112156101b9578035906001600160401b0382116101bd5760405192601f8301601f19908116603f011684016001600160401b038111858210176101bd57604052828452602083830101116101b957815f92602080930183860137830101529056fea26469706673582212203efbad7aa66e35bd4d0154faa4814f0e567dad0f9c02909c80340a8630f1a5d764736f6c634300081b0033",
    "sourceMap": "209:804:103:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101d15763e6c9714d1461002f575f80fd5b346101b95760603660031901126101b9576004356001600160401b0381116101b95761014060031982360301126101b95760405161014081018181106001600160401b038211176101bd57604052816004013581526024820135602082015261009a6044830161027c565b91604082019283526100ae6064820161027c565b60608301526100bf6084820161027c565b608083015260a481013560a08301526100da60c48201610290565b60c08301526100eb60e48201610290565b60e083015261010481013580151581036101b9576101008301526101248101356001600160401b0381116101b95761012091600461012c92369201016102a4565b9101526024356001600160401b0381116101b95761014e9036906004016102a4565b6020818051810103126101b957602061016561025d565b9101516001600160401b038116918282036101b9575280151591826101a5575b505061019657602060405160018152f35b63abcd2e9760e01b5f5260045ffd5b516001600160401b03161190505f80610185565b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101b95760203660031901126101b9576004356001600160401b0381116101b957366023820112156101b95780600401356001600160401b0381116101b95781013660248201116101b9576020905f61022961025d565b52829003126101b957602090610249602461024261025d565b920161027c565b8091526001600160401b0360405191168152f35b60405190602082018281106001600160401b038211176101bd57604052565b35906001600160401b03821682036101b957565b35906001600160a01b03821682036101b957565b81601f820112156101b9578035906001600160401b0382116101bd5760405192601f8301601f19908116603f011684016001600160401b038111858210176101bd57604052828452602083830101116101b957815f92602080930183860137830101529056fea26469706673582212203efbad7aa66e35bd4d0154faa4814f0e567dad0f9c02909c80340a8630f1a5d764736f6c634300081b0033",
    "sourceMap": "209:804:103:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:804:103;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;:::i;:::-;;;;;616:32;;209:804;;;;;;;:::i;:::-;616:32;;209:804;-1:-1:-1;;;;;209:804:103;;;;;;;;;736:17;;;:51;;;;209:804;732:104;;;;209:804;;;;;;;732:104;810:15;;;209:804;810:15;209:804;;810:15;736:51;209:804;-1:-1:-1;;;;;209:804:103;757:30;;-1:-1:-1;736:51:103;;;;209:804;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:804:103;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:804:103;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:804:103;;;;;;:::o;:::-;;;;;;;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;-1:-1:-1;;209:804:103;;;;;;;;-1:-1:-1;;;;;209:804:103;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;209:804:103;;;;;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"TimeNotBefore\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"}],\"internalType\":\"struct TimeBeforeArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/attestation-properties/TimeBeforeArbiter.sol\":\"TimeBeforeArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x09a273ddcd48501f0afe2397b02bfbeadd88ea28d2fb1b31a3b39fa2e458fb45\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ffcd85fb3da477c7c88d4aaa19fcf0d1f075d87caecde3a42913c799ff8fa9a1\",\"dweb:/ipfs/QmUboCB32tNjn61hVnFYRrckPGnqm3UzmmEkgJmiKSUxJM\"]},\"src/arbiters/attestation-properties/TimeBeforeArbiter.sol\":{\"keccak256\":\"0xb70ffc85cfa7ce0f2436056938ea95daf36727e6aee3ae5dba16aadf3e65ed0b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b94f63b5944cad8e9b370ec1f12eeaaed629633456e7ccb9ab152d41c045681f\",\"dweb:/ipfs/QmX5kfT1Lj2dLqTere65bGC4EiNPXJgQEDGYMXY6RqWFhT\"]}},\"version\":1}",
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
          "name": "TimeNotBefore"
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
              "internalType": "struct TimeBeforeArbiter.DemandData",
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
        "src/arbiters/attestation-properties/TimeBeforeArbiter.sol": "TimeBeforeArbiter"
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
        "keccak256": "0x09a273ddcd48501f0afe2397b02bfbeadd88ea28d2fb1b31a3b39fa2e458fb45",
        "urls": [
          "bzz-raw://ffcd85fb3da477c7c88d4aaa19fcf0d1f075d87caecde3a42913c799ff8fa9a1",
          "dweb:/ipfs/QmUboCB32tNjn61hVnFYRrckPGnqm3UzmmEkgJmiKSUxJM"
        ],
        "license": "UNLICENSED"
      },
      "src/arbiters/attestation-properties/TimeBeforeArbiter.sol": {
        "keccak256": "0xb70ffc85cfa7ce0f2436056938ea95daf36727e6aee3ae5dba16aadf3e65ed0b",
        "urls": [
          "bzz-raw://b94f63b5944cad8e9b370ec1f12eeaaed629633456e7ccb9ab152d41c045681f",
          "dweb:/ipfs/QmX5kfT1Lj2dLqTere65bGC4EiNPXJgQEDGYMXY6RqWFhT"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 103
} as const;
