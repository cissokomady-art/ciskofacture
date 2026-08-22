# Design System — ciskofacture (Règle d'or UI/UX)

Ce document constitue la **spécification officielle et obligatoire du Design System** de **ciskofacture**. Toutes les futures pages (Création/Édition de facture, Détail facture, Gestion des clients, Transactions, Paramètres, etc.) doivent se conformer **strictement** à ce système pour garantir une cohérence visuelle 100% pixel-perfect, professionnelle et moderne.

---

## 1. Identité Visuelle & Philosophie de Design
- **Positionnement :** SaaS moderne de facturation et gestion financière dédié aux entrepreneurs et PME de la zone UEMOA.
- **Ton :** Épuré, haute précision financière, professionnel, premium (style Dribbble/Awwwards sans fioritures superflues).
- **Règle absolue sur les boutons :** **AUCUNE forme pilule (`rounded-full`) sur les boutons ou badges**. Tous les composants utilisent une géométrie adoucie mais rigoureuse avec des rayons précis.

---

## 2. Palette de Couleurs & Tokens Tailwind

### A. Couleurs de Marque (Rouge Bordeaux)
- **Bordeaux Principal (Action & Identité) :** `brand-600` (`#8B1538`)
- **Bordeaux Foncé (Hover & Active) :** `brand-700` (`#74102D`), `brand-800` (`#5F0D25`)
- **Bordeaux Doux (Fonds teintés, badges, tags) :** `brand-50` (`#FDF2F4`), `brand-100` (`#FCE7EA`)
- **Bordeaux Bordures d'accent :** `brand-100/80` ou `brand-200` (`#F8D0D8`)

### B. Couleurs de Fond & Surfaces
- **Fond d'application global :** `#F8F9FA` (gris ultra-doux, propre)
- **Surfaces des Cartes & Tableaux :** `#FFFFFF` (blanc pur)
- **Surfaces secondaires / Inputs inactifs :** `#F9FAFB` (`bg-gray-50/90`)
- **Surfaces au survol :** `hover:bg-gray-100/90` ou `hover:bg-gray-50/80`

### C. Bordures & Séparateurs
- **Bordure standard des cartes :** `border border-gray-200/90`
- **Bordure au survol :** `hover:border-gray-300`
- **Bordure des inputs :** `border border-gray-200/90 hover:border-gray-300 focus:border-brand-500`
- **Séparateurs horizontaux :** `border-b border-gray-100` ou `divide-y divide-gray-100`

### D. Couleurs de Statut & Badges
| Statut | Fond | Texte | Bordure | Pastille (Dot) |
|---|---|---|---|---|
| **Payée** | `bg-emerald-50` | `text-emerald-700` | `border-emerald-200/80` | `bg-emerald-500` |
| **Envoyée** | `bg-amber-50` | `text-amber-700` | `border-amber-200/80` | `bg-amber-500` |
| **En retard** | `bg-rose-50` | `text-rose-700` | `border-rose-200/80` | `bg-rose-500` |
| **Brouillon** | `bg-slate-50` | `text-slate-600` | `border-slate-200` | `bg-slate-400` |

---

## 3. Typographie & Formatage

### Polices
- **Sans-serif principale :** `Plus Jakarta Sans` (`font-sans`) pour tous les titres, textes, labels et boutons.
- **Monospace technique :** `JetBrains Mono` (`font-mono`) pour les numéros de factures (`FAC-2026-0028`), codes IFU/RCCM et identifiants.

### Échelle Typographique
- **Titres de pages (H1) :** `text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight`
- **Titres de sections / bannières (H2) :** `text-xl sm:text-2xl font-bold text-gray-900 tracking-tight`
- **Titres de cartes / tableaux (H3) :** `text-base sm:text-lg font-bold text-gray-900 tracking-tight`
- **Montants financiers (StatCards) :** `text-base sm:text-lg lg:text-[19px] font-bold text-gray-900 tracking-tight whitespace-nowrap`
- **Montants dans les tableaux :** `text-xs sm:text-sm font-bold text-gray-900 font-sans tracking-tight whitespace-nowrap`
- **Texte courant / Corps :** `text-xs sm:text-sm text-gray-600 leading-relaxed`
- **Labels secondaires & métadonnées :** `text-[10.5px] sm:text-[11px] text-gray-400 font-normal`
- **En-têtes de tableaux (TH) :** `text-[11px] font-semibold text-gray-400 uppercase tracking-wider`

### Règles de Formatage
- **Devise :** Toujours en **FCFA** avec séparateur d'espace pour les milliers (ex: `14 850 000 FCFA`). Utiliser `formatFCFA(amount)`.
- **Dates :** Format standard `JJ/MM/AAAA` (ex: `18/02/2026`). Utiliser `formatDateNumeric(date)`.

---

## 4. Système de Rayons de Bordure (`border-radius`)

