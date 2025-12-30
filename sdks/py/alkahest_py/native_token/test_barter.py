import pytest
import time
from alkahest_py import EnvTestManager, MockERC20


@pytest.mark.asyncio
async def test_buy_erc20_for_native():
    """
    Test buying ERC20 with native tokens.
    Alice escrows native tokens demanding ERC20.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei of native token
    ask_amount = 100  # ERC20 amount

    # Alice escrows native token, demanding ERC20
    native_data = {"value": escrow_amount}
    ask_data = {"address": env.mock_addresses.erc20_a, "value": ask_amount}
    expiration = 0  # no expiration

    escrow_result = await env.alice_client.native_token.barter.buy_erc20_for_native(
        native_data, ask_data, expiration
    )

    assert escrow_result is not None, "Escrow creation should succeed"
    assert 'log' in escrow_result, "Should have log in result"
    escrow_uid = escrow_result['log']['uid']
    assert escrow_uid != "0x" + "00" * 32, "Should have valid escrow UID"

    print(f"Buy ERC20 for native escrow created: {escrow_uid}")


@pytest.mark.asyncio
async def test_pay_erc20_for_native():
    """
    Test paying ERC20 for native tokens.
    Alice escrows native tokens demanding ERC20, Bob pays with ERC20.
    """
    env = EnvTestManager()
    mock_erc20 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)

    # Setup: Bob has ERC20 to pay with
    mock_erc20.transfer(env.bob, 100)

    escrow_amount = 1000  # wei of native token Alice offers
    ask_amount = 100  # ERC20 amount Alice wants

    native_data = {"value": escrow_amount}
    ask_data = {"address": env.mock_addresses.erc20_a, "value": ask_amount}

    # Alice creates native-for-erc20 escrow (offering native, wanting ERC20)
    escrow_result = await env.alice_client.native_token.barter.buy_erc20_for_native(
        native_data, ask_data, 0
    )

    escrow_uid = escrow_result['log']['uid']

    # Bob approves and pays with ERC20 using pay_erc20_for_native
    await env.bob_client.erc20.util.approve(ask_data, "barter")
    payment_result = await env.bob_client.erc20.barter.pay_erc20_for_native(escrow_uid)

    assert payment_result is not None, "Payment should succeed"
    assert 'log' in payment_result, "Should have log in result"

    print(f"ERC20 payment for native token escrow succeeded: {payment_result['log']['uid']}")


@pytest.mark.asyncio
async def test_buy_native_for_native():
    """
    Test buying native tokens with native tokens (native-to-native swap).
    """
    env = EnvTestManager()

    bid_amount = 1000  # wei Alice offers
    ask_amount = 500  # wei Alice wants

    bid_data = {"value": bid_amount}
    ask_data = {"value": ask_amount}

    # Alice creates native-for-native escrow
    escrow_result = await env.alice_client.native_token.barter.buy_native_for_native(
        bid_data, ask_data, 0
    )

    assert escrow_result is not None, "Escrow should succeed"
    escrow_uid = escrow_result['log']['uid']

    # Bob pays with native tokens
    payment_result = await env.bob_client.native_token.barter.pay_native_for_native(escrow_uid)

    assert payment_result is not None, "Payment should succeed"
    print(f"Native-for-native swap succeeded")


@pytest.mark.asyncio
async def test_buy_erc721_for_native():
    """
    Test buying ERC721 with native tokens.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei

    native_data = {"value": escrow_amount}
    ask_data = {"address": env.mock_addresses.erc721_a, "id": 1}

    escrow_result = await env.alice_client.native_token.barter.buy_erc721_for_native(
        native_data, ask_data, 0
    )

    assert escrow_result is not None, "Escrow should succeed"
    print(f"Buy ERC721 for native escrow created: {escrow_result['log']['uid']}")


@pytest.mark.asyncio
async def test_buy_erc1155_for_native():
    """
    Test buying ERC1155 with native tokens.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei

    native_data = {"value": escrow_amount}
    ask_data = {"address": env.mock_addresses.erc1155_a, "id": 1, "value": 10}

    escrow_result = await env.alice_client.native_token.barter.buy_erc1155_for_native(
        native_data, ask_data, 0
    )

    assert escrow_result is not None, "Escrow should succeed"
    print(f"Buy ERC1155 for native escrow created: {escrow_result['log']['uid']}")


@pytest.mark.asyncio
async def test_buy_bundle_for_native():
    """
    Test buying token bundle with native tokens.
    """
    env = EnvTestManager()

    escrow_amount = 1000  # wei

    native_data = {"value": escrow_amount}
    bundle_data = {
        "erc20s": [{"address": env.mock_addresses.erc20_a, "value": 100}],
        "erc721s": [],
        "erc1155s": [],
        "native_amount": 0,
    }

    escrow_result = await env.alice_client.native_token.barter.buy_bundle_for_native(
        native_data, bundle_data, 0
    )

    assert escrow_result is not None, "Escrow should succeed"
    print(f"Buy bundle for native escrow created: {escrow_result['log']['uid']}")
