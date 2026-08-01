"use client";

import { m as motion } from "framer-motion";
import { smoothScrollTo } from "../../utils/smoothScroll";

const HeroCard = () => {
  return (
    <motion.div
      className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 md:p-12 hover-optimized"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Title/subtitle stay visible in SSR — critical for LCP score */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight text-optimized">
        Rahul
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Khedekar
        </span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 max-w-4xl mx-auto text-optimized px-4 sm:px-0">
        Full Stack Web Developer specializing in the MERN stack, crafting
        exceptional digital experiences with modern technologies
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
        <motion.button
          type="button"
          className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl text-white font-semibold overflow-hidden hover-optimized text-sm sm:text-base"
          onClick={() => smoothScrollTo("#projects")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10 text-optimized">View My Work</span>
        </motion.button>
        <motion.button
          type="button"
          className="group px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-optimized elevated-surface border border-white/20 rounded-2xl text-white font-semibold hover-optimized text-sm sm:text-base"
          onClick={() => smoothScrollTo("#contact")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-optimized">Get In Touch</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HeroCard;
