import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { navigationItems } from "../data/navigation";
import { projects } from "../data/projects";
import { aboutItems } from "../data/about";
import Navigation from "../components/navigation/Navigation";
import HeroSection from "../components/sections/HeroSection";
import Background from "../components/layout/Background";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Rahul Khedekar | Full Stack Developer (MERN & Next.js)",
  description:
    "Rahul Khedekar — full stack developer building production MERN and Next.js apps, AI Chrome extensions, and WhatsApp/email APIs.",
  path: "/",
});

const AboutSection = dynamic(
  () => import("../components/sections/AboutSection"),
  { ssr: true }
);
const SkillsSection = dynamic(
  () => import("../components/sections/SkillsSection"),
  { ssr: true }
);
const ProjectsSection = dynamic(
  () => import("../components/sections/ProjectsSection"),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("../components/sections/ContactSection"),
  { ssr: true }
);
const FooterSection = dynamic(
  () => import("../components/sections/FooterSection"),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="relative min-h-screen bg-sharp scroll-container text-sharp-fg">
      <Background />
      <Navigation items={navigationItems} />

      <main>
        <HeroSection />
        <AboutSection aboutItems={aboutItems} />
        <SkillsSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>

      <FooterSection />
    </div>
  );
}
