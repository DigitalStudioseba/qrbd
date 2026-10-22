# legacy brand — Phase 1 Read-Only Audit Report

**Date:** 2026-10-21  ·  **Scope:** read-only investigation of the workspace; **no files were edited**

---

## 1. Workspace & Git Baseline

| Item | Finding |
|---|---|
| Workspace root | `/home/user` |
| Git repository | ❌ **None.** `/home/user` is not a git repository and has no parent repo. No baseline of changes can be established, and "check Git status" has nothing to report. |
| Recommendation | Initialize `git init` + one baseline commit **before any edit** so Phase-6 diff review and rollback are possible. Requires your approval (see plan). |

Workspace contents (16 artifacts): `index.html` (392 KB, 7,153 lines), `i18n.js` (140 KB), `i18n-extra.js` (67 KB), `site.webmanifest`, `design.md` (12 KB), 9 image/SVG assets, `img/` (3 UI SVGs), `cdn-cgi/` (Cloudflare email-obfuscation helper from the original site).

## 2. design.md — Read in Full (216 lines)

Design authority confirmed. Key tokens:
- **Colors:** primary `#ff2e63`, secondary `#6f35ff`, tertiary/overlay `#17171b`, neutral/bg `#fffdf8`, surface `#ffffff`, on-surface `#16162e`, text-muted `#66627a`, border `#ece3d2`, success `#2dd4bf`, warning `#ffca28`, error `#ef4444`, ink `#111114`.
- **Type:** Plus Jakarta Sans (extrabold, tight tracking) for headlines/labels/buttons; Inter for body.
- **Radii:** buttons/inputs 14 px, cards 18 px, chips/badges full-pill.
- **Components:** `button-primary` = dark 43 px bold; `button-secondary` = white + pink text; cards with soft shadow + warm border; clean inputs with pink focus accent.
- **Explicit don'ts:** no corporate blues, no sharp corners, no visual clutter.

## 3. File-by-File Audit

### 3.1 `index.html`
- Single-page marketing site for **"legacy brand"** (QR-based auto-print for cyber cafés/print shops, India, Hinglish copy).
- **CSS:** 10 `<style>` blocks. Main block lines 303–2548 (~2,245 lines). Scoped blocks: `qsp-info-design`, `qsp-demo-success`, `qsp-privacy52`, `qsp-dsx56` + 4 in-page blocks. **No external stylesheet** — all design lives in this file.
- CSS already defines brand `:root` variables: `--pink:#ff2e63 --dark:#17171b --paper:#fffdf8 --line:#ece3d2 --ink:#111114` — plus **off-brand drift**: `--violet:#7c3aed` (spec: `#6f35ff`, **0 uses** of the spec color), `--muted:#6b7280` (spec: `#66627a`, 0 uses), `--yellow:#ffd22e` (spec warning: `#ffca28`, yellow used **22×** vs spec "sparingly"), `--orange:#ff6b35` (**not in spec at all**, 4 uses), `--tint:#fff9ec` (17 uses; spec neutral is `#fffdf8`).
- Fonts already loaded from Google Fonts: **Plus Jakarta Sans 600/700/800 + Inter 400/500/600/700** ✅ matches spec. Body font = Inter ✅; 62 Jakarta usages (labels/headings) vs 8 Inter.
- CSS comment reveals the page was **already redesigned once** ("Premium redesign … Same content • Same IDs • Same scripts") on a *yellow/pink* palette — the palette drifted from design.md (which is **pink + violet**, no yellow/orange dominance).
- **Scripts:** 6 JSON-LD blocks (SoftwareApplication, FAQPage w/ 16 Q&A, AggregateRating, Offers ×6, BreadcrumbList, Organization, Person, WebSite, SiteNavigationElement) + 12 inline logic blocks + deferred `i18n.js` / `i18n-extra.js` + Cloudflare email-decode.
- **Sections in DOM order:** `header.site-head` (desktop nav + burger + `navDrop` mobile menu + Shop Owner Login pill) → `section.hero` (privacy strip, brand lock, H1, CTAs, QR demo stage) → `#guide` (guide video, YouTube-nocookie iframe) → `#statsStrip` (live counters) → `#saveBurst` → `#reviewsSec` (carousel: rv* ids, arrows, dots, Google/Justdial aggregates) → `#features` → `#privacySec` → `#uiSec` (product screenshots: `img/ui-*.svg`) → `#pricingSection` (5 plan cards: hpStarter/hpPro/hpPremium/hpMonthly/hpLifetime + lists) → `#festivalBanner` → `#whatsappToPrint` (`waForm` section) → `#partnerGrid` → `#faq` → modals (`demoModal` dm* fields, `inqModal` iq* fields, success overlay) → 9 `legal-page` overlays → language switcher (`langSwitch`/`langSel`, fixed bottom-left).
- **SPA router:** `LEGAL_PAGES` map + `hashchange`/`pushState` — routes `#about`, `#contact`, `#disclaimer`, `#features`, `#partner`, `#privacy`, `#refund`, `#setup-guide`, `#terms` to full-screen `legal-page` overlays. Header/footer links use `/features`, `/setup-guide`, `/contact`, `/about`, `/partner`, `/disclaimer`, `/terms`, `/privacy`, `/refund` paths (work on live origin; router handles them in-page).
- **Interactive inventory:** `toggleNav` mobile menu; `openDemoModal`/`closeDemoModal`/`createDemo` (name, 10-digit phone w/ live validation, shop, address, email, printer select, **Cloudflare Turnstile** via `/api/security/challenge`, POST `/api/demo/request`, rich success card w/ credentials + copy buttons + setup video); `openInq`/`closeInq`/`sendInq` inquiry modal; `sendContact` contact form; `waForm` WhatsApp-to-print registration submit; `initReviewCarousel` (scroll-snap + dots + keyboard + buttons); live stats (`inr` formatter + `/api/public-stats`); pricing loader `qsp-price52` (`loadPrices`, `fillPlan`, `/api/setup-fee/current`, festival/discount math `initFestivalOffer`, `applyDemoPlanLimits`); guide-video helpers (`qspSetGuideVideo`, unmute); analytics pings `/api/track`; whitelabel branding + intl config fetches; referrer-note handling.
- **Backend endpoints used (relative, 18 fetches):** `/api/homepage-config`, `/api/setup-fee/current`, `/api/demo/config`, `/api/demo/request`, `/api/security/challenge`, `/api/printer-models`, `/api/public-stats`, `/api/reviews`, `/api/track`, `/api/android/visibility`, `/api/android/plans`, `/api/intl/config`, `/api/whitelabel/branding`, `/api/download/easy-installer/{sid}`. External: Cloudflare Turnstile CDN, YouTube(-nocookie) embeds, `pdfbanao.onrender.com` (sister product link), wa.me.
- **Payment gateways:** Razorpay/Cashfree/PayU/CCAvenue appear on this page **only as marketing mentions + logo images** (and setup-guide instructions telling shop owners to paste *their own* keys). Plan CTAs link to `/register?plan=starter|pro|premium|monthly|lifetime`. **No client-side checkout code or keys exist in this file** — payment processing lives server-side / in the customer print flow (the i18n dictionaries contain Cashfree customer-page strings, but that flow is not in this file). Secret scan: ✅ no API keys/secrets hardcoded anywhere (only the *word* "password" inside translation dictionaries).
- **data-cfg attributes:** many copy strings are remotely configurable via `/api/homepage-config` — these attributes must not be disturbed.

