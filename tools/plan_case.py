"""برنامه‌ریز پرونده (مدل پویا با حصار) — نسخه 1 — 2026-11-21 13:05 UTC
از پاسخ‌های پرسش‌نامه، فقط کارهای مجاز همان پرونده را انتخاب و به ترتیب پیش‌نیاز می‌چیند، بعد بازبینی می‌کند:
 - هر کار صاحب (ایجنت موجود در org-agents.yaml) دارد  - external بدون gate = خطا  - جمع برآورد ≤ سقف بودجه
 - کار حذف‌شده با دلیل گزارش می‌شود (قانون STANDARD-PROCESS-BUILD)
این اسکریپت خشک است (هیچ ایجنتی اجرا نمی‌شود). ایجنت برنامه‌ریز (LLM) فقط می‌تواند خروجی همین را ببیند یا از میان همین کارها انتخاب کند.
  python tools/plan_case.py c4-org/cases/hire.yaml --answers '{"country":"IR","seniority":"mid","ad_budget_toman":0,"gender_any":"yes"}'
"""
# v2 · 2026-11-21 18:50 Berlin: model per task from its difficulty (Siax rule, DECISIONS v1.9), not from the agent role
MODEL_BY_DIFF = {"simple": "Haiku", "medium": "Sonnet", "hard": "Opus"}
import json, sys, pathlib, argparse, yaml
ROOT = pathlib.Path(__file__).resolve().parent.parent

def ok(expr, ans):
    if not expr: return True, ''
    try: return bool(eval(expr, {'__builtins__': {}}, dict(ans))), expr
    except NameError as e: return None, f'پاسخ لازم است: {e.name}'

def plan(case, ans):
    _ag = yaml.safe_load((ROOT/'c4-org/org-agents.yaml').read_text(encoding='utf-8'))['agents']; agents = {a['id'] for a in _ag}
    global AGENT_M; AGENT_M = {a['id']: a.get('m') for a in _ag}
    tasks = {t['id']: t for t in case['tasks']}
    keep, skip, need, err = [], [], [], []
    for t in case['tasks']:
        r, why = ok(t.get('when'), ans)
        if r is None: need.append((t['id'], why))
        elif not r: skip.append((t['id'], 'شرط برقرار نیست: ' + why))
        else: keep.append(t['id'])
    kept = set(keep)
    # پیش‌نیاز حذف‌شده → کار وابسته هم حذف (مگر پیش‌نیاز دیگری داشته باشد)
    order, done = [], set()
    while len(order) < len(kept):
        prog = False
        for i in keep:
            if i in done: continue
            deps = [d for d in tasks[i]['after'] if d in kept]
            if all(d in done for d in deps):
                order.append(i); done.add(i); prog = True
        if not prog: err.append('چرخه در پیش‌نیازها'); break
    for i in order:
        t = tasks[i]
        if t['agent'] not in agents: err.append(f'{i}: ایجنت ناشناخته {t["agent"]}')
        if t.get('difficulty') == 'hard' and not t.get('why_hard'): err.append(f'{i}: Opus بدون دلیل ثبت‌شده (why_hard)')
        if t.get('external') == 'yes' or t.get('external') is True:
            if t['mode'] != 'gate': err.append(f'{i}: کار بیرونی بدون gate')
    cost = round(sum(tasks[i]['est'] for i in order), 3)
    cap = ans.get('budget_cap_usd', case.get('budget_cap_usd', 1))
    if cost > cap: err.append(f'برآورد {cost}$ از سقف {cap}$ بیشتر است')
    status = 'needs_input' if need else ('error' if err else 'needs_input:approve_plan')
    return dict(case=case['case'], status=status, answers=ans,
                steps=[dict(n=k + 1, id=i, task=tasks[i]['n'], agent=tasks[i]['agent'], mode=tasks[i]['mode'],
                            difficulty=tasks[i].get('difficulty') or 'unknown', model=('Sonnet' if 'opus' in str(AGENT_M.get(tasks[i]['agent'], '')).lower() else AGENT_M.get(tasks[i]['agent']) or MODEL_BY_DIFF.get(tasks[i].get('difficulty'), 'Sonnet')),  # model stays on the agent; Opus only after separate approval (DECISIONS v2.0/v2.1)
                             gate=tasks[i]['mode'] == 'gate') for k, i in enumerate(order)],
                skipped=[dict(id=i, why=w) for i, w in skip], ask=[dict(id=i, why=w) for i, w in need],
                gates=sum(tasks[i]['mode'] == 'gate' for i in order), est_usd=cost, cap_usd=cap, errors=err)

if __name__ == '__main__':
    p = argparse.ArgumentParser(); p.add_argument('case'); p.add_argument('--answers', default='{}'); p.add_argument('--json', action='store_true')
    a = p.parse_args(); case = yaml.safe_load(pathlib.Path(a.case).read_text(encoding='utf-8'))
    r = plan(case, json.loads(a.answers))
    if a.json: print(json.dumps(r, ensure_ascii=False, indent=1)); sys.exit(0)
    print(f"پرونده: {case['name']} · وضعیت: {r['status']} · {len(r['steps'])} قدم · {r['gates']} تأیید انسانی · برآورد {r['est_usd']}$ از سقف {r['cap_usd']}$")
    for s in r['steps']: print(f"  {s['n']:>2}. {s['task']}  ← {s['agent']} ({s['difficulty']} → {s['model']}{' (سختی نامعلوم)' if s['difficulty'] == 'unknown' else ''}){'  [تأیید تو]' if s['gate'] else ''}")
    for s in r['skipped']: print(f"  ✗ {s['id']}: {s['why']}")
    for s in r['ask']: print(f"  ? {s['id']}: {s['why']}")
    for e in r['errors']: print('  خطا:', e)
