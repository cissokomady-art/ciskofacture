"use client";

import React from "react";
import {
  FileText,
  Calculator,
  LineChart,
  Users2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function LandingFeatures() {
  return (
    <section id="fonctionnalites" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-brand-50 text-brand-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fonctionnalités Clés</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Tout ce dont vous avez besoin pour facturer sereinement
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Une suite complète d&apos;outils pensés pour fluidifier votre gestion financière et sécuriser vos rentrées de fonds.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Factures en 2 clics */}
          <div className="bg-[#F8F9FA] p-8 sm:p-10 rounded-2xl border border-gray-200/90 landing-bento-card flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                Factures professionnelles en 2 clics
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Générez des documents au format officiel OHADA avec aperçu en temps réel, signatures, coordonnées bancaires et export PDF instantané.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2 text-xs font-semibold text-brand-800">
              <span className="px-3 py-1 bg-white rounded-md border border-gray-200 shadow-2xs">
                ✓ Aperçu Split-Pane
              </span>
              <span className="px-3 py-1 bg-white rounded-md border border-gray-200 shadow-2xs">
                ✓ Export PDF immédiat
              </span>
            </div>
          </div>

          {/* Card 2: TVA 18% & Fiscalité UEMOA (Accent Sombre/Bordeaux) */}
          <div className="bg-brand-900 text-white p-8 sm:p-10 rounded-2xl landing-bento-card flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 w-64 h-64 bg-brand-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-brand-700 text-white border border-brand-600/60 flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                TVA 18% calculée automatiquement
              </h3>
              <p className="text-sm text-brand-100/90 leading-relaxed mb-6">
                Fini les maux de tête de fin de mois. Les montants HT, TVA et TTC en Franc CFA (FCFA) sont calculés au centime près selon la réglementation fiscale.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2 text-xs font-semibold text-white">
              <span className="px-3 py-1 bg-brand-800 rounded-md border border-brand-700/80">
                ✓ Taux UEMOA 18%
              </span>
              <span className="px-3 py-1 bg-brand-800 rounded-md border border-brand-700/80">
                ✓ Mentions IFU / NINEA
              </span>
            </div>
          </div>

          {/* Card 3: Suivi des paiements en temps réel */}
          <div className="bg-[#F8F9FA] p-8 sm:p-10 rounded-2xl border border-gray-200/90 landing-bento-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                Suivi des paiements & Trésorerie
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Tableau de bord financier dynamique avec indicateurs en direct : Chiffre d&apos;affaires, factures en attente, montants encaissés et alertes retards.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-emerald-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Statuts Payée / En attente / Retard
              </span>
            </div>
          </div>

          {/* Card 4: Répertoire Clients complet */}
          <div className="bg-[#F8F9FA] p-8 sm:p-10 rounded-2xl border border-gray-200/90 landing-bento-card flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mb-6">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                Gestion de clients intégrée
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Un annuaire centralisé pour enregistrer vos clients, leurs adresses, emails, numéros fiscaux et consulter l&apos;historique complet de leur facturation.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-blue-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Remplissage automatique des factures
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
