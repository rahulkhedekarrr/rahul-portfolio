"use client";

import { memo, useRef, useEffect } from "react";
import { m as motion, useInView, useAnimation } from "framer-motion";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = memo(({ title }: SectionHeaderProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="text-center mb-12 sm:mb-16 layout-stable"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-optimized"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          },
        }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
