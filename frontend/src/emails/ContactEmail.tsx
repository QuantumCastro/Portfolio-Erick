import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

type ContactEmailProps = {
  email: string;
  subject: string;
  message: string;
};

export function ContactEmail({ email, subject, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New contact request</Heading>
          <Section>
            <Text style={label}>From</Text>
            <Text style={value}>{email}</Text>
            <Text style={label}>Subject</Text>
            <Text style={value}>{subject}</Text>
          </Section>
          <Hr style={divider} />
          <Section>
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#0b0b0c",
  fontFamily: "Arial, sans-serif",
  padding: "24px 12px",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "24px",
};

const heading = {
  fontSize: "20px",
  margin: "0 0 16px",
};

const label = {
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "#6b7280",
  margin: "12px 0 4px",
};

const value = {
  margin: "0 0 8px",
  fontSize: "14px",
  color: "#111827",
};

const messageText = {
  margin: "0",
  fontSize: "14px",
  color: "#111827",
  whiteSpace: "pre-wrap" as const,
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "16px 0",
};