| Élément | Rayon de bordure (Tailwind) | Valeur en pixels |
|---|---|---|
| **Boutons principaux (CTA)** | `rounded-[9px]` | **8px à 10px** |
| **Boutons secondaires / Actions** | `rounded-[8px]` ou `rounded-lg` | **8px** |
| **Badges de statut & pastilles** | `rounded-[5px]` | **5px à 6px** |
| **Onglets de filtrage (Tabs)** | `rounded-[7px]` sur conteneur `rounded-[9px]` | **7px / 9px** |
| **Champs de formulaire / Inputs** | `rounded-[8px]` | **8px** |
| **Cartes KPI financières** | `rounded-xl` | **12px à 14px** |
| **Conteneurs majeurs (Tableaux, Bannières)** | `rounded-2xl` | **16px** |
| **Cartes de profil utilisateur** | `rounded-[10px]` | **10px** |

---

## 5. Micro-Interactions, Animations & Effets Hover

### Boutons Principaux (CTA)
```tsx
className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[9px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shrink-0 whitespace-nowrap"
```
- **Hover :** légère élévation `-translate-y-0.5`, assombrissement `bg-brand-700`, ombre portée colorée `shadow-brand-800/20`.
- **Active (Click) :** retour à `translate-y-0` avec léger scale `scale-[0.99]`.

### Boutons Secondaires
```tsx
className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100/90 border border-gray-200/90 hover:border-gray-300 text-gray-700 hover:text-gray-900 rounded-[8px] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-150 active:scale-[0.99] shrink-0 whitespace-nowrap"
```

### Liens d'action avec flèche
```tsx
className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 group shrink-0 whitespace-nowrap transition-colors"
// L'icône flèche enfant :
<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
```

### Lignes de Tableau (Table Rows)
```tsx
className="hover:bg-gray-50/80 transition-colors duration-150 group cursor-pointer"
```

### Boutons d'icône d'action (Voir, Télécharger, Menu)
```tsx
className="p-1.5 sm:p-2 rounded-[6px] text-gray-400 hover:text-brand-600 hover:bg-brand-50 active:scale-95 transition-all duration-150 cursor-pointer"
```

---

## 6. Règles de Mise en Page & Responsivité

### Structure des Écrans
1. **AppShell :**
   - Barre latérale fixe sur Desktop (`w-72`), tiroir coulissant fluide sur Mobile (`max-w-[85vw]`, `z-50`).
   - Marge de contenu desktop : `lg:pl-72`.
   - Conteneur principal : `p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto space-y-5 sm:space-y-6`.

2. **Bannières & En-têtes :**
   - Disposition : `flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-5`.
   - Les boutons d'action doivent toujours comporter `whitespace-nowrap` et `shrink-0` pour ne **jamais couper ni forcer de retour à la ligne**.
   - Sur mobile (< 640px) : `flex flex-col sm:flex-row w-full sm:w-auto`.

3. **Grille des Cartes Financières (KPIs) :**
   ```tsx
   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
   ```
   - **Mobile (Galaxy S8+ et équivalents) :** 1 colonne (`grid-cols-1`).
   - **Tablettes (iPad Mini, iPad Pro portrait/paysage) :** 2 colonnes (`sm:grid-cols-2`), garantissant > 320px par carte sans tronquage de chiffres.
   - **Desktop large (>= 1280px) :** 4 colonnes (`xl:grid-cols-4`).

4. **Tableaux de Données :**
   - Conteneur avec défilement horizontal sécurisé : `overflow-x-auto overscroll-x-contain -mx-4 sm:-mx-5 lg:-mx-6`.
   - Largeur minimale imposée pour éviter l'écrasement des colonnes : `min-w-[680px]`.
   - Toutes les cellules de données (N°, Client, Dates, Montant, Statut, Actions) doivent avoir la classe `whitespace-nowrap`.

---

## 7. Formulaires & Saisie de Données (Pages Futures)

- **Champs texte & sélecteurs :**
  - Hauteur et padding : `px-3.5 py-2.5 text-xs sm:text-sm`.
  - Bordure : `border border-gray-200/90 rounded-[8px] bg-gray-50/90 hover:bg-white focus:bg-white`.
  - Focus : `focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all`.
  - Label discret au-dessus : `block text-xs font-semibold text-gray-700 mb-1.5`.
- **Boutons d'ajout d'article (Lignes dynamiques) :**
  - Style secondaire pro : `rounded-[8px] border border-dashed border-gray-300 hover:border-brand-500 hover:bg-brand-50/50 text-gray-600 hover:text-brand-700`.

---

## 8. Checklist d'application pour toute nouvelle page

Avant de valider une nouvelle page ou un nouveau composant, vérifier :
- [ ] Les boutons principaux ont un `border-radius: 8px à 10px` (`rounded-[9px]`) et un hover avec légère translation.
- [ ] Les boutons secondaires ont un `border-radius: 8px` (`rounded-[8px]`).
- [ ] Les badges de statut ont un `border-radius: 5px` (`rounded-[5px]`) et affichent la pastille colorée.
- [ ] Aucune pilule (`rounded-full`) n'est utilisée pour des boutons ou badges.
- [ ] Tous les montants financiers sont formatés en **FCFA** avec `formatFCFA()`.
- [ ] Toutes les dates sont au format `JJ/MM/AAAA`.
- [ ] Aucun débordement horizontal sur Samsung Galaxy S8+ (360px), iPad Mini (768px), ou iPad Pro (1024px).
- [ ] Les textes des boutons et numéros de factures sont protégés par `whitespace-nowrap`.
