import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award } from "lucide-react";
import CaseStudyShell from "../../../components/case-study/CaseStudyShell";
import SectionLabel from "../../../components/case-study/SectionLabel";
import { createPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Email Assistant (Chrome Extension)",
  description:
    "Chrome Web Store Featured Manifest V3 side-panel assistant for Gmail and Outlook — AI replies, summaries, voice compose, and cost-aware metering.",
  path: "/projects/ai-email-assistant",
});

const STORE_URL =
  "https://chromewebstore.google.com/detail/icjcmabkdiomnkiphgjopbkkhlfcabgp?utm_source=item-share-cb";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "featured", label: "Featured" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "challenges", label: "Challenges" },
  { id: "tech", label: "Tech" },
];

const stats = [
  { label: "Chrome Web Store", value: "Featured" },
  { label: "API call reduction", value: "~60–75%" },
  { label: "Generation path", value: "20–25 → 1" },
  { label: "Mail providers", value: "2" },
];

const features = [
  "AI smart replies for the open email",
  "Thread summaries with sentiment context",
  "Compose with tone & length controls",
  "Speech-to-text prompts (Pro)",
  "Draft auto-save & templates",
  "Gmail + Outlook Web support",
  "Usage metering & upgrade UX",
  "Privacy-first MV3 permissions",
];

const challenges = [
  {
    challenge: "20–25 duplicate AI calls per email open",
    solution: "Atomic storage locks + service-worker dedupe + API gateway",
  },
  {
    challenge: "Content scripts can’t share session storage reliably",
    solution: "Coordinate via chrome.storage.local flags across contexts",
  },
  {
    challenge: "Generative XSS risk in rich output",
    solution: "Allowlist HTML sanitizer + CSP hardening",
  },
  {
    challenge: "AI cost on Free tier",
    solution: "Pre-network entitlement gates before generation",
  },
];

const techBadges = [
  "JavaScript",
  "Chrome MV3",
  "Side Panel API",
  "Content Scripts",
  "Service Workers",
  "Quill",
  "Web Speech API",
  "Google OAuth",
  "Firebase",
  "Vercel",
  "REST",
  "HTML Sanitization",
];

export default function AiEmailAssistantPage() {
  return (
    <CaseStudyShell navItems={navItems}>
      <section className="mb-14 border border-sharp bg-sharp-surface">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-sharp p-6 sm:p-8 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sharp-accent">
              Case study // 02
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-sharp-fg sm:text-4xl md:text-5xl">
              AI Email Assistant
            </h1>
            <p className="mb-3 text-sharp-muted">
              Manifest V3 side-panel assistant for Gmail & Outlook — smart
              replies, summaries, and voice compose without leaving the inbox.
            </p>
            <p className="mb-4 font-mono text-[11px] text-sharp-muted">
              Built as Replybox for Gmail & Outlook Web
            </p>

            <div className="mb-6 inline-flex w-fit items-center gap-2 border border-sharp-accent bg-sharp px-3 py-2">
              <Award className="h-4 w-4 text-sharp-accent" aria-hidden />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-sharp-accent">
                Chrome Web Store · Featured
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={STORE_URL}
                className="btn-sharp btn-sharp-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Chrome Web Store
              </Link>
              <a href="#featured" className="btn-sharp btn-sharp-outline">
                Why Featured matters
              </a>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-sharp-muted">
              Role · Extension + API integration owner
            </p>
          </div>
          <div className="relative aspect-[16/10] min-h-[220px] w-full md:aspect-auto md:min-h-full">
            <Image
              src="/images/Reply.png"
              alt="AI email assistant side panel preview"
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
        <p className="mb-4 max-w-3xl leading-relaxed text-sharp-muted">
          Knowledge workers waste time on long threads and context-switching to
          external AI tools. This extension sits beside Gmail and Outlook as a
          Chrome Side Panel companion: summarize the open thread, draft a
          tone-controlled reply, or compose from a prompt — then edit in Quill
          and paste back into the native composer.
        </p>
        <p className="max-w-3xl leading-relaxed text-sharp-muted">
          Productization includes Free/Pro usage metering, local draft caching,
          speech-to-text compose, and store-oriented security/a11y hardening that
          earned the Chrome Web Store Featured badge.
        </p>
      </section>

      <section id="featured" className="mb-12 scroll-mt-24">
        <SectionLabel index="02" title="Chrome Web Store Featured" />
        <div className="border border-sharp-accent bg-sharp-surface p-5 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-sharp-accent px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-sharp-accent">
              <Award className="h-3.5 w-3.5" aria-hidden />
              Featured
            </span>
            <span className="font-mono text-[11px] text-sharp-muted">
              Manually reviewed by the Chrome Web Store team · cannot be bought
            </span>
          </div>
          <p className="mb-6 max-w-3xl leading-relaxed text-sharp-muted">
            The Featured badge is Google&apos;s quality signal for Chrome
            extensions. Chrome staff review each listing for technical best
            practices (including modern Manifest V3 APIs), an intuitive user
            experience, privacy respect, and a clear store listing. Publishers
            cannot pay for it — it is earned through review.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Trust",
                body: "Users see an official quality mark before they install — stronger social proof than self-claims.",
              },
              {
                title: "Discovery",
                body: "Featured items can rank higher in search/filters and appear in Chrome Web Store promotions.",
              },
              {
                title: "Engineering bar",
                body: "Signals MV3, privacy, UX, and listing quality met Chrome’s published best-practice bar.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-sharp bg-sharp p-4"
              >
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-sharp-accent">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-sharp-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href={STORE_URL}
              className="btn-sharp btn-sharp-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              See the Featured listing
            </Link>
          </div>
        </div>
      </section>

      <section id="architecture" className="mb-12 scroll-mt-24">
        <SectionLabel index="03" title="Architecture" />
        <p className="mb-4 max-w-3xl leading-relaxed text-sharp-muted">
          Presentation (side panel + provider content scripts) talks to a
          service-worker orchestration layer that deduplicates requests and
          updates usage counts, then calls a hardened network client to a
          Vercel-hosted generation API. Auth uses Google OAuth with an optional
          Firebase login bridge. Generative HTML is sanitized before it touches
          the DOM.
        </p>
        <ul className="max-w-3xl space-y-2">
          {[
            "3-layer MV3 architecture: presentation → orchestration → network",
            "Adapter pattern for Gmail and Outlook DOM providers",
            "Distributed locking via chrome.storage without a server mutex",
            "Backend LLM (keys never in the extension package)",
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
        <SectionLabel index="04" title="Features" />
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
        <SectionLabel index="05" title="Challenges → Solutions" />
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
        <SectionLabel index="06" title="Tech stack" />
        <div className="mb-8 flex flex-wrap gap-2">
          {techBadges.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="border border-sharp bg-sharp-surface p-6 sm:p-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-sharp-muted">
          Next
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={STORE_URL}
            className="btn-sharp btn-sharp-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome Web Store
          </Link>
          <Link
            href="/projects/whatsapp-message-service"
            className="btn-sharp btn-sharp-outline"
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
