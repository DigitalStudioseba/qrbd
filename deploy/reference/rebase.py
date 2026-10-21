#!/usr/bin/env python3
# QRSe Print — deterministic rebase of the design.md CSS transformation onto
# the verified live T-0 revision. Replays EXACTLY the approved snapshot edits:
#   1) design.md :root token block swap   2) alignment layer appended at end of
#   the main style block   3) ordered color-value mappings   4) anchored
#   gradient/selection/label fixes.  CRLF line endings preserved.
# Usage: python3 deploy/reference/rebase.py deploy/rollback/live-index-T0.html deploy/bundle/index.html
import sys, re, hashlib

SRC, DST = sys.argv[1], sys.argv[2]
raw = open(SRC, 'rb').read().decode('utf-8').replace('\r\n', '\n')   # normalize to LF in memory (deterministic), CRLF restored on write
stats = {'maps_applied': 0, 'anchors_applied': [], 'anchors_missing': []}

ROOT_BLOCK = """:root{
  /* ── design.md tokens (primary design authority) ── */
  --primary:#ff2e63;
  --secondary:#6f35ff;
  --tertiary:#17171b;
  --neutral:#fffdf8;
  --surface:#ffffff;
  --on-surface:#16162e;
  --text-muted:#66627a;
  --border:#ece3d2;
  --success:#2dd4bf;
  --warning:#ffca28;
  --error:#ef4444;
  --ink-dm:#111114;
  --overlay:#17171b;
  /* radii (design.md) */
  --r-none:0; --r-sm:8px; --r-md:14px; --r-lg:18px; --r-xl:28px; --r-full:9999px;
  /* spacing rhythm (design.md) */
  --sp-xs:6px; --sp-sm:14px; --sp-md:22px; --sp-lg:32px; --sp-xl:92px;
  /* type families (design.md) */
  --font-head:'Plus Jakarta Sans',sans-serif;
  --font-body:'Inter',sans-serif;
  /* legacy aliases — mapped to spec values so existing selectors stay on-brand */
  --ink:#111114;
  --muted:var(--text-muted);
  --yellow:var(--warning);
  --pink:var(--primary);
  --orange:var(--primary);
  --violet:var(--secondary);
  --paper:var(--neutral);
  --tint:#fff5f8;
  --line:var(--border);
  --card:var(--surface);
  --dark:var(--tertiary);
  --ease:cubic-bezier(.22,.61,.36,1);
  --shadow-sm:0 2px 6px rgba(17,17,20,.05);
  --shadow-md:0 10px 30px rgba(17,17,20,.08);
  --shadow-pink:0 14px 34px rgba(255,46,99,.28);
}"""

ALIGNMENT_LAYER = """
/* ══════════════════════════════════════════════════════════════
   design.md ALIGNMENT LAYER (2026-10-21 token-first redesign)
   Sirf geometry/typography normalize karta hai — koi selector rename
   nahi, koi markup/JS change nahi. Cascade ke END me rakha gaya hai
   taaki is block ke sabhi component rules par ye aakhri baat kahe.
   Spec: design.md (primary design authority).
   ══════════════════════════════════════════════════════════════ */
/* Buttons — design.md: rounded.md 14px, Jakarta voice, confident 43px sizing */
.cta-price,.cta-main,.cta-sub,.cta-demo,.p3btn,.big-btn,.dm-btn,.login-pill,.refer-strip,.demo-strip{
  border-radius:var(--r-md);
  font-family:var(--font-head);
}
.login-pill{min-height:43px}
.p3btn{min-height:43px}
/* Cards — design.md: rounded.lg 18px */
.plan3,.ben-card,.pain-card,.roi-card,.founder-card{border-radius:var(--r-lg)}
/* Inputs — design.md: rounded.md 14px, pink focus accent */
.dm-box input,.dm-box textarea,.dm-box select,.ct-form input,.ct-form textarea{border-radius:var(--r-md)}
/* Chips/badges — design.md pill + Jakarta label voice */
.pill,.gv-badge,.hst-made-badge{font-family:var(--font-head)}
/* Headline tracking per design.md (tight, poster-like) */
.sec-title,.plans-title,.pt-title,.nsf-title{letter-spacing:-1.5px}"""

