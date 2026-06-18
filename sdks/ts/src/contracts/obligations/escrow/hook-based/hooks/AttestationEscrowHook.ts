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
      "name": "decodeHookData",
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
          "internalType": "struct AttestationEscrowHook.HookData",
          "components": [
            {
              "name": "attestation",
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
            }
          ]
        }
      ],
      "stateMutability": "pure"
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
      "name": "encodeHookData",
      "inputs": [
        {
          "name": "hookData",
          "type": "tuple",
          "internalType": "struct AttestationEscrowHook.HookData",
          "components": [
            {
              "name": "attestation",
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
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "onLock",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "onRelease",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "onReturn",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "pending",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
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
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "pendingValue",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
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
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "error",
      "name": "AttestationCreationFailed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "IncorrectPayment",
      "inputs": [
        {
          "name": "expected",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "received",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "NativeTokenTransferFailed",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "NoPendingAttestation",
      "inputs": [
        {
          "name": "caller",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "hookDataHash",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "UnexpectedNativeValue",
      "inputs": []
    }
  ],
  "bytecode": {
    "object": "0x60a034606d57601f610a5138819003918201601f19168301916001600160401b03831184841017607157808492602094604052833981010312606d57516001600160a01b0381168103606d576080526040516109cb9081610086823960805181818161041401526105ab0152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c80631a6a5893146104f15780631dc8160b146104435780638150864d146103ff5780638b9d453914610308578063990df878146101a9578063c18dd49314610166578063df339519146101225763f73085df14610071575f80fd5b3461011e57602036600319011261011e576004356001600160401b03811161011e576100ff6100a761011a923690600401610636565b6040516100b381610776565b604051906100c0826107a5565b5f82526040516100cf816107c0565b5f81525f60208201525f60408201525f6060820152606060808201525f60a082015260208301525281019061087a565b60405191829160208352516020808401526040830190610707565b0390f35b5f80fd5b3461011e57604036600319011261011e576001600160a01b03610143610663565b165f52600160205260405f206024355f52602052602060405f2054604051908152f35b3461011e57604036600319011261011e576001600160a01b03610187610663565b165f525f60205260405f206024355f52602052602060405f2054604051908152f35b3461011e57602036600319011261011e576004356001600160401b03811161011e5780360390602060031983011261011e57604051602080820152916004820135906042190181121561011e576020604084015201600481013560608301526024810135903681900360c2190182121561011e576040608084015201600401906001600160a01b0361023a83610679565b1660a08201526001600160401b0361025460208401610859565b1660c08201526102666040830161086d565b151560e082015260608201356101008201526080820135601e198336030181121561011e5782016020813591016001600160401b03821161011e57813603811361011e57828260a061011a966102f4956101809560c061012087015281610160870152868601375f8584860101520135610140830152601f801991011681010301601f1981018352826107db565b6040519182916020835260208301906106e3565b3461011e576103163661068d565b5090610323368285610817565b6020815191012092335f525f60205260405f20845f5260205260405f205461034757005b61037760209160a093335f525f845260405f20875f52845260405f2061036d815461084d565b905581019061087a565b510151015191335f52600160205260405f20905f5260205260405f2061039e838254610988565b9055816103a8575b005b6001600160a01b03165f80808085855af13d156103fa573d6103c9816107fc565b906103d760405192836107db565b81525f60203d92013e5b6103a6576338f0620160e21b5f5260045260245260445ffd5b6103e1565b3461011e575f36600319011261011e576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b61044c3661068d565b505060a0602061045e8385018561087a565b5101510151918234036104da57610476913691610817565b60208151910120335f525f60205260405f20815f5260205260405f2080545f1981146104c6576001019055335f52600160205260405f20905f5260205260405f2080549182018092116104c65755005b634e487b7160e01b5f52601160045260245ffd5b82630d35e92160e01b5f526004523460245260445ffd5b3461011e576104ff3661068d565b50509061050d368383610817565b6020815191012091335f525f60205260405f20835f5260205260405f20541561061f57916105586020926105a794335f525f855260405f20845f52855260405f2061036d815461084d565b60a08382510151015191335f526001845260405f20905f52835260405f20610581838254610988565b90555190604051808095819463f17325e760e01b83528660048401526024830190610707565b03917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190816105f0575b506103a657638d7100d760e01b5f5260045ffd5b6020813d602011610617575b81610609602093836107db565b8101031261011e57516105dc565b3d91506105fc565b82634fb00a7b60e11b5f523360045260245260445ffd5b9181601f8401121561011e578235916001600160401b03831161011e576020838186019501011161011e57565b600435906001600160a01b038216820361011e57565b35906001600160a01b038216820361011e57565b606060031982011261011e57600435906001600160401b03821161011e576106b791600401610636565b90916024356001600160a01b038116810361011e57906044356001600160a01b038116810361011e5790565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a061076d608085015160c0808601526101008501906106e3565b93015191015290565b602081019081106001600160401b0382111761079157604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761079157604052565b60c081019081106001600160401b0382111761079157604052565b90601f801991011681019081106001600160401b0382111761079157604052565b6001600160401b03811161079157601f01601f191660200190565b929192610823826107fc565b9161083160405193846107db565b82948184528183011161011e578281602093845f960137010152565b80156104c6575f190190565b35906001600160401b038216820361011e57565b3590811515820361011e57565b60208183031261011e578035906001600160401b03821161011e57019060208282031261011e57604051916108ae83610776565b8035906001600160401b03821161011e57019060408282031261011e57604051916108d8836107a5565b803583526020810135906001600160401b03821161011e57019060c08282031261011e5760405191610909836107c0565b61091281610679565b835261092060208201610859565b60208401526109316040820161086d565b60408401526060810135606084015260808101356001600160401b03811161011e57810182601f8201121561011e5760a09281602061097293359101610817565b6080840152013560a08201526020820152815290565b919082039182116104c65756fea264697066735822122062c7097226aad3a6d4071c6e3832518e3d86cd1281de1d6e99714a3ea42ddc1564736f6c634300081b0033",
    "sourceMap": "841:3569:128:-:0;;;;;;;;;;;;;-1:-1:-1;;841:3569:128;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;1484:10;;841:3569;;;;;;;;1484:10;841:3569;;;;;;;;;;;;-1:-1:-1;841:3569:128;;;;;;-1:-1:-1;841:3569:128;;;;;-1:-1:-1;841:3569:128",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80631a6a5893146104f15780631dc8160b146104435780638150864d146103ff5780638b9d453914610308578063990df878146101a9578063c18dd49314610166578063df339519146101225763f73085df14610071575f80fd5b3461011e57602036600319011261011e576004356001600160401b03811161011e576100ff6100a761011a923690600401610636565b6040516100b381610776565b604051906100c0826107a5565b5f82526040516100cf816107c0565b5f81525f60208201525f60408201525f6060820152606060808201525f60a082015260208301525281019061087a565b60405191829160208352516020808401526040830190610707565b0390f35b5f80fd5b3461011e57604036600319011261011e576001600160a01b03610143610663565b165f52600160205260405f206024355f52602052602060405f2054604051908152f35b3461011e57604036600319011261011e576001600160a01b03610187610663565b165f525f60205260405f206024355f52602052602060405f2054604051908152f35b3461011e57602036600319011261011e576004356001600160401b03811161011e5780360390602060031983011261011e57604051602080820152916004820135906042190181121561011e576020604084015201600481013560608301526024810135903681900360c2190182121561011e576040608084015201600401906001600160a01b0361023a83610679565b1660a08201526001600160401b0361025460208401610859565b1660c08201526102666040830161086d565b151560e082015260608201356101008201526080820135601e198336030181121561011e5782016020813591016001600160401b03821161011e57813603811361011e57828260a061011a966102f4956101809560c061012087015281610160870152868601375f8584860101520135610140830152601f801991011681010301601f1981018352826107db565b6040519182916020835260208301906106e3565b3461011e576103163661068d565b5090610323368285610817565b6020815191012092335f525f60205260405f20845f5260205260405f205461034757005b61037760209160a093335f525f845260405f20875f52845260405f2061036d815461084d565b905581019061087a565b510151015191335f52600160205260405f20905f5260205260405f2061039e838254610988565b9055816103a8575b005b6001600160a01b03165f80808085855af13d156103fa573d6103c9816107fc565b906103d760405192836107db565b81525f60203d92013e5b6103a6576338f0620160e21b5f5260045260245260445ffd5b6103e1565b3461011e575f36600319011261011e576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b61044c3661068d565b505060a0602061045e8385018561087a565b5101510151918234036104da57610476913691610817565b60208151910120335f525f60205260405f20815f5260205260405f2080545f1981146104c6576001019055335f52600160205260405f20905f5260205260405f2080549182018092116104c65755005b634e487b7160e01b5f52601160045260245ffd5b82630d35e92160e01b5f526004523460245260445ffd5b3461011e576104ff3661068d565b50509061050d368383610817565b6020815191012091335f525f60205260405f20835f5260205260405f20541561061f57916105586020926105a794335f525f855260405f20845f52855260405f2061036d815461084d565b60a08382510151015191335f526001845260405f20905f52835260405f20610581838254610988565b90555190604051808095819463f17325e760e01b83528660048401526024830190610707565b03917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af190816105f0575b506103a657638d7100d760e01b5f5260045ffd5b6020813d602011610617575b81610609602093836107db565b8101031261011e57516105dc565b3d91506105fc565b82634fb00a7b60e11b5f523360045260245260445ffd5b9181601f8401121561011e578235916001600160401b03831161011e576020838186019501011161011e57565b600435906001600160a01b038216820361011e57565b35906001600160a01b038216820361011e57565b606060031982011261011e57600435906001600160401b03821161011e576106b791600401610636565b90916024356001600160a01b038116810361011e57906044356001600160a01b038116810361011e5790565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a061076d608085015160c0808601526101008501906106e3565b93015191015290565b602081019081106001600160401b0382111761079157604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761079157604052565b60c081019081106001600160401b0382111761079157604052565b90601f801991011681019081106001600160401b0382111761079157604052565b6001600160401b03811161079157601f01601f191660200190565b929192610823826107fc565b9161083160405193846107db565b82948184528183011161011e578281602093845f960137010152565b80156104c6575f190190565b35906001600160401b038216820361011e57565b3590811515820361011e57565b60208183031261011e578035906001600160401b03821161011e57019060208282031261011e57604051916108ae83610776565b8035906001600160401b03821161011e57019060408282031261011e57604051916108d8836107a5565b803583526020810135906001600160401b03821161011e57019060c08282031261011e5760405191610909836107c0565b61091281610679565b835261092060208201610859565b60208401526109316040820161086d565b60408401526060810135606084015260808101356001600160401b03811161011e57810182601f8201121561011e5760a09281602061097293359101610817565b6080840152013560a08201526020820152815290565b919082039182116104c65756fea264697066735822122062c7097226aad3a6d4071c6e3832518e3d86cd1281de1d6e99714a3ea42ddc1564736f6c634300081b0033",
    "sourceMap": "841:3569:128:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;841:3569:128;;;;;;-1:-1:-1;;;;;841:3569:128;;;;4373:28;841:3569;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4373:28;;;;:::i;:::-;841:3569;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;;841:3569:128;;;;-1:-1:-1;;;;;841:3569:128;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;841:3569:128;;;;-1:-1:-1;;;;;841:3569:128;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;841:3569:128;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;;;;4238:20;;;841:3569;;;;;;;-1:-1:-1;;841:3569:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;841:3569:128;;;;;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;:::i;:::-;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;4238:20;841:3569;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4238:20;;841:3569;;4238:20;;;;;;:::i;:::-;841:3569;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;3269:15;3306:10;;841:3569;;;;;;;;;;;;;;;;;3294:509;;841:3569;3294:509;3418:28;841:3569;3306:10;3484:30;3306:10;;841:3569;;;;;;;;;;;;;;;;3347:31;841:3569;;3347:31;:::i;:::-;841:3569;;3418:28;;;;:::i;:::-;3484:19;:24;;:30;841:3569;3306:10;;841:3569;;3528:12;841:3569;;;;;;;;;;;;;3528:51;841:3569;;;3528:51;:::i;:::-;841:3569;;3597:18;3593:200;;3294:509;841:3569;3593:200;-1:-1:-1;;;;;841:3569:128;;;;;3653:42;841:3569;3653:42;;841:3569;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;3593:200;3713:65;3734:44;;;841:3569;3734:44;841:3569;;;;;;3734:44;841:3569;;;;;;;;;-1:-1:-1;;841:3569:128;;;;;;962:25;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;:::i;:::-;1861:28;;1923:30;:24;1861:28;;;;;;:::i;:::-;1923:19;:24;;:30;841:3569;1967:9;;;:26;1963:81;;841:3569;;;;;:::i;:::-;1923:24;841:3569;;;;2184:15;2217:10;841:3569;;;1923:24;841:3569;;;;;;;1923:24;841:3569;;;;;;;;;;;;;;;;2217:10;841:3569;;;1923:24;841:3569;;;;;;;1923:24;841:3569;;;;;;;;;;;;;;;;;;;;;;;;;;;;1963:81;2002:42;;;;841:3569;2002:42;841:3569;;1967:9;841:3569;;;;2002:42;841:3569;;;;;;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;2499:15;2536:10;;841:3569;;;;;;;;;;;;;;;;;2528:34;2524:114;;2536:10;2716:28;841:3569;2536:10;841:3569;2536:10;;841:3569;;;;;;;;;;;;;;;;2648:31;841:3569;;2648:31;:::i;2716:28::-;2778:30;:19;;;:24;;:30;841:3569;2536:10;;841:3569;;2818:12;841:3569;;;;;;;;;;;;;2818:51;841:3569;;;2818:51;:::i;:::-;841:3569;;2917:19;841:3569;;;;;;;;;;;2884:53;;;841:3569;2884:53;;841:3569;;;;;;:::i;:::-;2884:53;;:3;-1:-1:-1;;;;;841:3569:128;2884:53;;;;;;841:3569;-1:-1:-1;2880:134:128;;2976:27;;;841:3569;2976:27;841:3569;;2976:27;2884:53;841:3569;2884:53;;841:3569;2884:53;;;;;;841:3569;2884:53;;;:::i;:::-;;;841:3569;;;;;2884:53;;;;;-1:-1:-1;2884:53:128;;2524:114;2585:42;;;;841:3569;2585:42;2536:10;841:3569;;;;;;2585:42;841:3569;;;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;841:3569:128;;;;;;:::o;:::-;;;-1:-1:-1;;;;;841:3569:128;;;;;;:::o;:::-;;-1:-1:-1;;841:3569:128;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;841:3569:128;;;;;;;;-1:-1:-1;;841:3569:128;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;:::o;:::-;;;;-1:-1:-1;841:3569:128;;;;;-1:-1:-1;841:3569:128;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;:::o;:::-;-1:-1:-1;;;;;841:3569:128;;;;;;-1:-1:-1;;841:3569:128;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;841:3569:128;;;;;;:::o;:::-;;;;;-1:-1:-1;;841:3569:128;;:::o;:::-;;;-1:-1:-1;;;;;841:3569:128;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;841:3569:128;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "65908": [
        {
          "start": 1044,
          "length": 32
        },
        {
          "start": 1451,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "decodeHookData(bytes)": "f73085df",
    "eas()": "8150864d",
    "encodeHookData(((bytes32,(address,uint64,bool,bytes32,bytes,uint256))))": "990df878",
    "onLock(bytes,address,address)": "1dc8160b",
    "onRelease(bytes,address,address)": "1a6a5893",
    "onReturn(bytes,address,address)": "8b9d4539",
    "pending(address,bytes32)": "c18dd493",
    "pendingValue(address,bytes32)": "df339519"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AttestationCreationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\"}],\"name\":\"IncorrectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"hookDataHash\",\"type\":\"bytes32\"}],\"name\":\"NoPendingAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnexpectedNativeValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeHookData\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationEscrowHook.HookData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"eas\",\"outputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationEscrowHook.HookData\",\"name\":\"hookData\",\"type\":\"tuple\"}],\"name\":\"encodeHookData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onLock\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onReturn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"pending\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"pendingValue\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"hookData is abi.encode(HookData).      No assets are locked or returned \\u2014 the \\\"escrow\\\" is a promise to      create an attestation upon fulfillment.      On lock:    no-op (nothing to escrow).      On release: creates the attestation via EAS. The attester is this                  hook contract.      On return:  no-op (nothing to return).      No per-caller deposit tracking needed since there are no assets.      However, we track a nonce per-caller to prevent replay of release      calls for the same escrow.\",\"kind\":\"dev\",\"methods\":{},\"title\":\"AttestationEscrowHook\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"pending(address,bytes32)\":{\"notice\":\"Tracks pending releases: caller \\u2192 hookDataHash \\u2192 count.\"}},\"notice\":\"An IEscrowHook that creates an EAS attestation on release.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol\":\"AttestationEscrowHook\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x9937854ef875b24d7a2b961f8188bb380bfc385796a2dece839856a515eeeca0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://d12dc1ef365e83189196d3d026b71ed899d8c8758dfabb33b5d9b4305898f606\",\"dweb:/ipfs/QmW8QpxkbXY9U3VVkrKx17cci5pAnWePehEfp8Zr6Ya4rM\"]},\"src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol\":{\"keccak256\":\"0xa0558be702af3b78d596d3a0e26dce8021069e86f349b071223d676686b1f92c\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://2d6f631117eb35f0f087c65dd1cabb46205894501c3c5c3e188f5331e5ed9ce6\",\"dweb:/ipfs/QmYq4KQeLCrP6RYG6wVf6gMHCpcb3BH6ahf73TYYrW2218\"]}},\"version\":1}",
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
          "name": "AttestationCreationFailed"
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
              "name": "received",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "IncorrectPayment"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "type": "error",
          "name": "NativeTokenTransferFailed"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "hookDataHash",
              "type": "bytes32"
            }
          ],
          "type": "error",
          "name": "NoPendingAttestation"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "UnexpectedNativeValue"
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
          "name": "decodeHookData",
          "outputs": [
            {
              "internalType": "struct AttestationEscrowHook.HookData",
              "name": "",
              "type": "tuple",
              "components": [
                {
                  "internalType": "struct AttestationRequest",
                  "name": "attestation",
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
                }
              ]
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
              "internalType": "struct AttestationEscrowHook.HookData",
              "name": "hookData",
              "type": "tuple",
              "components": [
                {
                  "internalType": "struct AttestationRequest",
                  "name": "attestation",
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
                }
              ]
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "name": "encodeHookData",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ]
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "name": "onLock"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onRelease"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onReturn"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "pending",
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
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "name": "pendingValue",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
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
        "methods": {
          "pending(address,bytes32)": {
            "notice": "Tracks pending releases: caller → hookDataHash → count."
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
        "src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol": "AttestationEscrowHook"
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
      "src/obligations/escrow/hook-based/IEscrowHook.sol": {
        "keccak256": "0x9937854ef875b24d7a2b961f8188bb380bfc385796a2dece839856a515eeeca0",
        "urls": [
          "bzz-raw://d12dc1ef365e83189196d3d026b71ed899d8c8758dfabb33b5d9b4305898f606",
          "dweb:/ipfs/QmW8QpxkbXY9U3VVkrKx17cci5pAnWePehEfp8Zr6Ya4rM"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol": {
        "keccak256": "0xa0558be702af3b78d596d3a0e26dce8021069e86f349b071223d676686b1f92c",
        "urls": [
          "bzz-raw://2d6f631117eb35f0f087c65dd1cabb46205894501c3c5c3e188f5331e5ed9ce6",
          "dweb:/ipfs/QmYq4KQeLCrP6RYG6wVf6gMHCpcb3BH6ahf73TYYrW2218"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 128
} as const;
