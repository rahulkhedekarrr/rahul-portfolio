"use client";

import { useState, useEffect, useMemo, memo, useCallback, useRef } from "react";
import Link from "next/link";
import {
  m as motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Smartphone,
  Menu,
  X,
} from "lucide-react";

// TypeScript interfaces
interface NavItem {
  id: string;
  href: string;
  label: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  skills: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  websiteUrl?: string;
}

interface ContactLink {
  id: string;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface AboutItem {
  id: string;
  title: string;
  description: string;
  borderColor: string;
}

// Data arrays
const navigationItems: NavItem[] = [
  { id: "about", href: "#about", label: "About" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "contact", href: "#contact", label: "Contacts" },
];

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code,
    color: "text-purple-400",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript/TypeScript",
      "HTML5 & CSS3",
      "Vue.js",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "text-cyan-400",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Cron Jobs & Scheduling",
      "API Integration (3rd-party APIs, Telegram WebApp SDK)",
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    color: "text-green-400",
    skills: ["MongoDB", "Mongoose", "Database Indexing & Query Optimization"],
  },
  {
    id: "tools",
    title: "Tools & Others",
    icon: Smartphone,
    color: "text-pink-400",
    skills: [
      "Git & GitHub",
      "Redux",
      "Telegram Mini Apps",
      "Google Apps Script",
      "Chrome Extensions (Manifest V3)",
    ],
  },
];

const projects: Project[] = [
  {
    id: "project-1",
    title: "Lama Gaming OS — Telegram-Native Gamified Platform.",
    description:
      "Lama Gaming Ecosystem is a Telegram-native platform built with React/Next.js, Node.js, and MongoDB, featuring secure APIs, Web3-ready TonConnect, Adsgram SDK, and an Admin Panel for full control.",
    image: "/images/lama.png",
    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "TonConnect",
      "Tailwind CSS",
    ],
    liveUrl: "https://t.me/lama_gaming_bot/lama_gaming_bot?startapp=728420160",
    websiteUrl: "https://www.lamagamingapp.com/",
  },
  {
    id: "project-replybox",
    title: "AI-Powered Email Assistant Chrome Extension",
    description:
      "A Chrome extension for Gmail and Outlook that generates smart replies, summaries, templates, and supports voice input with strong privacy.",
    image: "/images/Reply.png",
    technologies: ["Vue 3", "Tailwind CSS", "OpenAI API", "Chrome APIs"],
    liveUrl:
      "https://chromewebstore.google.com/detail/replybox-ai-email-writer/icjcmabkdiomnkiphgjopbkkhlfcabgp?utm_source=item-share-cb&pli=1",
  },
  {
    id: "project-canteen",
    title: "Smart Canteen & Catering Management System",
    description:
      "Multi-portal Next.js app for Reception, Kitchen, and Users with QR-first pickup, payment gating, real-time dashboards, and kiosk-ready receipt printing.",
    image: "+",
    technologies: ["Next.js", "Tailwind CSS", "Zustand", "SweetAlert2"],
    websiteUrl: "/projects/canteen",
  },
  {
    id: "project-ecommerce",
    title: "Ecommerce Website — Next.js, Redux, Bootstrap",
    description:
      "A modern ecommerce storefront with categories, product pages, add to cart, wishlist, search, sorting, and responsive UI.",
    image: "+",
    technologies: ["Next.js", "Redux", "Bootstrap", "JavaScript"],
    websiteUrl: "/projects/ecommerce",
  },
];

const contactLinks: ContactLink[] = [
  {
    id: "email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=khedekarrahul4@gmail.com",
    label: "khedekarrahul4@gmail.com",
    icon: Mail,
    color: "text-purple-400",
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/in/rahulkhedekarr",
    label: "LinkedIn",
    icon: Linkedin,
    color: "text-cyan-400",
  },
];

const aboutItems: AboutItem[] = [
  {
    id: "experience",
    title: "Experience",
    description: "Building scalable web applications with modern technologies",
    borderColor: "border-purple-400",
  },
  {
    id: "specialization",
    title: "Specialization",
    description: "MERN Stack Development (MongoDB, Express.js, React, Node.js)",
    borderColor: "border-cyan-400",
  },
  {
    id: "focus",
    title: "Focus",
    description:
      "Creating responsive, performant, and user-centric applications",
    borderColor: "border-pink-400",
  },
];

// Smooth scrolling hook
const useSmoothScroll = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return smoothProgress;
};

// Reusable components with Framer Motion optimizations
const SectionHeader = memo(({ title }: { title: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="text-center mb-16 layout-stable"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-optimized"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          },
        }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
});

SectionHeader.displayName = "SectionHeader";

