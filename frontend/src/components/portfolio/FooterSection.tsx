import type { Copy } from "../../lib/portfolio-data";

type FooterProps = {
  copy: Copy;
  isDark: boolean;
};

export function FooterSection({ copy, isDark }: FooterProps) {
  return (
    <footer
      className={`py-4 border-t text-center ${isDark ? "bg-[#050505] border-gray-900 text-gray-600" : "bg-white border-slate-100 text-slate-400"}`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-xs font-medium">{copy.footer}</p>
      </div>
    </footer>
  );
}
