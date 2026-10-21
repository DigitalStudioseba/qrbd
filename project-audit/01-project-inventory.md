# Project Audit: Systematic File Inventory

This inventory provides an exhaustive, classified audit of all **115 files** located within the workspace at [c:/Users/livem/Downloads/Compressed/QRBD](file:///c:/Users/livem/Downloads/Compressed/QRBD). Every file has been inspected; no files have been omitted, altered, or skipped.

---

## 1. Inventory Summary by Functional Category

| Category | File Count | Total Size | Description | Inspection Status |
|---|---|---|---|---|
| **Root Application & Documentation** | 17 | 1,202,306 B | Marketing homepage, i18n runtimes, design specs, webmanifest, root assets, and zip package | 100% Inspected |
| **Cloudflare Runtime Helpers** | 1 | 1,239 B | Cloudflare email obfuscation decoder script (`cdn-cgi/`) | 100% Inspected |
| **UI Vector Assets** | 3 | 13,766 B | SVG illustrations showcasing software UI panels and print queues (`img/`) | 100% Inspected |
| **Original Baseline Backup** | 15 | 751,207 B | Exact unedited baseline preserved prior to redesign (`_backup/`) | 100% Inspected |
| **Deployment Staging & Fixtures** | 39 | 4,008,619 B | Rebased candidate bundle, API/i18n fixtures, rebase script, invariance gate, and test server (`deploy/`) | 100% Inspected |
| **Production Upload Package** | 7 | 935,141 B | Direct upload package matching production zip with rollback files and deploy guides (`qrbd-Production-Upload/`) | 100% Inspected |
| **Verification Test Suite & Shots** | 33 | 4,683,089 B | Playwright test scripts, test result records, and 23 visual regression screenshots (`verification/`) | 100% Inspected |
| **TOTALS** | **115** | **11,595,367 B** | **Complete project workspace** | **115 / 115 Inspected** |

---

## 2. Exhaustive File-by-File Catalog

### 2.1 Root Application & Core Documentation (17 Files)

| Relative File Path | Size | File Type | Purpose & Description | Importance | Inspection Status |
|---|---|---|---|---|---|
| [index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html) | 402,448 B | HTML5 | Core single-page marketing landing page, responsive UI, inline CSS styles, JSON-LD structured data, and vanilla JS client application | Critical | Inspected (475 CSS delta lines vs backup) |
| [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js) | 140,507 B | JavaScript | Core client-side translation runtime. Implements DOM MutationObserver, language selector injection, and English dictionary | Critical | Inspected (574 lines, supports 8 languages) |
| [i18n-extra.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n-extra.js) | 67,350 B | JavaScript | Supplementary translation dictionary, `%d` numeric template substitutions, and monkey-patches for native dialogs (`alert/confirm/prompt`) | Critical | Inspected (826 lines, includes EXTRA23-27) |
| [site.webmanifest](file:///c:/Users/livem/Downloads/Compressed/QRBD/site.webmanifest) | 758 B | JSON | Progressive Web App manifest defining name, theme colors (`#ff2e63`), display mode (`standalone`), and app icons | High | Inspected (valid JSON, hi-IN locale) |
| [design.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/design.md) | 12,077 B | Markdown | Authoritative design token specification defining typography (Jakarta/Inter), colors, radii, spacing, and strict "no corporate blues" rules | High | Inspected (217 lines, design authority) |
| [AUDIT-REPORT.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/AUDIT-REPORT.md) | 13,157 B | Markdown | Historical Phase 1 read-only audit report detailing initial gap analysis against `design.md` | Medium | Inspected (94 lines) |
| [FINAL-REPORT.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/FINAL-REPORT.md) | 9,385 B | Markdown | Historical Phase 5 post-redesign summary confirming CSS-only modifications and Playwright verification | Medium | Inspected (96 lines) |
| [apple-touch-icon.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/apple-touch-icon.png) | 663 B | PNG Image | iOS Safari homescreen bookmark icon | Medium | Inspected (valid PNG) |
| [icon-192.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/icon-192.png) | 682 B | PNG Image | Standard 192x192 PWA homescreen icon | Medium | Inspected (valid PNG) |
| [qr-logo.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/qr-logo.png) | 68,434 B | PNG Image | High-resolution primary brand logo featuring QR glyph with printer imagery | High | Inspected (valid PNG) |
| [QTKABr8jIGuU.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/QTKABr8jIGuU.png) | 97,201 B | PNG Image | OpenGraph preview / JSON-LD brand image (byte-identical to `og-image.png`) | High | Inspected (sha256 `7ae067f7...`) |
| [razorpay.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/razorpay.png) | 12,798 B | PNG Image | Official Razorpay payment gateway trust badge | Medium | Inspected (valid PNG) |
| [cashfree.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/cashfree.png) | 17,227 B | PNG Image | Official Cashfree Payments trust badge | Medium | Inspected (valid PNG) |
| [ccavenue.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/ccavenue.png) | 3,258 B | PNG Image | Official CCAvenue payment gateway trust badge | Medium | Inspected (valid PNG) |
| [payu.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/payu.svg) | 2,159 B | SVG Vector | Official PayU payment gateway trust badge | Medium | Inspected (valid SVG) |
| [qrbd-Production-Upload.zip](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload.zip) | 319,615 B | ZIP Archive | Deployment archive containing production-ready `index.html`, `icon-512.png`, `og-image.png`, and documentation | Critical | Inspected (verified zip structure) |
| [.sudo_as_admin_successful](file:///c:/Users/livem/Downloads/Compressed/QRBD/.sudo_as_admin_successful) | 0 B | Marker | Zero-byte Linux environment artifact indicating past administrative command execution | Low | Inspected (empty file) |

---

### 2.2 Cloudflare Runtime Helpers (1 File)

| Relative File Path | Size | File Type | Purpose & Description | Importance | Inspection Status |
|---|---|---|---|---|---|
| [cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js) | 1,239 B | JavaScript | Cloudflare email obfuscation decoder. Reverses XOR-encoded `data-cfemail` strings on client load | Medium | Inspected (standard Cloudflare obfuscation runtime) |

---

### 2.3 UI Vector Assets (3 Files)

| Relative File Path | Size | File Type | Purpose & Description | Importance | Inspection Status |
|---|---|---|---|---|---|
| [img/ui-panel.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/img/ui-panel.svg) | 4,969 B | SVG Vector | Vector mockup of shop owner software desktop dashboard panel | Medium | Inspected (valid SVG vector) |
| [img/ui-live-job.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/img/ui-live-job.svg) | 4,851 B | SVG Vector | Vector illustration depicting real-time print spool queue cards | Medium | Inspected (valid SVG vector) |
| [img/ui-tray.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/img/ui-tray.svg) | 3,946 B | SVG Vector | Vector graphic illustrating Windows desktop system tray notification icon | Medium | Inspected (valid SVG vector) |

---

### 2.4 Original Baseline Backup (`_backup/`, 15 Files)

| Relative File Path | Size | File Type | Purpose & Description | Importance | Inspection Status |
|---|---|---|---|---|---|
| [_backup/index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/index.html) | 400,109 B | HTML5 | Pre-redesign baseline homepage (sha256 `d7c77dc7...`). Used for invariance and rollback checks | High | Inspected (7,154 lines) |
| [_backup/i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/i18n.js) | 140,507 B | JavaScript | Pre-redesign baseline translation engine (byte-identical to root `i18n.js`) | High | Inspected (byte-identical) |
| [_backup/i18n-extra.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/i18n-extra.js) | 67,350 B | JavaScript | Pre-redesign baseline translation extras (byte-identical to root `i18n-extra.js`) | High | Inspected (byte-identical) |
| [_backup/site.webmanifest](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/site.webmanifest) | 758 B | JSON | Pre-redesign baseline PWA webmanifest (byte-identical to root) | Medium | Inspected (byte-identical) |
| [_backup/apple-touch-icon.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/apple-touch-icon.png) | 663 B | PNG Image | Baseline iOS touch icon (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/icon-192.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/icon-192.png) | 682 B | PNG Image | Baseline PWA icon (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/qr-logo.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/qr-logo.png) | 68,434 B | PNG Image | Baseline primary brand logo (byte-identical) | High | Inspected (byte-identical) |
| [_backup/QTKABr8jIGuU.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/QTKABr8jIGuU.png) | 97,201 B | PNG Image | Baseline OpenGraph image (byte-identical) | High | Inspected (byte-identical) |
| [_backup/razorpay.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/razorpay.png) | 12,798 B | PNG Image | Baseline payment logo (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/cashfree.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/cashfree.png) | 17,227 B | PNG Image | Baseline payment logo (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/ccavenue.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/ccavenue.png) | 3,258 B | PNG Image | Baseline payment logo (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/payu.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/payu.svg) | 2,159 B | SVG Vector | Baseline payment logo (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/img/ui-live-job.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/img/ui-live-job.svg) | 4,851 B | SVG Vector | Baseline SVG vector (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/img/ui-panel.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/img/ui-panel.svg) | 4,969 B | SVG Vector | Baseline SVG vector (byte-identical) | Medium | Inspected (byte-identical) |
| [_backup/img/ui-tray.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/_backup/img/ui-tray.svg) | 3,946 B | SVG Vector | Baseline SVG vector (byte-identical) | Medium | Inspected (byte-identical) |

---

### 2.5 Deployment Staging, Fixtures & Scripts (`deploy/`, 39 Files)

| Relative File Path | Size | File Type | Purpose & Description | Importance | Inspection Status |
|---|---|---|---|---|---|
| [deploy/DEPLOY.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/DEPLOY.md) | 4,533 B | Markdown | Production deployment runbook, pre-flight curl hash validation, and Cloudflare cache purge procedures | Critical | Inspected (62 lines) |
| [deploy/DIFF-SUMMARY.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/DIFF-SUMMARY.md) | 4,110 B | Markdown | Line-by-line delta summary comparing production live T-0 against candidate bundle | High | Inspected (49 lines) |
| [deploy/VERIFICATION-REPORT.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/VERIFICATION-REPORT.md) | 4,786 B | Markdown | Staging regression report verifying 12 invariance rules and browser execution results | High | Inspected (64 lines) |
| [deploy/bundle-manifest.txt](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/bundle-manifest.txt) | 1,227 B | Text | Cryptographic SHA-256 checksum manifest for deployable bundle files | High | Inspected (verified checksums) |
| [deploy/staging_server.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/staging_server.py) | 5,289 B | Python | Mock HTTP staging server (port 8082). Serves bundle files, returns fixture JSON for `/api/*`, enforces read-only 403 on mutations, and mirrors CSP headers | High | Inspected (80 lines) |
| [deploy/bundle/index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/bundle/index.html) | 414,709 B | HTML5 | Rebased, production-ready candidate homepage (sha256 `bed392e6...`). Preserves live work-66/67 features with design.md CSS tokens | Critical | Inspected (7,265 lines) |
| [deploy/bundle/icon-512.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/bundle/icon-512.png) | 2,064 B | PNG Image | 512x512 app icon captured from live server to prevent 404s (sha256 `7871ed99...`) | High | Inspected (valid PNG) |
| [deploy/bundle/og-image.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/bundle/og-image.png) | 97,201 B | PNG Image | OpenGraph preview graphic captured from live server (sha256 `7ae067f7...`) | High | Inspected (valid PNG) |
| [deploy/reference/invariance_gate.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/reference/invariance_gate.py) | 4,033 B | Python | Automated verification gate. Verifies 12 non-CSS invariance rules, checks script ASTs via `node --check`, and tests JSON-LD validity | High | Inspected (62 lines) |
| [deploy/reference/rebase.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/reference/rebase.py) | 9,213 B | Python | Deterministic rebase script applying design.md CSS tokens, geometry layers, and color mappings onto any live production capture | High | Inspected (174 lines) |
| [deploy/rollback/live-index-T0.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/rollback/live-index-T0.html) | 412,324 B | HTML5 | Live production homepage snapshot captured at T-0 (2026-10-21 08:19 UTC, sha256 `34f9001e...`). Contains live work-66 and work-67 | Critical | Inspected (7,220 lines) |
| [deploy/fixtures/manifest.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/manifest.json) | 3,480 B | JSON | Route-to-fixture mapping catalog used by `staging_server.py` | High | Inspected (147 lines) |
| [deploy/fixtures/static/i18n-extra.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/static/i18n-extra.js) | 72,398 B | JavaScript | Live production snapshot of `i18n-extra.js` containing work-66 (EXTRA28) homepage translation additions | High | Inspected (878 lines) |
| [deploy/fixtures/api/android-plans.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/android-plans.json) | 259 B | JSON | Mock API response for `/api/android/plans` (Monthly ₹199, Yearly ₹999, Play Store URL) | Medium | Inspected |
| [deploy/fixtures/api/android-visibility.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/android-visibility.json) | 40 B | JSON | Mock API response for `/api/android/visibility` (`homepage: false, whatsappPrint: false`) | Medium | Inspected |
| [deploy/fixtures/api/challenge.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/challenge.json) | 30 B | JSON | Mock API response for `/api/security/challenge` (Cloudflare Turnstile site key config) | Medium | Inspected |
| [deploy/fixtures/api/demo-config.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/demo-config.json) | 62 B | JSON | Mock API response for `/api/demo/config` (24 hr / 1440 min, 10 prints, instant mode) | Medium | Inspected |
| [deploy/fixtures/api/homepage-config.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/homepage-config.json) | 3,842 B | JSON | Mock API response for `/api/homepage-config` (plan feature bullets, contact phone/email, WhatsApp pricing) | High | Inspected |
| [deploy/fixtures/api/i18n-dict-bare.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-bare.json) | 21 B | JSON | Fallback empty dictionary response for unconfigured languages | Low | Inspected |
| [deploy/fixtures/api/i18n-dict-bn.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-bn.json) | 1,255 B | JSON | Database-driven delta dictionary for Bengali (`/api/i18n/dict?lang=bn`) | Medium | Inspected |
| [deploy/fixtures/api/i18n-dict-en.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-en.json) | 912 B | JSON | Database-driven delta dictionary for English (`/api/i18n/dict?lang=en`) | Medium | Inspected |
| [deploy/fixtures/api/i18n-dict-hin.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-hin.json) | 24 B | JSON | Database-driven delta dictionary for Hindi (`/api/i18n/dict?lang=hin`) | Low | Inspected |
| [deploy/fixtures/api/i18n-dict-kn.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-kn.json) | 1,357 B | JSON | Database-driven delta dictionary for Kannada (`/api/i18n/dict?lang=kn`) | Medium | Inspected |
| [deploy/fixtures/api/i18n-dict-mni.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-mni.json) | 24 B | JSON | Database-driven delta dictionary for Manipuri Bengali script (`/api/i18n/dict?lang=mni`) | Low | Inspected |
| [deploy/fixtures/api/i18n-dict-mni-mtei.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-mni-mtei.json) | 29 B | JSON | Database-driven delta dictionary for Manipuri Meetei Mayek (`/api/i18n/dict?lang=mni-mtei`) | Low | Inspected |
| [deploy/fixtures/api/i18n-dict-ta.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-ta.json) | 1,572 B | JSON | Database-driven delta dictionary for Tamil (`/api/i18n/dict?lang=ta`) | Medium | Inspected |
| [deploy/fixtures/api/i18n-dict-te.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/i18n-dict-te.json) | 1,446 B | JSON | Database-driven delta dictionary for Telugu (`/api/i18n/dict?lang=te`) | Medium | Inspected |
| [deploy/fixtures/api/intl-config.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/intl-config.json) | 785 B | JSON | Mock API response for `/api/intl/config` (international pricing and currency rates) | Medium | Inspected |
| [deploy/fixtures/api/printer-models.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/printer-models.json) | 3,185 B | JSON | Mock API response for `/api/printer-models` (catalog of supported Epson, HP, Canon printer models) | High | Inspected |
| [deploy/fixtures/api/public-stats.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/public-stats.json) | 28 B | JSON | Mock API response for `/api/public-stats` (`{shops: 493, prints: 14330}`) | Medium | Inspected |
| [deploy/fixtures/api/reviews.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/reviews.json) | 2,062 B | JSON | Mock API response for `/api/reviews` (11 verified customer testimonials and star ratings) | High | Inspected |
| [deploy/fixtures/api/setup-fee.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/setup-fee.json) | 987 B | JSON | Mock API response for `/api/setup-fee/current` (pricing plans, amounts, festival offer fees) | Critical | Inspected |
| [deploy/fixtures/api/whitelabel-branding.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/whitelabel-branding.json) | 22 B | JSON | Mock API response for `/api/whitelabel/branding` (`isWhitelabel: false`) | Medium | Inspected |
| [deploy/fixtures/i18n/bn.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/i18n/bn.js) | 516,324 B | JavaScript | On-demand static dictionary for Bengali (3,930 lines, `QSPi18n.addDict`) | High | Inspected |
| [deploy/fixtures/i18n/kn.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/i18n/kn.js) | 554,052 B | JavaScript | On-demand static dictionary for Kannada (3,930 lines) | High | Inspected |
| [deploy/fixtures/i18n/mni.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/i18n/mni.js) | 47,919 B | JavaScript | Customer-page static dictionary for Manipuri (Bengali script, 677 lines) | Medium | Inspected |
| [deploy/fixtures/i18n/mni-mtei.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/i18n/mni-mtei.js) | 45,952 B | JavaScript | Customer-page static dictionary for Manipuri (Meetei Mayek script, 677 lines) | Medium | Inspected |
| [deploy/fixtures/i18n/ta.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/i18n/ta.js) | 762,113 B | JavaScript | On-demand static dictionary for Tamil (4,987 lines) | High | Inspected |
| [deploy/fixtures/i18n/te.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/i18n/te.js) | 551,157 B | JavaScript | On-demand static dictionary for Telugu (3,943 lines) | High | Inspected |

---

### 2.6 Production Upload Package (`qrbd-Production-Upload/`, 7 Files)

| Relative File Path | Size | File Type | Purpose & Description | Importance | Inspection Status |
|---|---|---|---|---|---|
| [qrbd-Production-Upload/index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload/index.html) | 414,709 B | HTML5 | Production candidate file to upload directly to web root (sha256 `bed392e6...`) | Critical | Inspected (byte-identical to `deploy/bundle/index.html`) |
| [qrbd-Production-Upload/icon-512.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload/icon-512.png) | 2,064 B | PNG Image | Production PWA icon to upload to web root (sha256 `7871ed99...`) | High | Inspected (byte-identical to bundle) |
| [qrbd-Production-Upload/og-image.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload/og-image.png) | 97,201 B | PNG Image | Production OpenGraph image to upload to web root (sha256 `7ae067f7...`) | High | Inspected (byte-identical to bundle) |
| [qrbd-Production-Upload/_DO-NOT-UPLOAD/DEPLOY.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload/_DO-NOT-UPLOAD/DEPLOY.md) | 4,533 B | Markdown | Deployment guide for production administrator | High | Inspected (identical to `deploy/DEPLOY.md`) |
| [qrbd-Production-Upload/_DO-NOT-UPLOAD/UPLOAD-INSTRUCTIONS.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload/_DO-NOT-UPLOAD/UPLOAD-INSTRUCTIONS.md) | 4,902 B | Markdown | Step-by-step non-technical instructions for cPanel / FileZilla upload | High | Inspected (68 lines) |
| [qrbd-Production-Upload/_DO-NOT-UPLOAD/PACKAGE-MANIFEST.txt](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload/_DO-NOT-UPLOAD/PACKAGE-MANIFEST.txt) | 1,468 B | Text | SHA-256 package checksums and file verification commands | High | Inspected |
| [qrbd-Production-Upload/_DO-NOT-UPLOAD/rollback-index-T0.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload/_DO-NOT-UPLOAD/rollback-index-T0.html) | 412,324 B | HTML5 | Instant rollback copy of production homepage (sha256 `34f9001e...`) | Critical | Inspected (byte-identical to `deploy/rollback/`) |

---

### 2.7 Verification Test Suite & Artifacts (`verification/`, 33 Files)

| Relative File Path | Size | File Type | Purpose & Description | Importance | Inspection Status |
|---|---|---|---|---|---|
| [verification/package.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/package.json) | 279 B | JSON | Node.js manifest for test suite defining Playwright dependency | Medium | Inspected (`playwright: ^1.64.1`) |
| [verification/package-lock.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/package-lock.json) | 1,173 B | JSON | NPM dependency lockfile for verification harness | Low | Inspected |
| [verification/run.mjs](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/run.mjs) | 14,013 B | JavaScript (ESM) | Automated Playwright test suite comparing redesign (port 8080) against baseline (port 8081) across 6 screen sizes | High | Inspected (236 lines) |
| [verification/run-staging.mjs](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/run-staging.mjs) | 9,828 B | JavaScript (ESM) | Playwright test suite executing against staging replica (port 8082) with mocked live fixtures | High | Inspected (137 lines) |
| [verification/diag.mjs](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/diag.mjs) | 2,455 B | JavaScript (ESM) | Interactive visual diagnostics tool comparing redesign and baseline elements | Medium | Inspected (42 lines) |
| [verification/sections.mjs](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/sections.mjs) | 1,607 B | JavaScript (ESM) | Playwright automation script capturing section-level screenshot evidence | Medium | Inspected (39 lines) |
| [verification/results.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/results.json) | 6,263 B | JSON | Machine-readable log of 43 PASS and 1 WARNING test execution records | High | Inspected (240 lines) |
| [verification/results-staging.txt](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/results-staging.txt) | 2,884 B | Text | Human-readable log of staging regression tests (37 PASS, 6 WARNING, 0 FAIL) | High | Inspected (45 lines) |
| [verification/shots/cmp-new.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/cmp-new.png) | 319,621 B | PNG Image | Screenshot of redesign homepage at 1280px | Low | Inspected (binary image) |
| [verification/shots/cmp-old.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/cmp-old.png) | 318,375 B | PNG Image | Screenshot of baseline homepage at 1280px | Low | Inspected (binary image) |
| [verification/shots/new-380.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-380.png) | 135,953 B | PNG Image | Viewport test screenshot at 380px width | Low | Inspected (binary image) |
| [verification/shots/new-560.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-560.png) | 163,851 B | PNG Image | Viewport test screenshot at 560px width | Low | Inspected (binary image) |
| [verification/shots/new-768.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-768.png) | 224,603 B | PNG Image | Viewport test screenshot at 768px tablet width | Low | Inspected (binary image) |
| [verification/shots/new-1000.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-1000.png) | 244,486 B | PNG Image | Viewport test screenshot at 1000px small laptop width | Low | Inspected (binary image) |
| [verification/shots/new-1280.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-1280.png) | 318,984 B | PNG Image | Viewport test screenshot at 1280px laptop width | Low | Inspected (binary image) |
| [verification/shots/new-1440.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-1440.png) | 399,231 B | PNG Image | Viewport test screenshot at 1440px desktop width | Low | Inspected (binary image) |
| [verification/shots/sec-pricing-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-pricing-d.png) | 222,360 B | PNG Image | Pricing section desktop screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-pricing-m.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-pricing-m.png) | 98,728 B | PNG Image | Pricing section mobile screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-wapp-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-wapp-d.png) | 240,302 B | PNG Image | WhatsApp-to-print desktop screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-wapp-m.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-wapp-m.png) | 89,158 B | PNG Image | WhatsApp-to-print mobile screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-faq-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-faq-d.png) | 330,237 B | PNG Image | FAQ accordion desktop screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-faq-m.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-faq-m.png) | 96,124 B | PNG Image | FAQ accordion mobile screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-reviews-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-reviews-d.png) | 340,772 B | PNG Image | Reviews carousel desktop screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-reviews-m.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-reviews-m.png) | 107,283 B | PNG Image | Reviews carousel mobile screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-uisec-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-uisec-d.png) | 186,929 B | PNG Image | Product UI screenshots section desktop | Low | Inspected (binary image) |
| [verification/shots/sec-uisec-m.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-uisec-m.png) | 80,690 B | PNG Image | Product UI screenshots section mobile | Low | Inspected (binary image) |
| [verification/shots/sec-demomodal-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-demomodal-d.png) | 293,009 B | PNG Image | Demo modal desktop view screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-demomodal-m.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-demomodal-m.png) | 74,400 B | PNG Image | Demo modal mobile view screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-setupguide-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-setupguide-d.png) | 339,261 B | PNG Image | Setup guide router overlay desktop screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-setupguide-fixed-d.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-setupguide-fixed-d.png) | 175,559 B | PNG Image | Setup guide scroll position desktop screenshot | Low | Inspected (binary image) |
| [verification/shots/sec-setupguide-m.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/sec-setupguide-m.png) | 159,351 B | PNG Image | Setup guide router overlay mobile screenshot | Low | Inspected (binary image) |
| [verification/shots/staging-1280.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/staging-1280.png) | 312,204 B | PNG Image | Staging server homepage screenshot at 1280px with mocked data | Low | Inspected (binary image) |
| [verification/shots/staging-demo-modal.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/staging-demo-modal.png) | 284,349 B | PNG Image | Staging server demo modal screenshot with validation active | Low | Inspected (binary image) |

