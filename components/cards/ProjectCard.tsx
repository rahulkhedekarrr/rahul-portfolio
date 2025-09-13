"use client";

import { memo, useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { m as motion, useInView } from "framer-motion";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = memo(({ project }: ProjectCardProps) => {
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

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

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
  const suppressExternalLinks = false;

  const CardShell = (
    <motion.div
      ref={ref}
      className="group h-full flex flex-col backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl overflow-hidden hover-optimized gpu-accelerated cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header without image: gradient strip + initials badge */}
      <div className="relative">
        <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />
        <div className="px-6 pt-5 pb-0 flex items-center gap-3">
          <motion.h3
            className="text-xl font-bold text-white text-optimized"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            {project.title}
          </motion.h3>
        </div>
      </div>
      <div className="p-6 pt-4 flex-1 flex flex-col">
        <motion.p
          className="text-white/80 mb-4 leading-relaxed text-optimized"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {project.description}
        </motion.p>
        {project.technologies.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                className={`px-3 py-1 ${
                  technologyColors[index % technologyColors.length]
                } rounded-full text-sm text-optimized`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0.5 + index * 0.1,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}
        <div className="mt-auto flex items-center justify-between">
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent mr-4" />
          <motion.span
            className="text-xs tracking-wider uppercase text-white/60"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            View details
          </motion.span>
        </div>
      </div>
    </motion.div>
  );

  // Make whole card clickable: internal route takes priority; then liveUrl; then websiteUrl
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
  if (!suppressExternalLinks && project.liveUrl) {
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
  if (!suppressExternalLinks && project.websiteUrl) {
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
