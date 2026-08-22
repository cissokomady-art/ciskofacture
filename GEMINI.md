# 🚀 ciskofacture — Documentation Maîtresse & Spécifications Projet (GEMINI.md)

> **Guide de référence permanent pour les développeurs et modèles d'IA intervenant sur ce projet.**
> Toute future modification, création de composant ou ajout de page sur **ciskofacture** doit impérativement se conformer aux directives et standards architecturaux décrits dans ce document.

---

## 📖 1. Qu'est-ce que ciskofacture ?

**ciskofacture** est un logiciel SaaS moderne de facturation, devis et gestion financière conçu spécifiquement pour les entrepreneurs, indépendants, startups et PME de l'espace **UEMOA** (Union Économique et Monétaire Ouest-Africaine : Côte d'Ivoire, Sénégal, Togo, Bénin, Mali, Burkina Faso, Niger, Guinée-Bissau).

### Objectifs Clés du Produit :
- **Conformité OHADA & Fiscale :** Respect strict des normes de facturation du droit des affaires OHADA et de la fiscalité UEMOA (TVA légale à 18%, mentions IFU / RCCM / NINEA).
- **Monnaie Exclusive :** Utilisation systématique du **Franc CFA (XOF / FCFA)**, stocké en entiers (sans centimes) et formaté avec espace insécable pour les milliers.
- **Expérience Utilisateur Ultra-Premium :** Design de classe mondiale (inspiration Dribbble/Awwwards), épuré, dynamique, sans fioritures superflues, conçu pour les standards SaaS financiers modernes.
- **Réactivité en Temps Réel :** Prévisualisation des factures à la frappe de clavier (*Live Preview Split-Pane*) et persistance synchronisée sur l'ensemble des modules.

---

## 🛠️ 2. Stack Technologique & Outils

| Couche | Technologie | Détails & Rôle |
|---|---|---|
| **Framework Web** | **Next.js 14 (App Router)** | Architecture moderne avec React Server Components et Client Components (`"use client"`). |
| **Langage** | **TypeScript 5** | Typage strict, interfaces métier (`Invoice`, `Client`, `InvoiceItem`) et vérification à la compilation. |
| **Base de Données** | **Supabase PostgreSQL** | Tables relationnelles (`invoices`, `clients`, `invoice_items`, `company_profiles`), clés étrangères, cascade et RLS. |
| **Backend & Services** | **Supabase JS Client SDK** | Couche de services typés (`invoices.service`, `clients.service`, `company.service`) avec optimistic updates. |
| **Styling & CSS** | **Tailwind CSS 3.4** | Palette personnalisée Rouge Bordeaux, utilitaires responsifs, micro-animations et ombres portées douces. |
| **Polices Typographiques** | **Google Fonts (`next/font/google`)** | `Plus Jakarta Sans` (UI / Titres / Corps) et `JetBrains Mono` (N° Factures, montants, codes IFU/RIB). |
| **Pack d'Icônes** | **Lucide React** | Icônes vectorielles cohérentes et modernes pour toute l'interface. |
| **Stockage & Réactivité** | **Supabase Live Store (Full-Stack + Optimistic UI)** | Synchronisation réactive immédiate multi-onglets, persistance PostgreSQL instantanée. |
| **Serveur Local** | **Node.js (Port 3000)** | Exécution en mode développement via `npm run dev`. |

---

## 📂 3. Structure & Arborescence des Fichiers

