"use client";

import { m as motion, type Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "Project",
    body: "Smart Canteen & Catering Management System is an end-to-end platform that digitizes reception, kitchen, and user flows with QR-first pickup, payment gating, real-time dashboards, and resilient printing for kiosk counters.",
  },
  {
    title: "What this solves",
    body: "Eliminates manual bottlenecks at pickup, standardizes payment verification, provides real-time visibility into meal-type performance and revenue, and streamlines bulk/special order handling.",
  },
  {
    title: "My role",
    body: "End-to-end implementation across UX, state, API integration, device flows (QR + printing), and operational guardrails for high-volume counters.",
  },
];

const featureGroups = [
  {
    heading: "Reception Dashboard",
    items: [
      "Live order feed with auto-refresh, search by order code/customer",
      "Statuses: Pending → Delivered → Cancelled, gated by payment",
      "One-click delivery with SweetAlert confirmations",
      "Receipt printing with browser or QZ Tray/Electron fallback",
      "Meal-type analytics and quick filters with pagination",
    ],
  },
  {
    heading: "QR Scanning & Verification",
    items: [
      "In-browser camera scanning via html5-qrcode",
      "Honeywell handheld support via device listener",
      "Robust parsing/validation with friendly error toasts",
    ],
  },
  {
    heading: "Order Management",
    items: [
      "Bulk orders and 'Party on House' workflows",
      "Add Foods, Checkout, and Order History modules",
      "Payment toggle (Paid/Unpaid) with delivery guardrails",
    ],
  },
  {
    heading: "Printing & Kiosk Ready",
    items: [
      "Browser/Electron printing with QZ Tray integration",
      "Dedicated print route that auto-closes post-print",
      "Thermal-printer friendly templates",
    ],
  },
  {
    heading: "User Portal",
    items: [
      "Location/site selection, profile, bookings, checkout",
      "Bulk-order flow and role separation (User/Reception/Kitchen)",
    ],
  },
];

const techBadges = [
  "Next.js 15",
  "React 19",
  "Tailwind CSS v4",
  "Zustand",
  "SweetAlert2",
  "html5-qrcode",
  "QZ Tray / Electron",
  "date-fns",
  "next-qrcode",
  "xlsx",
  "secure-ls",
  "crypto-js",
  "REST APIs",
  "JWT",
  "dotenv",
];

const highlights = [
  "QR-first pickup cuts queue time and reduces errors",
  "Payment-gated delivery prevents mistakes",
  "Real-time dashboard with client-side pagination",
  "Unified printing pipeline across browser and kiosk",
  "Analytics by meal-type with quick filters",
];

export default function CanteenProjectClient() {
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

          {/* Hero */}
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
            <div className="items-center justify-center">
              <div>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-4 text-optimized"
                  variants={fadeUp}
                >
                  Smart Canteen & Catering Management System
                </motion.h1>
                <motion.p
                  className="text-white/80 text-lg md:text-xl text-optimized"
                  variants={fadeUp}
                >
                  QR-first pickup, payment gating, real-time dashboards, and
                  kiosk-ready printing for high-volume counters.
                </motion.p>
              </div>
            </div>
          </motion.div>

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

          {/* Tech badges */}
          <motion.div
            className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8 gpu-accelerated hover-optimized"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-optimized">
              Tech Stack & Integrations
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

          {/* Why it matters */}
          <motion.div
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
              Results & Impact
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

          <motion.div
            className="text-center pb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl backdrop-blur-optimized elevated-surface border border-white/20 text-white font-medium hover-float hover-press"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
