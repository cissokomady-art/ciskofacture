# Spécification du Design System — ciskofacture

Bienvenue dans le guide de référence officiel du **Design System de ciskofacture**. Ce document consigne l'ensemble des règles visuelles, tokens de design, composants, micro-animations, comportements responsifs et bonnes pratiques appliqués sur l'ensemble de l'application.

---

## 🎨 1. Palette de Couleurs

### Identité de Marque (Rouge Bordeaux)
- **`brand-600` (`#8B1538`) :** Couleur primaire d'action (Boutons CTA, icône de logo, éléments actifs).
- **`brand-700` (`#74102D`) :** État de survol (`hover`) des boutons principaux.
- **`brand-800` (`#5F0D25`) :** Ombre portée colorée (`shadow-brand-800/20`) et état pressé.
- **`brand-50` (`#FDF2F4`) :** Fond doux pour badges, tags et zones de mise en avant.
- **`brand-100` (`#FCE7EA`) :** Bordures douces teintées.

### Surfaces & Neutres
- **Fond de page :** `#F8F9FA` (Gris très clair, moderne et doux).
- **Fond de carte / surface :** `#FFFFFF` (Blanc pur).
- **Surfaces secondaires / inactives :** `#F9FAFB` (`bg-gray-50/90`).
- **Surfaces au survol :** `hover:bg-gray-100/90` ou `hover:bg-gray-50/80`.
- **Bordures par défaut :** `border-gray-200/90`.
- **Bordures au survol :** `hover:border-gray-300`.
- **Séparateurs :** `border-gray-100`.

### Statuts Métier (Badges)
- **Payée (Vert) :** `bg-emerald-50 text-emerald-700 border-emerald-200/80` (Pastille: `bg-emerald-500`)
- **Envoyée (Orange) :** `bg-amber-50 text-amber-700 border-amber-200/80` (Pastille: `bg-amber-500`)
- **En retard (Rouge) :** `bg-rose-50 text-rose-700 border-rose-200/80` (Pastille: `bg-rose-500`)
- **Brouillon (Gris) :** `bg-slate-50 text-slate-600 border-slate-200` (Pastille: `bg-slate-400`)

---

## 📐 2. Rayons de Bordure (`border-radius`)

> **Règle absolue :** **Zéro bouton en forme de pilule (`rounded-full`)**. Tous les éléments utilisent une géométrie adoucie et rigoureuse.

| Élément | Classe Tailwind | Valeur en px |
|---|---|---|
| **Boutons principaux (CTA)** | `rounded-[9px]` | **8px à 10px** |
| **Boutons secondaires / Actions** | `rounded-[8px]` | **8px** |
| **Badges de statut & pastilles** | `rounded-[5px]` | **5px à 6px** |
| **Boutons de filtrage (Tabs)** | `rounded-[7px]` sur conteneur `rounded-[9px]` | **7px / 9px** |
| **Champs de formulaire / Inputs** | `rounded-[8px]` | **8px** |
| **Cartes KPI financières** | `rounded-xl` | **12px à 14px** |
| **Conteneurs majeurs (Tableaux, Bannières)** | `rounded-2xl` | **16px** |
| **Cartes de profil utilisateur** | `rounded-[10px]` | **10px** |

---

## ✍️ 3. Typographie & Formatage

- **Police principale :** `Plus Jakarta Sans` (`font-sans`) pour tous les textes, titres et labels.
- **Police technique :** `JetBrains Mono` (`font-mono`) pour les numéros de facture (`FAC-2026-0028`) et codes légaux.
- **Format monétaire :** Toujours en **FCFA** avec séparateur d'espace pour les milliers via `formatFCFA(amount)` (ex: `14 850 000 FCFA`).
- **Format de date :** Format français `JJ/MM/AAAA` via `formatDateNumeric(date)` (ex: `18/02/2026`).

---

## ✨ 4. Micro-Interactions & Effets Hover

### Boutons Principaux (CTA)
- `transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]`
- `hover:bg-brand-700 hover:shadow-md hover:shadow-brand-800/20`

### Boutons Secondaires
- `transition-all duration-150 active:scale-[0.99]`
- `hover:bg-gray-100/90 hover:border-gray-300 text-gray-700 hover:text-gray-900`

### Liens & Flèches d'action
- `group transition-colors`
- Icône flèche : `group-hover:translate-x-1 transition-transform duration-200`

### Lignes de Tableau & Icônes d'action
- Lignes : `hover:bg-gray-50/80 transition-colors duration-150`
- Boutons d'action (Voir, Télécharger) : `rounded-[6px] hover:bg-brand-50 hover:text-brand-600 active:scale-95 transition-all duration-150`

---

## 📱 5. Responsivité & Alignements

- **Samsung Galaxy S8+ & Mobiles (< 640px) :**
  - Boutons d'en-tête disposés en `flex flex-col sm:flex-row w-full sm:w-auto` avec `whitespace-nowrap` pour éviter tout retour à la ligne forcé.
  - Grille des cartes en 1 colonne (`grid-cols-1`).
  - Menu latéral mobile en tiroir coulissant (`max-w-[85vw]`, `z-50`).
- **iPad Mini & iPad Pro (768px à 1024px) :**
  - Grille des 4 cartes KPI en 2x2 (`sm:grid-cols-2`), allouant plus de 320px par carte sans tronquage de prix.
  - Bannière d'accueil en `flex flex-col xl:flex-row` pour que les boutons restent visibles sans coupure.
- **Desktop (>= 1280px) :**
  - Grille des cartes en 4 colonnes (`xl:grid-cols-4`).
  - Barre latérale fixe (`w-72`), contenu `lg:pl-72 max-w-7xl mx-auto`.
- **Tableaux :**
  - Conteneur avec défilement horizontal fluide (`overflow-x-auto min-w-[680px]`).
  - Toutes les cellules en `whitespace-nowrap`.
