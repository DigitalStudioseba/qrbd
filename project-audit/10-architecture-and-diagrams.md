# Project Audit: Architecture Diagrams & Execution Workflows

This document visualizes the complete architectural landscape, startup execution flows, customer journey sequences, translation lifecycles, and verification pipelines across the legacy brand platform.

---

## 1. High-Level System Architecture

```mermaid
flowchart TD
    subgraph ClientLayer["Client Layer (Browser & Walk-In Customers)"]
        CustomerPhone["Walk-in Customer Smartphone<br/>(Scans Shop QR Code)"]
        VisitorBrowser["Prospective Shop Owner Browser<br/>(Visits legacy-domain)"]
    end

    subgraph CDNLayer["Edge & Security Layer (Cloudflare)"]
        CFProxy["Cloudflare CDN & Edge Proxy"]
        CFTurnstile["Cloudflare Turnstile CAPTCHA"]
        CFEmail["Cloudflare Email Obfuscation"]
    end

    subgraph FrontendApp["Frontend Application (Single-Page App)"]
        MainDOM["Main Landing Page (index.html)"]
        I18nEngine["i18n Runtime (i18n.js + i18n-extra.js)"]
        SPARouter["History API Router (/about, /setup-guide)"]
        DemoModal["Demo Generation Modal (#demoModal)"]
    end

    subgraph BackendAPI["Backend Cloud SaaS (legacy-domain/api)"]
        APIServer["REST API Controller"]
        QueueManager["Ephemeral Print Queue (120s TTL)"]
        PaymentCoord["Payment Gateway Coordinator"]
        AuthSystem["Shop Authentication & Demo Issuer"]
    end

    subgraph ExternalGateways["External Payment Gateways"]
        Razorpay["Razorpay Gateway"]
        Cashfree["Cashfree Payments"]
        PayU["PayU"]
        CCAvenue["CCAvenue"]
    end

    subgraph ShopPremises["Cyber Café / Retail Print Shop"]
        ShopPC["Windows Desktop Machine<br/>(legacy brand Agent)"]
        Printer["Local Shop Printer<br/>(Epson, HP, Canon, Brother)"]
    end

    CustomerPhone -->|"1. Scans QR & Uploads PDF"| CFProxy
    VisitorBrowser -->|"2. Requests Homepage"| CFProxy
    CFProxy --> MainDOM
    MainDOM --> I18nEngine
    MainDOM --> SPARouter
    DemoModal -->|"POST /api/demo/request"| CFTurnstile
    CFTurnstile --> APIServer
    APIServer --> QueueManager
    APIServer --> AuthSystem
    APIServer --> PaymentCoord
    PaymentCoord --> Razorpay
    PaymentCoord --> Cashfree
    QueueManager -->|"3. Polls Print Jobs"| ShopPC
    ShopPC -->|"4. USB / LAN RAW Spool"| Printer
```

---

