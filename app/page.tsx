import { navigationItems } from "../data/navigation";
import { projects } from "../data/projects";
import { aboutItems } from "../data/about";
import Navigation from "../components/navigation/Navigation";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ContactSection from "../components/sections/ContactSection";
import FooterSection from "../components/sections/FooterSection";
import Background from "../components/layout/Background";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 scroll-container">
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
