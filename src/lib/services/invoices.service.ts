import { supabase } from "@/lib/supabase/client";
import { Invoice, InvoiceItem, calculateInvoiceTotals } from "@/lib/data/mock/invoices";
import { InvoiceStatus } from "@/lib/constants";

export async function fetchInvoices(): Promise<Invoice[]> {
  try {
    const { data: dbInvoices, error } = await supabase
      .from("invoices")
      .select(`
        id,
        invoice_number,
        status,
        client_id,
        client_snapshot,
        issuer_snapshot,
        issue_date,
        due_date,
        currency,
        vat_rate_default,
        subtotal,
        discount_enabled,
        discount_label,
        discount_amount,
        vat_amount,
        total_amount,
        notes,
        payment_method,
        created_at,
        updated_at,
        invoice_items (
          id,
          description,
          quantity,
          unit_price,
          vat_rate,
          total,
          sort_order
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("fetchInvoices error:", error);
      return [];
    }

    if (!dbInvoices || dbInvoices.length === 0) {
      return [];
    }

    return dbInvoices.map((row: any) => {
      const rawItems = Array.isArray(row.invoice_items) ? row.invoice_items : [];
      const sortedItems = rawItems.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

      const items: InvoiceItem[] = sortedItems.map((it: any) => {
        const qty = Number(it.quantity) || 1;
        const up = Number(it.unit_price) || 0;
        const vatRate = Number(it.vat_rate) || 18;
        const lineSubtotal = Math.round(qty * up);
        const lineVat = Math.round(lineSubtotal * (vatRate / 100));
        const lineTotal = lineSubtotal + lineVat;

        return {
          id: it.id,
          description: it.description || "",
          quantity: qty,
          unitPrice: up,
          vatRate,
          lineSubtotal,
          lineVat,
          lineTotal,
        };
      });

      return {
        id: row.id,
        invoiceNumber: row.invoice_number,
        status: row.status as InvoiceStatus,
        clientId: row.client_id || "",
        client: row.client_snapshot || {
          name: "Client",
          email: "",
          city: "Dakar",
          country: "Sénégal",
        },
        issuer: row.issuer_snapshot || {
          name: "Cisko Digital Ventures SARL",
          email: "mady.cissoko@ciskofacture.com",
          phone: "+221 76 643 67 67",
          address: "Parcelles Assainies, Unité 16",
          city: "Dakar",
          country: "Sénégal",
          taxId: "SN-DKR-2024-B-99820",
          bankName: "Société Générale Sénégal (SGS)",
          ibanRib: "SN08 SN01 2010 0112 3456 7890 123",
        },
        issueDate: row.issue_date,
        dueDate: row.due_date,
        currency: row.currency || "XOF",
        vatRateDefault: Number(row.vat_rate_default) || 18,
        items,
        subtotal: Number(row.subtotal) || 0,
        discountEnabled: Boolean(row.discount_enabled),
        discountLabel: row.discount_label || "",
        discountAmount: Number(row.discount_amount) || 0,
        vatAmount: Number(row.vat_amount) || 0,
        totalAmount: Number(row.total_amount) || 0,
        notes: row.notes || "",
        paymentMethod: row.payment_method || "Virement bancaire UEMOA",
        createdAt: row.created_at ? row.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
        updatedAt: row.updated_at ? row.updated_at.split("T")[0] : new Date().toISOString().split("T")[0],
      };
    });
  } catch (err) {
    console.error("fetchInvoices exception:", err);
    return [];
  }
}

export async function searchInvoices(query: string): Promise<Invoice[]> {
  if (!query || query.trim() === "") {
    return fetchInvoices();
  }

  try {
    const cleanQuery = query.trim();
    const { data: dbInvoices, error } = await supabase
      .from("invoices")
      .select(`
        id,
        invoice_number,
        status,
        client_id,
        client_snapshot,
        issuer_snapshot,
        issue_date,
        due_date,
        currency,
        vat_rate_default,
        subtotal,
        discount_enabled,
        discount_label,
        discount_amount,
        vat_amount,
        total_amount,
        notes,
        payment_method,
        created_at,
        updated_at,
        invoice_items (
          id,
          description,
          quantity,
          unit_price,
          vat_rate,
          total,
          sort_order
        )
      `)
      .or(`invoice_number.ilike.%${cleanQuery}%,notes.ilike.%${cleanQuery}%`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("searchInvoices error:", error);
      return [];
    }

    if (!dbInvoices || dbInvoices.length === 0) {
      return [];
    }

    return dbInvoices.map((row: any) => {
      const rawItems = Array.isArray(row.invoice_items) ? row.invoice_items : [];
      const sortedItems = rawItems.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

      const items: InvoiceItem[] = sortedItems.map((it: any) => {
        const qty = Number(it.quantity) || 1;
        const up = Number(it.unit_price) || 0;
        const vatRate = Number(it.vat_rate) || 18;
        const lineSubtotal = Math.round(qty * up);
        const lineVat = Math.round(lineSubtotal * (vatRate / 100));
        const lineTotal = lineSubtotal + lineVat;

        return {
          id: it.id,
          description: it.description || "",
          quantity: qty,
          unitPrice: up,
          vatRate,
          lineSubtotal,
          lineVat,
          lineTotal,
        };
      });

      return {
        id: row.id,
        invoiceNumber: row.invoice_number,
        status: row.status as InvoiceStatus,
        clientId: row.client_id || "",
        client: row.client_snapshot || {
          name: "Client",
          email: "",
          city: "Dakar",
          country: "Sénégal",
        },
        issuer: row.issuer_snapshot || {
          name: "Cisko Digital Ventures SARL",
          email: "mady.cissoko@ciskofacture.com",
          phone: "+221 76 643 67 67",
          address: "Parcelles Assainies, Unité 16",
          city: "Dakar",
          country: "Sénégal",
          taxId: "SN-DKR-2024-B-99820",
          bankName: "Société Générale Sénégal (SGS)",
          ibanRib: "SN08 SN01 2010 0112 3456 7890 123",
        },
        issueDate: row.issue_date,
        dueDate: row.due_date,
        currency: row.currency || "XOF",
        vatRateDefault: Number(row.vat_rate_default) || 18,
        items,
        subtotal: Number(row.subtotal) || 0,
        discountEnabled: Boolean(row.discount_enabled),
        discountLabel: row.discount_label || "",
        discountAmount: Number(row.discount_amount) || 0,
        vatAmount: Number(row.vat_amount) || 0,
        totalAmount: Number(row.total_amount) || 0,
        notes: row.notes || "",
        paymentMethod: row.payment_method || "Virement bancaire UEMOA",
        createdAt: row.created_at ? row.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
        updatedAt: row.updated_at ? row.updated_at.split("T")[0] : new Date().toISOString().split("T")[0],
      };
    });
  } catch (err) {
    console.error("searchInvoices exception:", err);
    return [];
  }
}

export async function fetchInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const { data: row, error } = await supabase
      .from("invoices")
      .select(`
        id,
        invoice_number,
        status,
        client_id,
        client_snapshot,
        issuer_snapshot,
        issue_date,
        due_date,
        currency,
        vat_rate_default,
        subtotal,
        discount_enabled,
        discount_label,
        discount_amount,
        vat_amount,
        total_amount,
        notes,
        payment_method,
        created_at,
        updated_at,
        invoice_items (
          id,
          description,
          quantity,
          unit_price,
          vat_rate,
          total,
          sort_order
        )
      `)
      .eq("id", id)
      .single();

    if (error || !row) {
      console.error("fetchInvoiceById error:", error);
      return null;
    }

    const rawItems = Array.isArray(row.invoice_items) ? row.invoice_items : [];
    const sortedItems = rawItems.sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

    const items: InvoiceItem[] = sortedItems.map((it: any) => {
      const qty = Number(it.quantity) || 1;
      const up = Number(it.unit_price) || 0;
      const vatRate = Number(it.vat_rate) || 18;
      const lineSubtotal = Math.round(qty * up);
      const lineVat = Math.round(lineSubtotal * (vatRate / 100));
      const lineTotal = lineSubtotal + lineVat;

      return {
        id: it.id,
        description: it.description || "",
        quantity: qty,
        unitPrice: up,
        vatRate,
        lineSubtotal,
        lineVat,
        lineTotal,
      };
    });

    return {
      id: row.id,
      invoiceNumber: row.invoice_number,
      status: row.status as InvoiceStatus,
      clientId: row.client_id || "",
      client: row.client_snapshot || {
        name: "Client",
        email: "",
        city: "Dakar",
        country: "Sénégal",
      },
      issuer: row.issuer_snapshot || {
        name: "Cisko Digital Ventures SARL",
        email: "mady.cissoko@ciskofacture.com",
        phone: "+221 76 643 67 67",
        address: "Parcelles Assainies, Unité 16",
        city: "Dakar",
        country: "Sénégal",
        taxId: "SN-DKR-2024-B-99820",
        bankName: "Société Générale Sénégal (SGS)",
        ibanRib: "SN08 SN01 2010 0112 3456 7890 123",
      },
      issueDate: row.issue_date,
      dueDate: row.due_date,
      currency: row.currency || "XOF",
      vatRateDefault: Number(row.vat_rate_default) || 18,
      items,
      subtotal: Number(row.subtotal) || 0,
      discountEnabled: Boolean(row.discount_enabled),
      discountLabel: row.discount_label || "",
      discountAmount: Number(row.discount_amount) || 0,
      vatAmount: Number(row.vat_amount) || 0,
      totalAmount: Number(row.total_amount) || 0,
      notes: row.notes || "",
      paymentMethod: row.payment_method || "Virement bancaire UEMOA",
      createdAt: row.created_at ? row.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
      updatedAt: row.updated_at ? row.updated_at.split("T")[0] : new Date().toISOString().split("T")[0],
    };
  } catch (err) {
    console.error("fetchInvoiceById exception:", err);
    return null;
  }
}

export async function createInvoice(invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">): Promise<Invoice | null> {
  try {
    const discount = invoice.discountEnabled ? (invoice.discountAmount || 0) : 0;
    const totals = calculateInvoiceTotals(invoice.items, discount);

    const invoicePayload = {
      invoice_number: invoice.invoiceNumber,
      status: invoice.status || "draft",
      client_id: invoice.clientId || null,
      client_snapshot: invoice.client,
      issuer_snapshot: invoice.issuer,
      issue_date: invoice.issueDate,
      due_date: invoice.dueDate,
      currency: invoice.currency || "XOF",
      vat_rate_default: invoice.vatRateDefault || 18,
      subtotal: totals.subtotal,
      discount_enabled: invoice.discountEnabled,
      discount_label: invoice.discountLabel || "Remise commerciale",
      discount_amount: totals.discountAmount,
      vat_amount: totals.vatAmount,
      total_amount: totals.totalAmount,
      notes: invoice.notes || null,
      payment_method: invoice.paymentMethod || "Virement bancaire UEMOA",
    };

    const { data: createdInv, error: invError } = await supabase
      .from("invoices")
      .insert(invoicePayload)
      .select()
      .single();

    if (invError) throw invError;

    // Inserer les articles de facture
    if (invoice.items && invoice.items.length > 0) {
      const itemsPayload = invoice.items.map((item, idx) => ({
        invoice_id: createdInv.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        vat_rate: item.vatRate,
        total: item.lineTotal,
        sort_order: idx,
      }));

      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsPayload);

      if (itemsError) {
        console.error("invoice_items insert error:", itemsError);
      }
    }

    return fetchInvoiceById(createdInv.id);
  } catch (err) {
    console.error("createInvoice error:", err);
    return null;
  }
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
  try {
    const payload: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.issueDate !== undefined) payload.issue_date = updates.issueDate;
    if (updates.dueDate !== undefined) payload.due_date = updates.dueDate;
    if (updates.notes !== undefined) payload.notes = updates.notes;
    if (updates.client !== undefined) payload.client_snapshot = updates.client;
    if (updates.issuer !== undefined) payload.issuer_snapshot = updates.issuer;
    if (updates.paymentMethod !== undefined) payload.payment_method = updates.paymentMethod;
    if (updates.discountEnabled !== undefined) payload.discount_enabled = updates.discountEnabled;
    if (updates.discountLabel !== undefined) payload.discount_label = updates.discountLabel;
    if (updates.discountAmount !== undefined) payload.discount_amount = updates.discountAmount;

    if (updates.items !== undefined) {
      const discount = (updates.discountEnabled ?? false) ? (updates.discountAmount || 0) : 0;
      const totals = calculateInvoiceTotals(
        updates.items,
        discount
      );
      payload.subtotal = totals.subtotal;
      payload.vat_amount = totals.vatAmount;
      payload.total_amount = totals.totalAmount;
    }

    const { data: updatedInv, error } = await supabase
      .from("invoices")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    if (updates.items !== undefined) {
      await supabase.from("invoice_items").delete().eq("invoice_id", id);
      const itemsPayload = updates.items.map((item, idx) => ({
        invoice_id: id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        vat_rate: item.vatRate,
        total: item.lineTotal,
        sort_order: idx,
      }));
      await supabase.from("invoice_items").insert(itemsPayload);
    }

    return fetchInvoiceById(id);
  } catch (err) {
    console.error("updateInvoice error:", err);
    return null;
  }
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("invoices")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("updateInvoiceStatus error:", err);
    return false;
  }
}

export async function deleteInvoice(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("deleteInvoice error:", err);
    return false;
  }
}
