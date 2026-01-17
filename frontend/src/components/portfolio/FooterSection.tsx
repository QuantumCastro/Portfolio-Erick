import type { Copy } from "../../lib/portfolio-data";

type FooterProps = {
  copy: Copy;
  isDark: boolean;
};

export function FooterSection({ copy, isDark }: FooterProps) {
  return (
    <footer
      className={`border-t py-4 text-center ${isDark ? "border-gray-900 bg-[#050505] text-gray-600" : "border-slate-100 bg-white text-slate-400"}`}
    >
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-xs font-medium">{copy.footer}</p>
      </div>
    </footer>
  );
}
