"use client";

import React from "react";
import Image from "next/image";

const PARTNERS = [
  {
    name: "Orange Money",
    logo: "/images/Orange-Money-logo.png",
    alt: "Logo Orange Money Sénégal et UEMOA",
    sublabel: "Orange Money",
  },
  {
    name: "Wave",
    logo: "/images/wave.jpeg",
    alt: "Logo Wave Mobile Money",
    sublabel: "Wave Digital",
  },
  {
    name: "MTN Mobile Money",
    logo: "/images/mtn-mobile-money-logo.png",
    alt: "Logo MTN MoMo Mobile Money",
    sublabel: "MTN MoMo",
  },
  {
    name: "Ecobank",
    logo: "/images/Ecobank-Logo.png",
    alt: "Logo Ecobank The Pan African Bank",
    sublabel: "Ecobank UEMOA",
  },
];

export function LandingPartners() {
  return (
    <section className="border-y border-gray-200/80 bg-white/70 py-14 sm:py-18 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header Text - As requested by user */}
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-10 sm:mb-12">
          Prêt pour l’écosystème financier &amp; Mobile Money de l’espace UEMOA
        </h2>

        {/* 1. Desktop & Tablet Layout (Centered Grid with Homogeneous Cards) */}
        <div className="hidden md:flex justify-center items-center gap-6 lg:gap-8 flex-wrap">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-2xl border border-gray-200/90 landing-shadow-sm hover:landing-shadow-md hover:border-gray-300 hover:-translate-y-1 transition-all duration-200 h-24 w-52 p-4 flex flex-col items-center justify-center shrink-0 group"
            >
              <div className="relative h-12 w-full flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  width={140}
                  height={48}
                  className="max-h-12 w-auto max-w-[130px] object-contain transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          ))}
        </div>

        {/* 2. Mobile Version - Infinite Smooth Horizontal Scrolling (Marquee de droite vers la gauche) */}
        <div className="md:hidden relative w-full overflow-hidden py-2">
          {/* Gradient Masks for ultra-smooth edge fading */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none" />

          <div className="marquee-container">
            {/* Track 1 */}
            <div className="marquee-track">
              {PARTNERS.map((partner, index) => (
                <div
                  key={`m1-${index}`}
                  className="bg-white rounded-xl border border-gray-200/90 shadow-2xs h-20 w-44 p-3 flex items-center justify-center shrink-0"
                >
                  <div className="relative h-10 w-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={120}
                      height={40}
                      className="max-h-10 w-auto max-w-[110px] object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicated for seamless loop) */}
            <div className="marquee-track" aria-hidden="true">
              {PARTNERS.map((partner, index) => (
                <div
                  key={`m2-${index}`}
                  className="bg-white rounded-xl border border-gray-200/90 shadow-2xs h-20 w-44 p-3 flex items-center justify-center shrink-0"
                >
                  <div className="relative h-10 w-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={120}
                      height={40}
                      className="max-h-10 w-auto max-w-[110px] object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
