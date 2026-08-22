"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  HelpCircle,
  Search,
  BookOpen,
  FileText,
  Users,
  ShieldCheck,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Coins,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "getting-started" | "invoicing" | "clients" | "compliance";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "invoicing",
    question: "Comment émettre une facture conforme aux normes de l'OHADA ?",
    answer:
      "Pour être conforme aux dispositions de l'OHADA en zone UEMOA, votre facture doit comporter : le numéro de facture séquentiel (ex: FAC-2026-0028), la date d'émission et d'échéance, la raison sociale et l'adresse complète de l'émetteur et du client, le numéro IFU/RCCM ou NINEA, le détail des prestations HT, le taux de TVA légal (18%) et le montant total TTC en FCFA. ciskofacture génère automatiquement l'ensemble de ces mentions.",
  },
  {
    id: "faq-2",
    category: "invoicing",
    question: "Comment appliquer une remise commerciale sur une facture ?",
    answer:
      "Dans le formulaire de création ou d'édition de facture, activez simplement la case à cocher « Appliquer une remise globale ». Vous pourrez alors spécifier le motif (ex: Accord commercial, Geste de bienvenue) et le montant en FCFA. L'aperçu en direct calcule immédiatement la déduction sur le montant total TTC.",
  },
  {
    id: "faq-3",
    category: "getting-started",
    question: "Comment changer le statut d'une facture (Payée, Envoyée, En retard) ?",
    answer:
      "Ouvrez la facture depuis la liste des factures ou le tableau de bord pour accéder à sa page de détail. Cliquez sur le bouton « Changer le statut » en haut à droite, puis sélectionnez le nouvel état désiré. Le statut et les indicateurs financiers du dashboard sont mis à jour instantanément.",
  },
  {
    id: "faq-4",
    category: "clients",
    question: "Comment importer ou enregistrer un nouveau client ?",
    answer:
      "Rendez-vous dans la section « Clients » puis cliquez sur « Nouveau client ». Renseignez la raison sociale, l'adresse email de facturation, le numéro de téléphone, la ville et l'adresse physique. Une fois enregistré, le client apparaîtra immédiatement dans la liste déroulante lors de la création d'une facture.",
  },
  {
    id: "faq-5",
    category: "compliance",
    question: "Comment modifier les coordonnées de mon entreprise au Sénégal ?",
    answer:
      "Accédez à la page « Paramètres » dans le menu latéral. Dans l'onglet « Profil Entreprise », vous pouvez modifier votre adresse (ex: Parcelles Assainies, Unité 16, Dakar, Sénégal), votre numéro de téléphone (+221 76 643 67 67), votre N° NINEA et vos coordonnées bancaires. Ces données se reflètent automatiquement sur toutes vos factures.",
  },
  {
    id: "faq-6",
    category: "clients",
    question: "Comment relancer un client dont la facture est en retard ?",
    answer:
      "Sur la liste des factures, filtrez par l'onglet « En retard ». Vous pouvez ouvrir la facture concernée pour vérifier les pénalités applicables et cliquer sur « Email » ou utiliser nos rappels automatiques pour notifier votre client avec son récapitulatif de paiement.",
  },
];