```
/Users/madycissoko/.gemini/ciskofacture
├── .agents/
│   └── rules/
│       └── design-system.md         # Règle d'or de conception automatique pour l'IA
├── public/                          # Assets statiques
├── src/
│   ├── app/                         # Routing Next.js 14 (App Router)
│   │   ├── (app)/                   # Groupe de routes sous le layout principal AppShell
│   │   │   ├── tableau-de-bord/     # Page Dashboard (KPIs, Dernières factures, actions rapides)
│   │   │   │   └── page.tsx
│   │   │   ├── factures/            # Module Factures
│   │   │   │   ├── page.tsx         # Liste des factures avec recherche et filtres de statut
│   │   │   │   ├── nouvelle/        # Formulaire de création split-pane + Live Preview
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/            # Détail et modification de facture
│   │   │   │       ├── page.tsx     # Page détail avec document officiel & changement de statut
│   │   │   │       └── modifier/    # Page modification pré-remplie
│   │   │   │           └── page.tsx
│   │   │   ├── clients/             # Module Clients
│   │   │   │   ├── page.tsx         # Répertoire clients avec métriques et modale d'ajout
│   │   │   │   └── nouveau/         # Page dédiée d'ajout de client
│   │   │   │       └── page.tsx
│   │   │   ├── parametres/          # Module Paramètres & Configuration
│   │   │   │   └── page.tsx         # Profil émetteur (Dakar Sénégal), TVA, IBAN UEMOA, 2FA
│   │   │   ├── aide/                # Module Assistance & FAQ
│   │   │   │   └── page.tsx         # Recherche d'aide, FAQ accordéon, Support WhatsApp direct
│   │   │   ├── transactions/        # Module Transactions (Placeholder prêt)
│   │   │   │   └── page.tsx
│   │   │   └── rapports/            # Module Rapports & Statistiques (Placeholder prêt)
│   │   │       └── page.tsx
│   │   ├── layout.tsx               # Layout racine HTML & importation des polices
│   │   ├── globals.css              # Variables CSS globales et imports Tailwind
│   │   └── page.tsx                 # Redirection automatique vers /tableau-de-bord
│   ├── components/
│   │   ├── layout/                  # Composants structurels
│   │   │   ├── AppShell.tsx         # Wrapper général (Sidebar + TopNav + Contenu)
│   │   │   ├── Sidebar.tsx          # Navigation latérale desktop et drawer mobile avec badges réactifs
│   │   │   └── TopNav.tsx           # Barre supérieure avec breadcrumb, cloche et calendrier interactif
│   │   ├── ui/                      # Composants d'interface réutilisables
│   │   │   ├── StatCard.tsx         # Carte KPI financière avec tendance et icônes
│   │   │   ├── StatusBadge.tsx      # Badges rectangulaires de statuts (Payée, Envoyée, etc.)
│   │   │   └── DatePickerDropdown.tsx # Sélecteur de calendrier interactif avec design 3D
│   │   └── invoices/                # Composants dédiés à la facturation
│   │       ├── InvoiceForm.tsx      # Formulaire multi-lignes réactif
│   │       └── InvoiceLivePreview.tsx # Rendu en temps réel du document de facture papier
│   └── lib/
│       ├── constants.ts             # Devises, statuts de facture, couleurs et taux de TVA
│       ├── utils.ts                 # Utilitaire cn (clsx + tailwind-merge)
│       ├── format/
│       │   ├── currency.ts          # formatFCFA(montant) avec espace insécable
│       │   └── date.ts              # formatDateNumeric & formatDateReadable (JJ/MM/AAAA)
│       ├── data/mock/
│       │   ├── dashboard.ts         # Données initiales KPIs et profil utilisateur
│       │   ├── clients.ts           # Modèle et mock initial des entreprises clientes
│       │   └── invoices.ts          # Modèle, calculs purs (calculateInvoiceTotals) et factures
│       └── store/
│           └── app-store.ts         # Hooks useInvoices() et useClients() réactifs + localStorage
├── DESIGN_SYSTEM.md                 # Guide complet du design system du projet
├── GEMINI.md                        # CE FICHIER (Mémoire maîtresse du projet)
├── tailwind.config.ts               # Configuration Tailwind (Palette Brand Bordeaux, fonts, shadows)
├── tsconfig.json                    # Configuration TypeScript
└── package.json                     # Dépendances et scripts de build
```

---

## ⚡ 4. Fonctionnalités Implémentées en Détail

### A. Tableau de Bord Financier (`/tableau-de-bord`)
- **Bannière d'accueil personnalisée :** Message de bienvenue, synthèse mensuelle et actions rapides (*Créer une facture*, *Nouveau client*).
- **4 Cartes KPI Financières :**
  1. *Chiffre d'affaires* (Total facturé du mois)
  2. *En attente de paiement* (Factures émises non échues)
  3. *Montant encaissé* (Règlements reçus)
  4. *Factures en retard* (Échéances dépassées)
  - Calcul dynamique en direct depuis le store des factures.
