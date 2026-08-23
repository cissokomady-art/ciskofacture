"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Awa Ndiaye",
    role: "Fondatrice — Awa Création",
    country: "🇸🇳 Sénégal",
    initials: "AN",
    avatarBg: "bg-purple-100 text-purple-700",
    quote: "Une solution simple qui m'a vraiment fait gagner du temps",
    text: "Avant, je préparais mes factures manuellement et je perdais beaucoup de temps à suivre mes paiements. Aujourd'hui, tout est beaucoup plus simple et professionnel. Je peux créer et envoyer mes factures en quelques clics.",
  },
  {
    name: "Yannick Kouassi",
    role: "Entrepreneur — Kouassi Digital",
    country: "🇨🇮 Côte d’Ivoire",
    initials: "YK",
    avatarBg: "bg-amber-100 text-amber-700",
    quote: "Mes factures sont enfin professionnelles",
    text: "La plateforme m'aide à mieux organiser mon activité et à présenter une image beaucoup plus professionnelle à mes clients. La création des factures est rapide et le suivi de trésorerie est clair.",
  },
  {
    name: "Brice Mballa",
    role: "Consultant — Mballa Consulting",
    country: "🇨🇲 Cameroun",
    initials: "BM",
    avatarBg: "bg-emerald-100 text-emerald-700",
    quote: "Je garde le contrôle sur mon activité",
    text: "Ce que j'apprécie le plus, c'est la simplicité. Je peux retrouver mes clients, suivre mes factures et vérifier mes paiements depuis un seul espace. C'est devenu un véritable outil de gestion au quotidien.",
  },
];

export function LandingTestimonials() {
  return (
    <section id="temoignages" className="py-20 sm:py-28 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2 block">
            Retours d&apos;expérience
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Ils nous font confiance au quotidien
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Des entrepreneurs et dirigeants de PME qui simplifient leur facturation et sécurisent leur trésorerie avec Ciskofacture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 landing-shadow-sm flex flex-col justify-between relative hover:landing-shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="absolute top-6 right-6 text-gray-200">
                <Quote className="w-8 h-8 opacity-40" />
              </div>

              <div>
                {/* Author Details */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 ${item.avatarBg}`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      {item.role} • {item.country}
                    </p>
                  </div>
                </div>

                {/* Rating 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Title */}
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-2.5 leading-snug">
                  « {item.quote} »
                </h4>

                {/* Review text */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
