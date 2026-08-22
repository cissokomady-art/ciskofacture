import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-50/70 via-brand-50/20 to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-[10px] bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-800/20 group-hover:scale-105 transition-transform duration-150">
            <span className="font-extrabold text-xl tracking-tight">C</span>
          </div>
          <div className="text-left">
            <span className="text-xl font-bold text-gray-900 tracking-tight block leading-none">
              cisko<span className="text-brand-600">facture</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mt-0.5">
              SaaS UEMOA & OHADA
            </span>
          </div>
        </Link>
      </div>

      {/* Main Content Box */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>

      {/* Trust Footer */}
      <div className="mt-8 text-center text-xs text-gray-400 space-y-2">
        <div className="flex items-center justify-center gap-4 text-gray-500 font-medium">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Conforme OHADA 2026
          </span>
          <span>•</span>
          <span>Devise FCFA (XOF)</span>
          <span>•</span>
          <span>Données chiffrées SSL</span>
        </div>
        <p>© 2026 ciskofacture. Tous droits réservés.</p>
      </div>
    </div>
  );
}
