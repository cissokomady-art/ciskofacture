"use client";

import React from "react";
import { formatFCFA } from "@/lib/format/currency";
import { formatDateReadable } from "@/lib/format/date";
import { InvoiceItem } from "@/lib/data/mock/invoices";
import { Client } from "@/lib/data/mock/clients";
import { Mail, Download, Check, Sparkles, Building2, ShieldCheck } from "lucide-react";

interface InvoiceLivePreviewProps {
  invoiceNumber: string;
  issuerName: string;
  issuerEmail: string;
  issuerPhone?: string;
  issuerAddress: string;
  issuerCity: string;
  issuerCountry: string;
  issuerTaxId: string;
  issuerBankName: string;
  issuerIbanRib: string;
  client: Client | null;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discountEnabled: boolean;
  discountLabel?: string;
  discountAmount: number;
  vatAmount: number;
  totalAmount: number;
  notes?: string;
  onSend?: () => void;
  onSaveDraft?: () => void;
  isSaving?: boolean;
}

export function InvoiceLivePreview({
  invoiceNumber,
  issuerName,
  issuerEmail,
  issuerPhone = "+221 76 643 67 67",
  issuerAddress,
  issuerCity,
  issuerCountry,
  issuerTaxId,
  issuerBankName,
  issuerIbanRib,
  client,
  issueDate,
  dueDate,
  items,
  subtotal,
  discountEnabled,
  discountLabel,
  discountAmount,
  vatAmount,
  totalAmount,
  notes,
  onSend,
  onSaveDraft,
  isSaving,
}: InvoiceLivePreviewProps) {
  return (
    <div className="space-y-4">
      {/* Top Action Header de la prévisualisation (comme dans creatinf) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            Aperçu en direct
          </h3>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => alert(`Envoi par email de la facture ${invoiceNumber}`)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-[8px] text-xs font-semibold text-gray-700 shadow-2xs hover:border-gray-300 transition shrink-0 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => alert(`Génération du PDF pour ${invoiceNumber}`)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-[8px] text-xs font-semibold text-gray-700 shadow-2xs hover:border-gray-300 transition shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        {/* Boutons d'enregistrement rapides */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          {onSaveDraft && (
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isSaving}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 text-gray-700 rounded-[8px] text-xs font-semibold shadow-2xs hover:border-gray-300 transition shrink-0 cursor-pointer disabled:opacity-60"
            >
              <span>Brouillon</span>
            </button>
          )}

          {onSend && (
            <button
              type="button"
              onClick={onSend}
              disabled={isSaving}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all transform hover:-translate-y-0.5 shrink-0 cursor-pointer disabled:opacity-60 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSaving ? "Envoi..." : "Envoyer la facture"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Feuille de facture officielle (Paper effect avec ombrage soigné) */}
      <div className="relative">
        {/* Effet d'empilement de papier subtil */}
        <div className="absolute -top-1.5 -right-1.5 w-full h-full bg-gray-200/60 rounded-2xl -z-10 transform rotate-[0.4deg] hidden sm:block" />
        <div className="absolute -top-1 -left-1 w-full h-full bg-gray-100 rounded-2xl -z-20 transform -rotate-[0.3deg] hidden sm:block" />

        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-card space-y-6 text-gray-800 text-xs">
          {/* Header de la facture */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
                Facture Proforma / Finale
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
                FACTURE
              </h2>
              <p className="font-mono text-xs font-bold text-gray-600 mt-1">
                N° {invoiceNumber || "FAC-2026-XXXX"}
              </p>
            </div>

            {/* Logo d'entreprise stylé dans l'en-tête (comme le sceau dans la capture) */}
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20 flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 8h6" />
                <path d="M9 12h6" />
                <path d="M9 16h4" />
              </svg>
            </div>
          </div>

          {/* Adresses : Facturé par & Facturé à */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[11px] sm:text-xs">
            {/* Émetteur */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Facturé par :
              </span>
              <p className="font-bold text-gray-900 text-xs sm:text-sm">
                {issuerName || "Cisko Digital Ventures SARL"}
              </p>
              <p className="text-gray-500">{issuerEmail || "mady.cissoko@ciskofacture.com"}</p>
              <p className="text-gray-500">{issuerPhone || "+221 76 643 67 67"}</p>
              <p className="text-gray-500">{issuerAddress || "Parcelles Assainies, Unité 16"}</p>
              <p className="text-gray-500">{issuerCity || "Dakar"}, {issuerCountry || "Sénégal"}</p>
              {issuerTaxId && (
                <p className="text-gray-400 text-[10px] font-mono mt-1">
                  N° IFU / RCCM : {issuerTaxId}
                </p>
              )}
            </div>

            {/* Destinataire Client */}
            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Facturé à :
              </span>
              {client ? (
                <>
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">{client.name}</p>
                  <p className="text-gray-500">{client.email}</p>
                  <p className="text-gray-500">{client.address || "Adresse client"}</p>
                  <p className="text-gray-500">{client.city}, {client.country}</p>
                  {client.taxId && (
                    <p className="text-gray-400 text-[10px] font-mono mt-1">
                      N° IFU : {client.taxId}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-400 italic">Sélectionnez un client...</p>
              )}
            </div>
          </div>

          {/* Dates d'émission et d'échéance */}
          <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-gray-50/80 rounded-xl border border-gray-100 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Date d&apos;émission</span>
              <span className="font-bold text-gray-900">{formatDateReadable(issueDate)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Date d&apos;échéance</span>
              <span className="font-bold text-gray-900">{formatDateReadable(dueDate)}</span>
            </div>
          </div>

          {/* Tableau des Lignes de Facture */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Prestations & Services
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[10.5px] font-semibold text-gray-400 uppercase">
                    <th className="pb-2">Désignation</th>
                    <th className="pb-2 text-center w-12">Qté</th>
                    <th className="pb-2 text-center w-16">TVA</th>
                    <th className="pb-2 text-right w-28">Montant HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-gray-50/50">
                      <td className="py-2.5 font-medium text-gray-800 pr-2">
                        {item.description || "Article sans description"}
                      </td>
                      <td className="py-2.5 text-center text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="py-2.5 text-center text-gray-500 font-mono text-[11px]">
                        {item.vatRate}%
                      </td>
                      <td className="py-2.5 text-right font-bold text-gray-900 whitespace-nowrap">
                        {formatFCFA(item.lineSubtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Récapitulatif des Totaux */}
          <div className="pt-4 border-t border-gray-100 flex flex-col items-end">
            <div className="w-full max-w-xs space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total HT :</span>
                <span className="font-semibold text-gray-900">{formatFCFA(subtotal)}</span>
              </div>

              {discountEnabled && discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Remise ({discountLabel || "Accord commercial"}) :</span>
                  <span className="font-semibold">- {formatFCFA(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>TVA légale (18%) :</span>
                <span className="font-semibold text-gray-900">{formatFCFA(vatAmount)}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm sm:text-base font-black text-gray-900">
                <span>Total TTC :</span>
                <span className="text-brand-700 font-mono tracking-tight">
                  {formatFCFA(totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Mentions Légales & Conditions */}
          <div className="p-3 bg-gray-50/70 border border-gray-100 rounded-xl text-[10.5px] text-gray-500 leading-relaxed">
            <p>
              {notes || "Conformément aux dispositions de l'OHADA, tout retard de règlement donnera lieu à l'application de pénalités de retard équivalentes à 3 fois le taux d'intérêt légal."}
            </p>
          </div>

          {/* Coordonnées Bancaires & Signature */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 items-end text-xs">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Coordonnées de règlement
              </span>
              <p className="font-bold text-gray-800">{issuerBankName}</p>
              <p className="font-mono text-[11px] text-gray-600 mt-0.5">{issuerIbanRib}</p>
            </div>

            <div className="sm:text-right flex flex-col sm:items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Signature autorisée
              </span>
              <div className="font-serif italic text-lg sm:text-xl text-gray-800 font-bold border-b border-gray-300 pb-1 inline-block">
                Mady Cissoko
              </div>
              <span className="text-[9px] text-gray-400 mt-0.5">Fondateur & Dirigeant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
