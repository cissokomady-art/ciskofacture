"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export function LandingPricing() {
  return (
    <section id="tarifs" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-brand-50 text-brand-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Offres & Forfaits</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Des tarifs simples et transparents
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Payez directement en <span className="font-semibold text-gray-900">FCFA</span>, sans carte de crédit internationale requise ni frais cachés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Plan Gratuit */}
          <div className="bg-[#F8F9FA] p-8 sm:p-9 rounded-2xl border border-gray-200/90 landing-shadow-sm flex flex-col justify-between hover:landing-shadow-md transition-all duration-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Gratuit</h3>
              <p className="text-xs text-gray-500 mb-6">
                Idéal pour tester et démarrer son activité
              </p>

              <div className="mb-6 flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-mono">
                  0
                </span>
                <span className="text-sm font-semibold text-gray-500">FCFA / mois</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jusqu&apos;à 5 factures / mois</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Gestion des clients basique</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Conformité légale OHADA</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Export PDF officiel</span>
                </li>
              </ul>
            </div>

            <Link
              href="/inscription"
              className="w-full text-center py-3 rounded-[9px] border border-gray-300 hover:border-gray-400 bg-white text-gray-800 font-semibold text-xs transition-colors hover:bg-gray-50"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Plan Pro (Mise en avant Bordeaux) */}
          <div className="bg-brand-600 text-white p-8 sm:p-9 rounded-2xl landing-shadow-glow flex flex-col justify-between relative transform md:-translate-y-3 transition-all duration-200">
            {/* Populaire Badge */}
            <div className="absolute -top-3.5 right-6 bg-white text-brand-800 px-3 py-1 rounded-[6px] text-xs font-bold shadow-md uppercase tracking-wider">
              ⭐ Le plus populaire
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">Pro Indépendant</h3>
              <p className="text-xs text-brand-100 mb-6">
                Pour les indépendants et prestataires réguliers
              </p>

              <div className="mb-6 flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  5 000
                </span>
                <span className="text-sm font-semibold text-brand-100">FCFA / mois</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-brand-50 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="font-semibold text-white">Factures & Devis illimités</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Calcul TVA 18% & Remises auto</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Suivi de trésorerie en direct</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Coordonnées bancaires & RIB UEMOA</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Export PDF sans aucun filigrane</span>
                </li>
              </ul>
            </div>

            <Link
              href="/inscription"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-[9px] bg-white hover:bg-brand-50 text-brand-800 font-bold text-xs shadow-md transition-all duration-150"
            >
              <span>Choisir l&apos;offre Pro</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Plan Business */}
          <div className="bg-[#F8F9FA] p-8 sm:p-9 rounded-2xl border border-gray-200/90 landing-shadow-sm flex flex-col justify-between hover:landing-shadow-md transition-all duration-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">PME & Entreprise</h3>
              <p className="text-xs text-gray-500 mb-6">
                Pour les agences et structures à plusieurs
              </p>

              <div className="mb-6 flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-mono">
                  15 000
                </span>
                <span className="text-sm font-semibold text-gray-500">FCFA / mois</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-gray-900">Tout ce qui est dans Pro</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accès multi-utilisateurs & collaborateurs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rapports comptables & exports Excel</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Support prioritaire WhatsApp dédié</span>
                </li>
              </ul>
            </div>

            <Link
              href="/inscription"
              className="w-full text-center py-3 rounded-[9px] border border-gray-300 hover:border-gray-400 bg-white text-gray-800 font-semibold text-xs transition-colors hover:bg-gray-50"
            >
              Choisir Business
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
