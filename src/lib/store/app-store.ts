"use client";

import { useEffect, useState, useCallback } from "react";
import { Invoice } from "@/lib/data/mock/invoices";
import { Client } from "@/lib/data/mock/clients";
import { InvoiceStatus } from "@/lib/constants";
import { supabase } from "@/lib/supabase/client";
import * as invoicesService from "@/lib/services/invoices.service";
import * as clientsService from "@/lib/services/clients.service";
import * as companyService from "@/lib/services/company.service";
import { CompanyProfile, DEFAULT_COMPANY_PROFILE } from "@/lib/services/company.service";

// =======================================================
// Singleton Realtime Listener (Global across all components)
// =======================================================
let globalRealtimeInitialized = false;

function initGlobalRealtime() {
  if (typeof window === "undefined" || globalRealtimeInitialized) return;
  globalRealtimeInitialized = true;

  try {
    supabase
      .channel("ciskofacture-global-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "invoices" },
        () => {
          window.dispatchEvent(new Event("ciskofacture_invoices_updated"));
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "invoice_items" },
        () => {
          window.dispatchEvent(new Event("ciskofacture_invoices_updated"));
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clients" },
        () => {
          window.dispatchEvent(new Event("ciskofacture_clients_updated"));
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "company_profiles" },
        () => {
          window.dispatchEvent(new Event("ciskofacture_company_updated"));
        }
      )
      .subscribe();
  } catch (err) {
    console.error("Global realtime init error:", err);
  }
}

// ==========================================
// 1. Hook useInvoices (100% Full-Stack Supabase)
// ==========================================
export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const loadFromSupabase = useCallback(async () => {
    try {
      const data = await invoicesService.fetchInvoices();
      setInvoices(data || []);
    } catch (e) {
      console.error("useInvoices load error:", e);
      setInvoices([]);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    initGlobalRealtime();
    loadFromSupabase();

    const handleSync = () => {
      loadFromSupabase();
    };

    window.addEventListener("ciskofacture_invoices_updated", handleSync);
    return () => {
      window.removeEventListener("ciskofacture_invoices_updated", handleSync);
    };
  }, [loadFromSupabase]);

  const addInvoice = async (newInv: Omit<Invoice, "id" | "createdAt" | "updatedAt">): Promise<Invoice> => {
    const tempId = `temp-${Date.now()}`;
    const optimisticInvoice: Invoice = {
      ...newInv,
      id: tempId,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    // Mise à jour optimiste immédiate (0ms de latence perçue)
    setInvoices((prev) => [optimisticInvoice, ...prev]);

    // Persistance Supabase
    const created = await invoicesService.createInvoice(newInv);
    if (created) {
      setInvoices((prev) => prev.map((inv) => (inv.id === tempId ? created : inv)));
      window.dispatchEvent(new Event("ciskofacture_invoices_updated"));
      window.dispatchEvent(new Event("ciskofacture_clients_updated"));
      return created;
    }
    return optimisticInvoice;
  };

  const updateInvoice = async (id: string, updates: Partial<Invoice>): Promise<Invoice | null> => {
    // Mise à jour optimiste
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, ...updates, updatedAt: new Date().toISOString().split("T")[0] } : inv))
    );

    const updated = await invoicesService.updateInvoice(id, updates);
    if (updated) {
      window.dispatchEvent(new Event("ciskofacture_invoices_updated"));
      window.dispatchEvent(new Event("ciskofacture_clients_updated"));
    }
    return updated;
  };

  const updateInvoiceStatus = async (id: string, status: InvoiceStatus): Promise<boolean> => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status, updatedAt: new Date().toISOString().split("T")[0] } : inv))
    );

    const ok = await invoicesService.updateInvoiceStatus(id, status);
    if (ok) {
      window.dispatchEvent(new Event("ciskofacture_invoices_updated"));
    }
    return ok;
  };

  const deleteInvoice = async (id: string): Promise<boolean> => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    const ok = await invoicesService.deleteInvoice(id);
    if (ok) {
      window.dispatchEvent(new Event("ciskofacture_invoices_updated"));
      window.dispatchEvent(new Event("ciskofacture_clients_updated"));
    }
    return ok;
  };

  return {
    invoices,
    loading,
    loaded,
    addInvoice,
    updateInvoice,
    updateInvoiceStatus,
    deleteInvoice,
    refreshInvoices: loadFromSupabase,
  };
}

