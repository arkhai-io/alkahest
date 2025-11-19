export const abi = {
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_baseObligation",
          type: "address",
          internalType: "contract ERC20EscrowObligation",
        },
        {
          name: "_specificAttestation",
          type: "address",
          internalType: "contract SpecificAttestationArbiter",
        },
      ],
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
          name: "counteroffer",
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
      name: "paymentObligation",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract ERC20EscrowObligation",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "specificAttestation",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract SpecificAttestationArbiter",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "error",
      name: "InvalidObligation",
      inputs: [],
    },
    {
      type: "error",
      name: "InvalidValidation",
      inputs: [],
    },
  ],
  bytecode: {
    object:
      "0x60c03461009a57601f61063c38819003918201601f19168301916001600160401b0383118484101761009e57808492604094855283398101031261009a578051906001600160a01b038216820361009a5760200151906001600160a01b038216820361009a5760805260a05260405161058990816100b382396080518181816101be0152610425015260a05181818161032301526104660152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c9081630ac21e3314610454575080638660b17b146104105763e6c9714d1461003d575f80fd5b346103b45760603660031901126103b4576004356001600160401b0381116103b45761014060031982360301126103b4576040519061014082018281106001600160401b038211176103a057604052806004013582526020820191602482013583526100ab604483016104b6565b60408201526100bc606483016104b6565b91606082019283526100d0608482016104b6565b608083015260a481013560a08301526100eb60c482016104ca565b60c08301526100fc60e482016104ca565b60e083015261010481013580151581036103b4576101008301526101248101356001600160401b0381116103b45761012091600461013d92369201016104f9565b91019081526024356001600160401b0381116103b4576101619036906004016104f9565b916040838051810103126103b4576040519260408401908482106001600160401b038311176103a057604091825261019b6020820161053f565b8552015160208085019182529451604051635bf2f20d60e01b81529195826004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610405575f926103d1575b50036103b857516001600160401b031680151590816103c7575b506103b8575191825183019160208301936020818503126103b4576020810151906001600160401b0382116103b4570192608090849003126103b45760405192608084018481106001600160401b038211176103a0576040526102756020820161053f565b845260408101516001600160401b0381116103b45760209082010185601f820112156103b4578051906102a7826104de565b966102b56040519889610495565b828852602083830101116103b457815f926020809301838a015e870101526020840194855260806102e86060830161053f565b604086018190529101516060850190815291516001600160a01b03908116911603610391575190511161039157516001600160a01b039081167f00000000000000000000000000000000000000000000000000000000000000009091160361039157516020818051810103126103b4576040519060208201908282106001600160401b038311176103a05760209160405201518091526044350361039157602060405160018152f35b634af2691560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b637a9e2e8d60e01b5f5260045ffd5b905042115f610210565b9091506020813d6020116103fd575b816103ed60209383610495565b810103126103b45751905f6101f6565b3d91506103e0565b6040513d5f823e3d90fd5b346103b4575f3660031901126103b4576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346103b4575f3660031901126103b4577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b90601f801991011681019081106001600160401b038211176103a057604052565b35906001600160401b03821682036103b457565b35906001600160a01b03821682036103b457565b6001600160401b0381116103a057601f01601f191660200190565b81601f820112156103b457803590610510826104de565b9261051e6040519485610495565b828452602083830101116103b457815f926020809301838601378301015290565b51906001600160a01b03821682036103b45756fea264697066735822122035f99c1e86c67abf9c336e48942cc9ee4cee53e96d6c82f2313e401753050f5f64736f6c634300081b0033",
    sourceMap:
      "369:1789:111:-:0;;;;;;;;;;;;;-1:-1:-1;;369:1789:111;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;873:35;;918:42;;369:1789;;;;;;;;873:35;369:1789;;;;;;;;;;918:42;369:1789;;;;;;;;;;;;-1:-1:-1;369:1789:111;;;;;;-1:-1:-1;369:1789:111;;;;;-1:-1:-1;369:1789:111",
    linkReferences: {},
  },
  deployedBytecode: {
    object:
      "0x6080806040526004361015610012575f80fd5b5f3560e01c9081630ac21e3314610454575080638660b17b146104105763e6c9714d1461003d575f80fd5b346103b45760603660031901126103b4576004356001600160401b0381116103b45761014060031982360301126103b4576040519061014082018281106001600160401b038211176103a057604052806004013582526020820191602482013583526100ab604483016104b6565b60408201526100bc606483016104b6565b91606082019283526100d0608482016104b6565b608083015260a481013560a08301526100eb60c482016104ca565b60c08301526100fc60e482016104ca565b60e083015261010481013580151581036103b4576101008301526101248101356001600160401b0381116103b45761012091600461013d92369201016104f9565b91019081526024356001600160401b0381116103b4576101619036906004016104f9565b916040838051810103126103b4576040519260408401908482106001600160401b038311176103a057604091825261019b6020820161053f565b8552015160208085019182529451604051635bf2f20d60e01b81529195826004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa918215610405575f926103d1575b50036103b857516001600160401b031680151590816103c7575b506103b8575191825183019160208301936020818503126103b4576020810151906001600160401b0382116103b4570192608090849003126103b45760405192608084018481106001600160401b038211176103a0576040526102756020820161053f565b845260408101516001600160401b0381116103b45760209082010185601f820112156103b4578051906102a7826104de565b966102b56040519889610495565b828852602083830101116103b457815f926020809301838a015e870101526020840194855260806102e86060830161053f565b604086018190529101516060850190815291516001600160a01b03908116911603610391575190511161039157516001600160a01b039081167f00000000000000000000000000000000000000000000000000000000000000009091160361039157516020818051810103126103b4576040519060208201908282106001600160401b038311176103a05760209160405201518091526044350361039157602060405160018152f35b634af2691560e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b5f80fd5b637a9e2e8d60e01b5f5260045ffd5b905042115f610210565b9091506020813d6020116103fd575b816103ed60209383610495565b810103126103b45751905f6101f6565b3d91506103e0565b6040513d5f823e3d90fd5b346103b4575f3660031901126103b4576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346103b4575f3660031901126103b4577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b90601f801991011681019081106001600160401b038211176103a057604052565b35906001600160401b03821682036103b457565b35906001600160a01b03821682036103b457565b6001600160401b0381116103a057601f01601f191660200190565b81601f820112156103b457803590610510826104de565b9261051e6040519485610495565b828452602083830101116103b457815f926020809301838601378301015290565b51906001600160a01b03821682036103b45756fea264697066735822122035f99c1e86c67abf9c336e48942cc9ee4cee53e96d6c82f2313e401753050f5f64736f6c634300081b0033",
    sourceMap:
      "369:1789:111:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;369:1789:111;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;;;:::i;:::-;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;:::i;:::-;;;;;;1183:32;;369:1789;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;1183:32;;369:1789;:::i;:::-;;;;;;;;;;;;;;;;-1:-1:-1;;;1251:38:111;;369:1789;;;;;1251:17;-1:-1:-1;;;;;369:1789:111;1251:38;;;;;;;369:1789;1251:38;;;369:1789;1230:59;;1226:103;;369:1789;-1:-1:-1;;;;;369:1789:111;353:30:76;;;;;:89;;369:1789:111;1339:58;;;1493:15;369:1789;;;1469:101;;;369:1789;1469:101;;369:1789;;;;;;;;;1469:101;;369:1789;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;1585:44;1581:88;;369:1789;;;-1:-1:-1;1679:89:111;;369:1789;-1:-1:-1;;;;;369:1789:111;;;1817:19;369:1789;;;1783:54;1779:98;;1970:21;369:1789;;;;1946:108;;369:1789;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;;;1946:108;369:1789;;;;;;2069:30;2065:62;;369:1789;;;;;;;2065:62;1650:19;;;369:1789;2108:19;369:1789;;2108:19;369:1789;;;;;;;;;;;;;;;;1339:58;1310:19;;;369:1789;1378:19;369:1789;;1378:19;353:89:76;427:15;;;-1:-1:-1;353:89:76;;;1251:38:111;;;;369:1789;1251:38;;369:1789;1251:38;;;;;;369:1789;1251:38;;;:::i;:::-;;;369:1789;;;;;1251:38;;;;;;;-1:-1:-1;1251:38:111;;;369:1789;;;;;;;;;;;;;;;-1:-1:-1;;369:1789:111;;;;;;609:56;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;-1:-1:-1;;369:1789:111;;;;671:63;-1:-1:-1;;;;;369:1789:111;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;369:1789:111;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;369:1789:111;;;;;;:::o;:::-;;;-1:-1:-1;;;;;369:1789:111;;;;;;:::o;:::-;-1:-1:-1;;;;;369:1789:111;;;;;;-1:-1:-1;;369:1789:111;;;;:::o;:::-;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;-1:-1:-1;369:1789:111;;;;;;;;;;;;;;:::o;:::-;;;-1:-1:-1;;;;;369:1789:111;;;;;;:::o",
    linkReferences: {},
    immutableReferences: {
      "57748": [
        {
          start: 446,
          length: 32,
        },
        {
          start: 1061,
          length: 32,
        },
      ],
      "57751": [
        {
          start: 803,
          length: 32,
        },
        {
          start: 1126,
          length: 32,
        },
      ],
    },
  },
  methodIdentifiers: {
    "checkObligation((bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes,bytes32)":
      "e6c9714d",
    "paymentObligation()": "8660b17b",
    "specificAttestation()": "0ac21e33",
  },
  rawMetadata:
    '{"compiler":{"version":"0.8.27+commit.40a35a09"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract ERC20EscrowObligation","name":"_baseObligation","type":"address"},{"internalType":"contract SpecificAttestationArbiter","name":"_specificAttestation","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidObligation","type":"error"},{"inputs":[],"name":"InvalidValidation","type":"error"},{"inputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"obligation","type":"tuple"},{"internalType":"bytes","name":"demand","type":"bytes"},{"internalType":"bytes32","name":"counteroffer","type":"bytes32"}],"name":"checkObligation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paymentObligation","outputs":[{"internalType":"contract ERC20EscrowObligation","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"specificAttestation","outputs":[{"internalType":"contract SpecificAttestationArbiter","name":"","type":"address"}],"stateMutability":"view","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/arbiters/deprecated/ERC20PaymentFulfillmentArbiter.sol":"ERC20PaymentFulfillmentArbiter"},"evmVersion":"cancun","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":true,"runs":200},"remappings":[":@eas/=lib/eas-contracts/contracts/",":@openzeppelin/=lib/openzeppelin-contracts/",":@src/=src/",":@test/=test/",":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/",":eas-contracts/=lib/eas-contracts/contracts/",":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",":forge-std/=lib/forge-std/src/",":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",":openzeppelin-contracts/=lib/openzeppelin-contracts/"],"viaIR":true},"sources":{"lib/eas-contracts/contracts/Common.sol":{"keccak256":"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685","license":"MIT","urls":["bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d","dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc"]},"lib/eas-contracts/contracts/IEAS.sol":{"keccak256":"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12","license":"MIT","urls":["bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880","dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR"]},"lib/eas-contracts/contracts/ISchemaRegistry.sol":{"keccak256":"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754","license":"MIT","urls":["bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158","dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz"]},"lib/eas-contracts/contracts/ISemver.sol":{"keccak256":"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18","license":"MIT","urls":["bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0","dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6"]},"lib/eas-contracts/contracts/Semver.sol":{"keccak256":"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9","license":"MIT","urls":["bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808","dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"]},"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol":{"keccak256":"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb","license":"MIT","urls":["bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f","dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR"]},"lib/eas-contracts/contracts/resolver/SchemaResolver.sol":{"keccak256":"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983","license":"MIT","urls":["bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828","dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"]},"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol":{"keccak256":"0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4","license":"MIT","urls":["bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009","dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN"]},"lib/openzeppelin-contracts/contracts/utils/Panic.sol":{"keccak256":"0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c","license":"MIT","urls":["bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4","dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat"]},"lib/openzeppelin-contracts/contracts/utils/Strings.sol":{"keccak256":"0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2","license":"MIT","urls":["bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440","dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG"]},"lib/openzeppelin-contracts/contracts/utils/math/Math.sol":{"keccak256":"0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c","license":"MIT","urls":["bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966","dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga"]},"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol":{"keccak256":"0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481","license":"MIT","urls":["bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb","dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn"]},"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol":{"keccak256":"0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0","license":"MIT","urls":["bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426","dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY"]},"src/ArbiterUtils.sol":{"keccak256":"0x331f8ec571b787c47c25bffd13ae354ac37b737e8776b04330895bce0eb3f7ab","license":"UNLICENSED","urls":["bzz-raw://acec88f2f4780f0ce633ce968c34aa5ecee60a6462ec6d2c972e8712c05aca12","dweb:/ipfs/QmXcTvFKsyqHKxNBoAM46NGwuzj8ASuCPbCde4idcQbqit"]},"src/BaseAttester.sol":{"keccak256":"0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa","license":"UNLICENSED","urls":["bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084","dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa"]},"src/BaseEscrowObligation.sol":{"keccak256":"0x79f2b634467f60d2599566052d187ab570b5a5abb7d9ad4fb9608b10f1feb09c","license":"UNLICENSED","urls":["bzz-raw://c95fd69af07d9a26edf7c59fa8269bdd8958a41f2dd9de7e5ad2985198a69724","dweb:/ipfs/QmSWC22iabz1xHqsqqfm6exuk5VghGGrco4A1wGTSnsdBb"]},"src/BaseObligationNew.sol":{"keccak256":"0xb6f62aaa01bbb8c7d87a4437b466e5e95e9d6086626b780f367d3071ee20e8be","license":"UNLICENSED","urls":["bzz-raw://9216c00ddf06a890e591fc21969211be2b7a98aba8615021dd26352af5f472bc","dweb:/ipfs/Qmbc2MAT1DaT2e5Ue3PzjJmQRKb2CMNcB7YCPdjHS2Fjtc"]},"src/IArbiter.sol":{"keccak256":"0x5e37834970553135dbd3f5cdf4aa9cd8dc20f57a8642cee85366b211b1d111ab","license":"UNLICENSED","urls":["bzz-raw://b57275fcd9c40acc33af244aa3d19b62bb7291a9b1b3cb3592ecedb0202d1038","dweb:/ipfs/Qmd9YTFnardXdksfuUQkm2TcxREaFNG2j4MazYmaui5Bff"]},"src/arbiters/deprecated/ERC20PaymentFulfillmentArbiter.sol":{"keccak256":"0xcabd3fc4a318f0bf72517f062ad2eb88a207786ff2a76a82fa160085db188760","license":"UNLICENSED","urls":["bzz-raw://30b5ec5425276b0c05ca7c1759b17e8ec7e6fdc6caeedcbd4fd8bc60b40a2350","dweb:/ipfs/QmZuCsdfP1HDJij6a46gKS56jTAeZtj6pGf6TdedpTFEM2"]},"src/arbiters/deprecated/SpecificAttestationArbiter.sol":{"keccak256":"0xfb5181d8c5db61ff4fce0e7c964eb3449f028325014e67c6a81458d288dda91e","license":"UNLICENSED","urls":["bzz-raw://146feee63a3fdce150fd4bb93a46f10f0f048e1c6ee3c55286b8da6151100db5","dweb:/ipfs/QmUF478Y4pF9XXRVvc7VQ74erN6SA2h5WfuvJxvCKPMXKP"]},"src/obligations/ERC20EscrowObligation.sol":{"keccak256":"0xea0a753d1408265a0a25414afb20c82681d4bb9d34238471af4c30c555dbaf67","license":"UNLICENSED","urls":["bzz-raw://7a259ee4dbb03d35de1190c6e7d8ea5cd20e3941490c398eee8a98dcfac9f169","dweb:/ipfs/Qmc5BtgKF8cL5xwytyombbadyTM5X7Rq3xZ1fC2rQsvX2m"]}},"version":1}',
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
              internalType: "contract ERC20EscrowObligation",
              name: "_baseObligation",
              type: "address",
            },
            {
              internalType: "contract SpecificAttestationArbiter",
              name: "_specificAttestation",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidObligation",
        },
        {
          inputs: [],
          type: "error",
          name: "InvalidValidation",
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
              name: "counteroffer",
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
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "paymentObligation",
          outputs: [
            {
              internalType: "contract ERC20EscrowObligation",
              name: "",
              type: "address",
            },
          ],
        },
        {
          inputs: [],
          stateMutability: "view",
          type: "function",
          name: "specificAttestation",
          outputs: [
            {
              internalType: "contract SpecificAttestationArbiter",
              name: "",
              type: "address",
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
        "src/arbiters/deprecated/ERC20PaymentFulfillmentArbiter.sol": "ERC20PaymentFulfillmentArbiter",
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
      "lib/eas-contracts/contracts/Semver.sol": {
        keccak256: "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        urls: [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh",
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
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        keccak256: "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        urls: [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        keccak256: "0xee2337af2dc162a973b4be6d3f7c16f06298259e0af48c5470d2839bfa8a22f4",
        urls: [
          "bzz-raw://30c476b4b2f405c1bb3f0bae15b006d129c80f1bfd9d0f2038160a3bb9745009",
          "dweb:/ipfs/Qmb3VcuDufv6xbHeVgksC4tHpc5gKYVqBEwjEXW72XzSvN",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        keccak256: "0x156d11cd8394cb9245b0bb9d7a27f5b3e7193e3cec7b91a66474ae01af8d818c",
        urls: [
          "bzz-raw://6f171e65be237fe4aaa2f7a74862c10a06535b8c04baa42e848a63c6fc96bcd4",
          "dweb:/ipfs/QmUdz8WHcrjqYmbRaz5PFN2N2thfvQjcqTorZUfcmWTfat",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        keccak256: "0xca3b393fc1c04a4411d3776adb9763a8780f6fb04b618f2807faa5f295ef19d2",
        urls: [
          "bzz-raw://597006f69dd3711b302e2cf4fea2ee0f3b016a9c609dc05d2aac541911503440",
          "dweb:/ipfs/QmUHZnXu6tTDKqaSNWU4iwyovyL7fXTrZrabu7ijnHNUJG",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        keccak256: "0xd2fb25b789ccaf6bf50b147ecff4c9d62d05d3f5c5d562fdf568f6926a2a280c",
        urls: [
          "bzz-raw://521e2df6ed2080c9ae2f442b27a827551ab96ff2e5f920ad6dc978c355b4b966",
          "dweb:/ipfs/Qme1Z6dU7ZDQMfKiHwpLejAyFGsP9HpijvX9uzxivEGjga",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        keccak256: "0x8cdcfbd2484c2e7db797f57ff8731fe11d7ab0092c7a1112f8ad6047ad6d4481",
        urls: [
          "bzz-raw://356742c148ca77b9d953059072c32cf9d0d98ae782129fe442c73a6736bfd7cb",
          "dweb:/ipfs/QmZN5jdoBbCihsv1RK8n6pf6cC89pi77KGAasn7ZvyuNTn",
        ],
        license: "MIT",
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        keccak256: "0xb569f4a67508470689fe1152c382b20c9332039fe80ff5953b1dba5bcdca0dd0",
        urls: [
          "bzz-raw://bfbe7b1a9f44e94489c0490811b894fcc74d8362202e8f2ccf4a8c2ecca63426",
          "dweb:/ipfs/QmZyNhacF4B4WC8r1mDKyWuzjdVsWgA6RmYt31yoxAPsNY",
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
      "src/BaseAttester.sol": {
        keccak256: "0x3f26ee96b6ef02860fafb1c2c97399fc3aa8e183d32063a8736b3761ecbe25aa",
        urls: [
          "bzz-raw://c6568d73465cc18236f309bd56fae4bbd541ca3eb8cb35c481318279c956d084",
          "dweb:/ipfs/QmWJfeD2KPjU5G3gKcbKzMf6cnDUtkE4kE7ANne43pjVAa",
        ],
        license: "UNLICENSED",
      },
      "src/BaseEscrowObligation.sol": {
        keccak256: "0x79f2b634467f60d2599566052d187ab570b5a5abb7d9ad4fb9608b10f1feb09c",
        urls: [
          "bzz-raw://c95fd69af07d9a26edf7c59fa8269bdd8958a41f2dd9de7e5ad2985198a69724",
          "dweb:/ipfs/QmSWC22iabz1xHqsqqfm6exuk5VghGGrco4A1wGTSnsdBb",
        ],
        license: "UNLICENSED",
      },
      "src/BaseObligationNew.sol": {
        keccak256: "0xb6f62aaa01bbb8c7d87a4437b466e5e95e9d6086626b780f367d3071ee20e8be",
        urls: [
          "bzz-raw://9216c00ddf06a890e591fc21969211be2b7a98aba8615021dd26352af5f472bc",
          "dweb:/ipfs/Qmbc2MAT1DaT2e5Ue3PzjJmQRKb2CMNcB7YCPdjHS2Fjtc",
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
      "src/arbiters/deprecated/ERC20PaymentFulfillmentArbiter.sol": {
        keccak256: "0xcabd3fc4a318f0bf72517f062ad2eb88a207786ff2a76a82fa160085db188760",
        urls: [
          "bzz-raw://30b5ec5425276b0c05ca7c1759b17e8ec7e6fdc6caeedcbd4fd8bc60b40a2350",
          "dweb:/ipfs/QmZuCsdfP1HDJij6a46gKS56jTAeZtj6pGf6TdedpTFEM2",
        ],
        license: "UNLICENSED",
      },
      "src/arbiters/deprecated/SpecificAttestationArbiter.sol": {
        keccak256: "0xfb5181d8c5db61ff4fce0e7c964eb3449f028325014e67c6a81458d288dda91e",
        urls: [
          "bzz-raw://146feee63a3fdce150fd4bb93a46f10f0f048e1c6ee3c55286b8da6151100db5",
          "dweb:/ipfs/QmUF478Y4pF9XXRVvc7VQ74erN6SA2h5WfuvJxvCKPMXKP",
        ],
        license: "UNLICENSED",
      },
      "src/obligations/ERC20EscrowObligation.sol": {
        keccak256: "0xea0a753d1408265a0a25414afb20c82681d4bb9d34238471af4c30c555dbaf67",
        urls: [
          "bzz-raw://7a259ee4dbb03d35de1190c6e7d8ea5cd20e3941490c398eee8a98dcfac9f169",
          "dweb:/ipfs/Qmc5BtgKF8cL5xwytyombbadyTM5X7Rq3xZ1fC2rQsvX2m",
        ],
        license: "UNLICENSED",
      },
    },
    version: 1,
  },
  id: 111,
} as const;
