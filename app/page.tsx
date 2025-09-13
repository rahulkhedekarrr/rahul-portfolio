"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { m as motion, useScroll, useSpring } from "framer-motion";

// Import types
import {
  NavItem,
  SkillCategory,
  Project,
  ContactLink,
  AboutItem,
} from "../types";

// Import data
import { navigationItems } from "../data/navigation";
import { skillCategories } from "../data/skills";
import { projects } from "../data/projects";
import { contactLinks } from "../data/contacts";
import { aboutItems } from "../data/about";

// Import hooks
import { useSmoothScroll } from "../hooks/useSmoothScroll";

// Import components
import Navigation from "../components/navigation/Navigation";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ContactSection from "../components/sections/ContactSection";
import FooterSection from "../components/sections/FooterSection";
import Background from "../components/layout/Background";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const smoothProgress = useSmoothScroll();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  };

  // Memoize expensive computations
  const memoizedSkillCategories = useMemo(() => skillCategories, []);
  const memoizedProjects = useMemo(() => projects, []);
  const memoizedContactLinks = useMemo(() => contactLinks, []);
  const memoizedAboutItems = useMemo(() => aboutItems, []);
  const memoizedNavigationItems = useMemo(() => navigationItems, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden scroll-container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Background elements */}
      <Background />

      {/* Navigation */}
      <Navigation items={memoizedNavigationItems} />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection aboutItems={memoizedAboutItems} />

      {/* Skills Section */}
      <SkillsSection skillCategories={memoizedSkillCategories} />

      {/* Projects Section */}
      <ProjectsSection projects={memoizedProjects} />

      {/* Contact Section */}
      <ContactSection contactLinks={memoizedContactLinks} />

      {/* Footer */}
      <FooterSection />
    </motion.div>
  );
}
