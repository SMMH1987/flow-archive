"""Build the studio page from its single sources of truth.

The studio (docs/mockups/org-flow-artifact.html) is one HTML file that must also open offline and as a
claude.ai artifact, where it cannot read repo files. So every map it shows is a GENERATED, read-only
block inside the page, filled from the .c4 file that owns it. Never edit those blocks by hand.

  python tools/build_studio.py                       # write
  python tools/build_studio.py --check               # exit 1 if any block is stale
  python tools/build_studio.py --journey PATH        # also refresh the Taje Gol journey (lives in that project)

When the page is served over http(s) next to the repo, it also fetches the .c4 files directly at load time.
"""
from __future__ import annotations

import pathlib, sys

import embed_agents  # agents/ -> JSON block (same SSOT rule)

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = ROOT / "docs/mockups/org-flow-artifact.html"
# block id -> source file (relative to repo); None = external project, refreshed only with --journey
BLOCKS = {
    "base-c4": "c4-org/recruitment.c4",
    "studio-c4": "c4-org/startup-studio.c4",
    "talent-c4": "c4-org/startup-talent.c4",
    "orgglobal-c4": "c4-org/org-global.c4",
    "journey-c4": None,
}


def put(page: str, bid: str, text: str) -> str:
    if "</script" in text:
        raise SystemExit(f"{bid}: source contains </script")
    open_ = f'<script type="text/plain" id="{bid}">'
    i = page.index(open_) + len(open_)
    j = page.index("</script>", i)
    return page[:i] + text + page[j:]


def build(page: str, journey: str | None) -> tuple[str, list[str]]:
    notes = []
    for bid, rel in BLOCKS.items():
        src = pathlib.Path(journey) if (rel is None and journey) else (ROOT / rel if rel else None)
        if src is None:
            notes.append(f"{bid}: kept (source in the Taje Gol project; pass --journey PATH to refresh)")
            continue
        if not src.exists():
            notes.append(f"{bid}: kept, {src} not found (e.g. PR not merged yet)")
            continue
        page = put(page, bid, src.read_text(encoding="utf-8"))
    return embed_agents.render(page), notes


def main() -> int:
    args = sys.argv[1:]
    journey = args[args.index("--journey") + 1] if "--journey" in args else None
    page = PAGE.read_text(encoding="utf-8")
    new, notes = build(page, journey)
    for n in notes:
        print("note:", n)
    if "--check" in args:
        if new != page:
            print("stale: run python tools/build_studio.py")
            return 1
        print("ok")
        return 0
    PAGE.write_text(new, encoding="utf-8")
    print("wrote", PAGE.relative_to(ROOT))
    return 0


if __name__ == "__main__":
    sys.exit(main())
