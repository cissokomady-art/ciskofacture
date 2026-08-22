"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInvoices } from "@/lib/store/app-store";
import { formatFCFA } from "@/lib/format/currency";
import { formatDateNumeric } from "@/lib/format/date";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { InvoiceStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  FileText,
  Eye,
  Edit2,
  Trash2,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  MoreVertical,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function FacturesPage() {
  const router = useRouter();
  const { invoices, loaded, deleteInvoice, updateInvoiceStatus } = useInvoices();

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Counters
  const counts = useMemo(() => {
    return {
      all: invoices.length,
      paid: invoices.filter((i) => i.status === "paid").length,
      sent: invoices.filter((i) => i.status === "sent").length,
      overdue: invoices.filter((i) => i.status === "overdue").length,
      draft: invoices.filter((i) => i.status === "draft").length,
    };
  }, [invoices]);

  // Totals for top cards
  const stats = useMemo(() => {
    const totalVolume = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
    const paidVolume = invoices.filter((i) => i.status === "paid").reduce((acc, i) => acc + i.totalAmount, 0);
    const pendingVolume = invoices.filter((i) => i.status === "sent").reduce((acc, i) => acc + i.totalAmount, 0);
    const overdueVolume = invoices.filter((i) => i.status === "overdue").reduce((acc, i) => acc + i.totalAmount, 0);

    return { totalVolume, paidVolume, pendingVolume, overdueVolume };
  }, [invoices]);

  // Filtering
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchFilter = selectedFilter === "all" || inv.status === selectedFilter;
      const matchSearch =
        searchQuery.trim() === "" ||
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [invoices, selectedFilter, searchQuery]);

  const handleDelete = (id: string) => {
    deleteInvoice(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Gestion commerciale</span>
            <span>/</span>
            <span className="text-gray-700 font-medium">Factures</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Factures clients
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Suivi des émissions, encaissements et relances en zone UEMOA
          </p>
        </div>

        <Link
          href="/factures/nouvelle"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shrink-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Nouvelle facture</span>
        </Link>
      </div>

      {/* 2. Mini KPI Summary Cards (Radius: 12-14px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block">Total facturé</span>
            <span className="text-base sm:text-lg font-bold text-gray-900 font-sans tracking-tight">
              {formatFCFA(stats.totalVolume)}
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">{invoices.length} factures au total</span>
          </div>
          <div className="w-8 h-8 rounded-[8px] bg-brand-50 text-brand-700 flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block">Encaissé (Payé)</span>
            <span className="text-base sm:text-lg font-bold text-emerald-700 font-sans tracking-tight">
              {formatFCFA(stats.paidVolume)}
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">{counts.paid} factures réglées</span>
          </div>
          <div className="w-8 h-8 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block">En attente</span>
            <span className="text-base sm:text-lg font-bold text-amber-700 font-sans tracking-tight">
              {formatFCFA(stats.pendingVolume)}
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">{counts.sent} factures transmises</span>
          </div>
          <div className="w-8 h-8 rounded-[8px] bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block">En retard</span>
            <span className="text-base sm:text-lg font-bold text-rose-700 font-sans tracking-tight">
              {formatFCFA(stats.overdueVolume)}
            </span>
            <span className="text-[10px] text-gray-500 block mt-0.5">{counts.overdue} relance(s) requise(s)</span>
          </div>
          <div className="w-8 h-8 rounded-[8px] bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Table Card Pleine Largeur */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-6 shadow-card space-y-4">
        {/* Barre de filtres par statut et recherche */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          {/* Onglets de filtrage */}
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
                    "text-[10px] sm:text-[10.5px] px-1.5 py-0.2 rounded-[5px] font-semibold",
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

          {/* Barre de recherche */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par N°, client, ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50/90 hover:bg-white focus:bg-white text-xs border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
            />
          </div>
        </div>

        {/* Tableau Responsive */}
        <div className="overflow-x-auto -mx-4 sm:-mx-6 overscroll-x-contain">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/70 border-y border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6 whitespace-nowrap">N° Facture</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Client</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Date d&apos;émission</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Échéance</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Montant TTC</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Statut</th>
                <th className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => router.push(`/factures/${inv.id}`)}
                    className="hover:bg-gray-50/80 transition-colors duration-150 group cursor-pointer"
                  >
                    {/* N° Facture */}
                    <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-gray-900">
                      <div className="inline-flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-600 transition-colors shrink-0" />
                        <span className="group-hover:text-brand-600 transition-colors">{inv.invoiceNumber}</span>
                      </div>
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

                    {/* Date d'émission */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap text-gray-600">
                      {formatDateNumeric(inv.issueDate)}
                    </td>

                    {/* Échéance */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap text-gray-600 font-medium">
                      {formatDateNumeric(inv.dueDate)}
                    </td>

                    {/* Montant TTC FCFA */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                      <span className="font-bold text-gray-900 font-sans tracking-tight text-xs sm:text-sm whitespace-nowrap">
                        {formatFCFA(inv.totalAmount)}
                      </span>
                    </td>

                    {/* Statut Badge */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                      <StatusBadge status={inv.status} size="md" />
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        {/* Bouton Voir */}
                        <Link
                          href={`/factures/${inv.id}`}
                          className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-brand-600 hover:bg-brand-50 active:scale-95 transition-all duration-150"
                          title="Voir la facture"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Bouton Modifier */}
                        <Link
                          href={`/factures/${inv.id}/modifier`}
                          className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-gray-800 hover:bg-gray-100 active:scale-95 transition-all duration-150"
                          title="Modifier la facture"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>

                        {/* Bouton Supprimer */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(inv.id)}
                          className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all duration-150 cursor-pointer"
                          title="Supprimer la facture"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 text-gray-300 stroke-1" />
                      <p className="text-sm font-medium text-gray-600">
                        Aucune facture trouvée
                      </p>
                      <p className="text-xs text-gray-400">
                        Ajustez vos filtres ou créez votre première facture.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2.5">
          <span>
            Affichage de <span className="font-semibold text-gray-800">{filteredInvoices.length}</span> sur <span className="font-semibold text-gray-800">{invoices.length}</span> facture(s)
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-[2px] bg-emerald-500 shrink-0" />
            <span>Tous les montants sont conformes OHADA • Zone UEMOA</span>
          </div>
        </div>
      </div>

      {/* Modale de Confirmation de Suppression */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Supprimer cette facture ?
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Cette action est irréversible. La facture et toutes ses lignes seront définitivement supprimées.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-[8px] text-xs font-semibold transition cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-[8px] text-xs font-semibold shadow-sm transition cursor-pointer"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
