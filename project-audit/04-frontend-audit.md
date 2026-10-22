# Project Audit: Frontend Architecture & Component Audit

This report provides a granular audit of the frontend presentation layer, user interfaces, DOM layout, design system adherence, component hierarchies, form validation routines, and responsive behaviors within the legacy brand application.

---

## 1. Route & View Inventory

The application implements a hybrid Single-Page Application (SPA) architecture within [index.html](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html). Standard root paths are intercepted via JavaScript `click` listeners and synchronized with the browser History API (`pushState` and `popstate`), ensuring bookmarkable, search-engine-crawlable clean URLs without triggering full document reloads.

| Route Path | View Identifier | Type | Display Mechanism | Role & Contents |
|---|---|---|---|---|
| `/` | `body > main` | Primary Document | Default Root Flow | Full landing page (Hero, Video, Reviews, Features, Pricing, WhatsApp, FAQ) |
| `/about` | `#aboutPage` | SPA Overlay Modal | `.legal-page.open` | Company history, mission, founder background, and technology vision |
| `/features` (or `/feature`) | `#featurePage` | SPA Overlay Modal | `.legal-page.open` | Detailed feature breakdown, print spooling mechanics, supported printers |
| `/setup-guide` (or `/guide`) | `#setupGuidePage` | SPA Overlay Modal | `.legal-page.open` | Complete 3-section setup manual: Hardware, Razorpay payment gateway, and Privacy |
| `/contact` | `#contactPage` | SPA Overlay Modal | `.legal-page.open` | Contact information, support telephone numbers, email, and interactive contact form |
| `/partner` | `#partnerPage` | SPA Overlay Modal | `.legal-page.open` | White-label partnership and reseller terms |
| `/terms` | `#termsPage` | SPA Overlay Modal | `.legal-page.open` | Terms of service, acceptable use policy, commercial licensing terms |
| `/privacy` | `#privacyPage` | SPA Overlay Modal | `.legal-page.open` | Privacy policy, 120-second ephemeral file policy, Grievance Officer details (`work-52`) |
| `/refund` | `#refundPage` | SPA Overlay Modal | `.legal-page.open` | Strict 48-hour conditional refund and cancellation terms |
| `/disclaimer` (or `/declaration`, `/faq`) | `#disclaimerPage` | SPA Overlay Modal | `.legal-page.open` | Hardware liability disclaimer and third-party driver declarations |

---

## 2. Component Hierarchy & Inventory

