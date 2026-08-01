# Medu — Senior Engineer Portfolio Case Study

**Product:** Medu — AI-powered university learning platform  
**Repository:** `medu-fe` (frontend)  
**Report scope:** Frontend codebase + inferred backend contracts  
**Audience:** Recruiters, CTOs, founders, engineering managers  
**Analysis period:** Static review of the Medu-FE codebase (architecture, features, security, APIs)

> **Positioning note:** This repository is the presentation and orchestration layer of a full-stack EdTech product. Backend ownership is inferred from API contracts and marked as **Assumption** where not verified in this repo.

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

**Related docs in this folder:**

| Doc | Purpose |
|-----|---------|
| [ARCHITECTURE_REPORT.md](./ARCHITECTURE_REPORT.md) | Architecture map, flows, high-risk areas |
| [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) | Security findings and remediations |
| [BUG_AUDIT.md](./BUG_AUDIT.md) | Bug audit notes |

---

## Verdict

Medu-FE is a production-grade, multi-role AI learning frontend (~530 `src` files, ~250 commits, Oct 2025–Jun 2026). It demonstrates architectural discipline, complex session/AI orchestration, multi-persona RBAC, and real product engineering — not a toy CRUD demo.

**Assumption:** Primary git author `mukeshh910s` is the portfolio owner. Adjust role language if ownership was shared differently.

---

## 1. Project Overview

| Field | Detail |
|--------|--------|
| **Project Name** | Medu |
| **Repo** | `medu-fe` (frontend) |
| **One-line** | AI-native university learning platform that turns course content into adaptive Q&A sessions, practice exams, and instructor analytics. |
| **Elevator pitch** | Medu helps universities deliver active learning at scale: instructors author structured courses (folders, topics, videos, workbooks, exams); students study through timed AI-evaluated sessions with tutoring, scheduling, and progress analytics — not passive video watching. |
| **Problem** | University courses often ship as PDFs/videos with weak engagement, little personalization, and almost no visibility into what students actually understand. |
| **Why it exists** | Bridge content delivery and mastery using AI evaluation, follow-up remediation, study-mode workbooks, and instructor understanding metrics. |
| **Industry** | EdTech / Higher Education / Adaptive Learning |
| **Target users** | Students (`user`), instructors/admins (`admin`), university representatives (`university_representative`) |
| **Business value** | Higher engagement, measurable topic understanding, scalable tutoring without 1:1 faculty time, operational tooling for course ops |
| **Differentiators** | Adaptive Q&A loop + AI tutor; FortuneSheet study-mode authoring; multi-role RBAC; distraction/break/session lifecycle; LLM usage dashboard; encrypted video proxy |

**Assumption:** Marketing copy (“thousands of students”) is aspirational unless verified with real MAU.

---

## 2. My Role

**Assumption:** Primary frontend owner based on commit volume. Adjust if your scope was narrower.

| Area | Evidence of ownership |
|------|------------------------|
| **Responsibilities** | Feature modules, design system, auth UX, course authoring, student learning loop, analytics UI, role gating |
| **Ownership** | Thin App Router shell + fat `src/modules/*`; centralized `fetchClient`, API/FE routes, Zustand stores |
| **Features built** | Auth (OTP/forgot password), multi-step course create, DnD folders/topics, study-mode spreadsheet, topic sessions, practice exams + tutor chat, calendar, settings/roles, AI usage admin |
| **E2E involvement** | Client → services → REST → session/timer/cleanup orchestration (BFF-style video proxy + logout route) |
| **Frontend** | Strong — React 19 / Next 16 App Router, TanStack Query, Radix/CVA design system |
| **Backend** | Consumes large REST surface; no DB in this repo (**Assumption:** separate API service) |
| **Database** | Schema inferred from API entities only |
| **DevOps** | Standard Next build/start; no Docker/CI config in repo (**Assumption:** Vercel or Node host) |
| **UI/UX** | Marketing homepage, steppers, skeletons, Framer Motion transitions, calendar views |
| **AI integration** | Frontend orchestration of evaluate/assist/tutor/understanding + admin LLM metrics |
| **Integrations** | Cloudinary video, SMS alerts (API flag), Excel workbook import |

---

