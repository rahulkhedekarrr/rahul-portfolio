"use client";

import { m as motion } from "framer-motion";
import { smoothScrollTo } from "../../utils/smoothScroll";

const HeroCard = () => {
  return (
    <motion.div
      className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 md:p-12 gpu-accelerated hover-optimized"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight text-optimized"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.6,
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        Rahul
        <motion.span
          className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.7,
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          Khedekar
        </motion.span>
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto text-optimized px-4 sm:px-0"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.8,
        }}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        Full Stack Web Developer specializing in the MERN stack, crafting
        exceptional digital experiences with modern technologies
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.9,
        }}
      >
        <motion.button
          className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl text-white font-semibold overflow-hidden hover-optimized gpu-accelerated text-sm sm:text-base"
          onClick={() => smoothScrollTo("#projects")}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 1.0,
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 text-optimized">View My Work</span>
          <motion.div
            className="absolute inset-0 bg-white/10"
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.2)",
              transition: { duration: 0.3 },
            }}
          />
        </motion.button>
        <motion.button
          className="group px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-optimized elevated-surface border border-white/20 rounded-2xl text-white font-semibold hover-optimized gpu-accelerated text-sm sm:text-base"
          onClick={() => smoothScrollTo("#contact")}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 1.1,
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-optimized">Get In Touch</span>
          <motion.div
            className="absolute inset-0 bg-white/5 rounded-2xl"
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.1)",
              transition: { duration: 0.3 },
            }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HeroCard;
