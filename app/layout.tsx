import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "../components/motion-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
  description:
    "Explore the professional portfolio of Rahul Khedekar, a Full Stack Web Developer based in Surat, Gujarat. Specializing in MERN Stack, Next.js, and scalable web applications. Showcasing projects, skills, and expertise in building modern, high-performance digital solutions.",
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
  ],
  authors: [{ name: "Rahul Khedekar" }],
  openGraph: {
    title: "Rahul Khedekar | Full Stack Developer Portfolio",
    description:
      "Discover the work and expertise of Rahul Khedekar, a Full Stack Developer from Surat, Gujarat. Skilled in MERN, Next.js, and building modern, scalable applications.",
    url: "https://your-portfolio-link.com",
    siteName: "Rahul Khedekar Portfolio",
    images: [
      {
        url: "https://your-portfolio-link.com/og-image.jpg", // replace with actual image link
        width: 1200,
        height: 630,
        alt: "Rahul Khedekar - Full Stack Developer Surat Gujarat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
    description:
      "Professional portfolio of Rahul Khedekar, a Full Stack Web Developer from Surat, Gujarat. Specializing in MERN Stack & Next.js development.",
    creator: "@rahulkhedekarr", // replace if you have one
    images: ["https://your-portfolio-link.com/og-image.jpg"], // replace with actual image link
  },
  metadataBase: new URL("https://your-portfolio-link.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
