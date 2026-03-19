"""Direct mode tests for NLPArbiterCoprocessor.

Pure helper function tests run with standard pytest (no genlayer SDK needed).
Contract deployment and LLM mock tests require genlayer-test pytest plugin.
"""

import json
import sys
import os
import pytest

# Add the contract directory to the path so we can import helper functions
CONTRACT_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..")
)

# Try importing genlayer; stub gl.vm.UserError if not available
# so the pure helper functions can be tested without the SDK.
try:
    import genlayer
    HAS_GENLAYER = True
except ImportError:
    HAS_GENLAYER = False

    # Minimal stub so nlp_arbiter module can import
    import types
    gl_mod = types.ModuleType("genlayer")

    class _FakeGL:
        class Contract:
            pass

        class public:
            class write:
                def __call__(self, f):
                    return f

            class view:
                def __call__(self, f):
                    return f

            write = staticmethod(lambda f: f)
            view = staticmethod(lambda f: f)

        class vm:
            class UserError(Exception):
                pass

            class Return:
                pass

            @staticmethod
            def run_nondet_unsafe(leader, validator):
                return leader()

        class nondet:
            @staticmethod
            def exec_prompt(prompt, **kwargs):
                return {}

        class evm:
            @staticmethod
            def contract_interface(cls):
                return cls

        class eq_principle:
            pass

    gl_obj = _FakeGL()
    gl_mod.gl = gl_obj  # type: ignore
    gl_mod.__dict__.update({
        "gl": gl_obj,
        "Address": str,
        "u256": int,
        "bytes32": bytes,
        "TreeMap": dict,
        "DynArray": list,
    })
    # Inject star-import names
    for attr in ("gl", "Address", "u256", "bytes32", "TreeMap", "DynArray"):
        gl_mod.__dict__[attr] = gl_mod.__dict__[attr]
    sys.modules["genlayer"] = gl_mod

sys.path.insert(0, CONTRACT_DIR)

from nlp_arbiter import _decode_string_obligation, _parse_evaluation


# ──────────────────────────────────────────────
# Helper: ABI-encode StringObligation.ObligationData
# ──────────────────────────────────────────────


def abi_encode_string_obligation(item: str, schema: bytes = b"\x00" * 32) -> bytes:
    """Encode (string item, bytes32 schema) matching Solidity's abi.encode."""
    item_bytes = item.encode("utf-8")
    # Head: offset to string (64) + schema bytes32
    offset = (64).to_bytes(32, "big")
    schema_padded = schema.rjust(32, b"\x00")
    # Tail: string length + string data (padded to 32-byte boundary)
    str_len = len(item_bytes).to_bytes(32, "big")
    padding_len = (32 - len(item_bytes) % 32) % 32
    str_data = item_bytes + b"\x00" * padding_len
    return offset + schema_padded + str_len + str_data


# ──────────────────────────────────────────────
# _decode_string_obligation tests
# ──────────────────────────────────────────────


class TestDecodeStringObligation:
    def test_simple_string(self):
        data = abi_encode_string_obligation("hello world")
        assert _decode_string_obligation(data) == "hello world"

    def test_empty_string(self):
        data = abi_encode_string_obligation("")
        assert _decode_string_obligation(data) == ""

    def test_long_string(self):
        long_text = "A" * 1000
        data = abi_encode_string_obligation(long_text)
        assert _decode_string_obligation(data) == long_text

    def test_unicode_string(self):
        text = "Hello 世界 🌍"
        data = abi_encode_string_obligation(text)
        assert _decode_string_obligation(data) == text

    def test_multiline_string(self):
        text = "line one\nline two\nline three"
        data = abi_encode_string_obligation(text)
        assert _decode_string_obligation(data) == text

    def test_string_with_special_chars(self):
        text = 'key: "value", <tag> & more'
        data = abi_encode_string_obligation(text)
        assert _decode_string_obligation(data) == text

    def test_exactly_32_bytes(self):
        text = "A" * 32
        data = abi_encode_string_obligation(text)
        assert _decode_string_obligation(data) == text

    def test_data_too_short_returns_empty(self):
        assert _decode_string_obligation(b"\x00" * 63) == ""
        assert _decode_string_obligation(b"") == ""

    def test_with_nonzero_schema(self):
        schema = bytes.fromhex(
            "abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789"
        )
        data = abi_encode_string_obligation("test content", schema)
        assert _decode_string_obligation(data) == "test content"


