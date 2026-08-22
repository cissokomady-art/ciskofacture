/**
 * Utilitaires de formatage de date en français (ex: "08/01/2026", "8 janvier 2026")
 */

const MOIS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

const MOIS_FR_COURT = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc."
];

export function formatDateNumeric(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "—";

  const jour = String(date.getDate()).padStart(2, "0");
  const mois = String(date.getMonth() + 1).padStart(2, "0");
  const annee = date.getFullYear();

  return `${jour}/${mois}/${annee}`;
}

export function formatDateReadable(dateInput: string | Date, options?: { shortMonth?: boolean }): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "—";

  const jour = date.getDate();
  const moisIndex = date.getMonth();
  const annee = date.getFullYear();
  const mois = options?.shortMonth ? MOIS_FR_COURT[moisIndex] : MOIS_FR[moisIndex];

  return `${jour} ${mois} ${annee}`;
}

export function formatDateRelative(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "—";

  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";
  if (diffDays === -1) return "Hier";
  if (diffDays < 0) return `Il y a ${Math.abs(diffDays)} jours`;
  return `Dans ${diffDays} jours`;
}
