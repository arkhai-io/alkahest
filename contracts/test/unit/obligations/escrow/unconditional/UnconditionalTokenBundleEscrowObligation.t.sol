// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Attestation} from "@eas/Common.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";
import {
    UnconditionalTokenBundleEscrowObligation
} from "@src/obligations/escrow/unconditional/UnconditionalTokenBundleEscrowObligation.sol";

contract MockUnconditionalBundleERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MCK") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract MockUnconditionalBundleArbiter {
    function check(Attestation memory, bytes memory, bytes32) external pure returns (bool) {
        return true;
    }
}

contract UnconditionalTokenBundleEscrowObligationTest is Test {
    UnconditionalTokenBundleEscrowObligation public escrow;
    MockUnconditionalBundleERC20 public token;
    MockUnconditionalBundleArbiter public arbiter;

    address public alice = makeAddr("alice");
    uint256 public constant TOKEN_AMOUNT = 100e18;
    uint64 public constant EXPIRATION_TIME = 1 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (IEAS eas, ISchemaRegistry schemaRegistry) = easDeployer.deployEAS();

        escrow = new UnconditionalTokenBundleEscrowObligation(eas, schemaRegistry);
        token = new MockUnconditionalBundleERC20();
        arbiter = new MockUnconditionalBundleArbiter();

        token.mint(alice, TOKEN_AMOUNT);
        vm.prank(alice);
        token.approve(address(escrow), TOKEN_AMOUNT);
        vm.deal(alice, 1 ether);
    }

    function testTokenOnlyBundleRejectsUnexpectedNativeTokenPayment() public {
        address[] memory erc20Tokens = new address[](1);
        erc20Tokens[0] = address(token);
        uint256[] memory erc20Amounts = new uint256[](1);
        erc20Amounts[0] = TOKEN_AMOUNT;

        UnconditionalTokenBundleEscrowObligation.ObligationData memory data =
            UnconditionalTokenBundleEscrowObligation.ObligationData({
                arbiter: address(arbiter),
                demand: "",
                nativeAmount: 0,
                erc20Tokens: erc20Tokens,
                erc20Amounts: erc20Amounts,
                erc721Tokens: new address[](0),
                erc721TokenIds: new uint256[](0),
                erc1155Tokens: new address[](0),
                erc1155TokenIds: new uint256[](0),
                erc1155Amounts: new uint256[](0)
            });

        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(UnconditionalTokenBundleEscrowObligation.IncorrectPayment.selector, 0, 0.5 ether)
        );
        escrow.doObligation{value: 0.5 ether}(data, uint64(block.timestamp + EXPIRATION_TIME));
    }
}
