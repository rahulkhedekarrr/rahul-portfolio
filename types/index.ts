// TypeScript interfaces for the portfolio application

export interface NavItem {
  id: string;
  href: string;
  label: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  /** One-line engineering / business outcome shown on cards */
  outcome?: string;
  /** Internal case-study path, e.g. /projects/lama */
  slug?: string;
  liveUrl?: string;
  websiteUrl?: string;
}

export interface ContactLink {
  id: string;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface AboutItem {
  id: string;
  title: string;
  description: string;
  borderColor: string;
}
