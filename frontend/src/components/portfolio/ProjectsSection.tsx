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
      <div className="mb-8 flex items-baseline justify-between border-b pb-4 border-gray-200/10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{copy.projects.title}</h2>
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
                ? "bg-gray-900 border-gray-800 hover:border-gray-700 focus-visible:ring-purple-500 focus-visible:ring-offset-black"
                : "bg-white border-gray-100 shadow-sm hover:shadow-xl focus-visible:ring-blue-600 focus-visible:ring-offset-white"
            }`}
          >
            <span className="sr-only">{copy.projects.visit}</span>
            <div className="mb-4 flex items-start justify-between">
              <div className={`rounded-lg p-2.5 ${isDark ? "bg-gray-800 text-white" : "bg-blue-50 text-blue-600"}`}>
                {projectIcons[project.icon]}
              </div>
              <ExternalLink
                size={18}
                className={`opacity-0 transition-opacity group-hover:opacity-100 ${isDark ? "text-gray-400" : "text-gray-400"}`}
                aria-hidden
              />
            </div>
            <h3 className="mb-2 text-lg font-bold">{project.title}</h3>
            <p className={`mb-4 h-10 text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>{project.desc[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded border px-2 py-1 text-[10px] ${
                    isDark ? "bg-black border-gray-800 text-gray-400" : "bg-slate-50 border-slate-200 text-slate-600"
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
