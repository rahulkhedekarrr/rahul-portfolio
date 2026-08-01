import SectionHeader from "./SectionHeader";
import SkillCard from "../cards/SkillCard";
import { skillCategories } from "../../data/skills";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Technical Skills" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories.map(({ icon: _icon, ...category }, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
