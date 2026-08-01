import type { Metadata } from "next";

export const SITE_URL = "https://www.rahulkhedekar.in";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Rahul Khedekar Portfolio",
      type,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
