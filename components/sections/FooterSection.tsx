"use client";

import { m as motion } from "framer-motion";

const FooterSection = () => {
  return (
    <motion.footer
      className="relative z-10 px-6 py-8 smooth-scroll"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="backdrop-blur-optimized rounded-2xl border border-white/20 shadow-xl p-6"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="text-center">
            <p className="text-white/80 text-optimized">
              © 2025 Rahul Khedekar. Built with precision and powered by
              innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default FooterSection;
