import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "../../lib/portfolio-data";
import { CheckCircle, Send } from "lucide-react";

type FormStatus = "idle" | "sending" | "success";

type ContactSectionProps = {
  copy: Copy;
  isDark: boolean;
};

const getFieldValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const isErrorPayload = (value: unknown): value is { error: string } => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const maybeError = (value as { error?: unknown }).error;
  return typeof maybeError === "string";
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

  const submitForm = async (form: HTMLFormElement) => {
    if (formStatus === "sending") {
      return;
    }
    setFormError(null);
    setFormStatus("sending");
    if (successTimeoutRef.current !== null) {
      window.clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }

    const formData = new FormData(form);
    const payload = {
      email: getFieldValue(formData, "email"),
      subject: getFieldValue(formData, "subject"),
      message: getFieldValue(formData, "message"),
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
          const data: unknown = await response.json();
          if (isErrorPayload(data)) {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitForm(event.currentTarget);
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-2xl scroll-mt-16">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">{copy.contact.title}</h2>
        <div
          className={`mx-auto h-1 w-16 rounded-full ${isDark ? "bg-purple-500" : "bg-blue-600"}`}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl border p-5 sm:p-8 ${isDark ? "border-gray-800 bg-gray-900/50" : "border-gray-100 bg-white shadow-xl shadow-slate-200/50"}`}
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
              className={`w-full rounded-lg border bg-transparent p-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 sm:p-3 sm:text-base ${
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
              className={`w-full rounded-lg border bg-transparent p-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 sm:p-3 sm:text-base ${
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
              className={`w-full resize-none rounded-lg border bg-transparent p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-base ${
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
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold transition-all sm:py-4 ${
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
            {formStatus === "sending" && (
              <span className="animate-pulse">{copy.contact.sending}</span>
            )}
            {formStatus === "success" && (
              <>
                {copy.contact.success} <CheckCircle size={18} />
              </>
            )}
          </button>
          {formError && (
            <p
              role="alert"
              className={`text-xs sm:text-sm ${isDark ? "text-red-400" : "text-red-600"}`}
            >
              {formError}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
