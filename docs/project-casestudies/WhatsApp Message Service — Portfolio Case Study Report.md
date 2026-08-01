# WhatsApp Message Service — Portfolio Case Study Report

**Prepared for:** Rahul Khedekar (`rahulkhedekarr`)  
**Repo:** [WhatsApp-message-service-](https://github.com/rahulgnhub2025/WhatsApp-message-service-)  
**Analysis date:** August 2, 2026  
**Codebase reality check:** This repository is a **production-oriented Node.js backend API** (not a React/Next frontend app). Full-stack framing should present you as the **API/platform engineer** who designed auth, billing, queues, campaigns, and Meta integration end-to-end—with frontend clients as consumers (referenced in code; not in this repo).

---

## 1. Project Overview

| Field | Detail |
|---|---|
| **Project Name** | WhatsApp Message Service (`whatsapp-message-service`) |
| **One-line summary** | Queue-backed WhatsApp Cloud API platform with JWT auth, prepaid wallet billing, and campaign-level delivery tracking. |
| **Elevator pitch** | A multi-tenant messaging API that lets businesses send personalized WhatsApp campaigns at scale—charging prepaid tokens, queuing delivery through Redis/BullMQ, respecting Meta rate limits, and automatically refunding failed messages—without blocking the HTTP request path. |
| **Problem it solves** | Direct Meta API calls are slow, rate-limited, failure-prone, and hard to bill/audit. Teams need reliable bulk send, per-recipient personalization, wallet accounting, and campaign observability. |
| **Why it exists** | To productize WhatsApp outreach as a SaaS-style messaging backend: register → fund wallet → send campaign → track outcomes → get refunds on permanent failures. |
| **Industry / domain** | CPaaS / Business messaging / MarTech / EdTech & SMB outreach *(assumption: fees-reminder template examples suggest education/billing use cases)* |
| **Target users** | Developers/product teams integrating WhatsApp; SMB operators sending reminders, notifications, campaigns |
| **Business value** | Prepaid token economy, auditable ledger, async reliability, Meta-compliant throughput, self-serve API docs |
| **Key differentiators** | ACID wallet + campaign creation; auto-refund on worker failure; per-recipient template params; cursor pagination; dependency-aware health checks; Swagger OAuth2 login bridge |

**Assumption:** Positioned as the backend for a WhatsApp outreach product (dashboard/frontend may exist separately or be planned).

---

## 2. My Role

**Evidence from git:** Sole committer (`rahulkhedekarr`), 5 commits (Mar 5–9, 2026), plus uncommitted work for per-recipient template personalization.

| Area | Ownership |
|---|---|
| **Responsibilities** | Sole engineer: product design, architecture, implementation, hardening, docs |
| **Ownership** | Full system ownership—auth → wallet → campaign → queue → Meta provider → observability |
| **Features built** | Auth (JWT), campaigns, bulk send, template messaging, wallet/ledger, refunds, queue status, Swagger, Docker |
| **Major contributions** | ACID token wallet; BullMQ delivery pipeline; production security/observability pass; OpenAPI docs |
| **End-to-end** | Yes for backend lifecycle (request → validate → deduct → enqueue → worker → Meta → status/refund) |
| **Frontend ownership** | Not in this repo; API designed for frontend clients (`template.parameters`, `perRecipientParameters`) |
| **Backend ownership** | Complete |
| **Database design** | Users, Campaigns (embedded recipients/events), Transactions |
| **DevOps** | Dockerfile + docker-compose (app + Redis); graceful shutdown |
| **Deployment** | Docker-ready; hosting provider not specified in repo |
| **UI/UX** | Swagger UI customization only |
| **AI integration** | None |
| **Third-party** | Meta WhatsApp Cloud API, Redis, MongoDB |

---

## 3. Tech Stack

| Category | Technology | Status |
|---|---|---|
| **Frontend** | None in repo; Swagger UI as API console | Present |
| **Backend** | Node.js 18+, Express 4 | Present |
| **Database** | MongoDB via Mongoose 9 | Present |
| **Authentication** | JWT access + refresh (`jsonwebtoken`), bcryptjs | Present |
| **Storage** | MongoDB documents | Present |
| **Hosting** | Not specified | **Assumption:** VPS/cloud VM or container host |
| **Cloud** | Meta Graph API (`graph.facebook.com/v19.0`) | Present |
| **Styling** | N/A (API); minor Swagger CSS | Minimal |
| **State management** | N/A (stateless API + Redis job state) | Present |
| **Animation** | N/A | — |
| **Testing** | No unit/integration/e2e suite found | **Gap** |
| **Monitoring** | Winston logs; `/health` dependency checks; queue counts | Present (basic) |
| **Security** | Helmet, CORS whitelist, rate limits, Joi, bcrypt, JWT type checks, 1mb body limit | Present |
| **Payments** | Prepaid wallet ledger; payment gateway webhook stubbed in comments | **Partial / designed** |
| **Messaging** | Meta WhatsApp Cloud API + BullMQ | Present |
| **Caching** | Redis used as queue broker (not response cache) | Present |
| **Search** | None | — |
| **AI APIs** | None | — |
| **Developer tools** | Swagger UI, credential debug script, nodemon | Present |
| **Build tools** | Native Node; Docker multi-service | Present |
| **Version control** | Git + GitHub | Present |
| **CI/CD** | No GitHub Actions/CI config found | **Gap** |
| **Package managers** | npm | Present |
| **Environment** | dotenv + fail-fast required env validation | Present |

---

## 4. Architecture

### Overall architecture

**Layered MVC-S + Provider + Worker:**

```
Client → Express (Helmet/CORS/JSON) → RequestId → Routes
  → Auth / RateLimit / Joi Validate → Controller → Service
    → MongoDB (ACID session) + BullMQ (Redis)
Worker (concurrency + rate limiter) → WhatsApp Provider (Axios) → Meta Graph API
Worker events → Campaign status updates + Wallet refunds
```

### Frontend architecture

N/A in-repo. API contracts explicitly support frontend shorthand (`template.parameters`) and per-recipient maps.

### Backend architecture

| Layer | Responsibility |
|---|---|
| `routes/` | Endpoint wiring + middleware composition |
| `controllers/` | HTTP only; `sendSuccess` / `next(error)` |
| `services/` | Business logic, transactions, queueing |
| `models/` | Mongoose schemas + indexes |
| `providers/` | External Meta API isolation |
| `jobs/` | BullMQ worker, retries, refunds |
| `middlewares/` | Auth, validation, rate limit, errors, request IDs |
| `validators/` | Joi schemas |
| `config/` | Env, DB, Redis, logger, Swagger |
| `utils/` | `AppError`, response envelope |

### Folder structure (high signal)

Clean domain separation: users, messages, campaigns, wallet. Coding standards documented in `.agents/skills/whatsapp-backend-standards/SKILL.md`.

### API architecture

Versioned under `/api/v1/*`, uniform success envelope `{ success, data, message }`, OpenAPI 3 at `/api-docs`.

### Authentication flow

1. Register/Login → bcrypt verify → issue access (`type: "access"`) + refresh (`type: "refresh"`)
2. Protected routes: `Authorization: Bearer <access>`
3. Middleware rejects non-access tokens
4. Refresh endpoint verifies refresh JWT and issues new access token (**stateless; no DB read**)

### Authorization

- JWT identity on protected routes
- Campaign list scoped to `req.user.id`
- **Gap:** `GET /campaigns/:id` does not verify campaign ownership before returning full detail

### Database relationships

```
User 1──* Campaign (userId string)
User 1──* Transaction (ObjectId ref)
Campaign embeds recipients[] + events[]
Transaction references campaign/recharge/refund via referenceType + referenceId
```

### Request lifecycle (send message)

1. Auth + rate limit + Joi validation
2. Start Mongo session/transaction
3. Create campaign (pending recipients)
4. Atomic wallet debit (`walletBalance >= cost`) + ledger write
5. `addBulk` BullMQ jobs (Redis failure aborts DB txn)
6. Bulk-write job IDs onto recipients
7. Commit → return campaign summary
8. Worker sends via Meta → updates recipient → completes campaign; on failure → refund 1 token

### Error handling

`AppError` (operational) vs unexpected errors; production hides stacks; controllers never swallow failures.

### Caching

Redis as durable job backlog, not HTTP cache.

### Performance design

Async queue, bulk job insert, atomic campaign updates, lean projections, cursor pagination, Mongo pool sizing, worker concurrency=5 + Meta-aware limiter (100/sec).

### Deployment architecture

Docker Compose: `app` (Node 18 Alpine) + `redis:alpine`; Mongo external via `MONGO_URI`.

### Scalability posture

Horizontally scalable workers (shared Redis queue); API stateless; wallet correctness depends on Mongo transactions (needs replica set).

### Future improvements

Separate API/worker processes; payment webhooks; ownership checks; idempotency keys; webhook delivery receipts; CI/tests; refresh-token store/rotation.

---

## 5. Database

### Collections

| Collection | Purpose |
|---|---|
| **users** | Identity, credentials, `walletBalance` |
| **campaigns** | Campaign aggregate + embedded recipients/events |
| **transactions** | Immutable-ish ledger of credits/debits |

### Relationships

- User → Campaigns (logical via `userId`)
- User → Transactions (`ObjectId` ref)
- Transaction → Campaign/payment via `referenceId`

### Indexes

| Index | Why |
|---|---|
| `users.email` unique | Auth lookup |
| `campaigns.userId` | Ownership queries |
| `campaigns.{userId, createdAt}` | User history |
| `campaigns.status` | Status filters |
| `transactions.userId` | Ledger |
| `transactions.referenceId` | Reconciliation |
| `transactions.{userId, _id}` | Cursor history |

### Schema design highlights

- Embedded recipients for campaign locality (read campaign = full delivery picture)
- Event log for audit trail
- Wallet min constraint at schema level
- Password `select: false`

### Normalization / denormalization

- **Normalized:** Users + Transactions
- **Denormalized:** Recipients/events inside Campaign (good for campaign detail; can bloat large blasts)

### Data flow

Credit → User.walletBalance↑ + Transaction  
Debit on send → Campaign create + balance↓ + Transaction  
Failure → refund credit Transaction

### CRUD

Users (create/read), Campaigns (create/read/update status), Transactions (create/read), Wallet (read balance)

### Validation

Mongoose constraints + Joi at edge + atomic `$gte` debit guard

### Security

Hashed passwords; secrets in env; no password in responses (`toSafeObject`)

---

## 6. APIs

**Auth:** Bearer JWT (except register/login/refresh/status/health/docs)  
**Response:** `{ success: true, data, message }` / `{ success: false, message }`  
**Rate limiting:** `authLimiter` 15/15m on register/login; `apiLimiter` 100/15m on send (keyed by userId or IP)  
**Pagination:** Cursor (`limit`, `cursor`, `hasMore`, `nextCursor`) for campaigns/transactions; page/limit helper still exists in service for admin-style listing

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/api/v1/users/register` | Create account | No (+ authLimiter) |
| POST | `/api/v1/users/login` | Login | No (+ authLimiter) |
| POST | `/api/v1/users/refresh-token` | New access token | Refresh body |
| GET | `/api/v1/users/profile` | Profile | Yes |
| POST | `/api/v1/users/swagger-token` | Swagger OAuth bridge | Form login |
| POST | `/api/v1/messages/send` | Create campaign + queue | Yes |
| GET | `/api/v1/messages/status` | Queue counts | **Open** |
| GET | `/api/v1/campaigns` | My campaigns (cursor) | Yes |
| GET | `/api/v1/campaigns/my` | Alias of above | Yes |
| GET | `/api/v1/campaigns/:id` | Campaign detail | Yes (**no ownership check**) |
| GET | `/api/v1/wallet/balance` | Token balance | Yes |
| GET | `/api/v1/wallet/transactions` | Ledger history | Yes |
| GET | `/health` | Liveness + mongo/redis | No |
| GET | `/api-docs` | OpenAPI UI | No |

**Send validation highlights:** 1–100 numbers, `^\d{10,15}$`, text|template, `.or("message","template")`, per-recipient keys must ⊆ numbers.

**Notable status codes:** 402 insufficient balance; 409 email exists; 401 auth; 400 validation.

---

## 7. Features

| Feature | Purpose | Implementation | Challenges | Why it matters |
|---|---|---|---|---|
| **Bulk WhatsApp send** | Fan-out messages | Campaign + BullMQ `addBulk` | Meta limits, partial failures | Core product |
| **Template messaging** | Business-initiated WhatsApp templates | Provider payload + Joi | Meta schema complexity | Required outside 24h window |
| **Per-recipient parameters** *(uncommitted)* | Personalize body vars per number | Normalize shorthand → Meta components; override map | Validation of keys vs numbers | Real campaign UX |
| **JWT auth** | Multi-tenant API access | Access/refresh token types | Token-type confusion attacks | SaaS readiness |
| **Prepaid wallet** | Monetize sends (1 token/recipient) | Atomic `$inc` with `$gte` | Race conditions / double-spend | Business model integrity |
| **ACID campaign+debit** | All-or-nothing billing | Mongo session spanning campaign, wallet, jobs | Redis failure mid-flight | Trust & ledger correctness |
| **Auto-refund** | Fair billing on Meta failure | Worker `failed` → `refundPoints` | Retry vs final-failure semantics | Customer trust |
| **Campaign tracking** | Delivery observability | Recipient status + counters + events | Concurrent updates | Ops/support |
| **Cursor pagination** | Scale lists | `_id` cursor + `limit+1` | Skip/limit degradation | Large histories |
| **Queue observability** | Ops visibility | BullMQ job counts | — | Debugging throughput |
| **Swagger docs** | Self-serve integration | OpenAPI 3 + OAuth password flow | Keeping docs in sync | DX |
| **Docker Compose** | Reproducible runtime | App + Redis | Mongo not in compose | Onboarding |
| **Credential debugger** | Ops tooling | Graph API introspection script | Token/ID confusion | Faster Meta setup |
| **Dependency health** | Degraded vs ok | Mongo readyState + Redis status | False greens | Production readiness |

---

## 8. UI/UX

This is an API product. UX surfaces:

| Aspect | Reality |
|---|---|
| Design system | N/A |
| Responsive UI | N/A |
| Accessibility | N/A (Swagger only) |
| Animations | N/A |
| Loading states | Async queue: API returns immediately with `queued` |
| Error states | Structured JSON; 402/401/400/409 semantics |
| User flows | Register → Login → (fund wallet*) → Send → Poll campaign → View ledger |
| Navigation | REST resources + `/api-docs` |
| Performance UX | Fast HTTP acknowledgment; delivery async |

\*Funding endpoint for end users is not exposed yet; `addFunds` exists in service layer.

---

## 9. Engineering Challenges

### Challenge A — Preventing wallet double-spend under concurrency

- **Problem:** Two simultaneous campaigns could overdraw balance
- **Why hard:** Read-modify-write races
- **Alternatives:** Pessimistic locks, serial queue per user, atomic conditional update
- **Chosen:** `findOneAndUpdate({ walletBalance: { $gte: amount } }, { $inc: -amount })` inside Mongo transaction
- **Tradeoff:** Requires replica set for transactions; simpler than distributed locks
- **Lesson:** Money paths need atomic predicates, not application-level checks

### Challenge B — Keeping campaign create, debit, and enqueue consistent

- **Problem:** Debit without jobs = customer loss; jobs without debit = free sends
- **Chosen:** Mongo transaction; Redis enqueue failure aborts txn
- **Tradeoff / risk:** Jobs enqueued before commit can theoretically exist if process dies after enqueue but before commit—classic dual-write tension *(assumption/risk to discuss in interviews)*
- **Lesson:** Outbox pattern is the next hardening step

### Challenge C — Meta API rate limits & reliability

- **Problem:** Bulk sends exceed Graph API quotas; transient failures
- **Chosen:** BullMQ retries (3, exponential), worker concurrency 5, limiter 100/sec
- **Tradeoff:** Throughput capped by design; retries amplify load
- **Lesson:** Provider limits belong in the worker, not the controller

### Challenge D — Fair refunds on failure

- **Problem:** Charged tokens for undelivered messages
- **Chosen:** Worker failure path refunds 1 token
- **Tradeoff / risk:** BullMQ `failed` may fire per attempt; without `job.attemptsMade === job.opts.attempts` guard, over-refund is possible—**worth fixing and excellent interview talking point**

### Challenge E — Template DX for frontends

- **Problem:** Meta component schema is verbose
- **Chosen:** Accept shorthand `parameters` + per-recipient maps; normalize in service
- **Tradeoff:** Extra transformation layer vs stricter Meta-only API
- **Lesson:** Backend can absorb provider complexity for product velocity

---

## 10. Performance Optimizations

| Technique | Present? | Notes |
|---|---|---|
| Lazy loading | N/A | Backend |
| SSR/SSG/ISR/CSR | N/A | No frontend framework |
| Memoization | No | — |
| Caching | Queue only | Not response cache |
| Image optimization | N/A | — |
| Bundle optimization | Docker `npm ci --only=production` | Smaller image |
| DB optimization | Indexes, lean(), projections excluding recipients/events on lists, atomic updates, pool 5–20 | Strong |
| API optimization | Async queue; bulk job add; bulkWrite jobIds | Strong |
| Network | Axios to Meta from workers | Isolates latency from clients |
| Rendering | N/A | — |
| Pagination | Cursor-based | Scales better than skip |

---

## 11. Security

| Control | Implementation |
|---|---|
| Authentication | JWT Bearer |
| Authorization | Route-level auth; user-scoped lists |
| JWT | Access vs refresh type claim |
| Cookies | Not used (token-in-body/header model) |
| Input validation | Joi + Mongoose |
| XSS | Limited relevance (JSON API); Helmet helps |
| CSRF | Low risk for Bearer APIs; no cookie session |
| Rate limiting | Auth + API limiters |
| Password hashing | bcrypt cost 12 |
| Secrets | `.env`; fail-fast required vars |
| API security | Helmet, CORS origins, 1mb body limit |
| Gaps | No refresh revocation/rotation store; campaign-by-id IDOR risk; `/messages/status` public; no CI security scans |

---

## 12. AI Usage

**Not applicable.** No LLMs, embeddings, RAG, or AI APIs.

**Portfolio tip:** Do not claim AI skills from this project. Optional roadmap: AI copy assist for campaign drafts, anomaly detection on failure rates.

---

## 13. Third-party Integrations

| Integration | Purpose | Implementation | Challenges | Limitations |
|---|---|---|---|---|
| **Meta WhatsApp Cloud API** | Send text/template messages | Axios provider | Auth tokens, phone number ID, template approval, rate limits | Business verification; template policies; cost |
| **Redis** | BullMQ broker | ioredis | Persistence/HA | Compose maps host 6380→6379 |
| **MongoDB** | System of record | Mongoose | Transactions need replica set | Embedded arrays for huge campaigns |
| **Swagger UI** | Interactive docs | swagger-jsdoc + ui-express | Doc drift | Not a substitute for SDK |

---

## 14. DevOps

| Area | Current state |
|---|---|
| Deployment | `Dockerfile` (node:18-alpine) + `docker-compose` |
| Hosting | Not specified |
| CI/CD | Not present |
| Monitoring | Health endpoint + Winston |
| Logging | Dev colorized; prod JSON timestamps |
| Backups | Not defined (**assumption:** rely on Mongo host backups) |
| Scaling | Scale workers via more Node processes sharing Redis |
| Env management | `.env.example`, required-var boot checks |
| Graceful shutdown | Closes HTTP, worker, Redis, Mongo on signals/errors |

---

## 15. Metrics

| Metric | Value | Confidence |
|---|---|---|
| Commits | 5 (+ WIP) | Measured |
| Source files | ~42 tracked project files | Measured |
| LOC (approx) | ~3–5k across src + docs | **Estimate** |
| Users | Unknown | No production telemetry in repo |
| Requests/day | Unknown | **Assumption if demo:** hundreds–low thousands |
| DB size | Unknown | — |
| API latency (queue ack) | Likely tens–low hundreds ms | **Estimate** (local txn + Redis) |
| Delivery latency | Seconds–minutes depending on queue depth | **Estimate** |
| Lighthouse / SEO | N/A (API) | — |
| Accessibility | N/A | — |
| Worker throughput design | Up to ~100 msgs/sec limiter | Configured |

---

## 16. Engineering Decisions

| Decision | Why | Tradeoffs |
|---|---|---|
| **Express** | Mature ecosystem, clear middleware pipeline, fast delivery | Less structure than Nest; discipline required |
| **MongoDB** | Flexible campaign documents, embedded recipients, fast iteration | Transactions need replica set; large embeds |
| **BullMQ + Redis** | Reliable retries, rate limiting, concurrency | Extra infra; dual-write complexity |
| **Stateless JWT** | Simple horizontal scale; refresh without DB | Harder revocation; refresh theft window |
| **Provider pattern** | Isolate Meta API | Extra layer |
| **MVC-S** | Testable boundaries, agent-friendly conventions | Boilerplate |
| **Prepaid tokens** | Simple billing primitive before full payments | Needs gateway later |
| **Swagger inline OpenAPI** | Single source for integrators | Large config file |
| **Not Nest/GraphQL** | Speed + control for this scope | Less built-in DI/module system |

**Why not Next.js/React here?** This repo solves backend reliability/billing. Claiming “Next.js portfolio project” would be inaccurate—claim **backend / platform / full-stack API engineering**.

---

## 17. Scalability

| Scale | Feasibility | What changes |
|---|---|---|
| **100 users** | Yes as-is | Nothing critical |
| **1,000 users** | Yes | Monitor Redis/Mongo; separate worker process |
| **10,000 users** | Likely with ops | Horizontal API+workers; Mongo indexes/replica; Redis HA; payment webhooks; ownership/security hardening |
| **100,000 users** | Needs redesign | Shard hot collections; campaign recipient store split; outbox; per-tenant rate limits; observability stack; CDN/API gateway |
| **1M users** | Not with current monolith shape | Multi-region, partitioned queues, dedicated billing service, Kafka/outbox, template/media pipeline, SRE practices |

**Bottlenecks today:** Meta API quotas, single Redis, embedded recipient arrays, in-process worker colocated with API, lack of tests/CI.

---

## 18. Code Quality

| Signal | Assessment |
|---|---|
| Folder organization | Strong, domain-aligned |
| Reusable components | N/A (backend); shared middlewares/utils strong |
| Custom hooks | N/A |
| Utilities | `AppError`, `sendSuccess`, validate pick helper |
| Constants | Mostly env-driven |
| Clean architecture | Good separation; controllers thin |
| Naming | Clear service/controller/model conventions |
| Documentation | Excellent OpenAPI + README + agent skill standards |
| Tests | Missing—biggest quality gap |
| Lint | `eslint` script referenced; eslint not in package.json deps (**gap**) |

---

## 19. SEO

N/A for a pure API. Portfolio site (separate) should add meta/OG for the case study page. API SEO substitutes: OpenAPI discoverability, clear README, public GitHub.

---

## 20. Resume Highlights

### 10 resume bullets

1. Designed and shipped a Node.js/Express WhatsApp Cloud API platform with JWT auth, campaign tracking, and OpenAPI documentation.
2. Built BullMQ/Redis async delivery with retries, concurrency controls, and Meta-aware rate limiting (100 msg/s).
3. Implemented ACID MongoDB transactions spanning campaign creation, prepaid wallet debit, and job enqueue.
4. Prevented wallet race conditions using atomic conditional balance updates (`$gte` + `$inc`).
5. Created a prepaid token ledger with credit/debit/refund flows and cursor-paginated transaction history.
6. Automated refunds when WhatsApp delivery jobs permanently fail, protecting billing fairness.
7. Modeled campaigns with per-recipient status, event audit trails, and completion aggregation.
8. Hardened the API with Helmet, CORS allowlists, Joi validation, auth brute-force limits, and request IDs.
9. Delivered production observability via Winston JSON logs, dependency health checks, and graceful shutdown.
10. Packaged the service with Docker/Compose and interactive Swagger OAuth login for integrator DX.

### 10 LinkedIn bullets

1. Built a scalable WhatsApp messaging backend on Node.js, MongoDB, Redis, and Meta Cloud API.
2. Turned bulk messaging into billable campaigns with prepaid wallets and ledger accounting.
3. Used queue-driven architecture so API responses stay fast under large recipient lists.
4. Focused on data integrity: transactions, atomic deductions, and failure refunds.
5. Added JWT access/refresh auth with token-type enforcement.
6. Optimized list APIs with cursor pagination and lean projections.
7. Documented the full API surface with OpenAPI 3 + Swagger UI.
8. Applied production hardening: rate limits, payload caps, structured logging.
9. Supported personalized template sends via per-recipient parameter maps.
10. Owned the system end-to-end—from schema design to Docker deployment.

### 10 ATS-friendly achievements

1. Developed RESTful WhatsApp messaging API using Node.js and Express.
2. Integrated Meta WhatsApp Cloud API for text and template messages.
3. Implemented JWT authentication and bcrypt password hashing.
4. Designed MongoDB schemas for users, campaigns, and transactions.
5. Implemented Redis BullMQ job queues for asynchronous message processing.
6. Applied MongoDB ACID transactions for wallet and campaign consistency.
7. Implemented API rate limiting and input validation with Joi.
8. Created OpenAPI Swagger documentation for developer onboarding.
9. Containerized application using Docker and Docker Compose.
10. Implemented structured logging and health checks for production monitoring.

---

## 21. Portfolio Highlights

**Project description**  
WhatsApp Message Service is a multi-tenant messaging API that queues and delivers WhatsApp campaigns through Meta’s Cloud API, with prepaid wallet billing, delivery tracking, and automatic refunds.

**Technical summary**  
Express MVC-S backend, MongoDB/Mongoose, Redis/BullMQ workers, JWT auth, Joi validation, Winston logging, Dockerized deployment, OpenAPI docs.

**Business summary**  
Enables SMBs/platforms to send personalized WhatsApp outreach with predictable prepaid costs and auditable campaign outcomes.

**Architecture summary**  
Stateless API + async workers; ACID write path for billing; provider isolation for Meta; campaign aggregate for observability.

**Feature summary**  
Auth, wallet, bulk/template send, personalization, campaigns, ledger, queue status, health, Swagger.

**Challenges**  
Dual-write consistency, wallet races, Meta rate limits, fair refunds, template DX.

**Results** *(label estimates)*  

- API acknowledges bulk campaigns without waiting on Meta
- Wallet cannot go negative under concurrent debit attempts
- Failed deliveries can reclaim tokens
- Integrators can auth and try APIs via Swagger

**Key achievements**  
Solo-built production-minded CPaaS backend with billing integrity—not just a “send message” demo.

---

## 22. Interview Preparation

### 20 questions + ideal answer cues + follow-ups

1. **Walk me through the send-message path.**  
   *Answer:* Auth → validate → Mongo txn (campaign + debit + enqueue) → commit → worker → Meta → status/refund.  
   *Follow-up:* What if Redis succeeds and commit fails?

2. **How do you prevent negative wallet balances?**  
   *Answer:* Atomic `findOneAndUpdate` with `$gte`.  
   *Follow-up:* Why not read balance then save?

3. **Why BullMQ instead of sending in the request?**  
   *Answer:* Latency, retries, rate limits, horizontal workers.  
   *Tradeoff:* Complexity vs sync simplicity.

4. **Explain your JWT design.**  
   *Answer:* Access vs refresh type claims; middleware rejects refresh-as-access.  
   *Follow-up:* How would you revoke a stolen refresh token?

5. **How does campaign completion work?**  
   *Answer:* Atomic recipient update increments counters; when processed >= total, mark completed/failed.  
   *Follow-up:* Concurrent last-two recipients race?

6. **What indexes matter most and why?**  
   *Answer:* email unique; userId+createdAt; txn userId+_id for cursors.

7. **Why embedded recipients?**  
   *Answer:* Locality for campaign detail reads.  
   *Tradeoff:* Document size at 10k+ recipients.

8. **How do you handle Meta rate limits?**  
   *Answer:* Worker limiter 100/s + concurrency 5 + retries.

9. **What’s wrong with refunding on every `failed` event?**  
   *Answer:* May refund per attempt; should check final failure. *(shows maturity)*

10. **How is the API secured?**  
    Helmet, CORS, Joi, rate limits, bcrypt, JWT, body limit, env secrets.

11. **Describe pagination strategy.**  
    Cursor `_id` + limit+1 → hasMore; better than skip at scale.

12. **Why provider pattern?**  
    Swap/mocks Meta; keeps services clean.

13. **Production logging strategy?**  
    JSON Winston + request IDs for correlation.

14. **Graceful shutdown—what do you close and in what order?**  
    HTTP → worker → Redis → Mongo.

15. **How would you add payment gateway top-ups?**  
    Webhook → idempotent `addFunds` with gateway referenceId uniqueness.

16. **Mongo transactions requirements?**  
    Replica set; session pass-through; abort on errors.

17. **IDOR risk on campaign get-by-id?**  
    Acknowledge; fix by filtering `{ _id, userId: req.user.id }`.

18. **How would you test this system?**  
    Unit services; integration with mongodb-memory-server; queue worker tests; contract tests for OpenAPI.

19. **Scale to 100k users—first three changes?**  
    Split workers; Redis/Mongo HA; outbox + recipient collection split + metrics.

20. **Why not GraphQL?**  
    Resource APIs fit; OpenAPI ecosystem; queue side-effects map cleanly to POST commands.

---

## 23. Skills Demonstrated

| Category | Evidence |
|---|---|
| **Frontend** | API-for-frontend design (shorthand params); Swagger DX—not UI engineering |
| **Backend** | Express, services, workers, providers |
| **Database** | Schema design, indexes, transactions, atomic updates |
| **Cloud** | Meta Graph API integration; containerization |
| **Architecture** | Layered + queue + billing consistency |
| **DevOps** | Docker, health, graceful shutdown |
| **Security** | AuthN/Z basics, hardening middleware |
| **Performance** | Async offload, pools, cursors, bulk ops |
| **Leadership** | Solo ownership; coding standards skill for agents/team |
| **Product thinking** | Wallet economy, refunds, campaigns, templates |
| **Problem solving** | Race conditions, dual writes, provider limits |
| **Communication** | Commit messages, OpenAPI, README |

---

## 24. Hidden Skills (often missed by recruiters)

1. **Financial integrity engineering** (ledger + atomic debit)
2. **Dual-write / consistency reasoning** (DB + queue)
3. **Backpressure & rate limiting** at worker layer
4. **Operational excellence** (request IDs, degraded health)
5. **API product design** (402 Payment Required, campaign as aggregate root)
6. **DX engineering** (Swagger OAuth bridge, template shorthand)
7. **Failure economics** (auto-refund)
8. **Cursor pagination literacy**
9. **12-factor config discipline** (fail-fast env)
10. **Production shutdown correctness**
11. **Domain modeling** (campaign events as audit log)
12. **Standards-as-code** (agent skill enforcing architecture)

---

## 25. Portfolio Assets to Create

| Asset | What to show |
|---|---|
| Architecture diagram | Client → API → Mongo/Redis → Worker → Meta |
| Sequence: send campaign | ACID txn + enqueue |
| Sequence: failure refund | Worker failed → status → refund |
| ER / document model | User–Campaign–Transaction |
| Auth flow | Login → access/refresh → protected send |
| Deployment diagram | Compose services + external Mongo/Meta |
| Wallet state machine | credit/debit/refund |
| Campaign state machine | queued → processing → completed/failed |
| Before/after reliability | Sync send vs queue architecture |
| OpenAPI screenshot | Swagger authorize + send example |
| Throughput sketch | 100/s limiter math |

---

## 26. STAR Stories

### STAR 1 — Wallet race conditions

- **S:** Bulk campaign sends can overlap for one user.
- **T:** Ensure balance never goes negative and charges match recipients.
- **A:** Atomic conditional debit + Mongo transaction with campaign + ledger.
- **R:** Double-spend prevented at DB level; insufficient funds returns 402.

### STAR 2 — Async delivery under Meta limits

- **S:** Meta throttles and fails transiently.
- **T:** Keep API fast and delivery reliable.
- **A:** BullMQ bulk enqueue, concurrency 5, 100/s limiter, exponential retries.
- **R:** HTTP path decoupled from provider latency; retries without user resubmit.

### STAR 3 — Fair billing on failures

- **S:** Users would resent paying for failed WhatsApp sends.
- **T:** Refund automatically on job failure.
- **A:** Worker failure handler updates recipient and calls `refundPoints`.
- **R:** Ledger reflects refunds; trust preserved *(note follow-up: finalize-only refund guard)*.

### STAR 4 — Production hardening pass

- **S:** Early API lacked ops/security polish.
- **T:** Make it deployable and safer.
- **A:** Helmet/CORS/rate limits/request IDs/JSON logs/dependency health/AppError envelope.
- **R:** Clear operational story for production interviews.

### STAR 5 — Frontend-friendly templates

- **S:** Meta template payload is cumbersome for clients.
- **T:** Accept simple parameter arrays and personalize per recipient.
- **A:** Service-layer normalization + Joi custom validation.
- **R:** Faster client integration without leaking Meta complexity.

---

## 27. Business Impact

| Impact area | Estimate (labeled) |
|---|---|
| Time saved vs manual WhatsApp | **Assumption:** hours/week for SMB outreach teams |
| Automation | Bulk campaigns + retries without human re-send |
| Revenue model | Prepaid tokens (1 per recipient) — foundation for SaaS billing |
| UX improvement | Immediate queue ack; campaign visibility; personalized templates |
| Operational improvement | Health checks, structured logs, queue metrics, Docker onboarding |
| Risk reduction | Atomic billing + refunds reduce support disputes |

---

## 28. Future Roadmap

| Initiative | Why |
|---|---|
| Split API / worker processes | Independent scale |
| Transactional outbox | Fix DB/queue dual-write edge cases |
| Payment webhooks (Razorpay/Stripe) | Real recharge |
| Redis HA + Mongo Atlas | Production durability |
| Recipient subcollection / bucketing | Large campaigns |
| Webhook ingestion (delivered/read) | True delivery receipts |
| Idempotency keys | Safe client retries |
| Refresh token store + rotation | Security |
| Jest/Supertest + CI | Quality gate |
| API gateway / Kong | Tenant quotas |
| Kafka/NATS event bus | Fan-out analytics |
| GraphQL/BFF | Only if dashboard needs aggregation |
| Elasticsearch | Campaign search/analytics |
| Kubernetes | Multi-replica workers |
| AI assist | Message copy / best-send-time *(optional)* |

---

## 29. Recruiter Summary

Rahul built a real **messaging platform backend**, not a tutorial CRUD app. The WhatsApp Message Service shows he can design multi-tenant APIs, protect money-like balances under concurrency, integrate third-party provider constraints through queues, and ship production concerns—auth, validation, rate limits, observability, Docker, and OpenAPI—as a coherent product. Even without a UI in-repo, the system demonstrates senior-leaning backend judgment: ACID billing paths, campaign aggregates, cursor pagination, and failure-aware refunds. That combination of product thinking and systems correctness is exactly what hiring managers look for in Full Stack / Backend engineers who can own a service end-to-end.

---

## 30. Portfolio Content (copy-ready)

### Hero section

**WhatsApp Message Service**  
*Prepaid, queue-backed WhatsApp campaigns with ACID billing and Meta Cloud API delivery.*  
CTA: View Case Study · GitHub · API Docs

### Short project card

Scalable Node.js messaging API that queues WhatsApp sends via BullMQ, tracks campaigns in MongoDB, and enforces prepaid wallet integrity with automatic refunds.

### Detailed case study (short form)

Businesses need reliable WhatsApp outreach, but Meta’s API is rate-limited and failure-prone, and billing must stay accurate. I built a multi-tenant Express service where sending a campaign atomically creates delivery records, deducts tokens, and enqueues jobs. Workers deliver through the WhatsApp Cloud API with retries and rate limits; failures update campaign state and refund tokens. The result is a SaaS-ready messaging backend with JWT auth, ledger history, and full OpenAPI documentation.

### Feature list

- JWT register/login/refresh
- Bulk text & template messaging
- Per-recipient template personalization
- Prepaid wallet + ledger
- Auto-refund on delivery failure
- Campaign tracking & events
- Cursor pagination
- Swagger OAuth-ready docs
- Dockerized Redis + app
- Dependency health checks

### Tech stack (display)

Node.js · Express · MongoDB · Mongoose · Redis · BullMQ · JWT · Joi · Winston · Helmet · Docker · Meta WhatsApp Cloud API · OpenAPI/Swagger

### Challenges → Solutions

| Challenge | Solution |
|---|---|
| Concurrent overdrafts | Atomic conditional debit |
| Slow/flaky Meta sends | BullMQ retries + rate limiter |
| Charge without delivery | Failure refunds |
| Heavy campaign lists | Cursor pagination + projections |
| Integrator friction | Swagger + template shorthand |

### Engineering highlights

- MongoDB sessions for campaign + wallet atomicity
- Provider isolation for Meta
- Request-ID correlated logging
- Fail-fast configuration
- Graceful shutdown of HTTP/worker/Redis/Mongo

### Architecture overview (one paragraph)

Clients hit a versioned REST API; protected controllers call services that write to MongoDB and enqueue BullMQ jobs on Redis; a concurrent worker sends via a WhatsApp provider and writes delivery outcomes back to campaigns, refunding wallet tokens when jobs fail.

### Screenshots to include

1. Swagger UI authorize + send template example
2. Architecture diagram
3. Sample campaign detail JSON (success/fail mix)
4. Wallet transactions response
5. Docker Compose topology
6. Health check degraded vs ok

### Metrics to showcase

- 100 messages/sec worker limiter (design capacity)
- 3 retries with exponential backoff
- ≤100 recipients per request (safety cap)
- 15 auth attempts / 15 min brute-force guard
- Solo-built in ~5 iterative production commits

### Timeline

| Date | Milestone |
|---|---|
| Mar 5, 2026 | Initial queue-based WhatsApp service |
| Mar 5, 2026 | Campaign logging + optimized queries |
| Mar 8, 2026 | JWT auth + Swagger |
| Mar 9, 2026 | Security/observability hardening |
| Mar 9, 2026 | ACID wallet + auto-refunds |
| Later WIP | Per-recipient template parameters |

### Lessons learned

- Billing paths need atomic DB primitives.
- Queues are mandatory at provider boundaries.
- Docs and DX are part of the product.
- Observability and shutdown behavior signal production maturity.
- Always define “final failure” before refunding.

### Future improvements

Payment webhooks, outbox pattern, ownership checks, CI/tests, split workers, delivery webhooks, refresh-token revocation.

---

## Honest positioning guide (important for portfolio credibility)

| Claim carefully | Better framing |
|---|---|
| “Full Stack app with React/Next” | “Full Stack–capable engineer; this case study is a **backend messaging platform** designed for frontend clients” |
| “Production at 1M users” | “Architected for horizontal workers; validated patterns for early SaaS scale” |
| “Payments integrated” | “Prepaid ledger ready for payment-gateway webhooks” |
| “AI-powered WhatsApp” | Do not claim |
| “Complete test coverage” | “Next milestone: automated integration tests” |

---

## Suggested portfolio title options

1. **ACID-Billed WhatsApp Campaign Platform**
2. **Queue-Driven WhatsApp Cloud API with Prepaid Wallets**
3. **Multi-Tenant Messaging Backend (Meta + BullMQ + MongoDB)**
