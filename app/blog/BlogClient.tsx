"use client";

import Link from "next/link";
import Background from "../../components/layout/Background";

const blogPosts = [
  {
    id: "building-mern-app-nextjs",
    title: "Building a MERN App with Next.js: Complete Guide",
    excerpt:
      "Learn how to build a full-stack MERN application using Next.js as the frontend framework. This comprehensive guide covers everything from setup to deployment.",
    date: "2025-09-13",
    readTime: "8 min read",
    category: "MERN Stack",
    slug: "/blog/building-mern-app-nextjs",
  },
  {
    id: "chrome-mv3-ai-extension-dedupe",
    title: "Cutting duplicate AI calls in a Chrome MV3 extension",
    excerpt:
      "How a Gmail/Outlook side-panel assistant went from 20–25 generation requests per email open to one — with service-worker locks, storage flags, and a gateway that still feels instant.",
    date: "2025-10-02",
    readTime: "7 min read",
    category: "Chrome Extensions",
    slug: "/blog/chrome-mv3-ai-extension-dedupe",
    comingSoon: true,
  },
  {
    id: "queue-backed-whatsapp-email-apis",
    title: "Queue-backed WhatsApp & email APIs that survive real traffic",
    excerpt:
      "Design notes from prepaid WhatsApp campaigns and mass mail sends — BullMQ, Redis rate limits, wallet refunds on failure, and keeping Meta/SES happy at ~10 messages/sec.",
    date: "2025-09-20",
    readTime: "8 min read",
    category: "Backend",
    slug: "/blog/queue-backed-whatsapp-email-apis",
    comingSoon: true,
  },
];

export default function BlogClient() {
  return (
    <div className="relative min-h-screen bg-sharp text-sharp-fg">
      <Background />

      <div className="relative z-10 border-b border-sharp">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.16em] text-sharp-muted transition-colors hover:text-sharp-accent"
          >
            ← Back
          </Link>
          <span className="font-mono text-xs tracking-[0.2em] text-sharp-fg">
            RK
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12 border border-sharp bg-sharp-surface p-6 sm:p-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sharp-accent">
            Writing // notes
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-sharp-fg sm:text-5xl">
            Blog
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-sharp-muted sm:text-lg">
            Practical notes on Next.js, Chrome MV3, AI productization, and
            queue-backed messaging systems.
          </p>
        </header>

        <div className="space-y-4">
          {blogPosts.map((post) => {
            const content = (
              <>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="chip">{post.category}</span>
                  <span className="font-mono text-[11px] text-sharp-muted">
                    {post.readTime}
                  </span>
                  {post.comingSoon ? (
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sharp-accent">
                      Coming soon
                    </span>
                  ) : null}
                </div>

                <h2 className="mb-3 text-xl font-semibold tracking-tight text-sharp-fg transition-colors group-hover:text-sharp-accent sm:text-2xl">
                  {post.title}
                </h2>

                <p className="mb-6 text-sm leading-relaxed text-sharp-muted sm:text-base">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <time className="font-mono text-[11px] text-sharp-muted">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {!post.comingSoon ? (
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sharp-accent">
                      Read →
                    </span>
                  ) : null}
                </div>
              </>
            );

            if (post.comingSoon) {
              return (
                <article
                  key={post.id}
                  className="border border-sharp bg-sharp-surface p-6 opacity-70 sm:p-8"
                >
                  {content}
                </article>
              );
            }

            return (
              <Link
                key={post.id}
                href={post.slug}
                className="group block border border-sharp bg-sharp-surface p-6 transition-colors hover:border-[var(--sharp-border-strong)] sm:p-8"
              >
                <article>{content}</article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
