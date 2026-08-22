"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { formatFCFA } from "@/lib/format/currency";
import { formatDateNumeric } from "@/lib/format/date";
import { useInvoices } from "@/lib/store/app-store";
import { useAuth } from "@/lib/store/auth-context";
import { useDateRange } from "@/lib/store/date-range-context";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import {
  Search,
  Download,
  Eye,
  Plus,
  ArrowRight,
  Building2,
  FileText,
} from "lucide-react";

export default function TableauDeBordPage() {
  const { invoices, loading } = useInvoices();
  const { user } = useAuth();
  const { range } = useDateRange();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentHour = new Date().getHours();
  const greeting = currentHour >= 18 || currentHour < 5 ? "Bonsoir" : "Bonjour";
  const displayName = user?.fullName ? user.fullName.split(" ")[0] : "Mady";

  // 1. Filtrage dynamique par plage de date Notion (Date de départ -> Date d'arrivée)
  const dateFilteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (range.startDate && inv.issueDate < range.startDate) {
        return false;
      }
      if (range.endDate && inv.issueDate > range.endDate) {
        return false;
      }
      return true;
    });
  }, [invoices, range]);

  // 2. Calcul du nombre de factures par statut sur la période choisie
  const counts = useMemo(() => {
    return {
      all: dateFilteredInvoices.length,
      paid: dateFilteredInvoices.filter((i) => i.status === "paid").length,
      sent: dateFilteredInvoices.filter((i) => i.status === "sent").length,
      overdue: dateFilteredInvoices.filter((i) => i.status === "overdue").length,
      draft: dateFilteredInvoices.filter((i) => i.status === "draft").length,
    };
  }, [dateFilteredInvoices]);

  // 3. Recalcul automatique en temps réel des KPIs en fonction de la période sélectionnée
  const dynamicKpis = useMemo(() => {
    const totalVolume = dateFilteredInvoices.reduce((acc, i) => acc + i.totalAmount, 0);
    const paidVolume = dateFilteredInvoices
      .filter((i) => i.status === "paid")
      .reduce((acc, i) => acc + i.totalAmount, 0);
    const pendingVolume = dateFilteredInvoices
      .filter((i) => i.status === "sent")
      .reduce((acc, i) => acc + i.totalAmount, 0);
    const overdueVolume = dateFilteredInvoices
      .filter((i) => i.status === "overdue")
      .reduce((acc, i) => acc + i.totalAmount, 0);

    const isRangeActive = Boolean(range.startDate || range.endDate);

    return [
      {
        id: "kpi-ca",
        title: "Chiffre d'affaires",
        amount: totalVolume,
        subtitle: totalVolume > 0 ? "Total facturé sur la période" : "0 FCFA facturé",
        trendPercentage: totalVolume > 0 ? 18.2 : undefined,
        trendLabel: isRangeActive ? "période choisie" : "volume global",
        isPositive: true,
        type: "total" as const,
      },
      {
        id: "kpi-pending",
        title: "En attente de paiement",
        amount: pendingVolume,
        subtitle: counts.sent > 0 ? `${counts.sent} facture(s) émise(s)` : "Aucune facture en attente",
        trendPercentage: pendingVolume > 0 ? 5.4 : undefined,
        trendLabel: "en cours",
        isPositive: false,
        type: "pending" as const,
      },
      {
        id: "kpi-paid",
        title: "Montant encaissé",
        amount: paidVolume,
        subtitle: counts.paid > 0 ? `${counts.paid} règlement(s) reçu(s)` : "0 règlement encaissé",
        trendPercentage: paidVolume > 0 ? 22.5 : undefined,
        trendLabel: "encaissé",
        isPositive: true,
        type: "revenue" as const,
      },
      {
        id: "kpi-overdue",
        title: "Factures en retard",
        amount: overdueVolume,
        subtitle: counts.overdue > 0 ? `${counts.overdue} échéance(s) dépassée(s)` : "Aucune facture en retard",
        trendPercentage: overdueVolume > 0 ? -12.0 : undefined,
        trendLabel: "à relancer",
        isPositive: overdueVolume === 0,
        type: "overdue" as const,
      },
    ];
  }, [dateFilteredInvoices, counts, range]);

  // 4. Filtrage final pour le tableau (Recherche + Statut)
  const filteredInvoices = useMemo(() => {
    return dateFilteredInvoices.filter((inv) => {
      const matchFilter = selectedFilter === "all" || inv.status === selectedFilter;
      const matchSearch =
        searchQuery.trim() === "" ||
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [dateFilteredInvoices, selectedFilter, searchQuery]);

  const hasDateFilter = Boolean(range.startDate || range.endDate);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header / Welcome Banner Responsive avec radius adouci (14-16px) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-card flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-5 relative overflow-hidden">
        {/* Background gradient motif Rouge Bordeaux */}
        <div className="absolute right-0 top-0 w-80 sm:w-96 h-full bg-gradient-to-l from-brand-50/60 via-brand-50/15 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-1.5 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {greeting} {displayName} 👋
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            {hasDateFilter ? (
              <>
                Filtrage actif sur la période du{" "}
                <span className="font-semibold text-gray-800 font-mono">
                  {range.startDate ? formatDateNumeric(range.startDate) : "début"}
                </span>{" "}
                au{" "}
                <span className="font-semibold text-gray-800 font-mono">
                  {range.endDate ? formatDateNumeric(range.endDate) : "aujourd'hui"}
                </span>
                . {counts.all} facture(s) trouvée(s).
              </>
            ) : invoices.length === 0 ? (
              <>
                Bienvenue sur votre espace <span className="font-semibold text-gray-700">ciskofacture</span>. Vous pouvez ajouter votre premier client et émettre votre première facture.
              </>
            ) : (
              <>
                Voici la synthèse de votre activité pour <span className="font-semibold text-gray-700">février 2026</span>. Vous avez <span className="font-semibold text-amber-600">{counts.sent} facture(s) en attente</span> et <span className="font-semibold text-rose-600">{counts.overdue} facture(s) en retard</span>.
              </>
            )}
          </p>
        </div>

        {/* Boutons d'action avec border-radius: 8px (secondaire) et 9px (primaire) + Hover pro */}
        <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto xl:w-auto shrink-0 flex-wrap sm:flex-nowrap">
          {/* Bouton secondaire (radius: 8px) */}
          <Link
            href="/clients/nouveau"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100/90 border border-gray-200/90 hover:border-gray-300 text-gray-700 hover:text-gray-900 rounded-[8px] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-150 active:scale-[0.99] shrink-0 whitespace-nowrap"
          >
            <Building2 className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="whitespace-nowrap">Nouveau client</span>
          </Link>

          {/* Bouton principal (radius: 9px) */}
          <Link
            href="/factures/nouvelle"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shrink-0 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Créer une facture</span>
          </Link>
        </div>
      </div>

      {/* 2. Les 4 Cartes de statistiques (KPIs) avec radius diminué et typographie raffinée */}
      <section aria-label="Indicateurs clés de performance">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
          {dynamicKpis.map((kpi) => (
            <StatCard
              key={kpi.id}
              title={kpi.title}
              amount={kpi.amount}
              subtitle={kpi.subtitle}
              trendPercentage={kpi.trendPercentage}
              trendLabel={kpi.trendLabel}
              isPositive={kpi.isPositive}
              type={kpi.type}
            />
          ))}
        </div>
      </section>

      {/* 3. Bloc Pleine Largeur : Tableau des dernières factures émises */}
      <div className="w-full">
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-card">
          {/* Header du Tableau */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                  Dernières factures émises
                </h3>
                <span className="px-2 py-0.5 rounded-[5px] bg-gray-100 text-gray-600 text-xs font-bold">
                  {filteredInvoices.length}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {hasDateFilter
                  ? "Factures correspondant à la plage de date sélectionnée"
                  : "Suivi détaillé des encaissements et statuts en temps réel"}
              </p>
            </div>

            {/* Lien Voir toutes les factures avec hover pro */}
            <Link
              href="/factures"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 group self-start sm:self-auto shrink-0 whitespace-nowrap transition-colors"
            >
              <span className="whitespace-nowrap">Voir toutes les factures</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
            </Link>
          </div>

          {/* Barre de filtres & recherche responsive */}
          <div className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Onglets de filtrage (border-radius: 8px, badges internes: 5px) */}
            <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-[9px] overflow-x-auto scrollbar-none w-full md:w-auto">
              {[
                { id: "all", label: "Toutes", count: counts.all },
                { id: "paid", label: "Payées", count: counts.paid },
                { id: "sent", label: "Envoyées", count: counts.sent },
                { id: "overdue", label: "En retard", count: counts.overdue },
                { id: "draft", label: "Brouillons", count: counts.draft },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-[7px] text-xs font-medium transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer",
                    selectedFilter === tab.id
                      ? "bg-white text-gray-900 font-semibold shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
                  )}
                >
                  <span className="whitespace-nowrap">{tab.label}</span>
                  <span
                    className={cn(
                      "text-[10px] sm:text-[10.5px] px-1.5 py-0.2 rounded-[5px] font-semibold transition-colors",
                      selectedFilter === tab.id
                        ? "bg-gray-100 text-gray-800"
                        : "text-gray-400"
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Recherche locale (border-radius: 8px) */}
            <div className="relative w-full md:w-64 lg:w-72 shrink-0">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher facture, client, ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50/90 hover:bg-white focus:bg-white text-xs border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-150"
              />
            </div>
          </div>

          {/* Table des Factures pleine largeur avec conteneur défilable */}
          <div className="overflow-x-auto -mx-4 sm:-mx-5 lg:-mx-6 overscroll-x-contain">
            <table className="w-full text-left text-xs min-w-[680px]">
              <thead>
                <tr className="bg-gray-50/70 border-y border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6 whitespace-nowrap">N° Facture</th>
                  <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Client</th>
                  <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Date d&apos;émission</th>
                  <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Échéance</th>
                  <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Montant</th>
                  <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Statut</th>
                  <th className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-gray-50/80 transition-colors duration-150 group cursor-pointer"
                    >
                      {/* N° Facture */}
                      <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-gray-900">
                        <Link
                          href={`/factures/${inv.id}`}
                          className="hover:text-brand-600 inline-flex items-center gap-2 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-600 transition-colors shrink-0" />
                          <span className="whitespace-nowrap">{inv.invoiceNumber}</span>
                        </Link>
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <div
                            className={cn(
                              "w-7 h-7 sm:w-8 sm:h-8 rounded-[7px] text-xs font-bold flex items-center justify-center shrink-0",
                              inv.client.avatarBg || "bg-gray-100 text-gray-700"
                            )}
                          >
                            {inv.client.avatarInitials || "CL"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 leading-tight truncate">
                              {inv.client.name}
                            </p>
                            <p className="text-[10.5px] sm:text-[11px] text-gray-400 mt-0.5 truncate">
                              {inv.client.city}, {inv.client.country}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date Émission */}
                      <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap text-gray-600">
                        {formatDateNumeric(inv.issueDate)}
                      </td>

                      {/* Date Échéance */}
                      <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap text-gray-600 font-medium">
                        {formatDateNumeric(inv.dueDate)}
                      </td>

                      {/* Montant FCFA */}
                      <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                        <span className="font-bold text-gray-900 font-sans tracking-tight text-xs sm:text-sm whitespace-nowrap">
                          {formatFCFA(inv.totalAmount)}
                        </span>
                      </td>

                      {/* Statut Badge (radius: 5px) */}
                      <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                        <StatusBadge status={inv.status} size="md" />
                      </td>

                      {/* Actions avec hover pro */}
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100">
                          <Link
                            href={`/factures/${inv.id}`}
                            className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-brand-600 hover:bg-brand-50 active:scale-95 transition-all duration-150"
                            title="Voir la facture"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-gray-800 hover:bg-gray-100 active:scale-95 transition-all duration-150 cursor-pointer"
                            title="Télécharger PDF"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Téléchargement de la facture ${inv.invoiceNumber}`);
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-10 sm:py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-gray-300 stroke-1" />
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          {hasDateFilter
                            ? "Aucune facture émise sur cette période"
                            : "Aucune facture trouvée"}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-400">
                          {hasDateFilter
                            ? "Modifiez la période ou cliquez sur la croix pour réinitialiser."
                            : "Commencez par créer votre première facture."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer du tableau */}
          <div className="pt-4 sm:pt-5 mt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2.5 sm:gap-3">
            <span>
              Affichage de <span className="font-semibold text-gray-800">{filteredInvoices.length}</span> facture(s)
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-[2px] bg-emerald-500 shrink-0" />
              <span className="text-center sm:text-left">Conforme au plan comptable OHADA • Zone UEMOA (FCFA)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
