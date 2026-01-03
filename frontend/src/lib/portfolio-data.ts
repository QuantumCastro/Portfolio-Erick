export type Lang = "en" | "es";
export type Level = "expert" | "intermediate" | "basic";

export type Copy = {
  nav: { projects: string; stack: string; contact: string };
  hero: {
    role: string;
    titleStart: string;
    titleColor: string;
    titleEnd: string;
    intro: string;
    cta: string;
  };
  projects: { title: string; visit: string };
  tech: { title: string; subtitle: string; levels: Record<Level, string> };
  contact: {
    title: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: string;
};

export type Project = {
  id: number;
  title: string;
  desc: Record<Lang, string>;
  url: string;
  tags: string[];
  icon: "database" | "smartphone" | "terminal";
};

export type Tech = {
  id: string;
  name: string;
  level: Level;
  icon:
    | "globe"
    | "code"
    | "zap"
    | "file-code"
    | "terminal"
    | "layout-template"
    | "palette"
    | "layers"
    | "activity"
    | "box"
    | "server"
    | "database";
  desc: Record<Lang, string>;
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: { projects: "Projects", stack: "Stack", contact: "Contact" },
    hero: {
      role: "Junior Full-Stack Engineer",
      titleStart: "Coding the",
      titleColor: "future",
      titleEnd: " pixel by pixel.",
      intro: "Focusing on performance, accessibility, and scalable architecture.",
      cta: "View Work",
    },
    projects: {
      title: "Selected Projects",
      visit: "Visit Website",
    },
    tech: {
      title: "Stack",
      subtitle: "Tap cards to see details",
      levels: { expert: "Expert", intermediate: "Intermediate", basic: "Basic" },
    },
    contact: {
      title: "Contact",
      email: "Your Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      error: "Something went wrong. Please try again.",
      success: "Message sent successfully!",
    },
    footer: "© 2026 DevPortfolio. Built with precision.",
  },
  es: {
    nav: { projects: "Proyectos", stack: "Stack", contact: "Contacto" },
    hero: {
      role: "Ingeniero Full-Stack Junior",
      titleStart: "Programando el",
      titleColor: "futuro",
      titleEnd: " píxel a píxel.",
      intro: "Enfocado en rendimiento, accesibilidad y arquitectura escalable.",
      cta: "Ver Trabajo",
    },
    projects: {
      title: "Proyectos Destacados",
      visit: "Visitar Web",
    },
    tech: {
      title: "Tecnologías",
      subtitle: "Toca las tarjetas para ver detalles",
      levels: { expert: "Experto", intermediate: "Intermedio", basic: "Básico" },
    },
    contact: {
      title: "Contacto",
      email: "Tu Correo",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar Mensaje",
      sending: "Enviando...",
      error: "No se pudo enviar. Intenta de nuevo.",
      success: "¡Mensaje enviado correctamente!",
    },
    footer: "© 2026 DevPortfolio. Construido con precisión.",
  },
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Simple vs Compount Dashboard",
    desc: {
      en: "Real-time financial data visualization dashboard.",
      es: "Dashboard de visualización financiera en tiempo real.",
    },
    url: "https://compound-vs-simple.vercel.app/",
    tags: ["React", "Node.js", "HTML + CSS","TypeScript + JS (only-build)", "Next.js"],
    icon: "database",
  },
  {
    id: 2,
    title: "Neon Darwinism",
    desc: {
      en: "2D simulation on population dynamics with geometric figures.",
      es: "Simulación 2D sobre dinámica de poblaciones con figuras geometricas.",
    },
    url: "https://evolution-simulator-gamma.vercel.app/",
    tags: ["Node.js", "React", "HTML + CSS", "TypeScript + JS (only-build)", "Astro"],
    icon: "smartphone",
  },
  {
    id: 3,
    title: "L´Artisan",
    desc: {
      en: "Simulated, modern and professional e-commerce for high impact.",
      es: "E-Commerce simulado, moderno y profesional para alto impacto.",
    },
    url: "https://lartisan.vercel.app/",
    tags: ["Node.js", "React", "HTML + CSS", "TypeScript + JS (only-build)"],
    icon: "terminal",
  },
  {
    id: 4,
    title: "Flappy Flight",
    desc: {
      en: "2D mini-game inspired by Flappy Bird, selected to showcase rendering capabilities.",
      es: "Mini-Juego 2D inspirado en Flappy Bird, demuestra capacidad de renderizado.",
    },
    url: "https://flappy-frontend.vercel.app/",
    tags: ["Next.js", "HTML", "CSS", "Canvas", "TypeScript + JS (only-build)"],
    icon: "terminal",
  },
  {
    id: 5,
    title: "Vitrum",
    desc: {
      en: "A modern website that competes with Obsidian with a more visual and intuitive interface.",
      es: "Web moderna que compite con Obsidian con una interfaz más visual e intuituva.",
    },
    url: "https://vitrum-frontend-gamma.vercel.app/",
    tags: ["Node.js", "React", "Docker", "Python", "Astro","PostgreSQL", "TypeScript + JS (only-build)", "HTML + CSS", "NGINX", "FastAPI"],
    icon: "terminal",
  },
  {
    id: 6,
    title: "EDUARDO LEGAL",
    desc: {
      en: "Static website with AI-friendly SEO for attracting clients for a lawyer.",
      es: "Web estática con SEO IA-amigable para captación de clientes de un abogado.",
    },
    url: "https://eduardo-legal-frontend.vercel.app/",
    tags: ["Astro", "React", "HTML", "CSS", "Node.js"],
    icon: "terminal",
  },
]


