import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title: "EchoMind - Colaboración Médica Inteligente",
  description: "Plataforma segura de comunicación y colaboración entre médicos especialistas y pacientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
