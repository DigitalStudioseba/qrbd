# QRSe Print — Staging-Phase Verification Report
**Date:** 2026-10-21 (regenerated for CRLF-faithful build, packaging phase) · **Candidate:** `deploy/bundle/index.html` (sha256 `bed392e6ce9ca79bd471bff075c5509b3426d5a36b9ffc510920d8e1ad2d6119` (CRLF-faithful rebuild; content identical after newline normalization))
**Method:** local production-replica staging at `127.0.0.1:8082` (fixtures = origin GET responses captured read-only at T-0; production security headers mirrored; mutating verbs refused with 403 by design). **No production traffic, no writes, no proxying.**

Legend: ✅ PASS · ⚠ WARNING (non-blocking, explained) · ❌ FAIL · ⬜ UNVERIFIED (scope constraint, stated)

## A. Invariance gate (candidate vs live T-0) — 12/12 ✅
| # | Check | Result |
|---|---|---|
| INV-1 | Non-CSS bytes identical (style attrs normalized) | ✅ PASS |
| INV-1b | `style=` attribute deltas are color-only remaps | ✅ PASS (23 occurrences, 4 distinct pairs — listed in DIFF-SUMMARY.md) |
| INV-2 | All `<script>` blocks | ✅ PASS (20/20 byte-identical) |
| INV-3 | Attributes/IDs/classes used by JS | ✅ PASS |
| INV-4 | Visible text nodes (COPY FREEZE) | ✅ PASS (unchanged) |
| INV-5 | Canary script | ✅ PASS (byte-identical; host allowlist intact) |
| INV-6 | work-67 festival CSS (--fc1/--fc2), absolute paths, `og:image`, `data-cfemail` | ✅ PASS |
| INV-7 | Legacy off-brand tokens in CSS | ✅ PASS (0 remaining) |
| INV-8 | JS syntax | ✅ PASS (`node --check` 9/9 extracted scripts) |
| INV-9 | JSON-LD | ✅ PASS (6/6 valid & identical) |
| INV-10 | Structure | ✅ PASS (9 style blocks; CSS delta −219/+264 diff lines; re-run gate script: `deploy/reference/invariance_gate.py`) |

## B. Browser regression on staging replica — total 37 PASS · 6 WARNING · 0 FAIL · 1 UNVERIFIED
**Viewport sweep (380 / 560 / 768 / 1000 / 1280 / 1440):**
- ✅ No horizontal overflow — 6/6
- ✅ Canary stays on staging host (no redirect) — 6/6
- ✅ No page errors — 6/6
- ⚠ Asset status — 6/6: only `403 /api/track` = **intended** read-only refusal of analytics POSTs on staging (production unaffected).

**Fixture-driven dynamic content (mocked from origin T-0 GETs):**
- ✅ Reviews: 11 cards rendered + carousel arrows actually scroll (0→300px)
- ✅ Stats strip honors `showStats:false` (hidden, as on origin)
- ✅ work-67 festival styles present in rebased file
- ✅ Website language box = exactly 6 site languages (en/ta/te/kn/bn/hin)
- ⬜ mni / mni-mtei — `i18n.js` marks them **customer-print-page-only**; that page is out of this file's scope by design. Their dictionaries (48 KB / 46 KB) are captured as fixtures and served 200.

**Language engine (origin dictionaries):**
- ✅ Tamil (762 KB dictionary): full render — "ஆவணங்களைப் பிரிண்ட் செய்யுங்கள்…", `<html lang>` = `ta`
- ✅ Bengali (516 KB): "গ্রাহকের ফোন থেকে"
- ✅ Hinglish source → English roundtrip restores originals
- ✅ No page errors while cycling languages

**Interactions (desktop + mobile):**
- ✅ Router overlay (`/setup-guide` → guide key) — 2/2
- ✅ Demo modal open → client-side validation (no submit) → close — 2/2
- ✅ FAQ accordion — 2/2
- ✅ Spec tokens rendered: `--primary #ff2e63`, `--secondary #6f35ff`, buttons 14px radius, cards 18px, Inter — 2/2
- ✅ No page errors — 2/2

Screenshots: `verification/shots/staging-1280.png`, `staging-demo-modal.png`.

## C. Fixture & static parity vs origin (read-only GET checks)
- ✅ 12 API GET fixtures + 6 i18n dictionary fixtures captured at T-0; en/hin dict API fallback mirrored (thin `/api/i18n/dict`, 21 B).
- ✅ Aux statics byte-identical to origin: `i18n.js`, `site.webmanifest`, icons, all UI SVGs, payment logos — 12/13.
- ⚠ `i18n-extra.js`: **origin newer** (72,398 B vs snapshot 67,350 B; +today's work-66 "homepage English saaf", purely additive). Candidate deploys **index.html only**, so origin's newer file stays untouched — staged replica serves the origin bytes. Also flagged as **do-not-overwrite** in DEPLOY.md.
- ✅ icon-512.png & og-image.png captured from origin (sha-verified) into bundle.

## D. Known staging-only divergences (by design, not defects)
1. Analytics POST `/api/track` → 403 (read-only guard).
2. Demo registration / payments / any POST → refused; only client-side validation tested (safeguard: no production mutations).
3. Per-request Cloudflare tokens (`data-cfemail`, `email-protection#`) excluded from byte comparisons via documented normalization.

## E. Verdict
**STAGING: PASS — candidate is deployment-ready for owner approval.**
Production deployment itself is **not performed** and requires separate explicit approval (see `DEPLOY.md`).
