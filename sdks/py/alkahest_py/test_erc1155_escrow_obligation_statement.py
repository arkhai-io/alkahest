import pytest
from alkahest_py import EnvTestManager, ERC1155EscrowObligationData

@pytest.mark.asyncio
async def test_basic_encode_decode():
    env = EnvTestManager()
    
    obligation = ERC1155EscrowObligationData(
    token=env.mock_addresses.erc1155_a,
    token_id="54321",
    amount="250",
    arbiter=env.addresses.erc1155_addresses.escrow_obligation,
    demand=[1, 2, 3, 4, 5]
    )
    
    encoded_data = ERC1155EscrowObligationData.encode(obligation)
    decoded_obligation = ERC1155EscrowObligationData.decode(encoded_data)

    assert obligation.token_id == decoded_obligation.token_id, "Token ID mismatch"
    assert obligation.amount == decoded_obligation.amount, "Amount mismatch"
    assert obligation.token.lower() == decoded_obligation.token.lower(), "Token mismatch"
    assert obligation.arbiter.lower() == decoded_obligation.arbiter.lower(), "Arbiter mismatch"
    assert obligation.demand == decoded_obligation.demand, "Demand mismatch"