## 3. Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js 16 (App Router), React 19, App Router route groups |
| **Backend** | External REST (`NEXT_PUBLIC_API_BASE_URL`); Next Route Handlers: `/api/logout`, `/api/video-proxy` |
| **Database** | Not in repo — **Assumption:** MongoDB/Postgres from entity shapes |
| **Authentication** | Cookie JWT access + refresh; OTP signup/forgot-password; Server Actions for cookies |
| **Storage** | Cookies, localStorage/sessionStorage for session UX; Cloudinary for video |
| **Hosting / Cloud** | **Assumption:** Vercel/Node; Cloudinary CDN |
| **Styling** | Tailwind CSS v4, `clsx`, `tailwind-merge`, CVA, Radix primitives |
| **State** | TanStack Query v5 (server), Zustand v5 (auth + course draft) |
| **Animation** | Framer Motion, `tailwindcss-animate` |
| **Testing** | None found (gap) |
| **Monitoring** | Admin LLM metrics UI; no Sentry/Datadog in FE |
| **Security** | Proxy RBAC, Bearer tokens, video AES-GCM tokens (with known hardening gaps) |
| **Payments** | None |
| **Messaging** | SMS schedule alerts via backend |
| **Caching** | React Query (5m stale / 10m gc); video-proxy in-memory token cache (~10m) |
| **Search** | Admin user search API |
| **AI APIs** | Backend-mediated: `/evaluate-answer`, `/agent/assist`, exam tutor chat, understanding |
| **Dev tools** | ESLint (Airbnb + Next), Prettier, React Query Devtools |
| **Build** | Next.js / SWC |
| **VCS** | Git / GitHub (PR-style commits) |
| **CI/CD** | Not configured in repo |
| **Package manager** | npm (`package-lock.json`) |
| **Env** | `NEXT_PUBLIC_API_BASE_URL`, video token secret/TTL, devtools flag |

**Also:** `@dnd-kit`, `@fortune-sheet/react`, Recharts, React Hook Form + Zod, `cmdk`, `sonner`, phone/OTP inputs, date/time pickers.

---

## 4. Architecture

### Overall

**Thin routing shell + fat feature modules** talking to an external REST API.

```
Browser → src/proxy.js (auth/RBAC)
       → page.jsx (app shell)
       → modules/*/pages → hooks → services → fetchClient → Backend
       → Zustand / React Query
```

### Frontend

- `src/app/` — routes, metadata, layouts only
- `src/modules/` — 15 domains (pages/components/hooks/validations)
- `src/services/` — API adapters
- `src/components/ui` — design system
- `src/lib` — fetchClient, cookies, SSR user

### Backend (inferred)

REST domains: auth, university-courses, sessions, exams, schedules, study-mode, agent, feedback, distractions, admin LLM.

### Component architecture

Page → lazy chunks + Suspense → hooks (logic) → presentational components → UI primitives (`cn` + CVA + Radix).

### API architecture

Central `API.routes.js` + `FE.routes.js`; no hardcoded paths in feature code (by convention).

### Auth flow

Login → set cookies → Zustand user → proxy validates `/user-detail` → Bearer on requests → 401 → refresh queue → retry.

### Authorization

Roles: `admin` | `university_representative` | `user`. Layers: proxy, layouts, Header `allowedRoles`, backend (**Assumption**).

### State

- Global: auth, course wizard draft
- Server: React Query
- Ephemeral session: sessionStorage for Q&A machine / covered topics

### Request lifecycle

params filter → auth header → FormData/JSON → parse → 401 coalesce refresh → throw structured errors.

### Error handling

Service/hook toasts (`sonner`); incomplete 401→login redirect (TODO); no `error.jsx` boundaries.

### Performance patterns

Lazy routes/components, skeleton fallbacks, Query caching, `force-static` homepage, admin panel perf commits in history.

### Deployment

`next build` / `next start`; empty `next.config.mjs`; no Docker.

### Scalability (FE)

CDN static assets + SSR/CSR hybrid; bottleneck is API/LLM and session volume (**Assumption**).

### Future improvements

httpOnly tokens + BFF, tests, error boundaries, SEO, optional GraphQL/gateway, Redis session cache on BE.

---

## 5. Database

**Not present in this repository.** Domain model inferred from API usage:

| Entity | Relationships (inferred) |
|--------|---------------------------|
| User | roles; subscriptions; sessions; distractions; feedback |
| University | courses; role requests; representatives |
| UniversityCourse | folders → topics → questions/resources/videos |
| TopicFolder | belongs to course; contains topics |
| Topic | questions, study-mode workbook, understanding |
| UniversityCourseSession | user + course; Q&A attempts |
| PracticeExam / Questions / Attempts | course-scoped assessment |
| Schedule / ScheduleItem | course topic calendar |
| UniversityRoleRequest | instructor onboarding |
| LLM usage metrics | admin analytics |

