"use client";

import { memo } from "react";
import { m as motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = memo(({ title }: SectionHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-12 sm:mb-16 layout-stable"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-optimized">
        {title}
      </h2>
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto origin-center"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      />
    </motion.div>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
