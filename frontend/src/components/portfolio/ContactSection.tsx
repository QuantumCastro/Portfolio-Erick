import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "../../lib/portfolio-data";
import { CheckCircle, Send } from "lucide-react";

type FormStatus = "idle" | "sending" | "success";

type ContactSectionProps = {
  copy: Copy;
  isDark: boolean;
};

export function ContactSection({ copy, isDark }: ContactSectionProps) {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const successTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current !== null) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "sending") {
      return;
    }
    setFormError(null);
    setFormStatus("sending");
    if (successTimeoutRef.current !== null) {
      window.clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = copy.contact.error;
        try {
          const data = await response.json();
          if (data && typeof data.error === "string") {
            errorMessage = data.error;
          }
        } catch {
          // keep fallback error message
        }
        setFormError(errorMessage);
        setFormStatus("idle");
        return;
      }

      setFormStatus("success");
      form.reset();
      successTimeoutRef.current = window.setTimeout(() => setFormStatus("idle"), 3000);
    } catch {
      setFormError(copy.contact.error);
      setFormStatus("idle");
    }
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-2xl scroll-mt-24">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl sm:text-3xl font-bold tracking-tight">{copy.contact.title}</h2>
        <div className={`mx-auto h-1 w-16 rounded-full ${isDark ? "bg-purple-500" : "bg-blue-600"}`} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl border p-5 sm:p-8 ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-slate-200/50"}`}
        aria-live="polite"
        aria-busy={formStatus === "sending"}
      >
        <div className="space-y-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-500"}`}
            >
              {copy.contact.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              className={`w-full p-2 sm:p-3 rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm sm:text-base
              ${
                isDark
                  ? "border-gray-800 text-white placeholder-gray-700 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-black"
                  : "border-gray-200 text-slate-900 placeholder-gray-400 focus:border-blue-600 focus:ring-blue-600 focus:ring-offset-white"
              }`}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="subject"
              className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-500"}`}
            >
              {copy.contact.subject}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Project Inquiry"
              className={`w-full p-2 sm:p-3 rounded-lg border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm sm:text-base
              ${
                isDark
                  ? "border-gray-800 text-white placeholder-gray-700 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-black"
                  : "border-gray-200 text-slate-900 placeholder-gray-400 focus:border-blue-600 focus:ring-blue-600 focus:ring-offset-white"
              }`}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-500"}`}
            >
              {copy.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`w-full resize-none rounded-lg border bg-transparent p-3 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
              ${
                isDark
                  ? "border-gray-800 text-white focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-black"
                  : "border-gray-200 text-slate-900 focus:border-blue-600 focus:ring-blue-600 focus:ring-offset-white"
              }`}
              required
            />
          </div>

          <div className="sr-only" aria-live="polite" role="status">
            {formStatus === "sending" && copy.contact.sending}
            {formStatus === "success" && copy.contact.success}
          </div>

          <button
            type="submit"
            disabled={formStatus === "sending"}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 sm:py-4 font-bold transition-all ${
              formStatus === "success"
                ? "bg-green-500 text-white"
                : isDark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-slate-900 text-white hover:bg-slate-800"
            } ${formStatus === "sending" ? "cursor-not-allowed" : ""}`}
          >
            {formStatus === "idle" && (
              <>
                {copy.contact.send} <Send size={18} />
              </>
            )}
            {formStatus === "sending" && <span className="animate-pulse">{copy.contact.sending}</span>}
            {formStatus === "success" && (
              <>
                {copy.contact.success} <CheckCircle size={18} />
              </>
            )}
          </button>
          {formError && (
            <p role="alert" className={`text-xs sm:text-sm ${isDark ? "text-red-400" : "text-red-600"}`}>
              {formError}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
