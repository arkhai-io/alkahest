import pytest
from alkahest_py import EnvTestManager, ERC1155PaymentObligationData

@pytest.mark.asyncio
async def test_basic_encode_decode():
    env = EnvTestManager()
    
    obligation = ERC1155PaymentObligationData(
    token=env.mock_addresses.erc1155_a,
    token_id="98765",
    amount="500",
    payee=env.addresses.erc1155_addresses.payment_obligation
    )
    
    # Test encoding
    encoded_data = ERC1155PaymentObligationData.encode(obligation)
    
    # Verify encoded data is bytes
    assert isinstance(encoded_data, bytes), "Encoded data should be bytes"
    assert len(encoded_data) > 0, "Encoded data should have content"
    
    # Test decoding
    decoded_obligation = ERC1155PaymentObligationData.decode(encoded_data)
    
    assert obligation.token_id == decoded_obligation.token_id, "Token ID mismatch"
    assert obligation.amount == decoded_obligation.amount, "Amount mismatch"
    assert obligation.token.lower() == decoded_obligation.token.lower(), "Token mismatch"
    assert obligation.payee.lower() == decoded_obligation.payee.lower(), "Payee mismatch"
    
    # Test __repr__ method
    repr_str = repr(obligation)
    assert "ERC1155PaymentObligationData" in repr_str, "Repr should contain class name"
    assert obligation.token in repr_str, "Repr should contain token address"
    assert obligation.token_id in repr_str, "Repr should contain token ID"
    assert obligation.amount in repr_str, "Repr should contain amount"
    
    print("✅ ERC1155 Payment Obligation encode/decode test passed!")
    print(f"Original: {obligation}")
    print(f"Decoded: {decoded_obligation}")
