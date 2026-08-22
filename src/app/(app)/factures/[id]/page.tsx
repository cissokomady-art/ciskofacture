"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useInvoices } from "@/lib/store/app-store";
import { formatFCFA } from "@/lib/format/currency";
import { formatDateNumeric, formatDateReadable } from "@/lib/format/date";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { InvoiceStatus, INVOICE_STATUS_CONFIG } from "@/lib/constants";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Download,
  Mail,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  FileText,
  Printer,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { fetchInvoiceById } from "@/lib/services/invoices.service";
import { Invoice } from "@/lib/data/mock/invoices";

export default function DetailFacturePage() {
  const params = useParams();
  const router = useRouter();
  const { invoices, loaded, updateInvoiceStatus, deleteInvoice } = useInvoices();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [directInvoice, setDirectInvoice] = useState<Invoice | null>(null);
  const [fetchingDirect, setFetchingDirect] = useState(false);

  const invoiceId = params?.id as string;
  const storeInvoice = invoices.find((i) => i.id === invoiceId);
  const invoice = storeInvoice || directInvoice;

  React.useEffect(() => {
    if (!storeInvoice && invoiceId) {
      setFetchingDirect(true);
      fetchInvoiceById(invoiceId).then((inv) => {
        setDirectInvoice(inv);
        setFetchingDirect(false);
      });
    }
  }, [storeInvoice, invoiceId]);

  if (!loaded || fetchingDirect) {
    return (
      <div className="p-12 text-center text-gray-500 text-xs flex flex-col items-center justify-center gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-600" />
        <span>Chargement de la facture depuis la base de données...</span>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="bg-white border border-gray-200/90 rounded-2xl p-10 shadow-card text-center space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Facture introuvable</h3>
        <p className="text-xs text-gray-500">
          La facture ({invoiceId}) n&apos;existe pas ou a été supprimée.
        </p>
        <div className="pt-2">
          <Link
            href="/factures"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-[8px] text-xs font-semibold shadow-sm hover:bg-brand-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux factures</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusChange = async (newStatus: InvoiceStatus) => {
    if (directInvoice) {
      setDirectInvoice({ ...directInvoice, status: newStatus });
    }
    await updateInvoiceStatus(invoice.id, newStatus);
    setStatusDropdownOpen(false);
  };

  const handleDelete = async () => {
    await deleteInvoice(invoice.id);
    router.push("/factures");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/factures")}
            className="p-2 rounded-[8px] bg-white border border-gray-200/90 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition shadow-2xs cursor-pointer"
            aria-label="Retour à la liste"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Facture</span>
              <span className="text-xs text-gray-400">/</span>
              <span className="font-mono text-xs font-bold text-gray-900">{invoice.invoiceNumber}</span>
              <StatusBadge status={invoice.status} size="sm" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-0.5">
              {invoice.client.name}
            </h2>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto shrink-0">
          {/* Menu Changer le statut */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-[8px] text-xs font-semibold text-gray-700 shadow-2xs hover:border-gray-300 transition cursor-pointer"
            >
              <span>Changer le statut</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {statusDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-200/90 rounded-xl shadow-dropdown py-1.5 z-50 text-xs space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => handleStatusChange("paid")}
                  className="w-full px-3 py-2 text-left hover:bg-emerald-50 text-emerald-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Marquer comme payée</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange("sent")}
                  className="w-full px-3 py-2 text-left hover:bg-amber-50 text-amber-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Marquer comme envoyée</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange("overdue")}
                  className="w-full px-3 py-2 text-left hover:bg-rose-50 text-rose-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Marquer en retard</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange("draft")}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-700 flex items-center gap-2 transition cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-500" />
                  <span>Remettre en brouillon</span>
                </button>
              </div>
            )}
          </div>

          {/* Modifier */}
          <Link
            href={`/factures/${invoice.id}/modifier`}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-[8px] text-xs font-semibold text-gray-700 shadow-2xs hover:border-gray-300 transition"
          >
            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
            <span>Modifier</span>
          </Link>

          {/* Télécharger PDF */}
          <button
            type="button"
            onClick={() => alert(`Impression / Téléchargement du PDF pour ${invoice.invoiceNumber}`)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-[8px] text-xs font-semibold text-gray-700 shadow-2xs hover:border-gray-300 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Télécharger</span>
            <span>PDF</span>
          </button>

          {/* Supprimer */}
          <button
            type="button"
            onClick={() => setDeleteConfirmOpen(true)}
            className="p-2 rounded-[8px] bg-white hover:bg-rose-50 border border-gray-200/90 hover:border-rose-200 text-gray-500 hover:text-rose-600 transition shadow-2xs cursor-pointer"
            title="Supprimer la facture"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visualisation Document Officiel (Facture Papier Proforma / Finale) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-card space-y-8 text-gray-800 text-xs">
        {/* Header Document */}
        <div className="flex items-start justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600">
              Document Commercial • Zone UEMOA
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
              FACTURE
            </h1>
            <p className="font-mono text-sm font-bold text-gray-700 mt-1">
              N° {invoice.invoiceNumber}
            </p>
          </div>

          <div className="w-14 h-14 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20 flex-shrink-0">
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
        </div>

        {/* Adresses : Émetteur & Client */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
          {/* Émetteur */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Facturé par (Prestataire) :
            </span>
            <p className="font-bold text-gray-900 text-sm">{invoice.issuer.name}</p>
            <p className="text-gray-500">{invoice.issuer.email}</p>
            <p className="text-gray-500">{invoice.issuer.phone}</p>
            <p className="text-gray-500">{invoice.issuer.address}</p>
            <p className="text-gray-500">{invoice.issuer.city}, {invoice.issuer.country}</p>
            <p className="text-gray-400 font-mono text-[11px] pt-1">
              IFU / RCCM : {invoice.issuer.taxId}
            </p>
          </div>

          {/* Client */}
          <div className="space-y-1.5 sm:text-right">
            <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Facturé à (Client) :
            </span>
            <p className="font-bold text-gray-900 text-sm">{invoice.client.name}</p>
            <p className="text-gray-500">{invoice.client.email}</p>
            {invoice.client.phone && <p className="text-gray-500">{invoice.client.phone}</p>}
            {invoice.client.address && <p className="text-gray-500">{invoice.client.address}</p>}
            <p className="text-gray-500">{invoice.client.city}, {invoice.client.country}</p>
            {invoice.client.taxId && (
              <p className="text-gray-400 font-mono text-[11px] pt-1">
                IFU / RCCM : {invoice.client.taxId}
              </p>
            )}
          </div>
        </div>

        {/* Dates clés */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-3.5 px-5 bg-gray-50/80 rounded-xl border border-gray-100 text-xs">
          <div>
            <span className="text-[10.5px] text-gray-400 uppercase font-semibold block">Date d&apos;émission</span>
            <span className="font-bold text-gray-900">{formatDateReadable(invoice.issueDate)}</span>
          </div>
          <div>
            <span className="text-[10.5px] text-gray-400 uppercase font-semibold block">Date d&apos;échéance</span>
            <span className="font-bold text-gray-900">{formatDateReadable(invoice.dueDate)}</span>
          </div>
          <div className="col-span-2 sm:col-span-1 sm:text-right">
            <span className="text-[10.5px] text-gray-400 uppercase font-semibold block">Devise</span>
            <span className="font-bold text-brand-700">Franc CFA (XOF)</span>
          </div>
        </div>

        {/* Tableau des Articles */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
            Détail des Prestations
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-[11px] font-semibold text-gray-400 uppercase">
                  <th className="pb-3">Description</th>
                  <th className="pb-3 text-center w-16">Quantité</th>
                  <th className="pb-3 text-right w-28">Prix Unit. HT</th>
                  <th className="pb-3 text-center w-16">TVA</th>
                  <th className="pb-3 text-right w-32">Total HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoice.items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50/50">
                    <td className="py-3 font-medium text-gray-900 pr-3">
                      {item.description}
                    </td>
                    <td className="py-3 text-center text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right text-gray-600 font-mono">
                      {formatFCFA(item.unitPrice)}
                    </td>
                    <td className="py-3 text-center text-gray-500 font-mono text-[11px]">
                      {item.vatRate}%
                    </td>
                    <td className="py-3 text-right font-bold text-gray-900 whitespace-nowrap">
                      {formatFCFA(item.lineSubtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bloc Financier des Totaux */}
        <div className="pt-4 border-t border-gray-100 flex flex-col items-end">
          <div className="w-full max-w-sm space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total HT :</span>
              <span className="font-semibold text-gray-900">{formatFCFA(invoice.subtotal)}</span>
            </div>

            {invoice.discountEnabled && invoice.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Remise ({invoice.discountLabel || "Accord commercial"}) :</span>
                <span className="font-semibold">- {formatFCFA(invoice.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>TVA légale (18%) :</span>
              <span className="font-semibold text-gray-900">{formatFCFA(invoice.vatAmount)}</span>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between text-base sm:text-lg font-black text-gray-900">
              <span>Total TTC à régler :</span>
              <span className="text-brand-700 font-mono tracking-tight">
                {formatFCFA(invoice.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Mentions & Conditions */}
        <div className="p-4 bg-gray-50/70 border border-gray-100 rounded-xl text-xs text-gray-600 space-y-1">
          <p className="font-semibold text-gray-800">Conditions & Modalités :</p>
          <p className="text-[11px] leading-relaxed text-gray-500">
            {invoice.notes || "Facture établie conformément aux normes du Système Comptable OHADA. Règlement net sans escompte sous 30 jours."}
          </p>
        </div>

        {/* Modalités Bancaires & Signature */}
        <div className="pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end text-xs">
          <div>
            <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Instructions de virement bancaire UEMOA
            </span>
            <p className="font-bold text-gray-900">{invoice.issuer.bankName}</p>
            <p className="font-mono text-xs text-gray-700 mt-0.5">{invoice.issuer.ibanRib}</p>
            <p className="text-[10px] text-gray-400 mt-1">Mentionner le N° de facture en référence du virement.</p>
          </div>

          <div className="sm:text-right flex flex-col sm:items-end">
            <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Cachet & Signature
            </span>
            <div className="font-serif italic text-xl text-gray-900 font-bold border-b border-gray-300 pb-1 inline-block">
              Mady Cissoko
            </div>
            <span className="text-[10px] text-gray-400 mt-0.5">Direction Commerciale & Financière</span>
          </div>
        </div>
      </div>

      {/* Modale de Confirmation de Suppression */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Supprimer la facture {invoice.invoiceNumber} ?
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Êtes-vous certain de vouloir supprimer cette facture ? Cette action est irréversible.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-[8px] text-xs font-semibold transition cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
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
