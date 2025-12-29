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
          name: "fulfilling",
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
          internalType: "struct ERC8004Arbiter.DemandData",
          components: [
            {
              name: "validationRegistry",
              type: "address",
              internalType: "address",
            },
            {
              name: "validatorAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "minResponse",
              type: "uint8",
              internalType: "uint8",
            },
          ],
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "error",
      name: "FulfillmentMustReferenceEscrow",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidMinResponse",
      inputs: [],
    },
    {
      type: "error",
      name: "ResponseBelowMinimum",
      inputs: [],
    },
    {
      type: "error",
      name: "ValidationNotFound",
      inputs: [],
    },
    {
      type: "error",
      name: "ValidatorMismatch",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x608080604052346015576104dc908161001a8239f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d9146102e8575063e6c9714d14610032575f80fd5b3461029f57606036600319011261029f5760043567ffffffffffffffff811161029f57610140600319823603011261029f5760405190610140820182811067ffffffffffffffff8211176102d45760405280600401358252602481013560208301526100a060448201610405565b60408301526100b160648201610405565b60608301526100c260848201610405565b608083015260a082019060a481013582526100df60c4820161041a565b60c08401526100f060e4820161041a565b60e0840152610104810135801515810361029f576101008401526101248101359067ffffffffffffffff821161029f57600461012f923692010161042e565b61012083015260243567ffffffffffffffff811161029f5761015590369060040161042e565b60608180518101031261029f576040519261016f846103c7565b61017b60208301610484565b845261019c606061018e60408501610484565b936020870194855201610498565b92604085019384526044359051036102c557606460ff845116116102b65751925160405160016234050160e21b03198152600481019490945260a090849060249082906001600160a01b03165afa9283156102ab575f905f9461025f575b506001600160a01b031690811561025057516001600160a01b0316036102415760ff8091511691161061023257602060405160018152f35b632be54c6b60e21b5f5260045ffd5b63d5fd645b60e01b5f5260045ffd5b637f7667e360e11b5f5260045ffd5b93505060a0833d60a0116102a3575b8161027b60a093836103e3565b8101031261029f57610298604061029185610484565b9401610498565b925f6101fa565b5f80fd5b3d915061026e565b6040513d5f823e3d90fd5b6346162fc560e01b5f5260045ffd5b638874563160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461029f57602036600319011261029f576004359067ffffffffffffffff821161029f573660238301121561029f57816004013567ffffffffffffffff811161029f57820136602482011161029f575f6040836103466060956103c7565b8281526020810183905201528290031261029f57604051610366816103c7565b6103726024830161041a565b9081815260646103846044850161041a565b9360208301948552013560ff8116810361029f57604091820190815281516001600160a01b03938416815293519092166020840152905160ff1690820152606090f35b6060810190811067ffffffffffffffff8211176102d457604052565b90601f8019910116810190811067ffffffffffffffff8211176102d457604052565b359067ffffffffffffffff8216820361029f57565b35906001600160a01b038216820361029f57565b81601f8201121561029f5780359067ffffffffffffffff82116102d45760405192610463601f8401601f1916602001856103e3565b8284526020838301011161029f57815f926020809301838601378301015290565b51906001600160a01b038216820361029f57565b519060ff8216820361029f5756fea26469706673582212206451bf710e9fe3d90e55c775b3e160f21521f7ea2aa23e01d567d8c6163b78cb64736f6c634300081b0033",
    sourceMap: "816:2541:78:-:0;;;;;;;;;;;;;;;;;",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x6080806040526004361015610012575f80fd5b5f3560e01c908163838a68d9146102e8575063e6c9714d14610032575f80fd5b3461029f57606036600319011261029f5760043567ffffffffffffffff811161029f57610140600319823603011261029f5760405190610140820182811067ffffffffffffffff8211176102d45760405280600401358252602481013560208301526100a060448201610405565b60408301526100b160648201610405565b60608301526100c260848201610405565b608083015260a082019060a481013582526100df60c4820161041a565b60c08401526100f060e4820161041a565b60e0840152610104810135801515810361029f576101008401526101248101359067ffffffffffffffff821161029f57600461012f923692010161042e565b61012083015260243567ffffffffffffffff811161029f5761015590369060040161042e565b60608180518101031261029f576040519261016f846103c7565b61017b60208301610484565b845261019c606061018e60408501610484565b936020870194855201610498565b92604085019384526044359051036102c557606460ff845116116102b65751925160405160016234050160e21b03198152600481019490945260a090849060249082906001600160a01b03165afa9283156102ab575f905f9461025f575b506001600160a01b031690811561025057516001600160a01b0316036102415760ff8091511691161061023257602060405160018152f35b632be54c6b60e21b5f5260045ffd5b63d5fd645b60e01b5f5260045ffd5b637f7667e360e11b5f5260045ffd5b93505060a0833d60a0116102a3575b8161027b60a093836103e3565b8101031261029f57610298604061029185610484565b9401610498565b925f6101fa565b5f80fd5b3d915061026e565b6040513d5f823e3d90fd5b6346162fc560e01b5f5260045ffd5b638874563160e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b3461029f57602036600319011261029f576004359067ffffffffffffffff821161029f573660238301121561029f57816004013567ffffffffffffffff811161029f57820136602482011161029f575f6040836103466060956103c7565b8281526020810183905201528290031261029f57604051610366816103c7565b6103726024830161041a565b9081815260646103846044850161041a565b9360208301948552013560ff8116810361029f57604091820190815281516001600160a01b03938416815293519092166020840152905160ff1690820152606090f35b6060810190811067ffffffffffffffff8211176102d457604052565b90601f8019910116810190811067ffffffffffffffff8211176102d457604052565b359067ffffffffffffffff8216820361029f57565b35906001600160a01b038216820361029f57565b81601f8201121561029f5780359067ffffffffffffffff82116102d45760405192610463601f8401601f1916602001856103e3565b8284526020838301011161029f57815f926020809301838601378301015290565b51906001600160a01b038216820361029f57565b519060ff8216820361029f5756fea26469706673582212206451bf710e9fe3d90e55c775b3e160f21521f7ea2aa23e01d567d8c6163b78cb64736f6c634300081b0033",
    sourceMap:
      "816:2541:78:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;816:2541:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;1797:32;;816:2541;;;;;;;;;;:::i;:::-;;;1797:32;;816:2541;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;1905:31;1901:88;;816:2541;;;;;2054:25;2050:58;;816:2541;;;;;-1:-1:-1;;;;;;2549:41:78;;816:2541;2549:41;;816:2541;;;;;;;;;;;;-1:-1:-1;;;;;816:2541:78;2549:41;;;;;;;816:2541;;;2549:41;;;816:2541;-1:-1:-1;;;;;;816:2541:78;;2676:30;;2672:63;;816:2541;-1:-1:-1;;;;;816:2541:78;2807:44;2803:88;;816:2541;;;;;;;2961:30;2957:65;;816:2541;;;;;;;2957:65;3000:22;;;816:2541;3000:22;816:2541;;3000:22;2803:88;2872:19;;;816:2541;2872:19;816:2541;;2872:19;2672:63;2715:20;;;816:2541;2715:20;816:2541;;2715:20;2549:41;;;;816:2541;2549:41;;816:2541;2549:41;;;;;;816:2541;2549:41;;;:::i;:::-;;;816:2541;;;;;;;;;:::i;:::-;;;;:::i;:::-;2549:41;;;;816:2541;;;;2549:41;;;-1:-1:-1;2549:41:78;;;816:2541;;;;;;;;;2050:58;2088:20;;;816:2541;2088:20;816:2541;;2088:20;1901:88;1957:32;;;816:2541;1957:32;816:2541;;1957:32;816:2541;;;;;;;;;;;;;;;;;;-1:-1:-1;;816:2541:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;816:2541:78;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;816:2541:78;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;816:2541:78;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;816:2541:78;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;816:2541:78;;;;;;:::o;:::-;;;;;;;;;;:::o",
    linkReferences: {},
  },
  methodIdentifiers: {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[],"name":"FulfillmentMustReferenceEscrow","type":"error"},{"inputs":[],"name":"InvalidMinResponse","type":"error"},{"inputs":[],"name":"ResponseBelowMinimum","type":"error"},{"inputs":[],"name":"ValidationNotFound","type":"error"},{"inputs":[],"name":"ValidatorMismatch","type":"error"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"fulfilling","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeDemandData","outputs":[{"components":[{"internalType":"address","name":"validationRegistry","type":"address"},{"internalType":"address","name":"validatorAddress","type":"address"},{"internalType":"uint8","name":"minResponse","type":"uint8"}],"internalType":"struct ERC8004Arbiter.DemandData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"}],"devdoc":{"details":"The DemandData specifies a minimum response uint8 (0-100)      The fulfillment attestation\'s UID is used as the requestHash      in the ValidationRegistry\'s getValidationStatus call","kind":"dev","methods":{"checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":{"params":{"demand":"ABI-encoded DemandData containing registry address and min response","fulfilling":"The escrow UID that this obligation must reference","obligation":"The attestation representing the obligation"},"returns":{"_0":"bool True if the validation response >= minResponse"}},"decodeDemandData(bytes)":{"params":{"data":"ABI-encoded DemandData"},"returns":{"_0":"DemandData struct"}}},"title":"ValidationRegistryArbiter","version":1},"userdoc":{"kind":"user","methods":{"checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":{"notice":"Check if the validation response meets the minimum requirement"},"decodeDemandData(bytes)":{"notice":"Helper function to decode DemandData"}},"notice":"Arbiter that wraps ERC-8004\'s ValidationRegistry","version":1}},"settings":{"compilationTarget":{"src/arbiters/ERC8004Arbiter.sol":"ERC8004Arbiter"},"evmVersion":"prague","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@erc8004-oz/contracts/=lib/trustless-agents-erc-ri/lib/reference/lib/openzeppelin-contracts/contracts/",":@erc8004/=lib/trustless-agents-erc-ri/src/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/",":reference/=lib/trustless-agents-erc-ri/lib/reference/",":trustless-agents-erc-ri/=lib/trustless-agents-erc-ri/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"src/ArbiterUtils.sol":{"keccak256":"0xfa0dc252637f91219024fe156f002249723bc110ee5bee6dcaf5456e19230cfd","license":"UNLICENSED","urls":["bzz-raw://9c55b7a64d1ce3133476e026a3c0437ac28287194ba605c3ee8ab985c725cc61","dweb:/ipfs/Qme8ViemRPUHt6DykWThUEJVMjJ5vt14ptugbnWswE4uSV"]},"src/IArbiter.sol":{"keccak256":"0x6eabb640c5f16294080510e55dd266ec988a5cba822703e3cbf08ed8a2f54629","license":"UNLICENSED","urls":["bzz-raw://445657c603fe315ab9d27b8500a53b1a821843f5a34902217f8d3cb12c9b5ce9","dweb:/ipfs/QmXMiKUkmedsDfsGoChzL5Zn4JQggxZm5WjQqkVu8738Wv"]},"src/arbiters/ERC8004Arbiter.sol":{"keccak256":"0x792a979a8f3e3af79e7a9e4c9324e95b44e3ba0e935b6d0bf32bc0aa6d78d1cb","license":"UNLICENSED","urls":["bzz-raw://8bd927b5f8fa0699b34245488c5282700297ccea779439e22277e5a9237130dc","dweb:/ipfs/QmWMoAQQe5hDURBFQrKYzEGEQNBvojQbQckNJ8GNGXN5ni"]}},"version":1}',
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
          name: "FulfillmentMustReferenceEscrow",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidMinResponse",
        },
        {
          inputs: [],
          type: "error",
          name: "ResponseBelowMinimum",
        },
        {
          inputs: [],
          type: "error",
          name: "ValidationNotFound",
        },
        {
          inputs: [],
          type: "error",
          name: "ValidatorMismatch",
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
              name: "fulfilling",
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
              internalType: "struct ERC8004Arbiter.DemandData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "validationRegistry",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "validatorAddress",
                  type: "address",
                },
                {
                  internalType: "uint8",
                  name: "minResponse",
                  type: "uint8",
                },
              ],
            },
          ],
        },
      ],
      devdoc: {
        kind: "dev",
        methods: {
          "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
            params: {
              demand: "ABI-encoded DemandData containing registry address and min response",
              fulfilling: "The escrow UID that this obligation must reference",
              obligation: "The attestation representing the obligation",
            },
            returns: {
              _0: "bool True if the validation response >= minResponse",
            },
          },
          "decodeDemandData(bytes)": {
            params: {
              data: "ABI-encoded DemandData",
            },
            returns: {
              _0: "DemandData struct",
            },
          },
        },
        version: 1,
      },
      userdoc: {
        kind: "user",
        methods: {
          "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)": {
            notice: "Check if the validation response meets the minimum requirement",
          },
          "decodeDemandData(bytes)": {
            notice: "Helper function to decode DemandData",
          },
        },
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
        "src/arbiters/ERC8004Arbiter.sol": "ERC8004Arbiter",
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
      "src/arbiters/ERC8004Arbiter.sol": {
        keccak256: "0x792a979a8f3e3af79e7a9e4c9324e95b44e3ba0e935b6d0bf32bc0aa6d78d1cb",
        urls: [
          "bzz-raw://8bd927b5f8fa0699b34245488c5282700297ccea779439e22277e5a9237130dc",
          "dweb:/ipfs/QmWMoAQQe5hDURBFQrKYzEGEQNBvojQbQckNJ8GNGXN5ni",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 78,
} as const;
