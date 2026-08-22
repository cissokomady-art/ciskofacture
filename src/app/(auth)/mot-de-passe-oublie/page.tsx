"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/lib/services/auth.service";
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setErrorMsg(err.message || "Impossible d'envoyer le lien de réinitialisation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 sm:px-10 border border-gray-200/90 rounded-2xl shadow-xl space-y-6">
      <div>
        <Link
          href="/connexion"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à la connexion</span>
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Réinitialisation du mot de passe
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Saisissez votre adresse email professionnelle pour recevoir un lien de réinitialisation.
        </p>
      </div>

      {success ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[8px] space-y-2 text-xs text-emerald-800 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Email envoyé avec succès !</span>
          </div>
          <p>
            Vérifiez votre boîte de réception à l&apos;adresse <strong>{email}</strong> et suivez les instructions pour définir un nouveau mot de passe.
          </p>
          <div className="pt-2">
            <Link
              href="/connexion"
              className="inline-block font-semibold text-brand-700 hover:underline"
            >
              Retourner à la page de connexion →
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-[8px] flex items-start gap-2.5 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Votre adresse email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="direction@votre-entreprise.sn"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[9px] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span>Envoi en cours...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Envoyer le lien de réinitialisation</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
