import type { Copy, Lang } from "../../lib/portfolio-data";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

type NavButtonProps = {
  href: string;
  label: string;
  isDark: boolean;
};

function NavButton({ href, label, isDark }: NavButtonProps) {
  return (
    <a
      href={href}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold transition-transform active:scale-95 whitespace-nowrap
      ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-blue-900/10"}`}
    >
      {label}
    </a>
  );
}

type NavBarProps = {
  copy: Copy;
  lang: Lang;
  onLangToggle: () => void;
  theme: Theme;
  onThemeToggle: () => void;
  isDark: boolean;
};

export function NavBar({ copy, lang, onLangToggle, theme, onThemeToggle, isDark }: NavBarProps) {
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 h-16 border-b backdrop-blur-md transition-colors duration-500 ${
        isDark ? "bg-[#050505]/70 border-gray-800" : "bg-white/70 border-gray-200"
      }`}
    >
      <div className="relative mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <div className="flex-shrink-0">
          <a href="#top" className="group inline-flex items-center gap-2 text-lg font-bold tracking-tighter sm:text-xl">
            <span
              className={`relative flex h-4 w-4 items-center justify-center rounded-[6px] border bg-gradient-to-br text-current shadow-sm transition-transform duration-300 motion-reduce:animate-none animate-[logoNudge_800ms_cubic-bezier(0.16,1,0.3,1)_1] group-hover:scale-110 group-hover:rotate-[360deg] sm:h-5 sm:w-5 ${
                isDark
                  ? "border-purple-500/40 from-purple-500/30 via-transparent to-purple-500/10 text-purple-300 shadow-purple-500/20"
                  : "border-blue-500/40 from-blue-500/30 via-transparent to-blue-500/10 text-blue-700 shadow-blue-500/20"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <path d="M4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3" />
              </svg>
            </span>
            <span>
              Dev<span className={isDark ? "text-purple-500" : "text-blue-600"}>.</span>
            </span>
          </a>
        </div>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 sm:gap-4">
          <NavButton href="#projects" label={copy.nav.projects} isDark={isDark} />
          <NavButton href="#technologies" label={copy.nav.stack} isDark={isDark} />
          <NavButton href="#contact" label={copy.nav.contact} isDark={isDark} />
        </div>

        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <button
            onClick={onLangToggle}
            className={`p-1.5 text-[10px] font-bold uppercase tracking-widest sm:p-2 sm:text-xs rounded-md border transition-all ${isDark ? "border-gray-800 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-100"}`}
            type="button"
            aria-label="Cambiar idioma"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={onThemeToggle}
            className={`rounded-md p-1.5 sm:p-2 transition-all ${isDark ? "text-yellow-400 hover:bg-gray-800" : "text-slate-600 hover:bg-gray-100"}`}
            type="button"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Sun size={16} className="sm:h-[18px] sm:w-[18px]" /> : <Moon size={16} className="sm:h-[18px] sm:w-[18px]" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
