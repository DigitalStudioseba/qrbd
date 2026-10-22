# Project Audit: Complete Feature Audit & Workflows

This document details every feature discovered within the legacy brand codebase. Each feature is audited against its source code implementation, user-facing behavior, validation rules, backend dependencies, and verified operating status.

---

## 1. Feature Status Summary Matrix

| Feature Identifier | Feature Name | Category | Implementation Status | Backend / External Dependency |
|---|---|---|---|---|
| **FEAT-01** | Hero Section & Direct Conversion Triggers | Marketing / UI | **Fully Implemented** | None (pure client-side) |
| **FEAT-02** | Walkthrough Video Embed | Onboarding / Media | **Fully Implemented** | YouTube (`youtube-nocookie.com`) |
| **FEAT-03** | Dynamic Shop & Print Live Counters | Social Proof | **Partially Implemented** (Hidden by default) | `/api/homepage-config`, `/api/public-stats` |
| **FEAT-04** | Reviews Carousel & Rating Aggregates | Social Proof | **Fully Implemented** | `/api/reviews` |
| **FEAT-05** | Core Benefits & Competitive Comparison | Content / Marketing | **Fully Implemented** | None |
| **FEAT-06** | Ephemeral File Privacy Guarantee | Security / Compliance | **Fully Implemented** | None (informational UI) |
| **FEAT-07** | "Inside the Software" UI Showcase | Product Demonstration | **Fully Implemented** | Local SVG assets (`img/ui-*.svg`) |
| **FEAT-08** | Dynamic Pricing Calculator & Plan Grid | Monetization / Sales | **Fully Implemented** | `/api/setup-fee/current`, `/api/homepage-config` |
| **FEAT-09** | Android Shop Owner App Promotion | Mobile Expansion | **Partially Implemented** (Flag-Gated) | `/api/android/visibility`, `/api/android/plans` |
| **FEAT-10** | International Currency & Pricing Banner | Global Expansion | **Partially Implemented** (Flag-Gated) | `/api/intl/config` |
| **FEAT-11** | WhatsApp-to-Print Animated Simulation | Product Teaser | **Partially Implemented** (Simulation + Lead Capture) | `/api/homepage-config`, redirect to `/requirements` |
| **FEAT-12** | Interactive FAQ Accordion | Support / SEO | **Fully Implemented** | Structured JSON-LD schema |
| **FEAT-13** | Instant Free Demo Generation Modal | Lead Generation / Onboarding | **Fully Implemented** (Production Ready) | `/api/security/challenge`, `/api/printer-models`, `/api/demo/request` |
| **FEAT-14** | Business Inquiry Modal | Enterprise / B2B Sales | **Fully Implemented** | `wa.me` WhatsApp API / `mailto:` client |
| **FEAT-15** | Client-Side SPA Informational Overlays | Routing / Navigation | **Fully Implemented** | Native History API (`pushState`) |
| **FEAT-16** | Comprehensive Setup Guide Overlay | Documentation / Technical | **Fully Implemented** | In-page SPA router (`/setup-guide`) |
| **FEAT-17** | 8-Language Dynamic Translation Engine | Internationalization | **Fully Implemented** | `/api/i18n/dict`, `/i18n/*.js`, `localStorage` |
| **FEAT-18** | Anti-Copy Domain Canary Guard | Security / IP Protection | **Fully Implemented** | Native DOM location checks |
| **FEAT-19** | Cloudflare Email Protection Runtime | Privacy / Security | **Fully Implemented** | Cloudflare static decoder |
| **FEAT-20** | Agent Program Linkage | Partner Acquisition | **Planned / External** | Redirects to `/agent` route |

---

## 2. Detailed Feature Specifications