- **Tableau Pleine Largeur des Dernières Factures :**
  - Onglets de filtrage par statut (*Toutes*, *Payées*, *Envoyées*, *En retard*, *Brouillons*) avec pastilles de compteurs.
  - Recherche instantanée par N° de facture, client ou ville.
  - Actions rapides par ligne (*Voir la facture*, *Télécharger PDF*).

### B. Module « Créer / Modifier une Facture » (`/factures/nouvelle` & `/factures/[id]/modifier`)
- **Disposition Split-Pane en Temps Réel :**
  - **Volet Gauche (Formulaire) :**
    - Onglets *Standard* / *Échelonné* / *Récurrent*.
    - Switch *« Aperçu live »* (pour masquer/afficher le panneau droit sur demande).
    - Sélection du client via liste déroulante dynamique liée au carnet d'adresses.
    - Dates d'émission (date du jour par défaut) et d'échéance (+30 jours).
    - Numéro de facture automatique séquentiel (`FAC-2026-XXXX`).
    - **Lignes d'articles dynamiques :** Description, Quantité, Taux de TVA (18%), Prix unitaire en FCFA. Bouton `+ Ajouter un article`, bouton suppression de ligne avec recalcul instantané.
    - **Remise commerciale globale :** Case à cocher révélant motif et montant de remise en FCFA.
    - Notes et conditions de règlement OHADA.
    - Boutons d'action : *« Sauvegarder comme brouillon »* et *« Émettre et envoyer la facture »*.
  - **Volet Droit (Aperçu Live) :**
    - Rendu papier officiel ultra-fidèle au document imprimé.
    - Coordonnées émetteur complètes (Dakar, Sénégal) et client.
    - Tableau des prestations avec TVA 18% détaillée par ligne.
    - Bloc récapitulatif financier : Sous-total HT, Remise, TVA (18%), **Total TTC en FCFA**.
    - Coordonnées bancaires de virement UEMOA (SGS Sénégal / IBAN) et signature officielle.
    - Boutons d'export rapide : *Email* et *Télécharger PDF*.

### C. Module « Liste des Factures » (`/factures`)
- 4 mini-cartes de synthèse financière en haut de page.
- Système complet de filtres par onglets avec compteurs dynamiques.
- Barre de recherche multicritère (N° facture, raison sociale, ville).
- Tableau responsive avec tri, badges de statut `rounded-[5px]`, montants en FCFA.
- Menu d'actions par ligne : *Voir*, *Modifier*, *Télécharger*, *Supprimer avec confirmation*.

### D. Module « Détail de Facture » (`/factures/[id]`)
- Affichage grand format du document officiel conforme OHADA.
- Barre d'outils interactive :
  - Menu déroulant **« Changer le statut »** (*Payée*, *Envoyée*, *En retard*, *Brouillon*) avec mise à jour immédiate.
  - Bouton **« Modifier »** ouvrant le formulaire pré-rempli.
  - Bouton **« Télécharger PDF »**.
  - Bouton **« Supprimer »** avec modale de confirmation.

### E. Module « Gestion des Clients » (`/clients` & `/clients/nouveau`)
- Répertoire complet des entreprises clientes (Raison sociale, Email, Téléphone, Ville, Pays, N° IFU/RCCM/NINEA).
- Métriques financières par client : calcul automatique du nombre de factures et du chiffre d'affaires cumulé généré.
- Modale interactive et page dédiée pour l'ajout et la modification de clients.
- Synchronisation immédiate avec la liste déroulante du formulaire de facturation.
- Suppression sécurisée avec confirmation.

### F. Module « Paramètres » (`/parametres`)
- Interface moderne à 5 onglets :
  1. **Profil Entreprise :** Coordonnées de l'émetteur basées à Dakar (Parcelles Assainies, Unité 16, Sénégal, Téléphone `+221 76 643 67 67`, N° RCCM et NINEA, upload de logo).
  2. **Facturation & Fiscalité :** Devise (FCFA), TVA par défaut (18%), préfixe de numérotation (`FAC-2026-`), délai de règlement (30 jours), mentions légales.
  3. **Coordonnées Bancaires :** Banque UEMOA (*Société Générale Sénégal*), IBAN/RIB, titulaire et code SWIFT.
  4. **Relances & Alertes :** Rappels email, notifications WhatsApp Business et reçus automatiques.
  5. **Sécurité :** Authentification 2FA et modification du mot de passe.
