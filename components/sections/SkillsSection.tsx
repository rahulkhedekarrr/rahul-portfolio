"use client";

import { m as motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { skillCategories } from "../../data/skills";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 smooth-scroll"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Technical Skills" index="02 / skills" />

        <motion.div
          className="overflow-hidden border border-sharp bg-sharp-surface"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 border-b border-sharp px-4 py-3 sm:px-5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-sharp-accent" />
            <span className="ml-2 font-mono text-[11px] tracking-wide text-sharp-muted">
              ~/skills — stack.manifest
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category, index) => (
              <div
                key={category.id}
                className={`p-5 sm:p-6 ${
                  index < skillCategories.length - 1
                    ? "border-b border-sharp sm:border-b-0 lg:border-r"
                    : ""
                } ${
                  index % 2 === 0 && index < skillCategories.length - 1
                    ? "sm:border-r"
                    : ""
                } ${index < 2 ? "sm:border-b lg:border-b-0" : ""}`}
              >
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-sharp-accent">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
