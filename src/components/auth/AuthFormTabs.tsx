"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/store/auth-context";
import { cn } from "@/lib/utils";
import {
  Lock,
  Mail,
  User,
  Building2,
  MapPin,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Send,
  X,
  ShieldCheck,
} from "lucide-react";

interface AuthFormTabsProps {
  defaultTab?: "login" | "register";
}

const UEMOA_COUNTRIES = [
  "Sénégal",
  "Côte d'Ivoire",
  "Bénin",
  "Togo",
  "Mali",
  "Burkina Faso",
  "Niger",
  "Guinée-Bissau",
];

export function AuthFormTabs({ defaultTab = "login" }: AuthFormTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, loginWithGoogle, forgotPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("Dakar");
  const [country, setCountry] = useState("Sénégal");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);

  // Global state
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync tab with URL if needed
  useEffect(() => {
    if (searchParams?.get("tab") === "register") {
      setActiveTab("register");
    } else if (searchParams?.get("tab") === "login") {
      setActiveTab("login");
    }
  }, [searchParams]);

  // Handle Tab Switch
  const switchTab = (tab: "login" | "register") => {
    setActiveTab(tab);
    setErrorMsg(null);
  };

  // Password confirmation check
  const passwordsMatch =
    registerPassword.length > 0 &&
    confirmPassword.length > 0 &&
    registerPassword === confirmPassword;

  const passwordsMismatch =
    confirmPassword.length > 0 && registerPassword !== confirmPassword;

  // 1. Submit Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setErrorMsg("Veuillez renseigner votre email et mot de passe.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await login(loginEmail, loginPassword);
      router.push("/tableau-de-bord");
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg(
        err.message?.includes("Invalid login credentials")
          ? "Email ou mot de passe incorrect. Veuillez vérifier vos identifiants."
          : err.message || "Une erreur est survenue lors de la connexion."
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !companyName || !registerEmail || !registerPassword) {
      setErrorMsg("Veuillez renseigner tous les champs obligatoires.");
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMsg("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setErrorMsg("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await register(registerEmail, registerPassword, {
        fullName,
        companyName,
        city,
        country,
      });
      router.push("/tableau-de-bord");
    } catch (err: any) {
      console.error("Register error:", err);
      setErrorMsg(err.message || "Une erreur est survenue lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Google OAuth Login/Signup
  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setErrorMsg(err.message || "Impossible de se connecter avec Google.");
      setGoogleLoading(false);
    }
  };

  // 4. Quick Demo Mode Login
  const handleDemoLogin = async () => {
    setLoginEmail("mady.cissoko@ciskofacture.com");
    setLoginPassword("CiskoFacture2026!");
    setLoading(true);
    setErrorMsg(null);
    try {
      await login("mady.cissoko@ciskofacture.com", "CiskoFacture2026!");
      router.push("/tableau-de-bord");
    } catch (e) {
      router.push("/tableau-de-bord");
    } finally {
      setLoading(false);
    }
  };

  // 5. Submit Forgot Password
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;

    setForgotLoading(true);
    setForgotError(null);

    try {
      await forgotPassword(forgotEmail);
      setForgotSuccess(true);
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setForgotError(err.message || "Impossible d'envoyer le lien de réinitialisation.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="bg-white py-7 px-5 sm:px-8 border border-gray-200/90 rounded-2xl shadow-xl space-y-6">
      {/* 1. Sélecteur sous forme d'onglets (Design System: radius 9px / 7px) */}
      <div className="p-1 bg-gray-100/90 rounded-[9px] grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => switchTab("login")}
          className={cn(
            "py-2 px-3 text-xs sm:text-sm font-bold rounded-[7px] transition-all duration-150 cursor-pointer text-center",
            activeTab === "login"
              ? "bg-white text-gray-900 shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          Se connecter
        </button>
        <button
          type="button"
          onClick={() => switchTab("register")}
          className={cn(
            "py-2 px-3 text-xs sm:text-sm font-bold rounded-[7px] transition-all duration-150 cursor-pointer text-center",
            activeTab === "register"
              ? "bg-white text-gray-900 shadow-xs"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          Création de compte
        </button>
      </div>

      {/* Titre & Message contextuel */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          {activeTab === "login"
            ? "Ravi de vous revoir"
            : "Rejoignez ciskofacture"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {activeTab === "login"
            ? "Accédez à votre tableau de bord et gérez vos factures"
            : "Créez votre compte entreprise en zone UEMOA en 1 minute"}
        </p>
      </div>

      {/* Message d'erreur global */}
      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-[8px] flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in zoom-in-95 duration-150">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Bouton Authentification Google Officiel */}
      <div>
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={googleLoading}
          className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/90 hover:border-gray-300 rounded-[9px] text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-3 shadow-2xs active:scale-[0.99] cursor-pointer"
        >
          {/* Logo Google SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>
            {googleLoading
              ? "Redirection Google..."
              : activeTab === "login"
              ? "Continuer avec Google"
              : "S'inscrire avec Google"}
          </span>
        </button>

        {/* Séparateur */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-gray-400 font-medium uppercase tracking-wider shrink-0">
            ou avec votre email
          </span>
          <div className="border-t border-gray-200 w-full" />
        </div>
      </div>

      {/* 3. FORMULAIRE : ONGLET SE CONNECTER */}
      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="direction@votre-entreprise.sn"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-700">
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Checkbox Se souvenir */}
          <div className="flex items-center">
            <input
              id="tab-remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500 cursor-pointer"
            />
            <label htmlFor="tab-remember" className="ml-2 block text-xs text-gray-600 cursor-pointer select-none">
              Se souvenir de moi pendant 30 jours
            </label>
          </div>

          {/* Bouton CTA Connexion */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[9px] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span>Connexion en cours...</span>
            ) : (
              <>
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Bouton Mode Démo Rapide */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 rounded-[8px] bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Accès direct (Mode Démo)</span>
            </button>
          </div>

          {/* Lien basculer vers Inscription */}
          <div className="text-center text-xs text-gray-500 pt-3 border-t border-gray-100">
            Vous n&apos;avez pas de compte ?{" "}
            <button
              type="button"
              onClick={() => switchTab("register")}
              className="font-bold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
            >
              Créer un compte entreprise
            </button>
          </div>
        </form>
      )}

      {/* 4. FORMULAIRE : ONGLET CRÉATION DE COMPTE */}
      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Nom Dirigeant */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Nom et Prénom du dirigeant / responsable
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ex: Mady Cissoko"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Nom Entreprise */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Raison sociale de l&apos;entreprise
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ex: Cisko Digital Ventures SARL"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Ville & Pays (Grille 2 colonnes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">Ville</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Dakar"
                className="w-full px-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">Pays (UEMOA)</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
              >
                {UEMOA_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Email professionnel
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="contact@votre-entreprise.sn"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Mot de passe (min. 6 caractères)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                minLength={6}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          {/* Confirmation Mot de passe avec vérification */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-700">
                Confirmer le mot de passe
              </label>
              {passwordsMatch && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mots de passe identiques
                </span>
              )}
              {passwordsMismatch && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Mots de passe différents
                </span>
              )}
            </div>
            <div className="relative">
              <Lock
                className={cn(
                  "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors",
                  passwordsMatch ? "text-emerald-500" : passwordsMismatch ? "text-rose-500" : "text-gray-400"
                )}
              />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className={cn(
                  "w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border rounded-[8px] focus:outline-none focus:ring-2 transition-all",
                  passwordsMatch
                    ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                    : passwordsMismatch
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-gray-200/90 hover:border-gray-300 focus:border-brand-500 focus:ring-brand-500/20"
                )}
              />
            </div>
          </div>

          {/* Bouton CTA Inscription */}
          <button
            type="submit"
            disabled={loading || (confirmPassword.length > 0 && !passwordsMatch)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[9px] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span>Création du compte...</span>
            ) : (
              <>
                <span>Créer mon compte entreprise</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Lien basculer vers Connexion */}
          <div className="text-center text-xs text-gray-500 pt-3 border-t border-gray-100">
            Vous avez déjà un compte ?{" "}
            <button
              type="button"
              onClick={() => switchTab("login")}
              className="font-bold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
            >
              Se connecter
            </button>
          </div>
        </form>
      )}

      {/* 5. MODALE RÉCUPÉRATION DU MOT DE PASSE OUBLIÉ */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Mot de passe oublié
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Recevez un lien de réinitialisation sécurisé par email
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setForgotModalOpen(false);
                  setForgotSuccess(false);
                  setForgotError(null);
                }}
                className="p-1 rounded-[6px] text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {forgotSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[8px] space-y-2 text-xs text-emerald-800 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Email envoyé avec succès !</span>
                </div>
                <p>
                  Un lien de réinitialisation a été envoyé à <strong>{forgotEmail}</strong>. Veuillez vérifier votre boîte de réception.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModalOpen(false);
                    setForgotSuccess(false);
                  }}
                  className="mt-2 w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[7px] font-semibold text-xs transition cursor-pointer"
                >
                  Fermer et retourner à la connexion
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                {forgotError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-[8px] text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{forgotError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Votre adresse email de connexion
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="direction@votre-entreprise.sn"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-3.5 py-2 rounded-[8px] bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs hover:shadow-brand-800/20 transition cursor-pointer disabled:opacity-60"
                  >
                    {forgotLoading ? (
                      <span>Envoi...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Envoyer le lien</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
