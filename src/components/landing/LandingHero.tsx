"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Smartphone,
} from "lucide-react";
import { formatFCFA } from "@/lib/format/currency";

export function LandingHero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      {/* Background Soft Glow Gradients */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-brand-100/40 via-brand-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Floating Mini Badge 1 - Top Left */}
        <div className="hidden lg:flex items-center gap-2.5 absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3 landing-shadow-md landing-float-1 z-20">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            <Zap className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-left">
            <p className="text-[11px] text-gray-400 font-medium">TVA 18% UEMOA</p>
            <p className="text-xs font-bold text-gray-900">Calcul automatique</p>
          </div>
        </div>

        {/* Floating Mini Badge 2 - Top Right */}
        <div className="hidden lg:flex items-center gap-2.5 absolute top-12 right-6 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3 landing-shadow-md landing-float-2 z-20">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
            <TrendingUp className="w-5 h-5 text-brand-600" />
          </div>
          <div className="text-left">
            <p className="text-[11px] text-gray-400 font-medium">Encaissement</p>
            <p className="text-xs font-bold text-brand-700 font-mono">+ 750 000 FCFA</p>
          </div>
        </div>

        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[7px] bg-brand-50 border border-brand-100/80 text-brand-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>La solution de facturation SaaS n°1 en zone UEMOA</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-[1.15] sm:leading-[1.12] mb-6">
          Fini les factures sur <br />
          <span className="text-brand-600 bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 bg-clip-text text-transparent">
            Word et Excel.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
          La facturation simple et moderne conçue pour les entrepreneurs africains.
          Créez, envoyez et suivez vos paiements en quelques clics en <span className="font-semibold text-gray-900">Franc CFA (FCFA)</span>.
        </p>

        {/* CTA Buttons with Micro-interactions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto mb-16 sm:mb-20">
          <Link
            href="/inscription"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[9px] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm landing-cta-primary landing-shadow-glow"
          >
            <span>Commencer gratuitement</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#pourquoi-changer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[9px] bg-white hover:bg-brand-50 border border-gray-200/90 text-gray-800 font-semibold text-sm landing-cta-secondary shadow-xs"
          >
            <span>Découvrir la plateforme</span>
          </a>
        </div>

        {/* Showcase Dashboard Card with Floating Badges */}
        <div className="relative max-w-5xl mx-auto">
          {/* Floating Badge 3 - Middle Left */}
          <div className="hidden md:flex items-center gap-2.5 absolute -left-10 top-1/3 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3 landing-shadow-lg landing-float-3 z-30">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-gray-400 font-medium">Mobile Money & Wave</p>
              <p className="text-xs font-bold text-gray-900">Paiements simplifiés</p>
            </div>
          </div>

          {/* Floating Badge 4 - Bottom Right */}
          <div className="hidden md:flex items-center gap-2.5 absolute -right-8 -bottom-6 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3.5 landing-shadow-lg landing-float-2 z-30">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-gray-400 font-medium">Facture réglée</p>
              <p className="text-xs font-bold text-emerald-700 font-mono">1 416 000 FCFA</p>
            </div>
          </div>

          {/* Main Visual Preview Window */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-2 sm:p-3 landing-shadow-lg overflow-hidden">
            <div className="bg-gray-50/80 rounded-xl border border-gray-100 p-4 sm:p-6 text-left">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-semibold text-gray-500 font-mono">
                    ciskofacture • Aperçu direct
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-[5px] bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold">
                  ● Conforme OHADA
                </span>
              </div>

              {/* Mini Invoice Preview Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-bold text-gray-900">
                        Cisko Digital Ventures SARL
                      </h4>
                      <p className="text-xs text-gray-500">
                        Parcelles Assainies, Unité 16, Dakar • Sénégal
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold text-brand-700">
                        FAC-2026-0042
                      </p>
                      <p className="text-[11px] text-gray-400">Date : 23/02/2026</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200/80 overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-50 text-gray-500 border-b border-gray-200/80 text-[11px]">
                        <tr>
                          <th className="py-2 px-3">Désignation</th>
                          <th className="py-2 px-3 text-center">Qté</th>
                          <th className="py-2 px-3 text-right">Prix Unit.</th>
                          <th className="py-2 px-3 text-right">Total HT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-800 font-medium">
                        <tr>
                          <td className="py-2.5 px-3">Développement Plateforme Web</td>
                          <td className="py-2.5 px-3 text-center font-mono">1</td>
                          <td className="py-2.5 px-3 text-right font-mono">1 200 000 FCFA</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold">1 200 000 FCFA</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3">Intégration Passerelle Mobile Money</td>
                          <td className="py-2.5 px-3 text-center font-mono">1</td>
                          <td className="py-2.5 px-3 text-right font-mono">300 000 FCFA</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold">300 000 FCFA</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right side Summary Box */}
                <div className="bg-white rounded-xl border border-brand-100 p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block mb-3">
                      Récapitulatif Financier
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-gray-500">
                        <span>Sous-total HT :</span>
                        <span className="font-mono font-semibold">1 500 000 FCFA</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>TVA Légale (18%) :</span>
                        <span className="font-mono font-semibold text-brand-700">270 000 FCFA</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-sm text-gray-900">
                        <span>Total TTC :</span>
                        <span className="font-mono text-brand-600">1 770 000 FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Reçu généré
                    </span>
                    <span className="font-mono">IBAN SGS Dakar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
