"use client";

import { memo } from "react";
import { m as motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  index?: string;
  align?: "left" | "center";
}

const SectionHeader = memo(
  ({ title, index, align = "left" }: SectionHeaderProps) => {
    return (
      <motion.div
        className={`mb-10 sm:mb-14 layout-stable ${
          align === "center" ? "text-center" : "text-left"
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {index ? (
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-sharp-accent">
            {index}
          </p>
        ) : null}
        <h2 className="text-3xl font-bold tracking-tight text-sharp-fg sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <div
          className={`section-rule mt-4 ${align === "center" ? "mx-auto" : ""}`}
        />
      </motion.div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
