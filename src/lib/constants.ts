export type InvoiceStatus = 'paid' | 'sent' | 'draft' | 'overdue';

export interface StatusConfig {
  label: string;
  badgeClass: string;
  dotClass: string;
  iconName?: string;
}

export const INVOICE_STATUS_CONFIG: Record<InvoiceStatus, StatusConfig> = {
  paid: {
    label: "Payée",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100/60",
    dotClass: "bg-emerald-500",
  },
  sent: {
    label: "Envoyée",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-100/60",
    dotClass: "bg-amber-500",
  },
  draft: {
    label: "Brouillon",
    badgeClass: "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100/60",
    dotClass: "bg-slate-400",
  },
  overdue: {
    label: "En retard",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80 hover:bg-rose-100/60",
    dotClass: "bg-rose-500",
  },
};

export const DEFAULT_VAT_RATE = 18.0;
export const DEFAULT_CURRENCY = "XOF";
export const APP_NAME = "ciskofacture";
