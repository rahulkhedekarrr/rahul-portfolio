import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "../components/motion-provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
  description: "Rahul Khedekar - Full Stack Developer (MERN & Next.js). Explore my projects, skills, and contact me for web development services.",
  keywords: [
    "Rahul Khedekar",
    "Full Stack Developer Surat",
    "MERN Stack Developer Gujarat",
    "Next.js Developer India",
    "React.js Developer",
    "Node.js Developer",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Software Engineer",
    "MERN project",
    "Next.js app",
    "React frontend",
    "Node.js backend",
  ],
  authors: [{ name: "Rahul Khedekar" }],
  creator: "Rahul Khedekar",
  publisher: "Rahul Khedekar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
    description: "Rahul Khedekar - Full Stack Developer (MERN & Next.js). Explore my projects, skills, and contact me for web development services.",
    url: "https://www.rahulkhedekar.in",
    siteName: "Rahul Khedekar Portfolio",
    images: [
      {
        url: "https://www.rahulkhedekar.in/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Rahul Khedekar - Full Stack Developer (MERN & Next.js)",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
    description: "Rahul Khedekar - Full Stack Developer (MERN & Next.js). Explore my projects, skills, and contact me for web development services.",
    creator: "@rahulkhedekarr",
    images: ["https://www.rahulkhedekar.in/og-image.svg"],
  },
  metadataBase: new URL("https://www.rahulkhedekar.in"),
  alternates: {
    canonical: "https://www.rahulkhedekar.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rahul Khedekar",
    "url": "https://www.rahulkhedekar.in",
    "sameAs": [
      "https://www.linkedin.com/in/rahulkhedekarr",
      "https://github.com/rahulkhedekarr"
    ],
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "description": "Full Stack Developer specializing in MERN Stack and Next.js development",
    "knowsAbout": [
      "MERN Stack",
      "Next.js",
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Frontend Development",
      "Backend Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
