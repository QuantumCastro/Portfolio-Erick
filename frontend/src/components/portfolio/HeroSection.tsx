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
      className={`rounded-lg border p-3 transition-all duration-200 hover:-translate-y-0.5 ${
        isDark
          ? "border-gray-800 bg-gray-900 text-gray-400 hover:border-purple-500/50 hover:text-white"
          : "border-gray-200 bg-white text-slate-500 shadow-sm hover:border-blue-200 hover:text-blue-600"
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
    <section
      id="top"
      className="animate-fade-in flex min-h-[50vh] scroll-mt-24 flex-col justify-center pt-6"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h2
          className={`whitespace-nowrap text-xl font-bold tracking-tight sm:text-2xl ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Erick Jiménez
        </h2>
        <span
          className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest sm:text-xs ${isDark ? "border-purple-500/20 bg-purple-500/10 text-purple-400" : "border-blue-200 bg-blue-50 text-blue-700"}`}
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

      <p
        className={`mb-8 max-w-xl text-lg leading-relaxed sm:text-xl ${isDark ? "text-gray-400" : "text-slate-600"}`}
      >
        {copy.hero.intro}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className={`flex h-12 items-center gap-2 whitespace-nowrap rounded-lg px-6 font-semibold transition-transform active:scale-95 ${
            isDark
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-slate-900 text-white shadow-xl shadow-blue-900/10 hover:bg-slate-800"
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
            className="animate-[stackHint_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
          />
          <SocialButton
            href="#contact"
            label="Email"
            icon={<Mail size={20} />}
            isDark={isDark}
            className="animate-[stackHint_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
          />
        </div>
      </div>
    </section>
  );
}