**Assumption:** Indexes on `user_id`, `course_id`, `topic_id`, `session_id`, subscription codes.  
CRUD/validation: FE Zod + backend validation (**Assumption**). Security: API authorization must be source of truth (FE role checks are UX gates).

---

## 6. APIs

### Internal Next handlers

| Endpoint | Purpose | Auth |
|----------|---------|------|
| `POST /api/logout` | Clear auth cookies | Cookie clear (CSRF gap noted in security audit) |
| `GET /api/video-proxy` | Stream encrypted/tokenized video + Range | Token-based; caller session not verified (audit finding) |

### External REST (grouped)

| Group | Examples | Notes |
|-------|----------|-------|
| **Auth** | `/send-otp`, `/sign-up`, `/new-login-api`, `/refresh-token`, forgot/change password | OTP + JWT |
| **User/Profile** | `/user-detail`, `/update-user`, university role requests, admin user search, set/revoke uni-rep | RBAC admin ops |
| **Courses** | CRUD university-courses, topics, folders, reorder, resources | Large surface |
| **Questions** | list/update/delete, Excel upload | Authoring |
| **Study mode** | template, Q&A CRUD, workbook import, toggle | Spreadsheet pedagogy |
| **Sessions** | create session, next-question, evaluate-answer, understanding, cover-topic | Core learning loop |
| **Exams** | exams CRUD, attempts, self-rating, tutor chat | Assessment + AI |
| **Schedule** | generate/get/delete, alerts, topic items | Calendar + SMS flag |
| **Subscriptions** | by code/id, unsubscribe, my subscriptions | Enrollment |
| **Distraction / Feedback / Agent** | CRUD distraction, feedback, `/agent/assist` | Learning UX + AI |
| **Admin LLM** | `/admin/llm-usage/metrics` | Cost observability |

**Auth:** Bearer access token.  
**Validation:** Zod on FE forms.  
**Response/errors:** JSON via `fetchClient`; status attached on throw.  
**Rate limiting / pagination / caching:** FE has Query caching and some list params; rate limits are backend-owned (**Assumption**).

Full path map: `src/routes/API.routes.js`.

---

## 7. Features

| Feature | Purpose | Implementation | Challenges / Interesting logic | Why it matters |
|---------|---------|----------------|--------------------------------|----------------|
| **OTP Auth** | Secure signup / password reset | Multi-step pages + Zustand draft + phone normalize | Cross-step state without URL leakage | Production auth UX |
| **Multi-step Course Authoring** | Publish structured curricula | Stepper + Zustand draft + create/update modes | Draft vs server sync | Complex form systems |
| **DnD Folders/Topics** | Pedagogical ordering | `@dnd-kit` + reorder APIs | Optimistic UX + persist | Real CMS-grade UX |
| **Adaptive Topic Session** | Active learning loop | `useQuestionFlow` MAIN/FOLLOW_UP machine + evaluate API | Persistence, races, follow-up queues | Core product |
| **Session Guard/Timer** | Reliable progress + study hygiene | `useSessionGuard`, unified timer, breaks, distractions | beforeunload cleanup, double PATCH risk | Production hardening |
| **AI Floating Tutor** | Remediation on wrong answers | evaluate → `/agent/assist` with context flags | Orchestration failures | Differentiator |
| **Study Mode Spreadsheet** | Author Q&A as workbook | FortuneSheet + import/export | Luckysheet→FortuneSheet normalization | Unusual FE depth |
| **Practice Exams + Tutor** | Assessment + coaching | Attempt submit, score card, self-rating, tutor modal | Attempt lifecycle | Full assessment product |
| **Understanding Analytics** | Instructor insight | Recharts topic/folder graphs | Aggregations from API | Business value for unis |
| **University Rep Role** | Limited analytics access | Proxy allowlist + resource permissions | Multi-tenant governance | B2B readiness |
| **Calendar Scheduling** | Study planning | Full calendar module + generate schedule | Multi-view date edge cases | Retention / planning |
| **Video Protection** | Protect media | AES-GCM tokens + `/api/video-proxy` | Secret exposure (known gap) | Shows security thinking |
| **Admin LLM Dashboard** | Cost control | Metrics by feature | Ops maturity | AI product responsibility |

---

## 8. UI/UX

