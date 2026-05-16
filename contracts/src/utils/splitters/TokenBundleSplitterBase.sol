// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IArbiter} from "../../IArbiter.sol";
import {ArbiterUtils} from "../../ArbiterUtils.sol";

interface ITokenBundleEscrowObligation {
    function collectEscrow(
        bytes32 escrow,
        bytes32 fulfillment
    ) external returns (bool);
}

abstract contract TokenBundleSplitterBase is IArbiter, ReentrancyGuard, ERC1155Holder {
    using ArbiterUtils for Attestation;
    using SafeERC20 for IERC20;

    /// @notice Sentinel address meaning "the executor who triggered the action".
    address public constant EXECUTOR_SENTINEL = address(0xEEEE);

    /// @notice A per-recipient portion of the bundle.
    ///         erc20Amounts and erc1155Amounts are parallel to the escrow's
    ///         token arrays (same length, same order).
    ///         erc721Indices lists which of the escrow's ERC721s go to this recipient
    ///         (by index into the escrow's erc721Tokens/erc721TokenIds arrays).
    struct BundleSplit {
        address recipient;
        uint256 nativeAmount;
        uint256[] erc20Amounts;
        uint256[] erc721Indices;
        uint256[] erc1155Amounts;
    }

    /// @notice Demand data embedded in the escrow obligation.
    struct DemandData {
        address oracle;
        bytes data;
    }

    /// @dev Layout of TokenBundleEscrowObligation.ObligationData for decoding.
    struct EscrowObligationData {
        address arbiter;
        bytes demand;
        uint256 nativeAmount;
        address[] erc20Tokens;
        uint256[] erc20Amounts;
        address[] erc721Tokens;
        uint256[] erc721TokenIds;
        address[] erc1155Tokens;
        uint256[] erc1155TokenIds;
        uint256[] erc1155Amounts;
    }

    event ArbitrationMade(
        bytes32 indexed decisionKey,
        bytes32 indexed obligation,
        address indexed oracle
    );
    event ArbitrationRequested(
        bytes32 indexed obligation,
        address indexed oracle,
        bytes demand
    );
    event EscrowCollectedAndDistributed(
        bytes32 indexed escrow,
        bytes32 indexed fulfillment,
        address indexed executor
    );

    error UnauthorizedArbitrationRequest();
    error EmptySplits();
    error ZeroRecipient();
    error ExecuteFailed(address target, bytes data);
    error NativeTokenTransferFailed(address to, uint256 amount);
    error EscrowCollectionFailed();
    error InvalidEscrowContract(address expected, address provided);
    error InvalidNativeCollectionAmount(uint256 expected, uint256 received);
    error InvalidERC20CollectionAmount(
        uint256 tokenIndex,
        address token,
        uint256 expected,
        uint256 received
    );
    error InvalidERC721Collection(address token, uint256 tokenId);
    error InvalidERC1155CollectionAmount(
        uint256 tokenIndex,
        address token,
        uint256 tokenId,
        uint256 expected,
        uint256 received
    );

    IEAS public eas;

    /// @notice decisions[oracle][decisionKey] => splits array.
    mapping(address => mapping(bytes32 => BundleSplit[])) internal decisions;
    /// @notice Whether a decision has been made (distinguishes empty from nonexistent).
    mapping(address => mapping(bytes32 => bool)) public hasDecision;

    /// @notice Transient storage for the current executor during execute/collectAndDistribute.
    address private _currentExecutor;
    /// @notice Set only while collectAndDistribute is collecting escrow into this splitter.
    bool private _collectingEscrow;

    constructor(IEAS _eas) {
        eas = _eas;
    }

    // -----------------------------------------------------------------
    // Oracle arbitration
    // -----------------------------------------------------------------

    /// @notice Oracle submits a split decision for an obligation.
    function arbitrate(
        bytes32 obligation,
        BundleSplit[] calldata splits
    ) external virtual;

    /// @notice Stores a decision in storage.
    function _storeDecision(
        address oracle,
        bytes32 decisionKey,
        BundleSplit[] calldata splits
    ) internal {
        if (splits.length == 0) revert EmptySplits();

        delete decisions[oracle][decisionKey];
        for (uint256 i; i < splits.length; ++i) {
            if (splits[i].recipient == address(0)) revert ZeroRecipient();

            decisions[oracle][decisionKey].push();
            BundleSplit storage stored = decisions[oracle][decisionKey][i];
            stored.recipient = splits[i].recipient;
            stored.nativeAmount = splits[i].nativeAmount;

            for (uint256 j; j < splits[i].erc20Amounts.length; ++j) {
                stored.erc20Amounts.push(splits[i].erc20Amounts[j]);
            }
            for (uint256 j; j < splits[i].erc721Indices.length; ++j) {
                stored.erc721Indices.push(splits[i].erc721Indices[j]);
            }
            for (uint256 j; j < splits[i].erc1155Amounts.length; ++j) {
                stored.erc1155Amounts.push(splits[i].erc1155Amounts[j]);
            }
        }

        hasDecision[oracle][decisionKey] = true;
    }

    /// @notice Emits an event requesting the oracle to arbitrate.
    function requestArbitration(
        bytes32 _obligation,
        address oracle,
        bytes memory demand
    ) external {
        Attestation memory obligation = eas.getAttestation(_obligation);
        if (
            obligation.attester != msg.sender &&
            obligation.recipient != msg.sender
        ) revert UnauthorizedArbitrationRequest();

        emit ArbitrationRequested(_obligation, oracle, demand);
    }

    // -----------------------------------------------------------------
    // IArbiter
    // -----------------------------------------------------------------

    /// @inheritdoc IArbiter
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 fulfilling
    ) public view override returns (bool) {
        if (!_collectingEscrow || obligation.recipient != address(this)) {
            return false;
        }

        DemandData memory demandData = abi.decode(demand, (DemandData));
        bytes32 decisionKey = keccak256(
            abi.encodePacked(fulfilling, demand)
        );
        return hasDecision[demandData.oracle][decisionKey];
    }

    // -----------------------------------------------------------------
    // Execute (proxy calls through the splitter)
    // -----------------------------------------------------------------

    /// @notice Execute an arbitrary call as the splitter contract.
    ///         Payable to allow forwarding ETH for native token operations.
    function execute(
        address target,
        bytes calldata data
    ) external payable returns (bytes memory) {
        _currentExecutor = msg.sender;
        (bool success, bytes memory result) = target.call{value: msg.value}(
            data
        );
        if (!success) revert ExecuteFailed(target, data);
        _currentExecutor = address(0);
        return result;
    }

    // -----------------------------------------------------------------
    // Atomic collect + distribute
    // -----------------------------------------------------------------

    /// @notice Collects a token bundle escrow and distributes assets per oracle splits.
    function collectAndDistribute(
        address escrowContract,
        bytes32 escrow,
        bytes32 fulfillment
    ) external nonReentrant {
        _currentExecutor = msg.sender;

        Attestation memory escrowAttestation = eas.getAttestation(escrow);
        EscrowObligationData memory escrowData = abi.decode(
            escrowAttestation.data,
            (EscrowObligationData)
        );
        DemandData memory demandData = abi.decode(
            escrowData.demand,
            (DemandData)
        );

        bytes32 decisionKey = keccak256(
            abi.encodePacked(escrow, escrowData.demand)
        );

        BundleSplit[] memory splits = decisions[demandData.oracle][decisionKey];

        if (escrowAttestation.attester != escrowContract) {
            revert InvalidEscrowContract(
                escrowAttestation.attester,
                escrowContract
            );
        }

        uint256 nativeBalanceBefore = address(this).balance;
        uint256[] memory erc20BalancesBefore = _erc20Balances(escrowData);
        bool[] memory erc721HeldBefore = _erc721HeldBySplitter(escrowData);
        uint256[] memory erc1155BalancesBefore = _erc1155Balances(escrowData);

        // Collect escrow — all assets transfer to this contract
        _collectingEscrow = true;
        bool collected = ITokenBundleEscrowObligation(escrowContract).collectEscrow(
            escrow,
            fulfillment
        );
        _collectingEscrow = false;
        if (!collected) revert EscrowCollectionFailed();

        _validateCollectedBundle(
            escrowData,
            nativeBalanceBefore,
            erc20BalancesBefore,
            erc721HeldBefore,
            erc1155BalancesBefore
        );

        // Distribute according to splits
        for (uint256 s; s < splits.length; ++s) {
            address recipient = splits[s].recipient;
            if (recipient == EXECUTOR_SENTINEL) {
                recipient = msg.sender;
            }

            // Native tokens
            if (splits[s].nativeAmount > 0) {
                (bool success, ) = payable(recipient).call{
                    value: splits[s].nativeAmount
                }("");
                if (!success)
                    revert NativeTokenTransferFailed(
                        recipient,
                        splits[s].nativeAmount
                    );
            }

            // ERC20s
            for (uint256 i; i < splits[s].erc20Amounts.length; ++i) {
                if (splits[s].erc20Amounts[i] > 0) {
                    IERC20(escrowData.erc20Tokens[i]).safeTransfer(
                        recipient,
                        splits[s].erc20Amounts[i]
                    );
                }
            }

            // ERC721s
            for (uint256 i; i < splits[s].erc721Indices.length; ++i) {
                uint256 idx = splits[s].erc721Indices[i];
                IERC721(escrowData.erc721Tokens[idx]).transferFrom(
                    address(this),
                    recipient,
                    escrowData.erc721TokenIds[idx]
                );
            }

            // ERC1155s
            for (uint256 i; i < splits[s].erc1155Amounts.length; ++i) {
                if (splits[s].erc1155Amounts[i] > 0) {
                    IERC1155(escrowData.erc1155Tokens[i]).safeTransferFrom(
                        address(this),
                        recipient,
                        escrowData.erc1155TokenIds[i],
                        splits[s].erc1155Amounts[i],
                        ""
                    );
                }
            }
        }

        emit EscrowCollectedAndDistributed(escrow, fulfillment, msg.sender);

        _currentExecutor = address(0);
    }

    // -----------------------------------------------------------------
    // View helpers
    // -----------------------------------------------------------------

    function getSplits(
        address oracle,
        bytes32 obligation
    ) external view returns (BundleSplit[] memory) {
        Attestation memory escrow = eas.getAttestation(obligation);
        EscrowObligationData memory escrowData = abi.decode(
            escrow.data,
            (EscrowObligationData)
        );
        bytes32 decisionKey = keccak256(
            abi.encodePacked(obligation, escrowData.demand)
        );
        return decisions[oracle][decisionKey];
    }

    function decodeDemandData(
        bytes calldata data
    ) external pure returns (DemandData memory) {
        return abi.decode(data, (DemandData));
    }

    function _erc20Balances(
        EscrowObligationData memory escrowData
    ) internal view returns (uint256[] memory balances) {
        balances = new uint256[](escrowData.erc20Tokens.length);
        for (uint256 i; i < escrowData.erc20Tokens.length; ++i) {
            balances[i] = IERC20(escrowData.erc20Tokens[i]).balanceOf(
                address(this)
            );
        }
    }

    function _erc721HeldBySplitter(
        EscrowObligationData memory escrowData
    ) internal view returns (bool[] memory held) {
        held = new bool[](escrowData.erc721Tokens.length);
        for (uint256 i; i < escrowData.erc721Tokens.length; ++i) {
            held[i] =
                IERC721(escrowData.erc721Tokens[i]).ownerOf(
                    escrowData.erc721TokenIds[i]
                ) ==
                address(this);
        }
    }

    function _erc1155Balances(
        EscrowObligationData memory escrowData
    ) internal view returns (uint256[] memory balances) {
        balances = new uint256[](escrowData.erc1155Tokens.length);
        for (uint256 i; i < escrowData.erc1155Tokens.length; ++i) {
            balances[i] = IERC1155(escrowData.erc1155Tokens[i]).balanceOf(
                address(this),
                escrowData.erc1155TokenIds[i]
            );
        }
    }

    function _validateCollectedBundle(
        EscrowObligationData memory escrowData,
        uint256 nativeBalanceBefore,
        uint256[] memory erc20BalancesBefore,
        bool[] memory erc721HeldBefore,
        uint256[] memory erc1155BalancesBefore
    ) internal view {
        uint256 nativeReceived = address(this).balance - nativeBalanceBefore;
        if (nativeReceived != escrowData.nativeAmount) {
            revert InvalidNativeCollectionAmount(
                escrowData.nativeAmount,
                nativeReceived
            );
        }

        _validateERC20Collection(escrowData, erc20BalancesBefore);
        _validateERC721Collection(escrowData, erc721HeldBefore);
        _validateERC1155Collection(escrowData, erc1155BalancesBefore);
    }

    function _validateERC20Collection(
        EscrowObligationData memory escrowData,
        uint256[] memory balancesBefore
    ) internal view {
        for (uint256 i; i < escrowData.erc20Tokens.length; ++i) {
            if (!_isFirstERC20Token(escrowData, i)) continue;

            uint256 expected = _expectedERC20Amount(escrowData, i);
            uint256 received = IERC20(escrowData.erc20Tokens[i]).balanceOf(
                address(this)
            ) - balancesBefore[i];

            if (received != expected) {
                revert InvalidERC20CollectionAmount(
                    i,
                    escrowData.erc20Tokens[i],
                    expected,
                    received
                );
            }
        }
    }

    function _validateERC721Collection(
        EscrowObligationData memory escrowData,
        bool[] memory heldBefore
    ) internal view {
        for (uint256 i; i < escrowData.erc721Tokens.length; ++i) {
            if (
                heldBefore[i] ||
                IERC721(escrowData.erc721Tokens[i]).ownerOf(
                    escrowData.erc721TokenIds[i]
                ) !=
                address(this)
            ) {
                revert InvalidERC721Collection(
                    escrowData.erc721Tokens[i],
                    escrowData.erc721TokenIds[i]
                );
            }
        }
    }

    function _validateERC1155Collection(
        EscrowObligationData memory escrowData,
        uint256[] memory balancesBefore
    ) internal view {
        for (uint256 i; i < escrowData.erc1155Tokens.length; ++i) {
            if (!_isFirstERC1155Token(escrowData, i)) continue;

            uint256 expected = _expectedERC1155Amount(escrowData, i);
            uint256 received = IERC1155(escrowData.erc1155Tokens[i]).balanceOf(
                address(this),
                escrowData.erc1155TokenIds[i]
            ) - balancesBefore[i];

            if (received != expected) {
                revert InvalidERC1155CollectionAmount(
                    i,
                    escrowData.erc1155Tokens[i],
                    escrowData.erc1155TokenIds[i],
                    expected,
                    received
                );
            }
        }
    }

    function _isFirstERC20Token(
        EscrowObligationData memory escrowData,
        uint256 index
    ) internal pure returns (bool) {
        for (uint256 i; i < index; ++i) {
            if (escrowData.erc20Tokens[i] == escrowData.erc20Tokens[index]) {
                return false;
            }
        }
        return true;
    }

    function _expectedERC20Amount(
        EscrowObligationData memory escrowData,
        uint256 index
    ) internal pure returns (uint256 total) {
        for (uint256 i; i < escrowData.erc20Tokens.length; ++i) {
            if (escrowData.erc20Tokens[i] == escrowData.erc20Tokens[index]) {
                total += escrowData.erc20Amounts[i];
            }
        }
    }

    function _isFirstERC1155Token(
        EscrowObligationData memory escrowData,
        uint256 index
    ) internal pure returns (bool) {
        for (uint256 i; i < index; ++i) {
            if (
                escrowData.erc1155Tokens[i] ==
                escrowData.erc1155Tokens[index] &&
                escrowData.erc1155TokenIds[i] ==
                escrowData.erc1155TokenIds[index]
            ) {
                return false;
            }
        }
        return true;
    }

    function _expectedERC1155Amount(
        EscrowObligationData memory escrowData,
        uint256 index
    ) internal pure returns (uint256 total) {
        for (uint256 i; i < escrowData.erc1155Tokens.length; ++i) {
            if (
                escrowData.erc1155Tokens[i] ==
                escrowData.erc1155Tokens[index] &&
                escrowData.erc1155TokenIds[i] ==
                escrowData.erc1155TokenIds[index]
            ) {
                total += escrowData.erc1155Amounts[i];
            }
        }
    }

    /// @notice Allow contract to receive ETH from escrow collection.
    receive() external payable {}
}
