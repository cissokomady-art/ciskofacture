"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useClients } from "@/lib/store/app-store";
import { Building2, ArrowLeft, Plus } from "lucide-react";

export default function NouveauClientPage() {
  const router = useRouter();
  const { addClient } = useClients();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Dakar");
  const [country, setCountry] = useState("Sénégal");
  const [taxId, setTaxId] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Veuillez renseigner au moins le nom et l'adresse email de l'entreprise.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addClient({
        name,
        email,
        phone,
        address,
        city,
        country,
        taxId,
        notes,
      });
    } catch (err) {
      console.error("Add client error:", err);
    } finally {
      setIsSubmitting(false);
      router.push("/clients");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/clients")}
          className="p-2 rounded-[8px] bg-white border border-gray-200/90 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Clients</span>
            <span>/</span>
            <span className="text-gray-700 font-medium">Nouveau client</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Enregistrer une nouvelle entreprise
          </h2>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Raison Sociale */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nom de l&apos;entreprise / Raison sociale <span className="text-brand-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Baobab FinTech Group SA"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
            />
          </div>

          {/* Email & Téléphone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Adresse Email <span className="text-brand-600">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="facturation@entreprise.ci"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Numéro de Téléphone
              </label>
              <input
                type="tel"
                placeholder="+225 27 20 00 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              />
            </div>
          </div>

          {/* Adresse Physique */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Adresse physique / Siège
            </label>
            <input
              type="text"
              placeholder="Avenue, Boulevard, Immeuble..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Ville
              </label>
              <input
                type="text"
                placeholder="Abidjan, Dakar, Cotonou..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Pays
              </label>
              <input
                type="text"
                placeholder="Côte d'Ivoire, Sénégal, Togo..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              />
            </div>
          </div>

          {/* N° IFU / RCCM */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Numéro IFU / RCCM (Mention légale)
            </label>
            <input
              type="text"
              placeholder="Ex: CI-ABJ-2023-B-99812"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono bg-gray-50/90 focus:bg-white text-xs border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Notes & Conditions particulières
            </label>
            <textarea
              rows={3}
              placeholder="Délai de paiement accordé, contact de la comptabilité..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50/90 focus:bg-white text-xs border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              href="/clients"
              className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-[8px] text-xs font-semibold transition"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer disabled:opacity-60"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? "Enregistrement..." : "Créer le compte client"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
