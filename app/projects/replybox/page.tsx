"use client";

import { m as motion, type Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const sections = [
  {
    title: "Project Overview",
    body: "A sophisticated Chrome extension that enhances email productivity by leveraging AI to assist users with email composition and management in Gmail and Outlook. The extension integrates seamlessly to provide intelligent features while staying non-intrusive.",
  },
];

const features = [
  {
    heading: "Intelligent Email Analysis & Response Generation",
    items: [
      "Real-time email analysis and smart summaries",
      "AI-powered response generation with tones: Formal, Casual, Apologetic, Persuasive",
      "Context-aware replies that maintain conversation continuity",
      "Multiple lengths: short, medium, long",
    ],
  },
  {
    heading: "Advanced Integration",
    items: [
      "Seamless Gmail and Outlook integration",
      "Side panel UI for enhanced UX",
      "Real-time email content sync",
      "Voice input for hands-free composition",
    ],
  },
  {
    heading: "Smart Templates & Customization",
    items: [
      "Pre-built templates (Meetings, Sales, Support)",
      "Custom templates with management",
      "Personalized response customization",
      "Draft management with auto-save",
    ],
  },
  {
    heading: "Security & Authentication",
    items: [
      "Secure Google OAuth2.0",
      "Local storage encryption",
      "Privacy-first: no email content stored",
      "Robust error handling and validation",
    ],
  },
  {
    heading: "User Experience",
    items: [
      "Intuitive, material-inspired UI",
      "Real-time response preview",
      "Easy formatting and editing",
      "Progress indicators, loading states, toast notifications",
    ],
  },
];

const tech = [
  "Vue 3",
  "Tailwind CSS",
  "OpenAI API",
  "Chrome Identity API",
  "OAuth 2.0",
  "Chrome Storage API (encrypted)",
  "Chrome Message Passing API",
];

const perf = [
  "Efficient DOM manipulation",
  "Optimized background scripts",
  "Lazy load non-critical components",
  "Caching for frequently used data",
];

const architecture = [
  "Modular component design",
  "Event-driven architecture",
  "Secure communication protocols",
  "Robust error handling system",
  "Cross-browser compatibility",
];

export default function ReplyboxProjectPage() {
  const reduceMotion = useReducedMotion();
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stats = [
    { label: "Active users", value: "10k+" },
    { label: "Avg. time saved", value: "6m/email" },
    { label: "Organizations", value: "200+" },
    { label: "Rating", value: "4.8★" },
  ];

  const techBadges = [
    "Vue 3",
    "Tailwind CSS",
    "OpenAI API",
    "Chrome Extensions (MV3)",
    "OAuth 2.0",
    "TypeScript",
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        className="relative z-10 px-6 py-16"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-white/70 hover:text-white">
              ← Back
            </Link>
          </div>

          {/* Hero split with optimized image */}
          <motion.div
            className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 mb-10 gpu-accelerated hover-optimized"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.01,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }
            }
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-4 text-optimized"
                  variants={fadeUp}
                >
                  AI-Powered Email Assistant Chrome Extension
                </motion.h1>
                <motion.p
                  className="text-white/80 text-lg md:text-xl max-w-3xl text-optimized"
                  variants={fadeUp}
                >
                  Smart replies, summaries, templates, and voice input for Gmail
                  and Outlook.
                </motion.p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="https://chromewebstore.google.com/detail/replybox-ai-email-writer/icjcmabkdiomnkiphgjopbkkhlfcabgp?utm_source=item-share-cb&pli=1"
                    className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover-float hover-press"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Chrome Web Store
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
              <div className="absolute inset-0 bg-white/30" />
                <Image
                  src="/images/Reply.png"
                  alt="Replybox preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                className="backdrop-blur-optimized elevated-surface rounded-2xl border border-white/15 p-4 text-center"
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white text-optimized">
                  {s.value}
                </div>
                <div className="text-white/70 text-sm md:text-base text-optimized">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          {sections.map((s, idx) => (
            <motion.div
              key={idx}
              className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 mb-8 gpu-accelerated hover-optimized"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.02,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }
              }
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 text-optimized">
                {s.title}
              </h2>
              <p className="text-white/80 text-optimized">{s.body}</p>
            </motion.div>
          ))}

          {[{ heading: "Key Features", items: [] }].map(() => null)}

          {[
            features,
            [
              { heading: "Technical Implementation", items: tech },
              { heading: "Performance Optimizations", items: perf },
              { heading: "Architecture Highlights", items: architecture },
            ],
          ]
            .flat()
            .map((group) => (
              <motion.div
                key={group.heading}
                className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 mb-8 gpu-accelerated hover-optimized"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.02,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }
                }
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-optimized">
                  {group.heading}
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {group.items.map((item: string) => (
                    <motion.li
                      key={item}
                      className="text-white/80 text-optimized"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

          {/* Technology badges strip */}
          <motion.div
            className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8 gpu-accelerated hover-optimized"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-optimized">
              Tech Stack Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 mb-8 gpu-accelerated hover-optimized"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
          >
            <div className="md:flex md:items-center md:gap-6">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20">
                <Image
                  src="/images/Reply.png"
                  alt="Replybox brand"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <blockquote className="mt-4 md:mt-0 text-white/90 text-lg leading-relaxed">
                “Replybox streamlines our customer support emails. The AI
                suggestions feel on-brand and save hours weekly.”
              </blockquote>
            </div>
            <div className="mt-4 text-white/60 text-sm">
              Operations Lead, SaaS company
            </div>
          </motion.div>

          <motion.div
            className="text-center pb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link
              href="https://chromewebstore.google.com/detail/replybox-ai-email-writer/icjcmabkdiomnkiphgjopbkkhlfcabgp?utm_source=item-share-cb&pli=1"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover-float hover-press"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Chrome Web Store
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
