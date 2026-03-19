# { "Depends": "py-genlayer:test" }

import json
from genlayer import *


# EVM interface to the Solidity arbiter contract
@gl.evm.contract_interface
class GenLayerNLPArbiter:
    class Write:
        def arbitrate(self, obligation: bytes32, query: str, decision: bool) -> None: ...


# EVM interface to read EAS attestations
@gl.evm.contract_interface
class EAS:
    class View:
        def get_attestation(self, uid: bytes32) -> tuple: ...


# Error classification for consensus
ERROR_EXPECTED = "[EXPECTED]"
ERROR_LLM = "[LLM_ERROR]"


class NLPArbiterCoprocessor(gl.Contract):
    """GenLayer intelligent contract that evaluates whether a StringObligation's
    content satisfies a natural language demand.

    Flow:
    1. Someone calls `evaluate()` with an obligation UID, query, and arbiter address
    2. This contract reads the obligation data from EAS on the EVM side
    3. Uses LLM to evaluate if the obligation's string content satisfies the query
    4. Posts the decision back to the Solidity GenLayerNLPArbiter via `arbitrate()`
    """

    arbiter_address: Address
    eas_address: Address

    def __init__(self, arbiter_address: Address, eas_address: Address):
        self.arbiter_address = arbiter_address
        self.eas_address = eas_address

    @gl.public.write
    def evaluate(self, obligation_uid: bytes32, query: str) -> bool:
        """Evaluate whether a StringObligation satisfies a natural language query.

        Args:
            obligation_uid: The EAS attestation UID of the StringObligation
            query: Natural language condition to evaluate against

        Returns:
            The boolean decision (also posted to the Solidity arbiter)
        """
        # Read the obligation data from EAS
        eas = EAS(self.eas_address)
        attestation = eas.view().get_attestation(obligation_uid)

        # The attestation data field contains ABI-encoded StringObligation.ObligationData
        # which is (string item, bytes32 schema)
        obligation_data = attestation[9]  # data field in Attestation struct
        if not obligation_data or len(obligation_data) == 0:
            raise gl.vm.UserError(
                f"{ERROR_EXPECTED} Empty obligation data for UID {obligation_uid}"
            )

        # Decode the string content from the obligation
        # StringObligation.ObligationData is abi.encode((string item, bytes32 schema))
        content = _decode_string_obligation(obligation_data)

        if not content or content.strip() == "":
            raise gl.vm.UserError(
                f"{ERROR_EXPECTED} Obligation contains empty string content"
            )

        # Use LLM to evaluate if the content satisfies the query
        decision = self._evaluate_with_llm(content, query)

        # Post decision back to the Solidity arbiter
        arbiter = GenLayerNLPArbiter(self.arbiter_address)
        arbiter.emit(on="finalized").arbitrate(obligation_uid, query, decision)

        return decision

    def _evaluate_with_llm(self, content: str, query: str) -> bool:
        """Use LLM with consensus to evaluate if content satisfies the query."""

        prompt = f"""You are an impartial evaluator. You must determine whether the
following CONTENT satisfies the given CONDITION.

CONTENT:
{content}

CONDITION:
{query}

Respond with a JSON object containing:
- "satisfies": true or false
- "reasoning": a brief explanation of your decision

Be strict and literal in your evaluation. Only return true if the content
clearly and unambiguously satisfies the condition."""

        def leader_fn():
            result = gl.nondet.exec_prompt(prompt, response_format="json")
            return _parse_evaluation(result)

        def validator_fn(leaders_res):
            if not isinstance(leaders_res, gl.vm.Return):
                return _handle_leader_error(leaders_res, leader_fn)

            # Validator independently evaluates
            validator_result = leader_fn()

            # Both must agree on the boolean decision
            return leaders_res.calldata["satisfies"] == validator_result["satisfies"]

        result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
        return result["satisfies"]


def _decode_string_obligation(data: bytes) -> str:
    """Decode the string item from ABI-encoded StringObligation.ObligationData.

    The data is abi.encode((string item, bytes32 schema)).
    We extract just the string item.
    """
    # ABI encoding: offset to string (32 bytes) + schema (32 bytes) + string length + string data
    # The first 32 bytes are the offset to the string data
    # The next 32 bytes are the schema (bytes32)
    # Then string length + string data at the offset
    if len(data) < 64:
        return ""

    # Read offset to string (first 32 bytes)
    offset = int.from_bytes(data[0:32], "big")

    # Read string length at offset
    str_len = int.from_bytes(data[offset : offset + 32], "big")

    # Read string data
    str_data = data[offset + 32 : offset + 32 + str_len]
    return str_data.decode("utf-8")


def _parse_evaluation(result) -> dict:
    """Parse and validate LLM evaluation response."""
    if not isinstance(result, dict):
        raise gl.vm.UserError(f"{ERROR_LLM} Non-dict response: {type(result)}")

    satisfies = result.get("satisfies")
    if satisfies is None:
        # Try alternate keys
        for alt in ("result", "decision", "passes", "meets_condition"):
            if alt in result:
                satisfies = result[alt]
                break

    if satisfies is None:
        raise gl.vm.UserError(
            f"{ERROR_LLM} Missing 'satisfies' key. Keys: {list(result.keys())}"
        )

    # Coerce to bool
    if isinstance(satisfies, str):
        satisfies = satisfies.lower().strip() in ("true", "yes", "1")
    else:
        satisfies = bool(satisfies)

    reasoning = str(result.get("reasoning", ""))
    return {"satisfies": satisfies, "reasoning": reasoning}


def _handle_leader_error(leaders_res, leader_fn) -> bool:
    """Canonical error handler for validator consensus on failures."""
    leader_msg = leaders_res.message if hasattr(leaders_res, "message") else ""
    try:
        leader_fn()
        return False  # Leader errored, validator succeeded — disagree
    except gl.vm.UserError as e:
        validator_msg = e.message if hasattr(e, "message") else str(e)
        # Deterministic errors must match exactly
        if validator_msg.startswith(ERROR_EXPECTED):
            return validator_msg == leader_msg
        # LLM errors: disagree to force rotation
        return False
    except Exception:
        return False