| Area | Approach |
|------|----------|
| **Design system** | Radix + CVA Button/Dialog/Select/etc.; premium violet/indigo aesthetic |
| **Responsive** | Tailwind breakpoints across marketing + app shells |
| **A11y** | Radix primitives; dedicated `useAccessibility` in course module |
| **Motion** | `PageTransition`, hover/transition micro-interactions |
| **Loading** | Skeletons + `LazyLoadingFallback` typed by surface |
| **Errors** | Toasts; limited route error UX |
| **Flows** | Auth wizard, course wizard, session loop, exam attempt |
| **Nav** | Role-filtered Header; TopicSidebar for learning |
| **Perf UX** | Lazy admin grids/settings tabs; Query staleTime |

---

## 9. Engineering Challenges

### C1 — Adaptive Q&A state machine

- **Problem:** MAIN vs FOLLOW_UP, persistence across refresh, evaluation branching.
- **Why hard:** Async races + UX continuity.
- **Chosen:** Hook-owned machine + sessionStorage.
- **Tradeoff:** Client persistence can desync from server.
- **Lesson:** Treat session as a durable state machine with explicit transitions.

### C2 — Session exit integrity

- **Problem:** Users close tabs mid-session; progress must flush.
- **Chosen:** Guards + `pagehide`/`beforeunload` + PATCH end.
- **Tradeoff:** Duplicate end calls / partial cleanup risk.
- **Lesson:** Idempotent server endpoints are mandatory.

### C3 — Auth refresh under concurrency

- **Problem:** Multiple 401s stampeding refresh.
- **Chosen:** `isRefreshing` + subscriber queue.
- **Tradeoff:** httpOnly refresh vs client `js-cookie` mismatch; no rotation yet.
- **Lesson:** Align cookie flags with where tokens are read.

### C4 — Spreadsheet as content CMS

- **Problem:** Educators think in Excel.
- **Chosen:** FortuneSheet + import workbook APIs.
- **Tradeoff:** Heavy dependency, payload size.
- **Lesson:** Meet users in their tools.

### C5 — Multi-role product surface

- **Problem:** One app, three personas.
- **Chosen:** Proxy allowlists + nav roles + limited uni-rep analytics.
- **Tradeoff:** Client localStorage role checks weaken UI security.
- **Lesson:** Server is the only trust boundary.

---

## 10. Performance Optimizations

| Technique | Present? |
|-----------|----------|
| Lazy loading / code splitting | Yes (`React.lazy` + Suspense) |
| SSR / App Router | Yes (layouts, proxy, some SSR user) |
| SSG / `force-static` | Homepage |
| ISR | Not observed |
| CSR | Dominant for dashboards/sessions |
| Memoization | Selective `useCallback` in hooks |
| Caching | React Query; video proxy memory cache |
| Images | `next/font`; limited Next Image evidence |
| Bundle | Lazy admin surfaces; FortuneSheet/Recharts scoped by routes |
| DB/API | Backend; FE filters empty params |
| Rendering | Skeletons, PageTransition |

Git history includes dedicated performance fix PRs for admin panel and broader app.

---

## 11. Security

| Topic | Status |
|-------|--------|
| Auth | Cookie JWT + OTP |
| AuthZ | Proxy RBAC + UI gates |
| JWT | Access ~160m; refresh 7d |
| Cookies | Access **non-httpOnly**; refresh httpOnly |
| Validation | Zod on forms |
| XSS | Standard React escaping; token theft risk if XSS |
| CSRF | Logout/API cookie patterns weak without tokens |
| Rate limit | Backend **Assumption** |
| Password hashing | Backend |
| Secrets | `NEXT_PUBLIC_VIDEO_TOKEN_SECRET` + hardcoded fallback — **critical gap** |
| API security | Bearer; video proxy auth gap |

Use security findings as a **maturity narrative**: discuss threats, tradeoffs, and remediations — not only happy paths. See [SECURITY_AUDIT.md](./SECURITY_AUDIT.md).

---

## 12. AI Usage

| Capability | FE role |
|------------|---------|
| Answer evaluation | Calls evaluate API; branches UX |
| Agent assist | Floating chat with correctness/context flags |
| Exam tutor | Per-question chat sessions |
| Follow-ups | Remediation queue after wrong answers |
| Understanding | Triggers after attempt thresholds |
| Cost ops | Admin LLM metrics dashboard |
| Prompting / RAG / embeddings | Backend-owned (**Assumption**) |
| Streaming | Not clearly implemented in FE (**Assumption:** request/response) |

**Architecture:** FE orchestrator → BE LLM gateway → model providers.

---

## 13. Third-party Integrations