### 2.1 Navigation & Global Chrome
- **Header (`header#siteHead`):**
  - Sticky navigation bar with dynamic box shadow on scroll ([index.html#L3129](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L3129)).
  - Contains brand lockup (`qr-logo.png`), desktop navigation links (`#features`, `#pricingSection`, `/setup-guide`, `/contact`, `/about`), and the primary Shop Owner Login CTA (`/login`).
  - Mobile hamburger toggle (`#navBurger`) controlling expandable drawer (`#navDrop`).
- **Footer (`footer.footer`):**
  - Multi-column navigational footer containing legal links, partner links, support contact details, and copyright information.
  - Dynamically cloned into all active legal overlay pages via `lgAddFooter(page)` ([index.html#L7053](file:///c:/Users/livem/Downloads/Compressed/QRBD/index.html#L7053)) to guarantee navigation consistency.
- **Floating Language Switcher (`select#langSel`):**
  - Fixed-position bottom-left dropdown widget allowing immediate locale switching.
  - Dynamically injected or enhanced by [i18n.js](file:///c:/Users/livem/Downloads/Compressed/QRBD/i18n.js).

### 2.2 Reusable UI Components & Tokens
- **Buttons (`.cta-price`, `.cta-main`, `.cta-sub`, `.cta-demo`, `.p3btn`, `.big-btn`, `.dm-btn`, `.login-pill`):**
  - Height: Normalized to 43px minimum touch target.
  - Border Radius: Strict `14px` (`var(--r-md)`).
  - Typography: Plus Jakarta Sans (`var(--font-head)`), font-weight 800, tight tracking.
  - Variants:
    - Primary: High-contrast ink background (`#17171b`) with white text or gradient pink/violet.
    - Secondary: Crisp white surface with vibrant pink text (`#ff2e63`) and subtle border.
    - Tertiary / Text: Text-only action with subtle hover underline.
- **Content Cards (`.plan3`, `.ben-card`, `.pain-card`, `.roi-card`, `.founder-card`):**
  - Border Radius: Strict `18px` (`var(--r-lg)`).
  - Background: Crisp white (`#ffffff`) or light warm surface.
  - Borders: Warm sand line (`#ece3d2`, `var(--border)`).
  - Shadows: Soft elevated drop shadows (`0 10px 30px rgba(17,17,20,.08)`).
- **Form Controls (`.dm-box input`, `.dm-box select`, `.dm-box textarea`, `.ct-form input`):**
  - Border Radius: `14px` (`var(--r-md)`).
  - Focus State: Distinctive pink glow accent (`#ff2e63`) with zero corporate blues.
- **Badges & Chips (`.pill`, `.gv-badge`, `.hst-made-badge`):**
  - Border Radius: Full pill `9999px` (`var(--r-full)`).
  - Typography: Plus Jakarta Sans, uppercase tracking, bold weight.

---

## 3. Form Audits & Client-Side Validation

### 3.1 Demo Registration Modal (`#demoModal`)
- **Inputs Audited:**
  1. `dmName`: Text input. Validates non-empty string.
  2. `dmPhone`: 10-digit mobile number input. Formatted and validated through `dmValidatePhone()`. Rejects invalid lengths, non-Indian prefixes, and common testing dummies (e.g. `9999999999`, `1234567890`, sequential or repetitive digits).
  3. `dmShop`: Text input for business name.
  4. `dmAddress`: Text input for business location.
  5. `dmEmail`: Email input. Checked against standard RFC regex if provided.
  6. `dmPrinter`: Select dropdown. Populated dynamically with manufacturer models (Epson, HP, Canon) from `/api/printer-models`.
  7. Turnstile Challenge: Integrated bot-protection widget verified via `/api/security/challenge`.
- **States:**
  - Initial State: Clean input fields with dynamic placeholder translations.
  - Error State: `#dmErr` displayed with explicit error guidance, focusing the offending field.
  - Loading State: Submit button disabled; label changes to "Generating Account…".
  - Success State: Form replaced by `#dmSuccess` credential vault card showing Shop ID, temporary password, 24-hour expiration timer, software download link, and video instructions.

### 3.2 WhatsApp-to-Print Registration Form (`#waForm`)
- **Inputs Audited:**
  1. `waPhone`: Telephone input.
- **Validation:**
  - Strips non-digits; handles optional country code `91`.
  - Enforces 10-digit Indian mobile regex: `/^[6-9]\d{9}$/`.
- **Success State:**
  - Updates `#waMsg` class to `wapp-msg ok`, displays "Opening the setup guide…", and executes window redirect to `/requirements?phone={phone}`.

### 3.3 Business Inquiry (`#inqModal`) & Contact Forms (`#contactPage`)
- **Inputs Audited:**
  - Name, Phone, Email, Message textarea.
- **Validation:**
  - Phone: Strictly 10 digits (`/^\d{10}$/`).
  - Message: Minimum 5 characters length.
- **Action Dispatch:**
  - WhatsApp: Formats URI and redirects to `https://wa.me/918404832414?text={encodedBody}`.
  - Email: Formats URI and launches native mail client via `mailto:legacy-support@gmail.com?subject={subject}&body={body}`.

---

## 4. Responsive Viewport & Visual Regression Verification

Headless Chromium browser testing was conducted across 6 industry-standard device viewports, verifying zero layout degradation, zero horizontal scrolling, and zero script failures:

| Viewport Width | Device Target | Scroll Width | Inner Width | Horizontal Overflow | Canary Behavior | Console Errors | Visual Shot Evidence |
|---|---|---|---|---|---|---|---|
| **380 px** | Compact Mobile | 380 px | 380 px | **None (0 px)** | Stable (No Redirect) | 0 Uncaught | [new-380.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-380.png) |
| **560 px** | Large Mobile | 560 px | 560 px | **None (0 px)** | Stable (No Redirect) | 0 Uncaught | [new-560.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-560.png) |
| **768 px** | Tablet Portrait | 768 px | 768 px | **None (0 px)** | Stable (No Redirect) | 0 Uncaught | [new-768.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-768.png) |
| **1000 px** | Small Laptop / Netbook | 1000 px | 1000 px | **None (0 px)** | Stable (No Redirect) | 0 Uncaught | [new-1000.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-1000.png) |
| **1280 px** | Standard Laptop / Desktop | 1280 px | 1280 px | **None (0 px)** | Stable (No Redirect) | 0 Uncaught | [new-1280.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-1280.png) |
| **1440 px** | High-Res Desktop Monitor | 1440 px | 1440 px | **None (0 px)** | Stable (No Redirect) | 0 Uncaught | [new-1440.png](file:///c:/Users/livem/Downloads/Compressed/QRBD/verification/shots/new-1440.png) |

---

## 5. Frontend Deficiencies & UI Edge Cases

1. **Missing PWA Companion Images in Root:**
   Although [site.webmanifest](file:///c:/Users/livem/Downloads/Compressed/QRBD/site.webmanifest) references `/icon-512.png` and meta tags reference `/og-image.png`, these files exist inside `deploy/bundle/` and `qrbd-Production-Upload/` but are omitted from the root project folder, causing 404s when testing the raw root `index.html` on a static web server.
2. **Missing Service Worker Registration:**
   The webmanifest is configured for PWA installation (`display: standalone`), but no service worker script is registered, meaning offline asset caching and modern PWA installation heuristics are incomplete.
3. **Third-Party Product Color Isolation:**
   The WhatsApp-to-Print container maintains native WhatsApp brand greens (`#25D366` and `#075E54`). While intentionally preserved for consumer brand recognition, this represents an isolated deviation from the primary brand palette.

