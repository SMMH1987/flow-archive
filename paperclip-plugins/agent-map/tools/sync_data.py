#!/usr/bin/env python3
"""v3 · 2026-11-22 06:55 Berlin (+decisions from DECISIONS.md, optional 3rd arg). v2 · 2026-11-21 18:45 Berlin (yes/no kept as words). Copies the engine and data into src/generated/ (never hand-edit those files).
  engine: the «موکاپ افزونه» tab of the main Paperclip artifact source (HTML pane, mk-css, mk-js, ag-data)
  data:   flow-archive c4-org/generated/org-agents.json + c4-org/cases/*.yaml
Usage: python tools/sync_data.py <artifact.html> <flow-archive dir> [DECISIONS.md]"""
import sys, re, json, pathlib, yaml
art, repo = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
out = pathlib.Path(__file__).resolve().parent.parent / 'src/generated'; out.mkdir(parents=True, exist_ok=True)
s = art.read_text(encoding='utf-8')
css = s[s.index('/*mk-css*/'):s.index('/*/mk-css*/')]
js = s[s.index('/*mk-js*/'):s.index('/*/mk-js*/')]
a = s.index('<div class="am">'); b = s.index('<div class="am-ft am-muted" id="mk-ts"></div>', a)
html = s[a:b] + '<div class="am-ft am-muted" id="mk-ts"></div></div>'
ag = json.loads(re.search(r'<script type="application/json" id="ag-data">(.*?)</script>', s, re.S).group(1))
ag = {'comps': {}, 'agents': []}  # catalogue companies stay on the hub page; the plugin shows our org + the live company
co = re.search(r'<select id="mk-co">.*?</select>', s, re.S).group(0)
eng = {'css': css, 'js': js, 'html': html, 'select': co}
(out / 'engine.json').write_text(json.dumps(eng, ensure_ascii=False), encoding='utf-8')
org = json.loads((repo / 'c4-org/generated/org-agents.json').read_text(encoding='utf-8'))
def _yn(v):
    # YAML 1.1 reads yes/no as booleans; the case files mean the words
    if isinstance(v, bool): return 'yes' if v else 'no'
    if isinstance(v, list): return [_yn(x) for x in v]
    if isinstance(v, dict): return {k: _yn(x) for k, x in v.items()}
    return v
cases = {p.stem: _yn(yaml.safe_load(p.read_text(encoding='utf-8'))) for p in sorted((repo / 'c4-org/cases').glob('*.yaml'))}
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent)); from decisions import parse
dec_md = pathlib.Path(sys.argv[3]) if len(sys.argv) > 3 else None
if dec_md: decisions = {'source': 'research/paperclip/DECISIONS.md', 'version': next((l for l in dec_md.read_text(encoding='utf-8').splitlines() if l.startswith('نسخه')), ''), 'items': parse(dec_md.read_text(encoding='utf-8'))}
else: decisions = json.loads((out / 'org.json').read_text(encoding='utf-8')).get('decisions') if (out / 'org.json').exists() else None
(out / 'org.json').write_text(json.dumps({'org': org, 'cases': cases, 'decisions': decisions}, ensure_ascii=False), encoding='utf-8')
print('engine', len(js), 'js chars ·', len(org['agents']), 'agents ·', len(org['workflows']), 'workflows ·', len(cases), 'cases ·', len((decisions or {}).get('items', [])), 'decisions')