| Integration | Purpose | Challenge | Limitation |
|-------------|---------|-----------|------------|
| Backend REST | All business logic | Contract drift | FE blocked on BE |
| Cloudinary | Topic video | Proxy + encryption | Non-Cloudinary bypass |
| FortuneSheet | Study workbooks | Format conversion | Bundle weight |
| SMS alerts | Schedule reminders | Backend delivery | FE only toggles |
| Geist / Google fonts | Typography | — | Marketing polish |
| Web Crypto | Video tokens | Client secret exposure | Not true DRM |

No Stripe/email/analytics SDKs found.

---

## 14. DevOps

| Area | Reality |
|------|---------|
| Deploy | **Assumption:** Vercel/`next start` |
| CI/CD | Not in repo |
| Monitoring | LLM admin metrics only |
| Logging | `console` in fetchClient |
| Backups | Backend |
| Scaling | Horizontal FE + BE scale independently |
| Env | `NEXT_PUBLIC_*` |

---

## 15. Metrics

| Metric | Value | Confidence |
|--------|-------|------------|
| Source files (`src`) | ~520–530 | High |
| Commits | ~250 | High |
| Primary author commits | ~554 shortlog entries | High |
| Timeline | ~Oct 2025–Jun 2026 | High |
| Modules | 15 | High |
| API route constants | 80+ endpoints | High |
| Users / RPS / DB size | Unknown | Supply before publishing |
| Lighthouse / SEO score | Not measured here | Unknown |
| Homepage claim “thousands of students” | Marketing | Unverified |

---

## 16. Engineering Decisions

| Decision | Why | Tradeoff |
|----------|-----|----------|
| **React 19** | Component model + ecosystem for complex interactive learning | Fast-moving APIs |
| **Next.js 16 App Router** | Routing, metadata, proxy, hybrid SSR/CSR | Complexity vs CRA |
| **Module vs app shell** | Scalable team boundaries | Occasional `course`/`courses` duplication |
| **TanStack Query + Zustand** | Server vs client state separation | Two mental models |
| **Radix + Tailwind + CVA** | Accessible, variant-driven UI | Design system maintenance |
| **REST not GraphQL** | Simple with existing BE | Overfetch risk |
| **External BE** | Independent scale/deploy | Contract versioning |
| **Mongo/Express** | Common EdTech stack | **Assumption** — confirm for resume accuracy |

---

## 17. Scalability

| Users | FE readiness | Likely changes |
|-------|--------------|----------------|
| 100 | Fine | None |
| 1,000 | Fine | Basic monitoring |
| 10,000 | FE OK if CDN | BE caching, LLM rate limits, session store |
| 100,000 | Need edge caching, queued AI, horizontal API | Redis, queues for eval/tutor, CDN video |
| 1M | Platform redesign | Microservices, search, multi-region, cost controls |

Bottlenecks: LLM evaluate/assist latency/cost, session write volume, spreadsheet payloads — not React render alone.

---

## 18. Code Quality

**Strengths:** Clear module boundaries; centralized routes; reusable UI; 70+ hooks; Zod validations; engineering standards skill file (`.cursor/skills/medu-fe-standards/SKILL.md`).

**Gaps:** No tests; `course`/`courses` split; typo `feeedback.services.js`; placeholder root metadata; security TODOs; some client role checks.

---

## 19. SEO

| Item | Status |
|------|--------|
| Page titles | Many static `metadata` exports |
| Root description | Placeholder (“Generated by create next app”) |
| OG / Twitter / canonical | Missing |
| Sitemap / robots | Missing |
| `generateMetadata` | Missing |
| Performance SEO | Homepage static; app mostly private |

For portfolio: frame public marketing polish as a **roadmap win**, not a current strength.

---

## 20. Resume Highlights

### Resume bullets (10)

1. Architected a Next.js 16 / React 19 multi-role EdTech frontend with 15 feature modules and thin App Router shell.
2. Built adaptive AI study sessions with evaluation, follow-up remediation, and tutor chat orchestration.
3. Implemented cookie JWT auth with SSR/CSR `fetchClient` and coalesced token refresh.
4. Delivered multi-step course authoring with Zod/RHF and drag-and-drop folder/topic reordering.
5. Integrated FortuneSheet study-mode workbooks with Excel import for instructor content ops.
6. Designed role-based access for admin, university representative, and student personas via edge proxy.
7. Built instructor analytics (topic/folder understanding) with Recharts.
8. Engineered session lifecycle (timers, breaks, distraction logging, exit guards) for reliable progress capture.
9. Implemented practice exams with attempts, score cards, self-rating, and AI exam tutoring.
10. Added encrypted video URL tokens and a Range-capable Next.js video proxy for Cloudinary media.

