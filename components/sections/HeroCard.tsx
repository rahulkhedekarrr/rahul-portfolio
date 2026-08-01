"use client";

import { m as motion, useReducedMotion } from "framer-motion";

const HeroCard = () => {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      className="mx-auto max-w-5xl text-left sm:text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={item}
        className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-sharp-accent sm:text-xs"
      >
        full stack developer // MERN · Next.js · AI products
      </motion.p>

      <motion.h1
        variants={item}
        className="lcp-text text-5xl font-bold leading-[0.95] tracking-tight text-sharp-fg sm:text-6xl md:text-7xl lg:text-8xl"
      >
        RAHUL
        <span className="mt-1 block text-sharp-accent sm:mt-2">KHEDEKAR</span>
      </motion.h1>

      <motion.p
        variants={item}
        className="lcp-text mx-auto mt-6 max-w-2xl text-base leading-relaxed text-sharp-muted sm:mt-8 sm:text-lg md:text-xl"
      >
        I design and build production web products with React, Next.js, and
        Node.js — from AI-powered Chrome extensions to queue-backed messaging
        systems.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
      >
        <a href="#projects" className="btn-sharp btn-sharp-primary">
          View my work
        </a>
        <a href="#contact" className="btn-sharp btn-sharp-outline">
          Get in touch
        </a>
      </motion.div>

      <motion.p
        variants={item}
        className="mx-auto mt-6 max-w-2xl font-mono text-[11px] leading-relaxed tracking-wide text-sharp-muted sm:mt-8 sm:text-xs"
      >
        Next.js · React · Node.js · MongoDB · Chrome Featured extension ·
        WhatsApp API · 1.7k+ users shipped
      </motion.p>
    </motion.div>
  );
};

export default HeroCard;
