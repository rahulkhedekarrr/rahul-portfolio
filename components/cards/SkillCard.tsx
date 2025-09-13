"use client";

import { memo, useRef, useEffect, useState } from "react";
import { m as motion, useInView } from "framer-motion";
import { SkillCategory } from "../../types";

interface SkillCardProps {
  category: SkillCategory;
}

const SkillCard = memo(({ category }: SkillCardProps) => {
  const IconComponent = category.icon;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  return (
    <motion.div
      ref={ref}
      className="group backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 hover-optimized gpu-accelerated"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon */}
      <motion.div
        className={`${category.color} mb-4`}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
      </motion.div>

      {/* Title */}
      <motion.h3
        className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center text-optimized"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {category.title}
      </motion.h3>

      {/* Skills list */}
      <div className="space-y-2">
        {category.skills.map((skill, index) => (
          <motion.div
            key={index}
            className="text-white/80 text-center text-optimized"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.3 + index * 0.1,
            }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

export default SkillCard;