# ──────────────────────────────────────────────
# _parse_evaluation tests
# ──────────────────────────────────────────────


class TestParseEvaluation:
    def test_standard_true_response(self):
        result = _parse_evaluation(
            {"satisfies": True, "reasoning": "Content matches the condition."}
        )
        assert result["satisfies"] is True
        assert result["reasoning"] == "Content matches the condition."

    def test_standard_false_response(self):
        result = _parse_evaluation(
            {"satisfies": False, "reasoning": "Content does not match."}
        )
        assert result["satisfies"] is False

    def test_string_true_values(self):
        for val in ("true", "True", "TRUE", "yes", "Yes", "1"):
            result = _parse_evaluation({"satisfies": val})
            assert result["satisfies"] is True, f"Failed for value: {val}"

    def test_string_false_values(self):
        for val in ("false", "False", "no", "No", "0", "maybe"):
            result = _parse_evaluation({"satisfies": val})
            assert result["satisfies"] is False, f"Failed for value: {val}"

    def test_alternate_key_result(self):
        result = _parse_evaluation({"result": True, "reasoning": "ok"})
        assert result["satisfies"] is True

    def test_alternate_key_decision(self):
        result = _parse_evaluation({"decision": False})
        assert result["satisfies"] is False

    def test_alternate_key_passes(self):
        result = _parse_evaluation({"passes": True})
        assert result["satisfies"] is True

    def test_alternate_key_meets_condition(self):
        result = _parse_evaluation({"meets_condition": True})
        assert result["satisfies"] is True

    def test_missing_reasoning_defaults_empty(self):
        result = _parse_evaluation({"satisfies": True})
        assert result["reasoning"] == ""

    def test_non_dict_raises(self):
        with pytest.raises(Exception, match="Non-dict"):
            _parse_evaluation("not a dict")

    def test_non_dict_list_raises(self):
        with pytest.raises(Exception, match="Non-dict"):
            _parse_evaluation([True])

    def test_missing_satisfies_key_raises(self):
        with pytest.raises(Exception, match="Missing 'satisfies'"):
            _parse_evaluation({"reasoning": "no decision given"})

    def test_empty_dict_raises(self):
        with pytest.raises(Exception, match="Missing 'satisfies'"):
            _parse_evaluation({})

    def test_integer_coercion(self):
        assert _parse_evaluation({"satisfies": 1})["satisfies"] is True
        assert _parse_evaluation({"satisfies": 0})["satisfies"] is False

    def test_whitespace_string(self):
        result = _parse_evaluation({"satisfies": "  true  "})
        assert result["satisfies"] is True


# ──────────────────────────────────────────────
# Contract deployment & LLM mock tests (require genlayer SDK)
# ──────────────────────────────────────────────

CONTRACT_PATH = os.path.join(CONTRACT_DIR, "nlp_arbiter.py")

genlayer_only = pytest.mark.skipif(
    not HAS_GENLAYER, reason="genlayer SDK not installed"
)


@genlayer_only
def test_contract_deploys(direct_deploy, direct_alice):
    """Verify the contract can be instantiated."""
    contract = direct_deploy(
        CONTRACT_PATH,
        args=[direct_alice, direct_alice],
    )
    assert contract is not None


@genlayer_only
def test_llm_satisfies_true(direct_vm, direct_deploy, direct_alice):
    """Test LLM evaluation returning true via mock."""
    contract = direct_deploy(
        CONTRACT_PATH,
        args=[direct_alice, direct_alice],
    )
    direct_vm.sender = direct_alice

    direct_vm.mock_llm(
        r".*impartial evaluator.*",
        json.dumps({"satisfies": True, "reasoning": "Content clearly meets the condition."}),
    )


@genlayer_only
def test_llm_satisfies_false(direct_vm, direct_deploy, direct_alice):
    """Test LLM evaluation returning false via mock."""
    contract = direct_deploy(
        CONTRACT_PATH,
        args=[direct_alice, direct_alice],
    )
    direct_vm.sender = direct_alice

    direct_vm.mock_llm(
        r".*impartial evaluator.*",
        json.dumps({"satisfies": False, "reasoning": "Content does not meet the condition."}),
    )
