"use client";

import React from "react";
import Link from "next/link";
import { FileText, Heart, Globe, MessageCircle } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-brand-950 text-white pt-16 sm:pt-20 pb-10 border-t border-brand-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 mb-14 sm:mb-16">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-brand-600 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ciskofacture
              </span>
            </Link>
            <p className="text-xs text-brand-100/70 leading-relaxed max-w-xs">
              La solution SaaS de facturation moderne, rapide et conforme conçue pour les entrepreneurs, indépendants et PME de l&apos;espace UEMOA.
            </p>
            <div className="flex items-center gap-3 text-xs text-brand-200">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span>Système opérationnel • Zone FCFA</span>
            </div>
          </div>

          {/* Col 2: Produit */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300 mb-4">
              Produit
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-100/80">
              <li>
                <a href="#fonctionnalites" className="hover:text-white transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#tarifs" className="hover:text-white transition-colors">
                  Tarifs en FCFA
                </a>
              </li>
              <li>
                <Link href="/factures/nouvelle" className="hover:text-white transition-colors">
                  Aperçu Live Facture
                </Link>
              </li>
              <li>
                <Link href="/aide" className="hover:text-white transition-colors">
                  Centre d&apos;aide & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Entreprise & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300 mb-4">
              Assistance & Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-100/80">
              <li>
                <a
                  href="https://wa.me/221766436767"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Support WhatsApp (+221 76 643 67 67)</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@ciskofacture.com" className="hover:text-white transition-colors">
                  support@ciskofacture.com
                </a>
              </li>
              <li>
                <span className="text-brand-300/80">
                  Dakar, Sénégal (Parcelles Assainies)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Conformité & Légal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300 mb-4">
              Conformité & Légal
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-100/80">
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Plan Comptable OHADA
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Fiscalité UEMOA (TVA 18%)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Conditions Générales d&apos;Utilisation
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Politique de Confidentialité
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-200/70">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Ciskofacture. Fait avec</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>en Afrique pour le monde.</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-brand-400" />
              <span>Sénégal • Côte d&apos;Ivoire • UEMOA</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
