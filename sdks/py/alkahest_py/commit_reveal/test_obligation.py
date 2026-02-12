"""
Tests for CommitRevealObligation client.
"""
import time
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

@pytest.mark.asyncio
async def test_bond_amount(env, alice_client):
    """Test reading the bond amount from the contract."""
    cr_client = alice_client.commit_reveal
    bond = await cr_client.bond_amount()
    assert isinstance(bond, str)
    bond_int = int(bond)
    assert bond_int >= 0


@pytest.mark.asyncio
async def test_commit_deadline(env, alice_client):
    """Test reading the commit deadline from the contract."""
    cr_client = alice_client.commit_reveal
    deadline = await cr_client.commit_deadline()
    assert isinstance(deadline, str)
    deadline_int = int(deadline)
    assert deadline_int > 0


@pytest.mark.asyncio
async def test_slashed_bond_recipient(env, alice_client):
    """Test reading the slashed bond recipient address."""
    cr_client = alice_client.commit_reveal
    recipient = await cr_client.slashed_bond_recipient()
    assert isinstance(recipient, str)
    assert recipient.startswith("0x")
    assert len(recipient) == 42


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


@pytest.mark.asyncio
async def test_get_obligation(env, alice_client):
    """Test creating and then retrieving a commit-reveal obligation."""
    cr_client = alice_client.commit_reveal

    salt = "0x" + "bb" * 32
    schema = "0x" + "00" * 32
    payload = b"retrieve me"

    uid = await cr_client.do_obligation(payload, salt, schema)

    result = await cr_client.get_obligation(uid)
    attestation = result["attestation"]
    data = result["data"]

    assert attestation.uid == uid
    assert data.payload == payload
    assert data.salt == salt
    assert data.schema == schema


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


@pytest.mark.asyncio
async def test_reclaim_bond_after_reveal(env, alice_client, bob_client):
    """Test reclaiming bond after committing and revealing."""
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

    # Bob reveals (creates fulfillment attestation)
    fulfillment_uid = await bob_cr.do_obligation(payload, salt, schema, ref_uid=ref_uid)
    assert fulfillment_uid.startswith("0x")

    # Bob reclaims bond using the fulfillment UID
    tx_hash = await bob_cr.reclaim_bond(fulfillment_uid)
    assert tx_hash.startswith("0x")

    # Verify commitment is now claimed
    claimed = await bob_cr.is_commitment_claimed(commitment)
    assert claimed is True


# ── Full lifecycle tests (escrow + commit-reveal + collection) ───────────────

@pytest.mark.asyncio
async def test_full_lifecycle_escrow_commit_reveal_collect(env, alice_client, bob_client):
    """Full lifecycle: Alice escrows → Bob commits → reveals → collects escrow → reclaims bond."""
    alice_cr = alice_client.commit_reveal
    bob_cr = bob_client.commit_reveal

    salt = "0x" + "a1" * 32
    schema = "0x" + "00" * 32
    payload = b"hello from bob"

    # 1. Alice creates native-token escrow with CommitReveal as arbiter
    cr_obligation_address = env.addresses.commit_reveal_obligation_addresses.obligation
    escrow_amount = 2_000_000_000_000_000_000  # 2 ETH in wei
    expiration = int(time.time()) + 3600

    escrow_result = await alice_client.native_token.escrow.non_tierable.create(
        {"value": escrow_amount},
        {"arbiter": cr_obligation_address, "demand": b""},
        expiration,
    )
    assert escrow_result is not None
    escrow_uid = escrow_result["log"]["uid"]
    assert escrow_uid != "0x" + "00" * 32

    # 2. Bob computes commitment and commits (locks bond)
    commitment = await bob_cr.compute_commitment(
        ref_uid=escrow_uid,
        claimer=env.bob,
        payload=payload,
        salt=salt,
        schema=schema,
    )
    assert commitment.startswith("0x")
    assert len(commitment) == 66

    tx_hash = await bob_cr.commit(commitment)
    assert tx_hash.startswith("0x")

    # Verify commitment is stored
    commit_block, commit_timestamp, committer = await bob_cr.get_commitment(commitment)
    assert commit_block > 0
    assert commit_timestamp > 0
    assert committer.lower() == env.bob.lower()

    # 3. Bob reveals (creates fulfillment attestation referencing escrow)
    # Anvil automining: each tx gets its own block, so commit/reveal are in different blocks.
    fulfillment_uid = await bob_cr.do_obligation(payload, salt, schema, ref_uid=escrow_uid)
    assert fulfillment_uid.startswith("0x")
    assert len(fulfillment_uid) == 66

    # 4. Bob collects the escrowed native tokens
    collect_tx = await bob_client.native_token.escrow.non_tierable.collect(
        escrow_uid, fulfillment_uid
    )
    assert collect_tx.startswith("0x")

    # 5. Bob reclaims bond
    reclaim_tx = await bob_cr.reclaim_bond(fulfillment_uid)
    assert reclaim_tx.startswith("0x")

    # Verify commitment is now claimed
    claimed = await bob_cr.is_commitment_claimed(commitment)
    assert claimed is True


@pytest.mark.asyncio
async def test_bond_slash_after_deadline(env, alice_client, bob_client):
    """Bond slashing: Bob commits but never reveals → after deadline, bond is slashed."""
    alice_cr = alice_client.commit_reveal
    bob_cr = bob_client.commit_reveal

    salt = "0x" + "b2" * 32
    schema = "0x" + "00" * 32
    payload = b"will not reveal"

    # 1. Alice creates native-token escrow
    cr_obligation_address = env.addresses.commit_reveal_obligation_addresses.obligation
    escrow_amount = 2_000_000_000_000_000_000  # 2 ETH in wei
    expiration = int(time.time()) + 7200

    escrow_result = await alice_client.native_token.escrow.non_tierable.create(
        {"value": escrow_amount},
        {"arbiter": cr_obligation_address, "demand": b""},
        expiration,
    )
    escrow_uid = escrow_result["log"]["uid"]

    # 2. Bob commits
    commitment = await bob_cr.compute_commitment(
        ref_uid=escrow_uid,
        claimer=env.bob,
        payload=payload,
        salt=salt,
        schema=schema,
    )

    tx_hash = await bob_cr.commit(commitment)
    assert tx_hash.startswith("0x")

    # 3. Advance time past the commit deadline without revealing
    deadline = await bob_cr.commit_deadline()
    deadline_seconds = int(deadline)
    await env.god_wallet_provider.anvil_increase_time(deadline_seconds + 1)

    # Mine a block so the new timestamp takes effect
    await env.god_wallet_provider.anvil_mine(1)

    # 4. Anyone slashes the bond
    slash_tx = await alice_cr.slash_bond(commitment)
    assert slash_tx.startswith("0x")

    # Verify commitment is now marked as claimed (slashed)
    claimed = await alice_cr.is_commitment_claimed(commitment)
    assert claimed is True
