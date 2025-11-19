"""
Test AlkahestClient initialization - simplified to match Rust SDK
"""
import pytest
from alkahest_py import (
    AlkahestClient,
    EnvTestManager,
)


@pytest.mark.asyncio
async def test_alkahest_client_init_default():
    """Test AlkahestClient initialization with default extensions (no custom config)."""
    env = EnvTestManager()

    # Initialize client without custom address config (should use defaults)
    client = AlkahestClient(
        private_key="0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        rpc_url=env.rpc_url
    )

    # Verify the client has all expected extension clients
    assert hasattr(client, 'erc20'), "Client should have ERC20 extension"
    assert hasattr(client, 'erc721'), "Client should have ERC721 extension"
    assert hasattr(client, 'erc1155'), "Client should have ERC1155 extension"
    assert hasattr(client, 'token_bundle'), "Client should have token bundle extension"
    assert hasattr(client, 'attestation'), "Client should have attestation extension"
    assert hasattr(client, 'string_obligation'), "Client should have string obligation extension"
    assert hasattr(client, 'oracle'), "Client should have oracle extension"

    # Verify extensions are accessible (should not raise errors)
    erc20_client = client.erc20
    erc721_client = client.erc721
    erc1155_client = client.erc1155
    token_bundle_client = client.token_bundle
    attestation_client = client.attestation
    string_obligation_client = client.string_obligation
    oracle_client = client.oracle

    # Verify extensions have expected methods
    assert hasattr(erc20_client, 'approve'), "ERC20 client should have approve method"
    assert hasattr(erc721_client, 'approve'), "ERC721 client should have approve method"
    assert hasattr(erc1155_client, 'approve_all'), "ERC1155 client should have approve_all method"
    # Token bundle and other clients exist but may have different method names
    assert token_bundle_client is not None, "Token bundle client should exist"

    print("✅ Default AlkahestClient initialization test passed!")


@pytest.mark.asyncio
async def test_alkahest_client_init_with_custom_config():
    """Test AlkahestClient initialization with custom address configuration."""
    env = EnvTestManager()

    # Use the addresses from the test environment
    custom_config = env.addresses

    # Initialize client with custom address config
    client = AlkahestClient(
        private_key="0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        rpc_url=env.rpc_url,
        address_config=custom_config
    )

    # Verify the client has all expected extension clients
    assert hasattr(client, 'erc20'), "Client should have ERC20 extension"
    assert hasattr(client, 'erc721'), "Client should have ERC721 extension"
    assert hasattr(client, 'erc1155'), "Client should have ERC1155 extension"
    assert hasattr(client, 'token_bundle'), "Client should have token bundle extension"
    assert hasattr(client, 'attestation'), "Client should have attestation extension"
    assert hasattr(client, 'string_obligation'), "Client should have string obligation extension"
    assert hasattr(client, 'oracle'), "Client should have oracle extension"

    # Verify all extensions are accessible
    assert client.erc20 is not None, "ERC20 client should exist"
    assert client.erc721 is not None, "ERC721 client should exist"
    assert client.erc1155 is not None, "ERC1155 client should exist"
    assert client.token_bundle is not None, "Token bundle client should exist"
    assert client.attestation is not None, "Attestation client should exist"
    assert client.string_obligation is not None, "String obligation client should exist"
    assert client.oracle is not None, "Oracle client should exist"

    print("✅ Custom config AlkahestClient initialization test passed!")
