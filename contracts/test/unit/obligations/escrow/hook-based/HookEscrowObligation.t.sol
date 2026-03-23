// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {HookEscrowObligation} from "@src/obligations/escrow/hook-based/HookEscrowObligation.sol";
import {IEscrowHook} from "@src/obligations/escrow/hook-based/IEscrowHook.sol";
import {ERC20EscrowHook} from "@src/obligations/escrow/hook-based/hooks/ERC20EscrowHook.sol";
import {AllEscrowHook} from "@src/obligations/escrow/hook-based/hooks/AllEscrowHook.sol";
import {BaseEscrowObligation} from "@src/BaseEscrowObligation.sol";
import {StringObligation} from "@src/obligations/StringObligation.sol";
import {IArbiter} from "@src/IArbiter.sol";
import {MockArbiter} from "../../../../unit/obligations/fixtures/MockArbiter.sol";
import {IEAS, Attestation} from "@eas/IEAS.sol";
import {ISchemaRegistry, SchemaRecord} from "@eas/ISchemaRegistry.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {EASDeployer} from "@test/utils/EASDeployer.sol";

// ──────────────────────────────────────────────
// Test helpers
// ──────────────────────────────────────────────

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MCK") {
        _mint(msg.sender, 10000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

/// @dev A contract that tries to call hooks directly to steal funds.
contract HookThief {
    function stealViaRelease(
        ERC20EscrowHook hook,
        address token,
        uint256 amount
    ) external {
        bytes memory hookData = abi.encode(
            ERC20EscrowHook.HookData({token: token, amount: amount})
        );
        hook.onRelease(hookData, msg.sender, address(this));
    }

    function stealViaReturn(
        ERC20EscrowHook hook,
        address token,
        uint256 amount
    ) external {
        bytes memory hookData = abi.encode(
            ERC20EscrowHook.HookData({token: token, amount: amount})
        );
        hook.onReturn(hookData, msg.sender, address(this));
    }
}

/// @dev A contract that deposits then tries to withdraw more than deposited.
contract OverdrawAttacker {
    function depositAndOverdraw(
        ERC20EscrowHook hook,
        address token,
        uint256 depositAmount,
        uint256 withdrawAmount,
        address recipient
    ) external {
        // Lock some tokens
        bytes memory lockData = abi.encode(
            ERC20EscrowHook.HookData({token: token, amount: depositAmount})
        );
        hook.onLock(lockData, address(this), address(this));

        // Try to release more than deposited
        bytes memory releaseData = abi.encode(
            ERC20EscrowHook.HookData({token: token, amount: withdrawAmount})
        );
        hook.onRelease(releaseData, recipient, address(this));
    }
}

/// @dev A contract that tries to drain via AllEscrowHook by spoofing escrow address.
contract AllHookThief {
    function stealViaAll(
        AllEscrowHook allHook,
        ERC20EscrowHook erc20Hook,
        address token,
        uint256 amount
    ) external {
        address[] memory hooks = new address[](1);
        hooks[0] = address(erc20Hook);
        bytes[] memory hookDatas = new bytes[](1);
        hookDatas[0] = abi.encode(
            ERC20EscrowHook.HookData({token: token, amount: amount})
        );
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes memory data = abi.encode(
            AllEscrowHook.HookData({hooks: hooks, hookDatas: hookDatas, values: values})
        );
        // AllEscrowHook calls erc20Hook.onRelease with msg.sender = allHook
        // but deposits are keyed to the obligation, not allHook
        allHook.onRelease(data, msg.sender, address(this));
    }
}

// ──────────────────────────────────────────────
// Core escrow tests
// ──────────────────────────────────────────────

contract HookEscrowObligationTest is Test {
    HookEscrowObligation public escrow;
    ERC20EscrowHook public erc20Hook;
    MockArbiter public acceptArbiter;
    MockArbiter public rejectArbiter;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public token;

    address internal buyer;
    address internal seller;
    uint256 constant AMOUNT = 100 * 10 ** 18;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrow = new HookEscrowObligation(eas, schemaRegistry);
        erc20Hook = new ERC20EscrowHook();
        acceptArbiter = new MockArbiter(true);
        rejectArbiter = new MockArbiter(false);
        stringObligation = new StringObligation(eas, schemaRegistry);
        token = new MockERC20();

        buyer = makeAddr("buyer");
        seller = makeAddr("seller");

        token.transfer(buyer, 1000 * 10 ** 18);
    }

    // ──────────────────────────────────────────────
    // Helpers
    // ──────────────────────────────────────────────

    function _hookData(
        uint256 amount
    ) internal view returns (bytes memory) {
        return
            abi.encode(
                ERC20EscrowHook.HookData({
                    token: address(token),
                    amount: amount
                })
            );
    }

    function _obligationData(
        uint256 amount,
        address arbiter
    ) internal view returns (HookEscrowObligation.ObligationData memory) {
        return
            HookEscrowObligation.ObligationData({
                arbiter: arbiter,
                demand: abi.encode("test"),
                hook: address(erc20Hook),
                hookData: _hookData(amount)
            });
    }

    function _createEscrow(
        uint256 amount,
        address arbiter,
        uint64 expiration
    ) internal returns (bytes32) {
        vm.startPrank(buyer);
        token.approve(address(erc20Hook), amount);
        bytes32 uid = escrow.doObligation(
            _obligationData(amount, arbiter),
            uint64(block.timestamp + expiration)
        );
        vm.stopPrank();
        return uid;
    }

    function _createFulfillment(
        bytes32 escrowUid
    ) internal returns (bytes32) {
        vm.prank(seller);
        return
            stringObligation.doObligation(
                StringObligation.ObligationData({
                    item: "fulfilled",
                    schema: bytes32(0)
                }),
                escrowUid
            );
    }

    // ──────────────────────────────────────────────
    // Basic lifecycle
    // ──────────────────────────────────────────────

    function testConstructor() public view {
        bytes32 schemaId = escrow.ATTESTATION_SCHEMA();
        assertNotEq(schemaId, bytes32(0));

        SchemaRecord memory schema = escrow.getSchema();
        assertEq(schema.uid, schemaId);
        assertEq(
            schema.schema,
            "address arbiter, bytes demand, address hook, bytes hookData"
        );
    }

    function testDoObligation() public {
        bytes32 uid = _createEscrow(AMOUNT, address(acceptArbiter), EXPIRATION);

        assertNotEq(uid, bytes32(0));

        // Tokens held by the hook, not the obligation
        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
        assertEq(token.balanceOf(address(escrow)), 0);
        assertEq(token.balanceOf(buyer), 900 * 10 ** 18);

        // Hook tracks deposits keyed by the obligation contract
        assertEq(
            erc20Hook.deposits(address(escrow), address(token)),
            AMOUNT
        );

        // Attestation recipient is the buyer
        Attestation memory att = eas.getAttestation(uid);
        assertEq(att.recipient, buyer);
    }

    function testDoObligationFor() public {
        address recipient = makeAddr("recipient");

        vm.startPrank(buyer);
        token.approve(address(erc20Hook), AMOUNT);
        bytes32 uid = escrow.doObligationFor(
            _obligationData(AMOUNT, address(acceptArbiter)),
            uint64(block.timestamp + EXPIRATION),
            recipient
        );
        vm.stopPrank();

        Attestation memory att = eas.getAttestation(uid);
        assertEq(att.recipient, recipient);
        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
    }

    function testCollectEscrow() public {
        bytes32 escrowUid = _createEscrow(
            AMOUNT,
            address(acceptArbiter),
            EXPIRATION
        );
        bytes32 fulfillmentUid = _createFulfillment(escrowUid);

        vm.prank(seller);
        bool ok = escrow.collectEscrow(escrowUid, fulfillmentUid);
        assertTrue(ok);

        // Tokens released to seller
        assertEq(token.balanceOf(seller), AMOUNT);
        assertEq(token.balanceOf(address(erc20Hook)), 0);
        assertEq(
            erc20Hook.deposits(address(escrow), address(token)),
            0
        );
    }

    function testCollectEscrowRejected() public {
        bytes32 escrowUid = _createEscrow(
            AMOUNT,
            address(rejectArbiter),
            EXPIRATION
        );
        bytes32 fulfillmentUid = _createFulfillment(escrowUid);

        vm.prank(seller);
        vm.expectRevert(BaseEscrowObligation.InvalidFulfillment.selector);
        escrow.collectEscrow(escrowUid, fulfillmentUid);

        // Tokens still in hook
        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
    }

    function testReclaimExpired() public {
        uint64 shortExpiry = 100;
        bytes32 escrowUid = _createEscrow(
            AMOUNT,
            address(acceptArbiter),
            shortExpiry
        );

        // Can't reclaim before expiry
        vm.expectRevert(BaseEscrowObligation.UnauthorizedCall.selector);
        escrow.reclaimExpired(escrowUid);

        // Warp past expiry
        vm.warp(block.timestamp + shortExpiry + 1);

        bool ok = escrow.reclaimExpired(escrowUid);
        assertTrue(ok);

        // Tokens returned to buyer (the attestation recipient)
        assertEq(token.balanceOf(buyer), 1000 * 10 ** 18);
        assertEq(token.balanceOf(address(erc20Hook)), 0);
    }

    function testMultipleEscrowsIndependent() public {
        // Two independent escrows from the same buyer
        bytes32 uid1 = _createEscrow(
            AMOUNT,
            address(acceptArbiter),
            EXPIRATION
        );
        bytes32 uid2 = _createEscrow(
            AMOUNT,
            address(acceptArbiter),
            EXPIRATION
        );

        assertEq(token.balanceOf(address(erc20Hook)), 2 * AMOUNT);
        assertEq(
            erc20Hook.deposits(address(escrow), address(token)),
            2 * AMOUNT
        );

        // Collect only the first
        bytes32 ful1 = _createFulfillment(uid1);
        vm.prank(seller);
        escrow.collectEscrow(uid1, ful1);

        assertEq(token.balanceOf(seller), AMOUNT);
        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
        assertEq(
            erc20Hook.deposits(address(escrow), address(token)),
            AMOUNT
        );

        // Collect the second
        bytes32 ful2 = _createFulfillment(uid2);
        vm.prank(seller);
        escrow.collectEscrow(uid2, ful2);

        assertEq(token.balanceOf(seller), 2 * AMOUNT);
        assertEq(token.balanceOf(address(erc20Hook)), 0);
    }

    // ──────────────────────────────────────────────
    // IArbiter (checkObligation)
    // ──────────────────────────────────────────────

    function testCheckObligationExactMatch() public {
        bytes32 uid = _createEscrow(
            AMOUNT,
            address(acceptArbiter),
            EXPIRATION
        );
        Attestation memory att = eas.getAttestation(uid);

        bool ok = escrow.checkObligation(
            att,
            abi.encode(_obligationData(AMOUNT, address(acceptArbiter))),
            bytes32(0)
        );
        assertTrue(ok);
    }

    function testCheckObligationDifferentHookData() public {
        bytes32 uid = _createEscrow(
            AMOUNT,
            address(acceptArbiter),
            EXPIRATION
        );
        Attestation memory att = eas.getAttestation(uid);

        // Different amount in hookData → should fail
        HookEscrowObligation.ObligationData memory demand = HookEscrowObligation
            .ObligationData({
                arbiter: address(acceptArbiter),
                demand: abi.encode("test"),
                hook: address(erc20Hook),
                hookData: _hookData(AMOUNT + 1)
            });

        bool ok = escrow.checkObligation(
            att,
            abi.encode(demand),
            bytes32(0)
        );
        assertFalse(ok);
    }

    function testCheckObligationDifferentHook() public {
        bytes32 uid = _createEscrow(
            AMOUNT,
            address(acceptArbiter),
            EXPIRATION
        );
        Attestation memory att = eas.getAttestation(uid);

        ERC20EscrowHook otherHook = new ERC20EscrowHook();
        HookEscrowObligation.ObligationData memory demand = HookEscrowObligation
            .ObligationData({
                arbiter: address(acceptArbiter),
                demand: abi.encode("test"),
                hook: address(otherHook),
                hookData: _hookData(AMOUNT)
            });

        bool ok = escrow.checkObligation(
            att,
            abi.encode(demand),
            bytes32(0)
        );
        assertFalse(ok);
    }

    // ──────────────────────────────────────────────
    // Insufficient balance / approval
    // ──────────────────────────────────────────────

    function testLockFailsWithoutApproval() public {
        vm.prank(buyer);
        // No approval given to the hook
        vm.expectRevert();
        escrow.doObligation(
            _obligationData(AMOUNT, address(acceptArbiter)),
            uint64(block.timestamp + EXPIRATION)
        );
    }

    function testLockFailsInsufficientBalance() public {
        address poorUser = makeAddr("poor");
        token.mint(poorUser, 10 * 10 ** 18);

        vm.startPrank(poorUser);
        token.approve(address(erc20Hook), AMOUNT);
        vm.expectRevert();
        escrow.doObligation(
            _obligationData(AMOUNT, address(acceptArbiter)),
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();
    }
}

// ──────────────────────────────────────────────
// AllEscrowHook composition tests
// ──────────────────────────────────────────────

contract AllEscrowHookTest is Test {
    HookEscrowObligation public escrow;
    ERC20EscrowHook public erc20Hook;
    AllEscrowHook public allHook;
    MockArbiter public acceptArbiter;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public tokenA;
    MockERC20 public tokenB;

    address internal buyer;
    address internal seller;
    uint256 constant AMOUNT_A = 100 * 10 ** 18;
    uint256 constant AMOUNT_B = 50 * 10 ** 18;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrow = new HookEscrowObligation(eas, schemaRegistry);
        erc20Hook = new ERC20EscrowHook();
        allHook = new AllEscrowHook();
        acceptArbiter = new MockArbiter(true);
        stringObligation = new StringObligation(eas, schemaRegistry);
        tokenA = new MockERC20();
        tokenB = new MockERC20();

        buyer = makeAddr("buyer");
        seller = makeAddr("seller");

        tokenA.transfer(buyer, 1000 * 10 ** 18);
        tokenB.transfer(buyer, 1000 * 10 ** 18);
    }

    function _bundleHookData() internal view returns (bytes memory) {
        address[] memory hooks = new address[](2);
        hooks[0] = address(erc20Hook);
        hooks[1] = address(erc20Hook);

        bytes[] memory hookDatas = new bytes[](2);
        hookDatas[0] = abi.encode(
            ERC20EscrowHook.HookData({
                token: address(tokenA),
                amount: AMOUNT_A
            })
        );
        hookDatas[1] = abi.encode(
            ERC20EscrowHook.HookData({
                token: address(tokenB),
                amount: AMOUNT_B
            })
        );

        uint256[] memory values = new uint256[](2);
        values[0] = 0;
        values[1] = 0;

        return
            abi.encode(
                AllEscrowHook.HookData({hooks: hooks, hookDatas: hookDatas, values: values})
            );
    }

    function testBundleLockAndCollect() public {
        bytes memory bundleData = _bundleHookData();

        HookEscrowObligation.ObligationData memory data = HookEscrowObligation
            .ObligationData({
                arbiter: address(acceptArbiter),
                demand: abi.encode("bundle test"),
                hook: address(allHook),
                hookData: bundleData
            });

        // Buyer approves the hook (not the obligation, not AllEscrowHook)
        vm.startPrank(buyer);
        tokenA.approve(address(erc20Hook), AMOUNT_A);
        tokenB.approve(address(erc20Hook), AMOUNT_B);
        bytes32 escrowUid = escrow.doObligation(
            data,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();

        // Both tokens held by the leaf hook
        assertEq(tokenA.balanceOf(address(erc20Hook)), AMOUNT_A);
        assertEq(tokenB.balanceOf(address(erc20Hook)), AMOUNT_B);

        // Deposits keyed by allHook (the direct caller of erc20Hook)
        assertEq(
            erc20Hook.deposits(address(allHook), address(tokenA)),
            AMOUNT_A
        );
        assertEq(
            erc20Hook.deposits(address(allHook), address(tokenB)),
            AMOUNT_B
        );

        // Collect
        vm.prank(seller);
        bytes32 fulUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: "done",
                schema: bytes32(0)
            }),
            escrowUid
        );

        vm.prank(seller);
        escrow.collectEscrow(escrowUid, fulUid);

        assertEq(tokenA.balanceOf(seller), AMOUNT_A);
        assertEq(tokenB.balanceOf(seller), AMOUNT_B);
        assertEq(tokenA.balanceOf(address(erc20Hook)), 0);
        assertEq(tokenB.balanceOf(address(erc20Hook)), 0);
    }

    function testBundleReclaimExpired() public {
        bytes memory bundleData = _bundleHookData();

        HookEscrowObligation.ObligationData memory data = HookEscrowObligation
            .ObligationData({
                arbiter: address(acceptArbiter),
                demand: abi.encode("bundle test"),
                hook: address(allHook),
                hookData: bundleData
            });

        vm.startPrank(buyer);
        tokenA.approve(address(erc20Hook), AMOUNT_A);
        tokenB.approve(address(erc20Hook), AMOUNT_B);
        bytes32 escrowUid = escrow.doObligation(
            data,
            uint64(block.timestamp + 100)
        );
        vm.stopPrank();

        vm.warp(block.timestamp + 101);
        escrow.reclaimExpired(escrowUid);

        assertEq(tokenA.balanceOf(buyer), 1000 * 10 ** 18);
        assertEq(tokenB.balanceOf(buyer), 1000 * 10 ** 18);
    }

    function testBundleMismatchedArraysRevert() public {
        address[] memory hooks = new address[](2);
        hooks[0] = address(erc20Hook);
        hooks[1] = address(erc20Hook);

        bytes[] memory hookDatas = new bytes[](1); // mismatched!
        hookDatas[0] = abi.encode(
            ERC20EscrowHook.HookData({
                token: address(tokenA),
                amount: AMOUNT_A
            })
        );

        uint256[] memory values = new uint256[](2);
        values[0] = 0;
        values[1] = 0;

        bytes memory bundleData = abi.encode(
            AllEscrowHook.HookData({hooks: hooks, hookDatas: hookDatas, values: values})
        );

        HookEscrowObligation.ObligationData memory data = HookEscrowObligation
            .ObligationData({
                arbiter: address(acceptArbiter),
                demand: abi.encode("test"),
                hook: address(allHook),
                hookData: bundleData
            });

        vm.startPrank(buyer);
        tokenA.approve(address(erc20Hook), AMOUNT_A);
        vm.expectRevert(AllEscrowHook.ArrayLengthMismatch.selector);
        escrow.doObligation(data, uint64(block.timestamp + EXPIRATION));
        vm.stopPrank();
    }
}

