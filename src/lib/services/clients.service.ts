import { supabase } from "@/lib/supabase/client";
import { Client } from "@/lib/data/mock/clients";

export async function fetchClients(): Promise<Client[]> {
  try {
    const { data: dbClients, error } = await supabase
      .from("clients")
      .select(`
        id,
        name,
        email,
        phone,
        address,
        city,
        country,
        tax_id,
        notes,
        avatar_initials,
        avatar_bg,
        created_at,
        invoices (
          id,
          total_amount,
          status
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("fetchClients error:", error);
      return [];
    }

    if (!dbClients || dbClients.length === 0) {
      return [];
    }

    return dbClients.map((row: any) => {
      const invs = Array.isArray(row.invoices) ? row.invoices : [];
      const totalBilled = invs.reduce((acc: number, inv: any) => acc + (Number(inv.total_amount) || 0), 0);
      const invoicesCount = invs.length;

      return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        address: row.address,
        city: row.city,
        country: row.country,
        taxId: row.tax_id || undefined,
        notes: row.notes || undefined,
        avatarInitials: row.avatar_initials || row.name.slice(0, 2).toUpperCase(),
        avatarBg: row.avatar_bg || "bg-brand-50 text-brand-700",
        totalBilled,
        invoicesCount,
        createdAt: row.created_at ? row.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
      };
    });
  } catch (err) {
    console.error("fetchClients exception:", err);
    return [];
  }
}

export async function searchClients(query: string): Promise<Client[]> {
  if (!query || query.trim() === "") {
    return fetchClients();
  }

  try {
    const cleanQuery = query.trim();
    const { data: dbClients, error } = await supabase
      .from("clients")
      .select(`
        id,
        name,
        email,
        phone,
        address,
        city,
        country,
        tax_id,
        notes,
        avatar_initials,
        avatar_bg,
        created_at,
        invoices (
          id,
          total_amount,
          status
        )
      `)
      .or(`name.ilike.%${cleanQuery}%,email.ilike.%${cleanQuery}%,city.ilike.%${cleanQuery}%,phone.ilike.%${cleanQuery}%`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("searchClients error:", error);
      return [];
    }

    if (!dbClients || dbClients.length === 0) {
      return [];
    }

    return dbClients.map((row: any) => {
      const invs = Array.isArray(row.invoices) ? row.invoices : [];
      const totalBilled = invs.reduce((acc: number, inv: any) => acc + (Number(inv.total_amount) || 0), 0);
      const invoicesCount = invs.length;

      return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        address: row.address,
        city: row.city,
        country: row.country,
        taxId: row.tax_id || undefined,
        notes: row.notes || undefined,
        avatarInitials: row.avatar_initials || row.name.slice(0, 2).toUpperCase(),
        avatarBg: row.avatar_bg || "bg-brand-50 text-brand-700",
        totalBilled,
        invoicesCount,
        createdAt: row.created_at ? row.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
      };
    });
  } catch (err) {
    console.error("searchClients exception:", err);
    return [];
  }
}

export async function createClient(client: Omit<Client, "id" | "createdAt" | "totalBilled" | "invoicesCount" | "avatarInitials" | "avatarBg">): Promise<Client | null> {
  try {
    const words = client.name.trim().split(" ");
    const initials = words.length >= 2
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : client.name.slice(0, 2).toUpperCase();

    const payload = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      city: client.city || "Dakar",
      country: client.country || "Sénégal",
      tax_id: client.taxId || null,
      notes: client.notes || null,
      avatar_initials: initials || "CL",
      avatar_bg: "bg-brand-50 text-brand-700",
    };

    const { data, error } = await supabase
      .from("clients")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      country: data.country,
      taxId: data.tax_id || undefined,
      notes: data.notes || undefined,
      avatarInitials: data.avatar_initials,
      avatarBg: data.avatar_bg,
      totalBilled: 0,
      invoicesCount: 0,
      createdAt: data.created_at ? data.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
    };
  } catch (err) {
    console.error("createClient error:", err);
    return null;
  }
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
  try {
    const payload: any = {
      updated_at: new Date().toISOString(),
    };
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.email !== undefined) payload.email = updates.email;
    if (updates.phone !== undefined) payload.phone = updates.phone;
    if (updates.address !== undefined) payload.address = updates.address;
    if (updates.city !== undefined) payload.city = updates.city;
    if (updates.country !== undefined) payload.country = updates.country;
    if (updates.taxId !== undefined) payload.tax_id = updates.taxId;
    if (updates.notes !== undefined) payload.notes = updates.notes;

    const { data, error } = await supabase
      .from("clients")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      country: data.country,
      taxId: data.tax_id || undefined,
      notes: data.notes || undefined,
      avatarInitials: data.avatar_initials,
      avatarBg: data.avatar_bg,
      totalBilled: updates.totalBilled || 0,
      invoicesCount: updates.invoicesCount || 0,
      createdAt: data.created_at ? data.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
    };
  } catch (err) {
    console.error("updateClient error:", err);
    return null;
  }
}

export async function deleteClient(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("deleteClient error:", err);
    return false;
  }
}
