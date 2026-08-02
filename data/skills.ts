import { Code, Database, Server, Wrench } from "lucide-react";
import { SkillCategory } from "../types";

export const workAreas = [
  "AI Applications",
  "Chrome Extensions",
  "SaaS Platforms",
  "Custom Business Software",
  "Backend Systems",
  "Automation",
  "API Integrations",
  "Dashboards",
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code,
    color: "text-sharp-accent",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "text-sharp-accent",
    skills: ["Node.js", "Express", "REST APIs", "Background jobs"],
  },
  {
    id: "database",
    title: "Databases",
    icon: Database,
    color: "text-sharp-accent",
    skills: ["MongoDB", "Redis"],
  },
  {
    id: "tools",
    title: "Cloud & AI",
    icon: Wrench,
    color: "text-sharp-accent",
    skills: [
      "Vercel",
      "Railway",
      "OpenAI / LLM APIs",
      "AWS SES",
      "WhatsApp Cloud API",
      "Docker",
      "Chrome Extensions",
    ],
  },
];
