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
      "name": "attestAndCreateReferenceEscrow",
      "inputs": [
        {
          "name": "escrow",
          "type": "address",
          "internalType": "contract AttestationReferenceEscrowObligation"
        },
        {
          "name": "request",
          "type": "tuple",
          "internalType": "struct AttestationRequest",
          "components": [
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "data",
              "type": "tuple",
              "internalType": "struct AttestationRequestData",
              "components": [
                {
                  "name": "recipient",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "expirationTime",
                  "type": "uint64",
                  "internalType": "uint64"
                },
                {
                  "name": "revocable",
                  "type": "bool",
                  "internalType": "bool"
                },
                {
                  "name": "refUID",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "data",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "value",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ]
        },
        {
          "name": "escrowData",
          "type": "tuple",
          "internalType": "struct AtomicAttestationUtils.ReferenceEscrowData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "validationExpirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "validationRevocable",
              "type": "bool",
              "internalType": "bool"
            }
          ]
        },
        {
          "name": "escrowExpirationTime",
          "type": "uint64",
          "internalType": "uint64"
        }
      ],
      "outputs": [
        {
          "name": "attestationUid",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "escrowUid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "attestAndCreateUnconditionalReferenceEscrow",
      "inputs": [
        {
          "name": "escrow",
          "type": "address",
          "internalType": "contract UnconditionalAttestationReferenceEscrowObligation"
        },
        {
          "name": "request",
          "type": "tuple",
          "internalType": "struct AttestationRequest",
          "components": [
            {
              "name": "schema",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "data",
              "type": "tuple",
              "internalType": "struct AttestationRequestData",
              "components": [
                {
                  "name": "recipient",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "expirationTime",
                  "type": "uint64",
                  "internalType": "uint64"
                },
                {
                  "name": "revocable",
                  "type": "bool",
                  "internalType": "bool"
                },
                {
                  "name": "refUID",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "data",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "value",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            }
          ]
        },
        {
          "name": "escrowData",
          "type": "tuple",
          "internalType": "struct AtomicAttestationUtils.ReferenceEscrowData",
          "components": [
            {
              "name": "arbiter",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "demand",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "validationExpirationTime",
              "type": "uint64",
              "internalType": "uint64"
            },
            {
              "name": "validationRevocable",
              "type": "bool",
              "internalType": "bool"
            }
          ]
        },
        {
          "name": "escrowExpirationTime",
          "type": "uint64",
          "internalType": "uint64"
        }
      ],
      "outputs": [
        {
          "name": "attestationUid",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "escrowUid",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "payable"
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
      "type": "error",
      "name": "IncorrectAttestationValue",
      "inputs": [
        {
          "name": "expected",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "actual",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    }
  ],
  "bytecode": {
    "object": "0x60a034606d57601f6105e738819003918201601f19168301916001600160401b03831184841017607157808492602094604052833981010312606d57516001600160a01b0381168103606d57608052604051610561908161008682396080518181816101c701526104aa0152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c80637d1e90df1461003a5780638150864d146101b25763910452291461003a575f80fd5b608036600319011261019b576004356001600160a01b0381169081900361019b5760243567ffffffffffffffff811161019b576040600319823603011261019b576044359067ffffffffffffffff821161019b57816004016080600319843603011261019b5761014f9360209261011967ffffffffffffffff6100c76100be6101f6565b9360040161039c565b966100df6100d48761020d565b966024830190610221565b93906100f960646100f260448601610254565b9401610269565b94604051986101078a610276565b6001600160a01b0316895236916102c8565b87870152876040870152166060850152151560808401525f60405180978195829463271fd49360e11b845233916004850161030e565b03925af180156101a7575f90610170575b6040809350519182526020820152f35b506020823d60201161019f575b8161018a602093836102a6565b8101031261019b5760409151610160565b5f80fd5b3d915061017d565b6040513d5f823e3d90fd5b3461019b575f36600319011261019b576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b6064359067ffffffffffffffff8216820361019b57565b356001600160a01b038116810361019b5790565b903590601e198136030182121561019b570180359067ffffffffffffffff821161019b5760200191813603831361019b57565b3567ffffffffffffffff8116810361019b5790565b35801515810361019b5790565b60a0810190811067ffffffffffffffff82111761029257604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761029257604052565b92919267ffffffffffffffff821161029257604051916102f2601f8201601f1916602001846102a6565b82948184528183011161019b578281602093845f960137010152565b91939267ffffffffffffffff6040926060855260018060a01b038151166060860152608060c0606060208085015160a0858b01528051918291826101008d0152016101208b015e5f8383838c01010152601f801991011688010101918581015160a08801528360608201511660c08801520151151560e08601529516602084015260018060a01b0316910152565b60208101359060be198136030182121561019b5760a0828201013590813403610514576040805163f17325e760e01b815260206004820152823560248201526044810191909152920180356001600160a01b0381169081900361019b576064840152602081013567ffffffffffffffff811680910361019b576084840152604081013580151580910361019b5760a4840152606081013560c48401526080810135601e198236030181121561019b578101916020833593019267ffffffffffffffff811161019b57803603841361019b57610144858260a08296839560209960c060e487015281610124870152868601375f8484018601520135610104830152601f01601f191681010301917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19081156101a7575f916104e5575090565b90506020813d60201161050c575b81610500602093836102a6565b8101031261019b575190565b3d91506104f3565b506351f15f6d60e01b5f526004523460245260445ffdfea2646970667358221220064c71be72b63644a98b9b2a3839a6a101b90bf57e41dbe6526877811c0641bd64736f6c634300081b0033",
    "sourceMap": "724:3231:147:-:0;;;;;;;;;;;;;-1:-1:-1;;724:3231:147;;;;-1:-1:-1;;;;;724:3231:147;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;724:3231:147;;;;;;1655:10;;724:3231;;;;;;;;1655:10;724:3231;;;;;;;;;;;;-1:-1:-1;724:3231:147;;;;;;-1:-1:-1;724:3231:147;;;;;-1:-1:-1;724:3231:147",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80637d1e90df1461003a5780638150864d146101b25763910452291461003a575f80fd5b608036600319011261019b576004356001600160a01b0381169081900361019b5760243567ffffffffffffffff811161019b576040600319823603011261019b576044359067ffffffffffffffff821161019b57816004016080600319843603011261019b5761014f9360209261011967ffffffffffffffff6100c76100be6101f6565b9360040161039c565b966100df6100d48761020d565b966024830190610221565b93906100f960646100f260448601610254565b9401610269565b94604051986101078a610276565b6001600160a01b0316895236916102c8565b87870152876040870152166060850152151560808401525f60405180978195829463271fd49360e11b845233916004850161030e565b03925af180156101a7575f90610170575b6040809350519182526020820152f35b506020823d60201161019f575b8161018a602093836102a6565b8101031261019b5760409151610160565b5f80fd5b3d915061017d565b6040513d5f823e3d90fd5b3461019b575f36600319011261019b576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b6064359067ffffffffffffffff8216820361019b57565b356001600160a01b038116810361019b5790565b903590601e198136030182121561019b570180359067ffffffffffffffff821161019b5760200191813603831361019b57565b3567ffffffffffffffff8116810361019b5790565b35801515810361019b5790565b60a0810190811067ffffffffffffffff82111761029257604052565b634e487b7160e01b5f52604160045260245ffd5b90601f8019910116810190811067ffffffffffffffff82111761029257604052565b92919267ffffffffffffffff821161029257604051916102f2601f8201601f1916602001846102a6565b82948184528183011161019b578281602093845f960137010152565b91939267ffffffffffffffff6040926060855260018060a01b038151166060860152608060c0606060208085015160a0858b01528051918291826101008d0152016101208b015e5f8383838c01010152601f801991011688010101918581015160a08801528360608201511660c08801520151151560e08601529516602084015260018060a01b0316910152565b60208101359060be198136030182121561019b5760a0828201013590813403610514576040805163f17325e760e01b815260206004820152823560248201526044810191909152920180356001600160a01b0381169081900361019b576064840152602081013567ffffffffffffffff811680910361019b576084840152604081013580151580910361019b5760a4840152606081013560c48401526080810135601e198236030181121561019b578101916020833593019267ffffffffffffffff811161019b57803603841361019b57610144858260a08296839560209960c060e487015281610124870152868601375f8484018601520135610104830152601f01601f191681010301917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19081156101a7575f916104e5575090565b90506020813d60201161050c575b81610500602093836102a6565b8101031261019b575190565b3d91506104f3565b506351f15f6d60e01b5f526004523460245260445ffdfea2646970667358221220064c71be72b63644a98b9b2a3839a6a101b90bf57e41dbe6526877811c0641bd64736f6c634300081b0033",
    "sourceMap": "724:3231:147:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;724:3231:147;;;;;;-1:-1:-1;;;;;724:3231:147;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2149:455;724:3231;;;;;2111:16;724:3231;;:::i;:::-;;;;2111:16;:::i;:::-;2264:18;2308:17;2264:18;;;:::i;:::-;2308:17;724:3231;2308:17;;;;:::i;:::-;2417:35;;2491:30;724:3231;2417:35;724:3231;2417:35;;;:::i;:::-;2491:30;;;:::i;:::-;724:3231;;;;;;;:::i;:::-;-1:-1:-1;;;;;724:3231:147;;;;;;:::i;:::-;2185:351;;;724:3231;2185:351;724:3231;2185:351;;724:3231;;;2185:351;;724:3231;;;;2185:351;;724:3231;;;;;;;;;;;;;2149:455;;2584:10;2149:455;724:3231;2149:455;;;:::i;:::-;;;;;;;;;724:3231;2149:455;;;724:3231;;;;;;;;;;;;;;2149:455;;724:3231;2149:455;;724:3231;2149:455;;;;;;724:3231;2149:455;;;:::i;:::-;;;724:3231;;;;;;;2149:455;;724:3231;;;;2149:455;;;-1:-1:-1;2149:455:147;;;724:3231;;;;;;;;;;;;;;;-1:-1:-1;;724:3231:147;;;;;;820:25;-1:-1:-1;;;;;724:3231:147;;;;;;;;;;;;;;;;;:::o;:::-;;-1:-1:-1;;;;;724:3231:147;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;724:3231:147;;;;;-1:-1:-1;724:3231:147;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;-1:-1:-1;;724:3231:147;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;724:3231:147;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;724:3231:147;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;3687:266::-;3794:12;;;724:3231;;;;;;;;;;;;;3794:18;724:3231;;;3794:18;724:3231;3826:9;;;:18;3822:74;;724:3231;;;-1:-1:-1;;;3913:33:147;;3794:12;3913:33;;;724:3231;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;724:3231:147;;;;;;;;;;;;3794:12;724:3231;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3794:12;724:3231;;;;;;;;;;;;;;;;;;;;3794:18;724:3231;;;;3794:12;724:3231;;;;;;;;;;;;;;;-1:-1:-1;724:3231:147;;;;;;;;;;;;;;-1:-1:-1;;724:3231:147;;;3913:33;;;:3;-1:-1:-1;;;;;724:3231:147;3913:33;;;;;;;-1:-1:-1;3913:33:147;;;3906:40;3687:266;:::o;3913:33::-;;;3794:12;3913:33;;3794:12;3913:33;;;;;;724:3231;3913:33;;;:::i;:::-;;;724:3231;;;;;3687:266;:::o;3913:33::-;;;-1:-1:-1;3913:33:147;;3822:74;3853:43;;;;-1:-1:-1;3853:43:147;;724:3231;3826:9;724:3231;;;-1:-1:-1;3853:43:147",
    "linkReferences": {},
    "immutableReferences": {
      "78271": [
        {
          "start": 455,
          "length": 32
        },
        {
          "start": 1194,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "attestAndCreateReferenceEscrow(address,(bytes32,(address,uint64,bool,bytes32,bytes,uint256)),(address,bytes,uint64,bool),uint64)": "91045229",
    "attestAndCreateUnconditionalReferenceEscrow(address,(bytes32,(address,uint64,bool,bytes32,bytes,uint256)),(address,bytes,uint64,bool),uint64)": "7d1e90df",
    "eas()": "8150864d"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"actual\",\"type\":\"uint256\"}],\"name\":\"IncorrectAttestationValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"contract AttestationReferenceEscrowObligation\",\"name\":\"escrow\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"request\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct AtomicAttestationUtils.ReferenceEscrowData\",\"name\":\"escrowData\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"escrowExpirationTime\",\"type\":\"uint64\"}],\"name\":\"attestAndCreateReferenceEscrow\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract UnconditionalAttestationReferenceEscrowObligation\",\"name\":\"escrow\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"request\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"demand\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"validationExpirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"validationRevocable\",\"type\":\"bool\"}],\"internalType\":\"struct AtomicAttestationUtils.ReferenceEscrowData\",\"name\":\"escrowData\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"escrowExpirationTime\",\"type\":\"uint64\"}],\"name\":\"attestAndCreateUnconditionalReferenceEscrow\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"attestationUid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"escrowUid\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"eas\",\"outputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Security note: This contract has not been included in professional manual audits and      has only been reviewed by automated audit tooling so far.\",\"kind\":\"dev\",\"methods\":{\"constructor\":{\"params\":{\"_eas\":\"EAS contract used to create attestations.\"}}},\"title\":\"AtomicAttestationUtils\",\"version\":1},\"userdoc\":{\"errors\":{\"IncorrectAttestationValue(uint256,uint256)\":[{\"notice\":\"Raised when `msg.value` does not exactly match the EAS attestation value.\"}]},\"kind\":\"user\",\"methods\":{\"attestAndCreateReferenceEscrow(address,(bytes32,(address,uint64,bool,bytes32,bytes,uint256)),(address,bytes,uint64,bool),uint64)\":{\"notice\":\"Creates an EAS attestation and then creates a default attestation-reference escrow for it.\"},\"attestAndCreateUnconditionalReferenceEscrow(address,(bytes32,(address,uint64,bool,bytes32,bytes,uint256)),(address,bytes,uint64,bool),uint64)\":{\"notice\":\"Creates an EAS attestation and then creates an unconditional attestation-reference escrow for it.\"},\"eas()\":{\"notice\":\"EAS contract used to create attestations.\"}},\"notice\":\"Helpers that create an EAS attestation and an attestation-reference escrow in one transaction.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/utils/atomic/AtomicAttestationUtils.sol\":\"AtomicAttestationUtils\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/Semver.sol\":{\"keccak256\":\"0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808\",\"dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"lib/eas-contracts/contracts/resolver/SchemaResolver.sol\":{\"keccak256\":\"0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828\",\"dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q\"]},\"lib/openzeppelin-contracts/contracts/utils/Bytes.sol\":{\"keccak256\":\"0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147\",\"dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR\"]},\"lib/openzeppelin-contracts/contracts/utils/Panic.sol\":{\"keccak256\":\"0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a\",\"dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG\"]},\"lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99\",\"dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N\"]},\"lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol\":{\"keccak256\":\"0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b\",\"dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM\"]},\"lib/openzeppelin-contracts/contracts/utils/Strings.sol\":{\"keccak256\":\"0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a\",\"dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol\":{\"keccak256\":\"0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377\",\"dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617\",\"dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u\"]},\"lib/openzeppelin-contracts/contracts/utils/math/Math.sol\":{\"keccak256\":\"0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c\",\"dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol\":{\"keccak256\":\"0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8\",\"dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy\"]},\"lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol\":{\"keccak256\":\"0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03\",\"dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ\"]},\"src/BaseArbiter.sol\":{\"keccak256\":\"0x27fa97834bcd6e592f3b534e64859b208c688363d33fb9b62436d009ffff3ed1\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b61ac6195ae644325adf77fdb301651cddfca4b63d9db5123ee075869f3784aa\",\"dweb:/ipfs/QmYRu5hER8gaMjqyY5bDV9EAwVN12CbS3Z2bW8dLp7sPSE\"]},\"src/BaseAttester.sol\":{\"keccak256\":\"0x12339a862aa0571244f4a0c2dae1a7bcc1734717474dbf0d69b63886987d1f99\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d40e983dece581ecb49a1a01bc87c66e86f8c954cc442a02151ec427d680682d\",\"dweb:/ipfs/QmVA7Tqk1KaYhrZpxWx3cdsjUoxsRaoBjJX8k6nCSEk8En\"]},\"src/BaseEscrowObligation.sol\":{\"keccak256\":\"0x49717032f4edbbfd52bf160a99b7b39f726e8a2f968ed4b261ee31b1622a22ac\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://1aba86a5094f4be28de1c5782087aff65c6d0bbc8ab124501e0677b5cab843f2\",\"dweb:/ipfs/QmXfo8c532ALhAUC9iae2mrSWLmDTSABunMJP2iU7PpKek\"]},\"src/BaseEscrowObligationUnconditional.sol\":{\"keccak256\":\"0x4b5953fe02bf51931db76577be2688e2193b0fbc387a077e52ab57c01d981d6b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://f83218c7d1dba95fe81ef42108978a8e67c93cd84991213e36693817b7e2aa3a\",\"dweb:/ipfs/QmSjVxWETZJC58XxyhVbwZ6iU77a6oXATvwjH7aJG7DofW\"]},\"src/BaseObligation.sol\":{\"keccak256\":\"0xf00b1317dd9203ea59e8da6c0bb23267b50ecb2751cd11b26a6330d1e596eb7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5b9762a2ba2251c6ae9d23aa3ba49a8124f3348ac13c9271b8b9ada438dff475\",\"dweb:/ipfs/QmeBZUvNjNyC7W1hb1PKQq8CawC5ULWX9KXgJjH37wvPGH\"]},\"src/IArbiter.sol\":{\"keccak256\":\"0x00f3f5d8460c738eff4a776cf309efe38342fcc951abfe97d1c2e285acb1e330\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://7201a176f3d5c3d01ca13bbcd9ef5587effe8fabf20e0b8f81f2d6ee362269b9\",\"dweb:/ipfs/QmXn9aSvoGPQuNTxe3mM47RNQ1bfYCEczQCYsDDM9ohc8M\"]},\"src/IEscrow.sol\":{\"keccak256\":\"0x8803bb72e285722a5e90f08046cfee7d37acc6cf83c13a5074cfb0740e316a45\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://965024e29be08418fd9acef578b5253af5fb0d39227c291298d83dae5d7ffd01\",\"dweb:/ipfs/QmPh2h21EC6L4aWauvk5cFzc4x3Xf4f1brxyrgxeKUuWEs\"]},\"src/libraries/ArbiterUtils.sol\":{\"keccak256\":\"0xb87e2bfb9c7292daf6426fbedc09c8683b92841d1b92e7359c0ff94d42be632f\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3acf498c3c59891d76db768ea57d8f7f6b4010dcbaf44a5f93d95d72f0b12441\",\"dweb:/ipfs/QmVbkioM8dWwYxqatm1dyo9PRFNZ6c7Kbang7pozbnyS7j\"]},\"src/libraries/SchemaRegistryUtils.sol\":{\"keccak256\":\"0x81e4728ad79515866f28175a00a512afd2f7010bd109ae221defb29a87430cd0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://4edac7284c764f1236b5875ed00f357f0e30aecc5006c88afe220bef60b541d3\",\"dweb:/ipfs/QmXj8oLa1RXMgHCXtgdbriVqQFgX6rjnPNbmQpwpK2YXsK\"]},\"src/obligations/escrow/default/AttestationReferenceEscrowObligation.sol\":{\"keccak256\":\"0x7029fdaa296e284b9f30f4b77493ff768f63c3d4ce0ee78411dc5439c9bc96b3\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://1a618255ef4385c169c3ad68c3b694edebc9d455a15b1fb5a9768cf08906fd11\",\"dweb:/ipfs/QmTCbUyZFPTAmigtRHURJZxkys6ar9Up7n4SXga8Cddr1P\"]},\"src/obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol\":{\"keccak256\":\"0xcf0947f953228231ef8d1778bdf890000b21e162411e0e00ebb4506cedeafd13\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://1dcf286a19e2a101a795a19217fc3658a1807e8327e20737abc3894ef5a65f3f\",\"dweb:/ipfs/QmVaTkp2BDi5esVwoZ41zgMhYh8TZ6YYFLBc3HyTXwog6a\"]},\"src/utils/atomic/AtomicAttestationUtils.sol\":{\"keccak256\":\"0xcff51656332c13298ffa92b65475e4b1c1dd51197c0459b0ae27bec7b40b8a31\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://08de8c09bdcb33c131d69b13590be7d04252d6ebc54f6cae6cf677704f03659c\",\"dweb:/ipfs/QmV4QqpDrdWzZMNb19DMkKfbpwB4nCr12GNDtjbjxDUhXx\"]}},\"version\":1}",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "IncorrectAttestationValue"
        },
        {
          "inputs": [
            {
              "internalType": "contract AttestationReferenceEscrowObligation",
              "name": "escrow",
              "type": "address"
            },
            {
              "internalType": "struct AttestationRequest",
              "name": "request",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "struct AttestationRequestData",
                  "name": "data",
                  "type": "tuple",
                  "components": [
                    {
                      "internalType": "address",
                      "name": "recipient",
                      "type": "address"
                    },
                    {
                      "internalType": "uint64",
                      "name": "expirationTime",
                      "type": "uint64"
                    },
                    {
                      "internalType": "bool",
                      "name": "revocable",
                      "type": "bool"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "refUID",
                      "type": "bytes32"
                    },
                    {
                      "internalType": "bytes",
                      "name": "data",
                      "type": "bytes"
                    },
                    {
                      "internalType": "uint256",
                      "name": "value",
                      "type": "uint256"
                    }
                  ]
                }
              ]
            },
            {
              "internalType": "struct AtomicAttestationUtils.ReferenceEscrowData",
              "name": "escrowData",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "uint64",
                  "name": "validationExpirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bool",
                  "name": "validationRevocable",
                  "type": "bool"
                }
              ]
            },
            {
              "internalType": "uint64",
              "name": "escrowExpirationTime",
              "type": "uint64"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "attestAndCreateReferenceEscrow",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "attestationUid",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "escrowUid",
              "type": "bytes32"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "contract UnconditionalAttestationReferenceEscrowObligation",
              "name": "escrow",
              "type": "address"
            },
            {
              "internalType": "struct AttestationRequest",
              "name": "request",
              "type": "tuple",
              "components": [
                {
                  "internalType": "bytes32",
                  "name": "schema",
                  "type": "bytes32"
                },
                {
                  "internalType": "struct AttestationRequestData",
                  "name": "data",
                  "type": "tuple",
                  "components": [
                    {
                      "internalType": "address",
                      "name": "recipient",
                      "type": "address"
                    },
                    {
                      "internalType": "uint64",
                      "name": "expirationTime",
                      "type": "uint64"
                    },
                    {
                      "internalType": "bool",
                      "name": "revocable",
                      "type": "bool"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "refUID",
                      "type": "bytes32"
                    },
                    {
                      "internalType": "bytes",
                      "name": "data",
                      "type": "bytes"
                    },
                    {
                      "internalType": "uint256",
                      "name": "value",
                      "type": "uint256"
                    }
                  ]
                }
              ]
            },
            {
              "internalType": "struct AtomicAttestationUtils.ReferenceEscrowData",
              "name": "escrowData",
              "type": "tuple",
              "components": [
                {
                  "internalType": "address",
                  "name": "arbiter",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "demand",
                  "type": "bytes"
                },
                {
                  "internalType": "uint64",
                  "name": "validationExpirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bool",
                  "name": "validationRevocable",
                  "type": "bool"
                }
              ]
            },
            {
              "internalType": "uint64",
              "name": "escrowExpirationTime",
              "type": "uint64"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "attestAndCreateUnconditionalReferenceEscrow",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "attestationUid",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "escrowUid",
              "type": "bytes32"
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
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {
          "constructor": {
            "params": {
              "_eas": "EAS contract used to create attestations."
            }
          }
        },
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {
          "attestAndCreateReferenceEscrow(address,(bytes32,(address,uint64,bool,bytes32,bytes,uint256)),(address,bytes,uint64,bool),uint64)": {
            "notice": "Creates an EAS attestation and then creates a default attestation-reference escrow for it."
          },
          "attestAndCreateUnconditionalReferenceEscrow(address,(bytes32,(address,uint64,bool,bytes32,bytes,uint256)),(address,bytes,uint64,bool),uint64)": {
            "notice": "Creates an EAS attestation and then creates an unconditional attestation-reference escrow for it."
          },
          "eas()": {
            "notice": "EAS contract used to create attestations."
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
        "src/utils/atomic/AtomicAttestationUtils.sol": "AtomicAttestationUtils"
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
      "lib/eas-contracts/contracts/Semver.sol": {
        "keccak256": "0x4f23442d048661b6aaa188ddc16b69cb310c2e44066b3852026afcb4201d61a9",
        "urls": [
          "bzz-raw://30c36e580cd93d9acb13e1a11e833946a8bd0bd2a8d1b2be049f0d96e0989808",
          "dweb:/ipfs/QmXmQTxKjSrUWutafQsqkbGufXqtzxuDAiMMJjXCHXiEqh"
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
      "lib/eas-contracts/contracts/resolver/SchemaResolver.sol": {
        "keccak256": "0x385d8c0edbdc96af15cf8f22333183162561cbf7d3fb0df95287741e59899983",
        "urls": [
          "bzz-raw://ff7e8a17f69dcb7ddc937446e868d34baea61bbe249a8f5d8be486ab93001828",
          "dweb:/ipfs/QmUz9i7ViNK9kUWHeJRtE44HmpbxBDGJBjyec2aPD6Nn3Q"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Bytes.sol": {
        "keccak256": "0x8140d608316521b1fd71167c3b708ebb8659da070723fc8807609553b296ee33",
        "urls": [
          "bzz-raw://a7bf7db66869ba1e945a0390b85da2f6afc7e42a4735ca918d0d56ac90c50147",
          "dweb:/ipfs/QmRmNyhpBpgzSdQqLtrQCYE7H7eLnVVxh2Yy4YMrySR8AR"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Panic.sol": {
        "keccak256": "0xf7fe324703a64fc51702311dc51562d5cb1497734f074e4f483bfb6717572d7a",
        "urls": [
          "bzz-raw://c6a5ff4f9fd8649b7ee20800b7fa387d3465bd77cf20c2d1068cd5c98e1ed57a",
          "dweb:/ipfs/QmVSaVJf9FXFhdYEYeCEfjMVHrxDh5qL4CGkxdMWpQCrqG"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol": {
        "keccak256": "0xa516cbf1c7d15d3517c2d668601ce016c54395bf5171918a14e2686977465f53",
        "urls": [
          "bzz-raw://1e1d079e8edfb58efd23a311e315a4807b01b5d1cf153f8fa2d0608b9dec3e99",
          "dweb:/ipfs/QmTBExeX2SDTkn5xbk5ssbYSx7VqRp9H4Ux1CY4uQM4b9N"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/StorageSlot.sol": {
        "keccak256": "0xcf74f855663ce2ae00ed8352666b7935f6cddea2932fdf2c3ecd30a9b1cd0e97",
        "urls": [
          "bzz-raw://9f660b1f351b757dfe01438e59888f31f33ded3afcf5cb5b0d9bf9aa6f320a8b",
          "dweb:/ipfs/QmarDJ5hZEgBtCmmrVzEZWjub9769eD686jmzb2XpSU1cM"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Strings.sol": {
        "keccak256": "0x36d1750bf1aa5fee9c52adb2f7857ab652daca722fc05dff533b364f67a1139a",
        "urls": [
          "bzz-raw://2e5e7052539b7849d02f3ce25acc1dce29373c11cfae9f0bc918c54b780c549a",
          "dweb:/ipfs/QmRGE32xNkMTo6i4pHHMxjpiu77yPwnTA25SFngw2NXJys"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/ERC165.sol": {
        "keccak256": "0x2d9dc2fe26180f74c11c13663647d38e259e45f95eb88f57b61d2160b0109d3e",
        "urls": [
          "bzz-raw://81233d1f98060113d9922180bb0f14f8335856fe9f339134b09335e9f678c377",
          "dweb:/ipfs/QmWh6R35SarhAn4z2wH8SU456jJSYL2FgucfTFgbHJJN4E"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
        "keccak256": "0x8891738ffe910f0cf2da09566928589bf5d63f4524dd734fd9cedbac3274dd5c",
        "urls": [
          "bzz-raw://971f954442df5c2ef5b5ebf1eb245d7105d9fbacc7386ee5c796df1d45b21617",
          "dweb:/ipfs/QmadRjHbkicwqwwh61raUEapaVEtaLMcYbQZWs9gUkgj3u"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/Math.sol": {
        "keccak256": "0x09e3f1c72d4c5cbe8e2644ab7313f8f7177533ae2f4c24cdcbbeaf520a73734c",
        "urls": [
          "bzz-raw://93208401215d539fa2d81626b207c1f611def7883d0e447b3b5969ebaa7b3c2c",
          "dweb:/ipfs/QmXPxDnQPx8LAweX5ZJqEcwkvs59kP4c64VVDG1Jjq1mef"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SafeCast.sol": {
        "keccak256": "0x195533c86d0ef72bcc06456a4f66a9b941f38eb403739b00f21fd7c1abd1ae54",
        "urls": [
          "bzz-raw://b1d578337048cad08c1c03041cca5978eff5428aa130c781b271ad9e5566e1f8",
          "dweb:/ipfs/QmPFKL2r9CBsMwmUqqdcFPfHZB2qcs9g1HDrPxzWSxomvy"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/math/SignedMath.sol": {
        "keccak256": "0xb1970fac7b64e6c09611e6691791e848d5e3fe410fa5899e7df2e0afd77a99e3",
        "urls": [
          "bzz-raw://db5fbb3dddd8b7047465b62575d96231ba8a2774d37fb4737fbf23340fabbb03",
          "dweb:/ipfs/QmVUSvooZKEdEdap619tcJjTLcAuH6QBdZqAzWwnAXZAWJ"
        ],
        "license": "MIT"
      },
      "src/BaseArbiter.sol": {
        "keccak256": "0x27fa97834bcd6e592f3b534e64859b208c688363d33fb9b62436d009ffff3ed1",
        "urls": [
          "bzz-raw://b61ac6195ae644325adf77fdb301651cddfca4b63d9db5123ee075869f3784aa",
          "dweb:/ipfs/QmYRu5hER8gaMjqyY5bDV9EAwVN12CbS3Z2bW8dLp7sPSE"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseAttester.sol": {
        "keccak256": "0x12339a862aa0571244f4a0c2dae1a7bcc1734717474dbf0d69b63886987d1f99",
        "urls": [
          "bzz-raw://d40e983dece581ecb49a1a01bc87c66e86f8c954cc442a02151ec427d680682d",
          "dweb:/ipfs/QmVA7Tqk1KaYhrZpxWx3cdsjUoxsRaoBjJX8k6nCSEk8En"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseEscrowObligation.sol": {
        "keccak256": "0x49717032f4edbbfd52bf160a99b7b39f726e8a2f968ed4b261ee31b1622a22ac",
        "urls": [
          "bzz-raw://1aba86a5094f4be28de1c5782087aff65c6d0bbc8ab124501e0677b5cab843f2",
          "dweb:/ipfs/QmXfo8c532ALhAUC9iae2mrSWLmDTSABunMJP2iU7PpKek"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseEscrowObligationUnconditional.sol": {
        "keccak256": "0x4b5953fe02bf51931db76577be2688e2193b0fbc387a077e52ab57c01d981d6b",
        "urls": [
          "bzz-raw://f83218c7d1dba95fe81ef42108978a8e67c93cd84991213e36693817b7e2aa3a",
          "dweb:/ipfs/QmSjVxWETZJC58XxyhVbwZ6iU77a6oXATvwjH7aJG7DofW"
        ],
        "license": "UNLICENSED"
      },
      "src/BaseObligation.sol": {
        "keccak256": "0xf00b1317dd9203ea59e8da6c0bb23267b50ecb2751cd11b26a6330d1e596eb7b",
        "urls": [
          "bzz-raw://5b9762a2ba2251c6ae9d23aa3ba49a8124f3348ac13c9271b8b9ada438dff475",
          "dweb:/ipfs/QmeBZUvNjNyC7W1hb1PKQq8CawC5ULWX9KXgJjH37wvPGH"
        ],
        "license": "UNLICENSED"
      },
      "src/IArbiter.sol": {
        "keccak256": "0x00f3f5d8460c738eff4a776cf309efe38342fcc951abfe97d1c2e285acb1e330",
        "urls": [
          "bzz-raw://7201a176f3d5c3d01ca13bbcd9ef5587effe8fabf20e0b8f81f2d6ee362269b9",
          "dweb:/ipfs/QmXn9aSvoGPQuNTxe3mM47RNQ1bfYCEczQCYsDDM9ohc8M"
        ],
        "license": "UNLICENSED"
      },
      "src/IEscrow.sol": {
        "keccak256": "0x8803bb72e285722a5e90f08046cfee7d37acc6cf83c13a5074cfb0740e316a45",
        "urls": [
          "bzz-raw://965024e29be08418fd9acef578b5253af5fb0d39227c291298d83dae5d7ffd01",
          "dweb:/ipfs/QmPh2h21EC6L4aWauvk5cFzc4x3Xf4f1brxyrgxeKUuWEs"
        ],
        "license": "UNLICENSED"
      },
      "src/libraries/ArbiterUtils.sol": {
        "keccak256": "0xb87e2bfb9c7292daf6426fbedc09c8683b92841d1b92e7359c0ff94d42be632f",
        "urls": [
          "bzz-raw://3acf498c3c59891d76db768ea57d8f7f6b4010dcbaf44a5f93d95d72f0b12441",
          "dweb:/ipfs/QmVbkioM8dWwYxqatm1dyo9PRFNZ6c7Kbang7pozbnyS7j"
        ],
        "license": "UNLICENSED"
      },
      "src/libraries/SchemaRegistryUtils.sol": {
        "keccak256": "0x81e4728ad79515866f28175a00a512afd2f7010bd109ae221defb29a87430cd0",
        "urls": [
          "bzz-raw://4edac7284c764f1236b5875ed00f357f0e30aecc5006c88afe220bef60b541d3",
          "dweb:/ipfs/QmXj8oLa1RXMgHCXtgdbriVqQFgX6rjnPNbmQpwpK2YXsK"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/default/AttestationReferenceEscrowObligation.sol": {
        "keccak256": "0x7029fdaa296e284b9f30f4b77493ff768f63c3d4ce0ee78411dc5439c9bc96b3",
        "urls": [
          "bzz-raw://1a618255ef4385c169c3ad68c3b694edebc9d455a15b1fb5a9768cf08906fd11",
          "dweb:/ipfs/QmTCbUyZFPTAmigtRHURJZxkys6ar9Up7n4SXga8Cddr1P"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/unconditional/UnconditionalAttestationReferenceEscrowObligation.sol": {
        "keccak256": "0xcf0947f953228231ef8d1778bdf890000b21e162411e0e00ebb4506cedeafd13",
        "urls": [
          "bzz-raw://1dcf286a19e2a101a795a19217fc3658a1807e8327e20737abc3894ef5a65f3f",
          "dweb:/ipfs/QmVaTkp2BDi5esVwoZ41zgMhYh8TZ6YYFLBc3HyTXwog6a"
        ],
        "license": "UNLICENSED"
      },
      "src/utils/atomic/AtomicAttestationUtils.sol": {
        "keccak256": "0xcff51656332c13298ffa92b65475e4b1c1dd51197c0459b0ae27bec7b40b8a31",
        "urls": [
          "bzz-raw://08de8c09bdcb33c131d69b13590be7d04252d6ebc54f6cae6cf677704f03659c",
          "dweb:/ipfs/QmV4QqpDrdWzZMNb19DMkKfbpwB4nCr12GNDtjbjxDUhXx"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 147
} as const;
