# QRSe Print — Redesign Final Report

**Date:** 2026-10-21 · **Authority:** `design.md` · **Approach:** token-first, CSS-only · **Net change:** **1 file modified** (`index.html`), 0 files added to the product, 0 deleted.

---

## 1. Initial audit findings (Phase 1 — full detail in `AUDIT-REPORT.md`)

- Workspace = project root; **no Git repo existed** → per your decision, originals preserved in `_backup/` (verified identical checksums at time of copy).
- `index.html` (7,153 lines) = all CSS in 10 `<style>` blocks + 9 inline logic scripts + 6 JSON-LD blocks + deferred `i18n.js`/`i18n-extra.js`.
- The page had already been redesigned once on a **yellow/pink/orange** palette that **drifted from design.md** (pink + violet): spec secondary `#6f35ff` had **zero uses** (site used `#7c3aed`), spec muted `#66627a` unused (site used `#6b7280`), off-spec orange `#ff6b35` in 9+ places, yellow `#ffd22e` (spec: `#ffca28`) heavily used, demo-success card built on **corporate blues/greens** (`#0b3ac7`, `#048b50`, `#04152f`) violating the explicit *"no corporate blues"* rule.
- Risks that shaped the plan: i18n translates by **exact source strings** (copy freeze enforced); `data-cfg` remote-config hooks; 18 backend `/api/*` fetches; canary redirect script first in `<head>`.

## 2. Files changed and why

| File | Change | Why |
|---|---|---|
| `index.html` | **CSS only** — 475 changed lines (260 new/215 old), all inside `<style>` blocks or inline `style="…"` attributes (23 contain colors) | Bring the site onto the design.md token system without touching behavior |
| everything else | **untouched** (byte-identical, `cmp`-verified) | i18n, manifest, JS, images — preserve functionality |

**Verified invariant:** with CSS neutralized (style blocks + inline style attrs), the file is **byte-identical** to the backup — all text nodes, JS, JSON-LD, canary, endpoints, `data-cfg` keys unchanged. Canary byte-compared explicitly ✅.

## 3. Design improvements implemented (Phases 2–5)

**Token system (single source of truth):**
- Added the full design.md palette to `:root` (`--primary #ff2e63`, `--secondary #6f35ff`, `--tertiary`, `--neutral`, `--surface`, `--on-surface`, `--text-muted #66627a`, `--border`, `--success #2dd4bf`, `--warning #ffca28`, `--error`), radius scale (`--r-sm…--r-xl`), spacing rhythm, and font-family tokens.
- **Legacy variables aliased to spec** (`--violet→#6f35ff`, `--muted→#66627a`, `--yellow→#ffca28`, `--orange→#ff2e63`, `--tint→#fff5f8`) so all ~2,200 lines of existing CSS became spec-compliant **with zero selector renames**.

**Color migration (every off-brand value eliminated, grep-verified 0 remaining):**
- Violet `#7c3aed→#6f35ff` (14 places + rgba shadows) — hero headline/CTA gradients now pink→violet per spec.
- Magenta `#c026d3→#ff2e63` — legal-page accents now violet→pink.
- Orange `#ff6b35→#ff2e63`; pink→orange gradients (hero CTA, POPULAR badge, festival banner, video frames, About timeline) rebuilt as **primary→secondary** or solid primary badges.
- Yellow `#ffd22e→#ffca28` — now strictly the *warning/utility* accent (stickers, tag underlines, plan highlights); selection became pink-tint `#ffd6e3`; ambient page glow retinted yellow→soft violet.
- Muted greys `#6b7280`/`#6b6870`/`#4b5a74→#66627a`; dark navy privacy strip `#101a24→#17171b`.
- **Demo-success card de-corporatized:** navy `#04152f→#17171b` (spec ink), blues `#0b3ac7/#2d2a93/#4529f2/#1d4ed8→#6f35ff`, login gradient now violet→pink, all blue-tint surfaces (`#cbd9f3` etc.) → lavender tints; action greens → **success-teal family derived from `#2dd4bf`** (`#0d9488/#0f766e/#134e4a/#5eead4/#f0fdfa…`).
- Warm cream borders (`#f0e2ba`, `#eeda9e`, `#e9e2d2`…) → pink-tint or spec `#ece3d2`.

**Components (alignment layer, appended at the end of the main style block for correct cascade):**
- Buttons normalized to spec: **14px radius (`rounded.md`), Plus Jakarta Sans, 43px min-height** on `login-pill`/`p3btn`; dark-variant primary / white-pink secondary / text tertiary pattern preserved.
- Content cards → **18px `rounded.lg`** (`.plan3`, `.ben-card`, `.pain-card`, `.roi-card`, `.founder-card`).
- Inputs (demo/contact forms) → **14px radius** with existing pink focus ring kept.
- Headline tracking `-1.5px` normalized on section titles; chip/badge Jakarta label voice enforced.

