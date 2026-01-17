import type { Copy, Lang, Project } from "../../lib/portfolio-data";
import type { JSX } from "react";
import { Database, ExternalLink, Smartphone, Terminal } from "lucide-react";

type ProjectsSectionProps = {
  copy: Copy;
  lang: Lang;
  projects: Project[];
  isDark: boolean;
};

const projectIcons: Record<Project["icon"], JSX.Element> = {
  database: <Database className="h-5 w-5" />,
  smartphone: <Smartphone className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
};

const projectOrder = [5, 2, 3, 6, 4, 1];
const projectOrderIndex = new Map(projectOrder.map((id, index) => [id, index]));

type IconProps = {
  className?: string;
};

const GitHubMark = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.222-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.912 1.23 3.222 0 4.61-2.807 5.625-5.48 5.922.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .316.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export function ProjectsSection({ copy, lang, projects, isDark }: ProjectsSectionProps) {
  const orderedProjects = [...projects].sort((left, right) => {
    const leftIndex = projectOrderIndex.get(left.id);
    const rightIndex = projectOrderIndex.get(right.id);
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
    <section id="projects" className="scroll-mt-16">
      <div className="mb-8 flex items-baseline justify-between border-b border-gray-200/10 pb-4">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{copy.projects.title}</h2>
        <a
          href="https://github.com/QuantumCastro"
          target="_blank"
          rel="noreferrer"
          aria-label={copy.projects.githubLabel}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isDark
              ? "border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-gray-900/60 hover:text-white focus-visible:ring-purple-500 focus-visible:ring-offset-black"
              : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-blue-600 focus-visible:ring-offset-white"
          }`}
        >
          <GitHubMark className="h-3.5 w-3.5" />
          <span>{copy.projects.github}</span>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {orderedProjects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${copy.projects.visit}: ${project.title}`}
            className={`group relative block rounded-xl border p-5 transition-all hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isDark
                ? "border-gray-800 bg-gray-900 hover:border-gray-700 focus-visible:ring-purple-500 focus-visible:ring-offset-black"
                : "border-gray-100 bg-white shadow-sm hover:shadow-xl focus-visible:ring-blue-600 focus-visible:ring-offset-white"
            }`}
          >
            <span className="sr-only">{copy.projects.visit}</span>
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`rounded-lg p-2.5 ${isDark ? "bg-gray-800 text-white" : "bg-blue-50 text-blue-600"}`}
              >
                {projectIcons[project.icon]}
              </div>
              <ExternalLink
                size={18}
                className={`opacity-0 transition-opacity group-hover:opacity-100 ${isDark ? "text-gray-400" : "text-gray-400"}`}
                aria-hidden
              />
            </div>
            <h3 className="mb-2 text-lg font-bold">{project.title}</h3>
            <p className={`mb-4 h-10 text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
              {project.desc[lang]}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded border px-2 py-1 text-[10px] ${
                    isDark
                      ? "border-gray-800 bg-black text-gray-400"
                      : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