- Feedback visuel avec notification toast de succès (`CheckCircle2`).

### G. Module « Centre d'Aide » (`/aide`)
- Hero Banner avec **recherche d'assistance en direct** filtrant les réponses dès la frappe.
- 4 cartes de guides thématiques (*Facturation & TVA*, *Clients & Relances*, *Fiscalité OHADA*, *Toutes les questions*).
- **FAQ interactive en accordéon** couvrant les cas d'usage réels des PME de la zone UEMOA.
- Blocs de support direct : **WhatsApp direct (+221 76 643 67 67)**, Email dédié (`support@ciskofacture.com`), et Ligne téléphonique pro.

### H. Composant Sélecteur de Calendrier Interactif (`DatePickerDropdown`)
- Bouton calendrier dans la `TopNav` ouvrant une carte flottante `rounded-2xl` avec ombres douces.
- En-tête avec grand numéro du jour, mois/année et **icône 3D de calendrier de bureau** avec accent Rouge Bordeaux.
- Barre de progression segmentée dans le mois.
- Grille des jours cliquable avec sélection adoucie `rounded-[7px] bg-brand-600`.
- Raccourcis de périodes financières (*Ce mois-ci*, *Mois dernier*, *Ce trimestre*, *Année 2026*).
- Fermeture automatique au clic extérieur (`click outside`) ou touche `Échap`.

---

## 🎨 5. Décisions de Design & Système Visuel

### A. Palette de Couleurs Officielles
- **Couleur Primaire d'Action (Rouge Bordeaux) :**
  - `brand-600` (`#8B1538`) : Boutons CTA principaux, icône logo, éléments actifs.
  - `brand-700` (`#74102D`) : État de survol (`hover`).
  - `brand-800` (`#5F0D25`) : Ombre portée colorée (`shadow-brand-800/20`) et état pressé.
  - `brand-50` (`#FDF2F4`) : Fonds doux pour badges et zones de mise en valeur.
  - `brand-100` (`#FCE7EA`) : Bordures teintées douces.
- **Surfaces & Neutres :**
  - Fond global d'application : `#F8F9FA` (gris très clair, moderne et doux).
  - Fond des cartes & conteneurs : `#FFFFFF` (blanc pur).
  - Surfaces inactives / inputs : `#F9FAFB` (`bg-gray-50/90`).
  - Bordures standard : `border-gray-200/90`.
  - Bordures au survol : `hover:border-gray-300`.
- **Statuts Métier (Badges) :**
  - **Payée (Vert) :** `bg-emerald-50 text-emerald-700 border-emerald-200/80` (Pastille: `bg-emerald-500`)
  - **Envoyée (Orange) :** `bg-amber-50 text-amber-700 border-amber-200/80` (Pastille: `bg-amber-500`)
  - **En retard (Rouge) :** `bg-rose-50 text-rose-700 border-rose-200/80` (Pastille: `bg-rose-500`)
  - **Brouillon (Gris) :** `bg-slate-50 text-slate-600 border-slate-200` (Pastille: `bg-slate-400`)

### B. Règles Absolues sur les Rayons de Bordure (`border-radius`)
> ⚠️ **Règle d'or : ZÉRO bouton ou badge en forme de pilule (`rounded-full`)**. Tous les éléments utilisent une géométrie structurée et adoucie.

| Élément | Classe Tailwind | Rayon en Pixels |
|---|---|---|
| **Boutons principaux (CTA)** | `rounded-[9px]` | **8px à 10px** |
| **Boutons secondaires / Actions** | `rounded-[8px]` | **8px** |
| **Badges de statut & pastilles** | `rounded-[5px]` | **5px à 6px** |
| **Boutons d'onglets (Tabs)** | `rounded-[7px]` sur conteneur `rounded-[9px]` | **7px / 9px** |
| **Champs de formulaire / Inputs** | `rounded-[8px]` | **8px** |
| **Cartes KPI financières** | `rounded-xl` | **12px à 14px** |
| **Conteneurs majeurs (Tableaux, Modales, Bannières)** | `rounded-2xl` | **16px** |
| **Carte de profil utilisateur** | `rounded-[10px]` | **10px** |

