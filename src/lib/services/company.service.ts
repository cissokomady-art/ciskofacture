import { supabase } from "@/lib/supabase/client";

export interface CompanyProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
  ninea?: string;
  bankName: string;
  ibanRib: string;
  swiftBic?: string;
  defaultVatRate?: number;
  invoicePrefix?: string;
  paymentTermsDays?: number;
  currency?: string;
}

export const DEFAULT_COMPANY_PROFILE: CompanyProfile = {
  name: "Cisko Digital Ventures SARL",
  email: "mady.cissoko@ciskofacture.com",
  phone: "+221 76 643 67 67",
  address: "Parcelles Assainies, Unité 16",
  city: "Dakar",
  country: "Sénégal",
  taxId: "SN-DKR-2024-B-99820",
  ninea: "008921345 2V3",
  bankName: "Société Générale Sénégal (SGS)",
  ibanRib: "SN08 SN01 2010 0112 3456 7890 123",
  swiftBic: "SGBSNKDA",
  defaultVatRate: 18,
  invoicePrefix: "FAC-2026-",
  paymentTermsDays: 30,
  currency: "XOF",
};

export async function fetchCompanyProfile(): Promise<CompanyProfile> {
  try {
    const { data, error } = await supabase
      .from("company_profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return DEFAULT_COMPANY_PROFILE;
    }

    return {
      id: data.id,
      name: data.name || DEFAULT_COMPANY_PROFILE.name,
      email: data.email || DEFAULT_COMPANY_PROFILE.email,
      phone: data.phone || DEFAULT_COMPANY_PROFILE.phone,
      address: data.address || DEFAULT_COMPANY_PROFILE.address,
      city: data.city || DEFAULT_COMPANY_PROFILE.city,
      country: data.country || DEFAULT_COMPANY_PROFILE.country,
      taxId: data.tax_id || DEFAULT_COMPANY_PROFILE.taxId,
      ninea: data.ninea || DEFAULT_COMPANY_PROFILE.ninea,
      bankName: data.bank_name || DEFAULT_COMPANY_PROFILE.bankName,
      ibanRib: data.iban_rib || DEFAULT_COMPANY_PROFILE.ibanRib,
      swiftBic: data.swift_bic || DEFAULT_COMPANY_PROFILE.swiftBic,
      defaultVatRate: Number(data.default_vat_rate) || 18,
      invoicePrefix: data.invoice_prefix || "FAC-2026-",
      paymentTermsDays: Number(data.payment_terms_days) || 30,
      currency: data.currency || "XOF",
    };
  } catch (err) {
    console.error("fetchCompanyProfile error:", err);
    return DEFAULT_COMPANY_PROFILE;
  }
}

export async function updateCompanyProfile(profile: Partial<CompanyProfile>): Promise<CompanyProfile> {
  try {
    const { data: existing } = await supabase
      .from("company_profiles")
      .select("id")
      .limit(1);

    const payload = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      city: profile.city,
      country: profile.country,
      tax_id: profile.taxId,
      ninea: profile.ninea,
      bank_name: profile.bankName,
      iban_rib: profile.ibanRib,
      swift_bic: profile.swiftBic,
      default_vat_rate: profile.defaultVatRate,
      invoice_prefix: profile.invoicePrefix,
      payment_terms_days: profile.paymentTermsDays,
      currency: profile.currency || "XOF",
      updated_at: new Date().toISOString(),
    };

    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from("company_profiles")
        .update(payload)
        .eq("id", existing[0].id)
        .select()
        .single();

      if (error) throw error;
      return await fetchCompanyProfile();
    } else {
      const { data, error } = await supabase
        .from("company_profiles")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      return await fetchCompanyProfile();
    }
  } catch (err) {
    console.error("updateCompanyProfile error:", err);
    return { ...DEFAULT_COMPANY_PROFILE, ...profile };
  }
}
