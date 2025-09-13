"use client";

import { m as motion } from "framer-motion";

const FooterSection = () => {
  return (
    <motion.footer
      className="relative z-10 px-6 py-8 smooth-scroll"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="backdrop-blur-optimized rounded-2xl border border-white/20 shadow-xl p-6 gpu-accelerated"
          whileHover={{ scale: 1.01 }}
        >
          <div className="text-center">
            <p className="text-white/80 text-optimized">
              © 2025 Rahul Khedekar. Crafted with passion and modern
              technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default FooterSection;