### 3.2 `i18n.js` + `i18n-extra.js`
- Runtime DOM-walking **dictionary translator**. Source language = Hinglish (`hin`); selectable: **en (default), ta, te, kn, bn, mni, mni-mtei, hin** (mni = customer-page only). Persisted in `localStorage.qsp_lang`; sets `<html lang>` correctly; number-aware `%d` templates; translates `placeholder/title/aria-label/alt`; wraps native dialogs in extra.
- **English dictionary is bundled** (so first paint can be English); other languages fetched on demand.
- ⚠️ **CRITICAL CONSTRAINT:** translation keys are the **exact Hinglish source strings**. Any redesign that rewrites visible copy silently breaks translations. → Redesign must change **styling/structure only, not text nodes**; if a string must change, a dictionary migration is required (flagged as out of scope unless authorized).

### 3.3 PWA
- `site.webmanifest`: standalone, portrait, `background #fffdf8`, `theme #ff2e63` ✅ on-brand, hi-IN.
- ⚠️ Manifest references **`icon-512.png` — file missing** in workspace (only `icon-192.png` exists). Live site may serve it; locally 404.
- **No service worker** file or registration exists anywhere → "installation behavior" is minimal (browser heuristics only). Preserve as-is; adding a SW would be new functionality, not a redesign.
- ⚠️ `og-image.png` referenced by 3 meta tags — **file missing** locally. `QTKABr8jIGuU.png` (present) is used as the JSON-LD logo/image via absolute URL.

### 3.4 Assets on disk vs referenced
Referenced & present ✅: `qr-logo.png`, `img/ui-panel.svg`, `img/ui-live-job.svg`, `img/ui-tray.svg`, `razorpay.png`, `cashfree.png`, `ccavenue.png`, `payu.svg`, `apple-touch-icon.png`, `icon-192.png`, `site.webmanifest`.
Missing but referenced ⚠️: `icon-512.png`, `og-image.png`.
On disk, unreferenced locally: `QTKABr8jIGuU.png` (used via absolute URL — keep).

## 4. Canary / Anti-Copy Script (documented — will NOT touch)
- First `<script>` in `<head>` (`qsp-canary:QSP-7f3a9c1e…`). Allowed contexts: `localhost`, `127.0.0.1`, `[::1]`, `*.localhost`, `*.legacy-domain`, `file://`. Anywhere else it overwrites the document with an "unofficial copy" notice and redirects to `https://[legacy-domain]/` after 2.5 s. Wrapped in try/catch. **Behavior documented; left byte-for-byte unchanged.**

