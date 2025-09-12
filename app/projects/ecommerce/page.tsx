"use client";

import { m as motion, type Variants, useReducedMotion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "Project Overview",
    body: "A modern Ecommerce website built with Next.js and Redux, featuring category browsing, product listings, detailed product pages, add-to-cart, add-to-wishlist, and essential storefront flows. Designed for clarity and speed with a Bootstrap-powered UI.",
  },
];

const featureGroups = [
  {
    heading: "Core Features",
    items: [
      "Category-based product catalog and filters",
      "Product detail pages with images and specifications",
      "Add to Cart with quantity management",
      "Add to Wishlist for later consideration",
      "Cart review with subtotal and tax breakdown",
      "Guest and user flows with local state persistence",
      "Responsive UI built with Bootstrap components",
    ],
  },
  {
    heading: "Storefront UX",
    items: [
      "Search and basic sorting (price, popularity)",
      "Pagination for large catalogs",
      "Empty states and helpful toasts",
      "Skeleton loaders for perceived performance",
    ],
  },
  {
    heading: "State & Data",
    items: [
      "Redux store for cart, wishlist, and catalog state",
      "Normalized entities for products and categories",
      "Client-side persistence for cart/wishlist using storage",
      "REST-ready data layer for products and categories",
    ],
  },
];

const techBadges = [
  "Next.js",
  "React",
  "Redux",
  "Bootstrap",
  "JavaScript",
  "Axios",
  "Framer Motion",
];

const highlights = [
  "Fast browsing with client-side pagination and caching",
  "Clear flows for cart and wishlist interactions",
  "Responsive, accessible UI using Bootstrap components",
  "Modular Redux slices for maintainability",
];

export default function EcommerceProjectPage() {
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
            <div className="items-center">
              <div>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-4 text-optimized"
                  variants={fadeUp}
                >
                  Ecommerce Website
                </motion.h1>
                <motion.p
                  className="text-white/80 text-lg md:text-xl text-optimized"
                  variants={fadeUp}
                >
                  Built with Next.js, Redux, and Bootstrap—category browsing,
                  product pages, cart and wishlist, and a streamlined storefront
                  experience.
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
              Tech Stack
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

          {/* Highlights */}
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
              Why it works
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
