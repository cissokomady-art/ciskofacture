"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClients, useInvoices } from "@/lib/store/app-store";
import { Client } from "@/lib/data/mock/clients";
import { calculateInvoiceTotals, InvoiceItem, Invoice } from "@/lib/data/mock/invoices";
import { InvoiceLivePreview } from "./InvoiceLivePreview";
import { formatFCFA } from "@/lib/format/currency";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Building2,
  Plus,
  Trash2,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  Hash,
  Coins,
  Percent,
  CheckCircle2,
  FileText,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

interface InvoiceFormProps {
  initialInvoice?: Invoice;
  isEditing?: boolean;
}

export function InvoiceForm({ initialInvoice, isEditing = false }: InvoiceFormProps) {
  const router = useRouter();
  const { clients } = useClients();
  const { addInvoice, updateInvoice } = useInvoices();

  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<"standard" | "split" | "recurring">("standard");

  // Form State
  const [invoiceNumber, setInvoiceNumber] = useState(
    initialInvoice?.invoiceNumber || `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [selectedClientId, setSelectedClientId] = useState<string>(
    initialInvoice?.clientId || (clients[0]?.id || "")
  );

  const [issuerName, setIssuerName] = useState(
    initialInvoice?.issuer?.name || "Cisko Digital Ventures SARL"
  );
  const [issuerEmail, setIssuerEmail] = useState(
    initialInvoice?.issuer?.email || "mady.cissoko@ciskofacture.com"
  );
  const [issuerPhone, setIssuerPhone] = useState(
    initialInvoice?.issuer?.phone || "+221 76 643 67 67"
  );
  const [issuerAddress, setIssuerAddress] = useState(
    initialInvoice?.issuer?.address || "Parcelles Assainies, Unité 16"
  );
  const [issuerCity, setIssuerCity] = useState(initialInvoice?.issuer?.city || "Dakar");
  const [issuerCountry, setIssuerCountry] = useState(initialInvoice?.issuer?.country || "Sénégal");
  const [issuerTaxId, setIssuerTaxId] = useState(initialInvoice?.issuer?.taxId || "SN-DKR-2024-B-99820");
  const [issuerBankName, setIssuerBankName] = useState(
    initialInvoice?.issuer?.bankName || "Société Générale Sénégal (SGS)"
  );
  const [issuerIbanRib, setIssuerIbanRib] = useState(
    initialInvoice?.issuer?.ibanRib || "SN08 SN01 2010 0112 3456 7890 123"
  );

  const today = new Date().toISOString().split("T")[0];
  const inThirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [issueDate, setIssueDate] = useState(initialInvoice?.issueDate || today);
  const [dueDate, setDueDate] = useState(initialInvoice?.dueDate || inThirtyDays);
  const [notes, setNotes] = useState(
    initialInvoice?.notes || "Conformément aux règles OHADA, le règlement est attendu sous 30 jours à réception de facture."
  );

  // Dynamic Line Items
  const [items, setItems] = useState<Array<{ id: string; description: string; quantity: number; unitPrice: number; vatRate: number }>>(
    initialInvoice?.items?.map((i) => ({
      id: i.id,
      description: i.description,
      quantity: i.quantity,
      unitPrice: i.unitPrice,
      vatRate: i.vatRate,
    })) || [
      {
        id: "item-1",
        description: "Prestation de développement & intégration logicielle",
        quantity: 1,
        unitPrice: 1500000,
        vatRate: 18,
      },
      {
        id: "item-2",
        description: "Assistance technique & formation des utilisateurs",
        quantity: 2,
        unitPrice: 250000,
        vatRate: 18,
      },
    ]
  );

  // Discount
  const [discountEnabled, setDiscountEnabled] = useState(initialInvoice?.discountEnabled || false);
  const [discountLabel, setDiscountLabel] = useState(initialInvoice?.discountLabel || "Remise commerciale");
  const [discountAmount, setDiscountAmount] = useState(initialInvoice?.discountAmount || 0);

  const [isSaving, setIsSaving] = useState(false);

  // Resolve selected client
  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0] || null;

  useEffect(() => {
    if (!selectedClientId && clients.length > 0) {
      setSelectedClientId(clients[0].id);
    }
  }, [clients, selectedClientId]);

  // Real-time calculations
  const totals = calculateInvoiceTotals(items, discountEnabled ? discountAmount : 0);

  // Handlers for Items
  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now().toString(36)}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
      vatRate: 18,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      alert("Une facture doit comporter au moins une ligne d'article.");
      return;
    }
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setItems(updated);
  };

  // Submit Handlers
  const handleSave = async (status: "draft" | "sent") => {
    const targetClient = selectedClient || clients[0];
    if (!targetClient) {
      alert("Veuillez sélectionner un client pour cette facture.");
      return;
    }

    if (items.length === 0 || items.some((i) => !i.description.trim())) {
      alert("Veuillez renseigner une description pour chaque ligne d'article.");
      return;
    }

    setIsSaving(true);

    const invoicePayload = {
      invoiceNumber,
      status,
      clientId: targetClient.id,
      client: {
        name: targetClient.name,
        email: targetClient.email,
        phone: targetClient.phone,
        address: targetClient.address,
        city: targetClient.city,
        country: targetClient.country,
        taxId: targetClient.taxId,
        avatarInitials: targetClient.avatarInitials,
        avatarBg: targetClient.avatarBg,
      },
      issuer: {
        name: issuerName,
        email: issuerEmail,
        phone: issuerPhone,
        address: issuerAddress,
        city: issuerCity,
        country: issuerCountry,
        taxId: issuerTaxId,
        bankName: issuerBankName,
        ibanRib: issuerIbanRib,
      },
      issueDate,
      dueDate,
      currency: "XOF",
      vatRateDefault: 18,
      items: totals.calculatedItems,
      subtotal: totals.subtotal,
      discountEnabled,
      discountLabel: discountEnabled ? discountLabel : undefined,
      discountAmount: discountEnabled ? totals.discountAmount : 0,
      vatAmount: totals.vatAmount,
      totalAmount: totals.totalAmount,
      notes,
      paymentMethod: "Virement bancaire UEMOA",
    };

    try {
      if (isEditing && initialInvoice?.id) {
        await updateInvoice(initialInvoice.id, invoicePayload);
      } else {
        await addInvoice(invoicePayload);
      }
    } catch (e) {
      console.error("Save error:", e);
    } finally {
      setIsSaving(false);
      router.push("/factures");
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête de page & Fil d'Ariane */}
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
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>Facturation</span>
              <span>/</span>
              <span className="text-gray-700 font-medium">
                {isEditing ? "Modifier facture" : "Créer une facture"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {isEditing ? `Modifier ${invoiceNumber}` : "Créer une nouvelle facture"}
            </h2>
          </div>
        </div>

        {/* Toggle switch "Afficher aperçu" pour tablettes et desktop */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200/90 rounded-[8px] text-xs font-semibold text-gray-700 shadow-2xs">
            {showPreview ? <Eye className="w-3.5 h-3.5 text-brand-600" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
            <span>Aperçu live</span>
            <button
              type="button"
              role="switch"
              aria-checked={showPreview}
              onClick={() => setShowPreview(!showPreview)}
              className={cn(
                "w-8 h-4.5 p-0.5 rounded-full transition-colors relative inline-flex items-center focus:outline-none cursor-pointer ml-1",
                showPreview ? "bg-brand-600" : "bg-gray-200"
              )}
            >
              <span
                className={cn(
                  "w-3.5 h-3.5 rounded-full bg-white shadow-xs transition-transform duration-200 inline-block",
                  showPreview ? "translate-x-3.5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Disposition Split-Screen inspirée fidèlement de la capture creatinf */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
        {/* Volet Gauche : Formulaire de Saisie */}
        <div className={cn("space-y-6 transition-all", showPreview ? "xl:col-span-6 2xl:col-span-6" : "xl:col-span-12")}>
          <div className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-7 shadow-card space-y-6">
            {/* Onglets de type de facturation (Standard / Échelonné / Récurrent) */}
            <div>
              <div className="flex items-center gap-1 p-1 bg-gray-100/80 rounded-[9px]">
                <button
                  type="button"
                  onClick={() => setActiveTab("standard")}
                  className={cn(
                    "flex-1 py-2 rounded-[7px] text-xs font-semibold transition cursor-pointer text-center",
                    activeTab === "standard"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("split")}
                  className={cn(
                    "flex-1 py-2 rounded-[7px] text-xs font-medium transition cursor-pointer text-center",
                    activeTab === "split"
                      ? "bg-white text-gray-900 shadow-xs font-semibold"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                  title="Échelonné (Bientôt disponible)"
                >
                  Échelonné
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("recurring")}
                  className={cn(
                    "flex-1 py-2 rounded-[7px] text-xs font-medium transition cursor-pointer text-center",
                    activeTab === "recurring"
                      ? "bg-white text-gray-900 shadow-xs font-semibold"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                  title="Récurrent (Bientôt disponible)"
                >
                  Récurrent
                </button>
              </div>
            </div>

            {/* Section 1 : Informations Générales */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Informations Facture
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nom Émetteur */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Émetteur (Votre entreprise) <span className="text-brand-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={issuerName}
                      onChange={(e) => setIssuerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                {/* Client (Billed To) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Client facturé <span className="text-brand-600">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedClientId}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition appearance-none cursor-pointer"
                    >
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.city})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Date d'émission */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Date d&apos;émission <span className="text-brand-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>
                </div>

                {/* Date d'échéance */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Date d&apos;échéance <span className="text-brand-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>
                </div>

                {/* N° Facture */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Numéro de facture <span className="text-brand-600">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 font-mono font-bold bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 : Prestations & Lignes de Facture */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Lignes de Facture / Articles
                  </h3>
                  <span className="text-[11px] text-gray-400">Devise : FCFA (Zone UEMOA)</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 px-2.5 py-1 bg-gray-100 rounded-[6px]">
                  <Coins className="w-3.5 h-3.5 text-brand-600" />
                  <span>XOF (FCFA)</span>
                </div>
              </div>

              {/* Liste dynamique des lignes d'articles */}
              <div className="space-y-3">
                {items.map((item, index) => {
                  const lineSubtotal = Math.round(Number(item.quantity) * Number(item.unitPrice) || 0);

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 bg-gray-50/90 border border-gray-200/90 rounded-xl space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span>Article {index + 1}</span>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="p-1 rounded-[6px] text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Supprimer la ligne"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <input
                          type="text"
                          placeholder="Nom de la prestation ou description du service..."
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          className="w-full px-3 py-2 bg-white text-xs sm:text-sm border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                        />
                      </div>

                      {/* Quantité, TVA et Prix Unitaire */}
                      <div className="grid grid-cols-12 gap-2.5 items-center">
                        {/* Quantité */}
                        <div className="col-span-3">
                          <label className="block text-[10.5px] font-medium text-gray-500 mb-1">
                            Quantité
                          </label>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full px-2.5 py-1.5 bg-white text-xs text-center border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                          />
                        </div>

                        {/* Taux de TVA */}
                        <div className="col-span-3">
                          <label className="block text-[10.5px] font-medium text-gray-500 mb-1">
                            TVA (%)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.vatRate}
                              onChange={(e) => handleItemChange(index, "vatRate", parseFloat(e.target.value) || 0)}
                              className="w-full pl-2 pr-5 py-1.5 bg-white text-xs text-center border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                            />
                            <Percent className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Prix unitaire en FCFA */}
                        <div className="col-span-6">
                          <label className="block text-[10.5px] font-medium text-gray-500 mb-1">
                            Prix unitaire HT (FCFA)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="1000"
                            placeholder="0 FCFA"
                            value={item.unitPrice || ""}
                            onChange={(e) => handleItemChange(index, "unitPrice", Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full px-3 py-1.5 bg-white text-xs font-semibold text-right border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                          />
                        </div>
                      </div>

                      {/* Sous-total de la ligne */}
                      <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                        <span className="text-gray-500 text-[11px]">Total ligne HT :</span>
                        <span className="font-bold text-gray-900">{formatFCFA(lineSubtotal)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bouton Ajouter un article */}
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100/90 border border-dashed border-gray-300 hover:border-brand-500 rounded-[8px] text-xs font-semibold text-gray-700 hover:text-brand-700 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Plus className="w-4 h-4 text-brand-600" />
                <span>Ajouter un article / prestation</span>
              </button>
            </div>

            {/* Section 3 : Remise optionnelle */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="discountCheck"
                  checked={discountEnabled}
                  onChange={(e) => setDiscountEnabled(e.target.checked)}
                  className="w-4 h-4 rounded-[4px] text-brand-600 border-gray-300 focus:ring-brand-500 cursor-pointer"
                />
                <label htmlFor="discountCheck" className="text-xs font-semibold text-gray-800 cursor-pointer">
                  Appliquer une remise globale
                </label>
              </div>

              {discountEnabled && (
                <div className="p-3.5 bg-brand-50/40 border border-brand-100 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Motif de la remise
                    </label>
                    <input
                      type="text"
                      value={discountLabel}
                      onChange={(e) => setDiscountLabel(e.target.value)}
                      placeholder="Ex: Geste commercial, Accord cadre..."
                      className="w-full px-3 py-1.5 bg-white text-xs border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Montant de la remise (FCFA)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="5000"
                      value={discountAmount || ""}
                      onChange={(e) => setDiscountAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0 FCFA"
                      className="w-full px-3 py-1.5 bg-white text-xs font-semibold text-right border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 4 : Notes & Conditions */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Notes & Conditions de règlement
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              />
            </div>

            {/* Action Buttons en bas de formulaire */}
            <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                className="w-full sm:w-auto px-5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200/90 text-gray-700 rounded-[8px] text-xs font-semibold shadow-2xs hover:shadow-xs transition active:scale-[0.99] cursor-pointer disabled:opacity-60"
              >
                Sauvegarder comme brouillon
              </button>

              <button
                type="button"
                onClick={() => handleSave("sent")}
                disabled={isSaving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer disabled:opacity-60 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSaving ? "Enregistrement..." : "Émettre et envoyer la facture"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Volet Droit : Live Preview en temps réel (affiché si showPreview est actif) */}
        {showPreview && (
          <div className="xl:col-span-6 2xl:col-span-6 sticky top-20">
            <InvoiceLivePreview
              invoiceNumber={invoiceNumber}
              issuerName={issuerName}
              issuerEmail={issuerEmail}
              issuerPhone={issuerPhone}
              issuerAddress={issuerAddress}
              issuerCity={issuerCity}
              issuerCountry={issuerCountry}
              issuerTaxId={issuerTaxId}
              issuerBankName={issuerBankName}
              issuerIbanRib={issuerIbanRib}
              client={selectedClient}
              issueDate={issueDate}
              dueDate={dueDate}
              items={totals.calculatedItems}
              subtotal={totals.subtotal}
              discountEnabled={discountEnabled}
              discountLabel={discountLabel}
              discountAmount={totals.discountAmount}
              vatAmount={totals.vatAmount}
              totalAmount={totals.totalAmount}
              notes={notes}
              onSend={() => handleSave("sent")}
              onSaveDraft={() => handleSave("draft")}
              isSaving={isSaving}
            />
          </div>
        )}
      </div>
    </div>
  );
}