// ==========================================
// 2. Hook useClients (100% Full-Stack Supabase)
// ==========================================
export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const loadFromSupabase = useCallback(async () => {
    try {
      const data = await clientsService.fetchClients();
      setClients(data || []);
    } catch (e) {
      console.error("useClients load error:", e);
      setClients([]);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    initGlobalRealtime();
    loadFromSupabase();

    const handleSync = () => {
      loadFromSupabase();
    };

    window.addEventListener("ciskofacture_clients_updated", handleSync);
    return () => {
      window.removeEventListener("ciskofacture_clients_updated", handleSync);
    };
  }, [loadFromSupabase]);

  const addClient = async (newCli: Omit<Client, "id" | "createdAt" | "totalBilled" | "invoicesCount" | "avatarInitials" | "avatarBg">): Promise<Client | null> => {
    const tempId = `temp-cli-${Date.now()}`;
    const words = newCli.name.trim().split(" ");
    const initials = words.length >= 2 ? `${words[0][0]}${words[1][0]}`.toUpperCase() : newCli.name.slice(0, 2).toUpperCase();

    const optimisticClient: Client = {
      ...newCli,
      id: tempId,
      avatarInitials: initials || "CL",
      avatarBg: "bg-brand-50 text-brand-700",
      totalBilled: 0,
      invoicesCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setClients((prev) => [optimisticClient, ...prev]);

    const created = await clientsService.createClient(newCli);
    if (created) {
      setClients((prev) => prev.map((c) => (c.id === tempId ? created : c)));
      window.dispatchEvent(new Event("ciskofacture_clients_updated"));
      return created;
    }
    return optimisticClient;
  };

  const updateClient = async (id: string, updates: Partial<Client>): Promise<Client | null> => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));

    const updated = await clientsService.updateClient(id, updates);
    if (updated) {
      window.dispatchEvent(new Event("ciskofacture_clients_updated"));
    }
    return updated;
  };

  const deleteClient = async (id: string): Promise<boolean> => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    const ok = await clientsService.deleteClient(id);
    if (ok) {
      window.dispatchEvent(new Event("ciskofacture_clients_updated"));
    }
    return ok;
  };

  return {
    clients,
    loading,
    loaded,
    addClient,
    updateClient,
    deleteClient,
    refreshClients: loadFromSupabase,
  };
}

// ==========================================
// 3. Hook useCompanyProfile (Full-Stack Supabase)
// ==========================================
export function useCompanyProfile() {
  const [profile, setProfile] = useState<CompanyProfile>(DEFAULT_COMPANY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const loadFromSupabase = useCallback(async () => {
    try {
      const data = await companyService.fetchCompanyProfile();
      if (data) {
        setProfile(data);
      }
    } catch (e) {
      console.error("useCompanyProfile load error:", e);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    initGlobalRealtime();
    loadFromSupabase();

    const handleSync = () => {
      loadFromSupabase();
    };

    window.addEventListener("ciskofacture_company_updated", handleSync);
    return () => {
      window.removeEventListener("ciskofacture_company_updated", handleSync);
    };
  }, [loadFromSupabase]);

  const updateProfile = async (updates: Partial<CompanyProfile>): Promise<CompanyProfile | null> => {
    setProfile((prev) => ({ ...prev, ...updates }));
    const saved = await companyService.updateCompanyProfile(updates);
    if (saved) {
      setProfile(saved);
      window.dispatchEvent(new Event("ciskofacture_company_updated"));
    }
    return saved;
  };

  return {
    profile,
    loading,
    loaded,
    updateProfile,
    saveProfile: updateProfile,
    refreshProfile: loadFromSupabase,
  };
}
