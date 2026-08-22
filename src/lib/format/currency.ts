/**
 * Formate un montant en Francs CFA (XOF)
 * Exemple: 250000 -> "250 000 FCFA"
 */
export function formatFCFA(amount: number, options?: { showSuffix?: boolean; compact?: boolean }): string {
  const { showSuffix = true, compact = false } = options || {};

  if (isNaN(amount)) {
    return showSuffix ? "0 FCFA" : "0";
  }

  if (compact && Math.abs(amount) >= 1_000_000) {
    const millions = (amount / 1_000_000).toFixed(1).replace(".", ",");
    return showSuffix ? `${millions} M FCFA` : `${millions} M`;
  }

  if (compact && Math.abs(amount) >= 1_000) {
    const thousands = (amount / 1_000).toFixed(0);
    return showSuffix ? `${thousands} k FCFA` : `${thousands} k`;
  }

  // Formatage standard avec séparateur espace
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return showSuffix ? `${grouped} FCFA` : grouped;
}
