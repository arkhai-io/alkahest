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
      "name": "onAttest",
      "inputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "",
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
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
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
          "type": "bytes32",
          "internalType": "bytes32"
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
    "object": "0x60a034606d57601f610b4d38819003918201601f19168301916001600160401b03831184841017607157808492602094604052833981010312606d57516001600160a01b0381168103606d57608052604051610ac79081610086823960805181818161037d01526106d10152f35b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c80630fa37a1f146105cd5780631dc8160b146104ed578063561ca525146103ac5780638150864d14610368578063990df87814610209578063be1e753b146101b4578063c18dd49314610171578063df3395191461012d5763f73085df1461007c575f80fd5b34610129576020366003190112610129576004356001600160401b0381116101295761010a6100b261012592369060040161075c565b6040516100be81610872565b604051906100cb826108a1565b5f82526040516100da816108bc565b5f81525f60208201525f60408201525f6060820152606060808201525f60a0820152602083015252810190610976565b60405191829160208352516020808401526040830190610803565b0390f35b5f80fd5b34610129576040366003190112610129576001600160a01b0361014e6107b5565b165f52600160205260405f206024355f52602052602060405f2054604051908152f35b34610129576040366003190112610129576001600160a01b036101926107b5565b165f525f60205260405f206024355f52602052602060405f2054604051908152f35b34610129576040366003190112610129576004356001600160401b038111610129576101e490369060040161075c565b50506024356001600160401b0381116101295761014090600319903603011261012957005b34610129576020366003190112610129576004356001600160401b03811161012957803603906020600319830112610129576040516020808201529160048201359060421901811215610129576020604084015201600481013560608301526024810135903681900360c21901821215610129576040608084015201600401906001600160a01b0361029a836107cb565b1660a08201526001600160401b036102b460208401610955565b1660c08201526102c660408301610969565b151560e082015260608201356101008201526080820135601e19833603018112156101295782016020813591016001600160401b03821161012957813603811361012957828260a061012596610354956101809560c061012087015281610160870152868601375f8584860101520135610140830152601f801991011681010301601f1981018352826108d7565b6040519182916020835260208301906107df565b34610129575f366003190112610129576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610129576060366003190112610129576004356001600160401b038111610129576103dc90369060040161075c565b6103e4610789565b906044356001600160401b0381116101295761014090600319903603011261012957610411368285610913565b6020815191012092335f525f60205260405f20845f5260205260405f205461043557005b61046560209160a093335f525f845260405f20875f52845260405f2061045b8154610949565b9055810190610976565b510151015191335f52600160205260405f20905f5260205260405f2061048c838254610a84565b905581610496575b005b6001600160a01b03165f80808085855af13d156104e8573d6104b7816108f8565b906104c560405192836108d7565b81525f60203d92013e5b610494576338f0620160e21b5f5260045260245260445ffd5b6104cf565b6060366003190112610129576004356001600160401b0381116101295761051890369060040161075c565b610520610789565b5061052961079f565b5060a0602061053a83850185610976565b5101510151918234036105b657610552913691610913565b60208151910120335f525f60205260405f20815f5260205260405f2080545f1981146105a2576001019055335f52600160205260405f20905f5260205260405f2080549182018092116105a25755005b634e487b7160e01b5f52601160045260245ffd5b82630d35e92160e01b5f526004523460245260445ffd5b34610129576080366003190112610129576004356001600160401b038111610129576105fd90369060040161075c565b90610606610789565b506044356001600160401b0381116101295761014090600319903603011261012957610633368383610913565b6020815191012091335f525f60205260405f20835f5260205260405f205415610745579161067e6020926106cd94335f525f855260405f20845f52855260405f2061045b8154610949565b60a08382510151015191335f526001845260405f20905f52835260405f206106a7838254610a84565b90555190604051808095819463f17325e760e01b83528660048401526024830190610803565b03917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19081610716575b5061049457638d7100d760e01b5f5260045ffd5b6020813d60201161073d575b8161072f602093836108d7565b810103126101295751610702565b3d9150610722565b82634fb00a7b60e11b5f523360045260245260445ffd5b9181601f84011215610129578235916001600160401b038311610129576020838186019501011161012957565b602435906001600160a01b038216820361012957565b604435906001600160a01b038216820361012957565b600435906001600160a01b038216820361012957565b35906001600160a01b038216820361012957565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a0610869608085015160c0808601526101008501906107df565b93015191015290565b602081019081106001600160401b0382111761088d57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761088d57604052565b60c081019081106001600160401b0382111761088d57604052565b90601f801991011681019081106001600160401b0382111761088d57604052565b6001600160401b03811161088d57601f01601f191660200190565b92919261091f826108f8565b9161092d60405193846108d7565b829481845281830111610129578281602093845f960137010152565b80156105a2575f190190565b35906001600160401b038216820361012957565b3590811515820361012957565b602081830312610129578035906001600160401b03821161012957019060208282031261012957604051916109aa83610872565b8035906001600160401b03821161012957019060408282031261012957604051916109d4836108a1565b803583526020810135906001600160401b03821161012957019060c0828203126101295760405191610a05836108bc565b610a0e816107cb565b8352610a1c60208201610955565b6020840152610a2d60408201610969565b60408401526060810135606084015260808101356001600160401b03811161012957810182601f820112156101295760a092816020610a6e93359101610913565b6080840152013560a08201526020820152815290565b919082039182116105a25756fea2646970667358221220bb0108fdf5199949369421094ef0f40f729e2b3d5d2b6446cfcab7cf9e9af4fc64736f6c634300081b0033",
    "sourceMap": "886:3715:87:-:0;;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;1529:10;;886:3715;;;;;;;;1529:10;886:3715;;;;;;;;;;;;-1:-1:-1;886:3715:87;;;;;;-1:-1:-1;886:3715:87;;;;;-1:-1:-1;886:3715:87",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x60806040526004361015610011575f80fd5b5f3560e01c80630fa37a1f146105cd5780631dc8160b146104ed578063561ca525146103ac5780638150864d14610368578063990df87814610209578063be1e753b146101b4578063c18dd49314610171578063df3395191461012d5763f73085df1461007c575f80fd5b34610129576020366003190112610129576004356001600160401b0381116101295761010a6100b261012592369060040161075c565b6040516100be81610872565b604051906100cb826108a1565b5f82526040516100da816108bc565b5f81525f60208201525f60408201525f6060820152606060808201525f60a0820152602083015252810190610976565b60405191829160208352516020808401526040830190610803565b0390f35b5f80fd5b34610129576040366003190112610129576001600160a01b0361014e6107b5565b165f52600160205260405f206024355f52602052602060405f2054604051908152f35b34610129576040366003190112610129576001600160a01b036101926107b5565b165f525f60205260405f206024355f52602052602060405f2054604051908152f35b34610129576040366003190112610129576004356001600160401b038111610129576101e490369060040161075c565b50506024356001600160401b0381116101295761014090600319903603011261012957005b34610129576020366003190112610129576004356001600160401b03811161012957803603906020600319830112610129576040516020808201529160048201359060421901811215610129576020604084015201600481013560608301526024810135903681900360c21901821215610129576040608084015201600401906001600160a01b0361029a836107cb565b1660a08201526001600160401b036102b460208401610955565b1660c08201526102c660408301610969565b151560e082015260608201356101008201526080820135601e19833603018112156101295782016020813591016001600160401b03821161012957813603811361012957828260a061012596610354956101809560c061012087015281610160870152868601375f8584860101520135610140830152601f801991011681010301601f1981018352826108d7565b6040519182916020835260208301906107df565b34610129575f366003190112610129576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610129576060366003190112610129576004356001600160401b038111610129576103dc90369060040161075c565b6103e4610789565b906044356001600160401b0381116101295761014090600319903603011261012957610411368285610913565b6020815191012092335f525f60205260405f20845f5260205260405f205461043557005b61046560209160a093335f525f845260405f20875f52845260405f2061045b8154610949565b9055810190610976565b510151015191335f52600160205260405f20905f5260205260405f2061048c838254610a84565b905581610496575b005b6001600160a01b03165f80808085855af13d156104e8573d6104b7816108f8565b906104c560405192836108d7565b81525f60203d92013e5b610494576338f0620160e21b5f5260045260245260445ffd5b6104cf565b6060366003190112610129576004356001600160401b0381116101295761051890369060040161075c565b610520610789565b5061052961079f565b5060a0602061053a83850185610976565b5101510151918234036105b657610552913691610913565b60208151910120335f525f60205260405f20815f5260205260405f2080545f1981146105a2576001019055335f52600160205260405f20905f5260205260405f2080549182018092116105a25755005b634e487b7160e01b5f52601160045260245ffd5b82630d35e92160e01b5f526004523460245260445ffd5b34610129576080366003190112610129576004356001600160401b038111610129576105fd90369060040161075c565b90610606610789565b506044356001600160401b0381116101295761014090600319903603011261012957610633368383610913565b6020815191012091335f525f60205260405f20835f5260205260405f205415610745579161067e6020926106cd94335f525f855260405f20845f52855260405f2061045b8154610949565b60a08382510151015191335f526001845260405f20905f52835260405f206106a7838254610a84565b90555190604051808095819463f17325e760e01b83528660048401526024830190610803565b03917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19081610716575b5061049457638d7100d760e01b5f5260045ffd5b6020813d60201161073d575b8161072f602093836108d7565b810103126101295751610702565b3d9150610722565b82634fb00a7b60e11b5f523360045260245260445ffd5b9181601f84011215610129578235916001600160401b038311610129576020838186019501011161012957565b602435906001600160a01b038216820361012957565b604435906001600160a01b038216820361012957565b600435906001600160a01b038216820361012957565b35906001600160a01b038216820361012957565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b602090805183520151906040602082015260018060a01b0382511660408201526001600160401b036020830151166060820152604082015115156080820152606082015160a082015260e060a0610869608085015160c0808601526101008501906107df565b93015191015290565b602081019081106001600160401b0382111761088d57604052565b634e487b7160e01b5f52604160045260245ffd5b604081019081106001600160401b0382111761088d57604052565b60c081019081106001600160401b0382111761088d57604052565b90601f801991011681019081106001600160401b0382111761088d57604052565b6001600160401b03811161088d57601f01601f191660200190565b92919261091f826108f8565b9161092d60405193846108d7565b829481845281830111610129578281602093845f960137010152565b80156105a2575f190190565b35906001600160401b038216820361012957565b3590811515820361012957565b602081830312610129578035906001600160401b03821161012957019060208282031261012957604051916109aa83610872565b8035906001600160401b03821161012957019060408282031261012957604051916109d4836108a1565b803583526020810135906001600160401b03821161012957019060c0828203126101295760405191610a05836108bc565b610a0e816107cb565b8352610a1c60208201610955565b6020840152610a2d60408201610969565b60408401526060810135606084015260808101356001600160401b03811161012957810182601f820112156101295760a092816020610a6e93359101610913565b6080840152013560a08201526020820152815290565b919082039182116105a25756fea2646970667358221220bb0108fdf5199949369421094ef0f40f729e2b3d5d2b6446cfcab7cf9e9af4fc64736f6c634300081b0033",
    "sourceMap": "886:3715:87:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;;;-1:-1:-1;;;;;886:3715:87;;;;4564:28;886:3715;;;;;;;;:::i;:::-;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4564:28;;;;:::i;:::-;886:3715;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;-1:-1:-1;;;;;886:3715:87;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;-1:-1:-1;;;;;886:3715:87;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;:::i;:::-;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;4429:20;;;886:3715;;;;;;;-1:-1:-1;;886:3715:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;:::i;:::-;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;:::i;:::-;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;4429:20;886:3715;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4429:20;;886:3715;;4429:20;;;;;;:::i;:::-;886:3715;;;;;;;;;;;;;:::i;:::-;;;;;;-1:-1:-1;;886:3715:87;;;;;;1007:25;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;-1:-1:-1;;886:3715:87;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;3460:15;3497:10;;886:3715;;;;;;;;;;;;;;;;;3485:509;;886:3715;3485:509;3609:28;886:3715;3497:10;3675:30;3497:10;;886:3715;;;;;;;;;;;;;;;;3538:31;886:3715;;3538:31;:::i;:::-;886:3715;;3609:28;;;;:::i;:::-;3675:19;:24;;:30;886:3715;3497:10;;886:3715;;3719:12;886:3715;;;;;;;;;;;;;3719:51;886:3715;;;3719:51;:::i;:::-;886:3715;;3788:18;3784:200;;3485:509;886:3715;3784:200;-1:-1:-1;;;;;886:3715:87;;;;;3844:42;886:3715;3844:42;;886:3715;;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;3784:200;3904:65;3925:44;;;886:3715;3925:44;886:3715;;;;;;3925:44;886:3715;;;;;;-1:-1:-1;;886:3715:87;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;:::i;:::-;;;:::i;:::-;;;;:::i;:::-;;1968:30;886:3715;1906:28;;;;;;:::i;:::-;1968:19;:24;;:30;886:3715;2012:9;;;:26;2008:81;;886:3715;;;;;:::i;:::-;;;;;;2229:15;2262:10;886:3715;;;;;;;;;;;;;;;;;;;;;;;;;;;;2262:10;886:3715;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2008:81;2047:42;;;;886:3715;2047:42;886:3715;;2012:9;886:3715;;;;2047:42;886:3715;;;;;;-1:-1:-1;;886:3715:87;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;2677:15;2714:10;;886:3715;;;;;;;;;;;;;;;;;2706:34;2702:114;;2714:10;2894:28;886:3715;2714:10;886:3715;2714:10;;886:3715;;;;;;;;;;;;;;;;2826:31;886:3715;;2826:31;:::i;2894:28::-;2956:30;:19;;;:24;;:30;886:3715;2714:10;;886:3715;;;;;;;;;;;;;;;;2996:51;886:3715;;;2996:51;:::i;:::-;886:3715;;3095:19;886:3715;;;;;;;;;;;3062:53;;;886:3715;3062:53;;886:3715;;;;;;:::i;:::-;3062:53;;:3;-1:-1:-1;;;;;886:3715:87;3062:53;;;;;;886:3715;-1:-1:-1;3058:134:87;;3154:27;;;886:3715;3154:27;886:3715;;3154:27;3062:53;886:3715;3062:53;;886:3715;3062:53;;;;;;886:3715;3062:53;;;:::i;:::-;;;886:3715;;;;;3062:53;;;;;-1:-1:-1;3062:53:87;;2702:114;2763:42;;;;886:3715;2763:42;2714:10;886:3715;;;;;;2763:42;886:3715;;;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;886:3715:87;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;886:3715:87;;;;;;:::o;:::-;;;;-1:-1:-1;;;;;886:3715:87;;;;;;:::o;:::-;;;-1:-1:-1;;;;;886:3715:87;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;886:3715:87;;;;;;;;-1:-1:-1;;886:3715:87;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;:::o;:::-;;;;-1:-1:-1;886:3715:87;;;;;-1:-1:-1;886:3715:87;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;:::o;:::-;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;:::o;:::-;-1:-1:-1;;;;;886:3715:87;;;;;;-1:-1:-1;;886:3715:87;;;;:::o;:::-;;;;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;886:3715:87;;;;;;:::o;:::-;;;;;-1:-1:-1;;886:3715:87;;:::o;:::-;;;-1:-1:-1;;;;;886:3715:87;;;;;;:::o;:::-;;;;;;;;;;:::o;:::-;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::i;:::-;;;;;;;;:::i;:::-;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;886:3715:87;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "57777": [
        {
          "start": 893,
          "length": 32
        },
        {
          "start": 1745,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "decodeHookData(bytes)": "f73085df",
    "eas()": "8150864d",
    "encodeHookData(((bytes32,(address,uint64,bool,bytes32,bytes,uint256))))": "990df878",
    "onAttest(bytes,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "be1e753b",
    "onLock(bytes,address,address)": "1dc8160b",
    "onRelease(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes),bytes32)": "0fa37a1f",
    "onReturn(bytes,address,(bytes32,bytes32,uint64,uint64,uint64,bytes32,address,address,bool,bytes))": "561ca525",
    "pending(address,bytes32)": "c18dd493",
    "pendingValue(address,bytes32)": "df339519"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.27+commit.40a35a09\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"_eas\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AttestationCreationFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\"}],\"name\":\"IncorrectPayment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"NativeTokenTransferFailed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"hookDataHash\",\"type\":\"bytes32\"}],\"name\":\"NoPendingAttestation\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"UnexpectedNativeValue\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"decodeHookData\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationEscrowHook.HookData\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"eas\",\"outputs\":[{\"internalType\":\"contract IEAS\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"components\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"internalType\":\"struct AttestationRequestData\",\"name\":\"data\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationRequest\",\"name\":\"attestation\",\"type\":\"tuple\"}],\"internalType\":\"struct AttestationEscrowHook.HookData\",\"name\":\"hookData\",\"type\":\"tuple\"}],\"name\":\"encodeHookData\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onAttest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"onLock\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"onRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes32\",\"name\":\"uid\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"schema\",\"type\":\"bytes32\"},{\"internalType\":\"uint64\",\"name\":\"time\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"expirationTime\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"revocationTime\",\"type\":\"uint64\"},{\"internalType\":\"bytes32\",\"name\":\"refUID\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"attester\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"revocable\",\"type\":\"bool\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"internalType\":\"struct Attestation\",\"name\":\"\",\"type\":\"tuple\"}],\"name\":\"onReturn\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"pending\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"pendingValue\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"hookData is abi.encode(HookData).      No assets are locked or returned \\u2014 the \\\"escrow\\\" is a promise to      create an attestation upon fulfillment.      On lock:    no-op (nothing to escrow).      On release: creates the attestation via EAS. The attester is this                  hook contract.      On return:  no-op (nothing to return).      No per-caller deposit tracking needed since there are no assets.      However, we track a nonce per-caller to prevent replay of release      calls for the same escrow.\",\"kind\":\"dev\",\"methods\":{},\"title\":\"AttestationEscrowHook\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"pending(address,bytes32)\":{\"notice\":\"Tracks pending releases: caller \\u2192 hookDataHash \\u2192 count.\"}},\"notice\":\"An IEscrowHook that creates an EAS attestation on release.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol\":\"AttestationEscrowHook\"},\"evmVersion\":\"prague\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@eas/=lib/eas-contracts/contracts/\",\":@erc8004/=lib/erc-8004-contracts/contracts/\",\":@openzeppelin/=lib/openzeppelin-contracts/\",\":@src/=src/\",\":@test/=test/\",\":ds-test/=lib/openzeppelin-contracts/lib/forge-std/lib/ds-test/src/\",\":eas-contracts/=lib/eas-contracts/contracts/\",\":erc-8004-contracts/=lib/erc-8004-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":eth-gas-reporter/=lib/eas-contracts/node_modules/eth-gas-reporter/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":hardhat-deploy/=lib/eas-contracts/node_modules/hardhat-deploy/\",\":hardhat/=lib/eas-contracts/node_modules/hardhat/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"],\"viaIR\":true},\"sources\":{\"lib/eas-contracts/contracts/Common.sol\":{\"keccak256\":\"0x957bd2e6d0d6d637f86208b135c29fbaf4412cb08e5e7a61ede16b80561bf685\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da1dc9aedbb1d4d39c46c2235918d3adfbc5741dd34a46010cf425d134e7936d\",\"dweb:/ipfs/QmWUk6bXnLaghS2riF3GTFEeURCzgYFMA5woa6AsgPwEgc\"]},\"lib/eas-contracts/contracts/IEAS.sol\":{\"keccak256\":\"0xdad0674defce04905dc7935f2756d6c477a6e876c0b1b7094b112a862f164c12\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://49e448c26c08952df034692d2ab3519dd40a1ebbeae4ce68b294567441933880\",\"dweb:/ipfs/QmWHcudjskUSCjgqsNWE65LVfWvcYB2vBn8RB1SmzvRLNR\"]},\"lib/eas-contracts/contracts/ISchemaRegistry.sol\":{\"keccak256\":\"0xea97dcd36a0c422169cbaac06698249e199049b627c16bff93fb8ab829058754\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://d453a929ef64a69cd31195ec2ee5ed1193bfa29f633e13c960e92154c37ad158\",\"dweb:/ipfs/QmXs1Z3njbHs2EMgHonrZDfcwdog4kozHY5tYNrhZK5yqz\"]},\"lib/eas-contracts/contracts/ISemver.sol\":{\"keccak256\":\"0x04a67939b4e1a8d0a51101b8f69f8882930bbdc66319f38023828625b5d1ff18\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3dd543fa0e33cef1ea757627f9c2a10a66ee1ce17aa9087f437c5b53a903c7f0\",\"dweb:/ipfs/QmXsy6UsGBzF9zPCCjmiwPpCcX3tHqU13TmR67B69tKnR6\"]},\"lib/eas-contracts/contracts/resolver/ISchemaResolver.sol\":{\"keccak256\":\"0xb7d1961ed928c620cddf35c2bf46845b10828bc5d73145214630202ed355b6bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://cf1cabacfb15c9bace8280b540b52e5aa440e1b4eba675f9782c34ce0f03902f\",\"dweb:/ipfs/QmakYcK4xbrijzvoaBCmBJK6HeaBqbXxWKtDQ1z62aXwCR\"]},\"src/obligations/escrow/hook-based/IEscrowHook.sol\":{\"keccak256\":\"0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7\",\"dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc\"]},\"src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol\":{\"keccak256\":\"0xda93d9ee8cc0ace401e7444c046ebdb66f4888799781b87a22cf0eac5c42138d\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b292b90046d9ec35a99a21d313c6e5a326b99c8786f5f165afe75258820cf181\",\"dweb:/ipfs/QmYarYj9yEHk3ovgwnz6tnwqH9ZRwuuKu3LMNS81jFaXvF\"]}},\"version\":1}",
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
              "name": "",
              "type": "bytes"
            },
            {
              "internalType": "struct Attestation",
              "name": "",
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
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "onAttest"
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
              "internalType": "struct Attestation",
              "name": "",
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
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
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
              "internalType": "struct Attestation",
              "name": "",
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
        "keccak256": "0x6d403063eb1f39ab87beda332e88cf0f8974feb0e3c0e22cd13fe0c51c2eaf7b",
        "urls": [
          "bzz-raw://e4e09e0507fdec7127d47e3550e11f5099df38f877fe3d3b0202f516f206aef7",
          "dweb:/ipfs/QmYmGCTv6jVpePJWabCkiE26CAu9ydCNFA47QeP6qevXLc"
        ],
        "license": "UNLICENSED"
      },
      "src/obligations/escrow/hook-based/hooks/AttestationEscrowHook.sol": {
        "keccak256": "0xda93d9ee8cc0ace401e7444c046ebdb66f4888799781b87a22cf0eac5c42138d",
        "urls": [
          "bzz-raw://b292b90046d9ec35a99a21d313c6e5a326b99c8786f5f165afe75258820cf181",
          "dweb:/ipfs/QmYarYj9yEHk3ovgwnz6tnwqH9ZRwuuKu3LMNS81jFaXvF"
        ],
        "license": "UNLICENSED"
      }
    },
    "version": 1
  },
  "id": 87
} as const;