### LinkedIn bullets (10)

1. Shipping Medu — AI-powered university learning (authoring + adaptive study).
2. Specializing in complex React state machines for learning sessions.
3. Building design systems with Radix, CVA, and Tailwind v4.
4. Owning end-to-end FE architecture: modules, services, Query, Zustand.
5. Turning spreadsheets into pedagogical CMS via FortuneSheet.
6. Partnering with backend/AI for evaluation, tutoring, and cost metrics.
7. Implementing production auth, RBAC, and BFF-style media proxying.
8. Obsessed with loading UX: lazy routes, skeletons, transitions.
9. Supporting B2B roles (instructors + university reps).
10. Balancing product velocity with performance and security hardening.

### ATS-friendly achievements (10)

1. Developed Next.js React educational SaaS frontend.
2. Integrated REST APIs for courses sessions exams schedules.
3. Implemented JWT cookie authentication and refresh handling.
4. Built responsive UI with Tailwind CSS and accessible Radix components.
5. Used TanStack Query and Zustand for application state.
6. Created multi-step forms with React Hook Form and Zod.
7. Implemented drag-and-drop sorting with dnd-kit.
8. Developed analytics dashboards with Recharts.
9. Integrated AI tutoring and answer evaluation workflows.
10. Optimized frontend performance with code splitting and caching.

---

## 21. Portfolio Highlights

**Project description:** Medu is an AI-native university platform where instructors author structured courses and students learn through adaptive Q&A, exams, and neuroscience-inspired study sessions.

**Technical summary:** Next.js 16 modular frontend, React Query + Zustand, proxy RBAC, AI session orchestration, FortuneSheet authoring, Recharts analytics, video proxy.

**Business summary:** Helps universities scale active learning and measure understanding — not just content distribution.

**Architecture summary:** Shell/modules split; centralized HTTP client; external REST domain services; hybrid SSR/CSR.

**Feature summary:** Auth, authoring, study sessions, study-mode, exams, calendar, roles, AI ops.

**Challenges:** Session integrity, AI orchestration, multi-role UX, spreadsheet CMS, media protection.

**Results:** Faster course publishing; measurable topic understanding; reduced 1:1 tutoring load — **Assumption:** quantify with real KPIs before publishing.

**Key achievements:** Production multi-persona product surface; deep learning-session engineering; AI cost visibility.

---

## 22. Interview Preparation

### 20 questions + ideal answer angles

1. **Why shell vs modules?** — Scale teams; keep `app/` routing-only.
2. **Query vs Zustand?** — Server cache vs cross-step/client auth.
3. **How does token refresh work?** — Queue + singleflight; discuss httpOnly gap.
4. **How is RBAC enforced?** — Proxy first; UI secondary; BE ultimate.
5. **Describe the Q&A state machine.** — MAIN/FOLLOW_UP, persistence, evaluate branches.
6. **How do you prevent lost session progress?** — Exit guards + PATCH; idempotency needs.
7. **Why FortuneSheet?** — Meet instructors in Excel mental model.
8. **How is video protected?** — AES-GCM tokens + proxy; admit secret exposure and fix plan.
9. **Biggest performance win?** — Lazy admin surfaces + Query defaults + targeted refactors.
10. **How would you add tests?** — Hook tests for `useQuestionFlow`; Playwright for session/exam.
11. **SSR vs CSR choices?** — Auth proxy SSR-ish; interactive sessions CSR.
12. **How do you version APIs?** — Central route map; contract tests (**roadmap**).
13. **Scaling AI cost?** — Admin metrics → rate limits, caching eval, cheaper models for easy Qs.
14. **Uni-rep vs admin?** — Allowlisted analytics paths.
15. **Hardest bug?** — Use a real one from session cleanup or refresh.
16. **Why not GraphQL?** — Existing REST; complexity unjustified yet.
17. **Accessibility approach?** — Radix + keyboard dialogs/menus.
18. **Security improvements you’d ship first?** — httpOnly access, server video tokens, remove localStorage role trust.
19. **How do forms stay consistent?** — RHF + Zod + shared UI inputs.
20. **What would you rebuild?** — Unify `course`/`courses`; BFF for auth cookies; e2e suite.

**Follow-ups:** Refresh on client vs BFF; DnD optimistic updates; spreadsheet vs structured forms; edge proxy vs middleware naming in Next 16.

