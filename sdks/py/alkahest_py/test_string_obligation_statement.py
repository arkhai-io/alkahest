import pytest
from alkahest_py import EnvTestManager, StringObligationData

@pytest.mark.asyncio
async def test_basic_encode_decode():
    env = EnvTestManager()
    
    obligation = StringObligationData(
        item="test string obligation data"
    )
    
    encoded_data = StringObligationData.encode(obligation)
    decoded_obligation = StringObligationData.decode(encoded_data)

    assert obligation.item == decoded_obligation.item, "Item mismatch"
