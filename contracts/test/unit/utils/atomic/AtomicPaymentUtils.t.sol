// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {IEAS} from "@eas/IEAS.sol";
import {ISchemaRegistry} from "@eas/ISchemaRegistry.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {AtomicPaymentUtils} from "../../../../src/utils/atomic/AtomicPaymentUtils.sol";
import {ERC20PaymentObligation} from "../../../../src/obligations/payment/ERC20PaymentObligation.sol";
import {ERC721PaymentObligation} from "../../../../src/obligations/payment/ERC721PaymentObligation.sol";
import {ERC1155PaymentObligation} from "../../../../src/obligations/payment/ERC1155PaymentObligation.sol";
import {NativeTokenPaymentObligation} from "../../../../src/obligations/payment/NativeTokenPaymentObligation.sol";
import {TokenBundlePaymentObligation} from "../../../../src/obligations/payment/TokenBundlePaymentObligation.sol";
import {EASDeployer} from "@test/utils/EASDeployer.sol";

contract MockPermitERC20 is ERC20, ERC20Permit {
    constructor() ERC20("Mock Permit Token", "MPT") ERC20Permit("Mock Permit Token") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract AtomicPaymentUtilsHarness is AtomicPaymentUtils {
    constructor(
        IEAS eas,
        ERC20PaymentObligation erc20Payment,
        ERC721PaymentObligation erc721Payment,
        ERC1155PaymentObligation erc1155Payment,
        NativeTokenPaymentObligation nativePayment,
        TokenBundlePaymentObligation bundlePayment
    ) AtomicPaymentUtils(eas, erc20Payment, erc721Payment, erc1155Payment, nativePayment, bundlePayment) {}

    function permitBundleForTest(
        TokenBundlePaymentObligation.ObligationData memory data,
        ERC20PermitSignature[] calldata permits
    ) external {
        _permitBundle(data, permits);
    }

    function permitErc20ForTest(address token, uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
    {
        _permitErc20(token, amount, deadline, v, r, s);
    }

    function approvePaymentBundleTokensForTest(TokenBundlePaymentObligation.ObligationData memory data, address spender)
        external
    {
        _approvePaymentBundleTokens(data, spender);
    }
}

contract AtomicPaymentUtilsTest is Test {
    bytes32 internal constant PERMIT_TYPEHASH =
        keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");

    uint256 internal constant OWNER_KEY = 0xA11CE;
    uint256 internal constant FIRST_AMOUNT = 10 ether;
    uint256 internal constant SECOND_AMOUNT = 20 ether;

    address internal owner;
    address internal payee = address(0xB0B);
    address internal spender = address(0xC0FFEE);

    MockPermitERC20 internal token;
    AtomicPaymentUtilsHarness internal utils;

    function setUp() public {
        owner = vm.addr(OWNER_KEY);

        EASDeployer easDeployer = new EASDeployer();
        (IEAS eas, ISchemaRegistry schemaRegistry) = easDeployer.deployEAS();

        ERC20PaymentObligation erc20Payment = new ERC20PaymentObligation(eas, schemaRegistry, false);
        ERC721PaymentObligation erc721Payment = new ERC721PaymentObligation(eas, schemaRegistry, false);
        ERC1155PaymentObligation erc1155Payment = new ERC1155PaymentObligation(eas, schemaRegistry, false);
        NativeTokenPaymentObligation nativePayment = new NativeTokenPaymentObligation(eas, schemaRegistry, false);
        TokenBundlePaymentObligation bundlePayment = new TokenBundlePaymentObligation(eas, schemaRegistry, false);

        utils = new AtomicPaymentUtilsHarness(
            eas, erc20Payment, erc721Payment, erc1155Payment, nativePayment, bundlePayment
        );
        token = new MockPermitERC20();
    }

    function testPermitBundleAggregatesDuplicateERC20Amounts() public {
        TokenBundlePaymentObligation.ObligationData memory data = _duplicateERC20Bundle();
        AtomicPaymentUtils.ERC20PermitSignature[] memory permits = new AtomicPaymentUtils.ERC20PermitSignature[](1);
        permits[0] = _signPermit(address(utils), FIRST_AMOUNT + SECOND_AMOUNT, block.timestamp + 1 days);

        vm.prank(owner);
        utils.permitBundleForTest(data, permits);

        assertEq(token.allowance(owner, address(utils)), FIRST_AMOUNT + SECOND_AMOUNT);
    }

    function testPermitErc20SucceedsIfPermitWasFrontrun() public {
        uint256 amount = FIRST_AMOUNT;
        uint256 deadline = block.timestamp + 1 days;
        AtomicPaymentUtils.ERC20PermitSignature memory permit = _signPermit(address(utils), amount, deadline);

        token.permit(owner, address(utils), amount, deadline, permit.v, permit.r, permit.s);

        vm.prank(owner);
        utils.permitErc20ForTest(address(token), amount, deadline, permit.v, permit.r, permit.s);

        assertEq(token.allowance(owner, address(utils)), amount);
    }

    function testPermitBundleSucceedsIfPermitWasFrontrun() public {
        TokenBundlePaymentObligation.ObligationData memory data = _duplicateERC20Bundle();
        uint256 amount = FIRST_AMOUNT + SECOND_AMOUNT;
        uint256 deadline = block.timestamp + 1 days;
        AtomicPaymentUtils.ERC20PermitSignature[] memory permits = new AtomicPaymentUtils.ERC20PermitSignature[](1);
        permits[0] = _signPermit(address(utils), amount, deadline);

        token.permit(owner, address(utils), amount, deadline, permits[0].v, permits[0].r, permits[0].s);

        vm.prank(owner);
        utils.permitBundleForTest(data, permits);

        assertEq(token.allowance(owner, address(utils)), amount);
    }

    function testApprovePaymentBundleTokensAggregatesDuplicateERC20Amounts() public {
        TokenBundlePaymentObligation.ObligationData memory data = _duplicateERC20Bundle();
        token.mint(address(utils), FIRST_AMOUNT + SECOND_AMOUNT);

        utils.approvePaymentBundleTokensForTest(data, spender);

        assertEq(token.allowance(address(utils), spender), FIRST_AMOUNT + SECOND_AMOUNT);
    }

    function _duplicateERC20Bundle() internal view returns (TokenBundlePaymentObligation.ObligationData memory) {
        address[] memory erc20Tokens = new address[](2);
        erc20Tokens[0] = address(token);
        erc20Tokens[1] = address(token);

        uint256[] memory erc20Amounts = new uint256[](2);
        erc20Amounts[0] = FIRST_AMOUNT;
        erc20Amounts[1] = SECOND_AMOUNT;

        return TokenBundlePaymentObligation.ObligationData({
            erc20Tokens: erc20Tokens,
            erc20Amounts: erc20Amounts,
            erc721Tokens: new address[](0),
            erc721TokenIds: new uint256[](0),
            erc1155Tokens: new address[](0),
            erc1155TokenIds: new uint256[](0),
            erc1155Amounts: new uint256[](0),
            nativeAmount: 0,
            payee: payee
        });
    }

    function _signPermit(address spender_, uint256 value, uint256 deadline)
        internal
        view
        returns (AtomicPaymentUtils.ERC20PermitSignature memory)
    {
        bytes32 structHash =
            keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender_, value, token.nonces(owner), deadline));
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", token.DOMAIN_SEPARATOR(), structHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(OWNER_KEY, digest);
        return AtomicPaymentUtils.ERC20PermitSignature({v: v, r: r, s: s, deadline: deadline});
    }
}
