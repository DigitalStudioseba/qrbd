#!/usr/bin/env python3
# Invariance gate: candidate must differ from live T-0 ONLY inside <style> regions.
import sys, re, hashlib, html
LIVE, CAND = sys.argv[1], sys.argv[2]
def load(p): return open(p, 'rb').read().decode('utf-8').replace('\r\n', '\n')   # newline-normalized compare
L, C = load(LIVE), load(CAND)

def style_spans(s): return [(m.start(), m.end()) for m in re.finditer(r'<style[^>]*>.*?</style>', s, re.S)]
def split(s, spans):
    css, non = [], []
    pos = 0
    for a, bqb in [(sp[0], sp[1]) for sp in spans]:
        non.append(s[pos:a]); css.append(s[a:bqb]); pos = bqb
    non.append(s[pos:])
    return css, non

ls, cs = style_spans(L), style_spans(C)
lc, cc = split(L, ls), split(C, cs)
results = []
ok = lambda b: 'PASS' if b else 'FAIL'
# CSS lives in <style> blocks AND style="…" attributes; compare everything else byte-exact,
# and require style-attribute deltas to be pure hex-color token remaps of identical shape.
nsattr = lambda s: re.sub(r'style="[^"]*"', 'style="S"', s)
outside_noattr = lambda chunks: ''.join(nsattr(''.join(chunks[1])).split('\x00')) if False else nsattr(''.join(chunks[1]))
res1 = outside_noattr(lc) == outside_noattr(cc)
LA, CA = re.findall(r'style="([^"]*)"', ''.join(lc[1])), re.findall(r'style="([^"]*)"', ''.join(cc[1]))
pairs_ok = len(LA) == len(CA)
tok = lambda s: re.sub(r'#[0-9a-fA-F]{3,8}', '#X', s)
deltas = [(a, b) for a, b in zip(LA, CA) if a != b]
pairs_ok = pairs_ok and all(tok(a) == tok(b) for a, b in deltas)
results.append(('INV-1  non-CSS bytes identical (style attrs normalized)', res1))
results.append(('INV-1b style-attr deltas are color-only remaps (%d changed)' % len(deltas), pairs_ok))
Lq, Cq = re.findall(r'<script[^>]*>.*?</script>', L, re.S), re.findall(r'<script[^>]*>.*?</script>', C, re.S)
results.append(('INV-2  script blocks identical', Lq == Cq))
results.append(('INV-2b script count live=%d cand=%d' % (len(Lq), len(Cq)), len(Lq) == len(Cq) == 20))
attr2 = re.compile("(?:id|class)='([^']*)'")
attr = lambda s: set(re.findall(r'(?:id|class|data-[a-z-]+)="([^"]*)"', s)) | set(attr2.findall(s))
results.append(('INV-3  attribute universe unchanged', attr(L) == attr(C)))
txt = lambda s: [re.sub(r'\s+', ' ', x).strip() for x in re.sub(r'<[^>]+>', '\x00', re.sub(r'<(script|style)[^>]*>.*?</\1>', '', s, flags=re.S)).split('\x00') if x.strip()]
results.append(('INV-4  text nodes identical (COPY FREEZE)', txt(L) == txt(C)))
can1, can2 = L.split('<script', 1)[1].split('</script>')[0], C.split('<script', 1)[1].split('</script>')[0]
results.append(('INV-5  canary byte-identical', can1 == can2 and 'QSP-7f3a9c1e' in can2))
feats = ['--fc1', '--fc2', 'fest-strip', 'https://qrseprint.in/og-image.png', 'data-cfemail', 'work-67']
results.append(('INV-6  production features preserved', all(f in C for f in feats)))
OLD_TOKENS = ['#ec4899;', '#8b5cf6;', '#3b82f6;']
results.append(('INV-7  legacy brand tokens eliminated', not any(t in ''.join(cc[0]) for t in OLD_TOKENS)))
import json, subprocess, tempfile, os
jsok = True
for i, m in enumerate(re.finditer(r'<script>(.*?)</script>', C, re.S)):
    if not m.group(1).strip(): continue
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as f: f.write(m.group(1)); p = f.name
    r = subprocess.run(['node', '--check', p], capture_output=True); os.unlink(p)
    if r.returncode: jsok = False; print('   node --check FAIL at script', i, r.stderr.decode()[:200])
results.append(('INV-8  extracted JS syntax (node --check)', jsok))
def jsonld(s):
    docs = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
    return [json.loads(d.strip()) for d in docs]
results.append(('INV-9  JSON-LD blocks identical & valid', jsonld(L) == jsonld(C) and len(jsonld(C)) == 6))
results.append(('INV-10 style block count identical', len(ls) == len(cs) == 9))
for name, r in results: print(ok(r), name)
print('GATE:', 'ALL PASS' if all(r for _, r in results) else 'FAILURES PRESENT')
print('sha256(candidate):', hashlib.sha256(open(CAND, 'rb').read()).hexdigest())