## 5. Gap Analysis vs design.md

| # | Gap | Impact |
|---|---|---|
| G1 | Secondary violet is `#7c3aed`; spec is `#6f35ff` (0 uses of spec value) | Off-brand accents/gradients |
| G2 | Muted text `#6b7280` (cool grey); spec `#66627a` (lavender-grey) | Slightly cold body text |
| G3 | Yellow `#ffd22e` used 22× incl. selection color, badges, accents; spec warning `#ffca28` "sparingly" | Palette reads yellow-first, spec is pink/violet-first |
| G4 | `--orange:#ff6b35` — not in spec (4 uses) | Brand dilution |
| G5 | `--tint:#fff9ec` warm-cream panels (17 uses); spec neutrals `#fffdf8`/`#ffffff` | Off-palette surfaces |
| G6 | Demo-success dark card (`dsx-*`) uses blue `#0b3ac7`/`#04152f` & green `#0a6f4a` themes | Violates "no corporate blues" |
| G7 | Type scale numeric tokens (48/32/27/23/19 px, tracking) not normalized to CSS vars | Inconsistent headline rhythm risk — verify during QA |
| G8 | Button geometry (43 px height / 14 px radius / two-variant system) not uniformly enforced — ad-hoc `.p3btn`, `.big-btn`, `.dm-btn`, `.cta-demo`, `.login-pill` etc. | Spec component system only partially implemented |
| G9 | Missing `icon-512.png`, `og-image.png` | Local previews of shares/install broken (works on live domain?) — WARNING only |
| G10 | No git baseline | Phase-6 diff/rollback impossible until initialized |

## 6. Proposed Implementation Plan (for approval)

**Guiding rule:** token-first, CSS-led redesign. Keep every ID, class hook used by JS, `data-cfg` key, `onclick`, script, text node, endpoint, and translation key intact. ~95% of the work lands inside `<style>` blocks; near-zero JS/HTML-behavior edits.

- **Step 0 — Safety:** `git init` + baseline commit of the untouched tree (enables Phase-6 diff & rollback).
- **Step 1 — Token reconciliation:** add full design.md token set to `:root` (`--primary`, `--secondary:#6f35ff`, `--neutral`, `--surface`, `--on-surface`, `--text-muted:#66627a`, `--border`, `--success:#2dd4bf`, `--warning:#ffca28`, `--error`, + radius/spacing/shadow scale); **alias legacy vars to spec values** (`--violet→#6f35ff`, `--muted→#66627a`, `--yellow→#ffca28`, `--orange→#ff2e63`, `--tint→soft pink-neutral tint`) so all existing selectors update with zero selector renames.
- **Step 2 — Typography pass:** encode the headline/label scale as CSS vars; enforce Jakarta on headings/labels/buttons, Inter on body; normalize tracking/line-heights to spec.
- **Step 3 — Component pass:** unify buttons to the 43 px / 14 px-radius two-variant system (+tertiary), cards to 18 px-radius white/border/soft-shadow, inputs to white 14 px with pink focus ring, chips/badges to pills; harmonize section spacing to the `xs→xl` stepped rhythm. No structural DOM moves except purely presentational wrappers if unavoidable.
- **Step 4 — Off-brand retints:** `dsx-*` demo-success blues/greens → ink/violet/pink vault look; festival banner → role of warning accent w/ ink contrast, pink CTAs.
- **Step 5 — Responsive verification:** Playwright at 380/560/760/1000/1220/1440 px — header + burger menu, hero, carousel, pricing grid, waForm, modals, legal pages, language switcher; fix any horizontal overflow/clipping.
- **Step 6 — Verification (real runs only):** headless-browser console scan; JS syntax check of all inline blocks; local asset 404 scan; router page open/close; demo & inquiry modal open/close + validation trigger (no real submission, no charges); language switch en↔ta↔hin with DOM assertions; horizontal-overflow measurement; manifest validation; SEO/ARIA spot checks; full `git diff` review.
- **Explicitly NOT changed:** canary script (byte-identical), `i18n*.js` dictionaries & mechanism, all fetch endpoints & payloads, JSON-LD/SEO meta, copy text, form logic, `site.webmanifest` (only noting missing icon), no new dependencies, no rewrites, no asset deletions.

**Rollback:** `git checkout -- .` / `git reset --hard <baseline>` after Step-0 commit (or restore the zipped backup of originals I will keep in `_backup/`).

## 7. Test Status (Phase 6 not yet executed)
All verification items currently **UNVERIFIED** — will be executed for real in Phase 6 and reported as PASS/WARNING/FAIL with evidence.

*— End of Phase 1. Awaiting approval to proceed to Step 0–6. —*
