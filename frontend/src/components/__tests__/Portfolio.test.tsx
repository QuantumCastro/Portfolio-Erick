/// <reference types="@testing-library/jest-dom" />
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Portfolio } from "../Portfolio";

describe("Portfolio", () => {
  it("renderiza hero en ingles por defecto", () => {
    render(<Portfolio />);
    expect(screen.getByText("Junior Full-Stack Engineer")).toBeInTheDocument();
    expect(screen.getByText(/Coding the/i)).toBeInTheDocument();
  });

  it("cambia idioma a espanol al alternar", () => {
    render(<Portfolio />);
    const langButton = screen.getByRole("button", { name: /cambiar idioma/i });
    fireEvent.click(langButton);
    expect(screen.getByText("Ingeniero Full-Stack Junior")).toBeInTheDocument();
  });

  it("alterna tema y actualiza clases de fondo", () => {
    const { container } = render(<Portfolio />);
    const root = container.querySelector("div");
    expect(root?.className).toContain("bg-[#050505]");
    const themeButton = screen.getByRole("button", { name: /cambiar tema/i });
    fireEvent.click(themeButton);
    expect(root?.className).toContain("bg-slate-50");
  });

  it("expande y colapsa una tarjeta de tecnologia", () => {
    render(<Portfolio />);
    const card = screen.getByRole("button", { name: /Next\.js/i });
    fireEvent.click(card);
    expect(screen.getByText(/App Router architecture/i)).toBeInTheDocument();
    expect(card).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(card);
    expect(card).toHaveAttribute("aria-expanded", "false");
  });

  it("muestra estado de envio en el formulario de contacto", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<Portfolio />);
    const email = screen.getByLabelText(/Your Email/i);
    const subject = screen.getByLabelText(/Subject/i);
    const message = screen.getByLabelText(/Message/i);
    fireEvent.change(email, { target: { value: "john@example.com" } });
    fireEvent.change(subject, { target: { value: "Hi" } });
    fireEvent.change(message, { target: { value: "Let's talk" } });
    const submit = screen.getByRole("button", { name: /Send Message/i });
    act(() => {
      fireEvent.click(submit);
    });
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/Sending/i);
    await screen.findByText(/Message sent successfully/i);
    vi.unstubAllGlobals();
  });
});
