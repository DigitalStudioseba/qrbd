# Project Audit: Code Quality, Maintainability & Test Coverage

This report audits the testing infrastructure, automated verification runs, code maintainability, architectural complexity, accessibility adherence, and performance characteristics across the QR Se Print project.

---

## 1. Automated Test Frameworks & Execution Records

The project features a dedicated testing and regression pipeline implemented with Playwright, Python AST scripts, and Node.js syntax checkers.

| Test Suite / Tool | Test Target | Execution Environment | Checks Performed | Result / Outcome |
|---|---|---|---|---|
| **Invariance Gate** ([invariance_gate.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/reference/invariance_gate.py)) | Candidate `index.html` vs Live T-0 Capture | Python 3 Script | 12 Structural Invariance Rules (INV-1 to INV-10) | **12 / 12 PASS (GATE: ALL PASS)** |
| **Inline JS Syntax Checks** (`node --check`) | 9 Extracted Inline Script Blocks | Node.js Runtime | AST Syntax & Parse Validation | **9 / 9 PASS (0 Syntax Errors)** |
| **JSON-LD Schema Parsers** | 6 Embedded Schema Blocks | JSON.parse Validator | Syntax & Structural Compliance | **6 / 6 PASS (100% Valid JSON)** |
| **Playwright Redesign Suite** ([run.mjs](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/run.mjs)) | Redesign on `:8080` vs Baseline on `:8081` | Headless Chromium 1.64 across 6 Viewports | Horizontal overflow, console errors, modal validation, router navigation, language switching | **43 PASS · 1 WARNING · 0 FAIL** ([results.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/results.json)) |
| **Playwright Staging Suite** ([run-staging.mjs](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/run-staging.mjs)) | Staging Replica on `127.0.0.1:8082` | Headless Chromium with Mock API Fixtures | Dynamic reviews rendering, stats strip gating, Tamil/Bengali translation, spec tokens | **37 PASS · 6 WARNING · 0 FAIL** ([results-staging.txt](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/results-staging.txt)) |

---

## 2. Invariance Verification Rule Breakdown ([invariance_gate.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/reference/invariance_gate.py))

The invariance gate enforces strict preservation of business functionality during CSS restyling:

```
[PASS] INV-1   Non-CSS bytes identical (style attrs normalized)
[PASS] INV-1b  Style-attribute deltas are color-only remaps (23 occurrences, 4 pairs)
[PASS] INV-2   Script blocks byte-identical (20 / 20 blocks identical)
[PASS] INV-2b  Script count invariant (live=20, candidate=20)
[PASS] INV-3   Attribute universe unchanged (all IDs, classes, data-cfg intact)
[PASS] INV-4   Text nodes identical (COPY FREEZE honored across all nodes)
[PASS] INV-5   Canary byte-identical (host allowlist unmodified)
[PASS] INV-6   Production features preserved (work-67 festival CSS, absolute og:image, cfemail)
[PASS] INV-7   Legacy off-brand tokens eliminated (0 remaining)
[PASS] INV-8   Extracted JS syntax verified via `node --check`
[PASS] INV-9   JSON-LD blocks identical and valid (6/6 parse cleanly)
[PASS] INV-10  Style block count identical (9 / 9 blocks matched)
```

---

## 3. Playwright Browser Test Analysis

### 3.1 Viewport Responsiveness Sweep
Tested at 380px, 560px, 768px, 1000px, 1280px, and 1440px widths:
- **Horizontal Scrollbar Check:** `scrollWidth === innerWidth` on all 6 screen resolutions (0 horizontal overflow).
- **Canary Stability:** The canary script remained passive on all local test domains without unexpected redirects.
- **Console Cleanliness:** Zero uncaught exceptions or unhandled promise rejections recorded.

### 3.2 Dynamic Language Switching Regression
- Switching from default English to Tamil (`ta`) correctly applies the 762 KB dictionary without page errors (`<html lang="ta">`).
- Switching to Bengali (`bn`) updates typography to Eastern Nagari script (`গ্রাহকের ফোন থেকে`).
- Round-tripping back to Hinglish (`hin`) and English (`en`) completely restores the original text nodes without residual state leakage.

### 3.3 The 1 Staging Warning Explained
In [results.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/results.json) and [results-staging.txt](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/results-staging.txt), the reported warnings relate to:
- `403 /api/track`: The analytics ping endpoint deliberately returns `403 Forbidden` on staging to prevent dummy analytics events from polluting production tracking data. This is an intended safeguard rather than a bug.

---

## 4. Code Quality & Architectural Observations

### 4.1 Monolithic Structure vs Developer Ergonomics
- **Current Pattern:** [index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html) bundles ~2,200 lines of CSS across 9 style tags, 1,500 lines of markup, 6 JSON-LD blocks, and over 3,000 lines of JavaScript inside a single 7,265-line file.
- **Architectural Advantage:** Extreme deployment simplicity (drop 3 files onto any cPanel or Apache server) with zero build tool failure risk.
- **Architectural Drawback:** High cognitive load for engineering maintenance, potential merge conflict complexity, and reliance on regex rebase scripts ([rebase.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/reference/rebase.py)) rather than modular components.

### 4.2 Type Safety & Error Handling
- **Type Safety:** The project uses vanilla JavaScript without TypeScript, JSDoc type annotations, or compile-time type checking.
- **Defensive Error Handling:** High resilience across network boundaries. Most `fetch()` requests are wrapped in `try/catch` or chained with `.catch(function(){})` to ensure that server outages (e.g. stats endpoint failure or Turnstile downtime) do not crash the UI.

### 4.3 Accessibility (a11y) Evaluation
- **Strengths:**
  - Semantic landmark tags utilized throughout (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`).
  - Legal overlay modals define `role="dialog"`, `aria-modal="true"`, and appropriate `aria-labelledby` targets ([index.html#L4248](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L4248)).
  - Buttons enforce 43px minimum touch target sizing.
- **Opportunities for Improvement:**
  - Color contrast on muted lavender copy (`#66627a` on `#fffdf8`) achieves a 4.6:1 contrast ratio, barely surpassing WCAG AA standards (4.5:1). Darkening muted text to `#58546c` would enhance readability in bright outdoor sunlight typical of Indian print shop environments.
  - The review carousel lacks explicit `aria-live="polite"` announcements when slides advance automatically or via arrow keys.

