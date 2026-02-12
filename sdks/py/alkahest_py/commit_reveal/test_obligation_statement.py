"""
Unit tests for CommitRevealObligationData encode/decode.
"""
import pytest
from alkahest_py import CommitRevealObligationData


def test_basic_encode_decode():
    """Test basic encode/decode roundtrip preserves all fields."""
    salt = "0x" + "11" * 32
    schema = "0x" + "44" * 32
    payload = bytes([0xDE, 0xAD, 0xBE, 0xEF])

    obligation = CommitRevealObligationData(
        payload=payload,
        salt=salt,
        schema=schema,
    )

    encoded = CommitRevealObligationData.encode(obligation)
    decoded = CommitRevealObligationData.decode(encoded)

    assert decoded.payload == bytes(payload), "Payload mismatch"
    assert decoded.salt == salt, "Salt mismatch"
    assert decoded.schema == schema, "Schema mismatch"


def test_encode_decode_empty_payload():
    """Test encode/decode with empty payload."""
    salt = "0x" + "11" * 32
    schema = "0x" + "00" * 32

    obligation = CommitRevealObligationData(
        payload=b"",
        salt=salt,
        schema=schema,
    )

    encoded = CommitRevealObligationData.encode(obligation)
    decoded = CommitRevealObligationData.decode(encoded)

    assert decoded.payload == b"", "Empty payload should roundtrip"
    assert decoded.salt == salt
    assert decoded.schema == schema


def test_encode_decode_large_payload():
    """Test encode/decode with a large payload."""
    salt = "0x" + "11" * 32
    schema = "0x" + "44" * 32
    payload = bytes([0xAB] * 1000)

    obligation = CommitRevealObligationData(
        payload=payload,
        salt=salt,
        schema=schema,
    )

    encoded = CommitRevealObligationData.encode(obligation)
    decoded = CommitRevealObligationData.decode(encoded)

    assert decoded.payload == bytes(payload), "Large payload should roundtrip"


def test_deterministic_encoding():
    """Test that encoding is deterministic."""
    salt = "0x" + "11" * 32
    schema = "0x" + "44" * 32
    payload = bytes([0xDE, 0xAD, 0xBE, 0xEF])

    obligation = CommitRevealObligationData(
        payload=payload,
        salt=salt,
        schema=schema,
    )

    encoded1 = CommitRevealObligationData.encode(obligation)
    encoded2 = CommitRevealObligationData.encode(obligation)
    assert encoded1 == encoded2, "Encoding should be deterministic"


def test_roundtrip_encode_decode_encode():
    """Test encode -> decode -> encode produces same bytes."""
    salt = "0x" + "11" * 32
    schema = "0x" + "44" * 32
    payload = bytes([0xDE, 0xAD, 0xBE, 0xEF])

    obligation = CommitRevealObligationData(
        payload=payload,
        salt=salt,
        schema=schema,
    )

    encoded1 = CommitRevealObligationData.encode(obligation)
    decoded = CommitRevealObligationData.decode(encoded1)
    encoded2 = decoded.encode_self()
    assert encoded1 == encoded2, "Roundtrip encoding should be stable"


def test_encode_self_matches_static():
    """Test that encode_self() produces the same result as static encode()."""
    salt = "0x" + "22" * 32
    schema = "0x" + "55" * 32
    payload = bytes([1, 2, 3, 4, 5])

    obligation = CommitRevealObligationData(
        payload=payload,
        salt=salt,
        schema=schema,
    )

    assert obligation.encode_self() == CommitRevealObligationData.encode(obligation)


def test_different_salts_produce_different_encodings():
    """Test that different salts produce different encoded data."""
    schema = "0x" + "44" * 32
    payload = bytes([0xDE, 0xAD])

    obligation1 = CommitRevealObligationData(
        payload=payload,
        salt="0x" + "11" * 32,
        schema=schema,
    )
    obligation2 = CommitRevealObligationData(
        payload=payload,
        salt="0x" + "22" * 32,
        schema=schema,
    )

    encoded1 = CommitRevealObligationData.encode(obligation1)
    encoded2 = CommitRevealObligationData.encode(obligation2)
    assert encoded1 != encoded2, "Different salts should produce different encodings"


def test_repr():
    """Test __repr__ output."""
    obligation = CommitRevealObligationData(
        payload=bytes([0xDE, 0xAD]),
        salt="0x" + "11" * 32,
        schema="0x" + "44" * 32,
    )
    r = repr(obligation)
    assert "PyCommitRevealObligationData" in r
    assert "2 bytes" in r


def test_field_access():
    """Test that fields are accessible as properties."""
    salt = "0x" + "11" * 32
    schema = "0x" + "44" * 32
    payload = bytes([0xDE, 0xAD, 0xBE, 0xEF])

    obligation = CommitRevealObligationData(
        payload=payload,
        salt=salt,
        schema=schema,
    )

    assert obligation.payload == payload
    assert obligation.salt == salt
    assert obligation.schema == schema
