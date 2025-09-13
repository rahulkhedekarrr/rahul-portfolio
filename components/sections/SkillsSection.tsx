"use client";

import { m as motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import SkillCard from "../cards/SkillCard";
import { SkillCategory } from "../../types";

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

const SkillsSection = ({ skillCategories }: SkillsSectionProps) => {
  return (
    <motion.section
      id="skills"
      className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="MERN Stack & Web Development Skills" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
