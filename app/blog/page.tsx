import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { createPageMetadata } from "../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog — MERN & Next.js",
  description:
    "Articles about MERN stack development, Next.js best practices, and web development insights from Rahul Khedekar.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogClient />;
}
