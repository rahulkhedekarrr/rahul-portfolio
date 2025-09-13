"use client";

import { m as motion } from "framer-motion";
import HeroCard from "./HeroCard";

const HeroSection = () => {
  return (
    <motion.section
      className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll pt-32 sm:pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <HeroCard />
      </div>
    </motion.section>
  );
};

export default HeroSection;
