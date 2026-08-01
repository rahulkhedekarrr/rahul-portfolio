import { Code, Database, Server, Smartphone } from "lucide-react";
import { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code,
    color: "text-sharp-accent",
    skills: [
      "React.js",
      "Next.js",
      "MERN Stack",
      "TypeScript / JavaScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Radix / CVA patterns",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "text-sharp-accent",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "AI / LLM API integration",
      "BullMQ + Redis queues",
      "JWT auth",
      "Joi validation",
      "AWS SES",
      "Meta WhatsApp Cloud API",
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    color: "text-sharp-accent",
    skills: [
      "MongoDB",
      "Mongoose",
      "Indexing & query optimization",
      "Transactional / wallet patterns",
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    icon: Smartphone,
    color: "text-sharp-accent",
    skills: [
      "Chrome Extensions (MV3)",
      "Vercel",
      "Docker",
      "Railway",
      "OpenAPI / Swagger",
      "Google OAuth / Firebase",
      "Cloudinary",
      "Telegram Mini Apps",
      "Git & GitHub",
    ],
  },
];
