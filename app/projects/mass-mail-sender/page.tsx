import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CaseStudyShell from "../../../components/case-study/CaseStudyShell";
import SectionLabel from "../../../components/case-study/SectionLabel";
import { createPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Mass Mail Sender",
  description:
    "Production email microservice that queues, rate-limits, sends, and tracks mass campaigns via AWS SES, Redis/BullMQ, and MongoDB.",
  path: "/projects/mass-mail-sender",
});

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "challenges", label: "Challenges" },
  { id: "tech", label: "Tech" },
];

const stats = [
  { label: "Campaign scale", value: "10k–20k" },
  { label: "Send rate", value: "~10/sec" },
  { label: "API accept", value: "202 async" },
  { label: "Service LOC", value: "~17k" },
];

const features = [
  "Async mass send (202 Accepted)",
  "Draft + batch send campaigns",
  "Queue rate limiting aligned to SES",
  "Pause / resume control plane",
  "SES + SNS lifecycle tracking",
  "Analytics / export / validation APIs",
  "Dry-run stress testing",
  "Railway-ready deployment",
];

const challenges = [
  {
    challenge: "Duplicate sends from aggressive retries",
    solution:
      "Disabled auto-retry; pause on permanent errors after a production incident",
  },
  {
    challenge: "Huge job payloads in Redis",
    solution: "Claim-check pattern for templates to protect memory",
  },
  {
    challenge: "Unsafe deploys mid-campaign",
    solution: "Coordinated graceful drain of API + worker",
  },
  {
    challenge: "Blind operations at scale",
    solution: "Monitoring abort/resume + statistics/export APIs",
  },
];

const techBadges = [
  "Node.js",
  "Express",
  "BullMQ",
  "Redis",
  "MongoDB",
  "Mongoose",
  "AWS SES",
  "AWS SNS",
  "Winston",
  "Joi",
  "Railway",
  "Docker Compose",
];

export default function MassMailSenderPage() {
  return (
    <CaseStudyShell navItems={navItems}>
      <section className="mb-14 border border-sharp bg-sharp-surface">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-sharp p-6 sm:p-8 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sharp-accent">
              Case study // 04
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-sharp-fg sm:text-4xl md:text-5xl">
              Mass Mail Sender
            </h1>
            <p className="mb-6 text-sharp-muted">
              Production email microservice for reliable, rate-limited campaign
              delivery at scale — built for real cloud constraints, not demos.
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
              Role · Backend / systems engineer
            </p>
          </div>
          <div className="relative aspect-[16/10] min-h-[220px] w-full md:aspect-auto md:min-h-full">
            <Image
              src="/images/mass-mail-sender.svg"
              alt="Mass mail sender service cover"
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
          Sending newsletters at scale without blocking HTTP, exceeding SES
          limits, or creating duplicate sends when workers fail is a systems
          problem. This headless microservice accepts JSON campaign payloads,
          fan-outs recipients through a durable queue, tracks
          delivery/bounce/complaint lifecycle, and exposes analytics APIs for
          ops control.
        </p>
      </section>

      <section id="architecture" className="mb-12 scroll-mt-24">
        <SectionLabel index="02" title="Architecture" />
        <p className="mb-4 max-w-3xl leading-relaxed text-sharp-muted">
          API writes logs and enqueues jobs → Worker sends via AWS SES using
          cached templates → SNS webhooks update delivery outcomes → Analytics
          APIs aggregate campaign health. Processes can run API-only,
          worker-only, or combined for Railway deploys.
        </p>
        <ul className="max-w-3xl space-y-2">
          {[
            "BullMQ rate-limited pipeline aligned to SES throughput",
            "Redis claim-check for large templates",
            "Separable API / worker modes",
            "Healthchecks + graceful shutdown for safe deploys",
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
            Distributed systems and API product ownership — there is no browser
            UI in this repo. AuthN/Z and an admin dashboard are intentional
            roadmap items, not hidden claims.
          </p>
        </div>
      </section>

      <section className="border border-sharp bg-sharp-surface p-6 sm:p-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-sharp-muted">
          Next
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/projects/lama" className="btn-sharp btn-sharp-primary">
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
