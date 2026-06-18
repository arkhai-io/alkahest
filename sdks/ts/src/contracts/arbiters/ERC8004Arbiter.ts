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
          "name": "fulfilling",
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
          "internalType": "struct ERC8004Arbiter.DemandData",
          "components": [
            {
              "name": "validationRegistry",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "validatorAddress",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "minResponse",
              "type": "uint8",
              "internalType": "uint8"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "FulfillmentMustReferenceEscrow",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidMinResponse",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ResponseBelowMinimum",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ValidationNotFound",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ValidatorMismatch",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60808060405234601557610531908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d914610331575063e6c9714d14610032575f80fd5b346102f05760603660031901126102f05760043567ffffffffffffffff81116102f05761014060031982360301126102f05760405190610140820182811067ffffffffffffffff82111761031d5760405280600401358252602481013560208301526100a06044820161044e565b60408301526100b16064820161044e565b60608301526100c26084820161044e565b608083015260a082019060a481013582526100df60c48201610463565b60c08401526100f060e48201610463565b60e084015261010481013580151581036102f0576101008401526101248101359067ffffffffffffffff82116102f057600461012f9236920101610493565b61012083015260243567ffffffffffffffff81116102f057610155903690600401610493565b6060818051810103126102f0576040519261016f84610410565b61017b602083016104d9565b845261019c606061018e604085016104d9565b9360208701948552016104ed565b926040850193845260443590510361030e57606460ff845116116102ff5751925160405160016234050160e21b0319815260048101949094525f90849060249082906001600160a01b03165afa9283156102f4575f905f9461025e575b506001600160a01b031690811561024f57516001600160a01b0316036102405760ff8091511691161061023157602060405160018152f35b632be54c6b60e21b5f5260045ffd5b63d5fd645b60e01b5f5260045ffd5b637f7667e360e11b5f5260045ffd5b9350503d805f853e610270818561042c565b830160c0848203126102f057610285846104d9565b90610292604086016104ed565b9460808101519067ffffffffffffffff82116102f0570181601f820112156102f05780516102bf81610477565b926102cd604051948561042c565b818452602082840101116102f0575f928160208094018483015e0101525f6101f9565b5f80fd5b6040513d5f823e3d90fd5b6346162fc560e01b5f5260045ffd5b638874563160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b346102f05760203660031901126102f0576004359067ffffffffffffffff82116102f057366023830112156102f057816004013567ffffffffffffffff81116102f05782013660248201116102f0575f60408361038f606095610410565b828152602081018390520152829003126102f0576040516103af81610410565b6103bb60248301610463565b9081815260646103cd60448501610463565b9360208301948552013560ff811681036102f057604091820190815281516001600160a01b03938416815293519092166020840152905160ff1690820152606090f35b6060810190811067ffffffffffffffff82111761031d57604052565b90601f8019910116810190811067ffffffffffffffff82111761031d57604052565b359067ffffffffffffffff821682036102f057565b35906001600160a01b03821682036102f057565b67ffffffffffffffff811161031d57601f01601f191660200190565b81601f820112156102f0578035906104aa82610477565b926104b8604051948561042c565b828452602083830101116102f057815f926020809301838601378301015290565b51906001600160a01b03821682036102f057565b519060ff821682036102f05756fea264697066735822122056dcd0601cd1b3a462954d3b5ca449789310e9ba89e668959dff96df628be1d964736f6c634300081b0033",
    "sourceMap": "842:2547:88:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d914610331575063e6c9714d14610032575f80fd5b346102f05760603660031901126102f05760043567ffffffffffffffff81116102f05761014060031982360301126102f05760405190610140820182811067ffffffffffffffff82111761031d5760405280600401358252602481013560208301526100a06044820161044e565b60408301526100b16064820161044e565b60608301526100c26084820161044e565b608083015260a082019060a481013582526100df60c48201610463565b60c08401526100f060e48201610463565b60e084015261010481013580151581036102f0576101008401526101248101359067ffffffffffffffff82116102f057600461012f9236920101610493565b61012083015260243567ffffffffffffffff81116102f057610155903690600401610493565b6060818051810103126102f0576040519261016f84610410565b61017b602083016104d9565b845261019c606061018e604085016104d9565b9360208701948552016104ed565b926040850193845260443590510361030e57606460ff845116116102ff5751925160405160016234050160e21b0319815260048101949094525f90849060249082906001600160a01b03165afa9283156102f4575f905f9461025e575b506001600160a01b031690811561024f57516001600160a01b0316036102405760ff8091511691161061023157602060405160018152f35b632be54c6b60e21b5f5260045ffd5b63d5fd645b60e01b5f5260045ffd5b637f7667e360e11b5f5260045ffd5b9350503d805f853e610270818561042c565b830160c0848203126102f057610285846104d9565b90610292604086016104ed565b9460808101519067ffffffffffffffff82116102f0570181601f820112156102f05780516102bf81610477565b926102cd604051948561042c565b818452602082840101116102f0575f928160208094018483015e0101525f6101f9565b5f80fd5b6040513d5f823e3d90fd5b6346162fc560e01b5f5260045ffd5b638874563160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b346102f05760203660031901126102f0576004359067ffffffffffffffff82116102f057366023830112156102f057816004013567ffffffffffffffff81116102f05782013660248201116102f0575f60408361038f606095610410565b828152602081018390520152829003126102f0576040516103af81610410565b6103bb60248301610463565b9081815260646103cd60448501610463565b9360208301948552013560ff811681036102f057604091820190815281516001600160a01b03938416815293519092166020840152905160ff1690820152606090f35b6060810190811067ffffffffffffffff82111761031d57604052565b90601f8019910116810190811067ffffffffffffffff82111761031d57604052565b359067ffffffffffffffff821682036102f057565b35906001600160a01b03821682036102f057565b67ffffffffffffffff811161031d57601f01601f191660200190565b81601f820112156102f0578035906104aa82610477565b926104b8604051948561042c565b828452602083830101116102f057815f926020809301838601378301015290565b51906001600160a01b03821682036102f057565b519060ff821682036102f05756fea264697066735822122056dcd0601cd1b3a462954d3b5ca449789310e9ba89e668959dff96df628be1d964736f6c634300081b0033",
    "sourceMap": "842:2547:88:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;842:2547:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1829:32;;842:2547;;;;;;;;;;:::i;:::-;;;1829:32;;842:2547;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;1937:31;1933:101;;842:2547;;;;;2098:25;2094:58;;842:2547;;;;;-1:-1:-1;;;;;;2583:41:88;;842:2547;2583:41;;842:2547;;;;;;;;;;;;-1:-1:-1;;;;;842:2547:88;2583:41;;;;;;;842:2547;;;2583:41;;;842:2547;-1:-1:-1;;;;;;842:2547:88;;2710:30;;2706:63;;842:2547;-1:-1:-1;;;;;842:2547:88;2841:44;2837:101;;842:2547;;;;;;;3007:30;3003:65;;842:2547;;;;;;;3003:65;3046:22;;;842:2547;3046:22;842:2547;;3046:22;2837:101;2908:19;;;842:2547;2908:19;842:2547;;2908:19;2706:63;2749:20;;;842:2547;2749:20;842:2547;;2749:20;2583:41;;;;;;842:2547;2583:41;;;;;;:::i;:::-;;;842:2547;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;2583:41;;;842:2547;;;;2583:41;842:2547;;;;;;;;;2094:58;2132:20;;;842:2547;2132:20;842:2547;;2132:20;1933:101;1991:32;;;842:2547;1991:32;842:2547;;1991:32;842:2547;;;;;;;;;;;;;;;;;;-1:-1:-1;;842:2547:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;842:2547:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;842:2547:88;;;;;;:::o;:::-;;;;;;;;-1:-1:-1;;842:2547:88;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;842:2547:88;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;842:2547:88;;;;;;:::o;:::-;;;;;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"FulfillmentMustReferenceEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidMinResponse\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ResponseBelowMinimum\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ValidationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ValidatorMismatch\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"fulfilling\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"validationRegistry\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"validatorAddress\",\"type\":\"address\"},{\"internalType\":\"uint8\",\"name\":\"minResponse\",\"type\":\"uint8\"}],\"internalType\":\"struct ERC8004Arbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"The DemandData specifies a minimum response uint8 (0-100)      The fulfillment attestation's UID is used as the requestHash      in the ValidationRegistry's getValidationStatus call\",\"kind\":\"dev\",\"methods\":{\"checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"params\":{\"demand\":\"ABI-encoded DemandData containing registry address and min response\",\"fulfilling\":\"The escrow UID that this obligation must reference\",\"obligation\":\"The attestation representing the obligation\"},\"returns\":{\"_0\":\"bool True if the validation response >= minResponse\"}},\"decodeDemandData(bytes)\":{\"params\":{\"data\":\"ABI-encoded DemandData\"},\"returns\":{\"_0\":\"DemandData struct\"}}},\"title\":\"ValidationRegistryArbiter\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"notice\":\"Check if the validation response meets the minimum requirement\"},\"decodeDemandData(bytes)\":{\"notice\":\"Helper function to decode DemandData\"}},\"notice\":\"Arbiter that wraps ERC-8004's ValidationRegistry\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/ERC8004Arbiter.sol\":\"ERC8004Arbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x09a273ddcd48501f0afe2397b02bfbeadd88ea28d2fb1b31a3b39fa2e458fb45\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://ffcd85fb3da477c7c88d4aaa19fcf0d1f075d87caecde3a42913c799ff8fa9a1\",\"dweb:/ipfs/QmUboCB32tNjn61hVnFYRrckPGnqm3UzmmEkgJmiKSUxJM\"]},\"src/arbiters/ERC8004Arbiter.sol\":{\"keccak256\":\"0x67f8f917f7fb145958524e831c97d8a29b854a14ea1c7247db40e9dc26be6881\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://526af8ed8b7e6b1f68d6e458b3749fdcf77a450280613e60bbe24834ae1d4f08\",\"dweb:/ipfs/QmSzkbBh39orjVRk1Zqm5asVmtrsYXrSwJMJctpPvgQxsF\"]}},\"version\":1}",
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
          "name": "FulfillmentMustReferenceEscrow"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidMinResponse"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "ResponseBelowMinimum"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "ValidationNotFound"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "ValidatorMismatch"
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
              "name": "fulfilling",
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
              "internalType": "struct ERC8004Arbiter.DemandData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "validationRegistry",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "validatorAddress",
                  "type": "address"
                },
                {
                  "internalType": "uint8",
                  "name": "minResponse",
                  "type": "uint8"
                }
              ]
            }
          ]
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
            "params": {
              "demand": "ABI-encoded DemandData containing registry address and min response",
              "fulfilling": "The escrow UID that this obligation must reference",
              "obligation": "The attestation representing the obligation"
            },
            "returns": {
              "_0": "bool True if the validation response >= minResponse"
            }
          },
          "decodeDemandData(bytes)": {
            "params": {
              "data": "ABI-encoded DemandData"
            },
            "returns": {
              "_0": "DemandData struct"
            }
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
            "notice": "Check if the validation response meets the minimum requirement"
          },
          "decodeDemandData(bytes)": {
            "notice": "Helper function to decode DemandData"
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
        "src/arbiters/ERC8004Arbiter.sol": "ERC8004Arbiter"
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
      "src/arbiters/ERC8004Arbiter.sol": {
        "keccak256": "0x67f8f917f7fb145958524e831c97d8a29b854a14ea1c7247db40e9dc26be6881",
        "urls": [
          "bzz-raw://526af8ed8b7e6b1f68d6e458b3749fdcf77a450280613e60bbe24834ae1d4f08",
          "dweb:/ipfs/QmSzkbBh39orjVRk1Zqm5asVmtrsYXrSwJMJctpPvgQxsF"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 88
} as const;
