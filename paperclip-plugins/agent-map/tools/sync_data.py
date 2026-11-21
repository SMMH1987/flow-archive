#!/usr/bin/env python3
"""v1 · 2026-11-21 17:05 Berlin. Copies the engine and data into src/generated/ (never hand-edit those files).
  engine: the «موکاپ افزونه» tab of the main Paperclip artifact source (HTML pane, mk-css, mk-js, ag-data)
  data:   flow-archive c4-org/generated/org-agents.json + c4-org/cases/*.yaml
Usage: python tools/sync_data.py <artifact.html> <flow-archive dir>"""
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
cases = {p.stem: yaml.safe_load(p.read_text(encoding='utf-8')) for p in sorted((repo / 'c4-org/cases').glob('*.yaml'))}
(out / 'org.json').write_text(json.dumps({'org': org, 'cases': cases}, ensure_ascii=False), encoding='utf-8')
print('engine', len(js), 'js chars ·', len(org['agents']), 'agents ·', len(org['workflows']), 'workflows ·', len(cases), 'cases')
