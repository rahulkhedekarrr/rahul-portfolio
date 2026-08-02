import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CaseStudyShell from "../../../components/case-study/CaseStudyShell";
import SectionLabel from "../../../components/case-study/SectionLabel";
import { createPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI University Learning Platform",
  description:
    "University learning platform for course authoring, AI-guided study sessions, practice exams, and instructor insights.",
  path: "/projects/ai-learning-platform",
});

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Features" },
  { id: "challenges", label: "Challenges" },
  { id: "tech", label: "Tech" },
];

const stats = [
  { label: "Feature modules", value: "15" },
  { label: "API routes used", value: "80+" },
  { label: "Source files", value: "~530" },
  { label: "Timeline", value: "Oct–Jun" },
];

const features = [
  "Adaptive AI Q&A study sessions",
  "AI tutor chat + remediation loops",
  "Multi-step course authoring with DnD folders/topics",
  "FortuneSheet study-mode workbooks + Excel import",
  "Practice exams with attempts and score cards",
  "Instructor understanding analytics (Recharts)",
  "Multi-role RBAC: student, admin, university representative",
  "Session lifecycle: timers, breaks, distraction logging",
  "Encrypted video proxy for Cloudinary media",
  "LLM usage dashboard for admins",
];

const challenges = [
  {
    challenge: "Complex learning session state",
    solution:
      "Orchestrated evaluate → assist → tutor flow with exit guards and flush semantics",
  },
  {
    challenge: "Multi-tenant roles across App Router",
    solution: "Edge proxy allowlists + layout-level role gating",
  },
  {
    challenge: "Instructor content ops in spreadsheets",
    solution: "FortuneSheet study-mode authoring with Excel import",
  },
  {
    challenge: "Auth refresh storms",
    solution: "Coalesced token refresh in a centralized fetch client",
  },
];

const techBadges = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Radix",
  "React Hook Form",
  "Zod",
  "TanStack Query",
  "Zustand",
  "Framer Motion",
  "dnd-kit",
  "FortuneSheet",
  "Recharts",
  "Cloudinary",
];

export default function AiLearningPlatformPage() {
  return (
    <CaseStudyShell navItems={navItems}>
      <section className="mb-14 border border-sharp bg-sharp-surface">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-sharp p-6 sm:p-8 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sharp-accent">
              Case study // 05
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-sharp-fg sm:text-4xl md:text-5xl">
              AI University Learning Platform
            </h1>
            <p className="mb-6 text-sharp-muted">
              A platform for universities — instructors build courses, students
              get AI-guided study and practice, and instructors see how learning
              is going.
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
              Role · Frontend / product
            </p>
          </div>
          <div className="relative aspect-[16/10] min-h-[220px] w-full md:aspect-auto md:min-h-full">
            <Image
              src="/images/ai-learning-platform.svg"
              alt="AI university learning platform cover"
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
          University courses often ship as PDFs and videos with weak engagement
          and little visibility into what students actually understand. This
          platform helps instructors author structured courses while students
          study through timed, AI-evaluated sessions with tutoring and progress
          analytics.
        </p>
        <p className="max-w-3xl leading-relaxed text-sharp-muted">
          The case study focuses on the presentation and orchestration layer: a
          modular Next.js client consuming an external REST API for AI
          evaluation, persistence, and media.
        </p>
      </section>

      <section id="architecture" className="mb-12 scroll-mt-24">
        <SectionLabel index="02" title="Architecture" />
        <p className="mb-4 max-w-3xl leading-relaxed text-sharp-muted">
          Thin App Router shell with fat feature modules. Proxy enforces
          auth/RBAC; services call a centralized fetch client; TanStack Query
          caches server state; Zustand holds auth and wizard drafts. Next route
          handlers cover logout and a Range-capable video proxy.
        </p>
        <ul className="max-w-3xl space-y-2">
          {[
            "Shell / module boundaries for scalable feature ownership",
            "Cookie JWT access + refresh with SSR/CSR fetch client",
            "Learning session state machine (timers, breaks, distraction)",
            "Design system via Radix + CVA + Tailwind",
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
            Honesty note
          </h3>
          <p className="text-sm leading-relaxed text-sharp-muted">
            This case study covers frontend architecture and product
            engineering against an external API. Backend ownership (schema, LLM
            gateway, scoring) is separate and not claimed here.
          </p>
        </div>
      </section>

      <section className="border border-sharp bg-sharp-surface p-6 sm:p-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-sharp-muted">
          Next
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects/whatsapp-message-service"
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
