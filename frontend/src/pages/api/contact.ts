import type { APIRoute } from "astro";
import { Resend } from "resend";
import { ContactEmail } from "../../emails/ContactEmail";

export const prerender = false;

const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Invalid content type." }, 400);
  }

  let payload: { email?: string; subject?: string; message?: string };
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!email || !subject || !message) {
    return jsonResponse({ error: "Missing required fields." }, 400);
  }

  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return jsonResponse({ error: "Invalid email address." }, 400);
  }

  if (subject.length > MAX_SUBJECT_LENGTH) {
    return jsonResponse({ error: "Subject is too long." }, 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: "Message is too long." }, 400);
  }

  const { RESEND_API_KEY, RESEND_FROM, RESEND_TO } = import.meta.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
    return jsonResponse({ error: "Server email configuration missing." }, 500);
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO,
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      react: ContactEmail({ email, subject, message }),
      text: `From: ${email}\\nSubject: ${subject}\\n\\n${message}`,
    });
  } catch {
    return jsonResponse({ error: "Failed to send message." }, 500);
  }

  return jsonResponse({ ok: true }, 200);
};

function jsonResponse(payload: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
