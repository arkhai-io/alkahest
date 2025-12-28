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
          internalType: "struct TimeBeforeArbiter.DemandData",
          components: [
            {
              name: "time",
              type: "uint64",
              internalType: "uint64",
            },
          ],
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "error",
      name: "TimeNotBefore",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x60808060405234601557610340908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101d15763e6c9714d1461002f575f80fd5b346101b95760603660031901126101b9576004356001600160401b0381116101b95761014060031982360301126101b95760405161014081018181106001600160401b038211176101bd57604052816004013581526024820135602082015261009a6044830161027c565b91604082019283526100ae6064820161027c565b60608301526100bf6084820161027c565b608083015260a481013560a08301526100da60c48201610290565b60c08301526100eb60e48201610290565b60e083015261010481013580151581036101b9576101008301526101248101356001600160401b0381116101b95761012091600461012c92369201016102a4565b9101526024356001600160401b0381116101b95761014e9036906004016102a4565b6020818051810103126101b957602061016561025d565b9101516001600160401b038116918282036101b9575280151591826101a5575b505061019657602060405160018152f35b63abcd2e9760e01b5f5260045ffd5b516001600160401b03161190505f80610185565b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101b95760203660031901126101b9576004356001600160401b0381116101b957366023820112156101b95780600401356001600160401b0381116101b95781013660248201116101b9576020905f61022961025d565b52829003126101b957602090610249602461024261025d565b920161027c565b8091526001600160401b0360405191168152f35b60405190602082018281106001600160401b038211176101bd57604052565b35906001600160401b03821682036101b957565b35906001600160a01b03821682036101b957565b81601f820112156101b9578035906001600160401b0382116101bd5760405192601f8301601f19908116603f011684016001600160401b038111858210176101bd57604052828452602083830101116101b957815f92602080930183860137830101529056fea2646970667358221220360ec962a7e26b088e258e70b7cf42fae9277804ec2c043ab022a014828ca15f64736f6c634300081b0033",
    sourceMap: "209:770:92:-:0;;;;;;;;;;;;;;;;;",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101d15763e6c9714d1461002f575f80fd5b346101b95760603660031901126101b9576004356001600160401b0381116101b95761014060031982360301126101b95760405161014081018181106001600160401b038211176101bd57604052816004013581526024820135602082015261009a6044830161027c565b91604082019283526100ae6064820161027c565b60608301526100bf6084820161027c565b608083015260a481013560a08301526100da60c48201610290565b60c08301526100eb60e48201610290565b60e083015261010481013580151581036101b9576101008301526101248101356001600160401b0381116101b95761012091600461012c92369201016102a4565b9101526024356001600160401b0381116101b95761014e9036906004016102a4565b6020818051810103126101b957602061016561025d565b9101516001600160401b038116918282036101b9575280151591826101a5575b505061019657602060405160018152f35b63abcd2e9760e01b5f5260045ffd5b516001600160401b03161190505f80610185565b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101b95760203660031901126101b9576004356001600160401b0381116101b957366023820112156101b95780600401356001600160401b0381116101b95781013660248201116101b9576020905f61022961025d565b52829003126101b957602090610249602461024261025d565b920161027c565b8091526001600160401b0360405191168152f35b60405190602082018281106001600160401b038211176101bd57604052565b35906001600160401b03821682036101b957565b35906001600160a01b03821682036101b957565b81601f820112156101b9578035906001600160401b0382116101bd5760405192601f8301601f19908116603f011684016001600160401b038111858210176101bd57604052828452602083830101116101b957815f92602080930183860137830101529056fea2646970667358221220360ec962a7e26b088e258e70b7cf42fae9277804ec2c043ab022a014828ca15f64736f6c634300081b0033",
    sourceMap:
      "209:770:92:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:770:92;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;:::i;:::-;;;;;580:32;;209:770;;;;;;;:::i;:::-;580:32;;209:770;-1:-1:-1;;;;;209:770:92;;;;;;;;;700:17;;;:51;;;;209:770;696:91;;;;209:770;;;;;;;696:91;772:15;;;209:770;772:15;209:770;;772:15;700:51;209:770;-1:-1:-1;;;;;209:770:92;721:30;;-1:-1:-1;700:51:92;;;;209:770;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;209:770:92;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:770:92;;;;;;:::o;:::-;;;-1:-1:-1;;;;;209:770:92;;;;;;:::o;:::-;;;;;;;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;-1:-1:-1;;209:770:92;;;;;;;;-1:-1:-1;;;;;209:770:92;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;209:770:92;;;;;;;;;;;;;;:::o",
    linkReferences: {},
  },
  methodIdentifiers: {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[],"name":"TimeNotBefore","type":"error"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeDemandData","outputs":[{"components":[{"internalType":"uint64","name":"time","type":"uint64"}],"internalType":"struct TimeBeforeArbiter.DemandData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/arbiters/attestation-properties/TimeBeforeArbiter.sol":"TimeBeforeArbiter"},"evmVersion":"prague","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",":@erc8004/=lib/trustless-agents-erc-ri/src/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/",":reference/=lib/trustless-agents-erc-ri/lib/reference/",":trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"src/ArbiterUtils.sol":{"keccak256":"0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd","license":"UNLICENSED","urls":["bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61","dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV"]},"src/IArbiter.sol":{"keccak256":"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629","license":"UNLICENSED","urls":["bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9","dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"]},"src/arbiters/attestation-properties/TimeBeforeArbiter.sol":{"keccak256":"0x8ee20386bcdf028eeb84acbbecef91206e5a1e9dd7add6cf686eaa5a67fc9b5c","license":"UNLICENSED","urls":["bzz-raw://eaecd25fb31d1369a40dd0e7c124bb40e80f97b2104101c6323cd05f6e4945e7","dweb:/ipfs/QmUwxUysG8QJDXGHbx8PawutqLLsNEWkZNstvPFUZQQxBV"]}},"version":1}',
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
          name: "TimeNotBefore",
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
              internalType: "struct TimeBeforeArbiter.DemandData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "uint64",
                  name: "time",
                  type: "uint64",
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
        "src/arbiters/attestation-properties/TimeBeforeArbiter.sol": "TimeBeforeArbiter",
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
      "src/arbiters/attestation-properties/TimeBeforeArbiter.sol": {
        keccak256: "0x8ee20386bcdf028eeb84acbbecef91206e5a1e9dd7add6cf686eaa5a67fc9b5c",
        urls: [
          "bzz-raw://eaecd25fb31d1369a40dd0e7c124bb40e80f97b2104101c6323cd05f6e4945e7",
          "dweb:/ipfs/QmUwxUysG8QJDXGHbx8PawutqLLsNEWkZNstvPFUZQQxBV",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 92,
} as const;