export const TECHNOLOGIES: Tech[] = [
  {
    id: "next",
    name: "Next.js",
    level: "expert",
    icon: "globe",
    desc: {
      en: "React framework for production that enables hybrid rendering (SSR/SSG/ISR), file system routing, and automatic optimization.",
      es: "Framework de React para producción que habilita renderizado híbrido (SSR/SSG/ISR), enrutamiento en el sistema de archivos y optimización automática.",
    },
  },
  {
    id: "react",
    name: "React",
    level: "expert",
    icon: "code",
    desc: {
      en: "A declarative, component-based JavaScript library for building interactive user interfaces and efficient state management.",
      es: "Librería de JavaScript declarativa y basada en componentes para construir interfaces de usuario interactivas y gestión eficiente del estado.",
    },
  },
  {
    id: "astro",
    name: "Astro",
    level: "expert",
    icon: "zap",
    desc: {
      en: "Content-focused web framework that uses Islands Architecture to reduce JavaScript sent to the client and maximize performance.",
      es: "Framework web enfocado en contenido que utiliza architectura de islas para reducir el JavaScript enviado al cliente y maximizar el rendimiento.",
    },
  },
  {
    id: "js",
    name: "JavaScript",
    level: "expert",
    icon: "file-code",
    desc: {
      en: "An interpreted, multi-paradigm, prototype-based programming language, a standard for logic and interactivity in web environments.",
      es: "Lenguaje de programación interpretado, multiparadigma y basado en prototipos, estándar para la lógica e interactividad en entornos web.",
    },
  },
  {
    id: "ts",
    name: "TypeScript",
    level: "expert",
    icon: "terminal",
    desc: {
      en: "A strictly typed superset of JavaScript that compiles to plain JavaScript, adding static type safety and advanced development tools.",
      es: "Superset tipado estricto de JavaScript que compila a JavaScript plano, añadiendo seguridad de tipos estática y herramientas de desarrollo avanzadas.",
    },
  },
  {
    id: "python",
    name: "Python",
    level: "expert",
    icon: "file-code",
    desc: {
      en: "A high-level, interpreted, dynamically typed programming language designed for readability and versatility through a vast standard library.",
      es: "Lenguaje de programación de alto nivel, interpretado y de tipado dinámico, diseñado para la legibilidad y versatilidad mediante una vasta biblioteca estándar.",
    },
  },
  {
    id: "fastapi",
    name: "FastAPI",
    level: "intermediate",
    icon: "zap",
    desc: {
      en: "A modern, high-performance web framework for building APIs with Python, based on open standards (OpenAPI, JSON Schema) and asynchronous static typing.",
      es: "Framework web moderno y de alto rendimiento para construir APIs con Python, basado en estándares abiertos (OpenAPI, JSON Schema) y tipado estático asíncrono.",
    },
  },
  {
    id: "django",
    name: "Django",
    level: "intermediate",
    icon: "database",
    desc: {
      en: "A high-level web framework for Python that follows the batteries included pattern for fast, secure, and scalable development.",
      es: "Framework web de alto nivel para Python que sigue el patrón baterías incluidas para un desarrollo rápido, seguro y escalable.",
    },
  },
  {
    id: "html",
    name: "HTML",
    level: "expert",
    icon: "layout-template",
    desc: {
      en: "Standard markup language that defines the semantic structure and content of web documents.",
      es: "Lenguaje de marcado estándar que define la estructura semántica y el contenido de documentos web.",
    },
  },
  {
    id: "css",
    name: "CSS",
    level: "expert",
    icon: "palette",
    desc: {
      en: "Style sheet language used to describe the presentation, design, and formatting of structured documents in HTML.",
      es: "Lenguaje de hojas de estilo utilizado para describir la presentación, diseño y formato de documentos estructurados en HTML.",
    },
  },
  {
    id: "tailwind",
    name: "TailwindCSS",
    level: "expert",
    icon: "layers",
    desc: {
      en: "Low-level utility-first CSS framework for quickly building custom designs without leaving HTML.",
      es: "Framework CSS utility-first de bajo nivel para construir diseños personalizados rápidamente sin salir del HTML.",
    },
  },
  {
    id: "node",
    name: "Node.js",
    level: "expert",
    icon: "activity",
    desc: {
      en: "Runtime Environment for the JavaScript/TypeScript ecosystem.",
      es: "Entorno de Ejecución para el ecosistema JavaScript/TypeScript",
    },
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    level: "intermediate",
    icon: "box",
    desc: {
      en: "Modern relational database with advanced features.",
      es: "Base de datos relacional moderna con funciones avanzadas.",
    },
  },
  {
    id: "nginx",
    name: "Nginx",
    level: "intermediate",
    icon: "box",
    desc: {
      en: "High-performance web server and reverse proxy that acts as an API Gateway and load balancer.",
      es: "Servidor web y proxy inverso de alto rendimiento que actúa como API Gateway y balanceador de carga.",
    },
  },
  {
    id: "docker",
    name: "Docker",
    level: "intermediate",
    icon: "server",
    desc: {
      en: "A containerization platform that packages an application and its dependencies into an isolated, portable unit.",
      es: "Plataforma de contenerización que empaqueta una aplicación y sus dependencias en una unidad aislada y portátil.",
    },
  },
];