export default function AidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(["faq-1"]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    {
      id: "all",
      title: "Toutes les questions",
      desc: "L'ensemble des guides et réponses",
      icon: BookOpen,
    },
    {
      id: "invoicing",
      title: "Facturation & TVA",
      desc: "Création, devises FCFA et taxes",
      icon: FileText,
    },
    {
      id: "clients",
      title: "Gestion des Clients",
      desc: "Carnet d'adresses et relances",
      icon: Users,
    },
    {
      id: "compliance",
      title: "Fiscalité & OHADA",
      desc: "Règles légales et conformité UEMOA",
      icon: ShieldCheck,
    },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchCat = selectedCategory === "all" || faq.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-7 max-w-5xl mx-auto">
      {/* 1. Hero Banner de Recherche & Support */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Motifs géométriques décoratifs */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-white/10 backdrop-blur-xs text-brand-100 text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centre d&apos;assistance ciskofacture</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Comment pouvons-nous vous aider ?
          </h1>

          <p className="text-xs sm:text-sm text-brand-100/90 leading-relaxed">
            Consultez nos guides pratiques, les règles de conformité OHADA et trouvez des réponses immédiates à vos questions de facturation en zone UEMOA.
          </p>

          {/* Barre de recherche d'assistance */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher une question, TVA 18%, relance, facture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 rounded-[9px] shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cartes de Catégories / Guides Thématiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group",
                isSelected
                  ? "bg-brand-50/80 border-brand-300 shadow-sm"
                  : "bg-white border-gray-200/90 hover:border-gray-300 hover:shadow-card"
              )}
            >
              <div>
                <div
                  className={cn(
                    "w-10 h-10 rounded-[8px] flex items-center justify-center mb-3 transition-colors",
                    isSelected
                      ? "bg-brand-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-3 mt-2 flex items-center gap-1 text-[11px] font-semibold text-brand-600 group-hover:translate-x-0.5 transition-transform">
                <span>Explorer</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Section FAQ Interactive */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-8 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Foire aux Questions (FAQ)
            </h2>
            <p className="text-xs text-gray-500">
              {filteredFaqs.length} réponse(s) trouvée(s) pour votre sélection
            </p>
          </div>

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-brand-600 hover:text-brand-700 font-semibold self-start sm:self-auto cursor-pointer"
            >
              Effacer la recherche
            </button>
          )}
        </div>

        {/* Liste des questions accordéon */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className={cn(
                    "border rounded-xl transition-all duration-150 overflow-hidden",
                    isOpen
                      ? "border-brand-200 bg-brand-50/20 shadow-2xs"
                      : "border-gray-200/80 hover:border-gray-300 bg-white"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        "w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0 transition-colors",
                        isOpen ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-brand-100/60 animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center text-gray-400 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-gray-300 stroke-1" />
              <p className="text-sm font-semibold text-gray-700">Aucun résultat trouvé pour votre recherche</p>
              <p className="text-xs text-gray-400">Essayez avec d&apos;autres termes ou contactez notre équipe support ci-dessous.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Canaux de Support & Contact Direct (Afrique / UEMOA) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Support WhatsApp */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card space-y-3 flex flex-col justify-between hover:border-emerald-300 transition group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Support WhatsApp Direct</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Assistance instantanée avec nos conseillers via WhatsApp.
            </p>
            <p className="font-mono text-xs font-bold text-gray-800 pt-1">+221 76 643 67 67</p>
          </div>

          <a
            href="https://wa.me/221766436767"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-[8px] text-xs font-semibold transition"
          >
            <span>Démarrer un chat</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Support Email */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card space-y-3 flex flex-col justify-between hover:border-brand-300 transition group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[8px] bg-brand-50 text-brand-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Assistance par Email</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pour vos questions comptables et demandes particulières.
            </p>
            <p className="font-mono text-xs font-semibold text-gray-800 pt-1">support@ciskofacture.com</p>
          </div>

          <a
            href="mailto:support@ciskofacture.com"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[8px] text-xs font-semibold transition"
          >
            <span>Écrire au support</span>
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Support Téléphonique */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-card space-y-3 flex flex-col justify-between hover:border-blue-300 transition group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[8px] bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Ligne Téléphonique Pro</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Du lundi au vendredi de 8h00 à 18h00 GMT (Dakar).
            </p>
            <p className="font-mono text-xs font-bold text-gray-800 pt-1">+221 76 643 67 67</p>
          </div>

          <a
            href="tel:+221766436767"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-[8px] text-xs font-semibold transition"
          >
            <span>Appeler le service client</span>
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
