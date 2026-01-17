import { Resend } from 'resend';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Html, Head, Preview, Body, Container, Heading, Section, Text, Hr } from '@react-email/components';
export { renderers } from '../../renderers.mjs';

function ContactEmail({ email, subject, message }) {
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsx(Preview, { children: "New portfolio message" }),
    /* @__PURE__ */ jsx(Body, { style: main, children: /* @__PURE__ */ jsxs(Container, { style: container, children: [
      /* @__PURE__ */ jsx(Heading, { style: heading, children: "New contact request" }),
      /* @__PURE__ */ jsxs(Section, { children: [
        /* @__PURE__ */ jsx(Text, { style: label, children: "From" }),
        /* @__PURE__ */ jsx(Text, { style: value, children: email }),
        /* @__PURE__ */ jsx(Text, { style: label, children: "Subject" }),
        /* @__PURE__ */ jsx(Text, { style: value, children: subject })
      ] }),
      /* @__PURE__ */ jsx(Hr, { style: divider }),
      /* @__PURE__ */ jsxs(Section, { children: [
        /* @__PURE__ */ jsx(Text, { style: label, children: "Message" }),
        /* @__PURE__ */ jsx(Text, { style: messageText, children: message })
      ] })
    ] }) })
  ] });
}
const main = {
  backgroundColor: "#0b0b0c",
  fontFamily: "Arial, sans-serif",
  padding: "24px 12px"
};
const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "24px"
};
const heading = {
  fontSize: "20px",
  margin: "0 0 16px"
};
const label = {
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#6b7280",
  margin: "12px 0 4px"
};
const value = {
  margin: "0 0 8px",
  fontSize: "14px",
  color: "#111827"
};
const messageText = {
  margin: "0",
  fontSize: "14px",
  color: "#111827",
  whiteSpace: "pre-wrap"
};
const divider = {
  borderColor: "#e5e7eb",
  margin: "16px 0"
};

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const prerender = false;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2e3;
const POST = async ({ request }) => {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Invalid content type." }, 400);
  }
  let payload;
  try {
    const data = await request.json();
    payload = typeof data === "object" && data !== null ? data : {};
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!email || !subject || !message) {
    return jsonResponse({ error: "Missing required fields." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Invalid email address." }, 400);
  }
  if (subject.length > MAX_SUBJECT_LENGTH) {
    return jsonResponse({ error: "Subject is too long." }, 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: "Message is too long." }, 400);
  }
  const { RESEND_API_KEY, RESEND_FROM, RESEND_TO } = Object.assign(__vite_import_meta_env__, { RESEND_API_KEY: "re_4xvNNbvX_7FwnBgQvMqfexzu3AHb5dHv4", RESEND_FROM: "onboarding@resend.dev", RESEND_TO: "ejcmate1@gmail.com", OS: process.env.OS });
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
      text: `From: ${email}\\nSubject: ${subject}\\n\\n${message}`
    });
  } catch {
    return jsonResponse({ error: "Failed to send message." }, 500);
  }
  return jsonResponse({ ok: true }, 200);
};
function jsonResponse(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
