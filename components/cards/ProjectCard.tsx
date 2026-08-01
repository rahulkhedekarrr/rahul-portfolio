"use client";

import { memo, useMemo } from "react";
import Link from "next/link";
import { m as motion } from "framer-motion";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = memo(({ project, index = 0 }: ProjectCardProps) => {
  const technologyColors = useMemo(
    () => [
      "bg-purple-500/20 text-purple-300",
      "bg-cyan-500/20 text-cyan-300",
      "bg-green-500/20 text-green-300",
      "bg-pink-500/20 text-pink-300",
      "bg-orange-500/20 text-orange-300",
    ],
    []
  );

  const internalLink =
    project.id === "project-1"
      ? "/projects/lama"
      : project.id === "project-replybox"
      ? "/projects/replybox"
      : project.id === "project-canteen"
      ? "/projects/canteen"
      : project.id === "project-ecommerce"
      ? "/projects/ecommerce"
      : undefined;

  const CardShell = (
    <motion.div
      className="group h-full flex flex-col backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl overflow-hidden hover-optimized cursor-pointer"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="relative">
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />
        <div className="px-6 pt-5 pb-0 flex items-center gap-3">
          <h3 className="text-xl font-bold text-white text-optimized">
            {project.title}
          </h3>
        </div>
      </div>
      <div className="p-6 pt-4 flex-1 flex flex-col">
        <p className="text-white/80 mb-4 leading-relaxed text-optimized">
          {project.description}
        </p>
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span
                key={tech}
                className={`px-3 py-1 ${
                  technologyColors[index % technologyColors.length]
                } rounded-full text-sm text-optimized`}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between">
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent mr-4" />
          <span className="text-xs tracking-wider uppercase text-white/60 group-hover:text-white/80 transition-colors">
            View details
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (internalLink) {
    return (
      <Link
        href={internalLink}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-3xl"
      >
        {CardShell}
      </Link>
    );
  }
  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-3xl"
      >
        {CardShell}
      </a>
    );
  }
  if (project.websiteUrl) {
    return (
      <a
        href={project.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-3xl"
      >
        {CardShell}
      </a>
    );
  }

  return CardShell;
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
