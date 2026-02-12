"""
Tests for CommitRevealObligation client.

Note: CommitRevealObligation is not deployed in the default test environment
(address is set to zero). Tests that require on-chain interaction are marked
with @pytest.mark.skip. The encode/decode tests and client wiring tests
work without a deployed contract.
"""
import pytest
from alkahest_py import CommitRevealObligationData


# ── Client wiring tests (no on-chain calls) ─────────────────────────────────

@pytest.mark.asyncio
async def test_client_accessible(env, alice_client):
    """Test that the commit_reveal client is accessible from AlkahestClient."""
    cr_client = alice_client.commit_reveal
    assert cr_client is not None


@pytest.mark.asyncio
async def test_has_extension(env, alice_client):
    """Test that commit_reveal appears in list_extensions and has_extension."""
    extensions = alice_client.list_extensions()
    assert "commit_reveal" in extensions
    assert alice_client.has_extension("commit_reveal") is True


@pytest.mark.asyncio
async def test_commit_reveal_in_addresses(env):
    """Test that commit_reveal addresses are exposed in the config."""
    addresses = env.addresses
    assert hasattr(addresses, "commit_reveal_obligation_addresses")
    cr_addresses = addresses.commit_reveal_obligation_addresses
    assert cr_addresses is not None
    assert hasattr(cr_addresses, "eas")
    assert hasattr(cr_addresses, "obligation")


# ── Encode/decode integration tests (no on-chain calls) ─────────────────────

@pytest.mark.asyncio
async def test_encode_decode_via_client_data_type():
    """Test that CommitRevealObligationData imported from the package works."""
    salt = "0x" + "ab" * 32
    schema = "0x" + "cd" * 32
    payload = b"integration encode test"

    data = CommitRevealObligationData(
        payload=payload,
        salt=salt,
        schema=schema,
    )

    encoded = data.encode_self()
    assert len(encoded) > 0

    decoded = CommitRevealObligationData.decode(encoded)
    assert decoded.payload == payload
    assert decoded.salt == salt
    assert decoded.schema == schema


@pytest.mark.asyncio
async def test_different_payloads_produce_different_encodings():
    """Test that different obligation data encodes differently."""
    salt = "0x" + "11" * 32
    schema = "0x" + "00" * 32

    data1 = CommitRevealObligationData(payload=b"payload one", salt=salt, schema=schema)
    data2 = CommitRevealObligationData(payload=b"payload two", salt=salt, schema=schema)

    assert data1.encode_self() != data2.encode_self()


@pytest.mark.asyncio
async def test_different_schemas_produce_different_encodings():
    """Test that different schemas produce different encoded data."""
    salt = "0x" + "11" * 32
    payload = b"same payload"

    data1 = CommitRevealObligationData(
        payload=payload, salt=salt, schema="0x" + "aa" * 32
    )
    data2 = CommitRevealObligationData(
        payload=payload, salt=salt, schema="0x" + "bb" * 32
    )

    assert data1.encode_self() != data2.encode_self()


# ── On-chain tests (require deployed CommitRevealObligation contract) ────────
# These tests are skipped by default because the test environment does not
# deploy CommitRevealObligation. To run them against a live deployment,
# remove the skip marker and configure addresses accordingly.

