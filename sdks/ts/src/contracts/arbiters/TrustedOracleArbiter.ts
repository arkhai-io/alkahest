export const abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_eas",
          type: "address",
          internalType: "contract IEAS",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "arbitrate",
      inputs: [
        {
          name: "obligation",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "demand",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "decision",
          type: "bool",
          internalType: "bool",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "checkObligation",
      inputs: [
        {
          name: "obligation",
          type: "tuple",
          internalType: "struct Attestation",
          components: [
            {
              name: "uid",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "time",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "expirationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "revocationTime",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "refUID",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "attester",
              type: "address",
              internalType: "address",
            },
            {
              name: "revocable",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
        {
          name: "demand",
          type: "bytes",
          internalType: "bytes",
        },
        {
          name: "",
          type: "bytes32",
          internalType: "bytes32",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "decodeDemandData",
      inputs: [
        {
          name: "data",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct TrustedOracleArbiter.DemandData",
          components: [
            {
              name: "oracle",
              type: "address",
              internalType: "address",
            },
            {
              name: "data",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "requestArbitration",
      inputs: [
        {
          name: "_obligation",
          type: "bytes32",
          internalType: "bytes32",
        },
        {
          name: "oracle",
          type: "address",
          internalType: "address",
        },
        {
          name: "demand",
          type: "bytes",
          internalType: "bytes",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "ArbitrationMade",
      inputs: [
        {
          name: "decisionKey",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "obligation",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "oracle",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "decision",
          type: "bool",
          indexed: false,
          internalType: "bool",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ArbitrationRequested",
      inputs: [
        {
          name: "obligation",
          type: "bytes32",
          indexed: true,
          internalType: "bytes32",
        },
        {
          name: "oracle",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "demand",
          type: "bytes",
          indexed: false,
          internalType: "bytes",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "UnauthorizedArbitrationRequest",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x608034606f57601f61083638819003918201601f19168301916001600160401b03831184841017607357808492602094604052833981010312606f57516001600160a01b03811690819003606f575f80546001600160a01b0319169190911790556040516107ae90816100888239f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c80636f6bd32b146103d4578063838a68d9146102d1578063e6c9714d146101035763fcb0c39014610045575f80fd5b346100ff5760603660031901126100ff576004356024356001600160401b0381116100ff57610078903690600401610673565b90604435918215158093036100ff576040516100ab8161009d6020820194868661075f565b03601f198101835282610637565b519020335f52600160205260405f20815f5260205260405f2060ff1981541660ff85161790556040519283527fbbe9caf8b56a2139bcb80c791657954e2e1ddfad0cf3725d0ce16838a46752d160203394a4005b5f80fd5b346100ff5760603660031901126100ff576004356001600160401b0381116100ff5761014060031982360301126100ff5760405190610141826105ec565b806004013582526024810135602083015261015e604482016106dd565b604083015261016f606482016106dd565b6060830152610180608482016106dd565b608083015260a481013560a083015261019b60c482016105d8565b60c08301526101ac60e482016105d8565b60e083015261010481013580151581036100ff57610100830152610124810135906001600160401b0382116100ff5760046101ea9236920101610673565b6101208201526024356001600160401b0381116100ff5761020f903690600401610673565b9081518201916020818403126100ff576020810151906001600160401b0382116100ff57016040818403126100ff576040519261024b8461061c565b61025760208301610705565b845260408201516001600160401b0381116100ff5761009d926020610284928161029e9501920101610719565b92836020860152519260405192839160208301958661075f565b5190209060018060a01b039051165f52600160205260405f20905f52602052602060ff60405f2054166040519015158152f35b346100ff5760203660031901126100ff576004356001600160401b0381116100ff57366023820112156100ff5780600401356001600160401b0381116100ff57810160248101913683116100ff576060602060405161032f8161061c565b5f815201526020818303126100ff576024810135906001600160401b0382116100ff570190604090829003126100ff576040519161036c8361061c565b610378602483016105d8565b83526044820135916001600160401b0383116100ff5761039b9201602401610673565b90602081019182526103d06040519283926020845260018060a01b0390511660208401525160408084015260608301906106b9565b0390f35b346100ff5760603660031901126100ff576024356001600160a01b03811690600435908290036100ff576044356001600160401b0381116100ff5761041d903690600401610673565b5f80546040516328c44a9960e21b8152600481018590529190829060249082906001600160a01b03165afa9081156105cd575f916104d9575b5060e08101516001600160a01b031633141590816104c1575b506104b2576104ad7f5a87a605f49708d9bbadaa74684a5e23583375d9ed010cda2db60567202de60b916040519182916020835260208301906106b9565b0390a3005b63ff323ecb60e01b5f5260045ffd5b60c001516001600160a01b031633141590508461046f565b90503d805f833e6104ea8183610637565b8101906020818303126100ff578051906001600160401b0382116100ff5701610140818303126100ff5760405191610521836105ec565b815183526020820151602084015261053b604083016106f1565b604084015261054c606083016106f1565b606084015261055d608083016106f1565b608084015260a082015160a084015261057860c08301610705565b60c084015261058960e08301610705565b60e084015261010082015180151581036100ff576101008401526101208201516001600160401b0381116100ff576105c19201610719565b61012082015284610456565b6040513d5f823e3d90fd5b35906001600160a01b03821682036100ff57565b61014081019081106001600160401b0382111761060857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761060857604052565b90601f801991011681019081106001600160401b0382111761060857604052565b6001600160401b03811161060857601f01601f191660200190565b81601f820112156100ff5780359061068a82610658565b926106986040519485610637565b828452602083830101116100ff57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b35906001600160401b03821682036100ff57565b51906001600160401b03821682036100ff57565b51906001600160a01b03821682036100ff57565b81601f820112156100ff5780519061073082610658565b9261073e6040519485610637565b828452602083830101116100ff57815f9260208093018386015e8301015290565b602092839282528051928391018483015e01015f81529056fea2646970667358221220f199eb15f8426bff2649a4c358a73d92895a3d1041de4e29204915bcf3406fdf64736f6c634300081b0033",
    sourceMap:
      "239:1891:82:-:0;;;;;;;;;;;;;-1:-1:-1;;239:1891:82;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;-1:-1:-1;239:1891:82;;-1:-1:-1;;;;;;239:1891:82;;;;;;;;;;;;;;;;;-1:-1:-1;239:1891:82;;;;;;-1:-1:-1;239:1891:82;;;;;-1:-1:-1;239:1891:82",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x60806040526004361015610011575f80fd5b5f3560e01c80636f6bd32b146103d4578063838a68d9146102d1578063e6c9714d146101035763fcb0c39014610045575f80fd5b346100ff5760603660031901126100ff576004356024356001600160401b0381116100ff57610078903690600401610673565b90604435918215158093036100ff576040516100ab8161009d6020820194868661075f565b03601f198101835282610637565b519020335f52600160205260405f20815f5260205260405f2060ff1981541660ff85161790556040519283527fbbe9caf8b56a2139bcb80c791657954e2e1ddfad0cf3725d0ce16838a46752d160203394a4005b5f80fd5b346100ff5760603660031901126100ff576004356001600160401b0381116100ff5761014060031982360301126100ff5760405190610141826105ec565b806004013582526024810135602083015261015e604482016106dd565b604083015261016f606482016106dd565b6060830152610180608482016106dd565b608083015260a481013560a083015261019b60c482016105d8565b60c08301526101ac60e482016105d8565b60e083015261010481013580151581036100ff57610100830152610124810135906001600160401b0382116100ff5760046101ea9236920101610673565b6101208201526024356001600160401b0381116100ff5761020f903690600401610673565b9081518201916020818403126100ff576020810151906001600160401b0382116100ff57016040818403126100ff576040519261024b8461061c565b61025760208301610705565b845260408201516001600160401b0381116100ff5761009d926020610284928161029e9501920101610719565b92836020860152519260405192839160208301958661075f565b5190209060018060a01b039051165f52600160205260405f20905f52602052602060ff60405f2054166040519015158152f35b346100ff5760203660031901126100ff576004356001600160401b0381116100ff57366023820112156100ff5780600401356001600160401b0381116100ff57810160248101913683116100ff576060602060405161032f8161061c565b5f815201526020818303126100ff576024810135906001600160401b0382116100ff570190604090829003126100ff576040519161036c8361061c565b610378602483016105d8565b83526044820135916001600160401b0383116100ff5761039b9201602401610673565b90602081019182526103d06040519283926020845260018060a01b0390511660208401525160408084015260608301906106b9565b0390f35b346100ff5760603660031901126100ff576024356001600160a01b03811690600435908290036100ff576044356001600160401b0381116100ff5761041d903690600401610673565b5f80546040516328c44a9960e21b8152600481018590529190829060249082906001600160a01b03165afa9081156105cd575f916104d9575b5060e08101516001600160a01b031633141590816104c1575b506104b2576104ad7f5a87a605f49708d9bbadaa74684a5e23583375d9ed010cda2db60567202de60b916040519182916020835260208301906106b9565b0390a3005b63ff323ecb60e01b5f5260045ffd5b60c001516001600160a01b031633141590508461046f565b90503d805f833e6104ea8183610637565b8101906020818303126100ff578051906001600160401b0382116100ff5701610140818303126100ff5760405191610521836105ec565b815183526020820151602084015261053b604083016106f1565b604084015261054c606083016106f1565b606084015261055d608083016106f1565b608084015260a082015160a084015261057860c08301610705565b60c084015261058960e08301610705565b60e084015261010082015180151581036100ff576101008401526101208201516001600160401b0381116100ff576105c19201610719565b61012082015284610456565b6040513d5f823e3d90fd5b35906001600160a01b03821682036100ff57565b61014081019081106001600160401b0382111761060857604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761060857604052565b90601f801991011681019081106001600160401b0382111761060857604052565b6001600160401b03811161060857601f01601f191660200190565b81601f820112156100ff5780359061068a82610658565b926106986040519485610637565b828452602083830101116100ff57815f926020809301838601378301015290565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b35906001600160401b03821682036100ff57565b51906001600160401b03821682036100ff57565b51906001600160a01b03821682036100ff57565b81601f820112156100ff5780519061073082610658565b9261073e6040519485610637565b828452602083830101116100ff57815f9260208093018386015e8301015290565b602092839282528051928391018483015e01015f81529056fea2646970667358221220f199eb15f8426bff2649a4c358a73d92895a3d1041de4e29204915bcf3406fdf64736f6c634300081b0033",
    sourceMap:
      "239:1891:82:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;239:1891:82;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;993:36;;;239:1891;993:36;;;;;;:::i;:::-;;239:1891;;993:36;;;;;;:::i;:::-;239:1891;983:47;;1050:10;239:1891;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1100:62;239:1891;1050:10;1100:62;;239:1891;;;;;;;;;;;-1:-1:-1;;239:1891:82;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;:::i;:::-;;;;1784:32;;239:1891;;;;;;;;;1784:32;;239:1891;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;1858:46;1784:32;239:1891;;1784:32;;1858:46;1784:32;;239:1891;;;;:::i;:::-;;;;;;;;;;;1858:46;;;239:1891;1858:46;;;;;:::i;:::-;239:1891;1848:57;;239:1891;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;239:1891:82;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;239:1891:82;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;;1310:31:82;;239:1891;1310:31;;239:1891;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;1310:31;;;;;;;239:1891;1310:31;;;239:1891;-1:-1:-1;239:1891:82;1368:19;;239:1891;-1:-1:-1;;;;;239:1891:82;1391:10;1368:33;;;;:83;;239:1891;1351:150;;;239:1891;1517:49;239:1891;;;;;;;;;;;;;;:::i;:::-;1517:49;;;239:1891;1351:150;1469:32;;;239:1891;1469:32;239:1891;;1469:32;1368:83;1417:20;;239:1891;-1:-1:-1;;;;;239:1891:82;1391:10;1417:34;;;-1:-1:-1;1368:83:82;;;1310:31;;;;;239:1891;1310:31;;;;;;:::i;:::-;;;239:1891;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;;:::i;:::-;;;;;1310:31;;;;239:1891;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;:::o;:::-;;;;-1:-1:-1;239:1891:82;;;;;-1:-1:-1;239:1891:82;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;239:1891:82;;;;;;;:::o;:::-;-1:-1:-1;;;;;239:1891:82;;;;;;-1:-1:-1;;239:1891:82;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;239:1891:82;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;239:1891:82;;;;;;;;-1:-1:-1;;239:1891:82;;;;:::o;:::-;;;-1:-1:-1;;;;;239:1891:82;;;;;;:::o;:::-;;;-1:-1:-1;;;;;239:1891:82;;;;;;:::o;:::-;;;-1:-1:-1;;;;;239:1891:82;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;239:1891:82;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;-1:-1:-1;239:1891:82;;;:::o",
    linkReferences: {},
  },
  methodIdentifiers: {
    "arbitrate(bytes32,bytes,bool)": "fcb0c390",
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9",
    "requestArbitration(bytes32,address,bytes)": "6f6bd32b",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IEAS","name":"_eas","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"UnauthorizedArbitrationRequest","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"decisionKey","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"obligation","type":"bytes32"},{"indexed":true,"internalType":"address","name":"oracle","type":"address"},{"indexed":false,"internalType":"bool","name":"decision","type":"bool"}],"name":"ArbitrationMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"obligation","type":"bytes32"},{"indexed":true,"internalType":"address","name":"oracle","type":"address"},{"indexed":false,"internalType":"bytes","name":"demand","type":"bytes"}],"name":"ArbitrationRequested","type":"event"},{"inputs":[{"internalType":"bytes32","name":"obligation","type":"bytes32"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bool","name":"decision","type":"bool"}],"name":"arbitrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeDemandData","outputs":[{"components":[{"internalType":"address","name":"oracle","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct TrustedOracleArbiter.DemandData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_obligation","type":"bytes32"},{"internalType":"address","name":"oracle","type":"address"},{"internalType":"bytes","name":"demand","type":"bytes"}],"name":"requestArbitration","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/arbiters/TrustedOracleArbiter.sol":"TrustedOracleArbiter"},"evmVersion":"prague","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",":@erc8004/=lib/trustless-agents-erc-ri/src/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/",":reference/=lib/trustless-agents-erc-ri/lib/reference/",":trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"src/ArbiterUtils.sol":{"keccak256":"0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd","license":"UNLICENSED","urls":["bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61","dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV"]},"src/IArbiter.sol":{"keccak256":"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629","license":"UNLICENSED","urls":["bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9","dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"]},"src/arbiters/TrustedOracleArbiter.sol":{"keccak256":"0xd2347be326fcaa2c9750e3fdfc66813aea0c4545c845f8513b214b70bc5787f4","license":"UNLICENSED","urls":["bzz-raw://1ba3cfe9d423cd269e94f93103625b40fd88914af0aac3cfeaaaf380ebfe8a11","dweb:/ipfs/QmZWd6Vzi1k49GRYTHGSbttFmrt32CwpZEd6X6C9o5mxX2"]}},"version":1}',
  metadata: {
    compiler: {
      version: "0.8.27+commit.40a35a09",
    },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [
            {
              internalType: "contract IEAS",
              name: "_eas",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          type: "error",
          name: "UnauthorizedArbitrationRequest",
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "decisionKey",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "bytes32",
              name: "obligation",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "address",
              name: "oracle",
              type: "address",
              indexed: true,
            },
            {
              internalType: "bool",
              name: "decision",
              type: "bool",
              indexed: false,
            },
          ],
          type: "event",
          name: "ArbitrationMade",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "obligation",
              type: "bytes32",
              indexed: true,
            },
            {
              internalType: "address",
              name: "oracle",
              type: "address",
              indexed: true,
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
              indexed: false,
            },
          ],
          type: "event",
          name: "ArbitrationRequested",
          anonymous: false,
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "obligation",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
            },
            {
              internalType: "bool",
              name: "decision",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "arbitrate",
        },
        {
          inputs: [
            {
              internalType: "struct Attestation",
              name: "obligation",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "uid",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "expirationTime",
                  type: "uint64",
                },
                {
                  internalType: "uint64",
                  name: "revocationTime",
                  type: "uint64",
                },
                {
                  internalType: "bytes32",
                  name: "refUID",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "attester",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "revocable",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "",
              type: "bytes32",
            },
          ],
          stateMutability: "view",
          type: "function",
          name: "checkObligation",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          stateMutability: "pure",
          type: "function",
          name: "decodeDemandData",
          outputs: [
            {
              internalType: "struct TrustedOracleArbiter.DemandData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "oracle",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
            },
          ],
        },
        {
          inputs: [
            {
              internalType: "bytes32",
              name: "_obligation",
              type: "bytes32",
            },
            {
              internalType: "address",
              name: "oracle",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "demand",
              type: "bytes",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
          name: "requestArbitration",
        },
      ],
      devdoc: {
        kind: "dev",
        methods: {},
        version: 1,
      },
      userdoc: {
        kind: "user",
        methods: {},
        version: 1,
      },
    },
    settings: {
      remappings: [
        "@eas/=lib/eas-contracts/contracts/",
        "@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",
        "@erc8004/=lib/trustless-agents-erc-ri/src/",
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
        "reference/=lib/trustless-agents-erc-ri/lib/reference/",
        "trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/",
      ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: "ipfs",
      },
      compilationTarget: {
        "src/arbiters/TrustedOracleArbiter.sol": "TrustedOracleArbiter",
      },
      evmVersion: "prague",
      libraries: {},
      viaIR: true,
    },
    sources: {
      "lib/eas-contracts/contracts/Common.sol": {
        keccak256: "0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685",
        urls: [
          "bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d",
          "dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/IEAS.sol": {
        keccak256: "0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12",
        urls: [
          "bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880",
          "dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISchemaRegistry.sol": {
        keccak256: "0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754",
        urls: [
          "bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158",
          "dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/ISemver.sol": {
        keccak256: "0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18",
        urls: [
          "bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0",
          "dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6",
        ],
        license: "MIT",
      },
      "lib/eas-contracts/contracts/resolver/ISchemaResolver.sol": {
        keccak256: "0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb",
        urls: [
          "bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f",
          "dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR",
        ],
        license: "MIT",
      },
      "src/ArbiterUtils.sol": {
        keccak256: "0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd",
        urls: [
          "bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61",
          "dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV",
        ],
        license: "UNLICENSED",
      },
      "src/IArbiter.sol": {
        keccak256: "0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629",
        urls: [
          "bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9",
          "dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv",
        ],
        license: "UNLICENSED",
      },
      "src/arbiters/TrustedOracleArbiter.sol": {
        keccak256: "0xd2347be326fcaa2c9750e3fdfc66813aea0c4545c845f8513b214b70bc5787f4",
        urls: [
          "bzz-raw://1ba3cfe9d423cd269e94f93103625b40fd88914af0aac3cfeaaaf380ebfe8a11",
          "dweb:/ipfs/QmZWd6Vzi1k49GRYTHGSbttFmrt32CwpZEd6X6C9o5mxX2",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 82,
} as const;
