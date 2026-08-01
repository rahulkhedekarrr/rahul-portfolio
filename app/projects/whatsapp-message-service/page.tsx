import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CaseStudyShell from "../../../components/case-study/CaseStudyShell";
import SectionLabel from "../../../components/case-study/SectionLabel";
import { createPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "WhatsApp Message Service",
  description:
    "Queue-backed WhatsApp Cloud API platform with JWT auth, prepaid wallet billing, campaign tracking, and automatic refunds on delivery failure.",
  path: "/projects/whatsapp-message-service",
});

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "challenges", label: "Challenges" },
  { id: "tech", label: "Tech" },
];

const stats = [
  { label: "Worker limiter", value: "~100/sec" },
  { label: "Retries", value: "3× backoff" },
  { label: "Recipients / req", value: "≤100" },
  { label: "Auth guard", value: "15 / 15m" },
];

const features = [
  "JWT register / login / refresh",
  "Bulk text & template messaging",
  "Per-recipient template personalization",
  "Prepaid wallet + ledger",
  "Auto-refund on delivery failure",
  "Campaign tracking & events",
  "Cursor pagination",
  "Swagger OAuth-ready docs",
  "Dockerized app + Redis",
  "Dependency health checks",
];

const challenges = [
  {
    challenge: "Concurrent wallet overdrafts",
    solution: "Atomic conditional debit with MongoDB sessions",
  },
  {
    challenge: "Slow / flaky Meta sends",
    solution: "BullMQ retries + rate limiter at the worker boundary",
  },
  {
    challenge: "Charge without delivery",
    solution: "Failure classification with automatic token refunds",
  },
  {
    challenge: "Heavy campaign lists",
    solution: "Cursor pagination + projections for list endpoints",
  },
];

const techBadges = [
  "Node.js",
  "Express",
  "MongoDB",
  "Mongoose",
  "Redis",
  "BullMQ",
  "JWT",
  "Joi",
  "Winston",
  "Helmet",
  "Docker",
  "Meta WhatsApp Cloud API",
  "OpenAPI / Swagger",
];

export default function WhatsappMessageServicePage() {
  return (
    <CaseStudyShell navItems={navItems}>
      <section className="mb-14 border border-sharp bg-sharp-surface">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-sharp p-6 sm:p-8 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sharp-accent">
              Case study // 03
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-sharp-fg sm:text-4xl md:text-5xl">
              WhatsApp Message Service
            </h1>
            <p className="mb-6 text-sharp-muted">
              Prepaid, queue-backed WhatsApp campaigns with ACID billing and
              Meta Cloud API delivery — designed for frontend clients, not a
              demo UI.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#architecture" className="btn-sharp btn-sharp-primary">
                View architecture
              </a>
              <a href="#features" className="btn-sharp btn-sharp-outline">
                Features
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-sharp-muted">
              Role · Backend / platform engineer
            </p>
          </div>
          <div className="relative aspect-[16/10] min-h-[220px] w-full md:aspect-auto md:min-h-full">
            <Image
              src="/images/whatsapp-message-service.svg"
              alt="WhatsApp message service architecture cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-sharp md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-5 sm:px-5 ${
                i < stats.length - 1 ? "border-r border-sharp" : ""
              } ${i < 2 ? "border-b border-sharp md:border-b-0" : ""}`}
            >
              <div className="text-xl font-bold text-sharp-fg sm:text-2xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-sharp-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="overview" className="mb-12 scroll-mt-24">
        <SectionLabel index="01" title="Overview" />
        <p className="max-w-3xl leading-relaxed text-sharp-muted">
          Direct Meta API calls are slow, rate-limited, and hard to bill.
          Businesses need reliable bulk send, personalization, wallet
          accounting, and campaign observability. This service productizes
          WhatsApp outreach: register → fund wallet → send campaign → track
          outcomes → refund on permanent failures — without blocking the HTTP
          request path.
        </p>
      </section>

      <section id="architecture" className="mb-12 scroll-mt-24">
        <SectionLabel index="02" title="Architecture" />
        <p className="mb-4 max-w-3xl leading-relaxed text-sharp-muted">
          Layered Express API: routes → auth/validation → controllers →
          services. Campaign creation atomically writes MongoDB records, deducts
          tokens, and enqueues BullMQ jobs. Workers deliver via a WhatsApp
          provider isolation layer and write outcomes back — refunding the
          wallet when jobs fail.
        </p>
        <ul className="max-w-3xl space-y-2">
          {[
            "Versioned REST under /api/v1 with uniform success envelopes",
            "Provider pattern isolates Meta Graph API",
            "Request-ID correlated Winston logging",
            "Docker Compose for app + Redis; graceful shutdown",
          ].map((item) => (
            <li
              key={item}
              className="border-l border-sharp pl-4 text-sm leading-relaxed text-sharp-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="features" className="mb-12 scroll-mt-24">
        <SectionLabel index="03" title="Features" />
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f}
              className="border border-sharp bg-sharp-surface px-4 py-3 text-sm text-sharp-muted"
            >
              {f}
            </div>
          ))}
        </div>
      </section>

      <section id="challenges" className="mb-12 scroll-mt-24">
        <SectionLabel index="04" title="Challenges → Solutions" />
        <div className="space-y-3">
          {challenges.map((c) => (
            <div
              key={c.challenge}
              className="border border-sharp bg-sharp-surface p-5"
            >
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-sharp-accent">
                {c.challenge}
              </p>
              <p className="text-sm leading-relaxed text-sharp-muted">
                {c.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="tech" className="mb-12 scroll-mt-24">
        <SectionLabel index="05" title="Tech stack" />
        <div className="mb-8 flex flex-wrap gap-2">
          {techBadges.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="border border-sharp bg-sharp-surface p-5 sm:p-6">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-sharp-accent">
            Positioning
          </h3>
          <p className="text-sm leading-relaxed text-sharp-muted">
            Backend messaging platform designed for frontend clients — not a
            React/Next UI case study. Prepaid ledger is ready for payment-gateway
            webhooks; full gateway integration is a roadmap item.
          </p>
        </div>
      </section>

      <section className="border border-sharp bg-sharp-surface p-6 sm:p-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-sharp-muted">
          Next
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects/mass-mail-sender"
            className="btn-sharp btn-sharp-primary"
          >
            Next project →
          </Link>
          <Link href="/" className="btn-sharp btn-sharp-outline">
            Home
          </Link>
        </div>
      </section>
    </CaseStudyShell>
  );
}
