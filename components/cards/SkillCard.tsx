"use client";

import { memo } from "react";
import { m as motion } from "framer-motion";
import { Code, Database, Server, Wrench } from "lucide-react";
import { SkillCategory } from "../../types";

interface SkillCardProps {
  category: Omit<SkillCategory, "icon"> & { icon?: SkillCategory["icon"] };
  index?: number;
}

const iconMap = {
  frontend: Code,
  backend: Server,
  database: Database,
  tools: Wrench,
} as const;

const SkillCard = memo(({ category, index = 0 }: SkillCardProps) => {
  const IconComponent =
    category.icon ||
    iconMap[category.id as keyof typeof iconMap] ||
    Code;

  return (
    <motion.div
      className="group backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 hover-optimized"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`${category.color} mb-4`}
        whileHover={{ scale: 1.1, rotate: 4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
      </motion.div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center text-optimized">
        {category.title}
      </h3>

      <div className="space-y-2">
        {category.skills.map((skill) => (
          <div key={skill} className="text-white/80 text-center text-optimized">
            {skill}
          </div>
        ))}
      </div>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

export default SkillCard;
