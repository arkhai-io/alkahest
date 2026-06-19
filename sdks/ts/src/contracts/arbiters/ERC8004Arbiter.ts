export const abi = {
  "abi": [
    {
      "type": "function",
      "name": "check",
      "inputs": [
        {
          "name": "fulfillment",
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
          "name": "escrowUid",
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
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "requestHashFor",
      "inputs": [
        {
          "name": "uid",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
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
    "object": "0x608080604052346015576106df908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063728797ee146104ea578063838a68d91461039057638da3721a1461003a575f80fd5b34610344576060366003190112610344576004356001600160401b038111610344576101406003198236030112610344576040519061014082018281106001600160401b0382111761037c5760405280600401358252602481013560208301526100a6604482016105f0565b60408301526100b7606482016105f0565b60608301526100c8608482016105f0565b608083015260a082019060a481013582526100e560c48201610604565b60c08401526100f660e48201610604565b60e0840152610104810135801515810361034457610100840152610124810135906001600160401b0382116103445760046101349236920101610586565b6101208301526024356001600160401b03811161034457610159903690600401610586565b80518101916020830191602081850312610344576020810151906001600160401b03821161034457019260809084900312610344576040519361019b8561052f565b6101a760208501610651565b85526101b560408501610651565b92602086019384526101c960608601610665565b946040870195865260808101516001600160401b0381116103445760209101019080601f8301121561034457815161020392602001610673565b916060860192835260443590510361036d5760ff8451168015908115610362575b50610353575f916102389151905190610618565b935160405160016234050160e21b031981526004810195909552849060249082906001600160a01b03165afa928315610348575f905f946102d9575b506001600160a01b03169081156102ca57516001600160a01b0316036102bb5760ff809151169116106102ac57602060405160018152f35b632be54c6b60e21b5f5260045ffd5b63d5fd645b60e01b5f5260045ffd5b637f7667e360e11b5f5260045ffd5b9350503d805f853e6102eb818561054a565b830160c0848203126103445761030084610651565b9061030d60408601610665565b946080810151906001600160401b03821161034457019080601f8301121561034457815161033d92602001610673565b505f610274565b5f80fd5b6040513d5f823e3d90fd5b6346162fc560e01b5f5260045ffd5b60649150115f610224565b638874563160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b34610344576020366003190112610344576004356001600160401b03811161034457366023820112156103445780600401356001600160401b038111610344578101906024820190368211610344576060806040516103ee8161052f565b5f81525f60208201525f6040820152015260206023196024838603010112610344576024810135906001600160401b03821161034457019160809083900312610344576040519061043e8261052f565b61044a60248401610604565b825261045860448401610604565b926020830193845260648101359060ff82168203610344576040840191825260848101356001600160401b038111610344576104e693602461049e9260ff940101610586565b91606085019283526040519586956020875260018060a01b03905116602087015260018060a01b039051166040860152511660608401525160808084015260a08301906105cc565b0390f35b34610344576040366003190112610344576024356001600160401b0381116103445761052761051f6020923690600401610586565b600435610618565b604051908152f35b608081019081106001600160401b0382111761037c57604052565b90601f801991011681019081106001600160401b0382111761037c57604052565b6001600160401b03811161037c57601f01601f191660200190565b81601f820112156103445780359061059d8261056b565b926105ab604051948561054a565b8284526020838301011161034457815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b35906001600160401b038216820361034457565b35906001600160a01b038216820361034457565b9061064b61063d916040519283916020830195865260408084015260608301906105cc565b03601f19810183528261054a565b51902090565b51906001600160a01b038216820361034457565b519060ff8216820361034457565b92919261067f8261056b565b9161068d604051938461054a565b829481845281830111610344578281602093845f96015e01015256fea2646970667358221220235c91662fa94fc0d76c6f6b94091c26fc494ae256495b00f26318773f9ad5cb64736f6c634300081b0033",
    "sourceMap": "837:2770:88:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c8063728797ee146104ea578063838a68d91461039057638da3721a1461003a575f80fd5b34610344576060366003190112610344576004356001600160401b038111610344576101406003198236030112610344576040519061014082018281106001600160401b0382111761037c5760405280600401358252602481013560208301526100a6604482016105f0565b60408301526100b7606482016105f0565b60608301526100c8608482016105f0565b608083015260a082019060a481013582526100e560c48201610604565b60c08401526100f660e48201610604565b60e0840152610104810135801515810361034457610100840152610124810135906001600160401b0382116103445760046101349236920101610586565b6101208301526024356001600160401b03811161034457610159903690600401610586565b80518101916020830191602081850312610344576020810151906001600160401b03821161034457019260809084900312610344576040519361019b8561052f565b6101a760208501610651565b85526101b560408501610651565b92602086019384526101c960608601610665565b946040870195865260808101516001600160401b0381116103445760209101019080601f8301121561034457815161020392602001610673565b916060860192835260443590510361036d5760ff8451168015908115610362575b50610353575f916102389151905190610618565b935160405160016234050160e21b031981526004810195909552849060249082906001600160a01b03165afa928315610348575f905f946102d9575b506001600160a01b03169081156102ca57516001600160a01b0316036102bb5760ff809151169116106102ac57602060405160018152f35b632be54c6b60e21b5f5260045ffd5b63d5fd645b60e01b5f5260045ffd5b637f7667e360e11b5f5260045ffd5b9350503d805f853e6102eb818561054a565b830160c0848203126103445761030084610651565b9061030d60408601610665565b946080810151906001600160401b03821161034457019080601f8301121561034457815161033d92602001610673565b505f610274565b5f80fd5b6040513d5f823e3d90fd5b6346162fc560e01b5f5260045ffd5b60649150115f610224565b638874563160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b34610344576020366003190112610344576004356001600160401b03811161034457366023820112156103445780600401356001600160401b038111610344578101906024820190368211610344576060806040516103ee8161052f565b5f81525f60208201525f6040820152015260206023196024838603010112610344576024810135906001600160401b03821161034457019160809083900312610344576040519061043e8261052f565b61044a60248401610604565b825261045860448401610604565b926020830193845260648101359060ff82168203610344576040840191825260848101356001600160401b038111610344576104e693602461049e9260ff940101610586565b91606085019283526040519586956020875260018060a01b03905116602087015260018060a01b039051166040860152511660608401525160808084015260a08301906105cc565b0390f35b34610344576040366003190112610344576024356001600160401b0381116103445761052761051f6020923690600401610586565b600435610618565b604051908152f35b608081019081106001600160401b0382111761037c57604052565b90601f801991011681019081106001600160401b0382111761037c57604052565b6001600160401b03811161037c57601f01601f191660200190565b81601f820112156103445780359061059d8261056b565b926105ab604051948561054a565b8284526020838301011161034457815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b35906001600160401b038216820361034457565b35906001600160a01b038216820361034457565b9061064b61063d916040519283916020830195865260408084015260608301906105cc565b03601f19810183528261054a565b51902090565b51906001600160a01b038216820361034457565b519060ff8216820361034457565b92919261067f8261056b565b9161068d604051938461054a565b829481845281830111610344578281602093845f96015e01015256fea2646970667358221220235c91662fa94fc0d76c6f6b94091c26fc494ae256495b00f26318773f9ad5cb64736f6c634300081b0033",
    "sourceMap": "837:2770:88:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;837:2770:88;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;:::i;:::-;;;1835:32;;;837:2770;1835:32;;837:2770;;;;;;;;;1835:32;;837:2770;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;1943:31;1939:101;;837:2770;;;;2162:24;;:53;;;;;837:2770;2158:86;;;837:2770;;2277:45;837:2770;;2309:12;;2277:45;;:::i;:::-;837:2770;;;;-1:-1:-1;;;;;;2653:41:88;;837:2770;2653:41;;837:2770;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;2653:41;;;;;;;837:2770;;;2653:41;;;837:2770;-1:-1:-1;;;;;;837:2770:88;;2780:30;;2776:63;;837:2770;-1:-1:-1;;;;;837:2770:88;2911:44;2907:101;;837:2770;;;;;;;3077:30;3073:65;;837:2770;;;;;;;3073:65;3116:22;;;837:2770;3116:22;837:2770;;3116:22;2907:101;2978:19;;;837:2770;2978:19;837:2770;;2978:19;2776:63;2819:20;;;837:2770;2819:20;837:2770;;2819:20;2653:41;;;;;;837:2770;2653:41;;;;;;:::i;:::-;;;837:2770;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;2653:41;;;837:2770;;;;2653:41;837:2770;;;;;;;;;2158:86;2224:20;;;837:2770;2224:20;837:2770;;2224:20;2162:53;837:2770;2190:25;;;2162:53;;;1939:101;1997:32;;;837:2770;1997:32;837:2770;;1997:32;837:2770;;;;;;;;;;;;;;;;;;-1:-1:-1;;837:2770:88;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;837:2770:88;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;837:2770:88;;;;;;;:::o;:::-;-1:-1:-1;;;;;837:2770:88;;;;;;-1:-1:-1;;837:2770:88;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;837:2770:88;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;837:2770:88;;;;;;;;-1:-1:-1;;837:2770:88;;;;:::o;:::-;;;-1:-1:-1;;;;;837:2770:88;;;;;;:::o;:::-;;;-1:-1:-1;;;;;837:2770:88;;;;;;:::o;3463:142::-;;3576:21;837:2770;3463:142;837:2770;;3576:21;;;;;;837:2770;;;;;;;;;;;;;:::i;:::-;3576:21;837:2770;;3576:21;;;;;;:::i;:::-;837:2770;3566:32;;3463:142;:::o;837:2770::-;;;-1:-1:-1;;;;;837:2770:88;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;837:2770:88;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "8da3721a",
    "decodeDemandData(bytes)": "838a68d9",
    "requestHashFor(bytes32,bytes)": "728797ee"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"FulfillmentMustReferenceEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidMinResponse\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ResponseBelowMinimum\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ValidationNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ValidatorMismatch\",\"type\":\"error\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"fulfillment\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"}],\"name\":\"check\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"validationRegistry\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"validatorAddress\",\"type\":\"address\"},{\"internalType\":\"uint8\",\"name\":\"minResponse\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct ERC8004Arbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"requestHashFor\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"The DemandData specifies a minimum response uint8 (1-100)      The validation requestHash is derived from the fulfillment attestation      UID and caller-supplied binding data.\",\"kind\":\"dev\",\"methods\":{\"check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"params\":{\"demand\":\"ABI-encoded DemandData containing registry address and min response\",\"escrowUid\":\"The escrow UID that this fulfillment must reference\",\"fulfillment\":\"The attestation representing the obligation\"},\"returns\":{\"_0\":\"bool True if the validation response >= minResponse\"}},\"decodeDemandData(bytes)\":{\"params\":{\"data\":\"ABI-encoded DemandData\"},\"returns\":{\"_0\":\"DemandData struct\"}}},\"title\":\"ValidationRegistryArbiter\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)\":{\"notice\":\"Check if the validation response meets the minimum requirement\"},\"decodeDemandData(bytes)\":{\"notice\":\"Helper function to decode DemandData\"}},\"notice\":\"Arbiter that wraps ERC-8004's ValidationRegistry\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/ERC8004Arbiter.sol\":\"ERC8004Arbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x60c3517336022ba2e637a7614c05c264c4a896a13eee19f28abd705d53cbfae5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d54682c0f79f53ea184a0b03ae8986ae53453194005d6db2508c4e7941c5757b\",\"dweb:/ipfs/QmaRFve7sohhfW1ZQBHEJEeBGC5C4N9BLGGEETpMpoUxBx\"]},\"src/arbiters/ERC8004Arbiter.sol\":{\"keccak256\":\"0xced50ea4403bc817341f323593351ba5ac27495c4f093754116e006489045b06\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://9b289281fd1aae15f331f2f2f663c35f57e6298122059356505e8d4e20c8c083\",\"dweb:/ipfs/Qmev77gar8x6XFmQT1QqpaHd81JbqJ67hEXPKdXX8inVaH\"]}},\"version\":1}",
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
              "name": "fulfillment",
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
              "name": "escrowUid",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "check",
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
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ]
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "uid",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "requestHashFor",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ]
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
            "params": {
              "demand": "ABI-encoded DemandData containing registry address and min response",
              "escrowUid": "The escrow UID that this fulfillment must reference",
              "fulfillment": "The attestation representing the obligation"
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
          "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
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
        "keccak256": "0x60c3517336022ba2e637a7614c05c264c4a896a13eee19f28abd705d53cbfae5",
        "urls": [
          "bzz-raw://d54682c0f79f53ea184a0b03ae8986ae53453194005d6db2508c4e7941c5757b",
          "dweb:/ipfs/QmaRFve7sohhfW1ZQBHEJEeBGC5C4N9BLGGEETpMpoUxBx"
        ],
        "license": "UNLICENSED"
      },
      "src/arbiters/ERC8004Arbiter.sol": {
        "keccak256": "0xced50ea4403bc817341f323593351ba5ac27495c4f093754116e006489045b06",
        "urls": [
          "bzz-raw://9b289281fd1aae15f331f2f2f663c35f57e6298122059356505e8d4e20c8c083",
          "dweb:/ipfs/Qmev77gar8x6XFmQT1QqpaHd81JbqJ67hEXPKdXX8inVaH"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 88
} as const;
