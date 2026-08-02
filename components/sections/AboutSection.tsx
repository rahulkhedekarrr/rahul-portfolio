"use client";

import { m as motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { AboutItem } from "../../types";

interface AboutSectionProps {
  aboutItems: AboutItem[];
}

const AboutSection = ({ aboutItems }: AboutSectionProps) => {
  return (
    <section
      id="about"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 smooth-scroll"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="About" index="01 / about" />

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="mb-4 text-xl font-semibold text-sharp-fg sm:text-2xl">
              I like building things people actually use
            </h3>
            <p className="mb-4 leading-relaxed text-sharp-muted">
              Most of my work starts with a real problem — too many emails,
              unreliable messaging, learning tools that don&apos;t adapt. I
              enjoy taking that from a rough idea to something running in
              production.
            </p>
            <p className="mb-4 leading-relaxed text-sharp-muted">
              I care about the whole product: how it feels to use, how the
              backend holds up, and whether someone else can maintain it six
              months later. I enjoy working across the stack—from the interface
              people use to the systems that keep everything running.
            </p>
            <p className="leading-relaxed text-sharp-muted">
              I&apos;m happiest when the work is useful, not just clever.
            </p>
          </motion.div>

          <motion.ul
            className="border border-sharp bg-sharp-surface"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.06 }}
          >
            {aboutItems.map((item, index) => (
              <li
                key={item.id}
                className={`px-5 py-5 sm:px-6 ${
                  index < aboutItems.length - 1 ? "border-b border-sharp" : ""
                }`}
              >
                <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-sharp-accent">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-sharp-muted sm:text-base">
                  {item.description}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
