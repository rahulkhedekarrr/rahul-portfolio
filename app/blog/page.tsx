import { Metadata } from "next";
import Link from "next/link";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - Rahul Khedekar | MERN Stack & Next.js Developer",
  description: "Read articles about MERN stack development, Next.js best practices, and web development insights from Rahul Khedekar.",
  keywords: [
    "MERN stack blog",
    "Next.js tutorials",
    "React development",
    "Node.js backend",
    "Web development articles",
    "Full stack developer blog",
    "JavaScript tutorials",
    "MongoDB guides",
  ],
  openGraph: {
    title: "Blog - Rahul Khedekar | MERN Stack & Next.js Developer",
    description: "Read articles about MERN stack development, Next.js best practices, and web development insights.",
    url: "https://www.rahulkhedekar.in/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
