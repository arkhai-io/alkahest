import pytest
from alkahest_py import AlkahestClient, EnvTestManager, MockERC20


@pytest.mark.asyncio
async def test_approvals(env, alice_client):
    # Test payment approval
    mock_erc20_1 = MockERC20(env.mock_addresses.erc20_a, env.god_wallet_provider)

    mock_erc20_1.transfer(env.alice, 100)

    token_data = {"address": env.mock_addresses.erc20_a, "value": 100}
    receipt_hash = await alice_client.erc20.util.approve(token_data, "payment")

    payment_allowance = mock_erc20_1.allowance(env.alice, env.addresses.erc20_addresses.payment_obligation)
    assert payment_allowance == 100, "Payment approval failed"

    # Test escrow approval - create a new env and client for independent test
    env2 = EnvTestManager()
    alice_client_2 = AlkahestClient(
        private_key=env2.alice_private_key,
        rpc_url=env2.rpc_url,
        address_config=env2.addresses,
    )
    mock_erc20_2 = MockERC20(env2.mock_addresses.erc20_a, env2.god_wallet_provider)

    mock_erc20_2.transfer(env2.alice, 100)

    token_data = {"address": env2.mock_addresses.erc20_a, "value": 100}
    receipt_hash = await alice_client_2.erc20.util.approve(token_data, "escrow")

    escrow_allowance = mock_erc20_2.allowance(env2.alice, env2.addresses.erc20_addresses.escrow_obligation_nontierable)
    assert escrow_allowance == 100, "Escrow approval failed"