## 2. Client Application Startup & Hydration Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant Canary as Canary Script (Script 0)
    participant DOM as Document Object Model
    participant I18n as i18n Engine (i18n.js)
    participant API as Backend API (/api/*)

    User->>Canary: Loads initial HTML head
    Note over Canary: Check location.hostname against allowlist
    alt Hostname Unauthorized
        Canary-->>User: document.open() -> Render warning -> Redirect to legacy-domain
    else Hostname Authorized
        Canary->>DOM: Allow HTML parser to continue
    end

    DOM->>I18n: Load i18n.js & i18n-extra.js
    I18n->>I18n: Read localStorage.getItem('qsp_lang') || 'en'
    I18n->>DOM: MutationObserver initiates; translates DOM to English
    
    par Asynchronous API Data Hydration
        DOM->>API: GET /api/homepage-config
        API-->>DOM: Support info, logo, feature lists
        DOM->>API: GET /api/setup-fee/current
        API-->>DOM: Current prices, festival discounts (work-67)
        DOM->>API: GET /api/reviews
        API-->>DOM: 11 Testimonial cards
        DOM->>API: GET /api/printer-models
        API-->>DOM: Printer dropdown options
    end

    DOM->>User: Interactive, fully translated paint complete
```

---

## 3. Demo Generation & Desktop Installer Provisioning Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Owner as Shop Owner
    participant Modal as Demo Modal (#demoModal)
    participant Turnstile as Cloudflare Turnstile
    participant Backend as Backend API (/api)
    participant Storage as Shop Database

    Owner->>Modal: Clicks "Free Demo Dekhein" (openDemoModal)
    Modal->>Backend: GET /api/security/challenge
    Backend-->>Modal: { enabled: true, siteKey: "..." }
    Modal->>Turnstile: Render challenge widget
    Turnstile-->>Modal: Challenge token generated

    Owner->>Modal: Enters Name, Mobile Number, Shop Name, Selects Printer
    Note over Modal: Client validation dmValidatePhone() rejects test sequences
    Owner->>Modal: Clicks "Demo Account Banayein" (createDemo)

    Modal->>Backend: POST /api/demo/request
    Note over Backend: Verify Turnstile, Phone uniqueness, Rate limits
    Backend->>Storage: Create Shop record (24hr trial, 10 prints)
    Backend-->>Modal: { success: true, shopId: "QSP-94812", password: "...", installerUrl: "..." }

    Modal->>Owner: Displays #dmSuccess credentials card
    Owner->>Backend: Clicks "Download Software" (/api/download/easy-installer/QSP-94812)
    Backend-->>Owner: Delivers pre-configured Windows installer (.exe)
```

---

## 4. Walk-In Customer Contactless Print Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Walk-in Customer
    participant MobileWeb as Customer Mobile Browser
    participant Cloud as legacy brand Cloud API
    participant Desktop as Shop Desktop Agent
    participant Printer as Physical Printer

    Customer->>MobileWeb: Scans shop counter QR code
    MobileWeb->>Cloud: Loads shop-specific upload page
    Customer->>MobileWeb: Selects PDF / Image files, sets B&W/Color
    MobileWeb->>Cloud: Uploads document to ephemeral queue
    Note over Cloud: Assigns 120-second TTL timer

    alt Customer Pays Online
        Customer->>MobileWeb: Pays via UPI / Card (Razorpay/Cashfree)
        MobileWeb->>Cloud: Payment confirmed webhook
    else Customer Pays at Counter
        Customer->>MobileWeb: Selects "Pay at Counter"
        Cloud->>Desktop: Prompts shop owner to accept order
    end

    Desktop->>Cloud: Polls / downloads ephemeral document payload
    Desktop->>Printer: Sends raw print commands via Windows spooler
    Printer-->>Customer: Document physically printed
    Cloud->>Cloud: Executes permanent unrecoverable file deletion
```

---

## 5. Deployment & Invariance Toolchain

```mermaid
flowchart LR
    LiveT0["Live Production Capture<br/>(live-index-T0.html)"] --> RebasePy["rebase.py<br/>(Replays design.md Tokens)"]
    DesignMD["design.md<br/>(Authoritative Tokens)"] --> RebasePy
    RebasePy --> Candidate["deploy/bundle/index.html<br/>(Rebased Candidate)"]

    Candidate --> InvarianceGate["invariance_gate.py<br/>(12 Non-CSS Rules)"]
    LiveT0 --> InvarianceGate

    subgraph VerificationGate["Verification Gate (Automated Tests)"]
        InvarianceGate -->|"ALL PASS"| StagingServer["staging_server.py<br/>(Port 8082 Replica)"]
        StagingServer --> Playwright["Playwright Chromium<br/>(run-staging.mjs)"]
    end

    Playwright -->|"37 PASS / 0 FAIL"| ProductionZip["qrbd-Production-Upload.zip<br/>(Production Ready)"]
```

