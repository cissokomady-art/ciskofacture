"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Building2,
  FileText,
  CreditCard,
  Bell,
  Shield,
  Check,
  Save,
  Upload,
  Sparkles,
  Info,
  Lock,
  Globe,
  Coins,
  Percent,
  Calendar,
  Smartphone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useCompanyProfile } from "@/lib/store/app-store";

type SettingsTab = "company" | "invoicing" | "banking" | "notifications" | "security";

export default function ParametresPage() {
  const { profile, updateProfile, loaded } = useCompanyProfile();
  const [activeTab, setActiveTab] = useState<SettingsTab>("company");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // État Formulaire - Profil Entreprise
  const [companyName, setCompanyName] = useState(profile.name);
  const [companyEmail, setCompanyEmail] = useState(profile.email);
  const [companyPhone, setCompanyPhone] = useState(profile.phone);
  const [companyAddress, setCompanyAddress] = useState(profile.address);
  const [companyCity, setCompanyCity] = useState(profile.city);
  const [companyCountry, setCompanyCountry] = useState(profile.country);
  const [companyTaxId, setCompanyTaxId] = useState(profile.taxId);
  const [companyNinea, setCompanyNinea] = useState(profile.ninea || "008921345 2V3");

  // État Formulaire - Facturation & TVA
  const [currency, setCurrency] = useState(profile.currency || "XOF");
  const [defaultVatRate, setDefaultVatRate] = useState(profile.defaultVatRate || 18);
  const [invoicePrefix, setInvoicePrefix] = useState(profile.invoicePrefix || "FAC-2026-");
  const [paymentTermsDays, setPaymentTermsDays] = useState(profile.paymentTermsDays || 30);
  const [defaultLegalNotes, setDefaultLegalNotes] = useState(
    "Conformément aux règles de l'OHADA, tout retard de règlement entraînera des pénalités équivalentes à trois fois le taux d'intérêt légal en vigueur."
  );

  // État Formulaire - Coordonnées Bancaires
  const [bankName, setBankName] = useState(profile.bankName);
  const [accountHolder, setAccountHolder] = useState(profile.name);
  const [ibanRib, setIbanRib] = useState(profile.ibanRib);
  const [swiftBic, setSwiftBic] = useState(profile.swiftBic || "SGBSNKDA");

  // Sync profile when loaded
  React.useEffect(() => {
    if (loaded) {
      setCompanyName(profile.name);
      setCompanyEmail(profile.email);
      setCompanyPhone(profile.phone);
      setCompanyAddress(profile.address);
      setCompanyCity(profile.city);
      setCompanyCountry(profile.country);
      setCompanyTaxId(profile.taxId);
      setCompanyNinea(profile.ninea || "008921345 2V3");
      setBankName(profile.bankName);
      setAccountHolder(profile.name);
      setIbanRib(profile.ibanRib);
      setSwiftBic(profile.swiftBic || "SGBSNKDA");
      setDefaultVatRate(profile.defaultVatRate || 18);
      setInvoicePrefix(profile.invoicePrefix || "FAC-2026-");
      setPaymentTermsDays(profile.paymentTermsDays || 30);
      setCurrency(profile.currency || "XOF");
    }
  }, [loaded, profile]);

  // État Formulaire - Notifications & Relances
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappReminders, setWhatsappReminders] = useState(true);
  const [reminderDaysBefore, setReminderDaysBefore] = useState(3);
  const [autoReceiptEmail, setAutoReceiptEmail] = useState(true);

  // État Formulaire - Sécurité
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const tabs = [
    { id: "company" as SettingsTab, label: "Profil Entreprise", icon: Building2, desc: "Coordonnées légales & identité" },
    { id: "invoicing" as SettingsTab, label: "Facturation & Fiscalité", icon: FileText, desc: "TVA 18%, devises, numérotation" },
    { id: "banking" as SettingsTab, label: "Coordonnées Bancaires", icon: CreditCard, desc: "Comptes UEMOA & virements" },
    { id: "notifications" as SettingsTab, label: "Relances & Alertes", icon: Bell, desc: "Emails et rappels d'échéances" },
    { id: "security" as SettingsTab, label: "Sécurité & Accès", icon: Shield, desc: "Mot de passe et authentification" },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name: companyName,
        email: companyEmail,
        phone: companyPhone,
        address: companyAddress,
        city: companyCity,
        country: companyCountry,
        taxId: companyTaxId,
        ninea: companyNinea,
        bankName,
        ibanRib,
        swiftBic,
        defaultVatRate,
        invoicePrefix,
        paymentTermsDays,
        currency,
      });
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 3500);
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header de la page */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Administration</span>
            <span>/</span>
            <span className="text-gray-700 font-medium">Paramètres</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Paramètres & Configuration
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Personnalisez votre émetteur de factures, fiscalité UEMOA et coordonnées bancaires
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[8px] text-xs font-semibold animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Modifications enregistrées avec succès !</span>
          </div>
        )}
      </div>

      {/* 2. Layout Paramètres : Onglets de Navigation à gauche + Contenu à droite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Volet de Navigation latérale des paramètres (4 colonnes sur desktop) */}
        <div className="lg:col-span-4 bg-white border border-gray-200/90 rounded-2xl p-3 sm:p-4 shadow-card space-y-1.5">
          <div className="px-3 py-2 text-[10.5px] font-bold text-gray-400 uppercase tracking-wider">
            Configuration Générale
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-[8px] text-left transition-all duration-150 cursor-pointer group",
                    isActive
                      ? "bg-brand-50/80 text-brand-900 border border-brand-100 shadow-2xs font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/90"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-[7px] flex items-center justify-center shrink-0 transition-colors mt-0.5",
                      isActive
                        ? "bg-brand-600 text-white shadow-xs"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <p className={cn("text-xs sm:text-sm font-semibold truncate", isActive ? "text-brand-950" : "text-gray-900")}>
                      {tab.label}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Badge OHADA & Conformité */}
          <div className="p-3 mt-4 bg-gray-50/80 border border-gray-100 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-brand-700 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conformité OHADA</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Toutes vos factures respectent le plan comptable de la zone UEMOA.
            </p>
          </div>
        </div>

        {/* Volet Principal de Contenu (8 colonnes sur desktop) */}
        <div className="lg:col-span-8 bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-8 shadow-card">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* TAB 1: PROFIL ENTREPRISE */}
            {activeTab === "company" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    Profil de l&apos;Entreprise Émettrice
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Ces informations apparaissent directement dans l&apos;en-tête de toutes vos factures et devis.
                  </p>
                </div>

                {/* Logo Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                  <div className="w-14 h-14 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20 shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <path d="M9 8h6" />
                      <path d="M9 12h6" />
                      <path d="M9 16h4" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 text-xs">Logo officiel de facturation</p>
                    <p className="text-[11px] text-gray-500">Format PNG, JPG ou SVG (max. 2 Mo). Résolution optimale : 400x400px.</p>
                    <div className="pt-1.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => alert("Sélecteur de fichier logo")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200/90 text-gray-700 rounded-[8px] text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Changer le logo</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Champs Entreprise */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Raison Sociale / Nom Commercial <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email de facturation <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Téléphone émetteur <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Adresse géographique du siège <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Ville <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyCity}
                      onChange={(e) => setCompanyCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Pays <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyCountry}
                      onChange={(e) => setCompanyCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      N° RCCM / IFU
                    </label>
                    <input
                      type="text"
                      value={companyTaxId}
                      onChange={(e) => setCompanyTaxId(e.target.value)}
                      className="w-full px-3.5 py-2.5 font-mono bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Numéro NINEA (Sénégal)
                    </label>
                    <input
                      type="text"
                      value={companyNinea}
                      onChange={(e) => setCompanyNinea(e.target.value)}
                      className="w-full px-3.5 py-2.5 font-mono bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FACTURATION & FISCALITÉ */}
            {activeTab === "invoicing" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    Règles de Facturation & Fiscalité UEMOA
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Paramétrez le taux de TVA légale, les devises et la structure de numérotation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Devise Principale
                    </label>
                    <div className="relative">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition appearance-none cursor-pointer"
                      >
                        <option value="XOF">Franc CFA (XOF) • Zone UEMOA</option>
                        <option value="XAF">Franc CFA (XAF) • Zone CEMAC</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dollar Américain ($)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Taux de TVA légale par défaut (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={defaultVatRate}
                        onChange={(e) => setDefaultVatRate(parseFloat(e.target.value) || 0)}
                        className="w-full pl-3.5 pr-8 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition font-bold"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                    </div>
                    <span className="text-[10.5px] text-gray-400 block mt-1">
                      Taux normal UEMOA : 18%
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Préfixe de numérotation automatique
                    </label>
                    <input
                      type="text"
                      value={invoicePrefix}
                      onChange={(e) => setInvoicePrefix(e.target.value)}
                      className="w-full px-3.5 py-2.5 font-mono font-bold bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                    <span className="text-[10.5px] text-gray-400 block mt-1">
                      Exemple : {invoicePrefix}0029
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Délai de règlement par défaut (Jours)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={paymentTermsDays}
                      onChange={(e) => setPaymentTermsDays(parseInt(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition font-bold"
                    />
                    <span className="text-[10.5px] text-gray-400 block mt-1">
                      Échéance calculée automatiquement à l&apos;émission
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Mentions légales & Pénalités OHADA standard
                    </label>
                    <textarea
                      rows={3}
                      value={defaultLegalNotes}
                      onChange={(e) => setDefaultLegalNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COORDONNÉES BANCAIRES */}
            {activeTab === "banking" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    Coordonnées Bancaires & Instructions de Virement
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Ces coordonnées sont incluses au bas de vos factures pour permettre le virement direct de vos clients.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Établissement Bancaire UEMOA <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Ex: Société Générale Sénégal (SGS), CBAO, Ecobank..."
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Nom du titulaire du compte <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Numéro de Compte IBAN / Clé RIB UEMOA <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={ibanRib}
                      onChange={(e) => setIbanRib(e.target.value)}
                      className="w-full px-3.5 py-2.5 font-mono font-bold bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition tracking-wide"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Code SWIFT / BIC (Pour virements internationaux)
                    </label>
                    <input
                      type="text"
                      value={swiftBic}
                      onChange={(e) => setSwiftBic(e.target.value)}
                      className="w-full px-3.5 py-2.5 font-mono bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: NOTIFICATIONS & RELANCES */}
            {activeTab === "notifications" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    Relances Automatiques & Alertes
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Configurez vos rappels pour réduire les délais de paiement de vos clients.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">Rappels d&apos;échéance par Email</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Envoyer un email courtois {reminderDaysBefore} jours avant la date limite de règlement.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="w-4 h-4 rounded-[4px] text-brand-600 border-gray-300 focus:ring-brand-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">Rappels WhatsApp Business</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Notifier le contact client par message direct WhatsApp lors de l&apos;émission.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappReminders}
                      onChange={(e) => setWhatsappReminders(e.target.checked)}
                      className="w-4 h-4 rounded-[4px] text-brand-600 border-gray-300 focus:ring-brand-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm">Accusé d&apos;encaissement automatique</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Envoyer un reçu officiel dès qu&apos;une facture est marquée comme « Payée ».
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoReceiptEmail}
                      onChange={(e) => setAutoReceiptEmail(e.target.checked)}
                      className="w-4 h-4 rounded-[4px] text-brand-600 border-gray-300 focus:ring-brand-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SÉCURITÉ & ACCÈS */}
            {activeTab === "security" && (
              <div className="space-y-5">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    Sécurité & Authentification
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Protégez les données financières et l&apos;accès à votre compte ciskofacture.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/80 border border-gray-100 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">Authentification à deux facteurs (2FA)</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Sécurisez vos connexions avec un code de confirmation envoyé par SMS ou application d&apos;authentification.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="w-4 h-4 rounded-[4px] text-brand-600 border-gray-300 focus:ring-brand-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50/80 border border-gray-100 rounded-xl space-y-3">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">Changer de mot de passe</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-1">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          className="w-full px-3 py-2 bg-white text-xs border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-1">
                          Confirmer le mot de passe
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          className="w-full px-3 py-2 bg-white text-xs border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Formulaire : Bouton Enregistrer avec Design System */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-gray-400">
                Toutes les modifications sont synchronisées avec vos modèles d&apos;émission.
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer whitespace-nowrap"
              >
                <Save className="w-4 h-4" />
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
