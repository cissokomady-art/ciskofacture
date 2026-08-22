import React from "react";
import Link from "next/link";
import { ArrowLeftRight, ArrowLeft } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Transactions</h2>
        <p className="text-sm text-gray-500">Historique des encaissements et règlements</p>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-3xl p-8 shadow-card text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center">
          <ArrowLeftRight className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Module Transactions</h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Suivi des flux financiers et des paiements manuels reçus en FCFA.
        </p>
        <div className="pt-2">
          <Link
            href="/tableau-de-bord"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au tableau de bord</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
