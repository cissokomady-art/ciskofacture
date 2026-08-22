"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClients, useInvoices } from "@/lib/store/app-store";
import { Client } from "@/lib/data/mock/clients";
import { formatFCFA } from "@/lib/format/currency";
import { formatDateNumeric } from "@/lib/format/date";
import { cn } from "@/lib/utils";
import {
  Users,
  Plus,
  Search,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function ClientsPage() {
  const router = useRouter();
  const { clients, loaded, addClient, updateClient, deleteClient } = useClients();
  const { invoices } = useInvoices();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Abidjan");
  const [country, setCountry] = useState("Côte d'Ivoire");
  const [taxId, setTaxId] = useState("");
  const [notes, setNotes] = useState("");

  // Populate client with their actual computed invoices count and total billed from current invoices store!
  const enrichedClients = useMemo(() => {
    return clients.map((c) => {
      const clientInvoices = invoices.filter((inv) => inv.clientId === c.id || inv.client.email === c.email);
      const totalBilled = clientInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
      return {
        ...c,
        invoicesCount: clientInvoices.length,
        totalBilled: totalBilled > 0 ? totalBilled : c.totalBilled,
      };
    });
  }, [clients, invoices]);

  // Filtering
  const filteredClients = useMemo(() => {
    return enrichedClients.filter((c) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [enrichedClients, searchQuery]);

  // Total statistics
  const totalClientsCount = clients.length;
  const totalTurnover = enrichedClients.reduce((acc, c) => acc + c.totalBilled, 0);

  const openAddModal = () => {
    setEditingClient(null);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCity("Dakar");
    setCountry("Sénégal");
    setTaxId("");
    setNotes("");
    setModalOpen(true);
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
    setCity(client.city);
    setCountry(client.country);
    setTaxId(client.taxId || "");
    setNotes(client.notes || "");
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Veuillez renseigner au moins le nom et l'adresse email du client.");
      return;
    }

    if (editingClient) {
      updateClient(editingClient.id, {
        name,
        email,
        phone,
        address,
        city,
        country,
        taxId,
        notes,
      });
    } else {
      addClient({
        name,
        email,
        phone,
        address,
        city,
        country,
        taxId,
        notes,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteClient(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Carnet d&apos;adresses</span>
            <span>/</span>
            <span className="text-gray-700 font-medium">Clients</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Clients & Entreprises
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Gestion de vos comptes clients et coordonnées de facturation OHADA
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shrink-0 whitespace-nowrap cursor-pointer"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Nouveau client</span>
        </button>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200/90 rounded-xl p-4 sm:p-5 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block">Total Entreprises</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
              {totalClientsCount} clients
            </span>
            <span className="text-[10.5px] text-gray-500 block mt-0.5">Répertoire actif</span>
          </div>
          <div className="w-9 h-9 rounded-[8px] bg-brand-50 text-brand-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-xl p-4 sm:p-5 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block">Volume d&apos;affaires généré</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-700 font-sans tracking-tight">
              {formatFCFA(totalTurnover)}
            </span>
            <span className="text-[10.5px] text-gray-500 block mt-0.5">Facturation cumulée</span>
          </div>
          <div className="w-9 h-9 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-xl p-4 sm:p-5 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block">Zone d&apos;activité</span>
            <span className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Zone UEMOA
            </span>
            <span className="text-[10.5px] text-gray-500 block mt-0.5">Côte d&apos;Ivoire, Sénégal, Togo...</span>
          </div>
          <div className="w-9 h-9 rounded-[8px] bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Main Clients Table Card */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-6 shadow-card space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
              Liste des comptes clients
            </h3>
            <span className="px-2 py-0.5 rounded-[5px] bg-gray-100 text-gray-600 text-xs font-bold">
              {filteredClients.length}
            </span>
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par nom, ville, pays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50/90 hover:bg-white focus:bg-white text-xs border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
            />
          </div>
        </div>

        {/* Tableau Responsive */}
        <div className="overflow-x-auto -mx-4 sm:-mx-6 overscroll-x-contain">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="bg-gray-50/70 border-y border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6 whitespace-nowrap">Entreprise</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Email & Contact</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Localisation</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Factures</th>
                <th className="py-3 px-4 sm:px-5 whitespace-nowrap">Total Facturé</th>
                <th className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50/80 transition-colors duration-150 group"
                  >
                    {/* Entreprise */}
                    <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-[8px] text-xs font-bold flex items-center justify-center shrink-0",
                            client.avatarBg || "bg-brand-50 text-brand-700"
                          )}
                        >
                          {client.avatarInitials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-xs sm:text-sm">
                            {client.name}
                          </p>
                          {client.taxId && (
                            <p className="text-[10px] text-gray-400 font-mono">
                              IFU : {client.taxId}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                          <span>{client.phone || "—"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Localisation */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">{client.city}</p>
                          <p className="text-[10.5px] text-gray-400">{client.country}</p>
                        </div>
                      </div>
                    </td>

                    {/* Factures associées */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-[5px] text-gray-700 font-semibold text-[11px]">
                        <FileText className="w-3 h-3 text-gray-500" />
                        <span>{client.invoicesCount} facture(s)</span>
                      </span>
                    </td>

                    {/* Total Facturé */}
                    <td className="py-3.5 px-4 sm:px-5 whitespace-nowrap">
                      <span className="font-bold text-gray-900 font-sans tracking-tight text-xs sm:text-sm">
                        {formatFCFA(client.totalBilled)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => openEditModal(client)}
                          className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-brand-600 hover:bg-brand-50 active:scale-95 transition-all duration-150 cursor-pointer"
                          title="Modifier le client"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(client.id)}
                          className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all duration-150 cursor-pointer"
                          title="Supprimer le client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="w-8 h-8 text-gray-300 stroke-1" />
                      <p className="text-sm font-medium text-gray-600">
                        Aucun client trouvé
                      </p>
                      <p className="text-xs text-gray-400">
                        Enregistrez vos entreprises clientes pour émettre des factures en un clic.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            Affichage de <span className="font-semibold text-gray-800">{filteredClients.length}</span> sur <span className="font-semibold text-gray-800">{clients.length}</span> client(s)
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-[2px] bg-emerald-500 shrink-0" />
            <span>Coordonnées synchronisées avec les factures</span>
          </div>
        </div>
      </div>

      {/* Modale d'Ajout / Modification Client (Design System Pro) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[8px] bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  {editingClient ? "Modifier le compte client" : "Ajouter un nouveau client"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-[6px] text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Raison Sociale */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nom de l&apos;entreprise / Raison sociale <span className="text-brand-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Groupe SOTICI SA"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                />
              </div>

              {/* Email & Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Adresse Email <span className="text-brand-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="comptabilite@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Numéro de Téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="+225 07 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              {/* Adresse & Ville / Pays */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Adresse physique
                </label>
                <input
                  type="text"
                  placeholder="Rue, Boulevard, Zone industrielle..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    placeholder="Abidjan, Dakar, Lomé..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pays
                  </label>
                  <input
                    type="text"
                    placeholder="Côte d'Ivoire, Sénégal..."
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs sm:text-sm border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                  />
                </div>
              </div>

              {/* N° IFU / RCCM */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Numéro IFU / RCCM (Mention légale)
                </label>
                <input
                  type="text"
                  placeholder="Ex: CI-ABJ-2023-B-12345"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full px-3 py-2 font-mono bg-gray-50/90 focus:bg-white text-xs border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Notes internes
                </label>
                <textarea
                  rows={2}
                  placeholder="Conditions particulières de paiement, contact clé..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50/90 focus:bg-white text-xs border border-gray-200/90 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
                />
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-[8px] text-xs font-semibold transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all cursor-pointer"
                >
                  {editingClient ? "Enregistrer les modifications" : "Créer le client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale de Confirmation de Suppression Client */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Supprimer ce client ?
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Cette action retirera le client de votre carnet d&apos;adresses. Les factures existantes conserveront leurs coordonnées historiques.
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
