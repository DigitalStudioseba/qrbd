# Project Audit: Database Architecture & Data Lifecycle

This report documents all data storage technologies, inferred entity relationships, local browser persistence mechanisms, ephemeral storage pipelines, and end-to-end data lifecycle flows across the QR Se Print system.

---

## 1. Data Storage Architecture Overview

The QR Se Print platform utilizes a hybrid storage architecture balancing high-throughput print queue processing, strict customer data privacy, and minimal client overhead:

1. **Client-Side Storage:** Browser `localStorage` for user language preference persistence.
2. **Ephemeral Document Storage (Print Spool Buffer):** Transient, short-lived storage for customer print jobs with automated garbage collection (120-second time-to-live or immediate deletion upon print spooling).
3. **Persistent Server Database (Backend SaaS):** Relational or document datastore (e.g., PostgreSQL, MongoDB, or MySQL) hosting shop accounts, subscription licenses, review entries, system statistics, and printer hardware catalogs.
4. **Offline Fixture Repository ([deploy/fixtures/](file:///c:/Users/livem/Downloads/Compressed/QRBD/deploy/fixtures)):** Static JSON fixtures snapshotting production database states for isolated testing and development.

---

## 2. Inferred Database Entity Models & Schemas

Based on code analysis of API interactions, JSON-LD schemas, and pre-recorded fixtures, the following entity models govern the platform:

### 2.1 Shop Account Entity (`Shop`)
Represents an enrolled cyber café, xerox shop, or print retail center.
- **`shopId`** (`String`, Primary Key): Unique public shop code (e.g. `QSP-94812`).
- **`shopName`** (`String`): Retail business name.
- **`ownerName`** (`String`): Contact person full name.
- **`phone`** (`String`, Indexed): 10-digit Indian phone number (`9876543210`).
- **`email`** (`String`, Optional): Contact email address.
- **`address`** (`String`): Physical market address and locality.
- **`printerModel`** (`String`): Configured hardware model (e.g. `Epson L3110`).
- **`status`** (`Enum`): `trial`, `active`, `suspended`, `expired`.
- **`planId`** (`String`, Foreign Key): Associated subscription tier (`starter`, `pro`, `premium`, `lifetime`, `monthly`).
- **`trialExpiresAt`** (`Timestamp`): Demo validity timestamp (default 1,440 minutes / 24 hours).
- **`remainingPrints`** (`Integer`): Available print balance for demo accounts (default 10).
- **`createdAt`** (`Timestamp`): Account creation time.

### 2.2 Plan & Pricing Entity (`PricingPlan`)
Governs product tier configurations loaded via `/api/setup-fee/current`.
- **`id`** (`String`, Primary Key): Plan identifier (`starter`, `pro`, `premium`, `monthly`, `lifetime`).
- **`name`** (`String`): User-facing display title.
- **`fee`** (`Integer`): Current selling price in INR.
- **`actualPrice`** (`Integer`): Pre-discount strike-through anchor price.
- **`festivalFee`** (`Integer`, Optional): Active promotional discount fee (`work-67`).
- **`billingCycle`** (`Enum`): `one_time`, `monthly`, `yearly`.
- **`advanceFeaturesUnlocked`** (`Boolean`): Flag indicating whether advanced services (photo print, resume maker) are enabled.
- **`printerLimit`** (`Integer`): Maximum simultaneous printers supported.

### 2.3 Review & Testimonial Entity (`Review`)
Public shop owner testimonials loaded via `/api/reviews`.
- **`id`** (`Integer`, Primary Key): Review identifier.
- **`name`** (`String`): Author name (e.g., `Arun Kumar Sharma`).
- **`stars`** (`Integer`): Rating (1 to 5).
- **`text`** (`String`): Testimonial text (Hindi / Hinglish / English).
- **`city`** (`String`): Geographic origin (`Jharkhand`, `Bihar`, `Uttar Pradesh`).
- **`verified`** (`Boolean`): Verification status flag.

### 2.4 International Country Configuration (`IntlCountry`)
Managed via `/api/intl/config` for overseas customers.
- **`code`** (`String`, Primary Key): ISO 3166-1 alpha-2 country code (`PK`, `NP`, `BD`, `AE`).
- **`name`** (`String`): Country display name.
- **`dialCode`** (`String`): Country calling code (e.g. `92`).
- **`currency`** (`String`): Local currency code (`PKR`, `NPR`, `BDT`, `AED`).
- **`currencySymbol`** (`String`): Currency display symbol (`Rs `, `৳`).
- **`plans`** (`Array<Object>`): Localized tier prices.

---

## 3. End-to-End Data Flows

### 3.1 Demo Provisioning Flow
```
User Enters Info
  ├── Name, Phone, Shop, Printer Model
  └── Client-Side Validation (`dmValidatePhone()`)
          │
          ▼
Cloudflare Turnstile Challenge
  ├── Query `/api/security/challenge`
  └── Obtain Client Challenge Token
          │
          ▼
HTTP POST `/api/demo/request`
  ├── Server Verifies Turnstile Token
  ├── Checks Phone Uniqueness & Bot Rules
  ├── Provisions `Shop` Record in Database
  └── Generates Ephemeral Credentials & Windows Installer Link
          │
          ▼
Client Displays `#dmSuccess` Vault
  ├── Shop ID: `QSP-xxxxx`
  ├── Temporary Password
  ├── 24-Hour Expiration Countdown
  └── Direct Installer Download: `/api/download/easy-installer/{sid}`
```

### 3.2 Ephemeral Print Queue Flow (Customer Walk-In)
```
1. Customer Scans QR Code
   └── Opens `qrseprint.in/shop/{shopId}` on Smartphone Browser
2. Customer Uploads Document
   └── PDF / JPG uploaded via temporary multipart upload
3. Transient Buffer Assignment
   └── Server assigns 120-second Time-To-Live (TTL)
4. Payment Selection
   ├── Option A: Online Checkout (Razorpay / Cashfree)
   └── Option B: "Pay at Counter" (Shop Owner manual acceptance)
5. Local Spool & Wipe
   ├── Shop Windows Desktop Agent polls queue
   ├── Agent downloads file into memory buffer
   ├── Agent dispatches raw ESC/P or GDI commands to printer
   └── Cloud Server executes permanent unrecoverable deletion
```

---

## 4. Client-Side Persistence Details

| Storage Mechanism | Key Name | Data Type | Purpose & Scope |
|---|---|---|---|
| `window.localStorage` | `qsp_lang` | String (`en`, `hin`, `ta`, etc.) | Remembers selected interface language across visits |
| `window.localStorage` | `qsp_ref` (Inferred) | String | Stores affiliate referral attribution code from URL query parameters |
| In-Memory Cache | `QSP_EN_DICT` | Object | Bundled English dictionary mapping Hinglish keys to English values |
| In-Memory Cache | `fetched` | Object (`{ [lang]: boolean }`) | Tracks server-fetched language dictionaries to prevent duplicate network calls |