### C. Typographie, Dates & Monnaies
- **Police UI / Titres / Corps :** `Plus Jakarta Sans` (`font-sans`).
- **Police Technique :** `JetBrains Mono` (`font-mono`) pour numéros de facture (`FAC-2026-0028`), codes IFU/RCCM et IBAN.
- **Format Monétaire :** Toujours en **FCFA** avec séparateur d'espace pour les milliers via `formatFCFA(amount)` (ex: `14 850 000 FCFA`).
- **Format de Date :** Format français `JJ/MM/AAAA` via `formatDateNumeric(date)` (ex: `18/02/2026`).

### D. Micro-Interactions & Hover
- **Boutons principaux :** `hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-800/20 active:translate-y-0 active:scale-[0.99] transition-all duration-150`.
- **Boutons secondaires :** `hover:bg-gray-100/90 hover:border-gray-300 active:scale-[0.99] transition-all duration-150`.
- **Liens fléchés :** `group-hover:translate-x-1 transition-transform duration-200`.
- **Lignes de tableau :** `hover:bg-gray-50/80 transition-colors duration-150`.

### E. Responsivité & Alignements
- **Samsung Galaxy S8+ & Mobiles (< 640px) :**
  - Boutons d'en-tête en `flex flex-col sm:flex-row w-full sm:w-auto` avec `whitespace-nowrap` strict pour éviter tout retour à la ligne forcé.
  - Grille des cartes en 1 colonne (`grid-cols-1`).
  - Drawer mobile coulissant fluide (`max-w-[85vw]`, `z-50`).
- **iPad Mini & iPad Pro (768px à 1024px) :**
  - Grille des 4 cartes KPI en 2x2 (`sm:grid-cols-2`), allouant > 320px par carte sans tronquage de chiffres.
  - Bannière en `flex flex-col xl:flex-row`.
- **Desktop (>= 1280px) :**
  - Grille des cartes en 4 colonnes (`xl:grid-cols-4`).
  - Sidebar fixe (`w-72`), contenu avec `lg:pl-72 max-w-7xl mx-auto`.
- **Tableaux de Données :**
  - Conteneur avec défilement horizontal fluide (`overflow-x-auto min-w-[680px]`).
  - Cellules en `whitespace-nowrap`.

---

## 📌 6. Instructions Strictes pour les Futurs Modèles d'IA & Développeurs

Lorsque vous devez modifier ce projet ou créer de nouvelles pages :

1. **Toujours respecter la règle des rayons de bordure :**
   - Ne jamais introduire de `rounded-full` sur les boutons, badges ou cartes.
   - Respecter strictement l'échelle : 8-10px pour boutons CTA, 8px pour formulaires/actions, 5px pour les badges de statut.
2. **Toujours formater les montants avec `formatFCFA` :**
   - Ne jamais afficher de symbole `$` ou `€` sauf si l'utilisateur le demande explicitement.
   - Ne jamais afficher de centimes pour le FCFA (`Math.round()` systématique).
3. **Toujours conserver les coordonnées de l'émetteur sénégalais :**
   - Émetteur par défaut : **Cisko Digital Ventures SARL**, `Parcelles Assainies, Unité 16, Dakar, Sénégal`, Téléphone : `+221 76 643 67 67`, Banque : `Société Générale Sénégal (SGS)`.
4. **Prévenir les erreurs d'hydratation SSR React / Next.js :**
   - Initialiser les states locaux (`useState`) avec les constantes par défaut identiques au serveur (`INITIAL_INVOICES`, `INITIAL_CLIENTS`), puis synchroniser `localStorage` dans `useEffect()`.
   - Utiliser `suppressHydrationWarning` sur les badges dynamiques calculés côté client.
5. **Préserver la persistance réactive :**
   - Utiliser systématiquement les hooks de `@/lib/store/app-store` (`useInvoices()` et `useClients()`) pour que toute création, modification ou suppression se répercute instantanément sur le Dashboard, la Sidebar et les tableaux.
6. **Vérification systématique :**
   - Toujours exécuter `npx tsc --noEmit` pour garantir 0 erreur de typage TypeScript avant de terminer une tâche.
