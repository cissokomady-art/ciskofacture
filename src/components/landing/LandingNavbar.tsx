"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileText, ArrowRight, Sparkles } from "lucide-react";
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-300">
      <nav
        className={`w-full bg-white/90 backdrop-blur-lg border border-gray-200/80 rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "landing-shadow-md border-gray-300/80 bg-white/95" : "shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[8px] bg-brand-600 flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform duration-200">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">
            Ciskofacture
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
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

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <Link
              href="/tableau-de-bord"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[9px] bg-brand-600 text-white text-xs font-semibold landing-cta-primary shadow-xs"
            >
              <span>Accéder au Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/connexion"
                className="px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-brand-600 transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-brand-600 text-white text-xs font-semibold landing-cta-primary shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Créer une facture</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-[8px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Menu principal"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 w-full bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3.5 font-medium text-sm text-gray-700">
            <a
              href="#pourquoi-changer"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              À propos
            </a>
            <a
              href="#fonctionnalites"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              Fonctionnalités
            </a>
            <a
              href="#temoignages"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              Témoignages
            </a>
            <a
              href="#tarifs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-[8px] hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              Tarifs
            </a>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              {user ? (
                <Link
                  href="/tableau-de-bord"
                  className="w-full text-center py-2.5 rounded-[9px] bg-brand-600 text-white text-xs font-semibold shadow-xs"
                >
                  Accéder au Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/connexion"
                    className="w-full text-center py-2.5 rounded-[8px] border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/inscription"
                    className="w-full text-center py-2.5 rounded-[9px] bg-brand-600 text-white text-xs font-semibold shadow-xs"
                  >
                    Commencer gratuitement
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
