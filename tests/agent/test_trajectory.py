import json

from agent.trajectory import save_trajectory


def test_save_trajectory_redacts_secrets_but_preserves_content(tmp_path):
    output = tmp_path / "trajectory.jsonl"
    secret = "sk-proj-abc123def456ghi789jkl012"

    save_trajectory([{"from": "human", "value": f"key={secret}; keep this"}], "test", True, str(output))

    stored = output.read_text(encoding="utf-8")
    parsed = json.loads(stored)
    assert secret not in stored
    assert "keep this" in parsed["conversations"][0]["value"]
