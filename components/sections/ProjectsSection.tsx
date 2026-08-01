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
      className="relative z-10 px-4 py-20 sm:px-6 sm:py-24 smooth-scroll"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Projects" index="03 / projects" />

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