@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_bond_amount(env, alice_client):
    """Test reading the bond amount from the contract."""
    cr_client = alice_client.commit_reveal
    bond = await cr_client.bond_amount()
    assert isinstance(bond, str)
    bond_int = int(bond)
    assert bond_int >= 0


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_commit_deadline(env, alice_client):
    """Test reading the commit deadline from the contract."""
    cr_client = alice_client.commit_reveal
    deadline = await cr_client.commit_deadline()
    assert isinstance(deadline, str)
    deadline_int = int(deadline)
    assert deadline_int > 0


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_slashed_bond_recipient(env, alice_client):
    """Test reading the slashed bond recipient address."""
    cr_client = alice_client.commit_reveal
    recipient = await cr_client.slashed_bond_recipient()
    assert isinstance(recipient, str)
    assert recipient.startswith("0x")
    assert len(recipient) == 42


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_do_obligation(env, alice_client):
    """Test creating a commit-reveal obligation."""
    cr_client = alice_client.commit_reveal

    salt = "0x" + "aa" * 32
    schema = "0x" + "00" * 32
    payload = b"test obligation payload"

    uid = await cr_client.do_obligation(payload, salt, schema)
    assert uid.startswith("0x")
    assert len(uid) == 66


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_get_obligation(env, alice_client):
    """Test creating and then retrieving a commit-reveal obligation."""
    cr_client = alice_client.commit_reveal

    salt = "0x" + "bb" * 32
    schema = "0x" + "00" * 32
    payload = b"retrieve me"

    uid = await cr_client.do_obligation(payload, salt, schema)

    result = await cr_client.get_obligation(uid)
    attestation, data = result

    assert attestation.uid == uid
    assert data.payload == payload
    assert data.salt == salt
    assert data.schema == schema


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_compute_commitment(env, alice_client, bob_client):
    """Test computing a commitment hash."""
    cr_client = alice_client.commit_reveal

    salt = "0x" + "cc" * 32
    schema = "0x" + "00" * 32
    payload = b"commitment test"

    ref_uid = await cr_client.do_obligation(payload, salt, schema)

    commitment = await cr_client.compute_commitment(
        ref_uid=ref_uid,
        claimer=env.bob,
        payload=payload,
        salt=salt,
        schema=schema,
    )

    assert commitment.startswith("0x")
    assert len(commitment) == 66


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_commit_and_get_commitment(env, alice_client, bob_client):
    """Test the commit flow: create obligation, compute commitment, commit, verify."""
    alice_cr = alice_client.commit_reveal
    bob_cr = bob_client.commit_reveal

    salt = "0x" + "dd" * 32
    schema = "0x" + "00" * 32
    payload = b"commit flow test"

    ref_uid = await alice_cr.do_obligation(payload, salt, schema)

    commitment = await bob_cr.compute_commitment(
        ref_uid=ref_uid,
        claimer=env.bob,
        payload=payload,
        salt=salt,
        schema=schema,
    )

    tx_hash = await bob_cr.commit(commitment)
    assert tx_hash.startswith("0x")

    commit_block, commit_timestamp, committer = await bob_cr.get_commitment(commitment)
    assert commit_block > 0
    assert commit_timestamp > 0
    assert committer.lower() == env.bob.lower()


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_is_commitment_claimed_false_before_reveal(env, alice_client, bob_client):
    """Test that a commitment is not claimed before being revealed."""
    alice_cr = alice_client.commit_reveal
    bob_cr = bob_client.commit_reveal

    salt = "0x" + "ee" * 32
    schema = "0x" + "00" * 32
    payload = b"claim check"

    ref_uid = await alice_cr.do_obligation(payload, salt, schema)

    commitment = await bob_cr.compute_commitment(
        ref_uid=ref_uid,
        claimer=env.bob,
        payload=payload,
        salt=salt,
        schema=schema,
    )

    await bob_cr.commit(commitment)

    claimed = await bob_cr.is_commitment_claimed(commitment)
    assert claimed is False


@pytest.mark.skip(reason="CommitRevealObligation not deployed in test env")
@pytest.mark.asyncio
async def test_reclaim_bond_after_deadline(env, alice_client, bob_client):
    """Test reclaiming bond after the commit deadline passes without a reveal."""
    alice_cr = alice_client.commit_reveal
    bob_cr = bob_client.commit_reveal

    salt = "0x" + "ff" * 32
    schema = "0x" + "00" * 32
    payload = b"reclaim test"

    ref_uid = await alice_cr.do_obligation(payload, salt, schema)

    commitment = await bob_cr.compute_commitment(
        ref_uid=ref_uid,
        claimer=env.bob,
        payload=payload,
        salt=salt,
        schema=schema,
    )

    await bob_cr.commit(commitment)

    deadline = await bob_cr.commit_deadline()
    deadline_seconds = int(deadline)
    await env.god_wallet_provider.anvil_increase_time(deadline_seconds + 1)

    tx_hash = await bob_cr.reclaim_bond(ref_uid)
    assert tx_hash.startswith("0x")