---

## 23. Skills Demonstrated

| Category | Evidence |
|----------|----------|
| **Frontend** | React 19, Next 16, complex UX |
| **Backend** | REST consumption, Route Handlers, auth/cookie server actions |
| **Database** | Domain modeling via API contracts |
| **Cloud** | Cloudinary, env-based API hosting |
| **Architecture** | Modular FE, layered auth, client state machines |
| **DevOps** | Build pipeline literacy; CI gap |
| **Security** | Auth/RBAC/media; audit-aware |
| **Performance** | Lazy load, caching, perf PRs |
| **Leadership** | Standards doc, PR-style delivery |
| **Product** | Multi-persona journeys, learning science features |
| **Problem solving** | Session/AI/spreadsheet hard problems |
| **Communication** | Central routes, module boundaries, docs |

---

## 24. Hidden Skills

Capabilities recruiters often miss:

- Learning-session state machines (not CRUD forms)
- Request coalescing on auth refresh
- BFF instincts (video proxy, logout, cookie server actions)
- RBAC product design for B2B education
- Pedagogical CMS (spreadsheet import)
- AI orchestration without calling model SDKs from the browser
- Operational AI (usage/cost dashboard)
- Exit/unload reliability engineering
- Design system construction (not only page building)
- Honest security self-audit literacy

---

## 25. Portfolio Assets

Suggested diagrams and visuals:

1. System context diagram (FE ↔ API ↔ LLM ↔ Cloudinary)
2. Module map of `src/`
3. Auth sequence (login → refresh → logout)
4. Topic session sequence (next → evaluate → tutor → cover)
5. ER-style domain diagram (inferred entities)
6. RBAC matrix (role × route)
7. Component hierarchy for `CourseFormPage` + `TopicSessionPage`
8. Deployment diagram
9. User journey: browse → subscribe → session → exam
10. Before/after perf notes from optimization PRs

---

## 26. STAR Stories

### STAR 1 — Adaptive session integrity

- **Situation:** Students abandoned sessions; progress/analytics incomplete.
- **Task:** Guarantee cleanup and understanding signals.
- **Action:** Built session guard, timer context, covered-topic flush, understanding threshold calls.
- **Result:** Reliable session closure path (quantify if you have error-rate drops).

### STAR 2 — Instructor authoring velocity

- **Situation:** Course setup was multi-entity and error-prone.
- **Task:** Guided create/update with folder/topic structure.
- **Action:** 3-step stepper, Zod validation, DnD reorder APIs, Zustand draft.
- **Result:** Instructors can publish structured courses without multi-page chaos.

### STAR 3 — Multi-role B2B access

- **Situation:** Universities needed limited oversight without full admin.
- **Task:** Introduce university representative.
- **Action:** Proxy allowlists, resource permissions, settings assignment/revoke.
- **Result:** Safe analytics access for institutional stakeholders.

### STAR 4 — AI tutoring loop

- **Situation:** Wrong answers needed remediation, not just a red X.
- **Task:** Contextual help without leaving session.
- **Action:** Chained evaluate → agent assist → follow-ups; exam tutor modal.
- **Result:** Differentiated active-learning experience + admin cost visibility.

### STAR 5 — Media protection attempt

- **Situation:** Topic videos needed controlled delivery.
- **Task:** Avoid raw CDN exposure.
- **Action:** Web Crypto tokens + Range proxy.
- **Result:** Improved posture vs naked URLs; known remediations for secret placement (shows judgment).

---

## 27. Business Impact

| Impact | Estimate | Label |
|--------|----------|-------|
| Faculty tutoring time | AI tutor deflects repetitive Qs | **Assumption** |
| Course publishing time | Stepper + Excel import vs manual entry | **Assumption:** 30–70% faster |
| Student engagement | Active Q&A vs passive video | Product thesis |
| Institutional insight | Understanding graphs | Sales enablement for unis |
| AI cost control | Admin metrics | Prevents runaway LLM spend |
| Revenue | Subscriptions by course/code | Model exists; pricing unknown |

Replace assumptions with real numbers before public use.

---

## 28. Future Roadmap

| Initiative | Why |
|------------|-----|
| Automated e2e + unit tests | Protect session/exam critical paths |
| httpOnly access + BFF API proxy | Fix XSS token theft |
| Server-issued video grants | Real media authZ |
| Redis cache / queues on BE | Scale evaluate/tutor |
| Elasticsearch | Course/topic search |
| GraphQL or BFF aggregation | Reduce chatty lists |
| Event-driven progress | Reliable analytics pipeline |
| Docker/K8s | Portable deploys |
| Microservices (sessions/AI) | Isolate LLM load |
| Stronger AI (RAG over course materials) | Better tutoring grounded in syllabus |
| SEO/marketing hardening | Public growth |