**Intentional documented exception:** the *WhatsApp-to-Print* feature section keeps WhatsApp's own brand green (`#25D366`, `#075E54`) — product recognition, not site UI color; spec forbids corporate *blues*, and this is a third-party product panel, not app chrome.

## 4. Features preserved (all verified or byte-compared)

- Canary anti-copy script **byte-identical**; does not misfire on localhost (6/6 viewport checks).
- All 9 inline scripts + `i18n.js` + `i18n-extra.js` byte-identical; **all 18 `/api/*` endpoints & payloads untouched**.
- SPA router + 9 legal overlays, demo modal + Turnstile + validation, inquiry/contact forms, WhatsApp form, pricing loader, festival logic, stats, reviews carousel, tracking, guide videos, language switcher (8 languages, localStorage, `<html lang>`).
- All 6 JSON-LD blocks (validated JSON), SEO meta/hreflang/canonical, PWA manifest & icons, payment-gateway mentions/logos + `/register?plan=*` CTAs.
- **Zero new dependencies; zero broken asset references introduced.**

## 5. Tests executed (real runs: Playwright Chromium 1.64 vs live baseline on :8081)

| Area | Result | Evidence |
|---|---|---|
| JS syntax — 9 inline scripts | **PASS** | `node --check` each |
| JSON-LD — 6 blocks | **PASS** | all parse as valid JSON |
| Manifest JSON | **PASS** | parses (`icon-512.png` pre-existing gap, see §6) |
| Non-CSS content identical to original | **PASS** | python byte-invariant check |
| Canary untouched | **PASS** | regex byte-compare |
| Horizontal overflow @380/560/768/1000/1280/1440 | **PASS ×6** | scrollWidth == viewport each |
| Uncaught pageerrors @6 viewports | **PASS ×6** | 0 |
| Console errors vs original | **PASS** | `new=0, old=0` |
| Router overlay (/about, desktop+mobile) | **PASS ×2** | overlay opens |
| Demo modal open/close (desk+mob) | **PASS ×4** | computed visibility |
| Demo form validation, no submission | **PASS ×2** | error box fires |
| Language switch en→hin→en roundtrip | **PASS ×2** | text flips & restores; `html=hi`; localStorage |
| Tamil on-demand dictionary | **PASS (graceful)** | no crash locally; **full ta/te/kn/bn/mni coverage UNVERIFIED** — dicts served by backend `/api/i18n/dict`, absent here (identical on original) |
| FAQ accordion | **PASS ×2** | toggles |
| Burger menu | **PASS** | closed→open→closed |
| Reviews carousel | **UNVERIFIED ×2** | no local overflow — reviews come from `/api/reviews` (absent on static server); handlers intact, identical to original |
| Live pricing/stats/homepage-config | **UNVERIFIED** | need live `/api/*`; code untouched |
| Payment flow (real charges) | **UNVERIFIED by design** | none on this page; no client checkout code exists — mentions/logos/register links only |
| Spec tokens rendered | **PASS ×6** | computed styles: `#ff2e63` `#6f35ff` `#66627a` `#ece3d2`, body=Inter, button=14px/Jakarta, card=18px |

**Totals: 43 PASS · 1 WARNING · 0 FAIL · 4 UNVERIFIED** (full list: `verification/results.json`; screenshots: `verification/shots/`). The single WARNING: no broken-asset requests observed locally other than the two pre-existing missing files (§6).

## 6. Known issues & remaining work

1. **`icon-512.png` and `og-image.png` referenced but absent** (pre-existing; likely served by the live origin). Recommendation: export both from `qr-logo.png` artwork and drop them in.
2. **No service worker** exists (pre-existing) — PWA install relies on manifest only. Not added (would be new functionality); add in a separate change with testing.
3. **Non-English dictionaries are fetched from the backend** — ta/te/kn/bn/mni/mni-mtei coverage could not be fully verified on a static copy (same before the redesign).
4. Anything requiring the live backend (`/api/*`: prices, reviews, stats, demo provisioning, Turnstile site key) must be re-smoke-tested on staging after deploy.
5. `verification/node_modules` is a dev-only artifact for the test runner; the product needs nothing from it.

## 7. Diff summary & rollback (file-based, per your no-Git choice)

- **Diff:** `_backup/index.html` → `index.html`: 475 lines changed — **100% CSS** (style blocks + inline style attributes). Quick self-check anytime: `diff _backup/index.html index.html | grep '^[<>]' | grep -vcE '#|gradient|--|radius|style='` → `≈5` (only comments/labels).
- **Everything else:** `cmp _backup/<file> <file>` → identical.
- **Rollback (full):** `cp -p _backup/index.html index.html` — instant, complete.
- **Partial rollback:** the design.md alignment layer is a single contiguous block ending the main `<style>`; token values live in one `:root{…}`; both can be reverted independently from the backup.
- Permanent Git history is still one command away whenever you want it: `git init && git add -A && git commit -m "baseline+redesign"`.

**Preview now:** the redesigned site is running locally (Live Preview on port 8080 — canary allows localhost). Confidence level: safe to deploy behind the backend it was built for.
