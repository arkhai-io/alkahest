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
          internalType: "struct IntrinsicsArbiter2.DemandData",
          components: [
            {
              name: "schema",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
        },
      ],
      stateMutability: "pure",
    },
    {
      type: "error",
      name: "AttestationRevoked",
      inputs: [],
    },
    {
      type: "error",
      name: "DeadlineExpired",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidSchema",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x60808060405234601557610362908161001a8239f35b5f80fdfe60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101fd5763e6c9714d1461002f575f80fd5b346101e55760603660031901126101e55760043567ffffffffffffffff81116101e55761014060031982360301126101e557604051610140810181811067ffffffffffffffff8211176101e95760405281600401358152602081016024830135815261009d6044840161029b565b60408301526100ae6064840161029b565b91606081019283526100c26084850161029b565b936080820194855260a481013560a08301526100e060c482016102b0565b60c08301526100f160e482016102b0565b60e083015261010481013580151581036101e55761010083015261012481013567ffffffffffffffff81116101e55761012091600461013392369201016102c4565b91015260243567ffffffffffffffff81116101e5576101569036906004016102c4565b906020828051810103126101e557602061016e61027b565b92015180925251036101d6575167ffffffffffffffff1680151590816101cc575b506101bd575167ffffffffffffffff166101ae57602060405160018152f35b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f61018f565b635f9bd90760e11b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101e55760203660031901126101e55760043567ffffffffffffffff81116101e557366023820112156101e557806004013567ffffffffffffffff81116101e55781013660248201116101e5576020905f61025761027b565b52829003126101e557602090602461026d61027b565b910135809152604051908152f35b604051906020820182811067ffffffffffffffff8211176101e957604052565b359067ffffffffffffffff821682036101e557565b35906001600160a01b03821682036101e557565b81601f820112156101e55780359067ffffffffffffffff82116101e95760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101e957604052828452602083830101116101e557815f92602080930183860137830101529056fea26469706673582212206757814f18b254daac024d6ec096363539e82d1870c700ae099c39612c5e1c6964736f6c634300081b0033",
    sourceMap: "203:691:84:-:0;;;;;;;;;;;;;;;;;",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x60806040526004361015610011575f80fd5b5f3560e01c8063838a68d9146101fd5763e6c9714d1461002f575f80fd5b346101e55760603660031901126101e55760043567ffffffffffffffff81116101e55761014060031982360301126101e557604051610140810181811067ffffffffffffffff8211176101e95760405281600401358152602081016024830135815261009d6044840161029b565b60408301526100ae6064840161029b565b91606081019283526100c26084850161029b565b936080820194855260a481013560a08301526100e060c482016102b0565b60c08301526100f160e482016102b0565b60e083015261010481013580151581036101e55761010083015261012481013567ffffffffffffffff81116101e55761012091600461013392369201016102c4565b91015260243567ffffffffffffffff81116101e5576101569036906004016102c4565b906020828051810103126101e557602061016e61027b565b92015180925251036101d6575167ffffffffffffffff1680151590816101cc575b506101bd575167ffffffffffffffff166101ae57602060405160018152f35b637b6227e960e11b5f5260045ffd5b631ab7da6b60e01b5f5260045ffd5b905042115f61018f565b635f9bd90760e11b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b346101e55760203660031901126101e55760043567ffffffffffffffff81116101e557366023820112156101e557806004013567ffffffffffffffff81116101e55781013660248201116101e5576020905f61025761027b565b52829003126101e557602090602461026d61027b565b910135809152604051908152f35b604051906020820182811067ffffffffffffffff8211176101e957604052565b359067ffffffffffffffff821682036101e557565b35906001600160a01b03821682036101e557565b81601f820112156101e55780359067ffffffffffffffff82116101e95760405192601f8301601f19908116603f0116840167ffffffffffffffff8111858210176101e957604052828452602083830101116101e557815f92602080930183860137830101529056fea26469706673582212206757814f18b254daac024d6ec096363539e82d1870c700ae099c39612c5e1c6964736f6c634300081b0033",
    sourceMap:
      "203:691:84:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:691:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;633:32;;203:691;;;;;;;:::i;:::-;633:32;;203:691;;;;;1016:27:78;1012:55;;203:691:84;;;353:30:78;;;;;:89;;203:691:84;721:55:78;;;203:691:84;;;786:58:78;;203:691:84;;;;;;;786:58:78;824:20;;;203:691:84;824:20:78;203:691:84;;824:20:78;721:55;759:17;;;203:691:84;759:17:78;203:691:84;;759:17:78;353:89;427:15;;;-1:-1:-1;353:89:78;;;1012:55;1052:15;;;203:691:84;1052:15:78;203:691:84;;1052:15:78;203:691:84;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:691:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;203:691:84;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;203:691:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;203:691:84;;;;;;;;;;;;;;:::o",
    linkReferences: {},
  },
  methodIdentifiers: {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "decodeDemandData(bytes)": "838a68d9",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[],"name":"AttestationRevoked","type":"error"},{"inputs":[],"name":"DeadlineExpired","type":"error"},{"inputs":[],"name":"InvalidSchema","type":"error"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"decodeDemandData","outputs":[{"components":[{"internalType":"bytes32","name":"schema","type":"bytes32"}],"internalType":"struct IntrinsicsArbiter2.DemandData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/arbiters/IntrinsicsArbiter2.sol":"IntrinsicsArbiter2"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"src/ArbiterUtils.sol":{"keccak256":"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab","license":"UNLICENSED","urls":["bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12","dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit"]},"src/IArbiter.sol":{"keccak256":"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab","license":"UNLICENSED","urls":["bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038","dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff"]},"src/arbiters/IntrinsicsArbiter2.sol":{"keccak256":"0xaa7673cfdb2ca0482a53da4f336b588c4034d95af1dd41df96ac1da3b91c08ea","license":"UNLICENSED","urls":["bzz-raw://9ee11ca22195fb780e49bf90e2554dcdaf7e3876995e6763886e6b2a4575e14f","dweb:/ipfs/QmVcZAqerfqb6qF8bLURhhV6C1KAtzS9nxqU6wEVXpo9SV"]}},"version":1}',
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
          name: "AttestationRevoked",
        },
        {
          inputs: [],
          type: "error",
          name: "DeadlineExpired",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidSchema",
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
              internalType: "struct IntrinsicsArbiter2.DemandData",
              name: "",
              type: "tuple",
              components: [
                {
                  internalType: "bytes32",
                  name: "schema",
                  type: "bytes32",
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
        "@openzeppelin/=lib/openzeppelin-contracts/",
        "@src/=src/",
        "@test/=test/",
        "ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",
        "eas-contracts/=lib/eas-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/",
      ],
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        bytecodeHash: "ipfs",
      },
      compilationTarget: {
        "src/arbiters/IntrinsicsArbiter2.sol": "IntrinsicsArbiter2",
      },
      evmVersion: "cancun",
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
        keccak256: "0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab",
        urls: [
          "bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12",
          "dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit",
        ],
        license: "UNLICENSED",
      },
      "src/IArbiter.sol": {
        keccak256: "0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab",
        urls: [
          "bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038",
          "dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff",
        ],
        license: "UNLICENSED",
      },
      "src/arbiters/IntrinsicsArbiter2.sol": {
        keccak256: "0xaa7673cfdb2ca0482a53da4f336b588c4034d95af1dd41df96ac1da3b91c08ea",
        urls: [
          "bzz-raw://9ee11ca22195fb780e49bf90e2554dcdaf7e3876995e6763886e6b2a4575e14f",
          "dweb:/ipfs/QmVcZAqerfqb6qF8bLURhhV6C1KAtzS9nxqU6wEVXpo9SV",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 84,
} as const;
