"use client";

import { memo, useCallback, useRef, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { m as motion } from "framer-motion";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = memo(({ project, index = 0 }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const internalLink = project.slug;

  const handlePointerMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  const hasValidImage =
    Boolean(project.image) &&
    project.image !== "+" &&
    project.image.startsWith("/");

  const CardShell = (
    <motion.div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      className="spotlight-card group flex h-full flex-col border border-sharp bg-sharp-surface transition-colors duration-200 hover:border-sharp-accent"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-sharp bg-sharp">
        {hasValidImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="tech-grid absolute inset-0 flex items-end p-4">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-sharp-accent">
              {project.title.split(" ")[0]}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-[1] flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold leading-snug text-sharp-fg sm:text-xl">
            {project.title}
          </h3>
          {project.status ? (
            <span className="shrink-0 font-mono text-[11px] tracking-wide text-sharp-accent sm:text-xs">
              {project.status}
            </span>
          ) : null}
        </div>

        {project.role ? (
          <p className="mb-3 font-mono text-[11px] tracking-wide text-sharp-muted sm:text-xs">
            {project.role}
          </p>
        ) : null}

        <p className="mb-4 flex-1 text-sm leading-relaxed text-sharp-muted">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-sharp pt-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sharp-muted transition-colors group-hover:text-sharp-accent">
            View case →
          </span>
          <span className="font-mono text-[10px] text-sharp-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (internalLink) {
    return (
      <Link
        href={internalLink}
        className="block h-full rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sharp-accent"
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
        className="block h-full"
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
        className="block h-full"
      >
        {CardShell}
      </a>
    );
  }

  return CardShell;
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
