# Project Audit: Technology Stack & Dependency Analysis

This report documents all technologies, runtimes, protocols, libraries, external integrations, and architectural frameworks discovered across the codebase at [c:/Users/livem/Downloads/Compressed/QRBD](file:///c:/Users/livem/Downloads/Compressed/QRBD).

---

## 1. Technology Classification Matrix

| Layer / Domain | Technology Identified | Version / Spec | Purpose & Evidence in Codebase |
|---|---|---|---|
| **Core Frontend Language** | Vanilla ECMAScript | ES6+ / ES2020 | All client logic in [index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html) and [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js). Zero transpilation dependencies. |
| **Markup Standard** | HTML5 Semantic DOM | HTML5 Standard | Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>`, `<details>`). |
| **Styling & Design System** | Native CSS3 Custom Properties | CSS Variables Level 1 | 10 inline `<style>` blocks in [index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html); `:root` tokens aligned with [design.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/design.md). |
| **Web Typography** | Google Fonts API | v2 Embed URL | Plus Jakarta Sans (600, 700, 800) for headlines/labels; Inter (400, 500, 600, 700) for body copy. Loaded in `<head>`. |
| **SEO & Structured Data** | JSON-LD / Schema.org | Schema v14+ | 6 structured data schemas: `SoftwareApplication`, `FAQPage`, `Organization`, `WebSite`, `ItemList`, `BreadcrumbList`. |
| **Internationalization (i18n)** | Custom DOM Engine | Vanilla JS / MutationObserver | Dynamic runtime translation across 8 languages ([i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js), [i18n-extra.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n-extra.js)). |
| **Progressive Web App (PWA)** | Web App Manifest | W3C Manifest Spec | [site.webmanifest](file:///c:/Users/livem/Downloads/Compressed/QRBD/site.webmanifest) defining standalone app configuration and icon paths. |
| **Backend Integration Protocol** | RESTful HTTP / JSON | HTTP/1.1 & HTTP/2 | Asynchronous `window.fetch()` calls across 18 backend endpoints ([index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L5500)). |
| **Security & Bot Mitigation** | Cloudflare Turnstile | v0 API | Client challenge token requested via `/api/security/challenge` before demo generation ([index.html#L5600](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html)). |
| **Email Privacy & Anti-Scrape** | Cloudflare Email Protection | Cloudflare static | `data-cfemail` attribute decoding via [email-decode.min.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js). |
| **Video Delivery** | YouTube IFrame Player API | Privacy-Enhanced (`youtube-nocookie.com`) | Embedded setup and demo walkthrough video iframe ([index.html#L3380](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html)). |
| **Payment Ecosystems** | Multi-Gateway Aggregators | Razorpay, Cashfree, PayU, CCAvenue | Payment processing badges, instructions, and server-coordinated checkout flows. |
| **Test & QA Framework** | Playwright Chromium | `^1.64.1` | Headless browser test runner across 6 viewports ([package.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/package.json), [run.mjs](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/run.mjs)). |
| **Local Staging Server** | Python 3 `http.server` | Python Standard Library | Read-only local staging environment mocking 18 API endpoints ([staging_server.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/staging_server.py)). |
| **Rebase & Verification Tooling** | Python 3 AST & Regex Scripts | Python Standard Library | Deterministic rebase script ([rebase.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/reference/rebase.py)) and invariance gate ([invariance_gate.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/reference/invariance_gate.py)). |

---

## 2. Detailed Technical Stack Analysis

### 2.1 Frontend Architecture & Zero-Build Philosophy
- **Runtimes:** The frontend is constructed without heavy single-page application frameworks like React, Vue, or Angular, eliminating node module compilation, transpilation pipelines, bundle bloat, and runtime hydration overhead.
- **Single File Distribution:** The production landing page is encapsulated inside [deploy/bundle/index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/bundle/index.html) (414 KB) accompanied only by [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js) (140 KB), [i18n-extra.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n-extra.js) (67 KB), and static raster/SVG assets.
- **Client Routing:** Utilizes a lightweight custom router that hooks into `window.history.pushState()`, `window.history.replaceState()`, and the `popstate`/`hashchange` events. This maps full paths (`/about`, `/features`, `/setup-guide`, `/contact`, `/terms`, `/privacy`, `/refund`, `/disclaimer`, `/partner`) to interactive modal overlays while maintaining crawlable clean URLs for search engine indexation.

### 2.2 Design Token System & Authority (`design.md`)
The design system conforms to the official specification codified in [design.md](file:///c:/Users/livem/Downloads/Compressed/QRBD/design.md):
- **Primary Color:** `#ff2e63` (Vibrant Pink / Action Accent)
- **Secondary Color:** `#6f35ff` (Electric Violet / Gradient Endpoint)
- **Tertiary / Dark:** `#17171b` (Deep Charcoal Ink / Overlay)
- **Neutral Background:** `#fffdf8` (Warm Off-White Paper)
- **Surface:** `#ffffff` (Pure White Card Background)
- **On-Surface Text:** `#16162e` (High-Contrast Midnight Ink)
- **Text Muted:** `#66627a` (Lavender Grey Secondary Copy)
- **Border Neutral:** `#ece3d2` (Warm Sand Card Border)
- **Utility / Success:** `#2dd4bf` (Teal Green)
- **Utility / Warning:** `#ffca28` (Warm Amber Yellow)
- **Utility / Error:** `#ef4444` (Coral Red)
- **Border Radii:**
  - `sm: 8px`
  - `md: 14px` (Inputs, Buttons, Pills)
  - `lg: 18px` (Cards, Panels)
  - `xl: 28px`
  - `full: 9999px` (Badges, Status Chips)
- **Strict Brand Negative Rule:** "No corporate blues" (`#0b3ac7`, `#1d4ed8`, `#04152f`). Blue tones previously present in the demo success card were systematically replaced with ink (`#17171b`) and violet (`#6f35ff`).

### 2.3 Internationalization (i18n) Engine
- **Engine Mechanics:** Defined in [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js), the translator observes DOM insertions and mutations via `MutationObserver`. It scans all text nodes, input placeholders, title attributes, `aria-label` tags, and image alt text, matching them against exact Hinglish source string keys.
- **Language Support Matrix:**
  1. `en` (English, bundled natively in [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js) and [i18n-extra.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n-extra.js))
  2. `hin` (Hindi / Hinglish source text)
  3. `ta` (Tamil, loaded via `/i18n/ta.js` or `/api/i18n/dict?lang=ta`)
  4. `te` (Telugu, loaded via `/i18n/te.js` or `/api/i18n/dict?lang=te`)
  5. `kn` (Kannada, loaded via `/i18n/kn.js` or `/api/i18n/dict?lang=kn`)
  6. `bn` (Bengali, loaded via `/i18n/bn.js` or `/api/i18n/dict?lang=bn`)
  7. `mni` (Manipuri, Bengali script — reserved for customer print queue page)
  8. `mni-mtei` (Manipuri, Meetei Mayek script — customer print queue page)
- **Dynamic Numeric Templating:** Supports `%d` tokens for dynamic price values (e.g. `"Advance Feature isme nahi hai — baad me ₹%d me alag se unlock kar sakte ho"`), allowing admin pricing updates without breaking translation matches.

### 2.4 External Services & Integration Ecosystem
1. **Cloudflare CDN & Edge Proxy:**
   - CDN caching rules and edge header injection.
   - Cloudflare Turnstile bot verification (`/api/security/challenge`).
   - Cloudflare Email Obfuscation ([email-decode.min.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js)).
2. **Payment Processing Networks:**
   - **Razorpay:** Primary Indian online checkout (`https://checkout.razorpay.com`, `api.razorpay.com`).
   - **Cashfree Payments:** Secondary Indian UPI/card gateway (`https://*.cashfree.com`).
   - **PayU:** Direct merchant payment integration (`https://secure.payu.in`).
   - **CCAvenue:** Legacy/banking card payment rails (`https://secure.ccavenue.com`).
3. **Google Play Store:**
   - Android Shop Agent application (`com.qrseprint.agent`), referenced in [android-plans.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/android-plans.json).
4. **YouTube Video Embeds:**
   - Embeds tutorial videos via `https://www.youtube-nocookie.com/embed/...` ensuring zero third-party cookie tracking prior to user interaction.
5. **WhatsApp Web Dispatch:**
   - Generates pre-populated WhatsApp click-to-chat links (`https://wa.me/918404832414?text=...`) for sales inquiries and customer support.

---

## 3. Package & Manifest Inventory

### 3.1 Verification Test Harness ([verification/package.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/package.json))
```json
{
  "name": "verification",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "playwright": "^1.64.1"
  }
}
```
- **Type:** Development / QA harness.
- **Lockfile Status:** Fully resolved in [verification/package-lock.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/package-lock.json).
- **Runtime Requirement:** Node.js v18+ (tested successfully on Node.js v24.21.0).

### 3.2 Web App Manifest ([site.webmanifest](file:///c:/Users/livem/Downloads/Compressed/QRBD/site.webmanifest))
- **Application Name:** `QR Se Print — Cyber Cafe & Print Shop Software`
- **Short Name:** `QR Se Print`
- **Display Mode:** `standalone`
- **Orientation:** `portrait`
- **Theme Color:** `#ff2e63`
- **Background Color:** `#fffdf8`
- **Locale:** `hi-IN`
- **Icons Defined:**
  - `icon-192.png` (192x192, purpose: any)
  - `icon-512.png` (512x512, purpose: any)
  - `icon-512.png` (512x512, purpose: maskable)

