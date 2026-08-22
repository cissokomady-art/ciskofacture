# 🚀 ciskofacture

> **Logiciel SaaS moderne de facturation, devis et gestion financière conçu spécifiquement pour les entrepreneurs, indépendants, startups et PME de l'espace UEMOA (Sénégal, Côte d'Ivoire, Bénin, Togo, Mali, Burkina Faso, Niger, Guinée-Bissau).**

---

## 🌟 Fonctionnalités Principales

- **Conformité OHADA & Fiscalité UEMOA :** Respect strict des règles de facturation OHADA, TVA légale à 18%, mentions IFU / RCCM / NINEA et coordonnées bancaires UEMOA.
- **Monnaie Exclusive FCFA (XOF) :** Calculs précis en entiers, formatage monétaire avec espace insécable (`formatFCFA`).
- **Tableau de Bord Financier en Temps Réel :** 4 indicateurs KPIs (*Chiffre d'affaires, En attente de paiement, Montant encaissé, Factures en retard*) calculés dynamiquement depuis PostgreSQL.
- **Sélecteur de Période Style Notion :** Double sélection de dates (Date de départ / Date d'arrivée) et raccourcis en 1 clic avec recalcul instantané des statistiques.
- **Module Factures & Live Preview :** Formulaire de facturation multi-lignes réactif avec aperçu papier officiel en direct (*Split-Pane*) et export PDF.
- **Gestion des Clients :** Carnet d'adresses complet, recherche instantanée et suivi du chiffre d'affaires généré par client.
- **Authentification Supabase Auth :** Connexion, inscription entreprise, validation en direct des mots de passe et gestion sécurisée des sessions.
- **Synchronisation Temps Réel (Supabase Realtime) :** Mises à jour instantanées multi-onglets et multi-appareils via WebSocket.
- **Design System Ultra-Premium :** Palette Rouge Bordeaux (`#8B1538`), géométrie structurée adoucie (`rounded-[9px]`, pas de pilules), typographies Google Fonts `Plus Jakarta Sans` et `JetBrains Mono`.

---

## 🛠️ Stack Technologique

- **Framework Web :** [Next.js 14](https://nextjs.org/) (App Router, React Server Components & Client Components)
- **Langage :** [TypeScript 5](https://www.typescriptlang.org/)
- **Base de Données & Auth :** [Supabase](https://supabase.com/) (PostgreSQL relationnel, Row Level Security, Realtime)
- **Styling :** [Tailwind CSS](https://tailwindcss.com/)
- **Icônes :** [Lucide React](https://lucide.dev/)
- **Polices :** `Plus Jakarta Sans` & `JetBrains Mono`

---

## 🚀 Installation & Démarrage Local

### 1. Cloner le projet
```bash
git clone https://github.com/votre-compte/ciskofacture.git
cd ciskofacture
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env.local` à la racine :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📁 Structure du Projet

```
src/
├── app/
│   ├── (app)/                 # Routes de l'application (Dashboard, Factures, Clients, Paramètres)
│   │   ├── tableau-de-bord/
│   │   ├── factures/
│   │   ├── clients/
│   │   └── parametres/
│   ├── (auth)/                # Flux d'authentification (Connexion, Inscription)
│   │   ├── connexion/
│   │   └── inscription/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/                # AppShell, Sidebar, TopNav
│   ├── ui/                    # StatCard, StatusBadge, DateRangePicker
│   ├── auth/                  # AuthFormTabs
│   └── invoices/              # InvoiceForm, InvoiceLivePreview
└── lib/
    ├── services/              # Services Supabase (invoices, clients, auth, company)
    ├── store/                 # Hooks réactifs & Contexte (auth, date-range, app-store)
    └── format/                # Formatage monétaire FCFA & dates françaises
```

---

## 📄 Licence & Droits

© 2026 **ciskofacture**. Tous droits réservés.
