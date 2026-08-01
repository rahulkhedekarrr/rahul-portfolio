# Replybox – AI Email Assistant for Gmail & Outlook

**Portfolio Technical Case Study**  
**Product Version:** 2.3 (Chrome Manifest V3)  
**Primary Surface:** Chrome Side Panel + Content Scripts  
**Domain:** Productivity / AI Email Assistants / Browser Extensions  
**Report Purpose:** Resume, LinkedIn, portfolio case study, technical blog, and interview preparation
**Chrome Web Store Link:** "https://chromewebstore.google.com/detail/icjcmabkdiomnkiphgjopbkkhlfcabgp?utm_source=item-share-cb" 

> **Scope note:** This report analyzes the shipping extension in `public/`. Vue/Vite scaffolding under `src/` is treated as historical scaffolding unless explicitly labeled. Backend repository code is not in this workspace; API contracts are inferred from client calls and privacy documentation. Items marked **\[Assumption\]** are technically reasonable inferences, not verified production metrics.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [My Role](#2-my-role)
3. [Tech Stack](#3-tech-stack)
4. [Architecture](#4-architecture)
5. [Database](#5-database)
6. [APIs](#6-apis)
7. [Features](#7-features)
8. [UI/UX](#8-uiux)
9. [Engineering Challenges](#9-engineering-challenges)
10. [Performance Optimizations](#10-performance-optimizations)
11. [Security](#11-security)
12. [AI Usage](#12-ai-usage)
13. [Third-party Integrations](#13-third-party-integrations)
14. [DevOps](#14-devops)
15. [Metrics](#15-metrics)
16. [Engineering Decisions](#16-engineering-decisions)
17. [Scalability](#17-scalability)
18. [Code Quality](#18-code-quality)
19. [SEO](#19-seo)
20. [Resume Highlights](#20-resume-highlights)
21. [Portfolio Highlights](#21-portfolio-highlights)
22. [Interview Preparation](#22-interview-preparation)
23. [Skills Demonstrated](#23-skills-demonstrated)
24. [Hidden Skills](#24-hidden-skills)
25. [Portfolio Assets](#25-portfolio-assets)
26. [STAR Stories](#26-star-stories)
27. [Business Impact](#27-business-impact)
28. [Future Roadmap](#28-future-roadmap)
29. [Recruiter Summary](#29-recruiter-summary)
30. [Portfolio Content](#30-portfolio-content)

---

## 1. Project Overview

| Field | Detail |
|--------|--------|
| **Project Name** | Replybox – AI Email Assistant for Gmail & Outlook |
| **One-line summary** | A Manifest V3 Chrome side-panel extension that drafts AI replies, summarizes threads, and supports voice-to-text compose across Gmail and Outlook. |
| **Elevator pitch** | Replybox sits beside your inbox and turns long email threads into instant summaries, tone-controlled replies, and editable drafts—without leaving Gmail or Outlook. It is privacy-conscious, least-privilege, and built for real multi-context browser constraints. |
| **Problem it solves** | Knowledge workers waste time reading long threads, drafting routine replies, switching tools for AI, and losing context between compose windows. Existing solutions often require copy-paste into ChatGPT or install invasive mail add-ins. |
| **Why it exists** | Bring AI email assistance *into* the native webmail workflow with a lightweight side panel, in-page summaries, usage metering, and Free/Pro productization. |
| **Industry / domain** | B2B/B2C productivity SaaS · Email · Generative AI · Chrome Extensions |
| **Target users** | Professionals, founders, support/sales teams, and power email users on Gmail and Outlook Web |
| **Business value** | Faster inbox triage, higher reply quality, monetizable AI usage (Free vs Pro limits), measurable paste/generation analytics |
| **Key differentiators** | Dual-provider DOM adapters (Gmail + Outlook); MV3 service-worker API gateway with dedupe; atomic cross-context generation locks; sentiment-aware summaries; speech-to-text compose; Chrome Featured-badge readiness posture |

### Positioning

Replybox is not a full mail client. It is an **AI productivity layer** that:

1. Detects the open email in Gmail/Outlook
2. Generates summary + reply (or compose from a prompt)
3. Lets the user edit in a rich editor and paste back into the native compose box
4. Caches drafts/results locally and meters usage against a server-backed package

---

## 2. My Role

**Rahul Khedekar** Sole (or primary) full-stack owner of the Chrome extension client, product UX, and API integration. Backend API is consumed as a separate Node/Vercel service.

| Area | Ownership |
|------|-----------|
| **Responsibilities** | Product definition, MV3 architecture, Gmail/Outlook integrations, auth, AI feature UX, security hardening, store readiness, monetization gates |
| **Ownership** | End-to-end extension lifecycle: design → implement → harden race conditions → audit → publish readiness |
| **Features built** | Smart reply, email summary + sentiment, compose with tone/length, drafts, templates, STT, calendar remind, inbox analysis UI, Free/Pro gating |
| **Major contributions** | 3-layer API centralization; race-condition elimination (20–25 → 1 coordinated call); HTML sanitization + CSP cleanup; Featured readiness ~94/100 |
| **Frontend ownership** | Full — side panel UI (~8k LOC vanilla JS), CSS design system, Quill editor, speech-to-text popup |
| **Backend ownership** | Client contracts + metering integration; **\[Assumption\]** companion API on Vercel for generation/login/counts |
| **Database design** | Client-side schemas in `chrome.storage`; **\[Assumption\]** server user/package/usage tables behind `/api/v1` |
| **DevOps** | Firebase Hosting for login surface; Vercel for API; extension packaging from `public/` |
| **Deployment** | Chrome Web Store packaging; Firebase `ai--extension`; API `ai-gmail-extension.vercel.app` |
| **UI/UX** | Side panel modes (Reply/Compose/Draft), loading/empty/error states, upgrade CTAs, a11y labels |
| **AI integration** | Prompted generation via backend (`generate-reply-v2`, `generate-compose`); Web Speech API for STT |
| **Third-party integrations** | Google OAuth (`chrome.identity`), Firebase Auth bridge, Google Calendar, Gmail/Outlook DOM |

---

## 3. Tech Stack

### Frontend

| Technology | Usage |
|------------|--------|
| Vanilla JavaScript (ES modules + classic scripts) | Production UI & content scripts |
| HTML / CSS | Side panel, STT popup |
| Quill.js | Rich text editing of AI output |
| Tailwind CSS (bundled `tailwind.min.css`) | Utility styling in side panel |
| Instrument Sans + Material Icons | Typography / iconography |
| Vue 3 + Vite | Scaffold / historical prototype only (`src/`) |

### Backend

| Technology | Usage |
|------------|--------|
| HTTPS REST API on Vercel | `https://ai-gmail-extension.vercel.app/api/v1` |
| **\[Assumption\]** Node.js serverless functions | Generation, login, metering endpoints |

### Database

| Layer | Technology |
|-------|------------|
| Client | `chrome.storage.local` / `chrome.storage.session` |
| Server | **\[Assumption\]** Managed DB (e.g. MongoDB/Postgres) behind Vercel API — not in this repo |

### Authentication

| Technology | Usage |
|------------|--------|
| `chrome.identity` + Google OAuth | Primary extension sign-in |
| Firebase Auth (hosted login page) | Alternate login bridge via content script |
| Google UserInfo API | Profile hydration |

### Storage

| Store | Data |
|-------|------|
| `chrome.storage.local` | Auth, package limits, drafts, caches, generation flags |
| `chrome.storage.session` | Background dedupe locks (SW only) |

### Hosting / Cloud

| Service | Purpose |
|---------|---------|
| Chrome Web Store | Extension distribution |
| Firebase Hosting (`ai--extension`) | Login / hosting surface |
| Vercel | Backend API + marketing/pricing surfaces |
| `replybox.app` | Marketing site |

### Styling

- Custom CSS (`sidepanel.css`, `speech-to-text.css`, Quill overrides)
- Tailwind utilities (side panel)
- Brand cyan/teal system (`rbx-*` patterns)

### State Management

- Event-driven globals in side panel
- `chrome.storage` as shared cross-context store
- Message-passing hub via service worker
- In-memory maps in content scripts (current email, processed IDs)

### Animation

- CSS transitions/keyframes for loading, mode switcher, toasts
- No heavy animation library

### Testing

| Tool | Role |
|------|------|
| Node + jsdom | Popup/sidepanel smoke test |
| pa11y (WCAG2AA) | Accessibility gate on `sidepanel.html` |
| axe-core | Dependency present; primary gate is pa11y |
| Manual QA matrix | Documented in `TESTING_GUIDE.md` |

### Monitoring

- Usage metering endpoints (generate/paste counts)
- Chrome notifications for task results/errors
- **\[Assumption\]** Vercel function logs for API errors

### Security

- MV3 CSP (`script-src 'self'`)
- Custom HTML sanitizer (`utils/sanitize.js`)
- Least-privilege host permissions
- HTTPS-only API

### Payments

- Upgrade CTAs → pricing page (`replybox-five.vercel.app/pricing`)
- **\[Assumption\]** Payment provider lives on marketing/backend, not inside extension

### Messaging

- `chrome.runtime.sendMessage` / `onMessage`
- `postMessage` for STT popup → side panel
- Service worker as orchestration hub

### Caching

- `auto_generated_replies` per email ID
- `categorized_emails_cache` for inbox analysis
- Draft cache with Free/Pro limits (5 / 20)

### Search

- N/A in extension (inbox analysis categorization is API-driven)

### AI APIs

| Path | Detail |
|------|--------|
| Production | Backend `/user/generate-reply-v2`, `/user/generate-compose`, `/email-analysis/analyze` |
| Client STT | Web Speech API (browser) |
| Historical | Direct OpenAI/Cohere experiments in `src/` — **not shipping** |

### Developer / Build Tools

| Tool | Role |
|------|------|
| Vite 6 | Dev/build for Vue scaffold |
| npm | Package manager |
| Chrome Extension APIs | Runtime platform |
| Quill asset download scripts | Local vendor assets |

### Version Control / CI/CD

| Tool | Role |
|------|------|
| Git | Source control |
| **\[Assumption\]** Manual or light CI via `npm test` | Smoke + a11y |
| Firebase deploy / Vercel deploy | Hosting pipelines |

### Environment Management

| Mechanism | Detail |
|-----------|--------|
| `Mode = "production" \| "development"` in service clients | Switches API base URL |
| Dev API | `http://localhost:8000/api/v1` |
| Prod API | `https://ai-gmail-extension.vercel.app/api/v1` |

---

## 4. Architecture

### Overall Architecture

Replybox uses a **three-layer Manifest V3 architecture**:

```
+---------------------------------------------------------+
|  PRESENTATION LAYER                                     |
|  sidepanel.js / contentScript.js / outlookContentScript |
|  speech-to-text / authentication bridge                 |
+---------------------------+-----------------------------+
                            |
                            v chrome.runtime messages
+---------------------------------------------------------+
|  ORCHESTRATION LAYER (background.js)                    |
|  Auth / API gateway / dedupe / usage counts / calendar  |
+---------------------------+-----------------------------+
                            |
                            v ApiService
+---------------------------------------------------------+
|  NETWORK LAYER (service-module.js / service.js)         |
|  fetch / timeout / retry+backoff / error normalization  |
+---------------------------+-----------------------------+
                            |
                            v
                   Vercel Backend API
```

### Frontend Architecture

- **Primary UI:** Side Panel (`sidepanel.html` + `sidepanel.js`), not a popup-first design
- **Provider adapters:** Gmail and Outlook content scripts share a messaging contract but diverge on DOM selectors and email ID extraction
- **Editor:** Quill with local polyfills/patches (MutationObserver instead of deprecated DOM mutation events)
- **Voice:** Separate web-accessible popup for speech-to-text

### Backend Architecture

**\[Assumption — client-observed contract\]**

- Versioned REST under `/api/v1`
- User-scoped generation + metering
- Package/plan fields returned from login (`reply_limit`, `compose_limit`, counts, expiry, `is_active`)

### Folder Structure (shipping-relevant)

```
chrome-ext/
├── public/                      # Shipping extension package
│   ├── manifest.json
│   ├── background.js            # Service worker (ES module)
│   ├── sidepanel.{html,js,css}
│   ├── contentScript.js         # Gmail
│   ├── outlookContentScript.js  # Outlook
│   ├── service.js               # Classic ApiService for CS/sidepanel
│   ├── service-module.js        # ESM ApiService for SW
│   ├── authentication.js
│   ├── login-content-script.js
│   ├── speech-to-text.*
│   ├── utils/sanitize.js
│   ├── quill/
│   └── _locales/en/
├── src/                         # Vue scaffold / historical
├── tests/                       # Smoke + a11y
├── audit/                       # Store / Featured readiness
├── docs/                        # Featured checklist
├── firebase.json
└── package.json
```

### Component Architecture (conceptual)

| Module | Responsibility |
|--------|----------------|
| Side panel shell | Auth UI, mode switcher, limits, settings |
| Reply module | Auto-generate, summary card, paste |
| Compose module | Prompt, tone/length, templates, STT |
| Draft module | List/reopen/save drafts |
| Gmail adapter | Hash URL IDs, summary injection, reply buttons |
| Outlook adapter | Path/query IDs, Reading Pane selectors |
| API gateway | Dedupe + route + count updates |
| Sanitizer | Safe HTML for AI content |

### API Architecture

All generation traffic is intended to flow:

`UI/CS → makeApiRequest → background routeToApiService → ApiService.fetch → backend`

Residual direct fetches (inbox analysis, some paste counts) are noted as incomplete centralization.

### Authentication Flow

```
User clicks Sign in
        │
        ├─ Path A: chrome.identity.launchWebAuthFlow (Google)
        │     → access_token → Google userinfo
        │     → chrome.storage.local (auth_token, user_info)
        │     → broadcast auth_state_changed
        │
        └─ Path B: Open Firebase login page
              → FIREBASE_AUTH_SUCCESS postMessage
              → login-content-script → background
              → storage + /user/auth + /user/login
              → close login tab
```

### Authorization

- Feature gates by `user_package` (Free vs Paid)
- Free users blocked from generation / STT before network where possible
- Inactive users (`is_active === false`) force logout

### State Management

Cross-context coordination via storage keys:

| Key | Purpose |
|-----|---------|
| `auth_token`, `user_info`, `is_authenticated` | Auth |
| `user_package` | Plan + usage |
| `auto_generated_replies` | Per-email AI cache |
| `email_generation_flags` | Atomic generation claims |
| `email_drafts` | Draft persistence |
| `pasted_replies` | Paste tracking |
| `categorized_emails_cache` | Inbox analysis |

### Request Lifecycle (generate reply)

1. Content script or side panel detects email open
2. Atomic claim on `email_generation_flags` (check-and-set in one storage callback)
3. Losers poll cache; winner sends `makeApiRequest`
4. Background checks session dedupe TTL (30s)
5. Network layer fetch with 20s timeout + retries
6. On success: update counts, write `auto_generated_replies`, clear locks
7. Insert summary in DOM + update side panel / Quill

### Error Handling

- Normalized API errors from `ApiService`
- Toasts / notifications for user-visible failures
- AbortController timeouts
- Retry on `429/5xx` and transient network errors with exponential backoff + jitter
- Stale-result guards (`currentEmailId === emailId` before DOM insert)

### Caching Strategy

- Per-email generation cache avoids re-calling AI when revisiting
- Session dedupe prevents storms within 30 seconds
- Draft cache preserves unpasted work across email switches

### Performance Optimization (architecture level)

- Event-driven UI (no busy loops)
- Quill deferred / on-demand
- Free-user short-circuit (no AI spend)
- Smart summary DOM update (reuse node when same email)

### Deployment Architecture

```
Chrome Web Store (extension zip from public/)
        │
        ├─ Firebase Hosting: login.html bridge
        ├─ Vercel: AI + metering API
        └─ Marketing: replybox.app / pricing
```

### Scalability Considerations

- Client-side dedupe reduces token burn under concurrent listeners
- Server metering is the true scale boundary (**\[Assumption\]**)
- Content script isolation requires storage-based coordination, not shared memory

### Future Improvements

- Split `sidepanel.js` monolith into modules
- Complete API gateway coverage for analyze/paste
- Stronger typed contracts (TS)
- Purge Tailwind / reduce CSS payload
- Full i18n of in-panel strings

---

## 5. Database

### Client “Collections” (`chrome.storage.local`)

| Collection / Key | Shape (conceptual) | Purpose |
|------------------|--------------------|---------|
| `user_info` | `{ name, email, image, _id, ... }` | Profile |
| `user_package` | `{ package, reply_limit, compose_limit, counts, expiry, is_active }` | Entitlements |
| `auto_generated_replies` | `{ [emailId]: { content, summary, sentiment, ... } }` | AI cache |
| `email_generation_flags` | `{ [emailId]: { timestamp, source, status } }` | Distributed lock |
| `email_drafts` | JSON string / map of drafts | Draft store |
| `pasted_replies` | `{ [emailId]: boolean/meta }` | Paste status |
| `custom_templates` | User templates | Compose templates |
| `categorized_emails_cache` | Analysis results | Inbox categories |

### Server Database (**\[Assumption\]**)

| Entity | Likely fields |
|--------|---------------|
| User | email, name, image, oauth ids, active flag |
| Package / Subscription | plan, limits, expiry |
| UsageCounter | reply/compose/paste counts |
| GenerationLog | optional analytics |

### Relationships (logical)

```
User 1──1 Package
User 1──* Usage events (generate/paste)
EmailId (client-only) 1──0..1 CachedGeneration
```

### Indexes (**\[Assumption\] server**)

- Unique index on `user.email`
- Index on usage `userId + date` for rate/limits

### Schema Design Notes

- **Client denormalization by design:** cache AI payloads keyed by email ID for instant revisit UX
- **Normalization on server:** user vs package vs counters (assumed)
- **Validation:** compose requires tone + length; email ID validation especially on Outlook compose windows
- **Security:** tokens in local storage (extension-isolated); no cookies scraped from mail hosts

### CRUD Operations (client)

| Operation | Example |
|-----------|---------|
| Create/Update | Save draft, set generation flag, cache reply |
| Read | Load package, load cached reply, list drafts |
| Delete/Cleanup | Clear locks, FIFO drop oldest drafts over limit |

---

## 6. APIs

**Base (prod):** `https://ai-gmail-extension.vercel.app/api/v1`  
**Auth for app APIs:** User identity/email (and token fields as required by backend) via logged-in profile — not cookie session to Gmail.

### Endpoint Catalog

| Endpoint | Method | Purpose | Auth | Notes |
|----------|--------|---------|------|-------|
| `/user/generate-reply-v2` | POST | Reply + summary + sentiment | Logged-in user | Primary reply path |
| `/user/generate-compose` | POST | Compose from prompt/tone/length | Logged-in user | Validated client-side first |
| `/user/login` | POST | Sync plan/limits | User email | Debounced in side panel |
| `/user/auth` | POST | Register/sync profile | Token + profile | Bridge after Firebase login |
| `/user/generate-reply-count` | POST | Increment reply gens | User | Auto after success |
| `/user/generate-mail-count` | POST | Increment compose gens | User | Auto after success |
| `/user/paste-reply-count` | POST | Metric on paste reply | User | Also called from UI |
| `/user/paste-mail-count` | POST | Metric on paste compose | User | Also called from UI |
| `/email-analysis/analyze` | POST | Inbox categorization | User | Still direct-fetch in places |

### External Google APIs

| Endpoint | Purpose |
|----------|---------|
| `https://www.googleapis.com/oauth2/v2/userinfo` | Profile |
| Google Calendar v3 / render URL | Remind / create event |

### Validation

- Compose: tone + length required before request
- Outlook: reject invalid/missing item IDs (compose windows)
- Free package: skip generation calls

### Response Format (**\[Assumption\] observed usage**)

Success payloads typically include generated HTML/text, optional `summary`, `sentiment`, `sentimentEmoji`, and package/count fields on login.

### Error Handling

- HTTP status mapping
- Retryable vs fatal
- User-facing toast/upgrade prompts

### Rate Limiting

- Client: 30s generation dedupe TTL; login debounce (~30s) + interval (~60s)
- Server: **\[Assumption\]** plan limits enforced via package counts

### Pagination

- Not used for generation APIs
- Draft list is local, capped by plan

### Caching

- Client cache of generations per `emailId`
- Background duplicate response may return `isDuplicate: true`

---

## 7. Features

### 7.1 AI Smart Reply

| | |
|--|--|
| **Purpose** | Draft a contextual reply for the open email |
| **Implementation** | Extract body/metadata → `generate-reply-v2` via gateway → Quill edit → paste into native reply |
| **Challenges** | Dual triggers (CS + sidepanel); DOM fragility; stale inserts |
| **Interesting logic** | Atomic claim + session dedupe + cache poll for losers |
| **Why it matters** | Core value prop and primary AI spend path |

### 7.2 Email Summary + Sentiment

| | |
|--|--|
| **Purpose** | Triage long threads quickly |
| **Implementation** | Same v2 response; inject `#replybox-email-summary` into Gmail/Outlook; show card in side panel |
| **Challenges** | Wrong arg arity on Outlook insert; compose-window false positives |
| **Interesting logic** | Smart DOM update: reuse node if same emailId, replace if different |
| **Why it matters** | Instant perceived value before the user even opens the panel |

### 7.3 Compose with Tone & Length

| | |
|--|--|
| **Purpose** | Write new emails from a short prompt |
| **Implementation** | Prompt + required tone/length → `generate-compose` |
| **Challenges** | Users skipping controls → weak outputs |
| **Interesting logic** | Hard validation before network |
| **Why it matters** | Moves product beyond “reply bot” into outbound writing |

### 7.4 Speech-to-Text Compose

| | |
|--|--|
| **Purpose** | Dictate compose prompts |
| **Implementation** | Web Speech API popup; Pro-gated; returns text via messaging |
| **Challenges** | Browser support; permission UX; Free vs Pro |
| **Interesting logic** | Continuous + interim results; lock overlay for Free |
| **Why it matters** | Differentiator for mobile-adjacent / accessibility workflows |

### 7.5 Draft Saving

| | |
|--|--|
| **Purpose** | Don’t lose unpasted AI work when switching emails/modes |
| **Implementation** | Auto-save on email change / mode switch / reset; FIFO limits |
| **Challenges** | Avoid saving empty/template noise; paste tracking |
| **Interesting logic** | Skip if already pasted; Free 5 / Paid 20 |
| **Why it matters** | Trust and retention |

### 7.6 Email Templates

| | |
|--|--|
| **Purpose** | Fast starts without AI spend |
| **Implementation** | `email-templates.json` + custom templates in storage |
| **Templates** | Job Application, Meeting Request, Thank You, Business Proposal, Professional Introduction, Customer Support |
| **Why it matters** | Offline-ish utility + Free-tier value |

### 7.7 Subject Extraction

| | |
|--|--|
| **Purpose** | Fill subject when AI output includes `Subject:` |
| **Implementation** | Regex parse on paste path |
| **Why it matters** | Reduces manual cleanup after generation |

### 7.8 Inbox Email Analysis (Gmail)

| | |
|--|--|
| **Purpose** | Categorize inbox emails |
| **Implementation** | Scrape list → `/email-analysis/analyze` → cache |
| **Why it matters** | Broader productivity beyond single-thread reply |

### 7.9 Calendar Remind

| | |
|--|--|
| **Purpose** | Turn email intent into a reminder/event |
| **Implementation** | Google Calendar API + OAuth scope expansion |
| **Why it matters** | Closes the loop from “read email” to “schedule action” |

### 7.10 Free vs Pro Monetization UX

| | |
|--|--|
| **Purpose** | Convert usage into paid plans without burning tokens |
| **Implementation** | Package sync via login; gates before generate/STT; upgrade CTAs |
| **Why it matters** | Business model alignment with AI cost structure |

### 7.11 Dual Provider Support

| | |
|--|--|
| **Purpose** | One product for Gmail and Outlook Web |
| **Implementation** | Shared messaging contract + provider-specific adapters |
| **Why it matters** | Expands addressable market materially |

---

## 8. UI/UX

### Design System

- Brand: **Replybox**
- Visual language: cyan/teal accents, Instrument Sans, Material Icons
- Modes: Reply / Compose / Draft with explicit active-state styling
- Components: summary card, result panel, settings modal, toasts, upgrade banners

### Responsive Behavior

- Side panel width constrained by Chrome; layout optimized for narrow vertical UI
- Speech-to-text as focused popup surface

### Accessibility

- pa11y WCAG2AA gate on `sidepanel.html` (0 errors in audit narrative)
- `aria-label`s on icon-only controls (settings, mic, close, regenerate)
- Keyboard support for profile/settings toggle (Enter/Space)
- `aria-live="polite"` on panel container
- Featured readiness notes remaining i18n gaps

### Animations

- Loading indicators for summary/generation
- Mode switcher transitions
- Toast feedback

### Loading / Error / Empty States

| State | UX |
|-------|----|
| No email selected | Clear CTA to open an email |
| Generating | Summary/loading copy |
| Upgrade required | Modal/CTA without useless API calls |
| Auth required | Login screen |
| Editor fallback | Non-Quill textarea path if Quill fails |

### User Flows

1. **Reply:** Open email → auto summary/reply → edit → paste  
2. **Compose:** Prompt (+ STT) → tone/length → generate → paste  
3. **Draft:** Reopen saved work → edit → paste  
4. **Upgrade:** Hit limit → pricing tab  

### Navigation

- Mode switcher is primary IA
- Settings modal for account/links
- Content-script buttons open/focus side panel

### UI Performance

- Avoid full re-render storms via smart summary updates
- Quill recreate only when needed (duplicate-content fix)

---

## 9. Engineering Challenges

### Challenge A — Duplicate API Storm (20–25 calls per email)

| | |
|--|--|
| **Problem** | Opening one email fired dozens of `generate-reply-v2` calls |
| **Why difficult** | Isolated worlds (CS, sidepanel, SW); no shared memory; many listeners; session storage unavailable in content scripts |
| **Options** | Debounce only · server idempotency · single owner context · distributed locks |
| **Chosen** | Layered: package gate + atomic local claim + SW session dedupe + route-all-through-gateway |
| **Tradeoffs** | More storage coordination complexity; 30s TTL can delay intentional regen |
| **Lesson** | In extensions, **coordination is a distributed systems problem** |

### Challenge B — TOCTOU on Generation Flags

| | |
|--|--|
| **Problem** | Check-then-set allowed two winners |
| **Chosen** | Atomic check-and-set inside one `storage.local.get` callback |
| **Lesson** | Treat storage callbacks as critical sections |

### Challenge C — Outlook Summary Showing Sentiment as Body

| | |
|--|--|
| **Problem** | Argument shift in `insertEmailSummary` |
| **Chosen** | Align function arity/signature with Gmail path; validate email IDs |
| **Lesson** | Shared function names ≠ shared contracts unless typed/tested |

### Challenge D — Quill Duplicate Content

| | |
|--|--|
| **Problem** | Stale editor HTML reused across generations |
| **Chosen** | Controlled destroy/recreate + `safeSetHTML` discipline |
| **Lesson** | Rich editors are stateful; treat resets as first-class |

### Challenge E — MV3 Module vs Classic Script Split

| | |
|--|--|
| **Problem** | SW wants ESM; content scripts need classic scripts |
| **Chosen** | Dual clients: `service-module.js` + `service.js` |
| **Tradeoffs** | Duplication risk vs platform constraints |
| **Lesson** | Abstract the network edge; accept dual adapters at the boundary |

### Challenge F — Store / Featured Compliance

| | |
|--|--|
| **Problem** | Inline styles/scripts, a11y, privacy disclosure |
| **Chosen** | Move styles to CSS; sanitize HTML; privacy endpoints doc; pa11y |
| **Result** | Featured readiness ~93–94/100 in audits |

---

## 10. Performance Optimizations

| Area | Technique | Status |
|------|-----------|--------|
| Lazy loading | Quill deferred; assets local | Yes |
| SSR / SSG / ISR | N/A (extension UI) | N/A |
| CSR | Side panel fully client-rendered | Yes |
| Memoization | Per-email generation cache | Yes |
| Caching | Local AI results + analysis cache | Yes |
| Image optimization | Small icon assets (`plane.png`) | Basic |
| Bundle optimization | Shipping vanilla `public/` (not Vue bundle) | Intentional |
| CSS payload | Tailwind min file large/unpurged | **Improvement needed** |
| Database | Local key-value; server assumed indexed | Partial |
| API | Dedupe, retries, Free short-circuit | Strong |
| Network | 20s timeout, backoff + jitter | Yes |
| Rendering | Smart summary DOM updates; avoid flicker | Yes |
| Measured win | **~60–75% fewer API calls** after centralization | Documented |

---

## 11. Security

| Control | Implementation |
|---------|----------------|
| Authentication | Google OAuth via `chrome.identity` + Firebase login bridge |
| Authorization | Package-based feature gates; inactive user logout |
| JWT / tokens | OAuth access token in `chrome.storage.local` |
| Cookies | No mail-host cookie scraping detected |
| Input validation | Tone/length; email ID checks; Free gates |
| XSS protection | `sanitize.js` allowlist; strip `on*`, `javascript:`, risky URLs |
| CSRF | Less relevant (extension + bearer/token APIs); still HTTPS-only |
| Rate limiting | Client dedupe + plan limits |
| Password hashing | N/A (OAuth) |
| Secrets | No private API keys in shipping path; Firebase web config is public-by-design |
| Environment | Prod/dev API base toggle |
| API security | CSP `connect-src` limited; host permissions to Gmail/Outlook only |
| CSP | `script-src 'self'`; no remote script execution |
| Privacy | `PRIVACY.md` discloses endpoints, permissions, data practices |

---

## 12. AI Usage

| Topic | Detail |
|-------|--------|
| **Prompt engineering** | Client sends email body / compose prompt + tone/length; **\[Assumption\]** final system prompts live on backend |
| **Model selection** | **\[Assumption\]** Server-selected LLM; extension does not bind to a single client-side model |
| **Streaming** | Not used in current client (request/response) |
| **Context** | Current email body + metadata (subject/sender/recipient) |
| **Embeddings / RAG** | Not evident in client; **\[Assumption\]** none or server-only |
| **Function calling** | Not in client |
| **Image generation** | N/A |
| **STT** | Browser Web Speech API (not cloud STT in extension) |
| **AI architecture** | Thin client → metered generation API → editable HTML → paste into host compose |
| **Safety** | Sanitize model HTML before DOM/editor insert |

---

## 13. Third-party Integrations

| Integration | Purpose | Implementation | Challenges | Limitations |
|-------------|---------|----------------|------------|-------------|
| Gmail Web | Detect email, inject summary, paste reply | Content script + DOM observers | Fragile DOM, hash routing | Breaks if Gmail markup changes |
| Outlook Web | Same product on Outlook | Separate content script | Different ID schemes, Reading Pane | Compose windows lack item IDs |
| Google OAuth | Sign-in | `chrome.identity` | Scope expansion for Calendar | Token storage model |
| Firebase Auth page | Alternate login UX | Hosted page + CS bridge | Cross-context messaging | `login.html` may be hosted outside repo snapshot |
| Google Calendar | Reminders | Calendar API / render URL | Extra OAuth scopes | Optional path |
| Vercel API | AI + metering | REST | Cost control, latency | Backend opacity from this repo |
| Quill | Rich editing | Local vendor assets | Deprecated mutation events | Needed polyfill/patch |
| Chrome Side Panel API | Primary UI | `side_panel` + `sidePanel` permission | Panel lifecycle vs CS | Chrome-only |
| Web Speech API | Dictation | STT popup | Browser support variance | Pro-gated product-wise |

---

## 14. DevOps

| Area | Practice |
|------|----------|
| Deployment (extension) | Package `public/` → Chrome Web Store |
| Hosting (login) | Firebase Hosting (`firebase.json`), no-cache on `login.html` |
| Hosting (API) | Vercel project `ai-gmail-extension` |
| CI/CD | `npm test` (smoke + pa11y); **\[Assumption\]** deploy hooks on Firebase/Vercel |
| Monitoring | Usage counters; **\[Assumption\]** platform logs |
| Logging | Client logger utility; SW console during development |
| Backups | **\[Assumption\]** server DB backups; client drafts local-only |
| Scaling | Stateless serverless API + client dedupe |
| Environments | Local API (`localhost:8000`) vs production base URL |

---

## 15. Metrics

> Unverified production analytics are labeled **\[Estimate\]** / **\[Assumption\]**. Documented engineering metrics are unmarked.

| Metric | Value | Confidence |
|--------|-------|------------|
| Duplicate generate calls before fix | 20–25 per email open | Documented |
| API call reduction after gateway | ~60–75% | Documented |
| Featured readiness score | 93–94 / 100 | Documented (audit) |
| Side panel JS size | ~8k LOC / ~315 KB source | Measured in repo |
| Vite build sidepanel gzip (audit note) | ~27 KB JS gzipped (historical build note) | Audit |
| pa11y WCAG2AA errors on shell | 0 | Audit |
| Active users | **\[Estimate\]** early-stage / hundreds unless store dashboards say otherwise | Unknown |
| Requests/day | **\[Estimate\]** function of DAU × emails opened; dedupe critical to cost | Unknown |
| DB size | **\[Assumption\]** small-medium user + usage tables | Unknown |
| Side panel interactive load | **\[Estimate\]** < 1–2s on typical hardware after assets cached | Assumption |
| API response (generation) | **\[Estimate\]** 2–8s depending on model/latency | Assumption |
| Lighthouse / SEO | N/A for extension panel; marketing site separate | N/A |

---

## 16. Engineering Decisions

| Decision | Why | Tradeoff |
|----------|-----|----------|
| **Side Panel over Popup** | Persistent workspace while reading mail | More complex lifecycle |
| **Vanilla JS over Vue for shipping UI** | CSP/control, content-script realities, less framework tax in MV3 UI | Lost component model; monolith risk |
| **Keep Vue/Vite in repo** | Historical scaffold / future options | Confusion for new contributors |
| **Service Worker API gateway** | Single orchestration point for dedupe + metering | SW ephemerality; must persist locks |
| **Dual ApiService files** | ESM SW + classic CS compatibility | Duplication |
| **chrome.storage locks** | Only practical cross-context mutex | Not truly transactional; needs atomic patterns |
| **Backend LLM (not client OpenAI keys)** | Hide keys, centralize prompts/billing | Latency + backend dependency |
| **Gmail + Outlook adapters** | Market coverage | 2× DOM maintenance |
| **Quill** | Familiar rich text UX | Patch/polyfill maintenance |
| **Free gate before network** | Cost control + UX honesty | More branching logic |
| **Featured/CSP hardening** | Store trust + distribution | Upfront audit work |

### Clarifying “Why not Next.js / MongoDB / Express in the extension?”

Those are **backend/marketing stack choices**, not extension UI choices. The shipping client is a Chrome MV3 app. **\[Assumption\]** Express/Node-style handlers and a document/SQL store may power the Vercel API, but they are not required inside the extension package.

---

## 17. Scalability

| Users | Feasibility | What changes |
|-------|-------------|--------------|
| **100** | Comfortable | Current architecture fine |
| **1,000** | Fine with dedupe + plan limits | Watch AI spend; basic monitoring |
| **10,000** | Needs stronger backend ops | Queues for generation, rate limits, CDN for marketing, error tracking (Sentry) |
| **100,000** | Architectural upgrades | Redis locks/caches, async jobs, multi-region API, provider DOM resilience tests, support tooling |
| **1M** | Major platform shift | Possibly native add-ins, enterprise SSO, dedicated inference infra, strict SLOs, anomaly detection on usage |

**Client-side scale insight:** The expensive failure mode is not “too many users” alone — it is **amplification** (listeners × tabs × providers). The gateway/dedupe work is what makes growth economically viable.

---

## 18. Code Quality

| Aspect | Assessment |
|--------|------------|
| Folder organization | Clear `public/` shipping boundary; docs-heavy root |
| Reusable components | Functional modules inside large files; limited formal component system |
| Custom hooks | N/A (not React); reusable helpers instead |
| Utilities | `sanitize.js`, logger, ApiService |
| Constants | Endpoint maps, tone/length enums, storage keys |
| Clean architecture | Strong *runtime* layering (presentation/orchestration/network); weaker *file* modularity |
| Naming | Product-consistent (`Replybox`, `makeApiRequest`, `email_generation_flags`) |
| Documentation | Excellent engineering diaries (`*_COMPLETE.md`, audits) |
| Tests | Thin automated; strong manual/testing guides |
| Biggest quality risk | `sidepanel.js` monolith (~8k LOC) |

---

## 19. SEO

| Item | Status |
|------|--------|
| Extension panel SEO | N/A (not crawlable UI) |
| Chrome Web Store listing | Primary discovery surface (name/description/screenshots) |
| Marketing site (`replybox.app`) | Separate SEO concern |
| Meta / Open Graph / sitemap | Belong to marketing site, not MV3 package |
| Performance SEO | N/A for panel; store conversion depends on screenshots + privacy clarity |

**Portfolio note:** For SEO case studies, pair this project with the marketing site work; the extension itself demonstrates **store ASO** more than classic SEO.

---

## 20. Resume Highlights

### 10 Resume Bullets

1. Built **Replybox**, a Manifest V3 Chrome Side Panel AI assistant for **Gmail and Outlook**, shipping smart replies, summaries, and voice-assisted compose.
2. Designed a **3-layer API gateway** (presentation → service worker orchestration → network) with timeout, retry, and automatic usage metering.
3. Eliminated a **20–25× duplicate AI request storm** using atomic `chrome.storage` check-and-set locks and session TTL dedupe, cutting API calls by **~60–75%**.
4. Implemented **dual provider DOM adapters** with a shared messaging contract across divergent email ID and Reading Pane models.
5. Integrated **Google OAuth** (`chrome.identity`) and a **Firebase-hosted login bridge**, syncing entitlements via login/package APIs.
6. Delivered **Free vs Pro monetization gates** that block AI spend for ineligible users while preserving upgrade UX.
7. Hardened XSS posture with a **custom HTML sanitizer** and CSP forbidding remote scripts; audited to Featured readiness **~94/100**.
8. Built rich-edit workflows with **Quill** (polyfilled for Chromium/MV3), draft auto-save, templates, and subject extraction on paste.
9. Added **speech-to-text compose** via Web Speech API with Pro entitlement locking.
10. Established accessibility and store readiness with **pa11y WCAG2AA** checks, privacy disclosures, and least-privilege host permissions.

### 10 LinkedIn Bullets

1. Shipped a production AI email assistant used inside Gmail & Outlook Web.
2. Owned end-to-end Chrome MV3 architecture: side panel, content scripts, service worker.
3. Turned a costly race condition into a measured 60–75% API reduction.
4. Built cross-context distributed locking without a shared server mutex.
5. Productized AI with usage limits, paste analytics, and upgrade funnels.
6. Balanced UX speed (in-page summaries) with security (sanitization + CSP).
7. Supported two major email platforms with adapter-based design.
8. Bridged OAuth identity flows across extension and hosted login pages.
9. Prepared the product for Chrome Featured-level compliance scrutiny.
10. Documented engineering decisions as implementable runbooks (phases, fixes, tests).

### 10 ATS-Friendly Achievements

1. Developed Manifest V3 Chrome extension with Side Panel API and service worker.
2. Implemented REST API integration with retry, timeout, and exponential backoff.
3. Reduced duplicate AI API requests by 60-75 percent through request deduplication.
4. Integrated Gmail and Outlook content scripts for DOM automation and data extraction.
5. Implemented Google OAuth authentication using Chrome Identity API.
6. Built rich text editing workflow with Quill and HTML sanitization.
7. Implemented client-side caching and draft persistence with Chrome Storage API.
8. Enforced Free and Pro feature entitlement checks before network calls.
9. Improved accessibility with ARIA labels and automated pa11y WCAG testing.
10. Published privacy policy and security controls aligned with Chrome Web Store requirements.

---

## 21. Portfolio Highlights

### Project Description
Replybox is an AI-powered Chrome extension that helps professionals summarize emails, generate tone-controlled replies, and compose new messages inside Gmail and Outlook—without copy-pasting into external chat tools.

### Technical Summary
MV3 side-panel app with dual content-script adapters, a service-worker API gateway, atomic cross-context generation locks, Quill editing, Web Speech STT, and OAuth/Firebase auth—backed by a Vercel generation/metering API.

### Business Summary
Replybox monetizes AI email productivity with Free/Pro limits, upgrade CTAs, and usage analytics (generate/paste counts), while controlling inference cost through client-side short-circuits and dedupe.

### Architecture Summary
Presentation (side panel + provider scripts) → Orchestration (background dedupe, auth, counts) → Network (ApiService) → Backend LLM/API → sanitized HTML back into host compose UX.

### Feature Summary
Smart reply · summary + sentiment · compose tone/length · STT · drafts · templates · subject extraction · calendar remind · inbox analysis · dual-provider support.

### Challenges
Multi-context race conditions, Outlook DOM/ID edge cases, CSP/Featured compliance, Quill state bugs, dual module systems for MV3.

### Results
- ~60–75% API call reduction  
- Featured readiness ~94/100  
- Stable dual-provider summary/reply UX  
- Cost-aware Free-tier behavior  

### Key Achievements
Shipped a store-ready AI productivity extension that treats browser isolation as a distributed systems problem—and solved it with measurable impact.

---

## 22. Interview Preparation

### 20 Questions + Ideal Answers + Follow-ups

**1. What does Replybox do?**  
**Ideal:** AI side-panel assistant for Gmail/Outlook: summarize, reply, compose, paste back into native editors.  
**Follow-up:** Why side panel vs popup?

**2. Why Manifest V3?**  
**Ideal:** Platform requirement; service workers, stricter CSP, better security model.  
**Follow-up:** What broke migrating from MV2 patterns?

**3. Explain the 3-layer architecture.**  
**Ideal:** Presentation messages → SW orchestration (dedupe/counts) → network retries.  
**Follow-up:** Why not call fetch directly from the side panel?

**4. How did you fix 20–25 duplicate API calls?**  
**Ideal:** Root-caused dual triggers + session storage inaccessibility; atomic local flags + SW TTL + gateway.  
**Tradeoff Q:** What if TTL blocks a legitimate regenerate?

**5. What is atomic check-and-set here?**  
**Ideal:** Claim the emailId lock inside a single storage get/set critical section; losers poll cache.  
**Follow-up:** Is this perfectly atomic across processes?

**6. How do Gmail and Outlook differ?**  
**Ideal:** URL/ID schemes, selectors, compose-window validity; shared message contract.  
**Architecture Q:** How would you abstract a third provider?

**7. How do you prevent XSS from AI HTML?**  
**Ideal:** Allowlist sanitizer; CSP no remote scripts; controlled insertion helpers.  
**Follow-up:** Why not DOMPurify?

**8. Describe auth.**  
**Ideal:** chrome.identity OAuth + Firebase hosted login bridge into storage + package sync.  
**Security Q:** Where is the token stored and what’s the threat model?

**9. How does Free vs Pro work?**  
**Ideal:** Login returns package limits; gates before generate/STT; upgrade CTAs.  
**Product Q:** What should Free include without killing conversion or margins?

**10. Why vanilla JS instead of Vue in production?**  
**Ideal:** Shipping constraints and control; Vue remained scaffold/historical.  
**Tradeoff Q:** When would you reintroduce a framework?

**11. How do drafts work?**  
**Ideal:** Auto-save unpasted generations on context switches; FIFO caps by plan.  
**Follow-up:** Conflict resolution if two devices? (Today: local-only)

**12. Explain ApiService retries.**  
**Ideal:** AbortController 20s; retry 429/5xx; exponential backoff + jitter.  
**Follow-up:** Idempotency keys?

**13. What broke on Outlook summaries?**  
**Ideal:** Argument order bug + invalid IDs on compose; fixed signature + validation.  
**Follow-up:** How do you regression-test DOM integrations?

**14. How is speech-to-text designed?**  
**Ideal:** Separate web-accessible page using Web Speech API; Pro lock; message text back.  
**Follow-up:** Why not cloud STT?

**15. What would you monitor in production?**  
**Ideal:** Gen latency, error rate, dedupe hit rate, cost/user, paste conversion.  
**Follow-up:** Which metric is the north star?

**16. How would you scale to 100k users?**  
**Ideal:** Server queues, Redis, stronger rate limits, observability, DOM contract tests.  
**Architecture Q:** Sync vs async generation UX?

**17. What’s your biggest maintainability risk?**  
**Ideal:** Monolithic `sidepanel.js`; incomplete gateway coverage.  
**Follow-up:** What’s the modularization plan?

**18. How did you approach Chrome Featured readiness?**  
**Ideal:** CSP cleanup, privacy disclosure, a11y labels, least privilege, audits ~94/100.  
**Follow-up:** What still isn’t Featured-perfect?

**19. Why cache generations per emailId?**  
**Ideal:** UX speed + cost; losers of the race can read cache instead of calling AI.  
**Tradeoff Q:** Stale summary if thread updates?

**20. What did this project teach you about “full stack”?**  
**Ideal:** Full stack includes platform constraints, cost control, product packaging, and compliance—not only CRUD screens.  
**Leadership Q:** How do you write decision docs others can execute?

---

## 23. Skills Demonstrated

### Frontend
Side panel UX, Quill, CSS systems, content-script UI injection, a11y, loading/empty/error states

### Backend
REST integration, metering, retries, auth profile sync, **\[Assumption\]** serverless API collaboration

### Database
Client schema design in `chrome.storage`; cache vs source-of-truth thinking

### Cloud
Firebase Hosting, Vercel API consumption, Chrome Web Store distribution

### Architecture
Layered MV3 design, adapter pattern for providers, gateway pattern, distributed locking

### DevOps
Environment toggles, hosting configs, store packaging, audit-driven release readiness

### Security
CSP, sanitization, OAuth, least-privilege permissions, privacy policy engineering

### Performance
Request coalescing/dedupe, caching, DOM smart updates, Free-tier short-circuit

### Leadership
Phased delivery docs (Phase 1–3), postmortems for race conditions, Featured nomination prep

### Product Thinking
Free/Pro packaging, upgrade UX, templates for non-AI value, dual-provider market expansion

### Problem Solving
Root-cause of multi-context storms; TOCTOU fixes; Outlook contract bugs

### Communication
Extensive technical writeups suitable for handoff, audits, and portfolio storytelling

---

## 24. Hidden Skills

Recruiters often miss these—call them out explicitly:

| Hidden skill | Evidence in Replybox |
|--------------|----------------------|
| **Distributed systems intuition** | Cross-context locks without shared memory |
| **Cost-aware AI engineering** | Dedupe + Free gates + metering |
| **Platform engineering (MV3)** | SW ESM vs classic CS dual stack |
| **DOM reverse engineering** | Gmail/Outlook adapters |
| **API gateway design (client-side)** | `makeApiRequest` orchestration |
| **Security for generative HTML** | Sanitizer + CSP discipline |
| **Product instrumentation** | generate/paste count taxonomy |
| **Compliance literacy** | Privacy + Featured audits |
| **Incident-style debugging** | Race/Outlook/editor fix series |
| **Tradeoff documentation** | Phase completion reports |
| **Monetization UX** | Entitlements without dark patterns that waste GPU/$$ |
| **Graceful degradation** | Quill fallback editor |

---

## 25. Portfolio Assets

Suggest creating these visuals for the case study page:

1. **System architecture diagram** — 3-layer MV3 + backend  
2. **Sequence diagram** — email open → atomic claim → generate → insert  
3. **Gmail vs Outlook adapter diagram** — shared contract, divergent parsers  
4. **Auth flow diagram** — Identity vs Firebase bridge  
5. **Storage ER-style diagram** — local keys as entities  
6. **API map** — endpoints + metering side effects  
7. **Component hierarchy** — side panel modes  
8. **User journey** — reply / compose / upgrade  
9. **Deployment diagram** — CWS + Firebase + Vercel  
10. **Before/after chart** — 20–25 calls → 1 (+60–75% reduction)  
11. **Security controls poster** — CSP, sanitize, permissions  
12. **Screenshot set** — see [Section 30](#30-portfolio-content)

---

## 26. STAR Stories

### STAR 1 — Killing the Duplicate AI Storm

- **Situation:** Opening a single email triggered 20–25 `generate-reply-v2` calls; UI flickered and token costs spiked.  
- **Task:** Stop amplification across content script + side panel + listeners without breaking auto-generate UX.  
- **Action:** Mapped triggers; discovered `chrome.storage.session` unusable in CS; implemented atomic local claims, SW TTL dedupe, gateway routing, Free short-circuit.  
- **Result:** ~60–75% fewer API calls; stable summaries/replies; lower inference spend.

### STAR 2 — API Centralization on MV3

- **Situation:** Fetch logic was duplicated; counts sometimes skipped; races persisted.  
- **Task:** Centralize networking through the service worker while supporting classic content scripts.  
- **Action:** Dual ApiService modules; `makeApiRequest` router; auto count updates after success; phased rollout docs.  
- **Result:** Cleaner separation of concerns; metering reliability; measurable call reduction.

### STAR 3 — Outlook Correctness Under DOM Drift

- **Situation:** Summaries misrendered (sentiment as body); compose windows produced bad IDs.  
- **Task:** Restore correct Outlook UX parity with Gmail.  
- **Action:** Fixed insert signature, validated item IDs, guarded summary insertion.  
- **Result:** Reliable Outlook summary/reply path; fewer user-facing defects.

### STAR 4 — Store-Ready Security & A11y

- **Situation:** Featured/store scrutiny required CSP, privacy, and keyboard a11y.  
- **Task:** Raise compliance without regressing UX.  
- **Action:** Moved inline styles to CSS; sanitizer; aria-labels; pa11y; privacy endpoint disclosure.  
- **Result:** Audit readiness ~94/100; clearer trust story for distribution.

### STAR 5 — Cost-Aware Monetization

- **Situation:** Free users could trigger expensive generation paths.  
- **Task:** Protect margins while keeping upgrade pressure ethical.  
- **Action:** Package sync via login; pre-network gates; Pro-only STT; upgrade CTAs.  
- **Result:** AI spend aligned with entitlement; clearer product packaging.

---

## 27. Business Impact

| Impact area | Estimate / evidence |
|-------------|---------------------|
| **Time saved** | **\[Estimate\]** 2–10 minutes per long thread via summary + drafted reply |
| **Automation** | Auto-generate on email open; draft persistence; paste metrics |
| **Revenue impact** | Free→Pro funnel via limits and pricing links; **\[Assumption\]** conversion depends on store funnel |
| **UX improvement** | In-page summary + side panel edit loop beats copy/paste to ChatGPT |
| **Operational improvements** | 60–75% API reduction directly lowers COGS per active session |
| **Support burden** | Fewer “wrong summary” Outlook bugs after validation fixes |
| **Distribution** | Featured-ready posture increases store trust/conversion odds |

---

## 28. Future Roadmap

| Initiative | Why |
|------------|-----|
| Modularize sidepanel into ES modules/TS | Maintainability |
| Complete API gateway coverage | Analyze + paste paths |
| Redis (server) for idempotency keys | Stronger dedupe across devices |
| Job queue for generation | Scale + retries without SW fragility |
| OpenTelemetry / Sentry | Production debugging |
| Contract tests for Gmail/Outlook selectors | Reduce DOM breakage risk |
| GraphQL or BFF | Only if multi-client surfaces grow |
| Event-driven usage pipeline | Analytics warehouse |
| True RAG over user writing style | Personalization (privacy-sensitive) |
| Streaming tokens into Quill | Perceived performance |
| Docker/K8s for non-serverless API | If leaving Vercel constraints |
| Enterprise SSO / team workspaces | B2B expansion |
| Full i18n | Global store markets |
| Purge/split CSS | Memory/perf on low-end machines |

---

## 29. Recruiter Summary

Replybox proves full-stack ownership beyond CRUD tutorials: it is a shipped Manifest V3 product that embeds AI into Gmail and Outlook under real browser isolation, CSP, and cost constraints. The work demonstrates architecture (gateway + adapters), distributed coordination (atomic storage locks), product sense (Free/Pro metering), and security/compliance (sanitization, privacy, Featured readiness)—with a measurable engineering outcome of cutting duplicate AI calls by roughly 60–75%. This is the profile of an engineer who can design systems, debug production races, and package software users and stores will trust.

---

## 30. Portfolio Content

### Hero Section

**Eyebrow:** Chrome Extension · AI Productivity · Manifest V3  
**Headline:** Replybox  
**Subhead:** An AI email assistant that drafts smart replies, summarizes threads, and supports voice compose—inside Gmail and Outlook.  
**Primary CTA:** View case study  
**Secondary CTA:** Technical architecture  

### Short Project Card

| | |
|--|--|
| **Title** | Replybox – AI Email Assistant |
| **Blurb** | MV3 side-panel assistant for Gmail & Outlook with AI replies, summaries, STT, and cost-aware Free/Pro metering. |
| **Stack** | JavaScript, Chrome Extensions, Quill, Firebase, Vercel, Google OAuth |
| **Highlight** | Reduced duplicate AI API calls by ~60–75% via service-worker gateway + atomic locks |

### Detailed Case Study (narrative)

**Problem.** Professionals drowning in email either respond slowly or paste threads into external AI tools—losing context, privacy boundaries, and time.

**Solution.** Replybox installs as a Chrome Side Panel companion. When you open a message in Gmail or Outlook, it can summarize the thread, draft a reply with sentiment context, or help compose a new email with tone/length controls and optional speech-to-text. You edit in Quill and paste back into the native composer.

**How it’s built.** A presentation layer (side panel + provider content scripts) talks to a service-worker orchestration layer that deduplicates requests and updates usage counts, which then calls a hardened network client to a Vercel-hosted API. Auth uses Google OAuth and an optional Firebase login bridge. Generative HTML is sanitized before it touches the DOM.

**Outcome.** A store-oriented, dual-provider AI product with documented race-condition remediation, monetization gates, and Featured-level security/a11y posture.

### Feature List (portfolio)

- AI smart replies for open emails  
- Thread summaries with sentiment  
- Compose with tone & length controls  
- Speech-to-text prompts (Pro)  
- Draft auto-save & templates  
- Gmail + Outlook Web support  
- Usage metering & upgrade UX  
- Privacy-first MV3 permissions  

### Tech Stack (portfolio chips)

`JavaScript` `Chrome MV3` `Side Panel API` `Content Scripts` `Service Workers` `Quill` `Web Speech API` `Google OAuth` `Firebase` `Vercel` `REST` `HTML Sanitization` `pa11y`

### Challenges → Solutions

| Challenge | Solution |
|-----------|----------|
| 20–25 duplicate AI calls | Atomic storage locks + SW dedupe + API gateway |
| CS can’t use session storage | Coordinate via `chrome.storage.local` flags |
| Outlook summary bugs | Signature fix + email ID validation |
| Generative XSS risk | Allowlist sanitizer + CSP |
| AI cost on Free tier | Pre-network entitlement gates |
| Store compliance | Style extraction, a11y, privacy docs, audits |

### Engineering Highlights

- 3-layer MV3 architecture  
- Adapter pattern for mail providers  
- Distributed locking without a server mutex  
- Automatic usage count synchronization  
- Featured readiness ~94/100  

### Architecture Overview (short)

See diagrams in Section 25; emphasize presentation → orchestration → network → LLM API → sanitized paste-back.

### Screenshots to Include

1. Side panel Reply mode with summary + generated reply  
2. In-Gmail injected summary card  
3. Outlook Reading Pane with summary  
4. Compose tone/length controls  
5. Speech-to-text popup  
6. Drafts list  
7. Templates manager  
8. Upgrade / limits UI  
9. Login screen  
10. Settings modal  

### Metrics to Showcase

- **60–75%** API call reduction  
- **20–25 → 1** coordinated generation path (typical)  
- **94/100** Featured readiness  
- **2 providers** (Gmail + Outlook)  
- **0** pa11y WCAG2AA errors on shell (audit)  

### Timeline (**\[Assumption\]** — adjust to your real dates)

| Phase | Work |
|-------|------|
| Foundation | MV3 side panel, Gmail CS, auth |
| AI core | Reply/summary/compose + Quill |
| Outlook | Second provider adapter |
| Hardening | Race fixes, API centralization phases |
| Productization | Free/Pro, STT gate, drafts/templates |
| Compliance | CSP/a11y/privacy/Featured audits |

### Lessons Learned

1. Browser extensions are distributed systems.  
2. AI features need cost architecture, not just prompts.  
3. Provider DOM adapters need contract tests.  
4. Compliance work is product work if you want distribution.  
5. Documentation of fixes is a career asset.

### Future Improvements (portfolio closing)

Modular TypeScript UI · full gateway coverage · streaming generation · stronger observability · enterprise auth · selector contract CI · CSS payload diet.

---

## Appendix A — Key File Map

| File | Role |
|------|------|
| `public/manifest.json` | MV3 configuration |
| `public/background.js` | Orchestration / auth / gateway |
| `public/sidepanel.js` | Main product UI |
| `public/contentScript.js` | Gmail adapter |
| `public/outlookContentScript.js` | Outlook adapter |
| `public/service.js` / `service-module.js` | Network clients |
| `public/utils/sanitize.js` | XSS mitigation |
| `public/speech-to-text.js` | Dictation |
| `PRIVACY.md` | Data practices |
| `API_CENTRALIZATION_COMPLETE.md` | Architecture outcome |
| `RACE_CONDITION_FIX_SUMMARY.md` | Concurrency postmortem |
| `ATOMIC_CHECK_AND_SET_FIX.md` | Locking details |
| `audit/final-featured-readiness.md` | Store readiness |

## Appendix B — Honesty Checklist for Public Portfolio

When publishing this case study externally:

- [ ] Replace **\[Assumption\]** / **\[Estimate\]** with real metrics where you have them  
- [ ] Confirm solo vs team attribution  
- [ ] Do not imply you invented Gmail/Outlook  
- [ ] Distinguish extension client work from backend LLM infra ownership  
- [ ] Avoid showing secrets, client IDs, or private user data in screenshots  
- [ ] Keep Chrome Web Store link and live demo if available  

---

*End of Replybox Portfolio Technical Case Study.*