// ──────────────────────────────────────────────
// Attack POCs
// ──────────────────────────────────────────────

contract HookEscrowAttackTest is Test {
    HookEscrowObligation public escrow;
    ERC20EscrowHook public erc20Hook;
    AllEscrowHook public allHook;
    MockArbiter public acceptArbiter;
    StringObligation public stringObligation;
    IEAS public eas;
    ISchemaRegistry public schemaRegistry;
    MockERC20 public token;

    address internal buyer;
    address internal attacker;
    uint256 constant AMOUNT = 100 * 10 ** 18;
    uint64 constant EXPIRATION = 365 days;

    function setUp() public {
        EASDeployer easDeployer = new EASDeployer();
        (eas, schemaRegistry) = easDeployer.deployEAS();

        escrow = new HookEscrowObligation(eas, schemaRegistry);
        erc20Hook = new ERC20EscrowHook();
        allHook = new AllEscrowHook();
        acceptArbiter = new MockArbiter(true);
        stringObligation = new StringObligation(eas, schemaRegistry);
        token = new MockERC20();

        buyer = makeAddr("buyer");
        attacker = makeAddr("attacker");

        token.transfer(buyer, 1000 * 10 ** 18);
    }

    function _createLegitEscrow() internal returns (bytes32) {
        bytes memory hookData = abi.encode(
            ERC20EscrowHook.HookData({
                token: address(token),
                amount: AMOUNT
            })
        );
        HookEscrowObligation.ObligationData memory data = HookEscrowObligation
            .ObligationData({
                arbiter: address(acceptArbiter),
                demand: abi.encode("test"),
                hook: address(erc20Hook),
                hookData: hookData
            });

        vm.startPrank(buyer);
        token.approve(address(erc20Hook), AMOUNT);
        bytes32 uid = escrow.doObligation(
            data,
            uint64(block.timestamp + EXPIRATION)
        );
        vm.stopPrank();
        return uid;
    }

    /// @notice POC: Direct call to hook.onRelease by attacker with no deposit.
    ///         Should revert with NoDeposit.
    function testAttackDirectReleaseNoDeposit() public {
        // Legitimate escrow deposits tokens into hook
        _createLegitEscrow();
        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);

        // Attacker tries to call onRelease directly
        HookThief thief = new HookThief();

        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20EscrowHook.NoDeposit.selector,
                address(thief),
                address(token)
            )
        );
        thief.stealViaRelease(erc20Hook, address(token), AMOUNT);

        // Tokens still safe
        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
        assertEq(token.balanceOf(attacker), 0);
    }

    /// @notice POC: Direct call to hook.onReturn by attacker with no deposit.
    ///         Should revert with NoDeposit.
    function testAttackDirectReturnNoDeposit() public {
        _createLegitEscrow();

        HookThief thief = new HookThief();

        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20EscrowHook.NoDeposit.selector,
                address(thief),
                address(token)
            )
        );
        thief.stealViaReturn(erc20Hook, address(token), AMOUNT);

        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
    }

    /// @notice POC: Attacker deposits a small amount, then tries to release more.
    ///         Should revert with InsufficientDeposit.
    function testAttackOverdraw() public {
        // Legitimate escrow
        _createLegitEscrow();

        uint256 smallAmount = 1 * 10 ** 18;
        token.mint(address(0xBEEF), smallAmount);

        OverdrawAttacker overdrawer = new OverdrawAttacker();

        // Give the attacker contract some tokens and approve the hook
        vm.prank(address(0xBEEF));
        token.transfer(address(overdrawer), smallAmount);
        vm.prank(address(overdrawer));
        token.approve(address(erc20Hook), smallAmount);

        // Attacker deposits 1 token, tries to withdraw 100
        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20EscrowHook.InsufficientDeposit.selector,
                address(overdrawer),
                address(token),
                AMOUNT,
                smallAmount
            )
        );
        overdrawer.depositAndOverdraw(
            erc20Hook,
            address(token),
            smallAmount,
            AMOUNT,
            attacker
        );
    }

    /// @notice POC: Attacker tries to steal through AllEscrowHook as an
    ///         intermediary. Fails because deposits are keyed to allHook's
    ///         address (the legitimate intermediary), and the attacker's
    ///         AllHookThief is a different msg.sender.
    function testAttackViaAllHookIndirection() public {
        // Set up a bundle escrow so tokens are in erc20Hook
        // keyed under allHook's address
        address[] memory hooks = new address[](1);
        hooks[0] = address(erc20Hook);
        bytes[] memory hookDatas = new bytes[](1);
        hookDatas[0] = abi.encode(
            ERC20EscrowHook.HookData({
                token: address(token),
                amount: AMOUNT
            })
        );
        uint256[] memory values = new uint256[](1);
        values[0] = 0;
        bytes memory bundleData = abi.encode(
            AllEscrowHook.HookData({hooks: hooks, hookDatas: hookDatas, values: values})
        );

        HookEscrowObligation.ObligationData memory data = HookEscrowObligation
            .ObligationData({
                arbiter: address(acceptArbiter),
                demand: abi.encode("test"),
                hook: address(allHook),
                hookData: bundleData
            });

        vm.startPrank(buyer);
        token.approve(address(erc20Hook), AMOUNT);
        escrow.doObligation(data, uint64(block.timestamp + EXPIRATION));
        vm.stopPrank();

        // deposits[allHook][token] == AMOUNT
        assertEq(
            erc20Hook.deposits(address(allHook), address(token)),
            AMOUNT
        );

        // Attacker deploys their OWN AllEscrowHook and tries to release
        // through it. The leaf hook sees msg.sender = attackerAllHook,
        // which has zero deposits.
        AllEscrowHook attackerAllHook = new AllEscrowHook();
        AllHookThief thief = new AllHookThief();

        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20EscrowHook.NoDeposit.selector,
                address(attackerAllHook),
                address(token)
            )
        );
        thief.stealViaAll(attackerAllHook, erc20Hook, address(token), AMOUNT);

        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
    }

    /// @notice POC: EOA attacker calls onRelease directly on the hook.
    ///         Fails because the EOA has no deposits.
    function testAttackEOADirectCall() public {
        _createLegitEscrow();

        bytes memory hookData = abi.encode(
            ERC20EscrowHook.HookData({
                token: address(token),
                amount: AMOUNT
            })
        );

        vm.prank(attacker);
        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20EscrowHook.NoDeposit.selector,
                attacker,
                address(token)
            )
        );
        erc20Hook.onRelease(hookData, attacker, attacker);
    }

    /// @notice POC: Attacker creates a second HookEscrowObligation instance
    ///         and tries to release deposits belonging to the first.
    ///         Fails because deposits are keyed per-caller.
    function testAttackFromDifferentObligation() public {
        _createLegitEscrow();

        // Deploy a second obligation contract
        HookEscrowObligation escrow2 = new HookEscrowObligation(
            eas,
            schemaRegistry
        );

        // escrow2 has zero deposits in erc20Hook
        assertEq(
            erc20Hook.deposits(address(escrow2), address(token)),
            0
        );

        // Even if attacker could somehow get escrow2 to call onRelease,
        // the deposit check would fail. Simulate the internal call:
        vm.prank(address(escrow2));
        vm.expectRevert(
            abi.encodeWithSelector(
                ERC20EscrowHook.NoDeposit.selector,
                address(escrow2),
                address(token)
            )
        );
        erc20Hook.onRelease(
            abi.encode(
                ERC20EscrowHook.HookData({
                    token: address(token),
                    amount: AMOUNT
                })
            ),
            attacker,
            address(escrow2)
        );

        // Original deposits untouched
        assertEq(token.balanceOf(address(erc20Hook)), AMOUNT);
    }

    /// @notice Verify that a legitimate collect after attack attempts still works.
    function testLegitCollectAfterFailedAttacks() public {
        bytes32 escrowUid = _createLegitEscrow();

        // Run some failed attacks
        HookThief thief = new HookThief();
        vm.expectRevert();
        thief.stealViaRelease(erc20Hook, address(token), AMOUNT);

        vm.prank(attacker);
        vm.expectRevert();
        erc20Hook.onRelease(
            abi.encode(
                ERC20EscrowHook.HookData({
                    token: address(token),
                    amount: AMOUNT
                })
            ),
            attacker,
            attacker
        );

        // Legitimate collection still works
        address seller_ = makeAddr("seller");
        vm.prank(seller_);
        bytes32 fulUid = stringObligation.doObligation(
            StringObligation.ObligationData({
                item: "done",
                schema: bytes32(0)
            }),
            escrowUid
        );

        vm.prank(seller_);
        escrow.collectEscrow(escrowUid, fulUid);

        assertEq(token.balanceOf(seller_), AMOUNT);
        assertEq(token.balanceOf(address(erc20Hook)), 0);
    }
}
