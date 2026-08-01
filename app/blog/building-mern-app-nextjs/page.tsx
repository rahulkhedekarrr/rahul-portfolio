import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import { createPageMetadata, OG_IMAGE, SITE_URL } from "../../../lib/seo";

const title = "Building a MERN App with Next.js";
const description =
  "Learn how to build a full-stack MERN application using Next.js — setup, development, and deployment.";
const path = "/blog/building-mern-app-nextjs";

export const metadata: Metadata = {
  ...createPageMetadata({ title, description, path, type: "article" }),
  openGraph: {
    title,
    description,
    url: `${SITE_URL}${path}`,
    type: "article",
    publishedTime: "2024-01-15T00:00:00.000Z",
    authors: ["Rahul Khedekar"],
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
};

export default function BuildingMernAppPage() {
  return <BlogPostClient />;
}
