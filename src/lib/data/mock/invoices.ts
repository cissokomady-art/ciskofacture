import { InvoiceStatus } from "@/lib/constants";
import { INITIAL_CLIENTS, Client } from "./clients";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number; // En FCFA
  vatRate: number; // 18% par défaut
  lineSubtotal: number;
  lineVat: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  clientId: string;
  client: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city: string;
    country: string;
    taxId?: string;
    avatarInitials?: string;
    avatarBg?: string;
  };
  issuer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    taxId: string;
    bankName: string;
    ibanRib: string;
  };
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  currency: string; // "XOF"
  vatRateDefault: number; // 18%
  items: InvoiceItem[];
  subtotal: number; // Somme des lineSubtotal
  discountEnabled: boolean;
  discountLabel?: string;
  discountAmount: number; // Montant en FCFA
  vatAmount: number; // Montant total TVA
  totalAmount: number; // Total TTC en FCFA
  notes?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Calcul pur des totaux financiers d'une facture en FCFA
 */
export function calculateInvoiceTotals(
  items: Array<{ quantity: number; unitPrice: number; vatRate?: number }>,
  discountAmount: number = 0
): {
  calculatedItems: InvoiceItem[];
  subtotal: number;
  discountAmount: number;
  vatAmount: number;
  totalAmount: number;
} {
  let subtotal = 0;
  let vatAmount = 0;

  const calculatedItems: InvoiceItem[] = items.map((item, index) => {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const price = Math.max(0, Math.round(Number(item.unitPrice) || 0));
    const rate = item.vatRate !== undefined ? Number(item.vatRate) : 18;

    const lineSubtotal = Math.round(qty * price);
    const lineVat = Math.round((lineSubtotal * rate) / 100);
    const lineTotal = lineSubtotal + lineVat;

    subtotal += lineSubtotal;
    vatAmount += lineVat;

    return {
      id: `item-${index + 1}`,
      description: (item as any).description || `Prestation #${index + 1}`,
      quantity: qty,
      unitPrice: price,
      vatRate: rate,
      lineSubtotal,
      lineVat,
      lineTotal,
    };
  });

  const cleanDiscount = Math.min(subtotal, Math.max(0, Math.round(Number(discountAmount) || 0)));
  const totalAmount = Math.max(0, subtotal - cleanDiscount + vatAmount);

  return {
    calculatedItems,
    subtotal,
    discountAmount: cleanDiscount,
    vatAmount,
    totalAmount,
  };
}

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: "inv-0028",
    invoiceNumber: "FAC-2026-0028",
    status: "paid",
    clientId: "cli-1",
    client: {
      name: "Groupe SOTICI SA",
      email: "comptabilite@sotici.ci",
      phone: "+225 27 21 75 00 00",
      address: "Zone Industrielle de Yopougon",
      city: "Abidjan",
      country: "Côte d'Ivoire",
      taxId: "CI-ABJ-1988-B-12940",
      avatarInitials: "GS",
      avatarBg: "bg-emerald-100 text-emerald-800",
    },
    issuer: {
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
    issueDate: "2026-02-18",
    dueDate: "2026-03-20",
    currency: "XOF",
    vatRateDefault: 18,
    items: [
      {
        id: "item-1",
        description: "Développement et intégration du portail client sécurisé",
        quantity: 1,
        unitPrice: 2000000,
        vatRate: 18,
        lineSubtotal: 2000000,
        lineVat: 360000,
        lineTotal: 2360000,
      },
      {
        id: "item-2",
        description: "Audit d'architecture cloud et durcissement des API",
        quantity: 1,
        unitPrice: 923729,
        vatRate: 18,
        lineSubtotal: 923729,
        lineVat: 166271,
        lineTotal: 1090000,
      },
    ],
    subtotal: 2923729,
    discountEnabled: false,
    discountAmount: 0,
    vatAmount: 526271,
    totalAmount: 3450000,
    notes: "Facture réglée par virement bancaire le 18/02/2026. Merci pour votre confiance.",
    paymentMethod: "Virement bancaire UEMOA",
    createdAt: "2026-02-18",
    updatedAt: "2026-02-18",
  },
  {
    id: "inv-0027",
    invoiceNumber: "FAC-2026-0027",
    status: "sent",
    clientId: "cli-2",
    client: {
      name: "Dakar Digital Services SARL",
      email: "finance@dakardigital.sn",
      phone: "+221 33 869 40 40",
      address: "Rue 10 x Boulevard de la République",
      city: "Dakar",
      country: "Sénégal",
      taxId: "SN-DKR-2021-B-4921",
      avatarInitials: "DD",
      avatarBg: "bg-blue-100 text-blue-800",
    },
    issuer: {
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
    issueDate: "2026-02-15",
    dueDate: "2026-03-17",
    currency: "XOF",
    vatRateDefault: 18,
    items: [
      {
        id: "item-1",
        description: "Conception graphique UI/UX du système SaaS (Figma)",
        quantity: 1,
        unitPrice: 1200000,
        vatRate: 18,
        lineSubtotal: 1200000,
        lineVat: 216000,
        lineTotal: 1416000,
      },
      {
        id: "item-2",
        description: "Accompagnement sprint technique et review de code (2 jours)",
        quantity: 2,
        unitPrice: 183898,
        vatRate: 18,
        lineSubtotal: 367797,
        lineVat: 66203,
        lineTotal: 434000,
      },
    ],
    subtotal: 1567797,
    discountEnabled: false,
    discountAmount: 0,
    vatAmount: 282203,
    totalAmount: 1850000,
    notes: "Paiement attendu sous 30 jours à réception de facture.",
    paymentMethod: "Virement bancaire UEMOA",
    createdAt: "2026-02-15",
    updatedAt: "2026-02-15",
  },
  {
    id: "inv-0026",
    invoiceNumber: "FAC-2026-0026",
    status: "paid",
    clientId: "cli-3",
    client: {
      name: "Baobab FinTech Group",
      email: "accounts@baobabtech.africa",
      phone: "+225 07 08 09 10 11",
      address: "Immeuble Trade Center, Plateau",
      city: "Abidjan Plateau",
      country: "Côte d'Ivoire",
      taxId: "CI-ABJ-2022-M-8834",
      avatarInitials: "BF",
      avatarBg: "bg-purple-100 text-purple-800",
    },
    issuer: {
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
    issueDate: "2026-02-10",
    dueDate: "2026-03-12",
    currency: "XOF",
    vatRateDefault: 18,
    items: [
      {
        id: "item-1",
        description: "Mise en place de la passerelle de réconciliation financière",
        quantity: 1,
        unitPrice: 3559322,
        vatRate: 18,
        lineSubtotal: 3559322,
        lineVat: 640678,
        lineTotal: 4200000,
      },
    ],
    subtotal: 3559322,
    discountEnabled: false,
    discountAmount: 0,
    vatAmount: 640678,
    totalAmount: 4200000,
    notes: "Règlement complet reçu le 14/02/2026. Facture acquittée.",
    paymentMethod: "Virement bancaire UEMOA",
    createdAt: "2026-02-10",
    updatedAt: "2026-02-14",
  },
  {
    id: "inv-0025",
    invoiceNumber: "FAC-2026-0025",
    status: "overdue",
    clientId: "cli-4",
    client: {
      name: "OmniLogistics Ouest",
      email: "facturation@omnilog.tg",
      phone: "+228 22 21 35 40",
      address: "Zone Portuaire, Boulevard Circulaire",
      city: "Lomé",
      country: "Togo",
      taxId: "TG-LOM-2019-B-3310",
      avatarInitials: "OL",
      avatarBg: "bg-rose-100 text-rose-800",
    },
    issuer: {
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
    issueDate: "2026-01-14",
    dueDate: "2026-02-14",
    currency: "XOF",
    vatRateDefault: 18,
    items: [
      {
        id: "item-1",
        description: "Maintenance évolutive trimestrielle et support niveau 2",
        quantity: 1,
        unitPrice: 720339,
        vatRate: 18,
        lineSubtotal: 720339,
        lineVat: 129661,
        lineTotal: 850000,
      },
    ],
    subtotal: 720339,
    discountEnabled: false,
    discountAmount: 0,
    vatAmount: 129661,
    totalAmount: 850000,
    notes: "Échéance dépassée de plus de 7 jours. Relance amiable en cours.",
    paymentMethod: "Virement bancaire UEMOA",
    createdAt: "2026-01-14",
    updatedAt: "2026-01-14",
  },
  {
    id: "inv-0024",
    invoiceNumber: "FAC-2026-0024",
    status: "sent",
    clientId: "cli-5",
    client: {
      name: "Cacao & Négoce Ivoire",
      email: "contact@cacao-negoce.ci",
      phone: "+225 27 34 71 12 00",
      address: "Avenue Félix Houphouët-Boigny",
      city: "San Pedro",
      country: "Côte d'Ivoire",
      taxId: "CI-SAP-2015-B-1142",
      avatarInitials: "CN",
      avatarBg: "bg-amber-100 text-amber-800",
    },
    issuer: {
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
    issueDate: "2026-02-05",
    dueDate: "2026-03-07",
    currency: "XOF",
    vatRateDefault: 18,
    items: [
      {
        id: "item-1",
        description: "Intégration du système de traçabilité des lots d'exportation",
        quantity: 1,
        unitPrice: 1991525,
        vatRate: 18,
        lineSubtotal: 1991525,
        lineVat: 358475,
        lineTotal: 2350000,
      },
    ],
    subtotal: 1991525,
    discountEnabled: false,
    discountAmount: 0,
    vatAmount: 358475,
    totalAmount: 2350000,
    notes: "Facture transmise à la direction financière.",
    paymentMethod: "Virement bancaire UEMOA",
    createdAt: "2026-02-05",
    updatedAt: "2026-02-05",
  },
  {
    id: "inv-0023",
    invoiceNumber: "FAC-2026-0023",
    status: "draft",
    clientId: "cli-6",
    client: {
      name: "Nexus Conseil & Stratégie",
      email: "direction@nexus-conseil.sn",
      phone: "+221 77 654 32 10",
      address: "Route des Almadies",
      city: "Dakar Almadies",
      country: "Sénégal",
      taxId: "SN-DKR-2023-B-9912",
      avatarInitials: "NC",
      avatarBg: "bg-indigo-100 text-indigo-800",
    },
    issuer: {
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
    issueDate: "2026-02-20",
    dueDate: "2026-03-22",
    currency: "XOF",
    vatRateDefault: 18,
    items: [
      {
        id: "item-1",
        description: "Étude préalable et cadrage stratégique de la transformation digitale",
        quantity: 1,
        unitPrice: 805085,
        vatRate: 18,
        lineSubtotal: 805085,
        lineVat: 144915,
        lineTotal: 950000,
      },
    ],
    subtotal: 805085,
    discountEnabled: false,
    discountAmount: 0,
    vatAmount: 144915,
    totalAmount: 950000,
    notes: "Brouillon en attente de validation des livrables.",
    paymentMethod: "Virement bancaire UEMOA",
    createdAt: "2026-02-20",
    updatedAt: "2026-02-20",
  },
];
