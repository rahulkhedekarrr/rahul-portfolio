import { Project } from '../types';

export const projects: Project[] = [
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