// Smooth scroll function
const smoothScrollTo = (targetId: string) => {
  console.log("Scrolling to:", targetId); // Debug log
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    console.log("Target element found:", targetElement); // Debug log
    const headerHeight = 100; // Account for sticky header
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    console.log("Target element not found for:", targetId); // Debug log
  }
};

// Optimized navigation component with smooth scrolling
const Navigation = memo(({ items }: { items: NavItem[] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Cleanup on unmount
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 p-6 smooth-scroll transition-all duration-300 ${
          isScrolled ? "bg-slate-900/20 backdrop-blur-md" : ""
        }`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.1,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className={`group backdrop-blur-optimized rounded-2xl border shadow-xl p-4 hover-optimized gpu-accelerated transition-all duration-300 ${
              isScrolled
                ? "border-white/30 shadow-2xl"
                : "border-white/20 shadow-xl"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: isScrolled ? -2 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: isScrolled
                ? "rgba(15, 23, 42, 0.95)"
                : "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div className="flex justify-between items-center">
              <motion.div
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.3,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 2,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                RK
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {items.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 hover-optimized"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(item.href);
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.4 + index * 0.08,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Hamburger Menu Button */}
              <motion.button
                className="md:hidden relative z-[100] p-2 rounded-xl backdrop-blur-optimized border border-white/20 hover-optimized gpu-accelerated"
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <motion.div
                  className="w-6 h-6 flex flex-col justify-center items-center"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                >
                  <motion.span
                    className="w-6 h-0.5 bg-white block rounded-full"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-white block rounded-full mt-1"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-white block rounded-full mt-1"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Mobile Menu Overlay */}
            <motion.div
              className="fixed inset-0 z-[90] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </motion.div>

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-screen w-80 max-w-[85vw] z-[100] md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="h-screen backdrop-blur-optimized bg-slate-900/95 border-l border-white/20 shadow-2xl flex flex-col">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                  <motion.div
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    RK
                  </motion.div>
                  <motion.button
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                    onClick={toggleMobileMenu}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                {/* Menu Items - Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-lg font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          smoothScrollTo(item.href);
                          // Close mobile menu after a short delay to allow scroll to start
                          setTimeout(() => {
                            toggleMobileMenu();
                          }, 100);
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + index * 0.1,
                        }}
                        whileHover={{
                          scale: 1.02,
                          x: 8,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Contact Links in Mobile Menu */}
                  <motion.div
                    className="mt-8 pt-6 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <h3 className="text-white/60 text-sm font-medium mb-4 uppercase tracking-wider">
                      Get In Touch
                    </h3>
                    <div className="space-y-3">
                      <motion.a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=khedekarrahul4@gmail.com"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        target="_blank"
                      >
                        <Mail className="w-5 h-5 text-purple-400" />
                        <span className="text-white/80">Email</span>
                      </motion.a>
                      <motion.a
                        href="https://linkedin.com/in/rahulkhedekarr"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        target="_blank"
                      >
                        <Linkedin className="w-5 h-5 text-cyan-400" />
                        <span className="text-white/80">LinkedIn</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Navigation.displayName = "Navigation";

// Optimized skill card component with Framer Motion
const SkillCard = memo(({ category }: { category: SkillCategory }) => {
  const IconComponent = category.icon;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  return (
    <motion.div
      ref={ref}
      className="group backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8 hover-optimized gpu-accelerated"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon */}
      <motion.div
        className={`${category.color} mb-4`}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <IconComponent className="w-12 h-12 mx-auto" />
      </motion.div>

      {/* Title */}
      <motion.h3
        className="text-xl font-bold text-white mb-4 text-center text-optimized"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {category.title}
      </motion.h3>

      {/* Skills list */}
      <div className="space-y-2">
        {category.skills.map((skill, index) => (
          <motion.div
            key={index}
            className="text-white/80 text-center text-optimized"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.3 + index * 0.1,
            }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

// Optimized project card component with Framer Motion
const ProjectCard = memo(({ project }: { project: Project }) => {
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

// Optimized contact link component with Framer Motion
const ContactLink = memo(({ link }: { link: ContactLink }) => {
  const IconComponent = link.icon;
  return (
    <motion.a
      href={link.href}
      className="group flex items-center justify-center sm:justify-start space-x-3 backdrop-blur-optimized border border-white/20 rounded-2xl p-4 hover-optimized gpu-accelerated w-full sm:w-auto"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.95 }}
      target="_blank"
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <IconComponent className={`w-6 h-6 ${link.color}`} />
      </motion.div>
      <span className="text-white font-medium text-optimized">
        {link.label}
      </span>
    </motion.a>
  );
});

ContactLink.displayName = "ContactLink";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  const fadeDown = {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  // Memoize expensive computations
  const memoizedSkillCategories = useMemo(() => skillCategories, []);
  const memoizedProjects = useMemo(() => projects, []);
  const memoizedContactLinks = useMemo(() => contactLinks, []);
  const memoizedAboutItems = useMemo(() => aboutItems, []);
  const memoizedNavigationItems = useMemo(() => navigationItems, []);

  // Optimize callbacks
  const handleScroll = useCallback(() => {
    // Add scroll optimization if needed
  }, []);

  const HeroCard = () => {
    return (
      <motion.div
        className="group backdrop-blur-optimized elevated-surface rounded-3xl border border-white/20 shadow-2xl p-12 mb-8 gpu-accelerated hover-optimized"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-tight text-optimized"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.6,
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          Rahul
          <motion.span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.7,
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            Khedekar
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto text-optimized"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.8,
          }}
          whileHover={{
            scale: 1.01,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          Full Stack Web Developer specializing in the MERN stack, crafting
          exceptional digital experiences with modern technologies
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.9,
          }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl text-white font-semibold overflow-hidden hover-optimized gpu-accelerated"
            onClick={() => smoothScrollTo("#projects")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 1.0,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-optimized">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-white/10"
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.2)",
                transition: { duration: 0.3 },
              }}
            />
          </motion.button>
          <motion.button
            className="group px-8 py-4 backdrop-blur-optimized elevated-surface border border-white/20 rounded-2xl text-white font-semibold hover-optimized gpu-accelerated"
            onClick={() => smoothScrollTo("#contact")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 1.1,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-optimized">Get In Touch</span>
            <motion.div
              className="absolute inset-0 bg-white/5 rounded-2xl"
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
                transition: { duration: 0.3 },
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden scroll-container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Optimized background elements with Framer Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none paint-optimized">
        <div className="absolute -inset-10 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl gpu-accelerated blob-anim-20" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl gpu-accelerated blob-anim-25" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl gpu-accelerated blob-anim-30" />
        </div>
      </div>

      {/* Optimized Navigation */}
      <Navigation items={memoizedNavigationItems} />

      {/* Hero Section with Framer Motion */}
      <motion.section
        className="relative z-10 px-6 py-20 smooth-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.0,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <HeroCard />
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="relative z-10 px-6 py-20 smooth-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="About Me" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8 gpu-accelerated"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-optimized">
                Passionate Developer
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed text-optimized">
                I'm a dedicated Full Stack Web Developer with expertise in the
                MERN stack. I love creating seamless, user-friendly applications
                that solve real-world problems. My passion lies in turning ideas
                into powerful digital solutions.
              </p>
              <p className="text-white/80 mb-6 leading-relaxed text-optimized">
                With experience in both frontend and backend development, I
                bring a comprehensive understanding of web technologies to every
                project. I'm always eager to learn new technologies and stay
                updated with the latest industry trends.
              </p>
              <div className="flex space-x-4">
                <motion.div
                  className="flex items-center space-x-2 text-purple-400"
                  whileHover={{ scale: 1.05 }}
                >
                  <Code className="w-5 h-5" />
                  <span className="text-optimized">Frontend Expert</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2 text-cyan-400"
                  whileHover={{ scale: 1.05 }}
                >
                  <Server className="w-5 h-5" />
                  <span className="text-optimized">Backend Specialist</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8 gpu-accelerated"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-6">
                {memoizedAboutItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`border-l-4 ${item.borderColor} pl-6`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-2 text-optimized">
                      {item.title}
                    </h4>
                    <p className="text-white/80 text-optimized">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="relative z-10 px-6 py-20 smooth-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Technical Skills" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memoizedSkillCategories.map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="relative z-10 px-6 py-20 smooth-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Featured Projects" />

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {memoizedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="relative z-10 px-6 py-20 smooth-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Let's Connect" />

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 gpu-accelerated"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center mb-8">
                <motion.h3
                  className="text-2xl font-bold text-white mb-4 text-optimized"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Ready to work together?
                </motion.h3>
                <motion.p
                  className="text-white/80 text-lg text-optimized"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Let's discuss your next project or just say hello!
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {memoizedContactLinks.map((link) => (
                  <ContactLink key={link.id} link={link} />
                ))}
              </motion.div>

              {/* <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="group relative px-12 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl text-white font-semibold overflow-hidden hover-optimized gpu-accelerated"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-optimized">
                    Start a Conversation
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 px-6 py-8 smooth-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="backdrop-blur-optimized rounded-2xl border border-white/20 shadow-xl p-6 gpu-accelerated"
            whileHover={{ scale: 1.01 }}
          >
            <div className="text-center">
              <p className="text-white/80 text-optimized">
                © 2025 Rahul Khedekar. Crafted with passion and modern
                technologies.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
