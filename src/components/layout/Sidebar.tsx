"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOCK_USER_PROFILE } from "@/lib/data/mock/dashboard";
import { useInvoices, useClients } from "@/lib/store/app-store";
import { useAuth } from "@/lib/store/auth-context";
import {
  LayoutDashboard,
  FileText,
  Users,
  ArrowLeftRight,
  BarChart3,
  HelpCircle,
  Settings,
  Moon,
  Search,
  ChevronsUpDown,
  X,
  PlusCircle,
  Sparkles,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { invoices } = useInvoices();
  const { clients } = useClients();
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainNavItems = [
    {
      label: "Tableau de bord",
      href: "/tableau-de-bord",
      icon: LayoutDashboard,
      active: pathname === "/tableau-de-bord" || pathname === "/",
    },
    {
      label: "Factures",
      href: "/factures",
      icon: FileText,
      active: pathname?.startsWith("/factures"),
      badge: invoices.length > 0 ? String(invoices.length) : undefined,
    },
    {
      label: "Clients",
      href: "/clients",
      icon: Users,
      active: pathname?.startsWith("/clients"),
      badge: clients.length > 0 ? String(clients.length) : undefined,
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: ArrowLeftRight,
      active: pathname?.startsWith("/transactions"),
    },
    {
      label: "Rapports",
      href: "/rapports",
      icon: BarChart3,
      active: pathname?.startsWith("/rapports"),
    },
  ];

  const bottomNavItems = [
    {
      label: "Aide & Support",
      href: "/aide",
      icon: HelpCircle,
      active: pathname?.startsWith("/aide"),
    },
    {
      label: "Paramètres",
      href: "/parametres",
      icon: Settings,
      active: pathname?.startsWith("/parametres"),
    },
  ];

  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] bg-white border-r border-gray-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-lg lg:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top Header & Navigation */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto overscroll-contain">
          {/* Brand Logo & Mobile Close button */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <Link
              href="/tableau-de-bord"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0"
              onClick={onCloseMobile}
            >
              {/* Logo icon (radius: 9px) */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[9px] bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-600/20 group-hover:scale-105 transition-transform flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M9 8h6" />
                  <path d="M9 12h6" />
                  <path d="M9 16h4" />
                </svg>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1 truncate">
                  cisko<span className="text-brand-600">facture</span>
                </span>
                <span className="text-[9.5px] sm:text-[10px] text-gray-400 font-medium tracking-wide uppercase truncate">
                  Zone UEMOA • FCFA
                </span>
              </div>
            </Link>

            {/* Bouton de fermeture mobile */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-[8px] text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition shrink-0 ml-2 cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Barre de recherche (radius: 8px) */}
          <div className="relative mb-5 sm:mb-6">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-11 py-2 bg-gray-50/90 hover:bg-white focus:bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 border border-gray-200/90 rounded-[8px] hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
              <span className="absolute right-2 px-1.5 py-0.5 text-[9.5px] font-medium text-gray-400 bg-white border border-gray-200 rounded-[4px] shadow-2xs pointer-events-none">
                ⌘ F
              </span>
            </div>
          </div>

          {/* Menu principal */}
          <div className="space-y-5 sm:space-y-6">
            <div>
              <div className="text-[10.5px] sm:text-[11px] font-semibold text-gray-400 tracking-wider uppercase px-3 mb-2">
                Menu
              </div>

              <nav className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={cn(
                        "group flex items-center justify-between px-3 py-2.5 rounded-[8px] text-xs sm:text-sm font-medium transition-all duration-150",
                        item.active
                          ? "bg-gray-100/90 text-gray-900 font-semibold shadow-xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={cn(
                            "w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors shrink-0",
                            item.active ? "text-brand-600" : "text-gray-400 group-hover:text-gray-600"
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          suppressHydrationWarning
                          className="px-2 py-0.5 text-[10.5px] font-semibold rounded-[5px] bg-brand-50 text-brand-700 border border-brand-100 shrink-0"
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Encadré d'action rapide (radius: 12px) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-br from-brand-50 via-brand-50/30 to-gray-50 border border-brand-100/80">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="text-xs font-bold text-gray-900 truncate">Émission instantanée</span>
              </div>
              <p className="text-[11px] text-gray-600 mb-2.5 leading-relaxed">
                Créez vos factures conformes OHADA en 30 secondes.
              </p>
              <Link
                href="/factures/nouvelle"
                onClick={onCloseMobile}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white rounded-[8px] text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Nouvelle facture</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section : Support, Settings, Dark mode toggle, User Profile */}
        <div className="p-3.5 sm:p-4 border-t border-gray-100 bg-white space-y-2.5">
          {/* Secondary links */}
          <div className="space-y-0.5">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-[8px] text-xs sm:text-sm font-medium transition-colors",
                    item.active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gray-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}

            {/* Toggle Mode Sombre */}
            <div className="flex items-center justify-between px-3 py-2 rounded-[8px] text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gray-400 shrink-0" />
                <span>Mode sombre</span>
              </div>

              {/* Pill Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={darkMode}
                onClick={() => setDarkMode(!darkMode)}
                className={cn(
                  "w-9 h-5 p-0.5 rounded-full transition-colors relative inline-flex items-center focus:outline-none shrink-0 cursor-pointer",
                  darkMode ? "bg-brand-600" : "bg-gray-200"
                )}
              >
                <span
                  className={cn(
                    "w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out inline-block",
                    darkMode ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>

          {/* User Profile Card (radius: 10px) */}
          <div className="pt-1">
            {user ? (
              <div className="p-2 sm:p-2.5 bg-gray-50/90 hover:bg-gray-100/90 border border-gray-200/90 hover:border-gray-300 rounded-[10px] flex items-center justify-between gap-2.5 transition-all duration-150 shadow-2xs group">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {/* Avatar */}
                  <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-[8px] bg-brand-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs ring-2 ring-white">
                    {user.fullName ? user.fullName.slice(0, 2).toUpperCase() : "MC"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-900 truncate leading-tight group-hover:text-brand-700">
                      {user.fullName || user.companyName || "Mon Entreprise"}
                    </p>
                    <p className="text-[10.5px] sm:text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  title="Se déconnecter"
                  className="p-1.5 rounded-[6px] text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/connexion"
                className="w-full p-2.5 bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 rounded-[9px] flex items-center justify-center gap-2 text-xs font-bold transition shadow-2xs"
              >
                <span>Se connecter à Supabase</span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
