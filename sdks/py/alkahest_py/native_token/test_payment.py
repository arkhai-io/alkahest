import pytest
from alkahest_py import EnvTestManager

@pytest.mark.asyncio
async def test_native_token_payment(env, bob_client):
    """
    Test native token direct payment functionality.

    Flow:
    1. Bob makes a direct native token payment to Alice
    """

    # Use a small amount for testing
    payment_amount = 1000  # wei

    # Bob makes native token payment to Alice
    native_data = {"value": payment_amount}
    payment_result = await bob_client.native_token.payment.pay(
        native_data, env.alice  # payee address
    )

    assert payment_result is not None, "Payment should return a result"
    assert 'log' in payment_result, "Payment result should contain log"
    assert payment_result['log']['uid'] != "0x" + "00" * 32, "Should have valid payment UID"

    print(f"Native token payment succeeded: {payment_result['log']['uid']}")
