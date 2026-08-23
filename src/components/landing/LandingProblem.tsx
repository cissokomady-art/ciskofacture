"use client";

import React from "react";
import { AlertTriangle, Calculator, ClockAlert } from "lucide-react";

const PROBLEMS = [
  {
    icon: AlertTriangle,
    iconBg: "bg-rose-50 text-rose-600 border-rose-100",
    title: "Factures peu professionnelles",
    description:
      "Des documents Word ou Excel mal formatés qui nuisent à la crédibilité de votre entreprise face aux grands comptes et institutions.",
  },
  {
    icon: Calculator,
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    title: "Calculs de TVA manuels",
    description:
      "Erreurs fréquentes dans le calcul des 18% de TVA ou des mentions fiscales obligatoires (IFU, RCCM, NINEA), causant des soucis fiscaux.",
  },
  {
    icon: ClockAlert,
    iconBg: "bg-brand-50 text-brand-600 border-brand-100",
    title: "Suivi des paiements impossible",
    description:
      "Ne plus savoir qui a payé quoi, relances manuelles oubliées et trésorerie fragilisée par les retards d'échéance non identifiés.",
  },
];

export function LandingProblem() {
  return (
    <section id="pourquoi-changer" className="py-20 sm:py-28 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2 block">
            Défis du quotidien
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Pourquoi abandonner les méthodes manuelles ?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Les méthodes traditionnelles sur Word et Excel vous font perdre un temps précieux et ralentissent vos encaissements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 landing-shadow-sm hover:landing-shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${problem.iconBg}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
