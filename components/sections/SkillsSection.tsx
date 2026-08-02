"use client";

import { m as motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { skillCategories, workAreas } from "../../data/skills";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 smooth-scroll"
    >
      <div className="mx-auto max-w-7xl space-y-14 sm:space-y-16">
        <div id="work">
          <SectionHeader title="What I build" index="02 / work" />
          <motion.ul
            className="grid grid-cols-1 gap-px border border-sharp bg-sharp sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {workAreas.map((area) => (
              <li
                key={area}
                className="bg-sharp-surface px-5 py-4 text-sm text-sharp-muted sm:px-6 sm:text-base"
              >
                {area}
              </li>
            ))}
          </motion.ul>
        </div>

        <div>
          <SectionHeader title="Stack" index="03 / stack" />
          <motion.div
            className="overflow-hidden border border-sharp bg-sharp-surface"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
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
      </div>
    </section>
  );
};

export default SkillsSection;
