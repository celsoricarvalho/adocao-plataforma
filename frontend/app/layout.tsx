import "./globals.css";
import React from "react";

export const metadata = {
  title: "Adoção de Animais",
  description: "Plataforma de adoção de animais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <header className="w-full bg-white shadow-sm">
          <div className="max-w-6xl mx-auto py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              🐾 Adoção
            </a>
            <nav className="space-x-4 text-sm">
              <a href="/animals" className="hover:underline">
                Animais
              </a>
              <a href="/dashboard" className="hover:underline">
                Meu Painel
              </a>
              <a href="/auth/login" className="hover:underline">
                Entrar
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto py-6">{children}</main>
      </body>
    </html>
  );
}
