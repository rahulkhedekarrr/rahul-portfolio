import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "../components/motion-provider";
import Script from "next/script";
import { OG_IMAGE, SITE_URL } from "../lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500"],
  variable: "--font-mono",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
    template: "%s | Rahul Khedekar",
  },
  description:
    "Rahul Khedekar — full stack developer building production MERN and Next.js apps, AI Chrome extensions, and WhatsApp/email APIs.",
  authors: [{ name: "Rahul Khedekar" }],
  creator: "Rahul Khedekar",
  publisher: "Rahul Khedekar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
    description:
      "Full stack developer building production MERN and Next.js apps, AI Chrome extensions, and scalable messaging APIs.",
    url: SITE_URL,
    siteName: "Rahul Khedekar Portfolio",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Rahul Khedekar — Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
    description:
      "Full stack developer for MERN, Next.js, React, Node.js, Chrome extensions, and WhatsApp/email APIs.",
    creator: "@rahulkhedekarr",
    images: [OG_IMAGE],
  },
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
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
    name: "Rahul Khedekar",
    url: SITE_URL,
    image: OG_IMAGE,
    sameAs: [
      "https://www.linkedin.com/in/rahulkhedekarr",
      "https://github.com/rahulkhedekarr",
    ],
    jobTitle: "Full Stack Developer",
    description:
      "Full stack developer specializing in MERN Stack, Next.js, React, Node.js, Chrome extensions, and messaging APIs",
    knowsAbout: [
      "MERN Stack",
      "Next.js",
      "React.js",
      "Node.js",
      "MongoDB",
      "Chrome Extensions",
      "WhatsApp Cloud API",
      "AWS SES",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="mbF5CGhdELXBL-_Lo8TzonZy3XPmtr8qvKBQvxwmVkc"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <MotionProvider>{children}</MotionProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZVLPLVXNYY"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZVLPLVXNYY');
          `}
        </Script>
      </body>
    </html>
  );
}
