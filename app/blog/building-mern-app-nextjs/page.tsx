import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

export const metadata: Metadata = {
  title: "Building a MERN App with Next.js: Complete Guide | Rahul Khedekar",
  description: "Learn how to build a full-stack MERN application using Next.js as the frontend framework. Complete guide covering setup, development, and deployment.",
  keywords: [
    "MERN stack tutorial",
    "Next.js MERN app",
    "MongoDB Express React Node.js",
    "Full stack development",
    "Next.js backend integration",
    "MERN stack guide",
    "React Next.js tutorial",
    "Node.js Express API",
  ],
  openGraph: {
    title: "Building a MERN App with Next.js: Complete Guide",
    description: "Learn how to build a full-stack MERN application using Next.js as the frontend framework. Complete guide covering setup, development, and deployment.",
    url: "https://www.rahulkhedekar.in/blog/building-mern-app-nextjs",
    type: "article",
    publishedTime: "2024-01-15T00:00:00.000Z",
    authors: ["Rahul Khedekar"],
  },
};

export default function BuildingMernAppPage() {
  return <BlogPostClient />;
}
