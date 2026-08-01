import SectionHeader from "./SectionHeader";
import ProjectCard from "../cards/ProjectCard";
import { Project } from "../../types";

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section
      id="projects"
      className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 smooth-scroll pt-20 sm:pt-24"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