### FEAT-01: Hero Section & Direct Conversion Triggers
- **Location:** [index.html#L3167-L3320](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3167)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** Displays the brand proposition ("Customer ke phone se print seedha aapke printer par"), zero-setup requirements ("Na WhatsApp Web, na Bluetooth, na Cable"), primary CTA buttons ("Free Demo Dekhein", "Plans & Pricing"), and an interactive visual demo QR code preview.
- **Interactions:** Clicking "Free Demo Dekhein" executes `openDemoModal()`. Clicking "Plans & Pricing" smoothly scrolls to `#pricingSection`.
- **Validation:** None required.

---

### FEAT-02: Walkthrough Video Embed
- **Location:** [index.html#L3374-L3390](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3374)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** Embedded responsive 16:9 video container hosting the official software setup walkthrough from YouTube's privacy-enhanced domain (`youtube-nocookie.com/embed/fD3XjP6h1L8`).
- **Logic:** Script 13 provides `qspSetGuideVideo(vid)` allowing dynamic video ID overrides via server configuration.

---

### FEAT-03: Dynamic Shop & Print Live Counters
- **Location:** [index.html#L3392-L3406](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3392), [index.html#L5520-L5535](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L5520)
- **Status:** **Partially Implemented (Feature Flagged)**
- **User-Facing Behavior:** Displays horizontal counter ribbon indicating total registered shops ("490+ Shops") and total prints dispatched ("41K Prints").
- **Implementation Reality:** In production, the counter ribbon `#statsStrip` is hidden by default because `/api/homepage-config` returns `"showStats": false`. When enabled, it queries `/api/public-stats` and formats integers into Indian currency/numerical groupings (`14,330`).

---

### FEAT-04: Reviews Carousel & Rating Aggregates
- **Location:** [index.html#L3408-L3445](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3408), [index.html#L6800-L6900](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L6800)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** Displays aggregate trust scores (Google 4.9★, Justdial 4.8★) alongside an interactive multi-card review carousel featuring testimonials from real cyber café owners across India (Jharkhand, Bihar, Uttar Pradesh, West Bengal).
- **Technical Logic:** `initReviewCarousel()` initializes CSS scroll-snap on `#rvViewport`, with left (`#rvPrev`) and right (`#rvNext`) arrow event handlers, keyboard navigation (`ArrowLeft`/`ArrowRight`), touch swipe support, and dynamic pagination dots.
- **Backend Fetch:** Requests `/api/reviews` which populates 11 review cards dynamically into `#rvGrid`.

---

### FEAT-05: Ephemeral File Privacy Guarantee
- **Location:** [index.html#L3475-L3510](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3475)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** Educational section detailing the system's privacy model: customer files are never permanently stored on servers. Files uploaded by customers are deleted automatically within 120 seconds or immediately upon spool completion. Explains why this protects cyber café owners from legal liability and customer harassment.

---

### FEAT-06: "Inside the Software" UI Showcase
- **Location:** [index.html#L3512-L3555](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3512)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** Visual inspection gallery displaying screenshots and vector mockups of the desktop client software:
  1. Main Dashboard ([img/ui-panel.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/img/ui-panel.svg)): Shop owner settings, printer assignments, rate configuration.
  2. Live Print Queue ([img/ui-live-job.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/img/ui-live-job.svg)): Incoming customer documents and live spool status.
  3. System Tray Monitor ([img/ui-tray.svg](file:///c:/Users/livem/Downloads/Compressed/QRBD/img/ui-tray.svg)): Lightweight Windows background worker.

---

### FEAT-07: Dynamic Pricing Calculator & Plan Grid
- **Location:** [index.html#L3562-L3672](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3562), [index.html#L5540-L5720](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L5540)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** 5 distinct plan cards:
  - **Starter Plan:** Basic auto-printing, 1 printer connection.
  - **Pro Plan:** Multi-printer support, color/B&W routing, advance features unlockable.
  - **Premium Plan:** High-volume cyber cafés, priority spooling.
  - **Monthly Subscription:** Low initial investment, recurring billing.
  - **Lifetime License:** One-time payment, permanent updates, zero renewals.
- **Dynamic Logic (`loadPrices()`):**
  - Fetches `/api/setup-fee/current` (with optional referral tag `?ref=`).
  - Supports "Setup Festival" promotional discounts (`work-67`): dynamic festival fee (`p.festivalFee`), countdown timers, and server-injected CSS colors (`--fc1`/`--fc2`).
  - Plan CTA buttons link to `/register?plan={starter|pro|premium|monthly|lifetime}`.

---

### FEAT-08: WhatsApp-to-Print Automated Simulation & Lead Form
- **Location:** [index.html#L3902-L4135](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3902), [index.html#L4000-L4120](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L4000)
- **Status:** **Partially Implemented (Interactive Simulation + Lead Capture)**
- **User-Facing Behavior:**
  - An animated chatbot interface simulates an automated customer ordering interaction over WhatsApp (customer sends PDF -> bot calculates page count and cost -> sends payment link -> prints).
  - A lead registration form (`#waForm`) invites shop owners to express interest.
- **Validation & Handling:**
  - Input `#waPhone` validates standard 10-digit Indian numbers (`/^[6-9]\d{9}$/`).
  - Submitting redirects the browser to `/requirements?phone={phone}` to complete full onboarding.
  - Live pricing is fetched from `/api/homepage-config` (`waPrice` and `waPriceActual`).

---

### FEAT-09: Instant Free Demo Generation Modal (`#demoModal`)
- **Location:** [index.html#L4200-L4228](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L4200), [index.html#L5550-L6150](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L5550)
- **Status:** **Fully Implemented (Production Ready)**
- **User-Facing Behavior:** Walk-in modal dialog allowing cyber café owners to generate an instant 24-hour / 10-print free trial account without payment.
- **Form Fields & Validation (`createDemo()`):**
  - `dmName`: Full Name (required, non-empty).
  - `dmPhone`: 10-digit Mobile Number. Validated with `dmValidatePhone()` which strips non-digits, checks Indian prefix `+91`, and explicitly rejects dummy numbers (e.g., `9999999999`, `1234567890`, repeated sequences).
  - `dmShop`: Shop Name (required).
  - `dmAddress`: City / State / Market Address (required).
  - `dmEmail`: Email Address (optional; validated against standard email regex if provided).
  - `dmPrinter`: Printer Model selector. Options populated dynamically from `/api/printer-models`.
  - Bot Verification: Fetches challenge configuration from `/api/security/challenge`. If enabled, renders Cloudflare Turnstile widget.
- **Submission & Success Workflow:**
  - Dispatches `POST /api/demo/request` with payload `{ name, phone, shopName, address, email, printer, turnstileToken }`.
  - On `200 OK`, transitions modal to a rich credentials vault displaying:
    - **Shop ID** (unique alphanumeric shop identifier).
    - **Password** (initial auto-generated password).
    - **Expiry Countdown** (24 hours remaining).
    - **One-Click Download:** Binds direct download button for the Windows client software: `/api/download/easy-installer/{sid}`.
    - **Embedded Setup Video:** Step-by-step installation instructions.

---

### FEAT-10: Business Inquiry & Contact Modals
- **Location:** [index.html#L4230-L4245](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L4230), [index.html#L6700-L6780](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L6700)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** Allows enterprise partners, multi-shop owners, and distributors to submit inquiries.
- **Logic (`sendInq(via)` and `sendContact(via)`):**
  - Validates name, 10-digit phone, optional email, and message body (min 5 characters).
  - If user selects WhatsApp (`via === 'whatsapp'`), opens a formatted message in WhatsApp Web/App (`wa.me`).
  - If user selects Email (`via === 'email'`), opens default email client (`mailto:legacy-support@gmail.com`).

---

### FEAT-11: Client-Side SPA Informational Overlays
- **Location:** [index.html#L4248-L5400](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L4248), [index.html#L7040-L7160](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L7040)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** In-page full-screen overlays providing comprehensive legal, technical, and corporate information:
  - `/about`: Company story, mission, founder details, roadmap.
  - `/features`: Deep technical capabilities, supported formats, queue algorithms.
  - `/setup-guide`: End-to-end installation manual divided into Section A (Hardware & Agent installation), Section B (Online payment setup via Razorpay/Cashfree), and Section C (Privacy safeguards).
  - `/contact`: Official support channels (phone, email, WhatsApp).
  - `/partner`: White-label partnership and reseller terms.
  - `/terms`: Terms of Service and End User License Agreement.
  - `/privacy`: Privacy Policy detailing data handling and grievance officer details (`work-52`).
  - `/refund`: Refund Policy (strict 48-hour conditional refund terms).
  - `/disclaimer`: Legal disclaimers regarding third-party printer drivers.
- **Routing Engine:**
  - Manages URLs via `history.pushState()` without full page reloads.
  - Automatically clones and appends the global footer ([index.html#L7053](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L7053)) to every active overlay view.

---

### FEAT-12: 8-Language Translation Engine
- **Location:** [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js), [i18n-extra.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n-extra.js)
- **Status:** **Fully Implemented**
- **User-Facing Behavior:** Floating language picker at bottom-left corner of the viewport allowing seamless switching across English, Hindi, Tamil, Telugu, Kannada, Bengali, and Manipuri.
- **Persistence:** Selected language is stored in browser `localStorage.getItem('qsp_lang')`.
- **Dynamic Observation:** Uses `MutationObserver` to ensure asynchronous content (pricing updates, reviews, error messages) is translated instantly as it enters the DOM.

---

### FEAT-13: Anti-Theft Domain Canary Guard
- **Location:** [index.html#L1-L15](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L1) (Script 0)
- **Status:** **Fully Implemented**
- **Technical Operation:** Executes synchronously as the first script in `<head>`.
- **Allowed Hosts:** `localhost`, `127.0.0.1`, `[::1]`, `*.localhost`, `*.legacy-domain`, and `file://`.
- **Violation Action:** If hosted on an unauthorized external domain, it completely purges the DOM using `document.open()`, displays an "Unofficial Copy" warning notice, and redirects the browser to `https://[legacy-domain]/` after 2,500 milliseconds.

