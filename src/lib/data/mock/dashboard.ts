import { InvoiceStatus } from "@/lib/constants";

export interface MockInvoice {
  id: string;
  invoiceNumber: string;
  client: {
    name: string;
    email: string;
    city: string;
    country: string;
    avatarBg?: string;
    avatarInitials?: string;
  };
  issueDate: string;
  dueDate: string;
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  notes?: string;
}

export interface MockKPI {
  id: string;
  title: string;
  amount: number;
  trendPercentage?: number;
  trendLabel?: string;
  isPositive?: boolean;
  subtitle: string;
  badge?: string;
  type: "revenue" | "pending" | "overdue" | "total";
}

export interface MockActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "payment" | "invoice_sent" | "client_added" | "overdue_alert";
  amount?: number;
}

export const MOCK_KPIS: MockKPI[] = [
  {
    id: "kpi-revenue",
    title: "Chiffre d'affaires encaissé",
    amount: 14850000,
    trendPercentage: 18.4,
    trendLabel: "vs mois dernier",
    isPositive: true,
    subtitle: "12 factures réglées ce mois",
    type: "revenue",
  },
  {
    id: "kpi-pending",
    title: "En attente de paiement",
    amount: 4200000,
    trendPercentage: 5.2,
    trendLabel: "4 factures",
    isPositive: false,
    subtitle: "Échéances d'ici 15 à 30 jours",
    type: "pending",
  },
  {
    id: "kpi-overdue",
    title: "Factures en retard",
    amount: 850000,
    trendPercentage: -12.0,
    trendLabel: "1 relance requise",
    isPositive: false,
    subtitle: "Dépassement d'échéance > 5j",
    type: "overdue",
  },
  {
    id: "kpi-total",
    title: "Total facturé ce mois",
    amount: 19900000,
    trendPercentage: 24.2,
    trendLabel: "+3.8M FCFA vs N-1",
    isPositive: true,
    subtitle: "17 factures créées au total",
    type: "total",
  },
];

export const MOCK_RECENT_INVOICES: MockInvoice[] = [
  {
    id: "inv-0028",
    invoiceNumber: "FAC-2026-0028",
    client: {
      name: "Groupe SOTICI SA",
      email: "comptabilite@sotici.ci",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      avatarBg: "bg-emerald-100 text-emerald-800",
      avatarInitials: "GS",
    },
    issueDate: "2026-02-18",
    dueDate: "2026-03-20",
    subtotal: 2923729,
    vatAmount: 526271,
    totalAmount: 3450000,
    status: "paid",
  },
  {
    id: "inv-0027",
    invoiceNumber: "FAC-2026-0027",
    client: {
      name: "Dakar Digital Services SARL",
      email: "finance@dakardigital.sn",
      city: "Dakar",
      country: "Sénégal",
      avatarBg: "bg-blue-100 text-blue-800",
      avatarInitials: "DD",
    },
    issueDate: "2026-02-15",
    dueDate: "2026-03-17",
    subtotal: 1567797,
    vatAmount: 282203,
    totalAmount: 1850000,
    status: "sent",
  },
  {
    id: "inv-0026",
    invoiceNumber: "FAC-2026-0026",
    client: {
      name: "Baobab FinTech Group",
      email: "accounts@baobabtech.africa",
      city: "Abidjan Plateau",
      country: "Côte d'Ivoire",
      avatarBg: "bg-purple-100 text-purple-800",
      avatarInitials: "BF",
    },
    issueDate: "2026-02-10",
    dueDate: "2026-03-12",
    subtotal: 3559322,
    vatAmount: 640678,
    totalAmount: 4200000,
    status: "paid",
  },
  {
    id: "inv-0025",
    invoiceNumber: "FAC-2026-0025",
    client: {
      name: "OmniLogistics Ouest",
      email: "facturation@omnilog.tg",
      city: "Lomé",
      country: "Togo",
      avatarBg: "bg-rose-100 text-rose-800",
      avatarInitials: "OL",
    },
    issueDate: "2026-01-14",
    dueDate: "2026-02-14",
    subtotal: 720339,
    vatAmount: 129661,
    totalAmount: 850000,
    status: "overdue",
  },
  {
    id: "inv-0024",
    invoiceNumber: "FAC-2026-0024",
    client: {
      name: "Cacao & Négoce Ivoire",
      email: "contact@cacao-negoce.ci",
      city: "San Pedro",
      country: "Côte d'Ivoire",
      avatarBg: "bg-amber-100 text-amber-800",
      avatarInitials: "CN",
    },
    issueDate: "2026-02-05",
    dueDate: "2026-03-07",
    subtotal: 1991525,
    vatAmount: 358475,
    totalAmount: 2350000,
    status: "sent",
  },
  {
    id: "inv-0023",
    invoiceNumber: "FAC-2026-0023",
    client: {
      name: "Nexus Conseil & Stratégie",
      email: "direction@nexus-conseil.sn",
      city: "Dakar Almadies",
      country: "Sénégal",
      avatarBg: "bg-indigo-100 text-indigo-800",
      avatarInitials: "NC",
    },
    issueDate: "2026-02-20",
    dueDate: "2026-03-22",
    subtotal: 805085,
    vatAmount: 144915,
    totalAmount: 950000,
    status: "draft",
  },
];

export const MOCK_RECENT_ACTIVITIES: MockActivity[] = [
  {
    id: "act-1",
    title: "Paiement reçu",
    description: "Groupe SOTICI SA a réglé la facture FAC-2026-0028",
    time: "Il y a 2 heures",
    type: "payment",
    amount: 3450000,
  },
  {
    id: "act-2",
    title: "Facture envoyée",
    description: "FAC-2026-0027 transmise à Dakar Digital Services",
    time: "Il y a 5 heures",
    type: "invoice_sent",
    amount: 1850000,
  },
  {
    id: "act-3",
    title: "Nouveau client enregistré",
    description: "Nexus Conseil & Stratégie ajouté à votre carnet",
    time: "Hier à 16:30",
    type: "client_added",
  },
  {
    id: "act-4",
    title: "Alerte échéance dépassée",
    description: "FAC-2026-0025 (OmniLogistics) en retard de 7 jours",
    time: "Il y a 2 jours",
    type: "overdue_alert",
    amount: 850000,
  },
];

export const MOCK_USER_PROFILE = {
  name: "Mady Cissoko",
  email: "mady.cissoko@ciskofacture.com",
  role: "Fondateur & Dirigeant",
  companyName: "Cisko Digital Ventures",
  avatarUrl: "",
  initials: "MC",
};