---

## 29. Recruiter Summary

Medu is not a todo-app portfolio piece — it is a multi-persona AI learning product frontend with production concerns: JWT refresh coalescing, edge-style route RBAC, adaptive session state machines, spreadsheet-based instructional CMS, assessment flows, analytics, and media proxying. The codebase shows architectural discipline (shell vs modules, centralized networking, typed form validation, design-system primitives) and product judgment (breaks, distractions, understanding thresholds, university-rep governance, LLM cost visibility). Even as a frontend-owned repository, it demonstrates full-stack thinking across auth, API contracts, security tradeoffs, performance, and AI orchestration — the profile of an engineer who can own complex product surfaces end-to-end.

---

## 30. Portfolio Content (copy-ready)

### Hero

**Medu — AI-Powered University Learning**  
Active learning platform that turns course content into adaptive AI study sessions, practice exams, and instructor understanding analytics.

### Short project card

**Medu** · Next.js 16 · React 19 · AI EdTech  
Multi-role platform for course authoring, adaptive Q&A sessions, study-mode workbooks, and analytics.  
**Stack:** Next.js, TanStack Query, Zustand, Radix, Zod, FortuneSheet, Recharts.

### Detailed case study outline

1. Problem in higher-ed engagement
2. Users & roles
3. Architecture (diagram)
4. Core loop: session → evaluate → tutor → understanding
5. Instructor system: authoring + DnD + spreadsheet
6. Engineering deep dives (auth, session guard, video proxy)
7. Tradeoffs & security lessons
8. Results & roadmap

### Feature list

AI Q&A sessions · AI tutor · Study-mode Excel · Practice exams · Course stepper · DnD structure · Calendar · Understanding analytics · Uni-rep role · LLM usage admin · Video proxy · Distraction/break UX

### Tech stack (display)

Next.js 16 · React 19 · Tailwind v4 · Radix · RHF/Zod · TanStack Query · Zustand · Framer Motion · dnd-kit · FortuneSheet · Recharts · Cloudinary

### Challenges → Solutions

| Challenge | Solution |
|-----------|----------|
| Session loss | Exit guards & flush |
| AI chaos | Orchestrated evaluate/assist |
| Excel authoring | FortuneSheet + import |
| Multi-tenant roles | Proxy allowlists |
| Media leakage | Tokenized proxy (with hardening plan) |

### Engineering highlights

- Shell/module architecture
- Coalesced token refresh
- Learning state machine
- Design system + lazy UX
- AI cost observability

### Architecture overview (one paragraph)

Medu-FE is a modular Next.js client: `proxy.js` enforces auth/RBAC; feature modules own UX; services call a centralized `fetchClient`; React Query caches server state; Zustand holds auth and wizard drafts; AI and persistence live on an external API.

### Screenshots to include

1. Marketing hero
2. Course create stepper (folders/topics)
3. Live topic session + floating chat
4. FortuneSheet study mode
5. Understanding analytics
6. Practice exam score card
7. Calendar schedule
8. Admin AI usage

### Metrics to showcase

Commits / timeline / modules / endpoints; add MAU, session completion %, exam usage, LLM cost saved only if real.

### Timeline

**Oct 2025** — project start → **2025–26** auth, courses, sessions → **2026** uni-rep, resources, performance, study-mode student flows → **Jun 2026** ongoing hardening.

### Lessons learned

- Trust boundaries belong on the server
- Learning products are state machines, not forms
- AI features need cost dashboards from day one
- Meet instructors in Excel
- Performance work is continuous in admin-heavy UIs

### Future improvements

Tests, hardened auth/media, SEO, BFF, queues/cache, RAG tutoring.

---

## Full-Stack Branding Guidance

This repository alone proves **senior frontend + full-stack product engineering**. For a true Full Stack claim on Medu:

1. Pair this report with backend repo highlights (schema, LLM gateway, exam scoring).
2. Or label the portfolio project: **“Medu (Frontend Architecture & Product Engineering)”** and list backend as collaboration/**Assumption** until confirmed.
3. Do **not** claim Mongo/Express/Docker unless you actually built them.

---

*Generated from static analysis of the `medu-fe` repository for portfolio, resume, LinkedIn, and interview preparation use.*
