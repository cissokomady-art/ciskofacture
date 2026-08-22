"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useInvoices } from "@/lib/store/app-store";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function ModifierFacturePage() {
  const params = useParams();
  const router = useRouter();
  const { invoices, loaded } = useInvoices();

  const invoiceId = params?.id as string;
  const invoice = invoices.find((i) => i.id === invoiceId);

  if (!loaded) {
    return (
      <div className="p-12 text-center text-gray-500 text-xs">
        Chargement de la facture...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="bg-white border border-gray-200/90 rounded-2xl p-10 shadow-card text-center space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
          <FileQuestion className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Facture introuvable</h3>
        <p className="text-xs text-gray-500">
          La facture demandée ({invoiceId}) n&apos;existe pas ou a été supprimée.
        </p>
        <div className="pt-2">
          <Link
            href="/factures"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-[8px] text-xs font-semibold shadow-sm hover:bg-brand-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la liste</span>
          </Link>
        </div>
      </div>
    );
  }

  return <InvoiceForm initialInvoice={invoice} isEditing={true} />;
}
