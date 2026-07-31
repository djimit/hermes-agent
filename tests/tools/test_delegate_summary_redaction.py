from pathlib import Path

from tools.delegate_tool import _spill_summary_to_file


def test_spilled_summary_redacts_credentials(tmp_path, monkeypatch):
    monkeypatch.setenv("HERMES_HOME", str(tmp_path))
    secret = "ghp_abcdefghijklmnopqrstuvwxyz1234567890"

    path = _spill_summary_to_file(1, f"token={secret}")

    assert path is not None
    assert secret not in Path(path).read_text()
