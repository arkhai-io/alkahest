export const abi = {
  "abi": [
    {
      "type": "function",
      "name": "MAX_ARBITERS",
      "inputs": [],
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
          "internalType": "struct AllArbiter.DemandData",
          "components": [
            {
              "name": "arbiters",
              "type": "address[]",
              "internalType": "address[]"
            },
            {
              "name": "demands",
              "type": "bytes[]",
              "internalType": "bytes[]"
            }
          ]
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "error",
      "name": "MismatchedArrayLengths",
      "inputs": []
    },
    {
      "type": "error",
      "name": "TooManyArbiters",
      "inputs": [
        {
          "name": "provided",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "max",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    }
  ],
  "bytecode": {
    "object": "0x608080604052346015576108cc908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c9081632895693d146103f557508063838a68d91461018b5763e6c9714d1461003d575f80fd5b34610173576060366003190112610173576004356001600160401b038111610173576101406003198236030112610173576040519061014082018281106001600160401b038211176101775760405280600401358252602481013560208301526100a96044820161046e565b60408301526100ba6064820161046e565b60608301526100cb6084820161046e565b608083015260a481013560a08301526100e660c48201610482565b60c08301526100f760e48201610482565b60e0830152610104810135801515810361017357610100830152610124810135906001600160401b03821161017357600461013592369201016104b1565b6101208201526024356001600160401b038111610173576020916101606101699236906004016104b1565b60443591610536565b6040519015158152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b34610173576020366003190112610173576004356001600160401b03811161017357366023820112156101735780600401356001600160401b038111610173578101602481019136831161017357606060206040516101e981610432565b8281520152602081830312610173576024810135906001600160401b03821161017357019060409082900312610173576040519061022682610432565b60248101356001600160401b0381116101735760249082010183601f8201121561017357803590610256826104f7565b91610264604051938461044d565b80835260208084019160051b8301019186831161017357602001905b8282106103dd57505050825260448101356001600160401b0381116101735760249101019180601f840112156101735782356102bb816104f7565b936102c9604051958661044d565b81855260208086019260051b820101918383116101735760208201905b8382106103b05785876020820190815260405191829160208352606083019151916040602085015282518091526020608085019301905f5b81811061038e575050505190601f19838203016040840152815180825260208201916020808360051b8301019401925f915b83831061035d5786860387f35b91939550919360208061037c600193601f19868203018752895161040e565b97019301930190928695949293610350565b82516001600160a01b031685528695506020948501949092019160010161031e565b81356001600160401b038111610173576020916103d2878480948801016104b1565b8152019101906102e6565b602080916103ea84610482565b815201910190610280565b34610173575f3660031901126101735780603260209252f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b604081019081106001600160401b0382111761017757604052565b90601f801991011681019081106001600160401b0382111761017757604052565b35906001600160401b038216820361017357565b35906001600160a01b038216820361017357565b6001600160401b03811161017757601f01601f191660200190565b81601f82011215610173578035906104c882610496565b926104d6604051948561044d565b8284526020838301011161017357815f926020809301838601378301015290565b6001600160401b0381116101775760051b60200190565b80518210156105225760209160051b010190565b634e487b7160e01b5f52603260045260245ffd5b919080518101926020840191602081860312610173576020810151906001600160401b03821161017357019360409085900312610173576040519361057a85610432565b60208101516001600160401b0381116101735760209082010183601f820112156101735780516105a9816104f7565b916105b7604051938461044d565b81835260208084019260051b8201019086821161017357602001915b81831061087657505050855260408101516001600160401b0381116101735760209101019180601f840112156101735782519261060f846104f7565b9361061d604051958661044d565b80855260208086019160051b830101918383116101735760208101915b838310610810575050505050602084019180835284515190510361080157835151603281116107ea57505f5b845180518210156107df5761076b906020906001600160a01b039061068c90859061050e565b511661069984875161050e565b5190604051808095819463e6c9714d60e01b83526060600484015289516064840152868a015160848401526001600160401b0360408b01511660a48401526001600160401b0360608b01511660c48401526001600160401b0360808b01511660e484015260a08a015161010484015260018060a01b0360c08b01511661012484015260018060a01b0360e08b0151166101448401526101008a015115156101648401526107596101208b01516101406101848601526101a485019061040e565b8381036003190160248501529061040e565b8a604483015203915afa9081156107d4575f9161079a575b501561079157600101610666565b50505050505f90565b90506020813d82116107cc575b816107b46020938361044d565b8101031261017357518015158103610173575f610783565b3d91506107a7565b6040513d5f823e3d90fd5b505050505050600190565b630fdf70ab60e31b5f52600452603260245260445ffd5b632b477e7160e11b5f5260045ffd5b82516001600160401b03811161017357820185603f820112156101735760208101519161083c83610496565b610849604051918261044d565b8381526040838501018810610173575f602085819660408397018386015e8301015281520192019161063a565b82516001600160a01b0381168103610173578152602092830192016105d356fea2646970667358221220f7c92a33418772251cdcdc5e99f0aa84b7c9cc089a4d61757fdd742db555193a64736f6c634300081b0033",
    "sourceMap": "209:1417:86:-:0;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080806040526004361015610012575f80fd5b5f3560e01c9081632895693d146103f557508063838a68d91461018b5763e6c9714d1461003d575f80fd5b34610173576060366003190112610173576004356001600160401b038111610173576101406003198236030112610173576040519061014082018281106001600160401b038211176101775760405280600401358252602481013560208301526100a96044820161046e565b60408301526100ba6064820161046e565b60608301526100cb6084820161046e565b608083015260a481013560a08301526100e660c48201610482565b60c08301526100f760e48201610482565b60e0830152610104810135801515810361017357610100830152610124810135906001600160401b03821161017357600461013592369201016104b1565b6101208201526024356001600160401b038111610173576020916101606101699236906004016104b1565b60443591610536565b6040519015158152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b34610173576020366003190112610173576004356001600160401b03811161017357366023820112156101735780600401356001600160401b038111610173578101602481019136831161017357606060206040516101e981610432565b8281520152602081830312610173576024810135906001600160401b03821161017357019060409082900312610173576040519061022682610432565b60248101356001600160401b0381116101735760249082010183601f8201121561017357803590610256826104f7565b91610264604051938461044d565b80835260208084019160051b8301019186831161017357602001905b8282106103dd57505050825260448101356001600160401b0381116101735760249101019180601f840112156101735782356102bb816104f7565b936102c9604051958661044d565b81855260208086019260051b820101918383116101735760208201905b8382106103b05785876020820190815260405191829160208352606083019151916040602085015282518091526020608085019301905f5b81811061038e575050505190601f19838203016040840152815180825260208201916020808360051b8301019401925f915b83831061035d5786860387f35b91939550919360208061037c600193601f19868203018752895161040e565b97019301930190928695949293610350565b82516001600160a01b031685528695506020948501949092019160010161031e565b81356001600160401b038111610173576020916103d2878480948801016104b1565b8152019101906102e6565b602080916103ea84610482565b815201910190610280565b34610173575f3660031901126101735780603260209252f35b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b604081019081106001600160401b0382111761017757604052565b90601f801991011681019081106001600160401b0382111761017757604052565b35906001600160401b038216820361017357565b35906001600160a01b038216820361017357565b6001600160401b03811161017757601f01601f191660200190565b81601f82011215610173578035906104c882610496565b926104d6604051948561044d565b8284526020838301011161017357815f926020809301838601378301015290565b6001600160401b0381116101775760051b60200190565b80518210156105225760209160051b010190565b634e487b7160e01b5f52603260045260245ffd5b919080518101926020840191602081860312610173576020810151906001600160401b03821161017357019360409085900312610173576040519361057a85610432565b60208101516001600160401b0381116101735760209082010183601f820112156101735780516105a9816104f7565b916105b7604051938461044d565b81835260208084019260051b8201019086821161017357602001915b81831061087657505050855260408101516001600160401b0381116101735760209101019180601f840112156101735782519261060f846104f7565b9361061d604051958661044d565b80855260208086019160051b830101918383116101735760208101915b838310610810575050505050602084019180835284515190510361080157835151603281116107ea57505f5b845180518210156107df5761076b906020906001600160a01b039061068c90859061050e565b511661069984875161050e565b5190604051808095819463e6c9714d60e01b83526060600484015289516064840152868a015160848401526001600160401b0360408b01511660a48401526001600160401b0360608b01511660c48401526001600160401b0360808b01511660e484015260a08a015161010484015260018060a01b0360c08b01511661012484015260018060a01b0360e08b0151166101448401526101008a015115156101648401526107596101208b01516101406101848601526101a485019061040e565b8381036003190160248501529061040e565b8a604483015203915afa9081156107d4575f9161079a575b501561079157600101610666565b50505050505f90565b90506020813d82116107cc575b816107b46020938361044d565b8101031261017357518015158103610173575f610783565b3d91506107a7565b6040513d5f823e3d90fd5b505050505050600190565b630fdf70ab60e31b5f52600452603260245260445ffd5b632b477e7160e11b5f5260045ffd5b82516001600160401b03811161017357820185603f820112156101735760208101519161083c83610496565b610849604051918261044d565b8381526040838501018810610173575f602085819660408397018386015e8301015281520192019161063a565b82516001600160a01b0381168103610173578152602092830192016105d356fea2646970667358221220f7c92a33418772251cdcdc5e99f0aa84b7c9cc089a4d61757fdd742db555193a64736f6c634300081b0033",
    "sourceMap": "209:1417:86:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:1417:86;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;:::i;:::-;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:1417:86;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;-1:-1:-1;209:1417:86;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;-1:-1:-1;;209:1417:86;;;;;515:2;209:1417;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;209:1417:86;;;;;;;;-1:-1:-1;;209:1417:86;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:1417:86;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:1417:86;;;;;;:::o;:::-;-1:-1:-1;;;;;209:1417:86;;;;;;-1:-1:-1;;209:1417:86;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;209:1417:86;;;;;;;;;;;;;;:::o;:::-;-1:-1:-1;;;;;209:1417:86;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;524:953;;;209:1417;;731:32;;;;;;209:1417;731:32;209:1417;;;;;;731:32;;;209:1417;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;:::i;:::-;731:32;209:1417;;;-1:-1:-1;;;;;209:1417:86;;;;731:32;209:1417;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;731:32;209:1417;;;;;;;;;;;;;;;731:32;209:1417;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;731:32;209:1417;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;731:32;209:1417;;;;;;;;;;;;;;;731:32;209:1417;;;;;;;;;;;;;;731:32;209:1417;;;;;;777:16;;209:1417;;;777:49;773:111;;897:16;;209:1417;515:2;897:38;;893:130;;1038:13;209:1417;1082:3;1057:16;;209:1417;;1053:27;;;;;209:1417;;731:32;;-1:-1:-1;;;;;209:1417:86;1300:19;;209:1417;;1300:19;:::i;:::-;209:1417;;1349:18;:15;;;:18;:::i;:::-;;209:1417;;;;;;;;;;;1291:89;;209:1417;1291:89;;;209:1417;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;209:1417:86;;;;;;;:::i;:::-;;;;;;1291:89;;;;;;;;;209:1417;1291:89;;;1082:3;1290:90;;1101:339;;209:1417;;1038:13;;1101:339;1413:12;;;;;209:1417;1413:12;:::o;1291:89::-;;;731:32;1291:89;;;;;;;;;731:32;1291:89;;;:::i;:::-;;;209:1417;;;;;;;;;;;;1291:89;;;;;;-1:-1:-1;1291:89:86;;;209:1417;;;;;;;;;1053:27;;;;;;;209:1417;524:953;:::o;893:130::-;958:54;;;209:1417;958:54;;209:1417;515:2;209:1417;;;;958:54;773:111;849:24;;;209:1417;849:24;;209:1417;849:24;209:1417;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;;;;;;;731:32;209:1417;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;209:1417:86;;;731:32;209:1417;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:1417:86;;;;;;;;731:32;209:1417;;;;;;",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "MAX_ARBITERS()": "2895693d",
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"MismatchedArrayLengths\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"provided\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"max\",\"type\":\"uint256\"}],\"name\":\"TooManyArbiters\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"MAX_ARBITERS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"obligation\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"bytes32\",\"name\":\"fulfilling\",\"type\":\"bytes32\"}],\"name\":\"checkObligation\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeDemandData\",\"outputs\":[{\"components\":[{\"internalType\":\"address[]\",\"name\":\"arbiters\",\"type\":\"address[]\"},{\"internalType\":\"bytes[]\",\"name\":\"demands\",\"type\":\"bytes[]\"}],\"internalType\":\"struct AllArbiter.DemandData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/arbiters/logical/AllArbiter.sol\":\"AllArbiter\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"src/ArbiterUtils.sol\":{\"keccak256\":\"0x54728ba8cb791c33416c1a55b643d81bd9ccdb62211b776b315be718d1eab03f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://23a3d32630b34c3ab24d67b42d685a4217174c6f2a5cf9748e6f01d7c37fc1f2\",\"dweb:/ipfs/QmaZ54diVZkeXHfuYKpC8buHyBvZ6dpSpVztgmgJmwzmZM\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9\",\"dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv\"]},\"src/arbiters/logical/AllArbiter.sol\":{\"keccak256\":\"0x53ade290e91e5d9f43e82cff3765295b1dbd9a64e0b793c3d2ed9a576eb03fc0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://8c6c8b7de7a207a9aeafc4a253a360846ce2c4684be1e0d99e21f5b14fc612e2\",\"dweb:/ipfs/QmZacySVd5Bu1yfdSyRASp1RJN3AUEH9JRkdXKfyHfLAgP\"]}},\"version\":1}",
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
          "name": "MismatchedArrayLengths"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "provided",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "max",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "TooManyArbiters"
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "MAX_ARBITERS",
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
              "internalType": "struct AllArbiter.DemandData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address[]",
                  "name": "arbiters",
                  "type": "address[]"
                },
                {
                  "internalType": "bytes[]",
                  "name": "demands",
                  "type": "bytes[]"
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
        "src/arbiters/logical/AllArbiter.sol": "AllArbiter"
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
      "src/arbiters/logical/AllArbiter.sol": {
        "keccak256": "0x53ade290e91e5d9f43e82cff3765295b1dbd9a64e0b793c3d2ed9a576eb03fc0",
        "urls": [
          "bzz-raw://8c6c8b7de7a207a9aeafc4a253a360846ce2c4684be1e0d99e21f5b14fc612e2",
          "dweb:/ipfs/QmZacySVd5Bu1yfdSyRASp1RJN3AUEH9JRkdXKfyHfLAgP"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 86
} as const;
