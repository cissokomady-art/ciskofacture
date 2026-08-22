import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

import { AuthProvider } from "@/lib/store/auth-context";
import { DateRangeProvider } from "@/lib/store/date-range-context";

export const metadata: Metadata = {
  title: "ciskofacture — Facturation moderne pour entrepreneurs africains",
  description: "Solution de facturation rapide, intuitive et conforme pour entrepreneurs et PME de la zone UEMOA en FCFA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[#F8F9FA] text-[#18181B] font-sans antialiased selection:bg-brand-100 selection:text-brand-900">
        <AuthProvider>
          <DateRangeProvider>{children}</DateRangeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