MAPPINGS = [
 ('#7c3aed','#6f35ff'), ('rgba(124,58,237,','rgba(111,53,255,'),
 ('#c026d3','#ff2e63'), ('rgba(192,38,211,','rgba(255,46,99,'),
 ('#ffd22e','#ffca28'), ('rgba(255,210,46,','rgba(255,202,40,'), ('rgba(255,183,3,','rgba(255,202,40,'),
 ('#6b7280','#66627a'), ('#6b6870','#66627a'), ('#4b5a74','#66627a'),
 ('#ff6b35','#ff2e63'), ('#ff9770','#ff8fb3'), ('#15803d','#0f766e'),
 ('#048b50','#0d9488'), ('#037844','#0f766e'), ('#0bb45a','#2dd4bf'),
 ('#0d5c3c','#134e4a'), ('#5ff0a8','#5eead4'), ('#e5f9f0','#f0fdfa'),
 ('#a9e6c8','#99f6e4'), ('#0e6d44','#0f766e'), ('#bfe8d4','#99f6e4'),
 ('#3c7a5c','#115e59'), ('#0f8a58','#14b8a6'), ('#04291c','#134e4a'),
 ('#0b4d33','#0f766e'), ('#0a6f4a','#0d9488'), ('#0a4a33','#115e59'),
 ('#7df0be','#5eead4'), ('#e2f5ec','#ccfbf1'), ('#bfe3d2','#99f6e4'),
 ('#eaf8f1','#f0fdfa'), ('#dcefe5','#ccfbf1'), ('#f4fbf7','#f0fdfa'),
 ('#cbeade','#99f6e4'), ('#e9f8f1','#f0fdfa'), ('#0a7a4f','#0f766e'),
 ('#12a36b','#14b8a6'), ('rgba(4,139,80,','rgba(13,148,136,'), ('rgba(4,41,28,','rgba(19,78,74,'),
 ('#0b3ac7','#6f35ff'), ('#04152f','#17171b'), ('#2d2a93','#6f35ff'),
 ('#13203c','#232330'), ('#1d4ed8','#6f35ff'), ('#1e40af','#6f35ff'),
 ('#4529f2','#6f35ff'), ('#4f46e5','#6f35ff'), ('rgba(69,41,242,','rgba(111,53,255,'),
 ('#cbd9f3','#ddd0fb'), ('#eef4ff','#f3edff'), ('#e6eefc','#efe9fb'),
 ('#e7f0fd','#efe9fb'), ('#ebf0fe','#f3edff'), ('#d9e1fb','#e2d8fa'),
 ('#f4f7ff','#f8f5ff'), ('#194073','#16162e'), ('#101a24','#17171b'),
 ('#c7d2fe','#ddd0fb'), ('#4338ca','#6f35ff'), ('#f8faff','#fbfaff'),
 ('#eef2ff','#f4f0ff'), ('#6d28d9','#6f35ff'),
 ('#f0e2ba','#ffd9e4'), ('#f2e4b8','#ffd9e4'), ('#eeda9e','#ffcbdc'),
 ('#ffd9a3','#ffd0de'), ('#e9e2d2','#ece3d2'), ('#ece1c8','#ece3d2'),
 ('#e7e0cf','#ece3d2'), ('#166534','#0f766e'),
]

# anchored (context-specific) fixes — regex tolerant to whitespace/CRLF
def anchored(pattern, repl, tag, count=0, flags=re.S):
    global raw
    new, n = re.subn(pattern, repl, raw, count=count, flags=flags)
    (stats['anchors_applied'] if n else stats['anchors_missing']).append((tag, n))
    raw = new

def mapall():
    global raw
    for old, new in MAPPINGS:
        c = raw.count(old)
        if c: stats['maps_applied'] += c
        raw = raw.replace(old, new)

