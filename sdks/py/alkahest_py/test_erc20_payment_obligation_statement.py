import pytest
from alkahest_py import EnvTestManager, ERC20PaymentObligationData

@pytest.mark.asyncio
async def test_basic_encode_decode():
    env = EnvTestManager()
    
    obligation = ERC20PaymentObligationData(
    token=env.mock_addresses.erc20_a,
    amount=100,
    payee=env.addresses.erc20_addresses.payment_obligation
    )
    
    encoded_data = ERC20PaymentObligationData.encode(obligation)
    decoded_obligation = ERC20PaymentObligationData.decode(encoded_data)

    assert obligation.amount == decoded_obligation.amount, "Amount mismatch"
    assert obligation.token.lower() == decoded_obligation.token.lower(), "Token mismatch"
    assert obligation.payee.lower() == decoded_obligation.payee.lower(), "Payee mismatch"
