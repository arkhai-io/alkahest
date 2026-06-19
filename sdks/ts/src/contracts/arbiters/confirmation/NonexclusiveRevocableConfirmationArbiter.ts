export const abi = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_eas",
          "type": "address",
          "internalType": "contract IEAS"
        }
      ],
      "stateMutability": "nonpayable"
    },
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
          "name": "",
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
      "name": "confirm",
      "inputs": [
        {
          "name": "_fulfillment",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "_escrow",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "confirmations",
      "inputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
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
      "type": "function",
      "name": "eas",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract IEAS"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "requestConfirmation",
      "inputs": [
        {
          "name": "_fulfillment",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "_escrow",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revoke",
      "inputs": [
        {
          "name": "_fulfillment",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "_escrow",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "ConfirmationMade",
      "inputs": [
        {
          "name": "fulfillment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "escrow",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ConfirmationRequested",
      "inputs": [
        {
          "name": "fulfillment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "confirmer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "escrow",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ConfirmationRevoked",
      "inputs": [
        {
          "name": "fulfillment",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "escrow",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "InvalidFulfillment",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NoConfirmationToRevoke",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UnauthorizedConfirmation",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UnauthorizedConfirmationRequest",
      "inputs": []
    },
    {
      "type": "error",
      "name": "UnauthorizedRevocation",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60a03461007e57601f6108d438819003918201601f19168301916001600160401b038311848410176100825780849260209460405283398101031261007e57516001600160a01b038116810361007e5760805260405161083d90816100978239608051818181608a015281816103050152818161035b01526104b70152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c90816352155df7146104955750806357f784ba146103345780638150864d146102f0578063887d686d146102bd5780638da3721a146101865763c26646101461005e575f80fd5b346101825761006c366105cf565b6040516328c44a9960e21b8152600481018290529091905f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610177575f91610155575b5060c001516001600160a01b0316330361014657805f525f60205260405f20825f5260205260ff60405f2054161561013757805f525f60205260405f20825f5260205260405f2060ff1981541690557f137a0dfcce695307235e039aa2ae70da634ed7f10a6a5a536b3a8c15d758aa1e5f80a3005b6339abb17d60e01b5f5260045ffd5b630feaf7d560e31b5f5260045ffd5b61017191503d805f833e6101698183610616565b8101906106ec565b5f6100c2565b6040513d5f823e3d90fd5b5f80fd5b346101825760603660031901126101825760043567ffffffffffffffff811161018257610140600319823603011261018257604051906101c5826105e5565b80600401358252602481013560208301526101e260448201610638565b60408301526101f360648201610638565b606083015261020460848201610638565b608083015260a481013560a083015261021f60c4820161064d565b60c083015261023060e4820161064d565b60e08301526101048101358015158103610182576101008301526101248101359067ffffffffffffffff821161018257600461026f923692010161067d565b61012082015260243567ffffffffffffffff81116101825761029590369060040161067d565b50515f525f60205260405f206044355f52602052602060ff60405f2054166040519015158152f35b34610182576102cb366105cf565b905f525f60205260405f20905f52602052602060ff60405f2054166040519015158152f35b34610182575f366003190112610182576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b3461018257610342366105cf565b6040516328c44a9960e21b8152600481018290529091907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165f82602481845afa908115610177576024925f92610477575b505f90604051938480926328c44a9960e21b82528760048301525afa918215610177575f9261045b575b5060c001516001600160a01b0316330361044c5751818115918215610441575b505061043257805f525f60205260405f20825f5260205260405f20600160ff198254161790557fd22fd165f2b163f7b94d6e2b15443105c17bfae3fa2242150644ab76a95d532e5f80a3005b630ebe58ef60e11b5f5260045ffd5b1415905081846103e6565b6331eb5cd360e11b5f5260045ffd5b6104709192503d805f833e6101698183610616565b90846103c6565b5f91925061048e903d8084833e6101698183610616565b919061039c565b34610182576104a3366105cf565b6328c44a9960e21b835260048301829052917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa908115610177575f916105b5575b5060e08101516001600160a01b0316331415908161059d575b5061058e575f602491604051928380926328c44a9960e21b82528760048301525afa908115610177575f91610574575b5060c001516001600160a01b0316907f93ece828de650a0159786850192cbcd721ab720e1ee81b00365a5c8d63886b315f80a4005b61058891503d805f833e6101698183610616565b8361053f565b63020a627d60e11b5f5260045ffd5b60c001516001600160a01b031633141590508461050f565b6105c991503d805f833e6101698183610616565b846104f6565b6040906003190112610182576004359060243590565b610140810190811067ffffffffffffffff82111761060257604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761060257604052565b359067ffffffffffffffff8216820361018257565b35906001600160a01b038216820361018257565b67ffffffffffffffff811161060257601f01601f191660200190565b81601f820112156101825780359061069482610661565b926106a26040519485610616565b8284526020838301011161018257815f926020809301838601378301015290565b519067ffffffffffffffff8216820361018257565b51906001600160a01b038216820361018257565b6020818303126101825780519067ffffffffffffffff8211610182570190610140828203126101825760405191610722836105e5565b805183526020810151602084015261073c604082016106c3565b604084015261074d606082016106c3565b606084015261075e608082016106c3565b608084015260a081015160a084015261077960c082016106d8565b60c084015261078a60e082016106d8565b60e08401526101008101518015158103610182576101008401526101208101519067ffffffffffffffff8211610182570181601f82011215610182578051906107d282610661565b926107e06040519485610616565b8284526020838301011161018257815f9260208093018386015e830101526101208201529056fea2646970667358221220fab0d2bbc55cc2f24d00bc5a34a196609b6e61f65b361299d07d1e66aeaa54c664736f6c634300081b0033",
    "sourceMap": "245:2530:107:-:0;;;;;;;;;;;;;-1:-1:-1;;245:2530:107;;;;-1:-1:-1;;;;;245:2530:107;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;245:2530:107;;;;;;999:10;;245:2530;;;;;;;;999:10;245:2530;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;245:2530:107;;;;;;-1:-1:-1;245:2530:107;;;;;-1:-1:-1;245:2530:107",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c90816352155df7146104955750806357f784ba146103345780638150864d146102f0578063887d686d146102bd5780638da3721a146101865763c26646101461005e575f80fd5b346101825761006c366105cf565b6040516328c44a9960e21b8152600481018290529091905f816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115610177575f91610155575b5060c001516001600160a01b0316330361014657805f525f60205260405f20825f5260205260ff60405f2054161561013757805f525f60205260405f20825f5260205260405f2060ff1981541690557f137a0dfcce695307235e039aa2ae70da634ed7f10a6a5a536b3a8c15d758aa1e5f80a3005b6339abb17d60e01b5f5260045ffd5b630feaf7d560e31b5f5260045ffd5b61017191503d805f833e6101698183610616565b8101906106ec565b5f6100c2565b6040513d5f823e3d90fd5b5f80fd5b346101825760603660031901126101825760043567ffffffffffffffff811161018257610140600319823603011261018257604051906101c5826105e5565b80600401358252602481013560208301526101e260448201610638565b60408301526101f360648201610638565b606083015261020460848201610638565b608083015260a481013560a083015261021f60c4820161064d565b60c083015261023060e4820161064d565b60e08301526101048101358015158103610182576101008301526101248101359067ffffffffffffffff821161018257600461026f923692010161067d565b61012082015260243567ffffffffffffffff81116101825761029590369060040161067d565b50515f525f60205260405f206044355f52602052602060ff60405f2054166040519015158152f35b34610182576102cb366105cf565b905f525f60205260405f20905f52602052602060ff60405f2054166040519015158152f35b34610182575f366003190112610182576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b3461018257610342366105cf565b6040516328c44a9960e21b8152600481018290529091907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165f82602481845afa908115610177576024925f92610477575b505f90604051938480926328c44a9960e21b82528760048301525afa918215610177575f9261045b575b5060c001516001600160a01b0316330361044c5751818115918215610441575b505061043257805f525f60205260405f20825f5260205260405f20600160ff198254161790557fd22fd165f2b163f7b94d6e2b15443105c17bfae3fa2242150644ab76a95d532e5f80a3005b630ebe58ef60e11b5f5260045ffd5b1415905081846103e6565b6331eb5cd360e11b5f5260045ffd5b6104709192503d805f833e6101698183610616565b90846103c6565b5f91925061048e903d8084833e6101698183610616565b919061039c565b34610182576104a3366105cf565b6328c44a9960e21b835260048301829052917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316905f81602481855afa908115610177575f916105b5575b5060e08101516001600160a01b0316331415908161059d575b5061058e575f602491604051928380926328c44a9960e21b82528760048301525afa908115610177575f91610574575b5060c001516001600160a01b0316907f93ece828de650a0159786850192cbcd721ab720e1ee81b00365a5c8d63886b315f80a4005b61058891503d805f833e6101698183610616565b8361053f565b63020a627d60e11b5f5260045ffd5b60c001516001600160a01b031633141590508461050f565b6105c991503d805f833e6101698183610616565b846104f6565b6040906003190112610182576004359060243590565b610140810190811067ffffffffffffffff82111761060257604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761060257604052565b359067ffffffffffffffff8216820361018257565b35906001600160a01b038216820361018257565b67ffffffffffffffff811161060257601f01601f191660200190565b81601f820112156101825780359061069482610661565b926106a26040519485610616565b8284526020838301011161018257815f926020809301838601378301015290565b519067ffffffffffffffff8216820361018257565b51906001600160a01b038216820361018257565b6020818303126101825780519067ffffffffffffffff8211610182570190610140828203126101825760405191610722836105e5565b805183526020810151602084015261073c604082016106c3565b604084015261074d606082016106c3565b606084015261075e608082016106c3565b608084015260a081015160a084015261077960c082016106d8565b60c084015261078a60e082016106d8565b60e08401526101008101518015158103610182576101008401526101208101519067ffffffffffffffff8211610182570181601f82011215610182578051906107d282610661565b926107e06040519485610616565b8284526020838301011161018257815f9260208093018386015e830101526101208201529056fea2646970667358221220fab0d2bbc55cc2f24d00bc5a34a196609b6e61f65b361299d07d1e66aeaa54c664736f6c634300081b0033",
    "sourceMap": "245:2530:107:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;1683:27:107;;245:2530;1683:27;;245:2530;;;;;;-1:-1:-1;245:2530:107;1683:27;245:2530;1683:3;-1:-1:-1;;;;;245:2530:107;1683:27;;;;;;;245:2530;1683:27;;;245:2530;-1:-1:-1;1725:16:107;;245:2530;-1:-1:-1;;;;;245:2530:107;1745:10;1725:30;1721:92;;245:2530;;;;;;;;;;;;;;;;;;;;1827:37;1823:99;;245:2530;;;;;;;;;;;;;;;;;;;;;;;;1992:42;245:2530;1992:42;;245:2530;1823:99;1887:24;;;245:2530;1887:24;245:2530;;1887:24;1721:92;1778:24;;;245:2530;1778:24;245:2530;;1778:24;1683:27;;;;;;245:2530;1683:27;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;245:2530;;;;;;;;;;;;;;;;;;;-1:-1:-1;;245:2530:107;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;245:2530:107;;;;;;821:25;-1:-1:-1;;;;;245:2530:107;;;;;;;;;;;;;:::i;:::-;;;-1:-1:-1;;;1123:27:107;;245:2530;1123:27;;245:2530;;;;;;1123:3;-1:-1:-1;;;;;245:2530:107;-1:-1:-1;245:2530:107;1123:27;245:2530;;1123:27;;;;;;;;;245:2530;1123:27;;;245:2530;;;;;;;;;;;;;1193:32;;;245:2530;1193:32;;245:2530;1193:32;;;;;;;245:2530;1193:32;;;245:2530;-1:-1:-1;1240:16:107;;245:2530;-1:-1:-1;;;;;245:2530:107;1260:10;1240:30;1236:94;;245:2530;1344:29;;;:64;;;;;245:2530;1340:122;;;;245:2530;;;;;;;;;;;;;;;;;1511:4;245:2530;;;;;;;;1531:39;245:2530;1531:39;;245:2530;1340:122;1431:20;;;245:2530;1431:20;245:2530;;1431:20;1344:64;1377:31;;;-1:-1:-1;1344:64:107;;;;1236:94;1293:26;;;245:2530;1293:26;245:2530;;1293:26;1193:32;;;;;;;245:2530;1193:32;;;;;;:::i;:::-;;;;;1123:27;245:2530;1123:27;;;;;;;;;;;;;;:::i;:::-;;;;;245:2530;;;;;;;:::i;:::-;-1:-1:-1;;;2165:32:107;;245:2530;2165:32;;245:2530;;;;2165:3;-1:-1:-1;;;;;245:2530:107;;-1:-1:-1;245:2530:107;2165:32;245:2530;;2165:32;;;;;;;245:2530;2165:32;;;245:2530;-1:-1:-1;245:2530:107;2211:20;;245:2530;-1:-1:-1;;;;;245:2530:107;2235:10;2211:34;;;;:73;;245:2530;2207:144;;;245:2530;2165:32;245:2530;;;;;;;;;;2389:27;;;245:2530;2389:27;;245:2530;2389:27;;;;;;;245:2530;2389:27;;;245:2530;-1:-1:-1;2468:16:107;;245:2530;-1:-1:-1;;;;;245:2530:107;;2432:62;245:2530;;2432:62;245:2530;2389:27;;;;;;245:2530;2389:27;;;;;;:::i;:::-;;;;2207:144;2307:33;;;245:2530;2307:33;245:2530;;2307:33;2211:73;2249:21;;245:2530;-1:-1:-1;;;;;245:2530:107;2235:10;2249:35;;;-1:-1:-1;2211:73:107;;;2165:32;;;;;;245:2530;2165:32;;;;;;:::i;:::-;;;;245:2530;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;245:2530:107;;;;;-1:-1:-1;245:2530:107;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;245:2530:107;;;;;;:::o;:::-;;;;;;;;-1:-1:-1;;245:2530:107;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;245:2530:107;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;245:2530:107;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;245:2530:107;;;;;;;;;;;;;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "59271": [
        {
          "start": 138,
          "length": 32
        },
        {
          "start": 773,
          "length": 32
        },
        {
          "start": 859,
          "length": 32
        },
        {
          "start": 1207,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "check((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "8da3721a",
    "confirm(bytes32,bytes32)": "57f784ba",
    "confirmations(bytes32,bytes32)": "887d686d",
    "eas()": "8150864d",
    "requestConfirmation(bytes32,bytes32)": "52155df7",
    "revoke(bytes32,bytes32)": "c2664610"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"InvalidFulfillment\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NoConfirmationToRevoke\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedConfirmation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedConfirmationRequest\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnauthorizedRevocation\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"}],\"name\":\"ConfirmationMade\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"confirmer\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"}],\"name\":\"ConfirmationRequested\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"fulfillment\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"escrow\",\"type\":\"bytes32\"}],\"name\":\"ConfirmationRevoked\",\"type\":\"event\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"fulfillment\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"}],\"name\":\"check\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"}],\"name\":\"confirm\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"confirmations\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"eas\",\"outputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"}],\"name\":\"requestConfirmation\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"_fulfillment\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"_escrow\",\"type\":\"bytes32\"}],\"name\":\"revoke\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/confirmation/NonexclusiveRevocableConfirmationArbiter.sol\":\"NonexclusiveRevocableConfirmationArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x60c3517336022ba2e637a7614c05c264c4a896a13eee19f28abd705d53cbfae5\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d54682c0f79f53ea184a0b03ae8986ae53453194005d6db2508c4e7941c5757b\",\"dweb:/ipfs/QmaRFve7sohhfW1ZQBHEJEeBGC5C4N9BLGGEETpMpoUxBx\"]},\"src/arbiters/confirmation/NonexclusiveRevocableConfirmationArbiter.sol\":{\"keccak256\":\"0x64a8b544fa1bcb4c7585c5ddcc276d77b9d06e0b76ca0d269f11b697adf27ff8\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://57b2fcd491fc031f4fbcdab06cb7e105c1448efbc1e69abe88bf54d0a21b8e4d\",\"dweb:/ipfs/QmYVxyvHunQGYFhmnT33qT1YbRmAcrHYZzymgKT1RLJJaF\"]}},\"version\":1}",
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
              "internalType": "contract IEAS",
              "name": "_eas",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "InvalidFulfillment"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NoConfirmationToRevoke"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedConfirmation"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedConfirmationRequest"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnauthorizedRevocation"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "fulfillment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "escrow",
              "type": "bytes32",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "ConfirmationMade",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "fulfillment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "confirmer",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "escrow",
              "type": "bytes32",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "ConfirmationRequested",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "fulfillment",
              "type": "bytes32",
              "indexed": true
            },
            {
              "internalType": "bytes32",
              "name": "escrow",
              "type": "bytes32",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "ConfirmationRevoked",
          "anonymous": false
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
              "name": "",
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
              "internalType": "bytes32",
              "name": "_fulfillment",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_escrow",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "confirm"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "confirmations",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "eas",
          "outputs": [
            {
              "internalType": "contract IEAS",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_fulfillment",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_escrow",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "requestConfirmation"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_fulfillment",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "_escrow",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "revoke"
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
        "src/arbiters/confirmation/NonexclusiveRevocableConfirmationArbiter.sol": "NonexclusiveRevocableConfirmationArbiter"
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
      "lib/eas-contracts/contracts/IEAS.sol": {
        "keccak256": "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        "urls": [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        "keccak256": "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        "urls": [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        "keccak256": "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        "urls": [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"
        ],
        "license": "MIT"
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        "keccak256": "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        "urls": [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"
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
      "src/arbiters/confirmation/NonexclusiveRevocableConfirmationArbiter.sol": {
        "keccak256": "0x64a8b544fa1bcb4c7585c5ddcc276d77b9d06e0b76ca0d269f11b697adf27ff8",
        "urls": [
          "bzz-raw://57b2fcd491fc031f4fbcdab06cb7e105c1448efbc1e69abe88bf54d0a21b8e4d",
          "dweb:/ipfs/QmYVxyvHunQGYFhmnT33qT1YbRmAcrHYZzymgKT1RLJJaF"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 107
} as const;