# ── 1) :root swap (brace-matched, first :root block only) ────────────────────
i = raw.find(':root{')
if i < 0: sys.exit('FATAL: no :root block found')
depth, j = 0, i
while True:
    ch = raw[j]
    if ch == '{': depth += 1
    elif ch == '}':
        depth -= 1
        if depth == 0: break
    j += 1
raw = raw[:i] + ROOT_BLOCK + raw[j+1:]

# ── 2) alignment layer before FIRST </style> (end of main block) ─────────────
k = raw.find('</style>')
if k < 0: sys.exit('FATAL: no </style> found')
raw = raw[:k] + ALIGNMENT_LAYER + '\n' + raw[k:]

# ── 3) anchored fixes (exactly as approved on the snapshot) ──────────────────
anchored(r'::selection\{background:var\(--yellow\);color:var\(--ink\)\}',
         '::selection{background:#ffd6e3;color:var(--ink)}', 'selection')
anchored(r'radial-gradient\(560px 380px at 88% -60px, rgba\(255,210,46,\.16\), transparent 65%\)',
         'radial-gradient(560px 380px at 88% -60px, rgba(111,53,255,.10), transparent 65%)', 'ambient-glow')
anchored(r'linear-gradient\(135deg,#ff2e63,#ff6b35\)',
         'linear-gradient(135deg,var(--primary),var(--secondary))', 'grad-135 (cta-price/andp)')
anchored(r'linear-gradient\(120deg,var\(--violet\),var\(--pink\) 55%,var\(--orange\)\)',
         'linear-gradient(120deg,var(--secondary),var(--primary))', 'gv-frame gradients')
anchored(r'background:linear-gradient\(120deg,var\(--pink\),var\(--orange\)\);color:#fff;',
         'background:var(--primary);color:#fff;', 'badge solid (hot/festival)')
anchored(r'linear-gradient\(180deg,#ff2e63,#ff6b35,#ffd22e,#7c3aed\)',
         'linear-gradient(180deg,var(--primary),var(--secondary))', 'about rainbow line')

# ── 4) value mappings ─────────────────────────────────────────────────────────
mapall()

# post-sweep anchored fixes that depend on the sweep result
anchored(r'linear-gradient\(90deg,#6f35ff 0%,#6f35ff 100%\)',
         'linear-gradient(90deg,#6f35ff 0%,#ff2e63 100%)', 'dsx login gradient')
anchored(r'(\.lg-note b\{[^}]*?color:)#1e3a8a', r'\g<1>#6f35ff', 'lg-note label')
anchored(r'(\.ibn-t b\{[^}]*?color:)#1e3a8a', r'\g<1>#16162e', 'ibn title')
anchored(r'band = navy #04152F . violet #2D2A93, card #F6FAFD, line #E6ECF5,\s*green button #048B50, blue #0B3AC7, login #4529F2 . #7C3AED\.',
         'band = ink #17171b → violet #6f35ff, card #F6FAFD, line #E6ECF5,\n     teal button #0d9488, violet #6f35ff, login #6f35ff → #ff2e63 (design.md palette).', 'dsx doc comment')

# ── 5) self-audit: old tokens must be fully eliminated ───────────────────────
OLD = [m[0] for m in MAPPINGS] + ['#1e3a8a']
leftovers = {o: raw.count(o) for o in OLD if raw.count(o)}
if leftovers: sys.exit('FATAL: old tokens remain: %r' % leftovers)

out = raw.replace('\n', '\r\n').encode('utf-8')    # emit live-faithful CRLF
open(DST, 'wb').write(out)
print('REBASE OK →', DST)
print('  anchors applied :', stats['anchors_applied'])
print('  anchors missing :', stats['anchors_missing'])
print('  mapping hits    :', stats['maps_applied'])
print('  out bytes       :', len(raw.encode()), '· sha256', hashlib.sha256(raw.encode()).hexdigest()[:16])
