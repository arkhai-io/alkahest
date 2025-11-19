import pytest
from alkahest_py import EnvTestManager, ERC20EscrowObligationData

@pytest.mark.asyncio
async def test_basic_encode_decode():
    env = EnvTestManager()
    
    obligation = ERC20EscrowObligationData(
    token=env.mock_addresses.erc20_a,
    amount=100,
    arbiter=env.addresses.erc20_addresses.payment_obligation,
    demand=[1, 2, 3, 4, 5]
    )
    
    encoded_data = ERC20EscrowObligationData.encode(obligation)
    decoded_obligation = ERC20EscrowObligationData.decode(encoded_data)

    assert obligation.amount == decoded_obligation.amount, "Amount mismatch"
    assert obligation.token.lower() == decoded_obligation.token.lower(), "Token mismatch"
    assert obligation.arbiter.lower() == decoded_obligation.arbiter.lower(), "Arbiter mismatch"
    assert obligation.demand == decoded_obligation.demand, "Demand mismatch"
