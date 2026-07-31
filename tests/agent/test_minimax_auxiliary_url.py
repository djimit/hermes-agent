"""Tests for MiniMax auxiliary client URL normalization.

MiniMax and MiniMax-CN set inference_base_url to the /anthropic path.
The auxiliary client uses the OpenAI SDK, which needs /v1 instead.
"""

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from agent.auxiliary_client import _to_openai_base_url


def test_rewrite_log_redacts_url_credentials(caplog):
    caplog.set_level("DEBUG")

    assert _to_openai_base_url("https://user:secret@example.test/anthropic") == (
        "https://user:secret@example.test/v1"
    )

    assert "secret" not in caplog.text


class TestToOpenaiBaseUrl:
    def test_minimax_global_anthropic_suffix_replaced(self):
        assert _to_openai_base_url("https://api.minimax.io/anthropic") == "https://api.minimax.io/v1"








    def test_none(self):
        assert _to_openai_base_url(None) == ""
