export const abi = {
  abi: [
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
      stateMutability: "pure",
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
          internalType: "struct RecipientArbiter.DemandData",
          components: [
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
          ],
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "error",
      name: "RecipientMismatched",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x60808060405234601557610338908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101c15763e6c9714d1461002f575f80fd5b346101a95760603660031901126101a95760043567ffffffffffffffff81116101a95761014060031982360301126101a957604051610140810181811067ffffffffffffffff8211176101ad57604052816004013581526024820135602082015261009c60448301610271565b60408201526100ad60648301610271565b60608201526100be60848301610271565b608082015260a482013560a08201526100d960c48301610286565b9160c082019283526100ed60e48201610286565b60e083015261010481013580151581036101a95761010083015261012481013567ffffffffffffffff81116101a95761012091600461012f923692010161029a565b91015260243567ffffffffffffffff81116101a95761015290369060040161029a565b906020828051810103126101a957602061016a610251565b9201516001600160a01b038116928382036101a95752516001600160a01b03160361019a57602060405160018152f35b6358cf6deb60e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101a95760203660031901126101a95760043567ffffffffffffffff81116101a957366023820112156101a957806004013567ffffffffffffffff81116101a95781013660248201116101a9576020905f61021b610251565b52829003126101a95760209061023b6024610234610251565b9201610286565b908190526040516001600160a01b039091168152f35b604051906020820182811067ffffffffffffffff8211176101ad57604052565b359067ffffffffffffffff821682036101a957565b35906001600160a01b03821682036101a957565b81601f820112156101a95780359067ffffffffffffffff82116101ad5760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101ad57604052828452602083830101116101a957815f92602080930183860137830101529056fea26469706673582212209042283c50fc6f4b215972d79f684319cf7f9c870c7b4b16abfee40d644a8c1d64736f6c634300081b0033",
    sourceMap: "209:703:87:-:0;;;;;;;;;;;;;;;;;",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101c15763e6c9714d1461002f575f80fd5b346101a95760603660031901126101a95760043567ffffffffffffffff81116101a95761014060031982360301126101a957604051610140810181811067ffffffffffffffff8211176101ad57604052816004013581526024820135602082015261009c60448301610271565b60408201526100ad60648301610271565b60608201526100be60848301610271565b608082015260a482013560a08201526100d960c48301610286565b9160c082019283526100ed60e48201610286565b60e083015261010481013580151581036101a95761010083015261012481013567ffffffffffffffff81116101a95761012091600461012f923692010161029a565b91015260243567ffffffffffffffff81116101a95761015290369060040161029a565b906020828051810103126101a957602061016a610251565b9201516001600160a01b038116928382036101a95752516001600160a01b03160361019a57602060405160018152f35b6358cf6deb60e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101a95760203660031901126101a95760043567ffffffffffffffff81116101a957366023820112156101a957806004013567ffffffffffffffff81116101a95781013660248201116101a9576020905f61021b610251565b52829003126101a95760209061023b6024610234610251565b9201610286565b908190526040516001600160a01b039091168152f35b604051906020820182811067ffffffffffffffff8211176101ad57604052565b359067ffffffffffffffff821682036101a957565b35906001600160a01b03821682036101a957565b81601f820112156101a95780359067ffffffffffffffff82116101ad5760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101ad57604052828452602083830101116101a957815f92602080930183860137830101529056fea26469706673582212209042283c50fc6f4b215972d79f684319cf7f9c870c7b4b16abfee40d644a8c1d64736f6c634300081b0033",
    sourceMap:
      "209:703:87:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:703:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;591:32;;209:703;;;;;;;:::i;:::-;591:32;;209:703;-1:-1:-1;;;;;209:703:87;;;;;;;;;;-1:-1:-1;;;;;209:703:87;637:41;633:87;;209:703;;;;;;;633:87;699:21;;;209:703;699:21;209:703;;699:21;209:703;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:703:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;209:703:87;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:703:87;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:703:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;209:703:87;;;;;;;;;;;;;;:::o",
    linkReferences: {},
  },
  methodIdentifiers: {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[],"name":"RecipientMismatched","type":"error"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeDemandData","outputs":[{"components":[{"internalType":"address","name":"recipient","type":"address"}],"internalType":"struct RecipientArbiter.DemandData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/arbiters/attestation-properties/RecipientArbiter.sol":"RecipientArbiter"},"evmVersion":"prague","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",":@erc8004/=lib/trustless-agents-erc-ri/src/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/",":reference/=lib/trustless-agents-erc-ri/lib/reference/",":trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"src/ArbiterUtils.sol":{"keccak256":"0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd","license":"UNLICENSED","urls":["bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61","dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV"]},"src/IArbiter.sol":{"keccak256":"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629","license":"UNLICENSED","urls":["bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9","dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"]},"src/arbiters/attestation-properties/RecipientArbiter.sol":{"keccak256":"0x8727c5d37f1ab8c06900e18d6092f2c24f03202d8197960898528951990b878b","license":"UNLICENSED","urls":["bzz-raw://b3b70e956f7f40ce534f9ea0029a6976c947317a4bda64a7a7f95603b7f84cb0","dweb:/ipfs/QmdGtTmYekeHFZEDkdmUg7jxdzgZ6MLf5wTBpzcw2qJvDP"]}},"version":1}',
  metadata: {
    compiler: {
      version: "0.8.27+commit.40a35a09",
    },
    language: "Solidity",
    output: {
      abi: [
        {
          inputs: [],
          type: "error",
          name: "RecipientMismatched",
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
          stateMutability: "pure",
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
              internalType: "struct RecipientArbiter.DemandData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
            },
          ],
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
        "src/arbiters/attestation-properties/RecipientArbiter.sol": "RecipientArbiter",
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
      "src/arbiters/attestation-properties/RecipientArbiter.sol": {
        keccak256: "0x8727c5d37f1ab8c06900e18d6092f2c24f03202d8197960898528951990b878b",
        urls: [
          "bzz-raw://b3b70e956f7f40ce534f9ea0029a6976c947317a4bda64a7a7f95603b7f84cb0",
          "dweb:/ipfs/QmdGtTmYekeHFZEDkdmUg7jxdzgZ6MLf5wTBpzcw2qJvDP",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 87,
} as const;
