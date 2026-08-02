import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "project-ai-email",
    title: "AI Email Assistant",
    description:
      "A side-panel assistant for Gmail and Outlook — AI replies, thread summaries, and voice compose. Built for people who live in their inbox and want help without leaving it.",
    outcome: "Chrome Web Store Featured",
    role: "Full product",
    status: "Featured · Live",
    image: "/images/Reply.png",
    technologies: ["JavaScript", "Chrome MV3", "Service Workers", "REST"],
    slug: "/projects/ai-email-assistant",
    liveUrl:
      "https://chromewebstore.google.com/detail/icjcmabkdiomnkiphgjopbkkhlfcabgp?utm_source=item-share-cb",
  },
  {
    id: "project-lama",
    title: "Lama Gaming OS",
    description:
      "A Telegram-native gaming product with a full admin panel. Built for players inside Telegram and the operators who run campaigns, rewards, and day-to-day ops.",
    outcome: "1.7k+ users on a live Mini App",
    role: "Full stack",
    status: "Live · 1.7k+ users",
    image: "/images/lama.png",
    technologies: ["Next.js", "Node.js", "MongoDB", "TonConnect"],
    slug: "/projects/lama",
    liveUrl:
      "https://t.me/lama_gaming_bot/lama_gaming_bot?startapp=728420160",
    websiteUrl: "https://www.lamagamingapp.com/",
  },
  {
    id: "project-whatsapp",
    title: "WhatsApp Message Service",
    description:
      "A service for teams sending WhatsApp campaigns through Meta's API — prepaid billing, delivery tracking, and refunds when messages fail so campaigns don't silently break.",
    outcome: "Reliable campaign delivery with prepaid billing",
    role: "Backend / platform",
    status: "Production",
    image: "/images/whatsapp-message-service.svg",
    technologies: ["Node.js", "Express", "MongoDB", "Redis"],
    slug: "/projects/whatsapp-message-service",
  },
  {
    id: "project-mass-mail",
    title: "Mass Mail Sender",
    description:
      "An email service for large campaigns — queues, rate-limits, and tracks sends through AWS SES so volume stays within provider limits and stays measurable.",
    outcome: "Built for large campaigns without burning email limits",
    role: "Backend / systems",
    status: "Production",
    image: "/images/mass-mail-sender.svg",
    technologies: ["Node.js", "Express", "MongoDB", "AWS SES"],
    slug: "/projects/mass-mail-sender",
  },
  {
    id: "project-ai-learning",
    title: "AI University Learning Platform",
    description:
      "A platform for universities — instructors build courses, students get AI-guided study and practice, and instructors see how learning is going.",
    outcome:
      "Courses, AI study sessions, and instructor insights in one product",
    role: "Frontend / product",
    status: "Production",
    image: "/images/ai-learning-platform.svg",
    technologies: ["Next.js", "React", "TanStack Query", "Tailwind CSS"],
    slug: "/projects/ai-learning-platform",
  },
];
