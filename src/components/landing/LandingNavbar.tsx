"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/store/auth-context";

export function LandingNavbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 transition-all duration-300">
      <nav
        className={`w-full bg-white/92 backdrop-blur-xl border border-gray-200/90 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "landing-shadow-md border-gray-300/90 bg-white/95" : "shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-[8px] bg-brand-600 flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform duration-200">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">
            Ciskofacture
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-gray-600">
          <a
            href="#pourquoi-changer"
            className="hover:text-brand-600 transition-colors duration-150"
          >
            À propos
          </a>
          <a
            href="#fonctionnalites"
            className="hover:text-brand-600 transition-colors duration-150"
          >
            Fonctionnalités
          </a>
          <a
            href="#temoignages"
            className="hover:text-brand-600 transition-colors duration-150"
          >
            Témoignages
          </a>
          <a
            href="#tarifs"
            className="hover:text-brand-600 transition-colors duration-150"
          >
            Tarifs
          </a>
        </div>

        {/* Right CTA Actions: Se connecter & Créer un compte */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Lien Se connecter */}
          <Link
            href="/connexion"
            className="px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-brand-600 hover:bg-gray-50 rounded-[8px] transition-all whitespace-nowrap"
          >
            Se connecter
          </Link>

          {/* Bouton Créer un compte */}
          <Link
            href="/inscription"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[9px] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs font-semibold landing-cta-primary shadow-xs whitespace-nowrap"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Créer un compte</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-[8px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Menu principal"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 w-full bg-white/95 backdrop-blur-2xl border border-gray-200/90 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3 font-medium text-sm text-gray-700">
            <a
              href="#pourquoi-changer"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              À propos
            </a>
            <a
              href="#fonctionnalites"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#temoignages"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              Témoignages
            </a>
            <a
              href="#tarifs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              Tarifs
            </a>

            {/* Mobile Actions : Se connecter & Créer un compte */}
            <div className="pt-3.5 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/connexion"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-[8px] border border-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-50 transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 text-center py-2.5 rounded-[9px] bg-brand-600 text-white text-xs font-semibold shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Créer un compte</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
