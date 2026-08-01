import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "project-ai-learning",
    title: "AI University Learning Platform",
    description:
      "Multi-role Next.js platform for course authoring, adaptive AI study sessions, practice exams, and instructor understanding analytics.",
    outcome:
      "Frontend architecture for adaptive AI learning — RBAC, session orchestration, and instructor tooling",
    image: "/images/ai-learning-platform.svg",
    technologies: [
      "Next.js",
      "React",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
    ],
    slug: "/projects/ai-learning-platform",
  },
  {
    id: "project-ai-email",
    title: "AI Email Assistant (Chrome Extension)",
    description:
      "Manifest V3 side-panel assistant for Gmail and Outlook with AI replies, thread summaries, voice compose, and cost-aware Free/Pro metering.",
    outcome:
      "Chrome Web Store Featured · cut duplicate AI calls by ~60–75% with MV3 gateway locks",
    image: "/images/Reply.png",
    technologies: [
      "JavaScript",
      "Chrome MV3",
      "Service Workers",
      "Quill",
      "REST",
    ],
    slug: "/projects/ai-email-assistant",
    liveUrl:
      "https://chromewebstore.google.com/detail/icjcmabkdiomnkiphgjopbkkhlfcabgp?utm_source=item-share-cb",
  },
  {
    id: "project-whatsapp",
    title: "WhatsApp Message Service",
    description:
      "Queue-backed WhatsApp Cloud API platform with JWT auth, prepaid wallet billing, campaign tracking, and automatic refunds on delivery failure.",
    outcome:
      "ACID wallet + BullMQ delivery pipeline for reliable Meta-compliant campaigns",
    image: "/images/whatsapp-message-service.svg",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "BullMQ",
      "JWT",
    ],
    slug: "/projects/whatsapp-message-service",
  },
  {
    id: "project-mass-mail",
    title: "Mass Mail Sender",
    description:
      "Production email microservice that queues, rate-limits, sends, and tracks mass campaigns via AWS SES, Redis/BullMQ, and MongoDB.",
    outcome:
      "Designed for 10k–20k recipients/campaign with ~10/sec SES-safe throughput",
    image: "/images/mass-mail-sender.svg",
    technologies: [
      "Node.js",
      "Express",
      "BullMQ",
      "Redis",
      "MongoDB",
      "AWS SES",
    ],
    slug: "/projects/mass-mail-sender",
  },

  {
    id: "project-lama",
    title: "Lama Gaming OS — Telegram-Native Gamified Platform",
    description:
      "Telegram-native platform with React/Next.js, Node.js, and MongoDB — secure APIs, TonConnect, Adsgram SDK, and a full Admin Panel.",
    outcome: "1.7k+ users onboarded on a live Telegram Mini App + admin suite",
    image: "/images/lama.png",
    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "TonConnect",
      "Tailwind CSS",
    ],
    slug: "/projects/lama",
    liveUrl:
      "https://t.me/lama_gaming_bot/lama_gaming_bot?startapp=728420160",
    websiteUrl: "https://www.lamagamingapp.com/",
  },
];
