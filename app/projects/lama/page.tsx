"use client";

import { m as motion, type Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const sections = [
  {
    title: "Lama Gaming Ecosystem – Telegram Mini App & Admin Panel",
    body: "Lama Gaming Ecosystem is a complete end-to-end solution built for engagement, growth, and automation within Telegram. It combines a feature-rich Telegram Mini App for users with a powerful Admin Panel for management, creating a scalable and secure ecosystem tailored to gamified rewards, referral campaigns, and Web3 integration.",
  },
  {
    title: "Architecture",
    body: "Designed with a modern React/Next.js frontend, backed by a Node.js, Express, and MongoDB architecture, and complemented by a Next.js and TypeScript-powered Admin Panel, the project demonstrates how seamless user experiences can coexist with enterprise-level control and analytics.",
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
  {
    heading: "Technologies Across the Ecosystem",
    items: [
      "Frontend: React, Next.js, Redux Toolkit, Framer Motion, Axios, SweetAlert2",
      "Backend: Node.js, Express, MongoDB, Mongoose, JWT, Telegram Bot API, Cloudinary",
      "Admin Panel: Next.js, TypeScript, Tailwind CSS, Axios, SweetAlert2",
      "Web3 & SDKs: Ton Blockchain, TonConnect, Telegram WebApp SDK, Adsgram SDK",
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
  { label: "Users onboarded", value: "100k+" },
  { label: "Avg. session", value: "4.2m" },
  { label: "Tasks completed", value: "2M+" },
  { label: "Uptime", value: "99.9%" },
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
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
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

          {/* Hero with optimized image */}
          <motion.div
            className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 mb-10 gpu-accelerated hover-optimized"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={reduceMotion ? undefined : {
              scale: 1.01,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-4 text-optimized"
                  variants={fadeUp}
                >
                  Lama Gaming Ecosystem
                </motion.h1>
                <motion.p
                  className="text-white/80 text-lg md:text-xl max-w-3xl text-optimized"
                  variants={fadeUp}
                >
                  Telegram Mini App & Admin Panel
                </motion.p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="https://t.me/lama_gaming_bot/lama_gaming_bot?startapp=728420160"
                    className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover-float hover-press"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Telegram App
                  </Link>
                  <Link
                    href="https://www.lamagamingapp.com/"
                    className="inline-block px-6 py-3 rounded-xl backdrop-blur-optimized elevated-surface border border-white/20 text-white font-medium hover-float hover-press"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl ">
              <div className="absolute inset-0 bg-white/30" />
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
                <div className="text-2xl md:text-3xl font-bold text-white text-optimized">{s.value}</div>
                <div className="text-white/70 text-sm md:text-base text-optimized">{s.label}</div>
              </motion.div>
            ))}
          </motion.div> */}

          {sections.map((s, idx) => (
            <motion.div
              key={idx}
              className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 mb-8 gpu-accelerated hover-optimized"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 text-optimized">
                {s.title}
              </h2>
              <p className="text-white/80 text-optimized">{s.body}</p>
            </motion.div>
          ))}

          {featureGroups.map((group) => (
            <motion.div
              key={group.heading}
              className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 mb-8 gpu-accelerated hover-optimized"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={reduceMotion ? undefined : {
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-optimized">
                {group.heading}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {group.items.map((item) => (
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
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-optimized">Tech Stack Highlights</h3>
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

          <motion.div
            className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-8 md:p-10 mb-8 gpu-accelerated hover-optimized"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={reduceMotion ? undefined : {
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-optimized">
              Why This Project Stands Out
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {highlights.map((h) => (
                <motion.li
                  key={h}
                  className="text-white/80 text-optimized"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                >
                  {h}
                </motion.li>
              ))}
            </ul>
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
                <Image src="/images/lama.png" alt="Lama brand" fill className="object-cover" sizes="64px" />
              </div>
              <blockquote className="mt-4 md:mt-0 text-white/90 text-lg leading-relaxed">
                “This ecosystem delivered measurable growth with a seamless Telegram-native UX. The admin suite gave us full control without engineering bottlenecks.”
              </blockquote>
            </div>
            <div className="mt-4 text-white/60 text-sm">Founder, Lama Gaming</div>
          </motion.div>

          <motion.div
            className="text-center pb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://t.me/lama_gaming_bot/lama_gaming_bot?startapp=728420160"
                className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover-float hover-press"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Telegram App
              </Link>
              <Link
                href="https://www.lamagamingapp.com/"
                className="inline-block px-6 py-3 rounded-xl backdrop-blur-optimized elevated-surface border border-white/20 text-white font-medium hover-float hover-press"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Link>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-xl backdrop-blur-optimized elevated-surface border border-white/20 text-white font-medium hover-float hover-press"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
