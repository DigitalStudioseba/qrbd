# Project Audit: Backend Architecture & API Specifications

This document catalogs and inspects all backend API interactions, request-response schemas, authentication mechanisms, middleware rules, and mock fixture specifications supporting the QR Se Print platform.

---

## 1. Backend Architecture & Service Map

The QR Se Print application operates in a decoupled client-server architecture:
- **Client Frontend:** Single-page application hosted at the root origin (`qrseprint.in`).
- **Production Backend API:** A centralized RESTful service (running Node.js / Express or Python behind Cloudflare reverse proxies) serving `/api/*` endpoints.
- **Local Staging Replica ([staging_server.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/staging_server.py)):** An in-memory Python 3 test server binding to `127.0.0.1:8082`, mirroring production security headers, CORS permissions, and route responses via pre-recorded fixtures ([deploy/fixtures/](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures)).

---

## 2. Complete API Endpoint Catalog

| Endpoint URI | HTTP Method | Auth / Tokens | Request Body / Query | Expected Response Schema | Application Consumer |
|---|---|---|---|---|---|
| `/api/homepage-config` | `GET` | None | None | `{ logoUrl, statShops, statPrints, showStats, supportEmail, supportPhone, planDemo, planMonthly, planPro, planStarter, planLifetime, waPrice, waPriceActual }` | Dynamic copy, plan feature lists, WhatsApp pricing |
| `/api/setup-fee/current` | `GET` | None | `ref` (optional referral string) | `{ amount, offerPrice, monthlyFee, actualPrice, plans: { monthly: {...}, pro: {...}, starter: {...}, lifetime: {...}, premium: {...} } }` | Pricing grid (`loadPrices()`), festival discounts (`work-67`) |
| `/api/demo/config` | `GET` | None | None | `{ enabled: boolean, minutes: number, printLimit: number, instant: boolean }` | Demo modal setup limits |
| `/api/security/challenge` | `GET` | None | None | `{ enabled: boolean, siteKey: string }` | Cloudflare Turnstile CAPTCHA initialization |
| `/api/printer-models` | `GET` | None | None | `{ models: string[] }` (List of supported Epson, HP, Canon printer models) | Dropdown select in `#demoModal` |
| `/api/public-stats` | `GET` | None | None | `{ shops: number, prints: number }` | Live counters in `#statsStrip` |
| `/api/reviews` | `GET` | None | None | `{ reviews: [ { id, name, stars, text, city }, ... ] }` | Testimonial carousel in `#reviewsSec` |
| `/api/demo/request` | `POST` | Turnstile Token | `{ name, phone, shopName, address, email, printer, turnstileToken }` | `{ success: boolean, shopId: string, password: string, expiresAt: string, installerUrl: string }` | Free trial account generation in `#demoModal` |
| `/api/track` | `POST` | None | `{ event: string, timestamp: number, metadata: object }` | `{ success: boolean }` | Analytics and engagement tracking |
| `/api/android/visibility` | `GET` | None | None | `{ homepage: boolean, whatsappPrint: boolean }` | Toggles Android download CTA visibility |
| `/api/android/plans` | `GET` | None | None | `{ plans: { monthly: {...}, yearly: {...} }, playStoreUrl: string }` | Android app pricing and Google Play Store link |
| `/api/intl/config` | `GET` | None | None | `{ success: boolean, showHome: boolean, countries: [ { code, name, dial, currency, symbol, plans: [...] } ] }` | International customer banner and currency converter |
| `/api/whitelabel/branding`| `GET` | None | None | `{ isWhitelabel: boolean, partnerName?: string, logoUrl?: string }` | White-label partner co-branding overrides |
| `/api/download/easy-installer/{sid}` | `GET` | Shop ID in URL | None | Binary executable stream (`.exe`) | Download button in demo success modal |
| `/api/i18n/dict` | `GET` | None | `lang` (e.g. `ta`, `te`, `kn`, `bn`) | `{ lang: string, dict: { [hinglishKey: string]: string } }` | Delta dictionary updates loaded by [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js) |
| `/i18n/{lang}.js` | `GET` | None | None | JavaScript script evaluating `QSPi18n.addDict(dict, lang)` | Static full-dictionary asset bundles |

---

## 3. Deep Request-Response Specifications

### 3.1 Demo Generation Request (`POST /api/demo/request`)
- **Headers Required:** `Content-Type: application/json`
- **Payload Schema:**
```json
{
  "name": "Ramesh Kumar",
  "phone": "9876543210",
  "shopName": "Ramesh Digital Photo & Xerox",
  "address": "Main Market, Ranchi, Jharkhand",
  "email": "ramesh.print@gmail.com",
  "printer": "Epson L3110",
  "turnstileToken": "0.X.exampleToken..."
}
```
- **Validation Rules:**
  - `name`: String, 1–100 characters.
  - `phone`: Exactly 10 numeric digits conforming to `/^[6-9]\d{9}$/`. Fails if repetitive (`1111111111`) or dummy sequential (`1234567890`).
  - `printer`: Must match an active model from `/api/printer-models` or "Auto Detect".
  - `turnstileToken`: Required if challenge is enabled by `/api/security/challenge`.
- **Success Response (`200 OK`):**
```json
{
  "success": true,
  "shopId": "QSP-94812",
  "password": "AutoGeneratedPass123",
  "expiresInMinutes": 1440,
  "printLimit": 10,
  "installerUrl": "/api/download/easy-installer/QSP-94812"
}
```
- **Client Error Response (`400 Bad Request`):**
```json
{
  "success": false,
  "error": "Sahi 10 digit mobile number daalo"
}
```

### 3.2 Dynamic Pricing & Festival Offers (`GET /api/setup-fee/current`)
- **Query Parameters:** `ref` (optional referral code, e.g. `/api/setup-fee/current?ref=CYBER2026`).
- **Response Structure ([setup-fee.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/api/setup-fee.json)):**
```json
{
  "amount": 999,
  "offerPrice": 999,
  "monthlyFee": 299,
  "actualPrice": 2999,
  "festivalOffer": {
    "active": true,
    "title": "Diwali Dhamaka Offer",
    "endsAt": 1729555200,
    "color1": "#ff2e63",
    "color2": "#6f35ff"
  },
  "plans": {
    "starter": { "fee": 499, "actual": 999, "advance": false, "name": "Starter" },
    "pro": { "fee": 899, "actual": 1199, "advance": false, "festivalFee": 799, "name": "Pro" },
    "lifetime": { "fee": 2499, "actual": 4999, "advance": true, "name": "Lifetime" }
  }
}
```
- **Business Logic Hook (`work-67`):** If `p.festivalFee > 0`, the client overrides standard display prices and injects the server-specified CSS gradient variables `--fc1` and `--fc2` directly into `.fest-strip`.

---

## 4. Staging Server Implementation ([staging_server.py](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/staging_server.py))

The project includes an isolated staging environment tailored for non-destructive automated testing:
- **Port Binding:** Binds strictly to `127.0.0.1:8082` (permitted by the domain canary).
- **Fixture Resolution:** Maps incoming GET requests against [manifest.json](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures/manifest.json).
- **Mutating Method Guard:** Any `POST`, `PUT`, `DELETE`, or `PATCH` request immediately returns `403 Forbidden` (`{"success": false, "error": "staging is read-only (local mock)"}`). This protects external systems from unintended data modification during test runs.
- **Production Header Emulation:** Injects production headers including:
  - `Content-Security-Policy`: Mirrors production CSP directives.
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy: geolocation=(), microphone=(), camera=(self)`.

