import type { Copy, Lang, Tech } from "../../lib/portfolio-data";
import type { JSX } from "react";
import { Activity, Box, ChevronDown, Code, Database, FileCode, Globe, Layers, LayoutTemplate, Palette, Server, Terminal, Zap } from "lucide-react";

type TechSectionProps = {
  copy: Copy;
  lang: Lang;
  technologies: Tech[];
  isDark: boolean;
  activeTech: string | null;
  onToggle: (id: string) => void;
};

const techIcons: Record<Tech["icon"], JSX.Element> = {
  globe: <Globe className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  "file-code": <FileCode className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
  "layout-template": <LayoutTemplate className="h-5 w-5" />,
  palette: <Palette className="h-5 w-5" />,
  layers: <Layers className="h-5 w-5" />,
  activity: <Activity className="h-5 w-5" />,
  box: <Box className="h-5 w-5" />,
  server: <Server className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
};

const techOrder = [
  "react",
  "node",
  "docker",
  "python",
  "posgresql",
  "html",
  "css",
  "js",
  "ts",
  "next",
  "astro",
  "fastapi",
  "django",
  "tailwind",
  "nginx",
];

const techOrderIndex = new Map(techOrder.map((id, index) => [id, index]));

type TechCardProps = {
  tech: Tech;
  lang: Lang;
  isDark: boolean;
  isActive: boolean;
  onClick: () => void;
  levelLabels: Copy["tech"]["levels"];
};

function TechCard({ tech, lang, isDark, isActive, onClick, levelLabels }: TechCardProps) {
  const levelColors: Record<Tech["level"], string> = {
    expert: isDark ? "border-purple-500/50 text-purple-400" : "border-blue-600/50 text-blue-700",
    intermediate: isDark ? "border-cyan-500/50 text-cyan-400" : "border-teal-500/50 text-teal-700",
    basic: isDark ? "border-green-500/50 text-green-400" : "border-slate-400/50 text-slate-600",
  };

  const activeClass = isActive
    ? isDark
      ? "bg-gray-800 ring-1 ring-gray-700"
      : "bg-white shadow-lg ring-1 ring-black/5"
    : isDark
      ? "bg-gray-900/50 hover:bg-gray-800"
      : "bg-gray-50 hover:bg-white hover:shadow-md";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all duration-300 rounded-lg p-3 sm:p-4 border border-transparent ${activeClass}`}
      aria-expanded={isActive}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-md bg-opacity-10 ${levelColors[tech.level].replace("border", "bg")}`} aria-hidden>
            {techIcons[tech.icon]}
          </span>
          <div>
            <h4 className={`font-bold text-sm sm:text-base ${isDark ? "text-gray-100" : "text-gray-900"}`}>{tech.name}</h4>
            <span
              className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider ${levelColors[tech.level].split(" ")[1]}`}
            >
              {levelLabels[tech.level]}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isActive ? "rotate-180" : ""} ${isDark ? "text-gray-500" : "text-gray-400"}`}
          aria-hidden
        />
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isActive ? "grid-rows-[1fr] opacity-100 mt-2 sm:mt-3" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{tech.desc[lang]}</p>
        </div>
      </div>
    </button>
  );
}

export function TechSection({ copy, lang, technologies, isDark, activeTech, onToggle }: TechSectionProps) {
  const orderedTechnologies = [...technologies].sort((left, right) => {
    const leftIndex = techOrderIndex.get(left.id);
    const rightIndex = techOrderIndex.get(right.id);
    if (leftIndex === undefined && rightIndex === undefined) {
      return 0;
    }
    if (leftIndex === undefined) {
      return 1;
    }
    if (rightIndex === undefined) {
      return -1;
    }
    return leftIndex - rightIndex;
  });

  return (
    <section id="technologies" className="scroll-mt-24">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight">{copy.tech.title}</h2>
        <p className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-500" : "text-slate-500"}`}>
          <Layers size={14} /> {copy.tech.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {orderedTechnologies.map((tech) => (
          <TechCard
            key={tech.id}
            tech={tech}
            lang={lang}
            isDark={isDark}
            isActive={activeTech === tech.id}
            onClick={() => onToggle(tech.id)}
            levelLabels={copy.tech.levels}
          />
        ))}
      </div>
    </section>
  );
}
