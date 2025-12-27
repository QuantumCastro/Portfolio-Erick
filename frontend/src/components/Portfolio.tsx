import { useEffect, useState } from "react";
import { COPY, PROJECTS, TECHNOLOGIES, type Lang } from "../lib/portfolio-data";
import { ContactSection } from "./portfolio/ContactSection";
import { FooterSection } from "./portfolio/FooterSection";
import { HeroSection } from "./portfolio/HeroSection";
import { NavBar } from "./portfolio/NavBar";
import { ProjectsSection } from "./portfolio/ProjectsSection";
import { TechSection } from "./portfolio/TechSection";

type Theme = "light" | "dark";

export function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const copy = COPY[lang];
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.style.setProperty("color-scheme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleTechToggle = (id: string) => {
    setActiveTech((current) => (current === id ? null : id));
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${
        isDark ? "bg-[#050505] text-gray-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <NavBar
        copy={copy}
        lang={lang}
        onLangToggle={() => setLang((value) => (value === "en" ? "es" : "en"))}
        theme={theme}
        onThemeToggle={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
        isDark={isDark}
      />

      <main className="mx-auto max-w-5xl px-4 pt-16 pb-8 sm:px-6 space-y-16 sm:space-y-20">
        <HeroSection copy={copy} isDark={isDark} />
        <ProjectsSection copy={copy} lang={lang} projects={PROJECTS} isDark={isDark} />
        <TechSection copy={copy} lang={lang} technologies={TECHNOLOGIES} isDark={isDark} activeTech={activeTech} onToggle={handleTechToggle} />
        <ContactSection copy={copy} isDark={isDark} />
      </main>

      <FooterSection copy={copy} isDark={isDark} />
    </div>
  );
}
