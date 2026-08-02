import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CaseStudyShell from "../../../components/case-study/CaseStudyShell";
import SectionLabel from "../../../components/case-study/SectionLabel";
import { createPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Lama Gaming OS — Telegram Mini App",
  description:
    "Telegram-native gaming product with a Mini App, admin panel, and 1.7k+ live users — rewards, referrals, and day-to-day ops tools.",
  path: "/projects/lama",
});

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "media", label: "Product" },
  { id: "features", label: "Features" },
  { id: "tech", label: "Tech" },
];

const sections = [
  {
    id: "overview",
    index: "01",
    title: "Overview",
    body: "Lama is a Telegram-native gaming product with two surfaces: a Mini App for players, and an admin panel for the people running it. Players complete tasks, earn rewards, refer friends, and connect a TON wallet. Operators manage users, campaigns, ads, and rewards from the dashboard.",
  },
  {
    id: "architecture",
    index: "02",
    title: "Architecture",
    body: "The Mini App and admin panel are Next.js frontends on a Node.js and Express API with MongoDB. Telegram handles login and distribution; the backend owns tasks, rewards, referrals, and wallet-related flows. The admin panel is built for daily ops — not just demos.",
  },
];

const featureGroups = [
  {
    heading: "User-Facing Mini App",
    items: [
      "Gamified Rewards: Daily and special tasks, streak bonuses, farming, and staking keep users engaged.",
      "Referral Growth: Unique referral links and one-click sharing to Telegram, WhatsApp, X, and Facebook.",
      "Ad Engagement: Users earn extra rewards by watching ads through Adsgram SDK.",
      "Wallet & Web3 Integration: TON wallet connectivity via TonConnect enables crypto-native features and real-time balances.",
      "Interactive UI: Powered by React, Framer Motion, and Redux for smooth animations and real-time updates inside Telegram.",
    ],
  },
  {
    heading: "Backend Services",
    items: [
      "Secure User Management: Telegram login, activity logging, and automated referral tracking.",
      "Task & Reward Logic: Dynamic task assignment, automated reward distribution, and staking logic via cron jobs.",
      "Scalable APIs: REST APIs built on Node.js and Express with MongoDB for robust data handling.",
      "Transparency & Analytics: User logs, referral trees, and transaction histories for insight into community engagement.",
    ],
  },
  {
    heading: "Admin Panel",
    items: [
      "Comprehensive User Management: Searchable user directories, referral counts, premium status, wallet details, and transaction logs.",
      "Daily Task Control: Create, filter, and batch-publish tasks across YouTube, Telegram, X, Facebook, and more.",
      "Ad Request Workflow: Dedicated dashboard to review, approve, and convert ad requests into tasks.",
      "Farming Upgrade Management: Configure boosters, token requirements, and reward structures.",
      "Referral System Insights: Leaderboards and transparent allocation of referral rewards.",
      "App-Wide Settings: Centralized control over signup bonuses, farming rules, wallet addresses, and reward structures.",
      "Modern Dashboard: Responsive, intuitive UI built with Next.js, TypeScript, Tailwind CSS, and SweetAlert for a polished experience.",
      "Security & Scalability: Environment-based API security, optimized image loading, and modular design for future growth.",
    ],
  },
];

const highlights = [
  "Holistic Ecosystem: Covers the entire lifecycle—user onboarding, engagement, wallet integration, rewards, referrals, and admin oversight.",
  "Telegram-Native Experience: Users interact entirely within Telegram, while admins manage campaigns through a professional dashboard.",
  "Gamification Meets Web3: Blends addictive reward mechanics with crypto-native features for modern user engagement.",
  "Enterprise-Ready Management Tools: The admin panel ensures transparency, control, and adaptability for business-focused campaigns.",
  "Scalable Design: Modular codebases, automation, and security best practices make the system maintainable and growth-ready.",
];

const stats = [
  { label: "Users onboarded", value: "1.7k+" },
  { label: "Surfaces", value: "Mini App + Admin" },
  { label: "Stack", value: "Next.js · Node · MongoDB" },
  { label: "Status", value: "Live" },
];

const techBadges = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "TonConnect",
  "Telegram WebApp SDK",
  "Adsgram SDK",
];

export default function LamaProjectPage() {
  return (
    <CaseStudyShell navItems={navItems}>
      {/* Hero */}
      <section className="mb-14 border border-sharp bg-sharp-surface">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-sharp p-6 sm:p-8 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sharp-accent">
              Case study // 02
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-sharp-fg sm:text-4xl md:text-5xl">
              Lama Gaming OS
            </h1>
            <p className="mb-6 text-sharp-muted">
              A Telegram-native gaming product with a full admin panel — live
              with 1.7k+ users. Built for players inside Telegram and the
              operators who run it day to day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://t.me/lama_gaming_bot/lama_gaming_bot?startapp=728420160"
                className="btn-sharp btn-sharp-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Telegram App
              </Link>
              <Link
                href="https://www.lamagamingapp.com/"
                className="btn-sharp btn-sharp-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Link>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-sharp-muted">
              Role · Full stack
            </p>
          </div>
          <div className="relative aspect-[16/10] min-h-[220px] w-full md:aspect-auto md:min-h-full">
            <Image
              src="/images/lama.png"
              alt="Lama Gaming preview"
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
              } ${i === 1 ? "md:border-r" : ""} ${
                i < 2 ? "border-b border-sharp md:border-b-0" : ""
              }`}
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

      {/* Overview + Architecture */}
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="mb-12 scroll-mt-24">
          <SectionLabel index={s.index} title={s.title} />
          <p className="max-w-3xl leading-relaxed text-sharp-muted">{s.body}</p>
        </section>
      ))}

      {/* Product media */}
      <section id="media" className="mb-12 scroll-mt-24">
        <SectionLabel index="03" title="Product" />
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-sharp bg-sharp">
          <Image
            src="/images/lama.png"
            alt="Lama product surface"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mb-12 scroll-mt-24">
        <SectionLabel index="04" title="Features" />
        <div className="space-y-4">
          {featureGroups.map((group) => (
            <div
              key={group.heading}
              className="border border-sharp bg-sharp-surface p-5 sm:p-6"
            >
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-sharp-accent">
                {group.heading}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-l border-sharp pl-4 text-sm leading-relaxed text-sharp-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tech */}
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
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-sharp-accent">
            Why it stands out
          </h3>
          <ul className="space-y-2">
            {highlights.map((h) => (
              <li
                key={h}
                className="border-l border-sharp pl-4 text-sm leading-relaxed text-sharp-muted"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next */}
      <section className="border border-sharp bg-sharp-surface p-6 sm:p-8">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-sharp-muted">
          Next
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="https://t.me/lama_gaming_bot/lama_gaming_bot?startapp=728420160"
            className="btn-sharp btn-sharp-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Telegram App
          </Link>
          <Link
            href="/projects/ai-learning-platform"
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
