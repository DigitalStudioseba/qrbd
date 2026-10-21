# QRSe Print — Before / After Diff Summary
**Scope:** production `index.html` as deployed (live T-0, 2026-10-21 08:19 UTC) → rebased candidate `deploy/bundle/index.html`.
**One-line:** CSS-only redesign rebased onto the newest live revision (work-66/67 intact); **zero** non-CSS byte changes.

## Headline numbers
| Metric | Live T-0 (before) | Rebased candidate (after) | Δ |
|---|---|---|---|
| File size | 412,324 B | 414,709 B | +2,385 B (restyle, net) |
| Line endings | CRLF (7,218×) + 1 bare LF | CRLF (7,264×) | live-faithful format kept |
| sha256 | `34f9001e037e35756776930791f7b00738713f32e7b15400fbd6edc30658f7c2` | `bed392e6ce9ca79bd471bff075c5509b3426d5a36b9ffc510920d8e1ad2d6119` | — |
| Lines (LF-split) | 7,219 | 7,264 | +45 net (CSS comment/format rows) |
| Unified diff lines | — | — | **−219 / +264, all inside `<style>` regions** |
<tr><td>Non-CSS bytes changed</td><td>—</td><td>—</td><td><b>0</b> outside <code>&lt;style&gt;</code> blocks, except 23 <code>style=</code> attribute color remaps (4 distinct pairs, listed below) — INV‑1/INV‑1b</td></tr>
| `<script>` blocks | 20 | 20 | identical bytes (INV-2) |
| `<style>` blocks | 9 | 9 | content restyled (INV-10) |

## What changed (CSS-only redesign, per `design.md`)
1. **Design tokens** — `:root` swapped to the new palette/scale (`--primary #ff2e63`, `--secondary #6f35ff`, radii, shadows, spacing). Old legacy tokens: 0 remaining (self-audit, INV-7).
2. **Alignment/rhythm layer** — one appended CSS block before the first `</style>` (shared paddings, gaps, section max-width, hero grid alignment).
3. **Component restyle** — nav, hero, privacy strip, flow steps, pricing cards (top card gradient), buttons (radius 14px), cards (radius 18px), feature/FAQ/why sections, footer, modals. Typography stays Inter; all Hinglish copy **untouched** (COPY FREEZE honored).
4. **Responsive polish** — spacing/type/media tweaks at the 6 verified breakpoints.

## What provably did NOT change
- Canary script (first `<head>` script) — byte-identical (INV-5). Authorized-host list untouched.
- All 16 script blocks incl. Razorpay/Cashfree/checkout logic, router, analytics, modal/validation logic (INV-2, `node --check` 9/9 extracted JS).
- Every visible text node (COPY FREEZE, INV-4), attributes/IDs/classes used by JS (INV-3).
- JSON-LD structured data 6/6 blocks (INV-9).
- work-67 "Setup Festival" server-driven CSS (`--fc1/--fc2`), work-66 dictionary hooks, absolute asset paths, absolute `og:image` URL, `data-cfemail` obfuscation (INV-6).
- Backend integration URLs, form actions, CSP-affecting markup: none touched.

## Companion assets (unchanged bytes, re-served by deploy)
`icon-512.png` (sha `7871ed99…`, 2,064 B) and `og-image.png` (sha `7ae067f7…`, 97,201 B) are the **origin's own current bytes** — included in the bundle so a full-directory deploy can't 404 the references in `site.webmanifest` / meta tags. No modification.

## Deliberately NOT in the deploy set
- `i18n.js`, `i18n-extra.js`, dictionaries, images, `site.webmanifest` — origin versions are current; deploy must **not** overwrite them. (Origin `i18n-extra.js` is newer than the workspace snapshot's — contains today's work-66 homepage-English dictionary fixes, purely additive. Verified during staging prep.)

## Reproducibility
`python3 deploy/reference/rebase.py deploy/rollback/live-index-T0.html deploy/bundle/index.html`
regenerates the candidate deterministically from the T-0 capture (10 anchored fixes · 72 token mappings · 218 mapping hits · self-audit old-token count 0).

### Inline style-attribute remaps (the complete non-`<style>`-block delta)
| Occurrences | Before | After |
|---|---|---|
| 16 | `color:#6b7280;text-decoration:underline;` | `color:#66627a;text-decoration:underline;` |
| 5 | `color:#166534;` | `color:#0f766e;` |
| 1 | `color:#6b6870;` | `color:#66627a;` |
| 1 | `font-size:13px;color:#6b7280;` | `font-size:13px;color:#66627a;` |

All four are pure palette-token remaps (same declaration shape — verified by INV‑1b). No attribute names, structure, text, or behavior changed.
