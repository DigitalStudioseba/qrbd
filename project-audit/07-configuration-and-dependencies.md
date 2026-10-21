# Project Audit: Configuration & Dependency Management

This document details all configuration files, package manifests, environment variable references, Content Security Policy directives, and deployment package manifests discovered across the QR Se Print repository.

---

## 1. Direct Dependency Inventory

The application follows a zero-build, zero-runtime-dependency design for the production web client. The only package manifest in the workspace exists within the isolated development test suite.

| Dependency Name | Type | Scope | Version Spec | Determinable Role & Justification |
|---|---|---|---|---|
| `playwright` | NPM Package | Development / QA | `^1.64.1` | Headless Chromium browser automation powering regression tests across 6 viewports ([verification/package.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/package.json)). |
| `python3` (built-in) | System Runtime | Development / Staging | Standard Library | Powers local staging server (`http.server`), deterministic rebase script (`rebase.py`), and invariance verification (`invariance_gate.py`). |
| `node.js` (built-in) | System Runtime | Development / Verification | Standard Runtime | Executes Playwright test runners (`run.mjs`, `run-staging.mjs`) and AST syntax checks (`node --check`). |

---

## 2. Configuration & Manifest Specifications

### 2.1 Web App Manifest ([site.webmanifest](file:///c:/Users/livem/Downloads/Compressed/QRBD/site.webmanifest))
- **File Format:** JSON (758 Bytes).
- **Compliance:** Conforms to W3C Web App Manifest specification.
- **Attributes:**
```json
{
  "name": "QR Se Print — Cyber Cafe & Print Shop Software",
  "short_name": "QR Se Print",
  "description": "Customer QR scan karke file bheje, print automatic nikle. Cyber cafe aur print shop ke liye QR auto-print software.",
  "lang": "hi-IN",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#fffdf8",
  "theme_color": "#ff2e63",
  "categories": ["business", "productivity", "utilities"],
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### 2.2 Content Security Policy (CSP) Directives
Mirrored in [deploy/staging_server.py#L14-L23](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/staging_server.py#L14) to reflect live production security constraints:

| Directive | Allowed Sources / Origins | Security Purpose |
|---|---|---|
| `default-src` | `'self'` | Disallows arbitrary external origins by default |
| `script-src` | `'self'`, `'unsafe-inline'`, `https://checkout.razorpay.com`, `https://cdnjs.cloudflare.com`, `https://*.cashfree.com` | Permits inline client logic, Razorpay checkout, and Cashfree scripts |
| `style-src` | `'self'`, `'unsafe-inline'`, `https://fonts.googleapis.com` | Allows inline style blocks and Google Fonts stylesheets |
| `font-src` | `'self'`, `https://fonts.gstatic.com`, `data:` | Permits Google Fonts webfont binaries and data URIs |
| `img-src` | `'self'`, `data:`, `https://res.cloudinary.com`, `https://*.razorpay.com`, `https://*.cashfree.com` | Allows local brand images, Cloudinary assets, and payment provider logos |
| `connect-src` | `'self'`, `https://*.cashfree.com`, `https://api.cloudinary.com` | Restricts XHR/Fetch API calls to origin and verified payment/asset endpoints |
| `worker-src` | `'self'`, `blob:`, `https://cdnjs.cloudflare.com` | Web worker execution scopes |
| `frame-src` | `https://checkout.razorpay.com`, `https://api.razorpay.com`, `https://*.cashfree.com`, `https://www.youtube-nocookie.com` | Restricts embedded iframes to payment gateways and privacy-enhanced YouTube embeds |
| `form-action` | `'self'`, `https://checkout.razorpay.com`, `https://*.cashfree.com`, `https://secure.ccavenue.com`, `https://test.ccavenue.com`, `https://secure.payu.in`, `https://test.payu.in` | Whitelists payment gateway form submission destinations |
| `object-src` | `'none'` | Blocks Flash, Java applets, and legacy plugin execution |
| `frame-ancestors` | `'self'` | Clickjacking mitigation; prevents framing by third-party origins |

---

## 3. Environment Variable References

In accordance with security rules, no secrets or API keys are stored in the client-side files or committed to the repository. The following environment variables are referenced conceptually across the codebase and server configurations:

| Variable Name | Determination | Role & Usage Context |
|---|---|---|
| `PORT` | Safe Inferred | Server port binding (defaults to 8080/8082 in staging) |
| `SHOW_STATS` | Safe Inferred | Controls visibility of `#statsStrip` via `/api/homepage-config` |
| `SUPPORT_EMAIL` | Safe Inferred | Customer support email (default: `qrseprint@gmail.com`) |
| `SUPPORT_PHONE` | Safe Inferred | Customer support phone (default: `84048 32414`) |
| `CLOUDFLARE_TURNSTILE_SITE_KEY` | Safe Inferred | Public Turnstile challenge key delivered via `/api/security/challenge` |
| `CLOUDFLARE_TURNSTILE_SECRET_KEY` | Server-Side Only | Secret key used server-side to validate Turnstile tokens |
| `RAZORPAY_KEY_ID` | Client/Server | Razorpay public key ID for shop owner onboarding |
| `RAZORPAY_KEY_SECRET` | Server-Side Only | Razorpay private key (never exposed to client) |
| `CASHFREE_APP_ID` | Client/Server | Cashfree public app identifier |
| `CASHFREE_SECRET_KEY` | Server-Side Only | Cashfree private secret key |
| `PAYU_MERCHANT_KEY` | Merchant Level | Shop owner's custom PayU merchant key (configured in shop settings) |
| `PAYU_SALT` | Merchant Level | Shop owner's custom PayU salt |
| `CCAVENUE_WORKING_KEY` | Merchant Level | Shop owner's CCAvenue merchant encryption key |

---

## 4. Deployment Packaging Integrity ([qrbd-Production-Upload/](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload))

The deployable candidate is prepared in [qrbd-Production-Upload.zip](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload.zip) and the unzipped folder [qrbd-Production-Upload/](file:///c:/Users/livem/Downloads/Compressed/QRBD/qrbd-Production-Upload):
- **Core Files to Upload (Exactly 3):**
  1. `index.html`: SHA-256 `bed392e6ce9ca79bd471bff075c5509b3426d5a36b9ffc510920d8e1ad2d6119` (414,709 B).
  2. `icon-512.png`: SHA-256 `7871ed994d0c049f7e8b6ee9bf033ec09c6ebfcfca89851722e1bce9f91a9235` (2,064 B).
  3. `og-image.png`: SHA-256 `7ae067f7001784760cb9a9b5074f19245f727e819b6b8b5f49c59797fd99f49e` (97,201 B).
- **Safety / Do-Not-Upload Files:**
  - `_DO-NOT-UPLOAD/rollback-index-T0.html`: SHA-256 `34f9001e037e35756776930791f7b00738713f32e7b15400fbd6edc30658f7c2` (412,324 B). Instant rollback baseline.
  - `_DO-NOT-UPLOAD/PACKAGE-MANIFEST.txt`: Complete cryptographic hash log.
  - `_DO-NOT-UPLOAD/UPLOAD-INSTRUCTIONS.md`: Operational guide for hosting administrators.

