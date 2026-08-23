"use client";

import React from "react";
import { Smartphone, Waves, Radio, Building2 } from "lucide-react";

const PARTNERS = [
  {
    name: "ORANGE MONEY",
    icon: Smartphone,
    color: "group-hover:text-[#FF6600]",
    country: "Sénégal • Côte d'Ivoire",
  },
  {
    name: "WAVE DIGITAL",
    icon: Waves,
    color: "group-hover:text-[#1BA5E8]",
    country: "Sénégal • UEMOA",
  },
  {
    name: "MTN MOMO",
    icon: Radio,
    color: "group-hover:text-[#FFCC00]",
    country: "Bénin • Côte d'Ivoire",
  },
  {
    name: "ECOBANK UEMOA",
    icon: Building2,
    color: "group-hover:text-[#005B94]",
    country: "Réseau Bancaire Panafricain",
  },
];

export function LandingPartners() {
  return (
    <section className="border-y border-gray-200/80 bg-white/60 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          Prêt pour l&apos;écosystème financier & Mobile Money de l&apos;espace UEMOA
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 md:gap-20">
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="group flex items-center gap-2.5 text-gray-400 hover:text-gray-900 transition-all duration-300 cursor-default"
              >
                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 group-hover:border-gray-200 transition-colors">
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${partner.color}`}
                  />
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-700 group-hover:text-gray-900 block leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-gray-400 block">
                    {partner.country}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
