import { Code, Database, Server, Smartphone } from "lucide-react";
import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
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
