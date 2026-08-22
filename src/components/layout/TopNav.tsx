"use client";

import React from "react";
import Link from "next/link";
import { Menu, Bell, Plus, LogOut, User } from "lucide-react";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useDateRange } from "@/lib/store/date-range-context";
import { useAuth } from "@/lib/store/auth-context";

interface TopNavProps {
  onOpenMobile: () => void;
  title?: string;
  subtitle?: string;
}

export function TopNav({
  onOpenMobile,
  title = "Tableau de bord",
}: TopNavProps) {
  const { user, logout } = useAuth();
  const { range, setRange } = useDateRange();

  return (
    <header className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-gray-200/80 px-3.5 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
      {/* Left side: Hamburger button + Page Titles */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-[8px] text-gray-600 hover:text-gray-900 bg-white border border-gray-200/80 shadow-2xs hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 shrink-0 cursor-pointer"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="min-w-0">
          {/* Breadcrumb style */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-gray-400 mb-0.5 truncate">
            <span>ciskofacture</span>
            <span>/</span>
            <span className="text-gray-600 font-semibold truncate">{title}</span>
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight leading-none truncate">
            {title}
          </h1>
        </div>
      </div>

      {/* Right side: Notion DateRangePicker, Notification bell & CTA */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Sélecteur de Plage de Dates Style Notion (En haut) */}
        <div className="hidden sm:block">
          <DateRangePicker range={range} onChange={setRange} />
        </div>

        {/* Cloche de notifications (radius: 8px) */}
        <button
          type="button"
          className="relative p-2 rounded-[8px] bg-white border border-gray-200/90 text-gray-600 hover:text-gray-900 shadow-2xs hover:border-gray-300 hover:bg-gray-50/80 transition-all duration-150 shrink-0 cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-[2px] bg-brand-600 ring-2 ring-white" />
        </button>

        {/* Bouton CTA Principal (radius: 9px, 8-10px) */}
        <Link
          href="/factures/nouvelle"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-[9px] bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-brand-800/20 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] shrink-0 whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">Nouvelle facture</span>
          <span className="sm:hidden whitespace-nowrap">Facture</span>
        </Link>
      </div>
    </header>
  );
}
