import type { Copy } from "../../lib/portfolio-data";
import type { JSX } from "react";
import { ArrowRight, Layers, Mail } from "lucide-react";

type SocialButtonProps = {
  href: string;
  icon: JSX.Element;
  label: string;
  isDark: boolean;
  className?: string;
};

function SocialButton({ href, icon, label, isDark, className }: SocialButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`p-3 rounded-lg border transition-all duration-200 hover:-translate-y-0.5
        ${
          isDark
            ? "bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:border-purple-500/50"
            : "bg-white border-gray-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 shadow-sm"
        } ${className ?? ""}`}
    >
      {icon}
    </a>
  );
}

type HeroSectionProps = {
  copy: Copy;
  isDark: boolean;
};

export function HeroSection({ copy, isDark }: HeroSectionProps) {
  return (
    <section id="top" className="min-h-[50vh] scroll-mt-24 pt-6 animate-fade-in flex flex-col justify-center">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap ${isDark ? "text-white" : "text-slate-900"}`}>
          Erick Jiménez
        </h2>
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest border ${isDark ? "border-purple-500/20 text-purple-400 bg-purple-500/10" : "border-blue-200 text-blue-700 bg-blue-50"}`}
        >
          {copy.hero.role}
        </span>
      </div>

      <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
        {copy.hero.titleStart} <br />
        <span
          className={`bg-gradient-to-r bg-clip-text text-transparent ${
            isDark ? "from-purple-400 to-pink-600" : "from-blue-600 to-teal-500"
          }`}
        >
          {copy.hero.titleColor}
        </span>
        {copy.hero.titleEnd}
      </h1>

      <p className={`mb-8 max-w-xl text-lg leading-relaxed sm:text-xl ${isDark ? "text-gray-400" : "text-slate-600"}`}>{copy.hero.intro}</p>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className={`flex h-12 items-center gap-2 rounded-lg px-6 font-semibold transition-transform active:scale-95 whitespace-nowrap ${
            isDark ? "bg-white text-black hover:bg-gray-200" : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-blue-900/10"
          }`}
        >
          {copy.hero.cta} <ArrowRight size={18} />
        </a>
        <div className="flex gap-2">
          <SocialButton
            href="#technologies"
            label="Stack"
            icon={<Layers size={20} />}
            isDark={isDark}
            className="motion-reduce:animate-none animate-[stackHint_1.6s_ease-in-out_infinite]"
          />
          <SocialButton
            href="#contact"
            label="Email"
            icon={<Mail size={20} />}
            isDark={isDark}
            className="motion-reduce:animate-none animate-[stackHint_1.6s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </section>
  );
}
