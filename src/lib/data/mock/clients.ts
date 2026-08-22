export interface Client {
  id: string;
  name: string;
  legalName?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId?: string; // N° IFU / RCCM
  avatarInitials: string;
  avatarBg: string;
  totalBilled: number;
  invoicesCount: number;
  notes?: string;
  createdAt: string;
}

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "cli-1",
    name: "Groupe SOTICI SA",
    legalName: "Société de Transformation Industrielle en Côte d'Ivoire",
    email: "comptabilite@sotici.ci",
    phone: "+225 27 21 75 00 00",
    address: "Zone Industrielle de Yopougon, Boulevard de Vridi",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    taxId: "CI-ABJ-1988-B-12940",
    avatarInitials: "GS",
    avatarBg: "bg-emerald-100 text-emerald-800",
    totalBilled: 3450000,
    invoicesCount: 1,
    notes: "Grand compte industriel. Règlement par virement bancaire sous 30 jours.",
    createdAt: "2026-01-10",
  },
  {
    id: "cli-2",
    name: "Dakar Digital Services SARL",
    legalName: "Dakar Digital Services SARL",
    email: "finance@dakardigital.sn",
    phone: "+221 33 869 40 40",
    address: "Rue 10 x Boulevard de la République, Plateau",
    city: "Dakar",
    country: "Sénégal",
    taxId: "SN-DKR-2021-B-4921",
    avatarInitials: "DD",
    avatarBg: "bg-blue-100 text-blue-800",
    totalBilled: 1850000,
    invoicesCount: 1,
    notes: "Agence digitale et communication web.",
    createdAt: "2026-01-15",
  },
  {
    id: "cli-3",
    name: "Baobab FinTech Group",
    legalName: "Baobab Financial Technologies West Africa",
    email: "accounts@baobabtech.africa",
    phone: "+225 07 08 09 10 11",
    address: "Immeuble Trade Center, 5ème étage, Plateau",
    city: "Abidjan Plateau",
    country: "Côte d'Ivoire",
    taxId: "CI-ABJ-2022-M-8834",
    avatarInitials: "BF",
    avatarBg: "bg-purple-100 text-purple-800",
    totalBilled: 4200000,
    invoicesCount: 1,
    notes: "Paiement toujours ponctuel.",
    createdAt: "2026-01-20",
  },
  {
    id: "cli-4",
    name: "OmniLogistics Ouest",
    legalName: "OmniLogistics Togo SA",
    email: "facturation@omnilog.tg",
    phone: "+228 22 21 35 40",
    address: "Zone Portuaire, Boulevard Circulaire",
    city: "Lomé",
    country: "Togo",
    taxId: "TG-LOM-2019-B-3310",
    avatarInitials: "OL",
    avatarBg: "bg-rose-100 text-rose-800",
    totalBilled: 850000,
    invoicesCount: 1,
    notes: "Retards fréquents — relancer systématiquement 5 jours avant l'échéance.",
    createdAt: "2026-01-05",
  },
  {
    id: "cli-5",
    name: "Cacao & Négoce Ivoire",
    legalName: "Cacao & Négoce International CI",
    email: "contact@cacao-negoce.ci",
    phone: "+225 27 34 71 12 00",
    address: "Avenue Félix Houphouët-Boigny, Zone Portuaire",
    city: "San Pedro",
    country: "Côte d'Ivoire",
    taxId: "CI-SAP-2015-B-1142",
    avatarInitials: "CN",
    avatarBg: "bg-amber-100 text-amber-800",
    totalBilled: 2350000,
    invoicesCount: 1,
    notes: "Exportateur de matières premières.",
    createdAt: "2026-02-01",
  },
  {
    id: "cli-6",
    name: "Nexus Conseil & Stratégie",
    legalName: "Nexus Strategy & Advisory SARL",
    email: "direction@nexus-conseil.sn",
    phone: "+221 77 654 32 10",
    address: "Route des Almadies, Immeuble Horizon",
    city: "Dakar Almadies",
    country: "Sénégal",
    taxId: "SN-DKR-2023-B-9912",
    avatarInitials: "NC",
    avatarBg: "bg-indigo-100 text-indigo-800",
    totalBilled: 950000,
    invoicesCount: 1,
    notes: "Cabinet de conseil en stratégie d'entreprise.",
    createdAt: "2026-02-12",
  },
];
